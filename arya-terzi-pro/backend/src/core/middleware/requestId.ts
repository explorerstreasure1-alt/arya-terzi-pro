import { randomUUID } from 'crypto'
import type { NextFunction, Request, Response } from 'express'

export const requestId = (req: Request, res: Response, next: NextFunction): void => {
  const id = req.header('x-request-id') ?? randomUUID()
  res.setHeader('x-request-id', id)
  ;(req as any).requestId = id
  next()
}
