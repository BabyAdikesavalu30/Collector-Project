/**
 * LanguageSelector Component
 * Accessible group container holding language option cards.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LanguageOptionCard } from './LanguageOptionCard';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { theme } from '../../theme';

interface LanguageSelectorProps {
  selectedLanguage: SupportedLanguage;
  onSelectLanguage: (language: SupportedLanguage) => void;
  disabled?: boolean;
  isReduceMotion?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onSelectLanguage,
  disabled = false,
  isReduceMotion = false,
}) => {
  const t = getTranslation(selectedLanguage).language;

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityRole="radiogroup"
      accessibilityLabel={t.accessibility.screenLabel}
    >
      {/* English Language Card */}
      <LanguageOptionCard
        languageCode="en"
        badge="EN"
        title={t.english}
        description={t.englishDescription}
        isSelected={selectedLanguage === 'en'}
        onSelect={onSelectLanguage}
        disabled={disabled}
        isReduceMotion={isReduceMotion}
      />

      {/* Tamil Language Card */}
      <LanguageOptionCard
        languageCode="ta"
        badge="தமிழ்"
        title={t.tamil}
        description={t.tamilDescription}
        isSelected={selectedLanguage === 'ta'}
        onSelect={onSelectLanguage}
        disabled={disabled}
        isReduceMotion={isReduceMotion}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: theme.spacing.sm,
  },
});
