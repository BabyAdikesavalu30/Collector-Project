/**
 * VariableControl Component
 * Accessible, mobile-first variable control interface for virtual science simulations.
 * Supports sliders/steppers with +/- buttons, segmented pills, and toggles.
 * Guarantees min 44x44 touch targets and screen-reader accessibility announcements.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { colors } from '../../theme/colors';
import { ExperimentVariable } from '../../features/experiment-lab/experiment.types';
import { SupportedLanguage } from '../../config/i18n';

interface VariableControlProps {
  variable: ExperimentVariable;
  value: unknown;
  language?: SupportedLanguage;
  onChange: (value: unknown) => void;
  disabled?: boolean;
}

export const VariableControl: React.FC<VariableControlProps> = ({
  variable,
  value,
  language = 'en',
  onChange,
  disabled = false,
}) => {
  const isTamil = language === 'ta';
  const label = isTamil ? variable.label.ta : variable.label.en;
  const unit = isTamil && variable.unitTa ? variable.unitTa : variable.unit;
  const description = variable.description
    ? isTamil
      ? variable.description.ta
      : variable.description.en
    : null;

  const min = variable.min ?? 0;
  const max = variable.max ?? 100;
  const step = variable.step ?? 1;

  const numValue = typeof value === 'number' ? value : Number(value) || min;
  const percent = max > min ? Math.max(0, Math.min(100, ((numValue - min) / (max - min)) * 100)) : 0;

  const handleDecrement = () => {
    if (disabled) return;
    const next = Math.max(min, Math.round((numValue - step) * 100) / 100);
    onChange(next);
  };

  const handleIncrement = () => {
    if (disabled) return;
    const next = Math.min(max, Math.round((numValue + step) * 100) / 100);
    onChange(next);
  };

  return (
    <View
      style={styles.card}
      accessible={true}
      accessibilityRole="adjustable"
      accessibilityLabel={`${label}: ${numValue} ${unit}`}
      accessibilityValue={{ min, max, now: numValue, text: `${numValue} ${unit}` }}
      accessibilityHint={
        isTamil
          ? `குறைக்க அல்லது அதிகரிக்க பொத்தான்களை அழுத்தவும். குறைந்தபட்சம் ${min}, அதிகபட்சம் ${max}.`
          : `Use decrease and increase buttons. Minimum ${min}, maximum ${max}.`
      }
    >
      {/* Header with Title and Current Value Badge */}
      <View style={styles.headerRow}>
        <View style={styles.titleCol}>
          <Text style={styles.variableLabel}>{label}</Text>
          {description ? <Text style={styles.variableDescription}>{description}</Text> : null}
        </View>

        <View style={styles.valueBadge}>
          <Text style={styles.valueText}>
            {variable.type === 'segmented' && variable.options
              ? (
                  (isTamil
                    ? variable.options.find((o) => o.value === value)?.label.ta
                    : variable.options.find((o) => o.value === value)?.label.en) || String(value)
                )
              : `${numValue} ${unit}`.trim()}
          </Text>
        </View>
      </View>

      {/* Numeric Stepper / Slider Track */}
      {(variable.type === 'slider' || variable.type === 'stepper') && (
        <View style={styles.sliderContainer}>
          <TouchableOpacity
            style={[styles.stepButton, (disabled || numValue <= min) && styles.stepButtonDisabled]}
            onPress={handleDecrement}
            disabled={disabled || numValue <= min}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={isTamil ? `${label} குறைக்க` : `Decrease ${label}`}
            hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
          >
            <Text style={[styles.stepButtonText, (disabled || numValue <= min) && styles.stepButtonTextDisabled]}>
              −
            </Text>
          </TouchableOpacity>

          <View style={styles.trackWrapper}>
            <View style={styles.trackBackground}>
              <View style={[styles.trackFill, { width: `${percent}%` }]} />
            </View>
            <View style={styles.minMaxRow}>
              <Text style={styles.minMaxText}>
                {min} {unit}
              </Text>
              <Text style={styles.minMaxText}>
                {max} {unit}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.stepButton, (disabled || numValue >= max) && styles.stepButtonDisabled]}
            onPress={handleIncrement}
            disabled={disabled || numValue >= max}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={isTamil ? `${label} அதிகரிக்க` : `Increase ${label}`}
            hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
          >
            <Text style={[styles.stepButtonText, (disabled || numValue >= max) && styles.stepButtonTextDisabled]}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Segmented Option Selector */}
      {variable.type === 'segmented' && variable.options && (
        <View style={styles.segmentedContainer}>
          {variable.options.map((opt) => {
            const isSelected = opt.value === value;
            const optLabel = isTamil ? opt.label.ta : opt.label.en;
            return (
              <TouchableOpacity
                key={String(opt.value)}
                style={[styles.segmentedPill, isSelected && styles.segmentedPillSelected]}
                onPress={() => !disabled && onChange(opt.value)}
                disabled={disabled}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                accessibilityLabel={optLabel}
                hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
              >
                <Text
                  style={[styles.segmentedPillText, isSelected && styles.segmentedPillTextSelected]}
                  numberOfLines={1}
                >
                  {optLabel}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* Toggle */}
      {variable.type === 'toggle' && (
        <TouchableOpacity
          style={[styles.toggleContainer, value ? styles.toggleActive : styles.toggleInactive]}
          onPress={() => !disabled && onChange(!value)}
          disabled={disabled}
          activeOpacity={0.8}
          accessibilityRole="switch"
          accessibilityState={{ checked: Boolean(value) }}
        >
          <Text style={[styles.toggleText, value ? styles.toggleTextActive : styles.toggleTextInactive]}>
            {value ? (isTamil ? 'இயக்கத்தில் உள்ளது (ஆன்)' : 'Enabled') : isTamil ? 'அணைக்கப்பட்டுள்ளது (ஆஃப்)' : 'Disabled'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 14,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  titleCol: {
    flex: 1,
    paddingRight: 10,
  },
  variableLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.navy900,
  },
  variableDescription: {
    fontSize: 12,
    color: colors.slate600,
    marginTop: 2,
    lineHeight: 16,
  },
  valueBadge: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  valueText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.blue600,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  stepButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  stepButtonDisabled: {
    opacity: 0.35,
    borderColor: '#E2E8F0',
  },
  stepButtonText: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.navy900,
    lineHeight: 24,
  },
  stepButtonTextDisabled: {
    color: colors.slate400,
  },
  trackWrapper: {
    flex: 1,
    marginHorizontal: 12,
  },
  trackBackground: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  trackFill: {
    height: '100%',
    backgroundColor: colors.blue600,
    borderRadius: 5,
  },
  minMaxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  minMaxText: {
    fontSize: 11,
    color: colors.slate500,
    fontWeight: '500',
  },
  segmentedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
  },
  segmentedPill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentedPillSelected: {
    backgroundColor: '#2563EB',
    borderColor: '#1D4ED8',
  },
  segmentedPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.navy800,
  },
  segmentedPillTextSelected: {
    color: colors.white,
  },
  toggleContainer: {
    minHeight: 44,
    paddingHorizontal: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginTop: 4,
  },
  toggleActive: {
    backgroundColor: '#DCFCE7',
    borderColor: '#86EFAC',
  },
  toggleInactive: {
    backgroundColor: '#F1F5F9',
    borderColor: '#CBD5E1',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '700',
  },
  toggleTextActive: {
    color: colors.green700,
  },
  toggleTextInactive: {
    color: colors.slate600,
  },
});
