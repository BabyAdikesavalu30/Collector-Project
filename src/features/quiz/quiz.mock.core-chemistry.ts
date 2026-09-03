/**
 * Additional Core-Level Chemistry Questions (Classes 8–10)
 * Tops up existing core chemistry pathways to >= 8 questions each:
 * chem-c-1 (Atoms & Elements), chem-c-2 (Chemical Reactions & Equations),
 * chem-c-3 (Metals & Non-Metals).
 */

import { QuizQuestion } from './quiz.types';

export const CORE_CHEMISTRY_QUESTIONS: QuizQuestion[] = [
  // ==================== chem-c-1 (additions) ====================
  {
    id: 'chem-005',
    subjectId: 'chemistry',
    pathwayId: 'chem-c-1',
    difficulty: 'beginner',
    question: {
      en: 'What is the smallest unit of matter that can take part in a chemical reaction?',
      ta: 'வேதியியல் வினையில் பங்கேற்கக்கூடிய பொருளின் மிகச் சிறிய அலகு எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Atom', ta: 'அணு' } },
      { id: 'b', label: 'B', text: { en: 'Molecule', ta: 'மூலக்கூறு' } },
      { id: 'c', label: 'C', text: { en: 'Cell', ta: 'செல்' } },
      { id: 'd', label: 'D', text: { en: 'Crystal', ta: 'படிகம்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'An atom is the smallest particle of an element that can take part in a chemical reaction.',
      ta: 'வேதியியல் வினையில் பங்கேற்கக்கூடிய ஒரு தனிமத்தின் மிகச் சிறிய துகள் அணு ஆகும்.',
    },
    hint: {
      en: 'Everything is made of these tiny particles.',
      ta: 'அனைத்தும் இந்த மிகச் சிறிய துகள்களால் ஆனவை.',
    },
  },
  {
    id: 'chem-006',
    subjectId: 'chemistry',
    pathwayId: 'chem-c-1',
    difficulty: 'beginner',
    question: {
      en: 'What is the chemical symbol of oxygen?',
      ta: 'ஆக்ஸிஜனின் வேதியியல் குறியீடு என்ன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'O', ta: 'O' } },
      { id: 'b', label: 'B', text: { en: 'Ox', ta: 'Ox' } },
      { id: 'c', label: 'C', text: { en: 'Og', ta: 'Og' } },
      { id: 'd', label: 'D', text: { en: 'Om', ta: 'Om' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Oxygen\'s symbol is O. It is the eighth element with atomic number 8.',
      ta: 'ஆக்ஸிஜனின் குறியீடு O. அணு எண் 8 கொண்ட எட்டாவது தனிமம் இது.',
    },
    hint: {
      en: 'The first letter of its name.',
      ta: 'அதன் பெயரின் முதல் எழுத்து.',
    },
  },
  {
    id: 'chem-007',
    subjectId: 'chemistry',
    pathwayId: 'chem-c-1',
    difficulty: 'intermediate',
    question: {
      en: 'Water (H₂O) is made of hydrogen and oxygen. What type of substance is water?',
      ta: 'நீர் (H₂O) ஹைட்ரஜன் மற்றும் ஆக்ஸிஜனால் ஆனது. நீர் எந்த வகைப் பொருள்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'A compound', ta: 'சேர்மம்' } },
      { id: 'b', label: 'B', text: { en: 'An element', ta: 'தனிமம்' } },
      { id: 'c', label: 'C', text: { en: 'A mixture of atoms', ta: 'அணுக்களின் கலவை' } },
      { id: 'd', label: 'D', text: { en: 'A pure metal', ta: 'தூய உலோகம்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'A compound is a substance made of two or more elements chemically combined in a fixed ratio — water is H₂O.',
      ta: 'இரண்டு அல்லது அதற்கு மேற்பட்ட தனிமங்கள் நிலையான விகிதத்தில் வேதியியல் முறையில் சேர்ந்தால் சேர்மம் உருவாகிறது — நீர் H₂O.',
    },
    hint: {
      en: 'Two different elements joined together.',
      ta: 'இரண்டு வெவ்வேறு தனிமங்கள் இணைந்தவை.',
    },
  },
  {
    id: 'chem-008',
    subjectId: 'chemistry',
    pathwayId: 'chem-c-1',
    difficulty: 'intermediate',
    question: {
      en: 'The atomic number of an element equals the number of what in its nucleus?',
      ta: 'ஒரு தனிமத்தின் அணு எண் அதன் கருவில் உள்ள எதன் எண்ணிக்கைக்கு சமம்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Protons', ta: 'புரோட்டான்கள்' } },
      { id: 'b', label: 'B', text: { en: 'Neutrons', ta: 'நியூட்ரான்கள்' } },
      { id: 'c', label: 'C', text: { en: 'Electrons in all shells', ta: 'அனைத்து கூடுகளிலும் உள்ள எலக்ட்ரான்கள்' } },
      { id: 'd', label: 'D', text: { en: 'Molecules', ta: 'மூலக்கூறுகள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Atomic number = number of protons in the nucleus. It uniquely identifies an element.',
      ta: 'அணு எண் = கருவில் உள்ள புரோட்டான்களின் எண்ணிக்கை. இது ஒரு தனிமத்தைத் தனித்துவமாக அடையாளம் காட்டுகிறது.',
    },
    hint: {
      en: 'The positively charged particles in the nucleus.',
      ta: 'கருவில் உள்ள நேர்மின்னூட்ட துகள்கள்.',
    },
  },
  {
    id: 'chem-009',
    subjectId: 'chemistry',
    pathwayId: 'chem-c-1',
    difficulty: 'advanced',
    question: {
      en: 'In the modern periodic table, elements are arranged in order of increasing what?',
      ta: 'நவீன தனிம வரிசை அட்டவணையில் தனிமங்கள் அதிகரிக்கும் வரிசையில் அமைக்கப்பட்டுள்ளன — எதன் அடிப்படையில்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Atomic number', ta: 'அணு எண்' } },
      { id: 'b', label: 'B', text: { en: 'Atomic mass only', ta: 'அணு நிறை மட்டும்' } },
      { id: 'c', label: 'C', text: { en: 'Density', ta: 'அடர்த்தி' } },
      { id: 'd', label: 'D', text: { en: 'Melting point', ta: 'உருகுநிலை' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Mendeleev used atomic mass; the modern periodic table orders elements by increasing atomic number.',
      ta: 'மெண்டலீவ் அணு நிறையைப் பயன்படுத்தினார்; நவீன அட்டவணை அணு எண் வரிசையில் தனிமங்களை அமைக்கிறது.',
    },
    hint: {
      en: 'It equals the number of protons.',
      ta: 'இது புரோட்டான்களின் எண்ணிக்கைக்கு சமம்.',
    },
  },
  {
    id: 'chem-010',
    subjectId: 'chemistry',
    pathwayId: 'chem-c-1',
    difficulty: 'advanced',
    question: {
      en: 'Which group of elements is known for being very unreactive (chemically inert)?',
      ta: 'எந்த வகை தனிமங்கள் மிகவும் வினைபுரியாதவை (வேதியியல் மந்தம்) என்று அறியப்படுகின்றன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Noble gases', ta: 'அரிய வாயுக்கள்' } },
      { id: 'b', label: 'B', text: { en: 'Alkali metals', ta: 'கார உலோகங்கள்' } },
      { id: 'c', label: 'C', text: { en: 'Halogens', ta: 'ஆலசன்கள்' } },
      { id: 'd', label: 'D', text: { en: 'Transition metals', ta: 'மாறுநிலை உலோகங்கள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Noble gases (He, Ne, Ar) have full outer shells, so they rarely form chemical bonds — they are chemically inert.',
      ta: 'அரிய வாயுக்களுக்கு (He, Ne, Ar) முழுமையான வெளி ஓடு உள்ளதால் அவை அரிதாக வேதிப்பிணைப்பை உருவாக்குகின்றன — வேதியியல் மந்தம்.',
    },
    hint: {
      en: 'They include helium used in balloons.',
      ta: 'பலூன்களில் பயன்படும் ஹீலியமும் இதில் அடங்கும்.',
    },
  },

  // ==================== chem-c-2 (additions) ====================
  {
    id: 'chem-011',
    subjectId: 'chemistry',
    pathwayId: 'chem-c-2',
    difficulty: 'beginner',
    question: {
      en: 'Rusting of iron requires which two things?',
      ta: 'இரும்பு துருப்பிடிக்க எந்த இரண்டு விஷயங்கள் தேவை?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Oxygen and moisture (water)', ta: 'ஆக்ஸிஜன் மற்றும் ஈரப்பதம் (நீர்)' } },
      { id: 'b', label: 'B', text: { en: 'Nitrogen and heat', ta: 'நைட்ரஜன் மற்றும் வெப்பம்' } },
      { id: 'c', label: 'C', text: { en: 'Carbon dioxide and light', ta: 'கார்பன் டை ஆக்சைடு மற்றும் ஒளி' } },
      { id: 'd', label: 'D', text: { en: 'Salt and sand', ta: 'உப்பு மற்றும் மணல்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Rusting is the slow chemical change of iron in the presence of oxygen and moisture, forming reddish-brown iron oxide.',
      ta: 'ஆக்ஸிஜன் மற்றும் ஈரப்பதம் முன்னிலையில் இரும்பு மெதுவாக வேதியியல் மாற்றம் அடைந்து செம்பழுப்பு இரும்பு ஆக்சைடாக மாறுவது துருப்பிடித்தல்.',
    },
    hint: {
      en: 'Both are found in damp air.',
      ta: 'இரண்டும் ஈரமான காற்றில் காணப்படுகின்றன.',
    },
  },
  {
    id: 'chem-012',
    subjectId: 'chemistry',
    pathwayId: 'chem-c-2',
    difficulty: 'beginner',
    question: {
      en: 'Burning of wood is which type of change?',
      ta: 'மரம் எரிதல் எந்த வகையான மாற்றம்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Chemical change', ta: 'வேதியியல் மாற்றம்' } },
      { id: 'b', label: 'B', text: { en: 'Physical change', ta: 'இயற்பியல் மாற்றம்' } },
      { id: 'c', label: 'C', text: { en: 'No change', ta: 'மாற்றம் இல்லை' } },
      { id: 'd', label: 'D', text: { en: 'Reversible change', ta: 'மீளக்கூடிய மாற்றம்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Burning produces new substances (ash, smoke, gases) and cannot be reversed, so it is a chemical change.',
      ta: 'எரிதல் புதிய பொருட்களை (சாம்பல், புகை, வாயுக்கள்) உருவாக்குகிறது, மீள முடியாதது, எனவே இது வேதியியல் மாற்றம்.',
    },
    hint: {
      en: 'New substances form and you cannot get the wood back.',
      ta: 'புதிய பொருட்கள் உருவாகின்றன; மரத்தை மீண்டும் பெற முடியாது.',
    },
  },
  {
    id: 'chem-013',
    subjectId: 'chemistry',
    pathwayId: 'chem-c-2',
    difficulty: 'intermediate',
    question: {
      en: 'In a chemical equation, the substances formed after the reaction are called what?',
      ta: 'வேதியியல் சமன்பாட்டில், வினைக்குப் பின் உருவாகும் பொருட்கள் என்ன அழைக்கப்படுகின்றன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Products', ta: 'விளைபொருட்கள்' } },
      { id: 'b', label: 'B', text: { en: 'Reactants', ta: 'வினைப்பொருட்கள்' } },
      { id: 'c', label: 'C', text: { en: 'Catalysts', ta: 'வினையூக்கிகள்' } },
      { id: 'd', label: 'D', text: { en: 'Indicators', ta: 'குறிகாட்டிகள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'In A + B → C + D, A and B are reactants and C and D are the products formed.',
      ta: 'A + B → C + D சமன்பாட்டில் A, B வினைப்பொருட்கள்; C, D உருவாகும் விளைபொருட்கள்.',
    },
    hint: {
      en: 'They appear on the right side of the arrow.',
      ta: 'அவை அம்புக்குறியின் வலப்பக்கத்தில் தோன்றும்.',
    },
  },
  {
    id: 'chem-014',
    subjectId: 'chemistry',
    pathwayId: 'chem-c-2',
    difficulty: 'intermediate',
    question: {
      en: 'In photosynthesis, plants convert carbon dioxide and water into glucose and which gas?',
      ta: 'ஒளிச்சேர்க்கையில் தாவரங்கள் கார்பன் டை ஆக்சைடு மற்றும் நீரை குளுக்கோஸாகவும் எந்த வாயுவாகவும் மாற்றுகின்றன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Oxygen', ta: 'ஆக்ஸிஜன்' } },
      { id: 'b', label: 'B', text: { en: 'Nitrogen', ta: 'நைட்ரஜன்' } },
      { id: 'c', label: 'C', text: { en: 'Hydrogen', ta: 'ஹைட்ரஜன்' } },
      { id: 'd', label: 'D', text: { en: 'Methane', ta: 'மீத்தேன்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂: photosynthesis releases oxygen as a product.',
      ta: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂: ஒளிச்சேர்க்கை விளைபொருளாக ஆக்ஸிஜனை வெளியிடுகிறது.',
    },
    hint: {
      en: 'The gas animals and humans breathe.',
      ta: 'விலங்குகளும் மனிதர்களும் சுவாசிக்கும் வாயு.',
    },
  },
  {
    id: 'chem-015',
    subjectId: 'chemistry',
    pathwayId: 'chem-c-2',
    difficulty: 'advanced',
    question: {
      en: 'Iron dipped in copper sulphate solution displaces copper. This is an example of which reaction?',
      ta: 'செப்பு சல்பேட் கரைசலில் இரும்பை நனைக்கும்போது செம்பு இடம்பெயர்கிறது. இது எந்த வினைக்கு எடுத்துக்காட்டு?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Displacement reaction', ta: 'இடப்பெயர்வு வினை' } },
      { id: 'b', label: 'B', text: { en: 'Combination reaction', ta: 'சேர்க்கை வினை' } },
      { id: 'c', label: 'C', text: { en: 'Decomposition reaction', ta: 'பிரிகை வினை' } },
      { id: 'd', label: 'D', text: { en: 'Neutralisation reaction', ta: 'நடுநிலையாக்கல் வினை' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Iron is more reactive than copper, so it displaces copper from its salt solution: Fe + CuSO₄ → FeSO₄ + Cu.',
      ta: 'இரும்பு செம்பை விட அதிக வினைத்திறன் கொண்டது, எனவே அது செம்பை அதன் உப்புக் கரைசலிலிருந்து இடம்பெயர்க்கிறது: Fe + CuSO₄ → FeSO₄ + Cu.',
    },
    hint: {
      en: 'One metal takes the place of another.',
      ta: 'ஒரு உலோகம் மற்றொன்றின் இடத்தைப் பிடிக்கிறது.',
    },
  },
  {
    id: 'chem-016',
    subjectId: 'chemistry',
    pathwayId: 'chem-c-2',
    difficulty: 'advanced',
    question: {
      en: 'Why must chemical equations be balanced?',
      ta: 'வேதியியல் சமன்பாடுகள் ஏன் சமநிலைப்படுத்தப்பட வேண்டும்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'To obey the law of conservation of mass', ta: 'நிறை மாறா விதிக்கு கட்டுப்பட' } },
      { id: 'b', label: 'B', text: { en: 'To make the reaction faster', ta: 'வினையை வேகப்படுத்த' } },
      { id: 'c', label: 'C', text: { en: 'To change the products', ta: 'விளைபொருட்களை மாற்ற' } },
      { id: 'd', label: 'D', text: { en: 'To add more colours to the reaction', ta: 'வினையில் அதிக நிறங்களைச் சேர்க்க' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Atoms are neither created nor destroyed in a reaction, so the number of atoms of each element must be equal on both sides.',
      ta: 'வினையில் அணுக்கள் உருவாக்கப்படுவதுமில்லை, அழிக்கப்படுவதுமில்லை, எனவே ஒவ்வொரு தனிமத்தின் அணுக்களும் இருபுறமும் சமமாக இருக்க வேண்டும்.',
    },
    hint: {
      en: 'Matter cannot be created or destroyed.',
      ta: 'பொருளை உருவாக்கவோ அழிக்கவோ முடியாது.',
    },
  },

  // ==================== chem-c-3 (additions) ====================
  {
    id: 'chem-017',
    subjectId: 'chemistry',
    pathwayId: 'chem-c-3',
    difficulty: 'beginner',
    question: {
      en: 'Which metal is liquid at room temperature?',
      ta: 'அறை வெப்பநிலையில் நீர்மமாக இருக்கும் உலோகம் எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Mercury', ta: 'பாதரசம்' } },
      { id: 'b', label: 'B', text: { en: 'Iron', ta: 'இரும்பு' } },
      { id: 'c', label: 'C', text: { en: 'Copper', ta: 'செம்பு' } },
      { id: 'd', label: 'D', text: { en: 'Aluminium', ta: 'அலுமினியம்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Mercury is the only metal that is liquid at room temperature. It is used in thermometers.',
      ta: 'அறை வெப்பநிலையில் நீர்மமாக இருக்கும் ஒரே உலோகம் பாதரசம். இது வெப்பமானிகளில் பயன்படுகிறது.',
    },
    hint: {
      en: 'Found inside old thermometers.',
      ta: 'பழைய வெப்பமானிகளுக்குள் காணப்படும்.',
    },
  },
  {
    id: 'chem-018',
    subjectId: 'chemistry',
    pathwayId: 'chem-c-3',
    difficulty: 'beginner',
    question: {
      en: 'Metals are generally good at doing what?',
      ta: 'உலோகங்கள் பொதுவாக எதில் சிறந்தவை?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Conducting heat and electricity', ta: 'வெப்பம் மற்றும் மின்சாரத்தை கடத்துதல்' } },
      { id: 'b', label: 'B', text: { en: 'Breaking easily', ta: 'எளிதில் உடைதல்' } },
      { id: 'c', label: 'C', text: { en: 'Dissolving in water', ta: 'தண்ணீரில் கரைதல்' } },
      { id: 'd', label: 'D', text: { en: 'Burning quickly', ta: 'விரைவாக எரிதல்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Metals are good conductors of heat and electricity, which is why cooking vessels and wires are made of metals.',
      ta: 'உலோகங்கள் வெப்பம் மற்றும் மின்சாரத்தின் நல்ல கடத்திகள்; அதனால்தான் சமையல் பாத்திரங்களும் மின்கம்பிகளும் உலோகத்தால் செய்யப்படுகின்றன.',
    },
    hint: {
      en: 'Think of a metal spoon in hot water.',
      ta: 'சூடான நீரில் உலோகக் கரண்டியை நினைக்கவும்.',
    },
  },
  {
    id: 'chem-019',
    subjectId: 'chemistry',
    pathwayId: 'chem-c-3',
    difficulty: 'beginner',
    question: {
      en: 'Which non-metal is essential for breathing and burning?',
      ta: 'சுவாசத்திற்கும் எரிதலுக்கும் அவசியமான உலோகமல்லாத வாயு எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Oxygen', ta: 'ஆக்ஸிஜன்' } },
      { id: 'b', label: 'B', text: { en: 'Carbon', ta: 'கார்பன்' } },
      { id: 'c', label: 'C', text: { en: 'Sulphur', ta: 'கந்தகம்' } },
      { id: 'd', label: 'D', text: { en: 'Phosphorus', ta: 'பாஸ்பரஸ்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Oxygen is a non-metal gas essential for respiration and combustion.',
      ta: 'ஆக்ஸிஜன் ஒரு உலோகமல்லாத வாயு; சுவாசத்திற்கும் எரிதலுக்கும் அவசியம்.',
    },
    hint: {
      en: 'About 21% of the air.',
      ta: 'காற்றில் சுமார் 21%.',
    },
  },
  {
    id: 'chem-020',
    subjectId: 'chemistry',
    pathwayId: 'chem-c-3',
    difficulty: 'intermediate',
    question: {
      en: 'When a metal reacts with a dilute acid, which gas is produced?',
      ta: 'உலோகம் நீர்த்த அமிலத்துடன் வினைபுரியும்போது எந்த வாயு உருவாகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Hydrogen gas', ta: 'ஹைட்ரஜன் வாயு' } },
      { id: 'b', label: 'B', text: { en: 'Oxygen gas', ta: 'ஆக்ஸிஜன் வாயு' } },
      { id: 'c', label: 'C', text: { en: 'Carbon dioxide', ta: 'கார்பன் டை ஆக்சைடு' } },
      { id: 'd', label: 'D', text: { en: 'Chlorine gas', ta: 'குளோரின் வாயு' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Metal + Dilute acid → Salt + Hydrogen gas. The hydrogen pops with a flame when tested.',
      ta: 'உலோகம் + நீர்த்த அமிலம் → உப்பு + ஹைட்ரஜன் வாயு. சோதிக்கும்போது ஹைட்ரஜன் "பாப்" ஒலியுடன் எரியும்.',
    },
    hint: {
      en: 'The lightest gas, tested with a burning splinter.',
      ta: 'மிக லேசான வாயு; எரியும் சிம்மியால் சோதிக்கப்படும்.',
    },
  },
  {
    id: 'chem-021',
    subjectId: 'chemistry',
    pathwayId: 'chem-c-3',
    difficulty: 'intermediate',
    question: {
      en: 'In the reactivity series, which metal is placed at the very top?',
      ta: 'வினைத்திறன் வரிசையில் மிக உச்சியில் வைக்கப்படும் உலோகம் எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Potassium', ta: 'பொட்டாசியம்' } },
      { id: 'b', label: 'B', text: { en: 'Gold', ta: 'தங்கம்' } },
      { id: 'c', label: 'C', text: { en: 'Iron', ta: 'இரும்பு' } },
      { id: 'd', label: 'D', text: { en: 'Copper', ta: 'செம்பு' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Potassium is the most reactive metal and sits at the top of the reactivity series; gold is at the bottom.',
      ta: 'பொட்டாசியம் மிகவும் வினைத்திறன் மிக்க உலோகம்; வினைத்திறன் வரிசையின் உச்சியில் உள்ளது. தங்கம் அடியில் உள்ளது.',
    },
    hint: {
      en: 'It reacts violently with water.',
      ta: 'இது தண்ணீருடன் வன்மையாக வினைபுரிகிறது.',
    },
  },
  {
    id: 'chem-022',
    subjectId: 'chemistry',
    pathwayId: 'chem-c-3',
    difficulty: 'intermediate',
    question: {
      en: 'Copper is used for making electric wires mainly because it is what?',
      ta: 'மின்கம்பிகள் செய்ய செம்பு பயன்படுத்தப்படுவதற்கு முக்கிய காரணம் அது எப்படிப்பட்டது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'A good conductor and ductile', ta: 'நல்ல கடத்தி மற்றும் நெகிழ்வானது' } },
      { id: 'b', label: 'B', text: { en: 'Very cheap and heavy', ta: 'மிக மலிவானது மற்றும் கனமானது' } },
      { id: 'c', label: 'C', text: { en: 'A poor conductor', ta: 'மோசமான கடத்தி' } },
      { id: 'd', label: 'D', text: { en: 'Easily broken', ta: 'எளிதில் உடையக்கூடியது' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Copper conducts electricity well and can be drawn into thin wires (ductile), making it ideal for wiring.',
      ta: 'செம்பு மின்சாரத்தை நன்றாக கடத்துகிறது; மெல்லிய கம்பிகளாக இழுக்க முடியும் (நெகிழ்வு), எனவே கம்பி தயாரிக்க ஏற்றது.',
    },
    hint: {
      en: 'Think of the properties needed in a wire.',
      ta: 'கம்பிக்குத் தேவையான பண்புகளை நினைக்கவும்.',
    },
  },
  {
    id: 'chem-023',
    subjectId: 'chemistry',
    pathwayId: 'chem-c-3',
    difficulty: 'advanced',
    question: {
      en: 'The corrosion of iron is commonly known as what?',
      ta: 'இரும்பின் அரிப்பு பொதுவாக என்ன அழைக்கப்படுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Rusting', ta: 'துருப்பிடித்தல்' } },
      { id: 'b', label: 'B', text: { en: 'Melting', ta: 'உருகுதல்' } },
      { id: 'c', label: 'C', text: { en: 'Galvanising', ta: 'துத்தநாக முலாம்' } },
      { id: 'd', label: 'D', text: { en: 'Alloying', ta: 'கலப்புலோகமாக்கல்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Rusting is the corrosion of iron — the formation of reddish-brown iron oxide in the presence of air and moisture.',
      ta: 'காற்று மற்றும் ஈரப்பதம் முன்னிலையில் செம்பழுப்பு இரும்பு ஆக்சைடு உருவாகி இரும்பு அரிக்கப்படுவது துருப்பிடித்தல்.',
    },
    hint: {
      en: 'The brown flaky layer on old iron gates.',
      ta: 'பழைய இரும்பு கேட்-களில் உள்ள பழுப்பு பொடியான அடுக்கு.',
    },
  },
  {
    id: 'chem-024',
    subjectId: 'chemistry',
    pathwayId: 'chem-c-3',
    difficulty: 'advanced',
    question: {
      en: 'Brass is an alloy made of which two metals?',
      ta: 'பித்தளை எந்த இரண்டு உலோகங்களால் ஆன கலப்புலோகம்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Copper and zinc', ta: 'செம்பு மற்றும் துத்தநாகம்' } },
      { id: 'b', label: 'B', text: { en: 'Iron and carbon', ta: 'இரும்பு மற்றும் கார்பன்' } },
      { id: 'c', label: 'C', text: { en: 'Gold and silver', ta: 'தங்கம் மற்றும் வெள்ளி' } },
      { id: 'd', label: 'D', text: { en: 'Aluminium and magnesium', ta: 'அலுமினியம் மற்றும் மெக்னீசியம்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Brass is an alloy of copper (about 70%) and zinc. Bronze is copper with tin.',
      ta: 'பித்தளை செம்பு (சுமார் 70%) மற்றும் துத்தநாகத்தின் கலப்புலோகம். வெண்கலம் செம்பு + தகரம்.',
    },
    hint: {
      en: 'One is reddish, the other is used to coat iron to prevent rusting.',
      ta: 'ஒன்று செம்மஞ்சள்; மற்றொன்று துரு தடுக்க இரும்புக்கு பூசப்படுகிறது.',
    },
  },
];