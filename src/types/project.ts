export interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  deadline: string | null;
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
  project_type: 'assigned' | 'recommended' | 'personal';
  progress: number;
  assigned_to: string | null;
  feedback: string | null;
  portfolio_visible: boolean;
  skills?: ProjectSkill[]; // Add optional skills property for project recommendations
}

export interface ProjectSkill {
  id: string;
  project_id: string;
  skill_name: string;
  skill_level: number;
  created_at: string;
}

export interface ProjectSubtask {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectSubmission {
  id: string;
  project_id: string;
  user_id: string;
  content: string;
  submission_type: 'code' | 'document' | 'link' | 'other';
  feedback: string | null;
  submitted_at: string;
}
