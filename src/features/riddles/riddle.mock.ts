/**
 * Riddle Feature Mock Dataset & Defaults
 * Deterministic category configurations, demo points, and age-appropriate science/logic riddles.
 */

import { RiddleCategory, RiddleDifficulty, RiddleQuestion } from './riddle.types';
import { colors } from '../../theme/colors';

export const DEMO_RIDDLE_POINTS = 1250;

export const RIDDLE_CATEGORIES: RiddleCategory[] = [
  {
    id: 'easy',
    title: {
      en: 'Easy',
      ta: 'எளிது',
    },
    description: {
      en: 'Warm up your brain',
      ta: 'உங்கள் மூளைக்கு எளிய பயிற்சி',
    },
    icon: '🍃',
    score: 0,
    totalAvailable: 20,
    accentBg: colors.green50,
    accentBorder: colors.green100,
  },
  {
    id: 'medium',
    title: {
      en: 'Medium',
      ta: 'நடுத்தரம்',
    },
    description: {
      en: 'Think a little deeper',
      ta: 'சற்று ஆழமாக சிந்தியுங்கள்',
    },
    icon: '💡',
    score: 0,
    totalAvailable: 20,
    accentBg: colors.warningBackground,
    accentBorder: colors.warningBorder,
  },
  {
    id: 'hard',
    title: {
      en: 'Hard',
      ta: 'கடினம்',
    },
    description: {
      en: 'Challenge your thinking',
      ta: 'சிந்தனைக்கு சவால் விடுங்கள்',
    },
    icon: '🔥',
    score: 0,
    totalAvailable: 20,
    accentBg: colors.error50,
    accentBorder: colors.error100,
  },
  {
    id: 'genius',
    title: {
      en: 'Genius',
      ta: 'அறிவார்ந்த நிலை',
    },
    description: {
      en: 'For expert problem solvers',
      ta: 'நிபுணத்துவ புதிர்த் தீர்ப்பாளர்களுக்கு',
    },
    icon: '🧠',
    score: 0,
    totalAvailable: 20,
    accentBg: colors.purple50,
    accentBorder: colors.purple100,
  },
];

export const RIDDLE_QUESTIONS: Record<RiddleDifficulty, RiddleQuestion[]> = {
  easy: [
    {
      id: 'riddle-easy-01',
      difficulty: 'easy',
      question: {
        en: 'I have hands and a face, but I cannot hold anything and I cannot smile. What am I?',
        ta: 'எனக்கு முகம் மற்றும் கைகள் உள்ளன, ஆனால் என்னால் எதையும் பிடிக்கவோ சிரிக்கவோ முடியாது. நான் யார்?',
      },
      answer: {
        en: 'Clock',
        ta: 'கடிகாரம்',
      },
      acceptedAnswers: [
        { en: 'a clock', ta: 'கடிகாரம்' },
        { en: 'wall clock', ta: 'சுவர் கடிகாரம்' },
        { en: 'watch', ta: 'கைக்கடிகாரம்' },
        { en: 'wristwatch', ta: 'வாட்ச்' },
      ],
      hint: {
        en: 'It hangs on the wall or stays on your wrist to tell time.',
        ta: 'இது சுவரில் தொங்கும் அல்லது நேரத்தைக் காட்ட உங்கள் கையில் இருக்கும்.',
      },
      explanation: {
        en: 'A clock has hour/minute hands and a clock face, helping us measure time.',
        ta: 'கடிகாரத்தில் நேரத்தைக் குறிக்கும் முட்களும் முகப்பும் உள்ளன.',
      },
      points: 10,
    },
    {
      id: 'riddle-easy-02',
      difficulty: 'easy',
      question: {
        en: 'I am as light as a feather, yet the strongest person cannot hold me for more than a few minutes. What am I?',
        ta: 'நான் இறகை விட லேசானவன், ஆனால் வலிமையான மனிதனாலும் என்னை சில நிமிடங்களுக்கு மேல் பிடித்து வைத்திருக்க முடியாது. நான் யார்?',
      },
      answer: {
        en: 'Breath',
        ta: 'மூச்சு',
      },
      acceptedAnswers: [
        { en: 'my breath', ta: 'சுவாசம்' },
        { en: 'your breath', ta: 'மூச்சுக்காற்று' },
        { en: 'breathing', ta: 'மூச்சு விடுதல்' },
      ],
      hint: {
        en: 'You need this every second to stay alive.',
        ta: 'உயிர் வாழ ஒவ்வொரு நொடியும் இது உங்களுக்குத் தேவை.',
      },
      explanation: {
        en: 'Humans need continuous oxygen and cannot hold their breath for very long.',
        ta: 'மனிதர்களால் நீண்ட நேரம் மூச்சை அடக்கி வைத்திருக்க முடியாது.',
      },
      points: 10,
    },
    {
      id: 'riddle-easy-03',
      difficulty: 'easy',
      question: {
        en: 'I am full of holes, but I can still hold water. What am I?',
        ta: 'என் உடல் முழுவதும் துளைகள் இருந்தாலும், என்னால் தண்ணீரை வைத்திருக்க முடியும். நான் யார்?',
      },
      answer: {
        en: 'Sponge',
        ta: 'கடற்பஞ்சு',
      },
      acceptedAnswers: [
        { en: 'a sponge', ta: 'பஞ்சு' },
        { en: 'sea sponge', ta: 'ஸ்பாஞ்ச்' },
      ],
      hint: {
        en: 'You often use it in the kitchen or bath to absorb liquids.',
        ta: 'சமையலறை அல்லது குளியலறையில் திரவங்களை உறிஞ்ச இதைப் பயன்படுத்துவீர்கள்.',
      },
      explanation: {
        en: 'A porous sponge traps liquid in its tiny pockets through capillary action.',
        ta: 'கடற்பஞ்சின் நுண்துளைகள் நீரைத் தங்களுக்குள் உறிஞ்சி தக்கவைத்துக் கொள்கின்றன.',
      },
      points: 10,
    },
    {
      id: 'riddle-easy-04',
      difficulty: 'easy',
      question: {
        en: 'I follow you everywhere in the light, but completely disappear in the dark. What am I?',
        ta: 'வெளிச்சத்தில் நான் உங்களை எங்கும் பின்தொடர்வேன், ஆனால் இருளில் முற்றிலும் மறைந்துவிடுவேன். நான் யார்?',
      },
      answer: {
        en: 'Shadow',
        ta: 'நிழல்',
      },
      acceptedAnswers: [
        { en: 'a shadow', ta: 'என் நிழல்' },
        { en: 'my shadow', ta: 'நிழல்' },
        { en: 'your shadow', ta: 'நிழல்' },
      ],
      hint: {
        en: 'You block light rays to create this on the ground.',
        ta: 'ஒளி உங்கள் மீது பட்டு தடையாகும் போது தரையில் இது உருவாகிறது.',
      },
      explanation: {
        en: 'A shadow forms when an opaque object blocks light from reaching a surface.',
        ta: 'ஒளி புகா பொருள் ஒளியைத் தடுக்கும் போது நிழல் உருவாகிறது.',
      },
      points: 10,
    },
    {
      id: 'riddle-easy-05',
      difficulty: 'easy',
      question: {
        en: 'The more of me you take, the more you leave behind. What am I?',
        ta: 'என்னை நீங்கள் அதிகமாக எடுத்து வைக்கும் போது, அதிகமானதை பின்னால் விட்டுச் செல்கிறீர்கள். நான் யார்?',
      },
      answer: {
        en: 'Footsteps',
        ta: 'காலடிகள்',
      },
      acceptedAnswers: [
        { en: 'footstep', ta: 'காலடி' },
        { en: 'footprints', ta: 'கால்தடங்கள்' },
        { en: 'steps', ta: 'அடிகள்' },
      ],
      hint: {
        en: 'Think about walking on wet sand or mud.',
        ta: 'ஈரமான மணல் அல்லது சேற்றில் நடப்பதை யோசித்துப் பாருங்கள்.',
      },
      explanation: {
        en: 'Every step you take forward leaves a footprint behind.',
        ta: 'நீங்கள் முன்னோக்கி வைக்கும் ஒவ்வொரு அடியும் பின்னால் ஒரு கால்தடத்தை விட்டுச் செல்கிறது.',
      },
      points: 10,
    },
  ],

  medium: [
    {
      id: 'riddle-med-01',
      difficulty: 'medium',
      question: {
        en: 'I have no voice, but I can tell you stories. I have leaves, but I am not a tree. What am I?',
        ta: 'எனக்கு குரல் இல்லை, ஆனால் கதைகள் சொல்வேன். எனக்கு தாள்கள் (இலைகள்) உண்டு, ஆனால் நான் மரம் அல்ல. நான் யார்?',
      },
      answer: {
        en: 'Book',
        ta: 'புத்தகம்',
      },
      acceptedAnswers: [
        { en: 'a book', ta: 'நூல்' },
        { en: 'notebook', ta: 'நோட்டுப்புத்தகம்' },
        { en: 'textbook', ta: 'பாடப்புத்தகம்' },
      ],
      hint: {
        en: 'You open and read it in a library or classroom.',
        ta: 'நூலகத்தில் அல்லது வகுப்பறையில் திறந்து படிப்பீர்கள்.',
      },
      explanation: {
        en: 'Books contain written pages (leaves of paper) full of knowledge and stories.',
        ta: 'புத்தகத்தில் அறிவு மற்றும் கதைகள் நிறைந்த பக்கங்கள் உள்ளன.',
      },
      points: 15,
    },
    {
      id: 'riddle-med-02',
      difficulty: 'medium',
      question: {
        en: 'I have rivers without water, forests without trees, and cities without people. What am I?',
        ta: 'என்னிடம் தண்ணீர் இல்லாத ஆறுகள், மரங்கள் இல்லாத காடுகள், மக்கள் இல்லாத நகரங்கள் உள்ளன. நான் யார்?',
      },
      answer: {
        en: 'Map',
        ta: 'வரைபடம்',
      },
      acceptedAnswers: [
        { en: 'a map', ta: 'பூகோள வரைபடம்' },
        { en: 'world map', ta: 'வரைபடம்' },
        { en: 'atlas', ta: 'அட்லஸ்' },
        { en: 'globe', ta: 'பூகோள உருண்டை' },
      ],
      hint: {
        en: 'Explorers and travelers use it to navigate geography.',
        ta: 'பயணிகள் புவியியலை அறிய இதைப் பயன்படுத்துகின்றனர்.',
      },
      explanation: {
        en: 'A map represents real geographic features using symbols and drawings.',
        ta: 'ஒரு வரைபடம் உண்மையான புவியியல் இடங்களை குறியீடுகள் மூலம் காட்டுகிறது.',
      },
      points: 15,
    },
    {
      id: 'riddle-med-03',
      difficulty: 'medium',
      question: {
        en: 'I have branches, but no fruit, trunk, or leaves. What am I?',
        ta: 'எனக்கு கிளைகள் உண்டு, ஆனால் பழம், தண்டு அல்லது இலைகள் இல்லை. நான் யார்?',
      },
      answer: {
        en: 'Bank',
        ta: 'வங்கி',
      },
      acceptedAnswers: [
        { en: 'a bank', ta: 'வங்கி கிளை' },
        { en: 'river bank', ta: 'வங்கி' },
      ],
      hint: {
        en: 'People keep their savings and money in this institution.',
        ta: 'மக்கள் தங்கள் பணத்தையும் சேமிப்பையும் இந்த நிறுவனத்தில் வைக்கிறார்கள்.',
      },
      explanation: {
        en: 'A bank operates multiple branch offices across towns and cities.',
        ta: 'வங்கி பல கிளை அலுவலகங்களைக் கொண்டுள்ளது.',
      },
      points: 15,
    },
    {
      id: 'riddle-med-04',
      difficulty: 'medium',
      question: {
        en: 'I am always hungry and must be fed; whatever I touch will soon turn red. What am I?',
        ta: 'எனக்கு எப்போதும் பசி இருக்கும்; நான் தொடும் அனைத்தும் விரைவில் சிவப்பாக மாறும். நான் யார்?',
      },
      answer: {
        en: 'Fire',
        ta: 'தீ',
      },
      acceptedAnswers: [
        { en: 'a fire', ta: 'நெருப்பு' },
        { en: 'flame', ta: 'சுடர்' },
        { en: 'flames', ta: 'தீப்பிழம்பு' },
      ],
      hint: {
        en: 'It provides heat and light, but water puts it out.',
        ta: 'இது வெப்பத்தையும் ஒளியையும் தருகிறது, ஆனால் தண்ணீர் இதை அணைக்கும்.',
      },
      explanation: {
        en: 'Combustion needs continuous fuel and oxygen to keep burning hot.',
        ta: 'நெருப்பு தொடர்ந்து எரிய எரிபொருளும் ஆக்ஸிஜனும் தேவைப்படுகின்றன.',
      },
      points: 15,
    },
    {
      id: 'riddle-med-05',
      difficulty: 'medium',
      question: {
        en: 'What can travel around the world while staying in the exact same corner?',
        ta: 'ஒரே மூலையில் இருந்துகொண்டே உலகம் முழுவதும் பயணம் செய்யக்கூடியது எது?',
      },
      answer: {
        en: 'Stamp',
        ta: 'தபால் தலை',
      },
      acceptedAnswers: [
        { en: 'a stamp', ta: 'ஸ்டாம்ப்' },
        { en: 'postage stamp', ta: 'அஞ்சல் தலை' },
      ],
      hint: {
        en: 'You stick it on the corner of an envelope before mailing.',
        ta: 'கடிதத்தை அனுப்புவதற்கு முன் உறையின் மூலையில் இதை ஒட்டுவீர்கள்.',
      },
      explanation: {
        en: 'A postage stamp stays on the corner of a letter as it travels across the globe.',
        ta: 'அஞ்சல் தலை கடித உறையின் மூலையில் ஒட்டப்பட்டு உலகம் முழுவதும் செல்கிறது.',
      },
      points: 15,
    },
  ],

  hard: [
    {
      id: 'riddle-hard-01',
      difficulty: 'hard',
      question: {
        en: 'I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?',
        ta: 'வாயின்றி பேசுவேன், காதுகளின்றி கேட்பேன். எனக்கு உடலமைப்பு இல்லை, ஆனால் காற்றுடன் உயிர் பெறுவேன். நான் யார்?',
      },
      answer: {
        en: 'Echo',
        ta: 'எதிரொலி',
      },
      acceptedAnswers: [
        { en: 'an echo', ta: 'எதிரொலி' },
        { en: 'echoes', ta: 'ஒலி எதிரொலிப்பு' },
      ],
      hint: {
        en: 'Shout loudly in a large empty cave or between high mountains.',
        ta: 'பெரிய குகை அல்லது மலைகளுக்கு இடையே சத்தமாக கூச்சலிட்டால் இது கேட்கும்.',
      },
      explanation: {
        en: 'An echo is a sound wave reflecting off a hard surface back to the listener.',
        ta: 'ஒலி அலைகள் ஒரு பரப்பில் பட்டு மீண்டும் பிரதிபலிக்கும் போது எதிரொலி உண்டாகிறது.',
      },
      points: 20,
    },
    {
      id: 'riddle-hard-02',
      difficulty: 'hard',
      question: {
        en: 'You can find me once in December, but never in any other month. What am I?',
        ta: 'என்னை டிசம்பர் மாதத்தில் ஒரு முறை காணலாம், ஆனால் வேறு எந்த மாதத்திலும் காண முடியாது. நான் யார்?',
      },
      answer: {
        en: 'The letter D',
        ta: 'டி என்ற எழுத்து',
      },
      acceptedAnswers: [
        { en: 'letter d', ta: 'டி' },
        { en: 'd', ta: 'D' },
        { en: 'the letter d', ta: 'டி எழுத்து' },
      ],
      hint: {
        en: 'Spell the word D-E-C-E-M-B-E-R and check the other eleven months.',
        ta: 'D-E-C-E-M-B-E-R என்ற ஆங்கில வார்த்தையைக் கவனித்துப் பாருங்கள்.',
      },
      explanation: {
        en: 'The letter "D" appears only in the word December and none of the other 11 month names.',
        ta: '12 மாதங்களின் ஆங்கிலப் பெயர்களில் "D" என்ற எழுத்து டிசம்பரில் மட்டுமே வருகிறது.',
      },
      points: 20,
    },
    {
      id: 'riddle-hard-03',
      difficulty: 'hard',
      question: {
        en: 'I can fly without wings. I can cry without eyes. Wherever I go, darkness follows me. What am I?',
        ta: 'சிறகுகள் இல்லாமல் பறப்பேன். கண்கள் இல்லாமல் அழுவேன். நான் செல்லும் இடமெல்லாம் இருள் தொடரும். நான் யார்?',
      },
      answer: {
        en: 'Cloud',
        ta: 'மேகம்',
      },
      acceptedAnswers: [
        { en: 'a cloud', ta: 'கார்மேகம்' },
        { en: 'clouds', ta: 'மழைமேகம்' },
        { en: 'rain cloud', ta: 'மேகங்கள்' },
      ],
      hint: {
        en: 'Floats in the atmosphere and brings rain when condensation peaks.',
        ta: 'வானில் மிதந்து மழையைக் கொண்டு வரும்.',
      },
      explanation: {
        en: 'Clouds float on air currents, release rain droplets, and cast shade below.',
        ta: 'மேகங்கள் காற்றில் மிதந்து மழையைப் பொழிந்து நிழலைத் தருகின்றன.',
      },
      points: 20,
    },
    {
      id: 'riddle-hard-04',
      difficulty: 'hard',
      question: {
        en: 'Forward I am heavy (ton), but backward I am not (not). What am I?',
        ta: 'முன்னோக்கி நான் கனமானவன் (ton), ஆனால் பின்னோக்கி நான் இல்லை (not). நான் யார்?',
      },
      answer: {
        en: 'Ton',
        ta: 'டன்',
      },
      acceptedAnswers: [
        { en: 'the word ton', ta: 'டன் எடை' },
        { en: 'a ton', ta: 'டன்' },
      ],
      hint: {
        en: 'Spell T-O-N forwards (a heavy unit) and backwards (N-O-T).',
        ta: 'T-O-N என்ற வார்த்தையை முன்பின்னாக வாசித்துப் பாருங்கள்.',
      },
      explanation: {
        en: '"TON" is a heavy unit of weight; reversed it spells "NOT".',
        ta: '"TON" என்பது கனமான எடை அலகு; அதைத் திருப்பிப் போட்டால் "NOT" என்று வரும்.',
      },
      points: 20,
    },
    {
      id: 'riddle-hard-05',
      difficulty: 'hard',
      question: {
        en: 'What builds up castles, tears down mountains, blinds some people, and helps others see?',
        ta: 'மணல் கோட்டைகளை உருவாக்குவது, மலைகளை உடைப்பது, சிலருக்கு பார்வையை மறைப்பது மற்றும் பிறருக்குக் காட்டுவது எது?',
      },
      answer: {
        en: 'Sand',
        ta: 'மணல்',
      },
      acceptedAnswers: [
        { en: 'sand grains', ta: 'மணல்' },
        { en: 'grain of sand', ta: 'மணல்துகள்' },
      ],
      hint: {
        en: 'Found on beaches, used to make glass for spectacles, and blows in storms.',
        ta: 'கடற்கரையில் காணப்படும்; கண்ணாடி தயாரிக்கப் பயன்படும்.',
      },
      explanation: {
        en: 'Sand makes sandcastles, erodes rocks, causes sandstorms, and melts into glass lenses.',
        ta: 'மணல் கோட்டை கட்டவும், பாறைகளை அரிக்கவும், கண்ணாடி லென்ஸ்கள் தயாரிக்கவும் பயன்படுகிறது.',
      },
      points: 20,
    },
  ],

  genius: [
    {
      id: 'riddle-gen-01',
      difficulty: 'genius',
      question: {
        en: 'A box without hinges, key, or lid, yet inside golden treasure is hid. What am I?',
        ta: 'கீல்கள், சாவி அல்லது மூடி இல்லாத ஒரு பெட்டி, ஆனால் உள்ளே தங்க புதையல் மறைந்துள்ளது. நான் யார்?',
      },
      answer: {
        en: 'Egg',
        ta: 'முட்டை',
      },
      acceptedAnswers: [
        { en: 'an egg', ta: 'கோழி முட்டை' },
        { en: 'eggs', ta: 'முட்டைகள்' },
      ],
      hint: {
        en: 'Birds and reptiles lay it, and the yellow yolk inside is the golden center.',
        ta: 'பறவைகள் இதை இடுகின்றன; உள்ளே மஞ்சள் கரு உள்ளது.',
      },
      explanation: {
        en: 'An egg has a seamless shell protecting the rich golden yolk inside.',
        ta: 'முட்டையின் ஓட்டிற்குள் மஞ்சள் கரு புதையல் போல பாதுகாக்கப்பட்டுள்ளது.',
      },
      points: 30,
    },
    {
      id: 'riddle-gen-02',
      difficulty: 'genius',
      question: {
        en: 'What is seen in the middle of March and April that can never be seen at the beginning or end of either month?',
        ta: 'மார்ச் மற்றும் ஏப்ரல் மாதங்களின் நடுவில் காணக்கூடியது, ஆனால் தொடக்கத்திலோ முடிவிலோ காண முடியாதது எது?',
      },
      answer: {
        en: 'The letter R',
        ta: 'ஆர் என்ற எழுத்து',
      },
      acceptedAnswers: [
        { en: 'letter r', ta: 'ஆர்' },
        { en: 'r', ta: 'R' },
        { en: 'the letter r', ta: 'ஆர் எழுத்து' },
      ],
      hint: {
        en: 'Look at the spelling: M-A-R-C-H and A-P-R-I-L.',
        ta: 'M-A-R-C-H மற்றும் A-P-R-I-L என்ற எழுத்துக்களைப் பாருங்கள்.',
      },
      explanation: {
        en: 'The letter "R" sits directly inside the middle of both words March and April.',
        ta: 'மார்ச் மற்றும் ஏப்ரல் ஆகிய இரு சொற்களின் நடுவிலும் "R" எழுத்து வருகிறது.',
      },
      points: 30,
    },
    {
      id: 'riddle-gen-03',
      difficulty: 'genius',
      question: {
        en: 'What disappears the exact moment you say its name?',
        ta: 'அதன் பெயரை நீங்கள் உச்சரிக்கும் அதே நொடியில் மறைந்துவிடுவது எது?',
      },
      answer: {
        en: 'Silence',
        ta: 'அமைதி',
      },
      acceptedAnswers: [
        { en: 'quiet', ta: 'நிசப்தம்' },
        { en: 'stillness', ta: 'அமைதி' },
        { en: 'a silence', ta: 'அமைதி' },
      ],
      hint: {
        en: 'Making even the tiniest sound immediately breaks it.',
        ta: 'சிறிய ஒலி எழுப்பினாலும் இது கலைந்துவிடும்.',
      },
      explanation: {
        en: 'Speaking creates sound, which instantly ends the state of complete silence.',
        ta: 'நாம் பேசும் போதே அமைதி கலைந்து சப்தம் உருவாகிவிடுகிறது.',
      },
      points: 30,
    },
    {
      id: 'riddle-gen-04',
      difficulty: 'genius',
      question: {
        en: 'I am taken from a mine and shut up in a wooden case, from which I am never released, yet I am used by almost every student. What am I?',
        ta: 'நான் ஒரு சுரங்கத்திலிருந்து எடுக்கப்பட்டு மரப்பெட்டியில் அடைக்கப்படுகிறேன், ஆனால் கிட்டத்தட்ட எல்லா மாணவர்களாலும் பயன்படுத்தப்படுகிறேன். நான் யார்?',
      },
      answer: {
        en: 'Pencil lead',
        ta: 'பென்சில் முனை',
      },
      acceptedAnswers: [
        { en: 'pencil graphite', ta: 'கிராபைட்' },
        { en: 'graphite', ta: 'பென்சில் கூர்' },
        { en: 'lead', ta: 'பென்சில்' },
        { en: 'pencil', ta: 'பென்சில்' },
      ],
      hint: {
        en: 'Carbon graphite encased in wood for sketching and writing.',
        ta: 'எழுதுவதற்கும் வரைவதற்கும் மரத்தால் மூடப்பட்ட கார்பன் கிராபைட்.',
      },
      explanation: {
        en: 'Pencil cores are made of mined graphite encased in wood.',
        ta: 'பென்சிலின் மையப்பகுதி சுரங்கத்தில் வெட்டியெடுக்கப்பட்ட கிராபைட்டால் செய்யப்படுகிறது.',
      },
      points: 30,
    },
    {
      id: 'riddle-gen-05',
      difficulty: 'genius',
      question: {
        en: 'I have no flesh, no feathers, no scales, and no bone, yet I have four fingers and a thumb of my own. What am I?',
        ta: 'எனக்கு சதை இல்லை, இறகுகள் இல்லை, செதில்கள் இல்லை, எலும்பும் இல்லை, ஆனால் எனக்கு நான்கு விரல்களும் ஒரு கட்டைவிரலும் உண்டு. நான் யார்?',
      },
      answer: {
        en: 'Glove',
        ta: 'கையுறை',
      },
      acceptedAnswers: [
        { en: 'a glove', ta: 'கையுறை' },
        { en: 'gloves', ta: 'கையுறைகள்' },
        { en: 'hand glove', ta: 'கை கிளவுஸ்' },
      ],
      hint: {
        en: 'You wear it over your hand in cold weather or in science labs.',
        ta: 'குளிர்காலத்தில் அல்லது ஆய்வகத்தில் உங்கள் கையில் அணிவீர்கள்.',
      },
      explanation: {
        en: 'A glove is tailored with five finger slots to match the human hand.',
        ta: 'கையுறை மனித கையின் வடிவத்திற்கு ஏற்ப ஐந்து விரல் பகுதிகளைக் கொண்டுள்ளது.',
      },
      points: 30,
    },
  ],
};

export function getRiddleCategories(): RiddleCategory[] {
  return [...RIDDLE_CATEGORIES];
}

export function getRiddlesForDifficulty(difficulty: RiddleDifficulty): RiddleQuestion[] {
  const list = RIDDLE_QUESTIONS[difficulty];
  if (!list || list.length === 0) return [];
  return [...list];
}
