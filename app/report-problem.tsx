/**
 * Report Problem Boundary Route (/report-problem)
 * Bug and science content issue reporting screen.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../src/theme';
import { useLanguage } from '../src/context';
import { AppBackButton } from '../src/components/navigation';

export default function ReportProblemPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { language } = useLanguage();
  const [problemText, setProblemText] = useState<string>('');
  const [category, setCategory] = useState<'content' | 'app' | 'other'>('content');
  const [submitted, setSubmitted] = useState<boolean>(false);

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
            {isTamil ? 'சிக்கலைப் புகாரளிக்கவும்' : 'Report a Problem'}
          </Text>
        </View>

        {submitted ? (
          <View style={styles.card}>
            <Text style={styles.successIcon}>✅</Text>
            <Text style={styles.successTitle}>
              {isTamil ? 'புகார் பதிவு செய்யப்பட்டது' : 'Report Received'}
            </Text>
            <Text style={styles.successBody}>
              {isTamil
                ? 'உங்கள் அறிக்கை பதிவு செய்யப்பட்டுள்ளது. எங்கள் கல்விக் குழு விரைவில் ஆய்வு செய்யும்.'
                : 'Your report has been logged. Our academic moderation team will review it.'}
            </Text>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => router.back()}
              activeOpacity={0.8}
            >
              <Text style={styles.actionBtnText}>
                {isTamil ? 'அமைப்புகளுக்குத் திரும்பு' : 'Back to Settings'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.inputLabel}>
              {isTamil ? 'சிக்கலின் வகை:' : 'Problem Category:'}
            </Text>

            <View style={styles.categoryRow}>
              {(
                [
                  { id: 'content', label: isTamil ? 'வினா / பாடம்' : 'Question / Content' },
                  { id: 'app', label: isTamil ? 'செயலி பிழை' : 'App Bug' },
                  { id: 'other', label: isTamil ? 'பிற' : 'Other' },
                ] as const
              ).map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.catPill, category === cat.id && styles.catPillSelected]}
                  onPress={() => setCategory(cat.id)}
                >
                  <Text style={[styles.catText, category === cat.id && styles.catTextSelected]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.inputLabel}>
              {isTamil ? 'விவரம்:' : 'Description:'}
            </Text>
            <TextInput
              style={styles.textArea}
              value={problemText}
              onChangeText={setProblemText}
              placeholder={
                isTamil ? 'சிக்கலை விரிவாக விவரிக்கவும்...' : 'Describe the issue in detail...'
              }
              placeholderTextColor={theme.colors.slate400}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />

            <TouchableOpacity
              style={[styles.submitBtn, !problemText.trim() && styles.submitBtnDisabled]}
              onPress={() => problemText.trim() && setSubmitted(true)}
              disabled={!problemText.trim()}
              activeOpacity={0.85}
            >
              <Text style={styles.submitBtnText}>
                {isTamil ? 'அறிக்கையை அனுப்புக' : 'Submit Report'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  inputLabel: {
    ...theme.typography.body,
    fontSize: 13.5,
    color: theme.colors.navy900,
    fontWeight: '700',
    marginBottom: 8,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  catPill: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.gray50,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  catPillSelected: {
    backgroundColor: theme.colors.blue50,
    borderColor: theme.colors.actionPrimary,
  },
  catText: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate600,
    fontWeight: '600',
  },
  catTextSelected: {
    color: theme.colors.actionPrimary,
    fontWeight: '800',
  },
  textArea: {
    backgroundColor: theme.colors.gray50,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 12,
    height: 120,
    ...theme.typography.body,
    fontSize: 14,
    color: theme.colors.navy900,
    marginBottom: 16,
  },
  submitBtn: {
    backgroundColor: theme.colors.actionPrimary,
    height: 48,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnDisabled: {
    backgroundColor: theme.colors.gray300,
  },
  submitBtnText: {
    ...theme.typography.button,
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.textOnAction,
  },
  successIcon: {
    fontSize: 44,
    textAlign: 'center',
    marginBottom: 12,
  },
  successTitle: {
    ...theme.typography.h2,
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.navy900,
    textAlign: 'center',
    marginBottom: 8,
  },
  successBody: {
    ...theme.typography.body,
    fontSize: 13.5,
    color: theme.colors.slate600,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  actionBtn: {
    backgroundColor: theme.colors.actionPrimary,
    height: 44,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnText: {
    ...theme.typography.button,
    color: theme.colors.textOnAction,
    fontSize: 14,
    fontWeight: '800',
  },
});
