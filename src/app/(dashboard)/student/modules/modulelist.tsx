// components/ModuleList.tsx
import ModuleCard from "./modelcard";
import { modules } from "./data/modal";

export default function ModuleList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((module) => (
        <ModuleCard
          key={module.id}
          id={module.id}
          title={module.title}
          description={module.description}
          progress={module.progress}
          estimatedTime={module.estimatedTime}
        />
      ))}
    </div>
  );
}