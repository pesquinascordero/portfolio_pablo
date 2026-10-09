export interface Project {
  title: string
  type: 'Académico' | 'Personal' | 'UAH'
  description: string
  tags: string[]
}

export const projects: Project[] = [
  {
    title: 'Aplicación web de gestión de tareas',
    type: 'Académico',
    description:
      'Lógica de negocio en Java (Servlets) con arquitectura cliente-servidor desplegada en GlassFish, e interfaz en HTML, CSS y JavaScript.',
    tags: ['Java', 'Servlets', 'GlassFish', 'JavaScript'],
  },
  {
    title: 'Diseño y optimización de bases de datos',
    type: 'Académico',
    description:
      'Modelado del esquema relacional, definición de tablas e índices y optimización de consultas SQL, reduciendo el tiempo de respuesta de [X ms] a [X ms].',
    tags: ['PostgreSQL', 'MySQL', 'SQL'],
  },
  {
    title: 'Escáner de exposición IoT',
    type: 'Personal',
    description:
      'Servicio que consulta la API de Shodan, clasifica el riesgo de dispositivos expuestos con un modelo de ML y notifica los resultados por bot de Telegram. Incluye un honeypot que registra conexiones y un dashboard.',
    tags: ['Python', 'Shodan API', 'Telegram Bot API', 'ML'],
  },
  {
    title: 'Rastreador forense de wallets blockchain',
    type: 'Personal',
    description:
      'Servicio que integra APIs on-chain en tiempo real para rastrear wallets sospechosas en varias blockchains y generar informes forenses automáticos.',
    tags: ['Python', 'APIs on-chain', 'Telegram Bot API'],
  },
  {
    title: 'Crawler de Dark Web con alertas',
    type: 'Personal',
    description:
      'Crawler que enruta el tráfico por Tor, extrae dominios .onion con expresiones regulares y envía alertas automáticas al móvil.',
    tags: ['Python', 'Tor', 'Regex', 'Telegram Bot API'],
  },
  {
    title: 'TFG: Machine Learning para identificar la vía ALT en datos genómicos tumorales',
    type: 'UAH',
    description:
      'Modelos de clasificación en Python (pandas, scikit-learn) sobre datos genómicos de tumores para la detección precoz del cáncer, alcanzando [métrica: AUC/F1 = X].',
    tags: ['Python', 'pandas', 'scikit-learn', 'ML'],
  },
]
