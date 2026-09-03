/**
 * Foundation-Level Chemistry Questions (Classes 6–7)
 * Grade-appropriate bilingual questions for chem-f-1 (Matter & Materials),
 * chem-f-2 (Acids, Bases & Salts), and chem-f-3 (Air & Water Resources).
 */

import { QuizQuestion } from './quiz.types';

export const FOUNDATION_CHEMISTRY_QUESTIONS: QuizQuestion[] = [
  // ==================== chem-f-1 Matter & Materials ====================
  {
    id: 'chemf-101',
    subjectId: 'chemistry',
    pathwayId: 'chem-f-1',
    difficulty: 'beginner',
    question: {
      en: 'Which of these is an example of a solid?',
      ta: 'இவற்றில் எது திண்மத்திற்கு எடுத்துக்காட்டு?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'A wooden block', ta: 'மரத்தடை' } },
      { id: 'b', label: 'B', text: { en: 'Milk', ta: 'பால்' } },
      { id: 'c', label: 'C', text: { en: 'Oxygen', ta: 'ஆக்ஸிஜன்' } },
      { id: 'd', label: 'D', text: { en: 'Steam', ta: 'நீராவி' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'A wooden block has a fixed shape and volume, so it is a solid. Milk is a liquid; oxygen and steam are gases.',
      ta: 'மரத்தடைக்கு நிலையான வடிவமும் கன அளவும் உள்ளது, எனவே அது திண்மம். பால் நீர்மம்; ஆக்ஸிஜனும் நீராவியும் வாயுக்கள்.',
    },
    hint: {
      en: 'It keeps its own shape without a container.',
      ta: 'தாங்கி இல்லாமல் அது தன் வடிவத்தை வைத்திருக்கிறது.',
    },
  },
  {
    id: 'chemf-102',
    subjectId: 'chemistry',
    pathwayId: 'chem-f-1',
    difficulty: 'beginner',
    question: {
      en: 'Water at room temperature is in which state?',
      ta: 'அறை வெப்பநிலையில் நீர் எந்த நிலையில் உள்ளது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Liquid', ta: 'நீர்மம்' } },
      { id: 'b', label: 'B', text: { en: 'Solid', ta: 'திண்மம்' } },
      { id: 'c', label: 'C', text: { en: 'Gas', ta: 'வாயு' } },
      { id: 'd', label: 'D', text: { en: 'Plasma', ta: 'பிளாஸ்மா' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'At room temperature water is a liquid — it flows and takes the shape of its container.',
      ta: 'அறை வெப்பநிலையில் நீர் நீர்ம நிலையில் உள்ளது — அது ஓடக்கூடியது, தாங்கியின் வடிவத்தை எடுக்கிறது.',
    },
    hint: {
      en: 'It flows when you pour it.',
      ta: 'ஊற்றும்போது அது ஓடுகிறது.',
    },
  },
  {
    id: 'chemf-103',
    subjectId: 'chemistry',
    pathwayId: 'chem-f-1',
    difficulty: 'beginner',
    question: {
      en: 'Air is a mixture of several gases. Which gas do we breathe in?',
      ta: 'காற்று பல வாயுக்களின் கலவை. நாம் எந்த வாயுவை உள்ளிழுக்கிறோம்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Oxygen', ta: 'ஆக்ஸிஜன்' } },
      { id: 'b', label: 'B', text: { en: 'Carbon dioxide', ta: 'கார்பன் டை ஆக்சைடு' } },
      { id: 'c', label: 'C', text: { en: 'Helium', ta: 'ஹீலியம்' } },
      { id: 'd', label: 'D', text: { en: 'Hydrogen', ta: 'ஹைட்ரஜன்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'We breathe in oxygen, which our body needs to release energy from food. We breathe out carbon dioxide.',
      ta: 'நாம் ஆக்ஸிஜனை உள்ளிழுக்கிறோம்; உணவிலிருந்து ஆற்றலை வெளியிட அது நம் உடலுக்குத் தேவை. நாம் கார்பன் டை ஆக்சைடை வெளியேற்றுகிறோம்.',
    },
    hint: {
      en: 'Without this gas we cannot survive even a few minutes.',
      ta: 'இந்த வாயு இல்லாமல் சில நிமிடங்கள் கூட நாம் உயிர்வாழ முடியாது.',
    },
  },
  {
    id: 'chemf-104',
    subjectId: 'chemistry',
    pathwayId: 'chem-f-1',
    difficulty: 'intermediate',
    question: {
      en: 'Which of these dissolves easily in water?',
      ta: 'இவற்றில் எது தண்ணீரில் எளிதாக கரைகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Sugar', ta: 'சர்க்கரை' } },
      { id: 'b', label: 'B', text: { en: 'Sand', ta: 'மணல்' } },
      { id: 'c', label: 'C', text: { en: 'Stones', ta: 'கற்கள்' } },
      { id: 'd', label: 'D', text: { en: 'Oil', ta: 'எண்ணெய்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Sugar dissolves in water and spreads evenly, forming a solution. Sand and stones sink; oil floats without dissolving.',
      ta: 'சர்க்கரை தண்ணீரில் கரைந்து சமமாகப் பரவி கரைசலை உருவாக்குகிறது. மணலும் கற்களும் அடியில் தங்குகின்றன; எண்ணெய் கரையாமல் மிதக்கிறது.',
    },
    hint: {
      en: 'Stir it into a glass of water and watch it disappear.',
      ta: 'ஒரு கிளாஸ் தண்ணீரில் கலக்கி மறைவதைப் பார்.',
    },
  },
  {
    id: 'chemf-105',
    subjectId: 'chemistry',
    pathwayId: 'chem-f-1',
    difficulty: 'intermediate',
    question: {
      en: 'Sand mixed with water can be separated by which method?',
      ta: 'தண்ணீருடன் கலந்த மணலை எந்த முறையில் பிரிக்கலாம்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Filtration', ta: 'வடிகட்டுதல்' } },
      { id: 'b', label: 'B', text: { en: 'Evaporation', ta: 'ஆவியாதல்' } },
      { id: 'c', label: 'C', text: { en: 'Melting', ta: 'உருகுதல்' } },
      { id: 'd', label: 'D', text: { en: 'Freezing', ta: 'உறைதல்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Filtration passes the mixture through filter paper — water passes through while sand is trapped on the paper.',
      ta: 'வடிகட்டுதலில் கலவை வடிகட்டி தாள் வழியே செலுத்தப்படுகிறது — நீர் ஊடுருவிச் செல்லும் அதே வேளையில் மணல் தாளில் தங்கிவிடுகிறது.',
    },
    hint: {
      en: 'Uses filter paper or a cloth.',
      ta: 'வடிகட்டி தாள் அல்லது துணியைப் பயன்படுத்துகிறது.',
    },
  },
  {
    id: 'chemf-106',
    subjectId: 'chemistry',
    pathwayId: 'chem-f-1',
    difficulty: 'intermediate',
    question: {
      en: 'When sugar dissolves in water, what happens to the sugar particles?',
      ta: 'சர்க்கரை தண்ணீரில் கரையும்போது சர்க்கரைத் துகள்களுக்கு என்ன நடக்கிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'They spread evenly through the water', ta: 'அவை தண்ணீர் முழுவதும் சமமாகப் பரவுகின்றன' } },
      { id: 'b', label: 'B', text: { en: 'They disappear completely', ta: 'அவை முற்றிலும் மறைந்துவிடுகின்றன' } },
      { id: 'c', label: 'C', text: { en: 'They sink to the bottom', ta: 'அவை அடியில் தங்குகின்றன' } },
      { id: 'd', label: 'D', text: { en: 'They turn into gas', ta: 'அவை வாயுவாக மாறுகின்றன' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'The sugar particles break into tiny pieces that spread evenly through the water, forming a uniform solution.',
      ta: 'சர்க்கரைத் துகள்கள் மிகச் சிறிய துகள்களாக உடைந்து தண்ணீர் முழுவதும் சமமாகப் பரவி ஒரே சீரான கரைசலை உருவாக்குகின்றன.',
    },
    hint: {
      en: 'Every sip of the sweet water tastes the same.',
      ta: 'இனிப்பு நீரின் ஒவ்வொரு மிடறும் ஒரே சுவையில் இருக்கும்.',
    },
  },
  {
    id: 'chemf-107',
    subjectId: 'chemistry',
    pathwayId: 'chem-f-1',
    difficulty: 'advanced',
    question: {
      en: 'To obtain salt from a salt-water solution, which method works best?',
      ta: 'உப்பு-நீர் கரைசலிலிருந்து உப்பைப் பெற எந்த முறை சிறந்தது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Evaporation', ta: 'ஆவியாதல்' } },
      { id: 'b', label: 'B', text: { en: 'Sieving', ta: 'சல்லடையிடுதல்' } },
      { id: 'c', label: 'C', text: { en: 'Hand-picking', ta: 'கைப்பறித்தல்' } },
      { id: 'd', label: 'D', text: { en: 'Magnetic separation', ta: 'காந்தப் பிரிப்பு' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Heating the solution evaporates the water and leaves the salt behind. Salt pans work on this principle.',
      ta: 'கரைசலைச் சூடாக்கும்போது நீர் ஆவியாகி உப்பு எஞ்சுகிறது. உப்புப் பாத்திகள் இந்தக் கொள்கையில் செயல்படுகின்றன.',
    },
    hint: {
      en: 'The same method used in coastal salt farms.',
      ta: 'கடலோர உப்பு பண்ணைகளில் பயன்படுத்தப்படும் முறை.',
    },
  },
  {
    id: 'chemf-108',
    subjectId: 'chemistry',
    pathwayId: 'chem-f-1',
    difficulty: 'advanced',
    question: {
      en: 'A mixture of rice grains and small stones can be separated by which simple method?',
      ta: 'அரிசி மணிகளும் சிறு கற்களும் கலந்த கலவையை எந்த எளிய முறையில் பிரிக்கலாம்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Hand-picking', ta: 'கைப்பறித்தல்' } },
      { id: 'b', label: 'B', text: { en: 'Evaporation', ta: 'ஆவியாதல்' } },
      { id: 'c', label: 'C', text: { en: 'Decantation', ta: 'வடித்தல் (மேல்நீர் வடித்தல்)' } },
      { id: 'd', label: 'D', text: { en: 'Condensation', ta: 'கருக்கட்டல்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Stones are bigger and different in colour, so they can be picked out by hand from the rice — the simplest separation method.',
      ta: 'கற்கள் பெரியவை, நிறத்தில் வேறுபட்டவை, எனவே அரிசியிலிருந்து கைகளால் பறித்து எடுக்கலாம் — இது எளிமையான பிரிப்பு முறை.',
    },
    hint: {
      en: 'What we do at home before cooking rice.',
      ta: 'வீட்டில் அரிசி சமைப்பதற்கு முன் நாம் செய்வது.',
    },
  },

  // ==================== chem-f-2 Acids, Bases & Salts ====================
  {
    id: 'chemf-201',
    subjectId: 'chemistry',
    pathwayId: 'chem-f-2',
    difficulty: 'beginner',
    question: {
      en: 'Lemon and orange taste sour. What do they contain?',
      ta: 'எலுமிச்சை மற்றும் ஆரஞ்சு புளிப்பாக இருக்கும். அவற்றில் எது உள்ளது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Acid', ta: 'அமிலம்' } },
      { id: 'b', label: 'B', text: { en: 'Base', ta: 'காரம்' } },
      { id: 'c', label: 'C', text: { en: 'Salt', ta: 'உப்பு' } },
      { id: 'd', label: 'D', text: { en: 'Sugar', ta: 'சர்க்கரை' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Citrus fruits contain citric acid, which gives them their sour taste.',
      ta: 'சிட்ரஸ் பழங்களில் சிட்ரிக் அமிலம் உள்ளது; அதுதான் அவற்றின் புளிப்புச் சுவைக்குக் காரணம்.',
    },
    hint: {
      en: 'Sour things usually contain this substance.',
      ta: 'புளிப்பு பொருட்களில் பொதுவாக இந்தப் பொருள் உள்ளது.',
    },
  },
  {
    id: 'chemf-202',
    subjectId: 'chemistry',
    pathwayId: 'chem-f-2',
    difficulty: 'beginner',
    question: {
      en: 'Soap and toothpaste are slippery to touch. They are examples of which substance?',
      ta: 'சோப்பும் பற்பசையும் வழுக்கலாக இருக்கும். அவை எந்தப் பொருளுக்கு எடுத்துக்காட்டு?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Base', ta: 'காரம்' } },
      { id: 'b', label: 'B', text: { en: 'Acid', ta: 'அமிலம்' } },
      { id: 'c', label: 'C', text: { en: 'Metal', ta: 'உலோகம்' } },
      { id: 'd', label: 'D', text: { en: 'Gas', ta: 'வாயு' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Soap and toothpaste are bases. Bases feel soapy or slippery and have a bitter taste.',
      ta: 'சோப்பும் பற்பசையும் காரங்கள். காரங்கள் சோப்பு போல வழுக்கலாக இருக்கும், கசப்புச் சுவை கொண்டவை.',
    },
    hint: {
      en: 'The opposite of an acid.',
      ta: 'அமிலத்திற்கு எதிரானது.',
    },
  },
  {
    id: 'chemf-203',
    subjectId: 'chemistry',
    pathwayId: 'chem-f-2',
    difficulty: 'beginner',
    question: {
      en: 'A natural indicator made from turmeric turns which colour in a base?',
      ta: 'மஞ்சளால் செய்யப்பட்ட இயற்கை குறிகாட்டி காரத்தில் எந்த நிறமாக மாறுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Red', ta: 'சிவப்பு' } },
      { id: 'b', label: 'B', text: { en: 'Blue', ta: 'நீலம்' } },
      { id: 'c', label: 'C', text: { en: 'Green', ta: 'பச்சை' } },
      { id: 'd', label: 'D', text: { en: 'Black', ta: 'கருப்பு' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Turmeric turns red in a basic solution and stays yellow in acids and neutral solutions. It is a natural indicator.',
      ta: 'மஞ்சள் காரக் கரைசலில் சிவப்பாக மாறுகிறது; அமிலங்களிலும் நடுநிலைக் கரைசல்களிலும் மஞ்சளாகவே இருக்கும். இது ஒரு இயற்கை குறிகாட்டி.',
    },
    hint: {
      en: 'The colour change seen when soap water touches a turmeric stain.',
      ta: 'மஞ்சள் கறையில் சோப்பு நீர் படும்போது காணப்படும் நிற மாற்றம்.',
    },
  },
  {
    id: 'chemf-204',
    subjectId: 'chemistry',
    pathwayId: 'chem-f-2',
    difficulty: 'intermediate',
    question: {
      en: 'Blue litmus paper turns red when dipped in which kind of solution?',
      ta: 'நீல லிட்மஸ் தாள் எந்த வகைக் கரைசலில் நனைக்கும்போது சிவப்பாக மாறுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Acidic solution', ta: 'அமிலக் கரைசல்' } },
      { id: 'b', label: 'B', text: { en: 'Basic solution', ta: 'காரக் கரைசல்' } },
      { id: 'c', label: 'C', text: { en: 'Neutral solution', ta: 'நடுநிலைக் கரைசல்' } },
      { id: 'd', label: 'D', text: { en: 'Salt solution', ta: 'உப்புக் கரைசல்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Blue litmus turns red in acids. Red litmus turns blue in bases. This is how litmus tests acids and bases.',
      ta: 'நீல லிட்மஸ் அமிலத்தில் சிவப்பாக மாறுகிறது. சிவப்பு லிட்மஸ் காரத்தில் நீலமாக மாறுகிறது. அமிலம்-காரத்தைச் சோதிக்கும் முறை இதுவே.',
    },
    hint: {
      en: 'Acids turn blue litmus to red.',
      ta: 'அமிலங்கள் நீல லிட்மஸை சிவப்பாக்குகின்றன.',
    },
  },
  {
    id: 'chemf-205',
    subjectId: 'chemistry',
    pathwayId: 'chem-f-2',
    difficulty: 'intermediate',
    question: {
      en: 'When an acid reacts with a base, what is formed?',
      ta: 'அமிலம் காரத்துடன் வினைபுரியும்போது என்ன உருவாகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Salt and water', ta: 'உப்பு மற்றும் நீர்' } },
      { id: 'b', label: 'B', text: { en: 'Only gas', ta: 'வாயு மட்டும்' } },
      { id: 'c', label: 'C', text: { en: 'Metal and oxygen', ta: 'உலோகம் மற்றும் ஆக்ஸிஜன்' } },
      { id: 'd', label: 'D', text: { en: 'Sugar and salt', ta: 'சர்க்கரை மற்றும் உப்பு' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Acid + Base → Salt + Water. This reaction is called neutralisation.',
      ta: 'அமிலம் + காரம் → உப்பு + நீர். இந்த வினை நடுநிலையாக்கல் (neutralisation) எனப்படும்.',
    },
    hint: {
      en: 'This reaction cancels out the properties of both.',
      ta: 'இந்த வினை இரண்டின் பண்புகளையும் நடுநிலைப்படுத்துகிறது.',
    },
  },
  {
    id: 'chemf-206',
    subjectId: 'chemistry',
    pathwayId: 'chem-f-2',
    difficulty: 'intermediate',
    question: {
      en: 'Which of these is a natural indicator?',
      ta: 'இவற்றில் எது இயற்கை குறிகாட்டி?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Turmeric', ta: 'மஞ்சள்' } },
      { id: 'b', label: 'B', text: { en: 'Table salt', ta: 'சமையல் உப்பு' } },
      { id: 'c', label: 'C', text: { en: 'Cooking oil', ta: 'சமையல் எண்ணெய்' } },
      { id: 'd', label: 'D', text: { en: 'Sugar', ta: 'சர்க்கரை' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Turmeric, red cabbage, and litmus from lichens are natural indicators that change colour in acids and bases.',
      ta: 'மஞ்சள், சிவப்பு முட்டைக்கோஸ், லைகன் மூலம் கிடைக்கும் லிட்மஸ் ஆகியவை அமிலங்களிலும் காரங்களிலும் நிறம் மாறும் இயற்கை குறிகாட்டிகள்.',
    },
    hint: {
      en: 'Found in the kitchen, it changes colour in soap water.',
      ta: 'சமையலறையில் கிடைக்கும் இது சோப்பு நீரில் நிறம் மாறுகிறது.',
    },
  },
  {
    id: 'chemf-207',
    subjectId: 'chemistry',
    pathwayId: 'chem-f-2',
    difficulty: 'advanced',
    question: {
      en: 'Stomach pain caused by too much acid is relieved by taking which substance?',
      ta: 'அதிக அமிலத்தால் ஏற்படும் வயிற்று வலி எந்தப் பொருளை உட்கொள்வதால் நீங்குகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Antacid (a base)', ta: 'ஆன்டாசிட் (ஒரு காரம்)' } },
      { id: 'b', label: 'B', text: { en: 'More acid', ta: 'மேலும் அமிலம்' } },
      { id: 'c', label: 'C', text: { en: 'Salt water', ta: 'உப்பு நீர்' } },
      { id: 'd', label: 'D', text: { en: 'Cooking oil', ta: 'சமையல் எண்ணெய்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'An antacid is a mild base that neutralises the excess acid in the stomach, giving relief.',
      ta: 'ஆன்டாசிட் ஒரு மென்மையான காரம்; இது வயிற்றில் உள்ள அதிகப்படியான அமிலத்தை நடுநிலையாக்கி நிவாரணம் அளிக்கிறது.',
    },
    hint: {
      en: 'It is the reverse — a base used to cancel the acid.',
      ta: 'இது எதிர்மறை — அமிலத்தை நடுநிலையாக்கப் பயன்படும் காரம்.',
    },
  },
  {
    id: 'chemf-208',
    subjectId: 'chemistry',
    pathwayId: 'chem-f-2',
    difficulty: 'advanced',
    question: {
      en: 'A solution with a pH value less than 7 is what kind of solution?',
      ta: '7-க்கும் குறைவான pH மதிப்பு கொண்ட கரைசல் எந்த வகையானது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Acidic', ta: 'அமிலத்தன்மை' } },
      { id: 'b', label: 'B', text: { en: 'Basic', ta: 'காரத்தன்மை' } },
      { id: 'c', label: 'C', text: { en: 'Neutral', ta: 'நடுநிலை' } },
      { id: 'd', label: 'D', text: { en: 'Metallic', ta: 'உலோகத்தன்மை' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'The pH scale runs from 0 to 14. Values below 7 are acidic, 7 is neutral, and above 7 is basic.',
      ta: 'pH அளவீடு 0 முதல் 14 வரை செல்கிறது. 7-க்குக் குறைவான மதிப்புகள் அமிலத்தன்மை, 7 நடுநிலை, 7-க்கு மேல் காரத்தன்மை.',
    },
    hint: {
      en: 'Lower numbers on the pH scale mean more acidic.',
      ta: 'pH அளவீட்டில் குறைந்த எண்கள் அதிக அமிலத்தன்மையைக் குறிக்கின்றன.',
    },
  },

  // ==================== chem-f-3 Air & Water Resources ====================
  {
    id: 'chemf-301',
    subjectId: 'chemistry',
    pathwayId: 'chem-f-3',
    difficulty: 'beginner',
    question: {
      en: 'Which gas do plants take in from the air for photosynthesis?',
      ta: 'ஒளிச்சேர்க்கைக்காக தாவரங்கள் காற்றிலிருந்து எந்த வாயுவை எடுத்துக்கொள்கின்றன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Carbon dioxide', ta: 'கார்பன் டை ஆக்சைடு' } },
      { id: 'b', label: 'B', text: { en: 'Oxygen', ta: 'ஆக்ஸிஜன்' } },
      { id: 'c', label: 'C', text: { en: 'Nitrogen', ta: 'நைட்ரஜன்' } },
      { id: 'd', label: 'D', text: { en: 'Hydrogen', ta: 'ஹைட்ரஜன்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Plants take in carbon dioxide from the air and release oxygen during photosynthesis.',
      ta: 'ஒளிச்சேர்க்கையின் போது தாவரங்கள் காற்றிலிருந்து கார்பன் டை ஆக்சைடை எடுத்து ஆக்ஸிஜனை வெளியிடுகின்றன.',
    },
    hint: {
      en: 'The gas we breathe out, which plants use.',
      ta: 'நாம் வெளியேற்றும் வாயு; அதை தாவரங்கள் பயன்படுத்துகின்றன.',
    },
  },
  {
    id: 'chemf-302',
    subjectId: 'chemistry',
    pathwayId: 'chem-f-3',
    difficulty: 'beginner',
    question: {
      en: 'Which gas makes up most of the air around us?',
      ta: 'நம்மைச் சுற்றியுள்ள காற்றில் அதிக அளவில் உள்ள வாயு எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Nitrogen', ta: 'நைட்ரஜன்' } },
      { id: 'b', label: 'B', text: { en: 'Oxygen', ta: 'ஆக்ஸிஜன்' } },
      { id: 'c', label: 'C', text: { en: 'Carbon dioxide', ta: 'கார்பன் டை ஆக்சைடு' } },
      { id: 'd', label: 'D', text: { en: 'Helium', ta: 'ஹீலியம்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Air is about 78% nitrogen and 21% oxygen. The rest includes carbon dioxide and other gases.',
      ta: 'காற்றில் சுமார் 78% நைட்ரஜனும் 21% ஆக்ஸிஜனும் உள்ளது. மீதம் கார்பன் டை ஆக்சைடு போன்ற வாயுக்கள்.',
    },
    hint: {
      en: 'It is the gas that fills balloons but does not support burning.',
      ta: 'பலூனை நிரப்பும் ஆனால் எரிப்பை ஆதரிக்காத வாயு.',
    },
  },
  {
    id: 'chemf-303',
    subjectId: 'chemistry',
    pathwayId: 'chem-f-3',
    difficulty: 'beginner',
    question: {
      en: 'Clouds form when water vapour in the air cools and changes into tiny drops. What is this process called?',
      ta: 'காற்றில் உள்ள நீராவி குளிர்ந்து சிறு துளிகளாக மாறும்போது மேகங்கள் உருவாகின்றன. இந்த செயல்முறை என்ன அழைக்கப்படுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Condensation', ta: 'கருக்கட்டல் (ஒடுக்கம்)' } },
      { id: 'b', label: 'B', text: { en: 'Evaporation', ta: 'ஆவியாதல்' } },
      { id: 'c', label: 'C', text: { en: 'Melting', ta: 'உருகுதல்' } },
      { id: 'd', label: 'D', text: { en: 'Freezing', ta: 'உறைதல்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Condensation is the change of water vapour (gas) into liquid water drops, forming clouds and dew.',
      ta: 'நீராவி (வாயு) நீர்த்துளிகளாக (நீர்மம்) மாறும் செயல்முறை கருக்கட்டல் (ஒடுக்கம்); இதனால் மேகங்களும் பனித்துளிகளும் உருவாகின்றன.',
    },
    hint: {
      en: 'The opposite of evaporation — gas becomes liquid.',
      ta: 'ஆவியாதலுக்கு எதிரானது — வாயு நீர்மமாகிறது.',
    },
  },
  {
    id: 'chemf-304',
    subjectId: 'chemistry',
    pathwayId: 'chem-f-3',
    difficulty: 'intermediate',
    question: {
      en: 'Which of these methods can purify dirty water at home?',
      ta: 'வீட்டில் அழுக்கு நீரைச் சுத்திகரிக்க இந்த முறைகளில் எது பயன்படும்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Boiling and filtering', ta: 'கொதிக்க வைத்து வடிகட்டுதல்' } },
      { id: 'b', label: 'B', text: { en: 'Adding more dirt', ta: 'மேலும் அழுக்கு சேர்த்தல்' } },
      { id: 'c', label: 'C', text: { en: 'Keeping it in sunlight for a minute', ta: 'ஒரு நிமிடம் வெயிலில் வைத்தல்' } },
      { id: 'd', label: 'D', text: { en: 'Freezing it', ta: 'அதை உறைய வைத்தல்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Filtering removes solid impurities and boiling kills germs, making water safe to drink.',
      ta: 'வடிகட்டுதல் திட அசுத்தங்களை நீக்குகிறது; கொதிக்க வைப்பது கிருமிகளை அழித்து தண்ணீரைக் குடிக்க பாதுகாப்பாக்குகிறது.',
    },
    hint: {
      en: 'Two simple steps: remove the dirt, then kill the germs.',
      ta: 'இரண்டு எளிய படிகள்: அழுக்கை நீக்கு, பின்னர் கிருமிகளை அழி.',
    },
  },
  {
    id: 'chemf-305',
    subjectId: 'chemistry',
    pathwayId: 'chem-f-3',
    difficulty: 'intermediate',
    question: {
      en: 'Rain, rivers, and seas are all part of which continuous natural cycle?',
      ta: 'மழை, ஆறுகள், கடல்கள் அனைத்தும் எந்த தொடர்ச்சியான இயற்கை சுழற்சியின் பகுதியாகும்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Water cycle', ta: 'நீர் சுழற்சி' } },
      { id: 'b', label: 'B', text: { en: 'Rock cycle', ta: 'பாறை சுழற்சி' } },
      { id: 'c', label: 'C', text: { en: 'Carbon cycle', ta: 'கார்பன் சுழற்சி' } },
      { id: 'd', label: 'D', text: { en: 'Day-night cycle', ta: 'பகல்-இரவு சுழற்சி' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'In the water cycle, water evaporates from seas and rivers, forms clouds, falls as rain, and flows back to the seas.',
      ta: 'நீர் சுழற்சியில், கடல் மற்றும் ஆறுகளிலிருந்து நீர் ஆவியாகி, மேகங்களாகி, மழையாகப் பொழிந்து, மீண்டும் கடல்களுக்கு ஓடுகிறது.',
    },
    hint: {
      en: 'The same water has been reused by nature for millions of years.',
      ta: 'மில்லியன் கணக்கான ஆண்டுகளாக அதே நீரை இயற்கை மீண்டும் பயன்படுத்துகிறது.',
    },
  },
  {
    id: 'chemf-306',
    subjectId: 'chemistry',
    pathwayId: 'chem-f-3',
    difficulty: 'intermediate',
    question: {
      en: 'Why is water essential for all living things?',
      ta: 'அனைத்து உயிரினங்களுக்கும் நீர் ஏன் அவசியம்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'It carries nutrients in the body and keeps cells alive', ta: 'இது உடலில் ஊட்டச்சத்துக்களை எடுத்துச் சென்று செல்களை உயிருடன் வைக்கிறது' } },
      { id: 'b', label: 'B', text: { en: 'It gives colour to plants', ta: 'இது தாவரங்களுக்கு நிறம் அளிக்கிறது' } },
      { id: 'c', label: 'C', text: { en: 'It makes food taste sweet', ta: 'இது உணவை இனிப்பாக்குகிறது' } },
      { id: 'd', label: 'D', text: { en: 'It helps clouds move', ta: 'இது மேகங்கள் நகர உதவுகிறது' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Water dissolves and carries nutrients, regulates body temperature, and is needed for all life processes.',
      ta: 'நீர் ஊட்டச்சத்துக்களை கரைத்து எடுத்துச் செல்கிறது, உடல் வெப்பநிலையை சீராக்குகிறது, அனைத்து உயிர் செயல்முறைகளுக்கும் தேவை.',
    },
    hint: {
      en: 'Around 70% of our body is made of it.',
      ta: 'நம் உடலில் சுமார் 70% இதனால் ஆனது.',
    },
  },
  {
    id: 'chemf-307',
    subjectId: 'chemistry',
    pathwayId: 'chem-f-3',
    difficulty: 'advanced',
    question: {
      en: 'A candle flame goes out when covered with a glass jar. Which gas is used up first, causing this?',
      ta: 'கண்ணாடி ஜாடியால் மூடும்போது மெழுகுவர்த்தி சுடர் அணைகிறது. இதற்கு முதலில் காரணமாகும் வாயு எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Oxygen', ta: 'ஆக்ஸிஜன்' } },
      { id: 'b', label: 'B', text: { en: 'Nitrogen', ta: 'நைட்ரஜன்' } },
      { id: 'c', label: 'C', text: { en: 'Carbon dioxide', ta: 'கார்பன் டை ஆக்சைடு' } },
      { id: 'd', label: 'D', text: { en: 'Helium', ta: 'ஹீலியம்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Fire needs oxygen to burn. When the jar cuts off the oxygen supply, the flame goes out.',
      ta: 'எரிய ஆக்ஸிஜன் தேவை. ஜாடி ஆக்ஸிஜன் விநியோகத்தை துண்டிக்கும்போது சுடர் அணைகிறது.',
    },
    hint: {
      en: 'Burning is a chemical reaction with this gas.',
      ta: 'எரிதல் என்பது இந்த வாயுவுடன் நடக்கும் வேதியியல் வினை.',
    },
  },
  {
    id: 'chemf-308',
    subjectId: 'chemistry',
    pathwayId: 'chem-f-3',
    difficulty: 'advanced',
    question: {
      en: 'Sea water is salty because it contains dissolved what?',
      ta: 'கடல் நீர் உப்பாக இருப்பதற்குக் காரணம் அதில் கரைந்துள்ள எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Salts and minerals', ta: 'உப்புகள் மற்றும் தாதுக்கள்' } },
      { id: 'b', label: 'B', text: { en: 'Only sand', ta: 'மணல் மட்டும்' } },
      { id: 'c', label: 'C', text: { en: 'Air bubbles', ta: 'காற்று குமிழ்கள்' } },
      { id: 'd', label: 'D', text: { en: 'Plastic particles', ta: 'பிளாஸ்டிக் துகள்கள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Rivers carry dissolved salts and minerals from the land into the sea. When water evaporates, the salts stay behind, making the sea salty.',
      ta: 'ஆறுகள் நிலத்திலிருந்து கரைந்த உப்புகளையும் தாதுக்களையும் கடலுக்கு எடுத்துச் செல்கின்றன. நீர் ஆவியாகும்போது உப்புகள் எஞ்சி, கடல் உப்பாகிறது.',
    },
    hint: {
      en: 'Rain water washes them off the land into rivers.',
      ta: 'மழைநீர் அவற்றை நிலத்திலிருந்து ஆறுகளுக்கு அடித்துச் செல்கிறது.',
    },
  },
];