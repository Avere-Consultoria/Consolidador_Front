import * as e from "react";
import t, { createContext as n, createElement as r, forwardRef as i, useCallback as a, useContext as o, useEffect as s, useLayoutEffect as c, useMemo as l, useRef as u, useState as d } from "react";
import { Fragment as f, jsx as p, jsxs as m } from "react/jsx-runtime";
import * as h from "react-dom";
import g from "react-dom";
//#region \0rolldown/runtime.js
var _ = Object.defineProperty, v = (e, t) => {
	let n = {};
	for (var r in e) _(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || _(n, Symbol.toStringTag, { value: "Module" }), n;
};
//#endregion
//#region node_modules/clsx/dist/clsx.mjs
function y(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var i = e.length;
		for (t = 0; t < i; t++) e[t] && (n = y(e[t])) && (r && (r += " "), r += n);
	} else for (n in e) e[n] && (r && (r += " "), r += n);
	return r;
}
function b() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = y(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region src/utils/cn.ts
function x(...e) {
	return b(e);
}
//#endregion
//#region node_modules/class-variance-authority/dist/index.mjs
var S = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, C = b, w = (e, t) => (n) => {
	if (t?.variants == null) return C(e, n?.class, n?.className);
	let { variants: r, defaultVariants: i } = t, a = Object.keys(r).map((e) => {
		let t = n?.[e], a = i?.[e];
		if (t === null) return null;
		let o = S(t) || S(a);
		return r[e][o];
	}), o = n && Object.entries(n).reduce((e, t) => {
		let [n, r] = t;
		return r === void 0 || (e[n] = r), e;
	}, {});
	return C(e, a, t?.compoundVariants?.reduce((e, t) => {
		let { class: n, className: r, ...a } = t;
		return Object.entries(a).every((e) => {
			let [t, n] = e;
			return Array.isArray(n) ? n.includes({
				...i,
				...o
			}[t]) : {
				...i,
				...o
			}[t] === n;
		}) ? [
			...e,
			n,
			r
		] : e;
	}, []), n?.class, n?.className);
}, T = {
	base: "_base_ufw5x_1",
	h1: "_h1_ufw5x_17",
	h2: "_h2_ufw5x_51",
	p: "_p_ufw5x_81",
	h3: "_h3_ufw5x_97",
	h4: "_h4_ufw5x_127"
}, E = w(T.base, {
	variants: { variant: {
		h1: T.h1,
		h2: T.h2,
		h3: T.h3,
		h4: T.h4,
		p: T.p
	} },
	defaultVariants: { variant: "p" }
}), D = i(({ className: e, variant: t, as: n, ...r }, i) => /* @__PURE__ */ p(n || t || "p", {
	ref: i,
	className: x(E({
		variant: t,
		className: e
	})),
	...r
}));
D.displayName = "Typography";
var O = {
	base: "_base_8hopl_1",
	primaria_solid: "_primaria_solid_8hopl_37",
	primaria_outline: "_primaria_outline_8hopl_55",
	primaria_ghost: "_primaria_ghost_8hopl_67",
	secundaria_solid: "_secundaria_solid_8hopl_87",
	secundaria_outline: "_secundaria_outline_8hopl_105",
	secundaria_ghost: "_secundaria_ghost_8hopl_117",
	alerta_solid: "_alerta_solid_8hopl_137",
	alerta_outline: "_alerta_outline_8hopl_155",
	alerta_ghost: "_alerta_ghost_8hopl_167",
	erro_solid: "_erro_solid_8hopl_187",
	erro_outline: "_erro_outline_8hopl_205",
	erro_ghost: "_erro_ghost_8hopl_217",
	neutro_solid: "_neutro_solid_8hopl_237",
	neutro_outline: "_neutro_outline_8hopl_247",
	neutro_ghost: "_neutro_ghost_8hopl_257"
}, k = w(O.base, {
	variants: {
		intent: {
			primaria: "",
			secundaria: "",
			alerta: "",
			erro: "",
			neutro: ""
		},
		variant: {
			solid: "",
			outline: "",
			ghost: ""
		}
	},
	compoundVariants: [
		{
			intent: "primaria",
			variant: "solid",
			className: O.primaria_solid
		},
		{
			intent: "primaria",
			variant: "outline",
			className: O.primaria_outline
		},
		{
			intent: "primaria",
			variant: "ghost",
			className: O.primaria_ghost
		},
		{
			intent: "secundaria",
			variant: "solid",
			className: O.secundaria_solid
		},
		{
			intent: "secundaria",
			variant: "outline",
			className: O.secundaria_outline
		},
		{
			intent: "secundaria",
			variant: "ghost",
			className: O.secundaria_ghost
		},
		{
			intent: "alerta",
			variant: "solid",
			className: O.alerta_solid
		},
		{
			intent: "alerta",
			variant: "outline",
			className: O.alerta_outline
		},
		{
			intent: "alerta",
			variant: "ghost",
			className: O.alerta_ghost
		},
		{
			intent: "erro",
			variant: "solid",
			className: O.erro_solid
		},
		{
			intent: "erro",
			variant: "outline",
			className: O.erro_outline
		},
		{
			intent: "erro",
			variant: "ghost",
			className: O.erro_ghost
		},
		{
			intent: "neutro",
			variant: "solid",
			className: O.neutro_solid
		},
		{
			intent: "neutro",
			variant: "outline",
			className: O.neutro_outline
		},
		{
			intent: "neutro",
			variant: "ghost",
			className: O.neutro_ghost
		}
	],
	defaultVariants: {
		intent: "primaria",
		variant: "solid"
	}
}), A = i(({ className: e, intent: t, variant: n, ...r }, i) => /* @__PURE__ */ p("div", {
	ref: i,
	className: x(k({
		intent: t,
		variant: n
	}), e),
	...r
}));
A.displayName = "Badge";
var j = {
	container: "_container_3u6a6_1",
	sm: "_sm_3u6a6_35",
	md: "_md_3u6a6_47",
	lg: "_lg_3u6a6_59",
	image: "_image_3u6a6_71",
	initials: "_initials_3u6a6_85"
}, M = i(({ className: e, src: t, alt: n, initials: r, size: i = "md", ...a }, o) => {
	let [s, c] = d(!1), l = !t || s;
	return /* @__PURE__ */ p("div", {
		ref: o,
		className: x(j.container, j[i], e),
		...a,
		children: l ? /* @__PURE__ */ p("span", {
			className: j.initials,
			children: r?.substring(0, 2)
		}) : /* @__PURE__ */ p("img", {
			src: t,
			alt: n || "Avatar",
			className: j.image,
			onError: () => c(!0)
		})
	});
});
M.displayName = "Avatar";
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils.js
var N = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), P = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), F = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, I = i(({ color: e = "currentColor", size: t = 24, strokeWidth: n = 2, absoluteStrokeWidth: i, className: a = "", children: o, iconNode: s, ...c }, l) => r("svg", {
	ref: l,
	...F,
	width: t,
	height: t,
	stroke: e,
	strokeWidth: i ? Number(n) * 24 / Number(t) : n,
	className: P("lucide", a),
	...c
}, [...s.map(([e, t]) => r(e, t)), ...Array.isArray(o) ? o : [o]])), L = (e, t) => {
	let n = i(({ className: n, ...i }, a) => r(I, {
		ref: a,
		iconNode: t,
		className: P(`lucide-${N(e)}`, n),
		...i
	}));
	return n.displayName = `${e}`, n;
}, ee = L("ArrowUpDown", [
	["path", {
		d: "m21 16-4 4-4-4",
		key: "f6ql7i"
	}],
	["path", {
		d: "M17 20V4",
		key: "1ejh1v"
	}],
	["path", {
		d: "m3 8 4-4 4 4",
		key: "11wl7u"
	}],
	["path", {
		d: "M7 4v16",
		key: "1glfcx"
	}]
]), te = L("Calendar", [
	["path", {
		d: "M8 2v4",
		key: "1cmpym"
	}],
	["path", {
		d: "M16 2v4",
		key: "4m81vk"
	}],
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "4",
		rx: "2",
		key: "1hopcy"
	}],
	["path", {
		d: "M3 10h18",
		key: "8toen8"
	}]
]), R = L("Check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]), ne = L("ChevronDown", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]), re = L("ChevronLeft", [["path", {
	d: "m15 18-6-6 6-6",
	key: "1wnfg3"
}]]), ie = L("ChevronRight", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]), ae = L("ChevronsUpDown", [["path", {
	d: "m7 15 5 5 5-5",
	key: "1hf1tw"
}], ["path", {
	d: "m7 9 5-5 5 5",
	key: "sgt6xg"
}]]), oe = L("CircleCheck", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), se = L("Circle", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}]]), ce = L("CloudUpload", [
	["path", {
		d: "M12 13v8",
		key: "1l5pq0"
	}],
	["path", {
		d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
		key: "1pljnt"
	}],
	["path", {
		d: "m8 17 4-4 4 4",
		key: "1quai1"
	}]
]), le = L("EllipsisVertical", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "1",
		key: "41hilf"
	}],
	["circle", {
		cx: "12",
		cy: "5",
		r: "1",
		key: "gxeob9"
	}],
	["circle", {
		cx: "12",
		cy: "19",
		r: "1",
		key: "lyex9k"
	}]
]), ue = L("Ellipsis", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "1",
		key: "41hilf"
	}],
	["circle", {
		cx: "19",
		cy: "12",
		r: "1",
		key: "1wjl8i"
	}],
	["circle", {
		cx: "5",
		cy: "12",
		r: "1",
		key: "1pcz8c"
	}]
]), z = L("File", [["path", {
	d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
	key: "1rqfz7"
}], ["path", {
	d: "M14 2v4a2 2 0 0 0 2 2h4",
	key: "tnqrlb"
}]]), de = L("LoaderCircle", [["path", {
	d: "M21 12a9 9 0 1 1-6.219-8.56",
	key: "13zald"
}]]), fe = L("LogOut", [
	["path", {
		d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
		key: "1uf3rs"
	}],
	["polyline", {
		points: "16 17 21 12 16 7",
		key: "1gabdz"
	}],
	["line", {
		x1: "21",
		x2: "9",
		y1: "12",
		y2: "12",
		key: "1uyos4"
	}]
]), pe = L("Menu", [
	["line", {
		x1: "4",
		x2: "20",
		y1: "12",
		y2: "12",
		key: "1e0a9i"
	}],
	["line", {
		x1: "4",
		x2: "20",
		y1: "6",
		y2: "6",
		key: "1owob3"
	}],
	["line", {
		x1: "4",
		x2: "20",
		y1: "18",
		y2: "18",
		key: "yk5zj1"
	}]
]), me = L("Search", [["circle", {
	cx: "11",
	cy: "11",
	r: "8",
	key: "4ej97u"
}], ["path", {
	d: "m21 21-4.3-4.3",
	key: "1qie3q"
}]]), he = L("X", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]), ge = {
	spinner: "_spinner_x955q_1",
	spin: "_spin_x955q_1",
	sm: "_sm_x955q_11",
	md: "_md_x955q_23",
	lg: "_lg_x955q_35",
	xl: "_xl_x955q_47"
}, _e = {
	skeleton: "_skeleton_1mj2p_1",
	pulse: "_pulse_1mj2p_1"
}, ve = e.forwardRef(({ className: e, size: t = "md", ...n }, r) => /* @__PURE__ */ p(de, {
	ref: r,
	className: x(ge.spinner, ge[t], e),
	...n
}));
ve.displayName = "Spinner";
var ye = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p("div", {
	ref: n,
	className: x(_e.skeleton, e),
	...t
}));
ye.displayName = "Skeleton";
var B = {
	buttonBase: "_buttonBase_92xy7_3",
	sm: "_sm_92xy7_57",
	md: "_md_92xy7_69",
	lg: "_lg_92xy7_81",
	primaria: "_primaria_92xy7_95",
	secundaria: "_secundaria_92xy7_105",
	alerta: "_alerta_92xy7_115",
	erro: "_erro_92xy7_125",
	outline: "_outline_92xy7_137",
	ghost: "_ghost_92xy7_161",
	animateSpin: "_animateSpin_92xy7_183",
	spin: "_spin_92xy7_1"
}, be = w(B.buttonBase, {
	variants: {
		intent: {
			primaria: B.primaria,
			secundaria: B.secundaria,
			alerta: B.alerta,
			erro: B.erro
		},
		variant: {
			solid: "",
			outline: B.outline,
			ghost: B.ghost
		},
		size: {
			sm: B.sm,
			md: B.md,
			lg: B.lg
		}
	},
	defaultVariants: {
		intent: "primaria",
		variant: "solid",
		size: "md"
	}
}), xe = i(({ className: e, intent: t, variant: n, size: r, leftIcon: i, rightIcon: a, children: o, disabled: s, isLoading: c, ...l }, u) => /* @__PURE__ */ m("button", {
	className: b(be({
		intent: t,
		variant: n,
		size: r
	}), e),
	ref: u,
	disabled: s || c,
	"aria-disabled": s || c,
	...l,
	children: [
		c && /* @__PURE__ */ p(de, {
			className: B.animateSpin,
			"aria-hidden": "true"
		}),
		!c && i && /* @__PURE__ */ p(i, { "aria-hidden": "true" }),
		o,
		!c && a && /* @__PURE__ */ p(a, { "aria-hidden": "true" })
	]
}));
xe.displayName = "Button";
var Se = {
	container: "_container_1dt3r_1",
	label: "_label_1dt3r_19",
	relativeWrapper: "_relativeWrapper_1dt3r_35",
	inputBase: "_inputBase_1dt3r_45",
	hasError: "_hasError_1dt3r_109",
	withIcon: "_withIcon_1dt3r_129",
	icon: "_icon_1dt3r_139",
	iconDefault: "_iconDefault_1dt3r_159",
	iconError: "_iconError_1dt3r_167",
	errorMessage: "_errorMessage_1dt3r_177"
}, Ce = w(Se.inputBase, {
	variants: {
		hasError: {
			true: Se.hasError,
			false: ""
		},
		hasIcon: {
			true: Se.withIcon,
			false: ""
		}
	},
	defaultVariants: {
		hasError: !1,
		hasIcon: !1
	}
}), we = i(({ className: e, label: t, error: n, leftIcon: r, id: i, ...a }, o) => {
	let s = i || (t ? `input-${t.replace(/\s+/g, "-").toLowerCase()}` : void 0), c = !!n;
	return /* @__PURE__ */ m("div", {
		className: x(Se.container, e),
		children: [
			t && /* @__PURE__ */ p("label", {
				htmlFor: s,
				className: Se.label,
				children: t
			}),
			/* @__PURE__ */ m("div", {
				className: Se.relativeWrapper,
				children: [r && /* @__PURE__ */ p(r, {
					className: x(Se.icon, c ? Se.iconError : Se.iconDefault),
					"aria-hidden": "true"
				}), /* @__PURE__ */ p("input", {
					id: s,
					ref: o,
					className: x(Ce({
						hasError: c,
						hasIcon: !!r
					})),
					"aria-invalid": c ? "true" : "false",
					"aria-describedby": n ? `${s}-error` : void 0,
					...a
				})]
			}),
			n && /* @__PURE__ */ p("span", {
				id: `${s}-error`,
				className: Se.errorMessage,
				children: n
			})
		]
	});
});
we.displayName = "TextField";
var Te = {
	container: "_container_1o5ti_1",
	disabled: "_disabled_1o5ti_23",
	hiddenInput: "_hiddenInput_1o5ti_35",
	visualBox: "_visualBox_1o5ti_61",
	label: "_label_1o5ti_119",
	iconWrapper: "_iconWrapper_1o5ti_137"
}, Ee = i(({ className: e, label: t, id: n, disabled: r, ...i }, a) => {
	let o = n || (t ? `checkbox-${t.replace(/\s+/g, "-").toLowerCase()}` : void 0);
	return /* @__PURE__ */ m("label", {
		htmlFor: o,
		className: x(Te.container, r && Te.disabled),
		children: [/* @__PURE__ */ m("div", {
			className: Te.iconWrapper,
			children: [/* @__PURE__ */ p("input", {
				type: "checkbox",
				id: o,
				ref: a,
				disabled: r,
				className: Te.hiddenInput,
				...i
			}), /* @__PURE__ */ p("div", {
				className: x(Te.visualBox, e),
				"aria-hidden": "true",
				children: /* @__PURE__ */ p(R, {
					size: 12,
					strokeWidth: 4,
					color: "currentColor"
				})
			})]
		}), t && /* @__PURE__ */ p("span", {
			className: Te.label,
			children: t
		})]
	});
});
Ee.displayName = "Checkbox", typeof window < "u" && window.document && window.document.createElement;
function V(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
	return function(r) {
		if (e?.(r), n === !1 || !r.defaultPrevented) return t?.(r);
	};
}
//#endregion
//#region node_modules/@radix-ui/react-compose-refs/dist/index.mjs
function De(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function Oe(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = De(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : De(e[t], null);
			}
		};
	};
}
function H(...t) {
	return e.useCallback(Oe(...t), t);
}
//#endregion
//#region node_modules/@radix-ui/react-context/dist/index.mjs
function ke(t, n) {
	let r = e.createContext(n), i = (t) => {
		let { children: n, ...i } = t, a = e.useMemo(() => i, Object.values(i));
		return /* @__PURE__ */ p(r.Provider, {
			value: a,
			children: n
		});
	};
	i.displayName = t + "Provider";
	function a(i) {
		let a = e.useContext(r);
		if (a) return a;
		if (n !== void 0) return n;
		throw Error(`\`${i}\` must be used within \`${t}\``);
	}
	return [i, a];
}
function Ae(t, n = []) {
	let r = [];
	function i(n, i) {
		let a = e.createContext(i), o = r.length;
		r = [...r, i];
		let s = (n) => {
			let { scope: r, children: i, ...s } = n, c = r?.[t]?.[o] || a, l = e.useMemo(() => s, Object.values(s));
			return /* @__PURE__ */ p(c.Provider, {
				value: l,
				children: i
			});
		};
		s.displayName = n + "Provider";
		function c(r, s) {
			let c = s?.[t]?.[o] || a, l = e.useContext(c);
			if (l) return l;
			if (i !== void 0) return i;
			throw Error(`\`${r}\` must be used within \`${n}\``);
		}
		return [s, c];
	}
	let a = () => {
		let n = r.map((t) => e.createContext(t));
		return function(r) {
			let i = r?.[t] || n;
			return e.useMemo(() => ({ [`__scope${t}`]: {
				...r,
				[t]: i
			} }), [r, i]);
		};
	};
	return a.scopeName = t, [i, je(a, ...n)];
}
function je(...t) {
	let n = t[0];
	if (t.length === 1) return n;
	let r = () => {
		let r = t.map((e) => ({
			useScope: e(),
			scopeName: e.scopeName
		}));
		return function(t) {
			let i = r.reduce((e, { useScope: n, scopeName: r }) => {
				let i = n(t)[`__scope${r}`];
				return {
					...e,
					...i
				};
			}, {});
			return e.useMemo(() => ({ [`__scope${n.scopeName}`]: i }), [i]);
		};
	};
	return r.scopeName = n.scopeName, r;
}
//#endregion
//#region node_modules/@radix-ui/react-slot/dist/index.mjs
/* @__NO_SIDE_EFFECTS__ */
function Me(t) {
	let n = /* @__PURE__ */ Ne(t), r = e.forwardRef((t, r) => {
		let { children: i, ...a } = t, o = e.Children.toArray(i), s = o.find(Ie);
		if (s) {
			let t = s.props.children, i = o.map((n) => n === s ? e.Children.count(t) > 1 ? e.Children.only(null) : e.isValidElement(t) ? t.props.children : null : n);
			return /* @__PURE__ */ p(n, {
				...a,
				ref: r,
				children: e.isValidElement(t) ? e.cloneElement(t, void 0, i) : null
			});
		}
		return /* @__PURE__ */ p(n, {
			...a,
			ref: r,
			children: i
		});
	});
	return r.displayName = `${t}.Slot`, r;
}
/* @__NO_SIDE_EFFECTS__ */
function Ne(t) {
	let n = e.forwardRef((t, n) => {
		let { children: r, ...i } = t;
		if (e.isValidElement(r)) {
			let t = Re(r), a = Le(i, r.props);
			return r.type !== e.Fragment && (a.ref = n ? Oe(n, t) : t), e.cloneElement(r, a);
		}
		return e.Children.count(r) > 1 ? e.Children.only(null) : null;
	});
	return n.displayName = `${t}.SlotClone`, n;
}
var Pe = Symbol("radix.slottable");
/* @__NO_SIDE_EFFECTS__ */
function Fe(e) {
	let t = ({ children: e }) => /* @__PURE__ */ p(f, { children: e });
	return t.displayName = `${e}.Slottable`, t.__radixId = Pe, t;
}
function Ie(t) {
	return e.isValidElement(t) && typeof t.type == "function" && "__radixId" in t.type && t.type.__radixId === Pe;
}
function Le(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
function Re(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-primitive/dist/index.mjs
var U = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((t, n) => {
	let r = /* @__PURE__ */ Me(`Primitive.${n}`), i = e.forwardRef((e, t) => {
		let { asChild: i, ...a } = e, o = i ? r : n;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ p(o, {
			...a,
			ref: t
		});
	});
	return i.displayName = `Primitive.${n}`, {
		...t,
		[n]: i
	};
}, {});
function ze(e, t) {
	e && h.flushSync(() => e.dispatchEvent(t));
}
//#endregion
//#region node_modules/@radix-ui/react-collection/dist/index.mjs
function Be(e) {
	let n = e + "CollectionProvider", [r, i] = Ae(n), [a, o] = r(n, {
		collectionRef: { current: null },
		itemMap: /* @__PURE__ */ new Map()
	}), s = (e) => {
		let { scope: n, children: r } = e, i = t.useRef(null), o = t.useRef(/* @__PURE__ */ new Map()).current;
		return /* @__PURE__ */ p(a, {
			scope: n,
			itemMap: o,
			collectionRef: i,
			children: r
		});
	};
	s.displayName = n;
	let c = e + "CollectionSlot", l = /* @__PURE__ */ Me(c), u = t.forwardRef((e, t) => {
		let { scope: n, children: r } = e;
		return /* @__PURE__ */ p(l, {
			ref: H(t, o(c, n).collectionRef),
			children: r
		});
	});
	u.displayName = c;
	let d = e + "CollectionItemSlot", f = "data-radix-collection-item", m = /* @__PURE__ */ Me(d), h = t.forwardRef((e, n) => {
		let { scope: r, children: i, ...a } = e, s = t.useRef(null), c = H(n, s), l = o(d, r);
		return t.useEffect(() => (l.itemMap.set(s, {
			ref: s,
			...a
		}), () => void l.itemMap.delete(s))), /* @__PURE__ */ p(m, {
			[f]: "",
			ref: c,
			children: i
		});
	});
	h.displayName = d;
	function g(n) {
		let r = o(e + "CollectionConsumer", n);
		return t.useCallback(() => {
			let e = r.collectionRef.current;
			if (!e) return [];
			let t = Array.from(e.querySelectorAll(`[${f}]`));
			return Array.from(r.itemMap.values()).sort((e, n) => t.indexOf(e.ref.current) - t.indexOf(n.ref.current));
		}, [r.collectionRef, r.itemMap]);
	}
	return [
		{
			Provider: s,
			Slot: u,
			ItemSlot: h
		},
		g,
		i
	];
}
//#endregion
//#region node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var Ve = globalThis?.document ? e.useLayoutEffect : () => {}, He = e.useId || (() => void 0), Ue = 0;
function We(t) {
	let [n, r] = e.useState(He());
	return Ve(() => {
		t || r((e) => e ?? String(Ue++));
	}, [t]), t || (n ? `radix-${n}` : "");
}
//#endregion
//#region node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
function Ge(t) {
	let n = e.useRef(t);
	return e.useEffect(() => {
		n.current = t;
	}), e.useMemo(() => (...e) => n.current?.(...e), []);
}
//#endregion
//#region node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var Ke = e.useInsertionEffect || Ve;
function qe({ prop: t, defaultProp: n, onChange: r = () => {}, caller: i }) {
	let [a, o, s] = Je({
		defaultProp: n,
		onChange: r
	}), c = t !== void 0, l = c ? t : a;
	{
		let n = e.useRef(t !== void 0);
		e.useEffect(() => {
			let e = n.current;
			if (e !== c) {
				let t = e ? "controlled" : "uncontrolled", n = c ? "controlled" : "uncontrolled";
				console.warn(`${i} is changing from ${t} to ${n}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`);
			}
			n.current = c;
		}, [c, i]);
	}
	return [l, e.useCallback((e) => {
		if (c) {
			let n = Ye(e) ? e(t) : e;
			n !== t && s.current?.(n);
		} else o(e);
	}, [
		c,
		t,
		o,
		s
	])];
}
function Je({ defaultProp: t, onChange: n }) {
	let [r, i] = e.useState(t), a = e.useRef(r), o = e.useRef(n);
	return Ke(() => {
		o.current = n;
	}, [n]), e.useEffect(() => {
		a.current !== r && (o.current?.(r), a.current = r);
	}, [r, a]), [
		r,
		i,
		o
	];
}
function Ye(e) {
	return typeof e == "function";
}
//#endregion
//#region node_modules/@radix-ui/react-direction/dist/index.mjs
var Xe = e.createContext(void 0);
function Ze(t) {
	let n = e.useContext(Xe);
	return t || n || "ltr";
}
//#endregion
//#region node_modules/@radix-ui/react-roving-focus/dist/index.mjs
var Qe = "rovingFocusGroup.onEntryFocus", $e = {
	bubbles: !1,
	cancelable: !0
}, et = "RovingFocusGroup", [tt, nt, rt] = Be(et), [it, at] = Ae(et, [rt]), [ot, st] = it(et), ct = e.forwardRef((e, t) => /* @__PURE__ */ p(tt.Provider, {
	scope: e.__scopeRovingFocusGroup,
	children: /* @__PURE__ */ p(tt.Slot, {
		scope: e.__scopeRovingFocusGroup,
		children: /* @__PURE__ */ p(lt, {
			...e,
			ref: t
		})
	})
}));
ct.displayName = et;
var lt = e.forwardRef((t, n) => {
	let { __scopeRovingFocusGroup: r, orientation: i, loop: a = !1, dir: o, currentTabStopId: s, defaultCurrentTabStopId: c, onCurrentTabStopIdChange: l, onEntryFocus: u, preventScrollOnEntryFocus: d = !1, ...f } = t, m = e.useRef(null), h = H(n, m), g = Ze(o), [_, v] = qe({
		prop: s,
		defaultProp: c ?? null,
		onChange: l,
		caller: et
	}), [y, b] = e.useState(!1), x = Ge(u), S = nt(r), C = e.useRef(!1), [w, T] = e.useState(0);
	return e.useEffect(() => {
		let e = m.current;
		if (e) return e.addEventListener(Qe, x), () => e.removeEventListener(Qe, x);
	}, [x]), /* @__PURE__ */ p(ot, {
		scope: r,
		orientation: i,
		dir: g,
		loop: a,
		currentTabStopId: _,
		onItemFocus: e.useCallback((e) => v(e), [v]),
		onItemShiftTab: e.useCallback(() => b(!0), []),
		onFocusableItemAdd: e.useCallback(() => T((e) => e + 1), []),
		onFocusableItemRemove: e.useCallback(() => T((e) => e - 1), []),
		children: /* @__PURE__ */ p(U.div, {
			tabIndex: y || w === 0 ? -1 : 0,
			"data-orientation": i,
			...f,
			ref: h,
			style: {
				outline: "none",
				...t.style
			},
			onMouseDown: V(t.onMouseDown, () => {
				C.current = !0;
			}),
			onFocus: V(t.onFocus, (e) => {
				let t = !C.current;
				if (e.target === e.currentTarget && t && !y) {
					let t = new CustomEvent(Qe, $e);
					if (e.currentTarget.dispatchEvent(t), !t.defaultPrevented) {
						let e = S().filter((e) => e.focusable);
						ht([
							e.find((e) => e.active),
							e.find((e) => e.id === _),
							...e
						].filter(Boolean).map((e) => e.ref.current), d);
					}
				}
				C.current = !1;
			}),
			onBlur: V(t.onBlur, () => b(!1))
		})
	});
}), ut = "RovingFocusGroupItem", dt = e.forwardRef((t, n) => {
	let { __scopeRovingFocusGroup: r, focusable: i = !0, active: a = !1, tabStopId: o, children: s, ...c } = t, l = We(), u = o || l, d = st(ut, r), f = d.currentTabStopId === u, m = nt(r), { onFocusableItemAdd: h, onFocusableItemRemove: g, currentTabStopId: _ } = d;
	return e.useEffect(() => {
		if (i) return h(), () => g();
	}, [
		i,
		h,
		g
	]), /* @__PURE__ */ p(tt.ItemSlot, {
		scope: r,
		id: u,
		focusable: i,
		active: a,
		children: /* @__PURE__ */ p(U.span, {
			tabIndex: f ? 0 : -1,
			"data-orientation": d.orientation,
			...c,
			ref: n,
			onMouseDown: V(t.onMouseDown, (e) => {
				i ? d.onItemFocus(u) : e.preventDefault();
			}),
			onFocus: V(t.onFocus, () => d.onItemFocus(u)),
			onKeyDown: V(t.onKeyDown, (e) => {
				if (e.key === "Tab" && e.shiftKey) {
					d.onItemShiftTab();
					return;
				}
				if (e.target !== e.currentTarget) return;
				let t = mt(e, d.orientation, d.dir);
				if (t !== void 0) {
					if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
					e.preventDefault();
					let n = m().filter((e) => e.focusable).map((e) => e.ref.current);
					if (t === "last") n.reverse();
					else if (t === "prev" || t === "next") {
						t === "prev" && n.reverse();
						let r = n.indexOf(e.currentTarget);
						n = d.loop ? gt(n, r + 1) : n.slice(r + 1);
					}
					setTimeout(() => ht(n));
				}
			}),
			children: typeof s == "function" ? s({
				isCurrentTabStop: f,
				hasTabStop: _ != null
			}) : s
		})
	});
});
dt.displayName = ut;
var ft = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function pt(e, t) {
	return t === "rtl" ? e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e : e;
}
function mt(e, t, n) {
	let r = pt(e.key, n);
	if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r))) return ft[r];
}
function ht(e, t = !1) {
	let n = document.activeElement;
	for (let r of e) if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function gt(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
var _t = ct, vt = dt;
//#endregion
//#region node_modules/@radix-ui/react-use-size/dist/index.mjs
function yt(t) {
	let [n, r] = e.useState(void 0);
	return Ve(() => {
		if (t) {
			r({
				width: t.offsetWidth,
				height: t.offsetHeight
			});
			let e = new ResizeObserver((e) => {
				if (!Array.isArray(e) || !e.length) return;
				let n = e[0], i, a;
				if ("borderBoxSize" in n) {
					let e = n.borderBoxSize, t = Array.isArray(e) ? e[0] : e;
					i = t.inlineSize, a = t.blockSize;
				} else i = t.offsetWidth, a = t.offsetHeight;
				r({
					width: i,
					height: a
				});
			});
			return e.observe(t, { box: "border-box" }), () => e.unobserve(t);
		} else r(void 0);
	}, [t]), n;
}
//#endregion
//#region node_modules/@radix-ui/react-use-previous/dist/index.mjs
function bt(t) {
	let n = e.useRef({
		value: t,
		previous: t
	});
	return e.useMemo(() => (n.current.value !== t && (n.current.previous = n.current.value, n.current.value = t), n.current.previous), [t]);
}
//#endregion
//#region node_modules/@radix-ui/react-presence/dist/index.mjs
function xt(t, n) {
	return e.useReducer((e, t) => n[e][t] ?? e, t);
}
var St = (t) => {
	let { present: n, children: r } = t, i = Ct(n), a = typeof r == "function" ? r({ present: i.isPresent }) : e.Children.only(r), o = H(i.ref, Tt(a));
	return typeof r == "function" || i.isPresent ? e.cloneElement(a, { ref: o }) : null;
};
St.displayName = "Presence";
function Ct(t) {
	let [n, r] = e.useState(), i = e.useRef(null), a = e.useRef(t), o = e.useRef("none"), [s, c] = xt(t ? "mounted" : "unmounted", {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	});
	return e.useEffect(() => {
		let e = wt(i.current);
		o.current = s === "mounted" ? e : "none";
	}, [s]), Ve(() => {
		let e = i.current, n = a.current;
		if (n !== t) {
			let r = o.current, i = wt(e);
			t ? c("MOUNT") : i === "none" || e?.display === "none" ? c("UNMOUNT") : c(n && r !== i ? "ANIMATION_OUT" : "UNMOUNT"), a.current = t;
		}
	}, [t, c]), Ve(() => {
		if (n) {
			let e, t = n.ownerDocument.defaultView ?? window, r = (r) => {
				let o = wt(i.current).includes(CSS.escape(r.animationName));
				if (r.target === n && o && (c("ANIMATION_END"), !a.current)) {
					let r = n.style.animationFillMode;
					n.style.animationFillMode = "forwards", e = t.setTimeout(() => {
						n.style.animationFillMode === "forwards" && (n.style.animationFillMode = r);
					});
				}
			}, s = (e) => {
				e.target === n && (o.current = wt(i.current));
			};
			return n.addEventListener("animationstart", s), n.addEventListener("animationcancel", r), n.addEventListener("animationend", r), () => {
				t.clearTimeout(e), n.removeEventListener("animationstart", s), n.removeEventListener("animationcancel", r), n.removeEventListener("animationend", r);
			};
		} else c("ANIMATION_END");
	}, [n, c]), {
		isPresent: ["mounted", "unmountSuspended"].includes(s),
		ref: e.useCallback((e) => {
			i.current = e ? getComputedStyle(e) : null, r(e);
		}, [])
	};
}
function wt(e) {
	return e?.animationName || "none";
}
function Tt(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-radio-group/dist/index.mjs
var Et = "Radio", [Dt, Ot] = Ae(Et), [kt, At] = Dt(Et), jt = e.forwardRef((t, n) => {
	let { __scopeRadio: r, name: i, checked: a = !1, required: o, disabled: s, value: c = "on", onCheck: l, form: u, ...d } = t, [f, h] = e.useState(null), g = H(n, (e) => h(e)), _ = e.useRef(!1), v = f ? u || !!f.closest("form") : !0;
	return /* @__PURE__ */ m(kt, {
		scope: r,
		checked: a,
		disabled: s,
		children: [/* @__PURE__ */ p(U.button, {
			type: "button",
			role: "radio",
			"aria-checked": a,
			"data-state": It(a),
			"data-disabled": s ? "" : void 0,
			disabled: s,
			value: c,
			...d,
			ref: g,
			onClick: V(t.onClick, (e) => {
				a || l?.(), v && (_.current = e.isPropagationStopped(), _.current || e.stopPropagation());
			})
		}), v && /* @__PURE__ */ p(Ft, {
			control: f,
			bubbles: !_.current,
			name: i,
			value: c,
			checked: a,
			required: o,
			disabled: s,
			form: u,
			style: { transform: "translateX(-100%)" }
		})]
	});
});
jt.displayName = Et;
var Mt = "RadioIndicator", Nt = e.forwardRef((e, t) => {
	let { __scopeRadio: n, forceMount: r, ...i } = e, a = At(Mt, n);
	return /* @__PURE__ */ p(St, {
		present: r || a.checked,
		children: /* @__PURE__ */ p(U.span, {
			"data-state": It(a.checked),
			"data-disabled": a.disabled ? "" : void 0,
			...i,
			ref: t
		})
	});
});
Nt.displayName = Mt;
var Pt = "RadioBubbleInput", Ft = e.forwardRef(({ __scopeRadio: t, control: n, checked: r, bubbles: i = !0, ...a }, o) => {
	let s = e.useRef(null), c = H(s, o), l = bt(r), u = yt(n);
	return e.useEffect(() => {
		let e = s.current;
		if (!e) return;
		let t = window.HTMLInputElement.prototype, n = Object.getOwnPropertyDescriptor(t, "checked").set;
		if (l !== r && n) {
			let t = new Event("click", { bubbles: i });
			n.call(e, r), e.dispatchEvent(t);
		}
	}, [
		l,
		r,
		i
	]), /* @__PURE__ */ p(U.input, {
		type: "radio",
		"aria-hidden": !0,
		defaultChecked: r,
		...a,
		tabIndex: -1,
		ref: c,
		style: {
			...a.style,
			...u,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0
		}
	});
});
Ft.displayName = Pt;
function It(e) {
	return e ? "checked" : "unchecked";
}
var Lt = [
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight"
], Rt = "RadioGroup", [zt, Bt] = Ae(Rt, [at, Ot]), Vt = at(), Ht = Ot(), [Ut, Wt] = zt(Rt), Gt = e.forwardRef((e, t) => {
	let { __scopeRadioGroup: n, name: r, defaultValue: i, value: a, required: o = !1, disabled: s = !1, orientation: c, dir: l, loop: u = !0, onValueChange: d, ...f } = e, m = Vt(n), h = Ze(l), [g, _] = qe({
		prop: a,
		defaultProp: i ?? null,
		onChange: d,
		caller: Rt
	});
	return /* @__PURE__ */ p(Ut, {
		scope: n,
		name: r,
		required: o,
		disabled: s,
		value: g,
		onValueChange: _,
		children: /* @__PURE__ */ p(_t, {
			asChild: !0,
			...m,
			orientation: c,
			dir: h,
			loop: u,
			children: /* @__PURE__ */ p(U.div, {
				role: "radiogroup",
				"aria-required": o,
				"aria-orientation": c,
				"data-disabled": s ? "" : void 0,
				dir: h,
				...f,
				ref: t
			})
		})
	});
});
Gt.displayName = Rt;
var Kt = "RadioGroupItem", qt = e.forwardRef((t, n) => {
	let { __scopeRadioGroup: r, disabled: i, ...a } = t, o = Wt(Kt, r), s = o.disabled || i, c = Vt(r), l = Ht(r), u = e.useRef(null), d = H(n, u), f = o.value === a.value, m = e.useRef(!1);
	return e.useEffect(() => {
		let e = (e) => {
			Lt.includes(e.key) && (m.current = !0);
		}, t = () => m.current = !1;
		return document.addEventListener("keydown", e), document.addEventListener("keyup", t), () => {
			document.removeEventListener("keydown", e), document.removeEventListener("keyup", t);
		};
	}, []), /* @__PURE__ */ p(vt, {
		asChild: !0,
		...c,
		focusable: !s,
		active: f,
		children: /* @__PURE__ */ p(jt, {
			disabled: s,
			required: o.required,
			checked: f,
			...l,
			...a,
			name: o.name,
			ref: d,
			onCheck: () => o.onValueChange(a.value),
			onKeyDown: V((e) => {
				e.key === "Enter" && e.preventDefault();
			}),
			onFocus: V(a.onFocus, () => {
				m.current && u.current?.click();
			})
		})
	});
});
qt.displayName = Kt;
var Jt = "RadioGroupIndicator", Yt = e.forwardRef((e, t) => {
	let { __scopeRadioGroup: n, ...r } = e;
	return /* @__PURE__ */ p(Nt, {
		...Ht(n),
		...r,
		ref: t
	});
});
Yt.displayName = Jt;
var Xt = Gt, Zt = qt, Qt = Yt, $t = {
	root: "_root_brp5y_1",
	itemWrapper: "_itemWrapper_brp5y_13",
	radioItem: "_radioItem_brp5y_27",
	indicator: "_indicator_brp5y_89",
	icon: "_icon_brp5y_105",
	label: "_label_brp5y_119",
	labelText: "_labelText_brp5y_139",
	labelTextDisabled: "_labelTextDisabled_brp5y_151"
}, en = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p(Xt, {
	className: x($t.root, e),
	...t,
	ref: n
}));
en.displayName = Xt.displayName;
var tn = e.forwardRef(({ className: t, label: n, id: r, ...i }, a) => {
	let o = e.useId(), s = r || o;
	return /* @__PURE__ */ m("div", {
		className: $t.itemWrapper,
		children: [/* @__PURE__ */ p(Zt, {
			ref: a,
			id: s,
			className: x($t.radioItem, t),
			...i,
			children: /* @__PURE__ */ p(Qt, {
				className: $t.indicator,
				children: /* @__PURE__ */ p(se, { className: $t.icon })
			})
		}), n && /* @__PURE__ */ p("label", {
			htmlFor: s,
			className: $t.label,
			children: /* @__PURE__ */ p(D, {
				as: "span",
				variant: "p",
				className: x($t.labelText, i.disabled && $t.labelTextDisabled),
				style: { color: "var(--color-secundaria)" },
				children: n
			})
		})]
	});
});
tn.displayName = "RadioItem";
//#endregion
//#region node_modules/@radix-ui/number/dist/index.mjs
function nn(e, [t, n]) {
	return Math.min(n, Math.max(t, e));
}
//#endregion
//#region node_modules/@radix-ui/react-slider/dist/index.mjs
var rn = ["PageUp", "PageDown"], an = [
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight"
], on = {
	"from-left": [
		"Home",
		"PageDown",
		"ArrowDown",
		"ArrowLeft"
	],
	"from-right": [
		"Home",
		"PageDown",
		"ArrowDown",
		"ArrowRight"
	],
	"from-bottom": [
		"Home",
		"PageDown",
		"ArrowDown",
		"ArrowLeft"
	],
	"from-top": [
		"Home",
		"PageDown",
		"ArrowUp",
		"ArrowLeft"
	]
}, sn = "Slider", [cn, ln, un] = Be(sn), [dn, fn] = Ae(sn, [un]), [pn, mn] = dn(sn), hn = e.forwardRef((t, n) => {
	let { name: r, min: i = 0, max: a = 100, step: o = 1, orientation: s = "horizontal", disabled: c = !1, minStepsBetweenThumbs: l = 0, defaultValue: u = [i], value: d, onValueChange: f = () => {}, onValueCommit: m = () => {}, inverted: h = !1, form: g, ..._ } = t, v = e.useRef(/* @__PURE__ */ new Set()), y = e.useRef(0), b = s === "horizontal" ? vn : yn, [x = [], S] = qe({
		prop: d,
		defaultProp: u,
		onChange: (e) => {
			[...v.current][y.current]?.focus(), f(e);
		}
	}), C = e.useRef(x);
	function w(e) {
		D(e, Nn(x, e));
	}
	function T(e) {
		D(e, y.current);
	}
	function E() {
		let e = C.current[y.current];
		x[y.current] !== e && m(x);
	}
	function D(e, t, { commit: n } = { commit: !1 }) {
		let r = Rn(o), s = nn(zn(Math.round((e - i) / o) * o + i, r), [i, a]);
		S((e = []) => {
			let r = An(e, s, t);
			if (In(r, l * o)) {
				y.current = r.indexOf(s);
				let t = String(r) !== String(e);
				return t && n && m(r), t ? r : e;
			} else return e;
		});
	}
	return /* @__PURE__ */ p(pn, {
		scope: t.__scopeSlider,
		name: r,
		disabled: c,
		min: i,
		max: a,
		valueIndexToChangeRef: y,
		thumbs: v.current,
		values: x,
		orientation: s,
		form: g,
		children: /* @__PURE__ */ p(cn.Provider, {
			scope: t.__scopeSlider,
			children: /* @__PURE__ */ p(cn.Slot, {
				scope: t.__scopeSlider,
				children: /* @__PURE__ */ p(b, {
					"aria-disabled": c,
					"data-disabled": c ? "" : void 0,
					..._,
					ref: n,
					onPointerDown: V(_.onPointerDown, () => {
						c || (C.current = x);
					}),
					min: i,
					max: a,
					inverted: h,
					onSlideStart: c ? void 0 : w,
					onSlideMove: c ? void 0 : T,
					onSlideEnd: c ? void 0 : E,
					onHomeKeyDown: () => !c && D(i, 0, { commit: !0 }),
					onEndKeyDown: () => !c && D(a, x.length - 1, { commit: !0 }),
					onStepKeyDown: ({ event: e, direction: t }) => {
						if (!c) {
							let n = rn.includes(e.key) || e.shiftKey && an.includes(e.key) ? 10 : 1, r = y.current, i = x[r];
							D(i + o * n * t, r, { commit: !0 });
						}
					}
				})
			})
		})
	});
});
hn.displayName = sn;
var [gn, _n] = dn(sn, {
	startEdge: "left",
	endEdge: "right",
	size: "width",
	direction: 1
}), vn = e.forwardRef((t, n) => {
	let { min: r, max: i, dir: a, inverted: o, onSlideStart: s, onSlideMove: c, onSlideEnd: l, onStepKeyDown: u, ...d } = t, [f, m] = e.useState(null), h = H(n, (e) => m(e)), g = e.useRef(void 0), _ = Ze(a), v = _ === "ltr", y = v && !o || !v && o;
	function b(e) {
		let t = g.current || f.getBoundingClientRect(), n = Ln([0, t.width], y ? [r, i] : [i, r]);
		return g.current = t, n(e - t.left);
	}
	return /* @__PURE__ */ p(gn, {
		scope: t.__scopeSlider,
		startEdge: y ? "left" : "right",
		endEdge: y ? "right" : "left",
		direction: y ? 1 : -1,
		size: "width",
		children: /* @__PURE__ */ p(bn, {
			dir: _,
			"data-orientation": "horizontal",
			...d,
			ref: h,
			style: {
				...d.style,
				"--radix-slider-thumb-transform": "translateX(-50%)"
			},
			onSlideStart: (e) => {
				let t = b(e.clientX);
				s?.(t);
			},
			onSlideMove: (e) => {
				let t = b(e.clientX);
				c?.(t);
			},
			onSlideEnd: () => {
				g.current = void 0, l?.();
			},
			onStepKeyDown: (e) => {
				let t = on[y ? "from-left" : "from-right"].includes(e.key);
				u?.({
					event: e,
					direction: t ? -1 : 1
				});
			}
		})
	});
}), yn = e.forwardRef((t, n) => {
	let { min: r, max: i, inverted: a, onSlideStart: o, onSlideMove: s, onSlideEnd: c, onStepKeyDown: l, ...u } = t, d = e.useRef(null), f = H(n, d), m = e.useRef(void 0), h = !a;
	function g(e) {
		let t = m.current || d.current.getBoundingClientRect(), n = Ln([0, t.height], h ? [i, r] : [r, i]);
		return m.current = t, n(e - t.top);
	}
	return /* @__PURE__ */ p(gn, {
		scope: t.__scopeSlider,
		startEdge: h ? "bottom" : "top",
		endEdge: h ? "top" : "bottom",
		size: "height",
		direction: h ? 1 : -1,
		children: /* @__PURE__ */ p(bn, {
			"data-orientation": "vertical",
			...u,
			ref: f,
			style: {
				...u.style,
				"--radix-slider-thumb-transform": "translateY(50%)"
			},
			onSlideStart: (e) => {
				let t = g(e.clientY);
				o?.(t);
			},
			onSlideMove: (e) => {
				let t = g(e.clientY);
				s?.(t);
			},
			onSlideEnd: () => {
				m.current = void 0, c?.();
			},
			onStepKeyDown: (e) => {
				let t = on[h ? "from-bottom" : "from-top"].includes(e.key);
				l?.({
					event: e,
					direction: t ? -1 : 1
				});
			}
		})
	});
}), bn = e.forwardRef((e, t) => {
	let { __scopeSlider: n, onSlideStart: r, onSlideMove: i, onSlideEnd: a, onHomeKeyDown: o, onEndKeyDown: s, onStepKeyDown: c, ...l } = e, u = mn(sn, n);
	return /* @__PURE__ */ p(U.span, {
		...l,
		ref: t,
		onKeyDown: V(e.onKeyDown, (e) => {
			e.key === "Home" ? (o(e), e.preventDefault()) : e.key === "End" ? (s(e), e.preventDefault()) : rn.concat(an).includes(e.key) && (c(e), e.preventDefault());
		}),
		onPointerDown: V(e.onPointerDown, (e) => {
			let t = e.target;
			t.setPointerCapture(e.pointerId), e.preventDefault(), u.thumbs.has(t) ? t.focus() : r(e);
		}),
		onPointerMove: V(e.onPointerMove, (e) => {
			e.target.hasPointerCapture(e.pointerId) && i(e);
		}),
		onPointerUp: V(e.onPointerUp, (e) => {
			let t = e.target;
			t.hasPointerCapture(e.pointerId) && (t.releasePointerCapture(e.pointerId), a(e));
		})
	});
}), xn = "SliderTrack", Sn = e.forwardRef((e, t) => {
	let { __scopeSlider: n, ...r } = e, i = mn(xn, n);
	return /* @__PURE__ */ p(U.span, {
		"data-disabled": i.disabled ? "" : void 0,
		"data-orientation": i.orientation,
		...r,
		ref: t
	});
});
Sn.displayName = xn;
var Cn = "SliderRange", wn = e.forwardRef((t, n) => {
	let { __scopeSlider: r, ...i } = t, a = mn(Cn, r), o = _n(Cn, r), s = H(n, e.useRef(null)), c = a.values.length, l = a.values.map((e) => jn(e, a.min, a.max)), u = c > 1 ? Math.min(...l) : 0, d = 100 - Math.max(...l);
	return /* @__PURE__ */ p(U.span, {
		"data-orientation": a.orientation,
		"data-disabled": a.disabled ? "" : void 0,
		...i,
		ref: s,
		style: {
			...t.style,
			[o.startEdge]: u + "%",
			[o.endEdge]: d + "%"
		}
	});
});
wn.displayName = Cn;
var Tn = "SliderThumb", En = e.forwardRef((t, n) => {
	let r = ln(t.__scopeSlider), [i, a] = e.useState(null), o = H(n, (e) => a(e)), s = e.useMemo(() => i ? r().findIndex((e) => e.ref.current === i) : -1, [r, i]);
	return /* @__PURE__ */ p(Dn, {
		...t,
		ref: o,
		index: s
	});
}), Dn = e.forwardRef((t, n) => {
	let { __scopeSlider: r, index: i, name: a, ...o } = t, s = mn(Tn, r), c = _n(Tn, r), [l, u] = e.useState(null), d = H(n, (e) => u(e)), f = l ? s.form || !!l.closest("form") : !0, h = yt(l), g = s.values[i], _ = g === void 0 ? 0 : jn(g, s.min, s.max), v = Mn(i, s.values.length), y = h?.[c.size], b = y ? Pn(y, _, c.direction) : 0;
	return e.useEffect(() => {
		if (l) return s.thumbs.add(l), () => {
			s.thumbs.delete(l);
		};
	}, [l, s.thumbs]), /* @__PURE__ */ m("span", {
		style: {
			transform: "var(--radix-slider-thumb-transform)",
			position: "absolute",
			[c.startEdge]: `calc(${_}% + ${b}px)`
		},
		children: [/* @__PURE__ */ p(cn.ItemSlot, {
			scope: t.__scopeSlider,
			children: /* @__PURE__ */ p(U.span, {
				role: "slider",
				"aria-label": t["aria-label"] || v,
				"aria-valuemin": s.min,
				"aria-valuenow": g,
				"aria-valuemax": s.max,
				"aria-orientation": s.orientation,
				"data-orientation": s.orientation,
				"data-disabled": s.disabled ? "" : void 0,
				tabIndex: s.disabled ? void 0 : 0,
				...o,
				ref: d,
				style: g === void 0 ? { display: "none" } : t.style,
				onFocus: V(t.onFocus, () => {
					s.valueIndexToChangeRef.current = i;
				})
			})
		}), f && /* @__PURE__ */ p(kn, {
			name: a ?? (s.name ? s.name + (s.values.length > 1 ? "[]" : "") : void 0),
			form: s.form,
			value: g
		}, i)]
	});
});
En.displayName = Tn;
var On = "RadioBubbleInput", kn = e.forwardRef(({ __scopeSlider: t, value: n, ...r }, i) => {
	let a = e.useRef(null), o = H(a, i), s = bt(n);
	return e.useEffect(() => {
		let e = a.current;
		if (!e) return;
		let t = window.HTMLInputElement.prototype, r = Object.getOwnPropertyDescriptor(t, "value").set;
		if (s !== n && r) {
			let t = new Event("input", { bubbles: !0 });
			r.call(e, n), e.dispatchEvent(t);
		}
	}, [s, n]), /* @__PURE__ */ p(U.input, {
		style: { display: "none" },
		...r,
		ref: o,
		defaultValue: n
	});
});
kn.displayName = On;
function An(e = [], t, n) {
	let r = [...e];
	return r[n] = t, r.sort((e, t) => e - t);
}
function jn(e, t, n) {
	return nn(100 / (n - t) * (e - t), [0, 100]);
}
function Mn(e, t) {
	if (t > 2) return `Value ${e + 1} of ${t}`;
	if (t === 2) return ["Minimum", "Maximum"][e];
}
function Nn(e, t) {
	if (e.length === 1) return 0;
	let n = e.map((e) => Math.abs(e - t)), r = Math.min(...n);
	return n.indexOf(r);
}
function Pn(e, t, n) {
	let r = e / 2;
	return (r - Ln([0, 50], [0, r])(t) * n) * n;
}
function Fn(e) {
	return e.slice(0, -1).map((t, n) => e[n + 1] - t);
}
function In(e, t) {
	if (t > 0) {
		let n = Fn(e);
		return Math.min(...n) >= t;
	}
	return !0;
}
function Ln(e, t) {
	return (n) => {
		if (e[0] === e[1] || t[0] === t[1]) return t[0];
		let r = (t[1] - t[0]) / (e[1] - e[0]);
		return t[0] + r * (n - e[0]);
	};
}
function Rn(e) {
	return (String(e).split(".")[1] || "").length;
}
function zn(e, t) {
	let n = 10 ** t;
	return Math.round(e * n) / n;
}
var Bn = hn, Vn = Sn, Hn = wn, Un = En, Wn = {
	root: "_root_1vymk_1",
	track: "_track_1vymk_23",
	range: "_range_1vymk_45",
	thumb: "_thumb_1vymk_57"
}, Gn = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(Bn, {
	ref: n,
	className: x(Wn.root, e),
	...t,
	children: [/* @__PURE__ */ p(Vn, {
		className: Wn.track,
		children: /* @__PURE__ */ p(Hn, { className: Wn.range })
	}), /* @__PURE__ */ p(Un, { className: Wn.thumb })]
}));
Gn.displayName = Bn.displayName;
//#endregion
//#region node_modules/@radix-ui/react-switch/dist/index.mjs
var Kn = "Switch", [qn, Jn] = Ae(Kn), [Yn, Xn] = qn(Kn), Zn = e.forwardRef((t, n) => {
	let { __scopeSwitch: r, name: i, checked: a, defaultChecked: o, required: s, disabled: c, value: l = "on", onCheckedChange: u, form: d, ...f } = t, [h, g] = e.useState(null), _ = H(n, (e) => g(e)), v = e.useRef(!1), y = h ? d || !!h.closest("form") : !0, [b, x] = qe({
		prop: a,
		defaultProp: o ?? !1,
		onChange: u,
		caller: Kn
	});
	return /* @__PURE__ */ m(Yn, {
		scope: r,
		checked: b,
		disabled: c,
		children: [/* @__PURE__ */ p(U.button, {
			type: "button",
			role: "switch",
			"aria-checked": b,
			"aria-required": s,
			"data-state": nr(b),
			"data-disabled": c ? "" : void 0,
			disabled: c,
			value: l,
			...f,
			ref: _,
			onClick: V(t.onClick, (e) => {
				x((e) => !e), y && (v.current = e.isPropagationStopped(), v.current || e.stopPropagation());
			})
		}), y && /* @__PURE__ */ p(tr, {
			control: h,
			bubbles: !v.current,
			name: i,
			value: l,
			checked: b,
			required: s,
			disabled: c,
			form: d,
			style: { transform: "translateX(-100%)" }
		})]
	});
});
Zn.displayName = Kn;
var Qn = "SwitchThumb", $n = e.forwardRef((e, t) => {
	let { __scopeSwitch: n, ...r } = e, i = Xn(Qn, n);
	return /* @__PURE__ */ p(U.span, {
		"data-state": nr(i.checked),
		"data-disabled": i.disabled ? "" : void 0,
		...r,
		ref: t
	});
});
$n.displayName = Qn;
var er = "SwitchBubbleInput", tr = e.forwardRef(({ __scopeSwitch: t, control: n, checked: r, bubbles: i = !0, ...a }, o) => {
	let s = e.useRef(null), c = H(s, o), l = bt(r), u = yt(n);
	return e.useEffect(() => {
		let e = s.current;
		if (!e) return;
		let t = window.HTMLInputElement.prototype, n = Object.getOwnPropertyDescriptor(t, "checked").set;
		if (l !== r && n) {
			let t = new Event("click", { bubbles: i });
			n.call(e, r), e.dispatchEvent(t);
		}
	}, [
		l,
		r,
		i
	]), /* @__PURE__ */ p("input", {
		type: "checkbox",
		"aria-hidden": !0,
		defaultChecked: r,
		...a,
		tabIndex: -1,
		ref: c,
		style: {
			...a.style,
			...u,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0
		}
	});
});
tr.displayName = er;
function nr(e) {
	return e ? "checked" : "unchecked";
}
var rr = Zn, ir = $n, ar = {
	container: "_container_v5m9q_1",
	root: "_root_v5m9q_17",
	thumb: "_thumb_v5m9q_73",
	label: "_label_v5m9q_113",
	labelText: "_labelText_v5m9q_133",
	labelTextDisabled: "_labelTextDisabled_v5m9q_145"
}, or = e.forwardRef(({ className: t, label: n, id: r, ...i }, a) => {
	let o = e.useId(), s = r || o;
	return /* @__PURE__ */ m("div", {
		className: ar.container,
		children: [/* @__PURE__ */ p(rr, {
			id: s,
			className: x(ar.root, t),
			...i,
			ref: a,
			children: /* @__PURE__ */ p(ir, { className: ar.thumb })
		}), n && /* @__PURE__ */ p("label", {
			htmlFor: s,
			className: ar.label,
			children: /* @__PURE__ */ p(D, {
				as: "span",
				variant: "p",
				className: x(ar.labelText, i.disabled && ar.labelTextDisabled),
				style: { color: "var(--color-secundaria)" },
				children: n
			})
		})]
	});
});
or.displayName = "Switch";
var sr = {
	container: "_container_1kwlv_1",
	label: "_label_1kwlv_19",
	trigger: "_trigger_1kwlv_31",
	triggerOpen: "_triggerOpen_1kwlv_63",
	triggerError: "_triggerError_1kwlv_75",
	inputField: "_inputField_1kwlv_83",
	chevron: "_chevron_1kwlv_111",
	dropdown: "_dropdown_1kwlv_131",
	slideDown: "_slideDown_1kwlv_1",
	option: "_option_1kwlv_163",
	optionSelected: "_optionSelected_1kwlv_195",
	noOptions: "_noOptions_1kwlv_205",
	removeBadgeBtn: "_removeBadgeBtn_1kwlv_243",
	checkIcon: "_checkIcon_1kwlv_277",
	errorMessage: "_errorMessage_1kwlv_285"
}, cr = i(({ className: e, options: t, value: n, defaultValue: r, onChange: i, label: a, error: o, placeholder: c = "Selecione...", id: l, ...f }, h) => {
	let [g, _] = d(r || []), [v, y] = d(!1), [b, S] = d(""), C = u(null), w = n === void 0 ? g : n, T = !!o, E = l || (a ? `multiselect-${a.replace(/\s+/g, "-").toLowerCase()}` : void 0), D = t.filter((e) => e.label.toLowerCase().includes(b.toLowerCase())), O = (e) => {
		let t;
		t = w.includes(e) ? w.filter((t) => t !== e) : [...w, e], n === void 0 && _(t), i?.(t), S("");
	}, k = (e) => {
		let t = w.filter((t) => t !== e);
		n === void 0 && _(t), i?.(t);
	}, j = (e) => {
		e.key === "Backspace" && b === "" && w.length > 0 && k(w[w.length - 1]), e.key === "Escape" && y(!1);
	};
	s(() => {
		let e = (e) => {
			C.current && !C.current.contains(e.target) && y(!1);
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, []);
	let M = t.filter((e) => w.includes(e.value));
	return /* @__PURE__ */ m("div", {
		className: x(sr.container, e),
		ref: C,
		children: [
			a && /* @__PURE__ */ p("label", {
				htmlFor: E,
				className: sr.label,
				children: a
			}),
			/* @__PURE__ */ m("div", {
				className: x(sr.trigger, T && sr.triggerError, v && sr.triggerOpen),
				onClick: () => y(!0),
				children: [
					M.map((e) => /* @__PURE__ */ m(A, {
						intent: "primaria",
						variant: "ghost",
						children: [e.label, /* @__PURE__ */ p("button", {
							type: "button",
							className: sr.removeBadgeBtn,
							onClick: (t) => {
								t.stopPropagation(), k(e.value);
							},
							children: /* @__PURE__ */ p(he, { size: 12 })
						})]
					}, e.value)),
					/* @__PURE__ */ p("input", {
						id: E,
						ref: h,
						type: "text",
						className: sr.inputField,
						value: b,
						onChange: (e) => {
							S(e.target.value), y(!0);
						},
						onFocus: () => y(!0),
						onKeyDown: j,
						placeholder: w.length === 0 ? c : "",
						autoComplete: "off",
						...f
					}),
					/* @__PURE__ */ p(ne, {
						size: 16,
						className: sr.chevron
					})
				]
			}),
			v && /* @__PURE__ */ p("div", {
				className: sr.dropdown,
				children: D.length === 0 ? /* @__PURE__ */ p("div", {
					className: sr.noOptions,
					children: "Nenhuma opção encontrada"
				}) : D.map((e) => {
					let t = w.includes(e.value);
					return /* @__PURE__ */ m("div", {
						className: x(sr.option, t && sr.optionSelected),
						onClick: (t) => {
							t.stopPropagation(), O(e.value), document.getElementById(E || "")?.focus();
						},
						children: [e.label, t && /* @__PURE__ */ p(R, {
							size: 16,
							className: sr.checkIcon
						})]
					}, e.value);
				})
			}),
			o && /* @__PURE__ */ p("span", {
				className: sr.errorMessage,
				children: o
			})
		]
	});
});
cr.displayName = "MultiSelect";
//#endregion
//#region node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs
function lr(t, n = globalThis?.document) {
	let r = Ge(t);
	e.useEffect(() => {
		let e = (e) => {
			e.key === "Escape" && r(e);
		};
		return n.addEventListener("keydown", e, { capture: !0 }), () => n.removeEventListener("keydown", e, { capture: !0 });
	}, [r, n]);
}
//#endregion
//#region node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
var ur = "DismissableLayer", dr = "dismissableLayer.update", fr = "dismissableLayer.pointerDownOutside", pr = "dismissableLayer.focusOutside", mr, hr = e.createContext({
	layers: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	branches: /* @__PURE__ */ new Set()
}), gr = e.forwardRef((t, n) => {
	let { disableOutsidePointerEvents: r = !1, onEscapeKeyDown: i, onPointerDownOutside: a, onFocusOutside: o, onInteractOutside: s, onDismiss: c, ...l } = t, u = e.useContext(hr), [d, f] = e.useState(null), m = d?.ownerDocument ?? globalThis?.document, [, h] = e.useState({}), g = H(n, (e) => f(e)), _ = Array.from(u.layers), [v] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), y = _.indexOf(v), b = d ? _.indexOf(d) : -1, x = u.layersWithOutsidePointerEventsDisabled.size > 0, S = b >= y, C = yr((e) => {
		let t = e.target, n = [...u.branches].some((e) => e.contains(t));
		!S || n || (a?.(e), s?.(e), e.defaultPrevented || c?.());
	}, m), w = br((e) => {
		let t = e.target;
		[...u.branches].some((e) => e.contains(t)) || (o?.(e), s?.(e), e.defaultPrevented || c?.());
	}, m);
	return lr((e) => {
		b === u.layers.size - 1 && (i?.(e), !e.defaultPrevented && c && (e.preventDefault(), c()));
	}, m), e.useEffect(() => {
		if (d) return r && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (mr = m.body.style.pointerEvents, m.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(d)), u.layers.add(d), xr(), () => {
			r && u.layersWithOutsidePointerEventsDisabled.size === 1 && (m.body.style.pointerEvents = mr);
		};
	}, [
		d,
		m,
		r,
		u
	]), e.useEffect(() => () => {
		d && (u.layers.delete(d), u.layersWithOutsidePointerEventsDisabled.delete(d), xr());
	}, [d, u]), e.useEffect(() => {
		let e = () => h({});
		return document.addEventListener(dr, e), () => document.removeEventListener(dr, e);
	}, []), /* @__PURE__ */ p(U.div, {
		...l,
		ref: g,
		style: {
			pointerEvents: x ? S ? "auto" : "none" : void 0,
			...t.style
		},
		onFocusCapture: V(t.onFocusCapture, w.onFocusCapture),
		onBlurCapture: V(t.onBlurCapture, w.onBlurCapture),
		onPointerDownCapture: V(t.onPointerDownCapture, C.onPointerDownCapture)
	});
});
gr.displayName = ur;
var _r = "DismissableLayerBranch", vr = e.forwardRef((t, n) => {
	let r = e.useContext(hr), i = e.useRef(null), a = H(n, i);
	return e.useEffect(() => {
		let e = i.current;
		if (e) return r.branches.add(e), () => {
			r.branches.delete(e);
		};
	}, [r.branches]), /* @__PURE__ */ p(U.div, {
		...t,
		ref: a
	});
});
vr.displayName = _r;
function yr(t, n = globalThis?.document) {
	let r = Ge(t), i = e.useRef(!1), a = e.useRef(() => {});
	return e.useEffect(() => {
		let e = (e) => {
			if (e.target && !i.current) {
				let t = function() {
					Sr(fr, r, i, { discrete: !0 });
				}, i = { originalEvent: e };
				e.pointerType === "touch" ? (n.removeEventListener("click", a.current), a.current = t, n.addEventListener("click", a.current, { once: !0 })) : t();
			} else n.removeEventListener("click", a.current);
			i.current = !1;
		}, t = window.setTimeout(() => {
			n.addEventListener("pointerdown", e);
		}, 0);
		return () => {
			window.clearTimeout(t), n.removeEventListener("pointerdown", e), n.removeEventListener("click", a.current);
		};
	}, [n, r]), { onPointerDownCapture: () => i.current = !0 };
}
function br(t, n = globalThis?.document) {
	let r = Ge(t), i = e.useRef(!1);
	return e.useEffect(() => {
		let e = (e) => {
			e.target && !i.current && Sr(pr, r, { originalEvent: e }, { discrete: !1 });
		};
		return n.addEventListener("focusin", e), () => n.removeEventListener("focusin", e);
	}, [n, r]), {
		onFocusCapture: () => i.current = !0,
		onBlurCapture: () => i.current = !1
	};
}
function xr() {
	let e = new CustomEvent(dr);
	document.dispatchEvent(e);
}
function Sr(e, t, n, { discrete: r }) {
	let i = n.originalEvent.target, a = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && i.addEventListener(e, t, { once: !0 }), r ? ze(i, a) : i.dispatchEvent(a);
}
//#endregion
//#region node_modules/@radix-ui/react-focus-guards/dist/index.mjs
var Cr = 0;
function wr() {
	e.useEffect(() => {
		let e = document.querySelectorAll("[data-radix-focus-guard]");
		return document.body.insertAdjacentElement("afterbegin", e[0] ?? Tr()), document.body.insertAdjacentElement("beforeend", e[1] ?? Tr()), Cr++, () => {
			Cr === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((e) => e.remove()), Cr--;
		};
	}, []);
}
function Tr() {
	let e = document.createElement("span");
	return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
//#endregion
//#region node_modules/@radix-ui/react-focus-scope/dist/index.mjs
var Er = "focusScope.autoFocusOnMount", Dr = "focusScope.autoFocusOnUnmount", Or = {
	bubbles: !1,
	cancelable: !0
}, kr = "FocusScope", Ar = e.forwardRef((t, n) => {
	let { loop: r = !1, trapped: i = !1, onMountAutoFocus: a, onUnmountAutoFocus: o, ...s } = t, [c, l] = e.useState(null), u = Ge(a), d = Ge(o), f = e.useRef(null), m = H(n, (e) => l(e)), h = e.useRef({
		paused: !1,
		pause() {
			this.paused = !0;
		},
		resume() {
			this.paused = !1;
		}
	}).current;
	e.useEffect(() => {
		if (i) {
			let e = function(e) {
				if (h.paused || !c) return;
				let t = e.target;
				c.contains(t) ? f.current = t : Lr(f.current, { select: !0 });
			}, t = function(e) {
				if (h.paused || !c) return;
				let t = e.relatedTarget;
				t !== null && (c.contains(t) || Lr(f.current, { select: !0 }));
			}, n = function(e) {
				if (document.activeElement === document.body) for (let t of e) t.removedNodes.length > 0 && Lr(c);
			};
			document.addEventListener("focusin", e), document.addEventListener("focusout", t);
			let r = new MutationObserver(n);
			return c && r.observe(c, {
				childList: !0,
				subtree: !0
			}), () => {
				document.removeEventListener("focusin", e), document.removeEventListener("focusout", t), r.disconnect();
			};
		}
	}, [
		i,
		c,
		h.paused
	]), e.useEffect(() => {
		if (c) {
			Rr.add(h);
			let e = document.activeElement;
			if (!c.contains(e)) {
				let t = new CustomEvent(Er, Or);
				c.addEventListener(Er, u), c.dispatchEvent(t), t.defaultPrevented || (jr(Vr(Nr(c)), { select: !0 }), document.activeElement === e && Lr(c));
			}
			return () => {
				c.removeEventListener(Er, u), setTimeout(() => {
					let t = new CustomEvent(Dr, Or);
					c.addEventListener(Dr, d), c.dispatchEvent(t), t.defaultPrevented || Lr(e ?? document.body, { select: !0 }), c.removeEventListener(Dr, d), Rr.remove(h);
				}, 0);
			};
		}
	}, [
		c,
		u,
		d,
		h
	]);
	let g = e.useCallback((e) => {
		if (!r && !i || h.paused) return;
		let t = e.key === "Tab" && !e.altKey && !e.ctrlKey && !e.metaKey, n = document.activeElement;
		if (t && n) {
			let t = e.currentTarget, [i, a] = Mr(t);
			i && a ? !e.shiftKey && n === a ? (e.preventDefault(), r && Lr(i, { select: !0 })) : e.shiftKey && n === i && (e.preventDefault(), r && Lr(a, { select: !0 })) : n === t && e.preventDefault();
		}
	}, [
		r,
		i,
		h.paused
	]);
	return /* @__PURE__ */ p(U.div, {
		tabIndex: -1,
		...s,
		ref: m,
		onKeyDown: g
	});
});
Ar.displayName = kr;
function jr(e, { select: t = !1 } = {}) {
	let n = document.activeElement;
	for (let r of e) if (Lr(r, { select: t }), document.activeElement !== n) return;
}
function Mr(e) {
	let t = Nr(e);
	return [Pr(t, e), Pr(t.reverse(), e)];
}
function Nr(e) {
	let t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (e) => {
		let t = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
function Pr(e, t) {
	for (let n of e) if (!Fr(n, { upTo: t })) return n;
}
function Fr(e, { upTo: t }) {
	if (getComputedStyle(e).visibility === "hidden") return !0;
	for (; e;) {
		if (t !== void 0 && e === t) return !1;
		if (getComputedStyle(e).display === "none") return !0;
		e = e.parentElement;
	}
	return !1;
}
function Ir(e) {
	return e instanceof HTMLInputElement && "select" in e;
}
function Lr(e, { select: t = !1 } = {}) {
	if (e && e.focus) {
		let n = document.activeElement;
		e.focus({ preventScroll: !0 }), e !== n && Ir(e) && t && e.select();
	}
}
var Rr = zr();
function zr() {
	let e = [];
	return {
		add(t) {
			let n = e[0];
			t !== n && n?.pause(), e = Br(e, t), e.unshift(t);
		},
		remove(t) {
			e = Br(e, t), e[0]?.resume();
		}
	};
}
function Br(e, t) {
	let n = [...e], r = n.indexOf(t);
	return r !== -1 && n.splice(r, 1), n;
}
function Vr(e) {
	return e.filter((e) => e.tagName !== "A");
}
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var Hr = [
	"top",
	"right",
	"bottom",
	"left"
], Ur = Math.min, Wr = Math.max, Gr = Math.round, Kr = Math.floor, qr = (e) => ({
	x: e,
	y: e
}), Jr = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Yr(e, t, n) {
	return Wr(e, Ur(t, n));
}
function Xr(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function Zr(e) {
	return e.split("-")[0];
}
function Qr(e) {
	return e.split("-")[1];
}
function $r(e) {
	return e === "x" ? "y" : "x";
}
function ei(e) {
	return e === "y" ? "height" : "width";
}
function ti(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function ni(e) {
	return $r(ti(e));
}
function ri(e, t, n) {
	n === void 0 && (n = !1);
	let r = Qr(e), i = ni(e), a = ei(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = fi(o)), [o, fi(o)];
}
function ii(e) {
	let t = fi(e);
	return [
		ai(e),
		t,
		ai(t)
	];
}
function ai(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var oi = ["left", "right"], si = ["right", "left"], ci = ["top", "bottom"], li = ["bottom", "top"];
function ui(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? si : oi : t ? oi : si;
		case "left":
		case "right": return t ? ci : li;
		default: return [];
	}
}
function di(e, t, n, r) {
	let i = Qr(e), a = ui(Zr(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(ai)))), a;
}
function fi(e) {
	let t = Zr(e);
	return Jr[t] + e.slice(t.length);
}
function pi(e) {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...e
	};
}
function mi(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : pi(e);
}
function hi(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
//#endregion
//#region node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function gi(e, t, n) {
	let { reference: r, floating: i } = e, a = ti(t), o = ni(t), s = ei(o), c = Zr(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	switch (Qr(t)) {
		case "start":
			p[o] -= f * (n && l ? -1 : 1);
			break;
		case "end":
			p[o] += f * (n && l ? -1 : 1);
			break;
	}
	return p;
}
async function _i(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = Xr(t, e), p = mi(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = hi(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = hi(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var vi = 50, yi = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: _i
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = gi(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < vi && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = gi(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, bi = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = Xr(e, t) || {};
		if (l == null) return {};
		let d = mi(u), f = {
			x: n,
			y: r
		}, p = ni(i), m = ei(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		(!C || !await (o.isElement == null ? void 0 : o.isElement(S))) && (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = Ur(d[_], T), D = Ur(d[v], T), O = E, k = C - h[m] - D, A = C / 2 - h[m] / 2 + w, j = Yr(O, A, k), M = !c.arrow && Qr(i) != null && A !== j && a.reference[m] / 2 - (A < O ? E : D) - h[m] / 2 < 0, N = M ? A < O ? A - O : A - k : 0;
		return {
			[p]: f[p] + N,
			data: {
				[p]: j,
				centerOffset: A - j - N,
				...M && { alignmentOffset: N }
			},
			reset: M
		};
	}
}), xi = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = Xr(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = Zr(r), _ = ti(o), v = Zr(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [fi(o)] : ii(o)), x = p !== "none";
			!d && x && b.push(...di(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = ri(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (!(u === "alignment" && _ !== ti(t)) || T.every((e) => ti(e.placement) === _ ? e.overflows[0] > 0 : !0))) return {
					data: {
						index: e,
						overflows: T
					},
					reset: { placement: t }
				};
				let n = T.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = T.filter((e) => {
							if (x) {
								let t = ti(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement":
						n = o;
						break;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
};
function Si(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function Ci(e) {
	return Hr.some((t) => e[t] >= 0);
}
var wi = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = Xr(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = Si(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: Ci(e)
					} };
				}
				case "escaped": {
					let e = Si(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: Ci(e)
					} };
				}
				default: return {};
			}
		}
	};
}, Ti = /* @__PURE__ */ new Set(["left", "top"]);
async function Ei(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = Zr(n), s = Qr(n), c = ti(n) === "y", l = Ti.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = Xr(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var Di = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await Ei(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
}, Oi = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, platform: a } = t, { mainAxis: o = !0, crossAxis: s = !1, limiter: c = { fn: (e) => {
				let { x: t, y: n } = e;
				return {
					x: t,
					y: n
				};
			} }, ...l } = Xr(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = ti(Zr(i)), p = $r(f), m = u[p], h = u[f];
			if (o) {
				let e = p === "y" ? "top" : "left", t = p === "y" ? "bottom" : "right", n = m + d[e], r = m - d[t];
				m = Yr(n, m, r);
			}
			if (s) {
				let e = f === "y" ? "top" : "left", t = f === "y" ? "bottom" : "right", n = h + d[e], r = h - d[t];
				h = Yr(n, h, r);
			}
			let g = c.fn({
				...t,
				[p]: m,
				[f]: h
			});
			return {
				...g,
				data: {
					x: g.x - n,
					y: g.y - r,
					enabled: {
						[p]: o,
						[f]: s
					}
				}
			};
		}
	};
}, ki = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = Xr(e, t), u = {
				x: n,
				y: r
			}, d = ti(i), f = $r(d), p = u[f], m = u[d], h = Xr(s, t), g = typeof h == "number" ? {
				mainAxis: h,
				crossAxis: 0
			} : {
				mainAxis: 0,
				crossAxis: 0,
				...h
			};
			if (c) {
				let e = f === "y" ? "height" : "width", t = a.reference[f] - a.floating[e] + g.mainAxis, n = a.reference[f] + a.reference[e] - g.mainAxis;
				p < t ? p = t : p > n && (p = n);
			}
			if (l) {
				let e = f === "y" ? "width" : "height", t = Ti.has(Zr(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, Ai = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			var n, r;
			let { placement: i, rects: a, platform: o, elements: s } = t, { apply: c = () => {}, ...l } = Xr(e, t), u = await o.detectOverflow(t, l), d = Zr(i), f = Qr(i), p = ti(i) === "y", { width: m, height: h } = a.floating, g, _;
			d === "top" || d === "bottom" ? (g = d, _ = f === (await (o.isRTL == null ? void 0 : o.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (_ = d, g = f === "end" ? "top" : "bottom");
			let v = h - u.top - u.bottom, y = m - u.left - u.right, b = Ur(h - u[g], v), x = Ur(m - u[_], y), S = !t.middlewareData.shift, C = b, w = x;
			if ((n = t.middlewareData.shift) != null && n.enabled.x && (w = y), (r = t.middlewareData.shift) != null && r.enabled.y && (C = v), S && !f) {
				let e = Wr(u.left, 0), t = Wr(u.right, 0), n = Wr(u.top, 0), r = Wr(u.bottom, 0);
				p ? w = m - 2 * (e !== 0 || t !== 0 ? e + t : Wr(u.left, u.right)) : C = h - 2 * (n !== 0 || r !== 0 ? n + r : Wr(u.top, u.bottom));
			}
			await c({
				...t,
				availableWidth: w,
				availableHeight: C
			});
			let T = await o.getDimensions(s.floating);
			return m !== T.width || h !== T.height ? { reset: { rects: !0 } } : {};
		}
	};
};
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function ji() {
	return typeof window < "u";
}
function Mi(e) {
	return Fi(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Ni(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Pi(e) {
	return ((Fi(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function Fi(e) {
	return ji() ? e instanceof Node || e instanceof Ni(e).Node : !1;
}
function Ii(e) {
	return ji() ? e instanceof Element || e instanceof Ni(e).Element : !1;
}
function Li(e) {
	return ji() ? e instanceof HTMLElement || e instanceof Ni(e).HTMLElement : !1;
}
function Ri(e) {
	return !ji() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Ni(e).ShadowRoot;
}
function zi(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = Xi(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Bi(e) {
	return /^(table|td|th)$/.test(Mi(e));
}
function Vi(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var Hi = /transform|translate|scale|rotate|perspective|filter/, Ui = /paint|layout|strict|content/, Wi = (e) => !!e && e !== "none", Gi;
function Ki(e) {
	let t = Ii(e) ? Xi(e) : e;
	return Wi(t.transform) || Wi(t.translate) || Wi(t.scale) || Wi(t.rotate) || Wi(t.perspective) || !Ji() && (Wi(t.backdropFilter) || Wi(t.filter)) || Hi.test(t.willChange || "") || Ui.test(t.contain || "");
}
function qi(e) {
	let t = Qi(e);
	for (; Li(t) && !Yi(t);) {
		if (Ki(t)) return t;
		if (Vi(t)) return null;
		t = Qi(t);
	}
	return null;
}
function Ji() {
	return Gi ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), Gi;
}
function Yi(e) {
	return /^(html|body|#document)$/.test(Mi(e));
}
function Xi(e) {
	return Ni(e).getComputedStyle(e);
}
function Zi(e) {
	return Ii(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function Qi(e) {
	if (Mi(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || Ri(e) && e.host || Pi(e);
	return Ri(t) ? t.host : t;
}
function $i(e) {
	let t = Qi(e);
	return Yi(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Li(t) && zi(t) ? t : $i(t);
}
function ea(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = $i(e), i = r === e.ownerDocument?.body, a = Ni(r);
	if (i) {
		let e = ta(a);
		return t.concat(a, a.visualViewport || [], zi(r) ? r : [], e && n ? ea(e) : []);
	} else return t.concat(r, ea(r, [], n));
}
function ta(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function na(e) {
	let t = Xi(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = Li(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = Gr(n) !== a || Gr(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function ra(e) {
	return Ii(e) ? e : e.contextElement;
}
function ia(e) {
	let t = ra(e);
	if (!Li(t)) return qr(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = na(t), o = (a ? Gr(n.width) : n.width) / r, s = (a ? Gr(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var aa = /* @__PURE__ */ qr(0);
function oa(e) {
	let t = Ni(e);
	return !Ji() || !t.visualViewport ? aa : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function sa(e, t, n) {
	return t === void 0 && (t = !1), !n || t && n !== Ni(e) ? !1 : t;
}
function ca(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = ra(e), o = qr(1);
	t && (r ? Ii(r) && (o = ia(r)) : o = ia(e));
	let s = sa(a, n, r) ? oa(a) : qr(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a) {
		let e = Ni(a), t = r && Ii(r) ? Ni(r) : r, n = e, i = ta(n);
		for (; i && r && t !== n;) {
			let e = ia(i), t = i.getBoundingClientRect(), r = Xi(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = Ni(i), i = ta(n);
		}
	}
	return hi({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function la(e, t) {
	let n = Zi(e).scrollLeft;
	return t ? t.left + n : ca(Pi(e)).left + n;
}
function ua(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - la(e, n),
		y: n.top + t.scrollTop
	};
}
function da(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = Pi(r), s = t ? Vi(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = qr(1), u = qr(0), d = Li(r);
	if ((d || !d && !a) && ((Mi(r) !== "body" || zi(o)) && (c = Zi(r)), d)) {
		let e = ca(r);
		l = ia(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? ua(o, c) : qr(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function fa(e) {
	return Array.from(e.getClientRects());
}
function pa(e) {
	let t = Pi(e), n = Zi(e), r = e.ownerDocument.body, i = Wr(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = Wr(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight), o = -n.scrollLeft + la(e), s = -n.scrollTop;
	return Xi(r).direction === "rtl" && (o += Wr(t.clientWidth, r.clientWidth) - i), {
		width: i,
		height: a,
		x: o,
		y: s
	};
}
var ma = 25;
function ha(e, t) {
	let n = Ni(e), r = Pi(e), i = n.visualViewport, a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
	if (i) {
		a = i.width, o = i.height;
		let e = Ji();
		(!e || e && t === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
	}
	let l = la(r);
	if (l <= 0) {
		let e = r.ownerDocument, t = e.body, n = getComputedStyle(t), i = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, o = Math.abs(r.clientWidth - t.clientWidth - i);
		o <= ma && (a -= o);
	} else l <= ma && (a += l);
	return {
		width: a,
		height: o,
		x: s,
		y: c
	};
}
function ga(e, t) {
	let n = ca(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = Li(e) ? ia(e) : qr(1);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function _a(e, t, n) {
	let r;
	if (t === "viewport") r = ha(e, n);
	else if (t === "document") r = pa(Pi(e));
	else if (Ii(t)) r = ga(t, n);
	else {
		let n = oa(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return hi(r);
}
function va(e, t) {
	let n = Qi(e);
	return n === t || !Ii(n) || Yi(n) ? !1 : Xi(n).position === "fixed" || va(n, t);
}
function ya(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = ea(e, [], !1).filter((e) => Ii(e) && Mi(e) !== "body"), i = null, a = Xi(e).position === "fixed", o = a ? Qi(e) : e;
	for (; Ii(o) && !Yi(o);) {
		let t = Xi(o), n = Ki(o);
		!n && t.position === "fixed" && (i = null), (a ? !n && !i : !n && t.position === "static" && i && (i.position === "absolute" || i.position === "fixed") || zi(o) && !n && va(e, o)) ? r = r.filter((e) => e !== o) : i = t, o = Qi(o);
	}
	return t.set(e, r), r;
}
function ba(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Vi(t) ? [] : ya(t, this._c) : [].concat(n), r], o = _a(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = _a(t, a[e], i);
		s = Wr(n.top, s), c = Ur(n.right, c), l = Ur(n.bottom, l), u = Wr(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function xa(e) {
	let { width: t, height: n } = na(e);
	return {
		width: t,
		height: n
	};
}
function Sa(e, t, n) {
	let r = Li(t), i = Pi(t), a = n === "fixed", o = ca(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = qr(0);
	function l() {
		c.x = la(i);
	}
	if (r || !r && !a) if ((Mi(t) !== "body" || zi(i)) && (s = Zi(t)), r) {
		let e = ca(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	} else i && l();
	a && !r && i && l();
	let u = i && !r && !a ? ua(i, s) : qr(0);
	return {
		x: o.left + s.scrollLeft - c.x - u.x,
		y: o.top + s.scrollTop - c.y - u.y,
		width: o.width,
		height: o.height
	};
}
function Ca(e) {
	return Xi(e).position === "static";
}
function wa(e, t) {
	if (!Li(e) || Xi(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return Pi(e) === n && (n = n.ownerDocument.body), n;
}
function Ta(e, t) {
	let n = Ni(e);
	if (Vi(e)) return n;
	if (!Li(e)) {
		let t = Qi(e);
		for (; t && !Yi(t);) {
			if (Ii(t) && !Ca(t)) return t;
			t = Qi(t);
		}
		return n;
	}
	let r = wa(e, t);
	for (; r && Bi(r) && Ca(r);) r = wa(r, t);
	return r && Yi(r) && Ca(r) && !Ki(r) ? n : r || qi(e) || n;
}
var Ea = async function(e) {
	let t = this.getOffsetParent || Ta, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: Sa(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function Da(e) {
	return Xi(e).direction === "rtl";
}
var Oa = {
	convertOffsetParentRelativeRectToViewportRelativeRect: da,
	getDocumentElement: Pi,
	getClippingRect: ba,
	getOffsetParent: Ta,
	getElementRects: Ea,
	getClientRects: fa,
	getDimensions: xa,
	getScale: ia,
	isElement: Ii,
	isRTL: Da
};
function ka(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Aa(e, t) {
	let n = null, r, i = Pi(e);
	function a() {
		var e;
		clearTimeout(r), (e = n) == null || e.disconnect(), n = null;
	}
	function o(s, c) {
		s === void 0 && (s = !1), c === void 0 && (c = 1), a();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (s || t(), !f || !p) return;
		let m = Kr(d), h = Kr(i.clientWidth - (u + f)), g = Kr(i.clientHeight - (d + p)), _ = Kr(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: Wr(0, Ur(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (n !== c) {
				if (!y) return o();
				n ? o(!1, n) : r = setTimeout(() => {
					o(!1, 1e-7);
				}, 1e3);
			}
			n === 1 && !ka(l, e.getBoundingClientRect()) && o(), y = !1;
		}
		try {
			n = new IntersectionObserver(b, {
				...v,
				root: i.ownerDocument
			});
		} catch {
			n = new IntersectionObserver(b, v);
		}
		n.observe(e);
	}
	return o(!0), a;
}
function ja(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = ra(e), u = i || a ? [...l ? ea(l) : [], ...t ? ea(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n, { passive: !0 }), a && e.addEventListener("resize", n);
	});
	let d = l && s ? Aa(l, n) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? ca(e) : null;
	c && g();
	function g() {
		let t = ca(e);
		h && !ka(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var Ma = Di, Na = Oi, Pa = xi, Fa = Ai, Ia = wi, La = bi, Ra = ki, za = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = {
		platform: Oa,
		...n
	}, a = {
		...i.platform,
		_c: r
	};
	return yi(e, t, {
		...i,
		platform: a
	});
}, Ba = typeof document < "u" ? c : function() {};
function Va(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!Va(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !Va(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function Ha(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Ua(e, t) {
	let n = Ha(e);
	return Math.round(t * n) / n;
}
function Wa(t) {
	let n = e.useRef(t);
	return Ba(() => {
		n.current = t;
	}), n;
}
function Ga(t) {
	t === void 0 && (t = {});
	let { placement: n = "bottom", strategy: r = "absolute", middleware: i = [], platform: a, elements: { reference: o, floating: s } = {}, transform: c = !0, whileElementsMounted: l, open: u } = t, [d, f] = e.useState({
		x: 0,
		y: 0,
		strategy: r,
		placement: n,
		middlewareData: {},
		isPositioned: !1
	}), [p, m] = e.useState(i);
	Va(p, i) || m(i);
	let [g, _] = e.useState(null), [v, y] = e.useState(null), b = e.useCallback((e) => {
		e !== w.current && (w.current = e, _(e));
	}, []), x = e.useCallback((e) => {
		e !== T.current && (T.current = e, y(e));
	}, []), S = o || g, C = s || v, w = e.useRef(null), T = e.useRef(null), E = e.useRef(d), D = l != null, O = Wa(l), k = Wa(a), A = Wa(u), j = e.useCallback(() => {
		if (!w.current || !T.current) return;
		let e = {
			placement: n,
			strategy: r,
			middleware: p
		};
		k.current && (e.platform = k.current), za(w.current, T.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: A.current !== !1
			};
			M.current && !Va(E.current, t) && (E.current = t, h.flushSync(() => {
				f(t);
			}));
		});
	}, [
		p,
		n,
		r,
		k,
		A
	]);
	Ba(() => {
		u === !1 && E.current.isPositioned && (E.current.isPositioned = !1, f((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [u]);
	let M = e.useRef(!1);
	Ba(() => (M.current = !0, () => {
		M.current = !1;
	}), []), Ba(() => {
		if (S && (w.current = S), C && (T.current = C), S && C) {
			if (O.current) return O.current(S, C, j);
			j();
		}
	}, [
		S,
		C,
		j,
		O,
		D
	]);
	let N = e.useMemo(() => ({
		reference: w,
		floating: T,
		setReference: b,
		setFloating: x
	}), [b, x]), P = e.useMemo(() => ({
		reference: S,
		floating: C
	}), [S, C]), F = e.useMemo(() => {
		let e = {
			position: r,
			left: 0,
			top: 0
		};
		if (!P.floating) return e;
		let t = Ua(P.floating, d.x), n = Ua(P.floating, d.y);
		return c ? {
			...e,
			transform: "translate(" + t + "px, " + n + "px)",
			...Ha(P.floating) >= 1.5 && { willChange: "transform" }
		} : {
			position: r,
			left: t,
			top: n
		};
	}, [
		r,
		c,
		P.floating,
		d.x,
		d.y
	]);
	return e.useMemo(() => ({
		...d,
		update: j,
		refs: N,
		elements: P,
		floatingStyles: F
	}), [
		d,
		j,
		N,
		P,
		F
	]);
}
var Ka = (e) => {
	function t(e) {
		return {}.hasOwnProperty.call(e, "current");
	}
	return {
		name: "arrow",
		options: e,
		fn(n) {
			let { element: r, padding: i } = typeof e == "function" ? e(n) : e;
			return r && t(r) ? r.current == null ? {} : La({
				element: r.current,
				padding: i
			}).fn(n) : r ? La({
				element: r,
				padding: i
			}).fn(n) : {};
		}
	};
}, qa = (e, t) => {
	let n = Ma(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Ja = (e, t) => {
	let n = Na(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Ya = (e, t) => ({
	fn: Ra(e).fn,
	options: [e, t]
}), Xa = (e, t) => {
	let n = Pa(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Za = (e, t) => {
	let n = Fa(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Qa = (e, t) => {
	let n = Ia(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, $a = (e, t) => {
	let n = Ka(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, eo = "Arrow", to = e.forwardRef((e, t) => {
	let { children: n, width: r = 10, height: i = 5, ...a } = e;
	return /* @__PURE__ */ p(U.svg, {
		...a,
		ref: t,
		width: r,
		height: i,
		viewBox: "0 0 30 10",
		preserveAspectRatio: "none",
		children: e.asChild ? n : /* @__PURE__ */ p("polygon", { points: "0,0 30,0 15,10" })
	});
});
to.displayName = eo;
var no = to, ro = "Popper", [io, ao] = Ae(ro), [oo, so] = io(ro), co = (t) => {
	let { __scopePopper: n, children: r } = t, [i, a] = e.useState(null);
	return /* @__PURE__ */ p(oo, {
		scope: n,
		anchor: i,
		onAnchorChange: a,
		children: r
	});
};
co.displayName = ro;
var lo = "PopperAnchor", uo = e.forwardRef((t, n) => {
	let { __scopePopper: r, virtualRef: i, ...a } = t, o = so(lo, r), s = e.useRef(null), c = H(n, s), l = e.useRef(null);
	return e.useEffect(() => {
		let e = l.current;
		l.current = i?.current || s.current, e !== l.current && o.onAnchorChange(l.current);
	}), i ? null : /* @__PURE__ */ p(U.div, {
		...a,
		ref: c
	});
});
uo.displayName = lo;
var fo = "PopperContent", [po, mo] = io(fo), ho = e.forwardRef((t, n) => {
	let { __scopePopper: r, side: i = "bottom", sideOffset: a = 0, align: o = "center", alignOffset: s = 0, arrowPadding: c = 0, avoidCollisions: l = !0, collisionBoundary: u = [], collisionPadding: d = 0, sticky: f = "partial", hideWhenDetached: m = !1, updatePositionStrategy: h = "optimized", onPlaced: g, ..._ } = t, v = so(fo, r), [y, b] = e.useState(null), x = H(n, (e) => b(e)), [S, C] = e.useState(null), w = yt(S), T = w?.width ?? 0, E = w?.height ?? 0, D = i + (o === "center" ? "" : "-" + o), O = typeof d == "number" ? d : {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...d
	}, k = Array.isArray(u) ? u : [u], A = k.length > 0, j = {
		padding: O,
		boundary: k.filter(yo),
		altBoundary: A
	}, { refs: M, floatingStyles: N, placement: P, isPositioned: F, middlewareData: I } = Ga({
		strategy: "fixed",
		placement: D,
		whileElementsMounted: (...e) => ja(...e, { animationFrame: h === "always" }),
		elements: { reference: v.anchor },
		middleware: [
			qa({
				mainAxis: a + E,
				alignmentAxis: s
			}),
			l && Ja({
				mainAxis: !0,
				crossAxis: !1,
				limiter: f === "partial" ? Ya() : void 0,
				...j
			}),
			l && Xa({ ...j }),
			Za({
				...j,
				apply: ({ elements: e, rects: t, availableWidth: n, availableHeight: r }) => {
					let { width: i, height: a } = t.reference, o = e.floating.style;
					o.setProperty("--radix-popper-available-width", `${n}px`), o.setProperty("--radix-popper-available-height", `${r}px`), o.setProperty("--radix-popper-anchor-width", `${i}px`), o.setProperty("--radix-popper-anchor-height", `${a}px`);
				}
			}),
			S && $a({
				element: S,
				padding: c
			}),
			bo({
				arrowWidth: T,
				arrowHeight: E
			}),
			m && Qa({
				strategy: "referenceHidden",
				...j
			})
		]
	}), [L, ee] = xo(P), te = Ge(g);
	Ve(() => {
		F && te?.();
	}, [F, te]);
	let R = I.arrow?.x, ne = I.arrow?.y, re = I.arrow?.centerOffset !== 0, [ie, ae] = e.useState();
	return Ve(() => {
		y && ae(window.getComputedStyle(y).zIndex);
	}, [y]), /* @__PURE__ */ p("div", {
		ref: M.setFloating,
		"data-radix-popper-content-wrapper": "",
		style: {
			...N,
			transform: F ? N.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: ie,
			"--radix-popper-transform-origin": [I.transformOrigin?.x, I.transformOrigin?.y].join(" "),
			...I.hide?.referenceHidden && {
				visibility: "hidden",
				pointerEvents: "none"
			}
		},
		dir: t.dir,
		children: /* @__PURE__ */ p(po, {
			scope: r,
			placedSide: L,
			onArrowChange: C,
			arrowX: R,
			arrowY: ne,
			shouldHideArrow: re,
			children: /* @__PURE__ */ p(U.div, {
				"data-side": L,
				"data-align": ee,
				..._,
				ref: x,
				style: {
					..._.style,
					animation: F ? void 0 : "none"
				}
			})
		})
	});
});
ho.displayName = fo;
var go = "PopperArrow", _o = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, vo = e.forwardRef(function(e, t) {
	let { __scopePopper: n, ...r } = e, i = mo(go, n), a = _o[i.placedSide];
	return /* @__PURE__ */ p("span", {
		ref: i.onArrowChange,
		style: {
			position: "absolute",
			left: i.arrowX,
			top: i.arrowY,
			[a]: 0,
			transformOrigin: {
				top: "",
				right: "0 0",
				bottom: "center 0",
				left: "100% 0"
			}[i.placedSide],
			transform: {
				top: "translateY(100%)",
				right: "translateY(50%) rotate(90deg) translateX(-50%)",
				bottom: "rotate(180deg)",
				left: "translateY(50%) rotate(-90deg) translateX(50%)"
			}[i.placedSide],
			visibility: i.shouldHideArrow ? "hidden" : void 0
		},
		children: /* @__PURE__ */ p(no, {
			...r,
			ref: t,
			style: {
				...r.style,
				display: "block"
			}
		})
	});
});
vo.displayName = go;
function yo(e) {
	return e !== null;
}
var bo = (e) => ({
	name: "transformOrigin",
	options: e,
	fn(t) {
		let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = xo(n), u = {
			start: "0%",
			center: "50%",
			end: "100%"
		}[l], d = (i.arrow?.x ?? 0) + o / 2, f = (i.arrow?.y ?? 0) + s / 2, p = "", m = "";
		return c === "bottom" ? (p = a ? u : `${d}px`, m = `${-s}px`) : c === "top" ? (p = a ? u : `${d}px`, m = `${r.floating.height + s}px`) : c === "right" ? (p = `${-s}px`, m = a ? u : `${f}px`) : c === "left" && (p = `${r.floating.width + s}px`, m = a ? u : `${f}px`), { data: {
			x: p,
			y: m
		} };
	}
});
function xo(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
var So = co, Co = uo, wo = ho, To = vo, Eo = "Portal", Do = e.forwardRef((t, n) => {
	let { container: r, ...i } = t, [a, o] = e.useState(!1);
	Ve(() => o(!0), []);
	let s = r || a && globalThis?.document?.body;
	return s ? g.createPortal(/* @__PURE__ */ p(U.div, {
		...i,
		ref: n
	}), s) : null;
});
Do.displayName = Eo;
//#endregion
//#region node_modules/aria-hidden/dist/es2015/index.js
var Oo = function(e) {
	return typeof document > "u" ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
}, ko = /* @__PURE__ */ new WeakMap(), Ao = /* @__PURE__ */ new WeakMap(), jo = {}, Mo = 0, No = function(e) {
	return e && (e.host || No(e.parentNode));
}, Po = function(e, t) {
	return t.map(function(t) {
		if (e.contains(t)) return t;
		var n = No(t);
		return n && e.contains(n) ? n : (console.error("aria-hidden", t, "in not contained inside", e, ". Doing nothing"), null);
	}).filter(function(e) {
		return !!e;
	});
}, Fo = function(e, t, n, r) {
	var i = Po(t, Array.isArray(e) ? e : [e]);
	jo[n] || (jo[n] = /* @__PURE__ */ new WeakMap());
	var a = jo[n], o = [], s = /* @__PURE__ */ new Set(), c = new Set(i), l = function(e) {
		!e || s.has(e) || (s.add(e), l(e.parentNode));
	};
	i.forEach(l);
	var u = function(e) {
		!e || c.has(e) || Array.prototype.forEach.call(e.children, function(e) {
			if (s.has(e)) u(e);
			else try {
				var t = e.getAttribute(r), i = t !== null && t !== "false", c = (ko.get(e) || 0) + 1, l = (a.get(e) || 0) + 1;
				ko.set(e, c), a.set(e, l), o.push(e), c === 1 && i && Ao.set(e, !0), l === 1 && e.setAttribute(n, "true"), i || e.setAttribute(r, "true");
			} catch (t) {
				console.error("aria-hidden: cannot operate on ", e, t);
			}
		});
	};
	return u(t), s.clear(), Mo++, function() {
		o.forEach(function(e) {
			var t = ko.get(e) - 1, i = a.get(e) - 1;
			ko.set(e, t), a.set(e, i), t || (Ao.has(e) || e.removeAttribute(r), Ao.delete(e)), i || e.removeAttribute(n);
		}), Mo--, Mo || (ko = /* @__PURE__ */ new WeakMap(), ko = /* @__PURE__ */ new WeakMap(), Ao = /* @__PURE__ */ new WeakMap(), jo = {});
	};
}, Io = function(e, t, n) {
	n === void 0 && (n = "data-aria-hidden");
	var r = Array.from(Array.isArray(e) ? e : [e]), i = t || Oo(e);
	return i ? (r.push.apply(r, Array.from(i.querySelectorAll("[aria-live], script"))), Fo(r, i, n, "aria-hidden")) : function() {
		return null;
	};
}, Lo = function() {
	return Lo = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, Lo.apply(this, arguments);
};
function Ro(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function zo(e, t, n) {
	if (n || arguments.length === 2) for (var r = 0, i = t.length, a; r < i; r++) (a || !(r in t)) && (a ||= Array.prototype.slice.call(t, 0, r), a[r] = t[r]);
	return e.concat(a || Array.prototype.slice.call(t));
}
//#endregion
//#region node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var Bo = "right-scroll-bar-position", Vo = "width-before-scroll-bar", Ho = "with-scroll-bars-hidden", Uo = "--removed-body-scroll-bar-size";
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/assignRef.js
function Wo(e, t) {
	return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/useRef.js
function Go(e, t) {
	var n = d(function() {
		return {
			value: e,
			callback: t,
			facade: {
				get current() {
					return n.value;
				},
				set current(e) {
					var t = n.value;
					t !== e && (n.value = e, n.callback(e, t));
				}
			}
		};
	})[0];
	return n.callback = t, n.facade;
}
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/useMergeRef.js
var Ko = typeof window < "u" ? e.useLayoutEffect : e.useEffect, qo = /* @__PURE__ */ new WeakMap();
function Jo(e, t) {
	var n = Go(t || null, function(t) {
		return e.forEach(function(e) {
			return Wo(e, t);
		});
	});
	return Ko(function() {
		var t = qo.get(n);
		if (t) {
			var r = new Set(t), i = new Set(e), a = n.current;
			r.forEach(function(e) {
				i.has(e) || Wo(e, null);
			}), i.forEach(function(e) {
				r.has(e) || Wo(e, a);
			});
		}
		qo.set(n, e);
	}, [e]), n;
}
//#endregion
//#region node_modules/use-sidecar/dist/es2015/medium.js
function Yo(e) {
	return e;
}
function Xo(e, t) {
	t === void 0 && (t = Yo);
	var n = [], r = !1;
	return {
		read: function() {
			if (r) throw Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
			return n.length ? n[n.length - 1] : e;
		},
		useMedium: function(e) {
			var i = t(e, r);
			return n.push(i), function() {
				n = n.filter(function(e) {
					return e !== i;
				});
			};
		},
		assignSyncMedium: function(e) {
			for (r = !0; n.length;) {
				var t = n;
				n = [], t.forEach(e);
			}
			n = {
				push: function(t) {
					return e(t);
				},
				filter: function() {
					return n;
				}
			};
		},
		assignMedium: function(e) {
			r = !0;
			var t = [];
			if (n.length) {
				var i = n;
				n = [], i.forEach(e), t = n;
			}
			var a = function() {
				var n = t;
				t = [], n.forEach(e);
			}, o = function() {
				return Promise.resolve().then(a);
			};
			o(), n = {
				push: function(e) {
					t.push(e), o();
				},
				filter: function(e) {
					return t = t.filter(e), n;
				}
			};
		}
	};
}
function Zo(e) {
	e === void 0 && (e = {});
	var t = Xo(null);
	return t.options = Lo({
		async: !0,
		ssr: !1
	}, e), t;
}
//#endregion
//#region node_modules/use-sidecar/dist/es2015/exports.js
var Qo = function(t) {
	var n = t.sideCar, r = Ro(t, ["sideCar"]);
	if (!n) throw Error("Sidecar: please provide `sideCar` property to import the right car");
	var i = n.read();
	if (!i) throw Error("Sidecar medium not found");
	return e.createElement(i, Lo({}, r));
};
Qo.isSideCarExport = !0;
function $o(e, t) {
	return e.useMedium(t), Qo;
}
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/medium.js
var es = Zo(), ts = function() {}, ns = e.forwardRef(function(t, n) {
	var r = e.useRef(null), i = e.useState({
		onScrollCapture: ts,
		onWheelCapture: ts,
		onTouchMoveCapture: ts
	}), a = i[0], o = i[1], s = t.forwardProps, c = t.children, l = t.className, u = t.removeScrollBar, d = t.enabled, f = t.shards, p = t.sideCar, m = t.noRelative, h = t.noIsolation, g = t.inert, _ = t.allowPinchZoom, v = t.as, y = v === void 0 ? "div" : v, b = t.gapMode, x = Ro(t, [
		"forwardProps",
		"children",
		"className",
		"removeScrollBar",
		"enabled",
		"shards",
		"sideCar",
		"noRelative",
		"noIsolation",
		"inert",
		"allowPinchZoom",
		"as",
		"gapMode"
	]), S = p, C = Jo([r, n]), w = Lo(Lo({}, x), a);
	return e.createElement(e.Fragment, null, d && e.createElement(S, {
		sideCar: es,
		removeScrollBar: u,
		shards: f,
		noRelative: m,
		noIsolation: h,
		inert: g,
		setCallbacks: o,
		allowPinchZoom: !!_,
		lockRef: r,
		gapMode: b
	}), s ? e.cloneElement(e.Children.only(c), Lo(Lo({}, w), { ref: C })) : e.createElement(y, Lo({}, w, {
		className: l,
		ref: C
	}), c));
});
ns.defaultProps = {
	enabled: !0,
	removeScrollBar: !0,
	inert: !1
}, ns.classNames = {
	fullWidth: Vo,
	zeroRight: Bo
};
//#endregion
//#region node_modules/get-nonce/dist/es2015/index.js
var rs, is = function() {
	if (rs) return rs;
	if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
//#endregion
//#region node_modules/react-style-singleton/dist/es2015/singleton.js
function as() {
	if (!document) return null;
	var e = document.createElement("style");
	e.type = "text/css";
	var t = is();
	return t && e.setAttribute("nonce", t), e;
}
function os(e, t) {
	e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function ss(e) {
	(document.head || document.getElementsByTagName("head")[0]).appendChild(e);
}
var cs = function() {
	var e = 0, t = null;
	return {
		add: function(n) {
			e == 0 && (t = as()) && (os(t, n), ss(t)), e++;
		},
		remove: function() {
			e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
		}
	};
}, ls = function() {
	var t = cs();
	return function(n, r) {
		e.useEffect(function() {
			return t.add(n), function() {
				t.remove();
			};
		}, [n && r]);
	};
}, us = function() {
	var e = ls();
	return function(t) {
		var n = t.styles, r = t.dynamic;
		return e(n, r), null;
	};
}, ds = {
	left: 0,
	top: 0,
	right: 0,
	gap: 0
}, fs = function(e) {
	return parseInt(e || "", 10) || 0;
}, ps = function(e) {
	var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], i = t[e === "padding" ? "paddingRight" : "marginRight"];
	return [
		fs(n),
		fs(r),
		fs(i)
	];
}, ms = function(e) {
	if (e === void 0 && (e = "margin"), typeof window > "u") return ds;
	var t = ps(e), n = document.documentElement.clientWidth, r = window.innerWidth;
	return {
		left: t[0],
		top: t[1],
		right: t[2],
		gap: Math.max(0, r - n + t[2] - t[0])
	};
}, hs = us(), gs = "data-scroll-locked", _s = function(e, t, n, r) {
	var i = e.left, a = e.top, o = e.right, s = e.gap;
	return n === void 0 && (n = "margin"), `
  .${Ho} {
   overflow: hidden ${r};
   padding-right: ${s}px ${r};
  }
  body[${gs}] {
    overflow: hidden ${r};
    overscroll-behavior: contain;
    ${[
		t && `position: relative ${r};`,
		n === "margin" && `
    padding-left: ${i}px;
    padding-top: ${a}px;
    padding-right: ${o}px;
    margin-left:0;
    margin-top:0;
    margin-right: ${s}px ${r};
    `,
		n === "padding" && `padding-right: ${s}px ${r};`
	].filter(Boolean).join("")}
  }
  
  .${Bo} {
    right: ${s}px ${r};
  }
  
  .${Vo} {
    margin-right: ${s}px ${r};
  }
  
  .${Bo} .${Bo} {
    right: 0 ${r};
  }
  
  .${Vo} .${Vo} {
    margin-right: 0 ${r};
  }
  
  body[${gs}] {
    ${Uo}: ${s}px;
  }
`;
}, vs = function() {
	var e = parseInt(document.body.getAttribute("data-scroll-locked") || "0", 10);
	return isFinite(e) ? e : 0;
}, ys = function() {
	e.useEffect(function() {
		return document.body.setAttribute(gs, (vs() + 1).toString()), function() {
			var e = vs() - 1;
			e <= 0 ? document.body.removeAttribute(gs) : document.body.setAttribute(gs, e.toString());
		};
	}, []);
}, bs = function(t) {
	var n = t.noRelative, r = t.noImportant, i = t.gapMode, a = i === void 0 ? "margin" : i;
	ys();
	var o = e.useMemo(function() {
		return ms(a);
	}, [a]);
	return e.createElement(hs, { styles: _s(o, !n, a, r ? "" : "!important") });
}, xs = !1;
if (typeof window < "u") try {
	var Ss = Object.defineProperty({}, "passive", { get: function() {
		return xs = !0, !0;
	} });
	window.addEventListener("test", Ss, Ss), window.removeEventListener("test", Ss, Ss);
} catch {
	xs = !1;
}
var Cs = xs ? { passive: !1 } : !1, ws = function(e) {
	return e.tagName === "TEXTAREA";
}, Ts = function(e, t) {
	if (!(e instanceof Element)) return !1;
	var n = window.getComputedStyle(e);
	return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !ws(e) && n[t] === "visible");
}, Es = function(e) {
	return Ts(e, "overflowY");
}, Ds = function(e) {
	return Ts(e, "overflowX");
}, Os = function(e, t) {
	var n = t.ownerDocument, r = t;
	do {
		if (typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host), js(e, r)) {
			var i = Ms(e, r);
			if (i[1] > i[2]) return !0;
		}
		r = r.parentNode;
	} while (r && r !== n.body);
	return !1;
}, ks = function(e) {
	return [
		e.scrollTop,
		e.scrollHeight,
		e.clientHeight
	];
}, As = function(e) {
	return [
		e.scrollLeft,
		e.scrollWidth,
		e.clientWidth
	];
}, js = function(e, t) {
	return e === "v" ? Es(t) : Ds(t);
}, Ms = function(e, t) {
	return e === "v" ? ks(t) : As(t);
}, Ns = function(e, t) {
	return e === "h" && t === "rtl" ? -1 : 1;
}, Ps = function(e, t, n, r, i) {
	var a = Ns(e, window.getComputedStyle(t).direction), o = a * r, s = n.target, c = t.contains(s), l = !1, u = o > 0, d = 0, f = 0;
	do {
		if (!s) break;
		var p = Ms(e, s), m = p[0], h = p[1] - p[2] - a * m;
		(m || h) && js(e, s) && (d += h, f += m);
		var g = s.parentNode;
		s = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
	} while (!c && s !== document.body || c && (t.contains(s) || t === s));
	return (u && (i && Math.abs(d) < 1 || !i && o > d) || !u && (i && Math.abs(f) < 1 || !i && -o > f)) && (l = !0), l;
}, Fs = function(e) {
	return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Is = function(e) {
	return [e.deltaX, e.deltaY];
}, Ls = function(e) {
	return e && "current" in e ? e.current : e;
}, Rs = function(e, t) {
	return e[0] === t[0] && e[1] === t[1];
}, zs = function(e) {
	return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`;
}, Bs = 0, Vs = [];
function Hs(t) {
	var n = e.useRef([]), r = e.useRef([0, 0]), i = e.useRef(), a = e.useState(Bs++)[0], o = e.useState(us)[0], s = e.useRef(t);
	e.useEffect(function() {
		s.current = t;
	}, [t]), e.useEffect(function() {
		if (t.inert) {
			document.body.classList.add(`block-interactivity-${a}`);
			var e = zo([t.lockRef.current], (t.shards || []).map(Ls), !0).filter(Boolean);
			return e.forEach(function(e) {
				return e.classList.add(`allow-interactivity-${a}`);
			}), function() {
				document.body.classList.remove(`block-interactivity-${a}`), e.forEach(function(e) {
					return e.classList.remove(`allow-interactivity-${a}`);
				});
			};
		}
	}, [
		t.inert,
		t.lockRef.current,
		t.shards
	]);
	var c = e.useCallback(function(e, t) {
		if ("touches" in e && e.touches.length === 2 || e.type === "wheel" && e.ctrlKey) return !s.current.allowPinchZoom;
		var n = Fs(e), a = r.current, o = "deltaX" in e ? e.deltaX : a[0] - n[0], c = "deltaY" in e ? e.deltaY : a[1] - n[1], l, u = e.target, d = Math.abs(o) > Math.abs(c) ? "h" : "v";
		if ("touches" in e && d === "h" && u.type === "range") return !1;
		var f = window.getSelection(), p = f && f.anchorNode;
		if (p && (p === u || p.contains(u))) return !1;
		var m = Os(d, u);
		if (!m) return !0;
		if (m ? l = d : (l = d === "v" ? "h" : "v", m = Os(d, u)), !m) return !1;
		if (!i.current && "changedTouches" in e && (o || c) && (i.current = l), !l) return !0;
		var h = i.current || l;
		return Ps(h, t, e, h === "h" ? o : c, !0);
	}, []), l = e.useCallback(function(e) {
		var t = e;
		if (!(!Vs.length || Vs[Vs.length - 1] !== o)) {
			var r = "deltaY" in t ? Is(t) : Fs(t), i = n.current.filter(function(e) {
				return e.name === t.type && (e.target === t.target || t.target === e.shadowParent) && Rs(e.delta, r);
			})[0];
			if (i && i.should) {
				t.cancelable && t.preventDefault();
				return;
			}
			if (!i) {
				var a = (s.current.shards || []).map(Ls).filter(Boolean).filter(function(e) {
					return e.contains(t.target);
				});
				(a.length > 0 ? c(t, a[0]) : !s.current.noIsolation) && t.cancelable && t.preventDefault();
			}
		}
	}, []), u = e.useCallback(function(e, t, r, i) {
		var a = {
			name: e,
			delta: t,
			target: r,
			should: i,
			shadowParent: Us(r)
		};
		n.current.push(a), setTimeout(function() {
			n.current = n.current.filter(function(e) {
				return e !== a;
			});
		}, 1);
	}, []), d = e.useCallback(function(e) {
		r.current = Fs(e), i.current = void 0;
	}, []), f = e.useCallback(function(e) {
		u(e.type, Is(e), e.target, c(e, t.lockRef.current));
	}, []), p = e.useCallback(function(e) {
		u(e.type, Fs(e), e.target, c(e, t.lockRef.current));
	}, []);
	e.useEffect(function() {
		return Vs.push(o), t.setCallbacks({
			onScrollCapture: f,
			onWheelCapture: f,
			onTouchMoveCapture: p
		}), document.addEventListener("wheel", l, Cs), document.addEventListener("touchmove", l, Cs), document.addEventListener("touchstart", d, Cs), function() {
			Vs = Vs.filter(function(e) {
				return e !== o;
			}), document.removeEventListener("wheel", l, Cs), document.removeEventListener("touchmove", l, Cs), document.removeEventListener("touchstart", d, Cs);
		};
	}, []);
	var m = t.removeScrollBar, h = t.inert;
	return e.createElement(e.Fragment, null, h ? e.createElement(o, { styles: zs(a) }) : null, m ? e.createElement(bs, {
		noRelative: t.noRelative,
		gapMode: t.gapMode
	}) : null);
}
function Us(e) {
	for (var t = null; e !== null;) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
	return t;
}
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/sidecar.js
var Ws = $o(es, Hs), Gs = e.forwardRef(function(t, n) {
	return e.createElement(ns, Lo({}, t, {
		ref: n,
		sideCar: Ws
	}));
});
Gs.classNames = ns.classNames;
//#endregion
//#region node_modules/@radix-ui/react-popover/dist/index.mjs
var Ks = "Popover", [qs, Js] = Ae(Ks, [ao]), Ys = ao(), [Xs, Zs] = qs(Ks), Qs = (t) => {
	let { __scopePopover: n, children: r, open: i, defaultOpen: a, onOpenChange: o, modal: s = !1 } = t, c = Ys(n), l = e.useRef(null), [u, d] = e.useState(!1), [f, m] = qe({
		prop: i,
		defaultProp: a ?? !1,
		onChange: o,
		caller: Ks
	});
	return /* @__PURE__ */ p(So, {
		...c,
		children: /* @__PURE__ */ p(Xs, {
			scope: n,
			contentId: We(),
			triggerRef: l,
			open: f,
			onOpenChange: m,
			onOpenToggle: e.useCallback(() => m((e) => !e), [m]),
			hasCustomAnchor: u,
			onCustomAnchorAdd: e.useCallback(() => d(!0), []),
			onCustomAnchorRemove: e.useCallback(() => d(!1), []),
			modal: s,
			children: r
		})
	});
};
Qs.displayName = Ks;
var $s = "PopoverAnchor", ec = e.forwardRef((t, n) => {
	let { __scopePopover: r, ...i } = t, a = Zs($s, r), o = Ys(r), { onCustomAnchorAdd: s, onCustomAnchorRemove: c } = a;
	return e.useEffect(() => (s(), () => c()), [s, c]), /* @__PURE__ */ p(Co, {
		...o,
		...i,
		ref: n
	});
});
ec.displayName = $s;
var tc = "PopoverTrigger", nc = e.forwardRef((e, t) => {
	let { __scopePopover: n, ...r } = e, i = Zs(tc, n), a = Ys(n), o = H(t, i.triggerRef), s = /* @__PURE__ */ p(U.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": i.open,
		"aria-controls": i.contentId,
		"data-state": _c(i.open),
		...r,
		ref: o,
		onClick: V(e.onClick, i.onOpenToggle)
	});
	return i.hasCustomAnchor ? s : /* @__PURE__ */ p(Co, {
		asChild: !0,
		...a,
		children: s
	});
});
nc.displayName = tc;
var rc = "PopoverPortal", [ic, ac] = qs(rc, { forceMount: void 0 }), oc = (e) => {
	let { __scopePopover: t, forceMount: n, children: r, container: i } = e, a = Zs(rc, t);
	return /* @__PURE__ */ p(ic, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ p(St, {
			present: n || a.open,
			children: /* @__PURE__ */ p(Do, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
};
oc.displayName = rc;
var sc = "PopoverContent", cc = e.forwardRef((e, t) => {
	let n = ac(sc, e.__scopePopover), { forceMount: r = n.forceMount, ...i } = e, a = Zs(sc, e.__scopePopover);
	return /* @__PURE__ */ p(St, {
		present: r || a.open,
		children: a.modal ? /* @__PURE__ */ p(uc, {
			...i,
			ref: t
		}) : /* @__PURE__ */ p(dc, {
			...i,
			ref: t
		})
	});
});
cc.displayName = sc;
var lc = /* @__PURE__ */ Me("PopoverContent.RemoveScroll"), uc = e.forwardRef((t, n) => {
	let r = Zs(sc, t.__scopePopover), i = e.useRef(null), a = H(n, i), o = e.useRef(!1);
	return e.useEffect(() => {
		let e = i.current;
		if (e) return Io(e);
	}, []), /* @__PURE__ */ p(Gs, {
		as: lc,
		allowPinchZoom: !0,
		children: /* @__PURE__ */ p(fc, {
			...t,
			ref: a,
			trapFocus: r.open,
			disableOutsidePointerEvents: !0,
			onCloseAutoFocus: V(t.onCloseAutoFocus, (e) => {
				e.preventDefault(), o.current || r.triggerRef.current?.focus();
			}),
			onPointerDownOutside: V(t.onPointerDownOutside, (e) => {
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
				o.current = t.button === 2 || n;
			}, { checkForDefaultPrevented: !1 }),
			onFocusOutside: V(t.onFocusOutside, (e) => e.preventDefault(), { checkForDefaultPrevented: !1 })
		})
	});
}), dc = e.forwardRef((t, n) => {
	let r = Zs(sc, t.__scopePopover), i = e.useRef(!1), a = e.useRef(!1);
	return /* @__PURE__ */ p(fc, {
		...t,
		ref: n,
		trapFocus: !1,
		disableOutsidePointerEvents: !1,
		onCloseAutoFocus: (e) => {
			t.onCloseAutoFocus?.(e), e.defaultPrevented || (i.current || r.triggerRef.current?.focus(), e.preventDefault()), i.current = !1, a.current = !1;
		},
		onInteractOutside: (e) => {
			t.onInteractOutside?.(e), e.defaultPrevented || (i.current = !0, e.detail.originalEvent.type === "pointerdown" && (a.current = !0));
			let n = e.target;
			r.triggerRef.current?.contains(n) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && a.current && e.preventDefault();
		}
	});
}), fc = e.forwardRef((e, t) => {
	let { __scopePopover: n, trapFocus: r, onOpenAutoFocus: i, onCloseAutoFocus: a, disableOutsidePointerEvents: o, onEscapeKeyDown: s, onPointerDownOutside: c, onFocusOutside: l, onInteractOutside: u, ...d } = e, f = Zs(sc, n), m = Ys(n);
	return wr(), /* @__PURE__ */ p(Ar, {
		asChild: !0,
		loop: !0,
		trapped: r,
		onMountAutoFocus: i,
		onUnmountAutoFocus: a,
		children: /* @__PURE__ */ p(gr, {
			asChild: !0,
			disableOutsidePointerEvents: o,
			onInteractOutside: u,
			onEscapeKeyDown: s,
			onPointerDownOutside: c,
			onFocusOutside: l,
			onDismiss: () => f.onOpenChange(!1),
			children: /* @__PURE__ */ p(wo, {
				"data-state": _c(f.open),
				role: "dialog",
				id: f.contentId,
				...m,
				...d,
				ref: t,
				style: {
					...d.style,
					"--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
					"--radix-popover-content-available-width": "var(--radix-popper-available-width)",
					"--radix-popover-content-available-height": "var(--radix-popper-available-height)",
					"--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
					"--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
				}
			})
		})
	});
}), pc = "PopoverClose", mc = e.forwardRef((e, t) => {
	let { __scopePopover: n, ...r } = e, i = Zs(pc, n);
	return /* @__PURE__ */ p(U.button, {
		type: "button",
		...r,
		ref: t,
		onClick: V(e.onClick, () => i.onOpenChange(!1))
	});
});
mc.displayName = pc;
var hc = "PopoverArrow", gc = e.forwardRef((e, t) => {
	let { __scopePopover: n, ...r } = e;
	return /* @__PURE__ */ p(To, {
		...Ys(n),
		...r,
		ref: t
	});
});
gc.displayName = hc;
function _c(e) {
	return e ? "open" : "closed";
}
var vc = Qs, yc = nc, bc = oc, xc = cc, W = {
	container: "_container_fzb3k_1",
	label: "_label_fzb3k_19",
	triggerWrapper: "_triggerWrapper_fzb3k_31",
	inputField: "_inputField_fzb3k_43",
	icon: "_icon_fzb3k_91",
	iconOpen: "_iconOpen_fzb3k_111",
	dropdown: "_dropdown_fzb3k_121",
	slideDown: "_slideDown_fzb3k_1",
	option: "_option_fzb3k_153",
	optionSelected: "_optionSelected_fzb3k_185",
	noResults: "_noResults_fzb3k_195",
	inputError: "_inputError_fzb3k_233",
	checkIcon: "_checkIcon_fzb3k_241",
	errorMessage: "_errorMessage_fzb3k_249",
	cbTrigger: "_cbTrigger_fzb3k_267",
	cbTriggerText: "_cbTriggerText_fzb3k_337",
	cbTriggerIcon: "_cbTriggerIcon_fzb3k_359",
	cbContent: "_cbContent_fzb3k_371",
	searchBox: "_searchBox_fzb3k_393",
	searchInputWrap: "_searchInputWrap_fzb3k_409",
	searchIcon: "_searchIcon_fzb3k_421",
	searchInput: "_searchInput_fzb3k_409",
	searchList: "_searchList_fzb3k_463",
	searchItem: "_searchItem_fzb3k_475",
	searchItemActive: "_searchItemActive_fzb3k_515",
	searchCheck: "_searchCheck_fzb3k_527",
	searchItemLabel: "_searchItemLabel_fzb3k_541",
	searchEmpty: "_searchEmpty_fzb3k_553"
}, Sc = 100;
function Cc({ options: t, value: n, onChange: r, label: i, error: a, placeholder: o = "Selecione...", className: s, disabled: c }) {
	let [l, u] = e.useState(!1), [d, h] = e.useState(""), g = t.find((e) => e.value === n), _ = d.trim().toLowerCase(), v = _ ? t.filter((e) => e.label.toLowerCase().includes(_)) : t, y = v.slice(0, Sc), b = (e) => {
		r?.(e), u(!1), h("");
	};
	return /* @__PURE__ */ m("div", {
		className: x(W.container, s),
		children: [
			i && /* @__PURE__ */ p("label", {
				className: W.label,
				children: i
			}),
			/* @__PURE__ */ m(vc, {
				open: l,
				onOpenChange: (e) => {
					u(e), e || h("");
				},
				children: [/* @__PURE__ */ p(yc, {
					asChild: !0,
					disabled: c,
					children: /* @__PURE__ */ m("button", {
						type: "button",
						className: x(W.cbTrigger, a && W.inputError),
						children: [/* @__PURE__ */ p("span", {
							className: W.cbTriggerText,
							"data-placeholder": g ? void 0 : "",
							children: g ? g.label : o
						}), /* @__PURE__ */ p(ae, {
							size: 16,
							className: W.cbTriggerIcon
						})]
					})
				}), /* @__PURE__ */ p(bc, { children: /* @__PURE__ */ m(xc, {
					className: W.cbContent,
					align: "start",
					sideOffset: 4,
					style: {
						zIndex: 9999,
						width: "var(--radix-popover-trigger-width)"
					},
					children: [/* @__PURE__ */ p("div", {
						className: W.searchBox,
						children: /* @__PURE__ */ m("div", {
							className: W.searchInputWrap,
							children: [/* @__PURE__ */ p(me, {
								size: 14,
								className: W.searchIcon
							}), /* @__PURE__ */ p("input", {
								autoFocus: !0,
								className: W.searchInput,
								value: d,
								onChange: (e) => h(e.target.value),
								placeholder: "Buscar…"
							})]
						})
					}), /* @__PURE__ */ p("div", {
						className: W.searchList,
						children: y.length > 0 ? /* @__PURE__ */ m(f, { children: [y.map((e) => /* @__PURE__ */ m("button", {
							type: "button",
							className: x(W.searchItem, e.value === n && W.searchItemActive),
							onClick: () => b(e.value),
							children: [/* @__PURE__ */ p("span", {
								className: W.searchCheck,
								children: e.value === n && /* @__PURE__ */ p(R, { size: 15 })
							}), /* @__PURE__ */ p("span", {
								className: W.searchItemLabel,
								children: e.label
							})]
						}, e.value)), v.length > Sc && /* @__PURE__ */ m("div", {
							className: W.searchEmpty,
							children: [
								"Refine a busca — ",
								v.length - Sc,
								" itens ocultos"
							]
						})] }) : /* @__PURE__ */ p("div", {
							className: W.searchEmpty,
							children: "Nenhum resultado."
						})
					})]
				}) })]
			}),
			a && /* @__PURE__ */ p("span", {
				className: W.errorMessage,
				children: a
			})
		]
	});
}
Cc.displayName = "Combobox";
var G = {
	container: "_container_1v2vr_1",
	label: "_label_1v2vr_17",
	dropzone: "_dropzone_1v2vr_29",
	idle: "_idle_1v2vr_69",
	dragging: "_dragging_1v2vr_79",
	uploading: "_uploading_1v2vr_91",
	success: "_success_1v2vr_101",
	error: "_error_1v2vr_113",
	fileCard: "_fileCard_1v2vr_135",
	errorMessage: "_errorMessage_1v2vr_159",
	hiddenInput: "_hiddenInput_1v2vr_173",
	idleContent: "_idleContent_1v2vr_183",
	uploadingContent: "_uploadingContent_1v2vr_185",
	successContent: "_successContent_1v2vr_187",
	uploadIcon: "_uploadIcon_1v2vr_209",
	uploadIconError: "_uploadIconError_1v2vr_219",
	uploadText: "_uploadText_1v2vr_229",
	uploadClickText: "_uploadClickText_1v2vr_241",
	uploadHint: "_uploadHint_1v2vr_251",
	spinner: "_spinner_1v2vr_265",
	uploadingText: "_uploadingText_1v2vr_273",
	uploadPulse: "_uploadPulse_1v2vr_1",
	successIcon: "_successIcon_1v2vr_297",
	fileInfo: "_fileInfo_1v2vr_309",
	fileName: "_fileName_1v2vr_321",
	fileSize: "_fileSize_1v2vr_337",
	fileIcon: "_fileIcon_1v2vr_347",
	fileClearBtn: "_fileClearBtn_1v2vr_359"
}, wc = (e) => {
	if (!+e) return "0 Bytes";
	let t = 1024, n = [
		"Bytes",
		"KB",
		"MB",
		"GB"
	], r = Math.floor(Math.log(e) / Math.log(t));
	return `${parseFloat((e / t ** +r).toFixed(2))} ${n[r]}`;
}, Tc = i(({ className: e, onFileSelect: t, accept: n, maxSize: r = 5 * 1024 * 1024, label: i, error: a, id: o, ...s }, c) => {
	let [l, f] = d("idle"), [h, g] = d(null), [_, v] = d(""), y = u(null), b = !!a || !!_, S = a || _, C = o || (i ? `fileupload-${i.replace(/\s+/g, "-").toLowerCase()}` : void 0), w = (e) => {
		if (r && e.size > r) {
			f("error"), v(`O arquivo excede o limite de ${wc(r)}`);
			return;
		}
		v(""), g(e), f("uploading"), setTimeout(() => {
			f("success"), t?.(e);
		}, 1500);
	}, T = (e) => {
		e.preventDefault(), f("idle");
		let t = e.dataTransfer.files?.[0];
		t && w(t);
	}, E = () => {
		g(null), f("idle"), v(""), t?.(null), y.current && (y.current.value = "");
	};
	return /* @__PURE__ */ m("div", {
		className: x(G.container, e),
		children: [
			i && /* @__PURE__ */ p("label", {
				htmlFor: C,
				className: G.label,
				children: i
			}),
			/* @__PURE__ */ m("div", {
				ref: c,
				className: x(G.dropzone, G[l], b && l === "idle" && G.error),
				onDragOver: (e) => {
					e.preventDefault(), f("dragging");
				},
				onDragLeave: () => f("idle"),
				onDrop: T,
				onClick: () => (l === "idle" || l === "error") && y.current?.click(),
				tabIndex: 0,
				onKeyDown: (e) => (e.key === "Enter" || e.key === " ") && y.current?.click(),
				...s,
				children: [
					/* @__PURE__ */ p("input", {
						id: C,
						type: "file",
						className: G.hiddenInput,
						accept: n,
						onChange: (e) => e.target.files?.[0] && w(e.target.files[0]),
						ref: y,
						disabled: l === "uploading" || l === "success"
					}),
					(l === "idle" || l === "dragging" || l === "error") && /* @__PURE__ */ m("div", {
						className: G.idleContent,
						children: [
							/* @__PURE__ */ p(ce, {
								size: 40,
								className: x(G.uploadIcon, b && G.uploadIconError)
							}),
							/* @__PURE__ */ m(D, {
								variant: "p",
								className: G.uploadText,
								children: [/* @__PURE__ */ p("span", {
									className: G.uploadClickText,
									children: "Clique para enviar"
								}), " ou arraste"]
							}),
							/* @__PURE__ */ m(D, {
								variant: "p",
								className: G.uploadHint,
								children: ["Até ", wc(r)]
							})
						]
					}),
					l === "uploading" && /* @__PURE__ */ m("div", {
						className: G.uploadingContent,
						children: [/* @__PURE__ */ p(ve, {
							size: "lg",
							className: G.spinner
						}), /* @__PURE__ */ p(D, {
							variant: "p",
							className: G.uploadingText,
							children: "Enviando..."
						})]
					}),
					l === "success" && h && /* @__PURE__ */ m("div", {
						className: G.successContent,
						children: [/* @__PURE__ */ p(oe, {
							size: 32,
							className: G.successIcon
						}), /* @__PURE__ */ m("div", {
							className: G.fileCard,
							children: [
								/* @__PURE__ */ p(z, {
									size: 20,
									className: G.fileIcon
								}),
								/* @__PURE__ */ m("div", {
									className: G.fileInfo,
									children: [/* @__PURE__ */ p("div", {
										className: G.fileName,
										children: h.name
									}), /* @__PURE__ */ p("div", {
										className: G.fileSize,
										children: wc(h.size)
									})]
								}),
								/* @__PURE__ */ p("button", {
									type: "button",
									onClick: (e) => {
										e.stopPropagation(), E();
									},
									className: G.fileClearBtn,
									children: /* @__PURE__ */ p(he, { size: 16 })
								})
							]
						})]
					})
				]
			}),
			S && /* @__PURE__ */ p("span", {
				className: G.errorMessage,
				children: S
			})
		]
	});
});
Tc.displayName = "FileUpload";
//#endregion
//#region node_modules/@radix-ui/react-visually-hidden/dist/index.mjs
var Ec = Object.freeze({
	position: "absolute",
	border: 0,
	width: 1,
	height: 1,
	padding: 0,
	margin: -1,
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	wordWrap: "normal"
}), Dc = "VisuallyHidden", Oc = e.forwardRef((e, t) => /* @__PURE__ */ p(U.span, {
	...e,
	ref: t,
	style: {
		...Ec,
		...e.style
	}
}));
Oc.displayName = Dc;
var kc = Oc, Ac = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
], jc = [" ", "Enter"], Mc = "Select", [Nc, Pc, Fc] = Be(Mc), [Ic, Lc] = Ae(Mc, [Fc, ao]), Rc = ao(), [zc, Bc] = Ic(Mc), [Vc, Hc] = Ic(Mc), Uc = (t) => {
	let { __scopeSelect: n, children: r, open: i, defaultOpen: a, onOpenChange: o, value: s, defaultValue: c, onValueChange: l, dir: u, name: d, autoComplete: f, disabled: h, required: g, form: _ } = t, v = Rc(n), [y, b] = e.useState(null), [x, S] = e.useState(null), [C, w] = e.useState(!1), T = Ze(u), [E, D] = qe({
		prop: i,
		defaultProp: a ?? !1,
		onChange: o,
		caller: Mc
	}), [O, k] = qe({
		prop: s,
		defaultProp: c,
		onChange: l,
		caller: Mc
	}), A = e.useRef(null), j = y ? _ || !!y.closest("form") : !0, [M, N] = e.useState(/* @__PURE__ */ new Set()), P = Array.from(M).map((e) => e.props.value).join(";");
	return /* @__PURE__ */ p(So, {
		...v,
		children: /* @__PURE__ */ m(zc, {
			required: g,
			scope: n,
			trigger: y,
			onTriggerChange: b,
			valueNode: x,
			onValueNodeChange: S,
			valueNodeHasChildren: C,
			onValueNodeHasChildrenChange: w,
			contentId: We(),
			value: O,
			onValueChange: k,
			open: E,
			onOpenChange: D,
			dir: T,
			triggerPointerDownPosRef: A,
			disabled: h,
			children: [/* @__PURE__ */ p(Nc.Provider, {
				scope: n,
				children: /* @__PURE__ */ p(Vc, {
					scope: t.__scopeSelect,
					onNativeOptionAdd: e.useCallback((e) => {
						N((t) => new Set(t).add(e));
					}, []),
					onNativeOptionRemove: e.useCallback((e) => {
						N((t) => {
							let n = new Set(t);
							return n.delete(e), n;
						});
					}, []),
					children: r
				})
			}), j ? /* @__PURE__ */ m(Rl, {
				"aria-hidden": !0,
				required: g,
				tabIndex: -1,
				name: d,
				autoComplete: f,
				value: O,
				onChange: (e) => k(e.target.value),
				disabled: h,
				form: _,
				children: [O === void 0 ? /* @__PURE__ */ p("option", { value: "" }) : null, Array.from(M)]
			}, P) : null]
		})
	});
};
Uc.displayName = Mc;
var Wc = "SelectTrigger", Gc = e.forwardRef((t, n) => {
	let { __scopeSelect: r, disabled: i = !1, ...a } = t, o = Rc(r), s = Bc(Wc, r), c = s.disabled || i, l = H(n, s.onTriggerChange), u = Pc(r), d = e.useRef("touch"), [f, m, h] = Bl((e) => {
		let t = u().filter((e) => !e.disabled), n = Vl(t, e, t.find((e) => e.value === s.value));
		n !== void 0 && s.onValueChange(n.value);
	}), g = (e) => {
		c || (s.onOpenChange(!0), h()), e && (s.triggerPointerDownPosRef.current = {
			x: Math.round(e.pageX),
			y: Math.round(e.pageY)
		});
	};
	return /* @__PURE__ */ p(Co, {
		asChild: !0,
		...o,
		children: /* @__PURE__ */ p(U.button, {
			type: "button",
			role: "combobox",
			"aria-controls": s.contentId,
			"aria-expanded": s.open,
			"aria-required": s.required,
			"aria-autocomplete": "none",
			dir: s.dir,
			"data-state": s.open ? "open" : "closed",
			disabled: c,
			"data-disabled": c ? "" : void 0,
			"data-placeholder": zl(s.value) ? "" : void 0,
			...a,
			ref: l,
			onClick: V(a.onClick, (e) => {
				e.currentTarget.focus(), d.current !== "mouse" && g(e);
			}),
			onPointerDown: V(a.onPointerDown, (e) => {
				d.current = e.pointerType;
				let t = e.target;
				t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), e.button === 0 && e.ctrlKey === !1 && e.pointerType === "mouse" && (g(e), e.preventDefault());
			}),
			onKeyDown: V(a.onKeyDown, (e) => {
				let t = f.current !== "";
				!(e.ctrlKey || e.altKey || e.metaKey) && e.key.length === 1 && m(e.key), !(t && e.key === " ") && Ac.includes(e.key) && (g(), e.preventDefault());
			})
		})
	});
});
Gc.displayName = Wc;
var Kc = "SelectValue", qc = e.forwardRef((e, t) => {
	let { __scopeSelect: n, className: r, style: i, children: a, placeholder: o = "", ...s } = e, c = Bc(Kc, n), { onValueNodeHasChildrenChange: l } = c, u = a !== void 0, d = H(t, c.onValueNodeChange);
	return Ve(() => {
		l(u);
	}, [l, u]), /* @__PURE__ */ p(U.span, {
		...s,
		ref: d,
		style: { pointerEvents: "none" },
		children: zl(c.value) ? /* @__PURE__ */ p(f, { children: o }) : a
	});
});
qc.displayName = Kc;
var Jc = "SelectIcon", Yc = e.forwardRef((e, t) => {
	let { __scopeSelect: n, children: r, ...i } = e;
	return /* @__PURE__ */ p(U.span, {
		"aria-hidden": !0,
		...i,
		ref: t,
		children: r || "▼"
	});
});
Yc.displayName = Jc;
var Xc = "SelectPortal", Zc = (e) => /* @__PURE__ */ p(Do, {
	asChild: !0,
	...e
});
Zc.displayName = Xc;
var Qc = "SelectContent", $c = e.forwardRef((t, n) => {
	let r = Bc(Qc, t.__scopeSelect), [i, a] = e.useState();
	if (Ve(() => {
		a(new DocumentFragment());
	}, []), !r.open) {
		let e = i;
		return e ? h.createPortal(/* @__PURE__ */ p(tl, {
			scope: t.__scopeSelect,
			children: /* @__PURE__ */ p(Nc.Slot, {
				scope: t.__scopeSelect,
				children: /* @__PURE__ */ p("div", { children: t.children })
			})
		}), e) : null;
	}
	return /* @__PURE__ */ p(al, {
		...t,
		ref: n
	});
});
$c.displayName = Qc;
var el = 10, [tl, nl] = Ic(Qc), rl = "SelectContentImpl", il = /* @__PURE__ */ Me("SelectContent.RemoveScroll"), al = e.forwardRef((t, n) => {
	let { __scopeSelect: r, position: i = "item-aligned", onCloseAutoFocus: a, onEscapeKeyDown: o, onPointerDownOutside: s, side: c, sideOffset: l, align: u, alignOffset: d, arrowPadding: f, collisionBoundary: m, collisionPadding: h, sticky: g, hideWhenDetached: _, avoidCollisions: v, ...y } = t, b = Bc(Qc, r), [x, S] = e.useState(null), [C, w] = e.useState(null), T = H(n, (e) => S(e)), [E, D] = e.useState(null), [O, k] = e.useState(null), A = Pc(r), [j, M] = e.useState(!1), N = e.useRef(!1);
	e.useEffect(() => {
		if (x) return Io(x);
	}, [x]), wr();
	let P = e.useCallback((e) => {
		let [t, ...n] = A().map((e) => e.ref.current), [r] = n.slice(-1), i = document.activeElement;
		for (let n of e) if (n === i || (n?.scrollIntoView({ block: "nearest" }), n === t && C && (C.scrollTop = 0), n === r && C && (C.scrollTop = C.scrollHeight), n?.focus(), document.activeElement !== i)) return;
	}, [A, C]), F = e.useCallback(() => P([E, x]), [
		P,
		E,
		x
	]);
	e.useEffect(() => {
		j && F();
	}, [j, F]);
	let { onOpenChange: I, triggerPointerDownPosRef: L } = b;
	e.useEffect(() => {
		if (x) {
			let e = {
				x: 0,
				y: 0
			}, t = (t) => {
				e = {
					x: Math.abs(Math.round(t.pageX) - (L.current?.x ?? 0)),
					y: Math.abs(Math.round(t.pageY) - (L.current?.y ?? 0))
				};
			}, n = (n) => {
				e.x <= 10 && e.y <= 10 ? n.preventDefault() : x.contains(n.target) || I(!1), document.removeEventListener("pointermove", t), L.current = null;
			};
			return L.current !== null && (document.addEventListener("pointermove", t), document.addEventListener("pointerup", n, {
				capture: !0,
				once: !0
			})), () => {
				document.removeEventListener("pointermove", t), document.removeEventListener("pointerup", n, { capture: !0 });
			};
		}
	}, [
		x,
		I,
		L
	]), e.useEffect(() => {
		let e = () => I(!1);
		return window.addEventListener("blur", e), window.addEventListener("resize", e), () => {
			window.removeEventListener("blur", e), window.removeEventListener("resize", e);
		};
	}, [I]);
	let [ee, te] = Bl((e) => {
		let t = A().filter((e) => !e.disabled), n = Vl(t, e, t.find((e) => e.ref.current === document.activeElement));
		n && setTimeout(() => n.ref.current.focus());
	}), R = e.useCallback((e, t, n) => {
		let r = !N.current && !n;
		(b.value !== void 0 && b.value === t || r) && (D(e), r && (N.current = !0));
	}, [b.value]), ne = e.useCallback(() => x?.focus(), [x]), re = e.useCallback((e, t, n) => {
		let r = !N.current && !n;
		(b.value !== void 0 && b.value === t || r) && k(e);
	}, [b.value]), ie = i === "popper" ? ll : sl, ae = ie === ll ? {
		side: c,
		sideOffset: l,
		align: u,
		alignOffset: d,
		arrowPadding: f,
		collisionBoundary: m,
		collisionPadding: h,
		sticky: g,
		hideWhenDetached: _,
		avoidCollisions: v
	} : {};
	return /* @__PURE__ */ p(tl, {
		scope: r,
		content: x,
		viewport: C,
		onViewportChange: w,
		itemRefCallback: R,
		selectedItem: E,
		onItemLeave: ne,
		itemTextRefCallback: re,
		focusSelectedItem: F,
		selectedItemText: O,
		position: i,
		isPositioned: j,
		searchRef: ee,
		children: /* @__PURE__ */ p(Gs, {
			as: il,
			allowPinchZoom: !0,
			children: /* @__PURE__ */ p(Ar, {
				asChild: !0,
				trapped: b.open,
				onMountAutoFocus: (e) => {
					e.preventDefault();
				},
				onUnmountAutoFocus: V(a, (e) => {
					b.trigger?.focus({ preventScroll: !0 }), e.preventDefault();
				}),
				children: /* @__PURE__ */ p(gr, {
					asChild: !0,
					disableOutsidePointerEvents: !0,
					onEscapeKeyDown: o,
					onPointerDownOutside: s,
					onFocusOutside: (e) => e.preventDefault(),
					onDismiss: () => b.onOpenChange(!1),
					children: /* @__PURE__ */ p(ie, {
						role: "listbox",
						id: b.contentId,
						"data-state": b.open ? "open" : "closed",
						dir: b.dir,
						onContextMenu: (e) => e.preventDefault(),
						...y,
						...ae,
						onPlaced: () => M(!0),
						ref: T,
						style: {
							display: "flex",
							flexDirection: "column",
							outline: "none",
							...y.style
						},
						onKeyDown: V(y.onKeyDown, (e) => {
							let t = e.ctrlKey || e.altKey || e.metaKey;
							if (e.key === "Tab" && e.preventDefault(), !t && e.key.length === 1 && te(e.key), [
								"ArrowUp",
								"ArrowDown",
								"Home",
								"End"
							].includes(e.key)) {
								let t = A().filter((e) => !e.disabled).map((e) => e.ref.current);
								if (["ArrowUp", "End"].includes(e.key) && (t = t.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(e.key)) {
									let n = e.target, r = t.indexOf(n);
									t = t.slice(r + 1);
								}
								setTimeout(() => P(t)), e.preventDefault();
							}
						})
					})
				})
			})
		})
	});
});
al.displayName = rl;
var ol = "SelectItemAlignedPosition", sl = e.forwardRef((t, n) => {
	let { __scopeSelect: r, onPlaced: i, ...a } = t, o = Bc(Qc, r), s = nl(Qc, r), [c, l] = e.useState(null), [u, d] = e.useState(null), f = H(n, (e) => d(e)), m = Pc(r), h = e.useRef(!1), g = e.useRef(!0), { viewport: _, selectedItem: v, selectedItemText: y, focusSelectedItem: b } = s, x = e.useCallback(() => {
		if (o.trigger && o.valueNode && c && u && _ && v && y) {
			let e = o.trigger.getBoundingClientRect(), t = u.getBoundingClientRect(), n = o.valueNode.getBoundingClientRect(), r = y.getBoundingClientRect();
			if (o.dir !== "rtl") {
				let i = r.left - t.left, a = n.left - i, o = e.left - a, s = e.width + o, l = Math.max(s, t.width), u = window.innerWidth - el, d = nn(a, [el, Math.max(el, u - l)]);
				c.style.minWidth = s + "px", c.style.left = d + "px";
			} else {
				let i = t.right - r.right, a = window.innerWidth - n.right - i, o = window.innerWidth - e.right - a, s = e.width + o, l = Math.max(s, t.width), u = window.innerWidth - el, d = nn(a, [el, Math.max(el, u - l)]);
				c.style.minWidth = s + "px", c.style.right = d + "px";
			}
			let a = m(), s = window.innerHeight - el * 2, l = _.scrollHeight, d = window.getComputedStyle(u), f = parseInt(d.borderTopWidth, 10), p = parseInt(d.paddingTop, 10), g = parseInt(d.borderBottomWidth, 10), b = parseInt(d.paddingBottom, 10), x = f + p + l + b + g, S = Math.min(v.offsetHeight * 5, x), C = window.getComputedStyle(_), w = parseInt(C.paddingTop, 10), T = parseInt(C.paddingBottom, 10), E = e.top + e.height / 2 - el, D = s - E, O = v.offsetHeight / 2, k = v.offsetTop + O, A = f + p + k, j = x - A;
			if (A <= E) {
				let e = a.length > 0 && v === a[a.length - 1].ref.current;
				c.style.bottom = "0px";
				let t = u.clientHeight - _.offsetTop - _.offsetHeight, n = A + Math.max(D, O + (e ? T : 0) + t + g);
				c.style.height = n + "px";
			} else {
				let e = a.length > 0 && v === a[0].ref.current;
				c.style.top = "0px";
				let t = Math.max(E, f + _.offsetTop + (e ? w : 0) + O) + j;
				c.style.height = t + "px", _.scrollTop = A - E + _.offsetTop;
			}
			c.style.margin = `${el}px 0`, c.style.minHeight = S + "px", c.style.maxHeight = s + "px", i?.(), requestAnimationFrame(() => h.current = !0);
		}
	}, [
		m,
		o.trigger,
		o.valueNode,
		c,
		u,
		_,
		v,
		y,
		o.dir,
		i
	]);
	Ve(() => x(), [x]);
	let [S, C] = e.useState();
	return Ve(() => {
		u && C(window.getComputedStyle(u).zIndex);
	}, [u]), /* @__PURE__ */ p(ul, {
		scope: r,
		contentWrapper: c,
		shouldExpandOnScrollRef: h,
		onScrollButtonChange: e.useCallback((e) => {
			e && g.current === !0 && (x(), b?.(), g.current = !1);
		}, [x, b]),
		children: /* @__PURE__ */ p("div", {
			ref: l,
			style: {
				display: "flex",
				flexDirection: "column",
				position: "fixed",
				zIndex: S
			},
			children: /* @__PURE__ */ p(U.div, {
				...a,
				ref: f,
				style: {
					boxSizing: "border-box",
					maxHeight: "100%",
					...a.style
				}
			})
		})
	});
});
sl.displayName = ol;
var cl = "SelectPopperPosition", ll = e.forwardRef((e, t) => {
	let { __scopeSelect: n, align: r = "start", collisionPadding: i = el, ...a } = e;
	return /* @__PURE__ */ p(wo, {
		...Rc(n),
		...a,
		ref: t,
		align: r,
		collisionPadding: i,
		style: {
			boxSizing: "border-box",
			...a.style,
			"--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-select-content-available-width": "var(--radix-popper-available-width)",
			"--radix-select-content-available-height": "var(--radix-popper-available-height)",
			"--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
ll.displayName = cl;
var [ul, dl] = Ic(Qc, {}), fl = "SelectViewport", pl = e.forwardRef((t, n) => {
	let { __scopeSelect: r, nonce: i, ...a } = t, o = nl(fl, r), s = dl(fl, r), c = H(n, o.onViewportChange), l = e.useRef(0);
	return /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p("style", {
		dangerouslySetInnerHTML: { __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}" },
		nonce: i
	}), /* @__PURE__ */ p(Nc.Slot, {
		scope: r,
		children: /* @__PURE__ */ p(U.div, {
			"data-radix-select-viewport": "",
			role: "presentation",
			...a,
			ref: c,
			style: {
				position: "relative",
				flex: 1,
				overflow: "hidden auto",
				...a.style
			},
			onScroll: V(a.onScroll, (e) => {
				let t = e.currentTarget, { contentWrapper: n, shouldExpandOnScrollRef: r } = s;
				if (r?.current && n) {
					let e = Math.abs(l.current - t.scrollTop);
					if (e > 0) {
						let r = window.innerHeight - el * 2, i = parseFloat(n.style.minHeight), a = parseFloat(n.style.height), o = Math.max(i, a);
						if (o < r) {
							let i = o + e, a = Math.min(r, i), s = i - a;
							n.style.height = a + "px", n.style.bottom === "0px" && (t.scrollTop = s > 0 ? s : 0, n.style.justifyContent = "flex-end");
						}
					}
				}
				l.current = t.scrollTop;
			})
		})
	})] });
});
pl.displayName = fl;
var ml = "SelectGroup", [hl, gl] = Ic(ml), _l = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e, i = We();
	return /* @__PURE__ */ p(hl, {
		scope: n,
		id: i,
		children: /* @__PURE__ */ p(U.div, {
			role: "group",
			"aria-labelledby": i,
			...r,
			ref: t
		})
	});
});
_l.displayName = ml;
var vl = "SelectLabel", yl = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e, i = gl(vl, n);
	return /* @__PURE__ */ p(U.div, {
		id: i.id,
		...r,
		ref: t
	});
});
yl.displayName = vl;
var bl = "SelectItem", [xl, Sl] = Ic(bl), Cl = e.forwardRef((t, n) => {
	let { __scopeSelect: r, value: i, disabled: a = !1, textValue: o, ...s } = t, c = Bc(bl, r), l = nl(bl, r), u = c.value === i, [d, f] = e.useState(o ?? ""), [m, h] = e.useState(!1), g = H(n, (e) => l.itemRefCallback?.(e, i, a)), _ = We(), v = e.useRef("touch"), y = () => {
		a || (c.onValueChange(i), c.onOpenChange(!1));
	};
	if (i === "") throw Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
	return /* @__PURE__ */ p(xl, {
		scope: r,
		value: i,
		disabled: a,
		textId: _,
		isSelected: u,
		onItemTextChange: e.useCallback((e) => {
			f((t) => t || (e?.textContent ?? "").trim());
		}, []),
		children: /* @__PURE__ */ p(Nc.ItemSlot, {
			scope: r,
			value: i,
			disabled: a,
			textValue: d,
			children: /* @__PURE__ */ p(U.div, {
				role: "option",
				"aria-labelledby": _,
				"data-highlighted": m ? "" : void 0,
				"aria-selected": u && m,
				"data-state": u ? "checked" : "unchecked",
				"aria-disabled": a || void 0,
				"data-disabled": a ? "" : void 0,
				tabIndex: a ? void 0 : -1,
				...s,
				ref: g,
				onFocus: V(s.onFocus, () => h(!0)),
				onBlur: V(s.onBlur, () => h(!1)),
				onClick: V(s.onClick, () => {
					v.current !== "mouse" && y();
				}),
				onPointerUp: V(s.onPointerUp, () => {
					v.current === "mouse" && y();
				}),
				onPointerDown: V(s.onPointerDown, (e) => {
					v.current = e.pointerType;
				}),
				onPointerMove: V(s.onPointerMove, (e) => {
					v.current = e.pointerType, a ? l.onItemLeave?.() : v.current === "mouse" && e.currentTarget.focus({ preventScroll: !0 });
				}),
				onPointerLeave: V(s.onPointerLeave, (e) => {
					e.currentTarget === document.activeElement && l.onItemLeave?.();
				}),
				onKeyDown: V(s.onKeyDown, (e) => {
					l.searchRef?.current !== "" && e.key === " " || (jc.includes(e.key) && y(), e.key === " " && e.preventDefault());
				})
			})
		})
	});
});
Cl.displayName = bl;
var wl = "SelectItemText", Tl = e.forwardRef((t, n) => {
	let { __scopeSelect: r, className: i, style: a, ...o } = t, s = Bc(wl, r), c = nl(wl, r), l = Sl(wl, r), u = Hc(wl, r), [d, g] = e.useState(null), _ = H(n, (e) => g(e), l.onItemTextChange, (e) => c.itemTextRefCallback?.(e, l.value, l.disabled)), v = d?.textContent, y = e.useMemo(() => /* @__PURE__ */ p("option", {
		value: l.value,
		disabled: l.disabled,
		children: v
	}, l.value), [
		l.disabled,
		l.value,
		v
	]), { onNativeOptionAdd: b, onNativeOptionRemove: x } = u;
	return Ve(() => (b(y), () => x(y)), [
		b,
		x,
		y
	]), /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p(U.span, {
		id: l.textId,
		...o,
		ref: _
	}), l.isSelected && s.valueNode && !s.valueNodeHasChildren ? h.createPortal(o.children, s.valueNode) : null] });
});
Tl.displayName = wl;
var El = "SelectItemIndicator", Dl = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e;
	return Sl(El, n).isSelected ? /* @__PURE__ */ p(U.span, {
		"aria-hidden": !0,
		...r,
		ref: t
	}) : null;
});
Dl.displayName = El;
var Ol = "SelectScrollUpButton", kl = e.forwardRef((t, n) => {
	let r = nl(Ol, t.__scopeSelect), i = dl(Ol, t.__scopeSelect), [a, o] = e.useState(!1), s = H(n, i.onScrollButtonChange);
	return Ve(() => {
		if (r.viewport && r.isPositioned) {
			let e = function() {
				o(t.scrollTop > 0);
			}, t = r.viewport;
			return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e);
		}
	}, [r.viewport, r.isPositioned]), a ? /* @__PURE__ */ p(Ml, {
		...t,
		ref: s,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: t } = r;
			e && t && (e.scrollTop -= t.offsetHeight);
		}
	}) : null;
});
kl.displayName = Ol;
var Al = "SelectScrollDownButton", jl = e.forwardRef((t, n) => {
	let r = nl(Al, t.__scopeSelect), i = dl(Al, t.__scopeSelect), [a, o] = e.useState(!1), s = H(n, i.onScrollButtonChange);
	return Ve(() => {
		if (r.viewport && r.isPositioned) {
			let e = function() {
				let e = t.scrollHeight - t.clientHeight;
				o(Math.ceil(t.scrollTop) < e);
			}, t = r.viewport;
			return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e);
		}
	}, [r.viewport, r.isPositioned]), a ? /* @__PURE__ */ p(Ml, {
		...t,
		ref: s,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: t } = r;
			e && t && (e.scrollTop += t.offsetHeight);
		}
	}) : null;
});
jl.displayName = Al;
var Ml = e.forwardRef((t, n) => {
	let { __scopeSelect: r, onAutoScroll: i, ...a } = t, o = nl("SelectScrollButton", r), s = e.useRef(null), c = Pc(r), l = e.useCallback(() => {
		s.current !== null && (window.clearInterval(s.current), s.current = null);
	}, []);
	return e.useEffect(() => () => l(), [l]), Ve(() => {
		c().find((e) => e.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
	}, [c]), /* @__PURE__ */ p(U.div, {
		"aria-hidden": !0,
		...a,
		ref: n,
		style: {
			flexShrink: 0,
			...a.style
		},
		onPointerDown: V(a.onPointerDown, () => {
			s.current === null && (s.current = window.setInterval(i, 50));
		}),
		onPointerMove: V(a.onPointerMove, () => {
			o.onItemLeave?.(), s.current === null && (s.current = window.setInterval(i, 50));
		}),
		onPointerLeave: V(a.onPointerLeave, () => {
			l();
		})
	});
}), Nl = "SelectSeparator", Pl = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e;
	return /* @__PURE__ */ p(U.div, {
		"aria-hidden": !0,
		...r,
		ref: t
	});
});
Pl.displayName = Nl;
var Fl = "SelectArrow", Il = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e, i = Rc(n), a = Bc(Fl, n), o = nl(Fl, n);
	return a.open && o.position === "popper" ? /* @__PURE__ */ p(To, {
		...i,
		...r,
		ref: t
	}) : null;
});
Il.displayName = Fl;
var Ll = "SelectBubbleInput", Rl = e.forwardRef(({ __scopeSelect: t, value: n, ...r }, i) => {
	let a = e.useRef(null), o = H(i, a), s = bt(n);
	return e.useEffect(() => {
		let e = a.current;
		if (!e) return;
		let t = window.HTMLSelectElement.prototype, r = Object.getOwnPropertyDescriptor(t, "value").set;
		if (s !== n && r) {
			let t = new Event("change", { bubbles: !0 });
			r.call(e, n), e.dispatchEvent(t);
		}
	}, [s, n]), /* @__PURE__ */ p(U.select, {
		...r,
		style: {
			...Ec,
			...r.style
		},
		ref: o,
		defaultValue: n
	});
});
Rl.displayName = Ll;
function zl(e) {
	return e === "" || e === void 0;
}
function Bl(t) {
	let n = Ge(t), r = e.useRef(""), i = e.useRef(0), a = e.useCallback((e) => {
		let t = r.current + e;
		n(t), (function e(t) {
			r.current = t, window.clearTimeout(i.current), t !== "" && (i.current = window.setTimeout(() => e(""), 1e3));
		})(t);
	}, [n]), o = e.useCallback(() => {
		r.current = "", window.clearTimeout(i.current);
	}, []);
	return e.useEffect(() => () => window.clearTimeout(i.current), []), [
		r,
		a,
		o
	];
}
function Vl(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = Hl(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.textValue.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
function Hl(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
var Ul = Uc, Wl = Gc, Gl = qc, Kl = Yc, ql = Zc, Jl = $c, Yl = pl, Xl = Cl, Zl = Tl, Ql = Dl, K = {
	container: "_container_127ii_1",
	levelWrapper: "_levelWrapper_127ii_37",
	trigger: "_trigger_127ii_51",
	content: "_content_127ii_119",
	item: "_item_127ii_143",
	separator: "_separator_127ii_181",
	levelLabel: "_levelLabel_127ii_203",
	triggerContent: "_triggerContent_127ii_223",
	triggerIcon: "_triggerIcon_127ii_243",
	viewport: "_viewport_127ii_257",
	itemIndicator: "_itemIndicator_127ii_267",
	searchBox: "_searchBox_127ii_289",
	searchInputWrap: "_searchInputWrap_127ii_305",
	searchInput: "_searchInput_127ii_305",
	searchList: "_searchList_127ii_345",
	searchItem: "_searchItem_127ii_357",
	searchItemActive: "_searchItemActive_127ii_397",
	searchEmpty: "_searchEmpty_127ii_409"
}, $l = 8;
function eu({ level: t }) {
	let [n, r] = e.useState(!1), [i, a] = e.useState(""), [o, s] = e.useState(t.value ?? t.defaultValue ?? "");
	e.useEffect(() => {
		t.value !== void 0 && s(t.value);
	}, [t.value]);
	let c = t.value === void 0 ? o : t.value, l = t.options.find((e) => e.value === c), u = i.trim().toLowerCase(), d = u ? t.options.filter((e) => e.label.toLowerCase().includes(u)) : t.options, f = (e) => {
		s(e), t.onChange?.(e), r(!1), a("");
	};
	return /* @__PURE__ */ m(vc, {
		open: n,
		onOpenChange: (e) => {
			r(e), e || a("");
		},
		children: [/* @__PURE__ */ p(yc, {
			asChild: !0,
			disabled: t.disabled,
			children: /* @__PURE__ */ m("button", {
				type: "button",
				className: K.trigger,
				children: [/* @__PURE__ */ m("div", {
					className: K.triggerContent,
					children: [t.icon && /* @__PURE__ */ p(t.icon, {
						size: 16,
						style: {
							color: "var(--color-secundaria)",
							opacity: .7
						}
					}), /* @__PURE__ */ p("span", {
						style: {
							fontSize: 14,
							fontWeight: 500,
							color: l ? "#374151" : "#9CA3AF",
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
							maxWidth: 200
						},
						children: l ? l.label : t.placeholder || "Selecione..."
					})]
				}), /* @__PURE__ */ p(ae, {
					size: 16,
					className: K.triggerIcon
				})]
			})
		}), /* @__PURE__ */ p(bc, { children: /* @__PURE__ */ m(xc, {
			className: K.content,
			align: "start",
			sideOffset: 4,
			style: {
				width: 300,
				padding: 0
			},
			children: [/* @__PURE__ */ p("div", {
				className: K.searchBox,
				children: /* @__PURE__ */ m("div", {
					className: K.searchInputWrap,
					children: [/* @__PURE__ */ p(me, {
						size: 14,
						style: {
							position: "absolute",
							left: 9,
							color: "#9CA3AF"
						}
					}), /* @__PURE__ */ p("input", {
						autoFocus: !0,
						className: K.searchInput,
						value: i,
						onChange: (e) => a(e.target.value),
						placeholder: "Buscar…"
					})]
				})
			}), /* @__PURE__ */ p("div", {
				className: K.searchList,
				children: d.length > 0 ? d.map((e) => /* @__PURE__ */ m("button", {
					type: "button",
					className: x(K.searchItem, e.value === c && K.searchItemActive),
					onClick: () => f(e.value),
					children: [/* @__PURE__ */ p("span", {
						style: {
							width: 16,
							display: "flex",
							flexShrink: 0
						},
						children: e.value === c && /* @__PURE__ */ p(R, { size: 15 })
					}), /* @__PURE__ */ p("span", {
						style: {
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap"
						},
						children: e.label
					})]
				}, e.value)) : /* @__PURE__ */ p("div", {
					className: K.searchEmpty,
					children: "Nenhum resultado."
				})
			})]
		}) })]
	});
}
function tu({ levels: t, className: n }) {
	return /* @__PURE__ */ p("div", {
		className: x(K.container, n),
		children: t.map((n, r) => {
			let i = n.options.length === 1;
			return /* @__PURE__ */ m(e.Fragment, { children: [/* @__PURE__ */ m("div", {
				className: K.levelWrapper,
				children: [n.label && /* @__PURE__ */ p(D, {
					as: "label",
					variant: "p",
					className: K.levelLabel,
					style: { color: "color-mix(in srgb, var(--color-secundaria), transparent 30%)" },
					children: n.label
				}), i ? /* @__PURE__ */ p("div", {
					className: K.trigger,
					style: {
						background: "transparent",
						border: "none",
						boxShadow: "none",
						paddingLeft: 0,
						cursor: "default",
						paddingRight: "12px"
					},
					children: /* @__PURE__ */ m("div", {
						className: K.triggerContent,
						children: [n.icon && /* @__PURE__ */ p(n.icon, {
							size: 16,
							style: {
								color: "var(--color-secundaria)",
								opacity: .7
							}
						}), /* @__PURE__ */ p("span", {
							style: {
								fontSize: "14px",
								fontWeight: 500,
								color: "#374151"
							},
							children: n.options[0].label
						})]
					})
				}) : n.options.length > $l ? /* @__PURE__ */ p(eu, { level: n }) : /* @__PURE__ */ m(Ul, {
					value: n.value,
					defaultValue: n.defaultValue,
					onValueChange: n.onChange,
					disabled: n.disabled,
					children: [/* @__PURE__ */ m(Wl, {
						className: K.trigger,
						children: [/* @__PURE__ */ m("div", {
							className: K.triggerContent,
							children: [n.icon && /* @__PURE__ */ p(n.icon, {
								size: 16,
								style: {
									color: "var(--color-secundaria)",
									opacity: .7
								}
							}), /* @__PURE__ */ p(Gl, { placeholder: n.placeholder || "Selecione..." })]
						}), /* @__PURE__ */ p(Kl, {
							asChild: !0,
							children: /* @__PURE__ */ p(ae, {
								size: 16,
								className: K.triggerIcon
							})
						})]
					}), /* @__PURE__ */ p(ql, { children: /* @__PURE__ */ p(Jl, {
						className: K.content,
						position: "popper",
						sideOffset: 4,
						children: /* @__PURE__ */ p(Yl, {
							className: K.viewport,
							children: n.options.map((e) => /* @__PURE__ */ m(Xl, {
								value: e.value,
								className: K.item,
								children: [/* @__PURE__ */ p("span", {
									className: K.itemIndicator,
									children: /* @__PURE__ */ p(Ql, { children: /* @__PURE__ */ p(R, { size: 16 }) })
								}), /* @__PURE__ */ p(Zl, { children: e.label })]
							}, e.value))
						})
					}) })]
				})]
			}), r < t.length - 1 && /* @__PURE__ */ p("div", {
				className: K.separator,
				children: /* @__PURE__ */ p(ie, {
					size: 16,
					style: {
						color: "var(--color-secundaria)",
						opacity: .4
					},
					strokeWidth: 2.5
				})
			})] }, n.id);
		})
	});
}
var nu = {
	container: "_container_kluho_1",
	label: "_label_kluho_17",
	trigger: "_trigger_kluho_29",
	triggerError: "_triggerError_kluho_67",
	inputField: "_inputField_kluho_75",
	errorMessage: "_errorMessage_kluho_103",
	removeTagBtn: "_removeTagBtn_kluho_115"
}, ru = i(({ className: e, value: t, defaultValue: n, onChange: r, label: i, error: a, id: o, placeholder: s = "Aperte Enter para adicionar...", ...c }, l) => {
	let [u, f] = d(n || []), [h, g] = d(""), _ = t === void 0 ? u : t, v = !!a, y = o || (i ? `taginput-${i.replace(/\s+/g, "-").toLowerCase()}` : void 0), b = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			let n = h.trim();
			if (n && !_.includes(n)) {
				let e = [..._, n];
				t === void 0 && f(e), r?.(e), g("");
			}
		}
	}, S = (e) => {
		let n = _.filter((t) => t !== e);
		t === void 0 && f(n), r?.(n);
	};
	return /* @__PURE__ */ m("div", {
		className: x(nu.container, e),
		children: [
			i && /* @__PURE__ */ p("label", {
				htmlFor: y,
				className: nu.label,
				children: i
			}),
			/* @__PURE__ */ m("div", {
				className: x(nu.trigger, v && nu.triggerError),
				onClick: () => document.getElementById(y || "")?.focus(),
				children: [_.map((e) => /* @__PURE__ */ m(A, {
					intent: "primaria",
					variant: "solid",
					children: [e, /* @__PURE__ */ p("button", {
						type: "button",
						className: nu.removeTagBtn,
						onClick: (t) => {
							t.stopPropagation(), S(e);
						},
						children: /* @__PURE__ */ p(he, { size: 12 })
					})]
				}, e)), /* @__PURE__ */ p("input", {
					id: y,
					ref: l,
					type: "text",
					className: nu.inputField,
					value: h,
					onChange: (e) => g(e.target.value),
					onKeyDown: b,
					placeholder: _.length === 0 ? s : "",
					...c
				})]
			}),
			a && /* @__PURE__ */ p("span", {
				className: nu.errorMessage,
				children: a
			})
		]
	});
});
ru.displayName = "TagInput";
//#endregion
//#region node_modules/@radix-ui/react-menu/dist/index.mjs
var iu = ["Enter", " "], au = [
	"ArrowDown",
	"PageUp",
	"Home"
], ou = [
	"ArrowUp",
	"PageDown",
	"End"
], su = [...au, ...ou], cu = {
	ltr: [...iu, "ArrowRight"],
	rtl: [...iu, "ArrowLeft"]
}, lu = {
	ltr: ["ArrowLeft"],
	rtl: ["ArrowRight"]
}, uu = "Menu", [du, fu, pu] = Be(uu), [mu, hu] = Ae(uu, [
	pu,
	ao,
	at
]), gu = ao(), _u = at(), [vu, yu] = mu(uu), [bu, xu] = mu(uu), Su = (t) => {
	let { __scopeMenu: n, open: r = !1, children: i, dir: a, onOpenChange: o, modal: s = !0 } = t, c = gu(n), [l, u] = e.useState(null), d = e.useRef(!1), f = Ge(o), m = Ze(a);
	return e.useEffect(() => {
		let e = () => {
			d.current = !0, document.addEventListener("pointerdown", t, {
				capture: !0,
				once: !0
			}), document.addEventListener("pointermove", t, {
				capture: !0,
				once: !0
			});
		}, t = () => d.current = !1;
		return document.addEventListener("keydown", e, { capture: !0 }), () => {
			document.removeEventListener("keydown", e, { capture: !0 }), document.removeEventListener("pointerdown", t, { capture: !0 }), document.removeEventListener("pointermove", t, { capture: !0 });
		};
	}, []), /* @__PURE__ */ p(So, {
		...c,
		children: /* @__PURE__ */ p(vu, {
			scope: n,
			open: r,
			onOpenChange: f,
			content: l,
			onContentChange: u,
			children: /* @__PURE__ */ p(bu, {
				scope: n,
				onClose: e.useCallback(() => f(!1), [f]),
				isUsingKeyboardRef: d,
				dir: m,
				modal: s,
				children: i
			})
		})
	});
};
Su.displayName = uu;
var Cu = "MenuAnchor", wu = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ p(Co, {
		...gu(n),
		...r,
		ref: t
	});
});
wu.displayName = Cu;
var Tu = "MenuPortal", [Eu, Du] = mu(Tu, { forceMount: void 0 }), Ou = (e) => {
	let { __scopeMenu: t, forceMount: n, children: r, container: i } = e, a = yu(Tu, t);
	return /* @__PURE__ */ p(Eu, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ p(St, {
			present: n || a.open,
			children: /* @__PURE__ */ p(Do, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
};
Ou.displayName = Tu;
var ku = "MenuContent", [Au, ju] = mu(ku), Mu = e.forwardRef((e, t) => {
	let n = Du(ku, e.__scopeMenu), { forceMount: r = n.forceMount, ...i } = e, a = yu(ku, e.__scopeMenu), o = xu(ku, e.__scopeMenu);
	return /* @__PURE__ */ p(du.Provider, {
		scope: e.__scopeMenu,
		children: /* @__PURE__ */ p(St, {
			present: r || a.open,
			children: /* @__PURE__ */ p(du.Slot, {
				scope: e.__scopeMenu,
				children: o.modal ? /* @__PURE__ */ p(Nu, {
					...i,
					ref: t
				}) : /* @__PURE__ */ p(Pu, {
					...i,
					ref: t
				})
			})
		})
	});
}), Nu = e.forwardRef((t, n) => {
	let r = yu(ku, t.__scopeMenu), i = e.useRef(null), a = H(n, i);
	return e.useEffect(() => {
		let e = i.current;
		if (e) return Io(e);
	}, []), /* @__PURE__ */ p(Iu, {
		...t,
		ref: a,
		trapFocus: r.open,
		disableOutsidePointerEvents: r.open,
		disableOutsideScroll: !0,
		onFocusOutside: V(t.onFocusOutside, (e) => e.preventDefault(), { checkForDefaultPrevented: !1 }),
		onDismiss: () => r.onOpenChange(!1)
	});
}), Pu = e.forwardRef((e, t) => {
	let n = yu(ku, e.__scopeMenu);
	return /* @__PURE__ */ p(Iu, {
		...e,
		ref: t,
		trapFocus: !1,
		disableOutsidePointerEvents: !1,
		disableOutsideScroll: !1,
		onDismiss: () => n.onOpenChange(!1)
	});
}), Fu = /* @__PURE__ */ Me("MenuContent.ScrollLock"), Iu = e.forwardRef((t, n) => {
	let { __scopeMenu: r, loop: i = !1, trapFocus: a, onOpenAutoFocus: o, onCloseAutoFocus: s, disableOutsidePointerEvents: c, onEntryFocus: l, onEscapeKeyDown: u, onPointerDownOutside: d, onFocusOutside: f, onInteractOutside: m, onDismiss: h, disableOutsideScroll: g, ..._ } = t, v = yu(ku, r), y = xu(ku, r), b = gu(r), x = _u(r), S = fu(r), [C, w] = e.useState(null), T = e.useRef(null), E = H(n, T, v.onContentChange), D = e.useRef(0), O = e.useRef(""), k = e.useRef(0), A = e.useRef(null), j = e.useRef("right"), M = e.useRef(0), N = g ? Gs : e.Fragment, P = g ? {
		as: Fu,
		allowPinchZoom: !0
	} : void 0, F = (e) => {
		let t = O.current + e, n = S().filter((e) => !e.disabled), r = document.activeElement, i = n.find((e) => e.ref.current === r)?.textValue, a = bd(n.map((e) => e.textValue), t, i), o = n.find((e) => e.textValue === a)?.ref.current;
		(function e(t) {
			O.current = t, window.clearTimeout(D.current), t !== "" && (D.current = window.setTimeout(() => e(""), 1e3));
		})(t), o && setTimeout(() => o.focus());
	};
	e.useEffect(() => () => window.clearTimeout(D.current), []), wr();
	let I = e.useCallback((e) => j.current === A.current?.side && Sd(e, A.current?.area), []);
	return /* @__PURE__ */ p(Au, {
		scope: r,
		searchRef: O,
		onItemEnter: e.useCallback((e) => {
			I(e) && e.preventDefault();
		}, [I]),
		onItemLeave: e.useCallback((e) => {
			I(e) || (T.current?.focus(), w(null));
		}, [I]),
		onTriggerLeave: e.useCallback((e) => {
			I(e) && e.preventDefault();
		}, [I]),
		pointerGraceTimerRef: k,
		onPointerGraceIntentChange: e.useCallback((e) => {
			A.current = e;
		}, []),
		children: /* @__PURE__ */ p(N, {
			...P,
			children: /* @__PURE__ */ p(Ar, {
				asChild: !0,
				trapped: a,
				onMountAutoFocus: V(o, (e) => {
					e.preventDefault(), T.current?.focus({ preventScroll: !0 });
				}),
				onUnmountAutoFocus: s,
				children: /* @__PURE__ */ p(gr, {
					asChild: !0,
					disableOutsidePointerEvents: c,
					onEscapeKeyDown: u,
					onPointerDownOutside: d,
					onFocusOutside: f,
					onInteractOutside: m,
					onDismiss: h,
					children: /* @__PURE__ */ p(_t, {
						asChild: !0,
						...x,
						dir: y.dir,
						orientation: "vertical",
						loop: i,
						currentTabStopId: C,
						onCurrentTabStopIdChange: w,
						onEntryFocus: V(l, (e) => {
							y.isUsingKeyboardRef.current || e.preventDefault();
						}),
						preventScrollOnEntryFocus: !0,
						children: /* @__PURE__ */ p(wo, {
							role: "menu",
							"aria-orientation": "vertical",
							"data-state": hd(v.open),
							"data-radix-menu-content": "",
							dir: y.dir,
							...b,
							..._,
							ref: E,
							style: {
								outline: "none",
								..._.style
							},
							onKeyDown: V(_.onKeyDown, (e) => {
								let t = e.target.closest("[data-radix-menu-content]") === e.currentTarget, n = e.ctrlKey || e.altKey || e.metaKey, r = e.key.length === 1;
								t && (e.key === "Tab" && e.preventDefault(), !n && r && F(e.key));
								let i = T.current;
								if (e.target !== i || !su.includes(e.key)) return;
								e.preventDefault();
								let a = S().filter((e) => !e.disabled).map((e) => e.ref.current);
								ou.includes(e.key) && a.reverse(), vd(a);
							}),
							onBlur: V(t.onBlur, (e) => {
								e.currentTarget.contains(e.target) || (window.clearTimeout(D.current), O.current = "");
							}),
							onPointerMove: V(t.onPointerMove, Cd((e) => {
								let t = e.target, n = M.current !== e.clientX;
								e.currentTarget.contains(t) && n && (j.current = e.clientX > M.current ? "right" : "left", M.current = e.clientX);
							}))
						})
					})
				})
			})
		})
	});
});
Mu.displayName = ku;
var Lu = "MenuGroup", Ru = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ p(U.div, {
		role: "group",
		...r,
		ref: t
	});
});
Ru.displayName = Lu;
var zu = "MenuLabel", Bu = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ p(U.div, {
		...r,
		ref: t
	});
});
Bu.displayName = zu;
var Vu = "MenuItem", Hu = "menu.itemSelect", Uu = e.forwardRef((t, n) => {
	let { disabled: r = !1, onSelect: i, ...a } = t, o = e.useRef(null), s = xu(Vu, t.__scopeMenu), c = ju(Vu, t.__scopeMenu), l = H(n, o), u = e.useRef(!1), d = () => {
		let e = o.current;
		if (!r && e) {
			let t = new CustomEvent(Hu, {
				bubbles: !0,
				cancelable: !0
			});
			e.addEventListener(Hu, (e) => i?.(e), { once: !0 }), ze(e, t), t.defaultPrevented ? u.current = !1 : s.onClose();
		}
	};
	return /* @__PURE__ */ p(Wu, {
		...a,
		ref: l,
		disabled: r,
		onClick: V(t.onClick, d),
		onPointerDown: (e) => {
			t.onPointerDown?.(e), u.current = !0;
		},
		onPointerUp: V(t.onPointerUp, (e) => {
			u.current || e.currentTarget?.click();
		}),
		onKeyDown: V(t.onKeyDown, (e) => {
			let t = c.searchRef.current !== "";
			r || t && e.key === " " || iu.includes(e.key) && (e.currentTarget.click(), e.preventDefault());
		})
	});
});
Uu.displayName = Vu;
var Wu = e.forwardRef((t, n) => {
	let { __scopeMenu: r, disabled: i = !1, textValue: a, ...o } = t, s = ju(Vu, r), c = _u(r), l = e.useRef(null), u = H(n, l), [d, f] = e.useState(!1), [m, h] = e.useState("");
	return e.useEffect(() => {
		let e = l.current;
		e && h((e.textContent ?? "").trim());
	}, [o.children]), /* @__PURE__ */ p(du.ItemSlot, {
		scope: r,
		disabled: i,
		textValue: a ?? m,
		children: /* @__PURE__ */ p(vt, {
			asChild: !0,
			...c,
			focusable: !i,
			children: /* @__PURE__ */ p(U.div, {
				role: "menuitem",
				"data-highlighted": d ? "" : void 0,
				"aria-disabled": i || void 0,
				"data-disabled": i ? "" : void 0,
				...o,
				ref: u,
				onPointerMove: V(t.onPointerMove, Cd((e) => {
					i ? s.onItemLeave(e) : (s.onItemEnter(e), e.defaultPrevented || e.currentTarget.focus({ preventScroll: !0 }));
				})),
				onPointerLeave: V(t.onPointerLeave, Cd((e) => s.onItemLeave(e))),
				onFocus: V(t.onFocus, () => f(!0)),
				onBlur: V(t.onBlur, () => f(!1))
			})
		})
	});
}), Gu = "MenuCheckboxItem", Ku = e.forwardRef((e, t) => {
	let { checked: n = !1, onCheckedChange: r, ...i } = e;
	return /* @__PURE__ */ p(ed, {
		scope: e.__scopeMenu,
		checked: n,
		children: /* @__PURE__ */ p(Uu, {
			role: "menuitemcheckbox",
			"aria-checked": gd(n) ? "mixed" : n,
			...i,
			ref: t,
			"data-state": _d(n),
			onSelect: V(i.onSelect, () => r?.(gd(n) ? !0 : !n), { checkForDefaultPrevented: !1 })
		})
	});
});
Ku.displayName = Gu;
var qu = "MenuRadioGroup", [Ju, Yu] = mu(qu, {
	value: void 0,
	onValueChange: () => {}
}), Xu = e.forwardRef((e, t) => {
	let { value: n, onValueChange: r, ...i } = e, a = Ge(r);
	return /* @__PURE__ */ p(Ju, {
		scope: e.__scopeMenu,
		value: n,
		onValueChange: a,
		children: /* @__PURE__ */ p(Ru, {
			...i,
			ref: t
		})
	});
});
Xu.displayName = qu;
var Zu = "MenuRadioItem", Qu = e.forwardRef((e, t) => {
	let { value: n, ...r } = e, i = Yu(Zu, e.__scopeMenu), a = n === i.value;
	return /* @__PURE__ */ p(ed, {
		scope: e.__scopeMenu,
		checked: a,
		children: /* @__PURE__ */ p(Uu, {
			role: "menuitemradio",
			"aria-checked": a,
			...r,
			ref: t,
			"data-state": _d(a),
			onSelect: V(r.onSelect, () => i.onValueChange?.(n), { checkForDefaultPrevented: !1 })
		})
	});
});
Qu.displayName = Zu;
var $u = "MenuItemIndicator", [ed, td] = mu($u, { checked: !1 }), nd = e.forwardRef((e, t) => {
	let { __scopeMenu: n, forceMount: r, ...i } = e, a = td($u, n);
	return /* @__PURE__ */ p(St, {
		present: r || gd(a.checked) || a.checked === !0,
		children: /* @__PURE__ */ p(U.span, {
			...i,
			ref: t,
			"data-state": _d(a.checked)
		})
	});
});
nd.displayName = $u;
var rd = "MenuSeparator", id = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ p(U.div, {
		role: "separator",
		"aria-orientation": "horizontal",
		...r,
		ref: t
	});
});
id.displayName = rd;
var ad = "MenuArrow", od = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ p(To, {
		...gu(n),
		...r,
		ref: t
	});
});
od.displayName = ad;
var sd = "MenuSub", [cd, ld] = mu(sd), ud = (t) => {
	let { __scopeMenu: n, children: r, open: i = !1, onOpenChange: a } = t, o = yu(sd, n), s = gu(n), [c, l] = e.useState(null), [u, d] = e.useState(null), f = Ge(a);
	return e.useEffect(() => (o.open === !1 && f(!1), () => f(!1)), [o.open, f]), /* @__PURE__ */ p(So, {
		...s,
		children: /* @__PURE__ */ p(vu, {
			scope: n,
			open: i,
			onOpenChange: f,
			content: u,
			onContentChange: d,
			children: /* @__PURE__ */ p(cd, {
				scope: n,
				contentId: We(),
				triggerId: We(),
				trigger: c,
				onTriggerChange: l,
				children: r
			})
		})
	});
};
ud.displayName = sd;
var dd = "MenuSubTrigger", fd = e.forwardRef((t, n) => {
	let r = yu(dd, t.__scopeMenu), i = xu(dd, t.__scopeMenu), a = ld(dd, t.__scopeMenu), o = ju(dd, t.__scopeMenu), s = e.useRef(null), { pointerGraceTimerRef: c, onPointerGraceIntentChange: l } = o, u = { __scopeMenu: t.__scopeMenu }, d = e.useCallback(() => {
		s.current && window.clearTimeout(s.current), s.current = null;
	}, []);
	return e.useEffect(() => d, [d]), e.useEffect(() => {
		let e = c.current;
		return () => {
			window.clearTimeout(e), l(null);
		};
	}, [c, l]), /* @__PURE__ */ p(wu, {
		asChild: !0,
		...u,
		children: /* @__PURE__ */ p(Wu, {
			id: a.triggerId,
			"aria-haspopup": "menu",
			"aria-expanded": r.open,
			"aria-controls": a.contentId,
			"data-state": hd(r.open),
			...t,
			ref: Oe(n, a.onTriggerChange),
			onClick: (e) => {
				t.onClick?.(e), !(t.disabled || e.defaultPrevented) && (e.currentTarget.focus(), r.open || r.onOpenChange(!0));
			},
			onPointerMove: V(t.onPointerMove, Cd((e) => {
				o.onItemEnter(e), !e.defaultPrevented && !t.disabled && !r.open && !s.current && (o.onPointerGraceIntentChange(null), s.current = window.setTimeout(() => {
					r.onOpenChange(!0), d();
				}, 100));
			})),
			onPointerLeave: V(t.onPointerLeave, Cd((e) => {
				d();
				let t = r.content?.getBoundingClientRect();
				if (t) {
					let n = r.content?.dataset.side, i = n === "right", a = i ? -5 : 5, s = t[i ? "left" : "right"], l = t[i ? "right" : "left"];
					o.onPointerGraceIntentChange({
						area: [
							{
								x: e.clientX + a,
								y: e.clientY
							},
							{
								x: s,
								y: t.top
							},
							{
								x: l,
								y: t.top
							},
							{
								x: l,
								y: t.bottom
							},
							{
								x: s,
								y: t.bottom
							}
						],
						side: n
					}), window.clearTimeout(c.current), c.current = window.setTimeout(() => o.onPointerGraceIntentChange(null), 300);
				} else {
					if (o.onTriggerLeave(e), e.defaultPrevented) return;
					o.onPointerGraceIntentChange(null);
				}
			})),
			onKeyDown: V(t.onKeyDown, (e) => {
				let n = o.searchRef.current !== "";
				t.disabled || n && e.key === " " || cu[i.dir].includes(e.key) && (r.onOpenChange(!0), r.content?.focus(), e.preventDefault());
			})
		})
	});
});
fd.displayName = dd;
var pd = "MenuSubContent", md = e.forwardRef((t, n) => {
	let r = Du(ku, t.__scopeMenu), { forceMount: i = r.forceMount, ...a } = t, o = yu(ku, t.__scopeMenu), s = xu(ku, t.__scopeMenu), c = ld(pd, t.__scopeMenu), l = e.useRef(null), u = H(n, l);
	return /* @__PURE__ */ p(du.Provider, {
		scope: t.__scopeMenu,
		children: /* @__PURE__ */ p(St, {
			present: i || o.open,
			children: /* @__PURE__ */ p(du.Slot, {
				scope: t.__scopeMenu,
				children: /* @__PURE__ */ p(Iu, {
					id: c.contentId,
					"aria-labelledby": c.triggerId,
					...a,
					ref: u,
					align: "start",
					side: s.dir === "rtl" ? "left" : "right",
					disableOutsidePointerEvents: !1,
					disableOutsideScroll: !1,
					trapFocus: !1,
					onOpenAutoFocus: (e) => {
						s.isUsingKeyboardRef.current && l.current?.focus(), e.preventDefault();
					},
					onCloseAutoFocus: (e) => e.preventDefault(),
					onFocusOutside: V(t.onFocusOutside, (e) => {
						e.target !== c.trigger && o.onOpenChange(!1);
					}),
					onEscapeKeyDown: V(t.onEscapeKeyDown, (e) => {
						s.onClose(), e.preventDefault();
					}),
					onKeyDown: V(t.onKeyDown, (e) => {
						let t = e.currentTarget.contains(e.target), n = lu[s.dir].includes(e.key);
						t && n && (o.onOpenChange(!1), c.trigger?.focus(), e.preventDefault());
					})
				})
			})
		})
	});
});
md.displayName = pd;
function hd(e) {
	return e ? "open" : "closed";
}
function gd(e) {
	return e === "indeterminate";
}
function _d(e) {
	return gd(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function vd(e) {
	let t = document.activeElement;
	for (let n of e) if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function yd(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
function bd(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = yd(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
function xd(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e], s = t[a], c = o.x, l = o.y, u = s.x, d = s.y;
		l > r != d > r && n < (u - c) * (r - l) / (d - l) + c && (i = !i);
	}
	return i;
}
function Sd(e, t) {
	return t ? xd({
		x: e.clientX,
		y: e.clientY
	}, t) : !1;
}
function Cd(e) {
	return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var wd = Su, Td = wu, Ed = Ou, Dd = Mu, Od = Ru, kd = Bu, Ad = Uu, jd = Ku, Md = Xu, Nd = Qu, Pd = nd, Fd = id, Id = od, Ld = ud, Rd = fd, zd = md, Bd = "DropdownMenu", [Vd, Hd] = Ae(Bd, [hu]), Ud = hu(), [Wd, Gd] = Vd(Bd), Kd = (t) => {
	let { __scopeDropdownMenu: n, children: r, dir: i, open: a, defaultOpen: o, onOpenChange: s, modal: c = !0 } = t, l = Ud(n), u = e.useRef(null), [d, f] = qe({
		prop: a,
		defaultProp: o ?? !1,
		onChange: s,
		caller: Bd
	});
	return /* @__PURE__ */ p(Wd, {
		scope: n,
		triggerId: We(),
		triggerRef: u,
		contentId: We(),
		open: d,
		onOpenChange: f,
		onOpenToggle: e.useCallback(() => f((e) => !e), [f]),
		modal: c,
		children: /* @__PURE__ */ p(wd, {
			...l,
			open: d,
			onOpenChange: f,
			dir: i,
			modal: c,
			children: r
		})
	});
};
Kd.displayName = Bd;
var qd = "DropdownMenuTrigger", Jd = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, disabled: r = !1, ...i } = e, a = Gd(qd, n);
	return /* @__PURE__ */ p(Td, {
		asChild: !0,
		...Ud(n),
		children: /* @__PURE__ */ p(U.button, {
			type: "button",
			id: a.triggerId,
			"aria-haspopup": "menu",
			"aria-expanded": a.open,
			"aria-controls": a.open ? a.contentId : void 0,
			"data-state": a.open ? "open" : "closed",
			"data-disabled": r ? "" : void 0,
			disabled: r,
			...i,
			ref: Oe(t, a.triggerRef),
			onPointerDown: V(e.onPointerDown, (e) => {
				!r && e.button === 0 && e.ctrlKey === !1 && (a.onOpenToggle(), a.open || e.preventDefault());
			}),
			onKeyDown: V(e.onKeyDown, (e) => {
				r || (["Enter", " "].includes(e.key) && a.onOpenToggle(), e.key === "ArrowDown" && a.onOpenChange(!0), [
					"Enter",
					" ",
					"ArrowDown"
				].includes(e.key) && e.preventDefault());
			})
		})
	});
});
Jd.displayName = qd;
var Yd = "DropdownMenuPortal", Xd = (e) => {
	let { __scopeDropdownMenu: t, ...n } = e;
	return /* @__PURE__ */ p(Ed, {
		...Ud(t),
		...n
	});
};
Xd.displayName = Yd;
var Zd = "DropdownMenuContent", Qd = e.forwardRef((t, n) => {
	let { __scopeDropdownMenu: r, ...i } = t, a = Gd(Zd, r), o = Ud(r), s = e.useRef(!1);
	return /* @__PURE__ */ p(Dd, {
		id: a.contentId,
		"aria-labelledby": a.triggerId,
		...o,
		...i,
		ref: n,
		onCloseAutoFocus: V(t.onCloseAutoFocus, (e) => {
			s.current || a.triggerRef.current?.focus(), s.current = !1, e.preventDefault();
		}),
		onInteractOutside: V(t.onInteractOutside, (e) => {
			let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0, r = t.button === 2 || n;
			(!a.modal || r) && (s.current = !0);
		}),
		style: {
			...t.style,
			"--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
			"--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
			"--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
Qd.displayName = Zd;
var $d = "DropdownMenuGroup", ef = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(Od, {
		...Ud(n),
		...r,
		ref: t
	});
});
ef.displayName = $d;
var tf = "DropdownMenuLabel", nf = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(kd, {
		...Ud(n),
		...r,
		ref: t
	});
});
nf.displayName = tf;
var rf = "DropdownMenuItem", af = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(Ad, {
		...Ud(n),
		...r,
		ref: t
	});
});
af.displayName = rf;
var of = "DropdownMenuCheckboxItem", sf = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(jd, {
		...Ud(n),
		...r,
		ref: t
	});
});
sf.displayName = of;
var cf = "DropdownMenuRadioGroup", lf = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(Md, {
		...Ud(n),
		...r,
		ref: t
	});
});
lf.displayName = cf;
var uf = "DropdownMenuRadioItem", df = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(Nd, {
		...Ud(n),
		...r,
		ref: t
	});
});
df.displayName = uf;
var ff = "DropdownMenuItemIndicator", pf = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(Pd, {
		...Ud(n),
		...r,
		ref: t
	});
});
pf.displayName = ff;
var mf = "DropdownMenuSeparator", hf = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(Fd, {
		...Ud(n),
		...r,
		ref: t
	});
});
hf.displayName = mf;
var gf = "DropdownMenuArrow", _f = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(Id, {
		...Ud(n),
		...r,
		ref: t
	});
});
_f.displayName = gf;
var vf = (e) => {
	let { __scopeDropdownMenu: t, children: n, open: r, onOpenChange: i, defaultOpen: a } = e, o = Ud(t), [s, c] = qe({
		prop: r,
		defaultProp: a ?? !1,
		onChange: i,
		caller: "DropdownMenuSub"
	});
	return /* @__PURE__ */ p(Ld, {
		...o,
		open: s,
		onOpenChange: c,
		children: n
	});
}, yf = "DropdownMenuSubTrigger", bf = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(Rd, {
		...Ud(n),
		...r,
		ref: t
	});
});
bf.displayName = yf;
var xf = "DropdownMenuSubContent", Sf = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(zd, {
		...Ud(n),
		...r,
		ref: t,
		style: {
			...e.style,
			"--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
			"--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
			"--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
Sf.displayName = xf;
var Cf = Kd, wf = Jd, Tf = Xd, Ef = Qd, Df = ef, Of = nf, kf = af, Af = sf, jf = lf, Mf = df, Nf = pf, Pf = hf, Ff = vf, If = bf, Lf = Sf, Rf = {
	content: "_content_kucch_1",
	subContent: "_subContent_kucch_3",
	dropdownShow: "_dropdownShow_kucch_1",
	item: "_item_kucch_47",
	subTrigger: "_subTrigger_kucch_49",
	checkboxItem: "_checkboxItem_kucch_51",
	radioItem: "_radioItem_kucch_53",
	inset: "_inset_kucch_111",
	label: "_label_kucch_119",
	separator: "_separator_kucch_133",
	shortcut: "_shortcut_kucch_145",
	indicator: "_indicator_kucch_159"
}, zf = Cf, Bf = wf, Vf = Df, Hf = Tf, Uf = Ff, Wf = jf, Gf = e.forwardRef(({ className: e, inset: t, children: n, ...r }, i) => /* @__PURE__ */ m(If, {
	ref: i,
	className: x(Rf.subTrigger, t && Rf.inset, e),
	...r,
	children: [n, /* @__PURE__ */ p(ie, { className: "ml-auto h-4 w-4" })]
}));
Gf.displayName = If.displayName;
var Kf = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p(Lf, {
	ref: n,
	className: x(Rf.subContent, e),
	...t
}));
Kf.displayName = Lf.displayName;
var qf = e.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ p(Tf, { children: /* @__PURE__ */ p(Ef, {
	ref: r,
	sideOffset: t,
	className: x(Rf.content, e),
	...n
}) }));
qf.displayName = Ef.displayName;
var Jf = e.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ p(kf, {
	ref: r,
	className: x(Rf.item, t && Rf.inset, e),
	...n
}));
Jf.displayName = kf.displayName;
var Yf = e.forwardRef(({ className: e, children: t, checked: n, ...r }, i) => /* @__PURE__ */ m(Af, {
	ref: i,
	className: x(Rf.checkboxItem, e),
	checked: n,
	...r,
	children: [/* @__PURE__ */ p("span", {
		className: Rf.indicator,
		children: /* @__PURE__ */ p(Nf, { children: /* @__PURE__ */ p(R, { className: "h-4 w-4" }) })
	}), t]
}));
Yf.displayName = Af.displayName;
var Xf = e.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ m(Mf, {
	ref: r,
	className: x(Rf.radioItem, e),
	...n,
	children: [/* @__PURE__ */ p("span", {
		className: Rf.indicator,
		children: /* @__PURE__ */ p(Nf, { children: /* @__PURE__ */ p(se, { className: "h-2 w-2 fill-current" }) })
	}), t]
}));
Xf.displayName = Mf.displayName;
var Zf = e.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ p(Of, {
	ref: r,
	className: x(Rf.label, t && Rf.inset, e),
	...n
}));
Zf.displayName = Of.displayName;
var Qf = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p(Pf, {
	ref: n,
	className: x(Rf.separator, e),
	...t
}));
Qf.displayName = Pf.displayName;
var $f = ({ className: e, ...t }) => /* @__PURE__ */ p("span", {
	className: x(Rf.shortcut, e),
	...t
});
$f.displayName = "DropdownMenuShortcut";
var q = {
	wrapper: "_wrapper_mx2bo_1",
	scrollContainer: "_scrollContainer_mx2bo_19",
	table: "_table_mx2bo_27",
	thead: "_thead_mx2bo_43",
	th: "_th_mx2bo_43",
	tr: "_tr_mx2bo_75",
	trSelected: "_trSelected_mx2bo_93",
	td: "_td_mx2bo_101",
	checkboxCell: "_checkboxCell_mx2bo_117",
	actionsCell: "_actionsCell_mx2bo_131",
	sortButton: "_sortButton_mx2bo_143",
	emptyState: "_emptyState_mx2bo_175",
	thContent: "_thContent_mx2bo_187",
	sortIconActive: "_sortIconActive_mx2bo_199",
	sortIconInactive: "_sortIconInactive_mx2bo_207",
	destructiveItem: "_destructiveItem_mx2bo_215"
};
//#endregion
//#region src/components/DataTable/index.tsx
function ep({ data: e, columns: t, keyExtractor: n, actions: r, onSelectionChange: i, className: a, selectable: o = !0 }) {
	let [s, c] = d(/* @__PURE__ */ new Set()), [u, f] = d(null), h = e.length > 0 && s.size === e.length, g = (t) => {
		let r = t ? new Set(e.map(n)) : /* @__PURE__ */ new Set();
		c(r), i?.(Array.from(r));
	}, _ = (e, t) => {
		let n = new Set(s);
		t ? n.add(e) : n.delete(e), c(n), i?.(Array.from(n));
	}, v = (e) => {
		f((t) => ({
			key: e,
			direction: t?.key === e && t.direction === "asc" ? "desc" : "asc"
		}));
	}, y = l(() => u ? [...e].sort((e, t) => {
		let n = e[u.key], r = t[u.key];
		return n < r ? u.direction === "asc" ? -1 : 1 : n > r ? u.direction === "asc" ? 1 : -1 : 0;
	}) : e, [e, u]);
	return /* @__PURE__ */ p("div", {
		className: x(q.wrapper, a),
		children: /* @__PURE__ */ p("div", {
			className: q.scrollContainer,
			children: /* @__PURE__ */ m("table", {
				className: q.table,
				children: [/* @__PURE__ */ p("thead", {
					className: q.thead,
					children: /* @__PURE__ */ m("tr", { children: [
						o && /* @__PURE__ */ p("th", {
							className: q.checkboxCell,
							children: /* @__PURE__ */ p(Ee, {
								checked: h,
								onChange: (e) => g(e.target.checked)
							})
						}),
						t.map((e, t) => /* @__PURE__ */ p("th", {
							className: q.th,
							children: /* @__PURE__ */ m("div", {
								className: q.thContent,
								children: [e.header, e.sortable && e.accessorKey && /* @__PURE__ */ p("button", {
									className: q.sortButton,
									onClick: () => v(e.accessorKey),
									children: /* @__PURE__ */ p(ee, {
										size: 14,
										className: u?.key === e.accessorKey ? q.sortIconActive : q.sortIconInactive
									})
								})]
							})
						}, t)),
						r && /* @__PURE__ */ p("th", { className: q.actionsCell })
					] })
				}), /* @__PURE__ */ p("tbody", { children: y.length === 0 ? /* @__PURE__ */ p("tr", { children: /* @__PURE__ */ p("td", {
					colSpan: 100,
					className: q.emptyState,
					children: "Nenhum dado encontrado."
				}) }) : y.map((e) => {
					let i = n(e), a = s.has(i);
					return /* @__PURE__ */ m("tr", {
						className: x(q.tr, a && q.trSelected),
						children: [
							o && /* @__PURE__ */ p("td", {
								className: q.checkboxCell,
								children: /* @__PURE__ */ p(Ee, {
									checked: a,
									onChange: (e) => _(i, e.target.checked)
								})
							}),
							t.map((t, n) => /* @__PURE__ */ p("td", {
								className: q.td,
								children: t.cell ? t.cell(e) : String(e[t.accessorKey] || "")
							}, n)),
							r && /* @__PURE__ */ p("td", {
								className: q.actionsCell,
								children: /* @__PURE__ */ m(zf, { children: [/* @__PURE__ */ p(Bf, {
									asChild: !0,
									children: /* @__PURE__ */ p(xe, {
										variant: "ghost",
										size: "sm",
										children: /* @__PURE__ */ p(ue, { size: 16 })
									})
								}), /* @__PURE__ */ m(qf, {
									align: "end",
									children: [
										/* @__PURE__ */ p(Zf, { children: "Ações" }),
										/* @__PURE__ */ p(Qf, {}),
										r.map((t, n) => /* @__PURE__ */ p(Jf, {
											onClick: () => t.onClick(e),
											className: x(t.isDestructive && q.destructiveItem),
											children: t.label
										}, n))
									]
								})] })
							})
						]
					}, i);
				}) })]
			})
		})
	});
}
//#endregion
//#region node_modules/date-fns/constants.js
var tp = 365.2425, np = 6048e5, rp = 864e5, ip = 3600 * 24;
ip * 7, ip * tp / 12 * 3;
var ap = Symbol.for("constructDateFrom");
//#endregion
//#region node_modules/date-fns/constructFrom.js
function J(e, t) {
	return typeof e == "function" ? e(t) : e && typeof e == "object" && ap in e ? e[ap](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
//#endregion
//#region node_modules/date-fns/toDate.js
function Y(e, t) {
	return J(t || e, e);
}
//#endregion
//#region node_modules/date-fns/addDays.js
function op(e, t, n) {
	let r = Y(e, n?.in);
	return isNaN(t) ? J(n?.in || e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
//#endregion
//#region node_modules/date-fns/addMonths.js
function sp(e, t, n) {
	let r = Y(e, n?.in);
	if (isNaN(t)) return J(n?.in || e, NaN);
	if (!t) return r;
	let i = r.getDate(), a = J(n?.in || e, r.getTime());
	return a.setMonth(r.getMonth() + t + 1, 0), i >= a.getDate() ? a : (r.setFullYear(a.getFullYear(), a.getMonth(), i), r);
}
//#endregion
//#region node_modules/date-fns/_lib/defaultOptions.js
var cp = {};
function lp() {
	return cp;
}
//#endregion
//#region node_modules/date-fns/startOfWeek.js
function up(e, t) {
	let n = lp(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, i = Y(e, t?.in), a = i.getDay(), o = (a < r ? 7 : 0) + a - r;
	return i.setDate(i.getDate() - o), i.setHours(0, 0, 0, 0), i;
}
//#endregion
//#region node_modules/date-fns/startOfISOWeek.js
function dp(e, t) {
	return up(e, {
		...t,
		weekStartsOn: 1
	});
}
//#endregion
//#region node_modules/date-fns/getISOWeekYear.js
function fp(e, t) {
	let n = Y(e, t?.in), r = n.getFullYear(), i = J(n, 0);
	i.setFullYear(r + 1, 0, 4), i.setHours(0, 0, 0, 0);
	let a = dp(i), o = J(n, 0);
	o.setFullYear(r, 0, 4), o.setHours(0, 0, 0, 0);
	let s = dp(o);
	return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= s.getTime() ? r : r - 1;
}
//#endregion
//#region node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js
function pp(e) {
	let t = Y(e), n = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()));
	return n.setUTCFullYear(t.getFullYear()), e - +n;
}
//#endregion
//#region node_modules/date-fns/_lib/normalizeDates.js
function mp(e, ...t) {
	let n = J.bind(null, e || t.find((e) => typeof e == "object"));
	return t.map(n);
}
//#endregion
//#region node_modules/date-fns/startOfDay.js
function hp(e, t) {
	let n = Y(e, t?.in);
	return n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/date-fns/differenceInCalendarDays.js
function gp(e, t, n) {
	let [r, i] = mp(n?.in, e, t), a = hp(r), o = hp(i), s = +a - pp(a), c = +o - pp(o);
	return Math.round((s - c) / rp);
}
//#endregion
//#region node_modules/date-fns/startOfISOWeekYear.js
function _p(e, t) {
	let n = fp(e, t), r = J(t?.in || e, 0);
	return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), dp(r);
}
//#endregion
//#region node_modules/date-fns/addWeeks.js
function vp(e, t, n) {
	return op(e, t * 7, n);
}
//#endregion
//#region node_modules/date-fns/addYears.js
function yp(e, t, n) {
	return sp(e, t * 12, n);
}
//#endregion
//#region node_modules/date-fns/max.js
function bp(e, t) {
	let n, r = t?.in;
	return e.forEach((e) => {
		!r && typeof e == "object" && (r = J.bind(null, e));
		let t = Y(e, r);
		(!n || n < t || isNaN(+t)) && (n = t);
	}), J(r, n || NaN);
}
//#endregion
//#region node_modules/date-fns/min.js
function xp(e, t) {
	let n, r = t?.in;
	return e.forEach((e) => {
		!r && typeof e == "object" && (r = J.bind(null, e));
		let t = Y(e, r);
		(!n || n > t || isNaN(+t)) && (n = t);
	}), J(r, n || NaN);
}
//#endregion
//#region node_modules/date-fns/isSameDay.js
function Sp(e, t, n) {
	let [r, i] = mp(n?.in, e, t);
	return +hp(r) == +hp(i);
}
//#endregion
//#region node_modules/date-fns/isDate.js
function Cp(e) {
	return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
//#endregion
//#region node_modules/date-fns/isValid.js
function wp(e) {
	return !(!Cp(e) && typeof e != "number" || isNaN(+Y(e)));
}
//#endregion
//#region node_modules/date-fns/differenceInCalendarMonths.js
function Tp(e, t, n) {
	let [r, i] = mp(n?.in, e, t), a = r.getFullYear() - i.getFullYear(), o = r.getMonth() - i.getMonth();
	return a * 12 + o;
}
//#endregion
//#region node_modules/date-fns/endOfMonth.js
function Ep(e, t) {
	let n = Y(e, t?.in), r = n.getMonth();
	return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
//#endregion
//#region node_modules/date-fns/_lib/normalizeInterval.js
function Dp(e, t) {
	let [n, r] = mp(e, t.start, t.end);
	return {
		start: n,
		end: r
	};
}
//#endregion
//#region node_modules/date-fns/eachMonthOfInterval.js
function Op(e, t) {
	let { start: n, end: r } = Dp(t?.in, e), i = +n > +r, a = i ? +n : +r, o = i ? r : n;
	o.setHours(0, 0, 0, 0), o.setDate(1);
	let s = t?.step ?? 1;
	if (!s) return [];
	s < 0 && (s = -s, i = !i);
	let c = [];
	for (; +o <= a;) c.push(J(n, o)), o.setMonth(o.getMonth() + s);
	return i ? c.reverse() : c;
}
//#endregion
//#region node_modules/date-fns/startOfMonth.js
function kp(e, t) {
	let n = Y(e, t?.in);
	return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/date-fns/endOfYear.js
function Ap(e, t) {
	let n = Y(e, t?.in), r = n.getFullYear();
	return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
//#endregion
//#region node_modules/date-fns/startOfYear.js
function jp(e, t) {
	let n = Y(e, t?.in);
	return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/date-fns/eachYearOfInterval.js
function Mp(e, t) {
	let { start: n, end: r } = Dp(t?.in, e), i = +n > +r, a = i ? +n : +r, o = i ? r : n;
	o.setHours(0, 0, 0, 0), o.setMonth(0, 1);
	let s = t?.step ?? 1;
	if (!s) return [];
	s < 0 && (s = -s, i = !i);
	let c = [];
	for (; +o <= a;) c.push(J(n, o)), o.setFullYear(o.getFullYear() + s);
	return i ? c.reverse() : c;
}
//#endregion
//#region node_modules/date-fns/endOfWeek.js
function Np(e, t) {
	let n = lp(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, i = Y(e, t?.in), a = i.getDay(), o = (a < r ? -7 : 0) + 6 - (a - r);
	return i.setDate(i.getDate() + o), i.setHours(23, 59, 59, 999), i;
}
//#endregion
//#region node_modules/date-fns/endOfISOWeek.js
function Pp(e, t) {
	return Np(e, {
		...t,
		weekStartsOn: 1
	});
}
//#endregion
//#region node_modules/date-fns/locale/en-US/_lib/formatDistance.js
var Fp = {
	lessThanXSeconds: {
		one: "less than a second",
		other: "less than {{count}} seconds"
	},
	xSeconds: {
		one: "1 second",
		other: "{{count}} seconds"
	},
	halfAMinute: "half a minute",
	lessThanXMinutes: {
		one: "less than a minute",
		other: "less than {{count}} minutes"
	},
	xMinutes: {
		one: "1 minute",
		other: "{{count}} minutes"
	},
	aboutXHours: {
		one: "about 1 hour",
		other: "about {{count}} hours"
	},
	xHours: {
		one: "1 hour",
		other: "{{count}} hours"
	},
	xDays: {
		one: "1 day",
		other: "{{count}} days"
	},
	aboutXWeeks: {
		one: "about 1 week",
		other: "about {{count}} weeks"
	},
	xWeeks: {
		one: "1 week",
		other: "{{count}} weeks"
	},
	aboutXMonths: {
		one: "about 1 month",
		other: "about {{count}} months"
	},
	xMonths: {
		one: "1 month",
		other: "{{count}} months"
	},
	aboutXYears: {
		one: "about 1 year",
		other: "about {{count}} years"
	},
	xYears: {
		one: "1 year",
		other: "{{count}} years"
	},
	overXYears: {
		one: "over 1 year",
		other: "over {{count}} years"
	},
	almostXYears: {
		one: "almost 1 year",
		other: "almost {{count}} years"
	}
}, Ip = (e, t, n) => {
	let r, i = Fp[e];
	return r = typeof i == "string" ? i : t === 1 ? i.one : i.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
//#endregion
//#region node_modules/date-fns/locale/_lib/buildFormatLongFn.js
function Lp(e) {
	return (t = {}) => {
		let n = t.width ? String(t.width) : e.defaultWidth;
		return e.formats[n] || e.formats[e.defaultWidth];
	};
}
var Rp = {
	date: Lp({
		formats: {
			full: "EEEE, MMMM do, y",
			long: "MMMM do, y",
			medium: "MMM d, y",
			short: "MM/dd/yyyy"
		},
		defaultWidth: "full"
	}),
	time: Lp({
		formats: {
			full: "h:mm:ss a zzzz",
			long: "h:mm:ss a z",
			medium: "h:mm:ss a",
			short: "h:mm a"
		},
		defaultWidth: "full"
	}),
	dateTime: Lp({
		formats: {
			full: "{{date}} 'at' {{time}}",
			long: "{{date}} 'at' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, zp = {
	lastWeek: "'last' eeee 'at' p",
	yesterday: "'yesterday at' p",
	today: "'today at' p",
	tomorrow: "'tomorrow at' p",
	nextWeek: "eeee 'at' p",
	other: "P"
}, Bp = (e, t, n, r) => zp[e];
//#endregion
//#region node_modules/date-fns/locale/_lib/buildLocalizeFn.js
function Vp(e) {
	return (t, n) => {
		let r = n?.context ? String(n.context) : "standalone", i;
		if (r === "formatting" && e.formattingValues) {
			let t = e.defaultFormattingWidth || e.defaultWidth, r = n?.width ? String(n.width) : t;
			i = e.formattingValues[r] || e.formattingValues[t];
		} else {
			let t = e.defaultWidth, r = n?.width ? String(n.width) : e.defaultWidth;
			i = e.values[r] || e.values[t];
		}
		let a = e.argumentCallback ? e.argumentCallback(t) : t;
		return i[a];
	};
}
var Hp = {
	ordinalNumber: (e, t) => {
		let n = Number(e), r = n % 100;
		if (r > 20 || r < 10) switch (r % 10) {
			case 1: return n + "st";
			case 2: return n + "nd";
			case 3: return n + "rd";
		}
		return n + "th";
	},
	era: Vp({
		values: {
			narrow: ["B", "A"],
			abbreviated: ["BC", "AD"],
			wide: ["Before Christ", "Anno Domini"]
		},
		defaultWidth: "wide"
	}),
	quarter: Vp({
		values: {
			narrow: [
				"1",
				"2",
				"3",
				"4"
			],
			abbreviated: [
				"Q1",
				"Q2",
				"Q3",
				"Q4"
			],
			wide: [
				"1st quarter",
				"2nd quarter",
				"3rd quarter",
				"4th quarter"
			]
		},
		defaultWidth: "wide",
		argumentCallback: (e) => e - 1
	}),
	month: Vp({
		values: {
			narrow: [
				"J",
				"F",
				"M",
				"A",
				"M",
				"J",
				"J",
				"A",
				"S",
				"O",
				"N",
				"D"
			],
			abbreviated: [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec"
			],
			wide: [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			]
		},
		defaultWidth: "wide"
	}),
	day: Vp({
		values: {
			narrow: [
				"S",
				"M",
				"T",
				"W",
				"T",
				"F",
				"S"
			],
			short: [
				"Su",
				"Mo",
				"Tu",
				"We",
				"Th",
				"Fr",
				"Sa"
			],
			abbreviated: [
				"Sun",
				"Mon",
				"Tue",
				"Wed",
				"Thu",
				"Fri",
				"Sat"
			],
			wide: [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday"
			]
		},
		defaultWidth: "wide"
	}),
	dayPeriod: Vp({
		values: {
			narrow: {
				am: "a",
				pm: "p",
				midnight: "mi",
				noon: "n",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			},
			abbreviated: {
				am: "AM",
				pm: "PM",
				midnight: "midnight",
				noon: "noon",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			},
			wide: {
				am: "a.m.",
				pm: "p.m.",
				midnight: "midnight",
				noon: "noon",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			}
		},
		defaultWidth: "wide",
		formattingValues: {
			narrow: {
				am: "a",
				pm: "p",
				midnight: "mi",
				noon: "n",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			},
			abbreviated: {
				am: "AM",
				pm: "PM",
				midnight: "midnight",
				noon: "noon",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			},
			wide: {
				am: "a.m.",
				pm: "p.m.",
				midnight: "midnight",
				noon: "noon",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			}
		},
		defaultFormattingWidth: "wide"
	})
};
//#endregion
//#region node_modules/date-fns/locale/_lib/buildMatchFn.js
function Up(e) {
	return (t, n = {}) => {
		let r = n.width, i = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(i);
		if (!a) return null;
		let o = a[0], s = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(s) ? Gp(s, (e) => e.test(o)) : Wp(s, (e) => e.test(o)), l;
		l = e.valueCallback ? e.valueCallback(c) : c, l = n.valueCallback ? n.valueCallback(l) : l;
		let u = t.slice(o.length);
		return {
			value: l,
			rest: u
		};
	};
}
function Wp(e, t) {
	for (let n in e) if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n])) return n;
}
function Gp(e, t) {
	for (let n = 0; n < e.length; n++) if (t(e[n])) return n;
}
//#endregion
//#region node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
function Kp(e) {
	return (t, n = {}) => {
		let r = t.match(e.matchPattern);
		if (!r) return null;
		let i = r[0], a = t.match(e.parsePattern);
		if (!a) return null;
		let o = e.valueCallback ? e.valueCallback(a[0]) : a[0];
		o = n.valueCallback ? n.valueCallback(o) : o;
		let s = t.slice(i.length);
		return {
			value: o,
			rest: s
		};
	};
}
//#endregion
//#region node_modules/date-fns/locale/en-US.js
var qp = {
	code: "en-US",
	formatDistance: Ip,
	formatLong: Rp,
	formatRelative: Bp,
	localize: Hp,
	match: {
		ordinalNumber: Kp({
			matchPattern: /^(\d+)(th|st|nd|rd)?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: Up({
			matchPatterns: {
				narrow: /^(b|a)/i,
				abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
				wide: /^(before christ|before common era|anno domini|common era)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^b/i, /^(a|c)/i] },
			defaultParseWidth: "any"
		}),
		quarter: Up({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^q[1234]/i,
				wide: /^[1234](th|st|nd|rd)? quarter/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/1/i,
				/2/i,
				/3/i,
				/4/i
			] },
			defaultParseWidth: "any",
			valueCallback: (e) => e + 1
		}),
		month: Up({
			matchPatterns: {
				narrow: /^[jfmasond]/i,
				abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
				wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^j/i,
					/^f/i,
					/^m/i,
					/^a/i,
					/^m/i,
					/^j/i,
					/^j/i,
					/^a/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				],
				any: [
					/^ja/i,
					/^f/i,
					/^mar/i,
					/^ap/i,
					/^may/i,
					/^jun/i,
					/^jul/i,
					/^au/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: Up({
			matchPatterns: {
				narrow: /^[smtwf]/i,
				short: /^(su|mo|tu|we|th|fr|sa)/i,
				abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
				wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^s/i,
					/^m/i,
					/^t/i,
					/^w/i,
					/^t/i,
					/^f/i,
					/^s/i
				],
				any: [
					/^su/i,
					/^m/i,
					/^tu/i,
					/^w/i,
					/^th/i,
					/^f/i,
					/^sa/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: Up({
			matchPatterns: {
				narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
				any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a/i,
				pm: /^p/i,
				midnight: /^mi/i,
				noon: /^no/i,
				morning: /morning/i,
				afternoon: /afternoon/i,
				evening: /evening/i,
				night: /night/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
};
//#endregion
//#region node_modules/date-fns/getDayOfYear.js
function Jp(e, t) {
	let n = Y(e, t?.in);
	return gp(n, jp(n)) + 1;
}
//#endregion
//#region node_modules/date-fns/getISOWeek.js
function Yp(e, t) {
	let n = Y(e, t?.in), r = dp(n) - +_p(n);
	return Math.round(r / np) + 1;
}
//#endregion
//#region node_modules/date-fns/getWeekYear.js
function Xp(e, t) {
	let n = Y(e, t?.in), r = n.getFullYear(), i = lp(), a = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? i.firstWeekContainsDate ?? i.locale?.options?.firstWeekContainsDate ?? 1, o = J(t?.in || e, 0);
	o.setFullYear(r + 1, 0, a), o.setHours(0, 0, 0, 0);
	let s = up(o, t), c = J(t?.in || e, 0);
	c.setFullYear(r, 0, a), c.setHours(0, 0, 0, 0);
	let l = up(c, t);
	return +n >= +s ? r + 1 : +n >= +l ? r : r - 1;
}
//#endregion
//#region node_modules/date-fns/startOfWeekYear.js
function Zp(e, t) {
	let n = lp(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, i = Xp(e, t), a = J(t?.in || e, 0);
	return a.setFullYear(i, 0, r), a.setHours(0, 0, 0, 0), up(a, t);
}
//#endregion
//#region node_modules/date-fns/getWeek.js
function Qp(e, t) {
	let n = Y(e, t?.in), r = up(n, t) - +Zp(n, t);
	return Math.round(r / np) + 1;
}
//#endregion
//#region node_modules/date-fns/_lib/addLeadingZeros.js
function X(e, t) {
	return (e < 0 ? "-" : "") + Math.abs(e).toString().padStart(t, "0");
}
//#endregion
//#region node_modules/date-fns/_lib/format/lightFormatters.js
var $p = {
	y(e, t) {
		let n = e.getFullYear(), r = n > 0 ? n : 1 - n;
		return X(t === "yy" ? r % 100 : r, t.length);
	},
	M(e, t) {
		let n = e.getMonth();
		return t === "M" ? String(n + 1) : X(n + 1, 2);
	},
	d(e, t) {
		return X(e.getDate(), t.length);
	},
	a(e, t) {
		let n = e.getHours() / 12 >= 1 ? "pm" : "am";
		switch (t) {
			case "a":
			case "aa": return n.toUpperCase();
			case "aaa": return n;
			case "aaaaa": return n[0];
			default: return n === "am" ? "a.m." : "p.m.";
		}
	},
	h(e, t) {
		return X(e.getHours() % 12 || 12, t.length);
	},
	H(e, t) {
		return X(e.getHours(), t.length);
	},
	m(e, t) {
		return X(e.getMinutes(), t.length);
	},
	s(e, t) {
		return X(e.getSeconds(), t.length);
	},
	S(e, t) {
		let n = t.length, r = e.getMilliseconds();
		return X(Math.trunc(r * 10 ** (n - 3)), t.length);
	}
}, em = {
	am: "am",
	pm: "pm",
	midnight: "midnight",
	noon: "noon",
	morning: "morning",
	afternoon: "afternoon",
	evening: "evening",
	night: "night"
}, tm = {
	G: function(e, t, n) {
		let r = e.getFullYear() > 0 ? 1 : 0;
		switch (t) {
			case "G":
			case "GG":
			case "GGG": return n.era(r, { width: "abbreviated" });
			case "GGGGG": return n.era(r, { width: "narrow" });
			default: return n.era(r, { width: "wide" });
		}
	},
	y: function(e, t, n) {
		if (t === "yo") {
			let t = e.getFullYear(), r = t > 0 ? t : 1 - t;
			return n.ordinalNumber(r, { unit: "year" });
		}
		return $p.y(e, t);
	},
	Y: function(e, t, n, r) {
		let i = Xp(e, r), a = i > 0 ? i : 1 - i;
		return t === "YY" ? X(a % 100, 2) : t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : X(a, t.length);
	},
	R: function(e, t) {
		return X(fp(e), t.length);
	},
	u: function(e, t) {
		return X(e.getFullYear(), t.length);
	},
	Q: function(e, t, n) {
		let r = Math.ceil((e.getMonth() + 1) / 3);
		switch (t) {
			case "Q": return String(r);
			case "QQ": return X(r, 2);
			case "Qo": return n.ordinalNumber(r, { unit: "quarter" });
			case "QQQ": return n.quarter(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "QQQQQ": return n.quarter(r, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.quarter(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	q: function(e, t, n) {
		let r = Math.ceil((e.getMonth() + 1) / 3);
		switch (t) {
			case "q": return String(r);
			case "qq": return X(r, 2);
			case "qo": return n.ordinalNumber(r, { unit: "quarter" });
			case "qqq": return n.quarter(r, {
				width: "abbreviated",
				context: "standalone"
			});
			case "qqqqq": return n.quarter(r, {
				width: "narrow",
				context: "standalone"
			});
			default: return n.quarter(r, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	M: function(e, t, n) {
		let r = e.getMonth();
		switch (t) {
			case "M":
			case "MM": return $p.M(e, t);
			case "Mo": return n.ordinalNumber(r + 1, { unit: "month" });
			case "MMM": return n.month(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "MMMMM": return n.month(r, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.month(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	L: function(e, t, n) {
		let r = e.getMonth();
		switch (t) {
			case "L": return String(r + 1);
			case "LL": return X(r + 1, 2);
			case "Lo": return n.ordinalNumber(r + 1, { unit: "month" });
			case "LLL": return n.month(r, {
				width: "abbreviated",
				context: "standalone"
			});
			case "LLLLL": return n.month(r, {
				width: "narrow",
				context: "standalone"
			});
			default: return n.month(r, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	w: function(e, t, n, r) {
		let i = Qp(e, r);
		return t === "wo" ? n.ordinalNumber(i, { unit: "week" }) : X(i, t.length);
	},
	I: function(e, t, n) {
		let r = Yp(e);
		return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : X(r, t.length);
	},
	d: function(e, t, n) {
		return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : $p.d(e, t);
	},
	D: function(e, t, n) {
		let r = Jp(e);
		return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : X(r, t.length);
	},
	E: function(e, t, n) {
		let r = e.getDay();
		switch (t) {
			case "E":
			case "EE":
			case "EEE": return n.day(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "EEEEE": return n.day(r, {
				width: "narrow",
				context: "formatting"
			});
			case "EEEEEE": return n.day(r, {
				width: "short",
				context: "formatting"
			});
			default: return n.day(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	e: function(e, t, n, r) {
		let i = e.getDay(), a = (i - r.weekStartsOn + 8) % 7 || 7;
		switch (t) {
			case "e": return String(a);
			case "ee": return X(a, 2);
			case "eo": return n.ordinalNumber(a, { unit: "day" });
			case "eee": return n.day(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "eeeee": return n.day(i, {
				width: "narrow",
				context: "formatting"
			});
			case "eeeeee": return n.day(i, {
				width: "short",
				context: "formatting"
			});
			default: return n.day(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	c: function(e, t, n, r) {
		let i = e.getDay(), a = (i - r.weekStartsOn + 8) % 7 || 7;
		switch (t) {
			case "c": return String(a);
			case "cc": return X(a, t.length);
			case "co": return n.ordinalNumber(a, { unit: "day" });
			case "ccc": return n.day(i, {
				width: "abbreviated",
				context: "standalone"
			});
			case "ccccc": return n.day(i, {
				width: "narrow",
				context: "standalone"
			});
			case "cccccc": return n.day(i, {
				width: "short",
				context: "standalone"
			});
			default: return n.day(i, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	i: function(e, t, n) {
		let r = e.getDay(), i = r === 0 ? 7 : r;
		switch (t) {
			case "i": return String(i);
			case "ii": return X(i, t.length);
			case "io": return n.ordinalNumber(i, { unit: "day" });
			case "iii": return n.day(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "iiiii": return n.day(r, {
				width: "narrow",
				context: "formatting"
			});
			case "iiiiii": return n.day(r, {
				width: "short",
				context: "formatting"
			});
			default: return n.day(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	a: function(e, t, n) {
		let r = e.getHours() / 12 >= 1 ? "pm" : "am";
		switch (t) {
			case "a":
			case "aa": return n.dayPeriod(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "aaa": return n.dayPeriod(r, {
				width: "abbreviated",
				context: "formatting"
			}).toLowerCase();
			case "aaaaa": return n.dayPeriod(r, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.dayPeriod(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	b: function(e, t, n) {
		let r = e.getHours(), i;
		switch (i = r === 12 ? em.noon : r === 0 ? em.midnight : r / 12 >= 1 ? "pm" : "am", t) {
			case "b":
			case "bb": return n.dayPeriod(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "bbb": return n.dayPeriod(i, {
				width: "abbreviated",
				context: "formatting"
			}).toLowerCase();
			case "bbbbb": return n.dayPeriod(i, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.dayPeriod(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	B: function(e, t, n) {
		let r = e.getHours(), i;
		switch (i = r >= 17 ? em.evening : r >= 12 ? em.afternoon : r >= 4 ? em.morning : em.night, t) {
			case "B":
			case "BB":
			case "BBB": return n.dayPeriod(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "BBBBB": return n.dayPeriod(i, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.dayPeriod(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	h: function(e, t, n) {
		if (t === "ho") {
			let t = e.getHours() % 12;
			return t === 0 && (t = 12), n.ordinalNumber(t, { unit: "hour" });
		}
		return $p.h(e, t);
	},
	H: function(e, t, n) {
		return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : $p.H(e, t);
	},
	K: function(e, t, n) {
		let r = e.getHours() % 12;
		return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : X(r, t.length);
	},
	k: function(e, t, n) {
		let r = e.getHours();
		return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : X(r, t.length);
	},
	m: function(e, t, n) {
		return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : $p.m(e, t);
	},
	s: function(e, t, n) {
		return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : $p.s(e, t);
	},
	S: function(e, t) {
		return $p.S(e, t);
	},
	X: function(e, t, n) {
		let r = e.getTimezoneOffset();
		if (r === 0) return "Z";
		switch (t) {
			case "X": return rm(r);
			case "XXXX":
			case "XX": return im(r);
			default: return im(r, ":");
		}
	},
	x: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "x": return rm(r);
			case "xxxx":
			case "xx": return im(r);
			default: return im(r, ":");
		}
	},
	O: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "O":
			case "OO":
			case "OOO": return "GMT" + nm(r, ":");
			default: return "GMT" + im(r, ":");
		}
	},
	z: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "z":
			case "zz":
			case "zzz": return "GMT" + nm(r, ":");
			default: return "GMT" + im(r, ":");
		}
	},
	t: function(e, t, n) {
		return X(Math.trunc(e / 1e3), t.length);
	},
	T: function(e, t, n) {
		return X(+e, t.length);
	}
};
function nm(e, t = "") {
	let n = e > 0 ? "-" : "+", r = Math.abs(e), i = Math.trunc(r / 60), a = r % 60;
	return a === 0 ? n + String(i) : n + String(i) + t + X(a, 2);
}
function rm(e, t) {
	return e % 60 == 0 ? (e > 0 ? "-" : "+") + X(Math.abs(e) / 60, 2) : im(e, t);
}
function im(e, t = "") {
	let n = e > 0 ? "-" : "+", r = Math.abs(e), i = X(Math.trunc(r / 60), 2), a = X(r % 60, 2);
	return n + i + t + a;
}
//#endregion
//#region node_modules/date-fns/_lib/format/longFormatters.js
var am = (e, t) => {
	switch (e) {
		case "P": return t.date({ width: "short" });
		case "PP": return t.date({ width: "medium" });
		case "PPP": return t.date({ width: "long" });
		default: return t.date({ width: "full" });
	}
}, om = (e, t) => {
	switch (e) {
		case "p": return t.time({ width: "short" });
		case "pp": return t.time({ width: "medium" });
		case "ppp": return t.time({ width: "long" });
		default: return t.time({ width: "full" });
	}
}, sm = {
	p: om,
	P: (e, t) => {
		let n = e.match(/(P+)(p+)?/) || [], r = n[1], i = n[2];
		if (!i) return am(e, t);
		let a;
		switch (r) {
			case "P":
				a = t.dateTime({ width: "short" });
				break;
			case "PP":
				a = t.dateTime({ width: "medium" });
				break;
			case "PPP":
				a = t.dateTime({ width: "long" });
				break;
			default:
				a = t.dateTime({ width: "full" });
				break;
		}
		return a.replace("{{date}}", am(r, t)).replace("{{time}}", om(i, t));
	}
}, cm = /^D+$/, lm = /^Y+$/, um = [
	"D",
	"DD",
	"YY",
	"YYYY"
];
function dm(e) {
	return cm.test(e);
}
function fm(e) {
	return lm.test(e);
}
function pm(e, t, n) {
	let r = mm(e, t, n);
	if (console.warn(r), um.includes(e)) throw RangeError(r);
}
function mm(e, t, n) {
	let r = e[0] === "Y" ? "years" : "days of the month";
	return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
//#endregion
//#region node_modules/date-fns/format.js
var hm = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, gm = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, _m = /^'([^]*?)'?$/, vm = /''/g, ym = /[a-zA-Z]/;
function bm(e, t, n) {
	let r = lp(), i = n?.locale ?? r.locale ?? qp, a = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, o = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, s = Y(e, n?.in);
	if (!wp(s)) throw RangeError("Invalid time value");
	let c = t.match(gm).map((e) => {
		let t = e[0];
		if (t === "p" || t === "P") {
			let n = sm[t];
			return n(e, i.formatLong);
		}
		return e;
	}).join("").match(hm).map((e) => {
		if (e === "''") return {
			isToken: !1,
			value: "'"
		};
		let t = e[0];
		if (t === "'") return {
			isToken: !1,
			value: xm(e)
		};
		if (tm[t]) return {
			isToken: !0,
			value: e
		};
		if (t.match(ym)) throw RangeError("Format string contains an unescaped latin alphabet character `" + t + "`");
		return {
			isToken: !1,
			value: e
		};
	});
	i.localize.preprocessor && (c = i.localize.preprocessor(s, c));
	let l = {
		firstWeekContainsDate: a,
		weekStartsOn: o,
		locale: i
	};
	return c.map((r) => {
		if (!r.isToken) return r.value;
		let a = r.value;
		(!n?.useAdditionalWeekYearTokens && fm(a) || !n?.useAdditionalDayOfYearTokens && dm(a)) && pm(a, t, String(e));
		let o = tm[a[0]];
		return o(s, a, i.localize, l);
	}).join("");
}
function xm(e) {
	let t = e.match(_m);
	return t ? t[1].replace(vm, "'") : e;
}
//#endregion
//#region node_modules/date-fns/getDaysInMonth.js
function Sm(e, t) {
	let n = Y(e, t?.in), r = n.getFullYear(), i = n.getMonth(), a = J(n, 0);
	return a.setFullYear(r, i + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
//#endregion
//#region node_modules/date-fns/getMonth.js
function Cm(e, t) {
	return Y(e, t?.in).getMonth();
}
//#endregion
//#region node_modules/date-fns/getYear.js
function wm(e, t) {
	return Y(e, t?.in).getFullYear();
}
//#endregion
//#region node_modules/date-fns/isAfter.js
function Tm(e, t) {
	return +Y(e) > +Y(t);
}
//#endregion
//#region node_modules/date-fns/isBefore.js
function Em(e, t) {
	return +Y(e) < +Y(t);
}
//#endregion
//#region node_modules/date-fns/isSameMonth.js
function Dm(e, t, n) {
	let [r, i] = mp(n?.in, e, t);
	return r.getFullYear() === i.getFullYear() && r.getMonth() === i.getMonth();
}
//#endregion
//#region node_modules/date-fns/isSameYear.js
function Om(e, t, n) {
	let [r, i] = mp(n?.in, e, t);
	return r.getFullYear() === i.getFullYear();
}
//#endregion
//#region node_modules/date-fns/setMonth.js
function km(e, t, n) {
	let r = Y(e, n?.in), i = r.getFullYear(), a = r.getDate(), o = J(n?.in || e, 0);
	o.setFullYear(i, t, 15), o.setHours(0, 0, 0, 0);
	let s = Sm(o);
	return r.setMonth(t, Math.min(a, s)), r;
}
//#endregion
//#region node_modules/date-fns/setYear.js
function Am(e, t, n) {
	let r = Y(e, n?.in);
	return isNaN(+r) ? J(n?.in || e, NaN) : (r.setFullYear(t), r);
}
//#endregion
//#region node_modules/date-fns/locale/pt-BR/_lib/formatDistance.js
var jm = {
	lessThanXSeconds: {
		one: "menos de um segundo",
		other: "menos de {{count}} segundos"
	},
	xSeconds: {
		one: "1 segundo",
		other: "{{count}} segundos"
	},
	halfAMinute: "meio minuto",
	lessThanXMinutes: {
		one: "menos de um minuto",
		other: "menos de {{count}} minutos"
	},
	xMinutes: {
		one: "1 minuto",
		other: "{{count}} minutos"
	},
	aboutXHours: {
		one: "cerca de 1 hora",
		other: "cerca de {{count}} horas"
	},
	xHours: {
		one: "1 hora",
		other: "{{count}} horas"
	},
	xDays: {
		one: "1 dia",
		other: "{{count}} dias"
	},
	aboutXWeeks: {
		one: "cerca de 1 semana",
		other: "cerca de {{count}} semanas"
	},
	xWeeks: {
		one: "1 semana",
		other: "{{count}} semanas"
	},
	aboutXMonths: {
		one: "cerca de 1 mês",
		other: "cerca de {{count}} meses"
	},
	xMonths: {
		one: "1 mês",
		other: "{{count}} meses"
	},
	aboutXYears: {
		one: "cerca de 1 ano",
		other: "cerca de {{count}} anos"
	},
	xYears: {
		one: "1 ano",
		other: "{{count}} anos"
	},
	overXYears: {
		one: "mais de 1 ano",
		other: "mais de {{count}} anos"
	},
	almostXYears: {
		one: "quase 1 ano",
		other: "quase {{count}} anos"
	}
}, Mm = (e, t, n) => {
	let r, i = jm[e];
	return r = typeof i == "string" ? i : t === 1 ? i.one : i.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? "em " + r : "há " + r : r;
}, Nm = {
	date: Lp({
		formats: {
			full: "EEEE, d 'de' MMMM 'de' y",
			long: "d 'de' MMMM 'de' y",
			medium: "d MMM y",
			short: "dd/MM/yyyy"
		},
		defaultWidth: "full"
	}),
	time: Lp({
		formats: {
			full: "HH:mm:ss zzzz",
			long: "HH:mm:ss z",
			medium: "HH:mm:ss",
			short: "HH:mm"
		},
		defaultWidth: "full"
	}),
	dateTime: Lp({
		formats: {
			full: "{{date}} 'às' {{time}}",
			long: "{{date}} 'às' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, Pm = {
	lastWeek: (e) => {
		let t = e.getDay();
		return "'" + (t === 0 || t === 6 ? "último" : "última") + "' eeee 'às' p";
	},
	yesterday: "'ontem às' p",
	today: "'hoje às' p",
	tomorrow: "'amanhã às' p",
	nextWeek: "eeee 'às' p",
	other: "P"
}, Fm = {
	code: "pt-BR",
	formatDistance: Mm,
	formatLong: Nm,
	formatRelative: (e, t, n, r) => {
		let i = Pm[e];
		return typeof i == "function" ? i(t) : i;
	},
	localize: {
		ordinalNumber: (e, t) => {
			let n = Number(e);
			return t?.unit === "week" ? n + "ª" : n + "º";
		},
		era: Vp({
			values: {
				narrow: ["AC", "DC"],
				abbreviated: ["AC", "DC"],
				wide: ["antes de cristo", "depois de cristo"]
			},
			defaultWidth: "wide"
		}),
		quarter: Vp({
			values: {
				narrow: [
					"1",
					"2",
					"3",
					"4"
				],
				abbreviated: [
					"T1",
					"T2",
					"T3",
					"T4"
				],
				wide: [
					"1º trimestre",
					"2º trimestre",
					"3º trimestre",
					"4º trimestre"
				]
			},
			defaultWidth: "wide",
			argumentCallback: (e) => e - 1
		}),
		month: Vp({
			values: {
				narrow: [
					"j",
					"f",
					"m",
					"a",
					"m",
					"j",
					"j",
					"a",
					"s",
					"o",
					"n",
					"d"
				],
				abbreviated: [
					"jan",
					"fev",
					"mar",
					"abr",
					"mai",
					"jun",
					"jul",
					"ago",
					"set",
					"out",
					"nov",
					"dez"
				],
				wide: [
					"janeiro",
					"fevereiro",
					"março",
					"abril",
					"maio",
					"junho",
					"julho",
					"agosto",
					"setembro",
					"outubro",
					"novembro",
					"dezembro"
				]
			},
			defaultWidth: "wide"
		}),
		day: Vp({
			values: {
				narrow: [
					"D",
					"S",
					"T",
					"Q",
					"Q",
					"S",
					"S"
				],
				short: [
					"dom",
					"seg",
					"ter",
					"qua",
					"qui",
					"sex",
					"sab"
				],
				abbreviated: [
					"domingo",
					"segunda",
					"terça",
					"quarta",
					"quinta",
					"sexta",
					"sábado"
				],
				wide: [
					"domingo",
					"segunda-feira",
					"terça-feira",
					"quarta-feira",
					"quinta-feira",
					"sexta-feira",
					"sábado"
				]
			},
			defaultWidth: "wide"
		}),
		dayPeriod: Vp({
			values: {
				narrow: {
					am: "a",
					pm: "p",
					midnight: "mn",
					noon: "md",
					morning: "manhã",
					afternoon: "tarde",
					evening: "tarde",
					night: "noite"
				},
				abbreviated: {
					am: "AM",
					pm: "PM",
					midnight: "meia-noite",
					noon: "meio-dia",
					morning: "manhã",
					afternoon: "tarde",
					evening: "tarde",
					night: "noite"
				},
				wide: {
					am: "a.m.",
					pm: "p.m.",
					midnight: "meia-noite",
					noon: "meio-dia",
					morning: "manhã",
					afternoon: "tarde",
					evening: "tarde",
					night: "noite"
				}
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: {
					am: "a",
					pm: "p",
					midnight: "mn",
					noon: "md",
					morning: "da manhã",
					afternoon: "da tarde",
					evening: "da tarde",
					night: "da noite"
				},
				abbreviated: {
					am: "AM",
					pm: "PM",
					midnight: "meia-noite",
					noon: "meio-dia",
					morning: "da manhã",
					afternoon: "da tarde",
					evening: "da tarde",
					night: "da noite"
				},
				wide: {
					am: "a.m.",
					pm: "p.m.",
					midnight: "meia-noite",
					noon: "meio-dia",
					morning: "da manhã",
					afternoon: "da tarde",
					evening: "da tarde",
					night: "da noite"
				}
			},
			defaultFormattingWidth: "wide"
		})
	},
	match: {
		ordinalNumber: Kp({
			matchPattern: /^(\d+)[ºªo]?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: Up({
			matchPatterns: {
				narrow: /^(ac|dc|a|d)/i,
				abbreviated: /^(a\.?\s?c\.?|d\.?\s?c\.?)/i,
				wide: /^(antes de cristo|depois de cristo)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				any: [/^ac/i, /^dc/i],
				wide: [/^antes de cristo/i, /^depois de cristo/i]
			},
			defaultParseWidth: "any"
		}),
		quarter: Up({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^T[1234]/i,
				wide: /^[1234](º)? trimestre/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/1/i,
				/2/i,
				/3/i,
				/4/i
			] },
			defaultParseWidth: "any",
			valueCallback: (e) => e + 1
		}),
		month: Up({
			matchPatterns: {
				narrow: /^[jfmajsond]/i,
				abbreviated: /^(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)/i,
				wide: /^(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^j/i,
					/^f/i,
					/^m/i,
					/^a/i,
					/^m/i,
					/^j/i,
					/^j/i,
					/^a/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				],
				any: [
					/^ja/i,
					/^fev/i,
					/^mar/i,
					/^abr/i,
					/^mai/i,
					/^jun/i,
					/^jul/i,
					/^ago/i,
					/^set/i,
					/^out/i,
					/^nov/i,
					/^dez/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: Up({
			matchPatterns: {
				narrow: /^(dom|[23456]ª?|s[aá]b)/i,
				short: /^(dom|[23456]ª?|s[aá]b)/i,
				abbreviated: /^(dom|seg|ter|qua|qui|sex|s[aá]b)/i,
				wide: /^(domingo|(segunda|ter[cç]a|quarta|quinta|sexta)([- ]feira)?|s[aá]bado)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				short: [
					/^d/i,
					/^2/i,
					/^3/i,
					/^4/i,
					/^5/i,
					/^6/i,
					/^s[aá]/i
				],
				narrow: [
					/^d/i,
					/^2/i,
					/^3/i,
					/^4/i,
					/^5/i,
					/^6/i,
					/^s[aá]/i
				],
				any: [
					/^d/i,
					/^seg/i,
					/^t/i,
					/^qua/i,
					/^qui/i,
					/^sex/i,
					/^s[aá]b/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: Up({
			matchPatterns: {
				narrow: /^(a|p|mn|md|(da) (manhã|tarde|noite))/i,
				any: /^([ap]\.?\s?m\.?|meia[-\s]noite|meio[-\s]dia|(da) (manhã|tarde|noite))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a/i,
				pm: /^p/i,
				midnight: /^mn|^meia[-\s]noite/i,
				noon: /^md|^meio[-\s]dia/i,
				morning: /manhã/i,
				afternoon: /tarde/i,
				evening: /tarde/i,
				night: /noite/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
};
//#endregion
//#region node_modules/@date-fns/tz/tzName/index.js
function Im(e, t, n = "long") {
	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		timeZone: e,
		timeZoneName: n
	}).format(t).split(/\s/g).slice(2).join(" ");
}
//#endregion
//#region node_modules/@date-fns/tz/tzOffset/index.js
var Lm = {}, Rm = {};
function zm(e, t) {
	try {
		let n = (Lm[e] ||= new Intl.DateTimeFormat("en-US", {
			timeZone: e,
			timeZoneName: "longOffset"
		}).format)(t).split("GMT")[1];
		return n in Rm ? Rm[n] : Vm(n, n.split(":"));
	} catch {
		if (e in Rm) return Rm[e];
		let t = e?.match(Bm);
		return t ? Vm(e, t.slice(1)) : NaN;
	}
}
var Bm = /([+-]\d\d):?(\d\d)?/;
function Vm(e, t) {
	let n = +(t[0] || 0), r = +(t[1] || 0), i = (t[2] || 0) / 60;
	return Rm[e] = n * 60 + r > 0 ? n * 60 + r + i : n * 60 - r - i;
}
//#endregion
//#region node_modules/@date-fns/tz/date/mini.js
var Hm = class e extends Date {
	constructor(...e) {
		super(), e.length > 1 && typeof e[e.length - 1] == "string" && (this.timeZone = e.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(zm(this.timeZone, this)) ? this.setTime(NaN) : e.length ? typeof e[0] == "number" && (e.length === 1 || e.length === 2 && typeof e[1] != "number") ? this.setTime(e[0]) : typeof e[0] == "string" ? this.setTime(+new Date(e[0])) : e[0] instanceof Date ? this.setTime(+e[0]) : (this.setTime(+new Date(...e)), Km(this, NaN), Wm(this)) : this.setTime(Date.now());
	}
	static tz(t, ...n) {
		return n.length ? new e(...n, t) : new e(Date.now(), t);
	}
	withTimeZone(t) {
		return new e(+this, t);
	}
	getTimezoneOffset() {
		let e = -zm(this.timeZone, this);
		return e > 0 ? Math.floor(e) : Math.ceil(e);
	}
	setTime(e) {
		return Date.prototype.setTime.apply(this, arguments), Wm(this), +this;
	}
	[Symbol.for("constructDateFrom")](t) {
		return new e(+new Date(t), this.timeZone);
	}
}, Um = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
	if (!Um.test(e)) return;
	let t = e.replace(Um, "$1UTC");
	Hm.prototype[t] && (e.startsWith("get") ? Hm.prototype[e] = function() {
		return this.internal[t]();
	} : (Hm.prototype[e] = function() {
		return Date.prototype[t].apply(this.internal, arguments), Gm(this), +this;
	}, Hm.prototype[t] = function() {
		return Date.prototype[t].apply(this, arguments), Wm(this), +this;
	}));
});
function Wm(e) {
	e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-zm(e.timeZone, e) * 60));
}
function Gm(e) {
	Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Km(e);
}
function Km(e) {
	let t = zm(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
	r.setUTCHours(r.getUTCHours() - 1);
	let i = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), a = i - -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), o = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
	a && o && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + a);
	let s = i - n;
	s && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + s);
	let c = /* @__PURE__ */ new Date(+e);
	c.setUTCSeconds(0);
	let l = i > 0 ? c.getSeconds() : (c.getSeconds() - 60) % 60, u = Math.round(-(zm(e.timeZone, e) * 60)) % 60;
	(u || l) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + u), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + u + l));
	let d = zm(e.timeZone, e), f = d > 0 ? Math.floor(d) : Math.ceil(d), p = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - f, m = f !== n, h = p - s;
	if (m && h) {
		Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + h);
		let t = zm(e.timeZone, e), n = f - (t > 0 ? Math.floor(t) : Math.ceil(t));
		n && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + n), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + n));
	}
}
//#endregion
//#region node_modules/@date-fns/tz/date/index.js
var qm = class e extends Hm {
	static tz(t, ...n) {
		return n.length ? new e(...n, t) : new e(Date.now(), t);
	}
	toISOString() {
		let [e, t, n] = this.tzComponents(), r = `${e}${t}:${n}`;
		return this.internal.toISOString().slice(0, -1) + r;
	}
	toString() {
		return `${this.toDateString()} ${this.toTimeString()}`;
	}
	toDateString() {
		let [e, t, n, r] = this.internal.toUTCString().split(" ");
		return `${e?.slice(0, -1)} ${n} ${t} ${r}`;
	}
	toTimeString() {
		let e = this.internal.toUTCString().split(" ")[4], [t, n, r] = this.tzComponents();
		return `${e} GMT${t}${n}${r} (${Im(this.timeZone, this)})`;
	}
	toLocaleString(e, t) {
		return Date.prototype.toLocaleString.call(this, e, {
			...t,
			timeZone: t?.timeZone || this.timeZone
		});
	}
	toLocaleDateString(e, t) {
		return Date.prototype.toLocaleDateString.call(this, e, {
			...t,
			timeZone: t?.timeZone || this.timeZone
		});
	}
	toLocaleTimeString(e, t) {
		return Date.prototype.toLocaleTimeString.call(this, e, {
			...t,
			timeZone: t?.timeZone || this.timeZone
		});
	}
	tzComponents() {
		let e = this.getTimezoneOffset();
		return [
			e > 0 ? "-" : "+",
			String(Math.floor(Math.abs(e) / 60)).padStart(2, "0"),
			String(Math.abs(e) % 60).padStart(2, "0")
		];
	}
	withTimeZone(t) {
		return new e(+this, t);
	}
	[Symbol.for("constructDateFrom")](t) {
		return new e(+new Date(t), this.timeZone);
	}
}, Jm = 5, Ym = 4;
function Xm(e, t) {
	let n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, i = t.addDays(e, -r + 1), a = t.addDays(i, Jm * 7 - 1);
	return t.getMonth(e) === t.getMonth(a) ? Jm : Ym;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/startOfBroadcastWeek.js
function Zm(e, t) {
	let n = t.startOfMonth(e), r = n.getDay();
	return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/endOfBroadcastWeek.js
function Qm(e, t) {
	let n = Zm(e, t), r = Xm(e, t);
	return t.addDays(n, r * 7 - 1);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/en-US.js
var $m = {
	...qp,
	labels: {
		labelDayButton: (e, t, n, r) => {
			let i;
			i = r && typeof r.format == "function" ? r.format.bind(r) : (e, t) => bm(e, t, {
				locale: qp,
				...n
			});
			let a = i(e, "PPPP");
			return t.today && (a = `Today, ${a}`), t.selected && (a = `${a}, selected`), a;
		},
		labelMonthDropdown: "Choose the Month",
		labelNext: "Go to the Next Month",
		labelPrevious: "Go to the Previous Month",
		labelWeekNumber: (e) => `Week ${e}`,
		labelYearDropdown: "Choose the Year",
		labelGrid: (e, t, n) => {
			let r;
			return r = n && typeof n.format == "function" ? n.format.bind(n) : (e, n) => bm(e, n, {
				locale: qp,
				...t
			}), r(e, "LLLL yyyy");
		},
		labelGridcell: (e, t, n, r) => {
			let i;
			i = r && typeof r.format == "function" ? r.format.bind(r) : (e, t) => bm(e, t, {
				locale: qp,
				...n
			});
			let a = i(e, "PPPP");
			return t?.today && (a = `Today, ${a}`), a;
		},
		labelNav: "Navigation bar",
		labelWeekNumberHeader: "Week Number",
		labelWeekday: (e, t, n) => {
			let r;
			return r = n && typeof n.format == "function" ? n.format.bind(n) : (e, n) => bm(e, n, {
				locale: qp,
				...t
			}), r(e, "cccc");
		}
	}
}, eh = class e {
	constructor(e, t) {
		this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? qm.tz(this.options.timeZone) : new this.Date(), this.newDate = (e, t, n) => this.overrides?.newDate ? this.overrides.newDate(e, t, n) : this.options.timeZone ? new qm(e, t, n, this.options.timeZone) : new Date(e, t, n), this.addDays = (e, t) => this.overrides?.addDays ? this.overrides.addDays(e, t) : op(e, t), this.addMonths = (e, t) => this.overrides?.addMonths ? this.overrides.addMonths(e, t) : sp(e, t), this.addWeeks = (e, t) => this.overrides?.addWeeks ? this.overrides.addWeeks(e, t) : vp(e, t), this.addYears = (e, t) => this.overrides?.addYears ? this.overrides.addYears(e, t) : yp(e, t), this.differenceInCalendarDays = (e, t) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(e, t) : gp(e, t), this.differenceInCalendarMonths = (e, t) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(e, t) : Tp(e, t), this.eachMonthOfInterval = (e) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(e) : Op(e), this.eachYearOfInterval = (e) => {
			let t = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(e) : Mp(e), n = new Set(t.map((e) => this.getYear(e)));
			if (n.size === t.length) return t;
			let r = [];
			return n.forEach((e) => {
				r.push(new Date(e, 0, 1));
			}), r;
		}, this.endOfBroadcastWeek = (e) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(e) : Qm(e, this), this.endOfISOWeek = (e) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(e) : Pp(e), this.endOfMonth = (e) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(e) : Ep(e), this.endOfWeek = (e, t) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(e, t) : Np(e, this.options), this.endOfYear = (e) => this.overrides?.endOfYear ? this.overrides.endOfYear(e) : Ap(e), this.format = (e, t, n) => {
			let r = this.overrides?.format ? this.overrides.format(e, t, this.options) : bm(e, t, this.options);
			return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(r) : r;
		}, this.getISOWeek = (e) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(e) : Yp(e), this.getMonth = (e, t) => this.overrides?.getMonth ? this.overrides.getMonth(e, this.options) : Cm(e, this.options), this.getYear = (e, t) => this.overrides?.getYear ? this.overrides.getYear(e, this.options) : wm(e, this.options), this.getWeek = (e, t) => this.overrides?.getWeek ? this.overrides.getWeek(e, this.options) : Qp(e, this.options), this.isAfter = (e, t) => this.overrides?.isAfter ? this.overrides.isAfter(e, t) : Tm(e, t), this.isBefore = (e, t) => this.overrides?.isBefore ? this.overrides.isBefore(e, t) : Em(e, t), this.isDate = (e) => this.overrides?.isDate ? this.overrides.isDate(e) : Cp(e), this.isSameDay = (e, t) => this.overrides?.isSameDay ? this.overrides.isSameDay(e, t) : Sp(e, t), this.isSameMonth = (e, t) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(e, t) : Dm(e, t), this.isSameYear = (e, t) => this.overrides?.isSameYear ? this.overrides.isSameYear(e, t) : Om(e, t), this.max = (e) => this.overrides?.max ? this.overrides.max(e) : bp(e), this.min = (e) => this.overrides?.min ? this.overrides.min(e) : xp(e), this.setMonth = (e, t) => this.overrides?.setMonth ? this.overrides.setMonth(e, t) : km(e, t), this.setYear = (e, t) => this.overrides?.setYear ? this.overrides.setYear(e, t) : Am(e, t), this.startOfBroadcastWeek = (e, t) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(e, this) : Zm(e, this), this.startOfDay = (e) => this.overrides?.startOfDay ? this.overrides.startOfDay(e) : hp(e), this.startOfISOWeek = (e) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(e) : dp(e), this.startOfMonth = (e) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(e) : kp(e), this.startOfWeek = (e, t) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(e, this.options) : up(e, this.options), this.startOfYear = (e) => this.overrides?.startOfYear ? this.overrides.startOfYear(e) : jp(e), this.options = {
			locale: $m,
			...e
		}, this.overrides = t;
	}
	getDigitMap() {
		let { numerals: e = "latn" } = this.options, t = new Intl.NumberFormat("en-US", { numberingSystem: e }), n = {};
		for (let e = 0; e < 10; e++) n[e.toString()] = t.format(e);
		return n;
	}
	replaceDigits(e) {
		let t = this.getDigitMap();
		return e.replace(/\d/g, (e) => t[e] || e);
	}
	formatNumber(e) {
		return this.replaceDigits(e.toString());
	}
	getMonthYearOrder() {
		let t = this.options.locale?.code;
		return t && e.yearFirstLocales.has(t) ? "year-first" : "month-first";
	}
	formatMonthYear(t) {
		let { locale: n, timeZone: r, numerals: i } = this.options, a = n?.code;
		if (a && e.yearFirstLocales.has(a)) try {
			return new Intl.DateTimeFormat(a, {
				month: "long",
				year: "numeric",
				timeZone: r,
				numberingSystem: i
			}).format(t);
		} catch {}
		let o = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
		return this.format(t, o);
	}
};
eh.yearFirstLocales = new Set([
	"eu",
	"hu",
	"ja",
	"ja-Hira",
	"ja-JP",
	"ko",
	"ko-KR",
	"lt",
	"lt-LT",
	"lv",
	"lv-LV",
	"mn",
	"mn-MN",
	"zh",
	"zh-CN",
	"zh-HK",
	"zh-TW"
]);
var th = new eh(), nh = class {
	constructor(e, t, n = th) {
		this.date = e, this.displayMonth = t, this.outside = !!(t && !n.isSameMonth(e, t)), this.dateLib = n, this.isoDate = n.format(e, "yyyy-MM-dd"), this.displayMonthId = n.format(t, "yyyy-MM"), this.dateMonthId = n.format(e, "yyyy-MM");
	}
	isEqualTo(e) {
		return this.dateLib.isSameDay(e.date, this.date) && this.dateLib.isSameMonth(e.displayMonth, this.displayMonth);
	}
}, rh = class {
	constructor(e, t) {
		this.date = e, this.weeks = t;
	}
}, ih = class {
	constructor(e, t) {
		this.days = t, this.weekNumber = e;
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Button.js
function ah(e) {
	return t.createElement("button", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/CaptionLabel.js
function oh(e) {
	return t.createElement("span", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Chevron.js
function sh(e) {
	let { size: n = 24, orientation: r = "left", className: i } = e;
	return t.createElement("svg", {
		className: i,
		width: n,
		height: n,
		viewBox: "0 0 24 24"
	}, r === "up" && t.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }), r === "down" && t.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }), r === "left" && t.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }), r === "right" && t.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" }));
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Day.js
function ch(e) {
	let { day: n, modifiers: r, ...i } = e;
	return t.createElement("td", { ...i });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/DayButton.js
function lh(e) {
	let { day: n, modifiers: r, ...i } = e, a = t.useRef(null);
	return t.useEffect(() => {
		r.focused && a.current?.focus();
	}, [r.focused]), t.createElement("button", {
		ref: a,
		...i
	});
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/UI.js
var Z;
(function(e) {
	e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(Z ||= {});
var Q;
(function(e) {
	e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(Q ||= {});
var uh;
(function(e) {
	e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(uh ||= {});
var dh;
(function(e) {
	e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(dh ||= {});
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Dropdown.js
function fh(e) {
	let { options: n, className: r, components: i, classNames: a, ...o } = e, s = [a[Z.Dropdown], r].join(" "), c = n?.find(({ value: e }) => e === o.value);
	return t.createElement("span", {
		"data-disabled": o.disabled,
		className: a[Z.DropdownRoot]
	}, t.createElement(i.Select, {
		className: s,
		...o
	}, n?.map(({ value: e, label: n, disabled: r }) => t.createElement(i.Option, {
		key: e,
		value: e,
		disabled: r
	}, n))), t.createElement("span", {
		className: a[Z.CaptionLabel],
		"aria-hidden": !0
	}, c?.label, t.createElement(i.Chevron, {
		orientation: "down",
		size: 18,
		className: a[Z.Chevron]
	})));
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/DropdownNav.js
function ph(e) {
	return t.createElement("div", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Footer.js
function mh(e) {
	return t.createElement("div", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Month.js
function hh(e) {
	let { calendarMonth: n, displayIndex: r, ...i } = e;
	return t.createElement("div", { ...i }, e.children);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/MonthCaption.js
function gh(e) {
	let { calendarMonth: n, displayIndex: r, ...i } = e;
	return t.createElement("div", { ...i });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/MonthGrid.js
function _h(e) {
	return t.createElement("table", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Months.js
function vh(e) {
	return t.createElement("div", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/useDayPicker.js
var yh = n(void 0);
function bh() {
	let e = o(yh);
	if (e === void 0) throw Error("useDayPicker() must be used within a custom component.");
	return e;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/MonthsDropdown.js
function xh(e) {
	let { components: n } = bh();
	return t.createElement(n.Dropdown, { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Nav.js
function Sh(e) {
	let { onPreviousClick: n, onNextClick: r, previousMonth: i, nextMonth: o, ...s } = e, { components: c, classNames: l, labels: { labelPrevious: u, labelNext: d } } = bh(), f = a((e) => {
		o && r?.(e);
	}, [o, r]), p = a((e) => {
		i && n?.(e);
	}, [i, n]);
	return t.createElement("nav", { ...s }, t.createElement(c.PreviousMonthButton, {
		type: "button",
		className: l[Z.PreviousMonthButton],
		tabIndex: i ? void 0 : -1,
		"aria-disabled": i ? void 0 : !0,
		"aria-label": u(i),
		onClick: p
	}, t.createElement(c.Chevron, {
		disabled: i ? void 0 : !0,
		className: l[Z.Chevron],
		orientation: "left"
	})), t.createElement(c.NextMonthButton, {
		type: "button",
		className: l[Z.NextMonthButton],
		tabIndex: o ? void 0 : -1,
		"aria-disabled": o ? void 0 : !0,
		"aria-label": d(o),
		onClick: f
	}, t.createElement(c.Chevron, {
		disabled: o ? void 0 : !0,
		orientation: "right",
		className: l[Z.Chevron]
	})));
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/NextMonthButton.js
function Ch(e) {
	let { components: n } = bh();
	return t.createElement(n.Button, { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Option.js
function wh(e) {
	return t.createElement("option", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/PreviousMonthButton.js
function Th(e) {
	let { components: n } = bh();
	return t.createElement(n.Button, { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Root.js
function Eh(e) {
	let { rootRef: n, ...r } = e;
	return t.createElement("div", {
		...r,
		ref: n
	});
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Select.js
function Dh(e) {
	return t.createElement("select", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Week.js
function Oh(e) {
	let { week: n, ...r } = e;
	return t.createElement("tr", { ...r });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Weekday.js
function kh(e) {
	return t.createElement("th", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Weekdays.js
function Ah(e) {
	return t.createElement("thead", { "aria-hidden": !0 }, t.createElement("tr", { ...e }));
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/WeekNumber.js
function jh(e) {
	let { week: n, ...r } = e;
	return t.createElement("th", { ...r });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/WeekNumberHeader.js
function Mh(e) {
	return t.createElement("th", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Weeks.js
function Nh(e) {
	return t.createElement("tbody", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/YearsDropdown.js
function Ph(e) {
	let { components: n } = bh();
	return t.createElement(n.Dropdown, { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/custom-components.js
var Fh = /* @__PURE__ */ v({
	Button: () => ah,
	CaptionLabel: () => oh,
	Chevron: () => sh,
	Day: () => ch,
	DayButton: () => lh,
	Dropdown: () => fh,
	DropdownNav: () => ph,
	Footer: () => mh,
	Month: () => hh,
	MonthCaption: () => gh,
	MonthGrid: () => _h,
	Months: () => vh,
	MonthsDropdown: () => xh,
	Nav: () => Sh,
	NextMonthButton: () => Ch,
	Option: () => wh,
	PreviousMonthButton: () => Th,
	Root: () => Eh,
	Select: () => Dh,
	Week: () => Oh,
	WeekNumber: () => jh,
	WeekNumberHeader: () => Mh,
	Weekday: () => kh,
	Weekdays: () => Ah,
	Weeks: () => Nh,
	YearsDropdown: () => Ph
});
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/rangeIncludesDate.js
function Ih(e, t, n = !1, r = th) {
	let { from: i, to: a } = e, { differenceInCalendarDays: o, isSameDay: s } = r;
	return i && a ? (o(a, i) < 0 && ([i, a] = [a, i]), o(t, i) >= (n ? 1 : 0) && o(a, t) >= (n ? 1 : 0)) : !n && a ? s(a, t) : !n && i ? s(i, t) : !1;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/typeguards.js
function Lh(e) {
	return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function Rh(e) {
	return !!(e && typeof e == "object" && "from" in e);
}
function zh(e) {
	return !!(e && typeof e == "object" && "after" in e);
}
function Bh(e) {
	return !!(e && typeof e == "object" && "before" in e);
}
function Vh(e) {
	return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function Hh(e, t) {
	return Array.isArray(e) && e.every(t.isDate);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/dateMatchModifiers.js
function Uh(e, t, n = th) {
	let r = Array.isArray(t) ? t : [t], { isSameDay: i, differenceInCalendarDays: a, isAfter: o } = n;
	return r.some((t) => {
		if (typeof t == "boolean") return t;
		if (n.isDate(t)) return i(e, t);
		if (Hh(t, n)) return t.some((t) => i(e, t));
		if (Rh(t)) return Ih(t, e, !1, n);
		if (Vh(t)) return Array.isArray(t.dayOfWeek) ? t.dayOfWeek.includes(e.getDay()) : t.dayOfWeek === e.getDay();
		if (Lh(t)) {
			let n = a(t.before, e), r = a(t.after, e), i = n > 0, s = r < 0;
			return o(t.before, t.after) ? s && i : i || s;
		}
		return zh(t) ? a(e, t.after) > 0 : Bh(t) ? a(t.before, e) > 0 : typeof t == "function" ? t(e) : !1;
	});
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/createGetModifiers.js
function Wh(e, t, n, r, i) {
	let { disabled: a, hidden: o, modifiers: s, showOutsideDays: c, broadcastCalendar: l, today: u = i.today() } = t, { isSameDay: d, isSameMonth: f, startOfMonth: p, isBefore: m, endOfMonth: h, isAfter: g } = i, _ = n && p(n), v = r && h(r), y = {
		[Q.focused]: [],
		[Q.outside]: [],
		[Q.disabled]: [],
		[Q.hidden]: [],
		[Q.today]: []
	}, b = {};
	for (let t of e) {
		let { date: e, displayMonth: n } = t, r = !!(n && !f(e, n)), p = !!(_ && m(e, _)), h = !!(v && g(e, v)), x = !!(a && Uh(e, a, i)), S = !!(o && Uh(e, o, i)) || p || h || !l && !c && r || l && c === !1 && r, C = d(e, u);
		r && y.outside.push(t), x && y.disabled.push(t), S && y.hidden.push(t), C && y.today.push(t), s && Object.keys(s).forEach((n) => {
			let r = s?.[n];
			r && Uh(e, r, i) && (b[n] ? b[n].push(t) : b[n] = [t]);
		});
	}
	return (e) => {
		let t = {
			[Q.focused]: !1,
			[Q.disabled]: !1,
			[Q.hidden]: !1,
			[Q.outside]: !1,
			[Q.today]: !1
		}, n = {};
		for (let n in y) t[n] = y[n].some((t) => t === e);
		for (let t in b) n[t] = b[t].some((t) => t === e);
		return {
			...t,
			...n
		};
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getClassNamesForModifiers.js
function Gh(e, t, n = {}) {
	return Object.entries(e).filter(([, e]) => e === !0).reduce((e, [r]) => (n[r] ? e.push(n[r]) : t[Q[r]] ? e.push(t[Q[r]]) : t[uh[r]] && e.push(t[uh[r]]), e), [t[Z.Day]]);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getComponents.js
function Kh(e) {
	return {
		...Fh,
		...e
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getDataAttributes.js
function qh(e) {
	let t = {
		"data-mode": e.mode ?? void 0,
		"data-required": "required" in e ? e.required : void 0,
		"data-multiple-months": e.numberOfMonths && e.numberOfMonths > 1 || void 0,
		"data-week-numbers": e.showWeekNumber || void 0,
		"data-broadcast-calendar": e.broadcastCalendar || void 0,
		"data-nav-layout": e.navLayout || void 0
	};
	return Object.entries(e).forEach(([e, n]) => {
		e.startsWith("data-") && (t[e] = n);
	}), t;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getDefaultClassNames.js
function Jh() {
	let e = {};
	for (let t in Z) e[Z[t]] = `rdp-${Z[t]}`;
	for (let t in Q) e[Q[t]] = `rdp-${Q[t]}`;
	for (let t in uh) e[uh[t]] = `rdp-${uh[t]}`;
	for (let t in dh) e[dh[t]] = `rdp-${dh[t]}`;
	return e;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatCaption.js
function Yh(e, t, n) {
	return (n ?? new eh(t)).formatMonthYear(e);
}
var Xh = Yh;
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatDay.js
function Zh(e, t, n) {
	return (n ?? new eh(t)).format(e, "d");
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatMonthDropdown.js
function Qh(e, t = th) {
	return t.format(e, "LLLL");
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatWeekdayName.js
function $h(e, t, n) {
	return (n ?? new eh(t)).format(e, "cccccc");
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatWeekNumber.js
function eg(e, t = th) {
	return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatWeekNumberHeader.js
function tg() {
	return "";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatYearDropdown.js
function ng(e, t = th) {
	return t.format(e, "yyyy");
}
var rg = ng, ig = /* @__PURE__ */ v({
	formatCaption: () => Yh,
	formatDay: () => Zh,
	formatMonthCaption: () => Xh,
	formatMonthDropdown: () => Qh,
	formatWeekNumber: () => eg,
	formatWeekNumberHeader: () => tg,
	formatWeekdayName: () => $h,
	formatYearCaption: () => rg,
	formatYearDropdown: () => ng
});
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getFormatters.js
function ag(e) {
	return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
		...ig,
		...e
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelDayButton.js
function og(e, t, n, r) {
	let i = (r ?? new eh(n)).format(e, "PPPP");
	return t.today && (i = `Today, ${i}`), t.selected && (i = `${i}, selected`), i;
}
var sg = og;
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelGrid.js
function cg(e, t, n) {
	return (n ?? new eh(t)).formatMonthYear(e);
}
var lg = cg;
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelGridcell.js
function ug(e, t, n, r) {
	let i = (r ?? new eh(n)).format(e, "PPPP");
	return t?.today && (i = `Today, ${i}`), i;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelMonthDropdown.js
function dg(e) {
	return "Choose the Month";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelNav.js
function fg() {
	return "";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelNext.js
var pg = "Go to the Next Month";
function mg(e, t) {
	return pg;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelPrevious.js
function hg(e) {
	return "Go to the Previous Month";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelWeekday.js
function gg(e, t, n) {
	return (n ?? new eh(t)).format(e, "cccc");
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelWeekNumber.js
function _g(e, t) {
	return `Week ${e}`;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelWeekNumberHeader.js
function vg(e) {
	return "Week Number";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelYearDropdown.js
function yg(e) {
	return "Choose the Year";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/index.js
var bg = /* @__PURE__ */ v({
	labelCaption: () => lg,
	labelDay: () => sg,
	labelDayButton: () => og,
	labelGrid: () => cg,
	labelGridcell: () => ug,
	labelMonthDropdown: () => dg,
	labelNav: () => fg,
	labelNext: () => mg,
	labelPrevious: () => hg,
	labelWeekNumber: () => _g,
	labelWeekNumberHeader: () => vg,
	labelWeekday: () => gg,
	labelYearDropdown: () => yg
}), xg = (e, t, n) => t || (n ? typeof n == "function" ? n : (...e) => n : e);
function Sg(e, t) {
	let n = t.locale?.labels ?? {};
	return {
		...bg,
		...e ?? {},
		labelDayButton: xg(og, e?.labelDayButton, n.labelDayButton),
		labelMonthDropdown: xg(dg, e?.labelMonthDropdown, n.labelMonthDropdown),
		labelNext: xg(mg, e?.labelNext, n.labelNext),
		labelPrevious: xg(hg, e?.labelPrevious, n.labelPrevious),
		labelWeekNumber: xg(_g, e?.labelWeekNumber, n.labelWeekNumber),
		labelYearDropdown: xg(yg, e?.labelYearDropdown, n.labelYearDropdown),
		labelGrid: xg(cg, e?.labelGrid, n.labelGrid),
		labelGridcell: xg(ug, e?.labelGridcell, n.labelGridcell),
		labelNav: xg(fg, e?.labelNav, n.labelNav),
		labelWeekNumberHeader: xg(vg, e?.labelWeekNumberHeader, n.labelWeekNumberHeader),
		labelWeekday: xg(gg, e?.labelWeekday, n.labelWeekday)
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getMonthOptions.js
function Cg(e, t, n, r, i) {
	let { startOfMonth: a, startOfYear: o, endOfYear: s, eachMonthOfInterval: c, getMonth: l } = i;
	return c({
		start: o(e),
		end: s(e)
	}).map((e) => {
		let o = r.formatMonthDropdown(e, i);
		return {
			value: l(e),
			label: o,
			disabled: t && e < a(t) || n && e > a(n) || !1
		};
	});
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getStyleForModifiers.js
function wg(e, t = {}, n = {}) {
	let r = { ...t?.[Z.Day] };
	return Object.entries(e).filter(([, e]) => e === !0).forEach(([e]) => {
		r = {
			...r,
			...n?.[e]
		};
	}), r;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getWeekdays.js
function Tg(e, t, n, r) {
	let i = r ?? e.today(), a = n ? e.startOfBroadcastWeek(i, e) : t ? e.startOfISOWeek(i) : e.startOfWeek(i), o = [];
	for (let t = 0; t < 7; t++) {
		let n = e.addDays(a, t);
		o.push(n);
	}
	return o;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getYearOptions.js
function Eg(e, t, n, r, i = !1) {
	if (!e || !t) return;
	let { startOfYear: a, endOfYear: o, eachYearOfInterval: s, getYear: c } = r, l = s({
		start: a(e),
		end: o(t)
	});
	return i && l.reverse(), l.map((e) => {
		let t = n.formatYearDropdown(e, r);
		return {
			value: c(e),
			label: t,
			disabled: !1
		};
	});
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/noonDateLib.js
function Dg(e, t = {}) {
	let { weekStartsOn: n, locale: r } = t, i = n ?? r?.options?.weekStartsOn ?? 0, a = (t) => {
		let n = typeof t == "number" || typeof t == "string" ? new Date(t) : t;
		return new qm(n.getFullYear(), n.getMonth(), n.getDate(), 12, 0, 0, e);
	}, o = (e) => {
		let t = a(e);
		return new Date(t.getFullYear(), t.getMonth(), t.getDate(), 0, 0, 0, 0);
	};
	return {
		today: () => a(qm.tz(e)),
		newDate: (t, n, r) => new qm(t, n, r, 12, 0, 0, e),
		startOfDay: (e) => a(e),
		startOfWeek: (e, t) => {
			let n = a(e), r = t?.weekStartsOn ?? i, o = (n.getDay() - r + 7) % 7;
			return n.setDate(n.getDate() - o), n;
		},
		startOfISOWeek: (e) => {
			let t = a(e), n = (t.getDay() - 1 + 7) % 7;
			return t.setDate(t.getDate() - n), t;
		},
		startOfMonth: (e) => {
			let t = a(e);
			return t.setDate(1), t;
		},
		startOfYear: (e) => {
			let t = a(e);
			return t.setMonth(0, 1), t;
		},
		endOfWeek: (e, t) => {
			let n = a(e), r = (((t?.weekStartsOn ?? i) + 6) % 7 - n.getDay() + 7) % 7;
			return n.setDate(n.getDate() + r), n;
		},
		endOfISOWeek: (e) => {
			let t = a(e), n = (7 - t.getDay()) % 7;
			return t.setDate(t.getDate() + n), t;
		},
		endOfMonth: (e) => {
			let t = a(e);
			return t.setMonth(t.getMonth() + 1, 0), t;
		},
		endOfYear: (e) => {
			let t = a(e);
			return t.setMonth(11, 31), t;
		},
		eachMonthOfInterval: (t) => {
			let n = a(t.start), r = a(t.end), i = [], o = new qm(n.getFullYear(), n.getMonth(), 1, 12, 0, 0, e), s = r.getFullYear() * 12 + r.getMonth();
			for (; o.getFullYear() * 12 + o.getMonth() <= s;) i.push(new qm(o, e)), o.setMonth(o.getMonth() + 1, 1);
			return i;
		},
		addDays: (e, t) => {
			let n = a(e);
			return n.setDate(n.getDate() + t), n;
		},
		addWeeks: (e, t) => {
			let n = a(e);
			return n.setDate(n.getDate() + t * 7), n;
		},
		addMonths: (e, t) => {
			let n = a(e);
			return n.setMonth(n.getMonth() + t), n;
		},
		addYears: (e, t) => {
			let n = a(e);
			return n.setFullYear(n.getFullYear() + t), n;
		},
		eachYearOfInterval: (t) => {
			let n = a(t.start), r = a(t.end), i = [], o = new qm(n.getFullYear(), 0, 1, 12, 0, 0, e);
			for (; o.getFullYear() <= r.getFullYear();) i.push(new qm(o, e)), o.setFullYear(o.getFullYear() + 1, 0, 1);
			return i;
		},
		getWeek: (e, t) => Qp(o(e), {
			weekStartsOn: t?.weekStartsOn ?? i,
			firstWeekContainsDate: t?.firstWeekContainsDate ?? r?.options?.firstWeekContainsDate ?? 1
		}),
		getISOWeek: (e) => Yp(o(e)),
		differenceInCalendarDays: (e, t) => gp(o(e), o(t)),
		differenceInCalendarMonths: (e, t) => Tp(o(e), o(t))
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/useAnimation.js
var Og = (e) => e instanceof HTMLElement ? e : null, kg = (e) => [...e.querySelectorAll("[data-animated-month]") ?? []], Ag = (e) => Og(e.querySelector("[data-animated-month]")), jg = (e) => Og(e.querySelector("[data-animated-caption]")), Mg = (e) => Og(e.querySelector("[data-animated-weeks]")), Ng = (e) => Og(e.querySelector("[data-animated-nav]")), Pg = (e) => Og(e.querySelector("[data-animated-weekdays]"));
function Fg(e, t, { classNames: n, months: r, focused: i, dateLib: a }) {
	let o = u(null), s = u(r), l = u(!1);
	c(() => {
		let c = s.current;
		if (s.current = r, !t || !e.current || !(e.current instanceof HTMLElement) || r.length === 0 || c.length === 0 || r.length !== c.length) return;
		let u = a.isSameMonth(r[0].date, c[0].date), d = a.isAfter(r[0].date, c[0].date), f = d ? n[dh.caption_after_enter] : n[dh.caption_before_enter], p = d ? n[dh.weeks_after_enter] : n[dh.weeks_before_enter], m = o.current, h = e.current.cloneNode(!0);
		if (h instanceof HTMLElement ? (kg(h).forEach((e) => {
			if (!(e instanceof HTMLElement)) return;
			let t = Ag(e);
			t && e.contains(t) && e.removeChild(t);
			let n = jg(e);
			n && n.classList.remove(f);
			let r = Mg(e);
			r && r.classList.remove(p);
		}), o.current = h) : o.current = null, l.current || u || i) return;
		let g = m instanceof HTMLElement ? kg(m) : [], _ = kg(e.current);
		if (_?.every((e) => e instanceof HTMLElement) && g && g.every((e) => e instanceof HTMLElement)) {
			l.current = !0;
			let t = [];
			e.current.style.isolation = "isolate";
			let r = Ng(e.current);
			r && (r.style.zIndex = "1"), _.forEach((i, a) => {
				let o = g[a];
				if (!o) return;
				i.style.position = "relative", i.style.overflow = "hidden";
				let s = jg(i);
				s && s.classList.add(f);
				let c = Mg(i);
				c && c.classList.add(p);
				let u = () => {
					l.current = !1, e.current && (e.current.style.isolation = ""), r && (r.style.zIndex = ""), s && s.classList.remove(f), c && c.classList.remove(p), i.style.position = "", i.style.overflow = "", i.contains(o) && i.removeChild(o);
				};
				t.push(u), o.style.pointerEvents = "none", o.style.position = "absolute", o.style.overflow = "hidden", o.setAttribute("aria-hidden", "true");
				let m = Pg(o);
				m && (m.style.opacity = "0");
				let h = jg(o);
				h && (h.classList.add(d ? n[dh.caption_before_exit] : n[dh.caption_after_exit]), h.addEventListener("animationend", u));
				let _ = Mg(o);
				_ && _.classList.add(d ? n[dh.weeks_before_exit] : n[dh.weeks_after_exit]), i.insertBefore(o, i.firstChild);
			});
		}
	});
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getDates.js
function Ig(e, t, n, r) {
	let i = e[0], a = e[e.length - 1], { ISOWeek: o, fixedWeeks: s, broadcastCalendar: c } = n ?? {}, { addDays: l, differenceInCalendarDays: u, differenceInCalendarMonths: d, endOfBroadcastWeek: f, endOfISOWeek: p, endOfMonth: m, endOfWeek: h, isAfter: g, startOfBroadcastWeek: _, startOfISOWeek: v, startOfWeek: y } = r, b = c ? _(i, r) : o ? v(i) : y(i), x = c ? f(a) : o ? p(m(a)) : h(m(a)), S = t && (c ? f(t) : o ? p(t) : h(t)), C = u(S && g(x, S) ? S : x, b), w = d(a, i) + 1, T = [];
	for (let e = 0; e <= C; e++) {
		let t = l(b, e);
		T.push(t);
	}
	let E = (c ? 35 : 42) * w;
	if (s && T.length < E) {
		let e = E - T.length;
		for (let t = 0; t < e; t++) {
			let e = l(T[T.length - 1], 1);
			T.push(e);
		}
	}
	return T;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getDays.js
function Lg(e) {
	let t = [];
	return e.reduce((e, n) => {
		let r = n.weeks.reduce((e, t) => e.concat(t.days.slice()), t.slice());
		return e.concat(r.slice());
	}, t.slice());
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getDisplayMonths.js
function Rg(e, t, n, r) {
	let { numberOfMonths: i = 1 } = n, a = [];
	for (let n = 0; n < i; n++) {
		let i = r.addMonths(e, n);
		if (t && i > t) break;
		a.push(i);
	}
	return a;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getInitialMonth.js
function zg(e, t, n, r) {
	let { month: i, defaultMonth: a, today: o = r.today(), numberOfMonths: s = 1 } = e, c = i || a || o, { differenceInCalendarMonths: l, addMonths: u, startOfMonth: d } = r;
	return n && l(n, c) < s - 1 && (c = u(n, -1 * (s - 1))), t && l(c, t) < 0 && (c = t), d(c);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getMonths.js
function Bg(e, t, n, r) {
	let { addDays: i, endOfBroadcastWeek: a, endOfISOWeek: o, endOfMonth: s, endOfWeek: c, getISOWeek: l, getWeek: u, startOfBroadcastWeek: d, startOfISOWeek: f, startOfWeek: p } = r, m = e.reduce((e, m) => {
		let h = n.broadcastCalendar ? d(m, r) : n.ISOWeek ? f(m) : p(m), g = n.broadcastCalendar ? a(m) : n.ISOWeek ? o(s(m)) : c(s(m)), _ = t.filter((e) => e >= h && e <= g), v = n.broadcastCalendar ? 35 : 42;
		if (n.fixedWeeks && _.length < v) {
			let e = t.filter((e) => {
				let t = v - _.length;
				return e > g && e <= i(g, t);
			});
			_.push(...e);
		}
		let y = new rh(m, _.reduce((e, t) => {
			let i = n.ISOWeek ? l(t) : u(t), a = e.find((e) => e.weekNumber === i), o = new nh(t, m, r);
			return a ? a.days.push(o) : e.push(new ih(i, [o])), e;
		}, []));
		return e.push(y), e;
	}, []);
	return n.reverseMonths ? m.reverse() : m;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getNavMonth.js
function Vg(e, t) {
	let { startMonth: n, endMonth: r } = e, { startOfYear: i, startOfDay: a, startOfMonth: o, endOfMonth: s, addYears: c, endOfYear: l, newDate: u, today: d } = t, { fromYear: f, toYear: p, fromMonth: m, toMonth: h } = e;
	!n && m && (n = m), !n && f && (n = t.newDate(f, 0, 1)), !r && h && (r = h), !r && p && (r = u(p, 11, 31));
	let g = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
	return n ? n = o(n) : f ? n = u(f, 0, 1) : !n && g && (n = i(c(e.today ?? d(), -100))), r ? r = s(r) : p ? r = u(p, 11, 31) : !r && g && (r = l(e.today ?? d())), [n && a(n), r && a(r)];
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getNextMonth.js
function Hg(e, t, n, r) {
	if (n.disableNavigation) return;
	let { pagedNavigation: i, numberOfMonths: a = 1 } = n, { startOfMonth: o, addMonths: s, differenceInCalendarMonths: c } = r, l = i ? a : 1, u = o(e);
	if (!t || !(c(t, e) < a)) return s(u, l);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getPreviousMonth.js
function Ug(e, t, n, r) {
	if (n.disableNavigation) return;
	let { pagedNavigation: i, numberOfMonths: a } = n, { startOfMonth: o, addMonths: s, differenceInCalendarMonths: c } = r, l = i ? a ?? 1 : 1, u = o(e);
	if (!t || !(c(u, t) <= 0)) return s(u, -l);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getWeeks.js
function Wg(e) {
	return e.reduce((e, t) => e.concat(t.weeks.slice()), [].slice());
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/useControlledValue.js
function Gg(e, t) {
	let [n, r] = d(e);
	return [t === void 0 ? n : t, r];
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/useCalendar.js
function Kg(e, t) {
	let [n, r] = Vg(e, t), { startOfMonth: i, endOfMonth: a } = t, o = zg(e, n, r, t), [c, u] = Gg(o, e.month ? o : void 0);
	s(() => {
		u(zg(e, n, r, t));
	}, [e.timeZone]);
	let { months: d, weeks: f, days: p, previousMonth: m, nextMonth: h } = l(() => {
		let i = Rg(c, r, { numberOfMonths: e.numberOfMonths }, t), o = Bg(i, Ig(i, e.endMonth ? a(e.endMonth) : void 0, {
			ISOWeek: e.ISOWeek,
			fixedWeeks: e.fixedWeeks,
			broadcastCalendar: e.broadcastCalendar
		}, t), {
			broadcastCalendar: e.broadcastCalendar,
			fixedWeeks: e.fixedWeeks,
			ISOWeek: e.ISOWeek,
			reverseMonths: e.reverseMonths
		}, t);
		return {
			months: o,
			weeks: Wg(o),
			days: Lg(o),
			previousMonth: Ug(c, n, e, t),
			nextMonth: Hg(c, r, e, t)
		};
	}, [
		t,
		c.getTime(),
		r?.getTime(),
		n?.getTime(),
		e.disableNavigation,
		e.broadcastCalendar,
		e.endMonth?.getTime(),
		e.fixedWeeks,
		e.ISOWeek,
		e.numberOfMonths,
		e.pagedNavigation,
		e.reverseMonths
	]), { disableNavigation: g, onMonthChange: _ } = e, v = (e) => f.some((t) => t.days.some((t) => t.isEqualTo(e))), y = (e) => {
		if (g) return;
		let t = i(e);
		n && t < i(n) && (t = i(n)), r && t > i(r) && (t = i(r)), u(t), _?.(t);
	};
	return {
		months: d,
		weeks: f,
		days: p,
		navStart: n,
		navEnd: r,
		previousMonth: m,
		nextMonth: h,
		goToMonth: y,
		goToDay: (e) => {
			v(e) || y(e.date);
		}
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/calculateFocusTarget.js
var qg;
(function(e) {
	e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(qg ||= {});
function Jg(e) {
	return !e[Q.disabled] && !e[Q.hidden] && !e[Q.outside];
}
function Yg(e, t, n, r) {
	let i, a = -1;
	for (let o of e) {
		let e = t(o);
		Jg(e) && (e[Q.focused] && a < qg.FocusedModifier ? (i = o, a = qg.FocusedModifier) : r?.isEqualTo(o) && a < qg.LastFocused ? (i = o, a = qg.LastFocused) : n(o.date) && a < qg.Selected ? (i = o, a = qg.Selected) : e[Q.today] && a < qg.Today && (i = o, a = qg.Today));
	}
	return i ||= e.find((e) => Jg(t(e))), i;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getFocusableDate.js
function Xg(e, t, n, r, i, a, o) {
	let { ISOWeek: s, broadcastCalendar: c } = a, { addDays: l, addMonths: u, addWeeks: d, addYears: f, endOfBroadcastWeek: p, endOfISOWeek: m, endOfWeek: h, max: g, min: _, startOfBroadcastWeek: v, startOfISOWeek: y, startOfWeek: b } = o, x = {
		day: l,
		week: d,
		month: u,
		year: f,
		startOfWeek: (e) => c ? v(e, o) : s ? y(e) : b(e),
		endOfWeek: (e) => c ? p(e) : s ? m(e) : h(e)
	}[e](n, t === "after" ? 1 : -1);
	return t === "before" && r ? x = g([r, x]) : t === "after" && i && (x = _([i, x])), x;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getNextFocus.js
function Zg(e, t, n, r, i, a, o, s = 0) {
	if (s > 365) return;
	let c = Xg(e, t, n.date, r, i, a, o), l = !!(a.disabled && Uh(c, a.disabled, o)), u = !!(a.hidden && Uh(c, a.hidden, o)), d = new nh(c, c, o);
	return !l && !u ? d : Zg(e, t, d, r, i, a, o, s + 1);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/useFocus.js
function Qg(e, t, n, r, i) {
	let { autoFocus: a } = e, [o, s] = d(), c = Yg(t.days, n, r || (() => !1), o), [l, u] = d(a ? c : void 0);
	return {
		isFocusTarget: (e) => !!c?.isEqualTo(e),
		setFocused: u,
		focused: l,
		blur: () => {
			s(l), u(void 0);
		},
		moveFocus: (n, r) => {
			if (!l) return;
			let a = Zg(n, r, l, t.navStart, t.navEnd, e, i);
			a && (e.disableNavigation && !t.days.some((e) => e.isEqualTo(a)) || (t.goToDay(a), u(a)));
		}
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/selection/useMulti.js
function $g(e, t) {
	let { selected: n, required: r, onSelect: i } = e, [a, o] = Gg(n, i ? n : void 0), s = i ? n : a, { isSameDay: c } = t, l = (e) => s?.some((t) => c(t, e)) ?? !1, { min: u, max: d } = e;
	return {
		selected: s,
		select: (e, t, n) => {
			let a = [...s ?? []];
			if (l(e)) {
				if (s?.length === u || r && s?.length === 1) return;
				a = s?.filter((t) => !c(t, e));
			} else a = s?.length === d ? [e] : [...a, e];
			return i || o(a), i?.(a, e, t, n), a;
		},
		isSelected: l
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/addToRange.js
function e_(e, t, n = 0, r = 0, i = !1, a = th) {
	let { from: o, to: s } = t || {}, { isSameDay: c, isAfter: l, isBefore: u } = a, d;
	if (!o && !s) d = {
		from: e,
		to: n > 0 ? void 0 : e
	};
	else if (o && !s) d = c(o, e) ? n === 0 ? {
		from: o,
		to: e
	} : i ? {
		from: o,
		to: void 0
	} : void 0 : u(e, o) ? {
		from: e,
		to: o
	} : {
		from: o,
		to: e
	};
	else if (o && s) if (c(o, e) && c(s, e)) d = i ? {
		from: o,
		to: s
	} : void 0;
	else if (c(o, e)) d = {
		from: o,
		to: n > 0 ? void 0 : e
	};
	else if (c(s, e)) d = {
		from: e,
		to: n > 0 ? void 0 : e
	};
	else if (u(e, o)) d = {
		from: e,
		to: s
	};
	else if (l(e, o)) d = {
		from: o,
		to: e
	};
	else if (l(e, s)) d = {
		from: o,
		to: e
	};
	else throw Error("Invalid range");
	if (d?.from && d?.to) {
		let t = a.differenceInCalendarDays(d.to, d.from);
		(r > 0 && t > r || n > 1 && t < n) && (d = {
			from: e,
			to: void 0
		});
	}
	return d;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/rangeContainsDayOfWeek.js
function t_(e, t, n = th) {
	let r = Array.isArray(t) ? t : [t], i = e.from, a = n.differenceInCalendarDays(e.to, e.from), o = Math.min(a, 6);
	for (let e = 0; e <= o; e++) {
		if (r.includes(i.getDay())) return !0;
		i = n.addDays(i, 1);
	}
	return !1;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/rangeOverlaps.js
function n_(e, t, n = th) {
	return Ih(e, t.from, !1, n) || Ih(e, t.to, !1, n) || Ih(t, e.from, !1, n) || Ih(t, e.to, !1, n);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/rangeContainsModifiers.js
function r_(e, t, n = th) {
	let r = Array.isArray(t) ? t : [t];
	if (r.filter((e) => typeof e != "function").some((t) => typeof t == "boolean" ? t : n.isDate(t) ? Ih(e, t, !1, n) : Hh(t, n) ? t.some((t) => Ih(e, t, !1, n)) : Rh(t) ? t.from && t.to ? n_(e, {
		from: t.from,
		to: t.to
	}, n) : !1 : Vh(t) ? t_(e, t.dayOfWeek, n) : Lh(t) ? n.isAfter(t.before, t.after) ? n_(e, {
		from: n.addDays(t.after, 1),
		to: n.addDays(t.before, -1)
	}, n) : Uh(e.from, t, n) || Uh(e.to, t, n) : zh(t) || Bh(t) ? Uh(e.from, t, n) || Uh(e.to, t, n) : !1)) return !0;
	let i = r.filter((e) => typeof e == "function");
	if (i.length) {
		let t = e.from, r = n.differenceInCalendarDays(e.to, e.from);
		for (let e = 0; e <= r; e++) {
			if (i.some((e) => e(t))) return !0;
			t = n.addDays(t, 1);
		}
	}
	return !1;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/selection/useRange.js
function i_(e, t) {
	let { disabled: n, excludeDisabled: r, resetOnSelect: i, selected: a, required: o, onSelect: s } = e, [c, l] = Gg(a, s ? a : void 0), u = s ? a : c;
	return {
		selected: u,
		select: (a, c, d) => {
			let { min: f, max: p } = e, m;
			if (a) {
				let e = u?.from, n = u?.to, r = !!e && !!n, s = !!e && !!n && t.isSameDay(e, n) && t.isSameDay(a, e);
				m = i && (r || !u?.from) ? !o && s ? void 0 : {
					from: a,
					to: void 0
				} : e_(a, u, f, p, o, t);
			}
			return r && n && m?.from && m.to && r_({
				from: m.from,
				to: m.to
			}, n, t) && (m.from = a, m.to = void 0), s || l(m), s?.(m, a, c, d), m;
		},
		isSelected: (e) => u && Ih(u, e, !1, t)
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/selection/useSingle.js
function a_(e, t) {
	let { selected: n, required: r, onSelect: i } = e, [a, o] = Gg(n, i ? n : void 0), s = i ? n : a, { isSameDay: c } = t;
	return {
		selected: s,
		select: (e, t, n) => {
			let a = e;
			return !r && s && s && c(e, s) && (a = void 0), i || o(a), i?.(a, e, t, n), a;
		},
		isSelected: (e) => s ? c(s, e) : !1
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/useSelection.js
function o_(e, t) {
	let n = a_(e, t), r = $g(e, t), i = i_(e, t);
	switch (e.mode) {
		case "single": return n;
		case "multiple": return r;
		case "range": return i;
		default: return;
	}
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/toTimeZone.js
function s_(e, t) {
	return e instanceof qm && e.timeZone === t ? e : new qm(e, t);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/convertMatchersToTimeZone.js
function c_(e, t, n) {
	if (!n) return s_(e, t);
	let r = s_(e, t), i = new qm(r.getFullYear(), r.getMonth(), r.getDate(), 12, 0, 0, t);
	return new Date(i.getTime());
}
function l_(e, t, n) {
	return typeof e == "boolean" || typeof e == "function" ? e : e instanceof Date ? c_(e, t, n) : Array.isArray(e) ? e.map((e) => e instanceof Date ? c_(e, t, n) : e) : Rh(e) ? {
		...e,
		from: e.from ? s_(e.from, t) : e.from,
		to: e.to ? s_(e.to, t) : e.to
	} : Lh(e) ? {
		before: c_(e.before, t, n),
		after: c_(e.after, t, n)
	} : zh(e) ? { after: c_(e.after, t, n) } : Bh(e) ? { before: c_(e.before, t, n) } : e;
}
function u_(e, t, n) {
	return e && (Array.isArray(e) ? e.map((e) => l_(e, t, n)) : l_(e, t, n));
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/DayPicker.js
function d_(e) {
	let n = e, r = n.timeZone;
	if (r && (n = {
		...e,
		timeZone: r
	}, n.today &&= s_(n.today, r), n.month &&= s_(n.month, r), n.defaultMonth &&= s_(n.defaultMonth, r), n.startMonth &&= s_(n.startMonth, r), n.endMonth &&= s_(n.endMonth, r), n.mode === "single" && n.selected ? n.selected = s_(n.selected, r) : n.mode === "multiple" && n.selected ? n.selected = n.selected?.map((e) => s_(e, r)) : n.mode === "range" && n.selected && (n.selected = {
		from: n.selected.from ? s_(n.selected.from, r) : n.selected.from,
		to: n.selected.to ? s_(n.selected.to, r) : n.selected.to
	}), n.disabled !== void 0 && (n.disabled = u_(n.disabled, r)), n.hidden !== void 0 && (n.hidden = u_(n.hidden, r)), n.modifiers)) {
		let e = {};
		Object.keys(n.modifiers).forEach((t) => {
			e[t] = u_(n.modifiers?.[t], r);
		}), n.modifiers = e;
	}
	let { components: i, formatters: o, labels: s, dateLib: c, locale: d, classNames: f } = l(() => {
		let e = {
			...$m,
			...n.locale
		}, t = n.broadcastCalendar ? 1 : n.weekStartsOn, r = n.noonSafe && n.timeZone ? Dg(n.timeZone, {
			weekStartsOn: t,
			locale: e
		}) : void 0, i = n.dateLib && r ? {
			...r,
			...n.dateLib
		} : n.dateLib ?? r, a = new eh({
			locale: e,
			weekStartsOn: t,
			firstWeekContainsDate: n.firstWeekContainsDate,
			useAdditionalWeekYearTokens: n.useAdditionalWeekYearTokens,
			useAdditionalDayOfYearTokens: n.useAdditionalDayOfYearTokens,
			timeZone: n.timeZone,
			numerals: n.numerals
		}, i);
		return {
			dateLib: a,
			components: Kh(n.components),
			formatters: ag(n.formatters),
			labels: Sg(n.labels, a.options),
			locale: e,
			classNames: {
				...Jh(),
				...n.classNames
			}
		};
	}, [
		n.locale,
		n.broadcastCalendar,
		n.weekStartsOn,
		n.firstWeekContainsDate,
		n.useAdditionalWeekYearTokens,
		n.useAdditionalDayOfYearTokens,
		n.timeZone,
		n.numerals,
		n.dateLib,
		n.noonSafe,
		n.components,
		n.formatters,
		n.labels,
		n.classNames
	]);
	n.today || (n = {
		...n,
		today: c.today()
	});
	let { captionLayout: p, mode: m, navLayout: h, numberOfMonths: g = 1, onDayBlur: _, onDayClick: v, onDayFocus: y, onDayKeyDown: b, onDayMouseEnter: x, onDayMouseLeave: S, onNextClick: C, onPrevClick: w, showWeekNumber: T, styles: E } = n, { formatCaption: D, formatDay: O, formatMonthDropdown: k, formatWeekNumber: A, formatWeekNumberHeader: j, formatWeekdayName: M, formatYearDropdown: N } = o, P = Kg(n, c), { days: F, months: I, navStart: L, navEnd: ee, previousMonth: te, nextMonth: R, goToMonth: ne } = P, re = Wh(F, n, L, ee, c), { isSelected: ie, select: ae, selected: oe } = o_(n, c) ?? {}, { blur: se, focused: ce, isFocusTarget: le, moveFocus: ue, setFocused: z } = Qg(n, P, re, ie ?? (() => !1), c), { labelDayButton: de, labelGridcell: fe, labelGrid: pe, labelMonthDropdown: me, labelNav: he, labelPrevious: ge, labelNext: _e, labelWeekday: ve, labelWeekNumber: ye, labelWeekNumberHeader: B, labelYearDropdown: be } = s, xe = l(() => Tg(c, n.ISOWeek, n.broadcastCalendar, n.today), [
		c,
		n.ISOWeek,
		n.broadcastCalendar,
		n.today
	]), Se = m !== void 0 || v !== void 0, Ce = a(() => {
		te && (ne(te), w?.(te));
	}, [
		te,
		ne,
		w
	]), we = a(() => {
		R && (ne(R), C?.(R));
	}, [
		ne,
		R,
		C
	]), Te = a((e, t) => (n) => {
		n.preventDefault(), n.stopPropagation(), z(e), !t.disabled && (ae?.(e.date, t, n), v?.(e.date, t, n));
	}, [
		ae,
		v,
		z
	]), Ee = a((e, t) => (n) => {
		z(e), y?.(e.date, t, n);
	}, [y, z]), V = a((e, t) => (n) => {
		se(), _?.(e.date, t, n);
	}, [se, _]), De = a((e, t) => (r) => {
		let i = {
			ArrowLeft: [r.shiftKey ? "month" : "day", n.dir === "rtl" ? "after" : "before"],
			ArrowRight: [r.shiftKey ? "month" : "day", n.dir === "rtl" ? "before" : "after"],
			ArrowDown: [r.shiftKey ? "year" : "week", "after"],
			ArrowUp: [r.shiftKey ? "year" : "week", "before"],
			PageUp: [r.shiftKey ? "year" : "month", "before"],
			PageDown: [r.shiftKey ? "year" : "month", "after"],
			Home: ["startOfWeek", "before"],
			End: ["endOfWeek", "after"]
		};
		if (i[r.key]) {
			r.preventDefault(), r.stopPropagation();
			let [e, t] = i[r.key];
			ue(e, t);
		}
		b?.(e.date, t, r);
	}, [
		ue,
		b,
		n.dir
	]), Oe = a((e, t) => (n) => {
		x?.(e.date, t, n);
	}, [x]), H = a((e, t) => (n) => {
		S?.(e.date, t, n);
	}, [S]), ke = a((e) => (t) => {
		let n = Number(t.target.value);
		ne(c.setMonth(c.startOfMonth(e), n));
	}, [c, ne]), Ae = a((e) => (t) => {
		let n = Number(t.target.value);
		ne(c.setYear(c.startOfMonth(e), n));
	}, [c, ne]), { className: je, style: Me } = l(() => ({
		className: [f[Z.Root], n.className].filter(Boolean).join(" "),
		style: {
			...E?.[Z.Root],
			...n.style
		}
	}), [
		f,
		n.className,
		n.style,
		E
	]), Ne = qh(n), Pe = u(null);
	Fg(Pe, !!n.animate, {
		classNames: f,
		months: I,
		focused: ce,
		dateLib: c
	});
	let Fe = {
		dayPickerProps: n,
		selected: oe,
		select: ae,
		isSelected: ie,
		months: I,
		nextMonth: R,
		previousMonth: te,
		goToMonth: ne,
		getModifiers: re,
		components: i,
		classNames: f,
		styles: E,
		labels: s,
		formatters: o
	};
	return t.createElement(yh.Provider, { value: Fe }, t.createElement(i.Root, {
		rootRef: n.animate ? Pe : void 0,
		className: je,
		style: Me,
		dir: n.dir,
		id: n.id,
		lang: n.lang ?? d.code,
		nonce: n.nonce,
		title: n.title,
		role: n.role,
		"aria-label": n["aria-label"],
		"aria-labelledby": n["aria-labelledby"],
		...Ne
	}, t.createElement(i.Months, {
		className: f[Z.Months],
		style: E?.[Z.Months]
	}, !n.hideNavigation && !h && t.createElement(i.Nav, {
		"data-animated-nav": n.animate ? "true" : void 0,
		className: f[Z.Nav],
		style: E?.[Z.Nav],
		"aria-label": he(),
		onPreviousClick: Ce,
		onNextClick: we,
		previousMonth: te,
		nextMonth: R
	}), I.map((e, r) => t.createElement(i.Month, {
		"data-animated-month": n.animate ? "true" : void 0,
		className: f[Z.Month],
		style: E?.[Z.Month],
		key: r,
		displayIndex: r,
		calendarMonth: e
	}, h === "around" && !n.hideNavigation && r === 0 && t.createElement(i.PreviousMonthButton, {
		type: "button",
		className: f[Z.PreviousMonthButton],
		tabIndex: te ? void 0 : -1,
		"aria-disabled": te ? void 0 : !0,
		"aria-label": ge(te),
		onClick: Ce,
		"data-animated-button": n.animate ? "true" : void 0
	}, t.createElement(i.Chevron, {
		disabled: te ? void 0 : !0,
		className: f[Z.Chevron],
		orientation: n.dir === "rtl" ? "right" : "left"
	})), t.createElement(i.MonthCaption, {
		"data-animated-caption": n.animate ? "true" : void 0,
		className: f[Z.MonthCaption],
		style: E?.[Z.MonthCaption],
		calendarMonth: e,
		displayIndex: r
	}, p?.startsWith("dropdown") ? t.createElement(i.DropdownNav, {
		className: f[Z.Dropdowns],
		style: E?.[Z.Dropdowns]
	}, (() => {
		let r = p === "dropdown" || p === "dropdown-months" ? t.createElement(i.MonthsDropdown, {
			key: "month",
			className: f[Z.MonthsDropdown],
			"aria-label": me(),
			classNames: f,
			components: i,
			disabled: !!n.disableNavigation,
			onChange: ke(e.date),
			options: Cg(e.date, L, ee, o, c),
			style: E?.[Z.Dropdown],
			value: c.getMonth(e.date)
		}) : t.createElement("span", { key: "month" }, k(e.date, c)), a = p === "dropdown" || p === "dropdown-years" ? t.createElement(i.YearsDropdown, {
			key: "year",
			className: f[Z.YearsDropdown],
			"aria-label": be(c.options),
			classNames: f,
			components: i,
			disabled: !!n.disableNavigation,
			onChange: Ae(e.date),
			options: Eg(L, ee, o, c, !!n.reverseYears),
			style: E?.[Z.Dropdown],
			value: c.getYear(e.date)
		}) : t.createElement("span", { key: "year" }, N(e.date, c));
		return c.getMonthYearOrder() === "year-first" ? [a, r] : [r, a];
	})(), t.createElement("span", {
		role: "status",
		"aria-live": "polite",
		style: {
			border: 0,
			clip: "rect(0 0 0 0)",
			height: "1px",
			margin: "-1px",
			overflow: "hidden",
			padding: 0,
			position: "absolute",
			width: "1px",
			whiteSpace: "nowrap",
			wordWrap: "normal"
		}
	}, D(e.date, c.options, c))) : t.createElement(i.CaptionLabel, {
		className: f[Z.CaptionLabel],
		role: "status",
		"aria-live": "polite"
	}, D(e.date, c.options, c))), h === "around" && !n.hideNavigation && r === g - 1 && t.createElement(i.NextMonthButton, {
		type: "button",
		className: f[Z.NextMonthButton],
		tabIndex: R ? void 0 : -1,
		"aria-disabled": R ? void 0 : !0,
		"aria-label": _e(R),
		onClick: we,
		"data-animated-button": n.animate ? "true" : void 0
	}, t.createElement(i.Chevron, {
		disabled: R ? void 0 : !0,
		className: f[Z.Chevron],
		orientation: n.dir === "rtl" ? "left" : "right"
	})), r === g - 1 && h === "after" && !n.hideNavigation && t.createElement(i.Nav, {
		"data-animated-nav": n.animate ? "true" : void 0,
		className: f[Z.Nav],
		style: E?.[Z.Nav],
		"aria-label": he(),
		onPreviousClick: Ce,
		onNextClick: we,
		previousMonth: te,
		nextMonth: R
	}), t.createElement(i.MonthGrid, {
		role: "grid",
		"aria-multiselectable": m === "multiple" || m === "range",
		"aria-label": pe(e.date, c.options, c) || void 0,
		className: f[Z.MonthGrid],
		style: E?.[Z.MonthGrid]
	}, !n.hideWeekdays && t.createElement(i.Weekdays, {
		"data-animated-weekdays": n.animate ? "true" : void 0,
		className: f[Z.Weekdays],
		style: E?.[Z.Weekdays]
	}, T && t.createElement(i.WeekNumberHeader, {
		"aria-label": B(c.options),
		className: f[Z.WeekNumberHeader],
		style: E?.[Z.WeekNumberHeader],
		scope: "col"
	}, j()), xe.map((e) => t.createElement(i.Weekday, {
		"aria-label": ve(e, c.options, c),
		className: f[Z.Weekday],
		key: String(e),
		style: E?.[Z.Weekday],
		scope: "col"
	}, M(e, c.options, c)))), t.createElement(i.Weeks, {
		"data-animated-weeks": n.animate ? "true" : void 0,
		className: f[Z.Weeks],
		style: E?.[Z.Weeks]
	}, e.weeks.map((e) => t.createElement(i.Week, {
		className: f[Z.Week],
		key: e.weekNumber,
		style: E?.[Z.Week],
		week: e
	}, T && t.createElement(i.WeekNumber, {
		week: e,
		style: E?.[Z.WeekNumber],
		"aria-label": ye(e.weekNumber, { locale: d }),
		className: f[Z.WeekNumber],
		scope: "row",
		role: "rowheader"
	}, A(e.weekNumber, c)), e.days.map((e) => {
		let { date: r } = e, a = re(e);
		if (a[Q.focused] = !a.hidden && !!ce?.isEqualTo(e), a[uh.selected] = ie?.(r) || a.selected, Rh(oe)) {
			let { from: e, to: t } = oe;
			a[uh.range_start] = !!(e && t && c.isSameDay(r, e)), a[uh.range_end] = !!(e && t && c.isSameDay(r, t)), a[uh.range_middle] = Ih(oe, r, !0, c);
		}
		let o = wg(a, E, n.modifiersStyles), s = Gh(a, f, n.modifiersClassNames), l = !Se && !a.hidden ? fe(r, a, c.options, c) : void 0;
		return t.createElement(i.Day, {
			key: `${e.isoDate}_${e.displayMonthId}`,
			day: e,
			modifiers: a,
			className: s.join(" "),
			style: o,
			role: "gridcell",
			"aria-selected": a.selected || void 0,
			"aria-label": l,
			"data-day": e.isoDate,
			"data-month": e.outside ? e.dateMonthId : void 0,
			"data-selected": a.selected || void 0,
			"data-disabled": a.disabled || void 0,
			"data-hidden": a.hidden || void 0,
			"data-outside": e.outside || void 0,
			"data-focused": a.focused || void 0,
			"data-today": a.today || void 0
		}, !a.hidden && Se ? t.createElement(i.DayButton, {
			className: f[Z.DayButton],
			style: E?.[Z.DayButton],
			type: "button",
			day: e,
			modifiers: a,
			disabled: !a.focused && a.disabled || void 0,
			"aria-disabled": a.focused && a.disabled || void 0,
			tabIndex: le(e) ? 0 : -1,
			"aria-label": de(r, a, c.options, c),
			onClick: Te(e, a),
			onBlur: V(e, a),
			onFocus: Ee(e, a),
			onKeyDown: De(e, a),
			onMouseEnter: Oe(e, a),
			onMouseLeave: H(e, a)
		}, O(r, c.options, c)) : !a.hidden && O(e.date, c.options, c));
	})))))))), n.footer && t.createElement(i.Footer, {
		className: f[Z.Footer],
		style: E?.[Z.Footer],
		role: "status",
		"aria-live": "polite"
	}, n.footer)));
}
var f_ = {
	content: "_content_1g7q0_1",
	popoverShow: "_popoverShow_1g7q0_1",
	popoverHide: "_popoverHide_1g7q0_1"
}, p_ = {
	months: "_months_1iyo0_1",
	month: "_month_1iyo0_1",
	caption: "_caption_1iyo0_37",
	caption_label: "_caption_label_1iyo0_53",
	nav: "_nav_1iyo0_67",
	table: "_table_1iyo0_79",
	head_cell: "_head_cell_1iyo0_89",
	cell: "_cell_1iyo0_107",
	day: "_day_1iyo0_121",
	day_selected: "_day_selected_1iyo0_157",
	day_today: "_day_today_1iyo0_169",
	day_outside: "_day_outside_1iyo0_181",
	day_range_middle: "_day_range_middle_1iyo0_189",
	day_range_start: "_day_range_start_1iyo0_201",
	day_range_end: "_day_range_end_1iyo0_209"
}, m_ = {
	wrapper: "_wrapper_8srvt_2",
	label: "_label_8srvt_11",
	triggerBtn: "_triggerBtn_8srvt_18",
	triggerBtnEmpty: "_triggerBtnEmpty_8srvt_31",
	calendarIcon: "_calendarIcon_8srvt_36",
	popoverContent: "_popoverContent_8srvt_43",
	errorMessage: "_errorMessage_8srvt_49"
}, h_ = vc, g_ = yc, __ = e.forwardRef(({ className: e, align: t = "center", sideOffset: n = 4, ...r }, i) => /* @__PURE__ */ p(bc, { children: /* @__PURE__ */ p(xc, {
	ref: i,
	align: t,
	sideOffset: n,
	className: x(f_.content, e),
	...r
}) }));
function v_({ className: e, classNames: t, showOutsideDays: n = !0, ...r }) {
	return /* @__PURE__ */ p(d_, {
		locale: Fm,
		showOutsideDays: n,
		className: x(e),
		classNames: {
			months: p_.months,
			month: p_.month,
			caption: p_.caption,
			caption_label: p_.caption_label,
			nav: p_.nav,
			table: p_.table,
			head_cell: p_.head_cell,
			cell: p_.cell,
			day: p_.day,
			day_selected: p_.day_selected,
			day_today: p_.day_today,
			day_outside: p_.day_outside,
			day_range_middle: p_.day_range_middle,
			day_range_start: p_.day_range_start,
			day_range_end: p_.day_range_end,
			...t
		},
		components: { Chevron: ({ orientation: e }) => /* @__PURE__ */ p(e === "left" ? re : ie, {
			size: 16,
			className: be({
				variant: "ghost",
				size: "sm"
			})
		}) },
		...r
	});
}
var y_ = e.forwardRef(({ date: t, onSelect: n, label: r, error: i, placeholder: a = "Selecione uma data", className: o, id: s }, c) => {
	let l = !!i, [u, d] = e.useState(!1), f = s || `datepicker-${r?.replace(/\s+/g, "-").toLowerCase()}`;
	return /* @__PURE__ */ m("div", {
		className: x(m_.wrapper, o),
		children: [
			r && /* @__PURE__ */ p("label", {
				htmlFor: f,
				className: m_.label,
				children: r
			}),
			/* @__PURE__ */ m(h_, {
				open: u,
				onOpenChange: d,
				children: [/* @__PURE__ */ p(g_, {
					asChild: !0,
					children: /* @__PURE__ */ m("button", {
						id: f,
						ref: c,
						type: "button",
						className: x(Ce({
							hasError: l,
							hasIcon: !1
						}), m_.triggerBtn, !t && m_.triggerBtnEmpty),
						children: [/* @__PURE__ */ p(te, {
							className: m_.calendarIcon,
							size: 16
						}), t ? bm(t, "PPP", { locale: Fm }) : /* @__PURE__ */ p("span", { children: a })]
					})
				}), /* @__PURE__ */ p(__, {
					className: m_.popoverContent,
					children: /* @__PURE__ */ p(v_, {
						mode: "single",
						selected: t,
						onSelect: (e) => {
							n?.(e), d(!1);
						},
						initialFocus: !0
					})
				})]
			}),
			i && /* @__PURE__ */ p("span", {
				className: m_.errorMessage,
				children: i
			})
		]
	});
});
y_.displayName = "DatePicker";
var b_ = {
	container: "_container_1mqdk_1",
	label: "_label_1mqdk_19",
	trigger: "_trigger_1mqdk_31",
	triggerActive: "_triggerActive_1mqdk_65",
	triggerError: "_triggerError_1mqdk_75",
	placeholder: "_placeholder_1mqdk_83",
	icon: "_icon_1mqdk_91",
	iconOpen: "_iconOpen_1mqdk_101",
	dropdown: "_dropdown_1mqdk_109",
	slideDown: "_slideDown_1mqdk_1",
	option: "_option_1mqdk_141",
	optionSelected: "_optionSelected_1mqdk_173",
	checkIcon: "_checkIcon_1mqdk_185",
	errorMessage: "_errorMessage_1mqdk_193"
}, x_ = ({ options: e, value: t, onChange: n, label: r, error: i, placeholder: a = "Selecione...", className: o }) => {
	let [l, f] = d(!1), [h, _] = d({
		top: 0,
		left: 0,
		width: 0
	}), v = u(null), y = u(null), b = e.find((e) => e.value === t), S = (e, t) => {
		t.preventDefault(), t.stopPropagation(), n && n(e.value), setTimeout(() => {
			f(!1);
		}, 0);
	};
	return c(() => {
		if (l && y.current) {
			let e = y.current.getBoundingClientRect();
			_({
				top: e.bottom + window.scrollY,
				left: e.left + window.scrollX,
				width: e.width
			});
		}
	}, [l]), s(() => {
		let e = (e) => {
			y.current?.contains(e.target) || document.getElementById("avere-select-portal")?.contains(e.target) || f(!1);
		};
		return l && document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [l]), /* @__PURE__ */ m("div", {
		className: x(b_.container, o),
		ref: v,
		children: [
			r && /* @__PURE__ */ p("label", {
				className: b_.label,
				children: r
			}),
			/* @__PURE__ */ m("div", {
				ref: y,
				className: x(b_.trigger, l && b_.triggerActive, i && b_.triggerError),
				onClick: (e) => {
					e.stopPropagation(), f(!l);
				},
				children: [/* @__PURE__ */ p("span", {
					className: x(!b && b_.placeholder),
					children: b ? b.label : a
				}), /* @__PURE__ */ p(ne, {
					size: 18,
					className: x(b_.icon, l && b_.iconOpen)
				})]
			}),
			l && g.createPortal(/* @__PURE__ */ p("div", {
				id: "avere-select-portal",
				className: b_.dropdown,
				style: {
					position: "absolute",
					top: `${h.top}px`,
					left: `${h.left}px`,
					width: `${h.width}px`,
					zIndex: 99999,
					fontFamily: "Montserrat, sans-serif"
				},
				children: e.map((e) => /* @__PURE__ */ m("div", {
					className: x(b_.option, t === e.value && b_.optionSelected),
					onMouseDown: (t) => S(e, t),
					children: [/* @__PURE__ */ p("span", {
						style: { pointerEvents: "none" },
						children: e.label
					}), t === e.value && /* @__PURE__ */ p(R, {
						size: 16,
						className: b_.checkIcon
					})]
				}, e.value))
			}), document.body),
			i && /* @__PURE__ */ p("span", {
				className: b_.errorMessage,
				children: i
			})
		]
	});
}, [S_, C_] = Ae("Tooltip", [ao]), w_ = ao(), T_ = "TooltipProvider", E_ = 700, D_ = "tooltip.open", [O_, k_] = S_(T_), A_ = (t) => {
	let { __scopeTooltip: n, delayDuration: r = E_, skipDelayDuration: i = 300, disableHoverableContent: a = !1, children: o } = t, s = e.useRef(!0), c = e.useRef(!1), l = e.useRef(0);
	return e.useEffect(() => {
		let e = l.current;
		return () => window.clearTimeout(e);
	}, []), /* @__PURE__ */ p(O_, {
		scope: n,
		isOpenDelayedRef: s,
		delayDuration: r,
		onOpen: e.useCallback(() => {
			window.clearTimeout(l.current), s.current = !1;
		}, []),
		onClose: e.useCallback(() => {
			window.clearTimeout(l.current), l.current = window.setTimeout(() => s.current = !0, i);
		}, [i]),
		isPointerInTransitRef: c,
		onPointerInTransitChange: e.useCallback((e) => {
			c.current = e;
		}, []),
		disableHoverableContent: a,
		children: o
	});
};
A_.displayName = T_;
var j_ = "Tooltip", [M_, N_] = S_(j_), P_ = (t) => {
	let { __scopeTooltip: n, children: r, open: i, defaultOpen: a, onOpenChange: o, disableHoverableContent: s, delayDuration: c } = t, l = k_(j_, t.__scopeTooltip), u = w_(n), [d, f] = e.useState(null), m = We(), h = e.useRef(0), g = s ?? l.disableHoverableContent, _ = c ?? l.delayDuration, v = e.useRef(!1), [y, b] = qe({
		prop: i,
		defaultProp: a ?? !1,
		onChange: (e) => {
			e ? (l.onOpen(), document.dispatchEvent(new CustomEvent(D_))) : l.onClose(), o?.(e);
		},
		caller: j_
	}), x = e.useMemo(() => y ? v.current ? "delayed-open" : "instant-open" : "closed", [y]), S = e.useCallback(() => {
		window.clearTimeout(h.current), h.current = 0, v.current = !1, b(!0);
	}, [b]), C = e.useCallback(() => {
		window.clearTimeout(h.current), h.current = 0, b(!1);
	}, [b]), w = e.useCallback(() => {
		window.clearTimeout(h.current), h.current = window.setTimeout(() => {
			v.current = !0, b(!0), h.current = 0;
		}, _);
	}, [_, b]);
	return e.useEffect(() => () => {
		h.current &&= (window.clearTimeout(h.current), 0);
	}, []), /* @__PURE__ */ p(So, {
		...u,
		children: /* @__PURE__ */ p(M_, {
			scope: n,
			contentId: m,
			open: y,
			stateAttribute: x,
			trigger: d,
			onTriggerChange: f,
			onTriggerEnter: e.useCallback(() => {
				l.isOpenDelayedRef.current ? w() : S();
			}, [
				l.isOpenDelayedRef,
				w,
				S
			]),
			onTriggerLeave: e.useCallback(() => {
				g ? C() : (window.clearTimeout(h.current), h.current = 0);
			}, [C, g]),
			onOpen: S,
			onClose: C,
			disableHoverableContent: g,
			children: r
		})
	});
};
P_.displayName = j_;
var F_ = "TooltipTrigger", I_ = e.forwardRef((t, n) => {
	let { __scopeTooltip: r, ...i } = t, a = N_(F_, r), o = k_(F_, r), s = w_(r), c = H(n, e.useRef(null), a.onTriggerChange), l = e.useRef(!1), u = e.useRef(!1), d = e.useCallback(() => l.current = !1, []);
	return e.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), /* @__PURE__ */ p(Co, {
		asChild: !0,
		...s,
		children: /* @__PURE__ */ p(U.button, {
			"aria-describedby": a.open ? a.contentId : void 0,
			"data-state": a.stateAttribute,
			...i,
			ref: c,
			onPointerMove: V(t.onPointerMove, (e) => {
				e.pointerType !== "touch" && !u.current && !o.isPointerInTransitRef.current && (a.onTriggerEnter(), u.current = !0);
			}),
			onPointerLeave: V(t.onPointerLeave, () => {
				a.onTriggerLeave(), u.current = !1;
			}),
			onPointerDown: V(t.onPointerDown, () => {
				a.open && a.onClose(), l.current = !0, document.addEventListener("pointerup", d, { once: !0 });
			}),
			onFocus: V(t.onFocus, () => {
				l.current || a.onOpen();
			}),
			onBlur: V(t.onBlur, a.onClose),
			onClick: V(t.onClick, a.onClose)
		})
	});
});
I_.displayName = F_;
var L_ = "TooltipPortal", [R_, z_] = S_(L_, { forceMount: void 0 }), B_ = (e) => {
	let { __scopeTooltip: t, forceMount: n, children: r, container: i } = e, a = N_(L_, t);
	return /* @__PURE__ */ p(R_, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ p(St, {
			present: n || a.open,
			children: /* @__PURE__ */ p(Do, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
};
B_.displayName = L_;
var V_ = "TooltipContent", H_ = e.forwardRef((e, t) => {
	let n = z_(V_, e.__scopeTooltip), { forceMount: r = n.forceMount, side: i = "top", ...a } = e, o = N_(V_, e.__scopeTooltip);
	return /* @__PURE__ */ p(St, {
		present: r || o.open,
		children: o.disableHoverableContent ? /* @__PURE__ */ p(q_, {
			side: i,
			...a,
			ref: t
		}) : /* @__PURE__ */ p(U_, {
			side: i,
			...a,
			ref: t
		})
	});
}), U_ = e.forwardRef((t, n) => {
	let r = N_(V_, t.__scopeTooltip), i = k_(V_, t.__scopeTooltip), a = e.useRef(null), o = H(n, a), [s, c] = e.useState(null), { trigger: l, onClose: u } = r, d = a.current, { onPointerInTransitChange: f } = i, m = e.useCallback(() => {
		c(null), f(!1);
	}, [f]), h = e.useCallback((e, t) => {
		let n = e.currentTarget, r = {
			x: e.clientX,
			y: e.clientY
		}, i = Z_(r, X_(r, n.getBoundingClientRect())), a = Q_(t.getBoundingClientRect());
		c(ev([...i, ...a])), f(!0);
	}, [f]);
	return e.useEffect(() => () => m(), [m]), e.useEffect(() => {
		if (l && d) {
			let e = (e) => h(e, d), t = (e) => h(e, l);
			return l.addEventListener("pointerleave", e), d.addEventListener("pointerleave", t), () => {
				l.removeEventListener("pointerleave", e), d.removeEventListener("pointerleave", t);
			};
		}
	}, [
		l,
		d,
		h,
		m
	]), e.useEffect(() => {
		if (s) {
			let e = (e) => {
				let t = e.target, n = {
					x: e.clientX,
					y: e.clientY
				}, r = l?.contains(t) || d?.contains(t), i = !$_(n, s);
				r ? m() : i && (m(), u());
			};
			return document.addEventListener("pointermove", e), () => document.removeEventListener("pointermove", e);
		}
	}, [
		l,
		d,
		s,
		u,
		m
	]), /* @__PURE__ */ p(q_, {
		...t,
		ref: o
	});
}), [W_, G_] = S_(j_, { isInside: !1 }), K_ = /* @__PURE__ */ Fe("TooltipContent"), q_ = e.forwardRef((t, n) => {
	let { __scopeTooltip: r, children: i, "aria-label": a, onEscapeKeyDown: o, onPointerDownOutside: s, ...c } = t, l = N_(V_, r), u = w_(r), { onClose: d } = l;
	return e.useEffect(() => (document.addEventListener(D_, d), () => document.removeEventListener(D_, d)), [d]), e.useEffect(() => {
		if (l.trigger) {
			let e = (e) => {
				e.target?.contains(l.trigger) && d();
			};
			return window.addEventListener("scroll", e, { capture: !0 }), () => window.removeEventListener("scroll", e, { capture: !0 });
		}
	}, [l.trigger, d]), /* @__PURE__ */ p(gr, {
		asChild: !0,
		disableOutsidePointerEvents: !1,
		onEscapeKeyDown: o,
		onPointerDownOutside: s,
		onFocusOutside: (e) => e.preventDefault(),
		onDismiss: d,
		children: /* @__PURE__ */ m(wo, {
			"data-state": l.stateAttribute,
			...u,
			...c,
			ref: n,
			style: {
				...c.style,
				"--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
				"--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
				"--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
				"--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
				"--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
			},
			children: [/* @__PURE__ */ p(K_, { children: i }), /* @__PURE__ */ p(W_, {
				scope: r,
				isInside: !0,
				children: /* @__PURE__ */ p(kc, {
					id: l.contentId,
					role: "tooltip",
					children: a || i
				})
			})]
		})
	});
});
H_.displayName = V_;
var J_ = "TooltipArrow", Y_ = e.forwardRef((e, t) => {
	let { __scopeTooltip: n, ...r } = e, i = w_(n);
	return G_(J_, n).isInside ? null : /* @__PURE__ */ p(To, {
		...i,
		...r,
		ref: t
	});
});
Y_.displayName = J_;
function X_(e, t) {
	let n = Math.abs(t.top - e.y), r = Math.abs(t.bottom - e.y), i = Math.abs(t.right - e.x), a = Math.abs(t.left - e.x);
	switch (Math.min(n, r, i, a)) {
		case a: return "left";
		case i: return "right";
		case n: return "top";
		case r: return "bottom";
		default: throw Error("unreachable");
	}
}
function Z_(e, t, n = 5) {
	let r = [];
	switch (t) {
		case "top":
			r.push({
				x: e.x - n,
				y: e.y + n
			}, {
				x: e.x + n,
				y: e.y + n
			});
			break;
		case "bottom":
			r.push({
				x: e.x - n,
				y: e.y - n
			}, {
				x: e.x + n,
				y: e.y - n
			});
			break;
		case "left":
			r.push({
				x: e.x + n,
				y: e.y - n
			}, {
				x: e.x + n,
				y: e.y + n
			});
			break;
		case "right":
			r.push({
				x: e.x - n,
				y: e.y - n
			}, {
				x: e.x - n,
				y: e.y + n
			});
			break;
	}
	return r;
}
function Q_(e) {
	let { top: t, right: n, bottom: r, left: i } = e;
	return [
		{
			x: i,
			y: t
		},
		{
			x: n,
			y: t
		},
		{
			x: n,
			y: r
		},
		{
			x: i,
			y: r
		}
	];
}
function $_(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e], s = t[a], c = o.x, l = o.y, u = s.x, d = s.y;
		l > r != d > r && n < (u - c) * (r - l) / (d - l) + c && (i = !i);
	}
	return i;
}
function ev(e) {
	let t = e.slice();
	return t.sort((e, t) => e.x < t.x ? -1 : e.x > t.x ? 1 : e.y < t.y ? -1 : e.y > t.y ? 1 : 0), tv(t);
}
function tv(e) {
	if (e.length <= 1) return e.slice();
	let t = [];
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (; t.length >= 2;) {
			let e = t[t.length - 1], n = t[t.length - 2];
			if ((e.x - n.x) * (r.y - n.y) >= (e.y - n.y) * (r.x - n.x)) t.pop();
			else break;
		}
		t.push(r);
	}
	t.pop();
	let n = [];
	for (let t = e.length - 1; t >= 0; t--) {
		let r = e[t];
		for (; n.length >= 2;) {
			let e = n[n.length - 1], t = n[n.length - 2];
			if ((e.x - t.x) * (r.y - t.y) >= (e.y - t.y) * (r.x - t.x)) n.pop();
			else break;
		}
		n.push(r);
	}
	return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
var nv = A_, rv = P_, iv = I_, av = H_, ov = {
	content: "_content_phmwu_1",
	"tooltip-show": "_tooltip-show_phmwu_1",
	"tooltip-hide": "_tooltip-hide_phmwu_1",
	"slide-up": "_slide-up_phmwu_1",
	"slide-down": "_slide-down_phmwu_1",
	"slide-left": "_slide-left_phmwu_1",
	"slide-right": "_slide-right_phmwu_1"
}, sv = nv, cv = rv, lv = iv, uv = e.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ p(av, {
	ref: r,
	sideOffset: t,
	className: x(ov.content, e),
	...n
}));
uv.displayName = av.displayName;
//#endregion
//#region node_modules/sonner/dist/index.mjs
function dv(e) {
	if (!e || typeof document > "u") return;
	let t = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
	n.type = "text/css", t.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e));
}
var fv = (e) => {
	switch (e) {
		case "success": return hv;
		case "info": return _v;
		case "warning": return gv;
		case "error": return vv;
		default: return null;
	}
}, pv = Array(12).fill(0), mv = ({ visible: e, className: n }) => /* @__PURE__ */ t.createElement("div", {
	className: ["sonner-loading-wrapper", n].filter(Boolean).join(" "),
	"data-visible": e
}, /* @__PURE__ */ t.createElement("div", { className: "sonner-spinner" }, pv.map((e, n) => /* @__PURE__ */ t.createElement("div", {
	className: "sonner-loading-bar",
	key: `spinner-bar-${n}`
})))), hv = /* @__PURE__ */ t.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20"
}, /* @__PURE__ */ t.createElement("path", {
	fillRule: "evenodd",
	d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
	clipRule: "evenodd"
})), gv = /* @__PURE__ */ t.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "currentColor",
	height: "20",
	width: "20"
}, /* @__PURE__ */ t.createElement("path", {
	fillRule: "evenodd",
	d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
	clipRule: "evenodd"
})), _v = /* @__PURE__ */ t.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20"
}, /* @__PURE__ */ t.createElement("path", {
	fillRule: "evenodd",
	d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
	clipRule: "evenodd"
})), vv = /* @__PURE__ */ t.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20"
}, /* @__PURE__ */ t.createElement("path", {
	fillRule: "evenodd",
	d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
	clipRule: "evenodd"
})), yv = /* @__PURE__ */ t.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	width: "12",
	height: "12",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.5",
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, /* @__PURE__ */ t.createElement("line", {
	x1: "18",
	y1: "6",
	x2: "6",
	y2: "18"
}), /* @__PURE__ */ t.createElement("line", {
	x1: "6",
	y1: "6",
	x2: "18",
	y2: "18"
})), bv = () => {
	let [e, n] = t.useState(document.hidden);
	return t.useEffect(() => {
		let e = () => {
			n(document.hidden);
		};
		return document.addEventListener("visibilitychange", e), () => window.removeEventListener("visibilitychange", e);
	}, []), e;
}, xv = 1, Sv = new class {
	constructor() {
		this.subscribe = (e) => (this.subscribers.push(e), () => {
			let t = this.subscribers.indexOf(e);
			this.subscribers.splice(t, 1);
		}), this.publish = (e) => {
			this.subscribers.forEach((t) => t(e));
		}, this.addToast = (e) => {
			this.publish(e), this.toasts = [...this.toasts, e];
		}, this.create = (e) => {
			let { message: t, ...n } = e, r = typeof e?.id == "number" || e.id?.length > 0 ? e.id : xv++, i = this.toasts.find((e) => e.id === r), a = e.dismissible === void 0 ? !0 : e.dismissible;
			return this.dismissedToasts.has(r) && this.dismissedToasts.delete(r), i ? this.toasts = this.toasts.map((n) => n.id === r ? (this.publish({
				...n,
				...e,
				id: r,
				title: t
			}), {
				...n,
				...e,
				id: r,
				dismissible: a,
				title: t
			}) : n) : this.addToast({
				title: t,
				...n,
				dismissible: a,
				id: r
			}), r;
		}, this.dismiss = (e) => (e ? (this.dismissedToasts.add(e), requestAnimationFrame(() => this.subscribers.forEach((t) => t({
			id: e,
			dismiss: !0
		})))) : this.toasts.forEach((e) => {
			this.subscribers.forEach((t) => t({
				id: e.id,
				dismiss: !0
			}));
		}), e), this.message = (e, t) => this.create({
			...t,
			message: e
		}), this.error = (e, t) => this.create({
			...t,
			message: e,
			type: "error"
		}), this.success = (e, t) => this.create({
			...t,
			type: "success",
			message: e
		}), this.info = (e, t) => this.create({
			...t,
			type: "info",
			message: e
		}), this.warning = (e, t) => this.create({
			...t,
			type: "warning",
			message: e
		}), this.loading = (e, t) => this.create({
			...t,
			type: "loading",
			message: e
		}), this.promise = (e, n) => {
			if (!n) return;
			let r;
			n.loading !== void 0 && (r = this.create({
				...n,
				promise: e,
				type: "loading",
				message: n.loading,
				description: typeof n.description == "function" ? void 0 : n.description
			}));
			let i = Promise.resolve(e instanceof Function ? e() : e), a = r !== void 0, o, s = i.then(async (e) => {
				if (o = ["resolve", e], t.isValidElement(e)) a = !1, this.create({
					id: r,
					type: "default",
					message: e
				});
				else if (wv(e) && !e.ok) {
					a = !1;
					let i = typeof n.error == "function" ? await n.error(`HTTP error! status: ${e.status}`) : n.error, o = typeof n.description == "function" ? await n.description(`HTTP error! status: ${e.status}`) : n.description, s = typeof i == "object" && !t.isValidElement(i) ? i : { message: i };
					this.create({
						id: r,
						type: "error",
						description: o,
						...s
					});
				} else if (e instanceof Error) {
					a = !1;
					let i = typeof n.error == "function" ? await n.error(e) : n.error, o = typeof n.description == "function" ? await n.description(e) : n.description, s = typeof i == "object" && !t.isValidElement(i) ? i : { message: i };
					this.create({
						id: r,
						type: "error",
						description: o,
						...s
					});
				} else if (n.success !== void 0) {
					a = !1;
					let i = typeof n.success == "function" ? await n.success(e) : n.success, o = typeof n.description == "function" ? await n.description(e) : n.description, s = typeof i == "object" && !t.isValidElement(i) ? i : { message: i };
					this.create({
						id: r,
						type: "success",
						description: o,
						...s
					});
				}
			}).catch(async (e) => {
				if (o = ["reject", e], n.error !== void 0) {
					a = !1;
					let i = typeof n.error == "function" ? await n.error(e) : n.error, o = typeof n.description == "function" ? await n.description(e) : n.description, s = typeof i == "object" && !t.isValidElement(i) ? i : { message: i };
					this.create({
						id: r,
						type: "error",
						description: o,
						...s
					});
				}
			}).finally(() => {
				a && (this.dismiss(r), r = void 0), n.finally == null || n.finally.call(n);
			}), c = () => new Promise((e, t) => s.then(() => o[0] === "reject" ? t(o[1]) : e(o[1])).catch(t));
			return typeof r != "string" && typeof r != "number" ? { unwrap: c } : Object.assign(r, { unwrap: c });
		}, this.custom = (e, t) => {
			let n = t?.id || xv++;
			return this.create({
				jsx: e(n),
				id: n,
				...t
			}), n;
		}, this.getActiveToasts = () => this.toasts.filter((e) => !this.dismissedToasts.has(e.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
	}
}(), Cv = (e, t) => {
	let n = t?.id || xv++;
	return Sv.addToast({
		title: e,
		...t,
		id: n
	}), n;
}, wv = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", Tv = Cv, Ev = Object.assign(Tv, {
	success: Sv.success,
	info: Sv.info,
	warning: Sv.warning,
	error: Sv.error,
	custom: Sv.custom,
	message: Sv.message,
	promise: Sv.promise,
	dismiss: Sv.dismiss,
	loading: Sv.loading
}, {
	getHistory: () => Sv.toasts,
	getToasts: () => Sv.getActiveToasts()
});
dv("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Dv(e) {
	return e.label !== void 0;
}
var Ov = 3, kv = "24px", Av = "16px", jv = 4e3, Mv = 356, Nv = 14, Pv = 45, Fv = 200;
function Iv(...e) {
	return e.filter(Boolean).join(" ");
}
function Lv(e) {
	let [t, n] = e.split("-"), r = [];
	return t && r.push(t), n && r.push(n), r;
}
var Rv = (e) => {
	let { invert: n, toast: r, unstyled: i, interacting: a, setHeights: o, visibleToasts: s, heights: c, index: l, toasts: u, expanded: d, removeToast: f, defaultRichColors: p, closeButton: m, style: h, cancelButtonStyle: g, actionButtonStyle: _, className: v = "", descriptionClassName: y = "", duration: b, position: x, gap: S, expandByDefault: C, classNames: w, icons: T, closeButtonAriaLabel: E = "Close toast" } = e, [D, O] = t.useState(null), [k, A] = t.useState(null), [j, M] = t.useState(!1), [N, P] = t.useState(!1), [F, I] = t.useState(!1), [L, ee] = t.useState(!1), [te, R] = t.useState(!1), [ne, re] = t.useState(0), [ie, ae] = t.useState(0), oe = t.useRef(r.duration || b || jv), se = t.useRef(null), ce = t.useRef(null), le = l === 0, ue = l + 1 <= s, z = r.type, de = r.dismissible !== !1, fe = r.className || "", pe = r.descriptionClassName || "", me = t.useMemo(() => c.findIndex((e) => e.toastId === r.id) || 0, [c, r.id]), he = t.useMemo(() => r.closeButton ?? m, [r.closeButton, m]), ge = t.useMemo(() => r.duration || b || jv, [r.duration, b]), _e = t.useRef(0), ve = t.useRef(0), ye = t.useRef(0), B = t.useRef(null), [be, xe] = x.split("-"), Se = t.useMemo(() => c.reduce((e, t, n) => n >= me ? e : e + t.height, 0), [c, me]), Ce = bv(), we = r.invert || n, Te = z === "loading";
	ve.current = t.useMemo(() => me * S + Se, [me, Se]), t.useEffect(() => {
		oe.current = ge;
	}, [ge]), t.useEffect(() => {
		M(!0);
	}, []), t.useEffect(() => {
		let e = ce.current;
		if (e) {
			let t = e.getBoundingClientRect().height;
			return ae(t), o((e) => [{
				toastId: r.id,
				height: t,
				position: r.position
			}, ...e]), () => o((e) => e.filter((e) => e.toastId !== r.id));
		}
	}, [o, r.id]), t.useLayoutEffect(() => {
		if (!j) return;
		let e = ce.current, t = e.style.height;
		e.style.height = "auto";
		let n = e.getBoundingClientRect().height;
		e.style.height = t, ae(n), o((e) => e.find((e) => e.toastId === r.id) ? e.map((e) => e.toastId === r.id ? {
			...e,
			height: n
		} : e) : [{
			toastId: r.id,
			height: n,
			position: r.position
		}, ...e]);
	}, [
		j,
		r.title,
		r.description,
		o,
		r.id,
		r.jsx,
		r.action,
		r.cancel
	]);
	let Ee = t.useCallback(() => {
		P(!0), re(ve.current), o((e) => e.filter((e) => e.toastId !== r.id)), setTimeout(() => {
			f(r);
		}, Fv);
	}, [
		r,
		f,
		o,
		ve
	]);
	t.useEffect(() => {
		if (r.promise && z === "loading" || r.duration === Infinity || r.type === "loading") return;
		let e;
		return d || a || Ce ? (() => {
			if (ye.current < _e.current) {
				let e = (/* @__PURE__ */ new Date()).getTime() - _e.current;
				oe.current -= e;
			}
			ye.current = (/* @__PURE__ */ new Date()).getTime();
		})() : oe.current !== Infinity && (_e.current = (/* @__PURE__ */ new Date()).getTime(), e = setTimeout(() => {
			r.onAutoClose == null || r.onAutoClose.call(r, r), Ee();
		}, oe.current)), () => clearTimeout(e);
	}, [
		d,
		a,
		r,
		z,
		Ce,
		Ee
	]), t.useEffect(() => {
		r.delete && (Ee(), r.onDismiss == null || r.onDismiss.call(r, r));
	}, [Ee, r.delete]);
	function V() {
		return T?.loading ? /* @__PURE__ */ t.createElement("div", {
			className: Iv(w?.loader, r?.classNames?.loader, "sonner-loader"),
			"data-visible": z === "loading"
		}, T.loading) : /* @__PURE__ */ t.createElement(mv, {
			className: Iv(w?.loader, r?.classNames?.loader),
			visible: z === "loading"
		});
	}
	let De = r.icon || T?.[z] || fv(z);
	return /* @__PURE__ */ t.createElement("li", {
		tabIndex: 0,
		ref: ce,
		className: Iv(v, fe, w?.toast, r?.classNames?.toast, w?.default, w?.[z], r?.classNames?.[z]),
		"data-sonner-toast": "",
		"data-rich-colors": r.richColors ?? p,
		"data-styled": !(r.jsx || r.unstyled || i),
		"data-mounted": j,
		"data-promise": !!r.promise,
		"data-swiped": te,
		"data-removed": N,
		"data-visible": ue,
		"data-y-position": be,
		"data-x-position": xe,
		"data-index": l,
		"data-front": le,
		"data-swiping": F,
		"data-dismissible": de,
		"data-type": z,
		"data-invert": we,
		"data-swipe-out": L,
		"data-swipe-direction": k,
		"data-expanded": !!(d || C && j),
		"data-testid": r.testId,
		style: {
			"--index": l,
			"--toasts-before": l,
			"--z-index": u.length - l,
			"--offset": `${N ? ne : ve.current}px`,
			"--initial-height": C ? "auto" : `${ie}px`,
			...h,
			...r.style
		},
		onDragEnd: () => {
			I(!1), O(null), B.current = null;
		},
		onPointerDown: (e) => {
			e.button !== 2 && (Te || !de || (se.current = /* @__PURE__ */ new Date(), re(ve.current), e.target.setPointerCapture(e.pointerId), e.target.tagName !== "BUTTON" && (I(!0), B.current = {
				x: e.clientX,
				y: e.clientY
			})));
		},
		onPointerUp: () => {
			if (L || !de) return;
			B.current = null;
			let e = Number(ce.current?.style.getPropertyValue("--swipe-amount-x").replace("px", "") || 0), t = Number(ce.current?.style.getPropertyValue("--swipe-amount-y").replace("px", "") || 0), n = (/* @__PURE__ */ new Date()).getTime() - se.current?.getTime(), i = D === "x" ? e : t, a = Math.abs(i) / n;
			if (Math.abs(i) >= Pv || a > .11) {
				re(ve.current), r.onDismiss == null || r.onDismiss.call(r, r), A(D === "x" ? e > 0 ? "right" : "left" : t > 0 ? "down" : "up"), Ee(), ee(!0);
				return;
			} else {
				var o, s;
				(o = ce.current) == null || o.style.setProperty("--swipe-amount-x", "0px"), (s = ce.current) == null || s.style.setProperty("--swipe-amount-y", "0px");
			}
			R(!1), I(!1), O(null);
		},
		onPointerMove: (t) => {
			var n, r;
			if (!B.current || !de || window.getSelection()?.toString().length > 0) return;
			let i = t.clientY - B.current.y, a = t.clientX - B.current.x, o = e.swipeDirections ?? Lv(x);
			!D && (Math.abs(a) > 1 || Math.abs(i) > 1) && O(Math.abs(a) > Math.abs(i) ? "x" : "y");
			let s = {
				x: 0,
				y: 0
			}, c = (e) => 1 / (1.5 + Math.abs(e) / 20);
			if (D === "y") {
				if (o.includes("top") || o.includes("bottom")) if (o.includes("top") && i < 0 || o.includes("bottom") && i > 0) s.y = i;
				else {
					let e = i * c(i);
					s.y = Math.abs(e) < Math.abs(i) ? e : i;
				}
			} else if (D === "x" && (o.includes("left") || o.includes("right"))) if (o.includes("left") && a < 0 || o.includes("right") && a > 0) s.x = a;
			else {
				let e = a * c(a);
				s.x = Math.abs(e) < Math.abs(a) ? e : a;
			}
			(Math.abs(s.x) > 0 || Math.abs(s.y) > 0) && R(!0), (n = ce.current) == null || n.style.setProperty("--swipe-amount-x", `${s.x}px`), (r = ce.current) == null || r.style.setProperty("--swipe-amount-y", `${s.y}px`);
		}
	}, he && !r.jsx && z !== "loading" ? /* @__PURE__ */ t.createElement("button", {
		"aria-label": E,
		"data-disabled": Te,
		"data-close-button": !0,
		onClick: Te || !de ? () => {} : () => {
			Ee(), r.onDismiss == null || r.onDismiss.call(r, r);
		},
		className: Iv(w?.closeButton, r?.classNames?.closeButton)
	}, T?.close ?? yv) : null, (z || r.icon || r.promise) && r.icon !== null && (T?.[z] !== null || r.icon) ? /* @__PURE__ */ t.createElement("div", {
		"data-icon": "",
		className: Iv(w?.icon, r?.classNames?.icon)
	}, r.promise || r.type === "loading" && !r.icon ? r.icon || V() : null, r.type === "loading" ? null : De) : null, /* @__PURE__ */ t.createElement("div", {
		"data-content": "",
		className: Iv(w?.content, r?.classNames?.content)
	}, /* @__PURE__ */ t.createElement("div", {
		"data-title": "",
		className: Iv(w?.title, r?.classNames?.title)
	}, r.jsx ? r.jsx : typeof r.title == "function" ? r.title() : r.title), r.description ? /* @__PURE__ */ t.createElement("div", {
		"data-description": "",
		className: Iv(y, pe, w?.description, r?.classNames?.description)
	}, typeof r.description == "function" ? r.description() : r.description) : null), /* @__PURE__ */ t.isValidElement(r.cancel) ? r.cancel : r.cancel && Dv(r.cancel) ? /* @__PURE__ */ t.createElement("button", {
		"data-button": !0,
		"data-cancel": !0,
		style: r.cancelButtonStyle || g,
		onClick: (e) => {
			Dv(r.cancel) && de && (r.cancel.onClick == null || r.cancel.onClick.call(r.cancel, e), Ee());
		},
		className: Iv(w?.cancelButton, r?.classNames?.cancelButton)
	}, r.cancel.label) : null, /* @__PURE__ */ t.isValidElement(r.action) ? r.action : r.action && Dv(r.action) ? /* @__PURE__ */ t.createElement("button", {
		"data-button": !0,
		"data-action": !0,
		style: r.actionButtonStyle || _,
		onClick: (e) => {
			Dv(r.action) && (r.action.onClick == null || r.action.onClick.call(r.action, e), !e.defaultPrevented && Ee());
		},
		className: Iv(w?.actionButton, r?.classNames?.actionButton)
	}, r.action.label) : null);
};
function zv() {
	if (typeof window > "u" || typeof document > "u") return "ltr";
	let e = document.documentElement.getAttribute("dir");
	return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function Bv(e, t) {
	let n = {};
	return [e, t].forEach((e, t) => {
		let r = t === 1, i = r ? "--mobile-offset" : "--offset", a = r ? Av : kv;
		function o(e) {
			[
				"top",
				"right",
				"bottom",
				"left"
			].forEach((t) => {
				n[`${i}-${t}`] = typeof e == "number" ? `${e}px` : e;
			});
		}
		typeof e == "number" || typeof e == "string" ? o(e) : typeof e == "object" ? [
			"top",
			"right",
			"bottom",
			"left"
		].forEach((t) => {
			e[t] === void 0 ? n[`${i}-${t}`] = a : n[`${i}-${t}`] = typeof e[t] == "number" ? `${e[t]}px` : e[t];
		}) : o(a);
	}), n;
}
var Vv = /* @__PURE__ */ t.forwardRef(function(e, n) {
	let { id: r, invert: i, position: a = "bottom-right", hotkey: o = ["altKey", "KeyT"], expand: s, closeButton: c, className: l, offset: u, mobileOffset: d, theme: f = "light", richColors: p, duration: m, style: h, visibleToasts: _ = Ov, toastOptions: v, dir: y = zv(), gap: b = Nv, icons: x, containerAriaLabel: S = "Notifications" } = e, [C, w] = t.useState([]), T = t.useMemo(() => r ? C.filter((e) => e.toasterId === r) : C.filter((e) => !e.toasterId), [C, r]), E = t.useMemo(() => Array.from(new Set([a].concat(T.filter((e) => e.position).map((e) => e.position)))), [T, a]), [D, O] = t.useState([]), [k, A] = t.useState(!1), [j, M] = t.useState(!1), [N, P] = t.useState(f === "system" ? typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : f), F = t.useRef(null), I = o.join("+").replace(/Key/g, "").replace(/Digit/g, ""), L = t.useRef(null), ee = t.useRef(!1), te = t.useCallback((e) => {
		w((t) => (t.find((t) => t.id === e.id)?.delete || Sv.dismiss(e.id), t.filter(({ id: t }) => t !== e.id)));
	}, []);
	return t.useEffect(() => Sv.subscribe((e) => {
		if (e.dismiss) {
			requestAnimationFrame(() => {
				w((t) => t.map((t) => t.id === e.id ? {
					...t,
					delete: !0
				} : t));
			});
			return;
		}
		setTimeout(() => {
			g.flushSync(() => {
				w((t) => {
					let n = t.findIndex((t) => t.id === e.id);
					return n === -1 ? [e, ...t] : [
						...t.slice(0, n),
						{
							...t[n],
							...e
						},
						...t.slice(n + 1)
					];
				});
			});
		});
	}), [C]), t.useEffect(() => {
		if (f !== "system") {
			P(f);
			return;
		}
		if (f === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? P("dark") : P("light")), typeof window > "u") return;
		let e = window.matchMedia("(prefers-color-scheme: dark)");
		try {
			e.addEventListener("change", ({ matches: e }) => {
				P(e ? "dark" : "light");
			});
		} catch {
			e.addListener(({ matches: e }) => {
				try {
					P(e ? "dark" : "light");
				} catch (e) {
					console.error(e);
				}
			});
		}
	}, [f]), t.useEffect(() => {
		C.length <= 1 && A(!1);
	}, [C]), t.useEffect(() => {
		let e = (e) => {
			if (o.every((t) => e[t] || e.code === t)) {
				var t;
				A(!0), (t = F.current) == null || t.focus();
			}
			e.code === "Escape" && (document.activeElement === F.current || F.current?.contains(document.activeElement)) && A(!1);
		};
		return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
	}, [o]), t.useEffect(() => {
		if (F.current) return () => {
			L.current && (L.current.focus({ preventScroll: !0 }), L.current = null, ee.current = !1);
		};
	}, [F.current]), /* @__PURE__ */ t.createElement("section", {
		ref: n,
		"aria-label": `${S} ${I}`,
		tabIndex: -1,
		"aria-live": "polite",
		"aria-relevant": "additions text",
		"aria-atomic": "false",
		suppressHydrationWarning: !0
	}, E.map((n, r) => {
		let [a, o] = n.split("-");
		return T.length ? /* @__PURE__ */ t.createElement("ol", {
			key: n,
			dir: y === "auto" ? zv() : y,
			tabIndex: -1,
			ref: F,
			className: l,
			"data-sonner-toaster": !0,
			"data-sonner-theme": N,
			"data-y-position": a,
			"data-x-position": o,
			style: {
				"--front-toast-height": `${D[0]?.height || 0}px`,
				"--width": `${Mv}px`,
				"--gap": `${b}px`,
				...h,
				...Bv(u, d)
			},
			onBlur: (e) => {
				ee.current && !e.currentTarget.contains(e.relatedTarget) && (ee.current = !1, L.current &&= (L.current.focus({ preventScroll: !0 }), null));
			},
			onFocus: (e) => {
				e.target instanceof HTMLElement && e.target.dataset.dismissible === "false" || ee.current || (ee.current = !0, L.current = e.relatedTarget);
			},
			onMouseEnter: () => A(!0),
			onMouseMove: () => A(!0),
			onMouseLeave: () => {
				j || A(!1);
			},
			onDragEnd: () => A(!1),
			onPointerDown: (e) => {
				e.target instanceof HTMLElement && e.target.dataset.dismissible === "false" || M(!0);
			},
			onPointerUp: () => M(!1)
		}, T.filter((e) => !e.position && r === 0 || e.position === n).map((r, a) => /* @__PURE__ */ t.createElement(Rv, {
			key: r.id,
			icons: x,
			index: a,
			toast: r,
			defaultRichColors: p,
			duration: v?.duration ?? m,
			className: v?.className,
			descriptionClassName: v?.descriptionClassName,
			invert: i,
			visibleToasts: _,
			closeButton: v?.closeButton ?? c,
			interacting: j,
			position: n,
			style: v?.style,
			unstyled: v?.unstyled,
			classNames: v?.classNames,
			cancelButtonStyle: v?.cancelButtonStyle,
			actionButtonStyle: v?.actionButtonStyle,
			closeButtonAriaLabel: v?.closeButtonAriaLabel,
			removeToast: te,
			toasts: T.filter((e) => e.position == r.position),
			heights: D.filter((e) => e.position == r.position),
			setHeights: O,
			expandByDefault: s,
			gap: b,
			expanded: k,
			swipeDirections: e.swipeDirections
		}))) : null;
	}));
}), Hv = {
	toast: "_toast_4s9xe_1",
	description: "_description_4s9xe_23",
	actionButton: "_actionButton_4s9xe_33",
	cancelButton: "_cancelButton_4s9xe_47",
	success: "_success_4s9xe_61",
	error: "_error_4s9xe_73",
	warning: "_warning_4s9xe_85",
	info: "_info_4s9xe_97"
}, Uv = ({ ...e }) => /* @__PURE__ */ p(Vv, {
	toastOptions: { classNames: {
		toast: Hv.toast,
		description: Hv.description,
		actionButton: Hv.actionButton,
		cancelButton: Hv.cancelButton,
		success: Hv.success,
		error: Hv.error,
		warning: Hv.warning,
		info: Hv.info
	} },
	...e
}), Wv = "Dialog", [Gv, Kv] = Ae(Wv), [qv, Jv] = Gv(Wv), Yv = (t) => {
	let { __scopeDialog: n, children: r, open: i, defaultOpen: a, onOpenChange: o, modal: s = !0 } = t, c = e.useRef(null), l = e.useRef(null), [u, d] = qe({
		prop: i,
		defaultProp: a ?? !1,
		onChange: o,
		caller: Wv
	});
	return /* @__PURE__ */ p(qv, {
		scope: n,
		triggerRef: c,
		contentRef: l,
		contentId: We(),
		titleId: We(),
		descriptionId: We(),
		open: u,
		onOpenChange: d,
		onOpenToggle: e.useCallback(() => d((e) => !e), [d]),
		modal: s,
		children: r
	});
};
Yv.displayName = Wv;
var Xv = "DialogTrigger", Zv = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = Jv(Xv, n), a = H(t, i.triggerRef);
	return /* @__PURE__ */ p(U.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": i.open,
		"aria-controls": i.contentId,
		"data-state": _y(i.open),
		...r,
		ref: a,
		onClick: V(e.onClick, i.onOpenToggle)
	});
});
Zv.displayName = Xv;
var Qv = "DialogPortal", [$v, ey] = Gv(Qv, { forceMount: void 0 }), ty = (t) => {
	let { __scopeDialog: n, forceMount: r, children: i, container: a } = t, o = Jv(Qv, n);
	return /* @__PURE__ */ p($v, {
		scope: n,
		forceMount: r,
		children: e.Children.map(i, (e) => /* @__PURE__ */ p(St, {
			present: r || o.open,
			children: /* @__PURE__ */ p(Do, {
				asChild: !0,
				container: a,
				children: e
			})
		}))
	});
};
ty.displayName = Qv;
var ny = "DialogOverlay", ry = e.forwardRef((e, t) => {
	let n = ey(ny, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = Jv(ny, e.__scopeDialog);
	return a.modal ? /* @__PURE__ */ p(St, {
		present: r || a.open,
		children: /* @__PURE__ */ p(ay, {
			...i,
			ref: t
		})
	}) : null;
});
ry.displayName = ny;
var iy = /* @__PURE__ */ Me("DialogOverlay.RemoveScroll"), ay = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = Jv(ny, n);
	return /* @__PURE__ */ p(Gs, {
		as: iy,
		allowPinchZoom: !0,
		shards: [i.contentRef],
		children: /* @__PURE__ */ p(U.div, {
			"data-state": _y(i.open),
			...r,
			ref: t,
			style: {
				pointerEvents: "auto",
				...r.style
			}
		})
	});
}), oy = "DialogContent", sy = e.forwardRef((e, t) => {
	let n = ey(oy, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = Jv(oy, e.__scopeDialog);
	return /* @__PURE__ */ p(St, {
		present: r || a.open,
		children: a.modal ? /* @__PURE__ */ p(cy, {
			...i,
			ref: t
		}) : /* @__PURE__ */ p(ly, {
			...i,
			ref: t
		})
	});
});
sy.displayName = oy;
var cy = e.forwardRef((t, n) => {
	let r = Jv(oy, t.__scopeDialog), i = e.useRef(null), a = H(n, r.contentRef, i);
	return e.useEffect(() => {
		let e = i.current;
		if (e) return Io(e);
	}, []), /* @__PURE__ */ p(uy, {
		...t,
		ref: a,
		trapFocus: r.open,
		disableOutsidePointerEvents: !0,
		onCloseAutoFocus: V(t.onCloseAutoFocus, (e) => {
			e.preventDefault(), r.triggerRef.current?.focus();
		}),
		onPointerDownOutside: V(t.onPointerDownOutside, (e) => {
			let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
			(t.button === 2 || n) && e.preventDefault();
		}),
		onFocusOutside: V(t.onFocusOutside, (e) => e.preventDefault())
	});
}), ly = e.forwardRef((t, n) => {
	let r = Jv(oy, t.__scopeDialog), i = e.useRef(!1), a = e.useRef(!1);
	return /* @__PURE__ */ p(uy, {
		...t,
		ref: n,
		trapFocus: !1,
		disableOutsidePointerEvents: !1,
		onCloseAutoFocus: (e) => {
			t.onCloseAutoFocus?.(e), e.defaultPrevented || (i.current || r.triggerRef.current?.focus(), e.preventDefault()), i.current = !1, a.current = !1;
		},
		onInteractOutside: (e) => {
			t.onInteractOutside?.(e), e.defaultPrevented || (i.current = !0, e.detail.originalEvent.type === "pointerdown" && (a.current = !0));
			let n = e.target;
			r.triggerRef.current?.contains(n) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && a.current && e.preventDefault();
		}
	});
}), uy = e.forwardRef((t, n) => {
	let { __scopeDialog: r, trapFocus: i, onOpenAutoFocus: a, onCloseAutoFocus: o, ...s } = t, c = Jv(oy, r), l = e.useRef(null), u = H(n, l);
	return wr(), /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p(Ar, {
		asChild: !0,
		loop: !0,
		trapped: i,
		onMountAutoFocus: a,
		onUnmountAutoFocus: o,
		children: /* @__PURE__ */ p(gr, {
			role: "dialog",
			id: c.contentId,
			"aria-describedby": c.descriptionId,
			"aria-labelledby": c.titleId,
			"data-state": _y(c.open),
			...s,
			ref: u,
			onDismiss: () => c.onOpenChange(!1)
		})
	}), /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p(xy, { titleId: c.titleId }), /* @__PURE__ */ p(Cy, {
		contentRef: l,
		descriptionId: c.descriptionId
	})] })] });
}), dy = "DialogTitle", fy = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = Jv(dy, n);
	return /* @__PURE__ */ p(U.h2, {
		id: i.titleId,
		...r,
		ref: t
	});
});
fy.displayName = dy;
var py = "DialogDescription", my = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = Jv(py, n);
	return /* @__PURE__ */ p(U.p, {
		id: i.descriptionId,
		...r,
		ref: t
	});
});
my.displayName = py;
var hy = "DialogClose", gy = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = Jv(hy, n);
	return /* @__PURE__ */ p(U.button, {
		type: "button",
		...r,
		ref: t,
		onClick: V(e.onClick, () => i.onOpenChange(!1))
	});
});
gy.displayName = hy;
function _y(e) {
	return e ? "open" : "closed";
}
var vy = "DialogTitleWarning", [yy, by] = ke(vy, {
	contentName: oy,
	titleName: dy,
	docsSlug: "dialog"
}), xy = ({ titleId: t }) => {
	let n = by(vy), r = `\`${n.contentName}\` requires a \`${n.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${n.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${n.docsSlug}`;
	return e.useEffect(() => {
		t && (document.getElementById(t) || console.error(r));
	}, [r, t]), null;
}, Sy = "DialogDescriptionWarning", Cy = ({ contentRef: t, descriptionId: n }) => {
	let r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${by(Sy).contentName}}.`;
	return e.useEffect(() => {
		let e = t.current?.getAttribute("aria-describedby");
		n && e && (document.getElementById(n) || console.warn(r));
	}, [
		r,
		t,
		n
	]), null;
}, wy = Yv, Ty = Zv, Ey = ty, Dy = ry, Oy = sy, ky = fy, Ay = my, jy = gy, My = {
	overlay: "_overlay_1gc5g_1",
	fadeIn: "_fadeIn_1gc5g_1",
	fadeOut: "_fadeOut_1gc5g_1",
	content: "_content_1gc5g_35",
	modalShow: "_modalShow_1gc5g_1",
	modalHide: "_modalHide_1gc5g_1",
	closeButton: "_closeButton_1gc5g_93",
	header: "_header_1gc5g_145",
	footer: "_footer_1gc5g_159",
	title: "_title_1gc5g_179",
	description: "_description_1gc5g_195",
	srOnly: "_srOnly_1gc5g_323"
}, Ny = wy, Py = Ty, Fy = Ey, Iy = jy, Ly = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p(Dy, {
	ref: n,
	className: x(My.overlay, e),
	...t
}));
Ly.displayName = Dy.displayName;
var Ry = e.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ m(Fy, { children: [/* @__PURE__ */ p(Ly, {}), /* @__PURE__ */ m(Oy, {
	ref: r,
	className: x(My.content, e),
	...n,
	children: [t, /* @__PURE__ */ m(jy, {
		className: My.closeButton,
		children: [/* @__PURE__ */ p(he, { size: 16 }), /* @__PURE__ */ p("span", {
			className: My.srOnly,
			children: "Fechar janela"
		})]
	})]
})] }));
Ry.displayName = Oy.displayName;
var zy = ({ className: e, ...t }) => /* @__PURE__ */ p("div", {
	className: x(My.header, e),
	...t
});
zy.displayName = "ModalHeader";
var By = ({ className: e, ...t }) => /* @__PURE__ */ p("div", {
	className: x(My.footer, e),
	...t
});
By.displayName = "ModalFooter";
var Vy = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p(ky, {
	ref: n,
	className: x(My.title, e),
	...t
}));
Vy.displayName = ky.displayName;
var Hy = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p(Ay, {
	ref: n,
	className: x(My.description, e),
	...t
}));
Hy.displayName = Ay.displayName;
var Uy = {
	overlay: "_overlay_zg71n_141",
	overlayShow: "_overlayShow_zg71n_1",
	overlayHide: "_overlayHide_zg71n_1",
	content: "_content_zg71n_179",
	right: "_right_zg71n_213",
	slideInRight: "_slideInRight_zg71n_1",
	slideOutRight: "_slideOutRight_zg71n_1",
	left: "_left_zg71n_241",
	slideInLeft: "_slideInLeft_zg71n_1",
	slideOutLeft: "_slideOutLeft_zg71n_1",
	closeButton: "_closeButton_zg71n_273",
	header: "_header_zg71n_337",
	body: "_body_zg71n_355",
	footer: "_footer_zg71n_413",
	title: "_title_zg71n_439",
	description: "_description_zg71n_461",
	separator: "_separator_zg71n_483",
	srOnly: "_srOnly_zg71n_501"
}, Wy = wy, Gy = Ty, Ky = Ey, qy = jy, Jy = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p(Dy, {
	ref: n,
	className: x(Uy.overlay, e),
	...t
}));
Jy.displayName = "DrawerOverlay";
var Yy = e.forwardRef(({ className: e, children: t, side: n = "right", ...r }, i) => /* @__PURE__ */ m(Ky, { children: [/* @__PURE__ */ p(Jy, {}), /* @__PURE__ */ m(Oy, {
	ref: i,
	className: x(Uy.content, n === "left" ? Uy.left : Uy.right, e),
	...r,
	children: [t, /* @__PURE__ */ m(jy, {
		className: Uy.closeButton,
		children: [/* @__PURE__ */ p(he, { size: 18 }), /* @__PURE__ */ p("span", {
			className: Uy.srOnly,
			children: "Fechar"
		})]
	})]
})] }));
Yy.displayName = "DrawerContent";
var Xy = ({ className: e, ...t }) => /* @__PURE__ */ p("div", {
	className: x(Uy.header, e),
	...t
});
Xy.displayName = "DrawerHeader";
var Zy = ({ className: e, ...t }) => /* @__PURE__ */ p("div", {
	className: x(Uy.body, e),
	...t
});
Zy.displayName = "DrawerBody";
var Qy = ({ className: e, ...t }) => /* @__PURE__ */ p("div", {
	className: x(Uy.footer, e),
	...t
});
Qy.displayName = "DrawerFooter";
var $y = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p(ky, {
	ref: n,
	className: x(Uy.title, e),
	...t
}));
$y.displayName = "DrawerTitle";
var eb = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p(Ay, {
	ref: n,
	className: x(Uy.description, e),
	...t
}));
eb.displayName = "DrawerDescription";
var tb = ({ className: e }) => /* @__PURE__ */ p("div", { className: x(Uy.separator, e) });
tb.displayName = "DrawerSeparator";
var nb = {
	card: "_card_buvlb_1",
	header: "_header_buvlb_21",
	title: "_title_buvlb_35",
	description: "_description_buvlb_51",
	content: "_content_buvlb_63",
	footer: "_footer_buvlb_81"
}, rb = i(({ className: e, ...t }, n) => /* @__PURE__ */ p("div", {
	ref: n,
	className: x(nb.card, e),
	...t
}));
rb.displayName = "Card";
var ib = i(({ className: e, ...t }, n) => /* @__PURE__ */ p("div", {
	ref: n,
	className: x(nb.header, e),
	...t
}));
ib.displayName = "CardHeader";
var ab = i(({ className: e, ...t }, n) => /* @__PURE__ */ p("h3", {
	ref: n,
	className: x(nb.title, e),
	...t
}));
ab.displayName = "CardTitle";
var ob = i(({ className: e, ...t }, n) => /* @__PURE__ */ p("p", {
	ref: n,
	className: x(nb.description, e),
	...t
}));
ob.displayName = "CardDescription";
var sb = i(({ className: e, ...t }, n) => /* @__PURE__ */ p("div", {
	ref: n,
	className: x(nb.content, e),
	...t
}));
sb.displayName = "CardContent";
var cb = i(({ className: e, ...t }, n) => /* @__PURE__ */ p("div", {
	ref: n,
	className: x(nb.footer, e),
	...t
}));
cb.displayName = "CardFooter";
var $ = {
	overlay: "_overlay_1s52k_3",
	sidebar: "_sidebar_1s52k_23",
	expanded: "_expanded_1s52k_53",
	collapsed: "_collapsed_1s52k_61",
	header: "_header_1s52k_71",
	logoContainer: "_logoContainer_1s52k_111",
	toggleButton: "_toggleButton_1s52k_141",
	nav: "_nav_1s52k_177",
	item: "_item_1s52k_199",
	itemActive: "_itemActive_1s52k_241",
	itemCollapsed: "_itemCollapsed_1s52k_251",
	itemExpanded: "_itemExpanded_1s52k_261",
	itemLabel: "_itemLabel_1s52k_271",
	labelHidden: "_labelHidden_1s52k_285",
	footer: "_footer_1s52k_299",
	footerCollapsed: "_footerCollapsed_1s52k_313",
	userMenu: "_userMenu_1s52k_327",
	userMenuCollapsed: "_userMenuCollapsed_1s52k_353",
	userMenuLogout: "_userMenuLogout_1s52k_367",
	userProfileButton: "_userProfileButton_1s52k_411",
	userButtonCollapsed: "_userButtonCollapsed_1s52k_447",
	userInfo: "_userInfo_1s52k_457",
	userText: "_userText_1s52k_473",
	userMenuIcon: "_userMenuIcon_1s52k_491",
	mobileOpen: "_mobileOpen_1s52k_515",
	logoPlaceholder: "_logoPlaceholder_1s52k_541",
	logoPulse: "_logoPulse_1s52k_1"
}, lb = n({ isCollapsed: !1 });
function ub({ icon: e, label: t, active: n, className: r, ...i }) {
	let { isCollapsed: a } = o(lb);
	return /* @__PURE__ */ m("button", {
		className: x($.item, n && $.itemActive, a ? $.itemCollapsed : $.itemExpanded, r),
		title: a ? t : void 0,
		...i,
		children: [/* @__PURE__ */ p(e, { size: a ? 24 : 20 }), /* @__PURE__ */ p("span", {
			className: x($.itemLabel, a && $.labelHidden),
			children: t
		})]
	});
}
function db({ isCollapsed: e, onToggle: t, isOpenMobile: n, onCloseMobile: r, logo: i, children: a, userName: o = "Usuário", userRole: c = "Colaborador", userAvatarUrl: l, onLogout: h, className: g, ..._ }) {
	let [v, y] = d(!1), b = u(null);
	return s(() => {
		if (!v) return;
		function e(e) {
			b.current && !b.current.contains(e.target) && y(!1);
		}
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [v]), /* @__PURE__ */ m(f, { children: [n && /* @__PURE__ */ p("div", {
		className: $.overlay,
		onClick: r
	}), /* @__PURE__ */ m("aside", {
		className: x($.sidebar, e ? $.collapsed : $.expanded, n && $.mobileOpen, g),
		..._,
		children: [
			/* @__PURE__ */ m("div", {
				className: $.header,
				children: [/* @__PURE__ */ p("div", {
					className: $.logoContainer,
					children: typeof i == "function" ? i(e) : i
				}), t && /* @__PURE__ */ p("button", {
					className: $.toggleButton,
					onClick: t,
					"aria-expanded": !e,
					"aria-label": "Alternar menu lateral",
					children: p(e ? ie : re, { size: 20 })
				})]
			}),
			/* @__PURE__ */ p(lb.Provider, {
				value: { isCollapsed: e },
				children: /* @__PURE__ */ p("nav", {
					className: $.nav,
					children: a
				})
			}),
			/* @__PURE__ */ m("div", {
				ref: b,
				className: x($.footer, e && $.footerCollapsed),
				children: [v && h && /* @__PURE__ */ p("div", {
					className: x($.userMenu, e && $.userMenuCollapsed),
					children: /* @__PURE__ */ m("button", {
						className: $.userMenuLogout,
						onClick: h,
						children: [/* @__PURE__ */ p(fe, { size: 16 }), "Sair do Sistema"]
					})
				}), /* @__PURE__ */ m("button", {
					className: x($.userProfileButton, e && $.userButtonCollapsed),
					onClick: () => y((e) => !e),
					children: [/* @__PURE__ */ p(M, {
						src: l,
						initials: o.substring(0, 2).toUpperCase(),
						size: e ? "sm" : "md"
					}), !e && /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ m("div", {
						className: $.userInfo,
						children: [/* @__PURE__ */ p("span", {
							className: $.userText,
							children: o
						}), /* @__PURE__ */ p("span", {
							className: $.userText,
							children: c
						})]
					}), /* @__PURE__ */ p(le, {
						size: 16,
						className: $.userMenuIcon
					})] })]
				})]
			})
		]
	})] });
}
var fb = {
	header: "_header_u5732_1",
	buttonGroup: "_buttonGroup_u5732_43",
	contextArea: "_contextArea_u5732_53",
	mobileOnly: "_mobileOnly_u5732_75",
	desktopOnly: "_desktopOnly_u5732_83"
};
//#endregion
//#region src/components/TopBar/index.tsx
function pb({ onToggleMobile: e, className: t, children: n, ...r }) {
	return /* @__PURE__ */ m("header", {
		className: x(fb.header, t),
		...r,
		children: [/* @__PURE__ */ p("div", {
			className: fb.buttonGroup,
			children: /* @__PURE__ */ p(xe, {
				variant: "ghost",
				intent: "secundaria",
				className: x(fb.mobileOnly),
				onClick: e,
				"aria-label": "Abrir menu",
				children: /* @__PURE__ */ p(pe, { size: 20 })
			})
		}), /* @__PURE__ */ p("div", {
			className: fb.contextArea,
			children: n
		})]
	});
}
//#endregion
export { M as Avatar, A as Badge, xe as Button, v_ as Calendar, rb as Card, sb as CardContent, ob as CardDescription, cb as CardFooter, ib as CardHeader, ab as CardTitle, Ee as Checkbox, Cc as Combobox, ep as DataTable, y_ as DatePicker, Wy as Drawer, Zy as DrawerBody, qy as DrawerClose, Yy as DrawerContent, eb as DrawerDescription, Qy as DrawerFooter, Xy as DrawerHeader, Jy as DrawerOverlay, Ky as DrawerPortal, tb as DrawerSeparator, $y as DrawerTitle, Gy as DrawerTrigger, zf as DropdownMenu, Yf as DropdownMenuCheckboxItem, qf as DropdownMenuContent, Vf as DropdownMenuGroup, Jf as DropdownMenuItem, Zf as DropdownMenuLabel, Hf as DropdownMenuPortal, Wf as DropdownMenuRadioGroup, Xf as DropdownMenuRadioItem, Qf as DropdownMenuSeparator, $f as DropdownMenuShortcut, Uf as DropdownMenuSub, Kf as DropdownMenuSubContent, Gf as DropdownMenuSubTrigger, Bf as DropdownMenuTrigger, Tc as FileUpload, tu as HierarchicalCombobox, Ny as Modal, Iy as ModalClose, Ry as ModalContent, Hy as ModalDescription, By as ModalFooter, zy as ModalHeader, Ly as ModalOverlay, Fy as ModalPortal, Vy as ModalTitle, Py as ModalTrigger, cr as MultiSelect, h_ as Popover, __ as PopoverContent, g_ as PopoverTrigger, en as RadioGroup, tn as RadioItem, x_ as Select, db as SideBar, ub as SideBarItem, ye as Skeleton, Gn as Slider, ve as Spinner, or as Switch, ru as TagInput, we as TextField, Uv as Toaster, cv as Tooltip, uv as TooltipContent, sv as TooltipProvider, lv as TooltipTrigger, pb as TopBar, D as Typography, k as badgeVariants, be as buttonVariants, x as cn, Ce as inputVariants, Ev as toast, E as typographyVariants };
