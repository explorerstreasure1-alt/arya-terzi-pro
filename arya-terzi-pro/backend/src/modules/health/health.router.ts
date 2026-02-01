import { Router, type Request, type Response } from 'express'
import { pgPool } from '../../core/database/postgres'
import { redis } from '../../core/database/redis'
import { mongo } from '../../core/database/mongo'
import { elastic } from '../../core/elasticsearch'

export const healthRouter = Router()

healthRouter.get('/', async (_req: Request, res: Response) => {
  const checks: Record<string, { ok: boolean; error?: string }> = {}

  try {
    await pgPool.query('SELECT 1 as ok')
    checks.postgres = { ok: true }
  } catch (e) {
    checks.postgres = { ok: false, error: e instanceof Error ? e.message : String(e) }
  }

  try {
    const pong = await redis.ping()
    checks.redis = { ok: pong === 'PONG' }
  } catch (e) {
    checks.redis = { ok: false, error: e instanceof Error ? e.message : String(e) }
  }

  try {
    await mongo.db().command({ ping: 1 })
    checks.mongodb = { ok: true }
  } catch (e) {
    checks.mongodb = { ok: false, error: e instanceof Error ? e.message : String(e) }
  }

  try {
    await elastic.ping()
    checks.elasticsearch = { ok: true }
  } catch (e) {
    checks.elasticsearch = { ok: false, error: e instanceof Error ? e.message : String(e) }
  }

  const ok = Object.values(checks).every((c) => c.ok)
  res.status(ok ? 200 : 503).json({ ok, checks })
})
