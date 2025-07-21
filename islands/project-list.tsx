import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { ProjectListItem } from "../components/project-list-item.tsx";

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

export default function ProjectList(
  { projects: initialProjects }: { projects: Project[] },
) {
  const projects = useSignal(initialProjects);

  useEffect(() => {
    projects.value = initialProjects;
  }, [initialProjects]);

  return (
    <>
      {projects.value?.map((project) => (
        <ProjectListItem
          key={project.id}
          project={project}
        />
      ))}
    </>
  );
}
