/**
 * Localization and Emotional UX Tests for Weak Areas
 * Validates English & Tamil parity, non-shaming phrasing, and template interpolation.
 */

import { getWeakAreasI18n, interpolate } from '../../../components/weak-areas/weakAreas.i18n';

describe('Weak Areas Localization & Emotional UX', () => {
  const en = getWeakAreasI18n('en');
  const ta = getWeakAreasI18n('ta');

  describe('English and Tamil Parity (Sections 50 & 82)', () => {
    it('provides valid non-empty title and header copy in both languages', () => {
      expect(en.title).toBeTruthy();
      expect(ta.title).toBeTruthy();
      expect(en.subtitle).toBeTruthy();
      expect(ta.subtitle).toBeTruthy();
      expect(en.intro).toBeTruthy();
      expect(ta.intro).toBeTruthy();
    });

    it('has identical top-level keys in both English and Tamil dictionaries', () => {
      const enKeys = Object.keys(en).sort();
      const taKeys = Object.keys(ta).sort();
      expect(enKeys).toEqual(taKeys);
    });

    it('translates all subject labels without undefined entries', () => {
      const subjects = ['physics', 'chemistry', 'biology', 'space', 'environment', 'human-body', 'everyday-science'];
      for (const s of subjects) {
        expect(en.subjects[s]).toBeTruthy();
        expect(ta.subjects[s]).toBeTruthy();
      }
    });

    it('translates all action buttons and status labels', () => {
      expect(en.learnIn2Min).toBeTruthy();
      expect(ta.learnIn2Min).toBeTruthy();
      expect(en.seeBigPicture).toBeTruthy();
      expect(ta.seeBigPicture).toBeTruthy();
      expect(en.tryExperiment).toBeTruthy();
      expect(ta.tryExperiment).toBeTruthy();
      expect(en.practiceQuestions).toBeTruthy();
      expect(ta.practiceQuestions).toBeTruthy();
      expect(en.continueLearning).toBeTruthy();
      expect(ta.continueLearning).toBeTruthy();
      expect(en.statusNeedsPractice).toBeTruthy();
      expect(ta.statusNeedsPractice).toBeTruthy();
      expect(en.statusBuildConfidence).toBeTruthy();
      expect(ta.statusBuildConfidence).toBeTruthy();
      expect(en.statusPracticeSuggested).toBeTruthy();
      expect(ta.statusPracticeSuggested).toBeTruthy();
    });

    it('translates all trend states', () => {
      expect(en.trendImproving).toBeTruthy();
      expect(ta.trendImproving).toBeTruthy();
      expect(en.trendStable).toBeTruthy();
      expect(ta.trendStable).toBeTruthy();
      expect(en.trendDeclining).toBeTruthy();
      expect(ta.trendDeclining).toBeTruthy();
      expect(en.trendInsufficient).toBeTruthy();
      expect(ta.trendInsufficient).toBeTruthy();
    });

    it('provides accessibility strings in both languages', () => {
      expect(en.accessibility.focusAreaCard).toBeTruthy();
      expect(ta.accessibility.focusAreaCard).toBeTruthy();
      expect(en.accessibility.trendIndicator).toBeTruthy();
      expect(ta.accessibility.trendIndicator).toBeTruthy();
      expect(en.accessibility.progressBar).toBeTruthy();
      expect(ta.accessibility.progressBar).toBeTruthy();
      expect(en.accessibility.improvement).toBeTruthy();
      expect(ta.accessibility.improvement).toBeTruthy();
    });
  });

  describe('Non-Shaming & Child-Friendly Copy (Sections 1, 44, 88)', () => {
    it('does not contain prohibited shaming vocabulary in English UI strings', () => {
      const allEnText = JSON.stringify(en).toLowerCase();
      const bannedWords = [
        'weak student',
        'poor performance',
        'failed topic',
        'bad at physics',
        'bad at science',
        'failure',
        'low student',
        'below average',
        'you are bad',
        'you failed',
      ];
      for (const word of bannedWords) {
        expect(allEnText).not.toContain(word);
      }
    });

    it('contains positive growth-oriented phrases in both languages', () => {
      expect(en.statusBuildConfidence).toContain('Confidence');
      expect(en.gettingStronger).toContain('STRONGER');
      expect(ta.gettingStronger).toBeTruthy();
      expect(en.keepExploring).toContain('exploring');
    });
  });

  describe('Template Interpolation helper', () => {
    it('substitutes multiple named parameters correctly', () => {
      const template = 'You answered {incorrect} of your last {total} questions incorrectly.';
      const result = interpolate(template, { incorrect: '2', total: '5' });
      expect(result).toBe('You answered 2 of your last 5 questions incorrectly.');
    });

    it('preserves missing placeholders cleanly without crashing', () => {
      const template = 'Score: {score}, Grade: {grade}';
      const result = interpolate(template, { score: '95' });
      expect(result).toBe('Score: 95, Grade: {grade}');
    });
  });
});
