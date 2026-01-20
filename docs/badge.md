# MindSet Design System - Badge

Componente Badge para indicadores visuales de estado, atributos o contadores.

## Descripción

El Badge es un indicador visual pequeño usado para mostrar atributos, cualidades o estados de un elemento. Se puede agregar a cards, tablas o listas para proporcionar contexto adicional o información de un vistazo.

## Propósitos de Uso

- Resaltar el estado o condición de un ítem (ej: "New", "Pending")
- Indicar conteo de ítems (ej: notificaciones, mensajes)
- Mostrar atributos o cualidades (ej: "Premium", "Verified")

## Variantes

### Por Tipo

| Tipo | Descripción | Uso |
|------|-------------|-----|
| **Default** | Badge con icono opcional + label | Estados, atributos, etiquetas |
| **Counter** | Badge pill con número | Contadores, notificaciones |

### Por Variante de Color

| Variante | Descripción | Uso |
|----------|-------------|-----|
| **Subtle** | Gris neutro | Información general, estados neutros |
| **Accent** | Color accent (violeta/azul) | Destacados, nuevos, features |
| **Success** | Verde | Estados positivos, completado, activo |
| **Warning** | Amarillo | Alertas, pendientes, atención |
| **Error** | Rojo | Errores, eliminado, urgente |
| **Muted** | Gris claro | Información secundaria, deshabilitado |

## Props del Componente

```typescript
interface BadgeProps {
  type?: 'default' | 'counter';      // Default: 'default'
  variant?: 'subtle' | 'accent' | 'success' | 'warning' | 'error' | 'muted';
  label: string;                      // Texto del badge
  icon?: ReactNode;                   // Icono leading (solo para type='default')
  className?: string;
}
```

## Especificaciones de Diseño

### Contenedor Default

| Propiedad | Valor | Token |
|-----------|-------|-------|
| Border radius | 6px | `--radius-s` |
| Padding horizontal | 8px | `--gap-xs` |
| Padding vertical | 2px | `--gap-3xs` |
| Gap (icon-label) | 4px | `--gap-2xs` |

### Contenedor Counter (Pill)

| Propiedad | Valor | Token |
|-----------|-------|-------|
| Border radius | 9999px | `--radius-rounded` |
| Padding horizontal | 8px | `--gap-xs` |
| Padding vertical | 2px | `--gap-3xs` |
| Min width | 20px | - |

### Tipografía

| Tipo | Token | Font | Weight | Size | Line Height | Letter Spacing |
|------|-------|------|--------|------|-------------|----------------|
| Default | UI-Label/XS | Inter | Regular (400) | 12px | 1.3 | 0 |
| Counter | Uppercase/XS | Inter | Medium (500) | 11px | 1.3 | 0.5px |

### Colores por Variante

| Variante | Background | Text Color |
|----------|------------|------------|
| **Subtle** | `--color-surface-layer` | `--color-content-primary` |
| **Accent** | `--color-violet-100` | `--color-violet-700` |
| **Success** | `--color-jade-100` | `--color-jade-700` |
| **Warning** | `--color-amber-100` | `--color-amber-700` |
| **Error** | `--color-ruby-100` | `--color-ruby-700` |
| **Muted** | `--color-surface-subtle` | `--color-content-tertiary` |

### Iconos

- Tamaño: XS (16px) con stroke `--stroke-thin` (1px)
- Color: Hereda el color del texto del badge

## Anatomía

```
┌─────────────────────────────┐
│  [Icon]  Badge Label        │  ← Default
└─────────────────────────────┘

┌─────────┐
│   123   │  ← Counter (pill)
└─────────┘
```

1. **Badge Container** - Contenedor con background y border-radius
2. **Leading Icon** - Icono opcional (solo en Default)
3. **Badge Label** - Texto del badge

## Implementación

### CSS

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--gap-2xs);
  padding: var(--gap-3xs) var(--gap-xs);
  border-radius: var(--radius-s);
  font-family: var(--font-family-default);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.3;
}

/* Type: Counter */
.badge--counter {
  border-radius: var(--radius-rounded);
  min-width: 20px;
  justify-content: center;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

/* Variants */
.badge--subtle {
  background: var(--color-surface-layer);
  color: var(--color-content-primary);
}

.badge--accent {
  background: var(--color-violet-100);
  color: var(--color-violet-700);
}

.badge--success {
  background: var(--color-jade-100);
  color: var(--color-jade-700);
}

.badge--warning {
  background: var(--color-amber-100);
  color: var(--color-amber-700);
}

.badge--error {
  background: var(--color-ruby-100);
  color: var(--color-ruby-700);
}

.badge--muted {
  background: var(--color-surface-subtle);
  color: var(--color-content-tertiary);
}

/* Icon */
.badge__icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.badge__icon svg {
  width: 16px;
  height: 16px;
}
```

### React Component

```tsx
import { type ReactNode } from 'react';

interface BadgeProps {
  type?: 'default' | 'counter';
  variant?: 'subtle' | 'accent' | 'success' | 'warning' | 'error' | 'muted';
  label: string;
  icon?: ReactNode;
  className?: string;
}

const Badge = ({
  type = 'default',
  variant = 'subtle',
  label,
  icon,
  className,
}: BadgeProps) => {
  const baseClass = 'badge';
  const typeClass = type === 'counter' ? 'badge--counter' : '';
  const variantClass = `badge--${variant}`;

  return (
    <span className={`${baseClass} ${typeClass} ${variantClass} ${className || ''}`}>
      {type === 'default' && icon && (
        <span className="badge__icon">{icon}</span>
      )}
      <span className="badge__label">{label}</span>
    </span>
  );
};
```

## Guía de Uso

### Por Contexto

| Contexto | Type | Variant recomendada |
|----------|------|---------------------|
| Nuevo contenido | default | accent |
| Estado completado | default | success |
| Alerta/Pendiente | default | warning |
| Error/Eliminado | default | error |
| Info secundaria | default | muted |
| Notificaciones | counter | error o accent |
| Contadores | counter | subtle |

### Ejemplos de Uso

```tsx
// Badge de estado
<Badge variant="success" label="Active" icon={<IconCheck />} />

// Badge de notificación
<Badge type="counter" variant="error" label="5" />

// Badge informativo
<Badge variant="accent" label="New" />

// Badge neutro
<Badge variant="subtle" label="Draft" />
```

## Accesibilidad

- Usar colores con suficiente contraste
- No depender solo del color para comunicar significado
- Para badges informativos, considerar agregar `aria-label` descriptivo
- Para counters de notificación, usar `aria-live="polite"` si el valor cambia dinámicamente

```tsx
// Badge informativo
<Badge
  variant="error"
  label="3 errors"
  aria-label="3 validation errors found"
/>

// Counter con actualización dinámica
<span aria-live="polite">
  <Badge type="counter" variant="error" label={notificationCount.toString()} />
</span>
```
