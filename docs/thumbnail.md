# MindSet Design System - Thumbnail

Componente Thumbnail para representación visual compacta de AI apps, workspaces o colores.

## Descripción

El Thumbnail es una representación visual compacta utilizada para mostrar imágenes, iniciales o colores. Se usa principalmente para representar AI apps, nombres de workspaces o para selección de colores en color pickers.

## Variantes

### Por Tipo

| Tipo | Descripción | Uso |
|------|-------------|-----|
| **Initials** | Muestra iniciales del app/workspace | Cuando no hay imagen o se necesita referencia rápida |
| **Img** | Muestra una imagen | Cuando hay imagen asociada al AI app o workspace |
| **Color** | Muestra un color sólido | Color pickers, selección de colores |

### Por Tamaño

| Size | Dimensiones | Uso |
|------|-------------|-----|
| **L** | 40 x 40 px | Solo para Initials, destacados |
| **M** | 32 x 32 px | **Default**, listas, cards |
| **S** | 24 x 24 px | Espacios compactos |
| **XS** | 20 x 20 px | Espacios muy reducidos, color pickers |

## Diferencia con Avatar

| Aspecto | Avatar | Thumbnail |
|---------|--------|-----------|
| Forma | Circular (`--radius-rounded`) | Cuadrado redondeado (`--radius-s`) |
| Uso | Personas/usuarios | AI apps, workspaces, colores |
| Variante Color | No | Sí |

## Props del Componente

```typescript
interface ThumbnailProps {
  type?: 'initials' | 'img' | 'color';  // Default: 'initials'
  size?: 'l' | 'm' | 's' | 'xs';        // Default: 'm'
  initials?: string;                     // Para type='initials' (máx 2-3 chars)
  src?: string;                          // Para type='img'
  color?: string;                        // Para type='color' (hex o token)
  alt?: string;
  className?: string;
}
```

## Especificaciones de Diseño

### Contenedor

| Propiedad | Valor | Token |
|-----------|-------|-------|
| Border radius | 6px | `--radius-s` |
| Border | 1px solid | `--stroke-thin` |
| Border color | rgba(18,18,19,0.1) | `--color-stroke-alpha-subtle` |
| Background (initials) | #f6f6f7 | `--color-surface-layer` |

### Dimensiones por Tamaño

| Size | Width | Height |
|------|-------|--------|
| L | 40px | 40px |
| M | 32px | 32px |
| S | 24px | 24px |
| XS | 20px | 20px |

### Tipografía (Initials)

| Size | Font | Weight | Size | Line Height | Letter Spacing | Transform |
|------|------|--------|------|-------------|----------------|-----------|
| **L** | Inter | Semi Bold (600) | 16px | 1.2 | 0 | none |
| **M** | Inter | Medium (500) | 13px | 1.3 | 0.75px | uppercase |
| **S** | Inter | Medium (500) | 11px | 1.3 | 0.5px | uppercase |
| **XS** | Inter | Medium (500) | 11px | 1.3 | 0.5px | uppercase |

> Nota: M usa el token `uppercase/s`, S y XS usan `uppercase/xs`

## Implementación

### CSS

```css
.thumbnail {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-s);
  border: var(--stroke-thin) solid var(--color-stroke-alpha-subtle);
  overflow: hidden;
}

/* Sizes */
.thumbnail--l { width: 40px; height: 40px; }
.thumbnail--m { width: 32px; height: 32px; }
.thumbnail--s { width: 24px; height: 24px; }
.thumbnail--xs { width: 20px; height: 20px; }

/* Type: Initials */
.thumbnail--initials {
  background: var(--color-surface-layer);
}

.thumbnail__initials {
  font-family: var(--font-family-default);
  color: var(--color-content-primary);
  text-align: center;
}

/* Initials typography by size */
.thumbnail--l .thumbnail__initials {
  font-weight: 600;
  font-size: 16px;
  line-height: 1.2;
}

.thumbnail--m .thumbnail__initials {
  font-weight: 500;
  font-size: 13px;
  line-height: 1.3;
  letter-spacing: 0.75px;
  text-transform: uppercase;
}

.thumbnail--s .thumbnail__initials,
.thumbnail--xs .thumbnail__initials {
  font-weight: 500;
  font-size: 11px;
  line-height: 1.3;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

/* Type: Image */
.thumbnail__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Type: Color */
.thumbnail--color {
  /* Background set via inline style or prop */
}
```

### React Component

```tsx
interface ThumbnailProps {
  type?: 'initials' | 'img' | 'color';
  size?: 'l' | 'm' | 's' | 'xs';
  initials?: string;
  src?: string;
  color?: string;
  alt?: string;
  className?: string;
}

const Thumbnail = ({
  type = 'initials',
  size = 'm',
  initials,
  src,
  color,
  alt = '',
  className,
}: ThumbnailProps) => {
  const baseClass = 'thumbnail';
  const sizeClass = `thumbnail--${size}`;
  const typeClass = type === 'initials'
    ? 'thumbnail--initials'
    : type === 'color'
    ? 'thumbnail--color'
    : '';

  return (
    <div
      className={`${baseClass} ${sizeClass} ${typeClass} ${className || ''}`}
      style={type === 'color' ? { backgroundColor: color } : undefined}
    >
      {type === 'initials' && (
        <span className="thumbnail__initials">{initials}</span>
      )}
      {type === 'img' && (
        <img className="thumbnail__img" src={src} alt={alt} />
      )}
    </div>
  );
};
```

## Guía de Uso

### Por Contexto

| Contexto | Type | Size recomendado |
|----------|------|------------------|
| Lista de AI Apps | initials/img | M |
| Card de Workspace | initials/img | M o L |
| Dropdown item | initials/img | S |
| Color picker | color | XS o S |
| Sidebar navigation | initials/img | S |

### Colores para Color Thumbnail

Usar los colores base del design system:

```tsx
// Ejemplos de colores válidos
<Thumbnail type="color" color="var(--color-jade-400)" />
<Thumbnail type="color" color="var(--color-violet-400)" />
<Thumbnail type="color" color="var(--color-amber-400)" />
<Thumbnail type="color" color="#2dca8c" />
```

## Accesibilidad

- **Imágenes**: Incluir `alt` descriptivo
- **Iniciales**: Usar `aria-label` con nombre completo
- **Colores**: Usar `aria-label` con nombre del color

```tsx
// Thumbnail informativo
<Thumbnail
  type="initials"
  initials="AI"
  aria-label="AI Assistant App"
/>

// Color picker
<Thumbnail
  type="color"
  color="#2dca8c"
  aria-label="Jade green"
  role="option"
/>
```
