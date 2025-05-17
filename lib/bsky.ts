import { CredentialManager, XRPC } from "npm:@atcute/client";

import { env } from "./env.ts";

const handler = new CredentialManager({
  service: env.NEXT_PUBLIC_BSKY_PDS,
  fetch,
});
export const bsky = new XRPC({ handler });
