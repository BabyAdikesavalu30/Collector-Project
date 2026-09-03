/**
 * Foundation-Level Biology Questions (Classes 6–7)
 * Grade-appropriate bilingual questions for bio-f-1 (Living Organisms &
 * Habitat), bio-f-2 (Plants & Nutrition), and bio-f-3 (Human Body & Health).
 */

import { QuizQuestion } from './quiz.types';

export const FOUNDATION_BIOLOGY_QUESTIONS: QuizQuestion[] = [
  // ==================== bio-f-1 Living Organisms & Habitat ====================
  {
    id: 'biof-101',
    subjectId: 'biology',
    pathwayId: 'bio-f-1',
    difficulty: 'beginner',
    question: {
      en: 'Which of these do all living things need to survive?',
      ta: 'உயிர்வாழ அனைத்து உயிரினங்களுக்கும் இவற்றில் எது தேவை?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Food, water, and air', ta: 'உணவு, நீர் மற்றும் காற்று' } },
      { id: 'b', label: 'B', text: { en: 'Only sunlight', ta: 'சூரிய ஒளி மட்டும்' } },
      { id: 'c', label: 'C', text: { en: 'Only soil', ta: 'மண் மட்டும்' } },
      { id: 'd', label: 'D', text: { en: 'Toys and games', ta: 'பொம்மைகள் மற்றும் விளையாட்டுகள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'All living things need food for energy, water for life processes, and air for respiration.',
      ta: 'ஆற்றலுக்கு உணவும், உயிர் செயல்முறைகளுக்கு நீரும், சுவாசத்திற்கு காற்றும் அனைத்து உயிரினங்களுக்கும் தேவை.',
    },
    hint: {
      en: 'Think of what you need every single day.',
      ta: 'ஒவ்வொரு நாளும் உனக்கு என்னென்ன தேவை என்று நினைக்கவும்.',
    },
  },
  {
    id: 'biof-102',
    subjectId: 'biology',
    pathwayId: 'bio-f-1',
    difficulty: 'beginner',
    question: {
      en: 'Fish live in water. What is the habitat of a fish?',
      ta: 'மீன்கள் தண்ணீரில் வாழ்கின்றன. மீனின் வாழிடம் (habitat) எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Aquatic habitat', ta: 'நீர்வாழ் வாழிடம்' } },
      { id: 'b', label: 'B', text: { en: 'Desert habitat', ta: 'பாலைவன வாழிடம்' } },
      { id: 'c', label: 'C', text: { en: 'Mountain habitat', ta: 'மலை வாழிடம்' } },
      { id: 'd', label: 'D', text: { en: 'Underground habitat', ta: 'நிலத்தடி வாழிடம்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'A habitat is the natural home of an organism. Fish live in an aquatic (water) habitat.',
      ta: 'வாழிடம் என்பது ஒரு உயிரினத்தின் இயற்கையான வீடு. மீன்கள் நீர்வாழ் (நீர்) வாழிடத்தில் வாழ்கின்றன.',
    },
    hint: {
      en: 'It starts with the word for water.',
      ta: 'நீர் என்ற பொருள் தரும் சொல்லுடன் தொடங்குகிறது.',
    },
  },
  {
    id: 'biof-103',
    subjectId: 'biology',
    pathwayId: 'bio-f-1',
    difficulty: 'beginner',
    question: {
      en: 'Where does a cactus plant grow naturally?',
      ta: 'கள்ளி (கற்றாழை) செடி இயற்கையாக எங்கு வளர்கிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'In deserts', ta: 'பாலைவனங்களில்' } },
      { id: 'b', label: 'B', text: { en: 'In oceans', ta: 'கடல்களில்' } },
      { id: 'c', label: 'C', text: { en: 'Inside caves', ta: 'குகைகளுக்குள்' } },
      { id: 'd', label: 'D', text: { en: 'On icebergs', ta: 'பனிப்பாறைகளில்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Cacti are adapted to deserts — their thick stems store water and their spines reduce water loss.',
      ta: 'கள்ளி பாலைவனத்திற்கு ஏற்ற தகவமைப்பு கொண்டது — அதன் தடித்த தண்டு நீரைச் சேமிக்கிறது, முட்கள் நீர் இழப்பைக் குறைக்கின்றன.',
    },
    hint: {
      en: 'A very dry, sandy place with little rain.',
      ta: 'மிக வறண்ட, மணல் நிறைந்த, குறைந்த மழை பெய்யும் இடம்.',
    },
  },
  {
    id: 'biof-104',
    subjectId: 'biology',
    pathwayId: 'bio-f-1',
    difficulty: 'intermediate',
    question: {
      en: 'A camel can survive long periods without water in the desert. Which feature helps it?',
      ta: 'பாலைவனத்தில் நீண்ட காலம் தண்ணீர் இல்லாமல் ஒட்டகம் உயிர்வாழ முடியும். எந்த அம்சம் அதற்கு உதவுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Fat stored in its hump', ta: 'அதன் திமிலில் சேமிக்கப்படும் கொழுப்பு' } },
      { id: 'b', label: 'B', text: { en: 'Its long ears', ta: 'அதன் நீண்ட காதுகள்' } },
      { id: 'c', label: 'C', text: { en: 'Its white fur', ta: 'அதன் வெள்ளை உரோமம்' } },
      { id: 'd', label: 'D', text: { en: 'Its tail', ta: 'அதன் வால்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'The camel stores fat in its hump, which provides energy when food and water are scarce.',
      ta: 'ஒட்டகம் தனது திமிலில் கொழுப்பைச் சேமிக்கிறது; உணவும் நீரும் கிடைக்காதபோது அது ஆற்றலை அளிக்கிறது.',
    },
    hint: {
      en: 'The raised part on its back.',
      ta: 'அதன் முதுகில் உயர்ந்த பகுதி.',
    },
  },
  {
    id: 'biof-105',
    subjectId: 'biology',
    pathwayId: 'bio-f-1',
    difficulty: 'intermediate',
    question: {
      en: 'Animals like cows, dogs, and elephants live on land. What are they called?',
      ta: 'மாடு, நாய், யானை போன்ற விலங்குகள் நிலத்தில் வாழ்கின்றன. அவை என்ன அழைக்கப்படுகின்றன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Terrestrial animals', ta: 'நிலவாழ் விலங்குகள்' } },
      { id: 'b', label: 'B', text: { en: 'Aquatic animals', ta: 'நீர்வாழ் விலங்குகள்' } },
      { id: 'c', label: 'C', text: { en: 'Aerial animals', ta: 'வளிவாழ் விலங்குகள்' } },
      { id: 'd', label: 'D', text: { en: 'Amphibians', ta: 'நீர்நில வாழ்வன' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Animals that live mainly on land are called terrestrial animals. Aquatic animals live in water, and aerial animals fly in the air.',
      ta: 'முக்கியமாக நிலத்தில் வாழும் விலங்குகள் நிலவாழ் விலங்குகள் எனப்படும். நீர்வாழ் விலங்குகள் நீரில் வாழ்கின்றன; வளிவாழ் விலங்குகள் காற்றில் பறக்கின்றன.',
    },
    hint: {
      en: 'From the Latin word for land.',
      ta: 'நிலம் என்ற இலத்தீன் சொல்லிலிருந்து வந்தது.',
    },
  },
  {
    id: 'biof-106',
    subjectId: 'biology',
    pathwayId: 'bio-f-1',
    difficulty: 'intermediate',
    question: {
      en: 'Why do plants need sunlight?',
      ta: 'தாவரங்களுக்கு சூரிய ஒளி ஏன் தேவை?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'To make their own food', ta: 'தங்கள் உணவைத் தாங்களே தயாரிக்க' } },
      { id: 'b', label: 'B', text: { en: 'To breathe air', ta: 'காற்றை சுவாசிக்க' } },
      { id: 'c', label: 'C', text: { en: 'To drink water', ta: 'நீர் குடிக்க' } },
      { id: 'd', label: 'D', text: { en: 'To move around', ta: 'நகர்ந்து செல்ல' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Plants use sunlight, water, and carbon dioxide to make food by photosynthesis. Without sunlight they cannot make food.',
      ta: 'ஒளிச்சேர்க்கையின் மூலம் சூரிய ஒளி, நீர், கார்பன் டை ஆக்சைடைப் பயன்படுத்தி தாவரங்கள் உணவு தயாரிக்கின்றன. சூரிய ஒளி இல்லாமல் அவற்றால் உணவு தயாரிக்க முடியாது.',
    },
    hint: {
      en: 'The process is called photosynthesis.',
      ta: 'இந்த செயல்முறை ஒளிச்சேர்க்கை எனப்படும்.',
    },
  },
  {
    id: 'biof-107',
    subjectId: 'biology',
    pathwayId: 'bio-f-1',
    difficulty: 'advanced',
    question: {
      en: 'Polar bears have thick fur and a layer of fat. What does this adaptation help them do?',
      ta: 'துருவ கரடிகளுக்கு தடித்த உரோமமும் கொழுப்பு அடுக்கும் உள்ளது. இந்த தகவமைப்பு அவற்றிற்கு எதற்கு உதவுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Stay warm in freezing cold', ta: 'கடும் குளிரில் வெப்பமாக இருக்க' } },
      { id: 'b', label: 'B', text: { en: 'Fly in the air', ta: 'காற்றில் பறக்க' } },
      { id: 'c', label: 'C', text: { en: 'Climb tall trees', ta: 'உயரமான மரங்களில் ஏற' } },
      { id: 'd', label: 'D', text: { en: 'Swim faster than fish', ta: 'மீன்களை விட வேகமாக நீந்த' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Thick fur and body fat trap heat and insulate the polar bear against the freezing polar climate.',
      ta: 'தடித்த உரோமமும் உடல் கொழுப்பும் வெப்பத்தைத் தக்கவைத்து, உறைபனி துருவ காலநிலையிலிருந்து துருவ கரடியைப் பாதுகாக்கின்றன.',
    },
    hint: {
      en: 'Think about the weather where polar bears live.',
      ta: 'துருவ கரடிகள் வாழும் இடத்தின் காலநிலையை நினைக்கவும்.',
    },
  },
  {
    id: 'biof-108',
    subjectId: 'biology',
    pathwayId: 'bio-f-1',
    difficulty: 'advanced',
    question: {
      en: 'An ecosystem includes living things and which other part of nature?',
      ta: 'ஒரு சூழலமைப்பில் (ecosystem) உயிரினங்களும் இயற்கையின் எந்த பகுதியும் அடங்கும்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Non-living things like soil, water, and air', ta: 'மண், நீர், காற்று போன்ற உயிரற்ற பொருட்கள்' } },
      { id: 'b', label: 'B', text: { en: 'Only machines', ta: 'இயந்திரங்கள் மட்டும்' } },
      { id: 'c', label: 'C', text: { en: 'Only buildings', ta: 'கட்டிடங்கள் மட்டும்' } },
      { id: 'd', label: 'D', text: { en: 'Nothing else', ta: 'வேறு எதுவும் இல்லை' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'An ecosystem is made of living organisms together with the non-living environment (soil, water, air) in which they live.',
      ta: 'சூழலமைப்பு என்பது உயிரினங்களும் அவை வாழும் உயிரற்ற சூழலும் (மண், நீர், காற்று) சேர்ந்ததாகும்.',
    },
    hint: {
      en: 'Living + non-living together in one place.',
      ta: 'ஒரே இடத்தில் உயிருள்ள + உயிரற்றவை சேர்ந்து.',
    },
  },

  // ==================== bio-f-2 Plants & Nutrition ====================
  {
    id: 'biof-201',
    subjectId: 'biology',
    pathwayId: 'bio-f-2',
    difficulty: 'beginner',
    question: {
      en: 'By which process do green plants make their own food?',
      ta: 'எந்த செயல்முறை மூலம் பச்சை தாவரங்கள் தங்கள் உணவைத் தாங்களே தயாரிக்கின்றன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Photosynthesis', ta: 'ஒளிச்சேர்க்கை' } },
      { id: 'b', label: 'B', text: { en: 'Digestion', ta: 'செரிமானம்' } },
      { id: 'c', label: 'C', text: { en: 'Breathing', ta: 'சுவாசம்' } },
      { id: 'd', label: 'D', text: { en: 'Circulation', ta: 'சுற்றோட்டம்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Photosynthesis is the process by which green plants make food using sunlight, water, and carbon dioxide.',
      ta: 'சூரிய ஒளி, நீர், கார்பன் டை ஆக்சைடைப் பயன்படுத்தி பச்சை தாவரங்கள் உணவு தயாரிக்கும் செயல்முறை ஒளிச்சேர்க்கை ஆகும்.',
    },
    hint: {
      en: 'It happens in the leaves using sunlight.',
      ta: 'இது இலைகளில் சூரிய ஒளியைப் பயன்படுத்தி நடக்கிறது.',
    },
  },
  {
    id: 'biof-202',
    subjectId: 'biology',
    pathwayId: 'bio-f-2',
    difficulty: 'beginner',
    question: {
      en: 'Which part of a plant absorbs water from the soil?',
      ta: 'தாவரத்தின் எந்தப் பகுதி மண்ணிலிருந்து நீரை உறிஞ்சுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Roots', ta: 'வேர்கள்' } },
      { id: 'b', label: 'B', text: { en: 'Flowers', ta: 'பூக்கள்' } },
      { id: 'c', label: 'C', text: { en: 'Seeds', ta: 'விதைகள்' } },
      { id: 'd', label: 'D', text: { en: 'Fruits', ta: 'பழங்கள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Roots grow into the soil and absorb water and minerals, which travel up through the stem to the leaves.',
      ta: 'வேர்கள் மண்ணில் வளர்ந்து நீரையும் தாதுக்களையும் உறிஞ்சுகின்றன; அவை தண்டு வழியே இலைகளுக்குச் செல்கின்றன.',
    },
    hint: {
      en: 'The part usually hidden under the ground.',
      ta: 'பொதுவாக நிலத்தடியில் மறைந்திருக்கும் பகுதி.',
    },
  },
  {
    id: 'biof-203',
    subjectId: 'biology',
    pathwayId: 'bio-f-2',
    difficulty: 'beginner',
    question: {
      en: 'What colour are leaves because of the chlorophyll in them?',
      ta: 'இலைகளில் உள்ள குளோரோபில் காரணமாக அவை என்ன நிறத்தில் இருக்கும்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Green', ta: 'பச்சை' } },
      { id: 'b', label: 'B', text: { en: 'Blue', ta: 'நீலம்' } },
      { id: 'c', label: 'C', text: { en: 'Yellow', ta: 'மஞ்சள்' } },
      { id: 'd', label: 'D', text: { en: 'Red', ta: 'சிவப்பு' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Chlorophyll is the green pigment in leaves that captures sunlight for photosynthesis.',
      ta: 'குளோரோபில் என்பது இலைகளில் உள்ள பச்சை நிறமி; இது ஒளிச்சேர்க்கைக்காக சூரிய ஒளியைப் பிடிக்கிறது.',
    },
    hint: {
      en: 'The colour of most healthy leaves.',
      ta: 'பெரும்பாலான ஆரோக்கியமான இலைகளின் நிறம்.',
    },
  },
  {
    id: 'biof-204',
    subjectId: 'biology',
    pathwayId: 'bio-f-2',
    difficulty: 'intermediate',
    question: {
      en: 'The food made by leaves during photosynthesis is stored in plants as what?',
      ta: 'ஒளிச்சேர்க்கையின் போது இலைகள் தயாரிக்கும் உணவு தாவரங்களில் எவ்வாறு சேமிக்கப்படுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Starch', ta: 'மாவுச்சத்து (ஸ்டார்ச்)' } },
      { id: 'b', label: 'B', text: { en: 'Salt', ta: 'உப்பு' } },
      { id: 'c', label: 'C', text: { en: 'Vitamin C', ta: 'வைட்டமின் சி' } },
      { id: 'd', label: 'D', text: { en: 'Iron', ta: 'இரும்பு' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'The glucose made in photosynthesis is converted into starch, which is stored in leaves, stems, roots, and seeds.',
      ta: 'ஒளிச்சேர்க்கையில் உருவாகும் குளுக்கோஸ் மாவுச்சத்தாக மாற்றப்பட்டு இலைகள், தண்டுகள், வேர்கள், விதைகளில் சேமிக்கப்படுகிறது.',
    },
    hint: {
      en: 'The iodine test turns this substance blue-black.',
      ta: 'அயோடின் சோதனை இந்தப் பொருளை நீல-கருப்பாக மாற்றுகிறது.',
    },
  },
  {
    id: 'biof-205',
    subjectId: 'biology',
    pathwayId: 'bio-f-2',
    difficulty: 'intermediate',
    question: {
      en: 'Water loss from plants through tiny pores in the leaves is called what?',
      ta: 'இலைகளில் உள்ள நுண் துளைகள் வழியே தாவரங்களில் ஏற்படும் நீர் இழப்பு என்ன அழைக்கப்படுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Transpiration', ta: 'ஆவியுயிர்ப்பு (நீராவிப்போக்கு)' } },
      { id: 'b', label: 'B', text: { en: 'Digestion', ta: 'செரிமானம்' } },
      { id: 'c', label: 'C', text: { en: 'Germination', ta: 'முளைத்தல்' } },
      { id: 'd', label: 'D', text: { en: 'Pollination', ta: 'மகரந்தச் சேர்க்கை' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Transpiration is the loss of water vapour from leaves through tiny pores called stomata. It helps pull water up from the roots.',
      ta: 'ஸ்டோமாட்டா எனப்படும் நுண் துளைகள் வழியே இலைகளில் இருந்து நீராவி வெளியேறுவது ஆவியுயிர்ப்பு. இது வேர்களிலிருந்து நீரை மேலே இழுக்க உதவுகிறது.',
    },
    hint: {
      en: 'You can see it as tiny droplets on leaves in the morning.',
      ta: 'காலையில் இலைகளில் சிறு நீர்த்துளிகளாக இதைக் காணலாம்.',
    },
  },
  {
    id: 'biof-206',
    subjectId: 'biology',
    pathwayId: 'bio-f-2',
    difficulty: 'intermediate',
    question: {
      en: 'Which of these is needed for photosynthesis along with sunlight and water?',
      ta: 'சூரிய ஒளி மற்றும் நீருடன் சேர்ந்து ஒளிச்சேர்க்கைக்கு இவற்றில் எது தேவை?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Carbon dioxide', ta: 'கார்பன் டை ஆக்சைடு' } },
      { id: 'b', label: 'B', text: { en: 'Nitrogen gas', ta: 'நைட்ரஜன் வாயு' } },
      { id: 'c', label: 'C', text: { en: 'Helium gas', ta: 'ஹீலியம் வாயு' } },
      { id: 'd', label: 'D', text: { en: 'Hydrogen gas', ta: 'ஹைட்ரஜன் வாயு' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Photosynthesis needs sunlight, water, and carbon dioxide to make glucose and release oxygen.',
      ta: 'ஒளிச்சேர்க்கைக்கு சூரிய ஒளி, நீர், கார்பன் டை ஆக்சைடு தேவை; இவை சேர்ந்து குளுக்கோஸை உருவாக்கி ஆக்ஸிஜனை வெளியிடுகின்றன.',
    },
    hint: {
      en: 'The gas we breathe out.',
      ta: 'நாம் வெளியேற்றும் வாயு.',
    },
  },
  {
    id: 'biof-207',
    subjectId: 'biology',
    pathwayId: 'bio-f-2',
    difficulty: 'advanced',
    question: {
      en: 'During photosynthesis, plants release which gas into the air?',
      ta: 'ஒளிச்சேர்க்கையின் போது தாவரங்கள் காற்றில் எந்த வாயுவை வெளியிடுகின்றன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Oxygen', ta: 'ஆக்ஸிஜன்' } },
      { id: 'b', label: 'B', text: { en: 'Carbon dioxide', ta: 'கார்பன் டை ஆக்சைடு' } },
      { id: 'c', label: 'C', text: { en: 'Nitrogen', ta: 'நைட்ரஜன்' } },
      { id: 'd', label: 'D', text: { en: 'Methane', ta: 'மீத்தேன்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Plants release oxygen as a by-product of photosynthesis — the oxygen we and other animals breathe.',
      ta: 'ஒளிச்சேர்க்கையின் துணை விளைபொருளாக தாவரங்கள் ஆக்ஸிஜனை வெளியிடுகின்றன — நாமும் மற்ற விலங்குகளும் சுவாசிக்கும் ஆக்ஸிஜன்.',
    },
    hint: {
      en: 'The gas that keeps a flame burning.',
      ta: 'சுடரை எரிய வைக்கும் வாயு.',
    },
  },
  {
    id: 'biof-208',
    subjectId: 'biology',
    pathwayId: 'bio-f-2',
    difficulty: 'advanced',
    question: {
      en: 'Plants are called "producers" in nature because they do what?',
      ta: 'இயற்கையில் தாவரங்கள் "உற்பத்தியாளர்கள்" என அழைக்கப்படுவதற்குக் காரணம் அவை என்ன செய்வதால்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Make their own food for all other living things', ta: 'மற்ற அனைத்து உயிரினங்களுக்கும் தங்கள் உணவைத் தாங்களே தயாரிக்கின்றன' } },
      { id: 'b', label: 'B', text: { en: 'Eat other animals', ta: 'மற்ற விலங்குகளை உண்கின்றன' } },
      { id: 'c', label: 'C', text: { en: 'Produce oxygen only at night', ta: 'இரவில் மட்டும் ஆக்ஸிஜனை உற்பத்தி செய்கின்றன' } },
      { id: 'd', label: 'D', text: { en: 'Decompose dead matter', ta: 'இறந்த பொருட்களைச் சிதைக்கின்றன' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Green plants make food from simple substances, so they are the producers at the start of every food chain.',
      ta: 'பச்சை தாவரங்கள் எளிய பொருட்களிலிருந்து உணவைத் தயாரிக்கின்றன, எனவே ஒவ்வொரு உணவுச் சங்கிலியின் தொடக்கத்தில் அவை உற்பத்தியாளர்களாக உள்ளன.',
    },
    hint: {
      en: 'They are the first link in every food chain.',
      ta: 'ஒவ்வொரு உணவுச் சங்கிலியிலும் அவை முதல் இணைப்பு.',
    },
  },

  // ==================== bio-f-3 Human Body & Health ====================
  {
    id: 'biof-301',
    subjectId: 'biology',
    pathwayId: 'bio-f-3',
    difficulty: 'beginner',
    question: {
      en: 'Which organ do we use to breathe in air?',
      ta: 'காற்றை சுவாசிக்க நாம் எந்த உறுப்பைப் பயன்படுத்துகிறோம்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Lungs', ta: 'நுரையீரல்கள்' } },
      { id: 'b', label: 'B', text: { en: 'Kidneys', ta: 'சிறுநீரகங்கள்' } },
      { id: 'c', label: 'C', text: { en: 'Stomach', ta: 'வயிறு' } },
      { id: 'd', label: 'D', text: { en: 'Eyes', ta: 'கண்கள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Our lungs take in oxygen from the air and remove carbon dioxide when we breathe out.',
      ta: 'நம் நுரையீரல்கள் காற்றிலிருந்து ஆக்ஸிஜனை எடுத்து, வெளியேற்றும்போது கார்பன் டை ஆக்சைடை நீக்குகின்றன.',
    },
    hint: {
      en: 'Located in the chest, they expand when you inhale.',
      ta: 'மார்பில் அமைந்துள்ள இவை உள்ளிழுக்கும்போது விரிவடைகின்றன.',
    },
  },
  {
    id: 'biof-302',
    subjectId: 'biology',
    pathwayId: 'bio-f-3',
    difficulty: 'beginner',
    question: {
      en: 'Which organ pumps blood to all parts of the body?',
      ta: 'உடலின் அனைத்து பாகங்களுக்கும் இரத்தத்தை செலுத்தும் உறுப்பு எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Heart', ta: 'இதயம்' } },
      { id: 'b', label: 'B', text: { en: 'Liver', ta: 'கல்லீரல்' } },
      { id: 'c', label: 'C', text: { en: 'Brain', ta: 'மூளை' } },
      { id: 'd', label: 'D', text: { en: 'Teeth', ta: 'பற்கள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'The heart is a muscular organ that pumps blood through blood vessels to every part of the body.',
      ta: 'இதயம் ஒரு தசை உறுப்பு; இரத்தக் குழாய்கள் வழியே உடலின் ஒவ்வொரு பகுதிக்கும் இரத்தத்தை செலுத்துகிறது.',
    },
    hint: {
      en: 'You can feel it beating in your chest.',
      ta: 'உன் மார்பில் அது துடிப்பதை உணரலாம்.',
    },
  },
  {
    id: 'biof-303',
    subjectId: 'biology',
    pathwayId: 'bio-f-3',
    difficulty: 'beginner',
    question: {
      en: 'Brushing teeth twice a day mainly prevents what?',
      ta: 'ஒரு நாளைக்கு இருமுறை பல் துலக்குவது முக்கியமாக எதைத் தடுக்கிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Tooth decay and cavities', ta: 'பல் சிதைவு மற்றும் துவாரங்கள்' } },
      { id: 'b', label: 'B', text: { en: 'Hair loss', ta: 'முடி உதிர்வு' } },
      { id: 'c', label: 'C', text: { en: 'Broken bones', ta: 'எலும்பு முறிவு' } },
      { id: 'd', label: 'D', text: { en: 'Poor eyesight', ta: 'பார்வை குறைபாடு' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Brushing removes food particles and plaque, preventing the growth of germs that cause tooth decay and cavities.',
      ta: 'பல் துலக்குதல் உணவுத் துகள்களையும் பிளேக்கையும் நீக்கி, பல் சிதைவு மற்றும் துவாரங்களை உண்டாக்கும் கிருமிகள் வளராமல் தடுக்கிறது.',
    },
    hint: {
      en: 'A dental health habit.',
      ta: 'பல் ஆரோக்கிய பழக்கம்.',
    },
  },
  {
    id: 'biof-304',
    subjectId: 'biology',
    pathwayId: 'bio-f-3',
    difficulty: 'intermediate',
    question: {
      en: 'A balanced diet should mainly include which of these?',
      ta: 'சமச்சீர் உணவில் முக்கியமாக இவற்றில் எது இருக்க வேண்டும்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Fruits, vegetables, grains, and proteins', ta: 'பழங்கள், காய்கறிகள், தானியங்கள் மற்றும் புரதங்கள்' } },
      { id: 'b', label: 'B', text: { en: 'Only sweets', ta: 'இனிப்புகள் மட்டும்' } },
      { id: 'c', label: 'C', text: { en: 'Only fried food', ta: 'வறுத்த உணவுகள் மட்டும்' } },
      { id: 'd', label: 'D', text: { en: 'Only cold drinks', ta: 'குளிர்பானங்கள் மட்டும்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'A balanced diet gives the body all the nutrients it needs: carbohydrates, proteins, fats, vitamins, minerals, and water.',
      ta: 'சமச்சீர் உணவு உடலுக்குத் தேவையான அனைத்து ஊட்டச்சத்துக்களையும் அளிக்கிறது: கார்போஹைட்ரேட், புரதம், கொழுப்பு, வைட்டமின்கள், தாதுக்கள், நீர்.',
    },
    hint: {
      en: 'A mix of food groups in the right amounts.',
      ta: 'சரியான அளவில் பல்வேறு உணவு வகைகளின் கலவை.',
    },
  },
  {
    id: 'biof-305',
    subjectId: 'biology',
    pathwayId: 'bio-f-3',
    difficulty: 'intermediate',
    question: {
      en: 'Morning sunlight is a good natural source of which vitamin?',
      ta: 'காலை சூரிய ஒளி எந்த வைட்டமினின் சிறந்த இயற்கை மூலமாகும்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Vitamin D', ta: 'வைட்டமின் டி' } },
      { id: 'b', label: 'B', text: { en: 'Vitamin C', ta: 'வைட்டமின் சி' } },
      { id: 'c', label: 'C', text: { en: 'Vitamin A', ta: 'வைட்டமின் ஏ' } },
      { id: 'd', label: 'D', text: { en: 'Vitamin B12', ta: 'வைட்டமின் பி12' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Our skin makes Vitamin D when exposed to sunlight. It helps keep bones strong.',
      ta: 'சூரிய ஒளி படும்போது நம் தோல் வைட்டமின் டியை உருவாக்குகிறது. இது எலும்புகளை வலுவாக வைக்க உதவுகிறது.',
    },
    hint: {
      en: 'The "sunshine vitamin".',
      ta: '"சூரிய ஒளி வைட்டமின்".',
    },
  },
  {
    id: 'biof-306',
    subjectId: 'biology',
    pathwayId: 'bio-f-3',
    difficulty: 'intermediate',
    question: {
      en: 'Where does the digestion of food begin in our body?',
      ta: 'நம் உடலில் உணவின் செரிமானம் எங்கு தொடங்குகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'In the mouth', ta: 'வாயில்' } },
      { id: 'b', label: 'B', text: { en: 'In the stomach', ta: 'வயிற்றில்' } },
      { id: 'c', label: 'C', text: { en: 'In the large intestine', ta: 'பெருங்குடலில்' } },
      { id: 'd', label: 'D', text: { en: 'In the kidneys', ta: 'சிறுநீரகங்களில்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Digestion begins in the mouth, where teeth chew food and saliva starts breaking down the food.',
      ta: 'வாயில் செரிமானம் தொடங்குகிறது; பற்கள் உணவை மென்று, உமிழ்நீர் உணவை உடைக்கத் தொடங்குகிறது.',
    },
    hint: {
      en: 'Chewing is the first step.',
      ta: 'மெல்லுவது முதல் படி.',
    },
  },
  {
    id: 'biof-307',
    subjectId: 'biology',
    pathwayId: 'bio-f-3',
    difficulty: 'advanced',
    question: {
      en: 'Roughage (fibre) in our food is important because it does what?',
      ta: 'நம் உணவில் உள்ள நார்ச்சத்து (roughage) எதற்காக முக்கியம்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Helps food move easily through the digestive system', ta: 'செரிமான அமைப்பில் உணவு எளிதாகச் செல்ல உதவுகிறது' } },
      { id: 'b', label: 'B', text: { en: 'Gives the body extra fat', ta: 'உடலுக்கு கூடுதல் கொழுப்பை அளிக்கிறது' } },
      { id: 'c', label: 'C', text: { en: 'Makes bones stronger', ta: 'எலும்புகளை வலுவாக்குகிறது' } },
      { id: 'd', label: 'D', text: { en: 'Increases body heat quickly', ta: 'உடல் வெப்பத்தை விரைவாக அதிகரிக்கிறது' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Roughage from fruits, vegetables, and whole grains is not digested but adds bulk that helps food move through the digestive tract and prevents constipation.',
      ta: 'பழங்கள், காய்கறிகள், முழு தானியங்களில் உள்ள நார்ச்சத்து செரிக்கப்படுவதில்லை, ஆனால் செரிமானப் பாதையில் உணவு நகர உதவி மலச்சிக்கலைத் தடுக்கிறது.',
    },
    hint: {
      en: 'Found in salads and whole grains.',
      ta: 'சாலடுகள் மற்றும் முழு தானியங்களில் கிடைக்கிறது.',
    },
  },
  {
    id: 'biof-308',
    subjectId: 'biology',
    pathwayId: 'bio-f-3',
    difficulty: 'advanced',
    question: {
      en: 'Approximately how many bones are there in an adult human body?',
      ta: 'வயது வந்த மனித உடலில் தோராயமாக எத்தனை எலும்புகள் உள்ளன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: '206 bones', ta: '206 எலும்புகள்' } },
      { id: 'b', label: 'B', text: { en: '106 bones', ta: '106 எலும்புகள்' } },
      { id: 'c', label: 'C', text: { en: '500 bones', ta: '500 எலும்புகள்' } },
      { id: 'd', label: 'D', text: { en: '32 bones', ta: '32 எலும்புகள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'An adult human skeleton has about 206 bones. Babies are born with more, which join together as they grow.',
      ta: 'வயது வந்த மனித எலும்புக்கூட்டில் சுமார் 206 எலும்புகள் உள்ளன. குழந்தைகள் அதிக எலும்புகளுடன் பிறக்கின்றன; அவை வளரும்போது இணைகின்றன.',
    },
    hint: {
      en: 'They support the body and protect organs.',
      ta: 'அவை உடலைத் தாங்கி உறுப்புகளைப் பாதுகாக்கின்றன.',
    },
  },
];