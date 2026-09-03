/**
 * Science Quizzes Boundary Route (/quizzes)
 * Clean Pearl White & White card layout with canonical back navigation.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../src/theme';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage } from '../src/config/i18n';
import { AppBackButton } from '../src/components/navigation';

export default function QuizzesBoundary() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  useEffect(() => {
    (async () => {
      const stored = await storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE);
      if (stored === 'en' || stored === 'ta') setLanguage(stored);
    })();
  }, []);

  const isTamil = language === 'ta';

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
        <AppBackButton
          onPress={() => router.back()}
          language={language}
          style={styles.headerBackBtn}
        />
      </View>

      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>🧠</Text>
        </View>
        <Text style={styles.title}>{isTamil ? 'அறிவியல் வினாடி வினா' : 'Science Quizzes'}</Text>
        <Text style={styles.subtitle}>
          {isTamil
            ? 'அறிவியல் வினாடி வினா தொகுப்பு மற்றும் நிலைகள் விரைவில் தொடங்க உள்ளது.'
            : 'Interactive quiz rounds and level progression modules ready for science challenges.'}
        </Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Text style={styles.backButtonText}>{isTamil ? 'முகப்புக்குத் திரும்பு' : 'Back to Dashboard'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  headerBackBtn: {},
  card: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xl,
    alignItems: 'center',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  icon: {
    fontSize: 30,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.navy900,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.slate600,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: theme.spacing.xl,
  },
  backButton: {
    backgroundColor: theme.colors.navy900,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: theme.borderRadius.md,
    width: '100%',
    alignItems: 'center',
  },
  backButtonText: {
    ...theme.typography.button,
    color: theme.colors.white,
  },
});
