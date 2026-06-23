# Testing

## Ejecutar tests

### Unit tests

```bash
yarn test:unit
```

Ejecuta los tests unitarios del proyecto.

---

## Integration

### Ejecutar tests de integración

```bash
yarn test:integration
```

Levanta una base de datos temporal con Testcontainers, ejecuta migraciones y corre los tests de integración.

---

### Reusar contenedor (más rápido)

```bash
yarn test:integration:reuse
```

Reutiliza el contenedor entre ejecuciones para reducir el tiempo de inicio.

---

### Modo watch en Reuse

```bash
yarn test:integration:watch
```

Ejecuta los tests de integración automáticamente al modificar archivos.

---

### Debug

```bash
yarn test:integration:debug
```

Ejecuta los tests secuencialmente y muestra logs detallados para depuración.

---

### CI

```bash
yarn test:integration:ci
```

Modo estable para pipelines: ejecución secuencial sin paralelismo.

---

## Notas

* Los tests de integración usan PostgreSQL real vía Testcontainers
* No requieren base de datos local
* Las migraciones se ejecutan automáticamente
* La base de datos se reinicia entre tests
