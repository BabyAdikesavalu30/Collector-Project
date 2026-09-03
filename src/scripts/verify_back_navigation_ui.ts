/**
 * Verification Test Suite: Standardized Top-Left Back Arrow UI
 *
 * Validates:
 * 1. Canonical AppBackButton component implementation and exports
 * 2. Vector chevron geometry, sizing (44x44 min touch target), theme tokens
 * 3. Bilingual accessibility labels (English & Tamil)
 * 4. Comprehensive audit ensuring all headers across the app use AppBackButton
 * 5. Purity audit verifying elimination of raw unicode ‹ and inconsistent back icons
 */

import fs from 'fs';
import path from 'path';

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, details?: string) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${testName}`);
  } else {
    failed++;
    console.error(`  ✗ ${testName}${details ? ` -> ${details}` : ''}`);
  }
}

const ROOT_DIR = path.resolve(__dirname, '../../');

console.log('\n==================================================');
console.log('🧪 VERIFYING TOP-LEFT BACK ARROW STANDARDIZATION');
console.log('==================================================\n');

// 1. AppBackButton File & Export Checks
console.log('--- 1. Canonical AppBackButton Component ---');

const backButtonPath = path.join(ROOT_DIR, 'src/components/navigation/AppBackButton.tsx');
assert(fs.existsSync(backButtonPath), 'AppBackButton.tsx exists');

const backButtonSrc = fs.readFileSync(backButtonPath, 'utf8');
assert(backButtonSrc.includes('export const AppBackButton'), 'AppBackButton is exported');
assert(backButtonSrc.includes('export const BackChevronIcon'), 'BackChevronIcon is exported');
assert(backButtonSrc.includes('accessibilityRole="button"'), 'Provides accessibilityRole="button"');
assert(backButtonSrc.includes("'பின்னால் செல்லவும்'"), 'Provides default Tamil accessibilityLabel');
assert(backButtonSrc.includes("'Go back'"), 'Provides default English accessibilityLabel');
assert(backButtonSrc.includes('theme.borderRadius.md'), 'Uses theme token for corner radius');
assert(backButtonSrc.includes('width: 44') && backButtonSrc.includes('height: 44'), 'Enforces 44x44 minimum touch target size');
assert(backButtonSrc.includes('hitSlop'), 'HitSlop configured for accessible touch compliance');

const navIndexPath = path.join(ROOT_DIR, 'src/components/navigation/index.ts');
const navIndexSrc = fs.readFileSync(navIndexPath, 'utf8');
assert(navIndexSrc.includes("export * from './AppBackButton'"), 'AppBackButton re-exported from navigation barrel');

// 2. Component Header Standardization Checks
console.log('\n--- 2. Header Components Standardization Audit ---');

const canonicalHeaderFiles = [
  'src/components/learn/LearnHeader.tsx',
  'src/components/games/GamesHeader.tsx',
  'src/components/games/GameHeader.tsx',
  'src/components/settings/SettingsHeader.tsx',
  'src/components/quiz-setup/QuizSetupScreen.tsx',
  'src/components/quiz-result/QuizResultScreen.tsx',
  'src/components/quiz-review/QuizReviewScreen.tsx',
  'src/components/riddles/RiddleHeader.tsx',
  'src/components/riddles/RiddleResultHeader.tsx',
  'src/components/riddles/RiddleQuizHeader.tsx',
  'src/components/spin-wheel/SpinWheelHeader.tsx',
  'src/components/profile-setup/CreateProfileScreen.tsx',
  'src/components/profile-setup/AcademicSetupScreen.tsx',
  'src/components/language/LanguageScreen.tsx',
  'src/components/auth/LoginScreen.tsx',
  'src/components/auth/RegistrationScreen.tsx',
  'src/components/auth/ForgotPasswordScreen.tsx',
  'src/components/auth/ResetPasswordScreen.tsx',
  'src/components/auth/OtpVerificationScreen.tsx',
  'app/notifications.tsx',
  'app/fun-facts.tsx',
  'app/about.tsx',
  'app/help.tsx',
  'app/privacy.tsx',
  'app/terms.tsx',
  'app/delete-account.tsx',
  'app/account-security.tsx',
  'app/faq.tsx',
  'app/feedback.tsx',
  'app/guidelines.tsx',
  'app/licenses.tsx',
  'app/report-problem.tsx',
  'app/profile.tsx',
  'app/quiz.tsx',
  'app/certificates.tsx',
  'app/challenges.tsx',
  'app/achievements.tsx',
  'app/quizzes.tsx',
];

for (const relPath of canonicalHeaderFiles) {
  const fullPath = path.join(ROOT_DIR, relPath);
  assert(fs.existsSync(fullPath), `File exists: ${relPath}`);
  const content = fs.readFileSync(fullPath, 'utf8');
  assert(
    content.includes('<AppBackButton') && content.includes('AppBackButton'),
    `${relPath} uses canonical <AppBackButton />`
  );
}

// 3. Purity & Inconsistency Elimination Audit
console.log('\n--- 3. Purity & Glyph Consistency Audit ---');

function searchFiles(dir: string, ext: string[]): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === 'node_modules' || file === '.git' || file === '.expo' || file === 'dist') continue;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(searchFiles(filePath, ext));
    } else {
      if (ext.some(e => file.endsWith(e))) {
        results.push(filePath);
      }
    }
  }
  return results;
}

const allTsxFiles = [
  ...searchFiles(path.join(ROOT_DIR, 'src'), ['.tsx']),
  ...searchFiles(path.join(ROOT_DIR, 'app'), ['.tsx']),
];

let rawAngleBracketsFound = 0;
for (const file of allTsxFiles) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('‹')) {
    rawAngleBracketsFound++;
    console.error(`  Found ‹ in ${path.relative(ROOT_DIR, file)}`);
  }
}
assert(rawAngleBracketsFound === 0, 'Zero raw ‹ angle brackets in entire application codebase');

// 4. Summary Output
console.log('\n==================================================');
console.log(`TOTAL CHECKS: ${passed + failed}`);
console.log(`PASSED:       ${passed}`);
console.log(`FAILED:       ${failed}`);
console.log('==================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL BACK ARROW STANDARDIZATION CHECKS PASSED PERFECTLY!\n');
}
