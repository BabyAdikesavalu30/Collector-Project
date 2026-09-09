/**
 * Micro Lessons Data Catalog
 * 30 starter micro lessons across 7 science subjects for Grades 6–12.
 * Fully localized in English and Tamil.
 */

import {
  MicroLesson,
  MicroLessonCollection,
  MicroLessonSubjectMeta,
} from './microLessons.types';

export const MICRO_LESSON_SUBJECTS: MicroLessonSubjectMeta[] = [
  {
    id: 'physics',
    title: { en: 'Physics', ta: 'இயற்பியல்' },
    subtitle: { en: 'Forces, motion, light and energy', ta: 'விசைகள், இயக்கம், ஒளி மற்றும் ஆற்றல்' },
    icon: '⚛️',
    accentColor: '#2563EB',
    badgeBg: '#EFF6FF',
  },
  {
    id: 'chemistry',
    title: { en: 'Chemistry', ta: 'வேதியியல்' },
    subtitle: { en: 'Atoms, molecules, reactions and matter', ta: 'அணுக்கள், மூலக்கூறுகள் மற்றும் மாற்றங்கள்' },
    icon: '🧪',
    accentColor: '#7E22CE',
    badgeBg: '#FAF5FF',
  },
  {
    id: 'biology',
    title: { en: 'Biology', ta: 'உயிரியல்' },
    subtitle: { en: 'Cells, genetics, plants and ecosystems', ta: 'செல்கள், மரபியல், தாவரங்கள் மற்றும் சூழல்' },
    icon: '🧬',
    accentColor: '#16A34A',
    badgeBg: '#F0FDF4',
  },
  {
    id: 'space',
    title: { en: 'Space', ta: 'விண்வெளி' },
    subtitle: { en: 'Planets, stars, orbits and the cosmos', ta: 'கோள்கள், விண்மீன்கள் மற்றும் அண்டம்' },
    icon: '🪐',
    accentColor: '#D97706',
    badgeBg: '#FFFBEB',
  },
  {
    id: 'environment',
    title: { en: 'Environment', ta: 'சுற்றுச்சூழல்' },
    subtitle: { en: 'Ecosystems, climate, water and energy', ta: 'சுற்றுச்சூழல், காலநிலை, நீர் மற்றும் ஆற்றல்' },
    icon: '🌿',
    accentColor: '#059669',
    badgeBg: '#ECFDF5',
  },
  {
    id: 'human-body',
    title: { en: 'Human Body', ta: 'மனித உடல்' },
    subtitle: { en: 'Organs, circulation, brain and reflexes', ta: 'உறுப்புகள், இரத்த ஓட்டம் மற்றும் மூளை' },
    icon: '🫀',
    accentColor: '#E11D48',
    badgeBg: '#FFF1F2',
  },
  {
    id: 'everyday-science',
    title: { en: 'Everyday Science', ta: 'அன்றாட அறிவியல்' },
    subtitle: { en: 'Science hidden in everyday household phenomena', ta: 'அன்றாட வாழ்க்கையில் மறைந்துள்ள அறிவியல்' },
    icon: '💡',
    accentColor: '#EA580C',
    badgeBg: '#FFF7ED',
  },
];

export const MICRO_LESSONS: MicroLesson[] = [
  // ==========================================
  // PHYSICS (7 Lessons)
  // ==========================================
  {
    id: 'micro-newtons-first-law',
    title: { en: "Newton's First Law", ta: 'நியூட்டனின் முதல் விதி' },
    subtitle: { en: 'Inertia & Resistance to Motion', ta: 'நிலைமம் மற்றும் இயக்க எதிர்ப்பு' },
    description: {
      en: 'Understand why objects keep moving or stay still unless an external force acts on them.',
      ta: 'வெளிப்புற விசை செயல்படாத வரை ஒரு பொருள் தன் நிலையை மாற்றாது என்பதை அறிக.',
    },
    subject: 'physics',
    category: 'Mechanics',
    gradeRange: 'Grades 8–10',
    gradeGroup: 'secondary',
    durationMinutes: 2,
    difficulty: 'easy',
    icon: '🚀',
    visualType: 'newtons_first_law',
    keyPoints: [
      {
        en: 'Objects remain at rest or in uniform motion unless acted upon by a net external force.',
        ta: 'வெளிப்புற விசை செயல்படாத வரை பொருட்கள் ஓய்வு நிலையிலோ அல்லது சீரான இயக்கத்திலோ நீடிக்கும்.',
      },
      {
        en: 'Inertia is the natural property of matter that resists changes in motion.',
        ta: 'நிலைமம் என்பது இயக்க மாற்றத்தை எதிர்க்கும் பொருளின் இயற்கையான பண்பாகும்.',
      },
      {
        en: 'Heavier objects possess greater mass and therefore greater inertia.',
        ta: 'அதிக நிறை கொண்ட பொருட்கள் அதிக நிலைமத்தைக் கொண்டுள்ளன.',
      },
    ],
    quickCheck: {
      question: {
        en: 'Why does a standing passenger fall forward when a moving bus suddenly brakes?',
        ta: 'இயங்கும் பேருந்து திடீரென நிறுத்தப்படும்போது பயணி முன்னோக்கிச் சாய்வது ஏன்?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: 'Inertia of motion keeps the upper body moving forward', ta: 'இயக்க நிலைமத்தால் மேல் உடல் முன்னோக்கி நகர்கிறது' },
          isCorrect: true,
          explanation: {
            en: 'The passenger’s feet stop with the bus floor, but inertia keeps the upper body in forward motion.',
            ta: 'கால்கள் பேருந்துடன் நிற்கின்றன, ஆனால் உடலின் மேல் பகுதி நிலைமத்தால் தொடர்ந்து இயங்க விழைகிறது.',
          },
        },
        {
          id: 'opt-2',
          text: { en: 'Gravity suddenly pulls the passenger forward', ta: 'புவியீர்ப்பு விசை பயணியை முன்னோக்கி இழுக்கிறது' },
          isCorrect: false,
          explanation: {
            en: 'Gravity acts downward toward the center of the Earth, not forward.',
            ta: 'புவியீர்ப்பு கீழ்நோக்கி மட்டுமே செயல்படும், முன்னோக்கி அல்ல.',
          },
        },
        {
          id: 'opt-3',
          text: { en: 'Air pressure inside the bus increases rapidly', ta: 'பேருந்துக்குள் காற்று அழுத்தம் திடீரென உயர்கிறது' },
          isCorrect: false,
          explanation: {
            en: 'Air resistance inside the bus is negligible in this sudden motion change.',
            ta: 'பேருந்துக்குள் உள்ள காற்றின் அழுத்தம் இந்த சாய்வுக்குக் காரணமல்ல.',
          },
        },
        {
          id: 'opt-4',
          text: { en: 'Friction between shoes and the bus floor increases', ta: 'காலணிகளுக்கும் தரைக்கும் இடையிலான உராய்வு அதிகரிக்கிறது' },
          isCorrect: false,
          explanation: {
            en: 'Friction stops the feet; inertia is what makes the upper body lean forward.',
            ta: 'உராய்வு கால்களை நிறுத்துகிறது, மேல் உடல் முன்னோக்கிச் சாய்வது நிலைமத்தால்தான்.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'Inertia means matter is lazy: it never changes its speed or direction on its own.',
      ta: 'நிலைமம் என்பது பொருளின் பண்பு: அது தானாகவே தன் இயக்கத்தை மாற்றிக்கொள்ளாது.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=core&subjectId=physics&pathwayId=phy-c-1',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'The Core Concept', ta: 'அடிப்படை கருத்து' },
        content: {
          en: 'An object at rest stays at rest, and an object in motion keeps moving in a straight line at constant speed, unless acted on by an unbalanced external force.',
          ta: 'ஒரு பொருள் மீது சமன் செய்யப்படாத புறவிசை செயல்படாத வரை, அது தனது ஓய்வு நிலையையோ அல்லது நேர்க்கோட்டில் அமைந்த சீரான இயக்க நிலையையோ மாற்றாது.',
        },
      },
      {
        kind: 'why_it_matters',
        title: { en: 'Why It Matters in Everyday Life', ta: 'அன்றாட வாழ்வில் இதன் முக்கியத்துவம்' },
        content: {
          en: 'Without inertia, seatbelts in cars would be unnecessary. Inertia explains why kicking a heavy rock hurts more than kicking a football, and why spaceships can coast through space without burning fuel continuously.',
          ta: 'நிலைமம் இல்லையென்றால் கார்களில் இருக்கை வார்பட்டை (seatbelt) தேவையில்லை. கனமான கல்லை உதைக்கும்போது கால் வலிப்பதற்கும் இதுவே காரணம்.',
        },
        example: {
          en: 'When a car rounds a sharp corner, you feel pushed outward because your body naturally wants to keep travelling in a straight line.',
          ta: 'மகிழுந்து திருப்பத்தில் திரும்பும்போது, உங்கள் உடல் நேர்கோட்டில் செல்ல விரும்புவதால் வெளிப்புறமாக சாய்வது போல் உணர்கிறீர்கள்.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'newtons_first_law',
        title: { en: 'Visualizing Balanced vs Unbalanced Forces', ta: 'சமநிலை மற்றும் சமனற்ற விசைகள்' },
        visualCaption: {
          en: 'Zero net force = constant velocity or rest. Net force = change in motion.',
          ta: 'விசை சுழியாக இருந்தால் சீரான வேகம். புறவிசை இருந்தால் இயக்கத்தில் மாற்றம்.',
        },
        content: {
          en: 'When opposing forces cancel each other out, velocity is constant. Only a net unbalanced force causes an acceleration.',
          ta: 'எதிரெதிர் விசைகள் சமமாக இருந்தால் வேகம் மாறாது. சமனற்ற விசை மட்டுமே முடுக்கத்தை ஏற்படுத்தும்.',
        },
      },
      {
        kind: 'think_about_it',
        title: { en: 'Think About It', ta: 'சிந்தித்துப் பாருங்கள்' },
        content: {
          en: 'What would happen to a hockey puck sliding on perfectly frictionless ice?',
          ta: 'உராய்வே இல்லாத பனிப்பரப்பில் சறுக்கும் பந்து என்னவாகும்?',
        },
        thinkQuestion: {
          en: 'If there were zero friction and zero air resistance, would the puck ever stop?',
          ta: 'உராய்வோ அல்லது காற்று எதிர்ப்போ இல்லையென்றால், அந்த பந்து நிற்குமா?',
        },
        thinkAnswer: {
          en: 'No! It would slide forever in a straight line at the exact same speed until hitting an obstacle.',
          ta: 'நிற்காது! ஏதேனும் ஒரு பொருள் மீது மோதும் வரை அது சீரான வேகத்தில் நேர்கோட்டில் முடிவில்லாமல் சென்று கொண்டிருக்கும்.',
        },
      },
      {
        kind: 'key_points',
        title: { en: 'Key Points to Remember', ta: 'முக்கிய குறிப்புகள்' },
        content: {
          en: 'Review these fundamental rules of inertia.',
          ta: 'நிலைமத்தின் அடிப்படை விதிகளை மீண்டும் ஒருமுறை நினைவுகூருங்கள்.',
        },
        keyPoints: [
          {
            en: 'Inertia depends only on mass: more mass = more inertia.',
            ta: 'நிலைமம் நிறையை மட்டுமே சார்ந்துள்ளது: அதிக நிறை = அதிக நிலைமம்.',
          },
          {
            en: 'Forces cause acceleration, not motion itself.',
            ta: 'விசையானது முடுக்கத்தை உண்டாக்குகிறது, வெறும் இயக்கத்தை அல்ல.',
          },
        ],
      },
      {
        kind: 'remember',
        title: { en: 'One-Sentence Summary', ta: 'ஒரே வாக்கியத்தில்' },
        content: {
          en: 'Inertia is the natural resistance of any physical object to any change in its velocity.',
          ta: 'பொருட்கள் தங்கள் இயக்க நிலையைத் தாமாகவே மாற்றிக்கொள்ளாத பண்பே நிலைமம் எனப்படும்.',
        },
        rememberStatement: {
          en: 'Inertia means matter resists change: no force, no change in motion.',
          ta: 'நிலைமம் என்றால் மாற்றம் தவிர்க்கும் பண்பு: விசை இன்றி இயக்க மாற்றம் இல்லை.',
        },
      },
    ],
  },
  {
    id: 'micro-newtons-third-law',
    title: { en: "Newton's Third Law", ta: 'நியூட்டனின் மூன்றாம் விதி' },
    subtitle: { en: 'Action & Reaction Forces', ta: 'செயல் மற்றும் எதிர்செயல் விசைகள்' },
    description: {
      en: 'Discover why forces always exist in matched pairs and how rockets fly in space.',
      ta: 'விசைகள் எப்போதும் இரட்டையாகவே செயல்படும் என்பதையும் ராக்கெட்டுகள் பறக்கும் முறையையும் அறியவும்.',
    },
    subject: 'physics',
    category: 'Mechanics',
    gradeRange: 'Grades 8–10',
    gradeGroup: 'secondary',
    durationMinutes: 2,
    difficulty: 'easy',
    icon: '💥',
    visualType: 'newtons_third_law',
    keyPoints: [
      {
        en: 'For every action, there is an equal and opposite reaction.',
        ta: 'ஒவ்வொரு விசைக்கும் சமமான மற்றும் எதிர் திசையிலான எதிர்விசை உண்டு.',
      },
      {
        en: 'Action and reaction forces always act on two different objects, never on the same one.',
        ta: 'செயல் மற்றும் எதிர்செயல் விசைகள் எப்போதும் இரு வேறு பொருட்களின் மீது செயல்படுகின்றன.',
      },
      {
        en: 'Rockets propel forward by expelling gas backward at high velocity.',
        ta: 'ராக்கெட்டுகள் வாயுவை அதிக வேகத்தில் பின்னோக்கி வெளியேற்றி முன்னோக்கி பாய்கின்றன.',
      },
    ],
    quickCheck: {
      question: {
        en: 'How does a swimmer push forward through swimming pool water?',
        ta: 'நீச்சல் குளத்தில் ஒரு நீச்சல் வீரர் முன்னோக்கி நகர்வது எவ்வாறு?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: 'The swimmer pushes water backward, so water pushes the swimmer forward', ta: 'நீரை பின்னோக்கி தள்ளுவதால், நீர் நீச்சல் வீரரை முன்னோக்கி தள்ளுகிறது' },
          isCorrect: true,
          explanation: {
            en: 'Action force pushes water back; the reaction force propels the swimmer forward.',
            ta: 'செயல் விசை நீரை பின்னோக்கி தள்ளுகிறது; எதிர்செயல் விசை நீச்சல் வீரரை முன்னோக்கி செலுத்துகிறது.',
          },
        },
        {
          id: 'opt-2',
          text: { en: 'Water density pulls the swimmer toward the other end', ta: 'நீரின் அடர்த்தி நீச்சல் வீரரை இழுக்கிறது' },
          isCorrect: false,
          explanation: {
            en: 'Density creates buoyancy, not forward propulsion.',
            ta: 'அடர்த்தி மிதப்புத்தன்மையை அளிக்கும், முன்னோக்கிய உந்துதலை அல்ல.',
          },
        },
        {
          id: 'opt-3',
          text: { en: 'Gravity cancels out the weight of the water', ta: 'புவியீர்ப்பு நீரின் எடையை சமன் செய்கிறது' },
          isCorrect: false,
          explanation: {
            en: 'Gravity does not generate horizontal motion.',
            ta: 'புவியீர்ப்பு கிடைமட்ட இயக்கத்தை உண்டாக்காது.',
          },
        },
        {
          id: 'opt-4',
          text: { en: 'Water temperature creates an expansion wave', ta: 'நீரின் வெப்பநிலை விரிவடைதல் அலையை உருவாக்குகிறது' },
          isCorrect: false,
          explanation: {
            en: 'Swimming relies purely on mechanical contact forces.',
            ta: 'நீச்சல் முழுக்க முழுக்க விசை மற்றும் எதிர்விசையைச் சார்ந்ததே.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'You cannot push on the universe without the universe pushing right back on you.',
      ta: 'நீங்கள் ஒரு பொருளைத் தள்ளும்போது, அதே அளவு விசையுடன் அப்பொருளும் உங்களைத் திருப்பித் தள்ளுகிறது.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=core&subjectId=physics&pathwayId=phy-c-1',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'Action and Reaction', ta: 'செயலும் எதிர்செயலும்' },
        content: {
          en: 'Forces never occur alone in nature; they always occur in equal, opposite pairs acting on two different bodies.',
          ta: 'இயற்கையில் விசை தனியாக உருவாவதில்லை; அவை எப்போதும் சமமான மற்றும் எதிர் திசையிலான ஜோடிகளாகவே செயல்படுகின்றன.',
        },
      },
      {
        kind: 'why_it_matters',
        title: { en: 'Walking on the Ground', ta: 'தரையில் நடப்பது எப்படி?' },
        content: {
          en: 'When you take a step, your foot pushes backward against the Earth. The Earth pushes forward against your shoe with the exact same force, moving you forward.',
          ta: 'நீங்கள் நடக்கும்போது உங்கள் கால் பூமியை பின்னோக்கித் தள்ளுகிறது. பூமி உங்கள் காலணியை முன்னோக்கித் தள்ளி உங்களை முன்னேற்றுகிறது.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'newtons_third_law',
        title: { en: 'Rocket Propulsion Diagram', ta: 'ராக்கெட் உந்துவிசை வரைபடம்' },
        visualCaption: {
          en: 'Gas shoots downward (action) → Rocket accelerates upward (reaction).',
          ta: 'வாயு கீழ்நோக்கி பாய்கிறது (செயல்) → ராக்கெட் மேல்நோக்கி எழுகிறது (எதிர்செயல்).',
        },
        content: {
          en: 'Rockets do not push against air or the ground; they push against their own exhaust gas.',
          ta: 'ராக்கெட்டுகள் காற்றின் மீதோ தரையின் மீதோ தள்ளுவதில்லை; அவை வெளியேறும் வாயுவின் மீது விசை செலுத்துகின்றன.',
        },
      },
      {
        kind: 'think_about_it',
        thinkQuestion: {
          en: 'If action and reaction forces are always equal and opposite, why don’t they cancel each other out to zero?',
          ta: 'செயலும் எதிர்செயலும் சமமாகவும் எதிராகவும் இருந்தால், அவை ஒன்றை ஒன்று சமன் செய்து சுழியாகாதா?',
        },
        thinkAnswer: {
          en: 'Because they act on DIFFERENT objects! Forces only cancel when applied to the SAME object.',
          ta: 'ஏனென்றால் அவை வெவ்வேறு பொருட்களின் மீது செயல்படுகின்றன! ஒரே பொருள் மீது செயல்பட்டால் மட்டுமே சுழியாகும்.',
        },
        content: {
          en: 'Think about a horse pulling a cart: horse pushes ground; ground pushes horse.',
          ta: 'குதிரை வண்டியை இழுக்கும்போது, குதிரை தரையைத் தள்ளுகிறது; தரை குதிரையைத் தள்ளுகிறது.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'Forces are interactions between two objects: Fab = -Fba.',
          ta: 'விசைகள் இரு பொருட்களுக்கு இடையிலான ஊடாடுதல்: Fab = -Fba.',
        },
        rememberStatement: {
          en: 'Action and reaction act on two different bodies at the exact same instant.',
          ta: 'செயலும் எதிர்செயலும் ஒரே கணத்தில் இரு வேறு பொருட்களின் மீது செயல்படும்.',
        },
      },
    ],
  },
  {
    id: 'micro-light-reflection',
    title: { en: 'Light Reflection & Mirrors', ta: 'ஒளி எதிரொளிப்பு மற்றும் கண்ணாடிகள்' },
    subtitle: { en: 'Angle of Incidence & Reflection', ta: 'படுகோணம் மற்றும் எதிரொளிப்புக் கோணம்' },
    description: {
      en: 'Learn the two universal laws of reflection and how flat plane mirrors form virtual images.',
      ta: 'ஒளி எதிரொளிப்பு விதிகள் மற்றும் சமதள ஆடியில் பிம்பம் தோன்றும் விதத்தை அறியவும்.',
    },
    subject: 'physics',
    category: 'Optics',
    gradeRange: 'Grades 6–7',
    gradeGroup: 'junior',
    durationMinutes: 2,
    difficulty: 'easy',
    icon: '🪞',
    visualType: 'light_reflection',
    keyPoints: [
      {
        en: 'The angle of incidence always equals the angle of reflection (i = r).',
        ta: 'படுகோணமும் எதிரொளிப்புக் கோணமும் எப்போதும் சமமாக இருக்கும் (i = r).',
      },
      {
        en: 'The incident ray, reflected ray, and normal all lie in the same geometric plane.',
        ta: 'படுகதிர், எதிரொளிப்புக் கதிர் மற்றும் செங்குத்துக் கோடு ஆகியவை ஒரே தளத்தில் அமையும்.',
      },
      {
        en: 'Plane mirror images are virtual, upright, and laterally inverted (left appears right).',
        ta: 'சமதள ஆடியில் தோன்றும் பிம்பம் மாயப் பிம்பம், நேரானது மற்றும் இடவல மாற்றமடைந்தது.',
      },
    ],
    quickCheck: {
      question: {
        en: 'If a light beam strikes a flat mirror at an angle of 35° to the normal, what is the angle of reflection?',
        ta: 'ஒளிக்கதிர் ஒன்று செங்குத்துக் கோட்டுடன் 35° கோணத்தில் ஒரு கண்ணாடியில் பட்டால், எதிரொளிப்புக் கோணம் எவ்வளவு?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: '35°', ta: '35°' },
          isCorrect: true,
          explanation: {
            en: 'According to the law of reflection, angle of reflection equals angle of incidence.',
            ta: 'எதிரொளிப்பு விதியின்படி படுகோணம் = எதிரொளிப்புக் கோணம் (35°).',
          },
        },
        {
          id: 'opt-2',
          text: { en: '55°', ta: '55°' },
          isCorrect: false,
          explanation: {
            en: '55° is the angle to the mirror surface, not to the normal.',
            ta: '55° என்பது கண்ணாடித் தளத்திற்கான கோணம், செங்குத்துக் கோட்டிற்கானது அல்ல.',
          },
        },
        {
          id: 'opt-3',
          text: { en: '70°', ta: '70°' },
          isCorrect: false,
          explanation: {
            en: '70° is the total angle between the incident and reflected rays.',
            ta: '70° என்பது இரு கதிர்களுக்கு இடையேயான மொத்த கோணம்.',
          },
        },
        {
          id: 'opt-4',
          text: { en: '90°', ta: '90°' },
          isCorrect: false,
          explanation: {
            en: 'A 90° angle would travel parallel to the mirror surface.',
            ta: '90° என்பது கண்ணாடிக்கு இணையாக செல்லும்.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'Incoming angle equals outgoing angle: i = r relative to the perpendicular normal.',
      ta: 'செங்குத்துக் கோட்டிற்கு படுகோணமும் எதிரொளிப்புக் கோணமும் எப்போதும் சமம்: i = r.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=foundation&subjectId=physics&pathwayId=phy-f-2',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'The Law of Reflection', ta: 'எதிரொளிப்பு விதி' },
        content: {
          en: 'When light hits a smooth, shiny surface like glass, polished metal, or calm water, it bounces off in a predictable direction.',
          ta: 'மென்மையான, பளபளப்பான மேற்பரப்பில் ஒளி படும்போது, அது துல்லியமான திசையில் திரும்பி எதிரொளிக்கிறது.',
        },
      },
      {
        kind: 'why_it_matters',
        title: { en: 'Why Ambulances Write in Reverse', ta: 'ஆம்புலன்ஸ் வாகனத்தில் எழுத்துகள் தலைகீழாக இருப்பது ஏன்?' },
        content: {
          en: 'Ambulance hoods print AMBULANCE mirrored so that drivers looking into rear-view mirrors see the word right-side-up through lateral inversion.',
          ta: 'மகிழுந்து ஓட்டுநர்கள் தங்கள் கண்ணாடியில் பார்க்கும்போது இடவல மாற்றத்தால் சரியான வடிவில் தெரியும்படி ஆம்புலன்ஸில் முன்புறம் தலைகீழாக எழுதப்படுகிறது.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'light_reflection',
        visualCaption: {
          en: 'Incident ray and reflected ray symmetrically balance across the Normal line.',
          ta: 'செங்குத்துக் கோட்டின் இருபுறமும் படுகதிரும் எதிரொளிப்புக் கதிரும் சம கோணத்தில் உள்ளன.',
        },
        content: {
          en: 'The normal is an imaginary line perpendicular (90°) to the mirror surface at the point of strike.',
          ta: 'செங்குத்துக் கோடு என்பது ஒளி படும் புள்ளியில் கண்ணாடிக்கு செங்குத்தாக வரையப்படும் கற்பனைக் கோடாகும்.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'Mirror reflection gives clear images because all rays bounce in parallel (specular reflection).',
          ta: 'கண்ணாடி தெளிவான பிம்பத்தை அளிக்கிறது, ஏனெனில் கதிர்கள் சீராக இணையாக எதிரொளிக்கின்றன.',
        },
        rememberStatement: {
          en: 'The angle of incidence is always equal to the angle of reflection.',
          ta: 'படுகோணம் எப்போதும் எதிரொளிப்புக் கோணத்திற்குச் சமமாக இருக்கும்.',
        },
      },
    ],
  },
  {
    id: 'micro-electric-circuits',
    title: { en: 'Electric Current & Closed Circuits', ta: 'மின்னோட்டம் மற்றும் மூடிய மின்சுற்று' },
    subtitle: { en: 'Flow of Electrons & Voltage', ta: 'எலக்ட்ரான்களின் ஓட்டம் மற்றும் மின்னழுத்தம்' },
    description: {
      en: 'Understand how electrons flow from negative to positive terminals to power light bulbs.',
      ta: 'மின்கலத்திலிருந்து எலக்ட்ரான்கள் பாய்ந்து மின்விளக்கை எரியச் செய்யும் விதத்தை அறியவும்.',
    },
    subject: 'physics',
    category: 'Electricity',
    gradeRange: 'Grades 8–10',
    gradeGroup: 'secondary',
    durationMinutes: 2,
    difficulty: 'easy',
    icon: '⚡',
    visualType: 'electric_circuit',
    keyPoints: [
      {
        en: 'An electric current is the orderly flow of free electrons through a conductor.',
        ta: 'மின்னோட்டம் என்பது கடத்தியின் வழியே எலக்ட்ரான்கள் சீராகப் பாய்வதாகும்.',
      },
      {
        en: 'A circuit must be completely closed with no breaks for current to flow.',
        ta: 'மின்னோட்டம் பாய மின்சுற்று எந்த இடைவெளியும் இன்றி முழுமையாக மூடப்பட்டிருக்க வேண்டும்.',
      },
      {
        en: 'Switches control the circuit by opening (stopping flow) or closing (allowing flow).',
        ta: 'சுவிட்ச் மின்சுற்றைத் திறப்பதன் மூலமோ அல்லது மூடுவதன் மூலமோ மின்னோட்டத்தைக் கட்டுப்படுத்துகிறது.',
      },
    ],
    quickCheck: {
      question: {
        en: 'What happens to a simple circuit when you open the switch?',
        ta: 'ஒரு எளிய மின்சுற்றில் சுவிட்சைத் திறக்கும்போது என்ன நிகழும்?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: 'The current stops flowing and the light goes out', ta: 'மின்னோட்டம் நின்று மின்விளக்கு அணையும்' },
          isCorrect: true,
          explanation: {
            en: 'Opening the switch breaks the continuous conductive path, halting the flow of charge.',
            ta: 'சுவிட்சைத் திறப்பது கடத்தும் பாதையைத் துண்டிக்கிறது, இதனால் மின்னோட்டம் நின்றுவிடுகிறது.',
          },
        },
        {
          id: 'opt-2',
          text: { en: 'The battery produces double voltage', ta: 'மின்கலம் இரட்டிப்பு மின்னழுத்தத்தை அளிக்கும்' },
          isCorrect: false,
          explanation: {
            en: 'The battery’s rated voltage remains unchanged.',
            ta: 'மின்கலத்தின் மின்னழுத்தம் மாறாது.',
          },
        },
        {
          id: 'opt-3',
          text: { en: 'Electrons escape into the room air', ta: 'எலக்ட்ரான்கள் அறை காற்றில் தப்பித்துவிடும்' },
          isCorrect: false,
          explanation: {
            en: 'Air is an insulator; electrons remain trapped inside the copper wire.',
            ta: 'காற்று ஒரு மின்கடத்தாப் பொருள்; எலக்ட்ரான்கள் கம்பியினுள்ளேயே இருக்கும்.',
          },
        },
        {
          id: 'opt-4',
          text: { en: 'Current reverses its direction immediately', ta: 'மின்னோட்டம் உடனே திசை மாறும்' },
          isCorrect: false,
          explanation: {
            en: 'Current halts completely in an open circuit.',
            ta: 'திறந்த சுற்றில் மின்னோட்டம் முற்றிலும் நின்றுவிடும்.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'No closed loop means no flow: electricity only moves through complete unbroken pathways.',
      ta: 'முழுமையான மூடிய சுற்று இல்லையெனில் மின்னோட்டம் பாயாது.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=core&subjectId=physics&pathwayId=phy-c-3',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'What is Electric Current?', ta: 'மின்னோட்டம் என்றால் என்ன?' },
        content: {
          en: 'Electric current is the rate of flow of electric charges. In copper wires, these charges are tiny negative subatomic particles called electrons.',
          ta: 'மின்னூட்டங்கள் பாயும் வீதமே மின்னோட்டம் எனப்படும். உலோகக் கம்பிகளில் எலக்ட்ரான்கள் பாய்வதால் இது ஏற்படுகிறது.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'electric_circuit',
        visualCaption: {
          en: 'Battery provides voltage → Wires guide electrons → Bulb provides resistance & light.',
          ta: 'மின்கலம் மின்னழுத்தம் அளிக்கிறது → கம்பிகள் வழிகாட்டுகின்றன → விளக்கு ஒளிர்கிறது.',
        },
        content: {
          en: 'Voltage is the electrical pressure provided by a battery that pushes charges through the resistive circuit.',
          ta: 'மின்னழுத்தம் என்பது மின்னூட்டங்களை முன்னோக்கி உந்தும் மின் அழுத்த வேறுபாடாகும்.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'Current is measured in Amperes (A), and voltage is measured in Volts (V).',
          ta: 'மின்னோட்டம் ஆம்பியர் (A) அலகிலும், மின்னழுத்தம் வோல்ட் (V) அலகிலும் அளவிடப்படுகிறது.',
        },
        rememberStatement: {
          en: 'Current flows only through complete, closed conductive loops.',
          ta: 'முழுமையான மூடிய கடத்துச் சுற்றில் மட்டுமே மின்னோட்டம் பாயும்.',
        },
      },
    ],
  },
  {
    id: 'micro-sound-waves',
    title: { en: 'Sound Waves & Vibrations', ta: 'ஒலி அலைகள் மற்றும் அதிர்வுகள்' },
    subtitle: { en: 'Compression & Mediums', ta: 'நெருக்கங்கள் மற்றும் ஊடகங்கள்' },
    description: {
      en: 'Discover why sound needs a material medium to travel and why space is completely silent.',
      ta: 'ஒலி பரவ ஏன் ஊடகம் தேவை என்பதையும் விண்வெளியில் ஒலி கேட்காததன் காரணத்தையும் அறியவும்.',
    },
    subject: 'physics',
    category: 'Waves',
    gradeRange: 'Grades 8–10',
    gradeGroup: 'secondary',
    durationMinutes: 2,
    difficulty: 'easy',
    icon: '🔊',
    visualType: 'sound_vibrations',
    keyPoints: [
      {
        en: 'Sound is produced by vibrating objects and travels as longitudinal mechanical waves.',
        ta: 'ஒலி அதிர்வடையும் பொருட்களால் உருவாக்கப்பட்டு நெட்டலைகளாக பரவுகிறது.',
      },
      {
        en: 'Sound requires a solid, liquid, or gas medium; it cannot travel through a vacuum.',
        ta: 'ஒலி பரவ திட, திரவ அல்லது வாயு ஊடகம் தேவை; வெற்றிடத்தில் பரவாது.',
      },
      {
        en: 'Sound travels fastest in solids, slower in liquids, and slowest in gases.',
        ta: 'ஒலி திடப்பொருட்களில் மிக வேகமாகவும், வாயுக்களில் மிக மெதுவாகவும் செல்லும்.',
      },
    ],
    quickCheck: {
      question: {
        en: 'Why can astronauts on a spacewalk not hear each other shouting without their radio headsets?',
        ta: 'விண்வெளியில் விண்வெளி வீரர்கள் வானொலி சாதனம் இன்றி பேசுவதைக் கேட்க முடியாதது ஏன்?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: 'Space is a vacuum with no air molecules to vibrate and carry sound waves', ta: 'விண்வெளி என்பது வெற்றிடம், அலைகளைக் கடத்த அங்கு காற்று மூலக்கூறுகள் இல்லை' },
          isCorrect: true,
          explanation: {
            en: 'Mechanical waves need matter particles to pass energy along; in a vacuum there are none.',
            ta: 'ஒலி போன்ற இயந்திர அலைகள் பரவ துகள்கள் தேவை; விண்வெளியில் காற்று இல்லாததால் ஒலி பரவாது.',
          },
        },
        {
          id: 'opt-2',
          text: { en: 'Spacesuits absorb 100% of all frequency sound energy', ta: 'விண்வெளி உடை அனைத்து ஒலியையும் உறிஞ்சிக் கொள்கிறது' },
          isCorrect: false,
          explanation: {
            en: 'Even outside a suit, sound cannot propagate across empty space.',
            ta: 'விண்வெளி உடை இல்லாவிட்டாலும் வெற்றிடத்தில் ஒலி பரவ முடியாது.',
          },
        },
        {
          id: 'opt-3',
          text: { en: 'Zero gravity reduces the pitch of sound below hearing threshold', ta: 'ஈர்ப்பு விசை இல்லாததால் ஒலி சுருதி மனித எல்லைக்குக் கீழே போகிறது' },
          isCorrect: false,
          explanation: {
            en: 'Gravity has no direct effect on the propagation of sound waves.',
            ta: 'ஈர்ப்பு விசை ஒலி அலைகளின் பரவலைப் பாதிப்பதில்லை.',
          },
        },
        {
          id: 'opt-4',
          text: { en: 'Cosmic radiation cancels out vibrating pressure waves', ta: 'காஸ்மிக் கதிர்வீச்சு அதிர்வு அழுத்த அலைகளை அழிக்கிறது' },
          isCorrect: false,
          explanation: {
            en: 'Cosmic rays are high energy particles and do not destroy mechanical vibrations.',
            ta: 'காஸ்மிக் கதிர்கள் ஒலியை அழிப்பதில்லை.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'No matter, no sound: vibrations need particles to travel.',
      ta: 'பருப்பொருள் இல்லையெனில் ஒலி இல்லை: அதிர்வுகள் பரவ துகள்கள் கட்டாயம் தேவை.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=core&subjectId=physics&pathwayId=phy-c-2',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'How Sound is Made', ta: 'ஒலி எவ்வாறு உருவாகிறது?' },
        content: {
          en: 'Pluck a guitar string or strike a tuning fork: the rapid back-and-forth vibration compresses surrounding air molecules into repeating compressions and rarefactions.',
          ta: 'கிட்டாரின் கம்பியை மீட்டும்போதோ அல்லது இசைக்கவையைத் தட்டும்போதோ உருவாகும் அதிர்வுகள் காற்றில் நெருக்கங்களையும் தளர்ச்சிகளையும் உண்டாக்குகின்றன.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'sound_vibrations',
        visualCaption: {
          en: 'Compressions (high pressure) and Rarefactions (low pressure) travel forward.',
          ta: 'நெருக்கங்களும் (அதிக அழுத்தம்) தளர்ச்சிகளும் (குறைந்த அழுத்தம்) முன்னோக்கி நகர்கின்றன.',
        },
        content: {
          en: 'Particles vibrate parallel to the direction of wave travel — this is why sound is called a longitudinal wave.',
          ta: 'ஊடகத்தின் துகள்கள் அலை பரவும் திசைக்கு இணையாக அதிர்வுறுவதால் இது நெட்டலை எனப்படும்.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'Sound moves about 343 m/s in air, but over 5,000 m/s in solid steel because closely packed atoms transfer vibrations faster.',
          ta: 'காற்றில் ஒலியின் வேகம் சுமார் 343 மீ/வி, ஆனால் எஃகில் 5,000 மீ/வி-க்கும் அதிகம், ஏனெனில் துகள்கள் மிக நெருக்கமாக உள்ளன.',
        },
        rememberStatement: {
          en: 'Sound travels as mechanical longitudinal waves requiring a material medium.',
          ta: 'ஒலி என்பது பரவுவதற்கு ஊடகம் தேவைப்படும் ஒரு இயந்திர நெட்டலையாகும்.',
        },
      },
    ],
  },
  {
    id: 'micro-gravity-weightlessness',
    title: { en: 'Gravity & Weightlessness', ta: 'புவியீர்ப்பு மற்றும் எடையின்மை' },
    subtitle: { en: 'Free Fall & Orbital Motion', ta: 'தடையற்ற வீழ்ச்சி மற்றும் சுற்றுப்பாதை' },
    description: {
      en: 'Learn why astronauts on the International Space Station float — it is not zero gravity!',
      ta: 'விண்வெளி மையத்தில் வீரர்கள் மிதப்பது ஏன்? அங்கு ஈர்ப்பு விசை சுழி அல்ல!',
    },
    subject: 'physics',
    category: 'Gravitation',
    gradeRange: 'Grades 8–10',
    gradeGroup: 'secondary',
    durationMinutes: 2,
    difficulty: 'medium',
    icon: '🧑‍🚀',
    visualType: 'gravity_orbit',
    keyPoints: [
      {
        en: 'Gravity at ISS orbital altitude (400 km) is still about 90% as strong as on the ground.',
        ta: '400 கி.மீ உயரத்தில் உள்ள விண்வெளி மையத்தில் ஈர்ப்பு விசை தரையில் உள்ளதில் 90% உள்ளது.',
      },
      {
        en: 'Astronauts float because both they and their spacecraft are in continuous free-fall toward Earth.',
        ta: 'விண்கலமும் வீரர்களும் பூமியை நோக்கி தொடர்ச்சியாக தடையின்றி விழுவதால் எடையின்மை ஏற்படுகிறது.',
      },
      {
        en: 'Orbiting means falling toward Earth while moving sideways so fast that you keep missing the ground.',
        ta: 'சுற்றுப்பாதை என்பது அதிவேக பக்கவாட்டு இயக்கத்தால் பூமி வளைவிற்கு ஏற்ப கீழே விழாமல் சுற்றுவதாகும்.',
      },
    ],
    quickCheck: {
      question: {
        en: 'Why do astronauts float inside the orbiting space station?',
        ta: 'சுற்றுப்பாதையில் உள்ள விண்கலத்தில் விண்வெளி வீரர்கள் மிதப்பது ஏன்?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: 'They and the space station are in perpetual free fall together', ta: 'அவர்களும் விண்கலமும் ஒன்றாகத் தடையின்றி கீழே விழுந்து கொண்டிருக்கிறார்கள்' },
          isCorrect: true,
          explanation: {
            en: 'Both fall at the exact same acceleration (g), so there is no normal contact force from the floor.',
            ta: 'இருவரும் ஒரே முடுக்கத்தில் விழுவதால், காலடியில் தாங்கும் தரை விசை சுழியாகிறது.',
          },
        },
        {
          id: 'opt-2',
          text: { en: 'There is zero gravitational pull in low Earth orbit', ta: 'பூமிக்கு அருகில் ஈர்ப்பு விசை முற்றிலும் இருப்பதில்லை' },
          isCorrect: false,
          explanation: {
            en: 'Earth’s gravity at 400 km is nearly 9 m/s², very close to ground level.',
            ta: '400 கி.மீ உயரத்தில் ஈர்ப்பு விசை கிட்டத்தட்ட 9 மீ/வி² ஆக உள்ளது.',
          },
        },
        {
          id: 'opt-3',
          text: { en: 'Magnetic thrusters cancel Earth’s gravitational field', ta: 'காந்த சாதனங்கள் பூமியின் ஈர்ப்பு விசையை அழிக்கின்றன' },
          isCorrect: false,
          explanation: {
            en: 'No magnetic shielding cancels gravity.',
            ta: 'காந்தத்தால் ஈர்ப்பு விசையை அழிக்க முடியாது.',
          },
        },
        {
          id: 'opt-4',
          text: { en: 'Centrifugal force dissolves the astronaut’s mass', ta: 'மையவிலக்கு விசை வீரரின் நிறையை கரைத்துவிடுகிறது' },
          isCorrect: false,
          explanation: {
            en: 'Mass is an invariant intrinsic property of matter and never dissolves.',
            ta: 'நிறை என்பது மாறாத பண்பு, அது எங்கும் அழியாது.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'Apparent weightlessness happens in free-fall when nothing supports your feet.',
      ta: 'தடையற்ற வீழ்ச்சியின் போது தாங்கு விசை இல்லாததால் எடையின்மை உணரப்படுகிறது.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=core&subjectId=physics&pathwayId=phy-c-1',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'The Myth of Zero Gravity', ta: 'சுழி ஈர்ப்பு பற்றிய தவறான கருத்து' },
        content: {
          en: 'Many people assume space has zero gravity. In fact, Earth’s gravity extends millions of kilometers into space. Astronauts float because they are in orbit — a state of perpetual free-fall.',
          ta: 'விண்வெளியில் ஈர்ப்பு விசை இல்லை எனப் பலர் நினைக்கின்றனர். ஆனால் விண்வெளி வீரர்கள் தொடர் வீழ்ச்சியில் இருப்பதாலேயே மிதக்கிறார்கள்.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'gravity_orbit',
        visualCaption: {
          en: 'Newton’s Cannonball: Shoot fast enough horizontally, and the curve of your fall matches the curve of Earth.',
          ta: 'நியூட்டனின் பீரங்கிக் குண்டு: பக்கவாட்டு வேகம் அதிகமாகும்போது பூமி வளைவிற்கு ஏற்ப தொடர்ந்து சுற்றுகிறது.',
        },
        content: {
          en: 'At roughly 28,000 km/h (7.8 km/s), the curvature of the fall matches the curvature of the planet.',
          ta: 'வினாடிக்கு 7.8 கி.மீ வேகத்தில் செல்லும்போது தரை வளைந்து கொண்டே இருப்பதால் விண்கலம் விழுந்து கொண்டே இருக்கும் ஆனால் தரையைத் தொடாது.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'You feel weight because the floor pushes up against you. Remove the floor (free fall), and weight feels zero.',
          ta: 'தரை உங்களைத் தாங்குவதால் எடையை உணர்கிறீர்கள். தரை கீழே விழுந்தால் எடையற்ற நிலை உண்டாகிறது.',
        },
        rememberStatement: {
          en: 'Astronauts float not from absence of gravity, but because they are falling around Earth.',
          ta: 'ஈர்ப்பு விசை இல்லாததால் அல்ல, பூமியைச் சுற்றி விழுந்து கொண்டிருப்பதாலேயே வீரர்கள் மிதக்கிறார்கள்.',
        },
      },
    ],
  },
  {
    id: 'micro-heat-transfer',
    title: { en: 'Heat Transfer: Conduction, Convection & Radiation', ta: 'வெப்பப் பரிமாற்றம்: கடத்தல், சலனம், கதிர்வீச்சு' },
    subtitle: { en: 'Three Ways Thermal Energy Travels', ta: 'வெப்ப ஆற்றல் பரவும் மூன்று வழிகள்' },
    description: {
      en: 'Understand how thermal energy travels through direct contact, fluid currents, and electromagnetic waves.',
      ta: 'நேரடித் தொடுதல், திரவ சுழற்சி மற்றும் மின்காந்த அலைகள் மூலம் வெப்பம் பரவும் முறைகளை அறியவும்.',
    },
    subject: 'physics',
    category: 'Thermodynamics',
    gradeRange: 'Grades 6–7',
    gradeGroup: 'junior',
    durationMinutes: 2,
    difficulty: 'easy',
    icon: '🔥',
    visualType: 'heat_transfer',
    keyPoints: [
      {
        en: 'Conduction transfers heat through direct atomic collisions in solids (e.g. metal spoon in hot soup).',
        ta: 'திடப்பொருட்களில் துகள்களின் நேரடித் தொடுதல் மூலம் வெப்பம் பரவுவது வெப்பக் கடத்தல் ஆகும்.',
      },
      {
        en: 'Convection transfers heat through bulk fluid movement (hot fluid rises, cooler fluid sinks).',
        ta: 'திரவங்கள் மற்றும் வாயுக்களில் துகள்களின் இயக்கத்தால் வெப்பம் பரவுவது வெப்பச் சலனம் ஆகும்.',
      },
      {
        en: 'Radiation transfers heat via infrared electromagnetic waves without needing any medium (e.g. sunlight).',
        ta: 'எந்த ஊடகமும் இன்றி மின்காந்த அலைகளாக வெப்பம் பரவுவது வெப்பக் கதிர்வீச்சு ஆகும்.',
      },
    ],
    quickCheck: {
      question: {
        en: 'How does heat energy from the Sun reach Earth through the empty vacuum of space?',
        ta: 'வெற்றிடமான விண்வெளியைக் கடந்து சூரியனின் வெப்பம் பூமியை அடைவது எவ்வாறு?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: 'Thermal radiation (infrared electromagnetic waves)', ta: 'வெப்பக் கதிர்வீச்சு (மின்காந்த அலைகள்)' },
          isCorrect: true,
          explanation: {
            en: 'Radiation is the only mode of heat transfer that requires no matter medium.',
            ta: 'கதிர்வீச்சு மட்டுமே ஊடகம் எதுவும் தேவையின்றி வெற்றிடத்திலும் வெப்பத்தைக் கடத்தும்.',
          },
        },
        {
          id: 'opt-2',
          text: { en: 'Convection currents in space gas', ta: 'விண்வெளி வாயுவில் ஏற்படும் வெப்பச் சலனம்' },
          isCorrect: false,
          explanation: {
            en: 'Space is an extreme vacuum with no fluid to carry convection currents.',
            ta: 'விண்வெளியில் வெப்பச் சலனம் ஏற்பட தேவையான அளவு திரவமோ வாயுவோ இல்லை.',
          },
        },
        {
          id: 'opt-3',
          text: { en: 'Direct atomic conduction along magnetic lines', ta: 'காந்தக் கோடுகளின் வழியே நேரடிக் கடத்தல்' },
          isCorrect: false,
          explanation: {
            en: 'Conduction requires physical particle contact, impossible across space.',
            ta: 'கடத்தலுக்கு துகள்களின் நேரடித் தொடர்பு தேவை.',
          },
        },
        {
          id: 'opt-4',
          text: { en: 'Gravitational friction compression', ta: 'ஈர்ப்பு உராய்வு அழுத்தம்' },
          isCorrect: false,
          explanation: {
            en: 'Gravity does not directly transmit heat.',
            ta: 'ஈர்ப்பு விசை நேரடியாக வெப்பத்தை கடத்துவதில்லை.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'Conduction touches, Convection flows, Radiation beams through space.',
      ta: 'கடத்தல் தொடும், சலனம் பாயும், கதிர்வீச்சு வெற்றிடத்திலும் வீசும்.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=foundation&subjectId=physics&pathwayId=phy-f-3',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'Heat Always Flows Hot to Cold', ta: 'வெப்பம் சூடான இடத்திலிருந்து குளிரான இடத்திற்குப் பாயும்' },
        content: {
          en: 'Thermal energy naturally flows from regions of higher temperature to regions of lower temperature until thermal equilibrium is achieved.',
          ta: 'வெப்ப ஆற்றல் எப்போதும் அதிக வெப்பநிலையிலுள்ள பகுதியிலிருந்து குறைந்த வெப்பநிலையிலுள்ள பகுதிக்கு தானாகவே பாய்கிறது.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'heat_transfer',
        visualCaption: {
          en: 'Conduction in pan handle, Convection in boiling soup, Radiation from stove flames.',
          ta: 'பாத்திரக் கைப்பிடியில் கடத்தல், கொதிக்கும் நீரில் சலனம், அடுப்புத் தீயில் கதிர்வீச்சு.',
        },
        content: {
          en: 'A cooking pot shows all three methods simultaneously.',
          ta: 'ஒரு சமையல் பாத்திரத்தில் இந்த மூன்று முறைகளும் ஒரே நேரத்தில் நிகழ்வதைக் காணலாம்.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'Metals conduct heat rapidly because free electrons carry thermal energy fast.',
          ta: 'உலோகங்களில் உள்ள கட்டுறா எலக்ட்ரான்கள் வெப்பத்தை மிக வேகமாக கடத்துகின்றன.',
        },
        rememberStatement: {
          en: 'Heat travels by solids touching (conduction), fluids circulating (convection), or infrared waves (radiation).',
          ta: 'வெப்பம் திடப்பொருளில் கடத்தலாகவும், திரவத்தில் சலனமாகவும், அலைகளாக கதிர்வீச்சாகவும் பரவுகிறது.',
        },
      },
    ],
  },

  // ==========================================
  // CHEMISTRY (6 Lessons)
  // ==========================================
  {
    id: 'micro-states-of-matter',
    title: { en: 'States of Matter & Phase Changes', ta: 'பொருட்களின் நிலைகளும் நிலை மாற்றங்களும்' },
    subtitle: { en: 'Solids, Liquids, Gases & Kinetic Energy', ta: 'திடம், திரவம், வாயு மற்றும் இயக்க ஆற்றல்' },
    description: {
      en: 'Learn how temperature changes atomic spacing and motion to melt ice, boil water, and freeze liquids.',
      ta: 'வெப்பநிலை மாறும்போது மூலக்கூறுகளின் இயக்கம் மாறி பனிக்கட்டி உருகி ஆவியாகும் விதத்தை அறியவும்.',
    },
    subject: 'chemistry',
    category: 'Physical Chemistry',
    gradeRange: 'Grades 6–7',
    gradeGroup: 'junior',
    durationMinutes: 2,
    difficulty: 'easy',
    icon: '🧊',
    visualType: 'states_of_matter',
    keyPoints: [
      {
        en: 'Solids have fixed shape and volume; particles vibrate in locked lattice positions.',
        ta: 'திடப்பொருட்கள் நிலையான வடிவமும் பருமனும் கொண்டவை; துகள்கள் நெருக்கமாக பிணைக்கப்பட்டுள்ளன.',
      },
      {
        en: 'Liquids have fixed volume but take the shape of their container; particles slide past each other.',
        ta: 'திரவங்கள் நிலையான பருமன் கொண்டவை ஆனால் வடிவமில்லை; துகள்கள் ஒன்றையொன்று சறுக்கி நகரும்.',
      },
      {
        en: 'Gases have neither fixed shape nor fixed volume; particles fly freely with high kinetic energy.',
        ta: 'வாயுக்களுக்கு நிலையான வடிவமோ பருமனோ இல்லை; துகள்கள் அதிக ஆற்றலுடன் வேகமாக விரிகின்றன.',
      },
    ],
    quickCheck: {
      question: {
        en: 'What happens to water molecules when liquid water freezes into solid ice?',
        ta: 'நீர் உறைந்து பனிக்கட்டியாக மாறும்போது நீர் மூலக்கூறுகள் என்னவாகின்றன?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: 'They lose kinetic energy and lock into an open hexagonal crystalline framework', ta: 'இயக்க ஆற்றலை இழந்து அறுங்கோண படிக அமைப்பில் நிலையாக அமைகின்றன' },
          isCorrect: true,
          explanation: {
            en: 'Freezing removes kinetic energy, allowing hydrogen bonds to lock into a rigid crystal structure.',
            ta: 'குளிர்வித்தல் இயக்க ஆற்றலைக் குறைத்து ஹைட்ரஜன் பிணைப்புகள் மூலம் படிக அமைப்பை உண்டாக்குகிறது.',
          },
        },
        {
          id: 'opt-2',
          text: { en: 'The molecules split apart into separate hydrogen and oxygen gases', ta: 'மூலக்கூறுகள் ஹைட்ரஜன் மற்றும் ஆக்சிஜன் வாயுக்களாக பிரிகின்றன' },
          isCorrect: false,
          explanation: {
            en: 'Freezing is a physical change, not a chemical decomposition.',
            ta: 'உறைதல் என்பது ஒரு இயற்பியல் மாற்றம், வேதியியல் சிதைவு அல்ல.',
          },
        },
        {
          id: 'opt-3',
          text: { en: 'The individual molecules shrink to half their original size', ta: 'மூலக்கூறுகள் பாதியாக சுருங்கிவிடுகின்றன' },
          isCorrect: false,
          explanation: {
            en: 'Molecule size stays constant; only the spacing and arrangement change.',
            ta: 'மூலக்கூறுகளின் அளவு மாறுவதில்லை; அவற்றின் இடைவெளியே மாறுகிறது.',
          },
        },
        {
          id: 'opt-4',
          text: { en: 'Their mass decreases by 10 percent', ta: 'அவற்றின் நிறை 10 சதவீதம் குறைகிறது' },
          isCorrect: false,
          explanation: {
            en: 'Mass is conserved across all physical phase transitions.',
            ta: 'நிலை மாற்றத்தின் போது நிறை எப்போதும் மாறுவதில்லை.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'Phase changes alter spacing and motion, not chemical identity: ice, water, and steam are all H2O.',
      ta: 'நிலை மாற்றம் என்பது இடைவெளியின் மாற்றமே தவிர மூலக்கூறின் மாற்றம் அல்ல: பனி, நீர், நீராவி அனைத்தும் H2O தான்.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=foundation&subjectId=chemistry&pathwayId=chem-f-1',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'Kinetic Theory of Matter', ta: 'பருப்பொருளின் இயக்கக் கோட்பாடு' },
        content: {
          en: 'All matter is made of constantly moving particles. Temperature is simply a measurement of the average kinetic energy of these particles.',
          ta: 'அனைத்து பருப்பொருட்களும் எப்போதும் இயங்கிக் கொண்டிருக்கும் துகள்களால் ஆனவை. வெப்பநிலை என்பது அவற்றின் சராசரி இயக்க ஆற்றலாகும்.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'states_of_matter',
        visualCaption: {
          en: 'Solid (tightly packed) → Liquid (flowing) → Gas (widely scattered).',
          ta: 'திடம் (நெருக்கமானது) → திரவம் (பாயக்கூடியது) → வாயு (பரந்து விரிந்தது).',
        },
        content: {
          en: 'Adding heat adds energy, breaking attractive bonds and moving particles farther apart.',
          ta: 'வெப்பத்தை சேர்க்கும்போது துகள்கள் ஆற்றல் பெற்று பிணைப்புகளை உடைத்து விலகிச் செல்கின்றன.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'Sublimation is when a solid turns directly into a gas without becoming a liquid (e.g. dry ice).',
          ta: 'ஒரு திடப்பொருள் திரவமாகாமல் நேரடியாக வாயுவாக மாறுவது பதங்கமாதல் எனப்படும் (எ.கா. உலர் பனிக்கட்டி).',
        },
        rememberStatement: {
          en: 'Adding thermal energy turns solids to liquids (melting) and liquids to gases (boiling).',
          ta: 'வெப்பம் சேர்க்கும்போது திடப்பொருள் திரவமாகவும், திரவம் வாயுவாகவும் மாறுகிறது.',
        },
      },
    ],
  },
  {
    id: 'micro-atomic-structure',
    title: { en: 'Atoms & Subatomic Particles', ta: 'அணுக்களும் அதன் உள் துகள்களும்' },
    subtitle: { en: 'Protons, Neutrons & Electrons', ta: 'புரோட்டான்கள், நியூட்ரான்கள், எலக்ட்ரான்கள்' },
    description: {
      en: 'Explore the building blocks of the universe: positive nucleus surrounded by negative electron clouds.',
      ta: 'அண்டத்தின் அடிப்படை கட்டமைப்பு: நேர்மின் கருவும் அதைச் சுற்றும் எதிர்மின் எலக்ட்ரான்களும்.',
    },
    subject: 'chemistry',
    category: 'Inorganic Chemistry',
    gradeRange: 'Grades 8–10',
    gradeGroup: 'secondary',
    durationMinutes: 2,
    difficulty: 'easy',
    icon: '⚛️',
    visualType: 'atom_structure',
    keyPoints: [
      {
        en: 'Protons (+ charge) and Neutrons (neutral) form the dense central nucleus.',
        ta: 'புரோட்டான்களும் (+ மின்சுமை) நியூட்ரான்களும் (மின்சுமையற்றவை) அணுக்கருவில் உள்ளன.',
      },
      {
        en: 'Electrons (- charge) orbit the nucleus in defined energy shells.',
        ta: 'எலக்ட்ரான்கள் (- மின்சுமை) அணுக்கருவை வட்டப் பாதைகளில் சுற்றி வருகின்றன.',
      },
      {
        en: 'An atom is mostly empty space: if the nucleus were a marble, the atom would be a football stadium.',
        ta: 'அணுவின் பெரும்பாலான பகுதி வெற்றிடமே: அணுக்கரு ஒரு நெல்லிக்காய் என்றால், அணு ஒரு விளையாட்டு மைதானம்.',
      },
    ],
    quickCheck: {
      question: {
        en: 'Which subatomic particle determines the chemical element identity (atomic number Z) of an atom?',
        ta: 'ஓர் அணு எந்த தனிமத்தைச் சார்ந்தது (அணு எண் Z) என்பதைத் தீர்மானிக்கும் துகள் எது?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: 'Number of protons', ta: 'புரோட்டான்களின் எண்ணிக்கை' },
          isCorrect: true,
          explanation: {
            en: 'The number of protons in the nucleus defines the atomic number and element (e.g. 6 protons = Carbon).',
            ta: 'அணுக்கருவில் உள்ள புரோட்டான்களின் எண்ணிக்கையே அணு எண் ஆகும் (எ.கா. 6 புரோட்டான்கள் = கார்பன்).',
          },
        },
        {
          id: 'opt-2',
          text: { en: 'Number of valence electrons', ta: 'இணைதிறன் எலக்ட்ரான்கள்' },
          isCorrect: false,
          explanation: {
            en: 'Electrons change during chemical bonding and ionization without changing the element.',
            ta: 'எலக்ட்ரான்கள் பிணைப்பின் போது மாறலாம், ஆனால் தனிமத்தின் அடையாளம் மாறாது.',
          },
        },
        {
          id: 'opt-3',
          text: { en: 'Total neutrons only', ta: 'நியூட்ரான்களின் எண்ணிக்கை மட்டுமே' },
          isCorrect: false,
          explanation: {
            en: 'Neutrons create isotopes of the same element, not different elements.',
            ta: 'நியூட்ரான்கள் மாறுபட்டால் ஐசோடோப்புகள் உருவாகும், தனிமம் மாறாது.',
          },
        },
        {
          id: 'opt-4',
          text: { en: 'Total mass in grams', ta: 'மொத்த நிறை கிராம்பில்' },
          isCorrect: false,
          explanation: {
            en: 'Mass number includes neutrons; only proton count uniquely defines the element.',
            ta: 'புரோட்டான் எண்ணிக்கை மட்டுமே தனிமத்தை தனித்துவமாக வரையறுக்கிறது.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'Protons identify the element, neutrons stabilize the core, electrons drive chemical reactions.',
      ta: 'புரோட்டான்கள் தனிமத்தை நிர்ணயிக்கின்றன, எலக்ட்ரான்கள் வேதிவினைகளை நடத்துகின்றன.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=core&subjectId=chemistry&pathwayId=chem-c-1',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'The Structure of an Atom', ta: 'அணுவின் கட்டமைப்பு' },
        content: {
          en: 'An atom is the smallest unit of an element that retains its chemical properties. It consists of a tiny dense nucleus surrounded by an electron cloud.',
          ta: 'தனிமத்தின் வேதியியல் பண்புகளைத் தக்கவைத்துக் கொள்ளும் மிகச்சிறிய துகளே அணுவாகும்.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'atom_structure',
        visualCaption: {
          en: 'Nucleus = Protons (+) & Neutrons (0); Outer shells = Electrons (-).',
          ta: 'அணுக்கரு = புரோட்டான் (+) & நியூட்ரான் (0); வெளிக்கூடுகள் = எலக்ட்ரான் (-).',
        },
        content: {
          en: 'Neutral atoms have equal numbers of protons and electrons, so overall net electric charge is zero.',
          ta: 'நடுநிலையான அணுவில் புரோட்டான்களும் எலக்ட்ரான்களும் சம எண்ணிக்கையில் இருப்பதால் மொத்த மின்சுமை சுழியாகும்.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'Electrons are 1,836 times lighter than protons, so nearly all atomic mass resides in the nucleus.',
          ta: 'எலக்ட்ரான்கள் புரோட்டானை விட 1,836 மடங்கு குறைந்த நிறையுடையவை; அணுவின் மொத்த நிறையும் கருவிலேயே உள்ளது.',
        },
        rememberStatement: {
          en: 'Atomic Number = number of protons; Mass Number = protons + neutrons.',
          ta: 'அணு எண் = புரோட்டான்களின் எண்ணிக்கை; நிறை எண் = புரோட்டான்கள் + நியூட்ரான்கள்.',
        },
      },
    ],
  },
  {
    id: 'micro-acids-bases-ph',
    title: { en: 'Acids, Bases & The pH Scale', ta: 'அமிலங்கள், காரங்கள் மற்றும் pH அளவீடு' },
    subtitle: { en: 'H+ vs OH- and Litmus Color Changes', ta: 'H+ மற்றும் OH- அயனிகள், லிட்மஸ் தாள் மாற்றம்' },
    description: {
      en: 'Discover why lemon juice tastes sour, soap feels slippery, and how pH measures acidity from 0 to 14.',
      ta: 'எலுமிச்சை புளிப்பதன் காரணத்தையும், சோப்பு வழுவழுப்புத் தன்மையையும், pH அளவீட்டையும் அறியவும்.',
    },
    subject: 'chemistry',
    category: 'Inorganic Chemistry',
    gradeRange: 'Grades 6–7',
    gradeGroup: 'junior',
    durationMinutes: 2,
    difficulty: 'easy',
    icon: '🍋',
    visualType: 'ph_scale',
    keyPoints: [
      {
        en: 'Acids taste sour, produce H+ hydrogen ions, and have pH values less than 7.',
        ta: 'அமிலங்கள் புளிப்புச் சுவை கொண்டவை, H+ அயனிகளைத் தருகின்றன, pH மதிப்பு 7-க்கும் குறைவு.',
      },
      {
        en: 'Bases taste bitter, feel slippery, produce OH- hydroxide ions, and have pH greater than 7.',
        ta: 'காரங்கள் கசப்புச் சுவையும் வழுவழுப்பும் கொண்டவை, OH- அயனிகளைத் தருகின்றன, pH 7-க்கும் அதிகம்.',
      },
      {
        en: 'Pure neutral water has a pH of exactly 7.0 at 25°C.',
        ta: 'தூய நீர் நடுநிலையானது; அதன் pH மதிப்பு சரியாக 7.0 ஆகும்.',
      },
    ],
    quickCheck: {
      question: {
        en: 'What color does blue litmus paper turn when dipped into lemon juice (citric acid)?',
        ta: 'எலுமிச்சைச் சாற்றில் (சிட்ரிக் அமிலம்) நீல லிட்மஸ் தாளை நனைத்தால் அது என்ன நிறமாக மாறும்?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: 'Red', ta: 'சிவப்பு' },
          isCorrect: true,
          explanation: {
            en: 'Acids turn blue litmus red. (Memory trick: Acid turns litmus Red like danger).',
            ta: 'அமிலங்கள் நீல லிட்மஸ் தாளை சிவப்பாக மாற்றுகின்றன.',
          },
        },
        {
          id: 'opt-2',
          text: { en: 'Deep blue', ta: 'அடர்ந்த நீலம்' },
          isCorrect: false,
          explanation: {
            en: 'Bases turn red litmus blue; acids turn blue litmus red.',
            ta: 'காரங்கள் தான் சிவப்பு லிட்மஸை நீலமாக மாற்றும்.',
          },
        },
        {
          id: 'opt-3',
          text: { en: 'Bright green', ta: 'பச்சை' },
          isCorrect: false,
          explanation: {
            en: 'Green indicates neutral pH in universal indicator, not in litmus paper.',
            ta: 'பச்சை என்பது பொது நிறங்காட்டியின் நடுநிலை நிறம்.',
          },
        },
        {
          id: 'opt-4',
          text: { en: 'Colorless', ta: 'நிறமற்றது' },
          isCorrect: false,
          explanation: {
            en: 'Litmus paper changes pigment color, it does not bleach colorless.',
            ta: 'லிட்மஸ் தாள் நிறமற்றதாக மாறாது.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'Acids release H+ (pH < 7, blue to red), Bases release OH- (pH > 7, red to blue).',
      ta: 'அமிலம் H+ தரும் (pH < 7, நீலம் சிவப்பாகும்), காரம் OH- தரும் (pH > 7, சிவப்பு நீலமாகும்).',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=foundation&subjectId=chemistry&pathwayId=chem-f-2',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'What Makes Something Acidic or Basic?', ta: 'அமில காரத்தன்மைக்குக் காரணம் என்ன?' },
        content: {
          en: 'In aqueous solution, acids donate hydrogen ions (H+), while bases produce hydroxide ions (OH-). When mixed in equal amounts, they neutralize into salt and water.',
          ta: 'நீரில் கரையும் போது அமிலங்கள் H+ அயனிகளையும், காரங்கள் OH- அயனிகளையும் தருகின்றன. இரண்டும் சேரும்போது உப்பையும் நீரையும் உருவாக்குகின்றன.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'ph_scale',
        visualCaption: {
          en: '0 (Battery Acid) → 7 (Pure Water) → 14 (Bleach / Lye).',
          ta: '0 (கடுமையான அமிலம்) → 7 (தூய நீர்) → 14 (கடுமையான காரம்).',
        },
        content: {
          en: 'The pH scale is logarithmic: each step represents a 10-fold change in acidity.',
          ta: 'pH அளவுகோல் மடக்கை அடிப்படையிலானது: ஒவ்வொரு எண்ணும் 10 மடங்கு மாற்றத்தைக் குறிக்கும்.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'Antacid tablets are mild bases that neutralize excess hydrochloric acid in an upset stomach.',
          ta: 'அமில நீக்கி மாத்திரைகள் காரத்தன்மை கொண்டவை; அவை வயிற்றில் சுரக்கும் அதிகப்படியான அமிலத்தை சமன் செய்கின்றன.',
        },
        rememberStatement: {
          en: 'Acid + Base → Salt + Water (Neutralization reaction).',
          ta: 'அமிலம் + காரம் → உப்பு + நீர் (நடுநிலையாக்கல் வினை).',
        },
      },
    ],
  },
  {
    id: 'micro-chemical-reactions',
    title: { en: 'Chemical Reactions & Rusting', ta: 'வேதிவினைகளும் துருப்பிடித்தலும்' },
    subtitle: { en: 'Reactants, Products & Oxidation', ta: 'வினைபடு பொருட்கள், வினைவிளை பொருட்கள் மற்றும் ஆக்சிஜனேற்றம்' },
    description: {
      en: 'Learn how bonds break and reform to create brand new substances, and why iron turns to orange rust.',
      ta: 'பழைய பிணைப்புகள் உடைந்து புதிய பொருட்கள் உருவாகும் விதத்தையும் இரும்பு துருப்பிடிப்பதையும் அறியவும்.',
    },
    subject: 'chemistry',
    category: 'Chemical Reactions',
    gradeRange: 'Grades 8–10',
    gradeGroup: 'secondary',
    durationMinutes: 2,
    difficulty: 'medium',
    icon: '⚗️',
    visualType: 'chemical_reaction',
    keyPoints: [
      {
        en: 'A chemical reaction rearranges atoms into new substances without creating or destroying atoms.',
        ta: 'வேதிவினையில் அணுக்கள் மறுசீரமைக்கப்பட்டு புதிய பொருட்கள் உருவாகின்றன; அணுக்கள் தோன்றுவதுமில்லை அழிவதுமில்லை.',
      },
      {
        en: 'Signs of reaction include color change, gas bubbles, temperature change, or precipitate formation.',
        ta: 'நிற மாற்றம், வாயு குமிழ்கள், வெப்பநிலை மாற்றம் அல்லது வீழ்படிவு ஆகியவை வேதிவினையின் அறிகுறிகள்.',
      },
      {
        en: 'Rusting of iron requires BOTH water and oxygen to form hydrated iron oxide.',
        ta: 'இரும்பு துருப்பிடிக்க நீரும் ஆக்சிஜனும் இரண்டுமே அவசியமாகும்.',
      },
    ],
    quickCheck: {
      question: {
        en: 'Which two environmental substances MUST both be present for iron nails to rust?',
        ta: 'இரும்பு ஆணி துருப்பிடிக்க கட்டாயம் ஒன்றாக இருக்க வேண்டிய இரண்டு காரணிகள் எவை?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: 'Oxygen and water (moisture)', ta: 'ஆக்சிஜன் மற்றும் நீர் (ஈரப்பதம்)' },
          isCorrect: true,
          explanation: {
            en: 'Iron reacts with oxygen in the presence of water to form hydrated iron(III) oxide (rust).',
            ta: 'நீரின் முன்னிலையில் இரும்பு ஆக்சிஜனுடன் இணைந்து நீரேறிய இரும்பு ஆக்சைடை (துரு) உருவாக்குகிறது.',
          },
        },
        {
          id: 'opt-2',
          text: { en: 'Nitrogen gas and sunlight', ta: 'நைட்ரஜன் வாயு மற்றும் சூரிய ஒளி' },
          isCorrect: false,
          explanation: {
            en: 'Nitrogen is inert and does not react with iron at room temperature.',
            ta: 'நைட்ரஜன் அறை வெப்பநிலையில் இரும்புடன் வினைபுரியாது.',
          },
        },
        {
          id: 'opt-3',
          text: { en: 'Carbon dioxide and dry air', ta: 'கார்பன் டை ஆக்சைடு மற்றும் உலர் காற்று' },
          isCorrect: false,
          explanation: {
            en: 'Dry air contains oxygen, but without moisture, iron cannot rust.',
            ta: 'ஈரப்பதம் இல்லாவிட்டால் உலர் காற்றில் இரும்பு துருப்பிடிக்காது.',
          },
        },
        {
          id: 'opt-4',
          text: { en: 'Pure boiled water with an oil seal', ta: 'எண்ணெய் படலம் கொண்ட கொதிக்க வைத்த நீர்' },
          isCorrect: false,
          explanation: {
            en: 'Boiling expels oxygen, and oil blocks air; iron does not rust in oxygen-free water.',
            ta: 'கொதிநீரில் ஆக்சிஜன் இருப்பதில்லை; எனவே ஆணி துருப்பிடிக்காது.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'Atoms are neither created nor destroyed; bonds simply break and reorganize.',
      ta: 'வேதிவினையில் அணுக்கள் உருவாக்கப்படுவதோ அழிக்கப்படுவதோ இல்லை; பிணைப்புகள் மறுசீரமைக்கப்படுகின்றன.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=core&subjectId=chemistry&pathwayId=chem-c-2',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'Law of Conservation of Mass', ta: 'பொருண்மை அழியா விதி' },
        content: {
          en: 'In every chemical reaction, total mass of reactants equals total mass of products. Atoms simply trade partners.',
          ta: 'எந்த ஒரு வேதிவினையிலும் வினைபடு பொருட்களின் மொத்த நிறையும் வினைவிளை பொருட்களின் மொத்த நிறையும் சமமாகும்.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'chemical_reaction',
        visualCaption: {
          en: '4Fe + 3O2 + 6H2O → 2Fe2O3·3H2O (Rust Formation).',
          ta: 'இரும்பு + ஆக்சிஜன் + நீர் → நீரேறிய இரும்பு ஆக்சைடு (துரு).',
        },
        content: {
          en: 'Rusting is an electrochemical oxidation reaction that slowly weakens bridges and vehicles.',
          ta: 'துருப்பிடித்தல் என்பது உலோகத்தை அரிக்கும் ஒரு மெதுவான ஆக்சிஜனேற்ற வினையாகும்.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'Galvanization coats iron with a thin protective layer of zinc to block oxygen and moisture.',
          ta: 'இரும்பு மீது துத்தநாகத்தை பூசுவது (நாகமுலாம் பூசுதல்) துருப்பிடித்தலைத் தடுக்கிறது.',
        },
        rememberStatement: {
          en: 'Rusting needs iron + oxygen + moisture: paint and zinc prevent it.',
          ta: 'துருப்பிடிக்க இரும்பு + ஆக்சிஜன் + நீர் தேவை: வண்ணம் பூசுதல் இதைத் தடுக்கும்.',
        },
      },
    ],
  },
  {
    id: 'micro-periodic-table',
    title: { en: 'Periodic Table & Elements', ta: 'தனிம வரிசை அட்டவணை' },
    subtitle: { en: 'Groups, Periods & Atomic Trends', ta: 'தொகுதிகள், தொடர்கள் மற்றும் தனிமங்களின் பண்புகள்' },
    description: {
      en: 'Discover how Mendeleev organized all 118 chemical elements by atomic patterns.',
      ta: 'மெண்டலீவ் 118 வேதியியல் தனிமங்களையும் அவற்றின் பண்புகளுக்கு ஏற்ப எவ்வாறு வரிசைப்படுத்தினார் என்பதை அறியவும்.',
    },
    subject: 'chemistry',
    category: 'Inorganic Chemistry',
    gradeRange: 'Grades 8–10',
    gradeGroup: 'secondary',
    durationMinutes: 2,
    difficulty: 'medium',
    icon: '📊',
    visualType: 'periodic_table',
    keyPoints: [
      {
        en: 'The periodic table arranges elements by increasing atomic number (number of protons).',
        ta: 'தனிம வரிசை அட்டவணை அணு எண்களின் ஏறுவரிசையில் தனிமங்களை வரிசைப்படுத்துகிறது.',
      },
      {
        en: 'Vertical columns are called Groups; elements in the same group have similar chemical properties.',
        ta: 'செங்குத்து வரிசைகள் தொகுதிகள் எனப்படும்; ஒரே தொகுதியிலுள்ள தனிமங்கள் ஒத்த வேதிப்பண்புகளைக் கொண்டுள்ளன.',
      },
      {
        en: 'Horizontal rows are called Periods, indicating how many electron energy shells are filled.',
        ta: 'கிடைமட்ட வரிசைகள் தொடர்கள் எனப்படும்; இவை எலக்ட்ரான் கூடுகளின் எண்ணிக்கையைக் குறிக்கின்றன.',
      },
    ],
    quickCheck: {
      question: {
        en: 'Why do elements in Group 18 (Noble Gases: Helium, Neon, Argon) almost never react chemically?',
        ta: 'தொகுதி 18 தனிமங்கள் (மந்த வாயுக்கள்: ஹீலியம், நியான், ஆர்கான்) வேதிவினைகளில் ஈடுபடாதது ஏன்?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: 'Their outermost valence electron shell is completely full and stable', ta: 'அவற்றின் வெளிப்புற எலக்ட்ரான் கூடு முழுமையாக நிரம்பி நிலைப்புத்தன்மை கொண்டுள்ளது' },
          isCorrect: true,
          explanation: {
            en: 'A full valence octet means the atom has no drive to gain, lose, or share electrons.',
            ta: 'வெளிக்கூட்டில் முழுமையான எலக்ட்ரான்கள் இருப்பதால் அவை எலக்ட்ரான்களை இழக்கவோ ஏற்கவோ விரும்புவதில்லை.',
          },
        },
        {
          id: 'opt-2',
          text: { en: 'They possess zero protons in their nuclei', ta: 'அவற்றின் அணுக்கருவில் புரோட்டான்களே இல்லை' },
          isCorrect: false,
          explanation: {
            en: 'All elements have protons; Neon has 10, Argon has 18.',
            ta: 'அனைத்து அணுக்களிலும் புரோட்டான்கள் உள்ளன.',
          },
        },
        {
          id: 'opt-3',
          text: { en: 'They only exist at absolute zero temperature', ta: 'அவை தனிச்சுழி வெப்பநிலையில் மட்டுமே இருக்கும்' },
          isCorrect: false,
          explanation: {
            en: 'Noble gases exist as stable room-temperature gases in atmospheric air.',
            ta: 'மந்த வாயுக்கள் காற்றில் அறை வெப்பநிலையிலும் வாயுவாகவே உள்ளன.',
          },
        },
        {
          id: 'opt-4',
          text: { en: 'Their nuclear charges repel all chemical bonds', ta: 'அவற்றின் கரு மின்சுமை பிணைப்புகளை விலக்குகிறது' },
          isCorrect: false,
          explanation: {
            en: 'Electronic stability, not nuclear repulsion, causes inertness.',
            ta: 'வெளிக்கூட்டு எலக்ட்ரான் நிலைப்புத்தன்மையே இதற்கு காரணம்.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'The periodic table is nature’s ingredient list, organized by valence electron patterns.',
      ta: 'தனிம வரிசை அட்டவணை என்பது இயற்கையின் மூலப்பொருள் பட்டியல் ஆகும்.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=core&subjectId=chemistry&pathwayId=chem-c-1',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'Organization of Elements', ta: 'தனிமங்களின் வரிசை அமைப்பு' },
        content: {
          en: 'Mendeleev left blank gaps in his original 1869 table, correctly predicting the exact mass and properties of undiscovered elements like Gallium.',
          ta: 'மெண்டலீவ் தனது அட்டவணையில் புதிய தனிமங்களுக்கான காலியிடங்களை விட்டு அவற்றின் பண்புகளையும் சரியாகக் கணித்தார்.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'periodic_table',
        visualCaption: {
          en: 'Metals on the left and center; Non-metals on the upper right; Noble gases in column 18.',
          ta: 'இடதுபுறம் உலோகங்கள்; வலதுபுறம் அலோகங்கள்; 18-ஆம் தொகுதியில் மந்த வாயுக்கள்.',
        },
        content: {
          en: 'Elements in the same column have the same number of outer valence electrons.',
          ta: 'ஒரே தொகுதியிலுள்ள தனிமங்கள் சம எண்ணிக்கையிலான இணைதிறன் எலக்ட்ரான்களைக் கொண்டுள்ளன.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'Hydrogen is the lightest element (Z=1); Oganesson is the heaviest known element (Z=118).',
          ta: 'ஹைட்ரஜன் மிக லேசான தனிமம் (Z=1); ஓகனேசன் மிகக் கனமான தனிமம் (Z=118).',
        },
        rememberStatement: {
          en: 'Group number tells valence electrons; period number tells electron shells.',
          ta: 'தொகுதி எண் வெளிக்கூட்டு எலக்ட்ரான்களையும், தொடர் எண் கூடுகளின் எண்ணிக்கையையும் குறிக்கும்.',
        },
      },
    ],
  },
  {
    id: 'micro-solutions-solvents',
    title: { en: 'Solutions, Solutes & Solvents', ta: 'கரைசல்கள், கரைபொருள் மற்றும் கரைப்பான்' },
    subtitle: { en: 'Dissolving & Saturation Limits', ta: 'கரைதல் மற்றும் தெவிட்டிய நிலை' },
    description: {
      en: 'Discover why water is called the universal solvent and what happens when tea can hold no more sugar.',
      ta: 'நீர் ஏன் சர்வ கரைப்பான் என்று அழைக்கப்படுகிறது என்பதையும் தெவிட்டிய கரைசலையும் அறியவும்.',
    },
    subject: 'chemistry',
    category: 'Solutions',
    gradeRange: 'Grades 6–7',
    gradeGroup: 'junior',
    durationMinutes: 2,
    difficulty: 'easy',
    icon: '🍵',
    visualType: 'solution_dissolve',
    keyPoints: [
      {
        en: 'A solute is dissolved into a solvent to form a homogeneous solution.',
        ta: 'கரைபொருள் கரைப்பானில் கரைந்து ஒருபடித்தான கரைசலை உருவாக்குகிறது.',
      },
      {
        en: 'Water is the universal solvent because its polar molecules pull ionic and polar substances apart.',
        ta: 'நீர் ஒரு முனைவு மூலக்கூறாக இருப்பதால் பெரும்பாலான பொருட்களைக் கரைக்கும் சர்வ கரைப்பானாகும்.',
      },
      {
        en: 'A saturated solution contains the maximum possible dissolved solute at a given temperature.',
        ta: 'ஒரு குறிப்பிட்ட வெப்பநிலையில் மேலும் கரைபொருளைக் கரைக்க முடியாத நிலையே தெவிட்டிய கரைசல் ஆகும்.',
      },
    ],
    quickCheck: {
      question: {
        en: 'In a cup of sweet milk with dissolved sugar, which component is the solute?',
        ta: 'சர்க்கரை கரைக்கப்பட்ட பாலில் எது கரைபொருள் ஆகும்?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: 'The sugar', ta: 'சர்க்கரை' },
          isCorrect: true,
          explanation: {
            en: 'The solute is the substance that gets dissolved; the liquid doing the dissolving is the solvent.',
            ta: 'கரையும் பொருளே கரைபொருள் (சர்க்கரை); கரைக்கும் திரவமே கரைப்பான் (பால்).',
          },
        },
        {
          id: 'opt-2',
          text: { en: 'The milk liquid', ta: 'பால் திரவம்' },
          isCorrect: false,
          explanation: {
            en: 'Milk is the solvent that dissolves the sugar crystals.',
            ta: 'பால் என்பது சர்க்கரையை கரைக்கும் கரைப்பான் ஆகும்.',
          },
        },
        {
          id: 'opt-3',
          text: { en: 'The spoon used for stirring', ta: 'கலக்கப் பயன்படும் கரண்டி' },
          isCorrect: false,
          explanation: {
            en: 'A spoon is an external mixing tool, not part of the chemical solution.',
            ta: 'கரண்டி ஒரு கருவி மட்டுமே.',
          },
        },
        {
          id: 'opt-4',
          text: { en: 'The ceramic cup', ta: 'கப் / குவளை' },
          isCorrect: false,
          explanation: {
            en: 'The cup is simply the container holding the mixture.',
            ta: 'குவளை ஒரு கொள்கலன் மட்டுமே.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'Solute dissolves in Solvent to make a Solution: Solute + Solvent = Solution.',
      ta: 'கரைபொருள் + கரைப்பான் = கரைசல்.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=foundation&subjectId=chemistry&pathwayId=chem-f-1',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'The Anatomy of a Solution', ta: 'கரைசலின் கூறுகள்' },
        content: {
          en: 'When salt dissolves in water, salt crystals break into individual sodium (Na+) and chloride (Cl-) ions surrounded by water molecules. The salt seems to disappear, but it is evenly dispersed.',
          ta: 'உப்பு நீரில் கரையும் போது, உப்பின் மூலக்கூறுகள் பிரிந்து நீர் மூலக்கூறுகளுக்கு இடையில் சீராகப் பரவுகின்றன.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'solution_dissolve',
        visualCaption: {
          en: 'Solute (Salt/Sugar) + Solvent (Water) = Homogeneous Solution.',
          ta: 'கரைபொருள் + கரைப்பான் = ஒருபடித்தான கரைசல்.',
        },
        content: {
          en: 'Heating a liquid usually increases how much solid solute can dissolve before saturation.',
          ta: 'வெப்பநிலையை உயர்த்தும்போது வழக்கமாக அதிகளவு திட கரைபொருளைக் கரைக்க முடியும்.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'Dissolving is physical: evaporating the water recovers 100% of the original salt.',
          ta: 'கரைதல் ஒரு இயற்பியல் மாற்றம்: நீரை ஆவியாக்கினால் உப்பை முழுமையாக மீட்டெடுக்கலாம்.',
        },
        rememberStatement: {
          en: 'Solute is what dissolves; solvent is what does the dissolving.',
          ta: 'கரைபொருள் என்பது கரைவது; கரைப்பான் என்பது கரைப்பது.',
        },
      },
    ],
  },

  // ==========================================
  // BIOLOGY (6 Lessons)
  // ==========================================
  {
    id: 'micro-photosynthesis',
    title: { en: 'Photosynthesis: Solar Food Factory', ta: 'ஒளிச்சேர்க்கை: தாவரங்களின் உணவு தயாரிப்பு' },
    subtitle: { en: 'Chloroplasts, Sunlight & Glucose', ta: 'பசுங்கணிகம், சூரிய ஒளி மற்றும் குளுக்கோஸ்' },
    description: {
      en: 'Understand how green plants convert sunlight, carbon dioxide, and water into food and oxygen.',
      ta: 'தாவரங்கள் சூரிய ஒளி, கார்பன் டை ஆக்சைடு மற்றும் நீரைக் கொண்டு உணவையும் ஆக்சிஜனையும் தயாரிக்கும் முறையை அறியவும்.',
    },
    subject: 'biology',
    category: 'Plant Biology',
    gradeRange: 'Grades 6–7',
    gradeGroup: 'junior',
    durationMinutes: 2,
    difficulty: 'easy',
    icon: '🌱',
    visualType: 'photosynthesis',
    keyPoints: [
      {
        en: 'Chlorophyll in leaf chloroplasts traps red and blue light energy from the sun.',
        ta: 'இலைகளின் பசுங்கணிகத்தில் உள்ள பச்சையம் சூரிய ஒளியை உறிஞ்சுகிறது.',
      },
      {
        en: 'Chemical Equation: 6CO2 + 6H2O + Light → C6H12O6 (glucose) + 6O2 (oxygen).',
        ta: 'சமன்பாடு: 6CO2 + 6H2O + ஒளி → C6H12O6 (குளுக்கோஸ்) + 6O2 (ஆக்சிஜன்).',
      },
      {
        en: 'Oxygen released into the atmosphere is a vital byproduct of this reaction.',
        ta: 'நாம் சுவாசிக்கும் ஆக்சிஜன் ஒளிச்சேர்க்கையின் போது வெளிப்படும் முக்கிய துணை விளைபொருளாகும்.',
      },
    ],
    quickCheck: {
      question: {
        en: 'What vital gas do plants take IN from the air to perform photosynthesis?',
        ta: 'ஒளிச்சேர்க்கை செய்ய தாவரங்கள் காற்றில் இருந்து உறிஞ்சும் வாயு எது?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: 'Carbon dioxide (CO2)', ta: 'கார்பன் டை ஆக்சைடு (CO2)' },
          isCorrect: true,
          explanation: {
            en: 'Plants absorb atmospheric CO2 through microscopic leaf pores called stomata.',
            ta: 'தாவரங்கள் இலைத்துளைகள் (ஸ்டோமேட்டா) வழியாக கார்பன் டை ஆக்சைடை உறிஞ்சுகின்றன.',
          },
        },
        {
          id: 'opt-2',
          text: { en: 'Pure nitrogen gas (N2)', ta: 'நைட்ரஜன் வாயு (N2)' },
          isCorrect: false,
          explanation: {
            en: 'Plants absorb nitrogen through soil roots as nitrates, not as atmospheric gas for photosynthesis.',
            ta: 'நைட்ரஜனை தாவரங்கள் வேர்கள் மூலம் நைட்ரேட்டாக உறிஞ்சுகின்றன.',
          },
        },
        {
          id: 'opt-3',
          text: { en: 'Helium gas', ta: 'ஹீலியம் வாயு' },
          isCorrect: false,
          explanation: {
            en: 'Helium is an inert noble gas with zero biological function.',
            ta: 'ஹீலியம் தாவரங்களால் பயன்படுத்தப்படுவதில்லை.',
          },
        },
        {
          id: 'opt-4',
          text: { en: 'Methane gas', ta: 'மீத்தேன் வாயு' },
          isCorrect: false,
          explanation: {
            en: 'Methane is a hydrocarbon fuel, not a photosynthetic reactant.',
            ta: 'மீத்தேன் ஒளிச்சேர்க்கைக்குத் தேவையில்லை.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'Sunlight + Water + CO2 → Glucose Food + Oxygen Breath.',
      ta: 'சூரிய ஒளி + நீர் + கார்பன் டை ஆக்சைடு → குளுக்கோஸ் + ஆக்சிஜன்.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=foundation&subjectId=biology&pathwayId=bio-f-2',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'Earth’s Solar Powered Engine', ta: 'பூமியின் சூரிய ஆற்றல் இயந்திரம்' },
        content: {
          en: 'Nearly all life on Earth depends on photosynthesis. Plants, algae, and cyanobacteria capture photon energy and convert it into stable chemical bonds.',
          ta: 'பூமியின் பெரும்பாலான உயிர்கள் ஒளிச்சேர்க்கையையே சார்ந்துள்ளன. தாவரங்கள் சூரிய ஒளியை வேதி ஆற்றலாக மாற்றுகின்றன.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'photosynthesis',
        visualCaption: {
          en: 'Inputs: Light + CO2 (air) + H2O (roots). Outputs: Glucose (stored food) + O2 (air).',
          ta: 'உள்ளீடுகள்: ஒளி + CO2 + நீர். வெளியீடுகள்: குளுக்கோஸ் உணவு + ஆக்சிஜன்.',
        },
        content: {
          en: 'Leaves appear green because chlorophyll reflects green wavelengths while absorbing blue and red light.',
          ta: 'பச்சையம் நீலம் மற்றும் சிவப்பு ஒளியை உறிஞ்சி, பச்சை ஒளியை எதிரொளிப்பதால் இலைகள் பச்சையாகத் தெரிகின்றன.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'At night, photosynthesis halts, but plant cellular respiration continues 24/7.',
          ta: 'இரவில் ஒளிச்சேர்க்கை நின்றுவிடும், ஆனால் தாவரங்களின் சுவாசம் 24 மணி நேரமும் தொடரும்.',
        },
        rememberStatement: {
          en: 'Plants feed the world and clean the air through photosynthesis.',
          ta: 'ஒளிச்சேர்க்கை மூலம் தாவரங்கள் உலகிற்கு உணவளித்து காற்றைத் தூய்மைப்படுத்துகின்றன.',
        },
      },
    ],
  },
  {
    id: 'micro-cell-structure',
    title: { en: 'Cell Structure & Organelles', ta: 'செல்லின் அமைப்பும் நுண்ணுறுப்புகளும்' },
    subtitle: { en: 'Nucleus, Mitochondria & Membranes', ta: 'உட்கரு, மைட்டோகாண்ட்ரியா மற்றும் சவ்வுகள்' },
    description: {
      en: 'Tour the microscopic city inside every living cell: power plants, control centers, and protective walls.',
      ta: 'உயிரணுவின் வியத்தகு உள் உலகம்: கட்டுப்பாட்டு மையம், ஆற்றல் நிலையம் மற்றும் பாதுகாப்பு சுவர்.',
    },
    subject: 'biology',
    category: 'Cell Biology',
    gradeRange: 'Grades 8–10',
    gradeGroup: 'secondary',
    durationMinutes: 2,
    difficulty: 'easy',
    icon: '🔬',
    visualType: 'cell_structure',
    keyPoints: [
      {
        en: 'The cell is the basic structural and functional unit of all living organisms.',
        ta: 'உயிரினங்களின் அடிப்படை கட்டமைப்பு மற்றும் செயல்பாட்டு அலகு செல்லாகும்.',
      },
      {
        en: 'The Nucleus contains chromosomes and DNA, directing all cell activities.',
        ta: 'உட்கரு (நியூக்ளியஸ்) DNA-வை கொண்டு செல்லின் அனைத்து பணிகளையும் கட்டுப்படுத்துகிறது.',
      },
      {
        en: 'Mitochondria are the "powerhouses" producing ATP energy through cellular respiration.',
        ta: 'மைட்டோகாண்ட்ரியா ஆற்றல் நாணயமான ATP-ஐ உருவாக்குவதால் "செல்லின் ஆற்றல் நிலையம்" எனப்படுகிறது.',
      },
    ],
    quickCheck: {
      question: {
        en: 'Which organelle is known as the "powerhouse of the cell" for generating ATP energy?',
        ta: 'ATP ஆற்றலை உற்பத்தி செய்வதால் "செல்லின் ஆற்றல் நிலையம்" என அழைக்கப்படும் நுண்ணுறுப்பு எது?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: 'Mitochondria', ta: 'மைட்டோகாண்ட்ரியா' },
          isCorrect: true,
          explanation: {
            en: 'Mitochondria break down glucose to generate ATP, the universal cellular energy currency.',
            ta: 'மைட்டோகாண்ட்ரியாக்கள் குளுக்கோஸை ஆக்சிஜனேற்றி செல்களுக்குத் தேவையான ATP ஆற்றலைத் தருகின்றன.',
          },
        },
        {
          id: 'opt-2',
          text: { en: 'Ribosome', ta: 'ரைபோசோம்' },
          isCorrect: false,
          explanation: {
            en: 'Ribosomes synthesize proteins, not ATP energy.',
            ta: 'ரைபோசோம்கள் புரத உற்பத்தியில் ஈடுபடுகின்றன.',
          },
        },
        {
          id: 'opt-3',
          text: { en: 'Golgi apparatus', ta: 'கோல்கி உறுப்பு' },
          isCorrect: false,
          explanation: {
            en: 'The Golgi apparatus packages and ships cellular proteins.',
            ta: 'கோல்கி உடலங்கள் புரதங்களை பேக்கிங் செய்து அனுப்புகின்றன.',
          },
        },
        {
          id: 'opt-4',
          text: { en: 'Lysosome', ta: 'லைசோசோம்' },
          isCorrect: false,
          explanation: {
            en: 'Lysosomes contain digestive enzymes to break down cellular waste.',
            ta: 'லைசோசோம்கள் செல்லின் கழிவுகளை செரிக்க உதவும் தற்கொலை பைகள்.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'Nucleus = Brain, Mitochondria = Powerhouse, Cell Membrane = Security Guard.',
      ta: 'உட்கரு = மூளை, மைட்டோகாண்ட்ரியா = ஆற்றல் நிலையம், செல் சவ்வு = வாயிற்காப்போன்.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=core&subjectId=biology&pathwayId=bio-c-1',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'The Microscopic City', ta: 'நுண்ணிய நகரம்' },
        content: {
          en: 'A cell is like a bustling walled city. Special internal compartments called organelles carry out specialized tasks like energy generation, waste disposal, and protein building.',
          ta: 'ஒரு செல் என்பது இயங்கும் ஒரு சிறிய நகரம் போன்றது. நுண்ணுறுப்புகள் ஆற்றல் உற்பத்தி, கழிவு நீக்கம் போன்ற பணிகளைச் செய்கின்றன.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'cell_structure',
        visualCaption: {
          en: 'Plant cell features a rigid cell wall and chloroplasts; Animal cells have flexible membranes.',
          ta: 'தாவர செல்லில் செல் சுவரும் பசுங்கணிகமும் உண்டு; விலங்கு செல்லில் நெகிழ்வான சவ்வு மட்டுமே உண்டு.',
        },
        content: {
          en: 'Plant cells have two features animal cells lack: a rigid cellulose Cell Wall and Chloroplasts for photosynthesis.',
          ta: 'விலங்கு செல்களில் இல்லாத செல் சுவர் மற்றும் பசுங்கணிகம் தாவர செல்களில் மட்டுமே காணப்படும்.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'Your body contains roughly 37 trillion cells, all working in coordination.',
          ta: 'உங்கள் உடலில் சுமார் 37 டிரில்லியன் செல்கள் ஒருங்கிணைந்து செயல்படுகின்றன.',
        },
        rememberStatement: {
          en: 'Cells are the fundamental building blocks of all living things.',
          ta: 'அனைத்து உயிரினங்களின் அடிப்படை கட்டுமான அலகு செல்களே.',
        },
      },
    ],
  },
  {
    id: 'micro-dna-genetics',
    title: { en: 'DNA: The Secret Blueprint of Life', ta: 'DNA: உயிரினங்களின் வரைபடம்' },
    subtitle: { en: 'Double Helix & Genetic Code', ta: 'இரட்டை திருகுசுழல் மற்றும் மரபணு குறியீடு' },
    description: {
      en: 'Learn how four simple chemical bases (A, T, C, G) write the instructions for every living creature.',
      ta: 'நான்கு வேதி மூலக்கூறுகள் (A, T, C, G) உயிரினங்களின் அனைத்து குணங்களையும் தீர்மானிக்கும் விந்தையை அறியவும்.',
    },
    subject: 'biology',
    category: 'Genetics',
    gradeRange: 'Grades 8–10',
    gradeGroup: 'secondary',
    durationMinutes: 2,
    difficulty: 'medium',
    icon: '🧬',
    visualType: 'dna_helix',
    keyPoints: [
      {
        en: 'DNA (Deoxyribonucleic Acid) carries hereditary genetic instructions.',
        ta: 'DNA என்பது மரபுத் தகவல்களைத் தலைமுறை தலைமுறையாகக் கடத்தும் மூலக்கூறாகும்.',
      },
      {
        en: 'DNA forms a double helix twisted ladder discovered by Watson, Crick, and Franklin.',
        ta: 'DNA இரட்டை திருகுசுழல் ஏணி வடிவம் கொண்டது.',
      },
      {
        en: 'Base pairing rule: Adenine always pairs with Thymine (A-T); Cytosine pairs with Guanine (C-G).',
        ta: 'கார இணை விதி: அடினைன் எப்போது தைமினுடனும் (A-T), சைட்டோசின் குவானினுடனும் (C-G) இணையும்.',
      },
    ],
    quickCheck: {
      question: {
        en: 'In a DNA double helix, which nitrogenous base always bonds with Adenine (A)?',
        ta: 'DNA இரட்டை திருகுசுழலில் அடினைன் (A) உடன் எப்போதும் இணையும் காரம் எது?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: 'Thymine (T)', ta: 'தைமின் (T)' },
          isCorrect: true,
          explanation: {
            en: 'Adenine (A) always forms two hydrogen bonds with Thymine (T) in DNA.',
            ta: 'DNA-வில் அடினைன் எப்போதும் தைமினுடன் இரண்டு ஹைட்ரஜன் பிணைப்புகளால் இணைகிறது.',
          },
        },
        {
          id: 'opt-2',
          text: { en: 'Guanine (G)', ta: 'குவானின் (G)' },
          isCorrect: false,
          explanation: {
            en: 'Guanine bonds strictly with Cytosine (C), not Adenine.',
            ta: 'குவானின் சைட்டோசினுடன் மட்டுமே இணையும்.',
          },
        },
        {
          id: 'opt-3',
          text: { en: 'Cytosine (C)', ta: 'சைட்டோசின் (C)' },
          isCorrect: false,
          explanation: {
            en: 'Cytosine pairs with Guanine via three hydrogen bonds.',
            ta: 'சைட்டோசின் குவானினுடன் மூன்று பிணைப்புகளால் இணையும்.',
          },
        },
        {
          id: 'opt-4',
          text: { en: 'Uracil (U)', ta: 'யுராசில் (U)' },
          isCorrect: false,
          explanation: {
            en: 'Uracil replaces Thymine only in RNA, not in standard DNA.',
            ta: 'யுராசில் RNA-வில் மட்டுமே காணப்படும், DNA-வில் அல்ல.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'A pairs with T, C pairs with G: the language of life uses only four letters.',
      ta: 'A உடன் T, C உடன் G: உயிரின் மொழியில் நான்கே எழுத்துகள் மட்டுமே.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=core&subjectId=biology&pathwayId=bio-c-1',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'The Code of Life', ta: 'உயிரின் குறியீடு' },
        content: {
          en: 'DNA is coiled tightly inside the nucleus of almost every cell in your body. If unraveled, the DNA from a single human cell would measure roughly 2 meters long!',
          ta: 'ஒவ்வொரு செல்லின் உட்கருவிலும் DNA மிக நெருக்கமாக சுருட்டப்பட்டுள்ளது. ஒரு செல்லின் DNA-வை நீட்டினால் 2 மீட்டர் நீளம் இருக்கும்!',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'dna_helix',
        visualCaption: {
          en: 'Sugar-phosphate backbone (sides of ladder) + Nitrogenous base pairs (rungs of ladder).',
          ta: 'சர்க்கரை பாஸ்பேட் முதுகெலும்பு + நைட்ரஜன் கார இணைகள்.',
        },
        content: {
          en: 'The sequence of A, T, C, and G along the strand encodes instructions for building proteins.',
          ta: 'A, T, C, G வரிசையே உடலில் புரதங்களை உருவாக்க தேவையான தகவல்களைக் கொண்டுள்ளது.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'Humans share roughly 99.9% of their DNA sequence with every other human on Earth.',
          ta: 'பூமியில் உள்ள அனைத்து மனிதர்களும் 99.9% ஒரே மாதிரியான DNA வரிசையைக் கொண்டுள்ளனர்.',
        },
        rememberStatement: {
          en: 'DNA codes your physical traits and passes genetic heritage to future generations.',
          ta: 'DNA உங்கள் உடல் பண்புகளைத் தீர்மானித்து அடுத்த தலைமுறைக்குக் கடத்துகிறது.',
        },
      },
    ],
  },
  {
    id: 'micro-food-chains',
    title: { en: 'Ecosystem Food Chains & Trophic Levels', ta: 'உணவுச் சங்கிலியும் ஆற்றல் மட்டங்களும்' },
    subtitle: { en: 'Producers, Consumers & The 10% Energy Rule', ta: 'உற்பத்தியாளர்கள், நுகர்வோர்கள் மற்றும் 10% ஆற்றல் விதி' },
    description: {
      en: 'See how solar energy flows from grass to deer to tigers, and why top predators are so rare.',
      ta: 'புல்லில் இருந்து மான், புலி வரை ஆற்றல் பாய்வதையும், வேட்டையாடும் விலங்குகள் குறைவாக இருப்பதன் காரணத்தையும் அறியவும்.',
    },
    subject: 'biology',
    category: 'Ecology',
    gradeRange: 'Grades 6–7',
    gradeGroup: 'junior',
    durationMinutes: 2,
    difficulty: 'easy',
    icon: '🌿',
    visualType: 'food_chain',
    keyPoints: [
      {
        en: 'Producers (plants) capture sunlight to make food; Herbivores eat plants; Carnivores eat herbivores.',
        ta: 'உற்பத்தியாளர்கள் சூரிய ஒளியிலிருந்து உணவு தயாரிக்கின்றனர்; தாவர உண்ணிகள் அவற்றை உண்கின்றன.',
      },
      {
        en: 'The 10% Rule: Only about 10% of energy transfers from one trophic level up to the next.',
        ta: '10% விதி: ஓர் ஆற்றல் மட்டத்திலிருந்து அடுத்த மட்டத்திற்கு சுமார் 10% ஆற்றல் மட்டுமே கடத்தப்படுகிறது.',
      },
      {
        en: 'Decomposers (fungi and bacteria) recycle nutrients back into the soil.',
        ta: 'சிதைப்பவைகள் (காளான்கள், பாக்டீரியாக்கள்) ஊட்டச்சத்துக்களை மீண்டும் மண்ணில் சேர்க்கின்றன.',
      },
    ],
    quickCheck: {
      question: {
        en: 'If plants capture 10,000 Joules of solar energy, how much energy is available to secondary consumers (carnivores)?',
        ta: 'தாவரங்கள் 10,000 ஜூல் ஆற்றலைப் பெற்றால், இரண்டாம் நிலை நுகர்வோருக்கு (ஊன் உண்ணி) கிடைக்கும் ஆற்றல் எவ்வளவு?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: '100 Joules (10% of 1,000 J)', ta: '100 ஜூல் (1,000 ஜூலில் 10%)' },
          isCorrect: true,
          explanation: {
            en: 'Plants: 10,000 J → Herbivores: 1,000 J (10%) → Carnivores: 100 J (10% of 1,000 J).',
            ta: 'தாவரங்கள் 10,000 J → தாவர உண்ணி 1,000 J → ஊன் உண்ணி 100 J என 10% வீதம் குறைகிறது.',
          },
        },
        {
          id: 'opt-2',
          text: { en: '5,000 Joules', ta: '5,000 ஜூல்' },
          isCorrect: false,
          explanation: {
            en: '50% transfer never occurs; 90% of energy is lost as heat and metabolic maintenance.',
            ta: '90% ஆற்றல் வெப்பமாகவும் உடல் இயக்கத்திற்காகவும் செலவாகிறது.',
          },
        },
        {
          id: 'opt-3',
          text: { en: '10,000 Joules', ta: '10,000 ஜூல்' },
          isCorrect: false,
          explanation: {
            en: 'Energy cannot pass 100% across trophic levels without thermodynamic loss.',
            ta: 'ஆற்றல் முழுமையாக அடுத்த நிலைக்குச் செல்ல முடியாது.',
          },
        },
        {
          id: 'opt-4',
          text: { en: '1 Joule', ta: '1 ஜூல்' },
          isCorrect: false,
          explanation: {
            en: '1 Joule would be the tertiary apex predator level, not secondary.',
            ta: '1 ஜூல் என்பது மூன்றாம் நிலை வேட்டையாடிகளுக்கு மட்டுமே கிடைக்கும்.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'Energy flows one-way and diminishes by 90% at each step; nutrients cycle forever.',
      ta: 'ஆற்றல் ஒவ்வொரு நிலையிலும் 90% குறைகிறது; ஊட்டச்சத்துக்கள் சுழற்சியில் நீடிக்கின்றன.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=foundation&subjectId=biology&pathwayId=bio-f-1',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'The Energy Pyramid', ta: 'ஆற்றல் பிரமிடு' },
        content: {
          en: 'A food chain represents who eats whom in an ecosystem. Because 90% of energy is lost as heat at each step, food chains rarely exceed 4 or 5 links.',
          ta: 'உணவுச் சங்கிலி என்பது உயிரினங்களின் உணவுத் தொடர்பைக் காட்டுகிறது. ஒவ்வொரு நிலையிலும் 90% ஆற்றல் வீணாவதால் சங்கிலி 4-5 இணைப்புகளுக்கு மேல் நீள்வதில்லை.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'food_chain',
        visualCaption: {
          en: 'Sun → Grass (Producer) → Deer (Primary Consumer) → Tiger (Secondary Consumer).',
          ta: 'சூரியன் → புல் (உற்பத்தியாளர்) → மான் (முதல் நிலை நுகர்வோர்) → புலி (இரண்டாம் நிலை நுகர்வோர்).',
        },
        content: {
          en: 'Decomposers close the loop by breaking down organic remains, returning minerals to the soil for plants.',
          ta: 'இறந்த உடல்களை சிதைத்து ஊட்டச்சத்துக்களை மீண்டும் மண்ணுக்கு அளித்து சுழற்சியை சிதைப்பவைகள் நிறைவு செய்கின்றன.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'Food webs are interconnected networks of multiple overlapping food chains.',
          ta: 'பல உணவுச் சங்கிலிகள் ஒன்றோடொன்று இணைந்து உணவு வலையை உருவாக்குகின்றன.',
        },
        rememberStatement: {
          en: 'Producers make energy available; top predators require vast territory to survive.',
          ta: 'உற்பத்தியாளர்கள் ஆற்றலை அளிக்கின்றனர்; உயர் வேட்டையாடிகளுக்கு அதிக பரப்பளவு தேவை.',
        },
      },
    ],
  },
  {
    id: 'micro-plant-transpiration',
    title: { en: 'Plant Transpiration & Stomata', ta: 'தாவர நீராவிப்போக்கும் இலைத்துளைகளும்' },
    subtitle: { en: 'Water Pull & Guard Cells', ta: 'நீரேற்ற இழுவிசையும் காப்புச் செல்களும்' },
    description: {
      en: 'Learn how giant redwood trees pull hundreds of liters of groundwater up to their top leaves.',
      ta: 'மிக உயரமான மரங்கள் நிலத்தடி நீரை உச்சி இலை வரை உறிஞ்சி இழுக்கும் அறிவியல் முறையை அறியவும்.',
    },
    subject: 'biology',
    category: 'Plant Physiology',
    gradeRange: 'Grades 8–10',
    gradeGroup: 'secondary',
    durationMinutes: 2,
    difficulty: 'medium',
    icon: '🍃',
    visualType: 'plant_stomata',
    keyPoints: [
      {
        en: 'Transpiration is the evaporation of water vapor through microscopic leaf pores called stomata.',
        ta: 'இலைத்துளைகள் (ஸ்டோமேட்டா) வழியாக நீர் நீராவியாக வெளியேறுவது நீராவிப்போக்கு எனப்படும்.',
      },
      {
        en: 'Transpiration pull creates negative pressure that lifts water and minerals through xylem vessels.',
        ta: 'நீராவிப்போக்கு இழுவிசை சைலம் குழாய்கள் வழியே நீரை மேல்நோக்கி இழுக்கிறது.',
      },
      {
        en: 'Two specialized Guard Cells swell or shrink to open and close each stoma.',
        ta: 'இரு காப்புச் செல்கள் வீங்குவதன் மூலமும் சுருங்குவதன் மூலமும் இலைத்துளையைத் திறந்து மூடுகின்றன.',
      },
    ],
    quickCheck: {
      question: {
        en: 'Which plant vascular tissue is responsible for conducting water upward from roots to leaves?',
        ta: 'வேரிலிருந்து இலைகளுக்கு நீரை மேல்நோக்கிக் கடத்தும் தாவர திசு எது?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: 'Xylem', ta: 'சைலம்' },
          isCorrect: true,
          explanation: {
            en: 'Xylem vessels act like continuous pipes transporting water and dissolved minerals upward.',
            ta: 'சைலம் குழாய்கள் வேரிலிருந்து நீரையும் தாதுக்களையும் மேல்நோக்கிக் கடத்துகின்றன.',
          },
        },
        {
          id: 'opt-2',
          text: { en: 'Phloem', ta: 'புளோயம்' },
          isCorrect: false,
          explanation: {
            en: 'Phloem transports synthesized sugars (food) from leaves to other plant organs.',
            ta: 'புளோயம் இலைகளில் தயாரான உணவை மற்ற பாகங்களுக்குக் கடத்துகிறது.',
          },
        },
        {
          id: 'opt-3',
          text: { en: 'Epidermis', ta: 'புறத்தோல் (எபிடெர்மிஸ்)' },
          isCorrect: false,
          explanation: {
            en: 'Epidermis is the outer protective skin layer of the leaf.',
            ta: 'புறத்தோல் என்பது இலையின் வெளிப்புற பாதுகாப்பு அடுக்கு.',
          },
        },
        {
          id: 'opt-4',
          text: { en: 'Pith', ta: 'பித் (மையப்பகுதி)' },
          isCorrect: false,
          explanation: {
            en: 'Pith stores nutrients in the stem center; it does not conduct bulk water.',
            ta: 'பித் என்பது தண்டின் மையத்தில் ஊட்டச்சத்துக்களைச் சேமிக்கும் பகுதி.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'Transpiration pulls water up through xylem like drinking water through an unbroken straw.',
      ta: 'உறிஞ்சுகுழல் வழியே நீரை உறிஞ்சுவது போல நீராவிப்போக்கு சைலம் வழியே நீரை மேலேற்றுகிறது.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=core&subjectId=biology&pathwayId=bio-c-2',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'How Water Climbs Against Gravity', ta: 'புவியீர்ப்பை எதிர்த்து நீர் ஏறுவது எப்படி?' },
        content: {
          en: 'As water molecules evaporate from leaves, cohesion (water sticking to water) and adhesion (water sticking to xylem walls) pull an unbroken column of water from the roots.',
          ta: 'இலைகளில் இருந்து நீர் ஆவியாகும்போது, நீர் மூலக்கூறுகளுக்கு இடையிலான கவர்ச்சி விசை நீரை தொடர் சங்கிலியாக மேலே இழுக்கிறது.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'plant_stomata',
        visualCaption: {
          en: 'Turgid Guard Cells = Stoma Opens. Flaccid Guard Cells = Stoma Closes.',
          ta: 'காப்புச் செல்கள் விரியும்போது துளை திறக்கும்; சுருங்கும்போது துளை மூடும்.',
        },
        content: {
          en: 'Plants close their stomata during hot dry weather to prevent lethal dehydration.',
          ta: 'அதிக வெப்பமான நேரங்களில் நீர் இழப்பைத் தடுக்க தாவரங்கள் இலைத்துளைகளை மூடிக்கொள்கின்றன.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'A single mature oak tree can transpire up to 400 liters of water into the atmosphere every day.',
          ta: 'ஒரு பெரிய மரம் தினமும் 400 லிட்டர் வரை நீரை ஆவியாக காற்றில் வெளியிடுகிறது.',
        },
        rememberStatement: {
          en: 'Xylem carries water up via transpiration; Phloem distributes food throughout.',
          ta: 'சைலம் நீரை மேலேற்றுகிறது; புளோயம் உணவை அனைத்துப் பாகங்களுக்கும் கொண்டு செல்கிறது.',
        },
      },
    ],
  },
  {
    id: 'micro-microorganisms-bacteria',
    title: { en: 'Microorganisms: Good vs Harmful Bacteria', ta: 'நுண்ணுயிரிகள்: நன்மை மற்றும் தீமை செய்யும் பாக்டீரியா' },
    subtitle: { en: 'Gut Flora, Fermentation & Antibiotics', ta: 'குடல் நுண்ணுயிர், நொதித்தல் மற்றும் நுண்ணுயிர் எதிர்ப்பிகள்' },
    description: {
      en: 'Discover why you have trillions of helpful bacteria in your gut making curd, cheese, and vitamins.',
      ta: 'தயிரை உருவாக்கும் லாக்டோபேசில்லஸ் முதல் குடலில் வாழும் நன்மை செய்யும் பாக்டீரியாக்கள் வரை அறியவும்.',
    },
    subject: 'biology',
    category: 'Microbiology',
    gradeRange: 'Grades 6–7',
    gradeGroup: 'junior',
    durationMinutes: 2,
    difficulty: 'easy',
    icon: '🦠',
    visualType: 'microorganism',
    keyPoints: [
      {
        en: 'Microorganisms include bacteria, fungi, protozoa, and microscopic algae.',
        ta: 'நுண்ணுயிரிகளில் பாக்டீரியா, பூஞ்சை, புரோட்டோசோவா மற்றும் பாசிகள் அடங்கும்.',
      },
      {
        en: 'Lactobacillus bacteria convert milk into healthy curd via lactic acid fermentation.',
        ta: 'லாக்டோபேசில்லஸ் பாக்டீரியா பாலை தயிராக மாற்றும் நொதித்தலைச் செய்கிறது.',
      },
      {
        en: 'Antibiotics kill or inhibit bacteria; they have ZERO effect against viral infections like colds or flu.',
        ta: 'நுண்ணுயிர் எதிர்ப்பிகள் பாக்டீரியாக்களை மட்டுமே அழிக்கும்; வைரஸ்களுக்கு எதிராக செயல்படாது.',
      },
    ],
    quickCheck: {
      question: {
        en: 'Which friendly bacterium ferments lactose milk sugar into lactic acid to make curd?',
        ta: 'பாலை தயிராக மாற்ற உதவும் நன்மை செய்யும் பாக்டீரியா எது?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: 'Lactobacillus', ta: 'லாக்டோபேசில்லஸ்' },
          isCorrect: true,
          explanation: {
            en: 'Lactobacillus acidophilus converts milk lactose into lactic acid, coagulating milk proteins into curd.',
            ta: 'லாக்டோபேசில்லஸ் லாக்டோஸை லாக்டிக் அமிலமாக மாற்றி பாலை தயிராக மாற்றுகிறது.',
          },
        },
        {
          id: 'opt-2',
          text: { en: 'Salmonella', ta: 'சால்மோனெல்லா' },
          isCorrect: false,
          explanation: {
            en: 'Salmonella is a pathogen causing severe food poisoning.',
            ta: 'சால்மோனெல்லா உணவை நச்சாக்கும் ஆபத்தான பாக்டீரியா.',
          },
        },
        {
          id: 'opt-3',
          text: { en: 'Vibrio cholerae', ta: 'விப்ரியோ காலரே' },
          isCorrect: false,
          explanation: {
            en: 'Vibrio cholerae is the harmful bacterium that causes cholera.',
            ta: 'இது காலரா நோயை உண்டாக்கும் பாக்டீரியா.',
          },
        },
        {
          id: 'opt-4',
          text: { en: 'Yeast fungus', ta: 'ஈஸ்ட் பூஞ்சை' },
          isCorrect: false,
          explanation: {
            en: 'Yeast is a single-celled fungus used in bread baking, not a bacterium.',
            ta: 'ஈஸ்ட் என்பது ரொட்டி தயாரிக்க உதவும் பூஞ்சை, பாக்டீரியா அல்ல.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'Most bacteria are harmless or essential helpers: less than 1% cause human disease.',
      ta: 'பெரும்பாலான பாக்டீரியாக்கள் நன்மை செய்பவையே: 1% க்கும் குறைவானவையே நோய்களை உண்டாக்குகின்றன.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=foundation&subjectId=biology&pathwayId=bio-f-1',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'Our Invisible Allies', ta: 'கண்ணுக்குத் தெரியாத நண்பர்கள்' },
        content: {
          en: 'You are an ecosystem: your digestive tract is home to roughly 38 trillion bacterial cells that help digest fiber, synthesize vitamin K, and train your immune system.',
          ta: 'உங்கள் செரிமான மண்டலத்தில் சுமார் 38 டிரில்லியன் பாக்டீரியாக்கள் வாழ்கின்றன. அவை உணவை செரிக்கவும் வைட்டமின் K தயாரிக்கவும் உதவுகின்றன.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'microorganism',
        visualCaption: {
          en: 'Rod-shaped Bacilli, spherical Cocci, and spiral Spirilla shapes.',
          ta: 'குச்சி வடிவம் (பேசில்லஸ்), கோள வடிவம் (காக்கஸ்), சுருள் வடிவம் (ஸ்பைரில்லா).',
        },
        content: {
          en: 'Bacteria reproduce rapidly through binary fission, doubling their population in as little as 20 minutes under warm conditions.',
          ta: 'பாக்டீரியாக்கள் இருபிளவு முறை மூலம் மிக வேகமாக 20 நிமிடங்களில் இரட்டிப்படைகின்றன.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'Alexander Fleming discovered penicillin in 1928 when mold accidentally contaminated a bacterial culture.',
          ta: 'அலெக்சாண்டர் பிளெமிங் 1928-ல் பென்சிலின் என்ற முதல் நுண்ணுயிர் எதிர்ப்பியைக் கண்டுபிடித்தார்.',
        },
        rememberStatement: {
          en: 'Friendly microbes ferment foods, enrich soils, and protect your digestive health.',
          ta: 'நன்மை தரும் நுண்ணுயிரிகள் உணவை நொதிக்க வைக்கவும் உடலைப் பாதுகாக்கவும் உதவுகின்றன.',
        },
      },
    ],
  },

  // ==========================================
  // SPACE (4 Lessons)
  // ==========================================
  {
    id: 'micro-solar-system-orbits',
    title: { en: 'Planetary Orbits & The Solar System', ta: 'கோள்களின் சுற்றுப்பாதையும் சூரியக் குடும்பமும்' },
    subtitle: { en: 'Kepler’s Laws & Gravitational Anchors', ta: 'கெப்ளரின் விதிகளும் ஈர்ப்பு விசையும்' },
    description: {
      en: 'Discover why planets travel in ellipses rather than circles and how distance dictates year length.',
      ta: 'கோள்கள் நீள்வட்டப் பாதையில் சுற்றுவது ஏன் என்பதையும் தூரத்தைப் பொறுத்து ஆண்டு மாறுவதையும் அறியவும்.',
    },
    subject: 'space',
    category: 'Astronomy',
    gradeRange: 'Grades 6–7',
    gradeGroup: 'junior',
    durationMinutes: 2,
    difficulty: 'easy',
    icon: '🪐',
    visualType: 'solar_system',
    keyPoints: [
      {
        en: 'The Sun holds 99.86% of all mass in the Solar System, anchoring eight planets in orbit.',
        ta: 'சூரியக் குடும்பத்தின் மொத்த நிறையில் 99.86% சூரியனிலேயே உள்ளது.',
      },
      {
        en: 'Kepler’s First Law: Planetary orbits are ellipses with the Sun at one focal point.',
        ta: 'கெப்ளரின் முதல் விதி: கோள்களின் சுற்றுப்பாதைகள் சூரியனை ஒரு குவியமாகக் கொண்ட நீள்வட்டங்களாகும்.',
      },
      {
        en: 'Outer planets take much longer to orbit: Mercury takes 88 days, while Neptune takes 165 Earth years.',
        ta: 'தொலைவிலுள்ள கோள்கள் சுற்ற அதிக காலம் எடுக்கும்: புதன் 88 நாட்கள், நெப்டியூன் 165 ஆண்டுகள்.',
      },
    ],
    quickCheck: {
      question: {
        en: 'Which planet completes an orbit around the Sun in the shortest time (just 88 Earth days)?',
        ta: 'சூரியனை மிகக் குறைந்த காலத்தில் (88 நாட்களில்) சுற்றி முடிக்கும் கோள் எது?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: 'Mercury', ta: 'புதன் (மெர்குரி)' },
          isCorrect: true,
          explanation: {
            en: 'Mercury is closest to the Sun, traveling fastest (47 km/s) across the shortest orbital track.',
            ta: 'புதன் சூரியனுக்கு மிக அருகில் இருப்பதால் மிக வேகமாக (47 கி.மீ/வி) சுற்றி முடிக்கிறது.',
          },
        },
        {
          id: 'opt-2',
          text: { en: 'Venus', ta: 'வெள்ளி (வீனஸ்)' },
          isCorrect: false,
          explanation: {
            en: 'Venus takes 225 Earth days to complete one revolution.',
            ta: 'வெள்ளி சூரியனைச் சுற்ற 225 நாட்கள் ஆகின்றன.',
          },
        },
        {
          id: 'opt-3',
          text: { en: 'Mars', ta: 'செவ்வாய் (மார்ஸ்)' },
          isCorrect: false,
          explanation: {
            en: 'Mars takes 687 Earth days to complete an orbit.',
            ta: 'செவ்வாய் சுற்ற 687 நாட்கள் ஆகின்றன.',
          },
        },
        {
          id: 'opt-4',
          text: { en: 'Jupiter', ta: 'வியாழன் (ஜூபிடர்)' },
          isCorrect: false,
          explanation: {
            en: 'Jupiter takes nearly 12 Earth years to circle the Sun.',
            ta: 'வியாழன் சூரியனைச் சுற்ற 12 ஆண்டுகள் ஆகின்றன.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'Closer planets travel faster over smaller loops: Mercury sprints, Neptune ambles.',
      ta: 'சூரியனுக்கு அருகிலுள்ள கோள்கள் வேகமாக சுற்றுகின்றன: புதன் பாய்கிறது, நெப்டியூன் மெதுவாகிறது.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=foundation&subjectId=physics&pathwayId=phy-f-1',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'The Elliptical Dance', ta: 'நீள்வட்ட நடனம்' },
        content: {
          en: 'For centuries, astronomers assumed orbits were perfect circles. Johannes Kepler analyzed planetary observations and discovered that planetary orbits are ellipses.',
          ta: 'கோள்கள் வட்டப்பாதையில் சுற்றுவதாகவே கருதப்பட்டது. ஆனால் கெப்ளர் அவை நீள்வட்டப் பாதையில் சுற்றுவதைக் கண்டறிந்தார்.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'solar_system',
        visualCaption: {
          en: 'Inner rocky planets (Mercury, Venus, Earth, Mars) → Asteroid Belt → Outer gas giants (Jupiter, Saturn, Uranus, Neptune).',
          ta: 'உட்புற பாறை கோள்கள் → சிறுகோள் பட்டை → வெளிப்புற வாயுப் பெருங்கோள்கள்.',
        },
        content: {
          en: 'The Sun’s gravity pulls planets inward, while their high forward velocity keeps them falling around the Sun.',
          ta: 'சூரியனின் ஈர்ப்பு விசை கோள்களை உள்ளிழுக்கிறது; அவற்றின் முன்னோக்கிய வேகம் நிலைத்த சுற்றுப்பாதையை அளிக்கிறது.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'Earth moves faster in January when it is slightly closer to the Sun (perihelion).',
          ta: 'பூமி ஜனவரியில் சூரியனுக்கு அருகில் வரும்போது சற்றே வேகமாக இயங்குகிறது.',
        },
        rememberStatement: {
          en: 'Planetary orbits are governed by gravity and Kepler’s laws of elliptical motion.',
          ta: 'கோள்களின் இயக்கங்கள் ஈர்ப்பு விசை மற்றும் கெப்ளரின் நீள்வட்ட விதிகளால் நிர்வகிக்கப்படுகின்றன.',
        },
      },
    ],
  },
  {
    id: 'micro-why-sky-blue',
    title: { en: 'Why is the Sky Blue?', ta: 'வானம் நீல நிறமாக இருப்பது ஏன்?' },
    subtitle: { en: 'Rayleigh Scattering of Sunlight', ta: 'ரேலே ஒளிச்சிதறல்' },
    description: {
      en: 'Discover how Earth’s atmosphere scatters shorter blue light waves in all directions across the daytime sky.',
      ta: 'சூரிய ஒளியில் உள்ள குறுகிய அலைநீளம் கொண்ட நீல நிறம் வளிமண்டலத்தால் சிதறடிக்கப்படும் விதத்தை அறியவும்.',
    },
    subject: 'space',
    category: 'Atmospheric Physics',
    gradeRange: 'Grades 6–7',
    gradeGroup: 'junior',
    durationMinutes: 2,
    difficulty: 'easy',
    icon: '🌤️',
    visualType: 'sky_scattering',
    keyPoints: [
      {
        en: 'Sunlight appears white but contains all seven rainbow colors of the spectrum.',
        ta: 'சூரிய ஒளி வெண்மையாகத் தெரிந்தாலும் வானவில்லின் ஏழு வண்ணங்களையும் கொண்டுள்ளது.',
      },
      {
        en: 'Rayleigh scattering: shorter wavelengths (blue and violet) scatter far more than longer wavelengths (red).',
        ta: 'ரேலே சிதறல்: குறுகிய அலைநீளம் கொண்ட நீல நிறம், நீண்ட சிவப்பு நிறத்தை விட மிக அதிகமாக சிதறடிக்கப்படுகிறது.',
      },
      {
        en: 'At sunset, sunlight travels through much thicker atmosphere, scattering away blue and leaving red and orange.',
        ta: 'சூரிய அஸ்தமனத்தின் போது ஒளி அதிக காற்றுப் படலத்தைக் கடப்பதால் நீலம் சிதறி சிவப்பு மட்டுமே நம்மை அடைகிறது.',
      },
    ],
    quickCheck: {
      question: {
        en: 'Why does blue light scatter much more than red light in Earth’s atmosphere?',
        ta: 'பூமியின் வளிமண்டலத்தில் சிவப்பு ஒளியை விட நீல ஒளி அதிகமாக சிதறடிக்கப்படுவது ஏன்?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: 'Blue light has a much shorter wavelength than red light', ta: 'நீல ஒளி சிவப்பு ஒளியை விட மிகக் குறைந்த அலைநீளம் கொண்டது' },
          isCorrect: true,
          explanation: {
            en: 'Rayleigh scattering intensity is inversely proportional to the 4th power of wavelength (1/λ⁴).',
            ta: 'ரேலே சிதறல் விதியின்படி, குறைந்த அலைநீளம் கொண்ட நீல நிறம் பல மடங்கு அதிகமாக சிதறுகிறது.',
          },
        },
        {
          id: 'opt-2',
          text: { en: 'The oceans reflect blue light upward into clouds', ta: 'கடல்கள் நீல நிறத்தை மேல்நோக்கி மேகங்களுக்கு எதிரொளிக்கின்றன' },
          isCorrect: false,
          explanation: {
            en: 'The sky would be blue even over dry desert land with zero oceans around.',
            ta: 'கடல் இல்லாத பாலைவனத்திற்கு மேலேயும் வானம் நீலமாகவே இருக்கும்.',
          },
        },
        {
          id: 'opt-3',
          text: { en: 'Oxygen molecules glow blue naturally in daylight', ta: 'ஆக்சிஜன் மூலக்கூறுகள் பகலில் நீலமாக ஒளிர்கின்றன' },
          isCorrect: false,
          explanation: {
            en: 'Oxygen gas is completely clear and colorless.',
            ta: 'ஆக்சிஜன் நிறமற்ற ஒரு வாயுவாகும்.',
          },
        },
        {
          id: 'opt-4',
          text: { en: 'The ozone layer filters out all other rainbow colors', ta: 'ஓசோன் படலம் மற்ற அனைத்து வண்ணங்களையும் வடிகட்டுகிறது' },
          isCorrect: false,
          explanation: {
            en: 'The ozone layer absorbs ultraviolet radiation, not visible light colors.',
            ta: 'ஓசோன் படலம் புற ஊதாக் கதிர்களை மட்டுமே உறிஞ்சுகிறது.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'Short blue waves scatter everywhere across midday skies; long red waves survive the sunset path.',
      ta: 'குறுகிய நீல அலைகள் பகலில் சிதறுகின்றன; நீண்ட சிவப்பு அலைகள் மாலையில் நம்மை அடைகின்றன.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=foundation&subjectId=physics&pathwayId=phy-f-2',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'White Light is a Rainbow', ta: 'வெள்ளை ஒளி ஒரு வானவில்' },
        content: {
          en: 'Sunlight contains red, orange, yellow, green, blue, indigo, and violet. Red waves are long and lazy; blue waves are short and choppy.',
          ta: 'சூரிய ஒளியில் ஏழு வண்ணங்கள் உள்ளன. சிவப்பு அலைநீளம் அதிகம், நீலத்தின் அலைநீளம் குறைவு.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'sky_scattering',
        visualCaption: {
          en: 'Nitrogen and oxygen gas molecules bounce short blue wavelengths in every direction.',
          ta: 'நைட்ரஜன் மற்றும் ஆக்சிஜன் மூலக்கூறுகள் நீல நிறத்தை அனைத்து திசைகளிலும் சிதறடிக்கின்றன.',
        },
        content: {
          en: 'Violet light actually scatters even more than blue, but human eyes are far more sensitive to blue light, and the Sun emits more blue photons than violet.',
          ta: 'ஊதா நிறம் இன்னும் அதிகமாக சிதறினாலும், நமது கண்கள் நீல நிறத்தை உணரும் திறன் அதிகம் கொண்டவை.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'On the Moon, where there is no atmosphere, the sky appears pitch black even in bright daylight.',
          ta: 'வளிமண்டலம் இல்லாத நிலவில் பட்டப்பகலிலும் வானம் கும்மிருட்டாகத் தெரியும்.',
        },
        rememberStatement: {
          en: 'The sky is blue because gas molecules scatter short-wavelength blue light across the daytime sky.',
          ta: 'குறுகிய அலைநீளம் கொண்ட நீல ஒளியை காற்று மூலக்கூறுகள் சிதறடிப்பதால் வானம் நீலமாகிறது.',
        },
      },
    ],
  },
  {
    id: 'micro-moon-phases',
    title: { en: 'Moon Phases & Tides', ta: 'நிலவின் நிலைகளும் கடல் அலைகளும்' },
    subtitle: { en: 'Sunlight Reflection & Gravitational Tides', ta: 'சூரிய ஒளி பிரதிபலிப்பும் ஈர்ப்பு அலைகளும்' },
    description: {
      en: 'Understand why the Moon changes shape from crescent to full moon over its 29.5-day cycle.',
      ta: 'நிலவு 29.5 நாட்களில் பிறையிலிருந்து பௌர்ணமியாக மாறும் விதத்தையும் கடல் அலைகளையும் அறியவும்.',
    },
    subject: 'space',
    category: 'Astronomy',
    gradeRange: 'Grades 6–7',
    gradeGroup: 'junior',
    durationMinutes: 2,
    difficulty: 'easy',
    icon: '🌕',
    visualType: 'moon_phases',
    keyPoints: [
      {
        en: 'The Moon shines purely by reflecting sunlight; half of the Moon is always illuminated.',
        ta: 'நிலவு தானாக ஒளிர்வதில்லை; எப்போதும் அதன் ஒரு பாதி சூரிய ஒளியால் ஒளிர்கிறது.',
      },
      {
        en: 'Phases occur because we see varying amounts of the illuminated half as the Moon orbits Earth.',
        ta: 'நிலவு பூமியைச் சுற்றும்போது ஒளிரும் பகுதியின் மாறுபட்ட அளவைக் காண்பதால் நிலைகள் ஏற்படுகின்றன.',
      },
      {
        en: 'The Moon’s gravitational pull creates ocean tidal bulges on Earth.',
        ta: 'நிலவின் ஈர்ப்பு விசையே பூமியின் கடல்களில் ஓதங்களை (Tides) உருவாக்குகிறது.',
      },
    ],
    quickCheck: {
      question: {
        en: 'During a Full Moon, where is the Earth positioned relative to the Sun and Moon?',
        ta: 'முழு நிலவு (பௌர்ணமி) நாளில் பூமி எங்கு அமைந்திருக்கும்?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: 'Between the Sun and the Moon', ta: 'சூரியனுக்கும் நிலவிற்கும் இடையில்' },
          isCorrect: true,
          explanation: {
            en: 'Earth is between the Sun and Moon, so the entire sunlit side of the Moon faces Earth.',
            ta: 'பூமி நடுவில் இருப்பதால், சூரியன் ஒளிரச் செய்யும் நிலவின் முழுப் பகுதியும் நமக்குத் தெரிகிறது.',
          },
        },
        {
          id: 'opt-2',
          text: { en: 'The Moon is between the Earth and Sun', ta: 'நிலவு பூமிக்கும் சூரியனுக்கும் இடையில் இருக்கும்' },
          isCorrect: false,
          explanation: {
            en: 'That configuration produces a New Moon (dark silhouette).',
            ta: 'அது அமாவாசை நிலையை உண்டாக்கும்.',
          },
        },
        {
          id: 'opt-3',
          text: { en: 'The Sun is between Earth and Moon', ta: 'சூரியன் பூமிக்கும் நிலவுக்கும் இடையில் இருக்கும்' },
          isCorrect: false,
          explanation: {
            en: 'The Sun is never between Earth and Moon.',
            ta: 'சூரியன் ஒருபோதும் பூமிக்கும் நிலவுக்கும் இடையில் வருவதில்லை.',
          },
        },
        {
          id: 'opt-4',
          text: { en: 'At a 90° right angle to both', ta: 'செங்கோண அமைப்பில் இருக்கும்' },
          isCorrect: false,
          explanation: {
            en: 'A 90° angle produces quarter moon phases.',
            ta: '90° கோணம் அரை நிலவு நிலையை உண்டாக்கும்.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'Half of the Moon is always lit by the Sun; our angle of view determines the phase we see.',
      ta: 'நிலவின் ஒரு பாதி எப்போதும் ஒளிர்கிறது; நாம் பார்க்கும் கோணமே பிறை வடிவத்தைத் தீர்மானிக்கிறது.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=foundation&subjectId=physics&pathwayId=phy-f-1',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'The 29.5 Day Lunar Cycle', ta: '29.5 நாள் நிலவு சுழற்சி' },
        content: {
          en: 'As the Moon orbits Earth every 27.3 days, its changing position relative to the Sun presents different proportions of its sunlit hemisphere to observers on Earth.',
          ta: 'நிலவு பூமியைச் சுற்றும் போது, சூரிய ஒளி படும் அதன் பகுதி பூமியில் இருந்து பார்க்கும்போது மாறுகிறது.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'moon_phases',
        visualCaption: {
          en: 'New Moon → Waxing Crescent → First Quarter → Waxing Gibbous → Full Moon.',
          ta: 'அமாவாசை → வளர்பிறை → முதல் கால் பகுதி → முழு நிலவு (பௌர்ணமி).',
        },
        content: {
          en: 'Waxing means the illuminated portion is growing; Waning means it is shrinking.',
          ta: 'வளர்பிறை என்பது ஒளி வட்டம் வளர்வது; தேய்பிறை என்பது அது குறைவது.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'Tidal locking means the Moon rotates on its axis at the exact same rate it orbits Earth, keeping one face toward us forever.',
          ta: 'நிலவு தன்னைத்தானே சுற்றிக் கொள்ளும் காலமும் பூமியைச் சுற்றும் காலமும் சமம் என்பதால் நாம் எப்போதும் நிலவின் ஒரே பக்கத்தையே காண்கிறோம்.',
        },
        rememberStatement: {
          en: 'Moon phases show how much of the sunlit half of the Moon is visible from Earth.',
          ta: 'ஒளிரும் நிலவின் எவ்வளவு பகுதியை நாம் காண்கிறோம் என்பதே நிலவின் நிலைகள் ஆகும்.',
        },
      },
    ],
  },
  {
    id: 'micro-stars-black-holes',
    title: { en: 'Stars, Supernovae & Black Holes', ta: 'விண்மீன்கள், சூப்பர்நோவா மற்றும் கருந்துளைகள்' },
    subtitle: { en: 'Nuclear Fusion & Stellar Collapse', ta: 'அணுக்கரு இணைவும் விண்மீன் மறைவும்' },
    description: {
      en: 'Discover how stars fuse hydrogen into helium and what happens when massive giant stars collapse into black holes.',
      ta: 'விண்மீன்கள் ஒளிரும் விதத்தையும், இராட்சத விண்மீன்கள் வெடித்து கருந்துளையாக மாறும் விதத்தையும் அறியவும்.',
    },
    subject: 'space',
    category: 'Astrophysics',
    gradeRange: 'Grades 8–10',
    gradeGroup: 'secondary',
    durationMinutes: 3,
    difficulty: 'medium',
    icon: '✨',
    visualType: 'star_lifecycle',
    keyPoints: [
      {
        en: 'Stars shine by nuclear fusion: smashing hydrogen atoms together into helium, releasing massive energy.',
        ta: 'விண்மீன்கள் அணுக்கரு இணைவு மூலம் ஹைட்ரஜனை ஹீலியமாக மாற்றி ஆற்றலை வெளியிடுகின்றன.',
      },
      {
        en: 'A star lives in a delicate balance between outward fusion radiation pressure and inward gravitational pull.',
        ta: 'வெளியே தள்ளும் அணுக்கரு ஆற்றலும் உள்ளிழுக்கும் ஈர்ப்பு விசையும் சமநிலையில் இருக்கும் வரை விண்மீன் நிலைத்திருக்கும்.',
      },
      {
        en: 'Massive stars die in supernova explosions, leaving behind neutron stars or black holes.',
        ta: 'பெரிய விண்மீன்கள் சூப்பர்நோவாவாக வெடித்து நியூட்ரான் விண்மீனாகவோ அல்லது கருந்துளையாகவோ மாறுகின்றன.',
      },
    ],
    quickCheck: {
      question: {
        en: 'What fundamental physical process powers the Sun and other main sequence stars?',
        ta: 'சூரியனும் பிற விண்மீன்களும் தொடர்ந்து ஒளிரத் தேவையான ஆற்றலைத் தரும் செயல்முறை எது?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: 'Nuclear fusion of hydrogen into helium', ta: 'ஹைட்ரஜன் அணுக்கள் இணைந்து ஹீலியமாகும் அணுக்கரு இணைவு' },
          isCorrect: true,
          explanation: {
            en: 'Extreme core pressure and heat fuse 4 hydrogen nuclei into 1 helium nucleus, releasing energy by E=mc².',
            ta: 'அதிக வெப்பம் மற்றும் அழுத்தத்தில் ஹைட்ரஜன் இணைந்து ஹீலியமாக மாறும்போது பெருமளவு ஆற்றல் வெளியாகிறது.',
          },
        },
        {
          id: 'opt-2',
          text: { en: 'Chemical burning of coal and petroleum', ta: 'நிலக்கரி மற்றும் பெட்ரோல் எரிதல்' },
          isCorrect: false,
          explanation: {
            en: 'If the Sun burned chemically like coal, it would burn out in a few thousand years.',
            ta: 'வேதியியல் எரிதலாக இருந்தால் சூரியன் சில ஆயிரம் ஆண்டுகளிலேயே அணைந்திருக்கும்.',
          },
        },
        {
          id: 'opt-3',
          text: { en: 'Nuclear fission splitting uranium atoms', ta: 'யுரேனியம் பிளவுபடும் அணுக்கரு பிளவு' },
          isCorrect: false,
          explanation: {
            en: 'Fission powers nuclear reactors on Earth; stars fuse lighter elements.',
            ta: 'அணுக்கரு பிளவு பூமியில் உள்ள அணு உலைகளில் மட்டுமே பயன்படுத்தப்படுகிறது.',
          },
        },
        {
          id: 'opt-4',
          text: { en: 'Magnetic frictional friction', ta: 'காந்த உராய்வு வெப்பம்' },
          isCorrect: false,
          explanation: {
            en: 'Magnetic fields shape solar flares, but do not fuel the star’s core engine.',
            ta: 'காந்தப்புலம் சூரியனின் முதன்மை ஆற்றல் மூலம் அல்ல.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'We are made of stardust: all elements heavier than helium were forged inside dying stars.',
      ta: 'நாம் அனைவரும் விண்மீன் துகள்களால் ஆனவர்கள்: நமது உடலில் உள்ள தனிமங்கள் விண்மீன்களில் உருவானவையே.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=core&subjectId=physics&pathwayId=phy-c-2',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'The Engine of a Star', ta: 'விண்மீனின் இயந்திரம்' },
        content: {
          en: 'At the Sun’s core, 600 million tons of hydrogen are fused into helium every single second. A tiny fraction of mass converts directly into blazing light according to Einstein’s E=mc².',
          ta: 'சூரியனின் மையத்தில் ஒவ்வொரு நொடியும் 600 மில்லியன் டன் ஹைட்ரஜன் ஹீலியமாக மாறுகிறது. ஐன்ஸ்டீனின் E=mc² விதியின்படி நிறை ஆற்றலாக மாறுகிறது.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'star_lifecycle',
        visualCaption: {
          en: 'Nebula → Main Sequence → Red Giant → Supernova → Black Hole or Neutron Star.',
          ta: 'நெபுலா → விண்மீன் → சிவப்பு அரக்கன் → சூப்பர்நோவா → கருந்துளை அல்லது நியூட்ரான் விண்மீன்.',
        },
        content: {
          en: 'A Black Hole is an object packed with so much mass that its escape velocity exceeds the speed of light: nothing, not even light, can escape.',
          ta: 'கருந்துளை என்பது அளவற்ற ஈர்ப்பு விசை கொண்ட பகுதி; ஒளியால் கூட அதிலிருந்து தப்ப முடியாது.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'The iron in your red blood cells was created inside an ancient giant star that exploded before Earth formed.',
          ta: 'உங்கள் இரத்தத்தில் உள்ள இரும்புச்சத்து பூமி தோன்றுவதற்கு முன் வெடித்த விண்மீனில் உருவானதாகும்.',
        },
        rememberStatement: {
          en: 'Nuclear fusion fuels stellar life; gravitational collapse drives stellar death.',
          ta: 'அணுக்கரு இணைவு விண்மீனை வாழ வைக்கிறது; ஈர்ப்பு விசை அதை இறுதியில் வீழ்த்துகிறது.',
        },
      },
    ],
  },

  // ==========================================
  // ENVIRONMENT (3 Lessons)
  // ==========================================
  {
    id: 'micro-water-cycle',
    title: { en: 'The Water Cycle & Cloud Formation', ta: 'நீர் சுழற்சியும் மேக உருவாக்கமும்' },
    subtitle: { en: 'Evaporation, Condensation & Precipitation', ta: 'ஆவியாதல், சுருங்குதல் மற்றும் மழைப்பொழிவு' },
    description: {
      en: 'Follow a water droplet as solar heat lifts it into clouds and gravity returns it as rain.',
      ta: 'ஒரு நீர்த்துளி சூரிய வெப்பத்தால் ஆவியாகி மேகமாகி மீண்டும் மழையாகப் பொழியும் சுழற்சியை அறியவும்.',
    },
    subject: 'environment',
    category: 'Earth Science',
    gradeRange: 'Grades 6–7',
    gradeGroup: 'junior',
    durationMinutes: 2,
    difficulty: 'easy',
    icon: '🌧️',
    visualType: 'water_cycle',
    keyPoints: [
      {
        en: 'The water cycle is powered by solar thermal energy and Earth’s gravity.',
        ta: 'நீர் சுழற்சி சூரிய வெப்ப ஆற்றல் மற்றும் புவியீர்ப்பு விசையால் இயக்கப்படுகிறது.',
      },
      {
        en: 'Water evaporates from oceans, transpires from plants, condenses into clouds, and falls as rain.',
        ta: 'கடல் நீர் ஆவியாகி, தாவரங்களிலிருந்து நீராவிப்போக்காகி, குளிர்ந்து மேகமாகி மழையாகப் பொழிகிறது.',
      },
      {
        en: 'Earth’s total water volume is constant; the water you drink today is the same water dinosaurs drank.',
        ta: 'பூமியின் மொத்த நீர் அளவு மாறுவதில்லை; சுழற்சி முறையில் மீண்டும் மீண்டும் பயன்படுத்தப்படுகிறது.',
      },
    ],
    quickCheck: {
      question: {
        en: 'What process converts invisible water vapor in rising warm air into tiny liquid cloud droplets?',
        ta: 'மேலெழும்பும் காற்றில் உள்ள நீராவி குளிர்ந்து மேகத் துளிகளாக மாறும் செயல்முறை எது?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: 'Condensation', ta: 'சுருங்குதல் / குளிர்தல் (Condensation)' },
          isCorrect: true,
          explanation: {
            en: 'As warm air rises, it cools. Lower temperatures force water vapor to condense into microscopic liquid water droplets.',
            ta: 'காற்று மேலே செல்லும்போது குளிர்ச்சியடைகிறது. இதனால் நீராவி குளிர்ந்து நீர்த்துளிகளாக மாறுகிறது.',
          },
        },
        {
          id: 'opt-2',
          text: { en: 'Transpiration', ta: 'நீராவிப்போக்கு' },
          isCorrect: false,
          explanation: {
            en: 'Transpiration is water release from plant leaves, not the cooling phase in the sky.',
            ta: 'நீராவிப்போக்கு என்பது தாவர இலைகளிலிருந்து நீர் வெளியேறுவது.',
          },
        },
        {
          id: 'opt-3',
          text: { en: 'Precipitation', ta: 'மழைப்பொழிவு' },
          isCorrect: false,
          explanation: {
            en: 'Precipitation is the falling of rain or snow after droplets grow heavy enough.',
            ta: 'மழைப்பொழிவு என்பது துளிகள் கனமாகி கீழே விழுவது.',
          },
        },
        {
          id: 'opt-4',
          text: { en: 'Percolation', ta: 'கசிந்து இறங்குதல்' },
          isCorrect: false,
          explanation: {
            en: 'Percolation is water filtering downward through soil into groundwater aquifers.',
            ta: 'நீர் மண்ணில் கசிந்து நிலத்தடி நீராக மாறுவது.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'Evaporation rises, Condensation clouds, Precipitation rains, Collection flows.',
      ta: 'ஆவியாதல் மேலேற்றும், சுருங்குதல் மேகமாக்கும், பொழிவு மழையாக்கும்.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=foundation&subjectId=chemistry&pathwayId=chem-f-3',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'The Continuous Circle', ta: 'தொடர் நீரோட்டம்' },
        content: {
          en: 'Water never stays in one place for long. Driven by the Sun’s warmth, billions of metric tons of water cycle continuously through the atmosphere, oceans, glaciers, and soil.',
          ta: 'நீர் ஒருபோதும் ஒரே இடத்தில் இருப்பதில்லை. சூரியனின் வெப்பத்தால் வளிமண்டலம், கடல் மற்றும் நிலத்திற்கு இடையே தொடர்ந்து சுழல்கிறது.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'water_cycle',
        visualCaption: {
          en: 'Evaporation → Condensation (Clouds) → Precipitation (Rain) → Infiltration & Runoff.',
          ta: 'ஆவியாதல் → சுருங்குதல் (மேகம்) → மழைப்பொழிவு → நிலத்தடி நீர் மற்றும் ஓட்டம்.',
        },
        content: {
          en: 'Cloud droplets require tiny microscopic dust or pollen specks called condensation nuclei to form around.',
          ta: 'மேகத் துளிகள் உருவாக காற்றில் நுண்ணிய தூசி அல்லது துகள்கள் தேவைப்படுகின்றன.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'Over 97% of Earth’s water is salty ocean water; less than 1% is accessible liquid fresh water.',
          ta: 'பூமியின் 97% நீர் உப்பு நீராகும்; குடிப்பதற்கு உகந்த நன்னீர் 1% க்கும் குறைவே.',
        },
        rememberStatement: {
          en: 'The water cycle purifies water and redistributes life across all global continents.',
          ta: 'நீர் சுழற்சி நீரைத் தூய்மைப்படுத்தி உலகம் முழுவதும் உயிர்களுக்குப் பகிர்ந்தளிக்கிறது.',
        },
      },
    ],
  },
  {
    id: 'micro-greenhouse-effect',
    title: { en: 'The Greenhouse Effect & Global Climate', ta: 'பசுமைக்குடில் விளைவும் புவி வெப்பமயமாதலும்' },
    subtitle: { en: 'Thermal Blankets & Carbon Budgets', ta: 'வெப்பப் போர்வை மற்றும் கார்பன் சமநிலை' },
    description: {
      en: 'Learn how carbon dioxide and methane trap infrared heat to keep Earth habitable — and why excess warming harms ecosystems.',
      ta: 'கார்பன் டை ஆக்சைடு வெப்பத்தைத் தக்கவைத்து பூமியை கதகதப்பாக வைத்திருக்கும் விதத்தை அறியவும்.',
    },
    subject: 'environment',
    category: 'Climate Science',
    gradeRange: 'Grades 8–10',
    gradeGroup: 'secondary',
    durationMinutes: 2,
    difficulty: 'medium',
    icon: '🌡️',
    visualType: 'greenhouse_effect',
    keyPoints: [
      {
        en: 'The natural greenhouse effect keeps Earth’s average temperature at a habitable +15°C instead of a frozen -18°C.',
        ta: 'இயற்கையான பசுமைக்குடில் விளைவு பூமியின் வெப்பநிலையை உறைநிலைக்குப் போகாமல் +15°C இல் வைக்கிறது.',
      },
      {
        en: 'Greenhouse gases (CO2, CH4, H2O vapor) absorb outgoing infrared thermal radiation and re-radiate heat toward Earth.',
        ta: 'பசுமைக்குடில் வாயுக்கள் வெளியேறும் அகச்சிவப்பு வெப்பக் கதிர்களை உறிஞ்சி மீண்டும் பூமிக்கே அனுப்புகின்றன.',
      },
      {
        en: 'Burning fossil fuels and deforestation increase CO2 levels, amplifying the greenhouse effect and shifting climates.',
        ta: 'எரிபொருட்களை எரிப்பதும் காடுகளை அழிப்பதும் CO2 அளவை உயர்த்தி புவி வெப்பமயமாதலைத் தூண்டுகின்றன.',
      },
    ],
    quickCheck: {
      question: {
        en: 'What type of radiation do greenhouse gases absorb to trap heat in the lower atmosphere?',
        ta: 'பசுமைக்குடில் வாயுக்கள் எந்த வகையான கதிர்வீச்சை உறிஞ்சி வெப்பத்தைத் தக்கவைக்கின்றன?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: 'Infrared (thermal) radiation radiated upward from Earth’s surface', ta: 'பூமியின் மேற்பரப்பில் இருந்து வெளியேறும் அகச்சிவப்பு (வெப்ப) கதிர்வீச்சு' },
          isCorrect: true,
          explanation: {
            en: 'Earth absorbs high energy visible sunlight and re-emits lower energy infrared heat, which greenhouse gases trap.',
            ta: 'பூமி சூரிய ஒளியை உறிஞ்சி அகச்சிவப்பு வெப்பக் கதிர்களாக வெளியேற்றுகிறது; வாயுக்கள் இதைத் தடுத்து நிறுத்துகின்றன.',
          },
        },
        {
          id: 'opt-2',
          text: { en: 'Ultraviolet (UV) radiation directly from the Sun', ta: 'சூரியனில் இருந்து வரும் புற ஊதாக் கதிர்கள்' },
          isCorrect: false,
          explanation: {
            en: 'Ozone blocks UV in the stratosphere; greenhouse gases trap infrared in the troposphere.',
            ta: 'புற ஊதாக் கதிர்களை ஓசோன் படலம் தடுக்கிறது; பசுமைக்குடில் வாயுக்கள் அகச்சிவப்புக் கதிர்களை உறிஞ்சுகின்றன.',
          },
        },
        {
          id: 'opt-3',
          text: { en: 'Cosmic gamma ray bursts', ta: 'காஸ்மிக் காமா கதிர்கள்' },
          isCorrect: false,
          explanation: {
            en: 'Gamma rays are high frequency cosmic rays, not involved in the planetary heat balance.',
            ta: 'காமா கதிர்கள் வெப்ப சமநிலைக்குக் காரணமல்ல.',
          },
        },
        {
          id: 'opt-4',
          text: { en: 'Radio broadcast waves', ta: 'வானொலி அலைகள்' },
          isCorrect: false,
          explanation: {
            en: 'Radio waves pass through greenhouse gases without interaction.',
            ta: 'ரேடியோ அலைகள் வாயுக்களுடன் வினைபுரிவதில்லை.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'The greenhouse effect is a natural blanket: the right amount sustains life, too much overheats the planet.',
      ta: 'பசுமைக்குடில் விளைவு ஒரு இயற்கை போர்வை: சரியான அளவு உயிர்களைக் காக்கும், அதிகப்படியான அளவு புவியைக் கொதிக்க வைக்கும்.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=core&subjectId=biology&pathwayId=bio-c-3',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'Earth’s Atmospheric Blanket', ta: 'பூமியின் வளிமண்டலப் போர்வை' },
        content: {
          en: 'Just like glass in a botanical greenhouse allows sunlight in while trapping heat inside, certain atmospheric gases trap thermal energy, keeping our world habitable.',
          ta: 'கண்ணாடி வீட்டில் வெப்பம் சிக்குவது போல, வளிமண்டல வாயுக்கள் வெப்பக் கதிர்களைத் தடுத்து பூமியை கதகதப்பாக வைக்கின்றன.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'greenhouse_effect',
        visualCaption: {
          en: 'Incoming solar visible light passes through → Earth absorbs and radiates infrared heat → Greenhouse gases re-radiate heat back.',
          ta: 'சூரிய ஒளி உள்ளே வருகிறது → பூமி சூடாகி அகச்சிவப்பு கதிரை வெளியிடுகிறது → வாயுக்கள் வெப்பத்தைத் தக்கவைக்கின்றன.',
        },
        content: {
          en: 'Venus has an atmosphere of 96% CO2, creating a runaway greenhouse effect with surface temperatures of 465°C.',
          ta: 'வெள்ளி கோளில் 96% கார்பன் டை ஆக்சைடு இருப்பதால் அங்கு 465°C கடும் வெப்பம் நிலவுகிறது.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'Methane (CH4) is over 25 times more potent as a greenhouse gas than CO2 over a 100-year timescale.',
          ta: 'மீத்தேன் வாயு கார்பன் டை ஆக்சைடை விட 25 மடங்கு அதிக வெப்பத்தை உறிஞ்சும் திறன் கொண்டது.',
        },
        rememberStatement: {
          en: 'Limiting greenhouse gas emissions stabilizes climate patterns and protects global biodiversity.',
          ta: 'பசுமைக்குடில் வாயுக்களின் உமிழ்வைக் குறைப்பது காலநிலையைச் சமன் செய்து பல்லுயிர் தன்மையைப் பாதுகாக்கும்.',
        },
      },
    ],
  },
  {
    id: 'micro-renewable-energy',
    title: { en: 'Renewable Energy: Solar & Wind', ta: 'புதுப்பிக்கத்தக்க ஆற்றல்: சூரியன் மற்றும் காற்று' },
    subtitle: { en: 'Photovoltaics & Kinetic Turbines', ta: 'ஒளிமின்னழுத்தம் மற்றும் காற்றாலை டர்பைன்கள்' },
    description: {
      en: 'Discover how silicon solar cells turn photons into electricity and wind spins turbines without polluting.',
      ta: 'சிலிக்கான் செல்கள் சூரிய ஒளியை மின்சாரமாக மாற்றுவதையும் காற்றாலைகள் இயங்கும் விதத்தையும் அறியவும்.',
    },
    subject: 'environment',
    category: 'Clean Technology',
    gradeRange: 'Grades 8–10',
    gradeGroup: 'secondary',
    durationMinutes: 2,
    difficulty: 'easy',
    icon: '☀️',
    visualType: 'renewable_energy',
    keyPoints: [
      {
        en: 'Renewable energy comes from natural sources that replenish faster than they are consumed.',
        ta: 'புதுப்பிக்கத்தக்க ஆற்றல் என்பது பயன்படுத்தினாலும் மீண்டும் மீண்டும் இயற்கையாக உருவாகும் ஆற்றலாகும்.',
      },
      {
        en: 'Solar photovoltaic (PV) cells knock electrons free from silicon atoms to generate direct electric current.',
        ta: 'சூரிய ஒளி மின்கலங்கள் சிலிக்கான் அணுக்களிலிருந்து எலக்ட்ரான்களை விடுவித்து மின்சாரத்தை உருவாக்குகின்றன.',
      },
      {
        en: 'Wind turbines convert the kinetic energy of moving air into mechanical rotation, powering electrical generators.',
        ta: 'காற்றாலைகள் நகரும் காற்றின் இயக்க ஆற்றலை மின்னாக்கியின் மூலம் மின்னாற்றலாக மாற்றுகின்றன.',
      },
    ],
    quickCheck: {
      question: {
        en: 'What physical effect allows silicon solar panels to generate electricity directly from sunlight?',
        ta: 'சூரிய ஒளி பலகைகள் ஒளியிலிருந்து நேரடியாக மின்சாரத்தை உற்பத்தி செய்ய உதவும் விளைவு எது?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: 'The photovoltaic effect', ta: 'ஒளிமின்னழுத்த விளைவு (Photovoltaic effect)' },
          isCorrect: true,
          explanation: {
            en: 'Photons strike semiconductor silicon, exciting valence electrons across the bandgap into free electrical flow.',
            ta: 'ஒளி ஃபோட்டான்கள் சிலிக்கான் மீது படும்போது எலக்ட்ரான்கள் தூண்டப்பட்டு மின்னோட்டத்தை ஏற்படுத்துகின்றன.',
          },
        },
        {
          id: 'opt-2',
          text: { en: 'Electrochemical oxidation', ta: 'மின்வேதியியல் ஆக்சிஜனேற்றம்' },
          isCorrect: false,
          explanation: {
            en: 'Oxidation occurs in chemical batteries, not solid-state solar panels.',
            ta: 'ஆக்சிஜனேற்றம் மின்கலங்களில் மட்டுமே நிகழும்.',
          },
        },
        {
          id: 'opt-3',
          text: { en: 'Thermal steam expansion', ta: 'வெப்ப நீராவி விரிவடைதல்' },
          isCorrect: false,
          explanation: {
            en: 'Steam expansion drives coal/nuclear turbines, not flat PV solar panels.',
            ta: 'நீராவி விரிவடைதல் அனல் மின் நிலையங்களில் பயன்படுவது.',
          },
        },
        {
          id: 'opt-4',
          text: { en: 'Nuclear beta decay', ta: 'அணுக்கரு பீட்டா சிதைவு' },
          isCorrect: false,
          explanation: {
            en: 'Solar panels contain zero radioactive decay materials.',
            ta: 'சூரிய மின்கலங்களில் கதிரியக்கப் பொருட்கள் இல்லை.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'Sunlight and wind provide unlimited, zero-carbon energy to power modern society.',
      ta: 'சூரிய ஒளியும் காற்றும் கார்பன் மாசற்ற முடிவில்லா தூய ஆற்றலை மனிதகுலத்திற்கு வழங்குகின்றன.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=core&subjectId=physics&pathwayId=phy-c-2',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'Harnessing Natural Energy Flows', ta: 'இயற்கை ஆற்றலை அறுவடை செய்தல்' },
        content: {
          en: 'More solar energy strikes Earth in a single hour than the entire human civilization consumes in an entire year. Tapping this energy cleanly is humanity’s great sustainable transition.',
          ta: 'மனிதகுலம் ஓராண்டில் பயன்படுத்தும் மொத்த ஆற்றலை விட அதிக ஆற்றலை சூரியன் ஒரே மணி நேரத்தில் பூமிக்கு அளிக்கிறது.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'renewable_energy',
        visualCaption: {
          en: 'Solar Photons → Silicon Cell → DC Electric Current. Wind → Blades → Generator → AC Grid.',
          ta: 'சூரிய ஒளி → சிலிக்கான் செல் → DC மின்சாரம். காற்று → இறக்கைகள் → மின்னாக்கி → மின் கட்டமைப்பு.',
        },
        content: {
          en: 'Wind power is actually indirect solar power: uneven solar heating of Earth’s surface creates global air currents.',
          ta: 'காற்றாற்றல் என்பது உண்மையில் மறைமுக சூரிய ஆற்றலே: பூமியின் சீரற்ற வெப்பநிலையே காற்றை உருவாக்குகிறது.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'Combining solar, wind, hydro, and battery storage creates stable 24/7 electrical grids without burning fossil fuels.',
          ta: 'சூரியன், காற்று மற்றும் மின்கலங்களை இணைத்து நாள் முழுவதும் தடையற்ற தூய மின்சாரத்தைப் பெற முடியும்.',
        },
        rememberStatement: {
          en: 'Renewable energy protects air quality and halts greenhouse gas accumulation.',
          ta: 'புதுப்பிக்கத்தக்க ஆற்றல் காற்றுத் தூய்மையைப் பாதுகாத்து புவி வெப்பமயமாதலைத் தடுக்கிறது.',
        },
      },
    ],
  },

  // ==========================================
  // HUMAN BODY (2 Lessons)
  // ==========================================
  {
    id: 'micro-human-heart',
    title: { en: 'The Human Heart & Blood Circulation', ta: 'மனித இதயமும் இரத்த ஓட்டமும்' },
    subtitle: { en: 'Four Chambers & Dual Circulation', ta: 'நான்கு அறைகளும் இரட்டை இரத்த ஓட்டமும்' },
    description: {
      en: 'Learn how your muscular heart pumps blood through 100,000 kilometers of vessels over 100,000 beats daily.',
      ta: 'மனித இதயம் 4 அறைகள் மூலம் உடலின் அனைத்து பாகங்களுக்கும் ஆக்சிஜன் இரத்தத்தை செலுத்தும் முறையை அறியவும்.',
    },
    subject: 'human-body',
    category: 'Human Physiology',
    gradeRange: 'Grades 8–10',
    gradeGroup: 'secondary',
    durationMinutes: 2,
    difficulty: 'easy',
    icon: '🫀',
    visualType: 'human_heart',
    keyPoints: [
      {
        en: 'The human heart has four muscular chambers: right/left atria (top) and right/left ventricles (bottom).',
        ta: 'மனித இதயம் நான்கு அறைகளைக் கொண்டது: இரண்டு ஆரிக்கிள்கள் (மேல்) மற்றும் இரண்டு வென்ட்ரிக்கிள்கள் (கீழ்).',
      },
      {
        en: 'The right side pumps oxygen-poor blood to the lungs; the left side pumps oxygen-rich blood to the entire body.',
        ta: 'வலது பகுதி அசுத்த இரத்தத்தை நுரையீரலுக்கும், இடது பகுதி சுத்த இரத்தத்தை உடலின் பிற பாகங்களுக்கும் செலுத்துகிறது.',
      },
      {
        en: 'Valves act as one-way doors, preventing blood from flowing backward during contractions.',
        ta: 'இதய வால்வுகள் இரத்தம் பின்னோக்கி பாய்வதைத் தடுக்கும் ஒருவழி கதவுகளாக செயல்படுகின்றன.',
      },
    ],
    quickCheck: {
      question: {
        en: 'Which chamber of the heart has the thickest muscular wall to pump oxygenated blood throughout the entire body?',
        ta: 'உடல் முழுவதற்கும் இரத்தத்தை அழுத்தமாகச் செலுத்த தடித்த தசைச்சுவரைக் கொண்டுள்ள இதய அறை எது?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: 'Left Ventricle', ta: 'இடது வென்ட்ரிக்கிள்' },
          isCorrect: true,
          explanation: {
            en: 'The left ventricle must generate high pressure to force blood into the aorta and through all systemic capillaries.',
            ta: 'இடது வென்ட்ரிக்கிள் மகா தமனி வழியாக உடல் முழுவதும் இரத்தத்தை உந்த தடித்த சுவரைக் கொண்டுள்ளது.',
          },
        },
        {
          id: 'opt-2',
          text: { en: 'Right Atrium', ta: 'வலது ஆரிக்கிள்' },
          isCorrect: false,
          explanation: {
            en: 'The right atrium is a thin-walled chamber receiving returning venous blood from the body.',
            ta: 'வலது ஆரிக்கிள் உடலிலிருந்து திரும்பும் இரத்தத்தைப் பெறும் மெல்லிய சுவர் கொண்ட அறை.',
          },
        },
        {
          id: 'opt-3',
          text: { en: 'Right Ventricle', ta: 'வலது வென்ட்ரிக்கிள்' },
          isCorrect: false,
          explanation: {
            en: 'The right ventricle only pumps blood a short distance to the nearby lungs.',
            ta: 'வலது வென்ட்ரிக்கிள் அருகிலுள்ள நுரையீரலுக்கு மட்டுமே இரத்தத்தை அனுப்புகிறது.',
          },
        },
        {
          id: 'opt-4',
          text: { en: 'Left Atrium', ta: 'இடது ஆரிக்கிள்' },
          isCorrect: false,
          explanation: {
            en: 'The left atrium only receives blood from pulmonary veins and drops it into the ventricle.',
            ta: 'இடது ஆரிக்கிள் நுரையீரலில் இருந்து இரத்தத்தைப் பெற்று கீழே அனுப்புகிறது.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'Right side to lungs for oxygen; Left side to body for life.',
      ta: 'வலது பகுதி நுரையீரலுக்கு ஆக்சிஜனுக்காக; இடது பகுதி உடலுக்கு வாழ்விற்காக.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=core&subjectId=biology&pathwayId=bio-c-2',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'A Tireless Muscular Pump', ta: 'ஓய்வில்லா தசை பம்ப்' },
        content: {
          en: 'Your heart beats around 70 to 80 times every minute, pumping roughly 5 liters of blood through your circulatory system in just 60 seconds.',
          ta: 'இதயம் நிமிடத்திற்கு 70 முதல் 80 முறை துடிக்கிறது. ஒரு நிமிடத்தில் சுமார் 5 லிட்டர் இரத்தத்தை உடல் முழுவதும் சுழற்றுகிறது.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'human_heart',
        visualCaption: {
          en: 'Deoxygenated blood (Blue, Right) → Lungs → Oxygenated blood (Red, Left) → Body.',
          ta: 'அசுத்த இரத்தம் (நீலம், வலது) → நுரையீரல் → சுத்த இரத்தம் (சிவப்பு, இடது) → உடல்.',
        },
        content: {
          en: 'Arteries carry oxygenated blood away from the heart; Veins return deoxygenated blood back toward the heart.',
          ta: 'தமனிகள் இதயத்திலிருந்து இரத்தத்தை வெளியே கொண்டு செல்கின்றன; சிறைகள் இரத்தத்தை இதயத்திற்குத் திரும்பக் கொண்டு வருகின்றன.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'The familiar "lub-dub" sound of a heartbeat is caused by the rhythmic snapping shut of heart valves.',
          ta: 'இதயத்தின் "லப்-டப்" ஒலி இதய வால்வுகள் அடுத்தடுத்து மூடுவதால் ஏற்படுகிறது.',
        },
        rememberStatement: {
          en: 'The heart is a dual pump maintaining continuous one-way circulation of life-giving blood.',
          ta: 'இதயம் என்பது இரத்தத்தை ஒரு திசையில் இடைவிடாது சுழல வைக்கும் இரட்டை பம்ப் ஆகும்.',
        },
      },
    ],
  },
  {
    id: 'micro-human-brain-reflexes',
    title: { en: 'The Human Brain & Reflex Action', ta: 'மனித மூளையும் அனிச்சைச் செயலும்' },
    subtitle: { en: 'Neurons, Synapses & Spinal Reflex Arcs', ta: 'நியூரான்கள், சினாப்ஸ் மற்றும் தண்டுவட அனிச்சை' },
    description: {
      en: 'Understand how your nervous system pulls your hand off a hot stove before your brain even feels the pain.',
      ta: 'சூடான பாத்திரத்தைத் தொடும்போது மூளை உணர்வதற்கு முன்பே கையை விலக்கிக் கொள்ளும் அனிச்சை செயலை அறியவும்.',
    },
    subject: 'human-body',
    category: 'Neurobiology',
    gradeRange: 'Grades 8–10',
    gradeGroup: 'secondary',
    durationMinutes: 2,
    difficulty: 'medium',
    icon: '🧠',
    visualType: 'human_brain',
    keyPoints: [
      {
        en: 'The central nervous system consists of the Brain and the Spinal Cord.',
        ta: 'மைய நரம்பு மண்டலம் மூளை மற்றும் தண்டுவடத்தால் ஆனது.',
      },
      {
        en: 'Neurons transmit electrochemical signals across microscopic junction gaps called synapses.',
        ta: 'நியூரான்கள் சினாப்ஸ் எனப்படும் இணைப்புகள் வழியாக மின்-வேதியியல் சமிக்கைகளைக் கடத்துகின்றன.',
      },
      {
        en: 'A reflex arc bypasses the brain: the spinal cord triggers immediate muscle contraction to prevent tissue damage.',
        ta: 'அனிச்சை செயல் தண்டுவடத்தால் உடனடியாக இயக்கப்பட்டு விபத்துகளிலிருந்து உடலைப் பாதுகாக்கிறது.',
      },
    ],
    quickCheck: {
      question: {
        en: 'When you touch a sharp thorn, what part of your central nervous system commands your arm muscles to pull back instantly?',
        ta: 'முள் குத்தும்போது மூளை உணரும் முன்பே கையை உடனடியாக பின்னிழுக்க உத்தரவிடும் நரம்பு மையம் எது?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: 'The spinal cord (Reflex Arc)', ta: 'தண்டுவடம் (அனிச்சை வில்)' },
          isCorrect: true,
          explanation: {
            en: 'The spinal cord processes emergency reflex loops directly without waiting for brain deliberation.',
            ta: 'தண்டுவடம் மூளையின் முடிவிற்காகக் காத்திருக்காமல் தன்னிச்சையாக உடனடி உத்தரவை அனுப்புகிறது.',
          },
        },
        {
          id: 'opt-2',
          text: { en: 'The frontal lobe of cerebrum', ta: 'பெருமூளையின் முன் மடல்' },
          isCorrect: false,
          explanation: {
            en: 'The cerebrum registers the conscious pain after the hand has already jerked back safely.',
            ta: 'பெருமூளை கை விலகிய பிறகே வலியை உணர்ந்து பதிவு செய்கிறது.',
          },
        },
        {
          id: 'opt-3',
          text: { en: 'The pituitary gland', ta: 'பிட்யூட்டரி சுரப்பி' },
          isCorrect: false,
          explanation: {
            en: 'The pituitary gland releases hormones slowly into the bloodstream, not instant nerve pulses.',
            ta: 'பிட்யூட்டரி ஹார்மோன்களை மட்டுமே சுரக்கும், நரம்பு தூண்டல்களை அல்ல.',
          },
        },
        {
          id: 'opt-4',
          text: { en: 'The optic nerve', ta: 'பார்வை நரம்பு' },
          isCorrect: false,
          explanation: {
            en: 'The optic nerve carries visual data from eyes to the occipital cortex.',
            ta: 'பார்வை நரம்பு கண்களில் இருந்து காட்சிகளை மட்டுமே கொண்டு செல்லும்.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'Reflexes bypass conscious thinking to save you from burning or tissue injury.',
      ta: 'அனிச்சை செயல்கள் சிந்திக்கும் நேரத்தை மிச்சப்படுத்தி நம்மை உடனடி காயங்களிலிருந்து காக்கின்றன.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=core&subjectId=biology&pathwayId=bio-c-2',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'The Most Complex Structure in the Universe', ta: 'மிகவும் சிக்கலான கட்டமைப்பு' },
        content: {
          en: 'Your brain contains roughly 86 billion neurons, each making up to 10,000 synaptic connections. It weighs only 1.4 kg yet consumes 20% of your body’s daily resting energy.',
          ta: 'மனித மூளையில் சுமார் 86 பில்லியன் நியூரான்கள் உள்ளன. உடல் எடையில் 2% மட்டுமே இருந்தாலும், 20% ஆற்றலை மூளையே பயன்படுத்துகிறது.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'human_brain',
        visualCaption: {
          en: 'Sensory Receptor (Finger) → Sensory Neuron → Spinal Cord Interneuron → Motor Neuron → Arm Muscle.',
          ta: 'உணர்வு வாங்கி → உணர்வு நரம்பு → தண்டுவடம் → இயக்க நரம்பு → கை தசை.',
        },
        content: {
          en: 'Electrical impulses flash along myelinated nerve fibers at speeds up to 120 meters per second (430 km/h).',
          ta: 'நரம்புத் தூண்டல்கள் வினாடிக்கு 120 மீட்டர் (மணிக்கு 430 கி.மீ) வேகத்தில் மின்னல் போல் பாய்கின்றன.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'Cerebrum handles thought, Cerebellum coordinates balance, Brainstem controls automatic heartbeat and breathing.',
          ta: 'பெருமூளை சிந்தனையையும், சிறுமூளை சமநிலையையும், மூளைத்தண்டு சுவாசத்தையும் இதயத் துடிப்பையும் கட்டுப்படுத்துகின்றன.',
        },
        rememberStatement: {
          en: 'Sensory neurons carry signals in; motor neurons carry action commands out.',
          ta: 'உணர்வு நரம்புகள் தகவலை உள்ளே கொண்டு செல்கின்றன; இயக்க நரம்புகள் கட்டளைகளை வெளியே கொண்டு வருகின்றன.',
        },
      },
    ],
  },

  // ==========================================
  // EVERYDAY SCIENCE (2 Lessons)
  // ==========================================
  {
    id: 'micro-why-ice-floats',
    title: { en: 'Why Does Ice Float?', ta: 'பனிக்கட்டி நீரில் மிதப்பது ஏன்?' },
    subtitle: { en: 'Anomalous Expansion & Density of Water', ta: 'நீரின் மாறுபட்ட விரிவடைதலும் அடர்த்தியும்' },
    description: {
      en: 'Discover the extraordinary anomaly of water that allows fish to survive beneath frozen winter lakes.',
      ta: 'நீர் உறையும் போது விரிவடைவதாலும், அதன் அடர்த்தி குறைவதாலும் நீர்வாழ் உயிரினங்கள் தப்பிக்கும் அறிவியல் விந்தையை அறியவும்.',
    },
    subject: 'everyday-science',
    category: 'Everyday Physics',
    gradeRange: 'Grades 6–7',
    gradeGroup: 'junior',
    durationMinutes: 2,
    difficulty: 'easy',
    icon: '🧊',
    visualType: 'ice_floating',
    keyPoints: [
      {
        en: 'Almost all substances shrink and become denser as they freeze; water is a rare exception.',
        ta: 'பெரும்பாலான பொருட்கள் உறையும் போது சுருங்கி அடர்த்தி அதிகமாகும்; ஆனால் நீர் இதற்கு விதிவிலக்கு.',
      },
      {
        en: 'Water reaches its maximum density at +4°C. As it cools further to 0°C, hydrogen bonds expand into an open hexagonal crystal lattice.',
        ta: 'நீர் 4°C வெப்பநிலையில் அதிகபட்ச அடர்த்தியைப் பெறுகிறது. 0°C இல் உறையும் போது விரிவடைகிறது.',
      },
      {
        en: 'Because ice is roughly 9% less dense than liquid water, it floats, insulating liquid water below.',
        ta: 'பனிக்கட்டி நீரை விட 9% குறைந்த அடர்த்தி கொண்டிருப்பதால் மிதந்து அடியில் உள்ள நீரை உறைவதிலிருந்து காக்கிறது.',
      },
    ],
    quickCheck: {
      question: {
        en: 'At what temperature does pure liquid water reach its absolute maximum density?',
        ta: 'தூய நீர் தனது அதிகபட்ச அடர்த்தியை அடையும் வெப்பநிலை எது?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: '4°C', ta: '4°C' },
          isCorrect: true,
          explanation: {
            en: 'Water is densest at 4°C. Below 4°C, molecular structural expansion begins, lowering density until freezing at 0°C.',
            ta: 'நீர் 4°C-ல் மிக அதிக அடர்த்தியுடன் இருக்கும். அதற்கு கீழே குளிர்விக்கும் போது விரிவடைந்து அடர்த்தி குறைகிறது.',
          },
        },
        {
          id: 'opt-2',
          text: { en: '0°C', ta: '0°C' },
          isCorrect: false,
          explanation: {
            en: 'At 0°C water has already frozen into lower-density crystalline ice.',
            ta: '0°C-ல் நீர் குறைந்த அடர்த்தி கொண்ட பனிக்கட்டியாக உறைந்து விடுகிறது.',
          },
        },
        {
          id: 'opt-3',
          text: { en: '100°C', ta: '100°C' },
          isCorrect: false,
          explanation: {
            en: 'At 100°C water boils and has expanded to its lowest liquid density.',
            ta: '100°C-ல் நீர் கொதித்து ஆவியாகிறது; அப்போது அடர்த்தி மிகவும் குறைவு.',
          },
        },
        {
          id: 'opt-4',
          text: { en: '-4°C', ta: '-4°C' },
          isCorrect: false,
          explanation: {
            en: 'At -4°C water is already solid ice.',
            ta: '-4°C-ல் நீர் பனிக்கட்டியாக உறைந்திருக்கும்.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'Ice floats because water expands when it freezes, creating a protective thermal ceiling for aquatic life.',
      ta: 'உறையும் போது நீர் விரிவடைந்து அடர்த்தி குறைவதால் பனிக்கட்டி மிதந்து நீர்வாழ் உயிரினங்களைக் காக்கிறது.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=foundation&subjectId=chemistry&pathwayId=chem-f-1',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'The Strange Behavior of Water', ta: 'நீரின் விசித்திரமான பண்பு' },
        content: {
          en: 'Most liquids pack tighter as they cool. But water molecules form unique hydrogen bonds that force molecules into an open, spacious hexagonal structure below 4°C, trapping empty spaces.',
          ta: 'பொதுவாக பொருட்கள் குளிர்ந்தால் மூலக்கூறுகள் நெருங்கும். ஆனால் நீர் 4°C-க்கு கீழே செல்லும் போது ஹைட்ரஜன் பிணைப்புகளால் விரிவடைந்து வெற்றிடங்களை உருவாக்குகிறது.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'ice_floating',
        visualCaption: {
          en: 'Liquid water molecules tumble closely together; Ice crystal lattice locks molecules into spaced hexagons.',
          ta: 'திரவ நீரில் மூலக்கூறுகள் நெருக்கமாக உள்ளன; பனிக்கட்டியில் திறந்த அறுங்கோண வடிவில் இடைவெளி அதிகம் உள்ளது.',
        },
        content: {
          en: 'If ice sank like other solids, lakes and oceans would freeze solid from the bottom up, killing all marine life.',
          ta: 'பனிக்கட்டி மூழ்கினால் குளங்கள் அடியிலிருந்து உறைந்து அனைத்து மீன்களும் இறந்துவிடும்.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'Burst pipes in freezing winters happen because freezing water expands with immense hydraulic pressure.',
          ta: 'குளிர்காலத்தில் குழாய்கள் வெடிப்பதற்குக் காரணம் நீர் உறையும் போது ஏற்படும் பெருமளவு விரிவடைதல் அழுத்தமே.',
        },
        rememberStatement: {
          en: 'Water’s anomalous expansion protects aquatic ecosystems throughout winter freezes.',
          ta: 'நீரின் மாறுபட்ட விரிவடைதல் குளிர்காலத்தில் நீர்வாழ் சூழலியலை உறைவதிலிருந்து பாதுகாக்கிறது.',
        },
      },
    ],
  },
  {
    id: 'micro-battery-chemistry',
    title: { en: 'How Batteries Store Energy', ta: 'மின்கலங்கள் ஆற்றலைச் சேமிக்கும் விதம்' },
    subtitle: { en: 'Redox Reactions & Chemical Potential', ta: 'ஆக்சிஜனேற்ற ஒடுக்க வினைகளும் மின் வேதியியலும்' },
    description: {
      en: 'Discover how smartphone batteries move lithium ions back and forth to power screens and processors.',
      ta: 'ஸ்மார்ட்போன் பேட்டரிகள் லித்தியம் அயனிகளை நகர்த்தி மின்சாரம் தரும் வேதியியல் ரகசியத்தை அறியவும்.',
    },
    subject: 'everyday-science',
    category: 'Electrochemistry',
    gradeRange: 'Grades 8–10',
    gradeGroup: 'secondary',
    durationMinutes: 2,
    difficulty: 'medium',
    icon: '🔋',
    visualType: 'battery_circuit',
    keyPoints: [
      {
        en: 'A battery stores potential energy chemically and converts it into electricity through redox reactions.',
        ta: 'மின்கலம் வேதி ஆற்றலைச் சேமித்து ஆக்சிஜனேற்ற ஒடுக்க வினைகள் மூலம் மின்னாற்றலாக மாற்றுகிறது.',
      },
      {
        en: 'Anode gives up electrons (oxidation); Cathode absorbs electrons (reduction); Electrolyte conducts ions internally.',
        ta: 'ஆனோட் எலக்ட்ரான்களை இழக்கிறது, கேத்தோட் எலக்ட்ரான்களை ஏற்கிறது, மின்பகுளி அயனிகளை கடத்துகிறது.',
      },
      {
        en: 'Rechargeable lithium-ion batteries reverse the ion flow when plugged into a charger.',
        ta: 'ரீசார்ஜ் செய்யும்போது வெளிப்புற மின்சாரம் அயனிகளை மீண்டும் தொடக்க நிலைக்குத் தள்ளுகிறது.',
      },
    ],
    quickCheck: {
      question: {
        en: 'In an electrochemical battery, what internal component blocks electrons while allowing ions to travel between electrodes?',
        ta: 'மின்கலத்தில் எலக்ட்ரான்களைத் தடுத்து அயனிகளை மட்டுமே கடத்தும் உட்புற ஊடகம் எது?',
      },
      options: [
        {
          id: 'opt-1',
          text: { en: 'The electrolyte and separator', ta: 'மின்பகுளி மற்றும் பிரிப்பான் (Electrolyte & Separator)' },
          isCorrect: true,
          explanation: {
            en: 'The electrolyte forces electrons to travel through the external circuit (powering your device) while conducting ions internally.',
            ta: 'மின்பகுளி அயனிகளை மட்டுமே கடத்தும்; இதனால் எலக்ட்ரான்கள் கம்பி வழியே சுற்றி வந்து சாதனத்தை இயக்குகின்றன.',
          },
        },
        {
          id: 'opt-2',
          text: { en: 'The metal outer casing', ta: 'வெளிப்புற உலோக உறை' },
          isCorrect: false,
          explanation: {
            en: 'The casing provides mechanical protection and containment.',
            ta: 'உறை வெளிப்புற பாதுகாப்பிற்கு மட்டுமே.',
          },
        },
        {
          id: 'opt-3',
          text: { en: 'The plastic label wrapper', ta: 'பிளாஸ்டிக் லேபிள் உறை' },
          isCorrect: false,
          explanation: {
            en: 'The label is for branding and user safety information.',
            ta: 'லேபிள் தகவல் தெரிந்துகொள்ள மட்டுமே.',
          },
        },
        {
          id: 'opt-4',
          text: { en: 'The charging plug pins', ta: 'சார்ஜிங் பின்ன்கள்' },
          isCorrect: false,
          explanation: {
            en: 'Plug pins are external connectors, not an internal battery component.',
            ta: 'சார்ஜிங் பின் வெளிப்புற இணைப்பு மட்டுமே.',
          },
        },
      ],
    },
    rememberStatement: {
      en: 'Electrons flow through the wire to power your phone; ions flow through the electrolyte to balance the charge.',
      ta: 'எலக்ட்ரான்கள் கம்பி வழியே பாய்ந்து போனை இயக்குகின்றன; அயனிகள் மின்பகுளி வழியே சமன் செய்கின்றன.',
    },
    learnRoute: '/learn',
    quizRoute: '/quiz-setup?levelId=core&subjectId=chemistry&pathwayId=chem-c-3',
    xpReward: 20,
    sections: [
      {
        kind: 'idea',
        title: { en: 'Chemical Energy on Demand', ta: 'தேவைப்படும் போது வேதி ஆற்றல்' },
        content: {
          en: 'A battery is a self-contained electrochemical factory. By keeping the anode and cathode separated, electrons can only travel from one side to the other when you connect an external circuit.',
          ta: 'மின்கலம் என்பது ஒரு சிறிய வேதியியல் மின் நிலையம். ஆனோடும் கேத்தோடும் பிரிக்கப்பட்டிருப்பதால் நீங்கள் சுவிட்ச் போடும் போது மட்டுமே எலக்ட்ரான்கள் பாய்கின்றன.',
        },
      },
      {
        kind: 'visual_diagram',
        visualType: 'battery_circuit',
        visualCaption: {
          en: 'Anode (-) releases electrons → Device lights up → Cathode (+) accepts electrons.',
          ta: 'ஆனோட் (-) எலக்ட்ரான்களை வெளியிடுகிறது → சாதனம் இயங்குகிறது → கேத்தோட் (+) எலக்ட்ரான்களை ஏற்கிறது.',
        },
        content: {
          en: 'In Lithium-ion batteries, Li+ ions shuttle back and forth between graphite layers and cobalt oxide layers.',
          ta: 'லித்தியம்-அயன் மின்கலங்களில் சார்ஜ் செய்யும் போது அயனிகள் ஒரு பக்கத்தில் இருந்து மறு பக்கத்திற்கு நகர்கின்றன.',
        },
      },
      {
        kind: 'remember',
        content: {
          en: 'Alessandro Volta invented the first electric battery in 1800 by stacking alternating zinc and copper discs separated by salty cardboard.',
          ta: 'அலெக்ஸாண்ட்ரோ வோல்டா 1800-ல் துத்தநாகம் மற்றும் செப்புத் தட்டுகளை உப்புநீரில் நனைத்த அட்டையுடன் அடுக்கி முதல் மின்கலத்தை உருவாக்கினார்.',
        },
        rememberStatement: {
          en: 'Batteries convert chemical energy into electrical energy through paired oxidation-reduction reactions.',
          ta: 'மின்கலங்கள் ஆக்சிஜனேற்ற-ஒடுக்க வினைகள் மூலம் வேதி ஆற்றலை மின்னாற்றலாக மாற்றுகின்றன.',
        },
      },
    ],
  },
];

export const MICRO_LESSON_COLLECTIONS: MicroLessonCollection[] = [
  {
    id: 'physics-basics',
    title: { en: 'Physics Basics', ta: 'இயற்பியல் அடிப்படைகள்' },
    description: {
      en: 'Master Newton’s Laws, light reflection, and the flow of electric charges.',
      ta: 'நியூட்டனின் விதிகள், ஒளி எதிரொளிப்பு மற்றும் மின்னோட்டத்தை எளிதாகக் கற்கவும்.',
    },
    icon: '⚡',
    lessonIds: [
      'micro-newtons-first-law',
      'micro-newtons-third-law',
      'micro-light-reflection',
      'micro-electric-circuits',
    ],
  },
  {
    id: 'space-explorer',
    title: { en: 'Space Explorer', ta: 'விண்வெளி ஆய்வாளர்' },
    description: {
      en: 'Journey across orbital paths, blue skies, lunar phases, and supernovae.',
      ta: 'கோள்களின் சுற்றுப்பாதை, நீல வானம், நிலவின் நிலைகள் மற்றும் விண்மீன்களை ஆராயுங்கள்.',
    },
    icon: '🚀',
    lessonIds: [
      'micro-solar-system-orbits',
      'micro-why-sky-blue',
      'micro-moon-phases',
      'micro-stars-black-holes',
    ],
  },
  {
    id: 'amazing-chemistry',
    title: { en: 'Amazing Chemistry', ta: 'அதிசய வேதியியல்' },
    description: {
      en: 'From atomic building blocks to acids, rusting, and the periodic table.',
      ta: 'அணுக்கள், அமில-காரங்கள், வேதிவினைகள் மற்றும் தனிம வரிசை அட்டவணை.',
    },
    icon: '🧪',
    lessonIds: [
      'micro-states-of-matter',
      'micro-atomic-structure',
      'micro-acids-bases-ph',
      'micro-chemical-reactions',
      'micro-periodic-table',
      'micro-solutions-solvents',
    ],
  },
  {
    id: 'human-body-life',
    title: { en: 'Life & The Human Body', ta: 'உயிரும் மனித உடலும்' },
    description: {
      en: 'Explore cell organelles, DNA blueprints, the beating heart, and lightning reflexes.',
      ta: 'செல்கள், DNA, துடிக்கும் இதயம் மற்றும் மின்னல் வேக அனிச்சை செயல்கள்.',
    },
    icon: '🫀',
    lessonIds: [
      'micro-cell-structure',
      'micro-dna-genetics',
      'micro-human-heart',
      'micro-human-brain-reflexes',
    ],
  },
  {
    id: 'science-around-you',
    title: { en: 'Science Around You', ta: 'சுற்றுச்சூழலும் அன்றாட அறிவியலும்' },
    description: {
      en: 'Understand clouds, solar energy, floating ice cubes, and lithium batteries.',
      ta: 'மேகங்கள், சூரிய ஆற்றல், மிதக்கும் பனிக்கட்டி மற்றும் பேட்டரி வேதியியல்.',
    },
    icon: '💡',
    lessonIds: [
      'micro-water-cycle',
      'micro-greenhouse-effect',
      'micro-renewable-energy',
      'micro-why-ice-floats',
      'micro-battery-chemistry',
    ],
  },
];

/** Quick lookup map by stable lesson ID */
export const MICRO_LESSONS_MAP: Record<string, MicroLesson> = MICRO_LESSONS.reduce(
  (acc, lesson) => {
    acc[lesson.id] = lesson;
    return acc;
  },
  {} as Record<string, MicroLesson>
);
