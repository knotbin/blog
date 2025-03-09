import { Footer } from "../components/footer.tsx";
import PostList from "../islands/post-list.tsx";
import { Title } from "../components/typography.tsx";
import { getPosts } from "../lib/api.ts";

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
  return stupidSelfDeprecatingTaglinesToTryToPretendImSelfAware[Math.floor(Math.random() * stupidSelfDeprecatingTaglinesToTryToPretendImSelfAware.length)];
}

export default async function Home() {
  const posts = await getPosts();
  const tagline = getRandomTagline();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-dvh p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-[600px]">
        <div className="self-center flex flex-col">
            <div className="relative">
              <Title className="m-0 mb-6 font-serif-italic text-4xl sm:text-5xl lowercase">
              knotbin
              </Title>
                <span className="absolute bottom-3 -right-2 font-bold text-xs opacity-50 text-right whitespace-nowrap">
              {tagline}
              </span>
            </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <PostList posts={posts} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
