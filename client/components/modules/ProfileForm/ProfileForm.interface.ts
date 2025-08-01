
import { type UpdateProfileDto } from '@/api/profile.api';

export interface ProfileFormProps {
  initialData?: UpdateProfileDto;
  onSuccess?: () => void;
}
