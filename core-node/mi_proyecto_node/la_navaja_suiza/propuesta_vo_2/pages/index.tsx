

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-warm-100 text-warm-900">
      <Head>
        <title>La navaja suiza</title>
        <meta name="description" content="Una herramienta multifuncional para tus necesidades diarias" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-warm-200 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">La navaja suiza</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/convertidor-unidades" className="hover:underline">Convertidor de Unidades</Link></li>
              <li><Link href="/simulador-clima" className="hover:underline">Simulador de Clima</Link></li>
              <li><Link href="/convertidor-monedas" className="hover:underline">Convertidor de Monedas</Link></li>
              <li><Link href="/calculadora" className="hover:underline">Calculadora</Link></li>
              <li><Link href="/acerca-de" className="hover:underline">Acerca de</Link></li>
              <li><Link href="/contacto" className="hover:underline">Contacto</Link></li>
              <li><Link href="/registrarse" className="hover:underline">Registrarse</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto mt-8 p-4">
        <div className="relative h-96 mb-8">
          <Image
            src="/swiss-flag.svg"
            alt="Bandera de Suiza"
            layout="fill"
            objectFit="cover"
            className="opacity-25"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-4xl font-bold text-warm-900 bg-warm-100 bg-opacity-75 p-4 rounded">
              Bienvenido a La navaja suiza
            </h2>
          </div>
        </div>

        <p className="text-lg mb-4">
          La navaja suiza es tu herramienta multifuncional para el día a día. Desde conversiones de unidades hasta
          simulaciones de clima, tenemos todo lo que necesitas en un solo lugar.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {['Convertidor de Unidades', 'Simulador de Clima', 'Convertidor de Monedas', 'Calculadora', 'Acerca de', 'Contacto'].map((tool) => (
            <div key={tool} className="bg-warm-200 p-4 rounded shadow hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{tool}</h3>
              <p>Descubre cómo {tool.toLowerCase()} puede ayudarte en tu día a día.</p>
              <Link href={`/${tool.toLowerCase().replace(/ /g, '-')}`} className="mt-2 inline-block text-warm-700 hover:underline">
                Explorar {tool}
              </Link>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-warm-200 mt-8 p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Koldosan experiencies. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

