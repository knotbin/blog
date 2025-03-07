import { bsky } from "./bsky.ts";
import { env } from "./env.ts";

import { type ComAtprotoRepoListRecords } from "npm:@atcute/client/lexicons";
import { type ComWhtwndBlogEntry } from "npm:@atcute/whitewind";

export async function getPosts() {
  const posts = await bsky.get("com.atproto.repo.listRecords", {
    params: {
      repo: env.NEXT_PUBLIC_BSKY_DID,
      collection: "com.whtwnd.blog.entry",
      // todo: pagination
    },
  });
  return posts.data.records.filter(
    drafts,
  ) as (ComAtprotoRepoListRecords.Record & {
    value: ComWhtwndBlogEntry.Record;
  })[];
}

function drafts(record: ComAtprotoRepoListRecords.Record) {
  if (Deno.env.get("NODE_ENV") === "development") return true;
  const post = record.value as ComWhtwndBlogEntry.Record;
  return post.visibility === "public";
}

export async function getPost(rkey: string) {
  const post = await bsky.get("com.atproto.repo.getRecord", {
    params: {
      repo: env.NEXT_PUBLIC_BSKY_DID,
      rkey: rkey,
      collection: "com.whtwnd.blog.entry",
    },
  });

  return post.data as ComAtprotoRepoListRecords.Record & {
    value: ComWhtwndBlogEntry.Record;
  };
}
