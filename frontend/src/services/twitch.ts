import { Streamer } from '@/models/streamer';

// Function to fetch all stream data
export const fetchAllStreamData = async (str: Streamer[]) => {
  try {
    const response = await fetch(`/api/twitch/all/${str.map(streamer => streamer.nickname).join(',')}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Function to fetch streamer data
export const fetchStreamData = async (streamer: Streamer) => {
  try {
    const response = await fetch(`/api/twitch/${streamer.nickname}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error checking streamer status:', error);
    return null;
  }
};
