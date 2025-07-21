import ProjectList from "../islands/project-list.tsx";
import { Title } from "../components/typography.tsx";
import { Layout } from "../islands/layout.tsx";

export const dynamic = "force-static";
export const revalidate = 3600; // 1 hour

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

// Mock project data - replace with your actual projects
const projects: Project[] = [
  {
    id: "1",
    title: "ATP Airport",
    description: `The first ever graphical PDS migration tool for AT Protocol.
      Allows users to migrate their data from one PDS to another without any
      experience or technical knowledge.`,
    technologies: ["AT Protocol", "Fresh", "Deno", "TypeScript"],
    url: "https://github.com/knotbin/airport",
    demo: "https://atpairport.com",
    year: "2025",
    status: "active",
  },
];

export default function Work() {
  return (
    <Layout>
      <div class="p-8 pb-20 gap-16 sm:p-20">
        <div class="max-w-[600px] mx-auto">
          <Title class="font-serif-italic text-4xl sm:text-5xl lowercase mb-12">
            Work
          </Title>

          <div class="space-y-4 w-full">
            <ProjectList projects={projects} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
