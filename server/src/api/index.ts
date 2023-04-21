import { Server } from "@hapi/hapi";

const ApiPath = "/api";

export async function createApi(server: Server) {
  server.route({
    method: "GET",
    path: `${ApiPath}/health`,
    handler: (req, res) => {
      return res.response("OK").code(200);
    },
  });
}
