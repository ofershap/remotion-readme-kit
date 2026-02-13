import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

type FadeInProps = {
  children: React.ReactNode;
  startFrame?: number;
  durationInSeconds?: number;
};

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  startFrame = 0,
  durationInSeconds = 0.5,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const durationInFrames = Math.round(durationInSeconds * fps);

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return <div style={{ opacity }}>{children}</div>;
};
