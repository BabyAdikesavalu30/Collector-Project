/**
 * Riddle Result In-Memory Store
 * Holds active result payload for Screen 23 (/riddle-result).
 */

import { RiddleResult } from './riddle.types';

class RiddleResultStore {
  private lastResult: RiddleResult | null = null;

  public setResult(result: RiddleResult) {
    this.lastResult = result;
  }

  public getResult(): RiddleResult | null {
    return this.lastResult;
  }

  public clear() {
    this.lastResult = null;
  }
}

export const riddleResultStore = new RiddleResultStore();
