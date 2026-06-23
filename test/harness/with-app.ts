import { createTestApp, TestAppContext } from "./test-app";

export function withTestApp(suite: (ctx: TestAppContext) => void) {
  let ctx!: TestAppContext;

  beforeEach(async () => {
    ctx = await createTestApp();
  });

  afterEach(async () => {
    await ctx.cleanup();
  });

  suite(ctx);
}
