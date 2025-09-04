// Demo screen to showcase all the new UI components and themes

import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/providers/themeProvider';
import { View } from '@/components/ui/View/View';
import { Text } from '@/components/ui/Text/Text';
import { Button } from '@/components/ui/Button/Button';
import { TextInput } from '@/components/ui/Input/Input';
import { Card } from '@/components/ui/Card/Card';
import { Stack, Inline, Section } from '@/components/ui/Layout/Layout';

export default function ThemeDemoScreen() {
  const { setThemeVariant, themeVariant } = useTheme();
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const themeVariants: ('modern' | 'dark' | 'warm' | 'cool')[] = [
    'modern',
    'dark',
    'warm',
    'cool',
  ];

  return (
    <View flex={1} backgroundColor="background">
      <ScrollView style={{ flex: 1 }}>
        <View padding="lg">
          <Stack spacing="xl">
            {/* Navigation */}
            <Section
              title="UI Components Demo"
              subtitle="Explore components and version information"
            >
              <Button
                title="📱 Version Component Demo"
                variant="outline"
                onPress={() => router.push('/(user)/ui-demo/version')}
                fullWidth
              />
            </Section>

            {/* Theme Switcher */}
            <Section
              title="Themes"
              subtitle="Switch between different theme variants"
            >
              <Inline spacing="sm" wrap>
                {themeVariants.map(variant => (
                  <Button
                    key={variant}
                    title={variant.charAt(0).toUpperCase() + variant.slice(1)}
                    variant={themeVariant === variant ? 'primary' : 'outline'}
                    size="small"
                    onPress={() => setThemeVariant(variant)}
                  />
                ))}
              </Inline>
            </Section>

            {/* Typography */}
            <Section title="Typography" subtitle="Text hierarchy and styles">
              <Stack spacing="md">
                <Text variant="displayLarge">Display Large</Text>
                <Text variant="displayMedium">Display Medium</Text>
                <Text variant="headlineLarge">Headline Large</Text>
                <Text variant="headlineMedium">Headline Medium</Text>
                <Text variant="titleLarge">Title Large</Text>
                <Text variant="titleMedium">Title Medium</Text>
                <Text variant="bodyLarge">
                  Body Large - This is regular body text that you would use for
                  paragraphs and longer content.
                </Text>
                <Text variant="bodyMedium">
                  Body Medium - Standard body text size
                </Text>
                <Text variant="labelLarge">Label Large</Text>
                <Text variant="caption">Caption text for smaller details</Text>
                <Text variant="overline">OVERLINE TEXT</Text>
              </Stack>
            </Section>

            {/* Colors */}
            <Section title="Colors" subtitle="Color palette showcase">
              <Stack spacing="sm">
                <Inline spacing="sm" wrap>
                  <View
                    padding="md"
                    backgroundColor="primary500"
                    borderRadius="md"
                  >
                    <Text color="textOnPrimary">Primary</Text>
                  </View>
                  <View
                    padding="md"
                    backgroundColor="secondary500"
                    borderRadius="md"
                  >
                    <Text color="textOnSecondary">Secondary</Text>
                  </View>
                  <View
                    padding="md"
                    backgroundColor="success"
                    borderRadius="md"
                  >
                    <Text color="textOnPrimary">Success</Text>
                  </View>
                  <View
                    padding="md"
                    backgroundColor="warning"
                    borderRadius="md"
                  >
                    <Text color="textOnPrimary">Warning</Text>
                  </View>
                  <View padding="md" backgroundColor="error" borderRadius="md">
                    <Text color="textOnPrimary">Error</Text>
                  </View>
                </Inline>
              </Stack>
            </Section>

            {/* Buttons */}
            <Section
              title="Buttons"
              subtitle="Different button variants and sizes"
            >
              <Stack spacing="md">
                <View>
                  <Text variant="titleSmall" style={{ marginBottom: 8 }}>
                    Variants
                  </Text>
                  <Inline spacing="sm" wrap>
                    <Button title="Primary" variant="primary" />
                    <Button title="Secondary" variant="secondary" />
                    <Button title="Outline" variant="outline" />
                    <Button title="Ghost" variant="ghost" />
                    <Button title="Danger" variant="danger" />
                  </Inline>
                </View>

                <View>
                  <Text variant="titleSmall" style={{ marginBottom: 8 }}>
                    Sizes
                  </Text>
                  <Stack spacing="sm">
                    <Button title="Large Button" size="large" fullWidth />
                    <Button title="Medium Button" size="medium" fullWidth />
                    <Button title="Small Button" size="small" fullWidth />
                  </Stack>
                </View>

                <View>
                  <Text variant="titleSmall" style={{ marginBottom: 8 }}>
                    States
                  </Text>
                  <Inline spacing="sm" wrap>
                    <Button title="Normal" variant="primary" />
                    <Button title="Loading" variant="primary" loading />
                    <Button title="Disabled" variant="primary" disabled />
                  </Inline>
                </View>
              </Stack>
            </Section>

            {/* Inputs */}
            <Section title="Inputs" subtitle="Form input components">
              <Stack spacing="md">
                <TextInput
                  label="Outline Input"
                  placeholder="Enter text..."
                  variant="outline"
                  value={inputValue}
                  onChangeText={setInputValue}
                />

                <TextInput
                  label="Filled Input"
                  placeholder="Enter text..."
                  variant="filled"
                  helperText="This is helper text"
                />

                <TextInput
                  label="Input with Error"
                  placeholder="Enter text..."
                  variant="outline"
                  errorText="This field is required"
                />

                <TextInput
                  label="Disabled Input"
                  placeholder="Disabled..."
                  variant="outline"
                  disabled
                />
              </Stack>
            </Section>

            {/* Cards */}
            <Section title="Cards" subtitle="Content containers">
              <Stack spacing="md">
                <Card variant="elevated">
                  <Text variant="titleMedium">Elevated Card</Text>
                  <Text variant="bodyMedium" style={{ marginTop: 8 }}>
                    This card has a shadow for depth and hierarchy.
                  </Text>
                </Card>

                <Card variant="outlined">
                  <Text variant="titleMedium">Outlined Card</Text>
                  <Text variant="bodyMedium" style={{ marginTop: 8 }}>
                    This card has a border instead of shadow.
                  </Text>
                </Card>

                <Card variant="filled">
                  <Text variant="titleMedium">Filled Card</Text>
                  <Text variant="bodyMedium" style={{ marginTop: 8 }}>
                    This card has a different background color.
                  </Text>
                </Card>
              </Stack>
            </Section>

            {/* Spacing */}
            <Section title="Spacing" subtitle="Consistent spacing system">
              <Stack spacing="md">
                <View>
                  <Text variant="titleSmall" style={{ marginBottom: 8 }}>
                    Spacing Scale
                  </Text>
                  <Stack spacing="xs">
                    <View
                      backgroundColor="primary200"
                      padding="xs"
                      borderRadius="sm"
                    >
                      <Text variant="bodySmall">XS Padding</Text>
                    </View>
                    <View
                      backgroundColor="primary300"
                      padding="sm"
                      borderRadius="sm"
                    >
                      <Text variant="bodySmall">SM Padding</Text>
                    </View>
                    <View
                      backgroundColor="primary400"
                      padding="md"
                      borderRadius="sm"
                    >
                      <Text variant="bodySmall">MD Padding</Text>
                    </View>
                    <View
                      backgroundColor="primary500"
                      padding="lg"
                      borderRadius="sm"
                    >
                      <Text variant="bodySmall" color="textOnPrimary">
                        LG Padding
                      </Text>
                    </View>
                  </Stack>
                </View>
              </Stack>
            </Section>
          </Stack>
        </View>
      </ScrollView>
    </View>
  );
}
