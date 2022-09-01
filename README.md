# Identity Provider Service API

[![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Typescript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![JWT/JSON Web Token](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)](https://swagger.io/)

This project is bootstraped with NestJS a progressive Node.js framework for building efficient, reliable and scalable server-side applications.

## Running the app

```bash
    # development
    $ npm run start

    # watch mode
    $ npm run start:dev

    # production mode
    $ npm run start:prod
```

## Running database migrations (development only)

```bash
npx prisma migrate dev --name add ADD_COMMENT_HERE
npm run db:migrate
```

## Database Admin Tool (prisma studio)

```
npm run db:show
```

## Generate Secrets

```bash
openssl genrsa -out access.tkn.private.pem 4096
openssl rsa -in access.tkn.private.pem -pubout -out access.tkn.public.pem

openssl genrsa -out refresh.tkn.private.pem 4096
openssl rsa -in refresh.tkn.private.pem -pubout -out refresh.tkn.public.pem
```
