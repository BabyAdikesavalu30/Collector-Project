/**
 * Quiz Result In-Memory Store
 * Holds active result payload and detailed reviewed questions for Screen 20 (/quiz-result & /quiz-review).
 */

import { QuizResult, ReviewedQuestion } from './quiz.types';

class QuizResultStore {
  private lastResult: QuizResult | null = null;
  private reviewedQuestions: ReviewedQuestion[] = [];

  public setResult(result: QuizResult, questions: ReviewedQuestion[]) {
    this.lastResult = result;
    this.reviewedQuestions = questions;
  }

  public getResult(): QuizResult | null {
    return this.lastResult;
  }

  public getReviewedQuestions(): ReviewedQuestion[] {
    return [...this.reviewedQuestions];
  }

  public clear() {
    this.lastResult = null;
    this.reviewedQuestions = [];
  }
}

export const quizResultStore = new QuizResultStore();
