![image](https://user-images.githubusercontent.com/40845824/121069742-3accdb00-c7a4-11eb-87d0-3dc47e433762.png)

# 🚀 Back end challenge

Bem-vindo(a). Este é o desafio Back end!

O objetivo deste desafio é avaliar suas habilidades de programação.
Quando sua solução estiver pronta, basta responder o e-mail que recebeu com o link do seu repo aqui no Github!
Em seguida, enviaremos o feedback e as instruções dos próximos passos!

Caso tenha alguma dúvida, pode enviá-las em resposta ao e-mail que recebeu o teste. Bom desafio!
Bom desafio!

> ⚠️ **É importante que o seu repo esteja público, caso contrário não iremos conseguir avaliar sua resposta**

---

- [🧠 Contexto](#-contexto)
  - [🚰 Fluxo esperado](#-fluxo-esperado)
  - [⚔️ Desafio](#️-desafio)
  - [📓 Submissão](#-submissão)
- [✔️ Critérios de Avaliação](#️-critérios-de-avaliação)
  - [😎 Seria legal](#-seria-legal)
- [:rocket: Instruções](#rocket-instruções)
  - [Docker](#docker)
  - [Kafka](#kafka)
  - [GraphQL](#graphql)
  - [:notebook: To-do list](#notebook-to-do-list)

# 🧠 Contexto

Para deixar a jornada dos nossos alunos mais completa, a Rocketseat disponibiliza desafios que estimulam a prática do conteúdo estudado. Sabendo disso, este projeto consiste em implementar um serviço que gerencie os desafios enviados por nossos alunos.

Neste projeto, está incluído o **[corrections](packages/corrections) (serviço de correção das submissões)** já pré-configurado, sua missão será implementar os fluxos de:

- Interação com Desafios e Submissões. (Criar, buscar, editar e remover);
- Atualização das submissões utilizando a integração com o serviço [corrections](packages/corrections);

### 🚰 Fluxo esperado

- Uma submissão de um desafio é **enviada**;
- A submissão é registrada com o status `Pending`;
  - :warning: **Caso não exista o desafio** ou a **url não seja um repositório do github** a submissão é registrada com status `Error` e um erro é retornado ao usuário, dando fim a esse fluxo;
- O serviço [corrections](packages/corrections) é notificado e retorna a correção da submissão;
- O status e a nota da submissão são **atualizados**;

### ⚔️ Desafio

| Atributo        | Tipo     |
| --------------- | -------- |
| Identificador   | `uuidv4` |
| Titulo          | `texto`  |
| Descrição       | `texto`  |
| Data de criação | `data`   |

**Operações necessárias**

- [x] Criar
- [x] Remover
- [x] Editar
- [x] Listar
  - [x] Paginação
  - [x] Busca por título e descrição

### 📓 Submissão

| Atributo                 | Tipo                   |
| ------------------------ | ---------------------- |
| Identificador            | `uuidv4`               |
| Identificador do desafio | `uuidv4`               |
| Link para o reposítorio  | `texto`                |
| Data de criação          | `data`                 |
| Status                   | `Pending, Error, Done` |
| Nota                     | `númerico`             |

**Operações necessárias**

- [ ] Enviar
- [ ] Listar
  - [ ] Filtros: desafio, intervalo de datas, status
  - [ ] Paginação

## ✔️ Critérios de Avaliação

Além dos requisitos levantados acima, iremos olhar para os seguintes critérios durante a correção do desafio:

- Arquitetura (DDD, Clean Architecture)
- Documentação (comente sobre decisões técnicas, escolhas, requisitos, etc)
- Código limpo (utilização de princípios como DRY, KISS, SOLID, YAGNI)
- Testes (unitários, e2e, etc)
- Padrão de commits (Conventional)

### 😎 Seria legal

- **Utilizar [Nest.js](https://nestjs.com/)**
- Custom Scalar Types

## :rocket: Instruções

Chegou a hora de colocar a mão na massa!

Neste projeto já incluímos alguns arquivos para a configuração do projeto.

### Docker

Criamos um `docker-compose` que faz a configuração de 3 _containers_ incluindo as credenciais (login do postgres, database, etc):

| Container | Ports       |
| --------- | ----------- |
| Postgres  | `5432:5432` |
| Kafka     | `9092:9092` |
| Zookeper  | `2181:2181` |

### Kafka

Escolhemos o utilizar o [Kafka](https://kafka.apache.org/) para a comunicação com o serviço de [corrections](packages/corrections). Caso você utilize Nest.js, o mesmo possui uma [integração completa com essa ferramenta](https://docs.nestjs.com/microservices/kafka).

Nas instruções do serviço de [corrections](packages/corrections) estão especificados os tópicos e eventos que a aplicação deve utilizar.

![image](https://user-images.githubusercontent.com/40845824/122421461-c3950500-cf62-11eb-903a-0b629cc8502f.png)

:warning: É necessário iniciar o serviço de [corrections](packages/corrections) para que os tópicos do Kafka sejam criados.

### GraphQL

A interação com os desafios e submissões deve ser feita via GraphQL, para isso deixamos uma sugestão das operações a serem criadas, porém sinta-se livre para modelar seu _schema_ da melhor forma:

```graphql
Query {
  challenges(...): [Challenge!]!
  answers(...): [Answer!]!
}

Mutation {
 createChallenge(...): Challenge!
 updateChallenge(...): Challenge!
 deleteChallenge(...): Challenge!

 answerChallenge(...): Answer!
}
```

### :notebook: To-do list

- [x] Fazer o fork do projeto
- [x] Configurar ambiente de desenvolvimento (inclusive executar o serviço de [corrections](packages/corrections))
- [ ] Criar uma [API GraphQL](https://docs.nestjs.com/graphql/quick-start) com o [contexto](#-contexto) acima utilizando Typescript
- [ ] Fazer a integração com o serviço de [corrections](packages/corrections) através do Apache Kafka
- [ ] Incluir no README as instruções de instalação do projeto

:information*source: \_Sinta-se livre para incluir quaisquer observações que achar necessário*

---

_O desafio acima foi cuidadosamente construído para propósitos de avaliação apenas. Já possuimos uma funcionalidade similar na nossa plataforma._

Made with 💜 at Rocketseat
