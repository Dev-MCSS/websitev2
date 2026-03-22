import { ThemeToggle } from "./components/theme-toggle";

export default function Home() {
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-6 bg-background px-4 py-8">
      <h1 className="ds-text-headline text-foreground">Hello</h1>
      <ThemeToggle />
    </div>
  );
}
