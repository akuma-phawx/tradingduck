import { UserProfileDto } from '../../../src/dtos/userProfile.dto';
import { UserProfile, Country, UserType } from '@prisma/client';

export type FullUserProfile = UserProfile & {
  location: Country;
  type: UserType;
  banner: string;
  isVerified: boolean;
  isPremium: boolean;
  isBanned: boolean;
};

export const getUserProfile = async (): Promise<FullUserProfile | undefined> => {
  try {
    const response = await fetch(`/api/userprofile`);
    const userProfile = await response.json();
    return userProfile.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const getUserProfileById = async (id: number): Promise<FullUserProfile | undefined> => {
  try {
    const response = await fetch(`/api/userprofile/${id}`);
    const userProfile = await response.json();
    return userProfile.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const updateUserProfile = async (profile: UserProfileDto): Promise<FullUserProfile | undefined> => {
  try {
    const response = await fetch(`/api/userprofile`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...profile }),
    });
    const userProfile = await response.json();
    return userProfile;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
