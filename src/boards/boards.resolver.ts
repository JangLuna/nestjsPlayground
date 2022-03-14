import { HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { ArgsType, Field, Mutation, ObjectType, Query } from '@nestjs/graphql';
import { Args, Resolver } from '@nestjs/graphql';
import e from 'express';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@ObjectType()
class ResponseDto {
	@Field()
	status: number;
	@Field()
	message: string;
	@Field()
	error: boolean;
	@Field()
	data: Board;

	constructor(status: number, message: string, error: boolean, data: any) {
		this.status = status;
		this.message = message;
		this.error = error;
		this.data = data;
	}
}

@Resolver()
export class BoardsResolver {
	constructor(private readonly boardsService: BoardsService) {}

	@Query(() => ResponseDto, { name: 'getBoard' })
	async getBoard(@Args('id') id: number) {
		const board = await this.boardsService.getBoardById(id);
		const response = new ResponseDto(HttpStatus.ACCEPTED, 'ACCEPTED', false, board);
		return response;
	}

	@Mutation(() => Board, { name: 'createBoard' })
	async createBoard(@Args('board') boardDto: CreateBoardDto) {
		return this.boardsService.createBoardWithoutUser(boardDto);
	}
}
