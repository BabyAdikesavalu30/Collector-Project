/**
 * Experiment Lab Feature React Hooks
 * Clean state management for the Lab Hub and Experiment Detail/Simulation view.
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Experiment,
  ExperimentProgress,
  ExperimentFilterState,
  SimulationResult,
  RunSnapshot,
  ExperimentObservationRule,
} from './experiment.types';
import { experimentRepository } from './experiment.repository';
import {
  getDefaultVariableValues,
  clampVariableValue,
  executeSimulation,
  evaluateActiveObservations,
  filterExperiments,
  computeLabStatistics,
} from './experiment.engine';

export function useExperimentLabHub() {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [featuredExperiment, setFeaturedExperiment] = useState<Experiment | null>(null);
  const [progressMap, setProgressMap] = useState<Record<string, ExperimentProgress>>({});
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filterState, setFilterState] = useState<ExperimentFilterState>({
    subject: 'all',
    searchQuery: '',
    statusFilter: 'all',
  });

  const loadHubData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [allExp, featured, allProg, allBookmarks] = await Promise.all([
        experimentRepository.getAllExperiments(),
        experimentRepository.getFeaturedExperiment(),
        experimentRepository.getAllProgress(),
        experimentRepository.getBookmarks(),
      ]);

      setExperiments(allExp);
      setFeaturedExperiment(featured);
      setProgressMap(allProg);
      setBookmarks(allBookmarks);
    } catch {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHubData();
  }, [loadHubData]);

  const filteredExperiments = useMemo(() => {
    return filterExperiments(experiments, filterState, progressMap, bookmarks);
  }, [experiments, filterState, progressMap, bookmarks]);

  const stats = useMemo(() => {
    return computeLabStatistics(experiments, progressMap);
  }, [experiments, progressMap]);

  const toggleBookmark = useCallback(async (experimentId: string) => {
    const isBookmarked = await experimentRepository.toggleBookmark(experimentId);
    setBookmarks((prev) => {
      const set = new Set(prev);
      if (isBookmarked) set.add(experimentId);
      else set.delete(experimentId);
      return Array.from(set);
    });
  }, []);

  return {
    experiments: filteredExperiments,
    allExperiments: experiments,
    featuredExperiment,
    progressMap,
    bookmarks,
    filterState,
    stats,
    isLoading,
    setSubjectFilter: (subject: ExperimentFilterState['subject']) =>
      setFilterState((prev) => ({ ...prev, subject })),
    setSearchQuery: (searchQuery: string) =>
      setFilterState((prev) => ({ ...prev, searchQuery })),
    setStatusFilter: (statusFilter: ExperimentFilterState['statusFilter']) =>
      setFilterState((prev) => ({ ...prev, statusFilter })),
    toggleBookmark,
    refresh: loadHubData,
  };
}

export function useExperimentDetail(experimentId: string) {
  const [experiment, setExperiment] = useState<Experiment | null>(null);
  const [progress, setProgress] = useState<ExperimentProgress | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Active variable inputs
  const [variables, setVariables] = useState<Record<string, unknown>>({});

  // Simulation output
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [activeObservations, setActiveObservations] = useState<ExperimentObservationRule[]>([]);

  // Comparison snapshots (Run A vs Current Run B)
  const [runA, setRunA] = useState<RunSnapshot | null>(null);
  const [isComparing, setIsComparing] = useState(false);

  // Reflection quiz state
  const [selectedReflectionOption, setSelectedReflectionOption] = useState<string | null>(null);
  const [reflectionFeedback, setReflectionFeedback] = useState<{ isCorrect: boolean; show: boolean }>({
    isCorrect: false,
    show: false,
  });

  // Completion state
  const [isCompleting, setIsCompleting] = useState(false);
  const [completionResult, setCompletionResult] = useState<{ xpEarned: number; newlyCompleted: boolean } | null>(null);

  const loadExperiment = useCallback(async () => {
    setIsLoading(true);
    try {
      const [exp, prog, bookmarks] = await Promise.all([
        experimentRepository.getExperimentById(experimentId),
        experimentRepository.getExperimentProgress(experimentId),
        experimentRepository.getBookmarks(),
      ]);

      if (exp) {
        setExperiment(exp);
        setIsBookmarked(bookmarks.includes(experimentId));
        setProgress(prog);

        // Initialize variables with last values or catalog defaults
        const defaults = getDefaultVariableValues(exp);
        const initialVars = prog?.lastVariableValues ? { ...defaults, ...prog.lastVariableValues } : defaults;
        setVariables(initialVars);

        // Run initial simulation
        const simResult = executeSimulation(exp, initialVars);
        setResult(simResult);

        const observations = evaluateActiveObservations(exp, initialVars, simResult);
        setActiveObservations(observations);

        if (prog?.reflectionAnswered) {
          setSelectedReflectionOption(exp.reflectionQuestion.correctOptionId);
          setReflectionFeedback({ isCorrect: true, show: true });
        }
      }
    } catch {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  }, [experimentId]);

  useEffect(() => {
    loadExperiment();
  }, [loadExperiment]);

  // Update a single variable
  const updateVariable = useCallback(
    (variableId: string, value: unknown) => {
      if (!experiment) return;

      const variableDef = experiment.variables.find((v) => v.id === variableId);
      if (!variableDef) return;

      const clampedValue = clampVariableValue(variableDef, value);
      const nextVars = { ...variables, [variableId]: clampedValue };
      setVariables(nextVars);

      const simResult = executeSimulation(experiment, nextVars);
      setResult(simResult);

      const obs = evaluateActiveObservations(experiment, nextVars, simResult);
      setActiveObservations(obs);

      // Persist latest variable values
      experimentRepository.updateVariableValues(experiment.id, nextVars).catch(() => {});
    },
    [experiment, variables]
  );

  // Snapshot current state as Run A
  const snapshotRunA = useCallback(() => {
    if (!result) return;
    setRunA({
      runLabel: 'Run A',
      variables: { ...variables },
      result: { ...result },
      timestamp: Date.now(),
    });
    setIsComparing(true);
  }, [variables, result]);

  const clearComparison = useCallback(() => {
    setRunA(null);
    setIsComparing(false);
  }, []);

  // Answer reflection
  const answerReflection = useCallback(
    (optionId: string) => {
      if (!experiment) return;
      setSelectedReflectionOption(optionId);
      const isCorrect = optionId === experiment.reflectionQuestion.correctOptionId;
      setReflectionFeedback({ isCorrect, show: true });
    },
    [experiment]
  );

  // Complete simulation
  const completeCurrentExperiment = useCallback(async () => {
    if (!experiment || isCompleting) return;
    setIsCompleting(true);
    try {
      const res = await experimentRepository.completeExperiment(experiment, variables);
      setCompletionResult(res);
      const updatedProg = await experimentRepository.getExperimentProgress(experiment.id);
      setProgress(updatedProg);
    } catch {
      // Fallback
    } finally {
      setIsCompleting(false);
    }
  }, [experiment, variables, isCompleting]);

  // Toggle bookmark
  const toggleBookmark = useCallback(async () => {
    if (!experiment) return;
    const newState = await experimentRepository.toggleBookmark(experiment.id);
    setIsBookmarked(newState);
  }, [experiment]);

  // Reset to default variables
  const resetToDefaults = useCallback(() => {
    if (!experiment) return;
    const defaults = getDefaultVariableValues(experiment);
    setVariables(defaults);
    const simResult = executeSimulation(experiment, defaults);
    setResult(simResult);
    const obs = evaluateActiveObservations(experiment, defaults, simResult);
    setActiveObservations(obs);
  }, [experiment]);

  return {
    experiment,
    progress,
    isBookmarked,
    isLoading,
    variables,
    result,
    activeObservations,
    runA,
    isComparing,
    selectedReflectionOption,
    reflectionFeedback,
    completionResult,
    isCompleting,
    updateVariable,
    snapshotRunA,
    clearComparison,
    answerReflection,
    completeCurrentExperiment,
    toggleBookmark,
    resetToDefaults,
  };
}
