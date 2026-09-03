/**
 * useBootstrap Hook
 * Orchestrates the bootstrap lifecycle, slow-boot telemetry/indicator,
 * reduced motion accessibility detection, and retry execution.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { AccessibilityInfo } from 'react-native';
import { BootstrapResult, BootstrapStatus } from './types';
import { BootstrapService } from './bootstrapService';

const SLOW_BOOT_THRESHOLD_MS = 2500;
const MINIMUM_SPLASH_DISPLAY_MS = 1200; // Allows smooth brand recognition without artificial sluggishness

export function useBootstrap() {
  const [status, setStatus] = useState<BootstrapStatus>('initializing');
  const [result, setResult] = useState<BootstrapResult | null>(null);
  const [isReduceMotion, setIsReduceMotion] = useState<boolean>(false);
  const startTimeRef = useRef<number>(Date.now());
  const slowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Check system reduced motion setting
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => setIsReduceMotion(Boolean(enabled)))
      .catch(() => setIsReduceMotion(false));

    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      (enabled) => setIsReduceMotion(Boolean(enabled))
    );

    return () => {
      subscription?.remove();
    };
  }, []);

  const runBootstrap = useCallback(async () => {
    setStatus('initializing');
    startTimeRef.current = Date.now();

    // Start slow boot timer
    if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
    slowTimerRef.current = setTimeout(() => {
      setStatus((current) => (current === 'initializing' ? 'slow' : current));
    }, SLOW_BOOT_THRESHOLD_MS);

    try {
      const bootPromise = BootstrapService.execute();

      // Enforce subtle minimum display time for smooth visual cadence
      const delayPromise = new Promise((resolve) =>
        setTimeout(resolve, MINIMUM_SPLASH_DISPLAY_MS)
      );

      const [res] = await Promise.all([bootPromise, delayPromise]);

      if (slowTimerRef.current) clearTimeout(slowTimerRef.current);


      if (res.status === 'error') {
        setStatus('error');
        setResult(res);
      } else {
        setResult(res);
        setStatus('ready');
      }
    } catch (err) {
      if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
      setStatus('error');
      setResult({
        status: 'error',
        initialRoute: '/welcome',
        restoredState: {
          hasLaunchedBefore: false,
          language: null,
          hasLanguageSelected: false,
          isOnboardingCompleted: false,
          isAuthenticated: false,
          isProfileCompleted: false,
        },
        errorMessage: "Vigyaan couldn't finish preparing the app.",
      });
    }
  }, []);

  useEffect(() => {
    runBootstrap();

    return () => {
      if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
    };
  }, [runBootstrap]);

  const retry = useCallback(() => {
    runBootstrap();
  }, [runBootstrap]);

  return {
    status,
    result,
    isReduceMotion,
    retry,
    isReady: status === 'ready' && !!result,
  };
}
