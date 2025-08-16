import Hero from "./components/Hero";
import End from "./components/End";

export default function HomePage() {
  return (
    <main className="container relative max-w-[1100px] px-2 py-4 z-2 lg:py-8">
      <div
        style={{
          background:
            "repeating-linear-gradient(to bottom, transparent, color-mix(in oklab, var(--color-fd-primary) 1%, transparent) 500px, transparent 1000px)",
        }}
      >
        <Hero
          mobileTitle="Build Your Docs"
          title="Build excellent documentation site with less effort"
          description=" Fumadocs is a beautiful documentation framework for Developers, flexible
        and performant, with everything from Next.js."
          cta={{
            primaryLabel: "Get Started",
            primaryHref: "/blog",
            secondaryLabel: "Try Fumadocs",
            secondaryHref: "https://fumadocs.dev/",
          }}
        />
        <End />
      </div>
    </main>
  );
}
