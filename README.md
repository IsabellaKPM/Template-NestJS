# Template NestJS

| Title                                          | Description                                |
|------------------------------------------------|--------------------------------------------|
| [Setup](docs/SETUP.md)                         | How to run the API?                        |
| [API Documentation](docs/API_DOCUMENTATION.md) | API documentation and endpoints            |
| [Testing](docs/TESTING.md)                     | How to run the test and coverage?          |
| [Migrations](docs/MIGRATIONS.md)               | How to run the migrations?                 |
| [Seeds](docs/SEEDS.md)                         | How to run the seeds?                      |
| [Git Version](docs/GIT_VERSION.md)             | How does the versioning and releases work? |

## Table of Contents

- [Template NestJS](#template-nestjs)
  - [Table of Contents](#table-of-contents)
  - [ENV](#env)
  - [About this Template](#about-this-template)
    - [Tech Stack \& Libraries](#tech-stack--libraries)
      - [Core \& Framework](#core--framework)
      - [Database, ORM \& Validation](#database-orm--validation)
      - [Authentication \& API Documentation](#authentication--api-documentation)
      - [Testing \& Code Quality](#testing--code-quality)
    - [Architecture \& Key Design Decisions](#architecture--key-design-decisions)
      - [Integration Testing with Real Databases (Testcontainers)](#integration-testing-with-real-databases-testcontainers)
      - [Automated Seed \& Migration Pipeline](#automated-seed--migration-pipeline)
      - [Strict Commit \& Code Quality Workflow](#strict-commit--code-quality-workflow)
    - [CI/CD \& Automation](#cicd--automation)
      - [Workflows](#workflows)
      - [Dependency Management (Dependabot)](#dependency-management-dependabot)
    - [Detailed Guides \& Scripts](#detailed-guides--scripts)
  - [Directory Structure](#directory-structure)
  - [License](#license)

## ENV

**IMPORTANT:** Two `.env` files must be created at the repository root—named `.env.development` and `.env.test`—with `NODE_ENV=development` and `NODE_ENV=test` respectively. The `.gitignore` file already ignores them by default. While all empty variables in `.env.development` must be filled in, those in `.env.test` can be left as-is, since they are automatically populated when `Testcontainers` starts up.

```.env
NODE_ENV=development # or test
PORT=3001

DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
DB_URL=

CORS_ORIGINS=http://localhost:3000,http://localhost:3001

JWT_ACCESS_SECRET=xx  # Secret for generating access tokens
JWT_REFRESH_SECRET=xx # Secret for generating refresh tokens
```

## About this Template

### Tech Stack & Libraries

This template is built using Yarn v4 (Berry) as the package manager and leverages a modern, production-ready NestJS architecture designed for maintainability, strict typing, and high test coverage.

#### Core & Framework

- NestJS 11: Progressive `Node.js` framework for building efficient and scalable server-side applications.

- Node.js 24+ & TypeScript 6: Latest runtime environment paired with strict TypeScript configurations.

#### Database, ORM & Validation

- TypeORM & PostgreSQL: Powerful Object-Relational Mapping (ORM) for schema migrations, seed execution, and type-safe database queries.

- Class Validator & Class Transformer: Declarative DTO validation and object transformation.

- Joi: Robust schema validation for environment variables at boot time.

#### Authentication & API Documentation

- Passport.js & JWT: Strategy-based authentication setup using `@nestjs/jwt` and `passport-jwt` with access/refresh token support.

- Swagger UI: Auto-generated interactive REST API documentation (`@nestjs/swagger`).

#### Testing & Code Quality

- Jest & SuperTest: Framework for running unit and integration tests.

- Testcontainers: Spawns real, isolated PostgreSQL Docker containers for integration testing without external DB dependencies.

- NYC: Code coverage utility used to merge unit and integration test reports.

---

### Architecture & Key Design Decisions

Layered & Modular Architecture (`src/`)

The codebase follows a clean, modular structure that separates cross-cutting concerns from business modules:

- `src/core/`: Application-wide constants, shared DTOs, and global helpers.

- `src/infrastructure/`: Technical plumbing including database config, TypeORM migrations, seed runners, and validation modules.

- `src/modules/`: Domain-specific business logic divided into isolated NestJS modules (`health/`, `admin/`, `api/`, `hello-world`). The `hello-world` module shows an example on how the code is expected to be organized.

#### Integration Testing with Real Databases (Testcontainers)

Instead of mocking database queries or relying on brittle in-memory databases, integration tests (`test/`) use Testcontainers (`@testcontainers/postgresql`). This automatically spins up a real PostgreSQL container during testing (`test/harness/`), providing 100% realistic database assertions during local development and CI runs.

#### Automated Seed & Migration Pipeline

Database schemas and initial data are fully versioned and managed programmatically. Includes custom TypeScript scripts (`yarn db:migration:run`, `yarn db:seed:run`) to handle migrations and seed data across local development, testing, and production environments.

#### Strict Commit & Code Quality Workflow

- Husky + `lint-staged`: Automatically formats (Prettier) and lints (ESLint) staged files prior to committing.

- Commitizen + Commitlint: Enforces Conventional Commits standard via yarn commit.

---

### CI/CD & Automation

This project includes pre-configured GitHub Actions workflows and Dependabot rules to automate testing, releases, and dependency management.

#### Workflows

1. Automated Testing (`.github/workflows/test.yml`)

- **Triggers:** Pushes and Pull Requests targeting the `main`, `dev`, `feature/*`, `fix/*`, `bugfix/*`, `chore/*`, `refactor/*` and `test/*` branches.

- **Functionality:**

  - Installs dependencies using Yarn `immutable`.

  - Runs static analysis and type checks (`yarn ci:check`).

  - Executes unit and integration tests (`yarn test:unit` and `yarn test:integration:ci`) using Testcontainers.

1. Automated Release (`.github/workflows/release.yml`)

- **Triggers:** Tag pushes matching the v* pattern (e.g., v1.0.0).

- **Functionality:**

  - Invokes `.github/workflows/test.yml` to guarantee all lint checks and tests pass before release.

  - Extracts version tag and automatically creates an official GitHub Release with auto-generated release notes.

#### Dependency Management (Dependabot)

The repository uses `.github/dependabot.yml` for automated maintenance:

- npm Ecosystem: Scans weekly for outdated or vulnerable packages, capped at a maximum of 5 concurrent Pull Requests with dependencies and security labels.

- GitHub Actions: Scans monthly to keep workflow actions up to date.

---

### Detailed Guides & Scripts

For detailed step-by-step documentation on setting up the environment, running tests, generating database migrations, or running seeds, please refer to the dedicated guides in the `docs/` directory.

## Directory Structure

```text
.
├── .github
│   ├── FUNDING.yml
│   ├── dependabot.yml
│   └── workflows
│       ├── release.yml
│       └── test.yml
├── .infra
│   └── docker
│       ├── Dockerfile
│       └── docker-compose.dev.yml
├── docs
│   ├── API_DOCUMENTATION.md
│   ├── GIT_VERSION.md
│   ├── MIGRATIONS.md
│   ├── SEEDS.md
│   ├── SETUP.md
│   └── TESTING.md
├── src
│   ├── main.ts
│   ├── core
│   │   ├── constants
│   │   │   ├── api.constant.ts
│   │   │   ├── index.ts
│   │   │   └── swagger.constant.ts
│   │   └── dtos
│   │       └── message-response.dto.ts
│   ├── infrastructure
│   │   ├── database
│   │   │   ├── config
│   │   │   │   ├── data-source.cli.ts
│   │   │   │   ├── data-source.ts
│   │   │   │   └── entities.ts
│   │   │   ├── database.module.ts
│   │   │   ├── migrations
│   │   │   │   └── .gitkeep
│   │   │   └── seeds
│   │   │       ├── interfaces
│   │   │       │   └── seed.interface.ts
│   │   │       ├── runners
│   │   │       │   ├── run-seeds.ts
│   │   │       │   └── seed-runner.ts
│   │   │       └── seeds
│   │   │           └── .gitkeep
│   │   └── validation
│   │       └── validation.module.ts
│   └── modules
│       ├── admin
│       │   └── admin.module.ts
│       ├── api
│       │   └── api.module.ts
│       ├── app.module.ts
│       ├── health
│       │   ├── controllers
│       │   │   └── health.controller.ts
│       │   ├── decorators
│       │   │   └── health.docs.ts
│       │   ├── dtos
│       │   │   └── health.dto.ts
│       │   └── health.module.ts
│       └── hello-world
│           ├── controllers
│           │   ├── hello-word.admin.controller.ts
│           │   └── hello-world.client.controller.ts
│           ├── decorators
│           │   ├── hello-world.admin.docs.ts
│           │   └── hello-world.client.docs.ts
│           ├── hello-world.module.ts
│           └── services
│               └── hello-world.service.ts
├── test
│   ├── factories
│   │   └── .gitkeep
│   ├── fixtures
│   │   └── .gitkeep
│   ├── harness
│   │   ├── test-app.ts
│   │   └── with-app.ts
│   ├── integration
│   │   ├── infrastructure
│   │   │   └── db-connection.integration.spec.ts
│   │   └── modules
│   │       ├── health
│   │       │   └── health.integration.spec.ts
│   │       └── hello-world
│   │           ├── get-hello-world.admin.integration.spec.ts
│   │           └── get-hello-world.client.integration.spec.ts
│   ├── jest.integration.json
│   ├── mocks
│   │   └── .gitkeep
│   ├── setup
│   │   ├── setup.ts
│   │   └── teardown.ts
│   ├── types
│   │   └── global.d.ts
│   └── utils
│       ├── close-app.util.ts
│       ├── database.util.ts
│       ├── db-reset.util.ts
│       └── test-container.util.ts
├── .gitignore
├── .prettierignore
├── .prettierrc
├── .yarnrc.yml
├── LICENSE
├── README.md
├── commitlint.config.ts
├── eslint.config.mjs
├── nest-cli.json
├── package.json
├── render.yaml
├── tsconfig.build.json
├── tsconfig.json
└── yarn.lock

45 directories, 72 files
```

## License

This project is licensed under the [MIT License](LICENSE).
