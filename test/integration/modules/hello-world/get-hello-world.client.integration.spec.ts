import { createTestApp, TestAppContext } from "../../../harness/test-app";

describe("HelloWorldClientController (integration)", () => {
  let ctx!: TestAppContext;

  beforeAll(async () => {
    ctx = await createTestApp();
  });

  afterAll(async () => {
    await ctx.cleanup();
  });

  it("GET /api", async () => {
    const res = await ctx.request.get("/api").expect(200);
    expect(res.text).toBe("Hello, World!");
  });
});
