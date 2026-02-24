export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      associados: {
        Row: {
          apelido: string | null
          bairro: string | null
          categoria_cnh: string | null
          cep: string | null
          cidade: string | null
          cnh: string | null
          cpf: string
          created_at: string
          data_nascimento: string | null
          email: string
          estado: string | null
          foto_url: string | null
          id: number
          indicador_id: string | null
          logradouro: string | null
          nome: string
          nomeacao: string | null
          nomeado: boolean | null
          numero_associado: string | null
          numero_imovel: string | null
          observacao: string | null
          placa_veiculo: string | null
          pontuacao_cnh: number | null
          renavam: string | null
          senha: string | null
          supervisor: string | null
          telefone: string | null
        }
        Insert: {
          apelido?: string | null
          bairro?: string | null
          categoria_cnh?: string | null
          cep?: string | null
          cidade?: string | null
          cnh?: string | null
          cpf: string
          created_at?: string
          data_nascimento?: string | null
          email: string
          estado?: string | null
          foto_url?: string | null
          id?: never
          indicador_id?: string | null
          logradouro?: string | null
          nome: string
          nomeacao?: string | null
          nomeado?: boolean | null
          numero_associado?: string | null
          numero_imovel?: string | null
          observacao?: string | null
          placa_veiculo?: string | null
          pontuacao_cnh?: number | null
          renavam?: string | null
          senha?: string | null
          supervisor?: string | null
          telefone?: string | null
        }
        Update: {
          apelido?: string | null
          bairro?: string | null
          categoria_cnh?: string | null
          cep?: string | null
          cidade?: string | null
          cnh?: string | null
          cpf?: string
          created_at?: string
          data_nascimento?: string | null
          email?: string
          estado?: string | null
          foto_url?: string | null
          id?: never
          indicador_id?: string | null
          logradouro?: string | null
          nome?: string
          nomeacao?: string | null
          nomeado?: boolean | null
          numero_associado?: string | null
          numero_imovel?: string | null
          observacao?: string | null
          placa_veiculo?: string | null
          pontuacao_cnh?: number | null
          renavam?: string | null
          senha?: string | null
          supervisor?: string | null
          telefone?: string | null
        }
        Relationships: []
      }
      cargos: {
        Row: {
          id: number
          nivel: number
          nome: string
        }
        Insert: {
          id?: number
          nivel: number
          nome: string
        }
        Update: {
          id?: number
          nivel?: number
          nome?: string
        }
        Relationships: []
      }
      infracoes: {
        Row: {
          analise_ia: Json | null
          artigo_ctb: string | null
          associado_id: number | null
          created_at: string
          data_infracao: string | null
          data_notificacao: string | null
          documento_url: string | null
          id: number
          local: string | null
          numero_auto: string | null
          orgao_autuador: string | null
          recurso_texto: string | null
          status: string | null
          tipo: string | null
        }
        Insert: {
          analise_ia?: Json | null
          artigo_ctb?: string | null
          associado_id?: number | null
          created_at?: string
          data_infracao?: string | null
          data_notificacao?: string | null
          documento_url?: string | null
          id?: never
          local?: string | null
          numero_auto?: string | null
          orgao_autuador?: string | null
          recurso_texto?: string | null
          status?: string | null
          tipo?: string | null
        }
        Update: {
          analise_ia?: Json | null
          artigo_ctb?: string | null
          associado_id?: number | null
          created_at?: string
          data_infracao?: string | null
          data_notificacao?: string | null
          documento_url?: string | null
          id?: never
          local?: string | null
          numero_auto?: string | null
          orgao_autuador?: string | null
          recurso_texto?: string | null
          status?: string | null
          tipo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "infracoes_associado_id_fkey"
            columns: ["associado_id"]
            isOneToOne: false
            referencedRelation: "associados"
            referencedColumns: ["id"]
          },
        ]
      }
      parceiros: {
        Row: {
          cep: string | null
          cnpj: string | null
          contato_nome: string | null
          created_at: string
          endereco: string | null
          exibir_whatsapp: boolean | null
          id: number
          imagem: string | null
          nome: string
          numero: string | null
          observacao: string | null
          site: string | null
          whatsapp: string | null
        }
        Insert: {
          cep?: string | null
          cnpj?: string | null
          contato_nome?: string | null
          created_at?: string
          endereco?: string | null
          exibir_whatsapp?: boolean | null
          id?: never
          imagem?: string | null
          nome: string
          numero?: string | null
          observacao?: string | null
          site?: string | null
          whatsapp?: string | null
        }
        Update: {
          cep?: string | null
          cnpj?: string | null
          contato_nome?: string | null
          created_at?: string
          endereco?: string | null
          exibir_whatsapp?: boolean | null
          id?: never
          imagem?: string | null
          nome?: string
          numero?: string | null
          observacao?: string | null
          site?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      posicoes_rede: {
        Row: {
          associado_id: number | null
          ativo: boolean | null
          cargo_id: number | null
          codigo_publico: string | null
          data_inicio: string | null
          id: number
          superior_id: number | null
          territorio_id: number | null
        }
        Insert: {
          associado_id?: number | null
          ativo?: boolean | null
          cargo_id?: number | null
          codigo_publico?: string | null
          data_inicio?: string | null
          id?: number
          superior_id?: number | null
          territorio_id?: number | null
        }
        Update: {
          associado_id?: number | null
          ativo?: boolean | null
          cargo_id?: number | null
          codigo_publico?: string | null
          data_inicio?: string | null
          id?: number
          superior_id?: number | null
          territorio_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "posicoes_rede_associado_fkey"
            columns: ["associado_id"]
            isOneToOne: false
            referencedRelation: "associados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posicoes_rede_cargo_id_fkey"
            columns: ["cargo_id"]
            isOneToOne: false
            referencedRelation: "cargos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posicoes_rede_pessoa_id_fkey"
            columns: ["associado_id"]
            isOneToOne: false
            referencedRelation: "associados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posicoes_rede_superior_id_fkey"
            columns: ["superior_id"]
            isOneToOne: false
            referencedRelation: "posicoes_rede"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posicoes_rede_territorio_id_fkey"
            columns: ["territorio_id"]
            isOneToOne: false
            referencedRelation: "territorios"
            referencedColumns: ["id"]
          },
        ]
      }
      supervisores: {
        Row: {
          cpf_nomeado: string
          cpf_supervisor: string
          created_at: string
          id: number
          nome_nomeado: string
          quantidade: number | null
        }
        Insert: {
          cpf_nomeado: string
          cpf_supervisor: string
          created_at?: string
          id?: number
          nome_nomeado: string
          quantidade?: number | null
        }
        Update: {
          cpf_nomeado?: string
          cpf_supervisor?: string
          created_at?: string
          id?: number
          nome_nomeado?: string
          quantidade?: number | null
        }
        Relationships: []
      }
      territorios: {
        Row: {
          estado: string | null
          id: number
          municipio: string | null
          pais: string | null
          regiao: string | null
        }
        Insert: {
          estado?: string | null
          id?: number
          municipio?: string | null
          pais?: string | null
          regiao?: string | null
        }
        Update: {
          estado?: string | null
          id?: number
          municipio?: string | null
          pais?: string | null
          regiao?: string | null
        }
        Relationships: []
      }
      vinculos_associados: {
        Row: {
          associado_id: number | null
          data_entrada: string | null
          id: number
          supervisor_posicao_id: string | null
        }
        Insert: {
          associado_id?: number | null
          data_entrada?: string | null
          id?: number
          supervisor_posicao_id?: string | null
        }
        Update: {
          associado_id?: number | null
          data_entrada?: string | null
          id?: number
          supervisor_posicao_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vinculo_associado_fkey"
            columns: ["associado_id"]
            isOneToOne: false
            referencedRelation: "associados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vinculos_associados_associado_id_fkey"
            columns: ["associado_id"]
            isOneToOne: false
            referencedRelation: "associados"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_associados_report: {
        Args: { filter_estado?: string; include_photo?: boolean }
        Returns: {
          cidade: string
          cpf: string
          created_at: string
          estado: string
          foto_url: string
          has_photo: boolean
          id: number
          nome: string
          numero_associado: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
  | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
  ? R
  : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
    DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
    DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
  ? R
  : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I
  }
  ? I
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Insert: infer I
  }
  ? I
  : never
  : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U
  }
  ? U
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Update: infer U
  }
  ? U
  : never
  : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
  | keyof DefaultSchema["Enums"]
  | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | keyof DefaultSchema["CompositeTypes"]
  | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
  : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
