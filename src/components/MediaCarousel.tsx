
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MediaItem {
  url: string;
  type: 'image' | 'video';
  caption?: string;
}

interface MediaCarouselProps {
  media: MediaItem[];
  autoPlay?: boolean;
  interval?: number;
}

const MediaCarousel = ({ media, autoPlay = true, interval = 4000 }: MediaCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying || media.length <= 1 || isVideoPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, interval, media.length, isVideoPlaying]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    setIsPlaying(false);
  };

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
    if (autoPlay) {
      setIsPlaying(true);
      goToNext();
    }
  };

  if (media.length === 0) return null;

  const currentMedia = media[currentIndex];

  return (
    <div className="relative w-full h-64 md:h-80 bg-black rounded-lg overflow-hidden">
      {currentMedia.type === 'image' ? (
        <img
          src={currentMedia.url}
          alt={currentMedia.caption || `Media ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
      ) : (
        <video
          src={currentMedia.url}
          className="w-full h-full object-cover"
          controls
          autoPlay
          onPlay={handleVideoPlay}
          onEnded={handleVideoEnded}
          onPause={() => setIsVideoPlaying(false)}
        />
      )}

      {media.length > 1 && (
        <>
          {/* Navigation buttons */}
          <Button
            onClick={goToPrevious}
            variant="outline"
            size="sm"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={goToNext}
            variant="outline"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Play/Pause button for images */}
          {currentMedia.type === 'image' && (
            <Button
              onClick={togglePlayPause}
              variant="outline"
              size="sm"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          )}

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {media.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Caption */}
      {currentMedia.caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2">
          <p className="text-sm">{currentMedia.caption}</p>
        </div>
      )}
    </div>
  );
};

export default MediaCarousel;
