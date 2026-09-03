/**
 * HowToPlayModal Component
 * Educational modal explaining goals, rules, and controls for each game.
 */

import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { theme } from '../../theme';

interface HowToPlayModalProps {
  visible: boolean;
  gameTitle: string;
  goal: string;
  rules: readonly string[] | string[];
  controls: string;
  onClose: () => void;
  closeLabel?: string;
  howToPlayTitle?: string;
  goalTitle?: string;
  rulesTitle?: string;
  controlsTitle?: string;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({
  visible,
  gameTitle,
  goal,
  rules,
  controls,
  onClose,
  closeLabel = 'Got It',
  howToPlayTitle = 'How to Play',
  goalTitle = 'Goal',
  rulesTitle = 'Rules',
  controlsTitle = 'Controls',
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.headerRow}>
            <Text style={styles.modalTitle}>
              {howToPlayTitle}: {gameTitle}
            </Text>
            <TouchableOpacity
              style={styles.closeIconBtn}
              onPress={onClose}
              activeOpacity={0.7}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            {/* Goal Section */}
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>🎯 {goalTitle}</Text>
              <Text style={styles.sectionText}>{goal}</Text>
            </View>

            {/* Rules Section */}
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>📜 {rulesTitle}</Text>
              {rules.map((rule, idx) => (
                <View key={idx} style={styles.ruleRow}>
                  <Text style={styles.ruleBullet}>•</Text>
                  <Text style={styles.ruleText}>{rule}</Text>
                </View>
              ))}
            </View>

            {/* Controls Section */}
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>🎮 {controlsTitle}</Text>
              <Text style={styles.sectionText}>{controls}</Text>
            </View>
          </ScrollView>

          {/* Got it button */}
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={onClose}
            activeOpacity={0.8}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={closeLabel}
          >
            <Text style={styles.actionBtnText}>{closeLabel}</Text>
          </TouchableOpacity>
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
    maxHeight: '80%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    paddingBottom: theme.spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  modalTitle: {
    ...theme.typography.h3,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    flex: 1,
  },
  closeIconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 14,
    color: theme.colors.slate600,
    fontWeight: '700',
  },
  body: {
    marginVertical: theme.spacing.xs,
  },
  section: {
    marginBottom: theme.spacing.md,
  },
  sectionHeading: {
    ...theme.typography.caption,
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.brandPrimary,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionText: {
    ...theme.typography.body,
    fontSize: 14,
    color: theme.colors.navy800,
    lineHeight: 20,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  ruleBullet: {
    fontSize: 16,
    color: theme.colors.actionPrimary,
    marginRight: 8,
    lineHeight: 20,
  },
  ruleText: {
    ...theme.typography.body,
    fontSize: 13.5,
    color: theme.colors.navy800,
    flex: 1,
    lineHeight: 20,
  },
  actionBtn: {
    width: '100%',
    height: 46,
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.xs,
  },
  actionBtnText: {
    ...theme.typography.button,
    color: theme.colors.textOnAction,
    fontSize: 14,
    fontWeight: '800',
  },
});
