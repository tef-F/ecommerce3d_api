import { IsEmail, IsNotEmpty, IsNumberString, IsPhoneNumber, IsString } from "class-validator";

// Define a "type" request
export class AuthDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

}