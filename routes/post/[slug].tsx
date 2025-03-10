/** @jsxImportSource preact */
import { CSS, render } from "@deno/gfm";
import { Handlers, PageProps } from "$fresh/server.ts";

import { Footer } from "../../components/footer.tsx";
import { PostInfo } from "../../components/post-info.tsx";
import { Title } from "../../components/typography.tsx";
import { getPost } from "../../lib/api.ts";
import { Head } from "$fresh/runtime.ts";
import { CommentSection } from "../../islands/CommentSection.tsx";

interface Post {
  uri: string;
  value: {
    title: string;
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
        <meta name="description" content="by Roscoe Rubin-Rottenberg" />
        {/* Merge GFM’s default styles with our dark-mode overrides */}
        <style
          dangerouslySetInnerHTML={{ __html: CSS + transparentDarkModeCSS }}
        />
      </Head>

      <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-dvh py-8 px-4 xs:px-8 pb-20 gap-16 sm:p-20">
        <link rel="alternate" href={post.uri} />
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-[600px] overflow-hidden">
          <article className="w-full space-y-8">
            <div className="space-y-4 w-full">
              <a
                href="/"
                className="hover:underline hover:underline-offset-4 font-medium"
              >
                Back
              </a>
              <Title>{post.value.title}</Title>
              <PostInfo
                content={post.value.content}
                createdAt={post.value.createdAt}
                includeAuthor
                className="text-sm"
              />
              <div className="diagonal-pattern w-full h-3" />
            </div>
            <div className="[&>.bluesky-embed]:mt-8 [&>.bluesky-embed]:mb-0">
              {/* Render GFM HTML via dangerouslySetInnerHTML */}
              <div
                class="mt-8 markdown-body"
                dangerouslySetInnerHTML={{ __html: render(post.value.content) }}
              />
            </div>
          </article>
          <CommentSection
            author="knotbin.xyz"
          />
        </main>
        <Footer />
      </div>
    </>
  );
}
