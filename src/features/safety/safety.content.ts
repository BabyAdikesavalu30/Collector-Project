/**
 * Safety & Trust Layer — Content Data
 * All bilingual (EN/TA) safety, privacy, and trust content.
 * Student-friendly, non-legal, non-fear-based language.
 */

import {
  SafetySection,
  PrivacyInfoItem,
  AccountSafetyTip,
  SafeScienceRule,
  HelpCategory,
  ReportReason,
} from './safety.types';

// ============================================================================
// Safety Hub Sections
// ============================================================================

export const SAFETY_SECTIONS: SafetySection[] = [
  {
    id: 'privacy',
    icon: '🔒',
    title: { en: 'Privacy', ta: 'தனியுரிமை' },
    subtitle: { en: 'What information does the app use?', ta: 'செயலி என்ன தகவலைப் பயன்படுத்துகிறது?' },
    route: '/privacy',
  },
  {
    id: 'account-safety',
    icon: '🛡️',
    title: { en: 'Account Safety', ta: 'கணக்கு பாதுகாப்பு' },
    subtitle: { en: 'Keep your account secure', ta: 'உங்கள் கணக்கைப் பாதுகாப்பாக வைத்திருங்கள்' },
    route: '/account-safety',
  },
  {
    id: 'safe-science',
    icon: '🔬',
    title: { en: 'Safe Science', ta: 'பாதுகாப்பான அறிவியல்' },
    subtitle: { en: 'How experiments work in the app', ta: 'செயலியில் சோதனைகள் எவ்வாறு செயல்படுகின்றன' },
    route: '/safe-science',
  },
  {
    id: 'help-support',
    icon: '❓',
    title: { en: 'Help & Support', ta: 'உதவி & ஆதரவு' },
    subtitle: { en: 'Get help when you need it', ta: 'உங்களுக்குத் தேவையாப்போது உதவி பெறுங்கள்' },
    route: '/help',
  },
  {
    id: 'data-storage',
    icon: '💾',
    title: { en: 'Data & Storage', ta: 'தரவு & சேமிப்பு' },
    subtitle: { en: 'How your data is stored locally', ta: 'உங்கள் தரவு உள்ளூரில் எவ்வாறு சேமிக்கப்படுகிறது' },
    route: '/privacy',
  },
  {
    id: 'notifications',
    icon: '🔔',
    title: { en: 'Notification Privacy', ta: 'அறிவிப்பு தனியுரிமை' },
    subtitle: { en: 'What we send and why', ta: 'நாங்கள் என்ன அனுப்புகிறோம் மற்றும் ஏன்' },
    route: '/settings/notifications',
  },
  {
    id: 'legal',
    icon: '📜',
    title: { en: 'Legal Information', ta: 'சட்டத் தகவல்' },
    subtitle: { en: 'Terms, privacy policy, guidelines', ta: 'விதிமுறைகள், தனியுரிமைக் கொள்கை, வழிகாட்டுதல்கள்' },
    route: '/terms',
  },
];

// ============================================================================
// Privacy Center Content
// ============================================================================

export const PRIVACY_INFO: PrivacyInfoItem[] = [
  {
    id: 'what-info',
    icon: '📋',
    title: { en: 'What information does the app use?', ta: 'செயலி என்ன தகவலைப் பயன்படுத்துகிறது?' },
    content: {
      en: 'Vigyaan uses only the information needed to personalize your learning experience.',
      ta: 'விஞ்ஞான் உங்கள் கற்றல் அனுபவத்தை தனிப்பயனாக்க தேவையான தகவலை மட்டுமே பயன்படுத்துகிறது.',
    },
    bullets: [
      { en: 'Your display name — so the app can greet you', ta: 'உங்கள் காட்சிப் பெயர் — செயலி உங்களை வரவேற்க' },
      { en: 'Your grade and school — to suggest the right content', ta: 'உங்கள் வகுப்பு மற்றும் பள்ளி — சரியான உள்ளடக்கத்தை பரிந்துரைக்க' },
      { en: 'Your learning progress — to track your achievements', ta: 'உங்கள் கற்றல் முன்னேற்றம் — உங்கள் சாதனைகளைக் கண்காணிக்க' },
      { en: 'Your app preferences — language, theme, notifications', ta: 'உங்கள் செயலி விருப்பங்கள் — மொழி, தீம், அறிவிப்புகள்' },
    ],
  },
  {
    id: 'not-collected',
    icon: '🚫',
    title: { en: 'What is NOT collected?', ta: 'என்ன சேகரிக்கப்படவில்லை?' },
    content: {
      en: 'We do not collect unnecessary personal information.',
      ta: 'தேவையற்ற தனிப்பட்ட தகவல்களை நாங்கள் சேகரிக்கவில்லை.',
    },
    bullets: [
      { en: 'We do not access your contacts', ta: 'உங்கள் தொடர்புகளை நாங்கள் அணுகவில்லை' },
      { en: 'We do not access your camera or microphone', ta: 'உங்கள் கேமரா அல்லது மைக்ரோஃபோனை நாங்கள் அணுகவில்லை' },
      { en: 'We do not access your location', ta: 'உங்கள் இருப்பிடத்தை நாங்கள் அணுகவில்லை' },
      { en: 'We do not share your data with advertisers', ta: 'உங்கள் தரவை விளம்பரதாரர்களுடன் நாங்கள் பகிரவில்லை' },
    ],
  },
  {
    id: 'local-storage',
    icon: '💾',
    title: { en: 'How is my data stored?', ta: 'என் தரவு எவ்வாறு சேமிக்கப்படுகிறது?' },
    content: {
      en: 'Your learning data is stored locally on your device. This means your progress stays on your phone and is not sent to external servers.',
      ta: 'உங்கள் கற்றல் தரவு உங்கள் சாதனத்தில் உள்ளூரில் சேமிக்கப்படுகிறது. இதன் பொருள் உங்கள் முன்னேற்றம் உங்கள் தொலைபேசியில் இருக்கிறது மற்றும் வெளிப்புற சேவையகங்களுக்கு அனுப்பப்படவில்லை.',
    },
  },
  {
    id: 'profile-purpose',
    icon: '👤',
    title: { en: 'Why does the app need my profile?', ta: 'செயலிக்கு என் சுயவிவரம் ஏன் தேவை?' },
    content: {
      en: 'Your profile helps us show you the right science content for your grade level and personalize your learning path.',
      ta: 'உங்கள் சுயவிவரம் உங்கள் வகுப்பு நிலைக்கு சரியான அறிவியல் உள்ளடக்கத்தைக் காட்ட உதவுகிறது மற்றும் உங்கள் கற்றல் பாதையை தனிப்பயனாக்குகிறது.',
    },
  },
  {
    id: 'control',
    icon: '⚙️',
    title: { en: 'What can I control?', ta: 'நான் என்ன கட்டுப்படுத்த முடியும்?' },
    content: {
      en: 'You can review and change your settings at any time.',
      ta: 'உங்கள் அமைப்புகளை எப்போது வேண்டுமானாலும் மதிப்பாய்வு செய்து மாற்றலாம்.',
    },
    bullets: [
      { en: 'Change your language preference', ta: 'உங்கள் மொழி விருப்பத்தை மாற்றலாம்' },
      { en: 'Toggle notification settings', ta: 'அறிவிப்பு அமைப்புகளை நிலுவைத்து மாற்றலாம்' },
      { en: 'Clear your cached data', ta: 'உங்கள் தற்காலிக தரவை அழிக்கலாம்' },
      { en: 'Review your profile information', ta: 'உங்கள் சுயவிவரத் தகவலை மதிப்பாய்வு செய்யலாம்' },
    ],
  },
  {
    id: 'get-help',
    icon: '📞',
    title: { en: 'How do I get help with privacy?', ta: 'தனியுரிமை பற்றி நான் எவ்வாறு உதவி பெறுவது?' },
    content: {
      en: 'If you have questions about your data or privacy, you can reach out through the Help & Support section in Settings.',
      ta: 'உங்கள் தரவு அல்லது தனியுரிமை பற்றி உங்களுக்கு கேள்விகள் இருந்தால், அமைப்புகளில் உள்ள உதவி & ஆதரவு பிரிவு மூலம் எங்களை அணுகலாம்.',
    },
  },
];

// ============================================================================
// Account Safety Tips
// ============================================================================

export const ACCOUNT_SAFETY_TIPS: AccountSafetyTip[] = [
  {
    id: 'password-safety',
    icon: '🔑',
    title: { en: 'Never share your password', ta: 'உங்கள் கடவுச்சொல்லை யாருடனும் பகிர வேண்டாம்' },
    content: {
      en: 'Your password keeps your account safe. Never tell it to anyone — not even friends or classmates. If someone asks for it, say no.',
      ta: 'உங்கள் கடவுச்சொல் உங்கள் கணக்கைப் பாதுகாக்கிறது. யாருடனும் சொல்ல வேண்டாம் — நண்பர்கள் அல்லது வகுப்பு தோழர்கள் கூட. யாரேனும் கேட்டால், இல்லை என்று சொல்லுங்கள்.',
    },
  },
  {
    id: 'otp-safety',
    icon: '📱',
    title: { en: 'Keep your OTP private', ta: 'உங்கள் OTP யை தனிப்பட்டதாக வைத்திருங்கள்' },
    content: {
      en: 'OTP codes are like temporary passwords. Share them with no one. If someone calls or messages asking for your OTP, it is a scam.',
      ta: 'OTP குறியீடுகள் தற்காலிக கடவுச்சொற்கள் போன்றவை. யாருடனும் பகிர வேண்டாம். யாரேனும் உங்கள் OTP கேட்டு அழைத்தால் அல்லது செய்தி அனுப்பினால், அது மோசடி.',
    },
  },
  {
    id: 'shared-device',
    icon: '🖥️',
    title: { en: 'Be careful on shared devices', ta: 'பகிரப்பட்ட சாதனங்களில் கவனமாக இருங்கள்' },
    content: {
      en: 'If you use a shared phone or tablet, always log out when you are done. This keeps your account safe from others who might use the device.',
      ta: 'பகிரப்பட்ட தொலைபேசி அல்லது டேப்லெட்டைப் பயன்படுத்தினால், முடிந்ததும் எப்போதும் வெளியேறுங்கள். இது உங்கள் கணக்கை மற்றவர்களிடமிருந்து பாதுகாக்கிறது.',
    },
  },
  {
    id: 'logout',
    icon: '🚪',
    title: { en: 'Log out when you are done', ta: 'முடிந்ததும் வெளியேறுங்கள்' },
    content: {
      en: 'Always log out after using Vigyaan, especially on shared or school devices. This ensures no one else can access your learning progress.',
      ta: 'விஞ்ஞானைப் பயன்படுத்திய பிறகு எப்போதும் வெளியேறுங்கள், குறிப்பாக பகிரப்பட்ட அல்லது பள்ளி சாதனங்களில். இது வேறு யாரும் உங்கள் கற்றல் முன்னேற்றத்தை அணுக முடியாது என்பதை உறுதிசெய்கிறது.',
    },
  },
  {
    id: 'suspicious',
    icon: '🚨',
    title: { en: 'Report suspicious activity', ta: 'சந்தேகத்திற்குரிய செயல்பாட்டைப் புகாரளியுங்கள்' },
    content: {
      en: 'If you notice anything unusual with your account, like someone else seeing your progress or changes you did not make, tell your teacher or contact support right away.',
      ta: 'உங்கள் கணக்கில் ஏதேனும் அசாதாரணமானதைக் கண்டால், வேறு யாராவது உங்கள் முன்னேற்றத்தைப் பார்ப்பது அல்லது நீங்கள் செய்யாத மாற்றங்கள், உடனே உங்கள் ஆசிரியரிடம் சொல்லுங்கள் அல்லது ஆதரவைத் தொடர்பு கொள்ளுங்கள்.',
    },
  },
];

// ============================================================================
// Safe Science Rules
// ============================================================================

export const SAFE_SCIENCE_RULES: SafeScienceRule[] = [
  {
    id: 'simulations',
    icon: '🔬',
    title: { en: 'Experiments are simulations', ta: 'சோதனைகள் உருவகப்படுத்துதல்கள்' },
    description: {
      en: 'All experiments in Vigyaan are educational simulations designed for learning. They use simplified models to teach science concepts. They are not real laboratory procedures.',
      ta: 'விஞ்ஞானில் உள்ள அனைத்து சோதனைகளும் கற்றலுக்காக வடிவமைக்கப்பட்ட கல்வி உருவகப்படுத்துதல்கள். அவை அறிவியல் கருத்துக்களைக் கற்பிக்க எளிமைப்படுத்தப்பட்ட மாதிரிகளைப் பயன்படுத்துகின்றன. அவை உண்மையான ஆய்வக நடைமுறைகள் அல்ல.',
    },
  },
  {
    id: 'no-dangerous',
    icon: '🚫',
    title: { en: 'No dangerous instructions', ta: 'ஆபத்தான வழிமுறைகள் இல்லை' },
    description: {
      en: 'Vigyaan never provides instructions for mixing dangerous chemicals, working with hazardous materials, performing unsafe electrical experiments, or any activity that could cause harm.',
      ta: 'ஆபத்தான ரசாயனங்களை கலப்பது, ஆபத்தான பொருட்களுடன் வேலை செய்வது, பாதுகாப்பற்ற மின் சோதனைகள் செய்வது அல்லது தீங்கு விளைவிக்கும் எந்தவொரு செயல்பாட்டிற்கும் விஞ்ஞான் ஒருபோதும் வழிமுறைகளை வழங்காது.',
    },
  },
  {
    id: 'educational-framing',
    icon: '📖',
    title: { en: 'Educational context only', ta: 'கல்வி சூழல் மட்டுமே' },
    description: {
      en: 'Science activities in the app are framed as learning exercises. If you are curious about trying something in real life, always ask a teacher or adult first.',
      ta: 'செயலியில் உள்ள அறிவியல் செயல்பாடுகள் கற்றல் பயிற்சிகளாக வடிவமைக்கப்பட்டுள்ளன. நிஜ வாழ்வில் ஏதாவது முயற்சிக்க ஆர்வமாக இருந்தால், எப்போதும் முதலில் ஒரு ஆசிரியர் அல்லது பெரியவரிடம் கேளுங்கள்.',
    },
  },
  {
    id: 'observation',
    icon: '👁️',
    title: { en: 'Observe, do not replicate', ta: 'கவனியுங்கள், நகலெடுக்க வேண்டாம்' },
    description: {
      en: 'Virtual experiments let you observe how science works. They are designed to be safe digital experiences, not real-world procedures to replicate at home.',
      ta: 'மெய்நிகர் சோதனைகள் அறிவியல் எவ்வாறு செயல்படுகிறது என்பதை கவனிக்க அனுமதிக்கின்றன. அவை பாதுகாப்பான டிஜிட்டல் அனுபவங்களாக வடிவமைக்கப்பட்டுள்ளன, வீட்டில் நகலெடுக்க வேண்டிய நிஜ உலக நடைமுறைகள் அல்ல.',
    },
  },
  {
    id: 'ask-teacher',
    icon: '👩‍🏫',
    title: { en: 'Ask your teacher', ta: 'உங்கள் ஆசிரியரிடம் கேளுங்கள்' },
    description: {
      en: 'If you want to learn more about a science topic or try a real experiment, your teacher is the best person to guide you safely.',
      ta: 'ஒரு அறிவியல் தலைப்பைப் பற்றி மேலும் அறிய அல்லது ஒரு உண்மையான சோதனையை முயற்சிக்க விரும்பினால், உங்கள் ஆசிரியர் உங்களைப் பாதுகாப்பாக வழிநடத்த சிறந்த நபர்.',
    },
  },
];

// ============================================================================
// Help Categories
// ============================================================================

export const HELP_CATEGORIES: HelpCategory[] = [
  {
    id: 'getting-started',
    icon: '🚀',
    title: { en: 'Getting Started', ta: 'தொடக்கம்' },
    items: [
      {
        question: { en: 'How do I use Vigyaan?', ta: 'விஞ்ஞானை எவ்வாறு பயன்படுத்துவது?' },
        answer: { en: 'From your Home dashboard, explore science topics, attempt interactive quizzes, play educational games, and discover daily science facts.', ta: 'உங்கள் முகப்பு பலகையிலிருந்து, அறிவியல் தலைப்புகளை ஆராயுங்கள், ஊடாடும் வினாடி வினாக்களை முயற்சியுங்கள், கல்வி விளையாட்டுகளை விளையாடுங்கள், மற்றும் தினசரி அறிவியல் தகவல்களைக் கண்டறியுங்கள்.' },
      },
      {
        question: { en: 'How do I switch languages?', ta: 'மொழியை எவ்வாறு மாற்றுவது?' },
        answer: { en: 'Go to Settings → Language to switch between English and Tamil. You can change this anytime.', ta: 'அமைப்புகள் → மொழி என்று சென்று ஆங்கிலம் மற்றும் தமிழுக்கு இடையில் மாற்றலாம். இதை எப்போது வேண்டுமானாலும் மாற்றலாம்.' },
      },
    ],
  },
  {
    id: 'account',
    icon: '👤',
    title: { en: 'Account', ta: 'கணக்கு' },
    items: [
      {
        question: { en: 'What if I forget my password?', ta: 'கடவுச்சொல் மறந்துவிட்டால் என்ன செய்வது?' },
        answer: { en: 'Tap "Forgot Password?" on the login screen to request recovery instructions via your registered email or mobile number.', ta: 'உள்நுழைவுப் பக்கத்தில் "கடவுச்சொல் மறந்துவிட்டதா?" என்பதைத் தட்டி, பதிவு செய்யப்பட்ட மின்னஞ்சல் அல்லது மொபைல் எண் மூலம் மீட்பு வழிமுறைகளைக் கோருங்கள்.' },
      },
      {
        question: { en: 'How do I log out safely?', ta: 'பாதுகாப்பாக எவ்வாறு வெளியேறுவது?' },
        answer: { en: 'Go to Settings and tap "Log Out". This is important especially on shared devices.', ta: 'அமைப்புகளுக்குச் சென்று "வெளியேறு" என்பதைத் தட்டுங்கள். இது குறிப்பாக பகிரப்பட்ட சாதனங்களில் முக்கியம்.' },
      },
    ],
  },
  {
    id: 'learning',
    icon: '📚',
    title: { en: 'Learning', ta: 'கற்றல்' },
    items: [
      {
        question: { en: 'Can I use Vigyaan offline?', ta: 'விஞ்ஞானை இணையம் இன்றி பயன்படுத்த முடியுமா?' },
        answer: { en: 'Yes, cached content like quizzes, micro lessons, and concept maps can be accessed without internet.', ta: 'ஆம், வினாடி வினாக்கள், நுண்ணிய பாடங்கள் மற்றும் கருத்து வரைபடங்கள் போன்ற தற்காலிகமாக சேமிக்கப்பட்ட உள்ளடக்கத்தை இணையம் இல்லாமல் அணுகலாம்.' },
      },
      {
        question: { en: 'How do experiments work in the app?', ta: 'செயலியில் சோதனைகள் எவ்வாறு செயல்படுகின்றன?' },
        answer: { en: 'All experiments are educational simulations. They use simplified models to teach science concepts safely. They are not real laboratory procedures.', ta: 'அனைத்து சோதனைகளும் கல்வி உருவகப்படுத்துதல்கள். அவை அறிவியல் கருத்துக்களை பாதுகாப்பாகக் கற்பிக்க எளிமைப்படுத்தப்பட்ட மாதிரிகளைப் பயன்படுத்துகின்றன.' },
      },
    ],
  },
  {
    id: 'privacy',
    icon: '🔒',
    title: { en: 'Privacy', ta: 'தனியுரிமை' },
    items: [
      {
        question: { en: 'Is my data safe?', ta: 'என் தரவு பாதுகாப்பா?' },
        answer: { en: 'Your learning data is stored locally on your device. We do not sell or share your information with third parties.', ta: 'உங்கள் கற்றல் தரவு உங்கள் சாதனத்தில் உள்ளூரில் சேமிக்கப்படுகிறது. உங்கள் தகவலை மூன்றாம் தரப்பினருக்கு விற்கவோ பகிரவோ இல்லை.' },
      },
      {
        question: { en: 'Can I delete my account?', ta: 'என் கணக்கை நீக்க முடியுமா?' },
        answer: { en: 'In this demo version, you can reset your data from Settings. Full account deletion will be available in future updates.', ta: 'இந்த டெமோ பதிப்பில், அமைப்புகளிலிருந்து உங்கள் தரவை மீட்டமைக்கலாம். முழுமையான கணக்கு நீக்கம் எதிர்கால புதுப்பிப்புகளில் கிடைக்கும்.' },
      },
    ],
  },
  {
    id: 'technical',
    icon: '⚙️',
    title: { en: 'Technical Issues', ta: 'தொழில்நுட்ப சிக்கல்கள்' },
    items: [
      {
        question: { en: 'The app is not loading properly', ta: 'செயலி சரியாக ஏற்றப்படவில்லை' },
        answer: { en: 'Try closing and reopening the app. If the problem continues, try clearing the cache from Settings → Data & Storage.', ta: 'செயலியை மூடி மீண்டும் திறக்க முயற்சிக்கவும். சிக்கல் தொடர்ந்தால், அமைப்புகள் → தரவு & சேமிப்பு என்று சென்று தற்காலிக சேமிப்பை அழிக்க முயற்சிக்கவும்.' },
      },
      {
        question: { en: 'I found incorrect information', ta: 'தவறான தகவலைக் கண்டேன்' },
        answer: { en: 'Please use the "Report a Problem" option in Settings → Help to let us know. We take accuracy seriously.', ta: 'தயவுசெய்து அமைப்புகள் → உதவி என்று சென்று "சிக்கலைப் புகாரளி" விருப்பத்தைப் பயன்படுத்தி எங்களுக்குத் தெரிவியுங்கள். துல்லியத்தை நாங்கள் தீவிரமாக எடுத்துக்கொள்கிறோம்.' },
      },
    ],
  },
];

// ============================================================================
// Report Reasons
// ============================================================================

export const REPORT_REASONS: ReportReason[] = [
  { id: 'incorrect', label: { en: 'Incorrect information', ta: 'தவறான தகவல்' } },
  { id: 'broken', label: { en: 'Broken content', ta: 'சேதமடைந்த உள்ளடக்கம்' } },
  { id: 'inappropriate', label: { en: 'Inappropriate content', ta: 'பொருத்தமற்ற உள்ளடக்கம்' } },
  { id: 'accessibility', label: { en: 'Accessibility issue', ta: 'அணுகல்தன்மை சிக்கல்' } },
  { id: 'other', label: { en: 'Other', ta: 'மற்றவை' } },
];
