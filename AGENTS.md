# AGENTS.md

## Overview

NestJS 11 REST API template (TypeScript, TypeORM + PostgreSQL, JWT auth via Passport, Swagger). Package manager: **Yarn 4**. Node >= 24.

## Commands

```bash
yarn install
yarn start:dev                  # dev server with watch
yarn build && yarn start:prod   # production build and run

yarn lint                       # eslint (lint:fix to autofix)
yarn format                     # prettier (format:check to verify)
yarn typecheck                  # tsc --noEmit
yarn ci:check                   # lint + typecheck
yarn ci                         # ci:check + unit + integration (what CI runs)

yarn test:unit                  # jest, src/**/*.spec.ts
yarn test:integration           # jest + Testcontainers (needs Docker)

yarn db:migration:generate -- src/infrastructure/database/migrations/<Name>
yarn db:migration:run
yarn db:migration:revert
yarn db:seed:run

yarn infra:up / infra:down      # local docker compose (.infra/docker)
yarn commit                     # interactive Conventional Commit (commitizen)
```

## Project structure

```text
src/
  core/             # shared constants and DTOs
  infrastructure/   # config (env validation), database (data-source, migrations, seeds)
  modules/          # feature modules: auth, users, health, hello-world, admin, api
  main.ts
test/
  integration/      # *.integration.spec.ts, mirrors src/modules
  factories/ harness/ setup/ utils/ mocks/ fixtures/
docs/               # SETUP, TESTING, MIGRATIONS, SEEDS, API_DOCUMENTATION, GIT_VERSION
.infra/docker/      # Dockerfile, docker-compose.dev.yml
```

Each module groups its files by role: `controllers/ services/ dtos/ entities/ decorators/ guards/ exceptions/ enums/ interfaces/`, plus `<name>.module.ts`.

## Code style and conventions

- Formatting is enforced by Prettier (double quotes, semicolons, trailing commas, width 80) and ESLint. Don't hand-format; run `yarn format` and `yarn lint:fix`.
- Use the path aliases: `@core/*`, `@infrastructure/*`, `@modules/*`, `@constants/*`. Avoid deep relative imports across top-level folders.
- Validate all input with DTOs (`class-validator` / `class-transformer`) and document endpoints with `@nestjs/swagger` decorators.
- Environment variables are validated with Joi in `src/infrastructure/config`. Add any new variable there and to the README ENV section.
- Domain errors go in the module's `exceptions/` folder, not as raw `HttpException` in services.
- Never edit an existing migration that has been merged; generate a new one.

## Testing

- Unit tests: `*.spec.ts` next to the source file (jest, `rootDir: src`).
- Integration tests: `test/integration/**`, run against a real PostgreSQL via Testcontainers. Use the helpers in `test/harness` and `test/utils`; don't mock the database.
- New endpoints and services need tests. Run `yarn ci` before opening a PR.

<!-- shared:start -->
## Comments

- Don't write comments by default. Make the code self-explanatory through clear names and structure; never narrate what the code does.
- Comment only when strictly necessary, and always start with one of these prefixes:
  - `WARNING:` a non-obvious pitfall or constraint that would cause a bug if ignored (the most important kind).
  - `TODO:` known pending work.
  - `WIP:` unfinished code that must not be treated as final.
  - `REVIEW:` something that needs a human decision or double-check.
- A comment without one of these prefixes is not allowed. Don't add docstrings or JSDoc/rustdoc just to describe obvious behavior.
- Don't remove existing `WARNING`, `TODO`, `WIP`, or `REVIEW` comments unless you resolved what they describe.

## Git and workflow

- Commits follow Conventional Commits (enforced by commitlint): `type(scope): imperative subject`, lowercase type, no trailing period, header <= 100 chars. Types: `build chore ci docs feat fix perf refactor revert style test`.
- Husky runs commitlint on `commit-msg` and lint-staged on `pre-commit`. Never bypass hooks (`--no-verify`).
- Work on a feature branch and merge through a PR to `main`. Releases are tags `vX.X.X` created on `main` only (see `docs/GIT_VERSION.md`).
- Keep PRs focused; update docs/README when behavior, scripts, or env variables change.

## Boundaries

### Always

- Run the project's check command (`ci:check`, or `ci` when tests are relevant) before declaring work done.
- Follow existing patterns in neighbouring code before introducing new ones.
- Keep TypeScript strict: no `any`, no `@ts-ignore` without a comment explaining why.

### Ask first

- Adding, removing, or upgrading dependencies.
- Changing CI workflows, Docker setup, lint/format/commit configs, or the folder structure.
- Destructive or hard-to-reverse operations (deleting files, resetting databases, force-pushing, rewriting history).

### Never

- Commit secrets or `.env*` files; never print their values.
- Edit generated or vendored output (`dist/`, `node_modules/`, lockfiles by hand).
- Disable lint rules, skip or delete tests to make a check pass.

<!-- shared:end -->

## Template-specific notes

- Three env files are required at the root: `.env.development`, `.env.production`, `.env.test` (gitignored). Development builds the DB URL from `DB_*` variables; production expects `DB_URL`.
- Jest has two configs: unit (in `package.json`) and integration (`test/jest.integration.json`, run in band). Docker must be running for integration tests.
- Migrations and seeds have separate dev (`ts-node`) and prod (`dist/`) scripts; use the `:prod` variants only against the built output.
