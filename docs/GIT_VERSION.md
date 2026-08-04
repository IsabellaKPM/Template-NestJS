# Git Versioning

This project uses a release workflow based on **tags (`vX.X.X`)**.

## Table of Contents

- [Git Versioning](#git-versioning)
  - [Table of Contents](#table-of-contents)
  - [How It Works](#how-it-works)
  - [Workflow](#workflow)
    - [1. Merge to `main`](#1-merge-to-main)
    - [2. Update Version](#2-update-version)
      - [Versioning](#versioning)

## How It Works

- The pipeline runs **only when a tag is created** (`v*`).

- Before creating the release, it runs the `.github/workflows/test.yml`.

- If everything passes, a release is automatically created.

## Workflow

### 1. Merge to `main`

All code must be merged via PR and fully validated.

### 2. Update Version

The version is only updated on `main`, never on any other branch. To do this, merge a Pull Request first, and then run:

```bash
yarn version --patch   # --minor / --major
git push origin main --tags
```

#### Versioning

- `--patch`. Bugfix. `1.2.3 → 1.2.4`

- `--minor`. New features. `1.2.3 → 1.3.0`

- `--major`. Major changes and updates. `1.2.3 → 2.0.0`
