import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Smartphone, CreditCard, Shield, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Payment = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-gold-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-12 bg-theme-green text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Heart className="absolute top-10 left-10 h-24 w-24 text-white animate-pulse" />
          <Smartphone className="absolute top-20 right-20 h-32 w-32 text-white" />
          <Shield className="absolute bottom-10 left-20 h-28 w-28 text-white" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <Heart className="h-12 w-12 mx-auto mb-4 text-theme-gold animate-scale-in" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">Secure Donation Portal</h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto">
            Your contribution directly supports children's education and development programs
          </p>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20">
            <CheckCircle className="h-40 w-40 text-theme-green" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-2xl border-2 border-theme-green bg-gradient-to-br from-white to-green-50">
              <CardHeader className="text-center bg-theme-green text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold flex items-center justify-center font-poppins">
                  <Heart className="mr-3 h-6 w-6" />
                  Complete Your Donation
                </CardTitle>
                <p className="text-green-100 mt-2 text-base">
                  Your donation helps us provide free education and support to children who need it most
                </p>
              </CardHeader>
              <CardContent className="space-y-8 p-8">
                {/* M-Pesa Payment */}
                <div className="p-8 border-2 border-theme-green rounded-xl bg-gradient-to-r from-green-50 to-white shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-theme-green rounded-full flex items-center justify-center mr-4">
                      <Smartphone className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-theme-black font-poppins">M-Pesa Payment</h3>
                      <p className="text-gray-600">Fast, secure, and convenient</p>
                    </div>
                    <Badge className="bg-theme-green text-white px-4 py-2 text-sm font-semibold">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Available Now
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-6 rounded-xl border-2 border-theme-green/20 shadow-md">
                      <div className="text-sm text-gray-600 mb-2 font-medium">Paybill Number</div>
                      <div className="text-3xl font-bold text-theme-green font-poppins">522533</div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl border-2 border-theme-green/20 shadow-md">
                      <div className="text-sm text-gray-600 mb-2 font-medium">Account Number</div>
                      <div className="text-3xl font-bold text-theme-green font-poppins">7760083</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-100 to-green-50 p-6 rounded-xl border-l-4 border-theme-green">
                    <h4 className="font-bold text-theme-green mb-3 text-lg">📱 How to donate via M-Pesa:</h4>
                    <div className="space-y-2 text-green-800">
                      <p><span className="font-semibold">1.</span> Go to M-Pesa on your phone</p>
                      <p><span className="font-semibold">2.</span> Select "Lipa na M-Pesa" → "Pay Bill"</p>
                      <p><span className="font-semibold">3.</span> Enter Paybill: <span className="font-bold text-theme-green">522533</span></p>
                      <p><span className="font-semibold">4.</span> Enter Account: <span className="font-bold text-theme-green">7760083</span></p>
                      <p><span className="font-semibold">5.</span> Enter your donation amount</p>
                      <p><span className="font-semibold">6.</span> Complete the transaction</p>
                    </div>
                  </div>
                </div>

                {/* Other Payment Methods */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-theme-black font-poppins">Additional Payment Options</h3>
                  
                  <div className="flex items-center space-x-4 p-6 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-white opacity-60">
                    <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-600 text-lg">PayPal & Credit Cards</div>
                      <div className="text-gray-500">International payment options</div>
                    </div>
                    <Badge variant="outline" className="px-4 py-2">Coming Soon</Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-6 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-white opacity-60">
                    <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
                      <Smartphone className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-600 text-lg">Bank Transfer</div>
                      <div className="text-gray-500">Direct bank account transfers</div>
                    </div>
                    <Badge variant="outline" className="px-4 py-2">Coming Soon</Badge>
                  </div>
                </div>

                <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-500">
                  <Shield className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                  <p className="text-blue-800 font-medium">
                    <strong>Secure & Trusted:</strong> We're continuously expanding our payment options. 
                    M-Pesa currently offers the fastest and most secure donation method for our supporters.
                  </p>
                </div>

                <div className="text-center text-gray-600 bg-theme-gold/10 p-4 rounded-lg">
                  <Heart className="h-6 w-6 mx-auto mb-2 text-theme-gold" />
                  <p className="font-medium">Thank you for supporting Santa's Heart. Your donation creates real, lasting impact!</p>
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
