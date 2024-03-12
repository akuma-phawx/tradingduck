import profanities from './profanityList.json';

export const includesProfanity = (text: string): boolean => {
  let isProfane = false;
  for (const prof of profanities) {
    if (text.includes(prof)) {
      isProfane = true;
      break;
    }
  }
  return isProfane;
};
