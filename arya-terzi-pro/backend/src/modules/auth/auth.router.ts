import { Router, type Request, type Response } from 'express'
import { z } from 'zod'
import { issueTokens, revokeRefreshToken, rotateRefreshToken } from './auth.service'
import { writeAudit } from '../../core/utils/audit'

export const authRouter = Router()

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

authRouter.post('/login', async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid input' })
    return
  }

  // MVP: DB entegrasyonu burada genişletilecek.
  // Şimdilik ADMIN rolüyle token üretir (geliştirme amaçlı).
  const userId = `user:${parsed.data.email}`

  const tokens = await issueTokens({ id: userId, role: 'ADMIN' })

  await writeAudit({
    requestId: (req as any).requestId,
    actorId: userId,
    actorRole: 'ADMIN',
    action: 'auth.login',
    metadata: { email: parsed.data.email },
    createdAt: new Date()
  })

  res.json(tokens)
})

const refreshSchema = z.object({
  refreshToken: z.string().min(10)
})

authRouter.post('/refresh', async (req: Request, res: Response) => {
  const parsed = refreshSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid input' })
    return
  }

  try {
    const tokens = await rotateRefreshToken(parsed.data.refreshToken)
    res.json(tokens)
  } catch {
    res.status(401).json({ message: 'Unauthorized' })
  }
})

authRouter.post('/logout', async (req: Request, res: Response) => {
  const parsed = refreshSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid input' })
    return
  }

  try {
    await revokeRefreshToken(parsed.data.refreshToken)
    res.status(204).send()
  } catch {
    res.status(204).send()
  }
})
