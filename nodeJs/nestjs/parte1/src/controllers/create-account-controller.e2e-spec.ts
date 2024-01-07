import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from '../app.module'
import request from 'supertest'
import { PrismaService } from '../prisma/prisma.service'

describe('Create account (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService) //para ter acesso ao prisma

    await app.init();
  });

  test('[POST] /accounts', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: 'José Pereira',
      email: 'jose@email.com',
      password: '123456'
    })

    expect(response.statusCode).toBe(201)

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        email: 'jose@email.com'
      }
    })

    expect(userOnDatabase).toBeTruthy() //valida que crio no banco
  })
})