import type { TestAppContext } from "../harness/test-app";

export async function loginAndGetCookies(
  ctx: TestAppContext,
  credentials: { email?: string; username?: string; password: string },
): Promise<string[]> {
  const res = await ctx.request
    .post("/api/auth/login")
    .send(credentials)
    .expect(200);

  return res.headers["set-cookie"] as unknown as string[];
}
