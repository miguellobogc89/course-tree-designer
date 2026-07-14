import { useMemo, useState, type ComponentType } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  ChevronRight,
  FileText,
  Folder,
  FolderOpen,
  GitBranch,
  Globe,
  GraduationCap,
  HelpCircle,
  Layers,
  Link2,
  Lightbulb,
  Lock,
  MoreHorizontal,
  Network,
  Plus,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  Users,
  UserCircle2,
  Workflow,
} from "lucide-react";
import { AppShell } from "@/components/shell/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/knowledge")({
  head: () => ({
    meta: [
      { title: "Knowledge — CRS Learning" },
      {
        name: "description",
        content:
          "Explora el conocimiento sintetizado por la IA a partir de tus bibliotecas de documentos.",
      },
    ],
  }),
  component: KnowledgePage,
});

// ---------- Mock data ----------

type Node = {
  id: string;
  name: string;
  children?: Node[];
  docs?: number;
};

const TREE: Node[] = [
  {
    id: "lib-1",
    name: "Nueva biblioteca",
    children: [
      {
        id: "lib-1-1",
        name: "Nueva biblioteca",
        children: [
          {
            id: "revenue-sharing",
            name: "Revenue Sharing",
            children: [
              { id: "2023", name: "2023", docs: 14 },
              { id: "consultas", name: "Consultas", docs: 6 },
            ],
          },
          { id: "lib-1-2", name: "Nueva biblioteca", docs: 3 },
          { id: "lib-1-3", name: "Nueva biblioteca", docs: 5 },
          { id: "test-1", name: "test 1", docs: 2 },
        ],
      },
    ],
  },
];

const VIEWS = [
  { id: "all", label: "Todo", icon: BookOpen, count: 3 },
  { id: "docs", label: "Documentos", icon: FileText, count: 3 },
  { id: "priv", label: "Privados", icon: Shield, count: 2 },
  { id: "pub", label: "Públicos", icon: Globe, count: 1 },
] as const;

// ---------- Page ----------

function KnowledgePage() {
  const [selected, setSelected] = useState<string>("2023");
  const [tab, setTab] = useState<"knowledge" | "documents">("knowledge");
  const selectedName = useMemo(() => findName(TREE, selected) ?? "2023", [selected]);

  return (
    <AppShell topbar={<KnowledgeTopbar name={selectedName} />}>
      <div className="flex min-h-0 flex-1">
        <Explorer selected={selected} onSelect={setSelected} />
        <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-background">
          <ContentHeader name={selectedName} tab={tab} onTab={setTab} />
          <div className="min-h-0 flex-1 overflow-y-auto">
            {tab === "knowledge" ? (
              <KnowledgeDashboard name={selectedName} />
            ) : (
              <DocumentsGrid />
            )}
          </div>
        </main>
      </div>
    </AppShell>
  );
}

function KnowledgeTopbar({ name }: { name: string }) {
  return (
    <>
      <BookOpen className="h-4 w-4 text-lesson" />
      <span className="text-sm font-medium text-foreground">Knowledge</span>
      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">{name}</span>
      <span className="ml-2 inline-flex items-center gap-1 rounded-md border border-lesson/30 bg-lesson-soft px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-lesson">
        <Sparkles className="h-3 w-3" /> Sintetizado por IA
      </span>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-8 gap-1.5 border-border bg-panel text-xs">
          <Plus className="h-3.5 w-3.5" />
          Añadir documento
        </Button>
      </div>
    </>
  );
}

// ---------- Explorer (left panel — same design as screenshot) ----------

function Explorer({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-border bg-sidebar">
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar biblioteca…"
            className="h-8 border-border bg-panel pl-8 text-xs placeholder:text-muted-foreground/70"
          />
        </div>
      </div>

      <div className="px-3">
        <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Vistas
        </p>
        <div className="space-y-0.5">
          {VIEWS.map((v) => (
            <button
              key={v.id}
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-sidebar-foreground/80 hover:bg-surface hover:text-foreground",
                v.id === "all" && "bg-surface text-foreground",
              )}
            >
              <v.icon className="h-3.5 w-3.5" />
              <span className="flex-1 text-left">{v.label}</span>
              <span className="text-[10px] text-muted-foreground">{v.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex min-h-0 flex-1 flex-col px-3">
        <div className="mb-1 flex items-center justify-between px-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Bibliotecas
          </p>
          <button className="text-muted-foreground hover:text-foreground">
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          {TREE.map((n) => (
            <TreeItem key={n.id} node={n} depth={0} selected={selected} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </aside>
  );
}

function TreeItem({
  node,
  depth,
  selected,
  onSelect,
}: {
  node: Node;
  depth: number;
  selected: string;
  onSelect: (id: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const hasChildren = !!node.children?.length;
  const isSelected = selected === node.id;
  return (
    <div>
      <div
        onClick={() => {
          if (hasChildren) setOpen((o) => !o);
          onSelect(node.id);
        }}
        className={cn(
          "group flex cursor-pointer items-center gap-1.5 rounded-md px-1.5 py-1 text-xs text-sidebar-foreground/85 hover:bg-surface hover:text-foreground",
          isSelected && "bg-lesson-soft text-foreground",
        )}
        style={{ paddingLeft: 8 + depth * 12 }}
      >
        {hasChildren ? (
          open ? (
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
          )
        ) : (
          <span className="w-3" />
        )}
        {hasChildren ? (
          open ? (
            <FolderOpen className="h-3.5 w-3.5 text-lesson" />
          ) : (
            <Folder className="h-3.5 w-3.5 text-lesson" />
          )
        ) : (
          <Folder className="h-3.5 w-3.5 text-lesson/80" />
        )}
        <span className="flex-1 truncate">{node.name}</span>
      </div>
      {hasChildren && open && (
        <div>
          {node.children!.map((c) => (
            <TreeItem
              key={c.id}
              node={c}
              depth={depth + 1}
              selected={selected}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function findName(nodes: Node[], id: string): string | undefined {
  for (const n of nodes) {
    if (n.id === id) return n.name;
    if (n.children) {
      const r = findName(n.children, id);
      if (r) return r;
    }
  }
}

// ---------- Content header (breadcrumbs + tabs) ----------

function ContentHeader({
  name,
  tab,
  onTab,
}: {
  name: string;
  tab: "knowledge" | "documents";
  onTab: (t: "knowledge" | "documents") => void;
}) {
  return (
    <div className="border-b border-border bg-panel/40">
      {/* Row 1 — breadcrumb + meta */}
      <div className="flex items-center justify-between gap-4 px-8 pt-3">
        <div className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
          <span className="hover:text-foreground cursor-pointer">Nueva biblioteca</span>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="hover:text-foreground cursor-pointer">Revenue Sharing</span>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="truncate text-foreground">{name}</span>
        </div>
        <div className="flex shrink-0 items-center gap-3 text-[11px] text-muted-foreground">
          <span>Actualizado hace 2 h · por Miguel Lobo</span>
          <button className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-surface hover:text-foreground">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Row 2 — title + chips + inline metrics */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-8 pt-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lesson-soft text-lesson">
            <Lock className="h-4 w-4" />
          </div>
          <h1 className="truncate text-xl font-semibold tracking-tight text-foreground">
            {name}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <Chip>Procedimiento</Chip>
          <Chip icon={Lock}>Privado</Chip>
          <Chip icon={Users} tone="lesson">
            Compartido · 1 equipo
          </Chip>
          <Chip icon={ShieldCheck} tone="lesson">
            Confianza alta
          </Chip>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Metric label="Cobertura" value="95%" tone="lesson" />
          <Metric label="Fusionados" value="6" />
          <Metric label="Referencias" value="8" />
          <Metric label="Contradicciones" value="1" tone="test" />
        </div>
      </div>

      {/* Row 3 — tabs */}
      <div className="mt-3 flex items-center gap-1 px-8">
        <TabBtn active={tab === "knowledge"} onClick={() => onTab("knowledge")} icon={Sparkles}>
          Knowledge
          <span className="ml-1.5 rounded bg-lesson-soft px-1 text-[9px] font-medium uppercase text-lesson">
            IA
          </span>
        </TabBtn>
        <TabBtn active={tab === "documents"} onClick={() => onTab("documents")} icon={FileText}>
          Documents
          <span className="ml-1.5 text-[10px] text-muted-foreground">14</span>
        </TabBtn>
      </div>
    </div>
  );
}

function Chip({
  children,
  icon: Icon,
  tone,
}: {
  children: React.ReactNode;
  icon?: ComponentType<{ className?: string }>;
  tone?: "lesson";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px]",
        tone === "lesson"
          ? "border-lesson/30 bg-lesson-soft text-lesson"
          : "border-border bg-panel text-muted-foreground",
      )}
    >
      {Icon && <Icon className="h-3 w-3" />}
      {children}
    </span>
  );
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "lesson" | "test";
}) {
  return (
    <div className="flex items-baseline gap-1.5 rounded-md border border-border bg-panel px-2.5 py-1">
      <span
        className={cn(
          "text-sm font-semibold tabular-nums",
          tone === "lesson" && "text-lesson",
          tone === "test" && "text-test",
          !tone && "text-foreground",
        )}
      >
        {value}
      </span>
      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</span>
    </div>
  );
}

function KnowledgeDashboard({ name: _name }: { name: string }) {
  return (
    <div className="mx-auto max-w-5xl px-8 py-8">
      {/* Sections */}
      <div className="space-y-3">

        <Section
          icon={Workflow}
          title="Procesos detectados"
          count={6}
          tone="lesson"
          defaultOpen
        >
          <ProcessList />
        </Section>

        <Section icon={Lightbulb} title="Conceptos clave" count={32} tone="lesson">
          <ConceptCloud />
        </Section>

        <Section icon={UserCircle2} title="Roles y responsables" count={5} tone="section">
          <RolesList />
        </Section>

        <Section icon={ShieldCheck} title="Normativa y reglas" count={9} tone="section">
          <RulesList />
        </Section>

        <Section icon={GitBranch} title="Relaciones con otras áreas" count={4} tone="section">
          <RelationsList />
        </Section>

        <Section icon={AlertTriangle} title="Riesgos y contradicciones detectadas" count={2} tone="test">
          <RisksList />
        </Section>

        <Section icon={HelpCircle} title="Preguntas frecuentes" count={7} tone="lesson">
          <FaqList />
        </Section>

        <Section icon={GraduationCap} title="Cursos sugeridos" count={3} tone="lesson">
          <SuggestedCourses />
        </Section>

        <Section icon={Link2} title="Fuentes utilizadas" count={14} tone="section">
          <SourcesList />
        </Section>
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone: "lesson" | "test" | "section";
}) {
  return (
    <div className="rounded-xl border border-border bg-panel p-3">
      <div
        className={cn(
          "mb-2 flex h-6 w-6 items-center justify-center rounded-md",
          tone === "lesson" && "bg-lesson-soft text-lesson",
          tone === "test" && "bg-test-soft text-test",
          tone === "section" && "bg-surface text-muted-foreground",
        )}
      >
        <Icon className="h-3.5 w-3.5" />
      </div>
      <p className="text-lg font-semibold tracking-tight text-foreground">{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  count,
  tone,
  defaultOpen = false,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  count: number;
  tone: "lesson" | "test" | "section";
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-panel">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-surface/40"
      >
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg",
            tone === "lesson" && "bg-lesson-soft text-lesson",
            tone === "test" && "bg-test-soft text-test",
            tone === "section" && "bg-surface text-muted-foreground",
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold tracking-tight text-foreground">{title}</p>
        </div>
        <span className="rounded-md border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          {count}
        </span>
        {open ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      {open && <div className="border-t border-border p-4">{children}</div>}
    </div>
  );
}

// ---------- Section contents ----------

function ProcessList() {
  const items = [
    {
      title: "Alta de acuerdo de Revenue Sharing",
      steps: 7,
      owner: "Legal · Finanzas",
      confidence: "Alta",
    },
    {
      title: "Cálculo trimestral de repartos",
      steps: 5,
      owner: "Finanzas",
      confidence: "Alta",
    },
    {
      title: "Conciliación con partner externo",
      steps: 4,
      owner: "Operaciones",
      confidence: "Media",
    },
    {
      title: "Resolución de disputas",
      steps: 6,
      owner: "Legal",
      confidence: "Media",
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      {items.map((p) => (
        <div
          key={p.title}
          className="group flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-background p-3 transition-colors hover:border-lesson/40"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-lesson-soft text-lesson">
            <Workflow className="h-3.5 w-3.5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">{p.title}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              {p.steps} pasos · {p.owner}
            </p>
          </div>
          <span
            className={cn(
              "rounded px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider",
              p.confidence === "Alta"
                ? "bg-lesson-soft text-lesson"
                : "bg-test-soft text-test",
            )}
          >
            {p.confidence}
          </span>
        </div>
      ))}
    </div>
  );
}

function ConceptCloud() {
  const concepts = [
    { t: "Revenue Share", n: 42 },
    { t: "Partner", n: 31 },
    { t: "Trimestre fiscal", n: 24 },
    { t: "Split ratio", n: 22 },
    { t: "Cláusula MFN", n: 18 },
    { t: "Deducciones", n: 17 },
    { t: "Baseline", n: 15 },
    { t: "Conciliación", n: 14 },
    { t: "Reporting", n: 12 },
    { t: "Umbral mínimo", n: 9 },
    { t: "Retención", n: 7 },
    { t: "Auditoría", n: 6 },
  ];
  return (
    <div className="flex flex-wrap gap-1.5">
      {concepts.map((c) => (
        <span
          key={c.t}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs text-foreground transition-colors hover:border-lesson/50 hover:bg-lesson-soft"
        >
          {c.t}
          <span className="text-[10px] text-muted-foreground">{c.n}</span>
        </span>
      ))}
    </div>
  );
}

function RolesList() {
  const roles = [
    { r: "Responsable financiero", who: "CFO · Finanzas", tasks: 4 },
    { r: "Legal counsel", who: "Legal", tasks: 3 },
    { r: "Partner manager", who: "Operaciones", tasks: 5 },
    { r: "Data steward", who: "BI", tasks: 2 },
    { r: "Auditor interno", who: "Compliance", tasks: 2 },
  ];
  return (
    <div className="divide-y divide-border">
      {roles.map((r) => (
        <div key={r.r} className="flex items-center gap-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface text-xs font-medium text-foreground">
            {r.r.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">{r.r}</p>
            <p className="text-[11px] text-muted-foreground">{r.who}</p>
          </div>
          <span className="text-[11px] text-muted-foreground">{r.tasks} responsabilidades</span>
        </div>
      ))}
    </div>
  );
}

function RulesList() {
  const rules = [
    "El split base es 70/30 salvo pacto expreso en contrato.",
    "Todo cambio de ratio requiere aprobación de Legal y Finanzas.",
    "Los reportes trimestrales se cierran el día 10 del mes siguiente.",
    "Las deducciones se aplican antes del cálculo del share.",
  ];
  return (
    <ul className="space-y-2">
      {rules.map((r) => (
        <li key={r} className="flex items-start gap-2 text-sm text-foreground">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lesson" />
          <span>{r}</span>
        </li>
      ))}
    </ul>
  );
}

function RelationsList() {
  const rel = [
    { area: "Contratos comerciales", strength: 92 },
    { area: "Facturación y cobros", strength: 78 },
    { area: "Compliance fiscal", strength: 61 },
    { area: "Data warehouse", strength: 44 },
  ];
  return (
    <div className="space-y-3">
      {rel.map((r) => (
        <div key={r.area}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-foreground">{r.area}</span>
            <span className="text-muted-foreground">{r.strength}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-surface">
            <div
              className="h-full rounded-full bg-lesson"
              style={{ width: `${r.strength}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function RisksList() {
  const risks = [
    {
      title: "Contradicción en el split por defecto",
      desc: "Contrato 2023 indica 70/30, memorandum de mayo indica 65/35.",
      sources: ["Contrato_Master_2023.pdf", "Memo_Mayo.docx"],
    },
    {
      title: "Fecha de corte ambigua",
      desc: "Dos documentos definen el cierre trimestral en fechas distintas.",
      sources: ["Politica_Reporting.pdf", "SOP_Finanzas.md"],
    },
  ];
  return (
    <div className="space-y-2">
      {risks.map((r) => (
        <div
          key={r.title}
          className="rounded-lg border border-test/30 bg-test-soft/40 p-3"
        >
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4 text-test" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{r.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{r.desc}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {r.sources.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground"
                  >
                    <FileText className="h-2.5 w-2.5" />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FaqList() {
  const faqs = [
    "¿Cómo se calcula el split trimestral?",
    "¿Qué documentos justifican una deducción?",
    "¿Quién aprueba los cambios de ratio?",
    "¿Cuándo se cierra el trimestre fiscal?",
  ];
  return (
    <div className="divide-y divide-border">
      {faqs.map((q) => (
        <button
          key={q}
          className="group flex w-full items-center justify-between gap-3 py-2.5 text-left"
        >
          <span className="flex items-center gap-2 text-sm text-foreground">
            <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
            {q}
          </span>
          <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </button>
      ))}
    </div>
  );
}

function SuggestedCourses() {
  const items = [
    { t: "Fundamentos de Revenue Sharing", mins: 45, level: "Inicial" },
    { t: "Cierre trimestral en Finanzas", mins: 30, level: "Intermedio" },
    { t: "Interpretación de contratos MFN", mins: 25, level: "Avanzado" },
  ];
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
      {items.map((c) => (
        <div
          key={c.t}
          className="group cursor-pointer rounded-lg border border-border bg-background p-3 transition-colors hover:border-lesson/40"
        >
          <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-md bg-lesson-soft text-lesson">
            <GraduationCap className="h-3.5 w-3.5" />
          </div>
          <p className="text-sm font-medium text-foreground">{c.t}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {c.mins} min · {c.level}
          </p>
        </div>
      ))}
    </div>
  );
}

function SourcesList() {
  const src = [
    "Contrato_Master_2023.pdf",
    "Memo_Mayo.docx",
    "Politica_Reporting.pdf",
    "SOP_Finanzas.md",
    "Anexo_Partners_Q2.xlsx",
    "Auditoria_Interna_2023.pdf",
  ];
  return (
    <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
      {src.map((s) => (
        <div
          key={s}
          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-surface/60 hover:text-foreground"
        >
          <FileText className="h-3.5 w-3.5 text-lesson" />
          <span className="truncate">{s}</span>
        </div>
      ))}
    </div>
  );
}

// ---------- Documents tab (existing-style grid) ----------

function DocumentsGrid() {
  const folders = [
    { name: "Contratos", items: 4 },
    { name: "Reportes trimestrales", items: 6 },
    { name: "Memos internos", items: 3 },
  ];
  const files = [
    { name: "Contrato_Master_2023.pdf", type: "PDF", size: "1.2 MB" },
    { name: "Memo_Mayo.docx", type: "DOCX", size: "84 KB" },
    { name: "Politica_Reporting.pdf", type: "PDF", size: "420 KB" },
    { name: "SOP_Finanzas.md", type: "MD", size: "12 KB" },
    { name: "Anexo_Partners_Q2.xlsx", type: "XLSX", size: "230 KB" },
    { name: "Auditoria_Interna_2023.pdf", type: "PDF", size: "980 KB" },
  ];
  return (
    <div className="mx-auto max-w-5xl px-8 py-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar en esta carpeta…"
            className="h-8 border-border bg-panel pl-8 text-xs"
          />
        </div>
        <Button size="sm" className="h-8 gap-1.5 bg-lesson text-primary-foreground hover:bg-lesson/90">
          <Plus className="h-3.5 w-3.5" />
          Subir documento
        </Button>
      </div>

      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        Subcarpetas
      </p>
      <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-3">
        {folders.map((f) => (
          <div
            key={f.name}
            className="group flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-panel p-3 transition-colors hover:border-lesson/40"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-lesson-soft text-lesson">
              <Folder className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{f.name}</p>
              <p className="text-[11px] text-muted-foreground">{f.items} elementos</p>
            </div>
            <MoreHorizontal className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100" />
          </div>
        ))}
      </div>

      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        Documentos
      </p>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {files.map((f) => (
          <div
            key={f.name}
            className="group cursor-pointer rounded-lg border border-border bg-panel p-3 transition-colors hover:border-lesson/40"
          >
            <div className="mb-2 flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-surface text-muted-foreground">
                <FileText className="h-4 w-4" />
              </div>
              <span className="rounded border border-border bg-background px-1.5 py-0.5 text-[9px] font-semibold uppercase text-muted-foreground">
                {f.type}
              </span>
            </div>
            <p className="line-clamp-2 text-sm font-medium text-foreground">{f.name}</p>
            <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Layers className="h-3 w-3" />
                {f.size}
              </span>
              <MoreHorizontal className="h-4 w-4 opacity-0 group-hover:opacity-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
