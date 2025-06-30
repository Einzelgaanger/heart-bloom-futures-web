
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      title: "Empowering Young Minds",
      subtitle: "Teaching financial literacy, creativity, and life skills to children up to 25",
      image: "/Image 2.jpg"
    },
    {
      title: "Building Healthy Futures",
      subtitle: "Providing mental health support and wellness coaching for young people",
      image: "/Mentalh.jpg"
    },
    {
      title: "Creating Tomorrow's Leaders",
      subtitle: "Free education and counseling to help youth reach their potential",
      image: "/NGO Education.jpg"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000); // Increased interval for better visibility
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="h-full relative">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.log(`Failed to load image: ${slide.image}`);
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }}
                onLoad={() => {
                  console.log(`Successfully loaded image: ${slide.image}`);
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50" />
              <div className="relative h-full flex items-center justify-center text-white text-center px-4 z-20">
                <div className="max-w-4xl animate-fade-in">
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-gray-100">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/donate">
                      <Button size="lg" className="bg-theme-red hover:bg-red-700 text-white px-8 py-4 text-lg">
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
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? "bg-theme-gold" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-theme-green mb-2">500+</div>
              <div className="text-gray-600">Children Reached</div>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '0.1s'}}>
              <div className="text-4xl font-bold text-theme-green mb-2">25+</div>
              <div className="text-gray-600">Programs Offered</div>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="text-4xl font-bold text-theme-green mb-2">15+</div>
              <div className="text-gray-600">Expert Volunteers</div>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="text-4xl font-bold text-theme-green mb-2">100%</div>
              <div className="text-gray-600">Free Education</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-theme-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Help Us Change Lives</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-red-100">
            Your donation helps us provide free education, counseling, and life skills training to children who need it most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/donate">
              <Button size="lg" className="bg-white text-theme-red hover:bg-gray-100 px-8 py-4 text-lg">
                <Heart className="mr-2 h-5 w-5" />
                Donate Today
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-theme-red px-8 py-4 text-lg">
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
