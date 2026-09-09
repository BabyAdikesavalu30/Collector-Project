/**
 * Mystery Lab Route (/mystery-lab)
 * Main entry screen for the Mystery Lab feature.
 */

import React from 'react';
import { useRouter } from 'expo-router';
import { useLanguage } from '../src/context';
import { MysteryLabScreen } from '../src/components/mystery-lab';

export default function MysteryLabRoute() {
  const router = useRouter();
  const { language } = useLanguage();

  return <MysteryLabScreen language={language} />;
}
