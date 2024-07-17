import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "../users/user.entity"; // Adjust path as needed

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private configService: ConfigService,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate(payload: JwtPayload) {
        const { sub: id } = payload;

        try {
            const user = await this.userRepository.findOne(id);

            if (!user) {
                throw new UnauthorizedException();
            }

            // Remove sensitive information from user object before returning
            const { hash, ...result } = user;
            return result;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}
