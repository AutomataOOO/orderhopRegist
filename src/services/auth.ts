interface RegisterData {
  phoneNumber: string;
  name: string;
  storeName: string;
}

interface ApiError {
  code: string;
  message: string;
}

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is not set');
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function register(data: RegisterData): Promise<void> {
  const response = await fetch(`${API_BASE_URL}//v1/w/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw error;
  }
} 