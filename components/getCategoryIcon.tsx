import {
  Castle,
  Sword,
  Flame,
  Globe,
  Pickaxe,
  Cog,
  PawPrint,
  Sparkles,
  Skull,
  Scroll,
} from "lucide-react"

// 🎨 Colores translúcidos por categoría
export const categoryColors: Record<string, string> = {
  world_structures: "#9B5DE5",
  bosses_and_combat: "#FF006E",
  worlds_and_dimensions: "#3A86FF",
  vanilla_plus: "#FFD60A",
  rpg_progression: "#8338EC",
  wildlife_and_creatures: "#00F5D4",
  hostile_mobs: "#FB5607",
  tools_and_systems: "#FFBE0B",
  create_expansions: "#6A4C93",
}

export const getCategoryIcon = (id: string, color?: string, size = 48) => {
  const c = color || categoryColors[id] || "#FFFFFF"

  switch (id) {
    case "world_structures":
      return <Castle color={c} size={size} />
    case "bosses_and_combat":
      return <Flame color={c} size={size} />
    case "worlds_and_dimensions":
      return <Globe color={c} size={size} />
    case "vanilla_plus":
      return <Sparkles color={c} size={size} />
    case "rpg_progression":
      return <Sword color={c} size={size} />
    case "wildlife_and_creatures":
      return <PawPrint color={c} size={size} />
    case "hostile_mobs":
      return <Skull color={c} size={size} />
    case "tools_and_systems":
      return <Cog color={c} size={size} />
    case "create_expansions":
      return <Pickaxe color={c} size={size} />
    default:
      return <Scroll color={c} size={size} />
  }
}
