import type { NextFunction, Request, Response } from 'express'

export const requirePermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user
    if (!user) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    if (user.permissions.includes('*') || user.permissions.includes(permission)) {
      next()
      return
    }

    res.status(403).json({ message: 'Forbidden' })
  }
}
