/**
 * Registration Types & Contracts
 * Strongly typed models for student onboarding and account registration.
 */

export type GradeValue = 'Grade 6' | 'Grade 7' | 'Grade 8' | 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12';
export type SectionValue = 'A' | 'B' | 'C' | 'D' | 'E';

export interface RegistrationFormData {
  fullName: string;
  mobile: string;
  email: string;
  grade: string;
  section: string;
  school: string;
  city?: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
}

export interface RegistrationValidationErrors {
  fullName?: string;
  mobile?: string;
  email?: string;
  grade?: string;
  section?: string;
  school?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

export interface RegistrationActionResult {
  success: boolean;
  message?: string;
  error?: string;
}
