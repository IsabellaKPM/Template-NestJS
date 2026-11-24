import { randomUUID } from "crypto";
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

describe("UserAdminController (integration)", () => {
  let ctx!: TestAppContext;
  let userRepo!: Repository<User>;
  let admin!: User;
  let adminCookies!: string[];
  let regularUser!: User;
  let userCookies!: string[];

  beforeAll(async () => {
    ctx = await createTestApp();
    userRepo = ctx.dataSource.getRepository(User);
  });

  afterAll(async () => {
    await ctx.cleanup();
  });

  beforeEach(async () => {
    await userRepo.createQueryBuilder().delete().execute();
    admin = await createMockUser(userRepo, { role: UserRoles.ADMIN });
    regularUser = await createMockUser(userRepo);
    adminCookies = await loginAndGetCookies(ctx, {
      email: admin.email,
      password: MOCK_USER_PASSWORD,
    });
    userCookies = await loginAndGetCookies(ctx, {
      email: regularUser.email,
      password: MOCK_USER_PASSWORD,
    });
  });

  describe("access control", () => {
    const endpoints = [
      ["GET", "/admin/users"],
      ["GET", `/admin/users/${randomUUID()}`],
      ["POST", "/admin/users"],
      ["PATCH", `/admin/users/${randomUUID()}`],
      ["DELETE", `/admin/users/${randomUUID()}`],
    ] as const;

    const call = (method: string, url: string) => {
      const http = ctx.request;
      switch (method) {
        case "GET":
          return http.get(url);
        case "POST":
          return http.post(url);
        case "PATCH":
          return http.patch(url);
        default:
          return http.delete(url);
      }
    };

    it.each(endpoints)(
      "%s %s returns 401 when anonymous",
      async (method, url) => {
        await call(method, url).expect(401);
      },
    );

    it.each(endpoints)(
      "%s %s returns 403 for a non-admin user",
      async (method, url) => {
        await call(method, url).set("Cookie", userCookies).expect(403);
      },
    );
  });

  describe("GET /admin/users", () => {
    it("lists users without password fields", async () => {
      const res = await ctx.request
        .get("/admin/users")
        .set("Cookie", adminCookies)
        .expect(200);

      const body = res.body as Array<Record<string, unknown>>;
      expect(body).toHaveLength(2);
      body.forEach((user) =>
        expect(user).not.toHaveProperty("encryptedPassword"),
      );
    });
  });

  describe("GET /admin/users/:id", () => {
    it("returns a user, 404 when missing and 400 on a malformed id", async () => {
      await ctx.request
        .get(`/admin/users/${regularUser.id}`)
        .set("Cookie", adminCookies)
        .expect(200);
      await ctx.request
        .get(`/admin/users/${randomUUID()}`)
        .set("Cookie", adminCookies)
        .expect(404);
      await ctx.request
        .get("/admin/users/not-a-uuid")
        .set("Cookie", adminCookies)
        .expect(400);
    });
  });

  describe("POST /admin/users", () => {
    it("creates a user with the chosen role and lets them log in", async () => {
      const res = await ctx.request
        .post("/admin/users")
        .set("Cookie", adminCookies)
        .send({
          name: "New Admin",
          username: "newadmin",
          email: "NewAdmin@Example.com",
          password: "StrongP@ssw0rd!",
          role: UserRoles.ADMIN,
        })
        .expect(201);

      expect(res.body).toMatchObject({
        email: "newadmin@example.com",
        role: UserRoles.ADMIN,
        status: UserStatus.ACTIVE,
      });
      expect(res.body).not.toHaveProperty("encryptedPassword");

      await loginAndGetCookies(ctx, {
        username: "newadmin",
        password: "StrongP@ssw0rd!",
      });
    });

    it("returns 409 for a duplicated email", async () => {
      await ctx.request
        .post("/admin/users")
        .set("Cookie", adminCookies)
        .send({
          name: "Dup",
          username: "dup",
          email: regularUser.email,
          password: "StrongP@ssw0rd!",
        })
        .expect(409);
    });
  });

  describe("PATCH /admin/users/:id", () => {
    it("updates fields and changes the password", async () => {
      const res = await ctx.request
        .patch(`/admin/users/${regularUser.id}`)
        .set("Cookie", adminCookies)
        .send({
          name: "Renamed",
          status: UserStatus.SUSPENDED,
          password: "BrandNewP@ss1",
        })
        .expect(200);

      expect(res.body).toMatchObject({
        name: "Renamed",
        status: UserStatus.SUSPENDED,
      });

      await ctx.request
        .patch(`/admin/users/${regularUser.id}`)
        .set("Cookie", adminCookies)
        .send({ status: UserStatus.ACTIVE })
        .expect(200);

      await ctx.request
        .post("/api/auth/login")
        .send({ email: regularUser.email, password: MOCK_USER_PASSWORD })
        .expect(401);
      await ctx.request
        .post("/api/auth/login")
        .send({ email: regularUser.email, password: "BrandNewP@ss1" })
        .expect(200);
    });

    it("keeps the password untouched when it is not sent", async () => {
      await ctx.request
        .patch(`/admin/users/${regularUser.id}`)
        .set("Cookie", adminCookies)
        .send({ name: "Only Name" })
        .expect(200);

      await ctx.request
        .post("/api/auth/login")
        .send({ email: regularUser.email, password: MOCK_USER_PASSWORD })
        .expect(200);
    });

    it("returns 409 when taking another user's email", async () => {
      await ctx.request
        .patch(`/admin/users/${regularUser.id}`)
        .set("Cookie", adminCookies)
        .send({ email: admin.email })
        .expect(409);
    });

    it("returns 404 for an unknown user", async () => {
      await ctx.request
        .patch(`/admin/users/${randomUUID()}`)
        .set("Cookie", adminCookies)
        .send({ name: "Ghost" })
        .expect(404);
    });

    it("stops admins from changing their own role or status but not their name", async () => {
      await ctx.request
        .patch(`/admin/users/${admin.id}`)
        .set("Cookie", adminCookies)
        .send({ role: UserRoles.USER })
        .expect(403);
      await ctx.request
        .patch(`/admin/users/${admin.id}`)
        .set("Cookie", adminCookies)
        .send({ status: UserStatus.INACTIVE })
        .expect(403);
      await ctx.request
        .patch(`/admin/users/${admin.id}`)
        .set("Cookie", adminCookies)
        .send({ name: "Still Admin", role: UserRoles.ADMIN })
        .expect(200);
    });
  });

  describe("DELETE /admin/users/:id", () => {
    it("deletes a user", async () => {
      await ctx.request
        .delete(`/admin/users/${regularUser.id}`)
        .set("Cookie", adminCookies)
        .expect(204);

      expect(await userRepo.findOneBy({ id: regularUser.id })).toBeNull();
    });

    it("returns 404 for an unknown user and 403 when deleting yourself", async () => {
      await ctx.request
        .delete(`/admin/users/${randomUUID()}`)
        .set("Cookie", adminCookies)
        .expect(404);
      await ctx.request
        .delete(`/admin/users/${admin.id}`)
        .set("Cookie", adminCookies)
        .expect(403);
    });
  });
});
