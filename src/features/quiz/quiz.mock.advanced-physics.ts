/**
 * Advanced-Level Physics Questions (Classes 11–12)
 * Grade-appropriate bilingual questions for phy-a-1 (Kinematics & Dynamics),
 * phy-a-2 (Thermodynamics & Waves), and phy-a-3 (Electromagnetism & Modern Physics).
 */

import { QuizQuestion } from './quiz.types';

export const ADVANCED_PHYSICS_QUESTIONS: QuizQuestion[] = [
  // ==================== phy-a-1 Kinematics & Dynamics ====================
  {
    id: 'phya-101',
    subjectId: 'physics',
    pathwayId: 'phy-a-1',
    difficulty: 'beginner',
    question: {
      en: 'Displacement is a vector quantity. What does this mean?',
      ta: 'இடப்பெயர்ச்சி ஒரு வெக்டர் அளவு. இதன் பொருள் என்ன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'It has both magnitude and direction', ta: 'அதற்கு எண்ணளவும் திசையும் உண்டு' } },
      { id: 'b', label: 'B', text: { en: 'It has only magnitude', ta: 'அதற்கு எண்ணளவு மட்டுமே உண்டு' } },
      { id: 'c', label: 'C', text: { en: 'It has no direction', ta: 'அதற்கு திசை இல்லை' } },
      { id: 'd', label: 'D', text: { en: 'It is always zero', ta: 'அது எப்போதும் பூஜ்யம்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Vector quantities like displacement, velocity, and force have both magnitude and direction. Scalars like distance have only magnitude.',
      ta: 'இடப்பெயர்ச்சி, திசைவேகம், விசை போன்ற வெக்டர் அளவுகளுக்கு எண்ணளவும் திசையும் உண்டு. தொலைவு போன்ற ஸ்கேலர் அளவுகளுக்கு எண்ணளவு மட்டுமே.',
    },
    hint: {
      en: 'Compare distance (scalar) with displacement (vector).',
      ta: 'தொலைவு (ஸ்கேலர்) மற்றும் இடப்பெயர்ச்சி (வெக்டர்) ஒப்பிடுக.',
    },
  },
  {
    id: 'phya-102',
    subjectId: 'physics',
    pathwayId: 'phy-a-1',
    difficulty: 'beginner',
    question: {
      en: 'What is the SI unit of acceleration?',
      ta: 'முடுக்கத்தின் SI அலகு எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'm/s²', ta: 'm/s²' } },
      { id: 'b', label: 'B', text: { en: 'm/s', ta: 'm/s' } },
      { id: 'c', label: 'C', text: { en: 'm²/s', ta: 'm²/s' } },
      { id: 'd', label: 'D', text: { en: 'N/kg', ta: 'N/kg' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Acceleration is the rate of change of velocity, measured in metres per second squared (m/s²).',
      ta: 'முடுக்கம் என்பது திசைவேக மாற்ற வீதம்; மீட்டர்/வினாடி² (m/s²) அலகில் அளக்கப்படுகிறது.',
    },
    hint: {
      en: 'Velocity per unit time.',
      ta: 'ஒரு அலகு நேரத்திற்கான திசைவேகம்.',
    },
  },
  {
    id: 'phya-103',
    subjectId: 'physics',
    pathwayId: 'phy-a-1',
    difficulty: 'intermediate',
    question: {
      en: 'Which equation of motion relates initial velocity (u), final velocity (v), acceleration (a), and time (t)?',
      ta: 'தொடக்க திசைவேகம் (u), இறுதி திசைவேகம் (v), முடுக்கம் (a), நேரம் (t) ஆகியவற்றைத் தொடர்புபடுத்தும் இயக்கச் சமன்பாடு எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'v = u + at', ta: 'v = u + at' } },
      { id: 'b', label: 'B', text: { en: 'v = u − at', ta: 'v = u − at' } },
      { id: 'c', label: 'C', text: { en: 's = ut + ½at', ta: 's = ut + ½at' } },
      { id: 'd', label: 'D', text: { en: 'v² = u² − 2as', ta: 'v² = u² − 2as' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'The first equation of motion is v = u + at, where a is uniform acceleration.',
      ta: 'இயக்கத்தின் முதல் சமன்பாடு v = u + at; இங்கு a சீரான முடுக்கம்.',
    },
    hint: {
      en: 'Final velocity = initial velocity + (acceleration × time).',
      ta: 'இறுதி திசைவேகம் = தொடக்க திசைவேகம் + (முடுக்கம் × நேரம்).',
    },
  },
  {
    id: 'phya-104',
    subjectId: 'physics',
    pathwayId: 'phy-a-1',
    difficulty: 'intermediate',
    question: {
      en: 'The path of a projectile (ignoring air resistance) is which shape?',
      ta: 'காற்று எதிர்ப்பைப் புறக்கணித்தால் எறிபொருளின் பாதை எந்த வடிவம்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'A parabola', ta: 'பரவளையம்' } },
      { id: 'b', label: 'B', text: { en: 'A straight line', ta: 'நேர்க்கோடு' } },
      { id: 'c', label: 'C', text: { en: 'A circle', ta: 'வட்டம்' } },
      { id: 'd', label: 'D', text: { en: 'A spiral', ta: 'சுருளி' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'A projectile follows a parabolic trajectory — uniform horizontal motion combined with constant vertical acceleration due to gravity.',
      ta: 'எறிபொருள் பரவளையப் பாதையில் செல்கிறது — சீரான கிடை இயக்கமும் ஈர்ப்பால் நிலையான செங்குத்து முடுக்கமும் இணைவதால்.',
    },
    hint: {
      en: 'Think of the arc of a kicked football.',
      ta: 'உதைக்கப்படும் கால்பந்தின் வளைவை நினைக்கவும்.',
    },
  },
  {
    id: 'phya-105',
    subjectId: 'physics',
    pathwayId: 'phy-a-1',
    difficulty: 'intermediate',
    question: {
      en: 'In uniform circular motion, the centripetal force always points in which direction?',
      ta: 'சீரான வட்ட இயக்கத்தில் மையநோக்கு விசை எப்போதும் எந்த திசையில் இருக்கும்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Towards the centre of the circle', ta: 'வட்டத்தின் மையத்தை நோக்கி' } },
      { id: 'b', label: 'B', text: { en: 'Away from the centre', ta: 'மையத்திலிருந்து வெளியே' } },
      { id: 'c', label: 'C', text: { en: 'Along the tangent', ta: 'தொடுகோட்டில்' } },
      { id: 'd', label: 'D', text: { en: 'Perpendicular to the plane', ta: 'தளத்திற்கு செங்குத்தாக' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Centripetal ("centre-seeking") force acts towards the centre and keeps the object moving in a circle.',
      ta: 'மையநோக்கு விசை மையத்தை நோக்கி செயல்பட்டு பொருளை வட்டத்தில் இயங்க வைக்கிறது.',
    },
    hint: {
      en: 'The name itself means "towards the centre".',
      ta: 'இந்தப் பெயருக்கே "மையத்தை நோக்கி" என்று பொருள்.',
    },
  },
  {
    id: 'phya-106',
    subjectId: 'physics',
    pathwayId: 'phy-a-1',
    difficulty: 'advanced',
    question: {
      en: 'In uniform circular motion, speed is constant but velocity is changing. Why?',
      ta: 'சீரான வட்ட இயக்கத்தில் வேகம் மாறாமல் இருக்கும், ஆனால் திசைவேகம் மாறிக்கொண்டே இருக்கும். ஏன்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Velocity is a vector, and its direction changes continuously', ta: 'திசைவேகம் ஒரு வெக்டர்; அதன் திசை தொடர்ந்து மாறுகிறது' } },
      { id: 'b', label: 'B', text: { en: 'The speed actually keeps increasing', ta: 'வேகம் உண்மையில் அதிகரிக்கிறது' } },
      { id: 'c', label: 'C', text: { en: 'Velocity has no direction', ta: 'திசைவேகத்திற்கு திசை இல்லை' } },
      { id: 'd', label: 'D', text: { en: 'The body is at rest', ta: 'பொருள் ஓய்வில் உள்ளது' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Velocity = speed with direction. In circular motion the direction changes at every instant, so velocity changes even though speed is constant — this means the motion is accelerated.',
      ta: 'திசைவேகம் = வேகம் + திசை. வட்ட இயக்கத்தில் ஒவ்வொரு கணமும் திசை மாறுவதால் வேகம் மாறாதிருந்தாலும் திசைவேகம் மாறுகிறது — இயக்கம் முடுக்கம் கொண்டது.',
    },
    hint: {
      en: 'Direction keeps rotating around the circle.',
      ta: 'திசை வட்டத்தைச் சுற்றி தொடர்ந்து சுழல்கிறது.',
    },
  },
  {
    id: 'phya-107',
    subjectId: 'physics',
    pathwayId: 'phy-a-1',
    difficulty: 'advanced',
    question: {
      en: 'Two cars move in the same direction at 40 km/h and 60 km/h. What is the relative velocity of the faster car with respect to the slower one?',
      ta: 'இரண்டு கார்கள் ஒரே திசையில் 40 கிமீ/மணி மற்றும் 60 கிமீ/மணி வேகத்தில் செல்கின்றன. மெதுவான காருடன் ஒப்பிடும்போது வேகமான காரின் சார்பு திசைவேகம் என்ன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: '20 km/h', ta: '20 கிமீ/மணி' } },
      { id: 'b', label: 'B', text: { en: '100 km/h', ta: '100 கிமீ/மணி' } },
      { id: 'c', label: 'C', text: { en: '60 km/h', ta: '60 கிமீ/மணி' } },
      { id: 'd', label: 'D', text: { en: '0 km/h', ta: '0 கிமீ/மணி' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'For same-direction motion, relative velocity = v₂ − v₁ = 60 − 40 = 20 km/h.',
      ta: 'ஒரே திசை இயக்கத்தில் சார்பு திசைவேகம் = v₂ − v₁ = 60 − 40 = 20 கிமீ/மணி.',
    },
    hint: {
      en: 'Subtract the speeds when moving in the same direction.',
      ta: 'ஒரே திசையில் செல்லும்போது வேகங்களைக் கழிக்கவும்.',
    },
  },
  {
    id: 'phya-108',
    subjectId: 'physics',
    pathwayId: 'phy-a-1',
    difficulty: 'advanced',
    question: {
      en: 'Why are curved roads banked (tilted) at curves?',
      ta: 'வளைவுகளில் சாலைகள் ஏன் சரிவாக (banked) அமைக்கப்படுகின்றன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'The road itself provides part of the centripetal force', ta: 'சாலையே மையநோக்கு விசையின் ஒரு பகுதியை வழங்குகிறது' } },
      { id: 'b', label: 'B', text: { en: 'To make the road longer', ta: 'சாலையை நீளமாக்க' } },
      { id: 'c', label: 'C', text: { en: 'To collect rainwater', ta: 'மழைநீரைச் சேகரிக்க' } },
      { id: 'd', label: 'D', text: { en: 'To reduce the speed limit', ta: 'வேக வரம்பைக் குறைக்க' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Banking tilts the road so a component of the normal reaction provides centripetal force, reducing reliance on friction and preventing skidding.',
      ta: 'சாலையைச் சரிவாக்கும்போது செங்குத்து எதிர்வினையின் ஒரு கூறு மையநோக்கு விசையை அளித்து, உராய்வை நம்புவதைக் குறைத்து சறுக்கலைத் தடுக்கிறது.',
    },
    hint: {
      en: 'It helps vehicles turn without depending only on friction.',
      ta: 'உராய்வை மட்டும் நம்பாமல் வாகனங்கள் திரும்ப உதவுகிறது.',
    },
  },

  // ==================== phy-a-2 Thermodynamics & Waves ====================
  {
    id: 'phya-201',
    subjectId: 'physics',
    pathwayId: 'phy-a-2',
    difficulty: 'beginner',
    question: {
      en: 'What is the SI unit of temperature?',
      ta: 'வெப்பநிலையின் SI அலகு எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Kelvin', ta: 'கெல்வின்' } },
      { id: 'b', label: 'B', text: { en: 'Celsius', ta: 'செல்சியஸ்' } },
      { id: 'c', label: 'C', text: { en: 'Fahrenheit', ta: 'பாரன்ஹீட்' } },
      { id: 'd', label: 'D', text: { en: 'Joule', ta: 'ஜூல்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'The SI unit of temperature is the kelvin (K). 0 °C = 273.15 K.',
      ta: 'வெப்பநிலையின் SI அலகு கெல்வின் (K). 0 °C = 273.15 K.',
    },
    hint: {
      en: 'Absolute zero is 0 on this scale.',
      ta: 'இந்த அளவீட்டில் தனி பூஜ்யம் 0 ஆகும்.',
    },
  },
  {
    id: 'phya-202',
    subjectId: 'physics',
    pathwayId: 'phy-a-2',
    difficulty: 'beginner',
    question: {
      en: 'Sound waves in air are which type of wave?',
      ta: 'காற்றில் ஒலி அலைகள் எந்த வகை அலைகள்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Longitudinal waves', ta: 'நீள அலைகள்' } },
      { id: 'b', label: 'B', text: { en: 'Transverse waves', ta: 'குறுக்கு அலைகள்' } },
      { id: 'c', label: 'C', text: { en: 'Electromagnetic waves', ta: 'மின்காந்த அலைகள்' } },
      { id: 'd', label: 'D', text: { en: 'Stationary waves only', ta: 'நிலையான அலைகள் மட்டும்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Sound is a longitudinal wave — particles vibrate parallel to the direction of wave propagation, creating compressions and rarefactions.',
      ta: 'ஒலி ஒரு நீள அலை — துகள்கள் அலை பரவும் திசைக்கு இணையாக அதிர்ந்து இறுக்கங்களையும் தளர்வுகளையும் உருவாக்குகின்றன.',
    },
    hint: {
      en: 'Particles move back and forth along the same line as the wave.',
      ta: 'துகள்கள் அலையின் அதே கோட்டில் முன்னும் பின்னும் நகர்கின்றன.',
    },
  },
  {
    id: 'phya-203',
    subjectId: 'physics',
    pathwayId: 'phy-a-2',
    difficulty: 'intermediate',
    question: {
      en: 'The first law of thermodynamics is essentially a statement of which principle?',
      ta: 'வெப்ப இயக்கவியலின் முதல் விதி அடிப்படையில் எந்தக் கொள்கையின் கூற்று?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Conservation of energy', ta: 'ஆற்றல் மாறா விதி' } },
      { id: 'b', label: 'B', text: { en: 'Conservation of momentum', ta: 'உந்த மாறா விதி' } },
      { id: 'c', label: 'C', text: { en: 'Conservation of mass', ta: 'நிறை மாறா விதி' } },
      { id: 'd', label: 'D', text: { en: 'Gravitation', ta: 'ஈர்ப்பு விதி' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'The first law (ΔU = Q − W) states that the change in internal energy equals heat added minus work done — energy is conserved.',
      ta: 'முதல் விதி (ΔU = Q − W) உள் ஆற்றல் மாற்றம் = சேர்க்கப்பட்ட வெப்பம் − செய்யப்பட்ட வேலை — ஆற்றல் மாறாது என்கிறது.',
    },
    hint: {
      en: 'Heat and work are both forms of energy transfer.',
      ta: 'வெப்பமும் வேலையும் ஆற்றல் மாற்றத்தின் வடிவங்கள்.',
    },
  },
  {
    id: 'phya-204',
    subjectId: 'physics',
    pathwayId: 'phy-a-2',
    difficulty: 'intermediate',
    question: {
      en: 'The number of oscillations per second of a wave is called its what?',
      ta: 'ஒரு வினாடிக்கு அலை செய்யும் அலைவுகளின் எண்ணிக்கை என்ன அழைக்கப்படுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Frequency', ta: 'அதிர்வெண்' } },
      { id: 'b', label: 'B', text: { en: 'Wavelength', ta: 'அலைநீளம்' } },
      { id: 'c', label: 'C', text: { en: 'Amplitude', ta: 'வீச்சு' } },
      { id: 'd', label: 'D', text: { en: 'Period', ta: 'காலம்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Frequency (f) is the number of complete oscillations per second, measured in hertz (Hz).',
      ta: 'அதிர்வெண் (f) என்பது ஒரு வினாடிக்கு நிகழும் முழு அலைவுகளின் எண்ணிக்கை; ஹெர்ட்ஸ் (Hz) அலகில் அளக்கப்படுகிறது.',
    },
    hint: {
      en: 'Higher pitch of sound means higher of this.',
      ta: 'ஒலியின் உயர் சுருதிக்கு இது அதிகமாக இருக்கும்.',
    },
  },
  {
    id: 'phya-205',
    subjectId: 'physics',
    pathwayId: 'phy-a-2',
    difficulty: 'intermediate',
    question: {
      en: 'Heat always flows spontaneously from which body to which?',
      ta: 'வெப்பம் எப்போதும் தானாக எந்த உடலிலிருந்து எந்த உடலுக்கு ஓடுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'From a hotter body to a colder body', ta: 'சூடான உடலிலிருந்து குளிர்ந்த உடலுக்கு' } },
      { id: 'b', label: 'B', text: { en: 'From a colder body to a hotter body', ta: 'குளிர்ந்த உடலிலிருந்து சூடான உடலுக்கு' } },
      { id: 'c', label: 'C', text: { en: 'Between bodies of equal temperature', ta: 'சம வெப்பநிலை உடல்களுக்கு இடையே' } },
      { id: 'd', label: 'D', text: { en: 'Heat never flows between bodies', ta: 'உடல்களுக்கு இடையே வெப்பம் ஓடுவதில்லை' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Heat spontaneously flows from a hotter body to a colder body until thermal equilibrium is reached (second law of thermodynamics).',
      ta: 'வெப்பம் தானாக சூடான உடலிலிருந்து குளிர்ந்த உடலுக்கு, வெப்பச் சமநிலை அடையும் வரை ஓடுகிறது (வெப்ப இயக்கவியல் இரண்டாம் விதி).',
    },
    hint: {
      en: 'A hot cup cools because heat leaves it.',
      ta: 'சூடான கோப்பை குளிர்வதற்கு காரணம் வெப்பம் அதை விட்டு வெளியேறுவது.',
    },
  },
  {
    id: 'phya-206',
    subjectId: 'physics',
    pathwayId: 'phy-a-2',
    difficulty: 'advanced',
    question: {
      en: 'In thermodynamics, entropy is a measure of what?',
      ta: 'வெப்ப இயக்கவியலில் என்ட்ரோபி எதன் அளவீடு?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'The disorder or randomness of a system', ta: 'அமைப்பின் ஒழுங்கின்மை அல்லது சீரற்ற தன்மை' } },
      { id: 'b', label: 'B', text: { en: 'The temperature of a system', ta: 'அமைப்பின் வெப்பநிலை' } },
      { id: 'c', label: 'C', text: { en: 'The speed of molecules only', ta: 'மூலக்கூறுகளின் வேகம் மட்டும்' } },
      { id: 'd', label: 'D', text: { en: 'The colour of the system', ta: 'அமைப்பின் நிறம்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Entropy (S) measures disorder. In an isolated system, entropy always increases — processes run "one way".',
      ta: 'என்ட்ரோபி (S) ஒழுங்கின்மையை அளவிடுகிறது. தனிமைப்படுத்தப்பட்ட அமைப்பில் என்ட்ரோபி எப்போதும் அதிகரிக்கிறது — செயல்முறைகள் "ஒருவழியாக" நடக்கும்.',
    },
    hint: {
      en: 'Think of a room naturally becoming messier over time.',
      ta: 'காலப்போக்கில் அறை இயற்கையாக குழப்பமடைவதை நினைக்கவும்.',
    },
  },
  {
    id: 'phya-207',
    subjectId: 'physics',
    pathwayId: 'phy-a-2',
    difficulty: 'advanced',
    question: {
      en: 'An ambulance siren sounds higher in pitch as it approaches you and lower as it moves away. This is an example of which effect?',
      ta: 'ஆம்புலன்ஸ் சைரன் உங்களை நெருங்கும்போது உயர் சுருதியிலும், விலகிச் செல்லும்போது குறைந்த சுருதியிலும் கேட்கிறது. இது எந்த விளைவுக்கு எடுத்துக்காட்டு?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Doppler effect', ta: 'டாப்ளர் விளைவு' } },
      { id: 'b', label: 'B', text: { en: 'Photoelectric effect', ta: 'ஒளிமின்னழுத்த விளைவு' } },
      { id: 'c', label: 'C', text: { en: 'Tyndall effect', ta: 'டிண்டால் விளைவு' } },
      { id: 'd', label: 'D', text: { en: 'Hall effect', ta: 'ஹால் விளைவு' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'The Doppler effect is the apparent change in frequency when the source and observer move relative to each other.',
      ta: 'மூலமும் கேட்பவரும் ஒன்றுக்கொன்று சார்பாக நகரும் போது அதிர்வெண்ணில் தோன்றும் தோற்ற மாற்றம் டாப்ளர் விளைவு.',
    },
    hint: {
      en: 'Named after the Austrian physicist who described it.',
      ta: 'இதை விவரித்த ஆஸ்திரிய இயற்பியலாளரின் பெயர்.',
    },
  },
  {
    id: 'phya-208',
    subjectId: 'physics',
    pathwayId: 'phy-a-2',
    difficulty: 'advanced',
    question: {
      en: 'An adiabatic process is one in which there is no what?',
      ta: 'மீவெப்பமாறா (adiabatic) செயல்முறை என்பது எது இல்லாத செயல்முறை?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Exchange of heat with the surroundings', ta: 'சூழலுடன் வெப்பப் பரிமாற்றம்' } },
      { id: 'b', label: 'B', text: { en: 'Change in volume', ta: 'கன அளவு மாற்றம்' } },
      { id: 'c', label: 'C', text: { en: 'Change in pressure', ta: 'அழுத்த மாற்றம்' } },
      { id: 'd', label: 'D', text: { en: 'Change in temperature', ta: 'வெப்பநிலை மாற்றம்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'In an adiabatic process, Q = 0 — no heat enters or leaves the system, though work can still be done.',
      ta: 'மீவெப்பமாறா செயல்முறையில் Q = 0 — வெப்பம் உள்ளே நுழையவோ வெளியேறவோ இல்லை; வேலை செய்யப்படலாம்.',
    },
    hint: {
      en: 'The Greek root means "not passable" (no heat passing).',
      ta: '"கடத்த முடியாதது" என்ற பொருள்தரும் கிரேக்க மூலம்.',
    },
  },

  // ==================== phy-a-3 Electromagnetism & Modern Physics ====================
  {
    id: 'phya-301',
    subjectId: 'physics',
    pathwayId: 'phy-a-3',
    difficulty: 'beginner',
    question: {
      en: 'Two like charges (both positive) will do what?',
      ta: 'இரண்டு ஒரே வகை மின்னூட்டங்கள் (இரண்டும் நேர்) என்ன செய்யும்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Repel each other', ta: 'ஒன்றை ஒன்று விலக்கும்' } },
      { id: 'b', label: 'B', text: { en: 'Attract each other', ta: 'ஒன்றை ஒன்று கவரும்' } },
      { id: 'c', label: 'C', text: { en: 'Neutralise each other completely', ta: 'முழுமையாக நடுநிலையாக்கும்' } },
      { id: 'd', label: 'D', text: { en: 'Do nothing', ta: 'எதுவும் செய்யாது' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Like charges repel and unlike charges attract — the fundamental law of electrostatics.',
      ta: 'ஒரே வகை மின்னூட்டங்கள் விலக்குகின்றன; வெவ்வேறு வகை மின்னூட்டங்கள் கவர்கின்றன — நிலை மின்னியலின் அடிப்படை விதி.',
    },
    hint: {
      en: 'Same signs push apart.',
      ta: 'ஒரே அடையாளங்கள் பிரிந்து செல்கின்றன.',
    },
  },
  {
    id: 'phya-302',
    subjectId: 'physics',
    pathwayId: 'phy-a-3',
    difficulty: 'beginner',
    question: {
      en: 'What is the SI unit of electric charge?',
      ta: 'மின்னூட்டத்தின் SI அலகு எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Coulomb', ta: 'கூலும்' } },
      { id: 'b', label: 'B', text: { en: 'Ampere', ta: 'ஆம்பியர்' } },
      { id: 'c', label: 'C', text: { en: 'Volt', ta: 'வோல்ட்' } },
      { id: 'd', label: 'D', text: { en: 'Ohm', ta: 'ஓம்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Charge is measured in coulombs (C), named after Charles-Augustin de Coulomb.',
      ta: 'மின்னூட்டம் கூலும் (C) அலகில் அளக்கப்படுகிறது; சார்லஸ்-அகஸ்டின் டி கூலும் நினைவாக.',
    },
    hint: {
      en: 'One electron carries about 1.6 × 10⁻¹⁹ of this unit.',
      ta: 'ஒரு எலக்ட்ரான் இந்த அலகில் சுமார் 1.6 × 10⁻¹⁹ கொண்டுள்ளது.',
    },
  },
  {
    id: 'phya-303',
    subjectId: 'physics',
    pathwayId: 'phy-a-3',
    difficulty: 'intermediate',
    question: {
      en: 'Who discovered electromagnetic induction?',
      ta: 'மின்காந்தத் தூண்டலைக் கண்டுபிடித்தவர் யார்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Michael Faraday', ta: 'மைக்கேல் ஃபாரடே' } },
      { id: 'b', label: 'B', text: { en: 'Isaac Newton', ta: 'ஐசக் நியூட்டன்' } },
      { id: 'c', label: 'C', text: { en: 'Albert Einstein', ta: 'ஆல்பர்ட் ஐன்ஸ்டீன்' } },
      { id: 'd', label: 'D', text: { en: 'James Watt', ta: 'ஜேம்ஸ் வாட்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Faraday discovered in 1831 that a changing magnetic field induces an electric current in a conductor — the basis of generators.',
      ta: 'மாறும் காந்தப்புலம் ஒரு கடத்தியில் மின்னோட்டத்தைத் தூண்டுகிறது என்பதை 1831-இல் ஃபாரடே கண்டுபிடித்தார் — மின்னாக்கிகளின் அடிப்படை.',
    },
    hint: {
      en: 'His name is the unit of capacitance.',
      ta: 'மின்தேக்குத் திறனின் அலகு இவர் பெயரில் உள்ளது.',
    },
  },
  {
    id: 'phya-304',
    subjectId: 'physics',
    pathwayId: 'phy-a-3',
    difficulty: 'intermediate',
    question: {
      en: 'The photoelectric effect was explained in 1905 by whom?',
      ta: '1905-இல் ஒளிமின்னழுத்த விளைவை விளக்கியவர் யார்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Albert Einstein', ta: 'ஆல்பர்ட் ஐன்ஸ்டீன்' } },
      { id: 'b', label: 'B', text: { en: 'Niels Bohr', ta: 'நீல்ஸ் போர்' } },
      { id: 'c', label: 'C', text: { en: 'Ernest Rutherford', ta: 'அர்னஸ்ட் ரதர்ஃபோர்ட்' } },
      { id: 'd', label: 'D', text: { en: 'James Clerk Maxwell', ta: 'ஜேம்ஸ் கிளார்க் மேக்ஸ்வெல்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Einstein explained the photoelectric effect using the idea of light quanta (photons), earning him the 1921 Nobel Prize in Physics.',
      ta: 'ஒளி குவாண்டாக்கள் (ஃபோட்டான்கள்) என்ற கருத்தில் ஐன்ஸ்டீன் ஒளிமின்னழுத்த விளைவை விளக்கினார்; இதற்காக 1921-இல் இயற்பியலுக்கான நோபல் பரிசு பெற்றார்.',
    },
    hint: {
      en: 'The same scientist famous for E = mc².',
      ta: 'E = mc² க்கு புகழ்பெற்ற அதே அறிஞர்.',
    },
  },
  {
    id: 'phya-305',
    subjectId: 'physics',
    pathwayId: 'phy-a-3',
    difficulty: 'intermediate',
    question: {
      en: 'The nucleus of an atom contains which particles?',
      ta: 'அணுவின் கருவில் எந்தத் துகள்கள் உள்ளன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Protons and neutrons', ta: 'புரோட்டான்கள் மற்றும் நியூட்ரான்கள்' } },
      { id: 'b', label: 'B', text: { en: 'Only electrons', ta: 'எலக்ட்ரான்கள் மட்டும்' } },
      { id: 'c', label: 'C', text: { en: 'Protons and electrons', ta: 'புரோட்டான்கள் மற்றும் எலக்ட்ரான்கள்' } },
      { id: 'd', label: 'D', text: { en: 'Photons', ta: 'ஃபோட்டான்கள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'The nucleus contains protons (positive) and neutrons (neutral), collectively called nucleons. Electrons orbit outside.',
      ta: 'கருவில் புரோட்டான்கள் (நேர்) மற்றும் நியூட்ரான்கள் (நடுநிலை) உள்ளன; இவை ஒன்றாக நியூக்ளியான்கள் எனப்படும். எலக்ட்ரான்கள் வெளியே சுற்றுகின்றன.',
    },
    hint: {
      en: 'The two heavy particles at the centre.',
      ta: 'மையத்தில் உள்ள இரண்டு கனமான துகள்கள்.',
    },
  },
  {
    id: 'phya-306',
    subjectId: 'physics',
    pathwayId: 'phy-a-3',
    difficulty: 'advanced',
    question: {
      en: 'In Einstein\'s equation E = mc², what does c represent?',
      ta: 'ஐன்ஸ்டீனின் E = mc² சமன்பாட்டில் c எதைக் குறிக்கிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Speed of light in vacuum', ta: 'வெற்றிடத்தில் ஒளியின் வேகம்' } },
      { id: 'b', label: 'B', text: { en: 'Speed of sound', ta: 'ஒலியின் வேகம்' } },
      { id: 'c', label: 'C', text: { en: 'Charge of an electron', ta: 'எலக்ட்ரானின் மின்னூட்டம்' } },
      { id: 'd', label: 'D', text: { en: 'Speed of Earth', ta: 'பூமியின் வேகம்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'c is the speed of light in vacuum (≈ 3 × 10⁸ m/s). The equation shows mass and energy are interchangeable.',
      ta: 'c என்பது வெற்றிடத்தில் ஒளியின் வேகம் (≈ 3 × 10⁸ m/s). நிறையும் ஆற்றலும் மாறக்கூடியவை என்பதை இந்த சமன்பாடு காட்டுகிறது.',
    },
    hint: {
      en: 'The fastest speed possible in the universe.',
      ta: 'பிரபஞ்சத்தில் சாத்தியமான வேகமான வேகம்.',
    },
  },
  {
    id: 'phya-307',
    subjectId: 'physics',
    pathwayId: 'phy-a-3',
    difficulty: 'advanced',
    question: {
      en: 'The half-life of a radioactive substance is the time taken for what?',
      ta: 'கதிரியக்கப் பொருளின் அரைவாழ்வுக் காலம் என்பது எதற்கு எடுக்கும் நேரம்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Half the nuclei to decay', ta: 'பாதி கருக்கள் சிதைவடைய' } },
      { id: 'b', label: 'B', text: { en: 'All the nuclei to decay', ta: 'அனைத்து கருக்களும் சிதைவடைய' } },
      { id: 'c', label: 'C', text: { en: 'The substance to double', ta: 'பொருள் இரட்டிப்பாக' } },
      { id: 'd', label: 'D', text: { en: 'The temperature to halve', ta: 'வெப்பநிலை பாதியாக' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Half-life is the time for half of the radioactive nuclei in a sample to decay. It is used in carbon dating and medicine.',
      ta: 'மாதிரியில் உள்ள கதிரியக்க கருக்களில் பாதி சிதைவடைய எடுக்கும் நேரம் அரைவாழ்வுக் காலம். கார்பன் காலக்கணிப்பு மற்றும் மருத்துவத்தில் பயன்படுகிறது.',
    },
    hint: {
      en: 'It is about "halving", not "ending".',
      ta: 'இது "முடிவடைதல்" அல்ல; "பாதியாக்கல்".',
    },
  },
  {
    id: 'phya-308',
    subjectId: 'physics',
    pathwayId: 'phy-a-3',
    difficulty: 'advanced',
    question: {
      en: 'In Bohr\'s model of the hydrogen atom, electrons exist in what?',
      ta: 'போரின் ஹைட்ரஜன் அணு மாதிரியில் எலக்ட்ரான்கள் எதில் உள்ளன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Discrete (fixed) energy levels or orbits', ta: 'தனித்த (நிலையான) ஆற்றல் மட்டங்கள் அல்லது சுற்றுப்பாதைகள்' } },
      { id: 'b', label: 'B', text: { en: 'Any random path', ta: 'எந்த சீரற்ற பாதையிலும்' } },
      { id: 'c', label: 'C', text: { en: 'Inside the nucleus', ta: 'கருவுக்குள்' } },
      { id: 'd', label: 'D', text: { en: 'A solid sphere', ta: 'திண்ம கோளத்தில்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Bohr proposed that electrons occupy discrete orbits with fixed energies and jump between them by absorbing or emitting photons.',
      ta: 'எலக்ட்ரான்கள் நிலையான ஆற்றல் கொண்ட தனித்த சுற்றுப்பாதைகளில் உள்ளன; ஃபோட்டான்களை உறிஞ்சி அல்லது வெளியிட்டு அவற்றுக்கு இடையே தாவுகின்றன என்று போர் முன்மொழிந்தார்.',
    },
    hint: {
      en: 'Energy is quantised — only certain values are allowed.',
      ta: 'ஆற்றல் குவாண்டமாக்கப்பட்டது — குறிப்பிட்ட மதிப்புகள் மட்டுமே அனுமதிக்கப்படுகின்றன.',
    },
  },
];