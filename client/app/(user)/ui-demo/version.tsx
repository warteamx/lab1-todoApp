import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { View, Text, Version } from '../../../components/ui';
import { useTheme } from '../../../providers/themeProvider';

/**
 * Version demo screen showcasing different Version component variants
 */
export default function VersionDemoScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text variant="titleLarge" style={styles.title}>
          Version Component Demo
        </Text>

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Minimal Version
          </Text>
          <View style={styles.demoBox}>
            <Version variant="minimal" />
          </View>
        </View>

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Detailed Version
          </Text>
          <View style={styles.demoBox}>
            <Version
              variant="detailed"
              showBuildDate={true}
              showEnvironment={true}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Debug Version
          </Text>
          <View style={styles.demoBox}>
            <Version
              variant="debug"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Custom Styled
          </Text>
          <View style={[styles.demoBox, styles.customBox]}>
            <Version
              variant="detailed"
              showBuildDate={true}
              showCommitHash={true}
              showEnvironment={true}
              style={styles.customVersion}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  demoBox: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: 'rgba(0,0,0,0.02)',
    alignItems: 'center',
  },
  customBox: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  customVersion: {
    padding: 8,
  },
});
