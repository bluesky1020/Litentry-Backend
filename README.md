## Litentry Backend

Built with [Nest](https://github.com/nestjs/nest) framework.<br/>
Deployed url: [https://litentry-backend.herokuapp.com](https://litentry-backend.herokuapp.com)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Reference

#### Sign in

```http
  POST /api/v1/signin
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `address` | `string` | address of polkadot wallet |
| `message` | `string` | signed message |
| `signature` | `string` | signature |

#### Check session

```http
  POST /api/v1/checkSession
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `address`      | `string` | address of polkadot wallet |
| `hash`      | `string` | encrypted hash of address |

#### Get secret code

```http
  GET /api/v1/secret/${address}
```

Header `Authorization: ${hash}`

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `address`      | `string` | address of polkadot wallet |
| `hash`      | `string` | encrypted hash of address |

