Netherious Season III: Modern Rustic Redesign Brief
1. Análisis del Estado Actual (Season 2)
Currently, the specific design revolves around a "Skeuomorphic Medieval Book" (Pergamino, Libro Antiguo).

Estética: Papel envejecido, bordes de cuero, tipografía pixelada muy marcada.
Layout: BookLayout simula un libro físico abierto.
Colores: Dominio de marrones (#8B4513), beiges (pergamino) y negros.
Sensación: Clásica, RPG old-school, "Ancient Rustic".
Tech: Tailwind 4, Next.js, Framer Motion.
2. Concepto Season 3: "Modern Arcane / Obsidian & Magic"
Para la Season 3, evolucionaremos de "Papel y Madera" a "Piedra, Cristal y Magia". Mantendremos lo "Rústico" (texturas, imperfecciones) pero modernizaremos la UI para que se sienta más premium, fluida y "mágica" envés de solo "vieja".

Palabras clave: Obsidian, Soul Fire, Cinematic, Depth, Glassmorphism, Neon-runes.

La Evolución Visual
Elemento	Antes (S2)	Después (S3)
Fondo	Madera/Mesa, Plano	Abismo/Void con partículas flotantes y profundidad.
Contenedores	Páginas de papel (Beige)	Placas de Obsidiana/Pizarra (Oscuro) con bordes de cristal rúnico.
Tipografía	Pixel Pesado (Press Start 2P)	Títulos Pixel (Press Start) + Cuerpo legible moderno (ej. 'Rajdhani' o 'Inter') para stats y textos largos.
Bordes	Cuero y marcos ornamentales	Bordes de energía sutiles (Glow) o piedra cincelada.
3. Nueva Paleta de Colores (Netherious S3 Palette)
Una paleta más oscura, contrastada y vibrante. Mínimo 6 colores principales.

Abyssal Void (Fondo Principal):
Hex: #0a0a0c
Uso: Fondos de pantalla, espacios negativos. Profundo, casi negro puro pero con tinte frío.
Obsidian Plate (Superficies/Cartas):
Hex: #16161a (Un gris muy oscuro y sólido)
Uso: Fondos de contenedores, modales, sidebar.
Crimson Magma (Primario / Acción):
Hex: #cf2e2e
Uso: Botones principales, alertas, bordes de peligro. El rojo clásico del Nether pero más vibrante.
Soul Flame (Acento Mágico):
Hex: #2ab8d1 (Cyan alma)
Uso: Brits, efectos de hover, runas activas, links. Contraste frío para el calor del Nether.
Ancient Gold (Texto destacado / Bordes):
Hex: #d4af37
Uso: Títulos de lore, bordes de items legendarios, iconos.
Ash Grey (Texto Cuerpo):
Hex: #a0a0a0
Uso: Texto general. Lectura cómoda sobre fondo oscuro.
Extra:

Netherite Purple: #38285c (Para detalles premium o fondos secundarios).
4. Cambios Estructurales y UX/UI
A. Layout Principal (Adiós al Libro)
El layout de libro limita mucho el espacio. Pasaremos a un "Dashboard Inmersivo".

Una estructura de Pantalla Completa con un marco sutil (vignette).
Navegación: En lugar de pestañas de libro, una Barra de Navegación Flotante (Dock) en la parte inferior o lateral, estilo cristal ahumado.
B. Hero Section (Inicio)
Fondo: Video o Parallax de una landscape del Nether S3.
Título: "NETHERIOUS III" con efecto de "glitch" o fuego animado.
CTA: Botón "JUGAR AHORA" que pulse como un corazón de magma.
C. Páginas Interiores (Lore, Descargas)
Usar Tarjetas Modulares (Bento Grid).
En lugar de texto plano infinito, dividir la información en "Shards" (fragmentos) de cristal/piedra.
Lore: Al hacer hover en una criatura/boss, la tarjeta se expande o ilumina, mostrando el modelo 3D o arte en grande.
D. Animaciones (Framer Motion)
Page Transition: Efecto de "Portal". La pantalla se distorsiona/desvanece en violeta al cambiar de sección.
Scroll: Parallax suave. Los elementos del fondo se mueven más lento que el contenido.
Hover:
Botones: Se llenan de "lava" (gradiente animado) al pasar el mouse.
Textos: Efecto de "desencriptado" (letra por letra) para títulos importantes.
5. Implementación Técnica (Guía)
Pasos Sugeridos
Setup Global:
Actualizar 
globals.css
 con las nuevas variables de color (OKLCH para gamas modernas).
Instalar nuevas fuentes si decidimos cambiar la de cuerpo.
Layout Refactor:
Reemplazar BookLayout por ImmersiveLayout (nombre tentativo).
Crear CrystalNavbar.
Component Styling:
Crear variantes de botones: btn-primary (Magma), btn-ghost (Obsidian), btn-mythic (Gold).
Refactorizar contenedores para usar bordes semi-transparentes y backdrop-filter: blur().
6. Ejemplo de Estilo CSS (Concepto)
css
.card-obsidian {
  background: rgba(22, 22, 26, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
}
.card-obsidian:hover {
  border-color: var(--soul-flame);
  box-shadow: 0 0 15px rgba(42, 184, 209, 0.3);
}
.text-glow {
  text-shadow: 0 0 10px currentColor;
}