export type SkillIconName = 'python' | 'fastapi' | 'postman' | 'docker' | 'git' | 'github' | 'vscode' | 'redis' | 'claude-code' | 'codex' | 'cursor' | 'open-code';

export interface SkillGroup {
  label: string;
  ariaLabel: string;
  description: string;
  color: string;
  tools: { name: string; icon: SkillIconName; color: string }[];
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
