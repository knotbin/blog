import { Footer } from "../components/footer.tsx";
import PostList from "../islands/post-list.tsx";
import { Title } from "../components/typography.tsx";
import { getPosts } from "../lib/api.ts";

export const dynamic = "force-static";
export const revalidate = 3600; // 1 hour

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-dvh p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-[600px]">
        <div className="self-center flex flex-col">
          <Title level="h1" className="m-0">
            knotbin
          </Title>
          <span className="font-bold text-xs opacity-50 text-right flex-1 mr-6">
            looking into it
          </span>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <PostList posts={posts} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
