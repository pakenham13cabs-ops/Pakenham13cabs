import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders development preview metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, developmentPreviewMeta);
  assert.match(html, /0422 464 986/);
  assert.doesNotMatch(html, /Pakenham13cabs@gmail\.com|mailto:/i);
  assert.match(html, /https:\/\/pakenham13cabs\.com\.au/);
  assert.match(html, /type=["']datetime-local["']/);
  assert.match(html, />Sedan</);
  assert.match(html, />MPTP</);
  assert.match(html, />Cabcharge</);
  assert.match(html, /4 \/ 4\+ passengers/);
  assert.match(html, /name=["']email["']/);
  assert.match(html, /pakenham-taxi-hero\.webp/);
  assert.match(html, /href=["']\/services["']/);
  assert.match(html, /href=["']\/areas["']/);
  assert.doesNotMatch(html, /0498 801 579|dandenongbookings@gmail\.com|pecanum13cabs@gmail\.com/);

  for (const path of ["/services", "/areas", "/fleet", "/booking"]) {
    const page = await worker.fetch(
      new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
      { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
      { waitUntil() {}, passThroughOnException() {} },
    );
    assert.equal(page.status, 200, `${path} should render`);
  }
});

test("uses the taxi photograph with a readable hero overlay", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /pakenham-taxi-hero-bg\.webp/);
  assert.match(css, /\.hero::after\{background:linear-gradient/);
  await access(new URL("../public/images/pakenham-taxi-hero-bg.webp", import.meta.url));
});
