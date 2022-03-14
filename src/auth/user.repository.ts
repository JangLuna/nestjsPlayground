import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";

import * as bcrypt from 'bcryptjs'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        
        const {username, password} = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({username, password: hashedPassword});
        
        // User 엔티티에서 유니크 값 처리를 해두면 중복 시 바로 Nest가 500에러를 던져버림.
        // 따라서 예외처리 필요
        try {
            await this.save(user);
        } catch (err) {
            
            if(err.code === 'ER_DUP_ENTRY') {

                throw new ConflictException('Already existing user name');

            } else {
                
                throw new InternalServerErrorException('Internal Server error occured. Please contact Server Manager');
            }
        }
        
    }
}