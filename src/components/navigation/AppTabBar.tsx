/**
 * AppTabBar Component
 * Ultra-compact, accessible 4-tab bottom navigation bar for Vigyaan Mobile.
 * Renders pastel cards for Home, Learn, Games, and Profile with bilingual support.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { AppTabBarProps } from './navigation.types';
import { TAB_CONFIGS } from './navigation.config';
import { AppTabIcon } from './AppTabIcon';

export const AppTabBar: React.FC<AppTabBarProps> = ({
  activeTab = 'home',
  language = 'en',
  onTabPress,
  isVisible = true,
}) => {
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).home.nav;

  if (!isVisible) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, 12),
        },
      ]}
      accessible={true}
      accessibilityRole="tablist"
    >
      {TAB_CONFIGS.map((tab) => {
        const isActive = activeTab === tab.id;
        const label = t[tab.id as keyof typeof t] || tab.id;
        
        const tintColor = isActive ? theme.colors.primary : theme.colors.slate400;

        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabButton}
            onPress={() => onTabPress(tab.id)}
            activeOpacity={0.6}
            accessible={true}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`${label}, tab ${isActive ? 'selected' : ''}`}
          >
            {/* Sleek Active Top Border Indicator */}
            {isActive && <View style={[styles.activeTopIndicator, { backgroundColor: theme.colors.primary }]} />}
            
            <View style={[styles.iconContainer, isActive && styles.iconContainerActive]}>
              <AppTabIcon tab={tab.id} color={tintColor} />
            </View>
            <Text
              style={[
                styles.tabLabel,
                { color: tintColor },
                isActive && styles.tabLabelActive,
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.8}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 6,
    position: 'relative',
  },
  activeTopIndicator: {
    position: 'absolute',
    top: -1, // Overlap the container's top border
    width: '40%',
    height: 3,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  iconContainer: {
    marginBottom: 4,
    transform: [{ scale: 0.95 }],
  },
  iconContainerActive: {
    transform: [{ scale: 1.05 }],
  },
  tabLabel: {
    ...theme.typography.caption,
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    fontWeight: '700',
  },
});

