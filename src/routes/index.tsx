import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  Brain,
  Clock3,
  FileText,
  GraduationCap,
  LayoutGrid,
  MessageSquareText,
  Plus,
  Sparkles,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AppShell } from "@/components/shell/AppShell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Inicio — CRS LAB" },
      {
        name: "description",
        content: "Accede a tu conocimiento, aprendizaje y trabajo reciente en CRS LAB.",
      },
      { property: "og:title", content: "Inicio — CRS LAB" },
      {
        property: "og:description",
        content: "Accede a tu conocimiento, aprendizaje y trabajo reciente en CRS LAB.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HomePage,
});

type QuickAccess = {
  title: string;
  description: string;
  icon: LucideIcon;
  to?: "/knowledge" | "/cursos" | "/mi-espacio";
  badge?: string;
};

const quickAccesses: QuickAccess[] = [
  {
    title: "Knowledge",
    description: "Consulta y organiza el conocimiento",
    icon: Brain,
    to: "/knowledge",
  },
  {
    title: "Asistente",
    description: "Pregunta y trabaja con tu conocimiento",
    icon: MessageSquareText,
  },
  {
    title: "Cursos",
    description: "Aprende y continúa tus cursos",
    icon: GraduationCap,
    to: "/cursos",
  },
  {
    title: "Equipos",
    description: "Colabora con tus equipos",
    icon: Users,
    to: "/mi-espacio",
  },
  {
    title: "Agentes",
    description: "Automatiza tareas y procesos",
    icon: Bot,
    badge: "Nuevo",
  },
];

const recentWork = [
  {
    title: "Política de vacaciones 2026",
    area: "Knowledge",
    detail: "Modificado hace 18 min",
    icon: FileText,
    tone: "knowledge" as const,
    to: "/knowledge" as const,
  },
  {
    title: "Curso de prevención",
    area: "Cursos",
    detail: "64 % completado",
    icon: GraduationCap,
    tone: "course" as const,
    to: "/cursos" as const,
  },
  {
    title: "Análisis de contratos",
    area: "Asistente",
    detail: "Conversación reciente",
    icon: MessageSquareText,
    tone: "assistant" as const,
  },
];

const activity = [
  {
    initials: "LR",
    person: "Laura",
    action: "añadió",
    subject: "Manual de siniestros.pdf",
    time: "hace 22 min",
  },
  {
    initials: "CM",
    person: "Carlos",
    action: "actualizó",
    subject: "Procedimiento de reclamaciones",
    time: "hace 1 h",
  },
  {
    initials: "EQ",
    person: "Equipo",
    action: "te añadió a",
    subject: "Comercial",
    time: "ayer",
  },
];

function HomePage() {
  return (
    <AppShell topbar={<HomeTopbar />}>
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 lg:py-10">
          <header className="mb-8">
            <h1 className="text-2xl font-semibold text-foreground">Inicio</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Todo tu conocimiento, aprendizaje y trabajo en un mismo lugar.
            </p>
          </header>

          <QuickAccessSection />

          <div className="mt-10 grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.8fr)] xl:gap-12">
            <ContinueWorking />
            <div className="space-y-9">
              <RecentActivity />
              <ComingSoon />
            </div>
          </div>
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
            <LayoutGrid className="h-3.5 w-3.5" />
            Explorar cursos
          </Link>
        </Button>
      </div>
    </>
  );
}

function SectionHeading({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-3">
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      {description ? <p className="mt-0.5 text-xs text-muted-foreground">{description}</p> : null}
    </div>
  );
}

function QuickAccessSection() {
  return (
    <section aria-labelledby="quick-access-title">
      <SectionHeading title="Accesos rápidos" description="Entra directamente en las áreas que más utilizas." />
      <div className="grid overflow-hidden rounded-lg border border-border bg-panel sm:grid-cols-2 lg:grid-cols-5">
        {quickAccesses.map((item, index) => (
          <QuickAccessItem key={item.title} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}

function QuickAccessItem({ item, index }: { item: QuickAccess; index: number }) {
  const Icon = item.icon;
  const content = (
    <div
      className={cn(
        "group flex min-h-32 flex-col px-4 py-4 transition-colors hover:bg-surface/60 focus-visible:bg-surface/60",
        index > 0 && "border-t border-border sm:border-t-0",
        index % 2 === 1 && "sm:border-l",
        index > 1 && "sm:border-t",
        index > 0 && "lg:border-l lg:border-t-0",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-lesson-soft text-lesson">
          <Icon className="h-4 w-4" />
        </span>
        {item.badge ? (
          <span className="rounded-sm bg-lesson-soft px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-lesson">
            {item.badge}
          </span>
        ) : (
          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        )}
      </div>
      <p className="mt-3 text-sm font-medium text-foreground">{item.title}</p>
      <p className="mt-1 text-xs leading-4 text-muted-foreground">{item.description}</p>
    </div>
  );

  if (item.to) {
    return (
      <Link to={item.to} className="outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className="text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
      {content}
    </button>
  );
}

function ContinueWorking() {
  return (
    <section aria-labelledby="continue-title">
      <SectionHeading title="Continuar trabajando" description="Vuelve a lo último en lo que estabas trabajando." />
      <div className="overflow-hidden rounded-lg border border-border bg-panel">
        {recentWork.map((item, index) => {
          const Icon = item.icon;
          const row = (
            <div className="group flex min-h-20 items-center gap-3 px-4 py-3 transition-colors hover:bg-surface/60">
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-md",
                  item.tone === "knowledge" && "bg-lesson-soft text-lesson",
                  item.tone === "course" && "bg-test-soft text-test",
                  item.tone === "assistant" && "bg-surface text-muted-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                  <span>{item.area}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.detail}</span>
                </div>
              </div>
              {item.tone === "course" ? (
                <div className="hidden w-24 sm:block">
                  <div className="h-1 overflow-hidden rounded-full bg-surface">
                    <div className="h-full w-2/3 rounded-full bg-test" />
                  </div>
                </div>
              ) : null}
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
            </div>
          );

          return (
            <div key={item.title} className={cn(index > 0 && "border-t border-border")}>
              {item.to ? (
                <Link to={item.to} className="block outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
                  {row}
                </Link>
              ) : (
                <button type="button" className="block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
                  {row}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function RecentActivity() {
  return (
    <section aria-labelledby="activity-title">
      <SectionHeading title="Actividad reciente" />
      <ol className="space-y-4">
        {activity.map((item) => (
          <li key={`${item.person}-${item.subject}`} className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface text-[9px] font-semibold text-muted-foreground">
              {item.initials}
            </span>
            <div className="min-w-0 pt-0.5">
              <p className="text-xs leading-5 text-muted-foreground">
                <span className="font-medium text-foreground">{item.person}</span> {item.action}{" "}
                <span className="font-medium text-foreground">{item.subject}</span>
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                <Clock3 className="h-3 w-3" /> {item.time}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ComingSoon() {
  return (
    <section aria-labelledby="coming-soon-title" className="border-t border-border pt-6">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Próximamente</p>
      <div className="mt-3 flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-lesson-soft text-lesson">
          <Sparkles className="h-4 w-4" />
        </span>
        <div>
          <h2 id="coming-soon-title" className="text-sm font-medium text-foreground">Agentes IA</h2>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Conecta tus herramientas y deja que CRS LAB trabaje por ti.
          </p>
          <span className="mt-2 inline-flex text-[10px] font-medium text-lesson">En preparación</span>
        </div>
      </div>
    </section>
  );
}