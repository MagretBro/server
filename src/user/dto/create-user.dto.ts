import { IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;
    @MinLength(6, { message: 'Pass should be equal or more then 6 symbols'})
    password: string;
}
