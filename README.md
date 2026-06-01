# Sistema de Mantenimiento

Panel de control para monitorear el estado de mantenimiento de módulos industriales por línea.

## Tecnologías

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Context** para autenticación

## Estructura del proyecto

```
maintenance-app/
├── app/
│   ├── layout.tsx          # Root layout con fuentes y AuthProvider
│   ├── globals.css         # Estilos globales + Tailwind
│   ├── page.tsx            # Ruta raíz → Login o Dashboard
│   ├── dashboard/
│   │   └── page.tsx        # Dashboard con tarjetas de módulos
│   ├── form/
│   │   └── page.tsx        # Formulario Google embebido (solo admin)
│   └── profile/
│       └── page.tsx        # Perfil con permisos del usuario
├── components/
│   ├── layout/
│   │   ├── app-shell.tsx   # Shell con sidebar + área de contenido
│   │   ├── sidebar.tsx     # Navegación lateral
│   │   └── top-bar.tsx     # Barra superior con título y acciones
│   ├── dashboard/
│   │   ├── module-card.tsx       # Tarjeta de módulo (ok/due-soon/overdue)
│   │   ├── dashboard-summary.tsx # Estadísticas resumen
│   │   └── empty-state.tsx       # Estado vacío
│   └── ui/
│       ├── icons.tsx        # Iconos SVG
│       └── login-screen.tsx # Pantalla de inicio de sesión
├── hooks/
│   └── use-modules.ts      # Hook para fetch + enriquecimiento de datos
├── lib/
│   ├── maintenance.ts      # Lógica de estado de mantenimiento
│   ├── auth-context.tsx    # Contexto de autenticación
│   └── nav-config.ts       # Configuración de navegación
├── types/
│   └── index.ts            # Tipos TypeScript
├── .env.local              # Variables de entorno (¡no commitear!)
└── tailwind.config.ts
```

## Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Edita `.env.local`:

```env
# PIN del administrador
NEXT_PUBLIC_ADMIN_PIN=1234

# Endpoint de Google Apps Script
NEXT_PUBLIC_MODULES_ENDPOINT=https://script.google.com/macros/s/...

# URL del formulario de Google (modo embebido)
NEXT_PUBLIC_GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/TU_ID/viewform?embedded=true
```

### 3. Obtener la URL del formulario de Google

1. Abre tu Google Form
2. Haz clic en **Enviar** → ícono `<>`
3. Copia la URL del `src` del iframe
4. Pégala en `NEXT_PUBLIC_GOOGLE_FORM_URL`

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Lógica de estado de módulos

| Condición | Estado | Color |
|-----------|--------|-------|
| Días hasta próximo mantenimiento > frecuencia | ✅ Bien | Verde |
| 0 ≤ días hasta próximo ≤ frecuencia | ⚠ Requiere mantenimiento | Naranja |
| Días hasta próximo < 0 (fecha ya pasó) | ❌ Mantenimiento vencido | Rojo |

## Perfiles de usuario

| Funcionalidad | Visitante | Admin |
|---------------|-----------|-------|
| Dashboard     | ✅        | ✅    |
| Perfil        | ✅        | ✅    |
| Formulario    | ❌        | ✅    |

## Seguridad

> ⚠️ El PIN de admin en `NEXT_PUBLIC_` es visible en el bundle del cliente.
> Para producción, mueve la validación al servidor usando una API Route de Next.js.

## Build de producción

```bash
npm run build
npm start
```
