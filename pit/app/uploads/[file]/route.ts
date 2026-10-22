import { UPLOAD_DIR } from "@/app/lib/upload";
import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  const { file } = await params;

  if (!/^[0-9a-f-]{36}\.webp$/.test(file)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const data = await readFile(path.join(UPLOAD_DIR, file));
    return new Response(new Uint8Array(data), {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
