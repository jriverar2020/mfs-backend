import { IsEmail, isEmail, IsNotEmpty, IsOptional, isString, IsString } from 'class-validator'

export class CreatePanCocoDto {
    @IsString()
    @IsNotEmpty()
    code: string;

    @IsString()
    @IsNotEmpty()
    name: string;


}