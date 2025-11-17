import React, { createContext, useState, useEffect, useContext } from 'react';
import { useApi } from '../hooks/useApi';
import { CategoriesAPI } from '../apis';




export const CategoryContext = createContext(undefined);



export const CategoryProvider = ({ children }) => {
  const { data, loading, error, execute } = useApi();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    execute(CategoriesAPI.getCategories);
  }, [execute]);

  useEffect(() => {
    if (data) {
      // API returns { success: true, data: [...] }
      const categoriesArray = data.data || data;
      setCategories(Array.isArray(categoriesArray) ? categoriesArray : []);
    }
  }, [data]);

  return (
    <CategoryContext.Provider value={{ categories, loading, error }}>
      {children}
    </CategoryContext.Provider>
  );
};
export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategory error: must be used within a CategoryProvider');
  }
  return context;
};