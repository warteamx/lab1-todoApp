// Dynamic route for individual documentation pages

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '@/providers/themeProvider';
import { View } from '@/components/ui/View/View';
import { Text } from '@/components/ui/Text/Text';
import { Button } from '@/components/ui/Button/Button';
import { DocsRenderer } from '@/components/modules/DocsRenderer';
import { getDocById, loadDocContent } from '@/lib/docs-utils';

export default function DocPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const docInfo = slug ? getDocById(slug) : null;

  useEffect(() => {
    const loadDoc = async () => {
      if (!docInfo) {
        setError('Document not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // For now, we'll load a simple message since the markdown files
        // might not be properly importable yet
        const docContent = await loadDocContent(docInfo.filename);
        setContent(docContent);
      } catch (err) {
        console.error('Error loading document:', err);
        setError('Failed to load document');
      } finally {
        setLoading(false);
      }
    };

    loadDoc();
  }, [docInfo]);

  // Loading state
  if (loading) {
    return (
      <View
        backgroundColor="background"
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: theme.spacing.lg,
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.interactive} />
        <Text
          variant="bodyMedium"
          color="textSecondary"
          style={{ marginTop: theme.spacing.md, textAlign: 'center' }}
        >
          Loading documentation...
        </Text>
      </View>
    );
  }

  // Error state
  if (error || !docInfo) {
    return (
      <View
        backgroundColor="background"
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: theme.spacing.lg,
        }}
      >
        <Text
          variant="headlineSmall"
          color="error"
          style={{ marginBottom: theme.spacing.md, textAlign: 'center' }}
        >
          📄 Document Not Found
        </Text>
        <Text
          variant="bodyMedium"
          color="textSecondary"
          style={{ marginBottom: theme.spacing.lg, textAlign: 'center' }}
        >
          {error || 'The requested document could not be found.'}
        </Text>
        <Button
          title="← Back to Documentation"
          variant="primary"
          onPress={() => router.back()}
        />
      </View>
    );
  }

  // Success state - render the document
  return (
    <DocsRenderer
      content={content}
      title={docInfo.title}
    />
  );
}
