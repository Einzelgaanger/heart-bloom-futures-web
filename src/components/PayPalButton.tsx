
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
        // Check if PayPal is already loaded
        if (window.paypal && window.paypal.Buttons) {
          console.log('PayPal SDK already loaded');
          resolve(window.paypal);
          return;
        }

        // Remove existing script if any
        const existingScript = document.querySelector('script[src*="paypal.com/sdk"]');
        if (existingScript) {
          existingScript.remove();
        }

        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=AQLhXL5Mw1Rs5Mk6vlRmUFMqRM1tHyyVKtg7rY7VQYD7ZVSgXrTTz28gAs2dTQcDqus4MQdx778lsafx&currency=USD&intent=capture&enable-funding=venmo,paylater`;
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
          console.log('PayPal SDK script loaded');
          // Wait a bit for PayPal to initialize
          setTimeout(() => {
            if (window.paypal && window.paypal.Buttons) {
              console.log('PayPal SDK fully initialized');
              resolve(window.paypal);
            } else {
              console.error('PayPal SDK loaded but Buttons not available');
              reject(new Error('PayPal SDK not properly initialized'));
            }
          }, 100);
        };
        
        script.onerror = (error) => {
          console.error('Failed to load PayPal SDK script:', error);
          reject(new Error('Failed to load PayPal SDK'));
        };
        
        document.head.appendChild(script);
      });
    };

    const initializePayPal = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Starting PayPal initialization...');
        
        await loadPayPalScript();
        console.log('PayPal SDK loaded successfully');
        
        if (!window.paypal || !window.paypal.Buttons) {
          throw new Error('PayPal SDK not properly loaded after script execution');
        }
        
        renderPayPalButton();
        setIsLoading(false);
      } catch (err) {
        console.error('PayPal initialization error:', err);
        setError('Failed to load PayPal. Please refresh the page and try again.');
        setIsLoading(false);
      }
    };

    initializePayPal();
  }, [amount]);

  const renderPayPalButton = () => {
    if (!window.paypal || !window.paypal.Buttons || !paypalRef.current) {
      console.error('PayPal not ready for rendering');
      return;
    }

    // Clear existing button
    paypalRef.current.innerHTML = '';

    try {
      console.log('Rendering PayPal button for amount:', amount);
      
      window.paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          console.log('Creating PayPal order for amount:', amount);
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount,
                currency_code: 'USD'
              },
              description: `Donation to Santa's Heart - $${amount}`
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
            }
          });
        },
        onApprove: async (data: any, actions: any) => {
          try {
            console.log('PayPal payment approved, capturing order:', data.orderID);
            const details = await actions.order.capture();
            console.log('Payment completed successfully:', details);
            
            toast({
              title: "Payment Successful!",
              description: `Thank you for your donation of $${amount}`,
            });
            
            onSuccess();
            
            // Redirect to success page after a short delay
            setTimeout(() => {
              window.location.href = '/payment-success';
            }, 1500);
            
          } catch (error) {
            console.error('Payment capture error:', error);
            toast({
              title: "Payment Error",
              description: "There was an issue processing your payment. Please try again.",
              variant: "destructive",
            });
            onError();
          }
        },
        onError: (err: any) => {
          console.error('PayPal error:', err);
          toast({
            title: "Payment Error",
            description: "There was an issue with PayPal. Please try again.",
            variant: "destructive",
          });
          onError();
        },
        onCancel: () => {
          console.log('PayPal payment cancelled');
          toast({
            title: "Payment Cancelled",
            description: "Your payment was cancelled.",
          });
          // Redirect to cancelled page
          setTimeout(() => {
            window.location.href = '/payment-cancelled';
          }, 1000);
        },
        style: {
          color: 'gold',
          shape: 'rect',
          label: 'paypal',
          height: 50,
          tagline: false
        }
      }).render(paypalRef.current);
      
      console.log('PayPal button rendered successfully');
    } catch (err) {
      console.error('Error rendering PayPal button:', err);
      setError('Failed to initialize PayPal button. Please refresh and try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6 border rounded-lg">
        <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-red-600 mr-3"></div>
        <span className="text-gray-600">Loading PayPal...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border border-red-200 rounded-lg bg-red-50">
        <p className="text-red-600 text-sm">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 text-red-600 underline text-sm hover:text-red-700"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return <div ref={paypalRef} className="min-h-[50px]"></div>;
};

export default PayPalButton;
