import { bsky } from "./bsky.ts";
import { env } from "./env.ts";

import { type ComAtprotoRepoListRecords } from "@atcute/atproto";
import { type ActorIdentifier } from "npm:@atcute/lexicons@^1.3.1";
import {
  type PubLeafletBlocksBlockquote,
  type PubLeafletBlocksCode,
  type PubLeafletBlocksText,
  type PubLeafletContent,
} from "@atcute/leaflet";
import { type SiteStandardDocument } from "@atcute/standard-site";

const STANDARD_SITE_DOCUMENT_COLLECTION = "site.standard.document";

export type StandardSiteDocument =
  & Omit<SiteStandardDocument.Main, "content">
  & {
    content?: PubLeafletContent.Main;
  };

export type PostRecord = ComAtprotoRepoListRecords.Record & {
  value: StandardSiteDocument;
};

export async function getPosts() {
  const posts = await bsky.get("com.atproto.repo.listRecords", {
    params: {
      repo: env.NEXT_PUBLIC_BSKY_DID as ActorIdentifier,
      collection: STANDARD_SITE_DOCUMENT_COLLECTION,
      // todo: pagination
    },
  });

  if ("error" in posts.data) {
    throw new Error(posts.data.error);
  }

  return posts.data.records as PostRecord[];
}

export async function getPost(rkey: string) {
  const post = await bsky.get("com.atproto.repo.getRecord", {
    params: {
      repo: env.NEXT_PUBLIC_BSKY_DID as ActorIdentifier,
      rkey: rkey,
      collection: STANDARD_SITE_DOCUMENT_COLLECTION,
    },
  });

  return post.data as PostRecord;
}

export function getDocumentPlaintext(document: StandardSiteDocument) {
  if (document.textContent) {
    return document.textContent;
  }

  return document.content?.pages
    ?.flatMap((page) =>
      page.$type === "pub.leaflet.pages.linearDocument" ? page.blocks : []
    )
    .filter((block) =>
      block.block.$type === "pub.leaflet.blocks.text" ||
      block.block.$type === "pub.leaflet.blocks.blockquote" ||
      block.block.$type === "pub.leaflet.blocks.code"
    )
    .map((block) =>
      block.block.$type === "pub.leaflet.blocks.blockquote"
        ? (block.block as PubLeafletBlocksBlockquote.Main).plaintext
        : block.block.$type === "pub.leaflet.blocks.code"
        ? (block.block as PubLeafletBlocksCode.Main).plaintext
        : (block.block as PubLeafletBlocksText.Main).plaintext
    )
    .join(" ") ?? "";
}
