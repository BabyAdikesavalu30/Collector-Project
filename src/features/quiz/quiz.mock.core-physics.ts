/**
 * Additional Core-Level Physics Questions (Classes 8–10)
 * Tops up existing core physics pathways to >= 8 questions each:
 * phy-c-1 (Force & Laws of Motion), phy-c-2 (Energy, Work & Power),
 * phy-c-3 (Electricity & Magnetism).
 */

import { QuizQuestion } from './quiz.types';

export const CORE_PHYSICS_QUESTIONS: QuizQuestion[] = [
  // ==================== phy-c-1 (additions) ====================
  {
    id: 'phy-009',
    subjectId: 'physics',
    pathwayId: 'phy-c-1',
    difficulty: 'beginner',
    question: {
      en: 'Friction always acts in which direction relative to motion?',
      ta: 'உராய்வு எப்போதும் இயக்கத்துடன் தொடர்புடைய எந்த திசையில் செயல்படுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Opposite to the motion', ta: 'இயக்கத்திற்கு எதிர் திசையில்' } },
      { id: 'b', label: 'B', text: { en: 'In the same direction as motion', ta: 'இயக்கத்தின் அதே திசையில்' } },
      { id: 'c', label: 'C', text: { en: 'Perpendicular to motion', ta: 'இயக்கத்திற்கு செங்குத்தாக' } },
      { id: 'd', label: 'D', text: { en: 'It does not have a direction', ta: 'அதற்கு திசை இல்லை' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Friction opposes relative motion between surfaces, so it always acts opposite to the direction of motion.',
      ta: 'உராய்வு பரப்புகளுக்கு இடையேயான சார்பு இயக்கத்தை எதிர்க்கிறது, எனவே அது எப்போதும் இயக்கத்திற்கு எதிர் திசையில் செயல்படுகிறது.',
    },
    hint: {
      en: 'Think of pushing a box across a rough floor.',
      ta: 'கரடுமுரடான தரையில் பெட்டியைத் தள்ளுவதை நினைக்கவும்.',
    },
  },
  {
    id: 'phy-010',
    subjectId: 'physics',
    pathwayId: 'phy-c-1',
    difficulty: 'intermediate',
    question: {
      en: 'Which of these has greater inertia?',
      ta: 'இவற்றில் எதற்கு அதிக நிலைமம் (inertia) உள்ளது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'A loaded truck', ta: 'சுமை ஏற்றிய லாரி' } },
      { id: 'b', label: 'B', text: { en: 'A bicycle', ta: 'மிதிவண்டி' } },
      { id: 'c', label: 'C', text: { en: 'A football', ta: 'கால்பந்து' } },
      { id: 'd', label: 'D', text: { en: 'A cricket ball', ta: 'கிரிக்கெட் பந்து' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Inertia depends on mass — the greater the mass, the greater the resistance to a change in motion.',
      ta: 'நிலைமம் நிறையைப் பொறுத்தது — நிறை அதிகமானால் இயக்க மாற்றத்திற்கு எதிர்ப்பும் அதிகம்.',
    },
    hint: {
      en: 'More mass means more inertia.',
      ta: 'அதிக நிறை = அதிக நிலைமம்.',
    },
  },
  {
    id: 'phy-011',
    subjectId: 'physics',
    pathwayId: 'phy-c-1',
    difficulty: 'advanced',
    question: {
      en: 'A rocket moves forward by pushing hot gases backward. Which law explains this?',
      ta: 'சூடான வாயுக்களை பின்னோக்கி தள்ளுவதன் மூலம் ராக்கெட் முன்னோக்கி நகர்கிறது. இதை விளக்கும் விதி எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: "Newton's Third Law", ta: 'நியூட்டனின் மூன்றாம் விதி' } },
      { id: 'b', label: 'B', text: { en: "Newton's First Law", ta: 'நியூட்டனின் முதல் விதி' } },
      { id: 'c', label: 'C', text: { en: 'Law of Gravitation', ta: 'ஈர்ப்பு விதி' } },
      { id: 'd', label: 'D', text: { en: 'Law of Inertia', ta: 'நிலைம விதி' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'For every action there is an equal and opposite reaction: the gases pushed back push the rocket forward.',
      ta: 'ஒவ்வொரு செயலுக்கும் சமமான எதிர் செயல் உண்டு: பின்னோக்கி தள்ளப்படும் வாயுக்கள் ராக்கெட்டை முன்னோக்கி தள்ளுகின்றன.',
    },
    hint: {
      en: 'Action and reaction are equal and opposite.',
      ta: 'செயலும் எதிர்ச்செயலும் சமமானவை, எதிர் திசையின.',
    },
  },

  // ==================== phy-c-2 (additions) ====================
  {
    id: 'phy-012',
    subjectId: 'physics',
    pathwayId: 'phy-c-2',
    difficulty: 'beginner',
    question: {
      en: 'The energy possessed by a moving object is called what?',
      ta: 'நகரும் பொருளிடம் உள்ள ஆற்றல் என்ன அழைக்கப்படுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Kinetic energy', ta: 'இயக்க ஆற்றல்' } },
      { id: 'b', label: 'B', text: { en: 'Potential energy', ta: 'நிலை ஆற்றல்' } },
      { id: 'c', label: 'C', text: { en: 'Chemical energy', ta: 'வேதி ஆற்றல்' } },
      { id: 'd', label: 'D', text: { en: 'Nuclear energy', ta: 'அணு ஆற்றல்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Kinetic energy is the energy an object has because of its motion (KE = ½mv²).',
      ta: 'இயக்கத்தின் காரணமாக ஒரு பொருளிடம் உள்ள ஆற்றல் இயக்க ஆற்றல் (KE = ½mv²).',
    },
    hint: {
      en: 'Energy of motion.',
      ta: 'இயக்கத்தின் ஆற்றல்.',
    },
  },
  {
    id: 'phy-013',
    subjectId: 'physics',
    pathwayId: 'phy-c-2',
    difficulty: 'beginner',
    question: {
      en: 'A stone kept on a shelf has stored energy due to its height. What is this energy called?',
      ta: 'அலமாரியில் வைக்கப்பட்டுள்ள கல்லுக்கு அதன் உயரத்தால் சேமிக்கப்பட்ட ஆற்றல் உள்ளது. இந்த ஆற்றல் என்ன அழைக்கப்படுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Gravitational potential energy', ta: 'ஈர்ப்பு நிலை ஆற்றல்' } },
      { id: 'b', label: 'B', text: { en: 'Kinetic energy', ta: 'இயக்க ஆற்றல்' } },
      { id: 'c', label: 'C', text: { en: 'Sound energy', ta: 'ஒலி ஆற்றல்' } },
      { id: 'd', label: 'D', text: { en: 'Light energy', ta: 'ஒளி ஆற்றல்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Gravitational potential energy is the energy stored in an object due to its position above the ground (PE = mgh).',
      ta: 'பூமியிலிருந்து உயரத்தில் உள்ள பொருளிடம் சேமிக்கப்படும் ஆற்றல் ஈர்ப்பு நிலை ஆற்றல் (PE = mgh).',
    },
    hint: {
      en: 'Higher shelf, more of this energy.',
      ta: 'உயரமான அலமாரி = அதிக இந்த ஆற்றல்.',
    },
  },
  {
    id: 'phy-014',
    subjectId: 'physics',
    pathwayId: 'phy-c-2',
    difficulty: 'intermediate',
    question: {
      en: 'The rate of doing work is called what?',
      ta: 'வேலை செய்யப்படும் வீதம் என்ன அழைக்கப்படுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Power', ta: 'திறன் (பவர்)' } },
      { id: 'b', label: 'B', text: { en: 'Force', ta: 'விசை' } },
      { id: 'c', label: 'C', text: { en: 'Momentum', ta: 'உந்தம்' } },
      { id: 'd', label: 'D', text: { en: 'Pressure', ta: 'அழுத்தம்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Power = Work ÷ Time, measured in watts (W). 1 watt = 1 joule per second.',
      ta: 'திறன் = வேலை ÷ நேரம்; வாட் (W) அலகில் அளக்கப்படுகிறது. 1 வாட் = 1 ஜூல்/வினாடி.',
    },
    hint: {
      en: 'Measured in watts, named after James Watt.',
      ta: 'ஜேம்ஸ் வாட்டின் பெயரில் வாட் என்ற அலகில் அளக்கப்படுகிறது.',
    },
  },
  {
    id: 'phy-015',
    subjectId: 'physics',
    pathwayId: 'phy-c-2',
    difficulty: 'intermediate',
    question: {
      en: 'When a ball is dropped from a height, what energy change happens as it falls?',
      ta: 'உயரத்திலிருந்து பந்து கீழே விழும்போது என்ன ஆற்றல் மாற்றம் நடக்கிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Potential energy changes into kinetic energy', ta: 'நிலை ஆற்றல் இயக்க ஆற்றலாக மாறுகிறது' } },
      { id: 'b', label: 'B', text: { en: 'Kinetic energy changes into potential energy', ta: 'இயக்க ஆற்றல் நிலை ஆற்றலாக மாறுகிறது' } },
      { id: 'c', label: 'C', text: { en: 'Energy disappears completely', ta: 'ஆற்றல் முற்றிலும் மறைகிறது' } },
      { id: 'd', label: 'D', text: { en: 'No energy change occurs', ta: 'ஆற்றல் மாற்றம் ஏதும் இல்லை' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'As the ball falls, its height decreases (potential energy decreases) while its speed increases (kinetic energy increases).',
      ta: 'பந்து விழும்போது அதன் உயரம் குறைகிறது (நிலை ஆற்றல் குறைகிறது), வேகம் அதிகரிக்கிறது (இயக்க ஆற்றல் அதிகரிக்கிறது).',
    },
    hint: {
      en: 'Falling converts stored energy into motion energy.',
      ta: 'விழுவது சேமித்த ஆற்றலை இயக்க ஆற்றலாக மாற்றுகிறது.',
    },
  },
  {
    id: 'phy-016',
    subjectId: 'physics',
    pathwayId: 'phy-c-2',
    difficulty: 'intermediate',
    question: {
      en: 'An electric motor converts electrical energy into which form of energy?',
      ta: 'மின்னோடி (motor) மின்னாற்றலை எந்த வகை ஆற்றலாக மாற்றுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Mechanical (kinetic) energy', ta: 'இயந்திர (இயக்க) ஆற்றல்' } },
      { id: 'b', label: 'B', text: { en: 'Sound energy only', ta: 'ஒலி ஆற்றல் மட்டும்' } },
      { id: 'c', label: 'C', text: { en: 'Nuclear energy', ta: 'அணு ஆற்றல்' } },
      { id: 'd', label: 'D', text: { en: 'Gravitational energy', ta: 'ஈர்ப்பு ஆற்றல்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'A motor turns electrical energy into mechanical energy — the spinning of fans, mixers, and machines.',
      ta: 'மின்னோடி மின்னாற்றலை இயந்திர ஆற்றலாக மாற்றுகிறது — விசிறி, மிக்சி, இயந்திரங்களின் சுழற்சி.',
    },
    hint: {
      en: 'Think of a ceiling fan.',
      ta: 'மேல் விசிறியை நினைக்கவும்.',
    },
  },
  {
    id: 'phy-017',
    subjectId: 'physics',
    pathwayId: 'phy-c-2',
    difficulty: 'advanced',
    question: {
      en: 'The kilowatt-hour (kWh) is the commercial unit of which quantity?',
      ta: 'கிலோவாட்-மணி (kWh) என்பது எந்த அளவின் வணிக அலகு?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Electrical energy', ta: 'மின்னாற்றல்' } },
      { id: 'b', label: 'B', text: { en: 'Electric current', ta: 'மின்னோட்டம்' } },
      { id: 'c', label: 'C', text: { en: 'Electric power', ta: 'மின்திறன்' } },
      { id: 'd', label: 'D', text: { en: 'Resistance', ta: 'மின்தடை' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Electricity bills measure the electrical energy you consume in kilowatt-hours: 1 kWh = 3.6 × 10⁶ J.',
      ta: 'மின்கட்டண பட்டியல்கள் நீங்கள் பயன்படுத்தும் மின்னாற்றலை கிலோவாட்-மணியில் அளக்கின்றன: 1 kWh = 3.6 × 10⁶ J.',
    },
    hint: {
      en: 'What your electricity bill charges you for.',
      ta: 'உங்கள் மின்கட்டண பட்டியலில் கட்டணம் வசூலிக்கப்படுவது.',
    },
  },
  {
    id: 'phy-018',
    subjectId: 'physics',
    pathwayId: 'phy-c-2',
    difficulty: 'advanced',
    question: {
      en: 'According to the law of conservation of energy, energy can be what?',
      ta: 'ஆற்றல் மாறா விதிப்படி, ஆற்றலை என்ன செய்ய முடியும்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Converted from one form to another but never created or destroyed', ta: 'ஒரு வடிவத்திலிருந்து மற்றொன்றுக்கு மாற்ற முடியும், ஆனால் உருவாக்கவோ அழிக்கவோ முடியாது' } },
      { id: 'b', label: 'B', text: { en: 'Created from nothing', ta: 'இல்லாததிலிருந்து உருவாக்கலாம்' } },
      { id: 'c', label: 'C', text: { en: 'Destroyed completely', ta: 'முற்றிலும் அழிக்கலாம்' } },
      { id: 'd', label: 'D', text: { en: 'Stored forever without changing', ta: 'மாறாமல் என்றென்றும் சேமிக்கலாம்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Energy can change form (e.g., electrical to light and heat in a bulb) but the total energy in a closed system stays constant.',
      ta: 'ஆற்றல் வடிவம் மாறலாம் (எ.கா., மின்னாற்றல் ஒளி மற்றும் வெப்பமாக), ஆனால் மூடிய அமைப்பில் மொத்த ஆற்றல் மாறாமல் இருக்கும்.',
    },
    hint: {
      en: 'Energy is neither created nor destroyed.',
      ta: 'ஆற்றல் உருவாக்கப்படுவதுமில்லை, அழிக்கப்படுவதுமில்லை.',
    },
  },

  // ==================== phy-c-3 (additions) ====================
  {
    id: 'phy-019',
    subjectId: 'physics',
    pathwayId: 'phy-c-3',
    difficulty: 'beginner',
    question: {
      en: 'Which of these is needed to make a simple electric circuit work?',
      ta: 'எளிய மின்சுற்று இயங்க என்ன தேவை?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'A battery, wires, and a bulb', ta: 'மின்கலம், கம்பிகள் மற்றும் விளக்கு' } },
      { id: 'b', label: 'B', text: { en: 'Only a bulb', ta: 'விளக்கு மட்டும்' } },
      { id: 'c', label: 'C', text: { en: 'Only wires', ta: 'கம்பிகள் மட்டும்' } },
      { id: 'd', label: 'D', text: { en: 'A magnet and a bulb', ta: 'காந்தம் மற்றும் விளக்கு' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'A complete circuit needs a source of electricity (battery), conducting wires, and a device like a bulb that uses the current.',
      ta: 'முழுமையான மின்சுற்றுக்கு மின்சார மூலம் (மின்கலம்), கடத்தும் கம்பிகள், மின்னோட்டத்தைப் பயன்படுத்தும் சாதனம் (விளக்கு) தேவை.',
    },
    hint: {
      en: 'All three must be connected in a closed loop.',
      ta: 'மூன்றும் மூடிய வளையமாக இணைக்கப்பட வேண்டும்.',
    },
  },
  {
    id: 'phy-020',
    subjectId: 'physics',
    pathwayId: 'phy-c-3',
    difficulty: 'beginner',
    question: {
      en: 'Which material allows electric current to pass through it easily?',
      ta: 'எந்தப் பொருள் மின்னோட்டத்தை எளிதாக கடந்து செல்ல அனுமதிக்கிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Copper', ta: 'செம்பு' } },
      { id: 'b', label: 'B', text: { en: 'Rubber', ta: 'ரப்பர்' } },
      { id: 'c', label: 'C', text: { en: 'Wood', ta: 'மரம்' } },
      { id: 'd', label: 'D', text: { en: 'Plastic', ta: 'பிளாஸ்டிக்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Copper is a good conductor of electricity, which is why electric wires are made of copper.',
      ta: 'செம்பு மின்சாரத்தின் சிறந்த கடத்தி; அதனால்தான் மின்கம்பிகள் செம்பால் செய்யப்படுகின்றன.',
    },
    hint: {
      en: 'Metals are good conductors.',
      ta: 'உலோகங்கள் நல்ல கடத்திகள்.',
    },
  },
  {
    id: 'phy-021',
    subjectId: 'physics',
    pathwayId: 'phy-c-3',
    difficulty: 'intermediate',
    question: {
      en: 'In a series circuit, if one bulb fuses (blows), what happens to the others?',
      ta: 'தொடர் மின்சுற்றில் ஒரு விளக்கு எரிந்து போனால் மற்றவைகளுக்கு என்ன நடக்கும்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'All the other bulbs also go off', ta: 'மற்ற அனைத்து விளக்குகளும் அணைந்துவிடும்' } },
      { id: 'b', label: 'B', text: { en: 'The others glow brighter', ta: 'மற்றவை அதிக ஒளியுடன் எரியும்' } },
      { id: 'c', label: 'C', text: { en: 'Nothing changes', ta: 'எந்த மாற்றமும் இல்லை' } },
      { id: 'd', label: 'D', text: { en: 'The circuit becomes a parallel circuit', ta: 'மின்சுற்று பக்க மின்சுற்றாக மாறும்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'In a series circuit there is only one path for current. When one bulb fuses, the circuit breaks and all bulbs go off.',
      ta: 'தொடர் மின்சுற்றில் மின்னோட்டத்திற்கு ஒரே பாதை மட்டுமே. ஒரு விளக்கு எரிந்தால் மின்சுற்று துண்டிக்கப்பட்டு அனைத்து விளக்குகளும் அணைகின்றன.',
    },
    hint: {
      en: 'One path for current — one break stops everything.',
      ta: 'மின்னோட்டத்திற்கு ஒரே பாதை — ஒரு துண்டிப்பு அனைத்தையும் நிறுத்தும்.',
    },
  },
  {
    id: 'phy-022',
    subjectId: 'physics',
    pathwayId: 'phy-c-3',
    difficulty: 'intermediate',
    question: {
      en: 'What is the SI unit of electrical resistance?',
      ta: 'மின்தடையின் SI அலகு எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Ohm (Ω)', ta: 'ஓம் (Ω)' } },
      { id: 'b', label: 'B', text: { en: 'Volt (V)', ta: 'வோல்ட் (V)' } },
      { id: 'c', label: 'C', text: { en: 'Ampere (A)', ta: 'ஆம்பியர் (A)' } },
      { id: 'd', label: 'D', text: { en: 'Watt (W)', ta: 'வாட் (W)' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Resistance is measured in ohms (Ω), named after Georg Ohm who discovered Ohm\'s law.',
      ta: 'மின்தடை ஓம் (Ω) அலகில் அளக்கப்படுகிறது; ஓம் விதியைக் கண்டுபிடித்த ஜார்ஜ் ஓம் நினைவாக இப்பெயர்.',
    },
    hint: {
      en: 'Named after the scientist behind V = IR.',
      ta: 'V = IR விதியின் அறிஞரின் பெயர்.',
    },
  },
  {
    id: 'phy-023',
    subjectId: 'physics',
    pathwayId: 'phy-c-3',
    difficulty: 'advanced',
    question: {
      en: 'Which of these devices works on the heating effect of electric current?',
      ta: 'இவற்றில் எந்த சாதனம் மின்னோட்டத்தின் வெப்ப விளைவில் செயல்படுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Electric iron', ta: 'மின்சார இசுத்திரி' } },
      { id: 'b', label: 'B', text: { en: 'Electric bell', ta: 'மின்சார மணி' } },
      { id: 'c', label: 'C', text: { en: 'Microphone', ta: 'ஒலிவாங்கி' } },
      { id: 'd', label: 'D', text: { en: 'Dynamo', ta: 'டைனமோ' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'When current flows through a high-resistance coil, it produces heat — used in electric irons, heaters, and kettles.',
      ta: 'அதிக மின்தடை சுருளில் மின்னோட்டம் பாயும்போது வெப்பம் உருவாகிறது — மின்சார இசுத்திரி, ஹீட்டர், கெட்டில் போன்றவற்றில் இது பயன்படுகிறது.',
    },
    hint: {
      en: 'A device that gets hot when switched on.',
      ta: 'இயக்கும்போது சூடாகும் சாதனம்.',
    },
  },
  {
    id: 'phy-024',
    subjectId: 'physics',
    pathwayId: 'phy-c-3',
    difficulty: 'advanced',
    question: {
      en: 'Outside a bar magnet, magnetic field lines run in which direction?',
      ta: 'காந்தக் கம்பிக்கு வெளியே காந்தப்புலக் கோடுகள் எந்த திசையில் செல்கின்றன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'From north pole to south pole', ta: 'வட துருவத்திலிருந்து தென் துருவத்திற்கு' } },
      { id: 'b', label: 'B', text: { en: 'From south pole to north pole', ta: 'தென் துருவத்திலிருந்து வட துருவத்திற்கு' } },
      { id: 'c', label: 'C', text: { en: 'In circles only', ta: 'வட்டங்களில் மட்டும்' } },
      { id: 'd', label: 'D', text: { en: 'They do not exist outside the magnet', ta: 'காந்தத்திற்கு வெளியே அவை இல்லை' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Field lines emerge from the north pole and enter the south pole outside the magnet; inside, they go from south to north.',
      ta: 'காந்தத்திற்கு வெளியே புலக்கோடுகள் வட துருவத்திலிருந்து தென் துருவத்திற்கு செல்கின்றன; உள்ளே தென் துருவத்திலிருந்து வட துருவத்திற்கு.',
    },
    hint: {
      en: 'From N to S on the outside.',
      ta: 'வெளியே N இலிருந்து S க்கு.',
    },
  },
];