import jwt from 'jsonwebtoken'
import { randomUUID, scryptSync, timingSafeEqual } from 'crypto'
import { config } from '../../core/config'
import { redis } from '../../core/database/redis'

export type Role = 'ADMIN' | 'TERZI' | 'SALES' | 'ASSISTANT'

const rolePermissions: Record<Role, string[]> = {
  ADMIN: ['*'],
  ASSISTANT: ['customers.view', 'production.view'],
  TERZI: ['orders.create', 'orders.update', 'production.view', 'customers.view'],
  SALES: ['orders.create', 'customers.manage', 'invoices.create']
}

export type AccessTokenPayload = {
  sub: string
  role: Role
  permissions: string[]
}

type RefreshTokenPayload = {
  sub: string
  jti: string
}

const refreshKey = (jti: string) => `rt:${jti}`

export const issueTokens = async (user: { id: string; role: Role }) => {
  const permissions = rolePermissions[user.role] ?? []

  const accessToken = jwt.sign(
    { sub: user.id, role: user.role, permissions } satisfies AccessTokenPayload,
    config.jwtAccessSecret,
    { expiresIn: config.jwtAccessTtl }
  )

  const jti = randomUUID()
  const refreshToken = jwt.sign(
    { sub: user.id, jti } satisfies RefreshTokenPayload,
    config.jwtRefreshSecret,
    { expiresIn: `${config.jwtRefreshTtlDays}d` }
  )

  await redis.set(refreshKey(jti), user.id, 'EX', config.jwtRefreshTtlDays * 24 * 60 * 60)

  return { accessToken, refreshToken }
}

export const rotateRefreshToken = async (refreshToken: string) => {
  const payload = jwt.verify(refreshToken, config.jwtRefreshSecret) as RefreshTokenPayload

  const existing = await redis.get(refreshKey(payload.jti))
  if (!existing || existing !== payload.sub) {
    throw new Error('Refresh token revoked')
  }

  await redis.del(refreshKey(payload.jti))

  return await issueTokens({ id: payload.sub, role: 'ADMIN' })
}

export const revokeRefreshToken = async (refreshToken: string) => {
  const payload = jwt.verify(refreshToken, config.jwtRefreshSecret) as RefreshTokenPayload
  await redis.del(refreshKey(payload.jti))
}

export const hashPassword = (password: string, salt: string) => {
  return scryptSync(password, salt, 64).toString('hex')
}

export const verifyPassword = (password: string, salt: string, expectedHashHex: string) => {
  const actual = Buffer.from(hashPassword(password, salt), 'hex')
  const expected = Buffer.from(expectedHashHex, 'hex')
  if (actual.length !== expected.length) return false
  return timingSafeEqual(actual, expected)
}
