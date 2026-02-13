import { z } from "zod";

export const CodeBeforeAfterSchema = z.object({
  title: z.string(),
  beforeLabel: z.string().default("Before"),
  afterLabel: z.string().default("After"),
  beforeCode: z.string(),
  afterCode: z.string(),
});

export type CodeBeforeAfterProps = z.infer<typeof CodeBeforeAfterSchema>;
