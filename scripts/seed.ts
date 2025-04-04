#!/usr/bin/env bun

import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from '@/db/schema';

config({ path: '.env.local' });

const client = postgres(process.env.DATABASE_URL!, { prepare: false });
const db = drizzle({ client, schema });

const main = async () => {
  try {
    console.log('seeding database!');

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: 'Spanish',
        imageSrc: '/flags/es.svg',
      },
      {
        id: 2,
        title: 'French',
        imageSrc: '/flags/fr.svg',
      },
      {
        id: 3,
        title: 'Croatian',
        imageSrc: '/flags/hr.svg',
      },
      {
        id: 4,
        title: 'Italian',
        imageSrc: '/flags/it.svg',
      },
      {
        id: 5,
        title: 'Japanese',
        imageSrc: '/flags/jp.svg',
      },
    ]);
    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: 'Unit 1',
        description: 'Learn the basics',
        order: 1,
      },
    ]);
    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1,
        order: 1,
        title: 'Nouns',
      },
    ]);
    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: 'SELECT',
        order: 1,
        question: 'Wich one of these is the "the man"?',
      },
    ]);
    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId: 1,
        imageSrc: '/challenges/es/images/man.svg',
        correct: true,
        text: 'el hombre',
        audioSrc: '/challenges/es/audio/man.mp3',
      },
      {
        id: 2,
        challengeId: 1,
        imageSrc: '/challenges/es/images/woman.svg',
        correct: false,
        text: 'la mujer',
        audioSrc: '/challenges/es/audio/woman.mp3',
      },
      {
        id: 3,
        challengeId: 1,
        imageSrc: '/challenges/es/images/robot.svg',
        correct: false,
        text: 'el robot',
        audioSrc: '/challenges/es/audio/robot.mp3',
      },
    ]);

    return console.log('seeding finished.');
  } catch (error) {
    console.error(error);
    throw new Error('failed to seed database');
  }
};

main();
