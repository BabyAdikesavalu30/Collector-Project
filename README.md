cat > README.md <<'EOF'
# Vigyaan — Science Learning Platform

Vigyaan is a bilingual English/Tamil science-learning application for
school students in Classes 6–12.

The application is designed to make science learning more interactive
through curriculum-aligned learning, quizzes, games, riddles, experiments,
progress tracking, achievements, and accessibility-focused learning tools.

---

## ✨ Features

### Learning

- Class-based science learning
- Physics, Chemistry, and Biology
- Chapters and topics
- Interactive lessons
- Micro lessons
- Concept maps
- Virtual experiments
- Science collections
- Science Passport

### Assessment

- Configurable quizzes
- Timed quizzes
- Difficulty selection
- Quiz review
- Results and score tracking
- Science riddles
- Game-based learning
- Daily challenges

### Progress & Motivation

- Daily goals
- Learning progress
- Streaks
- XP and levels
- Achievements
- Rewards
- Certificates
- Leaderboards
- Weak-area tracking
- Daily missions
- Points history

### Accessibility

Vigyaan includes an accessibility assistant designed to support students
with different learning and interaction needs.

Accessibility capabilities include:

- Visual Support
- Text-size controls
- High-contrast support
- Read Aloud
- Focus Mode
- Easy Interaction
- Reduced Motion
- Larger interaction targets
- Screen-reader semantics
- Keyboard accessibility on web
- English and Tamil accessibility labels
- Movable accessibility assistant

Accessibility functionality is implemented as an additional layer over the
existing application and does not change core learning or quiz logic.

---

## 🌐 Languages

Vigyaan supports:

- English
- Tamil

All user-facing strings should use the application's existing
internationalization system.

---

## 🧰 Technology Stack

| Layer | Technology |
|---|---|
| Framework | Expo SDK 57 |
| Runtime | React Native 0.86.3 |
| React | React 19.2.3 |
| Navigation | Expo Router |
| Language | TypeScript |
| Persistence | AsyncStorage with in-memory caching |
| Testing | Jest + ts-jest |
| Styling | React Native StyleSheet |
| Web | React Native Web |
| Internationalization | Modular English/Tamil dictionaries |

---

## 📁 Project Structure

```text
Vigyaan/
│
├── app/                         # Expo Router routes
│   ├── (auth)/                 # Authentication flows
│   ├── (tabs)/                 # Main application navigation
│   ├── games/                  # Games
│   ├── quiz/                   # Quiz flows
│   ├── learn/                  # Learning routes
│   ├── profile/                # Profile and learning identity
│   ├── settings/               # Settings and accessibility
│   └── ...
│
├── src/
│   ├── components/             # Reusable UI components
│   ├── features/               # Feature-specific logic
│   ├── screens/                # Screen-level implementations
│   ├── hooks/                  # Shared React hooks
│   ├── services/               # Application services
│   ├── repositories/           # Data/repository abstractions
│   ├── storage/                # Local persistence
│   ├── context/                # React contexts/providers
│   ├── config/                 # Configuration and i18n
│   ├── accessibility/          # Accessibility infrastructure
│   ├── icons/                  # Centralized icon system
│   ├── theme/                  # Design tokens and theme
│   ├── types/                  # Shared TypeScript types
│   └── utils/                  # Shared utilities
│
├── assets/
│   ├── images/
│   ├── icons/
│   ├── animations/
│   └── fonts/
│
├── __mocks__/                  # Jest mocks
├── docs/
│   ├── architecture/          # Architecture and source-of-truth docs
│   ├── backend/                # Backend contracts and handoff docs
│   ├── qa/                     # QA matrices and audit reports
│   ├── release/                # Release documentation
│   └── history/                # Project history and phase reports
│
├── .github/
│   ├── workflows/              # CI/CD workflows
│   ├── ISSUE_TEMPLATE/
│   └── pull_request_template.md
│
├── AGENTS.md                   # Agent/development instructions
├── CLAUDE.md                   # Claude/code-agent instructions
├── README.md
├── LICENSE
├── app.json
├── package.json
├── package-lock.json
├── tsconfig.json
├── jest.config.js
└── .gitignore
