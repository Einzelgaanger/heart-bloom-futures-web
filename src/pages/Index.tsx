
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, BookOpen, Users, Brain, Target, ArrowRight, DollarSign, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      title: "Empowering Young Minds",
      subtitle: "Teaching financial literacy, creativity, and life skills to children up to 25",
      color: "bg-gradient-to-br from-green-600 to-emerald-600",
    },
    {
      title: "Building Healthy Futures", 
      subtitle: "Providing mental health support and wellness coaching for young people",
      color: "bg-gradient-to-br from-red-600 to-rose-600",
    },
    {
      title: "Creating Tomorrow's Leaders",
      subtitle: "Free education and counseling to help youth reach their potential", 
      color: "bg-gradient-to-br from-yellow-600 to-amber-600",
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
      
      {/* Hero Section */}
      <section className="relative h-[70vh]">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            } ${slide.color}`}
          >
            <div className="absolute inset-0 bg-black/20" />
            
            <div className="relative h-full flex items-center justify-center text-white text-center px-4">
              <div className="max-w-3xl">
                <Heart className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg mb-6 text-gray-100">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/donate">
                    <Button className="bg-white text-gray-900 hover:bg-gray-100">
                      <Heart className="mr-2 h-4 w-4" />
                      Donate Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/programs">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
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
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index 
                  ? "bg-yellow-400 scale-125" 
                  : "bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Program Dashboards */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Programs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive support across key areas</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Financial Literacy */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-xl text-white transform hover:scale-105 transition-all">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="h-10 w-10" />
                <div className="text-right">
                  <div className="text-xl font-bold">85%</div>
                  <div className="text-green-100 text-sm">Success Rate</div>
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">Financial Literacy</h3>
              <p className="text-green-100 mb-4 text-sm">Money management and entrepreneurship skills</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Participants</span>
                  <span className="font-semibold">150+</span>
                </div>
                <div className="flex justify-between">
                  <span>Workshops</span>
                  <span className="font-semibold">12/month</span>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-gradient-to-br from-red-600 to-red-700 p-6 rounded-xl text-white transform hover:scale-105 transition-all">
              <div className="flex items-center justify-between mb-4">
                <GraduationCap className="h-10 w-10" />
                <div className="text-right">
                  <div className="text-xl font-bold">92%</div>
                  <div className="text-red-100 text-sm">Completion</div>
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">Education Support</h3>
              <p className="text-red-100 mb-4 text-sm">Free tutoring and academic guidance</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Students</span>
                  <span className="font-semibold">200+</span>
                </div>
                <div className="flex justify-between">
                  <span>Study Groups</span>
                  <span className="font-semibold">8</span>
                </div>
              </div>
            </div>

            {/* Mental Health */}
            <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 p-6 rounded-xl text-white transform hover:scale-105 transition-all">
              <div className="flex items-center justify-between mb-4">
                <Brain className="h-10 w-10" />
                <div className="text-right">
                  <div className="text-xl font-bold">98%</div>
                  <div className="text-yellow-100 text-sm">Satisfaction</div>
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">Mental Wellness</h3>
              <p className="text-yellow-100 mb-4 text-sm">Counseling and emotional support</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Sessions</span>
                  <span className="font-semibold">25/week</span>
                </div>
                <div className="flex justify-between">
                  <span>Support Groups</span>
                  <span className="font-semibold">5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Making a difference every day</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-green-600 mb-1">500+</div>
              <div className="text-gray-600 text-sm">Children Reached</div>
            </div>
            
            <div className="text-center bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-red-600 mb-1">25+</div>
              <div className="text-gray-600 text-sm">Programs</div>
            </div>
            
            <div className="text-center bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-yellow-600 mb-1">15+</div>
              <div className="text-gray-600 text-sm">Volunteers</div>
            </div>
            
            <div className="text-center bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">100%</div>
              <div className="text-gray-600 text-sm">Free Education</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <Heart className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-lg mb-6 text-red-100">
              Your support helps us provide free education and life skills training to children who need it most.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/donate">
                <Button className="bg-yellow-500 text-gray-900 hover:bg-yellow-400">
                  <Heart className="mr-2 h-4 w-4" />
                  Support Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
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
