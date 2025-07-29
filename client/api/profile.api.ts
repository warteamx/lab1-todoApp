import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../providers/authProvider';
import { API_CONFIG } from '../constants/api';
import {
  createAuthHeaders,
  createFormDataHeaders,
  validateResponse,
} from '../lib/api-utils';

export type Profile = {
  id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  email?: string;
  website?: string;
  created_at?: string;
};

export type UpdateProfileDto = {
  username?: string;
  full_name?: string;
  website?: string;
};

const API_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PROFILE}`;

async function fetchProfile(userId: string, token?: string): Promise<Profile> {
  const response = await fetch(`${API_URL}/${userId}`, {
    headers: createAuthHeaders(token),
  });
  await validateResponse(response);
  return response.json();
}

async function updateProfile(
  data: UpdateProfileDto,
  token?: string
): Promise<Profile> {
  const response = await fetch(`${API_URL}/profile`, {
    method: 'PUT',
    headers: createAuthHeaders(token),
    body: JSON.stringify(data),
  });
  await validateResponse(response);
  return response.json();
}

async function uploadAvatar(
  file: File | Blob,
  token?: string
): Promise<{ avatar_url: string }> {
  const formData = new FormData();
  formData.append('avatar', file);

  const response = await fetch(`${API_URL}/avatar`, {
    method: 'POST',
    headers: createFormDataHeaders(token),
    body: formData,
  });
  await validateResponse(response);
  return response.json();
}

// React Query Hooks
export function useProfile(userId?: string) {
  const { session } = useAuth();
  const token = session?.access_token;

  return useQuery({
    queryKey: ['profile', userId || session?.user?.id],
    queryFn: () => fetchProfile(userId || session?.user?.id!, token),
    enabled: !!(token && (userId || session?.user?.id)),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });
}

export function useUpdateProfile() {
  const { session } = useAuth();
  const token = session?.access_token;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileDto) => updateProfile(data, token),
    onSuccess: updatedProfile => {
      // Optimistically update the profile cache
      queryClient.setQueryData(['profile', session?.user?.id], updatedProfile);
      // Also invalidate to ensure fresh data on next fetch
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: error => {
      // Invalidate queries to refetch fresh data on error
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}

export function useUploadAvatar() {
  const { session } = useAuth();
  const token = session?.access_token;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File | Blob) => uploadAvatar(file, token),
    onSuccess: result => {
      // Optimistically update the current profile with new avatar URL
      queryClient.setQueryData(
        ['profile', session?.user?.id],
        (oldData: Profile | undefined) =>
          oldData ? { ...oldData, avatar_url: result.avatar_url } : undefined
      );
      // Invalidate to ensure consistency across components
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: error => {
      // Invalidate queries to refetch fresh data on error
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}
