
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Image, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  label: string;
  currentFile?: string;
}

const FileUpload = ({ onFileSelect, accept = "image/*", label, currentFile }: FileUploadProps) => {
  const [preview, setPreview] = useState<string | null>(currentFile || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select a file smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    onFileSelect(file);
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        {preview ? (
          <div className="relative">
            {preview.startsWith('data:image') || currentFile?.includes('image') ? (
              <img
                src={preview}
                alt="Preview"
                className="max-h-48 mx-auto rounded"
              />
            ) : (
              <div className="flex items-center justify-center h-24">
                <Video className="h-12 w-12 text-gray-400" />
                <span className="ml-2 text-gray-600">Video selected</span>
              </div>
            )}
            <Button
              onClick={handleRemove}
              variant="outline"
              size="sm"
              className="absolute top-2 right-2 text-red-600 border-red-600 hover:bg-red-50"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Click to upload or drag and drop
            </p>
            <Input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              <Upload className="h-4 w-4 mr-2" />
              Select File
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
