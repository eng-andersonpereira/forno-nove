const CHAPTERS = [
  { video: "/videos/massa.mp4", title: "A massa descansa 48 horas", text: "Fermentação lenta para uma massa leve e cheia de sabor." },
  { video: "/videos/forno.mp4", title: "Forno a lenha", text: "Cada pizza assa em poucos minutos, na temperatura certa." },
  { video: "/videos/corte.mp4", title: "Direto para a sua mesa", text: "Cortada na hora e entregue ainda quente." },
];

export default function Story() {
  return (
    <section className="mx-auto grid max-w-5xl gap-8 px-5 py-16 md:grid-cols-3">
      {CHAPTERS.map((c) => (
        <article key={c.title}>
          <video
            className="mb-4 aspect-[4/5] w-full rounded-2xl object-cover"
            autoPlay muted loop playsInline preload="none"
            aria-hidden="true"
          >
            <source src={c.video} type="video/mp4" />
          </video>
          <h3 className="mb-1 text-xl font-semibold">{c.title}</h3>
          <p className="text-[#b9cbc3]">{c.text}</p>
        </article>
      ))}
    </section>
  );
}