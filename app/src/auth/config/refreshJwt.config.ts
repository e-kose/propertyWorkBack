import { registerAs } from "@nestjs/config"
import { JwtModuleOptions, JwtSignOptions } from "@nestjs/jwt"

export default registerAs('refreshJwt.config',(): JwtSignOptions=>({
	secret : process.env.REFRESH_JWT_SECRET,
		expiresIn : process.env.REFRESH_JWT_DAY,
}));