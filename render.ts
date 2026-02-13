import path from "path";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";

const parseArgs = (argv: string[]) => {
  const args: Record<string, string> = {};
  for (let i = 2; i < argv.length; i++) {
    if (argv[i].startsWith("--") && i + 1 < argv.length) {
      args[argv[i].slice(2)] = argv[i + 1];
      i++;
    }
  }
  return args;
};

const main = async () => {
  const args = parseArgs(process.argv);

  const compositionId = args["id"];
  if (!compositionId) {
    console.error("Usage: tsx render.ts --id <compositionId> [options]");
    console.error("Options:");
    console.error("  --output <path>          Output file path");
    console.error("  --codec gif|h264         Output codec (default: gif)");
    console.error("  --scale <number>         Scale factor (default: 1)");
    console.error(
      "  --every-nth-frame <n>    Frame skip for GIF (default: 2)",
    );
    process.exit(1);
  }

  const codec = (args["codec"] as "gif" | "h264") ?? "gif";
  const ext = codec === "gif" ? "gif" : "mp4";
  const outputPath =
    args["output"] ?? path.join(__dirname, "out", `${compositionId}.${ext}`);
  const scale = args["scale"] ? parseFloat(args["scale"]) : 1;
  const everyNthFrame = args["every-nth-frame"]
    ? parseInt(args["every-nth-frame"], 10)
    : codec === "gif"
      ? 2
      : 1;

  console.log(`Bundling...`);
  const bundled = await bundle({
    entryPoint: path.join(__dirname, "src", "index.ts"),
    webpackOverride: (config) => config,
  });

  console.log(`Selecting composition "${compositionId}"...`);
  const composition = await selectComposition({
    serveUrl: bundled,
    id: compositionId,
  });

  console.log(
    `Rendering ${composition.durationInFrames} frames (${codec}, scale: ${scale}, everyNthFrame: ${everyNthFrame})...`,
  );
  await renderMedia({
    composition,
    serveUrl: bundled,
    codec,
    outputLocation: outputPath,
    everyNthFrame,
    scale,
    onProgress: ({ progress }) => {
      process.stdout.write(`\rProgress: ${(progress * 100).toFixed(1)}%`);
    },
  });

  console.log(`\nDone! Output: ${outputPath}`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
