import { useState, useCallback, useRef, useEffect } from 'react';
import { ELEMENT_MATCH_LEVELS } from './element-match.levels';
import { checkElementMatch, isElementMatchComplete, calculateElementScore } from './element-match.engine';
import { saveLevelCompletion } from '../games.storage';
import { GameStatus } from '../games.types';

export function useElementMatchGame(initialLevel: number = 0) {
  const [levelIndex, setLevelIndex] = useState<number>(initialLevel);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [status, setStatus] = useState<GameStatus>('ready');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [stars, setStars] = useState<1 | 2 | 3>(1);
  const elapsedRef = useRef<number>(0);

  const level = ELEMENT_MATCH_LEVELS[levelIndex] || ELEMENT_MATCH_LEVELS[0];

  const resetGame = useCallback(() => {
    setSelectedSymbol(null);
    setSelectedName(null);
    setMatchedIds([]);
    setMistakes(0);
    setMoves(0);
    setIsCompleted(false);
    setStatus('playing');
    setScore(0);
    elapsedRef.current = 0;
  }, []);

  const loadLevel = useCallback((idx: number) => {
    const validIdx = Math.max(0, Math.min(idx, ELEMENT_MATCH_LEVELS.length - 1));
    setLevelIndex(validIdx);
    setSelectedSymbol(null);
    setSelectedName(null);
    setMatchedIds([]);
    setMistakes(0);
    setMoves(0);
    setIsCompleted(false);
    setStatus('playing');
    elapsedRef.current = 0;
  }, []);

  const nextLevel = useCallback(() => {
    if (levelIndex < ELEMENT_MATCH_LEVELS.length - 1) {
      loadLevel(levelIndex + 1);
    }
  }, [levelIndex, loadLevel]);

  const handleSelectSymbol = useCallback((id: string) => {
    if (matchedIds.includes(id) || isCompleted) return;
    setStatus('playing');

    if (selectedName) {
      // Check match
      setMoves((m) => m + 1);
      if (checkElementMatch(id, selectedName)) {
        const nextMatched = [...matchedIds, id];
        setMatchedIds(nextMatched);
        setSelectedSymbol(null);
        setSelectedName(null);
        if (isElementMatchComplete(nextMatched, level)) {
          setIsCompleted(true);
          setStatus('completed');
          const outcome = calculateElementScore(moves + 1, mistakes, elapsedRef.current, level.elements.length);
          setScore(outcome.score);
          setStars(outcome.stars);
          saveLevelCompletion('element-match', levelIndex, level.id, {
            score: outcome.score,
            stars: outcome.stars,
            isPerfect: outcome.isPerfect,
            bestMoves: moves + 1,
            bestTimeSeconds: elapsedRef.current,
          });
        }
      } else {
        setMistakes((m) => m + 1);
        setSelectedSymbol(null);
        setSelectedName(null);
      }
    } else {
      setSelectedSymbol(id === selectedSymbol ? null : id);
    }
  }, [matchedIds, isCompleted, selectedName, selectedSymbol, level, moves, mistakes, levelIndex]);

  const handleSelectName = useCallback((id: string) => {
    if (matchedIds.includes(id) || isCompleted) return;
    setStatus('playing');

    if (selectedSymbol) {
      // Check match
      setMoves((m) => m + 1);
      if (checkElementMatch(selectedSymbol, id)) {
        const nextMatched = [...matchedIds, id];
        setMatchedIds(nextMatched);
        setSelectedSymbol(null);
        setSelectedName(null);
        if (isElementMatchComplete(nextMatched, level)) {
          setIsCompleted(true);
          setStatus('completed');
          const outcome = calculateElementScore(moves + 1, mistakes, elapsedRef.current, level.elements.length);
          setScore(outcome.score);
          setStars(outcome.stars);
          saveLevelCompletion('element-match', levelIndex, level.id, {
            score: outcome.score,
            stars: outcome.stars,
            isPerfect: outcome.isPerfect,
            bestMoves: moves + 1,
            bestTimeSeconds: elapsedRef.current,
          });
        }
      } else {
        setMistakes((m) => m + 1);
        setSelectedSymbol(null);
        setSelectedName(null);
      }
    } else {
      setSelectedName(id === selectedName ? null : id);
    }
  }, [matchedIds, isCompleted, selectedSymbol, selectedName, level, moves, mistakes, levelIndex]);

  const handleTimeUpdate = useCallback((seconds: number) => {
    elapsedRef.current = seconds;
  }, []);

  return {
    level,
    levelIndex,
    totalLevels: ELEMENT_MATCH_LEVELS.length,
    selectedSymbol,
    selectedName,
    matchedIds,
    mistakes,
    moves,
    status,
    isCompleted,
    score,
    stars,
    handleSelectSymbol,
    handleSelectName,
    handleTimeUpdate,
    resetGame,
    nextLevel,
    loadLevel,
  };
}
