interface RegisterData {
  phone_number: string;
  name: string;
  store_name: string;
  store_id: string;
  brand_id: string;
}

export interface ApiError {
  code: string;
  message: string;
  details: null | any;
}

interface StoreInfo {
  name: string;
  web_image_url: string;
}

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is not set');
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function register(data: RegisterData): Promise<void> {
  try {
    console.log("=== API 호출 시작 ===");
    console.log("API_BASE_URL:", API_BASE_URL);
    console.log("Request data:", data);
    console.log("Full URL:", `${API_BASE_URL}/v1/w/users`);
    
    const response = await fetch(`${API_BASE_URL}/v1/w/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'http://localhost:3000',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    
    console.log("Response status:", response.status);
    console.log("Response headers:", Object.fromEntries(response.headers.entries()));
    
    const responseData = await response.json();
    console.log("Response data:", responseData);

    if (!response.ok) {
      const errorData = responseData as ApiError;
      const error = new Error(errorData.message || `API request failed with status ${response.status}`);
      error.cause = errorData;
      throw error;
    }
  } catch (error) {
    console.error("API call failed with error:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    throw error;
  }
}

export async function getStoreInfo(storeId: string): Promise<StoreInfo> {
  try {
    console.log("=== Store Info API 호출 시작 ===");
    console.log("API_BASE_URL:", API_BASE_URL);
    console.log("Store ID:", storeId);
    console.log("Full URL:", `${API_BASE_URL}/v1/w/stores/${storeId}`);
    
    const response = await fetch(`${API_BASE_URL}/v1/w/stores/${storeId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Origin': 'http://localhost:3000',
      },
      credentials: 'include',
    });
    
    console.log("Response status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(`Store info API request failed with status ${response.status}: ${errorText}`);
    }
    
    const responseData = await response.json();
    console.log("Store info response data:", responseData);
    return responseData;
  } catch (error) {
    console.error("Store info API call failed with error:", error);
    throw error;
  }
} 