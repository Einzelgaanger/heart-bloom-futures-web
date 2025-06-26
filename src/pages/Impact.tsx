
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ImageCarousel from "@/components/ImageCarousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Heart, Trophy, Star, MapPin, Play } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

const Impact = () => {
  const [settings, setSettings] = useState<any>({});
  const [visits, setVisits] = useState<any[]>([]);
  const [visitMedia, setVisitMedia] = useState<any>({});
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch settings
      const { data: settingsData } = await supabase
        .from('admin_settings')
        .select('*');
      
      const settingsObj = settingsData?.reduce((acc: any, item: any) => {
        acc[item.key] = item.value;
        return acc;
      }, {});
      setSettings(settingsObj || {});

      // Fetch visits
      const { data: visitsData } = await supabase
        .from('visits')
        .select('*')
        .order('visit_date', { ascending: false });
      setVisits(visitsData || []);

      // Fetch visit media
      const { data: mediaData } = await supabase
        .from('visit_media')
        .select('*')
        .order('order_index', { ascending: true });

      const mediaByVisit = mediaData?.reduce((acc: any, item: any) => {
        if (!acc[item.visit_id]) {
          acc[item.visit_id] = { images: [], videos: [] };
        }
        if (item.media_type === 'image') {
          acc[item.visit_id].images.push(item.media_url);
        } else if (item.media_type === 'video') {
          acc[item.visit_id].videos.push(item);
        }
        return acc;
      }, {});
      setVisitMedia(mediaByVisit || {});

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const impactStats = [
    { 
      number: settings.children_reached || "1,247", 
      label: "Children Reached", 
      icon: Users, 
      color: "blue" 
    },
    { 
      number: settings.programs_completed || "45", 
      label: "Programs Completed", 
      icon: BookOpen, 
      color: "green" 
    },
    { 
      number: `$${settings.total_donations || "125K"}`, 
      label: "Donated to Date", 
      icon: Heart, 
      color: "red" 
    },
    { 
      number: settings.community_partners || "23", 
      label: "Community Partners", 
      icon: Trophy, 
      color: "purple" 
    }
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

  const handleVideoIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const video = entry.target as HTMLVideoElement;
      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleVideoIntersection, {
      threshold: 0.5
    });

    Object.values(videoRefs.current).forEach((video) => {
      if (video) {
        observer.observe(video);
      }
    });

    return () => {
      Object.values(videoRefs.current).forEach((video) => {
        if (video) {
          observer.unobserve(video);
        }
      });
    };
  }, [visits, visitMedia]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-red-50">
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

      {/* Previous Visits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Previous Visits</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the communities we've visited and the impact we've made together
            </p>
          </div>

          <div className="space-y-12">
            {visits.map((visit, index) => (
              <Card key={visit.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative">
                    {visitMedia[visit.id]?.images && visitMedia[visit.id].images.length > 0 ? (
                      <ImageCarousel 
                        images={visitMedia[visit.id].images}
                        autoPlay={true}
                        interval={4000}
                      />
                    ) : (
                      <div className="w-full h-64 bg-gradient-to-br from-green-100 to-red-100 flex items-center justify-center">
                        <MapPin className="h-16 w-16 text-green-600" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-8">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{visit.title}</h3>
                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{visit.location}</span>
                        <span className="ml-4 text-sm">{new Date(visit.visit_date).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6">{visit.description}</p>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Activities Conducted:</h4>
                      <div className="flex flex-wrap gap-2">
                        {visit.activities?.map((activity: string, actIndex: number) => (
                          <span
                            key={actIndex}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>

                    {visit.impact_metrics && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-800 mb-3">Impact Metrics:</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(visit.impact_metrics).map(([key, value]) => (
                            <div key={key} className="text-center p-3 bg-white rounded-lg border">
                              <div className="text-lg font-bold text-green-600">{value as string}</div>
                              <div className="text-sm text-gray-600 capitalize">{key.replace(/_/g, ' ')}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {visitMedia[visit.id]?.videos && visitMedia[visit.id].videos.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800">Visit Videos:</h4>
                        {visitMedia[visit.id].videos.map((video: any, videoIndex: number) => (
                          <div key={video.id} className="relative">
                            <video
                              ref={(el) => {
                                videoRefs.current[`${visit.id}-${videoIndex}`] = el;
                              }}
                              className="w-full h-48 object-cover rounded-lg"
                              muted
                              loop
                              playsInline
                            >
                              <source src={video.media_url} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Play className="h-12 w-12 text-white bg-black bg-opacity-50 rounded-full p-3" />
                            </div>
                            {video.caption && (
                              <p className="text-sm text-gray-600 mt-2">{video.caption}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program Progress */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Program Participation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Track our progress in reaching and educating young people across all our programs
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {programs.map((program, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
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
                  <span className="text-sm font-medium text-green-600">
                    {Math.round((program.completed / program.total) * 100)}% Complete
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-50">
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
      <section className="py-16">
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
                <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Downtown Center</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gray-800 mb-1">342</p>
                <p className="text-gray-600 text-sm">Students Served</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Eastside Campus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gray-800 mb-1">287</p>
                <p className="text-gray-600 text-sm">Students Served</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
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
      <section className="py-16 bg-gradient-to-r from-green-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Help Us Reach More Young People</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-green-100">
            Your support helps us expand our programs and reach even more children who need our services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/donate">
              <Button className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 text-lg font-semibold">
                <Heart className="inline mr-2 h-5 w-5" />
                Donate Now
              </Button>
            </a>
            <a href="/contact">
              <Button className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg font-semibold">
                Get Involved
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Impact;
