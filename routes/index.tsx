import PostList from "../islands/post-list.tsx";
import { Title } from "../components/typography.tsx";
import { getPosts } from "../lib/api.ts";
import { Layout } from "../islands/layout.tsx";

export const dynamic = "force-static";
export const revalidate = 3600; // 1 hour

export default async function Home() {
  const posts = await getPosts();

  return (
    <Layout>
      <div class="p-8 pb-20 gap-16 sm:p-20">
        <div class="max-w-[600px] mx-auto">
          <Title class="font-serif-italic text-4xl sm:text-5xl lowercase mb-12">
            Knotbin
          </Title>

          <div class="space-y-4 w-full">
            <PostList posts={posts} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
