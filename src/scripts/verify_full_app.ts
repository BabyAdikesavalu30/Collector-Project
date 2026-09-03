/**
 * Full Production Verification Script: App Baseline, Navigation, Storage & i18n
 */

import { STORAGE_KEYS } from '../storage/asyncStorage';
import { translations } from '../config/i18n';
import { getAllNotifications } from '../features/notifications/notifications.mock';
import { FUN_FACTS, FACT_COLLECTIONS } from '../features/fun-facts/fun-facts.mock';
import { RIDDLE_CATEGORIES, RIDDLE_QUESTIONS } from '../features/riddles/riddle.mock';

let failures: string[] = [];

function assert(condition: boolean, msg: string) {
  if (!condition) {
    failures.push(`❌ ${msg}`);
    console.error(`❌ ${msg}`);
  } else {
    console.log(`✅ ${msg}`);
  }
}

console.log('\n======================================================');
console.log('--- 1. STORAGE KEYS AUDIT ---');
console.log('======================================================');

const requiredStorageKeys = [
  'USER_LANGUAGE',
  'ONBOARDING_COMPLETED',
  'APP_SETTINGS',
  'GAMES_PROGRESS',
  'GAMES_STREAK',
  'GAMES_FAVORITES',
  'GAMES_LAST_PLAYED',
  'GAMES_UNLOCKED_BADGES',
  'GAMES_DAILY_CHALLENGES',
  'NOTIFICATIONS_STATE',
  'FUN_FACTS_PROGRESS',
  'FUN_FACTS_DISMISSED',
  'AUTH_SESSION',
  'RIDDLE_PROGRESS',
];

for (const key of requiredStorageKeys) {
  assert(
    (STORAGE_KEYS as Record<string, string>)[key] !== undefined,
    `STORAGE_KEYS contains ${key} with value: ${(STORAGE_KEYS as Record<string, string>)[key]}`
  );
}

console.log('\n======================================================');
console.log('--- 2. I18N ENGLISH / TAMIL PARITY AUDIT ---');
console.log('======================================================');

const en = translations.en;
const ta = translations.ta;

assert(Boolean(en.welcome && ta.welcome), 'Translations have welcome section');
assert(Boolean(en.home && ta.home), 'Translations have home section');
assert(Boolean(en.learnScreen && ta.learnScreen), 'Translations have learnScreen section');
assert(Boolean(en.games && ta.games), 'Translations have games section');
assert(Boolean(en.riddles && ta.riddles), 'Translations have riddles section');
assert(Boolean(en.settingsScreen && ta.settingsScreen), 'Translations have settingsScreen section');
assert(Boolean(en.quizSetup && ta.quizSetup), 'Translations have quizSetup section');
assert(Boolean(en.quizEngine && ta.quizEngine), 'Translations have quizEngine section');
assert(Boolean(en.quizResult && ta.quizResult), 'Translations have quizResult section');

console.log('\n======================================================');
console.log('--- 3. NOTIFICATIONS AUDIT ---');
console.log('======================================================');

const allNotifs = getAllNotifications();
assert(allNotifs.length >= 10, `At least 10 notifications registered (found ${allNotifs.length})`);
for (const n of allNotifs) {
  assert(Boolean(n.id && n.title.en && n.title.ta && n.body.en && n.body.ta), `Notification ${n.id} is bilingual`);
  if (n.action) {
    assert(n.action.route.startsWith('/'), `Notification ${n.id} route ${n.action.route} is valid absolute route`);
  }
}

console.log('\n======================================================');
console.log('--- 4. FUN FACTS AUDIT ---');
console.log('======================================================');

assert(FACT_COLLECTIONS.length >= 4, `At least 4 fun-facts collections registered (found ${FACT_COLLECTIONS.length})`);
assert(FUN_FACTS.length >= 20, `At least 20 fun facts registered (found ${FUN_FACTS.length})`);
for (const fact of FUN_FACTS) {
  assert(Boolean(fact.id && fact.fact.en && fact.fact.ta && fact.category), `Fact ${fact.id} has complete bilingual text`);
}

console.log('\n======================================================');
console.log('--- 5. RIDDLES AUDIT ---');
console.log('======================================================');

assert(RIDDLE_CATEGORIES.length >= 4, `At least 4 riddle categories registered (found ${RIDDLE_CATEGORIES.length})`);
const allRiddles = Object.values(RIDDLE_QUESTIONS).flat();
assert(allRiddles.length >= 15, `At least 15 riddles registered (found ${allRiddles.length})`);
for (const item of allRiddles) {
  assert(
    Boolean(item.id && item.question.en && item.question.ta && item.answer.en && item.answer.ta),
    `Riddle ${item.id} has valid bilingual question and answer`
  );
}

console.log('\n======================================================');
console.log('--- FINAL APP AUDIT SUMMARY ---');
console.log('======================================================');

if (failures.length > 0) {
  console.error(`\n❌ Full App Verification FAILED with ${failures.length} errors:`);
  failures.forEach((f) => console.error(f));
  process.exit(1);
} else {
  console.log('\n✨ ALL FULL APP PRODUCTION VERIFICATIONS PASSED SUCCESSFULLY! ✨\n');
  process.exit(0);
}
