# MindSet Design System - Avatar

Componente Avatar para representación visual de usuarios o entidades.

## Descripción

El Avatar es una representación gráfica pequeña de un usuario o entidad, utilizada para identificar visualmente a individuos en la aplicación. Puede mostrar imágenes, iniciales o iconos.

## Variantes

### Por Tipo

| Tipo | Descripción | Uso |
|------|-------------|-----|
| **Initials** | Muestra las iniciales del usuario | Cuando no hay imagen disponible o no es necesaria |
| **Img** | Muestra la foto del usuario | Perfiles de usuario, listas de contactos |

### Por Tamaño

| Size | Dimensiones | Uso |
|------|-------------|-----|
| **S** | 24 x 24 px | Listas compactas, comentarios inline |
| **M** | 32 x 32 px | **Default**, listas, cards, headers |

## Props del Componente

```typescript
interface AvatarProps {
  type?: 'initials' | 'img';  // Default: 'initials'
  size?: 's' | 'm';           // Default: 'm'
  initials?: string;          // Requerido si type='initials' (máx 2 caracteres)
  src?: string;               // Requerido si type='img'
  alt?: string;               // Alt text para imágenes
  className?: string;
}
```

## Especificaciones de Diseño

### Contenedor

| Propiedad | Valor | Token |
|-----------|-------|-------|
| Border radius | 9999px (circular) | `--radius-rounded` |
| Border | 1px solid | `--stroke-thin` |
| Border color | rgba(18,18,19,0.1) | `--color-stroke-alpha-subtle` |
| Background (initials) | #f6f6f7 | `--color-surface-layer` |

### Tipografía (Initials)

| Propiedad | Valor | Token |
|-----------|-------|-------|
| Font family | Inter | `--font-family-default` |
| Font weight | Medium (500) | - |
| Font size | 13px | - |
| Line height | 130% (1.3) | - |
| Letter spacing | 0.75px | - |
| Text transform | uppercase | - |
| Color | #29292a | `--color-content-primary` |

### Imagen

| Propiedad | Valor |
|-----------|-------|
| Object fit | cover |
| Border radius | 9999px (circular) |

## Estados

| Estado | Descripción |
|--------|-------------|
| Default | Estado normal del avatar |
| Hover | Puede tener efecto de elevación sutil (opcional) |
| Loading | Skeleton o placeholder mientras carga la imagen |
| Error | Fallback a initials si la imagen falla |

## Guía de Uso

### Cuándo usar cada variante

**Image Avatar:**
- Usuario tiene foto de perfil configurada
- Listas de contactos con fotos
- Perfiles de usuario

**Initials Avatar:**
- Usuario no tiene foto
- Fallback cuando la imagen falla al cargar
- Representación rápida y ligera

### Generación de Iniciales

```typescript
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Ejemplos:
// "John Doe" → "JD"
// "María García López" → "ML"
// "Alice" → "AL"
```

## Implementación

### CSS

```css
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-rounded);
  border: var(--stroke-thin) solid var(--color-stroke-alpha-subtle);
  overflow: hidden;
}

.avatar--m {
  width: 32px;
  height: 32px;
}

.avatar--s {
  width: 24px;
  height: 24px;
}

.avatar--initials {
  background: var(--color-surface-layer);
}

.avatar__initials {
  font-family: var(--font-family-default);
  font-weight: 500;
  font-size: 13px;
  line-height: 1.3;
  letter-spacing: 0.75px;
  text-transform: uppercase;
  color: var(--color-content-primary);
}

.avatar__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### React Component

```tsx
interface AvatarProps {
  type?: 'initials' | 'img';
  size?: 's' | 'm';
  initials?: string;
  src?: string;
  alt?: string;
  className?: string;
}

const Avatar = ({
  type = 'initials',
  size = 'm',
  initials,
  src,
  alt = '',
  className,
}: AvatarProps) => {
  const sizeClasses = {
    s: 'avatar--s',
    m: 'avatar--m',
  };

  return (
    <div
      className={`avatar ${sizeClasses[size]} ${type === 'initials' ? 'avatar--initials' : ''} ${className || ''}`}
    >
      {type === 'initials' && (
        <span className="avatar__initials">{initials}</span>
      )}
      {type === 'img' && (
        <img className="avatar__img" src={src} alt={alt} />
      )}
    </div>
  );
};
```

## Accesibilidad

- **Imágenes**: Siempre incluir `alt` descriptivo
- **Iniciales**: El contenedor debe tener `role="img"` y `aria-label` con el nombre completo
- **Decorativo**: Si es puramente decorativo, usar `aria-hidden="true"`

```tsx
// Avatar informativo
<Avatar
  type="initials"
  initials="JD"
  role="img"
  aria-label="John Doe"
/>

// Avatar decorativo (junto a texto con el nombre)
<Avatar type="img" src={url} aria-hidden="true" />
<span>John Doe</span>
```

## Composición

El Avatar puede componerse con otros elementos:

### Avatar con Badge de Estado

```tsx
<div className="avatar-wrapper">
  <Avatar type="img" src={url} />
  <span className="avatar-status avatar-status--online" />
</div>
```

### Avatar Group (Stack)

```tsx
<div className="avatar-group">
  <Avatar type="img" src={url1} />
  <Avatar type="img" src={url2} />
  <Avatar type="initials" initials="+3" />
</div>
```
