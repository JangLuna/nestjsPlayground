import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';

const jwtConfig = config.get('jwt');
@Module({
	imports: [
		// 유저 인증 위해 사용할 기본 strategy 명시
		PassportModule.register({ defaultStrategy: 'jwt' }),
		// JWT 인증 부분 담당, 그리고 주로 sign()을 위한 부분
		JwtModule.register({
			secret: process.env.JWT_SECRET || jwtConfig.secret,
			signOptions: {
				expiresIn: process.env.JWT_EXPIRES_IN || jwtConfig.expiresIn,
			},
		}),
		TypeOrmModule.forFeature([UserRepository]),
	],
	controllers: [AuthController],
	// AuthModule 내에서 사용할 수 있도록 등록
	providers: [AuthService, JwtStrategy],
	// 다른 Module에서도 사용할 수 있도록 함
	exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
