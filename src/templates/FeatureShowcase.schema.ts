import { z } from "zod";
import { zColor } from "@remotion/zod-types";

const featureSchema = z.object({
  emoji: z.string(),
  title: z.string(),
  description: z.string(),
});

export const FeatureShowcaseSchema = z.object({
  projectName: z.string(),
  tagline: z.string(),
  features: z.array(featureSchema).min(1).max(8),
  accentColor: zColor(),
});

export type FeatureShowcaseProps = z.infer<typeof FeatureShowcaseSchema>;
export type Feature = z.infer<typeof featureSchema>;
