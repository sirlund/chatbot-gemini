# MindSet Design System - Button

Componente Button para acciones e interacciones del usuario.

## Descripción

El Button es el componente principal para disparar acciones en la interfaz. Provee diferentes variantes visuales para establecer jerarquía y contexto, múltiples tamaños para adaptarse a diferentes contextos, y soporte para iconos leading y trailing.

## Variantes

### Por Tipo (Hierarchy)

| Tipo | Descripción | Uso |
|------|-------------|-----|
| **Primary** | Fondo oscuro (inverted), alta prominencia | Acción principal, CTA, submit |
| **Accent (Secondary)** | Fondo accent (azul), alta prominencia | Acciones secundarias destacadas |
| **Ghost (Outline)** | Borde visible, fondo transparente | Acciones secundarias, cancelar |
| **Text** | Sin fondo ni borde, solo texto | Acciones terciarias, links inline |

### Por Tamaño

| Size | Height | Uso |
|------|--------|-----|
| **Small** | 32px | Toolbars, tablas, espacios compactos |
| **Medium** | 40px | **Default**, formularios, cards |
| **Large** | 48px | CTAs destacados, hero sections |

### Por Estado

| Estado | Descripción |
|--------|-------------|
| **Default** | Estado normal, interactivo |
| **Hover** | Mouse sobre el botón |
| **Active** | Botón siendo presionado |
| **Focus** | Foco de teclado (outline visible) |
| **Disabled** | No interactivo, opacidad reducida |

## Props del Componente

```typescript
interface ButtonProps {
  variant?: 'primary' | 'accent' | 'ghost' | 'text';  // Default: 'primary'
  size?: 'small' | 'medium' | 'large';                 // Default: 'medium'
  disabled?: boolean;                                   // Default: false
  children: string;                                     // Label del botón
  leadingIcon?: ReactNode;                             // Icono izquierdo
  trailingIcon?: ReactNode;                            // Icono derecho (ej: chevron)
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';                // Default: 'button'
  className?: string;
}
```

## Especificaciones de Diseño

### Contenedor

| Propiedad | Valor | Token |
|-----------|-------|-------|
| Min width | 64px | - |
| Max width | 480px | - |
| Border radius | 6px | `--radius-s` |
| Gap (icon-label) | 4px | `--gap-2xs` |

### Dimensiones por Tamaño

| Size | Height | Padding X | Icon Size |
|------|--------|-----------|-----------|
| **Small** | 32px | 16px (`--gap-m`) | 20px (S) |
| **Medium** | 40px | 16px (`--gap-m`) | 20px (S) |
| **Large** | 48px | 20px (`--gap-l`) | 24px (M) |

### Tipografía

| Size | Token | Font | Weight | Size | Line Height |
|------|-------|------|--------|------|-------------|
| Small | UI-Label/S/Strong | Inter | Semi Bold (600) | 14px | 1.2 |
| Medium | UI-Label/S/Strong | Inter | Semi Bold (600) | 14px | 1.2 |
| Large | UI-Label/M/Strong | Inter | Semi Bold (600) | 16px | 1.2 |

### Colores por Variante

#### Primary
| Estado | Background | Text | Border |
|--------|------------|------|--------|
| Default | `--color-surface-background-inverted` | `--color-content-inverted` | none |
| Hover | `--color-gray-800` | `--color-content-inverted` | none |
| Active | `--color-gray-900` | `--color-content-inverted` | none |
| Disabled | `--color-gray-200` | `--color-content-disabled` | none |

#### Accent (Secondary)
| Estado | Background | Text | Border |
|--------|------------|------|--------|
| Default | `--color-azure-500` | `--color-base-white` | none |
| Hover | `--color-azure-600` | `--color-base-white` | none |
| Active | `--color-azure-700` | `--color-base-white` | none |
| Disabled | `--color-azure-200` | `--color-azure-400` | none |

#### Ghost (Outline)
| Estado | Background | Text | Border |
|--------|------------|------|--------|
| Default | transparent | `--color-azure-500` | `--color-azure-500` |
| Hover | `--color-azure-50` | `--color-azure-600` | `--color-azure-600` |
| Active | `--color-azure-100` | `--color-azure-700` | `--color-azure-700` |
| Disabled | transparent | `--color-gray-300` | `--color-gray-300` |

#### Text
| Estado | Background | Text | Border |
|--------|------------|------|--------|
| Default | transparent | `--color-azure-500` | none |
| Hover | `--color-azure-50` | `--color-azure-600` | none |
| Active | `--color-azure-100` | `--color-azure-700` | none |
| Disabled | transparent | `--color-gray-300` | none |

### Iconos

- Size Small/Medium: Icon S (20px) con stroke `--stroke-light` (1.25px)
- Size Large: Icon M (24px) con stroke `--stroke-medium` (1.5px)

## Anatomía

```
┌────────────────────────────────────────┐
│  [Leading Icon]  Button Label  [▼]     │
└────────────────────────────────────────┘
```

1. **Button Container** - Contenedor con background, padding y border-radius
2. **Leading Icon** - Icono opcional a la izquierda (size S)
3. **Button Label** - Texto del botón
4. **Action Icon** - Icono opcional a la derecha, ej: chevron-down (size S)

## Implementación

### CSS

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--gap-2xs);
  border-radius: var(--radius-s);
  font-family: var(--font-family-default);
  font-weight: 600;
  line-height: 1.2;
  cursor: pointer;
  border: none;
  transition: background-color 0.15s ease, border-color 0.15s ease;
  min-width: 64px;
  max-width: 480px;
}

/* Sizes */
.button--small {
  height: 32px;
  padding: 0 var(--gap-m);
  font-size: 14px;
}

.button--medium {
  height: 40px;
  padding: 0 var(--gap-m);
  font-size: 14px;
}

.button--large {
  height: 48px;
  padding: 0 var(--gap-l);
  font-size: 16px;
}

/* Primary */
.button--primary {
  background: var(--color-surface-background-inverted);
  color: var(--color-content-inverted);
}

.button--primary:hover {
  background: var(--color-gray-800);
}

.button--primary:active {
  background: var(--color-gray-900);
}

.button--primary:disabled {
  background: var(--color-gray-200);
  color: var(--color-content-disabled);
  cursor: not-allowed;
}

/* Accent */
.button--accent {
  background: var(--color-azure-500);
  color: var(--color-base-white);
}

.button--accent:hover {
  background: var(--color-azure-600);
}

.button--accent:active {
  background: var(--color-azure-700);
}

.button--accent:disabled {
  background: var(--color-azure-200);
  color: var(--color-azure-400);
  cursor: not-allowed;
}

/* Ghost */
.button--ghost {
  background: transparent;
  color: var(--color-azure-500);
  border: var(--stroke-thin) solid var(--color-azure-500);
}

.button--ghost:hover {
  background: var(--color-azure-50);
  color: var(--color-azure-600);
  border-color: var(--color-azure-600);
}

.button--ghost:active {
  background: var(--color-azure-100);
  color: var(--color-azure-700);
  border-color: var(--color-azure-700);
}

.button--ghost:disabled {
  color: var(--color-gray-300);
  border-color: var(--color-gray-300);
  cursor: not-allowed;
}

/* Text */
.button--text {
  background: transparent;
  color: var(--color-azure-500);
  padding-left: var(--gap-xs);
  padding-right: var(--gap-xs);
}

.button--text:hover {
  background: var(--color-azure-50);
  color: var(--color-azure-600);
}

.button--text:active {
  background: var(--color-azure-100);
  color: var(--color-azure-700);
}

.button--text:disabled {
  color: var(--color-gray-300);
  cursor: not-allowed;
}

/* Focus state (all variants) */
.button:focus-visible {
  outline: 2px solid var(--color-azure-500);
  outline-offset: 2px;
}

/* Icons */
.button__icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.button--small .button__icon svg,
.button--medium .button__icon svg {
  width: 20px;
  height: 20px;
}

.button--large .button__icon svg {
  width: 24px;
  height: 24px;
}
```

### React Component

```tsx
import { type ReactNode, type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'ghost' | 'text';
  size?: 'small' | 'medium' | 'large';
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children: ReactNode;
}

const Button = ({
  variant = 'primary',
  size = 'medium',
  leadingIcon,
  trailingIcon,
  children,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`button button--${variant} button--${size} ${className || ''}`}
      disabled={disabled}
      {...props}
    >
      {leadingIcon && <span className="button__icon">{leadingIcon}</span>}
      <span className="button__label">{children}</span>
      {trailingIcon && <span className="button__icon">{trailingIcon}</span>}
    </button>
  );
};
```

## Guía de Uso

### Jerarquía de Acciones

| Nivel | Variante | Ejemplo |
|-------|----------|---------|
| Principal | Primary | "Submit", "Save", "Continue" |
| Secundario destacado | Accent | "Publish", "Create", "Add" |
| Secundario | Ghost | "Cancel", "Back", "Edit" |
| Terciario | Text | "Learn more", "Skip", "View all" |

### Por Contexto

| Contexto | Variante | Size |
|----------|----------|------|
| Modal footer | Primary + Ghost | Medium |
| Form submit | Primary | Medium o Large |
| Card action | Accent o Ghost | Small |
| Toolbar | Ghost o Text | Small |
| Hero CTA | Primary o Accent | Large |
| Inline link | Text | Small |
| Dropdown trigger | Ghost + chevron | Medium |

### Ejemplos de Uso

```tsx
// Botón primario con icono
<Button variant="primary" leadingIcon={<IconSend />}>
  Send message
</Button>

// Botón accent
<Button variant="accent" leadingIcon={<IconLink />}>
  Publish
</Button>

// Botón ghost (outline)
<Button variant="ghost" leadingIcon={<IconPlus />}>
  Add file
</Button>

// Botón con dropdown
<Button variant="primary" trailingIcon={<IconChevronDown />}>
  Options
</Button>

// Botón de texto
<Button variant="text" trailingIcon={<IconArrowRight />}>
  Learn more
</Button>

// Botón deshabilitado
<Button variant="primary" disabled>
  Submit
</Button>
```

## Accesibilidad

- Usar elemento `<button>` nativo, no `<div>` o `<a>` para acciones
- El texto del botón debe ser descriptivo de la acción
- Mantener focus visible para navegación por teclado
- Usar `aria-disabled` junto con `disabled` para mejor compatibilidad
- Para icon-only buttons, agregar `aria-label` descriptivo

```tsx
// Botón con texto descriptivo
<Button variant="primary">Save changes</Button>

// Icon-only button (requiere aria-label)
<Button variant="ghost" aria-label="Close dialog">
  <IconX />
</Button>

// Botón de submit en formulario
<Button variant="primary" type="submit">
  Create account
</Button>
```

## Estados de Carga

Para estados de carga, reemplazar el contenido con un spinner:

```tsx
<Button variant="primary" disabled>
  <Spinner size="small" />
  <span>Saving...</span>
</Button>
```
