
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, BookOpen, Users, Brain, Target } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      title: "Empowering Young Minds",
      subtitle: "Teaching financial literacy, creativity, and life skills to children up to 25",
      color: "from-theme-green to-green-600",
      bgColor: "bg-theme-green"
    },
    {
      title: "Building Healthy Futures",
      subtitle: "Providing mental health support and wellness coaching for young people",
      color: "from-theme-red to-red-600",
      bgColor: "bg-theme-red"
    },
    {
      title: "Creating Tomorrow's Leaders",
      subtitle: "Free education and counseling to help youth reach their potential",
      color: "from-theme-gold to-yellow-600",
      bgColor: "bg-theme-gold"
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
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section with Color Backgrounds */}
      <section className="relative h-[80vh] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            } ${slide.bgColor}`}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30" />
            <div className="relative h-full flex items-center justify-center text-white text-center px-4 z-20">
              <div className="max-w-5xl animate-fade-in">
                <div className="mb-8">
                  <Heart className="h-16 w-16 mx-auto mb-4 text-theme-gold animate-scale-in" />
                </div>
                <h1 className="text-6xl md:text-8xl font-bold mb-8 text-white drop-shadow-2xl">
                  {slide.title}
                </h1>
                <p className="text-2xl md:text-3xl mb-12 text-gray-100 font-medium">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link to="/donate">
                    <Button size="lg" className="bg-white text-theme-black hover:bg-gray-100 px-10 py-6 text-xl font-semibold shadow-lg">
                      <Heart className="mr-3 h-6 w-6" />
                      Donate Now
                    </Button>
                  </Link>
                  <Link to="/programs">
                    <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-theme-black px-10 py-6 text-xl font-semibold">
                      <BookOpen className="mr-3 h-6 w-6" />
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 opacity-20">
              <Users className="h-24 w-24 text-white" />
            </div>
            <div className="absolute bottom-10 right-10 opacity-20">
              <Brain className="h-32 w-32 text-white" />
            </div>
            <div className="absolute top-20 right-20 opacity-10">
              <Target className="h-20 w-20 text-white" />
            </div>
          </div>
        ))}
        
        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
          {heroSlides.map((slide, index) => (
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
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10">
            <Heart className="h-32 w-32 text-theme-red" />
          </div>
          <div className="absolute bottom-10 right-10">
            <BookOpen className="h-40 w-40 text-theme-green" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-theme-black mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Making a difference in young lives every day</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow animate-fade-in border-l-4 border-theme-green">
              <div className="w-16 h-16 bg-theme-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-5xl font-bold text-theme-green mb-3">500+</div>
              <div className="text-gray-600 font-medium">Children Reached</div>
            </div>
            
            <div className="text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow animate-fade-in border-l-4 border-theme-red" style={{animationDelay: '0.1s'}}>
              <div className="w-16 h-16 bg-theme-red rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div className="text-5xl font-bold text-theme-red mb-3">25+</div>
              <div className="text-gray-600 font-medium">Programs Offered</div>
            </div>
            
            <div className="text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow animate-fade-in border-l-4 border-theme-gold" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-theme-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div className="text-5xl font-bold text-theme-gold mb-3">15+</div>
              <div className="text-gray-600 font-medium">Expert Volunteers</div>
            </div>
            
            <div className="text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow animate-fade-in border-l-4 border-theme-black" style={{animationDelay: '0.3s'}}>
              <div className="w-16 h-16 bg-theme-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div className="text-5xl font-bold text-theme-black mb-3">100%</div>
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
            <h2 className="text-6xl font-bold mb-8">Help Us Change Lives</h2>
            <p className="text-2xl mb-12 text-red-100 font-medium leading-relaxed">
              Your donation helps us provide free education, counseling, and life skills training to children who need it most.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/donate">
                <Button size="lg" className="bg-theme-gold text-theme-black hover:bg-yellow-500 px-10 py-6 text-xl font-semibold shadow-lg">
                  <Heart className="mr-3 h-6 w-6" />
                  Donate Today
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-theme-red px-10 py-6 text-xl font-semibold">
                  <Users className="mr-3 h-6 w-6" />
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
