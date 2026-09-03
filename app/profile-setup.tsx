/**
 * Profile Setup Boundary Route (/profile-setup)
 * Seamlessly forwards to Screen 13 (/profile-create) multi-step profile flow.
 */

import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function ProfileSetupBoundary() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/profile-create');
  }, [router]);

  return null;
}
