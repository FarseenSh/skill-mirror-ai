
export interface WorkplaceTask {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  skillsInvolved: Array<{
    name: string;
    category: string;
  }>;
  codeSnippet?: string;
}

// Authentication bug fix task
export const authBugFixTask: WorkplaceTask = {
  id: "task-1",
  title: "Fix token validation issue in authentication",
  description: "Users report being logged out unexpectedly after a few minutes. The issue appears to be in the token validation logic. Debug and fix the authentication token validation code to properly handle token expiration and refresh.",
  status: "todo",
  priority: "high",
  dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
  skillsInvolved: [
    { name: "JavaScript", category: "Programming" },
    { name: "Authentication", category: "Security" },
    { name: "Debugging", category: "Problem Solving" }
  ],
  codeSnippet: `// src/utils/auth.js
function validateToken(token) {
  if (!token) {
    return false;
  }
  
  try {
    // Decode the token to check expiration
    const decoded = decodeJWT(token);
    
    // BUG: This check is incorrect - it doesn't properly compare dates
    // It's comparing string timestamps directly, which causes premature logouts
    return decoded.exp > getCurrentTimestamp();
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
}

function decodeJWT(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

function getCurrentTimestamp() {
  // BUG: This returns a string timestamp, not a number like JWT uses
  // This causes string comparison issues in the validation check
  return new Date().toISOString();
}

// Helper functions that might be useful for fixing the bugs
function getNumericTimestamp() {
  return Math.floor(Date.now() / 1000);
}

module.exports = {
  validateToken,
  decodeJWT,
  getCurrentTimestamp
};`
};

// List of sample workplace tasks
export const workplaceTasks: WorkplaceTask[] = [
  authBugFixTask,
  {
    id: "task-2",
    title: "Implement responsive design for dashboard",
    description: "The dashboard doesn't work well on mobile devices. Implement responsive design to ensure it displays correctly on all screen sizes.",
    status: "todo",
    priority: "medium",
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
    skillsInvolved: [
      { name: "CSS", category: "Programming" },
      { name: "Responsive Design", category: "Design" },
      { name: "UI/UX", category: "Design" }
    ]
  },
  {
    id: "task-3",
    title: "Optimize database queries for performance",
    description: "The application is slow when retrieving large datasets. Identify and optimize the inefficient database queries.",
    status: "todo",
    priority: "high",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    skillsInvolved: [
      { name: "SQL", category: "Programming" },
      { name: "Database Optimization", category: "Programming" },
      { name: "Performance Tuning", category: "Problem Solving" }
    ]
  },
  {
    id: "task-4",
    title: "Write unit tests for user service",
    description: "The user service lacks proper test coverage. Write comprehensive unit tests to ensure its functionality is correct.",
    status: "todo",
    priority: "medium",
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    skillsInvolved: [
      { name: "Testing", category: "Programming" },
      { name: "JavaScript", category: "Programming" },
      { name: "Software Quality", category: "Engineering" }
    ]
  },
  {
    id: "task-5",
    title: "Implement user feedback mechanism",
    description: "Add a feature for users to provide feedback directly from the application. This should include a form and API endpoint to store the feedback.",
    status: "todo",
    priority: "low",
    skillsInvolved: [
      { name: "Frontend Development", category: "Programming" },
      { name: "API Design", category: "Programming" },
      { name: "User Experience", category: "Design" }
    ]
  }
];

export default workplaceTasks;
