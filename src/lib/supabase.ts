
// Supabase client integration for SkillMirror
import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';

// Auth functions
export const auth = {
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  },
  
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  },
  
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  },
  
  getCurrentUser: async () => {
    const { data } = await supabase.auth.getUser();
    return data?.user || null;
  },
  
  getSession: async () => {
    const { data } = await supabase.auth.getSession();
    return data.session;
  }
};

// User profile management
export const userProfiles = {
  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) throw error;
    return data;
  },
  
  updateProfile: async (userId: string, updates: any) => {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },
  
  createProfile: async (userId: string, profile: any) => {
    const { data, error } = await supabase
      .from('users')
      .insert([{ id: userId, ...profile }])
      .select()
      .single();
      
    if (error) throw error;
    return data;
  }
};

// Skills management
export const skillsManager = {
  getUserSkills: async (userId: string) => {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('user_id', userId);
      
    if (error) throw error;
    return data;
  },
  
  updateSkill: async (skillId: string, updates: any) => {
    const { data, error } = await supabase
      .from('skills')
      .update(updates)
      .eq('id', skillId)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },
  
  addSkill: async (skill: any) => {
    const { data, error } = await supabase
      .from('skills')
      .insert([skill])
      .select()
      .single();
      
    if (error) throw error;
    return data;
  }
};

// Projects management
export const projectsManager = {
  getUserProjects: async (userId: string) => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId);
      
    if (error) throw error;
    return data;
  },
  
  updateProject: async (projectId: string, updates: any) => {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', projectId)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },
  
  addProject: async (project: any) => {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();
      
    if (error) throw error;
    return data;
  }
};

// Conversations with AI colleagues
export const conversationsManager = {
  getUserConversations: async (userId: string) => {
    const { data, error } = await supabase
      .from('conversations')
      .select('*, ai_colleagues(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  },
  
  getConversationMessages: async (conversationId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
      
    if (error) throw error;
    return data;
  },
  
  createConversation: async (conversation: any) => {
    const { data, error } = await supabase
      .from('conversations')
      .insert([conversation])
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },
  
  addMessage: async (message: any) => {
    const { data, error } = await supabase
      .from('messages')
      .insert([message])
      .select()
      .single();
      
    if (error) throw error;
    return data;
  }
};

// Learning resources
export const resourcesManager = {
  getResources: async (filters = {}) => {
    const { data, error } = await supabase
      .from('learning_resources')
      .select('*')
      .match(filters);
      
    if (error) throw error;
    return data;
  },
  
  getResourceById: async (id: string) => {
    const { data, error } = await supabase
      .from('learning_resources')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  }
};

// Interview practice sessions
export const interviewsManager = {
  getUserInterviews: async (userId: string, status: string | null = null) => {
    try {
      let query = supabase
        .from('interviews')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
        
      if (status) {
        query = query.eq('status', status);
      }
        
      const { data, error } = await query;
        
      if (error) throw error;
      
      // Parse the settings field for each interview if it exists
      return data.map(interview => {
        try {
          if (interview.settings && typeof interview.settings === 'string') {
            interview.settings = JSON.parse(interview.settings as string);
          }
        } catch (e) {
          console.error("Error parsing interview settings:", e);
          interview.settings = {};
        }
        return interview;
      });
    } catch (error) {
      console.error('Error fetching interviews:', error);
      return [];
    }
  },

  createInterview: async (interviewData: {
    user_id: string;
    title: string;
    job_title: string;
    interviewer_type: string;
    settings?: string | Record<string, any>;
    status: string;
    [key: string]: any;
  }) => {
    try {
      // Ensure settings is a string
      if (interviewData.settings && typeof interviewData.settings !== 'string') {
        interviewData.settings = JSON.stringify(interviewData.settings);
      }
      
      const { data, error } = await supabase
        .from('interviews')
        .insert(interviewData)
        .select()
        .single();
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error creating interview:', error);
      throw error;
    }
  },

  getInterviewById: async (interviewId: string) => {
    try {
      const { data, error } = await supabase
        .from('interviews')
        .select('*')
        .eq('id', interviewId)
        .single();
      
      if (error) throw error;
      
      // Parse the settings field if it exists
      try {
        if (data.settings && typeof data.settings === 'string') {
          data.settings = JSON.parse(data.settings as string);
        }
      } catch (e) {
        console.error("Error parsing interview settings:", e);
        data.settings = {};
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching interview:', error);
      throw error;
    }
  },

  updateInterview: async (interviewId: string, updates: {
    status?: string;
    feedback?: string;
    settings?: string | Record<string, any>;
    [key: string]: any;
  }) => {
    try {
      // If settings is an object, stringify it
      if (updates.settings && typeof updates.settings === 'object') {
        updates.settings = JSON.stringify(updates.settings);
      }
      
      const { data, error } = await supabase
        .from('interviews')
        .update(updates)
        .eq('id', interviewId)
        .select()
        .single();
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error updating interview:', error);
      throw error;
    }
  },

  deleteInterview: async (interviewId: string) => {
    try {
      const { error } = await supabase
        .from('interviews')
        .delete()
        .eq('id', interviewId);
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error deleting interview:', error);
      throw error;
    }
  }
};

// AI Colleagues
export const aiColleaguesManager = {
  getAllColleagues: async () => {
    const { data, error } = await supabase
      .from('ai_colleagues')
      .select('*');
      
    if (error) throw error;
    return data;
  },
  
  getColleagueById: async (id: string) => {
    const { data, error } = await supabase
      .from('ai_colleagues')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  }
};

// Realtime subscription helpers
export const realtime = {
  subscribeToTable: (tableName: string, callback: (payload: any) => void) => {
    const channel = supabase
      .channel(`public:${tableName}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: tableName }, callback)
      .subscribe();
      
    return channel;
  },
  
  unsubscribe: (channel: any) => {
    supabase.removeChannel(channel);
  }
};
