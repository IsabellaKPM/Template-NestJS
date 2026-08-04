import { createTestApp, TestAppContext } from "../../harness/test-app";

describe("Database Connection (Integration)", () => {
  let ctx!: TestAppContext;

  beforeAll(async () => {
    ctx = await createTestApp();
  });

  afterAll(async () => {
    await ctx.cleanup();
  });

  it("should be connected to the database", () => {
    expect(ctx.dataSource.isInitialized).toBe(true);
  });

  it("should be able to query the database", async () => {
    interface QueryResult {
      sum: number;
    }

    const result = await ctx.dataSource.query<QueryResult[]>(
      "SELECT 1 + 1 AS sum",
    );

    expect(result[0].sum).toBe(2);
  });
});
