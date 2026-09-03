import { ElementMatchLevel } from './element-match.types';

export const ELEMENT_MATCH_LEVELS: ElementMatchLevel[] = [
  {
    id: 'elem-01',
    name: 'Level 1: Essential Gases',
    elements: [
      { id: 'H', symbol: 'H', name: { en: 'Hydrogen', ta: 'ஹைட்ரஜன்' }, atomicNumber: 1, category: 'nonmetal', color: '#3B82F6' },
      { id: 'He', symbol: 'He', name: { en: 'Helium', ta: 'ஹீலியம்' }, atomicNumber: 2, category: 'noble', color: '#8B5CF6' },
      { id: 'O', symbol: 'O', name: { en: 'Oxygen', ta: 'ஆக்சிஜன்' }, atomicNumber: 8, category: 'nonmetal', color: '#06B6D4' },
      { id: 'N', symbol: 'N', name: { en: 'Nitrogen', ta: 'நைட்ரஜன்' }, atomicNumber: 7, category: 'nonmetal', color: '#10B981' },
    ],
  },
  {
    id: 'elem-02',
    name: 'Level 2: Common Metals',
    elements: [
      { id: 'Fe', symbol: 'Fe', name: { en: 'Iron', ta: 'இரும்பு' }, atomicNumber: 26, category: 'transition', color: '#64748B' },
      { id: 'Cu', symbol: 'Cu', name: { en: 'Copper', ta: 'செம்பு' }, atomicNumber: 29, category: 'transition', color: '#D97706' },
      { id: 'Au', symbol: 'Au', name: { en: 'Gold', ta: 'தங்கம்' }, atomicNumber: 79, category: 'transition', color: '#EAB308' },
      { id: 'Ag', symbol: 'Ag', name: { en: 'Silver', ta: 'வெள்ளி' }, atomicNumber: 47, category: 'transition', color: '#94A3B8' },
    ],
  },
  {
    id: 'elem-03',
    name: 'Level 3: Alkali Metals',
    elements: [
      { id: 'Li', symbol: 'Li', name: { en: 'Lithium', ta: 'லித்தியம்' }, atomicNumber: 3, category: 'alkali', color: '#EC4899' },
      { id: 'Na', symbol: 'Na', name: { en: 'Sodium', ta: 'சோடியம்' }, atomicNumber: 11, category: 'alkali', color: '#F97316' },
      { id: 'K', symbol: 'K', name: { en: 'Potassium', ta: 'பொட்டாசியம்' }, atomicNumber: 19, category: 'alkali', color: '#A855F7' },
      { id: 'Rb', symbol: 'Rb', name: { en: 'Rubidium', ta: 'ரூபிடியம்' }, atomicNumber: 37, category: 'alkali', color: '#E11D48' },
    ],
  },
  {
    id: 'elem-04',
    name: 'Level 4: Halogens',
    elements: [
      { id: 'F', symbol: 'F', name: { en: 'Fluorine', ta: 'புளூரின்' }, atomicNumber: 9, category: 'halogen', color: '#10B981' },
      { id: 'Cl', symbol: 'Cl', name: { en: 'Chlorine', ta: 'குளோரின்' }, atomicNumber: 17, category: 'halogen', color: '#84CC16' },
      { id: 'Br', symbol: 'Br', name: { en: 'Bromine', ta: 'புரோமின்' }, atomicNumber: 35, category: 'halogen', color: '#B45309' },
      { id: 'I', symbol: 'I', name: { en: 'Iodine', ta: 'அயோடின்' }, atomicNumber: 53, category: 'halogen', color: '#7C3AED' },
    ],
  },
  {
    id: 'elem-05',
    name: 'Level 5: Noble Gases',
    elements: [
      { id: 'Ne', symbol: 'Ne', name: { en: 'Neon', ta: 'நியான்' }, atomicNumber: 10, category: 'noble', color: '#F43F5E' },
      { id: 'Ar', symbol: 'Ar', name: { en: 'Argon', ta: 'ஆர்கான்' }, atomicNumber: 18, category: 'noble', color: '#6366F1' },
      { id: 'Kr', symbol: 'Kr', name: { en: 'Krypton', ta: 'கிரிப்டான்' }, atomicNumber: 36, category: 'noble', color: '#14B8A6' },
      { id: 'Xe', symbol: 'Xe', name: { en: 'Xenon', ta: 'செனான்' }, atomicNumber: 54, category: 'noble', color: '#3B82F6' },
    ],
  },
  {
    id: 'elem-06',
    name: 'Level 6: Alkaline Earth',
    elements: [
      { id: 'Mg', symbol: 'Mg', name: { en: 'Magnesium', ta: 'மெக்னீசியம்' }, atomicNumber: 12, category: 'earth', color: '#059669' },
      { id: 'Ca', symbol: 'Ca', name: { en: 'Calcium', ta: 'கால்சியம்' }, atomicNumber: 20, category: 'earth', color: '#2563EB' },
      { id: 'Ba', symbol: 'Ba', name: { en: 'Barium', ta: 'பேரியம்' }, atomicNumber: 56, category: 'earth', color: '#D97706' },
      { id: 'Ra', symbol: 'Ra', name: { en: 'Radium', ta: 'ரேடியம்' }, atomicNumber: 88, category: 'earth', color: '#DC2626' },
    ],
  },
  {
    id: 'elem-07',
    name: 'Level 7: Carbon Group',
    elements: [
      { id: 'C', symbol: 'C', name: { en: 'Carbon', ta: 'கார்பன்' }, atomicNumber: 6, category: 'nonmetal', color: '#334155' },
      { id: 'Si', symbol: 'Si', name: { en: 'Silicon', ta: 'சிலிக்கான்' }, atomicNumber: 14, category: 'nonmetal', color: '#0284C7' },
      { id: 'Sn', symbol: 'Sn', name: { en: 'Tin', ta: 'தகரம்' }, atomicNumber: 50, category: 'transition', color: '#475569' },
      { id: 'Pb', symbol: 'Pb', name: { en: 'Lead', ta: 'ஈயம்' }, atomicNumber: 82, category: 'transition', color: '#6B7280' },
    ],
  },
  {
    id: 'elem-08',
    name: 'Level 8: Magnetic Metals',
    elements: [
      { id: 'Ni', symbol: 'Ni', name: { en: 'Nickel', ta: 'நிக்கல்' }, atomicNumber: 28, category: 'transition', color: '#0D9488' },
      { id: 'Co', symbol: 'Co', name: { en: 'Cobalt', ta: 'கோபால்ட்' }, atomicNumber: 27, category: 'transition', color: '#2563EB' },
      { id: 'Zn', symbol: 'Zn', name: { en: 'Zinc', ta: 'துத்தநாகம்' }, atomicNumber: 30, category: 'transition', color: '#78716C' },
      { id: 'Pt', symbol: 'Pt', name: { en: 'Platinum', ta: 'பிளாட்டினம்' }, atomicNumber: 78, category: 'transition', color: '#9CA3AF' },
    ],
  },
  {
    id: 'elem-09',
    name: 'Level 9: Planetary Elements',
    elements: [
      { id: 'Hg', symbol: 'Hg', name: { en: 'Mercury', ta: 'பாதரசம்' }, atomicNumber: 80, category: 'transition', color: '#E11D48' },
      { id: 'U', symbol: 'U', name: { en: 'Uranium', ta: 'யுரேனியம்' }, atomicNumber: 92, category: 'transition', color: '#16A34A' },
      { id: 'Ti', symbol: 'Ti', name: { en: 'Titanium', ta: 'டைட்டானியம்' }, atomicNumber: 22, category: 'transition', color: '#4F46E5' },
      { id: 'P', symbol: 'P', name: { en: 'Phosphorus', ta: 'பாஸ்பரஸ்' }, atomicNumber: 15, category: 'nonmetal', color: '#D97706' },
    ],
  },
  {
    id: 'elem-10',
    name: 'Level 10: Master Mix',
    elements: [
      { id: 'S', symbol: 'S', name: { en: 'Sulfur', ta: 'கந்தகம்' }, atomicNumber: 16, category: 'nonmetal', color: '#CA8A04' },
      { id: 'Al', symbol: 'Al', name: { en: 'Aluminium', ta: 'அலுமினியம்' }, atomicNumber: 13, category: 'transition', color: '#64748B' },
      { id: 'B', symbol: 'B', name: { en: 'Boron', ta: 'போரான்' }, atomicNumber: 5, category: 'nonmetal', color: '#7C3AED' },
      { id: 'Cr', symbol: 'Cr', name: { en: 'Chromium', ta: 'குரோமியம்' }, atomicNumber: 24, category: 'transition', color: '#0284C7' },
    ],
  },
];
