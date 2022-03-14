import { Field, ObjectType } from '@nestjs/graphql';
import { Board } from 'src/boards/board.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@ObjectType()
@Unique(['username']) // 유니크 해야할 값을 배열로 지정가능.
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field()
	id: number;

	@Column()
	@Field()
	username: string;

	@Column()
	@Field()
	password: string;

	// 첫번째 인수 : 변수 타입
	// 해당 객체 (board) 에서 이 객체(USER) 를 찾으려먼 어떻게 접근하는지
	// eager 옵션 :  유저 정보 가져올 때 관계 된 엔티티 정보도 가져오는가(board 정보도 가져오는가)
	@OneToMany((type) => Board, (board) => board.user, { eager: false })
	@Field((type) => Board)
	boards: Board[];
}
