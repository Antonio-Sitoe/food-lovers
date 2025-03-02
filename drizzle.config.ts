import type { Config } from 'drizzle-kit'
import { env } from '@/lib/env'

export default {
  schema: './src/server/db/schema/index.ts',
  out: './src/server/db/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config
