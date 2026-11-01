import type { ImageMetadata } from 'astro';
import harvestImage from '@/assets/harvest-api-vintage-no-text.png';
import flowforgeImage from '@/assets/flowforge-vintage-no-text.png';
import atlasImage from '@/assets/atlas-ai-vintage-no-text.png';

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
