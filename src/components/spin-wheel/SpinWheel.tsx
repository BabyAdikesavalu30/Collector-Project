import React from 'react';
import { View, Text, StyleSheet, Animated, useWindowDimensions } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { SPIN_WHEEL_SEGMENTS } from '../../features/spin-wheel';
import { SpinButton } from './SpinButton';

interface SpinWheelProps {
  rotationAnim: Animated.Value;
  language: SupportedLanguage;
  isSpinning: boolean;
  disabled: boolean;
  onSpinPress: () => void;
  spinButtonLabel: string;
  spinHint: string;
}

export const SpinWheel: React.FC<SpinWheelProps> = ({
  rotationAnim,
  language,
  isSpinning,
  disabled,
  onSpinPress,
  spinButtonLabel,
  spinHint,
}) => {
  const isTamil = language === 'ta';
  const { width } = useWindowDimensions();
  const isCompact = width < 360;
  const wheelSize = Math.min(270, Math.floor(width - (isCompact ? 24 : 40)));
  const radius = wheelSize / 2;
  const itemRadius = Math.round(wheelSize * 0.288);

  // Interpolate rotation for smooth native rotation
  const rotateDeg = rotationAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, { width: wheelSize, height: wheelSize }]}>
      {/* Animated Wheel Body */}
      <Animated.View
        style={[
          styles.wheel,
          {
            width: wheelSize,
            height: wheelSize,
            borderRadius: radius,
            transform: [{ rotate: rotateDeg }],
          },
        ]}
      >
        {/* Wheel Outer Border & Rim */}
        <View style={styles.wheelInner}>
          {SPIN_WHEEL_SEGMENTS.map((segment, index) => {
            const segmentArc = 360 / SPIN_WHEEL_SEGMENTS.length; // 60 deg
            const angleDeg = index * segmentArc + segmentArc / 2; // 30, 90, 150, 210, 270, 330
            const angleRad = (angleDeg * Math.PI) / 180;

            // Compute polar position relative to wheel center
            const x = radius + itemRadius * Math.sin(angleRad) - 40;
            const y = radius - itemRadius * Math.cos(angleRad) - 24;

            const label = isTamil ? segment.label.ta : segment.label.en;

            return (
              <View
                key={segment.id}
                style={[
                  styles.segmentItem,
                  {
                    left: x,
                    top: y,
                    transform: [{ rotate: `${angleDeg}deg` }],
                  },
                ]}
              >
                <Text style={styles.segmentIcon}>{segment.icon}</Text>
                <Text
                  style={[styles.segmentLabel, { color: segment.textColor }]}
                  numberOfLines={1}
                >
                  {label}
                </Text>
              </View>
            );
          })}

          {/* Segment Divider Lines */}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <View
              key={deg}
              style={[
                styles.dividerLine,
                {
                  left: radius - 1,
                  height: radius,
                  transformOrigin: `1px ${radius}px`,
                  transform: [{ rotate: `${deg}deg` }],
                },
              ]}
            />
          ))}
        </View>
      </Animated.View>

      {/* Stationary Center Hub / Spin Button */}
      <View style={styles.centerHub}>
        <SpinButton
          label={spinButtonLabel}
          isSpinning={isSpinning}
          disabled={disabled}
          onPress={onSpinPress}
          accessibilityHint={spinHint}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
    position: 'relative',
  },
  wheel: {
    backgroundColor: theme.colors.white,
    borderWidth: 6,
    borderColor: theme.colors.navy900,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  wheelInner: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#F8FAFC',
  },
  segmentItem: {
    position: 'absolute',
    width: 80,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentIcon: {
    fontSize: 18,
    marginBottom: 2,
  },
  segmentLabel: {
    ...theme.typography.caption,
    fontSize: 10,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  dividerLine: {
    position: 'absolute',
    top: 0,
    width: 2,
    backgroundColor: theme.colors.border,
  },
  centerHub: {
    position: 'absolute',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
