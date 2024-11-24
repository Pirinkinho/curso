

import { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { ChevronRight, Settings, User, DollarSign, Folder, Cloud, RefreshCcw, Calculator } from 'lucide-react'

const tools = [
  { name: 'Convertidor de Unidades', icon: RefreshCcw, color: 'bg-blue-500' },
  { name: 'Test de Personalidad', icon: User, color: 'bg-green-500' },
  { name: 'Simulador de Préstamos', icon: DollarSign, color: 'bg-yellow-500' },
  { name: 'Administrador de Archivos', icon: Folder, color: 'bg-purple-500' },
  { name: 'Simulador de Clima', icon: Cloud, color: 'bg-cyan-500' },
  { name: 'Convertidor de Monedas', icon: RefreshCcw, color: 'bg-pink-500' },
  { name: 'Calculadora Básica', icon: Calculator, color: 'bg-red-500' },
]

export default function Home() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Head>
        <title>La Navaja Suiza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">La Navaja Suiza</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              className={`p-6 rounded-lg shadow-lg ${tool.color} text-white cursor-pointer transition-all duration-300 ease-in-out`}
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setHoveredTool(tool.name)}
              onHoverEnd={() => setHoveredTool(null)}
            >
              <div className="flex items-center justify-between">
                <tool.icon size={24} />
                <ChevronRight size={24} className={`transition-opacity duration-300 ${hoveredTool === tool.name ? 'opacity-100' : 'opacity-0'}`} />
              </div>
              <h2 className="mt-4 text-xl font-semibold">{tool.name}</h2>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="bg-white shadow mt-8 py-4">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © 2023 Koldosan experiencies. Todos los derechos reservados.
        </div>
      </footer>

      <style jsx global>{`
        body {
          background-image: url('/images/swiss-flag.svg');
          background-size: cover;
          background-attachment: fixed;
          background-position: center;
        }
      `}</style>
    </div>
  )
}

