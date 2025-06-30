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
import { Settings, Calendar, MapPin, TrendingUp, LogOut, Plus, Edit, Trash, Mail, Eye } from "lucide-react";
import FileUpload from '@/components/FileUpload';
import MultiFileUpload from '@/components/MultiFileUpload';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [settings, setSettings] = useState<any>({});
  const [events, setEvents] = useState<any[]>([]);
  const [visits, setVisits] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    image_file: null as File | null
  });

  const [newVisit, setNewVisit] = useState({
    title: '',
    description: '',
    location: '',
    visit_date: '',
    activities: '',
    impact_metrics: '',
    media_files: [] as File[]
  });

  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [editingVisit, setEditingVisit] = useState<any>(null);

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

      // Fetch messages
      const { data: messagesData } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      setMessages(messagesData || []);

    } catch (error) {
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
        .upsert({ key, value }, { onConflict: 'key' });

      if (error) throw error;

      setSettings({ ...settings, [key]: value });
      toast({
        title: "Success",
        description: "Setting updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update setting",
        variant: "destructive",
      });
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const addEvent = async () => {
    if (!newEvent.title || !newEvent.date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      let imageUrl = '';
      if (newEvent.image_file) {
        imageUrl = await uploadFile(newEvent.image_file);
      }

      const { error } = await supabase
        .from('events')
        .insert([{
          title: newEvent.title,
          description: newEvent.description,
          date: newEvent.date,
          location: newEvent.location,
          image_url: imageUrl
        }]);

      if (error) throw error;

      setNewEvent({ title: '', description: '', date: '', location: '', image_file: null });
      fetchData();
      toast({
        title: "Success",
        description: "Event added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add event",
        variant: "destructive",
      });
    }
  };

  const updateEvent = async () => {
    if (!editingEvent.title || !editingEvent.date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      let imageUrl = editingEvent.image_url;
      if (editingEvent.image_file) {
        imageUrl = await uploadFile(editingEvent.image_file);
      }

      const { error } = await supabase
        .from('events')
        .update({
          title: editingEvent.title,
          description: editingEvent.description,
          date: editingEvent.date,
          location: editingEvent.location,
          image_url: imageUrl
        })
        .eq('id', editingEvent.id);

      if (error) throw error;

      setEditingEvent(null);
      fetchData();
      toast({
        title: "Success",
        description: "Event updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update event",
        variant: "destructive",
      });
    }
  };

  const deleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

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
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    }
  };

  const addVisit = async () => {
    if (!newVisit.title || !newVisit.visit_date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const mediaUrls = [];
      for (const file of newVisit.media_files) {
        const url = await uploadFile(file);
        const type = file.type.startsWith('image/') ? 'image' : 'video';
        mediaUrls.push({ url, type });
      }

      const visitData = {
        title: newVisit.title,
        description: newVisit.description,
        location: newVisit.location,
        visit_date: newVisit.visit_date,
        activities: newVisit.activities ? newVisit.activities.split(',').map(s => s.trim()) : [],
        impact_metrics: newVisit.impact_metrics ? JSON.parse(newVisit.impact_metrics) : {},
        media: mediaUrls
      };

      const { error } = await supabase
        .from('visits')
        .insert([visitData]);

      if (error) throw error;

      setNewVisit({ title: '', description: '', location: '', visit_date: '', activities: '', impact_metrics: '', media_files: [] });
      fetchData();
      toast({
        title: "Success",
        description: "Visit added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add visit",
        variant: "destructive",
      });
    }
  };

  const updateVisit = async () => {
    if (!editingVisit.title || !editingVisit.visit_date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const visitData = {
        title: editingVisit.title,
        description: editingVisit.description,
        location: editingVisit.location,
        visit_date: editingVisit.visit_date,
        activities: typeof editingVisit.activities === 'string' 
          ? editingVisit.activities.split(',').map((s: string) => s.trim())
          : editingVisit.activities,
        impact_metrics: typeof editingVisit.impact_metrics === 'string'
          ? JSON.parse(editingVisit.impact_metrics)
          : editingVisit.impact_metrics
      };

      const { error } = await supabase
        .from('visits')
        .update(visitData)
        .eq('id', editingVisit.id);

      if (error) throw error;

      setEditingVisit(null);
      fetchData();
      toast({
        title: "Success",
        description: "Visit updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update visit",
        variant: "destructive",
      });
    }
  };

  const deleteVisit = async (id: string) => {
    if (!confirm('Are you sure you want to delete this visit?')) return;

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
      toast({
        title: "Error",
        description: "Failed to delete visit",
        variant: "destructive",
      });
    }
  };

  const markMessageAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ read: true })
        .eq('id', id);

      if (error) throw error;

      fetchData();
      toast({
        title: "Success",
        description: "Message marked as read",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update message",
        variant: "destructive",
      });
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchData();
      toast({
        title: "Success",
        description: "Message deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete message",
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
          <h1 className="text-2xl font-bold text-red-600">Santa's Heart Admin</h1>
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
        <Tabs defaultValue="messages" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="visits" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Visits
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Statistics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages ({messages.filter(m => !m.read).length} unread)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`p-4 border rounded-lg ${message.read ? 'bg-gray-50' : 'bg-white border-red-200'}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{message.name}</h3>
                            {!message.read && (
                              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">New</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            <strong>Email:</strong> {message.email}
                          </p>
                          {message.phone && (
                            <p className="text-sm text-gray-600 mb-1">
                              <strong>Phone:</strong> {message.phone}
                            </p>
                          )}
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Subject:</strong> {message.subject}
                          </p>
                          <p className="text-sm text-gray-700 mb-2">{message.message}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(message.created_at).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          {!message.read && (
                            <Button
                              onClick={() => markMessageAsRead(message.id)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-600 hover:bg-red-50"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            onClick={() => deleteMessage(message.id)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {messages.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No messages received yet.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  {editingEvent ? 'Edit Event' : 'Add New Event'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Event Title</Label>
                    <Input
                      value={editingEvent ? editingEvent.title : newEvent.title}
                      onChange={(e) => editingEvent 
                        ? setEditingEvent({ ...editingEvent, title: e.target.value })
                        : setNewEvent({ ...newEvent, title: e.target.value })
                      }
                      placeholder="Enter event title"
                    />
                  </div>
                  <div>
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={editingEvent ? editingEvent.date : newEvent.date}
                      onChange={(e) => editingEvent
                        ? setEditingEvent({ ...editingEvent, date: e.target.value })
                        : setNewEvent({ ...newEvent, date: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input
                      value={editingEvent ? editingEvent.location : newEvent.location}
                      onChange={(e) => editingEvent
                        ? setEditingEvent({ ...editingEvent, location: e.target.value })
                        : setNewEvent({ ...newEvent, location: e.target.value })
                      }
                      placeholder="Enter location"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Description</Label>
                    <Textarea
                      value={editingEvent ? editingEvent.description : newEvent.description}
                      onChange={(e) => editingEvent
                        ? setEditingEvent({ ...editingEvent, description: e.target.value })
                        : setNewEvent({ ...newEvent, description: e.target.value })
                      }
                      placeholder="Enter event description"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <FileUpload
                      onFileSelect={(file) => editingEvent
                        ? setEditingEvent({ ...editingEvent, image_file: file })
                        : setNewEvent({ ...newEvent, image_file: file })
                      }
                      accept="image/*"
                      label="Event Image"
                      currentFile={editingEvent?.image_url}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={editingEvent ? updateEvent : addEvent} 
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {editingEvent ? 'Update Event' : 'Add Event'}
                  </Button>
                  {editingEvent && (
                    <Button 
                      onClick={() => setEditingEvent(null)} 
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
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
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setEditingEvent(event)}
                          variant="outline"
                          size="sm"
                          className="text-green-600 border-green-600 hover:bg-green-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => deleteEvent(event.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
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
                  {editingVisit ? 'Edit Visit' : 'Add New Visit'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Visit Title</Label>
                    <Input
                      value={editingVisit ? editingVisit.title : newVisit.title}
                      onChange={(e) => editingVisit
                        ? setEditingVisit({ ...editingVisit, title: e.target.value })
                        : setNewVisit({ ...newVisit, title: e.target.value })
                      }
                      placeholder="Enter visit title"
                    />
                  </div>
                  <div>
                    <Label>Visit Date</Label>
                    <Input
                      type="date"
                      value={editingVisit ? editingVisit.visit_date : newVisit.visit_date}
                      onChange={(e) => editingVisit
                        ? setEditingVisit({ ...editingVisit, visit_date: e.target.value })
                        : setNewVisit({ ...newVisit, visit_date: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input
                      value={editingVisit ? editingVisit.location : newVisit.location}
                      onChange={(e) => editingVisit
                        ? setEditingVisit({ ...editingVisit, location: e.target.value })
                        : setNewVisit({ ...newVisit, location: e.target.value })
                      }
                      placeholder="Enter location"
                    />
                  </div>
                  <div>
                    <Label>Activities (comma-separated)</Label>
                    <Input
                      value={editingVisit 
                        ? (Array.isArray(editingVisit.activities) ? editingVisit.activities.join(', ') : editingVisit.activities)
                        : newVisit.activities
                      }
                      onChange={(e) => editingVisit
                        ? setEditingVisit({ ...editingVisit, activities: e.target.value })
                        : setNewVisit({ ...newVisit, activities: e.target.value })
                      }
                      placeholder="Activity 1, Activity 2, Activity 3"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Description</Label>
                    <Textarea
                      value={editingVisit ? editingVisit.description : newVisit.description}
                      onChange={(e) => editingVisit
                        ? setEditingVisit({ ...editingVisit, description: e.target.value })
                        : setNewVisit({ ...newVisit, description: e.target.value })
                      }
                      placeholder="Enter visit description"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Impact Metrics (JSON format)</Label>
                    <Textarea
                      value={editingVisit 
                        ? (typeof editingVisit.impact_metrics === 'object' 
                          ? JSON.stringify(editingVisit.impact_metrics, null, 2) 
                          : editingVisit.impact_metrics)
                        : newVisit.impact_metrics
                      }
                      onChange={(e) => editingVisit
                        ? setEditingVisit({ ...editingVisit, impact_metrics: e.target.value })
                        : setNewVisit({ ...newVisit, impact_metrics: e.target.value })
                      }
                      placeholder='{"children_reached": 100, "workshops_conducted": 5}'
                    />
                  </div>
                  <div className="md:col-span-2">
                    <MultiFileUpload
                      onFilesChange={(files) => editingVisit
                        ? setEditingVisit({ ...editingVisit, media_files: files })
                        : setNewVisit({ ...newVisit, media_files: files })
                      }
                      label="Visit Images & Videos"
                      accept="image/*,video/*"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={editingVisit ? updateVisit : addVisit} 
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {editingVisit ? 'Update Visit' : 'Add Visit'}
                  </Button>
                  {editingVisit && (
                    <Button 
                      onClick={() => setEditingVisit(null)} 
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
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
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setEditingVisit(visit)}
                          variant="outline"
                          size="sm"
                          className="text-green-600 border-green-600 hover:bg-green-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => deleteVisit(visit.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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
