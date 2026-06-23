# Seeds

## Correr Seeds

Para correr las seeds se debe levantar el entorno de desarrollo local en Docker y correr el siguinete comando:

```bash
docker exec -it backend-api yarn db:seed:run
```

**IMPORTANTE:** Los tests y el entorno de Docker local corren las seeds automáticamente, no es necesario correrlas de forma manual.
