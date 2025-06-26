
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, BookOpen, Brain, Shield, Target } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      title: "Empowering Young Minds",
      subtitle: "Teaching financial literacy, creativity, and life skills to children up to 25",
      image: "https://images.unsplash.com/photo-1497486751825-1833d4c3d6c8?w=1200&h=600&fit=crop"
    },
    {
      title: "Building Healthy Futures",
      subtitle: "Providing mental health support and wellness coaching for young people",
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1200&h=600&fit=crop"
    },
    {
      title: "Creating Tomorrow's Leaders",
      subtitle: "Free education and counseling to help youth reach their potential",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=600&fit=crop"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50" />
              <div className="relative h-full flex items-center justify-center text-white text-center px-4">
                <div className="max-w-4xl animate-fade-in">
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-gray-100">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/donate">
                      <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg">
                        <Heart className="mr-2 h-5 w-5" />
                        Donate Now
                      </Button>
                    </Link>
                    <Link to="/programs">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-red-600 mb-2">500+</div>
              <div className="text-gray-600">Children Reached</div>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '0.1s'}}>
              <div className="text-4xl font-bold text-red-600 mb-2">25+</div>
              <div className="text-gray-600">Programs Offered</div>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="text-4xl font-bold text-red-600 mb-2">15+</div>
              <div className="text-gray-600">Expert Volunteers</div>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="text-4xl font-bold text-red-600 mb-2">100%</div>
              <div className="text-gray-600">Free Education</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Programs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive educational and wellness programs designed to empower young minds
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow hover-scale">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl text-gray-800">Financial Literacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Teaching young people essential money management skills, budgeting, saving, and investment basics to secure their financial future.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow hover-scale">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-gray-800">AI & Technology</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Introducing children to artificial intelligence, coding, and modern technology to prepare them for the digital future.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow hover-scale">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-gray-800">Creative Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Fostering creativity through arts, crafts, writing, and innovative thinking to help children express themselves and build confidence.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow hover-scale">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-pink-600" />
                </div>
                <CardTitle className="text-xl text-gray-800">Mental Health Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Providing counseling, mental health awareness, and emotional support to help young people navigate life's challenges.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow hover-scale">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl text-gray-800">Lifestyle Coaching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Healthy lifestyle education covering nutrition, exercise, personal development, and building positive life habits.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow hover-scale">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-xl text-gray-800">Disease Awareness</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Health education and disease prevention awareness programs to help young people make informed health decisions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Help Us Change Lives</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-red-100">
            Your donation helps us provide free education, counseling, and life skills training to children who need it most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/donate">
              <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 px-8 py-4 text-lg">
                <Heart className="mr-2 h-5 w-5" />
                Donate Today
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 text-lg">
                Get Involved
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
