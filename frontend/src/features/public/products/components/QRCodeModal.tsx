import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { QrCodeIcon, DownloadIcon, ShareIcon, XIcon } from 'lucide-react';
import { NotificationModal } from '@/components/ui/NotificationModal';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Text/Text';

export const QRCodeModal = ({
  data,
  size = 200,
  title = 'QR Code',
  description,
  isOpen,
  onClose,
  className = '',
}) => {
  const canvasRef = useRef(null);
  const [showNotification, setShowNotification] = React.useState(false);
  const [isSharing, setIsSharing] = React.useState(false);
  const [isDownloading, setIsDownloading] = React.useState(false);

  useEffect(() => {
    if (isOpen && canvasRef.current && data) {
      QRCode.toCanvas(canvasRef.current, data, {
        width: size,
        margin: 2,
        color: {
          dark: getComputedStyle(document.documentElement).getPropertyValue('--color-copy') || '#000000',
          light: getComputedStyle(document.documentElement).getPropertyValue('--color-surface') || '#FFFFFF',
        },
      }, (error) => {
        if (error) {
          console.error('Error generating QR code:', error);
          // Fallback to simple pattern if QR code generation fails
          generateFallbackQRCode(data, canvasRef.current);
        }
      });
    }
  }, [data, size, isOpen]);

  const generateFallbackQRCode = (text, canvas) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-surface') || '#FFFFFF';
    ctx.fillRect(0, 0, size, size);

    const moduleSize = size / 25;
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-copy') || '#000000';

    const hash = text.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);

    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        const shouldFill = (hash + i * j) % 3 === 0;
        if (shouldFill) {
          ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize);
        }
      }
    }

    const markerSize = moduleSize * 7;
    const positions = [
      [0, 0],
      [size - markerSize, 0],
      [0, size - markerSize],
    ];

    positions.forEach(([x, y]) => {
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-copy') || '#000000';
      ctx.fillRect(x, y, markerSize, markerSize);
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-surface') || '#FFFFFF';
      ctx.fillRect(x + moduleSize, y + moduleSize, markerSize - 2 * moduleSize, markerSize - 2 * moduleSize);
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-copy') || '#000000';
      ctx.fillRect(x + 2 * moduleSize, y + 2 * moduleSize, markerSize - 4 * moduleSize, markerSize - 4 * moduleSize);
    });
  };

  const handleDownload = async () => {
    if (isDownloading) return;
    
    if (!canvasRef.current) {
      console.error('Canvas not available for download');
      return;
    }

    setIsDownloading(true);
    
    try {
      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvasRef.current!.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob from canvas'));
          }
        }, 'image/png');
      });

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `qr-code-${Date.now()}.png`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up URL
      URL.revokeObjectURL(url);
      
      // Show success feedback
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
      
    } catch (error) {
      console.error('Error downloading QR code:', error);
      // Fallback: try direct data URL method
      try {
        const dataUrl = canvasRef.current.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `qr-code-${Date.now()}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (fallbackError) {
        console.error('Fallback download also failed:', fallbackError);
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (isSharing) return;
    
    if (!canvasRef.current) {
      console.error('Canvas not available for sharing');
      return;
    }

    setIsSharing(true);
    
    try {
      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvasRef.current!.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob from canvas'));
          }
        }, 'image/png');
      });

      // Try native share API first (mobile devices)
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], 'qr-code.png', { type: 'image/png' })] })) {
        try {
          const file = new File([blob], 'qr-code.png', { type: 'image/png' });
          await navigator.share({
            title: title,
            text: description || 'Check out this QR code',
            files: [file],
          });
          return;
        } catch (shareError) {
          console.log('Native share failed, trying clipboard:', shareError);
        }
      }

      // Fallback to clipboard copy
      try {
        // Try clipboard API with image
        if (navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setShowNotification(true);
        } else {
          // Fallback: copy data URL to clipboard
          const dataUrl = canvasRef.current.toDataURL('image/png');
          await navigator.clipboard.writeText(dataUrl);
          setShowNotification(true);
        }
      } catch (clipboardError) {
        console.error('Clipboard copy failed:', clipboardError);
        // Final fallback: open in new tab
        const dataUrl = canvasRef.current.toDataURL('image/png');
        const newWindow = window.open();
        if (newWindow) {
          newWindow.document.write(`<img src="${dataUrl}" alt="QR Code" />`);
          setShowNotification(true);
        }
      }
      
    } catch (error) {
      console.error('Error sharing QR code:', error);
    } finally {
      setIsSharing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className={`bg-surface rounded-lg p-6 max-w-sm w-full border border-border ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <QrCodeIcon size={24} className="text-primary" />
            <Heading level={3} className="text-lg font-semibold text-copy">{title}</Heading>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-copy-lighter hover:text-copy transition-colors"
            leftIcon={<XIcon size={20} />}
          >
          </Button>
        </div>

        {description && (
          <p className="text-copy-light text-sm mb-4">{description}</p>
        )}

        <div className="flex justify-center mb-4">
          <div className="p-4 bg-surface border-2 border-border rounded-lg">
            <canvas
              ref={canvasRef}
              className="block"
              style={{ width: size, height: size }}
            />
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs text-copy-lighter mb-1">Data:</p>
          <p className="text-sm text-copy-light bg-surface-hover p-2 rounded break-all">

      <div className="flex space-x-2">
        <Button
          onClick={handleDownload}
          disabled={isDownloading}
          variant="primary"
          size="sm"
          className="flex-1 flex items-center justify-center space-x-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          leftIcon={<DownloadIcon size={16} />}
          isLoading={isDownloading}
        >
          {isDownloading ? 'Downloading...' : 'Download'}
        </Button>
        <Button
          onClick={handleShare}
          disabled={isSharing}
          variant="outline"
          size="sm"
          className="flex-1 flex items-center justify-center space-x-2 bg-surface-hover text-copy px-4 py-2 rounded-md hover:bg-surface-active transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          leftIcon={<ShareIcon size={16} />}
          isLoading={isSharing}
        >
          {isSharing ? 'Sharing...' : 'Share'}
        </Button>
      </div>
      <NotificationModal
        isOpen={showNotification}
        onClose={() => setShowNotification(false)}
        title="Success"
        message={isDownloading ? "QR code downloaded successfully!" : "QR code copied to clipboard!"}
        variant="success"
        autoClose={true}
        autoCloseDelay={3000}
      />
    </motion.div>
  );
};