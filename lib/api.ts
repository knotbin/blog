import { bsky } from "./bsky.ts";
import { env } from "./env.ts";

import { type ActorIdentifier } from "npm:@atcute/lexicons";
import { type ComAtprotoRepoListRecords } from "npm:@atcute/atproto";
import { type PubLeafletDocument } from "npm:@atcute/leaflet";

export async function getPosts() {
  const posts = await bsky.get("com.atproto.repo.listRecords", {
    params: {
      repo: env.NEXT_PUBLIC_BSKY_DID as ActorIdentifier,
      collection: "pub.leaflet.document",
      // todo: pagination
    },
  });

  if ("error" in posts.data) {
    throw new Error(posts.data.error);
  }

  return posts.data.records as (ComAtprotoRepoListRecords.Record & {
    value: PubLeafletDocument.Main;
  })[];
}

export async function getPost(rkey: string) {
  const post = await bsky.get("com.atproto.repo.getRecord", {
    params: {
      repo: env.NEXT_PUBLIC_BSKY_DID as ActorIdentifier,
      rkey: rkey,
      collection: "pub.leaflet.document",
    },
  });

  return post.data as ComAtprotoRepoListRecords.Record & {
    value: PubLeafletDocument.Main;
  };
}
