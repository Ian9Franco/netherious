# Netherious: RPG Expansion 🚀⚔️

Una experiencia web de alta fidelidad diseñada para el servidor de Minecraft **Netherious**. Esta aplicación actúa como el núcleo central de información, lore y guías de instalación del servidor.

## ✨ Características Principales

- **🎮 Inmersión RPG**: Interfaz diseñada con estética RPG, incluyendo efectos de escritura (Typewriter) en tiempo real y transiciones suaves.
- **🖼️ Lore Interactivo**: Sistema de categorías con iconos únicos, información detallada de mods y galería de imágenes organizadas.
- **🔊 Experiencia Sonora Contextual**: Sistema de sonidos ambientales y de interfaz que reaccionan a las acciones del usuario.
- **🌌 Estética Premium**: Glassmorphism, efectos de meteoros animados, cursores personalizados y máscaras de scroll dinámicas.
- **📱 Responsive Design**: Dock bar unificado y layouts adaptables para una experiencia fluida en cualquier dispositivo.
- **🔍 Fingerprint Secreto**: Función oculta de autenticación ("dale que llueve") para revelar información sensible del servidor.

## 🛠️ Tecnologías

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Estilos**: Vanilla CSS & Tailwind CSS
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
- **Iconos**: [Tabler Icons](https://tabler-icons.io/)
- **Sonido**: Context API personalizada para gestión de audio

## 🚀 Instalación y Desarrollo

Para correr el proyecto localmente:

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Ian9Franco/netherious3.git
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## 📦 Estructura del Proyecto

- `/app`: Rutas del App Router (Home, Lore, Server, Instalar).
- `/components`: Componentes reutilizables (Typewriter, Meteors, Navbar, etc).
- `/data`: Archivos JSON con toda la información y lore del servidor.
- `/public`: Assets estáticos (Imágenes de lore, sonidos, cursores).

---
Desarrollado con ❤️ para la comunidad de **Netherious**.
