import React from 'react';
import { Alert } from 'react-native';
import { useUpdateProfile } from '@/api/profile.api';
import { handleApiError } from '@/lib/api-utils';
import {
  useFormValidation,
} from '@/hooks/useFormValidation';
import { Screen, Stack } from '@/components/ui/Layout/Layout';
import { LabelText } from '@/components/ui/Text/Text';
import { TextInput } from '@/components/ui/Input/Input';
import { PrimaryButton } from '@/components/ui/Button/Button';
import { type ProfileFormProps } from './ProfileForm.interface';
import { validationRules } from './Profileform.helper'
import { VALIDATION_MESSAGES } from '@/constants/api';


export const ProfileForm: React.FC<ProfileFormProps> = ({
  initialData = { username: '', full_name: '', website: '' },
  onSuccess,
}) => {
  const updateProfileMutation = useUpdateProfile();

  const { formData, errors, updateField, validateAll, hasErrors } =
    useFormValidation(initialData, validationRules);

  const handleSubmit = async () => {
    try {
      if (!validateAll()) {
        return;
      }

      await updateProfileMutation.mutateAsync(formData);
      Alert.alert('Success', VALIDATION_MESSAGES.UPDATE_SUCCESS);
      onSuccess?.();
    } catch (error) {
      handleApiError(error, VALIDATION_MESSAGES.UPDATE_ERROR);
    }
  };

  const isSubmitDisabled = updateProfileMutation.isPending || hasErrors;

  return (
    <Screen padding="lg">
      <Stack spacing="lg">
        <Stack spacing="md">
          <LabelText size="medium" color="textPrimary">
            Username *
          </LabelText>
          <TextInput
            value={formData.username}
            onChangeText={value => updateField('username', value)}
            placeholder="Enter your username"
            autoCapitalize="none"
            disabled={updateProfileMutation.isPending}
            errorText={errors.username}
          />
        </Stack>

        <Stack spacing="md">
          <LabelText size="medium" color="textPrimary">
            Full Name
          </LabelText>
          <TextInput
            value={formData.full_name}
            onChangeText={value => updateField('full_name', value)}
            placeholder="Enter your full name"
            disabled={updateProfileMutation.isPending}
          />
        </Stack>

        <Stack spacing="md">
          <LabelText size="medium" color="textPrimary">
            Website
          </LabelText>
          <TextInput
            value={formData.website}
            onChangeText={value => updateField('website', value)}
            placeholder="https://your-website.com"
            autoCapitalize="none"
            keyboardType="url"
            disabled={updateProfileMutation.isPending}
            errorText={errors.website}
          />
        </Stack>

        <PrimaryButton
          title="Update Profile"
          onPress={handleSubmit}
          disabled={isSubmitDisabled}
          loading={updateProfileMutation.isPending}
          fullWidth
        />
      </Stack>
    </Screen>
  );
};


