import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
  imports: [UserModule],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
