/**
 * SettingsSelectionModal Component
 * Accessible radio-choice selection modal for Theme, Text Size, Goals, and Preferences.
 */

import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';

export interface SelectionOption {
  value: string;
  label: string;
  subtitle?: string;
}

interface SettingsSelectionModalProps {
  visible: boolean;
  title: string;
  subtitle?: string;
  options: SelectionOption[];
  selectedValue: string;
  language?: SupportedLanguage;
  onSelect: (value: string) => void;
  onClose: () => void;
}

export const SettingsSelectionModal: React.FC<SettingsSelectionModalProps> = ({
  visible,
  title,
  subtitle,
  options,
  selectedValue,
  language = 'en',
  onSelect,
  onClose,
}) => {
  const t = getTranslation(language).settingsScreen;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />

        <View style={styles.sheet}>
          <View style={styles.header}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.title}>{title}</Text>
              {Boolean(subtitle) && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.7}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={t.close}
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.optionsList} showsVerticalScrollIndicator={false}>
            {options.map((opt) => {
              const isSelected = selectedValue === opt.value;

              return (
                <TouchableOpacity
                  key={opt.value}
                  style={[styles.optionRow, isSelected && styles.optionRowSelected]}
                  onPress={() => {
                    onSelect(opt.value);
                    onClose();
                  }}
                  activeOpacity={0.75}
                  accessible={true}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: isSelected }}
                  accessibilityLabel={`${opt.label}. ${opt.subtitle || ''} ${isSelected ? 'Selected' : ''}`}
                >
                  <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                    {isSelected && <View style={styles.radioInnerDot} />}
                  </View>

                  <View style={styles.optionContent}>
                    <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                      {opt.label}
                    </Text>
                    {Boolean(opt.subtitle) && (
                      <Text style={styles.optionSubtitle}>{opt.subtitle}</Text>
                    )}
                  </View>

                  {isSelected && <Text style={styles.checkIcon}>✓</Text>}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.base,
    maxHeight: '75%',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray100,
    marginBottom: theme.spacing.sm,
  },
  headerTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  subtitle: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate500,
    marginTop: 2,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 13,
    color: theme.colors.slate600,
    fontWeight: '700',
  },
  optionsList: {
    paddingVertical: 4,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: 6,
  },
  optionRowSelected: {
    backgroundColor: theme.colors.blue50,
    borderColor: theme.colors.blue200,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: theme.colors.slate400,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioCircleSelected: {
    borderColor: theme.colors.actionPrimary,
  },
  radioInnerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.actionPrimary,
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    ...theme.typography.body,
    fontSize: 14.5,
    fontWeight: '600',
    color: theme.colors.navy900,
  },
  optionLabelSelected: {
    color: theme.colors.actionPrimary,
    fontWeight: '800',
  },
  optionSubtitle: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.slate500,
    marginTop: 1,
  },
  checkIcon: {
    fontSize: 16,
    color: theme.colors.actionPrimary,
    fontWeight: '900',
    marginLeft: 8,
  },
});
