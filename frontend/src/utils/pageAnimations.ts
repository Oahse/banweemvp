/**
 * Reusable Framer Motion animation variants for consistent page animations
 */

export const pageAnimations = {
  // Container animation with staggered children
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

  // Item animation (fade in + slide up)
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
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

  // Scale animation for cards
  card: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    }
  },

  // Slide in from left
  slideLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  },

  // Slide in from right
  slideRight: {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  },

  // Fade only
  fade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 }
    }
  },

  // Modal/Dialog animation
  modal: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2 }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.15 }
    }
  },

  // List item stagger
  list: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  },

  listItem: {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2 }
    }
  }
};

// Export individual variants for convenience
export const {
  container: containerVariants,
  containerFast: containerFastVariants,
  item: itemVariants,
  itemFast: itemFastVariants,
  card: cardVariants,
  slideLeft: slideLeftVariants,
  slideRight: slideRightVariants,
  fade: fadeVariants,
  modal: modalVariants,
  list: listVariants,
  listItem: listItemVariants
} = pageAnimations;
