/**
 * Foundation-Level Physics Questions (Classes 6–7)
 * Grade-appropriate bilingual questions for phy-f-1 (Force & Motion),
 * phy-f-2 (Light & Shadows), and phy-f-3 (Matter & Measurement).
 */

import { QuizQuestion } from './quiz.types';

export const FOUNDATION_PHYSICS_QUESTIONS: QuizQuestion[] = [
  // ==================== phy-f-1 Force & Motion ====================
  {
    id: 'phyf-101',
    subjectId: 'physics',
    pathwayId: 'phy-f-1',
    difficulty: 'beginner',
    question: {
      en: 'What is a force?',
      ta: 'விசை என்றால் என்ன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'A push or a pull', ta: 'தள்ளுதல் அல்லது இழுத்தல்' } },
      { id: 'b', label: 'B', text: { en: 'A type of food', ta: 'ஒரு வகை உணவு' } },
      { id: 'c', label: 'C', text: { en: 'A kind of sound', ta: 'ஒரு வகை ஒலி' } },
      { id: 'd', label: 'D', text: { en: 'A kind of light', ta: 'ஒரு வகை ஒளி' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'A force is simply a push or a pull acting on an object. It can start, stop, or change the direction of motion.',
      ta: 'விசை என்பது ஒரு பொருளின் மீது செயல்படும் தள்ளுதல் அல்லது இழுத்தல் ஆகும். இது இயக்கத்தைத் தொடங்கவோ, நிறுத்தவோ அல்லது திசையை மாற்றவோ செய்யலாம்.',
    },
    hint: {
      en: 'You use it every time you open a door or kick a ball.',
      ta: 'கதவைத் திறக்கும்போதும் பந்தை உதைக்கும்போதும் இதைப் பயன்படுத்துகிறோம்.',
    },
  },
  {
    id: 'phyf-102',
    subjectId: 'physics',
    pathwayId: 'phy-f-1',
    difficulty: 'beginner',
    question: {
      en: 'Speed is calculated by dividing distance by which quantity?',
      ta: 'வேகத்தைக் கணக்கிட தொலைவை எந்த அளவால் வகுக்க வேண்டும்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Time', ta: 'நேரம்' } },
      { id: 'b', label: 'B', text: { en: 'Mass', ta: 'நிறை' } },
      { id: 'c', label: 'C', text: { en: 'Volume', ta: 'கன அளவு' } },
      { id: 'd', label: 'D', text: { en: 'Weight', ta: 'எடை' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Speed = Distance ÷ Time. For example, 100 metres in 20 seconds means a speed of 5 m/s.',
      ta: 'வேகம் = தொலைவு ÷ நேரம். எடுத்துக்காட்டாக, 20 வினாடிகளில் 100 மீட்டர் என்றால் வேகம் 5 m/s ஆகும்.',
    },
    hint: {
      en: 'Think of how fast you walk to school in a certain time.',
      ta: 'ஒரு குறிப்பிட்ட நேரத்தில் பள்ளிக்கு எவ்வளவு வேகமாக நடக்கிறீர்கள் என்று நினைக்கவும்.',
    },
  },
  {
    id: 'phyf-103',
    subjectId: 'physics',
    pathwayId: 'phy-f-1',
    difficulty: 'beginner',
    question: {
      en: 'Which instrument is used to measure time?',
      ta: 'நேரத்தை அளவிடப் பயன்படும் கருவி எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Stopwatch', ta: 'நிறுத்து கடிகாரம்' } },
      { id: 'b', label: 'B', text: { en: 'Weighing scale', ta: 'நிறை அளவி' } },
      { id: 'c', label: 'C', text: { en: 'Thermometer', ta: 'வெப்பமானி' } },
      { id: 'd', label: 'D', text: { en: 'Ruler', ta: 'அளவுகோல்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'A stopwatch measures the time taken for an activity, often in seconds and minutes.',
      ta: 'நிறுத்து கடிகாரம் ஒரு செயலுக்கு எடுக்கும் நேரத்தை வினாடிகள் மற்றும் நிமிடங்களில் அளவிடுகிறது.',
    },
    hint: {
      en: 'Used at sports events to time races.',
      ta: 'விளையாட்டு போட்டிகளில் ஓட்டத்திற்கான நேரத்தை அளவிடப் பயன்படுகிறது.',
    },
  },
  {
    id: 'phyf-104',
    subjectId: 'physics',
    pathwayId: 'phy-f-1',
    difficulty: 'intermediate',
    question: {
      en: 'A car covers 60 km in 2 hours. What is its speed?',
      ta: 'ஒரு கார் 2 மணி நேரத்தில் 60 கிமீ கடக்கிறது. அதன் வேகம் என்ன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: '30 km/h', ta: '30 கிமீ/மணி' } },
      { id: 'b', label: 'B', text: { en: '120 km/h', ta: '120 கிமீ/மணி' } },
      { id: 'c', label: 'C', text: { en: '60 km/h', ta: '60 கிமீ/மணி' } },
      { id: 'd', label: 'D', text: { en: '20 km/h', ta: '20 கிமீ/மணி' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Speed = Distance ÷ Time = 60 km ÷ 2 h = 30 km/h.',
      ta: 'வேகம் = தொலைவு ÷ நேரம் = 60 கிமீ ÷ 2 மணி = 30 கிமீ/மணி.',
    },
    hint: {
      en: 'Divide the distance by the time taken.',
      ta: 'தொலைவை நேரத்தால் வகுக்கவும்.',
    },
  },
  {
    id: 'phyf-105',
    subjectId: 'physics',
    pathwayId: 'phy-f-1',
    difficulty: 'intermediate',
    question: {
      en: 'Which force pulls objects towards the centre of the Earth?',
      ta: 'பொருட்களை பூமியின் மையத்தை நோக்கி இழுக்கும் விசை எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Gravity', ta: 'ஈர்ப்பு விசை' } },
      { id: 'b', label: 'B', text: { en: 'Friction', ta: 'உராய்வு' } },
      { id: 'c', label: 'C', text: { en: 'Magnetism', ta: 'காந்த விசை' } },
      { id: 'd', label: 'D', text: { en: 'Tension', ta: 'இழுவிசை' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Gravity is the force that pulls everything towards the centre of the Earth. That is why things fall downwards.',
      ta: 'பூமியின் மையத்தை நோக்கி அனைத்தையும் இழுக்கும் விசை ஈர்ப்பு விசையாகும். அதனால்தான் பொருட்கள் கீழே விழுகின்றன.',
    },
    hint: {
      en: 'The force that makes a dropped pencil fall to the floor.',
      ta: 'கீழே போட்ட பென்சில் தரையில் விழுவதற்கு காரணமான விசை.',
    },
  },
  {
    id: 'phyf-106',
    subjectId: 'physics',
    pathwayId: 'phy-f-1',
    difficulty: 'intermediate',
    question: {
      en: 'A ball rolling on grass slows down and stops because of which force?',
      ta: 'புல் தரையில் உருளும் பந்து மெதுவாகி நின்றுவிடுகிறது. இதற்குக் காரணமான விசை எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Friction', ta: 'உராய்வு' } },
      { id: 'b', label: 'B', text: { en: 'Magnetism', ta: 'காந்த விசை' } },
      { id: 'c', label: 'C', text: { en: 'Buoyancy', ta: 'மிதப்பு விசை' } },
      { id: 'd', label: 'D', text: { en: 'Electric force', ta: 'மின்னியல் விசை' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Friction between the ball and the grass opposes motion and gradually stops the ball.',
      ta: 'பந்திற்கும் புல் தரைக்கும் இடையே உள்ள உராய்வு இயக்கத்தை எதிர்த்து பந்தை படிப்படியாக நிறுத்துகிறது.',
    },
    hint: {
      en: 'The same force that makes your shoes wear out.',
      ta: 'உங்கள் காலணிகள் தேய்ந்து போவதற்குக் காரணமான அதே விசை.',
    },
  },
  {
    id: 'phyf-107',
    subjectId: 'physics',
    pathwayId: 'phy-f-1',
    difficulty: 'advanced',
    question: {
      en: 'A cyclist pedals harder to move faster. What does this show about force and motion?',
      ta: 'ஒரு சைக்கிள் ஓட்டுபவர் வேகமாகச் செல்ல அதிகமாக மிதிக்கிறார். விசைக்கும் இயக்கத்திற்கும் இடையே இது எதைக் காட்டுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Greater force causes greater speed change', ta: 'அதிக விசை அதிக வேக மாற்றத்தை ஏற்படுத்துகிறது' } },
      { id: 'b', label: 'B', text: { en: 'Force has no effect on motion', ta: 'விசைக்கு இயக்கத்தில் எந்த விளைவும் இல்லை' } },
      { id: 'c', label: 'C', text: { en: 'Motion causes force', ta: 'இயக்கம் விசையை ஏற்படுத்துகிறது' } },
      { id: 'd', label: 'D', text: { en: 'Force only affects shape', ta: 'விசை வடிவத்தை மட்டுமே பாதிக்கிறது' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Applying a greater force to the same object produces a greater change in its speed, so the cycle moves faster.',
      ta: 'ஒரே பொருளின் மீது அதிக விசையைச் செலுத்தும்போது அதன் வேக மாற்றம் அதிகரிக்கிறது, எனவே சைக்கிள் வேகமாகச் செல்கிறது.',
    },
    hint: {
      en: 'Compare pedalling gently and pedalling hard.',
      ta: 'மெதுவாக மிதிப்பதற்கும் கடுமையாக மிதிப்பதற்கும் உள்ள வேறுபாட்டை ஒப்பிடுக.',
    },
  },
  {
    id: 'phyf-108',
    subjectId: 'physics',
    pathwayId: 'phy-f-1',
    difficulty: 'advanced',
    question: {
      en: 'A book resting on a table does not move by itself. What keeps it at rest?',
      ta: 'மேசையின் மீது ஓய்வில் இருக்கும் புத்தகம் தானாக நகரவில்லை. அதை ஓய்வில் வைத்திருப்பது எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Balanced forces', ta: 'சமநிலை விசைகள்' } },
      { id: 'b', label: 'B', text: { en: 'Unbalanced forces', ta: 'சமநிலையற்ற விசைகள்' } },
      { id: 'c', label: 'C', text: { en: 'Magnetic force', ta: 'காந்த விசை' } },
      { id: 'd', label: 'D', text: { en: 'Air pressure', ta: 'காற்றழுத்தம்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Gravity pulls the book down while the table pushes it up with an equal force. These balanced forces keep it at rest.',
      ta: 'புவியீர்ப்பு புத்தகத்தை கீழே இழுக்க, மேசை சம அளவு விசையுடன் மேலே தள்ளுகிறது. இந்த சமநிலை விசைகள் அதை ஓய்வில் வைத்துள்ளன.',
    },
    hint: {
      en: 'Two equal forces acting in opposite directions.',
      ta: 'எதிர் திசைகளில் செயல்படும் இரண்டு சமமான விசைகள்.',
    },
  },

  // ==================== phy-f-2 Light & Shadows ====================
  {
    id: 'phyf-201',
    subjectId: 'physics',
    pathwayId: 'phy-f-2',
    difficulty: 'beginner',
    question: {
      en: 'In which path does light travel?',
      ta: 'ஒளி எந்தப் பாதையில் பயணிக்கிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Straight lines', ta: 'நேர்க்கோடுகளில்' } },
      { id: 'b', label: 'B', text: { en: 'Curved lines', ta: 'வளைந்த கோடுகளில்' } },
      { id: 'c', label: 'C', text: { en: 'Zigzag lines', ta: 'வளைந்து நெளிந்த கோடுகளில்' } },
      { id: 'd', label: 'D', text: { en: 'Circles', ta: 'வட்டங்களில்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Light travels in straight lines. This is why we see clear shadows and sharp edges of objects.',
      ta: 'ஒளி நேர்க்கோட்டில் பயணிக்கிறது. அதனால்தான் தெளிவான நிழல்களும் பொருட்களின் கூர்மையான விளிம்புகளும் தெரிகின்றன.',
    },
    hint: {
      en: 'Think of sun rays passing through a window.',
      ta: 'ஜன்னல் வழியாக செல்லும் சூரிய ஒளிக்கதிர்களை நினைக்கவும்.',
    },
  },
  {
    id: 'phyf-202',
    subjectId: 'physics',
    pathwayId: 'phy-f-2',
    difficulty: 'beginner',
    question: {
      en: 'A shadow is formed when light is blocked by which kind of object?',
      ta: 'ஒளியைத் தடுக்கும் எந்த வகைப் பொருளால் நிழல் உருவாகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Opaque object', ta: 'ஒளிபுகா பொருள்' } },
      { id: 'b', label: 'B', text: { en: 'Transparent object', ta: 'ஒளிபுகும் பொருள்' } },
      { id: 'c', label: 'C', text: { en: 'Translucent object', ta: 'பகுதி ஒளிபுகும் பொருள்' } },
      { id: 'd', label: 'D', text: { en: 'Luminous object', ta: 'ஒளிரும் பொருள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'An opaque object does not allow light to pass through it, so a dark shadow forms behind it.',
      ta: 'ஒளிபுகா பொருள் வழியே ஒளி செல்ல முடியாது, எனவே அதன் பின்னால் கருமையான நிழல் உருவாகிறது.',
    },
    hint: {
      en: 'A wooden block forms a shadow, but a glass window does not.',
      ta: 'மரத்தடை நிழலை உருவாக்கும், ஆனால் கண்ணாடி ஜன்னல் உருவாக்காது.',
    },
  },
  {
    id: 'phyf-203',
    subjectId: 'physics',
    pathwayId: 'phy-f-2',
    difficulty: 'beginner',
    question: {
      en: 'Which of these objects is luminous (gives out its own light)?',
      ta: 'இவற்றில் எந்தப் பொருள் ஒளிரும் (தானாக ஒளி வெளியிடும்)?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'The Sun', ta: 'சூரியன்' } },
      { id: 'b', label: 'B', text: { en: 'The Moon', ta: 'நிலா' } },
      { id: 'c', label: 'C', text: { en: 'A mirror', ta: 'கண்ணாடி' } },
      { id: 'd', label: 'D', text: { en: 'A book', ta: 'புத்தகம்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'The Sun gives out its own light. The Moon, mirror, and book only reflect light that falls on them.',
      ta: 'சூரியன் தானாக ஒளியை வெளியிடுகிறது. நிலா, கண்ணாடி மற்றும் புத்தகம் தங்கள் மீது விழும் ஒளியை மட்டுமே எதிரொளிக்கின்றன.',
    },
    hint: {
      en: 'It shines during the day without any help.',
      ta: 'எந்த உதவியும் இல்லாமல் பகலில் ஒளிர்கிறது.',
    },
  },
  {
    id: 'phyf-204',
    subjectId: 'physics',
    pathwayId: 'phy-f-2',
    difficulty: 'intermediate',
    question: {
      en: 'You can see your face in a mirror because of which phenomenon?',
      ta: 'கண்ணாடியில் உங்கள் முகத்தைப் பார்க்க முடிவதற்கு எந்த நிகழ்வு காரணம்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Reflection of light', ta: 'ஒளி எதிரொளிப்பு' } },
      { id: 'b', label: 'B', text: { en: 'Bending of light', ta: 'ஒளி வளைவு' } },
      { id: 'c', label: 'C', text: { en: 'Absorption of light', ta: 'ஒளி உறிஞ்சுதல்' } },
      { id: 'd', label: 'D', text: { en: 'Dispersion of light', ta: 'ஒளி சிதறல்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'A plane mirror reflects the light falling on it, and our eyes see the reflected rays as a clear image.',
      ta: 'தள ஆடி தன்மீது விழும் ஒளியை எதிரொளிக்கிறது; எதிரொளித்த கதிர்களை நம் கண்கள் தெளிவான பிம்பமாகக் காண்கின்றன.',
    },
    hint: {
      en: 'Light bounces back from the smooth surface.',
      ta: 'மென்மையான மேற்பரப்பிலிருந்து ஒளி திரும்பி வருகிறது.',
    },
  },
  {
    id: 'phyf-205',
    subjectId: 'physics',
    pathwayId: 'phy-f-2',
    difficulty: 'intermediate',
    question: {
      en: 'Why is a shadow always dark?',
      ta: 'நிழல் எப்போதும் ஏன் இருண்டதாக இருக்கிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Light cannot reach that region', ta: 'ஒளி அந்தப் பகுதியை அடைய முடியாது' } },
      { id: 'b', label: 'B', text: { en: 'Shadows have their own colour', ta: 'நிழலுக்கு தனி நிறம் உண்டு' } },
      { id: 'c', label: 'C', text: { en: 'Air becomes dark there', ta: 'அங்கு காற்று இருண்டுவிடும்' } },
      { id: 'd', label: 'D', text: { en: 'The ground is dark', ta: 'தரை இருண்டது' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'A shadow is dark because the blocking object stops light from reaching the area behind it, so no light reflects back to our eyes from that spot.',
      ta: 'தடுக்கும் பொருள் அதன் பின்னால் ஒளி செல்லாமல் தடுப்பதால் நிழல் இருண்டதாக உள்ளது; அந்த இடத்திலிருந்து நம் கண்களுக்கு ஒளி எதிரொளிக்கப்படுவதில்லை.',
    },
    hint: {
      en: 'It is the absence of light, not a coloured area.',
      ta: 'இது வண்ணப் பகுதி அல்ல; ஒளி இல்லாதது.',
    },
  },
  {
    id: 'phyf-206',
    subjectId: 'physics',
    pathwayId: 'phy-f-2',
    difficulty: 'intermediate',
    question: {
      en: 'When the Sun is overhead at noon, your shadow becomes what?',
      ta: 'நண்பகலில் சூரியன் நேரடியாக மேலே இருக்கும்போது உங்கள் நிழல் எப்படி இருக்கும்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Very short', ta: 'மிகக் குறுகியது' } },
      { id: 'b', label: 'B', text: { en: 'Very long', ta: 'மிக நீளமானது' } },
      { id: 'c', label: 'C', text: { en: 'No shadow forms', ta: 'நிழல் உருவாகாது' } },
      { id: 'd', label: 'D', text: { en: 'It turns blue', ta: 'நீல நிறமாக மாறும்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'When the Sun is directly overhead, the light falls almost vertically, so the shadow is very short.',
      ta: 'சூரியன் நேரடியாக மேலே இருக்கும்போது ஒளி கிட்டத்தட்ட செங்குத்தாக விழுவதால் நிழல் மிகக் குறுகியதாக இருக்கும்.',
    },
    hint: {
      en: 'Compare your shadow in the morning and at noon.',
      ta: 'காலையில் உங்கள் நிழலையும் நண்பகலில் உள்ள நிழலையும் ஒப்பிடுக.',
    },
  },
  {
    id: 'phyf-207',
    subjectId: 'physics',
    pathwayId: 'phy-f-2',
    difficulty: 'advanced',
    question: {
      en: 'What happens to a shadow when the object is moved closer to the light source?',
      ta: 'ஒளி மூலத்திற்கு அருகில் பொருளை நகர்த்தும்போது நிழலுக்கு என்ன நடக்கும்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'It becomes bigger', ta: 'அது பெரியதாகும்' } },
      { id: 'b', label: 'B', text: { en: 'It becomes smaller', ta: 'அது சிறியதாகும்' } },
      { id: 'c', label: 'C', text: { en: 'It disappears completely', ta: 'அது முற்றிலும் மறைந்துவிடும்' } },
      { id: 'd', label: 'D', text: { en: 'It changes colour', ta: 'அது நிறத்தை மாற்றும்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Moving an object closer to the light source blocks more light, so the shadow cast on the wall becomes larger.',
      ta: 'பொருளை ஒளி மூலத்திற்கு அருகில் நகர்த்தும்போது அதிக ஒளி தடுக்கப்படுவதால் சுவரில் விழும் நிழல் பெரியதாகிறது.',
    },
    hint: {
      en: 'Try making hand shadows on a wall — bring your hand closer to the lamp.',
      ta: 'சுவரில் கை நிழல்களை உருவாக்கிப் பார் — உன் கையை விளக்குக்கு அருகில் கொண்டு வா.',
    },
  },
  {
    id: 'phyf-208',
    subjectId: 'physics',
    pathwayId: 'phy-f-2',
    difficulty: 'advanced',
    question: {
      en: 'An image formed by a plane mirror is always what?',
      ta: 'தள ஆடியால் உருவாகும் பிம்பம் எப்போதும் எப்படி இருக்கும்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Virtual and upright', ta: 'மாயமானதும் நேரானதும்' } },
      { id: 'b', label: 'B', text: { en: 'Real and upside down', ta: 'மெய்யானதும் தலைகீழானதும்' } },
      { id: 'c', label: 'C', text: { en: 'Blurred and colourful', ta: 'மங்கலானதும் வண்ணமயமானதும்' } },
      { id: 'd', label: 'D', text: { en: 'Larger than the object', ta: 'பொருளை விட பெரியது' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'A plane mirror forms a virtual, upright image of the same size as the object, left–right reversed.',
      ta: 'தள ஆடி பொருளின் அளவில், நேரான மற்றும் மாய (virtual) பிம்பத்தை உருவாக்குகிறது; இடது-வலது மாற்றம் இருக்கும்.',
    },
    hint: {
      en: 'You cannot capture this image on a screen.',
      ta: 'இந்தப் பிம்பத்தை திரையில் பிடிக்க முடியாது.',
    },
  },

  // ==================== phy-f-3 Matter & Measurement ====================
  {
    id: 'phyf-301',
    subjectId: 'physics',
    pathwayId: 'phy-f-3',
    difficulty: 'beginner',
    question: {
      en: 'What is the standard (SI) unit of length?',
      ta: 'நீளத்தின் நிலையான (SI) அலகு எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Metre', ta: 'மீட்டர்' } },
      { id: 'b', label: 'B', text: { en: 'Kilogram', ta: 'கிலோகிராம்' } },
      { id: 'c', label: 'C', text: { en: 'Second', ta: 'வினாடி' } },
      { id: 'd', label: 'D', text: { en: 'Litre', ta: 'லிட்டர்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'The metre (m) is the SI unit of length. Longer distances are measured in kilometres (1 km = 1000 m).',
      ta: 'மீட்டர் (m) என்பது நீளத்தின் SI அலகு. நீண்ட தொலைவுகள் கிலோமீட்டரில் அளவிடப்படுகின்றன (1 கிமீ = 1000 மீ).',
    },
    hint: {
      en: 'Used to measure the length of a classroom.',
      ta: 'வகுப்பறையின் நீளத்தை அளக்கப் பயன்படுகிறது.',
    },
  },
  {
    id: 'phyf-302',
    subjectId: 'physics',
    pathwayId: 'phy-f-3',
    difficulty: 'beginner',
    question: {
      en: 'Which instrument is used to measure the mass of an object?',
      ta: 'ஒரு பொருளின் நிறையை அளவிட எந்தக் கருவி பயன்படுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Weighing scale', ta: 'நிறை அளவி' } },
      { id: 'b', label: 'B', text: { en: 'Measuring tape', ta: 'அளவு நாடா' } },
      { id: 'c', label: 'C', text: { en: 'Thermometer', ta: 'வெப்பமானி' } },
      { id: 'd', label: 'D', text: { en: 'Stopwatch', ta: 'நிறுத்து கடிகாரம்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'A weighing scale measures mass, usually in kilograms or grams.',
      ta: 'நிறை அளவி பொருளின் நிறையை கிலோகிராம் அல்லது கிராமில் அளவிடுகிறது.',
    },
    hint: {
      en: 'Found in vegetable shops and kitchens.',
      ta: 'காய்கறி கடைகளிலும் சமையலறைகளிலும் காணப்படுகிறது.',
    },
  },
  {
    id: 'phyf-303',
    subjectId: 'physics',
    pathwayId: 'phy-f-3',
    difficulty: 'beginner',
    question: {
      en: 'How many states of matter are commonly studied?',
      ta: 'பொதுவாக ஆய்வு செய்யப்படும் பொருளின் நிலைகள் எத்தனை?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Three — solid, liquid, gas', ta: 'மூன்று — திண்மம், நீர்மம், வாயு' } },
      { id: 'b', label: 'B', text: { en: 'Two — solid and liquid', ta: 'இரண்டு — திண்மம், நீர்மம்' } },
      { id: 'c', label: 'C', text: { en: 'Four — solid, liquid, gas, light', ta: 'நான்கு — திண்மம், நீர்மம், வாயு, ஒளி' } },
      { id: 'd', label: 'D', text: { en: 'Only one — solid', ta: 'ஒன்று — திண்மம்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Matter commonly exists in three states: solid, liquid, and gas. Ice, water, and steam are the same substance in these three states.',
      ta: 'பொருள் பொதுவாக மூன்று நிலைகளில் உள்ளது: திண்மம், நீர்மம், வாயு. பனிக்கட்டி, நீர், நீராவி ஆகியவை இந்த மூன்று நிலைகளில் உள்ள ஒரே பொருளே.',
    },
    hint: {
      en: 'Think of ice, water, and steam.',
      ta: 'பனிக்கட்டி, நீர், நீராவி பற்றி நினைக்கவும்.',
    },
  },
  {
    id: 'phyf-304',
    subjectId: 'physics',
    pathwayId: 'phy-f-3',
    difficulty: 'intermediate',
    question: {
      en: 'The volume of a liquid is best measured using which instrument?',
      ta: 'நீர்மத்தின் கன அளவை எந்தக் கருவி மூலம் சிறப்பாக அளக்கலாம்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Measuring cylinder', ta: 'அளவு உருளை' } },
      { id: 'b', label: 'B', text: { en: 'Ruler', ta: 'அளவுகோல்' } },
      { id: 'c', label: 'C', text: { en: 'Weighing scale', ta: 'நிறை அளவி' } },
      { id: 'd', label: 'D', text: { en: 'Compass', ta: 'திசைகாட்டி' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'A measuring cylinder has markings (in millilitres) that show exactly how much liquid it holds.',
      ta: 'அளவு உருளையில் மில்லிலிட்டரில் அளவீடுகள் உள்ளன; அது வைத்திருக்கும் நீர்மத்தின் அளவைச் சரியாகக் காட்டுகிறது.',
    },
    hint: {
      en: 'It looks like a tall, narrow glass tube with marks on the side.',
      ta: 'பக்கத்தில் குறிகளுடன் கூடிய நீளமான குறுகிய கண்ணாடி குழாய் போல் தோன்றும்.',
    },
  },
  {
    id: 'phyf-305',
    subjectId: 'physics',
    pathwayId: 'phy-f-3',
    difficulty: 'intermediate',
    question: {
      en: 'Which state of matter has a fixed shape and a fixed volume?',
      ta: 'எந்த நிலைப் பொருளுக்கு நிலையான வடிவமும் நிலையான கன அளவும் உள்ளது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Solid', ta: 'திண்மம்' } },
      { id: 'b', label: 'B', text: { en: 'Liquid', ta: 'நீர்மம்' } },
      { id: 'c', label: 'C', text: { en: 'Gas', ta: 'வாயு' } },
      { id: 'd', label: 'D', text: { en: 'Steam', ta: 'நீராவி' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Solids have tightly packed particles, so they keep a fixed shape and volume. Liquids take the shape of their container.',
      ta: 'திண்மங்களின் துகள்கள் இறுக்கமாக அடைக்கப்பட்டுள்ளதால் அவை நிலையான வடிவத்தையும் கன அளவையும் கொண்டுள்ளன. நீர்மங்கள் தாங்கியின் வடிவத்தை எடுக்கின்றன.',
    },
    hint: {
      en: 'A brick keeps its shape, but water does not.',
      ta: 'செங்கல் அதன் வடிவத்தை வைத்திருக்கும், ஆனால் நீர் வைத்திருப்பதில்லை.',
    },
  },
  {
    id: 'phyf-306',
    subjectId: 'physics',
    pathwayId: 'phy-f-3',
    difficulty: 'intermediate',
    question: {
      en: 'Melting of ice into water is an example of which kind of change?',
      ta: 'பனிக்கட்டி நீராக உருகுவது எந்த வகையான மாற்றத்திற்கு எடுத்துக்காட்டு?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Physical change', ta: 'இயற்பியல் மாற்றம்' } },
      { id: 'b', label: 'B', text: { en: 'Chemical change', ta: 'வேதியியல் மாற்றம்' } },
      { id: 'c', label: 'C', text: { en: 'Biological change', ta: 'உயிரியல் மாற்றம்' } },
      { id: 'd', label: 'D', text: { en: 'No change', ta: 'மாற்றம் இல்லை' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Melting only changes the state; the substance is still water and can be frozen back. So it is a physical change.',
      ta: 'உருகுவது நிலையை மட்டுமே மாற்றுகிறது; பொருள் இன்னும் நீராகவே உள்ளது, மீண்டும் உறைய வைக்கலாம். எனவே இது இயற்பியல் மாற்றம்.',
    },
    hint: {
      en: 'The substance can return to its original form.',
      ta: 'பொருள் அதன் அசல் வடிவத்திற்கு திரும்ப முடியும்.',
    },
  },
  {
    id: 'phyf-307',
    subjectId: 'physics',
    pathwayId: 'phy-f-3',
    difficulty: 'advanced',
    question: {
      en: 'How many metres are there in one kilometre?',
      ta: 'ஒரு கிலோமீட்டரில் எத்தனை மீட்டர்கள் உள்ளன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: '1000 metres', ta: '1000 மீட்டர்கள்' } },
      { id: 'b', label: 'B', text: { en: '100 metres', ta: '100 மீட்டர்கள்' } },
      { id: 'c', label: 'C', text: { en: '10 metres', ta: '10 மீட்டர்கள்' } },
      { id: 'd', label: 'D', text: { en: '10,000 metres', ta: '10,000 மீட்டர்கள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: '1 kilometre (km) = 1000 metres (m). The prefix "kilo" means one thousand.',
      ta: '1 கிலோமீட்டர் (கிமீ) = 1000 மீட்டர்கள் (மீ). "கிலோ" என்ற முன்னொட்டு ஆயிரம் என்பதைக் குறிக்கிறது.',
    },
    hint: {
      en: 'The word "kilo" means thousand.',
      ta: '"கிலோ" என்ற சொல்லுக்கு ஆயிரம் என்று பொருள்.',
    },
  },
  {
    id: 'phyf-308',
    subjectId: 'physics',
    pathwayId: 'phy-f-3',
    difficulty: 'advanced',
    question: {
      en: 'A stone is dropped into a measuring cylinder half-filled with water. The water level rises. What does this tell us?',
      ta: 'பாதி நீர் நிரம்பிய அளவு உருளையில் ஒரு கல் போடப்படுகிறது. நீர் மட்டம் உயர்கிறது. இது என்ன காட்டுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'The stone has volume', ta: 'கல்லுக்கு கன அளவு உள்ளது' } },
      { id: 'b', label: 'B', text: { en: 'The stone is lighter than water', ta: 'கல் நீரை விட இலகுவானது' } },
      { id: 'c', label: 'C', text: { en: 'Water becomes heavier', ta: 'நீர் கனமாகிறது' } },
      { id: 'd', label: 'D', text: { en: 'The stone changes colour', ta: 'கல் நிறத்தை மாற்றுகிறது' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'The rise in water level equals the volume of the stone. This is a way to measure the volume of irregular solids.',
      ta: 'நீர் மட்ட உயர்வு கல்லின் கன அளவிற்கு சமம். ஒழுங்கற்ற திண்மங்களின் கன அளவை அளக்க இது ஒரு முறை.',
    },
    hint: {
      en: 'The stone displaces its own amount of water.',
      ta: 'கல் தன் அளவுக்கு நீரை இடம்பெயரச் செய்கிறது.',
    },
  },
];