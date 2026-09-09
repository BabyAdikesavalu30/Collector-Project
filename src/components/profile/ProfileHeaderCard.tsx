/**
 * ProfileHeaderCard — student identity header: avatar, name, grade/section,
 * school, and a notification shortcut with unread badge.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';

interface ProfileHeaderCardProps {
  name: string;
  grade: string;
  section: string;
  school: string;
  initials: string;
  avatarColor?: string;
  unreadNotifications: number;
  language: SupportedLanguage;
  onNotificationsPress: () => void;
}

export const ProfileHeaderCard: React.FC<ProfileHeaderCardProps> = ({
  name,
  grade,
  section,
  school,
  initials,
  avatarColor = theme.colors.brandPrimary,
  unreadNotifications,
  language,
  onNotificationsPress,
}) => {
  const t = getTranslation(language).progress.profile;
  const isTamil = language === 'ta';
  const gradeSection = t.gradeSection.replace('{grade}', grade).replace('{section}', section);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={[styles.avatarCircle, { backgroundColor: avatarColor }]}>
          <Text style={styles.avatarInitials}>{initials}</Text>
        </View>
        <View style={styles.nameBlock}>
          <Text style={styles.studentName} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.studentMeta}>{gradeSection}</Text>
          <Text style={styles.schoolName} numberOfLines={1}>
            {school}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.bellButton}
          onPress={onNotificationsPress}
          accessibilityRole="button"
          accessibilityLabel={isTamil ? 'அறிவிப்புகள்' : 'Notifications'}
          accessibilityHint={isTamil ? 'அறிவிப்பு மையத்தைத் திறக்கும்' : 'Opens the notification center'}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.bellIcon}>🔔</Text>
          {unreadNotifications > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadNotifications > 99 ? '99+' : unreadNotifications}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.purple200,
    marginRight: theme.spacing.base,
  },
  avatarInitials: {
    ...theme.typography.h2,
    fontSize: 22,
    fontWeight: '900',
    color: theme.colors.textOnBrand,
  },
  nameBlock: {
    flex: 1,
  },
  studentName: {
    ...theme.typography.h2,
    fontSize: 19,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  studentMeta: {
    ...theme.typography.body,
    fontSize: 13,
    color: theme.colors.brandPrimary,
    fontWeight: '700',
    marginTop: 2,
  },
  schoolName: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate600,
    marginTop: 2,
  },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.blue50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellIcon: {
    fontSize: 18,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: theme.colors.actionPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: theme.colors.textOnAction,
    fontSize: 10,
    fontWeight: '800',
  },
});