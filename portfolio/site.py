"""Configuración compartida entre las plantillas del sitio."""

TITLE = "Yerson - Profile"
DESCRIPTION = (
    "Portafolio de Yerson: Python, APIs y herramientas para construir nuevas ideas."
)
PYSCRIPT_VERSION = "2026.7.3"

NAVIGATION = [
    {"id": "inicio", "label": "Home"},
    {"id": "habilidades", "label": "Skills"},
    {"id": "sobre-mi", "label": "About"},
    {"id": "proyectos", "label": "Projects"},
    {"id": "experiencia", "label": "Experience"},
    {"id": "contacto", "label": "Contact"},
]

CHANNELS = [
    {"href": "mailto:cabreralandayersondimer@gmail.com", "label": "Gmail"},
    {"href": "https://wa.me/51980822924", "label": "WhatsApp"},
    {
        "href": "https://www.linkedin.com/in/yerson-cabrera-88439b401/",
        "label": "LinkedIn",
    },
    {"href": "https://github.com/The-DigitalFarmer", "label": "GitHub"},
]

TOOL_LOGOS = {
    "python": "/assets/svg/python.svg",
    "fastapi": "/assets/png/fastapi.png",
    "postman": "/assets/svg/postman.svg",
    "docker": "/assets/png/docker.png",
    "git": "/assets/svg/git.svg",
    "github": "/assets/svg/github.svg",
    "vscode": "/assets/png/vscode.png",
    "En aprendisaje": "",
    "claude-code": "/assets/svg/claude-code.svg",
    "codex": "/assets/png/codex.png",
    "cursor": "/assets/svg/cursor.svg",
    "open-code": "/assets/png/open-code.png",
}
