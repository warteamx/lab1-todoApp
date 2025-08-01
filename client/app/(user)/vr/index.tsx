import { View } from '@/components/ui/View/View';
import { Text } from '@/components/ui/Text/Text';

export default function TabIndex() {
  return (
    <View flex={1} justifyContent="center" padding="md">
      <Text variant="headlineSmall" color="textPrimary" align="center">
        VR Experience
      </Text>
      <Text
        variant="bodyMedium"
        color="textSecondary"
        align="center"
        style={{ marginTop: 8 }}
      >
        Coming soon...
      </Text>
    </View>
  );
}
