# Testing

> **IMPORTANT:** Files with integration tests must be under the `test/integration` folder and be named `*.integration.spec.ts` for them to be effectively executed.

## Table of Contents

- [Testing](#testing)
  - [Table of Contents](#table-of-contents)
  - [Factories](#factories)
  - [Unit Testing](#unit-testing)
    - [Run Unit Tests](#run-unit-tests)
    - [Unit Test Coverage](#unit-test-coverage)
  - [Integration Testing](#integration-testing)
    - [Run Integration Tests](#run-integration-tests)
    - [Reuse Container (Faster)](#reuse-container-faster)
    - [Watch Mode with Reuse](#watch-mode-with-reuse)
    - [Debug Mode](#debug-mode)
    - [CI Mode](#ci-mode)
    - [Integration Test Coverage](#integration-test-coverage)
  - [Code Coverage](#code-coverage)
    - [Clean Coverage Directories](#clean-coverage-directories)
    - [Merge Coverage Reports](#merge-coverage-reports)
    - [Run All Tests and Generate Combined Coverage](#run-all-tests-and-generate-combined-coverage)
  - [Notes](#notes)

## Factories

As a good practice, you can use the following code as a template to create factories under `test/factories` that will help you keep your tests clean and improve maintainability. They support the overriding of parameters and are collision-resistant.

```typescript
import { Repository } from "typeorm";
import { randomUUID } from "crypto";
import { Tag } from "@modules/tags/entities/Tag.entity";

type CreateMockTagParams = Partial<Tag>;

export async function createMockTag(
  tagRepo: Repository<Tag>,
  overrides: CreateMockTagParams = {},
): Promise<Tag> {
  const uniqueSuffix = randomUUID().substring(0, 8);

  const tag = tagRepo.create({
    title: `Tag-${uniqueSuffix}`,
    category: "OTHER",
    ...overrides,
  });

  return await tagRepo.save(tag);
}
```

This factory is made to create mock tags for a `Tags` entity with `title` and `category` columns.

## Unit Testing

### Run Unit Tests

```bash
yarn test:unit
```

Runs the project's unit tests using Jest.

---

### Unit Test Coverage

```bash
yarn test:unit:cov
```

Runs unit tests and generates a coverage report stored in `coverage/unit`.

---

## Integration Testing

### Run Integration Tests

```bash
yarn test:integration
```

Spins up a temporary PostgreSQL database using Testcontainers, executes database migrations, and runs integration tests.

---

### Reuse Container (Faster)

```bash
yarn test:integration:reuse
```

Reuses the existing database container across test runs to significantly reduce startup time.

---

### Watch Mode with Reuse

```bash
yarn test:integration:watch
```

Automatically re-runs integration tests when source files are modified.

---

### Debug Mode

```bash
yarn test:integration:debug
```

Runs integration tests sequentially with verbose logging and open handle detection for debugging.

---

### CI Mode

```bash
yarn test:integration:ci
```

Stable execution mode designed for CI/CD pipelines (runs sequentially without parallelism in CI mode).

---

### Integration Test Coverage

```bash
yarn test:integration:cov
```

Runs integration tests and generates a coverage report stored in `coverage/integration`.

---

## Code Coverage

### Clean Coverage Directories

```bash
yarn coverage:clean
```

Removes previous coverage artifacts and temporal outputs (`.nyc_output` and `coverage/` directories).

---

### Merge Coverage Reports

```bash
yarn coverage:merge
```

Combines individual coverage reports (`coverage/unit` and `coverage/integration`) into a unified report generated with `nyc` in `coverage/merged`.

---

### Run All Tests and Generate Combined Coverage

```bash
yarn coverage:test:all
```

Executes the complete test coverage workflow: cleans previous reports, executes unit tests with coverage, executes integration tests with coverage, and merges both reports into a final comprehensive report (`coverage/merged`).

## Notes

- Integration tests run against a real PostgreSQL database instance managed via **Testcontainers**.

- No local PostgreSQL installation or configuration is required.

- Database migrations are executed automatically before test execution.

- The database state is reset between tests to guarantee isolation.
