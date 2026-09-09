/**
 * Achievements Feature Engine
 * Pure badge rule definitions, criteria evaluator, progress calculators,
 * next badge selector, and category filtering.
 *
 * Contains 43 data-driven badge definitions covering all science disciplines.
 */

import {
  Achievement,
  AchievementBadgeDefinition,
  AchievementBadgeId,
  AchievementCategory,
  AchievementEvaluationContext,
  AchievementInput,
  AchievementProgress,
  AchievementStatus,
  AchievementSummary,
} from './achievements.types';

export const ACHIEVEMENT_DEFINITIONS: AchievementBadgeDefinition[] = [
  // ==========================================================
  // 1. LEARNING (Quizzes, general science practice)
  // ==========================================================
  {
    id: 'first-step',
    title: { en: 'First Step', ta: 'முதல் படி' },
    description: { en: 'Complete your first science activity.', ta: 'உங்கள் முதல் அறிவியல் செயல்பாட்டை முடிக்கவும்.' },
    hint: { en: 'Complete any quiz, lesson, or game.', ta: 'எந்தவொரு வினாடி வினா அல்லது பாடத்தை முடிக்கவும்.' },
    icon: '🌱',
    category: 'learning',
    rarity: 'common',
    criteria: { type: 'activity_count', target: 1 },
    rewardXp: 20,
    relatedRoute: '/learn',
  },
  {
    id: 'first-quiz',
    title: { en: 'Concept Explorer', ta: 'கருத்து ஆய்வாளர்' },
    description: { en: 'Complete your first science quiz.', ta: 'உங்கள் முதல் அறிவியல் வினாடி வினாவை முடிக்கவும்.' },
    hint: { en: 'Finish any science quiz.', ta: 'அறிவியல் வினாடி வினாவை முடிக்கவும்.' },
    icon: '🧠',
    category: 'learning',
    rarity: 'common',
    criteria: { type: 'activity_type_count', activityType: 'quiz_completed', target: 1 },
    rewardXp: 25,
    relatedRoute: '/quizzes',
  },
  {
    id: 'quick-learner',
    title: { en: 'Quick Learner', ta: 'வேகமாகக் கற்பவர்' },
    description: { en: 'Complete 5 science learning activities.', ta: '5 அறிவியல் கற்றல் செயல்பாடுகளை முடிக்கவும்.' },
    hint: { en: 'Complete 5 quizzes or lessons.', ta: '5 வினாடி வினாக்கள் அல்லது பாடங்களை முடிக்கவும்.' },
    icon: '⚡',
    category: 'learning',
    rarity: 'common',
    criteria: { type: 'activity_count', target: 5 },
    rewardXp: 30,
    relatedRoute: '/learn',
  },
  {
    id: 'perfect-score',
    title: { en: 'Perfect Score', ta: 'முழு மதிப்பெண்' },
    description: { en: 'Score 100% on any science quiz.', ta: 'எந்த ஒரு வினாடி வினாவிலும் 100% மதிப்பெண் பெறவும்.' },
    hint: { en: 'Answer all questions correctly in a quiz.', ta: 'வினாடி வினாவில் அனைத்து கேள்விகளுக்கும் சரியாக பதிலளிக்கவும்.' },
    icon: '💯',
    category: 'learning',
    rarity: 'rare',
    criteria: { type: 'perfect_score_count', target: 1 },
    rewardXp: 50,
    relatedRoute: '/quizzes',
  },
  {
    id: 'quiz-10',
    title: { en: 'Quiz Regular', ta: 'வினாடி வினா வழக்கமானவர்' },
    description: { en: 'Complete 10 science quizzes.', ta: '10 அறிவியல் வினாடி வினாக்களை முடிக்கவும்.' },
    hint: { en: 'Finish 10 science quizzes in total.', ta: 'மொத்தம் 10 வினாடி வினாக்களை முடிக்கவும்.' },
    icon: '📚',
    category: 'learning',
    rarity: 'uncommon',
    criteria: { type: 'activity_type_count', activityType: 'quiz_completed', target: 10 },
    rewardXp: 40,
    relatedRoute: '/quizzes',
  },
  {
    id: 'science-scholar',
    title: { en: 'Science Scholar', ta: 'அறிவியல் அறிஞர்' },
    description: { en: 'Complete 25 science activities.', ta: '25 அறிவியல் செயல்பாடுகளை முடிக்கவும்.' },
    hint: { en: 'Complete 25 learning activities across science.', ta: '25 அறிவியல் செயல்பாடுகளை முடிக்கவும்.' },
    icon: '🎓',
    category: 'learning',
    rarity: 'rare',
    criteria: { type: 'activity_count', target: 25 },
    rewardXp: 60,
    relatedRoute: '/learn',
  },
  {
    id: 'knowledge-seeker',
    title: { en: 'Knowledge Seeker', ta: 'அறிவு தேடுபவர்' },
    description: { en: 'Complete 50 science activities.', ta: '50 அறிவியல் செயல்பாடுகளை முடிக்கவும்.' },
    hint: { en: 'Complete 50 learning activities across Vigyaan.', ta: 'மொத்தம் 50 கற்றல் செயல்பாடுகளை முடிக்கவும்.' },
    icon: '🌟',
    category: 'learning',
    rarity: 'epic',
    criteria: { type: 'activity_count', target: 50 },
    rewardXp: 100,
    relatedRoute: '/learn',
    certificateEligible: true,
  },
  {
    id: 'subject-master',
    title: { en: 'Subject Master', ta: 'பாட மேதை' },
    description: { en: 'Complete 10 quizzes in one subject with 80%+ accuracy.', ta: 'ஒரு பாடத்தில் 80%+ துல்லியத்துடன் 10 வினாடி வினாக்களை முடிக்கவும்.' },
    hint: { en: 'Master any single subject with 10 high-score quizzes.', ta: 'ஒரு பாடத்தில் 10 வினாடி வினாக்களில் அதிக மதிப்பெண் பெறவும்.' },
    icon: '🏆',
    category: 'learning',
    rarity: 'epic',
    criteria: { type: 'subject_quiz_count', target: 10, accuracyThreshold: 80 },
    rewardXp: 80,
    relatedRoute: '/learn',
    certificateEligible: true,
  },

  // ==========================================================
  // 2. STREAK (Consistency & Habits)
  // ==========================================================
  {
    id: 'streak-3',
    title: { en: '3-Day Streak', ta: '3 நாள் தொடர்ச்சி' },
    description: { en: 'Learn science on 3 consecutive days.', ta: 'தொடர்ந்து 3 நாட்கள் அறிவியல் கற்கவும்.' },
    hint: { en: 'Keep your science streak active for 3 days.', ta: '3 நாட்கள் தொடர்ச்சியைத் தக்கவைக்கவும்.' },
    icon: '🌱',
    category: 'streak',
    rarity: 'common',
    criteria: { type: 'streak_days', target: 3 },
    rewardXp: 30,
    relatedRoute: '/streak',
  },
  {
    id: 'streak-5',
    title: { en: '5-Day Streak', ta: '5 நாள் தொடர்ச்சி' },
    description: { en: 'Learn science on 5 consecutive days.', ta: 'தொடர்ந்து 5 நாட்கள் அறிவியல் கற்கவும்.' },
    hint: { en: 'Reach a 5-day learning streak.', ta: '5 நாட்கள் தொடர்ச்சியை அடையவும்.' },
    icon: '⚡',
    category: 'streak',
    rarity: 'uncommon',
    criteria: { type: 'streak_days', target: 5 },
    rewardXp: 40,
    relatedRoute: '/streak',
  },
  {
    id: 'streak-7',
    title: { en: '1-Week Champion', ta: '1 வார சாதனையாளர்' },
    description: { en: 'Maintain a 7-day science streak.', ta: '7 நாட்கள் அறிவியல் தொடர்ச்சியைப் பராமரிக்கவும்.' },
    hint: { en: 'Learn every day for a full week.', ta: 'ஒரு முழு வாரம் தினமும் கற்றுக்கொள்ளுங்கள்.' },
    icon: '🔥',
    category: 'streak',
    rarity: 'uncommon',
    criteria: { type: 'streak_days', target: 7 },
    rewardXp: 50,
    relatedRoute: '/streak',
  },
  {
    id: 'streak-14',
    title: { en: '2-Week Master', ta: '2 வார மேதை' },
    description: { en: 'Maintain a 14-day science streak.', ta: '14 நாட்கள் அறிவியல் தொடர்ச்சியைப் பராமரிக்கவும்.' },
    hint: { en: 'Learn every day for two consecutive weeks.', ta: 'இரண்டு வாரங்கள் தினமும் கற்றுக்கொள்ளுங்கள்.' },
    icon: '⚡',
    category: 'streak',
    rarity: 'rare',
    criteria: { type: 'streak_days', target: 14 },
    rewardXp: 70,
    relatedRoute: '/streak',
  },
  {
    id: 'streak-30',
    title: { en: 'Monthly Legend', ta: 'மாதந்திர சாதனை' },
    description: { en: 'Achieve a 30-day learning streak.', ta: '30 நாள் கற்றல் தொடர்ச்சியை அடையவும்.' },
    hint: { en: 'Build a powerful daily habit for a full month.', ta: 'ஒரு மாதம் முழுவதும் தினசரி பழக்கத்தை உருவாக்குங்கள்.' },
    icon: '⭐',
    category: 'streak',
    rarity: 'epic',
    criteria: { type: 'streak_days', target: 30 },
    rewardXp: 120,
    relatedRoute: '/streak',
    certificateEligible: true,
  },
  {
    id: 'streak-100',
    title: { en: 'Century Scholar', ta: '100 நாள் மேதை' },
    description: { en: 'Reach a phenomenal 100-day science streak.', ta: '100 நாள் அறிவியல் தொடர்ச்சியை அடையவும்.' },
    hint: { en: 'Complete 100 days of continuous science learning.', ta: '100 நாட்கள் தொடர்ச்சியாக அறிவியல் கற்கவும்.' },
    icon: '👑',
    category: 'streak',
    rarity: 'legendary',
    criteria: { type: 'streak_days', target: 100 },
    rewardXp: 250,
    relatedRoute: '/streak',
    certificateEligible: true,
  },

  // ==========================================================
  // 3. GAMES & PUZZLES
  // ==========================================================
  {
    id: 'first-game',
    title: { en: 'First Game', ta: 'முதல் ஆட்டம்' },
    description: { en: 'Complete a level in any science game.', ta: 'எந்தவொரு அறிவியல் ஆட்டத்திலும் ஒரு நிலையை முடிக்கவும்.' },
    hint: { en: 'Play any game in the Games Arcade.', ta: 'ஆட்டப் பகுதியில் ஏதேனும் ஒரு ஆட்டத்தை விளையாடுங்கள்.' },
    icon: '🎮',
    category: 'games',
    rarity: 'common',
    criteria: { type: 'game_level_count', target: 1 },
    rewardXp: 20,
    relatedRoute: '/games',
  },
  {
    id: 'puzzle-starter',
    title: { en: 'Puzzle Starter', ta: 'புதிர் தொடக்க வீரர்' },
    description: { en: 'Clear 5 science game levels.', ta: '5 அறிவியல் ஆட்ட நிலைகளை நிறைவு செய்யவும்.' },
    hint: { en: 'Complete 5 puzzle or game levels.', ta: '5 புதிர்கள் அல்லது ஆட்ட நிலைகளை முடிக்கவும்.' },
    icon: '🧩',
    category: 'games',
    rarity: 'common',
    criteria: { type: 'game_level_count', target: 5 },
    rewardXp: 30,
    relatedRoute: '/games',
  },
  {
    id: 'game-explorer',
    title: { en: 'Game Explorer', ta: 'ஆட்ட ஆய்வாளர்' },
    description: { en: 'Play 5 different science games.', ta: '5 வெவ்வேறு அறிவியல் ஆட்டங்களை விளையாடவும்.' },
    hint: { en: 'Explore at least 5 different science games.', ta: '5 வெவ்வேறு அறிவியல் ஆட்டங்களை ஆராயுங்கள்.' },
    icon: '🕹️',
    category: 'games',
    rarity: 'uncommon',
    criteria: { type: 'game_count', target: 5 },
    rewardXp: 40,
    relatedRoute: '/games',
  },
  {
    id: 'puzzle-explorer',
    title: { en: 'Puzzle Explorer', ta: 'புதிர் ஆய்வாளர்' },
    description: { en: 'Clear 25 science game levels.', ta: '25 அறிவியல் ஆட்ட நிலைகளை நிறைவு செய்யவும்.' },
    hint: { en: 'Solve 25 levels across any science games.', ta: 'அறிவியல் ஆட்டங்களில் 25 நிலைகளைத் தீர்க்கவும்.' },
    icon: '🎲',
    category: 'games',
    rarity: 'rare',
    criteria: { type: 'game_level_count', target: 25 },
    rewardXp: 60,
    relatedRoute: '/games',
  },
  {
    id: 'level-50',
    title: { en: 'Level Crusher', ta: 'நிலை வெற்றியாளர்' },
    description: { en: 'Clear 50 science game levels in total.', ta: 'மொத்தம் 50 ஆட்ட நிலைகளை நிறைவு செய்யவும்.' },
    hint: { en: 'Complete 50 levels across all science games.', ta: 'அனைத்து அறிவியல் ஆட்டங்களிலும் 50 நிலைகளை முடிக்கவும்.' },
    icon: '👾',
    category: 'games',
    rarity: 'epic',
    criteria: { type: 'game_level_count', target: 50 },
    rewardXp: 100,
    relatedRoute: '/games',
    certificateEligible: true,
  },

  // ==========================================================
  // 4. RIDDLES
  // ==========================================================
  {
    id: 'first-riddle',
    title: { en: 'Riddle Solver', ta: 'புதிர் தீர்ப்பவர்' },
    description: { en: 'Solve your first science riddle.', ta: 'உங்கள் முதல் அறிவியல் புதிரைத் தீர்க்கவும்.' },
    hint: { en: 'Solve any riddle in the Riddle Room.', ta: 'புதிர் அறையில் ஏதேனும் ஒரு புதிரைத் தீர்க்கவும்.' },
    icon: '💡',
    category: 'riddles',
    rarity: 'common',
    criteria: { type: 'riddle_count', target: 1 },
    rewardXp: 20,
    relatedRoute: '/riddles',
  },
  {
    id: 'riddle-explorer',
    title: { en: 'Riddle Explorer', ta: 'புதிர் ஆய்வாளர்' },
    description: { en: 'Solve 10 science riddles.', ta: '10 அறிவியல் புதிர்களைத் தீர்க்கவும்.' },
    hint: { en: 'Successfully solve 10 science riddles.', ta: '10 அறிவியல் புதிர்களை வெற்றிகரமாகத் தீர்க்கவும்.' },
    icon: '🔍',
    category: 'riddles',
    rarity: 'uncommon',
    criteria: { type: 'riddle_count', target: 10 },
    rewardXp: 40,
    relatedRoute: '/riddles',
  },
  {
    id: 'riddle-master',
    title: { en: 'Riddle Master', ta: 'புதிர் மேதை' },
    description: { en: 'Solve 25 science riddles.', ta: '25 அறிவியல் புதிர்களைத் தீர்க்கவும்.' },
    hint: { en: 'Crack 25 tricky science riddles.', ta: '25 அறிவியல் புதிர்களை உடைக்கவும்.' },
    icon: '🧙‍♂️',
    category: 'riddles',
    rarity: 'rare',
    criteria: { type: 'riddle_count', target: 25 },
    rewardXp: 70,
    relatedRoute: '/riddles',
  },

  // ==========================================================
  // 5. MYSTERY LAB
  // ==========================================================
  {
    id: 'first-case',
    title: { en: 'First Case Solved', ta: 'முதல் வழக்கு முடிவு' },
    description: { en: 'Solve your first science mystery case.', ta: 'உங்கள் முதல் அறிவியல் புதிர் வழக்கை தீர்க்கவும்.' },
    hint: { en: 'Crack any case in Mystery Lab.', ta: 'ஆய்வகத்தில் ஏதேனும் ஒரு வழக்கை தீர்க்கவும்.' },
    icon: '🔎',
    category: 'mystery',
    rarity: 'common',
    criteria: { type: 'mystery_count', target: 1 },
    rewardXp: 25,
    relatedRoute: '/mystery-lab',
  },
  {
    id: 'detective',
    title: { en: 'Science Detective', ta: 'அறிவியல் துப்பறிவாளர்' },
    description: { en: 'Solve 5 mystery cases.', ta: '5 புதிர் வழக்குகளைத் தீர்க்கவும்.' },
    hint: { en: 'Unravel clues and solve 5 science cases.', ta: 'ஆதாரங்களை ஆராய்ந்து 5 வழக்குகளை தீர்க்கவும்.' },
    icon: '🕵️',
    category: 'mystery',
    rarity: 'uncommon',
    criteria: { type: 'mystery_count', target: 5 },
    rewardXp: 50,
    relatedRoute: '/mystery-lab',
  },
  {
    id: 'science-detective',
    title: { en: 'Master Detective', ta: 'தலைமை துப்பறிவாளர்' },
    description: { en: 'Solve 10 mystery cases.', ta: '10 புதிர் வழக்குகளைத் தீர்க்கவும்.' },
    hint: { en: 'Solve 10 complex science mystery cases.', ta: '10 சிக்கலான அறிவியல் வழக்குகளைத் தீர்க்கவும்.' },
    icon: '🎖️',
    category: 'mystery',
    rarity: 'rare',
    criteria: { type: 'mystery_count', target: 10 },
    rewardXp: 80,
    relatedRoute: '/mystery-lab',
  },

  // ==========================================================
  // 6. MICRO LESSONS
  // ==========================================================
  {
    id: 'first-micro-lesson',
    title: { en: 'First Micro Lesson', ta: 'முதல் குறு பாடம்' },
    description: { en: 'Complete your first micro lesson.', ta: 'உங்கள் முதல் குறு பாடத்தை முடிக்கவும்.' },
    hint: { en: 'Read and complete any bite-sized lesson.', ta: 'ஏதேனும் ஒரு குறு பாடத்தைப் படித்து முடிக்கவும்.' },
    icon: '📖',
    category: 'micro-lessons',
    rarity: 'common',
    criteria: { type: 'micro_lesson_count', target: 1 },
    rewardXp: 40,
    relatedRoute: '/micro-lessons',
  },
  {
    id: 'micro-lesson-5',
    title: { en: 'Quick Study', ta: 'விரைவுப் படிப்பு' },
    description: { en: 'Complete 5 micro lessons.', ta: '5 குறு பாடங்களை முடிக்கவும்.' },
    hint: { en: 'Finish 5 bite-sized science lessons.', ta: '5 அறிவியல் குறு பாடங்களை முடிக்கவும்.' },
    icon: '⚡',
    category: 'micro-lessons',
    rarity: 'common',
    criteria: { type: 'micro_lesson_count', target: 5 },
    rewardXp: 30,
    relatedRoute: '/micro-lessons',
  },
  {
    id: 'micro-lesson-10',
    title: { en: 'Lesson Explorer', ta: 'பாட ஆய்வாளர்' },
    description: { en: 'Complete 10 micro lessons.', ta: '10 குறு பாடங்களை முடிக்கவும்.' },
    hint: { en: 'Finish 10 bite-sized science lessons.', ta: '10 அறிவியல் குறு பாடங்களை முடிக்கவும்.' },
    icon: '🌟',
    category: 'micro-lessons',
    rarity: 'uncommon',
    criteria: { type: 'micro_lesson_count', target: 10 },
    rewardXp: 45,
    relatedRoute: '/micro-lessons',
  },
  {
    id: 'micro-lesson-25',
    title: { en: 'Micro Master', ta: 'குறு பாட மேதை' },
    description: { en: 'Complete 25 micro lessons.', ta: '25 குறு பாடங்களை முடிக்கவும்.' },
    hint: { en: 'Complete 25 micro lessons in Vigyaan.', ta: '25 குறு பாடங்களை நிறைவு செய்யவும்.' },
    icon: '🎓',
    category: 'micro-lessons',
    rarity: 'rare',
    criteria: { type: 'micro_lesson_count', target: 25 },
    rewardXp: 75,
    relatedRoute: '/micro-lessons',
  },
  {
    id: 'micro-lesson-explorer',
    title: { en: 'Cross-Discipline Explorer', ta: 'பன்முகப் பாட ஆய்வாளர்' },
    description: { en: 'Complete micro lessons in 4+ different subjects.', ta: '4+ வெவ்வேறு பாடங்களில் குறு பாடங்களை முடிக்கவும்.' },
    hint: { en: 'Explore lessons across Physics, Chemistry, Biology and more.', ta: 'பல்வேறு பாடங்களில் பாடங்களை ஆராயுங்கள்.' },
    icon: '🧭',
    category: 'micro-lessons',
    rarity: 'rare',
    criteria: { type: 'micro_lesson_count', target: 4, subjectCount: 4 },
    rewardXp: 60,
    relatedRoute: '/micro-lessons',
  },

  // ==========================================================
  // 7. CONCEPT MAPS
  // ==========================================================
  {
    id: 'first-concept-map',
    title: { en: 'First Concept Map', ta: 'முதல் கருத்து வரைபடம்' },
    description: { en: 'Explore and complete your first concept map.', ta: 'உங்கள் முதல் கருத்து வரைபடத்தை ஆராய்ந்து முடிக்கவும்.' },
    hint: { en: 'Navigate all nodes in any concept map.', ta: 'கருத்து வரைபடத்தின் முனைகளை ஆராயுங்கள்.' },
    icon: '🗺️',
    category: 'concept-maps',
    rarity: 'common',
    criteria: { type: 'concept_map_count', target: 1 },
    rewardXp: 40,
    relatedRoute: '/concept-maps',
  },
  {
    id: 'concept-map-5',
    title: { en: 'Map Navigator', ta: 'வரைபட மாலுமி' },
    description: { en: 'Complete 5 science concept maps.', ta: '5 அறிவியல் கருத்து வரைபடங்களை முடிக்கவும்.' },
    hint: { en: 'Explore 5 full concept maps.', ta: '5 கருத்து வரைபடங்களை முழுமையாக ஆராயுங்கள்.' },
    icon: '🧭',
    category: 'concept-maps',
    rarity: 'uncommon',
    criteria: { type: 'concept_map_count', target: 5 },
    rewardXp: 35,
    relatedRoute: '/concept-maps',
  },
  {
    id: 'concept-map-10',
    title: { en: 'Master Cartographer', ta: 'தலைமை வரைபடக் கலைஞர்' },
    description: { en: 'Complete 10 science concept maps.', ta: '10 அறிவியல் கருத்து வரைபடங்களை முடிக்கவும்.' },
    hint: { en: 'Master 10 interconnected concept networks.', ta: '10 கருத்து வரைபடங்களை நிறைவு செய்யவும்.' },
    icon: '🌐',
    category: 'concept-maps',
    rarity: 'rare',
    criteria: { type: 'concept_map_count', target: 10 },
    rewardXp: 60,
    relatedRoute: '/concept-maps',
  },
  {
    id: 'concept-explorer',
    title: { en: 'Big Picture Thinker', ta: 'கருத்து ஆய்வாளர்' },
    description: { en: 'Complete concept maps across 4+ different subjects.', ta: '4+ வெவ்வேறு பாடங்களில் கருத்து வரைபடங்களை முடிக்கவும்.' },
    hint: { en: 'Connect science ideas across 4 subjects.', ta: '4 பாடங்களில் அறிவியல் கருத்துகளை இணைக்கவும்.' },
    icon: '🔭',
    category: 'concept-maps',
    rarity: 'rare',
    criteria: { type: 'concept_map_count', target: 4, subjectCount: 4 },
    rewardXp: 60,
    relatedRoute: '/concept-maps',
  },

  // ==========================================================
  // 8. EXPERIMENT LAB
  // ==========================================================
  {
    id: 'first-experiment',
    title: { en: 'Junior Scientist', ta: 'இளம் விஞ்ஞானி' },
    description: { en: 'Run and complete your first virtual science experiment.', ta: 'உங்கள் முதல் மெய்நிகர் அறிவியல் பரிசோதனையை செய்து முடிக்கவும்.' },
    hint: { en: 'Conduct any virtual experiment.', ta: 'ஆய்வகத்தில் ஏதேனும் ஒரு பரிசோதனையை நடத்தவும்.' },
    icon: '🧪',
    category: 'experiments',
    rarity: 'common',
    criteria: { type: 'experiment_count', target: 1 },
    rewardXp: 40,
    relatedRoute: '/experiment-lab',
  },
  {
    id: 'experiment-5',
    title: { en: 'Lab Assistant', ta: 'ஆய்வக உதவியாளர்' },
    description: { en: 'Complete 5 science simulations.', ta: '5 அறிவியல் உருவகப்படுத்துதல்களை முடிக்கவும்.' },
    hint: { en: 'Run 5 virtual lab experiments.', ta: '5 ஆய்வக பரிசோதனைகளை செய்து முடிக்கவும்.' },
    icon: '🔬',
    category: 'experiments',
    rarity: 'uncommon',
    criteria: { type: 'experiment_count', target: 5 },
    rewardXp: 45,
    relatedRoute: '/experiment-lab',
  },
  {
    id: 'experiment-10',
    title: { en: 'Virtual Scientist', ta: 'மூத்த ஆராய்ச்சியாளர்' },
    description: { en: 'Complete 10 science simulations.', ta: '10 அறிவியல் உருவகப்படுத்துதல்களை முடிக்கவும்.' },
    hint: { en: 'Conduct 10 science experiments.', ta: '10 அறிவியல் பரிசோதனைகளை நடத்தவும்.' },
    icon: '⚡',
    category: 'experiments',
    rarity: 'rare',
    criteria: { type: 'experiment_count', target: 10 },
    rewardXp: 75,
    relatedRoute: '/experiment-lab',
  },
  {
    id: 'science-lab-explorer',
    title: { en: 'Lab Pioneer', ta: 'அறிவியல் கூடம் ஆய்வாளர்' },
    description: { en: 'Complete experiments across 4+ different science subjects.', ta: '4+ வெவ்வேறு அறிவியல் பாடங்களில் பரிசோதனைகளை முடிக்கவும்.' },
    hint: { en: 'Experiment across Physics, Chemistry, Biology and more.', ta: 'பல்வேறு பாடங்களில் ஆய்வகப் சோதனைகளை நடத்தவும்.' },
    icon: '🥼',
    category: 'experiments',
    rarity: 'rare',
    criteria: { type: 'experiment_count', target: 4, subjectCount: 4 },
    rewardXp: 60,
    relatedRoute: '/experiment-lab',
  },

  // ==========================================================
  // 9. DISCOVERY (Fun Facts)
  // ==========================================================
  {
    id: 'fact-finder',
    title: { en: 'Fact Finder', ta: 'தகவல் தேடுபவர்' },
    description: { en: 'Discover 10 science facts.', ta: '10 அறிவியல் தகவல்களைக் கண்டறியவும்.' },
    hint: { en: 'Explore 10 daily science facts.', ta: '10 சுவாரஸ்ய அறிவியல் தகவல்களைப் படியுங்கள்.' },
    icon: '💡',
    category: 'discovery',
    rarity: 'common',
    criteria: { type: 'fact_count', target: 10 },
    rewardXp: 30,
    relatedRoute: '/fun-facts',
  },
  {
    id: 'curious-mind',
    title: { en: 'Curious Mind', ta: 'ஆர்வமுள்ள மனம்' },
    description: { en: 'Discover 25 science facts.', ta: '25 அறிவியல் தகவல்களைக் கண்டறியவும்.' },
    hint: { en: 'Read 25 fascinating science facts.', ta: '25 அறிவியல் உண்மைகளை ஆராயுங்கள்.' },
    icon: '✨',
    category: 'discovery',
    rarity: 'uncommon',
    criteria: { type: 'fact_count', target: 25 },
    rewardXp: 50,
    relatedRoute: '/fun-facts',
  },

  // ==========================================================
  // 10. SPECIAL & HABIT
  // ==========================================================
  {
    id: 'daily-goal-starter',
    title: { en: 'Daily Goal Starter', ta: 'இலக்கு தொடக்க வீரர்' },
    description: { en: 'Complete your first daily goal.', ta: 'உங்கள் முதல் தினசரி இலக்கை முடிக்கவும்.' },
    hint: { en: 'Finish all activities for today\'s goal.', ta: 'இன்றைய இலக்கின் அனைத்து செயல்பாடுகளையும் முடிக்கவும்.' },
    icon: '🎯',
    category: 'special',
    rarity: 'common',
    criteria: { type: 'daily_goal_count', target: 1 },
    rewardXp: 25,
    relatedRoute: '/daily-goal',
  },
  {
    id: 'goal-getter',
    title: { en: 'Goal Getter', ta: 'இலக்கு சாதனையாளர்' },
    description: { en: 'Complete 7 daily goals.', ta: '7 தினசரி இலக்குகளை முடிக்கவும்.' },
    hint: { en: 'Finish 7 daily goals over your science journey.', ta: '7 தினசரி இலக்குகளை வெற்றிகரமாக முடிக்கவும்.' },
    icon: '🏅',
    category: 'special',
    rarity: 'rare',
    criteria: { type: 'daily_goal_count', target: 7 },
    rewardXp: 75,
    relatedRoute: '/daily-goal',
  },
  {
    id: 'science-polymath',
    title: { en: 'Science Polymath', ta: 'பன்முக அறிவியல் மேதை' },
    description: { en: 'Complete at least 1 activity in Quiz, Micro Lesson, Concept Map, Experiment, Game, and Riddle.', ta: 'வினாடி வினா, பாடம், வரைபடம், பரிசோதனை, ஆட்டம் மற்றும் புதிரில் தலா 1 முடிக்கவும்.' },
    hint: { en: 'Try all 6 learning modes across Vigyaan.', ta: 'அனைத்து 6 கற்றல் முறைகளையும் பயன்படுத்திப் பாருங்கள்.' },
    icon: '🔮',
    category: 'special',
    rarity: 'legendary',
    criteria: {
      type: 'multi_type_count',
      target: 6,
      requiredTypes: [
        'quiz_completed',
        'micro_lesson_completed',
        'concept_map_completed',
        'experiment_completed',
        'game_completed',
        'riddle_completed',
      ],
    },
    rewardXp: 150,
    relatedRoute: '/explore',
    certificateEligible: true,
  },
];

export const ACHIEVEMENT_BADGES = ACHIEVEMENT_DEFINITIONS;

const DEFINITION_MAP = new Map<AchievementBadgeId, AchievementBadgeDefinition>();
ACHIEVEMENT_DEFINITIONS.forEach((def) => {
  DEFINITION_MAP.set(def.id, def);
});

export function getBadgeDefinition(id: AchievementBadgeId): AchievementBadgeDefinition {
  const found = DEFINITION_MAP.get(id);
  if (!found) {
    // Fallback safety
    return ACHIEVEMENT_DEFINITIONS[0];
  }
  return found;
}

/**
 * Pure evaluation function: computes exact progress numbers and status
 * for a single badge against the given context.
 */
export function calculateAchievementProgress(
  def: AchievementBadgeDefinition,
  ctx: AchievementEvaluationContext,
  unlockedAt: number | null = null
): AchievementProgress {
  const { criteria } = def;
  let current = 0;

  switch (criteria.type) {
    case 'activity_count':
      current = ctx.activityHistory.length;
      break;

    case 'activity_type_count':
      if (criteria.activityType) {
        if (criteria.activityType === 'quiz_completed') {
          current = Math.max(
            ctx.activityHistory.filter((a) => a.type === criteria.activityType).length,
            ctx.quizHistory.length,
            ctx.quizStats?.quizzesCompleted ?? 0
          );
        } else {
          current = ctx.activityHistory.filter((a) => a.type === criteria.activityType).length;
        }
      }
      break;

    case 'streak_days':
      current = Math.max(
        ctx.streakInfo?.currentStreak ?? 0,
        ctx.streakInfo?.longestStreak ?? 0,
        ctx.quizStats?.currentStreakDays ?? 0,
        ctx.quizStats?.longestStreakDays ?? 0
      );
      break;

    case 'game_level_count':
      current = ctx.totalLevelsCleared;
      break;

    case 'game_count':
      current = ctx.gamesPlayedCount;
      break;

    case 'riddle_count':
      current = ctx.riddlesSolvedCount;
      break;

    case 'mystery_count':
      current = ctx.mysteriesSolvedCount;
      break;

    case 'experiment_count':
      if (criteria.subjectCount && criteria.subjectCount > 1) {
        current = ctx.experimentSubjectsCount;
      } else {
        current = ctx.experimentsCompletedCount;
      }
      break;

    case 'micro_lesson_count':
      if (criteria.subjectCount && criteria.subjectCount > 1) {
        current = ctx.microLessonSubjectsCount;
      } else {
        current = ctx.microLessonsCompletedCount;
      }
      break;

    case 'concept_map_count':
      if (criteria.subjectCount && criteria.subjectCount > 1) {
        current = ctx.conceptMapSubjectsCount;
      } else {
        current = ctx.conceptMapsCompletedCount;
      }
      break;

    case 'fact_count':
      current = ctx.factsDiscoveredCount;
      break;

    case 'daily_goal_count':
      current = ctx.dailyGoalsCompletedCount;
      break;

    case 'perfect_score_count':
      current = ctx.quizHistory.filter((q) => q.percentage === 100).length;
      break;

    case 'subject_quiz_count': {
      const minAcc = criteria.accuracyThreshold ?? 80;
      const bestSubjectCount = ctx.quizStats.subjectStats.reduce((max, s) => {
        if (s.accuracy >= minAcc && s.quizzesCompleted > max) {
          return s.quizzesCompleted;
        }
        return max;
      }, 0);
      current = bestSubjectCount;
      break;
    }

    case 'multi_type_count': {
      const required = criteria.requiredTypes ?? [];
      const completedTypes = new Set(ctx.activityHistory.map((a) => a.type));
      let matchCount = 0;
      for (const req of required) {
        if (completedTypes.has(req)) {
          matchCount++;
        }
      }
      current = matchCount;
      break;
    }

    default:
      current = 0;
  }

  const target = Math.max(1, criteria.target);
  const isSatisfied = current >= target;
  const isUnlocked = unlockedAt !== null || isSatisfied;

  let status: AchievementStatus = 'locked';
  if (isUnlocked) {
    status = 'unlocked';
  } else if (current > 0) {
    status = 'in_progress';
  }

  const percent = isUnlocked ? 100 : Math.min(100, Math.max(0, Math.round((current / target) * 100)));
  const remaining = Math.max(0, target - current);

  return {
    current,
    target,
    percent,
    status,
    remaining,
  };
}

/**
 * Pure function: evaluates all definitions against context and unlocked map.
 */
export function evaluateAllAchievements(
  definitions: AchievementBadgeDefinition[],
  context: AchievementEvaluationContext,
  unlockedMap: Map<AchievementBadgeId, number>
): Achievement[] {
  return definitions.map((def) => {
    const unlockedAt = unlockedMap.get(def.id) ?? null;
    const progress = calculateAchievementProgress(def, context, unlockedAt);

    return {
      ...def,
      status: progress.status,
      progress,
      unlockedAt,
    };
  });
}

/**
 * Deterministically selects the student's next achievable badge.
 * Prioritizes badges currently in-progress with the closest completion percentage.
 * If none are in progress, selects the first locked badge.
 */
export function selectNextAchievement(achievements: Achievement[]): Achievement | null {
  const inProgress = achievements.filter((a) => a.status === 'in_progress');

  if (inProgress.length > 0) {
    // Sort by completion percentage descending, then by fewest remaining items
    inProgress.sort((a, b) => {
      if (b.progress.percent !== a.progress.percent) {
        return b.progress.percent - a.progress.percent;
      }
      return a.progress.remaining - b.progress.remaining;
    });
    return inProgress[0];
  }

  const locked = achievements.filter((a) => a.status === 'locked');
  return locked.length > 0 ? locked[0] : null;
}

/**
 * Returns recent unlocks sorted newest first.
 */
export function getRecentUnlocks(achievements: Achievement[], limit = 4): Achievement[] {
  return achievements
    .filter((a) => a.status === 'unlocked' && a.unlockedAt !== null)
    .sort((a, b) => (b.unlockedAt ?? 0) - (a.unlockedAt ?? 0))
    .slice(0, limit);
}

/**
 * Filters achievements by status and category tabs.
 */
export function filterAchievements(
  achievements: Achievement[],
  statusFilter: 'all' | 'unlocked' | 'in_progress' | 'locked',
  categoryFilter: string = 'all'
): Achievement[] {
  return achievements.filter((a) => {
    // Status filter
    if (statusFilter !== 'all' && a.status !== statusFilter) {
      return false;
    }

    // Category filter
    if (categoryFilter !== 'all') {
      if (categoryFilter === 'learning') {
        if (a.category !== 'learning' && a.category !== 'mastery') return false;
      } else if (categoryFilter === 'experiments') {
        if (a.category !== 'experiments' && a.category !== 'experiment-lab') return false;
      } else if (a.category !== categoryFilter) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Pure calculation of summary statistics for the achievements gallery.
 */
export function calculateAchievementSummary(achievements: Achievement[]): AchievementSummary {
  const totalCount = achievements.length;
  let unlockedCount = 0;
  let inProgressCount = 0;
  let lockedCount = 0;
  let totalRewardXpEarned = 0;

  for (const a of achievements) {
    if (a.status === 'unlocked') {
      unlockedCount++;
      totalRewardXpEarned += a.rewardXp;
    } else if (a.status === 'in_progress') {
      inProgressCount++;
    } else {
      lockedCount++;
    }
  }

  const overallPercent = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

  return {
    totalCount,
    unlockedCount,
    inProgressCount,
    lockedCount,
    totalRewardXpEarned,
    overallPercent,
  };
}

/**
 * Backward compatibility: legacy pure evaluation returning badge IDs satisfied.
 */
export function evaluateUnlockedBadges(input: AchievementInput): AchievementBadgeId[] {
  // Synthesize context from legacy input
  const history = input.quizHistory;
  const stats = input.quizStats;

  const mockCtx: AchievementEvaluationContext = {
    activityHistory: [],
    streakInfo: {
      currentStreak: Math.max(stats.currentStreakDays, stats.longestStreakDays),
      longestStreak: Math.max(stats.currentStreakDays, stats.longestStreakDays),
      lastActiveDate: null,
      activeDates: [],
    },
    quizHistory: history,
    quizStats: stats,
    gamesPlayedCount: input.gamesPlayedCount,
    totalLevelsCleared: input.totalLevelsCleared,
    microLessonsCompletedCount: input.microLessonsCompletedCount ?? 0,
    microLessonSubjectsCount: input.microLessonSubjectsCount ?? 0,
    conceptMapsCompletedCount: input.conceptMapsCompletedCount ?? 0,
    conceptMapSubjectsCount: input.conceptMapSubjectsCount ?? 0,
    experimentsCompletedCount: input.experimentsCompletedCount ?? 0,
    experimentSubjectsCount: input.experimentSubjectsCount ?? 0,
    riddlesSolvedCount: input.riddlesSolvedCount ?? 0,
    mysteriesSolvedCount: input.mysteriesSolvedCount ?? 0,
    factsDiscoveredCount: input.factsDiscoveredCount ?? 0,
    dailyGoalsCompletedCount: input.dailyGoalsCompletedCount ?? 0,
  };

  const unlocked: AchievementBadgeId[] = [];
  for (const def of ACHIEVEMENT_DEFINITIONS) {
    const p = calculateAchievementProgress(def, mockCtx, null);
    if (p.current >= p.target) {
      unlocked.push(def.id);
    }
  }

  return unlocked;
}