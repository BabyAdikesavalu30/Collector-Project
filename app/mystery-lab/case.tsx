/**
 * Mystery Lab Case Route (/mystery-lab/case)
 * Individual case investigation screen.
 * Accepts caseId as a query parameter.
 */

import React, { useEffect, useState, useMemo } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { storage, STORAGE_KEYS } from '../../src/storage/asyncStorage';
import { SupportedLanguage } from '../../src/config/i18n';
import { MysteryCaseScreen } from '../../src/components/mystery-lab';
import { getMysteryCaseById } from '../../src/features/mystery-lab/mystery.cases';
import { theme } from '../../src/theme';

export default function MysteryCaseRoute() {
  const params = useLocalSearchParams<{ caseId?: string }>();
  const router = useRouter();
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  useEffect(() => {
    (async () => {
      const stored = await storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE);
      if (stored === 'en' || stored === 'ta') setLanguage(stored);
    })();
  }, []);

  const mysteryCase = useMemo(() => {
    if (params.caseId) {
      return getMysteryCaseById(params.caseId);
    }
    return undefined;
  }, [params.caseId]);

  // Invalid case
  if (!mysteryCase) {
    return (
      <View style={errorStyles.container}>
        <Text style={errorStyles.icon}>🔍</Text>
        <Text style={errorStyles.title}>
          {language === 'ta' ? 'வழக்கு கிடைக்கவில்லை' : 'Case Unavailable'}
        </Text>
        <Text style={errorStyles.subtitle}>
          {language === 'ta'
            ? 'இந்த வழக்கை ஏற்ற முடியவில்லை.'
            : 'This case could not be loaded.'}
        </Text>
        <TouchableOpacity
          style={errorStyles.button}
          onPress={() => router.replace('/mystery-lab')}
          activeOpacity={0.7}
        >
          <Text style={errorStyles.buttonText}>
            {language === 'ta' ? 'மர்ம ஆய்வகத்திற்குத் திரும்பு' : 'Back to Mystery Lab'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <MysteryCaseScreen mysteryCase={mysteryCase} language={language} />;
}

const errorStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  icon: { fontSize: 48, marginBottom: 16 },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.slate500,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
