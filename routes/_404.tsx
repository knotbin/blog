import { Title } from "../components/typography.tsx";
import { Head } from "$fresh/runtime.ts";
import { Layout } from "../islands/layout.tsx";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <Layout>
        <div class="flex-1 flex items-center justify-center">
          <div class="p-8 pb-20 sm:p-20 text-center">
            <Title class="font-serif-italic text-4xl sm:text-5xl lowercase mb-6">
              Page not found
            </Title>
            <p class="my-4">The page you were looking for doesn't exist.</p>
            <a href="/" class="underline">
              Go back home
            </a>
          </div>
        </div>
      </Layout>
    </>
  );
}
