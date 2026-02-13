import React, { useState, useEffect } from 'react';
import { QrCodeIcon, ScanLineIcon, RefreshCwIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { ProductsAPI } from '@/api/products';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Text } from '@/components/ui/Text/Text';

// Client-side barcode generation
import JsBarcode from 'jsbarcode';
import QRCode from 'qrcode';

interface VariantCodeGeneratorProps {
  variantId: string;
  variantName: string;
  variantSku: string;
  onCodesGenerated?: (codes: { barcode: string; qr_code: string }) => void;
  autoGenerate?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const VariantCodeGenerator: React.FC<VariantCodeGeneratorProps> = ({
  variantId,
  variantName,
  variantSku,
  onCodesGenerated,
  autoGenerate = false,
  size = 'sm'
}) => {
  const [codes, setCodes] = useState<{ barcode?: string; qr_code?: string }>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const sizeClasses = {
    sm: 'w-12 h-8 sm:w-16 sm:h-12',
    md: 'w-16 h-12 sm:w-24 sm:h-16',
    lg: 'w-20 h-16 sm:w-32 sm:h-20'
  };

  useEffect(() => {
    if (autoGenerate && variantId && !hasGenerated) {
      generateCodes();
    }
  }, [autoGenerate, variantId, hasGenerated]);

  const generateClientSideBarcode = async (data: string, type: string) => {
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, data, {
      format: type,
      width: 2,
      height: 100,
      fontSize: 18,
      font: 'Arial',
      fontOptions: 'bold',
      textMargin: 2,
      text: data,
      textPosition: 'bottom',
    });
    return canvas.toDataURL('image/png').split(',')[1];
  };

  const generateClientSideQRCode = async (data: string) => {
    const canvas = document.createElement('canvas');
    QRCode.toCanvas(canvas, data);
    return canvas.toDataURL('image/png').split(',')[1];
  };

  const generateCodes = async () => {
    if (!variantId) return;
    
    setIsGenerating(true);
    try {
      // Generate barcode client-side
      const barcode = await generateClientSideBarcode(variantSku, 'code128');
      
      // Generate QR code client-side
      const qrData = `https://banwee.com/products/variant/${variantId}`;
      const qrCode = await generateClientSideQRCode(qrData);
      
      const newCodes = {
        barcode: `data:image/png;base64,${barcode}`,
        qr_code: `data:image/png;base64,${qrCode}`
      };
      
      setCodes(newCodes);
      setHasGenerated(true);
      onCodesGenerated?.(newCodes);
      
      if (!autoGenerate) {
        toast.success('Codes generated successfully!');
      }
    } catch (error) {
      console.error('Failed to generate codes:', error);
      if (!autoGenerate) {
        toast.error('Failed to generate codes');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-surface-hover rounded-lg p-3 border border-border-light">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
        <Heading level={5} className="text-sm font-medium text-main">Product Codes</Heading>
        <Button
          onClick={generateCodes}
          disabled={isGenerating}
          variant="primary"
          size="xs"
          className="flex items-center gap-1 px-2 py-1 text-sm bg-primary text-white rounded hover:bg-primary-dark disabled:opacity-50 transition-colors"
          leftIcon={<RefreshCwIcon size={12} className={isGenerating ? 'animate-spin' : ''} />}
          isLoading={isGenerating}
        >
          {isGenerating ? 'Generating...' : hasGenerated ? 'Regenerate' : 'Generate'}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Barcode Preview */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <ScanLineIcon size={12} className="mr-1 text-primary" />
            <Text className="text-sm text-copy-light">Barcode</Text>
          </div>
          {codes.barcode ? (
            <div className="bg-white p-2 rounded border">
              <img
                src={codes.barcode}
                alt={`Barcode for ${variantSku}`}
                className={`${sizeClasses[size]} object-contain mx-auto`}
              />
            </div>
          ) : (
            <div className={`${sizeClasses[size]} border-2 border-dashed border-border flex items-center justify-center text-copy-light bg-surface rounded mx-auto`}>
              <ScanLineIcon size={16} className="text-copy-light" />
            </div>
          )}
          <Body className="text-sm text-copy-light mt-1 font-mono break-all">{variantSku}</Body>
        </div>

        {/* QR Code Preview */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <QrCodeIcon size={12} className="mr-1 text-primary" />
            <Text className="text-sm text-copy-light">QR Code</Text>
          </div>
          {codes.qr_code ? (
            <div className="bg-white p-2 rounded border">
              <img
                src={codes.qr_code}
                alt={`QR Code for ${variantName}`}
                className={`${sizeClasses[size]} object-contain mx-auto`}
              />
            </div>
          ) : (
            <div className={`${sizeClasses[size]} border-2 border-dashed border-border flex items-center justify-center text-copy-light bg-surface rounded mx-auto`}>
              <QrCodeIcon size={16} className="text-copy-light" />
            </div>
          )}
          <Body className="text-sm text-copy-light mt-1 break-words">{variantName}</Body>
        </div>
      </div>

      {hasGenerated && (
        <div className="mt-2 text-center">
          <Text className="text-sm bg-success/10 text-success px-2 py-1 rounded-full">
            Codes Generated ✓
          </Text>
        </div>
      )}
    </div>
  );
};

export default VariantCodeGenerator;