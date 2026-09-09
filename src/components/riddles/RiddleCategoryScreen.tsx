/**
 * RiddleCategoryScreen Component
 * Full screen coordinator for Screen 21: Riddle Category Selection.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import {
  RiddleCategory,
  RiddleDifficulty,
} from '../../features/riddles';
import { RiddleHeader } from './RiddleHeader';
import { RiddleCategoryList } from './RiddleCategoryList';
import { RiddleHowToPlayCard } from './RiddleHowToPlayCard';
import { StartRiddleButton } from './StartRiddleButton';

interface RiddleCategoryScreenProps {
  categories: RiddleCategory[];
  language: SupportedLanguage;
  points?: number;
  onBack: () => void;
  onStartRiddle: (difficulty: RiddleDifficulty) => void;
}

export const RiddleCategoryScreen: React.FC<RiddleCategoryScreenProps> = ({
  categories,
  language,
  points = 0,
  onBack,
  onStartRiddle,
}) => {
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).riddles;

  const [selectedDifficulty, setSelectedDifficulty] = useState<RiddleDifficulty | null>(null);

  const handleStart = () => {
    if (selectedDifficulty) {
      onStartRiddle(selectedDifficulty);
    }
  };

  const coinLabel = t.accessibility.coinLabel.replace('{points}', String(points));

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* 1. Header */}
      <RiddleHeader
        title={t.headerTitle}
        points={points}
        onBack={onBack}
        backLabel={t.back}
        coinLabel={coinLabel}
      />

      {/* 2. Scrollable Body */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + theme.spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title & Subtitle */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>{t.chooseCategory}</Text>
          <Text style={styles.subtitle}>{t.subtitle}</Text>
        </View>

        {/* Categories List */}
        <RiddleCategoryList
          categories={categories}
          selectedDifficulty={selectedDifficulty}
          onSelectDifficulty={setSelectedDifficulty}
          language={language}
          t={t}
        />

        {/* How to Play Card */}
        <RiddleHowToPlayCard
          title={t.howToPlayTitle}
          body={t.howToPlayBody}
        />

        {/* Start Button */}
        <StartRiddleButton
          onPress={handleStart}
          disabled={!selectedDifficulty}
          label={t.startRiddle}
          accessibilityHint={t.accessibility.startHint}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
  },
  titleSection: {
    marginBottom: theme.spacing.md,
  },
  mainTitle: {
    ...theme.typography.h2,
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.body,
    fontSize: 14,
    color: theme.colors.slate600,
    lineHeight: 20,
  },
});
