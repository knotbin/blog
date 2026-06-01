import RSS from "rss";

import { getDocumentPlaintext, getPosts } from "../lib/api.ts";

export const dynamic = "force-static";
export const revalidate = 3600; // 1 hour

export async function GET() {
  const posts = await getPosts();

  const rss = new RSS({
    title: "knotbin",
    feed_url: "https://knotbin.com/rss",
    site_url: "https://knotbin.com",
    description: "a webbed site",
  });

  for (const post of posts) {
    const plaintext = getDocumentPlaintext(post.value);
    const description = post.value.description
      ? `${post.value.description}\n\n${plaintext}`
      : plaintext;

    rss.item({
      title: post.value.title ?? "Untitled",
      description,
      url: `https://knotbin.com/post/${post.uri.split("/").pop()}`,
      date: new Date(post.value.publishedAt ?? Date.now()),
    });
  }

  return new Response(rss.xml(), {
    headers: {
      "content-type": "application/rss+xml",
    },
  });
}

export const handler = {
  GET,
  dynamic,
  revalidate,
};
