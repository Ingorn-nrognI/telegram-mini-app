import { useEffect as e, useRef as t, useState as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/core/types.ts
var a = {
	None: 0,
	Type12: 1,
	Type3: 2,
	Type4: 3,
	Type5: 4,
	Type6: 5
}, o = {
	antialias: !0,
	curveTolerance: .125
}, s = 1, c = class {
	workers = [];
	nextIndex = -1;
	size;
	constructor(e = s) {
		this.size = Math.max(1, e);
	}
	setSize(e) {
		if (e < 1) throw Error("tlottie: worker pool size must be at least 1");
		for (this.size = e; this.workers.length > e;) this.workers.pop()?.terminate();
	}
	getWorker() {
		if (this.workers.length < this.size) {
			let e = new Worker(new URL(
				/* @vite-ignore */
				"" + new URL("assets/tlottie.worker-DNPzh9QI.js", import.meta.url).href,
				"" + import.meta.url
			), { type: "module" });
			return this.workers.push(e), this.nextIndex = this.workers.length - 1, e;
		}
		return this.nextIndex = (this.nextIndex + 1) % this.workers.length, this.workers[this.nextIndex];
	}
	getAllWorkers() {
		for (; this.workers.length < this.size;) this.getWorker();
		return [...this.workers];
	}
	terminateAll() {
		for (let e of this.workers) e.terminate();
		this.workers = [], this.nextIndex = -1;
	}
}, l = new c(), u = new URL("" + new URL("tlottie.wasm", import.meta.url).href, "" + import.meta.url), d = 0;
function f() {
	return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : (d += 1, `tlottie-warmup-${Date.now()}-${d}`);
}
function p(e = {}) {
	let t = e.pool ?? (e.workerCount === void 0 ? l : new c(e.workerCount)), n = (e.wasmUrl ?? u).toString(), r = t.getAllWorkers();
	return Promise.all(r.map((e) => new Promise((t, r) => {
		let i = f(), a = (n) => {
			let o = n.data;
			(o.type === "warmed" || o.type === "warmup-error") && o.requestId === i && (e.removeEventListener("message", a), o.type === "warmed" ? t() : r(Error(o.message)));
		};
		e.addEventListener("message", a), e.postMessage({
			type: "warmup",
			requestId: i,
			wasmUrl: n
		});
	}))).then(() => void 0);
}
//#endregion
//#region src/main/cache.ts
var m = /* @__PURE__ */ new Map();
function h(e) {
	let t = m.get(e);
	return t || (t = fetch(e, { cache: "force-cache" }).then((t) => {
		if (!t.ok) throw Error(`tlottie: fetch failed for "${e}" (${t.status})`);
		return t.arrayBuffer();
	}).then((e) => new Uint8Array(e)), t.catch(() => m.delete(e)), m.set(e, t)), t;
}
//#endregion
//#region src/main/TLottie.ts
function g(e) {
	e.workerCount !== void 0 && l.setSize(e.workerCount);
}
var _ = /* @__PURE__ */ new Map(), v = typeof IntersectionObserver > "u" ? null : new IntersectionObserver((e) => {
	for (let t of e) {
		let e = t.target.dataset.tlottieId;
		e && _.get(e)?.setObservable(t.isIntersecting);
	}
}), y = 0;
function b() {
	return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : (y += 1, `tlottie-${Date.now()}-${y}`);
}
var x = class {
	id = b();
	state = "loading";
	frames = {
		current: 0,
		total: 0
	};
	lastError = null;
	config;
	canvas;
	pool;
	worker = null;
	resizeObserver = null;
	resizeRaf = 0;
	destroyed = !1;
	listeners = /* @__PURE__ */ new Map();
	constructor(e) {
		this.config = e, this.canvas = e.canvas, this.pool = e.pool ?? (e.workerCount === void 0 ? l : new c(e.workerCount)), requestAnimationFrame(() => {
			this.destroyed || this.start();
		});
	}
	on(e, t) {
		let n = this.listeners.get(e);
		n || (n = /* @__PURE__ */ new Set(), this.listeners.set(e, n)), n.add(t);
	}
	off(e, t) {
		this.listeners.get(e)?.delete(t);
	}
	play() {
		this.send({
			type: "control",
			id: this.id,
			action: "play"
		});
	}
	pause() {
		this.send({
			type: "control",
			id: this.id,
			action: "pause"
		});
	}
	stop() {
		this.send({
			type: "control",
			id: this.id,
			action: "stop"
		});
	}
	seek(e) {
		this.send({
			type: "tweak",
			id: this.id,
			action: "seek",
			value: e
		});
	}
	setSpeed(e) {
		this.send({
			type: "tweak",
			id: this.id,
			action: "speed",
			value: e
		});
	}
	setLoop(e) {
		this.send({
			type: "tweak",
			id: this.id,
			action: "loop",
			value: e
		});
	}
	setDirection(e) {
		this.send({
			type: "tweak",
			id: this.id,
			action: "direction",
			value: e
		});
	}
	setFitzModifier(e) {
		this.send({
			type: "recolor",
			id: this.id,
			fitzModifier: e,
			layerColorReplacements: this.config.layerColorReplacements
		});
	}
	setLayerColors(e) {
		this.send({
			type: "recolor",
			id: this.id,
			fitzModifier: this.config.fitzModifier,
			layerColorReplacements: e
		});
	}
	setObservable(e) {
		this.send({
			type: "observability",
			id: this.id,
			observable: e
		});
	}
	destroy() {
		this.destroyed || (this.worker?.postMessage({
			type: "control",
			id: this.id,
			action: "destroy"
		}), this.destroyed = !0, this.worker?.removeEventListener("message", this.onMessage), this.worker = null, this.resizeObserver?.disconnect(), this.resizeObserver = null, this.resizeRaf && cancelAnimationFrame(this.resizeRaf), v?.unobserve(this.canvas), _.delete(this.id), this.listeners.clear());
	}
	start() {
		this.canvas.dataset.tlottieId = this.id;
		let e = this.canvas.transferControlToOffscreen();
		this.worker = this.pool.getWorker(), this.worker.addEventListener("message", this.onMessage), _.set(this.id, this), v?.observe(this.canvas), typeof ResizeObserver < "u" && (this.resizeObserver = new ResizeObserver(() => this.scheduleResize()), this.resizeObserver.observe(this.canvas));
		let { width: t, height: n } = this.measure();
		this.loadAndInit(e, t, n);
	}
	async loadAndInit(e, t, n) {
		let r;
		try {
			r = await this.resolveSourceBytes();
		} catch (e) {
			this.handleError({
				reason: "fetch",
				message: e instanceof Error ? e.message : String(e)
			});
			return;
		}
		if (this.destroyed || !this.worker) return;
		let i = r.slice(), a = {
			type: "init",
			id: this.id,
			config: {
				canvas: e,
				animationData: i,
				wasmUrl: (this.config.wasmUrl ?? u).toString(),
				width: t,
				height: n,
				speed: this.config.speed,
				loop: this.config.loop,
				direction: this.config.direction,
				autoplay: this.config.autoplay,
				fitzModifier: this.config.fitzModifier,
				layerColorReplacements: this.config.layerColorReplacements,
				quality: this.config.quality,
				forceRender: this.config.forceRender,
				reportFrames: this.config.reportFrames
			}
		};
		this.worker.postMessage(a, [e, i.buffer]);
	}
	async resolveSourceBytes() {
		let { data: e, src: t } = this.config;
		if (e !== void 0) return typeof e == "string" ? new TextEncoder().encode(e) : e;
		if (t) return h(t);
		throw Error("tlottie: TLottieConfig requires either `src` or `data`");
	}
	measure() {
		let e = this.canvas.getBoundingClientRect(), t = window.devicePixelRatio || 1;
		return {
			width: Math.max(1, Math.round((e.width || 1) * t)),
			height: Math.max(1, Math.round((e.height || 1) * t))
		};
	}
	scheduleResize() {
		this.resizeRaf ||= requestAnimationFrame(() => {
			if (this.resizeRaf = 0, this.destroyed) return;
			let { width: e, height: t } = this.measure();
			this.send({
				type: "resize",
				id: this.id,
				width: e,
				height: t
			});
		});
	}
	send(e) {
		!this.destroyed && this.worker && this.worker.postMessage(e);
	}
	onMessage = (e) => {
		let t = e.data;
		if (t.type !== "warmed" && t.type !== "warmup-error" && t.id === this.id) switch (t.type) {
			case "meta":
				this.frames = {
					current: 0,
					total: t.frameCount
				}, this.state = "ready", this.emit("load", { frames: this.frames });
				break;
			case "event":
				this.frames = t.frames, this.state = S(t.event, this.state), this.emit(t.event, { frames: t.frames });
				break;
			case "error": this.handleError(t.error);
		}
	};
	handleError(e) {
		this.state = "error", this.lastError = e, this.emit("error", { error: e });
	}
	emit(e, t) {
		let n = this.listeners.get(e);
		if (n) for (let e of n) e(t);
	}
};
function S(e, t) {
	switch (e) {
		case "play": return "playing";
		case "pause": return "paused";
		case "stop": return "stopped";
		case "complete": return "complete";
		default: return t;
	}
}
//#endregion
//#region src/main/shimmer.ts
function C(e) {
	let t = `url("data:image/svg+xml;base64,${w(e)}")`;
	return {
		maskImage: t,
		WebkitMaskImage: t
	};
}
function w(e) {
	let t = new TextEncoder().encode(e), n = "";
	for (let e = 0; e < t.length; e++) n += String.fromCharCode(t[e]);
	return btoa(n);
}
//#endregion
//#region src/react/LottiePlayer.tsx
function T(a) {
	let { src: o, data: s, speed: c, loop: l, direction: u, autoplay: d, fitzModifier: f, layerColorReplacements: p, quality: m, workerCount: h, pool: g, forceRender: _, reportFrames: v, wasmUrl: y, outline: b, playOnClick: S, onLoad: w, onError: T, onComplete: D, lottieRefCallback: O, className: k, ...A } = a, j = t(null), M = t(null), [N, P] = n(!1), [F, I] = n(!1);
	e(() => {
		let e = j.current;
		if (!e) return;
		P(!1), I(!1);
		let t = new x({
			canvas: e,
			src: o,
			data: s,
			speed: c,
			loop: l,
			direction: u,
			autoplay: d,
			fitzModifier: f,
			layerColorReplacements: p,
			quality: m,
			workerCount: h,
			pool: g,
			forceRender: _,
			reportFrames: v,
			wasmUrl: y
		});
		M.current = t, O?.(t);
		let n = (e) => {
			P(!0), I(!1), w?.(e);
		}, r = (e) => {
			I(!0), T?.(e);
		}, i = (e) => D?.(e);
		return t.on("load", n), t.on("error", r), t.on("complete", i), () => {
			t.off("load", n), t.off("error", r), t.off("complete", i), M.current = null, O?.(null), t.destroy();
		};
	}, [o, s]), e(() => {
		c !== void 0 && M.current?.setSpeed(c);
	}, [c]), e(() => {
		l !== void 0 && M.current?.setLoop(l);
	}, [l]), e(() => {
		u !== void 0 && M.current?.setDirection(u);
	}, [u]), e(() => {
		f !== void 0 && M.current?.setFitzModifier(f);
	}, [f]);
	let L = b ? C(b) : null;
	return /* @__PURE__ */ i("div", {
		className: k ? `tlottie-player ${k}` : "tlottie-player",
		...A,
		children: [/* @__PURE__ */ r("canvas", {
			ref: j,
			className: N ? "tlottie-ready" : void 0,
			onClick: S ? () => M.current?.play() : void 0
		}, E(o, s)), b ? /* @__PURE__ */ r("div", {
			className: !N || F ? "tlottie-shimmer" : "tlottie-shimmer tlottie-hidden",
			style: {
				maskImage: L?.maskImage,
				WebkitMaskImage: L?.WebkitMaskImage
			}
		}) : null]
	});
}
function E(e, t) {
	return e === void 0 ? typeof t == "string" ? `data:${t}` : t === void 0 ? "empty" : "data:binary" : `src:${e}`;
}
//#endregion
export { o as DEFAULT_RENDER_QUALITY, a as FitzModifier, T as LottiePlayer, x as TLottie, g as configureTLottie, p as initializeTLottie };
