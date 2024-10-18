import type { Middleware } from "waku/config";
import { PEERS } from "../features/peers";

const stringToStream = (str: string): ReadableStream => {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(str));
      controller.close();
    },
  });
};

const apiMiddleware: Middleware = () => {
  return async (ctx, next) => {
    const path = ctx.req.url.pathname;
    console.log("API: ", path);
    if (path === "/api/participants") {
      const peers = JSON.stringify(PEERS);
      ctx.res.body = stringToStream(peers);
      return;
    }
    await next();
  };
};

export default apiMiddleware;
