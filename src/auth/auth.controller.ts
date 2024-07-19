import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPassswordDto } from './dto/reset-password.dto';

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
 // Post Refresh Token 
  @Post('refresh')
    async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto){
      return this.authService.refreshToken(refreshTokenDto.refreshToken);
    }

    // Put Change-password
    @UseGuards(AuthGuard)
    @Put('change-password')
      async changePassword(@Body() changepasswordDto: ChangePasswordDto, @Req() req) {
        return this.authService.changePassword(
          req.userId,
          changepasswordDto.oldPassword,
          changepasswordDto.newPassword
          );
      }

      @Post('forgot-password')
      async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        return this.authService.forgotPassword(forgotPasswordDto.email);
      }

      @Put('reset-password')
      async resetPassword(@Body() resetPasswordDto: ResetPassswordDto){
        return this.authService.resetPassword(resetPasswordDto.newPassword, resetPasswordDto.resetToken)
      }
}
