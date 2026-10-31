"use client";
import { useState } from "react";
import { ITEMS, brl } from "@/lib/menu";
import { useCart } from "./CartProvider";

export default function CartSheet() {
  const { lines, change, open, setOpen } = useCart();
  const [nome, setNome] = useState("");
  const [entrega, setEntrega] = useState(true);
  const [end, setEnd] = useState("");
  const [pag, setPag] = useState("Pix");
  const [obs, setObs] = useState("");
  const [erro, setErro] = useState("");

  const item = (id: string) => ITEMS.find((p) => p.id === id)!;
  const price = (id: string, opt: number) => item(id).options[opt].price;
  const label = (id: string, opt: number) => item(id).options[opt].label;
  const total = lines.reduce((a, l) => a + price(l.id, l.opt) * l.qty, 0);
  const count = lines.reduce((a, l) => a + l.qty, 0);

  function enviar() {
    if (!nome.trim()) return setErro("Informe seu nome para continuar.");
    if (entrega && !end.trim()) return setErro("Informe o endereço de entrega.");
    setErro("");
    const itens = lines
      .map((l) => `• ${l.qty}x ${item(l.id).name} (${label(l.id, l.opt)}) – ${brl(price(l.id, l.opt) * l.qty)}`)
      .join("\n");
    const msg = `Olá! Quero fazer um pedido:\n\n${itens}\n\nTotal: ${brl(total)}\nNome: ${nome}\n${entrega ? "Entrega em: " + end : "Retirada no local"}\nPagamento: ${pag}${obs.trim() ? "\nObservações: " + obs.trim() : ""}`;
    window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATS}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  const field = "w-full rounded-lg border border-white/20 bg-[#0d2820] p-3";

  return (
    <>
      {count > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/15 bg-[#0d2820] p-3">
          <button onClick={() => setOpen(true)}
            className="flex w-full justify-between rounded-2xl bg-[#e0432f] px-5 py-3.5 font-semibold text-white">
            <span>{count} {count === 1 ? "item" : "itens"}</span><span>{brl(total)}</span>
          </button>
        </div>
      )}
      {open && (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/40 backdrop-blur-sm md:items-stretch md:justify-end"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div className="max-h-[92vh] w-full max-w-lg overflow-auto rounded-t-3xl bg-[#12332a] p-5 shadow-2xl md:max-h-none md:max-w-md md:rounded-none">
            <button onClick={() => setOpen(false)} aria-label="Fechar" className="float-right text-3xl">×</button>
            <h2 className="mb-3 text-2xl font-bold">Seu pedido</h2>
            {lines.map((l, i) => (
              <div key={i} className="flex items-center gap-3 border-b border-white/15 py-3">
                <div className="flex-1 font-semibold">
                  {item(l.id).name}
                  <span className="block text-sm font-normal text-[#b9cbc3]">{label(l.id, l.opt)} · {brl(price(l.id, l.opt))}</span>
                </div>
                <button onClick={() => change(i, -1)} aria-label="Diminuir" className="h-8 w-8 rounded-full border border-white/20">−</button>
                <span>{l.qty}</span>
                <button onClick={() => change(i, 1)} aria-label="Aumentar" className="h-8 w-8 rounded-full border border-white/20">+</button>
              </div>
            ))}
            <label className="mb-1 mt-4 block text-sm text-[#b9cbc3]">Seu nome</label>
            <input className={field} value={nome} onChange={(e) => setNome(e.target.value)} />
            <label className="mb-1 mt-4 block text-sm text-[#b9cbc3]">Como você quer receber?</label>
            <select className={field} onChange={(e) => setEntrega(e.target.value === "Entrega")}>
              <option>Entrega</option><option>Retirada no local</option>
            </select>
            {entrega && (<>
              <label className="mb-1 mt-4 block text-sm text-[#b9cbc3]">Endereço de entrega</label>
              <input className={field} value={end} onChange={(e) => setEnd(e.target.value)} />
            </>)}
            <label className="mb-1 mt-4 block text-sm text-[#b9cbc3]">Pagamento</label>
            <select className={field} value={pag} onChange={(e) => setPag(e.target.value)}>
              <option>Pix</option><option>Cartão na entrega</option><option>Dinheiro</option>
            </select>
            <label className="mb-1 mt-4 block text-sm text-[#b9cbc3]">Observações (opcional)</label>
            <input className={field} value={obs} onChange={(e) => setObs(e.target.value)} placeholder="Ex.: sem cebola, sabor do refri..." />
            <div className="my-5 flex justify-between text-xl font-extrabold"><span>Total</span><span>{brl(total)}</span></div>
            <p role="alert" className="min-h-5 text-sm text-red-300">{erro}</p>
            <button onClick={enviar} className="w-full rounded-2xl bg-[#25a35a] py-4 font-semibold text-white">
              Enviar pedido pelo WhatsApp
            </button>
          </div>
        </div>
      )}
    </>
  );
}