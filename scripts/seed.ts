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

    console.log('seeding finished.');
  } catch (error) {
    console.error(error);
    throw new Error('failed to seed database');
  }
};

main();
