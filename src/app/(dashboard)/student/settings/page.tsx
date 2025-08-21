// app/student/settings/page.tsx
"use client";

import { useEffect, useState } from "react";
import { 
  Check, 
  Palette, 
  Moon, 
  Sun, 
  Save,
  RotateCcw,
  PaintBucket,
  Laptop
} from "lucide-react";

// Define all available themes
const themes = [
  { 
    id: "default-light", 
    name: "Light", 
    icon: <Sun size={16} />,
    colors: {
      '--primary': '#3b82f6',
      '--primary-foreground': '#ffffff',
      '--secondary': '#f3f4f6',
      '--secondary-foreground': '#111827',
      '--accent': '#4f46e5',
      '--accent-foreground': '#ffffff',
      '--background': '#ffffff',
      '--foreground': '#111827',
      '--muted': '#f9fafb',
      '--muted-foreground': '#6b7280',
      '--card': '#ffffff',
      '--card-foreground': '#111827',
      '--border': '#e5e7eb',
      '--input': '#e5e7eb',
      '--ring': '#3b82f6'
    }
  },
  { 
    id: "default-dark", 
    name: "Dark", 
    icon: <Moon size={16} />,
    colors: {
      '--primary': '#3b82f6',
      '--primary-foreground': '#ffffff',
      '--secondary': '#1f2937',
      '--secondary-foreground': '#f9fafb',
      '--accent': '#6366f1',
      '--accent-foreground': '#ffffff',
      '--background': '#111827',
      '--foreground': '#f9fafb',
      '--muted': '#1f2937',
      '--muted-foreground': '#9ca3af',
      '--card': '#1f2937',
      '--card-foreground': '#f9fafb',
      '--border': '#374151',
      '--input': '#374151',
      '--ring': '#3b82f6'
    }
  },
  { 
    id: "blue", 
    name: "Ocean Blue", 
    icon: <PaintBucket size={16} />,
    colors: {
      '--primary': '#0ea5e9',
      '--primary-foreground': '#ffffff',
      '--secondary': '#e0f2fe',
      '--secondary-foreground': '#0c4a6e',
      '--accent': '#0369a1',
      '--accent-foreground': '#ffffff',
      '--background': '#f0f9ff',
      '--foreground': '#082f49',
      '--muted': '#bae6fd',
      '--muted-foreground': '#0c4a6e',
      '--card': '#ffffff',
      '--card-foreground': '#082f49',
      '--border': '#bae6fd',
      '--input': '#bae6fd',
      '--ring': '#0ea5e9'
    }
  },
  { 
    id: "green", 
    name: "Forest Green", 
    icon: <PaintBucket size={16} />,
    colors: {
      '--primary': '#10b981',
      '--primary-foreground': '#ffffff',
      '--secondary': '#d1fae5',
      '--secondary-foreground': '#064e3b',
      '--accent': '#059669',
      '--accent-foreground': '#ffffff',
      '--background': '#ecfdf5',
      '--foreground': '#064e3b',
      '--muted': '#a7f3d0',
      '--muted-foreground': '#065f46',
      '--card': '#ffffff',
      '--card-foreground': '#064e3b',
      '--border': '#a7f3d0',
      '--input': '#a7f3d0',
      '--ring': '#10b981'
    }
  },
  { 
    id: "purple", 
    name: "Royal Purple", 
    icon: <PaintBucket size={16} />,
    colors: {
      '--primary': '#8b5cf6',
      '--primary-foreground': '#ffffff',
      '--secondary': '#ede9fe',
      '--secondary-foreground': '#4c1d95',
      '--accent': '#7c3aed',
      '--accent-foreground': '#ffffff',
      '--background': '#faf5ff',
      '--foreground': '#4c1d95',
      '--muted': '#ddd6fe',
      '--muted-foreground': '#5b21b6',
      '--card': '#ffffff',
      '--card-foreground': '#4c1d95',
      '--border': '#ddd6fe',
      '--input': '#ddd6fe',
      '--ring': '#8b5cf6'
    }
  },
  { 
    id: "system", 
    name: "System Default", 
    icon: <Laptop size={16} />,
    colors: {}
  }
];

export default function SettingsPage() {
  const [currentTheme, setCurrentTheme] = useState<string>("default-light");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem("theme") || "default-light";
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    
    if (themeId === "system") {
      // Handle system theme
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme("default-dark");
      } else {
        applyTheme("default-light");
      }
      return;
    }
    
    if (theme) {
      // Remove all theme classes
      document.documentElement.className = '';
      
      // Apply the new theme colors
      Object.entries(theme.colors).forEach(([property, value]) => {
        document.documentElement.style.setProperty(property, value);
      });
      
      // Add theme class for CSS specificity
      document.documentElement.classList.add(`theme-${themeId}`);
    }
  };

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    localStorage.setItem("theme", themeId);
    applyTheme(themeId);
  };

  const handleResetSettings = () => {
    if (confirm("Are you sure you want to reset to default settings?")) {
      localStorage.removeItem("theme");
      setCurrentTheme("default-light");
      applyTheme("default-light");
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen p-8 bg-background text-foreground">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Settings</h1>
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="h-32 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-background text-foreground transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Theme Settings</h1>
            <p className="text-muted-foreground mt-1">
              Customize the appearance of the entire website
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleResetSettings}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <RotateCcw size={16} />
              Reset
            </button>
            <button
              onClick={() => alert('Settings saved!')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Palette size={20} />
            Choose a Theme
          </h2>
          <p className="text-muted-foreground mb-6">
            Select a theme that will be applied across all pages of the website.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((theme) => (
              <div
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  currentTheme === theme.id
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {theme.icon}
                    <span className="font-medium">{theme.name}</span>
                  </div>
                  {currentTheme === theme.id && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check size={12} className="text-primary-foreground" />
                    </div>
                  )}
                </div>
                
                {/* Theme preview */}
                {theme.id !== "system" && (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <div className="h-4 w-4/12 rounded-sm" style={{backgroundColor: theme.colors['--primary']}}></div>
                      <div className="h-4 w-4/12 rounded-sm" style={{backgroundColor: theme.colors['--secondary']}}></div>
                      <div className="h-4 w-4/12 rounded-sm" style={{backgroundColor: theme.colors['--accent']}}></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-4 w-6/12 rounded-sm" style={{backgroundColor: theme.colors['--background']}}></div>
                      <div className="h-4 w-6/12 rounded-sm border" style={{backgroundColor: theme.colors['--card']}}></div>
                    </div>
                  </div>
                )}
                
                {theme.id === "system" && (
                  <div className="text-sm text-muted-foreground">
                    Automatically matches your system theme
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-card p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <p className="text-muted-foreground mb-6">
            See how the selected theme will look across the application.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-background p-4 rounded-lg border">
              <h3 className="font-semibold mb-2">Header Example</h3>
              <p className="text-sm text-muted-foreground">This is some sample text showing the theme colors.</p>
              <button className="mt-3 px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md">
                Primary Button
              </button>
            </div>
            
            <div className="bg-card p-4 rounded-lg border">
              <h3 className="font-semibold mb-2">Card Example</h3>
              <p className="text-sm text-muted-foreground">This is a card with the current theme styling.</p>
              <div className="mt-3 flex gap-2">
                <div className="h-3 w-3/12 bg-primary rounded"></div>
                <div className="h-3 w-3/12 bg-secondary rounded"></div>
                <div className="h-3 w-3/12 bg-accent rounded"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Changes will be applied to all pages automatically. Your preference is saved locally.</p>
        </div>
      </div>
    </div>
  );
}