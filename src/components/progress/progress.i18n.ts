/**
 * Progress UI i18n Bridge
 * Strongly typed localized strings for Subject Progress 2.0.
 * Complete parity for English and Tamil. Zero shaming or deficit language.
 */

import { SupportedLanguage } from '../../config/i18n';

export interface ProgressI18n {
  journeyTitle: string;
  journeySubtitle: string;
  myScienceProgress: string;
  overallActivityProgress: string;
  activityProgress: string;
  practiceAccuracy: string;
  topicCoverage: string;
  recentAccuracy: string;
  topicsExploredCount: string;
  accuracyPercent: string;
  streakDays: string;
  totalXp: string;
  achievements: string;
  summary: {
    subjectsExplored: string;
    topicsExplored: string;
    activitiesCompleted: string;
    badgesEarned: string;
    certificatesEarned: string;
  };
  strengths: {
    title: string;
    subtitle: string;
    noStrengthsYet: string;
    keepExploringToDiscover: string;
  };
  focusAreas: {
    title: string;
    countLabel: string;
    viewAll: string;
    suggestedPractice: string;
  };
  subjects: {
    viewProgress: string;
    notExploredYet: string;
    exploredRatio: string;
    topicsCount: string;
    trendLabel: string;
  };
  subjectDetail: {
    progress: string;
    activity: string;
    accuracy: string;
    trend: string;
    topicsTitle: string;
    focusAreasTitle: string;
    recentActivityTitle: string;
    nextStepTitle: string;
    noActivitiesYet: string;
    noFocusAreas: string;
    greatCoverage: string;
  };
  topicStatus: {
    not_started: string;
    exploring: string;
    in_progress: string;
    strong: string;
    improving: string;
    focus_area: string;
    completed: string;
  };
  trends: {
    improving: string;
    improvingDesc: string;
    stable: string;
    stableDesc: string;
    declining: string;
    decliningDesc: string;
    insufficientData: string;
    insufficientDataDesc: string;
  };
  actions: {
    continueLearning: string;
    practice: string;
    microLesson: string;
    conceptMap: string;
    experiment: string;
    exploreScience: string;
    retry: string;
    back: string;
  };
  emptyState: {
    title: string;
    subtitle: string;
    cta: string;
  };
  accessibility: {
    heroCard: string;
    subjectCard: string;
    topicCard: string;
    statBox: string;
  };
}

const STRINGS_EN: ProgressI18n = {
  journeyTitle: 'My Science Journey',
  journeySubtitle: 'Your exploration, practice, and accomplishments across science',
  myScienceProgress: 'MY SCIENCE PROGRESS',
  overallActivityProgress: 'Overall Activity Progress',
  activityProgress: 'Activity Progress',
  practiceAccuracy: 'Practice Accuracy',
  topicCoverage: 'Topic Coverage',
  recentAccuracy: 'Recent Accuracy',
  topicsExploredCount: '{explored} of {total} explored',
  accuracyPercent: '{accuracy}% accuracy',
  streakDays: '{count} day streak',
  totalXp: '{count} XP',
  achievements: '{count} badges',
  summary: {
    subjectsExplored: 'Subjects Explored',
    topicsExplored: 'Topics Explored',
    activitiesCompleted: 'Activities Done',
    badgesEarned: 'Badges Earned',
    certificatesEarned: 'Certificates',
  },
  strengths: {
    title: 'YOUR STRENGTHS',
    subtitle: 'Areas where you have built strong confidence and understanding',
    noStrengthsYet: 'Discover your strengths as you explore more topics!',
    keepExploringToDiscover: 'Complete activities to discover your strongest science areas.',
  },
  focusAreas: {
    title: 'AREAS TO STRENGTHEN',
    countLabel: '{count} focus areas identified',
    viewAll: 'View Practice Suggestions →',
    suggestedPractice: 'A little more practice here will help you master these concepts.',
  },
  subjects: {
    viewProgress: 'View Progress',
    notExploredYet: 'Not explored yet',
    exploredRatio: '{explored} / {total} explored',
    topicsCount: '{count} topics',
    trendLabel: 'Trend',
  },
  subjectDetail: {
    progress: 'Subject Progress',
    activity: 'Activities',
    accuracy: 'Accuracy',
    trend: 'Trend',
    topicsTitle: 'TOPICS',
    focusAreasTitle: 'FOCUS AREAS',
    recentActivityTitle: 'RECENT ACTIVITY',
    nextStepTitle: 'RECOMMENDED NEXT STEP',
    noActivitiesYet: 'No recent activity in this subject yet.',
    noFocusAreas: 'Looking great! No focus areas needed here.',
    greatCoverage: 'Great coverage! All current topics explored.',
  },
  topicStatus: {
    not_started: 'Not Started',
    exploring: 'Exploring',
    in_progress: 'In Progress',
    strong: 'Strong',
    improving: 'Improving',
    focus_area: 'Focus Area',
    completed: 'Completed',
  },
  trends: {
    improving: 'Improving',
    improvingDesc: 'Your recent practice is stronger than your earlier results.',
    stable: 'Stable',
    stableDesc: 'Your performance has remained steady.',
    declining: 'Needs Practice',
    decliningDesc: 'More practice will help strengthen these concepts.',
    insufficientData: 'Keep Practicing',
    insufficientDataDesc: 'Complete a few more questions to view your trend.',
  },
  actions: {
    continueLearning: 'Continue Learning',
    practice: 'Practice Questions',
    microLesson: '2-Min Lesson',
    conceptMap: 'See Big Picture',
    experiment: 'Try Simulation',
    exploreScience: 'Explore Science',
    retry: 'Try Again',
    back: 'Back',
  },
  emptyState: {
    title: 'YOUR SCIENCE JOURNEY STARTS HERE',
    subtitle: 'Explore your first activity and your progress will appear here.',
    cta: 'Explore Science →',
  },
  accessibility: {
    heroCard: '{progress}% overall activity progress. {streak} day streak. {xp} XP. {badges} badges.',
    subjectCard: '{subject}. {progress}% activity progress. {explored} of {total} topics explored. {accuracy}% practice accuracy. {trend}.',
    topicCard: '{topic}. Status: {status}. Progress: {progress}%. Accuracy: {accuracy}%. Trend: {trend}.',
    statBox: '{value} {label}',
  },
};

const STRINGS_TA: ProgressI18n = {
  journeyTitle: 'என் அறிவியல் பயணம்',
  journeySubtitle: 'அறிவியல் முழுவதிலும் உங்கள் ஆய்வு, பயிற்சி மற்றும் சாதனைகள்',
  myScienceProgress: 'என் அறிவியல் முன்னேற்றம்',
  overallActivityProgress: 'ஒட்டுமொத்த செயல்பாட்டு முன்னேற்றம்',
  activityProgress: 'செயல்பாட்டு முன்னேற்றம்',
  practiceAccuracy: 'பயிற்சி துல்லியம்',
  topicCoverage: 'தலைப்பு கவரேஜ்',
  recentAccuracy: 'சமீபத்திய துல்லியம்',
  topicsExploredCount: '{total}-ல் {explored} ஆராயப்பட்டது',
  accuracyPercent: '{accuracy}% துல்லியம்',
  streakDays: '{count} நாள் தொடர்ச்சி',
  totalXp: '{count} XP',
  achievements: '{count} பேட்ஜ்கள்',
  summary: {
    subjectsExplored: 'ஆராயப்பட்ட பாடங்கள்',
    topicsExplored: 'ஆராயப்பட்ட தலைப்புகள்',
    activitiesCompleted: 'முடிந்த செயல்பாடுகள்',
    badgesEarned: 'பெற்ற பேட்ஜ்கள்',
    certificatesEarned: 'சான்றிதழ்கள்',
  },
  strengths: {
    title: 'உங்கள் பலங்கள்',
    subtitle: 'நீங்கள் அதிக நம்பிக்கையும் புரிதலும் பெற்றுள்ள பகுதிகள்',
    noStrengthsYet: 'கூடுதல் தலைப்புகளை ஆராயும்போது உங்கள் பலங்கள் தோன்றும்!',
    keepExploringToDiscover: 'உங்கள் பலமான பகுதிகளைக் கண்டறிய செயல்பாடுகளை முடிக்கவும்.',
  },
  focusAreas: {
    title: 'வலுப்படுத்த வேண்டிய பகுதிகள்',
    countLabel: '{count} கவனப் பகுதிகள் உள்ளன',
    viewAll: 'பயிற்சிப் பரிந்துரைகளைக் காண்க →',
    suggestedPractice: 'இங்கு சிறிது பயிற்சி செய்வது நீங்கள் எளிதாக புரிந்து கொள்ள உதவும்.',
  },
  subjects: {
    viewProgress: 'முன்னேற்றத்தைக் காண்க',
    notExploredYet: 'இன்னும் ஆராயப்படவில்லை',
    exploredRatio: '{explored} / {total} ஆராயப்பட்டது',
    topicsCount: '{count} தலைப்புகள்',
    trendLabel: 'போக்கு',
  },
  subjectDetail: {
    progress: 'பாடம் முன்னேற்றம்',
    activity: 'செயல்பாடுகள்',
    accuracy: 'துல்லியம்',
    trend: 'போக்கு',
    topicsTitle: 'தலைப்புகள்',
    focusAreasTitle: 'கவனப் பகுதிகள்',
    recentActivityTitle: 'சமீபத்திய செயல்பாடு',
    nextStepTitle: 'பரிந்துரைக்கப்பட்ட அடுத்த படி',
    noActivitiesYet: 'இப்பாடத்தில் இன்னும் சமீபத்திய செயல்பாடு இல்லை.',
    noFocusAreas: 'சிறப்பு! இங்கு கவனப் பகுதிகள் எதுவும் தேவைப்படவில்லை.',
    greatCoverage: 'அருமை! அனைத்து தற்போதைய தலைப்புகளும் ஆராயப்பட்டன.',
  },
  topicStatus: {
    not_started: 'தொடங்கவில்லை',
    exploring: 'ஆராய்கிறது',
    in_progress: 'செயலில் உள்ளது',
    strong: 'வலுவானது',
    improving: 'முன்னேறுகிறது',
    focus_area: 'கவனப் பகுதி',
    completed: 'நிறைவுற்றது',
  },
  trends: {
    improving: 'முன்னேறுகிறது',
    improvingDesc: 'உங்கள் சமீபத்திய பயிற்சி முந்தைய முடிவுகளை விட சிறப்பாக உள்ளது.',
    stable: 'நிலையானது',
    stableDesc: 'உங்கள் செயல்திறன் சீராக உள்ளது.',
    declining: 'பயிற்சி தேவை',
    decliningDesc: 'கூடுதல் பயிற்சி இந்த கருத்துக்களை வலுப்படுத்த உதவும்.',
    insufficientData: 'தொடர்ந்து பயிற்சி செய்யுங்கள்',
    insufficientDataDesc: 'உங்கள் போக்கைக் காண இன்னும் சில கேள்விகளுக்கு பதிலளிக்கவும்.',
  },
  actions: {
    continueLearning: 'கற்றலைத் தொடரவும்',
    practice: 'கேள்விகள் பயிற்சி',
    microLesson: '2-நிமிட பாடம்',
    conceptMap: 'முழு வரைபடம்',
    experiment: 'பரிசோதனை செய்',
    exploreScience: 'அறிவியலை ஆராயவும்',
    retry: 'மீண்டும் முயற்சிக்கவும்',
    back: 'பின்செல்',
  },
  emptyState: {
    title: 'உங்கள் அறிவியல் பயணம் இங்கு தொடங்குகிறது',
    subtitle: 'உங்கள் முதல் செயல்பாட்டை ஆராயுங்கள், உங்கள் முன்னேற்றம் இங்கு தோன்றும்.',
    cta: 'அறிவியலை ஆராயவும் →',
  },
  accessibility: {
    heroCard: '{progress}% ஒட்டுமொத்த செயல்பாட்டு முன்னேற்றம். {streak} நாள் தொடர்ச்சி. {xp} XP. {badges} பேட்ஜ்கள்.',
    subjectCard: '{subject}. {progress}% செயல்பாட்டு முன்னேற்றம். {total}-ல் {explored} தலைப்புகள் ஆராயப்பட்டன. {accuracy}% பயிற்சி துல்லியம். {trend}.',
    topicCard: '{topic}. நிலை: {status}. முன்னேற்றம்: {progress}%. துல்லியம்: {accuracy}%. போக்கு: {trend}.',
    statBox: '{value} {label}',
  },
};

export function getProgressI18n(language: SupportedLanguage = 'en'): ProgressI18n {
  return language === 'ta' ? STRINGS_TA : STRINGS_EN;
}

export function interpolate(template: string, values: Record<string, string | number>): string {
  let result = template;
  for (const [key, val] of Object.entries(values)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(val));
  }
  return result;
}
