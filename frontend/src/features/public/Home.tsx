import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon, TruckIcon, BadgeCheckIcon, ShieldIcon, HeadphonesIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { ProductCard } from '../../components/generic/ProductCard';
import { CategoryCard } from '../../components/generic/CategoryCard';
import { useLocale } from '../../components/shared/contexts/LocaleContext';
import { useTheme } from '../../components/shared/contexts/ThemeContext';
import { useAsync } from '../../components/shared/hooks/useAsync';
import { ProductsAPI } from '../../api/products';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Text } from '@/components/ui/Text/Text';

// Filter categories configuration system
const FILTER_CATEGORIES: Record<string, {
  id: string;
  name: string;
  keywords: string[];
  exactMatches: string[];
}> = {
  'cereal-crops': {
    id: 'cereal-crops',
    name: 'Cereal Crops',
    keywords: ['cereal', 'grain', 'crop', 'rice', 'wheat', 'quinoa', 'oats', 'barley', 'corn', 'millet'],
    exactMatches: ['Cereal Crops', 'Grains', 'Cereals']
  },
  'legumes': {
    id: 'legumes',
    name: 'Legumes',
    keywords: ['legume', 'bean', 'pea', 'lentil', 'chickpea', 'soybean', 'kidney bean', 'black-eyed pea'],
    exactMatches: ['Legumes', 'Beans', 'Pulses']
  },
  'fruits-vegetables': {
    id: 'fruits-vegetables',
    name: 'Fruits & Vegetables',
    keywords: ['fruit', 'vegetable', 'produce', 'fresh', 'dried fruit', 'cassava', 'plantain', 'mango'],
    exactMatches: ['Fruits & Vegetables', 'Produce', 'Fresh Produce', 'Fruits', 'Vegetables']
  },
  'oilseeds': {
    id: 'oilseeds',
    name: 'Oilseeds',
    keywords: ['oil', 'seed', 'nut', 'shea', 'coconut', 'sesame', 'sunflower', 'peanut'],
    exactMatches: ['Oilseeds', 'Nuts', 'Oils', 'Seeds']
  }
};

// Flexible product matching function with case-insensitive keyword matching
const matchesCategory = (product: any, filterKey: string): boolean => {
  const category = FILTER_CATEGORIES[filterKey];
  if (!category) return false;

  // Handle edge cases in product category data
  const productCategoryStr = typeof product.category === 'object' && product.category.name 
    ? product.category.name 
    : (typeof product.category === 'string' 
      ? product.category 
      : '');

  if (!productCategoryStr) {
    return false;
  }

  const productCategory = productCategoryStr.toLowerCase().trim();

  // Check exact matches first (case-insensitive)
  if (category.exactMatches?.some((match: string) =>
    productCategory === match.toLowerCase()
  )) {
    return true;
  }

  // Check keyword matches (case-insensitive)
  return category.keywords.some((keyword: string) =>
    productCategory.includes(keyword.toLowerCase())
  );
};

// Hero slides data - Amazon-style instant loading with demo data
const heroSlides = [
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    title: 'Organic Products from Africa',
    subtitle: 'Farm Fresh & Natural',
    description: 'Experience the authentic taste of Africa with our premium organic products.',
    buttonText: 'Shop Now',
    buttonLink: '/products?featured=true',
    image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    title: 'Ethically Sourced Ingredients',
    subtitle: 'Pure & Natural',
    description: 'Supporting local farmers while bringing you the best quality African produce.',
    buttonText: 'Discover More',
    buttonLink: '/about',
    image: 'https://images.unsplash.com/photo-1595356161904-6708c97be89c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
    title: 'Sustainable Packaging',
    subtitle: 'Eco-Friendly',
    description: 'Our commitment to the planet with biodegradable and recyclable packaging.',
    buttonText: 'Learn More',
    buttonLink: '/about',
    image: 'https://images.unsplash.com/photo-1509099652299-30938b0aeb63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
  },
];

export const Home = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const { formatCurrency } = useLocale();
  const { theme } = useTheme();

  // Single API call for all home page data
  const { data: homeData, loading: homeLoading, error: homeError, execute } = useAsync();

  const [categories, setCategories] = useState<any[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [popularProducts, setPopularProducts] = useState<any[]>([]);
  const [deals, setDeals] = useState<any[]>([]);

  // Fetch home data on mount
  useEffect(() => {
    execute(ProductsAPI.getHomeData);
  }, [execute]);

  useEffect(() => {
    if (homeData && typeof homeData === 'object' && 'data' in homeData && homeData.data) {
      const payload = homeData?.data?.data ?? homeData?.data ?? {};
      const { categories: categoriesData, featured, popular, deals: dealsData } = payload as any;

      // Helper function to convert API categories to demo format
      const convertCategory = (category: any) => ({
        id: category.id,
        name: category.name,
        image: category.image_url || getCategoryImage(category.name),
        path: `/products?category=${encodeURIComponent(category.name)}`
      });

      // Convert categories
      if (categoriesData && Array.isArray(categoriesData)) {
        const convertedCategories = categoriesData.map(convertCategory);
        setCategories(convertedCategories);
      }

      // Use backend data directly without transformation
      setFeaturedProducts(featured || []);
      setPopularProducts(popular || []);
      setDeals(dealsData || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeData]);

  const categoriesContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoriesContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      categoriesContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Simple carousel functionality
  const nextSlide = () => {
    setCurrentSlide((prev) => (heroSlides.length ? (prev + 1) % heroSlides.length : 0));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (heroSlides.length ? (prev - 1 + heroSlides.length) % heroSlides.length : 0));
  };

  // Function to get appropriate demo images for categories
  const getCategoryImage = (categoryName: string) => {
    if (!categoryName) return 'https://source.unsplash.com/400x400/?nature,product';
    const name = categoryName.toLowerCase();

    if (name.includes('cereal') || name.includes('grain') || name.includes('rice') || name.includes('wheat')) {
      return 'https://source.unsplash.com/400x400/?wheat';
    }
    if (name.includes('legume') || name.includes('bean') || name.includes('pea')) {
      return 'https://source.unsplash.com/400x400/?beans';
    }
    if (name.includes('fruit') || name.includes('vegetable') || name.includes('produce')) {
      return 'https://source.unsplash.com/400x400/?vegetables';
    }
    if (name.includes('oil') || name.includes('seed') || name.includes('spice') || name.includes('herb')) {
      return 'https://source.unsplash.com/400x400/?seeds';
    }
    if (name.includes('nut') || name.includes('beverage') || name.includes('drink')) {
      return 'https://source.unsplash.com/400x400/?nuts';
    }

    return `https://source.unsplash.com/400x400/?${encodeURIComponent(name)}`;
  };

  // Filter popular products based on active tab using enhanced matching system
  const getFilteredPopularProducts = () => {
    if (activeTab === 'all') {
      return popularProducts;
    }

    // Use enhanced matching system for compatibility with both API and demo data
    return popularProducts.filter((product) => {
      return matchesCategory(product, activeTab);
    });
  };

  const filteredPopularProducts = getFilteredPopularProducts();

  const handleDragEnd = (info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > 100 || velocity > 500) {
      prevSlide();
    } else if (offset < -100 || velocity < -500) {
      nextSlide();
    }
  };

  return (
    <div className="pb-16 md:pb-0 text-copy">
      {/* Hero Section */}
      <section className="relative">
        <motion.div
          className="relative h-[60vh] md:h-[70vh] w-full"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => handleDragEnd(info)}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={currentSlide}
              className="absolute inset-0"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
            >
              <div className="absolute inset-0 bg-black/40 z-10" aria-hidden />
              <img
                src={heroSlides[currentSlide]?.image}
                alt={heroSlides[currentSlide]?.title || 'Hero image'}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
                <div className="max-w-xl text-white">
                  <Text variant="body-sm" className="inline-block px-4 py-1 bg-primary text-white rounded-full mb-4 font-medium">
                    {heroSlides[currentSlide]?.badge}
                  </Text>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}>
                    <Heading level={1} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                      {heroSlides[currentSlide]?.title}
                    </Heading>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}>
                    <Text variant="body-lg" className="mb-6">
                      {heroSlides[currentSlide]?.description}
                    </Text>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}>
                    <Link
                      to={heroSlides[currentSlide]?.buttonLink || '/products'}
                      className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors">
                      {heroSlides[currentSlide]?.buttonText}
                      <ArrowRightIcon size={16} className="ml-2" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          {/* Navigation buttons */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full"
            aria-label="Previous slide"
            onClick={prevSlide}
          >
            ❮
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full"
            aria-label="Next slide"
            onClick={nextSlide}
          >
            ❯
          </Button>
          {/* Pagination dots */}
          <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center">
            {heroSlides.map((_, index) => (
              <Button
                key={index}
                type="button"
                variant={currentSlide === index ? "primary" : "ghost"}
                size="sm"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full mx-1 ${currentSlide === index ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-10 bg-surface">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <TruckIcon size={24} className="text-primary" />
              </div>
              <Heading level={3} weight="medium">Free Delivery</Heading>
              <Text variant="body-sm" tone="secondary">From $49.99</Text>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <BadgeCheckIcon size={24} className="text-primary" />
              </div>
              <Heading level={3} weight="medium">Certified Organic</Heading>
              <Text variant="body-sm" tone="secondary">100% Guarantee</Text>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <ShieldIcon size={24} className="text-primary" />
              </div>
              <Heading level={3} weight="medium">Secure Payments</Heading>
              <Text variant="body-sm" tone="secondary">100% Protected</Text>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <HeadphonesIcon size={24} className="text-primary" />
              </div>
              <Heading level={3} weight="medium">24/7 Support</Heading>
              <Text variant="body-sm" tone="secondary">Dedicated Support</Text>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <Text variant="body-sm" weight="medium" tone="primary">Explore our product range</Text>
              <Heading level={2} className="text-2xl md:text-3xl font-bold mt-1">Shop Categories</Heading>
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <Button 
                onClick={() => scrollCategories('left')} 
                variant="ghost" 
                size="icon" 
                className="p-2 rounded-full bg-surface hover:bg-surface-hover"
              >
                <ChevronLeftIcon size={20} />
              </Button>
              <Button 
                onClick={() => scrollCategories('right')} 
                variant="ghost" 
                size="icon" 
                className="p-2 rounded-full bg-surface hover:bg-surface-hover"
              >
                <ChevronRightIcon size={20} />
              </Button>
              <Link to="/products" className="inline-flex items-center text-primary hover:underline">
                All Categories
                <ArrowRightIcon size={16} className="ml-2" />
              </Link>
            </div>
          </div>

          <div ref={categoriesContainerRef} className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
            {(homeLoading || homeError) ? (
              // Loading skeleton for categories
              [...Array(5)].map((_, index) => (
                <div key={index} className="flex-none w-40 h-40 bg-surface-hover rounded-lg animate-pulse"></div>
              ))
            ) : (
              categories.map((category) => (
                <div key={category.id} className="flex-none w-40">
                  <CategoryCard category={category} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-10 bg-surface">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <Text variant="body-sm" weight="medium" tone="primary">Featured Products</Text>
              <Heading level={2} className="text-lg md:text-xl font-semibold mt-1">Featured Products</Heading>
            </div>
            <Link
              to="/products?featured=true"
              className="inline-flex items-center text-primary hover:underline mt-4 md:mt-0">
              All Featured
              <ArrowRightIcon size={16} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
            {(homeLoading || homeError) ? (
              // Loading skeleton
              [...Array(4)].map((_, index) => (
                <ProductCard key={index} isLoading={true} product={{} as any} selectedVariant={null} className="" />
              ))
            ) : featuredProducts.length > 0 ? (
              featuredProducts.map((product) => {
                // Get the first variant for display
                const displayVariant = product.variants?.[0] || null;
                const minPrice = product.price_range?.min ?? product.min_price ?? product.price ?? 0;
                const maxPrice = product.price_range?.max ?? product.max_price ?? minPrice;
                const productImage = displayVariant?.primary_image?.url || displayVariant?.images?.[0]?.url || product.image || '';
                return (
                  <ProductCard
                    key={product.id}
                    product={{
                      ...product,
                      // Ensure backward compatibility with expected structure
                      price: displayVariant?.base_price ?? minPrice,
                      discountPrice: displayVariant?.sale_price ?? null,
                      min_price: minPrice,
                      max_price: maxPrice,
                      image: productImage,
                      variants: product.variants || []
                    }}
                    selectedVariant={displayVariant}
                    className=""
                  />
                );
              })
            ) : (
              <div className="col-span-full text-center py-8 text-copy-light">
              <Text variant="body-sm" tone="secondary">No featured products available</Text>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Popular Products with Tabs */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <Text variant="body-sm" weight="medium" tone="primary">Best Sellers</Text>
              <Heading level={2} className="text-lg md:text-xl font-semibold mt-1">Popular Products</Heading>
            </div>
            <Link to="/products?popular=true" className="inline-flex items-center text-primary hover:underline mt-4 md:mt-0">
              All Popular
              <ArrowRightIcon size={16} className="ml-2" />
            </Link>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              onClick={() => setActiveTab('all')}
              variant={activeTab === 'all' ? 'primary' : 'ghost'}
              size="sm"
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:scale-105"
            >
              All Products
            </Button>
            <Button
              onClick={() => setActiveTab('cereal-crops')}
              variant={activeTab === 'cereal-crops' ? 'primary' : 'ghost'}
              size="sm"
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:scale-105"
            >
              Cereal Crops
            </Button>
            <Button
              onClick={() => setActiveTab('legumes')}
              variant={activeTab === 'legumes' ? 'primary' : 'ghost'}
              size="sm"
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:scale-105"
            >
              Legumes
            </Button>
            <Button
              onClick={() => setActiveTab('fruits-vegetables')}
              variant={activeTab === 'fruits-vegetables' ? 'primary' : 'ghost'}
              size="sm"
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:scale-105"
            >
              Fruits & Vegetables
            </Button>
            <Button
              onClick={() => setActiveTab('oilseeds')}
              variant={activeTab === 'oilseeds' ? 'primary' : 'ghost'}
              size="sm"
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:scale-105"
            >
              Oil Seeds
            </Button>
          </div>

          {/* Product Grid or Empty State */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {(homeLoading || homeError) ? (
              // Loading skeleton
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
                {[...Array(4)].map((_, index) => (
                  <ProductCard key={index} isLoading={true} product={{} as any} selectedVariant={null} className="" />
                ))}
              </div>
            ) : filteredPopularProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
                {filteredPopularProducts.map((product, index) => {
                  // Get the first variant for display
                  const displayVariant = product.variants?.[0] || null;
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.05,
                        ease: "easeOut"
                      }}
                    >
                      <ProductCard
                        product={{
                          ...product,
                          // Ensure backward compatibility with expected structure
                          price: displayVariant?.base_price || product.price || 0,
                          discountPrice: displayVariant?.sale_price || product.discountPrice || null,
                          image: displayVariant?.images?.[0]?.url || product.image || '',
                          variants: product.variants || []
                        }}
                        selectedVariant={displayVariant}
                        className=""
                      />
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-copy-light">
                No products found for the selected category
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Deals of the day */}
      <section className="py-10 bg-surface">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <Text className="text-primary text-sm font-medium">Best deals</Text>
              <Heading level={2} className="text-lg md:text-xl font-semibold text-main mt-1">Top Deals of the Day</Heading>
            </div>
            <Link to="/products?sale=true" className="inline-flex items-center text-primary hover:underline mt-4 md:mt-0">
              All Deals
              <ArrowRightIcon size={16} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(homeLoading || homeError) ? (
              // Loading skeleton
              [...Array(2)].map((_, index) => (
                <div key={index} className="flex flex-col md:flex-row bg-background rounded-lg overflow-hidden shadow-sm animate-pulse">
                  <div className="md:w-1/3 h-40 md:h-auto bg-surface-hover"></div>
                  <div className="flex-1 p-6">
                    <div className="h-4 bg-surface-hover rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-surface-hover rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-surface-hover rounded w-1/3 mb-4"></div>
                    <div className="h-10 bg-surface-hover rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : (
              deals.map((product) => {
                // Get the first variant for display
                const displayVariant = product.variants?.[0] || null;
                const productImage = displayVariant?.primary_image?.url || displayVariant?.images?.[0]?.url || product.image || 'https://source.unsplash.com/400x400/?product';
                const basePrice = displayVariant?.base_price ?? product.price_range?.max ?? product.max_price ?? product.price ?? 0;
                const salePrice = displayVariant?.sale_price ?? null;
                const discountPercent = salePrice && basePrice > salePrice
                  ? Math.round(((basePrice - salePrice) / basePrice) * 100)
                  : (product.discountPercent ?? 0);
                
                return (
                  <div key={product.id} className="flex flex-col md:flex-row bg-background rounded-lg overflow-hidden shadow-sm">
                    <div className="md:w-1/3">
                      <img
                        src={productImage}
                        alt={product.name}
                        className="w-full h-60 md:h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Text className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                          -{discountPercent}%
                        </Text>
                        <Text className="text-red-500 text-sm font-medium">
                          Ends in {product.endsIn || '2d 15h 22m'}
                        </Text>
                      </div>
                      <Heading level={3} className="text-lg font-semibold text-main mb-2">{product.name}</Heading>
                      <Body className="text-sm text-copy-light mb-4">
                        {typeof product.category === 'object' && product.category.name 
                          ? product.category.name 
                          : (typeof product.category === 'string' 
                            ? product.category 
                            : 'Uncategorized')}
                      </Body>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Text
                              key={i}
                              className={`text-sm ${i < Math.floor(product.rating_average || product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                                }`}>
                              ★
                            </Text>
                          ))}
                        </div>
                        <Text className="text-sm text-copy-light">({product.review_count || product.reviewCount || 0})</Text>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <Text className="text-xl font-bold text-primary">
                          {formatCurrency(
                            displayVariant?.sale_price || 
                            displayVariant?.base_price || 
                            product.min_price || 
                            0
                          )}
                        </Text>
                        {displayVariant?.sale_price && displayVariant.sale_price < displayVariant.base_price && (
                          <Text className="text-sm text-copy-light line-through">
                            {formatCurrency(displayVariant.base_price)}
                          </Text>
                        )}
                      </div>
                      <Link
                        to={`/products/${product.id}`}
                        className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors text-sm">
                        View Deal
                        <ArrowRightIcon size={14} className="ml-2" />
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;