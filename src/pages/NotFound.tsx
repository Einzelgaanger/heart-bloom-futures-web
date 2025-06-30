
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url('/Founder.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-white/85" />
      
      <div className="text-center relative z-10 p-8">
        <div className="mb-6">
          <AlertTriangle className="h-24 w-24 text-theme-gold mx-auto mb-4" />
        </div>
        <h1 className="text-6xl font-bold mb-4 text-theme-black font-poppins">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Oops! Page not found</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="bg-theme-green hover:bg-green-600 text-white px-6 py-3">
            <Home className="h-4 w-4 mr-2" />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
