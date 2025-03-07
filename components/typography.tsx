import { h } from "preact/src/index.d.ts";
import { cx } from "../lib/cx.ts";

export function Title({
  level = "h1",
  className,
  ...props
}: h.JSX.HTMLAttributes<HTMLHeadingElement> & {
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}) {
  const Tag = level;

  let style;
  switch (level) {
    case "h1":
      style = "text-4xl lg:text-5xl";
      break;
    case "h2":
      style = "border-b pb-2 text-3xl";
      break;
    case "h3":
      style = "text-2xl";
      break;
    case "h4":
      style = "text-xl";
      break;
    case "h5":
      style = "text-lg";
      break;
    case "h6":
      style = "text-base";
      break;
  }

  return (
    <Tag
      className={cx(
        "font-serif font-bold text-balance tracking-wide scroll-m-20 uppercase mt-8 [&>code]:text-[length:inherit] first:mt-0",
        style,
        className?.toString(),
      )}
      {...props}
    />
  );
}

export function Paragraph({
  className,
  ...props
}: h.JSX.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx("font-sans text-pretty", className?.toString())} {...props} />;
}

export function Code({ className, ...props }: h.JSX.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cx(
        "font-mono normal-case relative rounded-sm px-[0.3rem] py-[0.2rem] bg-slate-100 text-sm dark:bg-slate-800 dark:text-slate-100",
        className?.toString(),
      )}
      {...props}
    />
  );
}
