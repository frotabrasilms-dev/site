export interface Parceiro {
  id: number;
  created_at: string;
  nome: string;
  imagem: string | null;
  endereco: string | null;
  site?: string;
  observacao?: string;
  cnpj?: string;
  contato_nome?: string;
  whatsapp?: string;
  exibir_whatsapp?: boolean;
}