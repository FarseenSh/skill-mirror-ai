import { Project, ProjectSkill, ProjectSubmission } from "@/types/project";
import { Skill } from "@/data/skillsData";
import { skillsManager, projectsManager, projectSkillsManager } from "./supabase";

// Function to find skill gaps based on target role requirements
export const findSkillGaps = async (
  userId: string,
  targetRoleSkills: { name: string; required: number }[]
): Promise<{ skill: string; current: number; target: number; gap: number }[]> => {
  try {
    // Get user's current skills
    const userSkills = await skillsManager.getUserSkills(userId);
    
    // Calculate gaps
    const gaps = targetRoleSkills.map(requiredSkill => {
      const userSkill = userSkills.find(s => 
        s.name.toLowerCase() === requiredSkill.name.toLowerCase()
      );
      
      const current = userSkill ? userSkill.proficiency : 0;
      const target = requiredSkill.required;
      
      return {
        skill: requiredSkill.name,
        current,
        target,
        gap: Math.max(0, target - current)
      };
    });
    
    // Sort by gap size (largest first)
    return gaps.sort((a, b) => b.gap - a.gap);
  } catch (error) {
    console.error("Error finding skill gaps:", error);
    return [];
  }
};

// Function to recommend projects based on skill gaps
export const recommendProjectsForSkillGaps = async (
  userId: string,
  skillGaps: { skill: string; current: number; target: number; gap: number }[]
): Promise<Project[]> => {
  try {
    // Get all available projects
    const allProjects = await projectsManager.getUserProjects(userId);
    const assignedProjects = await projectsManager.getAssignedProjects(userId);
    
    // Combine and deduplicate projects
    const availableProjects = [...allProjects];
    assignedProjects.forEach(project => {
      if (!availableProjects.some(p => p.id === project.id)) {
        availableProjects.push(project);
      }
    });
    
    // Filter projects that are not already completed
    const incompleteProjects = availableProjects.filter(
      p => p.status !== 'completed' && p.assigned_to !== userId
    );
    
    // For each project, get its skills
    const projectsWithSkills = await Promise.all(
      incompleteProjects.map(async project => {
        const skills = await projectSkillsManager.getProjectSkills(project.id);
        return { 
          ...project, 
          skills,
          // Type assertion to ensure status matches our enum
          status: project.status as 'pending' | 'in_progress' | 'completed' | 'blocked',
          project_type: project.project_type as 'assigned' | 'recommended' | 'personal',
          priority: project.priority as 'low' | 'medium' | 'high'
        };
      })
    );
    
    // Match projects with skill gaps
    const recommendedProjects = projectsWithSkills
      .filter(project => 
        project.skills.some(projectSkill => 
          skillGaps.some(gap => 
            gap.skill.toLowerCase() === projectSkill.skill_name.toLowerCase() && 
            gap.gap > 0
          )
        )
      );
    
    // Sort by most relevant (covering most skill gaps with highest gaps)
    return recommendedProjects.sort((a, b) => {
      const aRelevance = a.skills.reduce((sum, skill) => {
        const matchingGap = skillGaps.find(
          gap => gap.skill.toLowerCase() === skill.skill_name.toLowerCase()
        );
        return sum + (matchingGap ? matchingGap.gap : 0);
      }, 0);
      
      const bRelevance = b.skills.reduce((sum, skill) => {
        const matchingGap = skillGaps.find(
          gap => gap.skill.toLowerCase() === skill.skill_name.toLowerCase()
        );
        return sum + (matchingGap ? matchingGap.gap : 0);
      }, 0);
      
      return bRelevance - aRelevance;
    });
  } catch (error) {
    console.error("Error recommending projects:", error);
    return [];
  }
};

// Function to update skills after project completion
export const updateSkillsFromCompletedProject = async (
  userId: string,
  projectId: string
): Promise<Skill[]> => {
  try {
    // Get project skills
    const projectSkills = await projectSkillsManager.getProjectSkills(projectId);
    
    // Get user's current skills
    const userSkills = await skillsManager.getUserSkills(userId);
    
    // Update each skill based on project completion
    const updatedSkills = await Promise.all(
      projectSkills.map(async projectSkill => {
        // Find matching user skill
        const userSkill = userSkills.find(
          s => s.name.toLowerCase() === projectSkill.skill_name.toLowerCase()
        );
        
        if (userSkill) {
          // Calculate new proficiency (increase by 10-20% of the gap to 100)
          const currentProficiency = userSkill.proficiency;
          const gap = 100 - currentProficiency;
          const increase = Math.ceil(gap * (0.1 + (projectSkill.skill_level / 10) * 0.1));
          const newProficiency = Math.min(100, currentProficiency + increase);
          
          // Update skill in database
          if (newProficiency > currentProficiency) {
            await skillsManager.updateSkill(userSkill.id, {
              proficiency: newProficiency,
              last_practiced: new Date().toISOString()
            });
            
            return {
              ...userSkill,
              proficiency: newProficiency,
              recentImprovement: true
            };
          }
          return userSkill;
        } else {
          // Create new skill based on project skill
          const initialProficiency = Math.min(50, projectSkill.skill_level * 10);
          const newSkill = await skillsManager.addSkill({
            user_id: userId,
            name: projectSkill.skill_name,
            category: 'New',
            proficiency: initialProficiency,
            last_practiced: new Date().toISOString(),
            target_proficiency: Math.min(100, initialProficiency + 30)
          });
          
          return {
            id: newSkill.id,
            name: newSkill.name,
            category: newSkill.category,
            proficiency: newSkill.proficiency,
            targetProficiency: newSkill.target_proficiency || 100,
            recentImprovement: true
          };
        }
      })
    );
    
    return updatedSkills.filter(Boolean) as Skill[];
  } catch (error) {
    console.error("Error updating skills from project:", error);
    return [];
  }
};

// Function to estimate career timeline based on skill progress
export const estimateCareerTimeline = (
  targetRole: { name: string; requiredSkills: { name: string; level: number }[] },
  userSkills: Skill[]
): { 
  monthsToTarget: number;
  completionPercentage: number;
  nextMilestone: string;
} => {
  // Calculate average skill match percentage
  let totalGap = 0;
  let maxGap = 0;
  let lowestSkill = '';
  let requiredSkillsCount = 0;
  
  targetRole.requiredSkills.forEach(requiredSkill => {
    const userSkill = userSkills.find(
      s => s.name.toLowerCase() === requiredSkill.name.toLowerCase()
    );
    
    const currentLevel = userSkill ? userSkill.proficiency : 0;
    const gap = Math.max(0, requiredSkill.level - currentLevel);
    
    totalGap += gap;
    requiredSkillsCount++;
    
    if (gap > maxGap) {
      maxGap = gap;
      lowestSkill = requiredSkill.name;
    }
  });
  
  const averageGap = totalGap / (requiredSkillsCount || 1);
  const completionPercentage = Math.max(0, Math.min(100, 100 - (averageGap * 100 / 100)));
  
  // Estimate months based on gap (rough estimate: 1 month per 5 points of gap)
  const monthsToTarget = Math.ceil(averageGap / 5);
  
  // Determine next milestone
  let nextMilestone = '';
  if (maxGap > 0) {
    nextMilestone = `Improve ${lowestSkill} skill (${maxGap} points gap)`;
  } else {
    nextMilestone = "Ready for this role!";
  }
  
  return {
    monthsToTarget,
    completionPercentage,
    nextMilestone
  };
};

// Function to get portfolio-ready projects
export const getPortfolioProjects = async (userId: string): Promise<Project[]> => {
  try {
    // Get all user's completed projects
    const allProjects = await projectsManager.getUserProjects(userId);
    const completedProjects = allProjects.filter(
      p => p.status === 'completed' && p.portfolio_visible
    );
    
    // Type assertion to ensure proper types
    const typedProjects: Project[] = completedProjects.map(project => ({
      ...project,
      status: project.status as 'pending' | 'in_progress' | 'completed' | 'blocked',
      project_type: project.project_type as 'assigned' | 'recommended' | 'personal',
      priority: project.priority as 'low' | 'medium' | 'high'
    }));
    
    return typedProjects;
  } catch (error) {
    console.error("Error getting portfolio projects:", error);
    return [];
  }
};
