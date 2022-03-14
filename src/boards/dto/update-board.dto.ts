import { IsAlphanumeric, IsByteLength, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UpdateBoardDto {
	@IsNotEmpty()
	title: string;

	@IsNotEmpty()
	body: string;

	@IsNotEmpty()
	_id: string;
}
