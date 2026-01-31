# Netherious: RPG Expansion 🚀⚔️

Una experiencia web de alta fidelidad diseñada para el servidor de Minecraft **Netherious**. Esta aplicación actúa como el núcleo central de información, lore y guías de instalación del servidor.

## ✨ Características Principales

- **📖 Interfaz de Libro Místico**: Layout dinámico basado en un libro RPG con páginas izquierda/derecha y navegación fluida.
- **🖼️ Lore & Códex Creativo**: Categorías con etiquetas temáticas (ej: *Peligros de Grado S*, *Bestiario*) y descripciones narrativas alejadas del tono bot.
- **🎮 Características "Nashe"**: Resumen de los pilares del servidor: *Mundos Flama*, *Combate God* y *Progresión Nashe*.
- **🔊 Paisaje Sonoro Legendario**: Sistema de audio contextual con sonidos de Minecraft (Enderman, Villagers, XP) que reaccionan a cada click y transición.
- **📱 Responsive & Pixel Perfect**: Estética de pixel art optimizada para móviles con una Dock bar unificada.
- **🔍 Fingerprint & Secretos**: Panel de acceso restringido con un tono directo y "pa" para la comunidad.

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
