# Setup

## Requisitos

Antes de usar la API, asegúrate de tener Docker corriendo:

```bash
sudo service docker start
```

---

## Levantar la API

```bash
yarn infra:up
```

Levanta la base de datos (PostgreSQL) y el backend en modo desarrollo.

---

## Detener la API

```bash
yarn infra:down
```

Detiene los contenedores.

Se recomienda ejecutarlo siempre al terminar de trabajar.

---

## Resetear entorno

```bash
yarn infra:reset
```

* Detiene contenedores.
* Elimina volúmenes.
* Limpia completamente la base de datos.

---

## Ver logs

```bash
yarn infra:logs
```

Muestra los logs de los contenedores en tiempo real.

## Notas

* Las variables de entorno se cargan desde `.env.development`.
* La base de datos corre en Docker.
* Si hay errores al levantar, usar `yarn infra:reset`.
