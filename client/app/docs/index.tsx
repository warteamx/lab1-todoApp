// Documentation index page - list of all available docs

import React from 'react';
import { FlatList, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/providers/themeProvider';
import { View } from '@/components/ui/View/View';
import { Text } from '@/components/ui/Text/Text';
import { Card } from '@/components/ui/Card/Card';
import { Inline } from '@/components/ui/Layout/Layout';
import { getDocsList } from '@/lib/docs-utils';

export default function DocsIndexPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const docsList = getDocsList();

  const handleDocPress = (docId: string) => {
    router.push(`/docs/${docId}` as any);
  };

  const renderDocItem = ({
    item,
  }: {
    item: ReturnType<typeof getDocsList>[0];
  }) => (
    <TouchableOpacity
      onPress={() => handleDocPress(item.id)}
      style={{
        marginBottom: theme.spacing.md,
      }}
      activeOpacity={0.7}
    >
      <Card
        padding="lg"
        shadow="sm"
        style={{
          borderWidth: 1,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.surface,
        }}
      >
        <Inline justify="space-between" align="center">
          <View style={{ flex: 1 }}>
            <Text
              variant="titleMedium"
              color="textPrimary"
              style={{ marginBottom: theme.spacing.xs }}
            >
              {item.emoji} {item.title}
            </Text>
            <Text variant="bodySmall" color="textSecondary">
              {item.filename}
            </Text>
          </View>

          <Text
            variant="titleMedium"
            color="interactive"
            style={{ marginLeft: theme.spacing.md }}
          >
            →
          </Text>
        </Inline>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View backgroundColor="background" style={{ flex: 1 }}>
      <FlatList
        data={docsList}
        renderItem={renderDocItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          padding: theme.spacing.lg,
          paddingBottom: theme.spacing.xl * 2,
        }}
        showsVerticalScrollIndicator={Platform.OS !== 'web'}
        ListHeaderComponent={
          <View style={{ marginBottom: theme.spacing.lg }}>
            <Text
              variant="headlineSmall"
              color="textPrimary"
              style={{
                marginBottom: theme.spacing.sm,
                textAlign: 'center',
              }}
            >
              📚 Documentation
            </Text>
            <Text
              variant="bodyMedium"
              color="textSecondary"
              style={{
                textAlign: 'center',
                marginBottom: theme.spacing.lg,
              }}
            >
              Browse through our app guides, architecture docs, and feature
              explanations.
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: theme.spacing.xl * 2,
            }}
          >
            <Text variant="titleMedium" color="textSecondary">
              📄 No documentation found
            </Text>
            <Text
              variant="bodyMedium"
              color="textSecondary"
              style={{ marginTop: theme.spacing.sm, textAlign: 'center' }}
            >
              Documentation files will appear here when available.
            </Text>
          </View>
        }
      />
    </View>
  );
}
