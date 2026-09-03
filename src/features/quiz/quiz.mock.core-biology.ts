/**
 * Additional Core-Level Biology Questions (Classes 8–10)
 * Tops up existing core biology pathways to >= 8 questions each:
 * bio-c-1 (Cell Biology & Genetics), bio-c-2 (Life Processes in Organisms),
 * bio-c-3 (Ecology & Environment).
 */

import { QuizQuestion } from './quiz.types';

export const CORE_BIOLOGY_QUESTIONS: QuizQuestion[] = [
  // ==================== bio-c-1 (additions) ====================
  {
    id: 'bio-005',
    subjectId: 'biology',
    pathwayId: 'bio-c-1',
    difficulty: 'beginner',
    question: {
      en: 'What is called the basic structural and functional unit of life?',
      ta: 'வாழ்வின் அடிப்படை கட்டமைப்பு மற்றும் செயல்பாட்டு அலகு என்ன அழைக்கப்படுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Cell', ta: 'செல்' } },
      { id: 'b', label: 'B', text: { en: 'Tissue', ta: 'திசு' } },
      { id: 'c', label: 'C', text: { en: 'Organ', ta: 'உறுப்பு' } },
      { id: 'd', label: 'D', text: { en: 'Molecule', ta: 'மூலக்கூறு' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'The cell is the smallest unit of life. All living organisms are made of one or more cells.',
      ta: 'செல் வாழ்வின் மிகச் சிறிய அலகு. அனைத்து உயிரினங்களும் ஒன்று அல்லது பல செல்களால் ஆனவை.',
    },
    hint: {
      en: 'Robert Hooke first observed these in cork.',
      ta: 'ராபர்ட் ஹூக் கார்க்கில் முதலில் இவற்றைக் கண்டார்.',
    },
  },
  {
    id: 'bio-006',
    subjectId: 'biology',
    pathwayId: 'bio-c-1',
    difficulty: 'beginner',
    question: {
      en: 'Which part of the cell contains the genetic material (DNA) and controls cell activities?',
      ta: 'செல்லின் எந்தப் பகுதி மரபணுப் பொருளை (DNA) கொண்டு செல் செயல்பாடுகளைக் கட்டுப்படுத்துகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Nucleus', ta: 'உட்கரு' } },
      { id: 'b', label: 'B', text: { en: 'Ribosome', ta: 'ரைபோசோம்' } },
      { id: 'c', label: 'C', text: { en: 'Cell wall', ta: 'செல் சுவர்' } },
      { id: 'd', label: 'D', text: { en: 'Cytoplasm', ta: 'சைட்டோபிளாசம்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'The nucleus contains chromosomes with DNA and acts as the control centre of the cell.',
      ta: 'உட்கருவில் DNA கொண்ட குரோமோசோம்கள் உள்ளன; இது செல்லின் கட்டுப்பாட்டு மையமாக செயல்படுகிறது.',
    },
    hint: {
      en: 'The "brain" of the cell.',
      ta: 'செல்லின் "மூளை".',
    },
  },
  {
    id: 'bio-007',
    subjectId: 'biology',
    pathwayId: 'bio-c-1',
    difficulty: 'intermediate',
    question: {
      en: 'What is the main function of the cell membrane?',
      ta: 'செல் சவ்வின் முக்கிய செயல்பாடு என்ன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'It controls what enters and leaves the cell', ta: 'செல்லுக்குள் நுழைவதையும் வெளியே செல்வதையும் கட்டுப்படுத்துகிறது' } },
      { id: 'b', label: 'B', text: { en: 'It makes food for the cell', ta: 'செல்லுக்கு உணவு தயாரிக்கிறது' } },
      { id: 'c', label: 'C', text: { en: 'It stores water only', ta: 'நீரை மட்டும் சேமிக்கிறது' } },
      { id: 'd', label: 'D', text: { en: 'It produces energy', ta: 'ஆற்றலை உற்பத்தி செய்கிறது' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'The cell membrane is selectively permeable — it allows some substances to pass while keeping others out.',
      ta: 'செல் சவ்வு தேர்ந்தெடுக்கப்பட்ட ஊடுருவுத்தன்மை கொண்டது — சில பொருட்களை உள்ளே அனுமதித்து மற்றவற்றைத் தடுக்கிறது.',
    },
    hint: {
      en: 'It is the outer boundary of the cell (except plants have a wall outside it).',
      ta: 'இது செல்லின் வெளிப்புற எல்லை (தாவர செல்களில் இதற்கு வெளியே சுவர் உண்டு).',
    },
  },
  {
    id: 'bio-008',
    subjectId: 'biology',
    pathwayId: 'bio-c-1',
    difficulty: 'intermediate',
    question: {
      en: 'Thread-like structures in the nucleus that carry genes are called what?',
      ta: 'மரபணுக்களைச் சுமந்து செல்லும் உட்கருவிலுள்ள நூல் போன்ற அமைப்புகள் என்ன அழைக்கப்படுகின்றன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Chromosomes', ta: 'குரோமோசோம்கள்' } },
      { id: 'b', label: 'B', text: { en: 'Vacuoles', ta: 'சாற்றுப்பைகள்' } },
      { id: 'c', label: 'C', text: { en: 'Mitochondria', ta: 'மைட்டோகாண்ட்ரியா' } },
      { id: 'd', label: 'D', text: { en: 'Chloroplasts', ta: 'பசுங்கணிகங்கள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Chromosomes are thread-like structures in the nucleus made of DNA and proteins; they carry genes.',
      ta: 'குரோமோசோம்கள் உட்கருவில் உள்ள நூல் போன்ற அமைப்புகள்; DNA மற்றும் புரதங்களால் ஆனவை; மரபணுக்களைச் சுமக்கின்றன.',
    },
    hint: {
      en: 'Their number is fixed for each species (humans have 46).',
      ta: 'ஒவ்வொரு இனத்திற்கும் இதன் எண்ணிக்கை நிலையானது (மனிதருக்கு 46).',
    },
  },
  {
    id: 'bio-009',
    subjectId: 'biology',
    pathwayId: 'bio-c-1',
    difficulty: 'advanced',
    question: {
      en: 'Mitosis results in how many daughter cells?',
      ta: 'மைட்டோசிஸ் (இழைப்பிரிவு) எத்தனை மகள் செல்களை உருவாக்குகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Two identical daughter cells', ta: 'இரண்டு ஒத்த மகள் செல்கள்' } },
      { id: 'b', label: 'B', text: { en: 'Four different cells', ta: 'நான்கு வெவ்வேறு செல்கள்' } },
      { id: 'c', label: 'C', text: { en: 'Two different cells', ta: 'இரண்டு வெவ்வேறு செல்கள்' } },
      { id: 'd', label: 'D', text: { en: 'Eight cells', ta: 'எட்டு செல்கள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Mitosis produces two genetically identical daughter cells with the same chromosome number — used for growth and repair.',
      ta: 'மைட்டோசிஸ் ஒரே குரோமோசோம் எண்ணிக்கை கொண்ட இரண்டு மரபணு ஒத்த மகள் செல்களை உருவாக்குகிறது — வளர்ச்சி மற்றும் பழுதுபார்ப்புக்கு பயன்படுகிறது.',
    },
    hint: {
      en: 'One cell divides into two identical copies.',
      ta: 'ஒரு செல் இரண்டு ஒத்த பிரதிகளாக பிரிகிறது.',
    },
  },
  {
    id: 'bio-010',
    subjectId: 'biology',
    pathwayId: 'bio-c-1',
    difficulty: 'advanced',
    question: {
      en: 'What does DNA stand for?',
      ta: 'DNA எதன் சுருக்கம்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Deoxyribonucleic acid', ta: 'டியோக்சிரைபோ நியூக்ளிக் அமிலம்' } },
      { id: 'b', label: 'B', text: { en: 'Dinucleic acid', ta: 'டைநியூக்ளிக் அமிலம்' } },
      { id: 'c', label: 'C', text: { en: 'Deoxyribose nitrogen acid', ta: 'டியோக்சிரைபோஸ் நைட்ரஜன் அமிலம்' } },
      { id: 'd', label: 'D', text: { en: 'Digital nucleic acid', ta: 'டிஜிட்டல் நியூக்ளிக் அமிலம்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'DNA (deoxyribonucleic acid) carries the genetic instructions for the development and functioning of all living organisms.',
      ta: 'DNA (டியோக்சிரைபோ நியூக்ளிக் அமிலம்) அனைத்து உயிரினங்களின் வளர்ச்சி மற்றும் செயல்பாட்டுக்கான மரபணு வழிமுறைகளைச் சுமக்கிறது.',
    },
    hint: {
      en: 'The molecule shaped like a double helix.',
      ta: 'இரட்டைச் சுருளி வடிவ மூலக்கூறு.',
    },
  },

  // ==================== bio-c-2 (additions) ====================
  {
    id: 'bio-011',
    subjectId: 'biology',
    pathwayId: 'bio-c-2',
    difficulty: 'beginner',
    question: {
      en: 'The process by which organisms take in oxygen and release carbon dioxide to release energy is called what?',
      ta: 'உயிரினங்கள் ஆக்ஸிஜனை எடுத்து கார்பன் டை ஆக்சைடை வெளியிட்டு ஆற்றலை வெளிப்படுத்தும் செயல்முறை என்ன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Respiration', ta: 'சுவாசம் (மூச்சுவிடல்)' } },
      { id: 'b', label: 'B', text: { en: 'Digestion', ta: 'செரிமானம்' } },
      { id: 'c', label: 'C', text: { en: 'Excretion', ta: 'கழிவுநீக்கம்' } },
      { id: 'd', label: 'D', text: { en: 'Photosynthesis', ta: 'ஒளிச்சேர்க்கை' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Respiration breaks down glucose with oxygen to release energy, producing carbon dioxide and water.',
      ta: 'சுவாசம் ஆக்ஸிஜனுடன் குளுக்கோஸை உடைத்து ஆற்றலை வெளியிடுகிறது; கார்பன் டை ஆக்சைடும் நீரும் உருவாகின்றன.',
    },
    hint: {
      en: 'It happens with every breath you take.',
      ta: 'நீங்கள் எடுக்கும் ஒவ்வொரு மூச்சிலும் இது நடக்கிறது.',
    },
  },
  {
    id: 'bio-012',
    subjectId: 'biology',
    pathwayId: 'bio-c-2',
    difficulty: 'beginner',
    question: {
      en: 'Which organs remove nitrogenous waste (urea) from the blood?',
      ta: 'இரத்தத்திலிருந்து நைட்ரஜன் கழிவுகளை (யூரியா) நீக்கும் உறுப்புகள் எவை?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Kidneys', ta: 'சிறுநீரகங்கள்' } },
      { id: 'b', label: 'B', text: { en: 'Lungs', ta: 'நுரையீரல்கள்' } },
      { id: 'c', label: 'C', text: { en: 'Heart', ta: 'இதயம்' } },
      { id: 'd', label: 'D', text: { en: 'Eyes', ta: 'கண்கள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'The kidneys filter urea and excess water from the blood to form urine — the body\'s excretory organs.',
      ta: 'சிறுநீரகங்கள் இரத்தத்திலிருந்து யூரியா மற்றும் அதிகப்படியான நீரை வடிகட்டி சிறுநீரை உருவாக்குகின்றன — உடலின் கழிவு நீக்க உறுப்புகள்.',
    },
    hint: {
      en: 'Bean-shaped organs in the lower back.',
      ta: 'இடுப்புப் பகுதியில் உள்ள அவரை வடிவ உறுப்புகள்.',
    },
  },
  {
    id: 'bio-013',
    subjectId: 'biology',
    pathwayId: 'bio-c-2',
    difficulty: 'intermediate',
    question: {
      en: 'Which blood cells fight infections by attacking germs?',
      ta: 'எந்த இரத்த செல்கள் கிருமிகளைத் தாக்கி தொற்றுகளை எதிர்க்கின்றன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'White blood cells', ta: 'வெள்ளை இரத்த அணுக்கள்' } },
      { id: 'b', label: 'B', text: { en: 'Red blood cells', ta: 'சிவப்பு இரத்த அணுக்கள்' } },
      { id: 'c', label: 'C', text: { en: 'Platelets', ta: 'இரத்தத் தட்டுகள்' } },
      { id: 'd', label: 'D', text: { en: 'Plasma cells', ta: 'பிளாஸ்மா செல்கள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'White blood cells (WBCs) are the defence cells of the body — they destroy disease-causing germs.',
      ta: 'வெள்ளை இரத்த அணுக்கள் (WBC) உடலின் பாதுகாப்பு செல்கள் — நோய் உண்டாக்கும் கிருமிகளை அழிக்கின்றன.',
    },
    hint: {
      en: 'Their number increases during infection.',
      ta: 'தொற்றுநோய் காலத்தில் இவற்றின் எண்ணிக்கை அதிகரிக்கும்.',
    },
  },
  {
    id: 'bio-014',
    subjectId: 'biology',
    pathwayId: 'bio-c-2',
    difficulty: 'intermediate',
    question: {
      en: 'How many chambers does the human heart have?',
      ta: 'மனித இதயத்தில் எத்தனை அறைகள் உள்ளன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Four chambers', ta: 'நான்கு அறைகள்' } },
      { id: 'b', label: 'B', text: { en: 'Two chambers', ta: 'இரண்டு அறைகள்' } },
      { id: 'c', label: 'C', text: { en: 'Three chambers', ta: 'மூன்று அறைகள்' } },
      { id: 'd', label: 'D', text: { en: 'Five chambers', ta: 'ஐந்து அறைகள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'The human heart has four chambers: two atria (upper) and two ventricles (lower).',
      ta: 'மனித இதயத்தில் நான்கு அறைகள் உள்ளன: இரண்டு ஏட்ரியா (மேல்) மற்றும் இரண்டு வென்ட்ரிக்கிள்கள் (கீழ்).',
    },
    hint: {
      en: 'Two upper and two lower chambers.',
      ta: 'இரண்டு மேல் மற்றும் இரண்டு கீழ் அறைகள்.',
    },
  },
  {
    id: 'bio-015',
    subjectId: 'biology',
    pathwayId: 'bio-c-2',
    difficulty: 'intermediate',
    question: {
      en: 'Which plant tissue transports water and minerals from roots to leaves?',
      ta: 'வேர்களிலிருந்து இலைகளுக்கு நீரையும் தாதுக்களையும் எடுத்துச் செல்லும் தாவரத் திசு எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Xylem', ta: 'சைலம்' } },
      { id: 'b', label: 'B', text: { en: 'Phloem', ta: 'புளோயம்' } },
      { id: 'c', label: 'C', text: { en: 'Epidermis', ta: 'மேல்தோல்' } },
      { id: 'd', label: 'D', text: { en: 'Cambium', ta: 'காம்பியம்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Xylem carries water and dissolved minerals upward; phloem carries food made in leaves to other parts.',
      ta: 'சைலம் நீரையும் கரைந்த தாதுக்களையும் மேல்நோக்கி எடுத்துச் செல்கிறது; புளோயம் இலைகளில் தயாராகும் உணவை மற்ற பகுதிகளுக்கு கொண்டு செல்கிறது.',
    },
    hint: {
      en: 'Water-conducting tubes of plants.',
      ta: 'தாவரங்களின் நீர்க்கடத்து குழாய்கள்.',
    },
  },
  {
    id: 'bio-016',
    subjectId: 'biology',
    pathwayId: 'bio-c-2',
    difficulty: 'advanced',
    question: {
      en: 'In which cell organelle does photosynthesis take place?',
      ta: 'ஒளிச்சேர்க்கை எந்த செல் உறுப்பில் நடைபெறுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Chloroplast', ta: 'பசுங்கணிகம்' } },
      { id: 'b', label: 'B', text: { en: 'Mitochondrion', ta: 'மைட்டோகாண்ட்ரியன்' } },
      { id: 'c', label: 'C', text: { en: 'Nucleus', ta: 'உட்கரு' } },
      { id: 'd', label: 'D', text: { en: 'Ribosome', ta: 'ரைபோசோம்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Chloroplasts contain chlorophyll and are the sites of photosynthesis in plant cells.',
      ta: 'பசுங்கணிகங்களில் குளோரோபில் உள்ளது; தாவர செல்களில் ஒளிச்சேர்க்கை நடக்கும் இடங்கள் இவை.',
    },
    hint: {
      en: 'Only plant cells have this green organelle.',
      ta: 'தாவர செல்களில் மட்டும் உள்ள பச்சை உறுப்பு.',
    },
  },
  {
    id: 'bio-017',
    subjectId: 'biology',
    pathwayId: 'bio-c-2',
    difficulty: 'advanced',
    question: {
      en: 'Why does our breathing rate increase during exercise?',
      ta: 'உடற்பயிற்சியின் போது நம் மூச்சுவிடும் வீதம் ஏன் அதிகரிக்கிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Muscles need more oxygen to release energy', ta: 'ஆற்றலை வெளியிட தசைகளுக்கு அதிக ஆக்ஸிஜன் தேவை' } },
      { id: 'b', label: 'B', text: { en: 'To cool the body down', ta: 'உடலை குளிர்விக்க' } },
      { id: 'c', label: 'C', text: { en: 'To digest food faster', ta: 'உணவு வேகமாக செரிக்க' } },
      { id: 'd', label: 'D', text: { en: 'To produce more blood', ta: 'அதிக இரத்தம் உற்பத்தி செய்ய' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Exercising muscles use more energy, so they need more oxygen for respiration — we breathe faster to take it in.',
      ta: 'உடற்பயிற்சி செய்யும் தசைகள் அதிக ஆற்றலைப் பயன்படுத்துகின்றன, எனவே சுவாசத்திற்கு அதிக ஆக்ஸிஜன் தேவை — அதை எடுக்க நாம் வேகமாக மூச்சு விடுகிறோம்.',
    },
    hint: {
      en: 'Energy release needs oxygen.',
      ta: 'ஆற்றல் வெளியீட்டிற்கு ஆக்ஸிஜன் தேவை.',
    },
  },

  // ==================== bio-c-3 (additions) ====================
  {
    id: 'bio-018',
    subjectId: 'biology',
    pathwayId: 'bio-c-3',
    difficulty: 'beginner',
    question: {
      en: 'In a food chain, which organisms are always the producers?',
      ta: 'உணவுச் சங்கிலியில் எப்போதும் உற்பத்தியாளர்களாக இருப்பவை எவை?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Green plants', ta: 'பச்சை தாவரங்கள்' } },
      { id: 'b', label: 'B', text: { en: 'Herbivores', ta: 'தாவர உண்ணிகள்' } },
      { id: 'c', label: 'C', text: { en: 'Carnivores', ta: 'ஊனுண்ணிகள்' } },
      { id: 'd', label: 'D', text: { en: 'Decomposers', ta: 'சிதைப்பிகள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Green plants make their own food by photosynthesis, so they are the producers at the start of every food chain.',
      ta: 'பச்சை தாவரங்கள் ஒளிச்சேர்க்கையால் தங்கள் உணவைத் தயாரிக்கின்றன, எனவே ஒவ்வொரு உணவுச் சங்கிலியின் தொடக்கத்தில் அவை உற்பத்தியாளர்கள்.',
    },
    hint: {
      en: 'They make food from sunlight.',
      ta: 'சூரிய ஒளியிலிருந்து உணவைத் தயாரிப்பவை.',
    },
  },
  {
    id: 'bio-019',
    subjectId: 'biology',
    pathwayId: 'bio-c-3',
    difficulty: 'beginner',
    question: {
      en: 'Animals that eat only plants are called what?',
      ta: 'தாவரங்களை மட்டும் உண்ணும் விலங்குகள் என்ன அழைக்கப்படுகின்றன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Herbivores', ta: 'தாவர உண்ணிகள்' } },
      { id: 'b', label: 'B', text: { en: 'Carnivores', ta: 'ஊனுண்ணிகள்' } },
      { id: 'c', label: 'C', text: { en: 'Omnivores', ta: 'அனைத்துண்ணிகள்' } },
      { id: 'd', label: 'D', text: { en: 'Scavengers', ta: 'பிணந்தின்னிகள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Herbivores like cows and deer eat only plants. Carnivores eat animals; omnivores eat both.',
      ta: 'மாடு, மான் போன்ற தாவர உண்ணிகள் தாவரங்களை மட்டுமே உண்கின்றன. ஊனுண்ணிகள் விலங்குகளை உண்கின்றன; அனைத்துண்ணிகள் இரண்டையும் உண்கின்றன.',
    },
    hint: {
      en: 'From the Latin for "plant eater".',
      ta: '"தாவர உண்ணி" என்ற இலத்தீன் சொல்லிலிருந்து.',
    },
  },
  {
    id: 'bio-020',
    subjectId: 'biology',
    pathwayId: 'bio-c-3',
    difficulty: 'intermediate',
    question: {
      en: 'Which of these is a correct example of a food chain?',
      ta: 'இவற்றில் எது சரியான உணவுச் சங்கிலிக்கு எடுத்துக்காட்டு?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Grass → Rabbit → Fox', ta: 'புல் → முயல் → நரி' } },
      { id: 'b', label: 'B', text: { en: 'Fox → Grass → Rabbit', ta: 'நரி → புல் → முயல்' } },
      { id: 'c', label: 'C', text: { en: 'Rabbit → Fox → Grass', ta: 'முயல் → நரி → புல்' } },
      { id: 'd', label: 'D', text: { en: 'Grass → Fox → Rabbit', ta: 'புல் → நரி → முயல்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'A food chain shows energy flow: producers (grass) → herbivores (rabbit) → carnivores (fox).',
      ta: 'உணவுச் சங்கிலி ஆற்றல் ஓட்டத்தைக் காட்டுகிறது: உற்பத்தியாளர் (புல்) → தாவர உண்ணி (முயல்) → ஊனுண்ணி (நரி).',
    },
    hint: {
      en: 'Energy always flows from plants upward.',
      ta: 'ஆற்றல் எப்போதும் தாவரங்களிலிருந்து மேல்நோக்கி ஓடுகிறது.',
    },
  },
  {
    id: 'bio-021',
    subjectId: 'biology',
    pathwayId: 'bio-c-3',
    difficulty: 'intermediate',
    question: {
      en: 'Mass deforestation (cutting down forests) directly leads to what?',
      ta: 'பெருமளவு காடழிப்பு நேரடியாக எதற்கு வழிவகுக்கிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Less oxygen and loss of animal habitats', ta: 'குறைந்த ஆக்ஸிஜன் மற்றும் விலங்குகளின் வாழிட இழப்பு' } },
      { id: 'b', label: 'B', text: { en: 'More rainfall everywhere', ta: 'எங்கும் அதிக மழை' } },
      { id: 'c', label: 'C', text: { en: 'More clean air', ta: 'அதிக தூய்மையான காற்று' } },
      { id: 'd', label: 'D', text: { en: 'Cooler climate', ta: 'குளிர்ந்த காலநிலை' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Trees release oxygen and provide habitats. Deforestation reduces oxygen, causes soil erosion, and destroys homes of wildlife.',
      ta: 'மரங்கள் ஆக்ஸிஜனை வெளியிட்டு வாழிடங்களை அளிக்கின்றன. காடழிப்பு ஆக்ஸிஜனைக் குறைத்து, மண் அரிப்பை ஏற்படுத்தி, வனவிலங்குகளின் வாழிடங்களை அழிக்கிறது.',
    },
    hint: {
      en: 'Think of the many services forests give us.',
      ta: 'காடுகள் நமக்கு அளிக்கும் பல சேவைகளை நினைக்கவும்.',
    },
  },
  {
    id: 'bio-022',
    subjectId: 'biology',
    pathwayId: 'bio-c-3',
    difficulty: 'intermediate',
    question: {
      en: 'June 5th is celebrated as which day?',
      ta: 'ஜூன் 5-ஆம் தேதி எந்த நாளாக கொண்டாடப்படுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'World Environment Day', ta: 'உலக சுற்றுச்சூழல் தினம்' } },
      { id: 'b', label: 'B', text: { en: 'World Health Day', ta: 'உலக சுகாதார தினம்' } },
      { id: 'c', label: 'C', text: { en: 'World Water Day', ta: 'உலக நீர் தினம்' } },
      { id: 'd', label: 'D', text: { en: 'Earth Hour', ta: 'புவி மணி நேரம்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'World Environment Day is celebrated on June 5 every year to encourage environmental protection.',
      ta: 'சுற்றுச்சூழல் பாதுகாப்பை ஊக்குவிக்க ஒவ்வொரு ஆண்டும் ஜூன் 5-இல் உலக சுற்றுச்சூழல் தினம் கொண்டாடப்படுகிறது.',
    },
    hint: {
      en: 'A United Nations day for protecting nature.',
      ta: 'இயற்கையைப் பாதுகாக்கும் ஐ.நா. தினம்.',
    },
  },
  {
    id: 'bio-023',
    subjectId: 'biology',
    pathwayId: 'bio-c-3',
    difficulty: 'advanced',
    question: {
      en: 'Decomposers like bacteria and fungi play which important role in an ecosystem?',
      ta: 'பாக்டீரியா மற்றும் பூஞ்சை போன்ற சிதைப்பிகள் சூழலமைப்பில் எந்த முக்கிய பங்கு வகிக்கின்றன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'They break down dead organisms and recycle nutrients', ta: 'இறந்த உயிரினங்களைச் சிதைத்து ஊட்டச்சத்துக்களை மறுசுழற்சி செய்கின்றன' } },
      { id: 'b', label: 'B', text: { en: 'They make food from sunlight', ta: 'சூரிய ஒளியிலிருந்து உணவு தயாரிக்கின்றன' } },
      { id: 'c', label: 'C', text: { en: 'They eat live plants only', ta: 'வாழும் தாவரங்களை மட்டும் உண்கின்றன' } },
      { id: 'd', label: 'D', text: { en: 'They produce oxygen', ta: 'ஆக்ஸிஜனை உற்பத்தி செய்கின்றன' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Decomposers break down dead plants and animals into simple substances, returning nutrients to the soil.',
      ta: 'சிதைப்பிகள் இறந்த தாவரங்களையும் விலங்குகளையும் எளிய பொருட்களாக உடைத்து, ஊட்டச்சத்துக்களை மண்ணுக்கு திருப்பித் தருகின்றன.',
    },
    hint: {
      en: 'They clean up dead matter and recycle it.',
      ta: 'இறந்த பொருட்களை சுத்தம் செய்து மறுசுழற்சி செய்கின்றன.',
    },
  },
  {
    id: 'bio-024',
    subjectId: 'biology',
    pathwayId: 'bio-c-3',
    difficulty: 'advanced',
    question: {
      en: 'Areas where endangered animals are legally protected are called what?',
      ta: 'அழியும் நிலையில் உள்ள விலங்குகள் சட்டப்பூர்வமாக பாதுகாக்கப்படும் பகுதிகள் என்ன அழைக்கப்படுகின்றன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Wildlife sanctuaries and national parks', ta: 'வனவிலங்கு சரணாலயங்கள் மற்றும் தேசிய பூங்காக்கள்' } },
      { id: 'b', label: 'B', text: { en: 'Industrial zones', ta: 'தொழிற்பேட்டைகள்' } },
      { id: 'c', label: 'C', text: { en: 'Shopping districts', ta: 'வணிக பகுதிகள்' } },
      { id: 'd', label: 'D', text: { en: 'Farming lands', ta: 'விவசாய நிலங்கள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Wildlife sanctuaries and national parks protect animals and plants in their natural habitats. India has many, like Mudumalai and Kanha.',
      ta: 'வனவிலங்கு சரணாலயங்கள் மற்றும் தேசிய பூங்காக்கள் விலங்குகளையும் தாவரங்களையும் அவற்றின் இயற்கை வாழிடங்களில் பாதுகாக்கின்றன. முதுமலை, கான்ஹா போன்றவை இந்தியாவில் உள்ளன.',
    },
    hint: {
      en: 'Protected natural homes for wild animals.',
      ta: 'காட்டு விலங்குகளுக்கான பாதுகாக்கப்பட்ட இயற்கை வாழிடங்கள்.',
    },
  },
];