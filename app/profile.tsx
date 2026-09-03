/**
 * Student Profile & Settings Screen (/profile)
 * Displays student learning progress, account info, legal/info links,
 * demo reset controls, and clean logout flow.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { theme } from '../src/theme';
import { authService, SessionRepository, AuthSession } from '../src/features/auth';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage } from '../src/config/i18n';
import { AppBackButton } from '../src/components/navigation';

interface StoredProfile {
  fullName?: string;
  grade?: string;
  section?: string;
  school?: string;
  city?: string;
  points?: number;
  streak?: number;
}

export default function ProfilePage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [session, setSession] = useState<AuthSession | null>(null);
  const [profile, setProfile] = useState<StoredProfile | null>(null);

  // Load session and profile
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const [activeSession, storedProfile, storedLang] = await Promise.all([
          SessionRepository.getSession(),
          storage.getItem<StoredProfile>(STORAGE_KEYS.STUDENT_PROFILE),
          storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE),
        ]);

        if (isMounted) {
          if (activeSession) setSession(activeSession);
          if (storedProfile) setProfile(storedProfile);
          if (storedLang === 'en' || storedLang === 'ta') setLanguage(storedLang);
        }
      } catch {
        // Keep defaults
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const isTamil = language === 'ta';

  // Logout Handler
  const handleLogout = useCallback(async () => {
    await authService.logout();
    router.replace('/auth-welcome');
  }, [router]);

  // Reset Demo Data Handler
  const handleResetDemo = useCallback(async () => {
    await authService.resetDemo();
    router.replace('/welcome');
  }, [router]);

  const initials = (profile?.fullName || session?.fullName || 'Anu')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* Top Header */}
      <View
        style={[
          styles.topBar,
          {
            paddingTop: Math.max(insets.top + 8, Platform.OS === 'android' ? 28 : 16),
          },
        ]}
      >
        <AppBackButton
          onPress={() => router.back()}
          language={language}
          accessibilityLabel={isTamil ? 'பின்னால் செல்லவும்' : 'Go back'}
          accessibilityHint={isTamil ? 'முந்தைய திரைக்குத் திரும்பும்' : 'Returns to the previous screen'}
        />

        <Text style={styles.headerTitle}>{isTamil ? 'மாணவர் சுயவிவரம்' : 'Student Profile'}</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: Math.max(insets.bottom + 24, 32),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Overview Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitials}>{initials}</Text>
          </View>
          <Text style={styles.studentName}>{profile?.fullName || session?.fullName || 'Vigyaan Student'}</Text>
          <Text style={styles.studentMeta}>
            {profile?.grade || 'Grade 9'} • {isTamil ? 'பிரிவு' : 'Section'} {profile?.section || 'A'}
          </Text>
          <Text style={styles.schoolName}>{profile?.school || 'R.M.K. Science Academy'}</Text>

          {session?.authMode === 'demo' && (
            <View style={styles.demoBadge}>
              <Text style={styles.demoBadgeText}>✨ {isTamil ? 'டெமோ முறை' : 'DEMO MODE SESSION'}</Text>
            </View>
          )}
        </View>

        {/* Academic Settings & Legal Links */}
        <Text style={styles.sectionTitle}>{isTamil ? 'விருப்பத்தேர்வுகள் & தகவல்' : 'Preferences & Info'}</Text>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/language')}
          activeOpacity={0.75}
        >
          <Text style={styles.menuIcon}>🌐</Text>
          <View style={styles.menuContent}>
            <Text style={styles.menuLabel}>{isTamil ? 'மொழி தேர்வு' : 'Language'}</Text>
            <Text style={styles.menuSub}>{isTamil ? 'தமிழ்' : 'English'}</Text>
          </View>
          <Text style={styles.menuChevron}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/about')}
          activeOpacity={0.75}
        >
          <Text style={styles.menuIcon}>ℹ️</Text>
          <View style={styles.menuContent}>
            <Text style={styles.menuLabel}>{isTamil ? 'விஞ்ஞான் பற்றி' : 'About Vigyaan'}</Text>
            <Text style={styles.menuSub}>R.M.K. Group of Institutions</Text>
          </View>
          <Text style={styles.menuChevron}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/settings')}
          activeOpacity={0.75}
        >
          <Text style={styles.menuIcon}>⚙️</Text>
          <View style={styles.menuContent}>
            <Text style={styles.menuLabel}>{isTamil ? 'அமைப்புகள்' : 'Settings'}</Text>
            <Text style={styles.menuSub}>{isTamil ? 'பயன்பாட்டு விருப்பங்கள்' : 'Preferences & account'}</Text>
          </View>
          <Text style={styles.menuChevron}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/help')}
          activeOpacity={0.75}
        >
          <Text style={styles.menuIcon}>❓</Text>
          <View style={styles.menuContent}>
            <Text style={styles.menuLabel}>{isTamil ? 'உதவி & வழிகாட்டல்' : 'Help & FAQ'}</Text>
            <Text style={styles.menuSub}>{isTamil ? 'வினாக்கள் & உதவி' : 'Student support'}</Text>
          </View>
          <Text style={styles.menuChevron}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/terms')}
          activeOpacity={0.75}
        >
          <Text style={styles.menuIcon}>📜</Text>
          <View style={styles.menuContent}>
            <Text style={styles.menuLabel}>
              {isTamil ? 'விதிமுறைகள் & நிபந்தனைகள்' : 'Terms & Conditions'}
            </Text>
            <Text style={styles.menuSub}>{isTamil ? 'பயன்பாட்டு விதிமுறைகள்' : 'Usage guidelines'}</Text>
          </View>
          <Text style={styles.menuChevron}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/privacy')}
          activeOpacity={0.75}
        >
          <Text style={styles.menuIcon}>🔒</Text>
          <View style={styles.menuContent}>
            <Text style={styles.menuLabel}>{isTamil ? 'தனியுரிமைக் கொள்கை' : 'Privacy Policy'}</Text>
            <Text style={styles.menuSub}>{isTamil ? 'தரவு பாதுகாப்பு' : 'Student data protection'}</Text>
          </View>
          <Text style={styles.menuChevron}>→</Text>
        </TouchableOpacity>

        {/* Development Controls */}
        <Text style={styles.sectionTitle}>{isTamil ? 'கணக்கு மேலாண்மை' : 'Account Actions'}</Text>

        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetDemo}
          activeOpacity={0.8}
        >
          <Text style={styles.resetButtonText}>
            🔄 {isTamil ? 'டெமோ தரவை மீட்டமை' : 'Reset Demo Data'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutButtonText}>
            🚪 {isTamil ? 'வெளியேறு' : 'Log Out'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.sm,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    ...theme.typography.h3,
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.base,
  },
  profileCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.brandPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: theme.colors.purple200,
  },
  avatarInitials: {
    ...theme.typography.h2,
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  studentName: {
    ...theme.typography.h2,
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginBottom: 2,
  },
  studentMeta: {
    ...theme.typography.body,
    fontSize: 14,
    color: theme.colors.brandPrimary,
    fontWeight: '700',
    marginBottom: 2,
  },
  schoolName: {
    ...theme.typography.caption,
    fontSize: 12.5,
    color: theme.colors.slate600,
  },
  demoBadge: {
    backgroundColor: theme.colors.purple100,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
    marginTop: 10,
  },
  demoBadgeText: {
    ...theme.typography.overline,
    fontSize: 9.5,
    color: theme.colors.brandPrimary,
    letterSpacing: 1.1,
    fontWeight: '700',
  },
  sectionTitle: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.navy900,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginTop: 6,
  },
  menuItem: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 3,
    elevation: 1,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    ...theme.typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  menuSub: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.slate600,
    marginTop: 1,
  },
  menuChevron: {
    fontSize: 16,
    color: theme.colors.slate400,
    fontWeight: '700',
  },
  resetButton: {
    backgroundColor: theme.colors.warningSurface,
    borderWidth: 1,
    borderColor: theme.colors.warningBorder,
    borderRadius: theme.borderRadius.md,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 4,
  },
  resetButtonText: {
    ...theme.typography.button,
    fontSize: 13.5,
    fontWeight: '700',
    color: theme.colors.warning,
  },
  logoutButton: {
    backgroundColor: theme.colors.errorSurface,
    borderWidth: 1,
    borderColor: theme.colors.errorBorder,
    borderRadius: theme.borderRadius.md,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    ...theme.typography.button,
    fontSize: 13.5,
    fontWeight: '700',
    color: '#EF4444',
  },
});
