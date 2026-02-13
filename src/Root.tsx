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
            title: "my-awesome-cli",
            lines: [
              { type: "command", text: "npx my-awesome-cli init" },
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
            title: "Simpler. Typed. Better.",
            beforeLabel: "Before",
            afterLabel: "After",
            beforeCode: `import EventEmitter from "events";

const emitter = new EventEmitter();

emitter.on("data", (payload) => {
  // payload is \`any\` — no safety
  console.log(payload.name);
});`,
            afterCode: `import { createEmitter } from "my-lib";

type Events = {
  data: { name: string };
};

const emitter = createEmitter<Events>();

emitter.on("data", (payload) => {
  // payload is { name: string } — typed!
  console.log(payload.name);
});`,
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
            tagline: "A great open source project",
            features: [
              {
                emoji: "⚡",
                title: "Fast",
                description: "Blazing fast performance",
              },
              {
                emoji: "🔒",
                title: "Type-Safe",
                description: "Full TypeScript support",
              },
              {
                emoji: "🪶",
                title: "Lightweight",
                description: "Zero dependencies, tiny bundle",
              },
              {
                emoji: "🧪",
                title: "Tested",
                description: "100% test coverage",
              },
            ],
            accentColor: COLORS.blue,
          }}
          calculateMetadata={calculateFeatureShowcaseMetadata}
        />
      </Folder>
    </>
  );
};
