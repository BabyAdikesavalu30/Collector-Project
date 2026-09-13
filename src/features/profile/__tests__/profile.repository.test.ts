import { profileRepository, IProfileRepository } from '../profile.repository';
import { storage, STORAGE_KEYS } from '../../../storage/asyncStorage';
import { StoredProfile } from '../../auth';

describe('ProfileRepository Integration Boundary', () => {
  beforeEach(async () => {
    await storage.removeItem(STORAGE_KEYS.STUDENT_PROFILE);
    await storage.removeItem(STORAGE_KEYS.STUDENT_PROFILE_SETUP_COMPLETE);
  });

  afterEach(async () => {
    await storage.removeItem(STORAGE_KEYS.STUDENT_PROFILE);
    await storage.removeItem(STORAGE_KEYS.STUDENT_PROFILE_SETUP_COMPLETE);
  });

  it('implements IProfileRepository interface cleanly', () => {
    const repo: IProfileRepository = profileRepository;
    expect(typeof repo.getProfile).toBe('function');
    expect(typeof repo.saveProfile).toBe('function');
    expect(typeof repo.isSetupComplete).toBe('function');
    expect(typeof repo.setSetupComplete).toBe('function');
  });

  it('returns null when no profile exists in storage', async () => {
    const profile = await profileRepository.getProfile();
    expect(profile).toBeNull();
  });

  it('saves and retrieves student profile', async () => {
    const testProfile: StoredProfile = {
      fullName: 'Ramanujan',
      grade: 'Grade 10',
      section: 'B',
      school: 'Town Higher Secondary School',
      city: 'Kumbakonam',
      avatarId: 'telescope',
    };

    const saved = await profileRepository.saveProfile(testProfile);
    expect(saved).toBe(true);

    const retrieved = await profileRepository.getProfile();
    expect(retrieved).not.toBeNull();
    expect(retrieved?.fullName).toBe('Ramanujan');
    expect(retrieved?.grade).toBe('Grade 10');
    expect(retrieved?.city).toBe('Kumbakonam');
    expect(retrieved?.avatarId).toBe('telescope');
  });

  it('updates existing profile incrementally', async () => {
    await profileRepository.saveProfile({
      fullName: 'Marie Curie',
      school: 'Sorbonne',
    });

    await profileRepository.saveProfile({
      avatarId: 'microscope',
      city: 'Paris',
    });

    const updated = await profileRepository.getProfile();
    expect(updated?.fullName).toBe('Marie Curie');
    expect(updated?.school).toBe('Sorbonne');
    expect(updated?.avatarId).toBe('microscope');
    expect(updated?.city).toBe('Paris');
  });

  it('manages setup completion state independently', async () => {
    expect(await profileRepository.isSetupComplete()).toBe(false);

    await profileRepository.setSetupComplete(true);
    expect(await profileRepository.isSetupComplete()).toBe(true);

    await profileRepository.setSetupComplete(false);
    expect(await profileRepository.isSetupComplete()).toBe(false);
  });
});
