/**
 * Delete Account Boundary Route (/delete-account)
 * Informational boundary explaining institutional account removal procedures.
 * Strictly frontend-only: No fake server deletion is simulated.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../src/theme';
import { useLanguage } from '../src/context';
import { AppBackButton } from '../src/components/navigation';

export default function DeleteAccountPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { language } = useLanguage();

  const isTamil = language === 'ta';

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
            {isTamil ? 'கணக்கு நீக்கம்' : 'Account Deletion'}
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>⚠️</Text>
          </View>
          <Text style={styles.cardTitle}>
            {isTamil ? 'மாணவர் கணக்கை நீக்குதல்' : 'Delete Student Account'}
          </Text>
          <Text style={styles.cardSubtitle}>
            {isTamil
              ? 'கணக்கு நீக்கம் உங்கள் சுயவிவரம், பெற்ற புள்ளிகள் மற்றும் கற்றல் முன்னேற்றத்தை நிரந்தரமாக அகற்றும். கல்வி நிறுவன தரவு மேலாண்மை கொள்கையின்படி, முழுமையான நீக்கம் சர்வர் ஒருங்கிணைப்புக்குப் பின் செயல்படுத்தப்படும்.'
              : 'Account deletion will permanently remove your account, points, streaks, and associated learning data. Full deletion requests will be processed once live institutional server sync is enabled.'}
          </Text>

          <View style={styles.noticeBox}>
            <Text style={styles.noticeText}>
              ℹ️ {isTamil
                ? 'தற்போதைய டெமோ பதிப்பில் தரவை மீட்டமைக்க, சுயவிவரப் பக்கத்தில் "Reset Demo Data" பயன்படுத்தவும்.'
                : 'In this demo version, use "Reset Demo Data" on the Profile screen to clear local state.'}
            </Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => router.back()}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelBtnText}>
                {isTamil ? 'ரத்துசெய்' : 'Cancel'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => router.back()}
              activeOpacity={0.8}
            >
              <Text style={styles.backBtnText}>
                {isTamil ? 'திரும்புக' : 'Go Back'}
              </Text>
            </TouchableOpacity>
          </View>
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
    color: theme.colors.error,
    flex: 1,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.errorBorder,
    padding: theme.spacing.xl,
    alignItems: 'center',
    shadowColor: theme.colors.error,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.errorBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.errorBorder,
  },
  icon: {
    fontSize: 28,
  },
  cardTitle: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    textAlign: 'center',
    marginBottom: 6,
  },
  cardSubtitle: {
    ...theme.typography.body,
    fontSize: 13,
    color: theme.colors.slate600,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  noticeBox: {
    backgroundColor: theme.colors.gray50,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: 12,
    marginBottom: 20,
    width: '100%',
  },
  noticeText: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.navy900,
    lineHeight: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  cancelBtn: {
    flex: 1,
    height: 46,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBtnText: {
    ...theme.typography.button,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  backBtn: {
    flex: 1,
    height: 46,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.actionPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtnText: {
    ...theme.typography.button,
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.textOnAction,
  },
});
