import { mongo } from '../database/mongo'

export type AuditEvent = {
  requestId?: string
  actorId?: string
  actorRole?: string
  action: string
  entity?: string
  entityId?: string
  metadata?: Record<string, unknown>
  createdAt: Date
}

export const writeAudit = async (event: AuditEvent): Promise<void> => {
  const db = mongo.db()
  await db.collection('audit_logs').insertOne(event)
}
