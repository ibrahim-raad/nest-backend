import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthDto } from '../dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/user.entity'
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    // Generate the password hash
    const hash = await bcrypt.hash(dto.password, 10);
    // Save the new user in the database
    try {
      const user = this.userRepository.create({
        email: dto.email,
        hash,
      });
      await this.userRepository.save(user);
      return this.signToken(user.id, user.email);
    } catch (err) {
      if (err.code === '23505') { // '23505' is a unique violation error code in PostgreSQL
        throw new ForbiddenException('Credentials taken');
      }
      throw err;
    }
  }

  async signin(dto: AuthDto) {
    // Find the user by email
    const user = await this.userRepository.findOne({ where: { email: dto.email } });
    // If user does not exist, throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect');
    // Compare password
    const pwMatches = await bcrypt.compare(dto.password, user.hash);
    // If password incorrect, throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return {
      access_token: token,
    };
  }
}
