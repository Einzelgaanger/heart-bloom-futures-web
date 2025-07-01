
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Target, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Heart className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
          <h1 className="text-3xl font-bold mb-4">About Santa's Heart</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Empowering children through education, counseling, and life skills
          </p>
        </div>
      </section>
      
      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                At Santa's Heart, we provide free education and support programs for young people 
                aged 0-25, including financial literacy, creative thinking, AI awareness, and mental health support.
              </p>
              <p className="text-gray-600">
                We're committed to breaking down barriers and creating opportunities for all children 
                to reach their full potential.
              </p>
            </div>
            <div>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="/Impa22.png" 
                alt="Youth empowerment" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-600 mb-4">
                We envision a world where every young person has the knowledge and skills to create 
                a successful life. Through our programs, we build financially literate, creative, 
                and emotionally intelligent leaders.
              </p>
              <p className="text-gray-600">
                Our vision extends to creating stronger communities where young people become 
                positive change agents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Our Values</h2>
            <p className="text-gray-600">The principles guiding our work</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-lg">Compassion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  We approach every child with empathy and genuine care.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Inclusivity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  We welcome children from all backgrounds with equal access.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  We strive for the highest quality in our programs.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Empowerment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  We give young people tools to control their futures.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Our Team</h2>
            <p className="text-gray-600">Dedicated professionals making a difference</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <img 
                  src="/Founder.jpg" 
                  alt="Founder" 
                  className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
                />
                <CardTitle className="text-lg">Alfred Mulinge</CardTitle>
                <p className="text-red-600 text-sm">Founder & Executive Director</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  6+ years experience in counselling and youth development.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <img 
                  src="/Jotham.jpg" 
                  alt="Program Director" 
                  className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
                />
                <CardTitle className="text-lg">Jotham Siror</CardTitle>
                <p className="text-red-600 text-sm">Programs Director</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Passionate environmentalist with love for mentorship.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <img 
                  src="/ebrahim.jpg" 
                  alt="Technology Director" 
                  className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
                />
                <CardTitle className="text-lg">Ebrahim Jin</CardTitle>
                <p className="text-red-600 text-sm">Technology Director</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  AI specialist teaching digital literacy and future skills.
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
