import "svelte/internal/disclose-version";
import * as e from "svelte/internal/client";
import { untrack as t } from "svelte";
//#region src/core/types.ts
var n = {
	None: 0,
	Type12: 1,
	Type3: 2,
	Type4: 3,
	Type5: 4,
	Type6: 5
}, r = {
	antialias: !0,
	curveTolerance: .125
}, i = 1, a = class {
	workers = [];
	nextIndex = -1;
	size;
	constructor(e = i) {
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
}, o = new a(), s = new URL("" + new URL("tlottie.wasm", import.meta.url).href, "" + import.meta.url), c = 0;
function l() {
	return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : (c += 1, `tlottie-warmup-${Date.now()}-${c}`);
}
function u(e = {}) {
	let t = e.pool ?? (e.workerCount === void 0 ? o : new a(e.workerCount)), n = (e.wasmUrl ?? s).toString(), r = t.getAllWorkers();
	return Promise.all(r.map((e) => new Promise((t, r) => {
		let i = l(), a = (n) => {
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
var d = /* @__PURE__ */ new Map();
function f(e) {
	let t = d.get(e);
	return t || (t = fetch(e, { cache: "force-cache" }).then((t) => {
		if (!t.ok) throw Error(`tlottie: fetch failed for "${e}" (${t.status})`);
		return t.arrayBuffer();
	}).then((e) => new Uint8Array(e)), t.catch(() => d.delete(e)), d.set(e, t)), t;
}
//#endregion
//#region src/main/TLottie.ts
function p(e) {
	e.workerCount !== void 0 && o.setSize(e.workerCount);
}
var m = /* @__PURE__ */ new Map(), h = typeof IntersectionObserver > "u" ? null : new IntersectionObserver((e) => {
	for (let t of e) {
		let e = t.target.dataset.tlottieId;
		e && m.get(e)?.setObservable(t.isIntersecting);
	}
}), g = 0;
function _() {
	return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : (g += 1, `tlottie-${Date.now()}-${g}`);
}
var v = class {
	id = _();
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
		this.config = e, this.canvas = e.canvas, this.pool = e.pool ?? (e.workerCount === void 0 ? o : new a(e.workerCount)), requestAnimationFrame(() => {
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
		}), this.destroyed = !0, this.worker?.removeEventListener("message", this.onMessage), this.worker = null, this.resizeObserver?.disconnect(), this.resizeObserver = null, this.resizeRaf && cancelAnimationFrame(this.resizeRaf), h?.unobserve(this.canvas), m.delete(this.id), this.listeners.clear());
	}
	start() {
		this.canvas.dataset.tlottieId = this.id;
		let e = this.canvas.transferControlToOffscreen();
		this.worker = this.pool.getWorker(), this.worker.addEventListener("message", this.onMessage), m.set(this.id, this), h?.observe(this.canvas), typeof ResizeObserver < "u" && (this.resizeObserver = new ResizeObserver(() => this.scheduleResize()), this.resizeObserver.observe(this.canvas));
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
				wasmUrl: (this.config.wasmUrl ?? s).toString(),
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
		if (t) return f(t);
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
				this.frames = t.frames, this.state = y(t.event, this.state), this.emit(t.event, { frames: t.frames });
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
function y(e, t) {
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
function b(e) {
	let t = `url("data:image/svg+xml;base64,${x(e)}")`;
	return {
		maskImage: t,
		WebkitMaskImage: t
	};
}
function x(e) {
	let t = new TextEncoder().encode(e), n = "";
	for (let e = 0; e < t.length; e++) n += String.fromCharCode(t[e]);
	return btoa(n);
}
//#endregion
//#region src/svelte/LottiePlayer.svelte
var S = e.from_html("<canvas></canvas>"), C = e.from_html("<div></div>"), w = e.from_html("<div><!> <!></div>");
function T(n, r) {
	e.push(r, !0);
	let i = e.state(void 0), a = e.state(!1), o = e.state(!1), s = null, c = e.derived(() => r.src === void 0 ? typeof r.data == "string" ? `data:${r.data}` : r.data === void 0 ? "empty" : "data:binary" : `src:${r.src}`);
	e.user_effect(() => {
		if (!e.get(i)) return;
		let n = e.get(i);
		e.set(a, !1), e.set(o, !1), s = t(() => new v({
			canvas: n,
			src: r.src,
			data: r.data,
			speed: r.speed,
			loop: r.loop,
			direction: r.direction,
			autoplay: r.autoplay,
			fitzModifier: r.fitzModifier,
			layerColorReplacements: r.layerColorReplacements,
			quality: r.quality,
			workerCount: r.workerCount,
			pool: r.pool,
			forceRender: r.forceRender,
			reportFrames: r.reportFrames,
			wasmUrl: r.wasmUrl
		})), r.lottieRefCallback?.(s);
		let c = (t) => {
			e.set(a, !0), e.set(o, !1), r.onLoad?.(t);
		}, l = (t) => {
			e.set(o, !0), r.onError?.(t);
		}, u = (e) => r.onComplete?.(e);
		return s.on("load", c), s.on("error", l), s.on("complete", u), () => {
			s?.off("load", c), s?.off("error", l), s?.off("complete", u), r.lottieRefCallback?.(null), s?.destroy(), s = null;
		};
	}), e.user_effect(() => {
		r.speed !== void 0 && s?.setSpeed(r.speed);
	}), e.user_effect(() => {
		r.loop !== void 0 && s?.setLoop(r.loop);
	}), e.user_effect(() => {
		r.direction !== void 0 && s?.setDirection(r.direction);
	}), e.user_effect(() => {
		r.fitzModifier !== void 0 && s?.setFitzModifier(r.fitzModifier);
	});
	let l = e.derived(() => r.outline ? b(r.outline) : null);
	function u() {
		r.playOnClick && s?.play();
	}
	var d = w(), f = e.child(d);
	e.key(f, () => e.get(c), (t) => {
		var n = S();
		e.bind_this(n, (t) => e.set(i, t), () => e.get(i)), e.template_effect(() => e.set_class(n, 1, e.clsx(e.get(a) ? "tlottie-ready" : void 0))), e.delegated("click", n, u), e.append(t, n);
	});
	var p = e.sibling(f, 2), m = (t) => {
		var n = C();
		let r;
		e.template_effect(() => {
			e.set_class(n, 1, e.clsx(!e.get(a) || e.get(o) ? "tlottie-shimmer" : "tlottie-shimmer tlottie-hidden")), r = e.set_style(n, "", r, {
				"mask-image": e.get(l)?.maskImage,
				"-webkit-mask-image": e.get(l)?.WebkitMaskImage
			});
		}), e.append(t, n);
	};
	e.if(p, (e) => {
		r.outline && e(m);
	}), e.reset(d), e.template_effect(() => e.set_class(d, 1, e.clsx(r.class ? `tlottie-player ${r.class}` : "tlottie-player"))), e.append(n, d), e.pop();
}
e.delegate(["click"]);
//#endregion
export { r as DEFAULT_RENDER_QUALITY, n as FitzModifier, T as LottiePlayer, v as TLottie, p as configureTLottie, u as initializeTLottie };
