import { User } from '@prisma/client';
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`/api/users`);
    const usersJson = await response.json();
    return usersJson.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUserById = async (id: number): Promise<User | undefined> => {
  try {
    const response = await fetch(`/api/users/${id}`);
    const userProfile = await response.json();
    return userProfile.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const banUser = async (id: number): Promise<User | undefined> => {
  try {
    const response = await fetch(`/api/users/${id}/ban`, { method: 'POST' });
    const userProfile = await response.json();
    return userProfile.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const unbanUser = async (id: number): Promise<User | undefined> => {
  try {
    const response = await fetch(`/api/users/${id}/unban`, { method: 'POST' });
    const userProfile = await response.json();
    return userProfile.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
