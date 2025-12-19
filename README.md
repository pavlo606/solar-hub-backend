# Solar Hub
Backend for Solar Hub

## Project setup
First install packages

```bash
npm install
```

You need to have running PostgreSQL Server. Create `.env` file and specify PostgreSQL connection url, for example:

```
DATABASE_URL="postgresql://username:password@localhost:5432/solarhub"
```

After that you need to apply migrations with this command
```bash
npx prisma migrate deploy
```

And generate types
```bash
npx prisma generate
```


## Compile and run the project
Just run this command

```bash
npm run start:dev
```

## 