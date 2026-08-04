# Database (Migrations)

> 🚨 **VEEEERY IMPORTANT:** Remember to instantiate each **entity** you create inside the list at `src/infrastructure/database/config/entities.ts`. If you don't, you will spend a veeeeeery long time trying to figure out all the errors.

Before running migration commands, you must [set up the development environment with Docker](SETUP.md).

> **IMPORTANT:** In development and test, migrations run automatically when starting the containers.

## Table of Contents

- [Database (Migrations)](#database-migrations)
  - [Table of Contents](#table-of-contents)
  - [Run Migrations](#run-migrations)
  - [Generate Migration](#generate-migration)
  - [Revert Migration](#revert-migration)
  - [Run Migrations in Production](#run-migrations-in-production)
  - [Access Database CLI](#access-database-cli)

## Run Migrations

```bash
docker exec -it backend-api yarn db:migration:run
```

Applies pending migrations to the database.

---

## Generate Migration

```bash
docker exec -it backend-api yarn db:migration:generate src/infrastructure/database/migrations/<name>
```

Generates a new migration based on changes in the entities.

**IMPORTANT:** `<name>` must follow the `ExecutedActionMadeByMigration` format, be written in English, and mention the added column or modifications made (for example: `AddUserProviderIdAndPostStatus`).

---

## Revert Migration

```bash
docker exec -it backend-api yarn db:migration:revert
```

Reverts the last applied migration.

---

## Run Migrations in Production

```bash
yarn db:migration:run:prod
```

Only used in production.

---

## Access Database CLI

```bash
docker exec -it postgres_db psql -U <DB_USER> -d <DB_NAME>
```

Allows you to access the database CLI inside the container. Replace `<VARIABLE>` with the corresponding variable value from `.env.development`.
