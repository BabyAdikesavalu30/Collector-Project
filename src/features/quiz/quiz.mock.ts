/**
 * Quiz Feature Mock Question Dataset & Deterministic Selectors
 * Comprehensive bilingual science questions for Tamil Nadu Grades 6–12 across Physics, Chemistry, and Biology.
 */

import { QuizQuestion, QuizDifficulty, QuizQuestionCount } from './quiz.types';
import { FOUNDATION_PHYSICS_QUESTIONS } from './quiz.mock.foundation-physics';
import { FOUNDATION_CHEMISTRY_QUESTIONS } from './quiz.mock.foundation-chemistry';
import { FOUNDATION_BIOLOGY_QUESTIONS } from './quiz.mock.foundation-biology';
import { CORE_PHYSICS_QUESTIONS } from './quiz.mock.core-physics';
import { CORE_CHEMISTRY_QUESTIONS } from './quiz.mock.core-chemistry';
import { CORE_BIOLOGY_QUESTIONS } from './quiz.mock.core-biology';
import { ADVANCED_PHYSICS_QUESTIONS } from './quiz.mock.advanced-physics';
import { ADVANCED_CHEMISTRY_QUESTIONS } from './quiz.mock.advanced-chemistry';
import { ADVANCED_BIOLOGY_QUESTIONS } from './quiz.mock.advanced-biology';

export const MOCK_QUIZ_QUESTIONS: QuizQuestion[] = [
  // ==========================================
  // PHYSICS — CORE (Classes 8–10) & FOUNDATION / ADVANCED
  // ==========================================
  {
    id: 'phy-001',
    subjectId: 'physics',
    pathwayId: 'phy-c-1',
    difficulty: 'beginner',
    question: {
      en: 'What is the SI unit of force?',
      ta: 'விசையின் சர்வதேச (SI) அலகு என்ன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Joule', ta: 'ஜூல்' } },
      { id: 'b', label: 'B', text: { en: 'Newton', ta: 'நியூட்டன்' } },
      { id: 'c', label: 'C', text: { en: 'Watt', ta: 'வாட்' } },
      { id: 'd', label: 'D', text: { en: 'Pascal', ta: 'பாஸ்கல்' } },
    ],
    correctOptionId: 'b',
    explanation: {
      en: 'Force is measured in Newtons (N) in honor of Sir Isaac Newton (1 N = 1 kg·m/s²).',
      ta: 'விசையானது சர் ஐசக் நியூட்டனின் நினைவாக நியூட்டன் (N) என்ற அலகால் அளவிடப்படுகிறது (1 N = 1 kg·m/s²).',
    },
    hint: {
      en: 'Named after the English scientist who formulated the laws of gravity and motion.',
      ta: 'ஈர்ப்பு விதிகளையும் இயக்க விதிகளையும் வகுத்த அறிவியல் அறிஞரின் பெயர்.',
    },
  },
  {
    id: 'phy-002',
    subjectId: 'physics',
    pathwayId: 'phy-c-1',
    difficulty: 'beginner',
    question: {
      en: 'Which law of motion explains the concept of inertia?',
      ta: 'நிலைமத்தின் (Inertia) கருத்தை விளக்கும் இயக்க விதி எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: "Newton's First Law", ta: 'நியூட்டனின் முதல் விதி' } },
      { id: 'b', label: 'B', text: { en: "Newton's Second Law", ta: 'நியூட்டனின் இரண்டாம் விதி' } },
      { id: 'c', label: 'C', text: { en: "Newton's Third Law", ta: 'நியூட்டனின் மூன்றாம் விதி' } },
      { id: 'd', label: 'D', text: { en: 'Law of Conservation of Energy', ta: 'ஆற்றல் மாறா விதி' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: "Newton's First Law states that an object remains in its state of rest or uniform motion unless acted upon by an external force.",
      ta: 'புறவிசை ஒன்று செயல்படாதவரை எந்த ஒரு பொருளும் தனது ஓய்வு நிலையையோ அல்லது நேர்க்கோட்டு இயக்க நிலையையோ மாற்றாது என்பது முதல் விதியாகும்.',
    },
    hint: {
      en: 'Also known as the Law of Inertia.',
      ta: 'நிலைம விதி என்றும் அழைக்கப்படுகிறது.',
    },
  },
  {
    id: 'phy-003',
    subjectId: 'physics',
    pathwayId: 'phy-c-1',
    difficulty: 'intermediate',
    question: {
      en: 'What is the relationship between force (F), mass (m), and acceleration (a)?',
      ta: 'விசை (F), நிறை (m) மற்றும் முடுக்கம் (a) ஆகியவற்றிற்கு இடையேயான தொடர்பு யாது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'F = m / a', ta: 'F = m / a' } },
      { id: 'b', label: 'B', text: { en: 'F = m × a', ta: 'F = m × a' } },
      { id: 'c', label: 'C', text: { en: 'F = a / m', ta: 'F = a / m' } },
      { id: 'd', label: 'D', text: { en: 'F = m + a', ta: 'F = m + a' } },
    ],
    correctOptionId: 'b',
    explanation: {
      en: "Newton's Second Law defines force as the rate of change of momentum: F = m × a.",
      ta: 'நியூட்டனின் இரண்டாம் விதிப்படி, விசை = நிறை × முடுக்கம் (F = m × a).',
    },
    hint: {
      en: 'Force equals mass multiplied by acceleration.',
      ta: 'நிறையையும் முடுக்கத்தையும் பெருக்கினால் விசை கிடைக்கும்.',
    },
  },
  {
    id: 'phy-004',
    subjectId: 'physics',
    pathwayId: 'phy-c-1',
    difficulty: 'intermediate',
    question: {
      en: 'When a bus suddenly starts moving forward, passengers lean backward. This is due to:',
      ta: 'பேருந்து திடீரென முன்னோக்கி நகரும்போது பயணிகள் பின்னோக்கி சாய்கின்றனர். இதற்கு காரணம்:',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Inertia of rest', ta: 'ஓய்வுக்கான நிலைமம்' } },
      { id: 'b', label: 'B', text: { en: 'Inertia of motion', ta: 'இயக்கத்திற்கான நிலைமம்' } },
      { id: 'c', label: 'C', text: { en: 'Inertia of direction', ta: 'திசைக்கான நிலைமம்' } },
      { id: 'd', label: 'D', text: { en: 'Gravitational attraction', ta: 'ஈர்ப்பு விசை' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'The upper body tends to remain at rest while the feet move forward with the vehicle (Inertia of rest).',
      ta: 'உடலின் மேற்பகுதி தனது ஓய்வு நிலையைத் தொடர முயல்வதால் பின்னோக்கி சாய்கிறது (ஓய்வு நிலைமம்).',
    },
    hint: {
      en: 'The body was originally at rest before motion started.',
      ta: 'இயக்கம் தொடங்குவதற்கு முன் உடல் ஓய்வு நிலையில் இருந்தது.',
    },
  },
  {
    id: 'phy-005',
    subjectId: 'physics',
    pathwayId: 'phy-c-1',
    difficulty: 'advanced',
    question: {
      en: 'Which physical quantity is defined as the product of mass and velocity (p = mv)?',
      ta: 'நிறை மற்றும் திசைவேகத்தின் பெருக்கற்பலன் (p = mv) எவ்வாறு அழைக்கப்படுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Linear Momentum', ta: 'நேர்க்கோட்டு உந்தம்' } },
      { id: 'b', label: 'B', text: { en: 'Impulse', ta: 'கணத்தாக்கு' } },
      { id: 'c', label: 'C', text: { en: 'Kinetic Energy', ta: 'இயக்க ஆற்றல்' } },
      { id: 'd', label: 'D', text: { en: 'Torque', ta: 'திருப்புத்திறன்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Momentum is a vector quantity defined as the product of mass and velocity (p = mv) measured in kg·m/s.',
      ta: 'உந்தம் என்பது நிறை மற்றும் திசைவேகத்தின் பெருக்கற்பலனாகும் (p = mv). இதன் அலகு kg·m/s.',
    },
    hint: {
      en: 'Its SI unit is kilogram metre per second (kg·m/s).',
      ta: 'இதன் அலகு கிலோகிராம் மீட்டர்/வினாடி ஆகும்.',
    },
  },
  {
    id: 'phy-006',
    subjectId: 'physics',
    pathwayId: 'phy-c-2',
    difficulty: 'beginner',
    question: {
      en: 'What is the standard unit of work and energy?',
      ta: 'வேலை மற்றும் ஆற்றலின் நிலையான அலகு எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Joule', ta: 'ஜூல்' } },
      { id: 'b', label: 'B', text: { en: 'Newton', ta: 'நியூட்டன்' } },
      { id: 'c', label: 'C', text: { en: 'Ampere', ta: 'ஆம்பியர்' } },
      { id: 'd', label: 'D', text: { en: 'Volt', ta: 'வோல்ட்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: '1 Joule is the work done when a force of 1 Newton moves an object by 1 metre (1 J = 1 N·m).',
      ta: '1 நியூட்டன் விசை ஒரு பொருளை 1 மீட்டர் நகர்த்தும்போது செய்யப்படும் வேலை 1 ஜூல் ஆகும்.',
    },
    hint: {
      en: 'Symbol is J.',
      ta: 'இதன் குறியீடு J ஆகும்.',
    },
  },
  {
    id: 'phy-007',
    subjectId: 'physics',
    pathwayId: 'phy-c-3',
    difficulty: 'beginner',
    question: {
      en: 'Which instrument is used to measure electric current in a circuit?',
      ta: 'மின்சுற்றில் பாயும் மின்னோட்டத்தை அளவிடப் பயன்படும் கருவி எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Ammeter', ta: 'அம்மீட்டர்' } },
      { id: 'b', label: 'B', text: { en: 'Voltmeter', ta: 'வோல்ட்மீட்டர்' } },
      { id: 'c', label: 'C', text: { en: 'Galvanometer', ta: 'கால்வனோமீட்டர்' } },
      { id: 'd', label: 'D', text: { en: 'Barometer', ta: 'பாரோமீட்டர்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'An ammeter is connected in series in an electric circuit to measure current in amperes.',
      ta: 'மின்சுற்றில் மின்னோட்டத்தை ஆம்பியரில் அளவிட அம்மீட்டர் தொடரிணைப்பில் இணைக்கப்படுகிறது.',
    },
    hint: {
      en: 'Measures electric current in amperes (A).',
      ta: 'மின்னோட்டத்தை ஆம்பியரில் அளவிடப் பயன்படுகிறது.',
    },
  },
  {
    id: 'phy-008',
    subjectId: 'physics',
    pathwayId: 'phy-c-3',
    difficulty: 'intermediate',
    question: {
      en: "According to Ohm's Law, what is the formula connecting Voltage (V), Current (I), and Resistance (R)?",
      ta: 'ஓம் விதிப்படி, மின்னழுத்தம் (V), மின்னோட்டம் (I) மற்றும் மின்தடை (R) ஆகியவற்றுக்கு இடையேயான தொடர்பு யாது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'V = I × R', ta: 'V = I × R' } },
      { id: 'b', label: 'B', text: { en: 'V = I / R', ta: 'V = I / R' } },
      { id: 'c', label: 'C', text: { en: 'I = V × R', ta: 'I = V × R' } },
      { id: 'd', label: 'D', text: { en: 'R = V × I', ta: 'R = V × I' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: "Ohm's Law states that V = I × R at constant temperature.",
      ta: 'மாறா வெப்பநிலையில் கடத்தி ஒன்றில் பாயும் மின்னோட்டம் அதன் முனைகளுக்கிடையேயான மின்னழுத்த வேறுபாட்டிற்கு நேர்விகிதத்தில் இருக்கும் (V = I × R).',
    },
    hint: {
      en: 'Voltage equals Current multiplied by Resistance.',
      ta: 'மின்னழுத்தம் = மின்னோட்டம் × மின்தடை.',
    },
  },

  // ==========================================
  // CHEMISTRY — CORE (Classes 8–10) & FOUNDATION / ADVANCED
  // ==========================================
  {
    id: 'chem-001',
    subjectId: 'chemistry',
    pathwayId: 'chem-c-1',
    difficulty: 'beginner',
    question: {
      en: 'What is the chemical symbol for Gold?',
      ta: 'தங்கத்தின் வேதியியல் குறியீடு என்ன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Au', ta: 'Au' } },
      { id: 'b', label: 'B', text: { en: 'Ag', ta: 'Ag' } },
      { id: 'c', label: 'C', text: { en: 'Fe', ta: 'Fe' } },
      { id: 'd', label: 'D', text: { en: 'Gd', ta: 'Gd' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: "Gold has the chemical symbol Au, derived from the Latin word 'Aurum'.",
      ta: 'தங்கத்தின் குறியீடு Au ஆகும். இது இலத்தீன் மொழியில் "Aurum" என்ற சொல்லிலிருந்து பெறப்பட்டது.',
    },
    hint: {
      en: 'Originates from the Latin word meaning shining dawn (Aurum).',
      ta: 'லத்தீன் சொல்லான "Aurum" என்பதிலிருந்து வந்தது.',
    },
  },
  {
    id: 'chem-002',
    subjectId: 'chemistry',
    pathwayId: 'chem-c-1',
    difficulty: 'beginner',
    question: {
      en: 'Which subatomic particle carries a negative electric charge?',
      ta: 'எதிர்மின் சுமையைக் கொண்டுள்ள அணுத்துகள் எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Electron', ta: 'எலக்ட்ரான்' } },
      { id: 'b', label: 'B', text: { en: 'Proton', ta: 'புரோட்டான்' } },
      { id: 'c', label: 'C', text: { en: 'Neutron', ta: 'நியூட்ரான்' } },
      { id: 'd', label: 'D', text: { en: 'Positron', ta: 'பாசிட்ரான்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Electrons orbit the nucleus and carry a fundamental negative charge of -1.602 × 10⁻¹⁹ Coulombs.',
      ta: 'அணுக்கருவைச் சுற்றி வரும் எலக்ட்ரான்கள் எதிர்மின் சுமையைக் கொண்டுள்ளன.',
    },
    hint: {
      en: 'Discovered by J.J. Thomson.',
      ta: 'ஜே.ஜே. தாம்சன் என்பவரால் கண்டறியப்பட்டது.',
    },
  },
  {
    id: 'chem-003',
    subjectId: 'chemistry',
    pathwayId: 'chem-c-2',
    difficulty: 'intermediate',
    question: {
      en: 'What is the pH of pure neutral water at 25°C?',
      ta: '25°C வெப்பநிலையில் தூய நடுநிலை நீரின் pH மதிப்பு என்ன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: '7', ta: '7' } },
      { id: 'b', label: 'B', text: { en: '0', ta: '0' } },
      { id: 'c', label: 'C', text: { en: '14', ta: '14' } },
      { id: 'd', label: 'D', text: { en: '1', ta: '1' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'A pH of 7 represents a completely neutral solution where [H⁺] equals [OH⁻].',
      ta: 'pH மதிப்பு 7 நடுநிலை கரைசலைக் குறிக்கிறது, இதில் [H⁺] மற்றும் [OH⁻] சம அளவில் இருக்கும்.',
    },
    hint: {
      en: 'Exactly halfway on the 0 to 14 pH scale.',
      ta: '0 முதல் 14 வரையிலான pH அளவீட்டின் சரிபாதி.',
    },
  },
  {
    id: 'chem-004',
    subjectId: 'chemistry',
    pathwayId: 'chem-c-2',
    difficulty: 'advanced',
    question: {
      en: 'Which gas is evolved when zinc metal reacts with dilute hydrochloric acid?',
      ta: 'துத்தநாக உலோகம் நீர்த்த ஹைட்ரோகுளோரிக் அமிலத்துடன் வினைபுரியும் போது வெளிப்படும் வாயு எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Hydrogen gas (H₂)', ta: 'ஹைட்ரஜன் வாயு (H₂)' } },
      { id: 'b', label: 'B', text: { en: 'Oxygen gas (O₂)', ta: 'ஆக்ஸிஜன் வாயு (O₂)' } },
      { id: 'c', label: 'C', text: { en: 'Carbon dioxide (CO₂)', ta: 'கார்பன் டை ஆக்சைடு (CO₂)' } },
      { id: 'd', label: 'D', text: { en: 'Nitrogen gas (N₂)', ta: 'நைட்ரஜன் வாயு (N₂)' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Zn + 2HCl → ZnCl₂ + H₂↑ (Hydrogen gas burns with a characteristic pop sound).',
      ta: 'Zn + 2HCl → ZnCl₂ + H₂↑. வெளிப்படும் ஹைட்ரஜன் வாயு "பாப்" என்ற ஒலியுடன் எரியும்.',
    },
    hint: {
      en: 'The lightest element in the periodic table, producing a pop sound when tested with a flame.',
      ta: 'தனிம வரிசை அட்டவணையின் மிக லேசான வாயு.',
    },
  },

  // ==========================================
  // BIOLOGY — CORE (Classes 8–10) & FOUNDATION / ADVANCED
  // ==========================================
  {
    id: 'bio-001',
    subjectId: 'biology',
    pathwayId: 'bio-c-1',
    difficulty: 'beginner',
    question: {
      en: 'Which organelle is famously known as the "Powerhouse of the Cell"?',
      ta: 'செல்லின் "ஆற்றல் மையம்" (Powerhouse of the Cell) என்று அழைக்கப்படும் நுண்ணுறுப்பு எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Mitochondria', ta: 'மைட்டோகாண்ட்ரியா' } },
      { id: 'b', label: 'B', text: { en: 'Nucleus', ta: 'உட்கரு' } },
      { id: 'c', label: 'C', text: { en: 'Ribosome', ta: 'ரைபோசோம்' } },
      { id: 'd', label: 'D', text: { en: 'Golgi Apparatus', ta: 'கோல்கை உறுப்புகள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Mitochondria generate cellular energy in the form of ATP through aerobic cellular respiration.',
      ta: 'மைட்டோகாண்ட்ரியா செல்லுலார் சுவாசத்தின் மூலம் ஏ.டி.பி (ATP) வடிவில் ஆற்றலை உருவாக்குகிறது.',
    },
    hint: {
      en: 'Site of ATP (adenosine triphosphate) generation.',
      ta: 'ஏ.டி.பி (ATP) உற்பத்தி செய்யப்படும் இடம்.',
    },
  },
  {
    id: 'bio-002',
    subjectId: 'biology',
    pathwayId: 'bio-c-1',
    difficulty: 'beginner',
    question: {
      en: 'Which green pigment is essential for absorbing sunlight during photosynthesis in plants?',
      ta: 'தாவரங்களில் ஒளிச்சேர்க்கையின் போது சூரிய ஒளியை உறிஞ்சத் தேவையான பச்சைய நிறமி எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Chlorophyll', ta: 'குளோரோபில் (பச்சையம்)' } },
      { id: 'b', label: 'B', text: { en: 'Carotenoid', ta: 'கரோட்டினாய்டு' } },
      { id: 'c', label: 'C', text: { en: 'Hemoglobin', ta: 'ஹீமோகுளோபின்' } },
      { id: 'd', label: 'D', text: { en: 'Melanin', ta: 'மெலனின்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Chlorophyll located in chloroplast thylakoid membranes absorbs blue and red light energy.',
      ta: 'பசுங்கணிகத்தில் உள்ள குளோரோபில் நிறமி சூரிய ஒளியை உறிஞ்சி வேதி ஆற்றலாக மாற்றுகிறது.',
    },
    hint: {
      en: 'Located inside chloroplasts, giving plants their green color.',
      ta: 'பசுங்கணிகத்தில் காணப்படும் முதன்மை நிறமி.',
    },
  },
  {
    id: 'bio-003',
    subjectId: 'biology',
    pathwayId: 'bio-c-2',
    difficulty: 'intermediate',
    question: {
      en: 'Which blood vessels carry oxygen-rich blood away from the heart to the body?',
      ta: 'இதயத்திலிருந்து உடலின் பிற பாகங்களுக்கு ஆக்சிஜன் நிறைந்த இரத்தத்தை எடுத்துச் செல்லும் இரத்தக் குழாய்கள் எவை?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Arteries', ta: 'தமனிகள்' } },
      { id: 'b', label: 'B', text: { en: 'Veins', ta: 'சிரைகள்' } },
      { id: 'c', label: 'C', text: { en: 'Capillaries', ta: 'நுண்குழாய்கள்' } },
      { id: 'd', label: 'D', text: { en: 'Lymph vessels', ta: 'நிணநீர் நாளங்கள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Arteries have thick elastic walls and carry oxygenated blood away from the heart (except the pulmonary artery).',
      ta: 'தமனிகள் இதயத்திலிருந்து உடலின் பல்வேறு உறுப்புகளுக்கு இரத்தத்தை எடுத்துச் செல்கின்றன.',
    },
    hint: {
      en: 'Thick-walled vessels carrying blood under high pressure away from the heart.',
      ta: 'அதிக அழுத்தத்துடன் இரத்தத்தை எடுத்துச் செல்லும் தடிமனான குழாய்கள்.',
    },
  },
  {
    id: 'bio-004',
    subjectId: 'biology',
    pathwayId: 'bio-c-3',
    difficulty: 'advanced',
    question: {
      en: 'Who is recognized as the "Father of Genetics" for his fundamental experiments on pea plants?',
      ta: 'பட்டாணிச் செடிகளில் சோதனைகள் செய்து "மரபியலின் தந்தை" எனப் போற்றப்படுபவர் யார்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Gregor Johann Mendel', ta: 'கிரிகோர் ஜோஹன் மெண்டல்' } },
      { id: 'b', label: 'B', text: { en: 'Charles Darwin', ta: 'சார்லஸ் டார்வின்' } },
      { id: 'c', label: 'C', text: { en: 'Louis Pasteur', ta: 'லூயி பாஸ்டர்' } },
      { id: 'd', label: 'D', text: { en: 'Alexander Fleming', ta: 'அலெக்சாண்டர் ஃபிளெமிங்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Gregor Mendel discovered the fundamental laws of inheritance through breeding Pisum sativum (garden peas).',
      ta: 'கிரிகோர் மெண்டல் பட்டாணிச் செடிகளில் மேற்கொண்ட மரபியல் சோதனைகள் மூலம் பாரம்பரிய விதிகளைக் கண்டறிந்தார்.',
    },
    hint: {
      en: 'Conducted famous hybridization experiments in an Austrian monastery garden.',
      ta: 'ஆஸ்திரிய நாட்டு பாதிரியாராக இருந்து புகழ்பெற்ற மரபியல் விதிகளைக் கூறியவர்.',
    },
  },

  // ==========================================
  // FOUNDATION (Classes 6–7) — 9 pathways × 8 questions
  // ==========================================
  ...FOUNDATION_PHYSICS_QUESTIONS,
  ...FOUNDATION_CHEMISTRY_QUESTIONS,
  ...FOUNDATION_BIOLOGY_QUESTIONS,

  // ==========================================
  // CORE (Classes 8–10) — additional questions to top up each pathway
  // ==========================================
  ...CORE_PHYSICS_QUESTIONS,
  ...CORE_CHEMISTRY_QUESTIONS,
  ...CORE_BIOLOGY_QUESTIONS,

  // ==========================================
  // ADVANCED (Classes 11–12) — 9 pathways × 8 questions
  // ==========================================
  ...ADVANCED_PHYSICS_QUESTIONS,
  ...ADVANCED_CHEMISTRY_QUESTIONS,
  ...ADVANCED_BIOLOGY_QUESTIONS,
];

/**
 * Deterministically retrieves questions matching the student's selected subject, pathway,
 * and difficulty, expanding safely to fulfill the requested count without repeating
 * identical questions sequentially.
 */
export function getQuestionsForQuiz(
  subjectId: string,
  pathwayId: string,
  difficulty: QuizDifficulty,
  count: QuizQuestionCount
): QuizQuestion[] {
  // 1. Primary filter: Exact subject & pathway
  let candidates = MOCK_QUIZ_QUESTIONS.filter(
    (q) => q.subjectId === subjectId && q.pathwayId === pathwayId
  );

  // 2. Secondary fallback: Same subject
  if (candidates.length === 0) {
    candidates = MOCK_QUIZ_QUESTIONS.filter((q) => q.subjectId === subjectId);
  }

  // 3. Tertiary fallback: Entire science question bank
  if (candidates.length === 0) {
    candidates = [...MOCK_QUIZ_QUESTIONS];
  }

  // Sort preferred difficulty first
  const sorted = [...candidates].sort((a, b) => {
    if (a.difficulty === difficulty && b.difficulty !== difficulty) return -1;
    if (a.difficulty !== difficulty && b.difficulty === difficulty) return 1;
    return 0;
  });

  // Deterministically assemble exact count requested
  const result: QuizQuestion[] = [];
  let index = 0;
  while (result.length < count) {
    const baseQuestion = sorted[index % sorted.length];
    const cycle = Math.floor(index / sorted.length);

    // If cycling, create a unique instance ID while preserving educational question integrity
    const questionInstance: QuizQuestion = cycle === 0
      ? baseQuestion
      : {
          ...baseQuestion,
          id: `${baseQuestion.id}-c${cycle}`,
        };

    result.push(questionInstance);
    index++;
  }

  return result;
}
