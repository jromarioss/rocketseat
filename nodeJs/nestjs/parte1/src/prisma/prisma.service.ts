import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['warn', 'error'] //faz um log do warn e error
    }) //chama o construtor da classe
  }

  onModuleInit() { //chama quando for instanciado
    return this.$connect() //conecta com prisma
  }

  onModuleDestroy() { //chama quando for destruído
    return this.$disconnect() //desconecta do prisma caso caia
  }
}
