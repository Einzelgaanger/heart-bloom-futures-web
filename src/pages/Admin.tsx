
import React, { useState, useEffect } from 'react';
import AdminLogin from '@/components/AdminLogin';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Settings, Calendar, MapPin, TrendingUp, LogOut, Plus, Edit, Trash } from "lucide-react";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [settings, setSettings] = useState<any>({});
  const [events, setEvents] = useState<any[]>([]);
  const [visits, setVisits] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    image_url: ''
  });

  const [newVisit, setNewVisit] = useState({
    title: '',
    description: '',
    location: '',
    visit_date: '',
    activities: '',
    impact_metrics: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    setLoading(true);
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

      // Fetch events
      const { data: eventsData } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });
      setEvents(eventsData || []);

      // Fetch visits
      const { data: visitsData } = await supabase
        .from('visits')
        .select('*')
        .order('visit_date', { ascending: false });
      setVisits(visitsData || []);

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: string, value: string) => {
    try {
      const { error } = await supabase
        .from('admin_settings')
        .upsert({ key, value });

      if (error) throw error;

      setSettings({ ...settings, [key]: value });
      toast({
        title: "Success",
        description: "Setting updated successfully",
      });
    } catch (error) {
      console.error('Error updating setting:', error);
      toast({
        title: "Error",
        description: "Failed to update setting",
        variant: "destructive",
      });
    }
  };

  const addEvent = async () => {
    try {
      const { error } = await supabase
        .from('events')
        .insert([newEvent]);

      if (error) throw error;

      setNewEvent({ title: '', description: '', date: '', location: '', image_url: '' });
      fetchData();
      toast({
        title: "Success",
        description: "Event added successfully",
      });
    } catch (error) {
      console.error('Error adding event:', error);
      toast({
        title: "Error",
        description: "Failed to add event",
        variant: "destructive",
      });
    }
  };

  const addVisit = async () => {
    try {
      const visitData = {
        ...newVisit,
        activities: newVisit.activities.split(',').map(s => s.trim()),
        impact_metrics: JSON.parse(newVisit.impact_metrics || '{}')
      };

      const { error } = await supabase
        .from('visits')
        .insert([visitData]);

      if (error) throw error;

      setNewVisit({ title: '', description: '', location: '', visit_date: '', activities: '', impact_metrics: '' });
      fetchData();
      toast({
        title: "Success",
        description: "Visit added successfully",
      });
    } catch (error) {
      console.error('Error adding visit:', error);
      toast({
        title: "Error",
        description: "Failed to add visit",
        variant: "destructive",
      });
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchData();
      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    }
  };

  const deleteVisit = async (id: string) => {
    try {
      const { error } = await supabase
        .from('visits')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchData();
      toast({
        title: "Success",
        description: "Visit deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting visit:', error);
      toast({
        title: "Error",
        description: "Failed to delete visit",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-600">Santa's Heart Admin</h1>
          <Button 
            onClick={() => setIsAuthenticated(false)}
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="settings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="visits" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Visits
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Statistics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Site Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Total Donations ($)</Label>
                    <Input
                      value={settings.total_donations || ''}
                      onChange={(e) => updateSetting('total_donations', e.target.value)}
                      placeholder="Enter total donations"
                    />
                  </div>
                  <div>
                    <Label>Children Reached</Label>
                    <Input
                      value={settings.children_reached || ''}
                      onChange={(e) => updateSetting('children_reached', e.target.value)}
                      placeholder="Enter children reached"
                    />
                  </div>
                  <div>
                    <Label>Programs Completed</Label>
                    <Input
                      value={settings.programs_completed || ''}
                      onChange={(e) => updateSetting('programs_completed', e.target.value)}
                      placeholder="Enter programs completed"
                    />
                  </div>
                  <div>
                    <Label>Community Partners</Label>
                    <Input
                      value={settings.community_partners || ''}
                      onChange={(e) => updateSetting('community_partners', e.target.value)}
                      placeholder="Enter community partners"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Event
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Event Title</Label>
                    <Input
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      placeholder="Enter event title"
                    />
                  </div>
                  <div>
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      placeholder="Enter location"
                    />
                  </div>
                  <div>
                    <Label>Image URL</Label>
                    <Input
                      value={newEvent.image_url}
                      onChange={(e) => setNewEvent({ ...newEvent, image_url: e.target.value })}
                      placeholder="Enter image URL"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Description</Label>
                    <Textarea
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      placeholder="Enter event description"
                    />
                  </div>
                </div>
                <Button onClick={addEvent} className="bg-green-600 hover:bg-green-700">
                  Add Event
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-gray-600">{event.date} • {event.location}</p>
                      </div>
                      <Button
                        onClick={() => deleteEvent(event.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visits" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Visit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Visit Title</Label>
                    <Input
                      value={newVisit.title}
                      onChange={(e) => setNewVisit({ ...newVisit, title: e.target.value })}
                      placeholder="Enter visit title"
                    />
                  </div>
                  <div>
                    <Label>Visit Date</Label>
                    <Input
                      type="date"
                      value={newVisit.visit_date}
                      onChange={(e) => setNewVisit({ ...newVisit, visit_date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input
                      value={newVisit.location}
                      onChange={(e) => setNewVisit({ ...newVisit, location: e.target.value })}
                      placeholder="Enter location"
                    />
                  </div>
                  <div>
                    <Label>Activities (comma-separated)</Label>
                    <Input
                      value={newVisit.activities}
                      onChange={(e) => setNewVisit({ ...newVisit, activities: e.target.value })}
                      placeholder="Activity 1, Activity 2, Activity 3"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Description</Label>
                    <Textarea
                      value={newVisit.description}
                      onChange={(e) => setNewVisit({ ...newVisit, description: e.target.value })}
                      placeholder="Enter visit description"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Impact Metrics (JSON format)</Label>
                    <Textarea
                      value={newVisit.impact_metrics}
                      onChange={(e) => setNewVisit({ ...newVisit, impact_metrics: e.target.value })}
                      placeholder='{"children_reached": 100, "workshops_conducted": 5}'
                    />
                  </div>
                </div>
                <Button onClick={addVisit} className="bg-green-600 hover:bg-green-700">
                  Add Visit
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Previous Visits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {visits.map((visit) => (
                    <div key={visit.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{visit.title}</h3>
                        <p className="text-sm text-gray-600">{visit.visit_date} • {visit.location}</p>
                        <p className="text-sm text-gray-500 mt-1">{visit.description}</p>
                      </div>
                      <Button
                        onClick={() => deleteVisit(visit.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-green-600">Total Donations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">${settings.total_donations || '0'}</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-green-600">Children Reached</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{settings.children_reached || '0'}</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-green-600">Programs Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{settings.programs_completed || '0'}</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-green-600">Community Partners</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{settings.community_partners || '0'}</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
