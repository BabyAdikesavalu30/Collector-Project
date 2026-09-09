/**
 * ConceptMapListView Component
 * Accessible Alternate List View ("View as List") for Concept Maps.
 * Guarantees 100% accessibility and structured linear reading for students and screen readers.
 * Groups nodes logically by role (Root, Inputs/Causes, Processes, Outputs/Effects, Related).
 */

import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { theme } from '../../theme';
import {
  ConceptMap,
  ConceptNode,
  ConceptNodeType,
} from '../../features/concept-maps/conceptMaps.types';
import {
  CONCEPT_SUBJECT_THEMES,
  NODE_TYPE_CONFIG,
} from '../../features/concept-maps/conceptMaps.data';
import { getTranslation, SupportedLanguage } from '../../config/i18n';

export interface ConceptMapListViewProps {
  map: ConceptMap;
  selectedNodeId: string | null;
  exploredNodeIds: string[];
  language?: SupportedLanguage;
  onSelectNode: (nodeId: string) => void;
  onSwitchToCanvasView?: () => void;
  testID?: string;
}

interface NodeGroup {
  id: string;
  title: { en: string; ta: string };
  types: ConceptNodeType[];
  nodes: ConceptNode[];
}

export const ConceptMapListView: React.FC<ConceptMapListViewProps> = ({
  map,
  selectedNodeId,
  exploredNodeIds,
  language = 'en',
  onSelectNode,
  onSwitchToCanvasView,
  testID = 'concept-map-list-view',
}) => {
  const isTamil = language === 'ta';
  const t = getTranslation(language).conceptMaps;
  const subjectTheme = CONCEPT_SUBJECT_THEMES[map.subject] || CONCEPT_SUBJECT_THEMES.physics;

  // Node dictionary
  const nodeDict = useMemo(() => {
    const dict: Record<string, ConceptNode> = {};
    map.nodes.forEach((n) => {
      dict[n.id] = n;
    });
    return dict;
  }, [map.nodes]);

  // Map of outgoing and incoming connections per node
  const connectionsByNode = useMemo(() => {
    const outgoing: Record<string, { target: ConceptNode; label: { en: string; ta: string } }[]> = {};
    const incoming: Record<string, { source: ConceptNode; label: { en: string; ta: string } }[]> = {};

    map.connections.forEach((conn) => {
      const fromNode = nodeDict[conn.fromNodeId];
      const toNode = nodeDict[conn.toNodeId];
      const connLabel = conn.label || { en: conn.relationship, ta: conn.relationship };
      if (fromNode && toNode) {
        if (!outgoing[conn.fromNodeId]) outgoing[conn.fromNodeId] = [];
        outgoing[conn.fromNodeId].push({ target: toNode, label: connLabel });

        if (!incoming[conn.toNodeId]) incoming[conn.toNodeId] = [];
        incoming[conn.toNodeId].push({ source: fromNode, label: connLabel });
      }
    });

    return { outgoing, incoming };
  }, [map.connections, nodeDict]);

  // Group nodes hierarchically
  const groups: NodeGroup[] = useMemo(() => {
    const rootNodes = map.nodes.filter((n) => n.type === 'root');
    const inputNodes = map.nodes.filter((n) =>
      ['input', 'cause', 'definition'].includes(n.type)
    );
    const processNodes = map.nodes.filter((n) =>
      ['process', 'concept'].includes(n.type)
    );
    const outputNodes = map.nodes.filter((n) =>
      ['output', 'effect'].includes(n.type)
    );
    const relatedNodes = map.nodes.filter((n) =>
      ['example', 'related'].includes(n.type)
    );

    const result: NodeGroup[] = [];

    if (rootNodes.length > 0) {
      result.push({
        id: 'group-root',
        title: { en: 'Core Foundation', ta: 'முதன்மை கருத்து' },
        types: ['root'],
        nodes: rootNodes,
      });
    }
    if (inputNodes.length > 0) {
      result.push({
        id: 'group-inputs',
        title: { en: 'Inputs & Starting Conditions', ta: 'உள்ளீடுகள் & தொடக்க நிலைகள்' },
        types: ['input', 'cause', 'definition'],
        nodes: inputNodes,
      });
    }
    if (processNodes.length > 0) {
      result.push({
        id: 'group-process',
        title: { en: 'Key Processes & Concepts', ta: 'முக்கிய செயல்முறைகள் & கருத்துகள்' },
        types: ['process', 'concept'],
        nodes: processNodes,
      });
    }
    if (outputNodes.length > 0) {
      result.push({
        id: 'group-output',
        title: { en: 'Outputs & Effects', ta: 'வெளியீடுகள் & விளைவுகள்' },
        types: ['output', 'effect'],
        nodes: outputNodes,
      });
    }
    if (relatedNodes.length > 0) {
      result.push({
        id: 'group-related',
        title: { en: 'Real-World Examples & Connections', ta: 'நடைமுறை உதாரணங்கள் & தொடர்புகள்' },
        types: ['example', 'related'],
        nodes: relatedNodes,
      });
    }

    return result;
  }, [map.nodes]);

  return (
    <View testID={testID} style={styles.container}>
      {/* Top Banner with Switch to Canvas View */}
      <View style={styles.headerBar}>
        <View style={styles.headerTextWrap}>
          <Text style={styles.headerTitle}>
            {isTamil ? 'அனைத்து கருத்துகளின் பட்டியல்' : 'Linear Concept Hierarchy'}
          </Text>
          <Text style={styles.headerSubtitle}>
            {map.nodes.length} {isTamil ? 'கருத்துகள் வரிசைப்படுத்தப்பட்டுள்ளன' : 'concepts structured by role'}
          </Text>
        </View>
        {onSwitchToCanvasView && (
          <TouchableOpacity
            testID="list-view-switch-to-canvas"
            accessibilityRole="button"
            accessibilityLabel={t.accessibility?.switchToCanvas}
            onPress={onSwitchToCanvasView}
            style={styles.switchCanvasBtn}
          >
            <Text style={styles.switchCanvasIcon}>🗺️</Text>
            <Text style={styles.switchCanvasText}>
              {isTamil ? 'வரைபடம்' : 'Canvas View'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator
      >
        {groups.map((group) => (
          <View key={group.id} style={styles.groupSection}>
            {/* Group Header */}
            <View style={styles.groupHeader}>
              <View style={[styles.groupIndicator, { backgroundColor: subjectTheme.primary }]} />
              <Text style={styles.groupTitle}>
                {isTamil ? group.title.ta : group.title.en}
              </Text>
              <Text style={styles.groupCount}>({group.nodes.length})</Text>
            </View>

            {/* Nodes in Group */}
            {group.nodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isExplored = exploredNodeIds.includes(node.id);
              const typeConfig = NODE_TYPE_CONFIG[node.type] || NODE_TYPE_CONFIG.concept;
              const label = isTamil ? (node.title?.ta || node.shortLabel?.ta) : (node.title?.en || node.shortLabel?.en);
              const definition = isTamil && node.definition.ta ? node.definition.ta : node.definition.en;
              const outgoing = connectionsByNode.outgoing[node.id] || [];

              return (
                <TouchableOpacity
                  key={node.id}
                  testID={`list-node-${node.id}`}
                  accessibilityRole="button"
                  accessibilityLabel={`${label}, ${typeConfig.label.en}, ${isExplored ? 'explored' : 'unexplored'}`}
                  activeOpacity={0.88}
                  onPress={() => onSelectNode(node.id)}
                  style={[
                    styles.nodeCard,
                    isSelected && {
                      borderColor: subjectTheme.primary,
                      borderWidth: 2,
                      backgroundColor: subjectTheme.surface,
                    },
                  ]}
                >
                  {/* Top Row: Icon + Title + Type Badge + Explored Status */}
                  <View style={styles.nodeHeaderRow}>
                    <View style={[styles.iconBox, { backgroundColor: typeConfig.bgColor }]}>
                      <Text style={styles.iconText}>{node.icon || typeConfig.icon}</Text>
                    </View>

                    <View style={styles.nodeTitleWrap}>
                      <View style={styles.titleRow}>
                        <Text style={styles.nodeTitle}>{label}</Text>
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

                    <View style={styles.statusWrap}>
                      {isExplored ? (
                        <View style={styles.exploredBadge}>
                          <Text style={styles.exploredCheck}>✓</Text>
                          <Text style={styles.exploredText}>
                            {isTamil ? 'ஆராயப்பட்டது' : 'Explored'}
                          </Text>
                        </View>
                      ) : (
                        <View style={styles.unexploredBadge}>
                          <Text style={styles.unexploredText}>
                            {isTamil ? 'ஆராயத் தொடங்கு' : 'Tap to explore'}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  {/* Definition */}
                  <Text style={styles.nodeDefinition}>{definition}</Text>

                  {/* Outgoing Connections */}
                  {outgoing.length > 0 && (
                    <View style={styles.linksContainer}>
                      <Text style={styles.linksHeader}>
                        {isTamil ? 'தொடர்புகள்:' : 'Connects to:'}
                      </Text>
                      {outgoing.map((link, idx) => {
                        const linkTargetLabel = isTamil
                          ? (link.target.title?.ta || link.target.shortLabel?.ta)
                          : (link.target.title?.en || link.target.shortLabel?.en);
                        const linkLabel = isTamil && link.label.ta ? link.label.ta : link.label.en;
                        return (
                          <View key={idx} style={styles.linkRow}>
                            <Text style={styles.linkArrow}>➔</Text>
                            <Text style={styles.linkRelationship}>{linkLabel}</Text>
                            <Text style={styles.linkTarget}>{linkTargetLabel}</Text>
                          </View>
                        );
                      })}
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTextWrap: {
    flex: 1,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 14,
    fontFamily: theme.fontFamilies.bold,
    color: theme.colors.navy900,
  },
  headerSubtitle: {
    fontSize: 11,
    fontFamily: theme.fontFamilies.regular,
    color: theme.colors.slate500,
    marginTop: 2,
  },
  switchCanvasBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: theme.colors.purple50,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  switchCanvasIcon: {
    fontSize: 14,
  },
  switchCanvasText: {
    fontSize: 12,
    fontFamily: theme.fontFamilies.bold,
    color: theme.colors.purple700,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  groupSection: {
    marginBottom: 24,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  groupIndicator: {
    width: 4,
    height: 16,
    borderRadius: 2,
  },
  groupTitle: {
    fontSize: 14,
    fontFamily: theme.fontFamilies.bold,
    color: theme.colors.navy900,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  groupCount: {
    fontSize: 12,
    fontFamily: theme.fontFamilies.medium,
    color: theme.colors.slate500,
  },
  nodeCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: { elevation: 2 },
    }),
  },
  nodeHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  iconText: {
    fontSize: 20,
  },
  nodeTitleWrap: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  nodeTitle: {
    fontSize: 15,
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
    marginTop: 3,
  },
  typePillText: {
    fontSize: 10,
    fontFamily: theme.fontFamilies.medium,
  },
  statusWrap: {
    alignItems: 'flex-end',
  },
  exploredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: theme.colors.green50,
    borderWidth: 1,
    borderColor: theme.colors.green200,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  exploredCheck: {
    color: theme.colors.green600,
    fontSize: 12,
    fontWeight: '800',
  },
  exploredText: {
    color: theme.colors.green700,
    fontSize: 11,
    fontFamily: theme.fontFamilies.medium,
  },
  unexploredBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  unexploredText: {
    color: theme.colors.slate600,
    fontSize: 11,
    fontFamily: theme.fontFamilies.medium,
  },
  nodeDefinition: {
    fontSize: 13,
    fontFamily: theme.fontFamilies.regular,
    color: theme.colors.navy700,
    lineHeight: 19,
    marginBottom: 8,
  },
  linksContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 8,
    marginTop: 4,
  },
  linksHeader: {
    fontSize: 11,
    fontFamily: theme.fontFamilies.bold,
    color: theme.colors.slate500,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  linkArrow: {
    fontSize: 11,
    color: theme.colors.blue600,
  },
  linkRelationship: {
    fontSize: 11,
    fontFamily: theme.fontFamilies.medium,
    color: theme.colors.slate500,
    fontStyle: 'italic',
  },
  linkTarget: {
    fontSize: 12,
    fontFamily: theme.fontFamilies.bold,
    color: theme.colors.navy900,
  },
});
