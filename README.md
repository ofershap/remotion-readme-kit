# remotion-readme-kit

Drop-in [Remotion](https://remotion.dev) templates for creating animated README demos. Three templates, Catppuccin Mocha theme, one render command.

## Templates

### CliDemo

Animated terminal with typed commands and colorized output. Perfect for CLI tools.

![CliDemo](examples/cli-demo.gif)

### CodeBeforeAfter

Side-by-side code comparison with a "before" and "after" panel. Perfect for libraries.

![CodeBeforeAfter](examples/code-before-after.gif)

### FeatureShowcase

Animated feature cards with emojis and descriptions. Perfect for feature-rich tools.

![FeatureShowcase](examples/feature-showcase.gif)

## Quick Start

```bash
git clone https://github.com/ofershap/remotion-readme-kit.git
cd remotion-readme-kit
npm install
```

Preview in Remotion Studio:

```bash
npm run dev
```

Render a GIF:

```bash
npm run render -- --id CliDemo --output demo.gif
```

## Usage

Edit `src/Root.tsx` to add your own compositions:

```tsx
<Composition
  id="MyProject"
  component={CliDemo}
  {...DIMENSIONS}
  fps={FPS}
  durationInFrames={300}
  schema={CliDemoSchema}
  defaultProps={{
    title: "my-tool",
    lines: [
      { type: "command", text: "npx my-tool init" },
      { type: "output", text: "Project created!", color: COLORS.green },
    ],
    typingSpeed: 2,
    promptSymbol: "$",
  }}
  calculateMetadata={calculateCliDemoMetadata}
/>
```

Then render:

```bash
npm run render -- --id MyProject --output demo.gif
```

## Template Props

### CliDemo

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Terminal window title |
| `lines` | `CliLine[]` | Array of `{ type: "command" \| "output" \| "blank", text: string, color?: string }` |
| `typingSpeed` | `number` | 1-10, how fast commands are typed (default: 2) |
| `promptSymbol` | `string` | Prompt character (default: `$`) |

### CodeBeforeAfter

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Headline text |
| `beforeLabel` | `string` | Left panel label (default: "Before") |
| `afterLabel` | `string` | Right panel label (default: "After") |
| `beforeCode` | `string` | Code for the left panel |
| `afterCode` | `string` | Code for the right panel |

### FeatureShowcase

| Prop | Type | Description |
|------|------|-------------|
| `projectName` | `string` | Project name |
| `tagline` | `string` | One-line description |
| `features` | `Feature[]` | Array of `{ emoji: string, title: string, description: string }` (1-8 items) |
| `accentColor` | `string` | Hex color for accents |

## Render Options

```bash
npm run render -- --id <CompositionId> [options]
```

| Option | Default | Description |
|--------|---------|-------------|
| `--output <path>` | `out/<id>.gif` | Output file path |
| `--codec gif\|h264` | `gif` | Output format |
| `--scale <number>` | `1` | Scale factor (0.5 = half size) |
| `--every-nth-frame <n>` | `2` | Frame skip for GIF (higher = smaller file) |

## Colors

Built-in [Catppuccin Mocha](https://catppuccin.com) palette:

| Name | Hex | Usage |
|------|-----|-------|
| `green` | `#a6e3a1` | Success, positive output |
| `red` | `#f38ba8` | Errors, negative output |
| `yellow` | `#f9e2af` | Warnings |
| `blue` | `#89b4fa` | Info, accents |
| `mauve` | `#cba6f7` | Highlights |
| `teal` | `#94e2d5` | Secondary accents |
| `peach` | `#fab387` | Warm accents |

## Made With This Kit

These projects all use `remotion-readme-kit` for their README animations:

[ts-nano-event](https://github.com/ofershap/ts-nano-event) |
[hebrew-slugify](https://github.com/ofershap/hebrew-slugify) |
[env-guard](https://github.com/ofershap/env-guard) |
[use-stepper](https://github.com/ofershap/use-stepper) |
[ai-commit-msg](https://github.com/ofershap/ai-commit-msg) |
[mcp-server-devutils](https://github.com/ofershap/mcp-server-devutils) |
[mcp-server-github-gist](https://github.com/ofershap/mcp-server-github-gist) |
[mcp-server-npm](https://github.com/ofershap/mcp-server-npm) |
[mcp-server-cloudflare](https://github.com/ofershap/mcp-server-cloudflare) |
[hebrew-dates](https://github.com/ofershap/hebrew-dates) |
[react-rtl-utils](https://github.com/ofershap/react-rtl-utils) |
[awesome-hebrew-dev](https://github.com/ofershap/awesome-hebrew-dev)

## License

MIT
