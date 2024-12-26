import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeService } from './challenge.service';
import { ChallengeFakeRepository } from './repositories/implementations/challenge.fake.repository';
import { NotFoundException } from '@nestjs/common';

describe('ChallengeService', () => {
  let service: ChallengeService;
  let challengeRepository: ChallengeFakeRepository;

  beforeEach(async () => {
    challengeRepository = new ChallengeFakeRepository();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChallengeService,
        {
          provide: 'ChallengeRepository',
          useValue: challengeRepository,
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
    expect(challenge).toMatchObject(challengeInput);
    expect(challenge.id).toBeDefined();
  });

  it('should not be able to create challenge with existing title', async () => {
    const title = 'Challenge Title Exists';
    await challengeRepository.create({
      title,
      description: 'Challenge Description',
    });

    await expect(
      service.create({
        title,
        description: 'xpto',
      }),
    ).rejects.toThrow(`challenge with title ${title} already exists!`);
  });

  it('should be able to list challenges', async () => {
    const challenges = [
      {
        title: 'Challenge Title 1',
        description: 'Challenge Description 1',
      },
      {
        title: 'Challenge Title 2',
        description: 'Challenge Description 2',
      },
      {
        title: 'Challenge Title 3',
        description: 'Challenge Description 3',
      },
    ];
    for (const challenge of challenges) {
      await challengeRepository.create(challenge);
    }

    const result = await service.findMany({});
    expect(result).toHaveLength(3);
    expect(result[0]).toMatchObject({
      title: 'Challenge Title 1',
      description: 'Challenge Description 1',
    });
  });

  it('should be able to list challenges with pagination', async () => {
    const challenges = [
      {
        title: 'Challenge Title 1',
        description: 'Challenge Description 1',
      },
      {
        title: 'Challenge Title 2',
        description: 'Challenge Description 2',
      },
      {
        title: 'Challenge Title 3',
        description: 'Challenge Description 3',
      },
    ];
    for (const challenge of challenges) {
      await challengeRepository.create(challenge);
    }

    const result = await service.findMany({
      page: 2,
      limit: 2,
    });

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      title: 'Challenge Title 3',
      description: 'Challenge Description 3',
    });
  });

  it('should be able to list challenges with filters', async () => {
    const challenges = [
      {
        title: 'Challenge Title 1 filter',
        description: 'Challenge Description 1',
      },
      {
        title: 'Challenge Title 2 fiLter',
        description: 'Challenge Description 2 FiltER',
      },
      {
        title: 'Challenge Title 3',
        description: 'Challenge Description 3',
      },
    ];
    for (const challenge of challenges) {
      await challengeRepository.create(challenge);
    }

    const result = await service.findMany({
      title: 'filter',
      description: 'filter',
    });

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      title: 'Challenge Title 2 fiLter',
      description: 'Challenge Description 2 FiltER',
    });
  });

  it('should be able to update a challenge', async () => {
    const challenge = await challengeRepository.create({
      title: 'Challenge',
      description: 'Challenge description',
    });

    await service.update({
      id: challenge.id,
      title: 'Updated Challenge',
      description: 'Updated description',
    });

    const updatedChallenge = await challengeRepository.findOne(challenge.id);
    console.log(updatedChallenge);
    expect(updatedChallenge).toMatchObject({
      title: 'Updated Challenge',
      description: 'Updated description',
    });
  });

  it('should not be able to update a challenge with existing title', async () => {
    const title = 'Challenge Title Exists';
    await challengeRepository.create({
      title,
      description: 'Challenge description',
    });

    const challengeToUpdate = await challengeRepository.create({
      title: 'Valid title',
      description: 'Challenge description',
    });

    await expect(
      service.update({
        id: challengeToUpdate.id,
        title,
        description: 'xpto',
      }),
    ).rejects.toThrow(`challenge with title ${title} already exists!`);
  });

  it('should not be able to update non existing challenge', async () => {
    await expect(
      service.update({
        id: crypto.randomUUID(),
        title: 'Valid title',
        description: 'Challenge description',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should be able to delete a challenge', async () => {
    const challenge = await challengeRepository.create({
      title: 'Valid title',
      description: 'Challenge description',
    });
    await service.delete(challenge.id);
    const foundChallenge = await challengeRepository.findByTitle(challenge.id);
    expect(foundChallenge).toBeFalsy();
  });

  it('should not be able to delete non existing challenge', async () => {
    await expect(service.delete(crypto.randomUUID())).rejects.toThrow(
      NotFoundException,
    );
  });
});
