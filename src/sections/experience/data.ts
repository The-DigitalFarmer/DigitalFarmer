export interface Experience {
  dates: string;
  title: string;
  company: string;
  arrangement: string;
  summary: string;
  technologies: string[];
  technologiesLabel: string;
}

export const experiences: Experience[] = [
  {
    "dates": "2026 — ACTUALIDAD",
    "title": "Senior Hello World Engineer",
    "company": "VS Code",
    "arrangement": "· Remoto · Colaboración independiente",
    "summary": "Llevando «Hola Mundo» de Python a Assembly, sin una línea de más.",
    "technologies": [
      "Python",
      "Golang",
      "Assembly",
      "C++"
    ],
    "technologiesLabel": "Herramientas de Senior Hello World Engineer"
  },
  {
    "dates": "2016 — 2026",
    "title": "Lead Vibe Coding & Aesthetic Developer",
    "company": "Claude Code",
    "arrangement": "· Remoto · Proyecto freelance",
    "summary": "Vibe coding, bugs y luces sincronizadas para que la terminal parezca una escena de Matrix.",
    "technologies": [
      "Claude",
      "Codex",
      "Open Code"
    ],
    "technologiesLabel": "Herramientas de Lead Vibe Coding & Aesthetic Developer"
  }
];
