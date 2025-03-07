import { date } from "../lib/date.ts";
import { env } from "../lib/env.ts";

import { Paragraph } from "./typography.tsx";
import type { ComponentChildren } from "preact";

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
  return (
    <Paragraph className={className}>
      {includeAuthor && (
        <>
          <img
            width={14}
            height={14}
            loading="lazy"
            src="../assets/me_blue_square.jpg"
            alt="Roscooe's profile picture"
            className="inline rounded-full mr-1.5 mb-0.5"
          />
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
      {children}
    </Paragraph>
  );
}
