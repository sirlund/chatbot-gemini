# MindSet Design System - Icons

Sistema de iconografía del MindSet Design System basado en Tabler Icons.

## Fuente

**Tabler Icons** (outline style)
- Website: https://tabler.io/icons
- Estilo: Outline (no filled)
- Licencia: MIT

## Tamaños y Strokes

El sistema define 4 tamaños de iconos. Cada tamaño usa un token de stroke existente del design system para mantener consistencia.

| Size | Dimensiones | Stroke Token | Valor | Uso |
|------|-------------|--------------|-------|-----|
| **XS** | 16 x 16 px | `--stroke-thin` | 1px | Inline con texto pequeño, badges, indicadores |
| **S** | 20 x 20 px | `--stroke-light` | 1.25px | Botones pequeños, inputs, listas |
| **M** | 24 x 24 px | `--stroke-medium` | 1.5px | **Tamaño default**, botones, navegación |
| **L** | 32 x 32 px | `--stroke-large` | 2px | Headers, empty states, destacados |

## Props del Componente

```typescript
interface IconProps {
  name: string;           // Nombre del icono (ej: "add", "settings", "user")
  size?: 'xs' | 's' | 'm' | 'l';  // Default: 'm'
  color?: string;         // Default: currentColor
  className?: string;     // Clases adicionales
}
```

## Naming Convention

Los nombres de iconos siguen el formato de Tabler Icons en **kebab-case**:

| Icono | Nombre |
|-------|--------|
| + | `add` |
| ⊕ | `add-circle` |
| ⚙ | `settings` |
| 👤 | `user` |
| 🏠 | `home` |
| ✓ | `check` |
| ✕ | `x` |
| ⚠ | `alert-triangle` |
| ℹ | `info-circle` |
| ↓ | `arrow-down` |
| → | `arrow-right` |
| ⋯ | `dots` |
| ⋮ | `dots-vertical` |

### Patrones de Naming

| Patrón | Ejemplo | Descripción |
|--------|---------|-------------|
| `{nombre}` | `user`, `home` | Icono base |
| `{nombre}-{variante}` | `user-plus`, `home-edit` | Variante con acción |
| `{nombre}-{forma}` | `add-circle`, `check-square` | Con forma contenedora |
| `arrow-{dirección}` | `arrow-up`, `arrow-left` | Flechas direccionales |
| `chevron-{dirección}` | `chevron-down`, `chevron-right` | Chevrons |

## Guía de Uso por Contexto

### Por Componente

| Componente | Size | Ejemplo |
|------------|------|---------|
| Botón Small | S (20px) | Icono + texto en botón pequeño |
| Botón Default | M (24px) | Icono + texto en botón normal |
| Botón Large | M (24px) | Icono + texto en botón grande |
| Botón Icon-only | M (24px) | Solo icono, sin texto |
| Input (leading/trailing) | S (20px) | Icono en inputs |
| Dropdown item | S (20px) | Icono en items de menú |
| Tab | M (24px) | Icono en tabs |
| Navigation | M (24px) | Icono en sidebar/navbar |
| Badge | XS (16px) | Icono en badges pequeños |
| Toast/Alert | M (24px) | Icono de estado |
| Empty State | L (32px) | Icono destacado |

### Por Tamaño de Texto

| Font Size | Icon Size |
|-----------|-----------|
| 12px (XS) | XS (16px) |
| 14px (S) | S (20px) |
| 16px (M) | M (24px) |
| 18px+ | L (32px) |

## Implementación

### CSS Variables

```css
:root {
  /* Tamaños de iconos */
  --icon-size-xs: 16px;
  --icon-size-s: 20px;
  --icon-size-m: 24px;
  --icon-size-l: 32px;

  /* Strokes - reutilizar tokens existentes */
  /* --stroke-thin: 1px     → para icon-size-xs */
  /* --stroke-light: 1.25px → para icon-size-s */
  /* --stroke-medium: 1.5px → para icon-size-m */
  /* --stroke-large: 2px    → para icon-size-l */
}
```

### React Component Example

```tsx
import { IconPlus, IconSettings, IconUser } from '@tabler/icons-react';

// Mapeo de tamaños a strokes (usando valores de --stroke-* tokens)
const iconConfig = {
  xs: { size: 16, stroke: 1 },      // --stroke-thin
  s:  { size: 20, stroke: 1.25 },   // --stroke-light
  m:  { size: 24, stroke: 1.5 },    // --stroke-medium
  l:  { size: 32, stroke: 2 },      // --stroke-large
};

// Uso
<IconPlus size={iconConfig.m.size} stroke={iconConfig.m.stroke} />
<IconSettings size={iconConfig.s.size} stroke={iconConfig.s.stroke} />
<IconUser size={iconConfig.l.size} stroke={iconConfig.l.stroke} />
```

### Wrapper Component

```tsx
import { type ComponentType } from 'react';

// Mapeo usando los mismos valores que --stroke-* tokens
const iconConfig = {
  xs: { size: 16, stroke: 1 },      // --stroke-thin
  s:  { size: 20, stroke: 1.25 },   // --stroke-light
  m:  { size: 24, stroke: 1.5 },    // --stroke-medium
  l:  { size: 32, stroke: 2 },      // --stroke-large
} as const;

type IconSize = keyof typeof iconConfig;

interface IconProps {
  icon: ComponentType<{ size: number; stroke: number; color?: string; className?: string }>;
  size?: IconSize;
  color?: string;
  className?: string;
}

const Icon = ({ icon: IconComponent, size = 'm', color, className }: IconProps) => {
  const config = iconConfig[size];
  return (
    <IconComponent
      size={config.size}
      stroke={config.stroke}
      color={color}
      className={className}
    />
  );
};

// Uso
<Icon icon={IconPlus} size="m" />
<Icon icon={IconSettings} size="s" color="var(--color-icon-secondary)" />
```

## Colores de Iconos

Usar los tokens semánticos de color:

| Token | Uso |
|-------|-----|
| `--color-icon-primary` | Iconos principales |
| `--color-icon-secondary` | Iconos secundarios |
| `--color-icon-disabled` | Iconos deshabilitados |
| `--color-icon-inverted` | Sobre fondos oscuros |
| `--color-icon-accent` | Iconos de acción/accent |
| `--color-icon-error` | Iconos de error |
| `--color-icon-success` | Iconos de éxito |
| `--color-icon-warning` | Iconos de advertencia |

## Notas de Diseño

- **Consistencia**: Siempre usar el stroke correspondiente al tamaño. No mezclar.
- **Alineación**: Los iconos están diseñados para alinearse con texto usando `vertical-align: middle` o flexbox.
- **Espaciado**: Dejar `--gap-2xs` (4px) entre icono y texto adyacente.
- **Accesibilidad**: Agregar `aria-hidden="true"` si el icono es decorativo, o `aria-label` si es informativo.
- **No escalar**: Usar siempre los tamaños predefinidos. No escalar iconos arbitrariamente.
