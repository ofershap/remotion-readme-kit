# remotion-readme-kit

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Remotion](https://img.shields.io/badge/Built_with-Remotion-6C47FF.svg)](https://www.remotion.dev/)

Create animated GIF demos for your README in minutes — not hours. Clone, edit props, render. No video editing skills needed.

Drop-in [Remotion](https://www.remotion.dev/) templates for creating animated README demos.

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

![CliDemo example](examples/cli-demo.gif)

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Terminal window title |
| `lines` | `{ type, text, color? }[]` | Lines to display — `"command"` (typed), `"output"` (faded in), or `"blank"` |
| `typingSpeed` | `number` (1-10) | How fast commands are typed. Default: `2` |
| `promptSymbol` | `string` | Prompt character. Default: `"$"` |

**Example composition:**

```tsx
<Composition
  id="MyCliTool"
  component={CliDemo}
  schema={CliDemoSchema}
  calculateMetadata={calculateCliDemoMetadata}
  {...DIMENSIONS}
  fps={FPS}
  durationInFrames={300}
  defaultProps={{
    title: "my-cli-tool",
    lines: [
      { type: "command", text: "npx my-cli-tool init" },
      { type: "output", text: "Creating project..." },
      { type: "output", text: "Installing dependencies..." },
      { type: "blank", text: "" },
      { type: "output", text: "Done! Your project is ready.", color: "#a6e3a1" },
    ],
    typingSpeed: 2,
    promptSymbol: "$",
  }}
/>
```

### CodeBeforeAfter

Split-screen code comparison with animated transitions. Shows "before" code centered, then slides it left and reveals "after" code side-by-side.

![CodeBeforeAfter example](examples/code-before-after.gif)

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Title shown before the code panels appear |
| `beforeLabel` | `string` | Label above the left panel. Default: `"Before"` |
| `afterLabel` | `string` | Label above the right panel. Default: `"After"` |
| `beforeCode` | `string` | Code for the left panel |
| `afterCode` | `string` | Code for the right panel |

**Example composition:**

```tsx
<Composition
  id="MyLibrary"
  component={CodeBeforeAfter}
  schema={CodeBeforeAfterSchema}
  {...DIMENSIONS}
  fps={FPS}
  durationInFrames={BA_FRAMES}
  defaultProps={{
    title: "Simpler. Typed. Better.",
    beforeLabel: "Before",
    afterLabel: "After",
    beforeCode: `import EventEmitter from "events";

const emitter = new EventEmitter();

emitter.on("data", (val) => {
  // val is \`any\` — no type safety
  console.log(val.name);
});`,
    afterCode: `import { createEmitter } from "my-library";

type Events = { data: { name: string } };

const emitter = createEmitter<Events>();

emitter.on("data", (val) => {
  // val is { name: string } — fully typed!
  console.log(val.name);
});`,
  }}
/>
```

### FeatureShowcase

Animated feature cards with staggered spring entrance. Shows project name and tagline, then reveals feature cards one by one. Automatically switches to 2-column layout when there are more than 4 features.

![FeatureShowcase example](examples/feature-showcase.gif)

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `projectName` | `string` | Project name displayed as the heading |
| `tagline` | `string` | Subtitle below the project name |
| `features` | `{ emoji, title, description }[]` | Feature cards (1-8) |
| `accentColor` | `string` | Hex color for heading and card borders |

**Example composition:**

```tsx
<Composition
  id="MyProject"
  component={FeatureShowcase}
  schema={FeatureShowcaseSchema}
  calculateMetadata={calculateFeatureShowcaseMetadata}
  {...DIMENSIONS}
  fps={FPS}
  durationInFrames={180}
  defaultProps={{
    projectName: "my-project",
    tagline: "17 developer utilities. Zero auth. One MCP server.",
    features: [
      { emoji: "🔐", title: "Base64 & Hash", description: "Encode, decode, MD5, SHA-256" },
      { emoji: "🎲", title: "UUID & ULID", description: "Generate unique identifiers" },
      { emoji: "🔓", title: "JWT Decode", description: "Parse headers and payloads" },
      { emoji: "⏰", title: "Cron & Timestamps", description: "Explain cron, convert timestamps" },
      { emoji: "📋", title: "JSON & Regex", description: "Format, validate, test patterns" },
    ],
    accentColor: "#94e2d5",
  }}
/>
```

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

## Author

**Ofer Shapira**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/ofershap)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat&logo=github&logoColor=white)](https://github.com/ofershap)

## License

MIT
