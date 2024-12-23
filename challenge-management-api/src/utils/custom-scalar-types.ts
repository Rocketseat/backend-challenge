import { GraphQLScalarType } from 'graphql';

enum AnswerStatus {
  PENDING = 'Pending',
  ERROR = 'Error',
  DONE = 'Done',
}

export const AnswerStatusScalarType = new GraphQLScalarType({
  name: 'AnswerStatus',
  description:
    'Status of an answer, comprising the values "PENDING", "PENDING" and "PENDING".',
  serialize(value: AnswerStatus): string {
    return AnswerStatus[value];
  },
  parseValue(value: string): AnswerStatus {
    if (!(value in AnswerStatus)) {
      throw new Error(
        `Error parsing Answer Status. Values allowed are ${Object.keys(AnswerStatus).join(', ')}`,
      );
    }

    return AnswerStatus[value];
  },
});
