import { Router } from "websocket-express";
import { type Hocuspocus } from "@hocuspocus/server";

export const pieceRouter = (hocuspocus: Hocuspocus) => {
  const router = new Router();

  router.ws("/", async function (req, res) {
    const websocket = await res.accept();
    hocuspocus.handleConnection(
      // @ts-expect-error ExtendedWebSocket is compatible
      websocket,
      req
    );
  });

  return router;
};
