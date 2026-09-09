/**
 * MicroLessonsHubScreen Component
 * Hub route (/micro-lessons): Search, status filters, subject tabs,
 * today's quick lesson, continue learning, collections, and catalog list.
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
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { AppBackButton } from '../navigation';
import {
  MicroLesson,
  MicroLessonCollection,
  MicroLessonFilterState,
  MicroLessonFilterStatus,
  MicroLessonProgress,
  MicroLessonSubjectId,
} from '../../features/micro-lessons/microLessons.types';
import { MICRO_LESSON_SUBJECTS } from '../../features/micro-lessons/microLessons.data';
import { MicroLessonCard } from './MicroLessonCard';
import { SupportedLanguage } from '../../config/i18n';

export interface MicroLessonsHubScreenProps {
  lessons: MicroLesson[];
  todayLesson: MicroLesson | null;
  recentLesson: MicroLesson | null;
  collections: MicroLessonCollection[];
  progressMap: Record<string, MicroLessonProgress>;
  bookmarks: string[];
  filterState: MicroLessonFilterState;
  summary: { total: number; completed: number; inProgress: number; percent: number };
  isLoading: boolean;
  language?: SupportedLanguage;
  onFilterChange: (filters: Partial<MicroLessonFilterState>) => void;
  onLessonPress: (lessonId: string) => void;
  onBookmarkToggle: (lessonId: string) => void;
  onBack: () => void;
}

export const MicroLessonsHubScreen: React.FC<MicroLessonsHubScreenProps> = ({
  lessons,
  todayLesson,
  recentLesson,
  collections,
  progressMap,
  bookmarks,
  filterState,
  summary,
  isLoading,
  language = 'en',
  onFilterChange,
  onLessonPress,
  onBookmarkToggle,
  onBack,
}) => {
  const insets = useSafeAreaInsets();
  const isTamil = language === 'ta';

  const STATUS_FILTERS: { id: MicroLessonFilterStatus; labelEn: string; labelTa: string }[] = [
    { id: 'all', labelEn: 'All', labelTa: 'அனைத்தும்' },
    { id: 'not_started', labelEn: 'Not Started', labelTa: 'தொடங்காதவை' },
    { id: 'in_progress', labelEn: 'In Progress', labelTa: 'முன்னேற்றத்தில்' },
    { id: 'completed', labelEn: 'Completed', labelTa: 'முடிந்தது' },
    { id: 'bookmarked', labelEn: 'Bookmarked', labelTa: 'சேமிக்கப்பட்டவை' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      <ScrollView
        style={styles.scrollBody}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top + 8, Platform.OS === 'android' ? 28 : 16),
            paddingBottom: Math.max(insets.bottom + 80, 96),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Bar */}
        <View style={styles.topHeader}>
          <AppBackButton
            onPress={onBack}
            language={language}
            variant="card"
            accessibilityLabel={isTamil ? 'பின்னே செல்லவும்' : 'Go back'}
          />

          <View style={styles.headerTitles}>
            <Text style={styles.headerTitleText}>
              {isTamil ? 'நுண்ணிய பாடங்கள்' : 'Micro Lessons'}
            </Text>
            <Text style={styles.headerSubtitleText}>
              {isTamil ? '1–3 நிமிட அறிவியல் கருத்துகள்' : '1–3 minute science concepts'}
            </Text>
          </View>

          <View style={styles.completionPill}>
            <Text style={styles.completionPillText}>
              {summary.completed}/{summary.total}
            </Text>
          </View>
        </View>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder={
              isTamil
                ? 'கருத்துகள், விதிகள், தலைப்புகளைத் தேடுக...'
                : 'Search topics, laws, concepts...'
            }
            placeholderTextColor={theme.colors.slate400}
            value={filterState.searchQuery}
            onChangeText={(text) => onFilterChange({ searchQuery: text })}
            clearButtonMode="while-editing"
            accessible={true}
            accessibilityLabel={isTamil ? 'பாடங்களைத் தேடுக' : 'Search micro lessons'}
          />
          {filterState.searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => onFilterChange({ searchQuery: '' })}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.clearSearchText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Status Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statusChipsRow}
        >
          {STATUS_FILTERS.map((filter) => {
            const isSelected = filterState.status === filter.id;
            return (
              <TouchableOpacity
                key={filter.id}
                style={[styles.statusChip, isSelected && styles.statusChipSelected]}
                onPress={() => onFilterChange({ status: filter.id })}
                activeOpacity={0.8}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={`${isTamil ? filter.labelTa : filter.labelEn} filter`}
              >
                <Text style={[styles.statusChipText, isSelected && styles.statusChipTextSelected]}>
                  {isTamil ? filter.labelTa : filter.labelEn}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Subject Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.subjectChipsRow}
        >
          <TouchableOpacity
            style={[
              styles.subjectChip,
              filterState.subjectId === 'all' && styles.subjectChipSelected,
            ]}
            onPress={() => onFilterChange({ subjectId: 'all' })}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.subjectChipText,
                filterState.subjectId === 'all' && styles.subjectChipTextSelected,
              ]}
            >
              {isTamil ? 'அனைத்து பாடங்கள்' : 'All Subjects'}
            </Text>
          </TouchableOpacity>

          {MICRO_LESSON_SUBJECTS.map((subj) => {
            const isSelected = filterState.subjectId === subj.id;
            return (
              <TouchableOpacity
                key={subj.id}
                style={[
                  styles.subjectChip,
                  isSelected && styles.subjectChipSelected,
                ]}
                onPress={() => onFilterChange({ subjectId: subj.id })}
                activeOpacity={0.8}
              >
                <Text style={styles.subjectChipIcon}>{subj.icon}</Text>
                <Text
                  style={[
                    styles.subjectChipText,
                    isSelected && styles.subjectChipTextSelected,
                  ]}
                >
                  {isTamil ? subj.title.ta : subj.title.en}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Loading Spinner */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.actionPrimary} />
          </View>
        )}

        {/* Unfiltered Default Sections (Shown only when not actively searching / filtering) */}
        {!isLoading && filterState.status === 'all' && filterState.subjectId === 'all' && filterState.searchQuery === '' && (
          <>
            {/* TODAY'S QUICK LESSON */}
            {Boolean(todayLesson) && (
              <View style={styles.sectionBlock}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionTitleEmoji}>⚡</Text>
                  <Text style={styles.sectionHeading}>
                    {isTamil ? 'இன்றைய விரைவு பாடம்' : "TODAY'S QUICK LESSON"}
                  </Text>
                </View>
                <MicroLessonCard
                  lesson={todayLesson!}
                  progress={progressMap[todayLesson!.id]}
                  language={language}
                  isBookmarked={bookmarks.includes(todayLesson!.id)}
                  onBookmarkPress={() => onBookmarkToggle(todayLesson!.id)}
                  onPress={() => onLessonPress(todayLesson!.id)}
                  variant="featured"
                />
              </View>
            )}

            {/* CONTINUE LEARNING (Recently opened in progress) */}
            {Boolean(recentLesson) && recentLesson!.id !== todayLesson?.id && (
              <View style={styles.sectionBlock}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionTitleEmoji}>▶️</Text>
                  <Text style={styles.sectionHeading}>
                    {isTamil ? 'தொடர்ந்து கற்கவும்' : 'CONTINUE LEARNING'}
                  </Text>
                </View>
                <MicroLessonCard
                  lesson={recentLesson!}
                  progress={progressMap[recentLesson!.id]}
                  language={language}
                  isBookmarked={bookmarks.includes(recentLesson!.id)}
                  onBookmarkPress={() => onBookmarkToggle(recentLesson!.id)}
                  onPress={() => onLessonPress(recentLesson!.id)}
                  variant="standard"
                />
              </View>
            )}

            {/* COLLECTIONS */}
            {collections.length > 0 && (
              <View style={styles.sectionBlock}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionTitleEmoji}>📚</Text>
                  <Text style={styles.sectionHeading}>
                    {isTamil ? 'தொகுப்புகள்' : 'CURATED COLLECTIONS'}
                  </Text>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.collectionsRow}>
                  {collections.map((coll) => (
                    <TouchableOpacity
                      key={coll.id}
                      style={styles.collectionCard}
                      onPress={() => {
                        // Open the first uncompleted or first lesson in collection
                        const firstLesson = coll.lessonIds[0];
                        if (firstLesson) onLessonPress(firstLesson);
                      }}
                      activeOpacity={0.85}
                      accessible={true}
                      accessibilityRole="button"
                    >
                      <Text style={styles.collectionIcon}>{coll.icon}</Text>
                      <Text style={styles.collectionTitle}>
                        {isTamil ? coll.title.ta : coll.title.en}
                      </Text>
                      <Text style={styles.collectionDesc} numberOfLines={2}>
                        {isTamil ? coll.description.ta : coll.description.en}
                      </Text>
                      <View style={styles.collectionBadge}>
                        <Text style={styles.collectionBadgeText}>
                          {coll.lessonIds.length} {isTamil ? 'பாடங்கள்' : 'lessons'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </>
        )}

        {/* LESSONS CATALOG (Filtered or Main List) */}
        {!isLoading && (
          <View style={styles.sectionBlock}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitleEmoji}>📖</Text>
              <Text style={styles.sectionHeading}>
                {filterState.status !== 'all' || filterState.subjectId !== 'all' || filterState.searchQuery !== ''
                  ? (isTamil ? `முடிவுகள் (${lessons.length})` : `Results (${lessons.length})`)
                  : (isTamil ? 'அனைத்து நுண்ணிய பாடங்கள்' : 'ALL MICRO LESSONS')}
              </Text>
            </View>

            {lessons.length === 0 ? (
              <View style={styles.emptyResultsBox}>
                <Text style={styles.emptyEmoji}>🔍</Text>
                <Text style={styles.emptyTitle}>
                  {isTamil ? 'பாடங்கள் எதுவும் கிடைக்கவில்லை' : 'No lessons found'}
                </Text>
                <Text style={styles.emptySubtitle}>
                  {isTamil
                    ? 'வடிப்பான்களை மாற்றி மீண்டும் முயற்சிக்கவும்.'
                    : 'Try changing your filters or search query.'}
                </Text>
              </View>
            ) : (
              lessons.map((lesson) => (
                <MicroLessonCard
                  key={lesson.id}
                  lesson={lesson}
                  progress={progressMap[lesson.id]}
                  language={language}
                  isBookmarked={bookmarks.includes(lesson.id)}
                  onBookmarkPress={() => onBookmarkToggle(lesson.id)}
                  onPress={() => onLessonPress(lesson.id)}
                  variant="standard"
                />
              ))
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    gap: 12,
  },
  headerTitles: {
    flex: 1,
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  headerSubtitleText: {
    fontSize: 12,
    color: theme.colors.slate600,
    marginTop: 2,
  },
  completionPill: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  completionPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803D',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    height: 46,
    marginBottom: theme.spacing.sm,
  },
  searchIcon: {
    fontSize: 15,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.navy900,
  },
  clearSearchText: {
    fontSize: 14,
    color: theme.colors.slate400,
    paddingHorizontal: 4,
  },
  statusChipsRow: {
    paddingVertical: 6,
    gap: 8,
  },
  statusChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statusChipSelected: {
    backgroundColor: theme.colors.actionPrimary,
    borderColor: theme.colors.actionPrimary,
  },
  statusChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.slate600,
  },
  statusChipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  subjectChipsRow: {
    paddingVertical: 6,
    gap: 8,
    marginBottom: theme.spacing.sm,
  },
  subjectChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 4,
  },
  subjectChipSelected: {
    backgroundColor: '#EFF6FF',
    borderColor: '#93C5FD',
  },
  subjectChipIcon: {
    fontSize: 12,
  },
  subjectChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.navy800,
  },
  subjectChipTextSelected: {
    color: theme.colors.actionPrimary,
    fontWeight: '700',
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  sectionBlock: {
    marginTop: theme.spacing.md,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: theme.spacing.sm,
  },
  sectionTitleEmoji: {
    fontSize: 14,
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.navy800,
    letterSpacing: 0.8,
  },
  collectionsRow: {
    gap: 12,
    paddingVertical: 4,
  },
  collectionCard: {
    width: 170,
    backgroundColor: '#FFFFFF',
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: theme.spacing.md,
    justifyContent: 'space-between',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  collectionIcon: {
    fontSize: 26,
    marginBottom: 6,
  },
  collectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginBottom: 4,
  },
  collectionDesc: {
    fontSize: 11,
    color: theme.colors.slate600,
    lineHeight: 15,
    marginBottom: 8,
  },
  collectionBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.sm,
  },
  collectionBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: theme.colors.slate600,
  },
  emptyResultsBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 32,
    alignItems: 'center',
    marginVertical: theme.spacing.md,
  },
  emptyEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  emptySubtitle: {
    fontSize: 12,
    color: theme.colors.slate500,
    marginTop: 4,
    textAlign: 'center',
  },
});
