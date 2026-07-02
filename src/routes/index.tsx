import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  Clock,
  Compass,
  FileText,
  FlaskConical,
  GraduationCap,
  Plus,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { AppShell } from "@/components/shell/AppShell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Inicio — CRS Learning" },
      {
        name: "description",
        content:
          "Panel de inicio de CRS Learning: continúa tus cursos, descubre conocimiento público y accede a la formación privada de tu empresa.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <AppShell topbar={<HomeTopbar />}>
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="mx-auto max-w-6xl px-8 py-10">
          <Header />
          <Stats />
          <ContinueLearning />
          <TwoColumn />
        </div>
      </main>
    </AppShell>
  );
}

function HomeTopbar() {
  return (
    <>
      <span className="text-sm font-medium text-foreground">Inicio</span>
      <span className="ml-2 rounded-md border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        Workspace · Acme
      </span>
      <div className="ml-auto flex items-center gap-2">
        <Button asChild size="sm" className="h-8 gap-1.5 bg-lesson text-primary-foreground hover:bg-lesson/90">
          <Link to="/cursos">
            <Compass className="h-3.5 w-3.5" />
            Explorar cursos
          </Link>
        </Button>
      </div>
    </>
  );
}

function Header() {
  return (
    <div className="mb-8">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        Bienvenido de vuelta
      </p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
        Hola Laura 👋
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Continúa donde lo dejaste o explora nuevo conocimiento del catálogo.
      </p>
    </div>
  );
}

function Stats() {
  const items = [
    { label: "Cursos en progreso", value: "4", icon: BookOpen, tone: "lesson" as const },
    { label: "Completados", value: "12", icon: GraduationCap, tone: "test" as const },
    { label: "Horas este mes", value: "6.5h", icon: Clock, tone: "section" as const },
    { label: "Racha", value: "9 días", icon: TrendingUp, tone: "lesson" as const },
  ];
  return (
    <div className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-4">
      {items.map((it) => (
        <div
          key={it.label}
          className="rounded-lg border border-border bg-panel p-4 transition-colors hover:border-border/80"
        >
          <div className="flex items-start justify-between">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {it.label}
            </p>
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded",
                it.tone === "lesson" && "bg-lesson-soft text-lesson",
                it.tone === "test" && "bg-test-soft text-test",
                it.tone === "section" && "bg-surface text-muted-foreground",
              )}
            >
              <it.icon className="h-3.5 w-3.5" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{it.value}</p>
        </div>
      ))}
    </div>
  );
}

function ContinueLearning() {
  const items = [
    {
      title: "Power Query · Merge avanzado",
      course: "Power Query para analistas",
      type: "lesson" as const,
      progress: 62,
      scope: "private" as const,
    },
    {
      title: "Test: Atención al cliente nivel 1",
      course: "Atención al cliente — Acme",
      type: "test" as const,
      progress: 30,
      scope: "private" as const,
    },
    {
      title: "Cómo funciona la IA generativa",
      course: "Fundamentos de IA",
      type: "lesson" as const,
      progress: 80,
      scope: "public" as const,
    },
  ];
  return (
    <section className="mb-10">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Continuar aprendiendo</h2>
          <p className="text-xs text-muted-foreground">Retoma justo donde lo dejaste.</p>
        </div>
        <Link
          to="/cursos"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          Ver todos <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {items.map((it) => (
          <div
            key={it.title}
            className="group cursor-pointer rounded-lg border border-border bg-panel p-4 transition-all hover:border-lesson/40 hover:bg-surface/40"
          >
            <div className="mb-3 flex items-center gap-2">
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded",
                  it.type === "lesson" ? "bg-lesson-soft text-lesson" : "bg-test-soft text-test",
                )}
              >
                {it.type === "lesson" ? (
                  <FileText className="h-3.5 w-3.5" />
                ) : (
                  <FlaskConical className="h-3.5 w-3.5" />
                )}
              </span>
              <ScopeChip scope={it.scope} />
            </div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {it.course}
            </p>
            <p className="mt-1 line-clamp-2 text-sm font-medium text-foreground">{it.title}</p>
            <div className="mt-4">
              <div className="h-1 overflow-hidden rounded-full bg-surface">
                <div
                  className={cn(
                    "h-full rounded-full",
                    it.type === "lesson" ? "bg-lesson" : "bg-test",
                  )}
                  style={{ width: `${it.progress}%` }}
                />
              </div>
              <p className="mt-1.5 text-[10px] text-muted-foreground">{it.progress}% completado</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TwoColumn() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <h2 className="mb-3 text-sm font-semibold text-foreground">Descubrir</h2>
        <div className="space-y-2">
          {[
            {
              title: "Cómo funciona la IA generativa",
              desc: "Fundamentos y casos de uso reales.",
              icon: Sparkles,
              scope: "public" as const,
            },
            {
              title: "Onboarding Acme — Procesos internos",
              desc: "Formación oficial para nuevos empleados.",
              icon: Building2,
              scope: "private" as const,
            },
            {
              title: "Seguridad de la información",
              desc: "Buenas prácticas y protocolos.",
              icon: BookOpen,
              scope: "public" as const,
            },
          ].map((it) => (
            <div
              key={it.title}
              className="group flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-panel px-4 py-3 transition-colors hover:bg-surface/40"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-surface text-muted-foreground group-hover:text-foreground">
                <it.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-foreground">{it.title}</p>
                  <ScopeChip scope={it.scope} />
                </div>
                <p className="truncate text-xs text-muted-foreground">{it.desc}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
      <aside>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Acciones rápidas</h2>
        <div className="space-y-2">
          <QuickAction
            icon={Plus}
            title="Crear un curso"
            desc="Empieza desde cero"
            to="/cursos/editor"
          />
          <QuickAction icon={Users} title="Invitar equipo" desc="Comparte el workspace" />
          <QuickAction icon={Compass} title="Catálogo público" desc="Conocimiento abierto" to="/cursos" />
        </div>
      </aside>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  title,
  desc,
  to,
}: {
  icon: typeof Plus;
  title: string;
  desc: string;
  to?: string;
}) {
  const inner = (
    <div className="group flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-panel px-4 py-3 transition-colors hover:bg-surface/40">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-lesson-soft text-lesson">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
  return to ? <Link to={to}>{inner}</Link> : inner;
}

function ScopeChip({ scope }: { scope: "public" | "private" }) {
  return (
    <span
      className={cn(
        "inline-flex h-4 items-center gap-1 rounded-sm px-1.5 text-[9px] font-medium uppercase tracking-wider",
        scope === "public"
          ? "bg-lesson-soft text-lesson"
          : "bg-test-soft text-test",
      )}
    >
      {scope === "public" ? "Público" : "Privado"}
    </span>
  );
}
