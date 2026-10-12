# tokens

A design token pipeline and documentation site I built between July 2020 and February 2021, exploring how a single set of token definitions can feed code, documentation and Figma.

It is no longer maintained and is kept as a record of that work. The dependencies are from 2020 and it will need updating to run today.

## What it does

Tokens are written once as JSON and built with [Style Dictionary](https://amzn.github.io/style-dictionary/) into every format the design system needs:

| Output | Format | Used for |
| --- | --- | --- |
| `tokens.css`, `all-tokens.css` | CSS custom properties (`--ds-*`) | Runtime theming |
| `_tokens.map.scss`, `_all-tokens.map.scss` | Nested Sass maps | Sass functions and mixins |
| `theme.scss`, `theme.map.scss` | Sass variables and maps | Semantic theme layer |
| `_text-styles.map.scss` | Sass map | Typography mixins and utility classes |
| `tokens.js`, `palette.js`, `allTokens.js` | ES6 exports | JavaScript and component logic |
| `palette.json`, `themeflat.json` | Flat JSON | Tooling |
| `figma/*.json` | Nested JSON | Syncing tokens back into Figma |
| `docs.json` | Custom JSON | Driving the Storybook documentation pages |

## Token structure

```
tokens/source/
  generic/   spacing, layout spacing, font sizes, families and weights,
             line heights, typography, border radius, box shadow, breakpoints
  palette/   11 colour ramps (blue, cyan, green, grey, magenta, orange,
             purple, red, teal, yellow, plus base black and white)
  themes/    semantic tokens that reference the palette, e.g.
             interactive-01 -> blue-60, ui-background -> white
```

The theme layer is the important part. Components use semantic tokens like `interactive-01` rather than raw colours, so a theme can be changed by remapping references without touching components. Every semantic token carries a description of where it should be used, and that description is what appears in the docs.

The palette values and semantic naming follow [IBM Carbon](https://carbondesignsystem.com/), which I used as a reference model. The structure, build pipeline and documentation are my own.

## Build pipeline

`tokens/scripts/build.js` and `tokens/scripts/buildThemes.js` extend Style Dictionary with custom code in `tokens/custom/`:

- **Transforms** for naming (prefixing with `ds`, flattening colour and typography names) and unit handling
- **Transform groups** that bundle those transforms per platform (SCSS, JS, JSON)
- **Filters** that split tokens into palette, generic, theme, typography and Figma sets, so each output only gets what it needs
- **Formats** for outputs Style Dictionary does not provide out of the box: deep Sass maps, typography maps, theme maps for Figma, and the docs JSON

```bash
npm run tokens   # build tokens, palette, typography, Figma and docs outputs
npm run themes   # build the semantic theme outputs
```

## Documentation site

A Storybook (Vue) site documents the system directly from the generated tokens:

- A page for each token type: colours, spacing, font sizes, families and weights, text styles, border radius, box shadow and theme
- Colour accessibility pages that check contrast between palette colours
- A Button component documented across separate Usage, Style, Code and Accessibility tabs, with guidance on when to use each variant

```bash
npm run sb         # run Storybook locally on port 6006
npm run build:sb   # build the static site
```

## Figma sync (experiment)

`.github/workflows/transform-tokens.yml` was an experiment in closing the loop with Figma: the [Design Tokens plugin](https://github.com/lukasoppermann/design-tokens) sends tokens to the repository, a GitHub Action rebuilds them, and the generated files are committed back. It was set up but never put into use.

## Stack

Style Dictionary 2, Storybook 6, Vue 2, Bootstrap 4 and Bootstrap-Vue, Sass, Node.
