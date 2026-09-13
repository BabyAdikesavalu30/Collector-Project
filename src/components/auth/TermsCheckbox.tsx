/**
 * TermsCheckbox Component
 * Accessible checkbox for accepting Terms & Conditions and Privacy Policy.
 * Complies with 44x44 dp minimum touch target, accessibility standards,
 * and direct links to official legal routes (/terms and /privacy).
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { useLanguage } from '../../context/LanguageContext';

interface TermsCheckboxProps {
  checked: boolean;
  onToggle: () => void;
  error?: string | null;
  language?: SupportedLanguage;
  disabled?: boolean;
}

export const TermsCheckbox: React.FC<TermsCheckboxProps> = ({
  checked,
  onToggle,
  error,
  language,
  disabled = false,
}) => {
  const router = useRouter();
  const context = useLanguage();
  const activeLanguage = language || context?.language || 'en';
  const t = getTranslation(activeLanguage).auth.register;
  const isTamil = activeLanguage === 'ta';

  const handleTermsPress = () => {
    try {
      router.push('/terms');
    } catch {
      // Fallback
    }
  };

  const handlePrivacyPress = () => {
    try {
      router.push('/privacy');
    } catch {
      // Fallback
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* 44x44 dp Accessible Touch Area for Checkbox */}
        <TouchableOpacity
          style={styles.checkboxTouchTarget}
          onPress={onToggle}
          activeOpacity={0.7}
          disabled={disabled}
          accessible={true}
          accessibilityRole="checkbox"
          accessibilityState={{ checked }}
          accessibilityLabel={t.terms}
          accessibilityHint={t.accessibility.termsCheckbox}
        >
          <View
            style={[
              styles.checkboxBox,
              checked && styles.checkboxBoxChecked,
              Boolean(error) && styles.checkboxBoxError,
            ]}
          >
            {checked && <Text style={styles.checkGlyph}>✓</Text>}
          </View>
        </TouchableOpacity>

        {/* Legal Text with Identifiable Links */}
        <View style={styles.textContainer}>
          <Text style={styles.termsText} onPress={onToggle}>
            {isTamil ? (
              <>
                <Text
                  style={styles.legalLink}
                  onPress={handleTermsPress}
                  accessible={true}
                  accessibilityRole="link"
                  accessibilityLabel="விதிமுறைகள் மற்றும் நிபந்தனைகள்"
                >
                  விதிமுறைகள் மற்றும் நிபந்தனைகள்
                </Text>
                {' மற்றும் '}
                <Text
                  style={styles.legalLink}
                  onPress={handlePrivacyPress}
                  accessible={true}
                  accessibilityRole="link"
                  accessibilityLabel="தனியுரிமைக் கொள்கை"
                >
                  தனியுரிமைக் கொள்கை
                </Text>
                {' ஆகியவற்றை நான் ஏற்றுக்கொள்கிறேன்.'}
              </>
            ) : (
              <>
                {'I agree to the '}
                <Text
                  style={styles.legalLink}
                  onPress={handleTermsPress}
                  accessible={true}
                  accessibilityRole="link"
                  accessibilityLabel="Terms and Conditions"
                >
                  Terms & Conditions
                </Text>
                {' and '}
                <Text
                  style={styles.legalLink}
                  onPress={handlePrivacyPress}
                  accessible={true}
                  accessibilityRole="link"
                  accessibilityLabel="Privacy Policy"
                >
                  Privacy Policy
                </Text>
                {'.'}
              </>
            )}
          </Text>
        </View>
      </View>

      {/* Error Validation Alert */}
      {Boolean(error) && (
        <Text style={styles.errorText} accessible={true} accessibilityRole="alert">
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: theme.spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxTouchTarget: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -8,
  },
  checkboxBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: theme.colors.gray300,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxBoxChecked: {
    backgroundColor: theme.colors.actionPrimary,
    borderColor: theme.colors.actionPrimary,
  },
  checkboxBoxError: {
    borderColor: theme.colors.error,
    backgroundColor: theme.colors.errorSurface,
  },
  checkGlyph: {
    color: theme.colors.white,
    fontSize: 13,
    fontWeight: '900',
  },
  textContainer: {
    flex: 1,
    paddingVertical: 4,
  },
  termsText: {
    ...theme.typography.caption,
    fontSize: 12.5,
    lineHeight: 18,
    color: theme.colors.slate600,
  },
  legalLink: {
    color: theme.colors.actionPrimary,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  errorText: {
    ...theme.typography.caption,
    color: theme.colors.error,
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
    paddingLeft: 4,
  },
});
