import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// @ts-ignore
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';
import { useAccessibility } from '../../context';
import { useRouter, usePathname } from 'expo-router';

interface AccessibilityQuickPanelProps {
  onClose: () => void;
}

export const AccessibilityQuickPanel: React.FC<AccessibilityQuickPanelProps> = ({ onClose }) => {
  const { preferences, updatePreference, toggleFocusMode, toggleLargeTouchTargets, readAloud, stopReading } = useAccessibility();
  const router = useRouter();
  const pathname = usePathname();

  const [expandedSection, setExpandedSection] = useState<'visual' | 'read' | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Status computation
  const activeCount = [
    preferences.highContrast,
    preferences.focusMode,
    preferences.largeTouchTargets,
    preferences.textScale !== 'default'
  ].filter(Boolean).length;
  
  const statusMessage = activeCount > 0 
    ? `${activeCount} accessibility tools active` 
    : 'Accessibility ready';

  const handleNavigateSettings = () => {
    onClose();
    router.push('/settings/accessibility');
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

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopReading();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      if (pathname.includes('quiz')) {
        readAloud('Question active. Please select an option to hear it.');
      } else {
        readAloud('Screen content active for read aloud.');
      }
    }
  };

  const handleToggleExpand = (section: 'visual' | 'read') => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <View style={styles.overlay}>
      {/* Background dismissal area */}
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Close accessibility support" />
      
      <SafeAreaView style={[styles.sheet, hc && styles.hcSheet]}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerTitleGroup}>
            <Text style={[styles.title, hc && styles.hcText, { fontSize: 20 * scale }]} accessibilityRole="header">Accessibility Support</Text>
            <Text style={[styles.subtitle, hc && styles.hcTextSecondary, { fontSize: 14 * scale }]}>Make Vigyaan easier to use</Text>
            
            <View style={styles.statusBadge}>
              <Text style={[styles.statusText, hc && styles.hcTextSecondary, { fontSize: 12 * scale }]}>{statusMessage}</Text>
            </View>
          </View>
          <TouchableOpacity 
            onPress={onClose} 
            style={styles.closeButton}
            accessibilityRole="button"
            accessibilityLabel="Close accessibility support"
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          >
            <Ionicons name="close" size={28} color={hc ? '#FFF' : theme.colors.navy900} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollContent} bounces={false}>
          
          {/* QUICK ACCESS SECTION */}
          <Text style={[styles.sectionLabel, hc && styles.hcTextSecondary, { fontSize: 13 * scale }]}>QUICK ACCESS</Text>
          
          <View style={[styles.toolsContainer, hc && styles.hcToolsContainer]}>
            
            {/* Visual Support Row */}
            <View style={[styles.rowContainer, expandedSection === 'visual' && styles.rowExpandedContainer, hc && styles.hcRow]}>
              <TouchableOpacity 
                style={styles.row} 
                onPress={() => handleToggleExpand('visual')}
                accessibilityRole="button"
                accessibilityLabel={`Visual Support, ${expandedSection === 'visual' ? 'expanded' : 'collapsed'}`}
              >
                <View style={[styles.iconBox, hc && styles.hcIconBox]}>
                  <Ionicons name="eye-outline" size={24 * scale} color={hc ? '#FFF' : theme.colors.brandPrimary} />
                </View>
                <View style={styles.rowContent}>
                  <Text style={[styles.rowTitle, hc && styles.hcText, { fontSize: 16 * scale }]}>Visual Support</Text>
                  <Text style={[styles.rowSubtitle, hc && styles.hcTextSecondary, { fontSize: 14 * scale }]}>Text & contrast</Text>
                </View>
                <Ionicons name={expandedSection === 'visual' ? 'chevron-up' : 'chevron-forward'} size={24} color={hc ? '#FFF' : theme.colors.navy900} />
              </TouchableOpacity>
              
              {expandedSection === 'visual' && (
                <View style={styles.expandedBody}>
                  <Text style={[styles.controlLabel, hc && styles.hcText, { fontSize: 14 * scale }]}>Text Size</Text>
                  <View style={styles.buttonRow}>
                    {['default', 'large', 'extraLarge'].map((size) => {
                      const isActive = preferences.textScale === size;
                      const label = size === 'default' ? 'Aa' : size === 'large' ? 'A+' : 'A++';
                      const desc = size === 'default' ? 'Default' : size === 'large' ? 'Large' : 'Extra Large';
                      return (
                        <TouchableOpacity
                          key={size}
                          style={[styles.segmentBtn, isActive && styles.segmentBtnActive, hc && styles.hcSegmentBtn, hc && isActive && styles.hcSegmentBtnActive]}
                          onPress={() => updatePreference('textScale', size as any)}
                          accessibilityRole="button"
                          accessibilityState={{ selected: isActive }}
                          accessibilityLabel={`${desc} text`}
                        >
                          <Text style={[styles.segmentBtnText, isActive && styles.segmentBtnTextActive, hc && styles.hcText, hc && isActive && styles.hcTextActive, { fontSize: 14 * scale }]}>
                            {label}
                          </Text>
                          {isActive && <Ionicons name="checkmark" size={14} color={hc ? '#000' : theme.colors.brandPrimary} style={styles.segmentCheck} />}
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  <Text style={[styles.controlLabel, hc && styles.hcText, { fontSize: 14 * scale, marginTop: 16 }]}>Contrast</Text>
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={[styles.segmentBtn, !hc && styles.segmentBtnActive, hc && styles.hcSegmentBtn, !hc && hc && styles.hcSegmentBtnActive]}
                      onPress={() => updatePreference('highContrast', false)}
                      accessibilityRole="button"
                      accessibilityState={{ selected: !hc }}
                    >
                      <Text style={[styles.segmentBtnText, !hc && styles.segmentBtnTextActive, hc && styles.hcText, { fontSize: 14 * scale }]}>Normal</Text>
                      {!hc && <Ionicons name="checkmark" size={14} color={theme.colors.brandPrimary} style={styles.segmentCheck} />}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.segmentBtn, hc && styles.segmentBtnActive, hc && styles.hcSegmentBtn, hc && styles.hcSegmentBtnActive]}
                      onPress={() => updatePreference('highContrast', true)}
                      accessibilityRole="button"
                      accessibilityState={{ selected: hc }}
                    >
                      <Text style={[styles.segmentBtnText, hc && styles.segmentBtnTextActive, hc && styles.hcText, hc && styles.hcTextActive, { fontSize: 14 * scale }]}>High</Text>
                      {hc && <Ionicons name="checkmark" size={14} color="#000" style={styles.segmentCheck} />}
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>

            <View style={styles.separator} />

            {/* Read Aloud Row */}
            <View style={[styles.rowContainer, expandedSection === 'read' && styles.rowExpandedContainer, hc && styles.hcRow]}>
              <TouchableOpacity 
                style={styles.row} 
                onPress={() => {
                  if (expandedSection !== 'read') {
                    handleToggleExpand('read');
                  } else {
                    handleTogglePlay(); // quick toggle play if already expanded
                  }
                }}
                accessibilityRole="button"
                accessibilityLabel={`Read Aloud, ${expandedSection === 'read' ? 'expanded' : 'collapsed'}`}
              >
                <View style={[styles.iconBox, hc && styles.hcIconBox]}>
                  <Ionicons name="volume-high-outline" size={24 * scale} color={hc ? '#FFF' : theme.colors.brandPrimary} />
                </View>
                <View style={styles.rowContent}>
                  <Text style={[styles.rowTitle, hc && styles.hcText, { fontSize: 16 * scale }]}>Read Aloud</Text>
                  <Text style={[styles.rowSubtitle, hc && styles.hcTextSecondary, { fontSize: 14 * scale }]}>Read this content</Text>
                </View>
                <TouchableOpacity onPress={handleTogglePlay} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                  <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color={hc ? '#FFF' : theme.colors.navy900} />
                </TouchableOpacity>
              </TouchableOpacity>
              
              {expandedSection === 'read' && (
                <View style={styles.expandedBody}>
                  <Text style={[styles.controlLabel, hc && styles.hcText, { fontSize: 14 * scale }]}>Speed</Text>
                  <View style={styles.buttonRow}>
                    {[0.75, 1, 1.25, 1.5].map((speed) => {
                      const isActive = preferences.speechRate === speed;
                      return (
                        <TouchableOpacity
                          key={speed}
                          style={[styles.segmentBtn, isActive && styles.segmentBtnActive, hc && styles.hcSegmentBtn, hc && isActive && styles.hcSegmentBtnActive]}
                          onPress={() => updatePreference('speechRate', speed)}
                          accessibilityRole="button"
                          accessibilityState={{ selected: isActive }}
                        >
                          <Text style={[styles.segmentBtnText, isActive && styles.segmentBtnTextActive, hc && styles.hcText, hc && isActive && styles.hcTextActive, { fontSize: 14 * scale }]}>
                            {speed}x
                          </Text>
                          {isActive && <Ionicons name="checkmark" size={14} color={hc ? '#000' : theme.colors.brandPrimary} style={styles.segmentCheck} />}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              )}
            </View>

            <View style={styles.separator} />

            {/* Focus Mode Row */}
            <TouchableOpacity 
              style={[styles.row, preferences.focusMode && styles.rowActive, hc && preferences.focusMode && styles.hcRowActive]}
              onPress={toggleFocusMode}
              accessibilityRole="switch"
              accessibilityState={{ checked: preferences.focusMode }}
              accessibilityLabel={`Focus Mode, switch, ${preferences.focusMode ? 'on' : 'off'}`}
            >
              <View style={[styles.iconBox, hc && styles.hcIconBox, preferences.focusMode && styles.iconBoxActive]}>
                <Ionicons name="leaf-outline" size={24 * scale} color={preferences.focusMode ? theme.colors.brandPrimary : (hc ? '#FFF' : theme.colors.brandPrimary)} />
              </View>
              <View style={styles.rowContent}>
                <Text style={[styles.rowTitle, hc && styles.hcText, { fontSize: 16 * scale }]}>Focus Mode</Text>
                <Text style={[styles.rowSubtitle, hc && styles.hcTextSecondary, { fontSize: 14 * scale }]}>Reduce distractions and motion</Text>
              </View>
              <View style={[styles.stateIndicator, preferences.focusMode && styles.stateIndicatorActive, hc && preferences.focusMode && styles.hcStateIndicatorActive]}>
                <Text style={[styles.stateText, preferences.focusMode && styles.stateTextActive, hc && preferences.focusMode && styles.hcStateTextActive, { fontSize: 14 * scale }]}>
                  {preferences.focusMode ? 'ON' : 'OFF'}
                </Text>
                {preferences.focusMode && <Ionicons name="checkmark" size={16} color={hc ? '#000' : theme.colors.brandPrimary} style={{marginLeft: 4}} />}
              </View>
            </TouchableOpacity>

            <View style={styles.separator} />

            {/* Easy Interaction Row */}
            <TouchableOpacity 
              style={[styles.row, preferences.largeTouchTargets && styles.rowActive, hc && preferences.largeTouchTargets && styles.hcRowActive]}
              onPress={toggleLargeTouchTargets}
              accessibilityRole="switch"
              accessibilityState={{ checked: preferences.largeTouchTargets }}
              accessibilityLabel={`Easy Interaction, switch, ${preferences.largeTouchTargets ? 'on' : 'off'}`}
            >
              <View style={[styles.iconBox, hc && styles.hcIconBox, preferences.largeTouchTargets && styles.iconBoxActive]}>
                <Ionicons name="hand-left-outline" size={24 * scale} color={preferences.largeTouchTargets ? theme.colors.brandPrimary : (hc ? '#FFF' : theme.colors.brandPrimary)} />
              </View>
              <View style={styles.rowContent}>
                <Text style={[styles.rowTitle, hc && styles.hcText, { fontSize: 16 * scale }]}>Easy Interaction</Text>
                <Text style={[styles.rowSubtitle, hc && styles.hcTextSecondary, { fontSize: 14 * scale }]}>Larger controls and easier navigation</Text>
              </View>
              <View style={[styles.stateIndicator, preferences.largeTouchTargets && styles.stateIndicatorActive, hc && preferences.largeTouchTargets && styles.hcStateIndicatorActive]}>
                <Text style={[styles.stateText, preferences.largeTouchTargets && styles.stateTextActive, hc && preferences.largeTouchTargets && styles.hcStateTextActive, { fontSize: 14 * scale }]}>
                  {preferences.largeTouchTargets ? 'ON' : 'OFF'}
                </Text>
                {preferences.largeTouchTargets && <Ionicons name="checkmark" size={16} color={hc ? '#000' : theme.colors.brandPrimary} style={{marginLeft: 4}} />}
              </View>
            </TouchableOpacity>

          </View>

          {/* ADVANCED SECTION */}
          <Text style={[styles.sectionLabel, hc && styles.hcTextSecondary, { fontSize: 13 * scale, marginTop: 12 }]}>ADVANCED</Text>
          <TouchableOpacity 
            style={[styles.settingsButton, hc && styles.hcSettingsButton]} 
            onPress={handleNavigateSettings}
            accessibilityRole="button"
          >
            <View style={styles.rowContent}>
              <Text style={[styles.rowTitle, hc && styles.hcText, { fontSize: 16 * scale }]}>All Accessibility Settings</Text>
              <Text style={[styles.rowSubtitle, hc && styles.hcTextSecondary, { fontSize: 14 * scale }]}>Manage text, motion, reading and interaction preferences</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={hc ? '#FFF' : theme.colors.navy900} />
          </TouchableOpacity>
          
          <View style={{height: 24}} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(11, 31, 58, 0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: theme.colors.pearlWhite || '#F7F9FC',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 20,
  },
  hcSheet: {
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 24,
    paddingBottom: 16,
  },
  headerTitleGroup: {
    flex: 1,
  },
  title: {
    fontWeight: '800',
    color: theme.colors.navy900,
    marginBottom: 4,
  },
  subtitle: {
    fontWeight: '500',
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: theme.colors.navy900,
    fontWeight: '600',
  },
  hcText: {
    color: '#FFF',
  },
  hcTextSecondary: {
    color: '#CCC',
  },
  closeButton: {
    padding: 4,
    marginLeft: 16,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  sectionLabel: {
    fontWeight: '700',
    color: theme.colors.textSecondary,
    letterSpacing: 0.5,
    marginBottom: 8,
    marginTop: 8,
  },
  toolsContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 24,
  },
  hcToolsContainer: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#444',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginHorizontal: 16,
  },
  rowContainer: {
    backgroundColor: 'transparent',
  },
  rowExpandedContainer: {
    backgroundColor: theme.colors.backgroundLight,
  },
  hcRow: {
    // optional high contrast styling for row
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    minHeight: 64,
  },
  rowActive: {
    backgroundColor: theme.colors.infoBackground, // Soft Blue
  },
  hcRowActive: {
    backgroundColor: '#002B59',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(15, 76, 129, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  hcIconBox: {
    backgroundColor: 'transparent',
  },
  iconBoxActive: {
    backgroundColor: theme.colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  rowContent: {
    flex: 1,
    paddingRight: 16,
  },
  rowTitle: {
    fontWeight: '700',
    color: theme.colors.navy900,
    marginBottom: 2,
  },
  rowSubtitle: {
    color: theme.colors.textSecondary,
    lineHeight: 18,
  },
  expandedBody: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  controlLabel: {
    fontWeight: '600',
    color: theme.colors.navy900,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  segmentBtn: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    minHeight: 48,
  },
  segmentBtnActive: {
    backgroundColor: theme.colors.infoBackground, // Soft Blue
    borderColor: theme.colors.brandPrimary,       // Pearl Blue
  },
  hcSegmentBtn: {
    backgroundColor: '#222',
    borderWidth: 1,
    borderColor: '#444',
  },
  hcSegmentBtnActive: {
    backgroundColor: '#FFF',
    borderColor: '#FFF',
  },
  segmentBtnText: {
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  segmentBtnTextActive: {
    color: theme.colors.brandPrimary,
  },
  segmentCheck: {
    position: 'absolute',
    right: 8,
  },
  hcTextActive: {
    color: '#000',
    fontWeight: '800',
  },
  stateIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stateIndicatorActive: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  hcStateIndicatorActive: {
    backgroundColor: '#FFF',
  },
  stateText: {
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  stateTextActive: {
    color: theme.colors.brandPrimary,
    fontWeight: '700',
  },
  hcStateTextActive: {
    color: '#000',
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'transparent',
    minHeight: 64,
  },
  hcSettingsButton: {
    // hc specific
  }
});
