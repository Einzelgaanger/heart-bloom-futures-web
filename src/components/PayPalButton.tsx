
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
    paypal?: any;
  }
}

const PayPalButton = ({ amount, donorInfo, onSuccess, onError }: PayPalButtonProps) => {
  const paypalRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const loadPayPalSDK = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Clean up any existing PayPal scripts
        const existingScripts = document.querySelectorAll('script[src*="paypal.com/sdk/js"]');
        existingScripts.forEach(script => script.remove());
        
        // Clear any existing PayPal object
        if (window.paypal) {
          delete window.paypal;
        }
        
        console.log('Loading PayPal SDK...');
        
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=AQLhXL5Mw1Rs5Mk6vlRmUFMqRM1tHyyVKtg7rY7VQYD7ZVSgXrTTz28gAs2dTQcDqus4MQdx778lsafx&currency=USD&intent=capture&components=buttons`;
        script.async = true;
        script.defer = true;
        
        const loadPromise = new Promise((resolve, reject) => {
          script.onload = () => {
            console.log('PayPal script loaded successfully');
            
            // Wait for PayPal to be fully initialized
            const checkPayPal = (attempts = 0) => {
              if (attempts > 20) {
                reject(new Error('PayPal SDK timeout'));
                return;
              }
              
              if (window.paypal && window.paypal.Buttons) {
                console.log('PayPal SDK ready');
                resolve(window.paypal);
              } else {
                console.log(`Waiting for PayPal SDK... (${attempts + 1}/20)`);
                setTimeout(() => checkPayPal(attempts + 1), 100);
              }
            };
            
            checkPayPal();
          };
          
          script.onerror = () => {
            console.error('Failed to load PayPal SDK');
            reject(new Error('Failed to load PayPal SDK'));
          };
        });
        
        // Add script to head
        document.head.appendChild(script);
        
        // Wait for PayPal to load
        await loadPromise;
        
        setScriptLoaded(true);
        setIsLoading(false);
        
        // Render the button
        renderPayPalButton();
        
      } catch (err) {
        console.error('PayPal SDK loading error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load PayPal SDK');
        setIsLoading(false);
      }
    };

    loadPayPalSDK();
  }, [amount]);

  const renderPayPalButton = () => {
    if (!paypalRef.current || !window.paypal || !window.paypal.Buttons) {
      console.error('PayPal not ready for rendering');
      return;
    }

    // Clear existing content
    paypalRef.current.innerHTML = '';

    try {
      console.log('Rendering PayPal button for amount:', amount);
      
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
              custom_id: `donation_${Date.now()}`
            }],
            payer: {
              name: {
                given_name: donorInfo.name.split(' ')[0] || donorInfo.name,
                surname: donorInfo.name.split(' ').slice(1).join(' ') || ''
              },
              email_address: donorInfo.email
            },
            application_context: {
              brand_name: "Santa's Heart",
              user_action: 'PAY_NOW',
              return_url: window.location.origin + '/payment-success',
              cancel_url: window.location.origin + '/payment-cancelled'
            }
          });
        },
        
        onApprove: async (data: any, actions: any) => {
          try {
            console.log('Payment approved, capturing order:', data.orderID);
            const details = await actions.order.capture();
            console.log('Payment captured successfully:', details);
            
            toast({
              title: "Payment Successful!",
              description: `Thank you for your donation of $${amount}. Transaction ID: ${details.id}`,
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
              description: "There was an issue processing your payment. Please contact support.",
              variant: "destructive",
            });
            onError();
          }
        },
        
        onError: (err: any) => {
          console.error('PayPal button error:', err);
          toast({
            title: "Payment Error",
            description: "There was an issue with the payment system. Please try again.",
            variant: "destructive",
          });
          onError();
        },
        
        onCancel: (data: any) => {
          console.log('Payment cancelled:', data);
          toast({
            title: "Payment Cancelled",
            description: "Your payment was cancelled. No charges were made.",
          });
          
          setTimeout(() => {
            window.location.href = '/payment-cancelled';
          }, 1500);
        },
        
        style: {
          color: 'gold',
          shape: 'rect',
          label: 'paypal',
          height: 45,
          tagline: false
        }
      }).render(paypalRef.current);
      
      console.log('PayPal button rendered successfully');
      
    } catch (err) {
      console.error('Error rendering PayPal button:', err);
      setError('Failed to render payment button');
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
      <div ref={paypalRef} className="min-h-[50px]"></div>
      <div className="text-xs text-gray-500 text-center">
        🔒 Secure payment powered by PayPal
      </div>
    </div>
  );
};

export default PayPalButton;
