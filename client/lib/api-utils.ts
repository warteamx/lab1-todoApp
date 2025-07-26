import { Alert } from 'react-native';

export interface ApiError extends Error {
    status?: number;
    code?: string;
}

export const handleApiError = (error: unknown, defaultMessage: string = 'An error occurred') => {
    console.error('API Error:', error);
    
    if (error instanceof Error) {
        Alert.alert('Error', error.message || defaultMessage);
    } else {
        Alert.alert('Error', defaultMessage);
    }
};

export const createAuthHeaders = (token?: string) => ({
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `${token}` } : {}),
});

export const createFormDataHeaders = (token?: string) => ({
    ...(token ? { Authorization: `${token}` } : {}),
});

export const validateResponse = async (response: Response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error: ApiError = new Error(errorData.message || `HTTP error! status: ${response.status}`);
        error.status = response.status;
        error.code = errorData.code;
        throw error;
    }
    return response;
};
