
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, BookOpen, Heart, Trophy, Star, MapPin } from "lucide-react";

const Impact = () => {
  const impactStats = [
    { number: "1,247", label: "Children Reached", icon: Users, color: "blue" },
    { number: "45", label: "Programs Completed", icon: BookOpen, color: "green" },
    { number: "$125K", label: "Donated to Date", icon: Heart, color: "red" },
    { number: "23", label: "Community Partners", icon: Trophy, color: "purple" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      age: 19,
      program: "Financial Literacy",
      quote: "The financial literacy program changed my life. I learned how to budget, save, and even started my own small business!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      age: 16,
      program: "AI & Technology",
      quote: "Learning about AI and coding opened up a whole new world for me. Now I'm planning to study computer science in college.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      age: 22,
      program: "Mental Health Support",
      quote: "The counseling sessions helped me through a difficult time. I now have the tools to manage stress and anxiety.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const programs = [
    { name: "Financial Literacy", completed: 85, total: 100 },
    { name: "Technology Training", completed: 72, total: 80 },
    { name: "Creative Skills", completed: 95, total: 120 },
    { name: "Mental Health Support", completed: 160, total: 200 },
    { name: "Lifestyle Coaching", completed: 45, total: 60 }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6 animate-fade-in">Our Impact</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
            See how Santa's Heart is transforming lives and building stronger communities through education and support
          </p>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => {
              const IconComponent = stat.icon;
              const colorClasses = {
                blue: "bg-blue-100 text-blue-600",
                green: "bg-green-100 text-green-600",
                red: "bg-red-100 text-red-600",
                purple: "bg-purple-100 text-purple-600"
              };
              
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow hover-scale">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <div className="text-4xl font-bold text-gray-800 mb-2">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Program Progress */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Program Participation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Track our progress in reaching and educating young people across all our programs
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {programs.map((program, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{program.name}</h3>
                  <span className="text-sm text-gray-600">
                    {program.completed} / {program.total} participants
                  </span>
                </div>
                <Progress 
                  value={(program.completed / program.total) * 100} 
                  className="h-3"
                />
                <div className="text-right mt-2">
                  <span className="text-sm font-medium text-red-600">
                    {Math.round((program.completed / program.total) * 100)}% Complete
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from the young people whose lives have been transformed through our programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                  />
                  <CardTitle className="text-lg text-gray-800">{testimonial.name}</CardTitle>
                  <p className="text-sm text-gray-500">Age {testimonial.age} • {testimonial.program}</p>
                  <div className="flex justify-center gap-1 my-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic text-center">
                    "{testimonial.quote}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Impact Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Community Reach</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our programs are making a difference in communities around the region
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <MapPin className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Downtown Center</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gray-800 mb-1">342</p>
                <p className="text-gray-600 text-sm">Students Served</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <MapPin className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Eastside Campus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gray-800 mb-1">287</p>
                <p className="text-gray-600 text-sm">Students Served</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <MapPin className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Community Hub</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gray-800 mb-1">618</p>
                <p className="text-gray-600 text-sm">Students Served</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Help Us Reach More Young People</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-red-100">
            Your support helps us expand our programs and reach even more children who need our services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/donate">
              <button className="bg-white text-red-600 hover:bg-red-50 px-8 py-4 text-lg font-semibold rounded-lg transition-colors">
                <Heart className="inline mr-2 h-5 w-5" />
                Donate Now
              </button>
            </a>
            <a href="/contact">
              <button className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 text-lg font-semibold rounded-lg transition-colors">
                Get Involved
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Impact;
