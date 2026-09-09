/**
 * ConceptMapDetailScreen Component
 * Detail route (/concept-map/[id]): Interactive concept map exploration screen.
 * Integrates AppBackButton, bookmark button, Canvas vs List view toggle,
 * exploration progress tracker, node inspector panel, and completion celebration.
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { AppBackButton } from '../navigation';
import {
  ConceptMap,
  ConceptMapProgress,
  ConceptViewMode,
} from '../../features/concept-maps/conceptMaps.types';
import {
  CONCEPT_SUBJECT_THEMES,
} from '../../features/concept-maps/conceptMaps.data';
import { ConceptMapCanvas } from './ConceptMapCanvas';
import { ConceptMapListView } from './ConceptMapListView';
import { ConceptNodePanel } from './ConceptNodePanel';
import { ConceptMapCompletion } from './ConceptMapCompletion';
import { SupportedLanguage } from '../../config/i18n';

export interface ConceptMapDetailScreenProps {
  map: ConceptMap;
  progress: ConceptMapProgress | null;
  isBookmarked: boolean;
  selectedNodeId: string | null;
  viewMode: ConceptViewMode;
  showCompletionModal: boolean;
  language?: SupportedLanguage;
  onSelectNode: (nodeId: string | null) => void;
  onExploreNode: (nodeId: string) => Promise<void>;
  onToggleBookmark: () => void;
  onToggleViewMode: () => void;
  onDismissCompletion: () => void;
  onBack: () => void;
  onDeepLinkMicroLesson?: (lessonId?: string) => void;
  onDeepLinkQuiz?: (subject: string) => void;
  onDeepLinkLearn?: () => void;
  onGoToHub?: () => void;
}

export const ConceptMapDetailScreen: React.FC<ConceptMapDetailScreenProps> = ({
  map,
  progress,
  isBookmarked,
  selectedNodeId,
  viewMode,
  showCompletionModal,
  language = 'en',
  onSelectNode,
  onExploreNode,
  onToggleBookmark,
  onToggleViewMode,
  onDismissCompletion,
  onBack,
  onDeepLinkMicroLesson,
  onDeepLinkQuiz,
  onDeepLinkLearn,
  onGoToHub,
}) => {
  const insets = useSafeAreaInsets();
  const isTamil = language === 'ta';
  const subjectTheme = CONCEPT_SUBJECT_THEMES[map.subject] || CONCEPT_SUBJECT_THEMES.physics;

  const title = isTamil && map.title.ta ? map.title.ta : map.title.en;
  const exploredNodeIds = progress?.exploredNodeIds || [];
  const exploredCount = exploredNodeIds.length;
  const totalNodes = map.nodes.length;
  const progressPercent = totalNodes > 0 ? Math.min(100, Math.round((exploredCount / totalNodes) * 100)) : 0;
  const isCompleted = progress?.status === 'completed' || progress?.completed;

  // Selected node object
  const selectedNode = map.nodes.find((n) => n.id === selectedNodeId) || null;

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      {/* Standard Header with AppBackButton + View Toggle + Bookmark */}
      <View style={styles.headerBar}>
        <AppBackButton
          onPress={onBack}
          accessibilityLabel={isTamil ? 'பின்செல்' : 'Go back'}
          language={language}
          testID="concept-map-detail-back-btn"
        />

        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.headerSubtitle}>
            {isTamil ? subjectTheme.label.ta : subjectTheme.label.en} • {totalNodes} {isTamil ? 'கருத்துகள்' : 'concepts'}
          </Text>
        </View>

        {/* Header Right Actions */}
        <View style={styles.headerActions}>
          {/* Canvas / List Toggle */}
          <TouchableOpacity
            testID="concept-map-view-toggle-btn"
            accessibilityRole="button"
            accessibilityLabel={
              viewMode === 'canvas'
                ? isTamil
                  ? 'பட்டியல் காட்சிக்கு மாற்று'
                  : 'Switch to list view'
                : isTamil
                ? 'வரைபட காட்சிக்கு மாற்று'
                : 'Switch to canvas view'
            }
            onPress={onToggleViewMode}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.headerIconBtn}
          >
            <Text style={styles.headerIconText}>
              {viewMode === 'canvas' ? '📋' : '🗺️'}
            </Text>
          </TouchableOpacity>

          {/* Bookmark Button */}
          <TouchableOpacity
            testID="concept-map-detail-bookmark-btn"
            accessibilityRole="button"
            accessibilityLabel={
              isBookmarked
                ? isTamil
                  ? 'புக்மார்க்கை நீக்கு'
                  : 'Remove bookmark'
                : isTamil
                ? 'புக்மார்க் செய்க'
                : 'Bookmark concept map'
            }
            onPress={onToggleBookmark}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.headerIconBtn}
          >
            <Text style={[styles.headerIconText, { color: isBookmarked ? '#EAB308' : theme.colors.slate400 }]}>
              {isBookmarked ? '★' : '☆'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Progress Strip */}
      <View
        style={styles.progressStrip}
        accessible={true}
        accessibilityRole="progressbar"
        accessibilityValue={{
          min: 0,
          max: totalNodes,
          now: exploredCount,
          text: `${exploredCount}/${totalNodes} ${isTamil ? 'கருத்துகள் ஆராயப்பட்டன' : 'concepts explored'}`,
        }}
      >
        <View style={styles.progressTextRow}>
          <Text style={styles.progressCountText}>
            {exploredCount}/{totalNodes} {isTamil ? 'கருத்துகள் ஆராயப்பட்டன' : 'concepts explored'}
          </Text>
          <Text style={styles.progressPercentText}>{progressPercent}%</Text>
        </View>
        <View style={styles.progressBarTrack}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${progressPercent}%`,
                backgroundColor: isCompleted ? theme.colors.green600 : subjectTheme.primary,
              },
            ]}
          />
        </View>
      </View>

      {/* Main Exploration Area (Canvas or Accessible List) */}
      <View style={styles.contentArea}>
        {viewMode === 'canvas' ? (
          <ConceptMapCanvas
            map={map}
            selectedNodeId={selectedNodeId}
            exploredNodeIds={exploredNodeIds}
            language={language}
            onSelectNode={onSelectNode}
            onSwitchToListView={onToggleViewMode}
          />
        ) : (
          <ConceptMapListView
            map={map}
            selectedNodeId={selectedNodeId}
            exploredNodeIds={exploredNodeIds}
            language={language}
            onSelectNode={onSelectNode}
            onSwitchToCanvasView={onToggleViewMode}
          />
        )}
      </View>

      {/* Selected Node Inspector Panel */}
      {selectedNode && (
        <ConceptNodePanel
          map={map}
          node={selectedNode}
          isExplored={exploredNodeIds.includes(selectedNode.id)}
          language={language}
          onExploreNode={onExploreNode}
          onSelectNode={onSelectNode}
          onClose={() => onSelectNode(null)}
          onDeepLinkMicroLesson={onDeepLinkMicroLesson}
          onDeepLinkQuiz={onDeepLinkQuiz}
          onDeepLinkLearn={onDeepLinkLearn}
        />
      )}

      {/* Completion Modal Celebration */}
      <Modal
        visible={showCompletionModal}
        transparent
        animationType="fade"
        onRequestClose={onDismissCompletion}
      >
        <View style={styles.modalOverlay}>
          <ConceptMapCompletion
            map={map}
            xpEarned={10}
            language={language}
            onReviewMap={onDismissCompletion}
            onGoToHub={() => {
              onDismissCompletion();
              if (onGoToHub) {
                onGoToHub();
              } else {
                onBack();
              }
            }}
            onPracticeQuiz={(subj) => {
              onDismissCompletion();
              onDeepLinkQuiz?.(subj);
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitleWrap: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: theme.fontFamilies.bold,
    color: theme.colors.navy900,
  },
  headerSubtitle: {
    fontSize: 11,
    fontFamily: theme.fontFamilies.regular,
    color: theme.colors.slate500,
    marginTop: 1,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconText: {
    fontSize: 16,
  },
  progressStrip: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressCountText: {
    fontSize: 12,
    fontFamily: theme.fontFamilies.medium,
    color: theme.colors.slate600,
  },
  progressPercentText: {
    fontSize: 12,
    fontFamily: theme.fontFamilies.bold,
    color: theme.colors.navy900,
  },
  progressBarTrack: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  contentArea: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});
