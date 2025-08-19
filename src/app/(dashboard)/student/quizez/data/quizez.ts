export interface QuizQuestion {
  id: number;
  type: 'MCQ' | 'True/False';
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Quiz {
  id: number;
  title: string;
  module: string;
  dueDate: string;
  status: 'Pending' | 'Completed' | 'Graded';
  questions: QuizQuestion[];
  score?: number;
  totalPoints: number;
  timeLimit: number; // in minutes
  instructions: string;
}

export const quizzes: Quiz[] = [
  {
    id: 1,
    title: "Introduction to JavaScript",
    module: "Web Development Fundamentals",
    dueDate: "2023-10-15",
    status: "Pending",
    totalPoints: 100,
    timeLimit: 30,
    instructions: "Answer all questions. Each question carries equal marks.",
    questions: [
      {
        id: 1,
        type: "MCQ",
        question: "Which of the following is a JavaScript data type?",
        options: ["Boolean", "Class", "Element", "Form"],
        correctAnswer: "Boolean"
      },
      {
        id: 2,
        type: "MCQ",
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "<!--", "#", "*"],
        correctAnswer: "//"
      },
      {
        id: 3,
        type: "True/False",
        question: "JavaScript is a case-sensitive language.",
        options: ["True", "False"],
        correctAnswer: "True"
      },
      {
        id: 4,
        type: "MCQ",
        question: "Which method converts JSON string to an object?",
        options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.toObject()"],
        correctAnswer: "JSON.parse()"
      }
    ]
  },
  {
    id: 2,
    title: "CSS Layout Techniques",
    module: "Advanced CSS",
    dueDate: "2023-10-20",
    status: "Completed",
    score: 85,
    totalPoints: 100,
    timeLimit: 45,
    instructions: "Select the best answer for each question.",
    questions: [
      {
        id: 1,
        type: "MCQ",
        question: "Which CSS property is used for flexbox layout?",
        options: ["display: flex", "display: box", "display: grid", "display: block"],
        correctAnswer: "display: flex"
      },
      {
        id: 2,
        type: "MCQ",
        question: "Which property is used to change the font size?",
        options: ["font-size", "text-size", "font-style", "text-style"],
        correctAnswer: "font-size"
      },
      {
        id: 3,
        type: "True/False",
        question: "CSS Grid is better than Flexbox for one-dimensional layouts.",
        options: ["True", "False"],
        correctAnswer: "False"
      }
    ]
  },
  {
    id: 3,
    title: "React Components Quiz",
    module: "React Fundamentals",
    dueDate: "2023-10-25",
    status: "Graded",
    score: 92,
    totalPoints: 100,
    timeLimit: 60,
    instructions: "This quiz tests your understanding of React components and props.",
    questions: [
      {
        id: 1,
        type: "MCQ",
        question: "Which lifecycle method is called after a component is rendered?",
        options: ["componentDidMount", "componentWillMount", "componentRendered", "componentUpdated"],
        correctAnswer: "componentDidMount"
      },
      {
        id: 2,
        type: "MCQ",
        question: "In React, what is used to pass data to a component from outside?",
        options: ["props", "state", "setState", "parameters"],
        correctAnswer: "props"
      },
      {
        id: 3,
        type: "True/False",
        question: "React components must return a single JSX element.",
        options: ["True", "False"],
        correctAnswer: "True"
      },
      {
        id: 4,
        type: "MCQ",
        question: "Which hook is used to manage state in functional components?",
        options: ["useState", "useEffect", "useContext", "useReducer"],
        correctAnswer: "useState"
      }
    ]
  }
];