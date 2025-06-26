
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Target, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6 animate-fade-in">About Santa's Heart</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
            Dedicated to empowering young minds through comprehensive education, life skills training, and mental health support.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At Santa's Heart, we believe every child deserves access to quality education and support. Our mission is to 
                provide free, comprehensive programs that equip young people aged 0-25 with essential life skills, including 
                financial literacy, creative thinking, AI and technology awareness, and mental health support.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We are committed to breaking down barriers to education and creating opportunities for all children to reach 
                their full potential, regardless of their background or circumstances.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop" 
                alt="Children learning" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop" 
                alt="Youth empowerment" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We envision a world where every young person has the knowledge, skills, and confidence to create a 
                successful, healthy, and fulfilling life. Through our comprehensive programs, we aim to build a 
                generation of financially literate, creative, tech-savvy, and emotionally intelligent leaders.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our vision extends beyond individual success to creating stronger communities where young people become 
                positive change agents, helping others and contributing to society's overall well-being.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-xl text-gray-800">Compassion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We approach every child with empathy, understanding, and genuine care for their well-being and success.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-gray-800">Inclusivity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We welcome children from all backgrounds, ensuring equal access to our programs regardless of circumstances.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl text-gray-800">Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We strive for the highest quality in our programs, constantly improving to deliver exceptional education.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-gray-800">Empowerment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We believe in giving young people the tools and confidence to take control of their futures.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated professionals committed to making a difference in young lives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" 
                  alt="Founder" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <CardTitle className="text-xl text-gray-800">John Doe</CardTitle>
                <p className="text-red-600 font-medium">Founder & Executive Director</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  15+ years experience in youth development and education. Passionate about empowering the next generation.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face" 
                  alt="Program Director" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <CardTitle className="text-xl text-gray-800">Jane Smith</CardTitle>
                <p className="text-red-600 font-medium">Program Director</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Educational psychology expert with a focus on mental health and wellness programs for young people.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" 
                  alt="Technology Director" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <CardTitle className="text-xl text-gray-800">Mike Johnson</CardTitle>
                <p className="text-red-600 font-medium">Technology & Innovation Director</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  AI and technology specialist dedicated to teaching digital literacy and future-ready skills.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
