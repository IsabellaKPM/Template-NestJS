# Git Version

Este proyecto usa un flujo de releases basado en **tags (`vX.X.X`)**.

## Cómo funciona

- El pipeline se ejecuta **sólo cuando se crea un tag** (`v*`).

- Antes de crear el release:

  - Instala dependencias.

  - Corre tests unitarios.

  - Corre tests integration.

- Si todo pasa se crea automáticamente un release.

## Flujo

### 1. Merge a `main`

Todo el código debe entrar vía PR y estar validado.

### 2. Actualizar versión

La versión sólo se actualza en `main`, en ninguna otra rama. Para hacerlo se debe hacer merge a una Pull Request y luego:

```bash
yarn version --patch   # --minor / --major
git push origin main --tags
```

#### Versionado

- `--patch`. Bugfix. `1.2.3 → 1.2.4`

- `--minor`. Nuevas features. `1.2.3 → 1.3.0`

- `--major`. Cambios muy importantes. `1.2.3 → 2.0.0`
