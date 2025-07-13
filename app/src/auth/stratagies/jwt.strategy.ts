import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthJwtPayload } from "../types/auth-jwtPayload";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

	constructor(private readonly autService : AuthService){
		if (!process.env.JWT_SECRET) {
			throw new Error('JWT_SECRET is not defined');
		}
		super({
			jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration : false,
			secretOrKey : process.env.JWT_SECRET,	
		})
	}
	async validate(payload : AuthJwtPayload){
		const userId = payload.sub;	
		return this.autService.validateJwtUser(userId);
	}
}