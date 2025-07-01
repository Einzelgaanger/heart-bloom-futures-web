
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Smartphone, CheckCircle } from "lucide-react";

const Donate = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Heart className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
          <h1 className="text-3xl font-bold mb-4">Support Our Mission</h1>
          <p className="text-lg text-green-100 max-w-xl mx-auto">
            Help us continue empowering children through education
          </p>
        </div>
      </section>
      
      {/* Donation Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <Card className="shadow-lg">
              <CardHeader className="text-center bg-green-600 text-white">
                <CardTitle className="text-xl flex items-center justify-center">
                  <Smartphone className="mr-2 h-5 w-5" />
                  M-Pesa Donation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Paybill</div>
                    <div className="text-2xl font-bold text-green-600">522533</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Account</div>
                    <div className="text-2xl font-bold text-green-600">7760083</div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                    <h4 className="font-semibold text-blue-800">How to donate:</h4>
                  </div>
                  <ol className="text-sm text-blue-700 space-y-1">
                    <li>1. Go to M-Pesa menu</li>
                    <li>2. Select "Lipa na M-Pesa" → "Pay Bill"</li>
                    <li>3. Enter Paybill: <span className="font-bold">522533</span></li>
                    <li>4. Enter Account: <span className="font-bold">7760083</span></li>
                    <li>5. Enter amount and complete</li>
                  </ol>
                </div>

                <div className="text-center mt-6 p-3 bg-yellow-50 rounded-lg">
                  <Heart className="h-4 w-4 mx-auto mb-1 text-yellow-600" />
                  <p className="text-sm text-gray-700">Thank you for your support!</p>
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

export default Donate;
