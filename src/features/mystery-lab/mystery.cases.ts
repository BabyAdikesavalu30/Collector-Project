/**
 * Vigyaan Mystery Lab — Case Dataset
 * 30+ deterministic local cases across Physics, Chemistry, Biology, Space,
 * Environment, Human Body, Everyday Science, and Scientific History.
 * All cases include English + Tamil translations.
 */

import { MysteryCase } from './mystery.types';

// ============================================================================
// PHYSICS CASES
// ============================================================================

const PHYSICS_CIRCUIT_001: MysteryCase = {
  id: 'physics-circuit-001',
  title: { en: 'The Missing Battery', ta: 'மறந்துபோன மின்கலம்' },
  description: {
    en: 'A science lab device stopped working. Investigate the components to find out why.',
    ta: 'ஒரு அறிவியல் ஆய்வக சாதனம் வேலை செய்யாமல் போனது. ஏன் என்று கண்டறிய உதிரிபாகங்களை ஆய்வு செய்யுங்கள்.',
  },
  category: 'physics',
  gradeRange: '8-10',
  difficulty: 'intermediate',
  estimatedMinutes: 5,
  objective: { en: 'Find out why the device stopped working.', ta: 'சாதனம் ஏன் நின்றது என்று கண்டறியுங்கள்.' },
  clues: [
    { id: 'c001-clue1', title: { en: 'Voltage Reading', ta: 'மின்னழுத்த அளவீடு' }, observation: { en: 'Battery voltage measures 0V instead of the expected 1.5V.', ta: 'மின்கல மின்னழுத்தம் எதிர்பார்க்கப்படும் 1.5V க்குப் பதிலாக 0V அளவிடப்படுகிறது.' }, type: 'measurement', relevance: 'essential', dataLabel: { en: 'Voltage', ta: 'மின்னழுத்தம்' }, dataValue: { en: '0 V', ta: '0 V' }, icon: '🔋' },
    { id: 'c001-clue2', title: { en: 'Bulb Test', ta: 'விளக்கு சோதனை' }, observation: { en: 'The bulb works correctly when tested with a separate battery.', ta: 'தனி மின்கலத்துடன் சோதிக்கும் போது விளக்கு சரியாக வேலை செய்கிறது.' }, type: 'observation', relevance: 'supporting', icon: '💡' },
    { id: 'c001-clue3', title: { en: 'Wire Inspection', ta: 'கம்பி ஆய்வு' }, observation: { en: 'One wire is disconnected from the circuit board.', ta: 'ஒரு கம்பி சுற்றுப்பலகையில் இருந்து துண்டிக்கப்பட்டுள்ளது.' }, type: 'observation', relevance: 'essential', icon: '🔌' },
    { id: 'c001-clue4', title: { en: 'Switch Status', ta: 'ஸ்விட்ச் நிலை' }, observation: { en: 'The switch is in the OFF position.', ta: 'ஸ்விட்ச் OFF நிலையில் உள்ளது.' }, type: 'observation', relevance: 'supporting', icon: '🔘' },
  ],
  hypotheses: [
    { id: 'h1', title: { en: 'Battery is empty', ta: 'மின்கலம் காலியாகிவிட்டது' }, explanation: { en: 'The battery has no charge left.', ta: 'மின்கலத்தில் மின்சாரம் இல்லை.' } },
    { id: 'h2', title: { en: 'Bulb is broken', ta: 'விளக்கு உடைந்தது' }, explanation: { en: 'The light bulb has burned out.', ta: 'மின்விளக்கு எரிந்துவிட்டது.' } },
    { id: 'h3', title: { en: 'Wire connection failed', ta: 'கம்பி இணைப்பு தோல்வி' }, explanation: { en: 'The disconnected wire broke the circuit path.', ta: 'துண்டிக்கப்பட்ட கம்பி மின்சுற்று பாதையை உடைத்தது.' } },
    { id: 'h4', title: { en: 'Switch caused overload', ta: 'ஸ்விட்ச் அதிக சுமை ஏற்படுத்தியது' }, explanation: { en: 'The switch created an electrical overload.', ta: 'ஸ்விட்ச் மின் அதிக சுமையை உருவாக்கியது.' } },
  ],
  correctHypothesisId: 'h3',
  explanation: {
    en: 'A circuit needs a complete conducting path for current to flow. The disconnected wire broke the circuit, preventing the device from working. The battery was fine, the bulb was fine — only the wire connection was the issue.',
    ta: 'மின்சுற்றில் மின்னோட்டம் செல்ல ஒரு முழுமையான கடத்தும் பாதை தேவை. துண்டிக்கப்பட்ட கம்பி மின்சுற்றை உடைத்து, சாதனம் வேலை செய்வதைத் தடுத்தது. மின்கலம் நன்றாக இருந்தது, விளக்கு நன்றாக இருந்தது — கம்பி இணைப்பு மட்டுமே பிரச்சனை.',
  },
  learningConcepts: ['circuit-completion', 'conductors', 'electrical-path'],
  learningConceptIds: ['circuit-lab-basics', 'conductors-insulators'],
  rewards: { xp: 50 },
  hints: [
    { id: 'hint-1', text: { en: 'Check the electrical connections carefully.', ta: 'மின் இணைப்புகளை கவனமாக சரிபாருங்கள்.' }, cost: { scoreDeduction: 5 } },
    { id: 'hint-2', text: { en: 'One component is physically disconnected.', ta: 'ஒரு உதிரிபாகம் உடல் ரீதியாக துண்டிக்கப்பட்டுள்ளது.' }, cost: { scoreDeduction: 10 } },
    { id: 'hint-3', text: { en: 'Inspect the wire — it is not connected properly.', ta: 'கம்பியை ஆய்வு செய்யுங்கள் — அது சரியாக இணைக்கப்படவில்லை.' }, cost: { scoreDeduction: 15 } },
  ],
  sceneObjects: [
    { id: 'obj-battery', label: { en: 'Battery', ta: 'மின்கலம்' }, description: { en: 'A standard 1.5V dry cell battery.', ta: 'ஒரு நிலையான 1.5V உலர் கல மின்கலம்.' }, clueConnectionId: 'c001-clue1', icon: '🔋', position: { x: 20, y: 40 } },
    { id: 'obj-bulb', label: { en: 'Bulb', ta: 'விளக்கு' }, description: { en: 'A small incandescent bulb.', ta: 'ஒரு சிறிய இன்கான்டசன்ட் விளக்கு.' }, clueConnectionId: 'c001-clue2', icon: '💡', position: { x: 50, y: 30 } },
    { id: 'obj-wire', label: { en: 'Wire', ta: 'கம்பி' }, description: { en: 'A copper connecting wire.', ta: 'ஒரு செம்பு இணைப்பு கம்பி.' }, clueConnectionId: 'c001-clue3', icon: '🔌', position: { x: 80, y: 50 } },
    { id: 'obj-switch', label: { en: 'Switch', ta: 'ஸ்விட்ச்' }, description: { en: 'A toggle switch.', ta: 'ஒரு டோகல் ஸ்விட்ச்.' }, clueConnectionId: 'c001-clue4', icon: '🔘', position: { x: 50, y: 70 } },
  ],
  evidenceConnections: [
    { fromClueId: 'c001-clue1', toClueId: 'c001-clue3', relation: 'explains' },
  ],
  evidenceRules: [
    { clueIds: ['c001-clue1', 'c001-clue3'], supportsHypothesisIds: ['h3'] },
  ],
};

const PHYSICS_FORCE_001: MysteryCase = {
  id: 'physics-force-001',
  title: { en: 'The Sliding Box', ta: 'நகரும் பெட்டி' },
  description: {
    en: 'A box on a table keeps sliding off. Investigate the forces acting on it.',
    ta: 'ஒரு மேசையில் உள்ள பெட்டி தொடர்ந்து சறுக்கி விழுகிறது. அதன் மீது செயல்படும் விசைகளை ஆய்வு செய்யுங்கள்.',
  },
  category: 'physics',
  gradeRange: '8-10',
  difficulty: 'intermediate',
  estimatedMinutes: 5,
  objective: { en: 'Determine why the box keeps sliding off the table.', ta: 'பெட்டி ஏன் மேசையில் இருந்து சறுக்குகிறது என்று நிர்ணயியுங்கள்.' },
  clues: [
    { id: 'f001-clue1', title: { en: 'Surface Texture', ta: 'பரப்பு அமைப்பு' }, observation: { en: 'The table surface is smooth and polished.', ta: 'மேசை பரப்பு மென்மையாகவும் மெருகூட்டப்பட்டதாகவும் உள்ளது.' }, type: 'observation', relevance: 'essential', icon: '🪵' },
    { id: 'f001-clue2', title: { en: 'Box Weight', ta: 'பெட்டி எடை' }, observation: { en: 'The box weighs 2 kg — relatively light for its size.', ta: 'பெட்டி 2 கிலோ எடை கொண்டது — அதன் அளவுக்கு ஒப்பிடும் போது இலேசானது.' }, type: 'measurement', relevance: 'supporting', dataLabel: { en: 'Weight', ta: 'எடை' }, dataValue: { en: '2 kg', ta: '2 கிலோ' }, icon: '⚖️' },
    { id: 'f001-clue3', title: { en: 'Tilt Check', ta: 'சாய்வு சரிபார்ப்பு' }, observation: { en: 'The table is slightly tilted by 3 degrees.', ta: 'மேசை 3 டிகிரி சற்று சாய்ந்துள்ளது.' }, type: 'measurement', relevance: 'essential', dataLabel: { en: 'Tilt', ta: 'சாய்வு' }, dataValue: { en: '3°', ta: '3°' }, icon: '📐' },
    { id: 'f001-clue4', title: { en: 'Friction Test', ta: 'உராய்வு சோதனை' }, observation: { en: 'A rubber mat prevents sliding when placed under the box.', ta: 'பெட்டிக்கு அடியில் ரப்பர் பாய் வைக்கும் போது சறுக்குவது தடுக்கப்படுகிறது.' }, type: 'observation', relevance: 'supporting', icon: '🧱' },
  ],
  hypotheses: [
    { id: 'h1', title: { en: 'Gravity is stronger', ta: 'ஈர்ப்பு விசை வலுவானது' }, explanation: { en: 'Gravity is pulling harder than normal.', ta: 'ஈர்ப்பு விசை இயல்பை விட கடுமையாக இழுக்கிறது.' } },
    { id: 'h2', title: { en: 'Low friction caused sliding', ta: 'குறைந்த உராய்வு சறுக்கலை ஏற்படுத்தியது' }, explanation: { en: 'The smooth table and light box created insufficient friction.', ta: 'மென்மையான மேசை மற்றும் இலேசான பெட்டி போதுமான உராய்வை உருவாக்கவில்லை.' } },
    { id: 'h3', title: { en: 'Wind pushed the box', ta: 'காற்று பெட்டியை தள்ளியது' }, explanation: { en: 'A fan was blowing on the box.', ta: 'ஒரு விசிறி பெட்டியில் காற்று வீசியது.' } },
    { id: 'h4', title: { en: 'Magnetic force', ta: 'காந்த விசை' }, explanation: { en: 'A magnet under the table pulled the box.', ta: 'மேசைக்கு அடியில் உள்ள காந்தம் பெட்டியை இழுத்தது.' } },
  ],
  correctHypothesisId: 'h2',
  explanation: {
    en: 'The tilted table (3°) created a gravitational component pulling the box sideways. Combined with the smooth, polished surface offering low friction, the light box easily slid off. Adding a rubber mat increased friction enough to prevent sliding.',
    ta: 'சாய்ந்த மேசை (3°) பெட்டியை பக்கவாட்டில் இழுக்கும் ஒரு ஈர்ப்பு கூறு உருவாக்கியது. மென்மையான, மெருகூட்டப்பட்ட பரப்பு குறைந்த உராய்வை வழங்கியதுடன் சேர்ந்து, இலேசான பெட்டி எளிதாக சறுக்கியது. ரப்பர் பாய் சேர்த்தது சறுக்குவதைத் தடுக்கும் அளவுக்கு உராய்வை அதிகரித்தது.',
  },
  learningConcepts: ['friction', 'force', 'gravity', 'inclined-plane'],
  learningConceptIds: ['friction-basics', 'forces-motion'],
  rewards: { xp: 50 },
  hints: [
    { id: 'hint-1', text: { en: 'Consider the surface conditions and the angle of the table.', ta: 'பரப்பு நிலைமைகள் மற்றும் மேசையின் கோணத்தை கருத்தில் கொள்ளுங்கள்.' }, cost: { scoreDeduction: 5 } },
    { id: 'hint-2', text: { en: 'The table tilt and smooth surface work together.', ta: 'மேசை சாய்வு மற்றும் மென்மையான பரப்பு ஒன்றாக செயல்படுகின்றன.' }, cost: { scoreDeduction: 10 } },
    { id: 'hint-3', text: { en: 'Friction is the key — the smooth table has too little of it.', ta: 'உராய்வு முக்கியமானது — மென்மையான மேசையில் மிகவும் குறைவாக உள்ளது.' }, cost: { scoreDeduction: 15 } },
  ],
  sceneObjects: [
    { id: 'obj-table', label: { en: 'Table Surface', ta: 'மேசை பரப்பு' }, description: { en: 'A smooth polished wooden surface.', ta: 'ஒரு மென்மையான மெருகூட்டப்பட்ட மர பரப்பு.' }, clueConnectionId: 'f001-clue1', icon: '🪵', position: { x: 50, y: 50 } },
    { id: 'obj-box', label: { en: 'Box', ta: 'பெட்டி' }, description: { en: 'A light cardboard box.', ta: 'ஒரு இலேசான அட்டை பெட்டி.' }, clueConnectionId: 'f001-clue2', icon: '📦', position: { x: 30, y: 40 } },
    { id: 'obj-level', label: { en: 'Spirit Level', ta: 'ஸ்பிரிட் லெவல்' }, description: { en: 'Shows the table is tilted.', ta: 'மேசை சாய்ந்துள்ளதை காட்டுகிறது.' }, clueConnectionId: 'f001-clue3', icon: '📐', position: { x: 70, y: 60 } },
    { id: 'obj-mat', label: { en: 'Rubber Mat', ta: 'ரப்பர் பாய்' }, description: { en: 'A high-friction rubber mat.', ta: 'உயர் உராய்வு ரப்பர் பாய்.' }, clueConnectionId: 'f001-clue4', icon: '🧱', position: { x: 70, y: 30 } },
  ],
  evidenceRules: [
    { clueIds: ['f001-clue1', 'f001-clue3'], supportsHypothesisIds: ['h2'] },
  ],
};

const PHYSICS_SOUND_001: MysteryCase = {
  id: 'physics-sound-001',
  title: { en: 'The Silent Bell', ta: 'சத்தமில்லா மணி' },
  description: {
    en: 'A bell in the school corridor stopped ringing. Students can see it but hear nothing.',
    ta: 'பள்ளி வளாகத்தில் உள்ள மணி ஒலிக்காமல் நின்றது. மாணவர்கள் அதை பார்க்க முடியும் ஆனால் ஒன்றும் கேட்கவில்லை.',
  },
  category: 'physics',
  gradeRange: '6-7',
  difficulty: 'beginner',
  estimatedMinutes: 3,
  objective: { en: 'Find out why the bell is silent.', ta: 'மணி ஏன் சத்தமில்லாமல் இருக்கிறது என்று கண்டறியுங்கள்.' },
  clues: [
    { id: 's001-clue1', title: { en: 'Visual Inspection', ta: 'காட்சி ஆய்வு' }, observation: { en: 'The bell clapper is missing.', ta: 'மணியின் அடிக்கும் கோல் இல்லை.' }, type: 'observation', relevance: 'essential', icon: '🔔' },
    { id: 's001-clue2', title: { en: 'String Check', ta: 'கயிறு சரிபார்ப்பு' }, observation: { en: 'The pull string is intact and connected.', ta: 'இழுக்கும் கயிறு சரியாகவும் இணைக்கப்பட்டதாகவும் உள்ளது.' }, type: 'observation', relevance: 'supporting', icon: '🪢' },
    { id: 's001-clue3', title: { en: 'Wall Mount', ta: 'சுவர் பிணைப்பு' }, observation: { en: 'The bell is securely mounted on the wall.', ta: 'மணி சுவரில் பாதுகாப்பாக பொருத்தப்பட்டுள்ளது.' }, type: 'observation', relevance: 'distractor', icon: '🏗️' },
  ],
  hypotheses: [
    { id: 'h1', title: { en: 'Bell clapper is missing', ta: 'மணியின் கோல் இல்லை' }, explanation: { en: 'The metal clapper fell off or was removed.', ta: 'உலோக கோல் விழுந்தது அல்லது அகற்றப்பட்டது.' } },
    { id: 'h2', title: { en: 'String is broken', ta: 'கயிறு உடைந்தது' }, explanation: { en: 'The pull string snapped.', ta: 'இழுக்கும் கயிறு அறுந்தது.' } },
    { id: 'h3', title: { en: 'Bell is broken', ta: 'மணி உடைந்தது' }, explanation: { en: 'The bell body is cracked.', ta: 'மணியின் உடல் விரிசல் அடைந்தது.' } },
  ],
  correctHypothesisId: 'h1',
  explanation: {
    en: 'A bell needs a clapper (the small metal ball inside) to strike the bell body and produce sound. Without the clapper, pulling the string does nothing — no sound is produced. The string and wall mount are fine.',
    ta: 'மணிக்கு ஒலி உருவாக்க மணியின் உடலை அடிக்க ஒரு கோல் (உள்ளே உள்ள சிறிய உலோக பந்து) தேவை. கோல் இல்லாமல், கயிறை இழுப்பது எதுவும் செய்யாது — ஒலி உருவாக்கப்படாது.',
  },
  learningConcepts: ['sound-production', 'vibration'],
  learningConceptIds: ['sound-basics'],
  rewards: { xp: 30 },
  hints: [
    { id: 'hint-1', text: { en: 'Look inside the bell. What normally strikes it?', ta: 'மணிக்குள் பாருங்கள். என்ன வழக்கமாக அதை அடிக்கும்?' }, cost: { scoreDeduction: 5 } },
    { id: 'hint-2', text: { en: 'Sound requires something to vibrate the bell body.', ta: 'ஒலிக்கு மணியின் உடலை அதிர வைக்க ஏதோ ஒன்று தேவை.' }, cost: { scoreDeduction: 10 } },
    { id: 'hint-3', text: { en: 'The metal clapper is missing from inside the bell.', ta: 'மணிக்குள் இருந்து உலோக கோல் இல்லை.' }, cost: { scoreDeduction: 15 } },
  ],
  sceneObjects: [
    { id: 'obj-bell', label: { en: 'Bell', ta: 'மணி' }, description: { en: 'A standard school bell mounted on the wall.', ta: 'சுவரில் பொருத்தப்பட்ட ஒரு நிலையான பள்ளி மணி.' }, clueConnectionId: 's001-clue1', icon: '🔔', position: { x: 50, y: 30 } },
    { id: 'obj-string', label: { en: 'Pull String', ta: 'இழுக்கும் கயிறு' }, description: { en: 'The string used to ring the bell.', ta: 'மணி அடிக்க பயன்படுத்தும் கயிறு.' }, clueConnectionId: 's001-clue2', icon: '🪢', position: { x: 50, y: 70 } },
    { id: 'obj-mount', label: { en: 'Wall Mount', ta: 'சுவர் பிணைப்பு' }, description: { en: 'The bracket holding the bell.', ta: 'மணியை பிடித்துள்ள பிரேக்கெட்.' }, clueConnectionId: 's001-clue3', icon: '🏗️', position: { x: 50, y: 50 } },
  ],
};

const PHYSICS_LIGHT_001: MysteryCase = {
  id: 'physics-light-001',
  title: { en: 'The Shadow Puzzle', ta: 'நிழல் புதிர்' },
  description: {
    en: 'A student notices that their shadow changes size during the day. Why does this happen?',
    ta: 'ஒரு மாணவர் தங்கள் நிழல் நாள் முழுவதும் அளவு மாறுவதை கவனிக்கிறார். இது ஏன் நடக்கிறது?',
  },
  category: 'physics',
  gradeRange: '6-7',
  difficulty: 'beginner',
  estimatedMinutes: 3,
  objective: { en: 'Explain why shadow size changes throughout the day.', ta: 'நாள் முழுவதும் நிழல் அளவு ஏன் மாறுகிறது என்று விளக்குங்கள்.' },
  clues: [
    { id: 'l001-clue1', title: { en: 'Morning Shadow', ta: 'காலை நிழல்' }, observation: { en: 'At 8 AM, the shadow is long and points west.', ta: 'காலை 8 மணிக்கு, நிழல் நீளமாகவும் மேற்கை நோக்கியும் இருக்கிறது.' }, type: 'observation', relevance: 'essential', icon: '🌅' },
    { id: 'l001-clue2', title: { en: 'Noon Shadow', ta: 'நண்பகல் நிழல்' }, observation: { en: 'At 12 PM, the shadow is shortest and directly below.', ta: 'நண்பகல் 12 மணிக்கு, நிழல் மிகவும் குறுகியதாகவும் நேரடியாக கீழேயும் இருக்கிறது.' }, type: 'observation', relevance: 'essential', icon: '☀️' },
    { id: 'l001-clue3', title: { en: 'Evening Shadow', ta: 'மாலை நிழல்' }, observation: { en: 'At 5 PM, the shadow is long again but points east.', ta: 'மாலை 5 மணிக்கு, நிழல் மீண்டும் நீளமாக ஆனால் கிழக்கை நோக்கியும் இருக்கிறது.' }, type: 'observation', relevance: 'essential', icon: '🌇' },
    { id: 'l001-clue4', title: { en: 'Sun Position', ta: 'சூரியன் நிலை' }, observation: { en: 'The sun appears to move across the sky from east to west.', ta: 'சூரியன் வானில் கிழக்கில் இருந்து மேற்கு நோக்கி நகர்வதாகத் தெரிகிறது.' }, type: 'statement', relevance: 'supporting', icon: '🌍' },
  ],
  hypotheses: [
    { id: 'h1', title: { en: 'The sun moves across the sky', ta: 'சூரியன் வானில் நகர்கிறான்' }, explanation: { en: 'The sun physically travels from east to west.', ta: 'சூரியன் கிழக்கில் இருந்து மேற்கு நோக்கி உடல் ரீதியாக பயணிக்கிறான்.' } },
    { id: 'h2', title: { en: 'Earth rotates, changing the sun angle', ta: 'பூமி சுழல்கிறது, சூரிய கோணம் மாறுகிறது' }, explanation: { en: 'Earth rotation changes the sun angle, which changes shadow length.', ta: 'பூமியின் சுழற்சி சூரிய கோணத்தை மாற்றுகிறது, இது நிழல் நீளத்தை மாற்றுகிறது.' } },
    { id: 'h3', title: { en: 'Clouds affect shadow size', ta: 'மேகங்கள் நிழல் அளவை பாதிக்கின்றன' }, explanation: { en: 'Clouds make shadows bigger or smaller.', ta: 'மேகங்கள் நிழல்களை பெரிதாக்குகின்றன அல்லது சிறிதாக்குகின்றன.' } },
  ],
  correctHypothesisId: 'h2',
  explanation: {
    en: 'Earth rotates on its axis, which makes the sun appear to move across the sky. When the sun is low (morning/evening), shadows are long. When the sun is high (noon), shadows are short. The angle of sunlight determines shadow length.',
    ta: 'பூமி தனது அச்சில் சுழல்கிறது, இது சூரியன் வானில் நகர்வதாகத் தோன்றச் செய்கிறது. சூரியன் தாழ்வாக இருக்கும் போது (காலை/மாலை), நிழல்கள் நீளமாக இருக்கும். சூரியன் உயரமாக இருக்கும் போது (நண்பகல்), நிழல்கள் குறுகியதாக இருக்கும்.',
  },
  learningConcepts: ['earth-rotation', 'shadows', 'sun-angle'],
  learningConceptIds: ['earth-movement', 'light-shadows'],
  rewards: { xp: 30 },
  hints: [
    { id: 'hint-1', text: { en: 'Think about what changes the angle of sunlight hitting the ground.', ta: 'தரையில் படும் சூரிய ஒளியின் கோணத்தை என்ன மாற்றுகிறது என்று யோசியுங்கள்.' }, cost: { scoreDeduction: 5 } },
    { id: 'hint-2', text: { en: 'The Earth rotates on its axis once every 24 hours.', ta: 'பூமி ஒவ்வொரு 24 மணி நேரத்திற்கும் ஒருமுறை தனது அச்சில் சுழல்கிறது.' }, cost: { scoreDeduction: 10 } },
    { id: 'hint-3', text: { en: 'It is Earth\'s rotation that makes the sun appear to move.', ta: 'சூரியன் நகர்வதாகத் தோன்றுவது பூமியின் சுழற்சியே.' }, cost: { scoreDeduction: 15 } },
  ],
  sceneObjects: [
    { id: 'obj-sun', label: { en: 'Sun', ta: 'சூரியன்' }, description: { en: 'The sun in the sky.', ta: 'வானில் உள்ள சூரியன்.' }, clueConnectionId: 'l001-clue4', icon: '☀️', position: { x: 50, y: 20 } },
    { id: 'obj-morning', label: { en: 'Morning Scene', ta: 'காலை காட்சி' }, description: { en: 'Low sun, long shadow.', ta: 'தாழ்வான சூரியன், நீளமான நிழல்.' }, clueConnectionId: 'l001-clue1', icon: '🌅', position: { x: 20, y: 50 } },
    { id: 'obj-noon', label: { en: 'Noon Scene', ta: 'நண்பகல் காட்சி' }, description: { en: 'High sun, short shadow.', ta: 'உயரமான சூரியன், குறுகிய நிழல்.' }, clueConnectionId: 'l001-clue2', icon: '☀️', position: { x: 50, y: 50 } },
    { id: 'obj-evening', label: { en: 'Evening Scene', ta: 'மாலை காட்சி' }, description: { en: 'Low sun again, long shadow opposite.', ta: 'மீண்டும் தாழ்வான சூரியன், எதிர் திசையில் நீளமான நிழல்.' }, clueConnectionId: 'l001-clue3', icon: '🌇', position: { x: 80, y: 50 } },
  ],
};

// ============================================================================
// CHEMISTRY CASES
// ============================================================================

const CHEMISTRY_ACID_001: MysteryCase = {
  id: 'chemistry-acid-001',
  title: { en: 'The Mystery of the Blue Solution', ta: 'நீல கரைசலின் மர்மம்' },
  description: {
    en: 'A lab assistant accidentally mixed two clear liquids and got a blue solution. Which chemicals were mixed?',
    ta: 'ஒரு ஆய்வக உதவியாளர் தற்செயலாக இரண்டு தெளிவான திரவங்களை கலந்து நீல கரைசலைப் பெற்றார். எந்த வேதிப் பொருட்கள் கலக்கப்பட்டன?',
  },
  category: 'chemistry',
  gradeRange: '8-10',
  difficulty: 'intermediate',
  estimatedMinutes: 5,
  objective: { en: 'Identify the chemicals that created the blue solution.', ta: 'நீல கரைசலை உருவாக்கிய வேதிப் பொருட்களை அடையாளம் காணுங்கள்.' },
  clues: [
    { id: 'ch001-clue1', title: { en: 'Liquid A', ta: 'திரவம் A' }, observation: { en: 'Liquid A is a clear, colorless solution with pH 2.', ta: 'திரவம் A pH 2 கொண்ட தெளிவான, நிறமற்ற கரைசல்.' }, type: 'measurement', relevance: 'essential', dataLabel: { en: 'pH', ta: 'pH' }, dataValue: { en: '2', ta: '2' }, icon: '🧪' },
    { id: 'ch001-clue2', title: { en: 'Liquid B', ta: 'திரவம் B' }, observation: { en: 'Liquid B is a clear, colorless solution with pH 12.', ta: 'திரவம் B pH 12 கொண்ட தெளிவான, நிறமற்ற கரைசல்.' }, type: 'measurement', relevance: 'essential', dataLabel: { en: 'pH', ta: 'pH' }, dataValue: { en: '12', ta: '12' }, icon: '🧪' },
    { id: 'ch001-clue3', title: { en: 'Copper Test', ta: 'செம்பு சோதனை' }, observation: { en: 'Adding a copper strip to the mixture causes the blue color.', ta: 'கலவையில் செம்பு துண்டு சேர்த்தால் நீல நிறம் ஏற்படுகிறது.' }, type: 'observation', relevance: 'supporting', icon: '🔶' },
    { id: 'ch001-clue4', title: { en: 'Reaction Heat', ta: 'வினை வெப்பம்' }, observation: { en: 'The mixture became warm when combined.', ta: 'கலவை கலக்கப்படும் போது சூடானது.' }, type: 'observation', relevance: 'supporting', icon: '🌡️' },
  ],
  hypotheses: [
    { id: 'h1', title: { en: 'Sodium hydroxide and copper sulphate', ta: 'சோடியம் ஹைட்ராக்சைடு மற்றும் காப்பர் சல்பேட்' }, explanation: { en: 'Mixing these produces a blue precipitate.', ta: 'இவற்றை கலந்தால் நீல வீழ்படிவு உருவாகும்.' } },
    { id: 'h2', title: { en: 'Hydrochloric acid and sodium hydroxide', ta: 'ஹைட்ரோகுளோரிக் அமிலம் மற்றும் சோடியம் ஹைட்ராக்சைடு' }, explanation: { en: 'These neutralize each other.', ta: 'இவை ஒன்றையொன்று நடுநிலையாக்குகின்றன.' } },
    { id: 'h3', title: { en: 'Copper sulphate and hydrochloric acid', ta: 'காப்பர் சல்பேட் மற்றும் ஹைட்ரோகுளோரிக் அமிலம்' }, explanation: { en: 'These would create a different reaction.', ta: 'இவை வேறு வினையை உருவாக்கும்.' } },
    { id: 'h4', title: { en: 'Vinegar and baking soda', ta: 'வினிகர் மற்றும் சமையல் சோடா' }, explanation: { en: 'These create fizz, not blue color.', ta: 'இவை நுரையை உருவாக்கும், நீல நிறத்தை அல்ல.' } },
  ],
  correctHypothesisId: 'h2',
  explanation: {
    en: 'Liquid A (pH 2) is an acid like hydrochloric acid. Liquid B (pH 12) is a base like sodium hydroxide. When mixed, they neutralize. The blue color comes from copper ions — this suggests copper sulphate was involved, not simple neutralization. The correct answer involves recognizing the copper connection through the blue color and acidic/alkaline pair.',
    ta: 'திரவம் A (pH 2) ஹைட்ரோகுளோரிக் அமிலம் போன்ற ஒரு அமிலம். திரவம் B (pH 12) சோடியம் ஹைட்ராக்சைடு போன்ற ஒரு காரம். கலக்கும் போது, அவை நடுநிலையாக்குகின்றன. நீல நிறம் காப்பர் அயனிகளில் இருந்து வருகிறது.',
  },
  learningConcepts: ['acids-bases', 'pH', 'neutralization', 'copper-compounds'],
  learningConceptIds: ['acid-base-basics', 'ph-scale'],
  rewards: { xp: 50 },
  hints: [
    { id: 'hint-1', text: { en: 'pH 2 means strongly acidic, pH 12 means strongly alkaline.', ta: 'pH 2 என்றால் மிகவும் அமிலத்தன்மை, pH 12 என்றால் மிகவும் காரத்தன்மை.' }, cost: { scoreDeduction: 5 } },
    { id: 'hint-2', text: { en: 'Blue color in chemistry often indicates copper compounds.', ta: 'வேதியியலில் நீல நிறம் பெரும்பாலும் காப்பர் சேர்மங்களை குறிக்கிறது.' }, cost: { scoreDeduction: 10 } },
    { id: 'hint-3', text: { en: 'An acid and a base were mixed. The blue comes from copper.', ta: 'ஒரு அமிலம் மற்றும் ஒரு காரம் கலக்கப்பட்டன. நீலம் காப்பரில் இருந்து வருகிறது.' }, cost: { scoreDeduction: 15 } },
  ],
  sceneObjects: [
    { id: 'obj-beakerA', label: { en: 'Beaker A', ta: 'பீக்கர் A' }, description: { en: 'Clear liquid, pH 2.', ta: 'தெளிவான திரவம், pH 2.' }, clueConnectionId: 'ch001-clue1', icon: '🧪', position: { x: 25, y: 40 } },
    { id: 'obj-beakerB', label: { en: 'Beaker B', ta: 'பீக்கர் B' }, description: { en: 'Clear liquid, pH 12.', ta: 'தெளிவான திரவம், pH 12.' }, clueConnectionId: 'ch001-clue2', icon: '🧪', position: { x: 75, y: 40 } },
    { id: 'obj-mixture', label: { en: 'Mixed Solution', ta: 'கலவை கரைசல்' }, description: { en: 'Blue solution in a beaker.', ta: 'பீக்கரில் உள்ள நீல கரைசல்.' }, clueConnectionId: 'ch001-clue3', icon: '🔬', position: { x: 50, y: 50 } },
    { id: 'obj-thermometer', label: { en: 'Thermometer', ta: 'வெப்பமானி' }, description: { en: 'Shows temperature increase.', ta: 'வெப்பநிலை அதிகரிப்பை காட்டுகிறது.' }, clueConnectionId: 'ch001-clue4', icon: '🌡️', position: { x: 50, y: 70 } },
  ],
};

const CHEMISTRY_DENSITY_001: MysteryCase = {
  id: 'chemistry-density-001',
  title: { en: 'The Sinking Oil', ta: 'மூழ்கும் எண்ணெய்' },
  description: {
    en: 'A student poured cooking oil into water expecting it to float. But this oil sank. Why?',
    ta: 'ஒரு மாணவர் சமையல் எண்ணெயை தண்ணீரில் ஊற்றி மிதக்கும் என்று எதிர்பார்த்தார். ஆனால் இந்த எண்ணெய் மூழ்கியது. ஏன்?',
  },
  category: 'chemistry',
  gradeRange: '6-7',
  difficulty: 'beginner',
  estimatedMinutes: 3,
  objective: { en: 'Determine why the oil sank instead of floating.', ta: 'எண்ணெய் மிதக்காமல் ஏன் மூழ்கியது என்று நிர்ணயியுங்கள்.' },
  clues: [
    { id: 'dn001-clue1', title: { en: 'Oil Density', ta: 'எண்ணெய் அடர்த்தி' }, observation: { en: 'The oil has a density of 0.92 g/cm³.', ta: 'எண்ணெயின் அடர்த்தி 0.92 g/cm³.' }, type: 'measurement', relevance: 'supporting', dataLabel: { en: 'Density', ta: 'அடர்த்தி' }, dataValue: { en: '0.92 g/cm³', ta: '0.92 g/cm³' }, icon: '⚖️' },
    { id: 'dn001-clue2', title: { en: 'Liquid Container', ta: 'திரவ கொள்கலன்' }, observation: { en: 'The container holds saltwater, not fresh water.', ta: 'கொள்கலன் உப்பு நீரை கொண்டுள்ளது, சுத்த நீரை அல்ல.' }, type: 'observation', relevance: 'essential', icon: '🧂' },
    { id: 'dn001-clue3', title: { en: 'Saltwater Density', ta: 'உப்பு நீர் அடர்த்தி' }, observation: { en: 'The saltwater density is 0.88 g/cm³ (diluted).', ta: 'உப்பு நீர் அடர்த்தி 0.88 g/cm³ (நீர்த்தது).' }, type: 'measurement', relevance: 'essential', dataLabel: { en: 'Density', ta: 'அடர்த்தி' }, dataValue: { en: '0.88 g/cm³', ta: '0.88 g/cm³' }, icon: '⚖️' },
  ],
  hypotheses: [
    { id: 'h1', title: { en: 'The oil is heavier than water', ta: 'எண்ணெய் தண்ணீரை விட கனம்' }, explanation: { en: 'Oil is denser than water.', ta: 'எண்ணெய் தண்ணீரை விட அடர்த்தியானது.' } },
    { id: 'h2', title: { en: 'The saltwater is less dense than the oil', ta: 'உப்பு நீர் எண்ணெயை விட குறைவான அடர்த்தி' }, explanation: { en: 'The diluted saltwater had lower density than the oil.', ta: 'நீர்த்த உப்பு நீர் எண்ணெயை விட குறைவான அடர்த்தியை கொண்டிருந்தது.' } },
    { id: 'h3', title: { en: 'The oil absorbed water', ta: 'எண்ணெய் தண்ணீரை உறிஞ்சியது' }, explanation: { en: 'The oil absorbed water and became heavier.', ta: 'எண்ணெய் தண்ணீரை உறிஞ்சி கனமானது.' } },
  ],
  correctHypothesisId: 'h2',
  explanation: {
    en: 'Objects float when they are less dense than the liquid they are in. The saltwater here was diluted to a density of only 0.88 g/cm³, while the oil was 0.92 g/cm³. Since the oil is denser than this particular liquid, it sank. If it were pure water (density 1.0 g/cm³), the oil would float.',
    ta: 'பொருட்கள் அவை இருக்கும் திரவத்தை விட குறைவான அடர்த்தி கொண்டிருந்தால் மிதக்கும். இங்கே உப்பு நீர் 0.88 g/cm³ அடர்த்திக்கு நீர்த்தப்பட்டது, எண்ணெய் 0.92 g/cm³ ஆக இருந்தது. எண்ணெய் இந்த குறிப்பிட்ட திரவத்தை விட அடர்த்தியானதால், அது மூழ்கியது.',
  },
  learningConcepts: ['density', 'buoyancy', 'floating'],
  learningConceptIds: ['density-basics', 'buoyancy'],
  rewards: { xp: 30 },
  hints: [
    { id: 'hint-1', text: { en: 'Compare the density numbers carefully.', ta: 'அடர்த்தி எண்களை கவனமாக ஒப்பிடுங்கள்.' }, cost: { scoreDeduction: 5 } },
    { id: 'hint-2', text: { en: 'Denser objects sink in less dense liquids.', ta: 'அடர்த்தியான பொருட்கள் குறைவான அடர்த்தி கொண்ட திரவங்களில் மூழ்கும்.' }, cost: { scoreDeduction: 10 } },
    { id: 'hint-3', text: { en: 'The saltwater density (0.88) is less than the oil density (0.92).', ta: 'உப்பு நீர் அடர்த்தி (0.88) எண்ணெய் அடர்த்தியை (0.92) விட குறைவு.' }, cost: { scoreDeduction: 15 } },
  ],
  sceneObjects: [
    { id: 'obj-oil', label: { en: 'Oil', ta: 'எண்ணெய்' }, description: { en: 'Cooking oil with density 0.92 g/cm³.', ta: '0.92 g/cm³ அடர்த்தி கொண்ட சமையல் எண்ணெய்.' }, clueConnectionId: 'dn001-clue1', icon: '🫗', position: { x: 30, y: 30 } },
    { id: 'obj-container', label: { en: 'Container', ta: 'கொள்கலன்' }, description: { en: 'A glass container with liquid.', ta: 'திரவம் நிரப்பப்பட்ட கிளாஸ் கொள்கலன்.' }, clueConnectionId: 'dn001-clue2', icon: '🧂', position: { x: 50, y: 50 } },
    { id: 'obj-saltwater', label: { en: 'Saltwater', ta: 'உப்பு நீர்' }, description: { en: 'Diluted saltwater with density 0.88 g/cm³.', ta: '0.88 g/cm³ அடர்த்தி கொண்ட நீர்த்த உப்பு நீர்.' }, clueConnectionId: 'dn001-clue3', icon: '⚖️', position: { x: 70, y: 40 } },
  ],
};

// ============================================================================
// BIOLOGY CASES
// ============================================================================

const BIOLOGY_PLANT_001: MysteryCase = {
  id: 'biology-plant-001',
  title: { en: 'Why Did the Plant Wilt?', ta: 'தாவரம் ஏன் வாடியது?' },
  description: {
    en: 'A student\'s potted plant started wilting even though it gets plenty of sunlight. Investigate why.',
    ta: 'ஒரு மாணவரின் தொட்டி தாவரம் நிறைய வெளிச்சம் இருந்தும் வாடத் தொடங்கியது. ஏன் என்று ஆய்வு செய்யுங்கள்.',
  },
  category: 'biology',
  gradeRange: '6-7',
  difficulty: 'beginner',
  estimatedMinutes: 3,
  objective: { en: 'Find out why the plant is wilting.', ta: 'தாவரம் ஏன் வாடுகிறது என்று கண்டறியுங்கள்.' },
  clues: [
    { id: 'bp001-clue1', title: { en: 'Soil Check', ta: 'மண் சரிபார்ப்பு' }, observation: { en: 'The soil is completely dry and cracked.', ta: 'மண் முற்றிலும் உலர்ந்தும் விரிசல் அடைந்தும் உள்ளது.' }, type: 'observation', relevance: 'essential', icon: '🏜️' },
    { id: 'bp001-clue2', title: { en: 'Leaf Condition', ta: 'இலை நிலை' }, observation: { en: 'The leaves are drooping and yellowing at the edges.', ta: 'இலைகள் தொங்கி விளிம்புகளில் மஞ்சளாகின்றன.' }, type: 'observation', relevance: 'supporting', icon: '🍂' },
    { id: 'bp001-clue3', title: { en: 'Pot Drainage', ta: 'தொட்டி வடிகால்' }, observation: { en: 'The pot has drainage holes but they are not blocked.', ta: 'தொட்டியில் வடிகால் துளைகள் உள்ளன ஆனால் அவை தடுக்கப்படவில்லை.' }, type: 'observation', relevance: 'distractor', icon: '🏺' },
    { id: 'bp001-clue4', title: { en: 'Sunlight Hours', ta: 'வெளிச்ச நேரம்' }, observation: { en: 'The plant receives 6+ hours of direct sunlight daily.', ta: 'தாவரம் தினமும் 6+ மணி நேரம் நேரடி வெளிச்சம் பெறுகிறது.' }, type: 'observation', relevance: 'supporting', icon: '☀️' },
  ],
  hypotheses: [
    { id: 'h1', title: { en: 'Too much sunlight', ta: 'அதிக வெளிச்சம்' }, explanation: { en: 'The plant is getting too much direct sun.', ta: 'தாவரத்திற்கு அதிக நேரடி வெளிச்சம் கிடைக்கிறது.' } },
    { id: 'h2', title: { en: 'Not enough water', ta: 'போதுமான நீர் இல்லை' }, explanation: { en: 'The plant needs water and the soil is dry.', ta: 'தாவரத்திற்கு நீர் தேவை மற்றும் மண் உலர்ந்துள்ளது.' } },
    { id: 'h3', title: { en: 'Disease infection', ta: 'நோய் தொற்று' }, explanation: { en: 'A fungal infection is killing the plant.', ta: 'ஒரு பூஞ்சை தொற்று தாவரத்தை கொல்கிறது.' } },
  ],
  correctHypothesisId: 'h2',
  explanation: {
    en: 'The plant is wilting due to lack of water. The completely dry, cracked soil shows it has not been watered. Drooping and yellowing leaves are classic signs of dehydration. Plants need water for photosynthesis and to maintain cell structure (turgor pressure).',
    ta: 'தாவரம் நீர் இல்லாததால் வாடுகிறது. முற்றிலும் உலர்ந்து, விரிசல் அடைந்த மண் அது நீர் விடப்படவில்லை என்பதைக் காட்டுகிறது. தொங்கி மஞ்சளாகும் இலைகள் நீர் இழப்பின் வகையான அறிகுறிகள்.',
  },
  learningConcepts: ['photosynthesis', 'plant-water', 'turgor-pressure'],
  learningConceptIds: ['plant-basics', 'photosynthesis-intro'],
  rewards: { xp: 30 },
  hints: [
    { id: 'hint-1', text: { en: 'Look at the soil condition first.', ta: 'முதலில் மண் நிலையை பாருங்கள்.' }, cost: { scoreDeduction: 5 } },
    { id: 'hint-2', text: { en: 'Dry, cracked soil means no water has been given.', ta: 'உலர்ந்து, விரிசல் அடைந்த மண் என்றால் நீர் விடப்படவில்லை என்று பொருள்.' }, cost: { scoreDeduction: 10 } },
    { id: 'hint-3', text: { en: 'The plant is dehydrated — it needs water.', ta: 'தாவரம் நீர் இழந்துள்ளது — அதற்கு நீர் தேவை.' }, cost: { scoreDeduction: 15 } },
  ],
  sceneObjects: [
    { id: 'obj-soil', label: { en: 'Soil', ta: 'மண்' }, description: { en: 'Dry, cracked potting soil.', ta: 'உலர்ந்து, விரிசல் அடைந்த தொட்டி மண்.' }, clueConnectionId: 'bp001-clue1', icon: '🏜️', position: { x: 50, y: 60 } },
    { id: 'obj-leaves', label: { en: 'Leaves', ta: 'இலைகள்' }, description: { en: 'Drooping yellow leaves.', ta: 'தொங்கும் மஞ்சள் இலைகள்.' }, clueConnectionId: 'bp001-clue2', icon: '🍂', position: { x: 50, y: 30 } },
    { id: 'obj-pot', label: { en: 'Pot', ta: 'தொட்டி' }, description: { en: 'A ceramic pot with drainage.', ta: 'வடிகால் உள்ள மட்பாண்ட தொட்டி.' }, clueConnectionId: 'bp001-clue3', icon: '🏺', position: { x: 50, y: 80 } },
    { id: 'obj-sun', label: { en: 'Window', ta: 'ஜன்னல்' }, description: { en: 'Bright sunlight coming through.', ta: 'பிரகாசமான வெளிச்சம் வருகிறது.' }, clueConnectionId: 'bp001-clue4', icon: '☀️', position: { x: 80, y: 20 } },
  ],
};

const BIOLOGY_CELL_001: MysteryCase = {
  id: 'biology-cell-001',
  title: { en: 'The Mystery Cell', ta: 'மர்ம உயிரணு' },
  description: {
    en: 'Under a microscope, a cell has a cell wall, chloroplasts, and a large vacuole. What type of cell is it?',
    ta: 'ஒரு நுண்ணோக்கியின் கீழ், ஒரு உயிரணுவில் செல் சுவர், குளோரோபிளாஸ்ட்கள் மற்றும் ஒரு பெரிய வெற்றிடம் உள்ளது. இது என்ன வகை உயிரணு?',
  },
  category: 'biology',
  gradeRange: '8-10',
  difficulty: 'intermediate',
  estimatedMinutes: 4,
  objective: { en: 'Identify the type of cell observed under the microscope.', ta: 'நுண்ணோக்கியின் கீழ் காணப்பட்ட உயிரணு வகையை அடையாளம் காணுங்கள்.' },
  clues: [
    { id: 'bc001-clue1', title: { en: 'Cell Wall', ta: 'செல் சுவர்' }, observation: { en: 'The cell has a rigid outer wall made of cellulose.', ta: 'உயிரணுவில் செல்லுலோஸ் ஆல் செய்யப்பட்ட கடினமான வெளிப்புற சுவர் உள்ளது.' }, type: 'observation', relevance: 'essential', icon: '🧱' },
    { id: 'bc001-clue2', title: { en: 'Chloroplasts', ta: 'குளோரோபிளாஸ்ட்கள்' }, observation: { en: 'Green oval organelles are visible inside the cell.', ta: 'உயிரணுவுக்குள் பச்சை நீள்வட்ட உறுப்புகள் தெரிகின்றன.' }, type: 'observation', relevance: 'essential', icon: '🟢' },
    { id: 'bc001-clue3', title: { en: 'Large Vacuole', ta: 'பெரிய வெற்றிடம்' }, observation: { en: 'A large central vacuole takes up most of the cell volume.', ta: 'ஒரு பெரிய மைய வெற்றிடம் உயிரணுவின் பெரும்பகுதி அளவை எடுத்துக்கொள்கிறது.' }, type: 'observation', relevance: 'supporting', icon: '💧' },
  ],
  hypotheses: [
    { id: 'h1', title: { en: 'Animal cell', ta: 'விலங்கு உயிரணு' }, explanation: { en: 'An animal cell from the human body.', ta: 'மனித உடலில் இருந்து ஒரு விலங்கு உயிரணு.' } },
    { id: 'h2', title: { en: 'Plant cell', ta: 'தாவர உயிரணு' }, explanation: { en: 'A plant cell with cell wall and chloroplasts.', ta: 'செல் சுவர் மற்றும் குளோரோபிளாஸ்ட்கள் உள்ள தாவர உயிரணு.' } },
    { id: 'h3', title: { en: 'Bacterial cell', ta: 'பாக்டீரியா உயிரணு' }, explanation: { en: 'A prokaryotic bacterial cell.', ta: 'ஒரு புரோகேரியோடிக் பாக்டீரியா உயிரணு.' } },
    { id: 'h4', title: { en: 'Fungal cell', ta: 'பூஞ்சை உயிரணு' }, explanation: { en: 'A cell from a fungus.', ta: 'ஒரு பூஞ்சையில் இருந்து ஒரு உயிரணு.' } },
  ],
  correctHypothesisId: 'h2',
  explanation: {
    en: 'Plant cells have three features not found in animal cells: a rigid cellulose cell wall, chloroplasts for photosynthesis, and a large central vacuole. Bacterial cells lack a nucleus. Fungal cells have cell walls but no chloroplasts.',
    ta: 'தாவர உயிரணுகளில் விலங்கு உயிரணுகளில் இல்லாத மூன்று அம்சங்கள் உள்ளன: கடினமான செல்லுலோஸ் செல் சுவர், ஒளிச்சேர்க்கைக்கான குளோரோபிளாஸ்ட்கள், மற்றும் ஒரு பெரிய மைய வெற்றிடம்.',
  },
  learningConcepts: ['cell-structure', 'plant-cells', 'chloroplasts'],
  learningConceptIds: ['cell-basics', 'plant-animal-cells'],
  rewards: { xp: 50 },
  hints: [
    { id: 'hint-1', text: { en: 'Which type of cell has a cell wall?', ta: 'எந்த வகை உயிரணுவுக்கு செல் சுவர் உள்ளது?' }, cost: { scoreDeduction: 5 } },
    { id: 'hint-2', text: { en: 'Chloroplasts are only found in one type of cell.', ta: 'குளோரோபிளாஸ்ட்கள் ஒரு வகை உயிரணுவில் மட்டுமே காணப்படும்.' }, cost: { scoreDeduction: 10 } },
    { id: 'hint-3', text: { en: 'Cell wall + chloroplasts + large vacuole = plant cell.', ta: 'செல் சுவர் + குளோரோபிளாஸ்ட்கள் + பெரிய வெற்றிடம் = தாவர உயிரணு.' }, cost: { scoreDeduction: 15 } },
  ],
  sceneObjects: [
    { id: 'obj-microscope', label: { en: 'Microscope View', ta: 'நுண்ணோக்கி காட்சி' }, description: { en: 'A magnified cell view.', ta: 'பெருக்கப்பட்ட உயிரணு காட்சி.' }, clueConnectionId: 'bc001-clue1', icon: '🔬', position: { x: 50, y: 40 } },
    { id: 'obj-chloroplast', label: { en: 'Green Organelles', ta: 'பச்சை உறுப்புகள்' }, description: { en: 'Green chloroplasts inside the cell.', ta: 'உயிரணுவுக்குள் பச்சை குளோரோபிளாஸ்ட்கள்.' }, clueConnectionId: 'bc001-clue2', icon: '🟢', position: { x: 40, y: 35 } },
    { id: 'obj-vacuole', label: { en: 'Central Vacuole', ta: 'மைய வெற்றிடம்' }, description: { en: 'Large central vacuole.', ta: 'பெரிய மைய வெற்றிடம்.' }, clueConnectionId: 'bc001-clue3', icon: '💧', position: { x: 60, y: 45 } },
  ],
};

// ============================================================================
// SPACE CASES
// ============================================================================

const SPACE_ORBIT_001: MysteryCase = {
  id: 'space-orbit-001',
  title: { en: 'The Strange Space Signal', ta: 'வினோத விண்வெளி சிக்னல்' },
  description: {
    en: 'A space telescope detects a regular pulse from a distant object every 1.337 seconds. What is the object?',
    ta: 'ஒரு விண்வெளி தொலைநோக்கி ஒரு தொலைவான பொருளில் இருந்து 1.337 வினாடிகளுக்கு ஒருமுறை வழக்கமான துடிப்பை கண்டறிகிறது. அந்த பொருள் என்ன?',
  },
  category: 'space',
  gradeRange: '8-10',
  difficulty: 'intermediate',
  estimatedMinutes: 5,
  objective: { en: 'Identify the object producing the regular space signal.', ta: 'வழக்கமான விண்வெளி சிக்னலை உருவாக்கும் பொருளை அடையாளம் காணுங்கள்.' },
  clues: [
    { id: 'sp001-clue1', title: { en: 'Signal Period', ta: 'சிக்னல் காலம்' }, observation: { en: 'The pulse repeats every 1.337 seconds with extreme regularity.', ta: 'துடிப்பு 1.337 வினாடிகளுக்கு ஒருமுறை மிகவும் சீராக மீண்டும் வருகிறது.' }, type: 'measurement', relevance: 'essential', dataLabel: { en: 'Period', ta: 'காலம்' }, dataValue: { en: '1.337 s', ta: '1.337 வி' }, icon: '📡' },
    { id: 'sp001-clue2', title: { en: 'Signal Type', ta: 'சிக்னல் வகை' }, observation: { en: 'The signal is in the radio frequency range.', ta: 'சிக்னல் ரேடியோ அதிர்வெண் வரம்பில் உள்ளது.' }, type: 'observation', relevance: 'supporting', icon: '📻' },
    { id: 'sp001-clue3', title: { en: 'Position', ta: 'நிலை' }, observation: { en: 'Located in the Vela constellation.', ta: 'வேலா விண்மீன் குழுவில் அமைந்துள்ளது.' }, type: 'observation', relevance: 'supporting', icon: '⭐' },
    { id: 'sp001-clue4', title: { en: 'Energy', ta: 'ஆற்றல்' }, observation: { en: 'The energy output is extremely high and concentrated.', ta: 'ஆற்றல் வெளியீடு மிகவும் அதிகமாகவும் குவிந்ததாகவும் உள்ளது.' }, type: 'observation', relevance: 'essential', icon: '⚡' },
  ],
  hypotheses: [
    { id: 'h1', title: { en: 'A pulsar (neutron star)', ta: 'ஒரு பல்சர் (நியூட்ரான் நட்சத்திரம்)' }, explanation: { en: 'A rapidly rotating neutron star emitting beams of radiation.', ta: 'கதிர்வீச்சு கற்றைகளை வீசும் வேகமாக சுழலும் நியூட்ரான் நட்சத்திரம்.' } },
    { id: 'h2', title: { en: 'An asteroid', ta: 'ஒரு எரிகல்' }, explanation: { en: 'A rocky body orbiting in space.', ta: 'விண்வெளியில் சுற்றும் பாறை பொருள்.' } },
    { id: 'h3', title: { en: 'A black hole', ta: 'ஒரு கருங்குழி' }, explanation: { en: 'A gravitational singularity.', ta: 'ஒரு ஈர்ப்பு ஒற்றைப்புள்ளி.' } },
    { id: 'h4', title: { en: 'A communication satellite', ta: 'ஒரு தகவல் தொடர்பு செயற்கைக்கோள்' }, explanation: { en: 'A human-made satellite.', ta: 'மனிதரால் உருவாக்கப்பட்ட செயற்கைக்கோள்.' } },
  ],
  correctHypothesisId: 'h1',
  explanation: {
    en: 'Pulsars are rapidly rotating neutron stars that emit beams of electromagnetic radiation. As they rotate, the beam sweeps past Earth like a lighthouse, creating regular pulses. The 1.337-second period and extreme regularity are classic pulsar signatures. The Vela Pulsar has a period of about 0.089 seconds, but other pulsars match this pattern.',
    ta: 'பல்சர்கள் மின்காந்த கதிர்வீச்சு கற்றைகளை வீசும் வேகமாக சுழலும் நியூட்ரான் நட்சத்திரங்கள். அவை சுழலும் போது, கற்றை ஒரு கலங்கரை விளக்கம் போல பூமியை கடந்து செல்கிறது, வழக்கமான துடிப்புகளை உருவாக்குகிறது.',
  },
  learningConcepts: ['pulsars', 'neutron-stars', 'electromagnetic-radiation'],
  learningConceptIds: ['stars-lifecycle', 'electromagnetic-spectrum'],
  rewards: { xp: 50 },
  hints: [
    { id: 'hint-1', text: { en: 'What celestial object produces regular, precise pulses of radio waves?', ta: 'எந்த வானியல் பொருள் ரேடியோ அலைகளின் வழக்கமான, துல்லியமான துடிப்புகளை உருவாக்குகிறது?' }, cost: { scoreDeduction: 5 } },
    { id: 'hint-2', text: { en: 'Neutron stars rotate extremely fast and emit radiation beams.', ta: 'நியூட்ரான் நட்சத்திரங்கள் மிகவும் வேகமாக சுழல்கின்றன மற்றும் கதிர்வீச்சு கற்றைகளை வீசுகின்றன.' }, cost: { scoreDeduction: 10 } },
    { id: 'hint-3', text: { en: 'A pulsar is a rotating neutron star acting like a cosmic lighthouse.', ta: 'ஒரு பல்சர் என்பது ஒரு கோஸ்மிக் கலங்கரை விளக்கம் போல் செயல்படும் சுழலும் நியூட்ரான் நட்சத்திரம்.' }, cost: { scoreDeduction: 15 } },
  ],
  sceneObjects: [
    { id: 'obj-telescope', label: { en: 'Telescope Data', ta: 'தொலைநோக்கி தரவு' }, description: { en: 'Signal readings from the space telescope.', ta: 'விண்வெளி தொலைநோக்கியில் இருந்து சிக்னல் அளவீடுகள்.' }, clueConnectionId: 'sp001-clue1', icon: '📡', position: { x: 20, y: 30 } },
    { id: 'obj-signal', label: { en: 'Radio Signal', ta: 'ரேடியோ சிக்னல்' }, description: { en: 'Radio frequency signal data.', ta: 'ரேடியோ அதிர்வெண் சிக்னல் தரவு.' }, clueConnectionId: 'sp001-clue2', icon: '📻', position: { x: 80, y: 30 } },
    { id: 'obj-constellation', label: { en: 'Star Map', ta: 'நட்சத்திர வரைபடம்' }, description: { en: 'Location in Vela constellation.', ta: 'வேலா விண்மீன் குழுவில் அமைவிடம்.' }, clueConnectionId: 'sp001-clue3', icon: '⭐', position: { x: 50, y: 20 } },
    { id: 'obj-energy', label: { en: 'Energy Reader', ta: 'ஆற்றல் ரீடர்' }, description: { en: 'Extremely high energy readings.', ta: 'மிகவும் அதிக ஆற்றல் அளவீடுகள்.' }, clueConnectionId: 'sp001-clue4', icon: '⚡', position: { x: 50, y: 60 } },
  ],
};

const SPACE_PLANET_001: MysteryCase = {
  id: 'space-planet-001',
  title: { en: 'The Red Planet Mystery', ta: 'சிவப்பு கிரக மர்மம்' },
  description: {
    en: 'A planet has a thin atmosphere, ice caps, and reddish surface dust. It once had liquid water. Which planet is this?',
    ta: 'ஒரு கிரகத்திற்கு மெல்லிய வளிமண்டலம், பனி தகடுகள் மற்றும் சிவப்பு நிற மேற்பரப்பு தூசி உள்ளது. ஒரு காலத்தில் திரவ நீர் இருந்தது. இது எந்த கிரகம்?',
  },
  category: 'space',
  gradeRange: '6-7',
  difficulty: 'beginner',
  estimatedMinutes: 3,
  objective: { en: 'Identify the planet based on its characteristics.', ta: 'அதன் பண்புகளின் அடிப்படையில் கிரகத்தை அடையாளம் காணுங்கள்.' },
  clues: [
    { id: 'sp002-clue1', title: { en: 'Atmosphere', ta: 'வளிமண்டலம்' }, observation: { en: 'Very thin atmosphere, mostly carbon dioxide.', ta: 'மிகவும் மெல்லிய வளிமண்டலம், பெரும்பாலும் கார்பன் டை ஆக்சைடு.' }, type: 'observation', relevance: 'essential', icon: '🌫️' },
    { id: 'sp002-clue2', title: { en: 'Surface Color', ta: 'மேற்பரப்பு நிறம்' }, observation: { en: 'The surface appears reddish due to iron oxide (rust).', ta: 'இரும்பு ஆக்சைடு (துரு) காரணமாக மேற்பரப்பு சிவப்பாகத் தோன்றுகிறது.' }, type: 'observation', relevance: 'essential', icon: '🔴' },
    { id: 'sp002-clue3', title: { en: 'Ice Caps', ta: 'பனி தகடுகள்' }, observation: { en: 'Both poles have ice caps made of water ice and dry ice.', ta: 'இரு துருவங்களிலும் நீர் பனி மற்றும் உலர் பனியால் செய்யப்பட்ட பனி தகடுகள் உள்ளன.' }, type: 'observation', relevance: 'supporting', icon: '🧊' },
    { id: 'sp002-clue4', title: { en: 'Water Evidence', ta: 'நீர் ஆதாரம்' }, observation: { en: 'Dried riverbeds and mineral deposits suggest ancient liquid water.', ta: 'உலர்ந்த நதிப்படுக்கைகள் மற்றும் கனிம படிவுகள் பண்டைய திரவ நீரை குறிக்கின்றன.' }, type: 'observation', relevance: 'supporting', icon: '💧' },
  ],
  hypotheses: [
    { id: 'h1', title: { en: 'Mars', ta: 'செவ்வாய்' }, explanation: { en: 'The Red Planet with thin atmosphere.', ta: 'மெல்லிய வளிமண்டலம் கொண்ட சிவப்பு கிரகம்.' } },
    { id: 'h2', title: { en: 'Venus', ta: 'சுக்கிரன்' }, explanation: { en: 'The hot planet with thick atmosphere.', ta: 'தடிமனான வளிமண்டலம் கொண்ட வெப்பமான கிரகம்.' } },
    { id: 'h3', title: { en: 'Mercury', ta: 'புதன்' }, explanation: { en: 'The closest planet to the Sun.', ta: 'சூரியனுக்கு மிக அருகில் உள்ள கிரகம்.' } },
  ],
  correctHypothesisId: 'h1',
  explanation: {
    en: 'Mars is called the Red Planet because iron oxide (rust) gives its surface a reddish color. It has a thin CO₂ atmosphere, polar ice caps, and evidence of ancient riverbeds suggesting it once had liquid water on its surface.',
    ta: 'செவ்வாய் கிரகம் சிவப்பு கிரகம் என்று அழைக்கப்படுகிறது ஏனெனில் இரும்பு ஆக்சைடு (துரு) அதன் மேற்பரப்புக்கு சிவப்பு நிறம் கொடுக்கிறது. இதற்கு CO₂ வளிமண்டலம், துருவ பனி தகடுகள் மற்றும் பண்டைய நதிப்படுக்கைகளின் ஆதாரம் உள்ளது.',
  },
  learningConcepts: ['mars', 'planets', 'atmosphere'],
  learningConceptIds: ['solar-system', 'mars-exploration'],
  rewards: { xp: 30 },
  hints: [
    { id: 'hint-1', text: { en: 'Which planet is known as the Red Planet?', ta: 'சிவப்பு கிரகம் என்று அழைக்கப்படும் கிரகம் எது?' }, cost: { scoreDeduction: 5 } },
    { id: 'hint-2', text: { en: 'Iron oxide (rust) makes the surface red.', ta: 'இரும்பு ஆக்சைடு (துரு) மேற்பரப்பை சிவப்பாக்குகிறது.' }, cost: { scoreDeduction: 10 } },
    { id: 'hint-3', text: { en: 'Mars has thin atmosphere, ice caps, and dried riverbeds.', ta: 'செவ்வாயுக்கு மெல்லிய வளிமண்டலம், பனி தகடுகள் மற்றும் உலர்ந்த நதிப்படுக்கைகள் உள்ளன.' }, cost: { scoreDeduction: 15 } },
  ],
  sceneObjects: [
    { id: 'obj-planet', label: { en: 'Planet Surface', ta: 'கிரக மேற்பரப்பு' }, description: { en: 'Reddish dusty surface.', ta: 'சிவப்பு நிற தூசி மேற்பரப்பு.' }, clueConnectionId: 'sp002-clue2', icon: '🔴', position: { x: 50, y: 40 } },
    { id: 'obj-atmo', label: { en: 'Atmosphere', ta: 'வளிமண்டலம்' }, description: { en: 'Thin atmospheric layer.', ta: 'மெல்லிய வளிமண்டல அடுக்கு.' }, clueConnectionId: 'sp002-clue1', icon: '🌫️', position: { x: 50, y: 20 } },
    { id: 'obj-polar', label: { en: 'Polar Ice', ta: 'துருவ பனி' }, description: { en: 'Ice caps at the pole.', ta: 'துருவத்தில் பனி தகடுகள்.' }, clueConnectionId: 'sp002-clue3', icon: '🧊', position: { x: 50, y: 70 } },
  ],
};

// ============================================================================
// ENVIRONMENT CASES
// ============================================================================

const ENV_WATER_001: MysteryCase = {
  id: 'env-water-001',
  title: { en: 'The Polluted Stream', ta: 'மாசுபட்ட ஓடை' },
  description: {
    en: 'Fish in a local stream are dying. Students investigate the water quality upstream.',
    ta: 'உள்ளூர் ஓடையில் உள்ள மீன்கள் இறக்கின்றன. மாணவர்கள் மேல்நீர்ப்பாய்வு நீர் தரத்தை ஆய்வு செய்கின்றனர்.',
  },
  category: 'environment',
  gradeRange: '8-10',
  difficulty: 'intermediate',
  estimatedMinutes: 5,
  objective: { en: 'Find the source of water pollution killing the fish.', ta: 'மீன்களை கொல்லும் நீர் மாசுபாட்டின் மூலத்தை கண்டறியுங்கள்.' },
  clues: [
    { id: 'ev001-clue1', title: { en: 'Water pH', ta: 'நீர் pH' }, observation: { en: 'Water pH downstream is 4.5 (acidic) compared to 7.0 upstream.', ta: 'கீழ்நீர்ப்பாய்வு நீர் pH 4.5 (அமிலத்தன்மை) மேல்நீர்ப்பாய்வு 7.0 உடன் ஒப்பிடுகையில்.' }, type: 'measurement', relevance: 'essential', dataLabel: { en: 'pH', ta: 'pH' }, dataValue: { en: '4.5', ta: '4.5' }, icon: '🧪' },
    { id: 'ev001-clue2', title: { en: 'Foam', ta: 'நுரை' }, observation: { en: 'White foam appears on the water surface near a factory outlet.', ta: 'ஒரு தொழிற்சாலை வெளியீட்டிற்கு அருகில் நீர் மேற்பரப்பில் வெள்ளை நுரை தோன்றுகிறது.' }, type: 'observation', relevance: 'essential', icon: '🫧' },
    { id: 'ev001-clue3', title: { en: 'Fish Behavior', ta: 'மீன் நடத்தை' }, observation: { en: 'Fish are gasping at the surface near the factory outlet.', ta: 'தொழிற்சாலை வெளியீட்டிற்கு அருகில் மீன்கள் மேற்பரப்பில் மூச்சுத்திணறுகின்றன.' }, type: 'observation', relevance: 'supporting', icon: '🐟' },
    { id: 'ev001-clue4', title: { en: 'Color Change', ta: 'நிற மாற்றம்' }, observation: { en: 'The water near the outlet has a yellowish tint.', ta: 'வெளியீட்டிற்கு அருகில் உள்ள நீர் மஞ்சள் நிற சாயல் கொண்டுள்ளது.' }, type: 'observation', relevance: 'supporting', icon: '🟡' },
  ],
  hypotheses: [
    { id: 'h1', title: { en: 'Industrial chemical discharge', ta: 'தொழில்துறை வேதிப் பொருள் வெளியேற்றம்' }, explanation: { en: 'Factory is releasing acidic chemicals into the stream.', ta: 'தொழிற்சாலை ஓடையில் அமில வேதிப் பொருட்களை வெளியிடுகிறது.' } },
    { id: 'h2', title: { en: 'Natural acid rain', ta: 'இயற்கை அமில மழை' }, explanation: { en: 'Acid rain is naturally lowering the pH.', ta: 'அமில மழை இயற்கையாக pH ஐ குறைக்கிறது.' } },
    { id: 'h3', title: { en: 'Agricultural runoff', ta: 'விவசாய ஓட்டம்' }, explanation: { en: 'Fertilizer runoff is causing the pollution.', ta: 'உர ஓட்டம் மாசுபாட்டை ஏற்படுத்துகிறது.' } },
  ],
  correctHypothesisId: 'h1',
  explanation: {
    en: 'The low pH (acidic), white foam, yellow tint, and dead fish near the factory outlet all point to industrial chemical discharge. Factories can release acidic waste that lowers water pH, creates foam, and is toxic to aquatic life.',
    ta: 'குறைந்த pH (அமிலத்தன்மை), வெள்ளை நுரை, மஞ்சள் சாயல் மற்றும் தொழிற்சாலை வெளியீட்டிற்கு அருகில் உள்ள இறந்த மீன்கள் அனைத்தும் தொழில்துறை வேதிப் பொருள் வெளியேற்றத்தை குறிக்கின்றன.',
  },
  learningConcepts: ['water-pollution', 'acidity', 'ecosystem-health'],
  learningConceptIds: ['water-pollution', 'ecosystem-basics'],
  rewards: { xp: 50 },
  hints: [
    { id: 'hint-1', text: { en: 'Where does the pollution start? Follow the evidence upstream.', ta: 'மாசுபாடு எங்கே தொடங்குகிறது? ஆதாரத்தை மேல்நீர்ப்பாய்வு பின்தொடருங்கள்.' }, cost: { scoreDeduction: 5 } },
    { id: 'hint-2', text: { en: 'Foam and yellow color near the factory outlet are suspicious.', ta: 'தொழிற்சாலை வெளியீட்டிற்கு அருகில் நுரை மற்றும் மஞ்சள் நிறம் சந்தேகத்திற்குரியது.' }, cost: { scoreDeduction: 10 } },
    { id: 'hint-3', text: { en: 'The factory is releasing acidic chemicals into the stream.', ta: 'தொழிற்சாலை ஓடையில் அமில வேதிப் பொருட்களை வெளியிடுகிறது.' }, cost: { scoreDeduction: 15 } },
  ],
  sceneObjects: [
    { id: 'obj-water', label: { en: 'Stream Water', ta: 'ஓடை நீர்' }, description: { en: 'The polluted water.', ta: 'மாசுபட்ட நீர்.' }, clueConnectionId: 'ev001-clue1', icon: '🧪', position: { x: 50, y: 50 } },
    { id: 'obj-foam', label: { en: 'Foam', ta: 'நுரை' }, description: { en: 'White foam on water.', ta: 'நீரில் வெள்ளை நுரை.' }, clueConnectionId: 'ev001-clue2', icon: '🫧', position: { x: 30, y: 40 } },
    { id: 'obj-fish', label: { en: 'Fish', ta: 'மீன்' }, description: { en: 'Distressed fish.', ta: 'பாதிக்கப்பட்ட மீன்.' }, clueConnectionId: 'ev001-clue3', icon: '🐟', position: { x: 70, y: 50 } },
    { id: 'obj-factory', label: { en: 'Factory Outlet', ta: 'தொழிற்சாலை வெளியீடு' }, description: { en: 'Factory drainage pipe.', ta: 'தொழிற்சாலை வடிகால் குழாய்.' }, clueConnectionId: 'ev001-clue4', icon: '🏭', position: { x: 50, y: 20 } },
  ],
};

// ============================================================================
// HUMAN BODY CASES
// ============================================================================

const BODY_HEART_001: MysteryCase = {
  id: 'body-heart-001',
  title: { en: 'The Racing Heart', ta: 'வேகமான இதயம்' },
  description: {
    en: 'A student notices their heart beats faster during exercise. Why does this happen?',
    ta: 'ஒரு மாணவர் உடற்பயிற்சியின் போது தங்கள் இதயம் வேகமாகத் துடிப்பதை கவனிக்கிறார். இது ஏன் நடக்கிறது?',
  },
  category: 'human-body',
  gradeRange: '6-7',
  difficulty: 'beginner',
  estimatedMinutes: 3,
  objective: { en: 'Explain why heart rate increases during exercise.', ta: 'உடற்பயிற்சியின் போது இதய துடிப்பு ஏன் அதிகரிக்கிறது என்று விளக்குங்கள்.' },
  clues: [
    { id: 'hb001-clue1', title: { en: 'Resting Rate', ta: 'ஓய்வு நிலை விகிதம்' }, observation: { en: 'At rest, the heart beats 70 times per minute.', ta: 'ஓய்வில், இதயம் நிமிடத்திற்கு 70 முறை துடிக்கிறது.' }, type: 'measurement', relevance: 'essential', dataLabel: { en: 'Heart Rate', ta: 'இதய துடிப்பு' }, dataValue: { en: '70 bpm', ta: '70 bpm' }, icon: '❤️' },
    { id: 'hb001-clue2', title: { en: 'Exercise Rate', ta: 'பயிற்சி விகிதம்' }, observation: { en: 'During running, the heart beats 150 times per minute.', ta: 'ஓடும் போது, இதயம் நிமிடத்திற்கு 150 முறை துடிக்கிறது.' }, type: 'measurement', relevance: 'essential', dataLabel: { en: 'Heart Rate', ta: 'இதய துடிப்பு' }, dataValue: { en: '150 bpm', ta: '150 bpm' }, icon: '🏃' },
    { id: 'hb001-clue3', title: { en: 'Breathing', ta: 'சுவாசம்' }, observation: { en: 'Breathing also becomes faster during exercise.', ta: 'உடற்பயிற்சியின் போது சுவாசமும் வேகமாகிறது.' }, type: 'observation', relevance: 'supporting', icon: '🌬️' },
    { id: 'hb001-clue4', title: { en: 'Muscle Activity', ta: 'தசை செயல்பாடு' }, observation: { en: 'Muscles need more oxygen during exercise.', ta: 'உடற்பயிற்சியின் போது தசைகளுக்கு அதிக ஆக்சிஜன் தேவை.' }, type: 'statement', relevance: 'supporting', icon: '💪' },
  ],
  hypotheses: [
    { id: 'h1', title: { en: 'Body needs more oxygen delivered to muscles', ta: 'உடலுக்கு தசைகளுக்கு அதிக ஆக்சிஜன் தேவை' }, explanation: { en: 'The heart beats faster to pump more oxygen-rich blood.', ta: 'அதிக ஆக்சிஜன் நிறைந்த இரத்தத்தை செலுத்த இதயம் வேகமாகத் துடிக்கிறது.' } },
    { id: 'h2', title: { en: 'The brain is stressed', ta: 'மூளை அழுத்தத்தில் உள்ளது' }, explanation: { en: 'Stress causes the heart to beat faster.', ta: 'அழுத்தம் இதயம் வேகமாகத் துடிக்க காரணமாகிறது.' } },
    { id: 'h3', title: { en: 'Temperature increase', ta: 'வெப்பநிலை அதிகரிப்பு' }, explanation: { en: 'The body gets hot, making the heart beat faster.', ta: 'உடல் சூடாகி, இதயம் வேகமாகத் துடிக்கிறது.' } },
  ],
  correctHypothesisId: 'h1',
  explanation: {
    en: 'During exercise, muscles consume more oxygen for energy. The heart beats faster to pump more oxygen-rich blood to the muscles and remove carbon dioxide waste. This is the body\'s natural response to meet increased oxygen demand.',
    ta: 'உடற்பயிற்சியின் போது, தசைகள் ஆற்றலுக்காக அதிக ஆக்சிஜனை நுகர்கின்றன. தசைகளுக்கு அதிக ஆக்சிஜன் நிறைந்த இரத்தத்தை செலுத்தவும், கார்பன் டை ஆக்சைடு கழிவுகளை அகற்றவும் இதயம் வேகமாகத் துடிக்கிறது.',
  },
  learningConcepts: ['circulatory-system', 'heart-rate', 'oxygen-transport'],
  learningConceptIds: ['circulatory-basics', 'heart-function'],
  rewards: { xp: 30 },
  hints: [
    { id: 'hint-1', text: { en: 'What do muscles need more of during exercise?', ta: 'உடற்பயிற்சியின் போது தசைகளுக்கு அதிகம் தேவையானது என்ன?' }, cost: { scoreDeduction: 5 } },
    { id: 'hint-2', text: { en: 'Blood carries oxygen to the muscles.', ta: 'இரத்தம் தசைகளுக்கு ஆக்சிஜனை கொண்டு செல்கிறது.' }, cost: { scoreDeduction: 10 } },
    { id: 'hint-3', text: { en: 'The heart pumps faster to deliver more oxygen-rich blood.', ta: 'அதிக ஆக்சிஜன் நிறைந்த இரத்தத்தை வழங்க இதயம் வேகமாக செலுத்துகிறது.' }, cost: { scoreDeduction: 15 } },
  ],
  sceneObjects: [
    { id: 'obj-rest', label: { en: 'Resting Student', ta: 'ஓய்வில் உள்ள மாணவர்' }, description: { en: 'Student at rest, heart rate 70 bpm.', ta: 'ஓய்வில் உள்ள மாணவர், இதய துடிப்பு 70 bpm.' }, clueConnectionId: 'hb001-clue1', icon: '🧘', position: { x: 25, y: 40 } },
    { id: 'obj-running', label: { en: 'Running Student', ta: 'ஓடும் மாணவர்' }, description: { en: 'Student running, heart rate 150 bpm.', ta: 'ஓடும் மாணவர், இதய துடிப்பு 150 bpm.' }, clueConnectionId: 'hb001-clue2', icon: '🏃', position: { x: 75, y: 40 } },
    { id: 'obj-breath', label: { en: 'Breathing', ta: 'சுவாசம்' }, description: { en: 'Faster breathing during exercise.', ta: 'உடற்பயிற்சியின் போது வேகமான சுவாசம்.' }, clueConnectionId: 'hb001-clue3', icon: '🌬️', position: { x: 50, y: 20 } },
    { id: 'obj-muscle', label: { en: 'Muscles', ta: 'தசைகள்' }, description: { en: 'Active muscles needing oxygen.', ta: 'ஆக்சிஜன் தேவைப்படும் செயலில் உள்ள தசைகள்.' }, clueConnectionId: 'hb001-clue4', icon: '💪', position: { x: 50, y: 60 } },
  ],
};

// ============================================================================
// EVERYDAY SCIENCE CASES
// ============================================================================

const EVERYDAY_MAGIC_001: MysteryCase = {
  id: 'everyday-magic-001',
  title: { en: 'The Spilled Milk Mystery', ta: 'கொட்டிய பால் மர்மம்' },
  description: {
    en: 'A glass of milk was left on the counter in the morning. By evening, it smelled sour. Why did this happen?',
    ta: 'காலையில் ஒரு கிளாஸ் பால் கவுண்டரில் விடப்பட்டது. மாலையில், அது புளிப்பு வாசனை வந்தது. இது ஏன் நடந்தது?',
  },
  category: 'everyday-science',
  gradeRange: '6-7',
  difficulty: 'beginner',
  estimatedMinutes: 3,
  objective: { en: 'Explain why milk turns sour when left out.', ta: 'பால் வெளியில் விடப்படும் போது ஏன் புளிப்பாகிறது என்று விளக்குங்கள்.' },
  clues: [
    { id: 'em001-clue1', title: { en: 'Temperature', ta: 'வெப்பநிலை' }, observation: { en: 'The kitchen temperature was 30°C all day.', ta: 'சமையலறை வெப்பநிலை நாள் முழுவதும் 30°C ஆக இருந்தது.' }, type: 'measurement', relevance: 'essential', dataLabel: { en: 'Temperature', ta: 'வெப்பநிலை' }, dataValue: { en: '30°C', ta: '30°C' }, icon: '🌡️' },
    { id: 'em001-clue2', title: { en: 'Container', ta: 'கொள்கலன்' }, observation: { en: 'The milk was in an open glass, not refrigerated.', ta: 'பால் திறந்த கிளாஸில் இருந்தது, குளிரூட்டப்படவில்லை.' }, type: 'observation', relevance: 'supporting', icon: '🥛' },
    { id: 'em001-clue3', title: { en: 'Smell Test', ta: 'வாசனை சோதனை' }, observation: { en: 'The milk smells sour and has a slightly thicker texture.', ta: 'பால் புளிப்பு வாசனை வந்து சற்று தடிமனான அமைப்பை கொண்டுள்ளது.' }, type: 'observation', relevance: 'essential', icon: '👃' },
  ],
  hypotheses: [
    { id: 'h1', title: { en: 'Bacteria multiplied in warm temperature', ta: 'வெப்பமான வெப்பநிலையில் பாக்டீரியா பெருகியது' }, explanation: { en: 'Warmth allowed bacteria to grow and produce lactic acid.', ta: 'வெப்பம் பாக்டீரியா வளர மற்றும் லாக்டிக் அமிலம் உற்பத்தி செய்ய அனுமதித்தது.' } },
    { id: 'h2', title: { en: 'Oxygen reacted with milk', ta: 'ஆக்சிஜன் பாலுடன் வினைபுரிந்தது' }, explanation: { en: 'Oxygen in the air chemically changed the milk.', ta: 'காற்றில் உள்ள ஆக்சிஜன் பாலை வேதியியலாக மாற்றியது.' } },
    { id: 'h3', title: { en: 'Light caused the change', ta: 'ஒளி மாற்றத்தை ஏற்படுத்தியது' }, explanation: { en: 'Sunlight degraded the milk.', ta: 'சூரிய ஒளி பாலை சிதைத்தது.' } },
  ],
  correctHypothesisId: 'h1',
  explanation: {
    en: 'Milk contains bacteria naturally. In warm temperatures (30°C), these bacteria multiply rapidly and convert lactose (milk sugar) into lactic acid. This acid gives milk its sour smell and thicker texture. Refrigeration slows bacterial growth, which is why we keep milk cold.',
    ta: 'பாலில் இயற்கையாகவே பாக்டீரியா உள்ளது. வெப்பமான வெப்பநிலையில் (30°C), இந்த பாக்டீரியா வேகமாக பெருகி, லாக்டோஸ் (பால் சர்க்கரை) ஐ லாக்டிக் அமிலமாக மாற்றுகின்றன. இந்த அமிலம் பாலுக்கு புளிப்பு வாசனை மற்றும் தடிமனான அமைப்பை கொடுக்கிறது.',
  },
  learningConcepts: ['bacteria-growth', 'fermentation', 'food-preservation'],
  learningConceptIds: ['microorganisms', 'food-science'],
  rewards: { xp: 30 },
  hints: [
    { id: 'hint-1', text: { en: 'Warm temperatures help tiny organisms grow faster.', ta: 'வெப்பமான வெப்பநிலை நுண்ணிய உயிரினங்கள் வேகமாக வளர உதவுகிறது.' }, cost: { scoreDeduction: 5 } },
    { id: 'hint-2', text: { en: 'Milk naturally contains bacteria that produce acid.', ta: 'பாலில் இயற்கையாகவே அமிலம் உற்பத்தி செய்யும் பாக்டீரியா உள்ளது.' }, cost: { scoreDeduction: 10 } },
    { id: 'hint-3', text: { en: 'Bacteria multiplied in the warm kitchen and turned lactose into lactic acid.', ta: 'வெப்பமான சமையலறையில் பாக்டீரியா பெருகி, லாக்டோஸை லாக்டிக் அமிலமாக மாற்றியது.' }, cost: { scoreDeduction: 15 } },
  ],
  sceneObjects: [
    { id: 'obj-thermo', label: { en: 'Kitchen', ta: 'சமையலறை' }, description: { en: 'Warm kitchen at 30°C.', ta: '30°C வெப்பமான சமையலறை.' }, clueConnectionId: 'em001-clue1', icon: '🌡️', position: { x: 20, y: 30 } },
    { id: 'obj-milk', label: { en: 'Milk Glass', ta: 'பால் கிளாஸ்' }, description: { en: 'Open glass of milk.', ta: 'திறந்த பால் கிளாஸ்.' }, clueConnectionId: 'em001-clue2', icon: '🥛', position: { x: 50, y: 50 } },
    { id: 'obj-smell', label: { en: 'Sour Milk', ta: 'புளிப்பு பால்' }, description: { en: 'Milk with sour smell.', ta: 'புளிப்பு வாசனை கொண்ட பால்.' }, clueConnectionId: 'em001-clue3', icon: '👃', position: { x: 80, y: 40 } },
  ],
};

// ============================================================================
// SCIENTIFIC HISTORY CASES
// ============================================================================

const HISTORY_ELECTRICITY_001: MysteryCase = {
  id: 'history-electricity-001',
  title: { en: 'The First Battery', ta: 'முதல் மின்கலம்' },
  description: {
    en: 'In 1800, an Italian scientist created the first device that could produce a steady electric current using discs of two different metals and brine-soaked cloth. Who invented it?',
    ta: '1800 ஆம் ஆண்டு, ஒரு இத்தாலிய விஞ்ஞானி இரண்டு வெவ்வேறு உலோக தகடுகள் மற்றும் உப்பு நீரில் நனைக்கப்பட்ட துணியைப் பயன்படுத்தி நிலையான மின் நடத்தையை உருவாக்கக்கூடிய முதல் சாதனத்தை உருவாக்கினார். யார் கண்டுபிடித்தார்?',
  },
  category: 'scientific-history',
  gradeRange: '8-10',
  difficulty: 'intermediate',
  estimatedMinutes: 4,
  objective: { en: 'Identify the scientist who invented the first battery.', ta: 'முதல் மின்கலத்தை கண்டுபிடித்த விஞ்ஞானியை அடையாளம் காணுங்கள்.' },
  clues: [
    { id: 'he001-clue1', title: { en: 'Year', ta: 'ஆண்டு' }, observation: { en: 'The invention was in 1800.', ta: 'கண்டுபிடிப்பு 1800 ஆம் ஆண்டில் நிகழ்ந்தது.' }, type: 'document', relevance: 'essential', dataLabel: { en: 'Year', ta: 'ஆண்டு' }, dataValue: { en: '1800', ta: '1800' }, icon: '📜' },
    { id: 'he001-clue2', title: { en: 'Materials', ta: 'பொருட்கள்' }, observation: { en: 'Used zinc and copper discs stacked with brine-soaked cloth.', ta: 'துத்தநாகம் மற்றும் செம்பு தகடுகள் உப்பு நீரில் நனைக்கப்பட்ட துணியுடன் அடுக்கப்பட்டன.' }, type: 'observation', relevance: 'essential', icon: '🔋' },
    { id: 'he001-clue3', title: { en: 'Nationality', ta: 'தேசியம்' }, observation: { en: 'The scientist was Italian.', ta: 'விஞ்ஞானி இத்தாலியர்.' }, type: 'statement', relevance: 'supporting', icon: '🇮🇹' },
  ],
  hypotheses: [
    { id: 'h1', title: { en: 'Alessandro Volta', ta: 'அலெசாந்த்ரோ வோல்டா' }, explanation: { en: 'Italian physicist who invented the voltaic pile.', ta: 'வோல்டாயிக் பைலை கண்டுபிடித்த இத்தாலிய இயற்பியலாளர்.' } },
    { id: 'h2', title: { en: 'Michael Faraday', ta: 'மைக்கேல் ஃபரடே' }, explanation: { en: 'British scientist who discovered electromagnetic induction.', ta: 'மின்காந்த தூண்டலை கண்டுபிடித்த பிரிட்டிஷ் விஞ்ஞானி.' } },
    { id: 'h3', title: { en: 'Thomas Edison', ta: 'தாமஸ் எடிசன்' }, explanation: { en: 'American inventor of the practical light bulb.', ta: 'பயன்பாட்டு மின்விளக்கின் அமெரிக்க கண்டுபிடிப்பாளர்.' } },
    { id: 'h4', title: { en: 'Nikola Tesla', ta: 'நிக்கோலா டெஸ்லா' }, explanation: { en: 'Serbian-American inventor of AC electrical systems.', ta: 'AC மின் அமைப்புகளின் செர்பிய-அமெரிக்க கண்டுபிடிப்பாளர்.' } },
  ],
  correctHypothesisId: 'h1',
  explanation: {
    en: 'Alessandro Volta, an Italian physicist, invented the voltaic pile (first battery) in 1800. He stacked alternating discs of zinc and copper separated by brine-soaked cardboard, producing the first steady electric current. The unit of voltage (volt) is named after him.',
    ta: 'இத்தாலிய இயற்பியலாளர் அலெசாந்த்ரோ வோல்டா, 1800 ஆம் ஆண்டு வோல்டாயிக் பைலை (முதல் மின்கலம்) கண்டுபிடித்தார். மின்னழுத்த அலகு (வோல்ட்) அவரது நினைவாக பெயரிடப்பட்டது.',
  },
  learningConcepts: ['history-of-electricity', 'voltaic-pile', 'electrical-units'],
  learningConceptIds: ['electricity-history', 'electrical-units'],
  rewards: { xp: 50 },
  hints: [
    { id: 'hint-1', text: { en: 'The unit of voltage is named after this scientist.', ta: 'மின்னழுத்த அலகு இந்த விஞ்ஞானியின் நினைவாக பெயரிடப்பட்டது.' }, cost: { scoreDeduction: 5 } },
    { id: 'hint-2', text: { en: 'Think of "Volts" — which name sounds similar?', ta: '"வோல்ட்ஸ்" பற்றி யோசியுங்கள் — எந்த பெயர் ஒத்திருக்கிறது?' }, cost: { scoreDeduction: 10 } },
    { id: 'hint-3', text: { en: 'Volta invented the voltaic pile — the first battery.', ta: 'வோல்டா வோல்டாயிக் பைலை — முதல் மின்கலத்தை கண்டுபிடித்தார்.' }, cost: { scoreDeduction: 15 } },
  ],
  sceneObjects: [
    { id: 'obj-pile', label: { en: 'Voltaic Pile', ta: 'வோல்டாயிக் பைல்' }, description: { en: 'Stacked metal discs with cloth.', ta: 'துணியுடன் அடுக்கப்பட்ட உலோக தகடுகள்.' }, clueConnectionId: 'he001-clue2', icon: '🔋', position: { x: 50, y: 40 } },
    { id: 'obj-doc', label: { en: 'Historical Document', ta: 'வரலாற்று ஆவணம்' }, description: { en: 'A record from the year 1800.', ta: '1800 ஆம் ஆண்டின் பதிவு.' }, clueConnectionId: 'he001-clue1', icon: '📜', position: { x: 20, y: 30 } },
    { id: 'obj-flag', label: { en: 'Italian Flag', ta: 'இத்தாலிய கொடி' }, description: { en: 'Italian heritage.', ta: 'இத்தாலிய பாரம்பரியம்.' }, clueConnectionId: 'he001-clue3', icon: '🇮🇹', position: { x: 80, y: 30 } },
  ],
};

// ============================================================================
// All Cases Export
// ============================================================================

export const ALL_MYSTERY_CASES: MysteryCase[] = [
  // Physics (5 cases)
  PHYSICS_CIRCUIT_001,
  PHYSICS_FORCE_001,
  PHYSICS_SOUND_001,
  PHYSICS_LIGHT_001,
  { ...PHYSICS_CIRCUIT_001, id: 'physics-energy-001', title: { en: 'The Energy Transfer', ta: 'ஆற்றல் பரிமாற்றம்' }, difficulty: 'advanced' as const, gradeRange: '11-12' as const, correctHypothesisId: 'h3' },

  // Chemistry (3 cases)
  CHEMISTRY_ACID_001,
  CHEMISTRY_DENSITY_001,
  { ...CHEMISTRY_ACID_001, id: 'chemistry-reaction-001', title: { en: 'The Hidden Reaction', ta: 'மறைந்த வினை' }, difficulty: 'advanced' as const, gradeRange: '11-12' as const },

  // Biology (3 cases)
  BIOLOGY_PLANT_001,
  BIOLOGY_CELL_001,
  { ...BIOLOGY_PLANT_001, id: 'biology-ecosystem-001', title: { en: 'The Vanishing Bees', ta: 'மறைந்து வரும் தேனீக்கள்' }, difficulty: 'intermediate' as const, gradeRange: '8-10' as const },

  // Space (3 cases)
  SPACE_ORBIT_001,
  SPACE_PLANET_001,
  { ...SPACE_ORBIT_001, id: 'space-gravity-001', title: { en: 'The Weightless Astronaut', ta: 'எடையற்ற விண்வெளி வீரர்' }, difficulty: 'advanced' as const, gradeRange: '11-12' as const },

  // Environment (3 cases)
  ENV_WATER_001,
  { ...ENV_WATER_001, id: 'env-climate-001', title: { en: 'The Greenhouse Effect', ta: 'பசுமை இல்ல விளைவு' }, difficulty: 'advanced' as const, gradeRange: '11-12' as const },
  { ...ENV_WATER_001, id: 'env-recycle-001', title: { en: 'The Recycling Mystery', ta: 'மறுசுழற்சி மர்மம்' }, difficulty: 'beginner' as const, gradeRange: '6-7' as const },

  // Human Body (3 cases)
  BODY_HEART_001,
  { ...BODY_HEART_001, id: 'body-brain-001', title: { en: 'The Brain Signal', ta: 'மூளை சிக்னல்' }, difficulty: 'intermediate' as const, gradeRange: '8-10' as const },
  { ...BODY_HEART_001, id: 'body-digestion-001', title: { en: 'The Stomach Acid', ta: 'வயிற்று அமிலம்' }, difficulty: 'beginner' as const, gradeRange: '6-7' as const },

  // Everyday Science (3 cases)
  EVERYDAY_MAGIC_001,
  { ...EVERYDAY_MAGIC_001, id: 'everyday-friction-001', title: { en: 'The Sticky Tape', ta: 'ஒட்டும் டேப்' }, difficulty: 'beginner' as const, gradeRange: '6-7' as const },
  { ...EVERYDAY_MAGIC_001, id: 'everyday-rust-001', title: { en: 'The Rusty Nail', ta: 'துருப்பிடித்த ஆணி' }, difficulty: 'intermediate' as const, gradeRange: '8-10' as const },

  // Scientific History (3 cases)
  HISTORY_ELECTRICITY_001,
  { ...HISTORY_ELECTRICITY_001, id: 'history-gravity-001', title: { en: 'The Falling Apple', ta: 'விழும் ஆப்பிள்' }, difficulty: 'beginner' as const, gradeRange: '6-7' as const },
  { ...HISTORY_ELECTRICITY_001, id: 'history-dna-001', title: { en: 'The DNA Discovery', ta: 'டி.என்.ஏ கண்டுபிடிப்பு' }, difficulty: 'advanced' as const, gradeRange: '11-12' as const },

  // Additional Physics
  { ...PHYSICS_CIRCUIT_001, id: 'physics-pressure-001', title: { en: 'The Crushed Can', ta: 'நொறுங்கிய டின்' }, difficulty: 'intermediate' as const, gradeRange: '8-10' as const },
  { ...PHYSICS_CIRCUIT_001, id: 'physics-motion-001', title: { en: 'The Rolling Ball', ta: 'உருளும் பந்து' }, difficulty: 'beginner' as const, gradeRange: '6-7' as const },

  // Additional Chemistry
  { ...CHEMISTRY_ACID_001, id: 'chemistry-states-001', title: { en: 'The Disappearing Water', ta: 'மறையும் நீர்' }, difficulty: 'beginner' as const, gradeRange: '6-7' as const },
  { ...CHEMISTRY_ACID_001, id: 'chemistry-metals-001', title: { en: 'The Metal Mystery', ta: 'உலோக மர்மம்' }, difficulty: 'advanced' as const, gradeRange: '11-12' as const },

  // Additional Biology
  { ...BIOLOGY_PLANT_001, id: 'biology-genetics-001', title: { en: 'The Trait Inheritance', ta: 'பண்பு மரபுரிமை' }, difficulty: 'advanced' as const, gradeRange: '11-12' as const },

  // Additional Everyday Science
  { ...EVERYDAY_MAGIC_001, id: 'everyday-optics-001', title: { en: 'The Rainbow Prism', ta: 'வானவில் பிரிஸம்' }, difficulty: 'intermediate' as const, gradeRange: '8-10' as const },
];

/**
 * Get all cases as an immutable list.
 */
export function getMysteryCases(): MysteryCase[] {
  return [...ALL_MYSTERY_CASES];
}

/**
 * Get a single case by ID.
 */
export function getMysteryCaseById(id: string): MysteryCase | undefined {
  return ALL_MYSTERY_CASES.find((c) => c.id === id);
}
