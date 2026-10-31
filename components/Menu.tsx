"use client";
import Image from "next/image";
import { useState } from "react";
import { ITEMS, CATEGORIES, brl } from "@/lib/menu";
import { useCart } from "./CartProvider";

export default function Menu() {
  const { add } = useCart();
  const [cat, setCat] = useState<string>("pizzas");
  const [sel, setSel] = useState<Record<string, number>>({});
  const [done, setDone] = useState<string | null>(null);

  function adicionar(id: string, opt: number) {
    add(id, opt);
    setDone(id);
    setTimeout(() => setDone((d) => (d === id ? null : d)), 1200);
  }

  return (
    <section id="cardapio" className="mx-auto max-w-6xl px-5 pb-32 pt-24">
      <h2 className="mb-2 text-4xl font-extrabold tracking-tight md:text-5xl">Escolha a sua</h2>
      <p className="mb-8 text-[#d3e0da]">Toque na opção, adicione e finalize pelo WhatsApp.</p>

      <div className="mb-8 flex gap-2" role="tablist">
        {CATEGORIES.map((c) => (
          <button key={c.id} role="tab" aria-selected={cat === c.id}
            onClick={() => setCat(c.id)}
            className={`rounded-full px-6 py-2.5 font-semibold transition ${cat === c.id ? "bg-[#f2c14e] text-[#2b2105]" : "border border-white/25 bg-[#0d2820]/60 backdrop-blur"}`}>
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ITEMS.filter((i) => i.category === cat).map((p) => {
          const opt = sel[p.id] ?? (p.category === "pizzas" ? 1 : 0);
          return (
            <article key={p.id} className="overflow-hidden rounded-3xl border border-white/15 bg-[#0d2820]/70 backdrop-blur-md">
              {p.img ? (
                <Image src={p.img} alt={p.name} width={640} height={420} className="h-48 w-full object-cover" />
              ) : (
                <div className="grid h-48 place-items-center bg-[#12332a] text-7xl" aria-hidden="true">{p.emoji}</div>
              )}
              <div className="p-5">
                <h3 className="text-xl font-bold">{p.name}</h3>
                <p className="mb-4 mt-1 text-sm text-[#b9cbc3]">{p.desc}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {p.options.map((o, k) => (
                    <button key={o.label} aria-pressed={opt === k}
                      onClick={() => setSel({ ...sel, [p.id]: k })}
                      className={`flex-1 rounded-xl border px-2 py-2 text-center text-sm transition ${opt === k ? "border-[#f2c14e] bg-[#f2c14e]/20" : "border-white/20"}`}>
                      {o.label}
                      <span className="block text-xs text-[#b9cbc3]">{brl(o.price)}</span>
                    </button>
                  ))}
                </div>
                <button onClick={() => adicionar(p.id, opt)}
                  className={`w-full rounded-full py-3 font-semibold transition active:scale-95 ${done === p.id ? "bg-[#25a35a] text-white" : "bg-[#f2c14e] text-[#2b2105]"}`}>
                  {done === p.id ? "Adicionado ✓" : "Adicionar"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}