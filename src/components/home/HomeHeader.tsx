/**
 * HomeHeader Component
 * Greets the student, displays school identity, and provides quick access
 * to notifications and student profile.
 * Clean Pearl White background & Navy typography with Purple brand avatar.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { StudentHeaderInfo } from '../../features/home/home.types';
import { SupportedLanguage, getTranslation } from '../../config/i18n';

interface HomeHeaderProps {
  student: StudentHeaderInfo;
  language?: SupportedLanguage;
  onNotificationPress: () => void;
  onAvatarPress: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  student,
  language = 'en',
  onNotificationPress,
  onAvatarPress,
}) => {
  const t = getTranslation(language).home;

  const getInitials = (name: string): string => {
    if (!name) return 'S';
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getGreeting = (): string => {
    const hours = new Date().getHours();
    if (hours < 12) return t.greetingMorning;
    if (hours < 17) return t.greetingAfternoon;
    return t.greetingEvening;
  };

  return (
    <View style={styles.container}>
      {/* Student Identity: Avatar + Greeting + Grade */}
      <TouchableOpacity
        style={styles.identityRow}
        onPress={onAvatarPress}
        activeOpacity={0.8}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`${getGreeting()} ${student.name}. ${student.grade}. ${student.schoolName}. ${t.accessibility.avatarHint}`}
      >
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{getInitials(student.name)}</Text>
        </View>

        <View style={styles.nameBlock}>
          <Text style={styles.greetingText} numberOfLines={1}>
            {getGreeting()}, {student.name.split(' ')[0]} 👋
          </Text>
          <Text style={styles.metaText} numberOfLines={1}>
            {student.grade} • {student.schoolName}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Notification Bell Action */}
      <TouchableOpacity
        style={styles.notificationButton}
        onPress={onNotificationPress}
        activeOpacity={0.7}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={t.accessibility.notificationHint}
      >
        <Text style={styles.bellIcon}>🔔</Text>
        {student.unreadNotificationsCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>
              {student.unreadNotificationsCount > 9 ? '9+' : student.unreadNotificationsCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
  },
  identityRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  avatarContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: theme.colors.brandPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: theme.colors.purple200,
    shadowColor: theme.colors.brandPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarText: {
    ...theme.typography.button,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  nameBlock: {
    flex: 1,
  },
  greetingText: {
    ...theme.typography.h3,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  metaText: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate600,
    marginTop: 2,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  bellIcon: {
    fontSize: 18,
  },
  unreadBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: theme.colors.white,
  },
  unreadText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
