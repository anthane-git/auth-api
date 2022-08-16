# Customer identity access management service.

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
