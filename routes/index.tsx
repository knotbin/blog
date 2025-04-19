import PostList from "../islands/post-list.tsx";
import { Title } from "../components/typography.tsx";
import { getPosts } from "../lib/api.ts";
import { Layout } from "../islands/layout.tsx";

export const dynamic = "force-static";
export const revalidate = 3600; // 1 hour

const stupidSelfDeprecatingTaglinesToTryToPretendImSelfAware = [
  "is looking into it",
  "i think therefore imdb",
  "isn't a real word",
  "enjoys each protocol equally",
  "is having a very semantic argument",
  "wrote these derivitive taglines",
  "is way too into css animations",
  "uses dark mode at noon",
  "overthinks variable names",
  "git pushes with -f",
  "formats on save",
  "is praising kier",
  "pretends to understand monads",
  "brags about their vim config",
  "documents their code (lies)",
  "isn't mysterious or important",
  "wants to be included in discourse",
  "is deeply offended by semicolons",
  "is morraly opposed to touching grass",
];

function getRandomTagline() {
  return stupidSelfDeprecatingTaglinesToTryToPretendImSelfAware[
    Math.floor(
      Math.random() *
        stupidSelfDeprecatingTaglinesToTryToPretendImSelfAware.length,
    )
  ];
}

export default async function Home() {
  const posts = await getPosts();
  const tagline = getRandomTagline();

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
