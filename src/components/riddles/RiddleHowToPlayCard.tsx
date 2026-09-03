/**
 * RiddleHowToPlayCard Component
 * Compact informational card explaining riddle gameplay rules.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface RiddleHowToPlayCardProps {
  title: string;
  body: string;
}

export const RiddleHowToPlayCard: React.FC<RiddleHowToPlayCardProps> = ({
  title,
  body,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>💡</Text>
      </View>
      <View style={styles.textGroup}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.warningBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  icon: {
    fontSize: 18,
  },
  textGroup: {
    flex: 1,
  },
  title: {
    ...theme.typography.caption,
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginBottom: 2,
  },
  body: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate600,
    lineHeight: 17,
  },
});
