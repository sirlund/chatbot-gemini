# MindSet Design System - Banner

Componente Banner para mensajes de alerta y notificaciones a nivel de página o sección.

## Descripción

El Banner es un componente de alerta prominente usado para mostrar mensajes importantes al usuario. Se utiliza típicamente para comunicar información a nivel de sistema, estados, advertencias o errores que requieren atención del usuario.

## Variantes

### Por Tipo (Color)

| Tipo | Descripción | Uso |
|------|-------------|-----|
| **Accent** | Azul (accent color) | Información destacada, anuncios, features |
| **Subtle** | Fondo claro con texto oscuro | Información general, menos intrusivo |
| **Success** | Verde | Confirmaciones, acciones exitosas |
| **Warning** | Amarillo | Alertas, precauciones, cambios pendientes |
| **Error** | Rojo | Errores, problemas críticos |

### Por Alineación

| Align | Descripción | Uso |
|-------|-------------|-----|
| **Hug** | El contenedor se ajusta al contenido | Banners compactos, mensajes cortos |
| **Center** | Contenido centrado con max-width | Banners en contexto de contenido |
| **Fill** | Ancho completo del contenedor | Banners de página completa, headers |

## Props del Componente

```typescript
interface BannerProps {
  type?: 'accent' | 'subtle' | 'success' | 'warning' | 'error';  // Default: 'accent'
  align?: 'hug' | 'center' | 'fill';  // Default: 'hug'
  dismissable?: boolean;               // Default: true
  text: string;                        // Mensaje del banner
  icon?: ReactNode;                    // Icono leading (opcional, tiene default por type)
  onDismiss?: () => void;             // Callback al cerrar
  className?: string;
}
```

## Especificaciones de Diseño

### Contenedor

| Propiedad | Valor | Token |
|-----------|-------|-------|
| Min width | 64px | - |
| Max width | 480px (center), none (fill) | - |
| Padding horizontal | 12px | `--gap-s` |
| Padding vertical | 12px | `--gap-s` |
| Gap (icon-text) | 8px | `--gap-xs` |
| Border radius | 6px | `--radius-s` |

### Tipografía

| Propiedad | Valor | Token |
|-----------|-------|-------|
| Font family | Inter | `--font-family-default` |
| Font weight | Semi Bold (600) | - |
| Font size | 14px | UI-Label/S/Strong |
| Line height | 1.2 | - |

### Iconos

- Leading icon: Size S (20px) con stroke `--stroke-light` (1.25px)
- Dismiss icon: Size S (20px) con stroke `--stroke-light` (1.25px)

### Colores por Tipo

| Tipo | Background | Text Color | Icon Color |
|------|------------|------------|------------|
| **Accent** | `--color-azure-500` | `--color-base-white` | `--color-base-white` |
| **Subtle** | `--color-azure-100` | `--color-content-primary` | `--color-azure-600` |
| **Success** | `--color-jade-500` | `--color-base-white` | `--color-base-white` |
| **Warning** | `--color-amber-400` | `--color-content-primary` | `--color-content-primary` |
| **Error** | `--color-ruby-500` | `--color-base-white` | `--color-base-white` |

### Iconos por Defecto según Tipo

| Tipo | Icono Default |
|------|---------------|
| Accent | `info-circle` |
| Subtle | `info-circle` |
| Success | `circle-check` |
| Warning | `alert-triangle` |
| Error | `info-circle` |

## Anatomía

```
┌──────────────────────────────────────────────────────────┐
│  [Leading Icon]  Banner Message Text        [Dismiss X]  │
└──────────────────────────────────────────────────────────┘
```

1. **Banner Container** - Contenedor principal con background y padding
2. **Leading Icon** - Icono que indica el tipo de mensaje (size S)
3. **Banner Label** - Texto del mensaje
4. **Dismiss Icon** - Botón de cerrar opcional (size S)

## Implementación

### CSS

```css
.banner {
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
  padding: var(--gap-s);
  border-radius: var(--radius-s);
  min-width: 64px;
  font-family: var(--font-family-default);
  font-weight: 600;
  font-size: 14px;
  line-height: 1.2;
}

/* Alignment */
.banner--hug {
  width: fit-content;
}

.banner--center {
  max-width: 480px;
  margin: 0 auto;
}

.banner--fill {
  width: 100%;
}

/* Types */
.banner--accent {
  background: var(--color-azure-500);
  color: var(--color-base-white);
}

.banner--subtle {
  background: var(--color-azure-100);
  color: var(--color-content-primary);
}

.banner--success {
  background: var(--color-jade-500);
  color: var(--color-base-white);
}

.banner--warning {
  background: var(--color-amber-400);
  color: var(--color-content-primary);
}

.banner--error {
  background: var(--color-ruby-500);
  color: var(--color-base-white);
}

/* Content */
.banner__content {
  display: flex;
  align-items: flex-start;
  gap: var(--gap-xs);
  flex: 1;
  min-width: 0;
}

.banner__icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.banner__icon svg {
  width: 20px;
  height: 20px;
}

.banner__text {
  flex: 1;
  padding-top: 1px;
}

.banner__dismiss {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  color: inherit;
}

.banner__dismiss:hover {
  opacity: 0.8;
}
```

### React Component

```tsx
import { type ReactNode } from 'react';
import {
  IconInfoCircle,
  IconCircleCheck,
  IconAlertTriangle,
  IconX,
} from '@tabler/icons-react';

interface BannerProps {
  type?: 'accent' | 'subtle' | 'success' | 'warning' | 'error';
  align?: 'hug' | 'center' | 'fill';
  dismissable?: boolean;
  text: string;
  icon?: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

const defaultIcons = {
  accent: IconInfoCircle,
  subtle: IconInfoCircle,
  success: IconCircleCheck,
  warning: IconAlertTriangle,
  error: IconInfoCircle,
};

const Banner = ({
  type = 'accent',
  align = 'hug',
  dismissable = true,
  text,
  icon,
  onDismiss,
  className,
}: BannerProps) => {
  const DefaultIcon = defaultIcons[type];
  const iconSize = 20;
  const iconStroke = 1.25;

  return (
    <div
      className={`banner banner--${type} banner--${align} ${className || ''}`}
      role="alert"
    >
      <div className="banner__content">
        <span className="banner__icon">
          {icon || <DefaultIcon size={iconSize} stroke={iconStroke} />}
        </span>
        <span className="banner__text">{text}</span>
      </div>
      {dismissable && (
        <button
          className="banner__dismiss"
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          <IconX size={iconSize} stroke={iconStroke} />
        </button>
      )}
    </div>
  );
};
```

## Guía de Uso

### Por Contexto

| Contexto | Type | Align |
|----------|------|-------|
| Anuncio de feature | accent | fill |
| Información general | subtle | center |
| Acción completada | success | hug o center |
| Alerta de atención | warning | fill |
| Error de sistema | error | fill |
| Error en formulario | error | hug |
| Notificación inline | subtle | hug |

### Ejemplos de Uso

```tsx
// Banner de información (página completa)
<Banner
  type="accent"
  align="fill"
  text="New feature available! Try our enhanced AI capabilities."
/>

// Banner de éxito
<Banner
  type="success"
  align="center"
  text="Your changes have been saved successfully."
  onDismiss={() => setShowBanner(false)}
/>

// Banner de error (no dismissable)
<Banner
  type="error"
  align="fill"
  text="Connection lost. Please check your internet connection."
  dismissable={false}
/>

// Banner de warning
<Banner
  type="warning"
  text="Your session will expire in 5 minutes."
/>
```

## Accesibilidad

- Usar `role="alert"` para anuncios importantes
- El botón de dismiss debe tener `aria-label="Dismiss"` o equivalente
- Asegurar contraste suficiente entre texto y fondo
- Para mensajes críticos, considerar `aria-live="assertive"`
- Los banners no deben desaparecer automáticamente si contienen información importante

```tsx
// Banner con accesibilidad mejorada
<div
  role="alert"
  aria-live="polite"
  className="banner banner--warning"
>
  <span className="banner__icon" aria-hidden="true">
    <IconAlertTriangle size={20} stroke={1.25} />
  </span>
  <span className="banner__text">
    Unsaved changes will be lost.
  </span>
  <button
    className="banner__dismiss"
    onClick={onDismiss}
    aria-label="Dismiss warning"
  >
    <IconX size={20} stroke={1.25} />
  </button>
</div>
```

## Posicionamiento

| Posición | Uso |
|----------|-----|
| **Top of page** | Mensajes a nivel de sistema, anuncios globales |
| **Top of section** | Mensajes contextuales a una sección |
| **Inline (form)** | Errores de validación, confirmaciones |
| **Fixed top** | Alertas persistentes durante navegación |
