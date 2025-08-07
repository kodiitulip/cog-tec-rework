import { sql } from 'drizzle-orm';
import { PgDatabase } from 'drizzle-orm/pg-core';
import { jwtDecode, JwtPayload } from 'jwt-decode';

export const decode = (accessToken: string) => {
  try {
    return jwtDecode<JwtPayload & { role: string }>(accessToken);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { role: 'anon' } as JwtPayload & { role: string };
  }
};

type SupabaseToken = {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  role?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createDrizzle = <Database extends PgDatabase<any, any, any>, Token extends SupabaseToken = SupabaseToken>(
  token: Token,
  { admin, client }: { admin: Database; client: Database }
) => {
  return {
    admin,
    rls: (async (transaction, ...rest) => {
      return await client.transaction(async (tx) => {
        try {
          await tx.execute(sql`
          -- auth.jwt()
          select set_config('request.jwt.claims', '${sql.raw(JSON.stringify(token))}', TRUE);
          -- auth.uid()
          select set_config('request.jwt.claim.sub', '${sql.raw(token.sub ?? '')}', TRUE);
          -- set local role
          set local role ${sql.raw(token.role ?? 'anon')};
          `);
          return await transaction(tx);
        } finally {
          await tx.execute(sql`
          -- reset
          select set_config('request.jwt.claims', NULL, TRUE);
          select set_config('request.jwt.claim.sub', NULL, TRUE);
          reset role;
          `);
        }
      }, ...rest);
    }) as typeof client.transaction,
  };
};
