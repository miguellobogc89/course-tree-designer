import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowUpRight,
  Award,
  Brain,
  Building2,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock,
  FileText,
  FolderGit2,
  GraduationCap,
  Layers,
  MoreHorizontal,
  Plus,
  ShieldCheck,
  Sparkles,
  UserCircle2,
  Users,
} from "lucide-react";
import { AppShell } from "@/components/shell/AppShell";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mi-espacio")({
  head: () => ({
    meta: [
      { title: "Mi espacio — CRS Learning" },
      {
        name: "description",
        content:
          "Panel personal de CRS Learning: gestiona tu empresa, equipos, cursos y aportaciones al conocimiento.",
      },
    ],
  }),
  component: MyspacePage,
});

// ---------- Types ----------
interface Company {
  name: string;
  role: string;
  plan: string;
  members: number;
  teams: number;
  activeCourses: number;
  health: "Saludable" | "Atención" | "Crítico";
}

interface Team {
  id: string;
  name: string;
  description: string;
  members: number;
  courses: number;
  progress: number;
  lastActivity: string;
  color: "lesson" | "test" | "section";
}

interface CourseAssignment {
  id: string;
  title: string;
  category: string;
  progress: number;
  status: "En curso" | "Completado" | "Pendiente";
  updatedAt: string;
}

interface KnowledgeStat {
  label: string;
  value: string;
  icon: typeof FileText;
  tone: "lesson" | "test" | "section";
}

interface Contribution {
  id: string;
  title: string;
  folder: string;
  status: "Aprobado" | "En revisión" | "Borrador";
  updatedAt: string;
}

type ActivityKind = "course" | "knowledge" | "team";
interface ActivityEvent {
  id: string;
  kind: ActivityKind;
  text: string;
  meta?: string;
  time: string;
}

// ---------- Mock data ----------
const COMPANY: Company = {
  name: "Acme Corp",
  role: "Learning Manager",
  plan: "Business",
  members: 128,
  teams: 9,
  activeCourses: 14,
  health: "Saludable",
};

const TEAMS: Team[] = [
  {
    id: "onb",
    name: "Onboarding",
    description: "Formación de nuevos empleados y procesos de bienvenida.",
    members: 12,
    courses: 4,
    progress: 78,
    lastActivity: "hace 2 h",
    color: "lesson",
  },
  {
    id: "cs",
    name: "Atención al cliente",
    description: "Procedimientos oficiales y escalados del equipo de soporte.",
    members: 24,
    courses: 6,
    progress: 62,
    lastActivity: "ayer",
    color: "test",
  },
  {
    id: "ops",
    name: "Operaciones",
    description: "SGC, calidad y auditorías internas del equipo de ops.",
    members: 8,
    courses: 3,
    progress: 41,
    lastActivity: "hace 3 días",
    color: "section",
  },
];

const COURSES: CourseAssignment[] = [
  {
    id: "pq",
    title: "Power Query para analistas",
    category: "Datos",
    progress: 62,
    status: "En curso",
    updatedAt: "hace 2 h",
  },
  {
    id: "ia",
    title: "Cómo funciona la IA generativa",
    category: "IA",
    progress: 80,
    status: "En curso",
    updatedAt: "ayer",
  },
  {
    id: "sec",
    title: "Seguridad de la información",
    category: "Seguridad",
    progress: 100,
    status: "Completado",
    updatedAt: "hace 1 sem",
  },
  {
    id: "cs1",
    title: "Atención al cliente nivel 1",
    category: "Onboarding",
    progress: 0,
    status: "Pendiente",
    updatedAt: "asignado hoy",
  },
];

const KNOWLEDGE_STATS: KnowledgeStat[] = [
  { label: "Documentos subidos", value: "34", icon: FileText, tone: "lesson" },
  { label: "Contenidos generados", value: "12", icon: Sparkles, tone: "test" },
  { label: "Revisiones realizadas", value: "48", icon: ShieldCheck, tone: "section" },
  { label: "Sugerencias pendientes", value: "5", icon: Circle, tone: "lesson" },
];

const CONTRIBUTIONS: Contribution[] = [
  {
    id: "c1",
    title: "Protocolo escalado nivel 2.pdf",
    folder: "Atención al cliente / Escalados",
    status: "Aprobado",
    updatedAt: "hace 3 h",
  },
  {
    id: "c2",
    title: "Checklist auditoría interna Q4.docx",
    folder: "Operaciones / SGC",
    status: "En revisión",
    updatedAt: "ayer",
  },
  {
    id: "c3",
    title: "Notas sesión kickoff onboarding.md",
    folder: "Onboarding / General",
    status: "Borrador",
    updatedAt: "hace 2 días",
  },
];

const ACTIVITY: ActivityEvent[] = [
  {
    id: "a1",
    kind: "course",
    text: "Continuaste la lección Merge avanzado en Power Query",
    meta: "62% completado",
    time: "hace 2 h",
  },
  {
    id: "a2",
    kind: "knowledge",
    text: "Subiste Protocolo escalado nivel 2.pdf a Atención al cliente",
    time: "hace 3 h",
  },
  {
    id: "a3",
    kind: "team",
    text: "Añadiste 3 miembros al equipo Onboarding",
    time: "ayer",
  },
  {
    id: "a4",
    kind: "course",
    text: "Completaste el curso Seguridad de la información",
    meta: "Certificado emitido",
    time: "hace 1 sem",
  },
  {
    id: "a5",
    kind: "knowledge",
    text: "Revisaste 4 documentos en Operaciones / SGC",
    time: "hace 1 sem",
  },
];

// ---------- Page ----------
function MyspacePage() {
  return (
    <AppShell topbar={<MyspaceTopbar />}>
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="mx-auto max-w-6xl px-8 py-10">
          <ProfileHeader />
          <CompanySummaryCard company={COMPANY} />
          <TeamsSection teams={TEAMS} />
          <MyCoursesSection courses={COURSES} />
          <KnowledgeContributionSection stats={KNOWLEDGE_STATS} contributions={CONTRIBUTIONS} />
          <RecentActivityTimeline events={ACTIVITY} />
        </div>
      </main>
    </AppShell>
  );
}

function MyspaceTopbar() {
  return (
    <>
      <Link
        to="/"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        Inicio
      </Link>
      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
      <span className="text-sm font-medium text-foreground">Mi espacio</span>
      <span className="ml-2 rounded-md border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        {COMPANY.name}
      </span>
      <div className="ml-auto flex items-center gap-2">
        <Button
          size="sm"
          className="h-8 gap-1.5 bg-lesson text-primary-foreground hover:bg-lesson/90"
        >
          <Plus className="h-3.5 w-3.5" />
          Nuevo grupo
        </Button>
      </div>
    </>
  );
}

// ---------- Header ----------
function ProfileHeader() {
  return (
    <div className="mb-8 flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-lesson-soft text-lesson">
        <UserCircle2 className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Perfil
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
          Mi espacio
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gestiona tu actividad, equipos, cursos y aportaciones dentro de la plataforma.
        </p>
      </div>
    </div>
  );
}

// ---------- Company summary ----------
function CompanySummaryCard({ company }: { company: Company }) {
  const metrics = [
    { label: "Miembros", value: company.members, icon: Users },
    { label: "Equipos", value: company.teams, icon: FolderGit2 },
    { label: "Cursos activos", value: company.activeCourses, icon: GraduationCap },
  ];
  return (
    <section className="mb-10">
      <div className="relative overflow-hidden rounded-xl border border-lesson/30 bg-panel p-6">
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-lesson-soft to-transparent opacity-60" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-lesson text-primary-foreground text-lg font-semibold">
              {company.name.charAt(0)}
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Tu empresa
              </p>
              <div className="mt-0.5 flex items-center gap-2">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  {company.name}
                </h2>
                <span className="rounded-sm bg-lesson-soft px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-lesson">
                  {company.plan}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Tu rol: <span className="text-foreground">{company.role}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {metrics.map((m) => (
              <div key={m.label} className="min-w-[90px]">
                <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  <m.icon className="h-3 w-3" />
                  {m.label}
                </div>
                <p className="mt-1 text-xl font-semibold tracking-tight text-foreground">
                  {m.value}
                </p>
              </div>
            ))}
            <div className="min-w-[90px]">
              <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                <Activity className="h-3 w-3" />
                Estado
              </div>
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-lesson" />
                <p className="text-sm font-medium text-foreground">{company.health}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Teams ----------
function TeamsSection({ teams }: { teams: Team[] }) {
  return (
    <section className="mb-10">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Mis equipos</h2>
          <p className="text-xs text-muted-foreground">
            Grupos a los que perteneces dentro de {COMPANY.name}.
          </p>
        </div>
        <button className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground">
          Ver todos <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>
      {teams.length === 0 ? (
        <EmptyTeams />
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((t) => (
            <TeamCard key={t.id} team={t} />
          ))}
        </div>
      )}
    </section>
  );
}

function TeamCard({ team }: { team: Team }) {
  const toneMap = {
    lesson: "bg-lesson-soft text-lesson",
    test: "bg-test-soft text-test",
    section: "bg-surface text-muted-foreground",
  } as const;
  const barMap = {
    lesson: "bg-lesson",
    test: "bg-test",
    section: "bg-muted-foreground/60",
  } as const;
  return (
    <div className="group flex flex-col rounded-lg border border-border bg-panel p-4 transition-all hover:border-lesson/40 hover:bg-surface/40">
      <div className="mb-3 flex items-start justify-between">
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-md",
            toneMap[team.color],
          )}
        >
          <Users className="h-4 w-4" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-opacity hover:bg-surface hover:text-foreground group-hover:opacity-100"
              aria-label="Acciones del equipo"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>Ver equipo</DropdownMenuItem>
            <DropdownMenuItem>Renombrar</DropdownMenuItem>
            <DropdownMenuItem>Miembros</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              Salir del equipo
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <h3 className="text-sm font-semibold text-foreground">{team.name}</h3>
      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
        {team.description}
      </p>

      <div className="mt-4 flex items-center gap-3 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Users className="h-3 w-3" />
          {team.members}
        </span>
        <span className="inline-flex items-center gap-1">
          <GraduationCap className="h-3 w-3" />
          {team.courses} cursos
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {team.lastActivity}
        </span>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span>Progreso medio</span>
          <span>{team.progress}%</span>
        </div>
        <div className="mt-1 h-1 overflow-hidden rounded-full bg-surface">
          <div
            className={cn("h-full rounded-full", barMap[team.color])}
            style={{ width: `${team.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function EmptyTeams() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-panel/40 p-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-lesson-soft text-lesson">
        <Users className="h-5 w-5" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">Aún no perteneces a ningún equipo</p>
        <p className="text-xs text-muted-foreground">
          Crea tu primer grupo para organizar formaciones y compartir conocimiento.
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="mt-1 h-7 gap-1 border-border bg-panel text-xs"
      >
        <Plus className="h-3.5 w-3.5" />
        Crear tu primer grupo
      </Button>
    </div>
  );
}

// ---------- Courses ----------
function MyCoursesSection({ courses }: { courses: CourseAssignment[] }) {
  return (
    <section className="mb-10">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Mis cursos</h2>
          <p className="text-xs text-muted-foreground">
            Formaciones asignadas a ti dentro de la plataforma.
          </p>
        </div>
        <Link
          to="/cursos"
          className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          Ver todos <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <CourseProgressCard key={c.id} course={c} />
        ))}
      </div>
    </section>
  );
}

function CourseProgressCard({ course }: { course: CourseAssignment }) {
  const statusMap: Record<CourseAssignment["status"], string> = {
    "En curso": "bg-lesson-soft text-lesson",
    Completado: "bg-test-soft text-test",
    Pendiente: "bg-surface text-muted-foreground border border-border",
  };
  const barColor =
    course.status === "Completado"
      ? "bg-test"
      : course.status === "En curso"
        ? "bg-lesson"
        : "bg-muted-foreground/40";
  return (
    <div className="group flex flex-col rounded-lg border border-border bg-panel p-4 transition-all hover:border-lesson/40 hover:bg-surface/40">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-surface text-muted-foreground">
          {course.status === "Completado" ? (
            <Award className="h-4 w-4 text-test" />
          ) : (
            <GraduationCap className="h-4 w-4" />
          )}
        </div>
        <span
          className={cn(
            "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider",
            statusMap[course.status],
          )}
        >
          {course.status}
        </span>
      </div>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {course.category}
      </p>
      <h3 className="mt-1 line-clamp-2 text-sm font-medium text-foreground">{course.title}</h3>

      <div className="mt-4">
        <div className="h-1 overflow-hidden rounded-full bg-surface">
          <div
            className={cn("h-full rounded-full", barColor)}
            style={{ width: `${course.progress}%` }}
          />
        </div>
        <div className="mt-1.5 flex items-center justify-between text-[10px] text-muted-foreground">
          <span>{course.progress}%</span>
          <span>{course.updatedAt}</span>
        </div>
      </div>

      <Link
        to="/cursos/editor"
        className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-lesson opacity-80 transition-opacity hover:opacity-100"
      >
        {course.status === "Completado" ? "Revisar" : course.status === "Pendiente" ? "Empezar" : "Continuar"}
        <ArrowUpRight className="h-3 w-3" />
      </Link>
    </div>
  );
}

// ---------- Knowledge ----------
function KnowledgeContributionSection({
  stats,
  contributions,
}: {
  stats: KnowledgeStat[];
  contributions: Contribution[];
}) {
  return (
    <section className="mb-10">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Brain className="h-3.5 w-3.5 text-muted-foreground" />
            Mi aportación al Knowledge
          </h2>
          <p className="text-xs text-muted-foreground">
            Tu actividad dentro del repositorio de conocimiento de la empresa.
          </p>
        </div>
        <Link
          to="/knowledge"
          className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          Abrir Knowledge <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-border bg-panel p-4"
          >
            <div className="flex items-start justify-between">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {s.label}
              </p>
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded",
                  s.tone === "lesson" && "bg-lesson-soft text-lesson",
                  s.tone === "test" && "bg-test-soft text-test",
                  s.tone === "section" && "bg-surface text-muted-foreground",
                )}
              >
                <s.icon className="h-3.5 w-3.5" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-panel">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <p className="text-xs font-medium text-foreground">Últimas aportaciones</p>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {contributions.length} recientes
          </span>
        </div>
        <ul className="divide-y divide-border">
          {contributions.map((c) => (
            <li
              key={c.id}
              className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-surface/50"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface text-muted-foreground">
                <FileText className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{c.title}</p>
                <p className="truncate text-[11px] text-muted-foreground">{c.folder}</p>
              </div>
              <ContributionStatus status={c.status} />
              <span className="w-20 text-right text-[11px] text-muted-foreground">
                {c.updatedAt}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ContributionStatus({ status }: { status: Contribution["status"] }) {
  const map: Record<Contribution["status"], string> = {
    Aprobado: "bg-lesson-soft text-lesson",
    "En revisión": "bg-test-soft text-test",
    Borrador: "bg-surface text-muted-foreground border border-border",
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

// ---------- Activity ----------
function RecentActivityTimeline({ events }: { events: ActivityEvent[] }) {
  const iconMap: Record<ActivityKind, typeof FileText> = {
    course: GraduationCap,
    knowledge: FileText,
    team: Users,
  };
  const toneMap: Record<ActivityKind, string> = {
    course: "bg-lesson-soft text-lesson",
    knowledge: "bg-test-soft text-test",
    team: "bg-surface text-muted-foreground",
  };
  return (
    <section className="mb-6">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Layers className="h-3.5 w-3.5 text-muted-foreground" />
            Actividad reciente
          </h2>
          <p className="text-xs text-muted-foreground">
            Últimos movimientos en tus cursos, equipos y conocimiento.
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-panel p-4">
        {events.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <CheckCircle2 className="h-6 w-6 text-muted-foreground/60" />
            <p className="text-sm text-muted-foreground">Aún no hay actividad reciente.</p>
          </div>
        ) : (
          <ol className="relative ml-2 border-l border-border">
            {events.map((e) => {
              const Icon = iconMap[e.kind];
              return (
                <li key={e.id} className="relative py-3 pl-6">
                  <span
                    className={cn(
                      "absolute -left-[13px] top-3.5 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-panel",
                      toneMap[e.kind],
                    )}
                  >
                    <Icon className="h-3 w-3" />
                  </span>
                  <p className="text-sm text-foreground">{e.text}</p>
                  <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span>{e.time}</span>
                    {e.meta && (
                      <>
                        <span className="text-muted-foreground/40">·</span>
                        <span>{e.meta}</span>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </section>
  );
}

// Suppress unused-import warning for Building2 (kept for potential future use)
void Building2;
