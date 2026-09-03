/**
 * CollegeLogo Component
 * Reusable institutional crest / logo component.
 * Displays official R.M.K. Engineering College emblem with exact aspect ratio.
 */

import React from 'react';
import { View, Image, StyleSheet, AccessibilityProps } from 'react-native';
import { institutionConfig } from '../../config/institution';

interface CollegeLogoProps extends AccessibilityProps {
  size?: number;
}

const RMK_LOGO_ASSET = require('../../../assets/rmk-logo.png');

export const CollegeLogo: React.FC<CollegeLogoProps> = ({
  size = 64,
  accessibilityLabel = `${institutionConfig.name.en} Logo`,
}) => {
  const height = Math.round(size * 1.282);

  return (
    <View style={[styles.container, { width: size, height }]}>
      <Image
        source={
          institutionConfig.branding.officialAssetUri
            ? { uri: institutionConfig.branding.officialAssetUri }
            : RMK_LOGO_ASSET
        }
        style={styles.image}
        resizeMode="contain"
        accessible={true}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="image"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

