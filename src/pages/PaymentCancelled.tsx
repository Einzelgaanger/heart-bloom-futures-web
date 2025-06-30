
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentCancelled = () => {
  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url('/Tee.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-white/90" />
      
      <div className="relative z-10">
        <Navigation />
        
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card className="shadow-2xl bg-white/95 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                  <CardTitle className="text-3xl text-black">Payment Cancelled</CardTitle>
                  <p className="text-gray-600 mt-2">
                    Your payment was cancelled. No charges have been made.
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <p className="text-gray-700">
                      We understand that sometimes plans change. Your support means everything to us, 
                      and we're here whenever you're ready to make a difference in a child's life.
                    </p>
                  </div>

                  <div className="bg-red-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-black mb-2 flex items-center">
                      <Heart className="h-5 w-5 text-red-600 mr-2" />
                      Other Ways to Help
                    </h3>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Volunteer your time with our programs</li>
                      <li>• Share our mission with friends and family</li>
                      <li>• Follow us on social media for updates</li>
                      <li>• Consider a smaller donation that fits your budget</li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/donate">
                      <Button className="bg-red-600 hover:bg-red-700 w-full sm:w-auto">
                        <Heart className="h-4 w-4 mr-2" />
                        Try Again
                      </Button>
                    </Link>
                    
                    <Link to="/">
                      <Button variant="outline" className="w-full sm:w-auto">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Return to Home
                      </Button>
                    </Link>
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

export default PaymentCancelled;
