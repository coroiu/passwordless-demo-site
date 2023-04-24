import { Server } from "@hapi/hapi";
import { Buffer } from "node:buffer";
import { DatabaseRepository } from "../infrastructure/db";
import { PasswordlessClient } from "../infrastructure/passwordless-client";

const ApiPath = "/api";

export async function createApi(
  server: Server,
  passwordless: PasswordlessClient,
  repository: DatabaseRepository
) {
  server.route({
    method: "GET",
    path: `${ApiPath}/health`,
    handler: (req, res) => {
      return res.response("OK").code(200);
    },
  });

  server.route({
    method: "POST",
    path: `${ApiPath}/user/register`,
    handler: async (req, res) => {
      const { email, name } = req.payload as Record<string, string>;

      if (email == undefined) {
        return res.response("Missing 'email'").code(400);
      }

      if (name == undefined) {
        return res.response("Missing 'name'").code(400);
      }

      const { token, userId } = await passwordless.register(email, name);
      const loginToken = Buffer.from(userId, "utf-8").toString("base64");
      repository.db.users.push({
        email,
        name,
        userId,
      });
      await repository.save();

      return res.response({ token, loginToken });
    },
  });

  server.route({
    method: "POST",
    path: `${ApiPath}/user/login`,
    handler: async (req, res) => {
      const { token, loginToken } = req.payload as Record<string, string>;

      if (token == undefined && loginToken == undefined) {
        return res.response("Missing token").code(400);
      }

      if (loginToken !== undefined) {
        const userId = Buffer.from(loginToken, "base64").toString("utf-8");
      }

      // const { token, userId } = await passwordless.register(email, name);

      return res.response({ token, loginToken });
    },
  });
}
