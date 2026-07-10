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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      alert_log: {
        Row: {
          brand_id: string | null
          id: string
          score: number | null
          sent_at: string | null
          threshold: number | null
          user_id: string | null
        }
        Insert: {
          brand_id?: string | null
          id?: string
          score?: number | null
          sent_at?: string | null
          threshold?: number | null
          user_id?: string | null
        }
        Update: {
          brand_id?: string | null
          id?: string
          score?: number | null
          sent_at?: string | null
          threshold?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alert_log_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      api_keys: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          key_hash: string
          label: string | null
          last_used_at: string | null
          permissions: string[] | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_hash: string
          label?: string | null
          last_used_at?: string | null
          permissions?: string[] | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_hash?: string
          label?: string | null
          last_used_at?: string | null
          permissions?: string[] | null
          user_id?: string | null
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address: string | null
          metadata: Json | null
          resource: string | null
          resource_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          resource?: string | null
          resource_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          resource?: string | null
          resource_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      brands: {
        Row: {
          category: string
          created_at: string | null
          domain: string | null
          founded_year: number | null
          id: string
          logo_url: string | null
          mca_cin: string | null
          name: string
          naukri_id: string | null
          play_package: string | null
          shopify_domain: string | null
          slug: string
          status: string | null
          sub_category: string | null
          updated_at: string | null
          youtube_id: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          domain?: string | null
          founded_year?: number | null
          id?: string
          logo_url?: string | null
          mca_cin?: string | null
          name: string
          naukri_id?: string | null
          play_package?: string | null
          shopify_domain?: string | null
          slug: string
          status?: string | null
          sub_category?: string | null
          updated_at?: string | null
          youtube_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          domain?: string | null
          founded_year?: number | null
          id?: string
          logo_url?: string | null
          mca_cin?: string | null
          name?: string
          naukri_id?: string | null
          play_package?: string | null
          shopify_domain?: string | null
          slug?: string
          status?: string | null
          sub_category?: string | null
          updated_at?: string | null
          youtube_id?: string | null
        }
        Relationships: []
      }
      breakout_scores: {
        Row: {
          brand_id: string | null
          calculated_at: string | null
          convergence_multiplier: number | null
          id: string
          raw_score: number | null
          score: number
          score_tier: string | null
          signals_active: string[] | null
          week_number: number
          year: number
        }
        Insert: {
          brand_id?: string | null
          calculated_at?: string | null
          convergence_multiplier?: number | null
          id?: string
          raw_score?: number | null
          score: number
          score_tier?: string | null
          signals_active?: string[] | null
          week_number: number
          year: number
        }
        Update: {
          brand_id?: string | null
          calculated_at?: string | null
          convergence_multiplier?: number | null
          id?: string
          raw_score?: number | null
          score?: number
          score_tier?: string | null
          signals_active?: string[] | null
          week_number?: number
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "breakout_scores_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      domain_events: {
        Row: {
          brand_id: string | null
          detected_at: string | null
          domain: string
          id: string
          issuer: string | null
          notes: string | null
          signal_type: string | null
        }
        Insert: {
          brand_id?: string | null
          detected_at?: string | null
          domain: string
          id?: string
          issuer?: string | null
          notes?: string | null
          signal_type?: string | null
        }
        Update: {
          brand_id?: string | null
          detected_at?: string | null
          domain?: string
          id?: string
          issuer?: string | null
          notes?: string | null
          signal_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "domain_events_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      job_postings: {
        Row: {
          brand_id: string | null
          department: string | null
          detected_at: string | null
          id: string
          is_active: boolean | null
          job_title: string
          location: string | null
          posted_date: string | null
          source_url: string | null
          strategic_signal: string | null
        }
        Insert: {
          brand_id?: string | null
          department?: string | null
          detected_at?: string | null
          id?: string
          is_active?: boolean | null
          job_title: string
          location?: string | null
          posted_date?: string | null
          source_url?: string | null
          strategic_signal?: string | null
        }
        Update: {
          brand_id?: string | null
          department?: string | null
          detected_at?: string | null
          id?: string
          is_active?: boolean | null
          job_title?: string
          location?: string | null
          posted_date?: string | null
          source_url?: string | null
          strategic_signal?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_postings_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      new_entrants: {
        Row: {
          category: string | null
          created_at: string | null
          detected_name: string | null
          first_seen: string
          id: string
          price_range: string | null
          product_count: number | null
          promoted_to_brands: boolean | null
          shopify_domain: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          detected_name?: string | null
          first_seen: string
          id?: string
          price_range?: string | null
          product_count?: number | null
          promoted_to_brands?: boolean | null
          shopify_domain: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          detected_name?: string | null
          first_seen?: string
          id?: string
          price_range?: string | null
          product_count?: number | null
          promoted_to_brands?: boolean | null
          shopify_domain?: string
        }
        Relationships: []
      }
      predictions: {
        Row: {
          brand_id: string | null
          id: string
          outcome: string | null
          outcome_verified: boolean | null
          predicted_at: string
          predicted_score: number
          prediction_text: string
          verified_at: string | null
          verify_by: string
        }
        Insert: {
          brand_id?: string | null
          id?: string
          outcome?: string | null
          outcome_verified?: boolean | null
          predicted_at: string
          predicted_score: number
          prediction_text: string
          verified_at?: string | null
          verify_by: string
        }
        Update: {
          brand_id?: string | null
          id?: string
          outcome?: string | null
          outcome_verified?: boolean | null
          predicted_at?: string
          predicted_score?: number
          prediction_text?: string
          verified_at?: string | null
          verify_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "predictions_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      product_snapshots: {
        Row: {
          brand_id: string | null
          compare_at_price: number | null
          id: string
          in_stock: boolean | null
          is_new: boolean | null
          is_removed: boolean | null
          price: number | null
          product_handle: string
          product_title: string
          snapshot_date: string
        }
        Insert: {
          brand_id?: string | null
          compare_at_price?: number | null
          id?: string
          in_stock?: boolean | null
          is_new?: boolean | null
          is_removed?: boolean | null
          price?: number | null
          product_handle: string
          product_title: string
          snapshot_date: string
        }
        Update: {
          brand_id?: string | null
          compare_at_price?: number | null
          id?: string
          in_stock?: boolean | null
          is_new?: boolean | null
          is_removed?: boolean | null
          price?: number | null
          product_handle?: string
          product_title?: string
          snapshot_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_snapshots_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      signal_baselines: {
        Row: {
          avg_value: number
          brand_id: string | null
          calculated_at: string | null
          id: string
          metric_key: string
          sample_size: number | null
          signal_type: string
        }
        Insert: {
          avg_value: number
          brand_id?: string | null
          calculated_at?: string | null
          id?: string
          metric_key: string
          sample_size?: number | null
          signal_type: string
        }
        Update: {
          avg_value?: number
          brand_id?: string | null
          calculated_at?: string | null
          id?: string
          metric_key?: string
          sample_size?: number | null
          signal_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "signal_baselines_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      signal_events: {
        Row: {
          baseline_value: number | null
          brand_id: string | null
          detected_at: string | null
          evidence: Json
          id: string
          raw_value: number | null
          score_contribution: number | null
          signal_subtype: string | null
          signal_type: string
          velocity: number | null
          week_number: number | null
          year: number | null
        }
        Insert: {
          baseline_value?: number | null
          brand_id?: string | null
          detected_at?: string | null
          evidence: Json
          id?: string
          raw_value?: number | null
          score_contribution?: number | null
          signal_subtype?: string | null
          signal_type: string
          velocity?: number | null
          week_number?: number | null
          year?: number | null
        }
        Update: {
          baseline_value?: number | null
          brand_id?: string | null
          detected_at?: string | null
          evidence?: Json
          id?: string
          raw_value?: number | null
          score_contribution?: number | null
          signal_subtype?: string | null
          signal_type?: string
          velocity?: number | null
          week_number?: number | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "signal_events_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      trademark_filings: {
        Row: {
          application_number: string | null
          brand_id: string | null
          class_description: string | null
          class_number: number | null
          detected_at: string | null
          filing_date: string | null
          id: string
          is_new_category: boolean | null
          status: string | null
          trademark_name: string
        }
        Insert: {
          application_number?: string | null
          brand_id?: string | null
          class_description?: string | null
          class_number?: number | null
          detected_at?: string | null
          filing_date?: string | null
          id?: string
          is_new_category?: boolean | null
          status?: string | null
          trademark_name: string
        }
        Update: {
          application_number?: string | null
          brand_id?: string | null
          class_description?: string | null
          class_number?: number | null
          detected_at?: string | null
          filing_date?: string | null
          id?: string
          is_new_category?: boolean | null
          status?: string | null
          trademark_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "trademark_filings_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      watchlists: {
        Row: {
          brand_id: string | null
          created_at: string | null
          id: string
          threshold: number | null
          user_id: string | null
        }
        Insert: {
          brand_id?: string | null
          created_at?: string | null
          id?: string
          threshold?: number | null
          user_id?: string | null
        }
        Update: {
          brand_id?: string | null
          created_at?: string | null
          id?: string
          threshold?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "watchlists_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
