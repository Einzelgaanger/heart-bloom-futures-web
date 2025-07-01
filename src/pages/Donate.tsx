
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, BookOpen, Shield, Target, Brain, Smartphone, CheckCircle } from "lucide-react";

const Donate = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-theme-green rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-theme-red rounded-full translate-x-40 translate-y-40"></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-theme-gold rounded-full"></div>
      </div>
      
      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section with Creative Background */}
        <section className="py-16 text-white relative overflow-hidden bg-gradient-to-br from-theme-red via-red-500 to-rose-600">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-20 h-20 border-4 border-white rounded-full animate-spin" style={{animationDuration: '15s'}}></div>
              <div className="absolute top-20 right-20 w-16 h-16 bg-white/20 rounded-full animate-pulse"></div>
              <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/15 rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 border-4 border-white rounded-full animate-bounce"></div>
            </div>
            <Heart className="absolute top-10 left-10 h-32 w-32 text-white animate-pulse" />
            <Users className="absolute top-20 right-20 h-24 w-24 text-white" />
            <BookOpen className="absolute bottom-20 left-20 h-28 w-28 text-white" />
            <Shield className="absolute bottom-10 right-10 h-36 w-36 text-white" />
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <Heart className="h-16 w-16 mx-auto mb-6 text-theme-gold animate-scale-in" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-poppins">Make a Difference</h1>
            <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto leading-relaxed">
              Your donation directly impacts children's lives through education, counseling, and life skills training
            </p>
          </div>
        </section>
        
        {/* Main Donation Content */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <Target className="absolute top-10 right-10 h-40 w-40 text-theme-green" />
            <Brain className="absolute bottom-10 left-10 h-32 w-32 text-theme-gold" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-2xl border-2 border-theme-green bg-gradient-to-br from-white to-green-50">
                <CardHeader className="text-center bg-gradient-to-r from-theme-green to-green-600 text-white rounded-t-lg">
                  <CardTitle className="text-2xl font-bold flex items-center justify-center font-poppins">
                    <Heart className="mr-3 h-6 w-6" />
                    Support Our Mission
                  </CardTitle>
                  <p className="text-green-100 mt-2 text-base">
                    Your donation helps us provide free education and support to children who need it most
                  </p>
                </CardHeader>
                <CardContent className="space-y-8 p-8">
                  {/* M-Pesa Payment Section */}
                  <div className="p-8 border-2 border-theme-green rounded-xl bg-gradient-to-r from-green-50 to-white shadow-lg">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-theme-green rounded-full flex items-center justify-center mr-4">
                        <Smartphone className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-theme-black font-poppins">Donate via M-Pesa</h3>
                        <p className="text-gray-600">Fast, secure, and convenient</p>
                      </div>
                      <div className="bg-theme-green text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Available Now
                      </div>
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

                  {/* Impact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-theme-green transform hover:scale-105 bg-gradient-to-br from-white to-green-50">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-theme-green rounded-full flex items-center justify-center mx-auto mb-4">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-theme-green mb-2 font-poppins">KSh 1,000</h3>
                        <p className="text-sm text-gray-600">Supports 5 children for a week</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-theme-red transform hover:scale-105 bg-gradient-to-br from-white to-red-50">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-theme-red rounded-full flex items-center justify-center mx-auto mb-4">
                          <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-theme-red mb-2 font-poppins">KSh 2,500</h3>
                        <p className="text-sm text-gray-600">Funds a complete workshop session</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-theme-gold transform hover:scale-105 bg-gradient-to-br from-white to-yellow-50">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-theme-gold rounded-full flex items-center justify-center mx-auto mb-4">
                          <Shield className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-theme-gold mb-2 font-poppins">KSh 5,000+</h3>
                        <p className="text-sm text-gray-600">Sponsors a child's monthly program</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-500">
                    <Shield className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                    <p className="text-blue-800 font-medium">
                      <strong>100% Impact:</strong> Every shilling goes directly to supporting our programs and the children we serve.
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
    </div>
  );
};

export default Donate;
