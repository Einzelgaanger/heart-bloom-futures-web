
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Image, Video, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MediaFile {
  file: File;
  preview: string;
  type: 'image' | 'video';
}

interface MultiFileUploadProps {
  onFilesChange: (files: File[]) => void;
  label: string;
  accept?: string;
}

const MultiFileUpload = ({ onFilesChange, label, accept = "image/*,video/*" }: MultiFileUploadProps) => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const { toast } = useToast();

  const handleFileAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    selectedFiles.forEach(file => {
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than 10MB`,
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = e.target?.result as string;
        const type = file.type.startsWith('image/') ? 'image' : 'video';
        
        const newFile: MediaFile = {
          file,
          preview,
          type
        };

        setFiles(prev => {
          const updated = [...prev, newFile];
          onFilesChange(updated.map(f => f.file));
          return updated;
        });
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    e.target.value = '';
  };

  const removeFile = (index: number) => {
    setFiles(prev => {
      const updated = prev.filter((_, i) => i !== index);
      onFilesChange(updated.map(f => f.file));
      return updated;
    });
  };

  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold">{label}</Label>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        <div className="text-center">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">
            Select multiple images and videos
          </p>
          <Input
            type="file"
            accept={accept}
            multiple
            onChange={handleFileAdd}
            className="hidden"
            id="multi-file-upload"
          />
          <Button
            onClick={() => document.getElementById('multi-file-upload')?.click()}
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Files
          </Button>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          <Label className="text-sm font-medium">Selected Files ({files.length})</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  {file.type === 'image' ? (
                    <img
                      src={file.preview}
                      alt={file.file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Video className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <Button
                  onClick={() => removeFile(index)}
                  variant="outline"
                  size="sm"
                  className="absolute top-1 right-1 text-red-600 border-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </Button>
                <p className="text-xs text-gray-600 mt-1 truncate">
                  {file.file.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiFileUpload;
