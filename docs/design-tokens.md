# MindSet Design System - Design Tokens

Documentación completa de los tokens de diseño del MindSet Design System.

## Escala Base (Primitives)

La escala base define los valores primitivos usados para construir todos los demás tokens.

| Token | Valor | Uso común |
|-------|-------|-----------|
| `--scale-0` | 0px | Sin espaciado |
| `--scale-12-5` | 1px | Bordes finos |
| `--scale-25` | 2px | Espaciado mínimo |
| `--scale-50` | 4px | Espaciado muy pequeño |
| `--scale-75` | 6px | Radius pequeño |
| `--scale-100` | 8px | Espaciado pequeño, radius medio |
| `--scale-150` | 12px | Espaciado pequeño-medio |
| `--scale-175` | 14px | Font size small |
| `--scale-200` | 16px | Font size medium, espaciado medio |
| `--scale-250` | 20px | Font size large |
| `--scale-300` | 24px | Font size XL, espaciado grande |
| `--scale-400` | 32px | Espaciado muy grande |
| `--scale-500` | 40px | Altura de botones |
| `--scale-600` | 48px | Altura de inputs grandes |
| `--scale-700` | 56px | Componentes destacados |
| `--scale-800` | 64px | Headers |
| `--scale-900` | 72px | Elementos hero |
| `--scale-1000` | 80px | Espaciado de secciones |
| `--scale-2000` | 160px | Ilustraciones |
| `--scale-2500` | 200px | Ilustraciones grandes |

## Tipografía

### Familias tipográficas

| Token | Valor | Uso |
|-------|-------|-----|
| `--font-family-default` | 'Inter', system-ui, sans-serif | Toda la UI |
| `--font-family-mono` | 'Fira Code', monospace | Código, datos técnicos |

### Tamaños de fuente

| Token | Valor | Uso |
|-------|-------|-----|
| `--font-size-xs` | 12px | Captions, notas, labels pequeños |
| `--font-size-s` | 14px | Texto secundario, body small |
| `--font-size-m` | 16px | Body principal, labels |
| `--font-size-l` | 20px | Subtítulos |
| `--font-size-xl` | 24px | Títulos de sección |

### Guía de uso tipográfico
- **Headings**: Usa `--font-size-xl` (24px) para títulos de sección, `--font-size-l` (20px) para subtítulos
- **Body text**: Usa `--font-size-m` (16px) para párrafos principales, `--font-size-s` (14px) para texto secundario
- **Labels y captions**: Usa `--font-size-xs` (12px) para notas pequeñas, badges, timestamps
- **Código**: Siempre usa `--font-family-mono` con cualquier tamaño

## Iconos

Basado en **Tabler Icons** (outline style). Ver [icons.md](./icons.md) para guía completa.

### Tamaños de iconos

| Token | Valor | Stroke Token | Uso |
|-------|-------|--------------|-----|
| `--icon-size-xs` | 16px | `--stroke-thin` (1px) | Badges, indicadores, inline con texto XS |
| `--icon-size-s` | 20px | `--stroke-light` (1.25px) | Inputs, botones pequeños, listas |
| `--icon-size-m` | 24px | `--stroke-medium` (1.5px) | **Default**, botones, navegación |
| `--icon-size-l` | 32px | `--stroke-large` (2px) | Headers, empty states, destacados |

### Guía de uso de iconos
- **Siempre** usar el stroke correspondiente al tamaño (ver tabla arriba)
- **Alinear** con texto usando flexbox o `vertical-align: middle`
- **Espaciado**: `--gap-2xs` (4px) entre icono y texto

## Espaciado (Gap)

Sistema de espaciado para márgenes, padding y gaps entre elementos.

| Token | Valor | Uso |
|-------|-------|-----|
| `--gap-none` | 0px | Sin espaciado |
| `--gap-3xs` | 2px | Entre elementos muy pequeños (icono + badge) |
| `--gap-2xs` | 4px | Dentro de badges, entre icono y texto |
| `--gap-xs` | 8px | Padding interno de botones pequeños |
| `--gap-s` | 12px | Padding interno de botones, entre elementos de lista |
| `--gap-m` | 16px | Padding de cards, entre párrafos |
| `--gap-l` | 20px | Entre grupos de elementos |
| `--gap-xl` | 24px | Entre secciones pequeñas |
| `--gap-2xl` | 32px | Entre secciones |
| `--gap-3xl` | 40px | Entre secciones mayores |
| `--gap-4xl` | 48px | Espaciado de página |
| `--gap-5xl` | 56px | Espaciado grande de página |
| `--gap-6xl` | 64px | Espaciado de hero sections |
| `--gap-7xl` | 80px | Espaciado máximo |

### Guía de uso de espaciado
- **Dentro de componentes**: `--gap-xs` (8px) a `--gap-s` (12px)
- **Entre componentes relacionados**: `--gap-m` (16px) a `--gap-l` (20px)
- **Entre secciones**: `--gap-xl` (24px) a `--gap-2xl` (32px)
- **Márgenes de página**: `--gap-3xl` (40px) o más

## Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-none` | 0px | Elementos cuadrados, tablas |
| `--radius-xs` | 4px | Badges pequeños |
| `--radius-s` | 6px | Botones pequeños, inputs pequeños |
| `--radius-m` | 8px | Botones, inputs, cards pequeñas |
| `--radius-l` | 12px | Cards, modals |
| `--radius-xl` | 16px | Cards grandes, containers |
| `--radius-rounded` | 9999px | Pills, avatars circulares, tags |

### Guía de uso de radius
- **Botones**: `--radius-m` (8px) para default, `--radius-s` (6px) para small
- **Inputs**: `--radius-m` (8px)
- **Cards**: `--radius-l` (12px) o `--radius-xl` (16px)
- **Badges/Tags**: `--radius-rounded` para pills
- **Avatars**: `--radius-rounded` para circulares

## Stroke Width (Bordes)

| Token | Valor | Uso |
|-------|-------|-----|
| `--stroke-none` | 0px | Sin borde |
| `--stroke-thin` | 1px | Bordes sutiles, divisores |
| `--stroke-light` | 1.25px | Bordes ligeros |
| `--stroke-medium` | 1.5px | Bordes de inputs, cards |
| `--stroke-large` | 2px | Bordes enfatizados, focus states |

## Container Max Widths (Breakpoints)

| Token | Valor | Dispositivo |
|-------|-------|-------------|
| `--max-width-mobile` | 480px | Móviles |
| `--max-width-tablet-portrait` | 768px | Tablets vertical |
| `--max-width-tablet-landscape` | 1024px | Tablets horizontal |
| `--max-width-desktop` | 1440px | Desktop estándar |
| `--max-width-desktop-lg` | 1600px | Desktop grande |
| `--max-width-desktop-xl` | 1980px | Desktop extra grande |

## Sombras

Sistema de elevación con 3 niveles. Ver [shadows.md](./shadows.md) para guía completa.

| Token | Valor | Uso |
|-------|-------|-----|
| `--shadow-small` | 0 2px 4px rgba(0,0,0,0.15), 0 0 4px rgba(0,0,0,0.04) | Cards hover, botones |
| `--shadow-medium` | 0 4px 12px rgba(0,0,0,0.15), 0 0 4px rgba(0,0,0,0.04) | Dropdowns, tooltips, toasts |
| `--shadow-large` | 0 8px 16px rgba(0,0,0,0.15), 0 0 4px rgba(0,0,0,0.04) | Modales, dialogs |

### Guía de uso de sombras
- **Small**: Elevación sutil (hover states, cards interactivas)
- **Medium**: Elementos flotantes (menús, popovers, tooltips)
- **Large**: Máxima elevación (modales, dialogs)

## Colores Base

### Colores fundamentales

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-base-black` | rgb(18, 18, 19) | Negro del sistema, texto principal |
| `--color-base-white` | rgb(254, 254, 255) | Blanco del sistema, fondos |

### Escala de Grises

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-grey-100` | rgb(246, 246, 247) | Fondos sutiles, layers |
| `--color-grey-200` | rgb(234, 234, 234) | Bordes sutiles, divisores |
| `--color-grey-300` | rgb(204, 204, 205) | Bordes medios |
| `--color-grey-400` | rgb(153, 153, 154) | Texto disabled, placeholders |
| `--color-grey-500` | rgb(109, 109, 110) | Texto secundario |
| `--color-grey-600` | rgb(63, 63, 70) | Texto en dark mode |
| `--color-grey-700` | rgb(41, 41, 42) | Texto principal |

### Escala de Azules (Accent)

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-blue-100` | rgb(232, 243, 255) | Fondos de badges, highlights |
| `--color-blue-200` | rgb(180, 211, 255) | Hover states suaves |
| `--color-blue-300` | rgb(76, 150, 255) | Iconos accent |
| `--color-blue-400` | rgb(0, 105, 255) | **Color accent principal**, botones, links |
| `--color-blue-500` | rgb(0, 75, 183) | Hover de botones |
| `--color-blue-600` | rgb(0, 46, 111) | Active states |
| `--color-blue-700` | rgb(0, 31, 75) | Dark mode backgrounds |

### Escala de Rojos (Error/Negative)

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-red-100` | rgb(255, 243, 241) | Fondos de alertas de error |
| `--color-red-200` | rgb(254, 209, 201) | Bordes de error suaves |
| `--color-red-300` | rgb(237, 115, 99) | Iconos de error |
| `--color-red-400` | rgb(205, 73, 55) | **Error principal**, texto de error |
| `--color-red-500` | rgb(189, 54, 36) | Error hover |
| `--color-red-600` | rgb(168, 32, 13) | Error crítico |
| `--color-red-700` | rgb(128, 20, 5) | Dark mode error background |

### Escala de Verdes (Success/Positive)

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-green-100` | rgb(240, 254, 241) | Fondos de mensajes de éxito |
| `--color-green-200` | rgb(204, 238, 206) | Bordes de éxito |
| `--color-green-300` | rgb(104, 178, 111) | Iconos de éxito |
| `--color-green-400` | rgb(52, 134, 60) | **Success principal**, checkmarks |
| `--color-green-500` | rgb(18, 121, 29) | Success hover |
| `--color-green-600` | rgb(8, 93, 17) | Success strong |
| `--color-green-700` | rgb(3, 65, 10) | Dark mode success background |

### Escala de Amarillos (Warning)

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-yellow-100` | rgb(255, 249, 227) | Fondos de advertencias |
| `--color-yellow-200` | rgb(253, 239, 190) | Bordes de warning |
| `--color-yellow-300` | rgb(245, 218, 117) | Iconos de warning |
| `--color-yellow-400` | rgb(237, 200, 67) | **Warning principal** |
| `--color-yellow-500` | rgb(177, 142, 14) | Warning strong |
| `--color-yellow-600` | rgb(129, 101, 0) | Warning hover |
| `--color-yellow-700` | rgb(87, 68, 0) | Dark mode warning background |

### Escala de Rosas (Pink)

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-pink-100` | rgb(252, 228, 236) | Fondos decorativos |
| `--color-pink-200` | rgb(246, 179, 200) | Bordes decorativos |
| `--color-pink-300` | rgb(241, 130, 165) | Iconos |
| `--color-pink-400` | rgb(235, 81, 129) | **Pink principal** |
| `--color-pink-500` | rgb(169, 58, 93) | Pink strong |
| `--color-pink-600` | rgb(102, 35, 56) | Pink dark |
| `--color-pink-700` | rgb(69, 24, 38) | Dark mode pink background |

### Escala de Jade

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-jade-100` | rgb(223, 247, 237) | Fondos |
| `--color-jade-200` | rgb(164, 232, 205) | Bordes |
| `--color-jade-300` | rgb(104, 217, 172) | Iconos |
| `--color-jade-400` | rgb(45, 202, 140) | **Jade principal**, actions en build system |
| `--color-jade-500` | rgb(32, 145, 100) | Jade strong |
| `--color-jade-600` | rgb(20, 88, 61) | Jade dark |
| `--color-jade-700` | rgb(13, 59, 41) | Dark mode jade background |

### Escala de Violetas

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-violet-100` | rgb(235, 230, 246) | Fondos |
| `--color-violet-200` | rgb(197, 183, 228) | Bordes |
| `--color-violet-300` | rgb(160, 136, 211) | Iconos |
| `--color-violet-400` | rgb(122, 89, 194) | **Violet principal**, data en build system |
| `--color-violet-500` | rgb(88, 64, 139) | Violet strong |
| `--color-violet-600` | rgb(53, 39, 84) | Violet dark |
| `--color-violet-700` | rgb(36, 26, 57) | Dark mode violet background |

### Escala de Amber

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-amber-100` | rgb(251, 239, 225) | Fondos |
| `--color-amber-200` | rgb(243, 210, 170) | Bordes |
| `--color-amber-300` | rgb(236, 181, 114) | Iconos |
| `--color-amber-400` | rgb(228, 152, 59) | **Amber principal**, functions en build system |
| `--color-amber-500` | rgb(164, 109, 42) | Amber strong |
| `--color-amber-600` | rgb(99, 66, 26) | Amber dark |
| `--color-amber-700` | rgb(67, 45, 17) | Dark mode amber background |

### Escala de Teal

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-teal-100` | rgb(227, 239, 243) | Fondos |
| `--color-teal-200` | rgb(177, 210, 220) | Bordes |
| `--color-teal-300` | rgb(126, 180, 197) | Iconos |
| `--color-teal-400` | rgb(75, 151, 174) | **Teal principal**, inputs en build system |
| `--color-teal-500` | rgb(54, 108, 125) | Teal strong |
| `--color-teal-600` | rgb(33, 66, 76) | Teal dark |
| `--color-teal-700` | rgb(22, 44, 51) | Dark mode teal background |

### Colores con transparencia (Alpha)

#### Negros con alpha
| Token | Opacidad | Uso |
|-------|----------|-----|
| `--color-alpha-black-100` | 10% | Bordes muy sutiles |
| `--color-alpha-black-200` | 20% | Bordes sutiles |
| `--color-alpha-black-300` | 25% | Bordes medios |
| `--color-alpha-black-400` | 40% | Overlays suaves |
| `--color-alpha-black-500` | 50% | Overlays medios |
| `--color-alpha-black-600` | 60% | Overlays |
| `--color-alpha-black-700` | 70% | Overlays fuertes |
| `--color-alpha-black-800` | 85% | Fondos semi-opacos |

#### Blancos con alpha
| Token | Opacidad | Uso |
|-------|----------|-----|
| `--color-alpha-white-100` | 20% | Bordes en dark mode |
| `--color-alpha-white-200` | 30% | Bordes sutiles en dark |
| `--color-alpha-white-300` | 40% | Bordes medios en dark |
| `--color-alpha-white-400` | 50% | Overlays en dark |
| `--color-alpha-white-500` | 60% | Inputs en dark mode |
| `--color-alpha-white-600` | 70% | Overlays fuertes en dark |
| `--color-alpha-white-700` | 80% | Casi opaco |
| `--color-alpha-white-800` | 90% | Muy opaco |

## Tokens Semánticos

Estos tokens mapean los colores base a usos específicos en la UI.

### Colores de Acento

| Token | Valor Light | Uso |
|-------|-------------|-----|
| `--color-accent-default` | blue-400 | Botones primarios, enlaces, CTAs |
| `--color-accent-subtle` | blue-300 | Iconos de acento, hover suave |
| `--color-accent-strong` | blue-600 | Pressed states |
| `--color-accent-lighter` | blue-100 | Fondos de badges |
| `--color-accent-light` | blue-200 | Bordes de elementos activos |

### Colores de Superficie

| Token | Valor Light | Uso |
|-------|-------------|-----|
| `--color-surface-background` | white | Fondo principal de la app |
| `--color-surface-background-inverted` | black | Fondo oscuro (headers, footers) |
| `--color-surface-layer` | grey-100 | Cards, modals, popovers |
| `--color-surface-layer-strong` | grey-200 | Capas con más contraste |
| `--color-surface-layer-stronger` | grey-300 | Capas muy contrastadas |
| `--color-surface-elevated` | white | Dropdowns, tooltips |
| `--color-surface-input` | white 50% | Fondo de inputs |
| `--color-surface-accent` | blue-400 | Fondos de botones primarios |

### Colores de Contenido (Texto)

| Token | Valor Light | Uso |
|-------|-------------|-----|
| `--color-content-heading` | black | Títulos principales |
| `--color-content-primary` | grey-700 | Texto principal, párrafos |
| `--color-content-secondary` | grey-500 | Texto secundario, descripciones |
| `--color-content-disabled` | grey-400 | Texto deshabilitado |
| `--color-content-inverted` | white | Texto sobre fondos oscuros |
| `--color-content-accent` | blue-400 | Enlaces, texto destacado |
| `--color-content-error` | red-400 | Mensajes de error |
| `--color-content-success` | green-400 | Mensajes de éxito |
| `--color-content-warning` | yellow-400 | Advertencias |

### Colores de Iconos

| Token | Valor Light | Uso |
|-------|-------------|-----|
| `--color-icon-primary` | grey-700 | Iconos principales |
| `--color-icon-secondary` | grey-500 | Iconos secundarios |
| `--color-icon-disabled` | grey-400 | Iconos deshabilitados |
| `--color-icon-inverted` | white | Iconos sobre fondos oscuros |
| `--color-icon-accent` | blue-400 | Iconos de acción |
| `--color-icon-error` | red-400 | Iconos de error |
| `--color-icon-success` | green-400 | Iconos de éxito |
| `--color-icon-warning` | yellow-400 | Iconos de advertencia |

### Colores de Bordes (Stroke)

| Token | Valor Light | Uso |
|-------|-------------|-----|
| `--color-stroke-subtle` | grey-200 | Divisores, bordes de cards |
| `--color-stroke-medium` | grey-300 | Bordes de inputs |
| `--color-stroke-strong` | grey-400 | Bordes enfatizados |
| `--color-stroke-alpha-subtle` | black 10% | Bordes transparentes sutiles |
| `--color-stroke-alpha-medium` | black 25% | Bordes transparentes medios |
| `--color-stroke-alpha-strong` | black 50% | Bordes transparentes fuertes |

### Colores de Feedback

#### Negativo/Error
| Token | Valor | Uso |
|-------|-------|-----|
| `--color-feedback-negative-light` | red-100 | Fondo de alertas de error |
| `--color-feedback-negative-default` | red-400 | Texto/iconos de error |
| `--color-feedback-negative-strong` | red-600 | Error crítico |

#### Positivo/Success
| Token | Valor | Uso |
|-------|-------|-----|
| `--color-feedback-positive-light` | green-100 | Fondo de mensajes de éxito |
| `--color-feedback-positive-default` | green-400 | Texto/iconos de éxito |
| `--color-feedback-positive-strong` | green-600 | Éxito enfatizado |

#### Warning
| Token | Valor | Uso |
|-------|-------|-----|
| `--color-feedback-warning-light` | yellow-100 | Fondo de advertencias |
| `--color-feedback-warning-default` | yellow-400 | Texto/iconos de warning |
| `--color-feedback-warning-strong` | yellow-500 | Warning enfatizado |

### Colores del Build System

Colores específicos para contextos de código y tecnología.

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-build-action` | jade-400 | Acciones, comandos |
| `--color-build-data` | violet-400 | Datos, variables |
| `--color-build-function` | amber-400 | Funciones |
| `--color-build-input` | teal-400 | Inputs, parámetros |
| `--color-build-workflow` | pink-400 | Workflows, procesos |

## Dark Mode

El sistema soporta dark mode automáticamente con `prefers-color-scheme: dark`.

### Principales cambios en dark mode:
- Los fondos se invierten (background pasa de blanco a negro)
- Los textos se aclaran (grey-700 pasa a grey-300)
- Los colores de acento se ajustan para mejor contraste
- Los feedback colors usan tonos más claros (300 en vez de 400)

### Ejemplo de uso:
```css
.card {
  background: var(--color-surface-layer);
  color: var(--color-content-primary);
  border: 1px solid var(--color-stroke-subtle);
}
/* Automáticamente se adapta en dark mode */
```
