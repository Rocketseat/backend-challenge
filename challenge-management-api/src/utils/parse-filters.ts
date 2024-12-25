interface FilterInput {
  field: string;
  value: string | number | Date;
  operator: 'equals' | 'gt' | 'gte' | 'lte' | 'lt' | 'contains';
}

export const parseFilters = (filters: FilterInput[]) => {
  let parsedResult = {};
  for (const { field, operator, value } of filters) {
    if (field && value) {
      if (operator === 'contains') {
        parsedResult = {
          ...parsedResult,
          [field]: {
            contains: `${value}`,
            mode: 'insensitive',
          },
        };
        continue;
      }
      parsedResult = {
        ...parsedResult,
        [field]: {
          [operator]: value,
        },
      };
    }
  }

  return parsedResult;
};
