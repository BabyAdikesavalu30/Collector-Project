/**
 * ConceptMapCard Component
 * Displays a concept map preview with subject badge, node count, connection count,
 * exploration progress indicator, and bookmark button.
 * Supports standard, featured, and compact layout variants.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { theme } from '../../theme';
import {
  ConceptMap,
  ConceptMapProgress,
} from '../../features/concept-maps/conceptMaps.types';
import {
  CONCEPT_SUBJECT_THEMES,
} from '../../features/concept-maps/conceptMaps.data';
import { SupportedLanguage } from '../../config/i18n';

export interface ConceptMapCardProps {
  map: ConceptMap;
  progress?: ConceptMapProgress;
  isBookmarked?: boolean;
  language?: SupportedLanguage;
  variant?: 'standard' | 'featured' | 'compact';
  onPress: (mapId: string) => void;
  onBookmarkToggle?: (mapId: string) => void;
  testID?: string;
}

export const ConceptMapCard: React.FC<ConceptMapCardProps> = ({
  map,
  progress,
  isBookmarked = false,
  language = 'en',
  variant = 'standard',
  onPress,
  onBookmarkToggle,
  testID,
}) => {
  const isTamil = language === 'ta';
  const subjectTheme = CONCEPT_SUBJECT_THEMES[map.subject] || CONCEPT_SUBJECT_THEMES.physics;
  const isCompleted = progress?.completed ?? false;
  const exploredCount = progress?.exploredNodeIds.length ?? 0;
  const totalNodes = map.nodes.length;
  const progressPercent = totalNodes > 0 ? Math.min(100, Math.round((exploredCount / totalNodes) * 100)) : 0;

  const title = isTamil && map.title.ta ? map.title.ta : map.title.en;
  const description = isTamil && map.description.ta ? map.description.ta : map.description.en;
  const subjectName = isTamil ? subjectTheme.label.ta : subjectTheme.label.en;

  const difficultyLabel = {
    easy: isTamil ? 'எளிது' : 'Easy',
    medium: isTamil ? 'நடுத்தரம்' : 'Medium',
    hard: isTamil ? 'கடினம்' : 'Advanced',
  }[map.difficulty];

  // -------------------------------------------------------------------------
  // COMPACT VARIANT (for home / explore widgets)
  // -------------------------------------------------------------------------
  if (variant === 'compact') {
    return (
      <TouchableOpacity
        testID={testID || `concept-map-card-compact-${map.id}`}
        accessibilityRole="button"
        accessibilityLabel={`${title}, ${subjectName}, ${totalNodes} concepts`}
        activeOpacity={0.88}
        onPress={() => onPress(map.id)}
        style={[styles.compactCard, { borderLeftColor: subjectTheme.primary }]}
      >
        <View style={styles.compactHeaderRow}>
          <View style={[styles.compactIconBox, { backgroundColor: subjectTheme.surface }]}>
            <Text style={styles.compactIcon}>{subjectTheme.icon}</Text>
          </View>
          <View style={styles.compactTitleWrap}>
            <Text style={styles.compactTitle} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.compactSubject} numberOfLines={1}>
              {subjectName} • {totalNodes} {isTamil ? 'கருத்துகள்' : 'nodes'}
            </Text>
          </View>
          {isCompleted ? (
            <View style={styles.completedBadgeSmall}>
              <Text style={styles.completedBadgeText}>✓</Text>
            </View>
          ) : progressPercent > 0 ? (
            <Text style={styles.progressPercentSmall}>{progressPercent}%</Text>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  }

  // -------------------------------------------------------------------------
  // FEATURED VARIANT (Today's Pick / Highlight)
  // -------------------------------------------------------------------------
  if (variant === 'featured') {
    return (
      <TouchableOpacity
        testID={testID || `concept-map-card-featured-${map.id}`}
        accessibilityRole="button"
        accessibilityLabel={`${title}, ${subjectName}, featured map`}
        activeOpacity={0.92}
        onPress={() => onPress(map.id)}
        style={[
          styles.featuredCard,
          { borderColor: subjectTheme.primary + '40' },
        ]}
      >
        {/* Banner Tag */}
        <View style={styles.featuredTagRow}>
          <View style={[styles.featuredTag, { backgroundColor: subjectTheme.primary }]}>
            <Text style={styles.featuredTagText}>
              {isTamil ? '🗺️ இன்றைய பார்வை' : "🗺️ TODAY'S CONCEPT MAP"}
            </Text>
          </View>
          {onBookmarkToggle && (
            <TouchableOpacity
              testID={`concept-map-bookmark-btn-${map.id}`}
              accessibilityRole="button"
              accessibilityLabel={isBookmarked ? 'Remove bookmark' : 'Bookmark map'}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              onPress={() => onBookmarkToggle(map.id)}
              style={styles.bookmarkBtn}
            >
              <Text style={styles.bookmarkIcon}>{isBookmarked ? '★' : '☆'}</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Content */}
        <View style={styles.featuredContentRow}>
          <View style={[styles.featuredIconContainer, { backgroundColor: subjectTheme.surface }]}>
            <Text style={styles.featuredIcon}>{subjectTheme.icon}</Text>
          </View>
          <View style={styles.featuredTextWrap}>
            <View style={styles.pillRow}>
              <View style={[styles.subjectPill, { backgroundColor: subjectTheme.surface }]}>
                <Text style={[styles.subjectPillText, { color: subjectTheme.primary }]}>
                  {subjectName}
                </Text>
              </View>
              <View style={styles.difficultyPill}>
                <Text style={styles.difficultyPillText}>{difficultyLabel}</Text>
              </View>
            </View>
            <Text style={styles.featuredTitle} numberOfLines={2}>
              {title}
            </Text>
          </View>
        </View>

        <Text style={styles.featuredDescription} numberOfLines={2}>
          {description}
        </Text>

        {/* Footer with Nodes / Connections / Progress */}
        <View style={styles.cardFooter}>
          <View style={styles.metricRow}>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{totalNodes}</Text>
              <Text style={styles.metricLabel}>{isTamil ? 'கருத்துகள்' : 'Nodes'}</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{map.connections.length}</Text>
              <Text style={styles.metricLabel}>{isTamil ? 'இணைப்புகள்' : 'Links'}</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>+10 XP</Text>
              <Text style={styles.metricLabel}>{isTamil ? 'வெகுமதி' : 'Reward'}</Text>
            </View>
          </View>

          {/* Action CTA */}
          <View style={[styles.ctaButton, { backgroundColor: subjectTheme.primary }]}>
            <Text style={styles.ctaButtonText}>
              {isCompleted
                ? isTamil
                  ? 'மீண்டும் காண்க'
                  : 'Review Map'
                : progressPercent > 0
                ? isTamil
                  ? 'தொடர்க'
                  : 'Continue'
                : isTamil
                ? 'தொடங்கு'
                : 'Explore Map'}
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        {progressPercent > 0 && (
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${progressPercent}%`, backgroundColor: isCompleted ? theme.colors.green600 : subjectTheme.primary },
              ]}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  }

  // -------------------------------------------------------------------------
  // STANDARD VARIANT (Hub Catalog)
  // -------------------------------------------------------------------------
  return (
    <TouchableOpacity
      testID={testID || `concept-map-card-${map.id}`}
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${subjectName}, ${difficultyLabel}`}
      activeOpacity={0.88}
      onPress={() => onPress(map.id)}
      style={styles.standardCard}
    >
      {/* Top Row: Subject Pill + Bookmark + Status */}
      <View style={styles.standardHeaderRow}>
        <View style={styles.subjectPillWrap}>
          <View style={[styles.subjectPill, { backgroundColor: subjectTheme.surface }]}>
            <Text style={[styles.subjectPillText, { color: subjectTheme.primary }]}>
              {subjectTheme.icon} {subjectName}
            </Text>
          </View>
          <View style={styles.difficultyPill}>
            <Text style={styles.difficultyPillText}>{difficultyLabel}</Text>
          </View>
        </View>

        <View style={styles.headerRightWrap}>
          {isCompleted ? (
            <View style={styles.completedBadge}>
              <Text style={styles.completedBadgeCheck}>✓</Text>
              <Text style={styles.completedBadgeLabel}>
                {isTamil ? 'நிறைவு' : 'Completed'}
              </Text>
            </View>
          ) : progressPercent > 0 ? (
            <View style={styles.progressBadge}>
              <Text style={styles.progressBadgeText}>{progressPercent}%</Text>
            </View>
          ) : null}

          {onBookmarkToggle && (
            <TouchableOpacity
              testID={`concept-map-bookmark-btn-${map.id}`}
              accessibilityRole="button"
              accessibilityLabel={isBookmarked ? 'Remove bookmark' : 'Bookmark map'}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              onPress={() => onBookmarkToggle(map.id)}
              style={styles.bookmarkBtn}
            >
              <Text style={styles.bookmarkIcon}>{isBookmarked ? '★' : '☆'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Main Title & Description */}
      <Text style={styles.standardTitle} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.standardDescription} numberOfLines={2}>
        {description}
      </Text>

      {/* Metrics Row: Nodes, Connections, Reward */}
      <View style={styles.standardFooter}>
        <View style={styles.footerChipsRow}>
          <View style={styles.footerChip}>
            <Text style={styles.footerChipText}>
              🧠 {totalNodes} {isTamil ? 'கருத்துகள்' : 'nodes'}
            </Text>
          </View>
          <View style={styles.footerChip}>
            <Text style={styles.footerChipText}>
              🔗 {map.connections.length} {isTamil ? 'இணைப்புகள்' : 'links'}
            </Text>
          </View>
          <View style={styles.footerChip}>
            <Text style={styles.footerChipText}>✨ +10 XP</Text>
          </View>
        </View>
        <Text style={[styles.openArrow, { color: subjectTheme.primary }]}>→</Text>
      </View>

      {/* Progress Bar for In-Progress Maps */}
      {progressPercent > 0 && (
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${progressPercent}%`,
                backgroundColor: isCompleted ? theme.colors.green600 : subjectTheme.primary,
              },
            ]}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Compact
  compactCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: 12,
    borderLeftWidth: 4,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 3,
      },
      android: { elevation: 2 },
    }),
  },
  compactHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compactIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  compactIcon: {
    fontSize: 20,
  },
  compactTitleWrap: {
    flex: 1,
  },
  compactTitle: {
    fontSize: 15,
    fontFamily: theme.fontFamilies.bold,
    color: theme.colors.navy900,
  },
  compactSubject: {
    fontSize: 12,
    fontFamily: theme.fontFamilies.regular,
    color: theme.colors.slate500,
    marginTop: 2,
  },
  completedBadgeSmall: {
    backgroundColor: theme.colors.green100,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedBadgeText: {
    color: theme.colors.green700,
    fontSize: 13,
    fontWeight: '700',
  },
  progressPercentSmall: {
    fontSize: 12,
    fontFamily: theme.fontFamilies.bold,
    color: theme.colors.blue600,
  },

  // Featured
  featuredCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    marginBottom: 18,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
      android: { elevation: 4 },
    }),
  },
  featuredTagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  featuredTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  featuredTagText: {
    color: theme.colors.white,
    fontSize: 11,
    fontFamily: theme.fontFamilies.bold,
    letterSpacing: 0.6,
  },
  featuredContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featuredIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  featuredIcon: {
    fontSize: 28,
  },
  featuredTextWrap: {
    flex: 1,
  },
  pillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  subjectPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  subjectPillText: {
    fontSize: 11,
    fontFamily: theme.fontFamilies.medium,
  },
  difficultyPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: theme.colors.gray100,
  },
  difficultyPillText: {
    fontSize: 11,
    fontFamily: theme.fontFamilies.regular,
    color: theme.colors.slate600,
  },
  featuredTitle: {
    fontSize: 18,
    fontFamily: theme.fontFamilies.bold,
    color: theme.colors.navy900,
    lineHeight: 24,
  },
  featuredDescription: {
    fontSize: 13,
    fontFamily: theme.fontFamilies.regular,
    color: theme.colors.slate600,
    lineHeight: 18,
    marginBottom: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray100,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricItem: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  metricValue: {
    fontSize: 13,
    fontFamily: theme.fontFamilies.bold,
    color: theme.colors.navy900,
  },
  metricLabel: {
    fontSize: 10,
    fontFamily: theme.fontFamilies.regular,
    color: theme.colors.slate500,
    marginTop: 1,
  },
  metricDivider: {
    width: 1,
    height: 20,
    backgroundColor: theme.colors.gray100,
  },
  ctaButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  ctaButtonText: {
    color: theme.colors.white,
    fontSize: 13,
    fontFamily: theme.fontFamilies.bold,
  },

  // Standard
  standardCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
      },
      android: { elevation: 2 },
    }),
  },
  standardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  subjectPillWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerRightWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.green50,
    borderWidth: 1,
    borderColor: theme.colors.green200,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 4,
  },
  completedBadgeCheck: {
    color: theme.colors.green600,
    fontSize: 11,
    fontWeight: '800',
  },
  completedBadgeLabel: {
    color: theme.colors.green700,
    fontSize: 11,
    fontFamily: theme.fontFamilies.medium,
  },
  progressBadge: {
    backgroundColor: theme.colors.blue50,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  progressBadgeText: {
    color: theme.colors.blue600,
    fontSize: 11,
    fontFamily: theme.fontFamilies.bold,
  },
  bookmarkBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.gray50,
  },
  bookmarkIcon: {
    fontSize: 16,
    color: '#EAB308',
  },
  standardTitle: {
    fontSize: 16,
    fontFamily: theme.fontFamilies.bold,
    color: theme.colors.navy900,
    lineHeight: 22,
    marginBottom: 4,
  },
  standardDescription: {
    fontSize: 13,
    fontFamily: theme.fontFamilies.regular,
    color: theme.colors.slate600,
    lineHeight: 18,
    marginBottom: 12,
  },
  standardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerChipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  footerChip: {
    backgroundColor: theme.colors.gray50,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  footerChipText: {
    fontSize: 11,
    fontFamily: theme.fontFamilies.regular,
    color: theme.colors.slate600,
  },
  openArrow: {
    fontSize: 18,
    fontWeight: '700',
  },

  // Progress Bar
  progressBarBg: {
    height: 4,
    backgroundColor: theme.colors.gray100,
    borderRadius: 2,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
});
