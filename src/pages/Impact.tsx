
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MediaCarousel from "@/components/MediaCarousel";
import { MapPin, Calendar, Users, TrendingUp } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-yellow-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <TrendingUp className="h-12 w-12 mx-auto mb-4 text-white" />
          <h1 className="text-3xl font-bold mb-4">Our Impact</h1>
          <p className="text-lg max-w-2xl mx-auto">
            See how we're making a difference in children's lives
          </p>
        </div>
      </section>
      
      {/* Impact Statistics */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow">
              <div className="text-2xl font-bold text-red-600 mb-1">
                ${stats.totalDonations.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Donations</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {stats.childrenReached.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Children Reached</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {stats.programsCompleted}
              </div>
              <div className="text-sm text-gray-600">Programs</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {stats.communityPartners}
              </div>
              <div className="text-sm text-gray-600">Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* Past Visits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Recent Visits</h2>
            <p className="text-gray-600">Communities we've visited and impacted</p>
          </div>

          {visits.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500">No visits recorded yet.</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {visits.map((visit) => (
                <Card key={visit.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg mb-2">{visit.title}</CardTitle>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Calendar className="h-3 w-3 mr-2 text-red-600" />
                      {new Date(visit.visit_date).toLocaleDateString()}
                    </div>
                    {visit.location && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-3 w-3 mr-2 text-red-600" />
                        {visit.location}
                      </div>
                    )}
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    {visit.media && visit.media.length > 0 && (
                      <MediaCarousel 
                        media={visit.media}
                        autoPlay={true}
                        interval={4000}
                      />
                    )}
                    
                    {visit.description && (
                      <p className="text-gray-700 text-sm">{visit.description}</p>
                    )}

                    {visit.activities && visit.activities.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center text-sm">
                          <Users className="h-3 w-3 mr-2 text-red-600" />
                          Activities
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {visit.activities.map((activity: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {activity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {visit.impact_metrics && Object.keys(visit.impact_metrics).length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Impact</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(visit.impact_metrics).map(([key, value]) => (
                            <div key={key} className="text-center p-2 bg-orange-50 rounded">
                              <div className="text-lg font-bold text-orange-600">
                                {String(value)}
                              </div>
                              <div className="text-xs text-gray-600 capitalize">
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
  );
};

export default Impact;
