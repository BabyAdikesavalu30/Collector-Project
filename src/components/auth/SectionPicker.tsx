/**
 * SectionPicker Component
 * Modal selector for structured Section selection (A, B, C, D, E).
 * Clean White surface & Royal Blue active states.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { SectionValue } from '../../features/auth';

const SECTIONS: SectionValue[] = ['A', 'B', 'C', 'D', 'E'];

interface SectionPickerProps {
  value: string;
  onSelect: (section: string) => void;
  error?: string | null;
  language?: SupportedLanguage;
  disabled?: boolean;
}

export const SectionPicker: React.FC<SectionPickerProps> = ({
  value,
  onSelect,
  error,
  language = 'en',
  disabled = false,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const t = getTranslation(language).auth.register;

  const handleSelect = (section: string) => {
    onSelect(section);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t.section}</Text>

      {/* Trigger Field */}
      <TouchableOpacity
        style={[
          styles.trigger,
          Boolean(value) && styles.triggerFilled,
          Boolean(error) && styles.triggerError,
        ]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.75}
        disabled={disabled}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={t.section}
        accessibilityHint={value ? `Selected Section ${value}. Double tap to change.` : t.sectionPlaceholder}
      >
        <Text style={styles.leadingIcon}>🏷️</Text>
        <Text style={[styles.triggerText, !value && styles.placeholderText]}>
          {value ? `Section ${value}` : t.sectionPlaceholder}
        </Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>

      {/* Error Message */}
      {Boolean(error) && (
        <Text style={styles.errorText} accessible={true} accessibilityRole="alert">
          {error}
        </Text>
      )}

      {/* Bottom Sheet Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalBackdrop}>
            <TouchableWithoutFeedback>
              <View style={styles.modalCard}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{t.section}</Text>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.closeButton}
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel="Close section selector"
                  >
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.optionsList} showsVerticalScrollIndicator={false}>
                  {SECTIONS.map((sec) => {
                    const isSelected = value === sec;
                    return (
                      <TouchableOpacity
                        key={sec}
                        style={[styles.optionRow, isSelected && styles.optionRowSelected]}
                        onPress={() => handleSelect(sec)}
                        activeOpacity={0.7}
                        accessible={true}
                        accessibilityRole="button"
                        accessibilityState={{ selected: isSelected }}
                      >
                        <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                          Section {sec}
                        </Text>
                        {isSelected && <Text style={styles.checkGlyph}>✓</Text>}
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: theme.spacing.md,
  },
  label: {
    ...theme.typography.caption,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  trigger: {
    width: '100%',
    height: 52,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.gray300,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 3,
    elevation: 1,
  },
  triggerFilled: {
    borderColor: theme.colors.actionPrimary,
  },
  triggerError: {
    borderColor: theme.colors.error,
    backgroundColor: theme.colors.errorSurface,
  },
  leadingIcon: {
    fontSize: 15,
    marginRight: 10,
    opacity: 0.7,
  },
  triggerText: {
    flex: 1,
    color: theme.colors.navy900,
    fontSize: 14.5,
    fontWeight: '500',
  },
  placeholderText: {
    color: theme.colors.slate400,
  },
  dropdownArrow: {
    fontSize: 10,
    color: theme.colors.slate500,
    marginLeft: 8,
  },
  errorText: {
    ...theme.typography.caption,
    color: theme.colors.error,
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    padding: theme.spacing.lg,
    maxHeight: '50%',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingBottom: theme.spacing.sm,
  },
  modalTitle: {
    ...theme.typography.h3,
    color: theme.colors.navy900,
    fontSize: 18,
    fontWeight: '700',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: theme.colors.navy800,
    fontSize: 14,
    fontWeight: '700',
  },
  optionsList: {
    maxHeight: 250,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: 4,
  },
  optionRowSelected: {
    backgroundColor: theme.colors.blue50,
    borderWidth: 1,
    borderColor: theme.colors.actionPrimary,
  },
  optionText: {
    ...theme.typography.body,
    fontSize: 15,
    color: theme.colors.navy800,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: theme.colors.actionPrimary,
    fontWeight: '700',
  },
  checkGlyph: {
    color: theme.colors.actionPrimary,
    fontSize: 16,
    fontWeight: '900',
  },
});
