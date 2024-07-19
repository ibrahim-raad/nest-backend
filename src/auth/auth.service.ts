import { 
    ConflictException,
     ForbiddenException,
      Injectable,
       InternalServerErrorException, 
       UnauthorizedException 
    } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { LoginDto } from './dto';
import { RefreshToken } from './refresh-token.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
    constructor(
         private jwt: JwtService,
        @InjectRepository(User) 
        private userRepository: Repository<User>,
        @InjectRepository(RefreshToken) 
        private refreshTokenRepository: Repository<RefreshToken>
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

    async refreshToken(refreshToken: string) {
        const token = await this.refreshTokenRepository.findOne({
            where: {
                token: refreshToken,
                expiryDate: MoreThanOrEqual(new Date())
            }
        })
        if(!token) {
            throw new UnauthorizedException('you need to login again');
        }

        // await this.refreshTokenRepository.delete({ id: token.id });
        
        const user = await this.userRepository.findOne({ where: { id: token.userId } });
        if (!user) {
          throw new UnauthorizedException('User not found');
        }
    
        return this.signToken(user.id, user.email);
    }

    async signToken(userId: string, email: string,): Promise<{access_token: string, refresh_token: string}> {
        const payload = {
            sub: userId,
            email,
        }
        const secret = process.env.JWT_SECRET

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '80m',
             secret
        })
        // Refresh token 
        const refreshToken = uuidv4();
        await this.storeRefreshToken(refreshToken, userId)

        return {
            access_token: token,
            refresh_token: refreshToken
        }
    }

    async storeRefreshToken(token: string, userId ) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 3)

        await this.refreshTokenRepository.delete({ userId });

        const refreshToken = this.refreshTokenRepository.create({
            token,
            userId,
            expiryDate
        })

        await this.refreshTokenRepository.save(refreshToken)
    }
}


