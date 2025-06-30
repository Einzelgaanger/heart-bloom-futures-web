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

  useEffect(() => {
    const loadPayPalSDK = () => {
      // Check if PayPal is already loaded
      if (window.paypal) {
        setIsLoading(false);
        renderPayPalButton();
        return;
      }

      // Remove any existing PayPal scripts
      const existingScripts = document.querySelectorAll('script[src*="paypal.com"]');
      existingScripts.forEach(script => script.remove());

      const script = document.createElement('script');
      // Use the simplest possible SDK URL to avoid parameter conflicts
      script.src = `https://www.paypal.com/sdk/js?client-id=AQLhXL5Mw1Rs5Mk6vlRmUFMqRM1tHyyVKtg7rY7VQYD7ZVSgXrTTz28gAs2dTQcDqus4MQdx778lsafx&currency=USD`;
      script.async = true;
      
      script.onload = () => {
        setTimeout(() => {
          if (window.paypal && window.paypal.Buttons) {
            setIsLoading(false);
            renderPayPalButton();
          } else {
            setError('PayPal failed to initialize');
            setIsLoading(false);
          }
        }, 500);
      };
      
      script.onerror = () => {
        setError('Failed to load PayPal');
        setIsLoading(false);
      };
      
      document.head.appendChild(script);
    };

    loadPayPalSDK();
  }, []);

  const renderPayPalButton = () => {
    if (!paypalRef.current || !window.paypal) {
      return;
    }

    // Clear any existing content
    paypalRef.current.innerHTML = '';

    try {
      window.paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount,
                currency_code: 'USD'
              },
              description: `Donation to Santa's Heart - $${amount}`,
            }]
          });
        },
        
        onApprove: async (data: any, actions: any) => {
          try {
            const details = await actions.order.capture();
            
            toast({
              title: "Payment Successful!",
              description: `Thank you for your donation of $${amount}!`,
            });
            
            onSuccess();
            
            // Redirect to success page
            setTimeout(() => {
              window.location.href = `/payment-success?session_id=${details.id}`;
            }, 1500);
            
          } catch (error) {
            toast({
              title: "Payment Error",
              description: "There was an issue processing your payment. Please try again.",
              variant: "destructive",
            });
            onError();
          }
        },
        
        onError: (err: any) => {
          toast({
            title: "Payment Error",
            description: "There was an issue with the payment. Please try again.",
            variant: "destructive",
          });
          onError();
        },
        
        onCancel: (data: any) => {
          toast({
            title: "Payment Cancelled",
            description: "Your payment was cancelled.",
          });
        },
        
        style: {
          color: 'gold',
          shape: 'rect',
          label: 'paypal',
          height: 50
        }
      }).render(paypalRef.current);
      
    } catch (err) {
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
        <div className="text-red-600 font-medium mb-2">Payment Error</div>
        <p className="text-red-600 text-sm mb-3">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div ref={paypalRef} className="min-h-[55px]"></div>
      <div className="text-xs text-gray-500 text-center">
        🔒 Secure payment powered by PayPal
      </div>
    </div>
  );
};

export default PayPalButton;
