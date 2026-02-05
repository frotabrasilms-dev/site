import { supabase } from '@/integrations/supabase/client';
import { Parceiro } from '../types/parceiro';

export const getParceiros = async (): Promise<Parceiro[]> => {
    const { data, error } = await supabase.from('parceiros').select('*');
    if (error) {
        console.error('Error fetching parceiros:', error);
        return [];
    }
    return data || [];
};

export const adicionarParceiro = async (novoParceiro: Omit<Parceiro, 'id' | 'created_at'>) => {
  // Converte strings vazias para null para campos opcionais
  const dataToInsert = {
    ...novoParceiro,
    imagem: novoParceiro.imagem === '' ? null : novoParceiro.imagem,
    endereco: novoParceiro.endereco === '' ? null : novoParceiro.endereco,
    site: novoParceiro.site === '' ? null : novoParceiro.site,
    observacao: novoParceiro.observacao === '' ? null : novoParceiro.observacao,
  };

  const { data, error } = await supabase
    .from('parceiros')
    .insert([dataToInsert])
    .select();

  if (error) {
    console.error('Error adding parceiro:', error);
    throw error;
  }

  return data;
};