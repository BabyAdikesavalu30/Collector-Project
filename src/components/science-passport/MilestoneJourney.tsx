/**
 * MilestoneJourney — Visual vertical roadmap of science journey milestones.
 * Shows completed (✓), in-progress (●), and locked (🔒) milestones.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { PassportMilestone } from '../../features/science-passport';

interface MilestoneJourneyProps {
  milestones: PassportMilestone[];
  language: SupportedLanguage;
  onNavigate?: (route: string) => void;
}

export const MilestoneJourney: React.FC<MilestoneJourneyProps> = ({
  milestones,
  language,
  onNavigate,
}) => {
  const isTamil = language === 'ta';

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        {isTamil ? 'என் அறிவியல் பயணம்' : 'MY SCIENCE JOURNEY'}
      </Text>

      <View style={styles.timeline}>
        {milestones.map((milestone, index) => {
          const isLast = index === milestones.length - 1;
          const title = isTamil ? milestone.title.ta : milestone.title.en;
          const description = isTamil ? milestone.description.ta : milestone.description.en;

          const isCompleted = milestone.status === 'completed';
          const isInProgress = milestone.status === 'in_progress';
          const isLocked = milestone.status === 'locked';

          const progressPercent =
            milestone.target > 0
              ? Math.min(100, Math.round((milestone.progress / milestone.target) * 100))
              : 0;

          const statusText = isCompleted
            ? (isTamil ? 'நிறைவடைந்தது' : 'Completed')
            : isInProgress
            ? `${isTamil ? 'செயல்பாட்டில் உள்ளது' : 'In progress'}, ${milestone.progress} of ${milestone.target}`
            : (isTamil ? 'பூட்டப்பட்டுள்ளது' : 'Locked');

          const milestoneAccessibilityLabel = `${title}, ${description}. ${statusText}`;

          return (
            <TouchableOpacity
              key={milestone.id}
              style={styles.milestoneRow}
              onPress={() => {
                if (milestone.relatedRoute && onNavigate) {
                  onNavigate(milestone.relatedRoute);
                }
              }}
              activeOpacity={milestone.relatedRoute ? 0.7 : 1}
              disabled={!milestone.relatedRoute}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={milestoneAccessibilityLabel}
              accessibilityHint={
                milestone.relatedRoute
                  ? (isTamil ? 'தொடர்புடைய பகுதிக்குச் செல்லும்' : 'Navigates to related activity')
                  : undefined
              }
            >
              {/* Timeline connector */}
              <View style={styles.timelineLeft}>
                <View
                  style={[
                    styles.dot,
                    isCompleted && styles.dotCompleted,
                    isInProgress && styles.dotInProgress,
                    isLocked && styles.dotLocked,
                  ]}
                >
                  <Text style={styles.dotText}>
                    {isCompleted ? '✓' : isInProgress ? '●' : '🔒'}
                  </Text>
                </View>
                {!isLast && (
                  <View
                    style={[
                      styles.connector,
                      isCompleted && styles.connectorCompleted,
                    ]}
                  />
                )}
              </View>

              {/* Milestone content */}
              <View style={styles.content}>
                <View style={styles.titleRow}>
                  <Text style={styles.milestoneIcon}>{milestone.icon}</Text>
                  <View style={styles.titleText}>
                    <Text
                      style={[
                        styles.milestoneTitle,
                        isLocked && styles.milestoneTitleLocked,
                      ]}
                      numberOfLines={1}
                    >
                      {title}
                    </Text>
                    <Text style={styles.milestoneDescription} numberOfLines={1}>
                      {description}
                    </Text>
                  </View>
                </View>

                {/* Progress bar for in-progress milestones */}
                {isInProgress && (
                  <View style={styles.progressSection}>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          { width: `${progressPercent}%` },
                        ]}
                      />
                    </View>
                    <Text style={styles.progressText}>
                      {milestone.progress}/{milestone.target}
                    </Text>
                  </View>
                )}

                {/* Completed badge */}
                {isCompleted && (
                  <Text style={styles.completedBadge}>
                    {isTamil ? 'நிறைவடைந்தது ✓' : 'Completed ✓'}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.navy900,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: theme.spacing.lg,
  },
  timeline: {
    paddingLeft: theme.spacing.xs,
  },
  milestoneRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.xs,
  },
  timelineLeft: {
    alignItems: 'center',
    width: 36,
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.gray100,
    borderWidth: 2,
    borderColor: theme.colors.gray300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotCompleted: {
    backgroundColor: theme.colors.green100,
    borderColor: theme.colors.green500,
  },
  dotInProgress: {
    backgroundColor: theme.colors.blue100,
    borderColor: theme.colors.blue500,
  },
  dotLocked: {
    backgroundColor: theme.colors.gray100,
    borderColor: theme.colors.gray300,
  },
  dotText: {
    fontSize: 12,
  },
  connector: {
    width: 2,
    height: 16,
    backgroundColor: theme.colors.gray200,
  },
  connectorCompleted: {
    backgroundColor: theme.colors.green400,
  },
  content: {
    flex: 1,
    paddingBottom: theme.spacing.sm,
    paddingLeft: theme.spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  milestoneIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  titleText: {
    flex: 1,
  },
  milestoneTitle: {
    ...theme.typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  milestoneTitleLocked: {
    color: theme.colors.slate400,
  },
  milestoneDescription: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.slate600,
    marginTop: 1,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: theme.colors.gray200,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.blue500,
    borderRadius: 3,
  },
  progressText: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.slate500,
    fontWeight: '600',
    minWidth: 30,
    textAlign: 'right',
  },
  completedBadge: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.success,
    fontWeight: '600',
    marginTop: 4,
  },
});
