export interface Parceiro {
  id: number;
  created_at: string;
  nome: string;
  imagem: string | null;
  endereco: string | null;
  site: string | null;
  observacao: string | null;
}