import { parseFilters } from './parse-filters';

describe('ChallengeService', () => {
  it('should parse filters case insensitive', () => {
    const filtersInput = {
      title: 'TeS',
      description: 'chaL',
    };
    const result = parseFilters(filtersInput);
    expect(result).toMatchObject({
      title: { contains: 'TeS', mode: 'insensitive' },
      description: { contains: 'chaL', mode: 'insensitive' },
    });
  });

  it('should convert numeric input to text before returning', () => {
    const filtersInput = {
      age: 90,
      height: 1.9,
    };
    const result = parseFilters(filtersInput);
    expect(result).toMatchObject({
      age: { contains: '90', mode: 'insensitive' },
      height: { contains: '1.9', mode: 'insensitive' },
    });
  });
});
