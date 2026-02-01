import pg from 'pg'
import { config } from '../config'

export const pgPool = new pg.Pool({
  connectionString: config.databaseUrl,
  max: 10
})

export const pgQuery = async <T = unknown>(text: string, params: unknown[] = []): Promise<T[]> => {
  const result = await pgPool.query(text, params)
  return result.rows as T[]
}
