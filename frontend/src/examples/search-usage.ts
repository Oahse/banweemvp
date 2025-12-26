/**
 * Example usage of the new distributed search APIs
 * 
 * The search functionality has been distributed from a centralized /search endpoint
 * to domain-specific endpoints for better organization and maintainability.
 */

import { SearchAPI, ProductsAPI, UsersAPI } from '../apis';

// Example 1: Product Search (Advanced fuzzy search with filters)
export async function searchProducts() {
  try {
    // Using the new distributed endpoint: /products/search
    const results = await ProductsAPI.searchProducts('organic coffee', {
      category_id: 'some-category-id',
      min_price: 10,
      max_price: 50,
      limit: 20
    });
    
    console.log('Product search results:', results.data.products);
    return results.data.products;
  } catch (error) {
    console.error('Product search failed:', error);
  }
}

// Example 2: Category Search (Advanced fuzzy search)
export async function searchCategories() {
  try {
    // Using the new distributed endpoint: /products/categories/search
    const results = await ProductsAPI.searchCategories('beverages', 10);
    
    console.log('Category search results:', results.data.categories);
    return results.data.categories;
  } catch (error) {
    console.error('Category search failed:', error);
  }
}

// Example 3: User Search (Advanced fuzzy search with role filter)
export async function searchUsers() {
  try {
    // Using the new distributed endpoint: /users/search
    const results = await UsersAPI.searchUsers('john doe', {
      role: 'Customer',
      limit: 15
    });
    
    console.log('User search results:', results.data.users);
    return results.data.users;
  } catch (error) {
    console.error('User search failed:', error);
  }
}

// Example 4: Autocomplete (Unified endpoint for quick suggestions)
export async function getAutocompleteSuggestions(query: string, type: 'product' | 'user' | 'category') {
  try {
    // Using the unified autocomplete endpoint: /search/autocomplete
    const results = await SearchAPI.getAutocompleteSuggestions(query, type, 10);
    
    console.log('Autocomplete suggestions:', results.data.suggestions);
    return results.data.suggestions;
  } catch (error) {
    console.error('Autocomplete failed:', error);
  }
}

// Example 5: Universal Search (Search across multiple types)
export async function universalSearch(query: string) {
  try {
    // Using the SearchAPI universal search method
    const results = await SearchAPI.universalSearch(query, {
      includeProducts: true,
      includeCategories: true,
      includeUsers: false, // Only include users if needed
      limit: 10
    });
    
    console.log('Universal search results:', {
      products: results.data.products,
      categories: results.data.categories,
      users: results.data.users
    });
    
    return results.data;
  } catch (error) {
    console.error('Universal search failed:', error);
  }
}

// Example 6: Search with React Hook (for component usage)
import { useState, useEffect } from 'react';

export function useProductSearch(query: string, filters?: any) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    const searchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await ProductsAPI.searchProducts(query, filters);
        setResults(response.data.products);
      } catch (err) {
        setError(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(searchProducts, 300);
    return () => clearTimeout(timeoutId);
  }, [query, filters]);

  return { results, loading, error };
}

// Example 7: Search Component Usage
/*
import React, { useState } from 'react';
import { useProductSearch } from './search-usage';

export function ProductSearchComponent() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({});
  const { results, loading, error } = useProductSearch(query, filters);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />
      
      {loading && <div>Searching...</div>}
      {error && <div>Error: {error.message}</div>}
      
      <div>
        {results.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span>Relevance: {product.relevance_score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
*/

/**
 * Migration Guide from Old Search API:
 * 
 * OLD WAY (Centralized):
 * - await apiClient.get('/search/products?q=coffee')
 * - await apiClient.get('/search/users?q=john')
 * - await apiClient.get('/search/categories?q=beverages')
 * 
 * NEW WAY (Distributed):
 * - await ProductsAPI.searchProducts('coffee', filters)
 * - await UsersAPI.searchUsers('john', filters)
 * - await ProductsAPI.searchCategories('beverages', limit)
 * 
 * Benefits:
 * 1. Better organization - search logic is with domain logic
 * 2. Type safety - each API has proper TypeScript types
 * 3. Flexibility - each domain can have specific filters
 * 4. Maintainability - easier to update domain-specific search
 * 5. Performance - can optimize each search independently
 */