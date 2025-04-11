import rehypeFormat from "npm:rehype-format";
import rehypeStringify from "npm:rehype-stringify";
import remarkParse from "npm:remark-parse";
import remarkRehype from "npm:remark-rehype";
import RSS from "npm:rss";
import { unified } from "npm:unified";

import { getPosts } from "../lib/api.ts";

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
    rss.item({
      title: post.value.title ?? "Untitled",
      description: await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeFormat)
        .use(rehypeStringify)
        .process(post.value.content)
        .then((v) => v.toString()),
      url: `https://knotbin.com/post/${post.uri.split("/").pop()}`,
      date: new Date(post.value.createdAt ?? Date.now()),
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
