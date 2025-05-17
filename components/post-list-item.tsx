"use client";

import { useEffect, useRef, useState } from "preact/hooks";
import { ComWhtwndBlogEntry } from "npm:@atcute/whitewind";

import { cx } from "../lib/cx.ts";

import { PostInfo } from "./post-info.tsx";
import { Title } from "./typography.tsx";

export function PostListItem({
  post,
  rkey,
}: {
  post: ComWhtwndBlogEntry.Main;
  rkey: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up any timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsLeaving(false);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsLeaving(true);
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
      setIsLeaving(false);
    }, 300); // Match animation duration
  };

  return (
    <>
      {isHovered && (
        <div
          className={cx(
            "fixed inset-0 pointer-events-none z-0",
            isLeaving ? "animate-fade-out" : "animate-fade-in",
          )}
        >
          <div className="h-full w-full pt-[120px] flex items-center overflow-hidden">
            <div className="whitespace-nowrap animate-marquee font-serif font-medium uppercase leading-[0.8] text-[20vw] opacity-[0.015] -rotate-12 absolute left-0">
              {Array(8).fill(post.title).join(" · ")}
            </div>
          </div>
        </div>
      )}
      <a
        href={`/post/${rkey}`}
        className="w-full group block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <article className="w-full flex flex-row border-b items-stretch relative transition-colors duration-300 ease-[cubic-bezier(0.33,0,0.67,1)] backdrop-blur-sm hover:bg-slate-700/5 dark:hover:bg-slate-200/10">
          <div className="w-1.5 diagonal-pattern shrink-0 opacity-20 group-hover:opacity-100 transition-opacity duration-300 ease-[cubic-bezier(0.33,0,0.67,1)]" />
          <div className="flex-1 py-2 px-4 z-10 relative w-full">
            <Title className="text-lg w-full" level="h3">
              {post.title}
            </Title>
            <PostInfo
              content={post.content}
              createdAt={post.createdAt}
              className="text-xs mt-1 w-full"
            />
            <div className="grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.33,0,0.67,1)] grid-rows-[0fr] group-hover:grid-rows-[1fr] opacity-0 group-hover:opacity-100 mt-2">
              <div className="overflow-hidden">
                <p className="text-sm line-clamp-3 break-words">
                  {post.content.substring(0, 280)}
                </p>
              </div>
            </div>
          </div>
        </article>
      </a>
    </>
  );
}
