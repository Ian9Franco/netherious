'use client'

import { useState } from 'react'
import Image from 'next/image'

export function FingerprintAuth() {
  const [input, setInput] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const passphrase = process.env.NEXT_PUBLIC_AUTH_PASSPHRASE || 'llueve'
    if (input.toLowerCase() === passphrase.toLowerCase()) {
      setShowPassword(true)
      setInput('')
    } else {
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
    <div className="fixed bottom-4 right-4 z-50">
      {!showPassword ? (
        <div className="bg-[#2a150a] border-4 border-[#8B4513] p-4 shadow-[0_8px_16px_rgba(0,0,0,0.6)] gothic-corners aged-paper">
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <Image
                src="/assets/ribbonmain.png"
                alt="Fingerprint"
                width={64}
                height={64}
                className={`${shake ? 'animate-shake' : ''}`}
                style={{ imageRendering: 'pixelated' }}
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#ff5555] rounded-full animate-pulse"></div>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
              <label className="text-[10px] text-[#e8dcc8] font-bold text-center uppercase tracking-wide">
                ¿Dale que...?
              </label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-[#1a0f05] border-2 border-[#8B4513] text-[#e8dcc8] text-[11px] px-3 py-2 text-center font-[family-name:var(--font-pixel)] focus:outline-none focus:border-[#d4a574] transition-colors"
                placeholder="..."
                autoComplete="off"
              />
              <button
                type="submit"
                className="bg-[#8B4513] hover:bg-[#a0522d] text-[#e8dcc8] text-[9px] font-bold py-2 px-4 border-2 border-[#5c3d1a] shadow-[0_3px_0_#3a2010] hover:shadow-[0_1px_0_#3a2010] hover:translate-y-[2px] transition-all uppercase tracking-wide"
              >
                Verificar
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="bg-[#1a0f05] border-4 border-[#d4a574] p-4 shadow-[0_8px_16px_rgba(212,165,116,0.4)] scroll-edge animate-fadeIn">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#55ff55] rounded-full animate-pulse"></div>
              <span className="text-[10px] text-[#55ff55] font-bold uppercase tracking-wide">Acceso Concedido</span>
            </div>
            
            <div className="bg-[#0a0505] border-2 border-[#d4a574] p-3 w-full">
              <div className="text-[8px] text-[#d4a574] mb-1 text-center uppercase">Contraseña Maestra</div>
              <div className="text-[11px] text-[#55ff55] font-mono text-center select-all break-all leading-tight">
                {process.env.NEXT_PUBLIC_MASTER_KEY || '123456789101112131415'}
              </div>
            </div>

            <button
              onClick={handleReset}
              className="bg-[#5c3d1a] hover:bg-[#4a2f15] text-[#e8dcc8] text-[8px] font-bold py-1 px-3 border border-[#8B4513] shadow-[0_2px_0_#3a2010] hover:shadow-[0_1px_0_#3a2010] hover:translate-y-[1px] transition-all uppercase"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
