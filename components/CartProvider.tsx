"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type Line = { id: string; opt: number; qty: number };

type Ctx = {
  lines: Line[];
  add: (id: string, opt: number) => void;
  change: (index: number, delta: number) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const CartCtx = createContext<Ctx>(null!);
export const useCart = () => useContext(CartCtx);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);

  const add = (id: string, opt: number) =>
    setLines((l) => {
      const found = l.find((x) => x.id === id && x.opt === opt);
      return found
        ? l.map((x) => (x === found ? { ...x, qty: x.qty + 1 } : x))
        : [...l, { id, opt, qty: 1 }];
    });

  const change = (index: number, delta: number) =>
    setLines((l) =>
      l.map((x, i) => (i === index ? { ...x, qty: x.qty + delta } : x)).filter((x) => x.qty > 0)
    );

  return (
    <CartCtx.Provider value={{ lines, add, change, open, setOpen }}>
      {children}
    </CartCtx.Provider>
  );
}