/**
 * Riddle Evaluation Engine
 * Text normalization and deterministic answer matching.
 */

import { RiddleQuestion } from './riddle.types';
import { SupportedLanguage } from '../../config/i18n';

export function normalizeRiddleAnswer(input: string): string {
  if (!input) return '';

  let text = input.trim().toLowerCase();

  // Normalize multiple spaces into single space
  text = text.replace(/\s+/g, ' ');

  // Remove common surrounding punctuation
  text = text.replace(/^[.,!?;:'"()\-]+|[.,!?;:'"()\-]+$/g, '');

  // Strip English leading articles for flexible matching
  text = text.replace(/^(a|an|the)\s+/i, '');

  return text.trim();
}

export function checkRiddleAnswer(
  userInput: string,
  riddle: RiddleQuestion,
  language: SupportedLanguage = 'en'
): boolean {
  const normalizedInput = normalizeRiddleAnswer(userInput);
  if (!normalizedInput) return false;

  const candidateAnswers: string[] = [];

  // 1. Primary localized answer
  const isTamil = language === 'ta';
  candidateAnswers.push(isTamil ? riddle.answer.ta : riddle.answer.en);
  // Also include the other language primary answer for flexibility
  candidateAnswers.push(isTamil ? riddle.answer.en : riddle.answer.ta);

  // 2. Accepted answers aliases
  if (riddle.acceptedAnswers && riddle.acceptedAnswers.length > 0) {
    riddle.acceptedAnswers.forEach((alias) => {
      candidateAnswers.push(alias.en);
      candidateAnswers.push(alias.ta);
    });
  }

  // 3. Match against normalized candidates
  return candidateAnswers.some((candidate) => {
    const normalizedCandidate = normalizeRiddleAnswer(candidate);
    return normalizedCandidate === normalizedInput;
  });
}
