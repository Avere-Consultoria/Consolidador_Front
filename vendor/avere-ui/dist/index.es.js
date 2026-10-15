import * as e from "react";
import t, { Fragment as n, createContext as r, createElement as i, forwardRef as a, useCallback as o, useContext as s, useDebugValue as c, useEffect as l, useLayoutEffect as u, useMemo as d, useRef as f, useState as p, useSyncExternalStore as m } from "react";
import { Fragment as h, jsx as g, jsxs as _ } from "react/jsx-runtime";
import * as v from "react-dom";
import y, { createPortal as b } from "react-dom";
//#region \0rolldown/runtime.js
var x = Object.defineProperty, S = (e, t) => {
	let n = {};
	for (var r in e) x(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || x(n, Symbol.toStringTag, { value: "Module" }), n;
};
//#endregion
//#region node_modules/clsx/dist/clsx.mjs
function C(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var i = e.length;
		for (t = 0; t < i; t++) e[t] && (n = C(e[t])) && (r && (r += " "), r += n);
	} else for (n in e) e[n] && (r && (r += " "), r += n);
	return r;
}
function w() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = C(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region src/utils/cn.ts
function T(...e) {
	return w(e);
}
//#endregion
//#region node_modules/class-variance-authority/dist/index.mjs
var E = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, D = w, O = (e, t) => (n) => {
	if (t?.variants == null) return D(e, n?.class, n?.className);
	let { variants: r, defaultVariants: i } = t, a = Object.keys(r).map((e) => {
		let t = n?.[e], a = i?.[e];
		if (t === null) return null;
		let o = E(t) || E(a);
		return r[e][o];
	}), o = n && Object.entries(n).reduce((e, t) => {
		let [n, r] = t;
		return r === void 0 || (e[n] = r), e;
	}, {});
	return D(e, a, t?.compoundVariants?.reduce((e, t) => {
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
}, k = {
	base: "_base_7jhg3_1",
	h1: "_h1_7jhg3_13",
	h2: "_h2_7jhg3_22",
	h3: "_h3_7jhg3_35",
	h4: "_h4_7jhg3_48",
	p: "_p_7jhg3_60"
}, A = "data-avere-ui";
function j(e) {
	return { [A]: e };
}
//#endregion
//#region src/components/Typography/index.tsx
var M = O(k.base, {
	variants: { variant: {
		h1: k.h1,
		h2: k.h2,
		h3: k.h3,
		h4: k.h4,
		p: k.p
	} },
	defaultVariants: { variant: "p" }
}), N = a(({ className: e, variant: t, as: n, ...r }, i) => /* @__PURE__ */ g(n || t || "p", {
	...j("Typography"),
	ref: i,
	className: T(M({
		variant: t,
		className: e
	})),
	...r
}));
N.displayName = "Typography";
var P = {
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
}, F = O(P.base, {
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
			className: P.primaria_solid
		},
		{
			intent: "primaria",
			variant: "outline",
			className: P.primaria_outline
		},
		{
			intent: "primaria",
			variant: "ghost",
			className: P.primaria_ghost
		},
		{
			intent: "secundaria",
			variant: "solid",
			className: P.secundaria_solid
		},
		{
			intent: "secundaria",
			variant: "outline",
			className: P.secundaria_outline
		},
		{
			intent: "secundaria",
			variant: "ghost",
			className: P.secundaria_ghost
		},
		{
			intent: "alerta",
			variant: "solid",
			className: P.alerta_solid
		},
		{
			intent: "alerta",
			variant: "outline",
			className: P.alerta_outline
		},
		{
			intent: "alerta",
			variant: "ghost",
			className: P.alerta_ghost
		},
		{
			intent: "erro",
			variant: "solid",
			className: P.erro_solid
		},
		{
			intent: "erro",
			variant: "outline",
			className: P.erro_outline
		},
		{
			intent: "erro",
			variant: "ghost",
			className: P.erro_ghost
		},
		{
			intent: "neutro",
			variant: "solid",
			className: P.neutro_solid
		},
		{
			intent: "neutro",
			variant: "outline",
			className: P.neutro_outline
		},
		{
			intent: "neutro",
			variant: "ghost",
			className: P.neutro_ghost
		}
	],
	defaultVariants: {
		intent: "primaria",
		variant: "solid"
	}
}), I = a(({ className: e, intent: t, variant: n, ...r }, i) => /* @__PURE__ */ g("div", {
	...j("Badge"),
	ref: i,
	className: T(F({
		intent: t,
		variant: n
	}), e),
	...r
}));
I.displayName = "Badge";
var L = {
	container: "_container_3u6a6_1",
	sm: "_sm_3u6a6_35",
	md: "_md_3u6a6_47",
	lg: "_lg_3u6a6_59",
	image: "_image_3u6a6_71",
	initials: "_initials_3u6a6_85"
}, ee = a(({ className: e, src: t, alt: n, initials: r, size: i = "md", ...a }, o) => {
	let [s, c] = p(!1), l = !t || s;
	return /* @__PURE__ */ g("div", {
		...j("Avatar"),
		ref: o,
		className: T(L.container, L[i], e),
		...a,
		children: l ? /* @__PURE__ */ g("span", {
			className: L.initials,
			children: r?.substring(0, 2)
		}) : /* @__PURE__ */ g("img", {
			src: t,
			alt: n || "Avatar",
			className: L.image,
			onError: () => c(!0)
		})
	});
});
ee.displayName = "Avatar";
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils.js
var R = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), te = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), ne = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, re = a(({ color: e = "currentColor", size: t = 24, strokeWidth: n = 2, absoluteStrokeWidth: r, className: a = "", children: o, iconNode: s, ...c }, l) => i("svg", {
	ref: l,
	...ne,
	width: t,
	height: t,
	stroke: e,
	strokeWidth: r ? Number(n) * 24 / Number(t) : n,
	className: te("lucide", a),
	...c
}, [...s.map(([e, t]) => i(e, t)), ...Array.isArray(o) ? o : [o]])), z = (e, t) => {
	let n = a(({ className: n, ...r }, a) => i(re, {
		ref: a,
		iconNode: t,
		className: te(`lucide-${R(e)}`, n),
		...r
	}));
	return n.displayName = `${e}`, n;
}, ie = z("ArrowDown", [["path", {
	d: "M12 5v14",
	key: "s699le"
}], ["path", {
	d: "m19 12-7 7-7-7",
	key: "1idqje"
}]]), B = z("ArrowUpDown", [
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
]), ae = z("ArrowUpRight", [["path", {
	d: "M7 7h10v10",
	key: "1tivn9"
}], ["path", {
	d: "M7 17 17 7",
	key: "1vkiza"
}]]), oe = z("ArrowUp", [["path", {
	d: "m5 12 7-7 7 7",
	key: "hav0vg"
}], ["path", {
	d: "M12 19V5",
	key: "x0mq9r"
}]]), se = z("BellRing", [
	["path", {
		d: "M10.268 21a2 2 0 0 0 3.464 0",
		key: "vwvbt9"
	}],
	["path", {
		d: "M22 8c0-2.3-.8-4.3-2-6",
		key: "5bb3ad"
	}],
	["path", {
		d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
		key: "11g9vi"
	}],
	["path", {
		d: "M4 2C2.8 3.7 2 5.7 2 8",
		key: "tap9e0"
	}]
]), ce = z("Bell", [["path", {
	d: "M10.268 21a2 2 0 0 0 3.464 0",
	key: "vwvbt9"
}], ["path", {
	d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
	key: "11g9vi"
}]]), le = z("BookOpenText", [
	["path", {
		d: "M12 7v14",
		key: "1akyts"
	}],
	["path", {
		d: "M16 12h2",
		key: "7q9ll5"
	}],
	["path", {
		d: "M16 8h2",
		key: "msurwy"
	}],
	["path", {
		d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
		key: "ruj8y"
	}],
	["path", {
		d: "M6 12h2",
		key: "32wvfc"
	}],
	["path", {
		d: "M6 8h2",
		key: "30oboj"
	}]
]), ue = z("Bug", [
	["path", {
		d: "m8 2 1.88 1.88",
		key: "fmnt4t"
	}],
	["path", {
		d: "M14.12 3.88 16 2",
		key: "qol33r"
	}],
	["path", {
		d: "M9 7.13v-1a3.003 3.003 0 1 1 6 0v1",
		key: "d7y7pr"
	}],
	["path", {
		d: "M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6",
		key: "xs1cw7"
	}],
	["path", {
		d: "M12 20v-9",
		key: "1qisl0"
	}],
	["path", {
		d: "M6.53 9C4.6 8.8 3 7.1 3 5",
		key: "32zzws"
	}],
	["path", {
		d: "M6 13H2",
		key: "82j7cp"
	}],
	["path", {
		d: "M3 21c0-2.1 1.7-3.9 3.8-4",
		key: "4p0ekp"
	}],
	["path", {
		d: "M20.97 5c0 2.1-1.6 3.8-3.5 4",
		key: "18gb23"
	}],
	["path", {
		d: "M22 13h-4",
		key: "1jl80f"
	}],
	["path", {
		d: "M17.2 17c2.1.1 3.8 1.9 3.8 4",
		key: "k3fwyw"
	}]
]), de = z("CalendarCheck", [
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
	}],
	["path", {
		d: "m9 16 2 2 4-4",
		key: "19s6y9"
	}]
]), fe = z("Calendar", [
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
]), pe = z("ChartPie", [["path", {
	d: "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",
	key: "pzmjnu"
}], ["path", {
	d: "M21.21 15.89A10 10 0 1 1 8 2.83",
	key: "k2fpak"
}]]), me = z("Check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]), he = z("ChevronDown", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]), ge = z("ChevronLeft", [["path", {
	d: "m15 18-6-6 6-6",
	key: "1wnfg3"
}]]), _e = z("ChevronRight", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]), ve = z("ChevronsUpDown", [["path", {
	d: "m7 15 5 5 5-5",
	key: "1hf1tw"
}], ["path", {
	d: "m7 9 5-5 5 5",
	key: "sgt6xg"
}]]), ye = z("CircleCheck", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), be = z("Circle", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}]]), xe = z("Clock", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["polyline", {
	points: "12 6 12 12 16 14",
	key: "68esgv"
}]]), Se = z("CloudUpload", [
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
]), Ce = z("Copy", [["rect", {
	width: "14",
	height: "14",
	x: "8",
	y: "8",
	rx: "2",
	ry: "2",
	key: "17jyea"
}], ["path", {
	d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
	key: "zix9uf"
}]]), we = z("Crosshair", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["line", {
		x1: "22",
		x2: "18",
		y1: "12",
		y2: "12",
		key: "l9bcsi"
	}],
	["line", {
		x1: "6",
		x2: "2",
		y1: "12",
		y2: "12",
		key: "13hhkx"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "6",
		y2: "2",
		key: "10w3f3"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "22",
		y2: "18",
		key: "15g9kq"
	}]
]), Te = z("Database", [
	["ellipse", {
		cx: "12",
		cy: "5",
		rx: "9",
		ry: "3",
		key: "msslwz"
	}],
	["path", {
		d: "M3 5V19A9 3 0 0 0 21 19V5",
		key: "1wlel7"
	}],
	["path", {
		d: "M3 12A9 3 0 0 0 21 12",
		key: "mv7ke4"
	}]
]), Ee = z("Ellipsis", [
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
]), De = z("EyeOff", [
	["path", {
		d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
		key: "ct8e1f"
	}],
	["path", {
		d: "M14.084 14.158a3 3 0 0 1-4.242-4.242",
		key: "151rxh"
	}],
	["path", {
		d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
		key: "13bj9a"
	}],
	["path", {
		d: "m2 2 20 20",
		key: "1ooewy"
	}]
]), Oe = z("File", [["path", {
	d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
	key: "1rqfz7"
}], ["path", {
	d: "M14 2v4a2 2 0 0 0 2 2h4",
	key: "tnqrlb"
}]]), ke = z("Hash", [
	["line", {
		x1: "4",
		x2: "20",
		y1: "9",
		y2: "9",
		key: "4lhtct"
	}],
	["line", {
		x1: "4",
		x2: "20",
		y1: "15",
		y2: "15",
		key: "vyu0kd"
	}],
	["line", {
		x1: "10",
		x2: "8",
		y1: "3",
		y2: "21",
		key: "1ggp8o"
	}],
	["line", {
		x1: "16",
		x2: "14",
		y1: "3",
		y2: "21",
		key: "weycgp"
	}]
]), Ae = z("Landmark", [
	["line", {
		x1: "3",
		x2: "21",
		y1: "22",
		y2: "22",
		key: "j8o0r"
	}],
	["line", {
		x1: "6",
		x2: "6",
		y1: "18",
		y2: "11",
		key: "10tf0k"
	}],
	["line", {
		x1: "10",
		x2: "10",
		y1: "18",
		y2: "11",
		key: "54lgf6"
	}],
	["line", {
		x1: "14",
		x2: "14",
		y1: "18",
		y2: "11",
		key: "380y"
	}],
	["line", {
		x1: "18",
		x2: "18",
		y1: "18",
		y2: "11",
		key: "1kevvc"
	}],
	["polygon", {
		points: "12 2 20 7 4 7",
		key: "jkujk7"
	}]
]), je = z("LayoutDashboard", [
	["rect", {
		width: "7",
		height: "9",
		x: "3",
		y: "3",
		rx: "1",
		key: "10lvy0"
	}],
	["rect", {
		width: "7",
		height: "5",
		x: "14",
		y: "3",
		rx: "1",
		key: "16une8"
	}],
	["rect", {
		width: "7",
		height: "9",
		x: "14",
		y: "12",
		rx: "1",
		key: "1hutg5"
	}],
	["rect", {
		width: "7",
		height: "5",
		x: "3",
		y: "16",
		rx: "1",
		key: "ldoo1y"
	}]
]), Me = z("ListTodo", [
	["rect", {
		x: "3",
		y: "5",
		width: "6",
		height: "6",
		rx: "1",
		key: "1defrl"
	}],
	["path", {
		d: "m3 17 2 2 4-4",
		key: "1jhpwq"
	}],
	["path", {
		d: "M13 6h8",
		key: "15sg57"
	}],
	["path", {
		d: "M13 12h8",
		key: "h98zly"
	}],
	["path", {
		d: "M13 18h8",
		key: "oe0vm4"
	}]
]), Ne = z("LoaderCircle", [["path", {
	d: "M21 12a9 9 0 1 1-6.219-8.56",
	key: "13zald"
}]]), Pe = z("LogOut", [
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
]), Fe = z("Menu", [
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
]), Ie = z("MoveUpRight", [["path", {
	d: "M13 5H19V11",
	key: "1n1gyv"
}], ["path", {
	d: "M19 5L5 19",
	key: "72u4yj"
}]]), Le = z("Pencil", [["path", {
	d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
	key: "1a8usu"
}], ["path", {
	d: "m15 5 4 4",
	key: "1mk7zo"
}]]), Re = z("Plus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "M12 5v14",
	key: "s699le"
}]]), ze = z("Search", [["circle", {
	cx: "11",
	cy: "11",
	r: "8",
	key: "4ej97u"
}], ["path", {
	d: "m21 21-4.3-4.3",
	key: "1qie3q"
}]]), Be = z("Send", [["path", {
	d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
	key: "1ffxy3"
}], ["path", {
	d: "m21.854 2.147-10.94 10.939",
	key: "12cjpa"
}]]), Ve = z("Square", [["rect", {
	width: "18",
	height: "18",
	x: "3",
	y: "3",
	rx: "2",
	key: "afitv7"
}]]), He = z("Table2", [["path", {
	d: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
	key: "gugj83"
}]]), Ue = z("Trash2", [
	["path", {
		d: "M3 6h18",
		key: "d0wm0j"
	}],
	["path", {
		d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",
		key: "4alrt4"
	}],
	["path", {
		d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",
		key: "v07s0e"
	}],
	["line", {
		x1: "10",
		x2: "10",
		y1: "11",
		y2: "17",
		key: "1uufr5"
	}],
	["line", {
		x1: "14",
		x2: "14",
		y1: "11",
		y2: "17",
		key: "xtxkd"
	}]
]), We = z("Undo2", [["path", {
	d: "M9 14 4 9l5-5",
	key: "102s5s"
}], ["path", {
	d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",
	key: "f3b9sd"
}]]), Ge = z("UserCog", [
	["circle", {
		cx: "18",
		cy: "15",
		r: "3",
		key: "gjjjvw"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}],
	["path", {
		d: "M10 15H6a4 4 0 0 0-4 4v2",
		key: "1nfge6"
	}],
	["path", {
		d: "m21.7 16.4-.9-.3",
		key: "12j9ji"
	}],
	["path", {
		d: "m15.2 13.9-.9-.3",
		key: "1fdjdi"
	}],
	["path", {
		d: "m16.6 18.7.3-.9",
		key: "heedtr"
	}],
	["path", {
		d: "m19.1 12.2.3-.9",
		key: "1af3ki"
	}],
	["path", {
		d: "m19.6 18.7-.4-1",
		key: "1x9vze"
	}],
	["path", {
		d: "m16.8 12.3-.4-1",
		key: "vqeiwj"
	}],
	["path", {
		d: "m14.3 16.6 1-.4",
		key: "1qlj63"
	}],
	["path", {
		d: "m20.7 13.8 1-.4",
		key: "1v5t8k"
	}]
]), Ke = z("User", [["path", {
	d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
	key: "975kel"
}], ["circle", {
	cx: "12",
	cy: "7",
	r: "4",
	key: "17ys0d"
}]]), qe = z("Users", [
	["path", {
		d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
		key: "1yyitq"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}],
	["path", {
		d: "M22 21v-2a4 4 0 0 0-3-3.87",
		key: "kshegd"
	}],
	["path", {
		d: "M16 3.13a4 4 0 0 1 0 7.75",
		key: "1da9ce"
	}]
]), Je = z("Wallet", [["path", {
	d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
	key: "18etb6"
}], ["path", {
	d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",
	key: "xoc0q4"
}]]), Ye = z("X", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]), Xe = {
	spinner: "_spinner_x955q_1",
	spin: "_spin_x955q_1",
	sm: "_sm_x955q_11",
	md: "_md_x955q_23",
	lg: "_lg_x955q_35",
	xl: "_xl_x955q_47"
}, Ze = {
	skeleton: "_skeleton_1mj2p_1",
	pulse: "_pulse_1mj2p_1"
}, Qe = e.forwardRef(({ className: e, size: t = "md", ...n }, r) => /* @__PURE__ */ g(Ne, {
	...j("Spinner"),
	ref: r,
	className: T(Xe.spinner, Xe[t], e),
	...n
}));
Qe.displayName = "Spinner";
var $e = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ g("div", {
	...j("Skeleton"),
	ref: n,
	className: T(Ze.skeleton, e),
	...t
}));
$e.displayName = "Skeleton";
var et = {
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
}, tt = O(et.buttonBase, {
	variants: {
		intent: {
			primaria: et.primaria,
			secundaria: et.secundaria,
			alerta: et.alerta,
			erro: et.erro
		},
		variant: {
			solid: "",
			outline: et.outline,
			ghost: et.ghost
		},
		size: {
			sm: et.sm,
			md: et.md,
			lg: et.lg
		}
	},
	defaultVariants: {
		intent: "primaria",
		variant: "solid",
		size: "md"
	}
}), nt = a(({ className: e, intent: t, variant: n, size: r, leftIcon: i, rightIcon: a, children: o, disabled: s, isLoading: c, ...l }, u) => /* @__PURE__ */ _("button", {
	...j("Button"),
	className: w(tt({
		intent: t,
		variant: n,
		size: r
	}), e),
	ref: u,
	disabled: s || c,
	"aria-disabled": s || c,
	...l,
	children: [
		c && /* @__PURE__ */ g(Ne, {
			className: et.animateSpin,
			"aria-hidden": "true"
		}),
		!c && i && /* @__PURE__ */ g(i, { "aria-hidden": "true" }),
		o,
		!c && a && /* @__PURE__ */ g(a, { "aria-hidden": "true" })
	]
}));
nt.displayName = "Button";
var rt = {
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
}, it = O(rt.inputBase, {
	variants: {
		hasError: {
			true: rt.hasError,
			false: ""
		},
		hasIcon: {
			true: rt.withIcon,
			false: ""
		}
	},
	defaultVariants: {
		hasError: !1,
		hasIcon: !1
	}
}), at = a(({ className: e, label: t, error: n, leftIcon: r, id: i, ...a }, o) => {
	let s = i || (t ? `input-${t.replace(/\s+/g, "-").toLowerCase()}` : void 0), c = !!n;
	return /* @__PURE__ */ _("div", {
		...j("TextField"),
		className: T(rt.container, e),
		children: [
			t && /* @__PURE__ */ g("label", {
				htmlFor: s,
				className: rt.label,
				children: t
			}),
			/* @__PURE__ */ _("div", {
				className: rt.relativeWrapper,
				children: [r && /* @__PURE__ */ g(r, {
					className: T(rt.icon, c ? rt.iconError : rt.iconDefault),
					"aria-hidden": "true"
				}), /* @__PURE__ */ g("input", {
					id: s,
					ref: o,
					className: T(it({
						hasError: c,
						hasIcon: !!r
					})),
					"aria-invalid": c ? "true" : "false",
					"aria-describedby": n ? `${s}-error` : void 0,
					...a
				})]
			}),
			n && /* @__PURE__ */ g("span", {
				id: `${s}-error`,
				className: rt.errorMessage,
				children: n
			})
		]
	});
});
at.displayName = "TextField";
var ot = {
	container: "_container_1o5ti_1",
	disabled: "_disabled_1o5ti_23",
	hiddenInput: "_hiddenInput_1o5ti_35",
	visualBox: "_visualBox_1o5ti_61",
	label: "_label_1o5ti_119",
	iconWrapper: "_iconWrapper_1o5ti_137"
}, st = a(({ className: e, label: t, id: n, disabled: r, ...i }, a) => {
	let o = n || (t ? `checkbox-${t.replace(/\s+/g, "-").toLowerCase()}` : void 0);
	return /* @__PURE__ */ _("label", {
		...j("Checkbox"),
		htmlFor: o,
		className: T(ot.container, r && ot.disabled),
		children: [/* @__PURE__ */ _("div", {
			className: ot.iconWrapper,
			children: [/* @__PURE__ */ g("input", {
				type: "checkbox",
				id: o,
				ref: a,
				disabled: r,
				className: ot.hiddenInput,
				...i
			}), /* @__PURE__ */ g("div", {
				className: T(ot.visualBox, e),
				"aria-hidden": "true",
				children: /* @__PURE__ */ g(me, {
					size: 12,
					strokeWidth: 4,
					color: "currentColor"
				})
			})]
		}), t && /* @__PURE__ */ g("span", {
			className: ot.label,
			children: t
		})]
	});
});
st.displayName = "Checkbox", typeof window < "u" && window.document && window.document.createElement;
function V(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
	return function(r) {
		if (e?.(r), n === !1 || !r.defaultPrevented) return t?.(r);
	};
}
//#endregion
//#region node_modules/@radix-ui/react-compose-refs/dist/index.mjs
function ct(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function lt(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = ct(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : ct(e[t], null);
			}
		};
	};
}
function H(...t) {
	return e.useCallback(lt(...t), t);
}
//#endregion
//#region node_modules/@radix-ui/react-context/dist/index.mjs
function ut(t, n) {
	let r = e.createContext(n), i = (t) => {
		let { children: n, ...i } = t, a = e.useMemo(() => i, Object.values(i));
		return /* @__PURE__ */ g(r.Provider, {
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
function dt(t, n = []) {
	let r = [];
	function i(n, i) {
		let a = e.createContext(i), o = r.length;
		r = [...r, i];
		let s = (n) => {
			let { scope: r, children: i, ...s } = n, c = r?.[t]?.[o] || a, l = e.useMemo(() => s, Object.values(s));
			return /* @__PURE__ */ g(c.Provider, {
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
	return a.scopeName = t, [i, ft(a, ...n)];
}
function ft(...t) {
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
function pt(t) {
	let n = /* @__PURE__ */ mt(t), r = e.forwardRef((t, r) => {
		let { children: i, ...a } = t, o = e.Children.toArray(i), s = o.find(_t);
		if (s) {
			let t = s.props.children, i = o.map((n) => n === s ? e.Children.count(t) > 1 ? e.Children.only(null) : e.isValidElement(t) ? t.props.children : null : n);
			return /* @__PURE__ */ g(n, {
				...a,
				ref: r,
				children: e.isValidElement(t) ? e.cloneElement(t, void 0, i) : null
			});
		}
		return /* @__PURE__ */ g(n, {
			...a,
			ref: r,
			children: i
		});
	});
	return r.displayName = `${t}.Slot`, r;
}
/* @__NO_SIDE_EFFECTS__ */
function mt(t) {
	let n = e.forwardRef((t, n) => {
		let { children: r, ...i } = t;
		if (e.isValidElement(r)) {
			let t = yt(r), a = vt(i, r.props);
			return r.type !== e.Fragment && (a.ref = n ? lt(n, t) : t), e.cloneElement(r, a);
		}
		return e.Children.count(r) > 1 ? e.Children.only(null) : null;
	});
	return n.displayName = `${t}.SlotClone`, n;
}
var ht = Symbol("radix.slottable");
/* @__NO_SIDE_EFFECTS__ */
function gt(e) {
	let t = ({ children: e }) => /* @__PURE__ */ g(h, { children: e });
	return t.displayName = `${e}.Slottable`, t.__radixId = ht, t;
}
function _t(t) {
	return e.isValidElement(t) && typeof t.type == "function" && "__radixId" in t.type && t.type.__radixId === ht;
}
function vt(e, t) {
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
function yt(e) {
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
	let r = /* @__PURE__ */ pt(`Primitive.${n}`), i = e.forwardRef((e, t) => {
		let { asChild: i, ...a } = e, o = i ? r : n;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ g(o, {
			...a,
			ref: t
		});
	});
	return i.displayName = `Primitive.${n}`, {
		...t,
		[n]: i
	};
}, {});
function bt(e, t) {
	e && v.flushSync(() => e.dispatchEvent(t));
}
//#endregion
//#region node_modules/@radix-ui/react-collection/dist/index.mjs
function xt(e) {
	let n = e + "CollectionProvider", [r, i] = dt(n), [a, o] = r(n, {
		collectionRef: { current: null },
		itemMap: /* @__PURE__ */ new Map()
	}), s = (e) => {
		let { scope: n, children: r } = e, i = t.useRef(null), o = t.useRef(/* @__PURE__ */ new Map()).current;
		return /* @__PURE__ */ g(a, {
			scope: n,
			itemMap: o,
			collectionRef: i,
			children: r
		});
	};
	s.displayName = n;
	let c = e + "CollectionSlot", l = /* @__PURE__ */ pt(c), u = t.forwardRef((e, t) => {
		let { scope: n, children: r } = e;
		return /* @__PURE__ */ g(l, {
			ref: H(t, o(c, n).collectionRef),
			children: r
		});
	});
	u.displayName = c;
	let d = e + "CollectionItemSlot", f = "data-radix-collection-item", p = /* @__PURE__ */ pt(d), m = t.forwardRef((e, n) => {
		let { scope: r, children: i, ...a } = e, s = t.useRef(null), c = H(n, s), l = o(d, r);
		return t.useEffect(() => (l.itemMap.set(s, {
			ref: s,
			...a
		}), () => void l.itemMap.delete(s))), /* @__PURE__ */ g(p, {
			[f]: "",
			ref: c,
			children: i
		});
	});
	m.displayName = d;
	function h(n) {
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
			ItemSlot: m
		},
		h,
		i
	];
}
//#endregion
//#region node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var St = globalThis?.document ? e.useLayoutEffect : () => {}, Ct = e.useId || (() => void 0), wt = 0;
function Tt(t) {
	let [n, r] = e.useState(Ct());
	return St(() => {
		t || r((e) => e ?? String(wt++));
	}, [t]), t || (n ? `radix-${n}` : "");
}
//#endregion
//#region node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
function Et(t) {
	let n = e.useRef(t);
	return e.useEffect(() => {
		n.current = t;
	}), e.useMemo(() => (...e) => n.current?.(...e), []);
}
//#endregion
//#region node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var Dt = e.useInsertionEffect || St;
function Ot({ prop: t, defaultProp: n, onChange: r = () => {}, caller: i }) {
	let [a, o, s] = kt({
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
			let n = At(e) ? e(t) : e;
			n !== t && s.current?.(n);
		} else o(e);
	}, [
		c,
		t,
		o,
		s
	])];
}
function kt({ defaultProp: t, onChange: n }) {
	let [r, i] = e.useState(t), a = e.useRef(r), o = e.useRef(n);
	return Dt(() => {
		o.current = n;
	}, [n]), e.useEffect(() => {
		a.current !== r && (o.current?.(r), a.current = r);
	}, [r, a]), [
		r,
		i,
		o
	];
}
function At(e) {
	return typeof e == "function";
}
//#endregion
//#region node_modules/@radix-ui/react-direction/dist/index.mjs
var jt = e.createContext(void 0);
function Mt(t) {
	let n = e.useContext(jt);
	return t || n || "ltr";
}
//#endregion
//#region node_modules/@radix-ui/react-roving-focus/dist/index.mjs
var Nt = "rovingFocusGroup.onEntryFocus", Pt = {
	bubbles: !1,
	cancelable: !0
}, Ft = "RovingFocusGroup", [It, Lt, Rt] = xt(Ft), [zt, Bt] = dt(Ft, [Rt]), [Vt, Ht] = zt(Ft), Ut = e.forwardRef((e, t) => /* @__PURE__ */ g(It.Provider, {
	scope: e.__scopeRovingFocusGroup,
	children: /* @__PURE__ */ g(It.Slot, {
		scope: e.__scopeRovingFocusGroup,
		children: /* @__PURE__ */ g(Wt, {
			...e,
			ref: t
		})
	})
}));
Ut.displayName = Ft;
var Wt = e.forwardRef((t, n) => {
	let { __scopeRovingFocusGroup: r, orientation: i, loop: a = !1, dir: o, currentTabStopId: s, defaultCurrentTabStopId: c, onCurrentTabStopIdChange: l, onEntryFocus: u, preventScrollOnEntryFocus: d = !1, ...f } = t, p = e.useRef(null), m = H(n, p), h = Mt(o), [_, v] = Ot({
		prop: s,
		defaultProp: c ?? null,
		onChange: l,
		caller: Ft
	}), [y, b] = e.useState(!1), x = Et(u), S = Lt(r), C = e.useRef(!1), [w, T] = e.useState(0);
	return e.useEffect(() => {
		let e = p.current;
		if (e) return e.addEventListener(Nt, x), () => e.removeEventListener(Nt, x);
	}, [x]), /* @__PURE__ */ g(Vt, {
		scope: r,
		orientation: i,
		dir: h,
		loop: a,
		currentTabStopId: _,
		onItemFocus: e.useCallback((e) => v(e), [v]),
		onItemShiftTab: e.useCallback(() => b(!0), []),
		onFocusableItemAdd: e.useCallback(() => T((e) => e + 1), []),
		onFocusableItemRemove: e.useCallback(() => T((e) => e - 1), []),
		children: /* @__PURE__ */ g(U.div, {
			tabIndex: y || w === 0 ? -1 : 0,
			"data-orientation": i,
			...f,
			ref: m,
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
					let t = new CustomEvent(Nt, Pt);
					if (e.currentTarget.dispatchEvent(t), !t.defaultPrevented) {
						let e = S().filter((e) => e.focusable);
						Xt([
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
}), Gt = "RovingFocusGroupItem", Kt = e.forwardRef((t, n) => {
	let { __scopeRovingFocusGroup: r, focusable: i = !0, active: a = !1, tabStopId: o, children: s, ...c } = t, l = Tt(), u = o || l, d = Ht(Gt, r), f = d.currentTabStopId === u, p = Lt(r), { onFocusableItemAdd: m, onFocusableItemRemove: h, currentTabStopId: _ } = d;
	return e.useEffect(() => {
		if (i) return m(), () => h();
	}, [
		i,
		m,
		h
	]), /* @__PURE__ */ g(It.ItemSlot, {
		scope: r,
		id: u,
		focusable: i,
		active: a,
		children: /* @__PURE__ */ g(U.span, {
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
				let t = Yt(e, d.orientation, d.dir);
				if (t !== void 0) {
					if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
					e.preventDefault();
					let n = p().filter((e) => e.focusable).map((e) => e.ref.current);
					if (t === "last") n.reverse();
					else if (t === "prev" || t === "next") {
						t === "prev" && n.reverse();
						let r = n.indexOf(e.currentTarget);
						n = d.loop ? Zt(n, r + 1) : n.slice(r + 1);
					}
					setTimeout(() => Xt(n));
				}
			}),
			children: typeof s == "function" ? s({
				isCurrentTabStop: f,
				hasTabStop: _ != null
			}) : s
		})
	});
});
Kt.displayName = Gt;
var qt = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function Jt(e, t) {
	return t === "rtl" ? e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e : e;
}
function Yt(e, t, n) {
	let r = Jt(e.key, n);
	if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r))) return qt[r];
}
function Xt(e, t = !1) {
	let n = document.activeElement;
	for (let r of e) if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function Zt(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
var Qt = Ut, $t = Kt;
//#endregion
//#region node_modules/@radix-ui/react-use-size/dist/index.mjs
function en(t) {
	let [n, r] = e.useState(void 0);
	return St(() => {
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
function tn(t) {
	let n = e.useRef({
		value: t,
		previous: t
	});
	return e.useMemo(() => (n.current.value !== t && (n.current.previous = n.current.value, n.current.value = t), n.current.previous), [t]);
}
//#endregion
//#region node_modules/@radix-ui/react-presence/dist/index.mjs
function nn(t, n) {
	return e.useReducer((e, t) => n[e][t] ?? e, t);
}
var rn = (t) => {
	let { present: n, children: r } = t, i = an(n), a = typeof r == "function" ? r({ present: i.isPresent }) : e.Children.only(r), o = H(i.ref, sn(a));
	return typeof r == "function" || i.isPresent ? e.cloneElement(a, { ref: o }) : null;
};
rn.displayName = "Presence";
function an(t) {
	let [n, r] = e.useState(), i = e.useRef(null), a = e.useRef(t), o = e.useRef("none"), [s, c] = nn(t ? "mounted" : "unmounted", {
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
		let e = on(i.current);
		o.current = s === "mounted" ? e : "none";
	}, [s]), St(() => {
		let e = i.current, n = a.current;
		if (n !== t) {
			let r = o.current, i = on(e);
			t ? c("MOUNT") : i === "none" || e?.display === "none" ? c("UNMOUNT") : c(n && r !== i ? "ANIMATION_OUT" : "UNMOUNT"), a.current = t;
		}
	}, [t, c]), St(() => {
		if (n) {
			let e, t = n.ownerDocument.defaultView ?? window, r = (r) => {
				let o = on(i.current).includes(CSS.escape(r.animationName));
				if (r.target === n && o && (c("ANIMATION_END"), !a.current)) {
					let r = n.style.animationFillMode;
					n.style.animationFillMode = "forwards", e = t.setTimeout(() => {
						n.style.animationFillMode === "forwards" && (n.style.animationFillMode = r);
					});
				}
			}, s = (e) => {
				e.target === n && (o.current = on(i.current));
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
function on(e) {
	return e?.animationName || "none";
}
function sn(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-radio-group/dist/index.mjs
var cn = "Radio", [ln, un] = dt(cn), [dn, fn] = ln(cn), pn = e.forwardRef((t, n) => {
	let { __scopeRadio: r, name: i, checked: a = !1, required: o, disabled: s, value: c = "on", onCheck: l, form: u, ...d } = t, [f, p] = e.useState(null), m = H(n, (e) => p(e)), h = e.useRef(!1), v = f ? u || !!f.closest("form") : !0;
	return /* @__PURE__ */ _(dn, {
		scope: r,
		checked: a,
		disabled: s,
		children: [/* @__PURE__ */ g(U.button, {
			type: "button",
			role: "radio",
			"aria-checked": a,
			"data-state": vn(a),
			"data-disabled": s ? "" : void 0,
			disabled: s,
			value: c,
			...d,
			ref: m,
			onClick: V(t.onClick, (e) => {
				a || l?.(), v && (h.current = e.isPropagationStopped(), h.current || e.stopPropagation());
			})
		}), v && /* @__PURE__ */ g(_n, {
			control: f,
			bubbles: !h.current,
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
pn.displayName = cn;
var mn = "RadioIndicator", hn = e.forwardRef((e, t) => {
	let { __scopeRadio: n, forceMount: r, ...i } = e, a = fn(mn, n);
	return /* @__PURE__ */ g(rn, {
		present: r || a.checked,
		children: /* @__PURE__ */ g(U.span, {
			"data-state": vn(a.checked),
			"data-disabled": a.disabled ? "" : void 0,
			...i,
			ref: t
		})
	});
});
hn.displayName = mn;
var gn = "RadioBubbleInput", _n = e.forwardRef(({ __scopeRadio: t, control: n, checked: r, bubbles: i = !0, ...a }, o) => {
	let s = e.useRef(null), c = H(s, o), l = tn(r), u = en(n);
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
	]), /* @__PURE__ */ g(U.input, {
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
_n.displayName = gn;
function vn(e) {
	return e ? "checked" : "unchecked";
}
var yn = [
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight"
], bn = "RadioGroup", [xn, Sn] = dt(bn, [Bt, un]), Cn = Bt(), wn = un(), [Tn, En] = xn(bn), Dn = e.forwardRef((e, t) => {
	let { __scopeRadioGroup: n, name: r, defaultValue: i, value: a, required: o = !1, disabled: s = !1, orientation: c, dir: l, loop: u = !0, onValueChange: d, ...f } = e, p = Cn(n), m = Mt(l), [h, _] = Ot({
		prop: a,
		defaultProp: i ?? null,
		onChange: d,
		caller: bn
	});
	return /* @__PURE__ */ g(Tn, {
		scope: n,
		name: r,
		required: o,
		disabled: s,
		value: h,
		onValueChange: _,
		children: /* @__PURE__ */ g(Qt, {
			asChild: !0,
			...p,
			orientation: c,
			dir: m,
			loop: u,
			children: /* @__PURE__ */ g(U.div, {
				role: "radiogroup",
				"aria-required": o,
				"aria-orientation": c,
				"data-disabled": s ? "" : void 0,
				dir: m,
				...f,
				ref: t
			})
		})
	});
});
Dn.displayName = bn;
var On = "RadioGroupItem", kn = e.forwardRef((t, n) => {
	let { __scopeRadioGroup: r, disabled: i, ...a } = t, o = En(On, r), s = o.disabled || i, c = Cn(r), l = wn(r), u = e.useRef(null), d = H(n, u), f = o.value === a.value, p = e.useRef(!1);
	return e.useEffect(() => {
		let e = (e) => {
			yn.includes(e.key) && (p.current = !0);
		}, t = () => p.current = !1;
		return document.addEventListener("keydown", e), document.addEventListener("keyup", t), () => {
			document.removeEventListener("keydown", e), document.removeEventListener("keyup", t);
		};
	}, []), /* @__PURE__ */ g($t, {
		asChild: !0,
		...c,
		focusable: !s,
		active: f,
		children: /* @__PURE__ */ g(pn, {
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
				p.current && u.current?.click();
			})
		})
	});
});
kn.displayName = On;
var An = "RadioGroupIndicator", jn = e.forwardRef((e, t) => {
	let { __scopeRadioGroup: n, ...r } = e;
	return /* @__PURE__ */ g(hn, {
		...wn(n),
		...r,
		ref: t
	});
});
jn.displayName = An;
var Mn = Dn, Nn = kn, Pn = jn, Fn = {
	root: "_root_brp5y_1",
	itemWrapper: "_itemWrapper_brp5y_13",
	radioItem: "_radioItem_brp5y_27",
	indicator: "_indicator_brp5y_89",
	icon: "_icon_brp5y_105",
	label: "_label_brp5y_119",
	labelText: "_labelText_brp5y_139",
	labelTextDisabled: "_labelTextDisabled_brp5y_151"
}, In = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ g(Mn, {
	...j("RadioGroup"),
	className: T(Fn.root, e),
	...t,
	ref: n
}));
In.displayName = Mn.displayName;
var Ln = e.forwardRef(({ className: t, label: n, id: r, ...i }, a) => {
	let o = e.useId(), s = r || o;
	return /* @__PURE__ */ _("div", {
		className: Fn.itemWrapper,
		children: [/* @__PURE__ */ g(Nn, {
			ref: a,
			id: s,
			className: T(Fn.radioItem, t),
			...i,
			children: /* @__PURE__ */ g(Pn, {
				className: Fn.indicator,
				children: /* @__PURE__ */ g(be, { className: Fn.icon })
			})
		}), n && /* @__PURE__ */ g("label", {
			htmlFor: s,
			className: Fn.label,
			children: /* @__PURE__ */ g(N, {
				as: "span",
				variant: "p",
				className: T(Fn.labelText, i.disabled && Fn.labelTextDisabled),
				style: { color: "var(--color-secundaria)" },
				children: n
			})
		})]
	});
});
Ln.displayName = "RadioItem";
//#endregion
//#region node_modules/@radix-ui/number/dist/index.mjs
function Rn(e, [t, n]) {
	return Math.min(n, Math.max(t, e));
}
//#endregion
//#region node_modules/@radix-ui/react-slider/dist/index.mjs
var zn = ["PageUp", "PageDown"], Bn = [
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight"
], Vn = {
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
}, Hn = "Slider", [Un, Wn, Gn] = xt(Hn), [Kn, qn] = dt(Hn, [Gn]), [Jn, Yn] = Kn(Hn), Xn = e.forwardRef((t, n) => {
	let { name: r, min: i = 0, max: a = 100, step: o = 1, orientation: s = "horizontal", disabled: c = !1, minStepsBetweenThumbs: l = 0, defaultValue: u = [i], value: d, onValueChange: f = () => {}, onValueCommit: p = () => {}, inverted: m = !1, form: h, ..._ } = t, v = e.useRef(/* @__PURE__ */ new Set()), y = e.useRef(0), b = s === "horizontal" ? $n : er, [x = [], S] = Ot({
		prop: d,
		defaultProp: u,
		onChange: (e) => {
			[...v.current][y.current]?.focus(), f(e);
		}
	}), C = e.useRef(x);
	function w(e) {
		D(e, mr(x, e));
	}
	function T(e) {
		D(e, y.current);
	}
	function E() {
		let e = C.current[y.current];
		x[y.current] !== e && p(x);
	}
	function D(e, t, { commit: n } = { commit: !1 }) {
		let r = yr(o), s = Rn(br(Math.round((e - i) / o) * o + i, r), [i, a]);
		S((e = []) => {
			let r = dr(e, s, t);
			if (_r(r, l * o)) {
				y.current = r.indexOf(s);
				let t = String(r) !== String(e);
				return t && n && p(r), t ? r : e;
			} else return e;
		});
	}
	return /* @__PURE__ */ g(Jn, {
		scope: t.__scopeSlider,
		name: r,
		disabled: c,
		min: i,
		max: a,
		valueIndexToChangeRef: y,
		thumbs: v.current,
		values: x,
		orientation: s,
		form: h,
		children: /* @__PURE__ */ g(Un.Provider, {
			scope: t.__scopeSlider,
			children: /* @__PURE__ */ g(Un.Slot, {
				scope: t.__scopeSlider,
				children: /* @__PURE__ */ g(b, {
					"aria-disabled": c,
					"data-disabled": c ? "" : void 0,
					..._,
					ref: n,
					onPointerDown: V(_.onPointerDown, () => {
						c || (C.current = x);
					}),
					min: i,
					max: a,
					inverted: m,
					onSlideStart: c ? void 0 : w,
					onSlideMove: c ? void 0 : T,
					onSlideEnd: c ? void 0 : E,
					onHomeKeyDown: () => !c && D(i, 0, { commit: !0 }),
					onEndKeyDown: () => !c && D(a, x.length - 1, { commit: !0 }),
					onStepKeyDown: ({ event: e, direction: t }) => {
						if (!c) {
							let n = zn.includes(e.key) || e.shiftKey && Bn.includes(e.key) ? 10 : 1, r = y.current, i = x[r];
							D(i + o * n * t, r, { commit: !0 });
						}
					}
				})
			})
		})
	});
});
Xn.displayName = Hn;
var [Zn, Qn] = Kn(Hn, {
	startEdge: "left",
	endEdge: "right",
	size: "width",
	direction: 1
}), $n = e.forwardRef((t, n) => {
	let { min: r, max: i, dir: a, inverted: o, onSlideStart: s, onSlideMove: c, onSlideEnd: l, onStepKeyDown: u, ...d } = t, [f, p] = e.useState(null), m = H(n, (e) => p(e)), h = e.useRef(void 0), _ = Mt(a), v = _ === "ltr", y = v && !o || !v && o;
	function b(e) {
		let t = h.current || f.getBoundingClientRect(), n = vr([0, t.width], y ? [r, i] : [i, r]);
		return h.current = t, n(e - t.left);
	}
	return /* @__PURE__ */ g(Zn, {
		scope: t.__scopeSlider,
		startEdge: y ? "left" : "right",
		endEdge: y ? "right" : "left",
		direction: y ? 1 : -1,
		size: "width",
		children: /* @__PURE__ */ g(tr, {
			dir: _,
			"data-orientation": "horizontal",
			...d,
			ref: m,
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
				h.current = void 0, l?.();
			},
			onStepKeyDown: (e) => {
				let t = Vn[y ? "from-left" : "from-right"].includes(e.key);
				u?.({
					event: e,
					direction: t ? -1 : 1
				});
			}
		})
	});
}), er = e.forwardRef((t, n) => {
	let { min: r, max: i, inverted: a, onSlideStart: o, onSlideMove: s, onSlideEnd: c, onStepKeyDown: l, ...u } = t, d = e.useRef(null), f = H(n, d), p = e.useRef(void 0), m = !a;
	function h(e) {
		let t = p.current || d.current.getBoundingClientRect(), n = vr([0, t.height], m ? [i, r] : [r, i]);
		return p.current = t, n(e - t.top);
	}
	return /* @__PURE__ */ g(Zn, {
		scope: t.__scopeSlider,
		startEdge: m ? "bottom" : "top",
		endEdge: m ? "top" : "bottom",
		size: "height",
		direction: m ? 1 : -1,
		children: /* @__PURE__ */ g(tr, {
			"data-orientation": "vertical",
			...u,
			ref: f,
			style: {
				...u.style,
				"--radix-slider-thumb-transform": "translateY(50%)"
			},
			onSlideStart: (e) => {
				let t = h(e.clientY);
				o?.(t);
			},
			onSlideMove: (e) => {
				let t = h(e.clientY);
				s?.(t);
			},
			onSlideEnd: () => {
				p.current = void 0, c?.();
			},
			onStepKeyDown: (e) => {
				let t = Vn[m ? "from-bottom" : "from-top"].includes(e.key);
				l?.({
					event: e,
					direction: t ? -1 : 1
				});
			}
		})
	});
}), tr = e.forwardRef((e, t) => {
	let { __scopeSlider: n, onSlideStart: r, onSlideMove: i, onSlideEnd: a, onHomeKeyDown: o, onEndKeyDown: s, onStepKeyDown: c, ...l } = e, u = Yn(Hn, n);
	return /* @__PURE__ */ g(U.span, {
		...l,
		ref: t,
		onKeyDown: V(e.onKeyDown, (e) => {
			e.key === "Home" ? (o(e), e.preventDefault()) : e.key === "End" ? (s(e), e.preventDefault()) : zn.concat(Bn).includes(e.key) && (c(e), e.preventDefault());
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
}), nr = "SliderTrack", rr = e.forwardRef((e, t) => {
	let { __scopeSlider: n, ...r } = e, i = Yn(nr, n);
	return /* @__PURE__ */ g(U.span, {
		"data-disabled": i.disabled ? "" : void 0,
		"data-orientation": i.orientation,
		...r,
		ref: t
	});
});
rr.displayName = nr;
var ir = "SliderRange", ar = e.forwardRef((t, n) => {
	let { __scopeSlider: r, ...i } = t, a = Yn(ir, r), o = Qn(ir, r), s = H(n, e.useRef(null)), c = a.values.length, l = a.values.map((e) => fr(e, a.min, a.max)), u = c > 1 ? Math.min(...l) : 0, d = 100 - Math.max(...l);
	return /* @__PURE__ */ g(U.span, {
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
ar.displayName = ir;
var or = "SliderThumb", sr = e.forwardRef((t, n) => {
	let r = Wn(t.__scopeSlider), [i, a] = e.useState(null), o = H(n, (e) => a(e)), s = e.useMemo(() => i ? r().findIndex((e) => e.ref.current === i) : -1, [r, i]);
	return /* @__PURE__ */ g(cr, {
		...t,
		ref: o,
		index: s
	});
}), cr = e.forwardRef((t, n) => {
	let { __scopeSlider: r, index: i, name: a, ...o } = t, s = Yn(or, r), c = Qn(or, r), [l, u] = e.useState(null), d = H(n, (e) => u(e)), f = l ? s.form || !!l.closest("form") : !0, p = en(l), m = s.values[i], h = m === void 0 ? 0 : fr(m, s.min, s.max), v = pr(i, s.values.length), y = p?.[c.size], b = y ? hr(y, h, c.direction) : 0;
	return e.useEffect(() => {
		if (l) return s.thumbs.add(l), () => {
			s.thumbs.delete(l);
		};
	}, [l, s.thumbs]), /* @__PURE__ */ _("span", {
		style: {
			transform: "var(--radix-slider-thumb-transform)",
			position: "absolute",
			[c.startEdge]: `calc(${h}% + ${b}px)`
		},
		children: [/* @__PURE__ */ g(Un.ItemSlot, {
			scope: t.__scopeSlider,
			children: /* @__PURE__ */ g(U.span, {
				role: "slider",
				"aria-label": t["aria-label"] || v,
				"aria-valuemin": s.min,
				"aria-valuenow": m,
				"aria-valuemax": s.max,
				"aria-orientation": s.orientation,
				"data-orientation": s.orientation,
				"data-disabled": s.disabled ? "" : void 0,
				tabIndex: s.disabled ? void 0 : 0,
				...o,
				ref: d,
				style: m === void 0 ? { display: "none" } : t.style,
				onFocus: V(t.onFocus, () => {
					s.valueIndexToChangeRef.current = i;
				})
			})
		}), f && /* @__PURE__ */ g(ur, {
			name: a ?? (s.name ? s.name + (s.values.length > 1 ? "[]" : "") : void 0),
			form: s.form,
			value: m
		}, i)]
	});
});
sr.displayName = or;
var lr = "RadioBubbleInput", ur = e.forwardRef(({ __scopeSlider: t, value: n, ...r }, i) => {
	let a = e.useRef(null), o = H(a, i), s = tn(n);
	return e.useEffect(() => {
		let e = a.current;
		if (!e) return;
		let t = window.HTMLInputElement.prototype, r = Object.getOwnPropertyDescriptor(t, "value").set;
		if (s !== n && r) {
			let t = new Event("input", { bubbles: !0 });
			r.call(e, n), e.dispatchEvent(t);
		}
	}, [s, n]), /* @__PURE__ */ g(U.input, {
		style: { display: "none" },
		...r,
		ref: o,
		defaultValue: n
	});
});
ur.displayName = lr;
function dr(e = [], t, n) {
	let r = [...e];
	return r[n] = t, r.sort((e, t) => e - t);
}
function fr(e, t, n) {
	return Rn(100 / (n - t) * (e - t), [0, 100]);
}
function pr(e, t) {
	if (t > 2) return `Value ${e + 1} of ${t}`;
	if (t === 2) return ["Minimum", "Maximum"][e];
}
function mr(e, t) {
	if (e.length === 1) return 0;
	let n = e.map((e) => Math.abs(e - t)), r = Math.min(...n);
	return n.indexOf(r);
}
function hr(e, t, n) {
	let r = e / 2;
	return (r - vr([0, 50], [0, r])(t) * n) * n;
}
function gr(e) {
	return e.slice(0, -1).map((t, n) => e[n + 1] - t);
}
function _r(e, t) {
	if (t > 0) {
		let n = gr(e);
		return Math.min(...n) >= t;
	}
	return !0;
}
function vr(e, t) {
	return (n) => {
		if (e[0] === e[1] || t[0] === t[1]) return t[0];
		let r = (t[1] - t[0]) / (e[1] - e[0]);
		return t[0] + r * (n - e[0]);
	};
}
function yr(e) {
	return (String(e).split(".")[1] || "").length;
}
function br(e, t) {
	let n = 10 ** t;
	return Math.round(e * n) / n;
}
var xr = Xn, Sr = rr, Cr = ar, wr = sr, Tr = {
	root: "_root_1vymk_1",
	track: "_track_1vymk_23",
	range: "_range_1vymk_45",
	thumb: "_thumb_1vymk_57"
}, Er = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ _(xr, {
	...j("Slider"),
	ref: n,
	className: T(Tr.root, e),
	...t,
	children: [/* @__PURE__ */ g(Sr, {
		className: Tr.track,
		children: /* @__PURE__ */ g(Cr, { className: Tr.range })
	}), /* @__PURE__ */ g(wr, { className: Tr.thumb })]
}));
Er.displayName = xr.displayName;
//#endregion
//#region node_modules/@radix-ui/react-switch/dist/index.mjs
var Dr = "Switch", [Or, kr] = dt(Dr), [Ar, jr] = Or(Dr), Mr = e.forwardRef((t, n) => {
	let { __scopeSwitch: r, name: i, checked: a, defaultChecked: o, required: s, disabled: c, value: l = "on", onCheckedChange: u, form: d, ...f } = t, [p, m] = e.useState(null), h = H(n, (e) => m(e)), v = e.useRef(!1), y = p ? d || !!p.closest("form") : !0, [b, x] = Ot({
		prop: a,
		defaultProp: o ?? !1,
		onChange: u,
		caller: Dr
	});
	return /* @__PURE__ */ _(Ar, {
		scope: r,
		checked: b,
		disabled: c,
		children: [/* @__PURE__ */ g(U.button, {
			type: "button",
			role: "switch",
			"aria-checked": b,
			"aria-required": s,
			"data-state": Lr(b),
			"data-disabled": c ? "" : void 0,
			disabled: c,
			value: l,
			...f,
			ref: h,
			onClick: V(t.onClick, (e) => {
				x((e) => !e), y && (v.current = e.isPropagationStopped(), v.current || e.stopPropagation());
			})
		}), y && /* @__PURE__ */ g(Ir, {
			control: p,
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
Mr.displayName = Dr;
var Nr = "SwitchThumb", Pr = e.forwardRef((e, t) => {
	let { __scopeSwitch: n, ...r } = e, i = jr(Nr, n);
	return /* @__PURE__ */ g(U.span, {
		"data-state": Lr(i.checked),
		"data-disabled": i.disabled ? "" : void 0,
		...r,
		ref: t
	});
});
Pr.displayName = Nr;
var Fr = "SwitchBubbleInput", Ir = e.forwardRef(({ __scopeSwitch: t, control: n, checked: r, bubbles: i = !0, ...a }, o) => {
	let s = e.useRef(null), c = H(s, o), l = tn(r), u = en(n);
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
	]), /* @__PURE__ */ g("input", {
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
Ir.displayName = Fr;
function Lr(e) {
	return e ? "checked" : "unchecked";
}
var Rr = Mr, zr = Pr, Br = {
	container: "_container_1ba4x_1",
	root: "_root_1ba4x_17",
	thumb: "_thumb_1ba4x_83",
	label: "_label_1ba4x_123",
	labelText: "_labelText_1ba4x_143",
	labelTextDisabled: "_labelTextDisabled_1ba4x_155"
}, Vr = e.forwardRef(({ className: t, label: n, id: r, ...i }, a) => {
	let o = e.useId(), s = r || o;
	return /* @__PURE__ */ _("div", {
		...j("Switch"),
		className: Br.container,
		children: [/* @__PURE__ */ g(Rr, {
			id: s,
			className: T(Br.root, t),
			...i,
			ref: a,
			children: /* @__PURE__ */ g(zr, { className: Br.thumb })
		}), n && /* @__PURE__ */ g("label", {
			htmlFor: s,
			className: Br.label,
			children: /* @__PURE__ */ g(N, {
				as: "span",
				variant: "p",
				className: T(Br.labelText, i.disabled && Br.labelTextDisabled),
				style: { color: "var(--color-secundaria)" },
				children: n
			})
		})]
	});
});
Vr.displayName = "Switch";
var Hr = {
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
}, Ur = a(({ className: e, options: t, value: n, defaultValue: r, onChange: i, label: a, error: o, placeholder: s = "Selecione...", id: c, ...u }, d) => {
	let [m, h] = p(r || []), [v, y] = p(!1), [b, x] = p(""), S = f(null), C = n === void 0 ? m : n, w = !!o, E = c || (a ? `multiselect-${a.replace(/\s+/g, "-").toLowerCase()}` : void 0), D = t.filter((e) => e.label.toLowerCase().includes(b.toLowerCase())), O = (e) => {
		let t;
		t = C.includes(e) ? C.filter((t) => t !== e) : [...C, e], n === void 0 && h(t), i?.(t), x("");
	}, k = (e) => {
		let t = C.filter((t) => t !== e);
		n === void 0 && h(t), i?.(t);
	}, A = (e) => {
		e.key === "Backspace" && b === "" && C.length > 0 && k(C[C.length - 1]), e.key === "Escape" && y(!1);
	};
	l(() => {
		let e = (e) => {
			S.current && !S.current.contains(e.target) && y(!1);
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, []);
	let M = t.filter((e) => C.includes(e.value));
	return /* @__PURE__ */ _("div", {
		...j("MultiSelect"),
		className: T(Hr.container, e),
		ref: S,
		children: [
			a && /* @__PURE__ */ g("label", {
				htmlFor: E,
				className: Hr.label,
				children: a
			}),
			/* @__PURE__ */ _("div", {
				className: T(Hr.trigger, w && Hr.triggerError, v && Hr.triggerOpen),
				onClick: () => y(!0),
				children: [
					M.map((e) => /* @__PURE__ */ _(I, {
						intent: "primaria",
						variant: "ghost",
						children: [e.label, /* @__PURE__ */ g("button", {
							type: "button",
							className: Hr.removeBadgeBtn,
							onClick: (t) => {
								t.stopPropagation(), k(e.value);
							},
							children: /* @__PURE__ */ g(Ye, { size: 12 })
						})]
					}, e.value)),
					/* @__PURE__ */ g("input", {
						id: E,
						ref: d,
						type: "text",
						className: Hr.inputField,
						value: b,
						onChange: (e) => {
							x(e.target.value), y(!0);
						},
						onFocus: () => y(!0),
						onKeyDown: A,
						placeholder: C.length === 0 ? s : "",
						autoComplete: "off",
						...u
					}),
					/* @__PURE__ */ g(he, {
						size: 16,
						className: Hr.chevron
					})
				]
			}),
			v && /* @__PURE__ */ g("div", {
				className: Hr.dropdown,
				children: D.length === 0 ? /* @__PURE__ */ g("div", {
					className: Hr.noOptions,
					children: "Nenhuma opção encontrada"
				}) : D.map((e) => {
					let t = C.includes(e.value);
					return /* @__PURE__ */ _("div", {
						className: T(Hr.option, t && Hr.optionSelected),
						onClick: (t) => {
							t.stopPropagation(), O(e.value), document.getElementById(E || "")?.focus();
						},
						children: [e.label, t && /* @__PURE__ */ g(me, {
							size: 16,
							className: Hr.checkIcon
						})]
					}, e.value);
				})
			}),
			o && /* @__PURE__ */ g("span", {
				className: Hr.errorMessage,
				children: o
			})
		]
	});
});
Ur.displayName = "MultiSelect";
//#endregion
//#region node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs
function Wr(t, n = globalThis?.document) {
	let r = Et(t);
	e.useEffect(() => {
		let e = (e) => {
			e.key === "Escape" && r(e);
		};
		return n.addEventListener("keydown", e, { capture: !0 }), () => n.removeEventListener("keydown", e, { capture: !0 });
	}, [r, n]);
}
//#endregion
//#region node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
var Gr = "DismissableLayer", Kr = "dismissableLayer.update", qr = "dismissableLayer.pointerDownOutside", Jr = "dismissableLayer.focusOutside", Yr, Xr = e.createContext({
	layers: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	branches: /* @__PURE__ */ new Set()
}), Zr = e.forwardRef((t, n) => {
	let { disableOutsidePointerEvents: r = !1, onEscapeKeyDown: i, onPointerDownOutside: a, onFocusOutside: o, onInteractOutside: s, onDismiss: c, ...l } = t, u = e.useContext(Xr), [d, f] = e.useState(null), p = d?.ownerDocument ?? globalThis?.document, [, m] = e.useState({}), h = H(n, (e) => f(e)), _ = Array.from(u.layers), [v] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), y = _.indexOf(v), b = d ? _.indexOf(d) : -1, x = u.layersWithOutsidePointerEventsDisabled.size > 0, S = b >= y, C = ei((e) => {
		let t = e.target, n = [...u.branches].some((e) => e.contains(t));
		!S || n || (a?.(e), s?.(e), e.defaultPrevented || c?.());
	}, p), w = ti((e) => {
		let t = e.target;
		[...u.branches].some((e) => e.contains(t)) || (o?.(e), s?.(e), e.defaultPrevented || c?.());
	}, p);
	return Wr((e) => {
		b === u.layers.size - 1 && (i?.(e), !e.defaultPrevented && c && (e.preventDefault(), c()));
	}, p), e.useEffect(() => {
		if (d) return r && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (Yr = p.body.style.pointerEvents, p.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(d)), u.layers.add(d), ni(), () => {
			r && u.layersWithOutsidePointerEventsDisabled.size === 1 && (p.body.style.pointerEvents = Yr);
		};
	}, [
		d,
		p,
		r,
		u
	]), e.useEffect(() => () => {
		d && (u.layers.delete(d), u.layersWithOutsidePointerEventsDisabled.delete(d), ni());
	}, [d, u]), e.useEffect(() => {
		let e = () => m({});
		return document.addEventListener(Kr, e), () => document.removeEventListener(Kr, e);
	}, []), /* @__PURE__ */ g(U.div, {
		...l,
		ref: h,
		style: {
			pointerEvents: x ? S ? "auto" : "none" : void 0,
			...t.style
		},
		onFocusCapture: V(t.onFocusCapture, w.onFocusCapture),
		onBlurCapture: V(t.onBlurCapture, w.onBlurCapture),
		onPointerDownCapture: V(t.onPointerDownCapture, C.onPointerDownCapture)
	});
});
Zr.displayName = Gr;
var Qr = "DismissableLayerBranch", $r = e.forwardRef((t, n) => {
	let r = e.useContext(Xr), i = e.useRef(null), a = H(n, i);
	return e.useEffect(() => {
		let e = i.current;
		if (e) return r.branches.add(e), () => {
			r.branches.delete(e);
		};
	}, [r.branches]), /* @__PURE__ */ g(U.div, {
		...t,
		ref: a
	});
});
$r.displayName = Qr;
function ei(t, n = globalThis?.document) {
	let r = Et(t), i = e.useRef(!1), a = e.useRef(() => {});
	return e.useEffect(() => {
		let e = (e) => {
			if (e.target && !i.current) {
				let t = function() {
					ri(qr, r, i, { discrete: !0 });
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
function ti(t, n = globalThis?.document) {
	let r = Et(t), i = e.useRef(!1);
	return e.useEffect(() => {
		let e = (e) => {
			e.target && !i.current && ri(Jr, r, { originalEvent: e }, { discrete: !1 });
		};
		return n.addEventListener("focusin", e), () => n.removeEventListener("focusin", e);
	}, [n, r]), {
		onFocusCapture: () => i.current = !0,
		onBlurCapture: () => i.current = !1
	};
}
function ni() {
	let e = new CustomEvent(Kr);
	document.dispatchEvent(e);
}
function ri(e, t, n, { discrete: r }) {
	let i = n.originalEvent.target, a = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && i.addEventListener(e, t, { once: !0 }), r ? bt(i, a) : i.dispatchEvent(a);
}
//#endregion
//#region node_modules/@radix-ui/react-focus-guards/dist/index.mjs
var ii = 0;
function ai() {
	e.useEffect(() => {
		let e = document.querySelectorAll("[data-radix-focus-guard]");
		return document.body.insertAdjacentElement("afterbegin", e[0] ?? oi()), document.body.insertAdjacentElement("beforeend", e[1] ?? oi()), ii++, () => {
			ii === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((e) => e.remove()), ii--;
		};
	}, []);
}
function oi() {
	let e = document.createElement("span");
	return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
//#endregion
//#region node_modules/@radix-ui/react-focus-scope/dist/index.mjs
var si = "focusScope.autoFocusOnMount", ci = "focusScope.autoFocusOnUnmount", li = {
	bubbles: !1,
	cancelable: !0
}, ui = "FocusScope", di = e.forwardRef((t, n) => {
	let { loop: r = !1, trapped: i = !1, onMountAutoFocus: a, onUnmountAutoFocus: o, ...s } = t, [c, l] = e.useState(null), u = Et(a), d = Et(o), f = e.useRef(null), p = H(n, (e) => l(e)), m = e.useRef({
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
				if (m.paused || !c) return;
				let t = e.target;
				c.contains(t) ? f.current = t : vi(f.current, { select: !0 });
			}, t = function(e) {
				if (m.paused || !c) return;
				let t = e.relatedTarget;
				t !== null && (c.contains(t) || vi(f.current, { select: !0 }));
			}, n = function(e) {
				if (document.activeElement === document.body) for (let t of e) t.removedNodes.length > 0 && vi(c);
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
		m.paused
	]), e.useEffect(() => {
		if (c) {
			yi.add(m);
			let e = document.activeElement;
			if (!c.contains(e)) {
				let t = new CustomEvent(si, li);
				c.addEventListener(si, u), c.dispatchEvent(t), t.defaultPrevented || (fi(Si(mi(c)), { select: !0 }), document.activeElement === e && vi(c));
			}
			return () => {
				c.removeEventListener(si, u), setTimeout(() => {
					let t = new CustomEvent(ci, li);
					c.addEventListener(ci, d), c.dispatchEvent(t), t.defaultPrevented || vi(e ?? document.body, { select: !0 }), c.removeEventListener(ci, d), yi.remove(m);
				}, 0);
			};
		}
	}, [
		c,
		u,
		d,
		m
	]);
	let h = e.useCallback((e) => {
		if (!r && !i || m.paused) return;
		let t = e.key === "Tab" && !e.altKey && !e.ctrlKey && !e.metaKey, n = document.activeElement;
		if (t && n) {
			let t = e.currentTarget, [i, a] = pi(t);
			i && a ? !e.shiftKey && n === a ? (e.preventDefault(), r && vi(i, { select: !0 })) : e.shiftKey && n === i && (e.preventDefault(), r && vi(a, { select: !0 })) : n === t && e.preventDefault();
		}
	}, [
		r,
		i,
		m.paused
	]);
	return /* @__PURE__ */ g(U.div, {
		tabIndex: -1,
		...s,
		ref: p,
		onKeyDown: h
	});
});
di.displayName = ui;
function fi(e, { select: t = !1 } = {}) {
	let n = document.activeElement;
	for (let r of e) if (vi(r, { select: t }), document.activeElement !== n) return;
}
function pi(e) {
	let t = mi(e);
	return [hi(t, e), hi(t.reverse(), e)];
}
function mi(e) {
	let t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (e) => {
		let t = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
function hi(e, t) {
	for (let n of e) if (!gi(n, { upTo: t })) return n;
}
function gi(e, { upTo: t }) {
	if (getComputedStyle(e).visibility === "hidden") return !0;
	for (; e;) {
		if (t !== void 0 && e === t) return !1;
		if (getComputedStyle(e).display === "none") return !0;
		e = e.parentElement;
	}
	return !1;
}
function _i(e) {
	return e instanceof HTMLInputElement && "select" in e;
}
function vi(e, { select: t = !1 } = {}) {
	if (e && e.focus) {
		let n = document.activeElement;
		e.focus({ preventScroll: !0 }), e !== n && _i(e) && t && e.select();
	}
}
var yi = bi();
function bi() {
	let e = [];
	return {
		add(t) {
			let n = e[0];
			t !== n && n?.pause(), e = xi(e, t), e.unshift(t);
		},
		remove(t) {
			e = xi(e, t), e[0]?.resume();
		}
	};
}
function xi(e, t) {
	let n = [...e], r = n.indexOf(t);
	return r !== -1 && n.splice(r, 1), n;
}
function Si(e) {
	return e.filter((e) => e.tagName !== "A");
}
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var Ci = [
	"top",
	"right",
	"bottom",
	"left"
], wi = Math.min, Ti = Math.max, Ei = Math.round, Di = Math.floor, Oi = (e) => ({
	x: e,
	y: e
}), ki = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Ai(e, t, n) {
	return Ti(e, wi(t, n));
}
function ji(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function Mi(e) {
	return e.split("-")[0];
}
function Ni(e) {
	return e.split("-")[1];
}
function Pi(e) {
	return e === "x" ? "y" : "x";
}
function Fi(e) {
	return e === "y" ? "height" : "width";
}
function Ii(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function Li(e) {
	return Pi(Ii(e));
}
function Ri(e, t, n) {
	n === void 0 && (n = !1);
	let r = Ni(e), i = Li(e), a = Fi(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = qi(o)), [o, qi(o)];
}
function zi(e) {
	let t = qi(e);
	return [
		Bi(e),
		t,
		Bi(t)
	];
}
function Bi(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var Vi = ["left", "right"], Hi = ["right", "left"], Ui = ["top", "bottom"], Wi = ["bottom", "top"];
function Gi(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? Hi : Vi : t ? Vi : Hi;
		case "left":
		case "right": return t ? Ui : Wi;
		default: return [];
	}
}
function Ki(e, t, n, r) {
	let i = Ni(e), a = Gi(Mi(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(Bi)))), a;
}
function qi(e) {
	let t = Mi(e);
	return ki[t] + e.slice(t.length);
}
function Ji(e) {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...e
	};
}
function Yi(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : Ji(e);
}
function Xi(e) {
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
function Zi(e, t, n) {
	let { reference: r, floating: i } = e, a = Ii(t), o = Li(t), s = Fi(o), c = Mi(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
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
	switch (Ni(t)) {
		case "start":
			p[o] -= f * (n && l ? -1 : 1);
			break;
		case "end":
			p[o] += f * (n && l ? -1 : 1);
			break;
	}
	return p;
}
async function Qi(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = ji(t, e), p = Yi(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = Xi(await i.getClippingRect({
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
	}, y = Xi(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
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
var $i = 50, ea = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: Qi
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = Zi(l, r, c), f = r, p = 0, m = {};
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
		}, x && p < $i && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = Zi(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, ta = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = ji(e, t) || {};
		if (l == null) return {};
		let d = Yi(u), f = {
			x: n,
			y: r
		}, p = Li(i), m = Fi(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		(!C || !await (o.isElement == null ? void 0 : o.isElement(S))) && (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = wi(d[_], T), D = wi(d[v], T), O = E, k = C - h[m] - D, A = C / 2 - h[m] / 2 + w, j = Ai(O, A, k), M = !c.arrow && Ni(i) != null && A !== j && a.reference[m] / 2 - (A < O ? E : D) - h[m] / 2 < 0, N = M ? A < O ? A - O : A - k : 0;
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
}), na = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = ji(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = Mi(r), _ = Ii(o), v = Mi(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [qi(o)] : zi(o)), x = p !== "none";
			!d && x && b.push(...Ki(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = Ri(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (!(u === "alignment" && _ !== Ii(t)) || T.every((e) => Ii(e.placement) === _ ? e.overflows[0] > 0 : !0))) return {
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
								let t = Ii(e.placement);
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
function ra(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function ia(e) {
	return Ci.some((t) => e[t] >= 0);
}
var aa = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = ji(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = ra(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: ia(e)
					} };
				}
				case "escaped": {
					let e = ra(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: ia(e)
					} };
				}
				default: return {};
			}
		}
	};
}, oa = /* @__PURE__ */ new Set(["left", "top"]);
async function sa(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = Mi(n), s = Ni(n), c = Ii(n) === "y", l = oa.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = ji(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
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
var ca = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await sa(t, e);
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
}, la = function(e) {
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
			} }, ...l } = ji(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = Ii(Mi(i)), p = Pi(f), m = u[p], h = u[f];
			if (o) {
				let e = p === "y" ? "top" : "left", t = p === "y" ? "bottom" : "right", n = m + d[e], r = m - d[t];
				m = Ai(n, m, r);
			}
			if (s) {
				let e = f === "y" ? "top" : "left", t = f === "y" ? "bottom" : "right", n = h + d[e], r = h - d[t];
				h = Ai(n, h, r);
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
}, ua = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = ji(e, t), u = {
				x: n,
				y: r
			}, d = Ii(i), f = Pi(d), p = u[f], m = u[d], h = ji(s, t), g = typeof h == "number" ? {
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
				let e = f === "y" ? "width" : "height", t = oa.has(Mi(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, da = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			var n, r;
			let { placement: i, rects: a, platform: o, elements: s } = t, { apply: c = () => {}, ...l } = ji(e, t), u = await o.detectOverflow(t, l), d = Mi(i), f = Ni(i), p = Ii(i) === "y", { width: m, height: h } = a.floating, g, _;
			d === "top" || d === "bottom" ? (g = d, _ = f === (await (o.isRTL == null ? void 0 : o.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (_ = d, g = f === "end" ? "top" : "bottom");
			let v = h - u.top - u.bottom, y = m - u.left - u.right, b = wi(h - u[g], v), x = wi(m - u[_], y), S = !t.middlewareData.shift, C = b, w = x;
			if ((n = t.middlewareData.shift) != null && n.enabled.x && (w = y), (r = t.middlewareData.shift) != null && r.enabled.y && (C = v), S && !f) {
				let e = Ti(u.left, 0), t = Ti(u.right, 0), n = Ti(u.top, 0), r = Ti(u.bottom, 0);
				p ? w = m - 2 * (e !== 0 || t !== 0 ? e + t : Ti(u.left, u.right)) : C = h - 2 * (n !== 0 || r !== 0 ? n + r : Ti(u.top, u.bottom));
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
function fa() {
	return typeof window < "u";
}
function pa(e) {
	return ga(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function ma(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function ha(e) {
	return ((ga(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function ga(e) {
	return fa() ? e instanceof Node || e instanceof ma(e).Node : !1;
}
function _a(e) {
	return fa() ? e instanceof Element || e instanceof ma(e).Element : !1;
}
function va(e) {
	return fa() ? e instanceof HTMLElement || e instanceof ma(e).HTMLElement : !1;
}
function ya(e) {
	return !fa() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof ma(e).ShadowRoot;
}
function ba(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = ja(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function xa(e) {
	return /^(table|td|th)$/.test(pa(e));
}
function Sa(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var Ca = /transform|translate|scale|rotate|perspective|filter/, wa = /paint|layout|strict|content/, Ta = (e) => !!e && e !== "none", Ea;
function Da(e) {
	let t = _a(e) ? ja(e) : e;
	return Ta(t.transform) || Ta(t.translate) || Ta(t.scale) || Ta(t.rotate) || Ta(t.perspective) || !ka() && (Ta(t.backdropFilter) || Ta(t.filter)) || Ca.test(t.willChange || "") || wa.test(t.contain || "");
}
function Oa(e) {
	let t = Na(e);
	for (; va(t) && !Aa(t);) {
		if (Da(t)) return t;
		if (Sa(t)) return null;
		t = Na(t);
	}
	return null;
}
function ka() {
	return Ea ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), Ea;
}
function Aa(e) {
	return /^(html|body|#document)$/.test(pa(e));
}
function ja(e) {
	return ma(e).getComputedStyle(e);
}
function Ma(e) {
	return _a(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function Na(e) {
	if (pa(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || ya(e) && e.host || ha(e);
	return ya(t) ? t.host : t;
}
function Pa(e) {
	let t = Na(e);
	return Aa(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : va(t) && ba(t) ? t : Pa(t);
}
function Fa(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = Pa(e), i = r === e.ownerDocument?.body, a = ma(r);
	if (i) {
		let e = Ia(a);
		return t.concat(a, a.visualViewport || [], ba(r) ? r : [], e && n ? Fa(e) : []);
	} else return t.concat(r, Fa(r, [], n));
}
function Ia(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function La(e) {
	let t = ja(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = va(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = Ei(n) !== a || Ei(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function Ra(e) {
	return _a(e) ? e : e.contextElement;
}
function za(e) {
	let t = Ra(e);
	if (!va(t)) return Oi(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = La(t), o = (a ? Ei(n.width) : n.width) / r, s = (a ? Ei(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var Ba = /* @__PURE__ */ Oi(0);
function Va(e) {
	let t = ma(e);
	return !ka() || !t.visualViewport ? Ba : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Ha(e, t, n) {
	return t === void 0 && (t = !1), !n || t && n !== ma(e) ? !1 : t;
}
function Ua(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = Ra(e), o = Oi(1);
	t && (r ? _a(r) && (o = za(r)) : o = za(e));
	let s = Ha(a, n, r) ? Va(a) : Oi(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a) {
		let e = ma(a), t = r && _a(r) ? ma(r) : r, n = e, i = Ia(n);
		for (; i && r && t !== n;) {
			let e = za(i), t = i.getBoundingClientRect(), r = ja(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = ma(i), i = Ia(n);
		}
	}
	return Xi({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Wa(e, t) {
	let n = Ma(e).scrollLeft;
	return t ? t.left + n : Ua(ha(e)).left + n;
}
function Ga(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Wa(e, n),
		y: n.top + t.scrollTop
	};
}
function Ka(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = ha(r), s = t ? Sa(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = Oi(1), u = Oi(0), d = va(r);
	if ((d || !d && !a) && ((pa(r) !== "body" || ba(o)) && (c = Ma(r)), d)) {
		let e = Ua(r);
		l = za(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? Ga(o, c) : Oi(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function qa(e) {
	return Array.from(e.getClientRects());
}
function Ja(e) {
	let t = ha(e), n = Ma(e), r = e.ownerDocument.body, i = Ti(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = Ti(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight), o = -n.scrollLeft + Wa(e), s = -n.scrollTop;
	return ja(r).direction === "rtl" && (o += Ti(t.clientWidth, r.clientWidth) - i), {
		width: i,
		height: a,
		x: o,
		y: s
	};
}
var Ya = 25;
function Xa(e, t) {
	let n = ma(e), r = ha(e), i = n.visualViewport, a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
	if (i) {
		a = i.width, o = i.height;
		let e = ka();
		(!e || e && t === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
	}
	let l = Wa(r);
	if (l <= 0) {
		let e = r.ownerDocument, t = e.body, n = getComputedStyle(t), i = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, o = Math.abs(r.clientWidth - t.clientWidth - i);
		o <= Ya && (a -= o);
	} else l <= Ya && (a += l);
	return {
		width: a,
		height: o,
		x: s,
		y: c
	};
}
function Za(e, t) {
	let n = Ua(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = va(e) ? za(e) : Oi(1);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function Qa(e, t, n) {
	let r;
	if (t === "viewport") r = Xa(e, n);
	else if (t === "document") r = Ja(ha(e));
	else if (_a(t)) r = Za(t, n);
	else {
		let n = Va(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return Xi(r);
}
function $a(e, t) {
	let n = Na(e);
	return n === t || !_a(n) || Aa(n) ? !1 : ja(n).position === "fixed" || $a(n, t);
}
function eo(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = Fa(e, [], !1).filter((e) => _a(e) && pa(e) !== "body"), i = null, a = ja(e).position === "fixed", o = a ? Na(e) : e;
	for (; _a(o) && !Aa(o);) {
		let t = ja(o), n = Da(o);
		!n && t.position === "fixed" && (i = null), (a ? !n && !i : !n && t.position === "static" && i && (i.position === "absolute" || i.position === "fixed") || ba(o) && !n && $a(e, o)) ? r = r.filter((e) => e !== o) : i = t, o = Na(o);
	}
	return t.set(e, r), r;
}
function to(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Sa(t) ? [] : eo(t, this._c) : [].concat(n), r], o = Qa(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = Qa(t, a[e], i);
		s = Ti(n.top, s), c = wi(n.right, c), l = wi(n.bottom, l), u = Ti(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function no(e) {
	let { width: t, height: n } = La(e);
	return {
		width: t,
		height: n
	};
}
function ro(e, t, n) {
	let r = va(t), i = ha(t), a = n === "fixed", o = Ua(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = Oi(0);
	function l() {
		c.x = Wa(i);
	}
	if (r || !r && !a) if ((pa(t) !== "body" || ba(i)) && (s = Ma(t)), r) {
		let e = Ua(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	} else i && l();
	a && !r && i && l();
	let u = i && !r && !a ? Ga(i, s) : Oi(0);
	return {
		x: o.left + s.scrollLeft - c.x - u.x,
		y: o.top + s.scrollTop - c.y - u.y,
		width: o.width,
		height: o.height
	};
}
function io(e) {
	return ja(e).position === "static";
}
function ao(e, t) {
	if (!va(e) || ja(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return ha(e) === n && (n = n.ownerDocument.body), n;
}
function oo(e, t) {
	let n = ma(e);
	if (Sa(e)) return n;
	if (!va(e)) {
		let t = Na(e);
		for (; t && !Aa(t);) {
			if (_a(t) && !io(t)) return t;
			t = Na(t);
		}
		return n;
	}
	let r = ao(e, t);
	for (; r && xa(r) && io(r);) r = ao(r, t);
	return r && Aa(r) && io(r) && !Da(r) ? n : r || Oa(e) || n;
}
var so = async function(e) {
	let t = this.getOffsetParent || oo, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: ro(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function co(e) {
	return ja(e).direction === "rtl";
}
var lo = {
	convertOffsetParentRelativeRectToViewportRelativeRect: Ka,
	getDocumentElement: ha,
	getClippingRect: to,
	getOffsetParent: oo,
	getElementRects: so,
	getClientRects: qa,
	getDimensions: no,
	getScale: za,
	isElement: _a,
	isRTL: co
};
function uo(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function fo(e, t) {
	let n = null, r, i = ha(e);
	function a() {
		var e;
		clearTimeout(r), (e = n) == null || e.disconnect(), n = null;
	}
	function o(s, c) {
		s === void 0 && (s = !1), c === void 0 && (c = 1), a();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (s || t(), !f || !p) return;
		let m = Di(d), h = Di(i.clientWidth - (u + f)), g = Di(i.clientHeight - (d + p)), _ = Di(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: Ti(0, wi(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (n !== c) {
				if (!y) return o();
				n ? o(!1, n) : r = setTimeout(() => {
					o(!1, 1e-7);
				}, 1e3);
			}
			n === 1 && !uo(l, e.getBoundingClientRect()) && o(), y = !1;
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
function po(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = Ra(e), u = i || a ? [...l ? Fa(l) : [], ...t ? Fa(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n, { passive: !0 }), a && e.addEventListener("resize", n);
	});
	let d = l && s ? fo(l, n) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? Ua(e) : null;
	c && g();
	function g() {
		let t = Ua(e);
		h && !uo(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var mo = ca, ho = la, go = na, _o = da, vo = aa, yo = ta, bo = ua, xo = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = {
		platform: lo,
		...n
	}, a = {
		...i.platform,
		_c: r
	};
	return ea(e, t, {
		...i,
		platform: a
	});
}, So = typeof document < "u" ? u : function() {};
function Co(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!Co(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !Co(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function wo(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function To(e, t) {
	let n = wo(e);
	return Math.round(t * n) / n;
}
function Eo(t) {
	let n = e.useRef(t);
	return So(() => {
		n.current = t;
	}), n;
}
function Do(t) {
	t === void 0 && (t = {});
	let { placement: n = "bottom", strategy: r = "absolute", middleware: i = [], platform: a, elements: { reference: o, floating: s } = {}, transform: c = !0, whileElementsMounted: l, open: u } = t, [d, f] = e.useState({
		x: 0,
		y: 0,
		strategy: r,
		placement: n,
		middlewareData: {},
		isPositioned: !1
	}), [p, m] = e.useState(i);
	Co(p, i) || m(i);
	let [h, g] = e.useState(null), [_, y] = e.useState(null), b = e.useCallback((e) => {
		e !== w.current && (w.current = e, g(e));
	}, []), x = e.useCallback((e) => {
		e !== T.current && (T.current = e, y(e));
	}, []), S = o || h, C = s || _, w = e.useRef(null), T = e.useRef(null), E = e.useRef(d), D = l != null, O = Eo(l), k = Eo(a), A = Eo(u), j = e.useCallback(() => {
		if (!w.current || !T.current) return;
		let e = {
			placement: n,
			strategy: r,
			middleware: p
		};
		k.current && (e.platform = k.current), xo(w.current, T.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: A.current !== !1
			};
			M.current && !Co(E.current, t) && (E.current = t, v.flushSync(() => {
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
	So(() => {
		u === !1 && E.current.isPositioned && (E.current.isPositioned = !1, f((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [u]);
	let M = e.useRef(!1);
	So(() => (M.current = !0, () => {
		M.current = !1;
	}), []), So(() => {
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
		let t = To(P.floating, d.x), n = To(P.floating, d.y);
		return c ? {
			...e,
			transform: "translate(" + t + "px, " + n + "px)",
			...wo(P.floating) >= 1.5 && { willChange: "transform" }
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
var Oo = (e) => {
	function t(e) {
		return {}.hasOwnProperty.call(e, "current");
	}
	return {
		name: "arrow",
		options: e,
		fn(n) {
			let { element: r, padding: i } = typeof e == "function" ? e(n) : e;
			return r && t(r) ? r.current == null ? {} : yo({
				element: r.current,
				padding: i
			}).fn(n) : r ? yo({
				element: r,
				padding: i
			}).fn(n) : {};
		}
	};
}, ko = (e, t) => {
	let n = mo(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Ao = (e, t) => {
	let n = ho(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, jo = (e, t) => ({
	fn: bo(e).fn,
	options: [e, t]
}), Mo = (e, t) => {
	let n = go(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, No = (e, t) => {
	let n = _o(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Po = (e, t) => {
	let n = vo(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Fo = (e, t) => {
	let n = Oo(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Io = "Arrow", Lo = e.forwardRef((e, t) => {
	let { children: n, width: r = 10, height: i = 5, ...a } = e;
	return /* @__PURE__ */ g(U.svg, {
		...a,
		ref: t,
		width: r,
		height: i,
		viewBox: "0 0 30 10",
		preserveAspectRatio: "none",
		children: e.asChild ? n : /* @__PURE__ */ g("polygon", { points: "0,0 30,0 15,10" })
	});
});
Lo.displayName = Io;
var Ro = Lo, zo = "Popper", [Bo, Vo] = dt(zo), [Ho, Uo] = Bo(zo), Wo = (t) => {
	let { __scopePopper: n, children: r } = t, [i, a] = e.useState(null);
	return /* @__PURE__ */ g(Ho, {
		scope: n,
		anchor: i,
		onAnchorChange: a,
		children: r
	});
};
Wo.displayName = zo;
var Go = "PopperAnchor", Ko = e.forwardRef((t, n) => {
	let { __scopePopper: r, virtualRef: i, ...a } = t, o = Uo(Go, r), s = e.useRef(null), c = H(n, s), l = e.useRef(null);
	return e.useEffect(() => {
		let e = l.current;
		l.current = i?.current || s.current, e !== l.current && o.onAnchorChange(l.current);
	}), i ? null : /* @__PURE__ */ g(U.div, {
		...a,
		ref: c
	});
});
Ko.displayName = Go;
var qo = "PopperContent", [Jo, Yo] = Bo(qo), Xo = e.forwardRef((t, n) => {
	let { __scopePopper: r, side: i = "bottom", sideOffset: a = 0, align: o = "center", alignOffset: s = 0, arrowPadding: c = 0, avoidCollisions: l = !0, collisionBoundary: u = [], collisionPadding: d = 0, sticky: f = "partial", hideWhenDetached: p = !1, updatePositionStrategy: m = "optimized", onPlaced: h, ..._ } = t, v = Uo(qo, r), [y, b] = e.useState(null), x = H(n, (e) => b(e)), [S, C] = e.useState(null), w = en(S), T = w?.width ?? 0, E = w?.height ?? 0, D = i + (o === "center" ? "" : "-" + o), O = typeof d == "number" ? d : {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...d
	}, k = Array.isArray(u) ? u : [u], A = k.length > 0, j = {
		padding: O,
		boundary: k.filter(es),
		altBoundary: A
	}, { refs: M, floatingStyles: N, placement: P, isPositioned: F, middlewareData: I } = Do({
		strategy: "fixed",
		placement: D,
		whileElementsMounted: (...e) => po(...e, { animationFrame: m === "always" }),
		elements: { reference: v.anchor },
		middleware: [
			ko({
				mainAxis: a + E,
				alignmentAxis: s
			}),
			l && Ao({
				mainAxis: !0,
				crossAxis: !1,
				limiter: f === "partial" ? jo() : void 0,
				...j
			}),
			l && Mo({ ...j }),
			No({
				...j,
				apply: ({ elements: e, rects: t, availableWidth: n, availableHeight: r }) => {
					let { width: i, height: a } = t.reference, o = e.floating.style;
					o.setProperty("--radix-popper-available-width", `${n}px`), o.setProperty("--radix-popper-available-height", `${r}px`), o.setProperty("--radix-popper-anchor-width", `${i}px`), o.setProperty("--radix-popper-anchor-height", `${a}px`);
				}
			}),
			S && Fo({
				element: S,
				padding: c
			}),
			ts({
				arrowWidth: T,
				arrowHeight: E
			}),
			p && Po({
				strategy: "referenceHidden",
				...j
			})
		]
	}), [L, ee] = ns(P), R = Et(h);
	St(() => {
		F && R?.();
	}, [F, R]);
	let te = I.arrow?.x, ne = I.arrow?.y, re = I.arrow?.centerOffset !== 0, [z, ie] = e.useState();
	return St(() => {
		y && ie(window.getComputedStyle(y).zIndex);
	}, [y]), /* @__PURE__ */ g("div", {
		ref: M.setFloating,
		"data-radix-popper-content-wrapper": "",
		style: {
			...N,
			transform: F ? N.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: z,
			"--radix-popper-transform-origin": [I.transformOrigin?.x, I.transformOrigin?.y].join(" "),
			...I.hide?.referenceHidden && {
				visibility: "hidden",
				pointerEvents: "none"
			}
		},
		dir: t.dir,
		children: /* @__PURE__ */ g(Jo, {
			scope: r,
			placedSide: L,
			onArrowChange: C,
			arrowX: te,
			arrowY: ne,
			shouldHideArrow: re,
			children: /* @__PURE__ */ g(U.div, {
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
Xo.displayName = qo;
var Zo = "PopperArrow", Qo = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, $o = e.forwardRef(function(e, t) {
	let { __scopePopper: n, ...r } = e, i = Yo(Zo, n), a = Qo[i.placedSide];
	return /* @__PURE__ */ g("span", {
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
		children: /* @__PURE__ */ g(Ro, {
			...r,
			ref: t,
			style: {
				...r.style,
				display: "block"
			}
		})
	});
});
$o.displayName = Zo;
function es(e) {
	return e !== null;
}
var ts = (e) => ({
	name: "transformOrigin",
	options: e,
	fn(t) {
		let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = ns(n), u = {
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
function ns(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
var rs = Wo, is = Ko, as = Xo, os = $o, ss = "Portal", cs = e.forwardRef((t, n) => {
	let { container: r, ...i } = t, [a, o] = e.useState(!1);
	St(() => o(!0), []);
	let s = r || a && globalThis?.document?.body;
	return s ? y.createPortal(/* @__PURE__ */ g(U.div, {
		...i,
		ref: n
	}), s) : null;
});
cs.displayName = ss;
//#endregion
//#region node_modules/aria-hidden/dist/es2015/index.js
var ls = function(e) {
	return typeof document > "u" ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
}, us = /* @__PURE__ */ new WeakMap(), ds = /* @__PURE__ */ new WeakMap(), fs = {}, ps = 0, ms = function(e) {
	return e && (e.host || ms(e.parentNode));
}, hs = function(e, t) {
	return t.map(function(t) {
		if (e.contains(t)) return t;
		var n = ms(t);
		return n && e.contains(n) ? n : (console.error("aria-hidden", t, "in not contained inside", e, ". Doing nothing"), null);
	}).filter(function(e) {
		return !!e;
	});
}, gs = function(e, t, n, r) {
	var i = hs(t, Array.isArray(e) ? e : [e]);
	fs[n] || (fs[n] = /* @__PURE__ */ new WeakMap());
	var a = fs[n], o = [], s = /* @__PURE__ */ new Set(), c = new Set(i), l = function(e) {
		!e || s.has(e) || (s.add(e), l(e.parentNode));
	};
	i.forEach(l);
	var u = function(e) {
		!e || c.has(e) || Array.prototype.forEach.call(e.children, function(e) {
			if (s.has(e)) u(e);
			else try {
				var t = e.getAttribute(r), i = t !== null && t !== "false", c = (us.get(e) || 0) + 1, l = (a.get(e) || 0) + 1;
				us.set(e, c), a.set(e, l), o.push(e), c === 1 && i && ds.set(e, !0), l === 1 && e.setAttribute(n, "true"), i || e.setAttribute(r, "true");
			} catch (t) {
				console.error("aria-hidden: cannot operate on ", e, t);
			}
		});
	};
	return u(t), s.clear(), ps++, function() {
		o.forEach(function(e) {
			var t = us.get(e) - 1, i = a.get(e) - 1;
			us.set(e, t), a.set(e, i), t || (ds.has(e) || e.removeAttribute(r), ds.delete(e)), i || e.removeAttribute(n);
		}), ps--, ps || (us = /* @__PURE__ */ new WeakMap(), us = /* @__PURE__ */ new WeakMap(), ds = /* @__PURE__ */ new WeakMap(), fs = {});
	};
}, _s = function(e, t, n) {
	n === void 0 && (n = "data-aria-hidden");
	var r = Array.from(Array.isArray(e) ? e : [e]), i = t || ls(e);
	return i ? (r.push.apply(r, Array.from(i.querySelectorAll("[aria-live], script"))), gs(r, i, n, "aria-hidden")) : function() {
		return null;
	};
}, vs = function() {
	return vs = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, vs.apply(this, arguments);
};
function ys(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function bs(e, t, n) {
	if (n || arguments.length === 2) for (var r = 0, i = t.length, a; r < i; r++) (a || !(r in t)) && (a ||= Array.prototype.slice.call(t, 0, r), a[r] = t[r]);
	return e.concat(a || Array.prototype.slice.call(t));
}
//#endregion
//#region node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var xs = "right-scroll-bar-position", Ss = "width-before-scroll-bar", Cs = "with-scroll-bars-hidden", ws = "--removed-body-scroll-bar-size";
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/assignRef.js
function Ts(e, t) {
	return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/useRef.js
function Es(e, t) {
	var n = p(function() {
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
var Ds = typeof window < "u" ? e.useLayoutEffect : e.useEffect, Os = /* @__PURE__ */ new WeakMap();
function ks(e, t) {
	var n = Es(t || null, function(t) {
		return e.forEach(function(e) {
			return Ts(e, t);
		});
	});
	return Ds(function() {
		var t = Os.get(n);
		if (t) {
			var r = new Set(t), i = new Set(e), a = n.current;
			r.forEach(function(e) {
				i.has(e) || Ts(e, null);
			}), i.forEach(function(e) {
				r.has(e) || Ts(e, a);
			});
		}
		Os.set(n, e);
	}, [e]), n;
}
//#endregion
//#region node_modules/use-sidecar/dist/es2015/medium.js
function As(e) {
	return e;
}
function js(e, t) {
	t === void 0 && (t = As);
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
function Ms(e) {
	e === void 0 && (e = {});
	var t = js(null);
	return t.options = vs({
		async: !0,
		ssr: !1
	}, e), t;
}
//#endregion
//#region node_modules/use-sidecar/dist/es2015/exports.js
var Ns = function(t) {
	var n = t.sideCar, r = ys(t, ["sideCar"]);
	if (!n) throw Error("Sidecar: please provide `sideCar` property to import the right car");
	var i = n.read();
	if (!i) throw Error("Sidecar medium not found");
	return e.createElement(i, vs({}, r));
};
Ns.isSideCarExport = !0;
function Ps(e, t) {
	return e.useMedium(t), Ns;
}
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/medium.js
var Fs = Ms(), Is = function() {}, Ls = e.forwardRef(function(t, n) {
	var r = e.useRef(null), i = e.useState({
		onScrollCapture: Is,
		onWheelCapture: Is,
		onTouchMoveCapture: Is
	}), a = i[0], o = i[1], s = t.forwardProps, c = t.children, l = t.className, u = t.removeScrollBar, d = t.enabled, f = t.shards, p = t.sideCar, m = t.noRelative, h = t.noIsolation, g = t.inert, _ = t.allowPinchZoom, v = t.as, y = v === void 0 ? "div" : v, b = t.gapMode, x = ys(t, [
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
	]), S = p, C = ks([r, n]), w = vs(vs({}, x), a);
	return e.createElement(e.Fragment, null, d && e.createElement(S, {
		sideCar: Fs,
		removeScrollBar: u,
		shards: f,
		noRelative: m,
		noIsolation: h,
		inert: g,
		setCallbacks: o,
		allowPinchZoom: !!_,
		lockRef: r,
		gapMode: b
	}), s ? e.cloneElement(e.Children.only(c), vs(vs({}, w), { ref: C })) : e.createElement(y, vs({}, w, {
		className: l,
		ref: C
	}), c));
});
Ls.defaultProps = {
	enabled: !0,
	removeScrollBar: !0,
	inert: !1
}, Ls.classNames = {
	fullWidth: Ss,
	zeroRight: xs
};
//#endregion
//#region node_modules/get-nonce/dist/es2015/index.js
var Rs, zs = function() {
	if (Rs) return Rs;
	if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
//#endregion
//#region node_modules/react-style-singleton/dist/es2015/singleton.js
function Bs() {
	if (!document) return null;
	var e = document.createElement("style");
	e.type = "text/css";
	var t = zs();
	return t && e.setAttribute("nonce", t), e;
}
function Vs(e, t) {
	e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Hs(e) {
	(document.head || document.getElementsByTagName("head")[0]).appendChild(e);
}
var Us = function() {
	var e = 0, t = null;
	return {
		add: function(n) {
			e == 0 && (t = Bs()) && (Vs(t, n), Hs(t)), e++;
		},
		remove: function() {
			e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
		}
	};
}, Ws = function() {
	var t = Us();
	return function(n, r) {
		e.useEffect(function() {
			return t.add(n), function() {
				t.remove();
			};
		}, [n && r]);
	};
}, Gs = function() {
	var e = Ws();
	return function(t) {
		var n = t.styles, r = t.dynamic;
		return e(n, r), null;
	};
}, Ks = {
	left: 0,
	top: 0,
	right: 0,
	gap: 0
}, qs = function(e) {
	return parseInt(e || "", 10) || 0;
}, Js = function(e) {
	var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], i = t[e === "padding" ? "paddingRight" : "marginRight"];
	return [
		qs(n),
		qs(r),
		qs(i)
	];
}, Ys = function(e) {
	if (e === void 0 && (e = "margin"), typeof window > "u") return Ks;
	var t = Js(e), n = document.documentElement.clientWidth, r = window.innerWidth;
	return {
		left: t[0],
		top: t[1],
		right: t[2],
		gap: Math.max(0, r - n + t[2] - t[0])
	};
}, Xs = Gs(), Zs = "data-scroll-locked", Qs = function(e, t, n, r) {
	var i = e.left, a = e.top, o = e.right, s = e.gap;
	return n === void 0 && (n = "margin"), `
  .${Cs} {
   overflow: hidden ${r};
   padding-right: ${s}px ${r};
  }
  body[${Zs}] {
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
  
  .${xs} {
    right: ${s}px ${r};
  }
  
  .${Ss} {
    margin-right: ${s}px ${r};
  }
  
  .${xs} .${xs} {
    right: 0 ${r};
  }
  
  .${Ss} .${Ss} {
    margin-right: 0 ${r};
  }
  
  body[${Zs}] {
    ${ws}: ${s}px;
  }
`;
}, $s = function() {
	var e = parseInt(document.body.getAttribute("data-scroll-locked") || "0", 10);
	return isFinite(e) ? e : 0;
}, ec = function() {
	e.useEffect(function() {
		return document.body.setAttribute(Zs, ($s() + 1).toString()), function() {
			var e = $s() - 1;
			e <= 0 ? document.body.removeAttribute(Zs) : document.body.setAttribute(Zs, e.toString());
		};
	}, []);
}, tc = function(t) {
	var n = t.noRelative, r = t.noImportant, i = t.gapMode, a = i === void 0 ? "margin" : i;
	ec();
	var o = e.useMemo(function() {
		return Ys(a);
	}, [a]);
	return e.createElement(Xs, { styles: Qs(o, !n, a, r ? "" : "!important") });
}, nc = !1;
if (typeof window < "u") try {
	var rc = Object.defineProperty({}, "passive", { get: function() {
		return nc = !0, !0;
	} });
	window.addEventListener("test", rc, rc), window.removeEventListener("test", rc, rc);
} catch {
	nc = !1;
}
var ic = nc ? { passive: !1 } : !1, ac = function(e) {
	return e.tagName === "TEXTAREA";
}, oc = function(e, t) {
	if (!(e instanceof Element)) return !1;
	var n = window.getComputedStyle(e);
	return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !ac(e) && n[t] === "visible");
}, sc = function(e) {
	return oc(e, "overflowY");
}, cc = function(e) {
	return oc(e, "overflowX");
}, lc = function(e, t) {
	var n = t.ownerDocument, r = t;
	do {
		if (typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host), fc(e, r)) {
			var i = pc(e, r);
			if (i[1] > i[2]) return !0;
		}
		r = r.parentNode;
	} while (r && r !== n.body);
	return !1;
}, uc = function(e) {
	return [
		e.scrollTop,
		e.scrollHeight,
		e.clientHeight
	];
}, dc = function(e) {
	return [
		e.scrollLeft,
		e.scrollWidth,
		e.clientWidth
	];
}, fc = function(e, t) {
	return e === "v" ? sc(t) : cc(t);
}, pc = function(e, t) {
	return e === "v" ? uc(t) : dc(t);
}, mc = function(e, t) {
	return e === "h" && t === "rtl" ? -1 : 1;
}, hc = function(e, t, n, r, i) {
	var a = mc(e, window.getComputedStyle(t).direction), o = a * r, s = n.target, c = t.contains(s), l = !1, u = o > 0, d = 0, f = 0;
	do {
		if (!s) break;
		var p = pc(e, s), m = p[0], h = p[1] - p[2] - a * m;
		(m || h) && fc(e, s) && (d += h, f += m);
		var g = s.parentNode;
		s = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
	} while (!c && s !== document.body || c && (t.contains(s) || t === s));
	return (u && (i && Math.abs(d) < 1 || !i && o > d) || !u && (i && Math.abs(f) < 1 || !i && -o > f)) && (l = !0), l;
}, gc = function(e) {
	return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, _c = function(e) {
	return [e.deltaX, e.deltaY];
}, vc = function(e) {
	return e && "current" in e ? e.current : e;
}, yc = function(e, t) {
	return e[0] === t[0] && e[1] === t[1];
}, bc = function(e) {
	return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`;
}, xc = 0, Sc = [];
function Cc(t) {
	var n = e.useRef([]), r = e.useRef([0, 0]), i = e.useRef(), a = e.useState(xc++)[0], o = e.useState(Gs)[0], s = e.useRef(t);
	e.useEffect(function() {
		s.current = t;
	}, [t]), e.useEffect(function() {
		if (t.inert) {
			document.body.classList.add(`block-interactivity-${a}`);
			var e = bs([t.lockRef.current], (t.shards || []).map(vc), !0).filter(Boolean);
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
		var n = gc(e), a = r.current, o = "deltaX" in e ? e.deltaX : a[0] - n[0], c = "deltaY" in e ? e.deltaY : a[1] - n[1], l, u = e.target, d = Math.abs(o) > Math.abs(c) ? "h" : "v";
		if ("touches" in e && d === "h" && u.type === "range") return !1;
		var f = window.getSelection(), p = f && f.anchorNode;
		if (p && (p === u || p.contains(u))) return !1;
		var m = lc(d, u);
		if (!m) return !0;
		if (m ? l = d : (l = d === "v" ? "h" : "v", m = lc(d, u)), !m) return !1;
		if (!i.current && "changedTouches" in e && (o || c) && (i.current = l), !l) return !0;
		var h = i.current || l;
		return hc(h, t, e, h === "h" ? o : c, !0);
	}, []), l = e.useCallback(function(e) {
		var t = e;
		if (!(!Sc.length || Sc[Sc.length - 1] !== o)) {
			var r = "deltaY" in t ? _c(t) : gc(t), i = n.current.filter(function(e) {
				return e.name === t.type && (e.target === t.target || t.target === e.shadowParent) && yc(e.delta, r);
			})[0];
			if (i && i.should) {
				t.cancelable && t.preventDefault();
				return;
			}
			if (!i) {
				var a = (s.current.shards || []).map(vc).filter(Boolean).filter(function(e) {
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
			shadowParent: wc(r)
		};
		n.current.push(a), setTimeout(function() {
			n.current = n.current.filter(function(e) {
				return e !== a;
			});
		}, 1);
	}, []), d = e.useCallback(function(e) {
		r.current = gc(e), i.current = void 0;
	}, []), f = e.useCallback(function(e) {
		u(e.type, _c(e), e.target, c(e, t.lockRef.current));
	}, []), p = e.useCallback(function(e) {
		u(e.type, gc(e), e.target, c(e, t.lockRef.current));
	}, []);
	e.useEffect(function() {
		return Sc.push(o), t.setCallbacks({
			onScrollCapture: f,
			onWheelCapture: f,
			onTouchMoveCapture: p
		}), document.addEventListener("wheel", l, ic), document.addEventListener("touchmove", l, ic), document.addEventListener("touchstart", d, ic), function() {
			Sc = Sc.filter(function(e) {
				return e !== o;
			}), document.removeEventListener("wheel", l, ic), document.removeEventListener("touchmove", l, ic), document.removeEventListener("touchstart", d, ic);
		};
	}, []);
	var m = t.removeScrollBar, h = t.inert;
	return e.createElement(e.Fragment, null, h ? e.createElement(o, { styles: bc(a) }) : null, m ? e.createElement(tc, {
		noRelative: t.noRelative,
		gapMode: t.gapMode
	}) : null);
}
function wc(e) {
	for (var t = null; e !== null;) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
	return t;
}
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/sidecar.js
var Tc = Ps(Fs, Cc), Ec = e.forwardRef(function(t, n) {
	return e.createElement(Ls, vs({}, t, {
		ref: n,
		sideCar: Tc
	}));
});
Ec.classNames = Ls.classNames;
//#endregion
//#region node_modules/@radix-ui/react-popover/dist/index.mjs
var Dc = "Popover", [Oc, kc] = dt(Dc, [Vo]), Ac = Vo(), [jc, Mc] = Oc(Dc), Nc = (t) => {
	let { __scopePopover: n, children: r, open: i, defaultOpen: a, onOpenChange: o, modal: s = !1 } = t, c = Ac(n), l = e.useRef(null), [u, d] = e.useState(!1), [f, p] = Ot({
		prop: i,
		defaultProp: a ?? !1,
		onChange: o,
		caller: Dc
	});
	return /* @__PURE__ */ g(rs, {
		...c,
		children: /* @__PURE__ */ g(jc, {
			scope: n,
			contentId: Tt(),
			triggerRef: l,
			open: f,
			onOpenChange: p,
			onOpenToggle: e.useCallback(() => p((e) => !e), [p]),
			hasCustomAnchor: u,
			onCustomAnchorAdd: e.useCallback(() => d(!0), []),
			onCustomAnchorRemove: e.useCallback(() => d(!1), []),
			modal: s,
			children: r
		})
	});
};
Nc.displayName = Dc;
var Pc = "PopoverAnchor", Fc = e.forwardRef((t, n) => {
	let { __scopePopover: r, ...i } = t, a = Mc(Pc, r), o = Ac(r), { onCustomAnchorAdd: s, onCustomAnchorRemove: c } = a;
	return e.useEffect(() => (s(), () => c()), [s, c]), /* @__PURE__ */ g(is, {
		...o,
		...i,
		ref: n
	});
});
Fc.displayName = Pc;
var Ic = "PopoverTrigger", Lc = e.forwardRef((e, t) => {
	let { __scopePopover: n, ...r } = e, i = Mc(Ic, n), a = Ac(n), o = H(t, i.triggerRef), s = /* @__PURE__ */ g(U.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": i.open,
		"aria-controls": i.contentId,
		"data-state": Qc(i.open),
		...r,
		ref: o,
		onClick: V(e.onClick, i.onOpenToggle)
	});
	return i.hasCustomAnchor ? s : /* @__PURE__ */ g(is, {
		asChild: !0,
		...a,
		children: s
	});
});
Lc.displayName = Ic;
var Rc = "PopoverPortal", [zc, Bc] = Oc(Rc, { forceMount: void 0 }), Vc = (e) => {
	let { __scopePopover: t, forceMount: n, children: r, container: i } = e, a = Mc(Rc, t);
	return /* @__PURE__ */ g(zc, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ g(rn, {
			present: n || a.open,
			children: /* @__PURE__ */ g(cs, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
};
Vc.displayName = Rc;
var Hc = "PopoverContent", Uc = e.forwardRef((e, t) => {
	let n = Bc(Hc, e.__scopePopover), { forceMount: r = n.forceMount, ...i } = e, a = Mc(Hc, e.__scopePopover);
	return /* @__PURE__ */ g(rn, {
		present: r || a.open,
		children: a.modal ? /* @__PURE__ */ g(Gc, {
			...i,
			ref: t
		}) : /* @__PURE__ */ g(Kc, {
			...i,
			ref: t
		})
	});
});
Uc.displayName = Hc;
var Wc = /* @__PURE__ */ pt("PopoverContent.RemoveScroll"), Gc = e.forwardRef((t, n) => {
	let r = Mc(Hc, t.__scopePopover), i = e.useRef(null), a = H(n, i), o = e.useRef(!1);
	return e.useEffect(() => {
		let e = i.current;
		if (e) return _s(e);
	}, []), /* @__PURE__ */ g(Ec, {
		as: Wc,
		allowPinchZoom: !0,
		children: /* @__PURE__ */ g(qc, {
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
}), Kc = e.forwardRef((t, n) => {
	let r = Mc(Hc, t.__scopePopover), i = e.useRef(!1), a = e.useRef(!1);
	return /* @__PURE__ */ g(qc, {
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
}), qc = e.forwardRef((e, t) => {
	let { __scopePopover: n, trapFocus: r, onOpenAutoFocus: i, onCloseAutoFocus: a, disableOutsidePointerEvents: o, onEscapeKeyDown: s, onPointerDownOutside: c, onFocusOutside: l, onInteractOutside: u, ...d } = e, f = Mc(Hc, n), p = Ac(n);
	return ai(), /* @__PURE__ */ g(di, {
		asChild: !0,
		loop: !0,
		trapped: r,
		onMountAutoFocus: i,
		onUnmountAutoFocus: a,
		children: /* @__PURE__ */ g(Zr, {
			asChild: !0,
			disableOutsidePointerEvents: o,
			onInteractOutside: u,
			onEscapeKeyDown: s,
			onPointerDownOutside: c,
			onFocusOutside: l,
			onDismiss: () => f.onOpenChange(!1),
			children: /* @__PURE__ */ g(as, {
				"data-state": Qc(f.open),
				role: "dialog",
				id: f.contentId,
				...p,
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
}), Jc = "PopoverClose", Yc = e.forwardRef((e, t) => {
	let { __scopePopover: n, ...r } = e, i = Mc(Jc, n);
	return /* @__PURE__ */ g(U.button, {
		type: "button",
		...r,
		ref: t,
		onClick: V(e.onClick, () => i.onOpenChange(!1))
	});
});
Yc.displayName = Jc;
var Xc = "PopoverArrow", Zc = e.forwardRef((e, t) => {
	let { __scopePopover: n, ...r } = e;
	return /* @__PURE__ */ g(os, {
		...Ac(n),
		...r,
		ref: t
	});
});
Zc.displayName = Xc;
function Qc(e) {
	return e ? "open" : "closed";
}
var $c = Nc, el = Lc, tl = Vc, nl = Uc, W = {
	container: "_container_1n5az_1",
	label: "_label_1n5az_10",
	triggerWrapper: "_triggerWrapper_1n5az_16",
	inputField: "_inputField_1n5az_22",
	icon: "_icon_1n5az_46",
	iconOpen: "_iconOpen_1n5az_56",
	dropdown: "_dropdown_1n5az_61",
	slideDown: "_slideDown_1n5az_1",
	option: "_option_1n5az_77",
	optionSelected: "_optionSelected_1n5az_93",
	noResults: "_noResults_1n5az_98",
	inputError: "_inputError_1n5az_117",
	checkIcon: "_checkIcon_1n5az_121",
	errorMessage: "_errorMessage_1n5az_125",
	cbTrigger: "_cbTrigger_1n5az_134",
	cbTriggerText: "_cbTriggerText_1n5az_169",
	cbTriggerIcon: "_cbTriggerIcon_1n5az_180",
	cbContent: "_cbContent_1n5az_186",
	searchBox: "_searchBox_1n5az_197",
	searchInputWrap: "_searchInputWrap_1n5az_205",
	searchIcon: "_searchIcon_1n5az_211",
	searchInput: "_searchInput_1n5az_205",
	searchList: "_searchList_1n5az_232",
	searchItem: "_searchItem_1n5az_238",
	searchItemActive: "_searchItemActive_1n5az_258",
	searchCheck: "_searchCheck_1n5az_264",
	searchItemLabel: "_searchItemLabel_1n5az_271",
	searchEmpty: "_searchEmpty_1n5az_277",
	searchItemDestaque: "_searchItemDestaque_1n5az_285",
	searchFooter: "_searchFooter_1n5az_290",
	searchCriar: "_searchCriar_1n5az_294"
}, rl = 100;
typeof document < "u" && !window.__avereUiCbWheel && (window.__avereUiCbWheel = !0, document.addEventListener("wheel", (e) => {
	let t = e.target?.closest?.("[data-avere-cb-list]");
	t && (e.preventDefault(), e.stopImmediatePropagation(), t.scrollTop += e.deltaY);
}, {
	passive: !1,
	capture: !0
}));
function il({ options: t, value: n, onChange: r, label: i, error: a, placeholder: o = "Selecione...", className: s, disabled: c, side: l = "bottom", avoidCollisions: u = !0, onCriar: d, rotuloCriar: f = "Novo…" }) {
	let [p, m] = e.useState(!1), [v, y] = e.useState(""), [b, x] = e.useState(0), S = e.useRef(null), C = e.useRef(null), w = e.useRef(null);
	e.useEffect(() => {
		x(0);
	}, [v, p]), e.useEffect(() => {
		S.current?.scrollIntoView({ block: "nearest" });
	}, [b]);
	let E = t.find((e) => e.value === n), D = v.trim().toLowerCase(), O = D ? t.filter((e) => e.label.toLowerCase().includes(D)) : t, k = O.slice(0, rl), A = (e) => {
		r?.(e), m(!1), y("");
	}, M = () => {
		let e = v.trim();
		m(!1), y(""), d?.(e);
	};
	return /* @__PURE__ */ _("div", {
		...j("Combobox"),
		className: T(W.container, s),
		children: [
			i && /* @__PURE__ */ g("label", {
				className: W.label,
				children: i
			}),
			/* @__PURE__ */ _($c, {
				open: p,
				onOpenChange: (e) => {
					m(e), e || y("");
				},
				children: [/* @__PURE__ */ g(el, {
					asChild: !0,
					disabled: c,
					children: /* @__PURE__ */ _("button", {
						ref: C,
						type: "button",
						className: T(W.cbTrigger, a && W.inputError),
						children: [/* @__PURE__ */ g("span", {
							className: W.cbTriggerText,
							"data-placeholder": E ? void 0 : "",
							children: E ? E.label : o
						}), /* @__PURE__ */ g(ve, {
							size: 16,
							className: W.cbTriggerIcon
						})]
					})
				}), /* @__PURE__ */ g(tl, { children: /* @__PURE__ */ _(nl, {
					...j("Combobox"),
					className: W.cbContent,
					align: "start",
					side: l,
					avoidCollisions: u,
					sideOffset: 4,
					style: {
						zIndex: 9999,
						width: "var(--radix-popover-trigger-width)"
					},
					onCloseAutoFocus: (e) => {
						let t = w.current;
						if (!t) return;
						w.current = null, e.preventDefault();
						let n = Array.from(document.querySelectorAll("button, input, select, textarea, a[href], [tabindex]:not([tabindex=\"-1\"])")).filter((e) => !e.closest("[data-radix-popper-content-wrapper]") && e.offsetParent !== null && !e.hasAttribute("disabled")), r = C.current ? n.indexOf(C.current) : -1;
						((r >= 0 ? n[t === "prev" ? r - 1 : r + 1] : null) ?? C.current)?.focus();
					},
					children: [
						/* @__PURE__ */ g("div", {
							className: W.searchBox,
							children: /* @__PURE__ */ _("div", {
								className: W.searchInputWrap,
								children: [/* @__PURE__ */ g(ze, {
									size: 14,
									className: W.searchIcon
								}), /* @__PURE__ */ g("input", {
									autoFocus: !0,
									className: W.searchInput,
									value: v,
									onChange: (e) => y(e.target.value),
									onKeyDown: (e) => {
										if (e.key === "ArrowDown") e.preventDefault(), x((e) => Math.min(e + 1, k.length - 1));
										else if (e.key === "ArrowUp") e.preventDefault(), x((e) => Math.max(e - 1, 0));
										else if (e.key === "Enter") {
											e.preventDefault();
											let t = k[b];
											t ? A(t.value) : d && M();
										} else e.key === "Tab" && (e.preventDefault(), w.current = e.shiftKey ? "prev" : "next", m(!1));
									},
									placeholder: "Buscar…"
								})]
							})
						}),
						/* @__PURE__ */ g("div", {
							className: W.searchList,
							"data-avere-cb-list": "",
							children: k.length > 0 ? /* @__PURE__ */ _(h, { children: [k.map((e, t) => /* @__PURE__ */ _("button", {
								type: "button",
								tabIndex: -1,
								ref: t === b ? S : void 0,
								className: T(W.searchItem, e.value === n && W.searchItemActive, t === b && W.searchItemDestaque),
								onMouseEnter: () => x(t),
								onClick: () => A(e.value),
								children: [/* @__PURE__ */ g("span", {
									className: W.searchCheck,
									children: e.value === n && /* @__PURE__ */ g(me, { size: 15 })
								}), /* @__PURE__ */ g("span", {
									className: W.searchItemLabel,
									children: e.label
								})]
							}, e.value)), O.length > rl && /* @__PURE__ */ _("div", {
								className: W.searchEmpty,
								children: [
									"Refine a busca — ",
									O.length - rl,
									" itens ocultos"
								]
							})] }) : /* @__PURE__ */ g("div", {
								className: W.searchEmpty,
								children: "Nenhum resultado."
							})
						}),
						d && /* @__PURE__ */ g("div", {
							className: W.searchFooter,
							children: /* @__PURE__ */ _("button", {
								type: "button",
								tabIndex: -1,
								className: W.searchCriar,
								onClick: M,
								children: [/* @__PURE__ */ g(Re, { size: 14 }), /* @__PURE__ */ _("span", { children: [f, v.trim() ? ` "${v.trim()}"` : ""] })]
							})
						})
					]
				}) })]
			}),
			a && /* @__PURE__ */ g("span", {
				className: W.errorMessage,
				children: a
			})
		]
	});
}
il.displayName = "Combobox";
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
}, al = (e) => {
	if (!+e) return "0 Bytes";
	let t = 1024, n = [
		"Bytes",
		"KB",
		"MB",
		"GB"
	], r = Math.floor(Math.log(e) / Math.log(t));
	return `${parseFloat((e / t ** +r).toFixed(2))} ${n[r]}`;
}, ol = a(({ className: e, onFileSelect: t, accept: n, maxSize: r = 5 * 1024 * 1024, label: i, error: a, id: o, ...s }, c) => {
	let [l, u] = p("idle"), [d, m] = p(null), [h, v] = p(""), y = f(null), b = !!a || !!h, x = a || h, S = o || (i ? `fileupload-${i.replace(/\s+/g, "-").toLowerCase()}` : void 0), C = (e) => {
		if (r && e.size > r) {
			u("error"), v(`O arquivo excede o limite de ${al(r)}`);
			return;
		}
		v(""), m(e), u("uploading"), setTimeout(() => {
			u("success"), t?.(e);
		}, 1500);
	}, w = (e) => {
		e.preventDefault(), u("idle");
		let t = e.dataTransfer.files?.[0];
		t && C(t);
	}, E = () => {
		m(null), u("idle"), v(""), t?.(null), y.current && (y.current.value = "");
	};
	return /* @__PURE__ */ _("div", {
		...j("FileUpload"),
		className: T(G.container, e),
		children: [
			i && /* @__PURE__ */ g("label", {
				htmlFor: S,
				className: G.label,
				children: i
			}),
			/* @__PURE__ */ _("div", {
				ref: c,
				className: T(G.dropzone, G[l], b && l === "idle" && G.error),
				onDragOver: (e) => {
					e.preventDefault(), u("dragging");
				},
				onDragLeave: () => u("idle"),
				onDrop: w,
				onClick: () => (l === "idle" || l === "error") && y.current?.click(),
				tabIndex: 0,
				onKeyDown: (e) => (e.key === "Enter" || e.key === " ") && y.current?.click(),
				...s,
				children: [
					/* @__PURE__ */ g("input", {
						id: S,
						type: "file",
						className: G.hiddenInput,
						accept: n,
						onChange: (e) => e.target.files?.[0] && C(e.target.files[0]),
						ref: y,
						disabled: l === "uploading" || l === "success"
					}),
					(l === "idle" || l === "dragging" || l === "error") && /* @__PURE__ */ _("div", {
						className: G.idleContent,
						children: [
							/* @__PURE__ */ g(Se, {
								size: 40,
								className: T(G.uploadIcon, b && G.uploadIconError)
							}),
							/* @__PURE__ */ _(N, {
								variant: "p",
								className: G.uploadText,
								children: [/* @__PURE__ */ g("span", {
									className: G.uploadClickText,
									children: "Clique para enviar"
								}), " ou arraste"]
							}),
							/* @__PURE__ */ _(N, {
								variant: "p",
								className: G.uploadHint,
								children: ["Até ", al(r)]
							})
						]
					}),
					l === "uploading" && /* @__PURE__ */ _("div", {
						className: G.uploadingContent,
						children: [/* @__PURE__ */ g(Qe, {
							size: "lg",
							className: G.spinner
						}), /* @__PURE__ */ g(N, {
							variant: "p",
							className: G.uploadingText,
							children: "Enviando..."
						})]
					}),
					l === "success" && d && /* @__PURE__ */ _("div", {
						className: G.successContent,
						children: [/* @__PURE__ */ g(ye, {
							size: 32,
							className: G.successIcon
						}), /* @__PURE__ */ _("div", {
							className: G.fileCard,
							children: [
								/* @__PURE__ */ g(Oe, {
									size: 20,
									className: G.fileIcon
								}),
								/* @__PURE__ */ _("div", {
									className: G.fileInfo,
									children: [/* @__PURE__ */ g("div", {
										className: G.fileName,
										children: d.name
									}), /* @__PURE__ */ g("div", {
										className: G.fileSize,
										children: al(d.size)
									})]
								}),
								/* @__PURE__ */ g("button", {
									type: "button",
									onClick: (e) => {
										e.stopPropagation(), E();
									},
									className: G.fileClearBtn,
									children: /* @__PURE__ */ g(Ye, { size: 16 })
								})
							]
						})]
					})
				]
			}),
			x && /* @__PURE__ */ g("span", {
				className: G.errorMessage,
				children: x
			})
		]
	});
});
ol.displayName = "FileUpload";
//#endregion
//#region node_modules/@radix-ui/react-visually-hidden/dist/index.mjs
var sl = Object.freeze({
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
}), cl = "VisuallyHidden", ll = e.forwardRef((e, t) => /* @__PURE__ */ g(U.span, {
	...e,
	ref: t,
	style: {
		...sl,
		...e.style
	}
}));
ll.displayName = cl;
var ul = ll, dl = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
], fl = [" ", "Enter"], pl = "Select", [ml, hl, gl] = xt(pl), [_l, vl] = dt(pl, [gl, Vo]), yl = Vo(), [bl, xl] = _l(pl), [Sl, Cl] = _l(pl), wl = (t) => {
	let { __scopeSelect: n, children: r, open: i, defaultOpen: a, onOpenChange: o, value: s, defaultValue: c, onValueChange: l, dir: u, name: d, autoComplete: f, disabled: p, required: m, form: h } = t, v = yl(n), [y, b] = e.useState(null), [x, S] = e.useState(null), [C, w] = e.useState(!1), T = Mt(u), [E, D] = Ot({
		prop: i,
		defaultProp: a ?? !1,
		onChange: o,
		caller: pl
	}), [O, k] = Ot({
		prop: s,
		defaultProp: c,
		onChange: l,
		caller: pl
	}), A = e.useRef(null), j = y ? h || !!y.closest("form") : !0, [M, N] = e.useState(/* @__PURE__ */ new Set()), P = Array.from(M).map((e) => e.props.value).join(";");
	return /* @__PURE__ */ g(rs, {
		...v,
		children: /* @__PURE__ */ _(bl, {
			required: m,
			scope: n,
			trigger: y,
			onTriggerChange: b,
			valueNode: x,
			onValueNodeChange: S,
			valueNodeHasChildren: C,
			onValueNodeHasChildrenChange: w,
			contentId: Tt(),
			value: O,
			onValueChange: k,
			open: E,
			onOpenChange: D,
			dir: T,
			triggerPointerDownPosRef: A,
			disabled: p,
			children: [/* @__PURE__ */ g(ml.Provider, {
				scope: n,
				children: /* @__PURE__ */ g(Sl, {
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
			}), j ? /* @__PURE__ */ _(yu, {
				"aria-hidden": !0,
				required: m,
				tabIndex: -1,
				name: d,
				autoComplete: f,
				value: O,
				onChange: (e) => k(e.target.value),
				disabled: p,
				form: h,
				children: [O === void 0 ? /* @__PURE__ */ g("option", { value: "" }) : null, Array.from(M)]
			}, P) : null]
		})
	});
};
wl.displayName = pl;
var Tl = "SelectTrigger", El = e.forwardRef((t, n) => {
	let { __scopeSelect: r, disabled: i = !1, ...a } = t, o = yl(r), s = xl(Tl, r), c = s.disabled || i, l = H(n, s.onTriggerChange), u = hl(r), d = e.useRef("touch"), [f, p, m] = xu((e) => {
		let t = u().filter((e) => !e.disabled), n = Su(t, e, t.find((e) => e.value === s.value));
		n !== void 0 && s.onValueChange(n.value);
	}), h = (e) => {
		c || (s.onOpenChange(!0), m()), e && (s.triggerPointerDownPosRef.current = {
			x: Math.round(e.pageX),
			y: Math.round(e.pageY)
		});
	};
	return /* @__PURE__ */ g(is, {
		asChild: !0,
		...o,
		children: /* @__PURE__ */ g(U.button, {
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
			"data-placeholder": bu(s.value) ? "" : void 0,
			...a,
			ref: l,
			onClick: V(a.onClick, (e) => {
				e.currentTarget.focus(), d.current !== "mouse" && h(e);
			}),
			onPointerDown: V(a.onPointerDown, (e) => {
				d.current = e.pointerType;
				let t = e.target;
				t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), e.button === 0 && e.ctrlKey === !1 && e.pointerType === "mouse" && (h(e), e.preventDefault());
			}),
			onKeyDown: V(a.onKeyDown, (e) => {
				let t = f.current !== "";
				!(e.ctrlKey || e.altKey || e.metaKey) && e.key.length === 1 && p(e.key), !(t && e.key === " ") && dl.includes(e.key) && (h(), e.preventDefault());
			})
		})
	});
});
El.displayName = Tl;
var Dl = "SelectValue", Ol = e.forwardRef((e, t) => {
	let { __scopeSelect: n, className: r, style: i, children: a, placeholder: o = "", ...s } = e, c = xl(Dl, n), { onValueNodeHasChildrenChange: l } = c, u = a !== void 0, d = H(t, c.onValueNodeChange);
	return St(() => {
		l(u);
	}, [l, u]), /* @__PURE__ */ g(U.span, {
		...s,
		ref: d,
		style: { pointerEvents: "none" },
		children: bu(c.value) ? /* @__PURE__ */ g(h, { children: o }) : a
	});
});
Ol.displayName = Dl;
var kl = "SelectIcon", Al = e.forwardRef((e, t) => {
	let { __scopeSelect: n, children: r, ...i } = e;
	return /* @__PURE__ */ g(U.span, {
		"aria-hidden": !0,
		...i,
		ref: t,
		children: r || "▼"
	});
});
Al.displayName = kl;
var jl = "SelectPortal", Ml = (e) => /* @__PURE__ */ g(cs, {
	asChild: !0,
	...e
});
Ml.displayName = jl;
var Nl = "SelectContent", Pl = e.forwardRef((t, n) => {
	let r = xl(Nl, t.__scopeSelect), [i, a] = e.useState();
	if (St(() => {
		a(new DocumentFragment());
	}, []), !r.open) {
		let e = i;
		return e ? v.createPortal(/* @__PURE__ */ g(Il, {
			scope: t.__scopeSelect,
			children: /* @__PURE__ */ g(ml.Slot, {
				scope: t.__scopeSelect,
				children: /* @__PURE__ */ g("div", { children: t.children })
			})
		}), e) : null;
	}
	return /* @__PURE__ */ g(Bl, {
		...t,
		ref: n
	});
});
Pl.displayName = Nl;
var Fl = 10, [Il, Ll] = _l(Nl), Rl = "SelectContentImpl", zl = /* @__PURE__ */ pt("SelectContent.RemoveScroll"), Bl = e.forwardRef((t, n) => {
	let { __scopeSelect: r, position: i = "item-aligned", onCloseAutoFocus: a, onEscapeKeyDown: o, onPointerDownOutside: s, side: c, sideOffset: l, align: u, alignOffset: d, arrowPadding: f, collisionBoundary: p, collisionPadding: m, sticky: h, hideWhenDetached: _, avoidCollisions: v, ...y } = t, b = xl(Nl, r), [x, S] = e.useState(null), [C, w] = e.useState(null), T = H(n, (e) => S(e)), [E, D] = e.useState(null), [O, k] = e.useState(null), A = hl(r), [j, M] = e.useState(!1), N = e.useRef(!1);
	e.useEffect(() => {
		if (x) return _s(x);
	}, [x]), ai();
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
	let [ee, R] = xu((e) => {
		let t = A().filter((e) => !e.disabled), n = Su(t, e, t.find((e) => e.ref.current === document.activeElement));
		n && setTimeout(() => n.ref.current.focus());
	}), te = e.useCallback((e, t, n) => {
		let r = !N.current && !n;
		(b.value !== void 0 && b.value === t || r) && (D(e), r && (N.current = !0));
	}, [b.value]), ne = e.useCallback(() => x?.focus(), [x]), re = e.useCallback((e, t, n) => {
		let r = !N.current && !n;
		(b.value !== void 0 && b.value === t || r) && k(e);
	}, [b.value]), z = i === "popper" ? Wl : Hl, ie = z === Wl ? {
		side: c,
		sideOffset: l,
		align: u,
		alignOffset: d,
		arrowPadding: f,
		collisionBoundary: p,
		collisionPadding: m,
		sticky: h,
		hideWhenDetached: _,
		avoidCollisions: v
	} : {};
	return /* @__PURE__ */ g(Il, {
		scope: r,
		content: x,
		viewport: C,
		onViewportChange: w,
		itemRefCallback: te,
		selectedItem: E,
		onItemLeave: ne,
		itemTextRefCallback: re,
		focusSelectedItem: F,
		selectedItemText: O,
		position: i,
		isPositioned: j,
		searchRef: ee,
		children: /* @__PURE__ */ g(Ec, {
			as: zl,
			allowPinchZoom: !0,
			children: /* @__PURE__ */ g(di, {
				asChild: !0,
				trapped: b.open,
				onMountAutoFocus: (e) => {
					e.preventDefault();
				},
				onUnmountAutoFocus: V(a, (e) => {
					b.trigger?.focus({ preventScroll: !0 }), e.preventDefault();
				}),
				children: /* @__PURE__ */ g(Zr, {
					asChild: !0,
					disableOutsidePointerEvents: !0,
					onEscapeKeyDown: o,
					onPointerDownOutside: s,
					onFocusOutside: (e) => e.preventDefault(),
					onDismiss: () => b.onOpenChange(!1),
					children: /* @__PURE__ */ g(z, {
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
Bl.displayName = Rl;
var Vl = "SelectItemAlignedPosition", Hl = e.forwardRef((t, n) => {
	let { __scopeSelect: r, onPlaced: i, ...a } = t, o = xl(Nl, r), s = Ll(Nl, r), [c, l] = e.useState(null), [u, d] = e.useState(null), f = H(n, (e) => d(e)), p = hl(r), m = e.useRef(!1), h = e.useRef(!0), { viewport: _, selectedItem: v, selectedItemText: y, focusSelectedItem: b } = s, x = e.useCallback(() => {
		if (o.trigger && o.valueNode && c && u && _ && v && y) {
			let e = o.trigger.getBoundingClientRect(), t = u.getBoundingClientRect(), n = o.valueNode.getBoundingClientRect(), r = y.getBoundingClientRect();
			if (o.dir !== "rtl") {
				let i = r.left - t.left, a = n.left - i, o = e.left - a, s = e.width + o, l = Math.max(s, t.width), u = window.innerWidth - Fl, d = Rn(a, [Fl, Math.max(Fl, u - l)]);
				c.style.minWidth = s + "px", c.style.left = d + "px";
			} else {
				let i = t.right - r.right, a = window.innerWidth - n.right - i, o = window.innerWidth - e.right - a, s = e.width + o, l = Math.max(s, t.width), u = window.innerWidth - Fl, d = Rn(a, [Fl, Math.max(Fl, u - l)]);
				c.style.minWidth = s + "px", c.style.right = d + "px";
			}
			let a = p(), s = window.innerHeight - Fl * 2, l = _.scrollHeight, d = window.getComputedStyle(u), f = parseInt(d.borderTopWidth, 10), h = parseInt(d.paddingTop, 10), g = parseInt(d.borderBottomWidth, 10), b = parseInt(d.paddingBottom, 10), x = f + h + l + b + g, S = Math.min(v.offsetHeight * 5, x), C = window.getComputedStyle(_), w = parseInt(C.paddingTop, 10), T = parseInt(C.paddingBottom, 10), E = e.top + e.height / 2 - Fl, D = s - E, O = v.offsetHeight / 2, k = v.offsetTop + O, A = f + h + k, j = x - A;
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
			c.style.margin = `${Fl}px 0`, c.style.minHeight = S + "px", c.style.maxHeight = s + "px", i?.(), requestAnimationFrame(() => m.current = !0);
		}
	}, [
		p,
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
	St(() => x(), [x]);
	let [S, C] = e.useState();
	return St(() => {
		u && C(window.getComputedStyle(u).zIndex);
	}, [u]), /* @__PURE__ */ g(Gl, {
		scope: r,
		contentWrapper: c,
		shouldExpandOnScrollRef: m,
		onScrollButtonChange: e.useCallback((e) => {
			e && h.current === !0 && (x(), b?.(), h.current = !1);
		}, [x, b]),
		children: /* @__PURE__ */ g("div", {
			ref: l,
			style: {
				display: "flex",
				flexDirection: "column",
				position: "fixed",
				zIndex: S
			},
			children: /* @__PURE__ */ g(U.div, {
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
Hl.displayName = Vl;
var Ul = "SelectPopperPosition", Wl = e.forwardRef((e, t) => {
	let { __scopeSelect: n, align: r = "start", collisionPadding: i = Fl, ...a } = e;
	return /* @__PURE__ */ g(as, {
		...yl(n),
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
Wl.displayName = Ul;
var [Gl, Kl] = _l(Nl, {}), ql = "SelectViewport", Jl = e.forwardRef((t, n) => {
	let { __scopeSelect: r, nonce: i, ...a } = t, o = Ll(ql, r), s = Kl(ql, r), c = H(n, o.onViewportChange), l = e.useRef(0);
	return /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g("style", {
		dangerouslySetInnerHTML: { __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}" },
		nonce: i
	}), /* @__PURE__ */ g(ml.Slot, {
		scope: r,
		children: /* @__PURE__ */ g(U.div, {
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
						let r = window.innerHeight - Fl * 2, i = parseFloat(n.style.minHeight), a = parseFloat(n.style.height), o = Math.max(i, a);
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
Jl.displayName = ql;
var Yl = "SelectGroup", [Xl, Zl] = _l(Yl), Ql = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e, i = Tt();
	return /* @__PURE__ */ g(Xl, {
		scope: n,
		id: i,
		children: /* @__PURE__ */ g(U.div, {
			role: "group",
			"aria-labelledby": i,
			...r,
			ref: t
		})
	});
});
Ql.displayName = Yl;
var $l = "SelectLabel", eu = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e, i = Zl($l, n);
	return /* @__PURE__ */ g(U.div, {
		id: i.id,
		...r,
		ref: t
	});
});
eu.displayName = $l;
var tu = "SelectItem", [nu, ru] = _l(tu), iu = e.forwardRef((t, n) => {
	let { __scopeSelect: r, value: i, disabled: a = !1, textValue: o, ...s } = t, c = xl(tu, r), l = Ll(tu, r), u = c.value === i, [d, f] = e.useState(o ?? ""), [p, m] = e.useState(!1), h = H(n, (e) => l.itemRefCallback?.(e, i, a)), _ = Tt(), v = e.useRef("touch"), y = () => {
		a || (c.onValueChange(i), c.onOpenChange(!1));
	};
	if (i === "") throw Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
	return /* @__PURE__ */ g(nu, {
		scope: r,
		value: i,
		disabled: a,
		textId: _,
		isSelected: u,
		onItemTextChange: e.useCallback((e) => {
			f((t) => t || (e?.textContent ?? "").trim());
		}, []),
		children: /* @__PURE__ */ g(ml.ItemSlot, {
			scope: r,
			value: i,
			disabled: a,
			textValue: d,
			children: /* @__PURE__ */ g(U.div, {
				role: "option",
				"aria-labelledby": _,
				"data-highlighted": p ? "" : void 0,
				"aria-selected": u && p,
				"data-state": u ? "checked" : "unchecked",
				"aria-disabled": a || void 0,
				"data-disabled": a ? "" : void 0,
				tabIndex: a ? void 0 : -1,
				...s,
				ref: h,
				onFocus: V(s.onFocus, () => m(!0)),
				onBlur: V(s.onBlur, () => m(!1)),
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
					l.searchRef?.current !== "" && e.key === " " || (fl.includes(e.key) && y(), e.key === " " && e.preventDefault());
				})
			})
		})
	});
});
iu.displayName = tu;
var au = "SelectItemText", ou = e.forwardRef((t, n) => {
	let { __scopeSelect: r, className: i, style: a, ...o } = t, s = xl(au, r), c = Ll(au, r), l = ru(au, r), u = Cl(au, r), [d, f] = e.useState(null), p = H(n, (e) => f(e), l.onItemTextChange, (e) => c.itemTextRefCallback?.(e, l.value, l.disabled)), m = d?.textContent, y = e.useMemo(() => /* @__PURE__ */ g("option", {
		value: l.value,
		disabled: l.disabled,
		children: m
	}, l.value), [
		l.disabled,
		l.value,
		m
	]), { onNativeOptionAdd: b, onNativeOptionRemove: x } = u;
	return St(() => (b(y), () => x(y)), [
		b,
		x,
		y
	]), /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g(U.span, {
		id: l.textId,
		...o,
		ref: p
	}), l.isSelected && s.valueNode && !s.valueNodeHasChildren ? v.createPortal(o.children, s.valueNode) : null] });
});
ou.displayName = au;
var su = "SelectItemIndicator", cu = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e;
	return ru(su, n).isSelected ? /* @__PURE__ */ g(U.span, {
		"aria-hidden": !0,
		...r,
		ref: t
	}) : null;
});
cu.displayName = su;
var lu = "SelectScrollUpButton", uu = e.forwardRef((t, n) => {
	let r = Ll(lu, t.__scopeSelect), i = Kl(lu, t.__scopeSelect), [a, o] = e.useState(!1), s = H(n, i.onScrollButtonChange);
	return St(() => {
		if (r.viewport && r.isPositioned) {
			let e = function() {
				o(t.scrollTop > 0);
			}, t = r.viewport;
			return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e);
		}
	}, [r.viewport, r.isPositioned]), a ? /* @__PURE__ */ g(pu, {
		...t,
		ref: s,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: t } = r;
			e && t && (e.scrollTop -= t.offsetHeight);
		}
	}) : null;
});
uu.displayName = lu;
var du = "SelectScrollDownButton", fu = e.forwardRef((t, n) => {
	let r = Ll(du, t.__scopeSelect), i = Kl(du, t.__scopeSelect), [a, o] = e.useState(!1), s = H(n, i.onScrollButtonChange);
	return St(() => {
		if (r.viewport && r.isPositioned) {
			let e = function() {
				let e = t.scrollHeight - t.clientHeight;
				o(Math.ceil(t.scrollTop) < e);
			}, t = r.viewport;
			return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e);
		}
	}, [r.viewport, r.isPositioned]), a ? /* @__PURE__ */ g(pu, {
		...t,
		ref: s,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: t } = r;
			e && t && (e.scrollTop += t.offsetHeight);
		}
	}) : null;
});
fu.displayName = du;
var pu = e.forwardRef((t, n) => {
	let { __scopeSelect: r, onAutoScroll: i, ...a } = t, o = Ll("SelectScrollButton", r), s = e.useRef(null), c = hl(r), l = e.useCallback(() => {
		s.current !== null && (window.clearInterval(s.current), s.current = null);
	}, []);
	return e.useEffect(() => () => l(), [l]), St(() => {
		c().find((e) => e.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
	}, [c]), /* @__PURE__ */ g(U.div, {
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
}), mu = "SelectSeparator", hu = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e;
	return /* @__PURE__ */ g(U.div, {
		"aria-hidden": !0,
		...r,
		ref: t
	});
});
hu.displayName = mu;
var gu = "SelectArrow", _u = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e, i = yl(n), a = xl(gu, n), o = Ll(gu, n);
	return a.open && o.position === "popper" ? /* @__PURE__ */ g(os, {
		...i,
		...r,
		ref: t
	}) : null;
});
_u.displayName = gu;
var vu = "SelectBubbleInput", yu = e.forwardRef(({ __scopeSelect: t, value: n, ...r }, i) => {
	let a = e.useRef(null), o = H(i, a), s = tn(n);
	return e.useEffect(() => {
		let e = a.current;
		if (!e) return;
		let t = window.HTMLSelectElement.prototype, r = Object.getOwnPropertyDescriptor(t, "value").set;
		if (s !== n && r) {
			let t = new Event("change", { bubbles: !0 });
			r.call(e, n), e.dispatchEvent(t);
		}
	}, [s, n]), /* @__PURE__ */ g(U.select, {
		...r,
		style: {
			...sl,
			...r.style
		},
		ref: o,
		defaultValue: n
	});
});
yu.displayName = vu;
function bu(e) {
	return e === "" || e === void 0;
}
function xu(t) {
	let n = Et(t), r = e.useRef(""), i = e.useRef(0), a = e.useCallback((e) => {
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
function Su(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = Cu(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.textValue.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
function Cu(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
var wu = wl, Tu = El, Eu = Ol, Du = Al, Ou = Ml, ku = Pl, Au = Jl, ju = iu, Mu = ou, Nu = cu, K = {
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
}, Pu = 8;
function Fu({ level: t }) {
	let [n, r] = e.useState(!1), [i, a] = e.useState(""), [o, s] = e.useState(t.value ?? t.defaultValue ?? "");
	e.useEffect(() => {
		t.value !== void 0 && s(t.value);
	}, [t.value]);
	let c = t.value === void 0 ? o : t.value, l = t.options.find((e) => e.value === c), u = i.trim().toLowerCase(), d = u ? t.options.filter((e) => e.label.toLowerCase().includes(u)) : t.options, f = (e) => {
		s(e), t.onChange?.(e), r(!1), a("");
	};
	return /* @__PURE__ */ _($c, {
		open: n,
		onOpenChange: (e) => {
			r(e), e || a("");
		},
		children: [/* @__PURE__ */ g(el, {
			asChild: !0,
			disabled: t.disabled,
			children: /* @__PURE__ */ _("button", {
				type: "button",
				className: K.trigger,
				children: [/* @__PURE__ */ _("div", {
					className: K.triggerContent,
					children: [t.icon && /* @__PURE__ */ g(t.icon, {
						size: 16,
						style: {
							color: "var(--color-secundaria)",
							opacity: .7
						}
					}), /* @__PURE__ */ g("span", {
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
				}), /* @__PURE__ */ g(ve, {
					size: 16,
					className: K.triggerIcon
				})]
			})
		}), /* @__PURE__ */ g(tl, { children: /* @__PURE__ */ _(nl, {
			...j("HierarchicalCombobox"),
			className: K.content,
			align: "start",
			sideOffset: 4,
			style: {
				width: 300,
				padding: 0
			},
			children: [/* @__PURE__ */ g("div", {
				className: K.searchBox,
				children: /* @__PURE__ */ _("div", {
					className: K.searchInputWrap,
					children: [/* @__PURE__ */ g(ze, {
						size: 14,
						style: {
							position: "absolute",
							left: 9,
							color: "#9CA3AF"
						}
					}), /* @__PURE__ */ g("input", {
						autoFocus: !0,
						className: K.searchInput,
						value: i,
						onChange: (e) => a(e.target.value),
						placeholder: "Buscar…"
					})]
				})
			}), /* @__PURE__ */ g("div", {
				className: K.searchList,
				children: d.length > 0 ? d.map((e) => /* @__PURE__ */ _("button", {
					type: "button",
					className: T(K.searchItem, e.value === c && K.searchItemActive),
					onClick: () => f(e.value),
					children: [/* @__PURE__ */ g("span", {
						style: {
							width: 16,
							display: "flex",
							flexShrink: 0
						},
						children: e.value === c && /* @__PURE__ */ g(me, { size: 15 })
					}), /* @__PURE__ */ g("span", {
						style: {
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap"
						},
						children: e.label
					})]
				}, e.value)) : /* @__PURE__ */ g("div", {
					className: K.searchEmpty,
					children: "Nenhum resultado."
				})
			})]
		}) })]
	});
}
function Iu({ levels: t, className: n }) {
	return /* @__PURE__ */ g("div", {
		...j("HierarchicalCombobox"),
		className: T(K.container, n),
		children: t.map((n, r) => {
			let i = n.options.length === 1;
			return /* @__PURE__ */ _(e.Fragment, { children: [/* @__PURE__ */ _("div", {
				className: K.levelWrapper,
				children: [n.label && /* @__PURE__ */ g(N, {
					as: "label",
					variant: "p",
					className: K.levelLabel,
					style: { color: "color-mix(in srgb, var(--color-secundaria), transparent 30%)" },
					children: n.label
				}), i ? /* @__PURE__ */ g("div", {
					className: K.trigger,
					style: {
						background: "transparent",
						border: "none",
						boxShadow: "none",
						paddingLeft: 0,
						cursor: "default",
						paddingRight: "12px"
					},
					children: /* @__PURE__ */ _("div", {
						className: K.triggerContent,
						children: [n.icon && /* @__PURE__ */ g(n.icon, {
							size: 16,
							style: {
								color: "var(--color-secundaria)",
								opacity: .7
							}
						}), /* @__PURE__ */ g("span", {
							style: {
								fontSize: "14px",
								fontWeight: 500,
								color: "#374151"
							},
							children: n.options[0].label
						})]
					})
				}) : n.options.length > Pu ? /* @__PURE__ */ g(Fu, { level: n }) : /* @__PURE__ */ _(wu, {
					value: n.value,
					defaultValue: n.defaultValue,
					onValueChange: n.onChange,
					disabled: n.disabled,
					children: [/* @__PURE__ */ _(Tu, {
						className: K.trigger,
						children: [/* @__PURE__ */ _("div", {
							className: K.triggerContent,
							children: [n.icon && /* @__PURE__ */ g(n.icon, {
								size: 16,
								style: {
									color: "var(--color-secundaria)",
									opacity: .7
								}
							}), /* @__PURE__ */ g(Eu, { placeholder: n.placeholder || "Selecione..." })]
						}), /* @__PURE__ */ g(Du, {
							asChild: !0,
							children: /* @__PURE__ */ g(ve, {
								size: 16,
								className: K.triggerIcon
							})
						})]
					}), /* @__PURE__ */ g(Ou, { children: /* @__PURE__ */ g(ku, {
						className: K.content,
						position: "popper",
						sideOffset: 4,
						children: /* @__PURE__ */ g(Au, {
							className: K.viewport,
							children: n.options.map((e) => /* @__PURE__ */ _(ju, {
								value: e.value,
								className: K.item,
								children: [/* @__PURE__ */ g("span", {
									className: K.itemIndicator,
									children: /* @__PURE__ */ g(Nu, { children: /* @__PURE__ */ g(me, { size: 16 }) })
								}), /* @__PURE__ */ g(Mu, { children: e.label })]
							}, e.value))
						})
					}) })]
				})]
			}), r < t.length - 1 && /* @__PURE__ */ g("div", {
				className: K.separator,
				children: /* @__PURE__ */ g(_e, {
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
var Lu = {
	container: "_container_kluho_1",
	label: "_label_kluho_17",
	trigger: "_trigger_kluho_29",
	triggerError: "_triggerError_kluho_67",
	inputField: "_inputField_kluho_75",
	errorMessage: "_errorMessage_kluho_103",
	removeTagBtn: "_removeTagBtn_kluho_115"
}, Ru = a(({ className: e, value: t, defaultValue: n, onChange: r, label: i, error: a, id: o, placeholder: s = "Aperte Enter para adicionar...", ...c }, l) => {
	let [u, d] = p(n || []), [f, m] = p(""), h = t === void 0 ? u : t, v = !!a, y = o || (i ? `taginput-${i.replace(/\s+/g, "-").toLowerCase()}` : void 0), b = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			let n = f.trim();
			if (n && !h.includes(n)) {
				let e = [...h, n];
				t === void 0 && d(e), r?.(e), m("");
			}
		}
	}, x = (e) => {
		let n = h.filter((t) => t !== e);
		t === void 0 && d(n), r?.(n);
	};
	return /* @__PURE__ */ _("div", {
		...j("TagInput"),
		className: T(Lu.container, e),
		children: [
			i && /* @__PURE__ */ g("label", {
				htmlFor: y,
				className: Lu.label,
				children: i
			}),
			/* @__PURE__ */ _("div", {
				className: T(Lu.trigger, v && Lu.triggerError),
				onClick: () => document.getElementById(y || "")?.focus(),
				children: [h.map((e) => /* @__PURE__ */ _(I, {
					intent: "primaria",
					variant: "solid",
					children: [e, /* @__PURE__ */ g("button", {
						type: "button",
						className: Lu.removeTagBtn,
						onClick: (t) => {
							t.stopPropagation(), x(e);
						},
						children: /* @__PURE__ */ g(Ye, { size: 12 })
					})]
				}, e)), /* @__PURE__ */ g("input", {
					id: y,
					ref: l,
					type: "text",
					className: Lu.inputField,
					value: f,
					onChange: (e) => m(e.target.value),
					onKeyDown: b,
					placeholder: h.length === 0 ? s : "",
					...c
				})]
			}),
			a && /* @__PURE__ */ g("span", {
				className: Lu.errorMessage,
				children: a
			})
		]
	});
});
Ru.displayName = "TagInput";
//#endregion
//#region node_modules/@radix-ui/react-menu/dist/index.mjs
var zu = ["Enter", " "], Bu = [
	"ArrowDown",
	"PageUp",
	"Home"
], Vu = [
	"ArrowUp",
	"PageDown",
	"End"
], Hu = [...Bu, ...Vu], Uu = {
	ltr: [...zu, "ArrowRight"],
	rtl: [...zu, "ArrowLeft"]
}, Wu = {
	ltr: ["ArrowLeft"],
	rtl: ["ArrowRight"]
}, Gu = "Menu", [Ku, qu, Ju] = xt(Gu), [Yu, Xu] = dt(Gu, [
	Ju,
	Vo,
	Bt
]), Zu = Vo(), Qu = Bt(), [$u, ed] = Yu(Gu), [td, nd] = Yu(Gu), rd = (t) => {
	let { __scopeMenu: n, open: r = !1, children: i, dir: a, onOpenChange: o, modal: s = !0 } = t, c = Zu(n), [l, u] = e.useState(null), d = e.useRef(!1), f = Et(o), p = Mt(a);
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
	}, []), /* @__PURE__ */ g(rs, {
		...c,
		children: /* @__PURE__ */ g($u, {
			scope: n,
			open: r,
			onOpenChange: f,
			content: l,
			onContentChange: u,
			children: /* @__PURE__ */ g(td, {
				scope: n,
				onClose: e.useCallback(() => f(!1), [f]),
				isUsingKeyboardRef: d,
				dir: p,
				modal: s,
				children: i
			})
		})
	});
};
rd.displayName = Gu;
var id = "MenuAnchor", ad = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ g(is, {
		...Zu(n),
		...r,
		ref: t
	});
});
ad.displayName = id;
var od = "MenuPortal", [sd, cd] = Yu(od, { forceMount: void 0 }), ld = (e) => {
	let { __scopeMenu: t, forceMount: n, children: r, container: i } = e, a = ed(od, t);
	return /* @__PURE__ */ g(sd, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ g(rn, {
			present: n || a.open,
			children: /* @__PURE__ */ g(cs, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
};
ld.displayName = od;
var ud = "MenuContent", [dd, fd] = Yu(ud), pd = e.forwardRef((e, t) => {
	let n = cd(ud, e.__scopeMenu), { forceMount: r = n.forceMount, ...i } = e, a = ed(ud, e.__scopeMenu), o = nd(ud, e.__scopeMenu);
	return /* @__PURE__ */ g(Ku.Provider, {
		scope: e.__scopeMenu,
		children: /* @__PURE__ */ g(rn, {
			present: r || a.open,
			children: /* @__PURE__ */ g(Ku.Slot, {
				scope: e.__scopeMenu,
				children: o.modal ? /* @__PURE__ */ g(md, {
					...i,
					ref: t
				}) : /* @__PURE__ */ g(hd, {
					...i,
					ref: t
				})
			})
		})
	});
}), md = e.forwardRef((t, n) => {
	let r = ed(ud, t.__scopeMenu), i = e.useRef(null), a = H(n, i);
	return e.useEffect(() => {
		let e = i.current;
		if (e) return _s(e);
	}, []), /* @__PURE__ */ g(_d, {
		...t,
		ref: a,
		trapFocus: r.open,
		disableOutsidePointerEvents: r.open,
		disableOutsideScroll: !0,
		onFocusOutside: V(t.onFocusOutside, (e) => e.preventDefault(), { checkForDefaultPrevented: !1 }),
		onDismiss: () => r.onOpenChange(!1)
	});
}), hd = e.forwardRef((e, t) => {
	let n = ed(ud, e.__scopeMenu);
	return /* @__PURE__ */ g(_d, {
		...e,
		ref: t,
		trapFocus: !1,
		disableOutsidePointerEvents: !1,
		disableOutsideScroll: !1,
		onDismiss: () => n.onOpenChange(!1)
	});
}), gd = /* @__PURE__ */ pt("MenuContent.ScrollLock"), _d = e.forwardRef((t, n) => {
	let { __scopeMenu: r, loop: i = !1, trapFocus: a, onOpenAutoFocus: o, onCloseAutoFocus: s, disableOutsidePointerEvents: c, onEntryFocus: l, onEscapeKeyDown: u, onPointerDownOutside: d, onFocusOutside: f, onInteractOutside: p, onDismiss: m, disableOutsideScroll: h, ..._ } = t, v = ed(ud, r), y = nd(ud, r), b = Zu(r), x = Qu(r), S = qu(r), [C, w] = e.useState(null), T = e.useRef(null), E = H(n, T, v.onContentChange), D = e.useRef(0), O = e.useRef(""), k = e.useRef(0), A = e.useRef(null), j = e.useRef("right"), M = e.useRef(0), N = h ? Ec : e.Fragment, P = h ? {
		as: gd,
		allowPinchZoom: !0
	} : void 0, F = (e) => {
		let t = O.current + e, n = S().filter((e) => !e.disabled), r = document.activeElement, i = n.find((e) => e.ref.current === r)?.textValue, a = tf(n.map((e) => e.textValue), t, i), o = n.find((e) => e.textValue === a)?.ref.current;
		(function e(t) {
			O.current = t, window.clearTimeout(D.current), t !== "" && (D.current = window.setTimeout(() => e(""), 1e3));
		})(t), o && setTimeout(() => o.focus());
	};
	e.useEffect(() => () => window.clearTimeout(D.current), []), ai();
	let I = e.useCallback((e) => j.current === A.current?.side && rf(e, A.current?.area), []);
	return /* @__PURE__ */ g(dd, {
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
		children: /* @__PURE__ */ g(N, {
			...P,
			children: /* @__PURE__ */ g(di, {
				asChild: !0,
				trapped: a,
				onMountAutoFocus: V(o, (e) => {
					e.preventDefault(), T.current?.focus({ preventScroll: !0 });
				}),
				onUnmountAutoFocus: s,
				children: /* @__PURE__ */ g(Zr, {
					asChild: !0,
					disableOutsidePointerEvents: c,
					onEscapeKeyDown: u,
					onPointerDownOutside: d,
					onFocusOutside: f,
					onInteractOutside: p,
					onDismiss: m,
					children: /* @__PURE__ */ g(Qt, {
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
						children: /* @__PURE__ */ g(as, {
							role: "menu",
							"aria-orientation": "vertical",
							"data-state": Xd(v.open),
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
								if (e.target !== i || !Hu.includes(e.key)) return;
								e.preventDefault();
								let a = S().filter((e) => !e.disabled).map((e) => e.ref.current);
								Vu.includes(e.key) && a.reverse(), $d(a);
							}),
							onBlur: V(t.onBlur, (e) => {
								e.currentTarget.contains(e.target) || (window.clearTimeout(D.current), O.current = "");
							}),
							onPointerMove: V(t.onPointerMove, af((e) => {
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
pd.displayName = ud;
var vd = "MenuGroup", yd = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ g(U.div, {
		role: "group",
		...r,
		ref: t
	});
});
yd.displayName = vd;
var bd = "MenuLabel", xd = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ g(U.div, {
		...r,
		ref: t
	});
});
xd.displayName = bd;
var Sd = "MenuItem", Cd = "menu.itemSelect", wd = e.forwardRef((t, n) => {
	let { disabled: r = !1, onSelect: i, ...a } = t, o = e.useRef(null), s = nd(Sd, t.__scopeMenu), c = fd(Sd, t.__scopeMenu), l = H(n, o), u = e.useRef(!1), d = () => {
		let e = o.current;
		if (!r && e) {
			let t = new CustomEvent(Cd, {
				bubbles: !0,
				cancelable: !0
			});
			e.addEventListener(Cd, (e) => i?.(e), { once: !0 }), bt(e, t), t.defaultPrevented ? u.current = !1 : s.onClose();
		}
	};
	return /* @__PURE__ */ g(Td, {
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
			r || t && e.key === " " || zu.includes(e.key) && (e.currentTarget.click(), e.preventDefault());
		})
	});
});
wd.displayName = Sd;
var Td = e.forwardRef((t, n) => {
	let { __scopeMenu: r, disabled: i = !1, textValue: a, ...o } = t, s = fd(Sd, r), c = Qu(r), l = e.useRef(null), u = H(n, l), [d, f] = e.useState(!1), [p, m] = e.useState("");
	return e.useEffect(() => {
		let e = l.current;
		e && m((e.textContent ?? "").trim());
	}, [o.children]), /* @__PURE__ */ g(Ku.ItemSlot, {
		scope: r,
		disabled: i,
		textValue: a ?? p,
		children: /* @__PURE__ */ g($t, {
			asChild: !0,
			...c,
			focusable: !i,
			children: /* @__PURE__ */ g(U.div, {
				role: "menuitem",
				"data-highlighted": d ? "" : void 0,
				"aria-disabled": i || void 0,
				"data-disabled": i ? "" : void 0,
				...o,
				ref: u,
				onPointerMove: V(t.onPointerMove, af((e) => {
					i ? s.onItemLeave(e) : (s.onItemEnter(e), e.defaultPrevented || e.currentTarget.focus({ preventScroll: !0 }));
				})),
				onPointerLeave: V(t.onPointerLeave, af((e) => s.onItemLeave(e))),
				onFocus: V(t.onFocus, () => f(!0)),
				onBlur: V(t.onBlur, () => f(!1))
			})
		})
	});
}), Ed = "MenuCheckboxItem", Dd = e.forwardRef((e, t) => {
	let { checked: n = !1, onCheckedChange: r, ...i } = e;
	return /* @__PURE__ */ g(Fd, {
		scope: e.__scopeMenu,
		checked: n,
		children: /* @__PURE__ */ g(wd, {
			role: "menuitemcheckbox",
			"aria-checked": Zd(n) ? "mixed" : n,
			...i,
			ref: t,
			"data-state": Qd(n),
			onSelect: V(i.onSelect, () => r?.(Zd(n) ? !0 : !n), { checkForDefaultPrevented: !1 })
		})
	});
});
Dd.displayName = Ed;
var Od = "MenuRadioGroup", [kd, Ad] = Yu(Od, {
	value: void 0,
	onValueChange: () => {}
}), jd = e.forwardRef((e, t) => {
	let { value: n, onValueChange: r, ...i } = e, a = Et(r);
	return /* @__PURE__ */ g(kd, {
		scope: e.__scopeMenu,
		value: n,
		onValueChange: a,
		children: /* @__PURE__ */ g(yd, {
			...i,
			ref: t
		})
	});
});
jd.displayName = Od;
var Md = "MenuRadioItem", Nd = e.forwardRef((e, t) => {
	let { value: n, ...r } = e, i = Ad(Md, e.__scopeMenu), a = n === i.value;
	return /* @__PURE__ */ g(Fd, {
		scope: e.__scopeMenu,
		checked: a,
		children: /* @__PURE__ */ g(wd, {
			role: "menuitemradio",
			"aria-checked": a,
			...r,
			ref: t,
			"data-state": Qd(a),
			onSelect: V(r.onSelect, () => i.onValueChange?.(n), { checkForDefaultPrevented: !1 })
		})
	});
});
Nd.displayName = Md;
var Pd = "MenuItemIndicator", [Fd, Id] = Yu(Pd, { checked: !1 }), Ld = e.forwardRef((e, t) => {
	let { __scopeMenu: n, forceMount: r, ...i } = e, a = Id(Pd, n);
	return /* @__PURE__ */ g(rn, {
		present: r || Zd(a.checked) || a.checked === !0,
		children: /* @__PURE__ */ g(U.span, {
			...i,
			ref: t,
			"data-state": Qd(a.checked)
		})
	});
});
Ld.displayName = Pd;
var Rd = "MenuSeparator", zd = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ g(U.div, {
		role: "separator",
		"aria-orientation": "horizontal",
		...r,
		ref: t
	});
});
zd.displayName = Rd;
var Bd = "MenuArrow", Vd = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ g(os, {
		...Zu(n),
		...r,
		ref: t
	});
});
Vd.displayName = Bd;
var Hd = "MenuSub", [Ud, Wd] = Yu(Hd), Gd = (t) => {
	let { __scopeMenu: n, children: r, open: i = !1, onOpenChange: a } = t, o = ed(Hd, n), s = Zu(n), [c, l] = e.useState(null), [u, d] = e.useState(null), f = Et(a);
	return e.useEffect(() => (o.open === !1 && f(!1), () => f(!1)), [o.open, f]), /* @__PURE__ */ g(rs, {
		...s,
		children: /* @__PURE__ */ g($u, {
			scope: n,
			open: i,
			onOpenChange: f,
			content: u,
			onContentChange: d,
			children: /* @__PURE__ */ g(Ud, {
				scope: n,
				contentId: Tt(),
				triggerId: Tt(),
				trigger: c,
				onTriggerChange: l,
				children: r
			})
		})
	});
};
Gd.displayName = Hd;
var Kd = "MenuSubTrigger", qd = e.forwardRef((t, n) => {
	let r = ed(Kd, t.__scopeMenu), i = nd(Kd, t.__scopeMenu), a = Wd(Kd, t.__scopeMenu), o = fd(Kd, t.__scopeMenu), s = e.useRef(null), { pointerGraceTimerRef: c, onPointerGraceIntentChange: l } = o, u = { __scopeMenu: t.__scopeMenu }, d = e.useCallback(() => {
		s.current && window.clearTimeout(s.current), s.current = null;
	}, []);
	return e.useEffect(() => d, [d]), e.useEffect(() => {
		let e = c.current;
		return () => {
			window.clearTimeout(e), l(null);
		};
	}, [c, l]), /* @__PURE__ */ g(ad, {
		asChild: !0,
		...u,
		children: /* @__PURE__ */ g(Td, {
			id: a.triggerId,
			"aria-haspopup": "menu",
			"aria-expanded": r.open,
			"aria-controls": a.contentId,
			"data-state": Xd(r.open),
			...t,
			ref: lt(n, a.onTriggerChange),
			onClick: (e) => {
				t.onClick?.(e), !(t.disabled || e.defaultPrevented) && (e.currentTarget.focus(), r.open || r.onOpenChange(!0));
			},
			onPointerMove: V(t.onPointerMove, af((e) => {
				o.onItemEnter(e), !e.defaultPrevented && !t.disabled && !r.open && !s.current && (o.onPointerGraceIntentChange(null), s.current = window.setTimeout(() => {
					r.onOpenChange(!0), d();
				}, 100));
			})),
			onPointerLeave: V(t.onPointerLeave, af((e) => {
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
				t.disabled || n && e.key === " " || Uu[i.dir].includes(e.key) && (r.onOpenChange(!0), r.content?.focus(), e.preventDefault());
			})
		})
	});
});
qd.displayName = Kd;
var Jd = "MenuSubContent", Yd = e.forwardRef((t, n) => {
	let r = cd(ud, t.__scopeMenu), { forceMount: i = r.forceMount, ...a } = t, o = ed(ud, t.__scopeMenu), s = nd(ud, t.__scopeMenu), c = Wd(Jd, t.__scopeMenu), l = e.useRef(null), u = H(n, l);
	return /* @__PURE__ */ g(Ku.Provider, {
		scope: t.__scopeMenu,
		children: /* @__PURE__ */ g(rn, {
			present: i || o.open,
			children: /* @__PURE__ */ g(Ku.Slot, {
				scope: t.__scopeMenu,
				children: /* @__PURE__ */ g(_d, {
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
						let t = e.currentTarget.contains(e.target), n = Wu[s.dir].includes(e.key);
						t && n && (o.onOpenChange(!1), c.trigger?.focus(), e.preventDefault());
					})
				})
			})
		})
	});
});
Yd.displayName = Jd;
function Xd(e) {
	return e ? "open" : "closed";
}
function Zd(e) {
	return e === "indeterminate";
}
function Qd(e) {
	return Zd(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function $d(e) {
	let t = document.activeElement;
	for (let n of e) if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function ef(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
function tf(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = ef(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
function nf(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e], s = t[a], c = o.x, l = o.y, u = s.x, d = s.y;
		l > r != d > r && n < (u - c) * (r - l) / (d - l) + c && (i = !i);
	}
	return i;
}
function rf(e, t) {
	return t ? nf({
		x: e.clientX,
		y: e.clientY
	}, t) : !1;
}
function af(e) {
	return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var of = rd, sf = ad, cf = ld, lf = pd, uf = yd, df = xd, ff = wd, pf = Dd, mf = jd, hf = Nd, gf = Ld, _f = zd, vf = Vd, yf = Gd, bf = qd, xf = Yd, Sf = "DropdownMenu", [Cf, wf] = dt(Sf, [Xu]), Tf = Xu(), [Ef, Df] = Cf(Sf), Of = (t) => {
	let { __scopeDropdownMenu: n, children: r, dir: i, open: a, defaultOpen: o, onOpenChange: s, modal: c = !0 } = t, l = Tf(n), u = e.useRef(null), [d, f] = Ot({
		prop: a,
		defaultProp: o ?? !1,
		onChange: s,
		caller: Sf
	});
	return /* @__PURE__ */ g(Ef, {
		scope: n,
		triggerId: Tt(),
		triggerRef: u,
		contentId: Tt(),
		open: d,
		onOpenChange: f,
		onOpenToggle: e.useCallback(() => f((e) => !e), [f]),
		modal: c,
		children: /* @__PURE__ */ g(of, {
			...l,
			open: d,
			onOpenChange: f,
			dir: i,
			modal: c,
			children: r
		})
	});
};
Of.displayName = Sf;
var kf = "DropdownMenuTrigger", Af = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, disabled: r = !1, ...i } = e, a = Df(kf, n);
	return /* @__PURE__ */ g(sf, {
		asChild: !0,
		...Tf(n),
		children: /* @__PURE__ */ g(U.button, {
			type: "button",
			id: a.triggerId,
			"aria-haspopup": "menu",
			"aria-expanded": a.open,
			"aria-controls": a.open ? a.contentId : void 0,
			"data-state": a.open ? "open" : "closed",
			"data-disabled": r ? "" : void 0,
			disabled: r,
			...i,
			ref: lt(t, a.triggerRef),
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
Af.displayName = kf;
var jf = "DropdownMenuPortal", Mf = (e) => {
	let { __scopeDropdownMenu: t, ...n } = e;
	return /* @__PURE__ */ g(cf, {
		...Tf(t),
		...n
	});
};
Mf.displayName = jf;
var Nf = "DropdownMenuContent", Pf = e.forwardRef((t, n) => {
	let { __scopeDropdownMenu: r, ...i } = t, a = Df(Nf, r), o = Tf(r), s = e.useRef(!1);
	return /* @__PURE__ */ g(lf, {
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
Pf.displayName = Nf;
var Ff = "DropdownMenuGroup", If = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ g(uf, {
		...Tf(n),
		...r,
		ref: t
	});
});
If.displayName = Ff;
var Lf = "DropdownMenuLabel", Rf = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ g(df, {
		...Tf(n),
		...r,
		ref: t
	});
});
Rf.displayName = Lf;
var zf = "DropdownMenuItem", Bf = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ g(ff, {
		...Tf(n),
		...r,
		ref: t
	});
});
Bf.displayName = zf;
var Vf = "DropdownMenuCheckboxItem", Hf = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ g(pf, {
		...Tf(n),
		...r,
		ref: t
	});
});
Hf.displayName = Vf;
var Uf = "DropdownMenuRadioGroup", Wf = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ g(mf, {
		...Tf(n),
		...r,
		ref: t
	});
});
Wf.displayName = Uf;
var Gf = "DropdownMenuRadioItem", Kf = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ g(hf, {
		...Tf(n),
		...r,
		ref: t
	});
});
Kf.displayName = Gf;
var qf = "DropdownMenuItemIndicator", Jf = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ g(gf, {
		...Tf(n),
		...r,
		ref: t
	});
});
Jf.displayName = qf;
var Yf = "DropdownMenuSeparator", Xf = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ g(_f, {
		...Tf(n),
		...r,
		ref: t
	});
});
Xf.displayName = Yf;
var Zf = "DropdownMenuArrow", Qf = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ g(vf, {
		...Tf(n),
		...r,
		ref: t
	});
});
Qf.displayName = Zf;
var $f = (e) => {
	let { __scopeDropdownMenu: t, children: n, open: r, onOpenChange: i, defaultOpen: a } = e, o = Tf(t), [s, c] = Ot({
		prop: r,
		defaultProp: a ?? !1,
		onChange: i,
		caller: "DropdownMenuSub"
	});
	return /* @__PURE__ */ g(yf, {
		...o,
		open: s,
		onOpenChange: c,
		children: n
	});
}, ep = "DropdownMenuSubTrigger", tp = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ g(bf, {
		...Tf(n),
		...r,
		ref: t
	});
});
tp.displayName = ep;
var np = "DropdownMenuSubContent", rp = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ g(xf, {
		...Tf(n),
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
rp.displayName = np;
var ip = Of, ap = Af, op = Mf, sp = Pf, cp = If, lp = Rf, up = Bf, dp = Hf, fp = Wf, pp = Kf, mp = Jf, hp = Xf, gp = $f, _p = tp, vp = rp, yp = {
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
}, bp = ip, xp = ap, Sp = cp, Cp = op, wp = gp, Tp = fp, Ep = e.forwardRef(({ className: e, inset: t, children: n, ...r }, i) => /* @__PURE__ */ _(_p, {
	ref: i,
	className: T(yp.subTrigger, t && yp.inset, e),
	...r,
	children: [n, /* @__PURE__ */ g(_e, { className: "ml-auto h-4 w-4" })]
}));
Ep.displayName = _p.displayName;
var Dp = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ g(vp, {
	...j("DropdownMenu"),
	ref: n,
	className: T(yp.subContent, e),
	...t
}));
Dp.displayName = vp.displayName;
var Op = e.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ g(op, { children: /* @__PURE__ */ g(sp, {
	...j("DropdownMenu"),
	ref: r,
	sideOffset: t,
	className: T(yp.content, e),
	...n
}) }));
Op.displayName = sp.displayName;
var kp = e.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ g(up, {
	ref: r,
	className: T(yp.item, t && yp.inset, e),
	...n
}));
kp.displayName = up.displayName;
var Ap = e.forwardRef(({ className: e, children: t, checked: n, ...r }, i) => /* @__PURE__ */ _(dp, {
	ref: i,
	className: T(yp.checkboxItem, e),
	checked: n,
	...r,
	children: [/* @__PURE__ */ g("span", {
		className: yp.indicator,
		children: /* @__PURE__ */ g(mp, { children: /* @__PURE__ */ g(me, { className: "h-4 w-4" }) })
	}), t]
}));
Ap.displayName = dp.displayName;
var jp = e.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ _(pp, {
	ref: r,
	className: T(yp.radioItem, e),
	...n,
	children: [/* @__PURE__ */ g("span", {
		className: yp.indicator,
		children: /* @__PURE__ */ g(mp, { children: /* @__PURE__ */ g(be, { className: "h-2 w-2 fill-current" }) })
	}), t]
}));
jp.displayName = pp.displayName;
var Mp = e.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ g(lp, {
	ref: r,
	className: T(yp.label, t && yp.inset, e),
	...n
}));
Mp.displayName = lp.displayName;
var Np = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ g(hp, {
	ref: n,
	className: T(yp.separator, e),
	...t
}));
Np.displayName = hp.displayName;
var Pp = ({ className: e, ...t }) => /* @__PURE__ */ g("span", {
	className: T(yp.shortcut, e),
	...t
});
Pp.displayName = "DropdownMenuShortcut";
var Fp = {
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
function Ip({ data: e, columns: t, keyExtractor: n, actions: r, onSelectionChange: i, className: a, selectable: o = !0 }) {
	let [s, c] = p(/* @__PURE__ */ new Set()), [l, u] = p(null), f = e.length > 0 && s.size === e.length, m = (t) => {
		let r = t ? new Set(e.map(n)) : /* @__PURE__ */ new Set();
		c(r), i?.(Array.from(r));
	}, h = (e, t) => {
		let n = new Set(s);
		t ? n.add(e) : n.delete(e), c(n), i?.(Array.from(n));
	}, v = (e) => {
		u((t) => ({
			key: e,
			direction: t?.key === e && t.direction === "asc" ? "desc" : "asc"
		}));
	}, y = d(() => l ? [...e].sort((e, t) => {
		let n = e[l.key], r = t[l.key];
		return n < r ? l.direction === "asc" ? -1 : 1 : n > r ? l.direction === "asc" ? 1 : -1 : 0;
	}) : e, [e, l]);
	return /* @__PURE__ */ g("div", {
		...j("DataTable"),
		className: T(Fp.wrapper, a),
		children: /* @__PURE__ */ g("div", {
			className: Fp.scrollContainer,
			children: /* @__PURE__ */ _("table", {
				className: Fp.table,
				children: [/* @__PURE__ */ g("thead", {
					className: Fp.thead,
					children: /* @__PURE__ */ _("tr", { children: [
						o && /* @__PURE__ */ g("th", {
							className: Fp.checkboxCell,
							children: /* @__PURE__ */ g(st, {
								checked: f,
								onChange: (e) => m(e.target.checked)
							})
						}),
						t.map((e, t) => /* @__PURE__ */ g("th", {
							className: Fp.th,
							children: /* @__PURE__ */ _("div", {
								className: Fp.thContent,
								children: [e.header, e.sortable && e.accessorKey && /* @__PURE__ */ g("button", {
									className: Fp.sortButton,
									onClick: () => v(e.accessorKey),
									children: /* @__PURE__ */ g(B, {
										size: 14,
										className: l?.key === e.accessorKey ? Fp.sortIconActive : Fp.sortIconInactive
									})
								})]
							})
						}, t)),
						r && /* @__PURE__ */ g("th", { className: Fp.actionsCell })
					] })
				}), /* @__PURE__ */ g("tbody", { children: y.length === 0 ? /* @__PURE__ */ g("tr", { children: /* @__PURE__ */ g("td", {
					colSpan: 100,
					className: Fp.emptyState,
					children: "Nenhum dado encontrado."
				}) }) : y.map((e) => {
					let i = n(e), a = s.has(i);
					return /* @__PURE__ */ _("tr", {
						className: T(Fp.tr, a && Fp.trSelected),
						children: [
							o && /* @__PURE__ */ g("td", {
								className: Fp.checkboxCell,
								children: /* @__PURE__ */ g(st, {
									checked: a,
									onChange: (e) => h(i, e.target.checked)
								})
							}),
							t.map((t, n) => /* @__PURE__ */ g("td", {
								className: Fp.td,
								children: t.cell ? t.cell(e) : String(e[t.accessorKey] || "")
							}, n)),
							r && /* @__PURE__ */ g("td", {
								className: Fp.actionsCell,
								children: /* @__PURE__ */ _(bp, { children: [/* @__PURE__ */ g(xp, {
									asChild: !0,
									children: /* @__PURE__ */ g(nt, {
										variant: "ghost",
										size: "sm",
										children: /* @__PURE__ */ g(Ee, { size: 16 })
									})
								}), /* @__PURE__ */ _(Op, {
									align: "end",
									children: [
										/* @__PURE__ */ g(Mp, { children: "Ações" }),
										/* @__PURE__ */ g(Np, {}),
										r.map((t, n) => /* @__PURE__ */ g(kp, {
											onClick: () => t.onClick(e),
											className: T(t.isDestructive && Fp.destructiveItem),
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
//#region node_modules/@tanstack/react-table/dist/FlexRender.js
function Lp(e) {
	return Rp(e) || typeof e == "function" || zp(e);
}
function Rp(e) {
	return typeof e == "function" && (() => {
		let t = Object.getPrototypeOf(e);
		return t.prototype && t.prototype.isReactComponent;
	})();
}
function zp(e) {
	return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
function Bp(e, n) {
	return e == null ? null : Lp(e) ? /* @__PURE__ */ t.createElement(e, n) : e;
}
function Vp(e) {
	if ("cell" in e && e.cell) {
		let t = e.cell, n = t.column.columnDef, r = t, i = n;
		return r.getIsAggregated?.() ? Bp(i.aggregatedCell ?? n.cell, t.getContext()) : r.getIsPlaceholder?.() ? null : Bp(n.cell, t.getContext());
	}
	return "header" in e && e.header ? Bp(e.header.column.columnDef.header, e.header.getContext()) : "footer" in e && e.footer ? Bp(e.footer.column.columnDef.footer, e.footer.getContext()) : null;
}
//#endregion
//#region node_modules/@tanstack/store/dist/alien.js
/* @__NO_SIDE_EFFECTS__ */
function Hp({ update: e, notify: t, unwatched: n }) {
	return {
		link: r,
		unlink: i,
		propagate: a,
		checkDirty: o,
		shallowPropagate: s
	};
	function r(e, t, n) {
		let r = t.depsTail;
		if (r !== void 0 && r.dep === e) return;
		let i = r === void 0 ? t.deps : r.nextDep;
		if (i !== void 0 && i.dep === e) {
			i.version = n, t.depsTail = i;
			return;
		}
		let a = e.subsTail;
		if (a !== void 0 && a.version === n && a.sub === t) return;
		let o = t.depsTail = e.subsTail = {
			version: n,
			dep: e,
			sub: t,
			prevDep: r,
			nextDep: i,
			prevSub: a,
			nextSub: void 0
		};
		i !== void 0 && (i.prevDep = o), r === void 0 ? t.deps = o : r.nextDep = o, a === void 0 ? e.subs = o : a.nextSub = o;
	}
	function i(e, t = e.sub) {
		let r = e.dep, i = e.prevDep, a = e.nextDep, o = e.nextSub, s = e.prevSub;
		return a === void 0 ? t.depsTail = i : a.prevDep = i, i === void 0 ? t.deps = a : i.nextDep = a, o === void 0 ? r.subsTail = s : o.prevSub = s, s === void 0 ? (r.subs = o) === void 0 && n(r) : s.nextSub = o, a;
	}
	function a(e) {
		let n = e.nextSub, r;
		top: do {
			let i = e.sub, a = i.flags;
			if (a & 60 ? a & 12 ? a & 4 ? !(a & 48) && c(e, i) ? (i.flags = a | 40, a &= 1) : a = 0 : i.flags = a & -9 | 32 : a = 0 : i.flags = a | 32, a & 2 && t(i), a & 1) {
				let t = i.subs;
				if (t !== void 0) {
					let i = (e = t).nextSub;
					i !== void 0 && (r = {
						value: n,
						prev: r
					}, n = i);
					continue;
				}
			}
			if ((e = n) !== void 0) {
				n = e.nextSub;
				continue;
			}
			for (; r !== void 0;) if (e = r.value, r = r.prev, e !== void 0) {
				n = e.nextSub;
				continue top;
			}
			break;
		} while (!0);
	}
	function o(t, n) {
		let r, i = 0, a = !1;
		top: do {
			let o = t.dep, c = o.flags;
			if (n.flags & 16) a = !0;
			else if ((c & 17) == 17) {
				if (e(o)) {
					let e = o.subs;
					e.nextSub !== void 0 && s(e), a = !0;
				}
			} else if ((c & 33) == 33) {
				(t.nextSub !== void 0 || t.prevSub !== void 0) && (r = {
					value: t,
					prev: r
				}), t = o.deps, n = o, ++i;
				continue;
			}
			if (!a) {
				let e = t.nextDep;
				if (e !== void 0) {
					t = e;
					continue;
				}
			}
			for (; i--;) {
				let i = n.subs, o = i.nextSub !== void 0;
				if (o ? (t = r.value, r = r.prev) : t = i, a) {
					if (e(n)) {
						o && s(i), n = t.sub;
						continue;
					}
					a = !1;
				} else n.flags &= -33;
				n = t.sub;
				let c = t.nextDep;
				if (c !== void 0) {
					t = c;
					continue top;
				}
			}
			return a;
		} while (!0);
	}
	function s(e) {
		do {
			let n = e.sub, r = n.flags;
			(r & 48) == 32 && (n.flags = r | 16, (r & 6) == 2 && t(n));
		} while ((e = e.nextSub) !== void 0);
	}
	function c(e, t) {
		let n = t.depsTail;
		for (; n !== void 0;) {
			if (n === e) return !0;
			n = n.prevDep;
		}
		return !1;
	}
}
//#endregion
//#region node_modules/@tanstack/store/dist/atom.js
function Up(e, t, n) {
	let r = typeof e == "object", i = r ? e : void 0;
	return {
		next: (r ? e.next : e)?.bind(i),
		error: (r ? e.error : t)?.bind(i),
		complete: (r ? e.complete : n)?.bind(i)
	};
}
var Wp = [], Gp = 0, { link: Kp, unlink: qp, propagate: Jp, checkDirty: Yp, shallowPropagate: Xp } = /* @__PURE__ */ Hp({
	update(e) {
		return e._update();
	},
	notify(e) {
		Wp[Qp++] = e, e.flags &= -3;
	},
	unwatched(e) {
		e.depsTail !== void 0 && (e.depsTail = void 0, e.flags = 17, nm(e));
	}
}), Zp = 0, Qp = 0, $p, em = 0;
function tm(e) {
	try {
		++em, e();
	} finally {
		--em || rm();
	}
}
function nm(e) {
	let t = e.depsTail, n = t === void 0 ? e.deps : t.nextDep;
	for (; n !== void 0;) n = qp(n, e);
}
function rm() {
	if (!(em > 0)) {
		for (; Zp < Qp;) {
			let e = Wp[Zp];
			Wp[Zp++] = void 0, e.notify();
		}
		Zp = 0, Qp = 0;
	}
}
function im(e, t) {
	let n = typeof e == "function", r = e, i = {
		_snapshot: n ? void 0 : e,
		subs: void 0,
		subsTail: void 0,
		deps: void 0,
		depsTail: void 0,
		flags: n ? 0 : 1,
		get() {
			return $p !== void 0 && Kp(i, $p, Gp), i._snapshot;
		},
		subscribe(e) {
			let t = Up(e), n = { current: !1 }, r = am(() => {
				i.get(), n.current ? ($p = void 0, t.next?.(i._snapshot)) : n.current = !0;
			});
			return { unsubscribe: () => {
				r.stop();
			} };
		},
		_update(e) {
			let a = $p, o = t?.compare ?? Object.is;
			if (n) $p = i, ++Gp, i.depsTail = void 0;
			else if (e === void 0) return !1;
			n && (i.flags = 5);
			try {
				let t = i._snapshot, a = typeof e == "function" ? e(t) : e === void 0 && n ? r(t) : e;
				return t === void 0 || !o(t, a) ? (i._snapshot = a, !0) : !1;
			} finally {
				$p = a, n && (i.flags &= -5), nm(i);
			}
		}
	};
	return n ? (i.flags = 17, i.get = function() {
		let e = i.flags;
		if (e & 16 || e & 32 && Yp(i.deps, i)) {
			if (i._update()) {
				let e = i.subs;
				e !== void 0 && Xp(e);
			}
		} else e & 32 && (i.flags = e & -33);
		return $p !== void 0 && Kp(i, $p, Gp), i._snapshot;
	}) : i.set = function(e) {
		if (i._update(e)) {
			let e = i.subs;
			e !== void 0 && (Jp(e), Xp(e), rm());
		}
	}, i;
}
function am(e) {
	let t = () => {
		let t = $p;
		$p = n, ++Gp, n.depsTail = void 0, n.flags = 6;
		try {
			return e();
		} finally {
			$p = t, n.flags &= -5, nm(n);
		}
	}, n = {
		deps: void 0,
		depsTail: void 0,
		subs: void 0,
		subsTail: void 0,
		flags: 6,
		notify() {
			let e = this.flags;
			e & 16 || e & 32 && Yp(this.deps, this) ? t() : this.flags = 2;
		},
		stop() {
			this.flags = 0, this.depsTail = void 0, nm(this);
		}
	};
	return t(), n;
}
//#endregion
//#region node_modules/@tanstack/store/dist/shallow.js
function om(e, t) {
	if (Object.is(e, t)) return !0;
	if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
	if (e instanceof Map && t instanceof Map) {
		if (e.size !== t.size) return !1;
		for (let [n, r] of e) if (!t.has(n) || !Object.is(r, t.get(n))) return !1;
		return !0;
	}
	if (e instanceof Set && t instanceof Set) {
		if (e.size !== t.size) return !1;
		for (let n of e) if (!t.has(n)) return !1;
		return !0;
	}
	if (e instanceof Date && t instanceof Date) return e.getTime() === t.getTime();
	let n = sm(e);
	if (n.length !== sm(t).length) return !1;
	for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Object.is(e[n[r]], t[n[r]])) return !1;
	return !0;
}
function sm(e) {
	return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
//#endregion
//#region src/utils/useSyncExternalStoreWithSelector.ts
var cm = Object.is;
function lm(e, t, n, r, i) {
	let a = f(null), o;
	a.current === null ? (o = {
		hasValue: !1,
		value: null
	}, a.current = o) : o = a.current;
	let [s, u] = d(() => {
		let e = !1, a, s, c = (t) => {
			if (!e) {
				e = !0, a = t;
				let n = r(t);
				if (i !== void 0 && o.hasValue) {
					let e = o.value;
					if (i(e, n)) return s = e, e;
				}
				return s = n, n;
			}
			let n = a, c = s;
			if (cm(n, t)) return c;
			let l = r(t);
			return i !== void 0 && i(c, l) ? (a = t, c) : (a = t, s = l, l);
		}, l = n === void 0 ? null : n;
		return [() => c(t()), l === null ? void 0 : () => c(l())];
	}, [
		t,
		n,
		r,
		i
	]), p = m(e, s, u);
	return l(() => {
		o.hasValue = !0, o.value = p;
	}, [p]), c(p), p;
}
//#endregion
//#region node_modules/@tanstack/react-store/dist/useSelector.js
function um(e, t) {
	return e === t;
}
function dm(e, t = (e) => e, n) {
	let r = n?.compare ?? um, i = o((t) => {
		let { unsubscribe: n } = e.subscribe(t);
		return n;
	}, [e]), a = o(() => e.get(), [e]);
	return lm(i, a, a, t, r);
}
//#endregion
//#region node_modules/@tanstack/react-table/dist/Subscribe.js
function fm(e) {
	let t = dm(e.source, e.selector, { compare: om });
	return typeof e.children == "function" ? e.children(t) : e.children;
}
//#endregion
//#region node_modules/@tanstack/table-core/dist/core/reactivity/coreReactivityFeature.utils.js
function pm(e) {
	let t = e;
	return Object.defineProperty(e, "state", { get() {
		return e.get();
	} }), "set" in e && (t.setState = e.set.bind(e)), t;
}
//#endregion
//#region node_modules/@tanstack/table-core/dist/core/reactivity/renderPhaseReactivity.js
function mm(e) {
	let { createAtom: t, batch: n } = e, r = t(0);
	return {
		createOptionsStore: !1,
		wrapExternalAtoms: !1,
		addSubscription: () => {
			throw Error("Feature not supported in current reactivity implementation");
		},
		unmount: () => {
			throw Error("Feature not supported in current reactivity implementation");
		},
		schedule: e.schedule ?? ((e) => queueMicrotask(e)),
		batch: n,
		untrack: (e) => e(),
		createReadonlyAtom: (e, n) => {
			let i = n?.compare ?? Object.is, a = !1, o, s = () => {
				let t = e();
				return (!a || !i(o, t)) && (o = t, a = !0), o;
			}, c = t(() => (r.get(), s()), { compare: i });
			return {
				get: s,
				subscribe: c.subscribe.bind(c)
			};
		},
		createWritableAtom: (e, n) => t(e, { compare: n?.compare }),
		commit: () => {
			r.set((e) => e + 1);
		}
	};
}
function hm(e, t = Object.is) {
	let n = !1, r;
	return {
		get: e.get,
		markCommitted: (e) => {
			r = e, n = !0;
		},
		subscribe: (i) => e.subscribe((e) => {
			(!n || !t(r, e)) && i(e);
		})
	};
}
//#endregion
//#region node_modules/@tanstack/react-table/dist/reactivity.js
function gm() {
	return mm({
		createAtom: im,
		batch: tm
	});
}
//#endregion
//#region node_modules/@tanstack/table-core/dist/utils.js
function _m(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function vm(e) {
	if (Array.isArray(e)) return e.map(vm);
	if (e && typeof e == "object") {
		let t = Object.getPrototypeOf(e);
		if (t !== Object.prototype && t !== null) return e;
		let n = t === null ? bm() : {}, r = Object.keys(e);
		for (let t = 0; t < r.length; t++) {
			let i = r[t];
			Object.defineProperty(n, i, {
				configurable: !0,
				enumerable: !0,
				value: vm(e[i]),
				writable: !0
			});
		}
		return n;
	}
	return e;
}
function ym(e, t) {
	let n = Object.keys(t), r = e;
	for (let e = 0; e < n.length; e++) {
		let i = n[e];
		!i.startsWith("_memo_") && i !== "_cellsCache" && (r[i] = t[i]);
	}
	return e;
}
function bm() {
	return Object.create(null);
}
function xm(e, t) {
	return Object.prototype.hasOwnProperty.call(e, t);
}
function Sm(e, t) {
	return (n) => {
		(t.options.atoms?.[e] ?? t.baseAtoms[e]).set((e) => _m(n, e));
	};
}
function Cm(e) {
	if (typeof e != "object" || !e) return !1;
	if (Array.isArray(e)) return !0;
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}
function wm(e) {
	return Reflect.ownKeys(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
var Tm = 3;
function Em(e, t) {
	return Dm(e, t, Tm);
}
function Dm(e, t, n) {
	if (Object.is(e, t)) return !0;
	if (n <= 0 || !Cm(e) || !Cm(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length)) return !1;
	let r = wm(e), i = wm(t);
	if (r.length !== i.length) return !1;
	let a = e, o = t;
	for (let e = 0; e < r.length; e++) {
		let i = r[e];
		if (!Object.prototype.propertyIsEnumerable.call(t, i) || !Dm(a[i], o[i], n - 1)) return !1;
	}
	return !0;
}
function Om(e, t, n, r = Em) {
	let i = `on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`, a = e.options[i];
	a && a((e) => {
		let t = _m(n, e);
		return r(e, t) ? e : t;
	});
}
function km(e) {
	return e instanceof Function;
}
function Am(e, t) {
	let n = [], r = (e) => {
		e.forEach((e) => {
			n.push(e);
			let i = t(e);
			i.length && r(i);
		});
	};
	return r(e), n;
}
var jm = ({ fn: e, memoDeps: t, onAfterCompare: n, onAfterUpdate: r, onBeforeCompare: i, onBeforeUpdate: a }) => {
	let o = [], s;
	return (c) => {
		i?.();
		let l = t?.(c), u = !l || l.length !== o?.length;
		if (!u && l) {
			for (let e = 0; e < l.length; e++) if (l[e] !== o[e]) {
				u = !0;
				break;
			}
		}
		return n?.(u), u ? (o = l, a?.(), s = e(...l ?? []), r?.(s), s) : s;
	};
};
function Mm(e) {
	let t = !1;
	return () => {
		if (!t) {
			t = !0;
			return;
		}
		e();
	};
}
var Nm = (e, t) => {
	for (e = String(e); e.length < t;) e = " " + e;
	return e;
};
function Pm({ feature: e, fnName: t, objectId: n, onAfterUpdate: r, table: i, ...a }) {
	let o, s, c = 0, l;
	if (process.env.NODE_ENV === "development") {
		let { debugAll: n } = i.options, { parentName: r } = Fm(t, ".");
		l = n || i.options[`debug${(r == "table" ? r : r + "s").replace(r, r.charAt(0).toUpperCase() + r.slice(1))}`] || (e ? i.options[`debug${e.charAt(0).toUpperCase() + e.slice(1)}`] : !1);
	}
	function u(r, o) {
		let s = c === 0 ? "(1st run)" : o ? "(rerun #" + c + ")" : "(cache)";
		c++, console.groupCollapsed(`%c⏱ ${Nm(`${r.toFixed(1)} ms`, 12)} %c${s}%c ${t}%c ${n ? `(${t.split(".")[0]}Id: ${n})` : ""}`, `font-size: .6rem; font-weight: bold; ${o ? `color: hsl(
        ${Math.max(0, Math.min(120 - Math.log10(r) * 60, 120))}deg 100% 31%);` : ""} `, `color: ${c < 2 ? "#FF00FF" : "#FF1493"}`, "color: #666", "color: #87CEEB"), console.info({
			feature: e,
			state: i.store.state,
			deps: a.memoDeps?.toString()
		}), console.trace(), console.groupEnd();
	}
	let d = r ? () => {
		let { schedule: e, untrack: t } = i._reactivity;
		e(() => t(() => r()));
	} : void 0, f = process.env.NODE_ENV === "development" ? {
		onBeforeCompare: () => {},
		onAfterCompare: (e) => {},
		onBeforeUpdate: () => {
			l && (o = performance.now());
		},
		onAfterUpdate: () => {
			l && (s = performance.now(), u(Math.round((s - o) * 100) / 100, !0)), d?.();
		}
	} : { onAfterUpdate: d };
	return jm({
		...a,
		...f
	});
}
function Fm(e, t = "_") {
	let [n, r] = e.replace(t, " ").split(" ");
	return {
		fnKey: r,
		fnName: `${n}.${r}`,
		parentName: n
	};
}
function Im(e, t, n) {
	for (let [r, { fn: i, memoDeps: a }] of Object.entries(n)) {
		let { fnKey: n, fnName: o } = Fm(r);
		t[n] = a ? Pm({
			memoDeps: a,
			fn: i,
			fnName: o,
			table: t,
			feature: e
		}) : i;
	}
}
function Lm(e, t, n, r) {
	for (let [i, { fn: a, memoDeps: o }] of Object.entries(r)) {
		let { fnKey: r, fnName: s } = Fm(i);
		if (o) {
			let i = `_memo_${r}`;
			t[r] = function(...t) {
				if (!this[i]) {
					let t = this;
					this[i] = Pm({
						memoDeps: (e) => o(t, e),
						fn: (...e) => a(t, ...e),
						fnName: s,
						objectId: t.id,
						table: n,
						feature: e
					});
				}
				return this[i](...t);
			};
		} else t[r] = function(...e) {
			return a(this, ...e);
		};
	}
}
//#endregion
//#region node_modules/@tanstack/table-core/dist/core/cells/coreCellsFeature.utils.js
function Rm(e) {
	return e.row.getValue(e.column.id);
}
function zm(e) {
	return e.getValue() ?? e.table.options.renderFallbackValue;
}
function Bm(e) {
	return {
		table: e.table,
		column: e.column,
		row: e.row,
		cell: e,
		getValue: () => e.getValue(),
		renderValue: () => e.renderValue()
	};
}
//#endregion
//#region node_modules/@tanstack/table-core/dist/core/cells/coreCellsFeature.js
var Vm = { assignCellPrototype: (e, t) => {
	Lm("coreCellsFeature", e, t, {
		cell_getValue: { fn: (e) => Rm(e) },
		cell_renderValue: { fn: (e) => zm(e) },
		cell_getContext: {
			fn: (e) => Bm(e),
			memoDeps: (e) => [e]
		}
	});
} };
//#endregion
//#region node_modules/@tanstack/table-core/dist/core/columns/constructColumn.js
function Hm(e) {
	if (!e._columnPrototype) {
		e._columnPrototype = { table: e };
		let t = Object.values(e._features);
		for (let n = 0; n < t.length; n++) t[n].assignColumnPrototype?.(e._columnPrototype, e);
	}
	return e._columnPrototype;
}
function Um(e, t, n, r) {
	let i = {
		...e.getDefaultColumnDef(),
		...t
	}, a = i.accessorKey, o = a === void 0 ? void 0 : String(a), s = i.id ?? o?.replaceAll(".", "_") ?? (typeof i.header == "string" ? i.header : void 0), c;
	if (i.accessorFn) c = i.accessorFn;
	else if (a !== void 0) if (typeof a == "string" && a.includes(".")) {
		let e = a.split(".");
		c = (t) => {
			let n = t;
			for (let t = 0; t < e.length; t++) {
				let r = e[t];
				n = n?.[r], process.env.NODE_ENV === "development" && n === void 0 && console.warn(`"${r}" in deeply nested key "${a}" returned undefined.`);
			}
			return n;
		};
	} else c = (e) => e[i.accessorKey];
	if (!s) throw process.env.NODE_ENV === "development" ? Error(i.accessorFn ? "coreColumnsFeature require an id when using an accessorFn" : "coreColumnsFeature require an id when using a non-string header") : Error();
	let l = Hm(e), u = Object.create(l);
	u.accessorFn = c, u.columnDef = i, u.columns = [], u.depth = n, u.id = `${String(s)}`, u.parent = r;
	let d = e._columnInstanceInitFns;
	for (let e = 0; e < d.length; e++) d[e](u);
	return u;
}
//#endregion
//#region node_modules/@tanstack/table-core/dist/core/featureStubs.js
function Wm(e) {
	return e.getIsVisible?.() ?? !0;
}
function Gm(e) {
	return e.getVisibleLeafColumns?.() ?? e.getAllLeafColumns();
}
function Km(e, t) {
	let n = e, r = t;
	return n.getOrderColumnsFn?.()(r) ?? n._orderGroupedColumns?.(r) ?? t;
}
function qm(e, t, n, r) {
	return e._orderByColumnPinning?.(t, n, r) ?? t;
}
function Jm(e, t) {
	return e._expandRows?.(t) ?? t;
}
function Ym(e) {
	e.autoResetExpanded?.();
}
function Xm(e) {
	e.autoResetPageIndex?.();
}
function Zm(e) {
	e.autoResetSorting?.();
}
function Qm(e) {
	e.autoResetCellSelection?.();
}
//#endregion
//#region node_modules/@tanstack/table-core/dist/core/columns/coreColumnsFeature.utils.js
function $m(e) {
	return [e, ...e.columns.flatMap((e) => e.getFlatColumns())];
}
function eh(e) {
	if (e.columns.length) {
		let t = e.columns.flatMap((e) => e.getLeafColumns());
		return Km(e.table, t);
	}
	return [e];
}
function th(e) {
	return {
		header: (e) => {
			let t = e.header.column.columnDef;
			return t.accessorKey ? t.accessorKey : t.accessorFn ? t.id : null;
		},
		cell: (e) => e.renderValue()?.toString?.() ?? null,
		...Object.values(e._features).reduce((e, t) => Object.assign(e, t.getDefaultColumnDef?.()), {}),
		...e.options.defaultColumn
	};
}
function nh(e, t, n, r = 0) {
	let i = Array(t.length);
	for (let a = 0; a < t.length; a++) {
		if (!(a in t)) continue;
		let o = t[a], s = Um(e, o, r, n), c = o;
		s.columns = c.columns ? nh(e, c.columns, s, r + 1) : [], i[a] = s;
	}
	return i;
}
function rh(e) {
	return nh(e, e.options.columns);
}
function ih(e) {
	return e.getAllColumns().flatMap((e) => e.getFlatColumns());
}
function ah(e) {
	let t = bm(), n = e.getAllFlatColumns();
	for (let e = 0; e < n.length; e++) {
		let r = n[e];
		t[r.id] = r;
	}
	return t;
}
function oh(e) {
	return Km(e, e.getAllColumns().flatMap((e) => e.getLeafColumns()));
}
function sh(e) {
	let t = bm(), n = e.getAllLeafColumns();
	for (let e = 0; e < n.length; e++) {
		let r = n[e];
		t[r.id] = r;
	}
	return t;
}
function ch(e, t) {
	let n = e.getAllFlatColumnsById()[t];
	return process.env.NODE_ENV === "development" && !n && console.warn(`[Table] Column with id '${t}' does not exist.`), n;
}
//#endregion
//#region node_modules/@tanstack/table-core/dist/core/columns/coreColumnsFeature.js
var lh = {
	assignColumnPrototype: (e, t) => {
		Lm("coreColumnsFeature", e, t, {
			column_getFlatColumns: {
				fn: (e) => $m(e),
				memoDeps: (e) => [e.table.options.columns]
			},
			column_getLeafColumns: {
				fn: (e) => eh(e),
				memoDeps: (e) => [
					e.table.atoms.columnOrder?.get(),
					e.table.atoms.grouping?.get(),
					e.table.options.columns,
					e.table.options.groupedColumnMode
				]
			}
		});
	},
	constructTableAPIs: (e) => {
		Im("coreColumnsFeature", e, {
			table_getDefaultColumnDef: {
				fn: () => th(e),
				memoDeps: () => [e.options.defaultColumn]
			},
			table_getAllColumns: {
				fn: () => rh(e),
				memoDeps: () => [e.options.columns]
			},
			table_getAllFlatColumns: {
				fn: () => ih(e),
				memoDeps: () => [e.options.columns]
			},
			table_getAllFlatColumnsById: {
				fn: () => ah(e),
				memoDeps: () => [e.options.columns]
			},
			table_getAllLeafColumns: {
				fn: () => oh(e),
				memoDeps: () => [
					e.atoms.columnOrder?.get(),
					e.atoms.grouping?.get(),
					e.options.columns,
					e.options.groupedColumnMode
				]
			},
			table_getAllLeafColumnsById: {
				fn: () => sh(e),
				memoDeps: () => [e.getAllLeafColumns()]
			},
			table_getColumn: { fn: (t) => ch(e, t) }
		});
	}
};
//#endregion
//#region node_modules/@tanstack/table-core/dist/core/headers/constructHeader.js
function uh(e) {
	if (!e._headerPrototype) {
		e._headerPrototype = { table: e };
		let t = Object.values(e._features);
		for (let n = 0; n < t.length; n++) t[n].assignHeaderPrototype?.(e._headerPrototype, e);
	}
	return e._headerPrototype;
}
function dh(e, t, n) {
	let r = uh(e), i = Object.create(r);
	i.colSpan = 0, i.column = t, i.depth = n.depth, i.headerGroup = null, i.id = n.id ?? t.id, i.index = n.index, i.isPlaceholder = !!n.isPlaceholder, i.placeholderId = n.placeholderId, i.rowSpan = 0, i.subHeaders = [];
	let a = e._headerInstanceInitFns;
	for (let e = 0; e < a.length; e++) a[e](i);
	return i;
}
//#endregion
//#region node_modules/@tanstack/table-core/dist/core/headers/buildHeaderGroups.js
function fh(e, t = 1) {
	let n = t;
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		Wm(i) && i.columns.length && (n = Math.max(n, fh(i.columns, t + 1)));
	}
	return n;
}
function ph(e, t) {
	return e ? `${e}_${t}` : String(t);
}
function mh(e, t, n, r) {
	let i = e ?? "";
	return t && (i = i ? `${i}_${t}` : String(t)), n && (i = i ? `${i}_${n}` : n), r && (i = i ? `${i}_${r}` : r), i;
}
function hh(e, t) {
	let n = 0;
	for (let r = 0; r < e.length; r++) e[r].column === t && n++;
	return n;
}
function gh(e, t, n, r, i, a) {
	let o = {
		depth: t,
		id: ph(r, t),
		headers: []
	}, s = [];
	for (let i = 0; i < e.length; i++) {
		if (!(i in e)) continue;
		let a = e[i], c = s[s.length - 1], l = a.column.depth === o.depth, u, d = !1;
		if (l && a.column.parent ? u = a.column.parent : (u = a.column, d = !0), c && c.column === u) c.subHeaders.push(a);
		else {
			let e = dh(n, u, {
				id: mh(r, t, u.id, a.id),
				isPlaceholder: d,
				placeholderId: d ? String(hh(s, u)) : void 0,
				depth: t,
				index: s.length
			});
			e.subHeaders.push(a), s.push(e);
		}
		o.headers.push(a), a.headerGroup = o;
	}
	for (let e = 0; e < a.length; e++) a[e](o);
	i.push(o), t > 0 && gh(s, t - 1, n, r, i, a);
}
function _h(e) {
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (!Wm(n.column)) continue;
		let r = 0;
		if (n.subHeaders.length) {
			_h(n.subHeaders);
			for (let e = 0; e < n.subHeaders.length; e++) {
				let t = n.subHeaders[e];
				Wm(t.column) && (r += t.colSpan);
			}
		} else r = 1;
		if (n.colSpan = r, n.isPlaceholder && n.subHeaders.length === 1 && n.subHeaders[0].column === n.column) {
			let e = 1, t = n.subHeaders[0];
			for (; t;) t.rowSpan = 0, e++, t = t.subHeaders.length === 1 && t.subHeaders[0].column === n.column ? t.subHeaders[0] : void 0;
			n.rowSpan = e;
		} else n.rowSpan = 1;
	}
}
function vh(e, t, n, r) {
	let i = fh(e), a = [], o = n._headerGroupInstanceInitFns, s = Array(t.length);
	for (let e = 0; e < t.length; e++) e in t && (s[e] = dh(n, t[e], {
		depth: i,
		index: e
	}));
	return gh(s, i - 1, n, r, a, o), a.reverse(), _h(a[0]?.headers ?? []), a;
}
//#endregion
//#region node_modules/@tanstack/table-core/dist/core/headers/coreHeadersFeature.utils.js
function yh(e, t) {
	for (let n = 0; n < e.subHeaders.length; n++) yh(e.subHeaders[n], t);
	t.push(e);
}
function bh(e) {
	let t = [];
	return yh(e, t), t;
}
function xh(e) {
	return {
		column: e.column,
		header: e,
		table: e.column.table
	};
}
function Sh(e) {
	return vh(e.getAllColumns(), qm(e, Gm(e), (e) => e.id), e);
}
function Ch(e) {
	return [...e.getHeaderGroups()].reverse();
}
function wh(e) {
	let t = e.getHeaderGroups(), n = [];
	for (let e = 0; e < t.length; e++) {
		let r = t[e].headers;
		for (let e = 0; e < r.length; e++) n.push(r[e]);
	}
	return n;
}
function Th(e) {
	let t = e.getHeaderGroups()[0]?.headers ?? [], n = [];
	for (let e = 0; e < t.length; e++) {
		let r = t[e].getLeafHeaders();
		for (let e = 0; e < r.length; e++) n.push(r[e]);
	}
	return n;
}
//#endregion
//#region node_modules/@tanstack/table-core/dist/core/headers/coreHeadersFeature.js
var Eh = {
	assignHeaderPrototype: (e, t) => {
		Lm("coreHeadersFeature", e, t, {
			header_getLeafHeaders: {
				fn: (e) => bh(e),
				memoDeps: (e) => [e.column.table.options.columns]
			},
			header_getContext: {
				fn: (e) => xh(e),
				memoDeps: (e) => [e.column.table.options.columns]
			}
		});
	},
	constructTableAPIs: (e) => {
		Im("coreHeadersFeature", e, {
			table_getHeaderGroups: {
				fn: () => Sh(e),
				memoDeps: () => [
					e.options.columns,
					e.atoms.columnOrder?.get(),
					e.atoms.grouping?.get(),
					e.atoms.columnPinning?.get(),
					e.atoms.columnVisibility?.get(),
					e.options.groupedColumnMode
				]
			},
			table_getFooterGroups: {
				fn: () => Ch(e),
				memoDeps: () => [e.getHeaderGroups()]
			},
			table_getFlatHeaders: {
				fn: () => wh(e),
				memoDeps: () => [e.getHeaderGroups()]
			},
			table_getLeafHeaders: {
				fn: () => Th(e),
				memoDeps: () => [e.getHeaderGroups()]
			}
		});
	}
};
//#endregion
//#region node_modules/@tanstack/table-core/dist/core/rows/constructRow.js
function Dh(e) {
	if (!e._rowPrototype) {
		e._rowPrototype = { table: e };
		let t = Object.values(e._features);
		for (let n = 0; n < t.length; n++) t[n].assignRowPrototype?.(e._rowPrototype, e);
	}
	return e._rowPrototype;
}
var Oh = (e, t, n, r, i, a, o) => {
	let s = Dh(e), c = Object.create(s);
	c._displayIndexCache = -1, c._uniqueValuesCache = bm(), c._valuesCache = bm(), c.depth = i, c.id = t, c.index = r, c.original = n, c.parentId = o, c.subRows = a ?? [];
	let l = e._rowInstanceInitFns;
	for (let e = 0; e < l.length; e++) l[e](c);
	return c;
};
//#endregion
//#region node_modules/@tanstack/table-core/dist/core/row-models/createCoreRowModel.js
function kh() {
	return (e) => Pm({
		feature: "coreRowModelsFeature",
		table: e,
		fnName: "table.getCoreRowModel",
		memoDeps: () => [e.options.data],
		fn: () => jh(e, e.options.data),
		onAfterUpdate: Mm(() => {
			Ym(e), Xm(e), Zm(e), Qm(e);
		})
	});
}
function Ah(e, t, n, r = 0, i) {
	let a = [];
	for (let o = 0; o < n.length; o++) {
		let s = n[o], c = Oh(e, e.getRowId(s, o, i), s, o, r, void 0, i?.id);
		t.flatRows.push(c), t.rowsById[c.id] = c, a.push(c), e.options.getSubRows && (c.originalSubRows = e.options.getSubRows(s, o), c.originalSubRows?.length && (c.subRows = Ah(e, t, c.originalSubRows, r + 1, c)));
	}
	return a;
}
function jh(e, t) {
	let n = {
		rows: [],
		flatRows: [],
		rowsById: bm()
	};
	return n.rows = Ah(e, n, t), n;
}
//#endregion
//#region node_modules/@tanstack/table-core/dist/core/row-models/coreRowModelsFeature.utils.js
function Mh(e) {
	return e._rowModels.coreRowModel || (e._rowModels.coreRowModel = e.options.features.coreRowModel?.(e) ?? kh()(e)), e._rowModels.coreRowModel();
}
function Nh(e) {
	return e.getCoreRowModel();
}
function Ph(e) {
	return e._rowModels.filteredRowModel || (e._rowModels.filteredRowModel = e.options.features.filteredRowModel?.(e)), e.options.manualFiltering || !e._rowModels.filteredRowModel ? e.getPreFilteredRowModel() : e._rowModels.filteredRowModel();
}
function Fh(e) {
	return e.getFilteredRowModel();
}
function Ih(e) {
	return e._rowModels.groupedRowModel || (e._rowModels.groupedRowModel = e.options.features.groupedRowModel?.(e)), e.options.manualGrouping || !e._rowModels.groupedRowModel ? e.getPreGroupedRowModel() : e._rowModels.groupedRowModel();
}
function Lh(e) {
	return e.getGroupedRowModel();
}
function Rh(e) {
	return e._rowModels.sortedRowModel || (e._rowModels.sortedRowModel = e.options.features.sortedRowModel?.(e)), e.options.manualSorting || !e._rowModels.sortedRowModel ? e.getPreSortedRowModel() : e._rowModels.sortedRowModel();
}
function zh(e) {
	return e.getSortedRowModel();
}
function Bh(e) {
	return e._rowModels.expandedRowModel || (e._rowModels.expandedRowModel = e.options.features.expandedRowModel?.(e)), e.options.manualExpanding || !e._rowModels.expandedRowModel ? e.getPreExpandedRowModel() : e._rowModels.expandedRowModel();
}
function Vh(e) {
	return e.getExpandedRowModel();
}
function Hh(e) {
	return e._rowModels.paginatedRowModel || (e._rowModels.paginatedRowModel = e.options.features.paginatedRowModel?.(e)), e.options.manualPagination || !e._rowModels.paginatedRowModel ? e.getPrePaginatedRowModel() : e._rowModels.paginatedRowModel();
}
function Uh(e) {
	return e.getPaginatedRowModel();
}
//#endregion
//#region node_modules/@tanstack/table-core/dist/core/row-models/coreRowModelsFeature.js
var Wh = { constructTableAPIs: (e) => {
	Im("coreRowModelsFeature", e, {
		table_getCoreRowModel: { fn: () => Mh(e) },
		table_getPreFilteredRowModel: { fn: () => Nh(e) },
		table_getFilteredRowModel: { fn: () => Ph(e) },
		table_getPreGroupedRowModel: { fn: () => Fh(e) },
		table_getGroupedRowModel: { fn: () => Ih(e) },
		table_getPreSortedRowModel: { fn: () => Lh(e) },
		table_getSortedRowModel: { fn: () => Rh(e) },
		table_getPreExpandedRowModel: { fn: () => zh(e) },
		table_getExpandedRowModel: { fn: () => Bh(e) },
		table_getPrePaginatedRowModel: { fn: () => Vh(e) },
		table_getPaginatedRowModel: { fn: () => Hh(e) },
		table_getRowModel: { fn: () => Uh(e) }
	});
} };
//#endregion
//#region node_modules/@tanstack/table-core/dist/core/cells/constructCell.js
function Gh(e) {
	if (!e._cellPrototype) {
		e._cellPrototype = { table: e };
		let t = Object.values(e._features);
		for (let n = 0; n < t.length; n++) t[n].assignCellPrototype?.(e._cellPrototype, e);
	}
	return e._cellPrototype;
}
function Kh(e, t, n) {
	let r = Gh(n), i = Object.create(r);
	i.column = e, i.id = `${t.id}_${e.id}`, i.row = t;
	let a = n._cellInstanceInitFns;
	for (let e = 0; e < a.length; e++) a[e](i);
	return i;
}
//#endregion
//#region node_modules/@tanstack/table-core/dist/core/rows/coreRowsFeature.utils.js
function qh(e) {
	let t = e.table.getRowsInDisplayOrder(), n = e._displayIndexCache;
	return t[n] === e ? n : -1;
}
function Jh(e) {
	let t = e.getPrePaginatedRowModel(), n = e.options.paginateExpandedRows === !1 ? Jm(e, t).rows : t.rows;
	for (let e = 0; e < n.length; e++) n[e]._displayIndexCache = e;
	return n;
}
function Yh(e, t) {
	if (xm(e._valuesCache, t)) return e._valuesCache[t];
	let n = e.table.getColumn(t);
	if (n?.accessorFn) return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function Xh(e, t) {
	if (xm(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
	let n = e.table.getColumn(t);
	if (n?.accessorFn) return n.columnDef.getUniqueValues ? (e._uniqueValuesCache[t] = n.columnDef.getUniqueValues(e.original, e.index), e._uniqueValuesCache[t]) : (e._uniqueValuesCache[t] = [e.getValue(t)], e._uniqueValuesCache[t]);
}
function Zh(e, t) {
	return e.getValue(t) ?? e.table.options.renderFallbackValue;
}
function Qh(e) {
	return Am(e.subRows, (e) => e.subRows);
}
function $h(e) {
	let t = e.getCoreRowModel().flatRows, n = 0;
	for (let e = 0; e < t.length; e++) n = Math.max(n, t[e].depth);
	return n;
}
function eg(e) {
	if (e.parentId) return e.table.getCoreRowModel().rowsById[e.parentId] ?? e.table.getRow(e.parentId, !0);
}
function tg(e) {
	let t = [], n = e;
	for (;;) {
		let e = n.getParentRow();
		if (!e) break;
		t.push(e), n = e;
	}
	return t.reverse();
}
function ng(e) {
	let t = e.table.getAllLeafColumns(), n = e._cellsCache;
	n ||= e._cellsCache = /* @__PURE__ */ new WeakMap();
	let r = Array(t.length);
	for (let i = 0; i < t.length; i++) {
		let a = t[i], o = n.get(a);
		o || (o = Kh(a, e, e.table), n.set(a, o)), r[i] = o;
	}
	return r;
}
function rg(e) {
	let t = bm(), n = e.getAllCells();
	for (let e = 0; e < n.length; e++) {
		let r = n[e];
		t[r.column.id] = r;
	}
	return t;
}
function ig(e, t, n, r) {
	return t.options.getRowId?.(e, n, r) ?? (r ? `${r.id}.${n}` : String(n));
}
function ag(e, t, n) {
	let r = (n ? e.getPrePaginatedRowModel() : e.getRowModel()).rowsById[t];
	if (!r && (r = e.getCoreRowModel().rowsById[t], !r)) throw process.env.NODE_ENV === "development" ? Error(`getRow could not find row with ID: ${t}`) : Error();
	return r;
}
//#endregion
//#region node_modules/@tanstack/table-core/dist/core/rows/coreRowsFeature.js
var og = {
	assignRowPrototype: (e, t) => {
		Lm("coreRowsFeature", e, t, {
			row_getDisplayIndex: { fn: (e) => qh(e) },
			row_getAllCellsByColumnId: {
				fn: (e) => rg(e),
				memoDeps: (e) => [e.getAllCells()]
			},
			row_getAllCells: {
				fn: (e) => ng(e),
				memoDeps: (e) => [e.table.getAllLeafColumns()]
			},
			row_getLeafRows: {
				fn: (e) => Qh(e),
				memoDeps: (e) => [e.subRows]
			},
			row_getParentRow: { fn: (e) => eg(e) },
			row_getParentRows: { fn: (e) => tg(e) },
			row_getUniqueValues: { fn: (e, t) => Xh(e, t) },
			row_getValue: { fn: (e, t) => Yh(e, t) },
			row_renderValue: { fn: (e, t) => Zh(e, t) }
		});
	},
	constructTableAPIs: (e) => {
		Im("coreRowsFeature", e, {
			table_getRowsInDisplayOrder: {
				fn: () => Jh(e),
				memoDeps: () => [
					e.getPrePaginatedRowModel().rows,
					e.options.paginateExpandedRows,
					e.options.paginateExpandedRows === !1 ? e.atoms.expanded?.get() : void 0
				]
			},
			table_getRowId: { fn: (t, n, r) => ig(t, e, n, r) },
			table_getRow: { fn: (t, n) => ag(e, t, n) },
			table_getMaxSubRowDepth: {
				fn: () => $h(e),
				memoDeps: () => [e.getCoreRowModel()]
			}
		});
	}
};
//#endregion
//#region node_modules/@tanstack/table-core/dist/core/table/coreTablesFeature.utils.js
function sg(e, t, n = (e, t) => e === t) {
	let r = t === void 0 ? e.options.state : t;
	e._reactivity.batch(() => {
		if (r) for (let t in r) {
			let i = e.baseAtoms[t];
			if (!i) continue;
			let a = r[t], o = a === void 0 ? e.initialState[t] : a;
			n(e._reactivity.untrack(() => i.get()), o) || i.set(() => o);
		}
	});
}
function cg(e, t, n = (e, t) => e === t) {
	e._reactivity.batch(() => {
		sg(e, t, n), e._reactivity.commit?.();
	});
}
function lg(e) {
	let t = vm(e.initialState);
	e._reactivity.batch(() => {
		let n = Object.keys(t);
		for (let r = 0; r < n.length; r++) {
			let i = n[r];
			e.baseAtoms[i].set(t[i]);
		}
	});
	let n = Object.values(e._features);
	for (let t = 0; t < n.length; t++) n[t].resetTableInstanceData?.(e);
}
function ug(e, t) {
	let { features: n, atoms: r, initialState: i } = e.options;
	if (!e.options.mergeOptions) return {
		...e.options,
		...t,
		features: n,
		atoms: r,
		initialState: i
	};
	let a = e.options.mergeOptions(e.options, t), o = { ...Object.getOwnPropertyDescriptors(a) };
	return Object.defineProperties(Object.create(Object.getPrototypeOf(a)), {
		...o,
		features: {
			value: n,
			enumerable: !0,
			configurable: !0,
			writable: !0
		},
		atoms: {
			value: r,
			enumerable: !0,
			configurable: !0,
			writable: !0
		},
		initialState: {
			value: i,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}
	});
}
function dg(e, t, n) {
	let r = ug(e, _m(t, e.options));
	e.optionsStore ? e.optionsStore.set(() => r) : e.options = r, n?.syncExternalState !== !1 && cg(e, r.state ?? null);
}
//#endregion
//#region node_modules/@tanstack/table-core/dist/core/coreFeatures.js
var fg = {
	coreCellsFeature: Vm,
	coreColumnsFeature: lh,
	coreHeadersFeature: Eh,
	coreRowModelsFeature: Wh,
	coreRowsFeature: og,
	coreTablesFeature: { constructTableAPIs: (e) => {
		Im("coreTablesFeature", e, {
			table_reset: { fn: () => lg(e) },
			table_setOptions: { fn: (t) => dg(e, t) }
		});
	} }
};
//#endregion
//#region node_modules/@tanstack/table-core/dist/helpers/tableFeatures.js
function pg(e) {
	return e;
}
//#endregion
//#region node_modules/@tanstack/table-core/dist/core/table/constructTable.js
function mg(e, t = {}) {
	return Object.values(e).forEach((e) => {
		t = e.getInitialState?.(t) ?? t;
	}), vm(t);
}
function hg(e) {
	let t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: r, coreRowModel: i, expandedRowModel: a, facetedMinMaxValues: o, facetedRowModel: s, facetedUniqueValues: c, filterFns: l, filterMeta: u, filteredRowModel: d, groupedRowModel: f, paginatedRowModel: p, sortFns: m, sortedRowModel: h, tableMeta: g, ..._ } = e.features, v = {
		_cellInstanceInitFns: [],
		_columnInstanceInitFns: [],
		_features: {
			...fg,
			..._
		},
		_headerGroupInstanceInitFns: [],
		_headerInstanceInitFns: [],
		_reactivity: t,
		_rowInstanceInitFns: [],
		_rowModelFns: {
			aggregationFns: n,
			filterFns: l,
			sortFns: m
		},
		_rowModels: {},
		atoms: {},
		baseAtoms: {}
	}, y = Object.values(v._features), b = {
		...y.reduce((e, t) => Object.assign(e, t.getDefaultTableOptions?.(v)), {}),
		...e
	};
	if (t.wrapExternalAtoms && b.atoms) for (let [e, n] of Object.entries(b.atoms)) {
		let r = n, i = t.createWritableAtom(r.get(), { debugName: `externalAtom/${e}` });
		b.atoms[e] = i;
		let a = !1, o = r.subscribe((e) => {
			a || i.set(e);
		}), s = i.subscribe((e) => {
			a = !0, r.set(e), a = !1;
		});
		t.addSubscription(o), t.addSubscription(s);
	}
	t.createOptionsStore ? (v.optionsStore = t.createWritableAtom(b, { debugName: "table/optionsStore" }), Object.defineProperty(v, "options", {
		configurable: !0,
		enumerable: !0,
		get() {
			return v.optionsStore.get();
		},
		set(e) {
			v.optionsStore.set(() => e);
		}
	})) : v.options = b, v.initialState = mg(v._features, v.options.initialState);
	let x = Object.keys(v.initialState);
	for (let e = 0; e < x.length; e++) {
		let n = x[e];
		v.baseAtoms[n] = t.createWritableAtom(v.initialState[n], { debugName: `table/baseAtoms/${n}` }), v.atoms[n] = t.createReadonlyAtom(() => {
			let e = v.options, t = e.atoms?.[n], r = t ? t.get() : v.baseAtoms[n].get();
			if (t) return r;
			let i = e.state;
			if (i && xm(i, n)) {
				let e = i[n];
				return e === void 0 ? v.initialState[n] : e;
			}
			return r;
		}, { debugName: `table/atoms/${n}` });
	}
	sg(v), v.store = pm(t.createReadonlyAtom(() => {
		let e = {};
		for (let t = 0; t < x.length; t++) {
			let n = x[t];
			e[n] = v.atoms[n].get();
		}
		return e;
	}, {
		compare: om,
		debugName: "table/store"
	}));
	for (let e = 0; e < y.length; e++) {
		let t = y[e];
		t.initTableInstanceData?.(v), t.initCellInstanceData && v._cellInstanceInitFns.push(t.initCellInstanceData.bind(t)), t.initColumnInstanceData && v._columnInstanceInitFns.push(t.initColumnInstanceData.bind(t)), t.initHeaderGroupInstanceData && v._headerGroupInstanceInitFns.push(t.initHeaderGroupInstanceData.bind(t)), t.initHeaderInstanceData && v._headerInstanceInitFns.push(t.initHeaderInstanceData.bind(t)), t.initRowInstanceData && v._rowInstanceInitFns.push(t.initRowInstanceData.bind(t)), t.constructTableAPIs?.(v);
	}
	if (process.env.NODE_ENV === "development" && (e.debugAll || e.debugTable)) {
		let e = Object.keys(v._features), t = Object.entries({
			coreRowModel: i,
			filteredRowModel: d,
			groupedRowModel: f,
			sortedRowModel: h,
			expandedRowModel: a,
			paginatedRowModel: p,
			facetedRowModel: s,
			facetedMinMaxValues: o,
			facetedUniqueValues: c
		}).filter(([, e]) => e).map(([e]) => e), n = Object.keys(v.initialState);
		console.log(`Constructing Table Instance

  Features:   ${e.join("\n              ")}

  Row Models: ${t.length ? t.join("\n              ") : "(none)"}

  States:     ${n.join("\n              ")}\n`, { table: v });
	}
	return v;
}
//#endregion
//#region node_modules/@tanstack/table-core/dist/features/row-sorting/sortFns.js
var gg = /([0-9]+)/gm;
/* @__NO_SIDE_EFFECTS__ */
function _g(e) {
	let t = Object.assign((e, n, r) => {
		let i = e.getValue(r), a = n.getValue(r), o = t.resolveDataValue;
		return o && (i = o(i), a = o(a)), t.sort(i, a, e, n, r);
	}, e);
	return t;
}
var vg = /* @__PURE__ */ _g({
	resolveDataValue: (e) => xg(e).toLowerCase(),
	sort: (e, t) => Sg(e, t)
}), yg = /* @__PURE__ */ _g({ sort: (e, t) => bg(e, t) });
function bg(e, t) {
	return e === t ? 0 : e > t ? 1 : -1;
}
function xg(e) {
	return typeof e == "number" ? isNaN(e) || e === Infinity || e === -Infinity ? "" : String(e) : typeof e == "string" ? e : "";
}
function Sg(e, t) {
	let n = 0, r = 0, i = e.length, a = t.length;
	for (; n < i && r < a;) {
		let i = Cg(e.charCodeAt(n)), a = Cg(t.charCodeAt(r)), o = wg(e, n, i), s = wg(t, r, a);
		if (!i && !a) {
			let i = Tg(e, n, o, t, r, s);
			if (i) return i;
			n = o, r = s;
			continue;
		}
		if (i !== a) return i ? 1 : -1;
		let c = Eg(e, n, o, t, r, s);
		if (c) return c;
		n = o, r = s;
	}
	return Og(e, n) - Og(t, r);
}
function Cg(e) {
	return e >= 48 && e <= 57;
}
function wg(e, t, n) {
	let r = t + 1;
	for (; r < e.length && Cg(e.charCodeAt(r)) === n;) r++;
	return r;
}
function Tg(e, t, n, r, i, a) {
	let o = n - t, s = a - i, c = o < s ? o : s;
	for (let n = 0; n < c; n++) {
		let a = e.charCodeAt(t + n), o = r.charCodeAt(i + n);
		if (a > o) return 1;
		if (o > a) return -1;
	}
	return o > s ? 1 : s > o ? -1 : 0;
}
function Eg(e, t, n, r, i, a) {
	let o = t;
	for (; o < n && e.charCodeAt(o) === 48;) o++;
	let s = i;
	for (; s < a && r.charCodeAt(s) === 48;) s++;
	let c = n - o, l = a - s;
	if (c === 0 && l === 0) return 0;
	if (c <= 15 && l <= 15) {
		let t = Dg(e, o, n), i = Dg(r, s, a);
		return t > i ? 1 : i > t ? -1 : 0;
	}
	let u = parseInt(e.slice(t, n), 10), d = parseInt(r.slice(i, a), 10);
	return u > d ? 1 : d > u ? -1 : 0;
}
function Dg(e, t, n) {
	let r = 0;
	for (let i = t; i < n; i++) r = r * 10 + e.charCodeAt(i) - 48;
	return r;
}
function Og(e, t) {
	let n = 0, r = t;
	for (; r < e.length;) n++, r = wg(e, r, Cg(e.charCodeAt(r)));
	return n;
}
//#endregion
//#region node_modules/@tanstack/table-core/dist/features/row-sorting/rowSortingFeature.utils.js
function kg() {
	return [];
}
function Ag(e, t) {
	Om(e, "sorting", t);
}
function jg(e, t) {
	Ag(e, t ? [] : vm(e.initialState.sorting ?? []));
}
function Mg(e) {
	e.atoms.sorting && (e.options.autoResetAll ?? e.options.autoResetSorting ?? !1) && jg(e);
}
function Ng(e) {
	let t = e.table._rowModelFns.sortFns, n = e.table.getFilteredRowModel().flatRows.slice(0, 10), r, i = !1;
	for (let t = 0; t < n.length; t++) {
		let a = n[t].getValue(e.id);
		if (Object.prototype.toString.call(a) === "[object Date]") {
			r = "datetime";
			break;
		}
		if (typeof a == "string" && (i = !0, a.split(gg).length > 1)) {
			r = "alphanumeric";
			break;
		}
	}
	if (!r && i && (r = "text"), r) {
		let n = t?.[r];
		if (n || (process.env.NODE_ENV === "development" && console.warn(`sortFn '${r}' (auto) for column '${e.id}' is not registered`), r === "alphanumeric" && (n = t?.text)), n) return n;
	}
	return yg;
}
function Pg(e) {
	let t = e.table.getFilteredRowModel().flatRows.slice(0, 10);
	for (let n = 0; n < t.length; n++) {
		let r = t[n].getValue(e.id);
		if (r != null) return typeof r == "string" ? "asc" : "desc";
	}
	return "desc";
}
function Fg(e) {
	let t = e.table._rowModelFns.sortFns;
	if (km(e.columnDef.sortFn)) return e.columnDef.sortFn;
	if (e.columnDef.sortFn === "auto") return Ng(e);
	let n = t?.[e.columnDef.sortFn];
	return process.env.NODE_ENV === "development" && !n && console.warn(`sortFn '${String(e.columnDef.sortFn)}' for column '${e.id}' is not registered`), n ?? yg;
}
function Ig(e, t, n) {
	let r = Rg(e, n && Bg(e)), i = t !== void 0;
	Ag(e.table, (a) => {
		let o = a.findIndex((t) => t.id === e.id), s = o === -1 ? void 0 : a[o], c = [], l, u = i ? t : r === "desc", d = !!(a.length && Bg(e) && n);
		return l = d ? s ? "toggle" : "add" : s ? "toggle" : "replace", l === "toggle" && (i || r || (l = "remove")), l === "add" ? (c = [...a, {
			id: e.id,
			desc: u
		}], c.splice(0, c.length - (e.table.options.maxMultiSortColCount ?? 2 ** 53 - 1))) : c = l === "toggle" ? d ? a.map((t) => t.id === e.id ? {
			...t,
			desc: u
		} : t) : [{
			id: e.id,
			desc: u
		}] : l === "remove" ? d ? a.filter((t) => t.id !== e.id) : [] : [{
			id: e.id,
			desc: u
		}], c;
	});
}
function Lg(e) {
	return e.columnDef.sortDescFirst ?? e.table.options.sortDescFirst ?? Pg(e) === "desc" ? "desc" : "asc";
}
function Rg(e, t) {
	let n = Lg(e), r = Vg(e);
	return r ? r !== n && (e.table.options.enableSortingRemoval ?? !0) && (!t || (e.table.options.enableMultiRemove ?? !0)) ? !1 : r === "desc" ? "asc" : "desc" : n;
}
function zg(e) {
	return (e.columnDef.enableSorting ?? !0) && (e.table.options.enableSorting ?? !0) && !!e.accessorFn;
}
function Bg(e) {
	return e.columnDef.enableMultiSort ?? e.table.options.enableMultiSort ?? !!e.accessorFn;
}
function Vg(e) {
	let t = e.table.atoms.sorting?.get()?.find((t) => t.id === e.id);
	return t ? t.desc ? "desc" : "asc" : !1;
}
function Hg(e) {
	return e.table.atoms.sorting?.get()?.findIndex((t) => t.id === e.id) ?? -1;
}
function Ug(e) {
	Ag(e.table, (t) => t.length ? t.filter((t) => t.id !== e.id) : []);
}
function Wg(e) {
	let t = zg(e);
	return (n) => {
		t && Ig(e, void 0, Bg(e) ? e.table.options.isMultiSortEvent?.(n) : !1);
	};
}
//#endregion
//#region node_modules/@tanstack/table-core/dist/features/row-sorting/rowSortingFeature.js
var Gg = {
	getInitialState(e) {
		return {
			sorting: kg(),
			...e
		};
	},
	getDefaultColumnDef() {
		return {
			sortFn: "auto",
			sortUndefined: 1
		};
	},
	getDefaultTableOptions(e) {
		return {
			autoResetSorting: !1,
			onSortingChange: Sm("sorting", e),
			isMultiSortEvent: (e) => e.shiftKey
		};
	},
	assignColumnPrototype(e, t) {
		Lm("rowSortingFeature", e, t, {
			column_getAutoSortFn: { fn: (e) => Ng(e) },
			column_getAutoSortDir: { fn: (e) => Pg(e) },
			column_getSortFn: { fn: (e) => Fg(e) },
			column_toggleSorting: { fn: (e, t, n) => Ig(e, t, n) },
			column_getFirstSortDir: { fn: (e) => Lg(e) },
			column_getNextSortingOrder: { fn: (e, t) => Rg(e, t) },
			column_getCanSort: { fn: (e) => zg(e) },
			column_getCanMultiSort: { fn: (e) => Bg(e) },
			column_getIsSorted: { fn: (e) => Vg(e) },
			column_getSortIndex: { fn: (e) => Hg(e) },
			column_clearSorting: { fn: (e) => Ug(e) },
			column_getToggleSortingHandler: { fn: (e) => Wg(e) }
		});
	},
	constructTableAPIs(e) {
		Im("rowSortingFeature", e, {
			table_autoResetSorting: { fn: () => Mg(e) },
			table_setSorting: { fn: (t) => Ag(e, t) },
			table_resetSorting: { fn: (t) => jg(e, t) }
		});
	}
};
//#endregion
//#region node_modules/@tanstack/table-core/dist/features/row-sorting/createSortedRowModel.js
function Kg() {
	return (e) => {
		let t = e;
		return Pm({
			feature: "rowSortingFeature",
			table: t,
			fnName: "table.getSortedRowModel",
			memoDeps: () => [t.atoms.sorting?.get(), t.getPreSortedRowModel()],
			fn: () => qg(t),
			onAfterUpdate: Mm(() => Xm(t))
		});
	};
}
function qg(e) {
	let t = e.getPreSortedRowModel(), n = e.atoms.sorting?.get();
	if (!t.rows.length || !n?.length) return t;
	let r = [], i = n.filter((t) => {
		let n = e.getColumn(t.id);
		return n ? zg(n) : !1;
	});
	if (!i.length) return t;
	let a = [];
	for (let t = 0; t < i.length; t++) {
		let n = i[t], r = e.getColumn(n.id);
		r && a.push({
			id: n.id,
			desc: n.desc,
			sortUndefined: r.columnDef.sortUndefined,
			invertSorting: r.columnDef.invertSorting,
			sortFn: Fg(r)
		});
	}
	let o = (e, t) => {
		for (let n = 0; n < a.length; n++) {
			let r = a[n], i = r.sortUndefined, o = r.desc, s = 0;
			if (i) {
				let n = e.getValue(r.id), a = t.getValue(r.id), o = n === void 0, c = a === void 0;
				if (o && c) continue;
				if (o || c) {
					if (i === "first") return o ? -1 : 1;
					if (i === "last") return o ? 1 : -1;
					s = o ? i : -i;
				}
			}
			if (s === 0 && (s = r.sortFn(e, t, r.id)), s !== 0) return o && (s *= -1), r.invertSorting && (s *= -1), s;
		}
		return e.index - t.index;
	}, s = (e) => {
		let t = e.slice();
		t.sort(o);
		let n = !1;
		for (let i = 0; i < t.length; i++) {
			let a = t[i];
			a !== e[i] && (n = !0);
			let o = r.length;
			if (r.push(a), a.subRows.length) {
				let e = s(a.subRows);
				if (e.changed) {
					let s = Object.create(Object.getPrototypeOf(a));
					ym(s, a), s.subRows = e.rows, t[i] = s, r[o] = s, n = !0;
				}
			}
		}
		return {
			rows: t,
			changed: n
		};
	};
	return {
		rows: s(t.rows).rows,
		flatRows: r,
		rowsById: t.rowsById
	};
}
//#endregion
//#region node_modules/@tanstack/react-table/dist/useTable.js
var Jg = typeof window > "u" ? l : u;
function Yg(e, t) {
	let [{ table: n, rootSource: r }] = p(() => {
		let t = hg({
			...e,
			features: {
				coreReactivityFeature: gm(),
				...e.features
			}
		});
		return t.Subscribe = ((e) => fm({
			...e,
			source: e.source ?? t.store
		})), t.FlexRender = Vp, {
			table: t,
			rootSource: hm(t.store, om)
		};
	}), i = n;
	dg(i, (t) => ({
		...t,
		...e
	}), { syncExternalState: !1 });
	let a = i.options.state, o = r.get(), s = dm(r, t, { compare: om });
	return Jg(() => {
		r.markCommitted(o), cg(i, a ?? null, om);
	}), d(() => ({
		...n,
		options: e,
		state: s
	}), [
		n,
		e,
		s
	]);
}
//#endregion
//#region src/hooks/useAlturaDisponivel.ts
function Xg(e = 260) {
	let t = f(null), [n, r] = p();
	return l(() => {
		let n = () => {
			let n = t.current;
			if (!n) return;
			let i = n.closest("main > div"), a = i ? parseFloat(getComputedStyle(i).paddingBottom) || 0 : 32, o = n.getBoundingClientRect().top;
			r(Math.max(e, Math.floor(window.innerHeight - o - a)));
		};
		n(), window.addEventListener("resize", n);
		let i = new ResizeObserver(n);
		return i.observe(document.body), t.current?.parentElement && i.observe(t.current.parentElement), () => {
			window.removeEventListener("resize", n), i.disconnect();
		};
	}, [e]), {
		ref: t,
		altura: n
	};
}
//#endregion
//#region src/utils/format.ts
var Zg = new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL"
}), Qg = new Intl.NumberFormat("pt-BR", {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});
function $g(e) {
	return Zg.format(e);
}
function e_(e) {
	return Qg.format(e);
}
var t_ = new Intl.NumberFormat("pt-BR", {
	notation: "compact",
	maximumFractionDigits: 1
});
function n_(e) {
	return t_.format(e);
}
function r_(e) {
	let [t, n, r] = e.slice(0, 10).split("-");
	return `${r}/${n}/${t}`;
}
function i_(e) {
	let t = e.includes("-"), n = e.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
	if (!n) return "";
	let r = parseInt(n.slice(0, 15), 10);
	return ((t ? -r : r) / 100).toFixed(2);
}
function a_(e) {
	if (e === "" || e == null) return "";
	let t = Number(e);
	return Number.isNaN(t) ? "" : `R$ ${Qg.format(t)}`;
}
var o_ = [
	"Jan",
	"Fev",
	"Mar",
	"Abr",
	"Mai",
	"Jun",
	"Jul",
	"Ago",
	"Set",
	"Out",
	"Nov",
	"Dez"
];
function s_(e) {
	let t = Number(e);
	return Number.isFinite(t) ? `${t < 0 ? "−" : ""}${a_(String(Math.abs(t)))}` : "";
}
//#endregion
//#region src/components/Tabela/formato.ts
var c_ = (e) => e == null || typeof e == "string" && !e.trim(), l_ = new Intl.NumberFormat("pt-BR"), u_ = new Intl.NumberFormat("pt-BR", {
	style: "percent",
	minimumFractionDigits: 1,
	maximumFractionDigits: 1
});
function d_(e) {
	return u_.format(e);
}
function f_(e, t) {
	if (c_(t)) return "";
	switch (e.tipo) {
		case "moeda": return $g(Number(t));
		case "moedaSinal": return s_(Number(t));
		case "numero": return l_.format(Number(t));
		case "percentual": return u_.format(Number(t));
		case "data": return r_(String(t));
		default: return String(t);
	}
}
var q = {
	card: "_card_1c3os_3",
	topo: "_topo_1c3os_14",
	icone: "_icone_1c3os_22",
	titulo: "_titulo_1c3os_23",
	subtitulo: "_subtitulo_1c3os_24",
	acoes: "_acoes_1c3os_25",
	botaoTopo: "_botaoTopo_1c3os_26",
	rolagem: "_rolagem_1c3os_38",
	tabela: "_tabela_1c3os_46",
	ordenavel: "_ordenavel_1c3os_63",
	rotuloTh: "_rotuloTh_1c3os_65",
	num: "_num_1c3os_66",
	linha: "_linha_1c3os_78",
	clicavel: "_clicavel_1c3os_79",
	recuo: "_recuo_1c3os_80",
	destaque: "_destaque_1c3os_82",
	apagado: "_apagado_1c3os_83",
	seta: "_seta_1c3os_84",
	semDados: "_semDados_1c3os_86",
	linhaGrupo: "_linhaGrupo_1c3os_89",
	nomeGrupo: "_nomeGrupo_1c3os_92",
	resumoGrupo: "_resumoGrupo_1c3os_97",
	pct: "_pct_1c3os_98",
	linhaTotal: "_linhaTotal_1c3os_100",
	vazio: "_vazio_1c3os_112",
	corta: "_corta_1c3os_113",
	positivo: "_positivo_1c3os_114",
	negativo: "_negativo_1c3os_115",
	selo: "_selo_1c3os_116",
	cadastro: "_cadastro_1c3os_121",
	composta: "_composta_1c3os_125",
	compostaTexto: "_compostaTexto_1c3os_126",
	secundario: "_secundario_1c3os_127"
};
//#endregion
//#region src/components/Tabela/celulas.tsx
function p_() {
	return /* @__PURE__ */ g("span", {
		className: q.vazio,
		title: "(vazio)",
		children: "—"
	});
}
function m_({ col: e, linha: t }) {
	let n = e.valor(t), r = e.secundario?.(t), i = e.depois?.(t), a;
	if (c_(n)) a = /* @__PURE__ */ g(p_, {});
	else if (e.tipo === "selo") a = /* @__PURE__ */ g("span", {
		className: q.selo,
		children: String(n)
	});
	else if (e.tipo === "cadastro") {
		let r = e.cor?.(t) || "var(--color-text-secondary)";
		a = /* @__PURE__ */ g("span", {
			className: q.cadastro,
			style: {
				color: r,
				borderColor: r,
				background: `color-mix(in srgb, ${r} 6%, transparent)`
			},
			children: String(n)
		});
	} else if (e.tipo === "moedaSinal") a = /* @__PURE__ */ g("span", {
		className: Number(n) < 0 ? q.negativo : q.positivo,
		children: f_(e, n)
	});
	else {
		let t = f_(e, n);
		a = e.tipo === "texto" ? /* @__PURE__ */ g("span", {
			className: q.corta,
			title: t,
			children: t
		}) : t;
	}
	return !r && !i ? /* @__PURE__ */ g(h, { children: a }) : /* @__PURE__ */ _("div", {
		className: q.composta,
		children: [/* @__PURE__ */ _("div", {
			className: q.compostaTexto,
			children: [a, r && /* @__PURE__ */ g("div", {
				className: q.secundario,
				children: r
			})]
		}), i]
	});
}
//#endregion
//#region src/components/Tabela/tipos.ts
var h_ = [
	"moeda",
	"moedaSinal",
	"numero",
	"percentual"
], g_ = {
	moeda: 150,
	moedaSinal: 150,
	numero: 100,
	percentual: 90,
	data: 110,
	selo: 90,
	cadastro: 110
}, __ = pg({
	rowSortingFeature: Gg,
	sortedRowModel: Kg(),
	sortFns: {
		alphanumeric: vg,
		basic: yg
	}
}), v_ = 40, y_ = 200, b_ = 120, x_ = (e, [t, n]) => `${e.toLocaleString("pt-BR")} ${e === 1 ? t : n}`;
function S_({ dados: e, colunas: t, chave: r, titulo: i, subtitulo: a, icone: o, acoes: s, agrupar: c, aoClicarLinha: l, rotuloTotal: u = "Total", vazio: f = "Nada para mostrar.", alturaFixa: m = !0, ordenarPor: h, className: v }) {
	let { ref: y, altura: b } = Xg(), [x, S] = p(/* @__PURE__ */ new Set()), C = Yg({
		features: __,
		columns: d(() => t.map((e) => ({
			id: e.id,
			accessorFn: (t) => {
				let n = e.valor(t);
				return n == null || n === "" ? void 0 : n;
			},
			header: e.titulo,
			sortFn: h_.includes(e.tipo) || e.tipo === "data" ? "basic" : "alphanumeric",
			sortDescFirst: h_.includes(e.tipo),
			sortUndefined: "last",
			enableSorting: !e.semOrdenar
		})), [t]),
		data: e,
		getRowId: (e) => r(e),
		initialState: h ? { sorting: [{
			id: h.coluna,
			desc: !!h.decrescente
		}] } : void 0
	}), w = C.getRowModel().rows.map((e) => e.original), E = t.filter((e) => e.somar), D = t.findIndex((e) => e.somar), O = (e, t) => e.reduce((e, n) => e + (Number(t.valor(n)) || 0), 0), k = d(() => new Map(E.map((t) => [t.id, O(e, t)])), [e, t]), A = d(() => {
		if (!c) return null;
		let e = /* @__PURE__ */ new Map();
		for (let t of w) {
			let n = c.por(t);
			e.has(n) || e.set(n, []), e.get(n).push(t);
		}
		let t = [...e.entries()].map(([e, t]) => ({
			chave: e,
			itens: t
		})), n = c.ordem ?? (E.length ? "total" : "entrada");
		if (n === "chave" && t.sort((e, t) => e.chave.localeCompare(t.chave, "pt-BR")), n === "total" && E[0]) {
			let e = E[0];
			t.sort((t, n) => O(n.itens, e) - O(t.itens, e));
		}
		return t;
	}, [w, c]), M = !!l, N = t.length + (M ? 1 : 0), P = x.size === 0, F = (e) => S((t) => {
		let n = new Set(t);
		return n.has(e) ? n.delete(e) : n.add(e), n;
	}), I = (e, n) => t.slice(D).map((t) => {
		if (!t.somar) return /* @__PURE__ */ g("td", {}, t.id);
		let r = e ? O(e, t) : k.get(t.id) ?? 0, i = k.get(t.id) ?? 0;
		return /* @__PURE__ */ _("td", {
			className: q.num,
			children: [/* @__PURE__ */ g("span", {
				className: t.tipo === "moedaSinal" ? r < 0 ? q.negativo : q.positivo : void 0,
				children: f_(t, r)
			}), n && t === E[0] && i !== 0 && /* @__PURE__ */ g("span", {
				className: q.pct,
				children: d_(r / i)
			})]
		}, t.id);
	}), L = (e) => /* @__PURE__ */ _("tr", {
		className: T(q.linha, M && q.clicavel, c && q.recuo),
		onClick: l ? () => l(e) : void 0,
		children: [t.map((t) => /* @__PURE__ */ g("td", {
			className: T(h_.includes(t.tipo) && q.num, t.destaque && q.destaque, t.apagado && q.apagado, t.tipo === "moeda" && t.somar && q.destaque),
			children: /* @__PURE__ */ g(m_, {
				col: t,
				linha: e
			})
		}, t.id)), M && /* @__PURE__ */ g("td", {
			className: q.seta,
			children: /* @__PURE__ */ g(_e, { size: 16 })
		})]
	}, r(e)), ee = !!(i || a || s || c), R = t.reduce((e, t) => {
		let n = t.largura ?? g_[t.tipo];
		return e + (typeof n == "number" ? n : t.tipo === "texto" ? y_ : b_);
	}, M ? v_ : 0);
	return /* @__PURE__ */ _("section", {
		...j("TabelaConsulta"),
		ref: y,
		className: T(q.card, v),
		style: m ? { maxHeight: b } : void 0,
		children: [ee && /* @__PURE__ */ _("div", {
			className: q.topo,
			children: [
				o && /* @__PURE__ */ g("div", {
					className: q.icone,
					children: /* @__PURE__ */ g(o, { size: 20 })
				}),
				(i || a) && /* @__PURE__ */ _("div", {
					style: { minWidth: 0 },
					children: [i && /* @__PURE__ */ g("div", {
						className: q.titulo,
						children: i
					}), a && /* @__PURE__ */ g("div", {
						className: q.subtitulo,
						children: a
					})]
				}),
				/* @__PURE__ */ _("div", {
					className: q.acoes,
					children: [c && A && A.length > 1 && /* @__PURE__ */ g("button", {
						type: "button",
						className: q.botaoTopo,
						onClick: () => S(P ? new Set(A.map((e) => e.chave)) : /* @__PURE__ */ new Set()),
						children: P ? "Abrir todos" : "Fechar todos"
					}), s]
				})
			]
		}), /* @__PURE__ */ g("div", {
			className: q.rolagem,
			children: /* @__PURE__ */ _("table", {
				className: q.tabela,
				style: { minWidth: R },
				children: [
					/* @__PURE__ */ _("colgroup", { children: [t.map((e) => {
						let t = e.largura ?? g_[e.tipo];
						return /* @__PURE__ */ g("col", { style: t === void 0 ? void 0 : { width: t } }, e.id);
					}), M && /* @__PURE__ */ g("col", { style: { width: v_ } })] }),
					/* @__PURE__ */ g("thead", { children: /* @__PURE__ */ _("tr", { children: [C.getHeaderGroups()[0].headers.map((e, n) => {
						let r = t[n], i = e.column.getIsSorted(), a = e.column.getCanSort();
						return /* @__PURE__ */ g("th", {
							className: T(h_.includes(r.tipo) && q.num, a && q.ordenavel),
							"aria-sort": i === "asc" ? "ascending" : i === "desc" ? "descending" : void 0,
							title: r.dica,
							onClick: a ? e.column.getToggleSortingHandler() : void 0,
							children: /* @__PURE__ */ _("span", {
								className: q.rotuloTh,
								children: [
									r.titulo,
									i === "asc" && /* @__PURE__ */ g(oe, { size: 12 }),
									i === "desc" && /* @__PURE__ */ g(ie, { size: 12 })
								]
							})
						}, e.id);
					}), M && /* @__PURE__ */ g("th", { "aria-label": "Abrir" })] }) }),
					/* @__PURE__ */ _("tbody", { children: [e.length === 0 && /* @__PURE__ */ g("tr", { children: /* @__PURE__ */ g("td", {
						colSpan: N,
						className: q.semDados,
						children: f
					}) }), A ? A.map((e) => {
						let t = x.has(e.chave), r = c?.resumo ? c.resumo(e.itens) : x_(e.itens.length, c?.nomeItem ?? ["item", "itens"]);
						return /* @__PURE__ */ _(n, { children: [/* @__PURE__ */ _("tr", {
							className: q.linhaGrupo,
							onClick: () => F(e.chave),
							"aria-expanded": t,
							children: [
								/* @__PURE__ */ g("td", {
									colSpan: D > 0 ? D : N,
									children: /* @__PURE__ */ _("span", {
										className: q.nomeGrupo,
										children: [
											g(t ? he : _e, { size: 15 }),
											c?.rotulo ? c.rotulo(e.chave, e.itens) : e.chave,
											/* @__PURE__ */ _("span", {
												className: q.resumoGrupo,
												children: ["· ", r]
											})
										]
									})
								}),
								D > 0 && I(e.itens, !0),
								D > 0 && M && /* @__PURE__ */ g("td", {})
							]
						}), t && e.itens.map(L)] }, e.chave);
					}) : w.map(L)] }),
					E.length > 0 && e.length > 0 && /* @__PURE__ */ g("tfoot", { children: /* @__PURE__ */ _("tr", {
						className: q.linhaTotal,
						children: [
							D > 0 && /* @__PURE__ */ g("td", {
								colSpan: D,
								children: u
							}),
							I(null, !1),
							M && /* @__PURE__ */ g("td", {})
						]
					}) })
				]
			})
		})]
	});
}
//#endregion
//#region node_modules/date-fns/constants.js
var C_ = 365.2425, w_ = 6048e5, T_ = 864e5, E_ = 3600 * 24;
E_ * 7, E_ * C_ / 12 * 3;
var D_ = Symbol.for("constructDateFrom");
//#endregion
//#region node_modules/date-fns/constructFrom.js
function O_(e, t) {
	return typeof e == "function" ? e(t) : e && typeof e == "object" && D_ in e ? e[D_](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
//#endregion
//#region node_modules/date-fns/toDate.js
function J(e, t) {
	return O_(t || e, e);
}
//#endregion
//#region node_modules/date-fns/addDays.js
function k_(e, t, n) {
	let r = J(e, n?.in);
	return isNaN(t) ? O_(n?.in || e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
//#endregion
//#region node_modules/date-fns/addMonths.js
function A_(e, t, n) {
	let r = J(e, n?.in);
	if (isNaN(t)) return O_(n?.in || e, NaN);
	if (!t) return r;
	let i = r.getDate(), a = O_(n?.in || e, r.getTime());
	return a.setMonth(r.getMonth() + t + 1, 0), i >= a.getDate() ? a : (r.setFullYear(a.getFullYear(), a.getMonth(), i), r);
}
//#endregion
//#region node_modules/date-fns/_lib/defaultOptions.js
var j_ = {};
function M_() {
	return j_;
}
//#endregion
//#region node_modules/date-fns/startOfWeek.js
function N_(e, t) {
	let n = M_(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, i = J(e, t?.in), a = i.getDay(), o = (a < r ? 7 : 0) + a - r;
	return i.setDate(i.getDate() - o), i.setHours(0, 0, 0, 0), i;
}
//#endregion
//#region node_modules/date-fns/startOfISOWeek.js
function P_(e, t) {
	return N_(e, {
		...t,
		weekStartsOn: 1
	});
}
//#endregion
//#region node_modules/date-fns/getISOWeekYear.js
function F_(e, t) {
	let n = J(e, t?.in), r = n.getFullYear(), i = O_(n, 0);
	i.setFullYear(r + 1, 0, 4), i.setHours(0, 0, 0, 0);
	let a = P_(i), o = O_(n, 0);
	o.setFullYear(r, 0, 4), o.setHours(0, 0, 0, 0);
	let s = P_(o);
	return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= s.getTime() ? r : r - 1;
}
//#endregion
//#region node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js
function I_(e) {
	let t = J(e), n = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()));
	return n.setUTCFullYear(t.getFullYear()), e - +n;
}
//#endregion
//#region node_modules/date-fns/_lib/normalizeDates.js
function L_(e, ...t) {
	let n = O_.bind(null, e || t.find((e) => typeof e == "object"));
	return t.map(n);
}
//#endregion
//#region node_modules/date-fns/startOfDay.js
function R_(e, t) {
	let n = J(e, t?.in);
	return n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/date-fns/differenceInCalendarDays.js
function z_(e, t, n) {
	let [r, i] = L_(n?.in, e, t), a = R_(r), o = R_(i), s = +a - I_(a), c = +o - I_(o);
	return Math.round((s - c) / T_);
}
//#endregion
//#region node_modules/date-fns/startOfISOWeekYear.js
function B_(e, t) {
	let n = F_(e, t), r = O_(t?.in || e, 0);
	return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), P_(r);
}
//#endregion
//#region node_modules/date-fns/addWeeks.js
function V_(e, t, n) {
	return k_(e, t * 7, n);
}
//#endregion
//#region node_modules/date-fns/addYears.js
function H_(e, t, n) {
	return A_(e, t * 12, n);
}
//#endregion
//#region node_modules/date-fns/max.js
function U_(e, t) {
	let n, r = t?.in;
	return e.forEach((e) => {
		!r && typeof e == "object" && (r = O_.bind(null, e));
		let t = J(e, r);
		(!n || n < t || isNaN(+t)) && (n = t);
	}), O_(r, n || NaN);
}
//#endregion
//#region node_modules/date-fns/min.js
function W_(e, t) {
	let n, r = t?.in;
	return e.forEach((e) => {
		!r && typeof e == "object" && (r = O_.bind(null, e));
		let t = J(e, r);
		(!n || n > t || isNaN(+t)) && (n = t);
	}), O_(r, n || NaN);
}
//#endregion
//#region node_modules/date-fns/isSameDay.js
function G_(e, t, n) {
	let [r, i] = L_(n?.in, e, t);
	return +R_(r) == +R_(i);
}
//#endregion
//#region node_modules/date-fns/isDate.js
function K_(e) {
	return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
//#endregion
//#region node_modules/date-fns/isValid.js
function q_(e) {
	return !(!K_(e) && typeof e != "number" || isNaN(+J(e)));
}
//#endregion
//#region node_modules/date-fns/differenceInCalendarMonths.js
function J_(e, t, n) {
	let [r, i] = L_(n?.in, e, t), a = r.getFullYear() - i.getFullYear(), o = r.getMonth() - i.getMonth();
	return a * 12 + o;
}
//#endregion
//#region node_modules/date-fns/endOfMonth.js
function Y_(e, t) {
	let n = J(e, t?.in), r = n.getMonth();
	return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
//#endregion
//#region node_modules/date-fns/_lib/normalizeInterval.js
function X_(e, t) {
	let [n, r] = L_(e, t.start, t.end);
	return {
		start: n,
		end: r
	};
}
//#endregion
//#region node_modules/date-fns/eachMonthOfInterval.js
function Z_(e, t) {
	let { start: n, end: r } = X_(t?.in, e), i = +n > +r, a = i ? +n : +r, o = i ? r : n;
	o.setHours(0, 0, 0, 0), o.setDate(1);
	let s = t?.step ?? 1;
	if (!s) return [];
	s < 0 && (s = -s, i = !i);
	let c = [];
	for (; +o <= a;) c.push(O_(n, o)), o.setMonth(o.getMonth() + s);
	return i ? c.reverse() : c;
}
//#endregion
//#region node_modules/date-fns/startOfMonth.js
function Q_(e, t) {
	let n = J(e, t?.in);
	return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/date-fns/endOfYear.js
function $_(e, t) {
	let n = J(e, t?.in), r = n.getFullYear();
	return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
//#endregion
//#region node_modules/date-fns/startOfYear.js
function ev(e, t) {
	let n = J(e, t?.in);
	return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/date-fns/eachYearOfInterval.js
function tv(e, t) {
	let { start: n, end: r } = X_(t?.in, e), i = +n > +r, a = i ? +n : +r, o = i ? r : n;
	o.setHours(0, 0, 0, 0), o.setMonth(0, 1);
	let s = t?.step ?? 1;
	if (!s) return [];
	s < 0 && (s = -s, i = !i);
	let c = [];
	for (; +o <= a;) c.push(O_(n, o)), o.setFullYear(o.getFullYear() + s);
	return i ? c.reverse() : c;
}
//#endregion
//#region node_modules/date-fns/endOfWeek.js
function nv(e, t) {
	let n = M_(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, i = J(e, t?.in), a = i.getDay(), o = (a < r ? -7 : 0) + 6 - (a - r);
	return i.setDate(i.getDate() + o), i.setHours(23, 59, 59, 999), i;
}
//#endregion
//#region node_modules/date-fns/endOfISOWeek.js
function rv(e, t) {
	return nv(e, {
		...t,
		weekStartsOn: 1
	});
}
//#endregion
//#region node_modules/date-fns/locale/en-US/_lib/formatDistance.js
var iv = {
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
}, av = (e, t, n) => {
	let r, i = iv[e];
	return r = typeof i == "string" ? i : t === 1 ? i.one : i.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
//#endregion
//#region node_modules/date-fns/locale/_lib/buildFormatLongFn.js
function ov(e) {
	return (t = {}) => {
		let n = t.width ? String(t.width) : e.defaultWidth;
		return e.formats[n] || e.formats[e.defaultWidth];
	};
}
var sv = {
	date: ov({
		formats: {
			full: "EEEE, MMMM do, y",
			long: "MMMM do, y",
			medium: "MMM d, y",
			short: "MM/dd/yyyy"
		},
		defaultWidth: "full"
	}),
	time: ov({
		formats: {
			full: "h:mm:ss a zzzz",
			long: "h:mm:ss a z",
			medium: "h:mm:ss a",
			short: "h:mm a"
		},
		defaultWidth: "full"
	}),
	dateTime: ov({
		formats: {
			full: "{{date}} 'at' {{time}}",
			long: "{{date}} 'at' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, cv = {
	lastWeek: "'last' eeee 'at' p",
	yesterday: "'yesterday at' p",
	today: "'today at' p",
	tomorrow: "'tomorrow at' p",
	nextWeek: "eeee 'at' p",
	other: "P"
}, lv = (e, t, n, r) => cv[e];
//#endregion
//#region node_modules/date-fns/locale/_lib/buildLocalizeFn.js
function uv(e) {
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
var dv = {
	ordinalNumber: (e, t) => {
		let n = Number(e), r = n % 100;
		if (r > 20 || r < 10) switch (r % 10) {
			case 1: return n + "st";
			case 2: return n + "nd";
			case 3: return n + "rd";
		}
		return n + "th";
	},
	era: uv({
		values: {
			narrow: ["B", "A"],
			abbreviated: ["BC", "AD"],
			wide: ["Before Christ", "Anno Domini"]
		},
		defaultWidth: "wide"
	}),
	quarter: uv({
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
	month: uv({
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
	day: uv({
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
	dayPeriod: uv({
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
function fv(e) {
	return (t, n = {}) => {
		let r = n.width, i = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(i);
		if (!a) return null;
		let o = a[0], s = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(s) ? mv(s, (e) => e.test(o)) : pv(s, (e) => e.test(o)), l;
		l = e.valueCallback ? e.valueCallback(c) : c, l = n.valueCallback ? n.valueCallback(l) : l;
		let u = t.slice(o.length);
		return {
			value: l,
			rest: u
		};
	};
}
function pv(e, t) {
	for (let n in e) if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n])) return n;
}
function mv(e, t) {
	for (let n = 0; n < e.length; n++) if (t(e[n])) return n;
}
//#endregion
//#region node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
function hv(e) {
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
var gv = {
	code: "en-US",
	formatDistance: av,
	formatLong: sv,
	formatRelative: lv,
	localize: dv,
	match: {
		ordinalNumber: hv({
			matchPattern: /^(\d+)(th|st|nd|rd)?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: fv({
			matchPatterns: {
				narrow: /^(b|a)/i,
				abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
				wide: /^(before christ|before common era|anno domini|common era)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^b/i, /^(a|c)/i] },
			defaultParseWidth: "any"
		}),
		quarter: fv({
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
		month: fv({
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
		day: fv({
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
		dayPeriod: fv({
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
function _v(e, t) {
	let n = J(e, t?.in);
	return z_(n, ev(n)) + 1;
}
//#endregion
//#region node_modules/date-fns/getISOWeek.js
function vv(e, t) {
	let n = J(e, t?.in), r = P_(n) - +B_(n);
	return Math.round(r / w_) + 1;
}
//#endregion
//#region node_modules/date-fns/getWeekYear.js
function yv(e, t) {
	let n = J(e, t?.in), r = n.getFullYear(), i = M_(), a = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? i.firstWeekContainsDate ?? i.locale?.options?.firstWeekContainsDate ?? 1, o = O_(t?.in || e, 0);
	o.setFullYear(r + 1, 0, a), o.setHours(0, 0, 0, 0);
	let s = N_(o, t), c = O_(t?.in || e, 0);
	c.setFullYear(r, 0, a), c.setHours(0, 0, 0, 0);
	let l = N_(c, t);
	return +n >= +s ? r + 1 : +n >= +l ? r : r - 1;
}
//#endregion
//#region node_modules/date-fns/startOfWeekYear.js
function bv(e, t) {
	let n = M_(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, i = yv(e, t), a = O_(t?.in || e, 0);
	return a.setFullYear(i, 0, r), a.setHours(0, 0, 0, 0), N_(a, t);
}
//#endregion
//#region node_modules/date-fns/getWeek.js
function xv(e, t) {
	let n = J(e, t?.in), r = N_(n, t) - +bv(n, t);
	return Math.round(r / w_) + 1;
}
//#endregion
//#region node_modules/date-fns/_lib/addLeadingZeros.js
function Y(e, t) {
	return (e < 0 ? "-" : "") + Math.abs(e).toString().padStart(t, "0");
}
//#endregion
//#region node_modules/date-fns/_lib/format/lightFormatters.js
var Sv = {
	y(e, t) {
		let n = e.getFullYear(), r = n > 0 ? n : 1 - n;
		return Y(t === "yy" ? r % 100 : r, t.length);
	},
	M(e, t) {
		let n = e.getMonth();
		return t === "M" ? String(n + 1) : Y(n + 1, 2);
	},
	d(e, t) {
		return Y(e.getDate(), t.length);
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
		return Y(e.getHours() % 12 || 12, t.length);
	},
	H(e, t) {
		return Y(e.getHours(), t.length);
	},
	m(e, t) {
		return Y(e.getMinutes(), t.length);
	},
	s(e, t) {
		return Y(e.getSeconds(), t.length);
	},
	S(e, t) {
		let n = t.length, r = e.getMilliseconds();
		return Y(Math.trunc(r * 10 ** (n - 3)), t.length);
	}
}, Cv = {
	am: "am",
	pm: "pm",
	midnight: "midnight",
	noon: "noon",
	morning: "morning",
	afternoon: "afternoon",
	evening: "evening",
	night: "night"
}, wv = {
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
		return Sv.y(e, t);
	},
	Y: function(e, t, n, r) {
		let i = yv(e, r), a = i > 0 ? i : 1 - i;
		return t === "YY" ? Y(a % 100, 2) : t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : Y(a, t.length);
	},
	R: function(e, t) {
		return Y(F_(e), t.length);
	},
	u: function(e, t) {
		return Y(e.getFullYear(), t.length);
	},
	Q: function(e, t, n) {
		let r = Math.ceil((e.getMonth() + 1) / 3);
		switch (t) {
			case "Q": return String(r);
			case "QQ": return Y(r, 2);
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
			case "qq": return Y(r, 2);
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
			case "MM": return Sv.M(e, t);
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
			case "LL": return Y(r + 1, 2);
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
		let i = xv(e, r);
		return t === "wo" ? n.ordinalNumber(i, { unit: "week" }) : Y(i, t.length);
	},
	I: function(e, t, n) {
		let r = vv(e);
		return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : Y(r, t.length);
	},
	d: function(e, t, n) {
		return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Sv.d(e, t);
	},
	D: function(e, t, n) {
		let r = _v(e);
		return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : Y(r, t.length);
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
			case "ee": return Y(a, 2);
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
			case "cc": return Y(a, t.length);
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
			case "ii": return Y(i, t.length);
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
		switch (i = r === 12 ? Cv.noon : r === 0 ? Cv.midnight : r / 12 >= 1 ? "pm" : "am", t) {
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
		switch (i = r >= 17 ? Cv.evening : r >= 12 ? Cv.afternoon : r >= 4 ? Cv.morning : Cv.night, t) {
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
		return Sv.h(e, t);
	},
	H: function(e, t, n) {
		return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Sv.H(e, t);
	},
	K: function(e, t, n) {
		let r = e.getHours() % 12;
		return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : Y(r, t.length);
	},
	k: function(e, t, n) {
		let r = e.getHours();
		return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : Y(r, t.length);
	},
	m: function(e, t, n) {
		return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Sv.m(e, t);
	},
	s: function(e, t, n) {
		return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : Sv.s(e, t);
	},
	S: function(e, t) {
		return Sv.S(e, t);
	},
	X: function(e, t, n) {
		let r = e.getTimezoneOffset();
		if (r === 0) return "Z";
		switch (t) {
			case "X": return Ev(r);
			case "XXXX":
			case "XX": return Dv(r);
			default: return Dv(r, ":");
		}
	},
	x: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "x": return Ev(r);
			case "xxxx":
			case "xx": return Dv(r);
			default: return Dv(r, ":");
		}
	},
	O: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "O":
			case "OO":
			case "OOO": return "GMT" + Tv(r, ":");
			default: return "GMT" + Dv(r, ":");
		}
	},
	z: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "z":
			case "zz":
			case "zzz": return "GMT" + Tv(r, ":");
			default: return "GMT" + Dv(r, ":");
		}
	},
	t: function(e, t, n) {
		return Y(Math.trunc(e / 1e3), t.length);
	},
	T: function(e, t, n) {
		return Y(+e, t.length);
	}
};
function Tv(e, t = "") {
	let n = e > 0 ? "-" : "+", r = Math.abs(e), i = Math.trunc(r / 60), a = r % 60;
	return a === 0 ? n + String(i) : n + String(i) + t + Y(a, 2);
}
function Ev(e, t) {
	return e % 60 == 0 ? (e > 0 ? "-" : "+") + Y(Math.abs(e) / 60, 2) : Dv(e, t);
}
function Dv(e, t = "") {
	let n = e > 0 ? "-" : "+", r = Math.abs(e), i = Y(Math.trunc(r / 60), 2), a = Y(r % 60, 2);
	return n + i + t + a;
}
//#endregion
//#region node_modules/date-fns/_lib/format/longFormatters.js
var Ov = (e, t) => {
	switch (e) {
		case "P": return t.date({ width: "short" });
		case "PP": return t.date({ width: "medium" });
		case "PPP": return t.date({ width: "long" });
		default: return t.date({ width: "full" });
	}
}, kv = (e, t) => {
	switch (e) {
		case "p": return t.time({ width: "short" });
		case "pp": return t.time({ width: "medium" });
		case "ppp": return t.time({ width: "long" });
		default: return t.time({ width: "full" });
	}
}, Av = {
	p: kv,
	P: (e, t) => {
		let n = e.match(/(P+)(p+)?/) || [], r = n[1], i = n[2];
		if (!i) return Ov(e, t);
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
		return a.replace("{{date}}", Ov(r, t)).replace("{{time}}", kv(i, t));
	}
}, jv = /^D+$/, Mv = /^Y+$/, Nv = [
	"D",
	"DD",
	"YY",
	"YYYY"
];
function Pv(e) {
	return jv.test(e);
}
function Fv(e) {
	return Mv.test(e);
}
function Iv(e, t, n) {
	let r = Lv(e, t, n);
	if (console.warn(r), Nv.includes(e)) throw RangeError(r);
}
function Lv(e, t, n) {
	let r = e[0] === "Y" ? "years" : "days of the month";
	return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
//#endregion
//#region node_modules/date-fns/format.js
var Rv = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, zv = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Bv = /^'([^]*?)'?$/, Vv = /''/g, Hv = /[a-zA-Z]/;
function Uv(e, t, n) {
	let r = M_(), i = n?.locale ?? r.locale ?? gv, a = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, o = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, s = J(e, n?.in);
	if (!q_(s)) throw RangeError("Invalid time value");
	let c = t.match(zv).map((e) => {
		let t = e[0];
		if (t === "p" || t === "P") {
			let n = Av[t];
			return n(e, i.formatLong);
		}
		return e;
	}).join("").match(Rv).map((e) => {
		if (e === "''") return {
			isToken: !1,
			value: "'"
		};
		let t = e[0];
		if (t === "'") return {
			isToken: !1,
			value: Wv(e)
		};
		if (wv[t]) return {
			isToken: !0,
			value: e
		};
		if (t.match(Hv)) throw RangeError("Format string contains an unescaped latin alphabet character `" + t + "`");
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
		(!n?.useAdditionalWeekYearTokens && Fv(a) || !n?.useAdditionalDayOfYearTokens && Pv(a)) && Iv(a, t, String(e));
		let o = wv[a[0]];
		return o(s, a, i.localize, l);
	}).join("");
}
function Wv(e) {
	let t = e.match(Bv);
	return t ? t[1].replace(Vv, "'") : e;
}
//#endregion
//#region node_modules/date-fns/getDaysInMonth.js
function Gv(e, t) {
	let n = J(e, t?.in), r = n.getFullYear(), i = n.getMonth(), a = O_(n, 0);
	return a.setFullYear(r, i + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
//#endregion
//#region node_modules/date-fns/getMonth.js
function Kv(e, t) {
	return J(e, t?.in).getMonth();
}
//#endregion
//#region node_modules/date-fns/getYear.js
function qv(e, t) {
	return J(e, t?.in).getFullYear();
}
//#endregion
//#region node_modules/date-fns/isAfter.js
function Jv(e, t) {
	return +J(e) > +J(t);
}
//#endregion
//#region node_modules/date-fns/isBefore.js
function Yv(e, t) {
	return +J(e) < +J(t);
}
//#endregion
//#region node_modules/date-fns/isSameMonth.js
function Xv(e, t, n) {
	let [r, i] = L_(n?.in, e, t);
	return r.getFullYear() === i.getFullYear() && r.getMonth() === i.getMonth();
}
//#endregion
//#region node_modules/date-fns/isSameYear.js
function Zv(e, t, n) {
	let [r, i] = L_(n?.in, e, t);
	return r.getFullYear() === i.getFullYear();
}
//#endregion
//#region node_modules/date-fns/setMonth.js
function Qv(e, t, n) {
	let r = J(e, n?.in), i = r.getFullYear(), a = r.getDate(), o = O_(n?.in || e, 0);
	o.setFullYear(i, t, 15), o.setHours(0, 0, 0, 0);
	let s = Gv(o);
	return r.setMonth(t, Math.min(a, s)), r;
}
//#endregion
//#region node_modules/date-fns/setYear.js
function $v(e, t, n) {
	let r = J(e, n?.in);
	return isNaN(+r) ? O_(n?.in || e, NaN) : (r.setFullYear(t), r);
}
//#endregion
//#region node_modules/date-fns/locale/pt-BR/_lib/formatDistance.js
var ey = {
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
}, ty = (e, t, n) => {
	let r, i = ey[e];
	return r = typeof i == "string" ? i : t === 1 ? i.one : i.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? "em " + r : "há " + r : r;
}, ny = {
	date: ov({
		formats: {
			full: "EEEE, d 'de' MMMM 'de' y",
			long: "d 'de' MMMM 'de' y",
			medium: "d MMM y",
			short: "dd/MM/yyyy"
		},
		defaultWidth: "full"
	}),
	time: ov({
		formats: {
			full: "HH:mm:ss zzzz",
			long: "HH:mm:ss z",
			medium: "HH:mm:ss",
			short: "HH:mm"
		},
		defaultWidth: "full"
	}),
	dateTime: ov({
		formats: {
			full: "{{date}} 'às' {{time}}",
			long: "{{date}} 'às' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, ry = {
	lastWeek: (e) => {
		let t = e.getDay();
		return "'" + (t === 0 || t === 6 ? "último" : "última") + "' eeee 'às' p";
	},
	yesterday: "'ontem às' p",
	today: "'hoje às' p",
	tomorrow: "'amanhã às' p",
	nextWeek: "eeee 'às' p",
	other: "P"
}, iy = {
	code: "pt-BR",
	formatDistance: ty,
	formatLong: ny,
	formatRelative: (e, t, n, r) => {
		let i = ry[e];
		return typeof i == "function" ? i(t) : i;
	},
	localize: {
		ordinalNumber: (e, t) => {
			let n = Number(e);
			return t?.unit === "week" ? n + "ª" : n + "º";
		},
		era: uv({
			values: {
				narrow: ["AC", "DC"],
				abbreviated: ["AC", "DC"],
				wide: ["antes de cristo", "depois de cristo"]
			},
			defaultWidth: "wide"
		}),
		quarter: uv({
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
		month: uv({
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
		day: uv({
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
		dayPeriod: uv({
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
		ordinalNumber: hv({
			matchPattern: /^(\d+)[ºªo]?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: fv({
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
		quarter: fv({
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
		month: fv({
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
		day: fv({
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
		dayPeriod: fv({
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
function ay(e, t, n = "long") {
	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		timeZone: e,
		timeZoneName: n
	}).format(t).split(/\s/g).slice(2).join(" ");
}
//#endregion
//#region node_modules/@date-fns/tz/tzOffset/index.js
var oy = {}, sy = {};
function cy(e, t) {
	try {
		let n = (oy[e] ||= new Intl.DateTimeFormat("en-US", {
			timeZone: e,
			timeZoneName: "longOffset"
		}).format)(t).split("GMT")[1];
		return n in sy ? sy[n] : uy(n, n.split(":"));
	} catch {
		if (e in sy) return sy[e];
		let t = e?.match(ly);
		return t ? uy(e, t.slice(1)) : NaN;
	}
}
var ly = /([+-]\d\d):?(\d\d)?/;
function uy(e, t) {
	let n = +(t[0] || 0), r = +(t[1] || 0), i = (t[2] || 0) / 60;
	return sy[e] = n * 60 + r > 0 ? n * 60 + r + i : n * 60 - r - i;
}
//#endregion
//#region node_modules/@date-fns/tz/date/mini.js
var dy = class e extends Date {
	constructor(...e) {
		super(), e.length > 1 && typeof e[e.length - 1] == "string" && (this.timeZone = e.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(cy(this.timeZone, this)) ? this.setTime(NaN) : e.length ? typeof e[0] == "number" && (e.length === 1 || e.length === 2 && typeof e[1] != "number") ? this.setTime(e[0]) : typeof e[0] == "string" ? this.setTime(+new Date(e[0])) : e[0] instanceof Date ? this.setTime(+e[0]) : (this.setTime(+new Date(...e)), hy(this, NaN), py(this)) : this.setTime(Date.now());
	}
	static tz(t, ...n) {
		return n.length ? new e(...n, t) : new e(Date.now(), t);
	}
	withTimeZone(t) {
		return new e(+this, t);
	}
	getTimezoneOffset() {
		let e = -cy(this.timeZone, this);
		return e > 0 ? Math.floor(e) : Math.ceil(e);
	}
	setTime(e) {
		return Date.prototype.setTime.apply(this, arguments), py(this), +this;
	}
	[Symbol.for("constructDateFrom")](t) {
		return new e(+new Date(t), this.timeZone);
	}
}, fy = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
	if (!fy.test(e)) return;
	let t = e.replace(fy, "$1UTC");
	dy.prototype[t] && (e.startsWith("get") ? dy.prototype[e] = function() {
		return this.internal[t]();
	} : (dy.prototype[e] = function() {
		return Date.prototype[t].apply(this.internal, arguments), my(this), +this;
	}, dy.prototype[t] = function() {
		return Date.prototype[t].apply(this, arguments), py(this), +this;
	}));
});
function py(e) {
	e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-cy(e.timeZone, e) * 60));
}
function my(e) {
	Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), hy(e);
}
function hy(e) {
	let t = cy(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
	r.setUTCHours(r.getUTCHours() - 1);
	let i = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), a = i - -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), o = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
	a && o && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + a);
	let s = i - n;
	s && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + s);
	let c = /* @__PURE__ */ new Date(+e);
	c.setUTCSeconds(0);
	let l = i > 0 ? c.getSeconds() : (c.getSeconds() - 60) % 60, u = Math.round(-(cy(e.timeZone, e) * 60)) % 60;
	(u || l) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + u), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + u + l));
	let d = cy(e.timeZone, e), f = d > 0 ? Math.floor(d) : Math.ceil(d), p = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - f, m = f !== n, h = p - s;
	if (m && h) {
		Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + h);
		let t = cy(e.timeZone, e), n = f - (t > 0 ? Math.floor(t) : Math.ceil(t));
		n && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + n), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + n));
	}
}
//#endregion
//#region node_modules/@date-fns/tz/date/index.js
var gy = class e extends dy {
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
		return `${e} GMT${t}${n}${r} (${ay(this.timeZone, this)})`;
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
}, _y = 5, vy = 4;
function yy(e, t) {
	let n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, i = t.addDays(e, -r + 1), a = t.addDays(i, _y * 7 - 1);
	return t.getMonth(e) === t.getMonth(a) ? _y : vy;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/startOfBroadcastWeek.js
function by(e, t) {
	let n = t.startOfMonth(e), r = n.getDay();
	return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/endOfBroadcastWeek.js
function xy(e, t) {
	let n = by(e, t), r = yy(e, t);
	return t.addDays(n, r * 7 - 1);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/en-US.js
var Sy = {
	...gv,
	labels: {
		labelDayButton: (e, t, n, r) => {
			let i;
			i = r && typeof r.format == "function" ? r.format.bind(r) : (e, t) => Uv(e, t, {
				locale: gv,
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
			return r = n && typeof n.format == "function" ? n.format.bind(n) : (e, n) => Uv(e, n, {
				locale: gv,
				...t
			}), r(e, "LLLL yyyy");
		},
		labelGridcell: (e, t, n, r) => {
			let i;
			i = r && typeof r.format == "function" ? r.format.bind(r) : (e, t) => Uv(e, t, {
				locale: gv,
				...n
			});
			let a = i(e, "PPPP");
			return t?.today && (a = `Today, ${a}`), a;
		},
		labelNav: "Navigation bar",
		labelWeekNumberHeader: "Week Number",
		labelWeekday: (e, t, n) => {
			let r;
			return r = n && typeof n.format == "function" ? n.format.bind(n) : (e, n) => Uv(e, n, {
				locale: gv,
				...t
			}), r(e, "cccc");
		}
	}
}, Cy = class e {
	constructor(e, t) {
		this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? gy.tz(this.options.timeZone) : new this.Date(), this.newDate = (e, t, n) => this.overrides?.newDate ? this.overrides.newDate(e, t, n) : this.options.timeZone ? new gy(e, t, n, this.options.timeZone) : new Date(e, t, n), this.addDays = (e, t) => this.overrides?.addDays ? this.overrides.addDays(e, t) : k_(e, t), this.addMonths = (e, t) => this.overrides?.addMonths ? this.overrides.addMonths(e, t) : A_(e, t), this.addWeeks = (e, t) => this.overrides?.addWeeks ? this.overrides.addWeeks(e, t) : V_(e, t), this.addYears = (e, t) => this.overrides?.addYears ? this.overrides.addYears(e, t) : H_(e, t), this.differenceInCalendarDays = (e, t) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(e, t) : z_(e, t), this.differenceInCalendarMonths = (e, t) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(e, t) : J_(e, t), this.eachMonthOfInterval = (e) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(e) : Z_(e), this.eachYearOfInterval = (e) => {
			let t = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(e) : tv(e), n = new Set(t.map((e) => this.getYear(e)));
			if (n.size === t.length) return t;
			let r = [];
			return n.forEach((e) => {
				r.push(new Date(e, 0, 1));
			}), r;
		}, this.endOfBroadcastWeek = (e) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(e) : xy(e, this), this.endOfISOWeek = (e) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(e) : rv(e), this.endOfMonth = (e) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(e) : Y_(e), this.endOfWeek = (e, t) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(e, t) : nv(e, this.options), this.endOfYear = (e) => this.overrides?.endOfYear ? this.overrides.endOfYear(e) : $_(e), this.format = (e, t, n) => {
			let r = this.overrides?.format ? this.overrides.format(e, t, this.options) : Uv(e, t, this.options);
			return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(r) : r;
		}, this.getISOWeek = (e) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(e) : vv(e), this.getMonth = (e, t) => this.overrides?.getMonth ? this.overrides.getMonth(e, this.options) : Kv(e, this.options), this.getYear = (e, t) => this.overrides?.getYear ? this.overrides.getYear(e, this.options) : qv(e, this.options), this.getWeek = (e, t) => this.overrides?.getWeek ? this.overrides.getWeek(e, this.options) : xv(e, this.options), this.isAfter = (e, t) => this.overrides?.isAfter ? this.overrides.isAfter(e, t) : Jv(e, t), this.isBefore = (e, t) => this.overrides?.isBefore ? this.overrides.isBefore(e, t) : Yv(e, t), this.isDate = (e) => this.overrides?.isDate ? this.overrides.isDate(e) : K_(e), this.isSameDay = (e, t) => this.overrides?.isSameDay ? this.overrides.isSameDay(e, t) : G_(e, t), this.isSameMonth = (e, t) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(e, t) : Xv(e, t), this.isSameYear = (e, t) => this.overrides?.isSameYear ? this.overrides.isSameYear(e, t) : Zv(e, t), this.max = (e) => this.overrides?.max ? this.overrides.max(e) : U_(e), this.min = (e) => this.overrides?.min ? this.overrides.min(e) : W_(e), this.setMonth = (e, t) => this.overrides?.setMonth ? this.overrides.setMonth(e, t) : Qv(e, t), this.setYear = (e, t) => this.overrides?.setYear ? this.overrides.setYear(e, t) : $v(e, t), this.startOfBroadcastWeek = (e, t) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(e, this) : by(e, this), this.startOfDay = (e) => this.overrides?.startOfDay ? this.overrides.startOfDay(e) : R_(e), this.startOfISOWeek = (e) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(e) : P_(e), this.startOfMonth = (e) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(e) : Q_(e), this.startOfWeek = (e, t) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(e, this.options) : N_(e, this.options), this.startOfYear = (e) => this.overrides?.startOfYear ? this.overrides.startOfYear(e) : ev(e), this.options = {
			locale: Sy,
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
Cy.yearFirstLocales = new Set([
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
var wy = new Cy(), Ty = class {
	constructor(e, t, n = wy) {
		this.date = e, this.displayMonth = t, this.outside = !!(t && !n.isSameMonth(e, t)), this.dateLib = n, this.isoDate = n.format(e, "yyyy-MM-dd"), this.displayMonthId = n.format(t, "yyyy-MM"), this.dateMonthId = n.format(e, "yyyy-MM");
	}
	isEqualTo(e) {
		return this.dateLib.isSameDay(e.date, this.date) && this.dateLib.isSameMonth(e.displayMonth, this.displayMonth);
	}
}, Ey = class {
	constructor(e, t) {
		this.date = e, this.weeks = t;
	}
}, Dy = class {
	constructor(e, t) {
		this.days = t, this.weekNumber = e;
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Button.js
function Oy(e) {
	return t.createElement("button", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/CaptionLabel.js
function ky(e) {
	return t.createElement("span", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Chevron.js
function Ay(e) {
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
function jy(e) {
	let { day: n, modifiers: r, ...i } = e;
	return t.createElement("td", { ...i });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/DayButton.js
function My(e) {
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
var X;
(function(e) {
	e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(X ||= {});
var Z;
(function(e) {
	e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(Z ||= {});
var Ny;
(function(e) {
	e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(Ny ||= {});
var Py;
(function(e) {
	e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(Py ||= {});
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Dropdown.js
function Fy(e) {
	let { options: n, className: r, components: i, classNames: a, ...o } = e, s = [a[X.Dropdown], r].join(" "), c = n?.find(({ value: e }) => e === o.value);
	return t.createElement("span", {
		"data-disabled": o.disabled,
		className: a[X.DropdownRoot]
	}, t.createElement(i.Select, {
		className: s,
		...o
	}, n?.map(({ value: e, label: n, disabled: r }) => t.createElement(i.Option, {
		key: e,
		value: e,
		disabled: r
	}, n))), t.createElement("span", {
		className: a[X.CaptionLabel],
		"aria-hidden": !0
	}, c?.label, t.createElement(i.Chevron, {
		orientation: "down",
		size: 18,
		className: a[X.Chevron]
	})));
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/DropdownNav.js
function Iy(e) {
	return t.createElement("div", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Footer.js
function Ly(e) {
	return t.createElement("div", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Month.js
function Ry(e) {
	let { calendarMonth: n, displayIndex: r, ...i } = e;
	return t.createElement("div", { ...i }, e.children);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/MonthCaption.js
function zy(e) {
	let { calendarMonth: n, displayIndex: r, ...i } = e;
	return t.createElement("div", { ...i });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/MonthGrid.js
function By(e) {
	return t.createElement("table", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Months.js
function Vy(e) {
	return t.createElement("div", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/useDayPicker.js
var Hy = r(void 0);
function Uy() {
	let e = s(Hy);
	if (e === void 0) throw Error("useDayPicker() must be used within a custom component.");
	return e;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/MonthsDropdown.js
function Wy(e) {
	let { components: n } = Uy();
	return t.createElement(n.Dropdown, { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Nav.js
function Gy(e) {
	let { onPreviousClick: n, onNextClick: r, previousMonth: i, nextMonth: a, ...s } = e, { components: c, classNames: l, labels: { labelPrevious: u, labelNext: d } } = Uy(), f = o((e) => {
		a && r?.(e);
	}, [a, r]), p = o((e) => {
		i && n?.(e);
	}, [i, n]);
	return t.createElement("nav", { ...s }, t.createElement(c.PreviousMonthButton, {
		type: "button",
		className: l[X.PreviousMonthButton],
		tabIndex: i ? void 0 : -1,
		"aria-disabled": i ? void 0 : !0,
		"aria-label": u(i),
		onClick: p
	}, t.createElement(c.Chevron, {
		disabled: i ? void 0 : !0,
		className: l[X.Chevron],
		orientation: "left"
	})), t.createElement(c.NextMonthButton, {
		type: "button",
		className: l[X.NextMonthButton],
		tabIndex: a ? void 0 : -1,
		"aria-disabled": a ? void 0 : !0,
		"aria-label": d(a),
		onClick: f
	}, t.createElement(c.Chevron, {
		disabled: a ? void 0 : !0,
		orientation: "right",
		className: l[X.Chevron]
	})));
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/NextMonthButton.js
function Ky(e) {
	let { components: n } = Uy();
	return t.createElement(n.Button, { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Option.js
function qy(e) {
	return t.createElement("option", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/PreviousMonthButton.js
function Jy(e) {
	let { components: n } = Uy();
	return t.createElement(n.Button, { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Root.js
function Yy(e) {
	let { rootRef: n, ...r } = e;
	return t.createElement("div", {
		...r,
		ref: n
	});
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Select.js
function Xy(e) {
	return t.createElement("select", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Week.js
function Zy(e) {
	let { week: n, ...r } = e;
	return t.createElement("tr", { ...r });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Weekday.js
function Qy(e) {
	return t.createElement("th", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Weekdays.js
function $y(e) {
	return t.createElement("thead", { "aria-hidden": !0 }, t.createElement("tr", { ...e }));
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/WeekNumber.js
function eb(e) {
	let { week: n, ...r } = e;
	return t.createElement("th", { ...r });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/WeekNumberHeader.js
function tb(e) {
	return t.createElement("th", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Weeks.js
function nb(e) {
	return t.createElement("tbody", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/YearsDropdown.js
function rb(e) {
	let { components: n } = Uy();
	return t.createElement(n.Dropdown, { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/custom-components.js
var ib = /* @__PURE__ */ S({
	Button: () => Oy,
	CaptionLabel: () => ky,
	Chevron: () => Ay,
	Day: () => jy,
	DayButton: () => My,
	Dropdown: () => Fy,
	DropdownNav: () => Iy,
	Footer: () => Ly,
	Month: () => Ry,
	MonthCaption: () => zy,
	MonthGrid: () => By,
	Months: () => Vy,
	MonthsDropdown: () => Wy,
	Nav: () => Gy,
	NextMonthButton: () => Ky,
	Option: () => qy,
	PreviousMonthButton: () => Jy,
	Root: () => Yy,
	Select: () => Xy,
	Week: () => Zy,
	WeekNumber: () => eb,
	WeekNumberHeader: () => tb,
	Weekday: () => Qy,
	Weekdays: () => $y,
	Weeks: () => nb,
	YearsDropdown: () => rb
});
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/rangeIncludesDate.js
function ab(e, t, n = !1, r = wy) {
	let { from: i, to: a } = e, { differenceInCalendarDays: o, isSameDay: s } = r;
	return i && a ? (o(a, i) < 0 && ([i, a] = [a, i]), o(t, i) >= (n ? 1 : 0) && o(a, t) >= (n ? 1 : 0)) : !n && a ? s(a, t) : !n && i ? s(i, t) : !1;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/typeguards.js
function ob(e) {
	return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function sb(e) {
	return !!(e && typeof e == "object" && "from" in e);
}
function cb(e) {
	return !!(e && typeof e == "object" && "after" in e);
}
function lb(e) {
	return !!(e && typeof e == "object" && "before" in e);
}
function ub(e) {
	return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function db(e, t) {
	return Array.isArray(e) && e.every(t.isDate);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/dateMatchModifiers.js
function fb(e, t, n = wy) {
	let r = Array.isArray(t) ? t : [t], { isSameDay: i, differenceInCalendarDays: a, isAfter: o } = n;
	return r.some((t) => {
		if (typeof t == "boolean") return t;
		if (n.isDate(t)) return i(e, t);
		if (db(t, n)) return t.some((t) => i(e, t));
		if (sb(t)) return ab(t, e, !1, n);
		if (ub(t)) return Array.isArray(t.dayOfWeek) ? t.dayOfWeek.includes(e.getDay()) : t.dayOfWeek === e.getDay();
		if (ob(t)) {
			let n = a(t.before, e), r = a(t.after, e), i = n > 0, s = r < 0;
			return o(t.before, t.after) ? s && i : i || s;
		}
		return cb(t) ? a(e, t.after) > 0 : lb(t) ? a(t.before, e) > 0 : typeof t == "function" ? t(e) : !1;
	});
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/createGetModifiers.js
function pb(e, t, n, r, i) {
	let { disabled: a, hidden: o, modifiers: s, showOutsideDays: c, broadcastCalendar: l, today: u = i.today() } = t, { isSameDay: d, isSameMonth: f, startOfMonth: p, isBefore: m, endOfMonth: h, isAfter: g } = i, _ = n && p(n), v = r && h(r), y = {
		[Z.focused]: [],
		[Z.outside]: [],
		[Z.disabled]: [],
		[Z.hidden]: [],
		[Z.today]: []
	}, b = {};
	for (let t of e) {
		let { date: e, displayMonth: n } = t, r = !!(n && !f(e, n)), p = !!(_ && m(e, _)), h = !!(v && g(e, v)), x = !!(a && fb(e, a, i)), S = !!(o && fb(e, o, i)) || p || h || !l && !c && r || l && c === !1 && r, C = d(e, u);
		r && y.outside.push(t), x && y.disabled.push(t), S && y.hidden.push(t), C && y.today.push(t), s && Object.keys(s).forEach((n) => {
			let r = s?.[n];
			r && fb(e, r, i) && (b[n] ? b[n].push(t) : b[n] = [t]);
		});
	}
	return (e) => {
		let t = {
			[Z.focused]: !1,
			[Z.disabled]: !1,
			[Z.hidden]: !1,
			[Z.outside]: !1,
			[Z.today]: !1
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
function mb(e, t, n = {}) {
	return Object.entries(e).filter(([, e]) => e === !0).reduce((e, [r]) => (n[r] ? e.push(n[r]) : t[Z[r]] ? e.push(t[Z[r]]) : t[Ny[r]] && e.push(t[Ny[r]]), e), [t[X.Day]]);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getComponents.js
function hb(e) {
	return {
		...ib,
		...e
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getDataAttributes.js
function gb(e) {
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
function _b() {
	let e = {};
	for (let t in X) e[X[t]] = `rdp-${X[t]}`;
	for (let t in Z) e[Z[t]] = `rdp-${Z[t]}`;
	for (let t in Ny) e[Ny[t]] = `rdp-${Ny[t]}`;
	for (let t in Py) e[Py[t]] = `rdp-${Py[t]}`;
	return e;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatCaption.js
function vb(e, t, n) {
	return (n ?? new Cy(t)).formatMonthYear(e);
}
var yb = vb;
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatDay.js
function bb(e, t, n) {
	return (n ?? new Cy(t)).format(e, "d");
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatMonthDropdown.js
function xb(e, t = wy) {
	return t.format(e, "LLLL");
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatWeekdayName.js
function Sb(e, t, n) {
	return (n ?? new Cy(t)).format(e, "cccccc");
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatWeekNumber.js
function Cb(e, t = wy) {
	return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatWeekNumberHeader.js
function wb() {
	return "";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatYearDropdown.js
function Tb(e, t = wy) {
	return t.format(e, "yyyy");
}
var Eb = Tb, Db = /* @__PURE__ */ S({
	formatCaption: () => vb,
	formatDay: () => bb,
	formatMonthCaption: () => yb,
	formatMonthDropdown: () => xb,
	formatWeekNumber: () => Cb,
	formatWeekNumberHeader: () => wb,
	formatWeekdayName: () => Sb,
	formatYearCaption: () => Eb,
	formatYearDropdown: () => Tb
});
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getFormatters.js
function Ob(e) {
	return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
		...Db,
		...e
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelDayButton.js
function kb(e, t, n, r) {
	let i = (r ?? new Cy(n)).format(e, "PPPP");
	return t.today && (i = `Today, ${i}`), t.selected && (i = `${i}, selected`), i;
}
var Ab = kb;
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelGrid.js
function jb(e, t, n) {
	return (n ?? new Cy(t)).formatMonthYear(e);
}
var Mb = jb;
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelGridcell.js
function Nb(e, t, n, r) {
	let i = (r ?? new Cy(n)).format(e, "PPPP");
	return t?.today && (i = `Today, ${i}`), i;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelMonthDropdown.js
function Pb(e) {
	return "Choose the Month";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelNav.js
function Fb() {
	return "";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelNext.js
var Ib = "Go to the Next Month";
function Lb(e, t) {
	return Ib;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelPrevious.js
function Rb(e) {
	return "Go to the Previous Month";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelWeekday.js
function zb(e, t, n) {
	return (n ?? new Cy(t)).format(e, "cccc");
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelWeekNumber.js
function Bb(e, t) {
	return `Week ${e}`;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelWeekNumberHeader.js
function Vb(e) {
	return "Week Number";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelYearDropdown.js
function Hb(e) {
	return "Choose the Year";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/index.js
var Ub = /* @__PURE__ */ S({
	labelCaption: () => Mb,
	labelDay: () => Ab,
	labelDayButton: () => kb,
	labelGrid: () => jb,
	labelGridcell: () => Nb,
	labelMonthDropdown: () => Pb,
	labelNav: () => Fb,
	labelNext: () => Lb,
	labelPrevious: () => Rb,
	labelWeekNumber: () => Bb,
	labelWeekNumberHeader: () => Vb,
	labelWeekday: () => zb,
	labelYearDropdown: () => Hb
}), Wb = (e, t, n) => t || (n ? typeof n == "function" ? n : (...e) => n : e);
function Gb(e, t) {
	let n = t.locale?.labels ?? {};
	return {
		...Ub,
		...e ?? {},
		labelDayButton: Wb(kb, e?.labelDayButton, n.labelDayButton),
		labelMonthDropdown: Wb(Pb, e?.labelMonthDropdown, n.labelMonthDropdown),
		labelNext: Wb(Lb, e?.labelNext, n.labelNext),
		labelPrevious: Wb(Rb, e?.labelPrevious, n.labelPrevious),
		labelWeekNumber: Wb(Bb, e?.labelWeekNumber, n.labelWeekNumber),
		labelYearDropdown: Wb(Hb, e?.labelYearDropdown, n.labelYearDropdown),
		labelGrid: Wb(jb, e?.labelGrid, n.labelGrid),
		labelGridcell: Wb(Nb, e?.labelGridcell, n.labelGridcell),
		labelNav: Wb(Fb, e?.labelNav, n.labelNav),
		labelWeekNumberHeader: Wb(Vb, e?.labelWeekNumberHeader, n.labelWeekNumberHeader),
		labelWeekday: Wb(zb, e?.labelWeekday, n.labelWeekday)
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getMonthOptions.js
function Kb(e, t, n, r, i) {
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
function qb(e, t = {}, n = {}) {
	let r = { ...t?.[X.Day] };
	return Object.entries(e).filter(([, e]) => e === !0).forEach(([e]) => {
		r = {
			...r,
			...n?.[e]
		};
	}), r;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getWeekdays.js
function Jb(e, t, n, r) {
	let i = r ?? e.today(), a = n ? e.startOfBroadcastWeek(i, e) : t ? e.startOfISOWeek(i) : e.startOfWeek(i), o = [];
	for (let t = 0; t < 7; t++) {
		let n = e.addDays(a, t);
		o.push(n);
	}
	return o;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getYearOptions.js
function Yb(e, t, n, r, i = !1) {
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
function Xb(e, t = {}) {
	let { weekStartsOn: n, locale: r } = t, i = n ?? r?.options?.weekStartsOn ?? 0, a = (t) => {
		let n = typeof t == "number" || typeof t == "string" ? new Date(t) : t;
		return new gy(n.getFullYear(), n.getMonth(), n.getDate(), 12, 0, 0, e);
	}, o = (e) => {
		let t = a(e);
		return new Date(t.getFullYear(), t.getMonth(), t.getDate(), 0, 0, 0, 0);
	};
	return {
		today: () => a(gy.tz(e)),
		newDate: (t, n, r) => new gy(t, n, r, 12, 0, 0, e),
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
			let n = a(t.start), r = a(t.end), i = [], o = new gy(n.getFullYear(), n.getMonth(), 1, 12, 0, 0, e), s = r.getFullYear() * 12 + r.getMonth();
			for (; o.getFullYear() * 12 + o.getMonth() <= s;) i.push(new gy(o, e)), o.setMonth(o.getMonth() + 1, 1);
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
			let n = a(t.start), r = a(t.end), i = [], o = new gy(n.getFullYear(), 0, 1, 12, 0, 0, e);
			for (; o.getFullYear() <= r.getFullYear();) i.push(new gy(o, e)), o.setFullYear(o.getFullYear() + 1, 0, 1);
			return i;
		},
		getWeek: (e, t) => xv(o(e), {
			weekStartsOn: t?.weekStartsOn ?? i,
			firstWeekContainsDate: t?.firstWeekContainsDate ?? r?.options?.firstWeekContainsDate ?? 1
		}),
		getISOWeek: (e) => vv(o(e)),
		differenceInCalendarDays: (e, t) => z_(o(e), o(t)),
		differenceInCalendarMonths: (e, t) => J_(o(e), o(t))
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/useAnimation.js
var Zb = (e) => e instanceof HTMLElement ? e : null, Qb = (e) => [...e.querySelectorAll("[data-animated-month]") ?? []], $b = (e) => Zb(e.querySelector("[data-animated-month]")), ex = (e) => Zb(e.querySelector("[data-animated-caption]")), tx = (e) => Zb(e.querySelector("[data-animated-weeks]")), nx = (e) => Zb(e.querySelector("[data-animated-nav]")), rx = (e) => Zb(e.querySelector("[data-animated-weekdays]"));
function ix(e, t, { classNames: n, months: r, focused: i, dateLib: a }) {
	let o = f(null), s = f(r), c = f(!1);
	u(() => {
		let l = s.current;
		if (s.current = r, !t || !e.current || !(e.current instanceof HTMLElement) || r.length === 0 || l.length === 0 || r.length !== l.length) return;
		let u = a.isSameMonth(r[0].date, l[0].date), d = a.isAfter(r[0].date, l[0].date), f = d ? n[Py.caption_after_enter] : n[Py.caption_before_enter], p = d ? n[Py.weeks_after_enter] : n[Py.weeks_before_enter], m = o.current, h = e.current.cloneNode(!0);
		if (h instanceof HTMLElement ? (Qb(h).forEach((e) => {
			if (!(e instanceof HTMLElement)) return;
			let t = $b(e);
			t && e.contains(t) && e.removeChild(t);
			let n = ex(e);
			n && n.classList.remove(f);
			let r = tx(e);
			r && r.classList.remove(p);
		}), o.current = h) : o.current = null, c.current || u || i) return;
		let g = m instanceof HTMLElement ? Qb(m) : [], _ = Qb(e.current);
		if (_?.every((e) => e instanceof HTMLElement) && g && g.every((e) => e instanceof HTMLElement)) {
			c.current = !0;
			let t = [];
			e.current.style.isolation = "isolate";
			let r = nx(e.current);
			r && (r.style.zIndex = "1"), _.forEach((i, a) => {
				let o = g[a];
				if (!o) return;
				i.style.position = "relative", i.style.overflow = "hidden";
				let s = ex(i);
				s && s.classList.add(f);
				let l = tx(i);
				l && l.classList.add(p);
				let u = () => {
					c.current = !1, e.current && (e.current.style.isolation = ""), r && (r.style.zIndex = ""), s && s.classList.remove(f), l && l.classList.remove(p), i.style.position = "", i.style.overflow = "", i.contains(o) && i.removeChild(o);
				};
				t.push(u), o.style.pointerEvents = "none", o.style.position = "absolute", o.style.overflow = "hidden", o.setAttribute("aria-hidden", "true");
				let m = rx(o);
				m && (m.style.opacity = "0");
				let h = ex(o);
				h && (h.classList.add(d ? n[Py.caption_before_exit] : n[Py.caption_after_exit]), h.addEventListener("animationend", u));
				let _ = tx(o);
				_ && _.classList.add(d ? n[Py.weeks_before_exit] : n[Py.weeks_after_exit]), i.insertBefore(o, i.firstChild);
			});
		}
	});
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getDates.js
function ax(e, t, n, r) {
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
function ox(e) {
	let t = [];
	return e.reduce((e, n) => {
		let r = n.weeks.reduce((e, t) => e.concat(t.days.slice()), t.slice());
		return e.concat(r.slice());
	}, t.slice());
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getDisplayMonths.js
function sx(e, t, n, r) {
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
function cx(e, t, n, r) {
	let { month: i, defaultMonth: a, today: o = r.today(), numberOfMonths: s = 1 } = e, c = i || a || o, { differenceInCalendarMonths: l, addMonths: u, startOfMonth: d } = r;
	return n && l(n, c) < s - 1 && (c = u(n, -1 * (s - 1))), t && l(c, t) < 0 && (c = t), d(c);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getMonths.js
function lx(e, t, n, r) {
	let { addDays: i, endOfBroadcastWeek: a, endOfISOWeek: o, endOfMonth: s, endOfWeek: c, getISOWeek: l, getWeek: u, startOfBroadcastWeek: d, startOfISOWeek: f, startOfWeek: p } = r, m = e.reduce((e, m) => {
		let h = n.broadcastCalendar ? d(m, r) : n.ISOWeek ? f(m) : p(m), g = n.broadcastCalendar ? a(m) : n.ISOWeek ? o(s(m)) : c(s(m)), _ = t.filter((e) => e >= h && e <= g), v = n.broadcastCalendar ? 35 : 42;
		if (n.fixedWeeks && _.length < v) {
			let e = t.filter((e) => {
				let t = v - _.length;
				return e > g && e <= i(g, t);
			});
			_.push(...e);
		}
		let y = new Ey(m, _.reduce((e, t) => {
			let i = n.ISOWeek ? l(t) : u(t), a = e.find((e) => e.weekNumber === i), o = new Ty(t, m, r);
			return a ? a.days.push(o) : e.push(new Dy(i, [o])), e;
		}, []));
		return e.push(y), e;
	}, []);
	return n.reverseMonths ? m.reverse() : m;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getNavMonth.js
function ux(e, t) {
	let { startMonth: n, endMonth: r } = e, { startOfYear: i, startOfDay: a, startOfMonth: o, endOfMonth: s, addYears: c, endOfYear: l, newDate: u, today: d } = t, { fromYear: f, toYear: p, fromMonth: m, toMonth: h } = e;
	!n && m && (n = m), !n && f && (n = t.newDate(f, 0, 1)), !r && h && (r = h), !r && p && (r = u(p, 11, 31));
	let g = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
	return n ? n = o(n) : f ? n = u(f, 0, 1) : !n && g && (n = i(c(e.today ?? d(), -100))), r ? r = s(r) : p ? r = u(p, 11, 31) : !r && g && (r = l(e.today ?? d())), [n && a(n), r && a(r)];
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getNextMonth.js
function dx(e, t, n, r) {
	if (n.disableNavigation) return;
	let { pagedNavigation: i, numberOfMonths: a = 1 } = n, { startOfMonth: o, addMonths: s, differenceInCalendarMonths: c } = r, l = i ? a : 1, u = o(e);
	if (!t || !(c(t, e) < a)) return s(u, l);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getPreviousMonth.js
function fx(e, t, n, r) {
	if (n.disableNavigation) return;
	let { pagedNavigation: i, numberOfMonths: a } = n, { startOfMonth: o, addMonths: s, differenceInCalendarMonths: c } = r, l = i ? a ?? 1 : 1, u = o(e);
	if (!t || !(c(u, t) <= 0)) return s(u, -l);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getWeeks.js
function px(e) {
	return e.reduce((e, t) => e.concat(t.weeks.slice()), [].slice());
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/useControlledValue.js
function mx(e, t) {
	let [n, r] = p(e);
	return [t === void 0 ? n : t, r];
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/useCalendar.js
function hx(e, t) {
	let [n, r] = ux(e, t), { startOfMonth: i, endOfMonth: a } = t, o = cx(e, n, r, t), [s, c] = mx(o, e.month ? o : void 0);
	l(() => {
		c(cx(e, n, r, t));
	}, [e.timeZone]);
	let { months: u, weeks: f, days: p, previousMonth: m, nextMonth: h } = d(() => {
		let i = sx(s, r, { numberOfMonths: e.numberOfMonths }, t), o = lx(i, ax(i, e.endMonth ? a(e.endMonth) : void 0, {
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
			weeks: px(o),
			days: ox(o),
			previousMonth: fx(s, n, e, t),
			nextMonth: dx(s, r, e, t)
		};
	}, [
		t,
		s.getTime(),
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
		n && t < i(n) && (t = i(n)), r && t > i(r) && (t = i(r)), c(t), _?.(t);
	};
	return {
		months: u,
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
var gx;
(function(e) {
	e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(gx ||= {});
function _x(e) {
	return !e[Z.disabled] && !e[Z.hidden] && !e[Z.outside];
}
function vx(e, t, n, r) {
	let i, a = -1;
	for (let o of e) {
		let e = t(o);
		_x(e) && (e[Z.focused] && a < gx.FocusedModifier ? (i = o, a = gx.FocusedModifier) : r?.isEqualTo(o) && a < gx.LastFocused ? (i = o, a = gx.LastFocused) : n(o.date) && a < gx.Selected ? (i = o, a = gx.Selected) : e[Z.today] && a < gx.Today && (i = o, a = gx.Today));
	}
	return i ||= e.find((e) => _x(t(e))), i;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getFocusableDate.js
function yx(e, t, n, r, i, a, o) {
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
function bx(e, t, n, r, i, a, o, s = 0) {
	if (s > 365) return;
	let c = yx(e, t, n.date, r, i, a, o), l = !!(a.disabled && fb(c, a.disabled, o)), u = !!(a.hidden && fb(c, a.hidden, o)), d = new Ty(c, c, o);
	return !l && !u ? d : bx(e, t, d, r, i, a, o, s + 1);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/useFocus.js
function xx(e, t, n, r, i) {
	let { autoFocus: a } = e, [o, s] = p(), c = vx(t.days, n, r || (() => !1), o), [l, u] = p(a ? c : void 0);
	return {
		isFocusTarget: (e) => !!c?.isEqualTo(e),
		setFocused: u,
		focused: l,
		blur: () => {
			s(l), u(void 0);
		},
		moveFocus: (n, r) => {
			if (!l) return;
			let a = bx(n, r, l, t.navStart, t.navEnd, e, i);
			a && (e.disableNavigation && !t.days.some((e) => e.isEqualTo(a)) || (t.goToDay(a), u(a)));
		}
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/selection/useMulti.js
function Sx(e, t) {
	let { selected: n, required: r, onSelect: i } = e, [a, o] = mx(n, i ? n : void 0), s = i ? n : a, { isSameDay: c } = t, l = (e) => s?.some((t) => c(t, e)) ?? !1, { min: u, max: d } = e;
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
function Cx(e, t, n = 0, r = 0, i = !1, a = wy) {
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
function wx(e, t, n = wy) {
	let r = Array.isArray(t) ? t : [t], i = e.from, a = n.differenceInCalendarDays(e.to, e.from), o = Math.min(a, 6);
	for (let e = 0; e <= o; e++) {
		if (r.includes(i.getDay())) return !0;
		i = n.addDays(i, 1);
	}
	return !1;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/rangeOverlaps.js
function Tx(e, t, n = wy) {
	return ab(e, t.from, !1, n) || ab(e, t.to, !1, n) || ab(t, e.from, !1, n) || ab(t, e.to, !1, n);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/rangeContainsModifiers.js
function Ex(e, t, n = wy) {
	let r = Array.isArray(t) ? t : [t];
	if (r.filter((e) => typeof e != "function").some((t) => typeof t == "boolean" ? t : n.isDate(t) ? ab(e, t, !1, n) : db(t, n) ? t.some((t) => ab(e, t, !1, n)) : sb(t) ? t.from && t.to ? Tx(e, {
		from: t.from,
		to: t.to
	}, n) : !1 : ub(t) ? wx(e, t.dayOfWeek, n) : ob(t) ? n.isAfter(t.before, t.after) ? Tx(e, {
		from: n.addDays(t.after, 1),
		to: n.addDays(t.before, -1)
	}, n) : fb(e.from, t, n) || fb(e.to, t, n) : cb(t) || lb(t) ? fb(e.from, t, n) || fb(e.to, t, n) : !1)) return !0;
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
function Dx(e, t) {
	let { disabled: n, excludeDisabled: r, resetOnSelect: i, selected: a, required: o, onSelect: s } = e, [c, l] = mx(a, s ? a : void 0), u = s ? a : c;
	return {
		selected: u,
		select: (a, c, d) => {
			let { min: f, max: p } = e, m;
			if (a) {
				let e = u?.from, n = u?.to, r = !!e && !!n, s = !!e && !!n && t.isSameDay(e, n) && t.isSameDay(a, e);
				m = i && (r || !u?.from) ? !o && s ? void 0 : {
					from: a,
					to: void 0
				} : Cx(a, u, f, p, o, t);
			}
			return r && n && m?.from && m.to && Ex({
				from: m.from,
				to: m.to
			}, n, t) && (m.from = a, m.to = void 0), s || l(m), s?.(m, a, c, d), m;
		},
		isSelected: (e) => u && ab(u, e, !1, t)
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/selection/useSingle.js
function Ox(e, t) {
	let { selected: n, required: r, onSelect: i } = e, [a, o] = mx(n, i ? n : void 0), s = i ? n : a, { isSameDay: c } = t;
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
function kx(e, t) {
	let n = Ox(e, t), r = Sx(e, t), i = Dx(e, t);
	switch (e.mode) {
		case "single": return n;
		case "multiple": return r;
		case "range": return i;
		default: return;
	}
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/toTimeZone.js
function Ax(e, t) {
	return e instanceof gy && e.timeZone === t ? e : new gy(e, t);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/convertMatchersToTimeZone.js
function jx(e, t, n) {
	if (!n) return Ax(e, t);
	let r = Ax(e, t), i = new gy(r.getFullYear(), r.getMonth(), r.getDate(), 12, 0, 0, t);
	return new Date(i.getTime());
}
function Mx(e, t, n) {
	return typeof e == "boolean" || typeof e == "function" ? e : e instanceof Date ? jx(e, t, n) : Array.isArray(e) ? e.map((e) => e instanceof Date ? jx(e, t, n) : e) : sb(e) ? {
		...e,
		from: e.from ? Ax(e.from, t) : e.from,
		to: e.to ? Ax(e.to, t) : e.to
	} : ob(e) ? {
		before: jx(e.before, t, n),
		after: jx(e.after, t, n)
	} : cb(e) ? { after: jx(e.after, t, n) } : lb(e) ? { before: jx(e.before, t, n) } : e;
}
function Nx(e, t, n) {
	return e && (Array.isArray(e) ? e.map((e) => Mx(e, t, n)) : Mx(e, t, n));
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/DayPicker.js
function Px(e) {
	let n = e, r = n.timeZone;
	if (r && (n = {
		...e,
		timeZone: r
	}, n.today &&= Ax(n.today, r), n.month &&= Ax(n.month, r), n.defaultMonth &&= Ax(n.defaultMonth, r), n.startMonth &&= Ax(n.startMonth, r), n.endMonth &&= Ax(n.endMonth, r), n.mode === "single" && n.selected ? n.selected = Ax(n.selected, r) : n.mode === "multiple" && n.selected ? n.selected = n.selected?.map((e) => Ax(e, r)) : n.mode === "range" && n.selected && (n.selected = {
		from: n.selected.from ? Ax(n.selected.from, r) : n.selected.from,
		to: n.selected.to ? Ax(n.selected.to, r) : n.selected.to
	}), n.disabled !== void 0 && (n.disabled = Nx(n.disabled, r)), n.hidden !== void 0 && (n.hidden = Nx(n.hidden, r)), n.modifiers)) {
		let e = {};
		Object.keys(n.modifiers).forEach((t) => {
			e[t] = Nx(n.modifiers?.[t], r);
		}), n.modifiers = e;
	}
	let { components: i, formatters: a, labels: s, dateLib: c, locale: l, classNames: u } = d(() => {
		let e = {
			...Sy,
			...n.locale
		}, t = n.broadcastCalendar ? 1 : n.weekStartsOn, r = n.noonSafe && n.timeZone ? Xb(n.timeZone, {
			weekStartsOn: t,
			locale: e
		}) : void 0, i = n.dateLib && r ? {
			...r,
			...n.dateLib
		} : n.dateLib ?? r, a = new Cy({
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
			components: hb(n.components),
			formatters: Ob(n.formatters),
			labels: Gb(n.labels, a.options),
			locale: e,
			classNames: {
				..._b(),
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
	let { captionLayout: p, mode: m, navLayout: h, numberOfMonths: g = 1, onDayBlur: _, onDayClick: v, onDayFocus: y, onDayKeyDown: b, onDayMouseEnter: x, onDayMouseLeave: S, onNextClick: C, onPrevClick: w, showWeekNumber: T, styles: E } = n, { formatCaption: D, formatDay: O, formatMonthDropdown: k, formatWeekNumber: A, formatWeekNumberHeader: j, formatWeekdayName: M, formatYearDropdown: N } = a, P = hx(n, c), { days: F, months: I, navStart: L, navEnd: ee, previousMonth: R, nextMonth: te, goToMonth: ne } = P, re = pb(F, n, L, ee, c), { isSelected: z, select: ie, selected: B } = kx(n, c) ?? {}, { blur: ae, focused: oe, isFocusTarget: se, moveFocus: ce, setFocused: le } = xx(n, P, re, z ?? (() => !1), c), { labelDayButton: ue, labelGridcell: de, labelGrid: fe, labelMonthDropdown: pe, labelNav: me, labelPrevious: he, labelNext: ge, labelWeekday: _e, labelWeekNumber: ve, labelWeekNumberHeader: ye, labelYearDropdown: be } = s, xe = d(() => Jb(c, n.ISOWeek, n.broadcastCalendar, n.today), [
		c,
		n.ISOWeek,
		n.broadcastCalendar,
		n.today
	]), Se = m !== void 0 || v !== void 0, Ce = o(() => {
		R && (ne(R), w?.(R));
	}, [
		R,
		ne,
		w
	]), we = o(() => {
		te && (ne(te), C?.(te));
	}, [
		ne,
		te,
		C
	]), Te = o((e, t) => (n) => {
		n.preventDefault(), n.stopPropagation(), le(e), !t.disabled && (ie?.(e.date, t, n), v?.(e.date, t, n));
	}, [
		ie,
		v,
		le
	]), Ee = o((e, t) => (n) => {
		le(e), y?.(e.date, t, n);
	}, [y, le]), De = o((e, t) => (n) => {
		ae(), _?.(e.date, t, n);
	}, [ae, _]), Oe = o((e, t) => (r) => {
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
			ce(e, t);
		}
		b?.(e.date, t, r);
	}, [
		ce,
		b,
		n.dir
	]), ke = o((e, t) => (n) => {
		x?.(e.date, t, n);
	}, [x]), Ae = o((e, t) => (n) => {
		S?.(e.date, t, n);
	}, [S]), je = o((e) => (t) => {
		let n = Number(t.target.value);
		ne(c.setMonth(c.startOfMonth(e), n));
	}, [c, ne]), Me = o((e) => (t) => {
		let n = Number(t.target.value);
		ne(c.setYear(c.startOfMonth(e), n));
	}, [c, ne]), { className: Ne, style: Pe } = d(() => ({
		className: [u[X.Root], n.className].filter(Boolean).join(" "),
		style: {
			...E?.[X.Root],
			...n.style
		}
	}), [
		u,
		n.className,
		n.style,
		E
	]), Fe = gb(n), Ie = f(null);
	ix(Ie, !!n.animate, {
		classNames: u,
		months: I,
		focused: oe,
		dateLib: c
	});
	let Le = {
		dayPickerProps: n,
		selected: B,
		select: ie,
		isSelected: z,
		months: I,
		nextMonth: te,
		previousMonth: R,
		goToMonth: ne,
		getModifiers: re,
		components: i,
		classNames: u,
		styles: E,
		labels: s,
		formatters: a
	};
	return t.createElement(Hy.Provider, { value: Le }, t.createElement(i.Root, {
		rootRef: n.animate ? Ie : void 0,
		className: Ne,
		style: Pe,
		dir: n.dir,
		id: n.id,
		lang: n.lang ?? l.code,
		nonce: n.nonce,
		title: n.title,
		role: n.role,
		"aria-label": n["aria-label"],
		"aria-labelledby": n["aria-labelledby"],
		...Fe
	}, t.createElement(i.Months, {
		className: u[X.Months],
		style: E?.[X.Months]
	}, !n.hideNavigation && !h && t.createElement(i.Nav, {
		"data-animated-nav": n.animate ? "true" : void 0,
		className: u[X.Nav],
		style: E?.[X.Nav],
		"aria-label": me(),
		onPreviousClick: Ce,
		onNextClick: we,
		previousMonth: R,
		nextMonth: te
	}), I.map((e, r) => t.createElement(i.Month, {
		"data-animated-month": n.animate ? "true" : void 0,
		className: u[X.Month],
		style: E?.[X.Month],
		key: r,
		displayIndex: r,
		calendarMonth: e
	}, h === "around" && !n.hideNavigation && r === 0 && t.createElement(i.PreviousMonthButton, {
		type: "button",
		className: u[X.PreviousMonthButton],
		tabIndex: R ? void 0 : -1,
		"aria-disabled": R ? void 0 : !0,
		"aria-label": he(R),
		onClick: Ce,
		"data-animated-button": n.animate ? "true" : void 0
	}, t.createElement(i.Chevron, {
		disabled: R ? void 0 : !0,
		className: u[X.Chevron],
		orientation: n.dir === "rtl" ? "right" : "left"
	})), t.createElement(i.MonthCaption, {
		"data-animated-caption": n.animate ? "true" : void 0,
		className: u[X.MonthCaption],
		style: E?.[X.MonthCaption],
		calendarMonth: e,
		displayIndex: r
	}, p?.startsWith("dropdown") ? t.createElement(i.DropdownNav, {
		className: u[X.Dropdowns],
		style: E?.[X.Dropdowns]
	}, (() => {
		let r = p === "dropdown" || p === "dropdown-months" ? t.createElement(i.MonthsDropdown, {
			key: "month",
			className: u[X.MonthsDropdown],
			"aria-label": pe(),
			classNames: u,
			components: i,
			disabled: !!n.disableNavigation,
			onChange: je(e.date),
			options: Kb(e.date, L, ee, a, c),
			style: E?.[X.Dropdown],
			value: c.getMonth(e.date)
		}) : t.createElement("span", { key: "month" }, k(e.date, c)), o = p === "dropdown" || p === "dropdown-years" ? t.createElement(i.YearsDropdown, {
			key: "year",
			className: u[X.YearsDropdown],
			"aria-label": be(c.options),
			classNames: u,
			components: i,
			disabled: !!n.disableNavigation,
			onChange: Me(e.date),
			options: Yb(L, ee, a, c, !!n.reverseYears),
			style: E?.[X.Dropdown],
			value: c.getYear(e.date)
		}) : t.createElement("span", { key: "year" }, N(e.date, c));
		return c.getMonthYearOrder() === "year-first" ? [o, r] : [r, o];
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
		className: u[X.CaptionLabel],
		role: "status",
		"aria-live": "polite"
	}, D(e.date, c.options, c))), h === "around" && !n.hideNavigation && r === g - 1 && t.createElement(i.NextMonthButton, {
		type: "button",
		className: u[X.NextMonthButton],
		tabIndex: te ? void 0 : -1,
		"aria-disabled": te ? void 0 : !0,
		"aria-label": ge(te),
		onClick: we,
		"data-animated-button": n.animate ? "true" : void 0
	}, t.createElement(i.Chevron, {
		disabled: te ? void 0 : !0,
		className: u[X.Chevron],
		orientation: n.dir === "rtl" ? "left" : "right"
	})), r === g - 1 && h === "after" && !n.hideNavigation && t.createElement(i.Nav, {
		"data-animated-nav": n.animate ? "true" : void 0,
		className: u[X.Nav],
		style: E?.[X.Nav],
		"aria-label": me(),
		onPreviousClick: Ce,
		onNextClick: we,
		previousMonth: R,
		nextMonth: te
	}), t.createElement(i.MonthGrid, {
		role: "grid",
		"aria-multiselectable": m === "multiple" || m === "range",
		"aria-label": fe(e.date, c.options, c) || void 0,
		className: u[X.MonthGrid],
		style: E?.[X.MonthGrid]
	}, !n.hideWeekdays && t.createElement(i.Weekdays, {
		"data-animated-weekdays": n.animate ? "true" : void 0,
		className: u[X.Weekdays],
		style: E?.[X.Weekdays]
	}, T && t.createElement(i.WeekNumberHeader, {
		"aria-label": ye(c.options),
		className: u[X.WeekNumberHeader],
		style: E?.[X.WeekNumberHeader],
		scope: "col"
	}, j()), xe.map((e) => t.createElement(i.Weekday, {
		"aria-label": _e(e, c.options, c),
		className: u[X.Weekday],
		key: String(e),
		style: E?.[X.Weekday],
		scope: "col"
	}, M(e, c.options, c)))), t.createElement(i.Weeks, {
		"data-animated-weeks": n.animate ? "true" : void 0,
		className: u[X.Weeks],
		style: E?.[X.Weeks]
	}, e.weeks.map((e) => t.createElement(i.Week, {
		className: u[X.Week],
		key: e.weekNumber,
		style: E?.[X.Week],
		week: e
	}, T && t.createElement(i.WeekNumber, {
		week: e,
		style: E?.[X.WeekNumber],
		"aria-label": ve(e.weekNumber, { locale: l }),
		className: u[X.WeekNumber],
		scope: "row",
		role: "rowheader"
	}, A(e.weekNumber, c)), e.days.map((e) => {
		let { date: r } = e, a = re(e);
		if (a[Z.focused] = !a.hidden && !!oe?.isEqualTo(e), a[Ny.selected] = z?.(r) || a.selected, sb(B)) {
			let { from: e, to: t } = B;
			a[Ny.range_start] = !!(e && t && c.isSameDay(r, e)), a[Ny.range_end] = !!(e && t && c.isSameDay(r, t)), a[Ny.range_middle] = ab(B, r, !0, c);
		}
		let o = qb(a, E, n.modifiersStyles), s = mb(a, u, n.modifiersClassNames), l = !Se && !a.hidden ? de(r, a, c.options, c) : void 0;
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
			className: u[X.DayButton],
			style: E?.[X.DayButton],
			type: "button",
			day: e,
			modifiers: a,
			disabled: !a.focused && a.disabled || void 0,
			"aria-disabled": a.focused && a.disabled || void 0,
			tabIndex: se(e) ? 0 : -1,
			"aria-label": ue(r, a, c.options, c),
			onClick: Te(e, a),
			onBlur: De(e, a),
			onFocus: Ee(e, a),
			onKeyDown: Oe(e, a),
			onMouseEnter: ke(e, a),
			onMouseLeave: Ae(e, a)
		}, O(r, c.options, c)) : !a.hidden && O(e.date, c.options, c));
	})))))))), n.footer && t.createElement(i.Footer, {
		className: u[X.Footer],
		style: E?.[X.Footer],
		role: "status",
		"aria-live": "polite"
	}, n.footer)));
}
var Fx = {
	content: "_content_1g7q0_1",
	popoverShow: "_popoverShow_1g7q0_1",
	popoverHide: "_popoverHide_1g7q0_1"
}, Ix = {
	months: "_months_10vfu_1",
	month: "_month_10vfu_1",
	caption: "_caption_10vfu_19",
	caption_label: "_caption_label_10vfu_27",
	nav: "_nav_10vfu_34",
	table: "_table_10vfu_40",
	head_cell: "_head_cell_10vfu_45",
	cell: "_cell_10vfu_54",
	day: "_day_10vfu_61",
	day_selected: "_day_selected_10vfu_79",
	day_today: "_day_today_10vfu_85",
	day_outside: "_day_outside_10vfu_91",
	day_range_middle: "_day_range_middle_10vfu_95",
	day_range_start: "_day_range_start_10vfu_101",
	day_range_end: "_day_range_end_10vfu_105",
	rdpScope: "_rdpScope_10vfu_110"
}, Lx = {
	wrapper: "_wrapper_bsvsi_2",
	label: "_label_bsvsi_11",
	triggerBtn: "_triggerBtn_bsvsi_18",
	triggerBtnEmpty: "_triggerBtnEmpty_bsvsi_31",
	calendarIcon: "_calendarIcon_bsvsi_36",
	prefixo: "_prefixo_bsvsi_43",
	popoverContent: "_popoverContent_bsvsi_50",
	errorMessage: "_errorMessage_bsvsi_56"
}, Rx = $c, zx = el, Bx = e.forwardRef(({ className: e, align: t = "center", sideOffset: n = 4, ...r }, i) => /* @__PURE__ */ g(tl, { children: /* @__PURE__ */ g(nl, {
	ref: i,
	align: t,
	sideOffset: n,
	className: T(Fx.content, e),
	...r
}) }));
function Vx({ className: e, classNames: t, showOutsideDays: n = !0, ...r }) {
	return /* @__PURE__ */ g(Px, {
		locale: iy,
		showOutsideDays: n,
		className: T(Ix.rdpScope, e),
		classNames: t,
		components: { Chevron: ({ orientation: e }) => /* @__PURE__ */ g(e === "left" ? ge : _e, { size: 16 }) },
		...r
	});
}
var Hx = e.forwardRef(({ date: t, onSelect: n, label: r, error: i, placeholder: a = "Selecione uma data", className: o, id: s, formato: c = "PPP", prefixo: l, minDate: u, maxDate: d, desabilitar: f }, p) => {
	let m = !!i, [h, v] = e.useState(!1), y = s || `datepicker-${r?.replace(/\s+/g, "-").toLowerCase()}`;
	return /* @__PURE__ */ _("div", {
		...j("DatePicker"),
		className: T(Lx.wrapper, o),
		children: [
			r && /* @__PURE__ */ g("label", {
				htmlFor: y,
				className: Lx.label,
				children: r
			}),
			/* @__PURE__ */ _(Rx, {
				open: h,
				onOpenChange: v,
				children: [/* @__PURE__ */ g(zx, {
					asChild: !0,
					children: /* @__PURE__ */ _("button", {
						id: y,
						ref: p,
						type: "button",
						className: T(it({
							hasError: m,
							hasIcon: !1
						}), Lx.triggerBtn, !t && Lx.triggerBtnEmpty),
						children: [
							/* @__PURE__ */ g(fe, {
								className: Lx.calendarIcon,
								size: 16
							}),
							l && t && /* @__PURE__ */ g("span", {
								className: Lx.prefixo,
								children: l
							}),
							t ? Uv(t, c, { locale: iy }) : /* @__PURE__ */ g("span", { children: a })
						]
					})
				}), /* @__PURE__ */ g(Bx, {
					...j("DatePicker"),
					className: Lx.popoverContent,
					children: /* @__PURE__ */ g(Vx, {
						mode: "single",
						selected: t,
						defaultMonth: t,
						startMonth: u,
						endMonth: d,
						disabled: u || d || f ? [
							...u ? [{ before: u }] : [],
							...d ? [{ after: d }] : [],
							...f ? [f] : []
						] : void 0,
						onSelect: (e) => {
							n?.(e), v(!1);
						},
						initialFocus: !0
					})
				})]
			}),
			i && /* @__PURE__ */ g("span", {
				className: Lx.errorMessage,
				children: i
			})
		]
	});
});
Hx.displayName = "DatePicker";
var Ux = {
	container: "_container_pq162_1",
	label: "_label_pq162_19",
	trigger: "_trigger_pq162_31",
	triggerActive: "_triggerActive_pq162_65",
	triggerError: "_triggerError_pq162_75",
	value: "_value_pq162_83",
	sizer: "_sizer_pq162_101",
	placeholder: "_placeholder_pq162_125",
	icon: "_icon_pq162_133",
	iconOpen: "_iconOpen_pq162_143",
	dropdown: "_dropdown_pq162_151",
	slideDown: "_slideDown_pq162_1",
	option: "_option_pq162_183",
	optionSelected: "_optionSelected_pq162_215",
	checkIcon: "_checkIcon_pq162_227",
	errorMessage: "_errorMessage_pq162_235"
}, Wx = ({ options: e, value: t, onChange: n, label: r, fitOptions: i, error: a, placeholder: o = "Selecione...", className: s }) => {
	let [c, d] = p(!1), [m, h] = p({
		top: 0,
		left: 0,
		width: 0
	}), v = f(null), b = f(null), x = e.find((e) => e.value === t), S = (e, t) => {
		t.preventDefault(), t.stopPropagation(), n && n(e.value), setTimeout(() => {
			d(!1);
		}, 0);
	};
	return u(() => {
		if (c && b.current) {
			let e = b.current.getBoundingClientRect();
			h({
				top: e.bottom + window.scrollY,
				left: e.left + window.scrollX,
				width: e.width
			});
		}
	}, [c]), l(() => {
		let e = (e) => {
			b.current?.contains(e.target) || document.getElementById("avere-select-portal")?.contains(e.target) || d(!1);
		};
		return c && document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [c]), /* @__PURE__ */ _("div", {
		...j("Select"),
		className: T(Ux.container, s),
		ref: v,
		children: [
			r && /* @__PURE__ */ g("label", {
				className: Ux.label,
				children: r
			}),
			/* @__PURE__ */ _("div", {
				ref: b,
				className: T(Ux.trigger, c && Ux.triggerActive, a && Ux.triggerError),
				onClick: (e) => {
					e.stopPropagation(), d(!c);
				},
				children: [/* @__PURE__ */ _("span", {
					className: T(Ux.value, !x && Ux.placeholder),
					children: [x ? x.label : o, i && /* @__PURE__ */ _("span", {
						"aria-hidden": "true",
						className: Ux.sizer,
						children: [e.map((e) => /* @__PURE__ */ g("span", { children: e.label }, String(e.value))), o && /* @__PURE__ */ g("span", { children: o })]
					})]
				}), /* @__PURE__ */ g(he, {
					size: 18,
					className: T(Ux.icon, c && Ux.iconOpen)
				})]
			}),
			c && y.createPortal(/* @__PURE__ */ g("div", {
				...j("Select"),
				id: "avere-select-portal",
				className: Ux.dropdown,
				style: {
					position: "absolute",
					top: `${m.top}px`,
					left: `${m.left}px`,
					width: `${m.width}px`,
					zIndex: 99999,
					fontFamily: "Montserrat, sans-serif"
				},
				children: e.map((e) => /* @__PURE__ */ _("div", {
					className: T(Ux.option, t === e.value && Ux.optionSelected),
					onMouseDown: (t) => S(e, t),
					children: [/* @__PURE__ */ g("span", {
						style: { pointerEvents: "none" },
						children: e.label
					}), t === e.value && /* @__PURE__ */ g(me, {
						size: 16,
						className: Ux.checkIcon
					})]
				}, e.value))
			}), document.body),
			a && /* @__PURE__ */ g("span", {
				className: Ux.errorMessage,
				children: a
			})
		]
	});
}, [Gx, Kx] = dt("Tooltip", [Vo]), qx = Vo(), Jx = "TooltipProvider", Yx = 700, Xx = "tooltip.open", [Zx, Qx] = Gx(Jx), $x = (t) => {
	let { __scopeTooltip: n, delayDuration: r = Yx, skipDelayDuration: i = 300, disableHoverableContent: a = !1, children: o } = t, s = e.useRef(!0), c = e.useRef(!1), l = e.useRef(0);
	return e.useEffect(() => {
		let e = l.current;
		return () => window.clearTimeout(e);
	}, []), /* @__PURE__ */ g(Zx, {
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
$x.displayName = Jx;
var eS = "Tooltip", [tS, nS] = Gx(eS), rS = (t) => {
	let { __scopeTooltip: n, children: r, open: i, defaultOpen: a, onOpenChange: o, disableHoverableContent: s, delayDuration: c } = t, l = Qx(eS, t.__scopeTooltip), u = qx(n), [d, f] = e.useState(null), p = Tt(), m = e.useRef(0), h = s ?? l.disableHoverableContent, _ = c ?? l.delayDuration, v = e.useRef(!1), [y, b] = Ot({
		prop: i,
		defaultProp: a ?? !1,
		onChange: (e) => {
			e ? (l.onOpen(), document.dispatchEvent(new CustomEvent(Xx))) : l.onClose(), o?.(e);
		},
		caller: eS
	}), x = e.useMemo(() => y ? v.current ? "delayed-open" : "instant-open" : "closed", [y]), S = e.useCallback(() => {
		window.clearTimeout(m.current), m.current = 0, v.current = !1, b(!0);
	}, [b]), C = e.useCallback(() => {
		window.clearTimeout(m.current), m.current = 0, b(!1);
	}, [b]), w = e.useCallback(() => {
		window.clearTimeout(m.current), m.current = window.setTimeout(() => {
			v.current = !0, b(!0), m.current = 0;
		}, _);
	}, [_, b]);
	return e.useEffect(() => () => {
		m.current &&= (window.clearTimeout(m.current), 0);
	}, []), /* @__PURE__ */ g(rs, {
		...u,
		children: /* @__PURE__ */ g(tS, {
			scope: n,
			contentId: p,
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
				h ? C() : (window.clearTimeout(m.current), m.current = 0);
			}, [C, h]),
			onOpen: S,
			onClose: C,
			disableHoverableContent: h,
			children: r
		})
	});
};
rS.displayName = eS;
var iS = "TooltipTrigger", aS = e.forwardRef((t, n) => {
	let { __scopeTooltip: r, ...i } = t, a = nS(iS, r), o = Qx(iS, r), s = qx(r), c = H(n, e.useRef(null), a.onTriggerChange), l = e.useRef(!1), u = e.useRef(!1), d = e.useCallback(() => l.current = !1, []);
	return e.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), /* @__PURE__ */ g(is, {
		asChild: !0,
		...s,
		children: /* @__PURE__ */ g(U.button, {
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
aS.displayName = iS;
var oS = "TooltipPortal", [sS, cS] = Gx(oS, { forceMount: void 0 }), lS = (e) => {
	let { __scopeTooltip: t, forceMount: n, children: r, container: i } = e, a = nS(oS, t);
	return /* @__PURE__ */ g(sS, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ g(rn, {
			present: n || a.open,
			children: /* @__PURE__ */ g(cs, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
};
lS.displayName = oS;
var uS = "TooltipContent", dS = e.forwardRef((e, t) => {
	let n = cS(uS, e.__scopeTooltip), { forceMount: r = n.forceMount, side: i = "top", ...a } = e, o = nS(uS, e.__scopeTooltip);
	return /* @__PURE__ */ g(rn, {
		present: r || o.open,
		children: o.disableHoverableContent ? /* @__PURE__ */ g(gS, {
			side: i,
			...a,
			ref: t
		}) : /* @__PURE__ */ g(fS, {
			side: i,
			...a,
			ref: t
		})
	});
}), fS = e.forwardRef((t, n) => {
	let r = nS(uS, t.__scopeTooltip), i = Qx(uS, t.__scopeTooltip), a = e.useRef(null), o = H(n, a), [s, c] = e.useState(null), { trigger: l, onClose: u } = r, d = a.current, { onPointerInTransitChange: f } = i, p = e.useCallback(() => {
		c(null), f(!1);
	}, [f]), m = e.useCallback((e, t) => {
		let n = e.currentTarget, r = {
			x: e.clientX,
			y: e.clientY
		}, i = bS(r, yS(r, n.getBoundingClientRect())), a = xS(t.getBoundingClientRect());
		c(CS([...i, ...a])), f(!0);
	}, [f]);
	return e.useEffect(() => () => p(), [p]), e.useEffect(() => {
		if (l && d) {
			let e = (e) => m(e, d), t = (e) => m(e, l);
			return l.addEventListener("pointerleave", e), d.addEventListener("pointerleave", t), () => {
				l.removeEventListener("pointerleave", e), d.removeEventListener("pointerleave", t);
			};
		}
	}, [
		l,
		d,
		m,
		p
	]), e.useEffect(() => {
		if (s) {
			let e = (e) => {
				let t = e.target, n = {
					x: e.clientX,
					y: e.clientY
				}, r = l?.contains(t) || d?.contains(t), i = !SS(n, s);
				r ? p() : i && (p(), u());
			};
			return document.addEventListener("pointermove", e), () => document.removeEventListener("pointermove", e);
		}
	}, [
		l,
		d,
		s,
		u,
		p
	]), /* @__PURE__ */ g(gS, {
		...t,
		ref: o
	});
}), [pS, mS] = Gx(eS, { isInside: !1 }), hS = /* @__PURE__ */ gt("TooltipContent"), gS = e.forwardRef((t, n) => {
	let { __scopeTooltip: r, children: i, "aria-label": a, onEscapeKeyDown: o, onPointerDownOutside: s, ...c } = t, l = nS(uS, r), u = qx(r), { onClose: d } = l;
	return e.useEffect(() => (document.addEventListener(Xx, d), () => document.removeEventListener(Xx, d)), [d]), e.useEffect(() => {
		if (l.trigger) {
			let e = (e) => {
				e.target?.contains(l.trigger) && d();
			};
			return window.addEventListener("scroll", e, { capture: !0 }), () => window.removeEventListener("scroll", e, { capture: !0 });
		}
	}, [l.trigger, d]), /* @__PURE__ */ g(Zr, {
		asChild: !0,
		disableOutsidePointerEvents: !1,
		onEscapeKeyDown: o,
		onPointerDownOutside: s,
		onFocusOutside: (e) => e.preventDefault(),
		onDismiss: d,
		children: /* @__PURE__ */ _(as, {
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
			children: [/* @__PURE__ */ g(hS, { children: i }), /* @__PURE__ */ g(pS, {
				scope: r,
				isInside: !0,
				children: /* @__PURE__ */ g(ul, {
					id: l.contentId,
					role: "tooltip",
					children: a || i
				})
			})]
		})
	});
});
dS.displayName = uS;
var _S = "TooltipArrow", vS = e.forwardRef((e, t) => {
	let { __scopeTooltip: n, ...r } = e, i = qx(n);
	return mS(_S, n).isInside ? null : /* @__PURE__ */ g(os, {
		...i,
		...r,
		ref: t
	});
});
vS.displayName = _S;
function yS(e, t) {
	let n = Math.abs(t.top - e.y), r = Math.abs(t.bottom - e.y), i = Math.abs(t.right - e.x), a = Math.abs(t.left - e.x);
	switch (Math.min(n, r, i, a)) {
		case a: return "left";
		case i: return "right";
		case n: return "top";
		case r: return "bottom";
		default: throw Error("unreachable");
	}
}
function bS(e, t, n = 5) {
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
function xS(e) {
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
function SS(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e], s = t[a], c = o.x, l = o.y, u = s.x, d = s.y;
		l > r != d > r && n < (u - c) * (r - l) / (d - l) + c && (i = !i);
	}
	return i;
}
function CS(e) {
	let t = e.slice();
	return t.sort((e, t) => e.x < t.x ? -1 : e.x > t.x ? 1 : e.y < t.y ? -1 : e.y > t.y ? 1 : 0), wS(t);
}
function wS(e) {
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
var TS = $x, ES = rS, DS = aS, OS = dS, kS = {
	content: "_content_phmwu_1",
	"tooltip-show": "_tooltip-show_phmwu_1",
	"tooltip-hide": "_tooltip-hide_phmwu_1",
	"slide-up": "_slide-up_phmwu_1",
	"slide-down": "_slide-down_phmwu_1",
	"slide-left": "_slide-left_phmwu_1",
	"slide-right": "_slide-right_phmwu_1"
}, AS = TS, jS = ES, MS = DS, NS = e.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ g(OS, {
	...j("Tooltip"),
	ref: r,
	sideOffset: t,
	className: T(kS.content, e),
	...n
}));
NS.displayName = OS.displayName;
//#endregion
//#region node_modules/sonner/dist/index.mjs
function PS(e) {
	if (!e || typeof document > "u") return;
	let t = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
	n.type = "text/css", t.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e));
}
var FS = (e) => {
	switch (e) {
		case "success": return RS;
		case "info": return BS;
		case "warning": return zS;
		case "error": return VS;
		default: return null;
	}
}, IS = Array(12).fill(0), LS = ({ visible: e, className: n }) => /* @__PURE__ */ t.createElement("div", {
	className: ["sonner-loading-wrapper", n].filter(Boolean).join(" "),
	"data-visible": e
}, /* @__PURE__ */ t.createElement("div", { className: "sonner-spinner" }, IS.map((e, n) => /* @__PURE__ */ t.createElement("div", {
	className: "sonner-loading-bar",
	key: `spinner-bar-${n}`
})))), RS = /* @__PURE__ */ t.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20"
}, /* @__PURE__ */ t.createElement("path", {
	fillRule: "evenodd",
	d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
	clipRule: "evenodd"
})), zS = /* @__PURE__ */ t.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "currentColor",
	height: "20",
	width: "20"
}, /* @__PURE__ */ t.createElement("path", {
	fillRule: "evenodd",
	d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
	clipRule: "evenodd"
})), BS = /* @__PURE__ */ t.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20"
}, /* @__PURE__ */ t.createElement("path", {
	fillRule: "evenodd",
	d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
	clipRule: "evenodd"
})), VS = /* @__PURE__ */ t.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20"
}, /* @__PURE__ */ t.createElement("path", {
	fillRule: "evenodd",
	d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
	clipRule: "evenodd"
})), HS = /* @__PURE__ */ t.createElement("svg", {
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
})), US = () => {
	let [e, n] = t.useState(document.hidden);
	return t.useEffect(() => {
		let e = () => {
			n(document.hidden);
		};
		return document.addEventListener("visibilitychange", e), () => window.removeEventListener("visibilitychange", e);
	}, []), e;
}, WS = 1, GS = new class {
	constructor() {
		this.subscribe = (e) => (this.subscribers.push(e), () => {
			let t = this.subscribers.indexOf(e);
			this.subscribers.splice(t, 1);
		}), this.publish = (e) => {
			this.subscribers.forEach((t) => t(e));
		}, this.addToast = (e) => {
			this.publish(e), this.toasts = [...this.toasts, e];
		}, this.create = (e) => {
			let { message: t, ...n } = e, r = typeof e?.id == "number" || e.id?.length > 0 ? e.id : WS++, i = this.toasts.find((e) => e.id === r), a = e.dismissible === void 0 ? !0 : e.dismissible;
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
				else if (qS(e) && !e.ok) {
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
			let n = t?.id || WS++;
			return this.create({
				jsx: e(n),
				id: n,
				...t
			}), n;
		}, this.getActiveToasts = () => this.toasts.filter((e) => !this.dismissedToasts.has(e.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
	}
}(), KS = (e, t) => {
	let n = t?.id || WS++;
	return GS.addToast({
		title: e,
		...t,
		id: n
	}), n;
}, qS = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", JS = KS, YS = Object.assign(JS, {
	success: GS.success,
	info: GS.info,
	warning: GS.warning,
	error: GS.error,
	custom: GS.custom,
	message: GS.message,
	promise: GS.promise,
	dismiss: GS.dismiss,
	loading: GS.loading
}, {
	getHistory: () => GS.toasts,
	getToasts: () => GS.getActiveToasts()
});
PS("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function XS(e) {
	return e.label !== void 0;
}
var ZS = 3, QS = "24px", $S = "16px", eC = 4e3, tC = 356, nC = 14, rC = 45, iC = 200;
function aC(...e) {
	return e.filter(Boolean).join(" ");
}
function oC(e) {
	let [t, n] = e.split("-"), r = [];
	return t && r.push(t), n && r.push(n), r;
}
var sC = (e) => {
	let { invert: n, toast: r, unstyled: i, interacting: a, setHeights: o, visibleToasts: s, heights: c, index: l, toasts: u, expanded: d, removeToast: f, defaultRichColors: p, closeButton: m, style: h, cancelButtonStyle: g, actionButtonStyle: _, className: v = "", descriptionClassName: y = "", duration: b, position: x, gap: S, expandByDefault: C, classNames: w, icons: T, closeButtonAriaLabel: E = "Close toast" } = e, [D, O] = t.useState(null), [k, A] = t.useState(null), [j, M] = t.useState(!1), [N, P] = t.useState(!1), [F, I] = t.useState(!1), [L, ee] = t.useState(!1), [R, te] = t.useState(!1), [ne, re] = t.useState(0), [z, ie] = t.useState(0), B = t.useRef(r.duration || b || eC), ae = t.useRef(null), oe = t.useRef(null), se = l === 0, ce = l + 1 <= s, le = r.type, ue = r.dismissible !== !1, de = r.className || "", fe = r.descriptionClassName || "", pe = t.useMemo(() => c.findIndex((e) => e.toastId === r.id) || 0, [c, r.id]), me = t.useMemo(() => r.closeButton ?? m, [r.closeButton, m]), he = t.useMemo(() => r.duration || b || eC, [r.duration, b]), ge = t.useRef(0), _e = t.useRef(0), ve = t.useRef(0), ye = t.useRef(null), [be, xe] = x.split("-"), Se = t.useMemo(() => c.reduce((e, t, n) => n >= pe ? e : e + t.height, 0), [c, pe]), Ce = US(), we = r.invert || n, Te = le === "loading";
	_e.current = t.useMemo(() => pe * S + Se, [pe, Se]), t.useEffect(() => {
		B.current = he;
	}, [he]), t.useEffect(() => {
		M(!0);
	}, []), t.useEffect(() => {
		let e = oe.current;
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
		let e = oe.current, t = e.style.height;
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
	let Ee = t.useCallback(() => {
		P(!0), re(_e.current), o((e) => e.filter((e) => e.toastId !== r.id)), setTimeout(() => {
			f(r);
		}, iC);
	}, [
		r,
		f,
		o,
		_e
	]);
	t.useEffect(() => {
		if (r.promise && le === "loading" || r.duration === Infinity || r.type === "loading") return;
		let e;
		return d || a || Ce ? (() => {
			if (ve.current < ge.current) {
				let e = (/* @__PURE__ */ new Date()).getTime() - ge.current;
				B.current -= e;
			}
			ve.current = (/* @__PURE__ */ new Date()).getTime();
		})() : B.current !== Infinity && (ge.current = (/* @__PURE__ */ new Date()).getTime(), e = setTimeout(() => {
			r.onAutoClose == null || r.onAutoClose.call(r, r), Ee();
		}, B.current)), () => clearTimeout(e);
	}, [
		d,
		a,
		r,
		le,
		Ce,
		Ee
	]), t.useEffect(() => {
		r.delete && (Ee(), r.onDismiss == null || r.onDismiss.call(r, r));
	}, [Ee, r.delete]);
	function De() {
		return T?.loading ? /* @__PURE__ */ t.createElement("div", {
			className: aC(w?.loader, r?.classNames?.loader, "sonner-loader"),
			"data-visible": le === "loading"
		}, T.loading) : /* @__PURE__ */ t.createElement(LS, {
			className: aC(w?.loader, r?.classNames?.loader),
			visible: le === "loading"
		});
	}
	let Oe = r.icon || T?.[le] || FS(le);
	return /* @__PURE__ */ t.createElement("li", {
		tabIndex: 0,
		ref: oe,
		className: aC(v, de, w?.toast, r?.classNames?.toast, w?.default, w?.[le], r?.classNames?.[le]),
		"data-sonner-toast": "",
		"data-rich-colors": r.richColors ?? p,
		"data-styled": !(r.jsx || r.unstyled || i),
		"data-mounted": j,
		"data-promise": !!r.promise,
		"data-swiped": R,
		"data-removed": N,
		"data-visible": ce,
		"data-y-position": be,
		"data-x-position": xe,
		"data-index": l,
		"data-front": se,
		"data-swiping": F,
		"data-dismissible": ue,
		"data-type": le,
		"data-invert": we,
		"data-swipe-out": L,
		"data-swipe-direction": k,
		"data-expanded": !!(d || C && j),
		"data-testid": r.testId,
		style: {
			"--index": l,
			"--toasts-before": l,
			"--z-index": u.length - l,
			"--offset": `${N ? ne : _e.current}px`,
			"--initial-height": C ? "auto" : `${z}px`,
			...h,
			...r.style
		},
		onDragEnd: () => {
			I(!1), O(null), ye.current = null;
		},
		onPointerDown: (e) => {
			e.button !== 2 && (Te || !ue || (ae.current = /* @__PURE__ */ new Date(), re(_e.current), e.target.setPointerCapture(e.pointerId), e.target.tagName !== "BUTTON" && (I(!0), ye.current = {
				x: e.clientX,
				y: e.clientY
			})));
		},
		onPointerUp: () => {
			if (L || !ue) return;
			ye.current = null;
			let e = Number(oe.current?.style.getPropertyValue("--swipe-amount-x").replace("px", "") || 0), t = Number(oe.current?.style.getPropertyValue("--swipe-amount-y").replace("px", "") || 0), n = (/* @__PURE__ */ new Date()).getTime() - ae.current?.getTime(), i = D === "x" ? e : t, a = Math.abs(i) / n;
			if (Math.abs(i) >= rC || a > .11) {
				re(_e.current), r.onDismiss == null || r.onDismiss.call(r, r), A(D === "x" ? e > 0 ? "right" : "left" : t > 0 ? "down" : "up"), Ee(), ee(!0);
				return;
			} else {
				var o, s;
				(o = oe.current) == null || o.style.setProperty("--swipe-amount-x", "0px"), (s = oe.current) == null || s.style.setProperty("--swipe-amount-y", "0px");
			}
			te(!1), I(!1), O(null);
		},
		onPointerMove: (t) => {
			var n, r;
			if (!ye.current || !ue || window.getSelection()?.toString().length > 0) return;
			let i = t.clientY - ye.current.y, a = t.clientX - ye.current.x, o = e.swipeDirections ?? oC(x);
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
			(Math.abs(s.x) > 0 || Math.abs(s.y) > 0) && te(!0), (n = oe.current) == null || n.style.setProperty("--swipe-amount-x", `${s.x}px`), (r = oe.current) == null || r.style.setProperty("--swipe-amount-y", `${s.y}px`);
		}
	}, me && !r.jsx && le !== "loading" ? /* @__PURE__ */ t.createElement("button", {
		"aria-label": E,
		"data-disabled": Te,
		"data-close-button": !0,
		onClick: Te || !ue ? () => {} : () => {
			Ee(), r.onDismiss == null || r.onDismiss.call(r, r);
		},
		className: aC(w?.closeButton, r?.classNames?.closeButton)
	}, T?.close ?? HS) : null, (le || r.icon || r.promise) && r.icon !== null && (T?.[le] !== null || r.icon) ? /* @__PURE__ */ t.createElement("div", {
		"data-icon": "",
		className: aC(w?.icon, r?.classNames?.icon)
	}, r.promise || r.type === "loading" && !r.icon ? r.icon || De() : null, r.type === "loading" ? null : Oe) : null, /* @__PURE__ */ t.createElement("div", {
		"data-content": "",
		className: aC(w?.content, r?.classNames?.content)
	}, /* @__PURE__ */ t.createElement("div", {
		"data-title": "",
		className: aC(w?.title, r?.classNames?.title)
	}, r.jsx ? r.jsx : typeof r.title == "function" ? r.title() : r.title), r.description ? /* @__PURE__ */ t.createElement("div", {
		"data-description": "",
		className: aC(y, fe, w?.description, r?.classNames?.description)
	}, typeof r.description == "function" ? r.description() : r.description) : null), /* @__PURE__ */ t.isValidElement(r.cancel) ? r.cancel : r.cancel && XS(r.cancel) ? /* @__PURE__ */ t.createElement("button", {
		"data-button": !0,
		"data-cancel": !0,
		style: r.cancelButtonStyle || g,
		onClick: (e) => {
			XS(r.cancel) && ue && (r.cancel.onClick == null || r.cancel.onClick.call(r.cancel, e), Ee());
		},
		className: aC(w?.cancelButton, r?.classNames?.cancelButton)
	}, r.cancel.label) : null, /* @__PURE__ */ t.isValidElement(r.action) ? r.action : r.action && XS(r.action) ? /* @__PURE__ */ t.createElement("button", {
		"data-button": !0,
		"data-action": !0,
		style: r.actionButtonStyle || _,
		onClick: (e) => {
			XS(r.action) && (r.action.onClick == null || r.action.onClick.call(r.action, e), !e.defaultPrevented && Ee());
		},
		className: aC(w?.actionButton, r?.classNames?.actionButton)
	}, r.action.label) : null);
};
function cC() {
	if (typeof window > "u" || typeof document > "u") return "ltr";
	let e = document.documentElement.getAttribute("dir");
	return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function lC(e, t) {
	let n = {};
	return [e, t].forEach((e, t) => {
		let r = t === 1, i = r ? "--mobile-offset" : "--offset", a = r ? $S : QS;
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
var uC = /* @__PURE__ */ t.forwardRef(function(e, n) {
	let { id: r, invert: i, position: a = "bottom-right", hotkey: o = ["altKey", "KeyT"], expand: s, closeButton: c, className: l, offset: u, mobileOffset: d, theme: f = "light", richColors: p, duration: m, style: h, visibleToasts: g = ZS, toastOptions: _, dir: v = cC(), gap: b = nC, icons: x, containerAriaLabel: S = "Notifications" } = e, [C, w] = t.useState([]), T = t.useMemo(() => r ? C.filter((e) => e.toasterId === r) : C.filter((e) => !e.toasterId), [C, r]), E = t.useMemo(() => Array.from(new Set([a].concat(T.filter((e) => e.position).map((e) => e.position)))), [T, a]), [D, O] = t.useState([]), [k, A] = t.useState(!1), [j, M] = t.useState(!1), [N, P] = t.useState(f === "system" ? typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : f), F = t.useRef(null), I = o.join("+").replace(/Key/g, "").replace(/Digit/g, ""), L = t.useRef(null), ee = t.useRef(!1), R = t.useCallback((e) => {
		w((t) => (t.find((t) => t.id === e.id)?.delete || GS.dismiss(e.id), t.filter(({ id: t }) => t !== e.id)));
	}, []);
	return t.useEffect(() => GS.subscribe((e) => {
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
			y.flushSync(() => {
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
			dir: v === "auto" ? cC() : v,
			tabIndex: -1,
			ref: F,
			className: l,
			"data-sonner-toaster": !0,
			"data-sonner-theme": N,
			"data-y-position": a,
			"data-x-position": o,
			style: {
				"--front-toast-height": `${D[0]?.height || 0}px`,
				"--width": `${tC}px`,
				"--gap": `${b}px`,
				...h,
				...lC(u, d)
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
		}, T.filter((e) => !e.position && r === 0 || e.position === n).map((r, a) => /* @__PURE__ */ t.createElement(sC, {
			key: r.id,
			icons: x,
			index: a,
			toast: r,
			defaultRichColors: p,
			duration: _?.duration ?? m,
			className: _?.className,
			descriptionClassName: _?.descriptionClassName,
			invert: i,
			visibleToasts: g,
			closeButton: _?.closeButton ?? c,
			interacting: j,
			position: n,
			style: _?.style,
			unstyled: _?.unstyled,
			classNames: _?.classNames,
			cancelButtonStyle: _?.cancelButtonStyle,
			actionButtonStyle: _?.actionButtonStyle,
			closeButtonAriaLabel: _?.closeButtonAriaLabel,
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
}), dC = {
	toast: "_toast_4s9xe_1",
	description: "_description_4s9xe_23",
	actionButton: "_actionButton_4s9xe_33",
	cancelButton: "_cancelButton_4s9xe_47",
	success: "_success_4s9xe_61",
	error: "_error_4s9xe_73",
	warning: "_warning_4s9xe_85",
	info: "_info_4s9xe_97"
}, fC = ({ ...e }) => /* @__PURE__ */ g(uC, {
	toastOptions: { classNames: {
		toast: dC.toast,
		description: dC.description,
		actionButton: dC.actionButton,
		cancelButton: dC.cancelButton,
		success: dC.success,
		error: dC.error,
		warning: dC.warning,
		info: dC.info
	} },
	...e
}), pC = "Dialog", [mC, hC] = dt(pC), [gC, _C] = mC(pC), vC = (t) => {
	let { __scopeDialog: n, children: r, open: i, defaultOpen: a, onOpenChange: o, modal: s = !0 } = t, c = e.useRef(null), l = e.useRef(null), [u, d] = Ot({
		prop: i,
		defaultProp: a ?? !1,
		onChange: o,
		caller: pC
	});
	return /* @__PURE__ */ g(gC, {
		scope: n,
		triggerRef: c,
		contentRef: l,
		contentId: Tt(),
		titleId: Tt(),
		descriptionId: Tt(),
		open: u,
		onOpenChange: d,
		onOpenToggle: e.useCallback(() => d((e) => !e), [d]),
		modal: s,
		children: r
	});
};
vC.displayName = pC;
var yC = "DialogTrigger", bC = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = _C(yC, n), a = H(t, i.triggerRef);
	return /* @__PURE__ */ g(U.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": i.open,
		"aria-controls": i.contentId,
		"data-state": BC(i.open),
		...r,
		ref: a,
		onClick: V(e.onClick, i.onOpenToggle)
	});
});
bC.displayName = yC;
var xC = "DialogPortal", [SC, CC] = mC(xC, { forceMount: void 0 }), wC = (t) => {
	let { __scopeDialog: n, forceMount: r, children: i, container: a } = t, o = _C(xC, n);
	return /* @__PURE__ */ g(SC, {
		scope: n,
		forceMount: r,
		children: e.Children.map(i, (e) => /* @__PURE__ */ g(rn, {
			present: r || o.open,
			children: /* @__PURE__ */ g(cs, {
				asChild: !0,
				container: a,
				children: e
			})
		}))
	});
};
wC.displayName = xC;
var TC = "DialogOverlay", EC = e.forwardRef((e, t) => {
	let n = CC(TC, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = _C(TC, e.__scopeDialog);
	return a.modal ? /* @__PURE__ */ g(rn, {
		present: r || a.open,
		children: /* @__PURE__ */ g(OC, {
			...i,
			ref: t
		})
	}) : null;
});
EC.displayName = TC;
var DC = /* @__PURE__ */ pt("DialogOverlay.RemoveScroll"), OC = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = _C(TC, n);
	return /* @__PURE__ */ g(Ec, {
		as: DC,
		allowPinchZoom: !0,
		shards: [i.contentRef],
		children: /* @__PURE__ */ g(U.div, {
			"data-state": BC(i.open),
			...r,
			ref: t,
			style: {
				pointerEvents: "auto",
				...r.style
			}
		})
	});
}), kC = "DialogContent", AC = e.forwardRef((e, t) => {
	let n = CC(kC, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = _C(kC, e.__scopeDialog);
	return /* @__PURE__ */ g(rn, {
		present: r || a.open,
		children: a.modal ? /* @__PURE__ */ g(jC, {
			...i,
			ref: t
		}) : /* @__PURE__ */ g(MC, {
			...i,
			ref: t
		})
	});
});
AC.displayName = kC;
var jC = e.forwardRef((t, n) => {
	let r = _C(kC, t.__scopeDialog), i = e.useRef(null), a = H(n, r.contentRef, i);
	return e.useEffect(() => {
		let e = i.current;
		if (e) return _s(e);
	}, []), /* @__PURE__ */ g(NC, {
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
}), MC = e.forwardRef((t, n) => {
	let r = _C(kC, t.__scopeDialog), i = e.useRef(!1), a = e.useRef(!1);
	return /* @__PURE__ */ g(NC, {
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
}), NC = e.forwardRef((t, n) => {
	let { __scopeDialog: r, trapFocus: i, onOpenAutoFocus: a, onCloseAutoFocus: o, ...s } = t, c = _C(kC, r), l = e.useRef(null), u = H(n, l);
	return ai(), /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g(di, {
		asChild: !0,
		loop: !0,
		trapped: i,
		onMountAutoFocus: a,
		onUnmountAutoFocus: o,
		children: /* @__PURE__ */ g(Zr, {
			role: "dialog",
			id: c.contentId,
			"aria-describedby": c.descriptionId,
			"aria-labelledby": c.titleId,
			"data-state": BC(c.open),
			...s,
			ref: u,
			onDismiss: () => c.onOpenChange(!1)
		})
	}), /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g(WC, { titleId: c.titleId }), /* @__PURE__ */ g(KC, {
		contentRef: l,
		descriptionId: c.descriptionId
	})] })] });
}), PC = "DialogTitle", FC = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = _C(PC, n);
	return /* @__PURE__ */ g(U.h2, {
		id: i.titleId,
		...r,
		ref: t
	});
});
FC.displayName = PC;
var IC = "DialogDescription", LC = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = _C(IC, n);
	return /* @__PURE__ */ g(U.p, {
		id: i.descriptionId,
		...r,
		ref: t
	});
});
LC.displayName = IC;
var RC = "DialogClose", zC = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = _C(RC, n);
	return /* @__PURE__ */ g(U.button, {
		type: "button",
		...r,
		ref: t,
		onClick: V(e.onClick, () => i.onOpenChange(!1))
	});
});
zC.displayName = RC;
function BC(e) {
	return e ? "open" : "closed";
}
var VC = "DialogTitleWarning", [HC, UC] = ut(VC, {
	contentName: kC,
	titleName: PC,
	docsSlug: "dialog"
}), WC = ({ titleId: t }) => {
	let n = UC(VC), r = `\`${n.contentName}\` requires a \`${n.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${n.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${n.docsSlug}`;
	return e.useEffect(() => {
		t && (document.getElementById(t) || console.error(r));
	}, [r, t]), null;
}, GC = "DialogDescriptionWarning", KC = ({ contentRef: t, descriptionId: n }) => {
	let r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${UC(GC).contentName}}.`;
	return e.useEffect(() => {
		let e = t.current?.getAttribute("aria-describedby");
		n && e && (document.getElementById(n) || console.warn(r));
	}, [
		r,
		t,
		n
	]), null;
}, qC = vC, JC = bC, YC = wC, XC = EC, ZC = AC, QC = FC, $C = LC, ew = zC, tw = {
	overlay: "_overlay_1chod_1",
	fadeIn: "_fadeIn_1chod_1",
	fadeOut: "_fadeOut_1chod_1",
	content: "_content_1chod_35",
	modalShow: "_modalShow_1chod_1",
	modalHide: "_modalHide_1chod_1",
	closeButton: "_closeButton_1chod_93",
	header: "_header_1chod_145",
	footer: "_footer_1chod_159",
	title: "_title_1chod_179",
	description: "_description_1chod_197",
	srOnly: "_srOnly_1chod_323"
}, nw = qC, rw = JC, iw = YC, aw = ew, ow = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ g(XC, {
	ref: n,
	className: T(tw.overlay, e),
	...t
}));
ow.displayName = XC.displayName;
var sw = e.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ _(iw, { children: [/* @__PURE__ */ g(ow, {}), /* @__PURE__ */ _(ZC, {
	...j("Modal"),
	ref: r,
	className: T(tw.content, e),
	...n,
	children: [t, /* @__PURE__ */ _(ew, {
		className: tw.closeButton,
		children: [/* @__PURE__ */ g(Ye, { size: 16 }), /* @__PURE__ */ g("span", {
			className: tw.srOnly,
			children: "Fechar janela"
		})]
	})]
})] }));
sw.displayName = ZC.displayName;
var cw = ({ className: e, ...t }) => /* @__PURE__ */ g("div", {
	className: T(tw.header, e),
	...t
});
cw.displayName = "ModalHeader";
var lw = ({ className: e, ...t }) => /* @__PURE__ */ g("div", {
	className: T(tw.footer, e),
	...t
});
lw.displayName = "ModalFooter";
var uw = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ g(QC, {
	ref: n,
	className: T(tw.title, e),
	...t
}));
uw.displayName = QC.displayName;
var dw = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ g($C, {
	ref: n,
	className: T(tw.description, e),
	...t
}));
dw.displayName = $C.displayName;
var fw = {
	overlay: "_overlay_1o36l_141",
	overlayShow: "_overlayShow_1o36l_1",
	overlayHide: "_overlayHide_1o36l_1",
	content: "_content_1o36l_179",
	right: "_right_1o36l_213",
	slideInRight: "_slideInRight_1o36l_1",
	slideOutRight: "_slideOutRight_1o36l_1",
	left: "_left_1o36l_241",
	slideInLeft: "_slideInLeft_1o36l_1",
	slideOutLeft: "_slideOutLeft_1o36l_1",
	closeButton: "_closeButton_1o36l_273",
	header: "_header_1o36l_337",
	body: "_body_1o36l_355",
	footer: "_footer_1o36l_413",
	title: "_title_1o36l_439",
	description: "_description_1o36l_463",
	separator: "_separator_1o36l_483",
	srOnly: "_srOnly_1o36l_501"
}, pw = qC, mw = JC, hw = YC, gw = ew, _w = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ g(XC, {
	ref: n,
	className: T(fw.overlay, e),
	...t
}));
_w.displayName = "DrawerOverlay";
var vw = e.forwardRef(({ className: e, children: t, side: n = "right", ...r }, i) => /* @__PURE__ */ _(hw, { children: [/* @__PURE__ */ g(_w, {}), /* @__PURE__ */ _(ZC, {
	...j("Drawer"),
	ref: i,
	className: T(fw.content, n === "left" ? fw.left : fw.right, e),
	...r,
	children: [t, /* @__PURE__ */ _(ew, {
		className: fw.closeButton,
		children: [/* @__PURE__ */ g(Ye, { size: 18 }), /* @__PURE__ */ g("span", {
			className: fw.srOnly,
			children: "Fechar"
		})]
	})]
})] }));
vw.displayName = "DrawerContent";
var yw = ({ className: e, ...t }) => /* @__PURE__ */ g("div", {
	className: T(fw.header, e),
	...t
});
yw.displayName = "DrawerHeader";
var bw = ({ className: e, ...t }) => /* @__PURE__ */ g("div", {
	className: T(fw.body, e),
	...t
});
bw.displayName = "DrawerBody";
var xw = ({ className: e, ...t }) => /* @__PURE__ */ g("div", {
	className: T(fw.footer, e),
	...t
});
xw.displayName = "DrawerFooter";
var Sw = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ g(QC, {
	ref: n,
	className: T(fw.title, e),
	...t
}));
Sw.displayName = "DrawerTitle";
var Cw = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ g($C, {
	ref: n,
	className: T(fw.description, e),
	...t
}));
Cw.displayName = "DrawerDescription";
var ww = ({ className: e }) => /* @__PURE__ */ g("div", { className: T(fw.separator, e) });
ww.displayName = "DrawerSeparator";
//#endregion
//#region src/components/Segmentado/index.tsx
function Tw({ opcoes: e, valor: t, onChange: n, altura: r = 40 }) {
	return /* @__PURE__ */ g("div", {
		...j("Segmentado"),
		role: "radiogroup",
		style: {
			display: "inline-flex",
			flexShrink: 0,
			borderRadius: "var(--radius-md)",
			border: "1px solid var(--color-border-default)",
			background: "var(--color-surface)",
			overflow: "hidden"
		},
		children: e.map((e, i) => {
			let a = e.value === t, o = e.icone != null && !e.mostrarRotulo;
			return /* @__PURE__ */ _("button", {
				type: "button",
				role: "radio",
				"aria-checked": a,
				title: e.rotulo,
				"aria-label": e.rotulo,
				onClick: () => {
					a || n(e.value);
				},
				style: {
					height: r - 2,
					minWidth: o ? r - 2 : void 0,
					padding: o ? 0 : "0 12px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: 6,
					fontSize: "var(--text-sm)",
					fontWeight: 500,
					border: "none",
					borderLeft: i === 0 ? "none" : "1px solid var(--color-border-default)",
					background: a ? "var(--color-accent-subtle)" : "transparent",
					color: a ? "var(--color-accent)" : "var(--color-text-secondary)",
					cursor: a ? "default" : "pointer"
				},
				children: [e.icone, !o && e.rotulo]
			}, e.value);
		})
	});
}
//#endregion
//#region src/components/MarcadorProblemas/sanitizar.ts
var Ew = [
	[/[\w.+-]+@[\w-]+(\.[\w-]+)+/g, "[email]"],
	[/\b\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}\b/g, "[cnpj]"],
	[/\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g, "[cpf]"],
	[/R\$\s?-?[\d.]+(,\d{1,2})?/g, "[valor]"],
	[/\b\d{1,3}(\.\d{3})+(,\d{2})?\b|\b\d+,\d{2}\b/g, "[valor]"]
];
function Dw(e) {
	return Ew.reduce((e, [t, n]) => e.replace(t, n), e);
}
function Ow(e) {
	let t;
	try {
		t = new URL(e, window.location.origin);
	} catch {
		return Dw(e.split("?")[0]);
	}
	let n = [...new Set(t.searchParams.keys())], r = n.length ? "?" + n.map((e) => `${e}=…`).join("&") : "", i = t.origin === window.location.origin ? "" : t.origin, a = t.hash ? Dw(t.hash.split("?")[0]) : "";
	return i + Dw(t.pathname) + r + a;
}
var kw = "[modern-screenshot]", Aw = typeof window < "u", jw = Aw && "Worker" in window;
Aw && "atob" in window, Aw && "btoa" in window;
var Mw = Aw ? window.navigator?.userAgent : "", Nw = Mw.includes("Chrome"), Pw = Mw.includes("AppleWebKit") && !Nw, Fw = Mw.includes("Firefox"), Iw = (e) => e && "__CONTEXT__" in e, Lw = (e) => e.constructor.name === "CSSFontFaceRule", Rw = (e) => e.constructor.name === "CSSImportRule", zw = (e) => e.constructor.name === "CSSLayerBlockRule", Bw = (e) => e.nodeType === 1, Vw = (e) => typeof e.className == "object", Hw = (e) => e.tagName === "image", Uw = (e) => e.tagName === "use", Ww = (e) => Bw(e) && e.style !== void 0 && !Vw(e), Gw = (e) => e.nodeType === 8, Kw = (e) => e.nodeType === 3, qw = (e) => e.tagName === "IMG", Jw = (e) => e.tagName === "VIDEO", Yw = (e) => e.tagName === "CANVAS", Xw = (e) => e.tagName === "TEXTAREA", Zw = (e) => e.tagName === "INPUT", Qw = (e) => e.tagName === "STYLE", $w = (e) => e.tagName === "SCRIPT", eT = (e) => e.tagName === "SELECT", tT = (e) => e.tagName === "SLOT", nT = (e) => e.tagName === "IFRAME", rT = (...e) => console.warn(kw, ...e);
function iT(e) {
	let t = e?.createElement?.("canvas");
	return t && (t.height = t.width = 1), !!t && "toDataURL" in t && !!t.toDataURL("image/webp").includes("image/webp");
}
var aT = (e) => e.startsWith("data:");
function oT(e, t) {
	if (e.match(/^[a-z]+:\/\//i)) return e;
	if (Aw && e.match(/^\/\//)) return window.location.protocol + e;
	if (e.match(/^[a-z]+:/i) || !Aw) return e;
	let n = sT().implementation.createHTMLDocument(), r = n.createElement("base"), i = n.createElement("a");
	return n.head.appendChild(r), n.body.appendChild(i), t && (r.href = t), i.href = e, i.href;
}
function sT(e) {
	return (e && Bw(e) ? e?.ownerDocument : e) ?? window.document;
}
var cT = "http://www.w3.org/2000/svg";
function lT(e, t, n) {
	let r = sT(n).createElementNS(cT, "svg");
	return r.setAttributeNS(null, "width", e.toString()), r.setAttributeNS(null, "height", t.toString()), r.setAttributeNS(null, "viewBox", `0 0 ${e} ${t}`), r;
}
function uT(e, t) {
	let n = new XMLSerializer().serializeToString(e);
	return t && (n = n.replace(/[\u0000-\u0008\v\f\u000E-\u001F\uD800-\uDFFF\uFFFE\uFFFF]/gu, "")), `data:image/svg+xml;charset=utf-8,${encodeURIComponent(n)}`;
}
function dT(e, t) {
	return new Promise((n, r) => {
		let i = new FileReader();
		i.onload = () => n(i.result), i.onerror = () => r(i.error), i.onabort = () => r(/* @__PURE__ */ Error(`Failed read blob to ${t}`)), t === "dataUrl" ? i.readAsDataURL(e) : t === "arrayBuffer" && i.readAsArrayBuffer(e);
	});
}
var fT = (e) => dT(e, "dataUrl");
function pT(e, t) {
	let n = sT(t).createElement("img");
	return n.decoding = "sync", n.loading = "eager", n.src = e, n;
}
function mT(e, t) {
	return new Promise((n) => {
		let { timeout: r, ownerDocument: i, onError: a, onWarn: o } = t ?? {}, s = typeof e == "string" ? pT(e, sT(i)) : e, c = null, l = null;
		function u() {
			n(s), c && clearTimeout(c), l?.();
		}
		if (r && (c = setTimeout(u, r)), Jw(s)) {
			let e = s.currentSrc || s.src;
			if (!e) return s.poster ? mT(s.poster, t).then(n) : u();
			if (s.readyState >= 2) return u();
			let r = u, i = (t) => {
				o?.("Failed video load", e, t), a?.(t), u();
			};
			l = () => {
				s.removeEventListener("loadeddata", r), s.removeEventListener("error", i);
			}, s.addEventListener("loadeddata", r, { once: !0 }), s.addEventListener("error", i, { once: !0 });
		} else {
			let e = Hw(s) ? s.href.baseVal : s.currentSrc || s.src;
			if (!e) return u();
			let t = async () => {
				if (qw(s) && "decode" in s) try {
					await s.decode();
				} catch (t) {
					o?.("Failed to decode image, trying to render anyway", s.dataset.originalSrc || e, t);
				}
				u();
			}, n = (t) => {
				o?.("Failed image load", s.dataset.originalSrc || e, t), u();
			};
			if (qw(s) && s.complete) return t();
			l = () => {
				s.removeEventListener("load", t), s.removeEventListener("error", n);
			}, s.addEventListener("load", t, { once: !0 }), s.addEventListener("error", n, { once: !0 });
		}
	});
}
async function hT(e, t) {
	Ww(e) && (qw(e) || Jw(e) ? await mT(e, t) : await Promise.all(["img", "video"].flatMap((n) => Array.from(e.querySelectorAll(n)).map((e) => mT(e, t)))));
}
var gT = /* @__PURE__ */ function() {
	let e = 0, t = () => `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4);
	return () => (e += 1, `u${t()}${e}`);
}();
function _T(e) {
	return e?.split(",").map((e) => e.trim().replace(/"|'/g, "").toLowerCase()).filter(Boolean);
}
var vT = 0;
function yT(e) {
	let t = `${kw}[#${vT}]`;
	return vT++, {
		time: (n) => e && console.time(`${t} ${n}`),
		timeEnd: (n) => e && console.timeEnd(`${t} ${n}`),
		warn: (...t) => e && rT(...t)
	};
}
function bT(e) {
	return { cache: e ? "no-cache" : "force-cache" };
}
async function xT(e, t) {
	return Iw(e) ? e : ST(e, {
		...t,
		autoDestruct: !0
	});
}
async function ST(e, t) {
	let { scale: n = 1, workerUrl: r, workerNumber: i = 1 } = t || {}, a = !!t?.debug, o = t?.features ?? !0, s = e.ownerDocument ?? (Aw ? window.document : void 0), c = e.ownerDocument?.defaultView ?? (Aw ? window : void 0), l = /* @__PURE__ */ new Map(), u = {
		width: 0,
		height: 0,
		quality: 1,
		type: "image/png",
		scale: n,
		backgroundColor: null,
		style: null,
		filter: null,
		maximumCanvasSize: 0,
		timeout: 3e4,
		progress: null,
		debug: a,
		fetch: {
			requestInit: bT(t?.fetch?.bypassingCache),
			placeholderImage: "data:image/png;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
			bypassingCache: !1,
			...t?.fetch
		},
		fetchFn: null,
		font: {},
		drawImageInterval: 100,
		workerUrl: null,
		workerNumber: i,
		onCloneEachNode: null,
		onCloneNode: null,
		onEmbedNode: null,
		onCreateForeignObjectSvg: null,
		includeStyleProperties: null,
		autoDestruct: !1,
		...t,
		__CONTEXT__: !0,
		log: yT(a),
		node: e,
		ownerDocument: s,
		ownerWindow: c,
		dpi: n === 1 ? null : 96 * n,
		svgStyleElement: CT(s),
		svgDefsElement: s?.createElementNS(cT, "defs"),
		svgStyles: /* @__PURE__ */ new Map(),
		defaultComputedStyles: /* @__PURE__ */ new Map(),
		workers: [...Array.from({ length: jw && r && i ? i : 0 })].map(() => {
			try {
				let e = new Worker(r);
				return e.onmessage = async (e) => {
					let { url: t, result: n } = e.data;
					n ? l.get(t)?.resolve?.(n) : l.get(t)?.reject?.(/* @__PURE__ */ Error(`Error receiving message from worker: ${t}`));
				}, e.onmessageerror = (e) => {
					let { url: t } = e.data;
					l.get(t)?.reject?.(/* @__PURE__ */ Error(`Error receiving message from worker: ${t}`));
				}, e;
			} catch (e) {
				return u.log.warn("Failed to new Worker", e), null;
			}
		}).filter(Boolean),
		fontFamilies: /* @__PURE__ */ new Map(),
		fontCssTexts: /* @__PURE__ */ new Map(),
		acceptOfImage: `${[
			iT(s) && "image/webp",
			"image/svg+xml",
			"image/*",
			"*/*"
		].filter(Boolean).join(",")};q=0.8`,
		requests: l,
		drawImageCount: 0,
		tasks: [],
		features: o,
		isEnable: (e) => e === "restoreScrollPosition" ? typeof o == "boolean" ? !1 : o[e] ?? !1 : typeof o == "boolean" ? o : o[e] ?? !0,
		shadowRoots: []
	};
	u.log.time("wait until load"), await hT(e, {
		timeout: u.timeout,
		onWarn: u.log.warn
	}), u.log.timeEnd("wait until load");
	let { width: d, height: f } = wT(e, u);
	return u.width = d, u.height = f, u;
}
function CT(e) {
	if (!e) return;
	let t = e.createElement("style"), n = t.ownerDocument.createTextNode("\n.______background-clip--text {\n  background-clip: text;\n  -webkit-background-clip: text;\n}\n");
	return t.appendChild(n), t;
}
function wT(e, t) {
	let { width: n, height: r } = t;
	if (Bw(e) && (!n || !r)) {
		let t = e.getBoundingClientRect();
		n = n || t.width || Number(e.getAttribute("width")) || 0, r = r || t.height || Number(e.getAttribute("height")) || 0;
	}
	return {
		width: n,
		height: r
	};
}
async function TT(e, t) {
	let { log: n, timeout: r, drawImageCount: i, drawImageInterval: a } = t;
	n.time("image to canvas");
	let o = await mT(e, {
		timeout: r,
		onWarn: t.log.warn
	}), { canvas: s, context2d: c } = ET(e.ownerDocument, t), l = () => {
		try {
			c?.drawImage(o, 0, 0, s.width, s.height);
		} catch (e) {
			t.log.warn("Failed to drawImage", e);
		}
	};
	if (l(), t.isEnable("fixSvgXmlDecode")) for (let e = 0; e < i; e++) await new Promise((t) => {
		setTimeout(() => {
			c?.clearRect(0, 0, s.width, s.height), l(), t();
		}, e + a);
	});
	return t.drawImageCount = 0, n.timeEnd("image to canvas"), s;
}
function ET(e, t) {
	let { width: n, height: r, scale: i, backgroundColor: a, maximumCanvasSize: o } = t, s = e.createElement("canvas");
	s.width = Math.floor(n * i), s.height = Math.floor(r * i), s.style.width = `${n}px`, s.style.height = `${r}px`, o && (s.width > o || s.height > o) && (s.width > o && s.height > o ? s.width > s.height ? (s.height *= o / s.width, s.width = o) : (s.width *= o / s.height, s.height = o) : s.width > o ? (s.height *= o / s.width, s.width = o) : (s.width *= o / s.height, s.height = o));
	let c = s.getContext("2d");
	return c && a && (c.fillStyle = a, c.fillRect(0, 0, s.width, s.height)), {
		canvas: s,
		context2d: c
	};
}
function DT(e, t) {
	if (e.ownerDocument) try {
		let t = e.toDataURL();
		if (t !== "data:,") return pT(t, e.ownerDocument);
	} catch (e) {
		t.log.warn("Failed to clone canvas", e);
	}
	let n = e.cloneNode(!1), r = e.getContext("2d"), i = n.getContext("2d");
	try {
		return r && i && i.putImageData(r.getImageData(0, 0, e.width, e.height), 0, 0), n;
	} catch (e) {
		t.log.warn("Failed to clone canvas", e);
	}
	return n;
}
function OT(e, t) {
	try {
		if (e?.contentDocument?.documentElement) return JT(e.contentDocument.documentElement, t);
	} catch (e) {
		t.log.warn("Failed to clone iframe", e);
	}
	return e.cloneNode(!1);
}
function kT(e) {
	let t = e.cloneNode(!1);
	return e.currentSrc && e.currentSrc !== e.src && (t.src = e.currentSrc, t.srcset = ""), t.loading === "lazy" && (t.loading = "eager"), t;
}
async function AT(e, t) {
	if (e.ownerDocument && !e.currentSrc && e.poster) return pT(e.poster, e.ownerDocument);
	let n = e.cloneNode(!1);
	n.crossOrigin = "anonymous", e.currentSrc && e.currentSrc !== e.src && (n.src = e.currentSrc);
	let r = n.ownerDocument;
	if (r) {
		let i = !0;
		if (await mT(n, {
			onError: () => i = !1,
			onWarn: t.log.warn
		}), !i) return e.poster ? pT(e.poster, e.ownerDocument) : n;
		n.currentTime = e.currentTime, await new Promise((e) => {
			n.addEventListener("seeked", e, { once: !0 });
		});
		let a = r.createElement("canvas");
		a.width = e.offsetWidth, a.height = e.offsetHeight;
		try {
			let e = a.getContext("2d");
			e && e.drawImage(n, 0, 0, a.width, a.height);
		} catch (r) {
			return t.log.warn("Failed to clone video", r), e.poster ? pT(e.poster, e.ownerDocument) : n;
		}
		return DT(a, t);
	}
	return n;
}
function jT(e, t) {
	return Yw(e) ? DT(e, t) : nT(e) ? OT(e, t) : qw(e) ? kT(e) : Jw(e) ? AT(e, t) : e.cloneNode(!1);
}
function MT(e) {
	let t = e.sandbox;
	if (!t) {
		let { ownerDocument: n } = e;
		try {
			n && (t = n.createElement("iframe"), t.id = `__SANDBOX__${gT()}`, t.width = "0", t.height = "0", t.style.visibility = "hidden", t.style.position = "fixed", n.body.appendChild(t), t.srcdoc = "<!DOCTYPE html><meta charset=\"UTF-8\"><title></title><body>", e.sandbox = t);
		} catch (t) {
			e.log.warn("Failed to getSandBox", t);
		}
	}
	return t;
}
var NT = [
	"width",
	"height",
	"-webkit-text-fill-color"
], PT = ["stroke", "fill"];
function FT(e, t, n) {
	let { defaultComputedStyles: r } = n, i = e.nodeName.toLowerCase(), a = Vw(e) && i !== "svg", o = a ? PT.map((t) => [t, e.getAttribute(t)]).filter(([, e]) => e !== null) : [], s = [
		a && "svg",
		i,
		o.map((e, t) => `${e}=${t}`).join(","),
		t
	].filter(Boolean).join(":");
	if (r.has(s)) return r.get(s);
	let c = MT(n)?.contentWindow;
	if (!c) return /* @__PURE__ */ new Map();
	let l = c?.document, u, d;
	a ? (u = l.createElementNS(cT, "svg"), d = u.ownerDocument.createElementNS(u.namespaceURI, i), o.forEach(([e, t]) => {
		d.setAttributeNS(null, e, t);
	}), u.appendChild(d)) : u = d = l.createElement(i), d.textContent = " ", l.body.appendChild(u);
	let f = c.getComputedStyle(d, t), p = /* @__PURE__ */ new Map();
	for (let e = f.length, t = 0; t < e; t++) {
		let e = f.item(t);
		NT.includes(e) || p.set(e, f.getPropertyValue(e));
	}
	return l.body.removeChild(u), r.set(s, p), p;
}
function IT(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i = [], a = /* @__PURE__ */ new Map();
	if (n) for (let e of n) o(e);
	else for (let t = e.length, n = 0; n < t; n++) o(e.item(n));
	for (let e = i.length, t = 0; t < e; t++) a.get(i[t])?.forEach((e, t) => r.set(t, e));
	function o(n) {
		let o = e.getPropertyValue(n), s = e.getPropertyPriority(n), c = n.lastIndexOf("-"), l = c > -1 ? n.substring(0, c) : void 0;
		if (l) {
			let e = a.get(l);
			e || (e = /* @__PURE__ */ new Map(), a.set(l, e)), e.set(n, [o, s]);
		}
		t.get(n) === o && !s || (l ? i.push(l) : r.set(n, [o, s]));
	}
	return r;
}
function LT(e, t, n, r) {
	let { ownerWindow: i, includeStyleProperties: a, currentParentNodeStyle: o } = r, s = t.style, c = i.getComputedStyle(e), l = FT(e, null, r);
	o?.forEach((e, t) => {
		l.delete(t);
	});
	let u = IT(c, l, a);
	u.delete("transition-property"), u.delete("all"), u.delete("d"), u.delete("content"), n && (u.delete("position"), u.delete("margin-top"), u.delete("margin-right"), u.delete("margin-bottom"), u.delete("margin-left"), u.delete("margin-block-start"), u.delete("margin-block-end"), u.delete("margin-inline-start"), u.delete("margin-inline-end"), u.set("box-sizing", ["border-box", ""])), u.get("background-clip")?.[0] === "text" && t.classList.add("______background-clip--text"), Nw && (u.has("font-kerning") || u.set("font-kerning", ["normal", ""]), (u.get("overflow-x")?.[0] === "hidden" || u.get("overflow-y")?.[0] === "hidden") && u.get("text-overflow")?.[0] === "ellipsis" && e.scrollWidth === e.clientWidth && u.set("text-overflow", ["clip", ""]));
	for (let e = s.length, t = 0; t < e; t++) s.removeProperty(s.item(t));
	return u.forEach(([e, t], n) => {
		s.setProperty(n, e, t);
	}), u;
}
function RT(e, t) {
	(Xw(e) || Zw(e) || eT(e)) && t.setAttribute("value", e.value);
}
var zT = ["::before", "::after"], BT = [
	"::-webkit-scrollbar",
	"::-webkit-scrollbar-button",
	"::-webkit-scrollbar-thumb",
	"::-webkit-scrollbar-track",
	"::-webkit-scrollbar-track-piece",
	"::-webkit-scrollbar-corner",
	"::-webkit-resizer"
];
function VT(e, t, n, r, i) {
	let { ownerWindow: a, svgStyleElement: o, svgStyles: s, currentNodeStyle: c } = r;
	if (!o || !a) return;
	function l(n) {
		let o = a.getComputedStyle(e, n), l = o.getPropertyValue("content");
		if (!l || l === "none") return;
		i?.(l), l = l.replace(/(')|(")|(counter\(.+\))/g, "");
		let u = [gT()], d = FT(e, n, r);
		c?.forEach((e, t) => {
			d.delete(t);
		});
		let f = IT(o, d, r.includeStyleProperties);
		f.delete("content"), f.delete("-webkit-locale"), f.get("background-clip")?.[0] === "text" && t.classList.add("______background-clip--text");
		let p = [`content: '${l}';`];
		if (f.forEach(([e, t], n) => {
			p.push(`${n}: ${e}${t ? " !important" : ""};`);
		}), p.length === 1) return;
		try {
			t.className = [t.className, ...u].join(" ");
		} catch (e) {
			r.log.warn("Failed to copyPseudoClass", e);
			return;
		}
		let m = p.join("\n  "), h = s.get(m);
		h || (h = [], s.set(m, h)), h.push(`.${u[0]}${n}`);
	}
	zT.forEach(l), n && BT.forEach(l);
}
var HT = /* @__PURE__ */ new Set(["symbol"]);
async function UT(e, t, n, r, i) {
	if (Bw(n) && (Qw(n) || $w(n)) || r.filter && !r.filter(n)) return;
	HT.has(t.nodeName) || HT.has(n.nodeName) ? r.currentParentNodeStyle = void 0 : r.currentParentNodeStyle = r.currentNodeStyle;
	let a = await JT(n, r, !1, i);
	r.isEnable("restoreScrollPosition") && GT(e, a), t.appendChild(a);
}
async function WT(e, t, n, r) {
	let i = e.firstChild;
	Bw(e) && e.shadowRoot && (i = e.shadowRoot?.firstChild, n.shadowRoots.push(e.shadowRoot));
	for (let a = i; a; a = a.nextSibling) if (!Gw(a)) if (Bw(a) && tT(a) && typeof a.assignedNodes == "function") {
		let i = a.assignedNodes();
		for (let a = 0; a < i.length; a++) await UT(e, t, i[a], n, r);
	} else await UT(e, t, a, n, r);
}
function GT(e, t) {
	if (!Ww(e) || !Ww(t)) return;
	let { scrollTop: n, scrollLeft: r } = e;
	if (!n && !r) return;
	let { transform: i } = t.style, a = new DOMMatrix(i), { a: o, b: s, c, d: l } = a;
	a.a = 1, a.b = 0, a.c = 0, a.d = 1, a.translateSelf(-r, -n), a.a = o, a.b = s, a.c = c, a.d = l, t.style.transform = a.toString();
}
function KT(e, t) {
	let { backgroundColor: n, width: r, height: i, style: a } = t, o = e.style;
	if (n && o.setProperty("background-color", n, "important"), r && o.setProperty("width", `${r}px`, "important"), i && o.setProperty("height", `${i}px`, "important"), a) for (let e in a) o[e] = a[e];
}
var qT = /^[\w-:]+$/;
async function JT(e, t, n = !1, r) {
	let { ownerDocument: i, ownerWindow: a, fontFamilies: o, onCloneEachNode: s } = t;
	if (i && Kw(e)) return r && /\S/.test(e.data) && r(e.data), i.createTextNode(e.data);
	if (i && a && Bw(e) && (Ww(e) || Vw(e))) {
		let r = await jT(e, t);
		if (t.isEnable("removeAbnormalAttributes")) {
			let e = r.getAttributeNames();
			for (let t = e.length, n = 0; n < t; n++) {
				let t = e[n];
				qT.test(t) || r.removeAttribute(t);
			}
		}
		let i = t.currentNodeStyle = LT(e, r, n, t);
		n && KT(r, t);
		let a = !1;
		if (t.isEnable("copyScrollbar")) {
			let t = [i.get("overflow-x")?.[0], i.get("overflow-y")?.[0]];
			a = t.includes("scroll") || (t.includes("auto") || t.includes("overlay")) && (e.scrollHeight > e.clientHeight || e.scrollWidth > e.clientWidth);
		}
		let c = i.get("text-transform")?.[0], l = _T(i.get("font-family")?.[0]), u = l ? (e) => {
			c === "uppercase" ? e = e.toUpperCase() : c === "lowercase" ? e = e.toLowerCase() : c === "capitalize" && (e = e[0].toUpperCase() + e.substring(1)), l.forEach((t) => {
				let n = o.get(t);
				n || o.set(t, n = /* @__PURE__ */ new Set()), e.split("").forEach((e) => n.add(e));
			});
		} : void 0;
		return VT(e, r, a, t, u), RT(e, r), Jw(e) || await WT(e, r, t, u), await s?.(r), r;
	}
	let c = e.cloneNode(!1);
	return await WT(e, c, t), await s?.(c), c;
}
function YT(e) {
	if (e.ownerDocument = void 0, e.ownerWindow = void 0, e.svgStyleElement = void 0, e.svgDefsElement = void 0, e.svgStyles.clear(), e.defaultComputedStyles.clear(), e.sandbox) {
		try {
			e.sandbox.remove();
		} catch (t) {
			e.log.warn("Failed to destroyContext", t);
		}
		e.sandbox = void 0;
	}
	e.workers = [], e.fontFamilies.clear(), e.fontCssTexts.clear(), e.requests.clear(), e.tasks = [], e.shadowRoots = [];
}
function XT(e) {
	let { url: t, timeout: n, responseType: r, ...i } = e, a = new AbortController(), o = n ? setTimeout(() => a.abort(), n) : void 0;
	return fetch(t, {
		signal: a.signal,
		...i
	}).then((e) => {
		if (!e.ok) throw Error("Failed fetch, not 2xx response", { cause: e });
		switch (r) {
			case "arrayBuffer": return e.arrayBuffer();
			case "dataUrl": return e.blob().then(fT);
			default: return e.text();
		}
	}).finally(() => clearTimeout(o));
}
function ZT(e, t) {
	let { url: n, requestType: r = "text", responseType: i = "text", imageDom: a } = t, o = n, { timeout: s, acceptOfImage: c, requests: l, fetchFn: u, fetch: { requestInit: d, bypassingCache: f, placeholderImage: p }, font: m, workers: h, fontFamilies: g } = e;
	r === "image" && (Pw || Fw) && e.drawImageCount++;
	let _ = l.get(n);
	if (!_) {
		f && f instanceof RegExp && f.test(o) && (o += (/\?/.test(o) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
		let t = r.startsWith("font") && m && m.minify, v = /* @__PURE__ */ new Set();
		t && r.split(";")[1].split(",").forEach((e) => {
			g.has(e) && g.get(e).forEach((e) => v.add(e));
		});
		let y = t && v.size, b = {
			url: o,
			timeout: s,
			responseType: y ? "arrayBuffer" : i,
			headers: r === "image" ? { accept: c } : void 0,
			...d
		};
		_ = {
			type: r,
			resolve: void 0,
			reject: void 0,
			response: null
		}, _.response = (async () => {
			if (u && r === "image") {
				let e = await u(n);
				if (e) return e;
			}
			return !Pw && n.startsWith("http") && h.length ? new Promise((e, t) => {
				h[l.size & h.length - 1].postMessage({
					rawUrl: n,
					...b
				}), _.resolve = e, _.reject = t;
			}) : XT(b);
		})().catch((t) => {
			if (l.delete(n), r === "image" && p) return e.log.warn("Failed to fetch image base64, trying to use placeholder image", o), typeof p == "string" ? p : p(a);
			throw t;
		}), l.set(n, _);
	}
	return _.response;
}
async function QT(e, t, n, r) {
	if (!$T(e)) return e;
	for (let [i, a] of tE(e, t)) try {
		let t = await ZT(n, {
			url: a,
			requestType: r ? "image" : "text",
			responseType: "dataUrl"
		});
		e = e.replace(nE(i), `$1${t}$3`);
	} catch (e) {
		n.log.warn("Failed to fetch css data url", i, e);
	}
	return e;
}
function $T(e) {
	return /url\((['"]?)([^'"]+?)\1\)/.test(e);
}
var eE = /url\((['"]?)([^'"]+?)\1\)/g;
function tE(e, t) {
	let n = [];
	return e.replace(eE, (e, r, i) => (n.push([i, oT(i, t)]), e)), n.filter(([e]) => !aT(e));
}
function nE(e) {
	let t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
	return RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
var rE = [
	"background-image",
	"border-image-source",
	"-webkit-border-image",
	"-webkit-mask-image",
	"list-style-image"
];
function iE(e, t) {
	return rE.map((n) => {
		let r = e.getPropertyValue(n);
		return !r || r === "none" ? null : ((Pw || Fw) && t.drawImageCount++, QT(r, null, t, !0).then((t) => {
			!t || r === t || e.setProperty(n, t, e.getPropertyPriority(n));
		}));
	}).filter(Boolean);
}
function aE(e, t) {
	if (qw(e)) {
		let n = e.currentSrc || e.src;
		if (!aT(n)) return [ZT(t, {
			url: n,
			imageDom: e,
			requestType: "image",
			responseType: "dataUrl"
		}).then((t) => {
			t && (e.srcset = "", e.dataset.originalSrc = n, e.src = t || "");
		})];
		(Pw || Fw) && t.drawImageCount++;
	} else if (Vw(e) && !aT(e.href.baseVal)) {
		let n = e.href.baseVal;
		return [ZT(t, {
			url: n,
			imageDom: e,
			requestType: "image",
			responseType: "dataUrl"
		}).then((t) => {
			t && (e.dataset.originalSrc = n, e.href.baseVal = t || "");
		})];
	}
	return [];
}
function oE(e, t) {
	let { ownerDocument: n, svgDefsElement: r } = t, i = e.getAttribute("href") ?? e.getAttribute("xlink:href");
	if (!i) return [];
	let [a, o] = i.split("#");
	if (o) {
		let i = `#${o}`, s = t.shadowRoots.reduce((e, t) => e ?? t.querySelector(`svg ${i}`), n?.querySelector(`svg ${i}`));
		if (a && e.setAttribute("href", i), r?.querySelector(i)) return [];
		if (s) return r?.appendChild(s.cloneNode(!0)), [];
		if (a) return [ZT(t, {
			url: a,
			responseType: "text"
		}).then((e) => {
			r?.insertAdjacentHTML("beforeend", e);
		})];
	}
	return [];
}
function sE(e, t) {
	let { tasks: n } = t;
	Bw(e) && ((qw(e) || Hw(e)) && n.push(...aE(e, t)), Uw(e) && n.push(...oE(e, t))), Ww(e) && n.push(...iE(e.style, t)), e.childNodes.forEach((e) => {
		sE(e, t);
	});
}
async function cE(e, t) {
	let { ownerDocument: n, svgStyleElement: r, fontFamilies: i, fontCssTexts: a, tasks: o, font: s } = t;
	if (!(!n || !r || !i.size)) if (s && s.cssText) {
		let e = mE(s.cssText, t);
		r.appendChild(n.createTextNode(`${e}
`));
	} else {
		let e = Array.from(n.styleSheets).filter((e) => {
			try {
				return "cssRules" in e && !!e.cssRules.length;
			} catch (n) {
				return t.log.warn(`Error while reading CSS rules from ${e.href}`, n), !1;
			}
		}), s = n.implementation.createHTMLDocument(""), c = s.createElement("style");
		s.head.appendChild(c);
		let l = c.sheet;
		await Promise.all(e.flatMap((e) => Array.from(e.cssRules).map(async (e) => {
			if (Rw(e)) {
				let n = e.href, r = "";
				try {
					r = await ZT(t, {
						url: n,
						requestType: "text",
						responseType: "text"
					});
				} catch (e) {
					t.log.warn(`Error fetch remote css import from ${n}`, e);
				}
				let i = r.replace(eE, (e, t, r) => e.replace(r, oT(r, n)));
				for (let e of dE(i)) try {
					l.insertRule(e, l.cssRules.length);
				} catch (n) {
					t.log.warn("Error inserting rule from remote css import", {
						rule: e,
						error: n
					});
				}
			}
		}))), l.cssRules.length && e.push(l);
		let u = [];
		e.forEach((e) => {
			hE(e.cssRules, u);
		}), u.filter((e) => Lw(e) && $T(e.style.getPropertyValue("src")) && _T(e.style.getPropertyValue("font-family"))?.some((e) => i.has(e))).forEach((e) => {
			let i = e, s = a.get(i.cssText);
			s ? r.appendChild(n.createTextNode(`${s}
`)) : o.push(QT(i.cssText, i.parentStyleSheet ? i.parentStyleSheet.href : null, t).then((e) => {
				e = mE(e, t), a.set(i.cssText, e), r.appendChild(n.createTextNode(`${e}
`));
			}));
		});
	}
}
var lE = /(\/\*[\s\S]*?\*\/)/g, uE = /((@.*?keyframes [\s\S]*?){([\s\S]*?}\s*?)})/gi;
function dE(e) {
	if (e == null) return [];
	let t = [], n = e.replace(lE, "");
	for (;;) {
		let e = uE.exec(n);
		if (!e) break;
		t.push(e[0]);
	}
	n = n.replace(uE, "");
	let r = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, i = /* @__PURE__ */ RegExp("((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", "gi");
	for (;;) {
		let e = r.exec(n);
		if (e) i.lastIndex = r.lastIndex;
		else if (e = i.exec(n), e) r.lastIndex = i.lastIndex;
		else break;
		t.push(e[0]);
	}
	return t;
}
var fE = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, pE = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function mE(e, t) {
	let { font: n } = t, r = n ? n?.preferredFormat : void 0;
	return r ? e.replace(pE, (e) => {
		for (;;) {
			let [t, , n] = fE.exec(e) || [];
			if (!n) return "";
			if (n === r) return `src: ${t};`;
		}
	}) : e;
}
function hE(e, t = []) {
	for (let n of Array.from(e)) zw(n) ? t.push(...hE(n.cssRules)) : "cssRules" in n ? hE(n.cssRules, t) : t.push(n);
	return t;
}
var gE = /\bx?link:?href\s*=\s*["'](?!data:)[^"']+["']/i;
function _E(e) {
	return gE.test(e.innerHTML);
}
async function vE(e, t) {
	let n = await xT(e, t);
	if (Bw(n.node) && Vw(n.node) && !_E(n.node)) return n.node;
	let { ownerDocument: r, log: i, tasks: a, svgStyleElement: o, svgDefsElement: s, svgStyles: c, font: l, progress: u, autoDestruct: d, onCloneNode: f, onEmbedNode: p, onCreateForeignObjectSvg: m } = n;
	i.time("clone node");
	let h = await JT(n.node, n, !0);
	if (o && r) {
		let e = "";
		c.forEach((t, n) => {
			e += `${t.join(",\n")} {
  ${n}
}
`;
		}), o.appendChild(r.createTextNode(e));
	}
	i.timeEnd("clone node"), await f?.(h), l !== !1 && Bw(h) && (i.time("embed web font"), await cE(h, n), i.timeEnd("embed web font")), i.time("embed node"), sE(h, n);
	let g = a.length, _ = 0, v = async () => {
		for (;;) {
			let e = a.pop();
			if (!e) break;
			try {
				await e;
			} catch (e) {
				n.log.warn("Failed to run task", e);
			}
			u?.(++_, g);
		}
	};
	u?.(_, g), await Promise.all([...Array.from({ length: 4 })].map(v)), i.timeEnd("embed node"), await p?.(h);
	let y = yE(h, n);
	return s && y.insertBefore(s, y.children[0]), o && y.insertBefore(o, y.children[0]), d && YT(n), await m?.(y), y;
}
function yE(e, t) {
	let { width: n, height: r } = t, i = lT(n, r, e.ownerDocument), a = i.ownerDocument.createElementNS(i.namespaceURI, "foreignObject");
	return a.setAttributeNS(null, "x", "0%"), a.setAttributeNS(null, "y", "0%"), a.setAttributeNS(null, "width", "100%"), a.setAttributeNS(null, "height", "100%"), a.append(e), i.appendChild(a), i;
}
async function bE(e, t) {
	let n = await xT(e, t), r = await vE(n), i = uT(r, n.isEnable("removeControlCharacter"));
	return n.autoDestruct || (n.svgStyleElement = CT(n.ownerDocument), n.svgDefsElement = n.ownerDocument?.createElementNS(cT, "defs"), n.svgStyles.clear()), await TT(pT(i, r.ownerDocument), n);
}
//#endregion
//#region src/components/MarcadorProblemas/print.ts
var xE = 50, SE = "data-avere-desloc", CE = "data-avere-encolher", wE = "data-avere-grudado", TE = "data-avere-placeholder", EE = [
	SE,
	CE,
	wE,
	TE
];
function DE(e) {
	let t = getComputedStyle(e).position;
	return t === "static" || t === "relative";
}
function OE(e, t, n) {
	let r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT);
	for (let e = r.nextNode(); e; e = r.nextNode()) {
		let r = e.getBoundingClientRect();
		if (r.height > 0 && r.bottom >= t && r.top <= n) return !0;
	}
	return !1;
}
function kE(e) {
	if (e.scrollHeight <= e.clientHeight && e.scrollWidth <= e.clientWidth) return !1;
	let t = getComputedStyle(e);
	return /auto|scroll|overlay/.test(t.overflowY + t.overflowX);
}
function AE(e) {
	let t = document.scrollingElement ?? document.documentElement, n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map(), i = (e, t, n) => {
		r.set(e, [...r.get(e) ?? [], {
			inicio: t,
			altura: n
		}]);
	}, a = (e) => (r.get(e) ?? []).reduce((e, t) => e + t.altura, 0), o = [], s = /* @__PURE__ */ new Set(), c = [], l = [], u = (e, t) => {
		for (let n = e; n && n !== t && !s.has(n); n = n.parentElement) s.add(n);
	}, d = (t, r, a, s) => {
		let f = !0, p = null, m = null, h = 0;
		for (let g of Array.from(t.children)) {
			if (e(g)) continue;
			let _ = g.getBoundingClientRect(), v = _.width === 0 && _.height === 0;
			if (!v && _.top > a + xE && !OE(g, r, a)) {
				n.add(g), u(t, s), f = !1;
				continue;
			}
			if (f && !v && _.bottom < r - xE && !OE(g, r, a)) {
				n.add(g), u(t, s), DE(g) && (p === null && (p = _.top, m = g), h = _.bottom);
				continue;
			}
			f && p !== null && (i(s, m, _.top - p), p = null), f = !1, g instanceof HTMLElement && getComputedStyle(g).position === "sticky" && c.push({
				el: g,
				rolavel: s
			}), (g instanceof HTMLInputElement || g instanceof HTMLTextAreaElement) && g.placeholder && !g.value && l.push(g);
			let y = r, b = a, x = s;
			kE(g) && (y = Math.max(r, _.top), b = Math.min(a, _.bottom), x = g, o.push(g)), d(g, y, b, x);
		}
		f && p !== null && i(s, m, h - p);
	};
	d(document.body, 0, t.clientHeight, t);
	let f = [];
	for (let e of o) {
		let t = -e.scrollLeft, r = -(e.scrollTop - a(e));
		if (!(!t && !r)) for (let i of Array.from(e.children)) n.has(i) || (i.setAttribute(SE, `${t},${r}`), f.push(i));
	}
	for (let e of s) e.setAttribute(CE, ""), f.push(e);
	if (c.length) {
		let e = c.map((e) => e.el.getBoundingClientRect()), t = c.map((e) => [e.el.style.getPropertyValue("position"), e.el.style.getPropertyPriority("position")]);
		for (let e of c) e.el.style.setProperty("position", "static", "important");
		let n = c.map((e) => e.el.getBoundingClientRect());
		c.forEach((e, n) => {
			let [r, i] = t[n];
			r ? e.el.style.setProperty("position", r, i) : e.el.style.removeProperty("position");
		}), c.forEach(({ el: t, rolavel: i }, a) => {
			let o = (r.get(i) ?? []).filter((e) => t.compareDocumentPosition(e.inicio) & Node.DOCUMENT_POSITION_FOLLOWING).reduce((e, t) => e + t.altura, 0), s = e[a].left - n[a].left, c = e[a].top - n[a].top - o;
			Math.abs(s) < .5 && Math.abs(c) < .5 || (t.setAttribute(wE, `${s},${c}`), f.push(t));
		});
	}
	for (let e of l) e.setAttribute(TE, getComputedStyle(e, "::placeholder").color), f.push(e);
	return {
		remover: n,
		pagina: {
			x: window.scrollX,
			y: window.scrollY - a(t)
		},
		marcados: f
	};
}
var jE = /Chrome|Chromium|Edg\//.test(navigator.userAgent) && !/Firefox/.test(navigator.userAgent);
async function ME(e) {
	let t = document.documentElement, n = t.clientWidth, r = t.clientHeight, i = AE(e);
	try {
		return {
			canvas: await bE(t, {
				width: n,
				height: r,
				scale: Math.min(window.devicePixelRatio || 1, 2),
				filter: (t) => !(t instanceof Element && (e(t) || i.remover.has(t))),
				style: {
					marginTop: `${-i.pagina.y}px`,
					marginLeft: `${-i.pagina.x}px`
				},
				onCloneEachNode: (e) => {
					if (!(e instanceof HTMLElement)) return;
					e.hasAttribute(CE) && (e.removeAttribute(CE), e.style.height = "auto", e.style.blockSize = "auto");
					let t = e.getAttribute(TE);
					t && (e.removeAttribute(TE), e.style.color = t, e.style.setProperty("-webkit-text-fill-color", t));
					let n = 0, r = 0;
					for (let t of [SE, wE]) {
						let i = e.getAttribute(t);
						if (!i) continue;
						e.removeAttribute(t);
						let [a, o] = i.split(",").map(Number);
						n += a, r += o;
					}
					if (n || r) {
						let t = e.style.transform;
						e.style.transform = `translate(${n}px, ${r}px)${t && t !== "none" ? " " + t : ""}`;
					}
				},
				features: { fixSvgXmlDecode: !jE },
				timeout: 8e3
			}),
			largura: n,
			altura: r
		};
	} finally {
		for (let e of i.marcados) for (let t of EE) e.removeAttribute(t);
	}
}
function NE(e) {
	return new Promise((t, n) => e.toBlob((e) => e ? t(e) : n(/* @__PURE__ */ Error("Falha ao gerar a imagem")), "image/png"));
}
//#endregion
//#region src/components/MarcadorProblemas/desenho.ts
var PE = "#E7343F", FE = "rgb(255 255 255 / 0.9)", IE = "#111";
function LE(e, t) {
	return {
		x: Math.min(e[0], t[0]),
		y: Math.min(e[1], t[1]),
		w: Math.abs(e[0] - t[0]),
		h: Math.abs(e[1] - t[1])
	};
}
function RE(e, t) {
	let n = 4 * t;
	switch (e.tipo) {
		case "tarja":
		case "caixa": return e.w >= n && e.h >= n;
		case "seta": return Math.hypot(e.ate[0] - e.de[0], e.ate[1] - e.de[1]) >= n * 2;
		case "livre": return e.pontos.length > 1;
		case "numero": return !0;
	}
}
function zE(e, t, n) {
	e.lineJoin = "round", e.lineCap = "round";
	for (let [r, i] of [[FE, 6], [PE, 3]]) e.strokeStyle = r, e.lineWidth = i * t, e.beginPath(), n(), e.stroke();
}
function BE(e, [t, n], r, i) {
	e.beginPath(), e.arc(t, n, 13 * i, 0, Math.PI * 2), e.fillStyle = PE, e.fill(), e.lineWidth = 2.5 * i, e.strokeStyle = "#fff", e.stroke(), e.fillStyle = "#fff", e.font = `700 ${(r > 9 ? 12 : 15) * i}px system-ui, sans-serif`, e.textAlign = "center", e.textBaseline = "middle", e.fillText(String(r), t, n + .5 * i);
}
function VE(e, t, n) {
	if (t.tipo === "caixa") zE(e, n, () => e.rect(t.x, t.y, t.w, t.h));
	else if (t.tipo === "livre") zE(e, n, () => {
		e.moveTo(...t.pontos[0]);
		for (let n of t.pontos.slice(1)) e.lineTo(...n);
	});
	else {
		let [r, i] = t.de, [a, o] = t.ate, s = Math.atan2(o - i, a - r), c = 16 * n;
		zE(e, n, () => {
			e.moveTo(r, i), e.lineTo(a, o), e.moveTo(a - c * Math.cos(s - Math.PI / 7), o - c * Math.sin(s - Math.PI / 7)), e.lineTo(a, o), e.lineTo(a - c * Math.cos(s + Math.PI / 7), o - c * Math.sin(s + Math.PI / 7));
		});
	}
}
function HE(e, t, n, r) {
	let { comIndicacoes: i, contorno: a, k: o } = r;
	e.clearRect(0, 0, e.canvas.width, e.canvas.height), e.drawImage(t, 0, 0), e.fillStyle = IE;
	for (let t of n) t.tipo === "tarja" && e.fillRect(t.x, t.y, t.w, t.h);
	if (!i) return;
	if (a) {
		let t = 4 * o;
		VE(e, {
			tipo: "caixa",
			x: a.x - t,
			y: a.y - t,
			w: a.w + t * 2,
			h: a.h + t * 2
		}, o);
	}
	for (let t of n) t.tipo !== "tarja" && t.tipo !== "numero" && VE(e, t, o);
	let s = 0;
	for (let t of n) t.tipo === "numero" && BE(e, t.p, ++s, o);
}
function UE(e) {
	return e.filter((e) => e.tipo === "numero").length;
}
function WE(...e) {
	let [t] = e, n = document.createElement("canvas");
	return n.width = t.width, n.height = t.height, HE(n.getContext("2d"), ...e), n;
}
var Q = {
	barra: "_barra_1fa4f_5",
	painel: "_painel_1fa4f_7",
	destaque: "_destaque_1fa4f_9",
	barraIcone: "_barraIcone_1fa4f_55",
	botaoMarcar: "_botaoMarcar_1fa4f_71",
	tecla: "_tecla_1fa4f_95",
	botaoIcone: "_botaoIcone_1fa4f_113",
	etiqueta: "_etiqueta_1fa4f_165",
	cursorMira: "_cursorMira_1fa4f_199",
	cabecalho: "_cabecalho_1fa4f_243",
	rodape: "_rodape_1fa4f_245",
	corpo: "_corpo_1fa4f_279",
	print: "_print_1fa4f_307",
	printPar: "_printPar_1fa4f_333",
	printImagem: "_printImagem_1fa4f_371",
	printAviso: "_printAviso_1fa4f_385",
	girando: "_girando_1fa4f_397",
	girar: "_girar_1fa4f_1",
	link: "_link_1fa4f_413",
	rotulo: "_rotulo_1fa4f_433",
	opcional: "_opcional_1fa4f_445",
	texto: "_texto_1fa4f_455",
	contexto: "_contexto_1fa4f_481",
	lista: "_lista_1fa4f_501",
	itens: "_itens_1fa4f_533",
	json: "_json_1fa4f_551",
	botaoPrimario: "_botaoPrimario_1fa4f_571",
	botaoSecundario: "_botaoSecundario_1fa4f_573",
	editorFundo: "_editorFundo_1fa4f_635",
	editorBarra: "_editorBarra_1fa4f_661",
	editorEspaco: "_editorEspaco_1fa4f_681",
	editorDica: "_editorDica_1fa4f_689",
	editorArea: "_editorArea_1fa4f_699",
	editorCanvas: "_editorCanvas_1fa4f_715",
	dica: "_dica_1fa4f_741",
	enviado: "_enviado_1fa4f_753",
	erroEnvio: "_erroEnvio_1fa4f_793"
}, GE = [
	{
		value: "seta",
		rotulo: "Seta",
		icone: /* @__PURE__ */ g(Ie, { size: 16 }),
		mostrarRotulo: !0
	},
	{
		value: "livre",
		rotulo: "Livre",
		icone: /* @__PURE__ */ g(Le, { size: 16 }),
		mostrarRotulo: !0
	},
	{
		value: "caixa",
		rotulo: "Caixa",
		icone: /* @__PURE__ */ g(Ve, { size: 16 }),
		mostrarRotulo: !0
	},
	{
		value: "numero",
		rotulo: "Número",
		icone: /* @__PURE__ */ g(ke, { size: 16 }),
		mostrarRotulo: !0
	},
	{
		value: "tarja",
		rotulo: "Tarja",
		icone: /* @__PURE__ */ g(De, { size: 16 }),
		mostrarRotulo: !0
	}
], KE = [{
	value: "indicacoes",
	rotulo: "Com indicações",
	mostrarRotulo: !0
}, {
	value: "original",
	rotulo: "Original",
	mostrarRotulo: !0
}];
function qE({ base: e, contorno: t, k: n, formasIniciais: r, onConcluir: i, onCancelar: a, marcador: o }) {
	let [s, c] = p("seta"), [u, d] = p("indicacoes"), [m, h] = p(r), [v, y] = p(null), b = f(null), x = f(null);
	l(() => {
		let r = b.current?.getContext("2d");
		r && HE(r, e, v ? [...m, v] : m, {
			comIndicacoes: u === "indicacoes",
			contorno: t,
			k: n
		});
	}, [
		e,
		m,
		v,
		u,
		t,
		n
	]);
	let S = () => h((e) => e.slice(0, -1));
	l(() => {
		let e = (e) => {
			e.key === "Escape" && a(), (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z" && (e.preventDefault(), S());
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [a]);
	let C = (t) => {
		let n = t.currentTarget.getBoundingClientRect();
		return [(t.clientX - n.left) * (e.width / n.width), (t.clientY - n.top) * (e.height / n.height)];
	}, w = (e) => {
		let t = x.current;
		switch (s) {
			case "seta": return {
				tipo: "seta",
				de: t,
				ate: e
			};
			case "livre": return {
				tipo: "livre",
				pontos: [t, e]
			};
			case "numero": return {
				tipo: "numero",
				p: e
			};
			default: return {
				tipo: s,
				...LE(t, e)
			};
		}
	}, T = u === "indicacoes" || s === "tarja";
	return /* @__PURE__ */ _("div", {
		...o,
		className: Q.editorFundo,
		role: "dialog",
		"aria-label": "Desenhar sobre o print",
		children: [
			/* @__PURE__ */ _("div", {
				className: Q.editorBarra,
				children: [
					/* @__PURE__ */ g(Tw, {
						opcoes: GE,
						valor: s,
						onChange: c,
						altura: 34
					}),
					/* @__PURE__ */ g("button", {
						type: "button",
						className: Q.botaoSecundario,
						onClick: S,
						disabled: !m.length,
						title: "Desfazer (Ctrl+Z)",
						"aria-label": "Desfazer",
						children: /* @__PURE__ */ g(We, { size: 14 })
					}),
					/* @__PURE__ */ g("button", {
						type: "button",
						className: Q.botaoSecundario,
						onClick: () => h([]),
						disabled: !m.length,
						title: "Limpar tudo",
						"aria-label": "Limpar tudo",
						children: /* @__PURE__ */ g(Ue, { size: 14 })
					}),
					/* @__PURE__ */ g("span", { className: Q.editorEspaco }),
					/* @__PURE__ */ g(Tw, {
						opcoes: KE,
						valor: u,
						onChange: d,
						altura: 34
					}),
					/* @__PURE__ */ _("button", {
						type: "button",
						className: Q.botaoSecundario,
						onClick: a,
						children: [/* @__PURE__ */ g(Ye, { size: 14 }), " Cancelar"]
					}),
					/* @__PURE__ */ _("button", {
						type: "button",
						className: Q.botaoPrimario,
						onClick: () => i(m),
						children: [/* @__PURE__ */ g(me, { size: 14 }), " Concluir"]
					})
				]
			}),
			/* @__PURE__ */ g("p", {
				className: Q.editorDica,
				children: u === "original" ? "Assim sobe a imagem original: só as tarjas aparecem nela." : "Desenhe sobre o print para indicar o problema ou como deveria ser. Use números para citar pontos na descrição. Tarjas escondem dados nas duas imagens."
			}),
			/* @__PURE__ */ g("div", {
				className: Q.editorArea,
				children: /* @__PURE__ */ g("canvas", {
					ref: b,
					width: e.width,
					height: e.height,
					className: Q.editorCanvas,
					style: { cursor: T ? "crosshair" : "not-allowed" },
					onPointerDown: (e) => {
						!T || e.button !== 0 || (e.currentTarget.setPointerCapture(e.pointerId), x.current = C(e), y(w(x.current)));
					},
					onPointerMove: (e) => {
						if (!x.current) return;
						let t = C(e);
						y((e) => e?.tipo === "livre" ? {
							...e,
							pontos: [...e.pontos, t]
						} : w(t));
					},
					onPointerUp: () => {
						v && RE(v, n) && h((e) => [...e, v]), x.current = null, y(null);
					}
				})
			})
		]
	});
}
//#endregion
//#region src/components/MarcadorProblemas/envio.ts
var JE = {
	url: "https://qntjjvhryeosedjcydun.supabase.co",
	chave: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFudGpqdmhyeWVvc2VkamN5ZHVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzOTQwNDEsImV4cCI6MjEwNjk3MDA0MX0.F7VP7pFxLDxQ8OkTwAUSawarHMt0ajhVDDLk50Oh5SU"
}, YE = "relatos-prints";
async function XE(e, t) {
	let n = "";
	try {
		let t = await e.json();
		n = t.message ?? t.error ?? "";
	} catch {}
	throw Error(`${t}: ${n || `HTTP ${e.status}`}`);
}
async function ZE(e, t, n) {
	let r = crypto.randomUUID(), i = {
		apikey: e.chave,
		Authorization: `Bearer ${e.chave}`
	}, a = {
		print_final: null,
		print_limpo: null
	};
	n && (a = {
		print_final: `${r}/final.png`,
		print_limpo: `${r}/limpo.png`
	}, await Promise.all([["final", n.final], ["limpo", n.limpo]].map(async ([t, n]) => {
		let a = await fetch(`${e.url}/storage/v1/object/${YE}/${r}/${t}.png`, {
			method: "POST",
			headers: {
				...i,
				"Content-Type": "image/png",
				"x-upsert": "false"
			},
			body: n
		});
		a.ok || await XE(a, `Imagem ${t}`);
	})));
	let o = await fetch(`${e.url}/rest/v1/relatos`, {
		method: "POST",
		headers: {
			...i,
			"Content-Type": "application/json",
			Prefer: "return=minimal"
		},
		body: JSON.stringify({
			id: r,
			...t,
			...a
		})
	});
	return o.ok || await XE(o, "Relato"), r;
}
//#endregion
//#region src/components/MarcadorProblemas/coleta.ts
var QE = 10, $E = 300, eD = "__avereMarcadorColeta";
function tD(e, t) {
	e.push(t), e.length > QE && e.shift();
}
function nD(e) {
	return Dw(e.map((e) => {
		if (e instanceof Error) return `${e.name}: ${e.message}`;
		if (typeof e == "string") return e;
		try {
			return JSON.stringify(e);
		} catch {
			return String(e);
		}
	}).join(" ")).slice(0, $E);
}
function rD() {
	let e = window;
	if (e[eD]) return e[eD];
	let t = {
		erros: [],
		requisicoes: []
	};
	e[eD] = t;
	let n = () => (/* @__PURE__ */ new Date()).toISOString(), r = console.error.bind(console);
	console.error = (...e) => {
		tD(t.erros, {
			em: n(),
			mensagem: nD(e)
		}), r(...e);
	}, window.addEventListener("error", (e) => {
		tD(t.erros, {
			em: n(),
			mensagem: nD([e.error ?? e.message])
		});
	}), window.addEventListener("unhandledrejection", (e) => {
		tD(t.erros, {
			em: n(),
			mensagem: nD(["Promise rejeitada:", e.reason])
		});
	});
	let i = window.fetch.bind(window);
	window.fetch = async (e, r) => {
		let a = performance.now(), o = (r?.method ?? (e instanceof Request ? e.method : "GET")).toUpperCase(), s = e instanceof Request ? e.url : String(e), c = (e) => tD(t.requisicoes, {
			em: n(),
			metodo: o,
			url: Ow(s),
			status: e,
			duracao_ms: Math.round(performance.now() - a)
		});
		try {
			let t = await i(e, r);
			return t.ok || c(t.status), t;
		} catch (e) {
			throw c(0), e;
		}
	};
	let a = XMLHttpRequest.prototype.open, o = XMLHttpRequest.prototype.send;
	return XMLHttpRequest.prototype.open = function(e, t, ...n) {
		return this.__marcador = {
			metodo: e.toUpperCase(),
			url: String(t)
		}, a.call(this, e, t, ...n);
	}, XMLHttpRequest.prototype.send = function(e) {
		let r = performance.now();
		return this.addEventListener("loadend", () => {
			!this.__marcador || this.status > 0 && this.status < 400 || tD(t.requisicoes, {
				em: n(),
				metodo: this.__marcador.metodo,
				url: Ow(this.__marcador.url),
				status: this.status,
				duracao_ms: Math.round(performance.now() - r)
			});
		}), o.call(this, e);
	}, t;
}
var iD = /^radix-|^:r|_r_|«r|\d{3,}/;
function aD(e) {
	let t = e.tagName.toLowerCase();
	if (e.id && !iD.test(e.id)) return `${t}#${CSS.escape(e.id)}`;
	let n = e.getAttribute("data-testid");
	if (n) return `${t}[data-testid="${n}"]`;
	let r = e.parentElement;
	if (!r) return t;
	let i = [...r.children].filter((t) => t.tagName === e.tagName);
	return i.length > 1 ? `${t}:nth-of-type(${i.indexOf(e) + 1})` : t;
}
function oD(e) {
	let t = [], n = e;
	for (; n && n !== document.body && t.length < 5;) {
		let e = aD(n);
		if (t.unshift(e), e.includes("#") || e.includes("data-testid")) break;
		n = n.parentElement;
	}
	return t.join(" > ");
}
var sD = /^(Primitive|Slot|Presence|Portal|DismissableLayer|FocusScope|Popper|Collection|RovingFocus|VisuallyHidden|Anchor)|Provider$|SlotClone$/;
function cD(e) {
	let t = Object.keys(e).find((e) => e.startsWith("__reactFiber$"));
	if (!t) return [];
	let n = e[t], r = [], i = 0;
	for (; n && r.length < 4 && i++ < 60;) {
		let e = n.type;
		if (e && typeof e != "string") {
			let t = e.displayName || e.name || e.render?.name;
			t && t.length > 2 && !sD.test(t) && r[r.length - 1] !== t && r.push(t);
		}
		n = n.return ?? null;
	}
	return r;
}
var lD = "button, a[href], [role=option], [role=menuitem], [role=tab], [role=button], input, select, textarea, label, td, th, li";
function uD(e) {
	let t = e;
	for (let e = 0; t && e <= 3; e++, t = t.parentElement) if (t.matches(lD)) return t;
	return e;
}
function dD(e) {
	let t = [];
	for (let n = e.closest(`[${A}]`); n && t.length < 4; n = n.parentElement?.closest("[data-avere-ui]") ?? null) {
		let e = n.getAttribute(A);
		t[t.length - 1] !== e && t.push(e);
	}
	return t;
}
function fD(e) {
	let t = e.getBoundingClientRect(), n = e.innerText ?? e.textContent ?? "";
	return {
		tag: e.tagName.toLowerCase(),
		seletor: oD(e),
		texto: Dw(n.replace(/\s+/g, " ").trim()).slice(0, 80),
		role: e.getAttribute("role") ?? void 0,
		rotulo: e.getAttribute("aria-label") ? Dw(e.getAttribute("aria-label")) : void 0,
		testid: e.getAttribute("data-testid") ?? void 0,
		componentes: cD(e),
		avere_ui: dD(e),
		retangulo: {
			x: Math.round(t.x),
			y: Math.round(t.y),
			largura: Math.round(t.width),
			altura: Math.round(t.height)
		}
	};
}
function pD() {
	let e = window.location.hostname;
	return e === "localhost" || e === "127.0.0.1" || e === "[::1]" || e.endsWith(".localhost") || e.endsWith(".test") ? "dev" : "producao";
}
//#endregion
//#region src/components/MarcadorProblemas/index.tsx
var mD = [
	{
		value: "erro",
		rotulo: "Erro",
		mostrarRotulo: !0
	},
	{
		value: "estranho",
		rotulo: "Estranho/confuso",
		mostrarRotulo: !0
	},
	{
		value: "sugestao",
		rotulo: "Sugestão",
		mostrarRotulo: !0
	}
], hD = "data-avere-marcador";
function gD(e) {
	return !!e?.closest(`[${hD}]`);
}
function _D({ app: e, versaoApp: t, usuario: n, habilitado: r = !0, destino: i = JE }) {
	let [a, s] = p({ estado: "ocioso" }), [c, u] = p(!1), [m, v] = p(null), [y, x] = p(null), [S, C] = p(null), [w, E] = p(""), [D, O] = p(!1), [k, A] = p(null), j = f(null), M = f(null), N = f(null), [P, F] = p([]), [I, L] = p(!1), ee = f(0), R = o(async (e, t) => {
		let n = N.current;
		if (!n) return;
		let r = {
			contorno: n.contorno,
			k: n.k
		}, [i, a] = await Promise.all([NE(WE(n.canvas, e, {
			...r,
			comIndicacoes: !1
		})), NE(WE(n.canvas, e, {
			...r,
			comIndicacoes: !0
		}))]);
		t === ee.current && (M.current = {
			final: a,
			limpo: i
		}, A({
			estado: "pronto",
			urlFinal: URL.createObjectURL(a),
			urlLimpo: URL.createObjectURL(i),
			largura: n.largura,
			altura: n.altura,
			bytes: a.size + i.size
		}));
	}, []), te = o(async (e) => {
		let t = ++ee.current;
		A({ estado: "capturando" }), F([]);
		try {
			let n = await ME(gD), r = n.canvas.width / n.largura;
			N.current = {
				canvas: n.canvas,
				k: r,
				largura: n.largura,
				altura: n.altura,
				contorno: {
					x: e.x * r,
					y: e.y * r,
					w: e.largura * r,
					h: e.altura * r
				}
			}, await R([], t);
		} catch (e) {
			if (t !== ee.current) return;
			A({
				estado: "erro",
				mensagem: e instanceof Error ? e.message : String(e)
			});
		}
	}, [R]), ne = o((e) => {
		F(e), L(!1), R(e, ee.current);
	}, [R]), re = o(() => L(!1), []);
	l(() => () => {
		k?.estado === "pronto" && (URL.revokeObjectURL(k.urlFinal), URL.revokeObjectURL(k.urlLimpo));
	}, [k]);
	let z = r && !y && c;
	l(() => {
		r && (j.current = rD());
	}, [r]), l(() => {
		if (!z) return;
		let e = (e) => {
			e.key === "Escape" && u(!1);
		};
		return window.addEventListener("keydown", e, !0), () => window.removeEventListener("keydown", e, !0);
	}, [z]), l(() => {
		if (!z) {
			v(null);
			return;
		}
		let e = (e) => {
			let t = document.elementFromPoint(e.clientX, e.clientY);
			v(t && !gD(t) ? uD(t) : null);
		}, t = (e) => {
			gD(e.target) || (e.preventDefault(), e.stopPropagation());
		}, n = (e) => {
			if (gD(e.target)) return;
			e.preventDefault(), e.stopPropagation();
			let t = document.elementFromPoint(e.clientX, e.clientY);
			if (!t || gD(t)) return;
			let n = uD(t), r = j.current, i = fD(n);
			x({
				elemento: n,
				descricao: i,
				erros: r ? [...r.erros] : [],
				requisicoes: r ? [...r.requisicoes] : [],
				em: /* @__PURE__ */ new Date()
			}), u(!1), te(i.retangulo);
		}, r = [
			"pointerdown",
			"mousedown",
			"pointerup",
			"mouseup",
			"dblclick",
			"contextmenu"
		];
		return window.addEventListener("pointermove", e, !0), r.forEach((e) => window.addEventListener(e, t, !0)), window.addEventListener("click", n, !0), document.documentElement.classList.add(Q.cursorMira), () => {
			window.removeEventListener("pointermove", e, !0), r.forEach((e) => window.removeEventListener(e, t, !0)), window.removeEventListener("click", n, !0), document.documentElement.classList.remove(Q.cursorMira);
		};
	}, [z, te]);
	let ie = o(() => {
		ee.current++, M.current = null, N.current = null, A(null), F([]), L(!1), x(null), C(null), E(""), O(!1), s({ estado: "ocioso" });
	}, []), B = d(() => y ? {
		schema_versao: 1,
		app: e,
		versao_app: t,
		versao_avere_ui: "1.8.1",
		ambiente: pD(),
		rota: Ow(window.location.href),
		titulo_tela: Dw(document.title),
		tipo: S,
		descricao: w.trim(),
		usuario_id: n?.id ?? null,
		usuario_nome: n?.nome ?? null,
		capturado_em: y.em.toISOString(),
		contexto: {
			fuso: Intl.DateTimeFormat().resolvedOptions().timeZone,
			elemento: y.descricao,
			viewport: {
				largura: window.innerWidth,
				altura: window.innerHeight,
				dpr: window.devicePixelRatio
			},
			navegador: navigator.userAgent,
			idioma: navigator.language,
			erros_console: y.erros,
			requisicoes_falhas: y.requisicoes
		}
	} : null, [
		y,
		e,
		t,
		n,
		S,
		w
	]), ae = async () => {
		B && (await navigator.clipboard.writeText(JSON.stringify(B, null, 2)), O(!0), setTimeout(() => O(!1), 1500));
	}, oe = async () => {
		if (!(!B || !B.descricao)) {
			s({ estado: "enviando" });
			try {
				await ZE(i, { ...B }, M.current), s({ estado: "enviado" });
			} catch (e) {
				s({
					estado: "erro",
					mensagem: e instanceof Error ? e.message : String(e)
				});
			}
		}
	};
	if (l(() => {
		if (a.estado !== "enviado") return;
		let e = setTimeout(ie, 2500);
		return () => clearTimeout(e);
	}, [a, ie]), !r) return null;
	let se = !y && m?.isConnected ? m.getBoundingClientRect() : null, ce = { [hD]: "" }, le = !!y && (!k || k.estado === "capturando");
	return b(/* @__PURE__ */ _(h, { children: [
		se && /* @__PURE__ */ g("div", {
			...ce,
			className: Q.destaque,
			style: {
				left: se.left,
				top: se.top,
				width: se.width,
				height: se.height
			},
			children: /* @__PURE__ */ g("span", {
				className: Q.etiqueta,
				children: fD(m).seletor
			})
		}),
		(!y || le) && /* @__PURE__ */ g("div", {
			...ce,
			className: T(Q.barra, !le && !z && Q.barraIcone),
			onPointerDown: (e) => e.stopPropagation(),
			onMouseDown: (e) => {
				e.preventDefault(), e.stopPropagation();
			},
			children: le ? /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g(Ne, {
				size: 16,
				className: Q.girando
			}), /* @__PURE__ */ g("span", { children: "Capturando a tela…" })] }) : z ? /* @__PURE__ */ _(h, { children: [
				/* @__PURE__ */ g(we, { size: 16 }),
				/* @__PURE__ */ g("span", { children: "Clique no elemento com problema" }),
				/* @__PURE__ */ g("kbd", {
					className: Q.tecla,
					children: "Esc"
				}),
				/* @__PURE__ */ g("button", {
					type: "button",
					className: Q.botaoIcone,
					"aria-label": "Cancelar",
					onClick: () => u(!1),
					children: /* @__PURE__ */ g(Ye, { size: 14 })
				})
			] }) : /* @__PURE__ */ g("button", {
				type: "button",
				className: Q.botaoMarcar,
				onClick: () => u(!0),
				title: "Marcar problema",
				"aria-label": "Marcar problema",
				children: /* @__PURE__ */ g(ue, { size: 18 })
			})
		}),
		y && B && !le && /* @__PURE__ */ _("aside", {
			...ce,
			className: Q.painel,
			"aria-label": "Registrar problema",
			children: [/* @__PURE__ */ _("header", {
				className: Q.cabecalho,
				children: [/* @__PURE__ */ g("strong", { children: "Registrar problema" }), /* @__PURE__ */ g("button", {
					type: "button",
					className: Q.botaoIcone,
					"aria-label": "Fechar",
					onClick: ie,
					children: /* @__PURE__ */ g(Ye, { size: 16 })
				})]
			}), a.estado === "enviado" ? /* @__PURE__ */ _("div", {
				className: Q.enviado,
				children: [
					/* @__PURE__ */ g(ye, { size: 40 }),
					/* @__PURE__ */ g("strong", { children: "Relato enviado" }),
					/* @__PURE__ */ g("span", { children: "Obrigado! Vamos olhar com atenção." })
				]
			}) : /* @__PURE__ */ _(h, { children: [
				/* @__PURE__ */ _("div", {
					className: Q.corpo,
					children: [
						/* @__PURE__ */ _("div", {
							className: Q.print,
							children: [
								(!k || k.estado === "capturando") && /* @__PURE__ */ _("span", {
									className: Q.printAviso,
									children: [/* @__PURE__ */ g(Ne, {
										size: 16,
										className: Q.girando
									}), " Capturando a tela…"]
								}),
								k?.estado === "pronto" && /* @__PURE__ */ _("div", {
									className: Q.printPar,
									children: [/* @__PURE__ */ _("figure", { children: [/* @__PURE__ */ g("img", {
										src: k.urlLimpo,
										alt: "Print original",
										className: Q.printImagem
									}), /* @__PURE__ */ g("figcaption", { children: "Original" })] }), /* @__PURE__ */ _("figure", { children: [/* @__PURE__ */ g("img", {
										src: k.urlFinal,
										alt: "Print com indicações",
										className: Q.printImagem
									}), /* @__PURE__ */ g("figcaption", { children: "Com indicações" })] })]
								}),
								k?.estado === "erro" && /* @__PURE__ */ _("span", {
									className: Q.printAviso,
									children: ["Não foi possível capturar a tela.", /* @__PURE__ */ g("button", {
										type: "button",
										className: Q.link,
										onClick: () => void te(fD(y.elemento).retangulo),
										children: "Tentar de novo"
									})]
								})
							]
						}),
						k?.estado === "pronto" && /* @__PURE__ */ _("button", {
							type: "button",
							className: Q.botaoSecundario,
							onClick: () => L(!0),
							children: [
								/* @__PURE__ */ g(Le, { size: 14 }),
								" Desenhar / tarjar",
								P.length > 0 && /* @__PURE__ */ _("span", {
									className: Q.opcional,
									children: [
										"· ",
										P.length,
										" ",
										P.length === 1 ? "marcação" : "marcações"
									]
								})
							]
						}),
						/* @__PURE__ */ _("label", {
							className: Q.rotulo,
							children: ["Tipo ", /* @__PURE__ */ g("span", {
								className: Q.opcional,
								children: "(opcional)"
							})]
						}),
						/* @__PURE__ */ g(Tw, {
							opcoes: mD,
							valor: S ?? "",
							altura: 32,
							onChange: (e) => C(e || null)
						}),
						/* @__PURE__ */ g("label", {
							className: Q.rotulo,
							htmlFor: "avere-marcador-descricao",
							children: "O que aconteceu?"
						}),
						/* @__PURE__ */ g("textarea", {
							id: "avere-marcador-descricao",
							className: Q.texto,
							rows: 4,
							autoFocus: !0,
							placeholder: "Ex.: cliquei em Salvar e nada aconteceu — esperava ver o lançamento na lista.",
							value: w,
							onChange: (e) => E(e.target.value)
						}),
						UE(P) > 0 && /* @__PURE__ */ _("span", {
							className: Q.dica,
							children: [
								"Cite os números marcados no print:",
								" ",
								Array.from({ length: UE(P) }, (e, t) => t + 1).join(", ")
							]
						}),
						/* @__PURE__ */ _("details", {
							className: Q.contexto,
							open: !0,
							children: [
								/* @__PURE__ */ g("summary", { children: "O que vai junto (capturado automaticamente)" }),
								/* @__PURE__ */ _("dl", {
									className: Q.lista,
									children: [
										/* @__PURE__ */ g("dt", { children: "Rota" }),
										/* @__PURE__ */ g("dd", { children: B.rota }),
										/* @__PURE__ */ g("dt", { children: "Elemento" }),
										/* @__PURE__ */ g("dd", { children: /* @__PURE__ */ g("code", { children: B.contexto.elemento.seletor }) }),
										B.contexto.elemento.texto && /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g("dt", { children: "Texto" }), /* @__PURE__ */ g("dd", { children: B.contexto.elemento.texto })] }),
										/* @__PURE__ */ g("dt", { children: "avere-ui" }),
										/* @__PURE__ */ g("dd", { children: B.contexto.elemento.avere_ui.length ? B.contexto.elemento.avere_ui.join(" ‹ ") : "— não é do avere-ui (feito no sistema)" }),
										B.contexto.elemento.componentes.length > 0 && /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g("dt", { children: "Componente" }), /* @__PURE__ */ g("dd", { children: B.contexto.elemento.componentes.join(" ‹ ") })] }),
										/* @__PURE__ */ g("dt", { children: "App" }),
										/* @__PURE__ */ _("dd", { children: [
											B.app,
											" ",
											B.versao_app,
											" · avere-ui ",
											B.versao_avere_ui,
											" · ",
											B.ambiente
										] }),
										/* @__PURE__ */ g("dt", { children: "Quem" }),
										/* @__PURE__ */ g("dd", { children: B.usuario_nome ?? "—" }),
										/* @__PURE__ */ g("dt", { children: "Print" }),
										/* @__PURE__ */ g("dd", { children: k?.estado === "pronto" ? `2 imagens ${k.largura}×${k.altura} · ${Math.round(k.bytes / 1024)} KB` : k?.estado === "erro" ? k.mensagem : "…" }),
										/* @__PURE__ */ g("dt", { children: "Tela" }),
										/* @__PURE__ */ _("dd", { children: [
											B.contexto.viewport.largura,
											"×",
											B.contexto.viewport.altura,
											" @",
											B.contexto.viewport.dpr,
											"x"
										] }),
										/* @__PURE__ */ g("dt", { children: "Erros" }),
										/* @__PURE__ */ g("dd", { children: B.contexto.erros_console.length || "nenhum" }),
										/* @__PURE__ */ g("dt", { children: "Requisições" }),
										/* @__PURE__ */ g("dd", { children: B.contexto.requisicoes_falhas.length ? `${B.contexto.requisicoes_falhas.length} falharam` : "nenhuma falhou" })
									]
								}),
								B.contexto.erros_console.length > 0 && /* @__PURE__ */ g("ul", {
									className: Q.itens,
									children: B.contexto.erros_console.map((e, t) => /* @__PURE__ */ g("li", { children: e.mensagem }, t))
								}),
								B.contexto.requisicoes_falhas.length > 0 && /* @__PURE__ */ g("ul", {
									className: Q.itens,
									children: B.contexto.requisicoes_falhas.map((e, t) => /* @__PURE__ */ _("li", { children: [
										e.metodo,
										" ",
										e.url,
										" → ",
										e.status || "sem resposta",
										" (",
										e.duracao_ms,
										" ms)"
									] }, t))
								})
							]
						}),
						/* @__PURE__ */ _("details", {
							className: Q.contexto,
							children: [/* @__PURE__ */ g("summary", { children: "Prévia exata do que sobe (JSON)" }), /* @__PURE__ */ g("pre", {
								className: Q.json,
								children: JSON.stringify(B, null, 2)
							})]
						})
					]
				}),
				a.estado === "erro" && /* @__PURE__ */ _("div", {
					className: Q.erroEnvio,
					role: "alert",
					children: ["Não foi possível enviar. ", a.mensagem]
				}),
				/* @__PURE__ */ _("footer", {
					className: Q.rodape,
					children: [/* @__PURE__ */ _("button", {
						type: "button",
						className: Q.botaoSecundario,
						onClick: ae,
						children: [g(D ? me : Ce, { size: 14 }), D ? "Copiado" : "Copiar JSON"]
					}), /* @__PURE__ */ g("button", {
						type: "button",
						className: Q.botaoPrimario,
						onClick: () => void oe(),
						disabled: !B.descricao || a.estado === "enviando",
						title: B.descricao ? void 0 : "Descreva o que aconteceu para enviar",
						children: a.estado === "enviando" ? /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g(Ne, {
							size: 14,
							className: Q.girando
						}), " Enviando…"] }) : /* @__PURE__ */ _(h, { children: [
							/* @__PURE__ */ g(Be, { size: 14 }),
							" ",
							a.estado === "erro" ? "Tentar de novo" : "Enviar"
						] })
					})]
				})
			] })]
		}),
		I && N.current && /* @__PURE__ */ g(qE, {
			base: N.current.canvas,
			contorno: N.current.contorno,
			k: N.current.k,
			formasIniciais: P,
			onConcluir: ne,
			onCancelar: re,
			marcador: ce
		})
	] }), document.body);
}
//#endregion
//#region src/components/FiltroLista/index.tsx
function vD(e, t, n) {
	if (n) {
		let t = e.findIndex((e) => e.value === n);
		if (t >= 0) return t;
	}
	let r = e.findIndex((e) => t.includes(e.value));
	return r >= 0 ? r : 0;
}
function yD({ opcoes: e, selecionadas: t, onChange: n, focoInicial: r }) {
	let [i, a] = p(""), [o, s] = p(() => vD(e, t, r)), c = f(o), u = f(null), d = f(null), m = f(!0), h = i.trim() ? e.filter((e) => e.label.toLowerCase().includes(i.trim().toLowerCase())) : e;
	l(() => {
		m.current || (s(0), c.current = 0);
	}, [i]), l(() => {
		let e = requestAnimationFrame(() => {
			let e = d.current, t = u.current;
			if (e && t) {
				let n = e.getBoundingClientRect(), r = t.getBoundingClientRect();
				e.scrollTop += r.top - n.top - (n.height - r.height) / 2;
			}
			m.current = !1;
		});
		return () => cancelAnimationFrame(e);
	}, []), l(() => {
		m.current || u.current?.scrollIntoView({ block: "nearest" });
	}, [o]);
	function v(e) {
		n(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	}
	let y = (e) => {
		if (e.key === "ArrowDown") e.preventDefault(), c.current = Math.min(c.current + 1, h.length - 1), s(c.current);
		else if (e.key === "ArrowUp") e.preventDefault(), c.current = Math.max(c.current - 1, 0), s(c.current);
		else if (e.key === "Enter") {
			e.preventDefault();
			let t = h[c.current];
			t && v(t.value);
		}
	};
	return /* @__PURE__ */ _("div", {
		...j("FiltroLista"),
		style: {
			display: "flex",
			flexDirection: "column",
			gap: "var(--space-2)",
			width: 240
		},
		tabIndex: -1,
		children: [
			/* @__PURE__ */ g("input", {
				autoFocus: !0,
				placeholder: "Pesquisar…",
				value: i,
				onChange: (e) => a(e.target.value),
				onKeyDown: y,
				style: {
					padding: "6px 10px",
					borderRadius: "var(--radius-sm)",
					border: "1px solid var(--color-border-default)",
					fontSize: "var(--text-sm)",
					fontFamily: "inherit",
					outline: "none"
				}
			}),
			/* @__PURE__ */ _("div", {
				ref: d,
				style: {
					maxHeight: 260,
					overflowY: "auto",
					display: "flex",
					flexDirection: "column",
					gap: 2
				},
				children: [h.map((e, n) => /* @__PURE__ */ _("label", {
					ref: n === o ? u : void 0,
					onMouseEnter: () => {
						s(n), c.current = n;
					},
					style: {
						display: "flex",
						alignItems: "center",
						gap: 8,
						padding: "4px 6px",
						fontSize: "var(--text-sm)",
						cursor: "pointer",
						borderRadius: "var(--radius-sm)",
						background: n === o ? "var(--color-surface-sunken)" : "transparent"
					},
					children: [/* @__PURE__ */ g(st, {
						tabIndex: -1,
						checked: t.includes(e.value),
						onChange: () => v(e.value)
					}), /* @__PURE__ */ g("span", {
						style: {
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap"
						},
						children: e.label
					})]
				}, e.value)), h.length === 0 && /* @__PURE__ */ g("span", {
					style: {
						fontSize: "var(--text-sm)",
						color: "var(--color-text-muted)",
						padding: 4
					},
					children: "Nenhum valor encontrado."
				})]
			}),
			/* @__PURE__ */ _("div", {
				style: {
					display: "flex",
					justifyContent: "space-between",
					borderTop: "1px solid var(--color-border-subtle)",
					paddingTop: "var(--space-2)"
				},
				children: [/* @__PURE__ */ g("span", {
					style: {
						fontSize: "var(--text-xs)",
						color: "var(--color-text-muted)",
						alignSelf: "center"
					},
					children: t.length === 0 ? "Sem seleção = todos" : `${t.length} selecionado(s)`
				}), /* @__PURE__ */ g(nt, {
					size: "sm",
					variant: "ghost",
					intent: "secundaria",
					onClick: () => n([]),
					children: "Limpar"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/SelectMulti/index.tsx
function bD({ opcoes: e, valores: t, onChange: n, largura: r = 210, rotuloVazio: i = "Todos", substantivo: a = "itens", focoInicial: o }) {
	let s = t.length === 0 ? i : t.length === 1 ? e.find((e) => e.value === t[0])?.label ?? t[0] : `${t.length} ${a} selecionados`;
	return /* @__PURE__ */ _(Rx, { children: [/* @__PURE__ */ g(zx, {
		asChild: !0,
		children: /* @__PURE__ */ _("button", {
			...j("SelectMulti"),
			style: {
				width: r,
				height: 40,
				flexShrink: 0,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "0 12px",
				gap: 8,
				borderRadius: "var(--radius-md)",
				border: "1px solid var(--color-border-default)",
				background: "var(--color-surface)",
				fontFamily: "inherit",
				fontSize: "var(--text-sm)",
				cursor: "pointer",
				color: t.length ? "var(--color-text-primary)" : "var(--color-text-muted)"
			},
			children: [/* @__PURE__ */ g("span", {
				style: {
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap"
				},
				children: s
			}), /* @__PURE__ */ g(ve, {
				size: 14,
				style: {
					flexShrink: 0,
					color: "var(--color-text-muted)"
				}
			})]
		})
	}), /* @__PURE__ */ g(Bx, {
		...j("SelectMulti"),
		align: "start",
		style: {
			padding: "var(--space-3)",
			zIndex: 9999
		},
		children: /* @__PURE__ */ g(yD, {
			opcoes: e,
			selecionadas: t,
			onChange: n,
			focoInicial: o
		})
	})] });
}
//#endregion
//#region src/components/BotaoMesVigente/index.tsx
function xD({ ativo: e, onClick: t, rotulo: n = "mês vigente" }) {
	return /* @__PURE__ */ g("button", {
		...j("BotaoMesVigente"),
		type: "button",
		title: e ? `${n[0].toUpperCase()}${n.slice(1)} selecionado` : `Voltar ao ${n}`,
		"aria-label": `Voltar ao ${n}`,
		disabled: e,
		onClick: t,
		style: {
			width: 40,
			height: 40,
			flexShrink: 0,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			borderRadius: "var(--radius-md)",
			border: `1px solid ${e ? "var(--color-accent)" : "var(--color-border-default)"}`,
			background: e ? "var(--color-accent-subtle)" : "var(--color-surface)",
			cursor: e ? "default" : "pointer",
			color: e ? "var(--color-accent)" : "var(--color-text-secondary)"
		},
		children: /* @__PURE__ */ g(de, { size: 17 })
	});
}
//#endregion
//#region src/components/SeletorMes/index.tsx
function SD({ opcoes: e, valor: t, mesVigente: n, onChange: r, largura: i = 220 }) {
	let [a, o] = p(!1), [s, c] = p(""), [u, d] = p(() => Math.max(0, e.findIndex((e) => e.value === t))), m = f(u), h = f(null), v = f(null), y = f(!0), b = e.find((e) => e.value === t)?.label ?? t, x = s.trim() ? e.filter((e) => e.label.toLowerCase().includes(s.trim().toLowerCase())) : e;
	l(() => {
		y.current || (d(0), m.current = 0);
	}, [s]), l(() => {
		if (!a) {
			y.current = !0;
			return;
		}
		let n = Math.max(0, e.findIndex((e) => e.value === t));
		d(n), m.current = n;
		let r = requestAnimationFrame(() => {
			let e = v.current, t = e?.children[n];
			if (e && t) {
				let n = e.getBoundingClientRect(), r = t.getBoundingClientRect();
				e.scrollTop += r.top - n.top - (n.height - r.height) / 2;
			}
			y.current = !1;
		});
		return () => cancelAnimationFrame(r);
	}, [
		a,
		e,
		t
	]), l(() => {
		y.current || h.current?.scrollIntoView({ block: "nearest" });
	}, [u]);
	function S(e) {
		r(e), o(!1), c("");
	}
	let C = (e) => {
		if (e.key === "ArrowDown") e.preventDefault(), m.current = Math.min(m.current + 1, x.length - 1), d(m.current);
		else if (e.key === "ArrowUp") e.preventDefault(), m.current = Math.max(m.current - 1, 0), d(m.current);
		else if (e.key === "Enter") {
			e.preventDefault();
			let t = x[m.current];
			t && S(t.value);
		}
	}, w = t === n;
	return /* @__PURE__ */ _("div", {
		...j("SeletorMes"),
		style: {
			display: "flex",
			gap: "var(--space-2)",
			alignItems: "center"
		},
		children: [/* @__PURE__ */ _(Rx, {
			open: a,
			onOpenChange: (e) => {
				o(e), e || c("");
			},
			children: [/* @__PURE__ */ g(zx, {
				asChild: !0,
				children: /* @__PURE__ */ _("button", {
					style: {
						width: i,
						height: 40,
						flexShrink: 0,
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						padding: "0 12px",
						gap: 8,
						borderRadius: "var(--radius-md)",
						border: "1px solid var(--color-border-default)",
						background: "var(--color-surface)",
						fontFamily: "inherit",
						fontSize: "var(--text-sm)",
						cursor: "pointer",
						color: "var(--color-text-primary)"
					},
					children: [/* @__PURE__ */ g("span", {
						style: {
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap"
						},
						children: b
					}), /* @__PURE__ */ g(ve, {
						size: 14,
						style: {
							flexShrink: 0,
							color: "var(--color-text-muted)"
						}
					})]
				})
			}), /* @__PURE__ */ g(Bx, {
				...j("SeletorMes"),
				align: "start",
				style: {
					padding: "var(--space-3)",
					zIndex: 9999
				},
				children: /* @__PURE__ */ _("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: "var(--space-2)",
						width: 240
					},
					children: [/* @__PURE__ */ g("input", {
						autoFocus: !0,
						placeholder: "Pesquisar…",
						value: s,
						onChange: (e) => c(e.target.value),
						onKeyDown: C,
						style: {
							padding: "6px 10px",
							borderRadius: "var(--radius-sm)",
							border: "1px solid var(--color-border-default)",
							fontSize: "var(--text-sm)",
							fontFamily: "inherit",
							outline: "none"
						}
					}), /* @__PURE__ */ _("div", {
						ref: v,
						style: {
							maxHeight: 260,
							overflowY: "auto",
							display: "flex",
							flexDirection: "column",
							gap: 2
						},
						children: [x.map((e, n) => /* @__PURE__ */ _("label", {
							ref: n === u ? h : void 0,
							onMouseEnter: () => {
								d(n), m.current = n;
							},
							onClick: () => S(e.value),
							style: {
								display: "flex",
								alignItems: "center",
								gap: 8,
								padding: "4px 6px",
								fontSize: "var(--text-sm)",
								cursor: "pointer",
								borderRadius: "var(--radius-sm)",
								background: n === u ? "var(--color-surface-sunken)" : "transparent"
							},
							children: [/* @__PURE__ */ g(st, {
								tabIndex: -1,
								checked: e.value === t,
								onChange: () => S(e.value)
							}), /* @__PURE__ */ g("span", {
								style: {
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap"
								},
								children: e.label
							})]
						}, e.value)), x.length === 0 && /* @__PURE__ */ g("span", {
							style: {
								fontSize: "var(--text-sm)",
								color: "var(--color-text-muted)",
								padding: 4
							},
							children: "Nenhum mês encontrado."
						})]
					})]
				})
			})]
		}), /* @__PURE__ */ g(xD, {
			ativo: w,
			rotulo: "mês padrão",
			onClick: () => S(n)
		})]
	});
}
//#endregion
//#region src/components/CampoData/index.tsx
function CD(e) {
	if (!e) return "";
	let [t, n, r] = e.split("-");
	return !t || !n || !r ? "" : `${r}/${n}/${t}`;
}
function wD(e) {
	let t = e.slice(0, 8);
	return t.length <= 2 ? t : t.length <= 4 ? `${t.slice(0, 2)}/${t.slice(2)}` : `${t.slice(0, 2)}/${t.slice(2, 4)}/${t.slice(4)}`;
}
function TD(e) {
	let t = e.replace(/\D/g, "");
	if (t.length !== 8) return null;
	let n = Number(t.slice(0, 2)), r = Number(t.slice(2, 4)), i = Number(t.slice(4));
	if (i < 1900 || i > 2200 || r < 1 || r > 12) return null;
	let a = new Date(i, r, 0).getDate();
	return n < 1 || n > a ? null : `${i}-${String(r).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function ED({ label: e, valor: t, onChange: n, placeholder: r }) {
	let [i, a] = p(() => CD(t));
	l(() => {
		a((e) => {
			let n = CD(t);
			return TD(e) === (t || null) && e !== "" ? e : n;
		});
	}, [t]);
	let o = i.replace(/\D/g, "").length === 8 && !TD(i), s = i !== "" && i.replace(/\D/g, "").length < 8;
	return /* @__PURE__ */ g(at, {
		...j("CampoData"),
		label: e,
		inputMode: "numeric",
		placeholder: r ?? "dd/mm/aaaa",
		value: i,
		error: o ? "Data inválida" : void 0,
		onChange: (e) => {
			let t = wD(e.target.value.replace(/\D/g, ""));
			a(t);
			let r = TD(t);
			r ? n(r) : t === "" && n("");
		},
		onBlur: () => {
			s && a(CD(t));
		}
	});
}
function DD({ valor: e, onChange: t, className: n, style: r }) {
	let [i, a] = p(() => CD(e));
	l(() => {
		a((t) => {
			let n = CD(e);
			return TD(t) === (e || null) && t !== "" ? t : n;
		});
	}, [e]);
	let o = i.replace(/\D/g, "").length === 8 && !TD(i);
	return /* @__PURE__ */ g("input", {
		...j("InputDataInline"),
		className: n,
		inputMode: "numeric",
		placeholder: "dd/mm/aaaa",
		value: i,
		style: {
			...r,
			...o ? { borderColor: "var(--color-danger-solid)" } : {}
		},
		onChange: (e) => {
			let n = wD(e.target.value.replace(/\D/g, ""));
			a(n);
			let r = TD(n);
			r && t(r);
		},
		onBlur: () => {
			i.replace(/\D/g, "").length < 8 && a(CD(e));
		}
	});
}
var OD = {
	campo: "_campo_1nmto_3",
	lupa: "_lupa_1nmto_11",
	input: "_input_1nmto_20",
	limpar: "_limpar_1nmto_55"
}, kD = {
	type: "search",
	name: "busca",
	autoComplete: "off",
	autoCorrect: "off",
	autoCapitalize: "off",
	spellCheck: !1,
	"data-1p-ignore": "true",
	"data-lpignore": "true",
	"data-bwignore": "true",
	"data-form-type": "other"
}, AD = a(({ valor: e, onChange: t, placeholder: n = "Buscar…", atraso: r = 0, rotulo: i, autoFocus: a, disabled: o, className: s, style: c }, u) => {
	let [d, m] = p(e), h = f(null);
	l(() => {
		m(e);
	}, [e]), l(() => () => {
		h.current && clearTimeout(h.current);
	}, []);
	let v = (e, n = !1) => {
		m(e), h.current && clearTimeout(h.current), !r || n ? t(e) : h.current = setTimeout(() => t(e), r);
	};
	return /* @__PURE__ */ _("div", {
		...j("CampoBusca"),
		role: "search",
		className: T(OD.campo, s),
		style: c,
		children: [
			/* @__PURE__ */ g(ze, {
				className: OD.lupa,
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ g("input", {
				ref: u,
				...kD,
				className: OD.input,
				value: d,
				placeholder: n,
				"aria-label": i ?? n,
				autoFocus: a,
				disabled: o,
				onChange: (e) => v(e.target.value),
				onKeyDown: (e) => {
					e.key === "Escape" && d && (e.preventDefault(), e.stopPropagation(), v("", !0));
				}
			}),
			d && !o && /* @__PURE__ */ g("button", {
				type: "button",
				className: OD.limpar,
				"aria-label": "Limpar busca",
				onClick: () => v("", !0),
				children: /* @__PURE__ */ g(Ye, { size: 14 })
			})
		]
	});
});
AD.displayName = "CampoBusca";
//#endregion
//#region node_modules/cmdk/dist/chunk-NZJY6EH4.mjs
var jD = 1, MD = .9, ND = .8, PD = .17, FD = .1, ID = .999, LD = .9999, RD = .99, zD = /[\\\/_+.#"@\[\(\{&]/, BD = /[\\\/_+.#"@\[\(\{&]/g, VD = /[\s-]/, HD = /[\s-]/g;
function UD(e, t, n, r, i, a, o) {
	if (a === t.length) return i === e.length ? jD : RD;
	var s = `${i},${a}`;
	if (o[s] !== void 0) return o[s];
	for (var c = r.charAt(a), l = n.indexOf(c, i), u = 0, d, f, p, m; l >= 0;) d = UD(e, t, n, r, l + 1, a + 1, o), d > u && (l === i ? d *= jD : zD.test(e.charAt(l - 1)) ? (d *= ND, p = e.slice(i, l - 1).match(BD), p && i > 0 && (d *= ID ** +p.length)) : VD.test(e.charAt(l - 1)) ? (d *= MD, m = e.slice(i, l - 1).match(HD), m && i > 0 && (d *= ID ** +m.length)) : (d *= PD, i > 0 && (d *= ID ** +(l - i))), e.charAt(l) !== t.charAt(a) && (d *= LD)), (d < FD && n.charAt(l - 1) === r.charAt(a + 1) || r.charAt(a + 1) === r.charAt(a) && n.charAt(l - 1) !== r.charAt(a)) && (f = UD(e, t, n, r, l + 1, a + 2, o), f * FD > d && (d = f * FD)), d > u && (u = d), l = n.indexOf(c, l + 1);
	return o[s] = u, u;
}
function WD(e) {
	return e.toLowerCase().replace(HD, " ");
}
function GD(e, t, n) {
	return e = n && n.length > 0 ? `${e + " " + n.join(" ")}` : e, UD(e, t, WD(e), WD(t), 0, 0, {});
}
//#endregion
//#region node_modules/cmdk/dist/index.mjs
var KD = "[cmdk-group=\"\"]", qD = "[cmdk-group-items=\"\"]", JD = "[cmdk-group-heading=\"\"]", YD = "[cmdk-item=\"\"]", XD = `${YD}:not([aria-disabled="true"])`, ZD = "cmdk-item-select", QD = "data-value", $D = (e, t, n) => GD(e, t, n), eO = e.createContext(void 0), tO = () => e.useContext(eO), nO = e.createContext(void 0), rO = () => e.useContext(nO), iO = e.createContext(void 0), aO = e.forwardRef((t, n) => {
	let r = yO(() => ({
		search: "",
		value: t.value ?? t.defaultValue ?? "",
		selectedItemId: void 0,
		filtered: {
			count: 0,
			items: /* @__PURE__ */ new Map(),
			groups: /* @__PURE__ */ new Set()
		}
	})), i = yO(() => /* @__PURE__ */ new Set()), a = yO(() => /* @__PURE__ */ new Map()), o = yO(() => /* @__PURE__ */ new Map()), s = yO(() => /* @__PURE__ */ new Set()), c = _O(t), { label: l, children: u, value: d, onValueChange: f, filter: p, shouldFilter: m, loop: h, disablePointerSelection: g = !1, vimBindings: _ = !0, ...v } = t, y = Tt(), b = Tt(), x = Tt(), S = e.useRef(null), C = SO();
	vO(() => {
		if (d !== void 0) {
			let e = d.trim();
			r.current.value = e, w.emit();
		}
	}, [d]), vO(() => {
		C(6, A);
	}, []);
	let w = e.useMemo(() => ({
		subscribe: (e) => (s.current.add(e), () => s.current.delete(e)),
		snapshot: () => r.current,
		setState: (e, t, n) => {
			var i, a, o;
			if (!Object.is(r.current[e], t)) {
				if (r.current[e] = t, e === "search") k(), D(), C(1, O);
				else if (e === "value") {
					if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
						let e = document.getElementById(x);
						e ? e.focus() : (i = document.getElementById(y)) == null || i.focus();
					}
					if (C(7, () => {
						r.current.selectedItemId = j()?.id, w.emit();
					}), n || C(5, A), c.current?.value !== void 0) {
						let e = t ?? "";
						(o = (a = c.current).onValueChange) == null || o.call(a, e);
						return;
					}
				}
				w.emit();
			}
		},
		emit: () => {
			s.current.forEach((e) => e());
		}
	}), []), T = e.useMemo(() => ({
		value: (e, t, n) => {
			t !== o.current.get(e)?.value && (o.current.set(e, {
				value: t,
				keywords: n
			}), r.current.filtered.items.set(e, E(t, n)), C(2, () => {
				D(), w.emit();
			}));
		},
		item: (e, t) => (i.current.add(e), t && (a.current.has(t) ? a.current.get(t).add(e) : a.current.set(t, new Set([e]))), C(3, () => {
			k(), D(), r.current.value || O(), w.emit();
		}), () => {
			o.current.delete(e), i.current.delete(e), r.current.filtered.items.delete(e);
			let t = j();
			C(4, () => {
				k(), t?.getAttribute("id") === e && O(), w.emit();
			});
		}),
		group: (e) => (a.current.has(e) || a.current.set(e, /* @__PURE__ */ new Set()), () => {
			o.current.delete(e), a.current.delete(e);
		}),
		filter: () => c.current.shouldFilter,
		label: l || t["aria-label"],
		getDisablePointerSelection: () => c.current.disablePointerSelection,
		listId: y,
		inputId: x,
		labelId: b,
		listInnerRef: S
	}), []);
	function E(e, t) {
		let n = c.current?.filter ?? $D;
		return e ? n(e, r.current.search, t) : 0;
	}
	function D() {
		if (!r.current.search || c.current.shouldFilter === !1) return;
		let e = r.current.filtered.items, t = [];
		r.current.filtered.groups.forEach((n) => {
			let r = a.current.get(n), i = 0;
			r.forEach((t) => {
				let n = e.get(t);
				i = Math.max(n, i);
			}), t.push([n, i]);
		});
		let n = S.current;
		M().sort((t, n) => {
			let r = t.getAttribute("id"), i = n.getAttribute("id");
			return (e.get(i) ?? 0) - (e.get(r) ?? 0);
		}).forEach((e) => {
			let t = e.closest(qD);
			t ? t.appendChild(e.parentElement === t ? e : e.closest(`${qD} > *`)) : n.appendChild(e.parentElement === n ? e : e.closest(`${qD} > *`));
		}), t.sort((e, t) => t[1] - e[1]).forEach((e) => {
			let t = S.current?.querySelector(`${KD}[${QD}="${encodeURIComponent(e[0])}"]`);
			t?.parentElement.appendChild(t);
		});
	}
	function O() {
		let e = M().find((e) => e.getAttribute("aria-disabled") !== "true")?.getAttribute(QD);
		w.setState("value", e || void 0);
	}
	function k() {
		if (!r.current.search || c.current.shouldFilter === !1) {
			r.current.filtered.count = i.current.size;
			return;
		}
		r.current.filtered.groups = /* @__PURE__ */ new Set();
		let e = 0;
		for (let t of i.current) {
			let n = E(o.current.get(t)?.value ?? "", o.current.get(t)?.keywords ?? []);
			r.current.filtered.items.set(t, n), n > 0 && e++;
		}
		for (let [e, t] of a.current) for (let n of t) if (r.current.filtered.items.get(n) > 0) {
			r.current.filtered.groups.add(e);
			break;
		}
		r.current.filtered.count = e;
	}
	function A() {
		var e;
		let t = j();
		t && (t.parentElement?.firstChild === t && ((e = t.closest(KD)?.querySelector(JD)) == null || e.scrollIntoView({ block: "nearest" })), t.scrollIntoView({ block: "nearest" }));
	}
	function j() {
		return S.current?.querySelector(`${YD}[aria-selected="true"]`);
	}
	function M() {
		return Array.from(S.current?.querySelectorAll(XD) || []);
	}
	function N(e) {
		let t = M()[e];
		t && w.setState("value", t.getAttribute(QD));
	}
	function P(e) {
		var t;
		let n = j(), r = M(), i = r.findIndex((e) => e === n), a = r[i + e];
		(t = c.current) != null && t.loop && (a = i + e < 0 ? r[r.length - 1] : i + e === r.length ? r[0] : r[i + e]), a && w.setState("value", a.getAttribute(QD));
	}
	function F(e) {
		let t = j()?.closest(KD), n;
		for (; t && !n;) t = e > 0 ? hO(t, KD) : gO(t, KD), n = t?.querySelector(XD);
		n ? w.setState("value", n.getAttribute(QD)) : P(e);
	}
	let I = () => N(M().length - 1), L = (e) => {
		e.preventDefault(), e.metaKey ? I() : e.altKey ? F(1) : P(1);
	}, ee = (e) => {
		e.preventDefault(), e.metaKey ? N(0) : e.altKey ? F(-1) : P(-1);
	};
	return e.createElement(U.div, {
		ref: n,
		tabIndex: -1,
		...v,
		"cmdk-root": "",
		onKeyDown: (e) => {
			var t;
			(t = v.onKeyDown) == null || t.call(v, e);
			let n = e.nativeEvent.isComposing || e.keyCode === 229;
			if (!(e.defaultPrevented || n)) switch (e.key) {
				case "n":
				case "j":
					_ && e.ctrlKey && L(e);
					break;
				case "ArrowDown":
					L(e);
					break;
				case "p":
				case "k":
					_ && e.ctrlKey && ee(e);
					break;
				case "ArrowUp":
					ee(e);
					break;
				case "Home":
					e.preventDefault(), N(0);
					break;
				case "End":
					e.preventDefault(), I();
					break;
				case "Enter": {
					e.preventDefault();
					let t = j();
					if (t) {
						let e = new Event(ZD);
						t.dispatchEvent(e);
					}
				}
			}
		}
	}, e.createElement("label", {
		"cmdk-label": "",
		htmlFor: T.inputId,
		id: T.labelId,
		style: TO
	}, l), wO(t, (t) => e.createElement(nO.Provider, { value: w }, e.createElement(eO.Provider, { value: T }, t))));
}), oO = e.forwardRef((t, n) => {
	let r = Tt(), i = e.useRef(null), a = e.useContext(iO), o = tO(), s = _O(t), c = s.current?.forceMount ?? a?.forceMount;
	vO(() => {
		if (!c) return o.item(r, a?.id);
	}, [c]);
	let l = xO(r, i, [
		t.value,
		t.children,
		i
	], t.keywords), u = rO(), d = bO((e) => e.value && e.value === l.current), f = bO((e) => c || o.filter() === !1 ? !0 : e.search ? e.filtered.items.get(r) > 0 : !0);
	e.useEffect(() => {
		let e = i.current;
		if (!(!e || t.disabled)) return e.addEventListener(ZD, p), () => e.removeEventListener(ZD, p);
	}, [
		f,
		t.onSelect,
		t.disabled
	]);
	function p() {
		var e, t;
		m(), (t = (e = s.current).onSelect) == null || t.call(e, l.current);
	}
	function m() {
		u.setState("value", l.current, !0);
	}
	if (!f) return null;
	let { disabled: h, value: g, onSelect: _, forceMount: v, keywords: y, ...b } = t;
	return e.createElement(U.div, {
		ref: lt(i, n),
		...b,
		id: r,
		"cmdk-item": "",
		role: "option",
		"aria-disabled": !!h,
		"aria-selected": !!d,
		"data-disabled": !!h,
		"data-selected": !!d,
		onPointerMove: h || o.getDisablePointerSelection() ? void 0 : m,
		onClick: h ? void 0 : p
	}, t.children);
}), sO = e.forwardRef((t, n) => {
	let { heading: r, children: i, forceMount: a, ...o } = t, s = Tt(), c = e.useRef(null), l = e.useRef(null), u = Tt(), d = tO(), f = bO((e) => a || d.filter() === !1 ? !0 : e.search ? e.filtered.groups.has(s) : !0);
	vO(() => d.group(s), []), xO(s, c, [
		t.value,
		t.heading,
		l
	]);
	let p = e.useMemo(() => ({
		id: s,
		forceMount: a
	}), [a]);
	return e.createElement(U.div, {
		ref: lt(c, n),
		...o,
		"cmdk-group": "",
		role: "presentation",
		hidden: f ? void 0 : !0
	}, r && e.createElement("div", {
		ref: l,
		"cmdk-group-heading": "",
		"aria-hidden": !0,
		id: u
	}, r), wO(t, (t) => e.createElement("div", {
		"cmdk-group-items": "",
		role: "group",
		"aria-labelledby": r ? u : void 0
	}, e.createElement(iO.Provider, { value: p }, t))));
}), cO = e.forwardRef((t, n) => {
	let { alwaysRender: r, ...i } = t, a = e.useRef(null), o = bO((e) => !e.search);
	return !r && !o ? null : e.createElement(U.div, {
		ref: lt(a, n),
		...i,
		"cmdk-separator": "",
		role: "separator"
	});
}), lO = e.forwardRef((t, n) => {
	let { onValueChange: r, ...i } = t, a = t.value != null, o = rO(), s = bO((e) => e.search), c = bO((e) => e.selectedItemId), l = tO();
	return e.useEffect(() => {
		t.value != null && o.setState("search", t.value);
	}, [t.value]), e.createElement(U.input, {
		ref: n,
		...i,
		"cmdk-input": "",
		autoComplete: "off",
		autoCorrect: "off",
		spellCheck: !1,
		"aria-autocomplete": "list",
		role: "combobox",
		"aria-expanded": !0,
		"aria-controls": l.listId,
		"aria-labelledby": l.labelId,
		"aria-activedescendant": c,
		id: l.inputId,
		type: "text",
		value: a ? t.value : s,
		onChange: (e) => {
			a || o.setState("search", e.target.value), r?.(e.target.value);
		}
	});
}), uO = e.forwardRef((t, n) => {
	let { children: r, label: i = "Suggestions", ...a } = t, o = e.useRef(null), s = e.useRef(null), c = bO((e) => e.selectedItemId), l = tO();
	return e.useEffect(() => {
		if (s.current && o.current) {
			let e = s.current, t = o.current, n, r = new ResizeObserver(() => {
				n = requestAnimationFrame(() => {
					let n = e.offsetHeight;
					t.style.setProperty("--cmdk-list-height", n.toFixed(1) + "px");
				});
			});
			return r.observe(e), () => {
				cancelAnimationFrame(n), r.unobserve(e);
			};
		}
	}, []), e.createElement(U.div, {
		ref: lt(o, n),
		...a,
		"cmdk-list": "",
		role: "listbox",
		tabIndex: -1,
		"aria-activedescendant": c,
		"aria-label": i,
		id: l.listId
	}, wO(t, (t) => e.createElement("div", {
		ref: lt(s, l.listInnerRef),
		"cmdk-list-sizer": ""
	}, t)));
}), dO = e.forwardRef((t, n) => {
	let { open: r, onOpenChange: i, overlayClassName: a, contentClassName: o, container: s, ...c } = t;
	return e.createElement(qC, {
		open: r,
		onOpenChange: i
	}, e.createElement(YC, { container: s }, e.createElement(XC, {
		"cmdk-overlay": "",
		className: a
	}), e.createElement(ZC, {
		"aria-label": t.label,
		"cmdk-dialog": "",
		className: o
	}, e.createElement(aO, {
		ref: n,
		...c
	}))));
}), fO = e.forwardRef((t, n) => bO((e) => e.filtered.count === 0) ? e.createElement(U.div, {
	ref: n,
	...t,
	"cmdk-empty": "",
	role: "presentation"
}) : null), pO = e.forwardRef((t, n) => {
	let { progress: r, children: i, label: a = "Loading...", ...o } = t;
	return e.createElement(U.div, {
		ref: n,
		...o,
		"cmdk-loading": "",
		role: "progressbar",
		"aria-valuenow": r,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-label": a
	}, wO(t, (t) => e.createElement("div", { "aria-hidden": !0 }, t)));
}), mO = Object.assign(aO, {
	List: uO,
	Item: oO,
	Input: lO,
	Group: sO,
	Separator: cO,
	Dialog: dO,
	Empty: fO,
	Loading: pO
});
function hO(e, t) {
	let n = e.nextElementSibling;
	for (; n;) {
		if (n.matches(t)) return n;
		n = n.nextElementSibling;
	}
}
function gO(e, t) {
	let n = e.previousElementSibling;
	for (; n;) {
		if (n.matches(t)) return n;
		n = n.previousElementSibling;
	}
}
function _O(t) {
	let n = e.useRef(t);
	return vO(() => {
		n.current = t;
	}), n;
}
var vO = typeof window > "u" ? e.useEffect : e.useLayoutEffect;
function yO(t) {
	let n = e.useRef();
	return n.current === void 0 && (n.current = t()), n;
}
function bO(t) {
	let n = rO(), r = () => t(n.snapshot());
	return e.useSyncExternalStore(n.subscribe, r, r);
}
function xO(t, n, r, i = []) {
	let a = e.useRef(), o = tO();
	return vO(() => {
		var e;
		let s = (() => {
			for (let e of r) {
				if (typeof e == "string") return e.trim();
				if (typeof e == "object" && "current" in e) return e.current ? e.current.textContent?.trim() : a.current;
			}
		})(), c = i.map((e) => e.trim());
		o.value(t, s, c), (e = n.current) == null || e.setAttribute(QD, s), a.current = s;
	}), a;
}
var SO = () => {
	let [t, n] = e.useState(), r = yO(() => /* @__PURE__ */ new Map());
	return vO(() => {
		r.current.forEach((e) => e()), r.current = /* @__PURE__ */ new Map();
	}, [t]), (e, t) => {
		r.current.set(e, t), n({});
	};
};
function CO(e) {
	let t = e.type;
	return typeof t == "function" ? t(e.props) : "render" in t ? t.render(e.props) : e;
}
function wO({ asChild: t, children: n }, r) {
	return t && e.isValidElement(n) ? e.cloneElement(CO(n), { ref: n.ref }, r(n.props.children)) : r(n);
}
var TO = {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: "0",
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	borderWidth: "0"
}, EO = {
	botao: "_botao_ujyjy_4",
	tecla: "_tecla_ujyjy_32",
	fundo: "_fundo_ujyjy_44",
	janela: "_janela_ujyjy_52",
	paleta: "_paleta_ujyjy_62",
	campo: "_campo_ujyjy_71",
	iconeCampo: "_iconeCampo_ujyjy_75",
	rotulo: "_rotulo_ujyjy_142",
	detalhe: "_detalhe_ujyjy_148",
	rodape: "_rodape_ujyjy_163",
	somenteLeitor: "_somenteLeitor_ujyjy_183"
}, DO = (e) => e.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(), OO = "\0", kO = (e) => DO(e).trim().split(/\s+/).filter(Boolean), AO = (e, t) => t.every((t) => e.includes(t)), jO = (e, t, n, r) => {
	let i = e.split(OO)[0], a = kO(t);
	if (!a.length) return 1;
	let o = n?.length ? `${i} ${n.join(" ")}` : i;
	if (AO(o, a)) return a.every((e) => ` ${o}`.includes(` ${e}`)) ? 1 : .9;
	if (!r || a.every((e) => /^\d+$/.test(e))) return 0;
	let s = $D(i, a.join(" "), n);
	return s >= MO ? s * .5 : 0;
}, MO = .1, NO = (e, t) => `${e}${OO}${t}`;
function PO(e) {
	try {
		let t = JSON.parse(localStorage.getItem(e) ?? "[]");
		return Array.isArray(t) ? t : [];
	} catch {
		return [];
	}
}
function FO(e, t, n) {
	try {
		let r = [t, ...PO(e).filter((e) => e !== t)].slice(0, n);
		localStorage.setItem(e, JSON.stringify(r));
	} catch {}
}
var IO = typeof navigator < "u" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
function LO({ lista: e }) {
	return l(() => {
		let t = e.current;
		if (!t) return;
		t.scrollTo({ top: 0 });
		let n = requestAnimationFrame(() => t.scrollTo({ top: 0 }));
		return () => cancelAnimationFrame(n);
	}, [bO((e) => e.search), e]), null;
}
function RO() {
	let e = bO((e) => e.filtered.count), t = bO((e) => e.search);
	return /* @__PURE__ */ g("div", {
		"aria-live": "polite",
		className: EO.somenteLeitor,
		children: t ? `${e} ${e === 1 ? "resultado" : "resultados"}` : ""
	});
}
function zO({ grupos: e, placeholder: t = "Buscar…", textoVazio: n = (e) => `Nada encontrado para "${e}".`, mostrarBotao: r = !0, rotuloBotao: i = "Buscar…", atalho: a = !0, maxRecentes: s = 6, chaveRecentes: c = "avere-ui:busca-recentes", aberto: u, onAbertoChange: m }) {
	let [v, y] = p(!1), b = u ?? v, x = f(null), S = o((e) => {
		e && !b && (x.current = document.activeElement), u === void 0 && y(e), m?.(e);
	}, [
		b,
		u,
		m
	]);
	l(() => {
		if (b || !x.current) return;
		let e = x.current;
		x.current = null;
		let t = setTimeout(() => {
			e.isConnected && e.focus();
		}, 0);
		return () => clearTimeout(t);
	}, [b]);
	let [C, w] = p(""), T = f(null);
	l(() => {
		b && w("");
	}, [b]), l(() => {
		if (!a) return;
		let e = (e) => {
			(e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k" && (e.preventDefault(), S(!b));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		a,
		b,
		S
	]);
	let E = d(() => {
		if (!b) return [];
		let t = /* @__PURE__ */ new Map();
		for (let n of e) if (n.recentes) for (let e of n.itens) t.set(NO(n.titulo, e.id), e);
		return PO(c).map((e) => t.get(e)).filter((e) => !!e);
	}, [
		b,
		e,
		c
	]), D = (e, t) => {
		e.recentes && FO(c, NO(e.titulo, t.id), s), S(!1), t.aoEscolher();
	}, O = (e) => DO(`${e.rotulo} ${e.detalhe ?? ""}`), k = (e, t) => /* @__PURE__ */ _(h, { children: [
		t && /* @__PURE__ */ g(t, { size: 16 }),
		/* @__PURE__ */ g("span", {
			className: EO.rotulo,
			children: e.rotulo
		}),
		e.detalhe != null && e.detalhe !== "" && /* @__PURE__ */ g("span", {
			className: EO.detalhe,
			children: e.detalhe
		})
	] }), A = C.trim() === "", M = d(() => {
		let t = kO(C);
		return t.length ? e.some((e) => e.itens.some((e) => AO(`${O(e)} ${(e.palavrasChave ?? []).map(DO).join(" ")}`, t))) : !0;
	}, [C, e]), N = o((e, t, n) => jO(e, t, n, !M), [M]);
	return /* @__PURE__ */ _(h, { children: [r && /* @__PURE__ */ _("button", {
		...j("BuscaRapida"),
		type: "button",
		className: EO.botao,
		onClick: () => S(!0),
		"aria-label": `Busca rápida (${IO ? "⌘K" : "Ctrl+K"})`,
		"aria-keyshortcuts": a ? IO ? "Meta+K" : "Control+K" : void 0,
		children: [
			/* @__PURE__ */ g(ze, { size: 15 }),
			/* @__PURE__ */ g("span", { children: i }),
			a && /* @__PURE__ */ g("kbd", {
				className: EO.tecla,
				children: IO ? "⌘K" : "Ctrl K"
			})
		]
	}), /* @__PURE__ */ _(mO.Dialog, {
		...j("BuscaRapida"),
		open: b,
		onOpenChange: S,
		label: "Busca rápida",
		shouldFilter: !A,
		filter: N,
		loop: !0,
		overlayClassName: EO.fundo,
		contentClassName: EO.janela,
		className: EO.paleta,
		children: [
			/* @__PURE__ */ _("div", {
				className: EO.campo,
				children: [/* @__PURE__ */ g(ze, {
					size: 18,
					className: EO.iconeCampo
				}), /* @__PURE__ */ g(mO.Input, {
					value: C,
					onValueChange: w,
					placeholder: t
				})]
			}),
			/* @__PURE__ */ _(mO.List, {
				ref: T,
				children: [
					/* @__PURE__ */ g(mO.Empty, { children: n(C) }),
					A && E.length > 0 && /* @__PURE__ */ g(mO.Group, {
						heading: "Recentes",
						children: E.map((t) => {
							let n = e.find((e) => e.recentes && e.itens.includes(t));
							return /* @__PURE__ */ g(mO.Item, {
								value: `${O(t)}${OO}recente${OO}${NO(n.titulo, t.id)}`,
								onSelect: () => D(n, t),
								children: k(t, xe)
							}, `recente-${n.titulo}-${t.id}`);
						})
					}),
					e.map((e) => e.itens.length > 0 && /* @__PURE__ */ g(mO.Group, {
						heading: e.titulo,
						children: e.itens.map((t) => /* @__PURE__ */ g(mO.Item, {
							value: `${O(t)}${OO}${NO(e.titulo, t.id)}`,
							keywords: t.palavrasChave?.map(DO),
							onSelect: () => D(e, t),
							children: k(t, t.icone)
						}, t.id))
					}, e.titulo))
				]
			}),
			/* @__PURE__ */ _("div", {
				className: EO.rodape,
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ _("span", { children: [
						/* @__PURE__ */ g("kbd", { children: "↑" }),
						/* @__PURE__ */ g("kbd", { children: "↓" }),
						" navegar"
					] }),
					/* @__PURE__ */ _("span", { children: [/* @__PURE__ */ g("kbd", { children: "↵" }), " abrir"] }),
					/* @__PURE__ */ _("span", { children: [/* @__PURE__ */ g("kbd", { children: "esc" }), " fechar"] })
				]
			}),
			/* @__PURE__ */ g(RO, {}),
			/* @__PURE__ */ g(LO, { lista: T })
		]
	})] });
}
//#endregion
//#region src/hooks/useEdicaoInline.ts
function BO(e) {
	return !!e && e.matches("button[class*=\"cbTrigger\"], button[role=\"combobox\"]");
}
var VO = "input:not([type=\"hidden\"]):not([disabled]), button[class*=\"cbTrigger\"], button[role=\"combobox\"], [role=\"switch\"]";
function HO({ ativo: e, seletorLinha: t, coluna: n }) {
	l(() => {
		if (!e || n == null) return;
		let r = requestAnimationFrame(() => {
			let e = (document.querySelector(t)?.children[n])?.querySelector(VO);
			e && (e.focus(), e instanceof HTMLInputElement ? e.select() : BO(e) && e.click());
		});
		return () => cancelAnimationFrame(r);
	}, [
		e,
		t,
		n
	]);
}
function UO() {
	l(() => {
		let e = !1, t = (t) => {
			t.key === "Tab" && (e = !0);
		}, n = () => {
			e = !1;
		}, r = (t) => {
			if (!e) return;
			e = !1;
			let n = t.target;
			BO(n) && n.getAttribute("aria-expanded") !== "true" && (n.hasAttribute("disabled") || setTimeout(() => n.click(), 0));
		};
		return document.addEventListener("keydown", t, !0), document.addEventListener("mousedown", n, !0), document.addEventListener("focusin", r), () => {
			document.removeEventListener("keydown", t, !0), document.removeEventListener("mousedown", n, !0), document.removeEventListener("focusin", r);
		};
	}, []);
}
function WO(e) {
	let t = e.target?.closest?.("td");
	return t?.parentElement ? [...t.parentElement.children].indexOf(t) : null;
}
var GO = {
	card: "_card_buvlb_1",
	header: "_header_buvlb_21",
	title: "_title_buvlb_35",
	description: "_description_buvlb_51",
	content: "_content_buvlb_63",
	footer: "_footer_buvlb_81"
}, KO = a(({ className: e, ...t }, n) => /* @__PURE__ */ g("div", {
	...j("Card"),
	ref: n,
	className: T(GO.card, e),
	...t
}));
KO.displayName = "Card";
var qO = a(({ className: e, ...t }, n) => /* @__PURE__ */ g("div", {
	ref: n,
	className: T(GO.header, e),
	...t
}));
qO.displayName = "CardHeader";
var JO = a(({ className: e, ...t }, n) => /* @__PURE__ */ g("h3", {
	ref: n,
	className: T(GO.title, e),
	...t
}));
JO.displayName = "CardTitle";
var YO = a(({ className: e, ...t }, n) => /* @__PURE__ */ g("p", {
	ref: n,
	className: T(GO.description, e),
	...t
}));
YO.displayName = "CardDescription";
var XO = a(({ className: e, ...t }, n) => /* @__PURE__ */ g("div", {
	ref: n,
	className: T(GO.content, e),
	...t
}));
XO.displayName = "CardContent";
var ZO = a(({ className: e, ...t }, n) => /* @__PURE__ */ g("div", {
	ref: n,
	className: T(GO.footer, e),
	...t
}));
ZO.displayName = "CardFooter";
var $ = {
	overlay: "_overlay_i2860_2",
	sidebar: "_sidebar_i2860_12",
	expanded: "_expanded_i2860_27",
	collapsed: "_collapsed_i2860_31",
	header: "_header_i2860_36",
	logoContainer: "_logoContainer_i2860_56",
	toggleButton: "_toggleButton_i2860_71",
	nav: "_nav_i2860_102",
	item: "_item_i2860_127",
	iconWrap: "_iconWrap_i2860_152",
	badge: "_badge_i2860_161",
	itemActive: "_itemActive_i2860_173",
	badgeDot: "_badgeDot_i2860_179",
	itemCollapsed: "_itemCollapsed_i2860_201",
	itemExpanded: "_itemExpanded_i2860_206",
	itemLabel: "_itemLabel_i2860_211",
	labelHidden: "_labelHidden_i2860_218",
	externo: "_externo_i2860_225",
	section: "_section_i2860_232",
	sectionCollapsed: "_sectionCollapsed_i2860_239",
	sectionLabel: "_sectionLabel_i2860_243",
	sectionRule: "_sectionRule_i2860_252",
	footer: "_footer_i2860_259",
	footerCollapsed: "_footerCollapsed_i2860_266",
	userRow: "_userRow_i2860_274",
	userRowCollapsed: "_userRowCollapsed_i2860_281",
	brandAvatar: "_brandAvatar_i2860_287",
	logoutButton: "_logoutButton_i2860_294",
	userInfo: "_userInfo_i2860_323",
	userName: "_userName_i2860_331",
	userRole: "_userRole_i2860_340",
	mobileOpen: "_mobileOpen_i2860_357",
	logoPlaceholder: "_logoPlaceholder_i2860_383",
	logoPulse: "_logoPulse_i2860_1"
}, QO = r({ isCollapsed: !1 });
function $O() {
	return s(QO);
}
var ek = "avere-ui:menu-lateral";
function tk() {
	window.dispatchEvent(new CustomEvent(ek));
}
//#endregion
//#region src/components/SideBar/index.tsx
var nk = "(max-width: 767px)", rk = "(min-width: 768px) and (max-width: 1023px)";
function ik() {
	return typeof window > "u" || !window.matchMedia ? "larga" : window.matchMedia(nk).matches ? "celular" : window.matchMedia(rk).matches ? "media" : "larga";
}
function ak() {
	let [e, t] = p(ik);
	return l(() => {
		if (!window.matchMedia) return;
		let e = [window.matchMedia(nk), window.matchMedia(rk)], n = () => t(ik());
		return e.forEach((e) => e.addEventListener("change", n)), () => e.forEach((e) => e.removeEventListener("change", n));
	}, []), e;
}
function ok(e) {
	let t = e.trim().split(/\s+/);
	return t.length === 1 ? t[0].substring(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
}
function sk({ icon: e, label: t, active: n, badge: r, href: i, externo: a, className: o, ...c }) {
	let { isCollapsed: l } = s(QO), u = /* @__PURE__ */ _(i ? "a" : "button", {
		...j("SideBarItem"),
		href: i,
		className: T($.item, n && $.itemActive, l ? $.itemCollapsed : $.itemExpanded, o),
		"aria-current": n ? "page" : void 0,
		...c,
		children: [
			/* @__PURE__ */ _("span", {
				className: $.iconWrap,
				children: [/* @__PURE__ */ g(e, { size: 20 }), l && r != null && r !== 0 && /* @__PURE__ */ g("span", {
					className: $.badgeDot,
					"aria-hidden": "true"
				})]
			}),
			/* @__PURE__ */ g("span", {
				className: T($.itemLabel, l && $.labelHidden),
				children: t
			}),
			!l && r != null && r !== 0 && /* @__PURE__ */ g("span", {
				className: $.badge,
				children: r
			}),
			!l && a && /* @__PURE__ */ g(ae, {
				size: 13,
				className: $.externo,
				"aria-label": "abre outro sistema"
			})
		]
	});
	return l ? /* @__PURE__ */ g(AS, {
		delayDuration: 150,
		children: /* @__PURE__ */ _(jS, { children: [/* @__PURE__ */ g(MS, {
			asChild: !0,
			children: u
		}), /* @__PURE__ */ g(NS, {
			side: "right",
			children: t
		})] })
	}) : u;
}
function ck({ label: e }) {
	let { isCollapsed: t } = s(QO);
	return /* @__PURE__ */ _("div", {
		...j("SideBarSection"),
		className: T($.section, t && $.sectionCollapsed),
		children: [!t && /* @__PURE__ */ g("span", {
			className: $.sectionLabel,
			children: e
		}), /* @__PURE__ */ g("span", { className: $.sectionRule })]
	});
}
function lk({ isCollapsed: e, onToggle: t, isOpenMobile: n, onCloseMobile: r, logo: i, children: a, userName: o = "Usuário", userRole: s = "Colaborador", userAvatarUrl: c, onLogout: u, className: d, ...f }) {
	let m = ak(), [v, y] = p(!1), b = m === "celular" && (n || v), x = m === "media" ? !0 : m === "celular" ? !1 : e, S = () => {
		y(!1), r?.();
	};
	return l(() => {
		let e = () => y((e) => !e);
		return window.addEventListener(ek, e), () => window.removeEventListener(ek, e);
	}, []), l(() => {
		m !== "celular" && y(!1);
	}, [m]), l(() => {
		if (!b) return;
		let e = (e) => {
			e.key === "Escape" && S();
		};
		return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
	}, [b]), /* @__PURE__ */ _(h, { children: [b && /* @__PURE__ */ g("div", {
		className: $.overlay,
		onClick: S
	}), /* @__PURE__ */ _("aside", {
		...j("SideBar"),
		className: T($.sidebar, x ? $.collapsed : $.expanded, b && $.mobileOpen, d),
		...f,
		children: [
			/* @__PURE__ */ _("div", {
				className: $.header,
				children: [/* @__PURE__ */ g("div", {
					className: $.logoContainer,
					children: typeof i == "function" ? i(x) : i
				}), t && m === "larga" && /* @__PURE__ */ g("button", {
					className: $.toggleButton,
					onClick: t,
					"aria-expanded": !e,
					"aria-label": "Alternar menu lateral",
					children: g(e ? _e : ge, { size: 15 })
				})]
			}),
			/* @__PURE__ */ g(QO.Provider, {
				value: { isCollapsed: x },
				children: /* @__PURE__ */ g("nav", {
					className: $.nav,
					"aria-label": "Principal",
					onClick: (e) => {
						b && e.target.closest(`.${$.item}`) && S();
					},
					children: a
				})
			}),
			/* @__PURE__ */ g("div", {
				className: T($.footer, x && $.footerCollapsed),
				children: /* @__PURE__ */ _("div", {
					className: T($.userRow, x && $.userRowCollapsed),
					children: [
						/* @__PURE__ */ g(ee, {
							src: c,
							initials: ok(o),
							size: x ? "sm" : "md",
							className: $.brandAvatar
						}),
						!x && /* @__PURE__ */ _("div", {
							className: $.userInfo,
							children: [/* @__PURE__ */ g("span", {
								className: $.userName,
								children: o
							}), /* @__PURE__ */ g("span", {
								className: $.userRole,
								children: s
							})]
						}),
						u && /* @__PURE__ */ g(AS, {
							delayDuration: 150,
							children: /* @__PURE__ */ _(jS, { children: [/* @__PURE__ */ g(MS, {
								asChild: !0,
								children: /* @__PURE__ */ g("button", {
									className: $.logoutButton,
									onClick: u,
									"aria-label": "Sair do Sistema",
									children: /* @__PURE__ */ g(Pe, { size: 16 })
								})
							}), /* @__PURE__ */ g(NS, {
								side: "right",
								children: "Sair do Sistema"
							})] })
						})
					]
				})
			})
		]
	})] });
}
var uk = {
	header: "_header_fm05s_1",
	buttonGroup: "_buttonGroup_fm05s_22",
	contextArea: "_contextArea_fm05s_27",
	mobileOnly: "_mobileOnly_fm05s_38",
	desktopOnly: "_desktopOnly_fm05s_42"
};
//#endregion
//#region src/components/TopBar/index.tsx
function dk({ onToggleMobile: e, className: t, children: n, ...r }) {
	return /* @__PURE__ */ _("header", {
		...j("TopBar"),
		className: T(uk.header, t),
		...r,
		children: [/* @__PURE__ */ g("div", {
			className: uk.buttonGroup,
			children: /* @__PURE__ */ g(nt, {
				variant: "ghost",
				intent: "secundaria",
				className: T(uk.mobileOnly),
				onClick: () => {
					tk(), e?.();
				},
				"aria-label": "Abrir menu",
				children: /* @__PURE__ */ g(Fe, { size: 20 })
			})
		}), /* @__PURE__ */ g("div", {
			className: uk.contextArea,
			children: n
		})]
	});
}
//#endregion
//#region src/components/NavegacaoSistemas/modulos.ts
var fk = [
	{
		codigo: "consolidador",
		nome: "Consolidador",
		descricao: "Posição e rentabilidade das carteiras",
		url: "https://consolidador-front.pages.dev",
		icone: pe,
		principais: [
			{
				label: "Dashboard",
				path: "/dashboard",
				icone: je
			},
			{
				label: "Cliente",
				path: "/cliente",
				icone: Ke
			},
			{
				label: "Alertas",
				path: "/alertas",
				icone: ce
			},
			{
				label: "Tarefas",
				path: "/tarefas",
				icone: Me
			}
		]
	},
	{
		codigo: "hub",
		nome: "HUB Avere",
		descricao: "Cadastro de clientes e consultores",
		url: "https://hub-avere.pages.dev",
		icone: Te,
		principais: [
			{
				label: "Clientes",
				path: "/clientes",
				icone: qe
			},
			{
				label: "Equipe",
				path: "/equipe",
				icone: Ge
			},
			{
				label: "Pendências",
				path: "/pendencias",
				icone: se
			}
		]
	},
	{
		codigo: "financeiro",
		nome: "Financeiro",
		descricao: "Lançamentos, DRE e fluxo de caixa",
		url: "https://financeiro-avere.pages.dev",
		icone: Je,
		principais: [
			{
				label: "Dashboard",
				path: "/dashboard",
				icone: je
			},
			{
				label: "DRE",
				path: "/dre",
				icone: He
			},
			{
				label: "Lançamentos",
				path: "/lancamentos",
				icone: le
			},
			{
				label: "Conciliação",
				path: "/conciliacao",
				icone: Ae
			}
		]
	}
], pk = {
	ambiente: "_ambiente_1faxr_2",
	ambienteCompacto: "_ambienteCompacto_1faxr_11",
	ambienteIcone: "_ambienteIcone_1faxr_16",
	ambienteTextos: "_ambienteTextos_1faxr_28",
	outros: "_outros_1faxr_52",
	divisor: "_divisor_1faxr_59",
	bloco: "_bloco_1faxr_65",
	blocoCabecalho: "_blocoCabecalho_1faxr_71",
	chevron: "_chevron_1faxr_106",
	chevronAberto: "_chevronAberto_1faxr_112"
};
//#endregion
//#region src/components/NavegacaoSistemas/index.tsx
function mk({ atual: e, compacto: t }) {
	let n = fk.find((t) => t.codigo === e);
	return n ? /* @__PURE__ */ _("div", {
		...j("IndicadorAmbiente"),
		className: T(pk.ambiente, t && pk.ambienteCompacto),
		title: t ? `Avere · ${n.nome}` : void 0,
		children: [/* @__PURE__ */ g("span", {
			className: pk.ambienteIcone,
			children: /* @__PURE__ */ g(n.icone, {
				size: 18,
				"aria-hidden": "true"
			})
		}), !t && /* @__PURE__ */ _("span", {
			className: pk.ambienteTextos,
			children: [/* @__PURE__ */ g("small", { children: "Avere" }), /* @__PURE__ */ g("b", { children: n.nome })]
		})]
	}) : null;
}
var hk = "avere-ui:sistemas-abertos";
function gk() {
	try {
		return JSON.parse(localStorage.getItem(hk) ?? "[]");
	} catch {
		return [];
	}
}
function _k({ atual: e, sistemas: t }) {
	let { isCollapsed: n } = $O(), r = fk.filter((n) => n.codigo !== e && (!t || t.includes(n.codigo))), [i, a] = p(gk);
	if (l(() => {
		try {
			localStorage.setItem(hk, JSON.stringify(i));
		} catch {}
	}, [i]), r.length === 0) return null;
	let o = (e) => a((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	return /* @__PURE__ */ _("div", {
		...j("OutrosSistemas"),
		className: pk.outros,
		role: "group",
		"aria-label": "Outros sistemas Avere",
		children: [/* @__PURE__ */ g("span", {
			className: pk.divisor,
			"aria-hidden": "true"
		}), r.map((e) => {
			let t = (t) => e.url + t;
			if (n) return /* @__PURE__ */ g(sk, {
				icon: e.icone,
				label: e.nome,
				href: t(e.principais[0]?.path ?? "/"),
				externo: !0
			}, e.codigo);
			let r = i.includes(e.codigo);
			return /* @__PURE__ */ _("div", {
				className: pk.bloco,
				children: [/* @__PURE__ */ _("button", {
					type: "button",
					className: pk.blocoCabecalho,
					onClick: () => o(e.codigo),
					"aria-expanded": r,
					children: [
						/* @__PURE__ */ g(e.icone, {
							size: 16,
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ g("span", { children: e.nome }),
						/* @__PURE__ */ g(he, {
							size: 14,
							className: T(pk.chevron, r && pk.chevronAberto),
							"aria-hidden": "true"
						})
					]
				}), r && e.principais.map((n) => /* @__PURE__ */ g(sk, {
					icon: n.icone,
					label: n.label,
					href: t(n.path),
					externo: !0,
					title: `Abre ${e.nome} › ${n.label}`
				}, n.path))]
			}, e.codigo);
		})]
	});
}
//#endregion
export { ee as Avatar, I as Badge, xD as BotaoMesVigente, zO as BuscaRapida, nt as Button, Vx as Calendar, AD as CampoBusca, ED as CampoData, KO as Card, XO as CardContent, YO as CardDescription, ZO as CardFooter, qO as CardHeader, JO as CardTitle, st as Checkbox, il as Combobox, Ip as DataTable, Hx as DatePicker, pw as Drawer, bw as DrawerBody, gw as DrawerClose, vw as DrawerContent, Cw as DrawerDescription, xw as DrawerFooter, yw as DrawerHeader, _w as DrawerOverlay, hw as DrawerPortal, ww as DrawerSeparator, Sw as DrawerTitle, mw as DrawerTrigger, bp as DropdownMenu, Ap as DropdownMenuCheckboxItem, Op as DropdownMenuContent, Sp as DropdownMenuGroup, kp as DropdownMenuItem, Mp as DropdownMenuLabel, Cp as DropdownMenuPortal, Tp as DropdownMenuRadioGroup, jp as DropdownMenuRadioItem, Np as DropdownMenuSeparator, Pp as DropdownMenuShortcut, wp as DropdownMenuSub, Dp as DropdownMenuSubContent, Ep as DropdownMenuSubTrigger, xp as DropdownMenuTrigger, ol as FileUpload, yD as FiltroLista, Iu as HierarchicalCombobox, mk as IndicadorAmbiente, DD as InputDataInline, o_ as MESES_CURTOS, fk as MODULOS_AVERE, _D as MarcadorProblemas, nw as Modal, aw as ModalClose, sw as ModalContent, dw as ModalDescription, lw as ModalFooter, cw as ModalHeader, ow as ModalOverlay, iw as ModalPortal, uw as ModalTitle, rw as ModalTrigger, Ur as MultiSelect, _k as OutrosSistemas, Rx as Popover, Bx as PopoverContent, zx as PopoverTrigger, In as RadioGroup, Ln as RadioItem, Tw as Segmentado, Wx as Select, bD as SelectMulti, SD as SeletorMes, lk as SideBar, sk as SideBarItem, ck as SideBarSection, $e as Skeleton, Er as Slider, Qe as Spinner, Vr as Switch, S_ as TabelaConsulta, Ru as TagInput, at as TextField, fC as Toaster, jS as Tooltip, NS as TooltipContent, AS as TooltipProvider, MS as TooltipTrigger, dk as TopBar, N as Typography, p_ as Vazio, tk as alternarMenuLateral, F as badgeVariants, tt as buttonVariants, T as cn, WO as colunaDoEvento, a_ as displayMoeda, $g as formatBRL, n_ as formatCompacto, r_ as formatData, s_ as formatMoedaSinal, e_ as formatValor, it as inputVariants, i_ as parseMoedaDigitada, YS as toast, M as typographyVariants, UO as useAbrirComboboxNoTab, Xg as useAlturaDisponivel, HO as useEdicaoInline, $O as useSideBar };
