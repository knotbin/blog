"use client";

import { useEffect, useRef, useState } from "preact/hooks";
import { cx } from "../lib/cx.ts";
import { Title } from "./typography.tsx";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  url: string;
  demo?: string;
  year: string;
  status: "active" | "completed" | "maintained" | "archived";
}

export function ProjectListItem({ project }: { project: Project }) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 dark:text-green-400";
      case "completed":
        return "text-blue-600 dark:text-blue-400";
      case "maintained":
        return "text-yellow-600 dark:text-yellow-400";
      case "archived":
        return "text-slate-500 dark:text-slate-400";
      default:
        return "text-slate-600 dark:text-slate-300";
    }
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
              {Array(8).fill(project.title).join(" · ")}
            </div>
          </div>
        </div>
      )}
      <a
        href={project.demo || project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full group block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <article className="w-full flex flex-row border-b items-stretch relative transition-colors duration-300 ease-[cubic-bezier(0.33,0,0.67,1)] backdrop-blur-sm hover:bg-slate-700/5 dark:hover:bg-slate-200/10">
          <div className="w-1.5 diagonal-pattern shrink-0 opacity-20 group-hover:opacity-100 transition-opacity duration-300 ease-[cubic-bezier(0.33,0,0.67,1)]" />
          <div className="flex-1 py-2 px-4 z-10 relative w-full">
            <div className="flex items-start justify-between gap-4">
              <Title className="text-lg w-full flex-1" level="h3">
                {project.title}
              </Title>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {project.year}
                </span>
                <span
                  className={cx(
                    "text-xs font-medium capitalize",
                    getStatusColor(project.status),
                  )}
                >
                  {project.status}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mt-2">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-sm text-slate-600 dark:text-slate-300"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="text-xs px-2 py-0.5 text-slate-500 dark:text-slate-400">
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>

            <div className="grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.33,0,0.67,1)] grid-rows-[0fr] group-hover:grid-rows-[1fr] opacity-0 group-hover:opacity-100 mt-3">
              <div className="overflow-hidden">
                <p className="text-sm text-slate-600 dark:text-slate-300 break-words line-clamp-3 mb-3">
                  {project.description}
                </p>
                <div className="flex gap-3">
                  {project.demo && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Source
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>
      </a>
    </>
  );
}
