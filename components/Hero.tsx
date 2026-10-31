export default function Hero() {
  return (
    <header className="relative flex min-h-[92vh] items-end overflow-hidden p-6">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay muted loop playsInline preload="metadata"
        poster="/images/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-[#12332a] via-[#12332a]/55 to-transparent" />
      <div className="relative max-w-3xl pb-8">
        <h1 className="mb-4 text-[clamp(3rem,13vw,7.5rem)] font-extrabold leading-[0.9] tracking-tight">
          Forno Nove
        </h1>
        <p className="mb-6 max-w-[34ch] text-lg text-[#b9cbc3]">
          Massa de 48 horas, forno a lenha e entrega quentinha.
        </p>
        <a href="#cardapio" className="inline-block rounded-full bg-[#e0432f] px-7 py-3.5 font-semibold text-white hover:bg-[#c93624]">
          Ver cardápio e pedir
        </a>
      </div>
    </header>
  );
}