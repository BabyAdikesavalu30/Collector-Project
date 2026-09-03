/**
 * Mystery Lab Result Route (/mystery-lab/result)
 * Redirects to the case screen — results are shown inline in the case flow.
 */

import React from 'react';
import { Redirect } from 'expo-router';

export default function MysteryResultRoute() {
  // Results are shown as a step within the case investigation flow.
  // This route exists for deep-link compatibility but redirects to the main lab.
  return <Redirect href="/mystery-lab" />;
}
