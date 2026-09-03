/**
 * SettingsConfirmationModal Component
 * Accessible mobile confirmation dialog for sensitive actions (Logout, Clear Cache, Reset).
 */

import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';

interface SettingsConfirmationModalProps {
  visible: boolean;
  title: string;
  body: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  language?: SupportedLanguage;
  onConfirm: () => void;
  onCancel: () => void;
}

export const SettingsConfirmationModal: React.FC<SettingsConfirmationModalProps> = ({
  visible,
  title,
  body,
  confirmLabel,
  cancelLabel,
  isDestructive = false,
  language = 'en',
  onConfirm,
  onCancel,
}) => {
  const t = getTranslation(language).settingsScreen;

  const actualConfirmText = confirmLabel || t.confirm;
  const actualCancelText = cancelLabel || t.cancel;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onCancel} />

        <View style={styles.dialog} accessible={true} accessibilityRole="alert">
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.body}>{body}</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancel}
              activeOpacity={0.8}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={actualCancelText}
            >
              <Text style={styles.cancelButtonText}>{actualCancelText}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.confirmButton, isDestructive && styles.destructiveButton]}
              onPress={onConfirm}
              activeOpacity={0.8}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={actualConfirmText}
            >
              <Text style={styles.confirmButtonText}>{actualConfirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  dialog: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginBottom: 8,
    textAlign: 'center',
  },
  body: {
    ...theme.typography.body,
    fontSize: 13.5,
    color: theme.colors.slate600,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: theme.spacing.lg,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    height: 44,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    ...theme.typography.button,
    fontSize: 13.5,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  confirmButton: {
    flex: 1,
    height: 44,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.actionPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  destructiveButton: {
    backgroundColor: theme.colors.error,
  },
  confirmButtonText: {
    ...theme.typography.button,
    fontSize: 13.5,
    fontWeight: '800',
    color: theme.colors.textOnAction,
  },
});
