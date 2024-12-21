export const parsePartialFilters = (filters: Record<string, string>) => {
  let parsedResult = {};
  for (const [field, value] of Object.entries(filters)) {
    if (field && value) {
      parsedResult = {
        ...parsedResult,
        [field]: {
          contains: value,
          mode: 'insensitive',
        },
      };
    }
  }
  return parsedResult;
};
