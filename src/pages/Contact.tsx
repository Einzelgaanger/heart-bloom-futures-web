
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add email service integration here
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-100 overflow-x-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-12 text-white relative bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 border-4 border-white rounded-full animate-spin" style={{animationDuration: '15s'}}></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 border-4 border-white rounded-full animate-bounce"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <Phone className="h-12 w-12 mx-auto mb-4 text-theme-gold animate-scale-in" />
          <h1 className="text-2xl md:text-3xl font-bold mb-4 font-poppins">Contact Us</h1>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto">
            Get in touch with us to learn more or get involved
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 bg-gradient-to-r from-white/95 to-teal-50/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <Card className="shadow-xl bg-white/95 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-t-lg">
                <CardTitle className="text-xl font-bold flex items-center">
                  <Send className="mr-3 h-5 w-5" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      placeholder="What is this about?"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="mt-1 min-h-[120px]"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800 flex items-center">
                    <Phone className="mr-3 h-5 w-5 text-teal-600" />
                    Phone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">+254 700 861 129</p>
                  <p className="text-sm text-gray-500 mt-2">Available Monday - Friday, 9:00 AM - 5:00 PM</p>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800 flex items-center">
                    <Mail className="mr-3 h-5 w-5 text-teal-600" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">santashearts@gmail.com</p>
                  <p className="text-sm text-gray-500 mt-2">We typically respond within 24 hours</p>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800 flex items-center">
                    <MapPin className="mr-3 h-5 w-5 text-teal-600" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Nairobi, Kenya</p>
                  <p className="text-sm text-gray-500 mt-2">Serving communities across Kenya</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Get Involved</h3>
                  <p className="text-teal-100 text-sm mb-4">
                    Join our mission to empower children through education and support programs.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm">• Volunteer opportunities</p>
                    <p className="text-sm">• Partnership programs</p>
                    <p className="text-sm">• Community events</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
