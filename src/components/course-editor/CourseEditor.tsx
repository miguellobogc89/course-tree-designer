import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronRight,
  FileText,
  FlaskConical,
  Folder,
  FolderOpen,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
  Copy,
  ChevronLeft,
  Save,
  Eye,
  GripVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppShell } from "@/components/shell/AppShell";
import { cn } from "@/lib/utils";


// ---------- Types ----------

type NodeType = "section" | "lesson" | "test";

interface TreeNode {
  id: string;
  type: NodeType;
  title: string;
  children?: TreeNode[];
}

// ---------- Seed data ----------

const initialTree: TreeNode[] = [
  {
    id: "s1",
    type: "section",
    title: "Introducción",
    children: [
      { id: "l1", type: "lesson", title: "¿Qué es Power Query?" },
      { id: "l2", type: "lesson", title: "Primer contacto" },
      { id: "t1", type: "test", title: "Test inicial" },
    ],
  },
  {
    id: "s2",
    type: "section",
    title: "Limpieza de datos",
    children: [
      { id: "l3", type: "lesson", title: "Cambiar tipos" },
      { id: "l4", type: "lesson", title: "Eliminar columnas" },
      { id: "t2", type: "test", title: "Test limpieza" },
    ],
  },
  {
    id: "s3",
    type: "section",
    title: "Merge",
    children: [
      { id: "l5", type: "lesson", title: "Left Join" },
      { id: "l6", type: "lesson", title: "Inner Join" },
    ],
  },
];

// ---------- Root component ----------

export function CourseEditor() {
  return (
    <AppShell topbar={<EditorTopbar />}>
      <CourseWorkspace />
    </AppShell>
  );
}

function EditorTopbar() {
  return (
    <>
      <Link
        to="/cursos"
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Cursos
      </Link>
      <span className="text-muted-foreground/50">/</span>
      <span className="text-sm font-medium text-foreground">Power Query</span>
      <span className="ml-2 rounded-md border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        Borrador
      </span>
      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1.5 text-muted-foreground hover:text-foreground"
        >
          <Eye className="h-3.5 w-3.5" />
          Previsualizar
        </Button>
        <Button
          size="sm"
          className="h-8 gap-1.5 bg-lesson text-primary-foreground hover:bg-lesson/90"
        >
          <Save className="h-3.5 w-3.5" />
          Guardar
        </Button>
      </div>
    </>
  );
}


// ---------- Workspace: tree + editor ----------

function CourseWorkspace() {
  const [tree, setTree] = useState<TreeNode[]>(initialTree);
  const [selectedId, setSelectedId] = useState<string | null>("l1");

  const selected = useMemo(() => findNode(tree, selectedId), [tree, selectedId]);
  const selectedSectionId = useMemo(() => {
    if (!selectedId) return null;
    for (const s of tree) {
      if (s.id === selectedId) return s.id;
      if (s.children?.some((c) => c.id === selectedId)) return s.id;
    }
    return null;
  }, [tree, selectedId]);

  // --- mutations ---
  const addSection = () => {
    const id = crypto.randomUUID();
    setTree((t) => [...t, { id, type: "section", title: "Nueva sección", children: [] }]);
    setSelectedId(id);
  };
  const addChild = (type: "lesson" | "test") => {
    if (!selectedSectionId) return;
    const id = crypto.randomUUID();
    setTree((t) =>
      t.map((s) =>
        s.id === selectedSectionId
          ? {
              ...s,
              children: [
                ...(s.children ?? []),
                { id, type, title: type === "lesson" ? "Nueva lección" : "Nuevo test" },
              ],
            }
          : s,
      ),
    );
    setSelectedId(id);
  };
  const renameNode = (id: string, title: string) => {
    setTree((t) =>
      t.map((s) => ({
        ...s,
        title: s.id === id ? title : s.title,
        children: s.children?.map((c) => (c.id === id ? { ...c, title } : c)),
      })),
    );
  };
  const deleteNode = (id: string) => {
    setTree((t) =>
      t
        .filter((s) => s.id !== id)
        .map((s) => ({ ...s, children: s.children?.filter((c) => c.id !== id) })),
    );
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <div className="flex min-h-0 flex-1">
      <TreePanel
        tree={tree}
        selectedId={selectedId}
        selectedSectionId={selectedSectionId}
        onSelect={setSelectedId}
        onAddSection={addSection}
        onAddChild={addChild}
        onRename={renameNode}
        onDelete={deleteNode}
      />
      <EditorPanel node={selected} onRename={renameNode} />
    </div>
  );
}

function findNode(tree: TreeNode[], id: string | null): TreeNode | null {
  if (!id) return null;
  for (const s of tree) {
    if (s.id === id) return s;
    const c = s.children?.find((x) => x.id === id);
    if (c) return c;
  }
  return null;
}

// ---------- Tree panel ----------

interface TreePanelProps {
  tree: TreeNode[];
  selectedId: string | null;
  selectedSectionId: string | null;
  onSelect: (id: string) => void;
  onAddSection: () => void;
  onAddChild: (type: "lesson" | "test") => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

function TreePanel({
  tree,
  selectedId,
  selectedSectionId,
  onSelect,
  onAddSection,
  onAddChild,
  onRename,
  onDelete,
}: TreePanelProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState("");
  const [renamingId, setRenamingId] = useState<string | null>(null);

  const toggle = (id: string) => setCollapsed((c) => ({ ...c, [id]: !c[id] }));

  const filtered = useMemo(() => {
    if (!query.trim()) return tree;
    const q = query.toLowerCase();
    return tree
      .map((s) => {
        const kids = s.children?.filter((c) => c.title.toLowerCase().includes(q)) ?? [];
        if (s.title.toLowerCase().includes(q) || kids.length) {
          return { ...s, children: kids.length ? kids : s.children };
        }
        return null;
      })
      .filter(Boolean) as TreeNode[];
  }, [tree, query]);

  const canAddChild = Boolean(selectedSectionId);

  return (
    <aside className="flex h-full w-[300px] shrink-0 flex-col border-r border-border bg-panel">
      {/* Header */}
      <div className="flex items-center justify-between px-3 pt-3 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Contenido
          </span>
          <span className="rounded bg-surface px-1.5 py-0.5 text-[10px] text-muted-foreground">
            {tree.length}
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              className="h-7 gap-1 rounded-md bg-lesson px-2 text-xs font-medium text-primary-foreground hover:bg-lesson/90"
            >
              <Plus className="h-3.5 w-3.5" />
              Añadir
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Crear nuevo
            </DropdownMenuLabel>
            <DropdownMenuItem onSelect={onAddSection} className="gap-2">
              <Folder className="h-4 w-4 text-section" />
              <span>Nueva sección</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={!canAddChild}
              onSelect={() => onAddChild("lesson")}
              className="gap-2"
            >
              <FileText className="h-4 w-4 text-lesson" />
              <div className="flex flex-1 flex-col">
                <span>Nueva lección</span>
                {!canAddChild && (
                  <span className="text-[10px] text-muted-foreground">Selecciona una sección</span>
                )}
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={!canAddChild}
              onSelect={() => onAddChild("test")}
              className="gap-2"
            >
              <FlaskConical className="h-4 w-4 text-test" />
              <div className="flex flex-1 flex-col">
                <span>Nuevo test</span>
                {!canAddChild && (
                  <span className="text-[10px] text-muted-foreground">Selecciona una sección</span>
                )}
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Search */}
      <div className="px-3 pb-2">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar…"
            className="h-7 border-border bg-surface pl-7 text-xs placeholder:text-muted-foreground/70 focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-y-auto px-2 pb-3">
        {filtered.length === 0 ? (
          <EmptyTree onAdd={onAddSection} />
        ) : (
          <ul className="flex flex-col gap-0.5">
            {filtered.map((section) => (
              <SectionRow
                key={section.id}
                node={section}
                collapsed={!!collapsed[section.id]}
                onToggle={() => toggle(section.id)}
                selectedId={selectedId}
                onSelect={onSelect}
                onDelete={onDelete}
                renamingId={renamingId}
                setRenamingId={setRenamingId}
                onRename={onRename}
              />
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}

// ---------- Section + item rows ----------

interface SectionRowProps {
  node: TreeNode;
  collapsed: boolean;
  onToggle: () => void;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  renamingId: string | null;
  setRenamingId: (id: string | null) => void;
  onRename: (id: string, title: string) => void;
}

function SectionRow({
  node,
  collapsed,
  onToggle,
  selectedId,
  onSelect,
  onDelete,
  renamingId,
  setRenamingId,
  onRename,
}: SectionRowProps) {
  const selected = selectedId === node.id;
  return (
    <li>
      <Row
        selected={selected}
        onSelect={() => onSelect(node.id)}
        onDoubleClick={onToggle}
        icon={
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className="flex h-4 w-4 items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <ChevronRight
              className={cn("h-3.5 w-3.5 transition-transform", !collapsed && "rotate-90")}
            />
          </button>
        }
        leftIcon={
          collapsed ? (
            <Folder className="h-3.5 w-3.5 text-section" />
          ) : (
            <FolderOpen className="h-3.5 w-3.5 text-section" />
          )
        }
        title={node.title}
        isRenaming={renamingId === node.id}
        onRenameCommit={(v) => {
          onRename(node.id, v || node.title);
          setRenamingId(null);
        }}
        onRenameCancel={() => setRenamingId(null)}
        boldTitle
        menu={
          <ItemMenu
            onRename={() => setRenamingId(node.id)}
            onDelete={() => onDelete(node.id)}
          />
        }
      />
      {!collapsed && node.children && node.children.length > 0 && (
        <ul className="relative ml-[15px] mt-0.5 flex flex-col gap-0.5 border-l border-border/70 pl-2">
          {node.children.map((child) => (
            <li key={child.id}>
              <Row
                selected={selectedId === child.id}
                onSelect={() => onSelect(child.id)}
                leftIcon={
                  child.type === "lesson" ? (
                    <FileText className="h-3.5 w-3.5 text-lesson" />
                  ) : (
                    <FlaskConical className="h-3.5 w-3.5 text-test" />
                  )
                }
                title={child.title}
                accent={child.type === "lesson" ? "lesson" : "test"}
                isRenaming={renamingId === child.id}
                onRenameCommit={(v) => {
                  onRename(child.id, v || child.title);
                  setRenamingId(null);
                }}
                onRenameCancel={() => setRenamingId(null)}
                menu={
                  <ItemMenu
                    onRename={() => setRenamingId(child.id)}
                    onDelete={() => onDelete(child.id)}
                  />
                }
              />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

interface RowProps {
  selected: boolean;
  onSelect: () => void;
  onDoubleClick?: () => void;
  icon?: React.ReactNode;
  leftIcon: React.ReactNode;
  title: string;
  boldTitle?: boolean;
  accent?: "lesson" | "test";
  isRenaming: boolean;
  onRenameCommit: (v: string) => void;
  onRenameCancel: () => void;
  menu: React.ReactNode;
}

function Row({
  selected,
  onSelect,
  onDoubleClick,
  icon,
  leftIcon,
  title,
  boldTitle,
  accent,
  isRenaming,
  onRenameCommit,
  onRenameCancel,
  menu,
}: RowProps) {
  return (
    <div
      onClick={onSelect}
      onDoubleClick={onDoubleClick}
      className={cn(
        "group/row relative flex h-7 cursor-pointer items-center gap-1.5 rounded-md px-1.5 text-[13px] leading-none transition-colors",
        "text-panel-foreground/85 hover:bg-surface-hover",
        selected && "bg-surface text-foreground",
        selected && accent === "lesson" && "bg-lesson-soft text-foreground ring-1 ring-lesson/40",
        selected && accent === "test" && "bg-test-soft text-foreground ring-1 ring-test/40",
      )}
    >
      {/* drag handle placeholder (visual only for future d&d) */}
      <span className="pointer-events-none flex h-4 w-3 items-center justify-center text-muted-foreground/0 group-hover/row:text-muted-foreground/50">
        <GripVertical className="h-3 w-3" />
      </span>

      {icon ?? <span className="w-4" />}
      <span className="flex h-4 w-4 shrink-0 items-center justify-center">{leftIcon}</span>

      {isRenaming ? (
        <input
          autoFocus
          defaultValue={title}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === "Enter") onRenameCommit((e.target as HTMLInputElement).value);
            if (e.key === "Escape") onRenameCancel();
          }}
          onBlur={(e) => onRenameCommit(e.target.value)}
          className="h-6 flex-1 rounded-sm border border-ring/50 bg-background px-1.5 text-[13px] outline-none"
        />
      ) : (
        <span className={cn("min-w-0 flex-1 truncate", boldTitle && "font-medium")}>{title}</span>
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        className="opacity-0 transition-opacity group-hover/row:opacity-100 data-[open=true]:opacity-100"
      >
        {menu}
      </div>
    </div>
  );
}

function ItemMenu({ onRename, onDelete }: { onRename: () => void; onDelete: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-surface hover:text-foreground">
          <MoreHorizontal className="h-3.5 w-3.5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onSelect={onRename} className="gap-2 text-xs">
          <Pencil className="h-3.5 w-3.5" />
          Renombrar
        </DropdownMenuItem>
        <DropdownMenuItem disabled className="gap-2 text-xs">
          <Copy className="h-3.5 w-3.5" />
          Duplicar
          <span className="ml-auto text-[10px] text-muted-foreground">próximamente</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={onDelete}
          className="gap-2 text-xs text-destructive focus:text-destructive"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function EmptyTree({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="mx-2 mt-8 flex flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-surface/40 p-6 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-lesson-soft text-lesson">
        <Folder className="h-5 w-5" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium">Curso vacío</p>
        <p className="text-xs text-muted-foreground">
          Empieza creando la primera sección de tu curso.
        </p>
      </div>
      <Button
        size="sm"
        onClick={onAdd}
        className="h-7 gap-1 bg-lesson text-xs text-primary-foreground hover:bg-lesson/90"
      >
        <Plus className="h-3.5 w-3.5" />
        Nueva sección
      </Button>
    </div>
  );
}

// ---------- Editor panel ----------

function EditorPanel({
  node,
  onRename,
}: {
  node: TreeNode | null;
  onRename: (id: string, title: string) => void;
}) {
  if (!node) return <EditorEmpty />;
  if (node.type === "test") return <TestEditor node={node} onRename={onRename} />;
  if (node.type === "section") return <SectionEditor node={node} onRename={onRename} />;
  return <LessonEditor node={node} onRename={onRename} />;
}

function EditorEmpty() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-background text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground">
        <BookOpen className="h-5 w-5" />
      </div>
      <div className="space-y-1">
        <h2 className="text-sm font-medium text-foreground">Ningún elemento seleccionado</h2>
        <p className="max-w-xs text-xs text-muted-foreground">
          Selecciona una lección, un test o una sección en el árbol de la izquierda para empezar a editar.
        </p>
      </div>
    </div>
  );
}

function EditorFrame({
  node,
  onRename,
  children,
  badge,
}: {
  node: TreeNode;
  onRename: (id: string, title: string) => void;
  children: React.ReactNode;
  badge: { label: string; color: "lesson" | "test" | "section" };
}) {
  const dot =
    badge.color === "lesson"
      ? "bg-lesson"
      : badge.color === "test"
        ? "bg-test"
        : "bg-section";
  return (
    <section className="flex min-w-0 flex-1 flex-col bg-background">
      <div className="flex items-center gap-3 border-b border-border px-6 py-4">
        <span className={cn("h-1.5 w-1.5 rounded-full", dot)} />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {badge.label}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="mx-auto max-w-3xl">
          <input
            key={node.id}
            defaultValue={node.title}
            onBlur={(e) => onRename(node.id, e.target.value || node.title)}
            className="w-full border-0 bg-transparent p-0 text-2xl font-semibold tracking-tight text-foreground outline-none placeholder:text-muted-foreground"
            placeholder="Sin título"
          />
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </section>
  );
}

function LessonEditor({
  node,
  onRename,
}: {
  node: TreeNode;
  onRename: (id: string, title: string) => void;
}) {
  return (
    <EditorFrame node={node} onRename={onRename} badge={{ label: "Lección", color: "lesson" }}>
      <textarea
        placeholder="Escribe el contenido de la lección…"
        className="min-h-[420px] w-full resize-none rounded-md border border-border bg-surface/40 p-4 text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground focus:border-ring"
      />
    </EditorFrame>
  );
}

function SectionEditor({
  node,
  onRename,
}: {
  node: TreeNode;
  onRename: (id: string, title: string) => void;
}) {
  return (
    <EditorFrame node={node} onRename={onRename} badge={{ label: "Sección", color: "section" }}>
      <p className="text-sm text-muted-foreground">
        Esta sección contiene {(node.children?.length ?? 0)} elementos. Añade una descripción o
        introducción opcional.
      </p>
      <textarea
        placeholder="Descripción de la sección (opcional)…"
        className="mt-4 min-h-[180px] w-full resize-none rounded-md border border-border bg-surface/40 p-4 text-sm leading-relaxed outline-none placeholder:text-muted-foreground focus:border-ring"
      />
    </EditorFrame>
  );
}

function TestEditor({
  node,
  onRename,
}: {
  node: TreeNode;
  onRename: (id: string, title: string) => void;
}) {
  const questions = [
    { q: "¿Qué es Power Query?", type: "Selección única" },
    { q: "Selecciona los pasos de limpieza correctos", type: "Selección múltiple" },
    { q: "Explica la diferencia entre Merge y Append", type: "Respuesta libre" },
  ];
  return (
    <EditorFrame node={node} onRename={onRename} badge={{ label: "Test", color: "test" }}>
      <div className="grid grid-cols-3 gap-3">
        <Stat label="Preguntas" value="3" />
        <Stat label="Aprobado" value="70%" />
        <Stat label="Tiempo" value="10 min" />
      </div>
      <ul className="mt-6 divide-y divide-border overflow-hidden rounded-md border border-border bg-surface/40">
        {questions.map((q, i) => (
          <li key={i} className="flex items-center gap-3 px-4 py-3">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-test-soft text-[11px] font-medium text-test">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-foreground">{q.q}</p>
              <p className="text-[11px] text-muted-foreground">{q.type}</p>
            </div>
            <button className="text-muted-foreground hover:text-foreground">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>

      {/* Paginador */}
      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-3.5 w-3.5" />
          Anterior
        </button>
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              className={cn(
                "h-6 w-6 rounded text-[11px]",
                n === 1
                  ? "bg-test text-primary-foreground"
                  : "text-muted-foreground hover:bg-surface-hover hover:text-foreground",
              )}
            >
              {n}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          Siguiente
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </EditorFrame>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-surface/40 px-3 py-2.5">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-lg font-semibold text-foreground">{value}</p>
    </div>
  );
}
