# 🎮 Netherious - Servidor Minecraft RPG

Una aplicación web moderna y estilizada para el servidor privado de Minecraft **Netherious2**, construida con Next.js 14, TypeScript, Tailwind CSS y Framer Motion. Diseño inspirado en el estilo pixel art de Minecraft con una experiencia de usuario inmersiva.

![Netherious Banner](https://via.placeholder.com/1200x400/1a1a1a/ff6b35?text=Netherious+RPG)

## ✨ Características

- **🎨 Estética Pixel Art** - Diseño auténtico inspirado en Minecraft con bordes chunky y fuentes retro
- **🔊 Sistema de Sonido Interactivo** - Efectos de sonido estilo Minecraft en toda la interfaz
- **📱 Diseño Responsive** - Experiencia perfecta en desktop, tablet y móvil
- **🎯 Cuatro Secciones Principales** - Home, Instalación, Info del Servidor y Lore con navegación fluida
- **🌈 Fondos Dinámicos** - Fondos pixel art atmosféricos que cambian por sección
- **🌓 Dark/Light Mode** - Soporte completo de temas con paletas inspiradas en Minecraft
- **🎭 Navegación Flotante** - Botones de navegación pixel-style con efectos hover
- **📋 Copy-to-Clipboard** - Copia fácil de IP del servidor con feedback sonoro
- **⬇️ Sistema de Descargas** - Instalador de NeoForge y descargas de modpacks
- **♿ Accesibilidad** - Roles ARIA, navegación por teclado y soporte para lectores de pantalla
- **🎪 Indicador de Scroll** - Indicador animado que cambia de color según la sección
- **💬 Integración Discord** - Invitación destacada a la comunidad de Discord

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Fuentes**: Press Start 2P (títulos), VT323 (cuerpo)
- **Estado**: Zustand
- **Tema**: next-themes
- **Componentes UI**: Radix UI primitives

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+
- npm, yarn o pnpm

### Instalación

1. Clona el repositorio:
\`\`\`bash
git clone https://github.com/Ian9Franco/netherious-web.git
cd netherious-web
\`\`\`

2. Instala las dependencias:
\`\`\`bash
npm install
\`\`\`

3. Ejecuta el servidor de desarrollo:
\`\`\`bash
npm run dev
\`\`\`

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

### Build para Producción

\`\`\`bash
npm run build
npm start
\`\`\`

## 📁 Estructura del Proyecto

\`\`\`
├── app/
│   ├── layout.tsx          # Layout raíz con fuentes y tema
│   ├── page.tsx            # Página principal con enrutamiento de secciones
│   └── globals.css         # Estilos globales y tokens de tema Minecraft
├── components/
│   ├── sections/           # Secciones principales de contenido
│   │   ├── home-section.tsx
│   │   ├── install-section.tsx
│   │   ├── server-section.tsx
│   │   └── lore-section.tsx
│   ├── ui/                 # Componentes UI reutilizables
│   ├── background-scene.tsx
│   ├── floating-nav.tsx
│   ├── scroll-indicator.tsx
│   ├── mobile-nav.tsx
│   ├── glass-card.tsx      # Componente de card pixel-style
│   ├── loading-screen.tsx
│   └── footer.tsx          # Footer con redes sociales
├── hooks/
│   ├── use-copy-to-clipboard.ts
│   ├── use-sound-effects.ts    # Hook de efectos de sonido UI
│   └── use-toast.ts
├── lib/
│   ├── store.ts            # Gestión de estado Zustand
│   └── utils.ts            # Funciones utilitarias
├── data/
│   ├── home.json           # Datos de la sección Home
│   ├── server.json         # Información del servidor
│   ├── install.json        # Guías de instalación
│   └── lore.json           # Historia y lore del servidor
└── public/
    ├── images/             # Imágenes de fondo y assets
    ├── logo/               # Logos del servidor
    └── sounds/             # Archivos de audio para UI
\`\`\`

## 🎨 Personalización

### Información del Servidor

Edita `data/server.json` para actualizar:
- Dirección IP del servidor
- Versión de Minecraft
- Versión de NeoForge
- Requisitos de Java
- Especificaciones del servidor

### Paquetes de Instalación

Edita `data/install.json` para modificar:
- Link del instalador NeoForge
- Lista de mods requeridos
- Mods opcionales del lado del cliente
- Orden de texture packs
- Recomendaciones de shaders con links externos

### Historia y Lore

Edita `data/lore.json` para personalizar:
- Historia y descripción del servidor
- Características destacadas
- Tarjetas de misiones

### Colores y Tema

Edita `app/globals.css` para ajustar:
- Colores del modo claro (grises polvorientos, arena suave, azul cielo)
- Colores del modo oscuro (obsidiana profunda, piedra de cueva, azul crepúsculo)
- Tokens de diseño inspirados en Minecraft
- Bordes y sombras pixel

## 🌐 Deployment

### Deploy en Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

O manualmente:

\`\`\`bash
npm run build
\`\`\`

Sube la carpeta `.next` a tu proveedor de hosting.

## 📊 Performance

- Imágenes optimizadas con renderizado pixel-perfect
- Lazy loading para assets pesados
- Animaciones aceleradas por GPU
- Efectos de sonido precargados
- Transiciones de página rápidas
- Bundle size mínimo

## ♿ Accesibilidad

- Elementos HTML semánticos
- Labels y roles ARIA
- Soporte para navegación por teclado
- Amigable con lectores de pantalla
- Estados de focus visibles
- Jerarquía correcta de encabezados
- Texto alt para todas las imágenes

## 🌍 Soporte de Navegadores

- Chrome/Edge (última versión)
- Firefox (última versión)
- Safari (última versión)
- Navegadores móviles

## 👨‍💻 Creador

**Ian Franco Collada Pontorno**

- 📧 Email: [ian9franco@gmail.com](mailto:ian9franco@gmail.com)
- 💼 LinkedIn: [Ian Franco Collada Pontorno](https://www.linkedin.com/in/ian-franco-collada-pontorno)
- 🐱 GitHub: [@Ian9Franco](https://github.com/Ian9Franco)
- 🌐 Portfolio: [ian-pontorno-portfolio.vercel.app](https://ian-pontorno-portfolio.vercel.app/)
- 📷 Instagram: [@ian.franco._](https://www.instagram.com/ian.franco._/)

## 🎮 Comunidad

¡Únete a nuestra comunidad de Discord!

**Discord**: [https://discord.gg/nCaCK3pF](https://discord.gg/nCaCK3pF)

## 📝 Licencia

MIT License - Siéntete libre de usar esto para tu propio servidor de Minecraft.

## 🙏 Créditos

Construido para la comunidad del servidor privado Netherious2.

---

⚡ **Hecho con ❤️ y muchos pixels** por Ian Pontorno
