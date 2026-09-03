/**
 * ProgressScreen Component (/progress)
 * Real analytics dashboard: overall quiz stats, subject-wise accuracy
 * breakdown, recent quiz attempts, and games progress — all computed
 * from local AsyncStorage data (no backend).
 */

import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { AppBackButton } from '../navigation';
import {
  getQuizHistory,
  getQuizStats,
  QuizHistoryEntry,
  QuizStats,
} from '../../features/quiz';
import { getAllGamesProgress } from '../../features/games';
import { LEARNING_SUBJECTS } from '../../features/learn';

interface ProgressScreenProps {
  language?: SupportedLanguage;
  onBack: () => void;
  onStartLearning: () => void;
}

interface SubjectMeta {
  title: string;
  titleTa: string;
  icon: string;
}

const SUBJECT_META: Record<string, SubjectMeta> = {
  physics: { title: 'Physics', titleTa: 'இயற்பியல்', icon: '⚛️' },
  chemistry: { title: 'Chemistry', titleTa: 'வேதியியல்', icon: '🧪' },
  biology: { title: 'Biology', titleTa: 'உயிரியல்', icon: '🧬' },
};

function getSubjectMeta(subjectId: string): SubjectMeta {
  const fromLearn = LEARNING_SUBJECTS.find((s) => s.id === subjectId);
  const known = SUBJECT_META[subjectId];
  return {
    title: fromLearn?.title || known?.title || subjectId,
    titleTa: known?.titleTa || subjectId,
    icon: fromLearn?.icon || known?.icon || '🔬',
  };
}

function formatDate(timestamp: number, isTamil: boolean): string {
  const d = new Date(timestamp);
  const day = d.getDate();
  const months = isTamil
    ? ['ஜன', 'பிப்', 'மார்', 'ஏப்', 'மே', 'ஜூன்', 'ஜூலை', 'ஆக', 'செப்', 'அக்', 'நவ', 'டிச']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${day} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export const ProgressScreen: React.FC<ProgressScreenProps> = ({
  language = 'en',
  onBack,
  onStartLearning,
}) => {
  const insets = useSafeAreaInsets();
  const isTamil = language === 'ta';

  const [history, setHistory] = useState<QuizHistoryEntry[]>([]);
  const [stats, setStats] = useState<QuizStats | null>(null);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [levelsCleared, setLevelsCleared] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const [h, s, games] = await Promise.all([
        getQuizHistory(),
        getQuizStats(),
        getAllGamesProgress(),
      ]);
      setHistory(h);
      setStats(s);

      let played = 0;
      let cleared = 0;
      Object.values(games).forEach((g) => {
        let gameHasCompletion = false;
        Object.entries(g.levels).forEach(([lvlKey, lvl]) => {
          if (!lvlKey.startsWith('level-') && lvl.completed) {
            cleared++;
            gameHasCompletion = true;
          }
        });
        if (gameHasCompletion) played++;
      });
      setGamesPlayed(played);
      setLevelsCleared(cleared);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const isEmpty = !isLoading && history.length === 0;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <AppBackButton onPress={onBack} language={language} style={styles.headerBackBtn} />
        <Text style={styles.headerTitle}>{isTamil ? 'கற்றல் முன்னேற்றம்' : 'My Progress'}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollBody}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom + 24, 32) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <Text style={styles.loadingText}>{isTamil ? 'ஏற்றுகிறது...' : 'Loading...'}</Text>
        ) : isEmpty ? (
          /* ---- Empty State: no quizzes yet ---- */
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>🚀</Text>
            <Text style={styles.emptyTitle}>
              {isTamil ? 'உங்கள் பயணத்தைத் தொடங்குங்கள்!' : 'Start Your First Quiz!'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {isTamil
                ? 'முதல் வினாடி வினாவை முடித்தவுடன் உங்கள் புள்ளிகள், தொடர்ச்சி மற்றும் துல்லியம் இங்கு தோன்றும்.'
                : 'Complete your first quiz and your points, streak, and accuracy will appear here.'}
            </Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={onStartLearning}
              activeOpacity={0.85}
              accessible={true}
              accessibilityRole="button"
            >
              <Text style={styles.primaryButtonText}>
                {isTamil ? 'முதல் வினாடி வினாவை எடுக்கவும் →' : 'Take Your First Quiz →'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* ---- Overall Stats Header ---- */}
            <View style={styles.statsCard}>
              <Text style={styles.sectionLabel}>
                {isTamil ? 'ஒட்டுமொத்த புள்ளிவிவரங்கள்' : 'OVERALL STATS'}
              </Text>
              <View style={styles.statsGrid}>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>{stats?.totalPoints ?? 0}</Text>
                  <Text style={styles.statLabel}>{isTamil ? 'மொத்த புள்ளிகள்' : 'Total Points'}</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>{stats?.quizzesCompleted ?? 0}</Text>
                  <Text style={styles.statLabel}>{isTamil ? 'வினாடி வினாக்கள்' : 'Quizzes Done'}</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>{stats?.currentStreakDays ?? 0}</Text>
                  <Text style={styles.statLabel}>{isTamil ? 'நாள் தொடர்ச்சி' : 'Day Streak'}</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>{stats?.overallAccuracy ?? 0}%</Text>
                  <Text style={styles.statLabel}>{isTamil ? 'ஒட்டுமொத்த துல்லியம்' : 'Accuracy'}</Text>
                </View>
              </View>
            </View>

            {/* ---- Subject-wise Breakdown ---- */}
            <View style={styles.card}>
              <Text style={styles.sectionLabel}>
                {isTamil ? 'பாடம் வாரியான முன்னேற்றம்' : 'SUBJECT-WISE BREAKDOWN'}
              </Text>
              {stats && stats.subjectStats.length > 0 ? (
                stats.subjectStats.map((s) => {
                  const meta = getSubjectMeta(s.subjectId);
                  return (
                    <View key={s.subjectId} style={styles.subjectRow}>
                      <View style={styles.subjectIconBox}>
                        <Text style={styles.subjectIcon}>{meta.icon}</Text>
                      </View>
                      <View style={styles.subjectInfo}>
                        <Text style={styles.subjectName}>
                          {isTamil ? meta.titleTa : meta.title}
                        </Text>
                        <Text style={styles.subjectMeta}>
                          {s.questionsAttempted} {isTamil ? 'கேள்விகள்' : 'questions'} ·{' '}
                          {s.quizzesCompleted} {isTamil ? 'வினாடி வினாக்கள்' : 'quizzes'}
                        </Text>
                      </View>
                      <View style={styles.accuracyWrap}>
                        <Text style={styles.accuracyText}>{s.accuracy}%</Text>
                        <View style={styles.accuracyTrack}>
                          <View
                            style={[
                              styles.accuracyFill,
                              { width: `${Math.min(100, s.accuracy)}%` },
                            ]}
                          />
                        </View>
                      </View>
                    </View>
                  );
                })
              ) : (
                <Text style={styles.noDataText}>
                  {isTamil ? 'இன்னும் பாடத் தரவு இல்லை.' : 'No subject data yet.'}
                </Text>
              )}
            </View>

            {/* ---- Recent Quiz Attempts ---- */}
            <View style={styles.card}>
              <Text style={styles.sectionLabel}>
                {isTamil ? 'சமீபத்திய வினாடி வினா முயற்சிகள்' : 'RECENT QUIZ ATTEMPTS'}
              </Text>
              {history.slice(0, 10).map((entry) => {
                const meta = getSubjectMeta(entry.subjectId);
                return (
                  <View key={entry.id} style={styles.attemptRow}>
                    <View style={styles.attemptLeft}>
                      <Text style={styles.attemptSubject}>
                        {isTamil ? meta.titleTa : meta.title}
                      </Text>
                      <Text style={styles.attemptDate}>
                        {formatDate(entry.completedAt, isTamil)} ·{' '}
                        {entry.totalQuestions} {isTamil ? 'கேள்விகள்' : 'Q'}
                      </Text>
                    </View>
                    <View style={styles.attemptRight}>
                      <Text
                        style={[
                          styles.attemptScore,
                          entry.percentage >= 70
                            ? styles.scoreGood
                            : entry.percentage >= 40
                              ? styles.scoreMid
                              : styles.scoreLow,
                        ]}
                      >
                        {entry.percentage}%
                      </Text>
                      <Text style={styles.attemptPoints}>+{entry.score} pts</Text>
                    </View>
                  </View>
                );
              })}
            </View>

            {/* ---- Games Progress ---- */}
            <View style={styles.card}>
              <Text style={styles.sectionLabel}>
                {isTamil ? 'ஆட்ட முன்னேற்றம்' : 'GAMES PROGRESS'}
              </Text>
              <View style={styles.gamesRow}>
                <View style={styles.gamesStat}>
                  <Text style={styles.statValue}>{gamesPlayed}</Text>
                  <Text style={styles.statLabel}>
                    {isTamil ? 'விளையாடிய ஆட்டங்கள்' : 'Games Played'}
                  </Text>
                </View>
                <View style={styles.gamesDivider} />
                <View style={styles.gamesStat}>
                  <Text style={styles.statValue}>{levelsCleared}</Text>
                  <Text style={styles.statLabel}>
                    {isTamil ? 'நிலைகள் நிறைவு' : 'Levels Cleared'}
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.sm,
  },
  headerBackBtn: {},
  headerTitle: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 44,
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.base,
    gap: theme.spacing.sm,
  },
  loadingText: {
    ...theme.typography.body,
    color: theme.colors.slate600,
    textAlign: 'center',
    marginTop: 40,
  },
  emptyCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xl,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  emptyIcon: {
    fontSize: 44,
    marginBottom: theme.spacing.sm,
  },
  emptyTitle: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    textAlign: 'center',
    marginBottom: 4,
  },
  emptySubtitle: {
    ...theme.typography.body,
    fontSize: 13.5,
    color: theme.colors.slate600,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: theme.spacing.lg,
  },
  primaryButton: {
    backgroundColor: theme.colors.actionPrimary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.md,
    shadowColor: theme.colors.actionPrimary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  primaryButtonText: {
    ...theme.typography.button,
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.textOnAction,
  },
  statsCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionLabel: {
    ...theme.typography.overline,
    fontSize: 10.5,
    fontWeight: '800',
    color: theme.colors.brandPrimary,
    letterSpacing: 1,
    marginBottom: theme.spacing.sm,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statBox: {
    width: '48%',
    backgroundColor: theme.colors.blue50,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  statValue: {
    ...theme.typography.h2,
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  statLabel: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.slate600,
    fontWeight: '700',
    textAlign: 'center',
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  subjectIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.green50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  subjectIcon: {
    fontSize: 20,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    ...theme.typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  subjectMeta: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.slate500,
  },
  accuracyWrap: {
    alignItems: 'flex-end',
    width: 74,
  },
  accuracyText: {
    ...theme.typography.caption,
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.success,
    marginBottom: 2,
  },
  accuracyTrack: {
    width: 70,
    height: 5,
    borderRadius: 3,
    backgroundColor: theme.colors.gray100,
    overflow: 'hidden',
  },
  accuracyFill: {
    height: '100%',
    backgroundColor: theme.colors.success,
    borderRadius: 3,
  },
  noDataText: {
    ...theme.typography.body,
    fontSize: 13,
    color: theme.colors.slate500,
    textAlign: 'center',
    paddingVertical: theme.spacing.md,
  },
  attemptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  attemptLeft: {
    flex: 1,
  },
  attemptSubject: {
    ...theme.typography.body,
    fontSize: 13.5,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  attemptDate: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.slate500,
    marginTop: 1,
  },
  attemptRight: {
    alignItems: 'flex-end',
  },
  attemptScore: {
    ...theme.typography.h3,
    fontSize: 16,
    fontWeight: '800',
  },
  scoreGood: {
    color: theme.colors.success,
  },
  scoreMid: {
    color: theme.colors.warning,
  },
  scoreLow: {
    color: theme.colors.error600,
  },
  attemptPoints: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.actionPrimary,
    fontWeight: '700',
  },
  gamesRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gamesStat: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  gamesDivider: {
    width: StyleSheet.hairlineWidth,
    height: 40,
    backgroundColor: theme.colors.border,
  },
});