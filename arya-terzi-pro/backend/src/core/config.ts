import dotenv from 'dotenv'

dotenv.config()

const required = (name: string, value: string | undefined): string => {
  if (!value) throw new Error(`Missing env: ${name}`)
  return value
}

export const config = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3000),

  databaseUrl: required('DATABASE_URL', process.env.DATABASE_URL),
  redisUrl: required('REDIS_URL', process.env.REDIS_URL),
  mongoUrl: required('MONGO_URL', process.env.MONGO_URL),
  rabbitUrl: required('RABBITMQ_URL', process.env.RABBITMQ_URL),
  elasticUrl: required('ELASTIC_URL', process.env.ELASTIC_URL),

  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',

  jwtAccessSecret: required('JWT_ACCESS_SECRET', process.env.JWT_ACCESS_SECRET),
  jwtRefreshSecret: required('JWT_REFRESH_SECRET', process.env.JWT_REFRESH_SECRET),
  jwtAccessTtl: process.env.JWT_ACCESS_TTL ?? '15m',
  jwtRefreshTtlDays: Number(process.env.JWT_REFRESH_TTL_DAYS ?? 30)
}
