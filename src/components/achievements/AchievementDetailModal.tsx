/**
 * AchievementDetailModal Component
 * Full-screen / bottom-sheet modal presenting in-depth criteria, progress,
 * XP rewards, and direct deep link action button to relevant activity.
 */

import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { Achievement, AchievementRarity } from '../../features/achievements';
import { getAchievementsI18n } from './achievements.i18n';

interface AchievementDetailModalProps {
  visible: boolean;
  badge: Achievement | null;
  language?: SupportedLanguage;
  onClose: () => void;
  onAction?: (route: string) => void;
}

function getRarityColors(rarity: AchievementRarity): { border: string; bg: string; text: string } {
  switch (rarity) {
    case 'legendary':
      return { border: '#F59E0B', bg: '#FEF3C7', text: '#B45309' };
    case 'epic':
      return { border: '#8B5CF6', bg: '#EDE9FE', text: '#6D28D9' };
    case 'rare':
      return { border: '#3B82F6', bg: '#DBEAFE', text: '#1D4ED8' };
    case 'uncommon':
      return { border: '#10B981', bg: '#D1FAE5', text: '#047857' };
    case 'common':
    default:
      return { border: '#94A3B8', bg: '#F1F5F9', text: '#475569' };
  }
}

function formatFullDate(timestamp: number | null | undefined, isTamil: boolean): string {
  if (!timestamp) return '';
  const d = new Date(timestamp);
  const day = d.getDate();
  const months = isTamil
    ? ['ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்', 'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${day} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export const AchievementDetailModal: React.FC<AchievementDetailModalProps> = ({
  visible,
  badge,
  language = 'en',
  onClose,
  onAction,
}) => {
  const i18n = getAchievementsI18n(language);
  const isTamil = language === 'ta';

  if (!badge) return null;

  const title = isTamil ? badge.title.ta : badge.title.en;
  const description = isTamil ? badge.description.ta : badge.description.en;
  const percentage = Math.round(badge.progress.percent);
  const rarityColors = getRarityColors(badge.rarity);
  const isUnlocked = badge.status === 'unlocked';

  const handleActionPress = () => {
    onClose();
    if (badge.relatedRoute && onAction) {
      onAction(badge.relatedRoute);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdropTouch}
          activeOpacity={1}
          onPress={onClose}
          accessible={false}
        />
        <View
          style={styles.dialogContainer}
          accessible={true}
          accessibilityViewIsModal={true}
          accessibilityRole="alert"
          accessibilityLabel={`${i18n.modal.title}: ${title}`}
        >
          {/* Header Close button */}
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={onClose}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={i18n.modal.closeBtn}
          >
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
            {/* Top Icon Badge */}
            <View
              style={[
                styles.iconContainer,
                { borderColor: rarityColors.border, backgroundColor: rarityColors.bg },
              ]}
            >
              <Text style={styles.badgeIcon}>{badge.icon}</Text>
            </View>

            {/* Rarity & Category pill */}
            <View style={styles.pillRow}>
              <View style={[styles.rarityPill, { backgroundColor: rarityColors.bg }]}>
                <Text style={[styles.rarityText, { color: rarityColors.text }]}>
                  {i18n.rarityLabels[badge.rarity] ?? badge.rarity}
                </Text>
              </View>
              <View style={styles.catPill}>
                <Text style={styles.catText}>
                  {i18n.categoryFilters[badge.category] ?? badge.category}
                </Text>
              </View>
            </View>

            {/* Title */}
            <Text style={styles.badgeTitle}>{title}</Text>

            {/* Status Banner */}
            {isUnlocked ? (
              <View style={styles.unlockedBanner}>
                <Text style={styles.unlockedBannerText}>
                  🎉 {i18n.modal.earnedOnHeading}: {formatFullDate(badge.unlockedAt, isTamil)}
                </Text>
              </View>
            ) : (
              <View style={styles.inProgressBanner}>
                <Text style={styles.inProgressBannerText}>
                  {percentage > 0 ? `🚀 ${percentage}% ${isTamil ? 'முடிந்தது' : 'Complete'}` : `🔒 ${isTamil ? 'பூட்டப்பட்டுள்ளது' : 'Locked'}`}
                </Text>
              </View>
            )}

            {/* How to Earn */}
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>{i18n.modal.criteriaHeading}</Text>
              <Text style={styles.descriptionText}>{description}</Text>
            </View>

            {/* Progress Bar & Details */}
            <View style={styles.section}>
              <View style={styles.progressHeaderRow}>
                <Text style={styles.sectionHeading}>{i18n.modal.progressHeading}</Text>
                <Text style={styles.progressNumbers}>
                  {badge.progress.current} / {badge.progress.target} ({percentage}%)
                </Text>
              </View>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${Math.min(percentage, 100)}%`,
                      backgroundColor: isUnlocked ? '#22C55E' : '#8B5CF6',
                    },
                  ]}
                />
              </View>
            </View>

            {/* Reward */}
            <View style={styles.rewardRow}>
              <Text style={styles.rewardLabel}>{i18n.modal.rewardHeading}:</Text>
              <View style={styles.xpTag}>
                <Text style={styles.xpTagText}>+{badge.rewardXp} XP</Text>
              </View>
            </View>

            {/* Action Buttons */}
            {badge.relatedRoute && (
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={handleActionPress}
                activeOpacity={0.85}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={i18n.modal.actionBtn}
              >
                <Text style={styles.actionBtnText}>{i18n.modal.actionBtn} →</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.doneBtn}
              onPress={onClose}
              activeOpacity={0.85}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={i18n.modal.closeBtn}
            >
              <Text style={styles.doneBtnText}>{i18n.modal.closeBtn}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  backdropTouch: {
    ...StyleSheet.absoluteFillObject,
  },
  dialogContainer: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    maxHeight: '85%',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
  closeBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.slate600,
  },
  scrollBody: {
    alignItems: 'center',
    paddingTop: theme.spacing.xs,
  },
  iconContainer: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  badgeIcon: {
    fontSize: 38,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: theme.spacing.sm,
  },
  rarityPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  rarityText: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  catPill: {
    backgroundColor: theme.colors.gray100,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  catText: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.slate600,
  },
  badgeTitle: {
    ...theme.typography.h2,
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.navy900,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  unlockedBanner: {
    backgroundColor: '#DCFCE7',
    borderColor: '#86EFAC',
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: theme.spacing.md,
  },
  unlockedBannerText: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: '#15803D',
  },
  inProgressBanner: {
    backgroundColor: '#F3E8FF',
    borderColor: '#D8B4FE',
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: theme.spacing.md,
  },
  inProgressBannerText: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: '#7E22CE',
  },
  section: {
    width: '100%',
    marginBottom: theme.spacing.md,
  },
  sectionHeading: {
    ...theme.typography.caption,
    fontSize: 11.5,
    fontWeight: '800',
    color: theme.colors.slate500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  descriptionText: {
    ...theme.typography.body,
    fontSize: 14,
    color: theme.colors.slate600,
    lineHeight: 20,
  },
  progressHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressNumbers: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  progressTrack: {
    height: 8,
    backgroundColor: theme.colors.gray100,
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  rewardRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: theme.spacing.lg,
  },
  rewardLabel: {
    ...theme.typography.caption,
    fontSize: 13,
    fontWeight: '700',
    color: '#92400E',
  },
  xpTag: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  xpTagText: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: '#B45309',
  },
  actionBtn: {
    width: '100%',
    minHeight: 46,
    backgroundColor: '#7C3AED',
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionBtnText: {
    ...theme.typography.button,
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.white,
  },
  doneBtn: {
    width: '100%',
    minHeight: 44,
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneBtnText: {
    ...theme.typography.button,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.slate600,
  },
});
