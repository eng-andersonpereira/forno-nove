export const INFO = {
  endereco: "Av. Exemplo, 123 – Centro, Itabuna – BA",
  mapaBusca: "Itabuna, Bahia", // o que o Google Maps vai procurar (use o endereço real depois)
  telefone: "(73) 99999-9999",
  instagram: "@fornonove",
  // índice 0 = domingo ... 6 = sábado. null = fechado
  horarios: [
    { dia: "Domingo", hora: ["18:00", "23:00"] },
    { dia: "Segunda", hora: null },
    { dia: "Terça", hora: ["18:00", "23:00"] },
    { dia: "Quarta", hora: ["18:00", "23:00"] },
    { dia: "Quinta", hora: ["18:00", "23:00"] },
    { dia: "Sexta", hora: ["18:00", "23:59"] },
    { dia: "Sábado", hora: ["18:00", "23:59"] },
  ] as { dia: string; hora: [string, string] | null }[],
};