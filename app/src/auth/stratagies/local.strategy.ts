import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
	constructor(private readonly userAuth : AuthService){
		super({
			usernameField : 'email'
		})
	}
	validate(email : string, password : string) {
		console.log("validate")
		return this.userAuth.validateUser(email, password);
	}

}