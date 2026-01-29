import React, { createContext, ReactNode } from 'react';

interface Category {
  id: string;
  name: string;
  icon?: string;
}

interface CategoryContextType {
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: (id: string | null) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const categories: Category[] = [
    { id: 'cereal-crops', name: 'Cereal Crops' },
    { id: 'legumes', name: 'Legumes' },
    { id: 'fruits-vegetables', name: 'Fruits & Vegetables' },
    { id: 'oilseeds', name: 'Oilseeds' },
  ];

  return (
    <CategoryContext.Provider value={{ categories, selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = (): CategoryContextType => {
  const context = React.useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};

// Export as useCategories for backward compatibility
export const useCategories = useCategory;
