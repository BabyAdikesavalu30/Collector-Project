/**
 * ExperimentCard Component
 * Reusable experiment card supporting standard, featured, and compact variants.
 * Displays subject badge, hero icon, title, description, duration, difficulty, and completion status.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { colors } from '../../theme/colors';
import { Experiment, ExperimentProgress } from '../../features/experiment-lab/experiment.types';
import { EXPERIMENT_SUBJECTS } from '../../features/experiment-lab/experiment.data';
import { SupportedLanguage } from '../../config/i18n';

interface ExperimentCardProps {
  experiment: Experiment;
  progress?: ExperimentProgress;
  isBookmarked?: boolean;
  language?: SupportedLanguage;
  variant?: 'standard' | 'featured' | 'compact';
  onPress: (id: string) => void;
  onBookmarkToggle?: (id: string) => void;
}

export const ExperimentCard: React.FC<ExperimentCardProps> = ({
  experiment,
  progress,
  isBookmarked = false,
  language = 'en',
  variant = 'standard',
  onPress,
  onBookmarkToggle,
}) => {
  const isTamil = language === 'ta';
  const title = isTamil ? experiment.title.ta : experiment.title.en;
  const subtitle = isTamil ? experiment.subtitle.ta : experiment.subtitle.en;
  const description = isTamil ? experiment.description.ta : experiment.description.en;

  const subjectMeta = EXPERIMENT_SUBJECTS.find((s) => s.id === experiment.subject) || EXPERIMENT_SUBJECTS[0];
  const subjectName = isTamil ? subjectMeta.title.ta : subjectMeta.title.en;

  const isCompleted = progress?.completed ?? false;
  const inProgress = progress?.status === 'in_progress' && !isCompleted;

  const difficultyLabels = {
    easy: isTamil ? 'எளிது' : 'Easy',
    medium: isTamil ? 'நடுத்தரம்' : 'Medium',
    hard: isTamil ? 'மேம்பட்டது' : 'Advanced',
  };

  // ── 1. FEATURED VARIANT ───────────────────────────────────────────────────
  if (variant === 'featured') {
    return (
      <TouchableOpacity
        style={styles.featuredCard}
        onPress={() => onPress(experiment.id)}
        activeOpacity={0.9}
        accessibilityRole="button"
        accessibilityLabel={`Featured experiment: ${title}`}
      >
        <View style={styles.featuredHeader}>
          <View style={styles.subjectRow}>
            <Text style={styles.subjectIcon}>{subjectMeta.icon}</Text>
            <Text style={styles.subjectText}>{subjectName.toUpperCase()}</Text>
          </View>
          <View style={styles.xpBadge}>
            <Text style={styles.xpBadgeText}>+{experiment.xpReward || 25} XP</Text>
          </View>
        </View>

        <View style={styles.featuredBody}>
          <View style={styles.featuredHeroCircle}>
            <Text style={styles.featuredHeroAsset}>{experiment.heroAsset || '🧪'}</Text>
          </View>
          <View style={styles.featuredTextCol}>
            <Text style={styles.featuredTitle} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.featuredSubtitle} numberOfLines={2}>
              {subtitle}
            </Text>
          </View>
        </View>

        <View style={styles.featuredFooter}>
          <View style={styles.metaRow}>
            <Text style={styles.metaBadge}>⏱️ {experiment.durationMinutes} min</Text>
            <Text style={styles.metaBadge}>🎯 {difficultyLabels[experiment.difficulty]}</Text>
          </View>

          <View style={styles.exploreButton}>
            <Text style={styles.exploreButtonText}>
              {isCompleted
                ? isTamil
                  ? 'மீண்டும் இயக்குக →'
                  : 'Run Again →'
                : isTamil
                ? 'பரிசோதிக்க →'
                : 'Explore Lab →'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // ── 2. COMPACT VARIANT ───────────────────────────────────────────────────
  if (variant === 'compact') {
    return (
      <TouchableOpacity
        style={styles.compactCard}
        onPress={() => onPress(experiment.id)}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel={`Experiment: ${title}`}
      >
        <View style={styles.compactIconCircle}>
          <Text style={styles.compactIcon}>{experiment.heroAsset || '🧪'}</Text>
        </View>
        <View style={styles.compactTextCol}>
          <Text style={styles.compactTitle} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.compactSub} numberOfLines={1}>
            {subjectName} · {experiment.durationMinutes} min
          </Text>
        </View>
        <Text style={styles.compactArrow}>→</Text>
      </TouchableOpacity>
    );
  }

  // ── 3. STANDARD VARIANT ──────────────────────────────────────────────────
  return (
    <TouchableOpacity
      style={[styles.standardCard, isCompleted && styles.standardCardCompleted]}
      onPress={() => onPress(experiment.id)}
      activeOpacity={0.88}
      accessibilityRole="button"
      accessibilityLabel={`Experiment: ${title}. Subject: ${subjectName}. Duration: ${experiment.durationMinutes} minutes.`}
    >
      <View style={styles.standardHeader}>
        <View style={styles.subjectRow}>
          <Text style={styles.subjectIconSmall}>{subjectMeta.icon}</Text>
          <Text style={[styles.subjectTextSmall, { color: subjectMeta.color }]}>
            {subjectName.toUpperCase()}
          </Text>
        </View>

        {/* Bookmark Button */}
        {onBookmarkToggle && (
          <TouchableOpacity
            style={styles.bookmarkBtn}
            onPress={(e) => {
              e.stopPropagation();
              onBookmarkToggle(experiment.id);
            }}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={isBookmarked ? 'Remove bookmark' : 'Bookmark experiment'}
          >
            <Text style={styles.bookmarkIcon}>{isBookmarked ? '🔖' : '☆'}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.standardBody}>
        <View style={styles.standardIconBox}>
          <Text style={styles.standardHeroIcon}>{experiment.heroAsset || '🧪'}</Text>
        </View>
        <View style={styles.standardTextCol}>
          <Text style={styles.standardTitle} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.standardDesc} numberOfLines={2}>
            {description}
          </Text>
        </View>
      </View>

      <View style={styles.standardFooter}>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>⏱️ {experiment.durationMinutes} min</Text>
          <Text style={styles.metaText}>• {difficultyLabels[experiment.difficulty]}</Text>
        </View>

        {isCompleted ? (
          <View style={styles.statusBadgeCompleted}>
            <Text style={styles.statusCompletedText}>{isTamil ? '✓ முடிந்தது' : '✓ Completed'}</Text>
          </View>
        ) : inProgress ? (
          <View style={styles.statusBadgeProgress}>
            <Text style={styles.statusProgressText}>{isTamil ? 'தொடர்க' : 'In Progress'}</Text>
          </View>
        ) : (
          <View style={styles.exploreSmallBtn}>
            <Text style={styles.exploreSmallText}>{isTamil ? 'ஆராய்க →' : 'Explore →'}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  featuredCard: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 18,
    marginVertical: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.18,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  subjectIcon: {
    fontSize: 16,
  },
  subjectText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#93C5FD',
    letterSpacing: 0.8,
  },
  xpBadge: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  xpBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#38BDF8',
  },
  featuredBody: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 14,
  },
  featuredHeroCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  featuredHeroAsset: {
    fontSize: 32,
  },
  featuredTextCol: {
    flex: 1,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 4,
  },
  featuredSubtitle: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 18,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaBadge: {
    fontSize: 11,
    color: '#CBD5E1',
    fontWeight: '600',
  },
  exploreButton: {
    backgroundColor: colors.blue600,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  exploreButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '800',
  },
  standardCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 14,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  standardCardCompleted: {
    borderColor: '#BBF7D0',
    backgroundColor: '#FBFDFB',
  },
  standardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  subjectIconSmall: {
    fontSize: 13,
  },
  subjectTextSmall: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  bookmarkBtn: {
    padding: 4,
  },
  bookmarkIcon: {
    fontSize: 18,
  },
  standardBody: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  standardIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  standardHeroIcon: {
    fontSize: 24,
  },
  standardTextCol: {
    flex: 1,
  },
  standardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.navy900,
    marginBottom: 4,
  },
  standardDesc: {
    fontSize: 12,
    color: colors.slate600,
    lineHeight: 16,
  },
  standardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  metaText: {
    fontSize: 11,
    color: colors.slate500,
    fontWeight: '500',
  },
  statusBadgeCompleted: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusCompletedText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.green700,
  },
  statusBadgeProgress: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusProgressText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.blue600,
  },
  exploreSmallBtn: {
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  exploreSmallText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.blue600,
  },
  compactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginVertical: 4,
  },
  compactIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  compactIcon: {
    fontSize: 18,
  },
  compactTextCol: {
    flex: 1,
  },
  compactTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.navy900,
  },
  compactSub: {
    fontSize: 11,
    color: colors.slate500,
  },
  compactArrow: {
    fontSize: 16,
    color: colors.blue600,
    fontWeight: '700',
    marginLeft: 6,
  },
});
