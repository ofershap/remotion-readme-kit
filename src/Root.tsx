import React from "react";
import { Composition, Folder } from "remotion";
import { DIMENSIONS, FPS, COLORS } from "./constants";
import { CliDemo, calculateCliDemoMetadata } from "./templates/CliDemo";
import { CliDemoSchema } from "./templates/CliDemo.schema";
import {
  CodeBeforeAfter,
  BEFORE_AFTER_DURATION_SEC,
} from "./templates/CodeBeforeAfter";
import { CodeBeforeAfterSchema } from "./templates/CodeBeforeAfter.schema";
import {
  FeatureShowcase,
  calculateFeatureShowcaseMetadata,
} from "./templates/FeatureShowcase";
import { FeatureShowcaseSchema } from "./templates/FeatureShowcase.schema";

const BA_FRAMES = Math.ceil(BEFORE_AFTER_DURATION_SEC * FPS);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Templates">
        <Composition
          id="CliDemo"
          component={CliDemo}
          {...DIMENSIONS}
          fps={FPS}
          durationInFrames={300}
          schema={CliDemoSchema}
          defaultProps={{
            title: "my-awesome-tool",
            lines: [
              { type: "command", text: "npx my-awesome-tool init" },
              { type: "output", text: "Creating project..." },
              { type: "output", text: "Installing dependencies..." },
              { type: "blank", text: "" },
              {
                type: "output",
                text: "Done! Your project is ready.",
                color: COLORS.green,
              },
            ],
            typingSpeed: 2,
            promptSymbol: "$",
          }}
          calculateMetadata={calculateCliDemoMetadata}
        />
        <Composition
          id="CodeBeforeAfter"
          component={CodeBeforeAfter}
          {...DIMENSIONS}
          fps={FPS}
          durationInFrames={BA_FRAMES}
          schema={CodeBeforeAfterSchema}
          defaultProps={{
            title: "Before & After",
            beforeLabel: "Before",
            afterLabel: "After",
            beforeCode: "// old code",
            afterCode: "// new code",
          }}
        />
        <Composition
          id="FeatureShowcase"
          component={FeatureShowcase}
          {...DIMENSIONS}
          fps={FPS}
          durationInFrames={180}
          schema={FeatureShowcaseSchema}
          defaultProps={{
            projectName: "my-project",
            tagline: "A great project",
            features: [
              { emoji: "\u2B50", title: "Feature 1", description: "Description" },
              { emoji: "\u{1F680}", title: "Feature 2", description: "Description" },
            ],
            accentColor: COLORS.blue,
          }}
          calculateMetadata={calculateFeatureShowcaseMetadata}
        />
      </Folder>

      <Folder name="Projects">
        {/* 1. ts-nano-event — CodeBeforeAfter */}
        <Composition
          id="TsNanoEvent"
          component={CodeBeforeAfter}
          {...DIMENSIONS}
          fps={FPS}
          durationInFrames={BA_FRAMES}
          schema={CodeBeforeAfterSchema}
          defaultProps={{
            title: "Simpler. Typed. Better.",
            beforeLabel: "Before",
            afterLabel: "After",
            beforeCode: `import EventEmitter from "events";

const emitter = new EventEmitter();

emitter.on("user:login", (data) => {
  // data is \`any\` — no type safety
  console.log(data.name);
});

emitter.emit("user:login", { name: "Alice" });`,
            afterCode: `import { createEmitter } from "ts-nano-event";

type Events = {
  "user:login": { name: string };
};

const emitter = createEmitter<Events>();

emitter.on("user:login", (data) => {
  // data is { name: string } — fully typed!
  console.log(data.name);
});`,
          }}
        />

        {/* 2. awesome-hebrew-dev — FeatureShowcase */}
        <Composition
          id="AwesomeHebrewDev"
          component={FeatureShowcase}
          {...DIMENSIONS}
          fps={FPS}
          durationInFrames={180}
          schema={FeatureShowcaseSchema}
          defaultProps={{
            projectName: "awesome-hebrew-dev",
            tagline: "Curated Hebrew developer resources",
            features: [
              { emoji: "\u{1F4AC}", title: "Communities", description: "Telegram, Discord, Facebook groups" },
              { emoji: "\u{1F3A7}", title: "Podcasts", description: "Hebrew tech podcasts and shows" },
              { emoji: "\u{1F4DA}", title: "Learning", description: "Courses, tutorials, and platforms" },
              { emoji: "\u{1F3A4}", title: "Conferences", description: "Israeli tech conferences and meetups" },
              { emoji: "\u{1F4BB}", title: "Open Source", description: "Israeli open source projects" },
              { emoji: "\u{1F4F0}", title: "Blogs & News", description: "Hebrew tech blogs and newsletters" },
            ],
            accentColor: COLORS.blue,
          }}
          calculateMetadata={calculateFeatureShowcaseMetadata}
        />

        {/* 3. hebrew-slugify — CliDemo */}
        <Composition
          id="HebrewSlugify"
          component={CliDemo}
          {...DIMENSIONS}
          fps={FPS}
          durationInFrames={300}
          schema={CliDemoSchema}
          defaultProps={{
            title: "hebrew-slugify",
            lines: [
              { type: "command", text: 'node -e "const {slugify} = require(\'hebrew-slugify\')"' },
              { type: "blank", text: "" },
              { type: "command", text: 'slugify("\u05E9\u05DC\u05D5\u05DD \u05E2\u05D5\u05DC\u05DD")' },
              { type: "output", text: '"shalom-olam"', color: COLORS.green },
              { type: "blank", text: "" },
              { type: "command", text: 'slugify("\u05D1\u05D3\u05D9\u05E7\u05D4 123 test")' },
              { type: "output", text: '"bdikah-123-test"', color: COLORS.green },
              { type: "blank", text: "" },
              { type: "command", text: 'slugify("\u05E7\u05E4\u05D4 \u05D5\u05E2\u05D5\u05D2\u05D4")' },
              { type: "output", text: '"kafeh-veugah"', color: COLORS.green },
            ],
            typingSpeed: 2,
            promptSymbol: ">",
          }}
          calculateMetadata={calculateCliDemoMetadata}
        />

        {/* 4. env-guard — CliDemo */}
        <Composition
          id="EnvGuard"
          component={CliDemo}
          {...DIMENSIONS}
          fps={FPS}
          durationInFrames={300}
          schema={CliDemoSchema}
          defaultProps={{
            title: "env-guard",
            lines: [
              { type: "command", text: "npx env-guard" },
              { type: "blank", text: "" },
              { type: "output", text: "Checking .env against .env.example..." },
              { type: "blank", text: "" },
              { type: "output", text: "\u2717 Missing: DATABASE_URL", color: COLORS.red },
              { type: "output", text: "\u2717 Missing: REDIS_HOST", color: COLORS.red },
              { type: "output", text: "\u2713 Found: API_KEY", color: COLORS.green },
              { type: "output", text: "\u2713 Found: NODE_ENV", color: COLORS.green },
              { type: "blank", text: "" },
              { type: "output", text: "2 missing variables. Fix before deploying!", color: COLORS.yellow },
            ],
            typingSpeed: 2,
            promptSymbol: "$",
          }}
          calculateMetadata={calculateCliDemoMetadata}
        />

        {/* 5. use-stepper — CodeBeforeAfter */}
        <Composition
          id="UseStepper"
          component={CodeBeforeAfter}
          {...DIMENSIONS}
          fps={FPS}
          durationInFrames={BA_FRAMES}
          schema={CodeBeforeAfterSchema}
          defaultProps={{
            title: "Multi-step forms, simplified.",
            beforeLabel: "Manual State",
            afterLabel: "useStepper",
            beforeCode: `const [step, setStep] = useState(0);
const steps = ["Info", "Address", "Payment"];

const goNext = () => {
  if (step < steps.length - 1) {
    setStep(step + 1);
  }
};
const goBack = () => {
  if (step > 0) {
    setStep(step - 1);
  }
};
const progress = step / (steps.length - 1);`,
            afterCode: `import { useStepper } from "use-stepper";

const {
  step,        // current step name
  goNext,      // go forward
  goBack,      // go backward
  goTo,        // jump to step
  progress,    // 0 → 1
  isFirst,     // boolean
  isLast,      // boolean
} = useStepper(["Info", "Address", "Payment"]);`,
          }}
        />

        {/* 6. ai-commit-msg — FeatureShowcase */}
        <Composition
          id="AiCommitMsg"
          component={FeatureShowcase}
          {...DIMENSIONS}
          fps={FPS}
          durationInFrames={180}
          schema={FeatureShowcaseSchema}
          defaultProps={{
            projectName: "ai-commit-msg",
            tagline: "AI-powered commit messages for your PRs",
            features: [
              { emoji: "\u{1F916}", title: "AI Analysis", description: "Reads your PR diff and understands the changes" },
              { emoji: "\u{1F4DD}", title: "Conventional Commits", description: "Generates structured commit messages automatically" },
              { emoji: "\u{1F4AC}", title: "PR Comments", description: "Posts summary as a PR comment, updates on push" },
              { emoji: "\u{1F504}", title: "Multi-Provider", description: "Works with OpenAI and Anthropic models" },
            ],
            accentColor: COLORS.mauve,
          }}
          calculateMetadata={calculateFeatureShowcaseMetadata}
        />

        {/* 7. mcp-server-devutils — FeatureShowcase */}
        <Composition
          id="McpServerDevutils"
          component={FeatureShowcase}
          {...DIMENSIONS}
          fps={FPS}
          durationInFrames={180}
          schema={FeatureShowcaseSchema}
          defaultProps={{
            projectName: "mcp-server-devutils",
            tagline: "17 developer utilities. Zero auth. One MCP server.",
            features: [
              { emoji: "\u{1F510}", title: "Base64 & Hash", description: "Encode, decode, MD5, SHA-256, SHA-512" },
              { emoji: "\u{1F3B2}", title: "UUID & ULID", description: "Generate unique identifiers instantly" },
              { emoji: "\u{1F513}", title: "JWT Decode", description: "Parse headers, payloads, and expiry info" },
              { emoji: "\u23F0", title: "Cron & Timestamps", description: "Explain cron, convert Unix/ISO timestamps" },
              { emoji: "\u{1F4CB}", title: "JSON & Regex", description: "Format, validate, minify JSON. Test regex patterns" },
            ],
            accentColor: COLORS.teal,
          }}
          calculateMetadata={calculateFeatureShowcaseMetadata}
        />

        {/* 8. mcp-server-github-gist — FeatureShowcase */}
        <Composition
          id="McpServerGithubGist"
          component={FeatureShowcase}
          {...DIMENSIONS}
          fps={FPS}
          durationInFrames={180}
          schema={FeatureShowcaseSchema}
          defaultProps={{
            projectName: "mcp-server-github-gist",
            tagline: "Manage GitHub Gists from your IDE",
            features: [
              { emoji: "\u{1F4C4}", title: "List & Search", description: "Browse all your gists with pagination" },
              { emoji: "\u2795", title: "Create & Update", description: "Create new gists, edit existing ones" },
              { emoji: "\u{1F5D1}\uFE0F", title: "Delete", description: "Remove gists you no longer need" },
              { emoji: "\u2B50", title: "Star & Unstar", description: "Bookmark your favorite gists" },
            ],
            accentColor: COLORS.peach,
          }}
          calculateMetadata={calculateFeatureShowcaseMetadata}
        />

        {/* 9. mcp-server-npm — CliDemo */}
        <Composition
          id="McpServerNpm"
          component={CliDemo}
          {...DIMENSIONS}
          fps={FPS}
          durationInFrames={300}
          schema={CliDemoSchema}
          defaultProps={{
            title: "mcp-server-npm",
            lines: [
              { type: "command", text: 'npm_search("react state management")' },
              { type: "blank", text: "" },
              { type: "output", text: "1. zustand         \u2B07 8.2M/week", color: COLORS.green },
              { type: "output", text: "2. jotai           \u2B07 2.1M/week", color: COLORS.green },
              { type: "output", text: "3. valtio          \u2B07 890K/week", color: COLORS.green },
              { type: "blank", text: "" },
              { type: "command", text: 'npm_compare("zustand", "jotai")' },
              { type: "blank", text: "" },
              { type: "output", text: "zustand: 47K\u2605  8.2M\u2B07  1.2KB", color: COLORS.blue },
              { type: "output", text: "jotai:   18K\u2605  2.1M\u2B07  2.4KB", color: COLORS.blue },
            ],
            typingSpeed: 2,
            promptSymbol: "\u276F",
          }}
          calculateMetadata={calculateCliDemoMetadata}
        />

        {/* 10. mcp-server-cloudflare — FeatureShowcase */}
        <Composition
          id="McpServerCloudflare"
          component={FeatureShowcase}
          {...DIMENSIONS}
          fps={FPS}
          durationInFrames={180}
          schema={FeatureShowcaseSchema}
          defaultProps={{
            projectName: "mcp-server-cloudflare",
            tagline: "Manage Cloudflare from your IDE",
            features: [
              { emoji: "\u{1F310}", title: "Zones & DNS", description: "List zones, CRUD DNS records" },
              { emoji: "\u{1F477}", title: "Workers", description: "List and delete Cloudflare Workers" },
              { emoji: "\u{1F5C4}\uFE0F", title: "KV Storage", description: "Manage namespaces, keys, and values" },
              { emoji: "\u{1FAA3}", title: "R2 Buckets", description: "List and manage object storage" },
              { emoji: "\u{1F9F9}", title: "Cache Purge", description: "Purge cache by URL or purge everything" },
            ],
            accentColor: COLORS.peach,
          }}
          calculateMetadata={calculateFeatureShowcaseMetadata}
        />

        {/* 11. hebrew-dates — CodeBeforeAfter */}
        <Composition
          id="HebrewDates"
          component={CodeBeforeAfter}
          {...DIMENSIONS}
          fps={FPS}
          durationInFrames={BA_FRAMES}
          schema={CodeBeforeAfterSchema}
          defaultProps={{
            title: "Hebrew dates, made simple.",
            beforeLabel: "Manual",
            afterLabel: "hebrew-dates",
            beforeCode: `// How do I get today's Hebrew date?
// What holiday is it?
// How do I format it?

// ...hundreds of lines of calendar math
// ...leap year calculations
// ...month name lookups
// ...holiday detection logic

// Good luck maintaining this.`,
            afterCode: `import { toHebrew, formatHebrew, getHoliday }
  from "hebrew-dates";

const today = toHebrew(new Date());
// { year: 5786, month: 5, day: 18 }

formatHebrew(today);
// "\u05D9\u05F4\u05D7 \u05E9\u05D1\u05D8 \u05EA\u05E9\u05E4\u05F4\u05D5"

getHoliday(today);
// "Yom Kippur" | null`,
          }}
        />

        {/* 12. react-rtl-utils — CodeBeforeAfter */}
        <Composition
          id="ReactRtlUtils"
          component={CodeBeforeAfter}
          {...DIMENSIONS}
          fps={FPS}
          durationInFrames={BA_FRAMES}
          schema={CodeBeforeAfterSchema}
          defaultProps={{
            title: "RTL layouts, handled.",
            beforeLabel: "Manual",
            afterLabel: "react-rtl-utils",
            beforeCode: `function MyComponent({ text }) {
  const isHebrew = /[\\u0590-\\u05FF]/.test(text);
  const dir = isHebrew ? "rtl" : "ltr";

  return (
    <div dir={dir} style={{
      textAlign: dir === "rtl" ? "right" : "left",
      direction: dir,
    }}>
      {text}
    </div>
  );
}`,
            afterCode: `import { BidiText, useDirection }
  from "react-rtl-utils";

function MyComponent({ text }) {
  return <BidiText>{text}</BidiText>;
  // auto-detects direction!
}

// Or use the hook:
const { direction, isRtl } = useDirection();`,
          }}
        />
      </Folder>
    </>
  );
};
