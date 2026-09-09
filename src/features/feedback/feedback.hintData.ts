/**
 * Feedback Hint Library
 * Authored 3-level progressive hints for real Vigyaan content:
 * every micro lesson quick check (30) and every experiment reflection (15).
 * Hints genuinely guide toward the concept — no generic "think carefully".
 * Data-only module; consumed deterministically by the HintEngine.
 */

import { FeedbackHint } from './feedback.types';

interface HintEntrySeed {
  /** Question key this hint set belongs to (feedback entry id without prefix). */
  key: string;
  levels: Array<{
    level: 1 | 2 | 3;
    en: string;
    ta: string;
  }>;
}

const HINT_SEEDS: HintEntrySeed[] = [
  // ==================== PHYSICS (Micro Lessons) ====================
  {
    key: 'micro-newtons-first-law',
    levels: [
      { level: 1, en: 'Think about motion — and about what your body is still doing when the bus stops.', ta: 'இயக்கத்தைப் பற்றி சிந்தியுங்கள் — பேருந்து நிற்கும்போது உங்கள் உடல் என்ன செய்கிறது?' },
      { level: 2, en: 'Your feet stop with the bus floor, but your upper body wants to keep moving.', ta: 'உங்கள் கால்கள் பேருந்துடன் நிற்கின்றன, ஆனால் மேல் உடல் முன்னோக்கிச் செல்ல விழைகிறது.' },
      { level: 3, en: 'This tendency of matter to keep its state of motion is called inertia.', ta: 'இயக்க நிலையைத் தொடர விழையும் பொருளின் பண்பு நிலைமம் எனப்படும்.' },
    ],
  },
  {
    key: 'micro-newtons-third-law',
    levels: [
      { level: 1, en: 'Think about which direction the swimmer pushes the water.', ta: 'நீச்சல் வீரர் நீரை எந்தத் திசையில் தள்ளுகிறார் என்று யோசியுங்கள்.' },
      { level: 2, en: 'Every push produces a push back — in the exact opposite direction.', ta: 'ஒவ்வொரு தள்ளுதலும் எதிர்த் திசையில் சமமான தள்ளுதலை உருவாக்குகிறது.' },
      { level: 3, en: 'Action and reaction act on two different bodies — this is Newton\'s Third Law.', ta: 'செயலும் எதிர்செயலும் இரு வேறு பொருட்களில் செயல்படும் — இது நியூட்டனின் மூன்றாம் விதி.' },
    ],
  },
  {
    key: 'micro-light-reflection',
    levels: [
      { level: 1, en: 'Draw the normal line and measure both angles from it, not from the mirror surface.', ta: 'செங்குத்துக் கோட்டை வரைந்து, இரு கோணங்களையும் அதிலிருந்து அளவுங்கள்; ஆடித் தளத்திலிருந்து அல்ல.' },
      { level: 2, en: 'The incoming ray and the outgoing ray are perfectly symmetric about the normal.', ta: 'வரும் கதிரும் செல்லும் கதிரும் செங்குத்துக் கோட்டை மையமாகக் கொண்டு சமச்சீராக இருக்கும்.' },
      { level: 3, en: 'The law of reflection says angle of incidence = angle of reflection (i = r).', ta: 'எதிரொளிப்பு விதியின்படி படுகோணம் = எதிரொளிப்புக் கோணம் (i = r).' },
    ],
  },
  {
    key: 'micro-electric-circuits',
    levels: [
      { level: 1, en: 'A current needs one unbroken loop from the battery and back.', ta: 'மின்னோட்டத்திற்கு மின்கலத்திலிருந்து திரும்பவும் தடையற்ற ஒரு வளையம் தேவை.' },
      { level: 2, en: 'An open switch creates a gap in that loop — like a broken bridge.', ta: 'திறந்த சுவிட்ச் அந்த வளையத்தில் இடைவெளியை உருவாக்குகிறது — உடைந்த பாலம் போல.' },
      { level: 3, en: 'No closed path means no electron flow, so the bulb goes out.', ta: 'மூடிய பாதை இல்லை என்றால் எலக்ட்ரான் பாய்வு இல்லை; விளக்கு அணைந்துவிடும்.' },
    ],
  },
  {
    key: 'micro-sound-waves',
    levels: [
      { level: 1, en: 'Sound is vibration — ask yourself what could carry those vibrations in space.', ta: 'ஒலி என்பது அதிர்வு — விண்வெளியில் அந்த அதிர்வுகளை எது சுமக்கும்?' },
      { level: 2, en: 'Vibrations travel by pushing neighbouring particles; space has no particles.', ta: 'அதிர்வுகள் அடுத்துள்ள துகள்களைத் தள்ளி பரவுகின்றன; விண்வெளியில் துகள்களே இல்லை.' },
      { level: 3, en: 'Sound needs a material medium — a vacuum has none, so space is silent.', ta: 'ஒலிக்கு ஊடகம் தேவை — வெற்றிடத்தில் ஊடகம் இல்லை; எனவே விண்வெளி மௌனமானது.' },
    ],
  },
  {
    key: 'micro-gravity-weightlessness',
    levels: [
      { level: 1, en: 'Gravity at the station\'s height is still about 90% of ground level — so it is not missing.', ta: 'நிலையத்தின் உயரத்தில் ஈர்ப்பு விசை தரையின் 90% உள்ளது — அது இல்லை என்று சொல்ல முடியாது.' },
      { level: 2, en: 'Ask what happens when the floor under you falls at the same rate you do.', ta: 'உங்கள் கீழுள்ள தரையும் நீங்களும் ஒரே வேகத்தில் விழுந்தால் என்ன ஆகும்?' },
      { level: 3, en: 'Astronauts are in continuous free fall around Earth — nothing pushes up on them.', ta: 'வீரர்கள் பூமியைச் சுற்றித் தொடர்ந்து விழுந்து கொண்டிருக்கிறார்கள் — அவர்களைத் தாங்கும் விசை இல்லை.' },
    ],
  },
  {
    key: 'micro-heat-transfer',
    levels: [
      { level: 1, en: 'Think of the three routes heat can take — touch, flow, and waves.', ta: 'வெப்பம் பயணிக்கும் மூன்று வழிகளை நினையுங்கள் — தொடர்பு, பாய்வு, அலைகள்.' },
      { level: 2, en: 'Only one of them works without any matter at all.', ta: 'அவற்றில் ஒன்று மட்டுமே பொருளின்றி செயல்படும்.' },
      { level: 3, en: 'Radiation travels as electromagnetic waves, so it crosses empty space.', ta: 'கதிர்வீச்சு மின்காந்த அலைகளாகப் பயணிப்பதால் வெற்றிடத்தைக் கடக்கும்.' },
    ],
  },
  {
    key: 'micro-states-of-matter',
    levels: [
      { level: 1, en: 'Think about how far apart the particles are in each state.', ta: 'ஒவ்வொரு நிலையிலும் துகள்கள் எவ்வளவு இடைவெளியில் உள்ளன என்று யோசியுங்கள்.' },
      { level: 2, en: 'In steam, particles have enough energy to fly far from each other.', ta: 'நீராவியில் துகள்களுக்கு விரைவாக விலகி ஓட ஆற்றல் உண்டு.' },
      { level: 3, en: 'Gases fill their container because the particles are far apart with empty gaps.', ta: 'துகள்களுக்கு இடையே பெரிய இடைவெளி இருப்பதால் வாயுக்கள் முழு கொள்கலனையும் நிரப்புகின்றன.' },
    ],
  },
  {
    key: 'micro-why-ice-floats',
    levels: [
      { level: 1, en: 'Compare the mass and the volume of the frozen water with the same water as liquid.', ta: 'உறைந்த நீரின் நிறையையும் பருமனையும், திரவ நீருடன் ஒப்பிடுங்கள்.' },
      { level: 2, en: 'Water expands when it freezes — same mass, larger volume.', ta: 'நீர் உறையும்போது விரிவடைகிறது — நிறை அதே, பருமன் அதிகம்.' },
      { level: 3, en: 'Larger volume means lower density, and less dense ice floats on water.', ta: 'பருமன் அதிகம் என்றால் அடர்த்தி குறைவு; குறைந்த அடர்த்தியுள்ள பனி நீரில் மிதக்கும்.' },
    ],
  },
  {
    key: 'micro-why-sky-blue',
    levels: [
      { level: 1, en: 'Sunlight is a mix of many colours — what happens to each colour in the air?', ta: 'சூரிய ஒளி பல நிறங்களின் கலவை — ஒவ்வொரு நிறமும் காற்றில் என்ன அடைகிறது?' },
      { level: 2, en: 'Tiny air molecules scatter shorter wavelengths much more strongly.', ta: 'சிறிய காற்று மூலக்கூறுகள் குறுகிய அலைநீளங்களை அதிகமாகச் சிதறடிக்கின்றன.' },
      { level: 3, en: 'Blue has a short wavelength, so it scatters everywhere and paints the sky.', ta: 'நீலத்தின் அலைநீளம் குறுகியது; எங்கும் சிதறி வானத்தை நீலமாக்குகிறது.' },
    ],
  },
  {
    key: 'micro-acids-bases-ph',
    levels: [
      { level: 1, en: 'Locate 7 on the pH scale and compare your substance\'s value with it.', ta: 'pH அளவில் 7 ஐக் கண்டறிந்து, உங்கள் பொருளின் மதிப்பை அதுடன் ஒப்பிடுங்கள்.' },
      { level: 2, en: 'Below 7 means more H+ ions; above 7 means more OH− ions.', ta: '7க்குக் கீழ் H+ அயனிகள் அதிகம்; 7க்கு மேல் OH− அயனிகள் அதிகம்.' },
      { level: 3, en: 'A strong acid near pH 2 releases many hydrogen ions.', ta: 'pH 2 அருகிலுள்ள வலுவான அமிலம் நிறைய ஹைட்ரஜன் அயனிகளை வெளியிடுகிறது.' },
    ],
  },
  {
    key: 'micro-atomic-structure',
    levels: [
      { level: 1, en: 'Split the atom into its two charged parts and one neutral part.', ta: 'அணுவை இரு மின்சுமையுள்ள பகுதிகளாகவும் ஒரு நடுநிலைப் பகுதியாகவும் பிரியுங்கள்.' },
      { level: 2, en: 'Protons are positive, electrons are negative, and neutrons carry no charge.', ta: 'புரோட்டான் நேர்மின்சுமை, எலக்ட்ரான் எதிர்மின்சுமை, நியூட்ரானுக்கு மின்சுமை இல்லை.' },
      { level: 3, en: 'The nucleus holds protons and neutrons; electrons orbit around it.', ta: 'அணுக்கருவில் புரோட்டான்களும் நியூட்ரான்களும் உள்ளன; எலக்ட்ரான்கள் சுற்றி வருகின்றன.' },
    ],
  },
  {
    key: 'micro-battery-chemistry',
    levels: [
      { level: 1, en: 'A battery is chemistry in action — think about which particles move inside it.', ta: 'மின்கலம் வேதியியலின் செயல்பாடு — உள்ளே எந்தத் துகள்கள் நகர்கின்றன?' },
      { level: 2, en: 'Chemical reactions push electrons from one electrode to the other.', ta: 'வேதி வினைகள் எலக்ட்ரான்களை ஒரு மின்முனையிலிருந்து மற்றொன்றுக்குத் தள்ளுகின்றன.' },
      { level: 3, en: 'That electron flow through the wire is exactly what we call electric current.', ta: 'கம்பியில் பாயும் அந்த எலக்ட்ரான் ஓட்டமே மின்னோட்டம் எனப்படும்.' },
    ],
  },
  {
    key: 'micro-chemical-reactions',
    levels: [
      { level: 1, en: 'Check whether the starting substances and the ending substances are the same.', ta: 'தொடக்கப் பொருட்களும் இறுதிப் பொருட்களும் ஒன்றாக உள்ளனவா என்று பாருங்கள்.' },
      { level: 2, en: 'New substances with new properties appear when bonds break and re-form.', ta: 'பிணைப்புகள் உடைந்து மீண்டும் உருவாகும்போது புதிய பண்புகளுடன் புதிய பொருட்கள் உருவாகும்.' },
      { level: 3, en: 'A chemical change forms new substances; a physical change does not.', ta: 'வேதி மாற்றத்தில் புதிய பொருட்கள் உருவாகும்; இயற்பியல் மாற்றத்தில் இல்லை.' },
    ],
  },
  {
    key: 'micro-periodic-table',
    levels: [
      { level: 1, en: 'The table is arranged by a number every atom owns — count its protons.', ta: 'ஒவ்வொரு அணுவிற்கும் உள்ள ஒரு எண்ணின் அடிப்படையில் அட்டவணை அமைகிறது — புரோட்டான்களை எண்ணுங்கள்.' },
      { level: 2, en: 'Elements in the same column share outer-electron behaviour, so they react alike.', ta: 'ஒரே நெடுவரிசையில் உள்ள தனிமங்கள் வெளிப்புற எலக்ட்ரான் நடத்தையைப் பகிர்கின்றன.' },
      { level: 3, en: 'Rows follow increasing atomic number; columns group elements with similar properties.', ta: 'வரிசைகள் அணு எண் அதிகரிப்புப்படி; நெடுவரிசைகள் ஒத்த பண்புகளைத் தொகுக்கின்றன.' },
    ],
  },
  {
    key: 'micro-solutions-solvents',
    levels: [
      { level: 1, en: 'Ask which particles end up touching and holding each other in the mixture.', ta: 'கலவையில் எந்தத் துகள்கள் ஒன்றையொன்று தொட்டுப் பிடிக்கின்றன?' },
      { level: 2, en: 'Water molecules surround and pull particles away from the lump of solute.', ta: 'நீர் மூலக்கூறுகள் கரைபொருளைச் சுற்றி, அதன் துகள்களைப் பிரித்து இழுக்கின்றன.' },
      { level: 3, en: 'The solute spreads evenly into the solvent — that uniform mixture is a solution.', ta: 'கரைபொருள் கரைப்பானில் சீராகப் பரவுகிறது — அந்தச் சீர் கலவையே கரைசல்.' },
    ],
  },
  // ==================== CHEMISTRY (Micro Lessons, continued) ====================
  {
    key: 'micro-photosynthesis',
    levels: [
      { level: 1, en: 'List what a leaf takes in and what it gives out.', ta: 'இலை எதை உள்ளே எடுத்துக்கொள்கிறது, எதை வெளியே தருகிறது?' },
      { level: 2, en: 'Sunlight supplies the energy to turn water and carbon dioxide into sugar.', ta: 'சூரிய ஒளி நீரையும் கார்பன் டை ஆக்சைடையும் சர்க்கரையாக மாற்ற ஆற்றல் தருகிறது.' },
      { level: 3, en: 'Photosynthesis stores light energy as chemical energy in glucose, releasing oxygen.', ta: 'ஒளிச்சேர்க்கை ஒளி ஆற்றலை குளுக்கோஸில் வேதி ஆற்றலாகச் சேமித்து, ஆக்சிஜனை வெளியிடுகிறது.' },
    ],
  },
  {
    key: 'micro-cell-structure',
    levels: [
      { level: 1, en: 'Compare a cell to a factory — which part is the office, which part is the wall?', ta: 'செல்லை ஒரு தொழிற்சாலையுடன் ஒப்பிடுங்கள் — அலுவலகம் எது, சுவர் எது?' },
      { level: 2, en: 'The nucleus stores instructions; the membrane controls what enters and leaves.', ta: 'கரு வழிமுறைகளைச் சேமிக்கிறது; சவ்வு உள்ளே வருவதையும் வெளியே போவதையும் கட்டுப்படுத்துகிறது.' },
      { level: 3, en: 'Mitochondria release energy, ribosomes build proteins, vacuoles store water.', ta: 'மைட்டோகாண்ட்ரியா ஆற்றலை வெளியிடுகிறது, ரைபோசோம்கள் புரதம் உருவாக்குகின்றன, வெற்றிடங்கள் நீரைச் சேமிக்கின்றன.' },
    ],
  },
  {
    key: 'micro-dna-genetics',
    levels: [
      { level: 1, en: 'Think about where your body keeps its building instructions.', ta: 'உங்கள் உடல் தன் கட்டுமான வழிமுறைகளை எங்கு வைத்திருக்கிறது?' },
      { level: 2, en: 'DNA is a four-letter code written along a twisted ladder.', ta: 'DNA என்பது திருகு ஏணியில் எழுதப்பட்ட நான்கு எழுத்துக் குறியீடு.' },
      { level: 3, en: 'Genes are DNA sections; they pass traits from parents to offspring.', ta: 'மரபணுக்கள் DNA பகுதிகள்; பெற்றோரிடமிருந்து சந்ததிக்கு இயல்புகளை எடுத்துச் செல்கின்றன.' },
    ],
  },
  {
    key: 'micro-food-chains',
    levels: [
      { level: 1, en: 'Follow the energy: who eats what, and who eats them?', ta: 'ஆற்றலைப் பின்தொடருங்கள்: யார் எதை சாப்பிடுகிறது, அதை யார் சாப்பிடுகிறது?' },
      { level: 2, en: 'Every chain starts with a producer that captures sunlight, not another animal.', ta: 'ஒவ்வொரு சங்கிலியும் சூரிய ஒளியைப் பிடிக்கும் உற்பத்தியாளரில் தொடங்குகிறது; விலங்கில் அல்ல.' },
      { level: 3, en: 'Producers → herbivores → carnivores: energy flows one way and shrinks at each step.', ta: 'உற்பத்தியாளர் → தாவர உண்ணிகள் → ஊனுண்ணிகள்: ஆற்றல் ஒரு திசையில் பாய்ந்து ஒவ்வொரு படியிலும் குறைகிறது.' },
    ],
  },
  {
    key: 'micro-human-heart',
    levels: [
      { level: 1, en: 'The heart is a double pump — one side for each circuit of the body.', ta: 'இதயம் இரட்டை ஏற்றி — ஒரு பக்கம் உடலுக்கு, ஒரு பக்கம் நுரையீரலுக்கு.' },
      { level: 2, en: 'One circuit goes to the lungs to collect oxygen; the other delivers it to the body.', ta: 'ஒரு சுற்று நுரையீரலுக்குச் சென்று ஆக்சிஜன் எடுக்கிறது; மற்றொன்று அதை உடலுக்கு வழங்குகிறது.' },
      { level: 3, en: 'Right side pumps to lungs, left side pumps to the body — valves keep flow one-way.', ta: 'வலது பக்கம் நுரையீரலுக்கு, இடது பக்கம் உடலுக்கு — வால்வுகள் ஒரே திசையில் ஓட்டுகின்றன.' },
    ],
  },
  {
    key: 'micro-human-brain-reflexes',
    levels: [
      { level: 1, en: 'Time matters — how fast must your hand pull back from a hot object?', ta: 'நேரம் முக்கியம் — சூடான பொருளிலிருந்து கை எவ்வளவு வேகமாக விலக வேண்டும்?' },
      { level: 2, en: 'Some signals skip the brain entirely and travel spine-only shortcuts.', ta: 'சில சமிக்ஞைகள் மூளையைத் தாண்டி முள்ளந்தண்டு வழியாக நேரடியாகச் செல்கின்றன.' },
      { level: 3, en: 'Reflex arcs act before the brain is informed — that speed protects you.', ta: 'தன்னியக்க எதிர்வினைகள் மூளைக்குத் தெரிவிக்கும் முன்பே செயல்படும் — அந்த வேகமே உங்களைக் காக்கிறது.' },
    ],
  },
  {
    key: 'micro-microorganisms-bacteria',
    levels: [
      { level: 1, en: 'Not all germs are enemies — many microbes help you daily.', ta: 'எல்லா கிருமிகளும் எதிரிகள் அல்ல — பல நுண்ணுயிர்கள் தினமும் உதவுகின்றன.' },
      { level: 2, en: 'Curds, bread, and compost all depend on helpful bacteria.', ta: 'தயிர், ரொட்டி, உரம் ஆகியவை உதவியான பாக்டீரியாவைச் சார்ந்தவை.' },
      { level: 3, en: 'Only a minority cause disease; most microbes recycle nutrients and aid digestion.', ta: 'சிலவே நோய் உண்டாக்குகின்றன; பெரும்பாலானவை சத்துக்களை மீட்டு செரிமானம் உதவுகின்றன.' },
    ],
  },
  {
    key: 'micro-moon-phases',
    levels: [
      { level: 1, en: 'The Moon does not make light — so why does it look different each night?', ta: 'நிலா தானே ஒளி வெளியிடுவதில்லை — இரவுதோறும் அது மாறுவது ஏன்?' },
      { level: 2, en: 'We only see the sunlit half — and how much of it faces us changes as it orbits.', ta: 'ஒளிபெற்ற பாதி மட்டுமே நமக்குத் தெரியும் — சுற்றுப்பாதையில் அது மாறுகிறது.' },
      { level: 3, en: 'Phases are caused by the Moon orbiting Earth, changing the lit portion we see.', ta: 'நிலவு பூமியைச் சுற்றுவதால் நமக்குத் தெரியும் ஒளிபகுதி மாறுவதே நிலவு வடிவங்களுக்குக் காரணம்.' },
    ],
  },
  {
    key: 'micro-solar-system-orbits',
    levels: [
      { level: 1, en: 'Ask what balances the Sun\'s inward pull on a planet.', ta: 'சூரியனின் உள்நோக்கிய ஈர்ப்பை எது சமப்படுத்துகிறது?' },
      { level: 2, en: 'A planet moving sideways keeps falling toward the Sun but keeps missing it.', ta: 'பக்கவாட்டில் நகரும் கோள் சூரியனை நோக்கி விழுந்தும் தொடாமல் தப்பிக்கிறது.' },
      { level: 3, en: 'That combination — sideways motion plus gravity — is exactly what an orbit is.', ta: 'பக்கவாட்டு இயக்கமும் ஈர்ப்பும் சேர்ந்ததே சுற்றுப்பாதை ஆகும்.' },
    ],
  },
  {
    key: 'micro-stars-black-holes',
    levels: [
      { level: 1, en: 'Think about what escapes and what cannot when gravity becomes extreme.', ta: 'ஈர்ப்பு விசை மிக அதிகமாகும்போது எது தப்புகிறது, எது தப்பாது?' },
      { level: 2, en: 'Light is the fastest thing in the universe — even it cannot get out.', ta: 'ஒளியே உலகின் வேகமானது — அது கூட வெளியேற முடியாது.' },
      { level: 3, en: 'A black hole\'s gravity traps everything, which is why it appears completely black.', ta: 'கருந்துளையின் ஈர்ப்பு அனைத்தையும் சிக்கவைப்பதால் அது முழு கருப்பாகத் தோன்றுகிறது.' },
    ],
  },
  {
    key: 'micro-water-cycle',
    levels: [
      { level: 1, en: 'Trace one raindrop: where does it go after puddles dry up?', ta: 'ஒரு மழைத்துளியைப் பின்தொடருங்கள்: குட்டை காய்ந்த பிறகு அது எங்கு செல்கிறது?' },
      { level: 2, en: 'Evaporation lifts water as vapour; condensation turns it back into clouds.', ta: 'ஆவியாதல் நீரை ஆவியாக மேலெழுப்புகிறது; ஒடுக்கம் அதை மீண்டும் மேகமாக்குகிறது.' },
      { level: 3, en: 'Evaporation → condensation → precipitation: the same water cycles endlessly.', ta: 'ஆவியாதல் → ஒடுக்கம் → மழைப்பொழிவு: அதே நீர் முடிவில்லாமல் சுழல்கிறது.' },
    ],
  },
  {
    key: 'micro-greenhouse-effect',
    levels: [
      { level: 1, en: 'Think about sunlight entering a car with closed windows in summer.', ta: 'கோடையில் ஜன்னல்கள் மூடிய காருக்குள் சூரிய ஒளி நுழைவதை நினையுங்கள்.' },
      { level: 2, en: 'Light gets in easily, but the warmth it becomes cannot get out as easily.', ta: 'ஒளி எளிதாக உள்ளே வருகிறது, ஆனால் அது மாறும் வெப்பம் எளிதாக வெளியேறாது.' },
      { level: 3, en: 'Greenhouse gases trap outgoing heat, warming the lower atmosphere.', ta: 'பசுங்குடில் வாயுக்கள் வெளிப்புறம் போகும் வெப்பத்தைப் பிடித்து, கீழ் வளிமண்டலத்தை சூடாக்குகின்றன.' },
    ],
  },
  {
    key: 'micro-renewable-energy',
    levels: [
      { level: 1, en: 'Which resources will still exist no matter how much we use them?', ta: 'எவ்வளவு பயன்படுத்தினாலும் இருந்துகொண்டே இருக்கும் வளங்கள் எது?' },
      { level: 2, en: 'Sun, wind, and flowing water refill themselves continuously.', ta: 'சூரியன், காற்று, பாயும் நீர் தாமாகவே தொடர்ந்து புதுப்பித்துக்கொள்கின்றன.' },
      { level: 3, en: 'Renewables regenerate naturally, unlike coal and oil which take millions of years.', ta: 'நிலக்கரி, எண்ணெய் போலல்லாமல் மறுபுதுப்பிக்கத்தக்க ஆற்றல் இயற்கையாகவே மீளுருவாக்கம் பெறுகிறது.' },
    ],
  },
  {
    key: 'micro-plant-transpiration',
    levels: [
      { level: 1, en: 'Watch how plants look on a hot afternoon — what are they losing?', ta: 'வெயில் மதியத்தில் செடிகள் எப்படி இருக்கின்றன — அவை எதை இழக்கின்றன?' },
      { level: 2, en: 'Water escapes as vapour through tiny pores on the underside of leaves.', ta: 'இலைகளின் அடிப்பகுதியில் உள்ள சிறு துளைகள் வழியாக நீர் ஆவியாக வெளியேறுகிறது.' },
      { level: 3, en: 'That evaporation pulls more water up the stem like drinking through a straw.', ta: 'அந்த ஆவியாதல் குழாய் வழியாகப் பானம் உறிஞ்சுவது போல தண்டு வழியே நீரை மேலே இழுக்கிறது.' },
    ],
  },
  // ==================== EXPERIMENTS (Reflection Questions) ====================
  {
    key: 'exp-ohms-law',
    levels: [
      { level: 1, en: 'Write Ohm\'s Law down and mark which quantity is doubled.', ta: 'ஓம் விதியை எழுதி, எந்த அளவு இரட்டிப்பாகிறது என்று குறியுங்கள்.' },
      { level: 2, en: 'I = V / R: if R moves from 5 to 10 while V stays 10, look at the denominator.', ta: 'I = V / R: V மாறாமல் R எண்ணிக்கை 5 இலிருந்து 10 ஆக மாறும்போது பகுதியைப் பாருங்கள்.' },
      { level: 3, en: 'Doubling the denominator halves the quotient — current drops from 2A to 1A.', ta: 'பகுதி இரட்டிப்பாகும்போது ஈவு பாதியாகும் — மின்னோட்டம் 2A இலிருந்து 1A ஆக குறையும்.' },
    ],
  },
  {
    key: 'exp-density',
    levels: [
      { level: 1, en: 'Compute density = mass ÷ volume for the block.', ta: 'கட்டியின் அடர்த்தி = நிறை ÷ பருமன் எனக் கணக்கிடுங்கள்.' },
      { level: 2, en: '120g ÷ 60 cm³ = 2.0 g/cm³ — now compare it with water\'s 1.0.', ta: '120 ÷ 60 = 2.0 கி/செ.மீ³ — இதை நீரின் 1.0 உடன் ஒப்பிடுங்கள்.' },
      { level: 3, en: 'Any object denser than water sinks; less dense floats.', ta: 'நீரை விட அடர்த்தி அதிகமான பொருள் மூழ்கும்; குறைவானது மிதக்கும்.' },
    ],
  },
  {
    key: 'exp-reflection',
    levels: [
      { level: 1, en: 'Remember which two angles the law of reflection compares.', ta: 'எதிரொளிப்பு விதி எந்த இரண்டு கோணங்களை ஒப்பிடுகிறது?' },
      { level: 2, en: 'The angle out always mirrors the angle in — measure both from the normal.', ta: 'வெளிச் செல்லும் கோணம் எப்போதும் உள்வரும் கோணத்தை பிரதிபலிக்கிறது — இரண்டையும் செங்குத்துக் கோட்டிலிருந்து அளவுங்கள்.' },
      { level: 3, en: 'At 45° incidence, reflection is also exactly 45°.', ta: '45° படுகோணத்தில் எதிரொளிப்பும் சரியாக 45° ஆகும்.' },
    ],
  },
  {
    key: 'exp-refraction',
    levels: [
      { level: 1, en: 'Ask what physically changes about the light wave inside the water.', ta: 'நீருக்குள் ஒளி அலையில் உண்மையில் என்ன மாறுகிறது?' },
      { level: 2, en: 'Light travels slower in water than in air — its speed changes.', ta: 'காற்றை விட நீரில் ஒளி மெதுவாகப் பயணிக்கிறது — அதன் வேகம் மாறுகிறது.' },
      { level: 3, en: 'A speed change between media bends the ray — that bending is refraction.', ta: 'ஊடகங்களிடையே வேக மாற்றம் கதிரை வளைக்கிறது — அந்த வளைவே ஒளிவிலகல்.' },
    ],
  },
  {
    key: 'exp-free-fall',
    levels: [
      { level: 1, en: 'Compare the two gravitational accelerations: 9.8 vs 1.6 m/s².', ta: 'இரு ஈர்ப்பு முடுக்கங்களை ஒப்பிடுங்கள்: 9.8 vs 1.6 மீ/வி².' },
      { level: 2, en: 'Fall time grows as gravity weakens: t = √(2h / g).', ta: 'ஈர்ப்பு குறையும்போது விழும் நேரம் கூடும்: t = √(2h / g).' },
      { level: 3, en: 'Six times weaker gravity means roughly six times slower to reach the ground.', ta: 'ஈர்ப்பு ஆறு மடங்கு குறைவு என்றால் தரையை அடைய ஆறு மடங்கு அதிக நேரம்.' },
    ],
  },
  {
    key: 'exp-pendulum',
    levels: [
      { level: 1, en: 'Recall the pendulum formula and which variable appears in it.', ta: 'ஊசல் சூத்திரத்தில் எந்த மாறி உள்ளது என்று நினைவில் கொள்ளுங்கள்.' },
      { level: 2, en: 'T = 2π√(L/g): mass never appears in the formula.', ta: 'T = 2π√(L/g): நிறை சூத்திரத்திலேயே இல்லை.' },
      { level: 3, en: 'A longer string increases L, which increases the swing period.', ta: 'கயிற்றின் நீளம் L கூடும்போது அலைவு நேரம் T கூடுகிறது.' },
    ],
  },
  {
    key: 'exp-ph-explorer',
    levels: [
      { level: 1, en: 'Place pH 2.5 on the 0–14 scale and ask which side of 7 it falls on.', ta: 'pH 2.5 ஐ 0–14 அளவில் வைத்து, அது 7க்கு எந்தப் பக்கம் உள்ளது?' },
      { level: 2, en: 'Deep below 7 means a large concentration of H+ ions.', ta: '7க்கு மிகக் கீழ் என்றால் H+ அயனிகளின் செறிவு மிக அதிகம்.' },
      { level: 3, en: 'Low pH with red indicator = a strong acid.', ta: 'குறைந்த pH உடன் சிவப்பு நிறங்காட்டி = வலுவான அமிலம்.' },
    ],
  },
  {
    key: 'exp-solubility',
    levels: [
      { level: 1, en: 'Think about what a hot saturated solution holds compared to a cold one.', ta: 'சூடான தெவிட்டிய கரைசல் குளிர்ந்ததை விட அதிகமாக எதை வைத்திருக்கிறது?' },
      { level: 2, en: 'When it cools, the solvent can no longer hold all that solute.', ta: 'குளிர்ந்ததும் கரைப்பான் அந்த அளவு கரைபொருளைத் தாங்க முடியாது.' },
      { level: 3, en: 'Excess dissolved sugar leaves the solution and crystallizes out.', ta: 'கூடுதலாகக் கரைந்த சர்க்கரை கரைசலை விட்டு படிகமாக வெளிவருகிறது.' },
    ],
  },
  {
    key: 'exp-states-of-matter',
    levels: [
      { level: 1, en: 'Compare the spacing between molecules in liquid water and in steam.', ta: 'திரவ நீரிலும் நீராவியிலும் மூலக்கூறுகளுக்கு இடையேயான இடைவெளியை ஒப்பிடுங்கள்.' },
      { level: 2, en: 'High-energy gas molecules fly apart, leaving large empty gaps.', ta: 'அதிக ஆற்றல் கொண்ட வாயு மூலக்கூறுகள் விலகி, பெரிய இடைவெளியை விட்டுவிடுகின்றன.' },
      { level: 3, en: 'Those empty gaps are why steam occupies vastly more volume than liquid water.', ta: 'அந்த வெற்று இடைவெளிகள்தான் நீராவி திரவ நீரை விட பல மடங்கு பருமனை எடுக்க காரணம்.' },
    ],
  },
  {
    key: 'exp-reaction-rate',
    levels: [
      { level: 1, en: 'Recall collision theory — what must particles do for a reaction to happen?', ta: 'மோதுகை கொள்கையின்படி வினை நிகழ துகள்கள் என்ன செய்ய வேண்டும்?' },
      { level: 2, en: 'Hotter particles move faster and collide more often, with more energy.', ta: 'சூடான துகள்கள் வேகமாக நகர்ந்து அடிக்கடி, அதிக ஆற்றலுடன் மோதுகின்றன.' },
      { level: 3, en: 'More frequent energetic collisions mean the reaction speeds up.', ta: 'அடிக்கடி நடக்கும் சக்திவாய்ந்த மோதல்கள் வினையை வேகப்படுத்துகின்றன.' },
    ],
  },
  {
    key: 'exp-photosynthesis',
    levels: [
      { level: 1, en: 'Compare the plant\'s bubble output in bright light versus dim light.', ta: 'பிரகாசமான ஒளியிலும் மங்கலான ஒளியிலும் செடி வெளியிடும் குமிழ்களை ஒப்பிடுங்கள்.' },
      { level: 2, en: 'Light is the energy source — more light powers more photosynthesis.', ta: 'ஒளியே ஆற்றல் மூலம் — அதிக ஒளி அதிக ஒளிச்சேர்க்கையை இயக்குகிறது.' },
      { level: 3, en: 'The oxygen bubbles are direct evidence of photosynthesis rate.', ta: 'ஆக்சிஜன் குமிழ்களே ஒளிச்சேர்க்கை வேகத்தின் நேரடி ஆதாரம்.' },
    ],
  },
  {
    key: 'exp-heart-rate',
    levels: [
      { level: 1, en: 'Ask why your muscles would need more of something while running.', ta: 'ஓடும்போது தசைகளுக்கு எது அதிகமாகத் தேவைப்படுகிறது?' },
      { level: 2, en: 'Working muscles consume oxygen faster, so the blood must deliver it faster.', ta: 'வேலை செய்யும் தசைகள் ஆக்சிஜனை வேகமாக உபயோகிக்கின்றன; இரத்தம் வேகமாக வழங்க வேண்டும்.' },
      { level: 3, en: 'The heart beats faster to pump oxygen-rich blood more times per minute.', ta: 'நிமிடத்திற்கு அதிக முறை ஆக்சிஜன் நிறைந்த இரத்தத்தை அனுப்ப இதயம் வேகமாகத் துடிக்கிறது.' },
    ],
  },
  {
    key: 'exp-moon-phases',
    levels: [
      { level: 1, en: 'Track one Moon month: how does the lit shape we see change?', ta: 'ஒரு நிலவு மாதத்தைப் பின்தொடருங்கள்: நமக்குத் தெரியும் ஒளி வடிவம் எப்படி மாறுகிறது?' },
      { level: 2, en: 'Each orbit shifts how much of the sunlit half faces Earth.', ta: 'ஒவ்வொரு சுற்றும் ஒளிபெற்ற பாதி பூமியை நோக்கி இருக்கும் அளவை மாற்றுகிறது.' },
      { level: 3, en: 'New moon to full moon and back — that repeating cycle creates the phases.', ta: 'அமாவாசையிலிருந்து பௌர்ணமி மீண்டும் அமாவாசை — அந்த சுழற்சியே நிலவு வடிவங்களை உருவாக்குகிறது.' },
    ],
  },
  {
    key: 'exp-water-cycle',
    levels: [
      { level: 1, en: 'Follow the water droplet through heating, rising, cooling, and falling.', ta: 'நீர்த்துளியை சூடாதல், மேலெழுதல், குளிர்தல், விழுதல் வழியாகப் பின்தொடருங்கள்.' },
      { level: 2, en: 'The Sun drives evaporation; cold air high up drives condensation.', ta: 'சூரியன் ஆவியாதலை இயக்குகிறது; உயரில் குளிர் காற்று ஒடுக்கத்தை ஏற்படுத்துகிறது.' },
      { level: 3, en: 'The complete loop — evaporation, condensation, precipitation, collection — never stops.', ta: 'முழு சுழற்சி — ஆவியாதல், ஒடுக்கம், மழை, சேமிப்பு — ஒருபோதும் நிற்பதில்லை.' },
    ],
  },
  {
    key: 'exp-greenhouse-effect',
    levels: [
      { level: 1, en: 'Compare the inside temperature with the outside temperature in the model.', ta: 'மாதிரியில் உள்ளே வெப்பநிலையையும் வெளியே வெப்பநிலையையும் ஒப்பிடுங்கள்.' },
      { level: 2, en: 'Trapped gases hold outgoing infrared heat near the surface.', ta: 'சிக்குண்ட வாயுக்கள் வெளிப்புறம் போகும் வெப்பத்தை மேற்பரப்பு அருகில் பிடிக்கின்றன.' },
      { level: 3, en: 'More trapped heat means a higher steady temperature inside the model.', ta: 'அதிகமாகப் பிடிக்கப்படும் வெப்பம் மாதிரிக்குள் அதிக நிலையான வெப்பநிலையை உருவாக்குகிறது.' },
    ],
  },
];

/** Fully built, bilingual hint library keyed by feedback entry key. */
export const FEEDBACK_HINTS: Record<string, FeedbackHint[]> = Object.fromEntries(
  HINT_SEEDS.map((seed) => [
    seed.key,
    seed.levels.map((lvl, idx) => ({
      id: `${seed.key}-hint-${lvl.level}`,
      level: lvl.level,
      text: lvl.en,
      localizedText: { en: lvl.en, ta: lvl.ta },
      revealAnswer: false,
      cost: 0,
      availableAfterAttempt: 0,
      ...(idx === seed.levels.length - 1 && seed.levels.length === 3
        ? {}
        : {}),
    })),
  ])
);

/** Total authored hint sets. */
export const FEEDBACK_HINT_SET_COUNT = HINT_SEEDS.length;
