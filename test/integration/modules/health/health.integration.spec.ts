import { createTestApp, TestAppContext } from "../../../harness/test-app";
import { HealthDto } from "@modules/health/dtos/health.dto";

describe("HealthController (integration)", () => {
  let ctx!: TestAppContext;

  beforeAll(async () => {
    ctx = await createTestApp();
  });

  afterAll(async () => {
    await ctx.cleanup();
  });

  it("/health (GET)", async () => {
    const res = await ctx.request.get("/health").expect(200);

    const body = res.body as HealthDto;

    expect(body.status).toBe("ok");
    expect(body.timestamp).toBeDefined();
    expect(Date.parse(body.timestamp)).not.toBeNaN();
  });
});
