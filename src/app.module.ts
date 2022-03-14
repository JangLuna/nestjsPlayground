import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import * as config from 'config';

const mongo = config.get('mongo');

@Module({
	imports: [
		TypeOrmModule.forRoot(typeORMConfig),
		BoardsModule,
		AuthModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			debug: false,
			playground: true,
			autoSchemaFile: true,
		}),
		MongooseModule.forRoot(mongo.uri),
	],
})
export class AppModule {}
