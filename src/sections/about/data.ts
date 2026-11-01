export interface FocusArea {
  title: string;
  description: string;
  label: string;
  tags: string[];
}

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
