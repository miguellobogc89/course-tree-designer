# Plan: Página "Mi espacio" (perfil / dashboard personal)

Nueva ruta `/mi-espacio` accesible desde la sidebar, con el mismo lenguaje visual que Inicio, Cursos y Knowledge (AppShell + topbar con breadcrumb + acciones, cards sobre `bg-panel`, tokens semánticos `lesson` / `test` / `surface`).

## 1. Rutas y navegación

- Nuevo archivo: `src/routes/mi-espacio.tsx` con `createFileRoute("/mi-espacio")` y `head()` propio (title/description específicos).
- Añadir entrada en la sidebar (`src/components/shell/AppShell.tsx`):
  - Icono `UserCircle2` (lucide), label "Mi espacio", `to: "/mi-espacio"`, colocado tras "Bandeja".
- Regenerar `src/routeTree.gen.ts` para incluir la ruta (mismo patrón que las otras).

## 2. Topbar (contextual dentro de la página)

- Breadcrumb: `Inicio / Mi espacio` (link a `/`, texto plano el actual), estilo idéntico al de otras pantallas.
- Acción principal a la derecha: botón **"Nuevo grupo"** (`Plus`, variante lesson, `size="sm"`). Único CTA primario en la topbar — nada de duplicarlo dentro de secciones.

## 3. Layout de la página

Contenedor `max-w-6xl mx-auto px-8 py-10`, con header + bloques verticales separados por márgenes generosos:

```text
┌───────────────────────────────────────────────┐
│ Header: "Mi espacio" + descripción            │
├───────────────────────────────────────────────┤
│ [ Resumen de mi empresa ] (card destacada)    │
├───────────────────────────────────────────────┤
│ Mis equipos      (grid 2–3 cols)              │
├───────────────────────────────────────────────┤
│ Mis cursos       (grid compacta)              │
├───────────────────────────────────────────────┤
│ Mi aportación al Knowledge (stats + lista)    │
├───────────────────────────────────────────────┤
│ Actividad reciente (timeline)                 │
└───────────────────────────────────────────────┘
```

Responsive: 1 col en móvil, 2 en md, 3 en lg donde aplique. Nada de sidebars internos.

## 4. Componentes (modulares, en `src/components/mi-espacio/`)

Cada uno recibe props tipadas para poder cablearse a datos reales luego. Mock data local se define en `src/routes/mi-espacio.tsx` y se pasa por props.

- `ProfileHeader.tsx` — título, descripción, avatar/nombre del usuario a la izquierda opcional.
- `CompanySummaryCard.tsx` — card destacada full-width con:
  - Logo/inicial de la empresa, nombre ("Acme Corp"), rol ("Learning Manager"), plan/estado (chip lesson-soft).
  - Métricas inline: miembros, equipos, cursos activos, salud (barra o dot).
  - Fondo `bg-panel` con acento `border-lesson/30` para diferenciarla.
- `TeamsSection.tsx` + `TeamCard.tsx` — grid `md:grid-cols-2 lg:grid-cols-3`:
  - Header de sección con título + link "Ver todos".
  - `TeamCard`: nombre, descripción 2 líneas, avatares apilados (miembros), chips (cursos asignados), barra de progreso medio, "Última actividad hace X", menú `MoreHorizontal` (Dropdown shadcn) con acciones secundarias (Ver, Renombrar, Salir).
  - `EmptyTeams`: estado vacío elegante (icono `Users`, mensaje, CTA secundario "Crear tu primer grupo" que reutiliza la acción de la topbar).
- `MyCoursesSection.tsx` + `CourseProgressCard.tsx` — grid compacta (2–3 cols) con progreso, estado (En curso / Completado / Pendiente como chips), fecha, CTA "Continuar" (Link a `/cursos/editor` por ahora en mock).
- `KnowledgeContributionSection.tsx` — dos partes:
  - Fila de 4 stats: Documentos subidos, Contenidos generados, Revisiones, Sugerencias pendientes (mismo patrón que `Stats` en `index.tsx`, con tonos `lesson`/`test`/`section`).
  - Lista compacta de últimas aportaciones (nombre doc, carpeta, estado, hace X).
- `RecentActivityTimeline.tsx` — timeline vertical con línea `border-l`, puntos coloreados por tipo (curso: lesson, knowledge: test, equipo: section), timestamp relativo, texto descriptivo.

Todos usan tokens semánticos (`text-foreground`, `text-muted-foreground`, `bg-panel`, `bg-surface`, `border-border`, `bg-lesson-soft text-lesson`, etc.) — nada hardcoded, funciona en claro y oscuro automáticamente.

## 5. Estados

- **Normal / hover**: mismo patrón que `index.tsx` (`hover:bg-surface/40`, `hover:border-lesson/40` en cards clicables).
- **Empty state** en Mis equipos, Mis cursos, Aportaciones Knowledge y Actividad reciente: icono grande atenuado + copy corto + CTA opcional secundario.
- **Sin duplicar CTA primario**: "Nuevo grupo" solo vive en la topbar; el empty state del bloque de equipos usa botón secundario que dispara la misma acción (por ahora, no-op / console.log).

## 6. Mock data

Definida en el propio route file como constantes tipadas (`company`, `teams`, `courses`, `knowledgeStats`, `contributions`, `activity`). Tipos exportables (`Team`, `CourseAssignment`, `ActivityEvent`, etc.) desde `src/components/mi-espacio/types.ts` para facilitar la sustitución por queries reales más adelante.

## 7. Consideraciones técnicas

- Usar `Link` de `@tanstack/react-router` para navegación (breadcrumb, "Continuar" cursos, "Ver todos"). Nunca `<a href>`.
- Reutilizar `Button`, `DropdownMenu`, `Tooltip` de shadcn ya presentes.
- Componentes puros de presentación — sin efectos, sin fetch, sin backend.
- No tocar Knowledge/Cursos/Editor existentes.

## Entregables

- `src/routes/mi-espacio.tsx`
- `src/components/mi-espacio/{ProfileHeader,CompanySummaryCard,TeamsSection,TeamCard,MyCoursesSection,CourseProgressCard,KnowledgeContributionSection,RecentActivityTimeline,types}.tsx`
- Update: `src/components/shell/AppShell.tsx` (nuevo item sidebar)
- Update: `src/routeTree.gen.ts` (registro ruta)
