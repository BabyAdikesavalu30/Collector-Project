/**
 * SettingsScreen Component
 * Complete Settings & Control Center for the Vigyaan Student Experience.
 * Organizes Account, Preferences, Notifications, Learning, Quiz, Sound,
 * Accessibility, Privacy, Storage, Support, About, and Danger Zone.
 */

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import {
  AppSettings,
  DEFAULT_APP_SETTINGS,
  settingsRepository,
  getSearchItems,
  SettingsSearchItem,
  SelectionOption,
} from '../../features/settings';
import { SettingsHeader } from './SettingsHeader';
import { SettingsSearch } from './SettingsSearch';
import { QuickSettingsBar } from './QuickSettingsBar';
import { SettingsSectionCard } from './SettingsSectionCard';
import { SettingsNavigationRow } from './SettingsNavigationRow';
import { SettingsSwitchRow } from './SettingsSwitchRow';
import { SettingsValueRow } from './SettingsValueRow';
import { SettingsSelectionModal } from './SettingsSelectionModal';
import { SettingsConfirmationModal } from './SettingsConfirmationModal';
import { SettingsDangerZone } from './SettingsDangerZone';
import { SettingsLogoutButton } from './SettingsLogoutButton';

interface SettingsScreenProps {
  language?: SupportedLanguage;
  onBack: () => void;
  onNavigate: (route: string) => void;
  onLogout: () => void;
}

type ActiveModal =
  | null
  | 'theme'
  | 'textScale'
  | 'dailyLearningGoal'
  | 'questionsPerQuiz'
  | 'difficulty'
  | 'preferredSubject'
  | 'preferredLevel'
  | 'confirmLogout'
  | 'confirmClearCache'
  | 'confirmResetPreferences';

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  language = 'en',
  onBack,
  onNavigate,
  onLogout,
}) => {
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).settingsScreen;

  const [settings, setSettings] = useState<AppSettings>(DEFAULT_APP_SETTINGS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  // Load persisted settings
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const loaded = await settingsRepository.getSettings();
      if (isMounted) setSettings(loaded);
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const noticeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);
    };
  }, []);

  // Show transient notice
  const showNotice = (msg: string) => {
    if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);
    setStatusNotice(msg);
    noticeTimerRef.current = setTimeout(() => {
      setStatusNotice(null);
    }, 2800);
  };

  // Toggle handler
  const handleToggle = useCallback(
    async <K extends keyof AppSettings>(key: K) => {
      const currentVal = Boolean(settings[key]);
      const nextVal = !currentVal;

      setSettings((prev) => ({ ...prev, [key]: nextVal }));
      await settingsRepository.saveSettings({ [key]: nextVal } as Partial<AppSettings>);
    },
    [settings]
  );

  // Value select handler
  const handleSelectValue = useCallback(
    async <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
      await settingsRepository.saveSettings({ [key]: value } as Partial<AppSettings>);
    },
    []
  );

  // Clear cache handler
  const handleExecuteClearCache = useCallback(async () => {
    setActiveModal(null);
    const cleared = await settingsRepository.clearCachedData();
    if (cleared) {
      showNotice(language === 'ta' ? 'தற்காலிக சேமிப்பு நீக்கப்பட்டது!' : 'Cached data cleared successfully!');
    }
  }, [language]);

  // Reset preferences handler
  const handleExecuteResetPreferences = useCallback(async () => {
    setActiveModal(null);
    const restored = await settingsRepository.resetPreferences();
    setSettings(restored);
    showNotice(language === 'ta' ? 'அமைப்புகள் இயல்புநிலைக்கு மாற்றப்பட்டன!' : 'Preferences restored to default!');
  }, [language]);

  // Search items filter
  const allSearchItems = useMemo(() => getSearchItems(language), [language]);
  const filteredSearchItems = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return allSearchItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.section.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.toLowerCase().includes(q))
    );
  }, [searchQuery, allSearchItems]);

  // Option lists for modals
  const themeOptions: SelectionOption[] = [
    { value: 'system', label: language === 'ta' ? 'கணினி இயல்பு' : 'System Default', subtitle: language === 'ta' ? 'சாதன அமைப்பைப் பின்பற்றவும்' : 'Match device appearance' },
    { value: 'light', label: language === 'ta' ? 'வெளிர் தீம் (Light)' : 'Light', subtitle: language === 'ta' ? 'முத்து வெள்ளை பின்னணி' : 'Crisp Pearl White' },
    { value: 'dark', label: language === 'ta' ? 'இருண்ட தீம் (Dark)' : 'Dark', subtitle: language === 'ta' ? 'இரவு நேரக் கற்றல்' : 'Deep obsidian night mode' },
  ];

  const textScaleOptions: SelectionOption[] = [
    { value: 'small', label: language === 'ta' ? 'சிறிய (Small)' : 'Small', subtitle: '90% scale' },
    { value: 'default', label: language === 'ta' ? 'இயல்புநிலை (Default)' : 'Default', subtitle: '100% scale' },
    { value: 'large', label: language === 'ta' ? 'பெரிய (Large)' : 'Large', subtitle: '115% scale' },
    { value: 'extraLarge', label: language === 'ta' ? 'மிக பெரிய (Extra Large)' : 'Extra Large', subtitle: '130% scale' },
  ];

  const goalOptions: SelectionOption[] = [
    { value: '5', label: '5 min', subtitle: language === 'ta' ? 'விரைவுப் பயிற்சி' : 'Quick daily check-in' },
    { value: '10', label: '10 min', subtitle: language === 'ta' ? 'பரிந்துரைக்கப்படும் இலக்கு' : 'Recommended pace' },
    { value: '15', label: '15 min', subtitle: language === 'ta' ? 'ஆழ்ந்த கற்றல்' : 'Deep study session' },
    { value: '20', label: '20 min', subtitle: language === 'ta' ? 'விரிவான பயிற்சி' : 'Thorough mastery' },
    { value: '30', label: '30 min', subtitle: language === 'ta' ? 'தீவிர அறிவியல் ஆய்வு' : 'Advanced scholarship' },
  ];

  const questionCountOptions: SelectionOption[] = [
    { value: '5', label: '5 questions', subtitle: language === 'ta' ? 'குறுகிய வினாடி வினா' : 'Sprint quiz' },
    { value: '10', label: '10 questions', subtitle: language === 'ta' ? 'நிலையான வினாடி வினா' : 'Standard quiz' },
    { value: '15', label: '15 questions', subtitle: language === 'ta' ? 'நீட்டிக்கப்பட்ட பயிற்சி' : 'Extended quiz' },
    { value: '20', label: '20 questions', subtitle: language === 'ta' ? 'முழுமையான மதிப்பீடு' : 'Comprehensive test' },
    { value: '30', label: '30 questions', subtitle: language === 'ta' ? 'தேர்வு மாதிரி மதிப்பீடு' : 'Full exam mode' },
  ];

  const difficultyOptions: SelectionOption[] = [
    { value: 'beginner', label: language === 'ta' ? 'தொடக்க நிலை' : 'Beginner', subtitle: language === 'ta' ? 'அடிப்படை அறிவியல் கோட்பாடுகள்' : 'Foundational concepts' },
    { value: 'intermediate', label: language === 'ta' ? 'இடைநிலை' : 'Intermediate', subtitle: language === 'ta' ? 'கருத்தியல் பயன்பாட்டு வினாக்கள்' : 'Application questions' },
    { value: 'advanced', label: language === 'ta' ? 'உயர்நிலை' : 'Advanced', subtitle: language === 'ta' ? 'போட்டித் தேர்வு கடினத்தன்மை' : 'Challenging analytical queries' },
  ];

  const subjectOptions: SelectionOption[] = [
    { value: 'physics', label: language === 'ta' ? 'இயற்பியல்' : 'Physics', subtitle: language === 'ta' ? 'விசை, இயக்கம் மற்றும் ஆற்றல்' : 'Force, motion & energy' },
    { value: 'chemistry', label: language === 'ta' ? 'வேதியியல்' : 'Chemistry', subtitle: language === 'ta' ? 'அணுக்கள் & வேதிவினைகள்' : 'Atoms & chemical reactions' },
    { value: 'biology', label: language === 'ta' ? 'உயிரியல்' : 'Biology', subtitle: language === 'ta' ? 'உயிரினங்கள் & தாவரவியல்' : 'Life systems & organisms' },
  ];

  const levelOptions: SelectionOption[] = [
    { value: 'foundation', label: language === 'ta' ? 'வகுப்புகள் 6–7' : 'Classes 6–7', subtitle: language === 'ta' ? 'அடிப்படை நிலை' : 'Foundation' },
    { value: 'core', label: language === 'ta' ? 'வகுப்புகள் 8–10' : 'Classes 8–10', subtitle: language === 'ta' ? 'முதன்மை நிலை' : 'Core Learning' },
    { value: 'advanced', label: language === 'ta' ? 'வகுப்புகள் 11–12' : 'Classes 11–12', subtitle: language === 'ta' ? 'மேல்நிலை' : 'Advanced' },
  ];

  const getSubjectLabel = (val: string) => {
    if (val === 'physics') return language === 'ta' ? 'இயற்பியல்' : 'Physics';
    if (val === 'chemistry') return language === 'ta' ? 'வேதியியல்' : 'Chemistry';
    return language === 'ta' ? 'உயிரியல்' : 'Biology';
  };

  const getLevelLabel = (val: string) => {
    if (val === 'foundation') return 'Classes 6–7';
    if (val === 'core') return 'Classes 8–10';
    return 'Classes 11–12';
  };

  const getDifficultyLabel = (val: string) => {
    if (val === 'beginner') return language === 'ta' ? 'தொடக்க நிலை' : 'Beginner';
    if (val === 'intermediate') return language === 'ta' ? 'இடைநிலை' : 'Intermediate';
    return language === 'ta' ? 'உயர்நிலை' : 'Advanced';
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      <ScrollView
        style={styles.scrollBody}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top + 8, Platform.OS === 'android' ? 28 : 16),
            paddingBottom: Math.max(insets.bottom + 24, 32),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <SettingsHeader language={language} onBack={onBack} />

        {/* Status Notice Toast */}
        {Boolean(statusNotice) && (
          <View style={styles.noticeToast}>
            <Text style={styles.noticeText}>✓ {statusNotice}</Text>
          </View>
        )}

        {/* Local Search Input */}
        <SettingsSearch
          value={searchQuery}
          language={language}
          onChangeText={setSearchQuery}
          onClear={() => setSearchQuery('')}
        />

        {/* If searching: display matching items */}
        {searchQuery.trim().length > 0 ? (
          <View style={styles.searchResultsContainer}>
            {filteredSearchItems.length > 0 ? (
              <SettingsSectionCard title={`${filteredSearchItems.length} ${language === 'ta' ? 'முடிவுகள்' : 'Results'}`}>
                {filteredSearchItems.map((item, idx) => {
                  if (item.actionType === 'toggle' && item.targetKey) {
                    return (
                      <SettingsSwitchRow
                        key={item.id}
                        icon={item.icon}
                        title={item.title}
                        subtitle={item.subtitle}
                        value={Boolean(settings[item.targetKey])}
                        showBorder={idx < filteredSearchItems.length - 1}
                        onValueChange={() => item.targetKey && handleToggle(item.targetKey)}
                      />
                    );
                  }

                  return (
                    <SettingsNavigationRow
                      key={item.id}
                      icon={item.icon}
                      title={item.title}
                      subtitle={item.subtitle}
                      showBorder={idx < filteredSearchItems.length - 1}
                      onPress={() => {
                        if (item.actionType === 'navigate' && item.targetRoute) {
                          onNavigate(item.targetRoute);
                        } else if (item.actionType === 'modal' && item.modalType) {
                          if (item.modalType === 'clearCache') setActiveModal('confirmClearCache');
                          else if (item.modalType === 'resetPreferences') setActiveModal('confirmResetPreferences');
                          else setActiveModal(item.modalType as ActiveModal);
                        }
                      }}
                    />
                  );
                })}
              </SettingsSectionCard>
            ) : (
              <View style={styles.emptySearchCard} accessible={true} accessibilityRole="summary">
                <Text style={styles.emptySearchIcon}>🔍</Text>
                <Text style={styles.emptySearchTitle}>{t.noSearchResults}</Text>
                <Text style={styles.emptySearchSubtitle}>{t.noSearchSubtitle}</Text>
              </View>
            )}
          </View>
        ) : (
          /* Normal grouped sections */
          <>
            {/* Quick Settings Bar */}
            <QuickSettingsBar
              settings={settings}
              language={language}
              onOpenLanguage={() => onNavigate('/language')}
              onOpenTheme={() => setActiveModal('theme')}
              onOpenTextScale={() => setActiveModal('textScale')}
              onToggleQuickNotifications={() => handleToggle('generalNotifications')}
            />

            {/* 1. Account Section */}
            <SettingsSectionCard title={t.accountSection}>
              <SettingsNavigationRow
                icon="👤"
                title={t.profileTitle}
                subtitle={t.profileSubtitle}
                onPress={() => onNavigate('/profile')}
              />
              <SettingsNavigationRow
                icon="🎓"
                title={t.studentInfoTitle}
                subtitle={t.studentInfoSubtitle}
                onPress={() => onNavigate('/profile-academic')}
              />
              <SettingsNavigationRow
                icon="📋"
                title={t.accountInfoTitle}
                subtitle={t.accountInfoSubtitle}
                showBorder={false}
                onPress={() => onNavigate('/profile')}
              />
            </SettingsSectionCard>

            {/* 2. Preferences Section */}
            <SettingsSectionCard title={t.preferencesSection}>
              <SettingsNavigationRow
                icon="🌐"
                title={t.languageTitle}
                value={language === 'ta' ? 'தமிழ்' : 'English'}
                onPress={() => onNavigate('/language')}
              />
              <SettingsValueRow
                icon="◐"
                title={t.themeTitle}
                value={settings.theme === 'system' ? 'System' : settings.theme === 'light' ? 'Light' : 'Dark'}
                onPress={() => setActiveModal('theme')}
              />
              <SettingsValueRow
                icon="🔤"
                title={t.textScaleTitle}
                value={settings.textScale.toUpperCase()}
                onPress={() => setActiveModal('textScale')}
              />
              <SettingsSwitchRow
                icon="⚡"
                title={t.reduceMotionTitle}
                subtitle={t.reduceMotionSubtitle}
                value={settings.reduceMotion}
                showBorder={false}
                onValueChange={() => handleToggle('reduceMotion')}
              />
            </SettingsSectionCard>

            {/* 3. Notifications Section */}
            <SettingsSectionCard title={t.notificationsSection}>
              <SettingsSwitchRow
                icon="🔔"
                title={t.generalNotifTitle}
                subtitle={t.generalNotifSubtitle}
                value={settings.generalNotifications}
                onValueChange={() => handleToggle('generalNotifications')}
              />
              <SettingsSwitchRow
                icon="⚡"
                title={t.dailyChallengeTitle}
                subtitle={t.dailyChallengeSubtitle}
                value={settings.dailyChallengeNotifications}
                onValueChange={() => handleToggle('dailyChallengeNotifications')}
              />
              <SettingsSwitchRow
                icon="⏰"
                title={t.quizRemindersTitle}
                subtitle={t.quizRemindersSubtitle}
                value={settings.quizReminders}
                onValueChange={() => handleToggle('quizReminders')}
              />
              <SettingsSwitchRow
                icon="🏅"
                title={t.achievementTitle}
                subtitle={t.achievementSubtitle}
                value={settings.achievementNotifications}
                onValueChange={() => handleToggle('achievementNotifications')}
              />
              <SettingsSwitchRow
                icon="🔥"
                title={t.streakTitle}
                subtitle={t.streakSubtitle}
                value={settings.streakReminders}
                onValueChange={() => handleToggle('streakReminders')}
              />
              <SettingsSwitchRow
                icon="🏆"
                title={t.leaderboardTitle}
                subtitle={t.leaderboardSubtitle}
                value={settings.leaderboardNotifications}
                onValueChange={() => handleToggle('leaderboardNotifications')}
              />
              <SettingsSwitchRow
                icon="💡"
                title={t.learningRecTitle}
                subtitle={t.learningRecSubtitle}
                value={settings.learningRecommendations}
                showBorder={false}
                onValueChange={() => handleToggle('learningRecommendations')}
              />
            </SettingsSectionCard>

            {/* 4. Learning Preferences */}
            <SettingsSectionCard title={t.learningSection}>
              <SettingsValueRow
                icon="📚"
                title={t.preferredSubjectTitle}
                value={getSubjectLabel(settings.preferredSubject)}
                onPress={() => setActiveModal('preferredSubject')}
              />
              <SettingsValueRow
                icon="🏫"
                title={t.preferredLevelTitle}
                value={getLevelLabel(settings.preferredLevel)}
                onPress={() => setActiveModal('preferredLevel')}
              />
              <SettingsValueRow
                icon="🎯"
                title={t.dailyGoalTitle}
                value={`${settings.dailyLearningGoal} min`}
                onPress={() => setActiveModal('dailyLearningGoal')}
              />
              <SettingsValueRow
                icon="📊"
                title={t.difficultyTitle}
                value={getDifficultyLabel(settings.difficulty)}
                showBorder={false}
                onPress={() => setActiveModal('difficulty')}
              />
            </SettingsSectionCard>

            {/* 5. Quiz Preferences */}
            <SettingsSectionCard title={t.quizSection}>
              <SettingsValueRow
                icon="❓"
                title={t.questionsPerQuizTitle}
                value={`${settings.questionsPerQuiz}`}
                onPress={() => setActiveModal('questionsPerQuiz')}
              />
              <SettingsSwitchRow
                icon="⏱️"
                title={t.timerTitle}
                subtitle={t.timerSubtitle}
                value={settings.quizTimer}
                onValueChange={() => handleToggle('quizTimer')}
              />
              <SettingsSwitchRow
                icon="🔊"
                title={t.quizSoundTitle}
                subtitle={t.quizSoundSubtitle}
                value={settings.quizSound}
                onValueChange={() => handleToggle('quizSound')}
              />
              <SettingsSwitchRow
                icon="📖"
                title={t.answerExplanationTitle}
                subtitle={t.answerExplanationSubtitle}
                value={settings.answerExplanation}
                onValueChange={() => handleToggle('answerExplanation')}
              />
              <SettingsSwitchRow
                icon="⏩"
                title={t.autoAdvanceTitle}
                subtitle={t.autoAdvanceSubtitle}
                value={settings.autoAdvance}
                onValueChange={() => handleToggle('autoAdvance')}
              />
              <SettingsSwitchRow
                icon="🛡️"
                title={t.confirmFinishTitle}
                subtitle={t.confirmFinishSubtitle}
                value={settings.confirmBeforeFinish}
                showBorder={false}
                onValueChange={() => handleToggle('confirmBeforeFinish')}
              />
            </SettingsSectionCard>

            {/* 6. Sound & Haptics */}
            <SettingsSectionCard title={t.soundSection}>
              <SettingsSwitchRow
                icon="🔊"
                title={t.soundEffectsTitle}
                subtitle={t.soundEffectsSubtitle}
                value={settings.soundEffects}
                onValueChange={() => handleToggle('soundEffects')}
              />
              <SettingsSwitchRow
                icon="✨"
                title={t.successSoundsTitle}
                subtitle={t.successSoundsSubtitle}
                value={settings.successSounds}
                onValueChange={() => handleToggle('successSounds')}
              />
              <SettingsSwitchRow
                icon="⚠️"
                title={t.errorSoundsTitle}
                subtitle={t.errorSoundsSubtitle}
                value={settings.errorSounds}
                onValueChange={() => handleToggle('errorSounds')}
              />
              <SettingsSwitchRow
                icon="📳"
                title={t.hapticsTitle}
                subtitle={t.hapticsSubtitle}
                value={settings.haptics}
                showBorder={false}
                onValueChange={() => handleToggle('haptics')}
              />
            </SettingsSectionCard>

            {/* 7. Accessibility */}
            <SettingsSectionCard title={t.accessibilitySection}>
              <SettingsSwitchRow
                icon="👁️"
                title={t.highContrastTitle}
                subtitle={t.highContrastSubtitle}
                value={settings.highContrast}
                onValueChange={() => handleToggle('highContrast')}
              />
              <SettingsSwitchRow
                icon="🗣️"
                title={t.screenReaderTitle}
                subtitle={t.screenReaderSubtitle}
                value={settings.screenReaderFriendly}
                onValueChange={() => handleToggle('screenReaderFriendly')}
              />
              <SettingsSwitchRow
                icon="⚡"
                title={t.reduceMotionTitle}
                subtitle={t.reduceMotionSubtitle}
                value={settings.reduceMotion}
                showBorder={false}
                onValueChange={() => handleToggle('reduceMotion')}
              />
            </SettingsSectionCard>

            {/* 8. Privacy & Security */}
            <SettingsSectionCard title={t.privacySection}>
              <SettingsNavigationRow
                icon="🔒"
                title={t.securityTitle}
                subtitle={t.securitySubtitle}
                onPress={() => onNavigate('/account-security')}
              />
              <SettingsSwitchRow
                icon="📊"
                title={t.analyticsTitle}
                subtitle={t.analyticsSubtitle}
                value={settings.analyticsEnabled}
                onValueChange={() => handleToggle('analyticsEnabled')}
              />
              <SettingsSwitchRow
                icon="🎯"
                title={t.recommendationsTitle}
                subtitle={t.recommendationsSubtitle}
                value={settings.personalizedRecommendations}
                onValueChange={() => handleToggle('personalizedRecommendations')}
              />
              <SettingsSwitchRow
                icon="👥"
                title={t.usageSharingTitle}
                subtitle={t.usageSharingSubtitle}
                value={settings.usageDataSharing}
                showBorder={false}
                onValueChange={() => handleToggle('usageDataSharing')}
              />
            </SettingsSectionCard>

            {/* 9. Data & Storage */}
            <SettingsSectionCard title={t.storageSection}>
              <SettingsSwitchRow
                icon="📶"
                title={t.wifiOnlyTitle}
                subtitle={t.wifiOnlySubtitle}
                value={settings.downloadOverWifiOnly}
                onValueChange={() => handleToggle('downloadOverWifiOnly')}
              />
              <SettingsSwitchRow
                icon="📥"
                title={t.autoDownloadTitle}
                subtitle={t.autoDownloadSubtitle}
                value={settings.autoDownloadLessons}
                onValueChange={() => handleToggle('autoDownloadLessons')}
              />
              <SettingsNavigationRow
                icon="🗑️"
                title={t.clearCacheTitle}
                subtitle={t.clearCacheSubtitle}
                showBorder={false}
                onPress={() => setActiveModal('confirmClearCache')}
              />
            </SettingsSectionCard>

            {/* 10. Support */}
            <SettingsSectionCard title={t.supportSection}>
              <SettingsNavigationRow
                icon="❓"
                title={t.helpCenterTitle}
                subtitle={t.helpCenterSubtitle}
                onPress={() => onNavigate('/help')}
              />
              <SettingsNavigationRow
                icon="💡"
                title={t.faqTitle}
                subtitle={t.faqSubtitle}
                onPress={() => onNavigate('/faq')}
              />
              <SettingsNavigationRow
                icon="🚨"
                title={t.reportProblemTitle}
                subtitle={t.reportProblemSubtitle}
                onPress={() => onNavigate('/report-problem')}
              />
              <SettingsNavigationRow
                icon="💬"
                title={t.feedbackTitle}
                subtitle={t.feedbackSubtitle}
                showBorder={false}
                onPress={() => onNavigate('/feedback')}
              />
            </SettingsSectionCard>

            {/* 11. About */}
            <SettingsSectionCard title={t.aboutSection}>
              <SettingsNavigationRow
                icon="ℹ️"
                title={t.aboutTitle}
                subtitle={t.aboutSubtitle}
                onPress={() => onNavigate('/about')}
              />
              <SettingsNavigationRow
                icon="🏷️"
                title={t.versionTitle}
                value="1.0.0 (Production Build)"
                onPress={() => onNavigate('/about')}
              />
              <SettingsNavigationRow
                icon="🔒"
                title={t.privacyPolicyTitle}
                subtitle={t.privacyPolicySubtitle}
                onPress={() => onNavigate('/privacy')}
              />
              <SettingsNavigationRow
                icon="📜"
                title={t.termsTitle}
                subtitle={t.termsSubtitle}
                onPress={() => onNavigate('/terms')}
              />
              <SettingsNavigationRow
                icon="🤝"
                title={t.guidelinesTitle}
                subtitle={t.guidelinesSubtitle}
                onPress={() => onNavigate('/guidelines')}
              />
              <SettingsNavigationRow
                icon="⚖️"
                title={t.licensesTitle}
                subtitle={t.licensesSubtitle}
                showBorder={false}
                onPress={() => onNavigate('/licenses')}
              />
            </SettingsSectionCard>

            {/* 12. Reset Preferences */}
            <SettingsSectionCard title={t.resetSection}>
              <SettingsNavigationRow
                icon="🔄"
                title={t.resetPreferencesTitle}
                subtitle={t.resetPreferencesSubtitle}
                showBorder={false}
                onPress={() => setActiveModal('confirmResetPreferences')}
              />
            </SettingsSectionCard>

            {/* 13. Danger Zone */}
            <SettingsDangerZone
              language={language}
              onDeleteAccount={() => onNavigate('/delete-account')}
            />

            {/* 14. Log Out Button */}
            <SettingsLogoutButton
              language={language}
              onPress={() => setActiveModal('confirmLogout')}
            />
          </>
        )}
      </ScrollView>

      {/* --- Modals & Dialogs --- */}

      {/* Theme Modal */}
      <SettingsSelectionModal
        visible={activeModal === 'theme'}
        title={t.themeTitle}
        options={themeOptions}
        selectedValue={settings.theme}
        language={language}
        onSelect={(val) => handleSelectValue('theme', val as AppSettings['theme'])}
        onClose={() => setActiveModal(null)}
      />

      {/* Text Size Modal */}
      <SettingsSelectionModal
        visible={activeModal === 'textScale'}
        title={t.textScaleTitle}
        options={textScaleOptions}
        selectedValue={settings.textScale}
        language={language}
        onSelect={(val) => handleSelectValue('textScale', val as AppSettings['textScale'])}
        onClose={() => setActiveModal(null)}
      />

      {/* Daily Goal Modal */}
      <SettingsSelectionModal
        visible={activeModal === 'dailyLearningGoal'}
        title={t.dailyGoalTitle}
        options={goalOptions}
        selectedValue={String(settings.dailyLearningGoal)}
        language={language}
        onSelect={(val) => handleSelectValue('dailyLearningGoal', parseInt(val, 10))}
        onClose={() => setActiveModal(null)}
      />

      {/* Questions Count Modal */}
      <SettingsSelectionModal
        visible={activeModal === 'questionsPerQuiz'}
        title={t.questionsPerQuizTitle}
        options={questionCountOptions}
        selectedValue={String(settings.questionsPerQuiz)}
        language={language}
        onSelect={(val) => handleSelectValue('questionsPerQuiz', parseInt(val, 10))}
        onClose={() => setActiveModal(null)}
      />

      {/* Difficulty Modal */}
      <SettingsSelectionModal
        visible={activeModal === 'difficulty'}
        title={t.difficultyTitle}
        options={difficultyOptions}
        selectedValue={settings.difficulty}
        language={language}
        onSelect={(val) => handleSelectValue('difficulty', val as AppSettings['difficulty'])}
        onClose={() => setActiveModal(null)}
      />

      {/* Preferred Subject Modal */}
      <SettingsSelectionModal
        visible={activeModal === 'preferredSubject'}
        title={t.preferredSubjectTitle}
        options={subjectOptions}
        selectedValue={settings.preferredSubject}
        language={language}
        onSelect={(val) => handleSelectValue('preferredSubject', val as AppSettings['preferredSubject'])}
        onClose={() => setActiveModal(null)}
      />

      {/* Preferred Level Modal */}
      <SettingsSelectionModal
        visible={activeModal === 'preferredLevel'}
        title={t.preferredLevelTitle}
        options={levelOptions}
        selectedValue={settings.preferredLevel}
        language={language}
        onSelect={(val) => handleSelectValue('preferredLevel', val as AppSettings['preferredLevel'])}
        onClose={() => setActiveModal(null)}
      />

      {/* Clear Cache Confirmation */}
      <SettingsConfirmationModal
        visible={activeModal === 'confirmClearCache'}
        title={t.clearCacheModalTitle}
        body={t.clearCacheModalBody}
        confirmLabel={t.clear}
        isDestructive={true}
        language={language}
        onConfirm={handleExecuteClearCache}
        onCancel={() => setActiveModal(null)}
      />

      {/* Reset Preferences Confirmation */}
      <SettingsConfirmationModal
        visible={activeModal === 'confirmResetPreferences'}
        title={t.resetModalTitle}
        body={t.resetModalBody}
        confirmLabel={t.reset}
        isDestructive={false}
        language={language}
        onConfirm={handleExecuteResetPreferences}
        onCancel={() => setActiveModal(null)}
      />

      {/* Log Out Confirmation */}
      <SettingsConfirmationModal
        visible={activeModal === 'confirmLogout'}
        title={t.logoutModalTitle}
        body={t.logoutModalBody}
        confirmLabel={t.logoutTitle}
        isDestructive={true}
        language={language}
        onConfirm={() => {
          setActiveModal(null);
          onLogout();
        }}
        onCancel={() => setActiveModal(null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.base,
  },
  noticeToast: {
    backgroundColor: theme.colors.green50,
    borderWidth: 1,
    borderColor: theme.colors.success,
    borderRadius: theme.borderRadius.md,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: theme.spacing.sm,
    alignItems: 'center',
  },
  noticeText: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.success,
  },
  searchResultsContainer: {
    width: '100%',
  },
  emptySearchCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xl,
    alignItems: 'center',
    marginVertical: theme.spacing.md,
  },
  emptySearchIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  emptySearchTitle: {
    ...theme.typography.h2,
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginBottom: 4,
    textAlign: 'center',
  },
  emptySearchSubtitle: {
    ...theme.typography.body,
    fontSize: 12.5,
    color: theme.colors.slate500,
    textAlign: 'center',
  },
});
