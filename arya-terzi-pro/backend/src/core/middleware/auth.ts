import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config'

export type AuthUser = {
  sub: string
  role: string
  permissions: string[]
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser
    }
  }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const header = req.header('authorization')
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  const token = header.slice('Bearer '.length)
  try {
    const payload = jwt.verify(token, config.jwtAccessSecret) as AuthUser
    req.user = payload
    next()
  } catch {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
