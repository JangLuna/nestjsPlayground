import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/auth/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BoardStatus } from './board-status.enum';

@ObjectType()
@Entity()
export class Board extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	title: string;

	@Field()
	@Column()
	description: string;

	@Field()
	@Column()
	status: BoardStatus;

	@Field((type) => User)
	@ManyToOne((type) => User, (user) => user.boards, { eager: true })
	user: User;
}
