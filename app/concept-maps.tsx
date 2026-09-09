/**
 * Concept Maps Hub Route (/concept-maps)
 * Visual science knowledge graph hub for Vigyaan.
 */

import React, { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { ConceptMapsHubScreen } from '../src/components/concept-maps';
import { useConceptMapsHub } from '../src/features/concept-maps';
import { useLanguage } from '../src/context';
import { navigateDynamic } from '../src/components/navigation/navigation.config';

export default function ConceptMapsHubRoute() {
  const router = useRouter();
  const { language } = useLanguage();

  const {
    filteredMaps,
    todayMap,
    recentMap,
    progressMap,
    bookmarks,
    filterState,
    summary,
    isLoading,
    setFilterState,
    toggleBookmark,
  } = useConceptMapsHub();

  const handleMapPress = useCallback(
    (mapId: string) => {
      navigateDynamic(router, `/concept-map/${mapId}`);
    },
    [router]
  );

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home');
    }
  }, [router]);

  return (
    <ConceptMapsHubScreen
      maps={filteredMaps}
      todayMap={todayMap}
      recentMap={recentMap}
      progressMap={progressMap}
      bookmarks={bookmarks}
      filterState={filterState}
      summary={summary}
      isLoading={isLoading}
      language={language}
      onFilterChange={setFilterState}
      onMapPress={handleMapPress}
      onBookmarkToggle={toggleBookmark}
      onBack={handleBack}
    />
  );
}
