/**
 * CelebrationOverlay
 * Main orchestration component for the Celebration & Micro-interaction System.
 * Place this at the app root level (e.g., in _layout.tsx or AppShell).
 *
 * Handles:
 * - Rendering the correct celebration UI based on event intensity
 * - Confetti for major events
 * - Reduced-motion awareness
 * - Safe-area awareness
 * - Navigation-safe dismissal
 */

import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useCelebration } from '../../features/celebration/useCelebration';
import { shouldShowAsModal, shouldUseConfetti } from '../../features/celebration/celebration.utils';
import { CelebrationToast } from './CelebrationToast';
import { CelebrationModal } from './CelebrationModal';
import { ConfettiLayer } from './ConfettiLayer';
import { SupportedLanguage } from '../../config/i18n';

interface CelebrationOverlayProps {
  language: SupportedLanguage;
  onNavigate?: (route: string) => void;
}

export const CelebrationOverlay: React.FC<CelebrationOverlayProps> = ({
  language,
  onNavigate,
}) => {
  const {
    currentEvent,
    isShowing,
    isReducedMotion,
    dismiss,
  } = useCelebration();

  const handleDismiss = useCallback(() => {
    dismiss();
  }, [dismiss]);

  const handleNavigate = useCallback(
    (route: string) => {
      if (onNavigate) {
        onNavigate(route);
      }
    },
    [onNavigate]
  );

  if (!isShowing || !currentEvent) {
    return null;
  }

  const showModal = shouldShowAsModal(currentEvent);
  const showConfetti = shouldUseConfetti(currentEvent) && !isReducedMotion;

  return (
    <View style={styles.container} pointerEvents="box-none">
      {/* Confetti Layer (major events only) */}
      <ConfettiLayer
        visible={showConfetti}
        isReducedMotion={isReducedMotion}
      />

      {/* Toast or Modal */}
      {showModal ? (
        <CelebrationModal
          event={currentEvent}
          language={language}
          isReducedMotion={isReducedMotion}
          onDismiss={handleDismiss}
          onNavigate={handleNavigate}
        />
      ) : (
        <CelebrationToast
          event={currentEvent}
          language={language}
          isReducedMotion={isReducedMotion}
          onDismiss={handleDismiss}
        />
      )}
    </View>
  );
};

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2000,
    elevation: 2000,
  },
});
