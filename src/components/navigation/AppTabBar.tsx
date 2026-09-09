/**
 * AppTabBar Component
 * Ultra-compact, accessible 4-tab bottom navigation bar for Vigyaan Mobile.
 * Renders pastel cards for Home, Learn, Games, and Profile with bilingual support.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme, useIsCompactScreen } from '../../theme';
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
  const isCompact = useIsCompactScreen();
  const t = getTranslation(language).home.nav;

  if (!isVisible) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, 6),
        },
      ]}
      accessible={true}
      accessibilityRole="tablist"
    >
      <View style={styles.contentWrap}>
        {TAB_CONFIGS.map((tab) => {
          const isActive = activeTab === tab.id;
          const label = t[tab.id as keyof typeof t] || tab.id;

          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tabButton, isCompact && styles.tabButtonCompact]}
              onPress={() => onTabPress(tab.id)}
              activeOpacity={0.75}
              accessible={true}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={`${label}, tab ${isActive ? 'selected' : ''}`}
              hitSlop={{ top: 8, bottom: 8, left: isCompact ? 3 : 6, right: isCompact ? 3 : 6 }}
            >
              {/* Ultra-compact Rounded Pastel Card Container */}
              <View
                style={[
                  styles.cardBox,
                  isCompact && styles.cardBoxCompact,
                  {
                    backgroundColor: tab.bgColor,
                    borderColor: tab.borderColor,
                  },
                  isActive && styles.cardBoxActive,
                ]}
              >
                <AppTabIcon tab={tab.id} color={tab.iconColor} />
              </View>

              {/* Label Underneath */}
              <Text
                style={[
                  styles.tabLabel,
                  isCompact && styles.tabLabelCompact,
                  isActive && styles.tabLabelActive,
                ]}
                numberOfLines={1}
              >
                {label}
              </Text>

              {/* Active Highlight Dot */}
              {isActive ? (
                <View style={[styles.activeDot, { backgroundColor: tab.iconColor }]} />
              ) : (
                <View style={styles.inactiveDotPlaceholder} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: 6,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 8,
    alignItems: 'center',
  },
  contentWrap: {
    width: '100%',
    maxWidth: 500,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabButton: {
    minWidth: 64,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: 8,
  },
  tabButtonCompact: {
    minWidth: 54,
    paddingHorizontal: 4,
  },
  cardBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1.0,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  cardBoxCompact: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  cardBoxActive: {
    borderWidth: 1.5,
    transform: [{ scale: 1.04 }],
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  tabLabel: {
    ...theme.typography.caption,
    fontSize: 10.5,
    color: theme.colors.slate600,
    marginTop: 3,
    fontWeight: '600',
    textAlign: 'center',
  },
  tabLabelCompact: {
    fontSize: 9.5,
    marginTop: 2,
  },
  tabLabelActive: {
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 2,
  },
  inactiveDotPlaceholder: {
    width: 4,
    height: 4,
    marginTop: 2,
  },
});
