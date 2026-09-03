/**
 * Verification Script for Screen 21: Riddle Category Selection
 * Tests categories completeness, unique IDs, bilingual localization,
 * difficulty validation, and category resolution.
 */

import {
  RiddleDifficulty,
  RiddleCategory,
  getRiddleCategories,
  isValidRiddleDifficulty,
  resolveCategoryById,
  DEMO_RIDDLE_POINTS,
} from '../features/riddles';
import { getTranslation } from '../config/i18n';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ ${message}`);
  }
}

export function runRiddlesVerification() {
  console.log('\n--- STARTING SCREEN 21: RIDDLE CATEGORY SELECTION VERIFICATION ---\n');

  const categories = getRiddleCategories();

  // =========================================================================
  // 1. Difficulty & Category Completeness
  // =========================================================================
  console.log('[1] Verifying Category Dataset & Unique IDs:');

  assert(categories.length === 4, 'Exactly 4 riddle categories exist');

  const expectedDifficulties: RiddleDifficulty[] = ['easy', 'medium', 'hard', 'genius'];
  expectedDifficulties.forEach((diff) => {
    const found = categories.find((c) => c.id === diff);
    assert(Boolean(found), `Difficulty '${diff}' exists in category pool`);
  });

  const ids = categories.map((c) => c.id);
  const uniqueIds = new Set(ids);
  assert(uniqueIds.size === categories.length, 'All category IDs are strictly unique');

  // =========================================================================
  // 2. Bilingual Content Completeness
  // =========================================================================
  console.log('\n[2] Verifying Bilingual Category Copy:');

  categories.forEach((cat) => {
    assert(Boolean(cat.title.en && cat.title.en.length > 0), `Category '${cat.id}' has English title: ${cat.title.en}`);
    assert(Boolean(cat.title.ta && cat.title.ta.length > 0), `Category '${cat.id}' has Tamil title: ${cat.title.ta}`);
    assert(Boolean(cat.description.en && cat.description.en.length > 0), `Category '${cat.id}' has English description: ${cat.description.en}`);
    assert(Boolean(cat.description.ta && cat.description.ta.length > 0), `Category '${cat.id}' has Tamil description: ${cat.description.ta}`);
    assert(Boolean(cat.icon && cat.icon.length > 0), `Category '${cat.id}' has icon: ${cat.icon}`);
  });

  // =========================================================================
  // 3. Score & Progress Model Integrity
  // =========================================================================
  console.log('\n[3] Verifying Score & Progress Metrics:');

  categories.forEach((cat) => {
    assert(cat.score >= 0, `Category '${cat.id}' has valid non-negative score (${cat.score})`);
    assert(cat.totalAvailable > 0, `Category '${cat.id}' has valid total available count (${cat.totalAvailable})`);
    assert(cat.score <= cat.totalAvailable, `Category '${cat.id}' score is within total available bounds`);
  });

  assert(DEMO_RIDDLE_POINTS === 1250, 'Demo riddle points is 1250');

  // =========================================================================
  // 4. Validation and Resolution Utilities
  // =========================================================================
  console.log('\n[4] Verifying Utility Functions:');

  assert(isValidRiddleDifficulty('easy') === true, "'easy' is recognized as valid difficulty");
  assert(isValidRiddleDifficulty('medium') === true, "'medium' is recognized as valid difficulty");
  assert(isValidRiddleDifficulty('hard') === true, "'hard' is recognized as valid difficulty");
  assert(isValidRiddleDifficulty('genius') === true, "'genius' is recognized as valid difficulty");
  assert(isValidRiddleDifficulty('invalid') === false, "'invalid' is rejected safely");
  assert(isValidRiddleDifficulty(null) === false, 'null is rejected safely');

  const resolvedEasy = resolveCategoryById('easy');
  assert(resolvedEasy !== undefined && resolvedEasy.title.en === 'Easy', "resolveCategoryById('easy') returns Easy category");
  const resolvedGenius = resolveCategoryById('genius');
  assert(resolvedGenius !== undefined && resolvedGenius.icon === '🧠', "resolveCategoryById('genius') returns Genius category");
  const resolvedNull = resolveCategoryById(null);
  assert(resolvedNull === undefined, 'resolveCategoryById(null) safely returns undefined');

  // =========================================================================
  // 5. Localization Dictionaries Completeness
  // =========================================================================
  console.log('\n[5] Verifying i18n Dictionaries:');

  const en = getTranslation('en').riddles;
  const ta = getTranslation('ta').riddles;

  assert(en.headerTitle === 'Riddle Quiz', "English headerTitle is 'Riddle Quiz'");
  assert(ta.headerTitle === 'புதிர் வினாடி வினா', "Tamil headerTitle is 'புதிர் வினாடி வினா'");
  assert(en.chooseCategory === 'Choose a Category', "English chooseCategory is 'Choose a Category'");
  assert(ta.chooseCategory === 'ஒரு வகையைத் தேர்ந்தெடுக்கவும்', 'Tamil chooseCategory is localized');
  assert(en.startRiddle === 'Start Riddle', "English startRiddle is 'Start Riddle'");
  assert(ta.startRiddle === 'புதிரைத் தொடங்குங்கள்', "Tamil startRiddle is 'புதிரைத் தொடங்குங்கள்'");
  assert(Boolean(en.howToPlayTitle && en.howToPlayBody), 'English How to Play text present');
  assert(Boolean(ta.howToPlayTitle && ta.howToPlayBody), 'Tamil How to Play text present');

  console.log('\n🎉 ALL SCREEN 21 RIDDLE CATEGORY VERIFICATIONS PASSED SUCCESSFULLY!\n');
}

runRiddlesVerification();
