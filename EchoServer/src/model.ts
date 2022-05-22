import {Entity, PrimaryGeneratedColumn, Column, createConnection, Connection, Repository} from 'typeorm';

let connection:Connection;

//export async function getProductRepository(): Promise<Repository<Product>> {
export async function getProductRepository(): Promise<Repository<MessageStatistics>> {
  if (connection===undefined) {
    connection = await createConnection({
      type: 'sqlite',
      database: 'echo.db',
      synchronize: true,
      entities: [
        //Product
        MessageStatistics
      ],
    });
  }
  //return connection.getRepository(Product);
  return connection.getRepository(MessageStatistics);
}


@Entity()
export class MessageStatistics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {nullable: true})
  sourceIpAddress: string;

  @Column({nullable: true})
  messageCount: number;

  @Column({nullable: true})
  averageLength: number;

  @Column({nullable: true})
  meanLength: number;

  @Column({nullable: true})
  minLength: number;

  @Column({nullable: true})
  maxLength: number;
}


// @Entity()
// export class Product {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column('varchar', {nullable: true})
//   name: string;

//   @Column('varchar', {nullable: true})
//   sku: string;

//   @Column('varchar', {nullable: true})
//   description: string;

// //   @Column()
// //   price: number;

// //   @Column()
// //   stock: number;
// }