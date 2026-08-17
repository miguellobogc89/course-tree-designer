import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Iniciar sesión — CRS Learning" },
      {
        name: "description",
        content:
          "Accede a CRS Learning para crear y realizar formaciones internas, cursos técnicos y procesos de empresa.",
      },
      { property: "og:title", content: "Iniciar sesión — CRS Learning" },
      {
        property: "og:description",
        content:
          "Accede a CRS Learning: formación interna, cursos técnicos y conocimiento empresarial.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState<null | "google" | "email">(null);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const submit = (kind: "google" | "email") => {
    setLoading(kind);
    setTimeout(() => setLoading(null), 1400);
  };

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      {/* ---------- Left brand panel ---------- */}
      <aside className="relative hidden w-[46%] flex-col justify-between overflow-hidden bg-sidebar px-12 py-12 lg:flex">
        <BrandGlow />
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-lesson/15 text-lesson">
            <BookOpen className="h-4 w-4" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight">
            CRS Learning
          </span>
        </div>

        <div className="relative z-10 max-w-md">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sidebar-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-lesson" />
            Plataforma de conocimiento interno
          </div>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground">
            El cerebro de formación de tu empresa.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Crea cursos técnicos, centraliza procedimientos y deja que la IA
            sintetice el conocimiento de cada carpeta en segundos.
          </p>

          <div className="mt-8 space-y-3">
            {[
              "Editor de cursos tipo IDE",
              "Knowledge con IA integrada",
              "Onboarding de nuevos empleados en minutos",
            ].map((t) => (
              <div
                key={t}
                className="flex items-center gap-3 text-sm text-foreground/80"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lesson/15 text-lesson">
                  <ShieldCheck className="h-3 w-3" />
                </span>
                {t}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex -space-x-2">
            {["#3B82F6", "#10B981", "#F59E0B"].map((c) => (
              <span
                key={c}
                className="h-6 w-6 rounded-full border-2 border-sidebar"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          +2.400 equipos formándose hoy
        </div>
      </aside>

      {/* ---------- Right form panel ---------- */}
      <main className="flex flex-1 flex-col">
        <div className="flex items-center justify-between px-6 py-5 lg:px-10">
          <Link
            to="/landing"
            className="flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <BookOpen className="h-4 w-4 text-lesson" />
            CRS Learning
          </Link>
          <p className="text-xs text-muted-foreground">
            ¿No tienes cuenta?{" "}
            <Link
              to="/login"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Crear cuenta
            </Link>
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 pb-16 lg:px-10">
          <div className="w-full max-w-sm">
            <h1 className="text-2xl font-semibold tracking-tight">
              Bienvenido de nuevo
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Inicia sesión para acceder a tu espacio de formación.
            </p>

            {/* Google */}
            <button
              type="button"
              onClick={() => submit("google")}
              disabled={loading !== null}
              className="mt-7 flex h-10 w-full items-center justify-center gap-2.5 rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent disabled:opacity-60"
            >
              {loading === "google" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <GoogleIcon />
              )}
              Continuar con Google
            </button>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                o con email
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Email form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit("email");
              }}
              className="space-y-4"
            >
              <Field label="Email corporativo">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nombre@empresa.com"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:ring-2 focus:ring-ring/20"
                />
              </Field>

              <Field
                label="Contraseña"
                action={
                  <button
                    type="button"
                    className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    ¿Olvidaste la contraseña?
                  </button>
                }
              >
                <div className="relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    required
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    placeholder="••••••••"
                    className="h-10 w-full rounded-md border border-input bg-background px-3 pr-10 text-sm shadow-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:ring-2 focus:ring-ring/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={showPwd ? "Ocultar contraseña" : "Ver contraseña"}
                  >
                    {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </Field>

              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-3.5 w-3.5 rounded border-input accent-[color:var(--color-lesson)]"
                />
                Mantener sesión iniciada
              </label>

              <button
                type="submit"
                disabled={loading !== null}
                className={cn(
                  "flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:opacity-60",
                )}
              >
                {loading === "email" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Iniciar sesión
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-[11px] leading-relaxed text-muted-foreground/80">
              Al continuar aceptas los{" "}
              <span className="underline-offset-2 hover:underline">Términos</span> y la{" "}
              <span className="underline-offset-2 hover:underline">Política de privacidad</span>{" "}
              de CRS Learning.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({
  label,
  action,
  children,
}: {
  label: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-xs font-medium text-foreground/80">{label}</label>
        {action}
      </div>
      {children}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}

function BrandGlow() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-lesson/20 blur-[120px]" />
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-test/10 blur-[120px]" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-sidebar-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-sidebar-foreground) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
