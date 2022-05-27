import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

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