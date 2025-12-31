/**
 * Generates a placeholder image as a data URL
 * @param width - Image width
 * @param height - Image height  
 * @param text - Text to display in the placeholder
 * @returns Data URL for the placeholder image
 */
export const getPlaceholderImage = (width: number = 100, height: number = 100, text: string = 'No Image'): string => {
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="#f3f4f6"/>
      <text x="${width/2}" y="${height/2 + 5}" font-family="Arial, sans-serif" font-size="12" fill="#9ca3af" text-anchor="middle">${text}</text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Common placeholder images
export const PLACEHOLDER_IMAGES = {
  small: getPlaceholderImage(100, 100),
  medium: getPlaceholderImage(150, 150),
  large: getPlaceholderImage(300, 200, 'Product'),
} as const;