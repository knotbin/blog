import { Client, simpleFetchHandler } from "@atcute/client";

import { env } from "./env.ts";

const handler = simpleFetchHandler({
  service: env.NEXT_PUBLIC_BSKY_PDS,
});
export const bsky = new Client({ handler });
