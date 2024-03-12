import { Streamer } from '@prisma/client';

export const getStreamers = async (): Promise<Streamer[]> => {
  try {
    const response = await fetch(`/api/streamers`);
    const streamersJson = await response.json();
    return streamersJson.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
