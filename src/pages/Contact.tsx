import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-100">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-teal-400 to-cyan-300 rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-300 rounded-full translate-x-40 translate-y-40"></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-br from-cyan-400 to-blue-300 rounded-full"></div>
      </div>
      
      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section */}
        <section className="py-12 text-white relative overflow-hidden bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-20 h-20 border-4 border-white rounded-full animate-spin" style={{animationDuration: '15s'}}></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 border-4 border-white rounded-full animate-bounce"></div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <Phone className="h-12 w-12 mx-auto mb-4 text-theme-gold animate-scale-in" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">Contact Us</h1>
            <p className="text-lg text-teal-100 max-w-2xl mx-auto">
              Get in touch with us to learn more or get involved
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Contact;
