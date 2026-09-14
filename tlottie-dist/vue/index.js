import { computed as e, createCommentVNode as t, createElementBlock as n, defineComponent as r, nextTick as i, normalizeClass as a, normalizeStyle as o, onBeforeUnmount as s, onMounted as c, openBlock as l, ref as u, shallowRef as d, watch as f } from "vue";
//#region src/core/types.ts
var p = {
	None: 0,
	Type12: 1,
	Type3: 2,
	Type4: 3,
	Type5: 4,
	Type6: 5
}, m = {
	antialias: !0,
	curveTolerance: .125
}, h = 1, g = class {
	workers = [];
	nextIndex = -1;
	size;
	constructor(e = h) {
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
}, _ = new g(), v = new URL("" + new URL("tlottie.wasm", import.meta.url).href, "" + import.meta.url), y = 0;
function b() {
	return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : (y += 1, `tlottie-warmup-${Date.now()}-${y}`);
}
function x(e = {}) {
	let t = e.pool ?? (e.workerCount === void 0 ? _ : new g(e.workerCount)), n = (e.wasmUrl ?? v).toString(), r = t.getAllWorkers();
	return Promise.all(r.map((e) => new Promise((t, r) => {
		let i = b(), a = (n) => {
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
var S = /* @__PURE__ */ new Map();
function C(e) {
	let t = S.get(e);
	return t || (t = fetch(e, { cache: "force-cache" }).then((t) => {
		if (!t.ok) throw Error(`tlottie: fetch failed for "${e}" (${t.status})`);
		return t.arrayBuffer();
	}).then((e) => new Uint8Array(e)), t.catch(() => S.delete(e)), S.set(e, t)), t;
}
//#endregion
//#region src/main/TLottie.ts
function w(e) {
	e.workerCount !== void 0 && _.setSize(e.workerCount);
}
var T = /* @__PURE__ */ new Map(), E = typeof IntersectionObserver > "u" ? null : new IntersectionObserver((e) => {
	for (let t of e) {
		let e = t.target.dataset.tlottieId;
		e && T.get(e)?.setObservable(t.isIntersecting);
	}
}), D = 0;
function O() {
	return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : (D += 1, `tlottie-${Date.now()}-${D}`);
}
var k = class {
	id = O();
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
		this.config = e, this.canvas = e.canvas, this.pool = e.pool ?? (e.workerCount === void 0 ? _ : new g(e.workerCount)), requestAnimationFrame(() => {
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
		}), this.destroyed = !0, this.worker?.removeEventListener("message", this.onMessage), this.worker = null, this.resizeObserver?.disconnect(), this.resizeObserver = null, this.resizeRaf && cancelAnimationFrame(this.resizeRaf), E?.unobserve(this.canvas), T.delete(this.id), this.listeners.clear());
	}
	start() {
		this.canvas.dataset.tlottieId = this.id;
		let e = this.canvas.transferControlToOffscreen();
		this.worker = this.pool.getWorker(), this.worker.addEventListener("message", this.onMessage), T.set(this.id, this), E?.observe(this.canvas), typeof ResizeObserver < "u" && (this.resizeObserver = new ResizeObserver(() => this.scheduleResize()), this.resizeObserver.observe(this.canvas));
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
				wasmUrl: (this.config.wasmUrl ?? v).toString(),
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
		if (t) return C(t);
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
				this.frames = t.frames, this.state = A(t.event, this.state), this.emit(t.event, { frames: t.frames });
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
function A(e, t) {
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
function j(e) {
	let t = `url("data:image/svg+xml;base64,${M(e)}")`;
	return {
		maskImage: t,
		WebkitMaskImage: t
	};
}
function M(e) {
	let t = new TextEncoder().encode(e), n = "";
	for (let e = 0; e < t.length; e++) n += String.fromCharCode(t[e]);
	return btoa(n);
}
//#endregion
//#region src/vue/LottiePlayer.vue
var N = /* @__PURE__ */ r({
	__name: "LottiePlayer",
	props: {
		src: {},
		data: {},
		speed: {},
		loop: {},
		direction: {},
		autoplay: { type: Boolean },
		fitzModifier: {},
		layerColorReplacements: {},
		quality: {},
		wasmUrl: {},
		workerCount: {},
		pool: {},
		forceRender: { type: Boolean },
		reportFrames: { type: Boolean },
		outline: {},
		class: {},
		playOnClick: { type: Boolean }
	},
	emits: [
		"load",
		"error",
		"complete"
	],
	setup(r, { expose: p, emit: m }) {
		let h = r, g = m;
		p({ tlottie: () => v.value });
		let _ = u(null), v = d(null), y = u(!1), b = u(!1), x = e(() => h.src === void 0 ? typeof h.data == "string" ? `data:${h.data}` : h.data === void 0 ? "empty" : "data:binary" : `src:${h.src}`), S = null, C = null, w = null;
		function T() {
			if (!_.value) return;
			y.value = !1, b.value = !1;
			let e = new k({
				canvas: _.value,
				src: h.src,
				data: h.data,
				speed: h.speed,
				loop: h.loop,
				direction: h.direction,
				autoplay: h.autoplay,
				fitzModifier: h.fitzModifier,
				layerColorReplacements: h.layerColorReplacements,
				quality: h.quality,
				workerCount: h.workerCount,
				pool: h.pool,
				forceRender: h.forceRender,
				reportFrames: h.reportFrames,
				wasmUrl: h.wasmUrl
			});
			v.value = e, S = (e) => {
				y.value = !0, b.value = !1, g("load", e);
			}, C = (e) => {
				b.value = !0, g("error", e);
			}, w = (e) => g("complete", e), e.on("load", S), e.on("error", C), e.on("complete", w);
		}
		function E() {
			let e = v.value;
			e && (S && e.off("load", S), C && e.off("error", C), w && e.off("complete", w), e.destroy(), v.value = null);
		}
		c(T), s(E), f(x, async () => {
			E(), await i(), T();
		}), f(() => h.speed, (e) => {
			e !== void 0 && v.value?.setSpeed(e);
		}), f(() => h.loop, (e) => {
			e !== void 0 && v.value?.setLoop(e);
		}), f(() => h.direction, (e) => {
			e !== void 0 && v.value?.setDirection(e);
		}), f(() => h.fitzModifier, (e) => {
			e !== void 0 && v.value?.setFitzModifier(e);
		});
		let D = () => h.outline ? j(h.outline) : null;
		function O() {
			h.playOnClick && v.value?.play();
		}
		return (e, r) => (l(), n("div", { class: a(h.class ? `tlottie-player ${h.class}` : "tlottie-player") }, [(l(), n("canvas", {
			key: x.value,
			ref_key: "canvasEl",
			ref: _,
			class: a({ "tlottie-ready": y.value }),
			onClick: O
		}, null, 2)), h.outline ? (l(), n("div", {
			key: 0,
			class: a(["tlottie-shimmer", { "tlottie-hidden": y.value && !b.value }]),
			style: o({
				maskImage: D()?.maskImage,
				WebkitMaskImage: D()?.WebkitMaskImage
			})
		}, null, 6)) : t("", !0)], 2));
	}
});
//#endregion
export { m as DEFAULT_RENDER_QUALITY, p as FitzModifier, N as LottiePlayer, k as TLottie, w as configureTLottie, x as initializeTLottie };
