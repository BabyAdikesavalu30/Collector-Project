/**
 * Unit Verification Test Suite for Screen 14 (Home Dashboard)
 */

import { MOCK_ACTIVE_DASHBOARD, MOCK_EMPTY_DASHBOARD } from '../home.mock';
import { dashboardService } from '../home.service';
import { getTranslation } from '../../../config/i18n';

describe('Screen 14 — Home Dashboard Data & Localization', () => {
  describe('Mock Data Contracts', () => {
    it('provides valid active dashboard structure', () => {
      expect(MOCK_ACTIVE_DASHBOARD.student.name).toBe('Anu');
      expect(MOCK_ACTIVE_DASHBOARD.overallProgressPercentage).toBe(72);
      expect(MOCK_ACTIVE_DASHBOARD.streakDays).toBe(5);
      expect(MOCK_ACTIVE_DASHBOARD.points).toBe(840);
      expect(MOCK_ACTIVE_DASHBOARD.continueTopic?.subject).toBe('Physics');
      expect(MOCK_ACTIVE_DASHBOARD.dailyChallenge?.durationMinutes).toBe(2);
    });

    it('provides valid empty dashboard structure for new students', () => {
      expect(MOCK_EMPTY_DASHBOARD.overallProgressPercentage).toBe(0);
      expect(MOCK_EMPTY_DASHBOARD.continueTopic).toBeNull();
      expect(MOCK_EMPTY_DASHBOARD.isNewStudent).toBe(true);
    });
  });

  describe('Dashboard Service', () => {
    it('fetches dashboard data', async () => {
      const data = await dashboardService.getDashboard();
      expect(data).toBeDefined();
      expect(data.overallProgressPercentage).toBeGreaterThanOrEqual(0);
      expect(data.student.name).toBeTruthy();
    });
  });

  describe('Bilingual Localization Completeness', () => {
    it('provides complete home dashboard tokens in English', () => {
      const en = getTranslation('en').home;
      expect(en.title).toBe('Home');
      expect(en.learningProgress).toBe('Science Learning Progress');
      expect(en.continueLearning).toBe('Continue Learning');
      expect(en.quickActions).toBe('Quick Actions');
      expect(en.quizzes).toBe('Quizzes');
      expect(en.dailyChallenge).toBe('Daily Challenge');
      expect(en.nav.home).toBe('Home');
      expect(en.nav.learn).toBe('Learn');
    });

    it('provides complete home dashboard tokens in Tamil', () => {
      const ta = getTranslation('ta').home;
      expect(ta.title).toBe('முகப்பு');
      expect(ta.learningProgress).toBe('அறிவியல் கற்றல் முன்னேற்றம்');
      expect(ta.continueLearning).toBe('கற்றலைத் தொடரவும்');
      expect(ta.quickActions).toBe('விரைவு இணைப்புகள்');
      expect(ta.quizzes).toBe('வினாடி வினா');
      expect(ta.dailyChallenge).toBe('தினசரி சவால்');
      expect(ta.nav.home).toBe('முகப்பு');
      expect(ta.nav.learn).toBe('கற்போம்');
    });
  });
});
