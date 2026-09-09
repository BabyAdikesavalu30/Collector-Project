/**
 * ExplanationAccordion Component
 * Compact "WHY WAS THIS WRONG?" disclosure. Closed shows "Tap to understand";
 * open shows the short explanation. Keeps initial feedback small for
 * younger students while remaining screen-reader understandable.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { getFeedbackI18n } from './feedback.i18n';

interface ExplanationAccordionProps {
  explanation: string;
  language: SupportedLanguage;
  /** Starts opened (e.g. attempt >= 2 where guidance matters more). */
  defaultOpen?: boolean;
}

export const ExplanationAccordion: React.FC<ExplanationAccordionProps> = ({
  explanation,
  language,
  defaultOpen = false,
}) => {
  const t = getFeedbackI18n(language);
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Content changed — collapse again so stale explanations never linger open.
  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [explanation, defaultOpen]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => setIsOpen((prev) => !prev)}
        activeOpacity={0.8}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`${t.whyWasThisWrong}. ${isOpen ? explanation : t.tapToUnderstand}`}
        accessibilityHint={t.accessibility.whyToggle}
        hitSlop={{ top: 8, bottom: 8 }}
      >
        <Text style={styles.triggerIcon}>❓</Text>
        <Text style={styles.triggerText}>
          {isOpen ? t.whyWasThisWrong : t.tapToUnderstand}
        </Text>
        <Text style={styles.chevron}>{isOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.body}>
          <Text style={styles.bodyText}>{explanation}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.sm,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.blue50,
    borderWidth: 1,
    borderColor: theme.colors.blue100,
    borderRadius: theme.borderRadius.md,
    gap: 8,
  },
  triggerIcon: {
    fontSize: 14,
  },
  triggerText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.blue700,
  },
  chevron: {
    fontSize: 11,
    color: theme.colors.blue700,
  },
  body: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.blue100,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginTop: theme.spacing.xs,
  },
  bodyText: {
    fontSize: 13.5,
    color: theme.colors.navy800,
    lineHeight: 20,
  },
});
