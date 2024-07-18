import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';

@Module({
  imports: [JwtModule.register({ }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],

})
export class AuthModule {}
