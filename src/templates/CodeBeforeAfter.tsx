import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { COLORS, FONTS } from "../constants";
import { CodeBlock } from "../shared/CodeBlock";
import { CodeBeforeAfterProps } from "./CodeBeforeAfter.schema";

const TITLE_DURATION_SEC = 1.2;
const BEFORE_ENTER_SEC = 0.6;
const BEFORE_HOLD_SEC = 1.5;
const SPLIT_SEC = 0.6;
const AFTER_ENTER_SEC = 0.6;
const HOLD_END_SEC = 2;

export const BEFORE_AFTER_DURATION_SEC =
  TITLE_DURATION_SEC +
  BEFORE_ENTER_SEC +
  BEFORE_HOLD_SEC +
  SPLIT_SEC +
  AFTER_ENTER_SEC +
  HOLD_END_SEC;

export const CodeBeforeAfter: React.FC<CodeBeforeAfterProps> = ({
  title,
  beforeLabel,
  afterLabel,
  beforeCode,
  afterCode,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleStart = 0;
  const titleEnd = Math.round(TITLE_DURATION_SEC * fps);
  const beforeEnterEnd = titleEnd + Math.round(BEFORE_ENTER_SEC * fps);
  const beforeHoldEnd = beforeEnterEnd + Math.round(BEFORE_HOLD_SEC * fps);
  const splitEnd = beforeHoldEnd + Math.round(SPLIT_SEC * fps);
  const afterEnterEnd = splitEnd + Math.round(AFTER_ENTER_SEC * fps);

  const titleOpacity = interpolate(
    frame,
    [titleStart, titleStart + 15, titleEnd - 10, titleEnd],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const titleScale = interpolate(
    frame,
    [titleStart, titleStart + 15],
    [0.9, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const beforeOpacity = interpolate(
    frame,
    [titleEnd, beforeEnterEnd],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const beforeTranslateY = interpolate(
    frame,
    [titleEnd, beforeEnterEnd],
    [30, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    },
  );

  const beforeWidth = interpolate(
    frame,
    [beforeHoldEnd, splitEnd],
    [80, 48],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.quad),
    },
  );

  const beforeLeft = interpolate(
    frame,
    [beforeHoldEnd, splitEnd],
    [10, 2],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.quad),
    },
  );

  const afterProgress = spring({
    frame: frame - splitEnd,
    fps,
    config: { damping: 200 },
  });

  const afterOpacity = frame >= splitEnd ? afterProgress : 0;
  const afterTranslateX = interpolate(afterProgress, [0, 1], [60, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {frame < titleEnd && (
        <div
          style={{
            position: "absolute",
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            fontFamily: FONTS.sans,
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.text,
            textAlign: "center",
          }}
        >
          {title}
        </div>
      )}

      {frame >= titleEnd && (
        <>
          <div
            style={{
              position: "absolute",
              left: `${beforeLeft}%`,
              top: "8%",
              width: `${beforeWidth}%`,
              height: "84%",
              opacity: beforeOpacity,
              transform: `translateY(${beforeTranslateY}px)`,
            }}
          >
            <CodeBlock code={beforeCode} label={beforeLabel} />
          </div>

          {frame >= splitEnd && (
            <div
              style={{
                position: "absolute",
                right: "2%",
                top: "8%",
                width: "48%",
                height: "84%",
                opacity: afterOpacity,
                transform: `translateX(${afterTranslateX}px)`,
              }}
            >
              <CodeBlock code={afterCode} label={afterLabel} />
            </div>
          )}
        </>
      )}
    </AbsoluteFill>
  );
};
