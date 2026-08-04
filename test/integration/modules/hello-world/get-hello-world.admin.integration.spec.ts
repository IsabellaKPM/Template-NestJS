import { createTestApp, TestAppContext } from "../../../harness/test-app";

describe("HelloWorldAdminController (integration)", () => {
  let ctx!: TestAppContext;

  beforeAll(async () => {
    ctx = await createTestApp();
  });

  afterAll(async () => {
    await ctx.cleanup();
  });

  it("GET /admin", async () => {
    const res = await ctx.request.get("/admin").expect(200);
    expect(res.text).toBe("Hello, Admin!");
  });
});
