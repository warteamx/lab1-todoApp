import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '../Text/Text';
import { View } from '../View/View';
import {
  VERSION_INFO,
  VERSION_STRING,
} from '../../../constants/version';
import { VersionProps } from './Version.types';

/**
 * Version component that displays application version information
 * Supports multiple display variants and customizable styling
 */
export const Version: React.FC<VersionProps> = ({
  variant = 'minimal',
  style,
  textStyle,
  showBuildDate = false,
  showCommitHash = false,
  showEnvironment = false,
}) => {

  const renderMinimal = () => (
    <Text
      variant="caption"
      color="textSecondary"
      style={[styles.versionText, textStyle]}
    >
      v{VERSION_INFO.version}
    </Text>
  );

  const renderDetailed = () => (
    <View style={[styles.container, style]}>
      <Text
        variant="caption"
        color="textSecondary"
        style={[styles.versionText, textStyle]}
      >
        {VERSION_STRING}
      </Text>
      {showBuildDate && (
        <Text
          variant="caption"
          color="textTertiary"
          style={[styles.buildText, textStyle]}
        >
          {new Date(VERSION_INFO.buildDate).toLocaleDateString()}
        </Text>
      )}
      {showCommitHash && VERSION_INFO.commitHash !== 'unknown' && (
        <Text
          variant="caption"
          color="textTertiary"
          style={[styles.commitText, textStyle]}
        >
          {VERSION_INFO.commitHash}
        </Text>
      )}
      {showEnvironment && (
        <Text
          variant="caption"
          color="textTertiary"
          style={[styles.envText, textStyle]}
        >
          {VERSION_INFO.environment}
        </Text>
      )}
    </View>
  );

  const renderDebug = () => (
    <View style={[styles.debugContainer, style]}>
      <Text
        variant="labelSmall"
        color="textSecondary"
        style={[styles.debugTitle, textStyle]}
      >
        Version Information
      </Text>

      <View style={styles.debugRow}>
        <Text variant="caption" color="textTertiary" style={styles.debugLabel}>
          Version:
        </Text>
        <Text variant="caption" color="textPrimary" style={styles.debugValue}>
          v{VERSION_INFO.version}
        </Text>
      </View>

      <View style={styles.debugRow}>
        <Text variant="caption" color="textTertiary" style={styles.debugLabel}>
          Build:
        </Text>
        <Text variant="caption" color="textPrimary" style={styles.debugValue}>
          #{VERSION_INFO.buildNumber}
        </Text>
      </View>

      <View style={styles.debugRow}>
        <Text variant="caption" color="textTertiary" style={styles.debugLabel}>
          Date:
        </Text>
        <Text variant="caption" color="textPrimary" style={styles.debugValue}>
          {new Date(VERSION_INFO.buildDate).toLocaleString()}
        </Text>
      </View>

      {VERSION_INFO.commitHash !== 'unknown' && (
        <View style={styles.debugRow}>
          <Text variant="caption" color="textTertiary" style={styles.debugLabel}>
            Commit:
          </Text>
          <Text variant="caption" color="textPrimary" style={styles.debugValue}>
            {VERSION_INFO.commitHash}
          </Text>
        </View>
      )}

      <View style={styles.debugRow}>
        <Text variant="caption" color="textTertiary" style={styles.debugLabel}>
          Environment:
        </Text>
        <Text
          variant="caption"
          color={VERSION_INFO.environment === 'production' ? 'success' : 'warning'}
          style={styles.debugValue}
        >
          {VERSION_INFO.environment}
        </Text>
      </View>
    </View>
  );

  switch (variant) {
    case 'detailed':
      return renderDetailed();
    case 'debug':
      return renderDebug();
    case 'minimal':
    default:
      return renderMinimal();
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 4,
  },
  versionText: {
    textAlign: 'center',
  },
  buildText: {
    fontSize: 10,
    textAlign: 'center',
  },
  commitText: {
    fontSize: 10,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  envText: {
    fontSize: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  debugContainer: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: 'rgba(0,0,0,0.02)',
    gap: 8,
  },
  debugTitle: {
    marginBottom: 4,
    textAlign: 'center',
  },
  debugRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  debugLabel: {
    flex: 1,
    fontSize: 11,
  },
  debugValue: {
    flex: 2,
    fontSize: 11,
    textAlign: 'right',
    fontFamily: 'monospace',
  },
});
