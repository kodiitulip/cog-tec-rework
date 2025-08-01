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

    return console.log('seeding finished.');
  } catch (error) {
    console.error(error);
    throw new Error('failed to seed database');
  }
};

main();

