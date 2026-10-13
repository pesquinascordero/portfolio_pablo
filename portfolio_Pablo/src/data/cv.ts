// Fuente única de datos del CV. Las páginas solo los presentan.
// Los valores entre corchetes son pendientes por completar.

export const profile = {
  name: 'Pablo Esquinas Cordero',
  role: 'Desarrollador Backend Junior',
  location: 'Madrid, España',
  summary:
    'Ingeniero en Sistemas de Información orientado al desarrollo backend. Siete meses de experiencia en Acciona escribiendo código Java para automatización de pruebas, integrando suites en pipelines CI/CD con Jenkins y monitorizando aplicaciones en AWS. He desarrollado servicios en Python que integran APIs REST y diseñado y optimizado bases de datos PostgreSQL y MySQL.',
  email: 'pesquinascordero@gmail.com',
  phone: '+34 619 635 262',
  linkedin: 'https://www.linkedin.com/in/pablo-esquinas-cordero',
  github: 'https://github.com/pesquinascordero',
}

export const highlightedStack = [
  'Java',
  'Python',
  'PostgreSQL',
  'MySQL',
  'AWS',
  'Jenkins',
  'Node.js',
  'APIs REST',
]

export const skills = [
  { category: 'Lenguajes', items: ['Java', 'Python', 'SQL (T-SQL)', 'JavaScript', 'Node.js', 'C++'] },
  { category: 'Backend y APIs', items: ['Java EE (Servlets)', 'GlassFish', 'Node.js', 'APIs REST', 'Telegram Bot API'] },
  { category: 'Bases de datos', items: ['PostgreSQL', 'MySQL', 'MariaDB', 'Modelado relacional', 'Índices y optimización de consultas'] },
  { category: 'Cloud y DevOps', items: ['AWS', 'Jenkins (CI/CD)', 'Git', 'GitLab', 'Dynatrace', 'Jira'] },
  { category: 'Testing', items: ['Appium', 'Cucumber (BDD)', 'BrowserStack', 'Pruebas de regresión', 'Pruebas de carga'] },
  { category: 'Frontend y móvil', items: ['React', 'Ionic', 'HTML', 'CSS'] },
  { category: 'Fundamentos', items: ['POO', 'Programación funcional', 'Estructuras de datos y algoritmos', 'Seguridad informática'] },
]

export const experience = [
  {
    role: 'Desarrollador en prácticas',
    company: 'Acciona Tecnología y Servicios',
    type: 'Prácticas',
    period: 'Sep 2025 – Mar 2026',
    location: 'Madrid',
    bullets: [
      'Desarrollé en Java escenarios de prueba automatizados E2E con Appium y Cucumber (BDD) para aplicaciones iOS/Android, ejecutados en BrowserStack.',
      'Integré la suite de pruebas en pipelines CI/CD de Jenkins para su ejecución automática en cada build, reduciendo la regresión manual.',
      'Monitoricé el rendimiento y la disponibilidad de aplicaciones desplegadas en AWS con Dynatrace.',
      'Gestioné el empaquetado y la publicación de versiones de apps móviles en App Store y Applivery, con control de versiones en Git/GitLab y seguimiento en Jira.',
      'Desarrollé funcionalidades en React e Ionic.',
    ],
  },
]

export const education = [
  {
    title: 'Grado en Ingeniería en Sistemas de Información',
    institution: 'Universidad de Alcalá (UAH)',
    period: '2021 – 2026',
    detail: 'Graduado en 2026.',
  },
]

export const languages = [
  { name: 'Español', level: 'Nativo' },
  { name: 'Inglés', level: 'B2' },
]
