/**
 * Feedback Content Library
 * 50 data-driven coached-answer entries mapped onto REAL Vigyaan content:
 * micro lesson quick checks (30), experiment reflections (15), and curated
 * quiz pathway questions (5 cross-subject anchors). Fully bilingual.
 * Content only — the coach engine resolves behavior from this data.
 */

import { LocalizedFeedbackContent } from './feedback.types';

export interface FeedbackEntry {
  /** Stable id: fb-<key>. */
  id: string;
  /** The key the entry resolves from (activity question / lesson / experiment id). */
  key: string;
  /** Activity family that owns the question. */
  activity: 'micro_lesson' | 'experiment' | 'quiz';
  subject: 'physics' | 'chemistry' | 'biology' | 'space' | 'environment' | 'general';
  topicId: string;
  conceptId: string;
  misconceptionTag: string;
  /** Deterministic similar-question pointer (existing local content only). */
  similarKey?: string;
  relatedLessonId?: string;
  relatedExperimentId?: string;
  relatedConceptMapId?: string;
  content: LocalizedFeedbackContent;
}

export const FEEDBACK_ENTRIES: FeedbackEntry[] = [
  // ==================== PHYSICS (micro lessons) ====================
  {
    id: 'fb-micro-newtons-first-law',
    key: 'micro-newtons-first-law',
    activity: 'micro_lesson',
    subject: 'physics',
    topicId: 'force-and-motion',
    conceptId: 'inertia',
    misconceptionTag: 'confusesInertiaWithForce',
    relatedLessonId: 'micro-newtons-first-law',
    similarKey: 'micro-newtons-third-law',
    content: {
      explanation: {
        en: 'Nothing pushes you forward when the bus stops. Your feet stop with the bus, but your upper body keeps its forward motion on its own.',
        ta: 'பேருந்து நிற்கும்போது உங்களை முன்னோக்கித் தள்ளும் விசை எதுவும் இல்லை. கால்கள் பேருந்துடன் நிற்கின்றன; மேல் உடல் தானாகவே முன்னோக்கிய இயக்கத்தைத் தொடர்கிறது.',
      },
      guidedExplanation: {
        en: 'Compare your feet with your upper body. The feet grip the floor and stop; the upper body was moving at bus speed and simply continues — that continuation is inertia.',
        ta: 'உங்கள் கால்களையும் மேல் உடலையும் ஒப்பிடுங்கள். கால்கள் தரையில் பிடித்து நிற்கின்றன; மேல் உடல் பேருந்து வேகத்தில் இருந்து தொடர்கிறது — அந்தத் தொடர்ச்சியே நிலைமம்.',
      },
      takeaway: {
        en: 'Objects resist changes in their motion — matter never changes speed or direction on its own.',
        ta: 'பொருட்கள் தங்கள் இயக்க மாற்றத்தை எதிர்க்கின்றன — பொருள் தானாகவே வேகம் அல்லது திசையை மாற்றிக்கொள்வதில்லை.',
      },
      memoryTip: {
        en: 'Inertia = "in-act": matter stays acting the way it already is.',
        ta: 'நிலைமம் = பொருள் இருக்கும் நிலையிலேயே தொடர விழையும் பண்பு.',
      },
      keyIdea: {
        en: 'No net force means no change in motion.',
        ta: 'சமன்செய்யப்படாத விசை இல்லை என்றால் இயக்க மாற்றம் இல்லை.',
      },
    },
  },
  {
    id: 'fb-micro-newtons-third-law',
    key: 'micro-newtons-third-law',
    activity: 'micro_lesson',
    subject: 'physics',
    topicId: 'force-and-motion',
    conceptId: 'action-reaction',
    misconceptionTag: 'confusesInertiaWithForce',
    relatedLessonId: 'micro-newtons-third-law',
    similarKey: 'micro-newtons-first-law',
    content: {
      explanation: {
        en: 'The swimmer pushes water backward, and the water pushes the swimmer forward with an equal force. The two forces act on different objects, so they never cancel.',
        ta: 'நீச்சல் வீரர் நீரைப் பின்னோக்கித் தள்ளுகிறார்; நீர் அவரைச் சம விசையுடன் முன்னோக்கித் தள்ளுகிறது. இரு விசைகளும் வெவ்வேறு பொருட்களில் செயல்படுவதால் ஒன்றையொன்று சமன் செய்யாது.',
      },
      guidedExplanation: {
        en: 'Identify the two objects first: swimmer and water. The action force is swimmer-on-water (backward); the reaction is water-on-swimmer (forward).',
        ta: 'முதலில் இரு பொருட்களைக் கண்டறியுங்கள்: வீரர் மற்றும் நீர். செயல் விசை நீரின் மீது பின்னோக்கி; எதிர்செயல் வீரரின் மீது முன்னோக்கி.',
      },
      takeaway: {
        en: 'Every force is one half of a pair — action and reaction act on two different bodies.',
        ta: 'ஒவ்வொரு விசையும் ஒரு ஜோடியின் பாதி — செயலும் எதிர்செயலும் இரு வேறு பொருட்களில் செயல்படும்.',
      },
      memoryTip: {
        en: 'Push the world back, and the world pushes you forward.',
        ta: 'உலகைப் பின்னோக்கித் தள்ளுங்கள், உலகம் உங்களை முன்னோக்கித் தள்ளும்.',
      },
      keyIdea: {
        en: 'Forces always come in equal, opposite pairs on different objects.',
        ta: 'விசைகள் எப்போதும் சமமான, எதிர் ஜோடிகளாகவே இருக்கும்.',
      },
    },
  },
  {
    id: 'fb-micro-light-reflection',
    key: 'micro-light-reflection',
    activity: 'micro_lesson',
    subject: 'physics',
    topicId: 'light-and-optics',
    conceptId: 'law-of-reflection',
    misconceptionTag: 'confusesReflectionWithRefraction',
    relatedLessonId: 'micro-light-reflection',
    similarKey: 'micro-why-sky-blue',
    content: {
      explanation: {
        en: 'Angles are always measured from the normal — the line perpendicular to the mirror. At 35° incidence, the reflected ray leaves at exactly 35° on the other side.',
        ta: 'கோணங்கள் எப்போதும் செங்குத்துக் கோட்டிலிருந்து அளவிடப்படும் — ஆடிக்கு 90° உள்ள கோடு. 35° படுகோணத்தில், எதிரொளிக் கதிர் மறுபுறம் சரியாக 35° இல் வெளிவருகிறது.',
      },
      guidedExplanation: {
        en: 'If you measured 55°, you likely used the mirror surface instead of the normal. 90° − 55° = 35° from the normal — and the reflection equals that.',
        ta: '55° என அளந்திருந்தால் செங்குத்துக் கோட்டிற்கு பதிலாக ஆடித் தளத்தைப் பயன்படுத்தியிருப்பீர்கள். 90° − 55° = 35° — எதிரொளிப்பும் அதே.',
      },
      takeaway: {
        en: 'Angle of incidence = angle of reflection, measured from the normal.',
        ta: 'படுகோணம் = எதிரொளிப்புக் கோணம் — செங்குத்துக் கோட்டிலிருந்து அளந்தால்.',
      },
      memoryTip: {
        en: 'i = r: "in equals out" around the normal line.',
        ta: 'i = r: செங்குத்துக் கோட்டை மையமாகக் கொண்டு "உள்ளே = வெளியே".',
      },
      keyIdea: {
        en: 'Symmetry about the normal governs every reflection.',
        ta: 'செங்குத்துக் கோட்டை மையமாகக் கொண்ட சமச்சீர்த்தன்மையே எதிரொளிப்பை நிர்வகிக்கிறது.',
      },
    },
  },
  {
    id: 'fb-micro-electric-circuits',
    key: 'micro-electric-circuits',
    activity: 'micro_lesson',
    subject: 'physics',
    topicId: 'electricity',
    conceptId: 'closed-circuit',
    misconceptionTag: 'confusesCurrentWithVoltage',
    relatedLessonId: 'micro-electric-circuits',
    similarKey: 'micro-heat-transfer',
    content: {
      explanation: {
        en: 'An open switch breaks the only loop available. Charges cannot cross the gap, so the current everywhere drops to zero and the bulb goes dark.',
        ta: 'திறந்த சுவிட்ச் கிடைக்கும் ஒரே வளையத்தைத் துண்டிக்கிறது. மின்சுமைகள் இடைவெளியைக் கடக்க முடியாது; மின்னோட்டம் சுழியாகி விளக்கு அணைகிறது.',
      },
      guidedExplanation: {
        en: 'Follow one electron all the way around: battery → wire → bulb → switch. At the open switch the path ends — and a path that ends anywhere carries current nowhere.',
        ta: 'ஒரு எலக்ட்ரானை முழு வழியிலும் பின்தொடருங்கள்: மின்கலம் → கம்பி → விளக்கு → சுவிட்ச். திறந்த சுவிட்சில் பாதை முடிகிறது — பாதை முடிந்தால் மின்னோட்டம் இல்லை.',
      },
      takeaway: {
        en: 'Current flows only through complete, unbroken loops.',
        ta: 'மின்னோட்டம் முழுமையான, தடையற்ற வளையங்களில் மட்டுமே பாயும்.',
      },
      memoryTip: {
        en: 'Closed = flows, open = stops.',
        ta: 'மூடியது = பாயும், திறந்தது = நிற்கும்.',
      },
      keyIdea: {
        en: 'A circuit must be a continuous conductive path.',
        ta: 'மின்சுற்று தொடர்ச்சியான கடத்தும் பாதையாக இருக்க வேண்டும்.',
      },
    },
  },
  {
    id: 'fb-micro-sound-waves',
    key: 'micro-sound-waves',
    activity: 'micro_lesson',
    subject: 'physics',
    topicId: 'waves',
    conceptId: 'sound-medium',
    misconceptionTag: 'none',
    relatedLessonId: 'micro-sound-waves',
    similarKey: 'micro-heat-transfer',
    content: {
      explanation: {
        en: 'Sound is vibration passed particle to particle. Space has almost no particles to vibrate, so the shouting simply has no carrier.',
        ta: 'ஒலி என்பது துகளிலிருந்து துகளுக்குக் கடத்தப்படும் அதிர்வு. விண்வெளியில் அதிர்ந்து பரவத் துகள்களே இல்லை; எனவே கத்தல் சென்றடையாது.',
      },
      guidedExplanation: {
        en: 'A radio works because it uses electromagnetic waves, which need no medium. Your voice is a mechanical wave — it does.',
        ta: 'வானொலி மின்காந்த அலைகளைப் பயன்படுத்துவதால் வேலை செய்கிறது; அவற்றுக்கு ஊடகம் தேவையில்லை. உங்கள் குரல் இயந்திர அலை — அதற்கு ஊடகம் தேவை.',
      },
      takeaway: {
        en: 'No matter, no sound — mechanical waves need a material medium.',
        ta: 'பொருள் இல்லை என்றால் ஒலி இல்லை — இயந்திர அலைகளுக்கு ஊடகம் தேவை.',
      },
      memoryTip: {
        en: 'Vacuum = vibrations with nothing to vibrate.',
        ta: 'வெற்றிடம் = அதிர்வதற்கு எதுவும் இல்லாத நிலை.',
      },
      keyIdea: {
        en: 'Mechanical waves require matter; electromagnetic waves do not.',
        ta: 'இயந்திர அலைகளுக்கு பொருள் தேவை; மின்காந்த அலைகளுக்கு இல்லை.',
      },
    },
  },
  {
    id: 'fb-micro-gravity-weightlessness',
    key: 'micro-gravity-weightlessness',
    activity: 'micro_lesson',
    subject: 'physics',
    topicId: 'gravitation',
    conceptId: 'free-fall',
    misconceptionTag: 'none',
    relatedLessonId: 'micro-gravity-weightlessness',
    relatedExperimentId: 'exp-free-fall',
    similarKey: 'micro-solar-system-orbits',
    content: {
      explanation: {
        en: 'Gravity at the station\'s altitude is still about 90% of ground level. Astronauts float because they and the station fall around Earth together, so nothing pushes up on them.',
        ta: 'நிலையத்தின் உயரத்தில் ஈர்ப்பு விசை தரையின் 90% உள்ளது. வீரர்களும் நிலையமும் பூமியைச் சுற்றி ஒன்றாக விழுவதால் அவர்களைத் தாங்கும் விசை இல்லாததால் மிதக்கிறார்கள்.',
      },
      guidedExplanation: {
        en: 'Weight is the push you feel from the floor beneath you. In free fall the floor falls with you — the push becomes zero even though gravity is still there.',
        ta: 'எடை என்பது கீழுள்ள தரை உங்களைத் தள்ளும் விசை. தடையற்ற வீழ்ச்சியில் தரையும் உங்களுடன் விழுகிறது — ஈர்ப்பு இருந்தும் அந்தத் தள்ளுவிசை சுழியாகிறது.',
      },
      takeaway: {
        en: 'Weightlessness comes from free fall, not from the absence of gravity.',
        ta: 'எடையின்மை தடையற்ற வீழ்ச்சியால் ஏற்படுகிறது; ஈர்ப்பு இல்லாததால் அல்ல.',
      },
      memoryTip: {
        en: 'Orbiting = falling while missing the ground.',
        ta: 'சுற்றுப்பாதை = தரையைத் தொடாமல் விழுதல்.',
      },
      keyIdea: {
        en: 'Free fall removes the supporting push, not gravity itself.',
        ta: 'தடையற்ற வீழ்ச்சி தாங்கும் விசையை நீக்குகிறது; ஈர்ப்பை அல்ல.',
      },
    },
  },
  {
    id: 'fb-micro-heat-transfer',
    key: 'micro-heat-transfer',
    activity: 'micro_lesson',
    subject: 'physics',
    topicId: 'thermodynamics',
    conceptId: 'heat-radiation',
    misconceptionTag: 'confusesTemperatureWithHeat',
    relatedLessonId: 'micro-heat-transfer',
    similarKey: 'micro-states-of-matter',
    content: {
      explanation: {
        en: 'Conduction needs touching solids and convection needs moving fluid. Empty space has neither, but radiation travels as electromagnetic waves and crosses the vacuum.',
        ta: 'கடத்தலுக்கு தொடர்புள்ள திண்மங்களும் சலனத்திற்கு நகரும் திரவமும் தேவை. வெற்றிடத்தில் இரண்டும் இல்லை; ஆனால் கதிர்வீச்சு மின்காந்த அலைகளாகப் பயணித்து வெற்றிடத்தைக் கடக்கும்.',
      },
      guidedExplanation: {
        en: 'Test each mode against the vacuum: conduction — no solids; convection — no fluid; radiation — needs nothing material. The survivor is radiation.',
        ta: 'ஒவ்வொரு முறையையும் வெற்றிடத்துடன் சோதியுங்கள்: கடத்தல் — திண்மம் இல்லை; சலனம் — திரவம் இல்லை; கதிர்வீச்சு — பொருள் தேவையில்லை. எஞ்சியது கதிர்வீச்சு.',
      },
      takeaway: {
        en: 'Radiation is the only heat transfer that needs no medium.',
        ta: 'கதிர்வீச்சு மட்டுமே ஊடகமின்றி வெப்பத்தைக் கடத்தும் முறை.',
      },
      memoryTip: {
        en: 'Sunlight reaches you through nothing at all — that is radiation.',
        ta: 'சூரிய ஒளி எதுவுமின்றி உங்களை அடைகிறது — அதுவே கதிர்வீச்சு.',
      },
      keyIdea: {
        en: 'Electromagnetic waves carry thermal energy across vacuum.',
        ta: 'மின்காந்த அலைகள் வெப்ப ஆற்றலை வெற்றிடம் வழியே சுமக்கின்றன.',
      },
    },
  },
  {
    id: 'fb-micro-states-of-matter',
    key: 'micro-states-of-matter',
    activity: 'micro_lesson',
    subject: 'chemistry',
    topicId: 'states-of-matter',
    conceptId: 'gas-expansion',
    misconceptionTag: 'none',
    relatedLessonId: 'micro-states-of-matter',
    relatedExperimentId: 'exp-states-of-matter',
    similarKey: 'micro-why-ice-floats',
    content: {
      explanation: {
        en: 'Gas molecules are not bigger — they are far apart. High kinetic energy lets them fly freely, filling the whole container with mostly empty space.',
        ta: 'வாயு மூலக்கூறுகள் பெரியவை அல்ல — அவை விலகி உள்ளன. அதிக இயக்க ஆற்றல் அவற்றை உரிமையுடன் பறக்கவிட்டு, பெரும்பாலும் வெற்று இடத்துடன் முழு கொள்கலனையும் நிரப்புகிறது.',
      },
      guidedExplanation: {
        en: 'One substance, one molecule size — so the volume change must come from spacing. Solids pack tight, liquids touch, gases spread far apart.',
        ta: 'ஒரே பொருள், ஒரே மூலக்கூறு அளவு — எனவே பருமன் மாற்றம் இடைவெளியிலிருந்தே வருகிறது. திண்மம் இறுக்கமாக, திரவம் தொடர்பில், வாயு விலகியுள்ளது.',
      },
      takeaway: {
        en: 'Gas volume is mostly empty space between far-apart molecules.',
        ta: 'வாயுவின் பருமன் பெரும்பாலும் விலகிய மூலக்கூறுகளுக்கு இடையேயான வெற்று இடம்.',
      },
      memoryTip: {
        en: 'Gases spread, they do not grow.',
        ta: 'வாயுக்கள் பரவுகின்றன; பெரிதாகாது.',
      },
      keyIdea: {
        en: 'Particle spacing — not particle size — sets the volume.',
        ta: 'பருமனைத் தீர்மானிப்பது துகள் இடைவெளி; துகள் அளவு அல்ல.',
      },
    },
  },
  {
    id: 'fb-micro-why-ice-floats',
    key: 'micro-why-ice-floats',
    activity: 'micro_lesson',
    subject: 'physics',
    topicId: 'density',
    conceptId: 'density-buoyancy',
    misconceptionTag: 'confusesMassWithWeight',
    relatedLessonId: 'micro-why-ice-floats',
    similarKey: 'micro-states-of-matter',
    content: {
      explanation: {
        en: 'Freezing traps water molecules in an open lattice that takes more room. Same mass in a larger volume means ice is less dense than liquid water, so it floats.',
        ta: 'உறைதல் நீர் மூலக்கூறுகளை அதிக இடம் எடுக்கும் திறந்த படிக அமைப்பில் பிணைக்கிறது. அதே நிறை, பெரிய பருமன் — எனவே பனிக்கட்டியின் அடர்த்தி திரவ நீரை விடக் குறைவு; அது மிதக்கிறது.',
      },
      guidedExplanation: {
        en: 'Density = mass ÷ volume. Freezing keeps mass constant but raises volume, so the ratio drops below 1.0 g/cm³ — below water.',
        ta: 'அடர்த்தி = நிறை ÷ பருமன். உறையும்போது நிறை மாறாது, பருமன் கூடுகிறது; எனவை விகிதம் 1.0 கி/செ.மீ³க்குக் கீழே இருக்கும் — நீரை விடக் குறைவு.',
      },
      takeaway: {
        en: 'Ice floats because freezing expands water, lowering its density.',
        ta: 'உறைதல் நீரை விரிவாக்கி அடர்த்தியைக் குறைப்பதால் பனி மிதக்கிறது.',
      },
      memoryTip: {
        en: 'Ice is water stretched out, not squeezed down.',
        ta: 'பனிக்கட்டி நீர் விரிவடைந்த நிலை; சுருங்கிய நிலை அல்ல.',
      },
      keyIdea: {
        en: 'Less dense substances float on denser ones.',
        ta: 'குறைந்த அடர்த்தியுள்ள பொருட்கள் அதிக அடர்த்தியின் மேல் மிதக்கும்.',
      },
    },
  },
  {
    id: 'fb-micro-why-sky-blue',
    key: 'micro-why-sky-blue',
    activity: 'micro_lesson',
    subject: 'physics',
    topicId: 'light-and-optics',
    conceptId: 'scattering',
    misconceptionTag: 'confusesReflectionWithRefraction',
    relatedLessonId: 'micro-why-sky-blue',
    similarKey: 'micro-light-reflection',
    content: {
      explanation: {
        en: 'Air molecules scatter short wavelengths far more strongly than long ones. Blue light scatters in every direction across the sky, so blue reaches your eyes from everywhere.',
        ta: 'காற்று மூலக்கூறுகள் குறுகிய அலைநீளங்களை நீண்டவற்றை விட அதிகமாகச் சிதறடிக்கின்றன. நீல ஒளி வானம் முழுவதும் எல்லாத் திசைகளிலும் சிதறுவதால் எங்கிருந்தும் நீலமே கண்களை அடைகிறது.',
      },
      guidedExplanation: {
        en: 'Compare wavelengths: blue is short, red is long. Scattering strength rises sharply as wavelength shrinks — that is why the sky picks blue, not red.',
        ta: 'அலைநீளங்களை ஒப்பிடுங்கள்: நீலம் குறுகியது, சிவப்பு நீளமானது. அலைநீளம் குறையும்போது சிதறல் கூர்மையாக அதிகரிக்கிறது — எனவே வானம் சிவப்பை அல்ல, நீலத்தைத் தேர்கிறது.',
      },
      takeaway: {
        en: 'Short wavelengths scatter most — blue wins the sky.',
        ta: 'குறுகிய அலைநீளங்கள் அதிகம் சிதறும் — வானத்தில் நீலம் வெல்கிறது.',
      },
      memoryTip: {
        en: 'Small waves bounce everywhere; long waves march straight through.',
        ta: 'சிறு அலைகள் எங்கும் துள்ளும்; நீள அலைகள் நேராகச் செல்லும்.',
      },
      keyIdea: {
        en: 'Scattering intensity depends strongly on wavelength.',
        ta: 'சிதறல் தீவிரம் அலைநீளத்தைப் பொறுத்தது.',
      },
    },
  },
  // ==================== CHEMISTRY (micro lessons) ====================
  {
    id: 'fb-micro-acids-bases-ph',
    key: 'micro-acids-bases-ph',
    activity: 'micro_lesson',
    subject: 'chemistry',
    topicId: 'acids-and-bases',
    conceptId: 'ph-scale',
    misconceptionTag: 'none',
    relatedLessonId: 'micro-acids-bases-ph',
    relatedExperimentId: 'exp-ph-explorer',
    similarKey: 'micro-solutions-solvents',
    content: {
      explanation: {
        en: 'pH 2.5 sits far below neutral 7. Values below 7 mean high H+ concentration — and near 2 is a strong acid that turns the indicator red.',
        ta: 'pH 2.5 நடுநிலை 7க்கு மிகக் கீழே உள்ளது. 7க்குக் கீழ் என்றால் H+ செறிவு அதிகம்; 2 அருகில் இருப்பது நிறங்காட்டியைச் சிவப்பாக்கும் வலுவான அமிலம்.',
      },
      guidedExplanation: {
        en: 'Walk the scale: 7 neutral → below 7 acidic → far below 7 strongly acidic. Red indicator confirms the deep-acid region.',
        ta: 'அளவை நடந்து பாருங்கள்: 7 நடுநிலை → 7க்குக் கீழ் அமிலம் → மிகக் கீழ் வலுவான அமிலம். சிவப்பு நிறங்காட்டி அதை உறுதிப்படுத்துகிறது.',
      },
      takeaway: {
        en: 'Below 7 is acidic; the further down, the stronger the acid.',
        ta: '7க்குக் கீழ் அமிலம்; கீழிறங்கக் கீழிறங்க அமிலம் வலுவடையும்.',
      },
      memoryTip: {
        en: 'Low pH = lots of H+.',
        ta: 'குறைந்த pH = நிறைய H+.',
      },
      keyIdea: {
        en: 'pH measures hydrogen-ion concentration, not danger.',
        ta: 'pH ஹைட்ரஜன் அயனி செறிவை அளக்கிறது; ஆபத்தை அல்ல.',
      },
    },
  },
  {
    id: 'fb-micro-atomic-structure',
    key: 'micro-atomic-structure',
    activity: 'micro_lesson',
    subject: 'chemistry',
    topicId: 'atomic-structure',
    conceptId: 'subatomic-particles',
    misconceptionTag: 'none',
    relatedLessonId: 'micro-atomic-structure',
    similarKey: 'micro-periodic-table',
    content: {
      explanation: {
        en: 'The nucleus at the centre holds the protons (positive) and neutrons (neutral). The much lighter electrons (negative) orbit around that nucleus.',
        ta: 'மையத்தில் உள்ள அணுக்கரு புரோட்டான்களையும் (நேர்) நியூட்ரான்களையும் (எதிர்மின்சுமை இல்லாத) கொண்டுள்ளது. மிக இலகுவான எலக்ட்ரான்கள் (எதிர்) அதைச் சுற்றி வருகின்றன.',
      },
      guidedExplanation: {
        en: 'Sort by charge: positive = proton, zero = neutron, negative = electron. The two heavy ones sit in the nucleus; the light one orbits.',
        ta: 'மின்சுமையால் பிரியுங்கள்: நேர் = புரோட்டான், சுழி = நியூட்ரான், எதிர் = எலக்ட்ரான். கனமான இரண்டும் கருவில்; இலகுவானது சுற்றுகிறது.',
      },
      takeaway: {
        en: 'Nucleus = protons + neutrons; electrons orbit outside.',
        ta: 'கரு = புரோட்டான் + நியூட்ரான்; எலக்ட்ரான்கள் வெளியே சுற்றுகின்றன.',
      },
      memoryTip: {
        en: 'P-N in the middle, E spinning outside.',
        ta: 'P-N நடுவில், E வெளியே சுழலும்.',
      },
      keyIdea: {
        en: 'Charge decides where each subatomic particle lives.',
        ta: 'மின்சுமையே ஒவ்வொரு துகளின் இடத்தைத் தீர்மானிக்கிறது.',
      },
    },
  },
  {
    id: 'fb-micro-battery-chemistry',
    key: 'micro-battery-chemistry',
    activity: 'micro_lesson',
    subject: 'chemistry',
    topicId: 'electrochemistry',
    conceptId: 'electrodes',
    misconceptionTag: 'confusesCurrentWithVoltage',
    relatedLessonId: 'micro-battery-chemistry',
    similarKey: 'micro-electric-circuits',
    content: {
      explanation: {
        en: 'Inside the battery, chemical reactions move electrons from one electrode to the other. That pushed flow continues into the wire as electric current.',
        ta: 'மின்கலத்திற்குள் வேதி வினைகள் எலக்ட்ரான்களை ஒரு மின்முனையிலிருந்து மற்றொன்றுக்கு நகர்த்துகின்றன. அந்தத் தள்ளப்பட்ட ஓட்டம் கம்பியில் மின்னோட்டமாகத் தொடர்கிறது.',
      },
      guidedExplanation: {
        en: 'A battery is not a storage tank of electricity — it is a pump. Chemistry drives electrons around the external circuit.',
        ta: 'மின்கலம் மின்சாரக் கிடங்கு அல்ல — அது ஒரு ஏற்றி (pump). வேதியியல் எலக்ட்ரான்களை வெளிச் சுற்றில் ஓட்டுகிறது.',
      },
      takeaway: {
        en: 'Batteries convert chemical energy into moving electrons.',
        ta: 'மின்கலம் வேதி ஆற்றலை நகரும் எலக்ட்ரான்களாக மாற்றுகிறது.',
      },
      memoryTip: {
        en: 'Battery = chemical pump for electrons.',
        ta: 'மின்கலம் = எலக்ட்ரான்களுக்கான வேதி ஏற்றி.',
      },
      keyIdea: {
        en: 'Chemical reactions create the electrical push (voltage).',
        ta: 'வேதி வினைகளே மின் தள்ளுவிசையை (மின்னழுத்தம்) உருவாக்குகின்றன.',
      },
    },
  },
  {
    id: 'fb-micro-chemical-reactions',
    key: 'micro-chemical-reactions',
    activity: 'micro_lesson',
    subject: 'chemistry',
    topicId: 'chemical-reactions',
    conceptId: 'chemical-vs-physical',
    misconceptionTag: 'confusesSolubilityWithMelting',
    relatedLessonId: 'micro-chemical-reactions',
    similarKey: 'micro-solutions-solvents',
    content: {
      explanation: {
        en: 'In a chemical change, bonds break and re-form into new substances with new properties. Melting, dissolving, and freezing only rearrange the same substance.',
        ta: 'வேதி மாற்றத்தில் பிணைப்புகள் உடைந்து புதிய பண்புகளுடன் புதிய பொருட்களாக மீளுருவாக்கம் அடைகின்றன. உருகுதல், கரைதல், உறைதல் அதே பொருளை மட்டும் மறுசீரமைக்கின்றன.',
      },
      guidedExplanation: {
        en: 'Ask one question: can I get the original back easily? Ice refreezes (physical). Burnt paper never becomes paper again (chemical).',
        ta: 'ஒரு கேள்வி கேளுங்கள்: அசலை எளிதாக மீட்டெடுக்க முடியுமா? பனி மீண்டும் உறையும் (இயற்பியல்). எரிந்த காகிதம் மீண்டும் காகிதமாகாது (வேதி).',
      },
      takeaway: {
        en: 'New substance formed = chemical change; same substance reshaped = physical change.',
        ta: 'புதிய பொருள் உருவானால் வேதி மாற்றம்; அதே பொருள் மாறினால் இயற்பியல் மாற்றம்.',
      },
      memoryTip: {
        en: 'Can it be undone? No → chemical.',
        ta: 'மீட்டெடுக்க முடியாதா? முடியாவிட்டால் → வேதி.',
      },
      keyIdea: {
        en: 'Chemical changes create substances with different properties.',
        ta: 'வேதி மாற்றங்கள் வேறுபட்ட பண்புகளுடன் பொருட்களை உருவாக்குகின்றன.',
      },
    },
  },
  {
    id: 'fb-micro-periodic-table',
    key: 'micro-periodic-table',
    activity: 'micro_lesson',
    subject: 'chemistry',
    topicId: 'periodic-table',
    conceptId: 'periodic-trends',
    misconceptionTag: 'none',
    relatedLessonId: 'micro-periodic-table',
    similarKey: 'micro-atomic-structure',
    content: {
      explanation: {
        en: 'The table is ordered by atomic number — the count of protons. Elements in the same column share outer-electron patterns, so they behave alike chemically.',
        ta: 'அட்டவணை அணு எண்ணின் (புரோட்டான்களின் எண்ணிக்கை) அடிப்படையில் அமைகிறது. ஒரே நெடுவரிசையில் உள்ள தனிமங்கள் வெளிப்புற எலக்ட்ரான் அமைப்பைப் பகிர்வதால் வேதியியல் நடத்தையில் ஒத்தவை.',
      },
      guidedExplanation: {
        en: 'Rows read like counting 1, 2, 3... in protons. Columns are families: same number of outer electrons, similar reactions.',
        ta: 'வரிசைகள் புரோட்டான் எண்ணிக்கையால் 1, 2, 3... போல அதிகரிக்கின்றன. நெடுவரிசைகள் குடும்பங்கள்: அதே வெளிப்புற எலக்ட்ரான் எண்ணிக்கை, ஒத்த வினைகள்.',
      },
      takeaway: {
        en: 'Atomic number orders the table; electron structure explains the columns.',
        ta: 'அணு எண் அட்டவணையை வரிசைப்படுத்துகிறது; எலக்ட்ரான் அமைப்பு நெடுவரிசைகளை விளக்குகிறது.',
      },
      memoryTip: {
        en: 'Across = count up; down = act alike.',
        ta: 'குறுக்கே = எண் கூடும்; கீழே = நடத்தை ஒத்தது.',
      },
      keyIdea: {
        en: 'Position in the table predicts chemical behavior.',
        ta: 'அட்டவணையில் உள்ள இடம் வேதி நடத்தையை முன்னறிவிக்கிறது.',
      },
    },
  },
  {
    id: 'fb-micro-solutions-solvents',
    key: 'micro-solutions-solvents',
    activity: 'micro_lesson',
    subject: 'chemistry',
    topicId: 'solutions',
    conceptId: 'dissolving',
    misconceptionTag: 'confusesSolubilityWithMelting',
    relatedLessonId: 'micro-solutions-solvents',
    relatedExperimentId: 'exp-solubility',
    similarKey: 'micro-chemical-reactions',
    content: {
      explanation: {
        en: 'Water molecules surround each sugar particle and pull it off the crystal. The particles spread evenly — nothing is destroyed and nothing new is made.',
        ta: 'நீர் மூலக்கூறுகள் ஒவ்வொரு சர்க்கரைத் துணிக்கையையும் சுற்றி, படிகத்திலிருந்து பிரித்து இழுக்கின்றன. துகள்கள் சீராகப் பரவுகின்றன — எதுவும் அழிவதில்லை, புதியது உருவாவதில்லை.',
      },
      guidedExplanation: {
        en: 'Dissolving is a physical change: evaporate the water and the sugar returns. Compare that with burning, which destroys the sugar for good.',
        ta: 'கரைதல் இயற்பியல் மாற்றம்: நீரை ஆவியாக்கினால் சர்க்கரை திரும்பும். எரிதலுடன் ஒப்பிடுங்கள் — அதில் சர்க்கரை நிரந்தரமாக மாறிவிடும்.',
      },
      takeaway: {
        en: 'Dissolving spreads particles; it does not change the substance.',
        ta: 'கரைதல் துகள்களைப் பரப்புகிறது; பொருளை மாற்றுவதில்லை.',
      },
      memoryTip: {
        en: 'Evaporate and it comes back — that was dissolving.',
        ta: 'ஆவியானால் திரும்பும் — அது கரைதல்.',
      },
      keyIdea: {
        en: 'A solution is a uniform physical mixture.',
        ta: 'கரைசல் என்பது சீரான இயற்பியல் கலவை.',
      },
    },
  },
  // ==================== BIOLOGY (micro lessons) ====================
  {
    id: 'fb-micro-photosynthesis',
    key: 'micro-photosynthesis',
    activity: 'micro_lesson',
    subject: 'biology',
    topicId: 'photosynthesis',
    conceptId: 'energy-conversion',
    misconceptionTag: 'confusesPhotosynthesisWithRespiration',
    relatedLessonId: 'micro-photosynthesis',
    relatedExperimentId: 'exp-photosynthesis',
    similarKey: 'micro-food-chains',
    content: {
      explanation: {
        en: 'A leaf takes in carbon dioxide and water and uses sunlight to build glucose, releasing oxygen. Photosynthesis stores energy; respiration releases it — they are opposites.',
        ta: 'இலை கார்பன் டை ஆக்சைடையும் நீரையும் உட்கொண்டு, சூரிய ஒளியால் குளுக்கோஸை உருவாக்கி ஆக்சிஜனை வெளியிடுகிறது. ஒளிச்சேர்க்கை ஆற்றலைச் சேமிக்கிறது; சுவாசம் வெளியிடுகிறது — இவை எதிர்கள்.',
      },
      guidedExplanation: {
        en: 'Track the inputs and outputs: CO₂ + water in, glucose + oxygen out, sunlight as the power source. Respiration runs the same story backwards.',
        ta: 'உள்ளீடுகளையும் வெளியீடுகளையும் பின்தொடருங்கள்: CO₂ + நீர் உள்ளே, குளுக்கோஸ் + ஆக்சிஜன் வெளியே, சூரிய ஒளி ஆற்றல் மூலம். சுவாசம் இதே கதையை தலைகீழாக நடத்துகிறது.',
      },
      takeaway: {
        en: 'Photosynthesis stores light energy as chemical energy in glucose.',
        ta: 'ஒளிச்சேர்க்கை ஒளி ஆற்றலை குளுக்கோஸில் வேதி ஆற்றலாகச் சேமிக்கிறது.',
      },
      memoryTip: {
        en: 'Plants eat light; we eat plants.',
        ta: 'செடிகள் ஒளியை உண்ணும்; நாம் செடிகளை உண்போம்.',
      },
      keyIdea: {
        en: 'Sunlight powers the building of food molecules.',
        ta: 'சூரிய ஒளியே உணவு மூலக்கூறுகளைக் கட்ட ஆற்றல் தருகிறது.',
      },
    },
  },
  {
    id: 'fb-micro-cell-structure',
    key: 'micro-cell-structure',
    activity: 'micro_lesson',
    subject: 'biology',
    topicId: 'cell-biology',
    conceptId: 'organelles',
    misconceptionTag: 'none',
    relatedLessonId: 'micro-cell-structure',
    similarKey: 'micro-dna-genetics',
    content: {
      explanation: {
        en: 'Each organelle has a job: the nucleus stores instructions, mitochondria release energy, ribosomes build proteins, and the membrane controls entry and exit.',
        ta: 'ஒவ்வொரு நுண்ணுறுப்புக்கும் ஒரு பணி: கரு வழிமுறைகளைச் சேமிக்கிறது, மைட்டோகாண்ட்ரியா ஆற்றலை வெளியிடுகிறது, ரைபோசோம்கள் புரதம் கட்டுகின்றன, சவ்வு உள்வரவையும் வெளியேற்றத்தையும் கட்டுப்படுத்துகிறது.',
      },
      guidedExplanation: {
        en: 'Match organelle to duty: instructions → nucleus, energy → mitochondria, protein → ribosomes, gatekeeping → membrane.',
        ta: 'நுண்ணுறுப்பைப் பணியுடன் இணையுங்கள்: வழிமுறைகள் → கரு, ஆற்றல் → மைட்டோகாண்ட்ரியா, புரதம் → ரைபோசோம்கள், காவல் → சவ்வு.',
      },
      takeaway: {
        en: 'A cell works because each organelle does one specific job.',
        ta: 'ஒவ்வொரு நுண்ணுறுப்பும் ஒரு குறிப்பிட்ட பணி செய்வதாலேயே செல் இயங்குகிறது.',
      },
      memoryTip: {
        en: 'Nucleus = office, mitochondria = power plant.',
        ta: 'கரு = அலுவலகம், மைட்டோகாண்ட்ரியா = மின் நிலையம்.',
      },
      keyIdea: {
        en: 'Structure and function are paired in every organelle.',
        ta: 'ஒவ்வொரு நுண்ணுறுப்பிலும் அமைப்பும் பணியும் இணைந்தே உள்ளன.',
      },
    },
  },
  {
    id: 'fb-micro-dna-genetics',
    key: 'micro-dna-genetics',
    activity: 'micro_lesson',
    subject: 'biology',
    topicId: 'genetics',
    conceptId: 'dna-inheritance',
    misconceptionTag: 'none',
    relatedLessonId: 'micro-dna-genetics',
    similarKey: 'micro-cell-structure',
    content: {
      explanation: {
        en: 'DNA is a four-letter code on a twisted ladder. A gene is one section of that code, and genes carry traits from parents to offspring.',
        ta: 'DNA என்பது திருகு ஏணி வடிவில் எழுதப்பட்ட நான்கு எழுத்துக் குறியீடு. மரபணு என்பது அந்தக் குறியீட்டின் ஒரு பகுதி; பெற்றோரிடமிருந்து சந்ததிக்கு இயல்புகளைக் கொண்டு செல்கிறது.',
      },
      guidedExplanation: {
        en: 'Follow the chain: DNA molecule → gene (a section) → trait (an effect). Parents pass DNA copies, so children inherit their traits.',
        ta: 'சங்கிலியைப் பின்தொடருங்கள்: DNA மூலக்கூறு → மரபணு (ஒரு பகுதி) → இயல்பு (விளைவு). பெற்றோர் DNA நகல்களைக் கடத்துவதால் குழந்தைகள் அவற்றைப் பெறுகின்றனர்.',
      },
      takeaway: {
        en: 'Genes are DNA instructions passed from parents to children.',
        ta: 'மரபணுக்கள் பெற்றோரிடமிருந்து குழந்தைகளுக்குச் செல்லும் DNA வழிமுறைகள்.',
      },
      memoryTip: {
        en: 'DNA = the recipe book; genes = single recipes.',
        ta: 'DNA = சமையல் புத்தகம்; மரபணு = ஒவ்வொரு சமையல் குறிப்பு.',
      },
      keyIdea: {
        en: 'Inheritance works by copying DNA.',
        ta: 'DNA நகலெடுப்பதன் மூலமே மரபு வழித்தாங்கல் நிகழ்கிறது.',
      },
    },
  },
  {
    id: 'fb-micro-food-chains',
    key: 'micro-food-chains',
    activity: 'micro_lesson',
    subject: 'biology',
    topicId: 'ecosystems',
    conceptId: 'energy-flow',
    misconceptionTag: 'confusesFoodChainLevels',
    relatedLessonId: 'micro-food-chains',
    similarKey: 'micro-photosynthesis',
    content: {
      explanation: {
        en: 'Every chain starts with a producer that captures sunlight, not with an animal. Energy then flows to herbivores and on to carnivores, shrinking at each step.',
        ta: 'ஒவ்வொரு சங்கிலியும் சூரிய ஒளியைப் பிடிக்கும் உற்பத்தியாளரில் தொடங்குகிறது; விலங்கில் அல்ல. பிறகு ஆற்றல் தாவர உண்ணிகளுக்கும் ஊனுண்ணிகளுக்கும் பாய்ந்து, ஒவ்வொரு படியிலும் குறைகிறது.',
      },
      guidedExplanation: {
        en: 'Anchor the chain on the energy source: grass (producer) → cow (herbivore) → tiger (carnivore). No sunlight-capturer, no chain.',
        ta: 'சங்கிலியை ஆற்றல் மூலத்தில் நிறுத்துங்கள்: புல் (உற்பத்தியாளர்) → மாடு (தாவர உண்ணி) → புலி (ஊனுண்ணி). ஒளியைப் பிடிப்பது இல்லை என்றால் சங்கிலியே இல்லை.',
      },
      takeaway: {
        en: 'Energy flows one way through a chain, always starting from producers.',
        ta: 'ஆற்றல் சங்கிலியில் ஒரே திசையில் பாய்கிறது; தொடக்கம் எப்போதும் உற்பத்தியாளர்.',
      },
      memoryTip: {
        en: 'Sun → plant → animal → animal. Never the reverse.',
        ta: 'சூரியன் → செடி → விலங்கு → விலங்கு. திசை ஒருபோதும் மாறாது.',
      },
      keyIdea: {
        en: 'Producers convert sunlight into the food energy every chain uses.',
        ta: 'உற்பத்தியாளர்களே சூரிய ஒளியை உணவு ஆற்றலாக மாற்றுகிறார்கள்.',
      },
    },
  },
  {
    id: 'fb-micro-human-heart',
    key: 'micro-human-heart',
    activity: 'micro_lesson',
    subject: 'biology',
    topicId: 'human-body',
    conceptId: 'double-circulation',
    misconceptionTag: 'none',
    relatedLessonId: 'micro-human-heart',
    relatedExperimentId: 'exp-heart-rate',
    similarKey: 'micro-human-brain-reflexes',
    content: {
      explanation: {
        en: 'The heart is a double pump: the right side sends blood to the lungs for oxygen, and the left side pushes that oxygen-rich blood to the whole body.',
        ta: 'இதயம் இரட்டை ஏற்றி: வலது பக்கம் இரத்தத்தை நுரையீரலுக்கு அனுப்பி ஆக்சிஜன் பெறுகிறது; இடது பக்கம் அந்த ஆக்சிஜன் நிறைந்த இரத்தத்தை முழு உடலுக்கும் தள்ளுகிறது.',
      },
      guidedExplanation: {
        en: 'Two circuits, one heart: body → right side → lungs (collect oxygen) → left side → body. Valves keep every step flowing forward only.',
        ta: 'இரு சுற்றுகள், ஒரே இதயம்: உடல் → வலது பக்கம் → நுரையீரல் (ஆக்சிஜன்) → இடது பக்கம் → உடல். வால்வுகள் ஒவ்வொரு படியையும் முன்னோக்கியே ஓட்டுகின்றன.',
      },
      takeaway: {
        en: 'One heartbeat serves two circuits: lungs and body.',
        ta: 'ஒரே இதயத் துடிப்பு இரு சுற்றுகளுக்குப் பணிபுரிகிறது: நுரையீரல் மற்றும் உடல்.',
      },
      memoryTip: {
        en: 'Right = lungs, left = life.',
        ta: 'வலது = நுரையீரல், இடது = உடல்.',
      },
      keyIdea: {
        en: 'Double circulation keeps oxygen delivery continuous.',
        ta: 'இரட்டை சுற்றோட்டம் ஆக்சிஜன் வழங்கலைத் தொடர்ச்சியாக வைக்கிறது.',
      },
    },
  },
  {
    id: 'fb-micro-human-brain-reflexes',
    key: 'micro-human-brain-reflexes',
    activity: 'micro_lesson',
    subject: 'biology',
    topicId: 'human-body',
    conceptId: 'reflex-arc',
    misconceptionTag: 'none',
    relatedLessonId: 'micro-human-brain-reflexes',
    similarKey: 'micro-human-heart',
    content: {
      explanation: {
        en: 'Reflexes travel through the spinal cord, skipping the brain entirely. That shortcut acts in a split second — long before you consciously feel anything.',
        ta: 'தன்னியக்க எதிர்வினைகள் முள்ளந்தண்டு வழியாகச் செல்கின்றன; மூளையை முற்றிலும் தாண்டுகின்றன. அந்தக் குறுக்குவழி நொடிப்போக்கில் செயல்படுகிறது — நீங்கள் உணரும் முன்பே.',
      },
      guidedExplanation: {
        en: 'Compare the two routes: hand → spine → muscle (reflex, instant) versus hand → spine → brain → muscle (slow, conscious). Speed decides survival.',
        ta: 'இரு வழிகளை ஒப்பிடுங்கள்: கை → முள்ளந்தண்டு → தசை (உடனடி) எதிராக கை → முள்ளந்தண்டு → மூளை → தசை (மெதுவானது). வேகமே உயிரைக் காக்கிறது.',
      },
      takeaway: {
        en: 'Reflex arcs act before the brain knows — that speed protects you.',
        ta: 'தன்னியக்க வினைகள் மூளை அறியும் முன்பே செயல்படும் — அந்த வேகமே உங்களைக் காக்கிறது.',
      },
      memoryTip: {
        en: 'Spine first, brain second.',
        ta: 'முதலில் முள்ளந்தண்டு, பிறகு மூளை.',
      },
      keyIdea: {
        en: 'Shorter signal path = faster protective response.',
        ta: 'குறுகிய சமிக்ஞை பாதை = வேகமான பாதுகாப்பு எதிர்வினை.',
      },
    },
  },
  {
    id: 'fb-micro-microorganisms-bacteria',
    key: 'micro-microorganisms-bacteria',
    activity: 'micro_lesson',
    subject: 'biology',
    topicId: 'microorganisms',
    conceptId: 'helpful-microbes',
    misconceptionTag: 'none',
    relatedLessonId: 'micro-microorganisms-bacteria',
    similarKey: 'micro-food-chains',
    content: {
      explanation: {
        en: 'Only a minority of microbes cause disease. Most recycle nutrients, help digest food, and even make foods like curd and bread possible.',
        ta: 'சில நுண்ணுயிர்களே நோயை உண்டாக்குகின்றன. பெரும்பாலானவை சத்துக்களை மீட்டு, செரிமானத்திற்கு உதவி, தயிர் ரொட்டி போன்றவற்றை உருவாக்கவே காரணமாகின்றன.',
      },
      guidedExplanation: {
        en: 'Think of examples you know: curd, bread, compost. Each needs bacteria — so bacteria cannot be all bad.',
        ta: 'உங்களுக்குத் தெரிந்த உதாரணங்களை நினையுங்கள்: தயிர், ரொட்டி, உரம். ஒவ்வொன்றும் பாக்டீரியாவைச் சார்ந்தது — எனவே எல்லாமே கெட்டதாக இருக்க முடியாது.',
      },
      takeaway: {
        en: 'Microbes are mostly helpers; only a few are harmful.',
        ta: 'நுண்ணுயிர்கள் பெரும்பாலும் உதவியாளர்கள்; சிலவே தீங்கு விளைவிக்கின்றன.',
      },
      memoryTip: {
        en: 'Curd in your kitchen is bacteria at work.',
        ta: 'உங்கள் சமையலறை தயிர் பாக்டீரியாவின் வேலை.',
      },
      keyIdea: {
        en: 'Classify microbes by role, not by fear.',
        ta: 'நுண்ணுயிர்களை பயத்தால் அல்ல, பணியால் வகைப்படுத்துங்கள்.',
      },
    },
  },
  // ==================== SPACE (micro lessons) ====================
  {
    id: 'fb-micro-moon-phases',
    key: 'micro-moon-phases',
    activity: 'micro_lesson',
    subject: 'space',
    topicId: 'astronomy',
    conceptId: 'moon-phases',
    misconceptionTag: 'confusesRotationWithRevolution',
    relatedLessonId: 'micro-moon-phases',
    relatedExperimentId: 'exp-moon-phases',
    similarKey: 'micro-solar-system-orbits',
    content: {
      explanation: {
        en: 'The Moon makes no light of its own — we only see the sunlit half. As it orbits Earth, different amounts of that lit half face us, creating the phases.',
        ta: 'நிலா தானே ஒளி வெளியிடுவதில்லை — ஒளிபெற்ற பாதி மட்டுமே நமக்குத் தெரியும். அது பூமியைச் சுற்றும்போது நமக்குத் தெரியும் ஒளிபகுதியின் அளவு மாறுவதே நிலவு வடிவங்களை உருவாக்குகிறது.',
      },
      guidedExplanation: {
        en: 'Shine a torch on a ball and walk around it: the lit part never changes, but how much of it you see does. Same ball, different phases.',
        ta: 'பந்தின் மீது டார்ச் வெளிச்சம் போட்டு அதைச் சுற்றி நடந்து பாருங்கள்: ஒளிபெற்ற பகுதி மாறாது, ஆனால் நீங்கள் பார்க்கும் அளவு மாறும். அதே பந்து, வெவ்வேறு வடிவங்கள்.',
      },
      takeaway: {
        en: 'Moon phases are changing views of the sunlit half, not changing shadows.',
        ta: 'நிலவு வடிவங்கள் ஒளிபெற்ற பாதியின் மாறும் காட்சிகளே; நிழல்கள் அல்ல.',
      },
      memoryTip: {
        en: 'Same light, changing angle.',
        ta: 'ஒரே ஒளி, மாறும் கோணம்.',
      },
      keyIdea: {
        en: 'Orbit position determines the visible lit fraction.',
        ta: 'சுற்றுப்பாதையில் உள்ள இடமே தெரியும் ஒளிபகுதியைத் தீர்மானிக்கிறது.',
      },
    },
  },
  {
    id: 'fb-micro-solar-system-orbits',
    key: 'micro-solar-system-orbits',
    activity: 'micro_lesson',
    subject: 'space',
    topicId: 'astronomy',
    conceptId: 'orbits',
    misconceptionTag: 'none',
    relatedLessonId: 'micro-solar-system-orbits',
    similarKey: 'micro-gravity-weightlessness',
    content: {
      explanation: {
        en: 'A planet falls toward the Sun continuously, but its sideways speed carries it past. Falling plus sideways motion = a stable orbit.',
        ta: 'கோள் தொடர்ந்து சூரியனை நோக்கி விழுகிறது; ஆனால் அதன் பக்கவாட்டு வேகம் அதைத் தாண்டிச் செல்ல வைக்கிறது. விழுதல் + பக்கவாட்டு இயக்கம் = நிலையான சுற்றுப்பாதை.',
      },
      guidedExplanation: {
        en: 'Newton\'s cannonball: throw a ball faster and faster. At one exact speed, its fall curves as much as Earth bends — it never lands.',
        ta: 'நியூட்டனின் பீரங்கிக் குண்டு: பந்தை மிக வேகமாக வீசுங்கள். ஒரு குறிப்பிட்ட வேகத்தில் அதன் வீழ்ச்சி வளைவு பூமியின் வளைவுடன் பொருந்தும் — அது தரையை அடையாது.',
      },
      takeaway: {
        en: 'An orbit is perpetual falling that keeps missing the ground.',
        ta: 'சுற்றுப்பாதை என்பது தரையைத் தொடாமல் தொடரும் வீழ்ச்சி.',
      },
      memoryTip: {
        en: 'Fast sideways + pull inward = circle.',
        ta: 'வேகமான பக்கவாட்டு + உள்நோக்கிய ஈர்ப்பு = வட்டம்.',
      },
      keyIdea: {
        en: 'Gravity provides the pull; speed provides the miss.',
        ta: 'ஈர்ப்பு இழுவிசையைத் தருகிறது; வேகம் தப்பிதலைத் தருகிறது.',
      },
    },
  },
  {
    id: 'fb-micro-stars-black-holes',
    key: 'micro-stars-black-holes',
    activity: 'micro_lesson',
    subject: 'space',
    topicId: 'astronomy',
    conceptId: 'black-holes',
    misconceptionTag: 'none',
    relatedLessonId: 'micro-stars-black-holes',
    similarKey: 'micro-solar-system-orbits',
    content: {
      explanation: {
        en: 'When a massive star collapses, its gravity becomes so strong that nothing — not even light — can escape past a boundary. Nothing escaping means nothing shining: it looks black.',
        ta: 'மிகப் பெரிய விண்மீன் சுருங்கும்போது அதன் ஈர்ப்பு அளவில்லாத அளவு வலுவாகிறது; ஒரு எல்லையைத் தாண்டி ஒன்றுமே — ஒளி கூட — தப்ப முடியாது. ஒன்றும் தப்பாததால் எதுவும் ஒளிர்வதில்லை: கருப்பாகத் தோன்றும்.',
      },
      guidedExplanation: {
        en: 'Ask what "black" means here: not a dark object, but a region sending out nothing because nothing can leave it.',
        ta: '"கருப்பு" என்பது இங்கு என்ன: இருண்ட பொருள் அல்ல, எதுவும் வெளியேற முடியாததால் எதுவும் வெளியே போகாத பகுதி.',
      },
      takeaway: {
        en: 'A black hole traps even light — that is why it looks black.',
        ta: 'கருந்துளை ஒளியைக் கூடச் சிக்கவைக்கிறது — எனவே அது கருப்பாகத் தோன்றுகிறது.',
      },
      memoryTip: {
        en: 'Nothing out = nothing seen.',
        ta: 'வெளியேற்றம் இல்லை = காட்சி இல்லை.',
      },
      keyIdea: {
        en: 'Escape speed there exceeds the speed of light.',
        ta: 'அங்கு தப்பிக்கும் வேகம் ஒளியின் வேகத்தை விட அதிகம்.',
      },
    },
  },
  // ==================== ENVIRONMENT (micro lessons) ====================
  {
    id: 'fb-micro-water-cycle',
    key: 'micro-water-cycle',
    activity: 'micro_lesson',
    subject: 'environment',
    topicId: 'water-cycle',
    conceptId: 'evaporation-condensation',
    misconceptionTag: 'confusesEvaporationWithBoiling',
    relatedLessonId: 'micro-water-cycle',
    relatedExperimentId: 'exp-water-cycle',
    similarKey: 'micro-greenhouse-effect',
    content: {
      explanation: {
        en: 'The Sun lifts water as invisible vapour long before boiling. High up, cool air turns that vapour back into droplets, which fall as rain and collect again.',
        ta: 'சூரியன் நீரைக் கொதிக்கும் முன்பே கண்ணுக்குத் தெரியாத ஆவியாக மேலெழுப்புகிறது. உயரில் குளிர் காற்று ஆவியை மீண்டும் துளிகளாக்கி, அவை மழையாகப் பொழிந்து மீண்டும் சேர்கின்றன.',
      },
      guidedExplanation: {
        en: 'Follow the four stations in order: evaporation → condensation → precipitation → collection. Every stage feeds the next.',
        ta: 'நான்கு நிலையங்களை வரிசையாகப் பின்தொடருங்கள்: ஆவியாதல் → ஒடுக்கம் → மழைப்பொழிவு → சேமிப்பு. ஒவ்வொரு நிலையும் அடுத்ததை ஊட்டுகிறது.',
      },
      takeaway: {
        en: 'The same water cycles endlessly: up as vapour, down as rain.',
        ta: 'அதே நீர் முடிவில்லாமல் சுழல்கிறது: ஆவியாக மேலே, மழையாகக் கீழே.',
      },
      memoryTip: {
        en: 'Up, cool, fall, collect — repeat forever.',
        ta: 'மேலே, குளிர், விழு, சேர் — என்றென்றும் மீண்டும்.',
      },
      keyIdea: {
        en: 'Solar energy drives the entire water cycle.',
        ta: 'சூரிய ஆற்றலே முழு நீர் சுழற்சியையும் இயக்குகிறது.',
      },
    },
  },
  {
    id: 'fb-micro-greenhouse-effect',
    key: 'micro-greenhouse-effect',
    activity: 'micro_lesson',
    subject: 'environment',
    topicId: 'climate',
    conceptId: 'greenhouse-gases',
    misconceptionTag: 'none',
    relatedLessonId: 'micro-greenhouse-effect',
    relatedExperimentId: 'exp-greenhouse-effect',
    similarKey: 'micro-water-cycle',
    content: {
      explanation: {
        en: 'Sunlight passes in easily, but the infrared heat it becomes struggles to leave. Greenhouse gases hold that outgoing heat near the surface, raising the steady temperature.',
        ta: 'சூரிய ஒளி எளிதாக உள்ளே வருகிறது; ஆனால் அது மாறும் அகச்சிவப்பு வெப்பம் வெளியேறப் போராடுகிறது. பசுங்குடில் வாயுக்கள் அந்த வெப்பத்தை மேற்பரப்பு அருகில் பிடித்து, நிலையான வெப்பநிலையை உயர்த்துகின்றன.',
      },
      guidedExplanation: {
        en: 'Think of the summer car: light comes through the glass, heat cannot get out. The gas layer acts like that glass around Earth.',
        ta: 'கோடைக் காரை நினையுங்கள்: கண்ணாடி வழியே ஒளி உள்ளே, வெப்பம் வெளியேறாது. வாயு அடுக்கு பூமியைச் சுற்றி அந்தக் கண்ணாடி போல செயல்படுகிறது.',
      },
      takeaway: {
        en: 'Greenhouse gases trap outgoing heat and warm the lower atmosphere.',
        ta: 'பசுங்குடில் வாயுக்கள் வெளிப்போகும் வெப்பத்தைப் பிடித்து கீழ் வளிமண்டலத்தை சூடாக்குகின்றன.',
      },
      memoryTip: {
        en: 'Light in easily, heat out hard.',
        ta: 'ஒளி எளிதில் உள்ளே, வெப்பம் கடினத்தில் வெளியே.',
      },
      keyIdea: {
        en: 'One-way glass behaviour raises Earth\'s average temperature.',
        ta: 'ஒரு திசை கண்ணாடி நடத்தையே பூமியின் சராசரி வெப்பநிலையை உயர்த்துகிறது.',
      },
    },
  },
  {
    id: 'fb-micro-renewable-energy',
    key: 'micro-renewable-energy',
    activity: 'micro_lesson',
    subject: 'environment',
    topicId: 'energy',
    conceptId: 'renewable-resources',
    misconceptionTag: 'none',
    relatedLessonId: 'micro-renewable-energy',
    similarKey: 'micro-greenhouse-effect',
    content: {
      explanation: {
        en: 'Sun, wind, and flowing water refill themselves day after day. Coal and oil took millions of years to form, so once burned they are effectively gone.',
        ta: 'சூரியன், காற்று, பாயும் நீர் நாளுக்கு நாள் தம்மைத் தாமே புதுப்பிக்கின்றன. நிலக்கரியும் எண்ணெயும் உருவாக கோடிக்கணக்கான ஆண்டுகள் பிடித்தன; ஒருமுறை எரிந்தால் அவை முடிந்துவிடும்.',
      },
      guidedExplanation: {
        en: 'Sort by replenishment speed: daily sunshine vs millions of years for fossil fuels. Only the fast refill counts as renewable.',
        ta: 'மீள்நிரப்பு வேகத்தால் பிரியுங்கள்: தினமும் சூரிய ஒளி vs புதைபடிவ எரிபொருளுக்கு கோடி ஆண்டுகள். வேகமாக மீள்வது மட்டுமே மறுபுதுப்பிக்கத்தக்கது.',
      },
      takeaway: {
        en: 'Renewable means nature restocks it faster than we use it.',
        ta: 'நாம் பயன்படுத்தும் வேகத்தை விட இயற்கை விரைவாக நிரப்புவதே மறுபுதுப்பிக்கத்தக்க ஆற்றல்.',
      },
      memoryTip: {
        en: 'Renew = refills; fossil = finished.',
        ta: 'மறுபுதுப்பு = மீண்டும் நிரம்பும்; புதைபடிவம் = முடிந்துபோகும்.',
      },
      keyIdea: {
        en: 'Resource speed of renewal decides its category.',
        ta: 'வளம் மீளுருவாக்கம் பெறும் வேகமே அதன் வகையைத் தீர்மானிக்கிறது.',
      },
    },
  },
  {
    id: 'fb-micro-plant-transpiration',
    key: 'micro-plant-transpiration',
    activity: 'micro_lesson',
    subject: 'biology',
    topicId: 'plant-biology',
    conceptId: 'transpiration',
    misconceptionTag: 'confusesEvaporationWithBoiling',
    relatedLessonId: 'micro-plant-transpiration',
    similarKey: 'micro-water-cycle',
    content: {
      explanation: {
        en: 'Water evaporates from the leaf through tiny stomata. As vapour leaves, it pulls the next water molecules up the stem — a continuous chain from roots to air.',
        ta: 'இலையில் உள்ள சிறு துளைகள் வழியாக நீர் ஆவியாகிறது. ஆவி வெளியேறும்போது அடுத்த நீர் மூலக்கூறுகளைத் தண்டு வழியே மேலே இழுக்கிறது — வேரிலிருந்து காற்றுக்கு தொடர்ச்சியான சங்கிலி.',
      },
      guidedExplanation: {
        en: 'Picture a drinking straw: sipping at the top pulls the drink upward. Evaporation at the leaf is the sip; the stem is the straw.',
        ta: 'ஒரு குடிக்கும் குழாயை நினையுங்கள்: மேலே உறிஞ்சுவது பானத்தை மேலே இழுக்கிறது. இலையில் ஆவியாதல் அந்த உறிஞ்சுதல்; தண்டு அந்தக் குழாய்.',
      },
      takeaway: {
        en: 'Transpiration pulls water upward like a straw, powered by evaporation.',
        ta: 'ஆவியாதலால் இயக்கப்படும் குழாய் போன்ற இழுவையே நீரை மேலெடுக்கும் காய்ச்சல் (டிரான்ஸ்பிரேஷன்).',
      },
      memoryTip: {
        en: 'Leaf sips, roots supply.',
        ta: 'இலை உறிஞ்சும், வேர் வழங்கும்.',
      },
      keyIdea: {
        en: 'Evaporation creates the pull that lifts water in plants.',
        ta: 'ஆவியாதலே செடிகளில் நீரை மேலெழுப்பும் இழுவிசையை உருவாக்குகிறது.',
      },
    },
  },
  // ==================== EXPERIMENT REFLECTIONS ====================
  {
    id: 'fb-exp-ohms-law',
    key: 'exp-ohms-law',
    activity: 'experiment',
    subject: 'physics',
    topicId: 'electricity',
    conceptId: 'ohms-law',
    misconceptionTag: 'confusesCurrentWithVoltage',
    relatedExperimentId: 'exp-ohms-law',
    relatedLessonId: 'micro-electric-circuits',
    similarKey: 'exp-refraction',
    content: {
      explanation: {
        en: 'Ohm\'s Law says I = V / R. Keeping V at 10 and moving R from 5 to 10 doubles the denominator, so the current I halves from 2A to 1A.',
        ta: 'ஓம் விதி I = V / R. V ஐ 10 இல் வைத்து R ஐ 5 இலிருந்து 10 ஆக்கும்போது பகுதி இரட்டிப்பாகிறது; எனவே மின்னோட்டம் I 2A இலிருந்து 1A ஆகப் பாதியாகிறது.',
      },
      guidedExplanation: {
        en: 'Write the two fractions side by side: 10/5 = 2A and 10/10 = 1A. Same numerator, bigger denominator → smaller current.',
        ta: 'இரு பின்னங்களை அருகருகே எழுதுங்கள்: 10/5 = 2A மற்றும் 10/10 = 1A. அதே துணை, பெரிய பகுதி → குறைந்த மின்னோட்டம்.',
      },
      takeaway: {
        en: 'Current is inversely proportional to resistance.',
        ta: 'மின்னோட்டம் மின்தடைக்கு எதிர்விகிதத்தில் இருக்கும்.',
      },
      memoryTip: {
        en: 'More resistance = harder push = less flow.',
        ta: 'அதிக தடை = கடினமான தள்ளுதல் = குறைந்த ஓட்டம்.',
      },
      keyIdea: {
        en: 'I = V / R governs every simple circuit.',
        ta: 'I = V / R எந்த எளிய சுற்றையும் ஆளுகிறது.',
      },
    },
  },
  {
    id: 'fb-exp-density',
    key: 'exp-density',
    activity: 'experiment',
    subject: 'physics',
    topicId: 'density',
    conceptId: 'density-comparison',
    misconceptionTag: 'confusesMassWithWeight',
    relatedExperimentId: 'exp-density',
    relatedLessonId: 'micro-why-ice-floats',
    similarKey: 'exp-states-of-matter',
    content: {
      explanation: {
        en: 'Density = 120g ÷ 60 cm³ = 2.0 g/cm³. Water is 1.0 g/cm³, so the block is twice as dense and sinks.',
        ta: 'அடர்த்தி = 120 ÷ 60 = 2.0 கி/செ.மீ³. நீர் 1.0 கி/செ.மீ³; எனவே கட்டி இரு மடங்கு அடர்த்தி கொண்டது — மூழ்கும்.',
      },
      guidedExplanation: {
        en: 'Compare the two numbers directly: 2.0 vs 1.0. Denser than the liquid = sink; less dense = float. No other rule needed.',
        ta: 'இரு எண்களை நேரடியாக ஒப்பிடுங்கள்: 2.0 vs 1.0. திரவத்தை விட அடர்த்தி அதிகம் = மூழ்கும்; குறைவு = மிதக்கும். வேறு விதி தேவையில்லை.',
      },
      takeaway: {
        en: 'Compare object density with the liquid to predict sinking or floating.',
        ta: 'மூழ்குதல் மிதத்தலை கணிக்க பொருளின் அடர்த்தியை திரவத்துடன் ஒப்பிடுங்கள்.',
      },
      memoryTip: {
        en: 'Dense sinks, light floats.',
        ta: 'அடர்த்தி அதிகம் மூழ்கும், குறைவு மிதக்கும்.',
      },
      keyIdea: {
        en: 'Density, not weight alone, decides flotation.',
        ta: 'எடை மட்டுமல்ல, அடர்த்தியே மிதப்பை முடிவு செய்கிறது.',
      },
    },
  },
  {
    id: 'fb-exp-reflection',
    key: 'exp-reflection',
    activity: 'experiment',
    subject: 'physics',
    topicId: 'light-and-optics',
    conceptId: 'law-of-reflection',
    misconceptionTag: 'confusesReflectionWithRefraction',
    relatedExperimentId: 'exp-reflection',
    relatedLessonId: 'micro-light-reflection',
    similarKey: 'exp-refraction',
    content: {
      explanation: {
        en: 'The first law of reflection states that the angle of reflection always equals the angle of incidence, measured from the normal. 45° in gives 45° out.',
        ta: 'எதிரொளிப்பின் முதல் விதி: எதிரொளிப்புக் கோணம் எப்போதும் படுகோணத்திற்குச் சமம் — செங்குத்துக் கோட்டிலிருந்து அளந்தால். 45° உள்ளே = 45° வெளியே.',
      },
      guidedExplanation: {
        en: 'The simulation shows perfect symmetry around the normal line. Whatever angle you set, the outgoing ray mirrors it exactly.',
        ta: 'உருவகம் செங்குத்துக் கோட்டை மையமாகக் கொண்ட முழு சமச்சீரைக் காட்டுகிறது. எந்தக் கோணத்தை அமைத்தாலும் வெளிச்செல்லும் கதிர் அதை பிரதிபலிக்கிறது.',
      },
      takeaway: {
        en: 'Angle of incidence equals angle of reflection — always.',
        ta: 'படுகோணம் எதிரொளிப்புக் கோணத்திற்குச் சமம் — எப்போதும்.',
      },
      memoryTip: {
        en: 'Mirror symmetry is exact, never approximate.',
        ta: 'ஆடி சமச்சீர் துல்லியமானது; தோராயமானது அல்ல.',
      },
      keyIdea: {
        en: 'Reflection angles are measured from the normal line.',
        ta: 'எதிரொளிப்புக் கோணங்கள் செங்குத்துக் கோட்டிலிருந்து அளவிடப்படும்.',
      },
    },
  },
  {
    id: 'fb-exp-refraction',
    key: 'exp-refraction',
    activity: 'experiment',
    subject: 'physics',
    topicId: 'light-and-optics',
    conceptId: 'refraction',
    misconceptionTag: 'confusesReflectionWithRefraction',
    relatedExperimentId: 'exp-refraction',
    relatedLessonId: 'micro-light-reflection',
    similarKey: 'exp-reflection',
    content: {
      explanation: {
        en: 'Light slows down when it enters water because water is optically denser. This speed change makes the ray bend at the boundary — that bending is refraction.',
        ta: 'நீர் ஒளியியல் அடர்வானது என்பதால் ஒளி நீருக்குள் நுழையும்போது மெதுவாகிறது. இந்த வேக மாற்றம் கதிரை எல்லையில் வளைக்கிறது — அந்த வளைவே ஒளிவிலகல்.',
      },
      guidedExplanation: {
        en: 'Compare speeds: ~300,000 km/s in air, ~225,000 km/s in water. Different speeds on the two sides of a boundary force the path to bend.',
        ta: 'வேகங்களை ஒப்பிடுங்கள்: காற்றில் ~300,000 கி.மீ/வி, நீரில் ~225,000 கி.மீ/வி. எல்லையின் இருபுறமும் வேறுபட்ட வேகம் பாதையை வளைக்க வைக்கிறது.',
      },
      takeaway: {
        en: 'Refraction is bending caused by a speed change between media.',
        ta: 'ஊடகங்களுக்கு இடையேயான வேக மாற்றம் உருவாக்கும் வளைவே ஒளிவிலகல்.',
      },
      memoryTip: {
        en: 'Slow down → bend toward the normal.',
        ta: 'மெதுவானால் → செங்குத்துக் கோட்டை நோக்கி வளையும்.',
      },
      keyIdea: {
        en: 'Speed of light differs from medium to medium.',
        ta: 'ஒளியின் வேகம் ஊடகத்திற்கு ஊடகம் மாறும்.',
      },
    },
  },
  {
    id: 'fb-exp-free-fall',
    key: 'exp-free-fall',
    activity: 'experiment',
    subject: 'physics',
    topicId: 'gravitation',
    conceptId: 'gravitational-acceleration',
    misconceptionTag: 'confusesMassWithWeight',
    relatedExperimentId: 'exp-free-fall',
    relatedLessonId: 'micro-gravity-weightlessness',
    similarKey: 'exp-pendulum',
    content: {
      explanation: {
        en: 'Earth pulls with 9.8 m/s² while the Moon manages only 1.6 m/s². Six times the acceleration means the hammer reaches the ground far sooner on Earth.',
        ta: 'பூமி 9.8 மீ/வி² இழுக்கிறது; சந்திரன் 1.6 மீ/வி² மட்டுமே. ஆறு மடங்கு முடுக்கம் என்றால் சுத்தியல் பூமியில் மிக விரைவாகத் தரையைத் தொடும்.',
      },
      guidedExplanation: {
        en: 'Use t = √(2h/g): smaller g gives larger t. Dividing by 1.6 instead of 9.8 makes the fall time about 2.5× longer on the Moon.',
        ta: 't = √(2h/g) பயன்படுத்துங்கள்: g குறையும்போது t கூடும். 9.8க்கு பதிலாக 1.6 ஆல் வகுக்கும்போது சந்திரனில் நேரம் 2.5 மடங்கு அதிகம்.',
      },
      takeaway: {
        en: 'Weaker gravity means longer fall time for the same height.',
        ta: 'ஈர்ப்பு குறைவு என்றால் அதே உயரத்தில் விழும் நேரம் அதிகம்.',
      },
      memoryTip: {
        en: 'Low g = lazy fall.',
        ta: 'குறைந்த g = மந்தமான வீழ்ச்சி.',
      },
      keyIdea: {
        en: 'Fall time depends only on height and local gravity.',
        ta: 'விழும் நேரம் உயரம் மற்றும் அங்குள்ள ஈர்ப்பின் மீது மட்டுமே சார்ந்தது.',
      },
    },
  },
  {
    id: 'fb-exp-pendulum',
    key: 'exp-pendulum',
    activity: 'experiment',
    subject: 'physics',
    topicId: 'motion',
    conceptId: 'pendulum-period',
    misconceptionTag: 'none',
    relatedExperimentId: 'exp-pendulum',
    relatedLessonId: 'micro-newtons-first-law',
    similarKey: 'exp-free-fall',
    content: {
      explanation: {
        en: 'The formula T = 2π√(L/g) contains only length and gravity — mass never appears. A longer pendulum takes more time per swing, so the clock ticks slower.',
        ta: 'T = 2π√(L/g) சூத்திரத்தில் நீளமும் ஈர்ப்பும் மட்டுமே உள்ளன — நிறை இல்லை. நீளமான ஊசலுக்கு ஒரு வீச்சுக்கு அதிக நேரம்; எனவே கடிகாரம் மெதுவாகும்.',
      },
      guidedExplanation: {
        en: 'Check the simulation: changing mass 50g → 500g changed nothing. Changing length clearly slowed the swing. Only L matters.',
        ta: 'உருவகத்தைச் சரிபார்: நிறை 50 → 500 மாற்றியது எதுவும் மாற்றவில்லை. நீளத்தை மாற்றியது வீச்சை தெளிவாக மெதுவாக்கியது. L மட்டுமே முக்கியம்.',
      },
      takeaway: {
        en: 'Pendulum period grows with length; mass is irrelevant.',
        ta: 'ஊசல் காலம் நீளத்துடன் கூடும்; நிறை பொருந்தாது.',
      },
      memoryTip: {
        en: 'Long arm, slow swing.',
        ta: 'நீளமான கை, மெதுவான வீச்சு.',
      },
      keyIdea: {
        en: 'T = 2π√(L/g) — length in, mass out.',
        ta: 'T = 2π√(L/g) — நீளம் உள்ளே, நிறை வெளியே.',
      },
    },
  },
  {
    id: 'fb-exp-ph-explorer',
    key: 'exp-ph-explorer',
    activity: 'experiment',
    subject: 'chemistry',
    topicId: 'acids-and-bases',
    conceptId: 'ph-scale',
    misconceptionTag: 'none',
    relatedExperimentId: 'exp-ph-explorer',
    relatedLessonId: 'micro-acids-bases-ph',
    similarKey: 'exp-solubility',
    content: {
      explanation: {
        en: 'Red indicator with pH 2.5 signals a strong acid: values far below 7 mean a high concentration of H+ ions.',
        ta: 'pH 2.5 உடன் சிவப்பு நிறங்காட்டி வலுவான அமிலத்தைக் குறிக்கிறது: 7க்கு மிகக் கீழ் என்றால் H+ அயனிகளின் செறிவு அதிகம்.',
      },
      guidedExplanation: {
        en: 'Use the colour ladder: red = strong acid, orange/yellow = weak acid, green = neutral, blue/purple = base. Red at pH 2.5 sits at the top of the acid range.',
        ta: 'நிற ஏணியைப் பயன்படுத்துங்கள்: சிவப்பு = வலுவான அமிலம், ஆரஞ்சு/மஞ்சள் = பலவீனமான அமிலம், பச்சை = நடுநிலை, நீல/ஊதா = காரம். pH 2.5 அமிலப் பகுதியின் உச்சத்தில் உள்ளது.',
      },
      takeaway: {
        en: 'Strong acids sit near pH 0–3 and turn indicators red.',
        ta: 'வலுவான அமிலங்கள் pH 0–3 அருகில் இருந்து நிறங்காட்டியைச் சிவப்பாக்கும்.',
      },
      memoryTip: {
        en: 'Red = acid on fire.',
        ta: 'சிவப்பு = தீப்பற்றிய அமிலம்.',
      },
      keyIdea: {
        en: 'Indicator colour maps directly onto the pH range.',
        ta: 'நிறங்காட்டியின் நிறம் நேரடியாக pH பரப்பைக் குறிக்கிறது.',
      },
    },
  },
  {
    id: 'fb-exp-solubility',
    key: 'exp-solubility',
    activity: 'experiment',
    subject: 'chemistry',
    topicId: 'solutions',
    conceptId: 'solubility-temperature',
    misconceptionTag: 'confusesSolubilityWithMelting',
    relatedExperimentId: 'exp-solubility',
    relatedLessonId: 'micro-solutions-solvents',
    similarKey: 'exp-states-of-matter',
    content: {
      explanation: {
        en: 'Hot water holds more dissolved sugar than cold water. When the saturated hot solution cools, its capacity drops and the excess sugar crystallizes out.',
        ta: 'சூடான நீர் குளிர்ந்த நீரை விட அதிக சர்க்கரையைக் கரைத்து வைக்கும். தெவிட்டிய சூடான கரைசல் குளிர்ந்ததும் கொள்ளளவு குறைந்து, கூடுதல் சர்க்கரை படிகமாக வெளிவருகிறது.',
      },
      guidedExplanation: {
        en: 'Follow capacity with temperature: hotter → more solute fits; cooler → less fits. The overflow has nowhere to go but solid crystals.',
        ta: 'வெப்பநிலையுடன் கொள்ளளவைப் பின்தொடருங்கள்: சூடு → அதிக கரைபொருள்; குளிர் → குறைவு. மிகுதிக்கு வேறு வழியில்லை — திண்ம படிகமாகும்.',
      },
      takeaway: {
        en: 'Cooling a saturated solution forces crystals out.',
        ta: 'தெவிட்டிய கரைசல் குளிர்ந்தால் படிகங்கள் வெளியேறும்.',
      },
      memoryTip: {
        en: 'Hot holds more, cold lets go.',
        ta: 'சூடு அதிகம் பிடிக்கும், குளிர் விட்டுவிடும்.',
      },
      keyIdea: {
        en: 'Solubility of most solids rises with temperature.',
        ta: 'பெரும்பாலான திடப்பொருட்களின் கரைதிறன் வெப்பநிலையுடன் கூடுகிறது.',
      },
    },
  },
  {
    id: 'fb-exp-states-of-matter',
    key: 'exp-states-of-matter',
    activity: 'experiment',
    subject: 'chemistry',
    topicId: 'states-of-matter',
    conceptId: 'kinetic-theory',
    misconceptionTag: 'none',
    relatedExperimentId: 'exp-states-of-matter',
    relatedLessonId: 'micro-states-of-matter',
    similarKey: 'exp-solubility',
    content: {
      explanation: {
        en: 'Steam molecules are the same size as water molecules — they are just far apart. High kinetic energy lets them spread, so the same substance fills vastly more space.',
        ta: 'நீராவி மூலக்கூறுகள் நீர் மூலக்கூறுகளைப் போலவே அளவுள்ளவை — அவை வெறுமனே விலகி உள்ளன. அதிக இயக்க ஆற்றல் அவற்றைப் பரப்புவதால், அதே பொருள் மிக அதிக இடத்தை நிரப்புகிறது.',
      },
      guidedExplanation: {
        en: 'Rule out the wrong ideas: molecules did not grow and steam is not heavier. Only the spacing changed — that is the kinetic theory.',
        ta: 'தவறான எண்ணங்களை நீக்குங்கள்: மூலக்கூறுகள் பெரிதாகவில்லை; நீராவி கனமானதும் அல்ல. இடைவெளி மட்டுமே மாறியது — இதுவே இயக்கக் கொள்கை.',
      },
      takeaway: {
        en: 'Gas volume comes from spacing, not from molecule size.',
        ta: 'வாயுவின் பருமன் துகள் அளவிலிருந்தல்ல, இடைவெளியிலிருந்து வருகிறது.',
      },
      memoryTip: {
        en: 'Spread out, not swollen.',
        ta: 'பரந்தது; வீங்கவில்லை.',
      },
      keyIdea: {
        en: 'Particle kinetic energy sets the state of matter.',
        ta: 'துகள்களின் இயக்க ஆற்றலே பருப்பொருளின் நிலையைத் தீர்மானிக்கிறது.',
      },
    },
  },
  {
    id: 'fb-exp-reaction-rate',
    key: 'exp-reaction-rate',
    activity: 'experiment',
    subject: 'chemistry',
    topicId: 'chemical-reactions',
    conceptId: 'collision-theory',
    misconceptionTag: 'none',
    relatedExperimentId: 'exp-reaction-rate',
    relatedLessonId: 'micro-chemical-reactions',
    similarKey: 'exp-solubility',
    content: {
      explanation: {
        en: 'Reactions happen when particles collide with enough energy. Hotter particles move faster, so collisions happen more often and with more energy — the reaction speeds up.',
        ta: 'துகள்கள் போதுமான ஆற்றலுடன் மோதும்போது வினை நிகழ்கிறது. சூடான துகள்கள் வேகமாக நகர்வதால் மோதல்கள் அடிக்கடி, அதிக ஆற்றலுடன் நிகழ்கின்றன — வினை வேகப்படுகிறது.',
      },
      guidedExplanation: {
        en: 'Use collision theory as a checklist: more collisions? more energy per collision? Heat raises both — that is why temperature is such a strong lever.',
        ta: 'மோதுகை கொள்கையை சரிபார்ப்புப் பட்டியலாகப் பயன்படுத்துங்கள்: மோதல் அதிகமா? ஒரு மோதலுக்கான ஆற்றல் அதிகமா? வெப்பம் இரண்டையும் உயர்த்துகிறது — எனவே வெப்பநிலை வலுவான கட்டுப்பாடு.',
      },
      takeaway: {
        en: 'Higher temperature means more frequent, more energetic collisions.',
        ta: 'அதிக வெப்பநிலை என்றால் அடிக்கடி, அதிக ஆற்றலுள்ள மோதல்கள்.',
      },
      memoryTip: {
        en: 'Hot particles crash more.',
        ta: 'சூடான துகள்கள் அதிகம் மோதும்.',
      },
      keyIdea: {
        en: 'Collision frequency and energy set the reaction rate.',
        ta: 'மோதல் அதிர்வெண்ணும் ஆற்றலுமே வினை வேகத்தைத் தீர்மானிக்கின்றன.',
      },
    },
  },
  {
    id: 'fb-exp-photosynthesis',
    key: 'exp-photosynthesis',
    activity: 'experiment',
    subject: 'biology',
    topicId: 'photosynthesis',
    conceptId: 'light-intensity',
    misconceptionTag: 'confusesPhotosynthesisWithRespiration',
    relatedExperimentId: 'exp-photosynthesis',
    relatedLessonId: 'micro-photosynthesis',
    similarKey: 'exp-heart-rate',
    content: {
      explanation: {
        en: 'The oxygen bubbles count the photosynthesis rate. More light means more energy for the reaction, so a brighter lamp produces bubbles faster.',
        ta: 'ஆக்சிஜன் குமிழ்கள் ஒளிச்சேர்க்கை வேகத்தைக் காட்டுகின்றன. அதிக ஒளி என்றால் அதிக ஆற்றல்; எனவே பிரகாசமான விளக்கு வேகமாகக் குமிழ்களை உருவாக்குகிறது.',
      },
      guidedExplanation: {
        en: 'Compare runs: dim light → few bubbles, bright light → many bubbles. The bubbles are oxygen, the direct product of photosynthesis.',
        ta: 'இயக்கங்களை ஒப்பிடுங்கள்: மங்கலான ஒளி → குறைவான குமிழ்கள், பிரகாசமான ஒளி → அதிக குமிழ்கள். அந்தக் குமிழ்கள் ஆக்சிஜன் — ஒளிச்சேர்க்கையின் நேரடி விளைவு.',
      },
      takeaway: {
        en: 'Light intensity directly controls the rate of photosynthesis.',
        ta: 'ஒளியின் தீவிரம் நேரடியாக ஒளிச்சேர்க்கை வேகத்தைக் கட்டுப்படுத்துகிறது.',
      },
      memoryTip: {
        en: 'Brighter light, faster bubbles.',
        ta: 'பிரகாசமான ஒளி, வேகமான குமிழ்.',
      },
      keyIdea: {
        en: 'Light is the energy input you can measure by bubbles.',
        ta: 'ஒளியே குமிழ்களால் அளக்கக்கூடிய ஆற்றல் உள்ளீடு.',
      },
    },
  },
  {
    id: 'fb-exp-heart-rate',
    key: 'exp-heart-rate',
    activity: 'experiment',
    subject: 'biology',
    topicId: 'human-body',
    conceptId: 'oxygen-demand',
    misconceptionTag: 'none',
    relatedExperimentId: 'exp-heart-rate',
    relatedLessonId: 'micro-human-heart',
    similarKey: 'exp-photosynthesis',
    content: {
      explanation: {
        en: 'Running muscles burn oxygen faster. The heart responds by beating more times per minute so oxygen-rich blood arrives quickly enough.',
        ta: 'ஓடும் தசைகள் ஆக்சிஜனை வேகமாகச் செலவழிக்கின்றன. ஆக்சிஜன் நிறைந்த இரத்தம் உடனடியாக வர இதயம் நிமிடத்திற்கு அதிக முறை துடிக்கிறது.',
      },
      guidedExplanation: {
        en: 'Link the chain: more activity → more oxygen needed → faster heartbeat → faster delivery. The pulse is the delivery system speeding up.',
        ta: 'சங்கிலியை இணையுங்கள்: அதிக செயல்பாடு → அதிக ஆக்சிஜன் தேவை → வேகமான இதயத் துடிப்பு → வேகமான வழங்கல். நாடித் துடிப்பு வேகமாகும் விநியோக அமைப்பு.',
      },
      takeaway: {
        en: 'Heart rate rises to match the muscles\' oxygen demand.',
        ta: 'தசைகளின் ஆக்சிஜன் தேவைக்கு ஏற்ப இதயத் துடிப்பு உயர்கிறது.',
      },
      memoryTip: {
        en: 'Run fast, heart races.',
        ta: 'வேகமாக ஓடினால், இதயமும் ஓடும்.',
      },
      keyIdea: {
        en: 'Blood circulation is the oxygen delivery service.',
        ta: 'இரத்த ஓட்டமே ஆக்சிஜன் விநியோக சேவை.',
      },
    },
  },
  {
    id: 'fb-exp-moon-phases',
    key: 'exp-moon-phases',
    activity: 'experiment',
    subject: 'space',
    topicId: 'astronomy',
    conceptId: 'moon-phases',
    misconceptionTag: 'confusesRotationWithRevolution',
    relatedExperimentId: 'exp-moon-phases',
    relatedLessonId: 'micro-moon-phases',
    similarKey: 'micro-solar-system-orbits',
    content: {
      explanation: {
        en: 'The lit shape changes as the Moon travels its orbit, shifting how much of the sunlit half faces Earth. New moon and full moon are the two ends of that cycle.',
        ta: 'நிலா தன் சுற்றுப்பாதையில் நகரும்போது, பூமியை நோக்கி இருக்கும் ஒளிபெற்ற பாதி மாறுவதால் வடிவம் மாறுகிறது. அமாவாசையும் பௌர்ணமியும் அந்த சுழற்சியின் இரு முனைகள்.',
      },
      guidedExplanation: {
        en: 'Step through the cycle: new → crescent → half → gibbous → full → and back. Each step is the same Moon, seen from a new angle.',
        ta: 'சுழற்சியில் படிப்படியாகச் செல்லுங்கள்: அமாவாசை → கோடிங்கு → அரை நிலவு → பெரும்பகுதி → பௌர்ணமி → மீண்டும். ஒவ்வொரு படியும் அதே நிலவு, புதிய கோணம்.',
      },
      takeaway: {
        en: 'Phases repeat every orbit: lit fraction grows then shrinks.',
        ta: 'ஒவ்வொரு சுற்றிலும் வடிவங்கள் திரும்பும்: ஒளிபகுதி கூடி பிறகு குறையும்.',
      },
      memoryTip: {
        en: 'Grow to full, shrink to new.',
        ta: 'பெரிதாகி பௌர்ணமி, சிறுத்து அமாவாசை.',
      },
      keyIdea: {
        en: 'Orbital position creates every phase.',
        ta: 'சுற்றுப்பாதையில் உள்ள நிலையே ஒவ்வொரு வடிவத்தையும் உருவாக்குகிறது.',
      },
    },
  },
  {
    id: 'fb-exp-water-cycle',
    key: 'exp-water-cycle',
    activity: 'experiment',
    subject: 'environment',
    topicId: 'water-cycle',
    conceptId: 'cycle-stages',
    misconceptionTag: 'confusesEvaporationWithBoiling',
    relatedExperimentId: 'exp-water-cycle',
    relatedLessonId: 'micro-water-cycle',
    similarKey: 'exp-greenhouse-effect',
    content: {
      explanation: {
        en: 'The model shows all four stages: heating drives evaporation, cooling drives condensation, droplets grow into precipitation, and collection restarts the loop.',
        ta: 'மாதிரி நான்கு நிலைகளையும் காட்டுகிறது: வெப்பம் ஆவியாதலை இயக்குகிறது, குளிர் ஒடுக்கத்தை உருவாக்குகிறது, துளிகள் மழையாக விழுகின்றன, சேமிப்பு சுழற்சியை மீண்டும் தொடங்க வைக்கிறது.',
      },
      guidedExplanation: {
        en: 'Match each part of the model to a stage: lamp = Sun, cold lid = high cool air, dripping = rain, tray = collection.',
        ta: 'மாதிரியின் ஒவ்வொரு பகுதியையும் ஒரு நிலையுடன் இணையுங்கள்: விளக்கு = சூரியன், குளிர் மூடி = உயர் குளிர் காற்று, சொட்டுகள் = மழை, தட்டு = சேமிப்பு.',
      },
      takeaway: {
        en: 'Every stage of the water cycle is powered by heat differences.',
        ta: 'நீர் சுழற்சியின் ஒவ்வொரு நிலையும் வெப்ப வேறுபாட்டால் இயக்கப்படுகிறது.',
      },
      memoryTip: {
        en: 'Heat up, cool down, rain down.',
        ta: 'சூடாகு, குளிராகு, மழையாகி விழு.',
      },
      keyIdea: {
        en: 'The cycle is a closed loop — no water is ever lost.',
        ta: 'சுழற்சி மூடிய வளையம் — நீர் ஒருபோதும் இழப்பதில்லை.',
      },
    },
  },
  {
    id: 'fb-exp-greenhouse-effect',
    key: 'exp-greenhouse-effect',
    activity: 'experiment',
    subject: 'environment',
    topicId: 'climate',
    conceptId: 'heat-trapping',
    misconceptionTag: 'none',
    relatedExperimentId: 'exp-greenhouse-effect',
    relatedLessonId: 'micro-greenhouse-effect',
    similarKey: 'exp-water-cycle',
    content: {
      explanation: {
        en: 'Inside the model, trapped gas keeps outgoing infrared heat close to the surface, so the inside settles at a higher steady temperature than outside.',
        ta: 'மாதிரிக்குள் சிக்கியுள்ள வாயு வெளிப்போகும் அகச்சிவப்பு வெப்பத்தை மேற்பரப்பு அருகில் வைப்பதால், உள்ளே வெளியை விட அதிக நிலையான வெப்பநிலை ஏற்படுகிறது.',
      },
      guidedExplanation: {
        en: 'Watch the two thermometers: outside rises less, inside keeps climbing. The difference is exactly the trapped heat.',
        ta: 'இரு வெப்பமானிகளைப் பாருங்கள்: வெளியே குறைவாக உயர்கிறது, உள்ளே தொடர்ந்து ஏறுகிறது. அந்த வித்தியாசமே பிடிபட்ட வெப்பம்.',
      },
      takeaway: {
        en: 'Trapped infrared heat raises the equilibrium temperature.',
        ta: 'சிக்கிய அகச்சிவப்பு வெப்பம் சமநிலை வெப்பநிலையை உயர்த்துகிறது.',
      },
      memoryTip: {
        en: 'In easily, out with difficulty = warmer inside.',
        ta: 'உள்ளே எளிது, வெளியே கடினம் = உள்ளே அதிக வெப்பம்.',
      },
      keyIdea: {
        en: 'Gas composition changes how much heat escapes.',
        ta: 'வாயு கலவையே எவ்வளவு வெப்பம் தப்புகிறது என்பதை மாற்றுகிறது.',
      },
    },
  },
  // ==================== QUIZ (cross-subject anchors from existing bank) ====================
  {
    id: 'fb-quiz-phyf-101',
    key: 'quiz-phyf-101',
    activity: 'quiz',
    subject: 'physics',
    topicId: 'force-and-motion',
    conceptId: 'force-definition',
    misconceptionTag: 'confusesInertiaWithForce',
    similarKey: 'micro-newtons-first-law',
    content: {
      explanation: {
        en: 'A force is simply a push or a pull acting on an object. Every opening door, kicking ball, or braking bus involves a force.',
        ta: 'விசை என்பது ஒரு பொருளின் மீது செயல்படும் தள்ளுதல் அல்லது இழுத்தல் மட்டுமே. கதவைத் திறத்தல், பந்தை உதைத்தல் எல்லாமே விசை.',
      },
      guidedExplanation: {
        en: 'Rule out the odd options: food, sound, and light are not pushes or pulls. Only "push or pull" matches everyday forces.',
        ta: 'தவறான விடைகளை நீக்குங்கள்: உணவு, ஒலி, ஒளி — இவை தள்ளுதல் அல்லது இழுத்தல் அல்ல. "தள்ளுதல் அல்லது இழுத்தல்" மட்டுமே பொருந்தும்.',
      },
      takeaway: {
        en: 'Force = push or pull on an object.',
        ta: 'விசை = பொருளின் மீதான தள்ளுதல் அல்லது இழுத்தல்.',
      },
      memoryTip: {
        en: 'If you can push or pull it, a force is acting.',
        ta: 'தள்ள அல்லது இழுக்க முடிந்தால் அதில் விசை செயல்படுகிறது.',
      },
      keyIdea: {
        en: 'Forces start, stop, or change motion.',
        ta: 'விசைகள் இயக்கத்தைத் தொடங்கவும் நிறுத்தவும் மாற்றவும் செய்யும்.',
      },
    },
  },
  {
    id: 'fb-quiz-chemf-102',
    key: 'quiz-chemf-102',
    activity: 'quiz',
    subject: 'chemistry',
    topicId: 'states-of-matter',
    conceptId: 'states',
    misconceptionTag: 'confusesSolubilityWithMelting',
    similarKey: 'micro-states-of-matter',
    content: {
      explanation: {
        en: 'At room temperature water flows and takes the shape of its container while keeping a fixed volume — the definition of a liquid.',
        ta: 'அறை வெப்பநிலையில் நீர் பாய்ந்து கொள்கலனின் வடிவம் எடுக்கும், ஆனால் நிலையான கன அளவை வைத்திருக்கும் — இதுவே திரவத்தின் வரையறை.',
      },
      guidedExplanation: {
        en: 'Check the two properties: fixed volume? yes. Fixed shape? no — it follows the container. That combination means liquid.',
        ta: 'இரு பண்புகளைச் சரிபார்: நிலையான கன அளவா? ஆம். நிலையான வடிவமா? இல்லை — கொள்கலனைப் பின்பற்றுகிறது. இந்தக் கலவையே திரவம்.',
      },
      takeaway: {
        en: 'Liquids: fixed volume, changing shape.',
        ta: 'திரவங்கள்: நிலையான கன அளவு, மாறும் வடிவம்.',
      },
      memoryTip: {
        en: 'Water bends to its bottle but never shrinks.',
        ta: 'நீர் பாட்டிலின் வடிவம் எடுக்கும்; கன அளவு மாறாது.',
      },
      keyIdea: {
        en: 'Particle mobility separates solids, liquids, and gases.',
        ta: 'துகள்களின் நகரும் தன்மையே திண்ம, திரவ, வாயுவைப் பிரிக்கிறது.',
      },
    },
  },
  {
    id: 'fb-quiz-biof-101',
    key: 'quiz-biof-101',
    activity: 'quiz',
    subject: 'biology',
    topicId: 'living-things',
    conceptId: 'life-needs',
    misconceptionTag: 'none',
    similarKey: 'micro-cell-structure',
    content: {
      explanation: {
        en: 'All living things need food, water, air, and a suitable habitat to survive. Missing any one of these ends life.',
        ta: 'எல்லா உயிரினங்களுக்கும் உணவு, நீர், காற்று, பொருத்தமான வாழ்விடம் தேவை. இவற்றில் ஒன்று கூட இல்லாதால் உயிர் நிற்கும்.',
      },
      guidedExplanation: {
        en: 'Test any organism you know — a plant, a fish, yourself. Each needs energy, water, oxygen, and a place to live.',
        ta: 'உங்களுக்குத் தெரிந்த எந்த உயிரினத்தையும் சோதியுங்கள் — செடி, மீன், நீங்கள். ஒவ்வொன்றுக்கும் ஆற்றல், நீர், ஆக்சிஜன், வாழ்விடம் தேவை.',
      },
      takeaway: {
        en: 'Food, water, air, and habitat are the universal needs of life.',
        ta: 'உணவு, நீர், காற்று, வாழ்விடம் — உயிரின் அனைத்துலகத் தேவைகள்.',
      },
      memoryTip: {
        en: 'FWAH: Food, Water, Air, Habitat.',
        ta: 'உணவு-நீர்-காற்று-இடம்: நான்கும் அத்தியாவசியம்.',
      },
      keyIdea: {
        en: 'Life requirements are shared by every organism.',
        ta: 'உயிர் தேவைகள் அனைத்து உயிரினங்களுக்கும் பொதுவானவை.',
      },
    },
  },
  {
    id: 'fb-quiz-phy-010',
    key: 'quiz-phy-010',
    activity: 'quiz',
    subject: 'physics',
    topicId: 'force-and-motion',
    conceptId: 'inertia-mass',
    misconceptionTag: 'confusesMassWithWeight',
    similarKey: 'micro-newtons-first-law',
    content: {
      explanation: {
        en: 'Inertia depends only on mass: more mass means more resistance to change in motion. A loaded truck has far more mass than a bicycle.',
        ta: 'நிலைமம் நிறையை மட்டுமே சார்ந்தது: அதிக நிறை என்றால் இயக்க மாற்றத்திற்கு அதிக எதிர்ப்பு. சுமை ஏற்றிய லாரி மிதிவண்டியை விட மிக அதிக நிறை கொண்டது.',
      },
      guidedExplanation: {
        en: 'Compare stopping distances at the same speed: the heavy truck takes much longer to stop — that difficulty is exactly its inertia.',
        ta: 'ஒரே வேகத்தில் நிற்கும் தூரத்தை ஒப்பிடுங்கள்: கனமான லாரி நிற்க அதிக நேரம் எடுக்கும் — அந்தச் சிரமமே அதன் நிலைமம்.',
      },
      takeaway: {
        en: 'More mass = more inertia.',
        ta: 'அதிக நிறை = அதிக நிலைமம்.',
      },
      memoryTip: {
        en: 'Heavy things are stubborn.',
        ta: 'கனமானவை பிடிவாதமானவை.',
      },
      keyIdea: {
        en: 'Inertia is measured by mass alone.',
        ta: 'நிலைமம் நிறையால் மட்டுமே அளக்கப்படுகிறது.',
      },
    },
  },
  {
    id: 'fb-quiz-chemf-103',
    key: 'quiz-chemf-103',
    activity: 'quiz',
    subject: 'chemistry',
    topicId: 'air',
    conceptId: 'air-composition',
    misconceptionTag: 'none',
    similarKey: 'micro-photosynthesis',
    content: {
      explanation: {
        en: 'Air is a mixture, and breathing takes in oxygen — the gas our body needs to release energy from food.',
        ta: 'காற்று ஒரு கலவை; நாம் சுவாசிக்கும்போது ஆக்சிஜனை உள்வாங்குகிறோம் — உணவிலிருந்து ஆற்றலை வெளியிட உடலுக்குத் தேவையான வாயு.',
      },
      guidedExplanation: {
        en: 'Separate the mixture: nitrogen is the largest share but inert, carbon dioxide is the waste we breathe out, oxygen is the one we need in.',
        ta: 'கலவையைப் பிரியுங்கள்: நைட்ரஜன் அதிகமாக உள்ளதாலும் செயலற்றதாகவும் இருக்கிறது, கார்பன் டை ஆக்சைடு நாம் வெளியேற்றும் கழிவு, ஆக்சிஜன் நமக்குத் தேவையானது.',
      },
      takeaway: {
        en: 'We breathe in oxygen; nitrogen is abundant but unused.',
        ta: 'நாம் ஆக்சிஜனை சுவாசிக்கிறோம்; நைட்ரஜன் நிறைந்திருந்தும் பயன்படுவதில்லை.',
      },
      memoryTip: {
        en: 'O = oxygen = our gas.',
        ta: 'O = ஆக்சிஜன் = நமது வாயு.',
      },
      keyIdea: {
        en: 'Air is a mixture with exactly one breathing gas.',
        ta: 'காற்று ஒரு கலவை; அதில் சுவாசிக்கப்படும் வாயு ஒன்றே ஒன்று.',
      },
    },
  },
];

/** Quick map for O(1) lookups by id. */
export const FEEDBACK_ENTRIES_BY_ID: Record<string, FeedbackEntry> = Object.fromEntries(
  FEEDBACK_ENTRIES.map((e) => [e.id, e])
);
