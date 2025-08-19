// data/modules.ts
import { Module } from "../types"

export const modules: Module[] = [
  {
    id: 1,
    title: "Introduction to Web Development",
    description: "Learn basics of HTML, CSS, and JavaScript",
    materials: [
      {
        type: "slides",
        title: "HTML Fundamentals",
        url: "/materials/webdev-html-slides.pdf",
        duration: "15 min"
      },
      {
        type: "pdf",
        title: "CSS Cheat Sheet",
        url: "/materials/webdev-css-guide.pdf",
        duration: "10 min"
      },
      {
        type: "video",
        title: "JavaScript Basics",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "20 min"
      }
    ],
    progress: 65,
    estimatedTime: "1.5 hours"
  },
  {
    id: 2,
    title: "React Fundamentals",
    description: "Understanding components, props, and state",
    materials: [
      {
        type: "slides",
        title: "React Core Concepts",
        url: "/materials/react-slides.pdf",
        duration: "20 min"
      },
      {
        type: "pdf",
        title: "React Component Guide",
        url: "/materials/react-guide.pdf",
        duration: "15 min"
      },
      {
        type: "video",
        title: "State Management",
        url: "https://www.youtube.com/embed/Ke90Tje7VS0",
        duration: "25 min"
      }
    ],
    progress: 30,
    estimatedTime: "2 hours"
  },
  {
    id: 3,
    title: "Advanced UI/UX Design",
    description: "Creating responsive and accessible interfaces",
    materials: [
      {
        type: "slides",
        title: "Design Principles",
        url: "/materials/uiux-slides.pdf",
        duration: "18 min"
      },
      {
        type: "pdf",
        title: "Accessibility Guide",
        url: "/materials/accessibility-guide.pdf",
        duration: "12 min"
      },
      {
        type: "video",
        title: "Responsive Design Techniques",
        url: "https://www.youtube.com/embed/Wm6CUkswsNw",
        duration: "22 min"
      }
    ],
    progress: 85,
    estimatedTime: "1.2 hours"
  }
];

export const getModuleById = (id: number) => {
  return modules.find(module => module.id === id);
};