import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthJwtPayload } from "../types/auth-jwtPayload";
import { Request } from "express";
import { AuthService } from "../auth.service";


@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, "refresh-jwt"){

	constructor(@Inject() private readonly autService : AuthService){
		if (!process.env.REFRESH_JWT_SECRET) {
			throw new Error('REFRESH_JWT_SECRET is not defined');
		}
		super({
			jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration : false,
			secretOrKey : process.env.REFRESH_JWT_SECRET,	
			passReqToCallback : true,
		})
	}
	async validate(req : Request, payload : AuthJwtPayload){
		const authHeader = req.get("authorization");
		if (!authHeader)
			throw new UnauthorizedException("Missing author");
		const refreshToken = authHeader.replace("Baarer", "").trim();
		const userId = payload.sub;
		return await this.autService.validateRefreshToken(userId, refreshToken);
	}
}