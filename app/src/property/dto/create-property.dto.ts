import { IsInt, IsNotEmpty, IsPositive, IsString, Length } from "class-validator";

export class CreatePropertyDto {
	@IsString()
	@IsNotEmpty()
	@Length(2, 10, {message : "error on lenght"})
	name : string;

	@IsString()
	description : string;

	@IsInt()
	@IsPositive()
	price : number;
}