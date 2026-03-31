import HeroNavbar from "./components/HeroNavbar";
import HeroImageSwitcher from "./components/HeroImageSwitcher";

export default function Home() {
  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <section className="relative h-screen w-full overflow-hidden">
        <HeroNavbar />
        <HeroImageSwitcher />
      </section>
      <section aria-hidden="true" className="h-screen w-full" />
    </main>
  );
}
