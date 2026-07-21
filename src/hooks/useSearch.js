import { useState, useEffect, useCallback, useMemo } from 'react';
import { api } from '../utils/api';

export function useSearch(query, filters) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [sourceInfo, setSourceInfo] = useState('');
  const [intentChips, setIntentChips] = useState([]);

  const executeSearch = useCallback(async () => {
    const trimmedQuery = (query || '').trim();
    if (!trimmedQuery) {
      setResults([]);
      setSourceInfo('');
      setIntentChips([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const startTime = performance.now();
    try {
      const response = await api.search({
        q: trimmedQuery,
        platform: 'all',
        sort: 'price_asc',
        page: 1,
        limit: 100
      });

      const duration = ((performance.now() - startTime) / 1000).toFixed(1);
      setResults(response.results || []);
      setSourceInfo(`Live results · ${duration}s`);
      
      // Synthesize intent chips from the search context
      setIntentChips(response.intent_chips || [
        trimmedQuery ? `Query: ${trimmedQuery}` : null
      ].filter(Boolean));

    } catch (err) {
      console.error("Live API connection failed:", err);
      const isTimeout = err.code === 'ECONNABORTED' || err.message?.includes('timeout');
      if (isTimeout) {
        setError("Search request timed out. If the backend server was sleeping (Render Free Tier cold start), it can take 50-60 seconds to wake up. Please refresh the page or try searching again in a moment.");
      } else {
        setError("Failed to connect to the live PriceHunt server. If you just deployed, the server may still be starting up or waking from sleep. Please try again in a few seconds.");
      }
      setResults([]);
      setSourceInfo('');
      setIntentChips([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    executeSearch();
  }, [executeSearch]);

  // Compute filtered and sorted results client-side instantly
  const filteredResults = useMemo(() => {
    let list = [...results];

    // 1. Platform Filter
    if (filters.platform && filters.platform !== 'All Platforms') {
      list = list.filter(r => 
        r.prices && r.prices.some(p => p.platform.toLowerCase() === filters.platform.toLowerCase())
      );
    }

    // 2. Budget Filter
    if (filters.budget && filters.budget !== 'Any Budget') {
      if (filters.budget === 'Under ₹1,000') {
        list = list.filter(r => r.lowest_price <= 1000);
      } else if (filters.budget === '₹1,000–₹5,000') {
        list = list.filter(r => r.lowest_price >= 1000 && r.lowest_price <= 5000);
      } else if (filters.budget === '₹5,000–₹15,000') {
        list = list.filter(r => r.lowest_price >= 5000 && r.lowest_price <= 15000);
      } else if (filters.budget === 'Above ₹15,000') {
        list = list.filter(r => r.lowest_price > 15000);
      }
    }

    // 3. Rating Filter
    if (filters.rating && filters.rating !== 'Any Rating') {
      const minStars = filters.rating.includes('4') ? 4 : 3;
      list = list.filter(r => parseFloat(r.rating || 0) >= minStars);
    }

    // 4. Sort
    if (filters.sort) {
      if (filters.sort === 'Price: Low to High') {
        list.sort((a, b) => (a.lowest_price || 999999) - (b.lowest_price || 999999));
      } else if (filters.sort === 'Price: High to Low') {
        list.sort((a, b) => (b.lowest_price || 0) - (a.lowest_price || 0));
      } else if (filters.sort === 'Best Rating') {
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      }
    }

    return list;
  }, [results, filters]);

  return {
    loading,
    error,
    results: filteredResults,
    rawResults: results,
    totalResults: filteredResults.length,
    sourceInfo,
    intentChips,
    refetch: executeSearch
  };
}
