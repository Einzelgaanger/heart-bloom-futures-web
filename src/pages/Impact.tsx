
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MediaCarousel from "@/components/MediaCarousel";
import { MapPin, Calendar, Users, Target } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Impact = () => {
  const [visits, setVisits] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalDonations: 0,
    childrenReached: 0,
    programsCompleted: 0,
    communityPartners: 0
  });

  useEffect(() => {
    fetchVisits();
    fetchStats();
  }, []);

  const fetchVisits = async () => {
    try {
      const { data, error } = await supabase
        .from('visits')
        .select('*')
        .order('visit_date', { ascending: false });

      if (error) throw error;
      setVisits(data || []);
    } catch (error) {
      console.error('Error fetching visits:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*');

      if (error) throw error;
      
      const settingsObj = data?.reduce((acc: any, item: any) => {
        acc[item.key] = item.value;
        return acc;
      }, {});

      setStats({
        totalDonations: parseInt(settingsObj?.total_donations || '0'),
        childrenReached: parseInt(settingsObj?.children_reached || '0'),
        programsCompleted: parseInt(settingsObj?.programs_completed || '0'),
        communityPartners: parseInt(settingsObj?.community_partners || '0')
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url('/Tee.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-gray-50/90 to-green-50/95" />
      
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
          <div className="absolute inset-0 bg-theme-green bg-opacity-85" />
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <Target className="h-16 w-16 mx-auto mb-6 text-theme-gold animate-scale-in" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-poppins">Our Impact</h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              See the difference we're making in communities across Kenya
            </p>
          </div>
        </section>
        
        {/* Impact Statistics */}
        <section className="py-12 bg-white/95 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">
                  ${stats.totalDonations.toLocaleString()}
                </div>
                <div className="text-gray-600">Total Donations</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">
                  {stats.childrenReached.toLocaleString()}
                </div>
                <div className="text-gray-600">Children Reached</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">
                  {stats.programsCompleted}
                </div>
                <div className="text-gray-600">Programs Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">
                  {stats.communityPartners}
                </div>
                <div className="text-gray-600">Community Partners</div>
              </div>
            </div>
          </div>
        </section>

        {/* Past Visits */}
        <section className="py-16 bg-gray-50/95 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">Our Recent Visits</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore the communities we've visited and the impact we've made together
              </p>
            </div>

            {visits.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500">No visits recorded yet.</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {visits.map((visit) => (
                  <Card key={visit.id} className="overflow-hidden shadow-lg bg-white/95 backdrop-blur-sm">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl text-black mb-2">
                            {visit.title}
                          </CardTitle>
                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <Calendar className="h-4 w-4 mr-2 text-red-600" />
                            {new Date(visit.visit_date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          {visit.location && (
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="h-4 w-4 mr-2 text-red-600" />
                              {visit.location}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {visit.media && visit.media.length > 0 && (
                        <MediaCarousel 
                          media={visit.media}
                          autoPlay={true}
                          interval={4000}
                        />
                      )}
                      
                      {visit.description && (
                        <p className="text-gray-700 leading-relaxed">
                          {visit.description}
                        </p>
                      )}

                      {visit.activities && visit.activities.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-black mb-2 flex items-center">
                            <Users className="h-4 w-4 mr-2 text-red-600" />
                            Activities
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {visit.activities.map((activity: string, index: number) => (
                              <Badge key={index} variant="outline" className="text-red-600 border-red-600">
                                {activity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {visit.impact_metrics && Object.keys(visit.impact_metrics).length > 0 && (
                        <div>
                          <h4 className="font-semibold text-black mb-2">Impact Metrics</h4>
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries(visit.impact_metrics).map(([key, value]) => (
                              <div key={key} className="text-center p-3 bg-red-50 rounded-lg">
                                <div className="text-2xl font-bold text-red-600">
                                  {String(value)}
                                </div>
                                <div className="text-sm text-gray-600 capitalize">
                                  {key.replace(/_/g, ' ')}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
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

export default Impact;
