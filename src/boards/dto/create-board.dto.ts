import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateBoardDto {
	@Field()
	@IsNotEmpty()
	title: string;

	@Field()
	@IsNotEmpty()
	description: string;
}
