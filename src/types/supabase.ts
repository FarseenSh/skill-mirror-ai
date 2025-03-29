
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          job_title: string | null
          company: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          job_title?: string | null
          company?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          job_title?: string | null
          company?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      skills: {
        Row: {
          id: string
          user_id: string
          name: string
          category: string
          proficiency: number
          last_practiced: string | null
          target_proficiency: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          category: string
          proficiency: number
          last_practiced?: string | null
          target_proficiency?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          category?: string
          proficiency?: number
          last_practiced?: string | null
          target_proficiency?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          status: string
          deadline: string | null
          priority: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          status: string
          deadline?: string | null
          priority?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          status?: string
          deadline?: string | null
          priority?: string
          created_at?: string
          updated_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          user_id: string
          ai_colleague_id: string
          title: string
          summary: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          ai_colleague_id: string
          title: string
          summary?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          ai_colleague_id?: string
          title?: string
          summary?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          sender_type: 'user' | 'ai'
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          sender_type: 'user' | 'ai'
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          sender_type?: 'user' | 'ai'
          content?: string
          created_at?: string
        }
      }
      learning_resources: {
        Row: {
          id: string
          title: string
          description: string
          type: string
          url: string | null
          content: string | null
          category: string[]
          skill_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          type: string
          url?: string | null
          content?: string | null
          category: string[]
          skill_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          type?: string
          url?: string | null
          content?: string | null
          category?: string[]
          skill_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      interviews: {
        Row: {
          id: string
          user_id: string
          title: string
          job_title: string
          interviewer_type: string
          status: string
          feedback: string | null
          recording_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          job_title: string
          interviewer_type: string
          status: string
          feedback?: string | null
          recording_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          job_title?: string
          interviewer_type?: string
          status?: string
          feedback?: string | null
          recording_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      ai_colleagues: {
        Row: {
          id: string
          name: string
          role: string
          personality: string
          avatar_url: string | null
          voice_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          personality: string
          avatar_url?: string | null
          voice_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          personality?: string
          avatar_url?: string | null
          voice_id?: string | null
          created_at?: string
        }
      }
    }
  }
}
