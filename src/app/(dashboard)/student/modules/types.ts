// types.ts
export type Material = {
  type: "slides" | "pdf" | "video";
  title: string;
  url: string;
  duration: string;
};

export type Module = {
  id: number;
  title: string;
  description: string;
  materials: Material[];
  progress: number;
  estimatedTime: string;
};