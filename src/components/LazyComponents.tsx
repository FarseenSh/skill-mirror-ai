
import { lazy } from 'react';
import { lazyLoad } from '@/utils/lazyLoad';

// Lazy load components that are not needed immediately
export const LazyInterviewDashboard = lazyLoad(() => 
  import('./interview/InterviewDashboard').then(module => ({ 
    default: module.InterviewDashboard 
  }))
);

export const LazyInterviewSimulator = lazyLoad(() => 
  import('./interview/InterviewSimulator').then(module => ({ 
    default: module.InterviewSimulator 
  }))
);

export const LazyWorkspaceTaskPanel = lazyLoad(() => import('./workspace/TaskPanel'));
export const LazyCodeEditor = lazyLoad(() => import('./workspace/CodeEditor'));
export const LazySkillProgressTracker = lazyLoad(() => import('./workspace/SkillProgressTracker'));

export const LazyPortfolioProjects = lazyLoad(() => 
  import('./projects/PortfolioProjects').then(module => ({ 
    default: module.PortfolioProjects 
  }))
);

export const LazyCareerSkillProjectRecommendations = lazyLoad(() => 
  import('./career/CareerSkillProjectRecommendations').then(module => ({ 
    default: module.CareerSkillProjectRecommendations 
  }))
);
