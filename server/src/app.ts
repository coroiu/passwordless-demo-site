import { server as HapiServer } from "@hapi/hapi";
import { createApi } from "./api";

async function run() {
  const server = HapiServer({
    port: 3000,
    host: "localhost",
  });

  await createApi(server);
  await server.start();

  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

run().catch(console.error);
