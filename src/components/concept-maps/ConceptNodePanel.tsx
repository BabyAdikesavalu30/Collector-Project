/**
 * ConceptNodePanel Component
 * Interactive inspector panel displayed when a concept node is selected.
 * Displays definition, real-world example, connected concept shortcuts,
 * and deep links to Micro Lessons, Quiz Setup, and Learn curriculum.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { theme } from '../../theme';
import {
  ConceptMap,
  ConceptNode,
} from '../../features/concept-maps/conceptMaps.types';
import {
  CONCEPT_SUBJECT_THEMES,
  NODE_TYPE_CONFIG,
} from '../../features/concept-maps/conceptMaps.data';import { getTranslation, SupportedLanguage } from '../../config/i18n';
export interface ConceptNodePanelProps {
  map: ConceptMap;
  node: ConceptNode;
  isExplored: boolean;
  language?: SupportedLanguage;
  onExploreNode: (nodeId: string) => void;
  onSelectNode: (nodeId: string) => void;
  onClose: () => void;
  onDeepLinkMicroLesson?: (lessonId?: string) => void;
  onDeepLinkQuiz?: (subject: string) => void;
  onDeepLinkLearn?: () => void;
  testID?: string;
}

export const ConceptNodePanel: React.FC<ConceptNodePanelProps> = ({
  map,
  node,
  isExplored,
  language = 'en',
  onExploreNode,
  onSelectNode,
  onClose,
  onDeepLinkMicroLesson,
  onDeepLinkQuiz,
  onDeepLinkLearn,
  testID = 'concept-node-panel',
}) => {
  const isTamil = language === 'ta';
  const t = getTranslation(language).conceptMaps;
  const subjectTheme = CONCEPT_SUBJECT_THEMES[map.subject] || CONCEPT_SUBJECT_THEMES.physics;
  const typeConfig = NODE_TYPE_CONFIG[node.type] || NODE_TYPE_CONFIG.concept;

  const label = isTamil ? (node.title?.ta || node.shortLabel?.ta) : (node.title?.en || node.shortLabel?.en);
  const definition = isTamil && node.definition.ta ? node.definition.ta : node.definition.en;

  // Resolve connected nodes from map
  const connectedNodes = map.nodes.filter((n) =>
    node.relatedNodeIds.includes(n.id)
  );

  return (
    <View testID={testID} style={styles.container}>
      {/* Header bar with close button */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.iconBox, { backgroundColor: typeConfig.bgColor }]}>
            <Text style={styles.iconText}>{node.icon || typeConfig.icon}</Text>
          </View>
          <View style={styles.headerTextWrap}>
            <View style={styles.titleRow}>
              <Text style={styles.nodeTitle} numberOfLines={1}>
                {label}
              </Text>
              {node.keyNode && (
                <View style={styles.keyBadge}>
                  <Text style={styles.keyBadgeText}>★ Key</Text>
                </View>
              )}
            </View>
            <View style={[styles.typePill, { backgroundColor: typeConfig.borderColor + '25' }]}>
              <Text style={[styles.typePillText, { color: typeConfig.color }]}>
                {isTamil ? typeConfig.label.ta : typeConfig.label.en}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          testID="node-panel-close-btn"
          accessibilityRole="button"
          accessibilityLabel={t.accessibility?.closeInspector}
          onPress={onClose}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.closeBtn}
        >
          <Text style={styles.closeBtnText}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.bodyScroll}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Definition Section */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionHeading}>
            {isTamil ? 'விளக்கம்' : 'Definition'}
          </Text>
          <Text style={styles.definitionText}>{definition}</Text>
        </View>

        {/* Real-World Context or Key Insight */}
        <View style={[styles.insightCard, { backgroundColor: subjectTheme.surface }]}>
          <Text style={styles.insightIcon}>💡</Text>
          <View style={styles.insightTextWrap}>
            <Text style={[styles.insightTitle, { color: subjectTheme.primary }]}>
              {isTamil ? 'அறிவியல் சிந்தனை' : 'Science Insight'}
            </Text>
            <Text style={styles.insightBody}>
              {isTamil
                ? `${label} என்பது ${map.title.ta} பாடத்தின் முக்கிய கோட்பாடாகும்.`
                : `${label} is a core foundation of ${map.title.en}.`}
            </Text>
          </View>
        </View>

        {/* Connected Concepts */}
        {connectedNodes.length > 0 && (
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionHeading}>
              {isTamil ? 'தொடர்புடைய கருத்துகள்' : 'Connected Concepts'}
            </Text>
            <View style={styles.connectedChipsRow}>
              {connectedNodes.map((conn) => {
                const connLabel = isTamil
                  ? (conn.title?.ta || conn.shortLabel?.ta)
                  : (conn.title?.en || conn.shortLabel?.en);
                return (
                  <TouchableOpacity
                    key={conn.id}
                    testID={`connected-node-jump-${conn.id}`}
                    accessibilityRole="button"
                    accessibilityLabel={`Jump to ${connLabel}`}
                    onPress={() => onSelectNode(conn.id)}
                    style={styles.connectedChip}
                  >
                    <Text style={styles.connectedChipIcon}>{conn.icon || '🔗'}</Text>
                    <Text style={styles.connectedChipText} numberOfLines={1}>
                      {connLabel}
                    </Text>
                    <Text style={styles.connectedChipArrow}>→</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Action / Mark Explored */}
        <View style={styles.actionRow}>
          {!isExplored ? (
            <TouchableOpacity
              testID="mark-node-explored-btn"
              accessibilityRole="button"
              accessibilityLabel={t.accessibility?.markExplored}
              onPress={() => onExploreNode(node.id)}
              style={[styles.exploreBtn, { backgroundColor: subjectTheme.primary }]}
            >
              <Text style={styles.exploreBtnText}>
                {isTamil ? '✓ ஆராய்ந்ததாகக் குறி' : '✓ Mark as Explored'}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.alreadyExploredBanner}>
              <Text style={styles.alreadyExploredIcon}>✓</Text>
              <Text style={styles.alreadyExploredText}>
                {isTamil ? 'இந்தக் கருத்து ஆராயப்பட்டது' : 'Concept Explored'}
              </Text>
            </View>
          )}
        </View>

        {/* Deep Links Row (Curriculum Integration) */}
        <View style={styles.deepLinksSection}>
          <Text style={styles.deepLinksTitle}>
            {isTamil ? 'மேலும் கற்க' : 'Deepen Learning'}
          </Text>
          <View style={styles.deepLinksRow}>
            {(node.microLessonId || (map.relatedMicroLessonIds && map.relatedMicroLessonIds.length > 0)) && onDeepLinkMicroLesson && (
              <TouchableOpacity
                testID="deeplink-micro-lesson-btn"
                accessibilityRole="button"
                accessibilityLabel={t.accessibility?.learnInMicroLesson}
                onPress={() => onDeepLinkMicroLesson(node.microLessonId || map.relatedMicroLessonIds?.[0])}
                style={styles.deepLinkPill}
              >
                <Text style={styles.deepLinkEmoji}>⚡</Text>
                <Text style={styles.deepLinkText}>
                  {isTamil ? 'குறும்பாடம்' : 'Micro Lesson'}
                </Text>
              </TouchableOpacity>
            )}

            {onDeepLinkQuiz && (
              <TouchableOpacity
                testID="deeplink-quiz-btn"
                accessibilityRole="button"
                accessibilityLabel={t.accessibility?.practiceWithQuiz}
                onPress={() => onDeepLinkQuiz(map.subject)}
                style={styles.deepLinkPill}
              >
                <Text style={styles.deepLinkEmoji}>🎯</Text>
                <Text style={styles.deepLinkText}>
                  {isTamil ? 'பயிற்சி வினாடிவினா' : 'Take Quiz'}
                </Text>
              </TouchableOpacity>
            )}

            {onDeepLinkLearn && (
              <TouchableOpacity
                testID="deeplink-learn-btn"
                accessibilityRole="button"
                accessibilityLabel={t.accessibility?.studyCurriculumChapter}
                onPress={onDeepLinkLearn}
                style={styles.deepLinkPill}
              >
                <Text style={styles.deepLinkEmoji}>📖</Text>
                <Text style={styles.deepLinkText}>
                  {isTamil ? 'பாடத்திட்டம்' : 'Curriculum'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    maxHeight: 380,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: { elevation: 8 },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray100,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  iconText: {
    fontSize: 22,
  },
  headerTextWrap: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  nodeTitle: {
    fontSize: 16,
    fontFamily: theme.fontFamilies.bold,
    color: theme.colors.navy900,
  },
  keyBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  keyBadgeText: {
    color: '#B45309',
    fontSize: 10,
    fontFamily: theme.fontFamilies.bold,
  },
  typePill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    marginTop: 2,
  },
  typePillText: {
    fontSize: 10,
    fontFamily: theme.fontFamilies.medium,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 14,
    color: theme.colors.slate600,
    fontWeight: '700',
  },
  bodyScroll: {
    paddingHorizontal: 16,
  },
  bodyContent: {
    paddingVertical: 12,
    paddingBottom: 24,
  },
  sectionBlock: {
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 11,
    fontFamily: theme.fontFamilies.bold,
    color: theme.colors.slate500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  definitionText: {
    fontSize: 14,
    fontFamily: theme.fontFamilies.regular,
    color: theme.colors.navy800,
    lineHeight: 20,
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    gap: 10,
  },
  insightIcon: {
    fontSize: 18,
    marginTop: 2,
  },
  insightTextWrap: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 12,
    fontFamily: theme.fontFamilies.bold,
    marginBottom: 2,
  },
  insightBody: {
    fontSize: 12,
    fontFamily: theme.fontFamilies.regular,
    color: theme.colors.navy700,
    lineHeight: 16,
  },
  connectedChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  connectedChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 5,
  },
  connectedChipIcon: {
    fontSize: 12,
  },
  connectedChipText: {
    fontSize: 12,
    fontFamily: theme.fontFamilies.medium,
    color: theme.colors.navy900,
    maxWidth: 130,
  },
  connectedChipArrow: {
    fontSize: 11,
    color: theme.colors.blue600,
    fontWeight: '700',
  },
  actionRow: {
    marginTop: 6,
    marginBottom: 12,
  },
  exploreBtn: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exploreBtnText: {
    color: theme.colors.white,
    fontSize: 13,
    fontFamily: theme.fontFamilies.bold,
  },
  alreadyExploredBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: theme.colors.green50,
    borderWidth: 1,
    borderColor: theme.colors.green200,
    paddingVertical: 8,
    borderRadius: 10,
  },
  alreadyExploredIcon: {
    color: theme.colors.green600,
    fontWeight: '900',
  },
  alreadyExploredText: {
    color: theme.colors.green700,
    fontSize: 12,
    fontFamily: theme.fontFamilies.bold,
  },
  deepLinksSection: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray100,
    paddingTop: 10,
  },
  deepLinksTitle: {
    fontSize: 11,
    fontFamily: theme.fontFamilies.bold,
    color: theme.colors.slate500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  deepLinksRow: {
    flexDirection: 'row',
    gap: 8,
  },
  deepLinkPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 5,
  },
  deepLinkEmoji: {
    fontSize: 12,
  },
  deepLinkText: {
    fontSize: 11,
    fontFamily: theme.fontFamilies.bold,
    color: theme.colors.navy900,
  },
});
