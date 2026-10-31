"use client";
import { useEffect, useState } from "react";
import { INFO } from "@/lib/info";

const toMin = (h: string) => {
  const [a, b] = h.split(":").map(Number);
  return a * 60 + b;
};

function calcStatus() {
  const d = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Bahia" }));
  const dia = d.getDay();
  const agora = d.getHours() * 60 + d.getMinutes();
  const hoje = INFO.horarios[dia].hora;
  if (hoje && agora >= toMin(hoje[0]) && agora < toMin(hoje[1])) {
    return { aberto: true, texto: `Aberto agora · fecha às ${hoje[1]}`, dia };
  }
  for (let i = 0; i < 7; i++) {
    const idx = (dia + i) % 7;
    const h = INFO.horarios[idx].hora;
    if (!h) continue;
    if (i === 0 && agora >= toMin(h[0])) continue;
    const quando = i === 0 ? "hoje" : i === 1 ? "amanhã" : INFO.horarios[idx].dia;
    return { aberto: false, texto: `Fechado agora · abre ${quando} às ${h[0]}`, dia };
  }
  return { aberto: false, texto: "Fechado", dia };
}

export default function Info() {
  const [st, setSt] = useState<ReturnType<typeof calcStatus> | null>(null);

  useEffect(() => {
    setSt(calcStatus());
    const t = setInterval(() => setSt(calcStatus()), 60000);
    return () => clearInterval(t);
  }, []);

  const q = encodeURIComponent(INFO.mapaBusca);
  const ordem = [1, 2, 3, 4, 5, 6, 0]; // mostra de segunda a domingo

  return (
    <section id="local" className="relative z-10 bg-[#0d2820] px-5 pb-36 pt-20">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight">Horários e localização</h2>

          {st && (
            <p className={`mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${st.aberto ? "bg-[#25a35a]/25 text-[#8ff0b5]" : "bg-[#e0432f]/25 text-[#ffb4a8]"}`}>
              <span className={`h-2.5 w-2.5 rounded-full ${st.aberto ? "bg-[#25a35a]" : "bg-[#e0432f]"}`} />
              {st.texto}
            </p>
          )}

          <ul className="mb-8 max-w-sm divide-y divide-white/15">
            {ordem.map((i) => {
              const h = INFO.horarios[i];
              const hoje = st?.dia === i;
              return (
                <li key={h.dia} className={`flex justify-between py-2.5 ${hoje ? "font-bold text-[#f2c14e]" : "text-[#d3e0da]"}`}>
                  <span>{h.dia}{hoje ? " (hoje)" : ""}</span>
                  <span>{h.hora ? `${h.hora[0]} – ${h.hora[1]}` : "Fechado"}</span>
                </li>
              );
            })}
          </ul>

          <p className="mb-1 font-semibold">Endereço</p>
          <p className="mb-6 text-[#d3e0da]">{INFO.endereco}</p>

          <div className="flex flex-wrap gap-3">
            <a href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener noreferrer"
              className="rounded-full bg-[#f2c14e] px-6 py-3 font-semibold text-[#2b2105]">Como chegar</a>
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATS}`} target="_blank" rel="noopener noreferrer"
              className="rounded-full border border-white/30 px-6 py-3 font-semibold">WhatsApp {INFO.telefone}</a>
          </div>
          <p className="mt-4 text-sm text-[#b9cbc3]">Instagram {INFO.instagram}</p>
        </div>

        <iframe
          title="Mapa da pizzaria"
          src={`https://www.google.com/maps?q=${q}&output=embed`}
          className="h-80 w-full rounded-3xl border-0 md:h-full md:min-h-96"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}