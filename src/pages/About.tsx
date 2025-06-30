import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Target, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
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
                src="/Impa11.jpg" 
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
                src="/Impa22.png" 
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
                  src="/Founder.jpg" 
                  alt="Founder" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <CardTitle className="text-xl text-gray-800">Alfred Mulinge</CardTitle>
                <p className="text-red-600 font-medium">Founder & Executive Director</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  6+ years experience in counselling and youth development. Passionate about empowering the next generation.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <img 
                  src="/Jotham.jpg" 
                  alt="Program Director" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <CardTitle className="text-xl text-gray-800">Jotham Siror</CardTitle>
                <p className="text-red-600 font-medium"> Programs & Strategy Director</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                Young passionate environmentalist with a love for mentorship and youth engagement
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <img 
                  src="/ebrahim.jpg" 
                  alt="Technology Director" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <CardTitle className="text-xl text-gray-800">Ebrahim Jin </CardTitle>
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
