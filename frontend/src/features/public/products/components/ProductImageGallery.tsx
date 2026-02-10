import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ZoomInIcon, XIcon, PackageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/utils';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text/Text';

export const ProductImageGallery = ({
  images,
  selectedImageIndex,
  onImageSelect,
  showThumbnails = true,
  zoomEnabled = true,
  className
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const sortedImages = [...images].sort((a, b) => a.sort_order - b.sort_order);
  
  const currentImage = sortedImages[selectedImageIndex];

  const nextImage = () => {
    const nextIndex = (selectedImageIndex + 1) % sortedImages.length;
    onImageSelect(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = (selectedImageIndex - 1 + sortedImages.length) % sortedImages.length;
    onImageSelect(prevIndex);
  };

  const handleMouseMove = (e) => {
    if (!zoomEnabled || !isZoomed) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
  };

  const handleKeyDown = (e) => {
    if (isFullscreen) {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, prevImage, nextImage]);

  if (!sortedImages.length) {
    return (
      <div className={cn('bg-surface rounded-lg flex flex-col items-center justify-center h-96', className)}>
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <Text className="text-gray-400 text-4xl">📷</Text>
          </div>
          <Text className="text-gray-500 font-medium">No images available</Text>
          <Text className="text-gray-400 text-sm mt-1">This product doesn't have any images yet</Text>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="relative group">
        <div 
          className="relative overflow-hidden rounded-lg bg-surface cursor-zoom-in"
          onMouseEnter={() => zoomEnabled && setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setIsFullscreen(true)}
        >
          {imageError ? (
            <div className="w-full h-96 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <PackageIcon size={64} className="text-gray-400 dark:text-gray-500" />
            </div>
          ) : (
            <img
              src={currentImage.url}
              alt={currentImage.alt_text || `Product image ${selectedImageIndex + 1}`}
              onError={() => setImageError(true)}
              className={cn(
                'w-full h-96 object-cover transition-transform duration-300 ',
                isZoomed && 'scale-150'
              )}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    }
                  : {}
              }
            />
          )}
          
          {zoomEnabled && (
            <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomInIcon size={16} />
            </div>
          )}
        </div>

        {sortedImages.length > 1 && (
          <>
            <Button
              onClick={prevImage}
              variant="ghost"
              size="xs"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors opacity-0 group-hover:opacity-100"
              leftIcon={<ChevronLeftIcon size={20} />}
            >
            </Button>
            <Button
              onClick={nextImage}
              variant="ghost"
              size="xs"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors opacity-0 group-hover:opacity-100"
              rightIcon={<ChevronRightIcon size={20} />}
            >
            </Button>
          </>
        )}

        {sortedImages.length > 1 && (
          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {selectedImageIndex + 1} / {sortedImages.length}
          </div>
        )}
      </div>

      {showThumbnails && sortedImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {sortedImages.map((image, index) => (
            <Button
              key={image.id}
              onClick={() => onImageSelect(index)}
              variant={index === selectedImageIndex ? "primary" : "ghost"}
              size="xs"
              className={cn(
                'relative overflow-hidden rounded-md border-2 transition-all h-20',
                selectedImageIndex === index
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-gray-200 hover:border-gray-300'
              )}
            >
              <img
                src={image.url}
                alt={image.alt_text || `Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {image.is_primary && (
                <div className="absolute top-1 left-1 bg-primary text-white text-sm px-1 rounded">
                  Primary
                </div>
              )}
            </Button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            <div className="relative max-w-7xl max-h-full p-4">
              <img
                src={currentImage.url}
                alt={currentImage.alt_text || `Product image ${selectedImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              
              <Button
                onClick={() => setIsFullscreen(false)}
                variant="ghost"
                size="xs"
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                leftIcon={<XIcon size={16} />}
              >
              </Button>

              {sortedImages.length > 1 && (
                <>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    variant="ghost"
                    size="xs"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                    leftIcon={<ChevronLeftIcon size={24} />}
                  >
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    variant="ghost"
                    size="xs"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                    rightIcon={<ChevronRightIcon size={24} />}
                  >
                  </Button>
                </>
              )}

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 text-white px-4 py-2 rounded-full">
                {selectedImageIndex + 1} / {sortedImages.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};