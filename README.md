# remotion-readme-kit

Drop-in [Remotion](https://www.remotion.dev/) templates for creating animated README demos. Clone, customize props, render GIF.

3 templates cover most open source project types:

| Template | Best for | Output |
|----------|----------|--------|
| **CliDemo** | CLI tools, terminal workflows | Animated terminal with typing effect |
| **CodeBeforeAfter** | Libraries, refactoring tools | Split-screen code comparison |
| **FeatureShowcase** | Feature-rich tools, MCP servers | Animated feature cards |

## Quick Start

```bash
git clone https://github.com/ofershap/remotion-readme-kit.git
cd remotion-readme-kit
npm install
npm run dev          # Open Remotion Studio to preview
npm run render -- --id CliDemo   # Render to out/CliDemo.gif
```

## Templates

### CliDemo

Simulates a terminal with typed commands and output lines. Supports colored output, configurable typing speed, and custom prompt symbols.

**Props:** `title`, `lines[]` (type + text + color), `typingSpeed` (1-10), `promptSymbol`

### CodeBeforeAfter

Split-screen code comparison with animated transitions. Shows "before" code, then slides in "after" code side-by-side.

**Props:** `title`, `beforeLabel`, `afterLabel`, `beforeCode`, `afterCode`

### FeatureShowcase

Animated feature cards with staggered spring entrance. Shows project name, tagline, then reveals features one by one.

**Props:** `projectName`, `tagline`, `features[]` (emoji + title + description, 1-8), `accentColor`

## Rendering

```bash
npm run render -- --id CliDemo                                    # GIF (default)
npm run render -- --id CliDemo --codec h264                       # MP4
npm run render -- --id CliDemo --output ./assets/demo.gif         # Custom path
npm run render -- --id CliDemo --scale 0.75                       # Smaller file
npm run render -- --id CliDemo --every-nth-frame 3                # Fewer frames
npm run render:all                                                # All templates
```

## Customization

Edit `src/Root.tsx` and add a new `<Composition>` with your project-specific props. Then render with `npm run render -- --id YourComp`.

All compositions use Zod schemas for prop validation. See `src/templates/*.schema.ts` for the full type definitions.

### Colors (Catppuccin Mocha)

| Name | Hex | Use for |
|------|-----|---------|
| green | `#a6e3a1` | Success output |
| red | `#f38ba8` | Errors |
| yellow | `#f9e2af` | Warnings |
| blue | `#89b4fa` | Info, accent |
| mauve | `#cba6f7` | AI features |
| teal | `#94e2d5` | Dev tools |
| peach | `#fab387` | Infrastructure |

## Real-World Examples

This kit was used to create demo GIFs for 12 open source projects:

- [ts-nano-event](https://github.com/ofershap/ts-nano-event) (CodeBeforeAfter)
- [env-guard](https://github.com/ofershap/env-guard) (CliDemo)
- [hebrew-slugify](https://github.com/ofershap/hebrew-slugify) (CliDemo)
- [use-stepper](https://github.com/ofershap/use-stepper) (CodeBeforeAfter)
- [hebrew-dates](https://github.com/ofershap/hebrew-dates) (CodeBeforeAfter)
- [react-rtl-utils](https://github.com/ofershap/react-rtl-utils) (CodeBeforeAfter)
- [mcp-server-devutils](https://github.com/ofershap/mcp-server-devutils) (FeatureShowcase)
- [mcp-server-cloudflare](https://github.com/ofershap/mcp-server-cloudflare) (FeatureShowcase)
- [mcp-server-npm](https://github.com/ofershap/mcp-server-npm) (CliDemo)
- [mcp-server-github-gist](https://github.com/ofershap/mcp-server-github-gist) (FeatureShowcase)
- [ai-commit-msg](https://github.com/ofershap/ai-commit-msg) (FeatureShowcase)
- [awesome-hebrew-dev](https://github.com/ofershap/awesome-hebrew-dev) (FeatureShowcase)

All 12 compositions are included in `src/Root.tsx` as reference examples.

## License

MIT
