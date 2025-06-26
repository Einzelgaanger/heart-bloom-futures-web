
import React, { useState, useEffect } from 'react';

interface ImageCarouselProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
}

const ImageCarousel = ({ images, autoPlay = true, interval = 3000 }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length]);

  if (images.length === 0) return null;

  return (
    <div className="carousel-container">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Carousel image ${index + 1}`}
          className={`carousel-image ${index === currentIndex ? 'active' : 'inactive'}`}
        />
      ))}
      
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
