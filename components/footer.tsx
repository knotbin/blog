import { siBluesky as BlueskyIcon, siGithub as GithubIcon } from "npm:simple-icons";
import { useState } from "preact/hooks";
import { env } from "../lib/env.ts";

export function Footer() {
  const [blueskyHovered, setBlueskyHovered] = useState(false);
  const [githubHovered, setGithubHovered] = useState(false);

  return (
    <footer class="py-8 flex gap-6 flex-wrap items-center justify-center text-sm">
      <a
        class="flex items-center gap-2 relative group"
        href={`https://bsky.app/profile/${env.NEXT_PUBLIC_BSKY_DID}`}
        target="_blank"
        rel="noopener noreferrer"
        data-hovered={blueskyHovered}
        onMouseEnter={() => setBlueskyHovered(true)}
        onMouseLeave={() => setBlueskyHovered(false)}
      >
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          class="fill-black dark:fill-white"
        >
          <path d={BlueskyIcon.path} />
        </svg>
        <span class="opacity-50 group-hover:opacity-100 transition-opacity">Bluesky</span>
        <div class="absolute bottom-0 left-0 w-full h-px bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out group-hover:origin-left group-data-[hovered=false]:origin-right" />
      </a>
      <a
        class="flex items-center gap-2 relative group"
        href="https://github.com/knotbin"
        target="_blank"
        rel="noopener noreferrer"
        data-hovered={githubHovered}
        onMouseEnter={() => setGithubHovered(true)}
        onMouseLeave={() => setGithubHovered(false)}
      >
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          class="fill-black dark:fill-white"
        >
          <path d={GithubIcon.path} />
        </svg>
        <span class="opacity-50 group-hover:opacity-100 transition-opacity">GitHub</span>
        <div class="absolute bottom-0 left-0 w-full h-px bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out group-hover:origin-left group-data-[hovered=false]:origin-right" />
      </a>
    </footer>
  );
}
