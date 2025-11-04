# Netherious2 - Minecraft Server Launcher

A pixel art styled single-page web application for the Netherious2 private Minecraft server. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion with authentic Minecraft-inspired design.

## Features

- **Pixel Art Aesthetic** - Authentic Minecraft-inspired blocky design with chunky borders and retro fonts
- **Interactive Sound System** - Minecraft-style UI sounds and optional ambient audio
- **Four Main Sections** - Home, Install, Server Info, and Lore with seamless navigation
- **Dynamic Backgrounds** - Atmospheric pixel art backgrounds that change per section
- **Dark/Light Mode** - Full theme support with Minecraft-inspired color palettes
- **Responsive Design** - Works beautifully on desktop, tablet, and mobile
- **Floating Navigation** - Round pixel-style navigation buttons with hover effects
- **Copy-to-Clipboard** - Easy server IP copying with sound feedback
- **Download System** - NeoForge installer and modpack downloads
- **Sound Toggle** - Master volume control with localStorage persistence
- **Accessibility** - ARIA roles, keyboard navigation, and screen reader support

## Sound System

The launcher includes a complete Minecraft-style audio experience:

- **UI Sound Effects**:
  - Hover sounds on buttons and navigation
  - Click sounds for interactions
  - Copy confirmation sound
  - Transition sounds between sections
  
- **Ambient Audio**:
  - Optional looping background music
  - Smooth fade in/out transitions
  - Separate toggle control
  
- **Sound Controls**:
  - Master mute toggle in top-right corner
  - Ambient music toggle
  - Preferences saved to localStorage
  - All sounds respect global mute setting

### Customizing Sounds

Replace the placeholder sound files in `/public/sounds/`:
- `ui_hover.wav` - Button hover sound
- `ui_click.wav` - Click/select sound
- `ui_copy.wav` - Copy confirmation sound
- `ui_transition.wav` - Section transition sound
- `ambient_loop.mp3` - Background ambient music

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Press Start 2P (headings), VT323 (body)
- **State Management**: Zustand
- **Theme**: next-themes
- **UI Components**: Radix UI primitives

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

\`\`\`bash
npm install
\`\`\`

3. Run the development server:

\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

\`\`\`
├── app/
│   ├── layout.tsx          # Root layout with fonts and theme
│   ├── page.tsx            # Main page with section routing
│   └── globals.css         # Global styles and Minecraft theme tokens
├── components/
│   ├── sections/           # Main content sections
│   │   ├── home-section.tsx
│   │   ├── install-section.tsx
│   │   ├── server-section.tsx
│   │   └── lore-section.tsx
│   ├── ui/                 # Reusable UI components
│   ├── background-scene.tsx
│   ├── floating-nav.tsx
│   ├── mobile-nav.tsx
│   ├── glass-card.tsx      # Pixel-style card component
│   ├── loading-screen.tsx
│   ├── theme-toggle.tsx
│   └── sound-toggle.tsx    # Sound control component
├── hooks/
│   ├── use-copy-to-clipboard.ts
│   ├── use-sound-effects.ts    # UI sound effects hook
│   ├── use-ambient-audio.ts    # Ambient music hook
│   └── use-toast.ts
├── lib/
│   ├── store.ts            # Zustand state management
│   └── utils.ts            # Utility functions
└── public/
    ├── images/             # Background images and assets
    └── sounds/             # Audio files for UI and ambient
\`\`\`

## Customization

### Server Information

Edit `components/sections/server-section.tsx` to update:
- Server IP address (currently: `netherious2.server.net`)
- Minecraft version
- NeoForge version
- Java requirements

### Install Packs

Edit `components/sections/install-section.tsx` to modify:
- NeoForge installer link
- Required mods list
- Optional client-side mods
- Texture pack order (Texture 1, 2, 3, etc.)
- Shader recommendations with external links

### Story & Lore

Edit `components/sections/lore-section.tsx` to customize:
- Server story and description
- Feature highlights
- Mission cards

### Colors & Theme

Edit `app/globals.css` to adjust:
- Light mode colors (dusty greys, soft sand, sky blue)
- Dark mode colors (deep obsidian, cave stone, twilight blue)
- Minecraft-inspired design tokens
- Pixel borders and shadows

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or deploy manually:

\`\`\`bash
npm run build
\`\`\`

Upload the `.next` folder to your hosting provider.

## Performance

- Optimized images with pixel-perfect rendering
- Lazy loading for heavy assets
- GPU-accelerated animations
- Preloaded sound effects
- Fast page transitions
- Minimal bundle size

## Accessibility

- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Focus visible states
- Proper heading hierarchy
- Image alt text for all visuals

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

MIT License - feel free to use this for your own Minecraft server!

## Credits

Built for the Netherious2 private server community.
