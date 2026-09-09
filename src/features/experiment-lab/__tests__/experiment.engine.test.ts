/**
 * Experiment Lab Engine Unit Tests
 */

import { EXPERIMENTS } from '../experiment.data';
import {
  getDefaultVariableValues,
  clampVariableValue,
  executeSimulation,
  evaluateActiveObservations,
  pickFeaturedExperiment,
  filterExperiments,
  computeLabStatistics,
} from '../experiment.engine';
import { ExperimentProgress } from '../experiment.types';

describe('Experiment Lab Engine', () => {
  const ohmsLaw = EXPERIMENTS.find((e) => e.id === 'exp-ohms-law')!;

  it('extracts default variable values correctly', () => {
    const defaults = getDefaultVariableValues(ohmsLaw);
    expect(defaults.voltage).toBe(6);
    expect(defaults.resistance).toBe(5);
  });

  it('clamps variable values within specified limits', () => {
    const voltageVar = ohmsLaw.variables.find((v) => v.id === 'voltage')!;
    expect(clampVariableValue(voltageVar, 20)).toBe(12); // Max is 12
    expect(clampVariableValue(voltageVar, -5)).toBe(1); // Min is 1
    expect(clampVariableValue(voltageVar, 8)).toBe(8);
  });

  it('executes simulation deterministically', () => {
    const run1 = executeSimulation(ohmsLaw, { voltage: 12, resistance: 6 });
    const run2 = executeSimulation(ohmsLaw, { voltage: 12, resistance: 6 });

    expect(run1).toEqual(run2);
    expect(run1.metrics.find((m) => m.id === 'current')?.value).toBe(2);
  });

  it('evaluates active observation rules when conditions are met', () => {
    const res = executeSimulation(ohmsLaw, { voltage: 10, resistance: 15 });
    const observations = evaluateActiveObservations(ohmsLaw, { voltage: 10, resistance: 15 }, res);

    expect(observations.length).toBeGreaterThanOrEqual(1);
    const hasHighR = observations.some((o) => o.id === 'high_resistance');
    expect(hasHighR).toBe(true);
  });

  it('picks today featured experiment deterministically based on dateKey', () => {
    const pick1 = pickFeaturedExperiment(EXPERIMENTS, '2026-09-05');
    const pick2 = pickFeaturedExperiment(EXPERIMENTS, '2026-09-05');
    const pickNextDay = pickFeaturedExperiment(EXPERIMENTS, '2026-09-06');

    expect(pick1.id).toBe(pick2.id);
    expect(pick1).toBeDefined();
    expect(pickNextDay).toBeDefined();
  });

  it('filters experiments by subject, search keyword, and completion status', () => {
    const progressMap: Record<string, ExperimentProgress> = {
      'exp-ohms-law': {
        experimentId: 'exp-ohms-law',
        status: 'completed',
        completed: true,
        runCount: 1,
        bookmarked: true,
      },
    };

    // Subject filter
    const physicsOnly = filterExperiments(
      EXPERIMENTS,
      { subject: 'physics', searchQuery: '', statusFilter: 'all' },
      progressMap,
      ['exp-ohms-law']
    );
    expect(physicsOnly.every((e) => e.subject === 'physics')).toBe(true);

    // Search query in English
    const searchOhm = filterExperiments(
      EXPERIMENTS,
      { subject: 'all', searchQuery: 'ohm', statusFilter: 'all' },
      progressMap,
      ['exp-ohms-law']
    );
    expect(searchOhm.length).toBeGreaterThanOrEqual(1);
    expect(searchOhm[0].id).toBe('exp-ohms-law');

    // Search query in Tamil
    const searchTamil = filterExperiments(
      EXPERIMENTS,
      { subject: 'all', searchQuery: 'ஓம் விதி', statusFilter: 'all' },
      progressMap,
      ['exp-ohms-law']
    );
    expect(searchTamil.length).toBeGreaterThanOrEqual(1);

    // Status filter
    const completedList = filterExperiments(
      EXPERIMENTS,
      { subject: 'all', searchQuery: '', statusFilter: 'completed' },
      progressMap,
      ['exp-ohms-law']
    );
    expect(completedList.length).toBe(1);
    expect(completedList[0].id).toBe('exp-ohms-law');
  });

  it('computes lab statistics accurately', () => {
    const progressMap: Record<string, ExperimentProgress> = {
      'exp-ohms-law': {
        experimentId: 'exp-ohms-law',
        status: 'completed',
        completed: true,
        runCount: 2,
        bookmarked: false,
      },
      'exp-density': {
        experimentId: 'exp-density',
        status: 'in_progress',
        completed: false,
        runCount: 1,
        bookmarked: false,
      },
    };

    const stats = computeLabStatistics(EXPERIMENTS, progressMap);
    expect(stats.completedCount).toBe(1);
    expect(stats.inProgressCount).toBe(1);
    expect(stats.totalCount).toBe(EXPERIMENTS.length);
  });
});
