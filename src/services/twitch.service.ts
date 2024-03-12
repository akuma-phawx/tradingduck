import { TwitchUser, TwitchUserData } from '../../frontend/src/models/twitch';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';

@Service()
export class TwitchStreamerService {
  public async fetchAllStreamData(streamers: string[]): Promise<TwitchUser[]> {
    try {
      const allStreamData: TwitchUser[] = await fetchAllStreamData(streamers);
      return allStreamData;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async fetchStreamData(streamer: string): Promise<TwitchUser> {
    try {
      const streamData: TwitchUser = await fetchStreamData(streamer);
      return streamData;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }
}

// Function to fetch all stream data
export const fetchAllStreamData = async (str: String[]) => {
  const streamers = await Promise.all(str.map(fetchStreamData));
  return streamers;
};

// Function to fetch streamer data
const fetchStreamData = async (streamer: String) => {
  try {
    // Fetch User Info
    const response = await fetchTwitchData(`https://api.twitch.tv/helix/users?login=${streamer}`);

    if (!response.ok) {
      throw new Error(`Twitch API error: ${response.status}`);
    }

    const data: TwitchUserData = await response.json();

    // Fetch Online Info
    const onlineDataResponse = await fetchTwitchData(`https://api.twitch.tv/helix/streams?user_login=${streamer}`);
    const onlineData = await onlineDataResponse.json();

    if (onlineData.data.length > 0) {
      data.data[0].onlineData = onlineData.data[0];
    } else {
      data.data[0].onlineData = null;
    }
    data.data[0].isOnline = onlineData.data.length > 0;
    return data.data[0];
  } catch (error) {
    console.error('Error checking streamer status:', error);
    return null;
  }
};

// Function to fetch data from Twitch API
const fetchTwitchData = async (url: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return await fetch(url, {
    headers: {
      'Client-ID': process.env.TWITCH_API_KEY,
      Authorization: `Bearer ${process.env.TWITCH_AUTH_TOKEN}`,
    },
  });
};
