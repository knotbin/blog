import { Handlers } from "$fresh/server.ts";
import { IdResolver } from "npm:@atproto/identity";

const idResolver = new IdResolver();

export const handler: Handlers = {
  async GET(req) {
    const url = new URL(req.url);
    const did = url.searchParams.get("did") ?? "";
    const cid = url.searchParams.get("cid") ?? "";

    if (!did || !cid) {
      return new Response("Missing did or cid", { status: 404 });
    }

    const identity = await idResolver.did.resolve(did);
    const service = identity?.service?.find((f: any) => f.id === "#atproto_pds");
    if (!service) {
      return new Response("No PDS service found", { status: 404 });
    }

    const blobUrl = `${service.serviceEndpoint}/xrpc/com.atproto.sync.getBlob?did=${did}&cid=${cid}`;
    const response = await fetch(blobUrl);

    if (!response.ok) {
      return new Response("Blob not found", { status: 404 });
    }

    // Clone the response to modify headers
    const cachedResponse = new Response(response.body, response);
    cachedResponse.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable",
    );

    return cachedResponse;
  },
}; 