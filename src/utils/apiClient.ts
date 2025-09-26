import axios, { AxiosResponse, AxiosHeaders } from 'axios';
import { FALLBACK_FILES } from './constants.ts';
import { API_CONFIG } from './apiConfig'

const apiClient = axios.create({
	baseURL: API_CONFIG.baseUrl,
	timeout: API_CONFIG.timeout,
})

// Cache for JSON fallback data to prevent repeated file reads
const dataCache = new Map<string, unknown>()

// Fetch data from API with automatic fallback to local JSON data
export const fetchWithFallback = async <T>(
  endpoint: string,
  fallbackPath: string
): Promise<AxiosResponse<T>> => {
  // If API is disabled, directly use fallback
  if (!API_CONFIG.useApi) {
    console.info(`API disabled, using fallback data for ${endpoint}`);
    return await getFallbackData<T>(endpoint, fallbackPath);
  }

  try {
    // Try to fetch from API first
    const response = await apiClient.get<T>(endpoint);
    return response;
  } catch (error) {
    console.warn(`API call failed for ${endpoint}, falling back to local data:`, error);
    // If API fails, try to fetch from local JSON file
    return await getFallbackData<T>(endpoint, fallbackPath);
  }
};

// Helper function to retrieve and process fallback data from local JSON files
async function getFallbackData<T>(endpoint: string, fallbackPath: string): Promise<AxiosResponse<T>> {
  try {
    // Check if data is already cached
    if (dataCache.has(fallbackPath)) {
      console.info(`Using cached data for ${endpoint}`);
      let cachedData = dataCache.get(fallbackPath);
      
      // Apply query parameter filtering to cached data
      cachedData = applyQueryFilters(cachedData, endpoint, fallbackPath);
      
      return {
        data: cachedData as T,
        status: 200,
        statusText: 'OK',
        headers: {} as AxiosHeaders,
        config: { 
          url: endpoint,
          method: 'get',
          headers: {} as AxiosHeaders
        }
      };
    }

    // Dynamic import for JSON files
    let fallbackResponse;
    switch(fallbackPath) {
      case FALLBACK_FILES.BLOG:
        fallbackResponse = await import('../data/blog.json');
        break;
      case FALLBACK_FILES.HEALTH:
        fallbackResponse = await import('../data/health.json');
        break;
      case FALLBACK_FILES.HONEY:
        fallbackResponse = await import('../data/honey.json');
        break;
      case FALLBACK_FILES.ORDER:
        fallbackResponse = await import('../data/order.json');
        break;
      default:
        throw new Error(`Unknown fallback file: ${fallbackPath}`);
    }
    
    // Apply query parameter filtering to the loaded data
    let processedData = applyQueryFilters(fallbackResponse.default, endpoint, fallbackPath);
    
    // Cache the original data (not the filtered version) to preserve full dataset
    if (!dataCache.has(fallbackPath)) {
      dataCache.set(fallbackPath, fallbackResponse.default);
    }
    
    console.info(`Using fallback data for ${endpoint}`);
    
    return {
      data: processedData as T,
      status: 200,
      statusText: 'OK',
      headers: {} as AxiosHeaders,
      config: { 
        url: endpoint,
        method: 'get',
        headers: {} as AxiosHeaders
      }
    };
  } catch (fallbackError) {
    console.error(`Failed to load fallback data for ${endpoint}:`, fallbackError);
    throw new Error(`Failed to load data from both API and fallback for ${endpoint}`);
  }
}

// Apply query parameter filtering to data based on the endpoint and URL
// Currently supports filtering for honey data with category, sorting by name or price, and ordering
function applyQueryFilters(data: any, endpoint: string, fallbackPath: string): any {
  // Only apply filters for honey data since it has categories and other properties that can be filtered
  if (fallbackPath === FALLBACK_FILES.HONEY && Array.isArray(data)) {
    // Extract query parameters from the endpoint URL
    const url = new URL(endpoint, 'http://localhost'); // Using dummy base to parse relative URLs
    const category = url.searchParams.get('category');
    const sortBy = url.searchParams.get('sortBy');
    const order = url.searchParams.get('order') || 'asc'; // Default to ascending order
    
    let filteredData = [...data]; // Create a copy to avoid modifying the original
    
    // Apply category filter if specified
    if (category) {
      filteredData = filteredData.filter(item => item.category === category);
    }
    
    // Apply sorting if specified
    if (sortBy) {
      filteredData.sort((a, b) => {
        let aVal = a[sortBy];
        let bVal = b[sortBy];
        
        // Handle numeric sorting (for price)
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return order === 'asc' ? aVal - bVal : bVal - aVal;
        }
        
        // Handle string sorting (for name, etc.)
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          const comparison = aVal.localeCompare(bVal);
          return order === 'asc' ? comparison : -comparison;
        }
        
        // Handle other types by converting to string
        aVal = String(aVal);
        bVal = String(bVal);
        const comparison = aVal.localeCompare(bVal);
        return order === 'asc' ? comparison : -comparison;
      });
    }
    
    return filteredData;
  }
  
  // For other types of data or if no filtering is needed, return as is
  return data;
}

export default apiClient
