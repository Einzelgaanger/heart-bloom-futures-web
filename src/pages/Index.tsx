
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, BookOpen, Users, Brain, Target, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      title: "Empowering Young Minds",
      subtitle: "Teaching financial literacy, creativity, and life skills to children up to 25",
      color: "bg-theme-green"
    },
    {
      title: "Building Healthy Futures", 
      subtitle: "Providing mental health support and wellness coaching for young people",
      color: "bg-theme-red"
    },
    {
      title: "Creating Tomorrow's Leaders",
      subtitle: "Free education and counseling to help youth reach their potential", 
      color: "bg-theme-gold"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navigation />
      
      {/* Hero Section with Decorative Background */}
      <section className="relative h-[85vh] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            } ${slide.color}`}
          >
            <div className="absolute inset-0 bg-black bg-opacity-20" />
            
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
              <Heart className="absolute top-20 left-10 h-32 w-32 text-white animate-pulse" />
              <BookOpen className="absolute top-32 right-20 h-24 w-24 text-white" />
              <Users className="absolute bottom-40 left-20 h-28 w-28 text-white" />
              <Brain className="absolute bottom-20 right-32 h-36 w-36 text-white" />
              <Target className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-40 w-40 text-white opacity-5" />
            </div>
            
            <div className="relative h-full flex items-center justify-center text-white text-center px-4 z-20">
              <div className="max-w-5xl animate-fade-in">
                <div className="mb-8">
                  <Heart className="h-16 w-16 mx-auto mb-4 text-theme-gold animate-scale-in" />
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white drop-shadow-2xl font-poppins">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-12 text-gray-100 font-medium leading-relaxed">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Link to="/donate">
                    <Button size="default" className="bg-white text-theme-black hover:bg-gray-100 px-6 py-3 text-base font-semibold shadow-xl border-2 border-transparent hover:border-theme-gold transition-all duration-300">
                      <Heart className="mr-2 h-4 w-4" />
                      Donate Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/programs">
                    <Button size="default" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-theme-black px-6 py-3 text-base font-semibold backdrop-blur-sm bg-white/10 transition-all duration-300">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? "bg-theme-gold scale-125 shadow-lg" 
                  : "bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Impact Stats with Enhanced Design */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10">
            <Heart className="h-32 w-32 text-theme-red animate-pulse" />
          </div>
          <div className="absolute bottom-10 right-10">
            <BookOpen className="h-40 w-40 text-theme-green" />
          </div>
          <div className="absolute top-1/2 left-1/4">
            <Users className="h-24 w-24 text-theme-gold" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-theme-black mb-4 font-poppins">Our Impact</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Making a difference in young lives every day</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in border-l-4 border-theme-green transform hover:scale-105">
              <div className="w-16 h-16 bg-theme-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-theme-green mb-3 font-poppins">500+</div>
              <div className="text-gray-600 font-medium">Children Reached</div>
            </div>
            
            <div className="text-center bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in border-l-4 border-theme-red transform hover:scale-105" style={{animationDelay: '0.1s'}}>
              <div className="w-16 h-16 bg-theme-red rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-theme-red mb-3 font-poppins">25+</div>
              <div className="text-gray-600 font-medium">Programs Offered</div>
            </div>
            
            <div className="text-center bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in border-l-4 border-theme-gold transform hover:scale-105" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-theme-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-theme-gold mb-3 font-poppins">15+</div>
              <div className="text-gray-600 font-medium">Expert Volunteers</div>
            </div>
            
            <div className="text-center bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in border-l-4 border-theme-black transform hover:scale-105" style={{animationDelay: '0.3s'}}>
              <div className="w-16 h-16 bg-theme-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-theme-black mb-3 font-poppins">100%</div>
              <div className="text-gray-600 font-medium">Free Education</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action with Enhanced Design */}
      <section className="py-20 bg-theme-red text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-5 left-5">
            <Heart className="h-24 w-24 text-white animate-pulse" />
          </div>
          <div className="absolute top-10 right-10">
            <Users className="h-32 w-32 text-white" />
          </div>
          <div className="absolute bottom-5 left-1/4">
            <BookOpen className="h-20 w-20 text-white" />
          </div>
          <div className="absolute bottom-10 right-1/4">
            <Brain className="h-28 w-28 text-white" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Heart className="h-20 w-20 mx-auto mb-8 text-theme-gold animate-scale-in" />
            <h2 className="text-4xl md:text-6xl font-bold mb-8 font-poppins">Help Us Change Lives</h2>
            <p className="text-xl md:text-2xl mb-12 text-red-100 font-medium leading-relaxed max-w-3xl mx-auto">
              Your donation helps us provide free education, counseling, and life skills training to children who need it most.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/donate">
                <Button size="default" className="bg-theme-gold text-theme-black hover:bg-yellow-500 px-6 py-3 text-base font-semibold shadow-xl border-2 border-transparent hover:border-white transition-all duration-300">
                  <Heart className="mr-2 h-4 w-4" />
                  Donate Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="default" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-theme-red px-6 py-3 text-base font-semibold backdrop-blur-sm bg-white/10 transition-all duration-300">
                  <Users className="mr-2 h-4 w-4" />
                  Get Involved
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
