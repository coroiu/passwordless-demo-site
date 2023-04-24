import { server as HapiServer } from "@hapi/hapi";
import { plugin as proxyPlugin } from "@hapi/h2o2";
import { createApi } from "./api";
import { PasswordlessClient } from "./infrastructure/passwordless-client";
import { Config } from "./config";

async function run() {
  const server = HapiServer({
    port: 3000,
    host: "localhost",
  });

  const passwordlessClient = new PasswordlessClient(
    Config.passwordlessDev.apiUrl,
    Config.passwordlessDev.apiSecret
  );

  await createApi(server, passwordlessClient);
  await server.register(proxyPlugin);

  server.route({
    method: "*",
    path: "/{path*}",
    handler: {
      proxy: {
        host: "localhost",
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
