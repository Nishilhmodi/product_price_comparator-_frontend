import axios from 'axios';

// Use 127.0.0.1 instead of localhost to prevent IPv6 (::1) resolution issues on Windows
const BASE_URL = 'http://127.0.0.1:8000/api';

const apiInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const api = {
  // Expose direct get method to support custom calls like api.get() in ProductCard
  get: (url, config) => apiInstance.get(url, config),

  /**
   * Search for products.
   * GET /search?q=query&platform=all&sort=price_asc&max_price=3000&min_rating=4.0&page=1
   */
  search: async (params) => {
    const { q, platform, sort, max_price, min_rating, page } = params;
    const response = await apiInstance.get('/search', {
      params: {
        q,
        platform: platform || 'all',
        sort: sort || 'price_asc',
        max_price: max_price !== undefined ? max_price : undefined,
        min_rating: min_rating !== undefined ? min_rating : undefined,
        page: page || 1
      }
    });
    return response.data;
  },

  /**
   * Get autocomplete suggestions.
   * GET /suggest?q=partial_query
   */
  suggest: async (query) => {
    const response = await apiInstance.get('/suggest', {
      params: { q: query }
    });
    return response.data;
  },

  /**
   * Get supported platforms list.
   * GET /platforms
   */
  getPlatforms: async () => {
    const response = await apiInstance.get('/platforms');
    return response.data;
  },

  /**
   * Check backend health.
   * GET /health
   */
  checkHealth: async () => {
    const response = await apiInstance.get('/health');
    return response.data;
  }
};
