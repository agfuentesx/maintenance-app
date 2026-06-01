<<<<<<< HEAD
# Sistema de Mantenimiento

Panel de control para monitorear el estado de mantenimiento de módulos industriales por línea.

## Tecnologías

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Context** para autenticación

## Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)

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
