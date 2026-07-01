import { createFileRoute } from "@tanstack/react-router";
import { CourseEditor } from "@/components/course-editor/CourseEditor";

export const Route = createFileRoute("/")({
  component: CourseEditor,
});
