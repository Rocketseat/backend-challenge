import { FilterInput, parseFilters } from './parse-filters';

describe('ChallengeService', () => {
  it('should parse filters case insensitive', () => {
    const filtersInput: FilterInput[] = [
      {
        field: 'title',
        operator: 'contains',
        value: 'abc',
      },
      {
        field: 'description',
        operator: 'contains',
        value: 'ab cd',
      },
    ];
    const result = parseFilters(filtersInput);
    expect(result).toMatchObject({
      title: { contains: 'abc', mode: 'insensitive' },
      description: { contains: 'ab cd', mode: 'insensitive' },
    });
  });

  it('should parse filters with other operators', () => {
    const filtersInput: FilterInput[] = [
      {
        field: 'parentId',
        operator: 'equals',
        value: 1,
      },
      {
        field: 'status',
        operator: 'equals',
        value: 'done',
      },
      {
        field: 'createdAt',
        operator: 'gte',
        value: '2024-12-01',
      },
      {
        field: 'createdAt',
        operator: 'lte',
        value: '2025-01-01',
      },
    ];

    const result = parseFilters(filtersInput);
    expect(result).toMatchObject({
      parentId: { equals: 1 },
      status: { equals: 'done' },
      createdAt: { gte: '2024-12-01', lte: '2025-01-01' },
    });
  });
});
