import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeInMemoryRepository } from '../../repositories/inMemory/ChallengeInMemory.repository';
import { ChallengeRepository } from '../../repositories/prisma/Challenge.repository';
import { ListChallengesUseCase } from './ListChallenges.useCase';

describe('List Challenge Use Case', () => {
  let listUseCase: ListChallengesUseCase;
  let challengeRepository: ChallengeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListChallengesUseCase,
        {
          provide: ChallengeRepository,
          useClass: ChallengeInMemoryRepository,
        },
      ],
    }).compile();

    listUseCase = module.get<ListChallengesUseCase>(ListChallengesUseCase);
    challengeRepository = module.get<ChallengeRepository>(ChallengeRepository);
  });

  it('should be defined', () => {
    expect(listUseCase).toBeDefined();
  });

  it('should be list all challenges', async () => {
    const challengeData = {
      title: 'Remove Challenge',
      description: 'should be removing one challenge by id',
    };

    await challengeRepository.create(challengeData);
    await challengeRepository.create(challengeData);

    const { challenges } = await listUseCase.execute();

    const expectedChallengeData = {
      ...challengeData,
      id: expect.any(String),
    };

    expect(challenges.length).toBe(2);
    expect(challenges).toEqual(
      expect.arrayContaining([
        expect.objectContaining(expectedChallengeData),
        expect.objectContaining(expectedChallengeData),
      ]),
    );
  });

  it('should be list the top five challenges', async () => {
    const CREATED_QUANTITY = 10;

    const challengeData = {
      title: 'Remove Challenge',
      description: 'should be removing one challenge by id',
    };

    const bulkCreated = Array.from(Array(CREATED_QUANTITY).keys()).map(
      (value) =>
        challengeRepository.create({
          ...challengeData,
          title: `${challengeData.title} ${value}`,
        }),
    );

    await Promise.all(bulkCreated);

    const expectedQuantity = 5;
    const expectedPage = 1;
    const expectedContainsNextPage = true;
    const expectedTotalPages = Math.ceil(CREATED_QUANTITY / expectedQuantity);

    const { challenges, pagination } = await listUseCase.execute({
      pagination: {
        page: expectedPage,
        pageSize: expectedQuantity,
      },
    });

    expect(challenges.length).toBe(expectedQuantity);
    expect(challenges.at(0).title).toContain('0');
    expect(challenges.at(-1).title).toContain('4');
    expect(pagination.totalPages).toBe(expectedTotalPages);
    expect(pagination.totalItems).toBe(CREATED_QUANTITY);
    expect(pagination.page).toBe(expectedPage);
    expect(pagination.pageSize).toBe(expectedQuantity);
    expect(pagination.containsNextPage).toBe(expectedContainsNextPage);
  });

  it('should be list challenges searching by text - title', async () => {
    const CREATED_QUANTITY = 20;

    const challengeData = {
      title: 'Remove Challenge',
      description: 'should be removing one challenge by id',
    };

    const bulkCreated = Array.from(Array(CREATED_QUANTITY).keys()).map(
      (value) =>
        challengeRepository.create({
          title: `${challengeData.title} ${value}`,
          description: `${challengeData.description} ${value * 2}`,
        }),
    );

    await Promise.all(bulkCreated);

    const { challenges } = await listUseCase.execute({
      search: 'Challenge 4',
    });

    const expectedChallengeData = {
      title: 'Remove Challenge 4',
      description: 'should be removing one challenge by id 8',
    };

    expect(challenges.length).toBe(1);
    expect(challenges).toEqual(
      expect.arrayContaining([expect.objectContaining(expectedChallengeData)]),
    );
  });

  it('should be list challenges searching by text - description', async () => {
    const CREATED_QUANTITY = 20;

    const challengeData = {
      title: 'Remove Challenge',
      description: 'should be removing one challenge by id',
    };

    const bulkCreated = Array.from(Array(CREATED_QUANTITY).keys()).map(
      (value) =>
        challengeRepository.create({
          title: `${challengeData.title} ${value}`,
          description: `${challengeData.description} ${value * 2}`,
        }),
    );

    await Promise.all(bulkCreated);

    const { challenges } = await listUseCase.execute({
      search: 'by id 8',
    });

    const expectedChallengeData = {
      title: 'Remove Challenge 4',
      description: 'should be removing one challenge by id 8',
    };

    expect(challenges.length).toBe(1);
    expect(challenges).toEqual(
      expect.arrayContaining([expect.objectContaining(expectedChallengeData)]),
    );
  });
});
