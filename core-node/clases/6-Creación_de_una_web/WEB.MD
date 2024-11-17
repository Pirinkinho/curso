# Aplicación Web Estática con NX y Web Components

## Introduccion

> Capítulo 6: El Arquitecto de la Interfaz

En ANFORA, le piden a Javier crear una sencilla WEB para un proyecto interno. Paralelamente, aplica este conocimiento en UTOPIA. Decide implementar su propia WEB y un sistema básico de autenticación, con el objetivo de controlar la aplicación desde diferentes dispositivos, comienza a utilizar IA para programar y esto le hace entender lo importante que es el tiempo de aprendizaje.

Ahora, fascinado por las posibilidades que ofrecen herramientas como AutoGen, investiga cómo incorporarlas a su flujo de trabajo para automatizar la creación de documentación y tutoriales para UTOPIA, pensando en un futuro en el que pueda ayudar a otros a aprender a programar.

Usaremos el proyecto code/code-node-web basado en NX para crear una WEB que será parte visual de nuestro proyecto.

Este clase te guiará en la creación de una aplicación web estática utilizando NX como herramienta de desarrollo y Web Components para la interfaz de usuario. Aprenderás a configurar el proyecto, crear componentes web personalizados y estructurar tu aplicación.

## Índice

1. [Configuración del Proyecto](#configuración-del-proyecto)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Creación de Web Components](#creación-de-web-components)
4. [Estilos y CSS](#estilos-y-css)
5. [Testing](#testing)
6. [Configuración de Build](#configuración-de-build)

## Configuración del Proyecto

### Requisitos Previos

- Node.js (versión 12 o superior)
- NX CLI instalado globalmente
- Conocimientos básicos de TypeScript y Web Components

### Crear nuevo proyecto

```bash
# Instalar NX CLI globalmente
npm install -g nx

# Crear nuevo workspace
npx create-nx-workspace@latest core-node-web --preset=web-components

# Navegar al directorio del proyecto
cd core-node-web
```

## Estructura del Proyecto

```
core-node-web/
├── apps/
│   └── ui/
│       ├── src/
│       │   ├── app/
│       │   │   ├── app.element.ts       # Componente principal
│       │   │   ├── app.element.spec.ts  # Tests
│       │   │   └── app.element.css      # Estilos
│       │   ├── assets/                  # Recursos estáticos
│       │   ├── environments/            # Configuraciones por entorno
│       │   ├── index.html
│       │   ├── main.ts                  # Punto de entrada
│       │   ├── polyfills.ts            # Polyfills para navegadores
│       │   └── styles.css              # Estilos globales
│       ├── jest.config.js              # Configuración de tests
│       └── project.json                # Configuración del proyecto
└── package.json
```

## Creación de Web Components

### Componente Principal

El componente principal (`app.element.ts`) se define como una clase que extiende `HTMLElement`:

```typescript
export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    this.innerHTML = `
      <div class="wrapper">
        <!-- Contenido del componente -->
      </div>
    `;
  }
}

customElements.define('core-node-web-root', AppElement);
```

### Ciclo de Vida de los Componentes

Los Web Components tienen varios métodos del ciclo de vida:

1. `constructor()`: Inicialización del componente
2. `connectedCallback()`: Cuando el componente se añade al DOM
3. `disconnectedCallback()`: Cuando el componente se elimina del DOM
4. `attributeChangedCallback()`: Cuando un atributo observado cambia

### Ejemplo de Implementación con Estado

```typescript
export class AppElement extends HTMLElement {
  private state = {
    count: 0,
  };

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  private render() {
    this.innerHTML = `
      <div class="wrapper">
        <h1>Contador: ${this.state.count}</h1>
        <button id="increment">Incrementar</button>
      </div>
    `;
  }

  private addEventListeners() {
    this.querySelector('#increment')?.addEventListener('click', () => {
      this.state.count++;
      this.render();
    });
  }
}
```

## Estilos y CSS

### Estilos Encapsulados

Los estilos se pueden definir en un archivo separado (`app.element.css`) y se importan en el componente:

```typescript
import './app.element.css';
```

### Estructura de Estilos

Los estilos siguen una estructura modular:

```css
/* Reseteo básico */
*,
::before,
::after {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
}

/* Variables globales */
:root {
  --primary-color: hsla(214, 62%, 21%, 1);
  --accent-color: hsla(162, 47%, 50%, 1);
}

/* Estilos de componentes */
.wrapper {
  width: 100%;
}

.container {
  margin: 0 auto;
  max-width: 768px;
  padding: 1rem;
}
```

## Testing

### Configuración de Jest

El archivo `jest.config.js` configura el entorno de testing:

```javascript
module.exports = {
  displayName: 'ui',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/ui',
};
```

### Escribiendo Tests

Los tests se escriben usando Jest (`app.element.spec.ts`):

```typescript
import { AppElement } from './app.element';

describe('AppElement', () => {
  let app: AppElement;

  beforeEach(() => {
    app = new AppElement();
  });

  it('should create successfully', () => {
    expect(app).toBeTruthy();
  });

  it('should render content', () => {
    app.connectedCallback();
    expect(app.querySelector('.wrapper')).toBeTruthy();
  });
});
```

## Configuración de Build

### Project.json

El archivo `project.json` configura las opciones de build:

```json
{
  "targets": {
    "build": {
      "executor": "@nrwl/web:webpack",
      "outputs": ["{options.outputPath}"],
      "defaultConfiguration": "production",
      "options": {
        "outputPath": "dist/apps/ui",
        "compiler": "babel",
        "index": "apps/ui/src/index.html",
        "baseHref": "/",
        "main": "apps/ui/src/main.ts"
      }
    }
  }
}
```

### Comandos de Build

```bash
# Desarrollo
nx serve ui

# Producción
nx build ui --prod

# Tests
nx test ui

# Lint
nx lint ui
```

## Mejores Prácticas

1. **Componentes Atómicos**: Crear componentes pequeños y reutilizables
2. **Custom Events**: Usar eventos personalizados para la comunicación entre componentes
3. **Shadow DOM**: Considerar el uso de Shadow DOM para encapsulación total
4. **Lazy Loading**: Implementar carga perezosa para componentes grandes
5. **Performance**: Minimizar manipulaciones del DOM

## Conclusión

Este tutorial te ha mostrado cómo crear una aplicación web estática usando NX y Web Components. Las ventajas de este enfoque incluyen:

- Desarrollo modular y mantenible
- Componentes nativos del navegador
- Herramientas modernas de desarrollo
- Testing integrado
- Build optimizado para producción

Para mejorar esta implementación, considera:

1. Implementar routing
2. Añadir gestión de estado
3. Integrar PWA capabilities
4. Optimizar el rendimiento
5. Añadir SSR (Server-Side Rendering)

> Ejercicio clase, implementar los 5 puntos... CS3.5 Game!

# Resumen

> Capítulo 6: El Arquitecto de la Interfaz

Crear una API pura para ANFORA le da a Javier la excusa perfecta para perfeccionar su propia API usando NX para UTOPIA.

AutoGen se convierte en su mejor amigo. "Documentar es divertido… ¿verdad?", se pregunta mientras genera documentación automáticamente mientras pasea con su móvil por La Plaza del Castillo mientras va hacia lo viejo, las palomas, siempre presentes, parecen asentir cada vez que usa su móvil y salen volando en la misma dirección, esto le empieza a recordar un podcast sobre ciberseguridad que tenía pendiente...
