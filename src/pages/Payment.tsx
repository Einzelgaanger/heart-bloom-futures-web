import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Smartphone, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Payment = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-black flex items-center justify-center">
                  <Heart className="mr-3 h-6 w-6 text-red-600" />
                  Make Your Donation
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Your donation helps us provide free education and support to children who need it most
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* M-Pesa Payment */}
                <div className="p-6 border-2 border-red-200 rounded-lg bg-red-50">
                  <div className="flex items-center mb-4">
                    <Smartphone className="h-6 w-6 text-red-600 mr-3" />
                    <h3 className="text-xl font-bold text-black">M-Pesa Payment</h3>
                    <Badge className="ml-3 bg-green-600">Available Now</Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="text-sm text-gray-600 mb-1">Paybill Number</div>
                      <div className="text-2xl font-bold text-black">522533</div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="text-sm text-gray-600 mb-1">Account Number</div>
                      <div className="text-2xl font-bold text-black">7760083</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-green-100 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>How to donate:</strong><br/>
                      1. Go to M-Pesa on your phone<br/>
                      2. Select "Lipa na M-Pesa" → "Pay Bill"<br/>
                      3. Enter Paybill: <strong>522533</strong><br/>
                      4. Enter Account: <strong>7760083</strong><br/>
                      5. Enter your donation amount<br/>
                      6. Complete the transaction
                    </p>
                  </div>
                </div>

                {/* Other Payment Methods */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-black">Other Payment Methods</h3>
                  
                  <div className="flex items-center space-x-3 p-4 border rounded-lg bg-gray-50 opacity-75">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-600">PayPal & Credit Cards</div>
                      <div className="text-sm text-gray-500">International payment options</div>
                    </div>
                    <Badge variant="outline">Coming Soon</Badge>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 border rounded-lg bg-gray-50 opacity-75">
                    <Smartphone className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-600">Bank Transfer</div>
                      <div className="text-sm text-gray-500">Direct bank account transfers</div>
                    </div>
                    <Badge variant="outline">Coming Soon</Badge>
                  </div>
                </div>

                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    🔒 <strong>Secure Donations:</strong> We're working to add more payment methods including PayPal, 
                    credit cards, and bank transfers. For now, M-Pesa is the fastest and most secure way to donate.
                  </p>
                </div>

                <div className="text-center text-sm text-gray-500">
                  <p>Thank you for supporting Santa's Heart. Your donation makes a real difference!</p>
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

export default Payment;
