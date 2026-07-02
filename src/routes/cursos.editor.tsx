import { createFileRoute } from "@tanstack/react-router";
import { CourseEditor } from "@/components/course-editor/CourseEditor";

export const Route = createFileRoute("/cursos/editor")({
  head: () => ({
    meta: [
      { title: "Editor de curso — CRS Learning" },
      { name: "description", content: "Editor tipo IDE para crear cursos, lecciones y tests." },
    ],
  }),
  component: CourseEditor,
});
