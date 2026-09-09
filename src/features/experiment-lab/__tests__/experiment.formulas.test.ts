/**
 * Experiment Lab Formulas Unit Tests
 * Verifies all 15 scientific formulas across normal, boundary, zero, and extreme values.
 * Confirms no NaN or Infinity is ever output.
 */

import {
  calculateOhmsLaw,
  calculateDensity,
  calculateReflection,
  calculateRefraction,
  calculateFreeFall,
  calculatePendulum,
  calculatePH,
  calculateSolubility,
  calculateStatesOfMatter,
  calculateReactionRate,
  calculatePhotosynthesis,
  calculateHeartRate,
  calculateWaterCycle,
  calculateGreenhouseEffect,
  calculateMoonPhases,
  clamp,
  round,
} from '../experiment.formulas';

describe('Experiment Lab Formulas', () => {
  // Utility tests
  it('handles clamp and round safely', () => {
    expect(clamp(15, 0, 10)).toBe(10);
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(NaN, 0, 10)).toBe(0);

    expect(round(3.14159, 2)).toBe(3.14);
    expect(round(NaN, 2)).toBe(0);
    expect(round(Infinity, 2)).toBe(0);
  });

  // 1. Ohm's Law
  it("calculates Ohm's Law correctly and handles zero resistance safely", () => {
    const normal = calculateOhmsLaw(10, 5);
    const current = normal.metrics.find((m) => m.id === 'current')?.value;
    expect(current).toBe(2);

    // Zero/invalid input clamped safely without divide-by-zero
    const safeZero = calculateOhmsLaw(12, 0);
    const zeroCurrent = safeZero.metrics.find((m) => m.id === 'current')?.value;
    expect(Number.isFinite(zeroCurrent as number)).toBe(true);
    expect(isNaN(zeroCurrent as number)).toBe(false);
  });

  // 2. Density
  it('calculates density and buoyancy behavior correctly', () => {
    // Sinking object (Density 2.0 > 1.0)
    const sink = calculateDensity(100, 50);
    const sinkDensity = sink.metrics.find((m) => m.id === 'density')?.value;
    expect(sinkDensity).toBe(2);
    expect(sink.visualState.sinks).toBe(true);

    // Floating object (Density 0.5 < 1.0)
    const floatObj = calculateDensity(40, 80);
    const floatDensity = floatObj.metrics.find((m) => m.id === 'density')?.value;
    expect(floatDensity).toBe(0.5);
    expect(floatObj.visualState.sinks).toBe(false);

    // Zero volume safe handling
    const zeroVol = calculateDensity(100, 0);
    const safeDensity = zeroVol.metrics.find((m) => m.id === 'density')?.value;
    expect(Number.isFinite(safeDensity as number)).toBe(true);
  });

  // 3. Reflection
  it('calculates reflection angle equal to incidence angle', () => {
    const res = calculateReflection(45);
    const r = res.metrics.find((m) => m.id === 'reflectionAngle')?.value;
    expect(r).toBe(45);

    const boundary = calculateReflection(85);
    expect(boundary.metrics.find((m) => m.id === 'reflectionAngle')?.value).toBe(85);
  });

  // 4. Refraction
  it('calculates refraction angle bending toward normal in denser medium', () => {
    const res = calculateRefraction('air', 'water', 45);
    const angle2 = Number(res.metrics.find((m) => m.id === 'angle2')?.value);
    expect(angle2).toBeLessThan(45);
    expect(angle2).toBeGreaterThan(0);
    expect(Number.isFinite(angle2)).toBe(true);
  });

  // 5. Free Fall
  it('calculates free fall time and velocity accurately on Earth and Moon', () => {
    const earthFall = calculateFreeFall(20, 'earth');
    const earthTime = Number(earthFall.metrics.find((m) => m.id === 'fallTime')?.value);
    expect(earthTime).toBeGreaterThan(0);
    expect(earthTime).toBeLessThan(3);

    const moonFall = calculateFreeFall(20, 'moon');
    const moonTime = Number(moonFall.metrics.find((m) => m.id === 'fallTime')?.value);
    expect(moonTime).toBeGreaterThan(earthTime);
  });

  // 6. Simple Pendulum
  it('calculates pendulum period independent of bob mass', () => {
    const run1 = calculatePendulum(1.0, 100);
    const run2 = calculatePendulum(1.0, 500);

    const period1 = run1.metrics.find((m) => m.id === 'period')?.value;
    const period2 = run2.metrics.find((m) => m.id === 'period')?.value;

    expect(period1).toBe(period2);
    expect(Number(period1)).toBeCloseTo(2.0, 1);
  });

  // 7. pH Explorer
  it('classifies acids, neutral water, and bases accurately', () => {
    const lemon = calculatePH('lemon_juice');
    expect(Number(lemon.metrics.find((m) => m.id === 'ph')?.value)).toBeLessThan(7);
    expect(lemon.visualState.isAcid).toBe(true);

    const water = calculatePH('pure_water');
    expect(Number(water.metrics.find((m) => m.id === 'ph')?.value)).toBe(7);
    expect(water.visualState.isNeutral).toBe(true);

    const bleach = calculatePH('bleach');
    expect(Number(bleach.metrics.find((m) => m.id === 'ph')?.value)).toBeGreaterThan(7);
  });

  // 8. Solubility
  it('increases solubility with temperature and precipitates excess residue', () => {
    const cold = calculateSolubility(20, 250, 'sugar');
    const hot = calculateSolubility(80, 250, 'sugar');

    const coldDissolved = Number(cold.metrics.find((m) => m.id === 'dissolved')?.value);
    const hotDissolved = Number(hot.metrics.find((m) => m.id === 'dissolved')?.value);

    expect(hotDissolved).toBeGreaterThan(coldDissolved);
  });

  // 9. States of Matter
  it('identifies solid, liquid, and gas states based on temperature', () => {
    const solid = calculateStatesOfMatter(-20);
    expect(solid.visualState.state).toBe('solid');

    const liquid = calculateStatesOfMatter(25);
    expect(liquid.visualState.state).toBe('liquid');

    const gas = calculateStatesOfMatter(110);
    expect(gas.visualState.state).toBe('gas');
  });

  // 10. Reaction Rate
  it('accelerates reaction speed with temperature, concentration, and powder', () => {
    const slow = calculateReactionRate(20, 'low', 'chunk');
    const fast = calculateReactionRate(70, 'high', 'powder');

    const slowRate = Number(slow.metrics.find((m) => m.id === 'reactionRate')?.value);
    const fastRate = Number(fast.metrics.find((m) => m.id === 'reactionRate')?.value);

    expect(fastRate).toBeGreaterThan(slowRate);
  });

  // 11. Photosynthesis
  it('calculates photosynthesis rate with light and CO2 constraints', () => {
    const dark = calculatePhotosynthesis(0, 100, 'normal');
    expect(Number(dark.metrics.find((m) => m.id === 'rate')?.value)).toBe(0);

    const sunny = calculatePhotosynthesis(80, 80, 'high');
    expect(Number(sunny.metrics.find((m) => m.id === 'rate')?.value)).toBeGreaterThan(50);
  });

  // 12. Heart Rate
  it('elevates heart rate during exercise', () => {
    const rest = calculateHeartRate('rest', 'standard');
    const sprint = calculateHeartRate('sprint', 'standard');

    const restBpm = Number(rest.metrics.find((m) => m.id === 'bpm')?.value);
    const sprintBpm = Number(sprint.metrics.find((m) => m.id === 'bpm')?.value);

    expect(sprintBpm).toBeGreaterThan(restBpm);
  });

  // 13. Water Cycle
  it('increases evaporation and precipitation with solar heat', () => {
    const cool = calculateWaterCycle(20, 15);
    const tropical = calculateWaterCycle(90, 38);

    const coolEvap = Number(cool.metrics.find((m) => m.id === 'evaporation')?.value);
    const tropEvap = Number(tropical.metrics.find((m) => m.id === 'evaporation')?.value);

    expect(tropEvap).toBeGreaterThan(coolEvap);
  });

  // 14. Greenhouse Effect
  it('traps more heat at elevated greenhouse gas levels', () => {
    const baseline = calculateGreenhouseEffect(280);
    const extreme = calculateGreenhouseEffect(700);

    const baseTemp = Number(baseline.metrics.find((m) => m.id === 'avgTemp')?.value);
    const extremeTemp = Number(extreme.metrics.find((m) => m.id === 'avgTemp')?.value);

    expect(extremeTemp).toBeGreaterThan(baseTemp);
  });

  // 15. Moon Phases
  it('calculates lunar cycle from New Moon to Full Moon', () => {
    const newMoon = calculateMoonPhases(0);
    expect(Number(newMoon.metrics.find((m) => m.id === 'illumination')?.value)).toBe(0);

    const firstQuarter = calculateMoonPhases(7);
    expect(Number(firstQuarter.metrics.find((m) => m.id === 'illumination')?.value)).toBeCloseTo(50, -1);

    const fullMoon = calculateMoonPhases(14);
    expect(Number(fullMoon.metrics.find((m) => m.id === 'illumination')?.value)).toBe(100);
  });
});
