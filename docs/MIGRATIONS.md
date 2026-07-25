# Base de datos (migraciones)

Antes de ejecutar los comandos de migraciones, se debe [levantar el entorno de desarrollo en Docker](SETUP.md).

**IMPORTANTE:** En desarrollo, las migraciones se corren automáticamente al levantar los contenedores.

## Ejecutar migraciones

```bash
docker exec -it backend-api yarn db:migration:run
```

Aplica las migraciones a la base de datos.

---

## Generar migración

```bash
docker exec -it backend-api yarn db:migration:generate src/infrastructure/database/migrations/<nombre>
```

Genera una nueva migración basada en cambios en las entidades.

**IMPORTANTE:** `<nombre>` debe tener el formato `ExecutedActionMadeByMigration`, estar en inglés y mencionar la columna que se añade o lo que se modificó (por ejemplo: `AddUserProviderIdAndPostStatus`).

---

## Revertir migración

```bash
docker exec -it backend-api yarn db:migration:revert
```

Revierte la última migración aplicada.

---

## Correr migraciones en producción

```bash
yarn db:migration:run:prod
```

Sólo se usa en producción.

---

## Revisar base de datos

```bash
docker exec -it postgres_db psql -U <DB_USER> -d <DB_NAME>
```

Permite ingresar a la terminal de la base de datos dentro del contenedor. Reemplazar `<VARIABLE>` por el valor de la variable correspondiente en el `.env.development`.
