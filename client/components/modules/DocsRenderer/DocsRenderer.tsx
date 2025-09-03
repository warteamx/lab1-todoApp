// DocsRenderer component for rendering markdown with theme support

import React from 'react';
import { ScrollView, Platform } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { useTheme } from '@/providers/themeProvider';
import { View } from '../../ui/View/View';
import { Text } from '../../ui/Text/Text';

interface DocsRendererProps {
  content: string;
  title?: string;
}

export const DocsRenderer: React.FC<DocsRendererProps> = ({ content, title }) => {
  const { theme } = useTheme();

  // Create markdown styles that follow the app theme
  const markdownStyles = {
    body: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.body.medium.fontSize,
      lineHeight: theme.typography.body.medium.lineHeight,
      fontFamily: Platform.OS === 'web' ? 'system-ui, -apple-system' : undefined,
    },
    heading1: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.display.small.fontSize,
      fontWeight: theme.typography.display.small.fontWeight,
      marginBottom: theme.spacing.lg,
      marginTop: theme.spacing.xl,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      paddingBottom: theme.spacing.sm,
    },
    heading2: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.headline.large.fontSize,
      fontWeight: theme.typography.headline.large.fontWeight,
      marginBottom: theme.spacing.md,
      marginTop: theme.spacing.lg,
    },
    heading3: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.headline.medium.fontSize,
      fontWeight: theme.typography.headline.medium.fontWeight,
      marginBottom: theme.spacing.sm,
      marginTop: theme.spacing.md,
    },
    heading4: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.headline.small.fontSize,
      fontWeight: theme.typography.headline.small.fontWeight,
      marginBottom: theme.spacing.sm,
      marginTop: theme.spacing.md,
    },
    heading5: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.title.large.fontSize,
      fontWeight: theme.typography.title.large.fontWeight,
      marginBottom: theme.spacing.xs,
      marginTop: theme.spacing.sm,
    },
    heading6: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.title.medium.fontSize,
      fontWeight: theme.typography.title.medium.fontWeight,
      marginBottom: theme.spacing.xs,
      marginTop: theme.spacing.sm,
    },
    paragraph: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.body.medium.fontSize,
      lineHeight: theme.typography.body.medium.lineHeight,
      marginBottom: theme.spacing.md,
    },
    strong: {
      color: theme.colors.textPrimary,
      fontWeight: '600' as const,
    },
    em: {
      color: theme.colors.textSecondary,
      fontStyle: 'italic' as const,
    },
    link: {
      color: theme.colors.interactive,
      textDecorationLine: 'underline' as const,
    },
    code_inline: {
      backgroundColor: theme.colors.neutral100,
      color: theme.colors.interactive,
      padding: theme.spacing.xs,
      borderRadius: theme.borderRadius.sm,
      fontFamily: Platform.OS === 'web' ? 'Monaco, Menlo, monospace' : 'monospace',
      fontSize: theme.typography.label.medium.fontSize,
    },
    code_block: {
      backgroundColor: theme.colors.neutral100,
      color: theme.colors.textPrimary,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      marginVertical: theme.spacing.md,
      fontFamily: Platform.OS === 'web' ? 'Monaco, Menlo, monospace' : 'monospace',
      fontSize: theme.typography.label.medium.fontSize,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    fence: {
      backgroundColor: theme.colors.neutral100,
      color: theme.colors.textPrimary,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      marginVertical: theme.spacing.md,
      fontFamily: Platform.OS === 'web' ? 'Monaco, Menlo, monospace' : 'monospace',
      fontSize: theme.typography.label.medium.fontSize,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    blockquote: {
      backgroundColor: theme.colors.neutral50,
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.interactive,
      padding: theme.spacing.md,
      marginVertical: theme.spacing.md,
      borderRadius: theme.borderRadius.sm,
    },
    list_item: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.body.medium.fontSize,
      lineHeight: theme.typography.body.medium.lineHeight,
      marginBottom: theme.spacing.xs,
    },
    bullet_list: {
      marginBottom: theme.spacing.md,
    },
    ordered_list: {
      marginBottom: theme.spacing.md,
    },
    hr: {
      backgroundColor: theme.colors.border,
      height: 1,
      marginVertical: theme.spacing.lg,
    },
    table: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.sm,
      marginVertical: theme.spacing.md,
      overflow: 'hidden' as const,
    },
    thead: {
      backgroundColor: theme.colors.neutral100,
    },
    tbody: {
      backgroundColor: theme.colors.surface,
    },
    th: {
      padding: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      fontWeight: '600',
      color: theme.colors.textPrimary,
    },
    td: {
      padding: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      color: theme.colors.textPrimary,
    },
    tr: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
  };

  return (
    <View backgroundColor="background" style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: theme.spacing.lg,
          paddingBottom: theme.spacing.xl * 2,
        }}
        showsVerticalScrollIndicator={Platform.OS !== 'web'}
      >
        {title && (
          <Text
            variant="displaySmall"
            color="textPrimary"
            style={{
              marginBottom: theme.spacing.lg,
              textAlign: 'center',
            }}
          >
            {title}
          </Text>
        )}

        <Markdown style={markdownStyles}>
          {content}
        </Markdown>
      </ScrollView>
    </View>
  );
};
