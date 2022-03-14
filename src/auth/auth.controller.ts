import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
	// authService DI
	constructor(private authService: AuthService) {}

	// 회원가입
	@Post('/signup')
	@UsePipes(ValidationPipe)
	signUp(@Body() userCredentialsDto: AuthCredentialsDto): Promise<void> {
		return this.authService.signUp(userCredentialsDto);
	}

	// 로그인
	@Post('/signin')
	@UsePipes(ValidationPipe)
	signIn(@Body() userCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
		return this.authService.signIn(userCredentialsDto);
	}

	// UseGuards : Nestjs 에 있는 Guards 미들웨어를 사용할 수 있도록 함
	// 미들웨어 실행순서 : req ->  guards - interceptor - pipe - controller - service - controller - intercepter - filter -> res
	// AuthGuard() : @nestjs/passport 에서 가져온 가드 객체.
	/* 
	동작 추측 : 
	auth.module.ts 에 Passport 에 defaultStrategy를 jwt로 등록함. ->
	프로비저닝을 통해 PassportStrategy 를 이용해 구현한 Strategy 클래스를 인스턴스화 시켜서 사용
	*/

	@Post('/test')
	@UseGuards(AuthGuard())
	test(@GetUser() user: User) {
		console.log('user', user);
	}
}
