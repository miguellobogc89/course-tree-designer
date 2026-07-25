import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  FileText,
  FolderOpen,
  ListTree,
  Loader2,
  Plus,
  ScanSearch,
  Sparkles,
  UploadCloud,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type StepId = "docs" | "analysis" | "proposal" | "result";

const STEPS: { id: StepId; label: string; hint: string; icon: typeof FolderOpen }[] = [
  { id: "docs", label: "Documentos", hint: "Selección de archivos", icon: FolderOpen },
  { id: "analysis", label: "Análisis", hint: "Revisión inteligente", icon: ScanSearch },
  { id: "proposal", label: "Propuesta", hint: "Estructura sugerida", icon: ListTree },
  { id: "result", label: "Resultado", hint: "Incorporación final", icon: Sparkles },
];

type MockFile = { name: string; size: string };

const DEFAULT_FILES: MockFile[] = [
  { name: "Flujograma Traspasos MANTENIMIENTO V2.pptx", size: "2,4 MB" },
];

export function UploadDocsModal({
  open,
  onOpenChange,
  folderName = "Procedimientos internos",
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  folderName?: string;
}) {
  const [step, setStep] = useState<StepId>("docs");
  const [files, setFiles] = useState<MockFile[]>(DEFAULT_FILES);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stepIndex = STEPS.findIndex((s) => s.id === step);

  useEffect(() => {
    if (!open) {
      setStep("docs");
      setProgress(0);
      setFiles(DEFAULT_FILES);
    }
  }, [open]);

  useEffect(() => {
    if (step !== "analysis" && step !== "result") return;
    setProgress(step === "analysis" ? 8 : 12);
    timer.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          if (timer.current) clearInterval(timer.current);
          return 100;
        }
        return Math.min(100, p + 7);
      });
    }, 130);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [step]);

  const analysisDone = step === "analysis" && progress >= 100;

  const footer = useMemo(() => {
    switch (step) {
      case "docs":
        return (
          <>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="h-10 rounded-xl">
              Cancelar
            </Button>
            <Button
              disabled={files.length === 0}
              onClick={() => setStep("analysis")}
              className="h-10 gap-2 rounded-xl bg-foreground px-5 text-background hover:bg-foreground/90"
            >
              <ScanSearch className="h-4 w-4" />
              Analizar {files.length} documento{files.length === 1 ? "" : "s"}
            </Button>
          </>
        );
      case "analysis":
        return (
          <>
            <Button variant="outline" onClick={() => setStep("docs")} className="h-10 gap-2 rounded-xl">
              <ArrowLeft className="h-4 w-4" /> Volver
            </Button>
            <Button
              disabled={!analysisDone}
              onClick={() => setStep("proposal")}
              className="h-10 gap-2 rounded-xl bg-foreground px-5 text-background hover:bg-foreground/90"
            >
              {analysisDone ? (
                <Sparkles className="h-4 w-4" />
              ) : (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              {analysisDone ? `Generar propuesta con ${files.length} documento${files.length === 1 ? "" : "s"}` : "Analizando documentos"}
            </Button>
          </>
        );
      case "proposal":
        return (
          <>
            <Button variant="outline" onClick={() => setStep("analysis")} className="h-10 gap-2 rounded-xl">
              <ArrowLeft className="h-4 w-4" /> Volver
            </Button>
            <Button
              onClick={() => setStep("result")}
              className="h-10 gap-2 rounded-xl bg-foreground px-5 text-background hover:bg-foreground/90"
            >
              <Sparkles className="h-4 w-4" /> Confirmar incorporación
            </Button>
          </>
        );
      case "result":
        return (
          <>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="h-10 rounded-xl">
              Cerrar
            </Button>
            <Button
              disabled={progress < 100}
              onClick={() => onOpenChange(false)}
              className="h-10 gap-2 rounded-xl bg-lesson px-5 text-primary-foreground hover:bg-lesson/90"
            >
              <Check className="h-4 w-4" /> Ver conocimiento generado
            </Button>
          </>
        );
    }
  }, [step, files.length, analysisDone, progress, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-3xl overflow-hidden rounded-2xl border-border bg-panel p-0 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start gap-3 px-6 pb-5 pt-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lesson-soft text-lesson">
            <FolderOpen className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <DialogTitle className="text-base font-semibold tracking-tight text-foreground">
              Incorporar documentación
            </DialogTitle>
            <DialogDescription className="mt-0.5 text-sm text-muted-foreground">
              Destino preferente:{" "}
              <span className="font-medium text-foreground">{folderName}</span>. La IA podrá
              proponer una estructura mejor.
            </DialogDescription>
          </div>
        </div>

        {/* Stepper */}
        <div className="border-y border-border bg-surface/40 px-6 py-4">
          <div className="flex items-start">
            {STEPS.map((s, i) => {
              const done = i < stepIndex;
              const active = i === stepIndex;
              const Icon = s.icon;
              return (
                <div key={s.id} className="flex min-w-0 flex-1 items-start">
                  <div className="flex min-w-0 flex-1 flex-col items-center text-center">
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
                        done && "border-transparent bg-lesson text-primary-foreground",
                        active &&
                          "border-transparent bg-foreground text-background ring-4 ring-foreground/10",
                        !done && !active && "border-border bg-panel text-muted-foreground",
                      )}
                    >
                      {done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </div>
                    <p
                      className={cn(
                        "mt-2 truncate text-xs font-semibold",
                        active || done ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {s.label}
                    </p>
                    <p className="truncate text-[11px] text-muted-foreground">{s.hint}</p>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={cn(
                        "mt-[18px] h-px flex-1 shrink-0",
                        i < stepIndex ? "bg-lesson" : "bg-border",
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Body */}
        <div className="max-h-[52vh] min-h-[300px] overflow-y-auto px-6 py-6">
          {step === "docs" && (
            <div className="space-y-4">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                }}
                className={cn(
                  "flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-9 text-center transition-colors",
                  dragging ? "border-lesson bg-lesson-soft/60" : "border-border bg-surface/40",
                )}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lesson-soft text-lesson">
                  <UploadCloud className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm font-medium text-foreground">
                  Arrastra tus archivos aquí
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  PDF, DOCX, PPTX, XLSX o MD · hasta 50 MB por archivo
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 h-8 gap-1.5 rounded-lg text-xs"
                  onClick={() =>
                    setFiles((f) => [
                      ...f,
                      { name: `Documento_${f.length + 1}.pdf`, size: "780 KB" },
                    ])
                  }
                >
                  <Plus className="h-3.5 w-3.5" /> Seleccionar archivos
                </Button>
              </div>

              <div className="space-y-2">
                {files.map((f, i) => (
                  <div
                    key={f.name + i}
                    className="group flex items-center gap-3 rounded-xl border border-border bg-surface/40 px-3 py-2.5"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-panel text-muted-foreground">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{f.name}</p>
                      <p className="text-[11px] text-muted-foreground">{f.size}</p>
                    </div>
                    <button
                      aria-label={`Quitar ${f.name}`}
                      onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                      className="rounded-md p-1 text-muted-foreground opacity-0 transition hover:bg-panel hover:text-foreground group-hover:opacity-100"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === "analysis" && (
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {analysisDone ? "Análisis completado" : "Analizando documentos"}
                  </h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {files.length} documento{files.length === 1 ? "" : "s"}{" "}
                    {analysisDone ? "preparado" : "en proceso"}
                    {files.length === 1 ? "" : "s"}.
                  </p>
                </div>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium",
                    analysisDone
                      ? "bg-lesson-soft text-lesson"
                      : "bg-surface text-muted-foreground",
                  )}
                >
                  {analysisDone ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  )}
                  {analysisDone ? "Análisis completado" : "Procesando"}
                </span>
              </div>

              <ProgressBar
                label="Documentos analizados"
                value={progress}
                tone={analysisDone ? "lesson" : "foreground"}
              />

              <div className="flex gap-5 text-xs text-muted-foreground">
                <span>
                  Preparados: <span className="font-semibold text-foreground">{files.length}</span>
                </span>
                <span>
                  Fallidos: <span className="font-semibold text-foreground">0</span>
                </span>
              </div>

              <div className="space-y-2">
                {files.map((f, i) => (
                  <div
                    key={f.name + i}
                    className="flex items-center gap-3 rounded-xl border border-lesson/25 bg-lesson-soft/40 px-3 py-2.5"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lesson/15 text-lesson">
                      {analysisDone ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">
                        <span className="mr-1.5 text-muted-foreground">#{i + 1}</span>
                        {f.name}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {analysisDone ? "Documento preparado correctamente" : "Extrayendo contenido…"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === "proposal" && <ProposalStep files={files} />}

          {step === "result" && <ResultStep progress={progress} files={files} />}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-border bg-surface/40 px-6 py-4">
          {footer}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProgressBar({
  label,
  value,
  tone = "foreground",
}: {
  label: string;
  value: number;
  tone?: "foreground" | "lesson";
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="font-medium text-foreground">{label}</span>
        <span className={cn("font-semibold", tone === "lesson" ? "text-lesson" : "text-foreground")}>
          {Math.round(value)}%
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface">
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-200",
            tone === "lesson" ? "bg-lesson" : "bg-foreground",
          )}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function ProposalStep({ files }: { files: MockFile[] }) {
  const stats = [
    { label: "Documentos", value: files.length, tone: "text-foreground" },
    { label: "Duplicados", value: 1, tone: "text-lesson" },
    { label: "Actualizaciones", value: 0, tone: "text-muted-foreground" },
    { label: "Artículos nuevos", value: 1, tone: "text-test" },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-surface/40 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-lesson-soft text-lesson">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">
              Importación: Flujograma Traspaso Comercial → O&amp;M (B2B)
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Incorporación del flujograma que describe el proceso de traspaso de activos desde
              Comercial a Operaciones &amp; Mantenimiento: puesta en marcha, creación de WO/PPM,
              checklist documental e hitos de facturación.
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-panel px-3 py-2.5">
              <p className={cn("text-xl font-semibold tabular-nums", s.tone)}>{s.value}</p>
              <p className="text-[11px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 rounded-xl border border-test/30 bg-test-soft/50 p-3.5">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-test" />
        <div>
          <p className="text-sm font-semibold text-test">Avisos generales</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Posible solapamiento con procesos de revamping y atención B2B. Revisa para evitar
            duplicidad de procesos y decidir si integrar, consolidar o referenciar contenido entre
            artículos.
          </p>
        </div>
      </div>

      {files.map((f, i) => (
        <div key={f.name + i} className="rounded-xl border border-border bg-panel p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-test-soft text-test">
              <FileText className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="truncate text-sm font-semibold text-foreground">{f.name}</p>
                <span className="rounded-full bg-test-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-test">
                  Crear artículo
                </span>
                <span className="rounded-full bg-lesson-soft px-2 py-0.5 text-[10px] font-semibold text-lesson">
                  92% confianza
                </span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                Explica los pasos operativos para transferir un activo desde Comercial a Operaciones
                &amp; Mantenimiento: oportunidad, puesta en marcha, órdenes de trabajo, checklist
                documental y responsables implicados.
              </p>
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-border bg-surface/50 px-3 py-2">
                <ListTree className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <p className="truncate text-xs text-foreground">
                  Proceso de traspaso Comercial → O&amp;M y puesta en marcha (eMobility B2B)
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ResultStep({ progress, files }: { progress: number; files: MockFile[] }) {
  const done = progress >= 100;
  return (
    <div className="space-y-5">
      <div className="flex flex-col items-center rounded-xl border border-border bg-surface/40 px-6 py-8 text-center">
        <div
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-2xl",
            done ? "bg-lesson text-primary-foreground" : "bg-lesson-soft text-lesson",
          )}
        >
          {done ? <Check className="h-7 w-7" /> : <Loader2 className="h-7 w-7 animate-spin" />}
        </div>
        <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
          {done ? "Documentación incorporada" : "Incorporando documentación"}
        </h3>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          {done
            ? `${files.length} documento${files.length === 1 ? "" : "s"} añadido${files.length === 1 ? "" : "s"} y 1 artículo generado con referencias a las fuentes.`
            : "Generando artículos, relaciones y referencias…"}
        </p>
        <div className="mt-5 w-full max-w-sm">
          <ProgressBar label="Progreso" value={progress} tone="lesson" />
        </div>
      </div>

      {done && (
        <div className="grid gap-2 sm:grid-cols-3">
          {[
            { label: "Artículos creados", value: 1 },
            { label: "Conceptos extraídos", value: 18 },
            { label: "Referencias", value: 8 },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-panel px-3 py-2.5">
              <p className="text-xl font-semibold tabular-nums text-foreground">{s.value}</p>
              <p className="text-[11px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
