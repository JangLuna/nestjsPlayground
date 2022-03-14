import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');
export const typeORMConfig: TypeOrmModuleOptions = {
	//DataBase Type
	type: dbConfig.type,
	host: process.env.RDS_HOSTNAME || 'sidetrack-vflo.cwel20rl0x36.us-east-1.rds.amazonaws.com',
	port: process.env.RDS_PORT || dbConfig.port,
	username: process.env.RDS_USERNAME || dbConfig.username,
	password: process.env.RDS_PASSWORD || dbConfig.password,
	database: process.env.RDS_DB_NAME || dbConfig.database,
	//Entities to be loaded for this connections
	entities: [__dirname + '/../**/*.entity.{js,ts}'],

	synchronize: dbConfig.synchronize,
};
