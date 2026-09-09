/**
 * Experiment Lab Starter Catalog
 * 15 rich, production-grade virtual science experiments across:
 * - Physics (6)
 * - Chemistry (4)
 * - Biology (2)
 * - Environment (2)
 * - Space (1)
 *
 * All experiments have 100% English and Tamil parity.
 */

import { Experiment, ExperimentSubjectMeta } from './experiment.types';

export const EXPERIMENT_SUBJECTS: ExperimentSubjectMeta[] = [
  {
    id: 'physics',
    title: { en: 'Physics', ta: 'இயற்பியல்' },
    subtitle: { en: 'Electricity, optics & mechanics', ta: 'மின்னியல், ஒளியியல் & இயக்கவியல்' },
    icon: '⚡',
    color: '#3B82F6',
  },
  {
    id: 'chemistry',
    title: { en: 'Chemistry', ta: 'வேதியியல்' },
    subtitle: { en: 'Solutions, pH & matter', ta: 'கரைசல்கள், pH & பருப்பொருள்' },
    icon: '🧪',
    color: '#8B5CF6',
  },
  {
    id: 'biology',
    title: { en: 'Biology', ta: 'உயிரியல்' },
    subtitle: { en: 'Living systems & physiology', ta: 'உயிர் அமைப்புகள் & உடலியல்' },
    icon: '🌿',
    color: '#10B981',
  },
  {
    id: 'environment',
    title: { en: 'Environment', ta: 'சுற்றுச்சூழல்' },
    subtitle: { en: 'Earth systems & climate', ta: 'புவி அமைப்புகள் & காலநிலை' },
    icon: '🌍',
    color: '#0D9488',
  },
  {
    id: 'space',
    title: { en: 'Space', ta: 'விண்வெளி' },
    subtitle: { en: 'Orbits & astronomy', ta: 'சுற்றுப்பாதைகள் & வானியல்' },
    icon: '🪐',
    color: '#6366F1',
  },
];

export const EXPERIMENTS: Experiment[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // PHYSICS (6 Experiments)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'exp-ohms-law',
    title: { en: "Ohm's Law", ta: 'ஓம் விதி' },
    subtitle: { en: 'Voltage, Resistance & Current', ta: 'மின்னழுத்தம், மின்தடை & மின்னோட்டம்' },
    description: {
      en: 'Discover how adjusting voltage and resistance controls the flow of electric current through a circuit.',
      ta: 'மின்னழுத்தம் மற்றும் மின்தடையை மாற்றுவது மின்சுற்றில் பாயும் மின்னோட்டத்தை எவ்வாறு மாற்றுகிறது என்பதை அறிக.',
    },
    subject: 'physics',
    gradeGroup: '8-10',
    durationMinutes: 3,
    difficulty: 'easy',
    heroAsset: '⚡',
    learningObjective: {
      en: 'Understand that electric current is directly proportional to voltage and inversely proportional to resistance.',
      ta: 'மின்னோட்டம் மின்னழுத்தத்திற்கு நேர்விகிதத்திலும், மின்தடைக்கு எதிர்விகிதத்திலும் இருக்கும் என்பதைப் புரிந்துகொள்ளுதல்.',
    },
    simulationId: 'ohms_law',
    variables: [
      {
        id: 'voltage',
        label: { en: 'Voltage (V)', ta: 'மின்னழுத்தம் (V)' },
        unit: 'V',
        unitTa: 'V',
        type: 'slider',
        min: 1,
        max: 12,
        step: 1,
        defaultValue: 6,
        description: { en: 'Electrical pressure pushing electrons', ta: 'எலக்ட்ரான்களை தள்ளும் மின் அழுத்தம்' },
      },
      {
        id: 'resistance',
        label: { en: 'Resistance (R)', ta: 'மின்தடை (R)' },
        unit: 'Ω',
        unitTa: 'Ω',
        type: 'slider',
        min: 1,
        max: 20,
        step: 1,
        defaultValue: 5,
        description: { en: 'Opposition to the flow of electric charge', ta: 'மின்னோட்டம் பாய்வதைத் தடுக்கும் தடை' },
      },
    ],
    observations: [
      {
        id: 'high_resistance',
        condition: (vars) => Number(vars.resistance) >= 10,
        title: { en: 'High Resistance Observation', ta: 'அதிக மின்தடை கவனிப்பு' },
        text: {
          en: 'As resistance increased, current decreased, causing the bulb to glow dimmer.',
          ta: 'மின்தடை அதிகரித்ததும், மின்னோட்டம் குறைந்து விளக்கு மங்கலாக ஒளிர்கிறது.',
        },
        explanation: {
          en: 'Resistance hinders the flow of electrons. According to I = V / R, larger R yields smaller I.',
          ta: 'மின்தடை எலக்ட்ரான்களின் ஓட்டத்தைத் தடுக்கிறது. I = V / R சூத்திரப்படி, R கூடும் போது I குறையும்.',
        },
      },
      {
        id: 'high_voltage',
        condition: (vars) => Number(vars.voltage) >= 9,
        title: { en: 'High Voltage Observation', ta: 'அதிக மின்னழுத்த கவனிப்பு' },
        text: {
          en: 'Increasing voltage pushed more current through the circuit, making the bulb brighter.',
          ta: 'மின்னழுத்தத்தை அதிகரித்தது மின்சுற்றில் அதிக மின்னோட்டத்தை செலுத்தி விளக்கை பிரகாசமாக ஒளிரச் செய்தது.',
        },
        explanation: {
          en: 'Higher voltage provides more electrical potential energy per unit charge to drive current.',
          ta: 'அதிக மின்னழுத்தம் மின்னோட்டத்தை இயக்க அதிக மின் அழுத்த ஆற்றலை வழங்குகிறது.',
        },
      },
    ],
    reflectionQuestion: {
      question: {
        en: 'If you keep voltage constant at 10V and double the resistance from 5Ω to 10Ω, what happens to the current?',
        ta: 'மின்னழுத்தத்தை 10V இல் நிலையாக வைத்து, மின்தடையை 5Ω இலிருந்து 10Ω ஆக இரட்டிப்பாக்கினால் மின்னோட்டம் என்னவாகும்?',
      },
      options: [
        { id: 'opt_double', text: { en: 'It doubles', ta: 'இரட்டிப்பாகும்' } },
        { id: 'opt_halves', text: { en: 'It halves', ta: 'பாதியாகக் குறையும்' } },
        { id: 'opt_same', text: { en: 'It stays the same', ta: 'மாறாமல் இருக்கும்' } },
      ],
      correctOptionId: 'opt_halves',
      explanation: {
        en: 'Because I = V / R, doubling the denominator cuts the electric current in half (from 2A to 1A).',
        ta: 'I = V / R என்பதால், மின்தடை இரட்டிப்பாகும்போது மின்னோட்டம் பாதியாகக் குறைகிறது (2A இலிருந்து 1A ஆக).',
      },
    },
    keyTakeaways: {
      en: [
        "Ohm's Law formula is V = I × R (Current I = Voltage / Resistance).",
        'Higher voltage increases current; higher resistance decreases current.',
        'Electrical resistance is measured in Ohms (Ω) and current in Amperes (A).',
      ],
      ta: [
        'ஓம் விதியின் சூத்திரம் V = I × R (மின்னோட்டம் I = V / R) ஆகும்.',
        'அதிக மின்னழுத்தம் மின்னோட்டத்தை அதிகரிக்கும்; அதிக மின்தடை மின்னோட்டத்தைக் குறைக்கும்.',
        'மின்தடை ஓம் (Ω) அலகிலும், மின்னோட்டம் ஆம்பியர் (A) அலகிலும் அளவிடப்படுகிறது.',
      ],
    },
    conceptMapId: 'map-electric-circuits',
    microLessonId: 'micro-electricity-basics',
    quizReference: { subject: 'physics', topic: 'electricity' },
    xpReward: 25,
    tags: ['ohms law', 'electricity', 'circuit', 'voltage', 'current', 'resistance'],
  },

  {
    id: 'exp-density',
    title: { en: 'Density & Buoyancy', ta: 'அடர்த்தி & மிதத்தல்' },
    subtitle: { en: 'Mass, Volume & Sinking/Floating', ta: 'நிறை, பருமன் & மூழ்குதல்/மிதத்தல்' },
    description: {
      en: 'Change mass and volume to see whether an object floats or sinks in water.',
      ta: 'நிறை மற்றும் பருமனைக் கொண்டு ஒரு பொருள் நீரில் மிதக்குமா அல்லது மூழ்குமா என்பதைக் கண்டறியவும்.',
    },
    subject: 'physics',
    gradeGroup: '6-7',
    durationMinutes: 2,
    difficulty: 'easy',
    heroAsset: '⚖️',
    learningObjective: {
      en: 'Learn that density is mass divided by volume, and objects float when their density is less than water (1.0 g/cm³).',
      ta: 'அடர்த்தி என்பது நிறையை பருமனினால் வகுப்பது என்பதையும், நீரின் அடர்த்தியை (1.0 கி/செ.மீ³) விட குறைவான பொருட்கள் மிதக்கும் என்பதையும் அறிதல்.',
    },
    simulationId: 'density',
    variables: [
      {
        id: 'mass',
        label: { en: 'Mass (m)', ta: 'நிறை (m)' },
        unit: 'g',
        unitTa: 'கி',
        type: 'slider',
        min: 20,
        max: 300,
        step: 10,
        defaultValue: 80,
      },
      {
        id: 'volume',
        label: { en: 'Volume (V)', ta: 'பருமன் (V)' },
        unit: 'cm³',
        unitTa: 'செ.மீ³',
        type: 'slider',
        min: 20,
        max: 200,
        step: 10,
        defaultValue: 100,
      },
    ],
    observations: [
      {
        id: 'density_float',
        condition: (vars) => Number(vars.mass) < Number(vars.volume),
        title: { en: 'Floating State', ta: 'மிதக்கும் நிலை' },
        text: {
          en: 'The object has density less than 1.0 g/cm³, so buoyant upward force keeps it floating.',
          ta: 'பொருளின் அடர்த்தி 1.0 கி/செ.மீ³ விட குறைவாக இருப்பதால், மிதப்பு விசை அதை மிதக்க வைக்கிறது.',
        },
        explanation: {
          en: 'An object displaces an amount of water equal to its weight while staying on the surface.',
          ta: 'ஒரு பொருள் தனது எடைக்கு சமமான நீரை இடப்பெயர்ச்சி செய்து மேற்பரப்பில் மிதக்கிறது.',
        },
      },
      {
        id: 'density_sink',
        condition: (vars) => Number(vars.mass) > Number(vars.volume),
        title: { en: 'Sinking State', ta: 'மூழ்கும் நிலை' },
        text: {
          en: 'The object has density greater than 1.0 g/cm³, so gravity pulls it to the bottom.',
          ta: 'பொருளின் அடர்த்தி 1.0 கி/செ.மீ³ விட அதிகமாக இருப்பதால், புவியீர்ப்பு அதை அடியில் மூழ்கடிக்கிறது.',
        },
        explanation: {
          en: 'Because mass is tightly packed into small volume, the buoyant force cannot support it.',
          ta: 'சிறிய பருமனில் அதிக நிறை செறிந்துள்ளதால், மிதப்பு விசையால் அதைத் தாங்க முடிவதில்லை.',
        },
      },
    ],
    reflectionQuestion: {
      question: {
        en: 'A block has a mass of 120g and a volume of 60 cm³. What will it do in water?',
        ta: 'ஒரு கட்டியின் நிறை 120கி மற்றும் பருமன் 60 செ.மீ³. அது நீரில் என்னவாகும்?',
      },
      options: [
        { id: 'opt_sink', text: { en: 'Sink (Density = 2.0 g/cm³)', ta: 'மூழ்கும் (அடர்த்தி = 2.0 கி/செ.மீ³)' } },
        { id: 'opt_float', text: { en: 'Float (Density = 0.5 g/cm³)', ta: 'மிதக்கும் (அடர்த்தி = 0.5 கி/செ.மீ³)' } },
        { id: 'opt_evaporate', text: { en: 'Dissolve instantly', ta: 'உடனடியாக கரையும்' } },
      ],
      correctOptionId: 'opt_sink',
      explanation: {
        en: 'Density = 120g / 60 cm³ = 2.0 g/cm³. Since 2.0 is greater than 1.0 g/cm³, the block sinks.',
        ta: 'அடர்த்தி = 120 / 60 = 2.0 கி/செ.மீ³. இது நீரின் அடர்த்தியை (1.0) விட அதிகம் என்பதால் மூழ்கும்.',
      },
    },
    keyTakeaways: {
      en: [
        'Density formula is Mass divided by Volume (ρ = m / V).',
        'Water has a reference density of approximately 1.0 g/cm³.',
        'Objects with density < 1.0 float; objects with density > 1.0 sink.',
      ],
      ta: [
        'அடர்த்தி சூத்திரம்: நிறை / பருமன் (ρ = m / V).',
        'நீரின் ஒப்பீட்டு அடர்த்தி தோராயமாக 1.0 கி/செ.மீ³ ஆகும்.',
        'அடர்த்தி < 1.0 உள்ள பொருட்கள் மிதக்கும்; > 1.0 உள்ளவை மூழ்கும்.',
      ],
    },
    microLessonId: 'micro-density-buoyancy',
    quizReference: { subject: 'physics', topic: 'density' },
    xpReward: 25,
    tags: ['density', 'buoyancy', 'mass', 'volume', 'floating', 'sinking'],
  },

  {
    id: 'exp-reflection',
    title: { en: 'Reflection of Light', ta: 'ஒளி எதிரொளிப்பு' },
    subtitle: { en: 'Angle of Incidence & Angle of Reflection', ta: 'படுகோணம் & எதிரொளிப்பு கோணம்' },
    description: {
      en: 'Change the incident light beam angle and verify the law of reflection on a plane mirror.',
      ta: 'படுகதிரின் கோணத்தை மாற்றி சமதள ஆடியில் ஒளி எதிரொளிப்பு விதியைச் சரிபார்க்கவும்.',
    },
    subject: 'physics',
    gradeGroup: '8-10',
    durationMinutes: 2,
    difficulty: 'easy',
    heroAsset: '🪞',
    learningObjective: {
      en: 'Confirm that the angle of incidence always equals the angle of reflection.',
      ta: 'படுகோணம் எப்போதும் எதிரொளிப்பு கோணத்திற்கு சமமாக இருக்கும் என்பதை உறுதிப்படுத்துதல்.',
    },
    simulationId: 'reflection',
    variables: [
      {
        id: 'angle',
        label: { en: 'Angle of Incidence', ta: 'படுகோணம்' },
        unit: '°',
        unitTa: '°',
        type: 'slider',
        min: 0,
        max: 80,
        step: 5,
        defaultValue: 30,
        description: { en: 'Angle measured relative to the surface normal line', ta: 'செங்குத்துக் கோட்டிலிருந்து அளவிடப்படும் கோணம்' },
      },
    ],
    observations: [
      {
        id: 'angle_symmetry',
        condition: () => true,
        title: { en: 'Symmetrical Reflection', ta: 'சமச்சீர் எதிரொளிப்பு' },
        text: {
          en: 'The reflected ray bounces off at the exact same angle on the opposite side of the normal line.',
          ta: 'எதிரொளிப்பு கதிர் செங்குத்துக் கோட்டின் மறுபுறத்தில் அதே கோணத்தில் விலகிச் செல்கிறது.',
        },
        explanation: {
          en: 'Light travels in straight lines and respects specular reflection: Angle i = Angle r.',
          ta: 'ஒளி நேர்க்கோட்டில் செல்கிறது மற்றும் ஒழுங்கான எதிரொளிப்பு விதியை பின்பற்றுகிறது: படுகோணம் = எதிரொளிப்பு கோணம்.',
        },
      },
    ],
    reflectionQuestion: {
      question: {
        en: 'If a ray of light strikes a flat mirror at an angle of 45° to the normal, what is the angle of reflection?',
        ta: 'செங்குத்துக் கோட்டிற்கு 45° கோணத்தில் ஒரு சமதள ஆடியில் படும் ஒளிக்கதிரின் எதிரொளிப்பு கோணம் என்ன?',
      },
      options: [
        { id: 'opt_90', text: { en: '90°', ta: '90°' } },
        { id: 'opt_45', text: { en: '45°', ta: '45°' } },
        { id: 'opt_0', text: { en: '0°', ta: '0°' } },
      ],
      correctOptionId: 'opt_45',
      explanation: {
        en: 'According to the first law of reflection, the angle of reflection is always equal to the angle of incidence (45°).',
        ta: 'எதிரொளிப்பு விதியின்படி, எதிரொளிப்பு கோணம் எப்போதும் படுகோணத்திற்கு சமமாகும் (45°).',
      },
    },
    keyTakeaways: {
      en: [
        'The normal is an imaginary line perpendicular to the mirror surface.',
        'Angle of incidence (i) equals angle of reflection (r).',
        'Incident ray, reflected ray, and normal all lie in the same plane.',
      ],
      ta: [
        'செங்குத்துக் கோடு என்பது ஆடிப் பரப்பிற்கு 90° இல் உள்ள ஒரு கற்பனைக் கோடாகும்.',
        'படுகோணம் (i) = எதிரொளிப்பு கோணம் (r).',
        'படுகதிர், எதிரொளிப்புக் கதிர் மற்றும் செங்குத்துக் கோடு ஆகியவை ஒரே தளத்தில் அமையும்.',
      ],
    },
    conceptMapId: 'map-light-and-optics',
    microLessonId: 'micro-light-reflection',
    quizReference: { subject: 'physics', topic: 'optics' },
    xpReward: 25,
    tags: ['reflection', 'light', 'mirror', 'optics', 'angles'],
  },

  {
    id: 'exp-refraction',
    title: { en: 'Refraction of Light', ta: 'ஒளி விலகல்' },
    subtitle: { en: "Light Bending Across Media (Snell's Law)", ta: 'ஊடகங்களில் ஒளி வளைதல் (ஸ்நெல் விதி)' },
    description: {
      en: 'Observe how light changes direction when moving between air, water, glass, and diamond.',
      ta: 'காற்று, நீர், கண்ணாடி மற்றும் வைரம் இடையே ஒளி செல்லும்போது அதன் பாதை எவ்வாறு மாறுகிறது என்பதைக் கவனிக்கவும்.',
    },
    subject: 'physics',
    gradeGroup: '8-10',
    durationMinutes: 3,
    difficulty: 'medium',
    heroAsset: '🔍',
    learningObjective: {
      en: 'Discover that light bends toward the normal when entering a denser medium due to speed change.',
      ta: 'அடர்வு மிகுந்த ஊடகத்திற்குள் செல்லும்போது ஒளியின் வேகம் குறைந்து செங்குத்துக் கோட்டை நோக்கி வளைகிறது என்பதை அறிதல்.',
    },
    simulationId: 'refraction',
    variables: [
      {
        id: 'angle',
        label: { en: 'Incidence Angle', ta: 'படுகோணம்' },
        unit: '°',
        unitTa: '°',
        type: 'slider',
        min: 10,
        max: 75,
        step: 5,
        defaultValue: 45,
      },
      {
        id: 'medium2',
        label: { en: 'Second Medium', ta: 'இரண்டாம் ஊடகம்' },
        unit: '',
        type: 'segmented',
        defaultValue: 'water',
        options: [
          { value: 'water', label: { en: 'Water (n=1.33)', ta: 'நீர் (n=1.33)' } },
          { value: 'glass', label: { en: 'Glass (n=1.50)', ta: 'கண்ணாடி (n=1.50)' } },
          { value: 'diamond', label: { en: 'Diamond (n=2.42)', ta: 'வைரம் (n=2.42)' } },
        ],
      },
    ],
    observations: [
      {
        id: 'dense_bending',
        condition: (vars) => vars.medium2 === 'diamond',
        title: { en: 'Strong Refraction in Diamond', ta: 'வைரத்தின் அதிக ஒளிவிலகல்' },
        text: {
          en: 'Diamond has a very high refractive index (2.42), bending the light beam sharply toward the normal.',
          ta: 'வைரம் மிக அதிக ஒளிவிலகல் எண் (2.42) கொண்டுள்ளதால், ஒளிக்கதிர் செங்குத்துக் கோட்டை நோக்கி கூர்மையாக வளைகிறது.',
        },
        explanation: {
          en: 'Light slows down substantially inside diamond (~124,000 km/s compared to 300,000 km/s in air).',
          ta: 'வைரத்திற்குள் ஒளியின் வேகம் பெருமளவு குறைகிறது (காற்றில் 300,000 கி.மீ/வி, வைரத்தில் 124,000 கி.மீ/வி).',
        },
      },
    ],
    reflectionQuestion: {
      question: {
        en: 'When light passes from air into water, why does its path bend?',
        ta: 'காற்றிலிருந்து நீருக்குள் ஒளி செல்லும்போது அதன் பாதை ஏன் வளைகிறது?',
      },
      options: [
        { id: 'opt_speed', text: { en: 'Its speed decreases in water', ta: 'நீரில் அதன் வேகம் குறைகிறது' } },
        { id: 'opt_color', text: { en: 'Its color changes in water', ta: 'நீரில் அதன் நிறம் மாறுகிறது' } },
        { id: 'opt_mass', text: { en: 'Light gains mass in water', ta: 'ஒளி நீரில் நிறையைப் பெறுகிறது' } },
      ],
      correctOptionId: 'opt_speed',
      explanation: {
        en: 'Refraction occurs because light travels at different speeds in different optical media.',
        ta: 'வெவ்வேறு ஊடகங்களில் ஒளி வெவ்வேறு வேகங்களில் பயணிப்பதால் ஒளிவிலகல் ஏற்படுகிறது.',
      },
    },
    keyTakeaways: {
      en: [
        'Refraction is the bending of light as it passes between different optical materials.',
        'Light bends towards the normal when moving from a rarer to a denser medium.',
        'The refractive index (n) measures how much a medium slows down light.',
      ],
      ta: [
        'ஒளி ஒரு ஊடகத்திலிருந்து மற்றொரு ஊடகத்திற்குச் செல்லும்போது திசை மாறுவதே ஒளிவிலகல் ஆகும்.',
        'அடர்வு குறைந்த ஊடகத்திலிருந்து அடர்வு மிகுந்த ஊடகத்திற்குச் செல்லும்போது செங்குத்துக் கோட்டை நோக்கி வளைகிறது.',
        'ஒளிவிலகல் எண் (n) என்பது ஒளி எவ்வளவு மெதுவாகிறது என்பதைக் குறிக்கிறது.',
      ],
    },
    conceptMapId: 'map-light-and-optics',
    microLessonId: 'micro-light-refraction',
    quizReference: { subject: 'physics', topic: 'refraction' },
    xpReward: 25,
    tags: ['refraction', 'snells law', 'light', 'optics', 'water', 'glass'],
  },

  {
    id: 'exp-free-fall',
    title: { en: 'Free Fall Mechanics', ta: 'தடையற்ற வீழ்ச்சி' },
    subtitle: { en: 'Drop Height & Planetary Gravity', ta: 'விழும் உயரம் & கோள்களின் ஈர்ப்பு' },
    description: {
      en: 'Drop an object in vacuum from various heights on Earth, the Moon, and Mars to compare fall time and velocity.',
      ta: 'பூமி, சந்திரன் மற்றும் செவ்வாயில் வெவ்வேறு உயரங்களிலிருந்து ஒரு பொருளைப் போட்டு விழும் நேரத்தையும் வேகத்தையும் ஒப்பிடவும்.',
    },
    subject: 'physics',
    gradeGroup: '8-10',
    durationMinutes: 3,
    difficulty: 'medium',
    heroAsset: '⏱️',
    learningObjective: {
      en: 'Understand that in free fall without air resistance, gravitational acceleration determines speed and time.',
      ta: 'காற்றின் தடையற்ற நிலையில், புவியீர்ப்பு முடுக்கமே விழும் நேரத்தையும் வேகத்தையும் தீர்மானிக்கிறது என்பதைப் புரிந்துகொள்ளுதல்.',
    },
    simulationId: 'free_fall',
    variables: [
      {
        id: 'height',
        label: { en: 'Drop Height', ta: 'விழும் உயரம்' },
        unit: 'm',
        unitTa: 'மீ',
        type: 'slider',
        min: 5,
        max: 100,
        step: 5,
        defaultValue: 20,
      },
      {
        id: 'planet',
        label: { en: 'Celestial Body', ta: 'வான்பொருள்' },
        unit: '',
        type: 'segmented',
        defaultValue: 'earth',
        options: [
          { value: 'earth', label: { en: 'Earth (9.8 m/s²)', ta: 'பூமி (9.8 மீ/வி²)' } },
          { value: 'moon', label: { en: 'Moon (1.6 m/s²)', ta: 'சந்திரன் (1.6 மீ/வி²)' } },
          { value: 'mars', label: { en: 'Mars (3.7 m/s²)', ta: 'செவ்வாய் (3.7 மீ/வி²)' } },
        ],
      },
    ],
    observations: [
      {
        id: 'moon_slow',
        condition: (vars) => vars.planet === 'moon',
        title: { en: 'Slow Moon Fall', ta: 'சந்திரனில் மெதுவான வீழ்ச்சி' },
        text: {
          en: 'On the Moon, gravity is only ~1/6th of Earth, so the object floats down much slower.',
          ta: 'சந்திரனில் ஈர்ப்பு விசை பூமியின் 1/6 பங்கு மட்டுமே என்பதால் பொருள் மிக மெதுவாக விழுகிறது.',
        },
        explanation: {
          en: 'Weaker gravitational acceleration g produces longer fall time t = √(2h / g).',
          ta: 'குறைவான ஈர்ப்பு முடுக்கம் g அதிக விழும் நேரத்தை t = √(2h / g) தருகிறது.',
        },
      },
    ],
    reflectionQuestion: {
      question: {
        en: 'If you drop a hammer from 20m on the Moon versus Earth, on which body does it hit the ground faster?',
        ta: 'சந்திரனிலும் பூமியிலும் 20மீ உயரத்திலிருந்து ஒரு சுத்தியலை கீழே போட்டால் எங்கு விரைவாக தரையைத் தொடும்?',
      },
      options: [
        { id: 'opt_earth', text: { en: 'Earth (stronger gravity)', ta: 'பூமி (அதிக ஈர்ப்பு விசை)' } },
        { id: 'opt_moon', text: { en: 'Moon (weaker gravity)', ta: 'சந்திரன் (குறைந்த ஈர்ப்பு விசை)' } },
        { id: 'opt_same', text: { en: 'Exact same time', ta: 'ஒரே நேரத்தில்' } },
      ],
      correctOptionId: 'opt_earth',
      explanation: {
        en: "Earth's acceleration (9.8 m/s²) is roughly six times greater than the Moon's (1.6 m/s²), accelerating the object to the ground much faster.",
        ta: 'பூமியின் ஈர்ப்பு முடுக்கம் (9.8 மீ/வி²) சந்திரனை (1.6 மீ/வி²) விட 6 மடங்கு அதிகம் என்பதால் பூமியில் மிக வேகமாகத் தரையைத் தொடும்.',
      },
    },
    keyTakeaways: {
      en: [
        'Free fall speed depends on gravitational acceleration (g) and fall height (h).',
        'In a vacuum, all objects accelerate at the exact same rate regardless of mass.',
        'Impact speed is v = √(2gh).',
      ],
      ta: [
        'தடையற்ற வீழ்ச்சியின் வேகம் ஈர்ப்பு முடுக்கம் (g) மற்றும் உயரத்தை (h) சார்ந்தது.',
        'வெற்றிடத்தில் நிறையைப் பொருட்படுத்தாமல் அனைத்துப் பொருட்களும் ஒரே முடுக்கத்தில் விழும்.',
        'தரை தொடும் வேகம் v = √(2gh).',
      ],
    },
    conceptMapId: 'map-force-and-motion',
    microLessonId: 'micro-gravity-free-fall',
    quizReference: { subject: 'physics', topic: 'gravity' },
    xpReward: 25,
    tags: ['free fall', 'gravity', 'mechanics', 'acceleration', 'moon', 'earth'],
  },

  {
    id: 'exp-pendulum',
    title: { en: 'Simple Pendulum', ta: 'தனி ஊசல்' },
    subtitle: { en: 'Length, Mass & Period of Oscillation', ta: 'நீளம், நிறை & அலைவு காலம்' },
    description: {
      en: 'Investigate which variable truly controls the swing period of a pendulum: string length or bob mass.',
      ta: 'ஊசலின் அலைவு நேரத்தை உண்மையில் கட்டுப்படுத்துவது எது: கயிற்றின் நீளமா அல்லது குண்டின் நிறையா என்பதை ஆராயுங்கள்.',
    },
    subject: 'physics',
    gradeGroup: '8-10',
    durationMinutes: 3,
    difficulty: 'medium',
    heroAsset: '🕰️',
    learningObjective: {
      en: 'Prove that the oscillation period depends strictly on length (T = 2π√(L/g)) and is independent of mass.',
      ta: 'அலைவு நேரம் கயிற்றின் நீளத்தை மட்டுமே சார்ந்தது (T = 2π√(L/g)) மற்றும் நிறையைச் சார்ந்தது அல்ல என்பதை நிரூபித்தல்.',
    },
    simulationId: 'pendulum',
    variables: [
      {
        id: 'length',
        label: { en: 'String Length', ta: 'கயிற்றின் நீளம்' },
        unit: 'm',
        unitTa: 'மீ',
        type: 'slider',
        min: 0.2,
        max: 2.0,
        step: 0.1,
        defaultValue: 1.0,
      },
      {
        id: 'mass',
        label: { en: 'Bob Mass', ta: 'குண்டின் நிறை' },
        unit: 'g',
        unitTa: 'கி',
        type: 'slider',
        min: 50,
        max: 500,
        step: 50,
        defaultValue: 100,
      },
    ],
    observations: [
      {
        id: 'mass_independent',
        condition: () => true,
        title: { en: 'Independence of Mass', ta: 'நிறையைச் சாராத தன்மை' },
        text: {
          en: 'Changing the mass from 50g to 500g does not alter the oscillation time at all!',
          ta: 'நிறையை 50கி இலிருந்து 500கி ஆக மாற்றினாலும் அலைவு நேரம் சிறிதும் மாறவில்லை!',
        },
        explanation: {
          en: 'Gravitational restoring force increases with mass, but so does inertia, perfectly cancelling mass out.',
          ta: 'நிறை கூடும் போது ஈர்ப்பு மீட்டளிக்கும் விசை கூடுகிறது, அதே சமயம் நிலைமமும் கூடி நிறையை ரத்து செய்கிறது.',
        },
      },
    ],
    reflectionQuestion: {
      question: {
        en: 'To make a grandfather clock tick slower (longer period), what should you do to the pendulum?',
        ta: 'ஒரு பழங்கால கடிகாரத்தை மெதுவாக ஓட வைக்க (அதிக அலைவு நேரம்), ஊசலை என்ன செய்ய வேண்டும்?',
      },
      options: [
        { id: 'opt_longer', text: { en: 'Make the pendulum longer', ta: 'ஊசலின் நீளத்தை அதிகரிக்க வேண்டும்' } },
        { id: 'opt_heavier', text: { en: 'Make the bob heavier', ta: 'குண்டின் நிறையை அதிகரிக்க வேண்டும்' } },
        { id: 'opt_shorter', text: { en: 'Make the pendulum shorter', ta: 'ஊசலின் நீளத்தைக் குறைக்க வேண்டும்' } },
      ],
      correctOptionId: 'opt_longer',
      explanation: {
        en: 'Period T is proportional to √L. Increasing length increases the time required for each complete swing.',
        ta: 'அலைவு நேரம் T என்பது √L க்கு நேர்விகிதத்தில் இருக்கும். நீளத்தை அதிகரிப்பது அலைவு நேரத்தை அதிகரிக்கும்.',
      },
    },
    keyTakeaways: {
      en: [
        'A pendulum period is T = 2π√(L/g).',
        'Period increases when string length increases.',
        'Bob mass and small swing angles do not affect the period.',
      ],
      ta: [
        'தனி ஊசலின் அலைவு நேரம் T = 2π√(L/g).',
        'கயிற்றின் நீளம் கூடும் போது அலைவு காலம் கூடும்.',
        'குண்டின் நிறையும் சிறிய வீச்சுக் கோணங்களும் அலைவு நேரத்தை மாற்றுவதில்லை.',
      ],
    },
    conceptMapId: 'map-force-and-motion',
    microLessonId: 'micro-pendulum-motion',
    quizReference: { subject: 'physics', topic: 'motion' },
    xpReward: 25,
    tags: ['pendulum', 'oscillation', 'period', 'mechanics', 'motion'],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CHEMISTRY (4 Experiments)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'exp-ph-explorer',
    title: { en: 'Digital pH Explorer', ta: 'டிஜிட்டல் pH ஆய்வாளர்' },
    subtitle: { en: 'Acids, Bases & Universal Indicator', ta: 'அமிலங்கள், காரங்கள் & உலகளாவிய நிறங்காட்டி' },
    description: {
      en: 'Safely test everyday household solutions on a virtual pH scale from 0 to 14.',
      ta: 'அன்றாட வீட்டு கரைசல்களை 0 முதல் 14 வரையிலான மெய்நிகர் pH அளவில் பாதுகாப்பாக சோதிக்கவும்.',
    },
    subject: 'chemistry',
    gradeGroup: '8-10',
    durationMinutes: 2,
    difficulty: 'easy',
    heroAsset: '🧪',
    learningObjective: {
      en: 'Learn that solutions with pH < 7 are acidic, pH = 7 is neutral, and pH > 7 are alkaline/basic.',
      ta: 'pH < 7 அமிலங்கள், pH = 7 நடுநிலை, pH > 7 காரங்கள் என்பதை அறிந்துகொள்ளுதல்.',
    },
    simulationId: 'ph_explorer',
    variables: [
      {
        id: 'substance',
        label: { en: 'Tested Substance', ta: 'சோதிக்கப்படும் பொருள்' },
        unit: '',
        type: 'segmented',
        defaultValue: 'pure_water',
        options: [
          { value: 'lemon_juice', label: { en: 'Lemon Juice', ta: 'எலுமிச்சை சாறு' } },
          { value: 'milk', label: { en: 'Milk', ta: 'பால்' } },
          { value: 'pure_water', label: { en: 'Pure Water', ta: 'தூய நீர்' } },
          { value: 'soap_solution', label: { en: 'Soap Solution', ta: 'சோப்புக் கரைசல்' } },
          { value: 'bleach', label: { en: 'Bleach Solution', ta: 'சலவைக் கரைசல்' } },
        ],
      },
    ],
    observations: [
      {
        id: 'neutral_pure_water',
        condition: (vars) => vars.substance === 'pure_water',
        title: { en: 'Neutral Pure Water', ta: 'நடுநிலை தூய நீர்' },
        text: {
          en: 'Pure water shows green indicator color at pH 7.0, balancing H+ and OH- ions.',
          ta: 'தூய நீர் pH 7.0 இல் பச்சை நிறத்தைக் காட்டுகிறது, H+ மற்றும் OH- அயனிகள் சமநிலையில் உள்ளன.',
        },
        explanation: {
          en: 'Neutral substances have equal concentrations of hydrogen and hydroxide ions.',
          ta: 'நடுநிலை பொருட்களில் ஹைட்ரஜன் மற்றும் ஹைட்ராக்சைடு அயனிகளின் செறிவு சமமாக இருக்கும்.',
        },
      },
    ],
    reflectionQuestion: {
      question: {
        en: 'If a mystery liquid turns the universal indicator red with a pH of 2.5, what is it?',
        ta: 'ஒரு திரவம் உலகளாவிய நிறங்காட்டியை சிவப்பு நிறமாக மாற்றி pH 2.5 ஐக் காட்டினால் அது என்ன?',
      },
      options: [
        { id: 'opt_acid', text: { en: 'Strong Acid', ta: 'வலுவான அமிலம்' } },
        { id: 'opt_neutral', text: { en: 'Pure Neutral Water', ta: 'தூய நடுநிலை நீர்' } },
        { id: 'opt_base', text: { en: 'Strong Base', ta: 'வலுவான காரம்' } },
      ],
      correctOptionId: 'opt_acid',
      explanation: {
        en: 'Values below 7 are acidic. A pH near 2 is a strong acid with a high concentration of H+ ions.',
        ta: '7க்கு குறைவான மதிப்புகள் அமிலங்களாகும். pH 2 என்பது அதிக H+ அயனிகளைக் கொண்ட வலுவான அமிலமாகும்.',
      },
    },
    keyTakeaways: {
      en: [
        'The pH scale ranges from 0 (very acidic) to 14 (very alkaline).',
        'pH 7 is pure neutral.',
        'Acids turn indicators red/orange; bases turn indicators blue/purple.',
      ],
      ta: [
        'pH அளவு 0 (அதிக அமிலம்) முதல் 14 (அதிக காரம்) வரை உள்ளது.',
        'pH 7 என்பது நடுநிலையைக் குறிக்கிறது.',
        'அமிலங்கள் நிறங்காட்டியை சிவப்பு/ஆரஞ்சாகவும், காரங்கள் நீலம்/ஊதாவாகவும் மாற்றும்.',
      ],
    },
    conceptMapId: 'map-acids-and-bases',
    microLessonId: 'micro-acids-bases-ph',
    quizReference: { subject: 'chemistry', topic: 'acids_bases' },
    xpReward: 25,
    tags: ['ph', 'chemistry', 'acids', 'bases', 'indicators'],
  },

  {
    id: 'exp-solubility',
    title: { en: 'Solubility & Temperature', ta: 'கரைதிறன் & வெப்பநிலை' },
    subtitle: { en: 'Solute Dissolution & Saturation Limit', ta: 'கரைபொருள் கரைதல் & தெவிட்டிய நிலை' },
    description: {
      en: 'Warm up water and observe how thermal energy allows more sugar or salt to dissolve before settling as residue.',
      ta: 'நீரைச் சூடாக்கி, அதிக கரைபொருளைக் கரைக்கும் திறனை வெப்பநிலை எவ்வாறு அதிகரிக்கிறது என்பதைப் பாருங்கள்.',
    },
    subject: 'chemistry',
    gradeGroup: '8-10',
    durationMinutes: 3,
    difficulty: 'medium',
    heroAsset: '☕',
    learningObjective: {
      en: 'Discover how temperature influences the maximum amount of solid solute that can dissolve in a liquid.',
      ta: 'ஒரு திரவத்தில் கரையக்கூடிய திடக் கரைபொருளின் அதிகபட்ச அளவை வெப்பநிலை எவ்வாறு தீர்மானிக்கிறது என்பதை அறிதல்.',
    },
    simulationId: 'solubility',
    variables: [
      {
        id: 'temperature',
        label: { en: 'Water Temperature', ta: 'நீரின் வெப்பநிலை' },
        unit: '°C',
        unitTa: '°C',
        type: 'slider',
        min: 10,
        max: 90,
        step: 10,
        defaultValue: 20,
      },
      {
        id: 'soluteGrams',
        label: { en: 'Added Solute (Sugar)', ta: 'சேர்க்கப்பட்ட கரைபொருள் (சர்க்கரை)' },
        unit: 'g',
        unitTa: 'கி',
        type: 'slider',
        min: 50,
        max: 250,
        step: 10,
        defaultValue: 200,
      },
    ],
    observations: [
      {
        id: 'temp_solubility_boost',
        condition: (vars) => Number(vars.temperature) >= 60,
        title: { en: 'Hot Water Dissolution', ta: 'வெந்நீரில் விரைவாகக் கரைதல்' },
        text: {
          en: 'High water temperature breaks molecular bonds, allowing far more solute to dissolve without precipitate.',
          ta: 'அதிக நீர் வெப்பநிலை மூலக்கூறு பிணைப்புகளை தளர்த்தி, அதிக கரைபொருளைப் படியாமல் கரைக்க உதவுகிறது.',
        },
        explanation: {
          en: 'Water molecules at higher temperatures possess greater kinetic energy to surround and hydrate solute molecules.',
          ta: 'அதிக வெப்பநிலையில் உள்ள நீர் மூலக்கூறுகள் கரைபொருளைச் சுற்றி பிரிக்க அதிக இயக்க ஆற்றலைக் கொண்டுள்ளன.',
        },
      },
    ],
    reflectionQuestion: {
      question: {
        en: 'What happens when a hot saturated sugar solution cools down to room temperature?',
        ta: 'சூடான தெவிட்டிய சர்க்கரைக் கரைசல் அறை வெப்பநிலைக்குக் குளிர்ந்தால் என்னவாகும்?',
      },
      options: [
        { id: 'opt_crystals', text: { en: 'Excess sugar crystallizes out', ta: 'கூடுதல் சர்க்கரை படிகங்களாக படியும்' } },
        { id: 'opt_vanish', text: { en: 'The sugar completely vanishes', ta: 'சர்க்கரை முழுவதும் மறைந்துவிடும்' } },
        { id: 'opt_boil', text: { en: 'The water starts boiling', ta: 'நீர் கொதிக்கத் தொடங்கும்' } },
      ],
      correctOptionId: 'opt_crystals',
      explanation: {
        en: 'As temperature drops, solubility capacity decreases, forcing excess dissolved solute to precipitate as crystals.',
        ta: 'வெப்பநிலை குறையும் போது கரைதிறன் குறைவதால், அதிகப்படியான கரைபொருள் படிகங்களாக வெளிவருகிறது.',
      },
    },
    keyTakeaways: {
      en: [
        'Solubility is the maximum amount of solute that dissolves in a given solvent.',
        'For most solids, solubility increases with temperature.',
        'A saturated solution cannot dissolve any more solute at that temperature.',
      ],
      ta: [
        'கரைதிறன் என்பது ஒரு குறிப்பிட்ட கரைப்பானில் கரையக்கூடிய அதிகபட்ச கரைபொருளின் அளவாகும்.',
        'பெரும்பாலான திடப்பொருட்களுக்கு வெப்பநிலை கூடும் போது கரைதிறன் கூடும்.',
        'தெவிட்டிய கரைசலில் அதே வெப்பநிலையில் மேற்கொண்டு கரைபொருளைக் கரைக்க முடியாது.',
      ],
    },
    conceptMapId: 'map-states-of-matter',
    microLessonId: 'micro-solutions-solubility',
    quizReference: { subject: 'chemistry', topic: 'solutions' },
    xpReward: 25,
    tags: ['solubility', 'solution', 'temperature', 'sugar', 'chemistry'],
  },

  {
    id: 'exp-states-of-matter',
    title: { en: 'States of Matter', ta: 'பருப்பொருளின் நிலைகள்' },
    subtitle: { en: 'Thermal Kinetic Particle Motion', ta: 'வெப்ப இயக்க துகள் இயக்கம்' },
    description: {
      en: 'Heat or cool water from -30°C to 120°C to see particles transform between solid, liquid, and gas.',
      ta: '-30°C முதல் 120°C வரை நீரின் வெப்பநிலையை மாற்றி துகள்கள் திண்மம், திரவம், வாயுவாக மாறுவதைக் காண்க.',
    },
    subject: 'chemistry',
    gradeGroup: '6-7',
    durationMinutes: 2,
    difficulty: 'easy',
    heroAsset: '🧊',
    learningObjective: {
      en: 'Visualize how temperature dictates particle spacing, movement, and macroscopic state of matter.',
      ta: 'வெப்பநிலை துகள்களின் இடைவெளி, இயக்கம் மற்றும் பருப்பொருளின் நிலையை எவ்வாறு மாற்றுகிறது என்பதைக் காட்சிப்படுத்துதல்.',
    },
    simulationId: 'states_of_matter',
    variables: [
      {
        id: 'temperature',
        label: { en: 'Temperature', ta: 'வெப்பநிலை' },
        unit: '°C',
        unitTa: '°C',
        type: 'slider',
        min: -30,
        max: 120,
        step: 10,
        defaultValue: 25,
      },
    ],
    observations: [
      {
        id: 'solid_ice',
        condition: (vars) => Number(vars.temperature) < 0,
        title: { en: 'Solid Ice Crystal', ta: 'திண்ம பனிக்கட்டி' },
        text: {
          en: 'Below 0°C, particles are locked in place in a regular crystal lattice, only vibrating.',
          ta: '0°Cக்கு கீழே துகள்கள் ஒரு நிலையான படிக அமைப்பில் பிணைக்கப்பட்டு அதிர்கின்றன.',
        },
        explanation: {
          en: 'Low thermal energy allows intermolecular forces to hold water molecules rigid.',
          ta: 'குறைந்த வெப்ப ஆற்றல் மூலக்கூறிடை விசைகளை மூலக்கூறுகளை உறுதியாக வைத்திருக்க அனுமதிக்கிறது.',
        },
      },
      {
        id: 'gas_steam',
        condition: (vars) => Number(vars.temperature) >= 100,
        title: { en: 'Gaseous Steam', ta: 'வாயு நீராவி' },
        text: {
          en: 'Above 100°C, particles break free completely, bouncing rapidly across the entire container.',
          ta: '100°Cக்கு மேல் துகள்கள் முழுமையாக விடுபட்டு பாத்திரம் முழுவதும் வேகமாகப் பறக்கின்றன.',
        },
        explanation: {
          en: 'Thermal kinetic energy completely overcomes intermolecular attractions.',
          ta: 'துகள்களின் இயக்க ஆற்றல் மூலக்கூறுகளுக்கு இடையேயான ஈர்ப்பு விசையை விட அதிகமாகிறது.',
        },
      },
    ],
    reflectionQuestion: {
      question: {
        en: 'Why does steam take up so much more volume than liquid water?',
        ta: 'திரவ நீரை விட நீராவி ஏன் அதிக இடத்தை (பருமனை) எடுத்துக் கொள்கிறது?',
      },
      options: [
        { id: 'opt_spread', text: { en: 'Gas particles are far apart with empty space between them', ta: 'வாயு துகள்கள் அதிக இடைவெளியுடன் விலகி உள்ளன' } },
        { id: 'opt_bigger', text: { en: 'Individual molecules expand in size', ta: 'ஒவ்வொரு மூலக்கூறும் அளவில் பெரிதாகிறது' } },
        { id: 'opt_heavier', text: { en: 'Steam is much heavier than water', ta: 'நீராவி நீரை விட மிக அதிக எடையுடையது' } },
      ],
      correctOptionId: 'opt_spread',
      explanation: {
        en: 'In gases, high kinetic energy causes molecules to spread out widely with large empty gaps between them.',
        ta: 'வாயுக்களில் அதிக இயக்க ஆற்றல் காரணமாக மூலக்கூறுகள் தங்களுக்கு இடையே அதிக இடைவெளியுடன் விலகிச் செல்கின்றன.',
      },
    },
    keyTakeaways: {
      en: [
        'Solids have fixed shape and volume (particles vibrate in fixed positions).',
        'Liquids have fixed volume but take the container shape (particles slide past each other).',
        'Gases fill the entire available volume (particles move rapidly and independently).',
      ],
      ta: [
        'திண்மங்கள் நிலையான வடிவம் மற்றும் பருமன் கொண்டவை (துகள்கள் குறிப்பிட்ட இடத்தில் அதிர்கின்றன).',
        'திரவங்கள் நிலையான பருமன் கொண்டவை, பாத்திரத்தின் வடிவத்தை ஏற்கும்.',
        'வாயுக்கள் இருக்கும் இடம் முழுவதும் பரவும் (துகள்கள் அதிவேகமாக விலகி நகரும்).',
      ],
    },
    conceptMapId: 'map-states-of-matter',
    microLessonId: 'micro-states-of-matter',
    quizReference: { subject: 'chemistry', topic: 'states_of_matter' },
    xpReward: 25,
    tags: ['states of matter', 'solid', 'liquid', 'gas', 'kinetic theory', 'temperature'],
  },

  {
    id: 'exp-reaction-rate',
    title: { en: 'Chemical Reaction Rate', ta: 'வேதி வினை வேகம்' },
    subtitle: { en: 'Collision Theory & Reaction Speed', ta: 'மோதுகை கொள்கை & வினை வேகம்' },
    description: {
      en: 'Explore how increasing temperature, concentration, and surface area speeds up chemical reactions.',
      ta: 'வெப்பநிலை, செறிவு மற்றும் புறப்பரப்பளவை அதிகரிப்பது வேதி வினையின் வேகத்தை எவ்வாறு அதிகரிக்கிறது என்பதை ஆராயுங்கள்.',
    },
    subject: 'chemistry',
    gradeGroup: '8-10',
    durationMinutes: 3,
    difficulty: 'medium',
    heroAsset: '⚗️',
    learningObjective: {
      en: 'Understand that higher temperatures and surface area cause more frequent and energetic particle collisions.',
      ta: 'அதிக வெப்பநிலையும் புறப்பரப்பளவும் அதிக மற்றும் தீவிரமான துகள் மோதுகைகளை உருவாக்குகின்றன என்பதைப் புரிந்துகொள்ளுதல்.',
    },
    simulationId: 'reaction_rate',
    variables: [
      {
        id: 'temperature',
        label: { en: 'Reaction Temperature', ta: 'வினை வெப்பநிலை' },
        unit: '°C',
        unitTa: '°C',
        type: 'slider',
        min: 10,
        max: 80,
        step: 10,
        defaultValue: 30,
      },
      {
        id: 'concentration',
        label: { en: 'Reactant Concentration', ta: 'வினைபடு பொருள் செறிவு' },
        unit: '',
        type: 'segmented',
        defaultValue: 'medium',
        options: [
          { value: 'low', label: { en: 'Low (0.5M)', ta: 'குறைவு (0.5M)' } },
          { value: 'medium', label: { en: 'Medium (1.0M)', ta: 'நடுத்தரம் (1.0M)' } },
          { value: 'high', label: { en: 'High (2.0M)', ta: 'அதிகம் (2.0M)' } },
        ],
      },
      {
        id: 'surfaceArea',
        label: { en: 'Solid Surface Area', ta: 'திடப்பொருளின் புறப்பரப்பளவு' },
        unit: '',
        type: 'segmented',
        defaultValue: 'granules',
        options: [
          { value: 'chunk', label: { en: 'Large Chunk', ta: 'பெரிய துண்டு' } },
          { value: 'granules', label: { en: 'Granules', ta: 'சிறு மணிகள்' } },
          { value: 'powder', label: { en: 'Fine Powder', ta: 'நுண் தூள்' } },
        ],
      },
    ],
    observations: [
      {
        id: 'powder_fast',
        condition: (vars) => vars.surfaceArea === 'powder',
        title: { en: 'Powder Surface Area Boost', ta: 'நுண்தூள் புறப்பரப்பு வேகம்' },
        text: {
          en: 'Grinding the solid into powder exposes vastly more reactant particles to collisions, speeding up reaction.',
          ta: 'திடப்பொருளைத் தூளாக்குவது அதிக துகள்களை மோதுகைக்கு உட்படுத்தி வினையை விரைவுபடுத்துகிறது.',
        },
        explanation: {
          en: 'More surface area gives more collision contact sites per second.',
          ta: 'அதிக புறப்பரப்பளவு விநாடிக்கு அதிக மோதுகை தொடர்பு புள்ளிகளை வழங்குகிறது.',
        },
      },
    ],
    reflectionQuestion: {
      question: {
        en: 'According to collision theory, why does raising temperature speed up a chemical reaction?',
        ta: 'மோதுகை கொள்கையின்படி, வெப்பநிலையை உயர்த்துவது வேதி வினையை ஏன் துரிதப்படுத்துகிறது?',
      },
      options: [
        { id: 'opt_collisions', text: { en: 'Particles move faster and collide with more energy', ta: 'துகள்கள் வேகமாக நகர்ந்து அதிக ஆற்றலுடன் மோதுகின்றன' } },
        { id: 'opt_mass', text: { en: 'Particles gain extra mass', ta: 'துகள்கள் கூடுதல் நிறையைப் பெறுகின்றன' } },
        { id: 'opt_electrons', text: { en: 'Electrons stop moving', ta: 'எலக்ட்ரான்கள் நகர்வதை நிறுத்துகின்றன' } },
      ],
      correctOptionId: 'opt_collisions',
      explanation: {
        en: 'Higher temperature gives particles more kinetic energy, causing more frequent collisions that exceed the activation energy barrier.',
        ta: 'அதிக வெப்பநிலை துகள்களுக்கு அதிக இயக்க ஆற்றலை அளித்து, கிளர்வுறு ஆற்றலை விட அதிகமான மோதுகைகளை உருவாக்குகிறது.',
      },
    },
    keyTakeaways: {
      en: [
        'Chemical reactions require particles to collide with sufficient activation energy.',
        'Higher temperature increases collision frequency and energy.',
        'Higher concentration and larger surface area create more collision opportunities.',
      ],
      ta: [
        'வேதி வினைகள் நிகழ துகள்கள் போதுமான கிளர்வுறு ஆற்றலுடன் மோத வேண்டும்.',
        'அதிக வெப்பநிலை மோதுகை அதிர்வெண்ணையும் ஆற்றலையும் அதிகரிக்கிறது.',
        'அதிக செறிவு மற்றும் அதிக புறப்பரப்பளவு அதிக மோதுகை வாய்ப்புகளை உருவாக்குகின்றன.',
      ],
    },
    conceptMapId: 'map-chemical-reactions',
    microLessonId: 'micro-reaction-rates',
    quizReference: { subject: 'chemistry', topic: 'reactions' },
    xpReward: 25,
    tags: ['reaction rate', 'collision theory', 'chemistry', 'kinetics', 'catalyst'],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // BIOLOGY (2 Experiments)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'exp-photosynthesis',
    title: { en: 'Photosynthesis Rate', ta: 'ஒளிச்சேர்க்கை வீதம்' },
    subtitle: { en: 'Light Intensity, Carbon Dioxide & Oxygen', ta: 'ஒளிச் செறிவு, கார்பன் டை ஆக்சைடு & ஆக்ஸிஜன்' },
    description: {
      en: 'Control virtual light intensity and carbon dioxide levels to measure oxygen bubble output in water plants.',
      ta: 'நீர்த் தாவரங்களில் ஆக்ஸிஜன் குமிழ்கள் உருவாவதை அளவிட மெய்நிகர் ஒளிச்செறிவு மற்றும் CO₂ அளவைக் கட்டுப்படுத்துங்கள்.',
    },
    subject: 'biology',
    gradeGroup: '8-10',
    durationMinutes: 3,
    difficulty: 'medium',
    heroAsset: '🌱',
    learningObjective: {
      en: 'Understand that photosynthesis converts CO2, water, and light energy into glucose and oxygen.',
      ta: 'ஒளிச்சேர்க்கை CO₂, நீர் மற்றும் ஒளி ஆற்றலை குளுக்கோஸ் மற்றும் ஆக்ஸிஜனாக மாற்றுகிறது என்பதைப் புரிந்துகொள்ளுதல்.',
    },
    simulationId: 'photosynthesis',
    variables: [
      {
        id: 'lightIntensity',
        label: { en: 'Light Intensity', ta: 'ஒளிச் செறிவு' },
        unit: '%',
        unitTa: '%',
        type: 'slider',
        min: 0,
        max: 100,
        step: 10,
        defaultValue: 50,
      },
      {
        id: 'co2Level',
        label: { en: 'CO₂ Availability', ta: 'CO₂ இருப்பு' },
        unit: '%',
        unitTa: '%',
        type: 'slider',
        min: 0,
        max: 100,
        step: 10,
        defaultValue: 60,
      },
      {
        id: 'waterSupply',
        label: { en: 'Water Supply', ta: 'நீர் இருப்பு' },
        unit: '',
        type: 'segmented',
        defaultValue: 'normal',
        options: [
          { value: 'low', label: { en: 'Drought / Low', ta: 'வறட்சி / குறைவு' } },
          { value: 'normal', label: { en: 'Adequate', ta: 'போதுமானது' } },
          { value: 'high', label: { en: 'Abundant', ta: 'ஏராளமாக' } },
        ],
      },
    ],
    observations: [
      {
        id: 'limiting_light',
        condition: (vars) => Number(vars.lightIntensity) <= 20,
        title: { en: 'Light-Limited Photosynthesis', ta: 'ஒளி பற்றாக்குறை நிலை' },
        text: {
          en: 'With very low light, oxygen production slows dramatically regardless of how much CO2 is available.',
          ta: 'மிகக் குறைந்த வெளிச்சத்தில், எவ்வளவு CO₂ இருந்தாலும் ஆக்ஸிஜன் உற்பத்தி வெகுவாகக் குறைகிறது.',
        },
        explanation: {
          en: 'Light energy is required to split water molecules during the light-dependent stage.',
          ta: 'ஒளி சார்ந்த கட்டத்தில் நீர் மூலக்கூறுகளைப் பிரிக்க ஒளி ஆற்றல் அத்தியாவசியமாகும்.',
        },
      },
    ],
    reflectionQuestion: {
      question: {
        en: 'What are the two primary chemical products created by plants during photosynthesis?',
        ta: 'ஒளிச்சேர்க்கையின் போது தாவரங்களால் உருவாக்கப்படும் இரண்டு முதன்மை வேதிப் பொருட்கள் யாவை?',
      },
      options: [
        { id: 'opt_glucose_o2', text: { en: 'Glucose (sugar) and Oxygen', ta: 'குளுக்கோஸ் (சர்க்கரை) மற்றும் ஆக்ஸிஜன்' } },
        { id: 'opt_co2_water', text: { en: 'Carbon dioxide and water', ta: 'கார்பன் டை ஆக்சைடு மற்றும் நீர்' } },
        { id: 'opt_nitrogen', text: { en: 'Nitrogen gas and methane', ta: 'நைட்ரஜன் வாயு மற்றும் மீத்தேன்' } },
      ],
      correctOptionId: 'opt_glucose_o2',
      explanation: {
        en: 'The balanced equation is 6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ (glucose) + 6O₂ (oxygen).',
        ta: 'சமன்பாடு: 6CO₂ + 6H₂O + ஒளி ஆற்றல் → C₆H₁₂O₆ (குளுக்கோஸ்) + 6O₂ (ஆக்ஸிஜன்).',
      },
    },
    keyTakeaways: {
      en: [
        'Photosynthesis takes place inside chloroplasts containing green chlorophyll pigment.',
        'Inputs are Carbon Dioxide (CO₂), Water (H₂O), and sunlight.',
        'Outputs are Glucose (chemical food energy) and Oxygen gas (O₂).',
      ],
      ta: [
        'ஒளிச்சேர்க்கை பச்சையம் கொண்ட பசுங்கணிகங்களில் நடைபெறுகிறது.',
        'உள்ளீடுகள்: கார்பன் டை ஆக்சைடு, நீர் மற்றும் சூரிய ஒளி.',
        'வெளியீடுகள்: குளுக்கோஸ் (உணவு ஆற்றல்) மற்றும் ஆக்ஸிஜன் வாயு.',
      ],
    },
    conceptMapId: 'map-photosynthesis',
    microLessonId: 'micro-photosynthesis-plant-food',
    quizReference: { subject: 'biology', topic: 'photosynthesis' },
    xpReward: 25,
    tags: ['photosynthesis', 'plants', 'chlorophyll', 'oxygen', 'biology'],
  },

  {
    id: 'exp-heart-rate',
    title: { en: 'Heart Rate & Exercise', ta: 'இதயத் துடிப்பு & உடற்பயிற்சி' },
    subtitle: { en: 'Physical Activity & Cardiac Output', ta: 'உடல் செயல்பாடு & இதய வெளியீடு' },
    description: {
      en: 'Simulate how different physical activities affect pulse rate and breathing rate to meet muscle oxygen demands.',
      ta: 'தசைகளின் ஆக்ஸிஜன் தேவையைப் பூர்த்தி செய்ய பல்வேறு உடற்பயிற்சிகள் நாடித் துடிப்பு மற்றும் சுவாசத்தை எவ்வாறு மாற்றுகின்றன என்பதை உருவகப்படுத்துங்கள்.',
    },
    subject: 'biology',
    gradeGroup: '6-7',
    durationMinutes: 2,
    difficulty: 'easy',
    heroAsset: '💓',
    learningObjective: {
      en: 'Understand that physical exercise raises heart rate to deliver oxygenated blood more rapidly to working muscles.',
      ta: 'உடற்பயிற்சி வேலை செய்யும் தசைகளுக்கு ஆக்ஸிஜன் நிறைந்த இரத்தத்தை வேகமாக அனுப்ப இதயத் துடிப்பை உயர்த்துகிறது என்பதை அறிதல்.',
    },
    simulationId: 'heart_rate',
    variables: [
      {
        id: 'activity',
        label: { en: 'Activity State', ta: 'செயல்பாட்டு நிலை' },
        unit: '',
        type: 'segmented',
        defaultValue: 'rest',
        options: [
          { value: 'rest', label: { en: 'Resting', ta: 'ஓய்வு' } },
          { value: 'light_walk', label: { en: 'Walking', ta: 'நடைபயிற்சி' } },
          { value: 'jogging', label: { en: 'Jogging', ta: 'மெதுவோட்டம்' } },
          { value: 'sprint', label: { en: 'Sprinting', ta: 'விரைவோட்டம்' } },
        ],
      },
      {
        id: 'fitness',
        label: { en: 'Cardiovascular Fitness', ta: 'இதய நலம்' },
        unit: '',
        type: 'segmented',
        defaultValue: 'standard',
        options: [
          { value: 'standard', label: { en: 'Standard', ta: 'சாதாரண' } },
          { value: 'athletic', label: { en: 'Trained Athlete', ta: 'விளையாட்டு வீரர்' } },
        ],
      },
    ],
    observations: [
      {
        id: 'sprint_high_rate',
        condition: (vars) => vars.activity === 'sprint',
        title: { en: 'Maximum Oxygen Delivery', ta: 'அதிகபட்ச ஆக்ஸிஜன் வழங்கல்' },
        text: {
          en: 'During sprinting, heart rate spikes above 150 BPM and breathing quadruples to eliminate lactic acid.',
          ta: 'விரைவோட்டத்தின் போது இதயத் துடிப்பு 150 BPMக்கு மேல் உயர்ந்து, லாக்டிக் அமிலத்தை வெளியேற்ற சுவாசம் நான்கு மடங்கு அதிகரிக்கிறது.',
        },
        explanation: {
          en: 'Active muscles require rapid ATP regeneration, consuming oxygen at up to 20 times the resting rate.',
          ta: 'இயங்கும் தசைகளுக்கு விரைவான ATP ஆற்றல் தேவைப்படுவதால் ஓய்வு நிலையை விட 20 மடங்கு ஆக்ஸிஜன் தேவைப்படுகிறது.',
        },
      },
    ],
    reflectionQuestion: {
      question: {
        en: 'Why do trained athletes often have a lower resting heart rate than non-athletes?',
        ta: 'பயிற்சி பெற்ற விளையாட்டு வீரர்களுக்கு ஓய்வு நேரத்தில் குறைந்த இதயத் துடிப்பு இருக்க காரணம் என்ன?',
      },
      options: [
        { id: 'opt_stronger', text: { en: 'Their heart muscle is stronger and pumps more blood per beat', ta: 'இதய தசை வலுவாக இருப்பதால் ஒரு துடிப்பில் அதிக இரத்தத்தை செலுத்துகிறது' } },
        { id: 'opt_less_blood', text: { en: 'Their bodies contain less blood', ta: 'அவர்கள் உடலில் குறைந்த இரத்தமே உள்ளது' } },
        { id: 'opt_slow_lungs', text: { en: 'Their lungs work slower', ta: 'அவர்களின் நுரையீரல்கள் மெதுவாக இயங்குகின்றன' } },
      ],
      correctOptionId: 'opt_stronger',
      explanation: {
        en: 'Cardiovascular conditioning increases stroke volume (blood ejected per beat), so fewer beats are needed to maintain circulation.',
        ta: 'இதய உடற்பயிற்சி ஒரு துடிப்பில் வெளியேறும் இரத்த அளவை அதிகரிக்கிறது, இதனால் குறைவான துடிப்புகளே போதுமானது.',
      },
    },
    keyTakeaways: {
      en: [
        'Normal resting human heart rate is typically between 60 and 100 beats per minute.',
        'Physical exercise increases heart rate and breathing rate.',
        'Blood carries oxygen and glucose to muscle cells and carries away carbon dioxide.',
      ],
      ta: [
        'மனிதனின் சாதாரண ஓய்வு நேர இதயத் துடிப்பு நிமிடத்திற்கு 60 முதல் 100 துடிப்புகள் ஆகும்.',
        'உடற்பயிற்சி இதயத் துடிப்பையும் சுவாச விகிதத்தையும் அதிகரிக்கிறது.',
        'இரத்தம் தசை செல்களுக்கு ஆக்ஸிஜன் மற்றும் குளுக்கோஸைக் கொண்டு சென்று CO₂ ஐ வெளியேற்றுகிறது.',
      ],
    },
    conceptMapId: 'map-circulatory-system',
    microLessonId: 'micro-circulatory-system',
    quizReference: { subject: 'biology', topic: 'human_body' },
    xpReward: 25,
    tags: ['heart rate', 'cardiovascular', 'exercise', 'biology', 'pulse'],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ENVIRONMENT / EARTH (2 Experiments)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'exp-water-cycle',
    title: { en: 'The Water Cycle', ta: 'நீர் சுழற்சி' },
    subtitle: { en: 'Solar Energy, Evaporation & Precipitation', ta: 'சூரிய ஆற்றல், ஆவியாதல் & மழைப்பொழிவு' },
    description: {
      en: 'Manipulate sunlight intensity and ambient heat to see how solar energy drives evaporation, clouds, and rainfall.',
      ta: 'சூரிய ஒளி மற்றும் வெப்பநிலையை மாற்றி ஆவியாதல், மேகம் உருவாதல் மற்றும் மழையை எவ்வாறு இயக்குகிறது என்பதைப் பாருங்கள்.',
    },
    subject: 'environment',
    gradeGroup: '6-7',
    durationMinutes: 2,
    difficulty: 'easy',
    heroAsset: '🌧️',
    learningObjective: {
      en: 'Trace the movement of water between Earth and atmosphere through evaporation, condensation, and precipitation.',
      ta: 'ஆவியாதல், ஒடுக்கம் மற்றும் மழைப்பொழிவு மூலம் பூமிக்கும் வளிமண்டலத்திற்கும் இடையே நீரின் இயக்கத்தை அறிதல்.',
    },
    simulationId: 'water_cycle',
    variables: [
      {
        id: 'sunlight',
        label: { en: 'Solar Heat Intensity', ta: 'சூரிய வெப்பச் செறிவு' },
        unit: '%',
        unitTa: '%',
        type: 'slider',
        min: 10,
        max: 100,
        step: 10,
        defaultValue: 60,
      },
      {
        id: 'temperature',
        label: { en: 'Ambient Temperature', ta: 'சுற்றுப்புற வெப்பநிலை' },
        unit: '°C',
        unitTa: '°C',
        type: 'slider',
        min: 10,
        max: 45,
        step: 5,
        defaultValue: 30,
      },
    ],
    observations: [
      {
        id: 'high_rain',
        condition: (vars) => Number(vars.sunlight) >= 70 && Number(vars.temperature) >= 30,
        title: { en: 'Active Water Cycle Storm', ta: 'தீவிர நீர் சுழற்சி மழை' },
        text: {
          en: 'High solar heat evaporates surface moisture rapidly, building dense clouds that release heavy precipitation.',
          ta: 'அதிக சூரிய வெப்பம் நீரை வேகமாக ஆவியாக்கி, அடர்ந்த மேகங்களை உருவாக்கி கனமழையைப் பொழியச் செய்கிறது.',
        },
        explanation: {
          en: 'Solar energy provides the latent heat of vaporization needed to lift water vapor into the cooler upper atmosphere.',
          ta: 'சூரிய ஆற்றல் நீராவியை குளிர்ந்த மேல் வளிமண்டலத்திற்கு உயர்த்த தேவையான ஆவியாதலின் மறைவெப்பத்தை அளிக்கிறது.',
        },
      },
    ],
    reflectionQuestion: {
      question: {
        en: 'What primary natural energy source powers the continuous movement of the water cycle?',
        ta: 'நீர் சுழற்சியின் தொடர்ச்சியான இயக்கத்திற்கு ஆற்றல் தரும் முதன்மை இயற்கை மூலம் எது?',
      },
      options: [
        { id: 'opt_sun', text: { en: 'The Sun (Solar radiation)', ta: 'சூரியன் (சூரிய கதிர்வீச்சு)' } },
        { id: 'opt_wind', text: { en: 'Ocean tides alone', ta: 'கடல் அலைகள் மட்டுமே' } },
        { id: 'opt_core', text: { en: "Earth's magnetic field", ta: 'பூமியின் காந்தப்புலம்' } },
      ],
      correctOptionId: 'opt_sun',
      explanation: {
        en: 'The Sun warms ocean and surface water, providing the thermal energy that fuels evaporation worldwide.',
        ta: 'சூரியன் கடல் மற்றும் நிலப்பரப்பு நீரைச் சூடாக்கி உலகம் முழுவதும் ஆவியாதலை இயக்கும் வெப்ப ஆற்றலை வழங்குகிறது.',
      },
    },
    keyTakeaways: {
      en: [
        'The water cycle has four key stages: Evaporation, Condensation, Precipitation, and Collection.',
        'The Sun is the primary engine driving evaporation.',
        "Water on Earth is constantly recycled and never 'lost'.",
      ],
      ta: [
        'நீர் சுழற்சியில் நான்கு முக்கிய நிலைகள் உள்ளன: ஆவியாதல், ஒடுக்கம், மழைப்பொழிவு மற்றும் சேகரிப்பு.',
        'சூரியனே ஆவியாதலை இயக்கும் முதன்மை ஆற்றல் மூலமாகும்.',
        'பூமியில் உள்ள நீர் தொடர்ந்து சுழற்சி செய்யப்படுகிறது, அழிந்து போவதில்லை.',
      ],
    },
    conceptMapId: 'map-the-water-cycle',
    microLessonId: 'micro-water-cycle',
    quizReference: { subject: 'environment', topic: 'water_cycle' },
    xpReward: 25,
    tags: ['water cycle', 'evaporation', 'condensation', 'rain', 'environment', 'weather'],
  },

  {
    id: 'exp-greenhouse-effect',
    title: { en: 'The Greenhouse Effect', ta: 'பசுமைக்குடில் விளைவு' },
    subtitle: { en: 'Atmospheric Gases & Thermal Energy Balance', ta: 'வளிமண்டல வாயுக்கள் & வெப்ப ஆற்றல் சமநிலை' },
    description: {
      en: 'Adjust carbon dioxide levels from pre-industrial to elevated levels and observe heat retention in the atmosphere.',
      ta: 'தொழிற்புரட்சிக்கு முந்தைய நிலையிலிருந்து CO₂ அளவை மாற்றி வளிமண்டலத்தில் வெப்பம் தங்குவதைக் கண்காணிக்கவும்.',
    },
    subject: 'environment',
    gradeGroup: '8-10',
    durationMinutes: 3,
    difficulty: 'medium',
    heroAsset: '🌡️',
    learningObjective: {
      en: 'Understand how greenhouse gases absorb infrared radiation, maintaining Earth’s temperature habitable while excess causes warming.',
      ta: 'பசுமைக்குடில் வாயுக்கள் அகச்சிவப்பு கதிர்வீச்சை உறிஞ்சி புவியை வாழத் தகுந்ததாக வைத்திருப்பதையும், மிகுதியான அளவு வெப்பமயமாதலை உருவாக்குவதையும் அறிதல்.',
    },
    simulationId: 'greenhouse_effect',
    variables: [
      {
        id: 'ghgPpm',
        label: { en: 'Greenhouse Gas Concentration', ta: 'பசுமைக்குடில் வாயு செறிவு' },
        unit: 'ppm',
        unitTa: 'பிபிஎம்',
        type: 'slider',
        min: 280,
        max: 750,
        step: 25,
        defaultValue: 420,
        description: { en: 'Atmospheric CO₂ concentration in parts per million', ta: 'வளிமண்டல CO₂ செறிவு (மில்லியனில் ஒரு பங்கு)' },
      },
    ],
    observations: [
      {
        id: 'high_ghg',
        condition: (vars) => Number(vars.ghgPpm) >= 550,
        title: { en: 'Elevated Heat Retention', ta: 'அதிகரித்த வெப்பத் தேக்கம்' },
        text: {
          en: 'Above 550 ppm, the atmosphere traps over 50% of emitted heat, significantly raising average global temperatures.',
          ta: '550 ppmக்கு மேல், வளிமண்டலம் 50%க்கும் அதிகமான வெப்பத்தைத் தடுத்து புவியின் சராசரி வெப்பநிலையை கணிசமாக உயர்த்துகிறது.',
        },
        explanation: {
          en: 'Carbon dioxide and methane molecules absorb outgoing longwave infrared radiation and re-emit it in all directions, including back to Earth.',
          ta: 'கார்பன் டை ஆக்சைடு மூலக்கூறுகள் வெளியேறும் நீண்ட அலை அகச்சிவப்பு கதிர்களை உறிஞ்சி மீண்டும் பூமிக்கே திருப்பி அனுப்புகின்றன.',
        },
      },
    ],
    reflectionQuestion: {
      question: {
        en: 'Without ANY natural greenhouse effect, what would Earth’s average surface temperature be?',
        ta: 'எந்தவொரு இயற்கை பசுமைக்குடில் விளைவும் இல்லாவிட்டால் பூமியின் சராசரி வெப்பநிலை என்னவாக இருக்கும்?',
      },
      options: [
        { id: 'opt_frozen', text: { en: 'Around -18°C (Frozen ice planet)', ta: 'சுமார் -18°C (பனி படர்ந்த உறைந்த கோள்)' } },
        { id: 'opt_warm', text: { en: 'Around +35°C (Desert world)', ta: 'சுமார் +35°C (பாலைவன உலகம்)' } },
        { id: 'opt_same', text: { en: 'Exact same temperature as today', ta: 'இன்றைய அதே வெப்பநிலை' } },
      ],
      correctOptionId: 'opt_frozen',
      explanation: {
        en: 'Natural greenhouse gases keep Earth ~33°C warmer than it would otherwise be (~15°C instead of -18°C), making life possible.',
        ta: 'இயற்கையான பசுமைக்குடில் விளைவு பூமியை -18°C இல் இருந்து +15°C ஆக உயர்த்தி உயிரினங்கள் வாழ வழிவகை செய்கிறது.',
      },
    },
    keyTakeaways: {
      en: [
        'Shortwave solar radiation passes through the atmosphere and warms the ground.',
        'Earth re-radiates this energy as longwave infrared (thermal heat).',
        'Greenhouse gases (CO₂, H₂O, CH₄) absorb and re-emit infrared, keeping the planet warm.',
      ],
      ta: [
        'குறுகிய அலை சூரியக் கதிர்வீச்சு வளிமண்டலத்தைக் கடந்து தரையைச் சூடாக்குகிறது.',
        'பூமி இந்த ஆற்றலை நீண்ட அலை அகச்சிவப்பு வெப்பக் கதிர்களாக வெளியேற்றுகிறது.',
        'பசுமைக்குடில் வாயுக்கள் (CO₂, H₂O, CH₄) இந்த வெப்பத்தை உறிஞ்சி பூமியை கதகதப்பாக வைத்திருக்கின்றன.',
      ],
    },
    conceptMapId: 'map-the-water-cycle',
    microLessonId: 'micro-climate-greenhouse',
    quizReference: { subject: 'environment', topic: 'climate' },
    xpReward: 25,
    tags: ['greenhouse effect', 'climate', 'carbon dioxide', 'atmosphere', 'environment'],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SPACE (1 Experiment)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'exp-moon-phases',
    title: { en: 'Moon Phases & Orbit', ta: 'சந்திரனின் நிலைகள் & சுற்றுப்பாதை' },
    subtitle: { en: '28-Day Lunar Cycle & Sun Illumination', ta: '28-நாள் சந்திர சுழற்சி & சூரிய ஒளிர்வு' },
    description: {
      en: 'Rotate the Moon around Earth across its 28-day orbit to see how the visible illuminated phase changes.',
      ta: '28 நாள் சுற்றுப்பாதையில் சந்திரன் பூமியைச் சுற்றி வருவதை மாற்றி அதன் ஒளிரும் நிலைகள் எவ்வாறு மாறுகின்றன என்பதைக் காண்க.',
    },
    subject: 'space',
    gradeGroup: '6-7',
    durationMinutes: 2,
    difficulty: 'easy',
    heroAsset: '🌕',
    learningObjective: {
      en: 'Understand that moon phases are caused by changing geometry between the Sun, Earth, and orbiting Moon.',
      ta: 'சூரியன், பூமி மற்றும் நிலவுக்கு இடையேயான கோண மாற்றமே நிலவின் வெவ்வேறு நிலைகளுக்குக் காரணம் என்பதைப் புரிந்துகொள்ளுதல்.',
    },
    simulationId: 'moon_phases',
    variables: [
      {
        id: 'orbitDay',
        label: { en: 'Day of Lunar Orbit', ta: 'சந்திர சுற்றுப்பாதை நாள்' },
        unit: 'day',
        unitTa: 'நாள்',
        type: 'slider',
        min: 0,
        max: 28,
        step: 1,
        defaultValue: 14,
        description: { en: 'Position in the 28-day orbit around Earth', ta: 'பூமியைச் சுற்றும் 28 நாள் பாதையில் சந்திரனின் இடம்' },
      },
    ],
    observations: [
      {
        id: 'full_moon_day14',
        condition: (vars) => Number(vars.orbitDay) === 14,
        title: { en: 'Full Moon Phase', ta: 'பௌர்ணமி நிலை' },
        text: {
          en: 'On Day 14, the Moon is opposite the Sun from Earth, displaying 100% of its illuminated face.',
          ta: 'நாள் 14இல், சந்திரன் பூமிக்கு எதிர்புறத்தில் சூரியனுக்கு நேராக அமைந்து 100% முழுமையாக ஒளிர்கிறது.',
        },
        explanation: {
          en: 'Earth is between the Sun and Moon, so observers see the entire daylit hemisphere of the Moon.',
          ta: 'சூரியனுக்கும் சந்திரனுக்கும் நடுவே பூமி இருப்பதால், நிலவின் ஒளிரும் பகுதி முழுவதும் நமக்குத் தெரிகிறது.',
        },
      },
      {
        id: 'new_moon_day0',
        condition: (vars) => Number(vars.orbitDay) === 0 || Number(vars.orbitDay) === 28,
        title: { en: 'New Moon Phase', ta: 'அமாவாசை நிலை' },
        text: {
          en: 'The Moon is between Earth and Sun; its lit side faces away from us, appearing dark.',
          ta: 'நிலவு பூமிக்கும் சூரியனுக்கும் இடையே உள்ளது; அதன் ஒளிரும் பகுதி நமக்கு எதிர்ப்புறம் இருப்பதால் இருட்டாகத் தெரிகிறது.',
        },
        explanation: {
          en: 'The unilluminated night hemisphere of the Moon faces Earth.',
          ta: 'சந்திரனின் ஒளிராத இரவுப் பகுதி பூமியை நோக்கி அமைந்துள்ளது.',
        },
      },
    ],
    reflectionQuestion: {
      question: {
        en: 'Does the Moon actually generate its own light?',
        ta: 'சந்திரன் உண்மையில் தனது சொந்த ஒளியை உருவாக்குகிறதா?',
      },
      options: [
        { id: 'opt_sunlight', text: { en: 'No, it reflects sunlight like a giant mirror', ta: 'இல்லை, அது சூரிய ஒளியை மட்டுமே எதிரொளிக்கிறது' } },
        { id: 'opt_fire', text: { en: 'Yes, it has active fires on the surface', ta: 'ஆம், அதன் மேற்பரப்பில் தீ எரிகிறது' } },
        { id: 'opt_glow', text: { en: 'Yes, lunar rocks glow naturally in the dark', ta: 'ஆம், நிலவின் பாறைகள் இருட்டில் தாமாக ஒளிர்கின்றன' } },
      ],
      correctOptionId: 'opt_sunlight',
      explanation: {
        en: 'The Moon has no internal light source; we only see the portion of its rocky surface illuminated by the Sun.',
        ta: 'சந்திரனுக்கு சொந்தமாக ஒளி கிடையாது; சூரியனால் ஒளிரூட்டப்படும் அதன் பாறைப் பரப்பையே நாம் பார்க்கிறோம்.',
      },
    },
    keyTakeaways: {
      en: [
        'Moon phases repeat approximately every 29.5 days (synodic month).',
        'Half of the Moon is always illuminated by the Sun (except during eclipses).',
        'Phases depend on how much of that illuminated half is visible from Earth.',
      ],
      ta: [
        'சந்திர நிலைகள் தோராயமாக ஒவ்வொரு 29.5 நாட்களுக்கும் மீண்டும் நிகழ்கின்றன.',
        'நிலவின் ஒரு பாதி எப்போதும் சூரியனால் ஒளிர்கிறது.',
        'பூமியிலிருந்து அந்த ஒளிரும் பாதியில் எவ்வளவு தெரிகிறது என்பதே நிலைகளாகும்.',
      ],
    },
    conceptMapId: 'map-solar-system',
    microLessonId: 'micro-moon-phases',
    quizReference: { subject: 'space', topic: 'moon' },
    xpReward: 25,
    tags: ['moon phases', 'astronomy', 'orbit', 'space', 'lunar cycle'],
  },
];

export function getExperimentById(id: string): Experiment | undefined {
  return EXPERIMENTS.find((e) => e.id === id);
}

export function getExperimentsBySubject(subject: string): Experiment[] {
  if (subject === 'all') return EXPERIMENTS;
  return EXPERIMENTS.filter((e) => e.subject === subject);
}
