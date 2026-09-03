/**
 * AvatarPicker Component
 * Interactive selection of science-themed student avatars.
 * Clean White cards with Royal Blue active border and soft Purple fill.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

export interface ScienceAvatar {
  id: string;
  emoji: string;
  nameEn: string;
  nameTa: string;
  bgColor: string;
}

export const SCIENCE_AVATARS: ScienceAvatar[] = [
  { id: 'rocket', emoji: '🚀', nameEn: 'Cosmic Explorer', nameTa: 'விண்வெளி ஆய்வாளர்', bgColor: theme.colors.blue50 },
  { id: 'flask', emoji: '⚗️', nameEn: 'Chemistry Pro', nameTa: 'வேதியியல் வல்லுநர்', bgColor: theme.colors.purple50 },
  { id: 'dna', emoji: '🧬', nameEn: 'Genetics Whiz', nameTa: 'மரபியல் மேதை', bgColor: theme.colors.green50 },
  { id: 'atom', emoji: '⚛️', nameEn: 'Physics Genius', nameTa: 'இயற்பியல் சாதனையாளர்', bgColor: theme.colors.purple50 },
  { id: 'robot', emoji: '🤖', nameEn: 'Robo Pioneer', nameTa: 'ரோபோ முன்னோடி', bgColor: theme.colors.blue50 },
  { id: 'telescope', emoji: '🔭', nameEn: 'Astro Stargazer', nameTa: 'வானியல் விண்மீன்', bgColor: theme.colors.purple50 },
];

interface AvatarPickerProps {
  selectedAvatarId: string;
  onSelectAvatar: (avatar: ScienceAvatar) => void;
  isTamil?: boolean;
  disabled?: boolean;
}

export const AvatarPicker: React.FC<AvatarPickerProps> = ({
  selectedAvatarId,
  onSelectAvatar,
  isTamil = false,
  disabled = false,
}) => {
  return (
    <View style={styles.grid}>
      {SCIENCE_AVATARS.map((avatar) => {
        const isSelected = selectedAvatarId === avatar.id;
        return (
          <TouchableOpacity
            key={avatar.id}
            style={[
              styles.avatarCard,
              isSelected && styles.avatarCardSelected,
            ]}
            onPress={() => onSelectAvatar(avatar)}
            activeOpacity={0.75}
            disabled={disabled}
            accessible={true}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={`${isTamil ? avatar.nameTa : avatar.nameEn}${isSelected ? ' (Selected)' : ''}`}
          >
            <View style={[styles.avatarCircle, { backgroundColor: avatar.bgColor }, isSelected && styles.avatarCircleSelected]}>
              <Text style={styles.avatarEmoji}>{avatar.emoji}</Text>
            </View>
            <Text style={[styles.avatarLabel, isSelected && styles.avatarLabelSelected]} numberOfLines={1}>
              {isTamil ? avatar.nameTa : avatar.nameEn}
            </Text>
            {isSelected && <View style={styles.selectedCheckBadge}><Text style={styles.checkText}>✓</Text></View>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginVertical: 6,
  },
  avatarCard: {
    width: '31%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    paddingVertical: 10,
    paddingHorizontal: 4,
    alignItems: 'center',
    position: 'relative',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  avatarCardSelected: {
    borderColor: theme.colors.actionPrimary,
    backgroundColor: theme.colors.blue50,
    shadowColor: theme.colors.actionPrimary,
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  avatarCircleSelected: {
    borderColor: theme.colors.actionPrimary,
    transform: [{ scale: 1.05 }],
  },
  avatarEmoji: {
    fontSize: 26,
  },
  avatarLabel: {
    ...theme.typography.caption,
    fontSize: 10.5,
    fontWeight: '700',
    color: theme.colors.slate600,
    textAlign: 'center',
  },
  avatarLabelSelected: {
    color: theme.colors.actionPrimary,
    fontWeight: '800',
  },
  selectedCheckBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.actionPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkText: {
    fontSize: 10,
    fontWeight: '900',
    color: theme.colors.textOnAction,
  },
});
