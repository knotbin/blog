/** @jsxImportSource preact */
import { CSS, render } from "@deno/gfm";
import { Handlers, PageProps } from "$fresh/server.ts";

import { Layout } from "../../islands/layout.tsx";
import { PostInfo } from "../../components/post-info.tsx";
import { Title } from "../../components/typography.tsx";
import { getPost } from "../../lib/api.ts";
import { Head } from "$fresh/runtime.ts";

interface Post {
  uri: string;
  value: {
    title: string;
    subtitle?: string;
    content: string;
    createdAt: string;
  };
}

// Only override backgrounds in dark mode to make them transparent
const transparentDarkModeCSS = `
@media (prefers-color-scheme: dark) {
  .markdown-body {
    color: white;
    background-color: transparent;
  }

  .markdown-body a {
    color: #58a6ff;
  }

  .markdown-body blockquote {
    border-left-color: #30363d;
    background-color: transparent;
  }

  .markdown-body pre,
  .markdown-body code {
    background-color: transparent;
    color: #c9d1d9;
  }

  .markdown-body table td,
  .markdown-body table th {
    border-color: #30363d;
    background-color: transparent;
  }
}

.font-sans { font-family: var(--font-sans); }
.font-serif { font-family: var(--font-serif); }
.font-mono { font-family: var(--font-mono); }

.markdown-body h1 {
  font-family: var(--font-serif);
  text-transform: uppercase;
  font-size: 2.25rem;
}

.markdown-body h2 {
  font-family: var(--font-serif);
  text-transform: uppercase;
  font-size: 1.75rem;
}

.markdown-body h3 {
  font-family: var(--font-serif);
  text-transform: uppercase;
  font-size: 1.5rem;
}

.markdown-body h4 {
  font-family: var(--font-serif);
  text-transform: uppercase;
  font-size: 1.25rem;
}

.markdown-body h5 {
  font-family: var(--font-serif);
  text-transform: uppercase;
  font-size: 1rem;
}

.markdown-body h6 {
  font-family: var(--font-serif);
  text-transform: uppercase;
  font-size: 0.875rem;
}
`;

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    try {
      const { slug } = ctx.params;
      const post = await getPost(slug);
      return ctx.render(post);
    } catch (error) {
      console.error("Error fetching post:", error);
      return new Response("Post not found", { status: 404 });
    }
  },
};

export default function BlogPage({ data: post }: PageProps<Post>) {
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <Head>
        <title>{post.value.title} — knotbin</title>
        <meta name="description" content={post.value.subtitle || "by Roscoe Rubin-Rottenberg"} />
        {/* Merge GFM's default styles with our dark-mode overrides */}
        <style
          dangerouslySetInnerHTML={{ __html: CSS + transparentDarkModeCSS }}
        />
      </Head>

      <Layout>
        <div class="p-8 pb-20 gap-16 sm:p-20">
          <link rel="alternate" href={post.uri} />
          <div class="max-w-[600px] mx-auto">
            <article class="w-full space-y-8">
              <div class="space-y-4 w-full">
                <Title>{post.value.title}</Title>
                {post.value.subtitle && (
                  <p class="text-xl text-slate-600 dark:text-slate-300 font-serif italic">
                    {post.value.subtitle}
                  </p>
                )}
                <PostInfo
                  content={post.value.content}
                  createdAt={post.value.createdAt}
                  includeAuthor
                  className="text-sm"
                />
                <div class="diagonal-pattern w-full h-3" />
              </div>
              <div class="[&>.bluesky-embed]:mt-8 [&>.bluesky-embed]:mb-0">
                <div
                  class="mt-8 markdown-body"
                  // replace old pds url with new one for blob urls
                  dangerouslySetInnerHTML={{
                    __html: render(post.value.content).replace(
                      /puffball\.us-east\.host\.bsky\.network/g,
                      "knotbin.xyz",
                    ),
                  }}
                />
              </div>
            </article>
          </div>
        </div>
      </Layout>
    </>
  );
}
