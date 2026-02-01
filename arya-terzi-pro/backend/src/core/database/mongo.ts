import { MongoClient } from 'mongodb'
import { config } from '../config'

export const mongoClient = new MongoClient(config.mongoUrl)

export const mongo = {
  client: mongoClient,
  db: () => mongoClient.db()
}
