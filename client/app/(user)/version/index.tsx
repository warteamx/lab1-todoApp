import React from 'react';
import { useRouter } from 'expo-router';
import { View } from '@/components/ui/View/View';
import { Text } from '@/components/ui/Text/Text';
import { Button } from '@/components/ui/Button/Button';

export default function TabIndex() {
  const router = useRouter();

  return (
    <View flex={1} justifyContent="center" padding="md">
      <Text variant="headlineSmall" color="textPrimary" align="center">
        Version Information
      </Text>
      <Text
        variant="bodyMedium"
        color="textSecondary"
        align="center"
        style={{ marginTop: 8 }}
      >
        App version and component demos
      </Text>

      <View style={{ marginTop: 24 }}>
        <Button
          title="📱 Version Component Demo"
          variant="outline"
          onPress={() => router.push('/(user)/version/demo')}
          fullWidth
        />
      </View>
    </View>
  );
}
