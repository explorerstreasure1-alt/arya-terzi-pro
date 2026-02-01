import amqplib from 'amqplib'
import { config } from './config'

export type Rabbit = {
  connection: amqplib.Connection
  channel: amqplib.Channel
}

export const createRabbit = async (): Promise<Rabbit> => {
  const connection = await amqplib.connect(config.rabbitUrl)
  const channel = await connection.createChannel()
  return { connection, channel }
}
