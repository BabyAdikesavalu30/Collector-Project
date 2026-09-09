// English games translations

export const games = {
      title: 'Games',
      subtitle: 'Play. Think. Discover.',
      searchPlaceholder: 'Search games, concepts or topics...',
      noGamesFound: 'No games found',
      noGamesFoundSubtitle: 'Try adjusting your search or category filter.',

      // Categories
      catAll: 'All',
      catLogic: 'Logic',
      catWords: 'Words',
      catGrid: 'Grid',
      catNumbers: 'Numbers',
      catMemory: 'Memory',
      catScience: 'Science',
      catChemistry: 'Chemistry',
      catPhysics: 'Physics',
      catBiology: 'Biology',
      catSpatial: 'Spatial',
      catPatterns: 'Patterns',

      // Filter Tabs
      filterRecommended: 'Recommended',
      filterMostPlayed: 'Most Played',
      filterNewest: 'Newest',
      filterCompleted: 'Completed',
      filterInProgress: 'In Progress',
      filterFavorites: 'Favorites',

      // Universe Hub Sections
      streakTitle: 'Day Game Streak',
      continuePlaying: 'Continue Playing',
      dailyChallenge: 'Daily Challenge',
      todayChallenge: "Today's Challenge",
      completedToday: 'Completed Today ✓',
      playDailyChallenge: 'Play Daily Challenge',
      recommendedForYou: 'Recommended for You',
      collectionsTitle: 'Collections',
      badgesTitle: 'Game Badges',
      allGames: 'All Games Universe',
      masteryLabel: 'Game Mastery',
      resume: 'Resume',
      backToHome: 'Back to Home',
      coinLabel: '{points} points',
      favoriteAdded: 'Added to Favorites',
      favoriteRemoved: 'Removed from Favorites',

      // Shared Game Strings
      howToPlay: 'How to Play',
      goal: 'Goal',
      rules: 'Rules',
      controls: 'Controls',
      gotIt: 'Got It',
      level: 'Level',
      time: 'Time',
      moves: 'Moves',
      points: 'Points',
      reset: 'Reset',
      undo: 'Undo',
      clear: 'Clear',
      check: 'Check',
      nextLevel: 'Next Level',
      replay: 'Replay',
      backToGames: 'Back to Games',
      selectLevel: 'Select Level',
      leaveGame: 'Leave Game?',
      leaveGameMessage: 'Your current level progress will be lost.',
      stay: 'Stay',
      leave: 'Leave',
      perfectRun: 'Perfect Run! ⭐',

      // Win Messages
      puzzleComplete: 'Puzzle Complete!',
      pathComplete: 'Path Complete!',
      wordComplete: 'Word Complete!',
      harmonyAchieved: 'Harmony Achieved!',
      crowned: 'Crowned!',
      vaultUnlocked: 'Vault Unlocked!',
      circuitClosed: 'Circuit Live & Active!',
      orbitStabilized: 'Orbit Stabilized!',
      escapedSuccess: 'Lab Escape Successful!',
      timelineAligned: 'Timeline Aligned!',
      dnaSynthesized: 'DNA Synthesized!',
      winSubtitle: 'Great logic and clear thinking!',

      // Modes
      modeClassic: 'Classic',
      modeDaily: 'Daily Challenge',
      modeTimed: 'Timed',
      modeZen: 'Zen Mode',
      modeChallenge: 'Challenge',
      modePractice: 'Practice',

      // Future Boundaries
      comingSoon: 'Coming Soon',
      challengeFriend: 'Challenge a Friend',
      weeklyTournament: 'Weekly Tournament',
      multiplayerNotice: 'Online multiplayer battles and weekly school tournaments will be available in future releases.',

      accessibility: {
        searchInput: 'Search games and topics',
        backToGames: 'Back to Games',
        close: 'Close',
        clear: 'Clear',
      },

      // 1. Zip
      zip: {
        title: 'Zip',
        subtitle: 'Complete the path',
        goal: 'Connect all numbered checkpoints sequentially to fill the entire grid in one continuous path.',
        rules: [
          'Must start at checkpoint 1',
          'Move between horizontally or vertically adjacent cells',
          'Visit checkpoints in exact numerical sequence',
          'Fill every cell in the grid without overlaps',
        ],
        controls: 'Tap adjacent empty cells to extend your path. Tap previous cell to undo.',
      },
      // 2. Wend
      wend: {
        title: 'Wend',
        subtitle: 'Weave through words',
        goal: 'Weave through adjacent letters to spell the target science vocabulary word.',
        rules: [
          'Start with the first letter of the target word',
          'Move to any adjacent letter (including diagonals)',
          'Cannot reuse a letter cell already in the path',
          'Spell the complete target word',
        ],
        controls: 'Tap adjacent letters in sequence. Tap Undo to remove the last letter.',
        findTarget: 'Target Word:',
        hint: 'Hint:',
      },
      // 3. Patches
      patches: {
        title: 'Patches',
        subtitle: 'Piece it together',
        goal: 'Place all geometric pieces into the board to cover the entire target outline without overlapping.',
        rules: [
          'All pieces must fit inside the target area',
          'Pieces cannot overlap each other',
          'Every square of the target outline must be covered',
        ],
        controls: 'Tap a piece in the tray to select it, then tap an empty board cell to place. Tap a placed piece on the board to remove it.',
        trayTitle: 'Pieces Tray',
      },
      // 4. Mini Sudoku
      miniSudoku: {
        title: 'Mini Sudoku',
        subtitle: 'The classic game, made mini',
        goal: 'Fill the 4x4 grid so every row, column, and 2x2 box contains numbers 1 to 4 exactly once.',
        rules: [
          'Each row must contain numbers 1–4 without repeats',
          'Each column must contain numbers 1–4 without repeats',
          'Each 2x2 box region must contain numbers 1–4 without repeats',
        ],
        controls: 'Tap an empty cell to select it, then tap a number 1–4 on the keypad. Tap Clear to empty the cell.',
      },
      // 5. Tango
      tango: {
        title: 'Tango',
        subtitle: 'Harmonize the grid',
        goal: 'Balance the 4x4 grid with Suns and Moons following row/column counts and clue constraints.',
        rules: [
          'Each row must have exactly 2 Suns and 2 Moons',
          'Each column must have exactly 2 Suns and 2 Moons',
          'No three identical symbols consecutively in any row or column',
          'Satisfy all = (equal) and × (opposite) clues',
        ],
        controls: 'Tap any cell to cycle between Sun ☀️, Moon 🌙, and Empty.',
        sun: 'Sun',
        moon: 'Moon',
        equal: 'Equal =',
        opposite: 'Opposite ×',
      },
      // 6. Queens
      queens: {
        title: 'Queens',
        subtitle: 'Crown each region',
        goal: 'Place exactly one Queen in each row, each column, and each colored region.',
        rules: [
          'Exactly 1 queen per row',
          'Exactly 1 queen per column',
          'Exactly 1 queen per colored region',
          'No two queens can touch horizontally, vertically, or diagonally',
        ],
        controls: 'Tap a cell once to place Queen 👑, tap twice to mark ❌, tap again to clear.',
        queenLegend: 'Queen 👑 (Tap 1x)',
        crossLegend: 'Mark ❌ (Tap 2x)',
      },
      // 7. Element Match
      elementMatch: {
        title: 'Element Match',
        subtitle: 'Match the elements',
        goal: 'Match chemical element symbols with their names, atomic numbers, and families.',
        rules: [
          'Select an element symbol on the left',
          'Select the matching chemical name on the right',
          'Clear all pairs with minimum mistakes',
        ],
        controls: 'Tap a symbol card then tap its matching chemical name.',
        symbols: 'Symbols',
        names: 'Element Names',
      },
      // 8. Molecule Builder
      moleculeBuilder: {
        title: 'Molecule Builder',
        subtitle: 'Build the molecule',
        goal: 'Assemble the target chemical compound by selecting atoms with proper stoichiometry.',
        rules: [
          'Select available atoms from the reagent tray',
          'Match the exact required formula (e.g. H₂O, CO₂)',
          'Remove unwanted atoms by tapping them in the molecule view',
        ],
        controls: 'Tap atom tokens below to add to bond chamber. Tap atoms in chamber to remove.',
        targetMolecule: 'Target Molecule:',
        bondedAtoms: 'Bond Chamber:',
        atomTray: 'Reagent Atoms:',
      },
      // 9. Circuit Lab
      circuitLab: {
        title: 'Circuit Lab',
        subtitle: 'Build the circuit',
        goal: 'Place conductive wires, switches, and components to complete a closed electric circuit.',
        rules: [
          'Create a continuous conductive loop along the perimeter',
          'Ensure all switches in the circuit are closed',
          'Fixed components cannot be moved',
        ],
        controls: 'Select a component tool below, then tap an empty grid cell to place it.',
        toolsTitle: 'Circuit Toolbox:',
      },
      // 10. Memory Matrix
      memoryMatrix: {
        title: 'Memory Matrix',
        subtitle: 'Remember science',
        goal: 'Uncover and match related pairs of scientific facts, discoveries, and organs.',
        rules: [
          'Flip two cards at a time to reveal their contents',
          'Matching pairs remain uncovered',
          'Remember card positions to minimize mistakes',
        ],
        controls: 'Tap any facedown card to flip it over.',
      },
      // 11. Orbit
      orbit: {
        title: 'Orbit',
        subtitle: 'Guide the mission',
        goal: 'Navigate the spacecraft from launch to target orbit passing through all waypoints.',
        rules: [
          'Move between adjacent grid cells',
          'Visit orbital waypoints in numerical sequence',
          'Avoid asteroids and gravitational singularities',
          'Reach the target before running out of fuel',
        ],
        controls: 'Tap adjacent grid cells to guide the trajectory path.',
        fuelLabel: 'Fuel Moves:',
      },
      // 12. Reaction Sort
      reactionSort: {
        title: 'Reaction Sort',
        subtitle: 'Sort the science',
        goal: 'Sort incoming scientific items and reactions into their proper classification bins.',
        rules: [
          'Inspect the active science item card',
          'Select the correct category container (e.g. Acid vs Base)',
          'Sort all items with high accuracy',
        ],
        controls: 'Tap the category button that matches the current science item.',
        sortPrompt: 'Sort into category:',
      },
      // 13. Science Word Grid
      scienceWordGrid: {
        title: 'Science Word Grid',
        subtitle: 'Find the science words',
        goal: 'Discover all hidden science vocabulary terms hidden inside the letter grid.',
        rules: [
          'Words can be horizontal, vertical, or diagonal',
          'Tap letters sequentially to select a word',
          'Find all required terms to complete the level',
        ],
        controls: 'Tap letters along a straight line to highlight words. Tap clear to reset selection.',
        wordsToFind: 'Words to Discover:',
      },
      // 14. Pattern Lab
      patternLab: {
        title: 'Pattern Lab',
        subtitle: 'Solve the pattern',
        goal: 'Deduce the missing element in scientific, mathematical, and astronomical sequences.',
        rules: [
          'Analyze the progression rule in the sequence',
          'Select the option that correctly replaces the question mark (?)',
        ],
        controls: 'Tap the correct option card below.',
        chooseOption: 'Choose the Next Element:',
      },
      // 15. Logic Lock
      logicLock: {
        title: 'Logic Lock',
        subtitle: 'Crack the science lock',
        goal: 'Deduce the multi-digit secret code using the deductive clue statements.',
        rules: [
          'Examine the hint badges on each previous guess',
          'Eliminate invalid numbers and determine correct positions',
          'Set dials and tap Check to unlock',
        ],
        controls: 'Use Up/Down arrows to adjust dials, then tap Check Code.',
        cluesTitle: 'Deductive Clues:',
        checkCode: 'Check Code',
      },
      // 16. Gravity Path
      gravityPath: {
        title: 'Gravity Path',
        subtitle: 'Control the path',
        goal: 'Shift directional gravity to slide the particle into the collection flask.',
        rules: [
          'Particle slides continuously until hitting a wall or border',
          'Avoid hazard zones',
          'Use portals to teleport across barrier walls',
        ],
        controls: 'Tap Up, Down, Left, or Right arrow buttons to shift gravity.',
        movesLeft: 'Moves Left:',
      },
      // 17. Lab Escape
      labEscape: {
        title: 'Lab Escape',
        subtitle: 'Escape through science',
        goal: 'Complete the multi-stage scientific escape sequence to open the laboratory door.',
        rules: [
          'Solve each step sequentially: chemistry, physics, and codes',
          'Correct answers unlock the next security phase',
        ],
        controls: 'Read the stage briefing and select the correct scientific action.',
        stageOf: 'Stage {current} of {total}',
      },
      // 18. Time Machine
      timeMachine: {
        title: 'Time Machine',
        subtitle: 'Order scientific history',
        goal: 'Arrange historical science milestones in correct chronological order from earliest to latest.',
        rules: [
          'Examine the historical events and discoveries',
          'Move cards up and down to put them in order of occurrence',
          'Tap Verify to check the timeline',
        ],
        controls: 'Use Up/Down buttons on cards to adjust position, then tap Verify Timeline.',
        verifyTimeline: 'Verify Timeline',
      },
      // 19. DNA Sequence
      dnaSequence: {
        title: 'DNA Sequence',
        subtitle: 'Match the sequence',
        goal: 'Synthesize the complementary genetic strand according to base-pairing rules.',
        rules: [
          'DNA: A pairs with T, C pairs with G',
          'RNA Transcription: A transcribes to U, T to A, C to G, G to C',
        ],
        controls: 'Tap the base tokens (A, T, C, G, U) to fill the complementary strand.',
        templateStrand: 'Template Strand:',
        complementStrand: 'Synthesized Strand:',
      },
      // 20. Magnet Maze
      magnetMaze: {
        title: 'Magnet Maze',
        subtitle: 'Master attraction and repulsion',
        goal: 'Navigate magnetic particle to the target gate using polar attraction and repulsion.',
        rules: [
          'Opposite poles attract (N-S), like poles repel (N-N, S-S)',
          'Toggle your particle polarity (N ↔ S) as needed',
          'Reach the target gate with correct matching polarity',
        ],
        controls: 'Tap adjacent cells to move. Tap Polarity Switch to change charge.',
        polarityLabel: 'Active Polarity:',
        togglePolarity: 'Switch Polarity (N ↔ S)',
      },
};