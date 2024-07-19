import { IsString } from "class-validator"

export class ResetPassswordDto{
    @IsString()
    newPassword: string
    
    @IsString()
    resetToken: string
}