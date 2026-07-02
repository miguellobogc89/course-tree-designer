import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  Building2,
  Clock,
  FileText,
  Filter,
  FlaskConical,
  Globe2,
  GraduationCap,
  Lock,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { AppShell } from "@/components/shell/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cursos/")({
  head: () => ({
    meta: [
      { title: "Cursos — CRS Learning" },
      {
        name: "description",
        content:
          "Catálogo de cursos de CRS Learning: conocimiento público abierto y formaciones privadas de tu empresa.",
      },
    ],
  }),
  component: CoursesPage,
});

type Scope = "public" | "private";

interface Course {
  id: string;
  title: string;
  description: string;
  scope: Scope;
  category: string;
  lessons: number;
  tests: number;
  duration: string;
  students: number;
  status: "Publicado" | "Borrador" | "Revisión";
  updatedAt: string;
  owner: string;
}

const COURSES: Course[] = [
  {
    id: "power-query",
    title: "Power Query para analistas",
    description: "Transforma, limpia y modela datos sin escribir código con Power Query.",
    scope: "private",
    category: "Datos",
    lessons: 18,
    tests: 4,
    duration: "4h 20m",
    students: 42,
    status: "Borrador",
    updatedAt: "hace 2 h",
    owner: "Acme Corp",
  },
  {
    id: "ia-generativa",
    title: "Cómo funciona la IA generativa",
    description: "Fundamentos, modelos de lenguaje y aplicaciones reales explicadas paso a paso.",
    scope: "public",
    category: "IA",
    lessons: 22,
    tests: 6,
    duration: "5h 10m",
    students: 1284,
    status: "Publicado",
    updatedAt: "ayer",
    owner: "CRS Learning",
  },
  {
    id: "atencion-cliente",
    title: "Atención al cliente — Acme",
    description: "Procedimiento oficial de atención al cliente para nuevos empleados de Acme.",
    scope: "private",
    category: "Onboarding",
    lessons: 12,
    tests: 3,
    duration: "2h 45m",
    students: 28,
    status: "Publicado",
    updatedAt: "hace 3 días",
    owner: "Acme Corp",
  },
  {
    id: "seguridad",
    title: "Seguridad de la información",
    description: "Buenas prácticas, contraseñas, phishing y protocolos internos.",
    scope: "public",
    category: "Seguridad",
    lessons: 14,
    tests: 3,
    duration: "3h 05m",
    students: 812,
    status: "Publicado",
    updatedAt: "hace 1 sem",
    owner: "CRS Learning",
  },
  {
    id: "excel-avanzado",
    title: "Excel avanzado para operaciones",
    description: "Fórmulas, tablas dinámicas y automatizaciones para el día a día.",
    scope: "public",
    category: "Ofimática",
    lessons: 26,
    tests: 5,
    duration: "6h 30m",
    students: 2140,
    status: "Publicado",
    updatedAt: "hace 2 sem",
    owner: "CRS Learning",
  },
  {
    id: "sgc-acme",
    title: "Sistema de gestión de calidad — Acme",
    description: "Procesos, auditorías y checklists internos del SGC de Acme.",
    scope: "private",
    category: "Procesos",
    lessons: 9,
    tests: 2,
    duration: "1h 50m",
    students: 15,
    status: "Revisión",
    updatedAt: "hace 4 días",
    owner: "Acme Corp",
  },
];

function CoursesPage() {
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState<"all" | Scope>("all");

  const filtered = useMemo(() => {
    return COURSES.filter((c) => {
      if (scope !== "all" && c.scope !== scope) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    });
  }, [query, scope]);

  const counts = {
    all: COURSES.length,
    public: COURSES.filter((c) => c.scope === "public").length,
    private: COURSES.filter((c) => c.scope === "private").length,
  };

  return (
    <AppShell topbar={<CoursesTopbar />}>
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="mx-auto max-w-6xl px-8 py-10">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Catálogo
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                Cursos
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Conocimiento público de CRS y formaciones privadas de tu empresa.
              </p>
            </div>
          </div>

          {/* Filters bar */}
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-1 rounded-md border border-border bg-panel p-1">
              <FilterTab
                label="Todos"
                count={counts.all}
                active={scope === "all"}
                onClick={() => setScope("all")}
                icon={BookOpen}
              />
              <FilterTab
                label="Público"
                count={counts.public}
                active={scope === "public"}
                onClick={() => setScope("public")}
                icon={Globe2}
                tone="lesson"
              />
              <FilterTab
                label="Privado"
                count={counts.private}
                active={scope === "private"}
                onClick={() => setScope("private")}
                icon={Lock}
                tone="test"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar cursos…"
                  className="h-8 w-64 border-border bg-panel pl-8 text-xs placeholder:text-muted-foreground/70"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 border-border bg-panel text-xs text-muted-foreground hover:text-foreground"
              >
                <Filter className="h-3.5 w-3.5" />
                Filtros
              </Button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          )}
        </div>
      </main>
    </AppShell>
  );
}

function CoursesTopbar() {
  return (
    <>
      <span className="text-sm font-medium text-foreground">Cursos</span>
      <span className="ml-2 rounded-md border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        {COURSES.length} cursos
      </span>
      <div className="ml-auto flex items-center gap-2">
        <Button asChild size="sm" className="h-8 gap-1.5 bg-lesson text-primary-foreground hover:bg-lesson/90">
          <Link to="/cursos/editor">
            <Plus className="h-3.5 w-3.5" />
            Nuevo curso
          </Link>
        </Button>
      </div>
    </>
  );
}

function FilterTab({
  label,
  count,
  active,
  onClick,
  icon: Icon,
  tone,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  icon: typeof BookOpen;
  tone?: "lesson" | "test";
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors",
        active
          ? "bg-surface text-foreground"
          : "text-muted-foreground hover:bg-surface/60 hover:text-foreground",
      )}
    >
      <Icon
        className={cn(
          "h-3.5 w-3.5",
          active && tone === "lesson" && "text-lesson",
          active && tone === "test" && "text-test",
        )}
      />
      {label}
      <span
        className={cn(
          "ml-0.5 rounded px-1 text-[10px]",
          active ? "bg-background text-muted-foreground" : "text-muted-foreground/70",
        )}
      >
        {count}
      </span>
    </button>
  );
}

function CourseCard({ course }: { course: Course }) {
  const isPublic = course.scope === "public";
  return (
    <Link
      to="/cursos/editor"
      className="group flex flex-col rounded-xl border border-border bg-panel p-5 transition-all hover:-translate-y-0.5 hover:border-lesson/40 hover:shadow-lg hover:shadow-black/5"
    >
      {/* header */}
      <div className="mb-4 flex items-start justify-between">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg",
            isPublic ? "bg-lesson-soft text-lesson" : "bg-test-soft text-test",
          )}
        >
          {isPublic ? <Globe2 className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
        </div>
        <StatusPill status={course.status} />
      </div>

      {/* body */}
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {course.category}
      </p>
      <h3 className="mt-1 line-clamp-1 text-base font-semibold tracking-tight text-foreground group-hover:text-lesson">
        {course.title}
      </h3>
      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
        {course.description}
      </p>

      {/* meta */}
      <div className="mt-4 flex items-center gap-3 text-[11px] text-muted-foreground">
        <Meta icon={FileText}>{course.lessons} lec.</Meta>
        <Meta icon={FlaskConical}>{course.tests} test</Meta>
        <Meta icon={Clock}>{course.duration}</Meta>
      </div>

      {/* footer */}
      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-surface text-[9px] font-medium text-foreground">
            {course.owner.charAt(0)}
          </div>
          <span className="truncate">{course.owner}</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <Users className="h-3 w-3" />
          {course.students}
        </div>
      </div>
    </Link>
  );
}

function Meta({ icon: Icon, children }: { icon: typeof Clock; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1">
      <Icon className="h-3 w-3" />
      {children}
    </span>
  );
}

function StatusPill({ status }: { status: Course["status"] }) {
  const map: Record<Course["status"], string> = {
    Publicado: "bg-lesson-soft text-lesson",
    Borrador: "bg-surface text-muted-foreground border border-border",
    Revisión: "bg-test-soft text-test",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider",
        map[status],
      )}
    >
      {status}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-panel/40 p-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-lesson-soft text-lesson">
        <GraduationCap className="h-5 w-5" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">Ningún curso encontrado</p>
        <p className="text-xs text-muted-foreground">
          Prueba a cambiar el filtro o crear uno nuevo.
        </p>
      </div>
      <Button
        asChild
        size="sm"
        className="mt-2 h-7 gap-1 bg-lesson text-xs text-primary-foreground hover:bg-lesson/90"
      >
        <Link to="/cursos/editor">
          <Plus className="h-3.5 w-3.5" />
          Crear curso
        </Link>
      </Button>
    </div>
  );
}
