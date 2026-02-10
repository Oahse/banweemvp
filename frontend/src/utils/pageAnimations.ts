/**
 * Reusable Framer Motion animation variants for consistent page animations
 */

export const pageAnimations = {
  // Fast container for quick pages
  containerFast: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.02
      }
    }
  },

  // Fast item animation
  itemFast: {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 }
    }
  },

  // Standard container animation
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  },

  // Standard item animation
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  }
};

// Export individual variants for convenience
export const {
  containerFast,
  itemFast,
  container,
  item
} = pageAnimations;

// Also export with "Variants" suffix for backward compatibility
export const containerFastVariants = containerFast;
export const itemFastVariants = itemFast;
export const containerVariants = container;
export const itemVariants = item;