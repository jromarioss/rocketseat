import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { UserPayLoad } from '../auth/jwt.strategy'
import { CurrentUser } from '../auth/current-user-decorator'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { PrismaService } from '../prisma/prisma.service'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(
    private prisma: PrismaService
  ) {}

  @Post()
  async handle(
      @Body(new ZodValidationPipe(createQuestionBodySchema)) body: CreateQuestionBodySchema,
      @CurrentUser() user: UserPayLoad
    ) {
    console.log(user) // tem os dados do usuário
    const { content, title } = body
    const { sub: userId } = user

    const slug = this.convertToSlug(title)

    await this.prisma.question.create({
      data: {
        authorId: userId,
        title,
        content,
        slug
      }
    })
  }

  private convertToSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
  }
}