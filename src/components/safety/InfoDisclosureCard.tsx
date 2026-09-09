/**
 * InfoDisclosureCard Component
 * Collapsible info section for privacy, safety, and trust content.
 * Tap to expand/collapse. Respects accessible reading order.
 */

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

interface InfoDisclosureCardProps {
  icon: string;
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  showBorder?: boolean;
}

export const InfoDisclosureCard: React.FC<InfoDisclosureCardProps> = ({
  icon,
  title,
  children,
  defaultExpanded = false,
  showBorder = true,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const toggle = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  return (
    <View
      style={[
        styles.container,
        showBorder && styles.border,
      ]}
    >
      <TouchableOpacity
        style={styles.header}
        onPress={toggle}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        activeOpacity={0.7}
      >
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.chevron}>{expanded ? '▾' : '▸'}</Text>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </View>
  );
};

/** Simple paragraph text for use inside InfoDisclosureCard */
export const InfoText: React.FC<{ children: string }> = ({ children }) => (
  <Text style={styles.bodyText}>{children}</Text>
);

/** A bullet point for use inside InfoDisclosureCard */
export const InfoBullet: React.FC<{ children: string }> = ({ children }) => (
  <View style={styles.bulletRow}>
    <Text style={styles.bullet}>•</Text>
    <Text style={styles.bulletText}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
  },
  border: {
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.base,
    gap: 10,
  },
  icon: {
    fontSize: 18,
  },
  title: {
    flex: 1,
    ...theme.typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  chevron: {
    fontSize: 16,
    color: theme.colors.slate400,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.base,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
    paddingTop: theme.spacing.sm,
  },
  bodyText: {
    ...theme.typography.body,
    fontSize: 13,
    lineHeight: 20,
    color: theme.colors.slate600,
    marginBottom: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
    paddingLeft: 4,
  },
  bullet: {
    fontSize: 13,
    color: theme.colors.slate500,
    lineHeight: 20,
  },
  bulletText: {
    flex: 1,
    ...theme.typography.body,
    fontSize: 13,
    lineHeight: 20,
    color: theme.colors.slate600,
  },
});
