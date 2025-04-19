import { Title } from "../components/typography.tsx";
import { Head } from "$fresh/runtime.ts";
import { Layout } from "../islands/layout.tsx";

export default function About() {
  return (
    <>
      <Head>
        <title>About - knotbin</title>
      </Head>
      <Layout>
        <div class="p-8 pb-20 gap-16 sm:p-20">
          <div class="max-w-[600px] mx-auto">
            <Title class="font-serif-italic text-4xl sm:text-5xl lowercase mb-12">
              About
            </Title>

            <div class="prose prose-slate dark:prose-invert space-y-8">
              <p>
                I'm a fifteen year-old software developer. I'm experienced in
                iOS development, and a winner of the 2024 Apple Swift Student
                Challenge. I'm very interested in decentralized systems and AT
                Protocol in particular. I love designing and building beautiful
                interfaces, and learning about amazing systems.
              </p>

              <p>
                Currently, I'm working with Spark to build a shortform video
                platform on the AT Protocol. I'm also working on my own
                projects, and always thinking about big ideas and small details.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
