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
	base: "_base_1l42r_1",
	h1: "_h1_1l42r_9",
	h2: "_h2_1l42r_26",
	p: "_p_1l42r_41",
	h3: "_h3_1l42r_49",
	h4: "_h4_1l42r_64"
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
	base: "_base_1jgex_1",
	primaria_solid: "_primaria_solid_1jgex_19",
	primaria_outline: "_primaria_outline_1jgex_28",
	primaria_ghost: "_primaria_ghost_1jgex_34",
	secundaria_solid: "_secundaria_solid_1jgex_44",
	secundaria_outline: "_secundaria_outline_1jgex_53",
	secundaria_ghost: "_secundaria_ghost_1jgex_59",
	alerta_solid: "_alerta_solid_1jgex_69",
	alerta_outline: "_alerta_outline_1jgex_78",
	alerta_ghost: "_alerta_ghost_1jgex_84",
	erro_solid: "_erro_solid_1jgex_94",
	erro_outline: "_erro_outline_1jgex_103",
	erro_ghost: "_erro_ghost_1jgex_109",
	neutro_solid: "_neutro_solid_1jgex_119",
	neutro_outline: "_neutro_outline_1jgex_124",
	neutro_ghost: "_neutro_ghost_1jgex_129"
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
	container: "_container_rley4_1",
	sm: "_sm_rley4_18",
	md: "_md_rley4_24",
	lg: "_lg_rley4_30",
	image: "_image_rley4_36",
	initials: "_initials_rley4_43"
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
]), R = L("Calendar", [
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
]), z = L("Check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]), te = L("ChevronDown", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]), ne = L("ChevronLeft", [["path", {
	d: "m15 18-6-6 6-6",
	key: "1wnfg3"
}]]), re = L("ChevronRight", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]), ie = L("ChevronsUpDown", [["path", {
	d: "m7 15 5 5 5-5",
	key: "1hf1tw"
}], ["path", {
	d: "m7 9 5-5 5 5",
	key: "sgt6xg"
}]]), ae = L("CircleCheck", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), oe = L("Circle", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}]]), se = L("CloudUpload", [
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
]), ce = L("EllipsisVertical", [
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
]), le = L("Ellipsis", [
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
]), B = L("File", [["path", {
	d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
	key: "1rqfz7"
}], ["path", {
	d: "M14 2v4a2 2 0 0 0 2 2h4",
	key: "tnqrlb"
}]]), ue = L("LoaderCircle", [["path", {
	d: "M21 12a9 9 0 1 1-6.219-8.56",
	key: "13zald"
}]]), de = L("LogOut", [
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
]), fe = L("Menu", [
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
]), pe = L("X", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]), me = {
	spinner: "_spinner_1nzxg_1",
	spin: "_spin_1nzxg_1",
	sm: "_sm_1nzxg_6",
	md: "_md_1nzxg_12",
	lg: "_lg_1nzxg_18",
	xl: "_xl_1nzxg_24"
}, he = {
	skeleton: "_skeleton_1vq3o_1",
	pulse: "_pulse_1vq3o_1"
}, ge = e.forwardRef(({ className: e, size: t = "md", ...n }, r) => /* @__PURE__ */ p(ue, {
	ref: r,
	className: x(me.spinner, me[t], e),
	...n
}));
ge.displayName = "Spinner";
var _e = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p("div", {
	ref: n,
	className: x(he.skeleton, e),
	...t
}));
_e.displayName = "Skeleton";
var ve = {
	buttonBase: "_buttonBase_ti92y_2",
	sm: "_sm_ti92y_29",
	md: "_md_ti92y_35",
	lg: "_lg_ti92y_41",
	primaria: "_primaria_ti92y_48",
	secundaria: "_secundaria_ti92y_53",
	alerta: "_alerta_ti92y_58",
	erro: "_erro_ti92y_63",
	outline: "_outline_ti92y_69",
	ghost: "_ghost_ti92y_81",
	animateSpin: "_animateSpin_ti92y_92",
	spin: "_spin_ti92y_1"
}, ye = w(ve.buttonBase, {
	variants: {
		intent: {
			primaria: ve.primaria,
			secundaria: ve.secundaria,
			alerta: ve.alerta,
			erro: ve.erro
		},
		variant: {
			solid: "",
			outline: ve.outline,
			ghost: ve.ghost
		},
		size: {
			sm: ve.sm,
			md: ve.md,
			lg: ve.lg
		}
	},
	defaultVariants: {
		intent: "primaria",
		variant: "solid",
		size: "md"
	}
}), be = i(({ className: e, intent: t, variant: n, size: r, leftIcon: i, rightIcon: a, children: o, disabled: s, isLoading: c, ...l }, u) => /* @__PURE__ */ m("button", {
	className: b(ye({
		intent: t,
		variant: n,
		size: r
	}), e),
	ref: u,
	disabled: s || c,
	"aria-disabled": s || c,
	...l,
	children: [
		c && /* @__PURE__ */ p(ue, {
			className: ve.animateSpin,
			"aria-hidden": "true"
		}),
		!c && i && /* @__PURE__ */ p(i, { "aria-hidden": "true" }),
		o,
		!c && a && /* @__PURE__ */ p(a, { "aria-hidden": "true" })
	]
}));
be.displayName = "Button";
var xe = {
	container: "_container_1cocf_1",
	label: "_label_1cocf_10",
	relativeWrapper: "_relativeWrapper_1cocf_18",
	inputBase: "_inputBase_1cocf_23",
	hasError: "_hasError_1cocf_55",
	withIcon: "_withIcon_1cocf_65",
	icon: "_icon_1cocf_70",
	iconDefault: "_iconDefault_1cocf_80",
	iconError: "_iconError_1cocf_84",
	errorMessage: "_errorMessage_1cocf_89"
}, Se = w(xe.inputBase, {
	variants: {
		hasError: {
			true: xe.hasError,
			false: ""
		},
		hasIcon: {
			true: xe.withIcon,
			false: ""
		}
	},
	defaultVariants: {
		hasError: !1,
		hasIcon: !1
	}
}), Ce = i(({ className: e, label: t, error: n, leftIcon: r, id: i, ...a }, o) => {
	let s = i || (t ? `input-${t.replace(/\s+/g, "-").toLowerCase()}` : void 0), c = !!n;
	return /* @__PURE__ */ m("div", {
		className: x(xe.container, e),
		children: [
			t && /* @__PURE__ */ p("label", {
				htmlFor: s,
				className: xe.label,
				children: t
			}),
			/* @__PURE__ */ m("div", {
				className: xe.relativeWrapper,
				children: [r && /* @__PURE__ */ p(r, {
					className: x(xe.icon, c ? xe.iconError : xe.iconDefault),
					"aria-hidden": "true"
				}), /* @__PURE__ */ p("input", {
					id: s,
					ref: o,
					className: x(Se({
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
				className: xe.errorMessage,
				children: n
			})
		]
	});
});
Ce.displayName = "TextField";
var we = {
	container: "_container_19jut_1",
	disabled: "_disabled_19jut_12",
	hiddenInput: "_hiddenInput_19jut_18",
	visualBox: "_visualBox_19jut_31",
	label: "_label_19jut_60",
	iconWrapper: "_iconWrapper_19jut_69"
}, Te = i(({ className: e, label: t, id: n, disabled: r, ...i }, a) => {
	let o = n || (t ? `checkbox-${t.replace(/\s+/g, "-").toLowerCase()}` : void 0);
	return /* @__PURE__ */ m("label", {
		htmlFor: o,
		className: x(we.container, r && we.disabled),
		children: [/* @__PURE__ */ m("div", {
			className: we.iconWrapper,
			children: [/* @__PURE__ */ p("input", {
				type: "checkbox",
				id: o,
				ref: a,
				disabled: r,
				className: we.hiddenInput,
				...i
			}), /* @__PURE__ */ p("div", {
				className: x(we.visualBox, e),
				"aria-hidden": "true",
				children: /* @__PURE__ */ p(z, {
					size: 12,
					strokeWidth: 4,
					color: "currentColor"
				})
			})]
		}), t && /* @__PURE__ */ p("span", {
			className: we.label,
			children: t
		})]
	});
});
Te.displayName = "Checkbox", typeof window < "u" && window.document && window.document.createElement;
function V(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
	return function(r) {
		if (e?.(r), n === !1 || !r.defaultPrevented) return t?.(r);
	};
}
//#endregion
//#region node_modules/@radix-ui/react-compose-refs/dist/index.mjs
function Ee(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function De(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = Ee(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : Ee(e[t], null);
			}
		};
	};
}
function H(...t) {
	return e.useCallback(De(...t), t);
}
//#endregion
//#region node_modules/@radix-ui/react-context/dist/index.mjs
function Oe(t, n) {
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
function ke(t, n = []) {
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
	return a.scopeName = t, [i, Ae(a, ...n)];
}
function Ae(...t) {
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
function je(t) {
	let n = /* @__PURE__ */ Me(t), r = e.forwardRef((t, r) => {
		let { children: i, ...a } = t, o = e.Children.toArray(i), s = o.find(Fe);
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
function Me(t) {
	let n = e.forwardRef((t, n) => {
		let { children: r, ...i } = t;
		if (e.isValidElement(r)) {
			let t = Le(r), a = Ie(i, r.props);
			return r.type !== e.Fragment && (a.ref = n ? De(n, t) : t), e.cloneElement(r, a);
		}
		return e.Children.count(r) > 1 ? e.Children.only(null) : null;
	});
	return n.displayName = `${t}.SlotClone`, n;
}
var Ne = Symbol("radix.slottable");
/* @__NO_SIDE_EFFECTS__ */
function Pe(e) {
	let t = ({ children: e }) => /* @__PURE__ */ p(f, { children: e });
	return t.displayName = `${e}.Slottable`, t.__radixId = Ne, t;
}
function Fe(t) {
	return e.isValidElement(t) && typeof t.type == "function" && "__radixId" in t.type && t.type.__radixId === Ne;
}
function Ie(e, t) {
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
function Le(e) {
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
	let r = /* @__PURE__ */ je(`Primitive.${n}`), i = e.forwardRef((e, t) => {
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
function Re(e, t) {
	e && h.flushSync(() => e.dispatchEvent(t));
}
//#endregion
//#region node_modules/@radix-ui/react-collection/dist/index.mjs
function ze(e) {
	let n = e + "CollectionProvider", [r, i] = ke(n), [a, o] = r(n, {
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
	let c = e + "CollectionSlot", l = /* @__PURE__ */ je(c), u = t.forwardRef((e, t) => {
		let { scope: n, children: r } = e;
		return /* @__PURE__ */ p(l, {
			ref: H(t, o(c, n).collectionRef),
			children: r
		});
	});
	u.displayName = c;
	let d = e + "CollectionItemSlot", f = "data-radix-collection-item", m = /* @__PURE__ */ je(d), h = t.forwardRef((e, n) => {
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
var W = globalThis?.document ? e.useLayoutEffect : () => {}, Be = e.useId || (() => void 0), Ve = 0;
function He(t) {
	let [n, r] = e.useState(Be());
	return W(() => {
		t || r((e) => e ?? String(Ve++));
	}, [t]), t || (n ? `radix-${n}` : "");
}
//#endregion
//#region node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
function Ue(t) {
	let n = e.useRef(t);
	return e.useEffect(() => {
		n.current = t;
	}), e.useMemo(() => (...e) => n.current?.(...e), []);
}
//#endregion
//#region node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var We = e.useInsertionEffect || W;
function Ge({ prop: t, defaultProp: n, onChange: r = () => {}, caller: i }) {
	let [a, o, s] = Ke({
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
			let n = qe(e) ? e(t) : e;
			n !== t && s.current?.(n);
		} else o(e);
	}, [
		c,
		t,
		o,
		s
	])];
}
function Ke({ defaultProp: t, onChange: n }) {
	let [r, i] = e.useState(t), a = e.useRef(r), o = e.useRef(n);
	return We(() => {
		o.current = n;
	}, [n]), e.useEffect(() => {
		a.current !== r && (o.current?.(r), a.current = r);
	}, [r, a]), [
		r,
		i,
		o
	];
}
function qe(e) {
	return typeof e == "function";
}
//#endregion
//#region node_modules/@radix-ui/react-direction/dist/index.mjs
var Je = e.createContext(void 0);
function Ye(t) {
	let n = e.useContext(Je);
	return t || n || "ltr";
}
//#endregion
//#region node_modules/@radix-ui/react-roving-focus/dist/index.mjs
var Xe = "rovingFocusGroup.onEntryFocus", Ze = {
	bubbles: !1,
	cancelable: !0
}, Qe = "RovingFocusGroup", [$e, et, tt] = ze(Qe), [nt, rt] = ke(Qe, [tt]), [it, at] = nt(Qe), ot = e.forwardRef((e, t) => /* @__PURE__ */ p($e.Provider, {
	scope: e.__scopeRovingFocusGroup,
	children: /* @__PURE__ */ p($e.Slot, {
		scope: e.__scopeRovingFocusGroup,
		children: /* @__PURE__ */ p(st, {
			...e,
			ref: t
		})
	})
}));
ot.displayName = Qe;
var st = e.forwardRef((t, n) => {
	let { __scopeRovingFocusGroup: r, orientation: i, loop: a = !1, dir: o, currentTabStopId: s, defaultCurrentTabStopId: c, onCurrentTabStopIdChange: l, onEntryFocus: u, preventScrollOnEntryFocus: d = !1, ...f } = t, m = e.useRef(null), h = H(n, m), g = Ye(o), [_, v] = Ge({
		prop: s,
		defaultProp: c ?? null,
		onChange: l,
		caller: Qe
	}), [y, b] = e.useState(!1), x = Ue(u), S = et(r), C = e.useRef(!1), [w, T] = e.useState(0);
	return e.useEffect(() => {
		let e = m.current;
		if (e) return e.addEventListener(Xe, x), () => e.removeEventListener(Xe, x);
	}, [x]), /* @__PURE__ */ p(it, {
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
					let t = new CustomEvent(Xe, Ze);
					if (e.currentTarget.dispatchEvent(t), !t.defaultPrevented) {
						let e = S().filter((e) => e.focusable);
						pt([
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
}), ct = "RovingFocusGroupItem", lt = e.forwardRef((t, n) => {
	let { __scopeRovingFocusGroup: r, focusable: i = !0, active: a = !1, tabStopId: o, children: s, ...c } = t, l = He(), u = o || l, d = at(ct, r), f = d.currentTabStopId === u, m = et(r), { onFocusableItemAdd: h, onFocusableItemRemove: g, currentTabStopId: _ } = d;
	return e.useEffect(() => {
		if (i) return h(), () => g();
	}, [
		i,
		h,
		g
	]), /* @__PURE__ */ p($e.ItemSlot, {
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
				let t = ft(e, d.orientation, d.dir);
				if (t !== void 0) {
					if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
					e.preventDefault();
					let n = m().filter((e) => e.focusable).map((e) => e.ref.current);
					if (t === "last") n.reverse();
					else if (t === "prev" || t === "next") {
						t === "prev" && n.reverse();
						let r = n.indexOf(e.currentTarget);
						n = d.loop ? mt(n, r + 1) : n.slice(r + 1);
					}
					setTimeout(() => pt(n));
				}
			}),
			children: typeof s == "function" ? s({
				isCurrentTabStop: f,
				hasTabStop: _ != null
			}) : s
		})
	});
});
lt.displayName = ct;
var ut = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function dt(e, t) {
	return t === "rtl" ? e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e : e;
}
function ft(e, t, n) {
	let r = dt(e.key, n);
	if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r))) return ut[r];
}
function pt(e, t = !1) {
	let n = document.activeElement;
	for (let r of e) if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function mt(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
var ht = ot, gt = lt;
//#endregion
//#region node_modules/@radix-ui/react-use-size/dist/index.mjs
function _t(t) {
	let [n, r] = e.useState(void 0);
	return W(() => {
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
function vt(t) {
	let n = e.useRef({
		value: t,
		previous: t
	});
	return e.useMemo(() => (n.current.value !== t && (n.current.previous = n.current.value, n.current.value = t), n.current.previous), [t]);
}
//#endregion
//#region node_modules/@radix-ui/react-presence/dist/index.mjs
function yt(t, n) {
	return e.useReducer((e, t) => n[e][t] ?? e, t);
}
var bt = (t) => {
	let { present: n, children: r } = t, i = xt(n), a = typeof r == "function" ? r({ present: i.isPresent }) : e.Children.only(r), o = H(i.ref, Ct(a));
	return typeof r == "function" || i.isPresent ? e.cloneElement(a, { ref: o }) : null;
};
bt.displayName = "Presence";
function xt(t) {
	let [n, r] = e.useState(), i = e.useRef(null), a = e.useRef(t), o = e.useRef("none"), [s, c] = yt(t ? "mounted" : "unmounted", {
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
		let e = St(i.current);
		o.current = s === "mounted" ? e : "none";
	}, [s]), W(() => {
		let e = i.current, n = a.current;
		if (n !== t) {
			let r = o.current, i = St(e);
			t ? c("MOUNT") : i === "none" || e?.display === "none" ? c("UNMOUNT") : c(n && r !== i ? "ANIMATION_OUT" : "UNMOUNT"), a.current = t;
		}
	}, [t, c]), W(() => {
		if (n) {
			let e, t = n.ownerDocument.defaultView ?? window, r = (r) => {
				let o = St(i.current).includes(CSS.escape(r.animationName));
				if (r.target === n && o && (c("ANIMATION_END"), !a.current)) {
					let r = n.style.animationFillMode;
					n.style.animationFillMode = "forwards", e = t.setTimeout(() => {
						n.style.animationFillMode === "forwards" && (n.style.animationFillMode = r);
					});
				}
			}, s = (e) => {
				e.target === n && (o.current = St(i.current));
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
function St(e) {
	return e?.animationName || "none";
}
function Ct(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-radio-group/dist/index.mjs
var wt = "Radio", [Tt, Et] = ke(wt), [Dt, Ot] = Tt(wt), kt = e.forwardRef((t, n) => {
	let { __scopeRadio: r, name: i, checked: a = !1, required: o, disabled: s, value: c = "on", onCheck: l, form: u, ...d } = t, [f, h] = e.useState(null), g = H(n, (e) => h(e)), _ = e.useRef(!1), v = f ? u || !!f.closest("form") : !0;
	return /* @__PURE__ */ m(Dt, {
		scope: r,
		checked: a,
		disabled: s,
		children: [/* @__PURE__ */ p(U.button, {
			type: "button",
			role: "radio",
			"aria-checked": a,
			"data-state": Pt(a),
			"data-disabled": s ? "" : void 0,
			disabled: s,
			value: c,
			...d,
			ref: g,
			onClick: V(t.onClick, (e) => {
				a || l?.(), v && (_.current = e.isPropagationStopped(), _.current || e.stopPropagation());
			})
		}), v && /* @__PURE__ */ p(Nt, {
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
kt.displayName = wt;
var At = "RadioIndicator", jt = e.forwardRef((e, t) => {
	let { __scopeRadio: n, forceMount: r, ...i } = e, a = Ot(At, n);
	return /* @__PURE__ */ p(bt, {
		present: r || a.checked,
		children: /* @__PURE__ */ p(U.span, {
			"data-state": Pt(a.checked),
			"data-disabled": a.disabled ? "" : void 0,
			...i,
			ref: t
		})
	});
});
jt.displayName = At;
var Mt = "RadioBubbleInput", Nt = e.forwardRef(({ __scopeRadio: t, control: n, checked: r, bubbles: i = !0, ...a }, o) => {
	let s = e.useRef(null), c = H(s, o), l = vt(r), u = _t(n);
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
Nt.displayName = Mt;
function Pt(e) {
	return e ? "checked" : "unchecked";
}
var Ft = [
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight"
], It = "RadioGroup", [Lt, Rt] = ke(It, [rt, Et]), zt = rt(), Bt = Et(), [Vt, Ht] = Lt(It), Ut = e.forwardRef((e, t) => {
	let { __scopeRadioGroup: n, name: r, defaultValue: i, value: a, required: o = !1, disabled: s = !1, orientation: c, dir: l, loop: u = !0, onValueChange: d, ...f } = e, m = zt(n), h = Ye(l), [g, _] = Ge({
		prop: a,
		defaultProp: i ?? null,
		onChange: d,
		caller: It
	});
	return /* @__PURE__ */ p(Vt, {
		scope: n,
		name: r,
		required: o,
		disabled: s,
		value: g,
		onValueChange: _,
		children: /* @__PURE__ */ p(ht, {
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
Ut.displayName = It;
var Wt = "RadioGroupItem", Gt = e.forwardRef((t, n) => {
	let { __scopeRadioGroup: r, disabled: i, ...a } = t, o = Ht(Wt, r), s = o.disabled || i, c = zt(r), l = Bt(r), u = e.useRef(null), d = H(n, u), f = o.value === a.value, m = e.useRef(!1);
	return e.useEffect(() => {
		let e = (e) => {
			Ft.includes(e.key) && (m.current = !0);
		}, t = () => m.current = !1;
		return document.addEventListener("keydown", e), document.addEventListener("keyup", t), () => {
			document.removeEventListener("keydown", e), document.removeEventListener("keyup", t);
		};
	}, []), /* @__PURE__ */ p(gt, {
		asChild: !0,
		...c,
		focusable: !s,
		active: f,
		children: /* @__PURE__ */ p(kt, {
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
Gt.displayName = Wt;
var Kt = "RadioGroupIndicator", qt = e.forwardRef((e, t) => {
	let { __scopeRadioGroup: n, ...r } = e;
	return /* @__PURE__ */ p(jt, {
		...Bt(n),
		...r,
		ref: t
	});
});
qt.displayName = Kt;
var Jt = Ut, Yt = Gt, Xt = qt, Zt = {
	root: "_root_snkcc_1",
	itemWrapper: "_itemWrapper_snkcc_7",
	radioItem: "_radioItem_snkcc_14",
	indicator: "_indicator_snkcc_45",
	icon: "_icon_snkcc_53",
	label: "_label_snkcc_60",
	labelText: "_labelText_snkcc_70",
	labelTextDisabled: "_labelTextDisabled_snkcc_76"
}, Qt = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p(Jt, {
	className: x(Zt.root, e),
	...t,
	ref: n
}));
Qt.displayName = Jt.displayName;
var $t = e.forwardRef(({ className: t, label: n, id: r, ...i }, a) => {
	let o = e.useId(), s = r || o;
	return /* @__PURE__ */ m("div", {
		className: Zt.itemWrapper,
		children: [/* @__PURE__ */ p(Yt, {
			ref: a,
			id: s,
			className: x(Zt.radioItem, t),
			...i,
			children: /* @__PURE__ */ p(Xt, {
				className: Zt.indicator,
				children: /* @__PURE__ */ p(oe, { className: Zt.icon })
			})
		}), n && /* @__PURE__ */ p("label", {
			htmlFor: s,
			className: Zt.label,
			children: /* @__PURE__ */ p(D, {
				as: "span",
				variant: "p",
				className: x(Zt.labelText, i.disabled && Zt.labelTextDisabled),
				style: { color: "var(--color-secundaria)" },
				children: n
			})
		})]
	});
});
$t.displayName = "RadioItem";
//#endregion
//#region node_modules/@radix-ui/number/dist/index.mjs
function en(e, [t, n]) {
	return Math.min(n, Math.max(t, e));
}
//#endregion
//#region node_modules/@radix-ui/react-slider/dist/index.mjs
var tn = ["PageUp", "PageDown"], nn = [
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight"
], rn = {
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
}, an = "Slider", [on, sn, cn] = ze(an), [ln, un] = ke(an, [cn]), [dn, fn] = ln(an), pn = e.forwardRef((t, n) => {
	let { name: r, min: i = 0, max: a = 100, step: o = 1, orientation: s = "horizontal", disabled: c = !1, minStepsBetweenThumbs: l = 0, defaultValue: u = [i], value: d, onValueChange: f = () => {}, onValueCommit: m = () => {}, inverted: h = !1, form: g, ..._ } = t, v = e.useRef(/* @__PURE__ */ new Set()), y = e.useRef(0), b = s === "horizontal" ? gn : _n, [x = [], S] = Ge({
		prop: d,
		defaultProp: u,
		onChange: (e) => {
			[...v.current][y.current]?.focus(), f(e);
		}
	}), C = e.useRef(x);
	function w(e) {
		D(e, jn(x, e));
	}
	function T(e) {
		D(e, y.current);
	}
	function E() {
		let e = C.current[y.current];
		x[y.current] !== e && m(x);
	}
	function D(e, t, { commit: n } = { commit: !1 }) {
		let r = In(o), s = en(Ln(Math.round((e - i) / o) * o + i, r), [i, a]);
		S((e = []) => {
			let r = On(e, s, t);
			if (Pn(r, l * o)) {
				y.current = r.indexOf(s);
				let t = String(r) !== String(e);
				return t && n && m(r), t ? r : e;
			} else return e;
		});
	}
	return /* @__PURE__ */ p(dn, {
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
		children: /* @__PURE__ */ p(on.Provider, {
			scope: t.__scopeSlider,
			children: /* @__PURE__ */ p(on.Slot, {
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
							let n = tn.includes(e.key) || e.shiftKey && nn.includes(e.key) ? 10 : 1, r = y.current, i = x[r];
							D(i + o * n * t, r, { commit: !0 });
						}
					}
				})
			})
		})
	});
});
pn.displayName = an;
var [mn, hn] = ln(an, {
	startEdge: "left",
	endEdge: "right",
	size: "width",
	direction: 1
}), gn = e.forwardRef((t, n) => {
	let { min: r, max: i, dir: a, inverted: o, onSlideStart: s, onSlideMove: c, onSlideEnd: l, onStepKeyDown: u, ...d } = t, [f, m] = e.useState(null), h = H(n, (e) => m(e)), g = e.useRef(void 0), _ = Ye(a), v = _ === "ltr", y = v && !o || !v && o;
	function b(e) {
		let t = g.current || f.getBoundingClientRect(), n = Fn([0, t.width], y ? [r, i] : [i, r]);
		return g.current = t, n(e - t.left);
	}
	return /* @__PURE__ */ p(mn, {
		scope: t.__scopeSlider,
		startEdge: y ? "left" : "right",
		endEdge: y ? "right" : "left",
		direction: y ? 1 : -1,
		size: "width",
		children: /* @__PURE__ */ p(vn, {
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
				let t = rn[y ? "from-left" : "from-right"].includes(e.key);
				u?.({
					event: e,
					direction: t ? -1 : 1
				});
			}
		})
	});
}), _n = e.forwardRef((t, n) => {
	let { min: r, max: i, inverted: a, onSlideStart: o, onSlideMove: s, onSlideEnd: c, onStepKeyDown: l, ...u } = t, d = e.useRef(null), f = H(n, d), m = e.useRef(void 0), h = !a;
	function g(e) {
		let t = m.current || d.current.getBoundingClientRect(), n = Fn([0, t.height], h ? [i, r] : [r, i]);
		return m.current = t, n(e - t.top);
	}
	return /* @__PURE__ */ p(mn, {
		scope: t.__scopeSlider,
		startEdge: h ? "bottom" : "top",
		endEdge: h ? "top" : "bottom",
		size: "height",
		direction: h ? 1 : -1,
		children: /* @__PURE__ */ p(vn, {
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
				let t = rn[h ? "from-bottom" : "from-top"].includes(e.key);
				l?.({
					event: e,
					direction: t ? -1 : 1
				});
			}
		})
	});
}), vn = e.forwardRef((e, t) => {
	let { __scopeSlider: n, onSlideStart: r, onSlideMove: i, onSlideEnd: a, onHomeKeyDown: o, onEndKeyDown: s, onStepKeyDown: c, ...l } = e, u = fn(an, n);
	return /* @__PURE__ */ p(U.span, {
		...l,
		ref: t,
		onKeyDown: V(e.onKeyDown, (e) => {
			e.key === "Home" ? (o(e), e.preventDefault()) : e.key === "End" ? (s(e), e.preventDefault()) : tn.concat(nn).includes(e.key) && (c(e), e.preventDefault());
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
}), yn = "SliderTrack", bn = e.forwardRef((e, t) => {
	let { __scopeSlider: n, ...r } = e, i = fn(yn, n);
	return /* @__PURE__ */ p(U.span, {
		"data-disabled": i.disabled ? "" : void 0,
		"data-orientation": i.orientation,
		...r,
		ref: t
	});
});
bn.displayName = yn;
var xn = "SliderRange", Sn = e.forwardRef((t, n) => {
	let { __scopeSlider: r, ...i } = t, a = fn(xn, r), o = hn(xn, r), s = H(n, e.useRef(null)), c = a.values.length, l = a.values.map((e) => kn(e, a.min, a.max)), u = c > 1 ? Math.min(...l) : 0, d = 100 - Math.max(...l);
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
Sn.displayName = xn;
var Cn = "SliderThumb", wn = e.forwardRef((t, n) => {
	let r = sn(t.__scopeSlider), [i, a] = e.useState(null), o = H(n, (e) => a(e)), s = e.useMemo(() => i ? r().findIndex((e) => e.ref.current === i) : -1, [r, i]);
	return /* @__PURE__ */ p(Tn, {
		...t,
		ref: o,
		index: s
	});
}), Tn = e.forwardRef((t, n) => {
	let { __scopeSlider: r, index: i, name: a, ...o } = t, s = fn(Cn, r), c = hn(Cn, r), [l, u] = e.useState(null), d = H(n, (e) => u(e)), f = l ? s.form || !!l.closest("form") : !0, h = _t(l), g = s.values[i], _ = g === void 0 ? 0 : kn(g, s.min, s.max), v = An(i, s.values.length), y = h?.[c.size], b = y ? Mn(y, _, c.direction) : 0;
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
		children: [/* @__PURE__ */ p(on.ItemSlot, {
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
		}), f && /* @__PURE__ */ p(Dn, {
			name: a ?? (s.name ? s.name + (s.values.length > 1 ? "[]" : "") : void 0),
			form: s.form,
			value: g
		}, i)]
	});
});
wn.displayName = Cn;
var En = "RadioBubbleInput", Dn = e.forwardRef(({ __scopeSlider: t, value: n, ...r }, i) => {
	let a = e.useRef(null), o = H(a, i), s = vt(n);
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
Dn.displayName = En;
function On(e = [], t, n) {
	let r = [...e];
	return r[n] = t, r.sort((e, t) => e - t);
}
function kn(e, t, n) {
	return en(100 / (n - t) * (e - t), [0, 100]);
}
function An(e, t) {
	if (t > 2) return `Value ${e + 1} of ${t}`;
	if (t === 2) return ["Minimum", "Maximum"][e];
}
function jn(e, t) {
	if (e.length === 1) return 0;
	let n = e.map((e) => Math.abs(e - t)), r = Math.min(...n);
	return n.indexOf(r);
}
function Mn(e, t, n) {
	let r = e / 2;
	return (r - Fn([0, 50], [0, r])(t) * n) * n;
}
function Nn(e) {
	return e.slice(0, -1).map((t, n) => e[n + 1] - t);
}
function Pn(e, t) {
	if (t > 0) {
		let n = Nn(e);
		return Math.min(...n) >= t;
	}
	return !0;
}
function Fn(e, t) {
	return (n) => {
		if (e[0] === e[1] || t[0] === t[1]) return t[0];
		let r = (t[1] - t[0]) / (e[1] - e[0]);
		return t[0] + r * (n - e[0]);
	};
}
function In(e) {
	return (String(e).split(".")[1] || "").length;
}
function Ln(e, t) {
	let n = 10 ** t;
	return Math.round(e * n) / n;
}
var Rn = pn, zn = bn, Bn = Sn, Vn = wn, Hn = {
	root: "_root_16rpy_1",
	track: "_track_16rpy_12",
	range: "_range_16rpy_23",
	thumb: "_thumb_16rpy_29"
}, Un = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(Rn, {
	ref: n,
	className: x(Hn.root, e),
	...t,
	children: [/* @__PURE__ */ p(zn, {
		className: Hn.track,
		children: /* @__PURE__ */ p(Bn, { className: Hn.range })
	}), /* @__PURE__ */ p(Vn, { className: Hn.thumb })]
}));
Un.displayName = Rn.displayName;
//#endregion
//#region node_modules/@radix-ui/react-switch/dist/index.mjs
var Wn = "Switch", [Gn, Kn] = ke(Wn), [qn, Jn] = Gn(Wn), Yn = e.forwardRef((t, n) => {
	let { __scopeSwitch: r, name: i, checked: a, defaultChecked: o, required: s, disabled: c, value: l = "on", onCheckedChange: u, form: d, ...f } = t, [h, g] = e.useState(null), _ = H(n, (e) => g(e)), v = e.useRef(!1), y = h ? d || !!h.closest("form") : !0, [b, x] = Ge({
		prop: a,
		defaultProp: o ?? !1,
		onChange: u,
		caller: Wn
	});
	return /* @__PURE__ */ m(qn, {
		scope: r,
		checked: b,
		disabled: c,
		children: [/* @__PURE__ */ p(U.button, {
			type: "button",
			role: "switch",
			"aria-checked": b,
			"aria-required": s,
			"data-state": er(b),
			"data-disabled": c ? "" : void 0,
			disabled: c,
			value: l,
			...f,
			ref: _,
			onClick: V(t.onClick, (e) => {
				x((e) => !e), y && (v.current = e.isPropagationStopped(), v.current || e.stopPropagation());
			})
		}), y && /* @__PURE__ */ p($n, {
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
Yn.displayName = Wn;
var Xn = "SwitchThumb", Zn = e.forwardRef((e, t) => {
	let { __scopeSwitch: n, ...r } = e, i = Jn(Xn, n);
	return /* @__PURE__ */ p(U.span, {
		"data-state": er(i.checked),
		"data-disabled": i.disabled ? "" : void 0,
		...r,
		ref: t
	});
});
Zn.displayName = Xn;
var Qn = "SwitchBubbleInput", $n = e.forwardRef(({ __scopeSwitch: t, control: n, checked: r, bubbles: i = !0, ...a }, o) => {
	let s = e.useRef(null), c = H(s, o), l = vt(r), u = _t(n);
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
$n.displayName = Qn;
function er(e) {
	return e ? "checked" : "unchecked";
}
var tr = Yn, nr = Zn, rr = {
	container: "_container_1pb6t_1",
	root: "_root_1pb6t_9",
	thumb: "_thumb_1pb6t_37",
	label: "_label_1pb6t_57",
	labelText: "_labelText_1pb6t_67",
	labelTextDisabled: "_labelTextDisabled_1pb6t_73"
}, ir = e.forwardRef(({ className: t, label: n, id: r, ...i }, a) => {
	let o = e.useId(), s = r || o;
	return /* @__PURE__ */ m("div", {
		className: rr.container,
		children: [/* @__PURE__ */ p(tr, {
			id: s,
			className: x(rr.root, t),
			...i,
			ref: a,
			children: /* @__PURE__ */ p(nr, { className: rr.thumb })
		}), n && /* @__PURE__ */ p("label", {
			htmlFor: s,
			className: rr.label,
			children: /* @__PURE__ */ p(D, {
				as: "span",
				variant: "p",
				className: x(rr.labelText, i.disabled && rr.labelTextDisabled),
				style: { color: "var(--color-secundaria)" },
				children: n
			})
		})]
	});
});
ir.displayName = "Switch";
var ar = {
	container: "_container_1sx4n_1",
	label: "_label_1sx4n_10",
	trigger: "_trigger_1sx4n_16",
	triggerOpen: "_triggerOpen_1sx4n_32",
	triggerError: "_triggerError_1sx4n_38",
	inputField: "_inputField_1sx4n_42",
	chevron: "_chevron_1sx4n_56",
	dropdown: "_dropdown_1sx4n_66",
	slideDown: "_slideDown_1sx4n_1",
	option: "_option_1sx4n_82",
	optionSelected: "_optionSelected_1sx4n_98",
	noOptions: "_noOptions_1sx4n_103",
	removeBadgeBtn: "_removeBadgeBtn_1sx4n_122",
	checkIcon: "_checkIcon_1sx4n_139",
	errorMessage: "_errorMessage_1sx4n_143"
}, or = i(({ className: e, options: t, value: n, defaultValue: r, onChange: i, label: a, error: o, placeholder: c = "Selecione...", id: l, ...f }, h) => {
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
		className: x(ar.container, e),
		ref: C,
		children: [
			a && /* @__PURE__ */ p("label", {
				htmlFor: E,
				className: ar.label,
				children: a
			}),
			/* @__PURE__ */ m("div", {
				className: x(ar.trigger, T && ar.triggerError, v && ar.triggerOpen),
				onClick: () => y(!0),
				children: [
					M.map((e) => /* @__PURE__ */ m(A, {
						intent: "primaria",
						variant: "ghost",
						children: [e.label, /* @__PURE__ */ p("button", {
							type: "button",
							className: ar.removeBadgeBtn,
							onClick: (t) => {
								t.stopPropagation(), k(e.value);
							},
							children: /* @__PURE__ */ p(pe, { size: 12 })
						})]
					}, e.value)),
					/* @__PURE__ */ p("input", {
						id: E,
						ref: h,
						type: "text",
						className: ar.inputField,
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
					/* @__PURE__ */ p(te, {
						size: 16,
						className: ar.chevron
					})
				]
			}),
			v && /* @__PURE__ */ p("div", {
				className: ar.dropdown,
				children: D.length === 0 ? /* @__PURE__ */ p("div", {
					className: ar.noOptions,
					children: "Nenhuma opção encontrada"
				}) : D.map((e) => {
					let t = w.includes(e.value);
					return /* @__PURE__ */ m("div", {
						className: x(ar.option, t && ar.optionSelected),
						onClick: (t) => {
							t.stopPropagation(), O(e.value), document.getElementById(E || "")?.focus();
						},
						children: [e.label, t && /* @__PURE__ */ p(z, {
							size: 16,
							className: ar.checkIcon
						})]
					}, e.value);
				})
			}),
			o && /* @__PURE__ */ p("span", {
				className: ar.errorMessage,
				children: o
			})
		]
	});
});
or.displayName = "MultiSelect";
var sr = {
	container: "_container_1i57z_1",
	label: "_label_1i57z_10",
	triggerWrapper: "_triggerWrapper_1i57z_16",
	inputField: "_inputField_1i57z_22",
	icon: "_icon_1i57z_46",
	iconOpen: "_iconOpen_1i57z_56",
	dropdown: "_dropdown_1i57z_61",
	slideDown: "_slideDown_1i57z_1",
	option: "_option_1i57z_77",
	optionSelected: "_optionSelected_1i57z_93",
	noResults: "_noResults_1i57z_98",
	inputError: "_inputError_1i57z_117",
	checkIcon: "_checkIcon_1i57z_121",
	errorMessage: "_errorMessage_1i57z_125"
}, cr = i(({ className: e, options: t, value: n, onChange: r, label: i, error: a, placeholder: o = "Selecione...", ...c }, l) => {
	let [f, h] = d(!1), [g, _] = d(""), v = u(null), y = t.find((e) => e.value === n), b = t.filter((e) => e.label.toLowerCase().includes(g.toLowerCase())), S = (e) => {
		r?.(e.value), _(e.label), h(!1);
	};
	return s(() => {
		f || _(y?.label || "");
	}, [y, f]), s(() => {
		let e = (e) => {
			v.current && !v.current.contains(e.target) && (h(!1), _(y?.label || ""));
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [y]), /* @__PURE__ */ m("div", {
		className: x(sr.container, e),
		ref: v,
		children: [
			i && /* @__PURE__ */ p("label", {
				className: sr.label,
				children: i
			}),
			/* @__PURE__ */ m("div", {
				className: sr.triggerWrapper,
				children: [/* @__PURE__ */ p("input", {
					ref: l,
					type: "text",
					className: x(sr.inputField, a && sr.inputError),
					placeholder: o,
					value: g,
					onChange: (e) => {
						_(e.target.value), h(!0);
					},
					onFocus: () => {
						_(""), h(!0);
					},
					...c
				}), /* @__PURE__ */ p(te, {
					size: 18,
					className: x(sr.icon, f && sr.iconOpen)
				})]
			}),
			f && /* @__PURE__ */ p("div", {
				className: sr.dropdown,
				children: b.length > 0 ? b.map((e) => /* @__PURE__ */ m("div", {
					className: x(sr.option, n === e.value && sr.optionSelected),
					onClick: () => S(e),
					children: [e.label, n === e.value && /* @__PURE__ */ p(z, {
						size: 16,
						className: sr.checkIcon
					})]
				}, e.value)) : /* @__PURE__ */ p("div", {
					className: sr.noResults,
					children: "Nenhum resultado encontrado."
				})
			}),
			a && /* @__PURE__ */ p("span", {
				className: sr.errorMessage,
				children: a
			})
		]
	});
});
cr.displayName = "Combobox";
var G = {
	container: "_container_ilie6_1",
	label: "_label_ilie6_9",
	dropzone: "_dropzone_ilie6_15",
	idle: "_idle_ilie6_35",
	dragging: "_dragging_ilie6_40",
	uploading: "_uploading_ilie6_46",
	success: "_success_ilie6_51",
	error: "_error_ilie6_57",
	fileCard: "_fileCard_ilie6_68",
	errorMessage: "_errorMessage_ilie6_80",
	hiddenInput: "_hiddenInput_ilie6_87",
	idleContent: "_idleContent_ilie6_92",
	uploadingContent: "_uploadingContent_ilie6_93",
	successContent: "_successContent_ilie6_94",
	uploadIcon: "_uploadIcon_ilie6_105",
	uploadIconError: "_uploadIconError_ilie6_110",
	uploadText: "_uploadText_ilie6_115",
	uploadClickText: "_uploadClickText_ilie6_121",
	uploadHint: "_uploadHint_ilie6_126",
	spinner: "_spinner_ilie6_133",
	uploadingText: "_uploadingText_ilie6_137",
	uploadPulse: "_uploadPulse_ilie6_1",
	successIcon: "_successIcon_ilie6_149",
	fileInfo: "_fileInfo_ilie6_155",
	fileName: "_fileName_ilie6_161",
	fileSize: "_fileSize_ilie6_169",
	fileIcon: "_fileIcon_ilie6_174",
	fileClearBtn: "_fileClearBtn_ilie6_180"
}, lr = (e) => {
	if (!+e) return "0 Bytes";
	let t = 1024, n = [
		"Bytes",
		"KB",
		"MB",
		"GB"
	], r = Math.floor(Math.log(e) / Math.log(t));
	return `${parseFloat((e / t ** +r).toFixed(2))} ${n[r]}`;
}, ur = i(({ className: e, onFileSelect: t, accept: n, maxSize: r = 5 * 1024 * 1024, label: i, error: a, id: o, ...s }, c) => {
	let [l, f] = d("idle"), [h, g] = d(null), [_, v] = d(""), y = u(null), b = !!a || !!_, S = a || _, C = o || (i ? `fileupload-${i.replace(/\s+/g, "-").toLowerCase()}` : void 0), w = (e) => {
		if (r && e.size > r) {
			f("error"), v(`O arquivo excede o limite de ${lr(r)}`);
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
							/* @__PURE__ */ p(se, {
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
								children: ["Até ", lr(r)]
							})
						]
					}),
					l === "uploading" && /* @__PURE__ */ m("div", {
						className: G.uploadingContent,
						children: [/* @__PURE__ */ p(ge, {
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
						children: [/* @__PURE__ */ p(ae, {
							size: 32,
							className: G.successIcon
						}), /* @__PURE__ */ m("div", {
							className: G.fileCard,
							children: [
								/* @__PURE__ */ p(B, {
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
										children: lr(h.size)
									})]
								}),
								/* @__PURE__ */ p("button", {
									type: "button",
									onClick: (e) => {
										e.stopPropagation(), E();
									},
									className: G.fileClearBtn,
									children: /* @__PURE__ */ p(pe, { size: 16 })
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
ur.displayName = "FileUpload";
//#endregion
//#region node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs
function dr(t, n = globalThis?.document) {
	let r = Ue(t);
	e.useEffect(() => {
		let e = (e) => {
			e.key === "Escape" && r(e);
		};
		return n.addEventListener("keydown", e, { capture: !0 }), () => n.removeEventListener("keydown", e, { capture: !0 });
	}, [r, n]);
}
//#endregion
//#region node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
var fr = "DismissableLayer", pr = "dismissableLayer.update", mr = "dismissableLayer.pointerDownOutside", hr = "dismissableLayer.focusOutside", gr, _r = e.createContext({
	layers: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	branches: /* @__PURE__ */ new Set()
}), vr = e.forwardRef((t, n) => {
	let { disableOutsidePointerEvents: r = !1, onEscapeKeyDown: i, onPointerDownOutside: a, onFocusOutside: o, onInteractOutside: s, onDismiss: c, ...l } = t, u = e.useContext(_r), [d, f] = e.useState(null), m = d?.ownerDocument ?? globalThis?.document, [, h] = e.useState({}), g = H(n, (e) => f(e)), _ = Array.from(u.layers), [v] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), y = _.indexOf(v), b = d ? _.indexOf(d) : -1, x = u.layersWithOutsidePointerEventsDisabled.size > 0, S = b >= y, C = xr((e) => {
		let t = e.target, n = [...u.branches].some((e) => e.contains(t));
		!S || n || (a?.(e), s?.(e), e.defaultPrevented || c?.());
	}, m), w = Sr((e) => {
		let t = e.target;
		[...u.branches].some((e) => e.contains(t)) || (o?.(e), s?.(e), e.defaultPrevented || c?.());
	}, m);
	return dr((e) => {
		b === u.layers.size - 1 && (i?.(e), !e.defaultPrevented && c && (e.preventDefault(), c()));
	}, m), e.useEffect(() => {
		if (d) return r && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (gr = m.body.style.pointerEvents, m.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(d)), u.layers.add(d), Cr(), () => {
			r && u.layersWithOutsidePointerEventsDisabled.size === 1 && (m.body.style.pointerEvents = gr);
		};
	}, [
		d,
		m,
		r,
		u
	]), e.useEffect(() => () => {
		d && (u.layers.delete(d), u.layersWithOutsidePointerEventsDisabled.delete(d), Cr());
	}, [d, u]), e.useEffect(() => {
		let e = () => h({});
		return document.addEventListener(pr, e), () => document.removeEventListener(pr, e);
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
vr.displayName = fr;
var yr = "DismissableLayerBranch", br = e.forwardRef((t, n) => {
	let r = e.useContext(_r), i = e.useRef(null), a = H(n, i);
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
br.displayName = yr;
function xr(t, n = globalThis?.document) {
	let r = Ue(t), i = e.useRef(!1), a = e.useRef(() => {});
	return e.useEffect(() => {
		let e = (e) => {
			if (e.target && !i.current) {
				let t = function() {
					wr(mr, r, i, { discrete: !0 });
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
function Sr(t, n = globalThis?.document) {
	let r = Ue(t), i = e.useRef(!1);
	return e.useEffect(() => {
		let e = (e) => {
			e.target && !i.current && wr(hr, r, { originalEvent: e }, { discrete: !1 });
		};
		return n.addEventListener("focusin", e), () => n.removeEventListener("focusin", e);
	}, [n, r]), {
		onFocusCapture: () => i.current = !0,
		onBlurCapture: () => i.current = !1
	};
}
function Cr() {
	let e = new CustomEvent(pr);
	document.dispatchEvent(e);
}
function wr(e, t, n, { discrete: r }) {
	let i = n.originalEvent.target, a = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && i.addEventListener(e, t, { once: !0 }), r ? Re(i, a) : i.dispatchEvent(a);
}
//#endregion
//#region node_modules/@radix-ui/react-focus-guards/dist/index.mjs
var Tr = 0;
function Er() {
	e.useEffect(() => {
		let e = document.querySelectorAll("[data-radix-focus-guard]");
		return document.body.insertAdjacentElement("afterbegin", e[0] ?? Dr()), document.body.insertAdjacentElement("beforeend", e[1] ?? Dr()), Tr++, () => {
			Tr === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((e) => e.remove()), Tr--;
		};
	}, []);
}
function Dr() {
	let e = document.createElement("span");
	return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
//#endregion
//#region node_modules/@radix-ui/react-focus-scope/dist/index.mjs
var Or = "focusScope.autoFocusOnMount", kr = "focusScope.autoFocusOnUnmount", Ar = {
	bubbles: !1,
	cancelable: !0
}, jr = "FocusScope", Mr = e.forwardRef((t, n) => {
	let { loop: r = !1, trapped: i = !1, onMountAutoFocus: a, onUnmountAutoFocus: o, ...s } = t, [c, l] = e.useState(null), u = Ue(a), d = Ue(o), f = e.useRef(null), m = H(n, (e) => l(e)), h = e.useRef({
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
				c.contains(t) ? f.current = t : zr(f.current, { select: !0 });
			}, t = function(e) {
				if (h.paused || !c) return;
				let t = e.relatedTarget;
				t !== null && (c.contains(t) || zr(f.current, { select: !0 }));
			}, n = function(e) {
				if (document.activeElement === document.body) for (let t of e) t.removedNodes.length > 0 && zr(c);
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
			Br.add(h);
			let e = document.activeElement;
			if (!c.contains(e)) {
				let t = new CustomEvent(Or, Ar);
				c.addEventListener(Or, u), c.dispatchEvent(t), t.defaultPrevented || (Nr(Ur(Fr(c)), { select: !0 }), document.activeElement === e && zr(c));
			}
			return () => {
				c.removeEventListener(Or, u), setTimeout(() => {
					let t = new CustomEvent(kr, Ar);
					c.addEventListener(kr, d), c.dispatchEvent(t), t.defaultPrevented || zr(e ?? document.body, { select: !0 }), c.removeEventListener(kr, d), Br.remove(h);
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
			let t = e.currentTarget, [i, a] = Pr(t);
			i && a ? !e.shiftKey && n === a ? (e.preventDefault(), r && zr(i, { select: !0 })) : e.shiftKey && n === i && (e.preventDefault(), r && zr(a, { select: !0 })) : n === t && e.preventDefault();
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
Mr.displayName = jr;
function Nr(e, { select: t = !1 } = {}) {
	let n = document.activeElement;
	for (let r of e) if (zr(r, { select: t }), document.activeElement !== n) return;
}
function Pr(e) {
	let t = Fr(e);
	return [Ir(t, e), Ir(t.reverse(), e)];
}
function Fr(e) {
	let t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (e) => {
		let t = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
function Ir(e, t) {
	for (let n of e) if (!Lr(n, { upTo: t })) return n;
}
function Lr(e, { upTo: t }) {
	if (getComputedStyle(e).visibility === "hidden") return !0;
	for (; e;) {
		if (t !== void 0 && e === t) return !1;
		if (getComputedStyle(e).display === "none") return !0;
		e = e.parentElement;
	}
	return !1;
}
function Rr(e) {
	return e instanceof HTMLInputElement && "select" in e;
}
function zr(e, { select: t = !1 } = {}) {
	if (e && e.focus) {
		let n = document.activeElement;
		e.focus({ preventScroll: !0 }), e !== n && Rr(e) && t && e.select();
	}
}
var Br = Vr();
function Vr() {
	let e = [];
	return {
		add(t) {
			let n = e[0];
			t !== n && n?.pause(), e = Hr(e, t), e.unshift(t);
		},
		remove(t) {
			e = Hr(e, t), e[0]?.resume();
		}
	};
}
function Hr(e, t) {
	let n = [...e], r = n.indexOf(t);
	return r !== -1 && n.splice(r, 1), n;
}
function Ur(e) {
	return e.filter((e) => e.tagName !== "A");
}
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var Wr = [
	"top",
	"right",
	"bottom",
	"left"
], Gr = Math.min, Kr = Math.max, qr = Math.round, Jr = Math.floor, Yr = (e) => ({
	x: e,
	y: e
}), Xr = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Zr(e, t, n) {
	return Kr(e, Gr(t, n));
}
function Qr(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function $r(e) {
	return e.split("-")[0];
}
function ei(e) {
	return e.split("-")[1];
}
function ti(e) {
	return e === "x" ? "y" : "x";
}
function ni(e) {
	return e === "y" ? "height" : "width";
}
function ri(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function ii(e) {
	return ti(ri(e));
}
function ai(e, t, n) {
	n === void 0 && (n = !1);
	let r = ei(e), i = ii(e), a = ni(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = mi(o)), [o, mi(o)];
}
function oi(e) {
	let t = mi(e);
	return [
		si(e),
		t,
		si(t)
	];
}
function si(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var ci = ["left", "right"], li = ["right", "left"], ui = ["top", "bottom"], di = ["bottom", "top"];
function fi(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? li : ci : t ? ci : li;
		case "left":
		case "right": return t ? ui : di;
		default: return [];
	}
}
function pi(e, t, n, r) {
	let i = ei(e), a = fi($r(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(si)))), a;
}
function mi(e) {
	let t = $r(e);
	return Xr[t] + e.slice(t.length);
}
function hi(e) {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...e
	};
}
function gi(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : hi(e);
}
function _i(e) {
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
function vi(e, t, n) {
	let { reference: r, floating: i } = e, a = ri(t), o = ii(t), s = ni(o), c = $r(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
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
	switch (ei(t)) {
		case "start":
			p[o] -= f * (n && l ? -1 : 1);
			break;
		case "end":
			p[o] += f * (n && l ? -1 : 1);
			break;
	}
	return p;
}
async function yi(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = Qr(t, e), p = gi(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = _i(await i.getClippingRect({
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
	}, y = _i(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
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
var bi = 50, xi = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: yi
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = vi(l, r, c), f = r, p = 0, m = {};
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
		}, x && p < bi && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = vi(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, Si = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = Qr(e, t) || {};
		if (l == null) return {};
		let d = gi(u), f = {
			x: n,
			y: r
		}, p = ii(i), m = ni(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		(!C || !await (o.isElement == null ? void 0 : o.isElement(S))) && (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = Gr(d[_], T), D = Gr(d[v], T), O = E, k = C - h[m] - D, A = C / 2 - h[m] / 2 + w, j = Zr(O, A, k), M = !c.arrow && ei(i) != null && A !== j && a.reference[m] / 2 - (A < O ? E : D) - h[m] / 2 < 0, N = M ? A < O ? A - O : A - k : 0;
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
}), Ci = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = Qr(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = $r(r), _ = ri(o), v = $r(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [mi(o)] : oi(o)), x = p !== "none";
			!d && x && b.push(...pi(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = ai(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (!(u === "alignment" && _ !== ri(t)) || T.every((e) => ri(e.placement) === _ ? e.overflows[0] > 0 : !0))) return {
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
								let t = ri(e.placement);
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
function wi(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function Ti(e) {
	return Wr.some((t) => e[t] >= 0);
}
var Ei = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = Qr(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = wi(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: Ti(e)
					} };
				}
				case "escaped": {
					let e = wi(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: Ti(e)
					} };
				}
				default: return {};
			}
		}
	};
}, Di = /* @__PURE__ */ new Set(["left", "top"]);
async function Oi(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = $r(n), s = ei(n), c = ri(n) === "y", l = Di.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = Qr(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
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
var ki = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await Oi(t, e);
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
}, Ai = function(e) {
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
			} }, ...l } = Qr(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = ri($r(i)), p = ti(f), m = u[p], h = u[f];
			if (o) {
				let e = p === "y" ? "top" : "left", t = p === "y" ? "bottom" : "right", n = m + d[e], r = m - d[t];
				m = Zr(n, m, r);
			}
			if (s) {
				let e = f === "y" ? "top" : "left", t = f === "y" ? "bottom" : "right", n = h + d[e], r = h - d[t];
				h = Zr(n, h, r);
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
}, ji = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = Qr(e, t), u = {
				x: n,
				y: r
			}, d = ri(i), f = ti(d), p = u[f], m = u[d], h = Qr(s, t), g = typeof h == "number" ? {
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
				let e = f === "y" ? "width" : "height", t = Di.has($r(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, Mi = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			var n, r;
			let { placement: i, rects: a, platform: o, elements: s } = t, { apply: c = () => {}, ...l } = Qr(e, t), u = await o.detectOverflow(t, l), d = $r(i), f = ei(i), p = ri(i) === "y", { width: m, height: h } = a.floating, g, _;
			d === "top" || d === "bottom" ? (g = d, _ = f === (await (o.isRTL == null ? void 0 : o.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (_ = d, g = f === "end" ? "top" : "bottom");
			let v = h - u.top - u.bottom, y = m - u.left - u.right, b = Gr(h - u[g], v), x = Gr(m - u[_], y), S = !t.middlewareData.shift, C = b, w = x;
			if ((n = t.middlewareData.shift) != null && n.enabled.x && (w = y), (r = t.middlewareData.shift) != null && r.enabled.y && (C = v), S && !f) {
				let e = Kr(u.left, 0), t = Kr(u.right, 0), n = Kr(u.top, 0), r = Kr(u.bottom, 0);
				p ? w = m - 2 * (e !== 0 || t !== 0 ? e + t : Kr(u.left, u.right)) : C = h - 2 * (n !== 0 || r !== 0 ? n + r : Kr(u.top, u.bottom));
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
function Ni() {
	return typeof window < "u";
}
function Pi(e) {
	return Li(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Fi(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Ii(e) {
	return ((Li(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function Li(e) {
	return Ni() ? e instanceof Node || e instanceof Fi(e).Node : !1;
}
function Ri(e) {
	return Ni() ? e instanceof Element || e instanceof Fi(e).Element : !1;
}
function zi(e) {
	return Ni() ? e instanceof HTMLElement || e instanceof Fi(e).HTMLElement : !1;
}
function Bi(e) {
	return !Ni() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Fi(e).ShadowRoot;
}
function Vi(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = Qi(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Hi(e) {
	return /^(table|td|th)$/.test(Pi(e));
}
function Ui(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var Wi = /transform|translate|scale|rotate|perspective|filter/, Gi = /paint|layout|strict|content/, Ki = (e) => !!e && e !== "none", qi;
function Ji(e) {
	let t = Ri(e) ? Qi(e) : e;
	return Ki(t.transform) || Ki(t.translate) || Ki(t.scale) || Ki(t.rotate) || Ki(t.perspective) || !Xi() && (Ki(t.backdropFilter) || Ki(t.filter)) || Wi.test(t.willChange || "") || Gi.test(t.contain || "");
}
function Yi(e) {
	let t = ea(e);
	for (; zi(t) && !Zi(t);) {
		if (Ji(t)) return t;
		if (Ui(t)) return null;
		t = ea(t);
	}
	return null;
}
function Xi() {
	return qi ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), qi;
}
function Zi(e) {
	return /^(html|body|#document)$/.test(Pi(e));
}
function Qi(e) {
	return Fi(e).getComputedStyle(e);
}
function $i(e) {
	return Ri(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function ea(e) {
	if (Pi(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || Bi(e) && e.host || Ii(e);
	return Bi(t) ? t.host : t;
}
function ta(e) {
	let t = ea(e);
	return Zi(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : zi(t) && Vi(t) ? t : ta(t);
}
function na(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = ta(e), i = r === e.ownerDocument?.body, a = Fi(r);
	if (i) {
		let e = ra(a);
		return t.concat(a, a.visualViewport || [], Vi(r) ? r : [], e && n ? na(e) : []);
	} else return t.concat(r, na(r, [], n));
}
function ra(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function ia(e) {
	let t = Qi(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = zi(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = qr(n) !== a || qr(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function aa(e) {
	return Ri(e) ? e : e.contextElement;
}
function oa(e) {
	let t = aa(e);
	if (!zi(t)) return Yr(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = ia(t), o = (a ? qr(n.width) : n.width) / r, s = (a ? qr(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var sa = /* @__PURE__ */ Yr(0);
function ca(e) {
	let t = Fi(e);
	return !Xi() || !t.visualViewport ? sa : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function la(e, t, n) {
	return t === void 0 && (t = !1), !n || t && n !== Fi(e) ? !1 : t;
}
function ua(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = aa(e), o = Yr(1);
	t && (r ? Ri(r) && (o = oa(r)) : o = oa(e));
	let s = la(a, n, r) ? ca(a) : Yr(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a) {
		let e = Fi(a), t = r && Ri(r) ? Fi(r) : r, n = e, i = ra(n);
		for (; i && r && t !== n;) {
			let e = oa(i), t = i.getBoundingClientRect(), r = Qi(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = Fi(i), i = ra(n);
		}
	}
	return _i({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function da(e, t) {
	let n = $i(e).scrollLeft;
	return t ? t.left + n : ua(Ii(e)).left + n;
}
function fa(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - da(e, n),
		y: n.top + t.scrollTop
	};
}
function pa(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = Ii(r), s = t ? Ui(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = Yr(1), u = Yr(0), d = zi(r);
	if ((d || !d && !a) && ((Pi(r) !== "body" || Vi(o)) && (c = $i(r)), d)) {
		let e = ua(r);
		l = oa(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? fa(o, c) : Yr(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function ma(e) {
	return Array.from(e.getClientRects());
}
function ha(e) {
	let t = Ii(e), n = $i(e), r = e.ownerDocument.body, i = Kr(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = Kr(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight), o = -n.scrollLeft + da(e), s = -n.scrollTop;
	return Qi(r).direction === "rtl" && (o += Kr(t.clientWidth, r.clientWidth) - i), {
		width: i,
		height: a,
		x: o,
		y: s
	};
}
var ga = 25;
function _a(e, t) {
	let n = Fi(e), r = Ii(e), i = n.visualViewport, a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
	if (i) {
		a = i.width, o = i.height;
		let e = Xi();
		(!e || e && t === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
	}
	let l = da(r);
	if (l <= 0) {
		let e = r.ownerDocument, t = e.body, n = getComputedStyle(t), i = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, o = Math.abs(r.clientWidth - t.clientWidth - i);
		o <= ga && (a -= o);
	} else l <= ga && (a += l);
	return {
		width: a,
		height: o,
		x: s,
		y: c
	};
}
function va(e, t) {
	let n = ua(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = zi(e) ? oa(e) : Yr(1);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function ya(e, t, n) {
	let r;
	if (t === "viewport") r = _a(e, n);
	else if (t === "document") r = ha(Ii(e));
	else if (Ri(t)) r = va(t, n);
	else {
		let n = ca(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return _i(r);
}
function ba(e, t) {
	let n = ea(e);
	return n === t || !Ri(n) || Zi(n) ? !1 : Qi(n).position === "fixed" || ba(n, t);
}
function xa(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = na(e, [], !1).filter((e) => Ri(e) && Pi(e) !== "body"), i = null, a = Qi(e).position === "fixed", o = a ? ea(e) : e;
	for (; Ri(o) && !Zi(o);) {
		let t = Qi(o), n = Ji(o);
		!n && t.position === "fixed" && (i = null), (a ? !n && !i : !n && t.position === "static" && i && (i.position === "absolute" || i.position === "fixed") || Vi(o) && !n && ba(e, o)) ? r = r.filter((e) => e !== o) : i = t, o = ea(o);
	}
	return t.set(e, r), r;
}
function Sa(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Ui(t) ? [] : xa(t, this._c) : [].concat(n), r], o = ya(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = ya(t, a[e], i);
		s = Kr(n.top, s), c = Gr(n.right, c), l = Gr(n.bottom, l), u = Kr(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function Ca(e) {
	let { width: t, height: n } = ia(e);
	return {
		width: t,
		height: n
	};
}
function wa(e, t, n) {
	let r = zi(t), i = Ii(t), a = n === "fixed", o = ua(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = Yr(0);
	function l() {
		c.x = da(i);
	}
	if (r || !r && !a) if ((Pi(t) !== "body" || Vi(i)) && (s = $i(t)), r) {
		let e = ua(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	} else i && l();
	a && !r && i && l();
	let u = i && !r && !a ? fa(i, s) : Yr(0);
	return {
		x: o.left + s.scrollLeft - c.x - u.x,
		y: o.top + s.scrollTop - c.y - u.y,
		width: o.width,
		height: o.height
	};
}
function Ta(e) {
	return Qi(e).position === "static";
}
function Ea(e, t) {
	if (!zi(e) || Qi(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return Ii(e) === n && (n = n.ownerDocument.body), n;
}
function Da(e, t) {
	let n = Fi(e);
	if (Ui(e)) return n;
	if (!zi(e)) {
		let t = ea(e);
		for (; t && !Zi(t);) {
			if (Ri(t) && !Ta(t)) return t;
			t = ea(t);
		}
		return n;
	}
	let r = Ea(e, t);
	for (; r && Hi(r) && Ta(r);) r = Ea(r, t);
	return r && Zi(r) && Ta(r) && !Ji(r) ? n : r || Yi(e) || n;
}
var Oa = async function(e) {
	let t = this.getOffsetParent || Da, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: wa(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function ka(e) {
	return Qi(e).direction === "rtl";
}
var Aa = {
	convertOffsetParentRelativeRectToViewportRelativeRect: pa,
	getDocumentElement: Ii,
	getClippingRect: Sa,
	getOffsetParent: Da,
	getElementRects: Oa,
	getClientRects: ma,
	getDimensions: Ca,
	getScale: oa,
	isElement: Ri,
	isRTL: ka
};
function ja(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Ma(e, t) {
	let n = null, r, i = Ii(e);
	function a() {
		var e;
		clearTimeout(r), (e = n) == null || e.disconnect(), n = null;
	}
	function o(s, c) {
		s === void 0 && (s = !1), c === void 0 && (c = 1), a();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (s || t(), !f || !p) return;
		let m = Jr(d), h = Jr(i.clientWidth - (u + f)), g = Jr(i.clientHeight - (d + p)), _ = Jr(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: Kr(0, Gr(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (n !== c) {
				if (!y) return o();
				n ? o(!1, n) : r = setTimeout(() => {
					o(!1, 1e-7);
				}, 1e3);
			}
			n === 1 && !ja(l, e.getBoundingClientRect()) && o(), y = !1;
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
function Na(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = aa(e), u = i || a ? [...l ? na(l) : [], ...t ? na(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n, { passive: !0 }), a && e.addEventListener("resize", n);
	});
	let d = l && s ? Ma(l, n) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? ua(e) : null;
	c && g();
	function g() {
		let t = ua(e);
		h && !ja(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var Pa = ki, Fa = Ai, Ia = Ci, La = Mi, Ra = Ei, za = Si, Ba = ji, Va = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = {
		platform: Aa,
		...n
	}, a = {
		...i.platform,
		_c: r
	};
	return xi(e, t, {
		...i,
		platform: a
	});
}, Ha = typeof document < "u" ? c : function() {};
function Ua(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!Ua(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !Ua(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function Wa(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Ga(e, t) {
	let n = Wa(e);
	return Math.round(t * n) / n;
}
function Ka(t) {
	let n = e.useRef(t);
	return Ha(() => {
		n.current = t;
	}), n;
}
function qa(t) {
	t === void 0 && (t = {});
	let { placement: n = "bottom", strategy: r = "absolute", middleware: i = [], platform: a, elements: { reference: o, floating: s } = {}, transform: c = !0, whileElementsMounted: l, open: u } = t, [d, f] = e.useState({
		x: 0,
		y: 0,
		strategy: r,
		placement: n,
		middlewareData: {},
		isPositioned: !1
	}), [p, m] = e.useState(i);
	Ua(p, i) || m(i);
	let [g, _] = e.useState(null), [v, y] = e.useState(null), b = e.useCallback((e) => {
		e !== w.current && (w.current = e, _(e));
	}, []), x = e.useCallback((e) => {
		e !== T.current && (T.current = e, y(e));
	}, []), S = o || g, C = s || v, w = e.useRef(null), T = e.useRef(null), E = e.useRef(d), D = l != null, O = Ka(l), k = Ka(a), A = Ka(u), j = e.useCallback(() => {
		if (!w.current || !T.current) return;
		let e = {
			placement: n,
			strategy: r,
			middleware: p
		};
		k.current && (e.platform = k.current), Va(w.current, T.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: A.current !== !1
			};
			M.current && !Ua(E.current, t) && (E.current = t, h.flushSync(() => {
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
	Ha(() => {
		u === !1 && E.current.isPositioned && (E.current.isPositioned = !1, f((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [u]);
	let M = e.useRef(!1);
	Ha(() => (M.current = !0, () => {
		M.current = !1;
	}), []), Ha(() => {
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
		let t = Ga(P.floating, d.x), n = Ga(P.floating, d.y);
		return c ? {
			...e,
			transform: "translate(" + t + "px, " + n + "px)",
			...Wa(P.floating) >= 1.5 && { willChange: "transform" }
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
var Ja = (e) => {
	function t(e) {
		return {}.hasOwnProperty.call(e, "current");
	}
	return {
		name: "arrow",
		options: e,
		fn(n) {
			let { element: r, padding: i } = typeof e == "function" ? e(n) : e;
			return r && t(r) ? r.current == null ? {} : za({
				element: r.current,
				padding: i
			}).fn(n) : r ? za({
				element: r,
				padding: i
			}).fn(n) : {};
		}
	};
}, Ya = (e, t) => {
	let n = Pa(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Xa = (e, t) => {
	let n = Fa(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Za = (e, t) => ({
	fn: Ba(e).fn,
	options: [e, t]
}), Qa = (e, t) => {
	let n = Ia(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, $a = (e, t) => {
	let n = La(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, eo = (e, t) => {
	let n = Ra(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, to = (e, t) => {
	let n = Ja(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, no = "Arrow", ro = e.forwardRef((e, t) => {
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
ro.displayName = no;
var io = ro, ao = "Popper", [oo, so] = ke(ao), [co, lo] = oo(ao), uo = (t) => {
	let { __scopePopper: n, children: r } = t, [i, a] = e.useState(null);
	return /* @__PURE__ */ p(co, {
		scope: n,
		anchor: i,
		onAnchorChange: a,
		children: r
	});
};
uo.displayName = ao;
var fo = "PopperAnchor", po = e.forwardRef((t, n) => {
	let { __scopePopper: r, virtualRef: i, ...a } = t, o = lo(fo, r), s = e.useRef(null), c = H(n, s), l = e.useRef(null);
	return e.useEffect(() => {
		let e = l.current;
		l.current = i?.current || s.current, e !== l.current && o.onAnchorChange(l.current);
	}), i ? null : /* @__PURE__ */ p(U.div, {
		...a,
		ref: c
	});
});
po.displayName = fo;
var mo = "PopperContent", [ho, go] = oo(mo), _o = e.forwardRef((t, n) => {
	let { __scopePopper: r, side: i = "bottom", sideOffset: a = 0, align: o = "center", alignOffset: s = 0, arrowPadding: c = 0, avoidCollisions: l = !0, collisionBoundary: u = [], collisionPadding: d = 0, sticky: f = "partial", hideWhenDetached: m = !1, updatePositionStrategy: h = "optimized", onPlaced: g, ..._ } = t, v = lo(mo, r), [y, b] = e.useState(null), x = H(n, (e) => b(e)), [S, C] = e.useState(null), w = _t(S), T = w?.width ?? 0, E = w?.height ?? 0, D = i + (o === "center" ? "" : "-" + o), O = typeof d == "number" ? d : {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...d
	}, k = Array.isArray(u) ? u : [u], A = k.length > 0, j = {
		padding: O,
		boundary: k.filter(xo),
		altBoundary: A
	}, { refs: M, floatingStyles: N, placement: P, isPositioned: F, middlewareData: I } = qa({
		strategy: "fixed",
		placement: D,
		whileElementsMounted: (...e) => Na(...e, { animationFrame: h === "always" }),
		elements: { reference: v.anchor },
		middleware: [
			Ya({
				mainAxis: a + E,
				alignmentAxis: s
			}),
			l && Xa({
				mainAxis: !0,
				crossAxis: !1,
				limiter: f === "partial" ? Za() : void 0,
				...j
			}),
			l && Qa({ ...j }),
			$a({
				...j,
				apply: ({ elements: e, rects: t, availableWidth: n, availableHeight: r }) => {
					let { width: i, height: a } = t.reference, o = e.floating.style;
					o.setProperty("--radix-popper-available-width", `${n}px`), o.setProperty("--radix-popper-available-height", `${r}px`), o.setProperty("--radix-popper-anchor-width", `${i}px`), o.setProperty("--radix-popper-anchor-height", `${a}px`);
				}
			}),
			S && to({
				element: S,
				padding: c
			}),
			So({
				arrowWidth: T,
				arrowHeight: E
			}),
			m && eo({
				strategy: "referenceHidden",
				...j
			})
		]
	}), [L, ee] = Co(P), R = Ue(g);
	W(() => {
		F && R?.();
	}, [F, R]);
	let z = I.arrow?.x, te = I.arrow?.y, ne = I.arrow?.centerOffset !== 0, [re, ie] = e.useState();
	return W(() => {
		y && ie(window.getComputedStyle(y).zIndex);
	}, [y]), /* @__PURE__ */ p("div", {
		ref: M.setFloating,
		"data-radix-popper-content-wrapper": "",
		style: {
			...N,
			transform: F ? N.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: re,
			"--radix-popper-transform-origin": [I.transformOrigin?.x, I.transformOrigin?.y].join(" "),
			...I.hide?.referenceHidden && {
				visibility: "hidden",
				pointerEvents: "none"
			}
		},
		dir: t.dir,
		children: /* @__PURE__ */ p(ho, {
			scope: r,
			placedSide: L,
			onArrowChange: C,
			arrowX: z,
			arrowY: te,
			shouldHideArrow: ne,
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
_o.displayName = mo;
var vo = "PopperArrow", yo = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, bo = e.forwardRef(function(e, t) {
	let { __scopePopper: n, ...r } = e, i = go(vo, n), a = yo[i.placedSide];
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
		children: /* @__PURE__ */ p(io, {
			...r,
			ref: t,
			style: {
				...r.style,
				display: "block"
			}
		})
	});
});
bo.displayName = vo;
function xo(e) {
	return e !== null;
}
var So = (e) => ({
	name: "transformOrigin",
	options: e,
	fn(t) {
		let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = Co(n), u = {
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
function Co(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
var wo = uo, To = po, Eo = _o, Do = bo, Oo = "Portal", ko = e.forwardRef((t, n) => {
	let { container: r, ...i } = t, [a, o] = e.useState(!1);
	W(() => o(!0), []);
	let s = r || a && globalThis?.document?.body;
	return s ? g.createPortal(/* @__PURE__ */ p(U.div, {
		...i,
		ref: n
	}), s) : null;
});
ko.displayName = Oo;
//#endregion
//#region node_modules/@radix-ui/react-visually-hidden/dist/index.mjs
var Ao = Object.freeze({
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
}), jo = "VisuallyHidden", Mo = e.forwardRef((e, t) => /* @__PURE__ */ p(U.span, {
	...e,
	ref: t,
	style: {
		...Ao,
		...e.style
	}
}));
Mo.displayName = jo;
var No = Mo, Po = function(e) {
	return typeof document > "u" ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
}, Fo = /* @__PURE__ */ new WeakMap(), Io = /* @__PURE__ */ new WeakMap(), Lo = {}, Ro = 0, zo = function(e) {
	return e && (e.host || zo(e.parentNode));
}, Bo = function(e, t) {
	return t.map(function(t) {
		if (e.contains(t)) return t;
		var n = zo(t);
		return n && e.contains(n) ? n : (console.error("aria-hidden", t, "in not contained inside", e, ". Doing nothing"), null);
	}).filter(function(e) {
		return !!e;
	});
}, Vo = function(e, t, n, r) {
	var i = Bo(t, Array.isArray(e) ? e : [e]);
	Lo[n] || (Lo[n] = /* @__PURE__ */ new WeakMap());
	var a = Lo[n], o = [], s = /* @__PURE__ */ new Set(), c = new Set(i), l = function(e) {
		!e || s.has(e) || (s.add(e), l(e.parentNode));
	};
	i.forEach(l);
	var u = function(e) {
		!e || c.has(e) || Array.prototype.forEach.call(e.children, function(e) {
			if (s.has(e)) u(e);
			else try {
				var t = e.getAttribute(r), i = t !== null && t !== "false", c = (Fo.get(e) || 0) + 1, l = (a.get(e) || 0) + 1;
				Fo.set(e, c), a.set(e, l), o.push(e), c === 1 && i && Io.set(e, !0), l === 1 && e.setAttribute(n, "true"), i || e.setAttribute(r, "true");
			} catch (t) {
				console.error("aria-hidden: cannot operate on ", e, t);
			}
		});
	};
	return u(t), s.clear(), Ro++, function() {
		o.forEach(function(e) {
			var t = Fo.get(e) - 1, i = a.get(e) - 1;
			Fo.set(e, t), a.set(e, i), t || (Io.has(e) || e.removeAttribute(r), Io.delete(e)), i || e.removeAttribute(n);
		}), Ro--, Ro || (Fo = /* @__PURE__ */ new WeakMap(), Fo = /* @__PURE__ */ new WeakMap(), Io = /* @__PURE__ */ new WeakMap(), Lo = {});
	};
}, Ho = function(e, t, n) {
	n === void 0 && (n = "data-aria-hidden");
	var r = Array.from(Array.isArray(e) ? e : [e]), i = t || Po(e);
	return i ? (r.push.apply(r, Array.from(i.querySelectorAll("[aria-live], script"))), Vo(r, i, n, "aria-hidden")) : function() {
		return null;
	};
}, Uo = function() {
	return Uo = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, Uo.apply(this, arguments);
};
function Wo(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function Go(e, t, n) {
	if (n || arguments.length === 2) for (var r = 0, i = t.length, a; r < i; r++) (a || !(r in t)) && (a ||= Array.prototype.slice.call(t, 0, r), a[r] = t[r]);
	return e.concat(a || Array.prototype.slice.call(t));
}
//#endregion
//#region node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var Ko = "right-scroll-bar-position", qo = "width-before-scroll-bar", Jo = "with-scroll-bars-hidden", Yo = "--removed-body-scroll-bar-size";
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/assignRef.js
function Xo(e, t) {
	return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/useRef.js
function Zo(e, t) {
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
var Qo = typeof window < "u" ? e.useLayoutEffect : e.useEffect, $o = /* @__PURE__ */ new WeakMap();
function es(e, t) {
	var n = Zo(t || null, function(t) {
		return e.forEach(function(e) {
			return Xo(e, t);
		});
	});
	return Qo(function() {
		var t = $o.get(n);
		if (t) {
			var r = new Set(t), i = new Set(e), a = n.current;
			r.forEach(function(e) {
				i.has(e) || Xo(e, null);
			}), i.forEach(function(e) {
				r.has(e) || Xo(e, a);
			});
		}
		$o.set(n, e);
	}, [e]), n;
}
//#endregion
//#region node_modules/use-sidecar/dist/es2015/medium.js
function ts(e) {
	return e;
}
function ns(e, t) {
	t === void 0 && (t = ts);
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
function rs(e) {
	e === void 0 && (e = {});
	var t = ns(null);
	return t.options = Uo({
		async: !0,
		ssr: !1
	}, e), t;
}
//#endregion
//#region node_modules/use-sidecar/dist/es2015/exports.js
var is = function(t) {
	var n = t.sideCar, r = Wo(t, ["sideCar"]);
	if (!n) throw Error("Sidecar: please provide `sideCar` property to import the right car");
	var i = n.read();
	if (!i) throw Error("Sidecar medium not found");
	return e.createElement(i, Uo({}, r));
};
is.isSideCarExport = !0;
function as(e, t) {
	return e.useMedium(t), is;
}
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/medium.js
var os = rs(), ss = function() {}, cs = e.forwardRef(function(t, n) {
	var r = e.useRef(null), i = e.useState({
		onScrollCapture: ss,
		onWheelCapture: ss,
		onTouchMoveCapture: ss
	}), a = i[0], o = i[1], s = t.forwardProps, c = t.children, l = t.className, u = t.removeScrollBar, d = t.enabled, f = t.shards, p = t.sideCar, m = t.noRelative, h = t.noIsolation, g = t.inert, _ = t.allowPinchZoom, v = t.as, y = v === void 0 ? "div" : v, b = t.gapMode, x = Wo(t, [
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
	]), S = p, C = es([r, n]), w = Uo(Uo({}, x), a);
	return e.createElement(e.Fragment, null, d && e.createElement(S, {
		sideCar: os,
		removeScrollBar: u,
		shards: f,
		noRelative: m,
		noIsolation: h,
		inert: g,
		setCallbacks: o,
		allowPinchZoom: !!_,
		lockRef: r,
		gapMode: b
	}), s ? e.cloneElement(e.Children.only(c), Uo(Uo({}, w), { ref: C })) : e.createElement(y, Uo({}, w, {
		className: l,
		ref: C
	}), c));
});
cs.defaultProps = {
	enabled: !0,
	removeScrollBar: !0,
	inert: !1
}, cs.classNames = {
	fullWidth: qo,
	zeroRight: Ko
};
//#endregion
//#region node_modules/get-nonce/dist/es2015/index.js
var ls, us = function() {
	if (ls) return ls;
	if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
//#endregion
//#region node_modules/react-style-singleton/dist/es2015/singleton.js
function ds() {
	if (!document) return null;
	var e = document.createElement("style");
	e.type = "text/css";
	var t = us();
	return t && e.setAttribute("nonce", t), e;
}
function fs(e, t) {
	e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function ps(e) {
	(document.head || document.getElementsByTagName("head")[0]).appendChild(e);
}
var ms = function() {
	var e = 0, t = null;
	return {
		add: function(n) {
			e == 0 && (t = ds()) && (fs(t, n), ps(t)), e++;
		},
		remove: function() {
			e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
		}
	};
}, hs = function() {
	var t = ms();
	return function(n, r) {
		e.useEffect(function() {
			return t.add(n), function() {
				t.remove();
			};
		}, [n && r]);
	};
}, gs = function() {
	var e = hs();
	return function(t) {
		var n = t.styles, r = t.dynamic;
		return e(n, r), null;
	};
}, _s = {
	left: 0,
	top: 0,
	right: 0,
	gap: 0
}, vs = function(e) {
	return parseInt(e || "", 10) || 0;
}, ys = function(e) {
	var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], i = t[e === "padding" ? "paddingRight" : "marginRight"];
	return [
		vs(n),
		vs(r),
		vs(i)
	];
}, bs = function(e) {
	if (e === void 0 && (e = "margin"), typeof window > "u") return _s;
	var t = ys(e), n = document.documentElement.clientWidth, r = window.innerWidth;
	return {
		left: t[0],
		top: t[1],
		right: t[2],
		gap: Math.max(0, r - n + t[2] - t[0])
	};
}, xs = gs(), Ss = "data-scroll-locked", Cs = function(e, t, n, r) {
	var i = e.left, a = e.top, o = e.right, s = e.gap;
	return n === void 0 && (n = "margin"), `
  .${Jo} {
   overflow: hidden ${r};
   padding-right: ${s}px ${r};
  }
  body[${Ss}] {
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
  
  .${Ko} {
    right: ${s}px ${r};
  }
  
  .${qo} {
    margin-right: ${s}px ${r};
  }
  
  .${Ko} .${Ko} {
    right: 0 ${r};
  }
  
  .${qo} .${qo} {
    margin-right: 0 ${r};
  }
  
  body[${Ss}] {
    ${Yo}: ${s}px;
  }
`;
}, ws = function() {
	var e = parseInt(document.body.getAttribute("data-scroll-locked") || "0", 10);
	return isFinite(e) ? e : 0;
}, Ts = function() {
	e.useEffect(function() {
		return document.body.setAttribute(Ss, (ws() + 1).toString()), function() {
			var e = ws() - 1;
			e <= 0 ? document.body.removeAttribute(Ss) : document.body.setAttribute(Ss, e.toString());
		};
	}, []);
}, Es = function(t) {
	var n = t.noRelative, r = t.noImportant, i = t.gapMode, a = i === void 0 ? "margin" : i;
	Ts();
	var o = e.useMemo(function() {
		return bs(a);
	}, [a]);
	return e.createElement(xs, { styles: Cs(o, !n, a, r ? "" : "!important") });
}, Ds = !1;
if (typeof window < "u") try {
	var Os = Object.defineProperty({}, "passive", { get: function() {
		return Ds = !0, !0;
	} });
	window.addEventListener("test", Os, Os), window.removeEventListener("test", Os, Os);
} catch {
	Ds = !1;
}
var ks = Ds ? { passive: !1 } : !1, As = function(e) {
	return e.tagName === "TEXTAREA";
}, js = function(e, t) {
	if (!(e instanceof Element)) return !1;
	var n = window.getComputedStyle(e);
	return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !As(e) && n[t] === "visible");
}, Ms = function(e) {
	return js(e, "overflowY");
}, Ns = function(e) {
	return js(e, "overflowX");
}, Ps = function(e, t) {
	var n = t.ownerDocument, r = t;
	do {
		if (typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host), Ls(e, r)) {
			var i = Rs(e, r);
			if (i[1] > i[2]) return !0;
		}
		r = r.parentNode;
	} while (r && r !== n.body);
	return !1;
}, Fs = function(e) {
	return [
		e.scrollTop,
		e.scrollHeight,
		e.clientHeight
	];
}, Is = function(e) {
	return [
		e.scrollLeft,
		e.scrollWidth,
		e.clientWidth
	];
}, Ls = function(e, t) {
	return e === "v" ? Ms(t) : Ns(t);
}, Rs = function(e, t) {
	return e === "v" ? Fs(t) : Is(t);
}, zs = function(e, t) {
	return e === "h" && t === "rtl" ? -1 : 1;
}, Bs = function(e, t, n, r, i) {
	var a = zs(e, window.getComputedStyle(t).direction), o = a * r, s = n.target, c = t.contains(s), l = !1, u = o > 0, d = 0, f = 0;
	do {
		if (!s) break;
		var p = Rs(e, s), m = p[0], h = p[1] - p[2] - a * m;
		(m || h) && Ls(e, s) && (d += h, f += m);
		var g = s.parentNode;
		s = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
	} while (!c && s !== document.body || c && (t.contains(s) || t === s));
	return (u && (i && Math.abs(d) < 1 || !i && o > d) || !u && (i && Math.abs(f) < 1 || !i && -o > f)) && (l = !0), l;
}, Vs = function(e) {
	return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Hs = function(e) {
	return [e.deltaX, e.deltaY];
}, Us = function(e) {
	return e && "current" in e ? e.current : e;
}, Ws = function(e, t) {
	return e[0] === t[0] && e[1] === t[1];
}, Gs = function(e) {
	return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`;
}, Ks = 0, qs = [];
function Js(t) {
	var n = e.useRef([]), r = e.useRef([0, 0]), i = e.useRef(), a = e.useState(Ks++)[0], o = e.useState(gs)[0], s = e.useRef(t);
	e.useEffect(function() {
		s.current = t;
	}, [t]), e.useEffect(function() {
		if (t.inert) {
			document.body.classList.add(`block-interactivity-${a}`);
			var e = Go([t.lockRef.current], (t.shards || []).map(Us), !0).filter(Boolean);
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
		var n = Vs(e), a = r.current, o = "deltaX" in e ? e.deltaX : a[0] - n[0], c = "deltaY" in e ? e.deltaY : a[1] - n[1], l, u = e.target, d = Math.abs(o) > Math.abs(c) ? "h" : "v";
		if ("touches" in e && d === "h" && u.type === "range") return !1;
		var f = window.getSelection(), p = f && f.anchorNode;
		if (p && (p === u || p.contains(u))) return !1;
		var m = Ps(d, u);
		if (!m) return !0;
		if (m ? l = d : (l = d === "v" ? "h" : "v", m = Ps(d, u)), !m) return !1;
		if (!i.current && "changedTouches" in e && (o || c) && (i.current = l), !l) return !0;
		var h = i.current || l;
		return Bs(h, t, e, h === "h" ? o : c, !0);
	}, []), l = e.useCallback(function(e) {
		var t = e;
		if (!(!qs.length || qs[qs.length - 1] !== o)) {
			var r = "deltaY" in t ? Hs(t) : Vs(t), i = n.current.filter(function(e) {
				return e.name === t.type && (e.target === t.target || t.target === e.shadowParent) && Ws(e.delta, r);
			})[0];
			if (i && i.should) {
				t.cancelable && t.preventDefault();
				return;
			}
			if (!i) {
				var a = (s.current.shards || []).map(Us).filter(Boolean).filter(function(e) {
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
			shadowParent: Ys(r)
		};
		n.current.push(a), setTimeout(function() {
			n.current = n.current.filter(function(e) {
				return e !== a;
			});
		}, 1);
	}, []), d = e.useCallback(function(e) {
		r.current = Vs(e), i.current = void 0;
	}, []), f = e.useCallback(function(e) {
		u(e.type, Hs(e), e.target, c(e, t.lockRef.current));
	}, []), p = e.useCallback(function(e) {
		u(e.type, Vs(e), e.target, c(e, t.lockRef.current));
	}, []);
	e.useEffect(function() {
		return qs.push(o), t.setCallbacks({
			onScrollCapture: f,
			onWheelCapture: f,
			onTouchMoveCapture: p
		}), document.addEventListener("wheel", l, ks), document.addEventListener("touchmove", l, ks), document.addEventListener("touchstart", d, ks), function() {
			qs = qs.filter(function(e) {
				return e !== o;
			}), document.removeEventListener("wheel", l, ks), document.removeEventListener("touchmove", l, ks), document.removeEventListener("touchstart", d, ks);
		};
	}, []);
	var m = t.removeScrollBar, h = t.inert;
	return e.createElement(e.Fragment, null, h ? e.createElement(o, { styles: Gs(a) }) : null, m ? e.createElement(Es, {
		noRelative: t.noRelative,
		gapMode: t.gapMode
	}) : null);
}
function Ys(e) {
	for (var t = null; e !== null;) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
	return t;
}
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/sidecar.js
var Xs = as(os, Js), Zs = e.forwardRef(function(t, n) {
	return e.createElement(cs, Uo({}, t, {
		ref: n,
		sideCar: Xs
	}));
});
Zs.classNames = cs.classNames;
//#endregion
//#region node_modules/@radix-ui/react-select/dist/index.mjs
var Qs = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
], $s = [" ", "Enter"], ec = "Select", [tc, nc, rc] = ze(ec), [ic, ac] = ke(ec, [rc, so]), oc = so(), [sc, cc] = ic(ec), [lc, uc] = ic(ec), dc = (t) => {
	let { __scopeSelect: n, children: r, open: i, defaultOpen: a, onOpenChange: o, value: s, defaultValue: c, onValueChange: l, dir: u, name: d, autoComplete: f, disabled: h, required: g, form: _ } = t, v = oc(n), [y, b] = e.useState(null), [x, S] = e.useState(null), [C, w] = e.useState(!1), T = Ye(u), [E, D] = Ge({
		prop: i,
		defaultProp: a ?? !1,
		onChange: o,
		caller: ec
	}), [O, k] = Ge({
		prop: s,
		defaultProp: c,
		onChange: l,
		caller: ec
	}), A = e.useRef(null), j = y ? _ || !!y.closest("form") : !0, [M, N] = e.useState(/* @__PURE__ */ new Set()), P = Array.from(M).map((e) => e.props.value).join(";");
	return /* @__PURE__ */ p(wo, {
		...v,
		children: /* @__PURE__ */ m(sc, {
			required: g,
			scope: n,
			trigger: y,
			onTriggerChange: b,
			valueNode: x,
			onValueNodeChange: S,
			valueNodeHasChildren: C,
			onValueNodeHasChildrenChange: w,
			contentId: He(),
			value: O,
			onValueChange: k,
			open: E,
			onOpenChange: D,
			dir: T,
			triggerPointerDownPosRef: A,
			disabled: h,
			children: [/* @__PURE__ */ p(tc.Provider, {
				scope: n,
				children: /* @__PURE__ */ p(lc, {
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
			}), j ? /* @__PURE__ */ m(ol, {
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
dc.displayName = ec;
var fc = "SelectTrigger", pc = e.forwardRef((t, n) => {
	let { __scopeSelect: r, disabled: i = !1, ...a } = t, o = oc(r), s = cc(fc, r), c = s.disabled || i, l = H(n, s.onTriggerChange), u = nc(r), d = e.useRef("touch"), [f, m, h] = cl((e) => {
		let t = u().filter((e) => !e.disabled), n = ll(t, e, t.find((e) => e.value === s.value));
		n !== void 0 && s.onValueChange(n.value);
	}), g = (e) => {
		c || (s.onOpenChange(!0), h()), e && (s.triggerPointerDownPosRef.current = {
			x: Math.round(e.pageX),
			y: Math.round(e.pageY)
		});
	};
	return /* @__PURE__ */ p(To, {
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
			"data-placeholder": sl(s.value) ? "" : void 0,
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
				!(e.ctrlKey || e.altKey || e.metaKey) && e.key.length === 1 && m(e.key), !(t && e.key === " ") && Qs.includes(e.key) && (g(), e.preventDefault());
			})
		})
	});
});
pc.displayName = fc;
var mc = "SelectValue", hc = e.forwardRef((e, t) => {
	let { __scopeSelect: n, className: r, style: i, children: a, placeholder: o = "", ...s } = e, c = cc(mc, n), { onValueNodeHasChildrenChange: l } = c, u = a !== void 0, d = H(t, c.onValueNodeChange);
	return W(() => {
		l(u);
	}, [l, u]), /* @__PURE__ */ p(U.span, {
		...s,
		ref: d,
		style: { pointerEvents: "none" },
		children: sl(c.value) ? /* @__PURE__ */ p(f, { children: o }) : a
	});
});
hc.displayName = mc;
var gc = "SelectIcon", _c = e.forwardRef((e, t) => {
	let { __scopeSelect: n, children: r, ...i } = e;
	return /* @__PURE__ */ p(U.span, {
		"aria-hidden": !0,
		...i,
		ref: t,
		children: r || "▼"
	});
});
_c.displayName = gc;
var vc = "SelectPortal", yc = (e) => /* @__PURE__ */ p(ko, {
	asChild: !0,
	...e
});
yc.displayName = vc;
var bc = "SelectContent", xc = e.forwardRef((t, n) => {
	let r = cc(bc, t.__scopeSelect), [i, a] = e.useState();
	if (W(() => {
		a(new DocumentFragment());
	}, []), !r.open) {
		let e = i;
		return e ? h.createPortal(/* @__PURE__ */ p(Cc, {
			scope: t.__scopeSelect,
			children: /* @__PURE__ */ p(tc.Slot, {
				scope: t.__scopeSelect,
				children: /* @__PURE__ */ p("div", { children: t.children })
			})
		}), e) : null;
	}
	return /* @__PURE__ */ p(Dc, {
		...t,
		ref: n
	});
});
xc.displayName = bc;
var Sc = 10, [Cc, wc] = ic(bc), Tc = "SelectContentImpl", Ec = /* @__PURE__ */ je("SelectContent.RemoveScroll"), Dc = e.forwardRef((t, n) => {
	let { __scopeSelect: r, position: i = "item-aligned", onCloseAutoFocus: a, onEscapeKeyDown: o, onPointerDownOutside: s, side: c, sideOffset: l, align: u, alignOffset: d, arrowPadding: f, collisionBoundary: m, collisionPadding: h, sticky: g, hideWhenDetached: _, avoidCollisions: v, ...y } = t, b = cc(bc, r), [x, S] = e.useState(null), [C, w] = e.useState(null), T = H(n, (e) => S(e)), [E, D] = e.useState(null), [O, k] = e.useState(null), A = nc(r), [j, M] = e.useState(!1), N = e.useRef(!1);
	e.useEffect(() => {
		if (x) return Ho(x);
	}, [x]), Er();
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
	let [ee, R] = cl((e) => {
		let t = A().filter((e) => !e.disabled), n = ll(t, e, t.find((e) => e.ref.current === document.activeElement));
		n && setTimeout(() => n.ref.current.focus());
	}), z = e.useCallback((e, t, n) => {
		let r = !N.current && !n;
		(b.value !== void 0 && b.value === t || r) && (D(e), r && (N.current = !0));
	}, [b.value]), te = e.useCallback(() => x?.focus(), [x]), ne = e.useCallback((e, t, n) => {
		let r = !N.current && !n;
		(b.value !== void 0 && b.value === t || r) && k(e);
	}, [b.value]), re = i === "popper" ? jc : kc, ie = re === jc ? {
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
	return /* @__PURE__ */ p(Cc, {
		scope: r,
		content: x,
		viewport: C,
		onViewportChange: w,
		itemRefCallback: z,
		selectedItem: E,
		onItemLeave: te,
		itemTextRefCallback: ne,
		focusSelectedItem: F,
		selectedItemText: O,
		position: i,
		isPositioned: j,
		searchRef: ee,
		children: /* @__PURE__ */ p(Zs, {
			as: Ec,
			allowPinchZoom: !0,
			children: /* @__PURE__ */ p(Mr, {
				asChild: !0,
				trapped: b.open,
				onMountAutoFocus: (e) => {
					e.preventDefault();
				},
				onUnmountAutoFocus: V(a, (e) => {
					b.trigger?.focus({ preventScroll: !0 }), e.preventDefault();
				}),
				children: /* @__PURE__ */ p(vr, {
					asChild: !0,
					disableOutsidePointerEvents: !0,
					onEscapeKeyDown: o,
					onPointerDownOutside: s,
					onFocusOutside: (e) => e.preventDefault(),
					onDismiss: () => b.onOpenChange(!1),
					children: /* @__PURE__ */ p(re, {
						role: "listbox",
						id: b.contentId,
						"data-state": b.open ? "open" : "closed",
						dir: b.dir,
						onContextMenu: (e) => e.preventDefault(),
						...y,
						...ie,
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
							if (e.key === "Tab" && e.preventDefault(), !t && e.key.length === 1 && R(e.key), [
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
Dc.displayName = Tc;
var Oc = "SelectItemAlignedPosition", kc = e.forwardRef((t, n) => {
	let { __scopeSelect: r, onPlaced: i, ...a } = t, o = cc(bc, r), s = wc(bc, r), [c, l] = e.useState(null), [u, d] = e.useState(null), f = H(n, (e) => d(e)), m = nc(r), h = e.useRef(!1), g = e.useRef(!0), { viewport: _, selectedItem: v, selectedItemText: y, focusSelectedItem: b } = s, x = e.useCallback(() => {
		if (o.trigger && o.valueNode && c && u && _ && v && y) {
			let e = o.trigger.getBoundingClientRect(), t = u.getBoundingClientRect(), n = o.valueNode.getBoundingClientRect(), r = y.getBoundingClientRect();
			if (o.dir !== "rtl") {
				let i = r.left - t.left, a = n.left - i, o = e.left - a, s = e.width + o, l = Math.max(s, t.width), u = window.innerWidth - Sc, d = en(a, [Sc, Math.max(Sc, u - l)]);
				c.style.minWidth = s + "px", c.style.left = d + "px";
			} else {
				let i = t.right - r.right, a = window.innerWidth - n.right - i, o = window.innerWidth - e.right - a, s = e.width + o, l = Math.max(s, t.width), u = window.innerWidth - Sc, d = en(a, [Sc, Math.max(Sc, u - l)]);
				c.style.minWidth = s + "px", c.style.right = d + "px";
			}
			let a = m(), s = window.innerHeight - Sc * 2, l = _.scrollHeight, d = window.getComputedStyle(u), f = parseInt(d.borderTopWidth, 10), p = parseInt(d.paddingTop, 10), g = parseInt(d.borderBottomWidth, 10), b = parseInt(d.paddingBottom, 10), x = f + p + l + b + g, S = Math.min(v.offsetHeight * 5, x), C = window.getComputedStyle(_), w = parseInt(C.paddingTop, 10), T = parseInt(C.paddingBottom, 10), E = e.top + e.height / 2 - Sc, D = s - E, O = v.offsetHeight / 2, k = v.offsetTop + O, A = f + p + k, j = x - A;
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
			c.style.margin = `${Sc}px 0`, c.style.minHeight = S + "px", c.style.maxHeight = s + "px", i?.(), requestAnimationFrame(() => h.current = !0);
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
	W(() => x(), [x]);
	let [S, C] = e.useState();
	return W(() => {
		u && C(window.getComputedStyle(u).zIndex);
	}, [u]), /* @__PURE__ */ p(Mc, {
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
kc.displayName = Oc;
var Ac = "SelectPopperPosition", jc = e.forwardRef((e, t) => {
	let { __scopeSelect: n, align: r = "start", collisionPadding: i = Sc, ...a } = e;
	return /* @__PURE__ */ p(Eo, {
		...oc(n),
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
jc.displayName = Ac;
var [Mc, Nc] = ic(bc, {}), Pc = "SelectViewport", Fc = e.forwardRef((t, n) => {
	let { __scopeSelect: r, nonce: i, ...a } = t, o = wc(Pc, r), s = Nc(Pc, r), c = H(n, o.onViewportChange), l = e.useRef(0);
	return /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p("style", {
		dangerouslySetInnerHTML: { __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}" },
		nonce: i
	}), /* @__PURE__ */ p(tc.Slot, {
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
						let r = window.innerHeight - Sc * 2, i = parseFloat(n.style.minHeight), a = parseFloat(n.style.height), o = Math.max(i, a);
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
Fc.displayName = Pc;
var Ic = "SelectGroup", [Lc, Rc] = ic(Ic), zc = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e, i = He();
	return /* @__PURE__ */ p(Lc, {
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
zc.displayName = Ic;
var Bc = "SelectLabel", Vc = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e, i = Rc(Bc, n);
	return /* @__PURE__ */ p(U.div, {
		id: i.id,
		...r,
		ref: t
	});
});
Vc.displayName = Bc;
var Hc = "SelectItem", [Uc, Wc] = ic(Hc), Gc = e.forwardRef((t, n) => {
	let { __scopeSelect: r, value: i, disabled: a = !1, textValue: o, ...s } = t, c = cc(Hc, r), l = wc(Hc, r), u = c.value === i, [d, f] = e.useState(o ?? ""), [m, h] = e.useState(!1), g = H(n, (e) => l.itemRefCallback?.(e, i, a)), _ = He(), v = e.useRef("touch"), y = () => {
		a || (c.onValueChange(i), c.onOpenChange(!1));
	};
	if (i === "") throw Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
	return /* @__PURE__ */ p(Uc, {
		scope: r,
		value: i,
		disabled: a,
		textId: _,
		isSelected: u,
		onItemTextChange: e.useCallback((e) => {
			f((t) => t || (e?.textContent ?? "").trim());
		}, []),
		children: /* @__PURE__ */ p(tc.ItemSlot, {
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
					l.searchRef?.current !== "" && e.key === " " || ($s.includes(e.key) && y(), e.key === " " && e.preventDefault());
				})
			})
		})
	});
});
Gc.displayName = Hc;
var Kc = "SelectItemText", qc = e.forwardRef((t, n) => {
	let { __scopeSelect: r, className: i, style: a, ...o } = t, s = cc(Kc, r), c = wc(Kc, r), l = Wc(Kc, r), u = uc(Kc, r), [d, g] = e.useState(null), _ = H(n, (e) => g(e), l.onItemTextChange, (e) => c.itemTextRefCallback?.(e, l.value, l.disabled)), v = d?.textContent, y = e.useMemo(() => /* @__PURE__ */ p("option", {
		value: l.value,
		disabled: l.disabled,
		children: v
	}, l.value), [
		l.disabled,
		l.value,
		v
	]), { onNativeOptionAdd: b, onNativeOptionRemove: x } = u;
	return W(() => (b(y), () => x(y)), [
		b,
		x,
		y
	]), /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p(U.span, {
		id: l.textId,
		...o,
		ref: _
	}), l.isSelected && s.valueNode && !s.valueNodeHasChildren ? h.createPortal(o.children, s.valueNode) : null] });
});
qc.displayName = Kc;
var Jc = "SelectItemIndicator", Yc = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e;
	return Wc(Jc, n).isSelected ? /* @__PURE__ */ p(U.span, {
		"aria-hidden": !0,
		...r,
		ref: t
	}) : null;
});
Yc.displayName = Jc;
var Xc = "SelectScrollUpButton", Zc = e.forwardRef((t, n) => {
	let r = wc(Xc, t.__scopeSelect), i = Nc(Xc, t.__scopeSelect), [a, o] = e.useState(!1), s = H(n, i.onScrollButtonChange);
	return W(() => {
		if (r.viewport && r.isPositioned) {
			let e = function() {
				o(t.scrollTop > 0);
			}, t = r.viewport;
			return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e);
		}
	}, [r.viewport, r.isPositioned]), a ? /* @__PURE__ */ p(el, {
		...t,
		ref: s,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: t } = r;
			e && t && (e.scrollTop -= t.offsetHeight);
		}
	}) : null;
});
Zc.displayName = Xc;
var Qc = "SelectScrollDownButton", $c = e.forwardRef((t, n) => {
	let r = wc(Qc, t.__scopeSelect), i = Nc(Qc, t.__scopeSelect), [a, o] = e.useState(!1), s = H(n, i.onScrollButtonChange);
	return W(() => {
		if (r.viewport && r.isPositioned) {
			let e = function() {
				let e = t.scrollHeight - t.clientHeight;
				o(Math.ceil(t.scrollTop) < e);
			}, t = r.viewport;
			return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e);
		}
	}, [r.viewport, r.isPositioned]), a ? /* @__PURE__ */ p(el, {
		...t,
		ref: s,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: t } = r;
			e && t && (e.scrollTop += t.offsetHeight);
		}
	}) : null;
});
$c.displayName = Qc;
var el = e.forwardRef((t, n) => {
	let { __scopeSelect: r, onAutoScroll: i, ...a } = t, o = wc("SelectScrollButton", r), s = e.useRef(null), c = nc(r), l = e.useCallback(() => {
		s.current !== null && (window.clearInterval(s.current), s.current = null);
	}, []);
	return e.useEffect(() => () => l(), [l]), W(() => {
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
}), tl = "SelectSeparator", nl = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e;
	return /* @__PURE__ */ p(U.div, {
		"aria-hidden": !0,
		...r,
		ref: t
	});
});
nl.displayName = tl;
var rl = "SelectArrow", il = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e, i = oc(n), a = cc(rl, n), o = wc(rl, n);
	return a.open && o.position === "popper" ? /* @__PURE__ */ p(Do, {
		...i,
		...r,
		ref: t
	}) : null;
});
il.displayName = rl;
var al = "SelectBubbleInput", ol = e.forwardRef(({ __scopeSelect: t, value: n, ...r }, i) => {
	let a = e.useRef(null), o = H(i, a), s = vt(n);
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
			...Ao,
			...r.style
		},
		ref: o,
		defaultValue: n
	});
});
ol.displayName = al;
function sl(e) {
	return e === "" || e === void 0;
}
function cl(t) {
	let n = Ue(t), r = e.useRef(""), i = e.useRef(0), a = e.useCallback((e) => {
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
function ll(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = ul(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.textValue.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
function ul(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
var dl = dc, fl = pc, pl = hc, ml = _c, hl = yc, gl = xc, _l = Fc, vl = Gc, yl = qc, bl = Yc, xl = {
	container: "_container_1b5nb_1",
	levelWrapper: "_levelWrapper_1b5nb_19",
	trigger: "_trigger_1b5nb_26",
	content: "_content_1b5nb_60",
	item: "_item_1b5nb_72",
	separator: "_separator_1b5nb_91",
	levelLabel: "_levelLabel_1b5nb_102",
	triggerContent: "_triggerContent_1b5nb_112",
	triggerIcon: "_triggerIcon_1b5nb_122",
	viewport: "_viewport_1b5nb_129",
	itemIndicator: "_itemIndicator_1b5nb_134"
};
//#endregion
//#region src/components/HierarchicalCombobox/index.tsx
function Sl({ levels: t, className: n }) {
	return /* @__PURE__ */ p("div", {
		className: x(xl.container, n),
		children: t.map((n, r) => {
			let i = n.options.length === 1;
			return /* @__PURE__ */ m(e.Fragment, { children: [/* @__PURE__ */ m("div", {
				className: xl.levelWrapper,
				children: [n.label && /* @__PURE__ */ p(D, {
					as: "label",
					variant: "p",
					className: xl.levelLabel,
					style: { color: "color-mix(in srgb, var(--color-secundaria), transparent 30%)" },
					children: n.label
				}), i ? /* @__PURE__ */ p("div", {
					className: xl.trigger,
					style: {
						background: "transparent",
						border: "none",
						boxShadow: "none",
						paddingLeft: 0,
						cursor: "default",
						paddingRight: "12px"
					},
					children: /* @__PURE__ */ m("div", {
						className: xl.triggerContent,
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
				}) : /* @__PURE__ */ m(dl, {
					value: n.value,
					defaultValue: n.defaultValue,
					onValueChange: n.onChange,
					disabled: n.disabled,
					children: [/* @__PURE__ */ m(fl, {
						className: xl.trigger,
						children: [/* @__PURE__ */ m("div", {
							className: xl.triggerContent,
							children: [n.icon && /* @__PURE__ */ p(n.icon, {
								size: 16,
								style: {
									color: "var(--color-secundaria)",
									opacity: .7
								}
							}), /* @__PURE__ */ p(pl, { placeholder: n.placeholder || "Selecione..." })]
						}), /* @__PURE__ */ p(ml, {
							asChild: !0,
							children: /* @__PURE__ */ p(ie, {
								size: 16,
								className: xl.triggerIcon
							})
						})]
					}), /* @__PURE__ */ p(hl, { children: /* @__PURE__ */ p(gl, {
						className: xl.content,
						position: "popper",
						sideOffset: 4,
						children: /* @__PURE__ */ p(_l, {
							className: xl.viewport,
							children: n.options.map((e) => /* @__PURE__ */ m(vl, {
								value: e.value,
								className: xl.item,
								children: [/* @__PURE__ */ p("span", {
									className: xl.itemIndicator,
									children: /* @__PURE__ */ p(bl, { children: /* @__PURE__ */ p(z, { size: 16 }) })
								}), /* @__PURE__ */ p(yl, { children: e.label })]
							}, e.value))
						})
					}) })]
				})]
			}), r < t.length - 1 && /* @__PURE__ */ p("div", {
				className: xl.separator,
				children: /* @__PURE__ */ p(re, {
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
var Cl = {
	container: "_container_kkcs5_1",
	label: "_label_kkcs5_9",
	trigger: "_trigger_kkcs5_15",
	triggerError: "_triggerError_kkcs5_34",
	inputField: "_inputField_kkcs5_38",
	errorMessage: "_errorMessage_kkcs5_52",
	removeTagBtn: "_removeTagBtn_kkcs5_58"
}, wl = i(({ className: e, value: t, defaultValue: n, onChange: r, label: i, error: a, id: o, placeholder: s = "Aperte Enter para adicionar...", ...c }, l) => {
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
		className: x(Cl.container, e),
		children: [
			i && /* @__PURE__ */ p("label", {
				htmlFor: y,
				className: Cl.label,
				children: i
			}),
			/* @__PURE__ */ m("div", {
				className: x(Cl.trigger, v && Cl.triggerError),
				onClick: () => document.getElementById(y || "")?.focus(),
				children: [_.map((e) => /* @__PURE__ */ m(A, {
					intent: "primaria",
					variant: "solid",
					children: [e, /* @__PURE__ */ p("button", {
						type: "button",
						className: Cl.removeTagBtn,
						onClick: (t) => {
							t.stopPropagation(), S(e);
						},
						children: /* @__PURE__ */ p(pe, { size: 12 })
					})]
				}, e)), /* @__PURE__ */ p("input", {
					id: y,
					ref: l,
					type: "text",
					className: Cl.inputField,
					value: h,
					onChange: (e) => g(e.target.value),
					onKeyDown: b,
					placeholder: _.length === 0 ? s : "",
					...c
				})]
			}),
			a && /* @__PURE__ */ p("span", {
				className: Cl.errorMessage,
				children: a
			})
		]
	});
});
wl.displayName = "TagInput";
//#endregion
//#region node_modules/@radix-ui/react-menu/dist/index.mjs
var Tl = ["Enter", " "], El = [
	"ArrowDown",
	"PageUp",
	"Home"
], Dl = [
	"ArrowUp",
	"PageDown",
	"End"
], Ol = [...El, ...Dl], kl = {
	ltr: [...Tl, "ArrowRight"],
	rtl: [...Tl, "ArrowLeft"]
}, Al = {
	ltr: ["ArrowLeft"],
	rtl: ["ArrowRight"]
}, jl = "Menu", [Ml, Nl, Pl] = ze(jl), [Fl, Il] = ke(jl, [
	Pl,
	so,
	rt
]), Ll = so(), Rl = rt(), [zl, Bl] = Fl(jl), [Vl, Hl] = Fl(jl), Ul = (t) => {
	let { __scopeMenu: n, open: r = !1, children: i, dir: a, onOpenChange: o, modal: s = !0 } = t, c = Ll(n), [l, u] = e.useState(null), d = e.useRef(!1), f = Ue(o), m = Ye(a);
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
	}, []), /* @__PURE__ */ p(wo, {
		...c,
		children: /* @__PURE__ */ p(zl, {
			scope: n,
			open: r,
			onOpenChange: f,
			content: l,
			onContentChange: u,
			children: /* @__PURE__ */ p(Vl, {
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
Ul.displayName = jl;
var Wl = "MenuAnchor", Gl = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ p(To, {
		...Ll(n),
		...r,
		ref: t
	});
});
Gl.displayName = Wl;
var Kl = "MenuPortal", [ql, Jl] = Fl(Kl, { forceMount: void 0 }), Yl = (e) => {
	let { __scopeMenu: t, forceMount: n, children: r, container: i } = e, a = Bl(Kl, t);
	return /* @__PURE__ */ p(ql, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ p(bt, {
			present: n || a.open,
			children: /* @__PURE__ */ p(ko, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
};
Yl.displayName = Kl;
var Xl = "MenuContent", [Zl, Ql] = Fl(Xl), $l = e.forwardRef((e, t) => {
	let n = Jl(Xl, e.__scopeMenu), { forceMount: r = n.forceMount, ...i } = e, a = Bl(Xl, e.__scopeMenu), o = Hl(Xl, e.__scopeMenu);
	return /* @__PURE__ */ p(Ml.Provider, {
		scope: e.__scopeMenu,
		children: /* @__PURE__ */ p(bt, {
			present: r || a.open,
			children: /* @__PURE__ */ p(Ml.Slot, {
				scope: e.__scopeMenu,
				children: o.modal ? /* @__PURE__ */ p(eu, {
					...i,
					ref: t
				}) : /* @__PURE__ */ p(tu, {
					...i,
					ref: t
				})
			})
		})
	});
}), eu = e.forwardRef((t, n) => {
	let r = Bl(Xl, t.__scopeMenu), i = e.useRef(null), a = H(n, i);
	return e.useEffect(() => {
		let e = i.current;
		if (e) return Ho(e);
	}, []), /* @__PURE__ */ p(ru, {
		...t,
		ref: a,
		trapFocus: r.open,
		disableOutsidePointerEvents: r.open,
		disableOutsideScroll: !0,
		onFocusOutside: V(t.onFocusOutside, (e) => e.preventDefault(), { checkForDefaultPrevented: !1 }),
		onDismiss: () => r.onOpenChange(!1)
	});
}), tu = e.forwardRef((e, t) => {
	let n = Bl(Xl, e.__scopeMenu);
	return /* @__PURE__ */ p(ru, {
		...e,
		ref: t,
		trapFocus: !1,
		disableOutsidePointerEvents: !1,
		disableOutsideScroll: !1,
		onDismiss: () => n.onOpenChange(!1)
	});
}), nu = /* @__PURE__ */ je("MenuContent.ScrollLock"), ru = e.forwardRef((t, n) => {
	let { __scopeMenu: r, loop: i = !1, trapFocus: a, onOpenAutoFocus: o, onCloseAutoFocus: s, disableOutsidePointerEvents: c, onEntryFocus: l, onEscapeKeyDown: u, onPointerDownOutside: d, onFocusOutside: f, onInteractOutside: m, onDismiss: h, disableOutsideScroll: g, ..._ } = t, v = Bl(Xl, r), y = Hl(Xl, r), b = Ll(r), x = Rl(r), S = Nl(r), [C, w] = e.useState(null), T = e.useRef(null), E = H(n, T, v.onContentChange), D = e.useRef(0), O = e.useRef(""), k = e.useRef(0), A = e.useRef(null), j = e.useRef("right"), M = e.useRef(0), N = g ? Zs : e.Fragment, P = g ? {
		as: nu,
		allowPinchZoom: !0
	} : void 0, F = (e) => {
		let t = O.current + e, n = S().filter((e) => !e.disabled), r = document.activeElement, i = n.find((e) => e.ref.current === r)?.textValue, a = Vu(n.map((e) => e.textValue), t, i), o = n.find((e) => e.textValue === a)?.ref.current;
		(function e(t) {
			O.current = t, window.clearTimeout(D.current), t !== "" && (D.current = window.setTimeout(() => e(""), 1e3));
		})(t), o && setTimeout(() => o.focus());
	};
	e.useEffect(() => () => window.clearTimeout(D.current), []), Er();
	let I = e.useCallback((e) => j.current === A.current?.side && Uu(e, A.current?.area), []);
	return /* @__PURE__ */ p(Zl, {
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
			children: /* @__PURE__ */ p(Mr, {
				asChild: !0,
				trapped: a,
				onMountAutoFocus: V(o, (e) => {
					e.preventDefault(), T.current?.focus({ preventScroll: !0 });
				}),
				onUnmountAutoFocus: s,
				children: /* @__PURE__ */ p(vr, {
					asChild: !0,
					disableOutsidePointerEvents: c,
					onEscapeKeyDown: u,
					onPointerDownOutside: d,
					onFocusOutside: f,
					onInteractOutside: m,
					onDismiss: h,
					children: /* @__PURE__ */ p(ht, {
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
						children: /* @__PURE__ */ p(Eo, {
							role: "menu",
							"aria-orientation": "vertical",
							"data-state": Iu(v.open),
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
								if (e.target !== i || !Ol.includes(e.key)) return;
								e.preventDefault();
								let a = S().filter((e) => !e.disabled).map((e) => e.ref.current);
								Dl.includes(e.key) && a.reverse(), zu(a);
							}),
							onBlur: V(t.onBlur, (e) => {
								e.currentTarget.contains(e.target) || (window.clearTimeout(D.current), O.current = "");
							}),
							onPointerMove: V(t.onPointerMove, Wu((e) => {
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
$l.displayName = Xl;
var iu = "MenuGroup", au = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ p(U.div, {
		role: "group",
		...r,
		ref: t
	});
});
au.displayName = iu;
var ou = "MenuLabel", su = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ p(U.div, {
		...r,
		ref: t
	});
});
su.displayName = ou;
var cu = "MenuItem", lu = "menu.itemSelect", uu = e.forwardRef((t, n) => {
	let { disabled: r = !1, onSelect: i, ...a } = t, o = e.useRef(null), s = Hl(cu, t.__scopeMenu), c = Ql(cu, t.__scopeMenu), l = H(n, o), u = e.useRef(!1), d = () => {
		let e = o.current;
		if (!r && e) {
			let t = new CustomEvent(lu, {
				bubbles: !0,
				cancelable: !0
			});
			e.addEventListener(lu, (e) => i?.(e), { once: !0 }), Re(e, t), t.defaultPrevented ? u.current = !1 : s.onClose();
		}
	};
	return /* @__PURE__ */ p(du, {
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
			r || t && e.key === " " || Tl.includes(e.key) && (e.currentTarget.click(), e.preventDefault());
		})
	});
});
uu.displayName = cu;
var du = e.forwardRef((t, n) => {
	let { __scopeMenu: r, disabled: i = !1, textValue: a, ...o } = t, s = Ql(cu, r), c = Rl(r), l = e.useRef(null), u = H(n, l), [d, f] = e.useState(!1), [m, h] = e.useState("");
	return e.useEffect(() => {
		let e = l.current;
		e && h((e.textContent ?? "").trim());
	}, [o.children]), /* @__PURE__ */ p(Ml.ItemSlot, {
		scope: r,
		disabled: i,
		textValue: a ?? m,
		children: /* @__PURE__ */ p(gt, {
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
				onPointerMove: V(t.onPointerMove, Wu((e) => {
					i ? s.onItemLeave(e) : (s.onItemEnter(e), e.defaultPrevented || e.currentTarget.focus({ preventScroll: !0 }));
				})),
				onPointerLeave: V(t.onPointerLeave, Wu((e) => s.onItemLeave(e))),
				onFocus: V(t.onFocus, () => f(!0)),
				onBlur: V(t.onBlur, () => f(!1))
			})
		})
	});
}), fu = "MenuCheckboxItem", pu = e.forwardRef((e, t) => {
	let { checked: n = !1, onCheckedChange: r, ...i } = e;
	return /* @__PURE__ */ p(xu, {
		scope: e.__scopeMenu,
		checked: n,
		children: /* @__PURE__ */ p(uu, {
			role: "menuitemcheckbox",
			"aria-checked": Lu(n) ? "mixed" : n,
			...i,
			ref: t,
			"data-state": Ru(n),
			onSelect: V(i.onSelect, () => r?.(Lu(n) ? !0 : !n), { checkForDefaultPrevented: !1 })
		})
	});
});
pu.displayName = fu;
var mu = "MenuRadioGroup", [hu, gu] = Fl(mu, {
	value: void 0,
	onValueChange: () => {}
}), _u = e.forwardRef((e, t) => {
	let { value: n, onValueChange: r, ...i } = e, a = Ue(r);
	return /* @__PURE__ */ p(hu, {
		scope: e.__scopeMenu,
		value: n,
		onValueChange: a,
		children: /* @__PURE__ */ p(au, {
			...i,
			ref: t
		})
	});
});
_u.displayName = mu;
var vu = "MenuRadioItem", yu = e.forwardRef((e, t) => {
	let { value: n, ...r } = e, i = gu(vu, e.__scopeMenu), a = n === i.value;
	return /* @__PURE__ */ p(xu, {
		scope: e.__scopeMenu,
		checked: a,
		children: /* @__PURE__ */ p(uu, {
			role: "menuitemradio",
			"aria-checked": a,
			...r,
			ref: t,
			"data-state": Ru(a),
			onSelect: V(r.onSelect, () => i.onValueChange?.(n), { checkForDefaultPrevented: !1 })
		})
	});
});
yu.displayName = vu;
var bu = "MenuItemIndicator", [xu, Su] = Fl(bu, { checked: !1 }), Cu = e.forwardRef((e, t) => {
	let { __scopeMenu: n, forceMount: r, ...i } = e, a = Su(bu, n);
	return /* @__PURE__ */ p(bt, {
		present: r || Lu(a.checked) || a.checked === !0,
		children: /* @__PURE__ */ p(U.span, {
			...i,
			ref: t,
			"data-state": Ru(a.checked)
		})
	});
});
Cu.displayName = bu;
var wu = "MenuSeparator", Tu = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ p(U.div, {
		role: "separator",
		"aria-orientation": "horizontal",
		...r,
		ref: t
	});
});
Tu.displayName = wu;
var Eu = "MenuArrow", Du = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ p(Do, {
		...Ll(n),
		...r,
		ref: t
	});
});
Du.displayName = Eu;
var Ou = "MenuSub", [ku, Au] = Fl(Ou), ju = (t) => {
	let { __scopeMenu: n, children: r, open: i = !1, onOpenChange: a } = t, o = Bl(Ou, n), s = Ll(n), [c, l] = e.useState(null), [u, d] = e.useState(null), f = Ue(a);
	return e.useEffect(() => (o.open === !1 && f(!1), () => f(!1)), [o.open, f]), /* @__PURE__ */ p(wo, {
		...s,
		children: /* @__PURE__ */ p(zl, {
			scope: n,
			open: i,
			onOpenChange: f,
			content: u,
			onContentChange: d,
			children: /* @__PURE__ */ p(ku, {
				scope: n,
				contentId: He(),
				triggerId: He(),
				trigger: c,
				onTriggerChange: l,
				children: r
			})
		})
	});
};
ju.displayName = Ou;
var Mu = "MenuSubTrigger", Nu = e.forwardRef((t, n) => {
	let r = Bl(Mu, t.__scopeMenu), i = Hl(Mu, t.__scopeMenu), a = Au(Mu, t.__scopeMenu), o = Ql(Mu, t.__scopeMenu), s = e.useRef(null), { pointerGraceTimerRef: c, onPointerGraceIntentChange: l } = o, u = { __scopeMenu: t.__scopeMenu }, d = e.useCallback(() => {
		s.current && window.clearTimeout(s.current), s.current = null;
	}, []);
	return e.useEffect(() => d, [d]), e.useEffect(() => {
		let e = c.current;
		return () => {
			window.clearTimeout(e), l(null);
		};
	}, [c, l]), /* @__PURE__ */ p(Gl, {
		asChild: !0,
		...u,
		children: /* @__PURE__ */ p(du, {
			id: a.triggerId,
			"aria-haspopup": "menu",
			"aria-expanded": r.open,
			"aria-controls": a.contentId,
			"data-state": Iu(r.open),
			...t,
			ref: De(n, a.onTriggerChange),
			onClick: (e) => {
				t.onClick?.(e), !(t.disabled || e.defaultPrevented) && (e.currentTarget.focus(), r.open || r.onOpenChange(!0));
			},
			onPointerMove: V(t.onPointerMove, Wu((e) => {
				o.onItemEnter(e), !e.defaultPrevented && !t.disabled && !r.open && !s.current && (o.onPointerGraceIntentChange(null), s.current = window.setTimeout(() => {
					r.onOpenChange(!0), d();
				}, 100));
			})),
			onPointerLeave: V(t.onPointerLeave, Wu((e) => {
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
				t.disabled || n && e.key === " " || kl[i.dir].includes(e.key) && (r.onOpenChange(!0), r.content?.focus(), e.preventDefault());
			})
		})
	});
});
Nu.displayName = Mu;
var Pu = "MenuSubContent", Fu = e.forwardRef((t, n) => {
	let r = Jl(Xl, t.__scopeMenu), { forceMount: i = r.forceMount, ...a } = t, o = Bl(Xl, t.__scopeMenu), s = Hl(Xl, t.__scopeMenu), c = Au(Pu, t.__scopeMenu), l = e.useRef(null), u = H(n, l);
	return /* @__PURE__ */ p(Ml.Provider, {
		scope: t.__scopeMenu,
		children: /* @__PURE__ */ p(bt, {
			present: i || o.open,
			children: /* @__PURE__ */ p(Ml.Slot, {
				scope: t.__scopeMenu,
				children: /* @__PURE__ */ p(ru, {
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
						let t = e.currentTarget.contains(e.target), n = Al[s.dir].includes(e.key);
						t && n && (o.onOpenChange(!1), c.trigger?.focus(), e.preventDefault());
					})
				})
			})
		})
	});
});
Fu.displayName = Pu;
function Iu(e) {
	return e ? "open" : "closed";
}
function Lu(e) {
	return e === "indeterminate";
}
function Ru(e) {
	return Lu(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function zu(e) {
	let t = document.activeElement;
	for (let n of e) if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function Bu(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
function Vu(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = Bu(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
function Hu(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e], s = t[a], c = o.x, l = o.y, u = s.x, d = s.y;
		l > r != d > r && n < (u - c) * (r - l) / (d - l) + c && (i = !i);
	}
	return i;
}
function Uu(e, t) {
	return t ? Hu({
		x: e.clientX,
		y: e.clientY
	}, t) : !1;
}
function Wu(e) {
	return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var Gu = Ul, Ku = Gl, qu = Yl, Ju = $l, Yu = au, Xu = su, Zu = uu, Qu = pu, $u = _u, ed = yu, td = Cu, nd = Tu, rd = Du, id = ju, ad = Nu, od = Fu, sd = "DropdownMenu", [cd, ld] = ke(sd, [Il]), K = Il(), [ud, dd] = cd(sd), fd = (t) => {
	let { __scopeDropdownMenu: n, children: r, dir: i, open: a, defaultOpen: o, onOpenChange: s, modal: c = !0 } = t, l = K(n), u = e.useRef(null), [d, f] = Ge({
		prop: a,
		defaultProp: o ?? !1,
		onChange: s,
		caller: sd
	});
	return /* @__PURE__ */ p(ud, {
		scope: n,
		triggerId: He(),
		triggerRef: u,
		contentId: He(),
		open: d,
		onOpenChange: f,
		onOpenToggle: e.useCallback(() => f((e) => !e), [f]),
		modal: c,
		children: /* @__PURE__ */ p(Gu, {
			...l,
			open: d,
			onOpenChange: f,
			dir: i,
			modal: c,
			children: r
		})
	});
};
fd.displayName = sd;
var pd = "DropdownMenuTrigger", md = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, disabled: r = !1, ...i } = e, a = dd(pd, n);
	return /* @__PURE__ */ p(Ku, {
		asChild: !0,
		...K(n),
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
			ref: De(t, a.triggerRef),
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
md.displayName = pd;
var hd = "DropdownMenuPortal", gd = (e) => {
	let { __scopeDropdownMenu: t, ...n } = e;
	return /* @__PURE__ */ p(qu, {
		...K(t),
		...n
	});
};
gd.displayName = hd;
var _d = "DropdownMenuContent", vd = e.forwardRef((t, n) => {
	let { __scopeDropdownMenu: r, ...i } = t, a = dd(_d, r), o = K(r), s = e.useRef(!1);
	return /* @__PURE__ */ p(Ju, {
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
vd.displayName = _d;
var yd = "DropdownMenuGroup", bd = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(Yu, {
		...K(n),
		...r,
		ref: t
	});
});
bd.displayName = yd;
var xd = "DropdownMenuLabel", Sd = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(Xu, {
		...K(n),
		...r,
		ref: t
	});
});
Sd.displayName = xd;
var Cd = "DropdownMenuItem", wd = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(Zu, {
		...K(n),
		...r,
		ref: t
	});
});
wd.displayName = Cd;
var Td = "DropdownMenuCheckboxItem", Ed = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(Qu, {
		...K(n),
		...r,
		ref: t
	});
});
Ed.displayName = Td;
var Dd = "DropdownMenuRadioGroup", Od = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p($u, {
		...K(n),
		...r,
		ref: t
	});
});
Od.displayName = Dd;
var kd = "DropdownMenuRadioItem", Ad = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(ed, {
		...K(n),
		...r,
		ref: t
	});
});
Ad.displayName = kd;
var jd = "DropdownMenuItemIndicator", Md = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(td, {
		...K(n),
		...r,
		ref: t
	});
});
Md.displayName = jd;
var Nd = "DropdownMenuSeparator", Pd = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(nd, {
		...K(n),
		...r,
		ref: t
	});
});
Pd.displayName = Nd;
var Fd = "DropdownMenuArrow", Id = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(rd, {
		...K(n),
		...r,
		ref: t
	});
});
Id.displayName = Fd;
var Ld = (e) => {
	let { __scopeDropdownMenu: t, children: n, open: r, onOpenChange: i, defaultOpen: a } = e, o = K(t), [s, c] = Ge({
		prop: r,
		defaultProp: a ?? !1,
		onChange: i,
		caller: "DropdownMenuSub"
	});
	return /* @__PURE__ */ p(id, {
		...o,
		open: s,
		onOpenChange: c,
		children: n
	});
}, Rd = "DropdownMenuSubTrigger", zd = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(ad, {
		...K(n),
		...r,
		ref: t
	});
});
zd.displayName = Rd;
var Bd = "DropdownMenuSubContent", Vd = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(od, {
		...K(n),
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
Vd.displayName = Bd;
var Hd = fd, Ud = md, Wd = gd, Gd = vd, Kd = bd, qd = Sd, Jd = wd, Yd = Ed, Xd = Od, Zd = Ad, Qd = Md, $d = Pd, ef = Ld, tf = zd, nf = Vd, rf = {
	content: "_content_1o55q_1",
	subContent: "_subContent_1o55q_2",
	dropdownShow: "_dropdownShow_1o55q_1",
	item: "_item_1o55q_24",
	subTrigger: "_subTrigger_1o55q_25",
	checkboxItem: "_checkboxItem_1o55q_26",
	radioItem: "_radioItem_1o55q_27",
	inset: "_inset_1o55q_56",
	label: "_label_1o55q_60",
	separator: "_separator_1o55q_67",
	shortcut: "_shortcut_1o55q_73",
	indicator: "_indicator_1o55q_80"
}, af = Hd, of = Ud, sf = Kd, cf = Wd, lf = ef, uf = Xd, df = e.forwardRef(({ className: e, inset: t, children: n, ...r }, i) => /* @__PURE__ */ m(tf, {
	ref: i,
	className: x(rf.subTrigger, t && rf.inset, e),
	...r,
	children: [n, /* @__PURE__ */ p(re, { className: "ml-auto h-4 w-4" })]
}));
df.displayName = tf.displayName;
var ff = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p(nf, {
	ref: n,
	className: x(rf.subContent, e),
	...t
}));
ff.displayName = nf.displayName;
var pf = e.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ p(Wd, { children: /* @__PURE__ */ p(Gd, {
	ref: r,
	sideOffset: t,
	className: x(rf.content, e),
	...n
}) }));
pf.displayName = Gd.displayName;
var mf = e.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ p(Jd, {
	ref: r,
	className: x(rf.item, t && rf.inset, e),
	...n
}));
mf.displayName = Jd.displayName;
var hf = e.forwardRef(({ className: e, children: t, checked: n, ...r }, i) => /* @__PURE__ */ m(Yd, {
	ref: i,
	className: x(rf.checkboxItem, e),
	checked: n,
	...r,
	children: [/* @__PURE__ */ p("span", {
		className: rf.indicator,
		children: /* @__PURE__ */ p(Qd, { children: /* @__PURE__ */ p(z, { className: "h-4 w-4" }) })
	}), t]
}));
hf.displayName = Yd.displayName;
var gf = e.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ m(Zd, {
	ref: r,
	className: x(rf.radioItem, e),
	...n,
	children: [/* @__PURE__ */ p("span", {
		className: rf.indicator,
		children: /* @__PURE__ */ p(Qd, { children: /* @__PURE__ */ p(oe, { className: "h-2 w-2 fill-current" }) })
	}), t]
}));
gf.displayName = Zd.displayName;
var _f = e.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ p(qd, {
	ref: r,
	className: x(rf.label, t && rf.inset, e),
	...n
}));
_f.displayName = qd.displayName;
var vf = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p($d, {
	ref: n,
	className: x(rf.separator, e),
	...t
}));
vf.displayName = $d.displayName;
var yf = ({ className: e, ...t }) => /* @__PURE__ */ p("span", {
	className: x(rf.shortcut, e),
	...t
});
yf.displayName = "DropdownMenuShortcut";
var q = {
	wrapper: "_wrapper_xjq5k_1",
	scrollContainer: "_scrollContainer_xjq5k_10",
	table: "_table_xjq5k_14",
	thead: "_thead_xjq5k_22",
	th: "_th_xjq5k_22",
	tr: "_tr_xjq5k_38",
	trSelected: "_trSelected_xjq5k_47",
	td: "_td_xjq5k_51",
	checkboxCell: "_checkboxCell_xjq5k_59",
	actionsCell: "_actionsCell_xjq5k_66",
	sortButton: "_sortButton_xjq5k_72",
	emptyState: "_emptyState_xjq5k_88",
	thContent: "_thContent_xjq5k_94",
	sortIconActive: "_sortIconActive_xjq5k_100",
	sortIconInactive: "_sortIconInactive_xjq5k_104",
	destructiveItem: "_destructiveItem_xjq5k_108"
};
//#endregion
//#region src/components/DataTable/index.tsx
function bf({ data: e, columns: t, keyExtractor: n, actions: r, onSelectionChange: i, className: a, selectable: o = !0 }) {
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
							children: /* @__PURE__ */ p(Te, {
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
								children: /* @__PURE__ */ p(Te, {
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
								children: /* @__PURE__ */ m(af, { children: [/* @__PURE__ */ p(of, {
									asChild: !0,
									children: /* @__PURE__ */ p(be, {
										variant: "ghost",
										size: "sm",
										children: /* @__PURE__ */ p(le, { size: 16 })
									})
								}), /* @__PURE__ */ m(pf, {
									align: "end",
									children: [
										/* @__PURE__ */ p(_f, { children: "Ações" }),
										/* @__PURE__ */ p(vf, {}),
										r.map((t, n) => /* @__PURE__ */ p(mf, {
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
var xf = 365.2425, Sf = 6048e5, Cf = 864e5, wf = 3600 * 24;
wf * 7, wf * xf / 12 * 3;
var Tf = Symbol.for("constructDateFrom");
//#endregion
//#region node_modules/date-fns/constructFrom.js
function J(e, t) {
	return typeof e == "function" ? e(t) : e && typeof e == "object" && Tf in e ? e[Tf](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
//#endregion
//#region node_modules/date-fns/toDate.js
function Y(e, t) {
	return J(t || e, e);
}
//#endregion
//#region node_modules/date-fns/addDays.js
function Ef(e, t, n) {
	let r = Y(e, n?.in);
	return isNaN(t) ? J(n?.in || e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
//#endregion
//#region node_modules/date-fns/addMonths.js
function Df(e, t, n) {
	let r = Y(e, n?.in);
	if (isNaN(t)) return J(n?.in || e, NaN);
	if (!t) return r;
	let i = r.getDate(), a = J(n?.in || e, r.getTime());
	return a.setMonth(r.getMonth() + t + 1, 0), i >= a.getDate() ? a : (r.setFullYear(a.getFullYear(), a.getMonth(), i), r);
}
//#endregion
//#region node_modules/date-fns/_lib/defaultOptions.js
var Of = {};
function kf() {
	return Of;
}
//#endregion
//#region node_modules/date-fns/startOfWeek.js
function Af(e, t) {
	let n = kf(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, i = Y(e, t?.in), a = i.getDay(), o = (a < r ? 7 : 0) + a - r;
	return i.setDate(i.getDate() - o), i.setHours(0, 0, 0, 0), i;
}
//#endregion
//#region node_modules/date-fns/startOfISOWeek.js
function jf(e, t) {
	return Af(e, {
		...t,
		weekStartsOn: 1
	});
}
//#endregion
//#region node_modules/date-fns/getISOWeekYear.js
function Mf(e, t) {
	let n = Y(e, t?.in), r = n.getFullYear(), i = J(n, 0);
	i.setFullYear(r + 1, 0, 4), i.setHours(0, 0, 0, 0);
	let a = jf(i), o = J(n, 0);
	o.setFullYear(r, 0, 4), o.setHours(0, 0, 0, 0);
	let s = jf(o);
	return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= s.getTime() ? r : r - 1;
}
//#endregion
//#region node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js
function Nf(e) {
	let t = Y(e), n = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()));
	return n.setUTCFullYear(t.getFullYear()), e - +n;
}
//#endregion
//#region node_modules/date-fns/_lib/normalizeDates.js
function Pf(e, ...t) {
	let n = J.bind(null, e || t.find((e) => typeof e == "object"));
	return t.map(n);
}
//#endregion
//#region node_modules/date-fns/startOfDay.js
function Ff(e, t) {
	let n = Y(e, t?.in);
	return n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/date-fns/differenceInCalendarDays.js
function If(e, t, n) {
	let [r, i] = Pf(n?.in, e, t), a = Ff(r), o = Ff(i), s = +a - Nf(a), c = +o - Nf(o);
	return Math.round((s - c) / Cf);
}
//#endregion
//#region node_modules/date-fns/startOfISOWeekYear.js
function Lf(e, t) {
	let n = Mf(e, t), r = J(t?.in || e, 0);
	return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), jf(r);
}
//#endregion
//#region node_modules/date-fns/addWeeks.js
function Rf(e, t, n) {
	return Ef(e, t * 7, n);
}
//#endregion
//#region node_modules/date-fns/addYears.js
function zf(e, t, n) {
	return Df(e, t * 12, n);
}
//#endregion
//#region node_modules/date-fns/max.js
function Bf(e, t) {
	let n, r = t?.in;
	return e.forEach((e) => {
		!r && typeof e == "object" && (r = J.bind(null, e));
		let t = Y(e, r);
		(!n || n < t || isNaN(+t)) && (n = t);
	}), J(r, n || NaN);
}
//#endregion
//#region node_modules/date-fns/min.js
function Vf(e, t) {
	let n, r = t?.in;
	return e.forEach((e) => {
		!r && typeof e == "object" && (r = J.bind(null, e));
		let t = Y(e, r);
		(!n || n > t || isNaN(+t)) && (n = t);
	}), J(r, n || NaN);
}
//#endregion
//#region node_modules/date-fns/isSameDay.js
function Hf(e, t, n) {
	let [r, i] = Pf(n?.in, e, t);
	return +Ff(r) == +Ff(i);
}
//#endregion
//#region node_modules/date-fns/isDate.js
function Uf(e) {
	return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
//#endregion
//#region node_modules/date-fns/isValid.js
function Wf(e) {
	return !(!Uf(e) && typeof e != "number" || isNaN(+Y(e)));
}
//#endregion
//#region node_modules/date-fns/differenceInCalendarMonths.js
function Gf(e, t, n) {
	let [r, i] = Pf(n?.in, e, t), a = r.getFullYear() - i.getFullYear(), o = r.getMonth() - i.getMonth();
	return a * 12 + o;
}
//#endregion
//#region node_modules/date-fns/endOfMonth.js
function Kf(e, t) {
	let n = Y(e, t?.in), r = n.getMonth();
	return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
//#endregion
//#region node_modules/date-fns/_lib/normalizeInterval.js
function qf(e, t) {
	let [n, r] = Pf(e, t.start, t.end);
	return {
		start: n,
		end: r
	};
}
//#endregion
//#region node_modules/date-fns/eachMonthOfInterval.js
function Jf(e, t) {
	let { start: n, end: r } = qf(t?.in, e), i = +n > +r, a = i ? +n : +r, o = i ? r : n;
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
function Yf(e, t) {
	let n = Y(e, t?.in);
	return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/date-fns/endOfYear.js
function Xf(e, t) {
	let n = Y(e, t?.in), r = n.getFullYear();
	return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
//#endregion
//#region node_modules/date-fns/startOfYear.js
function Zf(e, t) {
	let n = Y(e, t?.in);
	return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/date-fns/eachYearOfInterval.js
function Qf(e, t) {
	let { start: n, end: r } = qf(t?.in, e), i = +n > +r, a = i ? +n : +r, o = i ? r : n;
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
function $f(e, t) {
	let n = kf(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, i = Y(e, t?.in), a = i.getDay(), o = (a < r ? -7 : 0) + 6 - (a - r);
	return i.setDate(i.getDate() + o), i.setHours(23, 59, 59, 999), i;
}
//#endregion
//#region node_modules/date-fns/endOfISOWeek.js
function ep(e, t) {
	return $f(e, {
		...t,
		weekStartsOn: 1
	});
}
//#endregion
//#region node_modules/date-fns/locale/en-US/_lib/formatDistance.js
var tp = {
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
}, np = (e, t, n) => {
	let r, i = tp[e];
	return r = typeof i == "string" ? i : t === 1 ? i.one : i.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
//#endregion
//#region node_modules/date-fns/locale/_lib/buildFormatLongFn.js
function rp(e) {
	return (t = {}) => {
		let n = t.width ? String(t.width) : e.defaultWidth;
		return e.formats[n] || e.formats[e.defaultWidth];
	};
}
var ip = {
	date: rp({
		formats: {
			full: "EEEE, MMMM do, y",
			long: "MMMM do, y",
			medium: "MMM d, y",
			short: "MM/dd/yyyy"
		},
		defaultWidth: "full"
	}),
	time: rp({
		formats: {
			full: "h:mm:ss a zzzz",
			long: "h:mm:ss a z",
			medium: "h:mm:ss a",
			short: "h:mm a"
		},
		defaultWidth: "full"
	}),
	dateTime: rp({
		formats: {
			full: "{{date}} 'at' {{time}}",
			long: "{{date}} 'at' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, ap = {
	lastWeek: "'last' eeee 'at' p",
	yesterday: "'yesterday at' p",
	today: "'today at' p",
	tomorrow: "'tomorrow at' p",
	nextWeek: "eeee 'at' p",
	other: "P"
}, op = (e, t, n, r) => ap[e];
//#endregion
//#region node_modules/date-fns/locale/_lib/buildLocalizeFn.js
function sp(e) {
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
var cp = {
	ordinalNumber: (e, t) => {
		let n = Number(e), r = n % 100;
		if (r > 20 || r < 10) switch (r % 10) {
			case 1: return n + "st";
			case 2: return n + "nd";
			case 3: return n + "rd";
		}
		return n + "th";
	},
	era: sp({
		values: {
			narrow: ["B", "A"],
			abbreviated: ["BC", "AD"],
			wide: ["Before Christ", "Anno Domini"]
		},
		defaultWidth: "wide"
	}),
	quarter: sp({
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
	month: sp({
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
	day: sp({
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
	dayPeriod: sp({
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
function lp(e) {
	return (t, n = {}) => {
		let r = n.width, i = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(i);
		if (!a) return null;
		let o = a[0], s = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(s) ? dp(s, (e) => e.test(o)) : up(s, (e) => e.test(o)), l;
		l = e.valueCallback ? e.valueCallback(c) : c, l = n.valueCallback ? n.valueCallback(l) : l;
		let u = t.slice(o.length);
		return {
			value: l,
			rest: u
		};
	};
}
function up(e, t) {
	for (let n in e) if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n])) return n;
}
function dp(e, t) {
	for (let n = 0; n < e.length; n++) if (t(e[n])) return n;
}
//#endregion
//#region node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
function fp(e) {
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
var pp = {
	code: "en-US",
	formatDistance: np,
	formatLong: ip,
	formatRelative: op,
	localize: cp,
	match: {
		ordinalNumber: fp({
			matchPattern: /^(\d+)(th|st|nd|rd)?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: lp({
			matchPatterns: {
				narrow: /^(b|a)/i,
				abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
				wide: /^(before christ|before common era|anno domini|common era)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^b/i, /^(a|c)/i] },
			defaultParseWidth: "any"
		}),
		quarter: lp({
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
		month: lp({
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
		day: lp({
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
		dayPeriod: lp({
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
function mp(e, t) {
	let n = Y(e, t?.in);
	return If(n, Zf(n)) + 1;
}
//#endregion
//#region node_modules/date-fns/getISOWeek.js
function hp(e, t) {
	let n = Y(e, t?.in), r = jf(n) - +Lf(n);
	return Math.round(r / Sf) + 1;
}
//#endregion
//#region node_modules/date-fns/getWeekYear.js
function gp(e, t) {
	let n = Y(e, t?.in), r = n.getFullYear(), i = kf(), a = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? i.firstWeekContainsDate ?? i.locale?.options?.firstWeekContainsDate ?? 1, o = J(t?.in || e, 0);
	o.setFullYear(r + 1, 0, a), o.setHours(0, 0, 0, 0);
	let s = Af(o, t), c = J(t?.in || e, 0);
	c.setFullYear(r, 0, a), c.setHours(0, 0, 0, 0);
	let l = Af(c, t);
	return +n >= +s ? r + 1 : +n >= +l ? r : r - 1;
}
//#endregion
//#region node_modules/date-fns/startOfWeekYear.js
function _p(e, t) {
	let n = kf(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, i = gp(e, t), a = J(t?.in || e, 0);
	return a.setFullYear(i, 0, r), a.setHours(0, 0, 0, 0), Af(a, t);
}
//#endregion
//#region node_modules/date-fns/getWeek.js
function vp(e, t) {
	let n = Y(e, t?.in), r = Af(n, t) - +_p(n, t);
	return Math.round(r / Sf) + 1;
}
//#endregion
//#region node_modules/date-fns/_lib/addLeadingZeros.js
function X(e, t) {
	return (e < 0 ? "-" : "") + Math.abs(e).toString().padStart(t, "0");
}
//#endregion
//#region node_modules/date-fns/_lib/format/lightFormatters.js
var yp = {
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
}, bp = {
	am: "am",
	pm: "pm",
	midnight: "midnight",
	noon: "noon",
	morning: "morning",
	afternoon: "afternoon",
	evening: "evening",
	night: "night"
}, xp = {
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
		return yp.y(e, t);
	},
	Y: function(e, t, n, r) {
		let i = gp(e, r), a = i > 0 ? i : 1 - i;
		return t === "YY" ? X(a % 100, 2) : t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : X(a, t.length);
	},
	R: function(e, t) {
		return X(Mf(e), t.length);
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
			case "MM": return yp.M(e, t);
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
		let i = vp(e, r);
		return t === "wo" ? n.ordinalNumber(i, { unit: "week" }) : X(i, t.length);
	},
	I: function(e, t, n) {
		let r = hp(e);
		return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : X(r, t.length);
	},
	d: function(e, t, n) {
		return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : yp.d(e, t);
	},
	D: function(e, t, n) {
		let r = mp(e);
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
		switch (i = r === 12 ? bp.noon : r === 0 ? bp.midnight : r / 12 >= 1 ? "pm" : "am", t) {
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
		switch (i = r >= 17 ? bp.evening : r >= 12 ? bp.afternoon : r >= 4 ? bp.morning : bp.night, t) {
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
		return yp.h(e, t);
	},
	H: function(e, t, n) {
		return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : yp.H(e, t);
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
		return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : yp.m(e, t);
	},
	s: function(e, t, n) {
		return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : yp.s(e, t);
	},
	S: function(e, t) {
		return yp.S(e, t);
	},
	X: function(e, t, n) {
		let r = e.getTimezoneOffset();
		if (r === 0) return "Z";
		switch (t) {
			case "X": return Cp(r);
			case "XXXX":
			case "XX": return wp(r);
			default: return wp(r, ":");
		}
	},
	x: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "x": return Cp(r);
			case "xxxx":
			case "xx": return wp(r);
			default: return wp(r, ":");
		}
	},
	O: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "O":
			case "OO":
			case "OOO": return "GMT" + Sp(r, ":");
			default: return "GMT" + wp(r, ":");
		}
	},
	z: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "z":
			case "zz":
			case "zzz": return "GMT" + Sp(r, ":");
			default: return "GMT" + wp(r, ":");
		}
	},
	t: function(e, t, n) {
		return X(Math.trunc(e / 1e3), t.length);
	},
	T: function(e, t, n) {
		return X(+e, t.length);
	}
};
function Sp(e, t = "") {
	let n = e > 0 ? "-" : "+", r = Math.abs(e), i = Math.trunc(r / 60), a = r % 60;
	return a === 0 ? n + String(i) : n + String(i) + t + X(a, 2);
}
function Cp(e, t) {
	return e % 60 == 0 ? (e > 0 ? "-" : "+") + X(Math.abs(e) / 60, 2) : wp(e, t);
}
function wp(e, t = "") {
	let n = e > 0 ? "-" : "+", r = Math.abs(e), i = X(Math.trunc(r / 60), 2), a = X(r % 60, 2);
	return n + i + t + a;
}
//#endregion
//#region node_modules/date-fns/_lib/format/longFormatters.js
var Tp = (e, t) => {
	switch (e) {
		case "P": return t.date({ width: "short" });
		case "PP": return t.date({ width: "medium" });
		case "PPP": return t.date({ width: "long" });
		default: return t.date({ width: "full" });
	}
}, Ep = (e, t) => {
	switch (e) {
		case "p": return t.time({ width: "short" });
		case "pp": return t.time({ width: "medium" });
		case "ppp": return t.time({ width: "long" });
		default: return t.time({ width: "full" });
	}
}, Dp = {
	p: Ep,
	P: (e, t) => {
		let n = e.match(/(P+)(p+)?/) || [], r = n[1], i = n[2];
		if (!i) return Tp(e, t);
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
		return a.replace("{{date}}", Tp(r, t)).replace("{{time}}", Ep(i, t));
	}
}, Op = /^D+$/, kp = /^Y+$/, Ap = [
	"D",
	"DD",
	"YY",
	"YYYY"
];
function jp(e) {
	return Op.test(e);
}
function Mp(e) {
	return kp.test(e);
}
function Np(e, t, n) {
	let r = Pp(e, t, n);
	if (console.warn(r), Ap.includes(e)) throw RangeError(r);
}
function Pp(e, t, n) {
	let r = e[0] === "Y" ? "years" : "days of the month";
	return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
//#endregion
//#region node_modules/date-fns/format.js
var Fp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Ip = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Lp = /^'([^]*?)'?$/, Rp = /''/g, zp = /[a-zA-Z]/;
function Bp(e, t, n) {
	let r = kf(), i = n?.locale ?? r.locale ?? pp, a = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, o = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, s = Y(e, n?.in);
	if (!Wf(s)) throw RangeError("Invalid time value");
	let c = t.match(Ip).map((e) => {
		let t = e[0];
		if (t === "p" || t === "P") {
			let n = Dp[t];
			return n(e, i.formatLong);
		}
		return e;
	}).join("").match(Fp).map((e) => {
		if (e === "''") return {
			isToken: !1,
			value: "'"
		};
		let t = e[0];
		if (t === "'") return {
			isToken: !1,
			value: Vp(e)
		};
		if (xp[t]) return {
			isToken: !0,
			value: e
		};
		if (t.match(zp)) throw RangeError("Format string contains an unescaped latin alphabet character `" + t + "`");
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
		(!n?.useAdditionalWeekYearTokens && Mp(a) || !n?.useAdditionalDayOfYearTokens && jp(a)) && Np(a, t, String(e));
		let o = xp[a[0]];
		return o(s, a, i.localize, l);
	}).join("");
}
function Vp(e) {
	let t = e.match(Lp);
	return t ? t[1].replace(Rp, "'") : e;
}
//#endregion
//#region node_modules/date-fns/getDaysInMonth.js
function Hp(e, t) {
	let n = Y(e, t?.in), r = n.getFullYear(), i = n.getMonth(), a = J(n, 0);
	return a.setFullYear(r, i + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
//#endregion
//#region node_modules/date-fns/getMonth.js
function Up(e, t) {
	return Y(e, t?.in).getMonth();
}
//#endregion
//#region node_modules/date-fns/getYear.js
function Wp(e, t) {
	return Y(e, t?.in).getFullYear();
}
//#endregion
//#region node_modules/date-fns/isAfter.js
function Gp(e, t) {
	return +Y(e) > +Y(t);
}
//#endregion
//#region node_modules/date-fns/isBefore.js
function Kp(e, t) {
	return +Y(e) < +Y(t);
}
//#endregion
//#region node_modules/date-fns/isSameMonth.js
function qp(e, t, n) {
	let [r, i] = Pf(n?.in, e, t);
	return r.getFullYear() === i.getFullYear() && r.getMonth() === i.getMonth();
}
//#endregion
//#region node_modules/date-fns/isSameYear.js
function Jp(e, t, n) {
	let [r, i] = Pf(n?.in, e, t);
	return r.getFullYear() === i.getFullYear();
}
//#endregion
//#region node_modules/date-fns/setMonth.js
function Yp(e, t, n) {
	let r = Y(e, n?.in), i = r.getFullYear(), a = r.getDate(), o = J(n?.in || e, 0);
	o.setFullYear(i, t, 15), o.setHours(0, 0, 0, 0);
	let s = Hp(o);
	return r.setMonth(t, Math.min(a, s)), r;
}
//#endregion
//#region node_modules/date-fns/setYear.js
function Xp(e, t, n) {
	let r = Y(e, n?.in);
	return isNaN(+r) ? J(n?.in || e, NaN) : (r.setFullYear(t), r);
}
//#endregion
//#region node_modules/date-fns/locale/pt-BR/_lib/formatDistance.js
var Zp = {
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
}, Qp = (e, t, n) => {
	let r, i = Zp[e];
	return r = typeof i == "string" ? i : t === 1 ? i.one : i.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? "em " + r : "há " + r : r;
}, $p = {
	date: rp({
		formats: {
			full: "EEEE, d 'de' MMMM 'de' y",
			long: "d 'de' MMMM 'de' y",
			medium: "d MMM y",
			short: "dd/MM/yyyy"
		},
		defaultWidth: "full"
	}),
	time: rp({
		formats: {
			full: "HH:mm:ss zzzz",
			long: "HH:mm:ss z",
			medium: "HH:mm:ss",
			short: "HH:mm"
		},
		defaultWidth: "full"
	}),
	dateTime: rp({
		formats: {
			full: "{{date}} 'às' {{time}}",
			long: "{{date}} 'às' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, em = {
	lastWeek: (e) => {
		let t = e.getDay();
		return "'" + (t === 0 || t === 6 ? "último" : "última") + "' eeee 'às' p";
	},
	yesterday: "'ontem às' p",
	today: "'hoje às' p",
	tomorrow: "'amanhã às' p",
	nextWeek: "eeee 'às' p",
	other: "P"
}, tm = {
	code: "pt-BR",
	formatDistance: Qp,
	formatLong: $p,
	formatRelative: (e, t, n, r) => {
		let i = em[e];
		return typeof i == "function" ? i(t) : i;
	},
	localize: {
		ordinalNumber: (e, t) => {
			let n = Number(e);
			return t?.unit === "week" ? n + "ª" : n + "º";
		},
		era: sp({
			values: {
				narrow: ["AC", "DC"],
				abbreviated: ["AC", "DC"],
				wide: ["antes de cristo", "depois de cristo"]
			},
			defaultWidth: "wide"
		}),
		quarter: sp({
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
		month: sp({
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
		day: sp({
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
		dayPeriod: sp({
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
		ordinalNumber: fp({
			matchPattern: /^(\d+)[ºªo]?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: lp({
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
		quarter: lp({
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
		month: lp({
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
		day: lp({
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
		dayPeriod: lp({
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
}, nm = "Popover", [rm, im] = ke(nm, [so]), am = so(), [om, sm] = rm(nm), cm = (t) => {
	let { __scopePopover: n, children: r, open: i, defaultOpen: a, onOpenChange: o, modal: s = !1 } = t, c = am(n), l = e.useRef(null), [u, d] = e.useState(!1), [f, m] = Ge({
		prop: i,
		defaultProp: a ?? !1,
		onChange: o,
		caller: nm
	});
	return /* @__PURE__ */ p(wo, {
		...c,
		children: /* @__PURE__ */ p(om, {
			scope: n,
			contentId: He(),
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
cm.displayName = nm;
var lm = "PopoverAnchor", um = e.forwardRef((t, n) => {
	let { __scopePopover: r, ...i } = t, a = sm(lm, r), o = am(r), { onCustomAnchorAdd: s, onCustomAnchorRemove: c } = a;
	return e.useEffect(() => (s(), () => c()), [s, c]), /* @__PURE__ */ p(To, {
		...o,
		...i,
		ref: n
	});
});
um.displayName = lm;
var dm = "PopoverTrigger", fm = e.forwardRef((e, t) => {
	let { __scopePopover: n, ...r } = e, i = sm(dm, n), a = am(n), o = H(t, i.triggerRef), s = /* @__PURE__ */ p(U.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": i.open,
		"aria-controls": i.contentId,
		"data-state": Dm(i.open),
		...r,
		ref: o,
		onClick: V(e.onClick, i.onOpenToggle)
	});
	return i.hasCustomAnchor ? s : /* @__PURE__ */ p(To, {
		asChild: !0,
		...a,
		children: s
	});
});
fm.displayName = dm;
var pm = "PopoverPortal", [mm, hm] = rm(pm, { forceMount: void 0 }), gm = (e) => {
	let { __scopePopover: t, forceMount: n, children: r, container: i } = e, a = sm(pm, t);
	return /* @__PURE__ */ p(mm, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ p(bt, {
			present: n || a.open,
			children: /* @__PURE__ */ p(ko, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
};
gm.displayName = pm;
var _m = "PopoverContent", vm = e.forwardRef((e, t) => {
	let n = hm(_m, e.__scopePopover), { forceMount: r = n.forceMount, ...i } = e, a = sm(_m, e.__scopePopover);
	return /* @__PURE__ */ p(bt, {
		present: r || a.open,
		children: a.modal ? /* @__PURE__ */ p(bm, {
			...i,
			ref: t
		}) : /* @__PURE__ */ p(xm, {
			...i,
			ref: t
		})
	});
});
vm.displayName = _m;
var ym = /* @__PURE__ */ je("PopoverContent.RemoveScroll"), bm = e.forwardRef((t, n) => {
	let r = sm(_m, t.__scopePopover), i = e.useRef(null), a = H(n, i), o = e.useRef(!1);
	return e.useEffect(() => {
		let e = i.current;
		if (e) return Ho(e);
	}, []), /* @__PURE__ */ p(Zs, {
		as: ym,
		allowPinchZoom: !0,
		children: /* @__PURE__ */ p(Sm, {
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
}), xm = e.forwardRef((t, n) => {
	let r = sm(_m, t.__scopePopover), i = e.useRef(!1), a = e.useRef(!1);
	return /* @__PURE__ */ p(Sm, {
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
}), Sm = e.forwardRef((e, t) => {
	let { __scopePopover: n, trapFocus: r, onOpenAutoFocus: i, onCloseAutoFocus: a, disableOutsidePointerEvents: o, onEscapeKeyDown: s, onPointerDownOutside: c, onFocusOutside: l, onInteractOutside: u, ...d } = e, f = sm(_m, n), m = am(n);
	return Er(), /* @__PURE__ */ p(Mr, {
		asChild: !0,
		loop: !0,
		trapped: r,
		onMountAutoFocus: i,
		onUnmountAutoFocus: a,
		children: /* @__PURE__ */ p(vr, {
			asChild: !0,
			disableOutsidePointerEvents: o,
			onInteractOutside: u,
			onEscapeKeyDown: s,
			onPointerDownOutside: c,
			onFocusOutside: l,
			onDismiss: () => f.onOpenChange(!1),
			children: /* @__PURE__ */ p(Eo, {
				"data-state": Dm(f.open),
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
}), Cm = "PopoverClose", wm = e.forwardRef((e, t) => {
	let { __scopePopover: n, ...r } = e, i = sm(Cm, n);
	return /* @__PURE__ */ p(U.button, {
		type: "button",
		...r,
		ref: t,
		onClick: V(e.onClick, () => i.onOpenChange(!1))
	});
});
wm.displayName = Cm;
var Tm = "PopoverArrow", Em = e.forwardRef((e, t) => {
	let { __scopePopover: n, ...r } = e;
	return /* @__PURE__ */ p(Do, {
		...am(n),
		...r,
		ref: t
	});
});
Em.displayName = Tm;
function Dm(e) {
	return e ? "open" : "closed";
}
var Om = cm, km = fm, Am = gm, jm = vm;
//#endregion
//#region node_modules/@date-fns/tz/tzName/index.js
function Mm(e, t, n = "long") {
	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		timeZone: e,
		timeZoneName: n
	}).format(t).split(/\s/g).slice(2).join(" ");
}
//#endregion
//#region node_modules/@date-fns/tz/tzOffset/index.js
var Nm = {}, Pm = {};
function Fm(e, t) {
	try {
		let n = (Nm[e] ||= new Intl.DateTimeFormat("en-US", {
			timeZone: e,
			timeZoneName: "longOffset"
		}).format)(t).split("GMT")[1];
		return n in Pm ? Pm[n] : Lm(n, n.split(":"));
	} catch {
		if (e in Pm) return Pm[e];
		let t = e?.match(Im);
		return t ? Lm(e, t.slice(1)) : NaN;
	}
}
var Im = /([+-]\d\d):?(\d\d)?/;
function Lm(e, t) {
	let n = +(t[0] || 0), r = +(t[1] || 0), i = (t[2] || 0) / 60;
	return Pm[e] = n * 60 + r > 0 ? n * 60 + r + i : n * 60 - r - i;
}
//#endregion
//#region node_modules/@date-fns/tz/date/mini.js
var Rm = class e extends Date {
	constructor(...e) {
		super(), e.length > 1 && typeof e[e.length - 1] == "string" && (this.timeZone = e.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Fm(this.timeZone, this)) ? this.setTime(NaN) : e.length ? typeof e[0] == "number" && (e.length === 1 || e.length === 2 && typeof e[1] != "number") ? this.setTime(e[0]) : typeof e[0] == "string" ? this.setTime(+new Date(e[0])) : e[0] instanceof Date ? this.setTime(+e[0]) : (this.setTime(+new Date(...e)), Hm(this, NaN), Bm(this)) : this.setTime(Date.now());
	}
	static tz(t, ...n) {
		return n.length ? new e(...n, t) : new e(Date.now(), t);
	}
	withTimeZone(t) {
		return new e(+this, t);
	}
	getTimezoneOffset() {
		let e = -Fm(this.timeZone, this);
		return e > 0 ? Math.floor(e) : Math.ceil(e);
	}
	setTime(e) {
		return Date.prototype.setTime.apply(this, arguments), Bm(this), +this;
	}
	[Symbol.for("constructDateFrom")](t) {
		return new e(+new Date(t), this.timeZone);
	}
}, zm = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
	if (!zm.test(e)) return;
	let t = e.replace(zm, "$1UTC");
	Rm.prototype[t] && (e.startsWith("get") ? Rm.prototype[e] = function() {
		return this.internal[t]();
	} : (Rm.prototype[e] = function() {
		return Date.prototype[t].apply(this.internal, arguments), Vm(this), +this;
	}, Rm.prototype[t] = function() {
		return Date.prototype[t].apply(this, arguments), Bm(this), +this;
	}));
});
function Bm(e) {
	e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-Fm(e.timeZone, e) * 60));
}
function Vm(e) {
	Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Hm(e);
}
function Hm(e) {
	let t = Fm(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
	r.setUTCHours(r.getUTCHours() - 1);
	let i = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), a = i - -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), o = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
	a && o && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + a);
	let s = i - n;
	s && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + s);
	let c = /* @__PURE__ */ new Date(+e);
	c.setUTCSeconds(0);
	let l = i > 0 ? c.getSeconds() : (c.getSeconds() - 60) % 60, u = Math.round(-(Fm(e.timeZone, e) * 60)) % 60;
	(u || l) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + u), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + u + l));
	let d = Fm(e.timeZone, e), f = d > 0 ? Math.floor(d) : Math.ceil(d), p = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - f, m = f !== n, h = p - s;
	if (m && h) {
		Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + h);
		let t = Fm(e.timeZone, e), n = f - (t > 0 ? Math.floor(t) : Math.ceil(t));
		n && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + n), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + n));
	}
}
//#endregion
//#region node_modules/@date-fns/tz/date/index.js
var Um = class e extends Rm {
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
		return `${e} GMT${t}${n}${r} (${Mm(this.timeZone, this)})`;
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
}, Wm = 5, Gm = 4;
function Km(e, t) {
	let n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, i = t.addDays(e, -r + 1), a = t.addDays(i, Wm * 7 - 1);
	return t.getMonth(e) === t.getMonth(a) ? Wm : Gm;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/startOfBroadcastWeek.js
function qm(e, t) {
	let n = t.startOfMonth(e), r = n.getDay();
	return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/endOfBroadcastWeek.js
function Jm(e, t) {
	let n = qm(e, t), r = Km(e, t);
	return t.addDays(n, r * 7 - 1);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/en-US.js
var Ym = {
	...pp,
	labels: {
		labelDayButton: (e, t, n, r) => {
			let i;
			i = r && typeof r.format == "function" ? r.format.bind(r) : (e, t) => Bp(e, t, {
				locale: pp,
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
			return r = n && typeof n.format == "function" ? n.format.bind(n) : (e, n) => Bp(e, n, {
				locale: pp,
				...t
			}), r(e, "LLLL yyyy");
		},
		labelGridcell: (e, t, n, r) => {
			let i;
			i = r && typeof r.format == "function" ? r.format.bind(r) : (e, t) => Bp(e, t, {
				locale: pp,
				...n
			});
			let a = i(e, "PPPP");
			return t?.today && (a = `Today, ${a}`), a;
		},
		labelNav: "Navigation bar",
		labelWeekNumberHeader: "Week Number",
		labelWeekday: (e, t, n) => {
			let r;
			return r = n && typeof n.format == "function" ? n.format.bind(n) : (e, n) => Bp(e, n, {
				locale: pp,
				...t
			}), r(e, "cccc");
		}
	}
}, Xm = class e {
	constructor(e, t) {
		this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Um.tz(this.options.timeZone) : new this.Date(), this.newDate = (e, t, n) => this.overrides?.newDate ? this.overrides.newDate(e, t, n) : this.options.timeZone ? new Um(e, t, n, this.options.timeZone) : new Date(e, t, n), this.addDays = (e, t) => this.overrides?.addDays ? this.overrides.addDays(e, t) : Ef(e, t), this.addMonths = (e, t) => this.overrides?.addMonths ? this.overrides.addMonths(e, t) : Df(e, t), this.addWeeks = (e, t) => this.overrides?.addWeeks ? this.overrides.addWeeks(e, t) : Rf(e, t), this.addYears = (e, t) => this.overrides?.addYears ? this.overrides.addYears(e, t) : zf(e, t), this.differenceInCalendarDays = (e, t) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(e, t) : If(e, t), this.differenceInCalendarMonths = (e, t) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(e, t) : Gf(e, t), this.eachMonthOfInterval = (e) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(e) : Jf(e), this.eachYearOfInterval = (e) => {
			let t = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(e) : Qf(e), n = new Set(t.map((e) => this.getYear(e)));
			if (n.size === t.length) return t;
			let r = [];
			return n.forEach((e) => {
				r.push(new Date(e, 0, 1));
			}), r;
		}, this.endOfBroadcastWeek = (e) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(e) : Jm(e, this), this.endOfISOWeek = (e) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(e) : ep(e), this.endOfMonth = (e) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(e) : Kf(e), this.endOfWeek = (e, t) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(e, t) : $f(e, this.options), this.endOfYear = (e) => this.overrides?.endOfYear ? this.overrides.endOfYear(e) : Xf(e), this.format = (e, t, n) => {
			let r = this.overrides?.format ? this.overrides.format(e, t, this.options) : Bp(e, t, this.options);
			return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(r) : r;
		}, this.getISOWeek = (e) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(e) : hp(e), this.getMonth = (e, t) => this.overrides?.getMonth ? this.overrides.getMonth(e, this.options) : Up(e, this.options), this.getYear = (e, t) => this.overrides?.getYear ? this.overrides.getYear(e, this.options) : Wp(e, this.options), this.getWeek = (e, t) => this.overrides?.getWeek ? this.overrides.getWeek(e, this.options) : vp(e, this.options), this.isAfter = (e, t) => this.overrides?.isAfter ? this.overrides.isAfter(e, t) : Gp(e, t), this.isBefore = (e, t) => this.overrides?.isBefore ? this.overrides.isBefore(e, t) : Kp(e, t), this.isDate = (e) => this.overrides?.isDate ? this.overrides.isDate(e) : Uf(e), this.isSameDay = (e, t) => this.overrides?.isSameDay ? this.overrides.isSameDay(e, t) : Hf(e, t), this.isSameMonth = (e, t) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(e, t) : qp(e, t), this.isSameYear = (e, t) => this.overrides?.isSameYear ? this.overrides.isSameYear(e, t) : Jp(e, t), this.max = (e) => this.overrides?.max ? this.overrides.max(e) : Bf(e), this.min = (e) => this.overrides?.min ? this.overrides.min(e) : Vf(e), this.setMonth = (e, t) => this.overrides?.setMonth ? this.overrides.setMonth(e, t) : Yp(e, t), this.setYear = (e, t) => this.overrides?.setYear ? this.overrides.setYear(e, t) : Xp(e, t), this.startOfBroadcastWeek = (e, t) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(e, this) : qm(e, this), this.startOfDay = (e) => this.overrides?.startOfDay ? this.overrides.startOfDay(e) : Ff(e), this.startOfISOWeek = (e) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(e) : jf(e), this.startOfMonth = (e) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(e) : Yf(e), this.startOfWeek = (e, t) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(e, this.options) : Af(e, this.options), this.startOfYear = (e) => this.overrides?.startOfYear ? this.overrides.startOfYear(e) : Zf(e), this.options = {
			locale: Ym,
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
Xm.yearFirstLocales = new Set([
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
var Zm = new Xm(), Qm = class {
	constructor(e, t, n = Zm) {
		this.date = e, this.displayMonth = t, this.outside = !!(t && !n.isSameMonth(e, t)), this.dateLib = n, this.isoDate = n.format(e, "yyyy-MM-dd"), this.displayMonthId = n.format(t, "yyyy-MM"), this.dateMonthId = n.format(e, "yyyy-MM");
	}
	isEqualTo(e) {
		return this.dateLib.isSameDay(e.date, this.date) && this.dateLib.isSameMonth(e.displayMonth, this.displayMonth);
	}
}, $m = class {
	constructor(e, t) {
		this.date = e, this.weeks = t;
	}
}, eh = class {
	constructor(e, t) {
		this.days = t, this.weekNumber = e;
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Button.js
function th(e) {
	return t.createElement("button", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/CaptionLabel.js
function nh(e) {
	return t.createElement("span", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Chevron.js
function rh(e) {
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
function ih(e) {
	let { day: n, modifiers: r, ...i } = e;
	return t.createElement("td", { ...i });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/DayButton.js
function ah(e) {
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
var oh;
(function(e) {
	e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(oh ||= {});
var sh;
(function(e) {
	e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(sh ||= {});
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Dropdown.js
function ch(e) {
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
function lh(e) {
	return t.createElement("div", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Footer.js
function uh(e) {
	return t.createElement("div", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Month.js
function dh(e) {
	let { calendarMonth: n, displayIndex: r, ...i } = e;
	return t.createElement("div", { ...i }, e.children);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/MonthCaption.js
function fh(e) {
	let { calendarMonth: n, displayIndex: r, ...i } = e;
	return t.createElement("div", { ...i });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/MonthGrid.js
function ph(e) {
	return t.createElement("table", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Months.js
function mh(e) {
	return t.createElement("div", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/useDayPicker.js
var hh = n(void 0);
function gh() {
	let e = o(hh);
	if (e === void 0) throw Error("useDayPicker() must be used within a custom component.");
	return e;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/MonthsDropdown.js
function _h(e) {
	let { components: n } = gh();
	return t.createElement(n.Dropdown, { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Nav.js
function vh(e) {
	let { onPreviousClick: n, onNextClick: r, previousMonth: i, nextMonth: o, ...s } = e, { components: c, classNames: l, labels: { labelPrevious: u, labelNext: d } } = gh(), f = a((e) => {
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
function yh(e) {
	let { components: n } = gh();
	return t.createElement(n.Button, { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Option.js
function bh(e) {
	return t.createElement("option", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/PreviousMonthButton.js
function xh(e) {
	let { components: n } = gh();
	return t.createElement(n.Button, { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Root.js
function Sh(e) {
	let { rootRef: n, ...r } = e;
	return t.createElement("div", {
		...r,
		ref: n
	});
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Select.js
function Ch(e) {
	return t.createElement("select", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Week.js
function wh(e) {
	let { week: n, ...r } = e;
	return t.createElement("tr", { ...r });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Weekday.js
function Th(e) {
	return t.createElement("th", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Weekdays.js
function Eh(e) {
	return t.createElement("thead", { "aria-hidden": !0 }, t.createElement("tr", { ...e }));
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/WeekNumber.js
function Dh(e) {
	let { week: n, ...r } = e;
	return t.createElement("th", { ...r });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/WeekNumberHeader.js
function Oh(e) {
	return t.createElement("th", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Weeks.js
function kh(e) {
	return t.createElement("tbody", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/YearsDropdown.js
function Ah(e) {
	let { components: n } = gh();
	return t.createElement(n.Dropdown, { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/custom-components.js
var jh = /* @__PURE__ */ v({
	Button: () => th,
	CaptionLabel: () => nh,
	Chevron: () => rh,
	Day: () => ih,
	DayButton: () => ah,
	Dropdown: () => ch,
	DropdownNav: () => lh,
	Footer: () => uh,
	Month: () => dh,
	MonthCaption: () => fh,
	MonthGrid: () => ph,
	Months: () => mh,
	MonthsDropdown: () => _h,
	Nav: () => vh,
	NextMonthButton: () => yh,
	Option: () => bh,
	PreviousMonthButton: () => xh,
	Root: () => Sh,
	Select: () => Ch,
	Week: () => wh,
	WeekNumber: () => Dh,
	WeekNumberHeader: () => Oh,
	Weekday: () => Th,
	Weekdays: () => Eh,
	Weeks: () => kh,
	YearsDropdown: () => Ah
});
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/rangeIncludesDate.js
function Mh(e, t, n = !1, r = Zm) {
	let { from: i, to: a } = e, { differenceInCalendarDays: o, isSameDay: s } = r;
	return i && a ? (o(a, i) < 0 && ([i, a] = [a, i]), o(t, i) >= (n ? 1 : 0) && o(a, t) >= (n ? 1 : 0)) : !n && a ? s(a, t) : !n && i ? s(i, t) : !1;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/typeguards.js
function Nh(e) {
	return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function Ph(e) {
	return !!(e && typeof e == "object" && "from" in e);
}
function Fh(e) {
	return !!(e && typeof e == "object" && "after" in e);
}
function Ih(e) {
	return !!(e && typeof e == "object" && "before" in e);
}
function Lh(e) {
	return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function Rh(e, t) {
	return Array.isArray(e) && e.every(t.isDate);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/dateMatchModifiers.js
function zh(e, t, n = Zm) {
	let r = Array.isArray(t) ? t : [t], { isSameDay: i, differenceInCalendarDays: a, isAfter: o } = n;
	return r.some((t) => {
		if (typeof t == "boolean") return t;
		if (n.isDate(t)) return i(e, t);
		if (Rh(t, n)) return t.some((t) => i(e, t));
		if (Ph(t)) return Mh(t, e, !1, n);
		if (Lh(t)) return Array.isArray(t.dayOfWeek) ? t.dayOfWeek.includes(e.getDay()) : t.dayOfWeek === e.getDay();
		if (Nh(t)) {
			let n = a(t.before, e), r = a(t.after, e), i = n > 0, s = r < 0;
			return o(t.before, t.after) ? s && i : i || s;
		}
		return Fh(t) ? a(e, t.after) > 0 : Ih(t) ? a(t.before, e) > 0 : typeof t == "function" ? t(e) : !1;
	});
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/createGetModifiers.js
function Bh(e, t, n, r, i) {
	let { disabled: a, hidden: o, modifiers: s, showOutsideDays: c, broadcastCalendar: l, today: u = i.today() } = t, { isSameDay: d, isSameMonth: f, startOfMonth: p, isBefore: m, endOfMonth: h, isAfter: g } = i, _ = n && p(n), v = r && h(r), y = {
		[Q.focused]: [],
		[Q.outside]: [],
		[Q.disabled]: [],
		[Q.hidden]: [],
		[Q.today]: []
	}, b = {};
	for (let t of e) {
		let { date: e, displayMonth: n } = t, r = !!(n && !f(e, n)), p = !!(_ && m(e, _)), h = !!(v && g(e, v)), x = !!(a && zh(e, a, i)), S = !!(o && zh(e, o, i)) || p || h || !l && !c && r || l && c === !1 && r, C = d(e, u);
		r && y.outside.push(t), x && y.disabled.push(t), S && y.hidden.push(t), C && y.today.push(t), s && Object.keys(s).forEach((n) => {
			let r = s?.[n];
			r && zh(e, r, i) && (b[n] ? b[n].push(t) : b[n] = [t]);
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
function Vh(e, t, n = {}) {
	return Object.entries(e).filter(([, e]) => e === !0).reduce((e, [r]) => (n[r] ? e.push(n[r]) : t[Q[r]] ? e.push(t[Q[r]]) : t[oh[r]] && e.push(t[oh[r]]), e), [t[Z.Day]]);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getComponents.js
function Hh(e) {
	return {
		...jh,
		...e
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getDataAttributes.js
function Uh(e) {
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
function Wh() {
	let e = {};
	for (let t in Z) e[Z[t]] = `rdp-${Z[t]}`;
	for (let t in Q) e[Q[t]] = `rdp-${Q[t]}`;
	for (let t in oh) e[oh[t]] = `rdp-${oh[t]}`;
	for (let t in sh) e[sh[t]] = `rdp-${sh[t]}`;
	return e;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatCaption.js
function Gh(e, t, n) {
	return (n ?? new Xm(t)).formatMonthYear(e);
}
var Kh = Gh;
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatDay.js
function qh(e, t, n) {
	return (n ?? new Xm(t)).format(e, "d");
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatMonthDropdown.js
function Jh(e, t = Zm) {
	return t.format(e, "LLLL");
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatWeekdayName.js
function Yh(e, t, n) {
	return (n ?? new Xm(t)).format(e, "cccccc");
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatWeekNumber.js
function Xh(e, t = Zm) {
	return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatWeekNumberHeader.js
function Zh() {
	return "";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatYearDropdown.js
function Qh(e, t = Zm) {
	return t.format(e, "yyyy");
}
var $h = Qh, eg = /* @__PURE__ */ v({
	formatCaption: () => Gh,
	formatDay: () => qh,
	formatMonthCaption: () => Kh,
	formatMonthDropdown: () => Jh,
	formatWeekNumber: () => Xh,
	formatWeekNumberHeader: () => Zh,
	formatWeekdayName: () => Yh,
	formatYearCaption: () => $h,
	formatYearDropdown: () => Qh
});
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getFormatters.js
function tg(e) {
	return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
		...eg,
		...e
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelDayButton.js
function ng(e, t, n, r) {
	let i = (r ?? new Xm(n)).format(e, "PPPP");
	return t.today && (i = `Today, ${i}`), t.selected && (i = `${i}, selected`), i;
}
var rg = ng;
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelGrid.js
function ig(e, t, n) {
	return (n ?? new Xm(t)).formatMonthYear(e);
}
var ag = ig;
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelGridcell.js
function og(e, t, n, r) {
	let i = (r ?? new Xm(n)).format(e, "PPPP");
	return t?.today && (i = `Today, ${i}`), i;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelMonthDropdown.js
function sg(e) {
	return "Choose the Month";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelNav.js
function cg() {
	return "";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelNext.js
var lg = "Go to the Next Month";
function ug(e, t) {
	return lg;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelPrevious.js
function dg(e) {
	return "Go to the Previous Month";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelWeekday.js
function fg(e, t, n) {
	return (n ?? new Xm(t)).format(e, "cccc");
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelWeekNumber.js
function pg(e, t) {
	return `Week ${e}`;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelWeekNumberHeader.js
function mg(e) {
	return "Week Number";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelYearDropdown.js
function hg(e) {
	return "Choose the Year";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/index.js
var gg = /* @__PURE__ */ v({
	labelCaption: () => ag,
	labelDay: () => rg,
	labelDayButton: () => ng,
	labelGrid: () => ig,
	labelGridcell: () => og,
	labelMonthDropdown: () => sg,
	labelNav: () => cg,
	labelNext: () => ug,
	labelPrevious: () => dg,
	labelWeekNumber: () => pg,
	labelWeekNumberHeader: () => mg,
	labelWeekday: () => fg,
	labelYearDropdown: () => hg
}), _g = (e, t, n) => t || (n ? typeof n == "function" ? n : (...e) => n : e);
function vg(e, t) {
	let n = t.locale?.labels ?? {};
	return {
		...gg,
		...e ?? {},
		labelDayButton: _g(ng, e?.labelDayButton, n.labelDayButton),
		labelMonthDropdown: _g(sg, e?.labelMonthDropdown, n.labelMonthDropdown),
		labelNext: _g(ug, e?.labelNext, n.labelNext),
		labelPrevious: _g(dg, e?.labelPrevious, n.labelPrevious),
		labelWeekNumber: _g(pg, e?.labelWeekNumber, n.labelWeekNumber),
		labelYearDropdown: _g(hg, e?.labelYearDropdown, n.labelYearDropdown),
		labelGrid: _g(ig, e?.labelGrid, n.labelGrid),
		labelGridcell: _g(og, e?.labelGridcell, n.labelGridcell),
		labelNav: _g(cg, e?.labelNav, n.labelNav),
		labelWeekNumberHeader: _g(mg, e?.labelWeekNumberHeader, n.labelWeekNumberHeader),
		labelWeekday: _g(fg, e?.labelWeekday, n.labelWeekday)
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getMonthOptions.js
function yg(e, t, n, r, i) {
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
function bg(e, t = {}, n = {}) {
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
function xg(e, t, n, r) {
	let i = r ?? e.today(), a = n ? e.startOfBroadcastWeek(i, e) : t ? e.startOfISOWeek(i) : e.startOfWeek(i), o = [];
	for (let t = 0; t < 7; t++) {
		let n = e.addDays(a, t);
		o.push(n);
	}
	return o;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getYearOptions.js
function Sg(e, t, n, r, i = !1) {
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
function Cg(e, t = {}) {
	let { weekStartsOn: n, locale: r } = t, i = n ?? r?.options?.weekStartsOn ?? 0, a = (t) => {
		let n = typeof t == "number" || typeof t == "string" ? new Date(t) : t;
		return new Um(n.getFullYear(), n.getMonth(), n.getDate(), 12, 0, 0, e);
	}, o = (e) => {
		let t = a(e);
		return new Date(t.getFullYear(), t.getMonth(), t.getDate(), 0, 0, 0, 0);
	};
	return {
		today: () => a(Um.tz(e)),
		newDate: (t, n, r) => new Um(t, n, r, 12, 0, 0, e),
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
			let n = a(t.start), r = a(t.end), i = [], o = new Um(n.getFullYear(), n.getMonth(), 1, 12, 0, 0, e), s = r.getFullYear() * 12 + r.getMonth();
			for (; o.getFullYear() * 12 + o.getMonth() <= s;) i.push(new Um(o, e)), o.setMonth(o.getMonth() + 1, 1);
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
			let n = a(t.start), r = a(t.end), i = [], o = new Um(n.getFullYear(), 0, 1, 12, 0, 0, e);
			for (; o.getFullYear() <= r.getFullYear();) i.push(new Um(o, e)), o.setFullYear(o.getFullYear() + 1, 0, 1);
			return i;
		},
		getWeek: (e, t) => vp(o(e), {
			weekStartsOn: t?.weekStartsOn ?? i,
			firstWeekContainsDate: t?.firstWeekContainsDate ?? r?.options?.firstWeekContainsDate ?? 1
		}),
		getISOWeek: (e) => hp(o(e)),
		differenceInCalendarDays: (e, t) => If(o(e), o(t)),
		differenceInCalendarMonths: (e, t) => Gf(o(e), o(t))
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/useAnimation.js
var wg = (e) => e instanceof HTMLElement ? e : null, Tg = (e) => [...e.querySelectorAll("[data-animated-month]") ?? []], Eg = (e) => wg(e.querySelector("[data-animated-month]")), Dg = (e) => wg(e.querySelector("[data-animated-caption]")), Og = (e) => wg(e.querySelector("[data-animated-weeks]")), kg = (e) => wg(e.querySelector("[data-animated-nav]")), Ag = (e) => wg(e.querySelector("[data-animated-weekdays]"));
function jg(e, t, { classNames: n, months: r, focused: i, dateLib: a }) {
	let o = u(null), s = u(r), l = u(!1);
	c(() => {
		let c = s.current;
		if (s.current = r, !t || !e.current || !(e.current instanceof HTMLElement) || r.length === 0 || c.length === 0 || r.length !== c.length) return;
		let u = a.isSameMonth(r[0].date, c[0].date), d = a.isAfter(r[0].date, c[0].date), f = d ? n[sh.caption_after_enter] : n[sh.caption_before_enter], p = d ? n[sh.weeks_after_enter] : n[sh.weeks_before_enter], m = o.current, h = e.current.cloneNode(!0);
		if (h instanceof HTMLElement ? (Tg(h).forEach((e) => {
			if (!(e instanceof HTMLElement)) return;
			let t = Eg(e);
			t && e.contains(t) && e.removeChild(t);
			let n = Dg(e);
			n && n.classList.remove(f);
			let r = Og(e);
			r && r.classList.remove(p);
		}), o.current = h) : o.current = null, l.current || u || i) return;
		let g = m instanceof HTMLElement ? Tg(m) : [], _ = Tg(e.current);
		if (_?.every((e) => e instanceof HTMLElement) && g && g.every((e) => e instanceof HTMLElement)) {
			l.current = !0;
			let t = [];
			e.current.style.isolation = "isolate";
			let r = kg(e.current);
			r && (r.style.zIndex = "1"), _.forEach((i, a) => {
				let o = g[a];
				if (!o) return;
				i.style.position = "relative", i.style.overflow = "hidden";
				let s = Dg(i);
				s && s.classList.add(f);
				let c = Og(i);
				c && c.classList.add(p);
				let u = () => {
					l.current = !1, e.current && (e.current.style.isolation = ""), r && (r.style.zIndex = ""), s && s.classList.remove(f), c && c.classList.remove(p), i.style.position = "", i.style.overflow = "", i.contains(o) && i.removeChild(o);
				};
				t.push(u), o.style.pointerEvents = "none", o.style.position = "absolute", o.style.overflow = "hidden", o.setAttribute("aria-hidden", "true");
				let m = Ag(o);
				m && (m.style.opacity = "0");
				let h = Dg(o);
				h && (h.classList.add(d ? n[sh.caption_before_exit] : n[sh.caption_after_exit]), h.addEventListener("animationend", u));
				let _ = Og(o);
				_ && _.classList.add(d ? n[sh.weeks_before_exit] : n[sh.weeks_after_exit]), i.insertBefore(o, i.firstChild);
			});
		}
	});
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getDates.js
function Mg(e, t, n, r) {
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
function Ng(e) {
	let t = [];
	return e.reduce((e, n) => {
		let r = n.weeks.reduce((e, t) => e.concat(t.days.slice()), t.slice());
		return e.concat(r.slice());
	}, t.slice());
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getDisplayMonths.js
function Pg(e, t, n, r) {
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
function Fg(e, t, n, r) {
	let { month: i, defaultMonth: a, today: o = r.today(), numberOfMonths: s = 1 } = e, c = i || a || o, { differenceInCalendarMonths: l, addMonths: u, startOfMonth: d } = r;
	return n && l(n, c) < s - 1 && (c = u(n, -1 * (s - 1))), t && l(c, t) < 0 && (c = t), d(c);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getMonths.js
function Ig(e, t, n, r) {
	let { addDays: i, endOfBroadcastWeek: a, endOfISOWeek: o, endOfMonth: s, endOfWeek: c, getISOWeek: l, getWeek: u, startOfBroadcastWeek: d, startOfISOWeek: f, startOfWeek: p } = r, m = e.reduce((e, m) => {
		let h = n.broadcastCalendar ? d(m, r) : n.ISOWeek ? f(m) : p(m), g = n.broadcastCalendar ? a(m) : n.ISOWeek ? o(s(m)) : c(s(m)), _ = t.filter((e) => e >= h && e <= g), v = n.broadcastCalendar ? 35 : 42;
		if (n.fixedWeeks && _.length < v) {
			let e = t.filter((e) => {
				let t = v - _.length;
				return e > g && e <= i(g, t);
			});
			_.push(...e);
		}
		let y = new $m(m, _.reduce((e, t) => {
			let i = n.ISOWeek ? l(t) : u(t), a = e.find((e) => e.weekNumber === i), o = new Qm(t, m, r);
			return a ? a.days.push(o) : e.push(new eh(i, [o])), e;
		}, []));
		return e.push(y), e;
	}, []);
	return n.reverseMonths ? m.reverse() : m;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getNavMonth.js
function Lg(e, t) {
	let { startMonth: n, endMonth: r } = e, { startOfYear: i, startOfDay: a, startOfMonth: o, endOfMonth: s, addYears: c, endOfYear: l, newDate: u, today: d } = t, { fromYear: f, toYear: p, fromMonth: m, toMonth: h } = e;
	!n && m && (n = m), !n && f && (n = t.newDate(f, 0, 1)), !r && h && (r = h), !r && p && (r = u(p, 11, 31));
	let g = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
	return n ? n = o(n) : f ? n = u(f, 0, 1) : !n && g && (n = i(c(e.today ?? d(), -100))), r ? r = s(r) : p ? r = u(p, 11, 31) : !r && g && (r = l(e.today ?? d())), [n && a(n), r && a(r)];
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getNextMonth.js
function Rg(e, t, n, r) {
	if (n.disableNavigation) return;
	let { pagedNavigation: i, numberOfMonths: a = 1 } = n, { startOfMonth: o, addMonths: s, differenceInCalendarMonths: c } = r, l = i ? a : 1, u = o(e);
	if (!t || !(c(t, e) < a)) return s(u, l);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getPreviousMonth.js
function zg(e, t, n, r) {
	if (n.disableNavigation) return;
	let { pagedNavigation: i, numberOfMonths: a } = n, { startOfMonth: o, addMonths: s, differenceInCalendarMonths: c } = r, l = i ? a ?? 1 : 1, u = o(e);
	if (!t || !(c(u, t) <= 0)) return s(u, -l);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getWeeks.js
function Bg(e) {
	return e.reduce((e, t) => e.concat(t.weeks.slice()), [].slice());
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/useControlledValue.js
function Vg(e, t) {
	let [n, r] = d(e);
	return [t === void 0 ? n : t, r];
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/useCalendar.js
function Hg(e, t) {
	let [n, r] = Lg(e, t), { startOfMonth: i, endOfMonth: a } = t, o = Fg(e, n, r, t), [c, u] = Vg(o, e.month ? o : void 0);
	s(() => {
		u(Fg(e, n, r, t));
	}, [e.timeZone]);
	let { months: d, weeks: f, days: p, previousMonth: m, nextMonth: h } = l(() => {
		let i = Pg(c, r, { numberOfMonths: e.numberOfMonths }, t), o = Ig(i, Mg(i, e.endMonth ? a(e.endMonth) : void 0, {
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
			weeks: Bg(o),
			days: Ng(o),
			previousMonth: zg(c, n, e, t),
			nextMonth: Rg(c, r, e, t)
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
var Ug;
(function(e) {
	e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(Ug ||= {});
function Wg(e) {
	return !e[Q.disabled] && !e[Q.hidden] && !e[Q.outside];
}
function Gg(e, t, n, r) {
	let i, a = -1;
	for (let o of e) {
		let e = t(o);
		Wg(e) && (e[Q.focused] && a < Ug.FocusedModifier ? (i = o, a = Ug.FocusedModifier) : r?.isEqualTo(o) && a < Ug.LastFocused ? (i = o, a = Ug.LastFocused) : n(o.date) && a < Ug.Selected ? (i = o, a = Ug.Selected) : e[Q.today] && a < Ug.Today && (i = o, a = Ug.Today));
	}
	return i ||= e.find((e) => Wg(t(e))), i;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getFocusableDate.js
function Kg(e, t, n, r, i, a, o) {
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
function qg(e, t, n, r, i, a, o, s = 0) {
	if (s > 365) return;
	let c = Kg(e, t, n.date, r, i, a, o), l = !!(a.disabled && zh(c, a.disabled, o)), u = !!(a.hidden && zh(c, a.hidden, o)), d = new Qm(c, c, o);
	return !l && !u ? d : qg(e, t, d, r, i, a, o, s + 1);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/useFocus.js
function Jg(e, t, n, r, i) {
	let { autoFocus: a } = e, [o, s] = d(), c = Gg(t.days, n, r || (() => !1), o), [l, u] = d(a ? c : void 0);
	return {
		isFocusTarget: (e) => !!c?.isEqualTo(e),
		setFocused: u,
		focused: l,
		blur: () => {
			s(l), u(void 0);
		},
		moveFocus: (n, r) => {
			if (!l) return;
			let a = qg(n, r, l, t.navStart, t.navEnd, e, i);
			a && (e.disableNavigation && !t.days.some((e) => e.isEqualTo(a)) || (t.goToDay(a), u(a)));
		}
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/selection/useMulti.js
function Yg(e, t) {
	let { selected: n, required: r, onSelect: i } = e, [a, o] = Vg(n, i ? n : void 0), s = i ? n : a, { isSameDay: c } = t, l = (e) => s?.some((t) => c(t, e)) ?? !1, { min: u, max: d } = e;
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
function Xg(e, t, n = 0, r = 0, i = !1, a = Zm) {
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
function Zg(e, t, n = Zm) {
	let r = Array.isArray(t) ? t : [t], i = e.from, a = n.differenceInCalendarDays(e.to, e.from), o = Math.min(a, 6);
	for (let e = 0; e <= o; e++) {
		if (r.includes(i.getDay())) return !0;
		i = n.addDays(i, 1);
	}
	return !1;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/rangeOverlaps.js
function Qg(e, t, n = Zm) {
	return Mh(e, t.from, !1, n) || Mh(e, t.to, !1, n) || Mh(t, e.from, !1, n) || Mh(t, e.to, !1, n);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/rangeContainsModifiers.js
function $g(e, t, n = Zm) {
	let r = Array.isArray(t) ? t : [t];
	if (r.filter((e) => typeof e != "function").some((t) => typeof t == "boolean" ? t : n.isDate(t) ? Mh(e, t, !1, n) : Rh(t, n) ? t.some((t) => Mh(e, t, !1, n)) : Ph(t) ? t.from && t.to ? Qg(e, {
		from: t.from,
		to: t.to
	}, n) : !1 : Lh(t) ? Zg(e, t.dayOfWeek, n) : Nh(t) ? n.isAfter(t.before, t.after) ? Qg(e, {
		from: n.addDays(t.after, 1),
		to: n.addDays(t.before, -1)
	}, n) : zh(e.from, t, n) || zh(e.to, t, n) : Fh(t) || Ih(t) ? zh(e.from, t, n) || zh(e.to, t, n) : !1)) return !0;
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
function e_(e, t) {
	let { disabled: n, excludeDisabled: r, resetOnSelect: i, selected: a, required: o, onSelect: s } = e, [c, l] = Vg(a, s ? a : void 0), u = s ? a : c;
	return {
		selected: u,
		select: (a, c, d) => {
			let { min: f, max: p } = e, m;
			if (a) {
				let e = u?.from, n = u?.to, r = !!e && !!n, s = !!e && !!n && t.isSameDay(e, n) && t.isSameDay(a, e);
				m = i && (r || !u?.from) ? !o && s ? void 0 : {
					from: a,
					to: void 0
				} : Xg(a, u, f, p, o, t);
			}
			return r && n && m?.from && m.to && $g({
				from: m.from,
				to: m.to
			}, n, t) && (m.from = a, m.to = void 0), s || l(m), s?.(m, a, c, d), m;
		},
		isSelected: (e) => u && Mh(u, e, !1, t)
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/selection/useSingle.js
function t_(e, t) {
	let { selected: n, required: r, onSelect: i } = e, [a, o] = Vg(n, i ? n : void 0), s = i ? n : a, { isSameDay: c } = t;
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
function n_(e, t) {
	let n = t_(e, t), r = Yg(e, t), i = e_(e, t);
	switch (e.mode) {
		case "single": return n;
		case "multiple": return r;
		case "range": return i;
		default: return;
	}
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/toTimeZone.js
function r_(e, t) {
	return e instanceof Um && e.timeZone === t ? e : new Um(e, t);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/convertMatchersToTimeZone.js
function i_(e, t, n) {
	if (!n) return r_(e, t);
	let r = r_(e, t), i = new Um(r.getFullYear(), r.getMonth(), r.getDate(), 12, 0, 0, t);
	return new Date(i.getTime());
}
function a_(e, t, n) {
	return typeof e == "boolean" || typeof e == "function" ? e : e instanceof Date ? i_(e, t, n) : Array.isArray(e) ? e.map((e) => e instanceof Date ? i_(e, t, n) : e) : Ph(e) ? {
		...e,
		from: e.from ? r_(e.from, t) : e.from,
		to: e.to ? r_(e.to, t) : e.to
	} : Nh(e) ? {
		before: i_(e.before, t, n),
		after: i_(e.after, t, n)
	} : Fh(e) ? { after: i_(e.after, t, n) } : Ih(e) ? { before: i_(e.before, t, n) } : e;
}
function o_(e, t, n) {
	return e && (Array.isArray(e) ? e.map((e) => a_(e, t, n)) : a_(e, t, n));
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/DayPicker.js
function s_(e) {
	let n = e, r = n.timeZone;
	if (r && (n = {
		...e,
		timeZone: r
	}, n.today &&= r_(n.today, r), n.month &&= r_(n.month, r), n.defaultMonth &&= r_(n.defaultMonth, r), n.startMonth &&= r_(n.startMonth, r), n.endMonth &&= r_(n.endMonth, r), n.mode === "single" && n.selected ? n.selected = r_(n.selected, r) : n.mode === "multiple" && n.selected ? n.selected = n.selected?.map((e) => r_(e, r)) : n.mode === "range" && n.selected && (n.selected = {
		from: n.selected.from ? r_(n.selected.from, r) : n.selected.from,
		to: n.selected.to ? r_(n.selected.to, r) : n.selected.to
	}), n.disabled !== void 0 && (n.disabled = o_(n.disabled, r)), n.hidden !== void 0 && (n.hidden = o_(n.hidden, r)), n.modifiers)) {
		let e = {};
		Object.keys(n.modifiers).forEach((t) => {
			e[t] = o_(n.modifiers?.[t], r);
		}), n.modifiers = e;
	}
	let { components: i, formatters: o, labels: s, dateLib: c, locale: d, classNames: f } = l(() => {
		let e = {
			...Ym,
			...n.locale
		}, t = n.broadcastCalendar ? 1 : n.weekStartsOn, r = n.noonSafe && n.timeZone ? Cg(n.timeZone, {
			weekStartsOn: t,
			locale: e
		}) : void 0, i = n.dateLib && r ? {
			...r,
			...n.dateLib
		} : n.dateLib ?? r, a = new Xm({
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
			components: Hh(n.components),
			formatters: tg(n.formatters),
			labels: vg(n.labels, a.options),
			locale: e,
			classNames: {
				...Wh(),
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
	let { captionLayout: p, mode: m, navLayout: h, numberOfMonths: g = 1, onDayBlur: _, onDayClick: v, onDayFocus: y, onDayKeyDown: b, onDayMouseEnter: x, onDayMouseLeave: S, onNextClick: C, onPrevClick: w, showWeekNumber: T, styles: E } = n, { formatCaption: D, formatDay: O, formatMonthDropdown: k, formatWeekNumber: A, formatWeekNumberHeader: j, formatWeekdayName: M, formatYearDropdown: N } = o, P = Hg(n, c), { days: F, months: I, navStart: L, navEnd: ee, previousMonth: R, nextMonth: z, goToMonth: te } = P, ne = Bh(F, n, L, ee, c), { isSelected: re, select: ie, selected: ae } = n_(n, c) ?? {}, { blur: oe, focused: se, isFocusTarget: ce, moveFocus: le, setFocused: B } = Jg(n, P, ne, re ?? (() => !1), c), { labelDayButton: ue, labelGridcell: de, labelGrid: fe, labelMonthDropdown: pe, labelNav: me, labelPrevious: he, labelNext: ge, labelWeekday: _e, labelWeekNumber: ve, labelWeekNumberHeader: ye, labelYearDropdown: be } = s, xe = l(() => xg(c, n.ISOWeek, n.broadcastCalendar, n.today), [
		c,
		n.ISOWeek,
		n.broadcastCalendar,
		n.today
	]), Se = m !== void 0 || v !== void 0, Ce = a(() => {
		R && (te(R), w?.(R));
	}, [
		R,
		te,
		w
	]), we = a(() => {
		z && (te(z), C?.(z));
	}, [
		te,
		z,
		C
	]), Te = a((e, t) => (n) => {
		n.preventDefault(), n.stopPropagation(), B(e), !t.disabled && (ie?.(e.date, t, n), v?.(e.date, t, n));
	}, [
		ie,
		v,
		B
	]), V = a((e, t) => (n) => {
		B(e), y?.(e.date, t, n);
	}, [y, B]), Ee = a((e, t) => (n) => {
		oe(), _?.(e.date, t, n);
	}, [oe, _]), De = a((e, t) => (r) => {
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
			le(e, t);
		}
		b?.(e.date, t, r);
	}, [
		le,
		b,
		n.dir
	]), H = a((e, t) => (n) => {
		x?.(e.date, t, n);
	}, [x]), Oe = a((e, t) => (n) => {
		S?.(e.date, t, n);
	}, [S]), ke = a((e) => (t) => {
		let n = Number(t.target.value);
		te(c.setMonth(c.startOfMonth(e), n));
	}, [c, te]), Ae = a((e) => (t) => {
		let n = Number(t.target.value);
		te(c.setYear(c.startOfMonth(e), n));
	}, [c, te]), { className: je, style: Me } = l(() => ({
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
	]), Ne = Uh(n), Pe = u(null);
	jg(Pe, !!n.animate, {
		classNames: f,
		months: I,
		focused: se,
		dateLib: c
	});
	let Fe = {
		dayPickerProps: n,
		selected: ae,
		select: ie,
		isSelected: re,
		months: I,
		nextMonth: z,
		previousMonth: R,
		goToMonth: te,
		getModifiers: ne,
		components: i,
		classNames: f,
		styles: E,
		labels: s,
		formatters: o
	};
	return t.createElement(hh.Provider, { value: Fe }, t.createElement(i.Root, {
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
		"aria-label": me(),
		onPreviousClick: Ce,
		onNextClick: we,
		previousMonth: R,
		nextMonth: z
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
		tabIndex: R ? void 0 : -1,
		"aria-disabled": R ? void 0 : !0,
		"aria-label": he(R),
		onClick: Ce,
		"data-animated-button": n.animate ? "true" : void 0
	}, t.createElement(i.Chevron, {
		disabled: R ? void 0 : !0,
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
			"aria-label": pe(),
			classNames: f,
			components: i,
			disabled: !!n.disableNavigation,
			onChange: ke(e.date),
			options: yg(e.date, L, ee, o, c),
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
			options: Sg(L, ee, o, c, !!n.reverseYears),
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
		tabIndex: z ? void 0 : -1,
		"aria-disabled": z ? void 0 : !0,
		"aria-label": ge(z),
		onClick: we,
		"data-animated-button": n.animate ? "true" : void 0
	}, t.createElement(i.Chevron, {
		disabled: z ? void 0 : !0,
		className: f[Z.Chevron],
		orientation: n.dir === "rtl" ? "left" : "right"
	})), r === g - 1 && h === "after" && !n.hideNavigation && t.createElement(i.Nav, {
		"data-animated-nav": n.animate ? "true" : void 0,
		className: f[Z.Nav],
		style: E?.[Z.Nav],
		"aria-label": me(),
		onPreviousClick: Ce,
		onNextClick: we,
		previousMonth: R,
		nextMonth: z
	}), t.createElement(i.MonthGrid, {
		role: "grid",
		"aria-multiselectable": m === "multiple" || m === "range",
		"aria-label": fe(e.date, c.options, c) || void 0,
		className: f[Z.MonthGrid],
		style: E?.[Z.MonthGrid]
	}, !n.hideWeekdays && t.createElement(i.Weekdays, {
		"data-animated-weekdays": n.animate ? "true" : void 0,
		className: f[Z.Weekdays],
		style: E?.[Z.Weekdays]
	}, T && t.createElement(i.WeekNumberHeader, {
		"aria-label": ye(c.options),
		className: f[Z.WeekNumberHeader],
		style: E?.[Z.WeekNumberHeader],
		scope: "col"
	}, j()), xe.map((e) => t.createElement(i.Weekday, {
		"aria-label": _e(e, c.options, c),
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
		"aria-label": ve(e.weekNumber, { locale: d }),
		className: f[Z.WeekNumber],
		scope: "row",
		role: "rowheader"
	}, A(e.weekNumber, c)), e.days.map((e) => {
		let { date: r } = e, a = ne(e);
		if (a[Q.focused] = !a.hidden && !!se?.isEqualTo(e), a[oh.selected] = re?.(r) || a.selected, Ph(ae)) {
			let { from: e, to: t } = ae;
			a[oh.range_start] = !!(e && t && c.isSameDay(r, e)), a[oh.range_end] = !!(e && t && c.isSameDay(r, t)), a[oh.range_middle] = Mh(ae, r, !0, c);
		}
		let o = bg(a, E, n.modifiersStyles), s = Vh(a, f, n.modifiersClassNames), l = !Se && !a.hidden ? de(r, a, c.options, c) : void 0;
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
			tabIndex: ce(e) ? 0 : -1,
			"aria-label": ue(r, a, c.options, c),
			onClick: Te(e, a),
			onBlur: Ee(e, a),
			onFocus: V(e, a),
			onKeyDown: De(e, a),
			onMouseEnter: H(e, a),
			onMouseLeave: Oe(e, a)
		}, O(r, c.options, c)) : !a.hidden && O(e.date, c.options, c));
	})))))))), n.footer && t.createElement(i.Footer, {
		className: f[Z.Footer],
		style: E?.[Z.Footer],
		role: "status",
		"aria-live": "polite"
	}, n.footer)));
}
var c_ = {
	content: "_content_1uat3_1",
	popoverShow: "_popoverShow_1uat3_1",
	popoverHide: "_popoverHide_1uat3_1"
}, l_ = {
	months: "_months_8obam_1",
	month: "_month_8obam_1",
	caption: "_caption_8obam_19",
	caption_label: "_caption_label_8obam_27",
	nav: "_nav_8obam_34",
	table: "_table_8obam_40",
	head_cell: "_head_cell_8obam_45",
	cell: "_cell_8obam_54",
	day: "_day_8obam_61",
	day_selected: "_day_selected_8obam_79",
	day_today: "_day_today_8obam_85",
	day_outside: "_day_outside_8obam_91",
	day_range_middle: "_day_range_middle_8obam_95",
	day_range_start: "_day_range_start_8obam_101",
	day_range_end: "_day_range_end_8obam_105"
}, u_ = {
	wrapper: "_wrapper_8srvt_2",
	label: "_label_8srvt_11",
	triggerBtn: "_triggerBtn_8srvt_18",
	triggerBtnEmpty: "_triggerBtnEmpty_8srvt_31",
	calendarIcon: "_calendarIcon_8srvt_36",
	popoverContent: "_popoverContent_8srvt_43",
	errorMessage: "_errorMessage_8srvt_49"
}, d_ = Om, f_ = km, p_ = e.forwardRef(({ className: e, align: t = "center", sideOffset: n = 4, ...r }, i) => /* @__PURE__ */ p(Am, { children: /* @__PURE__ */ p(jm, {
	ref: i,
	align: t,
	sideOffset: n,
	className: x(c_.content, e),
	...r
}) }));
function m_({ className: e, classNames: t, showOutsideDays: n = !0, ...r }) {
	return /* @__PURE__ */ p(s_, {
		locale: tm,
		showOutsideDays: n,
		className: x(e),
		classNames: {
			months: l_.months,
			month: l_.month,
			caption: l_.caption,
			caption_label: l_.caption_label,
			nav: l_.nav,
			table: l_.table,
			head_cell: l_.head_cell,
			cell: l_.cell,
			day: l_.day,
			day_selected: l_.day_selected,
			day_today: l_.day_today,
			day_outside: l_.day_outside,
			day_range_middle: l_.day_range_middle,
			day_range_start: l_.day_range_start,
			day_range_end: l_.day_range_end,
			...t
		},
		components: { Chevron: ({ orientation: e }) => /* @__PURE__ */ p(e === "left" ? ne : re, {
			size: 16,
			className: ye({
				variant: "ghost",
				size: "sm"
			})
		}) },
		...r
	});
}
var h_ = e.forwardRef(({ date: t, onSelect: n, label: r, error: i, placeholder: a = "Selecione uma data", className: o, id: s }, c) => {
	let l = !!i, [u, d] = e.useState(!1), f = s || `datepicker-${r?.replace(/\s+/g, "-").toLowerCase()}`;
	return /* @__PURE__ */ m("div", {
		className: x(u_.wrapper, o),
		children: [
			r && /* @__PURE__ */ p("label", {
				htmlFor: f,
				className: u_.label,
				children: r
			}),
			/* @__PURE__ */ m(d_, {
				open: u,
				onOpenChange: d,
				children: [/* @__PURE__ */ p(f_, {
					asChild: !0,
					children: /* @__PURE__ */ m("button", {
						id: f,
						ref: c,
						type: "button",
						className: x(Se({
							hasError: l,
							hasIcon: !1
						}), u_.triggerBtn, !t && u_.triggerBtnEmpty),
						children: [/* @__PURE__ */ p(R, {
							className: u_.calendarIcon,
							size: 16
						}), t ? Bp(t, "PPP", { locale: tm }) : /* @__PURE__ */ p("span", { children: a })]
					})
				}), /* @__PURE__ */ p(p_, {
					className: u_.popoverContent,
					children: /* @__PURE__ */ p(m_, {
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
				className: u_.errorMessage,
				children: i
			})
		]
	});
});
h_.displayName = "DatePicker";
var g_ = {
	container: "_container_de5ls_1",
	label: "_label_de5ls_10",
	trigger: "_trigger_de5ls_16",
	triggerActive: "_triggerActive_de5ls_33",
	triggerError: "_triggerError_de5ls_38",
	placeholder: "_placeholder_de5ls_42",
	icon: "_icon_de5ls_46",
	iconOpen: "_iconOpen_de5ls_51",
	dropdown: "_dropdown_de5ls_55",
	slideDown: "_slideDown_de5ls_1",
	option: "_option_de5ls_71",
	optionSelected: "_optionSelected_de5ls_87",
	checkIcon: "_checkIcon_de5ls_93",
	errorMessage: "_errorMessage_de5ls_97"
}, __ = ({ options: e, value: t, onChange: n, label: r, error: i, placeholder: a = "Selecione...", className: o }) => {
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
		className: x(g_.container, o),
		ref: v,
		children: [
			r && /* @__PURE__ */ p("label", {
				className: g_.label,
				children: r
			}),
			/* @__PURE__ */ m("div", {
				ref: y,
				className: x(g_.trigger, l && g_.triggerActive, i && g_.triggerError),
				onClick: (e) => {
					e.stopPropagation(), f(!l);
				},
				children: [/* @__PURE__ */ p("span", {
					className: x(!b && g_.placeholder),
					children: b ? b.label : a
				}), /* @__PURE__ */ p(te, {
					size: 18,
					className: x(g_.icon, l && g_.iconOpen)
				})]
			}),
			l && g.createPortal(/* @__PURE__ */ p("div", {
				id: "avere-select-portal",
				className: g_.dropdown,
				style: {
					position: "absolute",
					top: `${h.top}px`,
					left: `${h.left}px`,
					width: `${h.width}px`,
					zIndex: 99999,
					fontFamily: "Montserrat, sans-serif"
				},
				children: e.map((e) => /* @__PURE__ */ m("div", {
					className: x(g_.option, t === e.value && g_.optionSelected),
					onMouseDown: (t) => S(e, t),
					children: [/* @__PURE__ */ p("span", {
						style: { pointerEvents: "none" },
						children: e.label
					}), t === e.value && /* @__PURE__ */ p(z, {
						size: 16,
						className: g_.checkIcon
					})]
				}, e.value))
			}), document.body),
			i && /* @__PURE__ */ p("span", {
				className: g_.errorMessage,
				children: i
			})
		]
	});
}, [v_, y_] = ke("Tooltip", [so]), b_ = so(), x_ = "TooltipProvider", S_ = 700, C_ = "tooltip.open", [w_, T_] = v_(x_), E_ = (t) => {
	let { __scopeTooltip: n, delayDuration: r = S_, skipDelayDuration: i = 300, disableHoverableContent: a = !1, children: o } = t, s = e.useRef(!0), c = e.useRef(!1), l = e.useRef(0);
	return e.useEffect(() => {
		let e = l.current;
		return () => window.clearTimeout(e);
	}, []), /* @__PURE__ */ p(w_, {
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
E_.displayName = x_;
var D_ = "Tooltip", [O_, k_] = v_(D_), A_ = (t) => {
	let { __scopeTooltip: n, children: r, open: i, defaultOpen: a, onOpenChange: o, disableHoverableContent: s, delayDuration: c } = t, l = T_(D_, t.__scopeTooltip), u = b_(n), [d, f] = e.useState(null), m = He(), h = e.useRef(0), g = s ?? l.disableHoverableContent, _ = c ?? l.delayDuration, v = e.useRef(!1), [y, b] = Ge({
		prop: i,
		defaultProp: a ?? !1,
		onChange: (e) => {
			e ? (l.onOpen(), document.dispatchEvent(new CustomEvent(C_))) : l.onClose(), o?.(e);
		},
		caller: D_
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
	}, []), /* @__PURE__ */ p(wo, {
		...u,
		children: /* @__PURE__ */ p(O_, {
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
A_.displayName = D_;
var j_ = "TooltipTrigger", M_ = e.forwardRef((t, n) => {
	let { __scopeTooltip: r, ...i } = t, a = k_(j_, r), o = T_(j_, r), s = b_(r), c = H(n, e.useRef(null), a.onTriggerChange), l = e.useRef(!1), u = e.useRef(!1), d = e.useCallback(() => l.current = !1, []);
	return e.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), /* @__PURE__ */ p(To, {
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
M_.displayName = j_;
var N_ = "TooltipPortal", [P_, F_] = v_(N_, { forceMount: void 0 }), I_ = (e) => {
	let { __scopeTooltip: t, forceMount: n, children: r, container: i } = e, a = k_(N_, t);
	return /* @__PURE__ */ p(P_, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ p(bt, {
			present: n || a.open,
			children: /* @__PURE__ */ p(ko, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
};
I_.displayName = N_;
var L_ = "TooltipContent", R_ = e.forwardRef((e, t) => {
	let n = F_(L_, e.__scopeTooltip), { forceMount: r = n.forceMount, side: i = "top", ...a } = e, o = k_(L_, e.__scopeTooltip);
	return /* @__PURE__ */ p(bt, {
		present: r || o.open,
		children: o.disableHoverableContent ? /* @__PURE__ */ p(U_, {
			side: i,
			...a,
			ref: t
		}) : /* @__PURE__ */ p(z_, {
			side: i,
			...a,
			ref: t
		})
	});
}), z_ = e.forwardRef((t, n) => {
	let r = k_(L_, t.__scopeTooltip), i = T_(L_, t.__scopeTooltip), a = e.useRef(null), o = H(n, a), [s, c] = e.useState(null), { trigger: l, onClose: u } = r, d = a.current, { onPointerInTransitChange: f } = i, m = e.useCallback(() => {
		c(null), f(!1);
	}, [f]), h = e.useCallback((e, t) => {
		let n = e.currentTarget, r = {
			x: e.clientX,
			y: e.clientY
		}, i = q_(r, K_(r, n.getBoundingClientRect())), a = J_(t.getBoundingClientRect());
		c(X_([...i, ...a])), f(!0);
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
				}, r = l?.contains(t) || d?.contains(t), i = !Y_(n, s);
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
	]), /* @__PURE__ */ p(U_, {
		...t,
		ref: o
	});
}), [B_, V_] = v_(D_, { isInside: !1 }), H_ = /* @__PURE__ */ Pe("TooltipContent"), U_ = e.forwardRef((t, n) => {
	let { __scopeTooltip: r, children: i, "aria-label": a, onEscapeKeyDown: o, onPointerDownOutside: s, ...c } = t, l = k_(L_, r), u = b_(r), { onClose: d } = l;
	return e.useEffect(() => (document.addEventListener(C_, d), () => document.removeEventListener(C_, d)), [d]), e.useEffect(() => {
		if (l.trigger) {
			let e = (e) => {
				e.target?.contains(l.trigger) && d();
			};
			return window.addEventListener("scroll", e, { capture: !0 }), () => window.removeEventListener("scroll", e, { capture: !0 });
		}
	}, [l.trigger, d]), /* @__PURE__ */ p(vr, {
		asChild: !0,
		disableOutsidePointerEvents: !1,
		onEscapeKeyDown: o,
		onPointerDownOutside: s,
		onFocusOutside: (e) => e.preventDefault(),
		onDismiss: d,
		children: /* @__PURE__ */ m(Eo, {
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
			children: [/* @__PURE__ */ p(H_, { children: i }), /* @__PURE__ */ p(B_, {
				scope: r,
				isInside: !0,
				children: /* @__PURE__ */ p(No, {
					id: l.contentId,
					role: "tooltip",
					children: a || i
				})
			})]
		})
	});
});
R_.displayName = L_;
var W_ = "TooltipArrow", G_ = e.forwardRef((e, t) => {
	let { __scopeTooltip: n, ...r } = e, i = b_(n);
	return V_(W_, n).isInside ? null : /* @__PURE__ */ p(Do, {
		...i,
		...r,
		ref: t
	});
});
G_.displayName = W_;
function K_(e, t) {
	let n = Math.abs(t.top - e.y), r = Math.abs(t.bottom - e.y), i = Math.abs(t.right - e.x), a = Math.abs(t.left - e.x);
	switch (Math.min(n, r, i, a)) {
		case a: return "left";
		case i: return "right";
		case n: return "top";
		case r: return "bottom";
		default: throw Error("unreachable");
	}
}
function q_(e, t, n = 5) {
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
function J_(e) {
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
function Y_(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e], s = t[a], c = o.x, l = o.y, u = s.x, d = s.y;
		l > r != d > r && n < (u - c) * (r - l) / (d - l) + c && (i = !i);
	}
	return i;
}
function X_(e) {
	let t = e.slice();
	return t.sort((e, t) => e.x < t.x ? -1 : e.x > t.x ? 1 : e.y < t.y ? -1 : e.y > t.y ? 1 : 0), Z_(t);
}
function Z_(e) {
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
var Q_ = E_, $_ = A_, ev = M_, tv = R_, nv = {
	content: "_content_frcrx_1",
	"tooltip-show": "_tooltip-show_frcrx_1",
	"tooltip-hide": "_tooltip-hide_frcrx_1",
	"slide-up": "_slide-up_frcrx_1",
	"slide-down": "_slide-down_frcrx_1",
	"slide-left": "_slide-left_frcrx_1",
	"slide-right": "_slide-right_frcrx_1"
}, rv = Q_, iv = $_, av = ev, ov = e.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ p(tv, {
	ref: r,
	sideOffset: t,
	className: x(nv.content, e),
	...n
}));
ov.displayName = tv.displayName;
//#endregion
//#region node_modules/sonner/dist/index.mjs
function sv(e) {
	if (!e || typeof document > "u") return;
	let t = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
	n.type = "text/css", t.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e));
}
var cv = (e) => {
	switch (e) {
		case "success": return dv;
		case "info": return pv;
		case "warning": return fv;
		case "error": return mv;
		default: return null;
	}
}, lv = Array(12).fill(0), uv = ({ visible: e, className: n }) => /* @__PURE__ */ t.createElement("div", {
	className: ["sonner-loading-wrapper", n].filter(Boolean).join(" "),
	"data-visible": e
}, /* @__PURE__ */ t.createElement("div", { className: "sonner-spinner" }, lv.map((e, n) => /* @__PURE__ */ t.createElement("div", {
	className: "sonner-loading-bar",
	key: `spinner-bar-${n}`
})))), dv = /* @__PURE__ */ t.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20"
}, /* @__PURE__ */ t.createElement("path", {
	fillRule: "evenodd",
	d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
	clipRule: "evenodd"
})), fv = /* @__PURE__ */ t.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "currentColor",
	height: "20",
	width: "20"
}, /* @__PURE__ */ t.createElement("path", {
	fillRule: "evenodd",
	d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
	clipRule: "evenodd"
})), pv = /* @__PURE__ */ t.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20"
}, /* @__PURE__ */ t.createElement("path", {
	fillRule: "evenodd",
	d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
	clipRule: "evenodd"
})), mv = /* @__PURE__ */ t.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20"
}, /* @__PURE__ */ t.createElement("path", {
	fillRule: "evenodd",
	d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
	clipRule: "evenodd"
})), hv = /* @__PURE__ */ t.createElement("svg", {
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
})), gv = () => {
	let [e, n] = t.useState(document.hidden);
	return t.useEffect(() => {
		let e = () => {
			n(document.hidden);
		};
		return document.addEventListener("visibilitychange", e), () => window.removeEventListener("visibilitychange", e);
	}, []), e;
}, _v = 1, vv = new class {
	constructor() {
		this.subscribe = (e) => (this.subscribers.push(e), () => {
			let t = this.subscribers.indexOf(e);
			this.subscribers.splice(t, 1);
		}), this.publish = (e) => {
			this.subscribers.forEach((t) => t(e));
		}, this.addToast = (e) => {
			this.publish(e), this.toasts = [...this.toasts, e];
		}, this.create = (e) => {
			let { message: t, ...n } = e, r = typeof e?.id == "number" || e.id?.length > 0 ? e.id : _v++, i = this.toasts.find((e) => e.id === r), a = e.dismissible === void 0 ? !0 : e.dismissible;
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
				else if (bv(e) && !e.ok) {
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
			let n = t?.id || _v++;
			return this.create({
				jsx: e(n),
				id: n,
				...t
			}), n;
		}, this.getActiveToasts = () => this.toasts.filter((e) => !this.dismissedToasts.has(e.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
	}
}(), yv = (e, t) => {
	let n = t?.id || _v++;
	return vv.addToast({
		title: e,
		...t,
		id: n
	}), n;
}, bv = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", xv = yv, Sv = Object.assign(xv, {
	success: vv.success,
	info: vv.info,
	warning: vv.warning,
	error: vv.error,
	custom: vv.custom,
	message: vv.message,
	promise: vv.promise,
	dismiss: vv.dismiss,
	loading: vv.loading
}, {
	getHistory: () => vv.toasts,
	getToasts: () => vv.getActiveToasts()
});
sv("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Cv(e) {
	return e.label !== void 0;
}
var wv = 3, Tv = "24px", Ev = "16px", Dv = 4e3, Ov = 356, kv = 14, Av = 45, jv = 200;
function Mv(...e) {
	return e.filter(Boolean).join(" ");
}
function Nv(e) {
	let [t, n] = e.split("-"), r = [];
	return t && r.push(t), n && r.push(n), r;
}
var Pv = (e) => {
	let { invert: n, toast: r, unstyled: i, interacting: a, setHeights: o, visibleToasts: s, heights: c, index: l, toasts: u, expanded: d, removeToast: f, defaultRichColors: p, closeButton: m, style: h, cancelButtonStyle: g, actionButtonStyle: _, className: v = "", descriptionClassName: y = "", duration: b, position: x, gap: S, expandByDefault: C, classNames: w, icons: T, closeButtonAriaLabel: E = "Close toast" } = e, [D, O] = t.useState(null), [k, A] = t.useState(null), [j, M] = t.useState(!1), [N, P] = t.useState(!1), [F, I] = t.useState(!1), [L, ee] = t.useState(!1), [R, z] = t.useState(!1), [te, ne] = t.useState(0), [re, ie] = t.useState(0), ae = t.useRef(r.duration || b || Dv), oe = t.useRef(null), se = t.useRef(null), ce = l === 0, le = l + 1 <= s, B = r.type, ue = r.dismissible !== !1, de = r.className || "", fe = r.descriptionClassName || "", pe = t.useMemo(() => c.findIndex((e) => e.toastId === r.id) || 0, [c, r.id]), me = t.useMemo(() => r.closeButton ?? m, [r.closeButton, m]), he = t.useMemo(() => r.duration || b || Dv, [r.duration, b]), ge = t.useRef(0), _e = t.useRef(0), ve = t.useRef(0), ye = t.useRef(null), [be, xe] = x.split("-"), Se = t.useMemo(() => c.reduce((e, t, n) => n >= pe ? e : e + t.height, 0), [c, pe]), Ce = gv(), we = r.invert || n, Te = B === "loading";
	_e.current = t.useMemo(() => pe * S + Se, [pe, Se]), t.useEffect(() => {
		ae.current = he;
	}, [he]), t.useEffect(() => {
		M(!0);
	}, []), t.useEffect(() => {
		let e = se.current;
		if (e) {
			let t = e.getBoundingClientRect().height;
			return ie(t), o((e) => [{
				toastId: r.id,
				height: t,
				position: r.position
			}, ...e]), () => o((e) => e.filter((e) => e.toastId !== r.id));
		}
	}, [o, r.id]), t.useLayoutEffect(() => {
		if (!j) return;
		let e = se.current, t = e.style.height;
		e.style.height = "auto";
		let n = e.getBoundingClientRect().height;
		e.style.height = t, ie(n), o((e) => e.find((e) => e.toastId === r.id) ? e.map((e) => e.toastId === r.id ? {
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
	let V = t.useCallback(() => {
		P(!0), ne(_e.current), o((e) => e.filter((e) => e.toastId !== r.id)), setTimeout(() => {
			f(r);
		}, jv);
	}, [
		r,
		f,
		o,
		_e
	]);
	t.useEffect(() => {
		if (r.promise && B === "loading" || r.duration === Infinity || r.type === "loading") return;
		let e;
		return d || a || Ce ? (() => {
			if (ve.current < ge.current) {
				let e = (/* @__PURE__ */ new Date()).getTime() - ge.current;
				ae.current -= e;
			}
			ve.current = (/* @__PURE__ */ new Date()).getTime();
		})() : ae.current !== Infinity && (ge.current = (/* @__PURE__ */ new Date()).getTime(), e = setTimeout(() => {
			r.onAutoClose == null || r.onAutoClose.call(r, r), V();
		}, ae.current)), () => clearTimeout(e);
	}, [
		d,
		a,
		r,
		B,
		Ce,
		V
	]), t.useEffect(() => {
		r.delete && (V(), r.onDismiss == null || r.onDismiss.call(r, r));
	}, [V, r.delete]);
	function Ee() {
		return T?.loading ? /* @__PURE__ */ t.createElement("div", {
			className: Mv(w?.loader, r?.classNames?.loader, "sonner-loader"),
			"data-visible": B === "loading"
		}, T.loading) : /* @__PURE__ */ t.createElement(uv, {
			className: Mv(w?.loader, r?.classNames?.loader),
			visible: B === "loading"
		});
	}
	let De = r.icon || T?.[B] || cv(B);
	return /* @__PURE__ */ t.createElement("li", {
		tabIndex: 0,
		ref: se,
		className: Mv(v, de, w?.toast, r?.classNames?.toast, w?.default, w?.[B], r?.classNames?.[B]),
		"data-sonner-toast": "",
		"data-rich-colors": r.richColors ?? p,
		"data-styled": !(r.jsx || r.unstyled || i),
		"data-mounted": j,
		"data-promise": !!r.promise,
		"data-swiped": R,
		"data-removed": N,
		"data-visible": le,
		"data-y-position": be,
		"data-x-position": xe,
		"data-index": l,
		"data-front": ce,
		"data-swiping": F,
		"data-dismissible": ue,
		"data-type": B,
		"data-invert": we,
		"data-swipe-out": L,
		"data-swipe-direction": k,
		"data-expanded": !!(d || C && j),
		"data-testid": r.testId,
		style: {
			"--index": l,
			"--toasts-before": l,
			"--z-index": u.length - l,
			"--offset": `${N ? te : _e.current}px`,
			"--initial-height": C ? "auto" : `${re}px`,
			...h,
			...r.style
		},
		onDragEnd: () => {
			I(!1), O(null), ye.current = null;
		},
		onPointerDown: (e) => {
			e.button !== 2 && (Te || !ue || (oe.current = /* @__PURE__ */ new Date(), ne(_e.current), e.target.setPointerCapture(e.pointerId), e.target.tagName !== "BUTTON" && (I(!0), ye.current = {
				x: e.clientX,
				y: e.clientY
			})));
		},
		onPointerUp: () => {
			if (L || !ue) return;
			ye.current = null;
			let e = Number(se.current?.style.getPropertyValue("--swipe-amount-x").replace("px", "") || 0), t = Number(se.current?.style.getPropertyValue("--swipe-amount-y").replace("px", "") || 0), n = (/* @__PURE__ */ new Date()).getTime() - oe.current?.getTime(), i = D === "x" ? e : t, a = Math.abs(i) / n;
			if (Math.abs(i) >= Av || a > .11) {
				ne(_e.current), r.onDismiss == null || r.onDismiss.call(r, r), A(D === "x" ? e > 0 ? "right" : "left" : t > 0 ? "down" : "up"), V(), ee(!0);
				return;
			} else {
				var o, s;
				(o = se.current) == null || o.style.setProperty("--swipe-amount-x", "0px"), (s = se.current) == null || s.style.setProperty("--swipe-amount-y", "0px");
			}
			z(!1), I(!1), O(null);
		},
		onPointerMove: (t) => {
			var n, r;
			if (!ye.current || !ue || window.getSelection()?.toString().length > 0) return;
			let i = t.clientY - ye.current.y, a = t.clientX - ye.current.x, o = e.swipeDirections ?? Nv(x);
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
			(Math.abs(s.x) > 0 || Math.abs(s.y) > 0) && z(!0), (n = se.current) == null || n.style.setProperty("--swipe-amount-x", `${s.x}px`), (r = se.current) == null || r.style.setProperty("--swipe-amount-y", `${s.y}px`);
		}
	}, me && !r.jsx && B !== "loading" ? /* @__PURE__ */ t.createElement("button", {
		"aria-label": E,
		"data-disabled": Te,
		"data-close-button": !0,
		onClick: Te || !ue ? () => {} : () => {
			V(), r.onDismiss == null || r.onDismiss.call(r, r);
		},
		className: Mv(w?.closeButton, r?.classNames?.closeButton)
	}, T?.close ?? hv) : null, (B || r.icon || r.promise) && r.icon !== null && (T?.[B] !== null || r.icon) ? /* @__PURE__ */ t.createElement("div", {
		"data-icon": "",
		className: Mv(w?.icon, r?.classNames?.icon)
	}, r.promise || r.type === "loading" && !r.icon ? r.icon || Ee() : null, r.type === "loading" ? null : De) : null, /* @__PURE__ */ t.createElement("div", {
		"data-content": "",
		className: Mv(w?.content, r?.classNames?.content)
	}, /* @__PURE__ */ t.createElement("div", {
		"data-title": "",
		className: Mv(w?.title, r?.classNames?.title)
	}, r.jsx ? r.jsx : typeof r.title == "function" ? r.title() : r.title), r.description ? /* @__PURE__ */ t.createElement("div", {
		"data-description": "",
		className: Mv(y, fe, w?.description, r?.classNames?.description)
	}, typeof r.description == "function" ? r.description() : r.description) : null), /* @__PURE__ */ t.isValidElement(r.cancel) ? r.cancel : r.cancel && Cv(r.cancel) ? /* @__PURE__ */ t.createElement("button", {
		"data-button": !0,
		"data-cancel": !0,
		style: r.cancelButtonStyle || g,
		onClick: (e) => {
			Cv(r.cancel) && ue && (r.cancel.onClick == null || r.cancel.onClick.call(r.cancel, e), V());
		},
		className: Mv(w?.cancelButton, r?.classNames?.cancelButton)
	}, r.cancel.label) : null, /* @__PURE__ */ t.isValidElement(r.action) ? r.action : r.action && Cv(r.action) ? /* @__PURE__ */ t.createElement("button", {
		"data-button": !0,
		"data-action": !0,
		style: r.actionButtonStyle || _,
		onClick: (e) => {
			Cv(r.action) && (r.action.onClick == null || r.action.onClick.call(r.action, e), !e.defaultPrevented && V());
		},
		className: Mv(w?.actionButton, r?.classNames?.actionButton)
	}, r.action.label) : null);
};
function Fv() {
	if (typeof window > "u" || typeof document > "u") return "ltr";
	let e = document.documentElement.getAttribute("dir");
	return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function Iv(e, t) {
	let n = {};
	return [e, t].forEach((e, t) => {
		let r = t === 1, i = r ? "--mobile-offset" : "--offset", a = r ? Ev : Tv;
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
var Lv = /* @__PURE__ */ t.forwardRef(function(e, n) {
	let { id: r, invert: i, position: a = "bottom-right", hotkey: o = ["altKey", "KeyT"], expand: s, closeButton: c, className: l, offset: u, mobileOffset: d, theme: f = "light", richColors: p, duration: m, style: h, visibleToasts: _ = wv, toastOptions: v, dir: y = Fv(), gap: b = kv, icons: x, containerAriaLabel: S = "Notifications" } = e, [C, w] = t.useState([]), T = t.useMemo(() => r ? C.filter((e) => e.toasterId === r) : C.filter((e) => !e.toasterId), [C, r]), E = t.useMemo(() => Array.from(new Set([a].concat(T.filter((e) => e.position).map((e) => e.position)))), [T, a]), [D, O] = t.useState([]), [k, A] = t.useState(!1), [j, M] = t.useState(!1), [N, P] = t.useState(f === "system" ? typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : f), F = t.useRef(null), I = o.join("+").replace(/Key/g, "").replace(/Digit/g, ""), L = t.useRef(null), ee = t.useRef(!1), R = t.useCallback((e) => {
		w((t) => (t.find((t) => t.id === e.id)?.delete || vv.dismiss(e.id), t.filter(({ id: t }) => t !== e.id)));
	}, []);
	return t.useEffect(() => vv.subscribe((e) => {
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
			dir: y === "auto" ? Fv() : y,
			tabIndex: -1,
			ref: F,
			className: l,
			"data-sonner-toaster": !0,
			"data-sonner-theme": N,
			"data-y-position": a,
			"data-x-position": o,
			style: {
				"--front-toast-height": `${D[0]?.height || 0}px`,
				"--width": `${Ov}px`,
				"--gap": `${b}px`,
				...h,
				...Iv(u, d)
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
		}, T.filter((e) => !e.position && r === 0 || e.position === n).map((r, a) => /* @__PURE__ */ t.createElement(Pv, {
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
			removeToast: R,
			toasts: T.filter((e) => e.position == r.position),
			heights: D.filter((e) => e.position == r.position),
			setHeights: O,
			expandByDefault: s,
			gap: b,
			expanded: k,
			swipeDirections: e.swipeDirections
		}))) : null;
	}));
}), Rv = {
	toast: "_toast_180nc_1",
	description: "_description_180nc_12",
	actionButton: "_actionButton_180nc_17",
	cancelButton: "_cancelButton_180nc_24",
	success: "_success_180nc_31",
	error: "_error_180nc_37",
	warning: "_warning_180nc_43",
	info: "_info_180nc_49"
}, zv = ({ ...e }) => /* @__PURE__ */ p(Lv, {
	toastOptions: { classNames: {
		toast: Rv.toast,
		description: Rv.description,
		actionButton: Rv.actionButton,
		cancelButton: Rv.cancelButton,
		success: Rv.success,
		error: Rv.error,
		warning: Rv.warning,
		info: Rv.info
	} },
	...e
}), Bv = "Dialog", [Vv, Hv] = ke(Bv), [Uv, Wv] = Vv(Bv), Gv = (t) => {
	let { __scopeDialog: n, children: r, open: i, defaultOpen: a, onOpenChange: o, modal: s = !0 } = t, c = e.useRef(null), l = e.useRef(null), [u, d] = Ge({
		prop: i,
		defaultProp: a ?? !1,
		onChange: o,
		caller: Bv
	});
	return /* @__PURE__ */ p(Uv, {
		scope: n,
		triggerRef: c,
		contentRef: l,
		contentId: He(),
		titleId: He(),
		descriptionId: He(),
		open: u,
		onOpenChange: d,
		onOpenToggle: e.useCallback(() => d((e) => !e), [d]),
		modal: s,
		children: r
	});
};
Gv.displayName = Bv;
var Kv = "DialogTrigger", qv = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = Wv(Kv, n), a = H(t, i.triggerRef);
	return /* @__PURE__ */ p(U.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": i.open,
		"aria-controls": i.contentId,
		"data-state": py(i.open),
		...r,
		ref: a,
		onClick: V(e.onClick, i.onOpenToggle)
	});
});
qv.displayName = Kv;
var Jv = "DialogPortal", [Yv, Xv] = Vv(Jv, { forceMount: void 0 }), Zv = (t) => {
	let { __scopeDialog: n, forceMount: r, children: i, container: a } = t, o = Wv(Jv, n);
	return /* @__PURE__ */ p(Yv, {
		scope: n,
		forceMount: r,
		children: e.Children.map(i, (e) => /* @__PURE__ */ p(bt, {
			present: r || o.open,
			children: /* @__PURE__ */ p(ko, {
				asChild: !0,
				container: a,
				children: e
			})
		}))
	});
};
Zv.displayName = Jv;
var Qv = "DialogOverlay", $v = e.forwardRef((e, t) => {
	let n = Xv(Qv, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = Wv(Qv, e.__scopeDialog);
	return a.modal ? /* @__PURE__ */ p(bt, {
		present: r || a.open,
		children: /* @__PURE__ */ p(ty, {
			...i,
			ref: t
		})
	}) : null;
});
$v.displayName = Qv;
var ey = /* @__PURE__ */ je("DialogOverlay.RemoveScroll"), ty = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = Wv(Qv, n);
	return /* @__PURE__ */ p(Zs, {
		as: ey,
		allowPinchZoom: !0,
		shards: [i.contentRef],
		children: /* @__PURE__ */ p(U.div, {
			"data-state": py(i.open),
			...r,
			ref: t,
			style: {
				pointerEvents: "auto",
				...r.style
			}
		})
	});
}), ny = "DialogContent", ry = e.forwardRef((e, t) => {
	let n = Xv(ny, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = Wv(ny, e.__scopeDialog);
	return /* @__PURE__ */ p(bt, {
		present: r || a.open,
		children: a.modal ? /* @__PURE__ */ p(iy, {
			...i,
			ref: t
		}) : /* @__PURE__ */ p(ay, {
			...i,
			ref: t
		})
	});
});
ry.displayName = ny;
var iy = e.forwardRef((t, n) => {
	let r = Wv(ny, t.__scopeDialog), i = e.useRef(null), a = H(n, r.contentRef, i);
	return e.useEffect(() => {
		let e = i.current;
		if (e) return Ho(e);
	}, []), /* @__PURE__ */ p(oy, {
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
}), ay = e.forwardRef((t, n) => {
	let r = Wv(ny, t.__scopeDialog), i = e.useRef(!1), a = e.useRef(!1);
	return /* @__PURE__ */ p(oy, {
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
}), oy = e.forwardRef((t, n) => {
	let { __scopeDialog: r, trapFocus: i, onOpenAutoFocus: a, onCloseAutoFocus: o, ...s } = t, c = Wv(ny, r), l = e.useRef(null), u = H(n, l);
	return Er(), /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p(Mr, {
		asChild: !0,
		loop: !0,
		trapped: i,
		onMountAutoFocus: a,
		onUnmountAutoFocus: o,
		children: /* @__PURE__ */ p(vr, {
			role: "dialog",
			id: c.contentId,
			"aria-describedby": c.descriptionId,
			"aria-labelledby": c.titleId,
			"data-state": py(c.open),
			...s,
			ref: u,
			onDismiss: () => c.onOpenChange(!1)
		})
	}), /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p(_y, { titleId: c.titleId }), /* @__PURE__ */ p(yy, {
		contentRef: l,
		descriptionId: c.descriptionId
	})] })] });
}), sy = "DialogTitle", cy = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = Wv(sy, n);
	return /* @__PURE__ */ p(U.h2, {
		id: i.titleId,
		...r,
		ref: t
	});
});
cy.displayName = sy;
var ly = "DialogDescription", uy = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = Wv(ly, n);
	return /* @__PURE__ */ p(U.p, {
		id: i.descriptionId,
		...r,
		ref: t
	});
});
uy.displayName = ly;
var dy = "DialogClose", fy = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = Wv(dy, n);
	return /* @__PURE__ */ p(U.button, {
		type: "button",
		...r,
		ref: t,
		onClick: V(e.onClick, () => i.onOpenChange(!1))
	});
});
fy.displayName = dy;
function py(e) {
	return e ? "open" : "closed";
}
var my = "DialogTitleWarning", [hy, gy] = Oe(my, {
	contentName: ny,
	titleName: sy,
	docsSlug: "dialog"
}), _y = ({ titleId: t }) => {
	let n = gy(my), r = `\`${n.contentName}\` requires a \`${n.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${n.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${n.docsSlug}`;
	return e.useEffect(() => {
		t && (document.getElementById(t) || console.error(r));
	}, [r, t]), null;
}, vy = "DialogDescriptionWarning", yy = ({ contentRef: t, descriptionId: n }) => {
	let r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${gy(vy).contentName}}.`;
	return e.useEffect(() => {
		let e = t.current?.getAttribute("aria-describedby");
		n && e && (document.getElementById(n) || console.warn(r));
	}, [
		r,
		t,
		n
	]), null;
}, by = Gv, xy = qv, Sy = Zv, Cy = $v, wy = ry, Ty = cy, Ey = uy, Dy = fy, Oy = {
	overlay: "_overlay_1mqof_1",
	fadeIn: "_fadeIn_1mqof_1",
	fadeOut: "_fadeOut_1mqof_1",
	content: "_content_1mqof_18",
	modalShow: "_modalShow_1mqof_1",
	modalHide: "_modalHide_1mqof_1",
	closeButton: "_closeButton_1mqof_47",
	header: "_header_1mqof_73",
	footer: "_footer_1mqof_80",
	title: "_title_1mqof_90",
	description: "_description_1mqof_98",
	srOnly: "_srOnly_1mqof_162"
}, ky = by, Ay = xy, jy = Sy, My = Dy, Ny = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p(Cy, {
	ref: n,
	className: x(Oy.overlay, e),
	...t
}));
Ny.displayName = Cy.displayName;
var Py = e.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ m(jy, { children: [/* @__PURE__ */ p(Ny, {}), /* @__PURE__ */ m(wy, {
	ref: r,
	className: x(Oy.content, e),
	...n,
	children: [t, /* @__PURE__ */ m(Dy, {
		className: Oy.closeButton,
		children: [/* @__PURE__ */ p(pe, { size: 16 }), /* @__PURE__ */ p("span", {
			className: Oy.srOnly,
			children: "Fechar janela"
		})]
	})]
})] }));
Py.displayName = wy.displayName;
var Fy = ({ className: e, ...t }) => /* @__PURE__ */ p("div", {
	className: x(Oy.header, e),
	...t
});
Fy.displayName = "ModalHeader";
var Iy = ({ className: e, ...t }) => /* @__PURE__ */ p("div", {
	className: x(Oy.footer, e),
	...t
});
Iy.displayName = "ModalFooter";
var Ly = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p(Ty, {
	ref: n,
	className: x(Oy.title, e),
	...t
}));
Ly.displayName = Ty.displayName;
var Ry = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p(Ey, {
	ref: n,
	className: x(Oy.description, e),
	...t
}));
Ry.displayName = Ey.displayName;
var zy = {
	overlay: "_overlay_187gf_71",
	overlayShow: "_overlayShow_187gf_1",
	overlayHide: "_overlayHide_187gf_1",
	content: "_content_187gf_90",
	right: "_right_187gf_107",
	slideInRight: "_slideInRight_187gf_1",
	slideOutRight: "_slideOutRight_187gf_1",
	left: "_left_187gf_121",
	slideInLeft: "_slideInLeft_187gf_1",
	slideOutLeft: "_slideOutLeft_187gf_1",
	closeButton: "_closeButton_187gf_137",
	header: "_header_187gf_169",
	body: "_body_187gf_178",
	footer: "_footer_187gf_207",
	title: "_title_187gf_220",
	description: "_description_187gf_231",
	separator: "_separator_187gf_242",
	srOnly: "_srOnly_187gf_251"
}, By = by, Vy = xy, Hy = Sy, Uy = Dy, Wy = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p(Cy, {
	ref: n,
	className: x(zy.overlay, e),
	...t
}));
Wy.displayName = "DrawerOverlay";
var Gy = e.forwardRef(({ className: e, children: t, side: n = "right", ...r }, i) => /* @__PURE__ */ m(Hy, { children: [/* @__PURE__ */ p(Wy, {}), /* @__PURE__ */ m(wy, {
	ref: i,
	className: x(zy.content, n === "left" ? zy.left : zy.right, e),
	...r,
	children: [t, /* @__PURE__ */ m(Dy, {
		className: zy.closeButton,
		children: [/* @__PURE__ */ p(pe, { size: 18 }), /* @__PURE__ */ p("span", {
			className: zy.srOnly,
			children: "Fechar"
		})]
	})]
})] }));
Gy.displayName = "DrawerContent";
var Ky = ({ className: e, ...t }) => /* @__PURE__ */ p("div", {
	className: x(zy.header, e),
	...t
});
Ky.displayName = "DrawerHeader";
var qy = ({ className: e, ...t }) => /* @__PURE__ */ p("div", {
	className: x(zy.body, e),
	...t
});
qy.displayName = "DrawerBody";
var Jy = ({ className: e, ...t }) => /* @__PURE__ */ p("div", {
	className: x(zy.footer, e),
	...t
});
Jy.displayName = "DrawerFooter";
var Yy = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p(Ty, {
	ref: n,
	className: x(zy.title, e),
	...t
}));
Yy.displayName = "DrawerTitle";
var Xy = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p(Ey, {
	ref: n,
	className: x(zy.description, e),
	...t
}));
Xy.displayName = "DrawerDescription";
var Zy = ({ className: e }) => /* @__PURE__ */ p("div", { className: x(zy.separator, e) });
Zy.displayName = "DrawerSeparator";
var Qy = {
	card: "_card_bwezl_1",
	header: "_header_bwezl_11",
	title: "_title_bwezl_18",
	description: "_description_bwezl_26",
	content: "_content_bwezl_32",
	footer: "_footer_bwezl_41"
}, $y = i(({ className: e, ...t }, n) => /* @__PURE__ */ p("div", {
	ref: n,
	className: x(Qy.card, e),
	...t
}));
$y.displayName = "Card";
var eb = i(({ className: e, ...t }, n) => /* @__PURE__ */ p("div", {
	ref: n,
	className: x(Qy.header, e),
	...t
}));
eb.displayName = "CardHeader";
var tb = i(({ className: e, ...t }, n) => /* @__PURE__ */ p("h3", {
	ref: n,
	className: x(Qy.title, e),
	...t
}));
tb.displayName = "CardTitle";
var nb = i(({ className: e, ...t }, n) => /* @__PURE__ */ p("p", {
	ref: n,
	className: x(Qy.description, e),
	...t
}));
nb.displayName = "CardDescription";
var rb = i(({ className: e, ...t }, n) => /* @__PURE__ */ p("div", {
	ref: n,
	className: x(Qy.content, e),
	...t
}));
rb.displayName = "CardContent";
var ib = i(({ className: e, ...t }, n) => /* @__PURE__ */ p("div", {
	ref: n,
	className: x(Qy.footer, e),
	...t
}));
ib.displayName = "CardFooter";
var $ = {
	overlay: "_overlay_nd4k3_2",
	sidebar: "_sidebar_nd4k3_12",
	expanded: "_expanded_nd4k3_27",
	collapsed: "_collapsed_nd4k3_31",
	header: "_header_nd4k3_36",
	logoContainer: "_logoContainer_nd4k3_56",
	toggleButton: "_toggleButton_nd4k3_71",
	nav: "_nav_nd4k3_89",
	item: "_item_nd4k3_100",
	itemActive: "_itemActive_nd4k3_121",
	itemCollapsed: "_itemCollapsed_nd4k3_126",
	itemExpanded: "_itemExpanded_nd4k3_131",
	itemLabel: "_itemLabel_nd4k3_136",
	labelHidden: "_labelHidden_nd4k3_143",
	footer: "_footer_nd4k3_150",
	footerCollapsed: "_footerCollapsed_nd4k3_157",
	userMenu: "_userMenu_nd4k3_164",
	userMenuCollapsed: "_userMenuCollapsed_nd4k3_177",
	userMenuLogout: "_userMenuLogout_nd4k3_184",
	userProfileButton: "_userProfileButton_nd4k3_206",
	userButtonCollapsed: "_userButtonCollapsed_nd4k3_224",
	userInfo: "_userInfo_nd4k3_229",
	userText: "_userText_nd4k3_237",
	userMenuIcon: "_userMenuIcon_nd4k3_246",
	mobileOpen: "_mobileOpen_nd4k3_258",
	logoPlaceholder: "_logoPlaceholder_nd4k3_271",
	logoPulse: "_logoPulse_nd4k3_1"
}, ab = n({ isCollapsed: !1 });
function ob({ icon: e, label: t, active: n, className: r, ...i }) {
	let { isCollapsed: a } = o(ab);
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
function sb({ isCollapsed: e, onToggle: t, isOpenMobile: n, onCloseMobile: r, logo: i, children: a, userName: o = "Usuário", userRole: c = "Colaborador", userAvatarUrl: l, onLogout: h, className: g, ..._ }) {
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
					children: p(e ? re : ne, { size: 20 })
				})]
			}),
			/* @__PURE__ */ p(ab.Provider, {
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
						children: [/* @__PURE__ */ p(de, { size: 16 }), "Sair do Sistema"]
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
					}), /* @__PURE__ */ p(ce, {
						size: 16,
						className: $.userMenuIcon
					})] })]
				})]
			})
		]
	})] });
}
var cb = {
	header: "_header_wb10g_1",
	buttonGroup: "_buttonGroup_wb10g_22",
	contextArea: "_contextArea_wb10g_27",
	mobileOnly: "_mobileOnly_wb10g_38",
	desktopOnly: "_desktopOnly_wb10g_42"
};
//#endregion
//#region src/components/TopBar/index.tsx
function lb({ onToggleMobile: e, className: t, children: n, ...r }) {
	return /* @__PURE__ */ m("header", {
		className: x(cb.header, t),
		...r,
		children: [/* @__PURE__ */ p("div", {
			className: cb.buttonGroup,
			children: /* @__PURE__ */ p(be, {
				variant: "ghost",
				intent: "secundaria",
				className: x(cb.mobileOnly),
				onClick: e,
				"aria-label": "Abrir menu",
				children: /* @__PURE__ */ p(fe, { size: 20 })
			})
		}), /* @__PURE__ */ p("div", {
			className: cb.contextArea,
			children: n
		})]
	});
}
//#endregion
export { M as Avatar, A as Badge, be as Button, m_ as Calendar, $y as Card, rb as CardContent, nb as CardDescription, ib as CardFooter, eb as CardHeader, tb as CardTitle, Te as Checkbox, cr as Combobox, bf as DataTable, h_ as DatePicker, By as Drawer, qy as DrawerBody, Uy as DrawerClose, Gy as DrawerContent, Xy as DrawerDescription, Jy as DrawerFooter, Ky as DrawerHeader, Wy as DrawerOverlay, Hy as DrawerPortal, Zy as DrawerSeparator, Yy as DrawerTitle, Vy as DrawerTrigger, af as DropdownMenu, hf as DropdownMenuCheckboxItem, pf as DropdownMenuContent, sf as DropdownMenuGroup, mf as DropdownMenuItem, _f as DropdownMenuLabel, cf as DropdownMenuPortal, uf as DropdownMenuRadioGroup, gf as DropdownMenuRadioItem, vf as DropdownMenuSeparator, yf as DropdownMenuShortcut, lf as DropdownMenuSub, ff as DropdownMenuSubContent, df as DropdownMenuSubTrigger, of as DropdownMenuTrigger, ur as FileUpload, Sl as HierarchicalCombobox, ky as Modal, My as ModalClose, Py as ModalContent, Ry as ModalDescription, Iy as ModalFooter, Fy as ModalHeader, Ny as ModalOverlay, jy as ModalPortal, Ly as ModalTitle, Ay as ModalTrigger, or as MultiSelect, d_ as Popover, p_ as PopoverContent, f_ as PopoverTrigger, Qt as RadioGroup, $t as RadioItem, __ as Select, sb as SideBar, ob as SideBarItem, _e as Skeleton, Un as Slider, ge as Spinner, ir as Switch, wl as TagInput, Ce as TextField, zv as Toaster, iv as Tooltip, ov as TooltipContent, rv as TooltipProvider, av as TooltipTrigger, lb as TopBar, D as Typography, k as badgeVariants, ye as buttonVariants, x as cn, Se as inputVariants, Sv as toast, E as typographyVariants };
