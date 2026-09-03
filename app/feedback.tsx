/**
 * Feedback Boundary Route (/feedback)
 * Student feedback and suggestions submission screen.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../src/theme';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage } from '../src/config/i18n';
import { AppBackButton } from '../src/components/navigation';

export default function FeedbackPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [feedback, setFeedback] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const stored = await storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE);
      if (stored === 'en' || stored === 'ta') setLanguage(stored);
    })();
  }, []);

  const isTamil = language === 'ta';

  const handleSubmit = () => {
    if (!feedback.trim()) return;
    setSubmitted(true);
  };

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
            {isTamil ? 'கருத்துக்களை அனுப்பவும்' : 'Send Feedback'}
          </Text>
        </View>

        {submitted ? (
          <View style={styles.card}>
            <Text style={styles.successIcon}>🎉</Text>
            <Text style={styles.successTitle}>
              {isTamil ? 'நன்றி!' : 'Thank You!'}
            </Text>
            <Text style={styles.successBody}>
              {isTamil
                ? 'உங்கள் கருத்து பெறப்பட்டது. விஞ்ஞான் செயலியை மேம்படுத்த உங்கள் பரிந்துரைகள் உதவும்.'
                : 'Your feedback has been received. Thank you for helping us improve Vigyaan!'}
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
              {isTamil
                ? 'செயலியை மேம்படுத்த உங்கள் கருத்துக்கள் அல்லது பரிந்துரைகளைப் பகிரவும்:'
                : 'Share your suggestions, ideas, or feedback to improve Vigyaan:'}
            </Text>
            <TextInput
              style={styles.textArea}
              value={feedback}
              onChangeText={setFeedback}
              placeholder={
                isTamil ? 'உங்கள் கருத்தை இங்கே எழுதவும்...' : 'Type your feedback here...'
              }
              placeholderTextColor={theme.colors.slate400}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />

            <TouchableOpacity
              style={[styles.submitBtn, !feedback.trim() && styles.submitBtnDisabled]}
              onPress={handleSubmit}
              disabled={!feedback.trim()}
              activeOpacity={0.85}
            >
              <Text style={styles.submitBtnText}>
                {isTamil ? 'சமர்ப்பிக்கவும்' : 'Submit Feedback'}
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
    fontSize: 14,
    color: theme.colors.navy900,
    fontWeight: '600',
    marginBottom: 12,
    lineHeight: 20,
  },
  textArea: {
    backgroundColor: theme.colors.gray50,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 12,
    height: 140,
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
    fontSize: 48,
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
