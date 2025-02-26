import { IsString, Matches, MinLength } from "class-validator"

export class ResetPassswordDto{
    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[0-9])/, { message: 'Password must contain at least one number'})
    newPassword: string
    
    @IsString()
    resetToken: string
}