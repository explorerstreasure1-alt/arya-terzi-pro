import express, { type Request, type Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

import { config } from '../config'
import { requestId } from '../middleware/requestId'

import { healthRouter } from '../../modules/health/health.router'
import { authRouter } from '../../modules/auth/auth.router'

export const createApp = () => {
  const app = express()

  app.use(helmet())
  app.use(cors({ origin: config.corsOrigin, credentials: true }))
  app.use(express.json({ limit: '1mb' }))
  app.use(requestId)
  app.use(
    rateLimit({
      windowMs: 60_000,
      limit: 120,
      standardHeaders: true,
      legacyHeaders: false
    })
  )

  app.get('/', (_req: Request, res: Response) => res.json({ name: 'arya-terzi-pro-backend' }))
  app.use('/health', healthRouter)
  app.use('/auth', authRouter)

  return app
}
