
import { Resource } from '@/components/resources/ResourceCard';
import { LearningPath } from '@/components/resources/LearningPathCard';

export const sampleResources: Resource[] = [
  {
    id: 'resource-1',
    title: 'Advanced JavaScript Patterns',
    description: 'Learn advanced JavaScript patterns including module patterns, prototypal inheritance, and functional programming concepts.',
    type: 'course',
    url: 'https://example.com/js-patterns',
    category: ['JavaScript', 'Programming', 'Advanced'],
    estimatedTime: '4-6 hours',
    progress: 65,
    skillId: 'skill-1'
  },
  {
    id: 'resource-2',
    title: 'React Performance Optimization',
    description: 'Deep dive into React performance optimization techniques including memoization, virtualization, and code splitting.',
    type: 'article',
    url: 'https://example.com/react-performance',
    category: ['React', 'Performance', 'Frontend'],
    estimatedTime: '25 mins',
    progress: 100,
    skillId: 'skill-2'
  },
  {
    id: 'resource-3',
    title: 'SQL Query Optimization Workshop',
    description: 'Hands-on workshop for optimizing SQL queries, understanding execution plans, and implementing indexing strategies.',
    type: 'exercise',
    url: 'https://example.com/sql-workshop',
    category: ['SQL', 'Database', 'Performance'],
    estimatedTime: '2 hours',
    progress: 30,
    skillId: 'skill-3'
  },
  {
    id: 'resource-4',
    title: 'Writing Technical Documentation',
    description: 'Best practices for creating clear, comprehensive technical documentation for developers and end-users.',
    type: 'video',
    url: 'https://example.com/tech-writing',
    category: ['Communication', 'Documentation', 'Professional Skills'],
    estimatedTime: '45 mins',
    skillId: 'skill-4'
  },
  {
    id: 'resource-5',
    title: 'Test-Driven Development Fundamentals',
    description: 'Introduction to TDD principles and practices with practical examples using popular testing frameworks.',
    type: 'course',
    url: 'https://example.com/tdd-course',
    category: ['Testing', 'Engineering', 'Best Practices'],
    estimatedTime: '5 hours',
    progress: 15,
    skillId: 'skill-5'
  },
  {
    id: 'resource-6',
    title: 'Authentication & Security Best Practices',
    description: 'Comprehensive guide to implementing secure authentication systems and preventing common security vulnerabilities.',
    type: 'article',
    url: 'https://example.com/auth-security',
    category: ['Security', 'Authentication', 'Web Development'],
    estimatedTime: '30 mins',
    skillId: 'skill-6'
  },
  {
    id: 'resource-7',
    title: 'Building RESTful APIs',
    description: 'Learn how to design and build scalable RESTful APIs following best practices and standards.',
    type: 'video',
    url: 'https://example.com/restful-apis',
    category: ['API', 'Backend', 'Architecture'],
    estimatedTime: '1.5 hours',
    progress: 0,
  },
  {
    id: 'resource-8',
    title: 'CSS Grid and Flexbox Mastery',
    description: 'Comprehensive guide to CSS layout techniques using Grid and Flexbox with practical examples.',
    type: 'exercise',
    url: 'https://example.com/css-layouts',
    category: ['CSS', 'Frontend', 'Design'],
    estimatedTime: '3 hours',
    progress: 0,
  }
];

export const sampleLearningPaths: LearningPath[] = [
  {
    id: 'path-1',
    title: 'Frontend Development Mastery',
    description: 'A structured path to master modern frontend development, from JavaScript fundamentals to advanced React patterns.',
    skillId: 'skill-2',
    resources: [
      sampleResources[0], 
      sampleResources[1], 
      sampleResources[7]
    ],
    completedResources: 1,
    totalResources: 3
  },
  {
    id: 'path-2',
    title: 'Backend Engineering Excellence',
    description: 'Comprehensive learning path for backend development including databases, API design, and security.',
    skillId: 'skill-3',
    resources: [
      sampleResources[2], 
      sampleResources[5],
      sampleResources[6]
    ],
    completedResources: 0,
    totalResources: 3
  },
  {
    id: 'path-3',
    title: 'Quality Engineering',
    description: 'Master software quality engineering with test-driven development, automated testing, and quality assurance techniques.',
    skillId: 'skill-5',
    resources: [
      sampleResources[4]
    ],
    completedResources: 0,
    totalResources: 1
  }
];

export const studyStreakData = {
  currentStreak: 7,
  longestStreak: 14,
  totalHours: 128,
  lastSevenDays: [
    { date: '2023-09-01', minutes: 45 },
    { date: '2023-09-02', minutes: 30 },
    { date: '2023-09-03', minutes: 60 },
    { date: '2023-09-04', minutes: 15 },
    { date: '2023-09-05', minutes: 90 },
    { date: '2023-09-06', minutes: 45 },
    { date: '2023-09-07', minutes: 60 }
  ]
};

export const targetRoles = [
  {
    id: 'role-1',
    name: 'Senior Frontend Developer',
    description: 'Expert in frontend technologies with ability to architect complex applications and mentor others.',
    skills: [
      { name: 'JavaScript', required: 90 },
      { name: 'React', required: 90 },
      { name: 'SQL', required: 50 },
      { name: 'Technical Writing', required: 70 },
      { name: 'Test-Driven Development', required: 80 },
      { name: 'Authentication & Security', required: 70 }
    ]
  },
  {
    id: 'role-2',
    name: 'Full-Stack Engineer',
    description: 'Versatile developer with strong skills in both frontend and backend development.',
    skills: [
      { name: 'JavaScript', required: 80 },
      { name: 'React', required: 75 },
      { name: 'SQL', required: 80 },
      { name: 'Technical Writing', required: 65 },
      { name: 'Test-Driven Development', required: 75 },
      { name: 'Authentication & Security', required: 85 }
    ]
  },
  {
    id: 'role-3',
    name: 'DevOps Engineer',
    description: 'Specialist in deployment, automation, and infrastructure management.',
    skills: [
      { name: 'JavaScript', required: 50 },
      { name: 'React', required: 40 },
      { name: 'SQL', required: 70 },
      { name: 'Technical Writing', required: 80 },
      { name: 'Test-Driven Development', required: 85 },
      { name: 'Authentication & Security', required: 90 }
    ]
  }
];

export default sampleResources;
