
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Smartphone, CheckCircle } from "lucide-react";

const Donate = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-theme-green to-emerald-400 rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-theme-red to-rose-400 rounded-full translate-x-40 translate-y-40"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-br from-theme-gold to-yellow-400 rounded-full"></div>
      </div>
      
      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section */}
        <section className="py-12 text-white relative overflow-hidden bg-gradient-to-br from-theme-red via-red-500 to-rose-600">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-20 h-20 border-4 border-white rounded-full animate-spin" style={{animationDuration: '15s'}}></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 border-4 border-white rounded-full animate-bounce"></div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <Heart className="h-12 w-12 mx-auto mb-4 text-theme-gold animate-scale-in" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">Support Our Mission</h1>
            <p className="text-lg text-red-100 max-w-2xl mx-auto">
              Your donation helps us continue our work with children in need
            </p>
          </div>
        </section>
        
        {/* Main Donation Content */}
        <section className="py-16 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto">
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="text-center bg-gradient-to-r from-theme-green to-green-600 text-white rounded-t-lg">
                  <CardTitle className="text-xl font-bold flex items-center justify-center font-poppins">
                    <Smartphone className="mr-3 h-5 w-5" />
                    M-Pesa Donation
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border-2 border-theme-green/20 shadow-md text-center">
                      <div className="text-sm text-gray-600 mb-2 font-medium">Paybill Number</div>
                      <div className="text-2xl font-bold text-theme-green font-poppins">522533</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border-2 border-theme-green/20 shadow-md text-center">
                      <div className="text-sm text-gray-600 mb-2 font-medium">Account Number</div>
                      <div className="text-2xl font-bold text-theme-green font-poppins">7760083</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-100 to-green-50 p-6 rounded-xl border-l-4 border-theme-green">
                    <div className="flex items-center mb-3">
                      <CheckCircle className="h-5 w-5 text-theme-green mr-2" />
                      <h4 className="font-bold text-theme-green text-base">How to donate:</h4>
                    </div>
                    <div className="space-y-2 text-green-800 text-sm">
                      <p><span className="font-semibold">1.</span> Go to M-Pesa menu</p>
                      <p><span className="font-semibold">2.</span> Select "Lipa na M-Pesa" → "Pay Bill"</p>
                      <p><span className="font-semibold">3.</span> Enter Paybill: <span className="font-bold text-theme-green">522533</span></p>
                      <p><span className="font-semibold">4.</span> Enter Account: <span className="font-bold text-theme-green">7760083</span></p>
                      <p><span className="font-semibold">5.</span> Enter amount and complete</p>
                    </div>
                  </div>

                  <div className="text-center mt-6 p-4 bg-theme-gold/10 rounded-lg">
                    <Heart className="h-5 w-5 mx-auto mb-2 text-theme-gold" />
                    <p className="text-sm font-medium text-gray-700">Thank you for your support!</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Donate;
