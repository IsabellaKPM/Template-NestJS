import { DataSource } from "typeorm";

export async function resetDatabase(dataSource: DataSource) {
  const query = `
    DO $$
    DECLARE
      r RECORD;
    BEGIN
      FOR r IN (
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
        AND tablename != 'migrations'
        AND tablename != 'tags'
      ) LOOP
        EXECUTE 'TRUNCATE TABLE "' || r.tablename || '" RESTART IDENTITY CASCADE';
      END LOOP;
    END $$;
  `;

  await dataSource.query(query);
}
