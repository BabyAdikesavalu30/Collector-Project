import React, { useRef, useState, useMemo, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, PanResponder, Animated, Platform, Dimensions, useWindowDimensions, Modal, Keyboard, KeyboardEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// @ts-ignore
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';
import { useAccessibility } from '../../context';
import { AccessibilityQuickPanel } from './AccessibilityQuickPanel';
import { usePathname } from 'expo-router';
import { isNavVisible } from '../navigation/navigation.config';

const BUTTON_SIZE = 52;
const SNAP_OFFSET = 16;

export const AccessibilityFloatingButton: React.FC = () => {
  const { preferences, updatePreference } = useAccessibility();
  const insets = useSafeAreaInsets();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const pathname = usePathname();
  
  const [panelVisible, setPanelVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e: KeyboardEvent) => setKeyboardHeight(e.endCoordinates.height)
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardHeight(0)
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // Calculate boundaries
  const minX = insets.left + SNAP_OFFSET;
  const maxX = screenWidth - insets.right - BUTTON_SIZE - SNAP_OFFSET;
  const minY = insets.top + SNAP_OFFSET;
  
  const bottomNavHeight = isNavVisible(pathname) ? 80 : 0;
  // Dynamic maxY avoiding bottom nav and keyboard
  const maxY = screenHeight - insets.bottom - BUTTON_SIZE - SNAP_OFFSET - Math.max(bottomNavHeight, keyboardHeight);

  // Initial position from preferences
  const initialX = preferences.floatingButtonPositionX < 0 
    ? Math.max(minX, maxX + preferences.floatingButtonPositionX + SNAP_OFFSET)
    : Math.min(maxX, Math.max(minX, preferences.floatingButtonPositionX));
    
  const initialY = preferences.floatingButtonPositionY < 0
    ? Math.max(minY, maxY + preferences.floatingButtonPositionY + SNAP_OFFSET)
    : Math.min(maxY, Math.max(minY, preferences.floatingButtonPositionY));

  const pan = useRef(new Animated.ValueXY({ x: initialX, y: initialY })).current;

  // React to boundary changes (like keyboard appearing) to ensure button stays visible
  useEffect(() => {
    // Need to cast to access internal values
    const currentY = (pan.y as any)._value;
    const currentX = (pan.x as any)._value;
    
    if (currentY > maxY) {
      Animated.spring(pan, {
        toValue: { x: currentX, y: maxY },
        useNativeDriver: false,
        friction: 6,
        tension: 40
      }).start();
    }
    if (currentY < minY) {
       Animated.spring(pan, {
        toValue: { x: currentX, y: minY },
        useNativeDriver: false,
        friction: 6,
        tension: 40
      }).start();
    }
  }, [maxY, minY, pan]);

  const panResponder = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      // Only start panning if dragged a certain distance
      return Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10;
    },
    onPanResponderGrant: () => {
      setIsDragging(true);
      pan.setOffset({
        x: (pan.x as any)._value,
        y: (pan.y as any)._value
      });
      pan.setValue({ x: 0, y: 0 });
    },
    onPanResponderMove: Animated.event(
      [null, { dx: pan.x, dy: pan.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (_, gestureState) => {
      pan.flattenOffset();
      
      const currentX = (pan.x as any)._value;
      const currentY = (pan.y as any)._value;
      
      // Snap to edges
      let snapX = currentX;
      let snapY = currentY;
      
      if (currentX < screenWidth / 2) {
        snapX = minX;
      } else {
        snapX = maxX;
      }
      
      snapY = Math.min(Math.max(currentY, minY), maxY);

      if (preferences.reduceMotion) {
        pan.setValue({ x: snapX, y: snapY });
        updatePreference('floatingButtonPositionX', snapX);
        updatePreference('floatingButtonPositionY', snapY);
      } else {
        Animated.spring(pan, {
          toValue: { x: snapX, y: snapY },
          useNativeDriver: false,
          friction: 6,
          tension: 40
        }).start(() => {
          updatePreference('floatingButtonPositionX', snapX);
          updatePreference('floatingButtonPositionY', snapY);
        });
      }
      
      setTimeout(() => setIsDragging(false), 50);
    },
  }), [maxX, maxY, minX, minY, pan, preferences.reduceMotion, screenWidth, updatePreference]);

  const handlePress = () => {
    if (!isDragging) {
      setPanelVisible(true);
    }
  };

  const buttonStyle = {
    transform: pan.getTranslateTransform(),
  };

  return (
    <>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.floatingContainer, buttonStyle]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handlePress}
          style={[
            styles.button, 
            preferences.highContrast && styles.highContrastButton,
            preferences.largeTouchTargets && styles.largeButton
          ]}
          accessibilityRole="button"
          accessibilityLabel="Accessibility options"
          accessibilityHint="Open accessibility support"
        >
          <Ionicons 
            name="accessibility" 
            size={preferences.largeTouchTargets ? 32 : 28} 
            color={preferences.highContrast ? '#000' : theme.colors.white} 
            accessibilityElementsHidden={true}
            importantForAccessibility="no"
          />
        </TouchableOpacity>
      </Animated.View>

      <Modal
        visible={panelVisible}
        transparent
        animationType={preferences.reduceMotion ? 'none' : 'fade'}
        onRequestClose={() => setPanelVisible(false)}
      >
        <AccessibilityQuickPanel onClose={() => setPanelVisible(false)} />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999, // Ensure it floats above everything
    elevation: 10,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: theme.colors.brandPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  largeButton: {
    width: BUTTON_SIZE + 8,
    height: BUTTON_SIZE + 8,
    borderRadius: (BUTTON_SIZE + 8) / 2,
  },
  highContrastButton: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#000',
  }
});
