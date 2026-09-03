/**
 * AppBrand Component
 * Central Vigyaan identity component displaying the science atom insignia,
 * bilingual typography (விஞ்ஞான் • VIGYAAN), scientific tagline, and language identity badge.
 */

import React from 'react';
import { View, Text, StyleSheet, AccessibilityProps } from 'react-native';
import { theme } from '../../theme';
import { institutionConfig } from '../../config/institution';

interface AppBrandProps extends AccessibilityProps {
  compact?: boolean;
}

export const AppBrand: React.FC<AppBrandProps> = ({
  compact = false,
  accessibilityLabel = `${institutionConfig.app.name}, ${institutionConfig.app.tagline.en}`,
}) => {
  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel}
    >
      {/* Science Core Emblem */}
      <View style={[styles.emblemContainer, compact && styles.emblemContainerCompact]}>
        {/* Glowing Halo */}
        <View style={styles.haloGlow} />

        {/* Orbit Path 1 (Diagonal Left) */}
        <View style={[styles.atomOrbit, styles.orbitDiagonalLeft]} />

        {/* Orbit Path 2 (Diagonal Right) */}
        <View style={[styles.atomOrbit, styles.orbitDiagonalRight]} />

        {/* Orbit Path 3 (Horizontal) */}
        <View style={[styles.atomOrbit, styles.orbitHorizontal]} />

        {/* Nucleus Core */}
        <View style={styles.nucleusCore}>
          <View style={styles.nucleusInner}>
            <Text style={styles.nucleusSparkle}>⚛</Text>
          </View>
        </View>

        {/* Orbiting Quantum Electrons */}
        <View style={[styles.electron, styles.electronTop]} />
        <View style={[styles.electron, styles.electronBottom]} />
        <View style={[styles.electron, styles.electronRight]} />
      </View>

      {/* Tamil App Title */}
      <Text style={styles.tamilName}>{institutionConfig.app.tamilName}</Text>

      {/* Main Brand Title */}
      <View style={styles.brandTitleRow}>
        <Text style={styles.brandTitle}>{institutionConfig.app.name}</Text>
      </View>

      {/* Science Initiative Badge */}
      <View style={styles.initiativeBadge}>
        <Text style={styles.initiativeText}>{institutionConfig.app.badge}</Text>
      </View>

      {/* Main Tagline */}
      <Text style={styles.tagline}>{institutionConfig.app.tagline.en}</Text>

      {/* Tamil Sub-Tagline */}
      <Text style={styles.tamilTagline}>{institutionConfig.app.tagline.ta}</Text>

      {/* Bilingual Identity Badge */}
      <View style={styles.languagePill}>
        <View style={styles.languageDot} />
        <Text style={styles.languageText}>
          {institutionConfig.languages.displayBadge}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: theme.spacing.base,
  },
  emblemContainer: {
    width: 88,
    height: 88,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  emblemContainerCompact: {
    width: 72,
    height: 72,
    marginBottom: theme.spacing.sm,
  },
  haloGlow: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(147, 51, 234, 0.2)',
    shadowColor: theme.colors.brandPrimary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  atomOrbit: {
    position: 'absolute',
    width: 80,
    height: 32,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: 'rgba(147, 51, 234, 0.5)',
  },
  orbitDiagonalLeft: {
    transform: [{ rotate: '30deg' }],
  },
  orbitDiagonalRight: {
    transform: [{ rotate: '-30deg' }],
    borderColor: 'rgba(37, 99, 235, 0.5)',
  },
  orbitHorizontal: {
    transform: [{ rotate: '90deg' }],
    borderColor: 'rgba(147, 51, 234, 0.4)',
  },
  nucleusCore: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(147, 51, 234, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.brandPrimary,
    shadowColor: theme.colors.brandPrimary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  nucleusInner: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: theme.colors.backgroundCard,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nucleusSparkle: {
    color: theme.colors.brandPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  electron: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.textPrimary,
  },
  electronTop: {
    top: 4,
    left: 24,
    backgroundColor: theme.colors.brandPrimary,
  },
  electronBottom: {
    bottom: 6,
    right: 22,
    backgroundColor: theme.colors.accentGold,
  },
  electronRight: {
    right: 3,
    top: 38,
    backgroundColor: theme.colors.accentTeal,
  },
  tamilName: {
    ...theme.typography.tamilSubtitle,
    color: theme.colors.brandPrimary,
    textAlign: 'center',
    marginBottom: 2,
    letterSpacing: 1.5,
  },
  brandTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xs,
  },
  brandTitle: {
    ...theme.typography.hero,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    fontFamily: theme.fontFamilies.bold,
    letterSpacing: 4,
    textShadowColor: 'rgba(56, 189, 248, 0.45)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 12,
  },
  initiativeBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm,
  },
  initiativeText: {
    ...theme.typography.overline,
    fontSize: 9,
    color: theme.colors.brandPrimary,
    letterSpacing: 1.2,
  },
  tagline: {
    ...theme.typography.bodyLarge,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 3,
    letterSpacing: 0.3,
  },
  tamilTagline: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    fontSize: 12,
  },
  languagePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: theme.colors.surfaceBorder,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  languageDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.accentGold,
    marginRight: 6,
  },
  languageText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
