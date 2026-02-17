'use client'

import { useState } from 'react'
import Image from 'next/image'

interface CopyButtonProps {
  text: string
  label?: string
}

function CopyButton({ text, label = 'COPIAR' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const { playSound } = useSoundEffects()
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    playSound('success-orb')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="relative bg-gradient-to-b from-[#ffdd00] to-[#ffaa00] text-black text-[8px] font-black py-1.5 px-3 border-4 border-black shadow-[4px_4px_0_#000] hover:shadow-[2px_2px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase tracking-wider"
      style={{ imageRendering: 'pixelated' }}
    >
      <span className="relative z-10">{copied ? '✓ COPIADO!' : label}</span>
      <div className="absolute inset-0 bg-[url('/assets/grid-overlay.png')] opacity-10 pointer-events-none" style={{ backgroundSize: '2px 2px' }}></div>
    </button>
  )
}

import { useSoundEffects } from '@/hooks/use-sound-effects'

// ... existing code ...

export function FingerprintSection() {
  const [input, setInput] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [shake, setShake] = useState(false)
  const { playSound } = useSoundEffects()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.toLowerCase() === 'llueve') {
      playSound('success-villager')
      setShowPassword(true)
      setInput('')
    } else {
      playSound('failure')
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setInput('')
    }
  }

  const handleReset = () => {
    setShowPassword(false)
    setInput('')
  }

  return (
    <div className="relative p-4 border-6 border-black bg-gradient-to-br from-[#ff6b9d] via-[#c06c84] to-[#6c5b7b] shadow-[8px_8px_0_#000] mt-4" style={{ imageRendering: 'pixelated' }}>
      {/* Comic-style burst background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-2 right-2 w-16 h-16 border-4 border-black rounded-full"></div>
        <div className="absolute bottom-2 left-2 w-12 h-12 border-4 border-black rounded-full"></div>
      </div>

      {/* Wax seal with pop art style */}
      <div className="absolute -top-6 right-4 w-12 h-12 bg-gradient-to-br from-[#ffdd00] to-[#ff6b00] border-4 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_#000] rotate-12">
        <Image src="/assets/button2.png" alt="Fingerprint" width={32} height={32} style={{ imageRendering: 'pixelated' }} />
      </div>

      <div className="relative z-10">
        <h2 className="text-[14px] text-white font-black uppercase mb-1 drop-shadow-[2px_2px_0_#000] tracking-wide border-b-4 border-black pb-2" style={{ textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000' }}>
          🔐 CONTRASEÑA DE SEGURIDAD
        </h2>

        {/* New image requested */}
        <div className="flex justify-center mb-3">
          <Image
            src="/assets/mini/server/dale que llueve.png"
            alt="Dale que llueve"
            width={120}
            height={40}
            style={{ imageRendering: 'pixelated' }}
            className="drop-shadow-[2px_2px_0_#000]"
          />
        </div>

        <p className="text-[10px] text-white font-bold mb-3 leading-relaxed bg-black/30 p-2 border-2 border-black">
          ⚡ Y pa? vas a entrar y no vas a poner la contraseña? La contraseña es obligatoria pa. Es la llave para descargar el modpack oficial de Netherious. Sin eso, no pasás del lobby pa.
        </p>

        {!showPassword ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label className="text-[10px] text-white font-black uppercase tracking-wide drop-shadow-[2px_2px_0_#000]">
              💭 ¿Dale que...?
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={`bg-white border-4 border-black text-black text-[11px] px-3 py-2 text-center font-black focus:outline-none focus:ring-4 focus:ring-[#ffdd00] transition-all uppercase ${shake ? 'animate-shake' : ''}`}
              placeholder="..."
              autoComplete="off"
              style={{ imageRendering: 'pixelated' }}
            />
            <button
              type="submit"
              className="relative bg-gradient-to-b from-[#00ff88] to-[#00cc66] text-black text-[10px] font-black py-3 px-4 border-4 border-black shadow-[6px_6px_0_#000] hover:shadow-[3px_3px_0_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all uppercase tracking-wider"
              style={{ imageRendering: 'pixelated' }}
            >
              <span className="relative z-10">✓ VERIFICAR</span>
              <div className="absolute inset-0 bg-[url('/assets/grid-overlay.png')] opacity-10 pointer-events-none" style={{ backgroundSize: '2px 2px' }}></div>
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-3 animate-fadeIn">
            <div className="flex items-center gap-2 justify-center bg-gradient-to-r from-[#00ff88] to-[#00ffff] border-4 border-black p-2 shadow-[4px_4px_0_#000]">
              <div className="w-3 h-3 bg-black rounded-full animate-pulse"></div>
              <span className="text-[10px] text-black font-black uppercase tracking-wide">✓ ACCESO CONCEDIDO!</span>
            </div>

            <div className="bg-black border-4 border-[#ffdd00] p-3 shadow-[6px_6px_0_#ffdd00]">
              <div className="text-[9px] text-[#ffdd00] mb-2 text-center uppercase font-black tracking-wide">🔑 CONTRASEÑA MAESTRA</div>
              <div className="text-[12px] text-[#00ff88] font-mono text-center select-all break-all leading-tight mb-3 font-black bg-black/50 p-2 border-2 border-[#00ff88]">
                {process.env.NEXT_PUBLIC_FINGERPRINT}
              </div>
              <div className="flex justify-center mb-3">
                <CopyButton text={process.env.NEXT_PUBLIC_FINGERPRINT || ""} label="COPIAR" />
              </div>

              {/* BOSS FINAL IMAGE */}
              <div className="relative mt-4 border-4 border-[#ff1744] p-2 bg-gradient-to-br from-[#ff1744] to-[#d50000] shadow-[6px_6px_0_#000]">
                <div className="text-[9px] text-white mb-2 text-center uppercase font-black tracking-wide drop-shadow-[2px_2px_0_#000]">
                  ⚔️ BOSS FINAL ⚔️
                </div>
                <div className="relative bg-black p-1 border-2 border-white">
                  <Image
                    src="/assets/mini/server/bossfinal.png"
                    alt="Boss Final"
                    width={200}
                    height={200}
                    className="w-full h-auto"
                    style={{ imageRendering: 'pixelated' }}
                  />
                  {/* Comic burst effect around image */}
                  <div className="absolute -inset-1 -z-10" style={{
                    backgroundImage: 'repeating-conic-gradient(from 0deg, #ff1744 0deg 10deg, transparent 10deg 20deg)'
                  }}></div>
                </div>
                <div className="text-[8px] text-white mt-2 text-center font-bold">
                  ¡Ju ju! te va a romper el orto este
                </div>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="bg-gradient-to-b from-[#ff6b9d] to-[#ff1744] text-white text-[9px] font-black py-2 px-3 border-4 border-black shadow-[4px_4px_0_#000] hover:shadow-[2px_2px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase tracking-wide"
              style={{ imageRendering: 'pixelated' }}
            >
              ✕ CERRAR
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
