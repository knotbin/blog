import { date } from "../lib/date.ts";
import { env } from "../lib/env.ts";

import { Paragraph } from "./typography.tsx";
import type { ComponentChildren } from "preact";

// Calculate reading time based on content length
function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return minutes;
}

export function PostInfo({
  createdAt,
  content,
  includeAuthor = false,
  className,
  children,
}: {
  createdAt?: string;
  content: string;
  includeAuthor?: boolean;
  className?: string;
  children?: ComponentChildren;
}) {
  const readingTime = getReadingTime(content);

  return (
    <Paragraph className={className}>
      {includeAuthor && (
        <>
          <a
            href={`https://bsky.app/profile/${env.NEXT_PUBLIC_BSKY_DID}`}
            className="hover:underline hover:underline-offset-4"
          >
            Roscoe Rubin-Rottenberg
          </a>{" "}
          &middot;{" "}
        </>
      )}
      {createdAt && (
        <>
          <time dateTime={createdAt}>{date(new Date(createdAt))}</time>{" "}
          &middot;{" "}
        </>
      )}
      <span>
        <span style={{ lineHeight: 1, marginRight: "0.25rem" }}>
          {readingTime} min read
        </span>
      </span>
      {children}
    </Paragraph>
  );
}
