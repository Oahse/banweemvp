import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ScanLineIcon, DownloadIcon, ShareIcon, XIcon } from 'lucide-react';
import { NotificationModal } from '@/components/ui/NotificationModal';
import JsBarcode from 'jsbarcode';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Text } from '@/components/ui/Text/Text';

interface BarcodeModalProps {
  variant: {
    id: string;
    product_id: string;
    sku: string;
    name: string;
    base_price: number;
    sale_price: number | null;
    stock: number;
    barcode: string; // This will be JSON string with product data
    qr_code: string;
    product_name?: string;
  };
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  canGenerate?: boolean;
  className?: string;
}

export const BarcodeModal: React.FC<BarcodeModalProps> = ({
  variant,
  isOpen,
  onClose,
  title = 'Barcode',
  canGenerate = false,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showNotification, setShowNotification] = React.useState(false);
  const [isSharing, setIsSharing] = React.useState(false);
  const [isDownloading, setIsDownloading] = React.useState(false);

  // Parse the barcode data to get the actual barcode value
  const getBarcodeValue = () => {
    try {
      const barcodeData = JSON.parse(variant.barcode);
      return barcodeData.sku || variant.sku; // Use SKU as the barcode value
    } catch {
      return variant.sku; // Fallback to SKU if JSON parsing fails
    }
  };

  // Parse the barcode data for display
  const getBarcodeData = () => {
    try {
      return JSON.parse(variant.barcode);
    } catch {
      return {
        url: `${window.location.origin}/products/${variant.product_id}`,
        productId: variant.product_id,
        sku: variant.sku,
        variantId: variant.id,
        variantName: variant.name,
        supplier: 'Unknown',
        price: variant.sale_price || variant.base_price,
        stock: variant.stock,
        attributes: {}
      };
    }
  };

  const barcodeData = getBarcodeData();
  const barcodeValue = getBarcodeValue();

  useEffect(() => {
    if (isOpen && canvasRef.current && barcodeValue) {
      try {
        JsBarcode(canvasRef.current, barcodeValue, {
          format: 'CODE128',
          width: 2,
          height: 80,
          displayValue: true,
          fontSize: 14,
          margin: 10,
          background: getComputedStyle(document.documentElement).getPropertyValue('--color-surface') || '#FFFFFF',
          lineColor: getComputedStyle(document.documentElement).getPropertyValue('--color-copy') || '#000000',
        });
      } catch (error) {
        console.error('Error generating barcode:', error);
        // Fallback to simple pattern if barcode generation fails
        generateFallbackBarcode(barcodeValue, canvasRef.current);
      }
    }
  }, [barcodeValue, isOpen]);

  const generateFallbackBarcode = (text: string, canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 300;
    canvas.height = 100;

    // Clear canvas
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-surface') || '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Generate simple barcode pattern based on the text
    const barWidth = 2;
    const barHeight = 60;
    const startX = 20;
    const startY = 20;

    const hash = text.split('').reduce((a: number, b: string) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);

    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-copy') || '#000000';
    for (let i = 0; i < text.length * 2; i++) {
      const shouldFill = (hash + i) % 3 !== 0;
      if (shouldFill) {
        ctx.fillRect(startX + i * barWidth, startY, barWidth, barHeight);
      }
    }

    // Add barcode text below
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-copy') || '#000000';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(text, canvas.width / 2, startY + barHeight + 20);
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
      link.download = `barcode-${variant.sku}-${Date.now()}.png`;
      
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
      console.error('Error downloading barcode:', error);
      // Fallback: try direct data URL method
      try {
        const dataUrl = canvasRef.current.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `barcode-${variant.sku}-${Date.now()}.png`;
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
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], 'barcode.png', { type: 'image/png' })] })) {
        try {
          const file = new File([blob], `barcode-${variant.sku}.png`, { type: 'image/png' });
          await navigator.share({
            title: title,
            text: `Check out this barcode for ${variant.name} (${variant.sku})`,
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
          newWindow.document.write(`<img src="${dataUrl}" alt="Barcode" />`);
          setShowNotification(true);
        }
      }
      
    } catch (error) {
      console.error('Error sharing barcode:', error);
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
            <ScanLineIcon size={24} className="text-primary" />
            <Heading level={5} className="text-lg font-semibold text-copy">{title}</Heading>
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

        <Body className="text-copy-light text-sm mb-4">
          Barcode for {variant.name}
        </Body>

        <div className="flex justify-center mb-4">
          <div className="p-4 bg-surface border-2 border-border rounded-lg">
            <canvas
              ref={canvasRef}
              className="block"
            />
          </div>
        </div>

        <div className="mb-4">
          <Body className="text-sm text-copy-lighter mb-1">Barcode Data:</Body>
          <div className="text-sm text-copy-light bg-surface-hover p-2 rounded">
            <div className="space-y-1">
              <div><Text className="font-medium">URL:</Text> {barcodeData.url}</div>
              <div><Text className="font-medium">Product ID:</Text> {barcodeData.productId}</div>
              <div><Text className="font-medium">SKU:</Text> {barcodeData.sku}</div>
              <div><Text className="font-medium">Variant ID:</Text> {barcodeData.variantId}</div>
              <div><Text className="font-medium">Variant:</Text> {barcodeData.variantName}</div>
              <div><Text className="font-medium">Supplier:</Text> {barcodeData.supplier}</div>
              <div><Text className="font-medium">Price:</Text> ${barcodeData.price}</div>
              <div><Text className="font-medium">Stock:</Text> {barcodeData.stock}</div>
              {Object.keys(barcodeData.attributes).length > 0 && (
                <div><Text className="font-medium">Attributes:</Text> {JSON.stringify(barcodeData.attributes)}</div>
              )}
            </div>
          </div>
        </div>

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
      </motion.div>
      <NotificationModal
        isOpen={showNotification}
        onClose={() => setShowNotification(false)}
        title="Success"
        message={isDownloading ? "Barcode downloaded successfully!" : "Barcode copied to clipboard!"}
        variant="success"
        autoClose={true}
        autoCloseDelay={3000}
      />
    </motion.div>
  );
};