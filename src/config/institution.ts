/**
 * Institution Configuration
 * Provides centralized, configurable branding parameters so institutional
 * identities are not hardcoded throughout visual components.
 */

export interface InstitutionConfig {
  group: {
    en: string;
    ta: string;
  };
  name: {
    en: string;
    ta: string;
  };
  accreditation: {
    en: string;
    ta: string;
  };
  department: {
    en: string;
    ta: string;
  };
  app: {
    name: string;
    tamilName: string;
    tagline: {
      en: string;
      ta: string;
    };
    edition: string;
    badge: string;
  };
  languages: {
    supported: string[];
    displayBadge: string;
  };
  branding: {
    crestInitials: string;
    establishedYear: string;
    motto: string;
    officialAssetUri?: string | null;
  };
}

export const institutionConfig: InstitutionConfig = {
  group: {
    en: 'R.M.K. GROUP OF INSTITUTIONS',
    ta: 'ஆர்.எம்.கே கல்வி நிறுவனங்கள்',
  },
  name: {
    en: 'R.M.K. ENGINEERING COLLEGE',
    ta: 'ஆர்.எம்.கே பொறியியல் கல்லூரி',
  },
  accreditation: {
    en: 'An Autonomous Institution | Affiliated to Anna University',
    ta: 'தன்னாட்சி நிறுவனம் | அண்ணா பல்கலைக்கழக அங்கீகாரம்',
  },
  department: {
    en: 'Department of Information Technology',
    ta: 'தகவல் தொழில்நுட்பவியல் துறை',
  },
  app: {
    name: 'VIGYAAN',
    tamilName: 'விஞ்ஞான்',
    tagline: {
      en: 'Science Quiz for Young Achievers',
      ta: 'அறிவியல் வினாடி வினா',
    },
    edition: 'Edition 2026',
    badge: 'SCIENCE & INNOVATION INITIATIVE',
  },
  languages: {
    supported: ['en', 'ta'],
    displayBadge: 'தமிழ் • English',
  },
  branding: {
    crestInitials: 'RMK',
    establishedYear: '1995',
    motto: 'Knowledge is Power',
    officialAssetUri: null, // Ready for direct asset injection when available
  },
};
