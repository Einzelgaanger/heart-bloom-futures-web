
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Brain, BookOpen, Shield, Users, Heart, Calendar, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Programs = () => {
  const programs = [
    {
      title: "Financial Literacy Bootcamp",
      description: "Comprehensive financial education covering budgeting, saving, investing, and entrepreneurship basics.",
      icon: Target,
      color: "green",
      duration: "8 weeks",
      ageGroup: "12-25 years",
      schedule: "Saturdays 10am-2pm",
      features: [
        "Personal budgeting and expense tracking",
        "Introduction to saving and investment",
        "Entrepreneurship fundamentals",
        "Banking and credit basics",
        "Practical money management projects"
      ]
    },
    {
      title: "AI & Technology Workshop",
      description: "Introduction to artificial intelligence, coding basics, and digital literacy for the modern world.",
      icon: Brain,
      color: "blue",
      duration: "10 weeks",
      ageGroup: "8-25 years",
      schedule: "Weekdays 4pm-6pm",
      features: [
        "AI fundamentals and applications",
        "Basic programming concepts",
        "Digital tools and productivity apps",
        "Online safety and digital citizenship",
        "Tech career exploration"
      ]
    },
    {
      title: "Creative Skills Development",
      description: "Fostering creativity through arts, writing, design thinking, and innovative problem-solving.",
      icon: BookOpen,
      color: "purple",
      duration: "6 weeks",
      ageGroup: "5-25 years",
      schedule: "Flexible timing",
      features: [
        "Art and craft workshops",
        "Creative writing sessions",
        "Design thinking methodology",
        "Public speaking and presentation",
        "Creative project showcases"
      ]
    },
    {
      title: "Mental Health & Counseling",
      description: "Professional mental health support, stress management, and emotional intelligence development.",
      icon: Shield,
      color: "pink",
      duration: "Ongoing",
      ageGroup: "All ages",
      schedule: "By appointment",
      features: [
        "Individual counseling sessions",
        "Group therapy workshops",
        "Stress management techniques",
        "Emotional intelligence training",
        "Crisis intervention support"
      ]
    },
    {
      title: "Healthy Lifestyle Coaching",
      description: "Nutrition education, physical wellness, and building sustainable healthy habits.",
      icon: Users,
      color: "orange",
      duration: "12 weeks",
      ageGroup: "10-25 years",
      schedule: "Tuesdays & Thursdays 5pm-7pm",
      features: [
        "Nutrition and meal planning",
        "Physical fitness programs",
        "Mental wellness practices",
        "Sleep hygiene education",
        "Habit formation strategies"
      ]
    },
    {
      title: "Disease Awareness Program",
      description: "Health education focusing on disease prevention, health literacy, and making informed health decisions.",
      icon: Heart,
      color: "red",
      duration: "4 weeks",
      ageGroup: "13-25 years",
      schedule: "Monthly workshops",
      features: [
        "Disease prevention education",
        "Health screening awareness",
        "First aid and emergency response",
        "Sexual health education",
        "Community health advocacy"
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: "bg-green-100 text-green-600",
      blue: "bg-blue-100 text-blue-600",
      purple: "bg-purple-100 text-purple-600",
      pink: "bg-pink-100 text-pink-600",
      orange: "bg-orange-100 text-orange-600",
      red: "bg-red-100 text-red-600"
    };
    return colors[color as keyof typeof colors] || colors.green;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6 animate-fade-in">Our Programs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
            Comprehensive educational and wellness programs designed to empower young minds and build life skills
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {programs.map((program, index) => {
              const IconComponent = program.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow hover-scale">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(program.color)}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {program.ageGroup}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl text-gray-800 mb-2">{program.title}</CardTitle>
                    <p className="text-gray-600 mb-4">{program.description}</p>
                    
                    {/* Program Details */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {program.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {program.schedule}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <h4 className="font-semibold text-gray-800 mb-3">What You'll Learn:</h4>
                    <ul className="space-y-2 mb-6">
                      {program.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex gap-3">
                      <Link to="/contact" className="flex-1">
                        <Button className="w-full bg-red-600 hover:bg-red-700">
                          Enroll Now
                        </Button>
                      </Link>
                      <Button variant="outline" className="flex-1">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Program Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Our Programs?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing the highest quality education and support for young people
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">100% Free</h3>
              <p className="text-gray-600">
                All our programs are completely free, ensuring access regardless of financial circumstances.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from qualified professionals and industry experts who are passionate about youth development.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Practical Skills</h3>
              <p className="text-gray-600">
                Focus on real-world applications and skills that can be immediately implemented in daily life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-red-100">
            Join thousands of young people who have transformed their lives through our programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 px-8 py-4 text-lg">
                Apply Now
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 text-lg">
                Learn About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Programs;
