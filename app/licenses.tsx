/**
 * Open Source Licenses Boundary Route (/licenses)
 * Open source software libraries, accreditations, and legal notices.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../src/theme';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage } from '../src/config/i18n';
import { AppBackButton } from '../src/components/navigation';

export default function LicensesPage() {
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

  const packages = [
    { name: 'React Native', license: 'MIT', desc: 'Facebook, Inc. and its affiliates.' },
    { name: 'Expo SDK', license: 'MIT', desc: '650 Industries, Inc.' },
    { name: 'Expo Router', license: 'MIT', desc: 'Expo & community contributors.' },
    { name: 'React Native Safe Area Context', license: 'MIT', desc: 'Janic Duplessis.' },
    { name: 'React Native Screens', license: 'MIT', desc: 'Software Mansion.' },
    { name: 'AsyncStorage', license: 'MIT', desc: 'React Native Community.' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + 16,
            paddingBottom: insets.bottom + 24,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <AppBackButton
            onPress={() => router.back()}
            language={language}
            style={styles.backButton}
          />
          <Text style={styles.headerTitle}>
            {isTamil ? 'திறந்த மூல உரிமங்கள்' : 'Open Source Licenses'}
          </Text>
        </View>

        <View style={styles.cardList}>
          {packages.map((pkg, index) => (
            <View key={index} style={styles.pkgCard}>
              <View style={styles.pkgHeader}>
                <Text style={styles.pkgName}>{pkg.name}</Text>
                <View style={styles.licensePill}>
                  <Text style={styles.licenseText}>{pkg.license}</Text>
                </View>
              </View>
              <Text style={styles.pkgDesc}>{pkg.desc}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.base,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  backArrow: {
    fontSize: 26,
    color: theme.colors.navy900,
    fontWeight: '600',
    marginTop: -2,
  },
  headerTitle: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    flex: 1,
  },
  cardList: {
    gap: 10,
  },
  pkgCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  pkgHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  pkgName: {
    ...theme.typography.body,
    fontSize: 14.5,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  licensePill: {
    backgroundColor: theme.colors.blue50,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.blue100,
  },
  licenseText: {
    ...theme.typography.overline,
    fontSize: 10,
    color: theme.colors.actionPrimary,
    fontWeight: '800',
  },
  pkgDesc: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate500,
  },
});
