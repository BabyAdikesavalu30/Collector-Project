import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { theme } from '../../src/theme';
import { useAccessibility } from '../../src/context';
import { SettingsHeader } from '../../src/components/settings/SettingsHeader';
import { SettingsSectionCard } from '../../src/components/settings/SettingsSectionCard';
import { SettingsSwitchRow } from '../../src/components/settings/SettingsSwitchRow';
import { SettingsValueRow } from '../../src/components/settings/SettingsValueRow';
import { SettingsNavigationRow } from '../../src/components/settings/SettingsNavigationRow';
import { SettingsSelectionModal } from '../../src/components/settings/SettingsSelectionModal';

export default function AccessibilitySettingsPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { preferences, updatePreference, resetPreferences, resetFloatingButtonPosition } = useAccessibility();
  
  const [activeModal, setActiveModal] = React.useState<string | null>(null);

  const textScaleOptions = [
    { value: 'small', label: 'Small', subtitle: '90% scale' },
    { value: 'default', label: 'Default', subtitle: '100% scale' },
    { value: 'large', label: 'Large', subtitle: '115% scale' },
    { value: 'extraLarge', label: 'Extra Large', subtitle: '130% scale' },
  ];
  
  const speechRateOptions = [
    { value: '0.75', label: '0.75x', subtitle: 'Slower' },
    { value: '1', label: '1.0x', subtitle: 'Normal' },
    { value: '1.25', label: '1.25x', subtitle: 'Faster' },
    { value: '1.5', label: '1.5x', subtitle: 'Very Fast' },
  ];

  const handleSelectTextScale = (val: string) => {
    updatePreference('textScale', val as any);
  };
  
  const handleSelectSpeechRate = (val: string) => {
    updatePreference('speechRate', parseFloat(val));
  };

  const getScaleFactor = () => {
    switch (preferences.textScale) {
      case 'small': return 0.9;
      case 'large': return 1.15;
      case 'extraLarge': return 1.3;
      default: return 1;
    }
  };
  
  const scale = getScaleFactor();
  const hc = preferences.highContrast;

  return (
    <View style={[styles.container, hc && styles.highContrastContainer]}>
      <ScrollView
        style={styles.scrollBody}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top + 8, Platform.OS === 'android' ? 28 : 16),
            paddingBottom: Math.max(insets.bottom + 24, 32),
          },
        ]}
      >
        <SettingsHeader 
          language="en" 
          onBack={() => router.back()} 
          // Override text if needed to "Accessibility"
        />

        <Text style={[styles.pageTitle, { fontSize: 28 * scale }, hc && styles.highContrastText]}>
          Accessibility
        </Text>
        
        {/* Visual Support */}
        <SettingsSectionCard title="Visual Support">
          <SettingsValueRow
            icon="🔤"
            title="Text Size"
            value={preferences.textScale.toUpperCase()}
            onPress={() => setActiveModal('textScale')}
          />
          <SettingsSwitchRow
            icon="👁️"
            title="High Contrast"
            subtitle="Improve visibility of controls and text"
            value={preferences.highContrast}
            onValueChange={() => updatePreference('highContrast', !preferences.highContrast)}
          />
        </SettingsSectionCard>

        {/* Reading & Audio */}
        <SettingsSectionCard title="Reading & Audio">
          <SettingsSwitchRow
            icon="🗣️"
            title="Read Aloud"
            subtitle="Enable text-to-speech for lessons and quizzes"
            value={preferences.readAloud}
            onValueChange={() => updatePreference('readAloud', !preferences.readAloud)}
          />
          <SettingsValueRow
            icon="⏱️"
            title="Speech Speed"
            value={`${preferences.speechRate}x`}
            onPress={() => setActiveModal('speechRate')}
          />
        </SettingsSectionCard>

        {/* Focus & Motion */}
        <SettingsSectionCard title="Focus & Motion">
          <SettingsSwitchRow
            icon="🎯"
            title="Focus Mode"
            subtitle="Reduce visual distractions and simplify screens"
            value={preferences.focusMode}
            onValueChange={() => updatePreference('focusMode', !preferences.focusMode)}
          />
          <SettingsSwitchRow
            icon="📝"
            title="Simplified View"
            subtitle="Streamline lesson and quiz presentations"
            value={preferences.simplifiedView}
            onValueChange={() => updatePreference('simplifiedView', !preferences.simplifiedView)}
          />
          <SettingsSwitchRow
            icon="⚡"
            title="Reduce Motion"
            subtitle="Minimize animations and transitions"
            value={preferences.reduceMotion}
            onValueChange={() => updatePreference('reduceMotion', !preferences.reduceMotion)}
            showBorder={false}
          />
        </SettingsSectionCard>

        {/* Interaction */}
        <SettingsSectionCard title="Interaction">
          <SettingsSwitchRow
            icon="👆"
            title="Large Touch Targets"
            subtitle="Increase size of buttons and answers"
            value={preferences.largeTouchTargets}
            onValueChange={() => updatePreference('largeTouchTargets', !preferences.largeTouchTargets)}
          />
        </SettingsSectionCard>

        {/* Floating Assistant */}
        <SettingsSectionCard title="Floating Assistant">
          <SettingsNavigationRow
            icon="🔄"
            title="Reset Position"
            subtitle="Move the floating button back to default location"
            onPress={resetFloatingButtonPosition}
            showBorder={false}
          />
        </SettingsSectionCard>
        
        {/* Reset Preferences */}
        <SettingsSectionCard title="Reset">
          <SettingsNavigationRow
            icon="⚠️"
            title="Reset accessibility preferences"
            subtitle="Restore all accessibility settings to default"
            onPress={resetPreferences}
            showBorder={false}
          />
        </SettingsSectionCard>

      </ScrollView>
      
      {/* Modals */}
      <SettingsSelectionModal
        visible={activeModal === 'textScale'}
        title="Text Size"
        options={textScaleOptions}
        selectedValue={preferences.textScale}
        language="en"
        onSelect={(val) => {
          handleSelectTextScale(val);
          setActiveModal(null);
        }}
        onClose={() => setActiveModal(null)}
      />
      
      <SettingsSelectionModal
        visible={activeModal === 'speechRate'}
        title="Speech Speed"
        options={speechRateOptions}
        selectedValue={String(preferences.speechRate)}
        language="en"
        onSelect={(val) => {
          handleSelectSpeechRate(val);
          setActiveModal(null);
        }}
        onClose={() => setActiveModal(null)}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  highContrastContainer: {
    backgroundColor: '#000',
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  pageTitle: {
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginVertical: 16,
    marginLeft: 8,
  },
  highContrastText: {
    color: '#FFF',
  }
});
