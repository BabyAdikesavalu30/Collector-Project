/**
 * Advanced-Level Chemistry Questions (Classes 11–12)
 * Grade-appropriate bilingual questions for chem-a-1 (Organic Chemistry &
 * Hydrocarbons), chem-a-2 (Physical Chemistry & Equilibrium), and
 * chem-a-3 (Inorganic Chemistry & Coordination).
 */

import { QuizQuestion } from './quiz.types';

export const ADVANCED_CHEMISTRY_QUESTIONS: QuizQuestion[] = [
  // ==================== chem-a-1 Organic Chemistry ====================
  {
    id: 'chema-101',
    subjectId: 'chemistry',
    pathwayId: 'chem-a-1',
    difficulty: 'beginner',
    question: {
      en: 'What is the simplest hydrocarbon?',
      ta: 'எளிமையான ஹைட்ரோகார்பன் எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Methane (CH₄)', ta: 'மீத்தேன் (CH₄)' } },
      { id: 'b', label: 'B', text: { en: 'Ethane (C₂H₆)', ta: 'ஈத்தேன் (C₂H₆)' } },
      { id: 'c', label: 'C', text: { en: 'Propane (C₃H₈)', ta: 'புரோப்பேன் (C₃H₈)' } },
      { id: 'd', label: 'D', text: { en: 'Butane (C₄H₁₀)', ta: 'பியூட்டேன் (C₄H₁₀)' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Methane (CH₄) is the simplest hydrocarbon — one carbon atom bonded to four hydrogen atoms. It is the main component of natural gas.',
      ta: 'மீத்தேன் (CH₄) எளிமையான ஹைட்ரோகார்பன் — ஒரு கார்பன் அணு நான்கு ஹைட்ரஜன் அணுக்களுடன் பிணைந்துள்ளது. இயற்கை எரிவாயுவின் முக்கிய அங்கம்.',
    },
    hint: {
      en: 'Natural gas is mostly this compound.',
      ta: 'இயற்கை எரிவாயு பெரும்பாலும் இந்த சேர்மம்.',
    },
  },
  {
    id: 'chema-102',
    subjectId: 'chemistry',
    pathwayId: 'chem-a-1',
    difficulty: 'beginner',
    question: {
      en: 'What is the general formula of alkanes?',
      ta: 'ஆல்கேன்களின் பொது வாய்ப்பாடு எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'CₙH₂ₙ₊₂', ta: 'CₙH₂ₙ₊₂' } },
      { id: 'b', label: 'B', text: { en: 'CₙH₂ₙ', ta: 'CₙH₂ₙ' } },
      { id: 'c', label: 'C', text: { en: 'CₙH₂ₙ₋₂', ta: 'CₙH₂ₙ₋₂' } },
      { id: 'd', label: 'D', text: { en: 'CₙHₙ', ta: 'CₙHₙ' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Alkanes (saturated hydrocarbons) have the general formula CₙH₂ₙ₊₂, e.g., methane CH₄ (n=1).',
      ta: 'ஆல்கேன்களுக்கு (நிறைவுற்ற ஹைட்ரோகார்பன்கள்) பொது வாய்ப்பாடு CₙH₂ₙ₊₂, எ.கா., மீத்தேன் CH₄ (n=1).',
    },
    hint: {
      en: 'Hydrogen count = 2n + 2.',
      ta: 'ஹைட்ரஜன் எண்ணிக்கை = 2n + 2.',
    },
  },
  {
    id: 'chema-103',
    subjectId: 'chemistry',
    pathwayId: 'chem-a-1',
    difficulty: 'intermediate',
    question: {
      en: 'Which functional group is present in alcohols?',
      ta: 'ஆல்கஹால்களில் உள்ள செயல்பாட்டு தொகுதி எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Hydroxyl group (−OH)', ta: 'ஹைட்ராக்சில் தொகுதி (−OH)' } },
      { id: 'b', label: 'B', text: { en: 'Carboxyl group (−COOH)', ta: 'கார்பாக்சில் தொகுதி (−COOH)' } },
      { id: 'c', label: 'C', text: { en: 'Carbonyl group (>C=O)', ta: 'கார்போனைல் தொகுதி (>C=O)' } },
      { id: 'd', label: 'D', text: { en: 'Amino group (−NH₂)', ta: 'அமினோ தொகுதி (−NH₂)' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Alcohols contain the hydroxyl functional group −OH. Example: ethanol (C₂H₅OH).',
      ta: 'ஆல்கஹால்களில் −OH என்ற ஹைட்ராக்சில் செயல்பாட்டு தொகுதி உள்ளது. எ.கா., எத்தனால் (C₂H₅OH).',
    },
    hint: {
      en: 'It ends in "-ol" in IUPAC naming.',
      ta: 'IUPAC பெயரிடலில் "-ol" என முடியும்.',
    },
  },
  {
    id: 'chema-104',
    subjectId: 'chemistry',
    pathwayId: 'chem-a-1',
    difficulty: 'intermediate',
    question: {
      en: 'Isomers are compounds that have the same what but different structure?',
      ta: 'ஐசோமர்கள் ஒரே எதைக் கொண்டு வேறுபட்ட கட்டமைப்பு கொண்ட சேர்மங்கள்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Molecular formula', ta: 'மூலக்கூறு வாய்ப்பாடு' } },
      { id: 'b', label: 'B', text: { en: 'Physical state', ta: 'இயற்பியல் நிலை' } },
      { id: 'c', label: 'C', text: { en: 'Melting point', ta: 'உருகுநிலை' } },
      { id: 'd', label: 'D', text: { en: 'Colour', ta: 'நிறம்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Isomers have the same molecular formula but different structural arrangements, giving different properties. Example: C₄H₁₀ has butane and isobutane.',
      ta: 'ஐசோமர்கள் ஒரே மூலக்கூறு வாய்ப்பாடு கொண்டவை, ஆனால் வெவ்வேறு கட்டமைப்பு அமைப்புகள் கொண்டவை; பண்புகள் வேறுபடும். எ.கா., C₄H₁₀ க்கு பியூட்டேன் மற்றும் ஐசோபியூட்டேன் உண்டு.',
    },
    hint: {
      en: 'Same atoms, different arrangement.',
      ta: 'ஒரே அணுக்கள், வேறு அமைப்பு.',
    },
  },
  {
    id: 'chema-105',
    subjectId: 'chemistry',
    pathwayId: 'chem-a-1',
    difficulty: 'intermediate',
    question: {
      en: 'Ethene (C₂H₄) belongs to which family of hydrocarbons?',
      ta: 'எத்தீன் (C₂H₄) எந்த வகை ஹைட்ரோகார்பன் குடும்பத்தைச் சேர்ந்தது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Alkenes', ta: 'ஆல்க்கீன்கள்' } },
      { id: 'b', label: 'B', text: { en: 'Alkanes', ta: 'ஆல்க்கேன்கள்' } },
      { id: 'c', label: 'C', text: { en: 'Alkynes', ta: 'ஆல்க்கைன்கள்' } },
      { id: 'd', label: 'D', text: { en: 'Aromatic hydrocarbons', ta: 'நறுமண ஹைட்ரோகார்பன்கள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Alkenes are unsaturated hydrocarbons with a carbon–carbon double bond. Ethene (C₂H₄) is the simplest alkene.',
      ta: 'ஆல்க்கீன்கள் கார்பன்–கார்பன் இரட்டைப் பிணைப்பு கொண்ட நிறைவுறா ஹைட்ரோகார்பன்கள். எத்தீன் (C₂H₄) எளிமையான ஆல்க்கீன்.',
    },
    hint: {
      en: 'It has a double bond and names end in "-ene".',
      ta: 'இதில் இரட்டைப் பிணைப்பு உள்ளது; பெயர்கள் "-ene" என முடியும்.',
    },
  },
  {
    id: 'chema-106',
    subjectId: 'chemistry',
    pathwayId: 'chem-a-1',
    difficulty: 'advanced',
    question: {
      en: 'What is the molecular formula of benzene?',
      ta: 'பென்சீனின் மூலக்கூறு வாய்ப்பாடு என்ன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'C₆H₆', ta: 'C₆H₆' } },
      { id: 'b', label: 'B', text: { en: 'C₆H₁₂', ta: 'C₆H₁₂' } },
      { id: 'c', label: 'C', text: { en: 'C₆H₁₄', ta: 'C₆H₁₄' } },
      { id: 'd', label: 'D', text: { en: 'C₇H₈', ta: 'C₇H₈' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Benzene has the molecular formula C₆H₆ with a ring of six carbon atoms and delocalised electrons — the simplest aromatic hydrocarbon.',
      ta: 'பென்சீனின் மூலக்கூறு வாய்ப்பாடு C₆H₆; ஆறு கார்பன் அணுக்களின் வளையமும் தனித்த பகிர்வு எலக்ட்ரான்களும் கொண்டது — எளிமையான நறுமண ஹைட்ரோகார்பன்.',
    },
    hint: {
      en: 'A ring-shaped structure, often drawn as a hexagon.',
      ta: 'வளைய வடிவ அமைப்பு; பொதுவாக அறுகோணமாக வரையப்படும்.',
    },
  },
  {
    id: 'chema-107',
    subjectId: 'chemistry',
    pathwayId: 'chem-a-1',
    difficulty: 'advanced',
    question: {
      en: 'Complete combustion of methane (CH₄) in excess oxygen produces what?',
      ta: 'அதிக ஆக்ஸிஜனில் மீத்தேன் (CH₄) முழுமையாக எரிவதால் என்ன உருவாகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Carbon dioxide and water', ta: 'கார்பன் டை ஆக்சைடு மற்றும் நீர்' } },
      { id: 'b', label: 'B', text: { en: 'Carbon monoxide and water', ta: 'கார்பன் மோனாக்சைடு மற்றும் நீர்' } },
      { id: 'c', label: 'C', text: { en: 'Carbon and hydrogen', ta: 'கார்பன் மற்றும் ஹைட்ரஜன்' } },
      { id: 'd', label: 'D', text: { en: 'Methanol only', ta: 'மெத்தனால் மட்டும்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'CH₄ + 2O₂ → CO₂ + 2H₂O. Complete combustion of hydrocarbons gives carbon dioxide and water.',
      ta: 'CH₄ + 2O₂ → CO₂ + 2H₂O. ஹைட்ரோகார்பன்கள் முழுமையாக எரியும்போது கார்பன் டை ஆக்சைடும் நீரும் உருவாகின்றன.',
    },
    hint: {
      en: 'Two familiar products of burning.',
      ta: 'எரிதலின் இரண்டு பரிச்சயமான விளைபொருட்கள்.',
    },
  },
  {
    id: 'chema-108',
    subjectId: 'chemistry',
    pathwayId: 'chem-a-1',
    difficulty: 'advanced',
    question: {
      en: 'Addition reactions (like hydrogenation) are characteristic of which compounds?',
      ta: 'சேர்ப்பு வினைகள் (ஹைட்ரஜனேற்றம் போன்றவை) எந்த சேர்மங்களின் சிறப்பியல்பு?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Unsaturated hydrocarbons (alkenes and alkynes)', ta: 'நிறைவுறா ஹைட்ரோகார்பன்கள் (ஆல்க்கீன்கள் மற்றும் ஆல்க்கைன்கள்)' } },
      { id: 'b', label: 'B', text: { en: 'Saturated alkanes', ta: 'நிறைவுற்ற ஆல்க்கேன்கள்' } },
      { id: 'c', label: 'C', text: { en: 'Noble gases', ta: 'அரிய வாயுக்கள்' } },
      { id: 'd', label: 'D', text: { en: 'Alkali metals', ta: 'கார உலோகங்கள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'The double/triple bonds in unsaturated hydrocarbons can break to add more atoms — e.g., hydrogenation of vegetable oils.',
      ta: 'நிறைவுறா ஹைட்ரோகார்பன்களின் இரட்டை/மூன்று பிணைப்புகள் உடைந்து கூடுதல் அணுக்களை சேர்க்கலாம் — எ.கா., காய்கறி எண்ணெய் ஹைட்ரஜனேற்றம்.',
    },
    hint: {
      en: 'These compounds contain multiple bonds.',
      ta: 'இந்த சேர்மங்களில் பல பிணைப்புகள் உள்ளன.',
    },
  },

  // ==================== chem-a-2 Physical Chemistry ====================
  {
    id: 'chema-201',
    subjectId: 'chemistry',
    pathwayId: 'chem-a-2',
    difficulty: 'beginner',
    question: {
      en: 'The mole is the SI unit of which quantity?',
      ta: 'மோல் எந்த அளவின் SI அலகு?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Amount of substance', ta: 'பொருளின் அளவு' } },
      { id: 'b', label: 'B', text: { en: 'Mass', ta: 'நிறை' } },
      { id: 'c', label: 'C', text: { en: 'Volume', ta: 'கன அளவு' } },
      { id: 'd', label: 'D', text: { en: 'Temperature', ta: 'வெப்பநிலை' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'The mole (mol) is the SI unit for the amount of substance — it counts particles (6.022 × 10²³ per mole).',
      ta: 'மோல் (mol) என்பது பொருளின் அளவிற்கான SI அலகு — இது துகள்களை எண்ணுகிறது (ஒரு மோலுக்கு 6.022 × 10²³).',
    },
    hint: {
      en: 'One mole contains Avogadro\'s number of particles.',
      ta: 'ஒரு மோலில் அவகாட்ரோ எண்ணிக்கையிலான துகள்கள் உள்ளன.',
    },
  },
  {
    id: 'chema-202',
    subjectId: 'chemistry',
    pathwayId: 'chem-a-2',
    difficulty: 'beginner',
    question: {
      en: 'Avogadro\'s number is approximately what value?',
      ta: 'அவகாட்ரோ எண் தோராயமாக எந்த மதிப்பு?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: '6.022 × 10²³', ta: '6.022 × 10²³' } },
      { id: 'b', label: 'B', text: { en: '3.14 × 10²', ta: '3.14 × 10²' } },
      { id: 'c', label: 'C', text: { en: '1.6 × 10⁻¹⁹', ta: '1.6 × 10⁻¹⁹' } },
      { id: 'd', label: 'D', text: { en: '9.8 × 10²', ta: '9.8 × 10²' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Avogadro\'s number is 6.022 × 10²³ — the number of particles in one mole of any substance.',
      ta: 'அவகாட்ரோ எண் 6.022 × 10²³ — எந்த ஒரு பொருளின் ஒரு மோலில் உள்ள துகள்களின் எண்ணிக்கை.',
    },
    hint: {
      en: 'It is a very large number starting with 6.022.',
      ta: '6.022 உடன் தொடங்கும் மிகப்பெரிய எண்.',
    },
  },
  {
    id: 'chema-203',
    subjectId: 'chemistry',
    pathwayId: 'chem-a-2',
    difficulty: 'intermediate',
    question: {
      en: 'A solution with pH less than 7 is what kind?',
      ta: '7-க்கும் குறைவான pH கொண்ட கரைசல் எந்த வகை?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Acidic', ta: 'அமிலத்தன்மை' } },
      { id: 'b', label: 'B', text: { en: 'Basic', ta: 'காரத்தன்மை' } },
      { id: 'c', label: 'C', text: { en: 'Neutral', ta: 'நடுநிலை' } },
      { id: 'd', label: 'D', text: { en: 'Non-electrolyte', ta: 'மின்பகுளியற்றது' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'pH < 7 is acidic, pH = 7 is neutral, and pH > 7 is basic. The scale is logarithmic — each unit is a 10× change in H⁺ concentration.',
      ta: 'pH < 7 அமிலத்தன்மை, pH = 7 நடுநிலை, pH > 7 காரத்தன்மை. இந்த அளவீடு மடக்கைத்தனமானது — ஒவ்வொரு அலகும் H⁺ செறிவில் 10× மாற்றம்.',
    },
    hint: {
      en: 'Lower pH means more H⁺ ions.',
      ta: 'குறைந்த pH = அதிக H⁺ அயனிகள்.',
    },
  },
  {
    id: 'chema-204',
    subjectId: 'chemistry',
    pathwayId: 'chem-a-2',
    difficulty: 'intermediate',
    question: {
      en: 'The rate of a chemical reaction generally increases with which of these?',
      ta: 'வேதியியல் வினையின் வீதம் பொதுவாக இவற்றில் எதனால் அதிகரிக்கிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Higher temperature and higher concentration', ta: 'அதிக வெப்பநிலை மற்றும் அதிக செறிவு' } },
      { id: 'b', label: 'B', text: { en: 'Lower temperature', ta: 'குறைந்த வெப்பநிலை' } },
      { id: 'c', label: 'C', text: { en: 'Lower concentration', ta: 'குறைந்த செறிவு' } },
      { id: 'd', label: 'D', text: { en: 'Adding an inhibitor', ta: 'தடுப்பானைச் சேர்ப்பது' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Higher temperature increases molecular kinetic energy and collision frequency; higher concentration means more reactant particles per volume — both speed up reactions.',
      ta: 'அதிக வெப்பநிலை மூலக்கூறு இயக்க ஆற்றலையும் மோதல் வீதத்தையும் அதிகரிக்கிறது; அதிக செறிவு ஒரு அலகு கன அளவில் அதிக வினைத்துகள்கள் — இரண்டும் வினையை வேகப்படுத்துகின்றன.',
    },
    hint: {
      en: 'Think about cooking faster at higher flame.',
      ta: 'அதிக தீயில் சமையல் வேகமாக ஆவதை நினைக்கவும்.',
    },
  },
  {
    id: 'chema-205',
    subjectId: 'chemistry',
    pathwayId: 'chem-a-2',
    difficulty: 'intermediate',
    question: {
      en: 'The equilibrium constant of a reaction is denoted by which symbol?',
      ta: 'ஒரு வினையின் சமநிலை மாறிலி எந்த குறியீட்டால் குறிக்கப்படுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'K', ta: 'K' } },
      { id: 'b', label: 'B', text: { en: 'Q', ta: 'Q' } },
      { id: 'c', label: 'C', text: { en: 'G', ta: 'G' } },
      { id: 'd', label: 'D', text: { en: 'H', ta: 'H' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'The equilibrium constant K expresses the ratio of product concentrations to reactant concentrations at equilibrium.',
      ta: 'சமநிலை மாறிலி K, சமநிலையில் விளைபொருள் செறிவுகளுக்கும் வினைப்பொருள் செறிவுகளுக்கும் உள்ள விகிதத்தை வெளிப்படுத்துகிறது.',
    },
    hint: {
      en: 'Capital letter often written with "eq" subscript.',
      ta: 'பெரிய எழுத்து; "eq" என கீழ்க்குறியுடன் எழுதப்படும்.',
    },
  },
  {
    id: 'chema-206',
    subjectId: 'chemistry',
    pathwayId: 'chem-a-2',
    difficulty: 'advanced',
    question: {
      en: 'Enthalpy of a reaction is the heat change measured at constant what?',
      ta: 'வினையின் என்தால்பி என்பது எதை மாறா நிலையில் அளக்கப்படும் வெப்ப மாற்றம்?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Pressure', ta: 'அழுத்தம்' } },
      { id: 'b', label: 'B', text: { en: 'Volume', ta: 'கன அளவு' } },
      { id: 'c', label: 'C', text: { en: 'Temperature', ta: 'வெப்பநிலை' } },
      { id: 'd', label: 'D', text: { en: 'Concentration', ta: 'செறிவு' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Enthalpy (H) is defined at constant pressure; ΔH is the heat absorbed or released at constant pressure. At constant volume it is internal energy change (ΔU).',
      ta: 'என்தால்பி (H) நிலையான அழுத்தத்தில் வரையறுக்கப்படுகிறது; ΔH என்பது நிலையான அழுத்தத்தில் உறிஞ்சப்பட்ட அல்லது வெளியிடப்பட்ட வெப்பம். நிலையான கன அளவில் இது உள் ஆற்றல் மாற்றம் (ΔU).',
    },
    hint: {
      en: 'Think of open-beaker reactions at atmospheric pressure.',
      ta: 'வளிமண்டல அழுத்தத்தில் திறந்த பாத்திர வினைகளை நினைக்கவும்.',
    },
  },
  {
    id: 'chema-207',
    subjectId: 'chemistry',
    pathwayId: 'chem-a-2',
    difficulty: 'advanced',
    question: {
      en: 'How does a catalyst speed up a chemical reaction?',
      ta: 'வேதியியல் வினையை வினையூக்கி எவ்வாறு வேகப்படுத்துகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'It lowers the activation energy', ta: 'இது செயல்வினை ஆற்றலைக் குறைக்கிறது' } },
      { id: 'b', label: 'B', text: { en: 'It increases the product amount', ta: 'இது விளைபொருள் அளவை அதிகரிக்கிறது' } },
      { id: 'c', label: 'C', text: { en: 'It is consumed in the reaction', ta: 'இது வினையில் செலவழிக்கப்படுகிறது' } },
      { id: 'd', label: 'D', text: { en: 'It changes the equilibrium position', ta: 'இது சமநிலை நிலையை மாற்றுகிறது' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'A catalyst provides an alternative pathway with lower activation energy. It is not consumed and does not change the equilibrium position.',
      ta: 'வினையூக்கி குறைந்த செயல்வினை ஆற்றல் கொண்ட மாற்று பாதையை வழங்குகிறது. இது செலவழிக்கப்படுவதில்லை; சமநிலை நிலையை மாற்றாது.',
    },
    hint: {
      en: 'It is unchanged after the reaction.',
      ta: 'வினைக்குப் பின் இது மாறாமல் இருக்கும்.',
    },
  },
  {
    id: 'chema-208',
    subjectId: 'chemistry',
    pathwayId: 'chem-a-2',
    difficulty: 'advanced',
    question: {
      en: 'Le Chatelier\'s principle states that a system at equilibrium will do what when disturbed?',
      ta: 'சமநிலையில் உள்ள அமைப்பு தொந்தரவு செய்யப்படும்போது அது என்ன செய்யும் என்று லெ சாட்டிலியர் கொள்கை கூறுகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Shift to oppose the change and restore equilibrium', ta: 'மாற்றத்தை எதிர்த்து சமநிலையை மீட்டெடுக்க நகரும்' } },
      { id: 'b', label: 'B', text: { en: 'Stop reacting completely', ta: 'முற்றிலும் வினைபுரிவதை நிறுத்தும்' } },
      { id: 'c', label: 'C', text: { en: 'Double its volume', ta: 'தன் கன அளவை இரட்டிப்பாக்கும்' } },
      { id: 'd', label: 'D', text: { en: 'Produce more of the change', ta: 'மாற்றத்தை அதிகரிக்கும்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Le Chatelier\'s principle: when a system at equilibrium is disturbed (by changing concentration, pressure, or temperature), it shifts in the direction that opposes the change.',
      ta: 'லெ சாட்டிலியர் கொள்கை: சமநிலை அமைப்பு தொந்தரவு செய்யப்படும்போது (செறிவு, அழுத்தம், வெப்பநிலை மாற்றம்), அது மாற்றத்தை எதிர்க்கும் திசையில் நகர்கிறது.',
    },
    hint: {
      en: 'Equilibrium "pushes back" against stress.',
      ta: 'சமநிலை அழுத்தத்திற்கு "எதிர் தள்ளுகிறது".',
    },
  },

  // ==================== chem-a-3 Inorganic Chemistry ====================
  {
    id: 'chema-301',
    subjectId: 'chemistry',
    pathwayId: 'chem-a-3',
    difficulty: 'beginner',
    question: {
      en: 'Transition metals like iron and copper are found in which block of the periodic table?',
      ta: 'இரும்பு, செம்பு போன்ற மாறுநிலை உலோகங்கள் தனிம வரிசை அட்டவணையின் எந்த பகுதியில் உள்ளன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'd-block', ta: 'd-பகுதி' } },
      { id: 'b', label: 'B', text: { en: 's-block', ta: 's-பகுதி' } },
      { id: 'c', label: 'C', text: { en: 'p-block', ta: 'p-பகுதி' } },
      { id: 'd', label: 'D', text: { en: 'f-block', ta: 'f-பகுதி' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Transition metals are the d-block elements (groups 3–12) whose d orbitals are being filled.',
      ta: 'மாறுநிலை உலோகங்கள் d-பகுதி தனிமங்கள் (குழு 3–12); இவற்றில் d ஆர்பிட்டால்கள் நிரப்பப்படுகின்றன.',
    },
    hint: {
      en: 'The middle block of the periodic table.',
      ta: 'தனிம வரிசை அட்டவணையின் நடுப்பகுதி.',
    },
  },
  {
    id: 'chema-302',
    subjectId: 'chemistry',
    pathwayId: 'chem-a-3',
    difficulty: 'beginner',
    question: {
      en: 'Copper sulphate solution has which characteristic colour?',
      ta: 'செப்பு சல்பேட் கரைசலின் சிறப்பியல்பு நிறம் எது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Blue', ta: 'நீலம்' } },
      { id: 'b', label: 'B', text: { en: 'Green', ta: 'பச்சை' } },
      { id: 'c', label: 'C', text: { en: 'Red', ta: 'சிவப்பு' } },
      { id: 'd', label: 'D', text: { en: 'Colourless', ta: 'நிறமற்றது' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Aqueous copper sulphate is blue due to the hydrated Cu²⁺ ion. On heating, it loses water and turns white (anhydrous).',
      ta: 'நீரிய செப்பு சல்பேட் நீலம் — நீரேற்றப்பட்ட Cu²⁺ அயனியால். சூடாக்கும்போது நீரை இழந்து வெண்மையாகிறது (நீரற்றது).',
    },
    hint: {
      en: 'The colour of the classic copper salt solution.',
      ta: 'பாரம்பரிய செப்பு உப்பு கரைசலின் நிறம்.',
    },
  },
  {
    id: 'chema-303',
    subjectId: 'chemistry',
    pathwayId: 'chem-a-3',
    difficulty: 'intermediate',
    question: {
      en: 'A coordination compound consists of a central metal ion surrounded by what?',
      ta: 'ஒரு ஒருங்கிணைவு சேர்மம் மைய உலோக அயனியையும் அதைச் சூழ்ந்த எதையும் கொண்டது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Ligands', ta: 'லிகண்டுகள்' } },
      { id: 'b', label: 'B', text: { en: 'Protons', ta: 'புரோட்டான்கள்' } },
      { id: 'c', label: 'C', text: { en: 'Noble gas atoms', ta: 'அரிய வாயு அணுக்கள்' } },
      { id: 'd', label: 'D', text: { en: 'Water molecules only', ta: 'நீர் மூலக்கூறுகள் மட்டும்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'In coordination compounds, a central metal ion is surrounded by ligands (ions or molecules) that donate electron pairs, e.g., [Fe(CN)₆]⁴⁻.',
      ta: 'ஒருங்கிணைவு சேர்மங்களில் மைய உலோக அயனியை எலக்ட்ரான் இணைகளை வழங்கும் லிகண்டுகள் (அயனிகள் அல்லது மூலக்கூறுகள்) சூழ்ந்துள்ளன, எ.கா., [Fe(CN)₆]⁴⁻.',
    },
    hint: {
      en: 'They are the "arms" grabbing the metal ion.',
      ta: 'உலோக அயனியைப் பிடிக்கும் "கைகள்".',
    },
  },
  {
    id: 'chema-304',
    subjectId: 'chemistry',
    pathwayId: 'chem-a-3',
    difficulty: 'intermediate',
    question: {
      en: 'What is the oxidation state of iron in Fe₂O₃?',
      ta: 'Fe₂O₃-இல் இரும்பின் ஆக்சிஜனேற்ற நிலை என்ன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: '+3', ta: '+3' } },
      { id: 'b', label: 'B', text: { en: '+2', ta: '+2' } },
      { id: 'c', label: 'C', text: { en: '0', ta: '0' } },
      { id: 'd', label: 'D', text: { en: '+6', ta: '+6' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Oxygen is −2; with 3 oxygens (−6 total), two irons must sum to +6, so each iron is +3.',
      ta: 'ஆக்ஸிஜன் −2; 3 ஆக்ஸிஜன்களுடன் (மொத்தம் −6), இரண்டு இரும்புகளின் கூட்டு +6 ஆக இருக்க வேண்டும், எனவே ஒவ்வொரு இரும்பும் +3.',
    },
    hint: {
      en: 'Let x be the iron\'s oxidation state: 2x + 3(−2) = 0.',
      ta: 'இரும்பின் ஆக்சிஜனேற்ற நிலையை x என்க: 2x + 3(−2) = 0.',
    },
  },
  {
    id: 'chema-305',
    subjectId: 'chemistry',
    pathwayId: 'chem-a-3',
    difficulty: 'intermediate',
    question: {
      en: 'An ionic bond is typically formed between which types of elements?',
      ta: 'அயனிப் பிணைப்பு பொதுவாக எந்த வகை தனிமங்களுக்கு இடையே உருவாகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'A metal and a non-metal', ta: 'உலோகமும் உலோகமல்லாததும்' } },
      { id: 'b', label: 'B', text: { en: 'Two non-metals', ta: 'இரண்டு உலோகமல்லாதவை' } },
      { id: 'c', label: 'C', text: { en: 'Two metals', ta: 'இரண்டு உலோகங்கள்' } },
      { id: 'd', label: 'D', text: { en: 'Two noble gases', ta: 'இரண்டு அரிய வாயுக்கள்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'An ionic bond forms when a metal transfers electrons to a non-metal, creating oppositely charged ions, e.g., NaCl.',
      ta: 'உலோகம் எலக்ட்ரான்களை உலோகமல்லாததற்கு மாற்றும்போது அயனிப் பிணைப்பு உருவாகிறது; எதிரெதிர் மின்னூட்ட அயனிகள் உருவாகும், எ.கா., NaCl.',
    },
    hint: {
      en: 'Complete transfer of electrons — think of table salt.',
      ta: 'முழுமையான எலக்ட்ரான் மாற்றம் — சமையல் உப்பை நினைக்கவும்.',
    },
  },
  {
    id: 'chema-306',
    subjectId: 'chemistry',
    pathwayId: 'chem-a-3',
    difficulty: 'advanced',
    question: {
      en: 'd-block elements commonly show which special property?',
      ta: 'd-பகுதி தனிமங்கள் பொதுவாக எந்த சிறப்பு பண்பை வெளிப்படுத்துகின்றன?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Variable oxidation states', ta: 'மாறுபடும் ஆக்சிஜனேற்ற நிலைகள்' } },
      { id: 'b', label: 'B', text: { en: 'Always colourless compounds', ta: 'எப்போதும் நிறமற்ற சேர்மங்கள்' } },
      { id: 'c', label: 'C', text: { en: 'Only one oxidation state', ta: 'ஒரே ஆக்சிஜனேற்ற நிலை' } },
      { id: 'd', label: 'D', text: { en: 'Being gases at room temperature', ta: 'அறை வெப்பநிலையில் வாயுக்களாக இருத்தல்' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Because d-orbitals participate, transition metals show variable oxidation states (e.g., Fe²⁺ and Fe³⁺) and form coloured compounds.',
      ta: 'd-ஆர்பிட்டால்கள் பங்கேற்பதால் மாறுநிலை உலோகங்கள் மாறுபடும் ஆக்சிஜனேற்ற நிலைகளை (எ.கா., Fe²⁺ மற்றும் Fe³⁺) காட்டுகின்றன; வண்ண சேர்மங்களை உருவாக்குகின்றன.',
    },
    hint: {
      en: 'Iron exists as both Fe²⁺ and Fe³⁺.',
      ta: 'இரும்பு Fe²⁺ மற்றும் Fe³⁺ என இரண்டாக உள்ளது.',
    },
  },
  {
    id: 'chema-307',
    subjectId: 'chemistry',
    pathwayId: 'chem-a-3',
    difficulty: 'advanced',
    question: {
      en: 'In crystal field theory, a strong ligand like CN⁻ causes what?',
      ta: 'படிகப்புலக் கோட்பாட்டில் CN⁻ போன்ற வலுவான லிகண்டு எதை ஏற்படுத்துகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'A large crystal field splitting', ta: 'பெரிய படிகப்புலப் பிளவு' } },
      { id: 'b', label: 'B', text: { en: 'No splitting at all', ta: 'எந்த பிளவும் இல்லை' } },
      { id: 'c', label: 'C', text: { en: 'A small splitting', ta: 'சிறிய பிளவு' } },
      { id: 'd', label: 'D', text: { en: 'The complex becomes colourless', ta: 'சிக்கலான சேர்மம் நிறமற்றதாகிறது' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Strong-field ligands (CN⁻, CO) cause large crystal field splitting (Δ₀), which generally gives low-spin complexes.',
      ta: 'வலுவான புல லிகண்டுகள் (CN⁻, CO) பெரிய படிகப்புலப் பிளவை (Δ₀) ஏற்படுத்துகின்றன; பொதுவாக குறைந்த-சுழல் சிக்கலான சேர்மங்களை அளிக்கின்றன.',
    },
    hint: {
      en: 'The spectrochemical series orders ligands from weak to strong.',
      ta: 'ஸ்பெக்ட்ரோகெமிக்கல் தொடர் லிகண்டுகளை வலுவற்றது முதல் வலுவானது வரை வரிசைப்படுத்துகிறது.',
    },
  },
  {
    id: 'chema-308',
    subjectId: 'chemistry',
    pathwayId: 'chem-a-3',
    difficulty: 'advanced',
    question: {
      en: 'The "inert pair effect" explains why heavier p-block elements (like Pb, Bi) show what?',
      ta: '"மந்த இணை விளைவு" கனமான p-பகுதி தனிமங்கள் (Pb, Bi போன்றவை) எதைக் காட்டுவதை விளக்குகிறது?',
    },
    options: [
      { id: 'a', label: 'A', text: { en: 'Their lower oxidation state is more stable', ta: 'அவற்றின் குறைந்த ஆக்சிஜனேற்ற நிலை அதிக நிலைத்தன்மை கொண்டது' } },
      { id: 'b', label: 'B', text: { en: 'They are always gases', ta: 'அவை எப்போதும் வாயுக்கள்' } },
      { id: 'c', label: 'C', text: { en: 'They have no oxidation states', ta: 'அவற்றுக்கு ஆக்சிஜனேற்ற நிலைகள் இல்லை' } },
      { id: 'd', label: 'D', text: { en: 'They dissolve in water', ta: 'அவை தண்ணீரில் கரைகின்றன' } },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'The inert pair effect makes the ns² electrons less available for bonding in heavier p-block elements, so lower oxidation states (e.g., Pb²⁺, Bi³⁺) become more stable than higher ones.',
      ta: 'மந்த இணை விளைவு கனமான p-பகுதி தனிமங்களில் ns² எலக்ட்ரான்களை பிணைப்பிற்கு குறைவாக கிடைக்கச் செய்கிறது; எனவே குறைந்த ஆக்சிஜனேற்ற நிலைகள் (Pb²⁺, Bi³⁺) அதிக நிலைத்தன்மை பெறுகின்றன.',
    },
    hint: {
      en: 'Think of lead\'s stable +2 state versus +4.',
      ta: 'ஈயத்தின் நிலைத்த +2 நிலையையும் +4 உடன் ஒப்பிடுக.',
    },
  },
];