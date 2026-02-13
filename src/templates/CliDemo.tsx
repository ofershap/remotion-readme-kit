import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  CalculateMetadataFunction,
  Sequence,
} from "remotion";
import { COLORS, FONTS } from "../constants";
import { Terminal } from "../shared/Terminal";
import { getTypingState, getTypingDuration } from "../shared/TypingAnimation";
import { CliDemoProps, CliLine } from "./CliDemo.schema";

const FADE_IN_FRAMES = 15;
const OUTPUT_PAUSE = 8;
const END_PAUSE_FRAMES = 60;
const LINE_GAP = 4;

const computeLineTimings = (lines: CliLine[], typingSpeed: number) => {
  const timings: { startFrame: number; endFrame: number }[] = [];
  let currentFrame = FADE_IN_FRAMES;

  for (const line of lines) {
    const startFrame = currentFrame;
    if (line.type === "command") {
      const typeDuration = getTypingDuration(line.text, typingSpeed);
      currentFrame += typeDuration + OUTPUT_PAUSE;
    } else if (line.type === "output") {
      currentFrame += LINE_GAP;
    } else {
      currentFrame += LINE_GAP;
    }
    timings.push({ startFrame, endFrame: currentFrame });
  }

  return { timings, totalFrames: currentFrame + END_PAUSE_FRAMES };
};

export const calculateCliDemoMetadata: CalculateMetadataFunction<
  CliDemoProps
> = async ({ props }) => {
  const { totalFrames } = computeLineTimings(props.lines, props.typingSpeed);
  return { durationInFrames: totalFrames };
};

const CliLineRenderer: React.FC<{
  line: CliLine;
  startFrame: number;
  currentFrame: number;
  typingSpeed: number;
  promptSymbol: string;
}> = ({ line, startFrame, currentFrame, typingSpeed, promptSymbol }) => {
  if (currentFrame < startFrame) return null;

  if (line.type === "blank") {
    return <div style={{ height: "1.6em" }} />;
  }

  if (line.type === "command") {
    const { visibleText, isComplete, cursorVisible } = getTypingState(
      line.text,
      startFrame,
      currentFrame,
      typingSpeed,
    );

    return (
      <div style={{ whiteSpace: "pre" }}>
        <span style={{ color: COLORS.green }}>{promptSymbol} </span>
        <span style={{ color: line.color ?? COLORS.text }}>{visibleText}</span>
        {!isComplete && cursorVisible && (
          <span
            style={{
              backgroundColor: COLORS.text,
              color: COLORS.terminalBg,
              width: "0.6em",
              display: "inline-block",
            }}
          >
            {"\u00A0"}
          </span>
        )}
      </div>
    );
  }

  const opacity = interpolate(
    currentFrame,
    [startFrame, startFrame + LINE_GAP],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div style={{ opacity, whiteSpace: "pre" }}>
      <span style={{ color: line.color ?? COLORS.subtext }}>{line.text}</span>
    </div>
  );
};

export const CliDemo: React.FC<CliDemoProps> = ({
  title,
  lines,
  typingSpeed,
  promptSymbol,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const terminalOpacity = interpolate(frame, [0, FADE_IN_FRAMES], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const terminalScale = interpolate(frame, [0, FADE_IN_FRAMES], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const { timings } = computeLineTimings(lines, typingSpeed);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Sequence premountFor={Math.round(0.5 * fps)}>
        <div
          style={{
            opacity: terminalOpacity,
            transform: `scale(${terminalScale})`,
            width: "90%",
            height: "80%",
            display: "flex",
          }}
        >
          <Terminal title={title}>
            {lines.map((line, i) => (
              <CliLineRenderer
                key={i}
                line={line}
                startFrame={timings[i].startFrame}
                currentFrame={frame}
                typingSpeed={typingSpeed}
                promptSymbol={promptSymbol}
              />
            ))}
          </Terminal>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
