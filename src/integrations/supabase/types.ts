export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_colleagues: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          name: string
          personality: string
          role: string
          voice_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          name: string
          personality: string
          role: string
          voice_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          name?: string
          personality?: string
          role?: string
          voice_id?: string | null
        }
        Relationships: []
      }
      conversations: {
        Row: {
          ai_colleague_id: string
          created_at: string
          id: string
          summary: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_colleague_id: string
          created_at?: string
          id?: string
          summary?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_colleague_id?: string
          created_at?: string
          id?: string
          summary?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_ai_colleague_id_fkey"
            columns: ["ai_colleague_id"]
            isOneToOne: false
            referencedRelation: "ai_colleagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      interviews: {
        Row: {
          created_at: string
          feedback: string | null
          id: string
          interviewer_type: string
          job_title: string
          recording_url: string | null
          settings: Json | null
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          feedback?: string | null
          id?: string
          interviewer_type: string
          job_title: string
          recording_url?: string | null
          settings?: Json | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          feedback?: string | null
          id?: string
          interviewer_type?: string
          job_title?: string
          recording_url?: string | null
          settings?: Json | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "interviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_resources: {
        Row: {
          category: string[]
          content: string | null
          created_at: string
          description: string
          id: string
          skill_id: string | null
          title: string
          type: string
          updated_at: string
          url: string | null
        }
        Insert: {
          category: string[]
          content?: string | null
          created_at?: string
          description: string
          id?: string
          skill_id?: string | null
          title: string
          type: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          category?: string[]
          content?: string | null
          created_at?: string
          description?: string
          id?: string
          skill_id?: string | null
          title?: string
          type?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "learning_resources_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          sender_type: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          sender_type: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          sender_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      project_skills: {
        Row: {
          created_at: string | null
          id: string
          project_id: string | null
          skill_level: number
          skill_name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          project_id?: string | null
          skill_level: number
          skill_name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          project_id?: string | null
          skill_level?: number
          skill_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_skills_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_submissions: {
        Row: {
          content: string
          feedback: string | null
          id: string
          project_id: string | null
          submission_type: string
          submitted_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          feedback?: string | null
          id?: string
          project_id?: string | null
          submission_type: string
          submitted_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          feedback?: string | null
          id?: string
          project_id?: string | null
          submission_type?: string
          submitted_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_submissions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_subtasks: {
        Row: {
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          project_id: string | null
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          project_id?: string | null
          status?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          project_id?: string | null
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_subtasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          assigned_to: string | null
          created_at: string
          deadline: string | null
          description: string | null
          feedback: string | null
          id: string
          portfolio_visible: boolean
          priority: string
          progress: number
          project_type: string
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          deadline?: string | null
          description?: string | null
          feedback?: string | null
          id?: string
          portfolio_visible?: boolean
          priority?: string
          progress?: number
          project_type?: string
          status: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          deadline?: string | null
          description?: string | null
          feedback?: string | null
          id?: string
          portfolio_visible?: boolean
          priority?: string
          progress?: number
          project_type?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          category: string
          created_at: string
          id: string
          last_practiced: string | null
          name: string
          proficiency: number
          target_proficiency: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          last_practiced?: string | null
          name: string
          proficiency: number
          target_proficiency?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          last_practiced?: string | null
          name?: string
          proficiency?: number
          target_proficiency?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "skills_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          job_title: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          job_title?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          job_title?: string | null
          updated_at?: string
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
