import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeService } from './challenge.service';
import { PrismaService } from '../prisma/prisma.service';

const prismaMock = {
  challenge: {
    create: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('ChallengeService', () => {
  let service: ChallengeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChallengeService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<ChallengeService>(ChallengeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new challenge', async () => {
    const challengeInput = {
      title: 'Challenge Title',
      description: 'Challenge Description',
    };
    const challenge = await service.create(challengeInput);
    console.log(challenge);
  });
});
