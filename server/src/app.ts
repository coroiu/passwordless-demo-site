import { server as HapiServer } from "@hapi/hapi";
import { plugin as proxyPlugin } from "@hapi/h2o2";
import { createApi } from "./api";
import { PasswordlessClient } from "./infrastructure/passwordless-client";
import { Config } from "./config";
import { DatabaseRepository } from "./infrastructure/db";

async function run() {
  const server = HapiServer({
    port: 3000,
    host: "localhost",
  });

  const passwordlessClient = new PasswordlessClient(
    Config.passwordlessDev.apiUrl,
    Config.passwordlessDev.apiSecret
  );

  const db = await DatabaseRepository.init();

  await createApi(server, passwordlessClient, db);
  await server.register(proxyPlugin);

  server.route({
    method: "*",
    path: "/{path*}",
    handler: {
      proxy: {
        host: "127.0.0.1",
        port: 3001,
        protocol: "http",
        passThrough: true,
        redirects: 5,
      },
    },
  });

  await server.start();

  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

run().catch(console.error);
