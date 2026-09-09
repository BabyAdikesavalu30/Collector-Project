/**
 * ConceptMapCanvas Component
 * Interactive visual canvas rendering science concept nodes and relational connection lines.
 * Uses pure React Native layout & transforms (no SVG dependencies required).
 * Provides zoom/fit controls, node selection, and accessible touch targets (>=48x48).
 */

import React, { useState, useMemo, useRef } from 'react';
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
  ConceptConnection,
  ConceptNodeType,
} from '../../features/concept-maps/conceptMaps.types';
import {
  CONCEPT_SUBJECT_THEMES,
  NODE_TYPE_CONFIG,
} from '../../features/concept-maps/conceptMaps.data';
import { SupportedLanguage } from '../../config/i18n';

export interface ConceptMapCanvasProps {
  map: ConceptMap;
  selectedNodeId: string | null;
  exploredNodeIds: string[];
  language?: SupportedLanguage;
  onSelectNode: (nodeId: string) => void;
  onSwitchToListView?: () => void;
  testID?: string;
}

const NODE_WIDTH = 96;
const NODE_HEIGHT = 80;

export const ConceptMapCanvas: React.FC<ConceptMapCanvasProps> = ({
  map,
  selectedNodeId,
  exploredNodeIds,
  language = 'en',
  onSelectNode,
  onSwitchToListView,
  testID = 'concept-map-canvas',
}) => {
  const isTamil = language === 'ta';
  const subjectTheme = CONCEPT_SUBJECT_THEMES[map.subject] || CONCEPT_SUBJECT_THEMES.physics;
  const [zoomScale, setZoomScale] = useState<number>(1.0);
  const verticalScrollRef = useRef<ScrollView>(null);
  const horizontalScrollRef = useRef<ScrollView>(null);

  // Compute bounding box to ensure canvas fits all nodes with comfortable margin
  const { canvasWidth, canvasHeight, minX, minY } = useMemo(() => {
    let minXVal = Infinity;
    let maxXVal = -Infinity;
    let minYVal = Infinity;
    let maxYVal = -Infinity;

    map.nodes.forEach((node) => {
      if (node.position.x < minXVal) minXVal = node.position.x;
      if (node.position.x > maxXVal) maxXVal = node.position.x;
      if (node.position.y < minYVal) minYVal = node.position.y;
      if (node.position.y > maxYVal) maxYVal = node.position.y;
    });

    const calculatedWidth = Math.max(420, maxXVal + NODE_WIDTH + 60);
    const calculatedHeight = Math.max(520, maxYVal + NODE_HEIGHT + 80);

    return {
      canvasWidth: calculatedWidth,
      canvasHeight: calculatedHeight,
      minX: Math.max(0, minXVal - 20),
      minY: Math.max(0, minYVal - 20),
    };
  }, [map.nodes]);

  // Lookup node by ID
  const nodeMap = useMemo(() => {
    const dict: Record<string, ConceptNode> = {};
    map.nodes.forEach((n) => {
      dict[n.id] = n;
    });
    return dict;
  }, [map.nodes]);

  // Zoom controls
  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(1.4, Number((prev + 0.15).toFixed(2))));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => Math.max(0.75, Number((prev - 0.15).toFixed(2))));
  };

  const handleResetView = () => {
    setZoomScale(1.0);
    verticalScrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    horizontalScrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  };

  // Render a connection line between two nodes
  const renderConnection = (connection: ConceptConnection) => {
    const fromNode = nodeMap[connection.fromNodeId];
    const toNode = nodeMap[connection.toNodeId];
    if (!fromNode || !toNode) return null;

    // Centers of nodes
    const cx1 = fromNode.position.x + NODE_WIDTH / 2;
    const cy1 = fromNode.position.y + NODE_HEIGHT / 2;
    const cx2 = toNode.position.x + NODE_WIDTH / 2;
    const cy2 = toNode.position.y + NODE_HEIGHT / 2;

    const dx = cx2 - cx1;
    const dy = cy2 - cy1;
    const distance = Math.hypot(dx, dy);
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

    // Midpoint
    const mx = (cx1 + cx2) / 2;
    const my = (cy1 + cy2) / 2;

    const isConnectedToSelected =
      selectedNodeId === connection.fromNodeId || selectedNodeId === connection.toNodeId;

    const connLabel = connection.label || { en: connection.relationship, ta: connection.relationship };
    const relationshipLabel = isTamil && connLabel.ta ? connLabel.ta : connLabel.en;

    return (
      <React.Fragment key={connection.id}>
        {/* Line Segment */}
        <View
          style={[
            styles.connectionLine,
            {
              left: mx - distance / 2,
              top: my - 1,
              width: distance,
              transform: [{ rotate: `${angle}deg` }],
              backgroundColor: isConnectedToSelected
                ? subjectTheme.primary
                : '#CBD5E1',
              height: isConnectedToSelected ? 3 : 2,
              zIndex: isConnectedToSelected ? 2 : 1,
            },
          ]}
        />

        {/* Relationship Badge in Midpoint */}
        <View
          style={[
            styles.relationshipBadge,
            {
              left: mx - 45,
              top: my - 11,
              borderColor: isConnectedToSelected ? subjectTheme.primary : '#E2E8F0',
              backgroundColor: isConnectedToSelected ? theme.colors.purple50 : theme.colors.white,
              zIndex: isConnectedToSelected ? 4 : 3,
            },
          ]}
        >
          <Text
            style={[
              styles.relationshipText,
              {
                color: isConnectedToSelected ? subjectTheme.primary : theme.colors.slate600,
                fontWeight: isConnectedToSelected ? '700' : '500',
              },
            ]}
            numberOfLines={1}
          >
            {relationshipLabel} →
          </Text>
        </View>
      </React.Fragment>
    );
  };

  // Render a concept node card
  const renderNode = (node: ConceptNode) => {
    const isSelected = selectedNodeId === node.id;
    const isExplored = exploredNodeIds.includes(node.id);
    const typeConfig = NODE_TYPE_CONFIG[node.type] || NODE_TYPE_CONFIG.concept;
    const label = isTamil
      ? (node.shortLabel?.ta || node.title?.ta)
      : (node.shortLabel?.en || node.title?.en);

    // Semantic border/colors based on node type & selection
    let borderColor = typeConfig.borderColor;
    let bgColor = typeConfig.bgColor;
    if (isSelected) {
      borderColor = subjectTheme.primary;
      bgColor = subjectTheme.surface;
    }

    return (
      <TouchableOpacity
        key={node.id}
        testID={`concept-node-${node.id}`}
        accessibilityRole="button"
        accessibilityLabel={`${label}, ${isTamil ? typeConfig.label.ta : typeConfig.label.en}, ${isExplored ? (isTamil ? 'ஆராயப்பட்டது' : 'explored') : (isTamil ? 'ஆராயப்படவில்லை' : 'unexplored')}`}
        activeOpacity={0.85}
        onPress={() => onSelectNode(node.id)}
        style={[
          styles.nodeCard,
          {
            left: node.position.x,
            top: node.position.y,
            width: NODE_WIDTH,
            height: NODE_HEIGHT,
            backgroundColor: bgColor,
            borderColor: borderColor,
            borderWidth: isSelected ? 2.5 : 1.5,
            zIndex: isSelected ? 10 : 5,
            transform: [{ scale: isSelected ? 1.06 : 1.0 }],
          },
        ]}
      >
        {/* Top Badges: Explored Checkmark & Key Node Star */}
        <View style={styles.nodeBadgeRow}>
          {node.keyNode && (
            <View style={styles.keyNodeBadge}>
              <Text style={styles.keyNodeText}>★</Text>
            </View>
          )}
          {isExplored && (
            <View style={styles.exploredBadge}>
              <Text style={styles.exploredBadgeText}>✓</Text>
            </View>
          )}
        </View>

        {/* Node Icon */}
        <Text style={styles.nodeIcon}>{node.icon || typeConfig.icon}</Text>

        {/* Node Label */}
        <Text
          style={[
            styles.nodeLabel,
            {
              color: isSelected ? subjectTheme.primary : theme.colors.navy900,
              fontFamily: isSelected ? theme.fontFamilies.bold : theme.fontFamilies.medium,
            },
          ]}
          numberOfLines={2}
        >
          {label}
        </Text>

        {/* Node Type Pill */}
        <View style={[styles.typePill, { backgroundColor: typeConfig.borderColor + '25' }]}>
          <Text style={[styles.typePillText, { color: typeConfig.color }]}>
            {isTamil ? typeConfig.label.ta : typeConfig.label.en}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View testID={testID} style={styles.container}>
      {/* Mini Controls Bar */}
      <View style={styles.toolbar}>
        <View style={styles.zoomGroup}>
          <TouchableOpacity
            testID="canvas-zoom-out"
            accessibilityRole="button"
            accessibilityLabel={isTamil ? 'சிறிதாக்கு' : 'Zoom out'}
            onPress={handleZoomOut}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.toolBtn}
          >
            <Text style={styles.toolBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.zoomScaleText}>{Math.round(zoomScale * 100)}%</Text>
          <TouchableOpacity
            testID="canvas-zoom-in"
            accessibilityRole="button"
            accessibilityLabel={isTamil ? 'பெரிதாக்கு' : 'Zoom in'}
            onPress={handleZoomIn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.toolBtn}
          >
            <Text style={styles.toolBtnText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="canvas-reset-view"
            accessibilityRole="button"
            accessibilityLabel={isTamil ? 'இயல்பு நிலைக்கு மீட்டமை' : 'Reset view'}
            onPress={handleResetView}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.toolBtnTextWrap}
          >
            <Text style={styles.toolBtnLabel}>{isTamil ? 'மையப்படுத்து' : 'Reset'}</Text>
          </TouchableOpacity>
        </View>

        {onSwitchToListView && (
          <TouchableOpacity
            testID="canvas-switch-to-list"
            accessibilityRole="button"
            accessibilityLabel={isTamil ? 'பட்டியல் காட்சிக்கு மாற்று' : 'Switch to list view'}
            onPress={onSwitchToListView}
            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
            style={styles.switchViewBtn}
          >
            <Text style={styles.switchViewIcon}>📋</Text>
            <Text style={styles.switchViewText}>
              {isTamil ? 'பட்டியலாக' : 'View as List'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Dual Scrollable Canvas Container */}
      <ScrollView
        ref={verticalScrollRef}
        style={styles.scrollVertical}
        contentContainerStyle={[styles.scrollContent, { minHeight: canvasHeight * zoomScale }]}
        showsVerticalScrollIndicator
      >
        <ScrollView
          ref={horizontalScrollRef}
          horizontal
          style={styles.scrollHorizontal}
          contentContainerStyle={{ minWidth: canvasWidth * zoomScale }}
          showsHorizontalScrollIndicator
        >
          <View
            style={[
              styles.canvasArea,
              {
                width: canvasWidth,
                height: canvasHeight,
                transform: [{ scale: zoomScale }],
                transformOrigin: 'top left',
              },
            ]}
          >
            {/* Grid dot pattern background hint */}
            <View style={styles.gridOverlay} pointerEvents="none" />

            {/* Relational Connections */}
            {map.connections.map(renderConnection)}

            {/* Concept Nodes */}
            {map.nodes.map(renderNode)}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    zIndex: 20,
  },
  zoomGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  toolBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  toolBtnText: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.navy900,
    lineHeight: 20,
  },
  zoomScaleText: {
    fontSize: 12,
    fontFamily: theme.fontFamilies.medium,
    color: theme.colors.slate600,
    width: 42,
    textAlign: 'center',
  },
  toolBtnTextWrap: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
  },
  toolBtnLabel: {
    fontSize: 11,
    fontFamily: theme.fontFamilies.medium,
    color: theme.colors.slate600,
  },
  switchViewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: theme.colors.purple50,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  switchViewIcon: {
    fontSize: 13,
  },
  switchViewText: {
    fontSize: 12,
    fontFamily: theme.fontFamilies.bold,
    color: theme.colors.purple700,
  },
  scrollVertical: {
    flex: 1,
  },
  scrollHorizontal: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  canvasArea: {
    position: 'relative',
    backgroundColor: '#F8FAFC',
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.25,
  },

  // Connections
  connectionLine: {
    position: 'absolute',
    borderRadius: 1.5,
  },
  relationshipBadge: {
    position: 'absolute',
    width: 90,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: { elevation: 1 },
    }),
  },
  relationshipText: {
    fontSize: 10,
    fontFamily: theme.fontFamilies.medium,
  },

  // Nodes
  nodeCard: {
    position: 'absolute',
    borderRadius: 14,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: { elevation: 3 },
    }),
  },
  nodeBadgeRow: {
    position: 'absolute',
    top: -6,
    right: -6,
    flexDirection: 'row',
    gap: 2,
    zIndex: 15,
  },
  keyNodeBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.white,
  },
  keyNodeText: {
    color: theme.colors.white,
    fontSize: 10,
    fontWeight: '800',
  },
  exploredBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: theme.colors.green600,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.white,
  },
  exploredBadgeText: {
    color: theme.colors.white,
    fontSize: 10,
    fontWeight: '900',
  },
  nodeIcon: {
    fontSize: 20,
    marginTop: 2,
  },
  nodeLabel: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 14,
    paddingHorizontal: 2,
  },
  typePill: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  typePillText: {
    fontSize: 8.5,
    fontFamily: theme.fontFamilies.bold,
    letterSpacing: 0.3,
  },
});
