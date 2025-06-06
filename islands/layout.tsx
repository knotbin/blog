import { Footer } from "../components/footer.tsx";
import type { ComponentChildren } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useSignal } from "@preact/signals";

export function Layout({ children }: { children: ComponentChildren }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [blogHovered, setBlogHovered] = useState(false);
  const [aboutHovered, setAboutHovered] = useState(false);
  const pathname = useSignal("");

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname.value === "/" || pathname.value.startsWith("/post/");
    }
    return pathname.value === href;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const handlePathChange = () => {
      pathname.value = window.location.pathname;
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("popstate", handlePathChange);
    handleScroll(); // Check initial scroll position
    handlePathChange(); // Set initial path

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", handlePathChange);
    };
  }, []);

  return (
    <div class="flex flex-col min-h-dvh">
      <nav class="w-full sticky top-0 z-50 backdrop-blur-sm transition-[padding,border-color] duration-200">
        <div class="relative">
          <div
            class="absolute inset-x-0 bottom-0 h-2 diagonal-pattern opacity-0 transition-opacity duration-300"
            style={{ opacity: isScrolled ? 0.25 : 0 }}
          />
          <div class="max-w-screen-2xl mx-auto px-8 py-5 flex justify-between items-center">
            <div class="flex items-center gap-7">
              <a href="/" class="font-serif text-xl">
                knotbin
              </a>
              <div class="h-4 w-px bg-slate-200 dark:bg-slate-700"></div>
              <div class="text-base flex items-center gap-7">
                <a
                  href="/"
                  class="relative group"
                  data-current={isActive("/")}
                  data-hovered={blogHovered}
                  onMouseEnter={() => setBlogHovered(true)}
                  onMouseLeave={() => setBlogHovered(false)}
                >
                  <span class="opacity-50 group-hover:opacity-100 group-data-[current=true]:opacity-100 transition-opacity">
                    blog
                  </span>
                  <div class="absolute bottom-0 left-0 w-full h-px bg-current scale-x-0 group-hover:scale-x-100 group-data-[current=true]:scale-x-100 transition-transform duration-300 ease-in-out group-hover:origin-left group-data-[hovered=false]:origin-right" />
                </a>
                <a
                  href="/about"
                  class="relative group"
                  data-current={isActive("/about")}
                  data-hovered={aboutHovered}
                  onMouseEnter={() => setAboutHovered(true)}
                  onMouseLeave={() => setAboutHovered(false)}
                >
                  <span class="opacity-50 group-hover:opacity-100 group-data-[current=true]:opacity-100 transition-opacity">
                    about
                  </span>
                  <div class="absolute bottom-0 left-0 w-full h-px bg-current scale-x-0 group-hover:scale-x-100 group-data-[current=true]:scale-x-100 transition-transform duration-300 ease-in-out group-hover:origin-left group-data-[hovered=false]:origin-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main class="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
