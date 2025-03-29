
export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  targetProficiency: number;
  recentImprovement?: boolean;
}

export const sampleSkills: Skill[] = [
  {
    id: "skill-1",
    name: "JavaScript",
    category: "Programming",
    proficiency: 75,
    targetProficiency: 90,
    recentImprovement: true
  },
  {
    id: "skill-2",
    name: "React",
    category: "Programming",
    proficiency: 82,
    targetProficiency: 95
  },
  {
    id: "skill-3",
    name: "SQL",
    category: "Programming",
    proficiency: 60,
    targetProficiency: 80
  },
  {
    id: "skill-4",
    name: "Technical Writing",
    category: "Communication",
    proficiency: 65,
    targetProficiency: 75,
    recentImprovement: true
  },
  {
    id: "skill-5",
    name: "Test-Driven Development",
    category: "Engineering",
    proficiency: 45,
    targetProficiency: 70
  },
  {
    id: "skill-6",
    name: "Authentication & Security",
    category: "Security",
    proficiency: 50,
    targetProficiency: 85
  }
];

export default sampleSkills;
