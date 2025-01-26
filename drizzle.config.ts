import type { Config } from 'drizzle-kit'
import { env } from '@/lib/env'

export default {
  schema: './src/db/schema/index.ts',
  out: './src/db/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config
