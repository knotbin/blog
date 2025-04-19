import { siBluesky as BlueskyIcon, siGithub as GithubIcon } from "npm:simple-icons";

import { env } from "../lib/env.ts";

export function Footer() {
  return (
    <footer class="py-8 flex gap-6 flex-wrap items-center justify-center text-sm">
      <a
        class="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href={`https://bsky.app/profile/${env.NEXT_PUBLIC_BSKY_DID}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          class="fill-black dark:fill-white"
        >
          <path d={BlueskyIcon.path} />
        </svg>
        Bluesky
      </a>
      <a
        class="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://github.com/knotbin"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          class="fill-black dark:fill-white"
        >
          <path d={GithubIcon.path} />
        </svg>
        GitHub
      </a>
    </footer>
  );
}
