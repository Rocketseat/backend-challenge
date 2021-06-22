# Corrections

Esse é o serviço responsável pela correção dos desafios e nele toda a comunicação é feita via Apache Kafka.
Aqui, nos comunicamos utilizando o tópico `challenge.correction` (consumer groupId: `challenge-consumer`).

```typescript
interface CorrectLessonMessage {
  value: {
    submissionId: string;
    repositoryUrl: string;
  };
}

interface CorrectLessonResponse {
  submissionId: string;
  repositoryUrl: string;
  grade: number;
  status: 'Pending' | 'Error' | 'Done';
}
```

### Executando o app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
