import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from '../app.module'
import request from 'supertest'
import { PrismaService } from '../prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'

describe('Create question (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService) //para ter acesso ao prisma
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test('[POST] /questions', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'José Pereira',
        email: 'jose@email.com',
        password: '123456'
      }
    })

    const access_token = jwt.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .post('/questions')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        title: 'New questions',
        content: 'Questions content',
      })

    expect(response.statusCode).toBe(201)

    const questionOnDatabase = await prisma.question.findFirst({
      where: {
        title: 'New questions',
      }
    })

    expect(questionOnDatabase).toBeTruthy() //valida que crio no banco
  })
})