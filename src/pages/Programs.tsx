import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Heart, Users, DollarSign, Palette, MessageCircle } from "lucide-react";

const Programs = () => {
  const programs = [
    {
      title: "Financial Literacy & Management",
      description: "Learn essential money management skills including budgeting, saving, investing, and entrepreneurship basics.",
      icon: DollarSign,
      age: "16-25 years",
      duration: "8 weeks",
      features: ["Budgeting basics", "Saving strategies", "Investment fundamentals", "Business planning"],
      color: "green"
    },
    {
      title: "AI & Technology Skills",
      description: "Discover the world of artificial intelligence, coding basics, and digital literacy for the modern world.",
      icon: Brain,
      age: "14-25 years", 
      duration: "12 weeks",
      features: ["AI fundamentals", "Basic programming", "Digital tools", "Tech career guidance"],
      color: "blue"
    },
    {
      title: "Creative Arts & Innovation",
      description: "Express yourself through various art forms while developing creative problem-solving skills.",
      icon: Palette,
      age: "10-25 years",
      duration: "10 weeks", 
      features: ["Visual arts", "Music & performance", "Creative writing", "Innovation workshops"],
      color: "purple"
    },
    {
      title: "Mental Health & Wellbeing",
      description: "Build emotional resilience, learn coping strategies, and maintain mental wellness in daily life.",
      icon: Heart,
      age: "12-25 years",
      duration: "6 weeks",
      features: ["Stress management", "Emotional intelligence", "Mindfulness", "Peer support groups"],
      color: "red"
    },
    {
      title: "Life Skills & Personal Development", 
      description: "Develop essential life skills including communication, leadership, and personal goal setting.",
      icon: Users,
      age: "15-25 years",
      duration: "8 weeks",
      features: ["Communication skills", "Leadership development", "Goal setting", "Time management"],
      color: "orange"
    },
    {
      title: "Health & Lifestyle Coaching",
      description: "Learn about nutrition, exercise, healthy habits, and disease prevention for a better quality of life.",
      icon: BookOpen,
      age: "10-25 years", 
      duration: "6 weeks",
      features: ["Nutrition education", "Exercise programs", "Health screening", "Lifestyle planning"],
      color: "teal"
    }
  ];

  const handleEnrollment = (programTitle: string) => {
    const message = `Hi! I'm interested in enrolling for the "${programTitle}" program at Santa's Heart. Could you please provide me with more information about registration and the next available sessions?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/254700861129?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div 
      className="min-h-screen relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100"
      style={{
        backgroundImage: `url('/Image 2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-gray-50/90 to-green-50/95" />
      
      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section */}
        <section 
          className="py-12 text-white relative overflow-hidden bg-gradient-to-br from-theme-green via-green-600 to-emerald-700"
          style={{
            backgroundImage: `url('/NGO Education.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-theme-green bg-opacity-85" />
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-theme-gold animate-scale-in" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">Our Programs</h1>
            <p className="text-lg text-green-100 max-w-2xl mx-auto">
              Comprehensive programs designed to support children's growth and development
            </p>
          </div>
        </section>
        
        {/* Programs Grid */}
        <section className="py-16 bg-white/95 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program, index) => {
                const IconComponent = program.icon;
                const colorClasses = {
                  green: "bg-green-100 text-green-600 border-green-200",
                  blue: "bg-blue-100 text-blue-600 border-blue-200", 
                  purple: "bg-purple-100 text-purple-600 border-purple-200",
                  red: "bg-red-100 text-red-600 border-red-200",
                  orange: "bg-orange-100 text-orange-600 border-orange-200",
                  teal: "bg-teal-100 text-teal-600 border-teal-200"
                };

                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow hover-scale h-full bg-white/95 backdrop-blur-sm">
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${colorClasses[program.color as keyof typeof colorClasses]}`}>
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <CardTitle className="text-xl text-gray-800 mb-2">{program.title}</CardTitle>
                      <div className="flex gap-2 mb-4">
                        <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                          {program.age}
                        </Badge>
                        <Badge variant="secondary" className="bg-red-50 text-red-700 border-red-200">
                          {program.duration}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-gray-600 mb-6 flex-1">{program.description}</p>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-800 mb-3">What you'll learn:</h4>
                        <ul className="space-y-2">
                          {program.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button 
                        onClick={() => handleEnrollment(program.title)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Enroll Now via WhatsApp
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Program Benefits */}
        <section className="py-16 bg-green-50/95 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Our Programs?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive approach ensures holistic development and real-world application
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Expert Mentors</h3>
                <p className="text-gray-600">Learn from experienced professionals and dedicated volunteers</p>
              </div>

              <div className="text-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Practical Learning</h3>
                <p className="text-gray-600">Hands-on experience with real-world applications and projects</p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Supportive Community</h3>
                <p className="text-gray-600">Join a network of peers and mentors who care about your success</p>
              </div>

              <div className="text-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Future-Ready Skills</h3>
                <p className="text-gray-600">Develop skills that are essential for success in the modern world</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Programs;
