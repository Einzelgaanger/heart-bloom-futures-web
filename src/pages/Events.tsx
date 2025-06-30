
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image_url: string;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('date', new Date().toISOString().split('T')[0])
        .order('date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Error",
        description: "Failed to load events",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url('/Image 2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-white/90" />
      
      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section */}
        <section 
          className="py-16 text-white relative overflow-hidden"
          style={{
            backgroundImage: `url('/Joth.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-theme-green bg-opacity-80" />
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <Calendar className="h-16 w-16 mx-auto mb-6 text-theme-gold animate-scale-in" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-poppins">Upcoming Events</h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Join us for workshops, training sessions, and community events
            </p>
          </div>
        </section>
        
        {/* Events Section */}
        <section className="py-16 bg-white/95 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <p className="mt-4 text-gray-600">Loading events...</p>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Upcoming Events</h3>
                <p className="text-gray-500">Check back soon for new events and workshops!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                  <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow border-green-200 bg-white/95 backdrop-blur-sm">
                    {event.image_url && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={event.image_url}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl text-gray-800">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-green-600" />
                        {formatDate(event.date)}
                      </div>
                      {event.location && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-red-600" />
                          {event.location}
                        </div>
                      )}
                      {event.description && (
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {event.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Events;
