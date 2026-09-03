/**
 * Advanced-Level Biology Questions (Classes 11–12)
 * Grade-appropriate bilingual questions for bio-a-1 (Botany & Plant
 * Physiology), bio-a-2 (Zoology & Human Physiology), and bio-a-3
 * (Genetics & Biotechnology).
 */

import { QuizQuestion } from './quiz.types';

export const ADVANCED_BIOLOGY_QUESTIONS: QuizQuestion[] = [
  // ==================== bio-a-1 Botany & Plant Physiology ====================
  {
    id: 'bioa-101',
    subjectId: 'biology',
    pathwayId: 'bio-a-1',
    difficulty: 'beginner',
    question: {
      en: 'Root hairs absorb minerals from the soil mainly by which process?',
      ta: 'வேர் மயிர்கள் மண்ணிலிருந்து தாதுக்களை முக்கியமாக எந்த செயல்முறையால் உறிஞ்சுகின்றன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Active transport', ta: 'செயல்மிக்க போக்குவரத்து' } },
      { id: 'b', label: 'B', text: { en: 'Simple diffusion only', ta: 'எளிய பரவல் மட்டும்' } },
      { id: 'c', label: 'C', text: { en: 'Photosynthesis', ta: 'ஒளிச்சேர்க்கை' } },
      { id: 'd', label: 'D', text: { en: 'Transpiration pull only', ta: 'ஆவியுயிர்ப்பு இழுவை மட்டும்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Minerals are often present at lower concentrations inside the root than outside, so root hairs use active transport (with energy from ATP) to absorb them.',
      ta: 'வேர்க்குள்ளும் வெளியேயும் ஒப்பிடும்போது தாதுக்கள் வேர்க்குள் குறைந்த செறிவில் இருப்பதால், வேர் மயிர்கள் அவற்றை உறிஞ்ச செயல்மிக்க போக்குவரத்தை (ATP ஆற்றலுடன்) பயன்படுத்துகின்றன.',
    },
    hint: {
      en: 'It uses energy to move minerals against the concentration gradient.',
      ta: 'செறிவு சாய்வுக்கு எதிராக தாதுக்களை நகர்த்த ஆற்றலைப் பயன்படுத்துகிறது.',
    },
  },
  {
    id: 'bioa-102',
    subjectId: 'biology',
    pathwayId: 'bio-a-1',
    difficulty: 'beginner',
    question: {
      en: 'Most of the transpiration in plants occurs through which structure?',
      ta: 'தாவரங்களில் பெரும்பாலான ஆவியுயிர்ப்பு எந்த அமைப்பு வழியே நடைபெறுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Stomata on leaves', ta: 'இலைகளில் உள்ள ஸ்டோமாட்டா' } },
      { id: 'b', label: 'B', text: { en: 'Root hairs', ta: 'வேர் மயிர்கள்' } },
      { id: 'c', label: 'C', text: { en: 'Flowers only', ta: 'பூக்கள் மட்டும்' } },
      { id: 'd', label: 'D', text: { en: 'Seeds', ta: 'விதைகள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Stomata — tiny pores on leaves — are the main sites of transpiration, losing water vapour while allowing gas exchange.',
      ta: 'இலைகளில் உள்ள நுண் துளைகளான ஸ்டோமாட்டா தான் ஆவியுயிர்ப்பின் முக்கிய இடங்கள்; வாயு பரிமாற்றத்தை அனுமதிக்கும்போது நீராவியை இழக்கின்றன.',
    },
    hint: {
      en: 'Tiny pores mostly on the lower leaf surface.',
      ta: 'பெரும்பாலும் இலையின் அடிப்பரப்பில் உள்ள நுண் துளைகள்.',
    },
  },
  {
    id: 'bioa-103',
    subjectId: 'biology',
    pathwayId: 'bio-a-1',
    difficulty: 'intermediate',
    question: {
      en: 'Which plant hormone promotes cell elongation and growth?',
      ta: 'செல் நீட்சியையும் வளர்ச்சியையும் ஊக்குவிக்கும் தாவர இயக்குநீர் எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Auxin', ta: 'ஆக்சின்' } },
      { id: 'b', label: 'B', text: { en: 'Abscisic acid', ta: 'அப்சிசிக் அமிலம்' } },
      { id: 'c', label: 'C', text: { en: 'Ethylene', ta: 'எத்திலீன்' } },
      { id: 'd', label: 'D', text: { en: 'Cytokinin', ta: 'சைட்டோகைனின்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Auxin promotes cell elongation, apical dominance, and phototropism (bending towards light).',
      ta: 'ஆக்சின் செல் நீட்சி, உச்சி மேலாதிக்கம், ஒளிநோக்கு இயக்கம் (ஒளியை நோக்கி வளைதல்) ஆகியவற்றை ஊக்குவிக்கிறது.',
    },
    hint: {
      en: 'It makes shoots bend towards sunlight.',
      ta: 'தண்டுகள் சூரிய ஒளியை நோக்கி வளைவதற்கு காரணம்.',
    },
  },
  {
    id: 'bioa-104',
    subjectId: 'biology',
    pathwayId: 'bio-a-1',
    difficulty: 'intermediate',
    question: {
      en: 'CAM plants (like cactus and pineapple) are specially adapted to what?',
      ta: 'CAM தாவரங்கள் (கள்ளி, அன்னாசி போன்றவை) எதற்காக சிறப்பாக தகவமைந்துள்ளன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Hot, dry conditions with scarce water', ta: 'வெப்பமான, வறண்ட, நீர் பற்றாக்குறை சூழ்நிலைகள்' } },
      { id: 'b', label: 'B', text: { en: 'Very cold climates', ta: 'மிக குளிர்ந்த காலநிலைகள்' } },
      { id: 'c', label: 'C', text: { en: 'Waterlogged soil', ta: 'நீர் தேங்கிய மண்' } },
      { id: 'd', label: 'D', text: { en: 'Low light at night', ta: 'இரவில் குறைந்த ஒளி' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'CAM plants open their stomata at night to fix CO₂, storing it as malic acid for daytime photosynthesis — this reduces water loss in dry habitats.',
      ta: 'CAM தாவரங்கள் இரவில் ஸ்டோமாட்டாவைத் திறந்து CO₂-ஐ நிலைநிறுத்தி, பகல்நேர ஒளிச்சேர்க்கைக்காக மாலிக் அமிலமாக சேமிக்கின்றன — வறண்ட வாழிடங்களில் நீர் இழப்பைக் குறைக்கிறது.',
    },
    hint: {
      en: 'They photosynthesise "the dry way".',
      ta: 'அவை "வறண்ட வழியில்" ஒளிச்சேர்க்கை செய்கின்றன.',
    },
  },
  {
    id: 'bioa-105',
    subjectId: 'biology',
    pathwayId: 'bio-a-1',
    difficulty: 'intermediate',
    question: {
      en: 'A vascular bundle in plants contains xylem and which other tissue?',
      ta: 'தாவரங்களில் கடத்தும் திசுத்தொகுப்பில் (vascular bundle) சைலம் மற்றும் எந்த திசு உள்ளது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Phloem', ta: 'புளோயம்' } },
      { id: 'b', label: 'B', text: { en: 'Epidermis', ta: 'மேல்தோல்' } },
      { id: 'c', label: 'C', text: { en: 'Cortex', ta: 'புறணி' } },
      { id: 'd', label: 'D', text: { en: 'Pith', ta: 'மையப்பகுதி' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Vascular bundles are made of xylem (water transport) and phloem (food transport), running through stems and roots.',
      ta: 'கடத்தும் திசுத்தொகுப்புகள் சைலம் (நீர் கடத்தல்) மற்றும் புளோயம் (உணவு கடத்தல்) ஆகியவற்றால் ஆனவை; தண்டுகள் மற்றும் வேர்களில் செல்கின்றன.',
    },
    hint: {
      en: 'The two conducting tissues together.',
      ta: 'இரண்டு கடத்தும் திசுக்கள் இணைந்தவை.',
    },
  },
  {
    id: 'bioa-106',
    subjectId: 'biology',
    pathwayId: 'bio-a-1',
    difficulty: 'advanced',
    question: {
      en: 'C₄ plants (like maize and sugarcane) are distinguished by which anatomical feature?',
      ta: 'C₄ தாவரங்கள் (சோளம், கரும்பு போன்றவை) எந்த உடற்கூறியல் அம்சத்தால் வேறுபடுகின்றன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Kranz anatomy with a bundle sheath', ta: 'திசுத்தொகுப்பு உறை கொண்ட கிரான்ஸ் அமைப்பு' } },
      { id: 'b', label: 'B', text: { en: 'No stomata at all', ta: 'ஸ்டோமாட்டா இல்லாதது' } },
      { id: 'c', label: 'C', text: { en: 'Single-celled leaves', ta: 'ஒற்றை செல் இலைகள்' } },
      { id: 'd', label: 'D', text: { en: 'Roots above the ground', ta: 'நிலத்திற்கு மேல் வேர்கள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'C₄ plants show Kranz anatomy — large bundle-sheath cells surrounding vascular bundles, which helps concentrate CO₂ for efficient photosynthesis.',
      ta: 'C₄ தாவரங்கள் கிரான்ஸ் அமைப்பைக் காட்டுகின்றன — கடத்தும் திசுத்தொகுப்புகளைச் சுற்றியுள்ள பெரிய திசுத்தொகுப்பு உறை செல்கள்; இது திறமையான ஒளிச்சேர்க்கைக்கு CO₂-ஐ செறிவூட்ட உதவுகிறது.',
    },
    hint: {
      en: 'Named after the German botanist Haberlandt\'s student Kranz.',
      ta: 'ஜெர்மன் தாவரவியலாளர் மாணவர் கிரான்ஸ் பெயரில்.',
    },
  },
  {
    id: 'bioa-107',
    subjectId: 'biology',
    pathwayId: 'bio-a-1',
    difficulty: 'advanced',
    question: {
      en: 'Photoperiodism in plants controls which process?',
      ta: 'தாவரங்களில் ஒளிகாலம் (photoperiodism) எந்த செயல்முறையைக் கட்டுப்படுத்துகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Flowering', ta: 'பூப்பதை' } },
      { id: 'b', label: 'B', text: { en: 'Water absorption', ta: 'நீர் உறிஞ்சுதலை' } },
      { id: 'c', label: 'C', text: { en: 'Mineral transport', ta: 'தாது கடத்தலை' } },
      { id: 'd', label: 'D', text: { en: 'Root growth direction', ta: 'வேர் வளர்ச்சி திசையை' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Photoperiodism is the response of plants to the relative lengths of day and night, which triggers flowering (short-day vs long-day plants).',
      ta: 'பகல்-இரவு நீளங்களுக்கு தாவரங்கள் காட்டும் எதிர்வினை ஒளிகாலம்; இது பூப்பதைத் தூண்டுகிறது (குறுகிய-நாள் மற்றும் நீண்ட-நாள் தாவரங்கள்).',
    },
    hint: {
      en: 'The plant "reads" day length to know when to bloom.',
      ta: 'எப்போது பூக்க வேண்டும் என்பதை அறிய தாவரம் பகல் நீளத்தை "படிக்கிறது".',
    },
  },
  {
    id: 'bioa-108',
    subjectId: 'biology',
    pathwayId: 'bio-a-1',
    difficulty: 'advanced',
    question: {
      en: 'Which plant hormone is called the "stress hormone" because it promotes seed dormancy and stomatal closure?',
      ta: 'விதை முடங்கல் மற்றும் ஸ்டோமாட்டா மூடலை ஊக்குவிப்பதால் "மன அழுத்த இயக்குநீர்" என்று அழைக்கப்படும் தாவர இயக்குநீர் எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Abscisic acid (ABA)', ta: 'அப்சிசிக் அமிலம் (ABA)' } },
      { id: 'b', label: 'B', text: { en: 'Gibberellin', ta: 'ஜிப்பரெல்லின்' } },
      { id: 'c', label: 'C', text: { en: 'Auxin', ta: 'ஆக்சின்' } },
      { id: 'd', label: 'D', text: { en: 'Ethylene', ta: 'எத்திலீன்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'ABA accumulates during drought and stress — it closes stomata to save water and maintains seed dormancy.',
      ta: 'வறட்சி காலத்தில் ABA அதிகரிக்கிறது — நீரைச் சேமிக்க ஸ்டோமாட்டாவை மூடுகிறது; விதை முடங்கலைப் பராமரிக்கிறது.',
    },
    hint: {
      en: 'Its abbreviation sounds like the word for "away from balance".',
      ta: 'அதன் சுருக்கம் "சமநிலையிலிருந்து விலகி" என்பதை ஒத்திருக்கிறது.',
    },
  },

  // ==================== bio-a-2 Zoology & Human Physiology ====================
  {
    id: 'bioa-201',
    subjectId: 'biology',
    pathwayId: 'bio-a-2',
    difficulty: 'beginner',
    question: {
      en: 'What is the basic structural and functional unit of the nervous system?',
      ta: 'நரம்பு மண்டலத்தின் அடிப்படை கட்டமைப்பு மற்றும் செயல்பாட்டு அலகு எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Neuron', ta: 'நரம்பணு (நியூரான்)' } },
      { id: 'b', label: 'B', text: { en: 'Nephron', ta: 'நெஃப்ரான்' } },
      { id: 'c', label: 'C', text: { en: 'Alveolus', ta: 'அல்வியோலஸ்' } },
      { id: 'd', label: 'D', text: { en: 'Axon only', ta: 'ஆக்சான் மட்டும்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'The neuron is the functional unit of the nervous system — it transmits electrical and chemical signals.',
      ta: 'நரம்பணு நரம்பு மண்டலத்தின் செயல்பாட்டு அலகு — இது மின் மற்றும் வேதி சமிக்ஞைகளை கடத்துகிறது.',
    },
    hint: {
      en: 'It has dendrites, a cell body, and an axon.',
      ta: 'இதற்கு டென்ட்ரைட்டுகள், செல் உடல், ஆக்சான் உள்ளன.',
    },
  },
  {
    id: 'bioa-202',
    subjectId: 'biology',
    pathwayId: 'bio-a-2',
    difficulty: 'beginner',
    question: {
      en: 'Insulin, which regulates blood sugar, is secreted by which organ?',
      ta: 'இரத்த சர்க்கரையை சீராக்கும் இன்சுலின் எந்த உறுப்பால் சுரக்கப்படுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Pancreas', ta: 'கணையம்' } },
      { id: 'b', label: 'B', text: { en: 'Liver', ta: 'கல்லீரல்' } },
      { id: 'c', label: 'C', text: { en: 'Kidney', ta: 'சிறுநீரகம்' } },
      { id: 'd', label: 'D', text: { en: 'Spleen', ta: 'மண்ணீரல்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'The beta cells of the pancreas (islets of Langerhans) secrete insulin, which lowers blood glucose.',
      ta: 'கணையத்தின் பீட்டா செல்கள் (லாங்கர்ஹான்ஸ் திட்டுகள்) இன்சுலினை சுரக்கின்றன; இது இரத்த குளுக்கோஸைக் குறைக்கிறது.',
    },
    hint: {
      en: 'Diabetes is linked to problems with this organ.',
      ta: 'நீரிழிவு இந்த உறுப்பின் பிரச்சினைகளுடன் தொடர்புடையது.',
    },
  },
  {
    id: 'bioa-203',
    subjectId: 'biology',
    pathwayId: 'bio-a-2',
    difficulty: 'intermediate',
    question: {
      en: 'Which blood component is essential for blood clotting?',
      ta: 'இரத்த உறைவுக்கு அவசியமான இரத்த அங்கம் எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Platelets', ta: 'இரத்தத் தட்டுகள்' } },
      { id: 'b', label: 'B', text: { en: 'Red blood cells', ta: 'சிவப்பு இரத்த அணுக்கள்' } },
      { id: 'c', label: 'C', text: { en: 'Plasma proteins only', ta: 'பிளாஸ்மா புரதங்கள் மட்டும்' } },
      { id: 'd', label: 'D', text: { en: 'White blood cells', ta: 'வெள்ளை இரத்த அணுக்கள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Platelets (thrombocytes) aggregate at injury sites and, with clotting factors, form a clot to stop bleeding.',
      ta: 'இரத்தத் தட்டுகள் (த்ரோம்போசைட்டுகள்) காயம் ஏற்பட்ட இடத்தில் கூடி, உறைதல் காரணிகளுடன் சேர்ந்து உறைவை உருவாக்கி இரத்தப்போக்கை நிறுத்துகின்றன.',
    },
    hint: {
      en: 'Their low count causes easy bruising.',
      ta: 'இவற்றின் குறைவான எண்ணிக்கை எளிதில் காயம் ஏற்படச் செய்கிறது.',
    },
  },
  {
    id: 'bioa-204',
    subjectId: 'biology',
    pathwayId: 'bio-a-2',
    difficulty: 'intermediate',
    question: {
      en: 'Antibodies are produced by which cells?',
      ta: 'ஆன்டிபாடிகள் எந்த செல்களால் உற்பத்தி செய்யப்படுகின்றன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'B lymphocytes (B cells)', ta: 'பி லிம்போசைட்டுகள் (பி செல்கள்)' } },
      { id: 'b', label: 'B', text: { en: 'Red blood cells', ta: 'சிவப்பு இரத்த அணுக்கள்' } },
      { id: 'c', label: 'C', text: { en: 'Platelets', ta: 'இரத்தத் தட்டுகள்' } },
      { id: 'd', label: 'D', text: { en: 'Neurons', ta: 'நரம்பணுக்கள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'B lymphocytes mature in the bone marrow and produce antibodies that neutralise pathogens — the basis of humoral immunity.',
      ta: 'எலும்பு மஜ்ஜையில் முதிர்ச்சியடையும் பி லிம்போசைட்டுகள் நோய்க்கிருமிகளை நடுநிலையாக்கும் ஆன்டிபாடிகளை உற்பத்தி செய்கின்றன — நகைச்சுவை நோய் எதிர்ப்புத்திறனின் அடிப்படை.',
    },
    hint: {
      en: 'These immune cells "remember" past infections.',
      ta: 'முந்தைய தொற்றுகளை "நினைவில் கொள்ளும்" நோய் எதிர்ப்பு செல்கள்.',
    },
  },
  {
    id: 'bioa-205',
    subjectId: 'biology',
    pathwayId: 'bio-a-2',
    difficulty: 'intermediate',
    question: {
      en: 'Gas exchange between air and blood in the lungs occurs in which structures?',
      ta: 'நுரையீரலில் காற்றுக்கும் இரத்தத்திற்கும் இடையே வாயு பரிமாற்றம் எந்த அமைப்புகளில் நடைபெறுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Alveoli', ta: 'அல்வியோலி' } },
      { id: 'b', label: 'B', text: { en: 'Bronchi', ta: 'மூச்சுக்குழல்கள்' } },
      { id: 'c', label: 'C', text: { en: 'Trachea', ta: 'மூச்சுக்குழாய்' } },
      { id: 'd', label: 'D', text: { en: 'Diaphragm', ta: 'உதரவிதானம்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Alveoli are tiny air sacs with thin walls and dense capillaries where O₂ enters the blood and CO₂ leaves it.',
      ta: 'அல்வியோலிகள் மெல்லிய சுவர் மற்றும் அடர்த்தியான நுண்குழாய்கள் கொண்ட சிறிய காற்றுப்பைகள்; இங்கு O₂ இரத்தத்தில் நுழைந்து CO₂ வெளியேறுகிறது.',
    },
    hint: {
      en: 'Their enormous surface area makes gas exchange fast.',
      ta: 'அவற்றின் மிகப்பெரிய பரப்பளவு வாயு பரிமாற்றத்தை வேகமாக்குகிறது.',
    },
  },
  {
    id: 'bioa-206',
    subjectId: 'biology',
    pathwayId: 'bio-a-2',
    difficulty: 'advanced',
    question: {
      en: 'In a reflex arc, the correct order of signal flow is what?',
      ta: 'அனிச்சை வளைவில் சமிக்ஞை ஓட்டத்தின் சரியான வரிசை எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Stimulus → sensory neuron → spinal cord → motor neuron → response', ta: 'தூண்டல் → உணர்வு நரம்பணு → தண்டுவடம் → இயக்க நரம்பணு → எதிர்வினை' } },
      { id: 'b', label: 'B', text: { en: 'Motor neuron → sensory neuron → brain → response', ta: 'இயக்க நரம்பணு → உணர்வு நரம்பணு → மூளை → எதிர்வினை' } },
      { id: 'c', label: 'C', text: { en: 'Brain → spinal cord → muscle directly', ta: 'மூளை → தண்டுவடம் → தசை நேரடியாக' } },
      { id: 'd', label: 'D', text: { en: 'Response → stimulus → muscle', ta: 'எதிர்வினை → தூண்டல் → தசை' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'A reflex arc bypasses the brain: the sensory neuron carries the signal to the spinal cord, which immediately sends a motor response.',
      ta: 'அனிச்சை வளைவு மூளையைத் தவிர்க்கிறது: உணர்வு நரம்பணு சமிக்ஞையை தண்டுவடத்திற்கு கொண்டு செல்கிறது; அது உடனடியாக இயக்க எதிர்வினையை அனுப்புகிறது.',
    },
    hint: {
      en: 'Think of pulling your hand away from a hot object.',
      ta: 'சூடான பொருளிலிருந்து கையை இழுப்பதை நினைக்கவும்.',
    },
  },
  {
    id: 'bioa-207',
    subjectId: 'biology',
    pathwayId: 'bio-a-2',
    difficulty: 'advanced',
    question: {
      en: 'The counter-current exchange system in fish gills helps them to do what?',
      ta: 'மீன் செவுள்களில் உள்ள எதிர்நீரோட்ட பரிமாற்ற அமைப்பு அவற்றிற்கு எதில் உதவுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Extract oxygen efficiently from water', ta: 'நீரிலிருந்து ஆக்ஸிஜனை திறமையாகப் பிரித்தெடுக்க' } },
      { id: 'b', label: 'B', text: { en: 'Maintain body temperature', ta: 'உடல் வெப்பநிலையை பராமரிக்க' } },
      { id: 'c', label: 'C', text: { en: 'Produce sound', ta: 'ஒலி உருவாக்க' } },
      { id: 'd', label: 'D', text: { en: 'Filter salt from water', ta: 'நீரிலிருந்து உப்பை வடிகட்ட' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Blood and water flow in opposite directions in gill lamellae, maintaining a concentration gradient that lets up to 80–90% of dissolved oxygen be extracted.',
      ta: 'செவுள் தகடுகளில் இரத்தமும் நீரும் எதிர் திசைகளில் ஓடுகின்றன; செறிவு சாய்வு பராமரிக்கப்படுவதால் கரைந்த ஆக்ஸிஜனில் 80–90% வரை பிரித்தெடுக்க முடிகிறது.',
    },
    hint: {
      en: 'Opposite directions keep the gradient steep.',
      ta: 'எதிர் திசைகள் சாய்வை செங்குத்தாக வைக்கின்றன.',
    },
  },
  {
    id: 'bioa-208',
    subjectId: 'biology',
    pathwayId: 'bio-a-2',
    difficulty: 'advanced',
    question: {
      en: 'Antidiuretic hormone (ADH) from the pituitary primarily controls what?',
      ta: 'பிட்யூட்டரியிலிருந்து வரும் கழிவு நீர் எதிர் இயக்குநீர் (ADH) முக்கியமாக எதைக் கட்டுப்படுத்துகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Water reabsorption in the kidneys', ta: 'சிறுநீரகங்களில் நீர் மீளுறிஞ்சுதலை' } },
      { id: 'b', label: 'B', text: { en: 'Heart rate', ta: 'இதயத் துடிப்பை' } },
      { id: 'c', label: 'C', text: { en: 'Body height', ta: 'உடல் உயரத்தை' } },
      { id: 'd', label: 'D', text: { en: 'Blood cell production', ta: 'இரத்த செல் உற்பத்தியை' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'ADH increases water reabsorption in the kidney tubules, concentrating urine when the body needs to conserve water.',
      ta: 'ADH சிறுநீரகக் குழாய்களில் நீர் மீளுறிஞ்சுதலை அதிகரிக்கிறது; உடல் நீரைச் சேமிக்க வேண்டியபோது சிறுநீரை செறிவாக்குகிறது.',
    },
    hint: {
      en: 'Its absence causes lots of dilute urine (diabetes insipidus).',
      ta: 'இது இல்லாதபோது அதிக நீர்த்த சிறுநீர் உருவாகிறது.',
    },
  },

  // ==================== bio-a-3 Genetics & Biotechnology ====================
  {
    id: 'bioa-301',
    subjectId: 'biology',
    pathwayId: 'bio-a-3',
    difficulty: 'beginner',
    question: {
      en: 'Gregor Mendel performed his famous inheritance experiments on which plant?',
      ta: 'கிரிகோர் மெண்டல் தனது புகழ்பெற்ற மரபு சோதனைகளை எந்த செடியில் செய்தார்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Pea plants', ta: 'பட்டாணிச் செடிகள்' } },
      { id: 'b', label: 'B', text: { en: 'Rice plants', ta: 'நெற்செடிகள்' } },
      { id: 'c', label: 'C', text: { en: 'Mango trees', ta: 'மாமரங்கள்' } },
      { id: 'd', label: 'D', text: { en: 'Sunflowers', ta: 'சூரியகாந்திகள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Mendel used garden pea plants (Pisum sativum) because they have contrasting traits, self-pollinate, and grow quickly.',
      ta: 'மெண்டல் பட்டாணிச் செடிகளை (Pisum sativum) பயன்படுத்தினார் — எதிர்மாறான பண்புகள், சுய மகரந்தச் சேர்க்கை, விரைவான வளர்ச்சி.',
    },
    hint: {
      en: 'The "Father of Genetics" grew these in his monastery garden.',
      ta: '"மரபியலின் தந்தை" துறவி மடத் தோட்டத்தில் இவற்றை வளர்த்தார்.',
    },
  },
  {
    id: 'bioa-302',
    subjectId: 'biology',
    pathwayId: 'bio-a-3',
    difficulty: 'beginner',
    question: {
      en: 'Who proposed the double-helix model of DNA in 1953?',
      ta: '1953-இல் DNA-வின் இரட்டைச் சுருளி மாதிரியை முன்மொழிந்தவர்கள் யார்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Watson and Crick', ta: 'வாட்சன் மற்றும் கிரிக்' } },
      { id: 'b', label: 'B', text: { en: 'Mendel and Darwin', ta: 'மெண்டல் மற்றும் டார்வின்' } },
      { id: 'c', label: 'C', text: { en: 'Pasteur and Koch', ta: 'பாஸ்டர் மற்றும் கோச்' } },
      { id: 'd', label: 'D', text: { en: 'Faraday and Maxwell', ta: 'ஃபாரடே மற்றும் மேக்ஸ்வெல்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'James Watson and Francis Crick proposed the double-helix structure of DNA in 1953, using Franklin\'s X-ray data.',
      ta: 'ஜேம்ஸ் வாட்சனும் பிரான்சிஸ் கிரிக்கும் 1953-இல் DNA-வின் இரட்டைச் சுருளி அமைப்பை முன்மொழிந்தனர்; ஃபிராங்க்ளினின் எக்ஸ்ரே தரவைப் பயன்படுத்தி.',
    },
    hint: {
      en: 'They shared the 1962 Nobel Prize with Maurice Wilkins.',
      ta: '1962 நோபல் பரிசை மாரிஸ் வில்கின்ஸுடன் பகிர்ந்தனர்.',
    },
  },
  {
    id: 'bioa-303',
    subjectId: 'biology',
    pathwayId: 'bio-a-3',
    difficulty: 'intermediate',
    question: {
      en: 'In genetics, the genetic makeup of an organism (e.g., Tt) is its what?',
      ta: 'மரபியலில் ஒரு உயிரினத்தின் மரபணு அமைப்பு (எ.கா., Tt) அதன் எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Genotype', ta: 'மரபணு வகை (ஜீனோடைப்)' } },
      { id: 'b', label: 'B', text: { en: 'Phenotype', ta: 'தோற்ற வகை (ஃபீனோடைப்)' } },
      { id: 'c', label: 'C', text: { en: 'Chromosome', ta: 'குரோமோசோம்' } },
      { id: 'd', label: 'D', text: { en: 'Allele frequency', ta: 'ஆலீல் அதிர்வெண்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Genotype is the genetic constitution (alleles) of an organism; phenotype is the observable trait that results from it.',
      ta: 'மரபணு வகை என்பது உயிரினத்தின் மரபணு அமைப்பு (ஆலீல்கள்); தோற்ற வகை என்பது அதிலிருந்து உருவாகும் காணக்கூடிய பண்பு.',
    },
    hint: {
      en: '"Geno" = genes; "pheno" = appearance.',
      ta: '"ஜீனோ" = மரபணுக்கள்; "ஃபீனோ" = தோற்றம்.',
    },
  },
  {
    id: 'bioa-304',
    subjectId: 'biology',
    pathwayId: 'bio-a-3',
    difficulty: 'intermediate',
    question: {
      en: 'A recessive allele expresses its trait only in which condition?',
      ta: 'ஒரு பின்னடைவு ஆலீல் எந்த நிலையில் மட்டும் தன் பண்பை வெளிப்படுத்துகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'In homozygous condition (e.g., tt)', ta: 'ஒத்தநுக மரபணு நிலையில் (எ.கா., tt)' } },
      { id: 'b', label: 'B', text: { en: 'In heterozygous condition (e.g., Tt)', ta: 'பல்லின மரபணு நிலையில் (எ.கா., Tt)' } },
      { id: 'c', label: 'C', text: { en: 'In the presence of a dominant allele', ta: 'மேலாதிக்க ஆலீல் முன்னிலையில்' } },
      { id: 'd', label: 'D', text: { en: 'It always expresses', ta: 'எப்போதும் வெளிப்படுகிறது' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'A recessive allele only shows its effect when both alleles are recessive (homozygous). In a heterozygote, the dominant allele masks it.',
      ta: 'இரண்டு ஆலீல்களும் பின்னடைவாக இருந்தால் (ஒத்தநுகம்) மட்டுமே பின்னடைவு ஆலீல் தன் விளைவைக் காட்டுகிறது. பல்லின நிலையில் மேலாதிக்க ஆலீல் அதை மறைக்கிறது.',
    },
    hint: {
      en: 'Two lowercase alleles together.',
      ta: 'இரண்டு சிற்றெழுத்து ஆலீல்கள் இணைந்தவை.',
    },
  },
  {
    id: 'bioa-305',
    subjectId: 'biology',
    pathwayId: 'bio-a-3',
    difficulty: 'intermediate',
    question: {
      en: 'Which enzymes are used as "molecular scissors" to cut DNA at specific sequences in genetic engineering?',
      ta: 'மரபணு பொறியியலில் குறிப்பிட்ட வரிசைகளில் DNA-வை வெட்ட "மூலக்கூறு கத்தரிக்கோல்" ஆகப் பயன்படும் என்சைம்கள் எவை?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Restriction enzymes', ta: 'தடுப்பு என்சைம்கள் (ரெஸ்ட்ரிக்ஷன் என்சைம்கள்)' } },
      { id: 'b', label: 'B', text: { en: 'DNA ligase only', ta: 'DNA லைகேஸ் மட்டும்' } },
      { id: 'c', label: 'C', text: { en: 'Amylase', ta: 'அமைலேஸ்' } },
      { id: 'd', label: 'D', text: { en: 'Pepsin', ta: 'பெப்சின்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Restriction enzymes cut DNA at specific recognition sequences, creating fragments that can be joined with other DNA using ligase.',
      ta: 'தடுப்பு என்சைம்கள் குறிப்பிட்ட அடையாள வரிசைகளில் DNA-வை வெட்டி துண்டுகளை உருவாக்குகின்றன; லைகேஸ் மூலம் அவற்றை மற்ற DNA உடன் இணைக்கலாம்.',
    },
    hint: {
      en: 'They "restrict" foreign DNA — named after that function.',
      ta: 'அவை வெளி DNA-வை "தடுக்கின்றன" — அந்த செயல்பாட்டின் பெயரில் அழைக்கப்படுகின்றன.',
    },
  },
  {
    id: 'bioa-306',
    subjectId: 'biology',
    pathwayId: 'bio-a-3',
    difficulty: 'advanced',
    question: {
      en: 'PCR (polymerase chain reaction) is a laboratory technique used to do what?',
      ta: 'PCR (பாலிமரேஸ் சங்கிலி வினை) எதற்காக பயன்படுத்தப்படும் ஆய்வக நுட்பம்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Amplify (make many copies of) a specific DNA segment', ta: 'ஒரு குறிப்பிட்ட DNA துண்டின் பல பிரதிகளை உருவாக்க' } },
      { id: 'b', label: 'B', text: { en: 'Separate proteins by size', ta: 'புரதங்களை அளவின்படி பிரிக்க' } },
      { id: 'c', label: 'C', text: { en: 'Stain chromosomes', ta: 'குரோமோசோம்களுக்கு நிறமேற்ற' } },
      { id: 'd', label: 'D', text: { en: 'Grow bacteria', ta: 'பாக்டீரியாக்களை வளர்க்க' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'PCR uses repeated heating and cooling cycles with a heat-stable polymerase to copy a tiny DNA sample into millions of copies — essential in diagnostics and forensics.',
      ta: 'PCR வெப்பநிலை நிலைத்த பாலிமரேஸுடன் மீண்டும் மீண்டும் சூடாக்கி குளிர்வித்து, சிறிய DNA மாதிரியை மில்லியன் கணக்கான பிரதிகளாக மாற்றுகிறது — நோய் கண்டறிதல் மற்றும் தடயவியலில் முக்கியம்.',
    },
    hint: {
      en: 'It is how COVID-19 tests detect viral RNA/DNA.',
      ta: 'கோவிட்-19 சோதனைகள் வைரஸ் RNA/DNA-வை கண்டறிவது இப்படித்தான்.',
    },
  },
  {
    id: 'bioa-307',
    subjectId: 'biology',
    pathwayId: 'bio-a-3',
    difficulty: 'advanced',
    question: {
      en: 'The theory of evolution by natural selection was proposed by whom?',
      ta: 'இயற்கைத் தேர்வின் மூலம் பரிணாமக் கோட்பாட்டை முன்மொழிந்தவர் யார்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Charles Darwin', ta: 'சார்லஸ் டார்வின்' } },
      { id: 'b', label: 'B', text: { en: 'Gregor Mendel', ta: 'கிரிகோர் மெண்டல்' } },
      { id: 'c', label: 'C', text: { en: 'Lamarck', ta: 'லாமார்க்' } },
      { id: 'd', label: 'D', text: { en: 'Hugo de Vries', ta: 'ஹ்யூகோ டி வ்ரீஸ்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Darwin\'s "On the Origin of Species" (1859) proposed natural selection: organisms with favourable traits survive and reproduce more.',
      ta: 'டார்வினின் "உயிரினங்களின் தோற்றம்" (1859) இயற்கைத் தேர்வை முன்மொழிந்தது: சாதகமான பண்புகள் கொண்ட உயிரினங்கள் அதிகம் உயிர்வாழ்ந்து இனப்பெருக்கம் செய்கின்றன.',
    },
    hint: {
      en: 'He studied finches in the Galápagos Islands.',
      ta: 'கலபகோஸ் தீவுகளில் ஃபிஞ்ச் பறவைகளை ஆய்வு செய்தார்.',
    },
  },
  {
    id: 'bioa-308',
    subjectId: 'biology',
    pathwayId: 'bio-a-3',
    difficulty: 'advanced',
    question: {
      en: 'Recombinant DNA technology involves combining what?',
      ta: 'மறுசேர்க்கை DNA தொழில்நுட்பம் எதை இணைப்பதை உள்ளடக்கியது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'DNA from different sources into one molecule', ta: 'வெவ்வேறு மூலங்களிலிருந்து DNA-வை ஒரு மூலக்கூறாக இணைப்பது' } },
      { id: 'b', label: 'B', text: { en: 'Proteins with carbohydrates', ta: 'புரதங்களுடன் கார்போஹைட்ரேட்டுகளை' } },
      { id: 'c', label: 'C', text: { en: 'Two whole organisms', ta: 'இரண்டு முழு உயிரினங்களை' } },
      { id: 'd', label: 'D', text: { en: 'RNA with lipids', ta: 'RNA-வுடன் கொழுப்புகளை' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Recombinant DNA joins DNA segments from different sources (e.g., human insulin gene into a bacterial plasmid), enabling organisms to produce useful proteins like insulin.',
      ta: 'மறுசேர்க்கை DNA வெவ்வேறு மூலங்களின் DNA துண்டுகளை இணைக்கிறது (எ.கா., மனித இன்சுலின் மரபணுவை பாக்டீரியா பிளாஸ்மிடில்); இன்சுலின் போன்ற பயனுள்ள புரதங்களை உயிரினங்கள் உற்பத்தி செய்ய உதவுகிறது.',
    },
    hint: {
      en: 'Think of cutting and pasting genes between organisms.',
      ta: 'உயிரினங்களுக்கு இடையே மரபணுக்களை வெட்டி ஒட்டுவதை நினைக்கவும்.',
    },
  },
];