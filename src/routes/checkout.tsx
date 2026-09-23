import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Building2,
  Check,
  Lock,
  Sparkles,
  Zap,
  Users,
  Brain,
  Bot,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Contratación — CRS LAB" },
      {
        name: "description",
        content: "Revisa tu plan y los importes antes de continuar al pago en CRS LAB.",
      },
      { property: "og:title", content: "Contratación — CRS LAB" },
      {
        property: "og:description",
        content: "Revisa tu plan y los importes antes de continuar al pago en CRS LAB.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CheckoutPage,
});

/* ---------- palette (scoped, Stripe-style vivid blue) ---------- */
const BRAND = "#2563EB";
const BRAND_DARK = "#1D4ED8";
const BRAND_SOFT = "#EFF4FF";
const BRAND_BORDER = "#C7DBFE";
const INK = "#0B1220";

const includedFeatures = [
  { icon: Brain, label: "Knowledge" },
  { icon: Sparkles, label: "Asistente IA" },
  { icon: Users, label: "Knowledge compartido" },
  { icon: Bot, label: "Agentes IA · Incluidos" },
];

const recentWork = [
  { label: "Facturación", value: "Anual", hint: "Ahorras un 15%" },
  { label: "Usuarios", value: "Hasta 5", hint: "Ampliable" },
  { label: "Workspaces", value: "3", hint: "Equipos independientes" },
];

function CheckoutPage() {
  const [cycle, setCycle] = useState<"annual" | "monthly">("annual");

  const annual = 2544;
  const monthlyEq = 212;
  const savings = 456;
  const iva = Math.round(annual * 0.21 * 100) / 100;
  const total = Math.round((annual + iva) * 100) / 100;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link
            to="/landing"
            className="flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:opacity-80"
          >
            <span
              className="flex h-7 w-7 items-center justify-center rounded-md text-white"
              style={{ backgroundColor: BRAND }}
            >
              <span className="text-xs font-bold">C</span>
            </span>
            CRS LAB
          </Link>
          <div className="flex items-center gap-2 text-xs font-medium" style={{ color: BRAND }}>
            <Lock className="h-3.5 w-3.5" />
            Pago cifrado · Stripe
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-6">
        {/* Compact breadcrumb + title row */}
        <div className="mb-6">
          <Link
            to="/landing"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a planes
          </Link>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: BRAND }}
              >
                Finalizar contratación
              </p>
              <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-foreground">
                Plan Team
              </h1>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">
              Revisa tu plan y los importes antes de continuar al pago.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
          {/* LEFT — steps */}
          <div className="flex flex-col gap-5">
            {/* Plan selected */}
            <Section step={1} title="Plan seleccionado" brand={BRAND}>
              <div className="flex items-start gap-4">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: BRAND_SOFT, color: BRAND }}
                >
                  <Building2 className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-foreground">Team</h3>
                    <span
                      className="rounded-full px-2 py-0.5 text-[11px] font-semibold text-white"
                      style={{ backgroundColor: BRAND }}
                    >
                      Más popular
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Para pequeños equipos que quieren compartir conocimiento y trabajar juntos en CRS.
                  </p>
                </div>
              </div>

              {/* Cycle toggle */}
              <div
                className="mt-4 inline-flex rounded-lg p-0.5"
                style={{ backgroundColor: BRAND_SOFT }}
              >
                {(["annual", "monthly"] as const).map((c) => {
                  const active = cycle === c;
                  return (
                    <button
                      key={c}
                      onClick={() => setCycle(c)}
                      className={cn(
                        "rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
                        active ? "text-white shadow-sm" : "hover:text-foreground",
                      )}
                      style={active ? { backgroundColor: BRAND } : { color: "#475569" }}
                    >
                      {c === "annual" ? "Anual · −15%" : "Mensual"}
                    </button>
                  );
                })}
              </div>

              <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4">
                {recentWork.map((d) => (
                  <div key={d.label}>
                    <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {d.label}
                    </dt>
                    <dd className="mt-0.5 text-sm font-semibold text-foreground">{d.value}</dd>
                    <p className="text-[11px] text-muted-foreground/80">{d.hint}</p>
                  </div>
                ))}
              </dl>
            </Section>

            {/* Billing data */}
            <Section step={2} title="Datos de facturación" brand={BRAND}>
              <div className="flex items-start gap-4">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: BRAND_SOFT, color: BRAND }}
                >
                  <Building2 className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">
                    Los datos fiscales se solicitarán antes de completar el pago.
                  </p>
                </div>
              </div>
              <div
                className="mt-4 rounded-lg border p-4"
                style={{ borderColor: BRAND_BORDER, backgroundColor: BRAND_SOFT }}
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" style={{ color: BRAND }} />
                  <h4 className="text-sm font-semibold text-foreground">Facturación empresarial</h4>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  En el siguiente paso podrás indicar razón social, NIF/CIF, dirección fiscal y país.
                </p>
              </div>
            </Section>

            {/* Payment */}
            <Section step={3} title="Pago seguro" brand={BRAND}>
              <div className="flex items-start gap-4">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: BRAND_SOFT, color: BRAND }}
                >
                  <CreditCard className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">
                    El método de pago se gestionará de forma segura mediante Stripe.
                  </p>
                </div>
              </div>
              {/* Mock card preview */}
              <div className="mt-4 grid grid-cols-[1fr_120px] gap-3">
                <div className="rounded-lg border border-border bg-muted/30 px-3 py-2.5">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Titular
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-foreground">—</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 px-3 py-2.5">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Vencimiento
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-foreground">MM / AA</p>
                </div>
              </div>
              <p
                className="mt-2 flex items-center gap-1.5 text-xs font-medium"
                style={{ color: BRAND }}
              >
                <Lock className="h-3.5 w-3.5" />
                Conexión cifrada de extremo a extremo.
              </p>
            </Section>
          </div>

          {/* RIGHT — order summary (sticky) */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
              <div
                className="px-5 py-4 text-white"
                style={{
                  background: `linear-gradient(135deg, ${BRAND_DARK}, ${BRAND})`,
                }}
              >
                <h2 className="text-sm font-semibold uppercase tracking-wider">Resumen</h2>
                <p className="mt-0.5 text-xs text-white/70">Plan Team · Facturación anual</p>
              </div>

              <div className="p-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">Team (anual)</span>
                  <span className="text-sm font-semibold text-foreground">
                    {annual.toLocaleString("es-ES", { minimumFractionDigits: 2 })} €
                  </span>
                </div>

                {/* Savings highlight */}
                <div
                  className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2.5"
                  style={{ backgroundColor: BRAND_SOFT, border: `1px solid ${BRAND_BORDER}` }}
                >
                  <Zap className="h-4 w-4" style={{ color: BRAND }} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: BRAND_DARK }}>
                      Ahorras {savings.toLocaleString("es-ES")} € al año
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Equivale a {monthlyEq.toLocaleString("es-ES")} €/mes
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                  <div className="flex items-baseline justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">
                      {annual.toLocaleString("es-ES", { minimumFractionDigits: 2 })} €
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-muted-foreground">IVA (21%)</span>
                    <span className="font-medium text-foreground">
                      {iva.toLocaleString("es-ES", { minimumFractionDigits: 2 })} €
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Total</p>
                    <p className="text-[11px] text-muted-foreground">IVA incluido</p>
                  </div>
                  <p className="text-3xl font-bold tracking-tight text-foreground">
                    {total.toLocaleString("es-ES", { minimumFractionDigits: 2 })} €
                  </p>
                </div>

                <button
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg"
                  style={{ backgroundColor: BRAND }}
                >
                  <Lock className="h-4 w-4" />
                  Continuar al pago
                </button>

                <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  Todavía no se realizará ningún cargo. La integración de pago está pendiente.
                </p>

                {/* Included */}
                <div className="mt-5 border-t border-border pt-4">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Incluido en Team
                  </p>
                  <ul className="grid grid-cols-2 gap-1.5">
                    {includedFeatures.map((f) => (
                      <li key={f.label} className="flex items-center gap-1.5 text-xs text-foreground">
                        <Check className="h-3.5 w-3.5" style={{ color: BRAND }} />
                        {f.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div
              className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2.5"
              style={{ backgroundColor: BRAND_SOFT }}
            >
              <CheckCircle2 className="h-4 w-4" style={{ color: BRAND }} />
              <p className="text-[11px] font-medium" style={{ color: BRAND_DARK }}>
                Garantía de reembolso de 14 días. Sin permanencia.
              </p>
            </div>
          </aside>
        </div>

        {/* Legal footnote */}
        <p className="mx-auto mt-10 max-w-3xl text-center text-[11px] leading-relaxed text-muted-foreground">
          El IVA mostrado corresponde provisionalmente al tipo general español del 21 %. El impuesto
          definitivo podrá variar según el país y los datos fiscales indicados en el paso de
          facturación.
        </p>
      </main>
    </div>
  );
}

function Section({
  step,
  title,
  brand,
  children,
}: {
  step: number;
  title: string;
  brand: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div
        className="flex items-center gap-3 border-b border-border px-5 py-3"
        style={{ backgroundColor: "#F8FAFC" }}
      >
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: brand }}
        >
          {step}
        </span>
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}
