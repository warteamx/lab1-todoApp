import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { useUpdateProfile, type UpdateProfileDto } from '@/api/profile.api';
import { VALIDATION_MESSAGES } from '@/constants/api';
import { handleApiError } from '@/lib/api-utils';
import { useFormValidation, type ValidationRules } from '@/hooks/useFormValidation';

interface ProfileFormProps {
    initialData?: UpdateProfileDto;
    onSuccess?: () => void;
}

const validationRules: ValidationRules<UpdateProfileDto> = {
    username: [
        {
            validate: (value) => Boolean(value && value.trim().length > 0),
            message: VALIDATION_MESSAGES.USERNAME_REQUIRED,
        },
        {
            validate: (value) => Boolean(value && value.trim().length >= 3),
            message: 'Username must be at least 3 characters long',
        },
        {
            validate: (value) => Boolean(value && /^[a-zA-Z0-9_]+$/.test(value.trim())),
            message: 'Username can only contain letters, numbers, and underscores',
        },
    ],
    website: [
        {
            validate: (value) => !value || value.trim() === '' || /^https?:\/\/.+/.test(value.trim()),
            message: 'Website must be a valid URL starting with http:// or https://',
        },
    ],
};

export const ProfileForm: React.FC<ProfileFormProps> = ({ 
    initialData = { username: '', full_name: '', website: '' }, 
    onSuccess 
}) => {
    const updateProfileMutation = useUpdateProfile();
    
    const {
        formData,
        errors,
        updateField,
        validateAll,
        hasErrors,
    } = useFormValidation(initialData, validationRules);

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
        <ScrollView style={styles.container}>
            <View style={styles.form}>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Username *</Text>
                    <TextInput
                        style={[styles.input, errors.username && styles.inputError]}
                        value={formData.username}
                        onChangeText={(value) => updateField('username', value)}
                        placeholder="Enter your username"
                        autoCapitalize="none"
                        editable={!updateProfileMutation.isPending}
                    />
                    {errors.username && (
                        <Text style={styles.errorText}>{errors.username}</Text>
                    )}
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.full_name}
                        onChangeText={(value) => updateField('full_name', value)}
                        placeholder="Enter your full name"
                        editable={!updateProfileMutation.isPending}
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Website</Text>
                    <TextInput
                        style={[styles.input, errors.website && styles.inputError]}
                        value={formData.website}
                        onChangeText={(value) => updateField('website', value)}
                        placeholder="https://your-website.com"
                        autoCapitalize="none"
                        keyboardType="url"
                        editable={!updateProfileMutation.isPending}
                    />
                    {errors.website && (
                        <Text style={styles.errorText}>{errors.website}</Text>
                    )}
                </View>

                <TouchableOpacity
                    style={[
                        styles.submitButton,
                        isSubmitDisabled && styles.submitButtonDisabled,
                    ]}
                    onPress={handleSubmit}
                    disabled={isSubmitDisabled}
                >
                    {updateProfileMutation.isPending ? (
                        <ActivityIndicator color="#white" />
                    ) : (
                        <Text style={styles.submitButtonText}>Update Profile</Text>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        padding: 20,
    },
    fieldContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    inputError: {
        borderColor: '#FF3B30',
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 14,
        marginTop: 4,
    },
    submitButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonDisabled: {
        backgroundColor: '#ccc',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
