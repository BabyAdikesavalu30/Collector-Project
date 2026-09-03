import { DnaSequenceLevel } from './dna-sequence.types';

export const DNA_SEQUENCE_LEVELS: DnaSequenceLevel[] = [
  {
    id: 'dna-01',
    name: 'Level 1: Basic Complement (A-T, C-G)',
    templateStrand: ['A', 'T', 'C', 'G'],
    mode: 'dna-pair',
    description: {
      en: 'Pair each DNA base with its complementary partner: A ↔ T, C ↔ G.',
      ta: 'டி.என்.ஏ கார இணைகளை சரியாக பொருத்தவும்: A ↔ T, C ↔ G.',
    },
  },
  {
    id: 'dna-02',
    name: 'Level 2: 6-Base Helix Segment',
    templateStrand: ['T', 'A', 'G', 'C', 'A', 'T'],
    mode: 'dna-pair',
    description: {
      en: 'Synthesize the complementary double-helix strand.',
      ta: 'இரட்டை சுருள் அமைப்பின் இணை காரங்களை உருவாக்கவும்.',
    },
  },
  {
    id: 'dna-03',
    name: 'Level 3: RNA Transcription (A → U)',
    templateStrand: ['T', 'A', 'C', 'G', 'G', 'T'],
    mode: 'rna-transcribe',
    description: {
      en: 'In RNA transcription, Adenine pairs with Uracil (U) instead of Thymine.',
      ta: 'ஆர்.என்.ஏ உருவாக்கத்தில் அடினைன் யுராசில் (U) உடன் இணைகிறது.',
    },
  },
  {
    id: 'dna-04',
    name: 'Level 4: Start Codon Primer (AUG)',
    templateStrand: ['T', 'A', 'C', 'A', 'A', 'A'],
    mode: 'rna-transcribe',
    targetProtein: { en: 'Methionine (Start)', ta: 'மெத்தியோனைன் (தொடக்க குறியீடு)' },
    description: {
      en: 'Transcribe TAC template into AUG (the universal Start Codon).',
      ta: 'TAC வார்ப்புருவை AUG தொடக்க குறியீடாக மாற்றவும்.',
    },
  },
  {
    id: 'dna-05',
    name: 'Level 5: 8-Base DNA Repair',
    templateStrand: ['G', 'C', 'A', 'T', 'C', 'G', 'A', 'T'],
    mode: 'dna-pair',
    description: {
      en: 'Repair damaged replication fork with complementary DNA polymerase.',
      ta: 'டி.என்.ஏ பாலிமரேஸ் மூலம் சேதமடைந்த காரங்களை நிரப்பவும்.',
    },
  },
  {
    id: 'dna-06',
    name: 'Level 6: Hemoglobin Genetic Code',
    templateStrand: ['C', 'A', 'C', 'T', 'G', 'A', 'C', 'T'],
    mode: 'dna-pair',
    targetProtein: { en: 'Beta-Globin', ta: 'ஹீமோகுளோபின் சங்கிலி' },
    description: {
      en: 'Sequence the human hemoglobin oxygen-carrier gene segment.',
      ta: 'ஹீமோகுளோபின் மரபணு வரிசையை நிறைவுசெய்க.',
    },
  },
  {
    id: 'dna-07',
    name: 'Level 7: mRNA Stop Codon (UAA)',
    templateStrand: ['A', 'T', 'T', 'C', 'G', 'C'],
    mode: 'rna-transcribe',
    targetProtein: { en: 'Ochre (Stop)', ta: 'நிறைவு குறியீடு (Stop)' },
    description: {
      en: 'ATT template transcribes into the UAA Stop Codon signaling translation end.',
      ta: 'ATT என்பது UAA நிறைவு குறியீடாக மாற்றப்படுகிறது.',
    },
  },
  {
    id: 'dna-08',
    name: 'Level 8: 9-Base Triplet Repeat',
    templateStrand: ['C', 'A', 'G', 'C', 'A', 'G', 'C', 'A', 'G'],
    mode: 'dna-pair',
    description: {
      en: 'Match the triplet codon repeat sequence accurately.',
      ta: 'மூன்று காரங்களின் தொடர் வரிசையை துல்லியமாக இணைக்கவும்.',
    },
  },
  {
    id: 'dna-09',
    name: 'Level 9: Insulin Gene Sequence',
    templateStrand: ['T', 'G', 'C', 'C', 'A', 'A', 'T', 'G', 'C'],
    mode: 'rna-transcribe',
    targetProtein: { en: 'Insulin Peptide', ta: 'இன்சுலின் பெப்டைட்' },
    description: {
      en: 'Transcribe the insulin hormone coding messenger RNA.',
      ta: 'இன்சுலின் ஹார்மோன் உற்பத்திக்கான mRNA வரிசையை எழுதுக.',
    },
  },
  {
    id: 'dna-10',
    name: 'Level 10: Grand Genetic Master Strand',
    templateStrand: ['A', 'T', 'G', 'C', 'G', 'A', 'T', 'C', 'T', 'A'],
    mode: 'dna-pair',
    targetProtein: { en: 'Master Genome', ta: 'முதன்மை மரபணு' },
    description: {
      en: 'Complete 10-base master DNA genetic sequence with 100% fidelity.',
      ta: '10-காரங்கள் கொண்ட முழுமையான மரபணு சங்கிலியை உருவாக்கவும்.',
    },
  },
];
