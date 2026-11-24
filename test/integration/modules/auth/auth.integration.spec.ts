import { Repository } from "typeorm";
import { createTestApp, TestAppContext } from "../../../harness/test-app";
import {
  createMockUser,
  MOCK_USER_PASSWORD,
} from "../../../factories/user.factory";
import { loginAndGetCookies } from "../../../utils/auth.util";
import { User } from "@modules/users/entities/user.entity";
import { UserRoles } from "@modules/users/enums/user-roles.enum";
import { UserStatus } from "@modules/users/enums/user-status.enum";

const validRegistration = {
  name: "Jane Doe",
  username: "janedoe",
  email: "jane@example.com",
  password: "StrongP@ssw0rd!",
};

describe("AuthClientController (integration)", () => {
  let ctx!: TestAppContext;
  let userRepo!: Repository<User>;

  beforeAll(async () => {
    ctx = await createTestApp();
    userRepo = ctx.dataSource.getRepository(User);
  });

  afterAll(async () => {
    await ctx.cleanup();
  });

  beforeEach(async () => {
    await userRepo.createQueryBuilder().delete().execute();
  });

  describe("POST /api/auth/register", () => {
    it("creates a regular user, sets cookies and hides the password", async () => {
      const res = await ctx.request
        .post("/api/auth/register")
        .send(validRegistration)
        .expect(201);

      expect(res.body).toMatchObject({
        name: "Jane Doe",
        username: "janedoe",
        email: "jane@example.com",
        role: UserRoles.USER,
        status: UserStatus.ACTIVE,
      });
      expect(res.body).not.toHaveProperty("encryptedPassword");
      expect(res.body).not.toHaveProperty("password");

      const cookies = (res.headers["set-cookie"] as unknown as string[]).join();
      expect(cookies).toContain("access_token=");
      expect(cookies).toContain("refresh_token=");

      const stored = await userRepo
        .createQueryBuilder("user")
        .addSelect("user.encryptedPassword")
        .where("user.email = :email", { email: "jane@example.com" })
        .getOneOrFail();
      expect(stored.encryptedPassword).not.toBe(validRegistration.password);
    });

    it("rejects attempts to choose a role", async () => {
      await ctx.request
        .post("/api/auth/register")
        .send({ ...validRegistration, role: UserRoles.ADMIN })
        .expect(400);

      expect(await userRepo.count()).toBe(0);
    });

    it("rejects invalid payloads", async () => {
      await ctx.request
        .post("/api/auth/register")
        .send({ ...validRegistration, email: "nope", password: "short" })
        .expect(400);
    });

    it("rejects duplicated email and username with 409", async () => {
      await ctx.request
        .post("/api/auth/register")
        .send(validRegistration)
        .expect(201);

      await ctx.request
        .post("/api/auth/register")
        .send({ ...validRegistration, username: "other" })
        .expect(409);
      await ctx.request
        .post("/api/auth/register")
        .send({ ...validRegistration, email: "other@example.com" })
        .expect(409);
    });
  });

  describe("POST /api/auth/login", () => {
    it("logs in by email without leaking the password hash", async () => {
      const user = await createMockUser(userRepo);

      const res = await ctx.request
        .post("/api/auth/login")
        .send({ email: user.email, password: MOCK_USER_PASSWORD })
        .expect(200);

      expect(res.body).toMatchObject({ id: user.id, email: user.email });
      expect(res.body).not.toHaveProperty("encryptedPassword");
      expect(
        (res.headers["set-cookie"] as unknown as string[]).join(),
      ).toContain("access_token=");
    });

    it("logs in by username and is case-insensitive on email", async () => {
      const user = await createMockUser(userRepo, {
        email: "mixed@example.com",
      });

      await ctx.request
        .post("/api/auth/login")
        .send({ username: user.username, password: MOCK_USER_PASSWORD })
        .expect(200);
      await ctx.request
        .post("/api/auth/login")
        .send({ email: "MIXED@Example.com", password: MOCK_USER_PASSWORD })
        .expect(200);
    });

    it("returns 401 for a wrong password, unknown user and inactive user", async () => {
      const user = await createMockUser(userRepo);
      const inactive = await createMockUser(userRepo, {
        status: UserStatus.INACTIVE,
      });

      await ctx.request
        .post("/api/auth/login")
        .send({ email: user.email, password: "wrong-password" })
        .expect(401);
      await ctx.request
        .post("/api/auth/login")
        .send({ email: "ghost@example.com", password: MOCK_USER_PASSWORD })
        .expect(401);
      await ctx.request
        .post("/api/auth/login")
        .send({ username: "ghost", password: MOCK_USER_PASSWORD })
        .expect(401);
      await ctx.request
        .post("/api/auth/login")
        .send({ email: inactive.email, password: MOCK_USER_PASSWORD })
        .expect(401);
    });

    it("returns 400 when no identifier is sent", async () => {
      await ctx.request
        .post("/api/auth/login")
        .send({ password: MOCK_USER_PASSWORD })
        .expect(400);
    });
  });

  describe("GET /api/auth/me, refresh and logout", () => {
    it("rejects anonymous requests", async () => {
      await ctx.request.get("/api/auth/me").expect(401);
      await ctx.request.post("/api/auth/refresh").expect(401);
      await ctx.request.post("/api/auth/logout").expect(401);
    });

    it("returns the current user, refreshes tokens and logs out", async () => {
      const user = await createMockUser(userRepo);
      const cookies = await loginAndGetCookies(ctx, {
        email: user.email,
        password: MOCK_USER_PASSWORD,
      });

      const me = await ctx.request
        .get("/api/auth/me")
        .set("Cookie", cookies)
        .expect(200);
      expect(me.body).toMatchObject({ id: user.id });
      expect(me.body).not.toHaveProperty("encryptedPassword");

      const refreshed = await ctx.request
        .post("/api/auth/refresh")
        .set("Cookie", cookies)
        .expect(200);
      expect(
        (refreshed.headers["set-cookie"] as unknown as string[]).join(),
      ).toContain("access_token=");

      const logout = await ctx.request
        .post("/api/auth/logout")
        .set("Cookie", cookies)
        .expect(200);
      expect(
        (logout.headers["set-cookie"] as unknown as string[]).join(),
      ).toContain("access_token=;");
    });

    it("returns 401 once the user of a valid token is deleted", async () => {
      const user = await createMockUser(userRepo);
      const cookies = await loginAndGetCookies(ctx, {
        email: user.email,
        password: MOCK_USER_PASSWORD,
      });
      await userRepo.delete({ id: user.id });

      await ctx.request.get("/api/auth/me").set("Cookie", cookies).expect(401);
      await ctx.request
        .post("/api/auth/refresh")
        .set("Cookie", cookies)
        .expect(401);
    });
  });
});
