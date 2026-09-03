/**
 * Fun Facts Dataset
 * 150+ science facts across 7 categories, bilingual English & Tamil.
 */

import { FunFact, FactQuestion, FactCollection } from './fun-facts.types';

// ============================================================================
// FACTS DATABASE — 150+ facts
// ============================================================================

export const FUN_FACTS: FunFact[] = [
  // ── SPACE (25 facts) ──────────────────────────────────────────────────
  {
    id: 'space-001', category: 'space',
    fact: { en: 'One day on Venus is longer than one year on Venus.', ta: 'வீனஸில் ஒரு நாள் ஒரு ஆண்டை விட நீண்டது.' },
    explanation: { en: 'Venus takes 243 Earth days to rotate once but only 225 days to orbit the Sun.', ta: 'வீனஸ் ஒரு முறை சுழற்சிக்கு 243 பூமி நாட்கள் எடுக்கும், ஆனால் சூரியனை சுற்ற வெறும் 225 நாட்கள் மட்டுமே.' },
    icon: '🪐', tags: ['venus', 'rotation', 'orbit'],
  },
  {
    id: 'space-002', category: 'space',
    fact: { en: 'The Sun accounts for 99.86% of the mass in our solar system.', ta: 'சூரியன் நமது சூரிய மண்டலத்தின் மொத்த நிறையில் 99.86% கொண்டுள்ளது.' },
    icon: '☀️', tags: ['sun', 'solar-system', 'mass'],
  },
  {
    id: 'space-003', category: 'space',
    fact: { en: 'Light from the Sun takes about 8 minutes and 20 seconds to reach Earth.', ta: 'சூரியனிலிருந்து வரும் ஒளி பூமியை சென்றடைய சுமார் 8 நிமிடம் 20 வினாடிகள் எடுக்கும்.' },
    icon: '💡', tags: ['sunlight', 'speed-of-light', 'earth'],
  },
  {
    id: 'space-004', category: 'space',
    fact: { en: 'A day on Mars is almost the same length as a day on Earth.', ta: 'செவ்வாயில் ஒரு நாள் பூமியில் ஒரு நாள் போலவே கிட்டத்தட்ட ஒத்திருக்கும்.' },
    icon: '🔴', tags: ['mars', 'rotation', 'comparison'],
  },
  {
    id: 'space-005', category: 'space',
    fact: { en: 'Saturn could float in water because it is mostly made of gas.', ta: 'சனி கிரகம் நீரில் மிதக்கும், ஏனெனில் அது பெரும்பாலும் வாயுவால் ஆனது.' },
    icon: '🪐', tags: ['saturn', 'density', 'gas'],
  },
  {
    id: 'space-006', category: 'space',
    fact: { en: 'Neutron stars can spin at up to 716 times per second.', ta: 'நியூட்ரன் நட்சத்திரங்கள் வினாடிக்கு 716 முறை வரை சுழல முடியும்.' },
    icon: '⭐', tags: ['neutron-star', 'rotation', 'extreme'],
  },
  {
    id: 'space-007', category: 'space',
    fact: { en: 'There are more stars in the universe than grains of sand on Earth.', ta: 'பிரபஞ்சத்தில் பூமியில் உள்ள மணல் துகள்களை விட அதிகமான நட்சத்திரங்கள் உள்ளன.' },
    icon: '🌌', tags: ['universe', 'stars', 'scale'],
  },
  {
    id: 'space-008', category: 'space',
    fact: { en: 'The footprints on the Moon will last for millions of years because there is no wind.', ta: 'சந்திரனில் உள்ள கால் தடங்கள் காற்று இல்லாததால் மில்லியன் கணக்கான ஆண்டுகள் நீடிக்கும்.' },
    icon: '🌙', tags: ['moon', 'footprints', 'no-wind'],
  },
  {
    id: 'space-009', category: 'space',
    fact: { en: 'Jupiter has the shortest day of all the planets — it completes one rotation in under 10 hours.', ta: 'வியாழன் அனைத்து கிரகங்களிலும் மிகக் குறுகிய நாளைக் கொண்டுள்ளது — 10 மணிநேரத்திற்குள் ஒரு சுற்றை முடிக்கிறது.' },
    icon: '🟤', tags: ['jupiter', 'rotation', 'fast'],
  },
  {
    id: 'space-010', category: 'space',
    fact: { en: 'Mercury has no atmosphere and its temperature swings from −180°C to 430°C.', ta: 'புதன் வளிமண்டலம் இல்லை, அதன் வெப்பநிலை −180°C முதல் 430°C வரை மாறுகிறது.' },
    icon: '☿️', tags: ['mercury', 'temperature', 'atmosphere'],
  },
  {
    id: 'space-011', category: 'space',
    fact: { en: 'Venus is the hottest planet in the solar system with a surface temperature of about 465°C.', ta: 'வீனஸ் சூரிய மண்டலத்தின் மிகவும் சூடான கிரகம், மேற்பரப்பு வெப்பநிலை சுமார் 465°C.' },
    icon: '🔥', tags: ['venus', 'temperature', 'hot'],
  },
  {
    id: 'space-012', category: 'space',
    fact: { en: 'The Milky Way galaxy is estimated to contain 100–400 billion stars.', ta: 'பால்வழி பால்வெளி 100–400 பில்லியன் நட்சத்திரங்களைக் கொண்டிருக்கும் என மதிப்பிடப்படுகிறது.' },
    icon: '🌀', tags: ['milky-way', 'galaxy', 'stars'],
  },
  {
    id: 'space-013', category: 'space',
    fact: { en: 'The Moon is slowly moving away from Earth at about 3.8 cm per year.', ta: 'சந்திரன் ஆண்டுக்கு சுமார் 3.8 செமீ வேகத்தில் பூமியிலிருந்து விலகிச் செல்கிறது.' },
    icon: '📏', tags: ['moon', 'distance', 'tidal'],
  },
  {
    id: 'space-014', category: 'space',
    fact: { en: 'The International Space Station orbits Earth every 90 minutes.', ta: 'சர்வதேச விண்வெளி நிலையம் ஒவ்வொரு 90 நிமிடத்திற்கும் பூமியை சுற்றுகிறது.' },
    icon: '🛸', tags: ['iss', 'orbit', 'speed'],
  },
  {
    id: 'space-015', category: 'space',
    fact: { en: 'Uranus rotates on its side, with an axial tilt of about 98 degrees.', ta: 'யுரேனஸ் பக்கவாட்டாக சுழல்கிறது, அதன் அச்சு சாய்வு சுமார் 98 டிகிரி.' },
    icon: '💎', tags: ['uranus', 'tilt', 'rotation'],
  },
  {
    id: 'space-016', category: 'space',
    fact: { en: 'A neutron star is so dense that a teaspoon of it would weigh about 6 billion tons.', ta: 'நியூட்ரன் நட்சத்திரம் மிகவும் அடர்த்தியானது, ஒரு தேக்கரண்டி சுமார் 6 பில்லியன் டன் எடை கொண்டது.' },
    icon: '⚖️', tags: ['neutron-star', 'density', 'extreme'],
  },
  {
    id: 'space-017', category: 'space',
    fact: { en: 'Space is completely silent because sound cannot travel in a vacuum.', ta: 'வெற்றிடத்தில் ஒலி பயணிக்க முடியாததால் விண்வெளி முற்றிலும் அமைதியாக இருக்கும்.' },
    icon: '🤫', tags: ['sound', 'vacuum', 'space'],
  },
  {
    id: 'space-018', category: 'space',
    fact: { en: 'Mars has the tallest volcano in the solar system — Olympus Mons at about 22 km high.', ta: 'செவ்வாயில் சூரிய மண்டலத்தின் மிக உயரமான எரிமலை உள்ளது — ஒலிம்பஸ் மான்ஸ் சுமார் 22 கி.மீ உயரம்.' },
    icon: '🌋', tags: ['mars', 'olympus-mons', 'volcano'],
  },
  {
    id: 'space-019', category: 'space',
    fact: { en: 'The Great Red Spot on Jupiter is a storm that has been raging for over 300 years.', ta: 'வியாழனின் பெரிய சிவப்பு புள்ளி 300 ஆண்டுகளுக்கும் மேலாக நடைபெற்று வரும் புயல்.' },
    icon: '🌪️', tags: ['jupiter', 'storm', 'great-red-spot'],
  },
  {
    id: 'space-020', category: 'space',
    fact: { en: 'Light travels at approximately 300,000 kilometers per second.', ta: 'ஒளி வினாடிக்கு சுமார் 3,00,000 கிலோமீட்டர் வேகத்தில் பயணிக்கிறது.' },
    icon: '⚡', tags: ['light', 'speed', 'physics'],
  },
  {
    id: 'space-021', category: 'space',
    fact: { en: 'The Sun will eventually become a red giant in about 5 billion years.', ta: 'சூரியன் சுமார் 5 பில்லியன் ஆண்டுகளில் ஒரு சிவப்பு மாபெரும் நட்சத்திரமாக மாறும்.' },
    icon: '🌟', tags: ['sun', 'evolution', 'future'],
  },
  {
    id: 'space-022', category: 'space',
    fact: { en: 'Comets are made of ice, dust, and rock — often called dirty snowballs.', ta: 'வால் நட்சத்திரங்கள் பனி, தூசி மற்றும் பாறையால் ஆனவை — பெரும்பாலும் அசுத்தமான பனிக்கட்டிகள் என அழைக்கப்படுகின்றன.' },
    icon: '☄️', tags: ['comet', 'ice', 'structure'],
  },
  {
    id: 'space-023', category: 'space',
    fact: { en: 'Jupiter\'s Great Red Spot is so large that Earth could fit inside it.', ta: 'வியாழனின் பெரிய சிவப்பு புள்ளி மிகவும் பெரியது, பூமியை உள்ளே பொருத்தலாம்.' },
    icon: '🟠', tags: ['jupiter', 'scale', 'comparison'],
  },
  {
    id: 'space-024', category: 'space',
    fact: { en: 'Saturn\'s rings are mostly made of ice particles ranging from tiny grains to large chunks.', ta: 'சனியின் வளையங்கள் பெரும்பாலும் சிறிய துகள்கள் முதல் பெரிய துண்டுகள் வரையிலான பனி துகள்களால் ஆனவை.' },
    icon: '💍', tags: ['saturn', 'rings', 'ice'],
  },
  {
    id: 'space-025', category: 'space',
    fact: { en: 'Gravity on the Moon is about one-sixth of the gravity on Earth.', ta: 'சந்திரனில் ஈர்ப்பு விசை பூமியில் உள்ள ஈர்ப்பு விசையில் சுமார் ஆறில் ஒரு பங்கு.' },
    icon: '🦘', tags: ['moon', 'gravity', 'comparison'],
  },

  // ── PHYSICS (22 facts) ────────────────────────────────────────────────
  {
    id: 'physics-001', category: 'physics',
    fact: { en: 'Light travels faster than sound — that is why you see lightning before you hear thunder.', ta: 'ஒளி ஒலியை விட வேகமாக பயணிக்கிறது — அதனால் தான் இடி மின்னலை முதலில் பார்க்கிறோம்.' },
    icon: '⚡', tags: ['light', 'sound', 'speed'],
  },
  {
    id: 'physics-002', category: 'physics',
    fact: { en: 'Sound cannot travel through a vacuum — it needs a medium like air or water.', ta: 'ஒலி வெற்றிடத்தில் பயணிக்க முடியாது — காற்று அல்லது நீர் போன்ற ஊடகம் தேவை.' },
    icon: '🔊', tags: ['sound', 'vacuum', 'medium'],
  },
  {
    id: 'physics-003', category: 'physics',
    fact: { en: 'The speed of light in a vacuum is about 300,000 km/s — the fastest speed in the universe.', ta: 'வெற்றிடத்தில் ஒளியின் வேகம் சுமார் 3,00,000 கி.மீ/வி — பிரபஞ்சத்தின் மிக வேகமான வேகம்.' },
    icon: '💫', tags: ['speed-of-light', 'constant', 'physics'],
  },
  {
    id: 'physics-004', category: 'physics',
    fact: { en: 'Water expands when it freezes, which is why ice floats on water.', ta: 'நீர் உறையும் போது விரிவடையும், அதனால் தான் பனிக்கட்டி நீரில் மிதக்கிறது.' },
    icon: '🧊', tags: ['water', 'expansion', 'ice'],
  },
  {
    id: 'physics-005', category: 'physics',
    fact: { en: 'Friction is the force that opposes motion between two surfaces in contact.', ta: 'உராய்வு என்பது தொடர்பு கொண்ட இரு மேற்பரப்புகளுக்கு இடையே இயக்கத்தை எதிர்க்கும் விசை.' },
    icon: '🛑', tags: ['friction', 'force', 'motion'],
  },
  {
    id: 'physics-006', category: 'physics',
    fact: { en: 'Electricity travels at nearly the speed of light through wires.', ta: 'மின்சாரம் கம்பிகள் வழியாக ஒளியின் வேகத்திற்கு நெருக்கமாக பயணிக்கிறது.' },
    icon: '⚡', tags: ['electricity', 'speed', 'wires'],
  },
  {
    id: 'physics-007', category: 'physics',
    fact: { en: 'Every object on Earth is pulled toward the center by gravity.', ta: 'பூமியில் உள்ள ஒவ்வொரு பொருளும் ஈர்ப்பு விசையால் மையத்தை நோக்கி இழுக்கப்படுகிறது.' },
    icon: '🍎', tags: ['gravity', 'newton', 'force'],
  },
  {
    id: 'physics-008', category: 'physics',
    fact: { en: 'Metals are good conductors of heat and electricity because of free-moving electrons.', ta: 'உலோகங்கள் சுதந்திரமாக நகரும் எலக்ட்ரான்கள் காரணமாக வெப்பம் மற்றும் மின்சாரத்தின் நல்ல கடத்திகள்.' },
    icon: '🔌', tags: ['metals', 'conductivity', 'electrons'],
  },
  {
    id: 'physics-009', category: 'physics',
    fact: { en: 'The human body generates about 100 watts of power at rest — enough to light a bulb.', ta: 'மனித உடல் ஓய்வில் சுமார் 100 வாட் மின்சக்தியை உற்பத்தி செய்கிறது — ஒரு மின்விளக்கை எரிய வைக்க போதுமானது.' },
    icon: '💡', tags: ['body', 'energy', 'power'],
  },
  {
    id: 'physics-010', category: 'physics',
    fact: { en: 'Hot air rises because it is less dense than cold air.', ta: 'சூடான காற்று குளிர்ந்த காற்றை விட குறைவான அடர்த்தி கொண்டதால் மேலே உயர்கிறது.' },
    icon: '🎈', tags: ['density', 'convection', 'air'],
  },
  {
    id: 'physics-011', category: 'physics',
    fact: { en: 'A rainbow is formed when sunlight is refracted, reflected, and dispersed inside water droplets.', ta: 'நீர் துளிகளுக்குள் சூரிய ஒளி வகைமாற்றம், பிரதிபலிப்பு மற்றும் பரவல் அடையும் போது வானவில் உருவாகிறது.' },
    icon: '🌈', tags: ['rainbow', 'light', 'refraction'],
  },
  {
    id: 'physics-012', category: 'physics',
    fact: { en: 'Superconductors can conduct electricity with zero resistance when cooled to very low temperatures.', ta: 'மிகக் குறைந்த வெப்பநிலைக்கு குளிர்விக்கப்படும் போது மேலிக் கடத்திகள் பூஜ்ஜிய எதிர்ப்புடன் மின்சாரத்தை கடத்த முடியும்.' },
    icon: '🧲', tags: ['superconductor', 'resistance', 'electricity'],
  },
  {
    id: 'physics-013', category: 'physics',
    fact: { en: 'Energy cannot be created or destroyed — it can only be changed from one form to another.', ta: 'ஆற்றலை உருவாக்கவோ அழிக்கவோ முடியாது — அதை ஒரு வடிவத்திலிருந்து மற்றொன்றுக்கு மாற்ற மட்டுமே முடியும்.' },
    icon: '♻️', tags: ['conservation', 'energy', 'law'],
  },
  {
    id: 'physics-014', category: 'physics',
    fact: { en: 'Magnets have two poles — North and South — and opposite poles attract each other.', ta: 'காந்தங்களுக்கு இரண்டு துருவங்கள் உள்ளன — வட மற்றும் தென் — எதிர் துருவங்கள் ஒன்றையொன்று ஈர்க்கும்.' },
    icon: '🧲', tags: ['magnet', 'poles', 'attraction'],
  },
  {
    id: 'physics-015', category: 'physics',
    fact: { en: 'A pendulum swings at a constant rate regardless of its weight — this is called isochronism.', ta: 'ஒரு நிலைக்குலுக்கி அதன் எடையைப் பொருட்படுத்தாமல் நிலையான வேகத்தில் ஆடுகிறது — இது சமகாலிகம் என்று அழைக்கப்படுகிறது.' },
    icon: '🕰️', tags: ['pendulum', 'time', 'galileo'],
  },
  {
    id: 'physics-016', category: 'physics',
    fact: { en: 'Sound waves are longitudinal waves — they compress and rarefy the medium they travel through.', ta: 'ஒலி அலைகள் நெட்செல் அலைகள் — அவை பயணிக்கும் ஊடகத்தை சுருக்கி விரிவாக்குகின்றன.' },
    icon: '🌊', tags: ['sound', 'wave', 'longitudinal'],
  },
  {
    id: 'physics-017', category: 'physics',
    fact: { en: 'The boiling point of water decreases at high altitudes because air pressure is lower.', ta: 'காற்று அழுத்தம் குறைவாக இருப்பதால் அதிக உயரத்தில் நீரின் கொதிநிலை குறைகிறது.' },
    icon: '🏔️', tags: ['boiling', 'altitude', 'pressure'],
  },
  {
    id: 'physics-018', category: 'physics',
    fact: { en: 'Reflection of light follows the law: angle of incidence equals angle of reflection.', ta: 'ஒளியின் பிரதிபலிப்பு விதியைப் பின்பற்றுகிறது: விழுதல் கோணம் பிரதிபலிப்பு கோணத்திற்கு சமம்.' },
    icon: '🪞', tags: ['reflection', 'law', 'optics'],
  },
  {
    id: 'physics-019', category: 'physics',
    fact: { en: 'Sound travels about four times faster in water than in air.', ta: 'ஒலி நீரில் காற்றை விட நான்கு மடங்கு வேகமாக பயணிக்கிறது.' },
    icon: '💧', tags: ['sound', 'speed', 'medium'],
  },
  {
    id: 'physics-020', category: 'physics',
    fact: { en: 'Inertia is the tendency of an object to resist changes in its state of motion.', ta: 'யினர்சியா என்பது ஒரு பொருளின் இயக்க நிலையில் மாற்றங்களை எதிர்க்கும் போக்கு.' },
    icon: '🎳', tags: ['inertia', 'newton', 'motion'],
  },
  {
    id: 'physics-021', category: 'physics',
    fact: { en: 'Mirages in deserts are caused by the refraction of light through layers of hot and cold air.', ta: 'பாலைவனத்தில் உள்ள கனவுகள் சூடான மற்றும் குளிர்ந்த காற்று அடுக்குகள் வழியாக ஒளியின் வகைமாற்றத்தால் ஏற்படுகின்றன.' },
    icon: '🏜️', tags: ['mirage', 'refraction', 'desert'],
  },
  {
    id: 'physics-022', category: 'physics',
    fact: { en: 'The Earth\'s magnetic field protects us from harmful solar winds.', ta: 'பூமியின் காந்தப் புலம் தீங்கு விளைவிக்கும் சூரியக் காற்றுகளிலிருந்து நம்மை பாதுகாக்கிறது.' },
    icon: '🌍', tags: ['magnetic-field', 'protection', 'solar'],
  },

  // ── CHEMISTRY (20 facts) ──────────────────────────────────────────────
  {
    id: 'chem-001', category: 'chemistry',
    fact: { en: 'Water boils at 100°C and freezes at 0°C at sea level.', ta: 'கடல் மட்டத்தில் நீர் 100°C இல் கொதிக்கிறது மற்றும் 0°C இல் உறைகிறது.' },
    icon: '💧', tags: ['water', 'boiling', 'freezing'],
  },
  {
    id: 'chem-002', category: 'chemistry',
    fact: { en: 'Rust is iron oxide — it forms when iron reacts with oxygen and water.', ta: 'துரு என்பது இரும்பு ஆக்சைடு — இரும்பு ஆக்சிஜன் மற்றும் நீருடன் வினைபுரியும் போது உருவாகிறது.' },
    icon: '🔩', tags: ['rust', 'iron', 'oxidation'],
  },
  {
    id: 'chem-003', category: 'chemistry',
    fact: { en: 'Table salt is made of two elements: sodium and chlorine.', ta: 'சமையல் உப்பு இரண்டு தனிமங்களால் ஆனது: சோடியம் மற்றும் குளோரின்.' },
    icon: '🧂', tags: ['salt', 'sodium', 'chlorine'],
  },
  {
    id: 'chem-004', category: 'chemistry',
    fact: { en: 'Diamonds are made entirely of carbon atoms arranged in a crystal structure.', ta: 'வைரங்கள் முற்றிலும் கிருஸ்டல் அமைப்பில் அமைக்கப்பட்ட கார்பன் அணுக்களால் ஆனவை.' },
    icon: '💎', tags: ['diamond', 'carbon', 'crystal'],
  },
  {
    id: 'chem-005', category: 'chemistry',
    fact: { en: 'The pH scale ranges from 0 to 14 — below 7 is acidic, above 7 is basic.', ta: 'pH அளவு 0 முதல் 14 வரை உள்ளது — 7 க்கு கீழ் அமிலம், 7 க்கு மேல் காரம்.' },
    icon: '🧪', tags: ['ph', 'acid', 'base'],
  },
  {
    id: 'chem-006', category: 'chemistry',
    fact: { en: 'Helium was first discovered on the Sun before it was found on Earth.', ta: 'ஹீலியம் முதலில் பூமியில் கண்டுபிடிக்கப்படுவதற்கு முன் சூரியனில் கண்டுபிடிக்கப்பட்டது.' },
    icon: '🎈', tags: ['helium', 'sun', 'discovery'],
  },
  {
    id: 'chem-007', category: 'chemistry',
    fact: { en: 'Vinegar is a dilute solution of acetic acid — typically about 5% concentration.', ta: 'வினிகர் என்பது அசிட்டிக் அமிலத்தின் மெல்லிய கரைசல் — வழக்கமாக 5% செறிவு.' },
    icon: '🫗', tags: ['vinegar', 'acid', 'everyday'],
  },
  {
    id: 'chem-008', category: 'chemistry',
    fact: { en: 'Gold is one of the least reactive metals — it does not rust or tarnish.', ta: 'தங்கம் மிகக் குறைவான வினைத்திறன் கொண்ட உலோகங்களில் ஒன்று — அது துருப்பிடிக்காது.' },
    icon: '🥇', tags: ['gold', 'reactivity', 'metal'],
  },
  {
    id: 'chem-009', category: 'chemistry',
    fact: { en: 'The chemical formula for water is H₂O — two hydrogen atoms and one oxygen atom.', ta: 'நீரின் வேதியியல் வாய்பாடு H₂O — இரண்டு ஹைட்ரஜன் அணுக்கள் மற்றும் ஒரு ஆக்சிஜன் அணு.' },
    icon: '💧', tags: ['water', 'formula', 'hydrogen'],
  },
  {
    id: 'chem-010', category: 'chemistry',
    fact: { en: 'Iron filings are attracted to magnets because iron is a ferromagnetic material.', ta: 'இரும்பு துகள்கள் காந்தங்களால் ஈர்க்கப்படுகின்றன, ஏனெனில் இரும்பு ஒரு காந்தப் பொருள்.' },
    icon: '🧲', tags: ['iron', 'magnetic', 'ferromagnetic'],
  },
  {
    id: 'chem-011', category: 'chemistry',
    fact: { en: 'Baking soda is sodium bicarbonate — it reacts with vinegar to produce carbon dioxide gas.', ta: 'பேக்கிங் சோடா என்பது சோடியம் பைகார்பனேட் — இது வினிகருடன் வினைபுரிந்து கார்பன் டை ஆக்சைடு வாயுவை உற்பத்தி செய்கிறது.' },
    icon: '🧫', tags: ['baking-soda', 'reaction', 'co2'],
  },
  {
    id: 'chem-012', category: 'chemistry',
    fact: { en: 'Neon signs glow because neon gas emits bright reddish-orange light when electrified.', ta: 'நியான் விளக்குகள் மின்சேர்க்கையின் போது நியான் வாயு பிரகாசமான சிவப்பு-ஆரஞ்சு ஒளியை வெளியிடுவதால் ஒளிரும்.' },
    icon: '💡', tags: ['neon', 'gas', 'light'],
  },
  {
    id: 'chem-013', category: 'chemistry',
    fact: { en: 'Carbon dioxide is a greenhouse gas that traps heat in Earth\'s atmosphere.', ta: 'கார்பன் டை ஆக்சைடு என்பது பூமியின் வளிமண்டலத்தில் வெப்பத்தை சிக்க வைக்கும் பசுமை இல்ல வாயு.' },
    icon: '🏭', tags: ['co2', 'greenhouse', 'climate'],
  },
  {
    id: 'chem-014', category: 'chemistry',
    fact: { en: 'Milk turns sour because bacteria convert lactose into lactic acid.', ta: 'பால் புளிப்பது பாக்டீரியா லாக்டோஸை லாக்டிக் அமிலமாக மாற்றுவதால்.' },
    icon: '🥛', tags: ['milk', 'bacteria', 'acid'],
  },
  {
    id: 'chem-015', category: 'chemistry',
    fact: { en: 'Glass is made from sand — specifically silicon dioxide — heated to very high temperatures.', ta: 'கண்ணாடி மணலிலிருந்து தயாரிக்கப்படுகிறது — குறிப்பாக சிலிக்கான் டை ஆக்சைடு — மிக அதிக வெப்பநிலையில் சூடாக்கப்படுகிறது.' },
    icon: '🪟', tags: ['glass', 'sand', 'silicon'],
  },
  {
    id: 'chem-016', category: 'chemistry',
    fact: { en: 'Copper turns green over time due to a reaction with air and moisture — called patina.', ta: 'தாமிரம் காற்று மற்றும் ஈரப்பதத்துடன் வினைபுரிவதால் பச்சையாக மாறுகிறது — இது பாட்டினா என்று அழைக்கப்படுகிறது.' },
    icon: '🏛️', tags: ['copper', 'patina', 'oxidation'],
  },
  {
    id: 'chem-017', category: 'chemistry',
    fact: { en: 'The element oxygen makes up about 21% of Earth\'s atmosphere.', ta: 'ஆக்சிஜன் தனிமம் பூமியின் வளிமண்டலத்தில் சுமார் 21% ஆக உள்ளது.' },
    icon: '🌬️', tags: ['oxygen', 'atmosphere', 'composition'],
  },
  {
    id: 'chem-018', category: 'chemistry',
    fact: { en: 'Sugar dissolves in water because water molecules surround and separate the sugar molecules.', ta: 'சர்க்கரை நீரில் கரைகிறது, ஏனெனில் நீர் மூலக்கூறுகள் சர்க்கரை மூலக்கூறுகளை சூழ்ந்து பிரிக்கின்றன.' },
    icon: '🍬', tags: ['sugar', 'dissolving', 'solubility'],
  },
  {
    id: 'chem-019', category: 'chemistry',
    fact: { en: 'Neon, argon, krypton, and xenon are all noble gases — they rarely react with other elements.', ta: 'நியான், ஆர்கான், கிரிப்டன் மற்றும் சீனான் அனைத்தும் உயர் வாயுக்கள் — மற்ற தனிமங்களுடன் அரிதாகவே வினைபுரிகின்றன.' },
    icon: '💨', tags: ['noble-gas', 'reactivity', 'inert'],
  },
  {
    id: 'chem-020', category: 'chemistry',
    fact: { en: 'An atom is mostly empty space — if an atom were the size of a stadium, the nucleus would be the size of a marble.', ta: 'ஒரு அணு பெரும்பாலும் வெற்றிடம் — ஒரு அணு ஒரு மைதானத்தின் அளவு இருந்தால், அணுக்கரு ஒரு மார்பிள் அளவு இருக்கும்.' },
    icon: '⚛️', tags: ['atom', 'nucleus', 'scale'],
  },

  // ── BIOLOGY (22 facts) ────────────────────────────────────────────────
  {
    id: 'bio-001', category: 'biology',
    fact: { en: 'Octopuses have three hearts and blue blood.', ta: 'ஆக்டோபஸ்களுக்கு மூன்று இதயங்கள் மற்றும் நீல இரத்தம் உள்ளன.' },
    icon: '🐙', tags: ['octopus', 'heart', 'blood'],
  },
  {
    id: 'bio-002', category: 'biology',
    fact: { en: 'Bamboo can grow up to 91 cm in a single day — the fastest-growing plant on Earth.', ta: 'முங்கை ஒரே நாளில் 91 செமீ வரை வளர முடியும் — பூமியில் மிக விரைவாக வளரும் தாவரம்.' },
    icon: '🎋', tags: ['bamboo', 'growth', 'speed'],
  },
  {
    id: 'bio-003', category: 'biology',
    fact: { en: 'Humans share about 60% of their DNA with bananas.', ta: 'மனிதர்கள் தங்கள் DNA இன் சுமார் 60% வாழைப்பழங்களுடன் பகிர்ந்து கொள்கின்றனர்.' },
    icon: '🍌', tags: ['dna', 'banana', 'genetics'],
  },
  {
    id: 'bio-004', category: 'biology',
    fact: { en: 'The human body contains about 37.2 trillion cells.', ta: 'மனித உடலில் சுமார் 37.2 டிரில்லியன் செல்கள் உள்ளன.' },
    icon: '🔬', tags: ['cells', 'body', 'trillions'],
  },
  {
    id: 'bio-005', category: 'biology',
    fact: { en: 'A group of flamingos is called a "flamboyance."', ta: 'ஃபிளாமிங்கோக்களின் குழு "ஃபிளாம்போயன்ஸ்" என்று அழைக்கப்படுகிறது.' },
    icon: '🦩', tags: ['flamingo', 'group', 'names'],
  },
  {
    id: 'bio-006', category: 'biology',
    fact: { en: 'Cows have almost 360-degree vision — they can see almost everything except what is directly behind them.', ta: 'பசுக்களுக்கு கிட்டத்தட்ட 360 டிகிரி பார்வை உள்ளது — நேரடியாக பின்னால் இருப்பதைத் தவிர கிட்டத்தட்ட எல்லாவற்றையும் பார்க்க முடியும்.' },
    icon: '🐄', tags: ['cow', 'vision', 'eyes'],
  },
  {
    id: 'bio-007', category: 'biology',
    fact: { en: 'Trees can communicate with each other through underground fungal networks.', ta: 'மரங்கள் நிலத்தடி பூஞ்சை வலையமைப்புகள் மூலம் ஒன்றோடொன்று தொடர்பு கொள்ள முடியும்.' },
    icon: '🌳', tags: ['trees', 'communication', 'fungi'],
  },
  {
    id: 'bio-008', category: 'biology',
    fact: { en: 'Your nose can remember about 50,000 different scents.', ta: 'உங்கள் மூக்கு சுமார் 50,000 வெவ்வேறு வாசனைகளை நினைவில் கொள்ள முடியும்.' },
    icon: '👃', tags: ['nose', 'smell', 'scent'],
  },
  {
    id: 'bio-009', category: 'biology',
    fact: { en: 'Wolves can eat up to 20 pounds of meat in a single meal.', ta: 'ஓநாய்கள் ஒரே உணவில் 20 பவுண்ட் இறைச்சியை உண்ண முடியும்.' },
    icon: '🐺', tags: ['wolf', 'eating', 'capacity'],
  },
  {
    id: 'bio-010', category: 'biology',
    fact: { en: 'The Amazon Rainforest produces about 20% of the world\'s oxygen.', ta: 'அமேசான் மழைக்காடு உலகின் ஆக்சிஜனில் சுமார் 20% ஐ உற்பத்தி செய்கிறது.' },
    icon: '🌴', tags: ['amazon', 'oxygen', 'rainforest'],
  },
  {
    id: 'bio-011', category: 'biology',
    fact: { en: 'The human brain has about 86 billion neurons.', ta: 'மனித மூளையில் சுமார் 86 பில்லியன் நியூரான்கள் உள்ளன.' },
    icon: '🧠', tags: ['brain', 'neurons', 'nervous-system'],
  },
  {
    id: 'bio-012', category: 'biology',
    fact: { en: 'A human skeleton is replaced approximately every 10 years.', ta: 'ஒரு மனித எலும்புக்கூடு சுமார் ஒவ்வொரு 10 ஆண்டுகளுக்கும் மாற்றப்படுகிறது.' },
    icon: '🦴', tags: ['skeleton', 'regeneration', 'bone'],
  },
  {
    id: 'bio-013', category: 'biology',
    fact: { en: 'Butterflies taste with their feet.', ta: 'பட்டாம்பூச்சிகள் தங்கள் கால்களால் சுவைக்கின்றன.' },
    icon: '🦋', tags: ['butterfly', 'taste', 'feet'],
  },
  {
    id: 'bio-014', category: 'biology',
    fact: { en: 'Sharks have been around longer than trees — they existed about 400 million years ago.', ta: 'சுறாக்கள் மரங்களை விட நீண்ட காலமாக உள்ளன — அவை சுமார் 400 மில்லியன் ஆண்டுகளுக்கு முன் இருந்தன.' },
    icon: '🦈', tags: ['shark', 'evolution', 'ancient'],
  },
  {
    id: 'bio-015', category: 'biology',
    fact: { en: 'Tardigrades can survive in outer space — they are nearly indestructible.', ta: 'டார்டிகிரேட்கள் விண்வெளியில் உயிர் வாழ முடியும் — அவை கிட்டத்தட்ட அழிக்க முடியாதவை.' },
    icon: '🐛', tags: ['tardigrade', 'survival', 'extremophile'],
  },
  {
    id: 'bio-016', category: 'biology',
    fact: { en: 'The tongue print of every human is unique, just like a fingerprint.', ta: 'ஒவ்வொரு மனிதனின் நாக்கு அச்சும் கைவிரல் அச்சு போலவே தனித்துவமானது.' },
    icon: '👅', tags: ['tongue', 'unique', 'identification'],
  },
  {
    id: 'bio-017', category: 'biology',
    fact: { en: 'A single oak tree can produce about 70,000 acorns in one year.', ta: 'ஒரு மா மரம் ஒரே ஆண்டில் சுமார் 70,000 மாச்சினங்களை உற்பத்தி செய்ய முடியும்.' },
    icon: '🌳', tags: ['oak', 'acorns', 'production'],
  },
  {
    id: 'bio-018', category: 'biology',
    fact: { en: 'Electric eels can produce shocks of up to 600 volts.', ta: 'மின் எலிகள் 600 வோல்ட் வரை அதிர்வுகளை உற்பத்தி செய்ய முடியும்.' },
    icon: '⚡', tags: ['electric-eel', 'voltage', 'adaptation'],
  },
  {
    id: 'bio-019', category: 'biology',
    fact: { en: 'Sea otters hold hands while sleeping so they don\'t drift apart.', ta: 'கடல் ஊட்டுகள் தூங்கும் போது கைகளை பிடித்துக்கொள்கின்றன, அவை விலகிச் செல்லாமல்.' },
    icon: '🦦', tags: ['sea-otter', 'sleeping', 'behavior'],
  },
  {
    id: 'bio-020', category: 'biology',
    fact: { en: 'Honey never spoils — archaeologists found 3,000-year-old honey in Egyptian tombs that was still edible.', ta: 'தேன் ஒருபோதும் கெடாது — எகிப்திய கல்லறைகளில் 3,000 ஆண்டுகள் பழமையான தேனை தொல்பொருள் ஆய்வாளர்கள் கண்டுபிடித்தனர்.' },
    icon: '🍯', tags: ['honey', 'preservation', 'egypt'],
  },
  {
    id: 'bio-021', category: 'biology',
    fact: { en: 'Your red blood cells can complete a full circuit of your body in about 20 seconds.', ta: 'உங்கள் சிவப்பு இரத்த செல்கள் சுமார் 20 வினாடிகளில் உங்கள் உடலின் முழு சுற்றை முடிக்க முடியும்.' },
    icon: '🩸', tags: ['blood', 'circulation', 'speed'],
  },
  {
    id: 'bio-022', category: 'biology',
    fact: { en: 'Trees provide about 28% of the oxygen we breathe through photosynthesis.', ta: 'மரங்கள் ஒளிச்சேர்க்கை மூலம் நாம் சுவாசிக்கும் ஆக்சிஜனில் சுமார் 28% ஐ வழங்குகின்றன.' },
    icon: '🌿', tags: ['trees', 'oxygen', 'photosynthesis'],
  },

  // ── HUMAN BODY (22 facts) ─────────────────────────────────────────────
  {
    id: 'body-001', category: 'human-body',
    fact: { en: 'The human heart beats about 100,000 times per day.', ta: 'மனித இதயம் ஒரு நாளைக்கு சுமார் 1,00,000 முறை துடிக்கிறது.' },
    icon: '❤️', tags: ['heart', 'beats', 'daily'],
  },
  {
    id: 'body-002', category: 'human-body',
    fact: { en: 'Your bones are stronger than steel — ounce for ounce, bone is stronger than steel.', ta: 'உங்கள் எலும்புகள் எஃகை விட வலுவானவை — எடைக்கு எடை, எலும்பு எஃகை விட வலுவானது.' },
    icon: '🦴', tags: ['bones', 'strength', 'steel'],
  },
  {
    id: 'body-003', category: 'human-body',
    fact: { en: 'The human eye can distinguish about 10 million different colors.', ta: 'மனித கண் சுமார் 10 மில்லியன் வெவ்வேறு நிறங்களை வேறுபடுத்த முடியும்.' },
    icon: '👁️', tags: ['eye', 'color', 'vision'],
  },
  {
    id: 'body-004', category: 'human-body',
    fact: { en: 'The stomach produces a new lining every three to four days to prevent digesting itself.', ta: 'வயிறு தன்னையே செரிமானம் செய்வதைத் தடுக்க ஒவ்வொரு மூன்று அல்லது நான்கு நாட்களுக்கும் புதிய உறையை உற்பத்தி செய்கிறது.' },
    icon: '🫁', tags: ['stomach', 'lining', 'regeneration'],
  },
  {
    id: 'body-005', category: 'human-body',
    fact: { en: 'The human body contains about 206 bones in an adult.', ta: 'ஒரு வயது வந்த மனித உடலில் சுமார் 206 எலும்புகள் உள்ளன.' },
    icon: '🦴', tags: ['bones', 'count', 'adult'],
  },
  {
    id: 'body-006', category: 'human-body',
    fact: { en: 'Fingernails and toenails grow about 3.5 mm per month.', ta: 'கைநகங்கள் மற்றும் கால்நகங்கள் மாதத்திற்கு சுமார் 3.5 மி.மீ வளர்கின்றன.' },
    icon: '💅', tags: ['nails', 'growth', 'monthly'],
  },
  {
    id: 'body-007', category: 'human-body',
    fact: { en: 'The human nose can detect over 1 trillion different scents.', ta: 'மனித மூக்கு 1 டிரில்லியனுக்கும் மேற்பட்ட வெவ்வேறு வாசனைகளை கண்டறிய முடியும்.' },
    icon: '👃', tags: ['nose', 'smell', 'trillion'],
  },
  {
    id: 'body-008', category: 'human-body',
    fact: { en: 'You are taller in the morning than at night — your spine compresses during the day.', ta: 'காலையில் இரவை விட நீங்கள் உயரமாக இருப்பீர்கள் — உங்கள் முதுகெலும்பு பகலில் சுருங்குகிறது.' },
    icon: '📏', tags: ['height', 'spine', 'compression'],
  },
  {
    id: 'body-009', category: 'human-body',
    fact: { en: 'Your stomach lining replaces itself every 3 to 4 days.', ta: 'உங்கள் வயிற்று உறை ஒவ்வொரு 3 முதல் 4 நாட்களுக்கும் தன்னை மாற்றிக்கொள்கிறது.' },
    icon: '🔄', tags: ['stomach', 'regeneration', 'cells'],
  },
  {
    id: 'body-010', category: 'human-body',
    fact: { en: 'The average human body contains about 37.2 trillion cells.', ta: 'சராசரி மனித உடலில் சுமார் 37.2 டிரில்லியன் செல்கள் உள்ளன.' },
    icon: '🔬', tags: ['cells', 'count', 'body'],
  },
  {
    id: 'body-011', category: 'human-body',
    fact: { en: 'Humans shed about 600,000 particles of skin every hour.', ta: 'மனிதர்கள் ஒரு மணிநேரத்திற்கு சுமார் 6,00,000 தோல் துகள்களை உதிர்க்கின்றனர்.' },
    icon: '🧴', tags: ['skin', 'shedding', 'particles'],
  },
  {
    id: 'body-012', category: 'human-body',
    fact: { en: 'The hardest substance in the human body is tooth enamel.', ta: 'மனித உடலில் மிகவும் கடினமான பொருள் பற்களின் எனாமல்.' },
    icon: '🦷', tags: ['tooth', 'enamel', 'hard'],
  },
  {
    id: 'body-013', category: 'human-body',
    fact: { en: 'The human body has about 60,000 miles of blood vessels.', ta: 'மனித உடலில் சுமார் 60,000 மைல் இரத்த நாளங்கள் உள்ளன.' },
    icon: '🩸', tags: ['vessels', 'blood', 'length'],
  },
  {
    id: 'body-014', category: 'human-body',
    fact: { en: 'You produce about 1 to 2 liters of saliva every day.', ta: 'நீங்கள் ஒரு நாளைக்கு சுமார் 1 முதல் 2 லிட்டர் எச்சிலை உற்பத்தி செய்கிறீர்கள்.' },
    icon: '💧', tags: ['saliva', 'production', 'daily'],
  },
  {
    id: 'body-015', category: 'human-body',
    fact: { en: 'The human brain uses about 20% of the body\'s total energy.', ta: 'மனித மூளை உடலின் மொத்த ஆற்றலில் சுமார் 20% ஐ பயன்படுத்துகிறது.' },
    icon: '🧠', tags: ['brain', 'energy', 'consumption'],
  },
  {
    id: 'body-016', category: 'human-body',
    fact: { en: 'An average person walks the equivalent of 5 times around the Earth in a lifetime.', ta: 'ஒரு சராசரி நபர் வாழ்நாளில் பூமியை 5 முறை சுற்றும் தூரம் நடப்பார்.' },
    icon: '🚶', tags: ['walking', 'distance', 'lifetime'],
  },
  {
    id: 'body-017', category: 'human-body',
    fact: { en: 'Your body contains about 25 trillion red blood cells.', ta: 'உங்கள் உடலில் சுமார் 25 டிரில்லியன் சிவப்பு இரத்த செல்கள் உள்ளன.' },
    icon: '🔴', tags: ['red-blood', 'cells', 'count'],
  },
  {
    id: 'body-018', category: 'human-body',
    fact: { en: 'The smallest bone in the human body is the stapes in the middle ear — only 3 mm long.', ta: 'மனித உடலில் மிகச்சிறிய எலும்பு நடுக்காதில் உள்ள ஸ்டேப்ஸ் — வெறும் 3 மி.மீ நீளம்.' },
    icon: '👂', tags: ['stapes', 'smallest', 'ear'],
  },
  {
    id: 'body-019', category: 'human-body',
    fact: { en: 'Humans are the only animals that blush.', ta: 'மனிதர்கள் மட்டுமே சிவக்கும் விலங்குகள்.' },
    icon: '😊', tags: ['blush', 'unique', 'humans'],
  },
  {
    id: 'body-020', category: 'human-body',
    fact: { en: 'The human eye can process about 36,000 bits of information per hour.', ta: 'மனித கண் ஒரு மணிநேரத்திற்கு சுமார் 36,000 பிட் தகவலை செயலாக்க முடியும்.' },
    icon: '👁️', tags: ['eye', 'processing', 'information'],
  },
  {
    id: 'body-021', category: 'human-body',
    fact: { en: 'Your brain is about 75% water.', ta: 'உங்கள் மூளை சுமார் 75% நீரால் ஆனது.' },
    icon: '🧠', tags: ['brain', 'water', 'composition'],
  },
  {
    id: 'body-022', category: 'human-body',
    fact: { en: 'The human liver performs over 500 different functions.', ta: 'மனித கல்லீரல் 500 க்கும் மேற்பட்ட வெவ்வேறு செயல்பாடுகளைச் செய்கிறது.' },
    icon: '🫀', tags: ['liver', 'functions', 'vital'],
  },

  // ── ENVIRONMENT (20 facts) ────────────────────────────────────────────
  {
    id: 'env-001', category: 'environment',
    fact: { en: 'Recycling one aluminum can saves enough energy to run a TV for 3 hours.', ta: 'ஒரு அலுமினிய பாட்டிலை மறுசுழற்சி செய்தால் 3 மணிநேரம் தொலைக்காட்சி இயக்க போதுமான ஆற்றலை சேமிக்கலாம்.' },
    icon: '♻️', tags: ['recycling', 'aluminum', 'energy'],
  },
  {
    id: 'env-002', category: 'environment',
    fact: { en: 'A single tree can absorb about 22 kg of CO₂ per year.', ta: 'ஒரு மரம் ஒரு ஆண்டில் சுமார் 22 கி.கி CO₂ ஐ உறிஞ்ச முடியும்.' },
    icon: '🌳', tags: ['tree', 'co2', 'absorption'],
  },
  {
    id: 'env-003', category: 'environment',
    fact: { en: 'About 71% of the Earth\'s surface is covered by water.', ta: 'பூமியின் மேற்பரப்பில் சுமார் 71% நீரால் மூடப்பட்டுள்ளது.' },
    icon: '🌊', tags: ['earth', 'water', 'surface'],
  },
  {
    id: 'env-004', category: 'environment',
    fact: { en: 'Plastic bags can take up to 1,000 years to decompose in landfills.', ta: 'பிளாஸ்டிக் பைகள் குப்பைகளில் சிதைய சுமார் 1,000 ஆண்டுகள் ஆகலாம்.' },
    icon: '🛍️', tags: ['plastic', 'decomposition', 'landfill'],
  },
  {
    id: 'env-005', category: 'environment',
    fact: { en: 'Bees pollinate about one-third of the food we eat.', ta: 'தேனீக்கள் நாம் சாப்பிடும் உணவில் சுமார் மூன்றில் ஒரு பங்கை மகரந்தச் சேர்க்கை செய்கின்றன.' },
    icon: '🐝', tags: ['bees', 'pollination', 'food'],
  },
  {
    id: 'env-006', category: 'environment',
    fact: { en: 'Coral reefs support about 25% of all marine species despite covering less than 1% of the ocean.', ta: 'பவளப் பாறைகள் கடலில் 1% க்கும் குறைவான பரப்பை மூடியிருந்தாலும் அனைத்து கடல் இனங்களில் 25% ஐ ஆதரிக்கின்றன.' },
    icon: '🪸', tags: ['coral', 'reefs', 'marine'],
  },
  {
    id: 'env-007', category: 'environment',
    fact: { en: 'The Amazon Rainforest produces about 20% of the world\'s oxygen.', ta: 'அமேசான் மழைக்காடு உலகின் ஆக்சிஜனில் சுமார் 20% ஐ உற்பத்தி செய்கிறது.' },
    icon: '🌴', tags: ['amazon', 'oxygen', 'rainforest'],
  },
  {
    id: 'env-008', category: 'environment',
    fact: { en: 'Wind turbines can power thousands of homes without producing any pollution.', ta: 'காற்றாலைகள் எந்த மாசுபாடும் இல்லாமல் ஆயிரக்கணக்கான வீடுகளுக்கு மின்சாரம் வழங்க முடியும்.' },
    icon: '🌬️', tags: ['wind', 'turbine', 'clean-energy'],
  },
  {
    id: 'env-009', category: 'environment',
    fact: { en: 'Deforestation accounts for about 10% of global greenhouse gas emissions.', ta: 'காடழிப்பு உலகளாவிய பசுமை இல்ல வாயு வெளியேற்றத்தில் சுமார் 10% ஐ கொண்டுள்ளது.' },
    icon: '🪓', tags: ['deforestation', 'emissions', 'climate'],
  },
  {
    id: 'env-010', category: 'environment',
    fact: { en: 'Solar panels can convert sunlight directly into electricity.', ta: 'சோலார் பேனல்கள் சூரிய ஒளியை நேரடியாக மின்சாரமாக மாற்ற முடியும்.' },
    icon: '☀️', tags: ['solar', 'panels', 'electricity'],
  },
  {
    id: 'env-011', category: 'environment',
    fact: { en: 'The ocean absorbs about 30% of the CO₂ produced by humans.', ta: 'கடல் மனிதர்களால் உற்பத்தி செய்யப்படும் CO₂ இன் சுமார் 30% ஐ உறிஞ்சுகிறது.' },
    icon: '🌊', tags: ['ocean', 'co2', 'absorption'],
  },
  {
    id: 'env-012', category: 'environment',
    fact: { en: 'Composting food waste can reduce methane emissions from landfills.', ta: 'உணவு கழிவுகளை கம்போஸ்ட் செய்வது குப்பைகளிலிருந்து மீத்தேன் வெளியேற்றத்தை குறைக்க முடியும்.' },
    icon: '🌱', tags: ['composting', 'methane', 'waste'],
  },
  {
    id: 'env-013', category: 'environment',
    fact: { en: 'The Great Barrier Reef is the largest living structure on Earth, visible from space.', ta: 'மாபெரும் பவளப் பாறை பூமியில் மிகப்பெரிய உயிர்ப்பொருள், விண்வெளியில் இருந்து பார்க்க முடியும்.' },
    icon: '🐠', tags: ['great-barrier-reef', 'coral', 'largest'],
  },
  {
    id: 'env-014', category: 'environment',
    fact: { en: 'About 8 million tons of plastic enter the oceans every year.', ta: 'ஒவ்வொரு ஆண்டும் சுமார் 8 மில்லியன் டன் பிளாஸ்டிக் கடல்களில் நுழைகிறது.' },
    icon: '🐢', tags: ['plastic', 'ocean', 'pollution'],
  },
  {
    id: 'env-015', category: 'environment',
    fact: { en: 'Planting one tree can help absorb about 48 pounds of CO₂ per year.', ta: 'ஒரு மரம் நடுவது ஒரு ஆண்டில் சுமார் 48 பவுண்ட் CO₂ ஐ உறிஞ்ச உதவும்.' },
    icon: '🌲', tags: ['tree', 'co2', 'planting'],
  },
  {
    id: 'env-016', category: 'environment',
    fact: { en: 'Wetlands act as natural water filters, purifying water before it reaches rivers and lakes.', ta: 'ஈரநிலங்கள் இயற்கை நீர் வடிகட்டிகளாக செயல்படுகின்றன, நதிகள் மற்றும் ஏரிகளை சென்றடைவதற்கு முன் நீரை சுத்திகரிக்கின்றன.' },
    icon: '🏞️', tags: ['wetlands', 'filter', 'water'],
  },
  {
    id: 'env-017', category: 'environment',
    fact: { en: 'Seaweed produces more oxygen per area than rainforests.', ta: 'கடல் பாசி மழைக்காடுகளை விட பரப்புக்கு அதிக ஆக்சிஜனை உற்பத்தி செய்கிறது.' },
    icon: '🌿', tags: ['seaweed', 'oxygen', 'marine'],
  },
  {
    id: 'env-018', category: 'environment',
    fact: { en: 'A single glass of orange juice requires about 2.5 gallons of water to produce.', ta: 'ஒரு கிளாஸ் ஆரஞ்சு ஜூஸ் தயாரிக்க சுமார் 2.5 கேலன் நீர் தேவை.' },
    icon: '🍊', tags: ['water-footprint', 'juice', 'production'],
  },
  {
    id: 'env-019', category: 'environment',
    fact: { en: 'Mangrove forests protect coastlines from storms and tsunamis.', ta: 'மாங்குரோவ் காடுகள் கடற்கரைகளை புயல்கள் மற்றும் சுனாமிகளிலிருந்து பாதுகாக்கின்றன.' },
    icon: '🌊', tags: ['mangrove', 'coastline', 'protection'],
  },
  {
    id: 'env-020', category: 'environment',
    fact: { en: 'About 70% of global freshwater is used for agriculture.', ta: 'உலகளாவிய நன்னீரில் சுமார் 70% வேளாண்மைக்கு பயன்படுத்தப்படுகிறது.' },
    icon: '🌾', tags: ['freshwater', 'agriculture', 'usage'],
  },

  // ── SCIENCE HISTORY (21 facts) ────────────────────────────────────────
  {
    id: 'hist-001', category: 'science-history',
    fact: { en: 'Newton discovered gravity when an apple fell on his head — according to legend.', ta: 'நியூட்டன் ஒரு ஆப்பிள் அவர் தலையில் விழுந்தபோது ஈர்ப்பு விசையை கண்டுபிடித்தார் — கதைப்படி.' },
    icon: '🍎', tags: ['newton', 'gravity', 'apple'],
  },
  {
    id: 'hist-002', category: 'science-history',
    fact: { en: 'Alexander Fleming discovered penicillin by accident in 1928.', ta: 'அலெக்சாண்டர் ஃபிளெமிங் 1928 இல் தற்செயலாக பென்சிலினை கண்டுபிடித்தார்.' },
    icon: '💊', tags: ['fleming', 'penicillin', 'accident'],
  },
  {
    id: 'hist-003', category: 'science-history',
    fact: { en: 'Marie Curie was the first woman to win a Nobel Prize — and the only person to win in two different sciences.', ta: 'மேரி கியூரி நோபல் பரிசை வென்ற முதல் பெண் — மற்றும் இரண்டு வெவ்வேறு அறிவியல் துறைகளில் வென்ற ஒரே நபர்.' },
    icon: '🏆', tags: ['curie', 'nobel', 'physics-chemistry'],
  },
  {
    id: 'hist-004', category: 'science-history',
    fact: { en: 'Thomas Edison invented the practical electric light bulb in 1879.', ta: 'தாமஸ் எடிசன் 1879 இல் நடைமுறை மின்விளக்கை கண்டுபிடித்தார்.' },
    icon: '💡', tags: ['edison', 'lightbulb', 'invention'],
  },
  {
    id: 'hist-005', category: 'science-history',
    fact: { en: 'The first antibiotic, penicillin, saved millions of lives since its discovery.', ta: 'முதல் நுண்ணுயிர் எதிர்ப்பு மருந்து, பென்சிலின், அதன் கண்டுபிடிப்பிலிருந்து மில்லியன் கணக்கான உயிர்களைக் காப்பாற்றியுள்ளது.' },
    icon: '💉', tags: ['penicillin', 'antibiotic', 'lives'],
  },
  {
    id: 'hist-006', category: 'science-history',
    fact: { en: 'Albert Einstein developed the theory of relativity in 1905.', ta: 'ஆல்பர்ட் ஐன்ஸ்டைன் 1905 இல் சார்பு கோட்பாட்டை உருவாக்கினார்.' },
    icon: '🧠', tags: ['einstein', 'relativity', 'physics'],
  },
  {
    id: 'hist-007', category: 'science-history',
    fact: { en: 'The first vaccine was developed by Edward Jenner in 1796 to protect against smallpox.', ta: 'முதல் தடுப்பூசி எட்வர்ட் ஜென்னரால் 1796 இல் புரூசல் நோயிலிருந்து பாதுகாக்க உருவாக்கப்பட்டது.' },
    icon: '💉', tags: ['vaccine', 'jenner', 'smallpox'],
  },
  {
    id: 'hist-008', category: 'science-history',
    fact: { en: 'Charles Darwin published "On the Origin of Species" in 1859, explaining natural selection.', ta: 'சார்லஸ் டார்வின் 1859 இல் "இனங்களின் தோற்றம்" என்ற நூலை வெளியிட்டார், இயற்கை தேர்வை விளக்கினார்.' },
    icon: '📖', tags: ['darwin', 'evolution', 'natural-selection'],
  },
  {
    id: 'hist-009', category: 'science-history',
    fact: { en: 'The first successful airplane flight by the Wright Brothers was in 1903.', ta: 'ரைட் சகோதரர்களின் முதல் வெற்றிகரமான விமான பறப்பு 1903 இல் நிகழ்ந்தது.' },
    icon: '✈️', tags: ['wright-brothers', 'flight', 'aviation'],
  },
  {
    id: 'hist-010', category: 'science-history',
    fact: { en: 'Archimedes discovered the principle of buoyancy while taking a bath.', ta: 'ஆர்க்கிமிடிஸ் குளிக்கும் போது மிதப்பு கொள்கையை கண்டுபிடித்தார்.' },
    icon: '🛁', tags: ['archimedes', 'buoyancy', 'bath'],
  },
  {
    id: 'hist-011', category: 'science-history',
    fact: { en: 'Galileo was the first to use a telescope to observe the heavens in 1609.', ta: 'கலிலியோ 1609 இல் வானத்தை காண முதல் தொலைநோக்கியைப் பயன்படுத்தினார்.' },
    icon: '🔭', tags: ['galileo', 'telescope', 'astronomy'],
  },
  {
    id: 'hist-012', category: 'science-history',
    fact: { en: 'The periodic table was first organized by Dmitri Mendeleev in 1869.', ta: 'ஆவர்த்தன வரைபடம் முதன்முதலில் 1869 இல் டிமிட்ரி மெண்டலீவால் ஒழுங்குபடுத்தப்பட்டது.' },
    icon: '📊', tags: ['mendeleev', 'periodic-table', 'chemistry'],
  },
  {
    id: 'hist-013', category: 'science-history',
    fact: { en: 'Nikola Tesla invented the alternating current (AC) electrical system.', ta: 'நிகோலா டெஸ்லா மாறுதிசை மின்னோட்ட (AC) மின்முறையை கண்டுபிடித்தார்.' },
    icon: '⚡', tags: ['tesla', 'ac-power', 'electricity'],
  },
  {
    id: 'hist-014', category: 'science-history',
    fact: { en: 'Louis Pasteur proved that germs cause disease — leading to pasteurization.', ta: 'லூயி பாஸ்டர் பாக்டீரியா நோயை ஏற்படுத்துகிறது என்று நிரூபித்தார் — பாஸ்சுரைசேஷனுக்கு வழிவகுத்தார்.' },
    icon: '🔬', tags: ['pasteur', 'germs', 'pasteurization'],
  },
  {
    id: 'hist-015', category: 'science-history',
    fact: { en: 'Isaac Newton formulated the three laws of motion that describe how objects move.', ta: 'ஐசக் நியூட்டன் பொருட்கள் எவ்வாறு நகர்கின்றன என்பதை விவரிக்கும் மூன்று இயக்க விதிகளை வகுத்தார்.' },
    icon: '📐', tags: ['newton', 'motion', 'laws'],
  },
  {
    id: 'hist-016', category: 'science-history',
    fact: { en: 'The first computer bug was an actual bug — a moth found stuck in a relay of the Harvard Mark II.', ta: 'முதல் கணினி பிழை ஒரு உண்மையான பூச்சி — ஹார்வர்ட் மார்க் II இன் ரிலேவில் சிக்கிய ஒரு பூச்சி.' },
    icon: '🐛', tags: ['computer-bug', 'moth', 'harvard'],
  },
  {
    id: 'hist-017', category: 'science-history',
    fact: { en: 'The discovery of X-rays by Wilhelm Röntgen in 1895 revolutionized medicine.', ta: 'வில்ஹெல்ம் ரோண்ட்ஜெனால் 1895 இல் கண்டுபிடிக்கப்பட்ட எக்ஸ்-கதிர்கள் மருத்துவத்தில் புரட்சியை ஏற்படுத்தின.' },
    icon: '🦴', tags: ['x-rays', 'rontgen', 'medicine'],
  },
  {
    id: 'hist-018', category: 'science-history',
    fact: { en: 'Tim Berners-Lee invented the World Wide Web in 1989.', ta: 'டிம் பெர்னர்ஸ்-லீ 1989 இல் உலகளாவிய வலையை கண்டுபிடித்தார்.' },
    icon: '🌐', tags: ['www', 'internet', 'berners-lee'],
  },
  {
    id: 'hist-019', category: 'science-history',
    fact: { en: 'Gregor Mendel, known as the father of genetics, studied pea plants in the 1860s.', ta: 'மரபியலின் தந்தை என அறியப்படும் கிரகோர் மெண்டல் 1860 களில் பட்டாணி தாவரங்களை ஆய்வு செய்தார்.' },
    icon: '🌱', tags: ['mendel', 'genetics', 'peas'],
  },
  {
    id: 'hist-020', category: 'science-history',
    fact: { en: 'The first artificial satellite, Sputnik 1, was launched by the Soviet Union in 1957.', ta: 'முதல் செயற்கை செயற்கைக்கோள், ஸ்புட்னிக் 1, 1957 இல் சோவியத் யூனியனால் ஏவப்பட்டது.' },
    icon: '🛰️', tags: ['sputnik', 'satellite', 'space-race'],
  },
  {
    id: 'hist-021', category: 'science-history',
    fact: { en: 'Michael Faraday discovered electromagnetic induction in 1831, paving the way for electric generators.', ta: 'மைக்கேல் ஃபாரடே 1831 இல் மின்காந்த தூண்டலை கண்டுபிடித்தார், மின் ஜெனரேட்டர்களுக்கு வழி வகுத்தார்.' },
    icon: '🧲', tags: ['faraday', 'induction', 'generator'],
  },
];

// ============================================================================
// QUESTIONS DATABASE — 55 interactive questions
// ============================================================================

export const FACT_QUESTIONS: FactQuestion[] = [
  // ── TRUE / FALSE (25 questions) ──────────────────────────────────────
  {
    id: 'tf-001', type: 'true-false',
    statement: { en: 'Light from the Sun takes about 8 minutes to reach Earth.', ta: 'சூரியனிலிருந்து வரும் ஒளி பூமியை சென்றடைய சுமார் 8 நிமிடங்கள் எடுக்கும்.' },
    correctAnswer: 'true',
    explanation: { en: 'Correct! Light travels at about 300,000 km/s and the Sun is about 150 million km away.', ta: 'சரி! ஒளி வினாடிக்கு சுமார் 3,00,000 கி.மீ வேகத்தில் பயணிக்கிறது மற்றும் சூரியன் சுமார் 150 மில்லியன் கி.மீ தொலைவில் உள்ளது.' },
    category: 'space',
  },
  {
    id: 'tf-002', type: 'true-false',
    statement: { en: 'Sound travels faster than light.', ta: 'ஒலி ஒளியை விட வேகமாக பயணிக்கிறது.' },
    correctAnswer: 'false',
    explanation: { en: 'False! Light travels much faster than sound — about 881,000 times faster in air.', ta: 'தவறு! ஒளி ஒலியை விட மிகவும் வேகமாக பயணிக்கிறது — காற்றில் சுமார் 8,81,000 மடங்கு வேகமாக.' },
    category: 'physics',
  },
  {
    id: 'tf-003', type: 'true-false',
    statement: { en: 'Water boils at 100°C at sea level.', ta: 'கடல் மட்டத்தில் நீர் 100°C இல் கொதிக்கிறது.' },
    correctAnswer: 'true',
    explanation: { en: 'Correct! At standard atmospheric pressure (sea level), water boils at 100°C.', ta: 'சரி! நிலையான வளிமண்டல அழுத்தத்தில் (கடல் மட்டம்), நீர் 100°C இல் கொதிக்கிறது.' },
    category: 'chemistry',
  },
  {
    id: 'tf-004', type: 'true-false',
    statement: { en: 'Octopuses have three hearts.', ta: 'ஆக்டோபஸ்களுக்கு மூன்று இதயங்கள் உள்ளன.' },
    correctAnswer: 'true',
    explanation: { en: 'Correct! Two pump blood to the gills and one pumps it to the rest of the body.', ta: 'சரி! இரண்டு சுவாசப்பாதைகளுக்கு இரத்தத்தை பம்ப் செய்கின்றன, ஒன்று மீதமுள்ள உடலுக்கு பம்ப் செய்கிறது.' },
    category: 'biology',
  },
  {
    id: 'tf-005', type: 'true-false',
    statement: { en: 'The human body has 206 bones.', ta: 'மனித உடலில் 206 எலும்புகள் உள்ளன.' },
    correctAnswer: 'true',
    explanation: { en: 'Correct! An adult human skeleton has 206 bones.', ta: 'சரி! ஒரு வயது வந்த மனித எலும்புக்கூட்டில் 206 எலும்புகள் உள்ளன.' },
    category: 'human-body',
  },
  {
    id: 'tf-006', type: 'true-false',
    statement: { en: 'The Great Wall of China is visible from space with the naked eye.', ta: 'சீனாவின் மாபெரும் சுவர் விண்வெளியிலிருந்து கண்ணுக்கு தெரியும்.' },
    correctAnswer: 'false',
    explanation: { en: 'False! The Great Wall is too narrow to be seen from space without aid.', ta: 'தவறு! மாபெரும் சுவர் உதவி இல்லாமல் விண்வெளியில் இருந்து பார்க்க முடியாத அளவு குறுகியது.' },
    category: 'space',
  },
  {
    id: 'tf-007', type: 'true-false',
    statement: { en: 'Diamonds are made of carbon atoms.', ta: 'வைரங்கள் கார்பன் அணுக்களால் ஆனவை.' },
    correctAnswer: 'true',
    explanation: { en: 'Correct! Diamonds are pure carbon arranged in a crystal structure.', ta: 'சரி! வைரங்கள் ஒரு கிருஸ்டல் அமைப்பில் அமைக்கப்பட்ட தூய கார்பன்.' },
    category: 'chemistry',
  },
  {
    id: 'tf-008', type: 'true-false',
    statement: { en: 'Sound cannot travel through water.', ta: 'ஒலி நீரில் பயணிக்க முடியாது.' },
    correctAnswer: 'false',
    explanation: { en: 'False! Sound actually travels about 4 times faster in water than in air.', ta: 'தவறு! ஒலி உண்மையில் நீரில் காற்றை விட 4 மடங்கு வேகமாக பயணிக்கிறது.' },
    category: 'physics',
  },
  {
    id: 'tf-009', type: 'true-false',
    statement: { en: 'Bees are essential for pollinating many of the foods we eat.', ta: 'தேனீக்கள் நாம் சாப்பிடும் பல உணவுகளுக்கு மகரந்தச் சேர்க்கை செய்வதில் அவசியம்.' },
    correctAnswer: 'true',
    explanation: { en: 'Correct! Bees pollinate about one-third of our food supply.', ta: 'சரி! தேனீக்கள் நமது உணவு வழங்கலில் சுமார் மூன்றில் ஒரு பங்கை மகரந்தச் சேர்க்கை செய்கின்றன.' },
    category: 'environment',
  },
  {
    id: 'tf-010', type: 'true-false',
    statement: { en: 'Marie Curie won Nobel Prizes in both Physics and Chemistry.', ta: 'மேரி கியூரி இயற்பியல் மற்றும் வேதியியல் இரண்டிலும் நோபல் பரிசுகளை வென்றார்.' },
    correctAnswer: 'true',
    explanation: { en: 'Correct! She won the Physics Nobel in 1903 and Chemistry Nobel in 1911.', ta: 'சரி! அவர் 1903 இல் இயற்பியல் நோபலையும் 1911 இல் வேதியியல் நோபலையும் வென்றார்.' },
    category: 'science-history',
  },
  {
    id: 'tf-011', type: 'true-false',
    statement: { en: 'The heart pumps about 2,000 gallons of blood every day.', ta: 'இதயம் ஒரு நாளைக்கு சுமார் 2,000 கேலன் இரத்தத்தை பம்ப் செய்கிறது.' },
    correctAnswer: 'true',
    explanation: { en: 'Correct! The heart pumps about 2,000 gallons of blood through the body daily.', ta: 'சரி! இதயம் ஒரு நாளைக்கு உடல் முழுவதும் சுமார் 2,000 கேலன் இரத்தத்தை பம்ப் செய்கிறது.' },
    category: 'human-body',
  },
  {
    id: 'tf-012', type: 'true-false',
    statement: { en: 'Bamboo is the fastest-growing plant on Earth.', ta: 'முங்கை பூமியில் மிக விரைவாக வளரும் தாவரம்.' },
    correctAnswer: 'true',
    explanation: { en: 'Correct! Some bamboo species can grow up to 91 cm per day.', ta: 'சரி! சில முங்கை இனங்கள் ஒரு நாளைக்கு 91 செமீ வரை வளர முடியும்.' },
    category: 'biology',
  },
  {
    id: 'tf-013', type: 'true-false',
    statement: { en: 'The Sun is a star.', ta: 'சூரியன் ஒரு நட்சத்திரம்.' },
    correctAnswer: 'true',
    explanation: { en: 'Correct! The Sun is a medium-sized yellow dwarf star.', ta: 'சரி! சூரியன் ஒரு நடுத்தர அளவிலான மஞ்சள் குள்ள நட்சத்திரம்.' },
    category: 'space',
  },
  {
    id: 'tf-014', type: 'true-false',
    statement: { en: 'All metals are magnetic.', ta: 'அனைத்து உலோகங்களும் காந்தமானவை.' },
    correctAnswer: 'false',
    explanation: { en: 'False! Only ferromagnetic metals like iron, nickel, and cobalt are magnetic.', ta: 'தவறு! இரும்பு, நிக்கல் மற்றும் கோபால்ட் போன்ற காந்த உலோகங்கள் மட்டுமே காந்தமானவை.' },
    category: 'physics',
  },
  {
    id: 'tf-015', type: 'true-false',
    statement: { en: 'The Moon produces its own light.', ta: 'சந்திரன் தனது சொந்த ஒளியை உற்பத்தி செய்கிறது.' },
    correctAnswer: 'false',
    explanation: { en: 'False! The Moon reflects sunlight — it does not produce its own light.', ta: 'தவறு! சந்திரன் சூரிய ஒளியை பிரதிபலிக்கிறது — அது தனது சொந்த ஒளியை உற்பத்தி செய்யாது.' },
    category: 'space',
  },
  {
    id: 'tf-016', type: 'true-false',
    statement: { en: 'Venus is the hottest planet in our solar system.', ta: 'வீனஸ் நமது சூரிய மண்டலத்தின் மிகவும் சூடான கிரகம்.' },
    correctAnswer: 'true',
    explanation: { en: 'Correct! Venus has a surface temperature of about 465°C due to its thick atmosphere.', ta: 'சரி! வீனஸின் அடர்த்தியான வளிமண்டலம் காரணமாக மேற்பரப்பு வெப்பநிலை சுமார் 465°C.' },
    category: 'space',
  },
  {
    id: 'tf-017', type: 'true-false',
    statement: { en: 'The human brain uses about 20% of the body\'s energy.', ta: 'மனித மூளை உடலின் ஆற்றலில் சுமார் 20% ஐ பயன்படுத்துகிறது.' },
    correctAnswer: 'true',
    explanation: { en: 'Correct! Despite being only 2% of body weight, the brain uses about 20% of total energy.', ta: 'சரி! உடல் எடையில் 2% மட்டுமே இருந்தாலும், மூளை மொத்த ஆற்றலில் சுமார் 20% ஐ பயன்படுத்துகிறது.' },
    category: 'human-body',
  },
  {
    id: 'tf-018', type: 'true-false',
    statement: { en: 'Helium was first discovered on the Sun.', ta: 'ஹீலியம் முதலில் சூரியனில் கண்டுபிடிக்கப்பட்டது.' },
    correctAnswer: 'true',
    explanation: { en: 'Correct! Helium was discovered in the Sun\'s spectrum before being found on Earth.', ta: 'சரி! ஹீலியம் பூமியில் கண்டுபிடிக்கப்படுவதற்கு முன் சூரியனின் நிறமாலையில் கண்டுபிடிக்கப்பட்டது.' },
    category: 'chemistry',
  },
  {
    id: 'tf-019', type: 'true-false',
    statement: { en: 'Tardigrades can survive in outer space.', ta: 'டார்டிகிரேட்கள் விண்வெளியில் உயிர் வாழ முடியும்.' },
    correctAnswer: 'true',
    explanation: { en: 'Correct! Tardigrades are nearly indestructible and can survive extreme conditions.', ta: 'சரி! டார்டிகிரேட்கள் கிட்டத்தட்ட அழிக்க முடியாதவை மற்றும் தீவிர நிலைகளில் உயிர் வாழ முடியும்.' },
    category: 'biology',
  },
  {
    id: 'tf-020', type: 'true-false',
    statement: { en: 'Recycling one aluminum can saves enough energy to run a TV for 3 hours.', ta: 'ஒரு அலுமினிய பாட்டிலை மறுசுழற்சி செய்தால் 3 மணிநேரம் தொலைக்காட்சி இயக்க போதுமான ஆற்றலை சேமிக்கலாம்.' },
    correctAnswer: 'true',
    explanation: { en: 'Correct! Aluminum recycling is highly energy efficient.', ta: 'சரி! அலுமினிய மறுசுழற்சி மிகவும் ஆற்றல் திறமையானது.' },
    category: 'environment',
  },
  {
    id: 'tf-021', type: 'true-false',
    statement: { en: 'Iron rusts because it reacts with oxygen and water.', ta: 'இரும்பு ஆக்சிஜன் மற்றும் நீருடன் வினைபுரிவதால் துருப்பிடிக்கிறது.' },
    correctAnswer: 'true',
    explanation: { en: 'Correct! Rust is iron oxide formed by the reaction of iron with oxygen and moisture.', ta: 'சரி! துரு என்பது இரும்பு ஆக்சிஜன் மற்றும் ஈரப்பதத்துடன் வினைபுரிவதால் உருவாகும் இரும்பு ஆக்சைடு.' },
    category: 'chemistry',
  },
  {
    id: 'tf-022', type: 'true-false',
    statement: { en: 'A day on Mars is almost the same length as a day on Earth.', ta: 'செவ்வாயில் ஒரு நாள் பூமியில் ஒரு நாள் போலவே கிட்டத்தட்ட ஒத்திருக்கும்.' },
    correctAnswer: 'true',
    explanation: { en: 'Correct! A Martian day (sol) is about 24 hours and 37 minutes.', ta: 'சரி! ஒரு செவ்வாய் நாள் (சால்) சுமார் 24 மணிநேரம் 37 நிமிடங்கள்.' },
    category: 'space',
  },
  {
    id: 'tf-023', type: 'true-false',
    statement: { en: 'Your nose can distinguish over 1 trillion different scents.', ta: 'உங்கள் மூக்கு 1 டிரில்லியனுக்கும் மேற்பட்ட வெவ்வேறு வாசனைகளை வேறுபடுத்த முடியும்.' },
    correctAnswer: 'true',
    explanation: { en: 'Correct! Recent research shows humans can detect over 1 trillion scents.', ta: 'சரி! சமீபத்திய ஆய்வுகள் மனிதர்கள் 1 டிரில்லியனுக்கும் மேற்பட்ட வாசனைகளை கண்டறிய முடியும் என்று காட்டுகின்றன.' },
    category: 'human-body',
  },
  {
    id: 'tf-024', type: 'true-false',
    statement: { en: 'Coral reefs support about 25% of all marine species.', ta: 'பவளப் பாறைகள் அனைத்து கடல் இனங்களில் 25% ஐ ஆதரிக்கின்றன.' },
    correctAnswer: 'true',
    explanation: { en: 'Correct! Despite covering less than 1% of the ocean, coral reefs support 25% of marine species.', ta: 'சரி! கடலில் 1% க்கும் குறைவான பரப்பை மூடியிருந்தாலும், பவளப் பாறைகள் கடல் இனங்களில் 25% ஐ ஆதரிக்கின்றன.' },
    category: 'environment',
  },
  {
    id: 'tf-025', type: 'true-false',
    statement: { en: 'The first vaccine was developed to protect against smallpox.', ta: 'முதல் தடுப்பூசி புரூசல் நோயிலிருந்து பாதுகாக்க உருவாக்கப்பட்டது.' },
    correctAnswer: 'true',
    explanation: { en: 'Correct! Edward Jenner developed the smallpox vaccine in 1796.', ta: 'சரி! எட்வர்ட் ஜென்னர் 1796 இல் புரூசல் தடுப்பூசியை உருவாக்கினார்.' },
    category: 'science-history',
  },

  // ── MULTIPLE CHOICE (30 questions) ───────────────────────────────────
  {
    id: 'mc-001', type: 'multiple-choice',
    statement: { en: 'How many hearts does an octopus have?', ta: 'ஒரு ஆக்டோபஸுக்கு எத்தனை இதயங்கள் உள்ளன?' },
    options: [{ en: '1', ta: '1' }, { en: '2', ta: '2' }, { en: '3', ta: '3' }, { en: '4', ta: '4' }],
    correctAnswer: '3',
    explanation: { en: 'Octopuses have three hearts — two pump blood to the gills, one to the body.', ta: 'ஆக்டோபஸ்களுக்கு மூன்று இதயங்கள் உள்ளன — இரண்டு சுவாசப்பாதைகளுக்கு, ஒன்று உடலுக்கு.' },
    category: 'biology',
  },
  {
    id: 'mc-002', type: 'multiple-choice',
    statement: { en: 'Water boils at what temperature at sea level?', ta: 'கடல் மட்டத்தில் நீர் எந்த வெப்பநிலையில் கொதிக்கிறது?' },
    options: [{ en: '50°C', ta: '50°C' }, { en: '75°C', ta: '75°C' }, { en: '100°C', ta: '100°C' }, { en: '120°C', ta: '120°C' }],
    correctAnswer: '100°C',
    explanation: { en: 'At standard atmospheric pressure, water boils at exactly 100°C.', ta: 'நிலையான வளிமண்டல அழுத்தத்தில், நீர் சரியாக 100°C இல் கொதிக்கிறது.' },
    category: 'chemistry',
  },
  {
    id: 'mc-003', type: 'multiple-choice',
    statement: { en: 'What is the speed of light approximately?', ta: 'ஒளியின் வேகம் தோராயமாக எவ்வளவு?' },
    options: [{ en: '300 km/s', ta: '300 கி.மீ/வி' }, { en: '30,000 km/s', ta: '30,000 கி.மீ/வி' }, { en: '300,000 km/s', ta: '3,00,000 கி.மீ/வி' }, { en: '3,000,000 km/s', ta: '30,00,000 கி.மீ/வி' }],
    correctAnswer: '300,000 km/s',
    explanation: { en: 'Light travels at approximately 300,000 km/s in a vacuum.', ta: 'ஒளி வெற்றிடத்தில் தோராயமாக 3,00,000 கி.மீ/வி வேகத்தில் பயணிக்கிறது.' },
    category: 'physics',
  },
  {
    id: 'mc-004', type: 'multiple-choice',
    statement: { en: 'Which planet is known as the Red Planet?', ta: 'எந்த கிரகம் சிவப்பு கிரகம் என்று அழைக்கப்படுகிறது?' },
    options: [{ en: 'Venus', ta: 'வீனஸ்' }, { en: 'Mars', ta: 'செவ்வாய்' }, { en: 'Jupiter', ta: 'வியாழன்' }, { en: 'Saturn', ta: 'சனி' }],
    correctAnswer: 'Mars',
    explanation: { en: 'Mars is called the Red Planet because iron oxide on its surface gives it a reddish appearance.', ta: 'செவ்வாய் சிவப்பு கிரகம் என்று அழைக்கப்படுகிறது, ஏனெனில் அதன் மேற்பரப்பில் உள்ள இரும்பு ஆக்சைடு சிவப்பு நிறத்தை அளிக்கிறது.' },
    category: 'space',
  },
  {
    id: 'mc-005', type: 'multiple-choice',
    statement: { en: 'What is the chemical formula for table salt?', ta: 'சமையல் உப்பின் வேதியியல் வாய்பாடு என்ன?' },
    options: [{ en: 'NaCl', ta: 'NaCl' }, { en: 'KCl', ta: 'KCl' }, { en: 'CaCl₂', ta: 'CaCl₂' }, { en: 'MgCl₂', ta: 'MgCl₂' }],
    correctAnswer: 'NaCl',
    explanation: { en: 'Table salt is sodium chloride (NaCl) — sodium and chlorine.', ta: 'சமையல் உப்பு சோடியம் குளோரைடு (NaCl) — சோடியம் மற்றும் குளோரின்.' },
    category: 'chemistry',
  },
  {
    id: 'mc-006', type: 'multiple-choice',
    statement: { en: 'How many bones does an adult human body have?', ta: 'ஒரு வயது வந்த மனித உடலில் எத்தனை எலும்புகள் உள்ளன?' },
    options: [{ en: '156', ta: '156' }, { en: '206', ta: '206' }, { en: '256', ta: '256' }, { en: '306', ta: '306' }],
    correctAnswer: '206',
    explanation: { en: 'An adult human skeleton has 206 bones.', ta: 'ஒரு வயது வந்த மனித எலும்புக்கூட்டில் 206 எலும்புகள் உள்ளன.' },
    category: 'human-body',
  },
  {
    id: 'mc-007', type: 'multiple-choice',
    statement: { en: 'Which gas makes up about 78% of Earth\'s atmosphere?', ta: 'பூமியின் வளிமண்டலத்தில் சுமார் 78% ஆக இருக்கும் வாயு எது?' },
    options: [{ en: 'Oxygen', ta: 'ஆக்சிஜன்' }, { en: 'Carbon Dioxide', ta: 'கார்பன் டை ஆக்சைடு' }, { en: 'Nitrogen', ta: 'நைட்ரஜன்' }, { en: 'Helium', ta: 'ஹீலியம்' }],
    correctAnswer: 'Nitrogen',
    explanation: { en: 'Nitrogen makes up about 78% of Earth\'s atmosphere.', ta: 'நைட்ரஜன் பூமியின் வளிமண்டலத்தில் சுமார் 78% ஆக உள்ளது.' },
    category: 'environment',
  },
  {
    id: 'mc-008', type: 'multiple-choice',
    statement: { en: 'Who developed the theory of relativity?', ta: 'சார்பு கோட்பாட்டை யார் உருவாக்கினார்?' },
    options: [{ en: 'Isaac Newton', ta: 'ஐசக் நியூட்டன்' }, { en: 'Albert Einstein', ta: 'ஆல்பர்ட் ஐன்ஸ்டைன்' }, { en: 'Galileo Galilei', ta: 'கலிலியோ கலிலேய்' }, { en: 'Nikola Tesla', ta: 'நிகோலா டெஸ்லா' }],
    correctAnswer: 'Albert Einstein',
    explanation: { en: 'Albert Einstein developed the theory of relativity, published in 1905 and 1915.', ta: 'ஆல்பர்ட் ஐன்ஸ்டைன் சார்பு கோட்பாட்டை உருவாக்கினார், 1905 மற்றும் 1915 இல் வெளியிடப்பட்டது.' },
    category: 'science-history',
  },
  {
    id: 'mc-009', type: 'multiple-choice',
    statement: { en: 'Which organ in the human body pumps blood?', ta: 'மனித உடலில் இரத்தத்தை பம்ப் செய்யும் உறுப்பு எது?' },
    options: [{ en: 'Lungs', ta: 'நுரையீரல்' }, { en: 'Heart', ta: 'இதயம்' }, { en: 'Liver', ta: 'கல்லீரல்' }, { en: 'Brain', ta: 'மூளை' }],
    correctAnswer: 'Heart',
    explanation: { en: 'The heart is the organ that pumps blood throughout the body.', ta: 'இதயம் உடல் முழுவதும் இரத்தத்தை பம்ப் செய்யும் உறுப்பு.' },
    category: 'human-body',
  },
  {
    id: 'mc-010', type: 'multiple-choice',
    statement: { en: 'What is the largest planet in our solar system?', ta: 'நமது சூரிய மண்டலத்தின் மிகப்பெரிய கிரகம் எது?' },
    options: [{ en: 'Saturn', ta: 'சனி' }, { en: 'Neptune', ta: 'நெப்டியூன்' }, { en: 'Jupiter', ta: 'வியாழன்' }, { en: 'Uranus', ta: 'யுரேனஸ்' }],
    correctAnswer: 'Jupiter',
    explanation: { en: 'Jupiter is the largest planet in our solar system.', ta: 'வியாழன் நமது சூரிய மண்டலத்தின் மிகப்பெரிய கிரகம்.' },
    category: 'space',
  },
  {
    id: 'mc-011', type: 'multiple-choice',
    statement: { en: 'What is the pH of pure water?', ta: 'தூய நீரின் pH என்ன?' },
    options: [{ en: '0', ta: '0' }, { en: '5', ta: '5' }, { en: '7', ta: '7' }, { en: '14', ta: '14' }],
    correctAnswer: '7',
    explanation: { en: 'Pure water has a pH of 7, which is neutral.', ta: 'தூய நீரின் pH 7, இது நடுநிலை.' },
    category: 'chemistry',
  },
  {
    id: 'mc-012', type: 'multiple-choice',
    statement: { en: 'Which element has the chemical symbol "O"?', ta: '"O" வேதியியல் குறியீட்டைக் கொண்ட தனிமம் எது?' },
    options: [{ en: 'Gold', ta: 'தங்கம்' }, { en: 'Oxygen', ta: 'ஆக்சிஜன்' }, { en: 'Osmium', ta: 'ஆஸ்மியம்' }, { en: 'Oganesson', ta: 'ஒகானசன்' }],
    correctAnswer: 'Oxygen',
    explanation: { en: '"O" is the chemical symbol for Oxygen.', ta: '"O" என்பது ஆக்சிஜனின் வேதியியல் குறியீடு.' },
    category: 'chemistry',
  },
  {
    id: 'mc-013', type: 'multiple-choice',
    statement: { en: 'Which planet has the most moons in our solar system?', ta: 'நமது சூரிய மண்டலத்தில் அதிகமான நிலவுகளைக் கொண்ட கிரகம் எது?' },
    options: [{ en: 'Jupiter', ta: 'வியாழன்' }, { en: 'Saturn', ta: 'சனி' }, { en: 'Neptune', ta: 'நெப்டியூன்' }, { en: 'Uranus', ta: 'யுரேனஸ்' }],
    correctAnswer: 'Saturn',
    explanation: { en: 'Saturn has the most known moons — over 140 confirmed.', ta: 'சனி அதிகமான அறியப்பட்ட நிலவுகளைக் கொண்டுள்ளது — 140 க்கும் மேல் உறுதிப்படுத்தப்பட்டவை.' },
    category: 'space',
  },
  {
    id: 'mc-014', type: 'multiple-choice',
    statement: { en: 'What is the hardest natural substance on Earth?', ta: 'பூமியில் மிகவும் கடினமான இயற்கை பொருள் எது?' },
    options: [{ en: 'Gold', ta: 'தங்கம்' }, { en: 'Iron', ta: 'இரும்பு' }, { en: 'Diamond', ta: 'வைரம்' }, { en: 'Quartz', ta: 'குவார்ட்ஸ்' }],
    correctAnswer: 'Diamond',
    explanation: { en: 'Diamond is the hardest natural substance on Earth, rating 10 on the Mohs hardness scale.', ta: 'வைரம் பூமியில் மிகவும் கடினமான இயற்கை பொருள், மோஸ் கடினத்தன்மை அளவில் 10 மதிப்பெண்.' },
    category: 'chemistry',
  },
  {
    id: 'mc-015', type: 'multiple-choice',
    statement: { en: 'How many chambers does the human heart have?', ta: 'மனித இதயத்தில் எத்தனை அறைகள் உள்ளன?' },
    options: [{ en: '2', ta: '2' }, { en: '3', ta: '3' }, { en: '4', ta: '4' }, { en: '5', ta: '5' }],
    correctAnswer: '4',
    explanation: { en: 'The human heart has 4 chambers — left and right atria, and left and right ventricles.', ta: 'மனித இதயத்தில் 4 அறைகள் உள்ளன — இடது மற்றும் வலது கர்ணங்கள், மற்றும் இடது மற்றும் வலது வென்ட்ரிக்கிள்கள்.' },
    category: 'human-body',
  },
  {
    id: 'mc-016', type: 'multiple-choice',
    statement: { en: 'What percentage of Earth\'s surface is covered by water?', ta: 'பூமியின் மேற்பரப்பில் எத்தனை சதவீதம் நீரால் மூடப்பட்டுள்ளது?' },
    options: [{ en: '51%', ta: '51%' }, { en: '61%', ta: '61%' }, { en: '71%', ta: '71%' }, { en: '81%', ta: '81%' }],
    correctAnswer: '71%',
    explanation: { en: 'About 71% of Earth\'s surface is covered by water.', ta: 'பூமியின் மேற்பரப்பில் சுமார் 71% நீரால் மூடப்பட்டுள்ளது.' },
    category: 'environment',
  },
  {
    id: 'mc-017', type: 'multiple-choice',
    statement: { en: 'What is the chemical symbol for gold?', ta: 'தங்கத்தின் வேதியியல் குறியீடு என்ன?' },
    options: [{ en: 'Go', ta: 'Go' }, { en: 'Gd', ta: 'Gd' }, { en: 'Au', ta: 'Au' }, { en: 'Ag', ta: 'Ag' }],
    correctAnswer: 'Au',
    explanation: { en: 'The chemical symbol for gold is Au, from the Latin word "aurum."', ta: 'தங்கத்தின் வேதியியல் குறியீடு Au, இது லத்தீன் சொல் "ஆரம்" இலிருந்து வந்தது.' },
    category: 'chemistry',
  },
  {
    id: 'mc-018', type: 'multiple-choice',
    statement: { en: 'Who invented the first practical light bulb?', ta: 'முதல் நடைமுறை மின்விளக்கை யார் கண்டுபிடித்தார்?' },
    options: [{ en: 'Nikola Tesla', ta: 'நிகோலா டெஸ்லா' }, { en: 'Thomas Edison', ta: 'தாமஸ் எடிசன்' }, { en: 'Benjamin Franklin', ta: 'பெஞ்சமின் ஃபிராங்கிளின்' }, { en: 'Michael Faraday', ta: 'மைக்கேல் ஃபாரடே' }],
    correctAnswer: 'Thomas Edison',
    explanation: { en: 'Thomas Edison invented the first practical incandescent light bulb in 1879.', ta: 'தாமஸ் எடிசன் 1879 இல் முதல் நடைமுறை இன்காண்டசன்ட் மின்விளக்கை கண்டுபிடித்தார்.' },
    category: 'science-history',
  },
  {
    id: 'mc-019', type: 'multiple-choice',
    statement: { en: 'What type of energy does the Sun primarily produce?', ta: 'சூரியன் முதன்மையாக எந்த வகையான ஆற்றலை உற்பத்தி செய்கிறது?' },
    options: [{ en: 'Kinetic', ta: 'இயக்க ஆற்றல்' }, { en: 'Chemical', ta: 'வேதியியல் ஆற்றல்' }, { en: 'Nuclear', ta: 'அணு ஆற்றல்' }, { en: 'Electrical', ta: 'மின் ஆற்றல்' }],
    correctAnswer: 'Nuclear',
    explanation: { en: 'The Sun produces energy through nuclear fusion — combining hydrogen atoms into helium.', ta: 'சூரியன் அணு இணைவு மூலம் ஆற்றலை உற்பத்தி செய்கிறது — ஹைட்ரஜன் அணுக்களை ஹீலியமாக இணைக்கிறது.' },
    category: 'physics',
  },
  {
    id: 'mc-020', type: 'multiple-choice',
    statement: { en: 'What is the largest organ in the human body?', ta: 'மனித உடலில் மிகப்பெரிய உறுப்பு எது?' },
    options: [{ en: 'Heart', ta: 'இதயம்' }, { en: 'Liver', ta: 'கல்லீரல்' }, { en: 'Skin', ta: 'தோல்' }, { en: 'Lungs', ta: 'நுரையீரல்' }],
    correctAnswer: 'Skin',
    explanation: { en: 'The skin is the largest organ, covering about 20 square feet in adults.', ta: 'தோல் மிகப்பெரிய உறுப்பு, வயது வந்தோரில் சுமார் 20 சதுர அடியை மூடுகிறது.' },
    category: 'human-body',
  },
  {
    id: 'mc-021', type: 'multiple-choice',
    statement: { en: 'What causes the seasons on Earth?', ta: 'பூமியில் பருவங்களுக்கு என்ன காரணம்?' },
    options: [{ en: 'Distance from the Sun', ta: 'சூரியனிலிருந்து தூரம்' }, { en: 'Earth\'s tilted axis', ta: 'பூமியின் சாய்ந்த அச்சு' }, { en: 'The Moon\'s gravity', ta: 'சந்திரனின் ஈர்ப்பு' }, { en: 'Solar flares', ta: 'சூரிய ஜ்வாலைகள்' }],
    correctAnswer: 'Earth\'s tilted axis',
    explanation: { en: 'Seasons are caused by Earth\'s tilted axis — different parts receive more direct sunlight at different times.', ta: 'பருவங்கள் பூமியின் சாய்ந்த அச்சு காரணமாக ஏற்படுகின்றன — வெவ்வேறு பகுதிகள் வெவ்வேறு நேரங்களில் நேரடி சூரிய ஒளியைப் பெறுகின்றன.' },
    category: 'space',
  },
  {
    id: 'mc-022', type: 'multiple-choice',
    statement: { en: 'What is the process by which plants make their own food?', ta: 'தாவரங்கள் தங்கள் உணவை எவ்வாறு தயாரிக்கின்றன?' },
    options: [{ en: 'Respiration', ta: 'சுவாசம்' }, { en: 'Fermentation', ta: 'புளிப்பு' }, { en: 'Photosynthesis', ta: 'ஒளிச்சேர்க்கை' }, { en: 'Digestion', ta: 'செரிமானம்' }],
    correctAnswer: 'Photosynthesis',
    explanation: { en: 'Plants use photosynthesis — converting sunlight, water, and CO₂ into glucose and oxygen.', ta: 'தாவரங்கள் ஒளிச்சேர்க்கையைப் பயன்படுத்துகின்றன — சூரிய ஒளி, நீர் மற்றும் CO₂ ஐ குளுக்கோஸ் மற்றும் ஆக்சிஜனாக மாற்றுகின்றன.' },
    category: 'biology',
  },
  {
    id: 'mc-023', type: 'multiple-choice',
    statement: { en: 'How long does it take for light from the Sun to reach Earth?', ta: 'சூரியனிலிருந்து வரும் ஒளி பூமியை சென்றடைய எவ்வளவு நேரம் ஆகும்?' },
    options: [{ en: 'About 1 minute', ta: 'சுமார் 1 நிமிடம்' }, { en: 'About 8 minutes', ta: 'சுமார் 8 நிமிடங்கள்' }, { en: 'About 1 hour', ta: 'சுமார் 1 மணிநேரம்' }, { en: 'About 1 day', ta: 'சுமார் 1 நாள்' }],
    correctAnswer: 'About 8 minutes',
    explanation: { en: 'Light takes about 8 minutes and 20 seconds to travel from the Sun to Earth.', ta: 'ஒளி சூரியனிலிருந்து பூமிக்கு சுமார் 8 நிமிடம் 20 வினாடிகள் எடுக்கிறது.' },
    category: 'space',
  },
  {
    id: 'mc-024', type: 'multiple-choice',
    statement: { en: 'Which scientist discovered penicillin?', ta: 'பென்சிலினை கண்டுபிடித்த விஞ்ஞானி யார்?' },
    options: [{ en: 'Louis Pasteur', ta: 'லூயி பாஸ்டர்' }, { en: 'Alexander Fleming', ta: 'அலெக்சாண்டர் ஃபிளெமிங்' }, { en: 'Robert Koch', ta: 'ராபர்ட் கோக்' }, { en: 'Joseph Lister', ta: 'ஜோசப் லிஸ்டர்' }],
    correctAnswer: 'Alexander Fleming',
    explanation: { en: 'Alexander Fleming discovered penicillin by accident in 1928.', ta: 'அலெக்சாண்டர் ஃபிளெமிங் 1928 இல் தற்செயலாக பென்சிலினை கண்டுபிடித்தார்.' },
    category: 'science-history',
  },
  {
    id: 'mc-025', type: 'multiple-choice',
    statement: { en: 'What force keeps us on the ground?', ta: 'நம்மை நிலத்தில் வைத்திருக்கும் விசை எது?' },
    options: [{ en: 'Magnetism', ta: 'காந்தம்' }, { en: 'Gravity', ta: 'ஈர்ப்பு விசை' }, { en: 'Friction', ta: 'உராய்வு' }, { en: 'Electricity', ta: 'மின்சாரம்' }],
    correctAnswer: 'Gravity',
    explanation: { en: 'Gravity is the force that pulls objects toward each other — it keeps us grounded on Earth.', ta: 'ஈர்ப்பு விசை என்பது பொருட்களை ஒன்றோடொன்று இழுக்கும் விசை — இது நம்மை பூமியில் வைத்திருக்கிறது.' },
    category: 'physics',
  },
  {
    id: 'mc-026', type: 'multiple-choice',
    statement: { en: 'What is the largest rainforest in the world?', ta: 'உலகின் மிகப்பெரிய மழைக்காடு எது?' },
    options: [{ en: 'Congo Rainforest', ta: 'காங்கோ மழைக்காடு' }, { en: 'Amazon Rainforest', ta: 'அமேசான் மழைக்காடு' }, { en: 'Daintree Rainforest', ta: 'டெயிண்ட்ரீ மழைக்காடு' }, { en: 'Tongass Rainforest', ta: 'டோங்காஸ் மழைக்காடு' }],
    correctAnswer: 'Amazon Rainforest',
    explanation: { en: 'The Amazon Rainforest is the largest rainforest in the world, covering about 5.5 million square km.', ta: 'அமேசான் மழைக்காடு உலகின் மிகப்பெரிய மழைக்காடு, சுமார் 55 லட்சம் சதுர கி.மீ பரப்பை மூடுகிறது.' },
    category: 'environment',
  },
  {
    id: 'mc-027', type: 'multiple-choice',
    statement: { en: 'Which part of the cell contains DNA?', ta: 'செல்லின் எந்த பகுதியில் DNA உள்ளது?' },
    options: [{ en: 'Cytoplasm', ta: 'சைட்டோபிளாஸம்' }, { en: 'Cell membrane', ta: 'செல் சவ்வு' }, { en: 'Nucleus', ta: 'அணுக்கரு' }, { en: 'Ribosome', ta: 'ரைபோசோம்' }],
    correctAnswer: 'Nucleus',
    explanation: { en: 'The nucleus contains the cell\'s DNA — it is like the control center of the cell.', ta: 'அணுக்கரு செல்லின் DNA ஐ கொண்டுள்ளது — இது செல்லின் கட்டுப்பாட்டு மையம் போன்றது.' },
    category: 'biology',
  },
  {
    id: 'mc-028', type: 'multiple-choice',
    statement: { en: 'What year did the first moon landing occur?', ta: 'முதல் சந்திரன் தரையிறக்கம் எந்த ஆண்டு நிகழ்ந்தது?' },
    options: [{ en: '1965', ta: '1965' }, { en: '1969', ta: '1969' }, { en: '1972', ta: '1972' }, { en: '1975', ta: '1975' }],
    correctAnswer: '1969',
    explanation: { en: 'Apollo 11 landed on the Moon on July 20, 1969.', ta: 'அப்போலோ 11 ஜூலை 20, 1969 அன்று சந்திரனில் தரையிறங்கியது.' },
    category: 'science-history',
  },
  {
    id: 'mc-029', type: 'multiple-choice',
    statement: { en: 'What is the main gas that plants absorb for photosynthesis?', ta: 'ஒளிச்சேர்க்கைக்காக தாவரங்கள் உறிஞ்சும் முதன்மை வாயு எது?' },
    options: [{ en: 'Oxygen', ta: 'ஆக்சிஜன்' }, { en: 'Nitrogen', ta: 'நைட்ரஜன்' }, { en: 'Carbon Dioxide', ta: 'கார்பன் டை ஆக்சைடு' }, { en: 'Hydrogen', ta: 'ஹைட்ரஜன்' }],
    correctAnswer: 'Carbon Dioxide',
    explanation: { en: 'Plants absorb carbon dioxide (CO₂) from the air for photosynthesis.', ta: 'தாவரங்கள் ஒளிச்சேர்க்கைக்காக காற்றிலிருந்து கார்பன் டை ஆக்சைடு (CO₂) ஐ உறிஞ்சுகின்றன.' },
    category: 'biology',
  },
  {
    id: 'mc-030', type: 'multiple-choice',
    statement: { en: 'Which vitamin does sunlight help the body produce?', ta: 'சூரிய ஒளி உடல் உற்பத்தி செய்ய உதவும் வைட்டமின் எது?' },
    options: [{ en: 'Vitamin A', ta: 'வைட்டமின் A' }, { en: 'Vitamin C', ta: 'வைட்டமின் C' }, { en: 'Vitamin D', ta: 'வைட்டமின் D' }, { en: 'Vitamin K', ta: 'வைட்டமின் K' }],
    correctAnswer: 'Vitamin D',
    explanation: { en: 'Sunlight helps the body produce Vitamin D, which is essential for bone health.', ta: 'சூரிய ஒளி உடல் வைட்டமின் D ஐ உற்பத்தி செய்ய உதவுகிறது, இது எலும்பு ஆரோக்கியத்திற்கு அவசியம்.' },
    category: 'human-body',
  },
];

// ============================================================================
// COLLECTIONS DATABASE
// ============================================================================

export const FACT_COLLECTIONS: FactCollection[] = [
  {
    id: 'col-space-explorer',
    title: { en: 'Space Explorer', ta: 'விண்வெளி ஆய்வாளர்' },
    description: { en: '10 amazing facts about our universe', ta: 'நமது பிரபஞ்சத்தைப் பற்றி 10 ஆச்சரியமான உண்மைகள்' },
    icon: '🚀',
    accentColor: '#4F46E5',
    factIds: ['space-001', 'space-002', 'space-003', 'space-004', 'space-005', 'space-006', 'space-007', 'space-008', 'space-009', 'space-010'],
  },
  {
    id: 'col-human-body',
    title: { en: 'Human Body', ta: 'மனித உடல்' },
    description: { en: '10 incredible facts about your body', ta: 'உங்கள் உடலைப் பற்றி 10 நம்பமுடியாத உண்மைகள்' },
    icon: '🫀',
    accentColor: '#DC2626',
    factIds: ['body-001', 'body-002', 'body-003', 'body-004', 'body-005', 'body-006', 'body-007', 'body-008', 'body-009', 'body-010'],
  },
  {
    id: 'col-amazing-animals',
    title: { en: 'Amazing Animals', ta: 'ஆச்சரியமான விலங்குகள்' },
    description: { en: '10 mind-blowing animal facts', ta: '10 மனதை கவரும் விலங்கு உண்மைகள்' },
    icon: '🦁',
    accentColor: '#16A34A',
    factIds: ['bio-001', 'bio-002', 'bio-003', 'bio-004', 'bio-005', 'bio-006', 'bio-007', 'bio-008', 'bio-009', 'bio-010'],
  },
  {
    id: 'col-chemistry-around',
    title: { en: 'Chemistry Around Us', ta: 'நம்மைச் சுற்றியுள்ள வேதியியல்' },
    description: { en: '10 everyday chemistry facts', ta: '10 அன்றாட வேதியியல் உண்மைகள்' },
    icon: '🧪',
    accentColor: '#7E22CE',
    factIds: ['chem-001', 'chem-002', 'chem-003', 'chem-004', 'chem-005', 'chem-006', 'chem-007', 'chem-008', 'chem-009', 'chem-010'],
  },
  {
    id: 'col-physics-life',
    title: { en: 'Physics in Life', ta: 'வாழ்க்கையில் இயற்பியல்' },
    description: { en: '10 physics facts you use every day', ta: 'நீங்கள் தினமும் பயன்படுத்தும் 10 இயற்பியல் உண்மைகள்' },
    icon: '⚡',
    accentColor: '#2563EB',
    factIds: ['physics-001', 'physics-002', 'physics-003', 'physics-004', 'physics-005', 'physics-006', 'physics-007', 'physics-008', 'physics-009', 'physics-010'],
  },
  {
    id: 'col-green-planet',
    title: { en: 'Green Planet', ta: 'பசுமை கிரகம்' },
    description: { en: '10 facts about protecting our Earth', ta: 'நமது பூமியை பாதுகாப்பது பற்றி 10 உண்மைகள்' },
    icon: '🌍',
    accentColor: '#059669',
    factIds: ['env-001', 'env-002', 'env-003', 'env-004', 'env-005', 'env-006', 'env-007', 'env-008', 'env-009', 'env-010'],
  },
  {
    id: 'col-science-history',
    title: { en: 'Science History', ta: 'அறிவியல் வரலாறு' },
    description: { en: '10 landmark moments in science', ta: 'அறிவியலில் 10 மைல்கற்கள் தருணங்கள்' },
    icon: '📜',
    accentColor: '#D97706',
    factIds: ['hist-001', 'hist-002', 'hist-003', 'hist-004', 'hist-005', 'hist-006', 'hist-007', 'hist-008', 'hist-009', 'hist-010'],
  },
];
