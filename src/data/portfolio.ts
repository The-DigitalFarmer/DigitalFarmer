import type { ImageMetadata } from 'astro';
import harvestImage from '../assets/projects/harvest-api-vintage-no-text.png';
import flowforgeImage from '../assets/projects/flowforge-vintage-no-text.png';
import atlasImage from '../assets/projects/atlas-ai-vintage-no-text.png';

export type IconName = 'python' | 'fastapi' | 'postman' | 'docker' | 'git' | 'github' | 'vscode' | 'redis' | 'claude-code' | 'codex' | 'cursor' | 'open-code';

export interface SkillGroup {
  label: string;
  ariaLabel: string;
  description: string;
  color: string;
  tools: { name: string; icon: IconName; color: string }[];
}

export interface FocusArea {
  title: string;
  description: string;
  label: string;
  tags: string[];
}

export interface Project {
  id: string;
  name: string;
  suffix: string;
  kind: string;
  description: string;
  technologies: string[];
  repositoryUrl: string;
  websiteUrl: string;
  detail: string;
  preview: {
    image: ImageMetadata;
    alt: string;
  };
}

export interface Experience {
  dates: string;
  title: string;
  company: string;
  arrangement: string;
  summary: string;
  technologies: string[];
  technologiesLabel: string;
}

export const skillGroups: SkillGroup[] = [
  {
    "label": "LENGUAJE",
    "ariaLabel": "Lenguaje",
    "description": "",
    "color": "#83c99a",
    "tools": [
      {
        "name": "Python",
        "icon": "python",
        "color": "#efc77c"
      }
    ]
  },
  {
    "label": "BACKEND",
    "ariaLabel": "Backend",
    "description": "",
    "color": "#79c6b3",
    "tools": [
      {
        "name": "FastAPI",
        "icon": "fastapi",
        "color": "#79c6b3"
      }
    ]
  },
  {
    "label": "DATOS",
    "ariaLabel": "Datos",
    "description": "",
    "color": "#e78796",
    "tools": [
      {
        "name": "Redis",
        "icon": "redis",
        "color": "#e78796"
      }
    ]
  },
  {
    "label": "DEVOPS",
    "ariaLabel": "Devops",
    "description": "",
    "color": "#83b6d8",
    "tools": [
      {
        "name": "Docker",
        "icon": "docker",
        "color": "#83b6d8"
      },
      {
        "name": "Git",
        "icon": "git",
        "color": "#ee8e85"
      },
      {
        "name": "GitHub",
        "icon": "github",
        "color": "#c5aed9"
      }
    ]
  },
  {
    "label": "HERRAMIENTAS",
    "ariaLabel": "Herramientas",
    "description": "",
    "color": "#e8b26f",
    "tools": [
      {
        "name": "Postman",
        "icon": "postman",
        "color": "#ef9b7e"
      },
      {
        "name": "VS Code",
        "icon": "vscode",
        "color": "#8cbfe5"
      },
      {
        "name": "Claude Code",
        "icon": "claude-code",
        "color": "#d9a38f"
      },
      {
        "name": "Codex",
        "icon": "codex",
        "color": "#b9d7c3"
      },
      {
        "name": "Cursor",
        "icon": "cursor",
        "color": "#ddd5ec"
      },
      {
        "name": "Open Code",
        "icon": "open-code",
        "color": "#9dbbe3"
      }
    ]
  }
];

// Agrega aquí la URL pública de tu CV para activar el botón de About.
export const cvUrl: string = '';

export const focusAreas: FocusArea[] = [
  {
    "title": "Arquitectura con intención",
    "label": "DISEÑO DE SOFTWARE",
    "tags": ["clean architecture", "SOLID", "hexagonal"],
    "description": "Antes de escribir código, busco entender el problema. Separo responsabilidades y mantengo la lógica de negocio independiente de las herramientas para construir aplicaciones que puedan evolucionar con claridad."
  },
  {
    "title": "APIs y lógica de negocio",
    "label": "DESARROLLO BACKEND",
    "tags": ["python", "fastapi", "postman"],
    "description": "Transformo necesidades en servicios con Python y FastAPI. Cuido la validación, las respuestas y el manejo de errores para que cada endpoint sea predecible, desde la petición hasta la respuesta."
  },
  {
    "title": "Aprender construyendo",
    "label": "APRENDIZAJE CONTINUO",
    "tags": ["autodidacta", "documentación", "proyectos"],
    "description": "Leo documentación, pruebo ideas y convierto lo aprendido en proyectos. Cuando algo falla, divido el problema, reviso mis supuestos y busco entender la causa. La curiosidad también es parte del stack."
  },
  {
    "title": "Mejorar en cada iteración",
    "label": "CALIDAD DE CÓDIGO",
    "tags": ["refactoring", "claridad", "mantenibilidad"],
    "description": "Priorizo nombres claros, funciones enfocadas y una organización fácil de seguir. Cada iteración es una oportunidad para simplificar el código y construir una base más mantenible."
  }
];

export const projects: Project[] = [
  {
    "id": "project-title-1",
    "name": "Harvest API",
    "suffix": "",
    "kind": "REST API · BACKEND",
    "description": "El motor detrás de cada pedido. Una API para conectar inventario, ventas y entregas, con una arquitectura preparada para crecer.",
    "technologies": [
      "Python",
      "FastAPI",
      "Redis",
      "Docker"
    ],
    "repositoryUrl": "https://github.com/The-DigitalFarmer",
    "websiteUrl": "https://github.com/The-DigitalFarmer",
    "detail": "Inventario y pedidos conectados mediante una API modular. Autenticación, caché y documentación en un mismo lugar.",
    "preview": {
      "image": harvestImage,
      "alt": "Cartel vintage de Harvest API sobre papel crema envejecido, con un servidor conectado a inventario, compras, entregas y una base de datos en tintas azul marino y rojo."
    }
  },
  {
    "id": "project-title-2",
    "name": "Flowforge",
    "suffix": ".",
    "kind": "AUTOMATIZACIÓN · WORKFLOWS",
    "description": "Menos tareas repetidas, más tiempo para crear. Flujos que conectan servicios, procesan eventos y automatizan el trabajo de todos los días.",
    "technologies": [
      "Python",
      "FastAPI",
      "Docker",
      "Webhooks"
    ],
    "repositoryUrl": "https://github.com/The-DigitalFarmer",
    "websiteUrl": "https://github.com/The-DigitalFarmer",
    "detail": "Un editor de automatizaciones para conectar eventos y acciones. Cada flujo incorpora reintentos, registros y seguimiento de ejecución.",
    "preview": {
      "image": flowforgeImage,
      "alt": "Cartel vintage de Flowforge sobre papel crema envejecido, con un webhook, un engranaje y una campana conectados por flechas en tintas azul marino y rojo."
    }
  },
  {
    "id": "project-title-3",
    "name": "Atlas AI",
    "suffix": ".",
    "kind": "INTELIGENCIA ARTIFICIAL · RAG",
    "description": "Tu conocimiento, a una pregunta de distancia. Un asistente que transforma documentos en respuestas claras, con contexto y fuentes verificables.",
    "technologies": [
      "Python",
      "FastAPI",
      "Embeddings",
      "RAG"
    ],
    "repositoryUrl": "https://github.com/The-DigitalFarmer",
    "websiteUrl": "https://github.com/The-DigitalFarmer",
    "detail": "Un asistente de consulta documental con búsqueda semántica. Recupera fragmentos relevantes y acompaña cada respuesta con sus fuentes.",
    "preview": {
      "image": atlasImage,
      "alt": "Cartel vintage de Atlas AI sobre papel crema envejecido, con documentos, una red de conocimiento, una base de datos y una lupa en tintas azul marino y rojo."
    }
  }
];

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

