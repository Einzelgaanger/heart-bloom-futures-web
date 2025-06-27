
import React, { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface PayPalButtonProps {
  amount: string;
  donorInfo: {
    name: string;
    email: string;
    phone: string;
  };
  onSuccess: () => void;
  onError: () => void;
}

declare global {
  interface Window {
    paypal: any;
  }
}

const PayPalButton = ({ amount, donorInfo, onSuccess, onError }: PayPalButtonProps) => {
  const paypalRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPayPalScript = () => {
      return new Promise((resolve, reject) => {
        // Check if PayPal is already loaded and ready
        if (window.paypal && window.paypal.Buttons && typeof window.paypal.Buttons === 'function') {
          console.log('PayPal SDK already loaded and ready');
          resolve(window.paypal);
          return;
        }

        // Remove existing PayPal script if any
        const existingScript = document.querySelector('script[src*="paypal.com/sdk/js"]');
        if (existingScript) {
          console.log('Removing existing PayPal script');
          existingScript.remove();
        }

        // Create new script element
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=AQLhXL5Mw1Rs5Mk6vlRmUFMqRM1tHyyVKtg7rY7VQYD7ZVSgXrTTz28gAs2dTQcDqus4MQdx778lsafx&currency=USD&intent=capture&enable-funding=venmo,paylater&components=buttons`;
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
          console.log('PayPal SDK script loaded successfully');
          
          // Check if PayPal object is available with a retry mechanism
          const checkPayPalReady = (retries = 0) => {
            if (window.paypal && window.paypal.Buttons && typeof window.paypal.Buttons === 'function') {
              console.log('PayPal SDK is ready');
              resolve(window.paypal);
            } else if (retries < 10) {
              console.log(`PayPal not ready yet, retrying... (${retries + 1}/10)`);
              setTimeout(() => checkPayPalReady(retries + 1), 200);
            } else {
              console.error('PayPal SDK failed to initialize after multiple attempts');
              reject(new Error('PayPal SDK failed to initialize'));
            }
          };
          
          checkPayPalReady();
        };
        
        script.onerror = (error) => {
          console.error('Failed to load PayPal SDK script:', error);
          reject(new Error('Failed to load PayPal SDK script'));
        };
        
        // Add script to head
        document.head.appendChild(script);
        console.log('PayPal SDK script added to page');
      });
    };

    const initializePayPal = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Initializing PayPal SDK...');
        
        await loadPayPalScript();
        console.log('PayPal SDK initialization complete');
        
        // Double-check PayPal is ready before rendering
        if (!window.paypal || !window.paypal.Buttons || typeof window.paypal.Buttons !== 'function') {
          throw new Error('PayPal SDK not properly initialized');
        }
        
        renderPayPalButton();
        setIsLoading(false);
        
      } catch (err) {
        console.error('PayPal initialization failed:', err);
        setError(err instanceof Error ? err.message : 'Failed to load PayPal');
        setIsLoading(false);
      }
    };

    initializePayPal();
  }, [amount]);

  const renderPayPalButton = () => {
    if (!paypalRef.current) {
      console.error('PayPal container ref not available');
      return;
    }

    if (!window.paypal || !window.paypal.Buttons || typeof window.paypal.Buttons !== 'function') {
      console.error('PayPal SDK not ready for rendering');
      setError('PayPal SDK not ready');
      return;
    }

    // Clear existing button content
    paypalRef.current.innerHTML = '';

    try {
      console.log('Creating PayPal button for amount:', amount, 'USD');
      
      window.paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          console.log('Creating PayPal order...');
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount,
                currency_code: 'USD'
              },
              description: `Donation to Santa's Heart - $${amount}`,
              custom_id: `donation_${Date.now()}`,
              soft_descriptor: "SANTA'S HEART"
            }],
            payer: {
              name: {
                given_name: donorInfo.name.split(' ')[0] || donorInfo.name,
                surname: donorInfo.name.split(' ').slice(1).join(' ') || ''
              },
              email_address: donorInfo.email,
              phone: donorInfo.phone ? {
                phone_number: {
                  national_number: donorInfo.phone
                }
              } : undefined
            },
            application_context: {
              brand_name: "Santa's Heart",
              user_action: 'PAY_NOW'
            }
          });
        },
        
        onApprove: async (data: any, actions: any) => {
          try {
            console.log('Payment approved, capturing order:', data.orderID);
            const details = await actions.order.capture();
            console.log('Payment capture successful:', details);
            
            toast({
              title: "Payment Successful!",
              description: `Thank you for your donation of $${amount}. Your transaction ID is: ${details.id}`,
            });
            
            onSuccess();
            
            // Redirect to success page
            setTimeout(() => {
              window.location.href = `/payment-success?session_id=${details.id}`;
            }, 2000);
            
          } catch (error) {
            console.error('Payment capture failed:', error);
            toast({
              title: "Payment Processing Error",
              description: "Your payment was approved but there was an issue processing it. Please contact support.",
              variant: "destructive",
            });
            onError();
          }
        },
        
        onError: (err: any) => {
          console.error('PayPal button error:', err);
          toast({
            title: "Payment Error",
            description: "There was an issue with the payment system. Please try again or contact support.",
            variant: "destructive",
          });
          onError();
        },
        
        onCancel: (data: any) => {
          console.log('Payment cancelled by user:', data);
          toast({
            title: "Payment Cancelled",
            description: "Your payment was cancelled. No charges were made.",
          });
          
          // Redirect to cancelled page
          setTimeout(() => {
            window.location.href = '/payment-cancelled';
          }, 1500);
        },
        
        style: {
          color: 'gold',
          shape: 'rect',
          label: 'paypal',
          height: 50,
          tagline: false,
          layout: 'vertical'
        }
      }).render(paypalRef.current);
      
      console.log('PayPal button rendered successfully');
      
    } catch (err) {
      console.error('Error rendering PayPal button:', err);
      setError('Failed to render PayPal button. Please refresh the page.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6 border rounded-lg bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Loading PayPal...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border border-red-200 rounded-lg bg-red-50">
        <div className="flex items-center space-x-2 mb-2">
          <div className="text-red-600 font-medium">Payment System Error</div>
        </div>
        <p className="text-red-600 text-sm mb-3">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div ref={paypalRef} className="min-h-[60px]"></div>
      <div className="text-xs text-gray-500 text-center">
        🔒 Secure payment powered by PayPal
      </div>
    </div>
  );
};

export default PayPalButton;
