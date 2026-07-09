import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  Brain,
  GraduationCap,
  Home,
  Inbox,
  LayoutGrid,
  Moon,
  Settings,
  Sun,
  UserCircle2,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface AppShellProps {
  topbar?: ReactNode;
  children: ReactNode;
}

export function AppShell({ topbar, children }: AppShellProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar>{topbar}</Topbar>
          <div className="flex min-h-0 flex-1">{children}</div>
        </div>
      </div>
    </TooltipProvider>
  );
}

function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = [
    { icon: Home, label: "Inicio", to: "/" },
    { icon: GraduationCap, label: "Cursos", to: "/cursos" },
    { icon: Brain, label: "Knowledge", to: "/knowledge" },
    { icon: LayoutGrid, label: "Plantillas", to: "/plantillas" },
    { icon: Inbox, label: "Bandeja", to: "/bandeja" },
  ];
  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(to + "/");
  return (
    <aside className="flex h-full w-14 shrink-0 flex-col items-center justify-between border-r border-sidebar-border bg-sidebar py-3">
      <div className="flex flex-col items-center gap-1">
        <Link
          to="/"
          className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-lesson/15 text-lesson"
        >
          <BookOpen className="h-4 w-4" />
        </Link>
        {items.map((it) => (
          <Tooltip key={it.label}>
            <TooltipTrigger asChild>
              <Link
                to={it.to}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-md text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground",
                  isActive(it.to) && "bg-sidebar-accent text-sidebar-foreground",
                )}
              >
                <it.icon className="h-[18px] w-[18px]" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{it.label}</TooltipContent>
          </Tooltip>
        ))}
      </div>
      <button className="flex h-9 w-9 items-center justify-center rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground">
        <Settings className="h-[18px] w-[18px]" />
      </button>
    </aside>
  );
}

function Topbar({ children }: { children?: ReactNode }) {
  const [dark, setDark] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark"),
  );
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  return (
    <header className="flex h-12 shrink-0 items-center gap-3 border-b border-border bg-sidebar/60 px-4">
      <div className="flex min-w-0 flex-1 items-center gap-3">{children}</div>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => setDark((d) => !d)}
            aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom">{dark ? "Modo claro" : "Modo oscuro"}</TooltipContent>
      </Tooltip>
    </header>
  );
}
