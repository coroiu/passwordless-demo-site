import { Server } from "@hapi/hapi";
import { Buffer } from "node:buffer";
import { PasswordlessClient } from "../infrastructure/passwordless-client";

const ApiPath = "/api";

export async function createApi(
  server: Server,
  passwordless: PasswordlessClient
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
      const loginToken = Buffer.from(userId).toString("base64");

      return res.response({ token, loginToken });
    },
  });
}
