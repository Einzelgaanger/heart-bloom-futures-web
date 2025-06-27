
import React, { useEffect, useRef } from 'react';
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

  useEffect(() => {
    if (!window.paypal) {
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=AQLhXL5Mw1Rs5Mk6vlRmUFMqRM1tHyyVKtg7rY7VQYD7ZVSgXrTTz28gAs2dTQcDqus4MQdx778lsafx&currency=USD';
      script.async = true;
      script.onload = () => {
        renderPayPalButton();
      };
      document.body.appendChild(script);
    } else {
      renderPayPalButton();
    }
  }, [amount]);

  const renderPayPalButton = () => {
    if (window.paypal && paypalRef.current) {
      // Clear existing button
      paypalRef.current.innerHTML = '';

      window.paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount
              },
              description: 'Donation to Santa\'s Heart'
            }],
            payer: {
              name: {
                given_name: donorInfo.name.split(' ')[0],
                surname: donorInfo.name.split(' ').slice(1).join(' ')
              },
              email_address: donorInfo.email
            }
          });
        },
        onApprove: async (data: any, actions: any) => {
          try {
            const details = await actions.order.capture();
            console.log('Payment completed:', details);
            
            toast({
              title: "Payment Successful!",
              description: `Thank you for your donation of $${amount}`,
            });
            
            onSuccess();
            
            // Redirect to success page
            window.location.href = '/payment-success';
          } catch (error) {
            console.error('Payment capture error:', error);
            toast({
              title: "Payment Error",
              description: "There was an issue processing your payment",
              variant: "destructive",
            });
            onError();
          }
        },
        onError: (err: any) => {
          console.error('PayPal error:', err);
          toast({
            title: "Payment Error",
            description: "There was an issue with PayPal",
            variant: "destructive",
          });
          onError();
        },
        onCancel: () => {
          toast({
            title: "Payment Cancelled",
            description: "Your payment was cancelled",
          });
          window.location.href = '/payment-cancelled';
        },
        style: {
          color: 'red',
          shape: 'rect',
          label: 'pay',
          height: 50
        }
      }).render(paypalRef.current);
    }
  };

  return <div ref={paypalRef}></div>;
};

export default PayPalButton;
