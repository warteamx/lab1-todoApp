import type { ValidationRules } from '@/hooks/useFormValidation';
import type { UpdateProfileDto } from '@/api/profile.api';
import { VALIDATION_MESSAGES } from '@/constants/api';


export const validationRules: ValidationRules<UpdateProfileDto> = {
  username: [
    {
      validate: value => Boolean(value && value.trim().length > 0),
      message: VALIDATION_MESSAGES.USERNAME_REQUIRED,
    },
    {
      validate: value => Boolean(value && value.trim().length >= 3),
      message: 'Username must be at least 3 characters long',
    },
    {
      validate: value => Boolean(value && /^[a-zA-Z0-9_]+$/.test(value.trim())),
      message: 'Username can only contain letters, numbers, and underscores',
    },
  ],
  website: [
    {
      validate: value =>
        !value || value.trim() === '' || /^https?:\/\/.+/.test(value.trim()),
      message: 'Website must be a valid URL starting with http:// or https://',
    },
  ],
};
