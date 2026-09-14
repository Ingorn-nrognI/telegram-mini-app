#!/usr/bin/env node
import { readFileSync as e, writeFileSync as t } from "node:fs";
import { fileURLToPath as n } from "node:url";
import { parseArgs as r } from "node:util";
import { ColorMode as i, Hierarchical as a, PathSimplifyMode as o, optimize as s, vectorizeRaw as c } from "@neplex/vectorizer";
//#region src/core/gzip.ts
var l = 31, u = 139;
function d(e) {
	return e.length >= 2 && e[0] === l && e[1] === u;
}
async function f(e) {
	if (typeof DecompressionStream > "u") throw Error("tlottie: gzip (.tgs) decompression requires DecompressionStream, which is unavailable in this environment");
	let t = new Blob([e]).stream().pipeThrough(new DecompressionStream("gzip")), n = await new Response(t).arrayBuffer();
	return new Uint8Array(n);
}
async function p(e) {
	return d(e) ? f(e) : e;
}
//#endregion
//#region src/core/memory.ts
function m(e, t) {
	let n = t.length;
	if (n === 0) return null;
	let r = e.tlottie_alloc(n);
	return r === 0 ? null : (new Uint8Array(e.memory.buffer, r, n).set(t), {
		ptr: r,
		len: n
	});
}
function h(e, t) {
	t.ptr !== 0 && e.tlottie_free(t.ptr, t.len);
}
function g(e, t, n, r) {
	return new Uint8ClampedArray(e.memory.buffer, t, n * r * 4);
}
function _(e, t, n, r) {
	return new Uint8Array(e.memory.buffer, t, n * r);
}
//#endregion
//#region src/core/types.ts
var v = {
	None: 0,
	Type12: 1,
	Type3: 2,
	Type4: 3,
	Type5: 4,
	Type6: 5
}, y = {
	antialias: !0,
	curveTolerance: .125
}, b = 12, x = class e {
	ptr;
	width;
	height;
	frameRate;
	frameCount;
	exports;
	constructor(e, t) {
		this.exports = e, this.ptr = t, this.width = e.tlottie_width(t), this.height = e.tlottie_height(t), this.frameRate = e.tlottie_frame_rate(t), this.frameCount = Math.max(1, e.tlottie_frame_count(t));
	}
	static create(t, n, r) {
		let i = m(t, n);
		if (!i) return null;
		let a = S(t, r?.layerColorReplacements ?? []);
		if (!a) return h(t, i), null;
		let o = t.tlottie_new_with_options(i.ptr, i.len, r?.fitzModifier ?? v.None, a.arrayPtr, a.arrayLen);
		h(t, i);
		for (let e of a.prefixAllocs) h(t, e);
		return a.arrayLen > 0 && h(t, {
			ptr: a.arrayPtr,
			len: a.arrayLen * b
		}), o === 0 ? null : new e(t, o);
	}
	render(e, t, n, r = y) {
		let i = this.exports.tlottie_render_with_options(this.ptr, e, t, n, +!!r.antialias, r.curveTolerance);
		return i === 0 ? null : g(this.exports, i, t, n);
	}
	renderAlpha8(e, t, n, r = y) {
		let i = this.exports.tlottie_render_alpha8_with_options(this.ptr, e, t, n, +!!r.antialias, r.curveTolerance);
		return i === 0 ? null : _(this.exports, i, t, n);
	}
	renderAlpha8Color(e, t, n, r, i = y) {
		let a = this.exports.tlottie_render_alpha8_color_with_options(this.ptr, e, t, n, +!!i.antialias, r >>> 0, i.curveTolerance);
		return a === 0 ? null : g(this.exports, a, t, n);
	}
	drop() {
		this.ptr !== 0 && (this.exports.tlottie_drop(this.ptr), this.ptr = 0);
	}
};
function S(e, t) {
	if (t.length === 0) return {
		arrayPtr: 0,
		arrayLen: 0,
		prefixAllocs: []
	};
	let n = t.length * b, r = e.tlottie_alloc(n);
	if (r === 0) return null;
	let i = new TextEncoder(), a = [];
	for (let o = 0; o < t.length; o++) {
		let s = m(e, i.encode(t[o].layerNamePrefix)), c = s?.ptr ?? 0, l = s?.len ?? 0;
		s && a.push(s);
		let u = new DataView(e.memory.buffer, r, n);
		u.setUint32(o * b, c, !0), u.setUint32(o * b + 4, l, !0), u.setUint32(o * b + 8, t[o].color >>> 0, !0);
	}
	return {
		arrayPtr: r,
		arrayLen: t.length,
		prefixAllocs: a
	};
}
//#endregion
//#region src/bin/lottie-to-outline.ts
var C = 512;
function w(e) {
	e && console.error(`error: ${e}\n`), console.error([
		"Usage: tlottie-outline --input <file.json|file.tgs> [--output <file.svg>] [--frame <n>] [--size <px>]",
		"",
		"  -i, --input   Path to a Lottie JSON or .tgs (gzipped) file. Required.",
		"  -o, --output  Path to write the outline SVG. Defaults to <input-without-extension>-outline.svg.",
		"  -f, --frame   Frame number to trace. Defaults to 0.",
		`  -s, --size    Raster size (px, square) used for tracing — higher is more accurate and slower. Defaults to ${C}.`
	].join("\n")), process.exit(+!!e);
}
function T() {
	let { values: e } = r({
		args: process.argv.slice(2),
		options: {
			input: {
				type: "string",
				short: "i"
			},
			output: {
				type: "string",
				short: "o"
			},
			frame: {
				type: "string",
				short: "f"
			},
			size: {
				type: "string",
				short: "s"
			},
			help: {
				type: "boolean",
				short: "h"
			}
		},
		strict: !0
	});
	e.help && w(), e.input || w("--input is required");
	let t = e.input, n = e.output ?? `${t.replace(/\.(json|tgs)$/i, "")}-outline.svg`, i = e.frame === void 0 ? 0 : Number(e.frame), a = e.size === void 0 ? C : Number(e.size);
	return (!Number.isFinite(i) || i < 0) && w("--frame must be a non-negative number"), (!Number.isFinite(a) || a <= 0) && w("--size must be a positive number"), {
		input: t,
		output: n,
		frame: i,
		size: a
	};
}
async function E() {
	for (let t of ["../tlottie.wasm", "../core/tlottie.wasm"]) {
		let r = n(new URL(t, import.meta.url));
		try {
			let t = e(r), { instance: n } = await WebAssembly.instantiate(t, {});
			return n.exports;
		} catch (e) {
			if (e.code !== "ENOENT") throw e;
		}
	}
	throw Error("couldn't locate tlottie.wasm next to this script");
}
async function D() {
	let { input: n, output: r, frame: l, size: u } = T(), d;
	try {
		let t = e(n);
		d = await p(new Uint8Array(t));
	} catch (e) {
		w(`couldn't read "${n}": ${e instanceof Error ? e.message : e}`);
	}
	let f = await E(), m = x.create(f, d);
	m || w(`tlottie rejected "${n}" — not valid Lottie JSON`);
	let h = m.render(l, u, u, {
		antialias: !0,
		curveTolerance: .125
	});
	h || w(`render failed for "${n}" at frame ${l}`);
	let g = Buffer.from(h.buffer, h.byteOffset, h.byteLength);
	for (let e = 0; e < g.length; e += 4) g[e + 3] !== 0 && (g[e] = 0, g[e + 1] = 0, g[e + 2] = 0);
	let _ = await c(g, {
		width: u,
		height: u
	}, {
		colorMode: i.Color,
		hierarchical: a.Stacked,
		filterSpeckle: 0,
		colorPrecision: 1,
		layerDifference: 0,
		mode: o.Polygon,
		cornerThreshold: 0,
		lengthThreshold: 0,
		maxIterations: 0,
		spliceThreshold: 0,
		pathPrecision: 0
	}), v = (await s(_, { multipass: !0 })).replace(/\s+width="[^"]*"/, "").replace(/\s+height="[^"]*"/, "").replace(/<svg(?![^>]*viewBox)/, `<svg viewBox="0 0 ${u} ${u}"`).replace(/<svg /, `<svg width="${u}" height="${u}" `);
	t(r, v), m.drop(), console.log(`Wrote ${r} (${(v.length / 1024).toFixed(2)}KB)`);
}
D().catch((e) => {
	console.error(e instanceof Error ? e.message : e), process.exit(1);
});
//#endregion
