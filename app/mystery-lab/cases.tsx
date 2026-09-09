/**
 * Mystery Lab Cases Route (/mystery-lab/cases)
 * Browse all mystery cases with search and filters.
 */

import React from 'react';
import { useLanguage } from '../../src/context';
import { MysteryCasesScreen } from '../../src/components/mystery-lab';

export default function MysteryCasesRoute() {
  const { language } = useLanguage();

  return <MysteryCasesScreen language={language} />;
}
