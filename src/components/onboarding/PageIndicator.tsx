/**
 * PageIndicator Component
 * Reusable 3-dot pagination bar for Onboarding.
 * Displays an elongated active pill for the current step and subtle dots for inactive steps.
 * Accessible with screen reader label and progressbar role.
 */

import React from 'react';
import { View, StyleSheet, AccessibilityProps } from 'react-native';
import { theme } from '../../theme';

interface PageIndicatorProps extends AccessibilityProps {
  currentStep: number; // 1-indexed (1, 2, 3)
  totalSteps?: number;
}

export const PageIndicator: React.FC<PageIndicatorProps> = ({
  currentStep = 1,
  totalSteps = 3,
  accessibilityLabel = `Onboarding step ${currentStep} of ${totalSteps}`,
}) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 1, max: totalSteps, now: currentStep }}
    >
      {steps.map((step) => {
        const isActive = step === currentStep;
        return (
          <View
            key={`step-dot-${step}`}
            style={[
              styles.dot,
              isActive ? styles.activePill : styles.inactiveDot,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: theme.spacing.sm,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  activePill: {
    width: 26,
    backgroundColor: theme.colors.actionPrimary,
    shadowColor: theme.colors.actionPrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  inactiveDot: {
    width: 6,
    backgroundColor: theme.colors.gray300,
  },
});
