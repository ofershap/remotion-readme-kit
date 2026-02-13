import { z } from "zod";

const lineSchema = z.object({
  type: z.enum(["command", "output", "blank"]),
  text: z.string(),
  color: z.string().optional(),
});

export const CliDemoSchema = z.object({
  title: z.string(),
  lines: z.array(lineSchema),
  typingSpeed: z.number().min(1).max(10).default(2),
  promptSymbol: z.string().default("$"),
});

export type CliDemoProps = z.infer<typeof CliDemoSchema>;
export type CliLine = z.infer<typeof lineSchema>;
