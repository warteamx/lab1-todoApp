import { useState, useCallback } from 'react';

export interface ValidationRule<T> {
  validate: (value: T) => boolean;
  message: string;
}

export interface ValidationRules<T> {
  [key: string]: ValidationRule<T[keyof T]>[];
}

export function useFormValidation<T extends Record<string, any>>(
  initialData: T,
  validationRules: ValidationRules<T>
) {
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const updateField = useCallback(
    (field: keyof T, value: T[keyof T]) => {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));

      // Clear error for this field when user starts typing
      if (errors[field]) {
        setErrors(prev => ({
          ...prev,
          [field]: undefined,
        }));
      }
    },
    [errors]
  );

  const validateField = useCallback(
    (field: keyof T): boolean => {
      const fieldRules = validationRules[field as string];
      if (!fieldRules) return true;

      const value = formData[field];
      for (const rule of fieldRules) {
        if (!rule.validate(value)) {
          setErrors(prev => ({
            ...prev,
            [field]: rule.message,
          }));
          return false;
        }
      }

      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
      return true;
    },
    [formData, validationRules]
  );

  const validateAll = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(validationRules).forEach(field => {
      const fieldRules = validationRules[field];
      const value = formData[field as keyof T];

      for (const rule of fieldRules) {
        if (!rule.validate(value)) {
          newErrors[field as keyof T] = rule.message;
          isValid = false;
          break;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formData, validationRules]);

  const resetForm = useCallback(() => {
    setFormData(initialData);
    setErrors({});
  }, [initialData]);

  return {
    formData,
    errors,
    updateField,
    validateField,
    validateAll,
    resetForm,
    hasErrors: Object.keys(errors).some(key => errors[key as keyof T]),
  };
}
