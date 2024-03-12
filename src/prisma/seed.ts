import { PrismaClient } from '@prisma/client';
import Sets from './seedData/sets/en.json';
import fs from 'fs';
import countries from '../../countries.json';
import languages from '../../languages.json';
import shopsNl from './seedData/shops/netherlands.json';
import tradespotsDe from './seedData/tradespots/germany.json';
import streamers from './seedData/streamers/twitch.json';
import tradeStatuses from './seedData/trade/status.json';

const prisma = new PrismaClient();

// Countries Seeding
async function seedCountries(): Promise<void> {
  console.log('[START]: Seeding Countries Starter');
  await Promise.all(
    countries.map(async country => {
      await prisma.country.upsert({
        where: { code: country.code },
        update: {},
        create: {
          name: country.name,
          code: country.code,
          capital: country.capital || '-',
          continent: country.continent || '-',
          iso: country.iso,
        },
      });
    }),
  );
  console.log('[END]: Seeding Countries Completed');
}
// Languages Seeding
async function seedLanguages(): Promise<void> {
  console.log('[START]: Seeding Languages Starter');
  await Promise.all(
    languages.map(async language => {
      await prisma.language.upsert({
        where: { code: language.code },
        update: {},
        create: {
          name: language.name,
          code: language.code,
        },
      });
    }),
  );
  console.log('[END]: Seeding Languages Completed');
}
// Shops Seeding
async function seedShops(): Promise<void> {
  console.log('[START]: Seeding Shops Starter');
  const shopsData = [shopsNl];
  for (let i = 0; i < shopsData.length; i++) {
    const shops = shopsData[i];
    await Promise.all(
      shops.map(async shop => {
        await prisma.shop.upsert({
          where: { name: shop.name },
          update: {},
          create: {
            name: shop.name,
            description: shop.description,
            logo: shop.logo,
            url: shop.url,
            instagram: shop.instagram || '',
            countryId: shop.countryId,
          },
        });
      }),
    );
  }

  console.log('[END]: Seeding Shops Completed');
}

// Tradespots Seeding
async function seedSpots(): Promise<void> {
  console.log('[START]: Seeding Spots Starter');
  const spotsData = [tradespotsDe];
  for (let i = 0; i < spotsData.length; i++) {
    const spots = spotsData[i];
    await Promise.all(
      spots.map(async spot => {
        await prisma.tradespot.upsert({
          where: { name: spot.name },
          update: {},
          create: {
            name: spot.name,
            description: spot.description,
            location: spot.location,
            image: spot.image ? spot.image : '',
            countryShortName: spot.countryShortName,
          },
        });
      }),
    );
  }

  console.log('[END]: Seeding Shops Completed');
}
// Streamers Seedings
async function seedStreamers(): Promise<void> {
  console.log('[START]: Seeding Streamers Starter');
  await Promise.all(
    streamers.map(async streamer => {
      await prisma.streamer.upsert({
        where: { nickname: streamer.nickname },
        update: {},
        create: streamer,
      });
    }),
  );
  console.log('[END]: Seeding Streamers Completed');
}
// Seeding Trade Statuses
async function seedTradeStatus(): Promise<void> {
  console.log('[START]: Seeding TradeStatuses Starter');
  await Promise.all(
    tradeStatuses.map(async status => {
      await prisma.tradeStatus.upsert({
        where: { identifier: status.identifier },
        update: {},
        create: status,
      });
    }),
  );
  console.log('[END]: Seeding TradeStatuses Completed');
}
// Seeding Sets and Cards
async function seedSetsAndCards(): Promise<void> {
  console.log('[START]: Seeding Sets & Cards Starter');

  const setsFromDb = await Promise.all(
    Sets.map(async set => {
      return await prisma.set.upsert({
        where: { identifier: set.id },
        update: {},
        create: {
          name: set.name,
          identifier: set.id,
          releaseDate: set.releaseDate,
          image: set.images.logo,
        },
      });
    }),
  );

  for (const set of setsFromDb) {
    const cardsFile = fs.readFileSync(`./src/prisma/seedData/cards/en/${set.identifier}.json`);
    const cards = JSON.parse(cardsFile.toString());

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];

      const cardData = {
        name: card.name,
        identifier: card.id,
        image: card.images.small,
        artist: card.artist || 'no artist',
        releaseDate: set.releaseDate,
        rarity: {
          connectOrCreate: {
            where: { name: card.rarity || 'no rarity' },
            create: { name: card.rarity || 'no rarity' },
          },
        },
        flavorText: card.flavorText || '',
        types: card.types,
        set: { connect: { identifier: set.identifier } },
      };

      try {
        await prisma.card.upsert({
          where: { identifier: card.id },
          update: {},
          create: cardData,
        });
      } catch (error) {
        console.log('cardData', cardData);
        console.log(error);
        process.exit(2);
      }
    }
  }

  console.log('[END]: Seeding Sets & Cards Completed');
}

async function main() {
  try {
    await seedCountries();
    await seedLanguages();
    await seedSpots();
    await seedShops();
    await seedStreamers();
    await seedTradeStatus();
    await seedSetsAndCards();
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error);
