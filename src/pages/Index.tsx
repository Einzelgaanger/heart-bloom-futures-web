
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, BookOpen, Users, Brain, Target, ArrowRight, Globe, Award, DollarSign, GraduationCap, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      title: "Empowering Young Minds",
      subtitle: "Teaching financial literacy, creativity, and life skills to children up to 25",
      color: "bg-gradient-to-br from-theme-green via-green-500 to-emerald-600",
    },
    {
      title: "Building Healthy Futures", 
      subtitle: "Providing mental health support and wellness coaching for young people",
      color: "bg-gradient-to-br from-theme-red via-red-500 to-rose-600",
    },
    {
      title: "Creating Tomorrow's Leaders",
      subtitle: "Free education and counseling to help youth reach their potential", 
      color: "bg-gradient-to-br from-theme-gold via-yellow-500 to-amber-600",
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
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Creative Backgrounds */}
      <section className="relative h-[80vh] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            } ${slide.color}`}
          >
            <div className="absolute inset-0 bg-black/30" />
            
            {/* Creative Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/20 animate-pulse"></div>
                <div className="absolute top-32 right-20 w-16 h-16 rounded-full bg-white/15"></div>
                <div className="absolute bottom-40 left-20 w-24 h-24 rounded-full bg-white/20"></div>
                <div className="absolute bottom-20 right-32 w-32 h-32 rounded-full bg-white/15 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-white/10"></div>
              </div>
              <Heart className="absolute top-20 left-10 h-24 w-24 text-white animate-pulse" />
              <BookOpen className="absolute top-32 right-20 h-20 w-20 text-white" />
              <Users className="absolute bottom-40 left-20 h-22 w-22 text-white" />
              <Brain className="absolute bottom-20 right-32 h-28 w-28 text-white" />
            </div>
            
            <div className="relative h-full flex items-center justify-center text-white text-center px-4 z-20">
              <div className="max-w-4xl animate-fade-in">
                <div className="mb-6">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-theme-gold animate-scale-in" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-2xl font-poppins">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-100 font-medium leading-relaxed">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link to="/donate">
                    <Button size="sm" className="bg-white text-theme-black hover:bg-gray-100 px-6 py-2 text-sm font-semibold shadow-xl border-2 border-transparent hover:border-theme-gold transition-all duration-300">
                      <Heart className="mr-2 h-4 w-4" />
                      Donate Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/programs">
                    <Button size="sm" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-theme-black px-6 py-2 text-sm font-semibold backdrop-blur-sm bg-white/10 transition-all duration-300">
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
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? "bg-theme-gold scale-125 shadow-lg" 
                  : "bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Program Dashboards with Creative Background */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-64 h-64 bg-theme-green rounded-full -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-theme-red rounded-full translate-x-40 translate-y-40"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-theme-gold rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-theme-black mb-4 font-poppins">Our Programs</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Comprehensive support across key areas of development</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Financial Literacy Dashboard */}
            <div className="bg-gradient-to-br from-theme-green to-green-600 p-8 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <DollarSign className="h-12 w-12 text-white" />
                <div className="text-right">
                  <div className="text-2xl font-bold">85%</div>
                  <div className="text-green-100 text-sm">Success Rate</div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Financial Literacy</h3>
              <p className="text-green-100 mb-4">Teaching money management, savings, and entrepreneurship skills</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Active Participants</span>
                  <span className="font-semibold">150+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Workshops This Month</span>
                  <span className="font-semibold">12</span>
                </div>
              </div>
            </div>

            {/* Education Dashboard */}
            <div className="bg-gradient-to-br from-theme-red to-red-600 p-8 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <GraduationCap className="h-12 w-12 text-white" />
                <div className="text-right">
                  <div className="text-2xl font-bold">92%</div>
                  <div className="text-red-100 text-sm">Completion Rate</div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Education Support</h3>
              <p className="text-red-100 mb-4">Free tutoring, mentorship, and academic guidance</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Students Supported</span>
                  <span className="font-semibold">200+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Study Groups</span>
                  <span className="font-semibold">8</span>
                </div>
              </div>
            </div>

            {/* Mental Health Dashboard */}
            <div className="bg-gradient-to-br from-theme-gold to-yellow-600 p-8 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <Brain className="h-12 w-12 text-white" />
                <div className="text-right">
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-yellow-100 text-sm">Satisfaction</div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Mental Wellness</h3>
              <p className="text-yellow-100 mb-4">Counseling, therapy, and emotional support services</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Sessions This Week</span>
                  <span className="font-semibold">25</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Support Groups</span>
                  <span className="font-semibold">5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats with Creative Background */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-theme-gold rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 border-4 border-theme-red rounded-full animate-bounce"></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-theme-green rounded-full animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-theme-black mb-4 font-poppins">Our Impact</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Making a difference in young lives every day</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-theme-green transform hover:scale-105">
              <div className="w-12 h-12 bg-theme-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-theme-green mb-2 font-poppins">500+</div>
              <div className="text-gray-600 font-medium">Children Reached</div>
            </div>
            
            <div className="text-center bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-theme-red transform hover:scale-105">
              <div className="w-12 h-12 bg-theme-red rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-theme-red mb-2 font-poppins">25+</div>
              <div className="text-gray-600 font-medium">Programs Offered</div>
            </div>
            
            <div className="text-center bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-theme-gold transform hover:scale-105">
              <div className="w-12 h-12 bg-theme-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-theme-gold mb-2 font-poppins">15+</div>
              <div className="text-gray-600 font-medium">Expert Volunteers</div>
            </div>
            
            <div className="text-center bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-theme-black transform hover:scale-105">
              <div className="w-12 h-12 bg-theme-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-theme-black mb-2 font-poppins">100%</div>
              <div className="text-gray-600 font-medium">Free Education</div>
            </div>
          </div>
        </div>
      </section>

      {/* Simplified Call to Action */}
      <section className="py-16 bg-gradient-to-br from-theme-red via-red-600 to-red-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-12"></div>
          <Heart className="absolute top-5 left-5 h-20 w-20 text-white animate-pulse" />
          <Users className="absolute top-10 right-10 h-24 w-24 text-white" />
          <Shield className="absolute bottom-10 right-1/4 h-20 w-20 text-white" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <Heart className="h-16 w-16 mx-auto mb-6 text-theme-gold animate-scale-in" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-poppins">Join Our Mission</h2>
            <p className="text-lg md:text-xl mb-8 text-red-100 font-medium leading-relaxed">
              Your support helps us provide free education, counseling, and life skills training to children who need it most.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/donate">
                <Button size="sm" className="bg-theme-gold text-theme-black hover:bg-yellow-500 px-6 py-2 text-sm font-semibold shadow-xl border-2 border-transparent hover:border-white transition-all duration-300">
                  <Heart className="mr-2 h-4 w-4" />
                  Support Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="sm" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-theme-red px-6 py-2 text-sm font-semibold backdrop-blur-sm bg-white/10 transition-all duration-300">
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
