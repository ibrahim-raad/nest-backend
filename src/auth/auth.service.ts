import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { Repository } from 'typeorm';
import { LoginDto } from './dto';

@Injectable()
export class AuthService {
    constructor(
         private jwt: JwtService,
        @InjectRepository(User) 
        private userRepository: Repository<User>
     ) {}
    async signup(signupData: SignupDto) {
        const {email, password, fullname} = signupData;
        //check if email is in use
        const emailInUse = await this.userRepository.findOne({where: {email}});
        if(emailInUse) {
            throw new ConflictException('email is already in use')
        }
        // hash pass
        const hashedPass = await argon.hash(password);
        
        // create user document and save 
        const user =  this.userRepository.create({
          fullname,
          email,
          hash: hashedPass  
        });
        

        try {
            await this.userRepository.save(user);
        } catch (err) {
            throw new InternalServerErrorException( 'error saving user', err.message)
        }
        return this.signToken(user.id, user.email)
        
    }

    async login(loginData: LoginDto) {
        const { email, password } = loginData;

        const user = await this.userRepository.findOne({ where: { email }})
        
        if (!user) throw new UnauthorizedException('Credentials incorrect');

        const pwMatche = await argon.verify(user.hash, password);

        if(!pwMatche) throw new ForbiddenException('Credentials incorrect');

        return this.signToken(user.id, user.email);

    }

    async signToken(userId: number, email: string,): Promise<{access_token: string}> {
        const payload = {
            sub: userId,
            email,
        }
        const secret = process.env.JWT_SECRET

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '80m',
            secret: secret
        })
        return {
            access_token: token
        }
    }
}
