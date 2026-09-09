/**
 * ExperimentLabHubScreen Component
 * Central hub for Experiment Lab.
 * Features hero daily simulation, subject filter tabs, quick experiments,
 * continue experimenting section, completed stats, and optimized catalog list.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { useExperimentLabHub } from '../../features/experiment-lab/experiment.hooks';
import { EXPERIMENT_SUBJECTS } from '../../features/experiment-lab/experiment.data';
import { ExperimentSubject } from '../../features/experiment-lab/experiment.types';
import { ExperimentCard } from './ExperimentCard';
import { AppBackButton } from '../navigation/AppBackButton';
import { SupportedLanguage } from '../../config/i18n';

interface ExperimentLabHubScreenProps {
  language?: SupportedLanguage;
  onNavigateExperiment: (id: string) => void;
  onBack: () => void;
}

export const ExperimentLabHubScreen: React.FC<ExperimentLabHubScreenProps> = ({
  language = 'en',
  onNavigateExperiment,
  onBack,
}) => {
  const isTamil = language === 'ta';

  const {
    experiments,
    featuredExperiment,
    progressMap,
    bookmarks,
    filterState,
    stats,
    isLoading,
    setSubjectFilter,
    setSearchQuery,
    toggleBookmark,
  } = useExperimentLabHub();

  const subjectsWithAll: Array<{ id: ExperimentSubject | 'all'; label: { en: string; ta: string } }> = [
    { id: 'all', label: { en: 'All Subjects', ta: 'அனைத்து பாடங்கள்' } },
    ...EXPERIMENT_SUBJECTS.map((s) => ({ id: s.id, label: s.title })),
  ];

  // Quick experiments (duration <= 2 min)
  const quickExperiments = experiments.filter((e) => e.durationMinutes <= 2);

  // In-progress experiments
  const inProgressExperiments = experiments.filter(
    (e) => progressMap[e.id]?.status === 'in_progress' && !progressMap[e.id]?.completed
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <AppBackButton onPress={onBack} />
          <View style={styles.statsPill}>
            <Text style={styles.statsPillText}>
              🏆 {stats.completedCount}/{stats.totalCount} {isTamil ? 'முடிந்தது' : 'Done'}
            </Text>
          </View>
        </View>

        <Text style={styles.title}>{isTamil ? 'பரிசோதனை கூடம்' : 'Experiment Lab'}</Text>
        <Text style={styles.subtitle}>
          {isTamil
            ? 'மாறிகளை மாற்றி அறிவியலை நேரில் ஆராயுங்கள்.'
            : 'Explore science by changing variables.'}
        </Text>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder={
              isTamil
                ? 'பரிசோதனைகள், மாறிகள், சூத்திரங்களைத் தேடுக...'
                : 'Search experiments, variables, formulas...'
            }
            placeholderTextColor={colors.slate400}
            value={filterState.searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      {/* Subject Filter Chips */}
      <View style={styles.subjectTabsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.subjectTabsContainer}
        >
          {subjectsWithAll.map((tab) => {
            const isSelected = filterState.subject === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[styles.subjectTab, isSelected && styles.subjectTabSelected]}
                onPress={() => setSubjectFilter(tab.id)}
                activeOpacity={0.8}
                accessibilityRole="tab"
                accessibilityState={{ selected: isSelected }}
              >
                <Text style={[styles.subjectTabText, isSelected && styles.subjectTabTextSelected]}>
                  {isTamil ? tab.label.ta : tab.label.en}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Main Content Area */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.blue600} />
          <Text style={styles.loadingText}>{isTamil ? 'ஆய்வகம் ஏற்றப்படுகிறது...' : 'Loading Science Lab...'}</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Featured Experiment Banner (Only when viewing All and no search) */}
          {filterState.subject === 'all' && !filterState.searchQuery && featuredExperiment && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>
                {isTamil ? '🌟 இன்றைய சிறப்பு பரிசோதனை' : "🌟 Today's Featured Simulation"}
              </Text>
              <ExperimentCard
                experiment={featuredExperiment}
                progress={progressMap[featuredExperiment.id]}
                isBookmarked={bookmarks.includes(featuredExperiment.id)}
                language={language}
                variant="featured"
                onPress={onNavigateExperiment}
                onBookmarkToggle={toggleBookmark}
              />
            </View>
          )}

          {/* Continue Experimenting (In Progress) */}
          {inProgressExperiments.length > 0 && !filterState.searchQuery && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>
                {isTamil ? '🔄 தொடர்ந்து பரிசோதிக்கவும்' : '🔄 Continue Experimenting'}
              </Text>
              {inProgressExperiments.slice(0, 3).map((exp) => (
                <ExperimentCard
                  key={exp.id}
                  experiment={exp}
                  progress={progressMap[exp.id]}
                  isBookmarked={bookmarks.includes(exp.id)}
                  language={language}
                  variant="standard"
                  onPress={onNavigateExperiment}
                  onBookmarkToggle={toggleBookmark}
                />
              ))}
            </View>
          )}

          {/* Quick Experiments (2-3 min) */}
          {filterState.subject === 'all' && !filterState.searchQuery && quickExperiments.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>
                {isTamil ? '⚡ விரைவுப் பரிசோதனைகள் (2–3 நிமி)' : '⚡ Quick Experiments (2–3 min)'}
              </Text>
              {quickExperiments.slice(0, 3).map((exp) => (
                <ExperimentCard
                  key={exp.id}
                  experiment={exp}
                  progress={progressMap[exp.id]}
                  isBookmarked={bookmarks.includes(exp.id)}
                  language={language}
                  variant="standard"
                  onPress={onNavigateExperiment}
                  onBookmarkToggle={toggleBookmark}
                />
              ))}
            </View>
          )}

          {/* All Catalog List */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
              {filterState.subject === 'all'
                ? isTamil
                  ? 'அனைத்து பரிசோதனைகள்'
                  : 'All Science Simulations'
                : isTamil
                ? `${subjectsWithAll.find((s) => s.id === filterState.subject)?.label.ta || ''} பரிசோதனைகள்`
                : `${subjectsWithAll.find((s) => s.id === filterState.subject)?.label.en || ''} Experiments`}
              {' '}({experiments.length})
            </Text>

            {experiments.length > 0 ? (
              experiments.map((exp) => (
                <ExperimentCard
                  key={exp.id}
                  experiment={exp}
                  progress={progressMap[exp.id]}
                  isBookmarked={bookmarks.includes(exp.id)}
                  language={language}
                  variant="standard"
                  onPress={onNavigateExperiment}
                  onBookmarkToggle={toggleBookmark}
                />
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>🔍</Text>
                <Text style={styles.emptyTitle}>
                  {isTamil ? 'பரிசோதனைகள் கிடைக்கவில்லை' : 'No Experiments Found'}
                </Text>
                <Text style={styles.emptySubtitle}>
                  {isTamil
                    ? 'வேறு சொல் அல்லது பாடத்தைத் தேர்ந்தெடுத்து முயற்சிக்கவும்.'
                    : 'Try adjusting your search terms or filter.'}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.pearlWhite,
  },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statsPill: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  statsPillText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.blue600,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.navy900,
  },
  subtitle: {
    fontSize: 13,
    color: colors.slate600,
    marginTop: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginTop: 12,
    height: 44,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.navy900,
    paddingVertical: 0,
  },
  subjectTabsWrapper: {
    backgroundColor: colors.white,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  subjectTabsContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  subjectTab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  subjectTabSelected: {
    backgroundColor: colors.blue600,
    borderColor: colors.blue700,
  },
  subjectTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.slate600,
  },
  subjectTabTextSelected: {
    color: colors.white,
    fontWeight: '700',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.navy900,
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: colors.slate600,
    fontWeight: '600',
  },
  emptyContainer: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emptyIcon: {
    fontSize: 36,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.navy900,
  },
  emptySubtitle: {
    fontSize: 13,
    color: colors.slate500,
    marginTop: 4,
    textAlign: 'center',
  },
});
