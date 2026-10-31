"use client";
import { useEffect, useRef, useState } from "react";

// from/to = parte da rolagem (0 a 1) em que cada texto aparece
const SCENES = [
  { from: 0, to: 0.2, step: "Pizzaria artesanal", title: "Forno Nove", text: "Massa de 48 horas, forno a lenha e entrega quentinha." },
  { from: 0.25, to: 0.5, step: "1 · A massa", title: "Tudo começa na massa", text: "Fermentação lenta por 48 horas, aberta à mão." },
  { from: 0.55, to: 0.75, step: "2 · O forno", title: "Fogo de verdade", text: "Cada pizza assa em poucos minutos, direto na lenha." },
  { from: 0.8, to: 1, step: "3 · A mesa", title: "Quentinha para você", text: "Role mais um pouco e escolha a sua." },
];

export default function ScrollStory() {
  const sec = useRef<HTMLElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState(0);

  useEffect(() => {
    const v = vid.current!;
    const s = sec.current!;
    let target = 0, current = 0, raf = 0;

    // destrava o vídeo no celular (play e pause uma vez)
    const unlock = () => v.play().then(() => v.pause()).catch(() => {});
    v.addEventListener("loadedmetadata", unlock, { once: true });

    const onScroll = () => {
      const r = s.getBoundingClientRect();
      target = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)));
      if (bar.current) bar.current.style.transform = `scaleX(${target})`;
      const idx = SCENES.findIndex((c) => target >= c.from && target <= c.to);
      setScene(idx);
    };

    const tick = () => {
      current += (target - current) * 0.15; // suaviza o movimento
      if (v.duration && Math.abs(v.currentTime - current * v.duration) > 0.02) {
        v.currentTime = current * v.duration;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sec} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <video
          ref={vid}
          src="/videos/historia.mp4"
          poster="/images/hero-poster.jpg"
          muted playsInline preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2820] via-[#0d2820]/40 to-[#0d2820]/10" />

        <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-[#f2c14e]" ref={bar} />
        <div className="absolute left-0 top-0 p-5 text-lg font-extrabold tracking-tight">Forno Nove</div>

        {SCENES.map((c, i) => {
          const H = (i === 0 ? "h1" : "h2") as "h1";
          return (
            <div key={c.title}
              className={`absolute inset-x-0 bottom-0 px-6 pb-24 transition duration-700 md:px-16 ${scene === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"}`}>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#f2c14e]">{c.step}</p>
              <H className={`mb-4 max-w-3xl font-extrabold leading-[0.95] tracking-tight ${i === 0 ? "text-[clamp(3.5rem,14vw,8rem)]" : "text-[clamp(2.2rem,7vw,4.5rem)]"}`}>
                {c.title}
              </H>
              <p className="max-w-[40ch] text-lg text-[#d3e0da]">{c.text}</p>
              {i === 0 && (
                <p className="mt-6 text-sm text-[#d3e0da]">Role para ver como fazemos ↓</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}