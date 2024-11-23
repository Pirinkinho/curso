
// `components/NavBar.js` - Barra de navegación

import Link from 'next/link'

export default function NavBar() {
  return (
    <nav>
      <Link href="/">Inicio</Link>
      <Link href="/convertidor-unidades">Convertidor de Unidades</Link>
      <Link href="/test-personalidad">Test de Personalidad</Link>
      <Link href="/simulador-prestamos">Simulador de Préstamos</Link>
      <Link href="/administrador-archivos">Administrador de Archivos</Link>
      <Link href="/simulador-clima">Simulador de Clima</Link>
      <Link href="/convertidor-monedas">Convertidor de Monedas</Link>
      <Link href="/calculadora">Calculadora</Link>
      <Link href="/about">Acerca de</Link>
      <Link href="/contact">Contacto</Link>
    </nav>
  )
}
