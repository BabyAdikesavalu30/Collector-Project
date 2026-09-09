/**
 * Experiment Lab Formulas
 * Pure, deterministic scientific calculation functions with complete protection
 * against divide-by-zero, NaN, Infinity, and out-of-bounds inputs.
 *
 * Used directly by the ExperimentEngine.
 */

import { SimulationResult } from './experiment.types';

/** Safe numeric clamp */
export function clamp(value: number, min: number, max: number): number {
  if (isNaN(value)) return min;
  return Math.max(min, Math.min(max, value));
}

/** Safe rounding to specific decimal places */
export function round(value: number, decimals: number = 2): number {
  if (!isFinite(value) || isNaN(value)) return 0;
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Ohm's Law: V = I * R  =>  I = V / R, P = V * I
// ─────────────────────────────────────────────────────────────────────────────
export function calculateOhmsLaw(voltage: number, resistance: number): SimulationResult {
  const safeV = clamp(voltage, 1, 24);
  const safeR = clamp(resistance, 1, 100); // R >= 1 ensures no divide-by-zero

  const currentA = round(safeV / safeR, 2);
  const powerW = round(safeV * currentA, 2);
  const bulbBrightnessPct = Math.round(clamp((powerW / 24) * 100, 5, 100));

  return {
    metrics: [
      {
        id: 'current',
        label: { en: 'Current', ta: 'மின்னோட்டம்' },
        value: currentA,
        unit: 'A',
        unitTa: 'A',
        formattedValue: `${currentA} A`,
      },
      {
        id: 'power',
        label: { en: 'Electric Power', ta: 'மின் திறன்' },
        value: powerW,
        unit: 'W',
        unitTa: 'W',
        formattedValue: `${powerW} W`,
      },
      {
        id: 'brightness',
        label: { en: 'Bulb Brightness', ta: 'விளக்கின் பிரகாசம்' },
        value: bulbBrightnessPct,
        unit: '%',
        unitTa: '%',
        formattedValue: `${bulbBrightnessPct}%`,
      },
    ],
    visualState: {
      voltage: safeV,
      resistance: safeR,
      currentA,
      powerW,
      bulbBrightnessPct,
    },
    summaryText: {
      en: `At ${safeV}V with ${safeR}Ω resistance, electric current is ${currentA}A.`,
      ta: `${safeV}V மின்னழுத்தம் மற்றும் ${safeR}Ω மின்தடையில், மின்னோட்டம் ${currentA}A ஆக உள்ளது.`,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Density: rho = mass / volume, relative to water (1.0 g/cm³)
// ─────────────────────────────────────────────────────────────────────────────
export function calculateDensity(mass: number, volume: number): SimulationResult {
  const safeMass = clamp(mass, 1, 2000);
  const safeVol = clamp(volume, 1, 1000); // V >= 1 ensures safe division

  const density = round(safeMass / safeVol, 2);
  const waterDensity = 1.0;
  const sinks = density > waterDensity;
  const submergedRatio = clamp(round(density / waterDensity, 2), 0.05, 1.0);

  const statusText = sinks
    ? { en: 'Sinks in Water', ta: 'நீரில் மூழ்கும்' }
    : { en: 'Floats on Water', ta: 'நீரில் மிதக்கும்' };

  return {
    metrics: [
      {
        id: 'density',
        label: { en: 'Density', ta: 'அடர்த்தி' },
        value: density,
        unit: 'g/cm³',
        unitTa: 'கி/செ.மீ³',
        formattedValue: `${density} g/cm³`,
      },
      {
        id: 'behavior',
        label: { en: 'Buoyancy Behavior', ta: 'மிதக்கும் தன்மை' },
        value: sinks ? 'sinks' : 'floats',
        unit: '',
        formattedValue: statusText.en,
      },
    ],
    visualState: {
      mass: safeMass,
      volume: safeVol,
      density,
      sinks,
      submergedRatio,
    },
    summaryText: {
      en: `Density is ${density} g/cm³. Because this is ${sinks ? 'greater than' : 'less than'} water (1.0 g/cm³), the object ${sinks ? 'sinks' : 'floats'}.`,
      ta: `அடர்த்தி ${density} கி/செ.மீ³. இது நீரின் அடர்த்தியை (1.0 கி/செ.மீ³) விட ${sinks ? 'அதிகம்' : 'குறைவு'} என்பதால், பொருள் ${sinks ? 'மூழ்குகிறது' : 'மிதக்கிறது'}.`,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Law of Reflection: Angle of Incidence = Angle of Reflection
// ─────────────────────────────────────────────────────────────────────────────
export function calculateReflection(incidenceAngle: number): SimulationResult {
  const safeAngle = clamp(Math.round(incidenceAngle), 0, 85);
  const reflectionAngle = safeAngle;

  return {
    metrics: [
      {
        id: 'incidenceAngle',
        label: { en: 'Angle of Incidence (i)', ta: 'படுகோணம் (i)' },
        value: safeAngle,
        unit: '°',
        unitTa: '°',
        formattedValue: `${safeAngle}°`,
      },
      {
        id: 'reflectionAngle',
        label: { en: 'Angle of Reflection (r)', ta: 'எதிரொளிப்பு கோணம் (r)' },
        value: reflectionAngle,
        unit: '°',
        unitTa: '°',
        formattedValue: `${reflectionAngle}°`,
      },
    ],
    visualState: {
      incidenceAngle: safeAngle,
      reflectionAngle,
    },
    summaryText: {
      en: `Angle of reflection (${reflectionAngle}°) exactly equals angle of incidence (${safeAngle}°).`,
      ta: `எதிரொளிப்பு கோணம் (${reflectionAngle}°) படுகோணத்திற்கு (${safeAngle}°) சமமாக உள்ளது.`,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Refraction (Snell's Law): n1 * sin(θ1) = n2 * sin(θ2)
// ─────────────────────────────────────────────────────────────────────────────
const REFRACTIVE_INDICES: Record<string, { n: number; name: { en: string; ta: string } }> = {
  air: { n: 1.0, name: { en: 'Air', ta: 'காற்று' } },
  water: { n: 1.33, name: { en: 'Water', ta: 'நீர்' } },
  glass: { n: 1.5, name: { en: 'Glass', ta: 'கண்ணாடி' } },
  diamond: { n: 2.42, name: { en: 'Diamond', ta: 'வைரம்' } },
};

export function calculateRefraction(
  medium1: string,
  medium2: string,
  incidenceAngle: number
): SimulationResult {
  const safeAngle = clamp(incidenceAngle, 0, 85);
  const m1 = REFRACTIVE_INDICES[medium1] || REFRACTIVE_INDICES.air;
  const m2 = REFRACTIVE_INDICES[medium2] || REFRACTIVE_INDICES.water;

  const theta1Rad = (safeAngle * Math.PI) / 180;
  const sinTheta2 = (m1.n / m2.n) * Math.sin(theta1Rad);

  let refractionAngle = 0;
  let isTotalInternalReflection = false;

  if (sinTheta2 > 1.0) {
    isTotalInternalReflection = true;
    refractionAngle = safeAngle;
  } else {
    refractionAngle = round((Math.asin(sinTheta2) * 180) / Math.PI, 1);
  }

  const bendsToward = m2.n > m1.n;

  return {
    metrics: [
      {
        id: 'angle1',
        label: { en: 'Incidence Angle', ta: 'படுகோணம்' },
        value: safeAngle,
        unit: '°',
        unitTa: '°',
        formattedValue: `${safeAngle}°`,
      },
      {
        id: 'angle2',
        label: { en: isTotalInternalReflection ? 'Reflection Angle' : 'Refraction Angle', ta: isTotalInternalReflection ? 'எதிரொளிப்பு கோணம்' : 'விலகல் கோணம்' },
        value: refractionAngle,
        unit: '°',
        unitTa: '°',
        formattedValue: `${refractionAngle}°`,
      },
      {
        id: 'behavior',
        label: { en: 'Ray Bending', ta: 'ஒளிக்கதிர் விலகல்' },
        value: isTotalInternalReflection ? 'TIR' : bendsToward ? 'toward_normal' : 'away_from_normal',
        unit: '',
        formattedValue: isTotalInternalReflection
          ? 'Total Internal Reflection'
          : bendsToward
          ? 'Bends toward normal'
          : 'Bends away from normal',
      },
    ],
    visualState: {
      incidenceAngle: safeAngle,
      refractionAngle,
      isTotalInternalReflection,
      medium1: m1,
      medium2: m2,
    },
    summaryText: {
      en: isTotalInternalReflection
        ? 'Total internal reflection occurred because the angle exceeded the critical angle.'
        : `Light passes from ${m1.name.en} into ${m2.name.en} and bends ${bendsToward ? 'toward' : 'away from'} the normal at ${refractionAngle}°.`,
      ta: isTotalInternalReflection
        ? 'மாறுநிலைக் கோணத்தை விட அதிகமானதால் முழு அக எதிரொளிப்பு ஏற்பட்டது.'
        : `ஒளி ${m1.name.ta}லிருந்து ${m2.name.ta}க்குள் செல்லும்போது ${refractionAngle}° கோணத்தில் செங்குத்துக் கோட்டை ${bendsToward ? 'நோக்கி' : 'விட்டு விலகி'} வளைகிறது.`,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. Free Fall Mechanics: t = sqrt(2h / g), v = g * t
// ─────────────────────────────────────────────────────────────────────────────
const PLANET_GRAVITY: Record<string, { g: number; label: { en: string; ta: string } }> = {
  earth: { g: 9.8, label: { en: 'Earth (9.8 m/s²)', ta: 'பூமி (9.8 மீ/வி²)' } },
  moon: { g: 1.62, label: { en: 'Moon (1.62 m/s²)', ta: 'சந்திரன் (1.62 மீ/வி²)' } },
  mars: { g: 3.72, label: { en: 'Mars (3.72 m/s²)', ta: 'செவ்வாய் (3.72 மீ/வி²)' } },
};

export function calculateFreeFall(heightM: number, planetId: string = 'earth'): SimulationResult {
  const safeH = clamp(heightM, 1, 200);
  const planet = PLANET_GRAVITY[planetId] || PLANET_GRAVITY.earth;
  const g = planet.g;

  const fallTimeS = round(Math.sqrt((2 * safeH) / g), 2);
  const impactSpeedMs = round(g * fallTimeS, 1);
  const impactSpeedKmh = round(impactSpeedMs * 3.6, 1);

  return {
    metrics: [
      {
        id: 'fallTime',
        label: { en: 'Fall Duration', ta: 'விழும் நேரம்' },
        value: fallTimeS,
        unit: 's',
        unitTa: 'விநாடி',
        formattedValue: `${fallTimeS} s`,
      },
      {
        id: 'impactSpeed',
        label: { en: 'Impact Velocity', ta: 'தரை தொடும் வேகம்' },
        value: impactSpeedMs,
        unit: 'm/s',
        unitTa: 'மீ/வி',
        formattedValue: `${impactSpeedMs} m/s (${impactSpeedKmh} km/h)`,
      },
    ],
    visualState: {
      heightM: safeH,
      fallTimeS,
      impactSpeedMs,
      gravity: g,
      planetId,
    },
    summaryText: {
      en: `Dropping an object from ${safeH}m on ${planet.label.en} takes ${fallTimeS}s, hitting the ground at ${impactSpeedMs} m/s.`,
      ta: `${planet.label.ta}இல் ${safeH}மீ உயரத்திலிருந்து பொருள் கீழே விழ ${fallTimeS} விநாடிகள் ஆகிறது; தரை தொடும் வேகம் ${impactSpeedMs} மீ/வி.`,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. Simple Pendulum: T = 2 * pi * sqrt(L / g)
// ─────────────────────────────────────────────────────────────────────────────
export function calculatePendulum(lengthM: number, massG: number = 100): SimulationResult {
  const safeL = clamp(lengthM, 0.2, 3.0);
  const safeM = clamp(massG, 10, 1000);
  const g = 9.8;

  const periodS = round(2 * Math.PI * Math.sqrt(safeL / g), 2);
  const frequencyHz = round(1 / periodS, 2);

  return {
    metrics: [
      {
        id: 'period',
        label: { en: 'Period (T)', ta: 'அலைவு நேரம் (T)' },
        value: periodS,
        unit: 's',
        unitTa: 'விநாடி',
        formattedValue: `${periodS} s`,
      },
      {
        id: 'frequency',
        label: { en: 'Frequency', ta: 'அதிர்வெண்' },
        value: frequencyHz,
        unit: 'Hz',
        unitTa: 'ஹெர்ட்ஸ்',
        formattedValue: `${frequencyHz} Hz`,
      },
    ],
    visualState: {
      lengthM: safeL,
      massG: safeM,
      periodS,
      frequencyHz,
    },
    summaryText: {
      en: `String length of ${safeL}m produces a swing period of ${periodS}s (mass of ${safeM}g does not affect the period).`,
      ta: `${safeL}மீ கயிற்றின் நீளம் ${periodS} விநாடி அலைவு நேரத்தை உருவாக்குகிறது (${safeM}கி நிறை அலைவு நேரத்தை மாற்றுவதில்லை).`,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. pH Explorer
// ─────────────────────────────────────────────────────────────────────────────
export interface PHSubstance {
  id: string;
  name: { en: string; ta: string };
  ph: number;
  category: 'strong_acid' | 'acid' | 'neutral' | 'base' | 'strong_base';
  color: string;
}

export const PH_SUBSTANCES: Record<string, PHSubstance> = {
  lemon_juice: { id: 'lemon_juice', name: { en: 'Lemon Juice', ta: 'எலுமிச்சை சாறு' }, ph: 2.2, category: 'strong_acid', color: '#EF4444' },
  orange_juice: { id: 'orange_juice', name: { en: 'Orange Juice', ta: 'ஆரஞ்சு சாறு' }, ph: 3.5, category: 'acid', color: '#F97316' },
  milk: { id: 'milk', name: { en: 'Milk', ta: 'பால்' }, ph: 6.6, category: 'acid', color: '#FBBF24' },
  pure_water: { id: 'pure_water', name: { en: 'Pure Water', ta: 'தூய நீர்' }, ph: 7.0, category: 'neutral', color: '#10B981' },
  baking_soda: { id: 'baking_soda', name: { en: 'Baking Soda Solution', ta: 'சமையல் சோடா கரைசல்' }, ph: 8.5, category: 'base', color: '#06B6D4' },
  soap_solution: { id: 'soap_solution', name: { en: 'Soap Solution', ta: 'சோப்பு கரைசல்' }, ph: 10.0, category: 'base', color: '#3B82F6' },
  bleach: { id: 'bleach', name: { en: 'Bleach Solution', ta: 'சலவை கரைசல்' }, ph: 12.5, category: 'strong_base', color: '#8B5CF6' },
};

export function calculatePH(substanceId: string): SimulationResult {
  const substance = PH_SUBSTANCES[substanceId] || PH_SUBSTANCES.pure_water;
  const isAcid = substance.ph < 7;
  const isNeutral = substance.ph === 7;

  const categoryLabels = {
    strong_acid: { en: 'Strong Acid', ta: 'வலுவான அமிலம்' },
    acid: { en: 'Weak Acid', ta: 'மென்மையான அமிலம்' },
    neutral: { en: 'Neutral', ta: 'நடுநிலை' },
    base: { en: 'Weak Base', ta: 'மென்மையான காரம்' },
    strong_base: { en: 'Strong Base', ta: 'வலுவான காரம்' },
  };

  return {
    metrics: [
      {
        id: 'ph',
        label: { en: 'pH Value', ta: 'pH மதிப்பு' },
        value: substance.ph,
        unit: '',
        formattedValue: `${substance.ph}`,
      },
      {
        id: 'classification',
        label: { en: 'Classification', ta: 'வகைப்பாடு' },
        value: substance.category,
        unit: '',
        formattedValue: categoryLabels[substance.category].en,
      },
    ],
    visualState: {
      substance,
      ph: substance.ph,
      indicatorColor: substance.color,
      isAcid,
      isNeutral,
    },
    summaryText: {
      en: `${substance.name.en} has a pH of ${substance.ph}, making it a ${categoryLabels[substance.category].en}.`,
      ta: `${substance.name.ta}யின் pH மதிப்பு ${substance.ph} ஆகும், இது ${categoryLabels[substance.category].ta} வகையைச் சேர்ந்தது.`,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. Solubility: max soluble vs temperature
// ─────────────────────────────────────────────────────────────────────────────
export function calculateSolubility(tempC: number, soluteGrams: number, soluteType: string = 'salt'): SimulationResult {
  const safeT = clamp(tempC, 10, 90);
  const safeSolute = clamp(soluteGrams, 5, 250);

  // Solubility in 100ml water
  // Salt (NaCl): gently rises ~35g to ~39g
  // Sugar: sharply rises ~180g to ~400g
  const maxSolubility = soluteType === 'sugar'
    ? round(180 + 2.4 * safeT, 1)
    : round(35 + 0.05 * safeT, 1);

  const dissolved = round(Math.min(safeSolute, maxSolubility), 1);
  const residue = round(Math.max(0, safeSolute - maxSolubility), 1);
  const isSaturated = safeSolute >= maxSolubility;

  return {
    metrics: [
      {
        id: 'dissolved',
        label: { en: 'Dissolved Amount', ta: 'கரைந்த அளவு' },
        value: dissolved,
        unit: 'g',
        unitTa: 'கி',
        formattedValue: `${dissolved} g`,
      },
      {
        id: 'residue',
        label: { en: 'Undissolved Residue', ta: 'கரையாத படிவு' },
        value: residue,
        unit: 'g',
        unitTa: 'கி',
        formattedValue: `${residue} g`,
      },
      {
        id: 'maxLimit',
        label: { en: 'Solubility Limit', ta: 'அதிகபட்ச கரைதிறன்' },
        value: maxSolubility,
        unit: 'g/100ml',
        unitTa: 'கி/100மி.லி',
        formattedValue: `${maxSolubility} g/100ml`,
      },
    ],
    visualState: {
      tempC: safeT,
      soluteGrams: safeSolute,
      dissolved,
      residue,
      maxSolubility,
      isSaturated,
      soluteType,
    },
    summaryText: {
      en: `At ${safeT}°C, ${dissolved}g dissolves in 100ml. ${residue > 0 ? `${residue}g settles as precipitate.` : 'All solute is dissolved.'}`,
      ta: `${safeT}°C வெப்பநிலையில், 100மி.லி நீரில் ${dissolved}கி கரைகிறது. ${residue > 0 ? `${residue}கி அடியில் தங்குகிறது.` : 'அனைத்தும் கரைந்துவிட்டது.'}`,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. States of Matter: thermal kinetic theory
// ─────────────────────────────────────────────────────────────────────────────
export function calculateStatesOfMatter(tempC: number): SimulationResult {
  const safeT = clamp(tempC, -50, 150);

  let state: 'solid' | 'liquid' | 'gas' = 'liquid';
  let stateTitle = { en: 'Liquid Water', ta: 'திரவ நீர்' };

  if (safeT < 0) {
    state = 'solid';
    stateTitle = { en: 'Solid (Ice)', ta: 'திண்மம் (பனிக்கட்டி)' };
  } else if (safeT >= 100) {
    state = 'gas';
    stateTitle = { en: 'Gas (Steam)', ta: 'வாயு (நீராவி)' };
  }

  const kineticPct = Math.round(clamp(((safeT + 50) / 200) * 100, 5, 100));

  return {
    metrics: [
      {
        id: 'state',
        label: { en: 'State of Matter', ta: 'பருப்பொருளின் நிலை' },
        value: state,
        unit: '',
        formattedValue: stateTitle.en,
      },
      {
        id: 'kineticEnergy',
        label: { en: 'Particle Kinetic Motion', ta: 'துகள்களின் இயக்க ஆற்றல்' },
        value: kineticPct,
        unit: '%',
        unitTa: '%',
        formattedValue: `${kineticPct}%`,
      },
    ],
    visualState: {
      tempC: safeT,
      state,
      kineticPct,
    },
    summaryText: {
      en: `At ${safeT}°C, water exists as a ${stateTitle.en}. Particles are ${state === 'solid' ? 'tightly locked in place vibrating' : state === 'liquid' ? 'sliding closely past one another' : 'spread far apart moving rapidly'}.`,
      ta: `${safeT}°C வெப்பநிலையில், நீர் ${stateTitle.ta} நிலையில் உள்ளது. துகள்கள் ${state === 'solid' ? 'இறுக்கமாக பிணைக்கப்பட்டு அதிர்கின்றன' : state === 'liquid' ? 'ஒன்றையொன்று நழுவி நகர்கின்றன' : 'அதிவேகமாக விலகிப் பறக்கின்றன'}.`,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. Reaction Rate: Temperature, Concentration, Surface Area
// ─────────────────────────────────────────────────────────────────────────────
export function calculateReactionRate(
  tempC: number,
  concentration: string = 'medium',
  surfaceArea: string = 'granules'
): SimulationResult {
  const safeT = clamp(tempC, 10, 80);

  const concMult = concentration === 'high' ? 2.0 : concentration === 'low' ? 0.5 : 1.0;
  const surfMult = surfaceArea === 'powder' ? 2.2 : surfaceArea === 'chunk' ? 0.5 : 1.0;
  const tempMult = 1 + (safeT - 10) * 0.04;

  const rateMultiplier = round(tempMult * concMult * surfMult, 1);
  const completionTimeS = round(clamp(120 / rateMultiplier, 4, 150), 1);

  return {
    metrics: [
      {
        id: 'reactionRate',
        label: { en: 'Relative Reaction Speed', ta: 'சார்பு வினை வேகம்' },
        value: rateMultiplier,
        unit: 'x',
        unitTa: 'x',
        formattedValue: `${rateMultiplier}x`,
      },
      {
        id: 'completionTime',
        label: { en: 'Est. Completion Time', ta: 'முடிவுறும் நேரம்' },
        value: completionTimeS,
        unit: 's',
        unitTa: 'விநாடி',
        formattedValue: `${completionTimeS} s`,
      },
    ],
    visualState: {
      tempC: safeT,
      concentration,
      surfaceArea,
      rateMultiplier,
      completionTimeS,
    },
    summaryText: {
      en: `Combined factors increase reaction speed to ${rateMultiplier}x normal, completing in approximately ${completionTimeS} seconds.`,
      ta: `இணைந்த காரணிகள் வினையின் வேகத்தை ${rateMultiplier} மடங்கு அதிகரித்து, சுமார் ${completionTimeS} விநாடிகளில் முடிக்கிறது.`,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. Photosynthesis: Light, CO2, Water
// ─────────────────────────────────────────────────────────────────────────────
export function calculatePhotosynthesis(
  lightPct: number,
  co2Pct: number,
  waterSupply: string = 'normal'
): SimulationResult {
  const safeLight = clamp(lightPct, 0, 100);
  const safeCo2 = clamp(co2Pct, 0, 100);
  const waterFactor = waterSupply === 'high' ? 1.0 : waterSupply === 'low' ? 0.4 : 0.85;

  let limitingFactor = { en: 'Adequate balance', ta: 'சமநிலையான அளவு' };
  if (waterSupply === 'low') {
    limitingFactor = { en: 'Water is limiting', ta: 'நீர் பற்றாக்குறை' };
  } else if (safeLight < safeCo2) {
    limitingFactor = { en: 'Light is limiting', ta: 'ஒளி பற்றாக்குறை' };
  } else {
    limitingFactor = { en: 'Carbon dioxide is limiting', ta: 'கார்பன் டை ஆக்சைடு பற்றாக்குறை' };
  }

  const primaryInput = Math.min(safeLight, safeCo2);
  const ratePct = Math.round(primaryInput * waterFactor);
  const oxygenBubblesPerMin = Math.round(ratePct * 0.4);

  return {
    metrics: [
      {
        id: 'rate',
        label: { en: 'Photosynthesis Rate', ta: 'ஒளிச்சேர்க்கை வீதம்' },
        value: ratePct,
        unit: '%',
        unitTa: '%',
        formattedValue: `${ratePct}%`,
      },
      {
        id: 'oxygen',
        label: { en: 'Oxygen Bubbles Produced', ta: 'வெளியாகும் ஆக்ஸிஜன் குமிழ்கள்' },
        value: oxygenBubblesPerMin,
        unit: '/min',
        unitTa: '/நிமி',
        formattedValue: `${oxygenBubblesPerMin} bubbles/min`,
      },
      {
        id: 'limiting',
        label: { en: 'Limiting Factor', ta: 'கட்டுப்படுத்தும் காரணி' },
        value: limitingFactor.en,
        unit: '',
        formattedValue: limitingFactor.en,
      },
    ],
    visualState: {
      lightPct: safeLight,
      co2Pct: safeCo2,
      waterSupply,
      ratePct,
      oxygenBubblesPerMin,
    },
    summaryText: {
      en: `Photosynthesis is operating at ${ratePct}% capacity (${oxygenBubblesPerMin} O₂ bubbles/min). ${limitingFactor.en}.`,
      ta: `ஒளிச்சேர்க்கை ${ratePct}% வேகத்தில் இயங்குகிறது (நிமிடத்திற்கு ${oxygenBubblesPerMin} ஆக்ஸிஜன் குமிழ்கள்). ${limitingFactor.ta}.`,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 12. Heart Rate Simulation
// ─────────────────────────────────────────────────────────────────────────────
export function calculateHeartRate(activityLevel: string = 'rest', fitnessLevel: string = 'standard'): SimulationResult {
  const baseRest = fitnessLevel === 'athletic' ? 58 : 72;
  const additions: Record<string, { bpm: number; respiration: number; label: { en: string; ta: string } }> = {
    rest: { bpm: 0, respiration: 14, label: { en: 'Resting', ta: 'ஓய்வு' } },
    light_walk: { bpm: 26, respiration: 20, label: { en: 'Walking', ta: 'நடைபயிற்சி' } },
    jogging: { bpm: 58, respiration: 32, label: { en: 'Jogging', ta: 'மெதுவோட்டம்' } },
    sprint: { bpm: 95, respiration: 48, label: { en: 'Sprinting', ta: 'விரைவோட்டம்' } },
  };

  const activity = additions[activityLevel] || additions.rest;
  const currentBpm = baseRest + activity.bpm;

  return {
    metrics: [
      {
        id: 'bpm',
        label: { en: 'Heart Rate', ta: 'இதயத் துடிப்பு' },
        value: currentBpm,
        unit: 'BPM',
        unitTa: 'துடிப்பு/நிமி',
        formattedValue: `${currentBpm} BPM`,
      },
      {
        id: 'breathing',
        label: { en: 'Breathing Rate', ta: 'சுவாச விகிதம்' },
        value: activity.respiration,
        unit: 'breaths/min',
        unitTa: 'சுவாசம்/நிமி',
        formattedValue: `${activity.respiration} breaths/min`,
      },
    ],
    visualState: {
      activityLevel,
      fitnessLevel,
      currentBpm,
      respiration: activity.respiration,
    },
    summaryText: {
      en: `During ${activity.label.en}, muscles demand more oxygen, raising heart rate to ${currentBpm} BPM.`,
      ta: `${activity.label.ta}ின் போது, தசைகளுக்கு அதிக ஆக்ஸிஜன் தேவைப்படுவதால் இதயத் துடிப்பு ${currentBpm} ஆக அதிகரிக்கிறது.`,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 13. The Water Cycle
// ─────────────────────────────────────────────────────────────────────────────
export function calculateWaterCycle(solarIntensity: number, ambientTempC: number): SimulationResult {
  const safeSun = clamp(solarIntensity, 10, 100);
  const safeTemp = clamp(ambientTempC, 10, 45);

  const evaporationIndex = Math.round(safeSun * 0.6 + safeTemp * 1.1);
  const cloudCondensation = Math.round(evaporationIndex * 0.85);
  const precipitationRate = evaporationIndex > 50 ? Math.round((evaporationIndex - 50) * 1.5) : 0;

  return {
    metrics: [
      {
        id: 'evaporation',
        label: { en: 'Evaporation Rate', ta: 'ஆவியாதல் வீதம்' },
        value: evaporationIndex,
        unit: '%',
        unitTa: '%',
        formattedValue: `${evaporationIndex}%`,
      },
      {
        id: 'clouds',
        label: { en: 'Cloud Density', ta: 'மேகங்களின் அடர்த்தி' },
        value: cloudCondensation,
        unit: '%',
        unitTa: '%',
        formattedValue: `${cloudCondensation}%`,
      },
      {
        id: 'rain',
        label: { en: 'Precipitation', ta: 'மழைப்பொழிவு' },
        value: precipitationRate,
        unit: '%',
        unitTa: '%',
        formattedValue: precipitationRate > 0 ? `${precipitationRate}%` : 'None (Clear)',
      },
    ],
    visualState: {
      solarIntensity: safeSun,
      ambientTempC: safeTemp,
      evaporationIndex,
      cloudCondensation,
      precipitationRate,
    },
    summaryText: {
      en: `Solar energy causes water to evaporate at ${evaporationIndex}%, forming clouds and ${precipitationRate > 0 ? `generating ${precipitationRate}% rain precipitation.` : 'remaining clear without rain.'}`,
      ta: `சூரிய ஆற்றலால் நீர் ${evaporationIndex}% வேகத்தில் ஆவியாகி, மேகங்களை உருவாக்கி ${precipitationRate > 0 ? `${precipitationRate}% மழையைத் தருகிறது.` : 'மழையின்றி தெளிவாக உள்ளது.'}`,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 14. Greenhouse Effect: Greenhouse gases vs heat retention
// ─────────────────────────────────────────────────────────────────────────────
export function calculateGreenhouseEffect(ghgLevelPpm: number): SimulationResult {
  const safePpm = clamp(ghgLevelPpm, 250, 800);

  // Pre-industrial baseline: ~280 ppm => 25% trapped, 14°C global average
  const trappedHeatPct = Math.round(clamp(25 + ((safePpm - 280) / (800 - 280)) * 40, 20, 68));
  const averageTempC = round(14.0 + ((safePpm - 280) / 100) * 0.85, 1);

  return {
    metrics: [
      {
        id: 'trappedHeat',
        label: { en: 'Trapped Thermal Heat', ta: 'பிடிக்கப்பட்ட வெப்பம்' },
        value: trappedHeatPct,
        unit: '%',
        unitTa: '%',
        formattedValue: `${trappedHeatPct}%`,
      },
      {
        id: 'avgTemp',
        label: { en: 'Simulated Surface Temp', ta: 'மேற்பரப்பு வெப்பநிலை' },
        value: averageTempC,
        unit: '°C',
        unitTa: '°C',
        formattedValue: `${averageTempC} °C`,
      },
    ],
    visualState: {
      ghgLevelPpm: safePpm,
      trappedHeatPct,
      averageTempC,
    },
    summaryText: {
      en: `At ${safePpm} ppm greenhouse gas concentration, ${trappedHeatPct}% of re-radiated heat is trapped, yielding an average surface temperature of ${averageTempC}°C.`,
      ta: `${safePpm} ppm பசுமைக்குடில் வாயு அளவில், கதிர்வீச்சு வெப்பத்தில் ${trappedHeatPct}% வளிமண்டலத்தில் தங்கி, மேற்பரப்பு வெப்பநிலையை ${averageTempC}°C ஆக உயர்த்துகிறது.`,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 15. Moon Phases: Lunar Orbit & Illumination
// ─────────────────────────────────────────────────────────────────────────────
export function calculateMoonPhases(dayOfOrbit: number): SimulationResult {
  const safeDay = clamp(Math.round(dayOfOrbit), 0, 28);
  const phaseAngle = (safeDay / 28) * 360;

  // Illumination from 0% (Day 0) -> 100% (Day 14) -> 0% (Day 28)
  const illuminationPct = Math.round(((1 - Math.cos((phaseAngle * Math.PI) / 180)) / 2) * 100);

  let phaseKey = 'new_moon';
  let phaseTitle = { en: 'New Moon', ta: 'அமாவாசை' };

  if (safeDay === 0 || safeDay === 28) {
    phaseKey = 'new_moon';
    phaseTitle = { en: 'New Moon', ta: 'அமாவாசை' };
  } else if (safeDay > 0 && safeDay < 7) {
    phaseKey = 'waxing_crescent';
    phaseTitle = { en: 'Waxing Crescent', ta: 'வளர்பிறை பிறை' };
  } else if (safeDay === 7) {
    phaseKey = 'first_quarter';
    phaseTitle = { en: 'First Quarter', ta: 'முதல் கால் பகுதி' };
  } else if (safeDay > 7 && safeDay < 14) {
    phaseKey = 'waxing_gibbous';
    phaseTitle = { en: 'Waxing Gibbous', ta: 'வளர்பிறை முக்கால்' };
  } else if (safeDay === 14) {
    phaseKey = 'full_moon';
    phaseTitle = { en: 'Full Moon', ta: 'பௌர்ணமி' };
  } else if (safeDay > 14 && safeDay < 21) {
    phaseKey = 'waning_gibbous';
    phaseTitle = { en: 'Waning Gibbous', ta: 'தேய்பிறை முக்கால்' };
  } else if (safeDay === 21) {
    phaseKey = 'third_quarter';
    phaseTitle = { en: 'Third Quarter', ta: 'இறுதி கால் பகுதி' };
  } else {
    phaseKey = 'waning_crescent';
    phaseTitle = { en: 'Waning Crescent', ta: 'தேய்பிறை பிறை' };
  }

  return {
    metrics: [
      {
        id: 'phase',
        label: { en: 'Moon Phase', ta: 'சந்திரனின் நிலை' },
        value: phaseKey,
        unit: '',
        formattedValue: phaseTitle.en,
      },
      {
        id: 'illumination',
        label: { en: 'Illumination', ta: 'ஒளிரும் பகுதி' },
        value: illuminationPct,
        unit: '%',
        unitTa: '%',
        formattedValue: `${illuminationPct}%`,
      },
      {
        id: 'day',
        label: { en: 'Orbit Day', ta: 'சுற்றுப்பாதை நாள்' },
        value: safeDay,
        unit: '/28',
        unitTa: '/28',
        formattedValue: `Day ${safeDay} of 28`,
      },
    ],
    visualState: {
      dayOfOrbit: safeDay,
      phaseAngle,
      illuminationPct,
      phaseKey,
      phaseTitle,
    },
    summaryText: {
      en: `On Day ${safeDay}, the Moon is in the ${phaseTitle.en} phase with ${illuminationPct}% of its visible face illuminated by the Sun.`,
      ta: `நாள் ${safeDay}இல், சந்திரன் ${phaseTitle.ta} நிலையில் உள்ளது; சூரியனால் அதன் ${illuminationPct}% பகுதி ஒளிர்கிறது.`,
    },
  };
}
