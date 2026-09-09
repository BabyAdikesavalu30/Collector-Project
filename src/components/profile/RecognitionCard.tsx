/**
 * RecognitionCard — achievements, certificates, and milestones summary with
 * navigation to the full screens.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { RecognitionSummary } from '../../features/profile';
import { getBadgeDefinition } from '../../features/achievements';

interface RecognitionCardProps {
  recognition: RecognitionSummary;
  language: SupportedLanguage;
  onOpenAchievements: () => void;
  onOpenCertificates: () => void;
}

export const RecognitionCard: React.FC<RecognitionCardProps> = ({
  recognition,
  language,
  onOpenAchievements,
  onOpenCertificates,
}) => {
  const t = getTranslation(language).progress.profile;

  const topAchievements = recognition.achievements.slice(0, 6);

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{t.recognition.toUpperCase()}</Text>

      <TouchableOpacity style={styles.row} onPress={onOpenAchievements} accessibilityRole="button">
        <View style={styles.iconRow}>
          {topAchievements.length > 0 ? (
            topAchievements.map((a) => (
              <View key={a.badgeId} style={styles.miniBadge}>
                <Text style={styles.miniBadgeIcon}>{getBadgeDefinition(a.badgeId)?.icon || '🏅'}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyIcon}>🏅</Text>
          )}
        </View>
        <View style={styles.rowContent}>
          <Text style={styles.rowLabel}>{t.achievements}</Text>
          <Text style={styles.rowCount}>
            {recognition.achievements.length} • {recognition.milestonesReached.length} {t.milestones.toLowerCase()}
          </Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity style={styles.row} onPress={onOpenCertificates} accessibilityRole="button">
        <View style={styles.iconRow}>
          {recognition.certificates.length > 0 ? (
            recognition.certificates.slice(0, 3).map((cert) => (
              <View key={cert.id} style={styles.miniBadge}>
                <Text style={styles.miniBadgeIcon}>📜</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyIcon}>📜</Text>
          )}
        </View>
        <View style={styles.rowContent}>
          <Text style={styles.rowLabel}>{t.certificates}</Text>
          <Text style={styles.rowCount}>{recognition.certificates.length}</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.overline,
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.navy900,
    letterSpacing: 0.8,
    marginBottom: theme.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  iconRow: {
    flexDirection: 'row',
    width: 96,
    flexWrap: 'wrap',
    gap: 4,
  },
  miniBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: theme.colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniBadgeIcon: {
    fontSize: 13,
  },
  emptyIcon: {
    fontSize: 20,
  },
  rowContent: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  rowLabel: {
    ...theme.typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  rowCount: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.slate500,
    marginTop: 1,
  },
  chevron: {
    fontSize: 18,
    color: theme.colors.slate400,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
  },
});