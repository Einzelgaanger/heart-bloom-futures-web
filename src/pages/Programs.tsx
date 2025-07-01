
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Heart, Users, DollarSign, Palette, MessageCircle } from "lucide-react";

const Programs = () => {
  const programs = [
    {
      title: "Financial Literacy",
      description: "Learn money management, budgeting, and saving skills.",
      icon: DollarSign,
      age: "16-25 years",
      duration: "8 weeks",
      features: ["Budgeting", "Saving", "Investment", "Business"],
      color: "green"
    },
    {
      title: "AI & Technology",
      description: "Discover AI, coding, and digital literacy skills.",
      icon: Brain,
      age: "14-25 years", 
      duration: "12 weeks",
      features: ["AI basics", "Programming", "Digital tools", "Tech careers"],
      color: "blue"
    },
    {
      title: "Creative Arts",
      description: "Express creativity through various art forms.",
      icon: Palette,
      age: "10-25 years",
      duration: "10 weeks", 
      features: ["Visual arts", "Music", "Writing", "Innovation"],
      color: "purple"
    },
    {
      title: "Mental Health",
      description: "Build emotional resilience and wellness.",
      icon: Heart,
      age: "12-25 years",
      duration: "6 weeks",
      features: ["Stress management", "Emotional intelligence", "Mindfulness", "Support"],
      color: "red"
    },
    {
      title: "Life Skills",
      description: "Develop communication and leadership skills.",
      icon: Users,
      age: "15-25 years",
      duration: "8 weeks",
      features: ["Communication", "Leadership", "Goal setting", "Time management"],
      color: "orange"
    },
    {
      title: "Health & Lifestyle",
      description: "Learn about nutrition, exercise, and healthy living.",
      icon: BookOpen,
      age: "10-25 years", 
      duration: "6 weeks",
      features: ["Nutrition", "Exercise", "Health screening", "Lifestyle"],
      color: "teal"
    }
  ];

  const handleEnrollment = (programTitle: string) => {
    const message = `Hi! I'm interested in the "${programTitle}" program. Please provide registration details.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/254700861129?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
          <h1 className="text-3xl font-bold mb-4">Our Programs</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Comprehensive programs for children's growth and development
          </p>
        </div>
      </section>
      
      {/* Programs Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => {
              const IconComponent = program.icon;
              const colorClasses = {
                green: "from-green-500 to-green-600",
                blue: "from-blue-500 to-blue-600", 
                purple: "from-purple-500 to-purple-600",
                red: "from-red-500 to-red-600",
                orange: "from-orange-500 to-orange-600",
                teal: "from-teal-500 to-teal-600"
              };

              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 h-full">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-gradient-to-r ${colorClasses[program.color as keyof typeof colorClasses]} text-white`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg mb-2">{program.title}</CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="text-xs">{program.age}</Badge>
                      <Badge variant="outline" className="text-xs">{program.duration}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-gray-600 mb-4 flex-1">{program.description}</p>
                    
                    <div className="mb-4">
                      <div className="grid grid-cols-2 gap-1">
                        {program.features.map((feature, idx) => (
                          <div key={idx} className="text-xs text-gray-500 flex items-center">
                            <div className="w-1 h-1 bg-green-500 rounded-full mr-2"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button 
                      onClick={() => handleEnrollment(program.title)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white text-sm"
                    >
                      <MessageCircle className="h-3 w-3 mr-2" />
                      Enroll Now
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Programs;
