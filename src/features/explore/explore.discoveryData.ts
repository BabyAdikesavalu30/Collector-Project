/**
 * Explore 2.0 — Daily Discovery Entries & Discovery Topics
 * Deterministic daily discovery (date-seeded) and topic taxonomy.
 */

import { DailyDiscoveryEntry, DiscoveryTopic } from './explore.types';

// ============================================================================
// Discovery Topics
// ============================================================================

export const DISCOVERY_TOPICS: DiscoveryTopic[] = [
  { id: 'physics', title: { en: 'Physics', ta: 'இயற்பியல்' }, subtitle: { en: 'Forces, energy, matter', ta: 'விசைகள், ஆற்றல், பொருள்' }, icon: '⚡', accentColor: '#2563EB', discoveryCount: 0 },
  { id: 'chemistry', title: { en: 'Chemistry', ta: 'வேதியியல்' }, subtitle: { en: 'Elements, reactions, atoms', ta: 'உறுப்புகள், வினைகள், அணுக்கள்' }, icon: '🧪', accentColor: '#7E22CE', discoveryCount: 0 },
  { id: 'biology', title: { en: 'Biology', ta: 'உயிரியல்' }, subtitle: { en: 'Life, cells, genetics', ta: 'உயிர், செல்கள், மரபியல்' }, icon: '🧬', accentColor: '#16A34A', discoveryCount: 0 },
  { id: 'space', title: { en: 'Space', ta: 'விண்வெளி' }, subtitle: { en: 'Planets, stars, universe', ta: 'கிரகங்கள், நட்சத்திரங்கள், பிரபஞ்சம்' }, icon: '🌌', accentColor: '#4F46E5', discoveryCount: 0 },
  { id: 'earth_environment', title: { en: 'Earth & Environment', ta: 'பூமி & சுற்றுப்புறம்' }, subtitle: { en: 'Climate, geology, ecosystems', ta: 'காலநிலை, புவியியல், சூழல் மண்டலங்கள்' }, icon: '🌍', accentColor: '#059669', discoveryCount: 0 },
  { id: 'human_body', title: { en: 'Human Body', ta: 'மனித உடல்' }, subtitle: { en: 'Organs, systems, health', ta: 'உறுப்புகள், மண்டலங்கள், ஆரோக்கியம்' }, icon: '🫀', accentColor: '#DC2626', discoveryCount: 0 },
  { id: 'animals_plants', title: { en: 'Animals & Plants', ta: 'விலங்குகள் & தாவரங்கள்' }, subtitle: { en: 'Species, habitats, ecology', ta: 'இனங்கள், வாழிடங்கள், சூழலியல்' }, icon: '🌿', accentColor: '#16A34A', discoveryCount: 0 },
  { id: 'scientists', title: { en: 'Scientists', ta: 'விஞ்ஞானிகள்' }, subtitle: { en: 'Pioneers of discovery', ta: 'கண்டுபிடிப்புகளின் முன்னோடிகள்' }, icon: '👩‍🔬', accentColor: '#9333EA', discoveryCount: 0 },
  { id: 'inventions', title: { en: 'Inventions', ta: 'கண்டுபிடிப்புகள்' }, subtitle: { en: 'Ideas that changed the world', ta: 'உலகத்தை மாற்றிய யோசனைகள்' }, icon: '💡', accentColor: '#D97706', discoveryCount: 0 },
  { id: 'everyday_science', title: { en: 'Everyday Science', ta: 'தினசரி அறிவியல்' }, subtitle: { en: 'Science is all around us', ta: 'அறிவியல் நம் சுற்றுப்புறம் முழுவதும் உள்ளது' }, icon: '🔍', accentColor: '#0369A1', discoveryCount: 0 },
];

// ============================================================================
// Daily Discovery Entries
// ============================================================================

export const DAILY_DISCOVERY_ENTRIES: DailyDiscoveryEntry[] = [
  {
    id: 'dd_moon_phases',
    title: { en: 'Why does the Moon have phases?', ta: 'நிலவுக்கு நிலைகள் ஏன் உள்ளன?' },
    description: { en: 'Discover why the Moon appears to change shape throughout the month.', ta: 'நிலவு மாதம் முழுவதும் ஏன் வடிவத்தை மாற்றுவது போல் தோன்றுகிறது என்பதை கண்டறியுங்கள்.' },
    type: 'micro_lesson',
    topicId: 'space',
    route: '/micro-lesson/ml-moon-phases',
    icon: '🌙',
  },
  {
    id: 'dd_bending_light',
    title: { en: 'Can you bend light?', ta: 'ஒளியை வளைக்க முடியுமா?' },
    description: { en: 'Explore how light bends when it passes through different materials.', ta: 'ஒளி வெவ்வேறு பொருட்கள் வழியாக செல்லும்போது எவ்வாறு வளைகிறது என்பதை ஆராயுங்கள்.' },
    type: 'experiment',
    topicId: 'physics',
    route: '/experiment/exp-light-refraction',
    icon: '💡',
  },
  {
    id: 'dd_einstein',
    title: { en: 'Meet Albert Einstein', ta: 'ஆல்பர்ட் ஐன்ஸ்டைனை சந்தியுங்கள்' },
    description: { en: 'Learn about the scientist who unlocked the secrets of space and time.', ta: 'விண்வெளி மற்றும் நேரத்தின் ரகசியங்களை திறந்த விஞ்ஞானியைப் பற்றி அறியுங்கள்.' },
    type: 'scientist',
    topicId: 'scientists',
    route: '/explore/scientist/einstein',
    icon: '⚛️',
  },
  {
    id: 'dd_dna',
    title: { en: 'What is DNA?', ta: 'DNA என்றால் என்ன?' },
    description: { en: 'Discover the molecule that carries the instructions for life.', ta: 'உயிருக்கான வழிமுறைகளைக் கொண்டு செல்லும் மூலக்கூறை கண்டறியுங்கள்.' },
    type: 'concept_map',
    topicId: 'biology',
    route: '/concept-map/cm-dna-helix',
    icon: '🧬',
  },
  {
    id: 'dd_refrigerator',
    title: { en: 'How does a refrigerator work?', ta: 'குளிர்சாதனம் எவ்வாறு வேலை செய்கிறது?' },
    description: { en: 'Everyday science: the cooling cycle inside your fridge.', ta: 'தினசரி அறிவியல்: உங்கள் குளிர்சாதனத்திற்குள் உள்ள குளிரூட்டல் சுழற்சி.' },
    type: 'everyday_science',
    topicId: 'everyday_science',
    route: '/explore#everyday',
    icon: '🧊',
  },
  {
    id: 'dd_curie',
    title: { en: 'Marie Curie: Pioneer of Radioactivity', ta: 'மேரி கியூரி: கதிரியக்கத்தின் முன்னோடி' },
    description: { en: 'The scientist who discovered radium and won two Nobel Prizes.', ta: 'ரேடியமை கண்டுபிடித்து இரண்டு நோபல் பரிசுகள் பெற்ற விஞ்ஞானி.' },
    type: 'scientist',
    topicId: 'scientists',
    route: '/explore/scientist/curie',
    icon: '☢️',
  },
  {
    id: 'dd_water_cycle',
    title: { en: 'The Water Cycle', ta: 'நீர் சுழற்சி' },
    description: { en: 'How water moves from oceans to clouds and back again.', ta: 'நீர் கடல்களிலிருந்து மேகங்களுக்கும் மீண்டும் எவ்வாறு பயணிக்கிறது.' },
    type: 'concept_map',
    topicId: 'environment',
    route: '/concept-map/cm-water-cycle',
    icon: '💧',
  },
  {
    id: 'dd_solar_system',
    title: { en: 'Our Solar System', ta: 'நமது சூரிய மண்டலம்' },
    description: { en: 'Explore the planets, moons, and objects orbiting our Sun.', ta: 'நமது சூரியனைச் சுற்றியுள்ள கிரகங்கள், நிலவுகள் மற்றும் பொருட்களை ஆராயுங்கள்.' },
    type: 'concept_map',
    topicId: 'space',
    route: '/concept-map/cm-solar-system',
    icon: '🪐',
  },
  {
    id: 'dd_thinking_fast',
    title: { en: 'Can a pendulum prove Earth rotates?', ta: 'ஒரு கூடு பூமி சுழல்வதை நிரூபிக்க முடியுமா?' },
    description: { en: 'Learn how Foucault\'s pendulum demonstrated Earth\'s rotation.', ta: 'ஃபூகோவின் கூடு பூமியின் சுழற்சியை எவ்வாறு நிரூபித்தது என்பதை அறியுங்கள்.' },
    type: 'fun_fact',
    topicId: 'physics',
    route: '/fun-facts',
    icon: '🕰️',
  },
  {
    id: 'dd_bicycle_science',
    title: { en: 'The Amazing Science of Bicycles', ta: 'மிதிவண்டியின் அற்புத அறிவியல்' },
    description: { en: 'How does a two-wheeled vehicle stay upright? Discover the physics.', ta: 'இரண்டு சக்கர வாகனம் எவ்வாறு நேராக நிற்கிறது? இயற்பியலை கண்டறியுங்கள்.' },
    type: 'everyday_science',
    topicId: 'everyday_science',
    route: '/explore#everyday',
    icon: '🚲',
  },
  {
    id: 'dd_electricity',
    title: { en: 'How Electricity Reaches Your Home', ta: 'மின்சாரம் உங்கள் வீட்டிற்கு எவ்வாறு வருகிறது' },
    description: { en: 'From power plants to plugs: the journey of electricity.', ta: 'மின் நிலையங்களிலிருந்து ப்ளக்குகள் வரை: மின்சாரத்தின் பயணம்.' },
    type: 'concept_map',
    topicId: 'physics',
    route: '/concept-map/cm-electricity',
    icon: '⚡',
  },
  {
    id: 'dd_photosynthesis',
    title: { en: 'How Plants Make Food', ta: 'தாவரங்கள் உணவை எவ்வாறு உருவாக்குகின்றன' },
    description: { en: 'Discover photosynthesis: how sunlight becomes food for plants.', ta: 'ஒளிச்சேர்க்கையை கண்டறியுங்கள்: சூரிய ஒளி தாவரங்களுக்கு உணவாக எவ்வாறு மாறுகிறது.' },
    type: 'micro_lesson',
    topicId: 'biology',
    route: '/micro-lesson/ml-photosynthesis',
    icon: '🌿',
  },
  {
    id: 'dd_forces',
    title: { en: 'Forces All Around Us', ta: 'நம் சுற்றுப்புறம் முழுவதும் விசைகள்' },
    description: { en: 'Gravity, friction, and more — forces shape everything we do.', ta: 'ஈர்ப்பு, உராய்வு மற்றும் பல — விசைகள் நாம் செய்யும் அனைத்தையும் வடிவமைக்கின்றன.' },
    type: 'micro_lesson',
    topicId: 'physics',
    route: '/micro-lesson/ml-forces',
    icon: '💪',
  },
  {
    id: 'dd_greenhouse',
    title: { en: 'The Greenhouse Effect', ta: 'பசுங்குடில் விளைவு' },
    description: { en: 'Why does Earth stay warm? Explore the greenhouse effect.', ta: 'பூமி ஏன் வெப்பமாக இருக்கிறது? பசுங்குடில் விளைவை ஆராயுங்கள்.' },
    type: 'concept_map',
    topicId: 'environment',
    route: '/concept-map/cm-greenhouse',
    icon: '🌍',
  },
  {
    id: 'dd_humann_heart',
    title: { en: 'Your Amazing Heart', ta: 'உங்கள் அற்புதமான இதயம்' },
    description: { en: 'How your heart pumps blood through 100,000 km of blood vessels.', ta: 'உங்கள் இதயம் 100,000 கி.மீ ரத்த நாளங்கள் வழியாக இரத்தத்தை எவ்வாறு பம்ப் செய்கிறது.' },
    type: 'micro_lesson',
    topicId: 'human_body',
    route: '/micro-lesson/ml-heart',
    icon: '🫀',
  },
  {
    id: 'dd_invention_phone',
    title: { en: 'The Telephone: Connecting the World', ta: 'தொலைபேசி: உலகத்தை இணைத்தல்' },
    description: { en: 'How Alexander Graham Bell\'s invention changed communication forever.', ta: 'அலெக்சாண்டர் கிரஹம் பெல்லின் கண்டுபிடிப்பு தகவல்தொடர்பை எவ்வாறு மாற்றியது.' },
    type: 'invention',
    topicId: 'inventions',
    route: '/explore/invention/telephone',
    icon: '📞',
  },
  {
    id: 'dd_mystery_ice',
    title: { en: 'Mystery: Why did the ice melt faster?', ta: 'மர்மம்: பனி ஏன் விரைவாக உருகியது?' },
    description: { en: 'Investigate the science behind a melting experiment.', ta: 'உருகும் சோதனைக்குப் பின்னால் உள்ள அறிவியலை ஆய்வு செய்யுங்கள்.' },
    type: 'mystery',
    topicId: 'physics',
    route: '/mystery-lab',
    icon: '🕵️',
  },
  {
    id: 'dd_atom',
    title: { en: 'What is inside an atom?', ta: 'ஒரு அணுவுக்குள் என்ன இருக்கிறது?' },
    description: { en: 'Explore protons, neutrons, and electrons — building blocks of matter.', ta: 'புரோட்டான்கள், நியூட்ரான்கள் மற்றும் எலக்ட்ரான்களை ஆராயுங்கள் — பொருளின் அடிப்படை கட்டிட தொகுதிகள்.' },
    type: 'concept_map',
    topicId: 'chemistry',
    route: '/concept-map/cm-atom',
    icon: '⚛️',
  },
  {
    id: 'dd_bridge',
    title: { en: 'Bridge Engineering: Holding Heavy Loads', ta: 'பாலம் பொறியியல்: கனமான சுமைகளைத் தாங்குதல்' },
    description: { en: 'How do bridges support enormous weight? Explore the engineering.', ta: 'பாலங்கள் மிகப்பெரிய எடையை எவ்வாறு தாங்குகின்றன? பொறியியலை ஆராயுங்கள்.' },
    type: 'everyday_science',
    topicId: 'everyday_science',
    route: '/explore#everyday',
    icon: '🌉',
  },
  {
    id: 'dd_darwin',
    title: { en: 'Charles Darwin & Evolution', ta: 'சார்லஸ் டார்வின் & பரிணாம வளர்ச்சி' },
    description: { en: 'The naturalist who revealed how species change over time.', ta: 'இனங்கள் காலப்போக்கில் எவ்வாறு மாறுகின்றன என்பதை வெளிப்படுத்திய இயற்கை ஆய்வாளர்.' },
    type: 'scientist',
    topicId: 'scientists',
    route: '/explore/scientist/darwin',
    icon: '🧬',
  },
];

// ============================================================================
// Deterministic Daily Discovery
// ============================================================================

/**
 * Simple deterministic hash from date string.
 * Returns a stable index into the daily discovery entries.
 */
function dateHash(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return Math.abs(hash);
}

/**
 * Returns the deterministic daily discovery entry for a given date string.
 * Same date → same entry, always. Works offline.
 */
export function getDailyDiscovery(dateStr?: string): DailyDiscoveryEntry {
  const today = dateStr || getTodayKey();
  const index = dateHash(today) % DAILY_DISCOVERY_ENTRIES.length;
  return DAILY_DISCOVERY_ENTRIES[index];
}

/**
 * Returns today's date key in YYYY-MM-DD format.
 */
export function getTodayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * Returns the featured discovery for the Explore home.
 * Priority: daily discovery → deterministic fallback.
 */
export function getFeaturedDiscovery(): DailyDiscoveryEntry {
  return getDailyDiscovery();
}
