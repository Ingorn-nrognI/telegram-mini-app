//#region src/worker/pool.ts
var e = class {
	workers = [];
	nextIndex = -1;
	size;
	constructor(e = 1) {
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
}, t = new e(), n = new URL("" + new URL("tlottie.wasm", import.meta.url).href, "" + import.meta.url), r = 0;
function i() {
	return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : (r += 1, `tlottie-warmup-${Date.now()}-${r}`);
}
function a(r = {}) {
	let a = r.pool ?? (r.workerCount === void 0 ? t : new e(r.workerCount)), o = (r.wasmUrl ?? n).toString(), s = a.getAllWorkers();
	return Promise.all(s.map((e) => new Promise((t, n) => {
		let r = i(), a = (i) => {
			let o = i.data;
			(o.type === "warmed" || o.type === "warmup-error") && o.requestId === r && (e.removeEventListener("message", a), o.type === "warmed" ? t() : n(Error(o.message)));
		};
		e.addEventListener("message", a), e.postMessage({
			type: "warmup",
			requestId: r,
			wasmUrl: o
		});
	}))).then(() => void 0);
}
//#endregion
//#region src/main/cache.ts
var o = /* @__PURE__ */ new Map();
function s(e) {
	let t = o.get(e);
	return t || (t = fetch(e, { cache: "force-cache" }).then((t) => {
		if (!t.ok) throw Error(`tlottie: fetch failed for "${e}" (${t.status})`);
		return t.arrayBuffer();
	}).then((e) => new Uint8Array(e)), t.catch(() => o.delete(e)), o.set(e, t)), t;
}
//#endregion
//#region src/main/TLottie.ts
function c(e) {
	e.workerCount !== void 0 && t.setSize(e.workerCount);
}
var l = /* @__PURE__ */ new Map(), u = typeof IntersectionObserver > "u" ? null : new IntersectionObserver((e) => {
	for (let t of e) {
		let e = t.target.dataset.tlottieId;
		e && l.get(e)?.setObservable(t.isIntersecting);
	}
}), d = 0;
function f() {
	return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : (d += 1, `tlottie-${Date.now()}-${d}`);
}
var p = class {
	id = f();
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
	constructor(n) {
		this.config = n, this.canvas = n.canvas, this.pool = n.pool ?? (n.workerCount === void 0 ? t : new e(n.workerCount)), requestAnimationFrame(() => {
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
		}), this.destroyed = !0, this.worker?.removeEventListener("message", this.onMessage), this.worker = null, this.resizeObserver?.disconnect(), this.resizeObserver = null, this.resizeRaf && cancelAnimationFrame(this.resizeRaf), u?.unobserve(this.canvas), l.delete(this.id), this.listeners.clear());
	}
	start() {
		this.canvas.dataset.tlottieId = this.id;
		let e = this.canvas.transferControlToOffscreen();
		this.worker = this.pool.getWorker(), this.worker.addEventListener("message", this.onMessage), l.set(this.id, this), u?.observe(this.canvas), typeof ResizeObserver < "u" && (this.resizeObserver = new ResizeObserver(() => this.scheduleResize()), this.resizeObserver.observe(this.canvas));
		let { width: t, height: n } = this.measure();
		this.loadAndInit(e, t, n);
	}
	async loadAndInit(e, t, r) {
		let i;
		try {
			i = await this.resolveSourceBytes();
		} catch (e) {
			this.handleError({
				reason: "fetch",
				message: e instanceof Error ? e.message : String(e)
			});
			return;
		}
		if (this.destroyed || !this.worker) return;
		let a = i.slice(), o = {
			type: "init",
			id: this.id,
			config: {
				canvas: e,
				animationData: a,
				wasmUrl: (this.config.wasmUrl ?? n).toString(),
				width: t,
				height: r,
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
		this.worker.postMessage(o, [e, a.buffer]);
	}
	async resolveSourceBytes() {
		let { data: e, src: t } = this.config;
		if (e !== void 0) return typeof e == "string" ? new TextEncoder().encode(e) : e;
		if (t) return s(t);
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
				this.frames = t.frames, this.state = m(t.event, this.state), this.emit(t.event, { frames: t.frames });
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
function m(e, t) {
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
function h(e) {
	let t = `url("data:image/svg+xml;base64,${g(e)}")`;
	return {
		maskImage: t,
		WebkitMaskImage: t
	};
}
function g(e) {
	let t = new TextEncoder().encode(e), n = "";
	for (let e = 0; e < t.length; e++) n += String.fromCharCode(t[e]);
	return btoa(n);
}
//#endregion
//#region src/core/types.ts
var _ = {
	None: 0,
	Type12: 1,
	Type3: 2,
	Type4: 3,
	Type5: 4,
	Type6: 5
}, v = {
	antialias: !0,
	curveTolerance: .125
};
//#endregion
//#region src/vanilla/index.ts
function y(e, t) {
	let { outline: n, className: r, playOnClick: i, ...a } = t, o = document.createElement("div");
	o.className = r ? `tlottie-player ${r}` : "tlottie-player";
	let s = document.createElement("canvas");
	o.appendChild(s);
	let c = null;
	if (n) {
		c = document.createElement("div"), c.className = "tlottie-shimmer";
		let e = h(n);
		c.style.setProperty("mask-image", e.maskImage), c.style.setProperty("-webkit-mask-image", e.WebkitMaskImage), o.appendChild(c);
	}
	e.appendChild(o);
	let l = new p({
		...a,
		canvas: s
	}), u = i ? () => l.play() : null;
	u && s.addEventListener("click", u);
	let d = () => {
		s.classList.add("tlottie-ready"), c?.classList.add("tlottie-hidden");
	}, f = () => {
		s.classList.remove("tlottie-ready"), c?.classList.remove("tlottie-hidden");
	};
	return l.on("load", d), l.on("error", f), {
		tlottie: l,
		element: o,
		canvas: s,
		destroy() {
			l.off("load", d), l.off("error", f), u && s.removeEventListener("click", u), l.destroy(), o.remove();
		}
	};
}
//#endregion
//#region src/webcomponent/tlottie-player.ts
var b = [
	"src",
	"data",
	"speed",
	"loop",
	"autoplay",
	"direction",
	"outline",
	"worker-count",
	"fitz",
	"play-on-click"
], x = /* @__PURE__ */ new Set([
	"speed",
	"loop",
	"direction"
]), S = class extends HTMLElement {
	static get observedAttributes() {
		return b;
	}
	handle = null;
	connected = !1;
	explicitData;
	get data() {
		return this.explicitData ?? this.getAttribute("data") ?? void 0;
	}
	set data(e) {
		this.explicitData = e, this.connected && this.mount();
	}
	get tlottie() {
		return this.handle?.tlottie ?? null;
	}
	connectedCallback() {
		this.connected = !0, this.mount();
	}
	disconnectedCallback() {
		this.connected = !1, this.unmount();
	}
	attributeChangedCallback(e) {
		if (this.connected) {
			if (x.has(e)) {
				this.applyLiveTweak(e);
				return;
			}
			this.mount();
		}
	}
	applyLiveTweak(e) {
		let t = this.handle?.tlottie;
		if (t) {
			if (e === "speed") {
				let e = Number(this.getAttribute("speed"));
				Number.isFinite(e) && t.setSpeed(e);
			} else e === "loop" ? t.setLoop(this.readLoop()) : e === "direction" && t.setDirection(this.readDirection());
		}
	}
	readLoop() {
		let e = this.getAttribute("loop");
		if (e === null) return !1;
		if (e === "" || e === "true") return !0;
		if (e === "false") return !1;
		let t = Number(e);
		return !Number.isFinite(t) || t;
	}
	readDirection() {
		return this.getAttribute("direction") === "-1" ? -1 : 1;
	}
	mount() {
		this.unmount();
		let e = this.getAttribute("worker-count"), t = this.getAttribute("fitz"), n = this.getAttribute("speed");
		this.handle = y(this, {
			src: this.getAttribute("src") ?? void 0,
			data: this.data,
			outline: this.getAttribute("outline") ?? void 0,
			speed: n !== null && Number.isFinite(Number(n)) ? Number(n) : void 0,
			loop: this.readLoop(),
			direction: this.readDirection(),
			autoplay: !this.hasAttribute("autoplay") || this.getAttribute("autoplay") !== "false",
			workerCount: e === null ? void 0 : Number(e),
			fitzModifier: t === null ? void 0 : Number(t),
			playOnClick: this.hasAttribute("play-on-click")
		});
	}
	unmount() {
		this.handle?.destroy(), this.handle = null, this.replaceChildren();
	}
};
function C(e = "tlottie-player") {
	customElements.get(e) || customElements.define(e, S);
}
//#endregion
//#region src/webcomponent/index.ts
C();
//#endregion
export { v as DEFAULT_RENDER_QUALITY, _ as FitzModifier, p as TLottie, S as TLottiePlayerElement, c as configureTLottie, a as initializeTLottie, C as registerTLottiePlayerElement };
