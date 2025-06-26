
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Image, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MediaItem {
  url: string;
  type: 'image' | 'video';
  caption?: string;
}

interface MediaUploadProps {
  onMediaChange: (media: MediaItem[]) => void;
  initialMedia?: MediaItem[];
}

const MediaUpload = ({ onMediaChange, initialMedia = [] }: MediaUploadProps) => {
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaType, setNewMediaType] = useState<'image' | 'video'>('image');
  const [newCaption, setNewCaption] = useState('');
  const { toast } = useToast();

  const addMedia = () => {
    if (!newMediaUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    const newItem: MediaItem = {
      url: newMediaUrl.trim(),
      type: newMediaType,
      caption: newCaption.trim() || undefined
    };

    const updatedMedia = [...media, newItem];
    setMedia(updatedMedia);
    onMediaChange(updatedMedia);

    // Reset form
    setNewMediaUrl('');
    setNewCaption('');
    
    toast({
      title: "Success",
      description: `${newMediaType} added successfully`,
    });
  };

  const removeMedia = (index: number) => {
    const updatedMedia = media.filter((_, i) => i !== index);
    setMedia(updatedMedia);
    onMediaChange(updatedMedia);
  };

  const updateCaption = (index: number, caption: string) => {
    const updatedMedia = media.map((item, i) => 
      i === index ? { ...item, caption: caption || undefined } : item
    );
    setMedia(updatedMedia);
    onMediaChange(updatedMedia);
  };

  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold">Media (Images & Videos)</Label>
      
      {/* Add new media form */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="mediaUrl">Media URL</Label>
            <Input
              id="mediaUrl"
              value={newMediaUrl}
              onChange={(e) => setNewMediaUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <Label htmlFor="mediaType">Type</Label>
            <select
              id="mediaType"
              value={newMediaType}
              onChange={(e) => setNewMediaType(e.target.value as 'image' | 'video')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>
          <div>
            <Label htmlFor="caption">Caption (Optional)</Label>
            <Input
              id="caption"
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              placeholder="Enter caption"
            />
          </div>
        </div>
        <Button 
          onClick={addMedia}
          className="mt-4 bg-green-600 hover:bg-green-700"
        >
          <Upload className="h-4 w-4 mr-2" />
          Add Media
        </Button>
      </div>

      {/* Media list */}
      {media.length > 0 && (
        <div className="space-y-3">
          <Label className="text-sm font-medium">Added Media ({media.length})</Label>
          {media.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-white">
              <div className="flex items-center space-x-3 flex-1">
                <div className="flex-shrink-0">
                  {item.type === 'image' ? (
                    <Image className="h-5 w-5 text-green-600" />
                  ) : (
                    <Video className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.url}
                  </p>
                  <Input
                    value={item.caption || ''}
                    onChange={(e) => updateCaption(index, e.target.value)}
                    placeholder="Add caption..."
                    className="mt-1 text-xs"
                  />
                </div>
              </div>
              <Button
                onClick={() => removeMedia(index)}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaUpload;
