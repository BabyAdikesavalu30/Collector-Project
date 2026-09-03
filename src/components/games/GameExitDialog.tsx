/**
 * GameExitDialog Component
 * Confirmation dialog before leaving an active puzzle game.
 */

import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

interface GameExitDialogProps {
  visible: boolean;
  onStay: () => void;
  onLeave: () => void;
  title?: string;
  message?: string;
  stayLabel?: string;
  leaveLabel?: string;
}

export const GameExitDialog: React.FC<GameExitDialogProps> = ({
  visible,
  onStay,
  onLeave,
  title = 'Leave Game?',
  message = 'Your current level progress will be lost.',
  stayLabel = 'Stay',
  leaveLabel = 'Leave',
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.stayBtn}
              onPress={onStay}
              activeOpacity={0.8}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={stayLabel}
            >
              <Text style={styles.stayBtnText}>{stayLabel}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.leaveBtn}
              onPress={onLeave}
              activeOpacity={0.8}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={leaveLabel}
            >
              <Text style={styles.leaveBtnText}>{leaveLabel}</Text>
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
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  card: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    ...theme.typography.h3,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginBottom: 6,
    textAlign: 'center',
  },
  message: {
    ...theme.typography.body,
    fontSize: 13.5,
    color: theme.colors.slate600,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  stayBtn: {
    flex: 1,
    height: 44,
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stayBtnText: {
    ...theme.typography.button,
    color: theme.colors.textOnAction,
    fontSize: 14,
    fontWeight: '800',
  },
  leaveBtn: {
    flex: 1,
    height: 44,
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaveBtnText: {
    ...theme.typography.button,
    color: theme.colors.error,
    fontSize: 14,
    fontWeight: '800',
  },
});
