import { IsEmail, IsOptional, IsString, IsStrongPassword, IsUrl } from "class-validator";

export class CreateUserDto {
	@IsString()
	firstName : string;

	@IsString()
	lastName : string;
	
	@IsString()
	@IsEmail()
	email : string;

	@IsString()
	password : string;

	@IsString()
	@IsUrl()
	@IsOptional()
	avatarUrl? : string;
}
