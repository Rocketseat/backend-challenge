import { GraphQLScalarType } from 'graphql';

enum AnswerStatus {
  PENDING = 'Pending',
  ERROR = 'Error',
  DONE = 'Done',
}

export const AnswerStatusScalarType = new GraphQLScalarType({
  name: 'AnswerStatus',
  description:
    'Status of an answer, comprising the values "Pending", "Error" and "Done".',
  serialize(value: AnswerStatus): string {
    return AnswerStatus[value];
  },
  parseValue(value: string): AnswerStatus {
    if (!Object.values(AnswerStatus).includes(value as AnswerStatus)) {
      throw new Error(
        `Error parsing Answer Status. Values allowed are ${Object.values(AnswerStatus).join(', ')}`,
      );
    }

    return Object.entries(AnswerStatus).find(
      ([, val]) => val === value,
    )?.[0] as AnswerStatus;
  },
});
