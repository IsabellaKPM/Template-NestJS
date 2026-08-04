# Seeds

This template includes all the necessary files to implement seeds in an easy way.

## Table of Contents

- [Seeds](#seeds)
  - [Table of Contents](#table-of-contents)
  - [Run Seeds](#run-seeds)
  - [Add Seeds](#add-seeds)

## Run Seeds

To run the seeds, start the environment with Docker and run the following command:

```bash
docker exec -it backend-api yarn db:seed:run
```

> **IMPORTANT:** The test and development environments run the seeds automatically, there's no need to run them manually.

## Add Seeds

> **IMPORTANT:** To add seeds to the project, you must first uncomment the files under the `src/infrastructure/database/seeds/runners` folder if you haven't already. These files were commented out because when there are no seeds, they throw warnings.

1. Create a file for each table you want to seed under the `src/infrastructure/database/seeds/seeds` folder. For example, for a `Tags` entity with `title` and `category` columns:

    ```typescript
    // src/infrastructure/database/seeds/seeds/tags.seed.ts
    import type { DataSource } from "typeorm";
    import type { Seed } from "../interfaces/seed.interface";
    import { Tag } from "@modules/tags/entities/Tag.entity";

    export class TagsSeed implements Seed {
      async run(dataSource: DataSource): Promise<void> {
        const repo = dataSource.getRepository(Tag);

        await repo
          .createQueryBuilder()
          .insert()
          .values([
            { title: "Negro", category: "COLOR" },
            { title: "Blanco", category: "COLOR" },
            { title: "Primavera", category: "SEASON" },
            { title: "Verano", category: "SEASON" },
            { title: "Otoño", category: "SEASON" },
            { title: "Invierno", category: "SEASON" },
            { title: "Casual", category: "STYLE" },
            { title: "Formal", category: "STYLE" },
            { title: "Vintage", category: "STYLE" },
          ])
          .orIgnore()
          .execute();
      }
    }
    ```

1. Add instances of each created seed to the `seeds` list in `src/infrastructure/database/seeds/runners/run-seeds.ts` (in our example, it should look like: `const seeds = [new TagsSeed()];`)

1. Finally, the seeds will be working properly.
