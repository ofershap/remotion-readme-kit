import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  CalculateMetadataFunction,
} from "remotion";
import { COLORS, FONTS } from "../constants";
import { FeatureShowcaseProps, Feature } from "./FeatureShowcase.schema";

const INTRO_DURATION_SEC = 1.5;
const FEATURE_STAGGER_SEC = 0.3;
const HOLD_END_SEC = 2;

export const calculateFeatureShowcaseMetadata: CalculateMetadataFunction<
  FeatureShowcaseProps
> = async ({ props }) => {
  const totalSec =
    INTRO_DURATION_SEC +
    props.features.length * FEATURE_STAGGER_SEC +
    0.5 +
    HOLD_END_SEC;
  return { durationInFrames: Math.ceil(totalSec * 30) };
};

const FeatureCard: React.FC<{
  feature: Feature;
  index: number;
  accentColor: string;
  introFrames: number;
  fps: number;
  frame: number;
}> = ({ feature, index, accentColor, introFrames, fps, frame }) => {
  const staggerDelay = introFrames + Math.round(index * FEATURE_STAGGER_SEC * fps);

  const entrance = spring({
    frame: frame - staggerDelay,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const translateY = interpolate(entrance, [0, 1], [40, 0]);
  const opacity = entrance;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        padding: "20px 24px",
        display: "flex",
        alignItems: "flex-start",
        gap: 16,
        borderLeft: `4px solid ${accentColor}`,
      }}
    >
      <div style={{ fontSize: 32, flexShrink: 0, lineHeight: 1 }}>
        {feature.emoji}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 20,
            fontWeight: 600,
            color: COLORS.text,
          }}
        >
          {feature.title}
        </div>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 15,
            color: COLORS.subtext,
            lineHeight: 1.4,
          }}
        >
          {feature.description}
        </div>
      </div>
    </div>
  );
};

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
  projectName,
  tagline,
  features,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const introFrames = Math.round(INTRO_DURATION_SEC * fps);

  const titleEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const titleOpacity = titleEntrance;
  const titleTranslateY = interpolate(titleEntrance, [0, 1], [-20, 0]);

  const taglineOpacity = interpolate(
    frame,
    [15, 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const taglineTranslateY = interpolate(
    frame,
    [15, 30],
    [10, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    },
  );

  const columns = features.length > 4 ? 2 : 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        padding: "48px 64px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleTranslateY}px)`,
            fontFamily: FONTS.sans,
            fontSize: 52,
            fontWeight: 800,
            color: accentColor,
            letterSpacing: -1,
          }}
        >
          {projectName}
        </div>
        <div
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${taglineTranslateY}px)`,
            fontFamily: FONTS.sans,
            fontSize: 22,
            color: COLORS.subtext,
            marginTop: 8,
          }}
        >
          {tagline}
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignContent: "flex-start",
        }}
      >
        {features.map((feature, i) => (
          <div
            key={i}
            style={{
              width: columns === 2 ? "calc(50% - 8px)" : "100%",
            }}
          >
            <FeatureCard
              feature={feature}
              index={i}
              accentColor={accentColor}
              introFrames={introFrames}
              fps={fps}
              frame={frame}
            />
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
