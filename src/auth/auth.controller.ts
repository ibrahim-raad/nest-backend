import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
 //Post Signup
  @Post('signup')
  async signUp(@Body() signupData: SignupDto) {
    return this.authService.signup(signupData);
  }

 // Post Login
   @Post('login')
    async login(@Body() loginData: LoginDto) {
    return this.authService.login(loginData);
  }
 // Post Rfresh Token 
  @Post('refresh')
    async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto){
      return this.authService.refreshToken(refreshTokenDto.refreshToken);
    }
}
