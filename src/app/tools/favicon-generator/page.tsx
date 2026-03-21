"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type FontStyle = "sans" | "serif" | "mono" | "bold";
type ShapeStyle = "square" | "rounded" | "circle";

type FaviconOptions = {
  text: string;
  backgroundColor: string;
  textColor: string;
  fontStyle: FontStyle;
  shape: ShapeStyle;
};

const initialOptions: FaviconOptions = {
  text: "C",
  backgroundColor: "#2563eb",
  textColor: "#ffffff",
  fontStyle: "sans",
  shape: "rounded",
};

function getFontFamily(style: FontStyle) {
  switch (style) {
    case "serif":
      return 'Georgia, "Times New Roman", serif';
    case "mono":
      return '"JetBrains Mono", "Fira Code", monospace';
    default:
      return 'Inter, Arial, Helvetica, sans-serif';
  }
}

function drawFavicon(canvas: HTMLCanvasElement, options: FaviconOptions, size: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = size;
  canvas.height = size;

  const safeText = options.text.slice(0, 2).toUpperCase();
  const radius = options.shape === "rounded" ? size * 0.22 : size * 0.5;

  ctx.clearRect(0, 0, size, size);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  ctx.fillStyle = options.backgroundColor;

  if (options.shape === "circle") {
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (options.shape === "rounded") {
    ctx.beginPath();
    ctx.roundRect(0, 0, size, size, radius);
    ctx.fill();
  } else {
    ctx.fillRect(0, 0, size, size);
  }

  ctx.fillStyle = options.textColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${options.fontStyle === "bold" ? "700" : "600"} ${size * (safeText.length === 2 ? 0.42 : 0.56)}px ${getFontFamily(options.fontStyle)}`;
  ctx.fillText(safeText, size / 2, size / 2 + size * 0.03);
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default function FaviconGeneratorPage() {
  const [text, setText] = useState(initialOptions.text);
  const [backgroundColor, setBackgroundColor] = useState(initialOptions.backgroundColor);
  const [textColor, setTextColor] = useState(initialOptions.textColor);
  const [fontStyle, setFontStyle] = useState<FontStyle>(initialOptions.fontStyle);
  const [shape, setShape] = useState<ShapeStyle>(initialOptions.shape);
  const [hasGenerated, setHasGenerated] = useState(true);
  const [downloadMessage, setDownloadMessage] = useState("");

  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentOptions = useMemo<FaviconOptions>(
    () => ({
      text: (text.replace(/\s+/g, "").slice(0, 2) || "C").toUpperCase(),
      backgroundColor,
      textColor,
      fontStyle,
      shape,
    }),
    [text, backgroundColor, textColor, fontStyle, shape]
  );

  useEffect(() => {
    if (!hasGenerated || !previewCanvasRef.current) return;
    drawFavicon(previewCanvasRef.current, currentOptions, 64);
  }, [currentOptions, hasGenerated]);

  const handleGenerate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasGenerated(true);
    setDownloadMessage("");
    if (previewCanvasRef.current) {
      drawFavicon(previewCanvasRef.current, currentOptions, 64);
    }
  };

  const exportCanvas = async (size: number, type: "png" | "ico") => {
    const canvas = document.createElement("canvas");
    drawFavicon(canvas, currentOptions, size);

    const mimeType = "image/png";
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, mimeType));
    if (!blob) return;

    if (type === "png") {
      downloadBlob(blob, `favicon-${currentOptions.text.toLowerCase() || "icon"}.png`);
      setDownloadMessage("PNG downloaded.");
      return;
    }

    const icoBlob = new Blob([blob], { type: "image/x-icon" });
    downloadBlob(icoBlob, "favicon.ico");
    setDownloadMessage("ICO downloaded (PNG-based favicon file).");
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-gray-800 px-6 py-6">
        <div className="mx-auto max-w-5xl">
          <a href="/" className="text-sm text-gray-400 transition hover:text-white">
            ← Back to Cody Labs
          </a>
          <h1 className="mt-4 text-4xl font-bold">Free Favicon Generator</h1>
          <p className="mt-2 max-w-2xl text-gray-400">
            Create a clean text-based favicon in seconds. Customize colors, font style, and shape,
            then download it as PNG or favicon.ico.
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Customize your icon</h2>
            <p className="mt-2 text-sm text-gray-400">
              Use 1–2 characters for the cleanest favicon. Great for projects, apps, and personal sites.
            </p>
          </div>

          <form onSubmit={handleGenerate} className="space-y-5">
            <div>
              <label htmlFor="favicon-text" className="mb-2 block text-sm font-medium text-gray-300">
                Text (1–2 characters)
              </label>
              <input
                id="favicon-text"
                type="text"
                maxLength={2}
                value={text}
                onChange={(e) => setText(e.target.value.toUpperCase())}
                placeholder="C"
                className="w-full rounded-lg border border-gray-800 bg-[#111111] px-4 py-3 text-2xl font-bold text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="background-color" className="mb-2 block text-sm font-medium text-gray-300">
                  Background color
                </label>
                <div className="flex items-center gap-3 rounded-lg border border-gray-800 bg-[#111111] px-3 py-3">
                  <input
                    id="background-color"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="h-10 w-12 cursor-pointer rounded border-0 bg-transparent"
                  />
                  <span className="font-mono text-sm text-gray-400">{backgroundColor}</span>
                </div>
              </div>

              <div>
                <label htmlFor="text-color" className="mb-2 block text-sm font-medium text-gray-300">
                  Text color
                </label>
                <div className="flex items-center gap-3 rounded-lg border border-gray-800 bg-[#111111] px-3 py-3">
                  <input
                    id="text-color"
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="h-10 w-12 cursor-pointer rounded border-0 bg-transparent"
                  />
                  <span className="font-mono text-sm text-gray-400">{textColor}</span>
                </div>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="font-style" className="mb-2 block text-sm font-medium text-gray-300">
                  Font style
                </label>
                <select
                  id="font-style"
                  value={fontStyle}
                  onChange={(e) => setFontStyle(e.target.value as FontStyle)}
                  className="w-full rounded-lg border border-gray-800 bg-[#111111] px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="sans">Sans-serif</option>
                  <option value="serif">Serif</option>
                  <option value="mono">Monospace</option>
                  <option value="bold">Bold</option>
                </select>
              </div>

              <div>
                <label htmlFor="shape" className="mb-2 block text-sm font-medium text-gray-300">
                  Shape
                </label>
                <select
                  id="shape"
                  value={shape}
                  onChange={(e) => setShape(e.target.value as ShapeStyle)}
                  className="w-full rounded-lg border border-gray-800 bg-[#111111] px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="square">Square</option>
                  <option value="rounded">Rounded</option>
                  <option value="circle">Circle</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Generate Favicon Preview
            </button>
          </form>
        </section>

        <section className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Preview & download</h2>
              <p className="mt-2 text-sm text-gray-400">
                Preview is rendered on a 64×64 canvas. Downloads are exported at 32×32.
              </p>
            </div>
            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
              Canvas 64×64
            </span>
          </div>

          <div className="mb-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-700 bg-[#111111] px-6 py-10">
            <div className="rounded-[28px] border border-gray-800 bg-black p-6 shadow-2xl shadow-blue-500/10">
              <canvas
                ref={previewCanvasRef}
                width={64}
                height={64}
                className="h-32 w-32 rounded-2xl border border-gray-800 bg-transparent"
                aria-label="Favicon preview canvas"
              />
            </div>
            <p className="mt-4 text-center text-sm text-gray-500">
              Live preview of your favicon design.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => void exportCanvas(32, "ico")}
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Download as .ico
            </button>
            <button
              type="button"
              onClick={() => void exportCanvas(32, "png")}
              className="rounded-lg border border-gray-800 bg-gray-800 px-5 py-3 font-semibold text-white transition hover:border-blue-500 hover:bg-gray-700"
            >
              Download as PNG
            </button>
          </div>

          <p className="mt-4 min-h-6 text-sm text-gray-400">{downloadMessage}</p>

          <div className="mt-8 rounded-xl border border-gray-800 bg-[#111111] p-4 text-sm text-gray-400">
            <p className="font-medium text-gray-200">Tips</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>One character usually looks best at tiny favicon sizes.</li>
              <li>High contrast colors improve legibility in browser tabs.</li>
              <li>Rounded and circle shapes feel more app-like; square feels classic.</li>
            </ul>
          </div>
        </section>
      </div>

      <footer className="border-t border-gray-800 px-6 py-8 text-center text-sm text-gray-500">
        <p>
          Built by <a href="/" className="text-blue-500 hover:underline">Cody Labs</a> · An AI-run business with zero employees
        </p>
      </footer>
    </main>
  );
}
