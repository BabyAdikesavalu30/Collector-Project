/**
 * Experiment Lab Feature Engine
 * Pure evaluation engine for simulation execution, variable clamping, observation detection,
 * deterministic daily featured simulation picking, filtering, and stats.
 */

import {
  Experiment,
  ExperimentVariable,
  SimulationResult,
  ExperimentObservationRule,
  ExperimentFilterState,
  ExperimentProgress,
} from './experiment.types';
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
} from './experiment.formulas';

/** Extracts default variable key-value pairs from an experiment definition. */
export function getDefaultVariableValues(experiment: Experiment): Record<string, unknown> {
  const values: Record<string, unknown> = {};
  for (const v of experiment.variables) {
    values[v.id] = v.defaultValue;
  }
  return values;
}

/** Clamps or validates an updated variable value against its definition bounds. */
export function clampVariableValue(variable: ExperimentVariable, value: unknown): unknown {
  if (variable.type === 'slider' || variable.type === 'stepper') {
    const num = Number(value);
    if (isNaN(num)) return variable.defaultValue;
    const min = variable.min ?? 0;
    const max = variable.max ?? 100;
    return clamp(num, min, max);
  }

  if (variable.type === 'segmented') {
    if (variable.options && variable.options.length > 0) {
      const valid = variable.options.some((o) => o.value === value);
      if (valid) return value;
    }
    return variable.defaultValue;
  }

  if (variable.type === 'toggle') {
    return Boolean(value);
  }

  return value;
}

/**
 * Deterministically executes a simulation based on experiment.simulationId
 * and active variable values.
 */
export function executeSimulation(
  experiment: Experiment,
  variables: Record<string, unknown>
): SimulationResult {
  const vars = { ...getDefaultVariableValues(experiment), ...variables };

  switch (experiment.simulationId) {
    case 'ohms_law':
      return calculateOhmsLaw(Number(vars.voltage), Number(vars.resistance));

    case 'density':
      return calculateDensity(Number(vars.mass), Number(vars.volume));

    case 'reflection':
      return calculateReflection(Number(vars.angle));

    case 'refraction':
      return calculateRefraction('air', String(vars.medium2 || 'water'), Number(vars.angle));

    case 'free_fall':
      return calculateFreeFall(Number(vars.height), String(vars.planet || 'earth'));

    case 'pendulum':
      return calculatePendulum(Number(vars.length), Number(vars.mass));

    case 'ph_explorer':
      return calculatePH(String(vars.substance || 'pure_water'));

    case 'solubility':
      return calculateSolubility(Number(vars.temperature), Number(vars.soluteGrams), 'sugar');

    case 'states_of_matter':
      return calculateStatesOfMatter(Number(vars.temperature));

    case 'reaction_rate':
      return calculateReactionRate(
        Number(vars.temperature),
        String(vars.concentration || 'medium'),
        String(vars.surfaceArea || 'granules')
      );

    case 'photosynthesis':
      return calculatePhotosynthesis(
        Number(vars.lightIntensity),
        Number(vars.co2Level),
        String(vars.waterSupply || 'normal')
      );

    case 'heart_rate':
      return calculateHeartRate(String(vars.activity || 'rest'), String(vars.fitness || 'standard'));

    case 'water_cycle':
      return calculateWaterCycle(Number(vars.sunlight), Number(vars.temperature));

    case 'greenhouse_effect':
      return calculateGreenhouseEffect(Number(vars.ghgPpm));

    case 'moon_phases':
      return calculateMoonPhases(Number(vars.orbitDay));

    default:
      return {
        metrics: [],
        visualState: vars,
        summaryText: {
          en: 'Simulation active with default parameters.',
          ta: 'இயல்புநிலை அளவுருக்களுடன் மாதிரி இயங்குகிறது.',
        },
      };
  }
}

/** Evaluates all observation rules against the current simulation result. */
export function evaluateActiveObservations(
  experiment: Experiment,
  variables: Record<string, unknown>,
  result: SimulationResult
): ExperimentObservationRule[] {
  return experiment.observations.filter((obs) => {
    try {
      return obs.condition(variables, result);
    } catch {
      return false;
    }
  });
}

/** Local YYYY-MM-DD string for deterministic daily selection */
export function getTodayDateKey(timestamp: number = Date.now()): string {
  const d = new Date(timestamp);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Deterministically picks today's featured experiment from the catalog. */
export function pickFeaturedExperiment(
  experiments: Experiment[],
  dateKey: string = getTodayDateKey()
): Experiment {
  if (experiments.length === 0) {
    throw new Error('Cannot pick featured experiment from empty catalog.');
  }

  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = (hash * 33 + dateKey.charCodeAt(i)) & 0x7fffffff;
  }
  const index = hash % experiments.length;
  return experiments[index];
}

/** Filters catalog by subject, search keyword, and completion status. */
export function filterExperiments(
  experiments: Experiment[],
  filter: ExperimentFilterState,
  progressMap: Record<string, ExperimentProgress>,
  bookmarks: string[]
): Experiment[] {
  const bookmarkSet = new Set(bookmarks);
  const query = filter.searchQuery.trim().toLowerCase();

  return experiments.filter((exp) => {
    // Subject filter
    if (filter.subject !== 'all' && exp.subject !== filter.subject) {
      return false;
    }

    // Status / Bookmark filter
    const prog = progressMap[exp.id];
    if (filter.statusFilter === 'completed' && !prog?.completed) {
      return false;
    }
    if (filter.statusFilter === 'in_progress' && (prog?.status !== 'in_progress' || prog?.completed)) {
      return false;
    }
    if (filter.statusFilter === 'not_started' && prog && prog.status !== 'not_started') {
      return false;
    }
    if (filter.statusFilter === 'bookmarked' && !bookmarkSet.has(exp.id)) {
      return false;
    }

    // Search query
    if (query) {
      const matchTitle = exp.title.en.toLowerCase().includes(query) || exp.title.ta.toLowerCase().includes(query);
      const matchSub = exp.subtitle.en.toLowerCase().includes(query) || exp.subtitle.ta.toLowerCase().includes(query);
      const matchDesc = exp.description.en.toLowerCase().includes(query) || exp.description.ta.toLowerCase().includes(query);
      const matchTags = exp.tags.some((t) => t.toLowerCase().includes(query));
      if (!matchTitle && !matchSub && !matchDesc && !matchTags) {
        return false;
      }
    }

    return true;
  });
}

/** Computes completed, in-progress, and total stats. */
export function computeLabStatistics(
  experiments: Experiment[],
  progressMap: Record<string, ExperimentProgress>
): { completedCount: number; inProgressCount: number; totalCount: number } {
  let completedCount = 0;
  let inProgressCount = 0;

  for (const exp of experiments) {
    const prog = progressMap[exp.id];
    if (prog?.completed) {
      completedCount++;
    } else if (prog?.status === 'in_progress') {
      inProgressCount++;
    }
  }

  return {
    completedCount,
    inProgressCount,
    totalCount: experiments.length,
  };
}
