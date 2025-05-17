import { bsky } from "./bsky.ts";
import { env } from "./env.ts";

import { type ActorIdentifier } from "npm:@atcute/lexicons";
import { type ComWhtwndBlogEntry } from "@atcute/whitewind";
import { type ComAtprotoRepoListRecords } from "npm:@atcute/atproto";

export async function getPosts() {
  const posts = await bsky.get("com.atproto.repo.listRecords", {
    params: {
      repo: env.NEXT_PUBLIC_BSKY_DID as ActorIdentifier,
      collection: "com.whtwnd.blog.entry",
      // todo: pagination
    },
  });
  
  if ('error' in posts.data) {
    throw new Error(posts.data.error);
  }

  return posts.data.records.filter(
    drafts,
  ) as (ComAtprotoRepoListRecords.Record & {
    value: ComWhtwndBlogEntry.Main;
  })[];
}

function drafts(record: ComAtprotoRepoListRecords.Record) {
  if (Deno.env.get("NODE_ENV") === "development") return true;
  const post = record.value as ComWhtwndBlogEntry.Main;
  return post.visibility === "public";
}

export async function getPost(rkey: string) {
  const post = await bsky.get("com.atproto.repo.getRecord", {
    params: {
      repo: env.NEXT_PUBLIC_BSKY_DID as ActorIdentifier,
      rkey: rkey,
      collection: "com.whtwnd.blog.entry",
    },
  });

  return post.data as ComAtprotoRepoListRecords.Record & {
    value: ComWhtwndBlogEntry.Main;
  };
}
