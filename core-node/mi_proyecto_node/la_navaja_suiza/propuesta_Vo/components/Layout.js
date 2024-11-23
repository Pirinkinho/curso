

// `components/Layout.js` - Componente de diseño principal

import Head from 'next/head'
import NavBar from './NavBar'

export default function Layout({ children }) {
  return (
    <div className="container">
      <Head>
        <title>La navaja suíza</title>
        <meta name="description" content="Utilidades web por Koldosan experiencies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main>{children}</main>

      <footer>
        <p>© 2023 Koldosan experiencies. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}
