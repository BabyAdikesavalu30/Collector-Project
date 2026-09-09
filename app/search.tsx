/**
 * Global Search Route (/search)
 * Searches across games, riddles, facts, mysteries, achievements,
 * certificates, and collections with bilingual matching and filters.
 */

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'expo-router';
import { SearchScreen, CategoryFilterOption } from '../src/components/search';
import { getTranslation } from '../src/config/i18n';
import { useLanguage } from '../src/context';
import {
  buildSearchIndex,
  searchCatalog,
  getSuggestedQueries,
  getRecentSearches,
  addRecentSearch,
  clearRecentSearches,
  SearchCategory,
  SearchResult,
  SearchIndex,
} from '../src/features/search';
import { getCertificates } from '../src/features/certificates';
import { SessionRepository } from '../src/features/auth';

const ALL_CATEGORY_KEYS: Array<SearchCategory | 'all'> = [
  'all',
  'game',
  'riddle',
  'fact',
  'mystery',
  'achievement',
  'certificate',
  'collection',
  'scientist',
  'invention',
  'everyday_science',
];

export default function SearchPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [index, setIndex] = useState<SearchIndex | null>(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<SearchCategory | 'all'>('all');

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const session = await SessionRepository.getSession();
      if (!session || !session.isAuthenticated) {
        router.replace('/auth-welcome');
        return;
      }

      const [certificates, recents] = await Promise.all([getCertificates(), getRecentSearches()]);
      if (isMounted) {
        setIndex(buildSearchIndex(certificates));
        setRecentSearches(recents);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [router]);

  const runSearch = useCallback(
    (q: string, category: SearchCategory | 'all') => {
      if (!index) return;
      const categories = category === 'all' ? undefined : [category];
      const found = searchCatalog(index, { query: q, categories, language });
      setResults(found);
    },
    [index, language]
  );

  const handleQueryChange = useCallback(
    (q: string) => {
      setQuery(q);
      runSearch(q, activeCategory);
    },
    [runSearch, activeCategory]
  );

  const handleSelectCategory = useCallback(
    (category: SearchCategory | 'all') => {
      setActiveCategory(category);
      runSearch(query, category);
    },
    [runSearch, query]
  );

  const handleSelectResult = useCallback(
    async (result: SearchResult) => {
      if (query.trim()) {
        const next = await addRecentSearch(query);
        setRecentSearches(next);
      }
      const { item } = result;
      try {
        if (item.params) {
          router.push({ pathname: item.route, params: item.params });
        } else {
          router.push(item.route);
        }
      } catch {
        // Invalid destination — stay on screen
      }
    },
    [query, router]
  );

  const handleSelectRecent = useCallback(
    (recent: string) => {
      setQuery(recent);
      runSearch(recent, activeCategory);
    },
    [runSearch, activeCategory]
  );

  const handleClearHistory = useCallback(async () => {
    await clearRecentSearches();
    setRecentSearches([]);
  }, []);

  const handleClearQuery = useCallback(() => {
    setQuery('');
    setResults([]);
  }, []);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home');
    }
  }, [router]);

  const t = getTranslation(language).progress;
  const categories = useMemo<CategoryFilterOption[]>(
    () =>
      ALL_CATEGORY_KEYS.map((key) => {
        const labelMap: Record<string, string> = {
          all: t.notif.all,
          game: t.explore.popularGames,
          riddle: t.explore.riddles,
          fact: t.explore.funFacts,
          mystery: t.explore.mysteryCases,
          achievement: t.explore.achievements,
          certificate: t.certificates.title,
          collection: t.explore.collections,
          scientist: t.explore.discoverScientists || 'Scientists',
          invention: t.explore.discoverInventions || 'Inventions',
          everyday_science: t.explore.everydayScience || 'Everyday Science',
        };
        return { key: key as SearchCategory | 'all', label: labelMap[key] };
      }),
    [t]
  );

  return (
    <SearchScreen
      language={language}
      query={query}
      results={results}
      recentSearches={recentSearches}
      suggestedQueries={getSuggestedQueries(language)}
      categories={categories}
      activeCategory={activeCategory}
      onQueryChange={handleQueryChange}
      onClearQuery={handleClearQuery}
      onSelectResult={handleSelectResult}
      onSelectRecent={handleSelectRecent}
      onSelectSuggestion={(suggestion) => handleSelectRecent(suggestion)}
      onClearHistory={handleClearHistory}
      onSelectCategory={handleSelectCategory}
      onBack={handleBack}
    />
  );
}