import { Inject, Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerResolver } from './answer.resolver';
import { ChallengeService } from '../challenge/challenge.service';
import { AnswerPrismaRepository } from './repositories/implementations/answer.prisma.repository';
import { ChallengePrismaRepository } from 'src/challenge/repositories/implementations/challenge.prisma.repository';
import { AnswerConsumer } from './answer.consumer';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: 'KAFKA_PRODUCER',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.get('KAFKA_PRODUCER_ID'),
              brokers: [configService.get('KAFKA_BROKER')],
            },
            consumer: {
              groupId: configService.get('KAFKA_CONSUMER_GROUP_ID'),
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [
    AnswerResolver,
    AnswerService,
    ChallengeService,
    { provide: 'AnswerRepository', useClass: AnswerPrismaRepository },
    { provide: 'ChallengeRepository', useClass: ChallengePrismaRepository },
  ],
  controllers: [AnswerConsumer],
})
export class AnswerModule {
  constructor(@Inject('KAFKA_PRODUCER') private producer: ClientKafka) {}
  async onModuleInit() {
    this.producer.subscribeToResponseOf('challenge.correction');
    await this.producer.connect();
  }
}
