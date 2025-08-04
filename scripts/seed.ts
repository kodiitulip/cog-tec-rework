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
    await db.delete(schema.rolePermissions);
    await db.delete(schema.userRoles);

    await db.insert(schema.rolePermissions).values([
      {
        id: 1,
        role: 'ADMIN',
        permission: 'COURSES.INSERT',
      },
      {
        id: 2,
        role: 'ADMIN',
        permission: 'COURSES.DELETE',
      },
    ]);

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
        courseId: 2,
        title: 'Fundamentos',
        description: 'Aprenda os fundamentos',
        imageSrc: '/icon/gestalt/design.svg',
        order: 1,
      },
      {
        id: 3,
        courseId: 3,
        title: 'Fundamentos',
        description: 'Aprenda os fundamentos',
        imageSrc: '/icon/socioculture/cognitive.svg',
        order: 1,
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
        unitId: 2,
        order: 1,
        title: 'Pensadores',
      },
      {
        id: 4,
        unitId: 2,
        order: 2,
        title: 'Test',
      },
      {
        id: 5,
        unitId: 3,
        order: 1,
        title: 'Pensadores',
      },
      {
        id: 6,
        unitId: 3,
        order: 2,
        title: 'Test',
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
        lessonId: 1,
        type: 'ASSIST',
        order: 1,
        question:
          'Qual desses pensadores prpos que após grande repetição de uma experiência, cria-se uma associação com uma ação?',
      },
      {
        id: 3,
        lessonId: 2,
        type: 'SELECT',
        order: 1,
        question:
          'Qual desses pensadores prpos que após grande repetição de uma experiência, cria-se uma associação com uma ação?',
      },
      {
        id: 4,
        lessonId: 2,
        type: 'ASSIST',
        order: 1,
        question:
          'Qual desses pensadores prpos que após grande repetição de uma experiência, cria-se uma associação com uma ação?',
      },
    ]);
    await db.insert(schema.challenges).values([
      {
        id: 5,
        lessonId: 3,
        type: 'SELECT',
        order: 1,
        question:
          'Qual desses pensadores prpos que após grande repetição de uma experiência, cria-se uma associação com uma ação?',
      },
      {
        id: 6,
        lessonId: 3,
        type: 'ASSIST',
        order: 1,
        question:
          'Qual desses pensadores prpos que após grande repetição de uma experiência, cria-se uma associação com uma ação?',
      },
      {
        id: 7,
        lessonId: 4,
        type: 'SELECT',
        order: 1,
        question:
          'Qual desses pensadores prpos que após grande repetição de uma experiência, cria-se uma associação com uma ação?',
      },
      {
        id: 8,
        lessonId: 4,
        type: 'ASSIST',
        order: 1,
        question:
          'Qual desses pensadores prpos que após grande repetição de uma experiência, cria-se uma associação com uma ação?',
      },
    ]);
    await db.insert(schema.challenges).values([
      {
        id: 9,
        lessonId: 5,
        type: 'SELECT',
        order: 1,
        question:
          'Qual desses pensadores prpos que após grande repetição de uma experiência, cria-se uma associação com uma ação?',
      },
      {
        id: 10,
        lessonId: 5,
        type: 'ASSIST',
        order: 1,
        question:
          'Qual desses pensadores prpos que após grande repetição de uma experiência, cria-se uma associação com uma ação?',
      },
      {
        id: 11,
        lessonId: 6,
        type: 'SELECT',
        order: 1,
        question:
          'Qual desses pensadores prpos que após grande repetição de uma experiência, cria-se uma associação com uma ação?',
      },
      {
        id: 12,
        lessonId: 6,
        type: 'ASSIST',
        order: 1,
        question:
          'Qual desses pensadores prpos que após grande repetição de uma experiência, cria-se uma associação com uma ação?',
      },
    ]);
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1,
        correct: true,
        text: 'Pavlov',
      },
      {
        challengeId: 1,
        correct: false,
        text: 'Watson',
      },
      {
        challengeId: 1,
        correct: false,
        text: 'Skinner',
      },
      {
        challengeId: 2,
        correct: true,
        text: 'Pavlov',
      },
      {
        challengeId: 2,
        correct: false,
        text: 'Watson',
      },
      {
        challengeId: 2,
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
