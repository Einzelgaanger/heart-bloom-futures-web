
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, BookOpen, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Donate = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-section bg-black">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">Support Our Mission</h1>
          <p className="text-base text-gray-300 max-w-2xl mx-auto">
            Every donation helps us provide free education and support to children who need it most
          </p>
        </div>
      </section>

      {/* Donation Impact */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center shadow-lg">
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-red-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-black mb-2">$25</h3>
                <p className="text-sm text-gray-600">Provides materials for 2 children for a month</p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-lg">
              <CardContent className="p-6">
                <BookOpen className="h-8 w-8 text-red-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-black mb-2">$50</h3>
                <p className="text-sm text-gray-600">Sponsors 1 child's complete program participation</p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-lg">
              <CardContent className="p-6">
                <Shield className="h-8 w-8 text-red-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-black mb-2">$100</h3>
                <p className="text-sm text-gray-600">Funds a full workshop session for 15 children</p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-lg">
              <CardContent className="p-6">
                <Heart className="h-8 w-8 text-red-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-black mb-2">$250+</h3>
                <p className="text-sm text-gray-600">Supports our mental health program for a week</p>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="max-w-2xl mx-auto shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-black flex items-center justify-center">
                  <Heart className="mr-3 h-6 w-6 text-red-600" />
                  Ready to Make a Difference?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Your donation helps us provide free education, life skills training, and mental health support 
                  to children and young adults who need it most.
                </p>
                
                <Link to="/payment">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8">
                    <Heart className="mr-2 h-4 w-4" />
                    Donate Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                
                <p className="text-xs text-gray-500 mt-4">
                  🔒 Secure payment processing. Tax-deductible receipts provided.
                </p>
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
