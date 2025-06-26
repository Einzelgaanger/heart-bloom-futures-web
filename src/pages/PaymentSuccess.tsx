
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  useEffect(() => {
    // Here you would typically verify the payment with Stripe
    // For now, we'll simulate success
    setTimeout(() => {
      setPaymentDetails({
        amount: 50.00,
        currency: 'USD',
        receipt_email: 'donor@example.com',
        created: new Date().toISOString()
      });
      setLoading(false);
    }, 2000);
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mb-4"></div>
          <p className="text-gray-600">Confirming your payment...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg border-green-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-3xl text-black">Payment Successful!</CardTitle>
                <p className="text-gray-600 mt-2">
                  Thank you for your generous donation to Santa's Heart
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {paymentDetails && (
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-black mb-4">Payment Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-semibold">${paymentDetails.amount.toFixed(2)} {paymentDetails.currency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-semibold">{new Date(paymentDetails.created).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transaction ID:</span>
                        <span className="font-semibold text-sm">{sessionId?.substring(0, 20)}...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-black mb-2 flex items-center">
                    <Heart className="h-5 w-5 text-red-600 mr-2" />
                    Your Impact
                  </h3>
                  <p className="text-gray-700">
                    Your donation will help provide educational materials, life skills training, 
                    and mental health support to children in need. You'll receive updates on 
                    the impact of your contribution.
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    A receipt has been sent to your email address. 
                    This donation is tax-deductible.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      variant="outline" 
                      className="border-red-600 text-red-600 hover:bg-red-50"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Receipt
                    </Button>
                    
                    <Link to="/">
                      <Button className="bg-red-600 hover:bg-red-700 w-full sm:w-auto">
                        Return to Home
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;
