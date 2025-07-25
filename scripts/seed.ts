#!/usr/bin/env bun

import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from '@/db/schema';

config({ path: '.env.local' });

const admin = postgres(process.env.ADMIN_DATABASE_URL!, { prepare: false });
const db = drizzle({ client: admin, schema });

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
        title: 'Behaviorismo',
        imageSrc: '/icon/behaviorism/icon-color.svg',
      },
      {
        id: 2,
        title: 'Gestalt',
        imageSrc: '/icon/gestalt/icon-color.svg',
      },
      {
        id: 3,
        title: 'Teoria Sociocultural',
        imageSrc: '/icon/socioculture/icon-color.svg',
      },
    ]);
    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: 'Fundamentos',
        description: 'Aprenda os fundamentos',
        imageSrc: '/icon/behaviorism/fundaments.svg',
        order: 1,
      },
      {
        id: 2,
        courseId: 1,
        title: 'Estudos',
        description: '????',
        imageSrc: '/icon/behaviorism/fundaments.svg',
        order: 2,
      },
    ]);
    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1,
        order: 1,
        title: 'Pensadores',
      },
      {
        id: 2,
        unitId: 1,
        order: 2,
        title: 'Test',
      },
      {
        id: 3,
        unitId: 1,
        order: 3,
        title: 'Yipe',
      },
      {
        id: 4,
        unitId: 1,
        order: 4,
        title: 'Pensadores',
      },
      {
        id: 5,
        unitId: 1,
        order: 5,
        title: 'Test',
      },
      {
        id: 6,
        unitId: 2,
        order: 2,
        title: 'Yipe',
      },
      {
        id: 7,
        unitId: 2,
        order: 2,
        title: 'Yipe',
      },
    ]);
    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: 'SELECT',
        order: 1,
        question:
          'Qual desses pensadores prpos que após grande repetição de uma experiência, cria-se uma associação com uma ação?',
      },
      {
        id: 2,
        lessonId: 2,
        type: 'SELECT',
        order: 1,
        question:
          'Qual desses pensadores prpos que após grande repetição de uma experiência, cria-se uma associação com uma ação?',
      },
      {
        id: 3,
        lessonId: 3,
        type: 'SELECT',
        order: 1,
        question:
          'Qual desses pensadores prpos que após grande repetição de uma experiência, cria-se uma associação com uma ação?',
      },
    ]);
    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId: 1,
        imageSrc: '/challenges/es/images/man.svg',
        correct: true,
        text: 'Pavlov',
      },
      {
        id: 2,
        challengeId: 1,
        imageSrc: '/challenges/es/images/woman.svg',
        correct: false,
        text: 'Watson',
      },
      {
        id: 3,
        challengeId: 1,
        imageSrc: '/challenges/es/images/robot.svg',
        correct: false,
        text: 'Skinner',
      },
    ]);

    return console.log('seeding finished.');
  } catch (error) {
    console.error(error);
    throw new Error('failed to seed database');
  }
};

main();
