import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BoardRepository } from './board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardsResolver } from './boards.resolver';
import { UserRepository } from 'src/auth/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardObj, BoardObjSchema } from './board.schema';

@Module({
	imports: [
		TypeOrmModule.forFeature([BoardRepository, UserRepository]),
		MongooseModule.forFeature([{ name: BoardObj.name, schema: BoardObjSchema }]),
		AuthModule,
	],
	controllers: [BoardsController],
	providers: [BoardsService, BoardsResolver],
})
export class BoardsModule {}
