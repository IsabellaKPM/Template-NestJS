# Setup & Environment Guide

## Table of Contents

- [Setup \& Environment Guide](#setup--environment-guide)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Infrastructure Management (Docker)](#infrastructure-management-docker)
    - [Start Infrastructure](#start-infrastructure)
    - [Stop Infrastructure](#stop-infrastructure)
    - [Reset Environment](#reset-environment)
    - [View Logs](#view-logs)
    - [Clean Docker Resources](#clean-docker-resources)
  - [Running the Application](#running-the-application)
    - [Development Mode](#development-mode)
    - [Debug Mode](#debug-mode)
    - [Build Project](#build-project)
    - [Production Mode](#production-mode)
  - [Code Quality \& Diagnostics](#code-quality--diagnostics)
    - [Run CI Quality Checks](#run-ci-quality-checks)
    - [Format Code](#format-code)
    - [Lint Code](#lint-code)
    - [Type Checking](#type-checking)
  - [Notes](#notes)

---

## Prerequisites

Before starting the API, make sure Docker service is running on your system:

```bash
sudo service docker start
```

> **IMPORTANT:** A `.env.development` file must exist in the project root to run the application in development mode; otherwise, execution will fail.

---

## Infrastructure Management (Docker)

### Start Infrastructure

```bash
yarn infra:up
```

Spins up the PostgreSQL database container and the backend infrastructure in development mode using Docker Compose.

---

### Stop Infrastructure

```bash
yarn infra:down
```

Stops and removes active infrastructure containers.

> **Recommendation:** Always run this command when finishing your work session.

---

### Reset Environment

```bash
yarn infra:reset
```

- Stops active containers.

- Removes associated Docker volumes.

- Completely resets and clears the PostgreSQL database.

---

### View Logs

```bash
yarn infra:logs
```

Streams real-time container logs for debugging and monitoring.

---

### Clean Docker Resources

```bash
yarn infra:prune
```

Prunes unused Docker images, containers, networks, and volumes across the system.

---

## Running the Application

### Development Mode

```bash
yarn start:dev
```

Starts the NestJS application in watch mode (hot reload enabled).

---

### Debug Mode

```bash
yarn start:debug
```

Starts the NestJS application with active debugging capabilities and file watcher.

---

### Build Project

```bash
yarn build
```

Compiles the NestJS TypeScript source code into production-ready JavaScript artifacts inside the `dist/` directory.

---

### Production Mode

```bash
yarn start:prod
```

Executes the compiled production build (`dist/main.js`).

---

## Code Quality & Diagnostics

### Run CI Quality Checks

```bash
yarn ci:check
```

Runs both ESLint and TypeScript type checking (`yarn lint && yarn typecheck`).

---

### Format Code

```bash
yarn format
```

Formats source files in `src/` and `test/` using Prettier.

---

### Lint Code

```bash
yarn lint:fix
```

Lints the codebase and automatically fixes auto-fixable ESLint issues.

---

### Type Checking

```bash
yarn typecheck
```

Runs the TypeScript compiler (`tsc --noEmit`) to perform type validation without emitting output files.

## Notes

- Environment variables in development mode are loaded directly from `.env.development`.

- The PostgreSQL database runs inside a Docker container managed by Docker Compose.

- If you encounter configuration or database state errors during setup, run `yarn infra:reset`.
