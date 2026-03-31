import type { ComponentType, ReactNode, SVGProps } from "react";
import {
  Box,
  Layers,
  Palette,
  Sparkles,
  Type,
  MousePointer2,
} from "lucide-react";

const iconProps = {
  strokeWidth: 2 as const,
  className: "size-(--size-icon-md) shrink-0 text-accent",
};

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

function MoodSection({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description?: string;
  icon?: IconComponent;
  children: ReactNode;
}) {
  return (
    <section className="ds-card overflow-hidden">
      <div className="flex items-start gap-3 border-b border-border bg-surface-muted px-5 py-4 md:px-6">
        {Icon ? <Icon {...iconProps} /> : null}
        <div className="min-w-0">
          <h2 className="ds-text-title">{title}</h2>
          {description ? (
            <p className="ds-text-body-sm mt-1 text-muted">{description}</p>
          ) : null}
        </div>
      </div>
      <div className="p-5 md:p-6">{children}</div>
    </section>
  );
}

const neutralSteps = [
  { token: "0", varName: "--palette-neutral-0" },
  { token: "50", varName: "--palette-neutral-50" },
  { token: "100", varName: "--palette-neutral-100" },
  { token: "200", varName: "--palette-neutral-200" },
  { token: "400", varName: "--palette-neutral-400" },
  { token: "600", varName: "--palette-neutral-600" },
  { token: "800", varName: "--palette-neutral-800" },
  { token: "950", varName: "--palette-neutral-950" },
] as const;

const semanticSwatches = [
  { label: "Accent", varName: "--palette-accent" },
  { label: "Accent muted", varName: "--palette-accent-muted" },
  { label: "Primary", varName: "--palette-primary" },
  { label: "Danger", varName: "--palette-danger" },
  { label: "Danger muted", varName: "--palette-danger-muted" },
  { label: "Success", varName: "--palette-success" },
  { label: "Warning", varName: "--palette-warning" },
] as const;

export default function DesignOverviewPage() {
  return (
    <div
      id="top"
      className="flex min-h-0 flex-1 flex-col text-foreground"
    >
      <div className="ds-container flex flex-1 flex-col gap-8 py-8 pb-16">
        <header className="flex flex-col gap-3 border-b border-border pb-8">
          <p className="ds-text-caption text-subtle uppercase tracking-wide">
            MCSS · design system
          </p>
          <h1 className="ds-text-display max-w-3xl">
            Mood board &amp; token dashboard
          </h1>
          <p className="ds-text-subtitle max-w-2xl text-muted">
            Metropolis typography, palette variables, spacing scale, elevation,
            and core UI primitives — all sourced from{" "}
            <code className="rounded-sm bg-surface-muted px-1.5 py-0.5 font-mono ds-text-body-sm">
              globals.css
            </code>
            .
          </p>
        </header>

        <div className="ds-grid">
          <div className="col-span-16 xl:col-span-10">
            <MoodSection
              icon={Palette}
              title="Palette · neutrals"
              description="--palette-neutral-* ramp"
            >
              <div className="flex flex-wrap gap-4">
                {neutralSteps.map(({ token, varName }) => (
                  <div key={token} className="w-18 shrink-0">
                    <div
                      className="mb-2 h-16 w-full rounded-md border border-border shadow-ds-1"
                      style={{
                        backgroundColor: `var(${varName})`,
                      }}
                    />
                    <p className="ds-text-caption text-muted">{token}</p>
                  </div>
                ))}
              </div>
            </MoodSection>
          </div>

          <div className="col-span-16 xl:col-span-6">
            <MoodSection
              icon={Sparkles}
              title="Palette · semantic"
              description="Accent, state, and feedback colors"
            >
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {semanticSwatches.map(({ label, varName }) => (
                  <div key={label} className="min-w-0">
                    <div
                      className="mb-2 aspect-4/3 w-full rounded-md border border-border shadow-ds-1"
                      style={{ backgroundColor: `var(${varName})` }}
                    />
                    <p className="ds-text-caption truncate text-muted">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </MoodSection>
          </div>

          <div className="col-span-16 lg:col-span-8">
            <MoodSection
              icon={Type}
              title="Typography"
              description=".ds-text-caption → .ds-text-display · Metropolis"
            >
              <div className="flex flex-col gap-5">
                <p className="ds-text-caption text-subtle">
                  Caption — supporting labels &amp; meta
                </p>
                <p className="ds-text-body-sm text-muted">
                  Body small — secondary paragraphs
                </p>
                <p className="ds-text-body">
                  Body — default reading size for UI copy and descriptions.
                </p>
                <p className="ds-text-subtitle">
                  Subtitle — emphasis without jumping a full level.
                </p>
                <p className="ds-text-title">Title — section headings</p>
                <p className="ds-text-headline">Headline — hero statements</p>
                <p className="ds-text-display">Display — maximum impact</p>
                <p className="ds-text-body-sm font-mono text-muted">
                  font-mono — system monospace for code &amp; technical strings
                </p>
              </div>
            </MoodSection>
          </div>

          <div className="col-span-16 lg:col-span-8">
            <MoodSection
              icon={MousePointer2}
              title="Components"
              description="Buttons, input, link · focus per spec"
            >
              <div className="flex flex-col gap-8">
                <div className="flex flex-wrap items-center gap-3">
                  <button type="button" className="ds-btn">
                    Secondary
                  </button>
                  <button type="button" className="ds-btn-primary">
                    Primary
                  </button>
                  <button type="button" className="ds-btn" disabled>
                    Disabled
                  </button>
                </div>
                <div className="max-w-md space-y-3">
                  <label
                    htmlFor="mood-email"
                    className="ds-text-caption text-muted"
                  >
                    Label
                  </label>
                  <input
                    id="mood-email"
                    type="email"
                    className="ds-input"
                    placeholder="you@example.com"
                    autoComplete="off"
                  />
                  <input
                    type="text"
                    className="ds-input"
                    aria-invalid="true"
                    defaultValue="Invalid state"
                    readOnly
                  />
                </div>
                <p className="ds-text-body-sm text-muted">
                  Sample{" "}
                  <a href="#top" className="ds-link">
                    accent link
                  </a>{" "}
                  with focus ring (tab to verify).
                </p>
              </div>
            </MoodSection>
          </div>

          <div className="col-span-16 md:col-span-8">
            <MoodSection
              icon={Layers}
              title="Elevation"
              description="shadow-ds-1 · 2 · 3"
            >
              <div className="grid gap-4 sm:grid-cols-3">
                {(
                  [
                    ["shadow-ds-1", "Rest / subtle"],
                    ["shadow-ds-2", "Raised"],
                    ["shadow-ds-3", "Overlay peak"],
                  ] as const
                ).map(([shadowClass, label]) => (
                  <div
                    key={shadowClass}
                    className={`rounded-lg border border-border bg-surface-elevated p-6 ${shadowClass}`}
                  >
                    <p className="ds-text-caption text-muted">{label}</p>
                    <p className="ds-text-body-sm mt-2 font-mono">{shadowClass}</p>
                  </div>
                ))}
              </div>
            </MoodSection>
          </div>

          <div className="col-span-16 md:col-span-8">
            <MoodSection
              icon={Box}
              title="Radius &amp; spacing"
              description="Theme radii + spacing scale bars"
            >
              <div className="flex flex-col gap-8">
                <div className="flex flex-wrap items-end gap-4">
                  {(
                    [
                      ["rounded-sm", "sm"],
                      ["rounded-md", "md"],
                      ["rounded-lg", "lg"],
                      ["rounded-xl", "xl"],
                    ] as const
                  ).map(([cls, label]) => (
                    <div key={label} className="flex flex-col items-center gap-2">
                      <div
                        className={`h-14 w-14 border border-border bg-accent-muted ${cls}`}
                      />
                      <span className="ds-text-caption text-muted">{label}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="ds-text-caption mb-3 text-subtle">
                    Spacing (width = token)
                  </p>
                  <div className="flex flex-wrap items-end gap-3">
                    {(
                      [
                        "w-1",
                        "w-2",
                        "w-3",
                        "w-4",
                        "w-5",
                        "w-6",
                        "w-8",
                      ] as const
                    ).map((w) => (
                      <div key={w} className="flex flex-col items-center gap-1">
                        <div
                          className={`${w} h-10 rounded-sm bg-accent/30`}
                        />
                        <span className="ds-text-caption text-muted">{w}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </MoodSection>
          </div>

          <div className="col-span-16 md:col-span-8">
            <MoodSection
              title="Icons"
              description="lucide-react · stroke 2 · --size-icon-md (20px)"
            >
              <div className="flex flex-wrap items-center gap-6">
                <Palette {...iconProps} className="size-(--size-icon-sm) text-accent" />
                <Type {...iconProps} />
                <Box {...iconProps} />
                <Layers {...iconProps} />
                <Sparkles {...iconProps} className="size-(--size-icon-lg) text-primary" />
              </div>
              <p className="ds-text-caption mt-4 text-muted">
                sm / md / lg from CSS variables
              </p>
            </MoodSection>
          </div>

          <div className="col-span-16 md:col-span-8">
            <MoodSection
              title="Surfaces · shell"
              description="Dropdown, tooltip, toast primitives"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
                <div className="min-w-0 flex-1">
                  <p className="ds-text-caption mb-2 text-subtle">.ds-dropdown</p>
                  <div className="ds-dropdown">
                    <button
                      type="button"
                      className="ds-text-body-sm flex w-full px-3 py-2 text-left text-foreground hover:bg-surface-muted"
                    >
                      Account settings
                    </button>
                    <button
                      type="button"
                      className="ds-text-body-sm flex w-full px-3 py-2 text-left text-foreground hover:bg-surface-muted"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="ds-text-caption mb-2 text-subtle">.ds-tooltip</p>
                  <div className="ds-tooltip inline-block">
                    Contextual hint copy
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="ds-text-caption mb-2 text-subtle">.ds-toast</p>
                  <div className="ds-toast">
                    <span className="ds-text-body-sm">
                      Saved to workspace — you can undo for a few seconds.
                    </span>
                  </div>
                </div>
              </div>
            </MoodSection>
          </div>

          <div className="col-span-16">
            <MoodSection
              title="Layout"
              description=".ds-container + .ds-grid (16 columns · 8px gutter · 10px / 30px horizontal inset)"
            >
              <div className="rounded-lg border border-dashed border-border-strong bg-surface-muted/50 p-4">
                <div className="ds-grid min-h-[120px]">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex min-h-14 items-center justify-center rounded-sm bg-accent/15 ds-text-caption text-subtle"
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </MoodSection>
          </div>
        </div>
      </div>
    </div>
  );
}
