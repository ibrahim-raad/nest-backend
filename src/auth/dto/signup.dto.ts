import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class SignupDto {
    @IsString()
    @IsNotEmpty()
    fullname: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[0-9])/, { message: 'Password must contain at least one number'})
    @IsNotEmpty()
    password: string
}