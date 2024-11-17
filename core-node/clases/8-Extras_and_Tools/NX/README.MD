# Anexo: Conceptos Avanzados y Atomic Design con Web Components

## Índice de Anexos

1. [Comunicación entre Componentes](#1-comunicación-entre-componentes)
2. [Implementación de Routing](#2-implementación-de-routing)
3. [Integración con APIs REST](#3-integración-con-apis-rest)
4. [Patrones Avanzados de Web Components](#4-patrones-avanzados-de-web-components)
5. [Laboratorio de Componentes Atómicos](#5-laboratorio-de-componentes-atómicos)

## 1. Comunicación entre Componentes

### 1.1 Custom Events

Los Web Components pueden comunicarse mediante eventos personalizados:

```typescript
// Componente Emisor
export class EmitterComponent extends HTMLElement {
  private emitMessage() {
    const event = new CustomEvent('message-sent', {
      detail: { message: 'Hello!' },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}

// Componente Receptor
export class ReceiverComponent extends HTMLElement {
  connectedCallback() {
    this.addEventListener('message-sent', (e: CustomEvent) => {
      console.log(e.detail.message);
    });
  }
}
```

### 1.2 Prop Binding

Pasando datos mediante atributos:

```typescript
export class DataComponent extends HTMLElement {
  static get observedAttributes() {
    return ['data-value'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'data-value') {
      this.render(newValue);
    }
  }

  private render(value: string) {
    this.innerHTML = `<div>Value: ${value}</div>`;
  }
}
```

### 1.3 Estado Compartido

Implementando un store simple:

```typescript
class Store {
  private state = {};
  private listeners = new Set<Function>();

  subscribe(listener: Function) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  setState(newState: any) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((listener) => listener(this.state));
  }

  getState() {
    return this.state;
  }
}

const store = new Store();

export class ConnectedComponent extends HTMLElement {
  connectedCallback() {
    store.subscribe((state) => this.render(state));
  }
}
```

## 2. Implementación de Routing

### 2.1 Router Básico

```typescript
export class RouterComponent extends HTMLElement {
  private routes: Map<string, string> = new Map();

  constructor() {
    super();
    this.setupRouter();
  }

  private setupRouter() {
    // Definir rutas
    this.routes.set('/', 'home-component');
    this.routes.set('/users', 'users-component');
    this.routes.set('/about', 'about-component');

    // Manejar cambios de ruta
    window.addEventListener('popstate', () => this.handleRoute());

    // Interceptar clicks en enlaces
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLAnchorElement;
      if (target.matches('[data-route]')) {
        e.preventDefault();
        this.navigate(target.pathname);
      }
    });
  }

  private async handleRoute() {
    const path = window.location.pathname;
    const componentTag = this.routes.get(path) || 'not-found-component';
    this.innerHTML = `<${componentTag}></${componentTag}>`;
  }

  public navigate(path: string) {
    window.history.pushState({}, '', path);
    this.handleRoute();
  }
}

customElements.define('app-router', RouterComponent);
```

### 2.2 Uso del Router

```html
<app-router>
  <nav>
    <a href="/" data-route>Home</a>
    <a href="/users" data-route>Users</a>
    <a href="/about" data-route>About</a>
  </nav>
</app-router>
```

## 3. Integración con APIs REST

### 3.1 Servicio Base

```typescript
class HttpService {
  private baseUrl = 'http://localhost:8080';

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  }
}
```

### 3.2 Componente de Usuario con API Integration

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

export class UserListComponent extends HTMLElement {
  private http = new HttpService();
  private users: User[] = [];

  async connectedCallback() {
    try {
      this.users = await this.http.get<User[]>('/api/users');
      this.render();
    } catch (error) {
      this.handleError(error);
    }
  }

  private render() {
    this.innerHTML = `
      <div class="user-list">
        ${this.users
          .map(
            (user) => `
          <div class="user-card">
            <h3>${user.name}</h3>
            <p>${user.email}</p>
          </div>
        `,
          )
          .join('')}
      </div>
    `;
  }

  private handleError(error: Error) {
    this.innerHTML = `
      <div class="error">
        Error loading users: ${error.message}
      </div>
    `;
  }
}

customElements.define('user-list', UserListComponent);
```

### 3.3 Formulario de Creación de Usuario

```typescript
export class UserFormComponent extends HTMLElement {
  private http = new HttpService();

  connectedCallback() {
    this.render();
    this.setupListeners();
  }

  private render() {
    this.innerHTML = `
      <form id="userForm">
        <input type="text" name="name" placeholder="Name" required>
        <input type="email" name="email" placeholder="Email" required>
        <button type="submit">Create User</button>
      </form>
    `;
  }

  private setupListeners() {
    this.querySelector('form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      try {
        const user = await this.http.post<User>('/api/users', {
          name: formData.get('name'),
          email: formData.get('email'),
        });
        this.dispatchEvent(new CustomEvent('user-created', { detail: user }));
      } catch (error) {
        console.error('Error creating user:', error);
      }
    });
  }
}
```

## 4. Patrones Avanzados de Web Components

### 4.1 Mixins y Composición

```typescript
// Mixin para funcionalidad de tema
const ThemeMixin = (baseClass: any) =>
  class extends baseClass {
    private theme: 'light' | 'dark' = 'light';

    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      this.setAttribute('theme', this.theme);
    }
  };

// Mixin para estado local
const StateMixin = (baseClass: any) =>
  class extends baseClass {
    private state = {};

    setState(newState: any) {
      this.state = { ...this.state, ...newState };
      this.render();
    }
  };

// Uso de mixins
class EnhancedComponent extends ThemeMixin(StateMixin(HTMLElement)) {
  // Implementación del componente
}
```

### 4.2 Shadow DOM Templates

```typescript
export class TemplateComponent extends HTMLElement {
  private template: HTMLTemplateElement;
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.template = document.createElement('template');
    this.template.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 1rem;
        }
        ::slotted(h1) {
          color: var(--primary-color);
        }
      </style>
      <slot></slot>
    `;
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.appendChild(this.template.content.cloneNode(true));
  }
}
```

### 4.3 Lazy Loading de Componentes

```typescript
export class LazyComponent extends HTMLElement {
  private async loadComponent() {
    try {
      const module = await import('./heavy-component.js');
      const component = document.createElement('heavy-component');
      this.appendChild(component);
    } catch (error) {
      console.error('Error loading component:', error);
    }
  }

  connectedCallback() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadComponent();
          observer.disconnect();
        }
      });
    });
    observer.observe(this);
  }
}
```

## 5. Laboratorio de Componentes Atómicos

### 5.1 Principios de Atomic Design

1. **Átomos**: Componentes básicos indivisibles
2. **Moléculas**: Grupos de átomos funcionando juntos
3. **Organismos**: Grupos de moléculas que forman una sección
4. **Templates**: Esqueletos de páginas
5. **Páginas**: Instancias específicas de templates

### 5.2 UI Kit Basado en el Código

#### 5.2.1 Átomos

```typescript
// Botón Átomo
export class ButtonAtom extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'size'];
  }

  connectedCallback() {
    this.classList.add('button-pill', 'rounded', 'shadow');
    this.render();
  }

  render() {
    const variant = this.getAttribute('variant') || 'primary';
    const size = this.getAttribute('size') || 'medium';

    this.innerHTML = `
      <button class="button-${variant} size-${size}">
        <slot></slot>
      </button>
    `;
  }
}

// Icono Átomo
export class IconAtom extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'size', 'color'];
  }

  render() {
    const name = this.getAttribute('name');
    const size = this.getAttribute('size') || '24';
    const color = this.getAttribute('color') || 'currentColor';

    // Mapeo de nombres de iconos a paths SVG
    const iconPaths = {
      'arrow-right': 'M9 5l7 7-7 7',
      // ... más iconos
    };

    this.innerHTML = `
      <svg
        width="${size}"
        height="${size}"
        viewBox="0 0 24 24"
        fill="none"
        stroke="${color}"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="${iconPaths[name]}"
        />
      </svg>
    `;
  }
}
```

#### 5.2.2 Moléculas

```typescript
// Card Molécula
export class CardMolecule extends HTMLElement {
  connectedCallback() {
    this.classList.add('rounded', 'shadow');
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="card">
        <div class="card-header">
          <slot name="header"></slot>
        </div>
        <div class="card-content">
          <slot></slot>
        </div>
        <div class="card-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

// ListItem Molécula
export class ListItemMolecule extends HTMLElement {
  connectedCallback() {
    this.classList.add('list-item-link');
    this.render();
  }

  render() {
    this.innerHTML = `
      <icon-atom name="document"></icon-atom>
      <span>
        <slot name="title"></slot>
        <slot name="description"></slot>
      </span>
      <icon-atom name="arrow-right"></icon-atom>
    `;
  }
}
```

#### 5.2.3 Organismos

```typescript
// Navigation Organismo
export class NavigationOrganism extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <nav id="main-nav">
        <div class="logo">
          <slot name="logo"></slot>
        </div>
        <div class="nav-links">
          <slot name="links"></slot>
        </div>
      </nav>
    `;
  }
}

// Learning Materials Organismo
export class LearningMaterialsOrganism extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div id="learning-materials" class="rounded shadow">
        <h2><slot name="title"></slot></h2>
        <slot name="items"></slot>
      </div>
    `;
  }
}
```

#### 5.2.4 Templates

```typescript
// Main Layout Template
export class MainLayoutTemplate extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="wrapper">
        <div class="container">
          <slot name="header"></slot>
          <slot name="hero"></slot>
          <slot name="content"></slot>
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}
```

### 5.3 Estilos del UI Kit

```css
/* Variables de diseño */
:root {
  /* Colores */
  --primary: hsla(214, 62%, 21%, 1);
  --accent: hsla(162, 47%, 50%, 1);
  --gray-100: rgba(243, 244, 246, 1);
  --gray-500: rgba(107, 114, 128, 1);

  /* Espaciado */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-4: 1rem;
  --spacing-8: 2rem;
```

# Anexo: Mejoras Avanzadas para Web Components con NX

## Índice
1. [Implementación de Routing Avanzado](#1-implementación-de-routing-avanzado)
2. [Gestión de Estado Global](#2-gestión-de-estado-global)
3. [Capacidades PWA](#3-capacidades-pwa)
4. [Optimización de Rendimiento](#4-optimización-de-rendimiento)
5. [Server-Side Rendering](#5-server-side-rendering)

## 1. Implementación de Routing Avanzado

### 1.1 Router Personalizado con History API

```typescript
class Router {
  private static instance: Router;
  private routes: Map<string, () => Promise<void>>;
  private rootElement: HTMLElement;

  private constructor(rootElement: HTMLElement) {
    this.routes = new Map();
    this.rootElement = rootElement;
    this.initializeRouter();
  }

  static getInstance(rootElement: HTMLElement): Router {
    if (!Router.instance) {
      Router.instance = new Router(rootElement);
    }
    return Router.instance;
  }

  private initializeRouter() {
    window.addEventListener('popstate', () => this.handleRoute());
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLAnchorElement;
      if (target.matches('[data-route]')) {
        e.preventDefault();
        this.navigateTo(target.pathname);
      }
    });
  }

  public registerRoute(path: string, handler: () => Promise<void>) {
    this.routes.set(path, handler);
  }

  public async navigateTo(path: string) {
    window.history.pushState({}, '', path);
    await this.handleRoute();
  }

  private async handleRoute() {
    const path = window.location.pathname;
    const handler = this.routes.get(path);
    
    if (handler) {
      await handler();
    } else {
      this.handle404();
    }
  }

  private handle404() {
    this.rootElement.innerHTML = '<h1>404 - Page Not Found</h1>';
  }
}
```

### 1.2 Configuración de Rutas con Lazy Loading

```typescript
// routes.ts
import { Router } from './router';

export const setupRoutes = (router: Router) => {
  router.registerRoute('/', async () => {
    const { HomeComponent } = await import('./pages/home');
    customElements.define('home-page', HomeComponent);
    document.querySelector('main').innerHTML = '<home-page></home-page>';
  });

  router.registerRoute('/users', async () => {
    const { UsersComponent } = await import('./pages/users');
    customElements.define('users-page', UsersComponent);
    document.querySelector('main').innerHTML = '<users-page></users-page>';
  });
};
```

## 2. Gestión de Estado Global

### 2.1 Store Reactivo

```typescript
type Subscriber<T> = (state: T) => void;

class Store<T> {
  private state: T;
  private subscribers: Set<Subscriber<T>>;

  constructor(initialState: T) {
    this.state = initialState;
    this.subscribers = new Set();
  }

  getState(): T {
    return this.state;
  }

  setState(newState: Partial<T>) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  subscribe(subscriber: Subscriber<T>) {
    this.subscribers.add(subscriber);
    return () => this.subscribers.delete(subscriber);
  }

  private notify() {
    this.subscribers.forEach(subscriber => subscriber(this.state));
  }
}
```

### 2.2 Implementación de Actions y Reducers

```typescript
// actions.ts
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export interface Action {
  type: string;
  payload?: any;
}

// reducers.ts
export function counterReducer(state: number, action: Action): number {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}

// store.ts
export class AppStore extends Store<{ counter: number }> {
  dispatch(action: Action) {
    const newState = {
      counter: counterReducer(this.getState().counter, action)
    };
    this.setState(newState);
  }
}
```

## 3. Capacidades PWA

### 3.1 Configuración del Service Worker

```typescript
// service-worker.ts
const CACHE_NAME = 'app-cache-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/main.js',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-512x512.png'
];

self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

### 3.2 Manifest.json

```json
{
  "name": "My Web Components App",
  "short_name": "WC App",
  "theme_color": "#2196f3",
  "background_color": "#ffffff",
  "display": "standalone",
  "orientation": "portrait",
  "scope": "/",
  "start_url": "/",
  "icons": [
    {
      "src": "assets/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 3.3 Registro del Service Worker

```typescript
// register-sw.ts
export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('ServiceWorker registered:', registration);
    } catch (error) {
      console.error('ServiceWorker registration failed:', error);
    }
  }
}
```

## 4. Optimización de Rendimiento

### 4.1 Code Splitting y Dynamic Imports

```typescript
// Configuración de Webpack en project.json
{
  "build": {
    "executor": "@nrwl/web:webpack",
    "options": {
      "optimization": true,
      "outputHashing": "all",
      "sourceMap": false,
      "extractCss": true,
      "namedChunks": false,
      "extractLicenses": true,
      "vendorChunk": true,
      "buildOptimizer": true
    }
  }
}
```

### 4.2 Optimización de Recursos

```typescript
// image-optimizer.ts
export class OptimizedImageComponent extends HTMLElement {
  connectedCallback() {
    this.setupLazyLoading();
  }

  private setupLazyLoading() {
    const images = this.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
}
```

### 4.3 Performance Monitoring

```typescript
// performance-monitor.ts
export class PerformanceMonitor {
  static measure(componentName: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      const originalMethod = descriptor.value;
      
      descriptor.value = function (...args: any[]) {
        const start = performance.now();
        const result = originalMethod.apply(this, args);
        const end = performance.now();
        
        console.log(`${componentName}.${propertyKey} took ${end - start}ms`);
        return result;
      };
      
      return descriptor;
    };
  }
}
```

## 5. Server-Side Rendering

### 5.1 Configuración del Servidor

```typescript
// server.ts
import express from 'express';
import { renderToString } from '@lit-labs/ssr';
import { html } from 'lit';

const app = express();

app.get('*', async (req, res) => {
  const template = html`
    <!DOCTYPE html>
    <html>
      <head>
        <title>SSR Web Components</title>
      </head>
      <body>
        <app-root></app-root>
        <script type="module" src="/client.js"></script>
      </body>
    </html>
  `;

  const rendered = await renderToString(template);
  res.send(rendered);
});
```

### 5.2 Hydratación del Cliente

```typescript
// client.ts
import { hydrate } from '@lit-labs/ssr-client';

window.addEventListener('DOMContentLoaded', () => {
  hydrate(document.body);
});
```

### 5.3 Componentes SSR-Ready

```typescript
// ssr-component.ts
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

export class SSRComponent extends LitElement {
  @property()
  data: any;

  static async getInitialProps(context: any) {
    // Fetch data on server
    return {
      data: await fetchSomeData()
    };
  }

  render() {
    return html`
      <div>
        <h1>Server Side Rendered Component</h1>
        <pre>${JSON.stringify(this.data, null, 2)}</pre>
      </div>
    `;
  }
}
```

## Conclusiones y Mejores Prácticas

1. **Routing**:
   - Implementar lazy loading para rutas
   - Manejar transiciones suaves
   - Gestionar el estado de la navegación

2. **Estado**:
   - Mantener un único source of truth
   - Implementar acciones inmutables
   - Usar patrones de observador para actualizaciones

3. **PWA**:
   - Asegurar que la app funcione offline
   - Implementar estrategias de caché efectivas
   - Proporcionar experiencia de instalación nativa

4. **Rendimiento**:
   - Monitorear métricas clave (FCP, LCP, TTI)
   - Implementar code splitting efectivo
   - Optimizar recursos y carga

5. **SSR**:
   - Balancear entre SSR y client-side rendering
   - Implementar hydratación eficiente
   - Manejar estado inicial correctamente

### Implementación Progresiva

Se recomienda implementar estas mejoras de forma progresiva:

1. Primero: Routing y Estado
2. Segundo: Optimizaciones de rendimiento
3. Tercero: Capacidades PWA
4. Cuarto: SSR (si es necesario)

Cada mejora debe ser probada y medida para asegurar que aporta valor real al proyecto.