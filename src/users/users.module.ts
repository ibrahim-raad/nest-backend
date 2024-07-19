import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RefreshToken } from 'src/auth/refresh-token.entity';


@Module({
  imports: [TypeOrmModule. forFeature([User, RefreshToken])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
