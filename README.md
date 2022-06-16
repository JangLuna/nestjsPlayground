<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
  <a href="https://github.com/Side-Track/sidetrack-vflo-back" target="blank">SideTrack - VFLO Project</a>
</p>

## Introduction
This Repo for my NestJS practice and Test.
Also, This md file has a information about NestJS tutorial

## Installation

- Nodejs를 먼저 설치한다.

```bash
  $ npm install @nestjs/cli -g


  # 새로운 프로젝트 명으로 디렉토리 생성하면서 초기세팅
  $ nest new project-name

  # 현재 디렉토리를 프로젝트 루트 디렉토리로 사용
  $ nest new ./


  # 설치 완료 후 맨 처음부터 시작하고 싶다면 다음과 같이 src 디렉토리로 이동 후 작업을 진행하자
  $ cd src
  $ rm app.controller.spec.ts app.controller.ts app.service.ts
```

위 파일들을 rm 명령어를 이용해서 삭제 후 `_app.module.ts_` 파일을 열어 다음과 같이 수정한다.

```typescript

  import { Module } frmo '@nestjs/common';


  @Module({
    imports : [],
  })
  export class AppMoudle {}
```

초기 세팅이 완료되었다면,
루트 디렉토리를 기준으로 아래에 `node_modules`, `src`, 기타 파일들이 있을 것이다.

- node_modules : 프로젝트에 필요한 의존성 패키지가 설치되어있다.
- src : 실제 코드 파일이 있는 곳이다. 이곳에서 작업이 이루어진다.

- .eslintrc.js : ESLint 설정파일
- .gitignore : git 에서 무시해야할 파일 목록
- .prettierrc : 코드포매터 Prettier 설정들
- nest-cli.json : nestjs cli 설정들이다.
- package.json : 프로젝트 메타데이터와 프로젝트에 사용되는 의존성 패키지 목록 등이 정의 되어 있다.
- README.md : 프로젝트 description 위한 .md 파일
- tsconfig ~.json : typescript 관련 설정

이렇게 구성되어 있다.
앞으로 대부분의 작업은 _src_ 내부에서 이루어진다.

## NestJS Module?

### Module 이란?

모듈은 `@Module()` 데코레이터가 사용된 자바스크립트 싱글톤 클래스이다.
NestJS가 애플리케이션 구조를 구성하는 단위이다.
밀접히 관련된 기능 집합으로 구성하는 것이 바람직하다.
따라서 각 애플리케이션에는 하나 이상의 모듈(루트 모듈)이 존재하게 된다.
후술할 _controller_, _service_, _entity_ 등을 모아서 관리하게 된다.

앞서 이야기했듯 싱글톤 구조이기 때문에 매우 편리하게 동일 인스턴스를 공유할 수 있다.

### Module 생성방법

모듈을 생성해보자 `nest g module [모듈이름]` 을 사용하여 생성한다.

```bash

  # nest js 생성 명령어. module, controller, service 등
  $ nest g module [모듈이름]
  # 예시 : nest g module boards
```

모듈을 생성 한 후 생성한 모듈(예시에선 boards) 를 _app.module.ts_ 에 등록해 주어야 한다.
`nest g module` 과 같이 명령어로 생상한 경우 자동으로 등록이 되지만, 그렇지 않다면 등록해주자

```typescript
  import { Module } frmo '@nestjs/common';
  import { BoardsModule } from './boards/boards.module';


  @Module({
    imports : [BoardsModule],
  })
  export class AppMoudle {}
```

## NestJS Controller?

### Controller 란?

컨트롤러는 들어오는 HTTP 요청을 처리하고 클라이언트에 응답을 반환하는 부분이다.
모듈과 같이 `@Controller` 데코레이터가 사용된 자바스크립트 클래스이다.
데코레이터에 처리하고 싶은 경로(라우트) 를 작성한다.

```typescript
@Controller('/boards')
export class BoardsController {}
```

#### Handler 란?

@Get, @Post, @Delete 등과 같은 데코레이터가 사용된 컨트롤러 클래스 내의 메소드이다.
데코레이터에 따라 HTTP 요청을 처리한다.

### Controller 생성방법

컨트롤러를 생성해보자 방법은 모듈과 같다. `nest g controller [컨트롤러 이름] --no-spec` 을 사용하여 생성한다.

```bash

  # nest js 생성 명령어. module, controller, service 등
  $ nest g controller [모듈이름] --no-spec
  # 예시 : nest g controller boards --np-spec

  # --no-spec 옵션은 테스트 위한 소스코드 생성을 하지 않겠다는 의미
```

생성이 완료 된 후 컨트롤러를 사용하기 위해선 컨트롤러를 사용할 모듈에 등록해 주어야 한다.
마찬가지로 명령어로 생성 시 자동으로 등록이 되나, 그렇지 않다면 등록해준다.
예시에서는 Boards 모듈이었으니 생성했던 _boards.module.ts_ 에 다음과 같이 등록해주자.

```typescript
import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';

@Module({
	controllers: [BoardsController],
})
export class BoardsModule {}
```

CLI 를 이용하여 컨트롤러를 생성하는 순서는 다음과 같다.

> boards 폴더를 찾기 -> 폴더 내부에 controller 파일 생성 및 module 파일 찾기 -> 모듈에 컨트롤러 등록

## NestJS Service?

### Service 란?

서비스는 컨트롤러 뒤에서 비즈니스 로직을 처리하는 부분이다.

### Service 생성방법

서비스를 생성해보자 방법은 컨트롤러과 같다. `nest g service [서비스 이름] --no-spec` 을 사용하여 생성한다.

```bash

  # nest js 생성 명령어. module, controller, service 등
  $ nest g service [모듈이름] --no-spec
  # 예시 : nest g service boards --np-spec

  # --no-spec 옵션은 테스트 위한 소스코드 생성을 하지 않겠다는 의미
```

생성이 완료된 서비스파일 _boards.service.ts_ 는 다음과 같다.

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {}
```

물론 컨트롤러와 같이 명령어로 생성 시 모듈에 자동 등록이 된다.
자동등록이 되지 않은 경우, 또는 매뉴얼 생성인 경우 _boards.module.ts_ 를 다음과 같이 맞춰주자

```typescript
import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
	controllers: [BoardsController],
	providers: [BoardService],
})
export class BoardsModule {}
```

생성된 서비스 파일을 들여다 보면, `@Injectable` 이라는 데코레이터를 발견 할 수 있다.
Nest.js 는 이 데코레이터를 이용해 다른 컴포넌트에서 이 서비스를 사용할 수 있도록(Inject) 한다.

컨트롤러에서 서비스를 이용하여 로직을 처리할 수 있도록 컨트롤러에 DI(Dependency Injection) 을 해주자.
아래 코드는 _boards.controller.ts_ 이다.

```typescript
// ...전략
export class BoardsController {
	/*
    boardsService: BoardsService;

    constructor(boardsService: BoardsService) {
        this.boardsService = boardsService
    }

    위 구문이 줄여진 것이 아래 구문
  */

	constructor(private boardsService: BoardsService) {}

	// ...후략
}
```

짧게 줄일 수 있는 이유는 private 키워드를 사용하면 타입스크립트가 멤버 요소로 묵시적 처리한다.

## NestJS Model?

### Model 이란?

모델은 데이터 집합의 추상화 이다.
예를들어 게시글(Board) 라고 하면, 게시글에는 _제목, 내용, 올린시간, 비밀글 여부_ 등의 데이터가 존재한다.
이를 추상화 하여 정의 하는 것이다.

정의 방법에는 2가지가 존재한다.

- Interface 로 정의 : 변수의 타입만 체크
- Class 로 정의 : 변수 타입 및 인스턴스 생성 가능

우리는 Interface 를 이용해보도록 하자.

### Model 생성방법

모델을 생성하는 것은 어렵지 않다. 모듈 폴더 내부에 ts파일을 생성하면 된다.
지금까지 Boards 모듈을 만들었고, 이제 Board 모델을 만들 것이다. 밀접히 관련된 기능끼리 묶는 것이 좋으므로 `Boards` 모듈 내부에 생성하도록 하자

```bash
  # 현재 루트 디렉토리라고 가정
  $ cd src/boards | touch board.model.ts
```

이후 생성된 _board.model.ts_ 는 다음과 같이 작성하자

```ts
export interface Board {
	id: string;
	title: string;
	description: string;
	status: BoardStatus;
}

export enum BoardStatus {
	PUBLIC = 'PUBLIC',
	PRIVATE = 'PRIVATE',
}
```

생성 후 컨트롤러나 서비스에서 사용하고자 할 땐

```ts
import { Board } from './board.model';
```

선언을 추가하여 사용하면 된다.

## NestJS DTO(Data Transfer Object)

### DTO 란?

계층간 데이터 교환을 위한 객체이다.
DB에서 데이터를 얻어 Service나 Controller 등으로 보낼 때 사용하는 객체.
데이터가 네트워크를 통해 전송되는 방법을 정의하는 객체이기도 함.
interface, class 로 정의가능 (Nest.js에서는 클래스 이용을 권장함)

### DTO를 사용하는 이유?

- 데이터 유효성을 체크하는데 효율적이다.
- 더 안정적인 코드로 만들어준다. 타입스크립트의 타입으로도 사용됨.

### DTO 생성방법

클래스는 인터페이스와 다르게 런타임에 동작하므로 파이프같은 기능 이용시 더 유형하다. 따라서 DTO 또한 클래스로 작성한다.

먼저 모듈 폴더 내에 dto 폴더를 생성하자 예시는 boards 디렉토리 내부에 dto 폴더를 생성한다.

```bash
  # 현재 위치 : 루트디렉토리 라고 가정
  $ cd src/boards/ | mkdir dto | touch create-board.dto.ts
```

이제 _create-board.dto.ts_ 에서 다음을 작성하자

```ts
export class CreateBoardDto {
	title: string;
	description: string;
}
```

실제 Controller 에 적용하는 예제를 보자 아래는 _boards.controller.ts_ 이다.
Service 에도 같은 방법으로 적용하자.

```ts
// ... 중략
@Post()
createBoard(@Body createBoardDto: CreateBoardDto): Board {
  return this.boardsService.createBoard(createBoardDto)
}
```

## NestJS Pipe?

### Pipe 란?

파이프는 `@Injectable` 데코레이터가 적용된 클래스.
`data transformation` 과 `data validation` 을 위해 사용됨.
Nest 는 메소드 호출되기 직전에 파이프 삽입하고 파이프는 메소드로 향하는 인수를 수신하고 작동한다.

파이프는 크게 3종류로 나뉘어진다. 알아보자

### Pipe의 종류

- Handler level pipe : `@UsePipes()` 데코레이터를 이용하여 사용한다. 해당 핸들러가 가지는 모든 파라미터에 적용 됨.
  ```ts
  @Post()
  @UsePipes(ValidationPipe) //DTO에 있는 Validation Decorator 사용함
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
  	return this.boardsService.createBoard(createBoardDto);
  }
  ```
- Parameter level pipe : 파라미터 하나하나에 대응하는 파이프이다.
  ```ts
  @Delete('/:id')
  deleteBoardById(@Param('id', ParseIntPipe) id: number): Promise<void> {
  	return this.boardsService.deleteBoardById(id);
  }
  ```
- Global level pipe : 애플리케이션 레벨의 파이프이다. 모든 요청에 적용됨. 가장 상단 영역 main.ts 에 넣어 사용
  ```ts
  async function bootstrap() {
    const app = awiat NestFactory.create(AppModule);
    app.useGlobalPipes(GlobalPipes);
    await app.listen(3000);
  }
  bootstrap();
  ```

### Built-in Pipes

기본적으로 NestJS에 존재하는 6가지 파이프가 있음.

- VailidationPipe
- ParseIntPipe
- ParseBoolPipe
- ParseArrayPipe
- ParseUUIDPipe
- DefaultValuePipe

### 커스텀 파이프

파이프를 사용자 정의로 만들어서 사용할 수 있다.
클래스를 만들고, `PipeTransform` 이라는 인터페이스를 구현해야한다.
또, 모든 파이프는 `transfrom()` 이라는 메소드를 가지고 있고, 이것을 구현해주어야 한다.
`transfrom()` 메소드는 NestJS가 인자를 처리하기 위해 사용함.

바로 생성해보도록 하자. 먼저, 모듈 내에 _dto_ 디렉토리를 만든 것 처럼 _pipes_ 디렉토리를 만들어준다.
이후 파이프를 정의할 ts 파일을 만들고 다음 코드를 작성해 준다.

```bash
  # 현재 디렉토리 : 루트디렉토리
  $ cd src/boards/ | mkdir pipes | cd pipes | touch board-status-validataion.pipe.ts
```

```ts
// board-status-validation.pipe.ts

import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
	// readonly 키워드는 인스턴스 밖에서 읽을 수 있으나 수정 불가능
	readonly StatusOption = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

	transform(value: any) {
		value = value.toUpperCase();

		if (!this.isStatusValid(value)) {
			throw new BadRequestException(`${value} is not appropriate status`);
		}
		return value; //transform 메소드에서의 리턴된 값은 Router의 핸들러로 전달됨
	}

	private isStatusValid(status: any) {
		const index = this.StatusOption.indexOf(status);
		return index !== -1;
	}
}
```

## NestJS TypeORM (Object Relational Mapping)

### ORM 이란?

객체와 관계형 데이터베이스의 데이터를 자동으로 변형 및 연결하는 작업.

OOP 프로그래밍은 `클래스`를,
RDBMS는 `테이블`을 사용함
-> 객체 모델과 관계형 모델 간의 불일치가 발생한다.

이 작업을 쉽게 하기 위해 TypeORM 을 사용한다.

### TypeORM 사용 시 이점

- 모델 기반으로 DB table 체계를 자동으로 생성
- DB에서 개체를 쉽게 CRUD 할 수 있음.
- 테이블간 매핑( 1:1, 1:N, N:N) 등을 쉽게 만든다.
- CLI 명령을 제공함
- 간단한 코딩으로 ORM 사용 가능하며, 다른 모듈과의 호환성이 높다.

### TypeORM 사용하기 전 작업

모듈 몇가지를 설치한다.

```bash
  # typeorm 모듈인 typeorm
  # 사용하고자 하는 DB 모듈 ex)mysql2, mysql, pg 등
  # NestJS 에서 TypeORM 연동 모듈 @nestjs/typeorm

  $ npm install [mysql, pg... 중 선택] typeorm @nestjs/typeorm --save

  # TypeORM documentation
  # https://docs.nestjs.com/techniques/database
```

### TypeORM 을 애플리케이션과 연결하기

1. 설정 파일을 생성하자. 예시에서 파일 이름은 _typeorm.config.ts_ 이다.

```bash
  # 현재 디렉토리 : 루트디렉토리
  $ cd src
  $ mkdir configs
  $ touch typeorm.config.ts
```

2. _typeorm.config.ts_ 를 작성하자.

```ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
	//DataBase Type
	type: 'mariadb',
	host: 'db address',
	port: 3306,
	username: 'username',
	password: 'password',
	database: 'database name',

	//Entities to be loaded for this connections
	entities: [__dirname + '/../**/*.entity.{js,ts}'],

	synchronize: true,
};
```

> 위의 객체의 synchronize 옵션은 production mode 에서 false 로 하자.
> true 값을 주면 애플리케이션 재시작마다 엔티티 내부에서 수정된 컬럼길이, 타입, 변경 값 등을 포함하여 테이블을 drop하고 재생성함

> entity를 생성 시 마다 배열에 넣을 수 있지만, 위 처럼 작성하면 자동으로 모든 엔티티 포함하게 됨.
> entity를 이용해 테이블을 생성하기 때문에 엔티티 파일이 어디 있는지 설정한다.

3. 루트 모듈에서 Import 해주자

```ts
@Module({
	imports: [
		// forRoot 내에 넣은 설정은 모든 서브모듈에 다 적용됨
		TypeOrmModule.forRoot(typeORMConfig),
		BoardsModule,
	],
})
export class AppModule {}
```

## NestJS Entity

### Entity 란?

데이터베이스 테이블의 추상모델이다.

NestJS 에서는 `@Entity` 데코레이터를 사용한 클래스를 말한다.

### Entity 생성하기

모듈 폴더 내 (예시: boards) 에 `~.entity.ts` 로 파일 생성한다.

```bash
  # 현재 디렉토리 : 루트 디렉토리
  $ cd src/boards
  $ touch board.entity.ts
```

생성한 _board.entity.ts_ 파일을 작성하자

```ts
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BoardStatus } from './board.model';

@Entity()
export class Board extends BaseEntity {
	@PrimaryGeneratedColumn() // Table PK
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	status: BoardStatus;
}
```

## NestJS Repository

### Repository 란?

리포지토리는 엔티티 개체와 함께 작동하여 엔티티 찾기, 삽입, 업데이트 등을 함.
_일종의 pool (인듯)_

> Official Documentation : http://typeorm.delighful.studio/classes/_repository_repository_.repository.html

DB 관련 작업(INSERT, FIND, DELETE 등) 을 `Service` 가 아닌 `Repository` 에서 해주게 됨.
이것을 `Repository Pattern` 이라고 부름.

### Repository 생성하기

1. 리포지토리 파일 생성

```bash
  # 현재 디렉토리 : 루트 디렉토리
  $ cd src/boards
  $ touch board.repository.ts
```

2. 생성한 파일에 리포지토리 클래스 생성. 생성 시 _Repository_ 클래스를 반드시 상속할 것

```ts
import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
	// DB 작업
}
```

`@EntityRepository` : 클래스를 사용자 정의 저장소로 선언함. 특정 엔티티를 관리하거나 일반 저장소 일 수 있음.

3. 생성한 리포지토리를 다른 곳에서도 사용가능하도록 등록해주자. (예시 : _boards.module.ts_)

```ts
...
import { BoardRepository } from './board.repository';

@Module({
	imports: [ TypeOrmModule.forFeature([BoardRepository]) ],
	controllers: [BoardsController],
	providers: [BoardsService],
})
export class BoardsModule {}
```

## DB 연동으로 CRUD 구현 - 유튜브/인프런 강의를 따라한 경우만 해당

위에서 설명되었듯, DB는 이제 엔티티를 이용하게 되므로 model 파일이 필요없다.
하지만, enum 과 같은 status 관련 정의는 필요하므로 이를 따로 파일로 빼자 ( 동일경로, _board-status.enum.ts_).
uuid 도 사용하지 않으므로 코드에서 지워주자
이후 불필요한 경로들을 모두 지워준다.

- board-status-validation.pipe.ts BoardStatus
- boards.controller.ts
- board.entity.ts BoardStatus
- uuid

## 인증모듈 구현 (Auth)

먼저 인증모듈에 필요한 모듈, 컨트롤러, 서비스를 생성한다

```bash
  $ nest g module auth
  $ nest g controller auth --no-spec
  $ nest g service auth --no-spec
```

User 를 위한 엔티티를 생성하자 _user.entity.ts_

```ts
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['username']) // 유니크 해야할 값을 배열로 지정가능.
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	password: string;
}
```

User 관리를 위한 리포지토리도 생성해주자 _user.repository.ts_
이후 다른곳에서 사용하기 위해 등록도 해주자

```ts
// ========== user.repository.ts ===========
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}

// ========== auth.module.ts ===========
@Module({
	imports: [TypeOrmModule.forFeature([UserRepository])],
	controllers: [AuthController],
	providers: [AuthSerivce],
})
export class AuthModule {}
```

엔티티에서 유니크 해야 할 필드를 지정해주면, (`@Unique([field1, field2...])`)
이미 있는 데이터를 생성하려는 시도에 대해 500 에러를 던져버린다.

> NestJS error occured -> 바로 Controller 레벨로 가서 -> 500 Internal Server Error Throwed.

따라서 try-catch 문법으로 감싸주어 예외처리를 해주자

```ts
// user.repository.ts
async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {

        //...전략

        // User 엔티티에서 유니크 값 처리를 해두면 중복 시 바로 Nest가 500에러를 던져버림.
        // 따라서 예외처리 필요
        try {
            await this.save(user);
        } catch (err) {

            // 이 에러코드는 mariaDB, mysql 에러코드임. pg 등 다른 RDBMS 사용 할 경우 다른 처리 필요
            if(err.code === 'ER_DUP_ENTRY') {

                throw new ConflictException('Already existing user name');

            } else {

                throw new InternalServerErrorException('Internal Server error occured. Please contact Server Manager');
            }
        }

    }
```

### 암호화

비밀번호를 포함한 민감정보는 암호화 되어야한다.
회원가입 시 받은 비밀번호를 암호화 하여 DB 에 저장하고,
이후 로그인 시 마다 받은 비밀번호를 암호화 해보고 DB에 저장된 암호화된 비밀번호와 일치하는지 확인하는 방식으로 진행된다.

우리는 암호회를 위해 모듈을 설치하는데, bcryptjs 를 사용한다.

```bash
  $ npm install bcryptjs --save
```

이후 사용이 필요한 곳에 다음과 같이 선언 후 사용하자

```ts
import * as bcrypt from 'bcryptjs';
```

이후 회원가입 로직이 있는 곳 (_user.repository.ts > createUser method_) 을 수정하자

```ts
  //...전략
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {

        const {username, password} = authCredentialsDto;

        const salt = await bcrypt.genSalt(); // 솔트값 생성
        const hashedPassword = await bcrypt.hash(password, salt); // 암호화 (해싱)
        const user = this.create({username, password: hashedPassword}); // 유저 데이터 생성

        // User 엔티티에서 유니크 값 처리를 해두면 중복 시 바로 Nest가 500에러를 던져버림.
        // 따라서 예외처리 필요
        try {
            await this.save(user); // DB에 저장
        } catch (err) {

            if(err.code === 'ER_DUP_ENTRY') {

                throw new ConflictException('Already existing user name');

            } else {

                throw new InternalServerErrorException('Internal Server error occured. Please contact Server Manager');
            }
        }

    }
```

## JWT (JSON Web Token)

### JWT 란?

JWT는 당사자간의 정보를 JSON개체로 안전히 전송하기 위한 방식을 정의하는 표준이다.
디지털 서명이 되어 있어 신뢰성이 있다.

### JWT 구조

콤마(.) 를 기준으로 3개 부분으로 나누어진다. 처음부터 각각 Header, Payload, Verify Signature
_s2f80sdf8uj289fsadifly89fhsufdla_ . _23fh80sdfio;jfopsdakdjfio_ . _nhasldfk;jsdiofasdkfjiojio2_

- Header
  토큰에 대한 메타데이터 (타입, 해싱알고리즘 등)

- Payload
  유저 정보(issuer), 만료기간, 주제 등

- Verify Signature
  보낸 사람에 의해 서명되었으며, 어떤 식으로든 위조되지 않았는지 확인하는데 사용되는 서명.
  Header, Payload segments, Signature Algorithm 또는 공개키 사용하여 생성됨.

### NestJS 에서 JWT 사용하기 (with Passport)

1. 모듈 설치

```bash
  $ npm install @nestjs/jwt @nestjs/passport passport passport-jwt --save

  # @nestjs/jwt : nestjs 에서 jwt 사용 시 필요한 모듈
  # @nestjs/passport : nestjs 에서 passport 사용 시 필요한 모듈
  # passport : passport 모듈
  # passport-jwt : passport 에서 jwt 를 사용하기 위한 모듈
```

2. 애플리케이션에 JWT 모듈 등록
   auth 모듈 imports 에 넣어주자

```ts
// ... 전략
imports: [
		// JWT 인증 부분 담당, 그리고 주로 sign()을 위한 부분
		JwtModule.register({
			secret: 'secret key', // 토큰 생성 시 사용하는 시크릿 텍스트
			signOptions: {
				expiresIn: 60 * 60, //시간 자유 설정
			},
		}),
		TypeOrmModule.forFeature([UserRepository]),
	],

// 후략
```

3. 애플리케이션에 Passports 모듈 등록
   auth 모듈 imports 에 넣어주자

```ts
// ... 전략
imports: [
  // 유저 인증 위해 사용할 기본 strategy (인증 전략 ? ) 명시
		PassportModule.register({ defaultStrategy: 'jwt' }),
		// JWT 인증 부분 담당, 그리고 주로 sign()을 위한 부분
		JwtModule.register({
			secret: 'secret key', // 토큰 생성 시 사용하는 시크릿 텍스트
			signOptions: {
				expiresIn: 60 * 60, //시간 자유 설정
			},
		}),
		TypeOrmModule.forFeature([UserRepository]),
	],

// 후략
```

4. 로그인 성공 시 JWT 토큰 생성해주기
   Service에서 SignIn 메소드 생성하자.
   auth 모듈에 jwt 모듈을 등록했으므로 가져와서 사용할 수 있다.

```ts
// ========== auth.service.ts ===========
@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserRepository)
		private userRepository: UserRepository,
		private jwtService: JwtService,
	) {}

	// ... 중략

	async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
		const { username, password } = authCredentialsDto;
		const user = await this.userRepository.findOne({ username });

		// 유저 로그인 성공 시
		if (user && (await bcrypt.compare(password, user.password))) {
			// 유저 토큰 생성 (Secret + Payload)
			const payload = { username };
			const accessToken = await this.jwtService.sign(payload);

			return { accessToken };
		} else {
			throw new UnauthorizedException('Log-in Faild');
		}
	}
}
```

### NestJS 에서 JWT 사용하기 (with Passport) #2

로그인 시 클라이언트에 JWT 토큰을 주는 것 까지 완료했다.
이제 클라이언트는 요청 시 가지고 있던 JWT token을 헤더에 포함하여 서버에 보낼 것이다.
서버는 지금부터 _해당 토큰이 유효한지 확인_ 후 정보를 토큰으로부터 받고, 해당 정보로 데이터베이스를 이용한다.

이러한 처리를 쉽게 해주는 것이 `Passport` 모듈이므로 해당 모듈을 사용하여 구현한다.

1. `@types/passport-jwt` 모듈 설치

```bash
  $ npm install @types/passport-jwt --save
```

2. jwt.stratege.ts 생성/작성

```ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

// JWTStrategy가 필요하면 인젝션 할 수 있도록 @Injectable 데코레이터 사용
@Injectable()

// PassportStrategy 클래스는 @nestjs/passport 패키지에 정의되어있음.
// PassportStrategy(Strategy) 의 Strategy는 passport-jwt 패키지에 정의되어있는 JWT Strategy 임
export class JwtStrategy extends PassportStrategy(Strategy) {
	// 유효한 토큰일 경우 DB로부터 유저 정보 가져와야 하기 때문
	constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {
		// 유효한 토큰인지 확인
		super({
			// 유효성 검증과 페이로드 액세스에 필요함
			secretOrKey: 'module 에 정한 secret 키와 같음',

			// 현재 요청의 인증 헤더에서 Bearer token 으로 넘겨진 JWT 를 찾는 설정
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		});
	}

	// Passport 는 각 strategy 마다 validate 메소드를 call함.
	// 토큰이 유효한치 체크가 완료되면 validate 메소드가 살행됨.
	async validate(payload) {
		const { username } = payload;
		const user: User = await this.userRepository.findOne({ username });

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
```

3. _jwt.strategy.ts_ 를 사용하기 위해 AuthModule의 Providers 항목에 추가.
   _Passport_ 모듈과 _jwt.strategy.ts_ 를 다른 곳에서 사용할 수 있으므로, exports 항목에도 추가.

```ts
// AuthModule 내에서 사용할 수 있도록 등록
	providers: [AuthService, JwtStrategy],
	// 다른 Module에서도 사용할 수 있도록 함
	exports: [JwtStrategy, PassportModule],
```

이 상태에서 test api 를 하나 만들어 테스트 해보면 req 객체에 유저 정보가 들어가 있지 않다.
리턴 값으로 주었는데도 들어가 있지 않다. 이것을 해결하기 위해 우리는 미들웨어인 `Guards` 를 사용한다.

> 참고 : 미들웨어 호출순서는 다음과 같다.
> middleware - guard - intercepter - pipe - controller - service - controller - intercepter - filter

`Guards` 미들웨어를 사용하는 방법은 간단하다. Handler 레벨, Controller 레벨에서 파이프 사용하듯이 다음과 같이 `@UseGuards()` 데코레이터로 사용한다.

```ts
  @Post('/test')
  // 데코레이터 내에 Guards 인스턴스 또는 클래스를 넣어줘야함.
  // AuthGuard() 는 @nestjs/passport에서 가져온 가드이다.
  // 아까 validate 메소드에서 리턴했던 유저를 가져와 줄 뿐만 아니라 토큰이 없거나 변조된 경우 401 에러와 함께 에러 Response 를 클라이언트에 전해준다
	@UseGuards(AuthGuard())
	test(@Req() req) {

    console.log('req', req);
	}
```

## NestJS Custom Decorator

지금 우리는 req 객체 안에 validate 메소드에서 리턴한 유저객체를 포함시키기 위해
`@UseGuards(AuthGuard())` 를 사용했다.

따라서 `req.user` 로 접근하면 유저 객체에 접근이 가능하다.
하지만 `req` 를 파라미터로 받아서 `req.user` 로 접근하지 않고 바로 `user` 라는 파라미터로 가져올 수는 없을까?

가능하다 이것은 커스텀 데코레이터를 이용하면 된다.
그럼 커스텀 데코레이터를 만들어 보자.

먼저, auth 모듈 내에 _get-user.decorator.ts_ 라는 파일을 생성하고 아래와 같이 작성하자.

```ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User => {
	// request 객체가 ctx(context).switchToHttp().getRequest() 로 반환되는 객체 내에 있음.
	const req = ctx.switchToHttp().getRequest();

	// 따라서 req.user 로 user 객체에 접근가능함.
	return req.user;
});
```

이렇게 작성한 후, _auth.controller.ts_ 로 이동하자. 아까 작성해둔 테스트 핸들러를 다음과 같이 수정한다.

```ts
import { GetUser } from './get-user.decorator';

@UseGuards(AuthGuard()) // @UseGuards(AuthGuards()) 는 필수로 필요함. req 에 유저 객체가 있다는 것을 전제로 하는 기능이기 때문
test(@GetUser() user: User) {
	console.log('user', user);
}
```

## 인증된 유저에게만 권한을 주자

이제 인증된 유저에게만 권한을 주는 방법을 알아보자.
예시에서 계속 게시물을 CRUD 하는 것을 예제로 들었으므로 해당 예제를 따라간다.

먼저, 인증에 대한 모듈은 Auth Module에 존재한다. 따라서 해당 모듈을 Board Module에 imports 하자

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BoardRepository } from './board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
	imports: [TypeOrmModule.forFeature([BoardRepository]), AuthModule],
	controllers: [BoardsController],
	providers: [BoardsService],
})
export class BoardsModule {}
```

다음과 같이 잘 넣었다면, 저번에 사용했던 `@UseGuards(AuthGuard())` 를 이용하여,
이용자가 요청을 보낼 때 올바른 토큰을 가지고 요청을 주는지를 확인 한 후 게시물에 접근할 권한을 주자.

`@UseGuards(AuthGuard())` 는 컨트롤러의 Handler 별로 줄 수도 있고, Controller 레벨에서 줄 수도 있다.
예시에선 컨트롤러 레벨에서 주도록 한다.

```ts

import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validatin.pipe';

@Controller('boards')
@UseGuards(AuthGuard()) // 이렇게 설정하면 컨트롤러 레벨에서 AuthGuards 사용가능
export class BoardsController {
  // 후략
```

## 유저와 게시물과의 관계 설정하기

다음과 같이 user.entity.ts, board.entity.ts 를 수정한다.

_user.entity.ts_

```ts
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	password: string;

	// 첫번째 인수 : 변수 타입
	// 관계 설정하고 싶은 객체 (board) 에서 이 객체(USER) 를 찾으려먼 어떻게 접근하는지 설정해준다
	// eager 옵션 : 유저 정보 가져올 때 관계 된 엔티티 정보도 가져오는가? t/f (board 정보도 가져오는가)
	@OneToMany((type) => Board, (board) => board.user, { eager: false })
	boards: Board[];
}
```

_board.entity.ts_

```ts
	@ManyToOne((type) => User, (user) => user.boards, { eager: true })
	user: User;
```

이렇게 설정 한 후
어떻게 유저 정보와 게시물 정보를 서로 활용하는지는 코드를 확인하자.

- 게시물 생성
- 게시물 삭제
- 본인 게시물만 들고오기

세 기능 모두 boards.controller.ts 파일로부터 확인가능하다.

## 로그 남기기

애플리케이션 운용 중 에러가 나거나 필수적 정보를 남겨야 할 상황이 많다.
이를 위해 로그를 남기는데 로그를 알아보자

로그의 중류에는 몇 가지가 존재한다.

- Log : 중요정보의 범용 로깅
- Warning : 치명적이거나 파괴적이지 않은 미처리 문제
- Error : 치명적이거나 파괴적인 미처리 문제
- Debug : 오류 발생 시 디버깅 하는데 도움을 주는 유용 정보
- Verbose : 애플리케이션 동작에 대한 통찰 제공 정보

본래 expressJS 의 경우 Winston 이라는 로깅 모듈을 사용하지만,
`NestJS`에서는 존재하는 빌트인 클래스가 존재하므로 이용하도록 하자.

다음과 같이 이용한다.

```ts
import { Logger } from '@nestjs/common'; // 로깅 클래스 import
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const serverConfig = config.get('server');

	const port = serverConfig.port;
	await app.listen(port);
	Logger.log(`Application running start on port ${port}`); // 로깅하기
}
bootstrap();
```

Logger클래스에 구현된 메소드를 이용해서 로깅을 한다.

> Logger.[log, verbose, warning,...] 등의 방식으로 이용한다.

## 설정(Configuration)

소스 코드 내에서 어떤 코드들으느 개발 환경이나 운영 환경에 따라 다르게 동작해야 한다.
남들에게 노출되지 말아야 하는 코드나 설정들도 존재한다.  
이를 위해서 설정파일을 따로 만들어 보관하도록 하자

### 설정파일이란 ?

런타임 중이 아닌 애플리케이션이 시작될 때 로드가 되어 그 값들을 미리 정의하여 준다.
`JSON`, `XML`, `YAML`, `Environment Variables` 등의 형식을 이용한다.

### Codebase VS Environment Variables

설정 파일은 여러 형식으로 할 수 있지만, `JSON`, `XML`, `YAML` 같은 경우는 `Codebase` 에 해당하고
다른 방식으로는 환경변수로 할 수 있다. 이 둘을 나누는 이유는 다음과 같다.

- Codebase : 일반적으로 포트와 같이 노출되도 상관 없는 일반정보
- ENV : 비밀번호나 API Key 같이 노출되면 안되는 정보들

이를 설정해 보도록 하자. 우리는 모듈이 필요하다.

- 윈도우 사용자

  ```bash

  # 윈도우는 환경변수를 지원하지 않으므로 설치
  $ npm install -g win-node-env
  # 설정 모듈
  $ npm install config --save
  ```

- MAC/Linux 등
  ```bash
  # 설정 모듈
  $ npm install config --save
  ```

설치가 되었으면 루트 폴더로 이동하여 `config` 디렉토리를 만들고 안에 다음 3개 파일을 만들어 주자

- default.yml : 기본설정. 개발환경설정/운영환경설정에 동일적용
- development.yml : default.yml + 개발환경에서 필요한 정보
- production.yml : default.yml + 운영환경에서 필요한 정보

```bash
  # 현재 PWD : 루트 디렉토리
  $ mkdir config
  $ cd config
  $ touch default.yml development.yml production.yml
```

모두 생성 한 후 다음과 같이 입력하자

_default.yml_

```yml
server:
  port: 3000

db:
  type: 'your-db-type'
  port: 1234
  database: your-db-name

jwt:
  expiresIn: 3600
```

_development.yml_

```yml
db:
  host: 'your-db.host'
  username: 'dbUserName'
  password: 'dbUserPassword'
  synchronize: true

jwt:
  secret: 'your-jwt-secret'
```

_production.yml_

```yml
db:
  synchronize: false
```

3개 모두 작성했다면 이용하는 방법은 다음과 같다.

이용을 원하는 파일에 다음을 작성하고,

> import \* as config from 'config';

코드에 다음과 같이 작성하면 된다.

```ts
// main.ts

// default.yml 에 server: 하고 작성한 부분이 객체 형식으로 불러와짐.
const serverConfig = config.get('server');
const port = serverConfig.port;
await app.listen(port);
```

만약 AWS 와 같이 환경 변수를 설정할 수 있으면
해당 환경변수를 먼저 확인하고 없으면 yml 파일의 것을 사용하게끔 해야 할 것이다.

위와 같은 것을 import 해준 후 다음과 같이 작성하면 된다.

```ts
// typeorm.config.ts 의 일부분
username: process.env.RDS_USERNAME || dbConfig.username,
password: process.env.RDS_PASSWORD || dbConfig.password,
database: process.env.RDS_DB_NAME || dbConfig.database,

```

`process.env.변수명 || ~` 라면, 환경변수 중에 변수명에 맞는것이 존재하면 해당 변수를, 없으면 `||` 연산자 우항에 있는 것을 사용한다.
