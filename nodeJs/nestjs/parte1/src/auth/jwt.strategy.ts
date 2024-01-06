import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Env } from '../env'
import { z } from 'zod'
import { Injectable } from '@nestjs/common'

const tokenPayLoadSchema = z.object({
  sub: z.string().uuid()
})

export type UserPayLoad = z.infer<typeof tokenPayLoadSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<Env, true>) {
    const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //pega o token do header
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256']
    }) //chama o construtor da classe strategypassport
  }

  async validate(payload: UserPayLoad) {
    return tokenPayLoadSchema.parse(payload)
  }
}