/**
 * Safety & Trust Layer Tests
 * Deterministic tests for safety routes, privacy content, account safety,
 * safe science rules, help content, component validation, and localization.
 */

import { SAFETY_SECTIONS, PRIVACY_INFO, ACCOUNT_SAFETY_TIPS, SAFE_SCIENCE_RULES, HELP_CATEGORIES, REPORT_REASONS } from '../safety.content';

// ============================================================================
// Safety Hub Sections
// ============================================================================

describe('Safety Hub Sections', () => {
  it('has all required sections', () => {
    expect(SAFETY_SECTIONS.length).toBeGreaterThanOrEqual(5);
  });

  it('has unique IDs', () => {
    const ids = SAFETY_SECTIONS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every section has EN and TA text', () => {
    for (const section of SAFETY_SECTIONS) {
      expect(section.title.en.length).toBeGreaterThan(0);
      expect(section.title.ta.length).toBeGreaterThan(0);
      expect(section.subtitle.en.length).toBeGreaterThan(0);
      expect(section.subtitle.ta.length).toBeGreaterThan(0);
    }
  });

  it('every section has a valid route starting with /', () => {
    for (const section of SAFETY_SECTIONS) {
      expect(section.route.startsWith('/')).toBe(true);
    }
  });

  it('has privacy section', () => {
    expect(SAFETY_SECTIONS.some((s) => s.id === 'privacy')).toBe(true);
  });

  it('has account-safety section', () => {
    expect(SAFETY_SECTIONS.some((s) => s.id === 'account-safety')).toBe(true);
  });

  it('has safe-science section', () => {
    expect(SAFETY_SECTIONS.some((s) => s.id === 'safe-science')).toBe(true);
  });

  it('has help-support section', () => {
    expect(SAFETY_SECTIONS.some((s) => s.id === 'help-support')).toBe(true);
  });
});

// ============================================================================
// Privacy Content
// ============================================================================

describe('Privacy Content', () => {
  it('has at least 5 privacy info items', () => {
    expect(PRIVACY_INFO.length).toBeGreaterThanOrEqual(5);
  });

  it('has unique IDs', () => {
    const ids = PRIVACY_INFO.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every item has EN and TA text', () => {
    for (const item of PRIVACY_INFO) {
      expect(item.title.en.length).toBeGreaterThan(0);
      expect(item.title.ta.length).toBeGreaterThan(0);
      expect(item.content.en.length).toBeGreaterThan(0);
      expect(item.content.ta.length).toBeGreaterThan(0);
    }
  });

  it('bullets are bilingual', () => {
    for (const item of PRIVACY_INFO) {
      if (item.bullets) {
        for (const bullet of item.bullets) {
          expect(bullet.en.length).toBeGreaterThan(0);
          expect(bullet.ta.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it('does not claim 100% security', () => {
    for (const item of PRIVACY_INFO) {
      expect(item.content.en.toLowerCase()).not.toContain('100% secure');
      expect(item.content.ta.toLowerCase()).not.toContain('100% secure');
    }
  });

  it('does not claim legal compliance', () => {
    for (const item of PRIVACY_INFO) {
      expect(item.content.en.toLowerCase()).not.toContain('fully compliant');
      expect(item.content.en.toLowerCase()).not.toContain('legally compliant');
    }
  });
});

// ============================================================================
// Account Safety Tips
// ============================================================================

describe('Account Safety Tips', () => {
  it('has at least 4 tips', () => {
    expect(ACCOUNT_SAFETY_TIPS.length).toBeGreaterThanOrEqual(4);
  });

  it('has unique IDs', () => {
    const ids = ACCOUNT_SAFETY_TIPS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every tip has EN and TA text', () => {
    for (const tip of ACCOUNT_SAFETY_TIPS) {
      expect(tip.title.en.length).toBeGreaterThan(0);
      expect(tip.title.ta.length).toBeGreaterThan(0);
      expect(tip.content.en.length).toBeGreaterThan(0);
      expect(tip.content.ta.length).toBeGreaterThan(0);
    }
  });

  it('includes password safety', () => {
    expect(ACCOUNT_SAFETY_TIPS.some((t) => t.id === 'password-safety')).toBe(true);
  });

  it('includes OTP safety', () => {
    expect(ACCOUNT_SAFETY_TIPS.some((t) => t.id === 'otp-safety')).toBe(true);
  });

  it('includes shared device caution', () => {
    expect(ACCOUNT_SAFETY_TIPS.some((t) => t.id === 'shared-device')).toBe(true);
  });

  it('does not expose demo credentials', () => {
    for (const tip of ACCOUNT_SAFETY_TIPS) {
      expect(tip.content.en.toLowerCase()).not.toContain('demo@');
      expect(tip.content.en.toLowerCase()).not.toContain('password123');
      expect(tip.content.en.toLowerCase()).not.toContain('test@');
    }
  });
});

// ============================================================================
// Safe Science Rules
// ============================================================================

describe('Safe Science Rules', () => {
  it('has at least 4 rules', () => {
    expect(SAFE_SCIENCE_RULES.length).toBeGreaterThanOrEqual(4);
  });

  it('has unique IDs', () => {
    const ids = SAFE_SCIENCE_RULES.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every rule has EN and TA text', () => {
    for (const rule of SAFE_SCIENCE_RULES) {
      expect(rule.title.en.length).toBeGreaterThan(0);
      expect(rule.title.ta.length).toBeGreaterThan(0);
      expect(rule.description.en.length).toBeGreaterThan(0);
      expect(rule.description.ta.length).toBeGreaterThan(0);
    }
  });

  it('includes simulations rule', () => {
    expect(SAFE_SCIENCE_RULES.some((r) => r.id === 'simulations')).toBe(true);
  });

  it('includes no-dangerous rule', () => {
    expect(SAFE_SCIENCE_RULES.some((r) => r.id === 'no-dangerous')).toBe(true);
  });

  it('does not contain actual dangerous instructions', () => {
    const banned = ['mix sulfuric acid', 'cut wires', 'inhale', 'swallow'];
    for (const rule of SAFE_SCIENCE_RULES) {
      for (const word of banned) {
        expect(rule.description.en.toLowerCase()).not.toContain(word);
        expect(rule.description.ta.toLowerCase()).not.toContain(word);
      }
    }
  });
});

// ============================================================================
// Help Categories
// ============================================================================

describe('Help Categories', () => {
  it('has at least 4 categories', () => {
    expect(HELP_CATEGORIES.length).toBeGreaterThanOrEqual(4);
  });

  it('has unique IDs', () => {
    const ids = HELP_CATEGORIES.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every category has at least 1 FAQ item', () => {
    for (const cat of HELP_CATEGORIES) {
      expect(cat.items.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('every FAQ item has EN and TA text', () => {
    for (const cat of HELP_CATEGORIES) {
      for (const item of cat.items) {
        expect(item.question.en.length).toBeGreaterThan(0);
        expect(item.question.ta.length).toBeGreaterThan(0);
        expect(item.answer.en.length).toBeGreaterThan(0);
        expect(item.answer.ta.length).toBeGreaterThan(0);
      }
    }
  });
});

// ============================================================================
// Report Reasons
// ============================================================================

describe('Report Reasons', () => {
  it('has at least 4 reasons', () => {
    expect(REPORT_REASONS.length).toBeGreaterThanOrEqual(4);
  });

  it('has unique IDs', () => {
    const ids = REPORT_REASONS.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every reason has EN and TA labels', () => {
    for (const reason of REPORT_REASONS) {
      expect(reason.label.en.length).toBeGreaterThan(0);
      expect(reason.label.ta.length).toBeGreaterThan(0);
    }
  });
});

// ============================================================================
// Localization Parity
// ============================================================================

describe('Safety Localization', () => {
  it('all safety sections have bilingual titles', () => {
    for (const section of SAFETY_SECTIONS) {
      expect(section.title.en).toBeTruthy();
      expect(section.title.ta).toBeTruthy();
    }
  });

  it('all privacy items have bilingual content', () => {
    for (const item of PRIVACY_INFO) {
      expect(item.content.en).toBeTruthy();
      expect(item.content.ta).toBeTruthy();
    }
  });

  it('all safety rules have bilingual descriptions', () => {
    for (const rule of SAFE_SCIENCE_RULES) {
      expect(rule.description.en).toBeTruthy();
      expect(rule.description.ta).toBeTruthy();
    }
  });
});

// ============================================================================
// Content Quality
// ============================================================================

describe('Safety Content Quality', () => {
  it('does not use fear-based language', () => {
    const fearWords = ['dangerous warning', 'you will be punished', 'you must', 'you are failing'];
    for (const section of SAFETY_SECTIONS) {
      for (const word of fearWords) {
        expect(section.subtitle.en.toLowerCase()).not.toContain(word);
      }
    }
  });

  it('does not use shame-based language', () => {
    const shameWords = ['stupid', 'idiot', 'loser', 'worst'];
    for (const tip of ACCOUNT_SAFETY_TIPS) {
      for (const word of shameWords) {
        expect(tip.content.en.toLowerCase()).not.toContain(word);
        expect(tip.content.ta.toLowerCase()).not.toContain(word);
      }
    }
  });

  it('does not claim fake backend features', () => {
    const fakeClaims = ['server-side', 'backend active', 'production server', 'real-time sync'];
    for (const item of PRIVACY_INFO) {
      for (const claim of fakeClaims) {
        expect(item.content.en.toLowerCase()).not.toContain(claim);
      }
    }
  });

  it('does not include manipulative urgency', () => {
    const urgencyWords = ['urgent', 'act now or', 'last chance', 'you will lose'];
    for (const tip of ACCOUNT_SAFETY_TIPS) {
      for (const word of urgencyWords) {
        expect(tip.content.en.toLowerCase()).not.toContain(word);
      }
    }
  });
});
