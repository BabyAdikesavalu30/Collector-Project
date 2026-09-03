import { PatternLabLevel } from './pattern-lab.types';

export const PATTERN_LAB_LEVELS: PatternLabLevel[] = [
  {
    id: 'pat-01',
    name: 'Level 1: Fibonacci Growth',
    ruleDescription: {
      en: 'Each number is the sum of the two preceding numbers.',
      ta: 'ஒவ்வொரு எண்ணும் முந்தைய இரண்டு எண்களின் கூட்டுத்தொகையாகும்.',
    },
    sequence: [
      { display: '1', icon: '🌱' },
      { display: '1', icon: '🌱' },
      { display: '2', icon: '🌿' },
      { display: '3', icon: '🌿' },
      { display: '5', icon: '🌳' },
      { display: '?', icon: '❓' },
    ],
    missingIndex: 5,
    options: [
      { id: 'opt-7', value: '7', label: { en: '7', ta: '7' }, icon: '🌳' },
      { id: 'opt-8', value: '8', label: { en: '8', ta: '8' }, icon: '🌳' },
      { id: 'opt-9', value: '9', label: { en: '9', ta: '9' }, icon: '🌳' },
      { id: 'opt-10', value: '10', label: { en: '10', ta: '10' }, icon: '🌳' },
    ],
    correctOptionId: 'opt-8',
    explanation: {
      en: '3 + 5 = 8. Fibonacci sequence powers sunflower seed patterns.',
      ta: '3 + 5 = 8. இது தாவரவியல் மற்றும் சூரியகாந்தி மலரின் அமைப்பில் உள்ளது.',
    },
  },
  {
    id: 'pat-02',
    name: 'Level 2: Planetary Orbits',
    ruleDescription: {
      en: 'Order of planets from the Sun outward.',
      ta: 'சூரியனிலிருந்து கோள்களின் வரிசை.',
    },
    sequence: [
      { display: 'Mercury', icon: '☿' },
      { display: 'Venus', icon: '♀' },
      { display: 'Earth', icon: '⊕' },
      { display: '?', icon: '❓' },
      { display: 'Jupiter', icon: '♃' },
    ],
    missingIndex: 3,
    options: [
      { id: 'opt-mars', value: 'Mars', label: { en: 'Mars', ta: 'செவ்வாய்' }, icon: '♂' },
      { id: 'opt-saturn', value: 'Saturn', label: { en: 'Saturn', ta: 'சனி' }, icon: '♄' },
      { id: 'opt-uranus', value: 'Uranus', label: { en: 'Uranus', ta: 'யுரேனஸ்' }, icon: '♅' },
      { id: 'opt-neptune', value: 'Neptune', label: { en: 'Neptune', ta: 'நெப்டியூன்' }, icon: '♆' },
    ],
    correctOptionId: 'opt-mars',
    explanation: {
      en: 'Mars is the 4th terrestrial planet from the Sun.',
      ta: 'செவ்வாய் சூரியனிலிருந்து 4-வது கோளாகும்.',
    },
  },
  {
    id: 'pat-03',
    name: 'Level 3: Electron Shell Capacities',
    ruleDescription: {
      en: 'Maximum electrons per shell follow the formula 2n².',
      ta: 'எலக்ட்ரான் கூடுகளின் அதிகபட்ச திறன் 2n² விதியை பின்பற்றுகிறது.',
    },
    sequence: [
      { display: '2 (n=1)', icon: '⚛️' },
      { display: '8 (n=2)', icon: '⚛️' },
      { display: '18 (n=3)', icon: '⚛️' },
      { display: '?', icon: '❓' },
    ],
    missingIndex: 3,
    options: [
      { id: 'opt-24', value: '24', label: { en: '24 electrons', ta: '24 எலக்ட்ரான்கள்' }, icon: '⚛️' },
      { id: 'opt-32', value: '32', label: { en: '32 electrons', ta: '32 எலக்ட்ரான்கள்' }, icon: '⚛️' },
      { id: 'opt-36', value: '36', label: { en: '36 electrons', ta: '36 எலக்ட்ரான்கள்' }, icon: '⚛️' },
      { id: 'opt-64', value: '64', label: { en: '64 electrons', ta: '64 எலக்ட்ரான்கள்' }, icon: '⚛️' },
    ],
    correctOptionId: 'opt-32',
    explanation: {
      en: 'For n=4: 2 × 4² = 2 × 16 = 32 electrons in the N-shell.',
      ta: 'n=4 எனில்: 2 × 4² = 32 எலக்ட்ரான்கள் N-கூட்டில் அமையும்.',
    },
  },
  {
    id: 'pat-04',
    name: 'Level 4: Biological Hierarchy',
    ruleDescription: {
      en: 'Levels of biological organization from smallest to largest.',
      ta: 'உயிரியல் அமைப்பின் படிநிலைகள்.',
    },
    sequence: [
      { display: 'Cell', icon: '🔬' },
      { display: 'Tissue', icon: '🧬' },
      { display: '?', icon: '❓' },
      { display: 'Organ System', icon: '🫀' },
      { display: 'Organism', icon: '🚶' },
    ],
    missingIndex: 2,
    options: [
      { id: 'opt-organ', value: 'Organ', label: { en: 'Organ', ta: 'உறுப்பு' }, icon: '🫁' },
      { id: 'opt-biome', value: 'Biome', label: { en: 'Biome', ta: 'பயோரா' }, icon: '🌲' },
      { id: 'opt-atom', value: 'Atom', label: { en: 'Atom', ta: 'அணு' }, icon: '⚛️' },
      { id: 'opt-molecule', value: 'Molecule', label: { en: 'Molecule', ta: 'மூலக்கூறு' }, icon: '🧪' },
    ],
    correctOptionId: 'opt-organ',
    explanation: {
      en: 'Cells form tissues, tissues combine to create Organs.',
      ta: 'செல்கள் திசுக்களாகவும், திசுக்கள் உறுப்புகளாகவும் இணைகின்றன.',
    },
  },
  {
    id: 'pat-05',
    name: 'Level 5: Wave Spectrum Frequency',
    ruleDescription: {
      en: 'Electromagnetic spectrum in order of increasing frequency.',
      ta: 'மின்காந்த அலைகளின் அதிர்வெண் ஏறுவரிசை.',
    },
    sequence: [
      { display: 'Radio', icon: '📻' },
      { display: 'Microwave', icon: '📡' },
      { display: 'Infrared', icon: '🌡️' },
      { display: 'Visible', icon: '🌈' },
      { display: '?', icon: '❓' },
      { display: 'X-Ray', icon: '🩻' },
    ],
    missingIndex: 4,
    options: [
      { id: 'opt-uv', value: 'Ultraviolet', label: { en: 'Ultraviolet (UV)', ta: 'புற ஊதா (UV)' }, icon: '☀️' },
      { id: 'opt-sound', value: 'Sound Waves', label: { en: 'Sound Waves', ta: 'ஒலி அலைகள்' }, icon: '🔊' },
      { id: 'opt-seismic', value: 'Seismic Waves', label: { en: 'Seismic Waves', ta: 'நில அதிர்வு அலைகள்' }, icon: '🌋' },
      { id: 'opt-gamma', value: 'Gamma Ray', label: { en: 'Gamma Ray', ta: 'காமா கதிர்கள்' }, icon: '☢️' },
    ],
    correctOptionId: 'opt-uv',
    explanation: {
      en: 'Ultraviolet lies between visible light and X-rays.',
      ta: 'புற ஊதாக் கதிர்கள் புலனாகும் ஒளிக்கும் எக்ஸ்-கதிர்களுக்கும் இடையே உள்ளன.',
    },
  },
  {
    id: 'pat-06',
    name: 'Level 6: Power of Tens (Micro to Nano)',
    ruleDescription: {
      en: 'SI Metric prefixes decreasing by powers of 10³.',
      ta: 'மெட்ரிக் முன்னொட்டுகளின் இறங்கு வரிசை.',
    },
    sequence: [
      { display: 'Milli (10⁻³)', icon: '📏' },
      { display: 'Micro (10⁻⁶)', icon: '🔬' },
      { display: '?', icon: '❓' },
      { display: 'Pico (10⁻¹²)', icon: '⚛️' },
    ],
    missingIndex: 2,
    options: [
      { id: 'opt-nano', value: 'Nano (10⁻⁹)', label: { en: 'Nano (10⁻⁹)', ta: 'நானோ (10⁻⁹)' }, icon: '✨' },
      { id: 'opt-kilo', value: 'Kilo (10³)', label: { en: 'Kilo (10³)', ta: 'கிலோ (10³)' }, icon: '⚖️' },
      { id: 'opt-mega', value: 'Mega (10⁶)', label: { en: 'Mega (10⁶)', ta: 'மெகா (10⁶)' }, icon: '⚡' },
      { id: 'opt-centi', value: 'Centi (10⁻²)', label: { en: 'Centi (10⁻²)', ta: 'சென்டி (10⁻²)' }, icon: '📐' },
    ],
    correctOptionId: 'opt-nano',
    explanation: {
      en: '10⁻⁶ (micro) divided by 1000 is 10⁻⁹ (nano).',
      ta: '10⁻⁶ (மைக்ரோ) அடுத்த நிலை 10⁻⁹ (நானோ) ஆகும்.',
    },
  },
  {
    id: 'pat-07',
    name: 'Level 7: Mitosis Phases',
    ruleDescription: {
      en: 'Sequential stages of cell division in mitosis.',
      ta: 'மைட்டாசிஸ் செல் பிரிதலின் வரிசை நிலைகள்.',
    },
    sequence: [
      { display: 'Prophase', icon: '1️⃣' },
      { display: 'Metaphase', icon: '2️⃣' },
      { display: '?', icon: '❓' },
      { display: 'Telophase', icon: '4️⃣' },
    ],
    missingIndex: 2,
    options: [
      { id: 'opt-ana', value: 'Anaphase', label: { en: 'Anaphase', ta: 'அனாஃபேஸ்' }, icon: '3️⃣' },
      { id: 'opt-cyto', value: 'Cytokinesis', label: { en: 'Cytokinesis', ta: 'சைட்டோகைனசிஸ்' }, icon: '🔄' },
      { id: 'opt-inter', value: 'Interphase', label: { en: 'Interphase', ta: 'இன்டர்ஃபேஸ்' }, icon: '⏸️' },
      { id: 'opt-meio', value: 'Meiosis', label: { en: 'Meiosis', ta: 'மியாசிஸ்' }, icon: '🔀' },
    ],
    correctOptionId: 'opt-ana',
    explanation: {
      en: 'PMAT rule: Prophase, Metaphase, Anaphase, Telophase.',
      ta: 'PMAT நினைவூட்டல்: புரோஃபேஸ், மெட்டாஃபேஸ், அனாஃபேஸ், டீலோஃபேஸ்.',
    },
  },
  {
    id: 'pat-08',
    name: 'Level 8: Geological Eras',
    ruleDescription: {
      en: 'Earth geological eras from ancient to modern.',
      ta: 'பூமியின் புவியியல் காலங்களின் வரிசை.',
    },
    sequence: [
      { display: 'Precambrian', icon: '🌋' },
      { display: 'Paleozoic', icon: '🐟' },
      { display: 'Mesozoic (Dinosaurs)', icon: '🦕' },
      { display: '?', icon: '❓' },
    ],
    missingIndex: 3,
    options: [
      { id: 'opt-ceno', value: 'Cenozoic (Mammals)', label: { en: 'Cenozoic (Age of Mammals)', ta: 'செனோசோயிக் (பாலூட்டிகள் காலம்)' }, icon: '🐘' },
      { id: 'opt-jurassic', value: 'Jurassic', label: { en: 'Jurassic', ta: 'ஜுராசிக்' }, icon: '🦖' },
      { id: 'opt-triassic', value: 'Triassic', label: { en: 'Triassic', ta: 'டிரையாசிக்' }, icon: '🦎' },
      { id: 'opt-cambrian', value: 'Cambrian', label: { en: 'Cambrian', ta: 'கேம்பிரியன்' }, icon: '🐚' },
    ],
    correctOptionId: 'opt-ceno',
    explanation: {
      en: 'Cenozoic is our current geological era spanning the last 66 million years.',
      ta: 'செனோசோயிக் என்பது கடந்த 66 மில்லியன் ஆண்டுகளாக தொடரும் தற்போதைய புவியியல் காலம்.',
    },
  },
  {
    id: 'pat-09',
    name: 'Level 9: Newton Third Law Pairs',
    ruleDescription: {
      en: 'For every action there is an equal and opposite reaction.',
      ta: 'ஒவ்வொரு விசைக்கும் சமமான எதிர்விசை உண்டு.',
    },
    sequence: [
      { display: 'Rocket Gas Exhaust (Downward)', icon: '⬇️' },
      { display: 'Rocket Thrust (Upward)', icon: '⬆️' },
      { display: 'Swimmer Pushes Water (Backward)', icon: '⬅️' },
      { display: '?', icon: '❓' },
    ],
    missingIndex: 3,
    options: [
      { id: 'opt-swim-fwd', value: 'Swimmer Moves Forward', label: { en: 'Swimmer Moves Forward', ta: 'நீச்சல் வீரர் முன்னோக்கி நகர்தல்' }, icon: '➡️' },
      { id: 'opt-sink', value: 'Swimmer Sinks', label: { en: 'Swimmer Sinks Down', ta: 'நீச்சல் வீரர் மூழ்குதல்' }, icon: '⬇️' },
      { id: 'opt-float', value: 'Water Disappears', label: { en: 'Water Disappears', ta: 'தண்ணீர் மறைதல்' }, icon: '💧' },
      { id: 'opt-stop', value: 'Motion Stops', label: { en: 'Motion Stops', ta: 'இயக்கம் நின்றுபோதல்' }, icon: '🛑' },
    ],
    correctOptionId: 'opt-swim-fwd',
    explanation: {
      en: 'Pushing water backward creates forward reaction force.',
      ta: 'நீரை பின்னோக்கி தள்ளுவதால் உடலை முன்னோக்கி செலுத்தும் எதிர்விசை உருவாகிறது.',
    },
  },
  {
    id: 'pat-10',
    name: 'Level 10: Periodic Table Alkali Metals',
    ruleDescription: {
      en: 'Group 1 elements in order of increasing atomic number.',
      ta: 'கார உலோகங்களின் அணு எண் ஏறுவரிசை.',
    },
    sequence: [
      { display: 'Li (3)', icon: '🔴' },
      { display: 'Na (11)', icon: '🟠' },
      { display: 'K (19)', icon: '🟡' },
      { display: '?', icon: '❓' },
      { display: 'Cs (55)', icon: '🟣' },
    ],
    missingIndex: 3,
    options: [
      { id: 'opt-rb', value: 'Rb (37)', label: { en: 'Rubidium Rb (37)', ta: 'ரூபிடியம் Rb (37)' }, icon: '🟢' },
      { id: 'opt-ca', value: 'Ca (20)', label: { en: 'Calcium Ca (20)', ta: 'கால்சியம் Ca (20)' }, icon: '⚪' },
      { id: 'opt-mg', value: 'Mg (12)', label: { en: 'Magnesium Mg (12)', ta: 'மெக்னீசியம் Mg (12)' }, icon: '🔘' },
      { id: 'opt-sr', value: 'Sr (38)', label: { en: 'Strontium Sr (38)', ta: 'ஸ்ட்ரோன்சியம் Sr (38)' }, icon: '🔵' },
    ],
    correctOptionId: 'opt-rb',
    explanation: {
      en: 'Rubidium (atomic number 37) is the 4th alkali metal.',
      ta: 'ரூபிடியம் (அணு எண் 37) நான்காவது கார உலோகமாகும்.',
    },
  },
];
