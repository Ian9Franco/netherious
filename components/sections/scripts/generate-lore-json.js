// generateLoreJSON.js
const fs = require("fs");
const path = require("path");

// Configuración de categorías básicas (puedes agregar o modificar títulos, descripciones y detalles)
const categoriesConfig = [
  {
    id: "world_structures",
    title: "Estructuras & Mazmorras Épicas",
    description: "Construcciones avanzadas con enemigos, botines y ambientación inmersiva.",
    details: [
      "Integrated Dungeons and Structures",
      "Trial Chambers Backport",
      "Epic Witch Huts",
      "Golem Dungeons",
      "Dungeons Arise Seven Seas"
    ]
  },
  {
    id: "bosses_and_combat",
    title: "Jefes & Combate Avanzado",
    description: "Mods que reinventan el combate, introduciendo jefes, enemigos y encuentros desafiantes.",
    details: [
      "Bosses Arise",
      "Dungeon Now Loading 2%",
      "Qliphoth Awakening",
      "L_Ender Cataclysm"
    ]
  },
  // Agregá más categorías según tus carpetas...
];

// Función que genera el array de imágenes para una carpeta
function getImagesFromFolder(folderId) {
  const folderPath = path.join(__dirname, "public", folderId);

  if (!fs.existsSync(folderPath)) {
    return ["/placeholder.svg"];
  }

  const files = fs.readdirSync(folderPath)
    .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file)) // solo imágenes
    .map(file => `/${folderId}/${file}`);

  return files.length > 0 ? files : ["/placeholder.svg"];
}

// Generar JSON completo
function generateLoreJSON() {
  const loreJSON = {
    intro: {
      title: "La Historia Comienza",
      paragraph1: "Bienvenido a Netherious: RPG Expansion, un mundo forjado con magia, acero y maquinaria...",
      paragraph2: "Explora dimensiones antiguas, ciudades medievales y ruinas tecnológicas..."
    },
    about: {
      title: "Sobre el Servidor",
      paragraphs: [
        "Netherious es una experiencia RPG multiversal desarrollada sobre Forge 1.20.1...",
        "El servidor equilibra lo clásico de Minecraft con sistemas modernos...",
        "Gracias a la integración de mods como Create, Valoria, Cataclysm y Bosses Arise..."
      ]
    },
    categories: categoriesConfig.map(cat => ({
      id: cat.id,
      title: cat.title,
      description: cat.description,
      images: getImagesFromFolder(cat.id),
      details: cat.details
    })),
    features: [
      { title: "Mods Curados", description: "Una selección balanceada de mods para exploración, combate y rendimiento óptimo." },
      { title: "Aventuras Épicas", description: "Ruinas, biomas y desafíos con recompensas legendarias en cada expedición." },
      { title: "Desafíos Legendarios", description: "Combates y progresión con profundidad, dificultad y estrategia real." }
    ],
    outro: {
      title: "Tu Aventura Comienza Ahora",
      paragraph: "Únete a Netherious y vive la experiencia definitiva de Minecraft modded..."
    }
  };

  return loreJSON;
}

// Guardar JSON en archivo
const loreData = generateLoreJSON();
const outputPath = path.join(__dirname, "data", "lore.json");

// Crear carpeta /data si no existe
if (!fs.existsSync(path.dirname(outputPath))) {
  fs.mkdirSync(path.dirname(outputPath));
}

fs.writeFileSync(outputPath, JSON.stringify(loreData, null, 2));
console.log(`✅ JSON generado correctamente en ${outputPath}`);
