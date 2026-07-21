import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Brain,
  Search,
  FolderTree,
  ShieldCheck,
  Upload,
  Sparkles,
  GitMerge,
  MessageSquare,
  Check,
  Quote,
  Users,
  ShoppingCart,
  Cpu,
  BadgeCheck,
  Settings2,
  Headphones,
  FileText,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/landing")({
  head: () => ({
    meta: [
      { title: "Knowledge — El cerebro de IA para tu empresa" },
      {
        name: "description",
        content:
          "Knowledge organiza automáticamente la documentación de tu empresa con IA y permite que cualquier empleado encuentre respuestas fiables en segundos.",
      },
      { property: "og:title", content: "Knowledge — El cerebro de IA para tu empresa" },
      {
        property: "og:description",
        content:
          "Centraliza el conocimiento interno de tu empresa. Respuestas fiables con referencias, en segundos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  component: LandingPage,
});

/* ---------- palette (scoped to this route) ---------- */
const BRAND = "#2563EB";
const BRAND_DARK = "#1D4ED8";

function LandingPage() {
  return (
    <div
      className="min-h-screen bg-white text-slate-900 antialiased"
      style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
    >
      <Header />
      <main>
        <Hero />
        <Benefits />
        <HowItWorks />
        <AIBlock />
        <UseCases />
        <Stats />
        <Testimonial />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

/* ============================================================
   HEADER
============================================================ */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { label: "Producto", href: "#producto" },
    { label: "Características", href: "#caracteristicas" },
    { label: "Precios", href: "#precios" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-slate-200/70 bg-white/80 backdrop-blur-xl"
          : "border-b border-transparent bg-white/60 backdrop-blur",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#login"
            className="hidden rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 sm:inline-flex"
          >
            Iniciar sesión
          </a>
          <a
            href="#trial"
            className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(37,99,235,0.25),0_8px_24px_-8px_rgba(37,99,235,0.5)] transition-all hover:-translate-y-px hover:shadow-[0_2px_4px_rgba(37,99,235,0.3),0_12px_32px_-8px_rgba(37,99,235,0.6)]"
            style={{ backgroundColor: BRAND }}
          >
            Prueba gratuita
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <Link to="/landing" className="flex items-center gap-2">
      <div
        className="grid h-8 w-8 place-items-center rounded-lg text-white"
        style={{
          background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
        }}
      >
        <Brain className="h-[18px] w-[18px]" />
      </div>
      <span className="text-[17px] font-bold tracking-tight text-slate-900">Knowledge</span>
    </Link>
  );
}

/* ============================================================
   REVEAL ON SCROLL (subtle)
============================================================ */
function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ============================================================
   HERO
============================================================ */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(60% 50% at 50% 0%, rgba(37,99,235,0.08) 0%, rgba(255,255,255,0) 60%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-[560px] opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.06) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at top, black 40%, transparent 75%)",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-8">
        <div>
          <Reveal>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50/70 px-3 py-1 text-xs font-medium text-blue-700"
            >
              <Sparkles className="h-3.5 w-3.5" />
              IA entrenada con tu documentación
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-[44px] font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Todo el conocimiento de tu empresa.{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
                }}
              >
                Una única respuesta.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              Knowledge utiliza inteligencia artificial para organizar
              automáticamente la documentación de tu empresa y permitir que
              cualquier empleado encuentre respuestas fiables en segundos.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#trial"
                className="inline-flex items-center gap-1.5 rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(37,99,235,0.25),0_10px_28px_-10px_rgba(37,99,235,0.55)] transition-all hover:-translate-y-px"
                style={{ backgroundColor: BRAND }}
              >
                Probar gratis
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#demo"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
              >
                Ver demostración
              </a>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-8 flex items-center gap-5 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5" style={{ color: BRAND }} />
                Sin tarjeta de crédito
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5" style={{ color: BRAND }} />
                Configura en 5 minutos
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <HeroMockup />
        </Reveal>
      </div>
    </section>
  );
}

function HeroMockup() {
  return (
    <div className="relative">
      {/* glow */}
      <div
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[32px] opacity-60 blur-3xl"
        style={{
          background: `radial-gradient(50% 50% at 50% 50%, ${BRAND}33 0%, transparent 70%)`,
        }}
      />
      <div className="relative rounded-2xl border border-slate-200/80 bg-white/80 p-2 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_30px_60px_-20px_rgba(15,23,42,0.15)] backdrop-blur-xl">
        {/* window chrome */}
        <div className="flex items-center gap-2 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <div className="ml-3 flex-1">
            <div className="mx-auto h-6 w-56 rounded-md border border-slate-200 bg-slate-50 text-[11px] leading-6 text-slate-400">
              <span className="ml-3">knowledge.app / flota</span>
            </div>
          </div>
        </div>
        {/* body */}
        <div className="grid grid-cols-[180px_1fr] gap-0 overflow-hidden rounded-xl border border-slate-200 bg-white">
          {/* sidebar */}
          <div className="border-r border-slate-200 bg-slate-50/60 p-3 text-[12px]">
            <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Bibliotecas
            </div>
            {[
              { label: "RRHH", active: false },
              { label: "Flota", active: true },
              { label: "Calidad", active: false },
              { label: "Compras", active: false },
              { label: "Operaciones", active: false },
            ].map((it) => (
              <div
                key={it.label}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5",
                  it.active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100",
                )}
              >
                <FolderTree className="h-3.5 w-3.5" />
                {it.label}
              </div>
            ))}
          </div>
          {/* chat */}
          <div className="flex min-h-[360px] flex-col p-5">
            <div className="mb-4 flex items-center gap-2 text-[11px] font-medium text-slate-500">
              <div
                className="grid h-5 w-5 place-items-center rounded-md text-white"
                style={{ backgroundColor: BRAND }}
              >
                <Sparkles className="h-3 w-3" />
              </div>
              Asistente Knowledge
            </div>

            {/* user question */}
            <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-slate-100 px-4 py-2.5 text-[13px] text-slate-800">
              ¿Cuál es el procedimiento para solicitar un vehículo?
            </div>

            {/* answer */}
            <div className="mt-4 max-w-[92%] rounded-2xl rounded-tl-md border border-slate-200 bg-white px-4 py-3 text-[13px] leading-relaxed text-slate-700 shadow-sm">
              Para solicitar un vehículo de flota debes:
              <ol className="mt-2 list-decimal space-y-1 pl-4 text-slate-700">
                <li>Rellenar el formulario interno <em>F-FLT-04</em>.</li>
                <li>Obtener la aprobación de tu manager directo.</li>
                <li>Reservar con al menos 48h de antelación.</li>
              </ol>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {[
                  "Política de Flota v3.2",
                  "F-FLT-04.pdf",
                  "Manual Empleado §7",
                ].map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1 rounded-md border border-blue-100 bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700"
                  >
                    <FileText className="h-3 w-3" />
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* input */}
            <div className="mt-auto flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-400 shadow-sm">
              <Search className="h-4 w-4" />
              Pregunta cualquier cosa a tu empresa…
              <span
                className="ml-auto inline-flex h-6 w-6 items-center justify-center rounded-md text-white"
                style={{ backgroundColor: BRAND }}
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SECTION HEADER
============================================================ */
function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("mx-auto max-w-2xl", center && "text-center")}>
      {eyebrow && (
        <div
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.14em]",
          )}
          style={{ color: BRAND }}
        >
          {eyebrow}
        </div>
      )}
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ============================================================
   BENEFITS
============================================================ */
function Benefits() {
  const items = [
    {
      icon: Brain,
      title: "IA que entiende toda tu documentación",
      desc: "Comprende el contexto de cada documento, no solo palabras clave. Aprende la forma de trabajar de tu empresa.",
    },
    {
      icon: Search,
      title: "Búsqueda inteligente por lenguaje natural",
      desc: "Pregunta como hablarías con un compañero y obtén respuestas directas, con referencias a la fuente.",
    },
    {
      icon: FolderTree,
      title: "Organización automática",
      desc: "Clasifica artículos y carpetas de forma inteligente. Se adapta a la estructura real de tu organización.",
    },
    {
      icon: ShieldCheck,
      title: "Permisos por empresa y equipos",
      desc: "Control granular de accesos. Cada equipo ve solo lo que necesita, con auditoría completa.",
    },
  ];

  return (
    <section id="caracteristicas" className="border-t border-slate-100 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Beneficios"
            title="Diseñado para equipos que crecen rápido"
            subtitle="Menos tiempo buscando, más tiempo construyendo. Una plataforma pensada para escalar con tu empresa."
          />
        </Reveal>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 80}>
              <div className="group relative h-full rounded-2xl border border-slate-200/70 bg-white/70 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_40px_-20px_rgba(37,99,235,0.25)]">
                <div
                  className="grid h-11 w-11 place-items-center rounded-xl text-white shadow-[0_6px_16px_-6px_rgba(37,99,235,0.5)]"
                  style={{
                    background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
                  }}
                >
                  <it.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-[15px] font-semibold text-slate-900">
                  {it.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {it.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   HOW IT WORKS
============================================================ */
function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Sube tu documentación",
      desc: "Conecta tus fuentes o arrastra archivos. Soportamos PDF, Word, Notion, Confluence y más.",
    },
    {
      icon: Brain,
      title: "La IA la analiza y organiza",
      desc: "Se indexa, se clasifica y se comprende el contenido en cuestión de minutos.",
    },
    {
      icon: GitMerge,
      title: "Detecta duplicados y genera artículos",
      desc: "Fusiona información dispersa y crea documentos limpios listos para consumir.",
    },
    {
      icon: MessageSquare,
      title: "Los empleados preguntan y obtienen respuesta",
      desc: "Respuestas directas, con referencias, desde el chat o integrado en sus herramientas.",
    },
  ];
  return (
    <section id="producto" className="relative border-t border-slate-100 bg-slate-50/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Cómo funciona"
            title="De documentos dispersos a respuestas útiles"
            subtitle="En cuatro pasos, tu empresa tiene un cerebro que responde por ella."
          />
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="relative h-full rounded-2xl border border-slate-200/70 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-8 w-8 place-items-center rounded-lg text-sm font-bold"
                    style={{
                      color: BRAND,
                      backgroundColor: "rgba(37,99,235,0.08)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <s.icon className="h-5 w-5 text-slate-400" />
                </div>
                <h3 className="mt-5 text-[15px] font-semibold text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   AI BLOCK
============================================================ */
function AIBlock() {
  const bullets = [
    "Detecta duplicados",
    "Fusiona información relacionada",
    "Propone mejoras",
    "Identifica contradicciones",
    "Sugiere dónde guardar nuevos documentos",
    "Aprende la estructura de la empresa",
  ];
  return (
    <section className="relative overflow-hidden border-t border-slate-100 py-24 sm:py-32">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, #EFF6FF 0%, #F8FAFF 60%, #FFFFFF 100%)",
        }}
      />
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8">
        <Reveal>
          <div>
            <div
              className="text-xs font-semibold uppercase tracking-[0.14em]"
              style={{ color: BRAND }}
            >
              Inteligencia artificial
            </div>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              La IA trabaja por ti.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Mientras tu equipo se centra en lo importante, Knowledge mantiene
              tu base de conocimiento limpia, actualizada y libre de fricción.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2.5 text-sm text-slate-700"
                >
                  <span
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-white"
                    style={{ backgroundColor: BRAND }}
                  >
                    <Check className="h-3 w-3" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <AICard />
        </Reveal>
      </div>
    </section>
  );
}

function AICard() {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl opacity-70 blur-3xl"
        style={{
          background: `radial-gradient(50% 50% at 50% 50%, ${BRAND}22 0%, transparent 70%)`,
        }}
      />
      <div className="rounded-2xl border border-white/60 bg-white/70 p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_30px_60px_-20px_rgba(37,99,235,0.25)] backdrop-blur-xl">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <Sparkles className="h-3.5 w-3.5" style={{ color: BRAND }} />
          Sugerencias del asistente
        </div>
        <div className="mt-4 space-y-3">
          {[
            {
              label: "Duplicado detectado",
              body: "«Política de vacaciones» aparece en 3 documentos. ¿Fusionar en uno?",
              tone: "blue",
            },
            {
              label: "Contradicción",
              body: "El plazo de aprobación difiere en «F-COM-12» y «Manual Compras §4».",
              tone: "amber",
            },
            {
              label: "Mejora sugerida",
              body: "Añadir un ejemplo al procedimiento de solicitud de flota.",
              tone: "slate",
            },
          ].map((c) => (
            <div
              key={c.label}
              className="rounded-xl border border-slate-200 bg-white/80 p-4"
            >
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider">
                <span
                  className={cn(
                    "inline-flex items-center rounded-md px-2 py-0.5",
                    c.tone === "blue" && "bg-blue-50 text-blue-700",
                    c.tone === "amber" && "bg-amber-50 text-amber-700",
                    c.tone === "slate" && "bg-slate-100 text-slate-600",
                  )}
                >
                  {c.label}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-700">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   USE CASES
============================================================ */
function UseCases() {
  const cases = [
    { icon: Users, title: "Recursos Humanos", desc: "Onboarding, políticas y beneficios al alcance de cada empleado." },
    { icon: ShoppingCart, title: "Compras", desc: "Procedimientos, proveedores y plantillas siempre actualizados." },
    { icon: Cpu, title: "Ingeniería", desc: "Documentación técnica, runbooks y decisiones de arquitectura." },
    { icon: BadgeCheck, title: "Calidad", desc: "Normativa, auditorías y controles sin buscar en carpetas antiguas." },
    { icon: Settings2, title: "Operaciones", desc: "Procesos internos y protocolos claros para toda la operativa." },
    { icon: Headphones, title: "Atención al cliente", desc: "Respuestas consistentes al cliente respaldadas por documentación." },
  ];
  return (
    <section className="border-t border-slate-100 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Casos de uso"
            title="Para cada equipo de tu empresa"
            subtitle="Knowledge se adapta a la realidad de cada departamento, sin plantillas rígidas."
          />
        </Reveal>
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => (
            <Reveal key={c.title} delay={i * 60}>
              <div className="group flex h-full items-start gap-4 rounded-2xl border border-slate-200/70 bg-white/70 p-6 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_16px_32px_-16px_rgba(37,99,235,0.2)]">
                <div
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-lg"
                  style={{
                    color: BRAND,
                    backgroundColor: "rgba(37,99,235,0.08)",
                  }}
                >
                  <c.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-[15px] font-semibold text-slate-900">{c.title}</h3>
                    <ChevronRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-500" />
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {c.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   STATS
============================================================ */
function Stats() {
  const stats = [
    { big: "95%", label: "menos tiempo buscando información" },
    { big: "10s", label: "para encontrar una respuesta" },
    { big: "100%", label: "de respuestas respaldadas por documentación" },
  ];
  return (
    <section id="precios" className="border-t border-slate-100 bg-slate-50/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.big} delay={i * 100}>
              <div className="text-center">
                <div
                  className="text-6xl font-extrabold tracking-tight sm:text-7xl"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {s.big}
                </div>
                <p className="mx-auto mt-3 max-w-[220px] text-sm text-slate-600">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TESTIMONIAL
============================================================ */
function Testimonial() {
  return (
    <section className="border-t border-slate-100 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Reveal>
          <figure className="relative rounded-3xl border border-slate-200/70 bg-white/70 p-10 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_30px_60px_-30px_rgba(15,23,42,0.15)] backdrop-blur-xl sm:p-14">
            <Quote
              className="absolute -top-4 left-8 h-10 w-10 rounded-xl p-2 text-white shadow-[0_10px_20px_-10px_rgba(37,99,235,0.6)]"
              style={{ backgroundColor: BRAND }}
            />
            <blockquote className="text-xl font-medium leading-relaxed text-slate-800 sm:text-2xl">
              «Antes perdíamos mucho tiempo buscando procedimientos. Ahora
              cualquier empleado encuentra la respuesta en segundos.»
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <div
                className="grid h-11 w-11 place-items-center rounded-full text-sm font-semibold text-white"
                style={{
                  background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
                }}
              >
                MR
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  María Ruiz
                </div>
                <div className="text-xs text-slate-500">
                  Head of Operations · Nordika Industries
                </div>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   FINAL CTA
============================================================ */
function FinalCTA() {
  return (
    <section id="contacto" className="px-6 py-24 sm:py-32 lg:px-8">
      <Reveal>
        <div
          className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl px-8 py-20 text-center sm:px-16"
          style={{
            background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
          }}
        >
          {/* subtle grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            }}
          />
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
            style={{ backgroundColor: "#93C5FD" }}
          />
          <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Empieza a construir el cerebro de tu empresa.
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-base text-blue-100 sm:text-lg">
            Crea tu espacio en menos de cinco minutos.
          </p>
          <div className="relative mt-10">
            <a
              href="#trial"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 text-base font-semibold shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.45)]"
              style={{ color: BRAND_DARK }}
            >
              Comenzar prueba gratuita
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ============================================================
   FOOTER
============================================================ */
function Footer() {
  const cols = [
    { title: "Producto", links: ["Características", "Precios", "Seguridad"] },
    { title: "Empresa", links: ["Contacto", "Sobre nosotros"] },
    { title: "Legal", links: ["Política de privacidad", "Términos"] },
  ];
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-slate-500">
              El cerebro de IA para tu empresa. Centraliza, organiza y responde.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {c.title}
              </div>
              <ul className="mt-4 space-y-3 text-sm">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-slate-700 transition-colors hover:text-slate-900">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-slate-100 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center">
          <div>Copyright © {new Date().getFullYear()} Knowledge.</div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-slate-700">Estado</a>
            <a href="#" className="hover:text-slate-700">Changelog</a>
            <a href="#" className="hover:text-slate-700">Docs</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
