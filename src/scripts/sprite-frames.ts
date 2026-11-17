/* Sprite sheet → one ImageBitmap per frame, decoded and cut in a worker.

   The hero's sheets are huge (the 96-frame one is 8400 x 7840, ~260MB
   decoded). Decoding one with createImageBitmap on the main thread froze
   the page for ~1.5s; the 96 used to arrive on idle, which was right
   during the preloader's hand-over, so the page blinked and the hero's
   focus-in played out unseen. In a worker the same work drops no frames.
   The cut bitmaps are transferred back, not copied.

   Falls back to the main thread if a worker can't be made (an old
   browser, a strict CSP). */

export interface Cut { n: number; cols: number; w: number; h: number; x?: number; y?: number }

const WORKER = `onmessage = async (e) => {
  const { url, n, cols, w, h, x, y } = e.data;
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error(r.status);
    const sheet = await createImageBitmap(await r.blob());
    const cut = await Promise.all(Array.from({ length: n }, (_, f) =>
      createImageBitmap(sheet, (f % cols) * w + x, Math.floor(f / cols) * h + y, w, h)));
    sheet.close();
    postMessage({ cut }, cut);
  } catch (err) { postMessage({ error: String(err) }); }
};`;

const onMain = async (url: string, c: Required<Cut>) => {
  const r = await fetch(url);
  if (!r.ok) throw new Error(String(r.status));
  const sheet = await createImageBitmap(await r.blob());
  const cut = await Promise.all(Array.from({ length: c.n }, (_, f) =>
    createImageBitmap(sheet, (f % c.cols) * c.w + c.x, Math.floor(f / c.cols) * c.h + c.y, c.w, c.h)));
  sheet.close();
  return cut;
};

export function spriteFrames(url: string, cut: Cut): Promise<ImageBitmap[]> {
  const c = { x: 0, y: 0, ...cut };
  const abs = new URL(url, location.href).href;   // a blob worker has no base URL of its own
  let worker: Worker;
  try {
    worker = new Worker(URL.createObjectURL(new Blob([WORKER], { type: 'text/javascript' })));
  } catch {
    return onMain(abs, c);
  }
  return new Promise<ImageBitmap[]>((resolve, reject) => {
    worker.onmessage = (e) => {
      worker.terminate();
      if (e.data.cut) resolve(e.data.cut); else reject(new Error(e.data.error));
    };
    worker.onerror = () => { worker.terminate(); onMain(abs, c).then(resolve, reject); };
    worker.postMessage({ url: abs, ...c });
  });
}
