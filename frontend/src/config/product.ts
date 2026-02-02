/**
 * Product-related configuration
 * Centralized configuration for product constants and data
 */

export const DIETARY_TAGS = [
  // Dietary Lifestyles
  'Vegetarian',
  'Vegan',
  'Pescatarian',
  'Flexitarian',
  'Omnivore',
  'Raw Vegan',
  'Fruitarian',
  'Whole-Food Plant-Based',
  'Plant-Based',
  
  // Low-Carb & Metabolic Diets
  'Keto',
  'Paleo',
  'Carnivore',
  'Low-Carb',
  'FODMAP-Friendly',
  'Grain-Free',
  'Atkins',
  'Zone Diet',
  
  // Regional & Traditional Diets
  'Mediterranean',
  'DASH',
  'Nordic',
  'Ayurvedic',
  'Macrobiotic',
  'Japanese',
  'Thai',
  
  // Allergy & Intolerance (Codex/FDA/EU standards)
  'Gluten-Free',
  'Dairy-Free',
  'Lactose-Free',
  'Egg-Free',
  'Nut-Free',
  'Peanut-Free',
  'Tree-Nut-Free',
  'Soy-Free',
  'Sesame-Free',
  'Shellfish-Free',
  'Fish-Free',
  'Wheat-Free',
  'Sulfite-Free',
  'Corn-Free',
  'Mollusc-Free',
  'Histamine-Free',
  'Lectin-Free',
  
  // Health & Nutrition
  'Low-Sodium',
  'Low-Fat',
  'Low-Sugar',
  'Sugar-Free',
  'No-Refined-Sugars',
  'High-Protein',
  'High-Fiber',
  'High-Calcium',
  'High-Iron',
  'Heart-Healthy',
  'Diabetic-Friendly',
  'Cholesterol-Free',
  'Trans-Fat-Free',
  'Omega-3-Rich',
  'Probiotic',
  'Prebiotic',
  'B12-Fortified',
  'Vitamin-D-Fortified',
  
  // Production Methods & Quality
  'Organic',
  'Certified-Organic',
  'Non-GMO',
  'Grass-Fed',
  'Wild-Caught',
  'Antibiotic-Free',
  'Hormone-Free',
  'Cage-Free',
  'Free-Range',
  'Regenerative',
  'Locally-Sourced',
  'Fair-Trade',
  'Sustainable',
  'Lab-Grown',
  
  // Processing & Additives
  'Natural',
  'Raw',
  'Whole-Grain',
  'Cold-Pressed',
  'Sprouted',
  'Fermented',
  'No-Artificial-Sweeteners',
  'No-Artificial-Flavors',
  'No-Artificial-Colors',
  'Preservative-Free',
  'Pesticide-Free',
  'Additive-Free',
  'Alcohol-Free',
  'BPA-Free',
  'Mercury-Free',
  
  // Religious & Cultural
  'Halal',
  'Kosher',
  'Halal-Certified',
  'Kosher-Certified',
  
  // Ethical & Environmental
  'Cruelty-Free',
  'Eco-Friendly',
  'Carbon-Neutral',
  'Traceable',
  'Plastic-Free',
  'Recyclable-Packaging'
];

export const PRODUCT_STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'draft', label: 'Draft' }
];

export const AVAILABILITY_STATUSES = [
  { value: 'available', label: 'Available' },
  { value: 'limited', label: 'Limited Stock' },
  { value: 'out_of_stock', label: 'Out of Stock' },
  { value: 'discontinued', label: 'Discontinued' }
];

export const ORDER_STATUSES = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' }
];

export const PAYMENT_STATUSES = [
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
  { value: 'failed', label: 'Failed' },
  { value: 'refunded', label: 'Refunded' }
];

export const USER_ROLES = [
  { value: 'Admin', label: 'Admin' },
  { value: 'Customer', label: 'Customer' },
  { value: 'Supplier', label: 'Supplier' }
];

export const USER_STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' }
];

export const SUBSCRIPTION_STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'expired', label: 'Expired' },
  { value: 'pending', label: 'Pending' }
];

export const REFUND_STATUSES = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'processed', label: 'Processed' }
];

export const DEFAULT_PAGINATION_LIMIT = 10;

export const PAGINATION_OPTIONS = [5, 10, 20, 50, 100];
