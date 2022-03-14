import {
	Body,
	Controller,
	Delete,
	Get,
	Logger,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardObj } from './board.schema';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validatin.pipe';

@Controller('boards')
export class BoardsController {
	/*
    boardsService: BoardsService;

    constructor(boardsService: BoardsService) {
        this.boardsService = boardsService
    }

    위 구문이 줄여진 것이 아래 구문
  */

	constructor(private boardsService: BoardsService) {}
	private logger = new Logger('BoardsController');

	@Get('/')
	getAllBoard(@GetUser() user: User): Promise<Board[]> {
		// 로그 남기기
		this.logger.verbose(`User ${user.username} trying to get all boards`);
		return this.boardsService.getAllBoards(user);
	}

	@Post()
	@UseGuards(AuthGuard())
	@UsePipes(ValidationPipe) //DTO에 있는 Validation Decorator 사용함
	createBoard(@Body() createBoardDto: CreateBoardDto, @GetUser() user: User): Promise<Board> {
		// 로그 남기기
		this.logger.verbose(
			`User ${user.username} create a new board. ${createBoardDto.title}, ${createBoardDto.description}`,
		);
		return this.boardsService.createBoard(createBoardDto, user);
	}

	@Get('/mongo')
	getBoardMongo(@Body('id') id: string): Promise<BoardObj> {
		return this.boardsService.getBoardMongo(id);
	}

	@Post('/mongo')
	createBoardMongo(@Body() createBoardDto: CreateBoardDto): Promise<BoardObj> {
		this.logger.log(createBoardDto);
		return this.boardsService.createBoardMongo(createBoardDto);
	}

	@Patch('/mongo')
	updateBoardMongo(@Body() updateBoardDto: UpdateBoardDto): Promise<void> {
		return this.boardsService.updateBoardMongo(updateBoardDto);
	}

	@Get('/:id')
	getBoardById(@Param('id') id: number): Promise<Board> {
		return this.boardsService.getBoardById(id);
	}

	@Delete('/:id')
	deleteBoardById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
		return this.boardsService.deleteBoardById(id, user);
	}

	@Patch('/:id/status')
	@UseGuards(AuthGuard())
	updateBoardStatusById(
		@Param('id', ParseIntPipe) id: number,
		@Body('status', BoardStatusValidationPipe) status: BoardStatus,
	): Promise<Board> {
		return this.boardsService.updateBoardStatusById(id, status);
	}
}
