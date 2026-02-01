import elasticsearch from 'elasticsearch'
import { config } from './config'

const { Client } = elasticsearch as unknown as { Client: new (opts: { host: string }) => unknown }

export const elastic: any = new Client({ host: config.elasticUrl })
