import {createConnection, Connection, Repository} from 'typeorm';
import { MessageStatistics } from './messageStatistics';

let connection:Connection;

export async function getProductRepository(): Promise<Repository<MessageStatistics>> {
  if (connection === undefined) {
    connection = await createConnection({
      type: 'sqlite',
      database: 'echo.db',
      synchronize: true,
      entities: [
        MessageStatistics
      ],
    });
  }
  return connection.getRepository(MessageStatistics);
}