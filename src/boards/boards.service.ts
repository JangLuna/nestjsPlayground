import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
// import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';
import { UserRepository } from 'src/auth/user.repository';
import { BoardObj, BoardObjDocument } from './board.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateBoardDto } from './dto/update-board.dto';

// @Injectable = 다른 컴포넌트 에서 해당 서비스를 사용할수 있도록 만들어 줌
@Injectable()
export class BoardsService {
	constructor(
		@InjectRepository(BoardRepository)
		private boardRepository: BoardRepository,

		@InjectRepository(UserRepository)
		private userRepository: UserRepository,

		@InjectModel(BoardObj.name)
		private boardObjModel: Model<BoardObjDocument>,
	) {}

	async getAllBoards(user: User): Promise<Board[]> {
		// const boards: Board[] = await this.boardRepository.query("SELECT * FROM board");
		// 위 처럼 쿼리로 작성해도 되지만, find() 메소드로 한번에 가져올 수 있다.
		// const boards: Board[] = await this.boardRepository.find();
		// return boards;

		const query = this.boardRepository.createQueryBuilder('board');
		query.where('board.userId = :userId', { userId: user.id });

		const boards = await query.getMany();
		return boards;
	}

	async getAllBoardsWithoutUser(): Promise<Board[]> {
		let list = await this.boardRepository.find();
		return list;
	}
	async createBoardWithoutUser(createBoardDto: CreateBoardDto): Promise<Board> {
		const { title, description } = createBoardDto;
		const user = await this.userRepository.findOne({ id: 7 });
		const board = this.boardRepository.create({
			title,
			description,
			status: BoardStatus.PUBLIC,
			user,
		});

		const newBoard = await this.boardRepository.save(board);
		return newBoard;
	}

	createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
		return this.boardRepository.createBoard(createBoardDto, user);
	}

	async getBoardById(id: number): Promise<Board> {
		const found = await this.boardRepository.findOne(id);

		if (!found) {
			throw new NotFoundException(`Can't found Board with id ${id}`);
		}

		return found;
	}

	async deleteBoardById(id: number, user: User): Promise<void> {
		// getBoardById에 이미 예외처리 되어있음
		const result = await this.boardRepository.delete({ id, user });

		if (result.affected === 0) {
			throw new NotFoundException(`Can't find Board with id ${id}`);
		}
	}

	async updateBoardStatusById(id: number, status: BoardStatus): Promise<Board> {
		const board = await this.getBoardById(id);

		board.status = status;
		await this.boardRepository.save(board);

		return board;
	}

	async createBoardMongo(createBoardDto: CreateBoardDto): Promise<BoardObj> {
		const { title, description } = createBoardDto;
		const body: string = description;
		const createDate: Date = new Date();
		const writer: number = 1;

		const createdBoardObj = new this.boardObjModel({ title, body, writer, created_data: createDate });
		return await createdBoardObj.save();
	}

	async getBoardMongo(_id: string): Promise<BoardObj> {
		const getBoardObj = await this.boardObjModel.findById(_id);
		return getBoardObj;
	}

	async updateBoardMongo(updateBoardDto: UpdateBoardDto) {
		const { title, body, _id } = updateBoardDto;

		let boardObj: BoardObj = await this.getBoardMongo(_id);

		boardObj.title = title;
		boardObj.body = body;

		await this.boardObjModel.updateOne(boardObj);
	}
}
