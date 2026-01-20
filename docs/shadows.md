# MindSet Design System - Shadows

Sistema de sombras para elementos elevados del MindSet Design System.

## Resumen

El sistema usa 3 niveles de sombra, cada uno compuesto por **2 capas**:
- Una sombra principal que da profundidad
- Una sombra ambiental sutil que suaviza los bordes

## Tokens de Sombra

### Shadow Small

Sombra sutil para elementos ligeramente elevados.

| Propiedad | Capa 1 (Principal) | Capa 2 (Ambiental) |
|-----------|-------------------|-------------------|
| Offset X | 0px | 0px |
| Offset Y | 2px | 0px |
| Blur | 4px | 4px |
| Spread | 0px | 0px |
| Color | rgba(0,0,0,0.15) | rgba(0,0,0,0.04) |

**Uso:** Botones hover, cards sutiles, elementos con poca elevación.

```css
--shadow-small: 0px 2px 4px rgba(0,0,0,0.15), 0px 0px 4px rgba(0,0,0,0.04);
```

### Shadow Medium

Sombra media para elementos flotantes y overlays.

| Propiedad | Capa 1 (Principal) | Capa 2 (Ambiental) |
|-----------|-------------------|-------------------|
| Offset X | 0px | 0px |
| Offset Y | 4px | 0px |
| Blur | 12px | 4px |
| Spread | 0px | 0px |
| Color | rgba(0,0,0,0.15) | rgba(0,0,0,0.04) |

**Uso:** Dropdowns, tooltips, popovers, toasts, menús contextuales.

```css
--shadow-medium: 0px 4px 12px rgba(0,0,0,0.15), 0px 0px 4px rgba(0,0,0,0.04);
```

### Shadow Large

Sombra pronunciada para elementos muy elevados.

| Propiedad | Capa 1 (Principal) | Capa 2 (Ambiental) |
|-----------|-------------------|-------------------|
| Offset X | 0px | 0px |
| Offset Y | 8px | 0px |
| Blur | 16px | 4px |
| Spread | 0px | 0px |
| Color | rgba(0,0,0,0.15) | rgba(0,0,0,0.04) |

**Uso:** Modales, dialogs, elementos con máxima elevación.

```css
--shadow-large: 0px 8px 16px rgba(0,0,0,0.15), 0px 0px 4px rgba(0,0,0,0.04);
```

## Guía de Uso

### Por Componente

| Componente | Shadow |
|------------|--------|
| Buttons (hover) | Small |
| Cards (hover) | Small |
| Dropdowns | Medium |
| Tooltips | Medium |
| Toasts | Medium |
| Context Menus | Medium |
| Popovers | Medium |
| Modals | Large |
| Dialogs | Large |

### Jerarquía Visual

```
┌─────────────────────────────────────┐
│  Large (modals, dialogs)            │  ← Máxima elevación
├─────────────────────────────────────┤
│  Medium (dropdowns, tooltips)       │  ← Elevación media
├─────────────────────────────────────┤
│  Small (cards hover, buttons)       │  ← Elevación sutil
├─────────────────────────────────────┤
│  None (contenido base)              │  ← Sin elevación
└─────────────────────────────────────┘
```

## Implementación CSS

```css
:root {
  /* Shadow Small */
  --shadow-small:
    0px 2px 4px rgba(0, 0, 0, 0.15),
    0px 0px 4px rgba(0, 0, 0, 0.04);

  /* Shadow Medium */
  --shadow-medium:
    0px 4px 12px rgba(0, 0, 0, 0.15),
    0px 0px 4px rgba(0, 0, 0, 0.04);

  /* Shadow Large */
  --shadow-large:
    0px 8px 16px rgba(0, 0, 0, 0.15),
    0px 0px 4px rgba(0, 0, 0, 0.04);
}

/* Uso */
.card:hover {
  box-shadow: var(--shadow-small);
}

.dropdown {
  box-shadow: var(--shadow-medium);
}

.modal {
  box-shadow: var(--shadow-large);
}
```

## Colores de Sombra

Las sombras usan negro con diferentes opacidades:

| Capa | Hex | RGBA | Opacidad |
|------|-----|------|----------|
| Principal | #00000026 | rgba(0,0,0,0.15) | 15% |
| Ambiental | #0000000A | rgba(0,0,0,0.04) | 4% |

## Notas de Diseño

- **Siempre usar ambas capas**: La combinación de sombra principal + ambiental crea un efecto más natural y realista.
- **Consistencia**: Usar el nivel de sombra apropiado según la elevación del elemento en la jerarquía visual.
- **Performance**: Las sombras con blur alto pueden afectar el rendimiento en animaciones. Considerar usar `will-change: box-shadow` si se anima.
- **Dark Mode**: En dark mode, las sombras pueden necesitar ajustes ya que son menos visibles sobre fondos oscuros.
