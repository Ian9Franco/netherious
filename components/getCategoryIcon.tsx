import {
  Castle,
  Swords,
  Globe2,
  Hammer,
  Sparkles,
  FlaskConical,
  PawPrint,
  Skull,
  Cog,
  Scroll,
} from "lucide-react"

export const categoryColors: Record<string, string> = {
  world_structures: "#D4AF37",      // dorado majestuoso
  bosses_and_combat: "#E63946",     // carmesí intenso
  worlds_and_dimensions: "#4361EE", // azul cósmico
  vanilla_plus: "#80ED99",          // verde esmeralda
  rpg_progression: "#9D4EDD",       // púrpura mágico
  wildlife_and_creatures: "#06D6A0",// verde hoja / turquesa
  hostile_mobs: "#C1121F",          // rojo oscuro
  tools_and_systems: "#A8A9AD",     // gris metálico
  create_expansions: "#F77F00",     // naranja cobre
}

export const getCategoryIcon = (id: string, color?: string, size = 48) => {
  const c = color || categoryColors[id] || "#FFFFFF"

  switch (id) {
    case "world_structures":
      return <Castle color={c} size={size} />
    case "bosses_and_combat":
      return <Swords color={c} size={size} />
    case "worlds_and_dimensions":
      return <Globe2 color={c} size={size} />
    case "vanilla_plus":
      return <Sparkles color={c} size={size} />
    case "rpg_progression":
      return <FlaskConical color={c} size={size} />
    case "wildlife_and_creatures":
      return <PawPrint color={c} size={size} />
    case "hostile_mobs":
      return <Skull color={c} size={size} />
    case "tools_and_systems":
      return <Hammer color={c} size={size} />
    case "create_expansions":
      return <Cog color={c} size={size} />
    default:
      return <Scroll color={c} size={size} />
  }
}
