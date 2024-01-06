import { Body, ConflictException, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

//cria o schema do zod
const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {} //chama o construtor

  @Post()
  @HttpCode(201) //força o retorno 201
  @UsePipes(new ZodValidationPipe(createAccountBodySchema)) //usando o pipe do zod
  async handle(@Body() body: CreateAccountBodySchema) { //vem do corpo e salva na var body
    const { name, email, password } = body //pega de dentro do body, validando com zod

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    if (userWithSameEmail) {
      throw new ConflictException("User with same e-mail address already exists.")
    }

    const hashedPassword = await hash(password, 8)

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })
  }
}