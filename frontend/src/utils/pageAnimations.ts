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
  }
};

// Export individual variants for convenience
export const {
  containerFast: containerFastVariants,
  itemFast: itemFastVariants
} = pageAnimations;