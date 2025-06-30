import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, BookOpen, Shield, ArrowRight, Target, Brain } from "lucide-react";
import { Link } from "react-router-dom";

const Donate = () => {
  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url('/Founder.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-gray-50/90 to-red-50/95" />
      
      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section */}
        <section 
          className="py-16 text-white relative overflow-hidden"
          style={{
            backgroundImage: `url('/NGO Education.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-theme-red bg-opacity-85" />
          
          <div className="absolute inset-0 opacity-10">
            <Heart className="absolute top-10 left-10 h-32 w-32 text-white animate-pulse" />
            <Users className="absolute top-20 right-20 h-24 w-24 text-white" />
            <BookOpen className="absolute bottom-20 left-20 h-28 w-28 text-white" />
            <Shield className="absolute bottom-10 right-10 h-36 w-36 text-white" />
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <Heart className="h-16 w-16 mx-auto mb-6 text-theme-gold animate-scale-in" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-poppins">Make a Difference</h1>
            <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto leading-relaxed">
              Your donation directly impacts children's lives through education, counseling, and life skills training
            </p>
          </div>
        </section>
        
        {/* Donation Impact */}
        <section className="py-16 relative overflow-hidden bg-white/95 backdrop-blur-sm">
          <div className="absolute inset-0 opacity-5">
            <Target className="absolute top-10 right-10 h-40 w-40 text-theme-green" />
            <Brain className="absolute bottom-10 left-10 h-32 w-32 text-theme-gold" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-theme-black mb-4 font-poppins">Your Impact</h2>
              <p className="text-lg text-gray-600">See how your donation creates lasting change</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="text-center shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-theme-green transform hover:scale-105 bg-gradient-to-br from-white to-green-50">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-theme-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-theme-green mb-2 font-poppins">$25</h3>
                  <p className="text-sm text-gray-600 font-medium">Provides materials for 2 children for a month</p>
                </CardContent>
              </Card>
              
              <Card className="text-center shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-theme-red transform hover:scale-105 bg-gradient-to-br from-white to-red-50">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-theme-red rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-theme-red mb-2 font-poppins">$50</h3>
                  <p className="text-sm text-gray-600 font-medium">Sponsors 1 child's complete program participation</p>
                </CardContent>
              </Card>
              
              <Card className="text-center shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-theme-gold transform hover:scale-105 bg-gradient-to-br from-white to-yellow-50">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-theme-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-theme-gold mb-2 font-poppins">$100</h3>
                  <p className="text-sm text-gray-600 font-medium">Funds a full workshop session for 15 children</p>
                </CardContent>
              </Card>
              
              <Card className="text-center shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-theme-black transform hover:scale-105 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-theme-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-theme-black mb-2 font-poppins">$250+</h3>
                  <p className="text-sm text-gray-600 font-medium">Supports our mental health program for a week</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Card className="max-w-3xl mx-auto shadow-2xl border-2 border-theme-gold bg-gradient-to-br from-white to-yellow-50">
                <CardHeader className="bg-theme-gold text-white rounded-t-lg">
                  <CardTitle className="text-2xl font-bold flex items-center justify-center font-poppins">
                    <Heart className="mr-3 h-7 w-7" />
                    Ready to Make a Difference?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-8">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Your donation helps us provide free education, life skills training, and mental health support 
                    to children and young adults who need it most. Every contribution creates lasting change.
                  </p>
                  
                  <div className="bg-theme-red/10 p-6 rounded-lg border-l-4 border-theme-red">
                    <p className="text-theme-red font-semibold text-center">
                      🎯 100% of your donation goes directly to program delivery
                    </p>
                  </div>
                  
                  <Link to="/payment">
                    <Button size="lg" className="bg-theme-red hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold shadow-xl border-2 border-transparent hover:border-theme-gold transition-all duration-300">
                      <Heart className="mr-2 h-5 w-5" />
                      Donate Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  
                  <p className="text-sm text-gray-500 mt-4 flex items-center justify-center">
                    <Shield className="h-4 w-4 mr-2 text-theme-green" />
                    Secure payment processing. Tax-deductible receipts provided.
                  </p>
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
