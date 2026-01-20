# MindSet Design System - Typography

Sistema tipográfico completo del MindSet Design System.

## Familias Tipográficas

| Familia | Uso |
|---------|-----|
| **Inter** | UI principal, headings, body, labels |
| **Fira Code** | Código, datos técnicos, monospace |

## Headings

Estilos para títulos y encabezados. Todos usan **Inter Semi Bold**.

| Token | Tamaño | Line Height | Uso |
|-------|--------|-------------|-----|
| `heading/h1` | 56px | 120% (1.2) | Hero headlines, títulos principales de landing |
| `heading/h2` | 32px | 120% (1.2) | Títulos de página |
| `heading/h3` | 24px | 120% (1.2) | Títulos de sección, encabezados de formularios |
| `heading/h4` | 18px | 130% (1.3) | Subtítulos de sección |
| `heading/h5` | 14px | 110% (1.1) | Títulos pequeños |
| `heading/h6` | 12px | 130% (1.3) | Taglines, etiquetas |

### Guía de uso de Headings
- **H1**: Solo para hero sections en landing pages
- **H2**: Un H2 por página como título principal
- **H3**: Títulos de secciones y formularios
- **H4**: Subsecciones dentro de H3
- **H5/H6**: Usar con moderación, preferir UI Labels para elementos pequeños

## Body

Estilos para texto de párrafo y contenido. Todos usan **Inter Regular**.

| Token | Tamaño | Line Height | Uso |
|-------|--------|-------------|-----|
| `body/l` | 18px | 150% (1.5) | Body en landing pages, usar con H3+ |
| `body/m` | 16px | 150% (1.5) | **Texto principal** (default), párrafos |
| `body/s` | 14px | 150% (1.5) | Texto secundario, descripciones |
| `body/xs` | 12px | 150% (1.5) | Notas pequeñas, captions |

### Guía de uso de Body
- **Body L**: Landing pages y contenido editorial con headings grandes
- **Body M**: Párrafos principales en toda la aplicación
- **Body S**: Texto secundario, helper text, descripciones
- **Body XS**: Timestamps, notas al pie, información auxiliar

## UI-Label

Estilos para elementos de interfaz: botones, inputs, labels, navegación.

### Regular (peso normal)

| Token | Tamaño | Line Height | Uso |
|-------|--------|-------------|-----|
| `ui-label/m/regular` | 16px | 120% (1.2) | Labels de formularios grandes |
| `ui-label/s/regular` | 14px | 120% (1.2) | Labels de formularios, tabs |
| `ui-label/xs/regular` | 12px | 120% (1.2) | Labels pequeños, badges |

### Strong (Semi Bold)

| Token | Tamaño | Line Height | Uso |
|-------|--------|-------------|-----|
| `ui-label/m/strong` | 16px | 120% (1.2) | Botones grandes, navegación principal |
| `ui-label/s/strong` | 14px | 120% (1.2) | **Botones default**, tabs activos |
| `ui-label/xs/strong` | 12px | 120% (1.2) | Badges, chips, etiquetas pequeñas |

### Guía de uso de UI-Label
- **Strong**: Elementos interactivos (botones, links, tabs activos)
- **Regular**: Labels de formularios, texto en inputs, tabs inactivos
- Preferir UI Labels sobre Headings H5/H6 para elementos de UI

## Uppercase

Estilos en mayúsculas para categorías, secciones y labels especiales. Usan **Inter Medium** con letter-spacing.

| Token | Tamaño | Line Height | Letter Spacing | Uso |
|-------|--------|-------------|----------------|-----|
| `uppercase/s` | 13px | 130% (1.3) | 0.75px | Categorías, secciones |
| `uppercase/xs` | 11px | 130% (1.3) | 0.5px | Labels pequeños en mayúsculas |

### Guía de uso de Uppercase
- Usar con moderación para evitar fatiga visual
- Ideal para: categorías, tags de estado, overlines
- No usar para párrafos o contenido extenso

## Code

Estilos monoespaciados para código y datos técnicos. Usan **Fira Code**.

| Token | Peso | Tamaño | Line Height | Uso |
|-------|------|--------|-------------|-----|
| `code/regular` | Regular (400) | 12px | 140% (1.4) | Código inline, snippets |
| `code/medium` | Medium (500) | 12px | 140% (1.4) | Código enfatizado, keywords |

### Guía de uso de Code
- **Regular**: Código general, variables, valores
- **Medium**: Palabras clave, resaltado de sintaxis
- Siempre con fondo diferenciado (`--color-surface-layer`)

## Link (hover)

Estilos para enlaces con estado hover. Usan **Inter Semi Bold** con underline.

| Token | Tamaño | Line Height | Uso |
|-------|--------|-------------|-----|
| `link/s` | 12px | 120% (1.2) | Links pequeños, footers |
| `link/m` | 14px | 120% (1.2) | **Links default** en párrafos |
| `link/l` | 16px | 120% (1.2) | Links destacados, navegación |

### Estados de Link
- **Default**: Color `--color-content-accent`, sin underline
- **Hover**: Color `--color-content-accent`, con underline
- **Visited**: Opcional, usar tono más oscuro del accent
- **Active**: Color `--color-accent-strong`

## Resumen de Pesos Tipográficos

| Peso | Valor | Uso |
|------|-------|-----|
| Regular | 400 | Body text, UI labels regulares |
| Medium | 500 | Uppercase, code enfatizado |
| Semi Bold | 600 | Headings, UI labels strong, links |

## Implementación CSS

```css
/* Headings */
.heading-h1 { font: 600 56px/1.2 'Inter', sans-serif; }
.heading-h2 { font: 600 32px/1.2 'Inter', sans-serif; }
.heading-h3 { font: 600 24px/1.2 'Inter', sans-serif; }
.heading-h4 { font: 600 18px/1.3 'Inter', sans-serif; }
.heading-h5 { font: 600 14px/1.1 'Inter', sans-serif; }
.heading-h6 { font: 600 12px/1.3 'Inter', sans-serif; }

/* Body */
.body-l { font: 400 18px/1.5 'Inter', sans-serif; }
.body-m { font: 400 16px/1.5 'Inter', sans-serif; }
.body-s { font: 400 14px/1.5 'Inter', sans-serif; }
.body-xs { font: 400 12px/1.5 'Inter', sans-serif; }

/* UI Labels */
.ui-label-m { font: 400 16px/1.2 'Inter', sans-serif; }
.ui-label-m-strong { font: 600 16px/1.2 'Inter', sans-serif; }
.ui-label-s { font: 400 14px/1.2 'Inter', sans-serif; }
.ui-label-s-strong { font: 600 14px/1.2 'Inter', sans-serif; }
.ui-label-xs { font: 400 12px/1.2 'Inter', sans-serif; }
.ui-label-xs-strong { font: 600 12px/1.2 'Inter', sans-serif; }

/* Uppercase */
.uppercase-s {
  font: 500 13px/1.3 'Inter', sans-serif;
  letter-spacing: 0.75px;
  text-transform: uppercase;
}
.uppercase-xs {
  font: 500 11px/1.3 'Inter', sans-serif;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

/* Code */
.code { font: 400 12px/1.4 'Fira Code', monospace; }
.code-medium { font: 500 12px/1.4 'Fira Code', monospace; }

/* Links */
.link-s { font: 600 12px/1.2 'Inter', sans-serif; }
.link-m { font: 600 14px/1.2 'Inter', sans-serif; }
.link-l { font: 600 16px/1.2 'Inter', sans-serif; }
.link:hover { text-decoration: underline; }
```
