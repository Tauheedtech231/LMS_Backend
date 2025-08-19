export interface AssignmentResource {
  id: number;
  type: 'PDF' | 'Slides' | 'Video' | 'Document';
  title: string;
  url: string;
  size?: string;
}

export interface AssignmentSubmission {
  fileName: string;
  fileSize: string;
  submittedAt: string;
  grade?: number;
  feedback?: string;
  gradedAt?: string;
}

export interface Assignment {
  id: number;
  title: string;
  module: string;
  description: string;
  dueDate: string;
  status: 'Pending' | 'Submitted' | 'Graded' | 'Overdue';
  maxPoints: number;
  resources: AssignmentResource[];
  submission?: AssignmentSubmission;
  instructions: string;
  createdAt: string;
}

export const assignments: Assignment[] = [
  {
    id: 1,
    title: "Research Paper on Machine Learning",
    module: "Advanced Artificial Intelligence",
    description: "Write a comprehensive research paper on recent advancements in machine learning algorithms. Focus on transformer architectures and their applications in NLP.",
    dueDate: "2023-11-15T23:59:00",
    status: "Pending",
    maxPoints: 100,
    instructions: "Your paper should be 8-10 pages long, follow APA formatting, and include at least 10 academic references. Submit as a PDF document.",
    createdAt: "2023-10-01T00:00:00",
    resources: [
      {
        id: 1,
        type: "PDF",
        title: "Research Paper Guidelines",
        url: "/resources/guidelines.pdf",
        size: "2.4MB"
      },
      {
        id: 2,
        type: "Slides",
        title: "Lecture Slides - ML Advances",
        url: "/resources/lecture-slides.pptx",
        size: "5.7MB"
      },
      {
        id: 3,
        type: "Video",
        title: "How to Write a Research Paper",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      }
    ]
  },
  {
    id: 2,
    title: "React Component Library",
    module: "Advanced Web Development",
    description: "Create a reusable React component library with at least 5 components. Include proper documentation and examples for each component.",
    dueDate: "2023-11-10T23:59:00",
    status: "Submitted",
    maxPoints: 85,
    instructions: "Use TypeScript for your components. Include Storybook documentation. Submit your GitHub repository link and a deployed version.",
    createdAt: "2023-10-05T00:00:00",
    resources: [
      {
        id: 1,
        type: "PDF",
        title: "Component Requirements",
        url: "/resources/component-req.pdf",
        size: "1.2MB"
      },
      {
        id: 2,
        type: "Document",
        title: "Coding Standards",
        url: "/resources/coding-standards.docx",
        size: "0.8MB"
      }
    ],
    submission: {
      fileName: "react-component-library.zip",
      fileSize: "4.5MB",
      submittedAt: "2023-11-09T14:30:00"
    }
  },
  {
    id: 3,
    title: "Database Design Project",
    module: "Database Systems",
    description: "Design a normalized database schema for an e-commerce platform. Implement the schema in PostgreSQL and provide sample queries.",
    dueDate: "2023-10-25T23:59:00",
    status: "Graded",
    maxPoints: 90,
    instructions: "Include ER diagrams, normalization proof, and at least 10 sample queries covering CRUD operations.",
    createdAt: "2023-09-15T00:00:00",
    resources: [
      {
        id: 1,
        type: "PDF",
        title: "Project Specifications",
        url: "/resources/db-project.pdf",
        size: "3.1MB"
      },
      {
        id: 2,
        type: "Slides",
        title: "Database Design Principles",
        url: "/resources/db-design.pptx",
        size: "4.2MB"
      }
    ],
    submission: {
      fileName: "ecommerce-database.zip",
      fileSize: "2.8MB",
      submittedAt: "2023-10-24T16:45:00",
      grade: 87,
      feedback: "Excellent database design. Your normalization approach was correct. Some queries could be optimized further.",
      gradedAt: "2023-10-27T10:15:00"
    }
  },
  {
    id: 4,
    title: "Algorithms Implementation",
    module: "Data Structures and Algorithms",
    description: "Implement and analyze time complexity for sorting and searching algorithms. Compare their performance on different data sets.",
    dueDate: "2023-10-20T23:59:00",
    status: "Overdue",
    maxPoints: 95,
    instructions: "Implement in Python or Java. Include time complexity analysis with graphs. Submit your code and report.",
    createdAt: "2023-09-20T00:00:00",
    resources: [
      {
        id: 1,
        type: "PDF",
        title: "Algorithm Requirements",
        url: "/resources/algorithms.pdf",
        size: "2.0MB"
      }
    ]
  }
];