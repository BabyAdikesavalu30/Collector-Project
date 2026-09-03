/**
 * RiddleExitDialog Component
 * Modal confirmation dialog when student taps Exit during an active riddle session.
 */

import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

interface RiddleExitDialogProps {
  visible: boolean;
  onCancel: () => void;
  onConfirmExit: () => void;
  title: string;
  message: string;
  cancelLabel: string;
  exitLabel: string;
}

export const RiddleExitDialog: React.FC<RiddleExitDialogProps> = ({
  visible,
  onCancel,
  onConfirmExit,
  title,
  message,
  cancelLabel,
  exitLabel,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.backdrop}>
        <View style={styles.dialog}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonRow}>
            {/* Cancel Button */}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancel}
              activeOpacity={0.7}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={cancelLabel}
            >
              <Text style={styles.cancelText}>{cancelLabel}</Text>
            </TouchableOpacity>

            {/* Confirm Exit Button */}
            <TouchableOpacity
              style={styles.exitButton}
              onPress={onConfirmExit}
              activeOpacity={0.7}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={exitLabel}
            >
              <Text style={styles.exitText}>{exitLabel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  dialog: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 5,
  },
  title: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginBottom: theme.spacing.xs,
  },
  message: {
    ...theme.typography.body,
    fontSize: 14,
    color: theme.colors.slate600,
    lineHeight: 20,
    marginBottom: theme.spacing.lg,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.spacing.sm,
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cancelText: {
    ...theme.typography.button,
    color: theme.colors.slate600,
    fontSize: 13,
    fontWeight: '700',
  },
  exitButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.error600,
  },
  exitText: {
    ...theme.typography.button,
    color: theme.colors.white,
    fontSize: 13,
    fontWeight: '800',
  },
});
