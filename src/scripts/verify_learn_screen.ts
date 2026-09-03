/**
 * Screen 17 — Learn Screen & Pathways Automated Verification Suite
 */

import {
  LEARNING_LEVELS,
  LEARNING_SUBJECTS,
  LEARNING_PATHWAYS,
  mapGradeToLevelId,
  getPathwaysForSelection,
} from '../features/learn';
import { getTranslation } from '../config/i18n';

interface TestResult {
  name: string;
  passed: boolean;
  details?: string;
}

const results: TestResult[] = [];

function assert(condition: boolean, name: string, details?: string) {
  results.push({ name, passed: condition, details });
  const icon = condition ? '✅ PASS' : '❌ FAIL';
  console.log(`[${icon}] ${name}${details ? ` (${details})` : ''}`);
}

async function runLearnScreenTests() {
  console.log('====================================================');
  console.log('SCREEN 17 — LEARN SCREEN VERIFICATION SUITE');
  console.log('====================================================\n');

  // 1. Level Contracts
  console.log('--- Phase 1: Level Contracts ---');
  assert(
    LEARNING_LEVELS.length === 3 &&
    LEARNING_LEVELS[0].id === 'foundation' &&
    LEARNING_LEVELS[1].id === 'core' &&
    LEARNING_LEVELS[2].id === 'advanced',
    '3-Tier Educational Level Contract',
    'Foundation (6-7), Core (8-10), Advanced (11-12)'
  );

  // 2. Subject Contracts
  console.log('\n--- Phase 2: Subject Contracts ---');
  assert(
    LEARNING_SUBJECTS.length === 3 &&
    LEARNING_SUBJECTS.some((s) => s.id === 'physics') &&
    LEARNING_SUBJECTS.some((s) => s.id === 'chemistry') &&
    LEARNING_SUBJECTS.some((s) => s.id === 'biology'),
    'Standard Science Subjects Contract',
    'Physics, Chemistry, Biology'
  );

  const biology = LEARNING_SUBJECTS.find((s) => s.id === 'biology');
  assert(
    biology?.subspecialties === 'Botany & Zoology',
    'Biology Advanced Specialty Support',
    'Botany & Zoology'
  );

  // 3. Learning Pathways Filtering
  console.log('\n--- Phase 3: Pathway Filtering ---');
  const phyFoundation = getPathwaysForSelection('physics', 'foundation');
  const phyCore = getPathwaysForSelection('physics', 'core');
  const chemAdvanced = getPathwaysForSelection('chemistry', 'advanced');

  assert(
    phyFoundation.length > 0 && phyFoundation.every((p) => p.subjectId === 'physics' && p.levelId === 'foundation'),
    'Physics Foundation Pathways Filter',
    `${phyFoundation.length} pathways found (e.g. ${phyFoundation[0].title})`
  );

  assert(
    phyCore.length > 0 && phyCore.some((p) => p.title === 'Force & Laws of Motion'),
    'Physics Core Pathways Filter',
    `${phyCore.length} pathways found including Force & Laws of Motion`
  );

  assert(
    chemAdvanced.length > 0 && chemAdvanced.some((p) => p.title === 'Organic Chemistry & Hydrocarbons'),
    'Chemistry Advanced Pathways Filter',
    `${chemAdvanced.length} pathways found including Organic Chemistry`
  );

  // 4. Grade-to-Level Auto Mapping
  console.log('\n--- Phase 4: Profile Grade Auto-Mapping ---');
  assert(mapGradeToLevelId('Grade 6') === 'foundation', 'Map Grade 6 -> Foundation');
  assert(mapGradeToLevelId('Grade 7') === 'foundation', 'Map Grade 7 -> Foundation');
  assert(mapGradeToLevelId('Grade 8') === 'core', 'Map Grade 8 -> Core');
  assert(mapGradeToLevelId('Grade 9') === 'core', 'Map Grade 9 -> Core');
  assert(mapGradeToLevelId('Class 10') === 'core', 'Map Class 10 -> Core');
  assert(mapGradeToLevelId('Grade 11') === 'advanced', 'Map Grade 11 -> Advanced');
  assert(mapGradeToLevelId('Grade 12') === 'advanced', 'Map Grade 12 -> Advanced');
  assert(mapGradeToLevelId(null) === null, 'Map null grade -> null');
  assert(mapGradeToLevelId('College') === null, 'Map unparsed grade -> null');

  // 5. Localization
  console.log('\n--- Phase 5: Bilingual Localization ---');
  const en = getTranslation('en').learnScreen;
  const ta = getTranslation('ta').learnScreen;

  assert(
    en.headerTitle === 'Learn Science' &&
    en.introTitle === 'Choose Your Learning Path' &&
    en.levelSectionTitle === 'Choose Your Level' &&
    en.subjectSectionTitle === 'Choose a Subject' &&
    en.pathwaySectionTitle === 'Start Learning' &&
    en.continueCta === 'Continue to Quiz Setup' &&
    en.foundation === 'Foundation' &&
    en.core === 'Core Learning' &&
    en.advanced === 'Advanced',
    'English LearnScreen Localization Completeness',
    'All required UI keys present'
  );

  assert(
    ta.headerTitle === 'அறிவியல் கற்போம்' &&
    ta.introTitle === 'உங்கள் கற்றல் பாதையைத் தேர்ந்தெடுக்கவும்' &&
    ta.levelSectionTitle === 'வகுப்பு நிலையைத் தேர்ந்தெடுக்கவும்' &&
    ta.subjectSectionTitle === 'பாடத்தைத் தேர்ந்தெடுக்கவும்' &&
    ta.pathwaySectionTitle === 'கற்றலைத் தொடங்குங்கள்' &&
    ta.continueCta === 'வினாடி வினா அமைப்புக்குச் செல்க' &&
    ta.foundation === 'அடிப்படை நிலை' &&
    ta.core === 'முதன்மை நிலை' &&
    ta.advanced === 'மேல்நிலை',
    'Tamil LearnScreen Localization Completeness',
    'All required Tamil UI keys present'
  );

  // Summary
  console.log('\n====================================================');
  const allPassed = results.every((r) => r.passed);
  if (allPassed) {
    console.log(`🎉 ALL ${results.length} LEARN SCREEN TESTS PASSED SUCCESSFULLY!`);
  } else {
    console.log(`⚠️ ${results.filter((r) => !r.passed).length} TESTS FAILED!`);
  }
  console.log('====================================================\n');
}

runLearnScreenTests();
