import * as e from "react";
import t, { createContext as n, createElement as r, forwardRef as i, useCallback as a, useContext as o, useEffect as s, useLayoutEffect as c, useMemo as l, useRef as u, useState as d } from "react";
import { Fragment as f, jsx as p, jsxs as m } from "react/jsx-runtime";
import * as h from "react-dom";
import g, { createPortal as _ } from "react-dom";
//#region \0rolldown/runtime.js
var v = Object.defineProperty, y = (e, t) => {
	let n = {};
	for (var r in e) v(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || v(n, Symbol.toStringTag, { value: "Module" }), n;
};
//#endregion
//#region node_modules/clsx/dist/clsx.mjs
function b(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var i = e.length;
		for (t = 0; t < i; t++) e[t] && (n = b(e[t])) && (r && (r += " "), r += n);
	} else for (n in e) e[n] && (r && (r += " "), r += n);
	return r;
}
function x() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = b(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region src/utils/cn.ts
function S(...e) {
	return x(e);
}
//#endregion
//#region node_modules/class-variance-authority/dist/index.mjs
var C = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, w = x, T = (e, t) => (n) => {
	if (t?.variants == null) return w(e, n?.class, n?.className);
	let { variants: r, defaultVariants: i } = t, a = Object.keys(r).map((e) => {
		let t = n?.[e], a = i?.[e];
		if (t === null) return null;
		let o = C(t) || C(a);
		return r[e][o];
	}), o = n && Object.entries(n).reduce((e, t) => {
		let [n, r] = t;
		return r === void 0 || (e[n] = r), e;
	}, {});
	return w(e, a, t?.compoundVariants?.reduce((e, t) => {
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
}, E = {
	base: "_base_7jhg3_1",
	h1: "_h1_7jhg3_13",
	h2: "_h2_7jhg3_22",
	h3: "_h3_7jhg3_35",
	h4: "_h4_7jhg3_48",
	p: "_p_7jhg3_60"
}, D = T(E.base, {
	variants: { variant: {
		h1: E.h1,
		h2: E.h2,
		h3: E.h3,
		h4: E.h4,
		p: E.p
	} },
	defaultVariants: { variant: "p" }
}), O = i(({ className: e, variant: t, as: n, ...r }, i) => /* @__PURE__ */ p(n || t || "p", {
	ref: i,
	className: S(D({
		variant: t,
		className: e
	})),
	...r
}));
O.displayName = "Typography";
var k = {
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
}, A = T(k.base, {
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
			className: k.primaria_solid
		},
		{
			intent: "primaria",
			variant: "outline",
			className: k.primaria_outline
		},
		{
			intent: "primaria",
			variant: "ghost",
			className: k.primaria_ghost
		},
		{
			intent: "secundaria",
			variant: "solid",
			className: k.secundaria_solid
		},
		{
			intent: "secundaria",
			variant: "outline",
			className: k.secundaria_outline
		},
		{
			intent: "secundaria",
			variant: "ghost",
			className: k.secundaria_ghost
		},
		{
			intent: "alerta",
			variant: "solid",
			className: k.alerta_solid
		},
		{
			intent: "alerta",
			variant: "outline",
			className: k.alerta_outline
		},
		{
			intent: "alerta",
			variant: "ghost",
			className: k.alerta_ghost
		},
		{
			intent: "erro",
			variant: "solid",
			className: k.erro_solid
		},
		{
			intent: "erro",
			variant: "outline",
			className: k.erro_outline
		},
		{
			intent: "erro",
			variant: "ghost",
			className: k.erro_ghost
		},
		{
			intent: "neutro",
			variant: "solid",
			className: k.neutro_solid
		},
		{
			intent: "neutro",
			variant: "outline",
			className: k.neutro_outline
		},
		{
			intent: "neutro",
			variant: "ghost",
			className: k.neutro_ghost
		}
	],
	defaultVariants: {
		intent: "primaria",
		variant: "solid"
	}
}), j = i(({ className: e, intent: t, variant: n, ...r }, i) => /* @__PURE__ */ p("div", {
	ref: i,
	className: S(A({
		intent: t,
		variant: n
	}), e),
	...r
}));
j.displayName = "Badge";
var M = {
	container: "_container_3u6a6_1",
	sm: "_sm_3u6a6_35",
	md: "_md_3u6a6_47",
	lg: "_lg_3u6a6_59",
	image: "_image_3u6a6_71",
	initials: "_initials_3u6a6_85"
}, N = i(({ className: e, src: t, alt: n, initials: r, size: i = "md", ...a }, o) => {
	let [s, c] = d(!1), l = !t || s;
	return /* @__PURE__ */ p("div", {
		ref: o,
		className: S(M.container, M[i], e),
		...a,
		children: l ? /* @__PURE__ */ p("span", {
			className: M.initials,
			children: r?.substring(0, 2)
		}) : /* @__PURE__ */ p("img", {
			src: t,
			alt: n || "Avatar",
			className: M.image,
			onError: () => c(!0)
		})
	});
});
N.displayName = "Avatar";
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils.js
var P = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), F = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), I = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, L = i(({ color: e = "currentColor", size: t = 24, strokeWidth: n = 2, absoluteStrokeWidth: i, className: a = "", children: o, iconNode: s, ...c }, l) => r("svg", {
	ref: l,
	...I,
	width: t,
	height: t,
	stroke: e,
	strokeWidth: i ? Number(n) * 24 / Number(t) : n,
	className: F("lucide", a),
	...c
}, [...s.map(([e, t]) => r(e, t)), ...Array.isArray(o) ? o : [o]])), R = (e, t) => {
	let n = i(({ className: n, ...i }, a) => r(L, {
		ref: a,
		iconNode: t,
		className: F(`lucide-${P(e)}`, n),
		...i
	}));
	return n.displayName = `${e}`, n;
}, z = R("ArrowUpDown", [
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
]), ee = R("ArrowUpRight", [["path", {
	d: "M7 7h10v10",
	key: "1tivn9"
}], ["path", {
	d: "M7 17 17 7",
	key: "1vkiza"
}]]), te = R("BellRing", [
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
]), ne = R("Bell", [["path", {
	d: "M10.268 21a2 2 0 0 0 3.464 0",
	key: "vwvbt9"
}], ["path", {
	d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
	key: "11g9vi"
}]]), re = R("BookOpenText", [
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
]), ie = R("Bug", [
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
]), ae = R("CalendarCheck", [
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
]), B = R("Calendar", [
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
]), oe = R("ChartPie", [["path", {
	d: "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",
	key: "pzmjnu"
}], ["path", {
	d: "M21.21 15.89A10 10 0 1 1 8 2.83",
	key: "k2fpak"
}]]), se = R("Check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]), ce = R("ChevronDown", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]), V = R("ChevronLeft", [["path", {
	d: "m15 18-6-6 6-6",
	key: "1wnfg3"
}]]), le = R("ChevronRight", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]), ue = R("ChevronsUpDown", [["path", {
	d: "m7 15 5 5 5-5",
	key: "1hf1tw"
}], ["path", {
	d: "m7 9 5-5 5 5",
	key: "sgt6xg"
}]]), de = R("CircleCheck", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), fe = R("Circle", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}]]), pe = R("Clock", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["polyline", {
	points: "12 6 12 12 16 14",
	key: "68esgv"
}]]), me = R("CloudUpload", [
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
]), he = R("Copy", [["rect", {
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
}]]), ge = R("Crosshair", [
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
]), _e = R("Database", [
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
]), ve = R("Ellipsis", [
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
]), ye = R("EyeOff", [
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
]), be = R("File", [["path", {
	d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
	key: "1rqfz7"
}], ["path", {
	d: "M14 2v4a2 2 0 0 0 2 2h4",
	key: "tnqrlb"
}]]), xe = R("Hash", [
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
]), Se = R("Landmark", [
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
]), Ce = R("LayoutDashboard", [
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
]), we = R("ListTodo", [
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
]), Te = R("LoaderCircle", [["path", {
	d: "M21 12a9 9 0 1 1-6.219-8.56",
	key: "13zald"
}]]), Ee = R("LogOut", [
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
]), De = R("Menu", [
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
]), Oe = R("MoveUpRight", [["path", {
	d: "M13 5H19V11",
	key: "1n1gyv"
}], ["path", {
	d: "M19 5L5 19",
	key: "72u4yj"
}]]), ke = R("Pencil", [["path", {
	d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
	key: "1a8usu"
}], ["path", {
	d: "m15 5 4 4",
	key: "1mk7zo"
}]]), Ae = R("Plus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "M12 5v14",
	key: "s699le"
}]]), je = R("Search", [["circle", {
	cx: "11",
	cy: "11",
	r: "8",
	key: "4ej97u"
}], ["path", {
	d: "m21 21-4.3-4.3",
	key: "1qie3q"
}]]), Me = R("Send", [["path", {
	d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
	key: "1ffxy3"
}], ["path", {
	d: "m21.854 2.147-10.94 10.939",
	key: "12cjpa"
}]]), Ne = R("Square", [["rect", {
	width: "18",
	height: "18",
	x: "3",
	y: "3",
	rx: "2",
	key: "afitv7"
}]]), Pe = R("Table2", [["path", {
	d: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
	key: "gugj83"
}]]), Fe = R("Trash2", [
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
]), Ie = R("Undo2", [["path", {
	d: "M9 14 4 9l5-5",
	key: "102s5s"
}], ["path", {
	d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",
	key: "f3b9sd"
}]]), Le = R("UserCog", [
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
]), Re = R("User", [["path", {
	d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
	key: "975kel"
}], ["circle", {
	cx: "12",
	cy: "7",
	r: "4",
	key: "17ys0d"
}]]), ze = R("Users", [
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
]), Be = R("Wallet", [["path", {
	d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
	key: "18etb6"
}], ["path", {
	d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",
	key: "xoc0q4"
}]]), Ve = R("X", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]), He = {
	spinner: "_spinner_x955q_1",
	spin: "_spin_x955q_1",
	sm: "_sm_x955q_11",
	md: "_md_x955q_23",
	lg: "_lg_x955q_35",
	xl: "_xl_x955q_47"
}, Ue = {
	skeleton: "_skeleton_1mj2p_1",
	pulse: "_pulse_1mj2p_1"
}, We = e.forwardRef(({ className: e, size: t = "md", ...n }, r) => /* @__PURE__ */ p(Te, {
	ref: r,
	className: S(He.spinner, He[t], e),
	...n
}));
We.displayName = "Spinner";
var Ge = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p("div", {
	ref: n,
	className: S(Ue.skeleton, e),
	...t
}));
Ge.displayName = "Skeleton";
var Ke = {
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
}, qe = T(Ke.buttonBase, {
	variants: {
		intent: {
			primaria: Ke.primaria,
			secundaria: Ke.secundaria,
			alerta: Ke.alerta,
			erro: Ke.erro
		},
		variant: {
			solid: "",
			outline: Ke.outline,
			ghost: Ke.ghost
		},
		size: {
			sm: Ke.sm,
			md: Ke.md,
			lg: Ke.lg
		}
	},
	defaultVariants: {
		intent: "primaria",
		variant: "solid",
		size: "md"
	}
}), Je = i(({ className: e, intent: t, variant: n, size: r, leftIcon: i, rightIcon: a, children: o, disabled: s, isLoading: c, ...l }, u) => /* @__PURE__ */ m("button", {
	className: x(qe({
		intent: t,
		variant: n,
		size: r
	}), e),
	ref: u,
	disabled: s || c,
	"aria-disabled": s || c,
	...l,
	children: [
		c && /* @__PURE__ */ p(Te, {
			className: Ke.animateSpin,
			"aria-hidden": "true"
		}),
		!c && i && /* @__PURE__ */ p(i, { "aria-hidden": "true" }),
		o,
		!c && a && /* @__PURE__ */ p(a, { "aria-hidden": "true" })
	]
}));
Je.displayName = "Button";
var Ye = {
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
}, Xe = T(Ye.inputBase, {
	variants: {
		hasError: {
			true: Ye.hasError,
			false: ""
		},
		hasIcon: {
			true: Ye.withIcon,
			false: ""
		}
	},
	defaultVariants: {
		hasError: !1,
		hasIcon: !1
	}
}), Ze = i(({ className: e, label: t, error: n, leftIcon: r, id: i, ...a }, o) => {
	let s = i || (t ? `input-${t.replace(/\s+/g, "-").toLowerCase()}` : void 0), c = !!n;
	return /* @__PURE__ */ m("div", {
		className: S(Ye.container, e),
		children: [
			t && /* @__PURE__ */ p("label", {
				htmlFor: s,
				className: Ye.label,
				children: t
			}),
			/* @__PURE__ */ m("div", {
				className: Ye.relativeWrapper,
				children: [r && /* @__PURE__ */ p(r, {
					className: S(Ye.icon, c ? Ye.iconError : Ye.iconDefault),
					"aria-hidden": "true"
				}), /* @__PURE__ */ p("input", {
					id: s,
					ref: o,
					className: S(Xe({
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
				className: Ye.errorMessage,
				children: n
			})
		]
	});
});
Ze.displayName = "TextField";
var Qe = {
	container: "_container_1o5ti_1",
	disabled: "_disabled_1o5ti_23",
	hiddenInput: "_hiddenInput_1o5ti_35",
	visualBox: "_visualBox_1o5ti_61",
	label: "_label_1o5ti_119",
	iconWrapper: "_iconWrapper_1o5ti_137"
}, $e = i(({ className: e, label: t, id: n, disabled: r, ...i }, a) => {
	let o = n || (t ? `checkbox-${t.replace(/\s+/g, "-").toLowerCase()}` : void 0);
	return /* @__PURE__ */ m("label", {
		htmlFor: o,
		className: S(Qe.container, r && Qe.disabled),
		children: [/* @__PURE__ */ m("div", {
			className: Qe.iconWrapper,
			children: [/* @__PURE__ */ p("input", {
				type: "checkbox",
				id: o,
				ref: a,
				disabled: r,
				className: Qe.hiddenInput,
				...i
			}), /* @__PURE__ */ p("div", {
				className: S(Qe.visualBox, e),
				"aria-hidden": "true",
				children: /* @__PURE__ */ p(se, {
					size: 12,
					strokeWidth: 4,
					color: "currentColor"
				})
			})]
		}), t && /* @__PURE__ */ p("span", {
			className: Qe.label,
			children: t
		})]
	});
});
$e.displayName = "Checkbox", typeof window < "u" && window.document && window.document.createElement;
function H(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
	return function(r) {
		if (e?.(r), n === !1 || !r.defaultPrevented) return t?.(r);
	};
}
//#endregion
//#region node_modules/@radix-ui/react-compose-refs/dist/index.mjs
function et(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function tt(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = et(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : et(e[t], null);
			}
		};
	};
}
function U(...t) {
	return e.useCallback(tt(...t), t);
}
//#endregion
//#region node_modules/@radix-ui/react-context/dist/index.mjs
function nt(t, n) {
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
function rt(t, n = []) {
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
	return a.scopeName = t, [i, it(a, ...n)];
}
function it(...t) {
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
function at(t) {
	let n = /* @__PURE__ */ ot(t), r = e.forwardRef((t, r) => {
		let { children: i, ...a } = t, o = e.Children.toArray(i), s = o.find(lt);
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
function ot(t) {
	let n = e.forwardRef((t, n) => {
		let { children: r, ...i } = t;
		if (e.isValidElement(r)) {
			let t = dt(r), a = ut(i, r.props);
			return r.type !== e.Fragment && (a.ref = n ? tt(n, t) : t), e.cloneElement(r, a);
		}
		return e.Children.count(r) > 1 ? e.Children.only(null) : null;
	});
	return n.displayName = `${t}.SlotClone`, n;
}
var st = Symbol("radix.slottable");
/* @__NO_SIDE_EFFECTS__ */
function ct(e) {
	let t = ({ children: e }) => /* @__PURE__ */ p(f, { children: e });
	return t.displayName = `${e}.Slottable`, t.__radixId = st, t;
}
function lt(t) {
	return e.isValidElement(t) && typeof t.type == "function" && "__radixId" in t.type && t.type.__radixId === st;
}
function ut(e, t) {
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
function dt(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-primitive/dist/index.mjs
var W = [
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
	let r = /* @__PURE__ */ at(`Primitive.${n}`), i = e.forwardRef((e, t) => {
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
function ft(e, t) {
	e && h.flushSync(() => e.dispatchEvent(t));
}
//#endregion
//#region node_modules/@radix-ui/react-collection/dist/index.mjs
function pt(e) {
	let n = e + "CollectionProvider", [r, i] = rt(n), [a, o] = r(n, {
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
	let c = e + "CollectionSlot", l = /* @__PURE__ */ at(c), u = t.forwardRef((e, t) => {
		let { scope: n, children: r } = e;
		return /* @__PURE__ */ p(l, {
			ref: U(t, o(c, n).collectionRef),
			children: r
		});
	});
	u.displayName = c;
	let d = e + "CollectionItemSlot", f = "data-radix-collection-item", m = /* @__PURE__ */ at(d), h = t.forwardRef((e, n) => {
		let { scope: r, children: i, ...a } = e, s = t.useRef(null), c = U(n, s), l = o(d, r);
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
var mt = globalThis?.document ? e.useLayoutEffect : () => {}, ht = e.useId || (() => void 0), gt = 0;
function _t(t) {
	let [n, r] = e.useState(ht());
	return mt(() => {
		t || r((e) => e ?? String(gt++));
	}, [t]), t || (n ? `radix-${n}` : "");
}
//#endregion
//#region node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
function vt(t) {
	let n = e.useRef(t);
	return e.useEffect(() => {
		n.current = t;
	}), e.useMemo(() => (...e) => n.current?.(...e), []);
}
//#endregion
//#region node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var yt = e.useInsertionEffect || mt;
function bt({ prop: t, defaultProp: n, onChange: r = () => {}, caller: i }) {
	let [a, o, s] = xt({
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
			let n = St(e) ? e(t) : e;
			n !== t && s.current?.(n);
		} else o(e);
	}, [
		c,
		t,
		o,
		s
	])];
}
function xt({ defaultProp: t, onChange: n }) {
	let [r, i] = e.useState(t), a = e.useRef(r), o = e.useRef(n);
	return yt(() => {
		o.current = n;
	}, [n]), e.useEffect(() => {
		a.current !== r && (o.current?.(r), a.current = r);
	}, [r, a]), [
		r,
		i,
		o
	];
}
function St(e) {
	return typeof e == "function";
}
//#endregion
//#region node_modules/@radix-ui/react-direction/dist/index.mjs
var Ct = e.createContext(void 0);
function wt(t) {
	let n = e.useContext(Ct);
	return t || n || "ltr";
}
//#endregion
//#region node_modules/@radix-ui/react-roving-focus/dist/index.mjs
var Tt = "rovingFocusGroup.onEntryFocus", Et = {
	bubbles: !1,
	cancelable: !0
}, Dt = "RovingFocusGroup", [Ot, kt, At] = pt(Dt), [jt, Mt] = rt(Dt, [At]), [Nt, Pt] = jt(Dt), Ft = e.forwardRef((e, t) => /* @__PURE__ */ p(Ot.Provider, {
	scope: e.__scopeRovingFocusGroup,
	children: /* @__PURE__ */ p(Ot.Slot, {
		scope: e.__scopeRovingFocusGroup,
		children: /* @__PURE__ */ p(It, {
			...e,
			ref: t
		})
	})
}));
Ft.displayName = Dt;
var It = e.forwardRef((t, n) => {
	let { __scopeRovingFocusGroup: r, orientation: i, loop: a = !1, dir: o, currentTabStopId: s, defaultCurrentTabStopId: c, onCurrentTabStopIdChange: l, onEntryFocus: u, preventScrollOnEntryFocus: d = !1, ...f } = t, m = e.useRef(null), h = U(n, m), g = wt(o), [_, v] = bt({
		prop: s,
		defaultProp: c ?? null,
		onChange: l,
		caller: Dt
	}), [y, b] = e.useState(!1), x = vt(u), S = kt(r), C = e.useRef(!1), [w, T] = e.useState(0);
	return e.useEffect(() => {
		let e = m.current;
		if (e) return e.addEventListener(Tt, x), () => e.removeEventListener(Tt, x);
	}, [x]), /* @__PURE__ */ p(Nt, {
		scope: r,
		orientation: i,
		dir: g,
		loop: a,
		currentTabStopId: _,
		onItemFocus: e.useCallback((e) => v(e), [v]),
		onItemShiftTab: e.useCallback(() => b(!0), []),
		onFocusableItemAdd: e.useCallback(() => T((e) => e + 1), []),
		onFocusableItemRemove: e.useCallback(() => T((e) => e - 1), []),
		children: /* @__PURE__ */ p(W.div, {
			tabIndex: y || w === 0 ? -1 : 0,
			"data-orientation": i,
			...f,
			ref: h,
			style: {
				outline: "none",
				...t.style
			},
			onMouseDown: H(t.onMouseDown, () => {
				C.current = !0;
			}),
			onFocus: H(t.onFocus, (e) => {
				let t = !C.current;
				if (e.target === e.currentTarget && t && !y) {
					let t = new CustomEvent(Tt, Et);
					if (e.currentTarget.dispatchEvent(t), !t.defaultPrevented) {
						let e = S().filter((e) => e.focusable);
						Ht([
							e.find((e) => e.active),
							e.find((e) => e.id === _),
							...e
						].filter(Boolean).map((e) => e.ref.current), d);
					}
				}
				C.current = !1;
			}),
			onBlur: H(t.onBlur, () => b(!1))
		})
	});
}), Lt = "RovingFocusGroupItem", Rt = e.forwardRef((t, n) => {
	let { __scopeRovingFocusGroup: r, focusable: i = !0, active: a = !1, tabStopId: o, children: s, ...c } = t, l = _t(), u = o || l, d = Pt(Lt, r), f = d.currentTabStopId === u, m = kt(r), { onFocusableItemAdd: h, onFocusableItemRemove: g, currentTabStopId: _ } = d;
	return e.useEffect(() => {
		if (i) return h(), () => g();
	}, [
		i,
		h,
		g
	]), /* @__PURE__ */ p(Ot.ItemSlot, {
		scope: r,
		id: u,
		focusable: i,
		active: a,
		children: /* @__PURE__ */ p(W.span, {
			tabIndex: f ? 0 : -1,
			"data-orientation": d.orientation,
			...c,
			ref: n,
			onMouseDown: H(t.onMouseDown, (e) => {
				i ? d.onItemFocus(u) : e.preventDefault();
			}),
			onFocus: H(t.onFocus, () => d.onItemFocus(u)),
			onKeyDown: H(t.onKeyDown, (e) => {
				if (e.key === "Tab" && e.shiftKey) {
					d.onItemShiftTab();
					return;
				}
				if (e.target !== e.currentTarget) return;
				let t = Vt(e, d.orientation, d.dir);
				if (t !== void 0) {
					if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
					e.preventDefault();
					let n = m().filter((e) => e.focusable).map((e) => e.ref.current);
					if (t === "last") n.reverse();
					else if (t === "prev" || t === "next") {
						t === "prev" && n.reverse();
						let r = n.indexOf(e.currentTarget);
						n = d.loop ? Ut(n, r + 1) : n.slice(r + 1);
					}
					setTimeout(() => Ht(n));
				}
			}),
			children: typeof s == "function" ? s({
				isCurrentTabStop: f,
				hasTabStop: _ != null
			}) : s
		})
	});
});
Rt.displayName = Lt;
var zt = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function Bt(e, t) {
	return t === "rtl" ? e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e : e;
}
function Vt(e, t, n) {
	let r = Bt(e.key, n);
	if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r))) return zt[r];
}
function Ht(e, t = !1) {
	let n = document.activeElement;
	for (let r of e) if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function Ut(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
var Wt = Ft, Gt = Rt;
//#endregion
//#region node_modules/@radix-ui/react-use-size/dist/index.mjs
function Kt(t) {
	let [n, r] = e.useState(void 0);
	return mt(() => {
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
function qt(t) {
	let n = e.useRef({
		value: t,
		previous: t
	});
	return e.useMemo(() => (n.current.value !== t && (n.current.previous = n.current.value, n.current.value = t), n.current.previous), [t]);
}
//#endregion
//#region node_modules/@radix-ui/react-presence/dist/index.mjs
function Jt(t, n) {
	return e.useReducer((e, t) => n[e][t] ?? e, t);
}
var Yt = (t) => {
	let { present: n, children: r } = t, i = Xt(n), a = typeof r == "function" ? r({ present: i.isPresent }) : e.Children.only(r), o = U(i.ref, Qt(a));
	return typeof r == "function" || i.isPresent ? e.cloneElement(a, { ref: o }) : null;
};
Yt.displayName = "Presence";
function Xt(t) {
	let [n, r] = e.useState(), i = e.useRef(null), a = e.useRef(t), o = e.useRef("none"), [s, c] = Jt(t ? "mounted" : "unmounted", {
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
		let e = Zt(i.current);
		o.current = s === "mounted" ? e : "none";
	}, [s]), mt(() => {
		let e = i.current, n = a.current;
		if (n !== t) {
			let r = o.current, i = Zt(e);
			t ? c("MOUNT") : i === "none" || e?.display === "none" ? c("UNMOUNT") : c(n && r !== i ? "ANIMATION_OUT" : "UNMOUNT"), a.current = t;
		}
	}, [t, c]), mt(() => {
		if (n) {
			let e, t = n.ownerDocument.defaultView ?? window, r = (r) => {
				let o = Zt(i.current).includes(CSS.escape(r.animationName));
				if (r.target === n && o && (c("ANIMATION_END"), !a.current)) {
					let r = n.style.animationFillMode;
					n.style.animationFillMode = "forwards", e = t.setTimeout(() => {
						n.style.animationFillMode === "forwards" && (n.style.animationFillMode = r);
					});
				}
			}, s = (e) => {
				e.target === n && (o.current = Zt(i.current));
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
function Zt(e) {
	return e?.animationName || "none";
}
function Qt(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-radio-group/dist/index.mjs
var $t = "Radio", [en, tn] = rt($t), [nn, rn] = en($t), an = e.forwardRef((t, n) => {
	let { __scopeRadio: r, name: i, checked: a = !1, required: o, disabled: s, value: c = "on", onCheck: l, form: u, ...d } = t, [f, h] = e.useState(null), g = U(n, (e) => h(e)), _ = e.useRef(!1), v = f ? u || !!f.closest("form") : !0;
	return /* @__PURE__ */ m(nn, {
		scope: r,
		checked: a,
		disabled: s,
		children: [/* @__PURE__ */ p(W.button, {
			type: "button",
			role: "radio",
			"aria-checked": a,
			"data-state": un(a),
			"data-disabled": s ? "" : void 0,
			disabled: s,
			value: c,
			...d,
			ref: g,
			onClick: H(t.onClick, (e) => {
				a || l?.(), v && (_.current = e.isPropagationStopped(), _.current || e.stopPropagation());
			})
		}), v && /* @__PURE__ */ p(ln, {
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
an.displayName = $t;
var on = "RadioIndicator", sn = e.forwardRef((e, t) => {
	let { __scopeRadio: n, forceMount: r, ...i } = e, a = rn(on, n);
	return /* @__PURE__ */ p(Yt, {
		present: r || a.checked,
		children: /* @__PURE__ */ p(W.span, {
			"data-state": un(a.checked),
			"data-disabled": a.disabled ? "" : void 0,
			...i,
			ref: t
		})
	});
});
sn.displayName = on;
var cn = "RadioBubbleInput", ln = e.forwardRef(({ __scopeRadio: t, control: n, checked: r, bubbles: i = !0, ...a }, o) => {
	let s = e.useRef(null), c = U(s, o), l = qt(r), u = Kt(n);
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
	]), /* @__PURE__ */ p(W.input, {
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
ln.displayName = cn;
function un(e) {
	return e ? "checked" : "unchecked";
}
var dn = [
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight"
], fn = "RadioGroup", [pn, mn] = rt(fn, [Mt, tn]), hn = Mt(), gn = tn(), [_n, vn] = pn(fn), yn = e.forwardRef((e, t) => {
	let { __scopeRadioGroup: n, name: r, defaultValue: i, value: a, required: o = !1, disabled: s = !1, orientation: c, dir: l, loop: u = !0, onValueChange: d, ...f } = e, m = hn(n), h = wt(l), [g, _] = bt({
		prop: a,
		defaultProp: i ?? null,
		onChange: d,
		caller: fn
	});
	return /* @__PURE__ */ p(_n, {
		scope: n,
		name: r,
		required: o,
		disabled: s,
		value: g,
		onValueChange: _,
		children: /* @__PURE__ */ p(Wt, {
			asChild: !0,
			...m,
			orientation: c,
			dir: h,
			loop: u,
			children: /* @__PURE__ */ p(W.div, {
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
yn.displayName = fn;
var bn = "RadioGroupItem", xn = e.forwardRef((t, n) => {
	let { __scopeRadioGroup: r, disabled: i, ...a } = t, o = vn(bn, r), s = o.disabled || i, c = hn(r), l = gn(r), u = e.useRef(null), d = U(n, u), f = o.value === a.value, m = e.useRef(!1);
	return e.useEffect(() => {
		let e = (e) => {
			dn.includes(e.key) && (m.current = !0);
		}, t = () => m.current = !1;
		return document.addEventListener("keydown", e), document.addEventListener("keyup", t), () => {
			document.removeEventListener("keydown", e), document.removeEventListener("keyup", t);
		};
	}, []), /* @__PURE__ */ p(Gt, {
		asChild: !0,
		...c,
		focusable: !s,
		active: f,
		children: /* @__PURE__ */ p(an, {
			disabled: s,
			required: o.required,
			checked: f,
			...l,
			...a,
			name: o.name,
			ref: d,
			onCheck: () => o.onValueChange(a.value),
			onKeyDown: H((e) => {
				e.key === "Enter" && e.preventDefault();
			}),
			onFocus: H(a.onFocus, () => {
				m.current && u.current?.click();
			})
		})
	});
});
xn.displayName = bn;
var Sn = "RadioGroupIndicator", Cn = e.forwardRef((e, t) => {
	let { __scopeRadioGroup: n, ...r } = e;
	return /* @__PURE__ */ p(sn, {
		...gn(n),
		...r,
		ref: t
	});
});
Cn.displayName = Sn;
var wn = yn, Tn = xn, En = Cn, Dn = {
	root: "_root_brp5y_1",
	itemWrapper: "_itemWrapper_brp5y_13",
	radioItem: "_radioItem_brp5y_27",
	indicator: "_indicator_brp5y_89",
	icon: "_icon_brp5y_105",
	label: "_label_brp5y_119",
	labelText: "_labelText_brp5y_139",
	labelTextDisabled: "_labelTextDisabled_brp5y_151"
}, On = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p(wn, {
	className: S(Dn.root, e),
	...t,
	ref: n
}));
On.displayName = wn.displayName;
var kn = e.forwardRef(({ className: t, label: n, id: r, ...i }, a) => {
	let o = e.useId(), s = r || o;
	return /* @__PURE__ */ m("div", {
		className: Dn.itemWrapper,
		children: [/* @__PURE__ */ p(Tn, {
			ref: a,
			id: s,
			className: S(Dn.radioItem, t),
			...i,
			children: /* @__PURE__ */ p(En, {
				className: Dn.indicator,
				children: /* @__PURE__ */ p(fe, { className: Dn.icon })
			})
		}), n && /* @__PURE__ */ p("label", {
			htmlFor: s,
			className: Dn.label,
			children: /* @__PURE__ */ p(O, {
				as: "span",
				variant: "p",
				className: S(Dn.labelText, i.disabled && Dn.labelTextDisabled),
				style: { color: "var(--color-secundaria)" },
				children: n
			})
		})]
	});
});
kn.displayName = "RadioItem";
//#endregion
//#region node_modules/@radix-ui/number/dist/index.mjs
function An(e, [t, n]) {
	return Math.min(n, Math.max(t, e));
}
//#endregion
//#region node_modules/@radix-ui/react-slider/dist/index.mjs
var jn = ["PageUp", "PageDown"], Mn = [
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight"
], Nn = {
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
}, Pn = "Slider", [Fn, In, Ln] = pt(Pn), [Rn, zn] = rt(Pn, [Ln]), [Bn, Vn] = Rn(Pn), Hn = e.forwardRef((t, n) => {
	let { name: r, min: i = 0, max: a = 100, step: o = 1, orientation: s = "horizontal", disabled: c = !1, minStepsBetweenThumbs: l = 0, defaultValue: u = [i], value: d, onValueChange: f = () => {}, onValueCommit: m = () => {}, inverted: h = !1, form: g, ..._ } = t, v = e.useRef(/* @__PURE__ */ new Set()), y = e.useRef(0), b = s === "horizontal" ? Gn : Kn, [x = [], S] = bt({
		prop: d,
		defaultProp: u,
		onChange: (e) => {
			[...v.current][y.current]?.focus(), f(e);
		}
	}), C = e.useRef(x);
	function w(e) {
		D(e, or(x, e));
	}
	function T(e) {
		D(e, y.current);
	}
	function E() {
		let e = C.current[y.current];
		x[y.current] !== e && m(x);
	}
	function D(e, t, { commit: n } = { commit: !1 }) {
		let r = dr(o), s = An(fr(Math.round((e - i) / o) * o + i, r), [i, a]);
		S((e = []) => {
			let r = rr(e, s, t);
			if (lr(r, l * o)) {
				y.current = r.indexOf(s);
				let t = String(r) !== String(e);
				return t && n && m(r), t ? r : e;
			} else return e;
		});
	}
	return /* @__PURE__ */ p(Bn, {
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
		children: /* @__PURE__ */ p(Fn.Provider, {
			scope: t.__scopeSlider,
			children: /* @__PURE__ */ p(Fn.Slot, {
				scope: t.__scopeSlider,
				children: /* @__PURE__ */ p(b, {
					"aria-disabled": c,
					"data-disabled": c ? "" : void 0,
					..._,
					ref: n,
					onPointerDown: H(_.onPointerDown, () => {
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
							let n = jn.includes(e.key) || e.shiftKey && Mn.includes(e.key) ? 10 : 1, r = y.current, i = x[r];
							D(i + o * n * t, r, { commit: !0 });
						}
					}
				})
			})
		})
	});
});
Hn.displayName = Pn;
var [Un, Wn] = Rn(Pn, {
	startEdge: "left",
	endEdge: "right",
	size: "width",
	direction: 1
}), Gn = e.forwardRef((t, n) => {
	let { min: r, max: i, dir: a, inverted: o, onSlideStart: s, onSlideMove: c, onSlideEnd: l, onStepKeyDown: u, ...d } = t, [f, m] = e.useState(null), h = U(n, (e) => m(e)), g = e.useRef(void 0), _ = wt(a), v = _ === "ltr", y = v && !o || !v && o;
	function b(e) {
		let t = g.current || f.getBoundingClientRect(), n = ur([0, t.width], y ? [r, i] : [i, r]);
		return g.current = t, n(e - t.left);
	}
	return /* @__PURE__ */ p(Un, {
		scope: t.__scopeSlider,
		startEdge: y ? "left" : "right",
		endEdge: y ? "right" : "left",
		direction: y ? 1 : -1,
		size: "width",
		children: /* @__PURE__ */ p(qn, {
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
				let t = Nn[y ? "from-left" : "from-right"].includes(e.key);
				u?.({
					event: e,
					direction: t ? -1 : 1
				});
			}
		})
	});
}), Kn = e.forwardRef((t, n) => {
	let { min: r, max: i, inverted: a, onSlideStart: o, onSlideMove: s, onSlideEnd: c, onStepKeyDown: l, ...u } = t, d = e.useRef(null), f = U(n, d), m = e.useRef(void 0), h = !a;
	function g(e) {
		let t = m.current || d.current.getBoundingClientRect(), n = ur([0, t.height], h ? [i, r] : [r, i]);
		return m.current = t, n(e - t.top);
	}
	return /* @__PURE__ */ p(Un, {
		scope: t.__scopeSlider,
		startEdge: h ? "bottom" : "top",
		endEdge: h ? "top" : "bottom",
		size: "height",
		direction: h ? 1 : -1,
		children: /* @__PURE__ */ p(qn, {
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
				let t = Nn[h ? "from-bottom" : "from-top"].includes(e.key);
				l?.({
					event: e,
					direction: t ? -1 : 1
				});
			}
		})
	});
}), qn = e.forwardRef((e, t) => {
	let { __scopeSlider: n, onSlideStart: r, onSlideMove: i, onSlideEnd: a, onHomeKeyDown: o, onEndKeyDown: s, onStepKeyDown: c, ...l } = e, u = Vn(Pn, n);
	return /* @__PURE__ */ p(W.span, {
		...l,
		ref: t,
		onKeyDown: H(e.onKeyDown, (e) => {
			e.key === "Home" ? (o(e), e.preventDefault()) : e.key === "End" ? (s(e), e.preventDefault()) : jn.concat(Mn).includes(e.key) && (c(e), e.preventDefault());
		}),
		onPointerDown: H(e.onPointerDown, (e) => {
			let t = e.target;
			t.setPointerCapture(e.pointerId), e.preventDefault(), u.thumbs.has(t) ? t.focus() : r(e);
		}),
		onPointerMove: H(e.onPointerMove, (e) => {
			e.target.hasPointerCapture(e.pointerId) && i(e);
		}),
		onPointerUp: H(e.onPointerUp, (e) => {
			let t = e.target;
			t.hasPointerCapture(e.pointerId) && (t.releasePointerCapture(e.pointerId), a(e));
		})
	});
}), Jn = "SliderTrack", Yn = e.forwardRef((e, t) => {
	let { __scopeSlider: n, ...r } = e, i = Vn(Jn, n);
	return /* @__PURE__ */ p(W.span, {
		"data-disabled": i.disabled ? "" : void 0,
		"data-orientation": i.orientation,
		...r,
		ref: t
	});
});
Yn.displayName = Jn;
var Xn = "SliderRange", Zn = e.forwardRef((t, n) => {
	let { __scopeSlider: r, ...i } = t, a = Vn(Xn, r), o = Wn(Xn, r), s = U(n, e.useRef(null)), c = a.values.length, l = a.values.map((e) => ir(e, a.min, a.max)), u = c > 1 ? Math.min(...l) : 0, d = 100 - Math.max(...l);
	return /* @__PURE__ */ p(W.span, {
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
Zn.displayName = Xn;
var Qn = "SliderThumb", $n = e.forwardRef((t, n) => {
	let r = In(t.__scopeSlider), [i, a] = e.useState(null), o = U(n, (e) => a(e)), s = e.useMemo(() => i ? r().findIndex((e) => e.ref.current === i) : -1, [r, i]);
	return /* @__PURE__ */ p(er, {
		...t,
		ref: o,
		index: s
	});
}), er = e.forwardRef((t, n) => {
	let { __scopeSlider: r, index: i, name: a, ...o } = t, s = Vn(Qn, r), c = Wn(Qn, r), [l, u] = e.useState(null), d = U(n, (e) => u(e)), f = l ? s.form || !!l.closest("form") : !0, h = Kt(l), g = s.values[i], _ = g === void 0 ? 0 : ir(g, s.min, s.max), v = ar(i, s.values.length), y = h?.[c.size], b = y ? sr(y, _, c.direction) : 0;
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
		children: [/* @__PURE__ */ p(Fn.ItemSlot, {
			scope: t.__scopeSlider,
			children: /* @__PURE__ */ p(W.span, {
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
				onFocus: H(t.onFocus, () => {
					s.valueIndexToChangeRef.current = i;
				})
			})
		}), f && /* @__PURE__ */ p(nr, {
			name: a ?? (s.name ? s.name + (s.values.length > 1 ? "[]" : "") : void 0),
			form: s.form,
			value: g
		}, i)]
	});
});
$n.displayName = Qn;
var tr = "RadioBubbleInput", nr = e.forwardRef(({ __scopeSlider: t, value: n, ...r }, i) => {
	let a = e.useRef(null), o = U(a, i), s = qt(n);
	return e.useEffect(() => {
		let e = a.current;
		if (!e) return;
		let t = window.HTMLInputElement.prototype, r = Object.getOwnPropertyDescriptor(t, "value").set;
		if (s !== n && r) {
			let t = new Event("input", { bubbles: !0 });
			r.call(e, n), e.dispatchEvent(t);
		}
	}, [s, n]), /* @__PURE__ */ p(W.input, {
		style: { display: "none" },
		...r,
		ref: o,
		defaultValue: n
	});
});
nr.displayName = tr;
function rr(e = [], t, n) {
	let r = [...e];
	return r[n] = t, r.sort((e, t) => e - t);
}
function ir(e, t, n) {
	return An(100 / (n - t) * (e - t), [0, 100]);
}
function ar(e, t) {
	if (t > 2) return `Value ${e + 1} of ${t}`;
	if (t === 2) return ["Minimum", "Maximum"][e];
}
function or(e, t) {
	if (e.length === 1) return 0;
	let n = e.map((e) => Math.abs(e - t)), r = Math.min(...n);
	return n.indexOf(r);
}
function sr(e, t, n) {
	let r = e / 2;
	return (r - ur([0, 50], [0, r])(t) * n) * n;
}
function cr(e) {
	return e.slice(0, -1).map((t, n) => e[n + 1] - t);
}
function lr(e, t) {
	if (t > 0) {
		let n = cr(e);
		return Math.min(...n) >= t;
	}
	return !0;
}
function ur(e, t) {
	return (n) => {
		if (e[0] === e[1] || t[0] === t[1]) return t[0];
		let r = (t[1] - t[0]) / (e[1] - e[0]);
		return t[0] + r * (n - e[0]);
	};
}
function dr(e) {
	return (String(e).split(".")[1] || "").length;
}
function fr(e, t) {
	let n = 10 ** t;
	return Math.round(e * n) / n;
}
var pr = Hn, mr = Yn, hr = Zn, gr = $n, _r = {
	root: "_root_1vymk_1",
	track: "_track_1vymk_23",
	range: "_range_1vymk_45",
	thumb: "_thumb_1vymk_57"
}, vr = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(pr, {
	ref: n,
	className: S(_r.root, e),
	...t,
	children: [/* @__PURE__ */ p(mr, {
		className: _r.track,
		children: /* @__PURE__ */ p(hr, { className: _r.range })
	}), /* @__PURE__ */ p(gr, { className: _r.thumb })]
}));
vr.displayName = pr.displayName;
//#endregion
//#region node_modules/@radix-ui/react-switch/dist/index.mjs
var yr = "Switch", [br, xr] = rt(yr), [Sr, Cr] = br(yr), wr = e.forwardRef((t, n) => {
	let { __scopeSwitch: r, name: i, checked: a, defaultChecked: o, required: s, disabled: c, value: l = "on", onCheckedChange: u, form: d, ...f } = t, [h, g] = e.useState(null), _ = U(n, (e) => g(e)), v = e.useRef(!1), y = h ? d || !!h.closest("form") : !0, [b, x] = bt({
		prop: a,
		defaultProp: o ?? !1,
		onChange: u,
		caller: yr
	});
	return /* @__PURE__ */ m(Sr, {
		scope: r,
		checked: b,
		disabled: c,
		children: [/* @__PURE__ */ p(W.button, {
			type: "button",
			role: "switch",
			"aria-checked": b,
			"aria-required": s,
			"data-state": kr(b),
			"data-disabled": c ? "" : void 0,
			disabled: c,
			value: l,
			...f,
			ref: _,
			onClick: H(t.onClick, (e) => {
				x((e) => !e), y && (v.current = e.isPropagationStopped(), v.current || e.stopPropagation());
			})
		}), y && /* @__PURE__ */ p(Or, {
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
wr.displayName = yr;
var Tr = "SwitchThumb", Er = e.forwardRef((e, t) => {
	let { __scopeSwitch: n, ...r } = e, i = Cr(Tr, n);
	return /* @__PURE__ */ p(W.span, {
		"data-state": kr(i.checked),
		"data-disabled": i.disabled ? "" : void 0,
		...r,
		ref: t
	});
});
Er.displayName = Tr;
var Dr = "SwitchBubbleInput", Or = e.forwardRef(({ __scopeSwitch: t, control: n, checked: r, bubbles: i = !0, ...a }, o) => {
	let s = e.useRef(null), c = U(s, o), l = qt(r), u = Kt(n);
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
Or.displayName = Dr;
function kr(e) {
	return e ? "checked" : "unchecked";
}
var Ar = wr, jr = Er, Mr = {
	container: "_container_1ba4x_1",
	root: "_root_1ba4x_17",
	thumb: "_thumb_1ba4x_83",
	label: "_label_1ba4x_123",
	labelText: "_labelText_1ba4x_143",
	labelTextDisabled: "_labelTextDisabled_1ba4x_155"
}, Nr = e.forwardRef(({ className: t, label: n, id: r, ...i }, a) => {
	let o = e.useId(), s = r || o;
	return /* @__PURE__ */ m("div", {
		className: Mr.container,
		children: [/* @__PURE__ */ p(Ar, {
			id: s,
			className: S(Mr.root, t),
			...i,
			ref: a,
			children: /* @__PURE__ */ p(jr, { className: Mr.thumb })
		}), n && /* @__PURE__ */ p("label", {
			htmlFor: s,
			className: Mr.label,
			children: /* @__PURE__ */ p(O, {
				as: "span",
				variant: "p",
				className: S(Mr.labelText, i.disabled && Mr.labelTextDisabled),
				style: { color: "var(--color-secundaria)" },
				children: n
			})
		})]
	});
});
Nr.displayName = "Switch";
var Pr = {
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
}, Fr = i(({ className: e, options: t, value: n, defaultValue: r, onChange: i, label: a, error: o, placeholder: c = "Selecione...", id: l, ...f }, h) => {
	let [g, _] = d(r || []), [v, y] = d(!1), [b, x] = d(""), C = u(null), w = n === void 0 ? g : n, T = !!o, E = l || (a ? `multiselect-${a.replace(/\s+/g, "-").toLowerCase()}` : void 0), D = t.filter((e) => e.label.toLowerCase().includes(b.toLowerCase())), O = (e) => {
		let t;
		t = w.includes(e) ? w.filter((t) => t !== e) : [...w, e], n === void 0 && _(t), i?.(t), x("");
	}, k = (e) => {
		let t = w.filter((t) => t !== e);
		n === void 0 && _(t), i?.(t);
	}, A = (e) => {
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
		className: S(Pr.container, e),
		ref: C,
		children: [
			a && /* @__PURE__ */ p("label", {
				htmlFor: E,
				className: Pr.label,
				children: a
			}),
			/* @__PURE__ */ m("div", {
				className: S(Pr.trigger, T && Pr.triggerError, v && Pr.triggerOpen),
				onClick: () => y(!0),
				children: [
					M.map((e) => /* @__PURE__ */ m(j, {
						intent: "primaria",
						variant: "ghost",
						children: [e.label, /* @__PURE__ */ p("button", {
							type: "button",
							className: Pr.removeBadgeBtn,
							onClick: (t) => {
								t.stopPropagation(), k(e.value);
							},
							children: /* @__PURE__ */ p(Ve, { size: 12 })
						})]
					}, e.value)),
					/* @__PURE__ */ p("input", {
						id: E,
						ref: h,
						type: "text",
						className: Pr.inputField,
						value: b,
						onChange: (e) => {
							x(e.target.value), y(!0);
						},
						onFocus: () => y(!0),
						onKeyDown: A,
						placeholder: w.length === 0 ? c : "",
						autoComplete: "off",
						...f
					}),
					/* @__PURE__ */ p(ce, {
						size: 16,
						className: Pr.chevron
					})
				]
			}),
			v && /* @__PURE__ */ p("div", {
				className: Pr.dropdown,
				children: D.length === 0 ? /* @__PURE__ */ p("div", {
					className: Pr.noOptions,
					children: "Nenhuma opção encontrada"
				}) : D.map((e) => {
					let t = w.includes(e.value);
					return /* @__PURE__ */ m("div", {
						className: S(Pr.option, t && Pr.optionSelected),
						onClick: (t) => {
							t.stopPropagation(), O(e.value), document.getElementById(E || "")?.focus();
						},
						children: [e.label, t && /* @__PURE__ */ p(se, {
							size: 16,
							className: Pr.checkIcon
						})]
					}, e.value);
				})
			}),
			o && /* @__PURE__ */ p("span", {
				className: Pr.errorMessage,
				children: o
			})
		]
	});
});
Fr.displayName = "MultiSelect";
//#endregion
//#region node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs
function Ir(t, n = globalThis?.document) {
	let r = vt(t);
	e.useEffect(() => {
		let e = (e) => {
			e.key === "Escape" && r(e);
		};
		return n.addEventListener("keydown", e, { capture: !0 }), () => n.removeEventListener("keydown", e, { capture: !0 });
	}, [r, n]);
}
//#endregion
//#region node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
var Lr = "DismissableLayer", Rr = "dismissableLayer.update", zr = "dismissableLayer.pointerDownOutside", Br = "dismissableLayer.focusOutside", Vr, Hr = e.createContext({
	layers: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	branches: /* @__PURE__ */ new Set()
}), Ur = e.forwardRef((t, n) => {
	let { disableOutsidePointerEvents: r = !1, onEscapeKeyDown: i, onPointerDownOutside: a, onFocusOutside: o, onInteractOutside: s, onDismiss: c, ...l } = t, u = e.useContext(Hr), [d, f] = e.useState(null), m = d?.ownerDocument ?? globalThis?.document, [, h] = e.useState({}), g = U(n, (e) => f(e)), _ = Array.from(u.layers), [v] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), y = _.indexOf(v), b = d ? _.indexOf(d) : -1, x = u.layersWithOutsidePointerEventsDisabled.size > 0, S = b >= y, C = Kr((e) => {
		let t = e.target, n = [...u.branches].some((e) => e.contains(t));
		!S || n || (a?.(e), s?.(e), e.defaultPrevented || c?.());
	}, m), w = qr((e) => {
		let t = e.target;
		[...u.branches].some((e) => e.contains(t)) || (o?.(e), s?.(e), e.defaultPrevented || c?.());
	}, m);
	return Ir((e) => {
		b === u.layers.size - 1 && (i?.(e), !e.defaultPrevented && c && (e.preventDefault(), c()));
	}, m), e.useEffect(() => {
		if (d) return r && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (Vr = m.body.style.pointerEvents, m.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(d)), u.layers.add(d), Jr(), () => {
			r && u.layersWithOutsidePointerEventsDisabled.size === 1 && (m.body.style.pointerEvents = Vr);
		};
	}, [
		d,
		m,
		r,
		u
	]), e.useEffect(() => () => {
		d && (u.layers.delete(d), u.layersWithOutsidePointerEventsDisabled.delete(d), Jr());
	}, [d, u]), e.useEffect(() => {
		let e = () => h({});
		return document.addEventListener(Rr, e), () => document.removeEventListener(Rr, e);
	}, []), /* @__PURE__ */ p(W.div, {
		...l,
		ref: g,
		style: {
			pointerEvents: x ? S ? "auto" : "none" : void 0,
			...t.style
		},
		onFocusCapture: H(t.onFocusCapture, w.onFocusCapture),
		onBlurCapture: H(t.onBlurCapture, w.onBlurCapture),
		onPointerDownCapture: H(t.onPointerDownCapture, C.onPointerDownCapture)
	});
});
Ur.displayName = Lr;
var Wr = "DismissableLayerBranch", Gr = e.forwardRef((t, n) => {
	let r = e.useContext(Hr), i = e.useRef(null), a = U(n, i);
	return e.useEffect(() => {
		let e = i.current;
		if (e) return r.branches.add(e), () => {
			r.branches.delete(e);
		};
	}, [r.branches]), /* @__PURE__ */ p(W.div, {
		...t,
		ref: a
	});
});
Gr.displayName = Wr;
function Kr(t, n = globalThis?.document) {
	let r = vt(t), i = e.useRef(!1), a = e.useRef(() => {});
	return e.useEffect(() => {
		let e = (e) => {
			if (e.target && !i.current) {
				let t = function() {
					Yr(zr, r, i, { discrete: !0 });
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
function qr(t, n = globalThis?.document) {
	let r = vt(t), i = e.useRef(!1);
	return e.useEffect(() => {
		let e = (e) => {
			e.target && !i.current && Yr(Br, r, { originalEvent: e }, { discrete: !1 });
		};
		return n.addEventListener("focusin", e), () => n.removeEventListener("focusin", e);
	}, [n, r]), {
		onFocusCapture: () => i.current = !0,
		onBlurCapture: () => i.current = !1
	};
}
function Jr() {
	let e = new CustomEvent(Rr);
	document.dispatchEvent(e);
}
function Yr(e, t, n, { discrete: r }) {
	let i = n.originalEvent.target, a = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && i.addEventListener(e, t, { once: !0 }), r ? ft(i, a) : i.dispatchEvent(a);
}
//#endregion
//#region node_modules/@radix-ui/react-focus-guards/dist/index.mjs
var Xr = 0;
function Zr() {
	e.useEffect(() => {
		let e = document.querySelectorAll("[data-radix-focus-guard]");
		return document.body.insertAdjacentElement("afterbegin", e[0] ?? Qr()), document.body.insertAdjacentElement("beforeend", e[1] ?? Qr()), Xr++, () => {
			Xr === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((e) => e.remove()), Xr--;
		};
	}, []);
}
function Qr() {
	let e = document.createElement("span");
	return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
//#endregion
//#region node_modules/@radix-ui/react-focus-scope/dist/index.mjs
var $r = "focusScope.autoFocusOnMount", ei = "focusScope.autoFocusOnUnmount", ti = {
	bubbles: !1,
	cancelable: !0
}, ni = "FocusScope", ri = e.forwardRef((t, n) => {
	let { loop: r = !1, trapped: i = !1, onMountAutoFocus: a, onUnmountAutoFocus: o, ...s } = t, [c, l] = e.useState(null), u = vt(a), d = vt(o), f = e.useRef(null), m = U(n, (e) => l(e)), h = e.useRef({
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
				c.contains(t) ? f.current = t : ui(f.current, { select: !0 });
			}, t = function(e) {
				if (h.paused || !c) return;
				let t = e.relatedTarget;
				t !== null && (c.contains(t) || ui(f.current, { select: !0 }));
			}, n = function(e) {
				if (document.activeElement === document.body) for (let t of e) t.removedNodes.length > 0 && ui(c);
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
			di.add(h);
			let e = document.activeElement;
			if (!c.contains(e)) {
				let t = new CustomEvent($r, ti);
				c.addEventListener($r, u), c.dispatchEvent(t), t.defaultPrevented || (ii(mi(oi(c)), { select: !0 }), document.activeElement === e && ui(c));
			}
			return () => {
				c.removeEventListener($r, u), setTimeout(() => {
					let t = new CustomEvent(ei, ti);
					c.addEventListener(ei, d), c.dispatchEvent(t), t.defaultPrevented || ui(e ?? document.body, { select: !0 }), c.removeEventListener(ei, d), di.remove(h);
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
			let t = e.currentTarget, [i, a] = ai(t);
			i && a ? !e.shiftKey && n === a ? (e.preventDefault(), r && ui(i, { select: !0 })) : e.shiftKey && n === i && (e.preventDefault(), r && ui(a, { select: !0 })) : n === t && e.preventDefault();
		}
	}, [
		r,
		i,
		h.paused
	]);
	return /* @__PURE__ */ p(W.div, {
		tabIndex: -1,
		...s,
		ref: m,
		onKeyDown: g
	});
});
ri.displayName = ni;
function ii(e, { select: t = !1 } = {}) {
	let n = document.activeElement;
	for (let r of e) if (ui(r, { select: t }), document.activeElement !== n) return;
}
function ai(e) {
	let t = oi(e);
	return [si(t, e), si(t.reverse(), e)];
}
function oi(e) {
	let t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (e) => {
		let t = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
function si(e, t) {
	for (let n of e) if (!ci(n, { upTo: t })) return n;
}
function ci(e, { upTo: t }) {
	if (getComputedStyle(e).visibility === "hidden") return !0;
	for (; e;) {
		if (t !== void 0 && e === t) return !1;
		if (getComputedStyle(e).display === "none") return !0;
		e = e.parentElement;
	}
	return !1;
}
function li(e) {
	return e instanceof HTMLInputElement && "select" in e;
}
function ui(e, { select: t = !1 } = {}) {
	if (e && e.focus) {
		let n = document.activeElement;
		e.focus({ preventScroll: !0 }), e !== n && li(e) && t && e.select();
	}
}
var di = fi();
function fi() {
	let e = [];
	return {
		add(t) {
			let n = e[0];
			t !== n && n?.pause(), e = pi(e, t), e.unshift(t);
		},
		remove(t) {
			e = pi(e, t), e[0]?.resume();
		}
	};
}
function pi(e, t) {
	let n = [...e], r = n.indexOf(t);
	return r !== -1 && n.splice(r, 1), n;
}
function mi(e) {
	return e.filter((e) => e.tagName !== "A");
}
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var hi = [
	"top",
	"right",
	"bottom",
	"left"
], gi = Math.min, _i = Math.max, vi = Math.round, yi = Math.floor, bi = (e) => ({
	x: e,
	y: e
}), xi = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Si(e, t, n) {
	return _i(e, gi(t, n));
}
function Ci(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function wi(e) {
	return e.split("-")[0];
}
function Ti(e) {
	return e.split("-")[1];
}
function Ei(e) {
	return e === "x" ? "y" : "x";
}
function Di(e) {
	return e === "y" ? "height" : "width";
}
function Oi(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function ki(e) {
	return Ei(Oi(e));
}
function Ai(e, t, n) {
	n === void 0 && (n = !1);
	let r = Ti(e), i = ki(e), a = Di(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = zi(o)), [o, zi(o)];
}
function ji(e) {
	let t = zi(e);
	return [
		Mi(e),
		t,
		Mi(t)
	];
}
function Mi(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var Ni = ["left", "right"], Pi = ["right", "left"], Fi = ["top", "bottom"], Ii = ["bottom", "top"];
function Li(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? Pi : Ni : t ? Ni : Pi;
		case "left":
		case "right": return t ? Fi : Ii;
		default: return [];
	}
}
function Ri(e, t, n, r) {
	let i = Ti(e), a = Li(wi(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(Mi)))), a;
}
function zi(e) {
	let t = wi(e);
	return xi[t] + e.slice(t.length);
}
function Bi(e) {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...e
	};
}
function Vi(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : Bi(e);
}
function Hi(e) {
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
function Ui(e, t, n) {
	let { reference: r, floating: i } = e, a = Oi(t), o = ki(t), s = Di(o), c = wi(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
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
	switch (Ti(t)) {
		case "start":
			p[o] -= f * (n && l ? -1 : 1);
			break;
		case "end":
			p[o] += f * (n && l ? -1 : 1);
			break;
	}
	return p;
}
async function Wi(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = Ci(t, e), p = Vi(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = Hi(await i.getClippingRect({
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
	}, y = Hi(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
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
var Gi = 50, Ki = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: Wi
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = Ui(l, r, c), f = r, p = 0, m = {};
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
		}, x && p < Gi && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = Ui(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, qi = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = Ci(e, t) || {};
		if (l == null) return {};
		let d = Vi(u), f = {
			x: n,
			y: r
		}, p = ki(i), m = Di(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		(!C || !await (o.isElement == null ? void 0 : o.isElement(S))) && (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = gi(d[_], T), D = gi(d[v], T), O = E, k = C - h[m] - D, A = C / 2 - h[m] / 2 + w, j = Si(O, A, k), M = !c.arrow && Ti(i) != null && A !== j && a.reference[m] / 2 - (A < O ? E : D) - h[m] / 2 < 0, N = M ? A < O ? A - O : A - k : 0;
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
}), Ji = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = Ci(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = wi(r), _ = Oi(o), v = wi(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [zi(o)] : ji(o)), x = p !== "none";
			!d && x && b.push(...Ri(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = Ai(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (!(u === "alignment" && _ !== Oi(t)) || T.every((e) => Oi(e.placement) === _ ? e.overflows[0] > 0 : !0))) return {
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
								let t = Oi(e.placement);
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
function Yi(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function Xi(e) {
	return hi.some((t) => e[t] >= 0);
}
var Zi = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = Ci(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = Yi(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: Xi(e)
					} };
				}
				case "escaped": {
					let e = Yi(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: Xi(e)
					} };
				}
				default: return {};
			}
		}
	};
}, Qi = /* @__PURE__ */ new Set(["left", "top"]);
async function $i(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = wi(n), s = Ti(n), c = Oi(n) === "y", l = Qi.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = Ci(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
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
var ea = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await $i(t, e);
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
}, ta = function(e) {
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
			} }, ...l } = Ci(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = Oi(wi(i)), p = Ei(f), m = u[p], h = u[f];
			if (o) {
				let e = p === "y" ? "top" : "left", t = p === "y" ? "bottom" : "right", n = m + d[e], r = m - d[t];
				m = Si(n, m, r);
			}
			if (s) {
				let e = f === "y" ? "top" : "left", t = f === "y" ? "bottom" : "right", n = h + d[e], r = h - d[t];
				h = Si(n, h, r);
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
}, na = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = Ci(e, t), u = {
				x: n,
				y: r
			}, d = Oi(i), f = Ei(d), p = u[f], m = u[d], h = Ci(s, t), g = typeof h == "number" ? {
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
				let e = f === "y" ? "width" : "height", t = Qi.has(wi(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, ra = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			var n, r;
			let { placement: i, rects: a, platform: o, elements: s } = t, { apply: c = () => {}, ...l } = Ci(e, t), u = await o.detectOverflow(t, l), d = wi(i), f = Ti(i), p = Oi(i) === "y", { width: m, height: h } = a.floating, g, _;
			d === "top" || d === "bottom" ? (g = d, _ = f === (await (o.isRTL == null ? void 0 : o.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (_ = d, g = f === "end" ? "top" : "bottom");
			let v = h - u.top - u.bottom, y = m - u.left - u.right, b = gi(h - u[g], v), x = gi(m - u[_], y), S = !t.middlewareData.shift, C = b, w = x;
			if ((n = t.middlewareData.shift) != null && n.enabled.x && (w = y), (r = t.middlewareData.shift) != null && r.enabled.y && (C = v), S && !f) {
				let e = _i(u.left, 0), t = _i(u.right, 0), n = _i(u.top, 0), r = _i(u.bottom, 0);
				p ? w = m - 2 * (e !== 0 || t !== 0 ? e + t : _i(u.left, u.right)) : C = h - 2 * (n !== 0 || r !== 0 ? n + r : _i(u.top, u.bottom));
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
function ia() {
	return typeof window < "u";
}
function aa(e) {
	return ca(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function oa(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function sa(e) {
	return ((ca(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function ca(e) {
	return ia() ? e instanceof Node || e instanceof oa(e).Node : !1;
}
function la(e) {
	return ia() ? e instanceof Element || e instanceof oa(e).Element : !1;
}
function ua(e) {
	return ia() ? e instanceof HTMLElement || e instanceof oa(e).HTMLElement : !1;
}
function da(e) {
	return !ia() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof oa(e).ShadowRoot;
}
function fa(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = Ca(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function pa(e) {
	return /^(table|td|th)$/.test(aa(e));
}
function ma(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var ha = /transform|translate|scale|rotate|perspective|filter/, ga = /paint|layout|strict|content/, _a = (e) => !!e && e !== "none", va;
function ya(e) {
	let t = la(e) ? Ca(e) : e;
	return _a(t.transform) || _a(t.translate) || _a(t.scale) || _a(t.rotate) || _a(t.perspective) || !xa() && (_a(t.backdropFilter) || _a(t.filter)) || ha.test(t.willChange || "") || ga.test(t.contain || "");
}
function ba(e) {
	let t = Ta(e);
	for (; ua(t) && !Sa(t);) {
		if (ya(t)) return t;
		if (ma(t)) return null;
		t = Ta(t);
	}
	return null;
}
function xa() {
	return va ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), va;
}
function Sa(e) {
	return /^(html|body|#document)$/.test(aa(e));
}
function Ca(e) {
	return oa(e).getComputedStyle(e);
}
function wa(e) {
	return la(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function Ta(e) {
	if (aa(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || da(e) && e.host || sa(e);
	return da(t) ? t.host : t;
}
function Ea(e) {
	let t = Ta(e);
	return Sa(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : ua(t) && fa(t) ? t : Ea(t);
}
function Da(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = Ea(e), i = r === e.ownerDocument?.body, a = oa(r);
	if (i) {
		let e = Oa(a);
		return t.concat(a, a.visualViewport || [], fa(r) ? r : [], e && n ? Da(e) : []);
	} else return t.concat(r, Da(r, [], n));
}
function Oa(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function ka(e) {
	let t = Ca(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = ua(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = vi(n) !== a || vi(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function Aa(e) {
	return la(e) ? e : e.contextElement;
}
function ja(e) {
	let t = Aa(e);
	if (!ua(t)) return bi(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = ka(t), o = (a ? vi(n.width) : n.width) / r, s = (a ? vi(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var Ma = /* @__PURE__ */ bi(0);
function Na(e) {
	let t = oa(e);
	return !xa() || !t.visualViewport ? Ma : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Pa(e, t, n) {
	return t === void 0 && (t = !1), !n || t && n !== oa(e) ? !1 : t;
}
function Fa(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = Aa(e), o = bi(1);
	t && (r ? la(r) && (o = ja(r)) : o = ja(e));
	let s = Pa(a, n, r) ? Na(a) : bi(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a) {
		let e = oa(a), t = r && la(r) ? oa(r) : r, n = e, i = Oa(n);
		for (; i && r && t !== n;) {
			let e = ja(i), t = i.getBoundingClientRect(), r = Ca(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = oa(i), i = Oa(n);
		}
	}
	return Hi({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Ia(e, t) {
	let n = wa(e).scrollLeft;
	return t ? t.left + n : Fa(sa(e)).left + n;
}
function La(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Ia(e, n),
		y: n.top + t.scrollTop
	};
}
function Ra(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = sa(r), s = t ? ma(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = bi(1), u = bi(0), d = ua(r);
	if ((d || !d && !a) && ((aa(r) !== "body" || fa(o)) && (c = wa(r)), d)) {
		let e = Fa(r);
		l = ja(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? La(o, c) : bi(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function za(e) {
	return Array.from(e.getClientRects());
}
function Ba(e) {
	let t = sa(e), n = wa(e), r = e.ownerDocument.body, i = _i(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = _i(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight), o = -n.scrollLeft + Ia(e), s = -n.scrollTop;
	return Ca(r).direction === "rtl" && (o += _i(t.clientWidth, r.clientWidth) - i), {
		width: i,
		height: a,
		x: o,
		y: s
	};
}
var Va = 25;
function Ha(e, t) {
	let n = oa(e), r = sa(e), i = n.visualViewport, a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
	if (i) {
		a = i.width, o = i.height;
		let e = xa();
		(!e || e && t === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
	}
	let l = Ia(r);
	if (l <= 0) {
		let e = r.ownerDocument, t = e.body, n = getComputedStyle(t), i = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, o = Math.abs(r.clientWidth - t.clientWidth - i);
		o <= Va && (a -= o);
	} else l <= Va && (a += l);
	return {
		width: a,
		height: o,
		x: s,
		y: c
	};
}
function Ua(e, t) {
	let n = Fa(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = ua(e) ? ja(e) : bi(1);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function Wa(e, t, n) {
	let r;
	if (t === "viewport") r = Ha(e, n);
	else if (t === "document") r = Ba(sa(e));
	else if (la(t)) r = Ua(t, n);
	else {
		let n = Na(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return Hi(r);
}
function Ga(e, t) {
	let n = Ta(e);
	return n === t || !la(n) || Sa(n) ? !1 : Ca(n).position === "fixed" || Ga(n, t);
}
function Ka(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = Da(e, [], !1).filter((e) => la(e) && aa(e) !== "body"), i = null, a = Ca(e).position === "fixed", o = a ? Ta(e) : e;
	for (; la(o) && !Sa(o);) {
		let t = Ca(o), n = ya(o);
		!n && t.position === "fixed" && (i = null), (a ? !n && !i : !n && t.position === "static" && i && (i.position === "absolute" || i.position === "fixed") || fa(o) && !n && Ga(e, o)) ? r = r.filter((e) => e !== o) : i = t, o = Ta(o);
	}
	return t.set(e, r), r;
}
function qa(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? ma(t) ? [] : Ka(t, this._c) : [].concat(n), r], o = Wa(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = Wa(t, a[e], i);
		s = _i(n.top, s), c = gi(n.right, c), l = gi(n.bottom, l), u = _i(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function Ja(e) {
	let { width: t, height: n } = ka(e);
	return {
		width: t,
		height: n
	};
}
function Ya(e, t, n) {
	let r = ua(t), i = sa(t), a = n === "fixed", o = Fa(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = bi(0);
	function l() {
		c.x = Ia(i);
	}
	if (r || !r && !a) if ((aa(t) !== "body" || fa(i)) && (s = wa(t)), r) {
		let e = Fa(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	} else i && l();
	a && !r && i && l();
	let u = i && !r && !a ? La(i, s) : bi(0);
	return {
		x: o.left + s.scrollLeft - c.x - u.x,
		y: o.top + s.scrollTop - c.y - u.y,
		width: o.width,
		height: o.height
	};
}
function Xa(e) {
	return Ca(e).position === "static";
}
function Za(e, t) {
	if (!ua(e) || Ca(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return sa(e) === n && (n = n.ownerDocument.body), n;
}
function Qa(e, t) {
	let n = oa(e);
	if (ma(e)) return n;
	if (!ua(e)) {
		let t = Ta(e);
		for (; t && !Sa(t);) {
			if (la(t) && !Xa(t)) return t;
			t = Ta(t);
		}
		return n;
	}
	let r = Za(e, t);
	for (; r && pa(r) && Xa(r);) r = Za(r, t);
	return r && Sa(r) && Xa(r) && !ya(r) ? n : r || ba(e) || n;
}
var $a = async function(e) {
	let t = this.getOffsetParent || Qa, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: Ya(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function eo(e) {
	return Ca(e).direction === "rtl";
}
var to = {
	convertOffsetParentRelativeRectToViewportRelativeRect: Ra,
	getDocumentElement: sa,
	getClippingRect: qa,
	getOffsetParent: Qa,
	getElementRects: $a,
	getClientRects: za,
	getDimensions: Ja,
	getScale: ja,
	isElement: la,
	isRTL: eo
};
function no(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function ro(e, t) {
	let n = null, r, i = sa(e);
	function a() {
		var e;
		clearTimeout(r), (e = n) == null || e.disconnect(), n = null;
	}
	function o(s, c) {
		s === void 0 && (s = !1), c === void 0 && (c = 1), a();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (s || t(), !f || !p) return;
		let m = yi(d), h = yi(i.clientWidth - (u + f)), g = yi(i.clientHeight - (d + p)), _ = yi(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: _i(0, gi(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (n !== c) {
				if (!y) return o();
				n ? o(!1, n) : r = setTimeout(() => {
					o(!1, 1e-7);
				}, 1e3);
			}
			n === 1 && !no(l, e.getBoundingClientRect()) && o(), y = !1;
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
function io(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = Aa(e), u = i || a ? [...l ? Da(l) : [], ...t ? Da(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n, { passive: !0 }), a && e.addEventListener("resize", n);
	});
	let d = l && s ? ro(l, n) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? Fa(e) : null;
	c && g();
	function g() {
		let t = Fa(e);
		h && !no(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var ao = ea, oo = ta, so = Ji, co = ra, lo = Zi, uo = qi, fo = na, po = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = {
		platform: to,
		...n
	}, a = {
		...i.platform,
		_c: r
	};
	return Ki(e, t, {
		...i,
		platform: a
	});
}, mo = typeof document < "u" ? c : function() {};
function ho(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!ho(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !ho(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function go(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function _o(e, t) {
	let n = go(e);
	return Math.round(t * n) / n;
}
function vo(t) {
	let n = e.useRef(t);
	return mo(() => {
		n.current = t;
	}), n;
}
function yo(t) {
	t === void 0 && (t = {});
	let { placement: n = "bottom", strategy: r = "absolute", middleware: i = [], platform: a, elements: { reference: o, floating: s } = {}, transform: c = !0, whileElementsMounted: l, open: u } = t, [d, f] = e.useState({
		x: 0,
		y: 0,
		strategy: r,
		placement: n,
		middlewareData: {},
		isPositioned: !1
	}), [p, m] = e.useState(i);
	ho(p, i) || m(i);
	let [g, _] = e.useState(null), [v, y] = e.useState(null), b = e.useCallback((e) => {
		e !== w.current && (w.current = e, _(e));
	}, []), x = e.useCallback((e) => {
		e !== T.current && (T.current = e, y(e));
	}, []), S = o || g, C = s || v, w = e.useRef(null), T = e.useRef(null), E = e.useRef(d), D = l != null, O = vo(l), k = vo(a), A = vo(u), j = e.useCallback(() => {
		if (!w.current || !T.current) return;
		let e = {
			placement: n,
			strategy: r,
			middleware: p
		};
		k.current && (e.platform = k.current), po(w.current, T.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: A.current !== !1
			};
			M.current && !ho(E.current, t) && (E.current = t, h.flushSync(() => {
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
	mo(() => {
		u === !1 && E.current.isPositioned && (E.current.isPositioned = !1, f((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [u]);
	let M = e.useRef(!1);
	mo(() => (M.current = !0, () => {
		M.current = !1;
	}), []), mo(() => {
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
		let t = _o(P.floating, d.x), n = _o(P.floating, d.y);
		return c ? {
			...e,
			transform: "translate(" + t + "px, " + n + "px)",
			...go(P.floating) >= 1.5 && { willChange: "transform" }
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
var bo = (e) => {
	function t(e) {
		return {}.hasOwnProperty.call(e, "current");
	}
	return {
		name: "arrow",
		options: e,
		fn(n) {
			let { element: r, padding: i } = typeof e == "function" ? e(n) : e;
			return r && t(r) ? r.current == null ? {} : uo({
				element: r.current,
				padding: i
			}).fn(n) : r ? uo({
				element: r,
				padding: i
			}).fn(n) : {};
		}
	};
}, xo = (e, t) => {
	let n = ao(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, So = (e, t) => {
	let n = oo(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Co = (e, t) => ({
	fn: fo(e).fn,
	options: [e, t]
}), wo = (e, t) => {
	let n = so(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, To = (e, t) => {
	let n = co(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Eo = (e, t) => {
	let n = lo(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Do = (e, t) => {
	let n = bo(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Oo = "Arrow", ko = e.forwardRef((e, t) => {
	let { children: n, width: r = 10, height: i = 5, ...a } = e;
	return /* @__PURE__ */ p(W.svg, {
		...a,
		ref: t,
		width: r,
		height: i,
		viewBox: "0 0 30 10",
		preserveAspectRatio: "none",
		children: e.asChild ? n : /* @__PURE__ */ p("polygon", { points: "0,0 30,0 15,10" })
	});
});
ko.displayName = Oo;
var Ao = ko, jo = "Popper", [Mo, No] = rt(jo), [Po, Fo] = Mo(jo), Io = (t) => {
	let { __scopePopper: n, children: r } = t, [i, a] = e.useState(null);
	return /* @__PURE__ */ p(Po, {
		scope: n,
		anchor: i,
		onAnchorChange: a,
		children: r
	});
};
Io.displayName = jo;
var Lo = "PopperAnchor", Ro = e.forwardRef((t, n) => {
	let { __scopePopper: r, virtualRef: i, ...a } = t, o = Fo(Lo, r), s = e.useRef(null), c = U(n, s), l = e.useRef(null);
	return e.useEffect(() => {
		let e = l.current;
		l.current = i?.current || s.current, e !== l.current && o.onAnchorChange(l.current);
	}), i ? null : /* @__PURE__ */ p(W.div, {
		...a,
		ref: c
	});
});
Ro.displayName = Lo;
var zo = "PopperContent", [Bo, Vo] = Mo(zo), Ho = e.forwardRef((t, n) => {
	let { __scopePopper: r, side: i = "bottom", sideOffset: a = 0, align: o = "center", alignOffset: s = 0, arrowPadding: c = 0, avoidCollisions: l = !0, collisionBoundary: u = [], collisionPadding: d = 0, sticky: f = "partial", hideWhenDetached: m = !1, updatePositionStrategy: h = "optimized", onPlaced: g, ..._ } = t, v = Fo(zo, r), [y, b] = e.useState(null), x = U(n, (e) => b(e)), [S, C] = e.useState(null), w = Kt(S), T = w?.width ?? 0, E = w?.height ?? 0, D = i + (o === "center" ? "" : "-" + o), O = typeof d == "number" ? d : {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...d
	}, k = Array.isArray(u) ? u : [u], A = k.length > 0, j = {
		padding: O,
		boundary: k.filter(Ko),
		altBoundary: A
	}, { refs: M, floatingStyles: N, placement: P, isPositioned: F, middlewareData: I } = yo({
		strategy: "fixed",
		placement: D,
		whileElementsMounted: (...e) => io(...e, { animationFrame: h === "always" }),
		elements: { reference: v.anchor },
		middleware: [
			xo({
				mainAxis: a + E,
				alignmentAxis: s
			}),
			l && So({
				mainAxis: !0,
				crossAxis: !1,
				limiter: f === "partial" ? Co() : void 0,
				...j
			}),
			l && wo({ ...j }),
			To({
				...j,
				apply: ({ elements: e, rects: t, availableWidth: n, availableHeight: r }) => {
					let { width: i, height: a } = t.reference, o = e.floating.style;
					o.setProperty("--radix-popper-available-width", `${n}px`), o.setProperty("--radix-popper-available-height", `${r}px`), o.setProperty("--radix-popper-anchor-width", `${i}px`), o.setProperty("--radix-popper-anchor-height", `${a}px`);
				}
			}),
			S && Do({
				element: S,
				padding: c
			}),
			qo({
				arrowWidth: T,
				arrowHeight: E
			}),
			m && Eo({
				strategy: "referenceHidden",
				...j
			})
		]
	}), [L, R] = Jo(P), z = vt(g);
	mt(() => {
		F && z?.();
	}, [F, z]);
	let ee = I.arrow?.x, te = I.arrow?.y, ne = I.arrow?.centerOffset !== 0, [re, ie] = e.useState();
	return mt(() => {
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
		children: /* @__PURE__ */ p(Bo, {
			scope: r,
			placedSide: L,
			onArrowChange: C,
			arrowX: ee,
			arrowY: te,
			shouldHideArrow: ne,
			children: /* @__PURE__ */ p(W.div, {
				"data-side": L,
				"data-align": R,
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
Ho.displayName = zo;
var Uo = "PopperArrow", Wo = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, Go = e.forwardRef(function(e, t) {
	let { __scopePopper: n, ...r } = e, i = Vo(Uo, n), a = Wo[i.placedSide];
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
		children: /* @__PURE__ */ p(Ao, {
			...r,
			ref: t,
			style: {
				...r.style,
				display: "block"
			}
		})
	});
});
Go.displayName = Uo;
function Ko(e) {
	return e !== null;
}
var qo = (e) => ({
	name: "transformOrigin",
	options: e,
	fn(t) {
		let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = Jo(n), u = {
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
function Jo(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
var Yo = Io, Xo = Ro, Zo = Ho, Qo = Go, $o = "Portal", es = e.forwardRef((t, n) => {
	let { container: r, ...i } = t, [a, o] = e.useState(!1);
	mt(() => o(!0), []);
	let s = r || a && globalThis?.document?.body;
	return s ? g.createPortal(/* @__PURE__ */ p(W.div, {
		...i,
		ref: n
	}), s) : null;
});
es.displayName = $o;
//#endregion
//#region node_modules/aria-hidden/dist/es2015/index.js
var ts = function(e) {
	return typeof document > "u" ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
}, ns = /* @__PURE__ */ new WeakMap(), rs = /* @__PURE__ */ new WeakMap(), is = {}, as = 0, os = function(e) {
	return e && (e.host || os(e.parentNode));
}, ss = function(e, t) {
	return t.map(function(t) {
		if (e.contains(t)) return t;
		var n = os(t);
		return n && e.contains(n) ? n : (console.error("aria-hidden", t, "in not contained inside", e, ". Doing nothing"), null);
	}).filter(function(e) {
		return !!e;
	});
}, cs = function(e, t, n, r) {
	var i = ss(t, Array.isArray(e) ? e : [e]);
	is[n] || (is[n] = /* @__PURE__ */ new WeakMap());
	var a = is[n], o = [], s = /* @__PURE__ */ new Set(), c = new Set(i), l = function(e) {
		!e || s.has(e) || (s.add(e), l(e.parentNode));
	};
	i.forEach(l);
	var u = function(e) {
		!e || c.has(e) || Array.prototype.forEach.call(e.children, function(e) {
			if (s.has(e)) u(e);
			else try {
				var t = e.getAttribute(r), i = t !== null && t !== "false", c = (ns.get(e) || 0) + 1, l = (a.get(e) || 0) + 1;
				ns.set(e, c), a.set(e, l), o.push(e), c === 1 && i && rs.set(e, !0), l === 1 && e.setAttribute(n, "true"), i || e.setAttribute(r, "true");
			} catch (t) {
				console.error("aria-hidden: cannot operate on ", e, t);
			}
		});
	};
	return u(t), s.clear(), as++, function() {
		o.forEach(function(e) {
			var t = ns.get(e) - 1, i = a.get(e) - 1;
			ns.set(e, t), a.set(e, i), t || (rs.has(e) || e.removeAttribute(r), rs.delete(e)), i || e.removeAttribute(n);
		}), as--, as || (ns = /* @__PURE__ */ new WeakMap(), ns = /* @__PURE__ */ new WeakMap(), rs = /* @__PURE__ */ new WeakMap(), is = {});
	};
}, ls = function(e, t, n) {
	n === void 0 && (n = "data-aria-hidden");
	var r = Array.from(Array.isArray(e) ? e : [e]), i = t || ts(e);
	return i ? (r.push.apply(r, Array.from(i.querySelectorAll("[aria-live], script"))), cs(r, i, n, "aria-hidden")) : function() {
		return null;
	};
}, us = function() {
	return us = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, us.apply(this, arguments);
};
function ds(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function fs(e, t, n) {
	if (n || arguments.length === 2) for (var r = 0, i = t.length, a; r < i; r++) (a || !(r in t)) && (a ||= Array.prototype.slice.call(t, 0, r), a[r] = t[r]);
	return e.concat(a || Array.prototype.slice.call(t));
}
//#endregion
//#region node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var ps = "right-scroll-bar-position", ms = "width-before-scroll-bar", hs = "with-scroll-bars-hidden", gs = "--removed-body-scroll-bar-size";
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/assignRef.js
function _s(e, t) {
	return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/useRef.js
function vs(e, t) {
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
var ys = typeof window < "u" ? e.useLayoutEffect : e.useEffect, bs = /* @__PURE__ */ new WeakMap();
function xs(e, t) {
	var n = vs(t || null, function(t) {
		return e.forEach(function(e) {
			return _s(e, t);
		});
	});
	return ys(function() {
		var t = bs.get(n);
		if (t) {
			var r = new Set(t), i = new Set(e), a = n.current;
			r.forEach(function(e) {
				i.has(e) || _s(e, null);
			}), i.forEach(function(e) {
				r.has(e) || _s(e, a);
			});
		}
		bs.set(n, e);
	}, [e]), n;
}
//#endregion
//#region node_modules/use-sidecar/dist/es2015/medium.js
function Ss(e) {
	return e;
}
function Cs(e, t) {
	t === void 0 && (t = Ss);
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
function ws(e) {
	e === void 0 && (e = {});
	var t = Cs(null);
	return t.options = us({
		async: !0,
		ssr: !1
	}, e), t;
}
//#endregion
//#region node_modules/use-sidecar/dist/es2015/exports.js
var Ts = function(t) {
	var n = t.sideCar, r = ds(t, ["sideCar"]);
	if (!n) throw Error("Sidecar: please provide `sideCar` property to import the right car");
	var i = n.read();
	if (!i) throw Error("Sidecar medium not found");
	return e.createElement(i, us({}, r));
};
Ts.isSideCarExport = !0;
function Es(e, t) {
	return e.useMedium(t), Ts;
}
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/medium.js
var Ds = ws(), Os = function() {}, ks = e.forwardRef(function(t, n) {
	var r = e.useRef(null), i = e.useState({
		onScrollCapture: Os,
		onWheelCapture: Os,
		onTouchMoveCapture: Os
	}), a = i[0], o = i[1], s = t.forwardProps, c = t.children, l = t.className, u = t.removeScrollBar, d = t.enabled, f = t.shards, p = t.sideCar, m = t.noRelative, h = t.noIsolation, g = t.inert, _ = t.allowPinchZoom, v = t.as, y = v === void 0 ? "div" : v, b = t.gapMode, x = ds(t, [
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
	]), S = p, C = xs([r, n]), w = us(us({}, x), a);
	return e.createElement(e.Fragment, null, d && e.createElement(S, {
		sideCar: Ds,
		removeScrollBar: u,
		shards: f,
		noRelative: m,
		noIsolation: h,
		inert: g,
		setCallbacks: o,
		allowPinchZoom: !!_,
		lockRef: r,
		gapMode: b
	}), s ? e.cloneElement(e.Children.only(c), us(us({}, w), { ref: C })) : e.createElement(y, us({}, w, {
		className: l,
		ref: C
	}), c));
});
ks.defaultProps = {
	enabled: !0,
	removeScrollBar: !0,
	inert: !1
}, ks.classNames = {
	fullWidth: ms,
	zeroRight: ps
};
//#endregion
//#region node_modules/get-nonce/dist/es2015/index.js
var As, js = function() {
	if (As) return As;
	if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
//#endregion
//#region node_modules/react-style-singleton/dist/es2015/singleton.js
function Ms() {
	if (!document) return null;
	var e = document.createElement("style");
	e.type = "text/css";
	var t = js();
	return t && e.setAttribute("nonce", t), e;
}
function Ns(e, t) {
	e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Ps(e) {
	(document.head || document.getElementsByTagName("head")[0]).appendChild(e);
}
var Fs = function() {
	var e = 0, t = null;
	return {
		add: function(n) {
			e == 0 && (t = Ms()) && (Ns(t, n), Ps(t)), e++;
		},
		remove: function() {
			e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
		}
	};
}, Is = function() {
	var t = Fs();
	return function(n, r) {
		e.useEffect(function() {
			return t.add(n), function() {
				t.remove();
			};
		}, [n && r]);
	};
}, Ls = function() {
	var e = Is();
	return function(t) {
		var n = t.styles, r = t.dynamic;
		return e(n, r), null;
	};
}, Rs = {
	left: 0,
	top: 0,
	right: 0,
	gap: 0
}, zs = function(e) {
	return parseInt(e || "", 10) || 0;
}, Bs = function(e) {
	var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], i = t[e === "padding" ? "paddingRight" : "marginRight"];
	return [
		zs(n),
		zs(r),
		zs(i)
	];
}, Vs = function(e) {
	if (e === void 0 && (e = "margin"), typeof window > "u") return Rs;
	var t = Bs(e), n = document.documentElement.clientWidth, r = window.innerWidth;
	return {
		left: t[0],
		top: t[1],
		right: t[2],
		gap: Math.max(0, r - n + t[2] - t[0])
	};
}, Hs = Ls(), Us = "data-scroll-locked", Ws = function(e, t, n, r) {
	var i = e.left, a = e.top, o = e.right, s = e.gap;
	return n === void 0 && (n = "margin"), `
  .${hs} {
   overflow: hidden ${r};
   padding-right: ${s}px ${r};
  }
  body[${Us}] {
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
  
  .${ps} {
    right: ${s}px ${r};
  }
  
  .${ms} {
    margin-right: ${s}px ${r};
  }
  
  .${ps} .${ps} {
    right: 0 ${r};
  }
  
  .${ms} .${ms} {
    margin-right: 0 ${r};
  }
  
  body[${Us}] {
    ${gs}: ${s}px;
  }
`;
}, Gs = function() {
	var e = parseInt(document.body.getAttribute("data-scroll-locked") || "0", 10);
	return isFinite(e) ? e : 0;
}, Ks = function() {
	e.useEffect(function() {
		return document.body.setAttribute(Us, (Gs() + 1).toString()), function() {
			var e = Gs() - 1;
			e <= 0 ? document.body.removeAttribute(Us) : document.body.setAttribute(Us, e.toString());
		};
	}, []);
}, qs = function(t) {
	var n = t.noRelative, r = t.noImportant, i = t.gapMode, a = i === void 0 ? "margin" : i;
	Ks();
	var o = e.useMemo(function() {
		return Vs(a);
	}, [a]);
	return e.createElement(Hs, { styles: Ws(o, !n, a, r ? "" : "!important") });
}, Js = !1;
if (typeof window < "u") try {
	var Ys = Object.defineProperty({}, "passive", { get: function() {
		return Js = !0, !0;
	} });
	window.addEventListener("test", Ys, Ys), window.removeEventListener("test", Ys, Ys);
} catch {
	Js = !1;
}
var Xs = Js ? { passive: !1 } : !1, Zs = function(e) {
	return e.tagName === "TEXTAREA";
}, Qs = function(e, t) {
	if (!(e instanceof Element)) return !1;
	var n = window.getComputedStyle(e);
	return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !Zs(e) && n[t] === "visible");
}, $s = function(e) {
	return Qs(e, "overflowY");
}, ec = function(e) {
	return Qs(e, "overflowX");
}, tc = function(e, t) {
	var n = t.ownerDocument, r = t;
	do {
		if (typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host), ic(e, r)) {
			var i = ac(e, r);
			if (i[1] > i[2]) return !0;
		}
		r = r.parentNode;
	} while (r && r !== n.body);
	return !1;
}, nc = function(e) {
	return [
		e.scrollTop,
		e.scrollHeight,
		e.clientHeight
	];
}, rc = function(e) {
	return [
		e.scrollLeft,
		e.scrollWidth,
		e.clientWidth
	];
}, ic = function(e, t) {
	return e === "v" ? $s(t) : ec(t);
}, ac = function(e, t) {
	return e === "v" ? nc(t) : rc(t);
}, oc = function(e, t) {
	return e === "h" && t === "rtl" ? -1 : 1;
}, sc = function(e, t, n, r, i) {
	var a = oc(e, window.getComputedStyle(t).direction), o = a * r, s = n.target, c = t.contains(s), l = !1, u = o > 0, d = 0, f = 0;
	do {
		if (!s) break;
		var p = ac(e, s), m = p[0], h = p[1] - p[2] - a * m;
		(m || h) && ic(e, s) && (d += h, f += m);
		var g = s.parentNode;
		s = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
	} while (!c && s !== document.body || c && (t.contains(s) || t === s));
	return (u && (i && Math.abs(d) < 1 || !i && o > d) || !u && (i && Math.abs(f) < 1 || !i && -o > f)) && (l = !0), l;
}, cc = function(e) {
	return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, lc = function(e) {
	return [e.deltaX, e.deltaY];
}, uc = function(e) {
	return e && "current" in e ? e.current : e;
}, dc = function(e, t) {
	return e[0] === t[0] && e[1] === t[1];
}, fc = function(e) {
	return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`;
}, pc = 0, mc = [];
function hc(t) {
	var n = e.useRef([]), r = e.useRef([0, 0]), i = e.useRef(), a = e.useState(pc++)[0], o = e.useState(Ls)[0], s = e.useRef(t);
	e.useEffect(function() {
		s.current = t;
	}, [t]), e.useEffect(function() {
		if (t.inert) {
			document.body.classList.add(`block-interactivity-${a}`);
			var e = fs([t.lockRef.current], (t.shards || []).map(uc), !0).filter(Boolean);
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
		var n = cc(e), a = r.current, o = "deltaX" in e ? e.deltaX : a[0] - n[0], c = "deltaY" in e ? e.deltaY : a[1] - n[1], l, u = e.target, d = Math.abs(o) > Math.abs(c) ? "h" : "v";
		if ("touches" in e && d === "h" && u.type === "range") return !1;
		var f = window.getSelection(), p = f && f.anchorNode;
		if (p && (p === u || p.contains(u))) return !1;
		var m = tc(d, u);
		if (!m) return !0;
		if (m ? l = d : (l = d === "v" ? "h" : "v", m = tc(d, u)), !m) return !1;
		if (!i.current && "changedTouches" in e && (o || c) && (i.current = l), !l) return !0;
		var h = i.current || l;
		return sc(h, t, e, h === "h" ? o : c, !0);
	}, []), l = e.useCallback(function(e) {
		var t = e;
		if (!(!mc.length || mc[mc.length - 1] !== o)) {
			var r = "deltaY" in t ? lc(t) : cc(t), i = n.current.filter(function(e) {
				return e.name === t.type && (e.target === t.target || t.target === e.shadowParent) && dc(e.delta, r);
			})[0];
			if (i && i.should) {
				t.cancelable && t.preventDefault();
				return;
			}
			if (!i) {
				var a = (s.current.shards || []).map(uc).filter(Boolean).filter(function(e) {
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
			shadowParent: gc(r)
		};
		n.current.push(a), setTimeout(function() {
			n.current = n.current.filter(function(e) {
				return e !== a;
			});
		}, 1);
	}, []), d = e.useCallback(function(e) {
		r.current = cc(e), i.current = void 0;
	}, []), f = e.useCallback(function(e) {
		u(e.type, lc(e), e.target, c(e, t.lockRef.current));
	}, []), p = e.useCallback(function(e) {
		u(e.type, cc(e), e.target, c(e, t.lockRef.current));
	}, []);
	e.useEffect(function() {
		return mc.push(o), t.setCallbacks({
			onScrollCapture: f,
			onWheelCapture: f,
			onTouchMoveCapture: p
		}), document.addEventListener("wheel", l, Xs), document.addEventListener("touchmove", l, Xs), document.addEventListener("touchstart", d, Xs), function() {
			mc = mc.filter(function(e) {
				return e !== o;
			}), document.removeEventListener("wheel", l, Xs), document.removeEventListener("touchmove", l, Xs), document.removeEventListener("touchstart", d, Xs);
		};
	}, []);
	var m = t.removeScrollBar, h = t.inert;
	return e.createElement(e.Fragment, null, h ? e.createElement(o, { styles: fc(a) }) : null, m ? e.createElement(qs, {
		noRelative: t.noRelative,
		gapMode: t.gapMode
	}) : null);
}
function gc(e) {
	for (var t = null; e !== null;) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
	return t;
}
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/sidecar.js
var _c = Es(Ds, hc), vc = e.forwardRef(function(t, n) {
	return e.createElement(ks, us({}, t, {
		ref: n,
		sideCar: _c
	}));
});
vc.classNames = ks.classNames;
//#endregion
//#region node_modules/@radix-ui/react-popover/dist/index.mjs
var yc = "Popover", [bc, xc] = rt(yc, [No]), Sc = No(), [Cc, wc] = bc(yc), Tc = (t) => {
	let { __scopePopover: n, children: r, open: i, defaultOpen: a, onOpenChange: o, modal: s = !1 } = t, c = Sc(n), l = e.useRef(null), [u, d] = e.useState(!1), [f, m] = bt({
		prop: i,
		defaultProp: a ?? !1,
		onChange: o,
		caller: yc
	});
	return /* @__PURE__ */ p(Yo, {
		...c,
		children: /* @__PURE__ */ p(Cc, {
			scope: n,
			contentId: _t(),
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
Tc.displayName = yc;
var Ec = "PopoverAnchor", Dc = e.forwardRef((t, n) => {
	let { __scopePopover: r, ...i } = t, a = wc(Ec, r), o = Sc(r), { onCustomAnchorAdd: s, onCustomAnchorRemove: c } = a;
	return e.useEffect(() => (s(), () => c()), [s, c]), /* @__PURE__ */ p(Xo, {
		...o,
		...i,
		ref: n
	});
});
Dc.displayName = Ec;
var Oc = "PopoverTrigger", kc = e.forwardRef((e, t) => {
	let { __scopePopover: n, ...r } = e, i = wc(Oc, n), a = Sc(n), o = U(t, i.triggerRef), s = /* @__PURE__ */ p(W.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": i.open,
		"aria-controls": i.contentId,
		"data-state": Wc(i.open),
		...r,
		ref: o,
		onClick: H(e.onClick, i.onOpenToggle)
	});
	return i.hasCustomAnchor ? s : /* @__PURE__ */ p(Xo, {
		asChild: !0,
		...a,
		children: s
	});
});
kc.displayName = Oc;
var Ac = "PopoverPortal", [jc, Mc] = bc(Ac, { forceMount: void 0 }), Nc = (e) => {
	let { __scopePopover: t, forceMount: n, children: r, container: i } = e, a = wc(Ac, t);
	return /* @__PURE__ */ p(jc, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ p(Yt, {
			present: n || a.open,
			children: /* @__PURE__ */ p(es, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
};
Nc.displayName = Ac;
var Pc = "PopoverContent", Fc = e.forwardRef((e, t) => {
	let n = Mc(Pc, e.__scopePopover), { forceMount: r = n.forceMount, ...i } = e, a = wc(Pc, e.__scopePopover);
	return /* @__PURE__ */ p(Yt, {
		present: r || a.open,
		children: a.modal ? /* @__PURE__ */ p(Lc, {
			...i,
			ref: t
		}) : /* @__PURE__ */ p(Rc, {
			...i,
			ref: t
		})
	});
});
Fc.displayName = Pc;
var Ic = /* @__PURE__ */ at("PopoverContent.RemoveScroll"), Lc = e.forwardRef((t, n) => {
	let r = wc(Pc, t.__scopePopover), i = e.useRef(null), a = U(n, i), o = e.useRef(!1);
	return e.useEffect(() => {
		let e = i.current;
		if (e) return ls(e);
	}, []), /* @__PURE__ */ p(vc, {
		as: Ic,
		allowPinchZoom: !0,
		children: /* @__PURE__ */ p(zc, {
			...t,
			ref: a,
			trapFocus: r.open,
			disableOutsidePointerEvents: !0,
			onCloseAutoFocus: H(t.onCloseAutoFocus, (e) => {
				e.preventDefault(), o.current || r.triggerRef.current?.focus();
			}),
			onPointerDownOutside: H(t.onPointerDownOutside, (e) => {
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
				o.current = t.button === 2 || n;
			}, { checkForDefaultPrevented: !1 }),
			onFocusOutside: H(t.onFocusOutside, (e) => e.preventDefault(), { checkForDefaultPrevented: !1 })
		})
	});
}), Rc = e.forwardRef((t, n) => {
	let r = wc(Pc, t.__scopePopover), i = e.useRef(!1), a = e.useRef(!1);
	return /* @__PURE__ */ p(zc, {
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
}), zc = e.forwardRef((e, t) => {
	let { __scopePopover: n, trapFocus: r, onOpenAutoFocus: i, onCloseAutoFocus: a, disableOutsidePointerEvents: o, onEscapeKeyDown: s, onPointerDownOutside: c, onFocusOutside: l, onInteractOutside: u, ...d } = e, f = wc(Pc, n), m = Sc(n);
	return Zr(), /* @__PURE__ */ p(ri, {
		asChild: !0,
		loop: !0,
		trapped: r,
		onMountAutoFocus: i,
		onUnmountAutoFocus: a,
		children: /* @__PURE__ */ p(Ur, {
			asChild: !0,
			disableOutsidePointerEvents: o,
			onInteractOutside: u,
			onEscapeKeyDown: s,
			onPointerDownOutside: c,
			onFocusOutside: l,
			onDismiss: () => f.onOpenChange(!1),
			children: /* @__PURE__ */ p(Zo, {
				"data-state": Wc(f.open),
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
}), Bc = "PopoverClose", Vc = e.forwardRef((e, t) => {
	let { __scopePopover: n, ...r } = e, i = wc(Bc, n);
	return /* @__PURE__ */ p(W.button, {
		type: "button",
		...r,
		ref: t,
		onClick: H(e.onClick, () => i.onOpenChange(!1))
	});
});
Vc.displayName = Bc;
var Hc = "PopoverArrow", Uc = e.forwardRef((e, t) => {
	let { __scopePopover: n, ...r } = e;
	return /* @__PURE__ */ p(Qo, {
		...Sc(n),
		...r,
		ref: t
	});
});
Uc.displayName = Hc;
function Wc(e) {
	return e ? "open" : "closed";
}
var Gc = Tc, Kc = kc, qc = Nc, Jc = Fc, G = {
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
}, Yc = 100;
typeof document < "u" && !window.__avereUiCbWheel && (window.__avereUiCbWheel = !0, document.addEventListener("wheel", (e) => {
	let t = e.target?.closest?.("[data-avere-cb-list]");
	t && (e.preventDefault(), e.stopImmediatePropagation(), t.scrollTop += e.deltaY);
}, {
	passive: !1,
	capture: !0
}));
function Xc({ options: t, value: n, onChange: r, label: i, error: a, placeholder: o = "Selecione...", className: s, disabled: c, side: l = "bottom", avoidCollisions: u = !0, onCriar: d, rotuloCriar: h = "Novo…" }) {
	let [g, _] = e.useState(!1), [v, y] = e.useState(""), [b, x] = e.useState(0), C = e.useRef(null), w = e.useRef(null), T = e.useRef(null);
	e.useEffect(() => {
		x(0);
	}, [v, g]), e.useEffect(() => {
		C.current?.scrollIntoView({ block: "nearest" });
	}, [b]);
	let E = t.find((e) => e.value === n), D = v.trim().toLowerCase(), O = D ? t.filter((e) => e.label.toLowerCase().includes(D)) : t, k = O.slice(0, Yc), A = (e) => {
		r?.(e), _(!1), y("");
	}, j = () => {
		let e = v.trim();
		_(!1), y(""), d?.(e);
	};
	return /* @__PURE__ */ m("div", {
		className: S(G.container, s),
		children: [
			i && /* @__PURE__ */ p("label", {
				className: G.label,
				children: i
			}),
			/* @__PURE__ */ m(Gc, {
				open: g,
				onOpenChange: (e) => {
					_(e), e || y("");
				},
				children: [/* @__PURE__ */ p(Kc, {
					asChild: !0,
					disabled: c,
					children: /* @__PURE__ */ m("button", {
						ref: w,
						type: "button",
						className: S(G.cbTrigger, a && G.inputError),
						children: [/* @__PURE__ */ p("span", {
							className: G.cbTriggerText,
							"data-placeholder": E ? void 0 : "",
							children: E ? E.label : o
						}), /* @__PURE__ */ p(ue, {
							size: 16,
							className: G.cbTriggerIcon
						})]
					})
				}), /* @__PURE__ */ p(qc, { children: /* @__PURE__ */ m(Jc, {
					className: G.cbContent,
					align: "start",
					side: l,
					avoidCollisions: u,
					sideOffset: 4,
					style: {
						zIndex: 9999,
						width: "var(--radix-popover-trigger-width)"
					},
					onCloseAutoFocus: (e) => {
						let t = T.current;
						if (!t) return;
						T.current = null, e.preventDefault();
						let n = Array.from(document.querySelectorAll("button, input, select, textarea, a[href], [tabindex]:not([tabindex=\"-1\"])")).filter((e) => !e.closest("[data-radix-popper-content-wrapper]") && e.offsetParent !== null && !e.hasAttribute("disabled")), r = w.current ? n.indexOf(w.current) : -1;
						((r >= 0 ? n[t === "prev" ? r - 1 : r + 1] : null) ?? w.current)?.focus();
					},
					children: [
						/* @__PURE__ */ p("div", {
							className: G.searchBox,
							children: /* @__PURE__ */ m("div", {
								className: G.searchInputWrap,
								children: [/* @__PURE__ */ p(je, {
									size: 14,
									className: G.searchIcon
								}), /* @__PURE__ */ p("input", {
									autoFocus: !0,
									className: G.searchInput,
									value: v,
									onChange: (e) => y(e.target.value),
									onKeyDown: (e) => {
										if (e.key === "ArrowDown") e.preventDefault(), x((e) => Math.min(e + 1, k.length - 1));
										else if (e.key === "ArrowUp") e.preventDefault(), x((e) => Math.max(e - 1, 0));
										else if (e.key === "Enter") {
											e.preventDefault();
											let t = k[b];
											t ? A(t.value) : d && j();
										} else e.key === "Tab" && (e.preventDefault(), T.current = e.shiftKey ? "prev" : "next", _(!1));
									},
									placeholder: "Buscar…"
								})]
							})
						}),
						/* @__PURE__ */ p("div", {
							className: G.searchList,
							"data-avere-cb-list": "",
							children: k.length > 0 ? /* @__PURE__ */ m(f, { children: [k.map((e, t) => /* @__PURE__ */ m("button", {
								type: "button",
								tabIndex: -1,
								ref: t === b ? C : void 0,
								className: S(G.searchItem, e.value === n && G.searchItemActive, t === b && G.searchItemDestaque),
								onMouseEnter: () => x(t),
								onClick: () => A(e.value),
								children: [/* @__PURE__ */ p("span", {
									className: G.searchCheck,
									children: e.value === n && /* @__PURE__ */ p(se, { size: 15 })
								}), /* @__PURE__ */ p("span", {
									className: G.searchItemLabel,
									children: e.label
								})]
							}, e.value)), O.length > Yc && /* @__PURE__ */ m("div", {
								className: G.searchEmpty,
								children: [
									"Refine a busca — ",
									O.length - Yc,
									" itens ocultos"
								]
							})] }) : /* @__PURE__ */ p("div", {
								className: G.searchEmpty,
								children: "Nenhum resultado."
							})
						}),
						d && /* @__PURE__ */ p("div", {
							className: G.searchFooter,
							children: /* @__PURE__ */ m("button", {
								type: "button",
								tabIndex: -1,
								className: G.searchCriar,
								onClick: j,
								children: [/* @__PURE__ */ p(Ae, { size: 14 }), /* @__PURE__ */ m("span", { children: [h, v.trim() ? ` "${v.trim()}"` : ""] })]
							})
						})
					]
				}) })]
			}),
			a && /* @__PURE__ */ p("span", {
				className: G.errorMessage,
				children: a
			})
		]
	});
}
Xc.displayName = "Combobox";
var K = {
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
}, Zc = (e) => {
	if (!+e) return "0 Bytes";
	let t = 1024, n = [
		"Bytes",
		"KB",
		"MB",
		"GB"
	], r = Math.floor(Math.log(e) / Math.log(t));
	return `${parseFloat((e / t ** +r).toFixed(2))} ${n[r]}`;
}, Qc = i(({ className: e, onFileSelect: t, accept: n, maxSize: r = 5 * 1024 * 1024, label: i, error: a, id: o, ...s }, c) => {
	let [l, f] = d("idle"), [h, g] = d(null), [_, v] = d(""), y = u(null), b = !!a || !!_, x = a || _, C = o || (i ? `fileupload-${i.replace(/\s+/g, "-").toLowerCase()}` : void 0), w = (e) => {
		if (r && e.size > r) {
			f("error"), v(`O arquivo excede o limite de ${Zc(r)}`);
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
		className: S(K.container, e),
		children: [
			i && /* @__PURE__ */ p("label", {
				htmlFor: C,
				className: K.label,
				children: i
			}),
			/* @__PURE__ */ m("div", {
				ref: c,
				className: S(K.dropzone, K[l], b && l === "idle" && K.error),
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
						className: K.hiddenInput,
						accept: n,
						onChange: (e) => e.target.files?.[0] && w(e.target.files[0]),
						ref: y,
						disabled: l === "uploading" || l === "success"
					}),
					(l === "idle" || l === "dragging" || l === "error") && /* @__PURE__ */ m("div", {
						className: K.idleContent,
						children: [
							/* @__PURE__ */ p(me, {
								size: 40,
								className: S(K.uploadIcon, b && K.uploadIconError)
							}),
							/* @__PURE__ */ m(O, {
								variant: "p",
								className: K.uploadText,
								children: [/* @__PURE__ */ p("span", {
									className: K.uploadClickText,
									children: "Clique para enviar"
								}), " ou arraste"]
							}),
							/* @__PURE__ */ m(O, {
								variant: "p",
								className: K.uploadHint,
								children: ["Até ", Zc(r)]
							})
						]
					}),
					l === "uploading" && /* @__PURE__ */ m("div", {
						className: K.uploadingContent,
						children: [/* @__PURE__ */ p(We, {
							size: "lg",
							className: K.spinner
						}), /* @__PURE__ */ p(O, {
							variant: "p",
							className: K.uploadingText,
							children: "Enviando..."
						})]
					}),
					l === "success" && h && /* @__PURE__ */ m("div", {
						className: K.successContent,
						children: [/* @__PURE__ */ p(de, {
							size: 32,
							className: K.successIcon
						}), /* @__PURE__ */ m("div", {
							className: K.fileCard,
							children: [
								/* @__PURE__ */ p(be, {
									size: 20,
									className: K.fileIcon
								}),
								/* @__PURE__ */ m("div", {
									className: K.fileInfo,
									children: [/* @__PURE__ */ p("div", {
										className: K.fileName,
										children: h.name
									}), /* @__PURE__ */ p("div", {
										className: K.fileSize,
										children: Zc(h.size)
									})]
								}),
								/* @__PURE__ */ p("button", {
									type: "button",
									onClick: (e) => {
										e.stopPropagation(), E();
									},
									className: K.fileClearBtn,
									children: /* @__PURE__ */ p(Ve, { size: 16 })
								})
							]
						})]
					})
				]
			}),
			x && /* @__PURE__ */ p("span", {
				className: K.errorMessage,
				children: x
			})
		]
	});
});
Qc.displayName = "FileUpload";
//#endregion
//#region node_modules/@radix-ui/react-visually-hidden/dist/index.mjs
var $c = Object.freeze({
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
}), el = "VisuallyHidden", tl = e.forwardRef((e, t) => /* @__PURE__ */ p(W.span, {
	...e,
	ref: t,
	style: {
		...$c,
		...e.style
	}
}));
tl.displayName = el;
var nl = tl, rl = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
], il = [" ", "Enter"], al = "Select", [ol, sl, cl] = pt(al), [ll, ul] = rt(al, [cl, No]), dl = No(), [fl, pl] = ll(al), [ml, hl] = ll(al), gl = (t) => {
	let { __scopeSelect: n, children: r, open: i, defaultOpen: a, onOpenChange: o, value: s, defaultValue: c, onValueChange: l, dir: u, name: d, autoComplete: f, disabled: h, required: g, form: _ } = t, v = dl(n), [y, b] = e.useState(null), [x, S] = e.useState(null), [C, w] = e.useState(!1), T = wt(u), [E, D] = bt({
		prop: i,
		defaultProp: a ?? !1,
		onChange: o,
		caller: al
	}), [O, k] = bt({
		prop: s,
		defaultProp: c,
		onChange: l,
		caller: al
	}), A = e.useRef(null), j = y ? _ || !!y.closest("form") : !0, [M, N] = e.useState(/* @__PURE__ */ new Set()), P = Array.from(M).map((e) => e.props.value).join(";");
	return /* @__PURE__ */ p(Yo, {
		...v,
		children: /* @__PURE__ */ m(fl, {
			required: g,
			scope: n,
			trigger: y,
			onTriggerChange: b,
			valueNode: x,
			onValueNodeChange: S,
			valueNodeHasChildren: C,
			onValueNodeHasChildrenChange: w,
			contentId: _t(),
			value: O,
			onValueChange: k,
			open: E,
			onOpenChange: D,
			dir: T,
			triggerPointerDownPosRef: A,
			disabled: h,
			children: [/* @__PURE__ */ p(ol.Provider, {
				scope: n,
				children: /* @__PURE__ */ p(ml, {
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
			}), j ? /* @__PURE__ */ m(du, {
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
gl.displayName = al;
var _l = "SelectTrigger", vl = e.forwardRef((t, n) => {
	let { __scopeSelect: r, disabled: i = !1, ...a } = t, o = dl(r), s = pl(_l, r), c = s.disabled || i, l = U(n, s.onTriggerChange), u = sl(r), d = e.useRef("touch"), [f, m, h] = pu((e) => {
		let t = u().filter((e) => !e.disabled), n = mu(t, e, t.find((e) => e.value === s.value));
		n !== void 0 && s.onValueChange(n.value);
	}), g = (e) => {
		c || (s.onOpenChange(!0), h()), e && (s.triggerPointerDownPosRef.current = {
			x: Math.round(e.pageX),
			y: Math.round(e.pageY)
		});
	};
	return /* @__PURE__ */ p(Xo, {
		asChild: !0,
		...o,
		children: /* @__PURE__ */ p(W.button, {
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
			"data-placeholder": fu(s.value) ? "" : void 0,
			...a,
			ref: l,
			onClick: H(a.onClick, (e) => {
				e.currentTarget.focus(), d.current !== "mouse" && g(e);
			}),
			onPointerDown: H(a.onPointerDown, (e) => {
				d.current = e.pointerType;
				let t = e.target;
				t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), e.button === 0 && e.ctrlKey === !1 && e.pointerType === "mouse" && (g(e), e.preventDefault());
			}),
			onKeyDown: H(a.onKeyDown, (e) => {
				let t = f.current !== "";
				!(e.ctrlKey || e.altKey || e.metaKey) && e.key.length === 1 && m(e.key), !(t && e.key === " ") && rl.includes(e.key) && (g(), e.preventDefault());
			})
		})
	});
});
vl.displayName = _l;
var yl = "SelectValue", bl = e.forwardRef((e, t) => {
	let { __scopeSelect: n, className: r, style: i, children: a, placeholder: o = "", ...s } = e, c = pl(yl, n), { onValueNodeHasChildrenChange: l } = c, u = a !== void 0, d = U(t, c.onValueNodeChange);
	return mt(() => {
		l(u);
	}, [l, u]), /* @__PURE__ */ p(W.span, {
		...s,
		ref: d,
		style: { pointerEvents: "none" },
		children: fu(c.value) ? /* @__PURE__ */ p(f, { children: o }) : a
	});
});
bl.displayName = yl;
var xl = "SelectIcon", Sl = e.forwardRef((e, t) => {
	let { __scopeSelect: n, children: r, ...i } = e;
	return /* @__PURE__ */ p(W.span, {
		"aria-hidden": !0,
		...i,
		ref: t,
		children: r || "▼"
	});
});
Sl.displayName = xl;
var Cl = "SelectPortal", wl = (e) => /* @__PURE__ */ p(es, {
	asChild: !0,
	...e
});
wl.displayName = Cl;
var Tl = "SelectContent", El = e.forwardRef((t, n) => {
	let r = pl(Tl, t.__scopeSelect), [i, a] = e.useState();
	if (mt(() => {
		a(new DocumentFragment());
	}, []), !r.open) {
		let e = i;
		return e ? h.createPortal(/* @__PURE__ */ p(Ol, {
			scope: t.__scopeSelect,
			children: /* @__PURE__ */ p(ol.Slot, {
				scope: t.__scopeSelect,
				children: /* @__PURE__ */ p("div", { children: t.children })
			})
		}), e) : null;
	}
	return /* @__PURE__ */ p(Ml, {
		...t,
		ref: n
	});
});
El.displayName = Tl;
var Dl = 10, [Ol, kl] = ll(Tl), Al = "SelectContentImpl", jl = /* @__PURE__ */ at("SelectContent.RemoveScroll"), Ml = e.forwardRef((t, n) => {
	let { __scopeSelect: r, position: i = "item-aligned", onCloseAutoFocus: a, onEscapeKeyDown: o, onPointerDownOutside: s, side: c, sideOffset: l, align: u, alignOffset: d, arrowPadding: f, collisionBoundary: m, collisionPadding: h, sticky: g, hideWhenDetached: _, avoidCollisions: v, ...y } = t, b = pl(Tl, r), [x, S] = e.useState(null), [C, w] = e.useState(null), T = U(n, (e) => S(e)), [E, D] = e.useState(null), [O, k] = e.useState(null), A = sl(r), [j, M] = e.useState(!1), N = e.useRef(!1);
	e.useEffect(() => {
		if (x) return ls(x);
	}, [x]), Zr();
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
	let [R, z] = pu((e) => {
		let t = A().filter((e) => !e.disabled), n = mu(t, e, t.find((e) => e.ref.current === document.activeElement));
		n && setTimeout(() => n.ref.current.focus());
	}), ee = e.useCallback((e, t, n) => {
		let r = !N.current && !n;
		(b.value !== void 0 && b.value === t || r) && (D(e), r && (N.current = !0));
	}, [b.value]), te = e.useCallback(() => x?.focus(), [x]), ne = e.useCallback((e, t, n) => {
		let r = !N.current && !n;
		(b.value !== void 0 && b.value === t || r) && k(e);
	}, [b.value]), re = i === "popper" ? Il : Pl, ie = re === Il ? {
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
	return /* @__PURE__ */ p(Ol, {
		scope: r,
		content: x,
		viewport: C,
		onViewportChange: w,
		itemRefCallback: ee,
		selectedItem: E,
		onItemLeave: te,
		itemTextRefCallback: ne,
		focusSelectedItem: F,
		selectedItemText: O,
		position: i,
		isPositioned: j,
		searchRef: R,
		children: /* @__PURE__ */ p(vc, {
			as: jl,
			allowPinchZoom: !0,
			children: /* @__PURE__ */ p(ri, {
				asChild: !0,
				trapped: b.open,
				onMountAutoFocus: (e) => {
					e.preventDefault();
				},
				onUnmountAutoFocus: H(a, (e) => {
					b.trigger?.focus({ preventScroll: !0 }), e.preventDefault();
				}),
				children: /* @__PURE__ */ p(Ur, {
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
						onKeyDown: H(y.onKeyDown, (e) => {
							let t = e.ctrlKey || e.altKey || e.metaKey;
							if (e.key === "Tab" && e.preventDefault(), !t && e.key.length === 1 && z(e.key), [
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
Ml.displayName = Al;
var Nl = "SelectItemAlignedPosition", Pl = e.forwardRef((t, n) => {
	let { __scopeSelect: r, onPlaced: i, ...a } = t, o = pl(Tl, r), s = kl(Tl, r), [c, l] = e.useState(null), [u, d] = e.useState(null), f = U(n, (e) => d(e)), m = sl(r), h = e.useRef(!1), g = e.useRef(!0), { viewport: _, selectedItem: v, selectedItemText: y, focusSelectedItem: b } = s, x = e.useCallback(() => {
		if (o.trigger && o.valueNode && c && u && _ && v && y) {
			let e = o.trigger.getBoundingClientRect(), t = u.getBoundingClientRect(), n = o.valueNode.getBoundingClientRect(), r = y.getBoundingClientRect();
			if (o.dir !== "rtl") {
				let i = r.left - t.left, a = n.left - i, o = e.left - a, s = e.width + o, l = Math.max(s, t.width), u = window.innerWidth - Dl, d = An(a, [Dl, Math.max(Dl, u - l)]);
				c.style.minWidth = s + "px", c.style.left = d + "px";
			} else {
				let i = t.right - r.right, a = window.innerWidth - n.right - i, o = window.innerWidth - e.right - a, s = e.width + o, l = Math.max(s, t.width), u = window.innerWidth - Dl, d = An(a, [Dl, Math.max(Dl, u - l)]);
				c.style.minWidth = s + "px", c.style.right = d + "px";
			}
			let a = m(), s = window.innerHeight - Dl * 2, l = _.scrollHeight, d = window.getComputedStyle(u), f = parseInt(d.borderTopWidth, 10), p = parseInt(d.paddingTop, 10), g = parseInt(d.borderBottomWidth, 10), b = parseInt(d.paddingBottom, 10), x = f + p + l + b + g, S = Math.min(v.offsetHeight * 5, x), C = window.getComputedStyle(_), w = parseInt(C.paddingTop, 10), T = parseInt(C.paddingBottom, 10), E = e.top + e.height / 2 - Dl, D = s - E, O = v.offsetHeight / 2, k = v.offsetTop + O, A = f + p + k, j = x - A;
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
			c.style.margin = `${Dl}px 0`, c.style.minHeight = S + "px", c.style.maxHeight = s + "px", i?.(), requestAnimationFrame(() => h.current = !0);
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
	mt(() => x(), [x]);
	let [S, C] = e.useState();
	return mt(() => {
		u && C(window.getComputedStyle(u).zIndex);
	}, [u]), /* @__PURE__ */ p(Ll, {
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
			children: /* @__PURE__ */ p(W.div, {
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
Pl.displayName = Nl;
var Fl = "SelectPopperPosition", Il = e.forwardRef((e, t) => {
	let { __scopeSelect: n, align: r = "start", collisionPadding: i = Dl, ...a } = e;
	return /* @__PURE__ */ p(Zo, {
		...dl(n),
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
Il.displayName = Fl;
var [Ll, Rl] = ll(Tl, {}), zl = "SelectViewport", Bl = e.forwardRef((t, n) => {
	let { __scopeSelect: r, nonce: i, ...a } = t, o = kl(zl, r), s = Rl(zl, r), c = U(n, o.onViewportChange), l = e.useRef(0);
	return /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p("style", {
		dangerouslySetInnerHTML: { __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}" },
		nonce: i
	}), /* @__PURE__ */ p(ol.Slot, {
		scope: r,
		children: /* @__PURE__ */ p(W.div, {
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
			onScroll: H(a.onScroll, (e) => {
				let t = e.currentTarget, { contentWrapper: n, shouldExpandOnScrollRef: r } = s;
				if (r?.current && n) {
					let e = Math.abs(l.current - t.scrollTop);
					if (e > 0) {
						let r = window.innerHeight - Dl * 2, i = parseFloat(n.style.minHeight), a = parseFloat(n.style.height), o = Math.max(i, a);
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
Bl.displayName = zl;
var Vl = "SelectGroup", [Hl, Ul] = ll(Vl), Wl = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e, i = _t();
	return /* @__PURE__ */ p(Hl, {
		scope: n,
		id: i,
		children: /* @__PURE__ */ p(W.div, {
			role: "group",
			"aria-labelledby": i,
			...r,
			ref: t
		})
	});
});
Wl.displayName = Vl;
var Gl = "SelectLabel", Kl = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e, i = Ul(Gl, n);
	return /* @__PURE__ */ p(W.div, {
		id: i.id,
		...r,
		ref: t
	});
});
Kl.displayName = Gl;
var ql = "SelectItem", [Jl, Yl] = ll(ql), Xl = e.forwardRef((t, n) => {
	let { __scopeSelect: r, value: i, disabled: a = !1, textValue: o, ...s } = t, c = pl(ql, r), l = kl(ql, r), u = c.value === i, [d, f] = e.useState(o ?? ""), [m, h] = e.useState(!1), g = U(n, (e) => l.itemRefCallback?.(e, i, a)), _ = _t(), v = e.useRef("touch"), y = () => {
		a || (c.onValueChange(i), c.onOpenChange(!1));
	};
	if (i === "") throw Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
	return /* @__PURE__ */ p(Jl, {
		scope: r,
		value: i,
		disabled: a,
		textId: _,
		isSelected: u,
		onItemTextChange: e.useCallback((e) => {
			f((t) => t || (e?.textContent ?? "").trim());
		}, []),
		children: /* @__PURE__ */ p(ol.ItemSlot, {
			scope: r,
			value: i,
			disabled: a,
			textValue: d,
			children: /* @__PURE__ */ p(W.div, {
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
				onFocus: H(s.onFocus, () => h(!0)),
				onBlur: H(s.onBlur, () => h(!1)),
				onClick: H(s.onClick, () => {
					v.current !== "mouse" && y();
				}),
				onPointerUp: H(s.onPointerUp, () => {
					v.current === "mouse" && y();
				}),
				onPointerDown: H(s.onPointerDown, (e) => {
					v.current = e.pointerType;
				}),
				onPointerMove: H(s.onPointerMove, (e) => {
					v.current = e.pointerType, a ? l.onItemLeave?.() : v.current === "mouse" && e.currentTarget.focus({ preventScroll: !0 });
				}),
				onPointerLeave: H(s.onPointerLeave, (e) => {
					e.currentTarget === document.activeElement && l.onItemLeave?.();
				}),
				onKeyDown: H(s.onKeyDown, (e) => {
					l.searchRef?.current !== "" && e.key === " " || (il.includes(e.key) && y(), e.key === " " && e.preventDefault());
				})
			})
		})
	});
});
Xl.displayName = ql;
var Zl = "SelectItemText", Ql = e.forwardRef((t, n) => {
	let { __scopeSelect: r, className: i, style: a, ...o } = t, s = pl(Zl, r), c = kl(Zl, r), l = Yl(Zl, r), u = hl(Zl, r), [d, g] = e.useState(null), _ = U(n, (e) => g(e), l.onItemTextChange, (e) => c.itemTextRefCallback?.(e, l.value, l.disabled)), v = d?.textContent, y = e.useMemo(() => /* @__PURE__ */ p("option", {
		value: l.value,
		disabled: l.disabled,
		children: v
	}, l.value), [
		l.disabled,
		l.value,
		v
	]), { onNativeOptionAdd: b, onNativeOptionRemove: x } = u;
	return mt(() => (b(y), () => x(y)), [
		b,
		x,
		y
	]), /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p(W.span, {
		id: l.textId,
		...o,
		ref: _
	}), l.isSelected && s.valueNode && !s.valueNodeHasChildren ? h.createPortal(o.children, s.valueNode) : null] });
});
Ql.displayName = Zl;
var $l = "SelectItemIndicator", eu = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e;
	return Yl($l, n).isSelected ? /* @__PURE__ */ p(W.span, {
		"aria-hidden": !0,
		...r,
		ref: t
	}) : null;
});
eu.displayName = $l;
var tu = "SelectScrollUpButton", nu = e.forwardRef((t, n) => {
	let r = kl(tu, t.__scopeSelect), i = Rl(tu, t.__scopeSelect), [a, o] = e.useState(!1), s = U(n, i.onScrollButtonChange);
	return mt(() => {
		if (r.viewport && r.isPositioned) {
			let e = function() {
				o(t.scrollTop > 0);
			}, t = r.viewport;
			return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e);
		}
	}, [r.viewport, r.isPositioned]), a ? /* @__PURE__ */ p(au, {
		...t,
		ref: s,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: t } = r;
			e && t && (e.scrollTop -= t.offsetHeight);
		}
	}) : null;
});
nu.displayName = tu;
var ru = "SelectScrollDownButton", iu = e.forwardRef((t, n) => {
	let r = kl(ru, t.__scopeSelect), i = Rl(ru, t.__scopeSelect), [a, o] = e.useState(!1), s = U(n, i.onScrollButtonChange);
	return mt(() => {
		if (r.viewport && r.isPositioned) {
			let e = function() {
				let e = t.scrollHeight - t.clientHeight;
				o(Math.ceil(t.scrollTop) < e);
			}, t = r.viewport;
			return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e);
		}
	}, [r.viewport, r.isPositioned]), a ? /* @__PURE__ */ p(au, {
		...t,
		ref: s,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: t } = r;
			e && t && (e.scrollTop += t.offsetHeight);
		}
	}) : null;
});
iu.displayName = ru;
var au = e.forwardRef((t, n) => {
	let { __scopeSelect: r, onAutoScroll: i, ...a } = t, o = kl("SelectScrollButton", r), s = e.useRef(null), c = sl(r), l = e.useCallback(() => {
		s.current !== null && (window.clearInterval(s.current), s.current = null);
	}, []);
	return e.useEffect(() => () => l(), [l]), mt(() => {
		c().find((e) => e.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
	}, [c]), /* @__PURE__ */ p(W.div, {
		"aria-hidden": !0,
		...a,
		ref: n,
		style: {
			flexShrink: 0,
			...a.style
		},
		onPointerDown: H(a.onPointerDown, () => {
			s.current === null && (s.current = window.setInterval(i, 50));
		}),
		onPointerMove: H(a.onPointerMove, () => {
			o.onItemLeave?.(), s.current === null && (s.current = window.setInterval(i, 50));
		}),
		onPointerLeave: H(a.onPointerLeave, () => {
			l();
		})
	});
}), ou = "SelectSeparator", su = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e;
	return /* @__PURE__ */ p(W.div, {
		"aria-hidden": !0,
		...r,
		ref: t
	});
});
su.displayName = ou;
var cu = "SelectArrow", lu = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e, i = dl(n), a = pl(cu, n), o = kl(cu, n);
	return a.open && o.position === "popper" ? /* @__PURE__ */ p(Qo, {
		...i,
		...r,
		ref: t
	}) : null;
});
lu.displayName = cu;
var uu = "SelectBubbleInput", du = e.forwardRef(({ __scopeSelect: t, value: n, ...r }, i) => {
	let a = e.useRef(null), o = U(i, a), s = qt(n);
	return e.useEffect(() => {
		let e = a.current;
		if (!e) return;
		let t = window.HTMLSelectElement.prototype, r = Object.getOwnPropertyDescriptor(t, "value").set;
		if (s !== n && r) {
			let t = new Event("change", { bubbles: !0 });
			r.call(e, n), e.dispatchEvent(t);
		}
	}, [s, n]), /* @__PURE__ */ p(W.select, {
		...r,
		style: {
			...$c,
			...r.style
		},
		ref: o,
		defaultValue: n
	});
});
du.displayName = uu;
function fu(e) {
	return e === "" || e === void 0;
}
function pu(t) {
	let n = vt(t), r = e.useRef(""), i = e.useRef(0), a = e.useCallback((e) => {
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
function mu(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = hu(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.textValue.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
function hu(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
var gu = gl, _u = vl, vu = bl, yu = Sl, bu = wl, xu = El, Su = Bl, Cu = Xl, wu = Ql, Tu = eu, q = {
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
}, Eu = 8;
function Du({ level: t }) {
	let [n, r] = e.useState(!1), [i, a] = e.useState(""), [o, s] = e.useState(t.value ?? t.defaultValue ?? "");
	e.useEffect(() => {
		t.value !== void 0 && s(t.value);
	}, [t.value]);
	let c = t.value === void 0 ? o : t.value, l = t.options.find((e) => e.value === c), u = i.trim().toLowerCase(), d = u ? t.options.filter((e) => e.label.toLowerCase().includes(u)) : t.options, f = (e) => {
		s(e), t.onChange?.(e), r(!1), a("");
	};
	return /* @__PURE__ */ m(Gc, {
		open: n,
		onOpenChange: (e) => {
			r(e), e || a("");
		},
		children: [/* @__PURE__ */ p(Kc, {
			asChild: !0,
			disabled: t.disabled,
			children: /* @__PURE__ */ m("button", {
				type: "button",
				className: q.trigger,
				children: [/* @__PURE__ */ m("div", {
					className: q.triggerContent,
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
				}), /* @__PURE__ */ p(ue, {
					size: 16,
					className: q.triggerIcon
				})]
			})
		}), /* @__PURE__ */ p(qc, { children: /* @__PURE__ */ m(Jc, {
			className: q.content,
			align: "start",
			sideOffset: 4,
			style: {
				width: 300,
				padding: 0
			},
			children: [/* @__PURE__ */ p("div", {
				className: q.searchBox,
				children: /* @__PURE__ */ m("div", {
					className: q.searchInputWrap,
					children: [/* @__PURE__ */ p(je, {
						size: 14,
						style: {
							position: "absolute",
							left: 9,
							color: "#9CA3AF"
						}
					}), /* @__PURE__ */ p("input", {
						autoFocus: !0,
						className: q.searchInput,
						value: i,
						onChange: (e) => a(e.target.value),
						placeholder: "Buscar…"
					})]
				})
			}), /* @__PURE__ */ p("div", {
				className: q.searchList,
				children: d.length > 0 ? d.map((e) => /* @__PURE__ */ m("button", {
					type: "button",
					className: S(q.searchItem, e.value === c && q.searchItemActive),
					onClick: () => f(e.value),
					children: [/* @__PURE__ */ p("span", {
						style: {
							width: 16,
							display: "flex",
							flexShrink: 0
						},
						children: e.value === c && /* @__PURE__ */ p(se, { size: 15 })
					}), /* @__PURE__ */ p("span", {
						style: {
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap"
						},
						children: e.label
					})]
				}, e.value)) : /* @__PURE__ */ p("div", {
					className: q.searchEmpty,
					children: "Nenhum resultado."
				})
			})]
		}) })]
	});
}
function Ou({ levels: t, className: n }) {
	return /* @__PURE__ */ p("div", {
		className: S(q.container, n),
		children: t.map((n, r) => {
			let i = n.options.length === 1;
			return /* @__PURE__ */ m(e.Fragment, { children: [/* @__PURE__ */ m("div", {
				className: q.levelWrapper,
				children: [n.label && /* @__PURE__ */ p(O, {
					as: "label",
					variant: "p",
					className: q.levelLabel,
					style: { color: "color-mix(in srgb, var(--color-secundaria), transparent 30%)" },
					children: n.label
				}), i ? /* @__PURE__ */ p("div", {
					className: q.trigger,
					style: {
						background: "transparent",
						border: "none",
						boxShadow: "none",
						paddingLeft: 0,
						cursor: "default",
						paddingRight: "12px"
					},
					children: /* @__PURE__ */ m("div", {
						className: q.triggerContent,
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
				}) : n.options.length > Eu ? /* @__PURE__ */ p(Du, { level: n }) : /* @__PURE__ */ m(gu, {
					value: n.value,
					defaultValue: n.defaultValue,
					onValueChange: n.onChange,
					disabled: n.disabled,
					children: [/* @__PURE__ */ m(_u, {
						className: q.trigger,
						children: [/* @__PURE__ */ m("div", {
							className: q.triggerContent,
							children: [n.icon && /* @__PURE__ */ p(n.icon, {
								size: 16,
								style: {
									color: "var(--color-secundaria)",
									opacity: .7
								}
							}), /* @__PURE__ */ p(vu, { placeholder: n.placeholder || "Selecione..." })]
						}), /* @__PURE__ */ p(yu, {
							asChild: !0,
							children: /* @__PURE__ */ p(ue, {
								size: 16,
								className: q.triggerIcon
							})
						})]
					}), /* @__PURE__ */ p(bu, { children: /* @__PURE__ */ p(xu, {
						className: q.content,
						position: "popper",
						sideOffset: 4,
						children: /* @__PURE__ */ p(Su, {
							className: q.viewport,
							children: n.options.map((e) => /* @__PURE__ */ m(Cu, {
								value: e.value,
								className: q.item,
								children: [/* @__PURE__ */ p("span", {
									className: q.itemIndicator,
									children: /* @__PURE__ */ p(Tu, { children: /* @__PURE__ */ p(se, { size: 16 }) })
								}), /* @__PURE__ */ p(wu, { children: e.label })]
							}, e.value))
						})
					}) })]
				})]
			}), r < t.length - 1 && /* @__PURE__ */ p("div", {
				className: q.separator,
				children: /* @__PURE__ */ p(le, {
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
var ku = {
	container: "_container_kluho_1",
	label: "_label_kluho_17",
	trigger: "_trigger_kluho_29",
	triggerError: "_triggerError_kluho_67",
	inputField: "_inputField_kluho_75",
	errorMessage: "_errorMessage_kluho_103",
	removeTagBtn: "_removeTagBtn_kluho_115"
}, Au = i(({ className: e, value: t, defaultValue: n, onChange: r, label: i, error: a, id: o, placeholder: s = "Aperte Enter para adicionar...", ...c }, l) => {
	let [u, f] = d(n || []), [h, g] = d(""), _ = t === void 0 ? u : t, v = !!a, y = o || (i ? `taginput-${i.replace(/\s+/g, "-").toLowerCase()}` : void 0), b = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			let n = h.trim();
			if (n && !_.includes(n)) {
				let e = [..._, n];
				t === void 0 && f(e), r?.(e), g("");
			}
		}
	}, x = (e) => {
		let n = _.filter((t) => t !== e);
		t === void 0 && f(n), r?.(n);
	};
	return /* @__PURE__ */ m("div", {
		className: S(ku.container, e),
		children: [
			i && /* @__PURE__ */ p("label", {
				htmlFor: y,
				className: ku.label,
				children: i
			}),
			/* @__PURE__ */ m("div", {
				className: S(ku.trigger, v && ku.triggerError),
				onClick: () => document.getElementById(y || "")?.focus(),
				children: [_.map((e) => /* @__PURE__ */ m(j, {
					intent: "primaria",
					variant: "solid",
					children: [e, /* @__PURE__ */ p("button", {
						type: "button",
						className: ku.removeTagBtn,
						onClick: (t) => {
							t.stopPropagation(), x(e);
						},
						children: /* @__PURE__ */ p(Ve, { size: 12 })
					})]
				}, e)), /* @__PURE__ */ p("input", {
					id: y,
					ref: l,
					type: "text",
					className: ku.inputField,
					value: h,
					onChange: (e) => g(e.target.value),
					onKeyDown: b,
					placeholder: _.length === 0 ? s : "",
					...c
				})]
			}),
			a && /* @__PURE__ */ p("span", {
				className: ku.errorMessage,
				children: a
			})
		]
	});
});
Au.displayName = "TagInput";
//#endregion
//#region node_modules/@radix-ui/react-menu/dist/index.mjs
var ju = ["Enter", " "], Mu = [
	"ArrowDown",
	"PageUp",
	"Home"
], Nu = [
	"ArrowUp",
	"PageDown",
	"End"
], Pu = [...Mu, ...Nu], Fu = {
	ltr: [...ju, "ArrowRight"],
	rtl: [...ju, "ArrowLeft"]
}, Iu = {
	ltr: ["ArrowLeft"],
	rtl: ["ArrowRight"]
}, Lu = "Menu", [Ru, zu, Bu] = pt(Lu), [Vu, Hu] = rt(Lu, [
	Bu,
	No,
	Mt
]), Uu = No(), Wu = Mt(), [Gu, Ku] = Vu(Lu), [qu, Ju] = Vu(Lu), Yu = (t) => {
	let { __scopeMenu: n, open: r = !1, children: i, dir: a, onOpenChange: o, modal: s = !0 } = t, c = Uu(n), [l, u] = e.useState(null), d = e.useRef(!1), f = vt(o), m = wt(a);
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
	}, []), /* @__PURE__ */ p(Yo, {
		...c,
		children: /* @__PURE__ */ p(Gu, {
			scope: n,
			open: r,
			onOpenChange: f,
			content: l,
			onContentChange: u,
			children: /* @__PURE__ */ p(qu, {
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
Yu.displayName = Lu;
var Xu = "MenuAnchor", Zu = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ p(Xo, {
		...Uu(n),
		...r,
		ref: t
	});
});
Zu.displayName = Xu;
var Qu = "MenuPortal", [$u, ed] = Vu(Qu, { forceMount: void 0 }), td = (e) => {
	let { __scopeMenu: t, forceMount: n, children: r, container: i } = e, a = Ku(Qu, t);
	return /* @__PURE__ */ p($u, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ p(Yt, {
			present: n || a.open,
			children: /* @__PURE__ */ p(es, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
};
td.displayName = Qu;
var nd = "MenuContent", [rd, id] = Vu(nd), ad = e.forwardRef((e, t) => {
	let n = ed(nd, e.__scopeMenu), { forceMount: r = n.forceMount, ...i } = e, a = Ku(nd, e.__scopeMenu), o = Ju(nd, e.__scopeMenu);
	return /* @__PURE__ */ p(Ru.Provider, {
		scope: e.__scopeMenu,
		children: /* @__PURE__ */ p(Yt, {
			present: r || a.open,
			children: /* @__PURE__ */ p(Ru.Slot, {
				scope: e.__scopeMenu,
				children: o.modal ? /* @__PURE__ */ p(od, {
					...i,
					ref: t
				}) : /* @__PURE__ */ p(sd, {
					...i,
					ref: t
				})
			})
		})
	});
}), od = e.forwardRef((t, n) => {
	let r = Ku(nd, t.__scopeMenu), i = e.useRef(null), a = U(n, i);
	return e.useEffect(() => {
		let e = i.current;
		if (e) return ls(e);
	}, []), /* @__PURE__ */ p(ld, {
		...t,
		ref: a,
		trapFocus: r.open,
		disableOutsidePointerEvents: r.open,
		disableOutsideScroll: !0,
		onFocusOutside: H(t.onFocusOutside, (e) => e.preventDefault(), { checkForDefaultPrevented: !1 }),
		onDismiss: () => r.onOpenChange(!1)
	});
}), sd = e.forwardRef((e, t) => {
	let n = Ku(nd, e.__scopeMenu);
	return /* @__PURE__ */ p(ld, {
		...e,
		ref: t,
		trapFocus: !1,
		disableOutsidePointerEvents: !1,
		disableOutsideScroll: !1,
		onDismiss: () => n.onOpenChange(!1)
	});
}), cd = /* @__PURE__ */ at("MenuContent.ScrollLock"), ld = e.forwardRef((t, n) => {
	let { __scopeMenu: r, loop: i = !1, trapFocus: a, onOpenAutoFocus: o, onCloseAutoFocus: s, disableOutsidePointerEvents: c, onEntryFocus: l, onEscapeKeyDown: u, onPointerDownOutside: d, onFocusOutside: f, onInteractOutside: m, onDismiss: h, disableOutsideScroll: g, ..._ } = t, v = Ku(nd, r), y = Ju(nd, r), b = Uu(r), x = Wu(r), S = zu(r), [C, w] = e.useState(null), T = e.useRef(null), E = U(n, T, v.onContentChange), D = e.useRef(0), O = e.useRef(""), k = e.useRef(0), A = e.useRef(null), j = e.useRef("right"), M = e.useRef(0), N = g ? vc : e.Fragment, P = g ? {
		as: cd,
		allowPinchZoom: !0
	} : void 0, F = (e) => {
		let t = O.current + e, n = S().filter((e) => !e.disabled), r = document.activeElement, i = n.find((e) => e.ref.current === r)?.textValue, a = qd(n.map((e) => e.textValue), t, i), o = n.find((e) => e.textValue === a)?.ref.current;
		(function e(t) {
			O.current = t, window.clearTimeout(D.current), t !== "" && (D.current = window.setTimeout(() => e(""), 1e3));
		})(t), o && setTimeout(() => o.focus());
	};
	e.useEffect(() => () => window.clearTimeout(D.current), []), Zr();
	let I = e.useCallback((e) => j.current === A.current?.side && Yd(e, A.current?.area), []);
	return /* @__PURE__ */ p(rd, {
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
			children: /* @__PURE__ */ p(ri, {
				asChild: !0,
				trapped: a,
				onMountAutoFocus: H(o, (e) => {
					e.preventDefault(), T.current?.focus({ preventScroll: !0 });
				}),
				onUnmountAutoFocus: s,
				children: /* @__PURE__ */ p(Ur, {
					asChild: !0,
					disableOutsidePointerEvents: c,
					onEscapeKeyDown: u,
					onPointerDownOutside: d,
					onFocusOutside: f,
					onInteractOutside: m,
					onDismiss: h,
					children: /* @__PURE__ */ p(Wt, {
						asChild: !0,
						...x,
						dir: y.dir,
						orientation: "vertical",
						loop: i,
						currentTabStopId: C,
						onCurrentTabStopIdChange: w,
						onEntryFocus: H(l, (e) => {
							y.isUsingKeyboardRef.current || e.preventDefault();
						}),
						preventScrollOnEntryFocus: !0,
						children: /* @__PURE__ */ p(Zo, {
							role: "menu",
							"aria-orientation": "vertical",
							"data-state": Hd(v.open),
							"data-radix-menu-content": "",
							dir: y.dir,
							...b,
							..._,
							ref: E,
							style: {
								outline: "none",
								..._.style
							},
							onKeyDown: H(_.onKeyDown, (e) => {
								let t = e.target.closest("[data-radix-menu-content]") === e.currentTarget, n = e.ctrlKey || e.altKey || e.metaKey, r = e.key.length === 1;
								t && (e.key === "Tab" && e.preventDefault(), !n && r && F(e.key));
								let i = T.current;
								if (e.target !== i || !Pu.includes(e.key)) return;
								e.preventDefault();
								let a = S().filter((e) => !e.disabled).map((e) => e.ref.current);
								Nu.includes(e.key) && a.reverse(), Gd(a);
							}),
							onBlur: H(t.onBlur, (e) => {
								e.currentTarget.contains(e.target) || (window.clearTimeout(D.current), O.current = "");
							}),
							onPointerMove: H(t.onPointerMove, Xd((e) => {
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
ad.displayName = nd;
var ud = "MenuGroup", dd = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ p(W.div, {
		role: "group",
		...r,
		ref: t
	});
});
dd.displayName = ud;
var fd = "MenuLabel", pd = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ p(W.div, {
		...r,
		ref: t
	});
});
pd.displayName = fd;
var md = "MenuItem", hd = "menu.itemSelect", gd = e.forwardRef((t, n) => {
	let { disabled: r = !1, onSelect: i, ...a } = t, o = e.useRef(null), s = Ju(md, t.__scopeMenu), c = id(md, t.__scopeMenu), l = U(n, o), u = e.useRef(!1), d = () => {
		let e = o.current;
		if (!r && e) {
			let t = new CustomEvent(hd, {
				bubbles: !0,
				cancelable: !0
			});
			e.addEventListener(hd, (e) => i?.(e), { once: !0 }), ft(e, t), t.defaultPrevented ? u.current = !1 : s.onClose();
		}
	};
	return /* @__PURE__ */ p(_d, {
		...a,
		ref: l,
		disabled: r,
		onClick: H(t.onClick, d),
		onPointerDown: (e) => {
			t.onPointerDown?.(e), u.current = !0;
		},
		onPointerUp: H(t.onPointerUp, (e) => {
			u.current || e.currentTarget?.click();
		}),
		onKeyDown: H(t.onKeyDown, (e) => {
			let t = c.searchRef.current !== "";
			r || t && e.key === " " || ju.includes(e.key) && (e.currentTarget.click(), e.preventDefault());
		})
	});
});
gd.displayName = md;
var _d = e.forwardRef((t, n) => {
	let { __scopeMenu: r, disabled: i = !1, textValue: a, ...o } = t, s = id(md, r), c = Wu(r), l = e.useRef(null), u = U(n, l), [d, f] = e.useState(!1), [m, h] = e.useState("");
	return e.useEffect(() => {
		let e = l.current;
		e && h((e.textContent ?? "").trim());
	}, [o.children]), /* @__PURE__ */ p(Ru.ItemSlot, {
		scope: r,
		disabled: i,
		textValue: a ?? m,
		children: /* @__PURE__ */ p(Gt, {
			asChild: !0,
			...c,
			focusable: !i,
			children: /* @__PURE__ */ p(W.div, {
				role: "menuitem",
				"data-highlighted": d ? "" : void 0,
				"aria-disabled": i || void 0,
				"data-disabled": i ? "" : void 0,
				...o,
				ref: u,
				onPointerMove: H(t.onPointerMove, Xd((e) => {
					i ? s.onItemLeave(e) : (s.onItemEnter(e), e.defaultPrevented || e.currentTarget.focus({ preventScroll: !0 }));
				})),
				onPointerLeave: H(t.onPointerLeave, Xd((e) => s.onItemLeave(e))),
				onFocus: H(t.onFocus, () => f(!0)),
				onBlur: H(t.onBlur, () => f(!1))
			})
		})
	});
}), vd = "MenuCheckboxItem", yd = e.forwardRef((e, t) => {
	let { checked: n = !1, onCheckedChange: r, ...i } = e;
	return /* @__PURE__ */ p(Dd, {
		scope: e.__scopeMenu,
		checked: n,
		children: /* @__PURE__ */ p(gd, {
			role: "menuitemcheckbox",
			"aria-checked": Ud(n) ? "mixed" : n,
			...i,
			ref: t,
			"data-state": Wd(n),
			onSelect: H(i.onSelect, () => r?.(Ud(n) ? !0 : !n), { checkForDefaultPrevented: !1 })
		})
	});
});
yd.displayName = vd;
var bd = "MenuRadioGroup", [xd, Sd] = Vu(bd, {
	value: void 0,
	onValueChange: () => {}
}), Cd = e.forwardRef((e, t) => {
	let { value: n, onValueChange: r, ...i } = e, a = vt(r);
	return /* @__PURE__ */ p(xd, {
		scope: e.__scopeMenu,
		value: n,
		onValueChange: a,
		children: /* @__PURE__ */ p(dd, {
			...i,
			ref: t
		})
	});
});
Cd.displayName = bd;
var wd = "MenuRadioItem", Td = e.forwardRef((e, t) => {
	let { value: n, ...r } = e, i = Sd(wd, e.__scopeMenu), a = n === i.value;
	return /* @__PURE__ */ p(Dd, {
		scope: e.__scopeMenu,
		checked: a,
		children: /* @__PURE__ */ p(gd, {
			role: "menuitemradio",
			"aria-checked": a,
			...r,
			ref: t,
			"data-state": Wd(a),
			onSelect: H(r.onSelect, () => i.onValueChange?.(n), { checkForDefaultPrevented: !1 })
		})
	});
});
Td.displayName = wd;
var Ed = "MenuItemIndicator", [Dd, Od] = Vu(Ed, { checked: !1 }), kd = e.forwardRef((e, t) => {
	let { __scopeMenu: n, forceMount: r, ...i } = e, a = Od(Ed, n);
	return /* @__PURE__ */ p(Yt, {
		present: r || Ud(a.checked) || a.checked === !0,
		children: /* @__PURE__ */ p(W.span, {
			...i,
			ref: t,
			"data-state": Wd(a.checked)
		})
	});
});
kd.displayName = Ed;
var Ad = "MenuSeparator", jd = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ p(W.div, {
		role: "separator",
		"aria-orientation": "horizontal",
		...r,
		ref: t
	});
});
jd.displayName = Ad;
var Md = "MenuArrow", Nd = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ p(Qo, {
		...Uu(n),
		...r,
		ref: t
	});
});
Nd.displayName = Md;
var Pd = "MenuSub", [Fd, Id] = Vu(Pd), Ld = (t) => {
	let { __scopeMenu: n, children: r, open: i = !1, onOpenChange: a } = t, o = Ku(Pd, n), s = Uu(n), [c, l] = e.useState(null), [u, d] = e.useState(null), f = vt(a);
	return e.useEffect(() => (o.open === !1 && f(!1), () => f(!1)), [o.open, f]), /* @__PURE__ */ p(Yo, {
		...s,
		children: /* @__PURE__ */ p(Gu, {
			scope: n,
			open: i,
			onOpenChange: f,
			content: u,
			onContentChange: d,
			children: /* @__PURE__ */ p(Fd, {
				scope: n,
				contentId: _t(),
				triggerId: _t(),
				trigger: c,
				onTriggerChange: l,
				children: r
			})
		})
	});
};
Ld.displayName = Pd;
var Rd = "MenuSubTrigger", zd = e.forwardRef((t, n) => {
	let r = Ku(Rd, t.__scopeMenu), i = Ju(Rd, t.__scopeMenu), a = Id(Rd, t.__scopeMenu), o = id(Rd, t.__scopeMenu), s = e.useRef(null), { pointerGraceTimerRef: c, onPointerGraceIntentChange: l } = o, u = { __scopeMenu: t.__scopeMenu }, d = e.useCallback(() => {
		s.current && window.clearTimeout(s.current), s.current = null;
	}, []);
	return e.useEffect(() => d, [d]), e.useEffect(() => {
		let e = c.current;
		return () => {
			window.clearTimeout(e), l(null);
		};
	}, [c, l]), /* @__PURE__ */ p(Zu, {
		asChild: !0,
		...u,
		children: /* @__PURE__ */ p(_d, {
			id: a.triggerId,
			"aria-haspopup": "menu",
			"aria-expanded": r.open,
			"aria-controls": a.contentId,
			"data-state": Hd(r.open),
			...t,
			ref: tt(n, a.onTriggerChange),
			onClick: (e) => {
				t.onClick?.(e), !(t.disabled || e.defaultPrevented) && (e.currentTarget.focus(), r.open || r.onOpenChange(!0));
			},
			onPointerMove: H(t.onPointerMove, Xd((e) => {
				o.onItemEnter(e), !e.defaultPrevented && !t.disabled && !r.open && !s.current && (o.onPointerGraceIntentChange(null), s.current = window.setTimeout(() => {
					r.onOpenChange(!0), d();
				}, 100));
			})),
			onPointerLeave: H(t.onPointerLeave, Xd((e) => {
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
			onKeyDown: H(t.onKeyDown, (e) => {
				let n = o.searchRef.current !== "";
				t.disabled || n && e.key === " " || Fu[i.dir].includes(e.key) && (r.onOpenChange(!0), r.content?.focus(), e.preventDefault());
			})
		})
	});
});
zd.displayName = Rd;
var Bd = "MenuSubContent", Vd = e.forwardRef((t, n) => {
	let r = ed(nd, t.__scopeMenu), { forceMount: i = r.forceMount, ...a } = t, o = Ku(nd, t.__scopeMenu), s = Ju(nd, t.__scopeMenu), c = Id(Bd, t.__scopeMenu), l = e.useRef(null), u = U(n, l);
	return /* @__PURE__ */ p(Ru.Provider, {
		scope: t.__scopeMenu,
		children: /* @__PURE__ */ p(Yt, {
			present: i || o.open,
			children: /* @__PURE__ */ p(Ru.Slot, {
				scope: t.__scopeMenu,
				children: /* @__PURE__ */ p(ld, {
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
					onFocusOutside: H(t.onFocusOutside, (e) => {
						e.target !== c.trigger && o.onOpenChange(!1);
					}),
					onEscapeKeyDown: H(t.onEscapeKeyDown, (e) => {
						s.onClose(), e.preventDefault();
					}),
					onKeyDown: H(t.onKeyDown, (e) => {
						let t = e.currentTarget.contains(e.target), n = Iu[s.dir].includes(e.key);
						t && n && (o.onOpenChange(!1), c.trigger?.focus(), e.preventDefault());
					})
				})
			})
		})
	});
});
Vd.displayName = Bd;
function Hd(e) {
	return e ? "open" : "closed";
}
function Ud(e) {
	return e === "indeterminate";
}
function Wd(e) {
	return Ud(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function Gd(e) {
	let t = document.activeElement;
	for (let n of e) if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function Kd(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
function qd(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = Kd(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
function Jd(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e], s = t[a], c = o.x, l = o.y, u = s.x, d = s.y;
		l > r != d > r && n < (u - c) * (r - l) / (d - l) + c && (i = !i);
	}
	return i;
}
function Yd(e, t) {
	return t ? Jd({
		x: e.clientX,
		y: e.clientY
	}, t) : !1;
}
function Xd(e) {
	return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var Zd = Yu, Qd = Zu, $d = td, ef = ad, tf = dd, nf = pd, rf = gd, af = yd, of = Cd, sf = Td, cf = kd, lf = jd, uf = Nd, df = Ld, ff = zd, pf = Vd, mf = "DropdownMenu", [hf, gf] = rt(mf, [Hu]), _f = Hu(), [vf, yf] = hf(mf), bf = (t) => {
	let { __scopeDropdownMenu: n, children: r, dir: i, open: a, defaultOpen: o, onOpenChange: s, modal: c = !0 } = t, l = _f(n), u = e.useRef(null), [d, f] = bt({
		prop: a,
		defaultProp: o ?? !1,
		onChange: s,
		caller: mf
	});
	return /* @__PURE__ */ p(vf, {
		scope: n,
		triggerId: _t(),
		triggerRef: u,
		contentId: _t(),
		open: d,
		onOpenChange: f,
		onOpenToggle: e.useCallback(() => f((e) => !e), [f]),
		modal: c,
		children: /* @__PURE__ */ p(Zd, {
			...l,
			open: d,
			onOpenChange: f,
			dir: i,
			modal: c,
			children: r
		})
	});
};
bf.displayName = mf;
var xf = "DropdownMenuTrigger", Sf = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, disabled: r = !1, ...i } = e, a = yf(xf, n);
	return /* @__PURE__ */ p(Qd, {
		asChild: !0,
		..._f(n),
		children: /* @__PURE__ */ p(W.button, {
			type: "button",
			id: a.triggerId,
			"aria-haspopup": "menu",
			"aria-expanded": a.open,
			"aria-controls": a.open ? a.contentId : void 0,
			"data-state": a.open ? "open" : "closed",
			"data-disabled": r ? "" : void 0,
			disabled: r,
			...i,
			ref: tt(t, a.triggerRef),
			onPointerDown: H(e.onPointerDown, (e) => {
				!r && e.button === 0 && e.ctrlKey === !1 && (a.onOpenToggle(), a.open || e.preventDefault());
			}),
			onKeyDown: H(e.onKeyDown, (e) => {
				r || (["Enter", " "].includes(e.key) && a.onOpenToggle(), e.key === "ArrowDown" && a.onOpenChange(!0), [
					"Enter",
					" ",
					"ArrowDown"
				].includes(e.key) && e.preventDefault());
			})
		})
	});
});
Sf.displayName = xf;
var Cf = "DropdownMenuPortal", wf = (e) => {
	let { __scopeDropdownMenu: t, ...n } = e;
	return /* @__PURE__ */ p($d, {
		..._f(t),
		...n
	});
};
wf.displayName = Cf;
var Tf = "DropdownMenuContent", Ef = e.forwardRef((t, n) => {
	let { __scopeDropdownMenu: r, ...i } = t, a = yf(Tf, r), o = _f(r), s = e.useRef(!1);
	return /* @__PURE__ */ p(ef, {
		id: a.contentId,
		"aria-labelledby": a.triggerId,
		...o,
		...i,
		ref: n,
		onCloseAutoFocus: H(t.onCloseAutoFocus, (e) => {
			s.current || a.triggerRef.current?.focus(), s.current = !1, e.preventDefault();
		}),
		onInteractOutside: H(t.onInteractOutside, (e) => {
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
Ef.displayName = Tf;
var Df = "DropdownMenuGroup", Of = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(tf, {
		..._f(n),
		...r,
		ref: t
	});
});
Of.displayName = Df;
var kf = "DropdownMenuLabel", Af = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(nf, {
		..._f(n),
		...r,
		ref: t
	});
});
Af.displayName = kf;
var jf = "DropdownMenuItem", Mf = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(rf, {
		..._f(n),
		...r,
		ref: t
	});
});
Mf.displayName = jf;
var Nf = "DropdownMenuCheckboxItem", Pf = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(af, {
		..._f(n),
		...r,
		ref: t
	});
});
Pf.displayName = Nf;
var Ff = "DropdownMenuRadioGroup", If = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(of, {
		..._f(n),
		...r,
		ref: t
	});
});
If.displayName = Ff;
var Lf = "DropdownMenuRadioItem", Rf = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(sf, {
		..._f(n),
		...r,
		ref: t
	});
});
Rf.displayName = Lf;
var zf = "DropdownMenuItemIndicator", Bf = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(cf, {
		..._f(n),
		...r,
		ref: t
	});
});
Bf.displayName = zf;
var Vf = "DropdownMenuSeparator", Hf = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(lf, {
		..._f(n),
		...r,
		ref: t
	});
});
Hf.displayName = Vf;
var Uf = "DropdownMenuArrow", Wf = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(uf, {
		..._f(n),
		...r,
		ref: t
	});
});
Wf.displayName = Uf;
var Gf = (e) => {
	let { __scopeDropdownMenu: t, children: n, open: r, onOpenChange: i, defaultOpen: a } = e, o = _f(t), [s, c] = bt({
		prop: r,
		defaultProp: a ?? !1,
		onChange: i,
		caller: "DropdownMenuSub"
	});
	return /* @__PURE__ */ p(df, {
		...o,
		open: s,
		onOpenChange: c,
		children: n
	});
}, Kf = "DropdownMenuSubTrigger", qf = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(ff, {
		..._f(n),
		...r,
		ref: t
	});
});
qf.displayName = Kf;
var Jf = "DropdownMenuSubContent", Yf = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(pf, {
		..._f(n),
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
Yf.displayName = Jf;
var Xf = bf, Zf = Sf, Qf = wf, $f = Ef, ep = Of, tp = Af, np = Mf, rp = Pf, ip = If, ap = Rf, op = Bf, sp = Hf, cp = Gf, lp = qf, up = Yf, dp = {
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
}, fp = Xf, pp = Zf, mp = ep, hp = Qf, gp = cp, _p = ip, vp = e.forwardRef(({ className: e, inset: t, children: n, ...r }, i) => /* @__PURE__ */ m(lp, {
	ref: i,
	className: S(dp.subTrigger, t && dp.inset, e),
	...r,
	children: [n, /* @__PURE__ */ p(le, { className: "ml-auto h-4 w-4" })]
}));
vp.displayName = lp.displayName;
var yp = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p(up, {
	ref: n,
	className: S(dp.subContent, e),
	...t
}));
yp.displayName = up.displayName;
var bp = e.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ p(Qf, { children: /* @__PURE__ */ p($f, {
	ref: r,
	sideOffset: t,
	className: S(dp.content, e),
	...n
}) }));
bp.displayName = $f.displayName;
var xp = e.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ p(np, {
	ref: r,
	className: S(dp.item, t && dp.inset, e),
	...n
}));
xp.displayName = np.displayName;
var Sp = e.forwardRef(({ className: e, children: t, checked: n, ...r }, i) => /* @__PURE__ */ m(rp, {
	ref: i,
	className: S(dp.checkboxItem, e),
	checked: n,
	...r,
	children: [/* @__PURE__ */ p("span", {
		className: dp.indicator,
		children: /* @__PURE__ */ p(op, { children: /* @__PURE__ */ p(se, { className: "h-4 w-4" }) })
	}), t]
}));
Sp.displayName = rp.displayName;
var Cp = e.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ m(ap, {
	ref: r,
	className: S(dp.radioItem, e),
	...n,
	children: [/* @__PURE__ */ p("span", {
		className: dp.indicator,
		children: /* @__PURE__ */ p(op, { children: /* @__PURE__ */ p(fe, { className: "h-2 w-2 fill-current" }) })
	}), t]
}));
Cp.displayName = ap.displayName;
var wp = e.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ p(tp, {
	ref: r,
	className: S(dp.label, t && dp.inset, e),
	...n
}));
wp.displayName = tp.displayName;
var Tp = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p(sp, {
	ref: n,
	className: S(dp.separator, e),
	...t
}));
Tp.displayName = sp.displayName;
var Ep = ({ className: e, ...t }) => /* @__PURE__ */ p("span", {
	className: S(dp.shortcut, e),
	...t
});
Ep.displayName = "DropdownMenuShortcut";
var Dp = {
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
function Op({ data: e, columns: t, keyExtractor: n, actions: r, onSelectionChange: i, className: a, selectable: o = !0 }) {
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
		className: S(Dp.wrapper, a),
		children: /* @__PURE__ */ p("div", {
			className: Dp.scrollContainer,
			children: /* @__PURE__ */ m("table", {
				className: Dp.table,
				children: [/* @__PURE__ */ p("thead", {
					className: Dp.thead,
					children: /* @__PURE__ */ m("tr", { children: [
						o && /* @__PURE__ */ p("th", {
							className: Dp.checkboxCell,
							children: /* @__PURE__ */ p($e, {
								checked: h,
								onChange: (e) => g(e.target.checked)
							})
						}),
						t.map((e, t) => /* @__PURE__ */ p("th", {
							className: Dp.th,
							children: /* @__PURE__ */ m("div", {
								className: Dp.thContent,
								children: [e.header, e.sortable && e.accessorKey && /* @__PURE__ */ p("button", {
									className: Dp.sortButton,
									onClick: () => v(e.accessorKey),
									children: /* @__PURE__ */ p(z, {
										size: 14,
										className: u?.key === e.accessorKey ? Dp.sortIconActive : Dp.sortIconInactive
									})
								})]
							})
						}, t)),
						r && /* @__PURE__ */ p("th", { className: Dp.actionsCell })
					] })
				}), /* @__PURE__ */ p("tbody", { children: y.length === 0 ? /* @__PURE__ */ p("tr", { children: /* @__PURE__ */ p("td", {
					colSpan: 100,
					className: Dp.emptyState,
					children: "Nenhum dado encontrado."
				}) }) : y.map((e) => {
					let i = n(e), a = s.has(i);
					return /* @__PURE__ */ m("tr", {
						className: S(Dp.tr, a && Dp.trSelected),
						children: [
							o && /* @__PURE__ */ p("td", {
								className: Dp.checkboxCell,
								children: /* @__PURE__ */ p($e, {
									checked: a,
									onChange: (e) => _(i, e.target.checked)
								})
							}),
							t.map((t, n) => /* @__PURE__ */ p("td", {
								className: Dp.td,
								children: t.cell ? t.cell(e) : String(e[t.accessorKey] || "")
							}, n)),
							r && /* @__PURE__ */ p("td", {
								className: Dp.actionsCell,
								children: /* @__PURE__ */ m(fp, { children: [/* @__PURE__ */ p(pp, {
									asChild: !0,
									children: /* @__PURE__ */ p(Je, {
										variant: "ghost",
										size: "sm",
										children: /* @__PURE__ */ p(ve, { size: 16 })
									})
								}), /* @__PURE__ */ m(bp, {
									align: "end",
									children: [
										/* @__PURE__ */ p(wp, { children: "Ações" }),
										/* @__PURE__ */ p(Tp, {}),
										r.map((t, n) => /* @__PURE__ */ p(xp, {
											onClick: () => t.onClick(e),
											className: S(t.isDestructive && Dp.destructiveItem),
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
var kp = 365.2425, Ap = 6048e5, jp = 864e5, Mp = 3600 * 24;
Mp * 7, Mp * kp / 12 * 3;
var Np = Symbol.for("constructDateFrom");
//#endregion
//#region node_modules/date-fns/constructFrom.js
function Pp(e, t) {
	return typeof e == "function" ? e(t) : e && typeof e == "object" && Np in e ? e[Np](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
//#endregion
//#region node_modules/date-fns/toDate.js
function J(e, t) {
	return Pp(t || e, e);
}
//#endregion
//#region node_modules/date-fns/addDays.js
function Fp(e, t, n) {
	let r = J(e, n?.in);
	return isNaN(t) ? Pp(n?.in || e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
//#endregion
//#region node_modules/date-fns/addMonths.js
function Ip(e, t, n) {
	let r = J(e, n?.in);
	if (isNaN(t)) return Pp(n?.in || e, NaN);
	if (!t) return r;
	let i = r.getDate(), a = Pp(n?.in || e, r.getTime());
	return a.setMonth(r.getMonth() + t + 1, 0), i >= a.getDate() ? a : (r.setFullYear(a.getFullYear(), a.getMonth(), i), r);
}
//#endregion
//#region node_modules/date-fns/_lib/defaultOptions.js
var Lp = {};
function Rp() {
	return Lp;
}
//#endregion
//#region node_modules/date-fns/startOfWeek.js
function zp(e, t) {
	let n = Rp(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, i = J(e, t?.in), a = i.getDay(), o = (a < r ? 7 : 0) + a - r;
	return i.setDate(i.getDate() - o), i.setHours(0, 0, 0, 0), i;
}
//#endregion
//#region node_modules/date-fns/startOfISOWeek.js
function Bp(e, t) {
	return zp(e, {
		...t,
		weekStartsOn: 1
	});
}
//#endregion
//#region node_modules/date-fns/getISOWeekYear.js
function Vp(e, t) {
	let n = J(e, t?.in), r = n.getFullYear(), i = Pp(n, 0);
	i.setFullYear(r + 1, 0, 4), i.setHours(0, 0, 0, 0);
	let a = Bp(i), o = Pp(n, 0);
	o.setFullYear(r, 0, 4), o.setHours(0, 0, 0, 0);
	let s = Bp(o);
	return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= s.getTime() ? r : r - 1;
}
//#endregion
//#region node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js
function Hp(e) {
	let t = J(e), n = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()));
	return n.setUTCFullYear(t.getFullYear()), e - +n;
}
//#endregion
//#region node_modules/date-fns/_lib/normalizeDates.js
function Up(e, ...t) {
	let n = Pp.bind(null, e || t.find((e) => typeof e == "object"));
	return t.map(n);
}
//#endregion
//#region node_modules/date-fns/startOfDay.js
function Wp(e, t) {
	let n = J(e, t?.in);
	return n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/date-fns/differenceInCalendarDays.js
function Gp(e, t, n) {
	let [r, i] = Up(n?.in, e, t), a = Wp(r), o = Wp(i), s = +a - Hp(a), c = +o - Hp(o);
	return Math.round((s - c) / jp);
}
//#endregion
//#region node_modules/date-fns/startOfISOWeekYear.js
function Kp(e, t) {
	let n = Vp(e, t), r = Pp(t?.in || e, 0);
	return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), Bp(r);
}
//#endregion
//#region node_modules/date-fns/addWeeks.js
function qp(e, t, n) {
	return Fp(e, t * 7, n);
}
//#endregion
//#region node_modules/date-fns/addYears.js
function Jp(e, t, n) {
	return Ip(e, t * 12, n);
}
//#endregion
//#region node_modules/date-fns/max.js
function Yp(e, t) {
	let n, r = t?.in;
	return e.forEach((e) => {
		!r && typeof e == "object" && (r = Pp.bind(null, e));
		let t = J(e, r);
		(!n || n < t || isNaN(+t)) && (n = t);
	}), Pp(r, n || NaN);
}
//#endregion
//#region node_modules/date-fns/min.js
function Xp(e, t) {
	let n, r = t?.in;
	return e.forEach((e) => {
		!r && typeof e == "object" && (r = Pp.bind(null, e));
		let t = J(e, r);
		(!n || n > t || isNaN(+t)) && (n = t);
	}), Pp(r, n || NaN);
}
//#endregion
//#region node_modules/date-fns/isSameDay.js
function Zp(e, t, n) {
	let [r, i] = Up(n?.in, e, t);
	return +Wp(r) == +Wp(i);
}
//#endregion
//#region node_modules/date-fns/isDate.js
function Qp(e) {
	return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
//#endregion
//#region node_modules/date-fns/isValid.js
function $p(e) {
	return !(!Qp(e) && typeof e != "number" || isNaN(+J(e)));
}
//#endregion
//#region node_modules/date-fns/differenceInCalendarMonths.js
function em(e, t, n) {
	let [r, i] = Up(n?.in, e, t), a = r.getFullYear() - i.getFullYear(), o = r.getMonth() - i.getMonth();
	return a * 12 + o;
}
//#endregion
//#region node_modules/date-fns/endOfMonth.js
function tm(e, t) {
	let n = J(e, t?.in), r = n.getMonth();
	return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
//#endregion
//#region node_modules/date-fns/_lib/normalizeInterval.js
function nm(e, t) {
	let [n, r] = Up(e, t.start, t.end);
	return {
		start: n,
		end: r
	};
}
//#endregion
//#region node_modules/date-fns/eachMonthOfInterval.js
function rm(e, t) {
	let { start: n, end: r } = nm(t?.in, e), i = +n > +r, a = i ? +n : +r, o = i ? r : n;
	o.setHours(0, 0, 0, 0), o.setDate(1);
	let s = t?.step ?? 1;
	if (!s) return [];
	s < 0 && (s = -s, i = !i);
	let c = [];
	for (; +o <= a;) c.push(Pp(n, o)), o.setMonth(o.getMonth() + s);
	return i ? c.reverse() : c;
}
//#endregion
//#region node_modules/date-fns/startOfMonth.js
function im(e, t) {
	let n = J(e, t?.in);
	return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/date-fns/endOfYear.js
function am(e, t) {
	let n = J(e, t?.in), r = n.getFullYear();
	return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
//#endregion
//#region node_modules/date-fns/startOfYear.js
function om(e, t) {
	let n = J(e, t?.in);
	return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/date-fns/eachYearOfInterval.js
function sm(e, t) {
	let { start: n, end: r } = nm(t?.in, e), i = +n > +r, a = i ? +n : +r, o = i ? r : n;
	o.setHours(0, 0, 0, 0), o.setMonth(0, 1);
	let s = t?.step ?? 1;
	if (!s) return [];
	s < 0 && (s = -s, i = !i);
	let c = [];
	for (; +o <= a;) c.push(Pp(n, o)), o.setFullYear(o.getFullYear() + s);
	return i ? c.reverse() : c;
}
//#endregion
//#region node_modules/date-fns/endOfWeek.js
function cm(e, t) {
	let n = Rp(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, i = J(e, t?.in), a = i.getDay(), o = (a < r ? -7 : 0) + 6 - (a - r);
	return i.setDate(i.getDate() + o), i.setHours(23, 59, 59, 999), i;
}
//#endregion
//#region node_modules/date-fns/endOfISOWeek.js
function lm(e, t) {
	return cm(e, {
		...t,
		weekStartsOn: 1
	});
}
//#endregion
//#region node_modules/date-fns/locale/en-US/_lib/formatDistance.js
var um = {
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
}, dm = (e, t, n) => {
	let r, i = um[e];
	return r = typeof i == "string" ? i : t === 1 ? i.one : i.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
//#endregion
//#region node_modules/date-fns/locale/_lib/buildFormatLongFn.js
function fm(e) {
	return (t = {}) => {
		let n = t.width ? String(t.width) : e.defaultWidth;
		return e.formats[n] || e.formats[e.defaultWidth];
	};
}
var pm = {
	date: fm({
		formats: {
			full: "EEEE, MMMM do, y",
			long: "MMMM do, y",
			medium: "MMM d, y",
			short: "MM/dd/yyyy"
		},
		defaultWidth: "full"
	}),
	time: fm({
		formats: {
			full: "h:mm:ss a zzzz",
			long: "h:mm:ss a z",
			medium: "h:mm:ss a",
			short: "h:mm a"
		},
		defaultWidth: "full"
	}),
	dateTime: fm({
		formats: {
			full: "{{date}} 'at' {{time}}",
			long: "{{date}} 'at' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, mm = {
	lastWeek: "'last' eeee 'at' p",
	yesterday: "'yesterday at' p",
	today: "'today at' p",
	tomorrow: "'tomorrow at' p",
	nextWeek: "eeee 'at' p",
	other: "P"
}, hm = (e, t, n, r) => mm[e];
//#endregion
//#region node_modules/date-fns/locale/_lib/buildLocalizeFn.js
function gm(e) {
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
var _m = {
	ordinalNumber: (e, t) => {
		let n = Number(e), r = n % 100;
		if (r > 20 || r < 10) switch (r % 10) {
			case 1: return n + "st";
			case 2: return n + "nd";
			case 3: return n + "rd";
		}
		return n + "th";
	},
	era: gm({
		values: {
			narrow: ["B", "A"],
			abbreviated: ["BC", "AD"],
			wide: ["Before Christ", "Anno Domini"]
		},
		defaultWidth: "wide"
	}),
	quarter: gm({
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
	month: gm({
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
	day: gm({
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
	dayPeriod: gm({
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
function vm(e) {
	return (t, n = {}) => {
		let r = n.width, i = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(i);
		if (!a) return null;
		let o = a[0], s = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(s) ? bm(s, (e) => e.test(o)) : ym(s, (e) => e.test(o)), l;
		l = e.valueCallback ? e.valueCallback(c) : c, l = n.valueCallback ? n.valueCallback(l) : l;
		let u = t.slice(o.length);
		return {
			value: l,
			rest: u
		};
	};
}
function ym(e, t) {
	for (let n in e) if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n])) return n;
}
function bm(e, t) {
	for (let n = 0; n < e.length; n++) if (t(e[n])) return n;
}
//#endregion
//#region node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
function xm(e) {
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
var Sm = {
	code: "en-US",
	formatDistance: dm,
	formatLong: pm,
	formatRelative: hm,
	localize: _m,
	match: {
		ordinalNumber: xm({
			matchPattern: /^(\d+)(th|st|nd|rd)?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: vm({
			matchPatterns: {
				narrow: /^(b|a)/i,
				abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
				wide: /^(before christ|before common era|anno domini|common era)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^b/i, /^(a|c)/i] },
			defaultParseWidth: "any"
		}),
		quarter: vm({
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
		month: vm({
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
		day: vm({
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
		dayPeriod: vm({
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
function Cm(e, t) {
	let n = J(e, t?.in);
	return Gp(n, om(n)) + 1;
}
//#endregion
//#region node_modules/date-fns/getISOWeek.js
function wm(e, t) {
	let n = J(e, t?.in), r = Bp(n) - +Kp(n);
	return Math.round(r / Ap) + 1;
}
//#endregion
//#region node_modules/date-fns/getWeekYear.js
function Tm(e, t) {
	let n = J(e, t?.in), r = n.getFullYear(), i = Rp(), a = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? i.firstWeekContainsDate ?? i.locale?.options?.firstWeekContainsDate ?? 1, o = Pp(t?.in || e, 0);
	o.setFullYear(r + 1, 0, a), o.setHours(0, 0, 0, 0);
	let s = zp(o, t), c = Pp(t?.in || e, 0);
	c.setFullYear(r, 0, a), c.setHours(0, 0, 0, 0);
	let l = zp(c, t);
	return +n >= +s ? r + 1 : +n >= +l ? r : r - 1;
}
//#endregion
//#region node_modules/date-fns/startOfWeekYear.js
function Em(e, t) {
	let n = Rp(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, i = Tm(e, t), a = Pp(t?.in || e, 0);
	return a.setFullYear(i, 0, r), a.setHours(0, 0, 0, 0), zp(a, t);
}
//#endregion
//#region node_modules/date-fns/getWeek.js
function Dm(e, t) {
	let n = J(e, t?.in), r = zp(n, t) - +Em(n, t);
	return Math.round(r / Ap) + 1;
}
//#endregion
//#region node_modules/date-fns/_lib/addLeadingZeros.js
function Y(e, t) {
	return (e < 0 ? "-" : "") + Math.abs(e).toString().padStart(t, "0");
}
//#endregion
//#region node_modules/date-fns/_lib/format/lightFormatters.js
var Om = {
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
}, km = {
	am: "am",
	pm: "pm",
	midnight: "midnight",
	noon: "noon",
	morning: "morning",
	afternoon: "afternoon",
	evening: "evening",
	night: "night"
}, Am = {
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
		return Om.y(e, t);
	},
	Y: function(e, t, n, r) {
		let i = Tm(e, r), a = i > 0 ? i : 1 - i;
		return t === "YY" ? Y(a % 100, 2) : t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : Y(a, t.length);
	},
	R: function(e, t) {
		return Y(Vp(e), t.length);
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
			case "MM": return Om.M(e, t);
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
		let i = Dm(e, r);
		return t === "wo" ? n.ordinalNumber(i, { unit: "week" }) : Y(i, t.length);
	},
	I: function(e, t, n) {
		let r = wm(e);
		return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : Y(r, t.length);
	},
	d: function(e, t, n) {
		return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Om.d(e, t);
	},
	D: function(e, t, n) {
		let r = Cm(e);
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
		switch (i = r === 12 ? km.noon : r === 0 ? km.midnight : r / 12 >= 1 ? "pm" : "am", t) {
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
		switch (i = r >= 17 ? km.evening : r >= 12 ? km.afternoon : r >= 4 ? km.morning : km.night, t) {
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
		return Om.h(e, t);
	},
	H: function(e, t, n) {
		return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Om.H(e, t);
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
		return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Om.m(e, t);
	},
	s: function(e, t, n) {
		return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : Om.s(e, t);
	},
	S: function(e, t) {
		return Om.S(e, t);
	},
	X: function(e, t, n) {
		let r = e.getTimezoneOffset();
		if (r === 0) return "Z";
		switch (t) {
			case "X": return Mm(r);
			case "XXXX":
			case "XX": return Nm(r);
			default: return Nm(r, ":");
		}
	},
	x: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "x": return Mm(r);
			case "xxxx":
			case "xx": return Nm(r);
			default: return Nm(r, ":");
		}
	},
	O: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "O":
			case "OO":
			case "OOO": return "GMT" + jm(r, ":");
			default: return "GMT" + Nm(r, ":");
		}
	},
	z: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "z":
			case "zz":
			case "zzz": return "GMT" + jm(r, ":");
			default: return "GMT" + Nm(r, ":");
		}
	},
	t: function(e, t, n) {
		return Y(Math.trunc(e / 1e3), t.length);
	},
	T: function(e, t, n) {
		return Y(+e, t.length);
	}
};
function jm(e, t = "") {
	let n = e > 0 ? "-" : "+", r = Math.abs(e), i = Math.trunc(r / 60), a = r % 60;
	return a === 0 ? n + String(i) : n + String(i) + t + Y(a, 2);
}
function Mm(e, t) {
	return e % 60 == 0 ? (e > 0 ? "-" : "+") + Y(Math.abs(e) / 60, 2) : Nm(e, t);
}
function Nm(e, t = "") {
	let n = e > 0 ? "-" : "+", r = Math.abs(e), i = Y(Math.trunc(r / 60), 2), a = Y(r % 60, 2);
	return n + i + t + a;
}
//#endregion
//#region node_modules/date-fns/_lib/format/longFormatters.js
var Pm = (e, t) => {
	switch (e) {
		case "P": return t.date({ width: "short" });
		case "PP": return t.date({ width: "medium" });
		case "PPP": return t.date({ width: "long" });
		default: return t.date({ width: "full" });
	}
}, Fm = (e, t) => {
	switch (e) {
		case "p": return t.time({ width: "short" });
		case "pp": return t.time({ width: "medium" });
		case "ppp": return t.time({ width: "long" });
		default: return t.time({ width: "full" });
	}
}, Im = {
	p: Fm,
	P: (e, t) => {
		let n = e.match(/(P+)(p+)?/) || [], r = n[1], i = n[2];
		if (!i) return Pm(e, t);
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
		return a.replace("{{date}}", Pm(r, t)).replace("{{time}}", Fm(i, t));
	}
}, Lm = /^D+$/, Rm = /^Y+$/, zm = [
	"D",
	"DD",
	"YY",
	"YYYY"
];
function Bm(e) {
	return Lm.test(e);
}
function Vm(e) {
	return Rm.test(e);
}
function Hm(e, t, n) {
	let r = Um(e, t, n);
	if (console.warn(r), zm.includes(e)) throw RangeError(r);
}
function Um(e, t, n) {
	let r = e[0] === "Y" ? "years" : "days of the month";
	return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
//#endregion
//#region node_modules/date-fns/format.js
var Wm = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Gm = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Km = /^'([^]*?)'?$/, qm = /''/g, Jm = /[a-zA-Z]/;
function Ym(e, t, n) {
	let r = Rp(), i = n?.locale ?? r.locale ?? Sm, a = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, o = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, s = J(e, n?.in);
	if (!$p(s)) throw RangeError("Invalid time value");
	let c = t.match(Gm).map((e) => {
		let t = e[0];
		if (t === "p" || t === "P") {
			let n = Im[t];
			return n(e, i.formatLong);
		}
		return e;
	}).join("").match(Wm).map((e) => {
		if (e === "''") return {
			isToken: !1,
			value: "'"
		};
		let t = e[0];
		if (t === "'") return {
			isToken: !1,
			value: Xm(e)
		};
		if (Am[t]) return {
			isToken: !0,
			value: e
		};
		if (t.match(Jm)) throw RangeError("Format string contains an unescaped latin alphabet character `" + t + "`");
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
		(!n?.useAdditionalWeekYearTokens && Vm(a) || !n?.useAdditionalDayOfYearTokens && Bm(a)) && Hm(a, t, String(e));
		let o = Am[a[0]];
		return o(s, a, i.localize, l);
	}).join("");
}
function Xm(e) {
	let t = e.match(Km);
	return t ? t[1].replace(qm, "'") : e;
}
//#endregion
//#region node_modules/date-fns/getDaysInMonth.js
function Zm(e, t) {
	let n = J(e, t?.in), r = n.getFullYear(), i = n.getMonth(), a = Pp(n, 0);
	return a.setFullYear(r, i + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
//#endregion
//#region node_modules/date-fns/getMonth.js
function Qm(e, t) {
	return J(e, t?.in).getMonth();
}
//#endregion
//#region node_modules/date-fns/getYear.js
function $m(e, t) {
	return J(e, t?.in).getFullYear();
}
//#endregion
//#region node_modules/date-fns/isAfter.js
function eh(e, t) {
	return +J(e) > +J(t);
}
//#endregion
//#region node_modules/date-fns/isBefore.js
function th(e, t) {
	return +J(e) < +J(t);
}
//#endregion
//#region node_modules/date-fns/isSameMonth.js
function nh(e, t, n) {
	let [r, i] = Up(n?.in, e, t);
	return r.getFullYear() === i.getFullYear() && r.getMonth() === i.getMonth();
}
//#endregion
//#region node_modules/date-fns/isSameYear.js
function rh(e, t, n) {
	let [r, i] = Up(n?.in, e, t);
	return r.getFullYear() === i.getFullYear();
}
//#endregion
//#region node_modules/date-fns/setMonth.js
function ih(e, t, n) {
	let r = J(e, n?.in), i = r.getFullYear(), a = r.getDate(), o = Pp(n?.in || e, 0);
	o.setFullYear(i, t, 15), o.setHours(0, 0, 0, 0);
	let s = Zm(o);
	return r.setMonth(t, Math.min(a, s)), r;
}
//#endregion
//#region node_modules/date-fns/setYear.js
function ah(e, t, n) {
	let r = J(e, n?.in);
	return isNaN(+r) ? Pp(n?.in || e, NaN) : (r.setFullYear(t), r);
}
//#endregion
//#region node_modules/date-fns/locale/pt-BR/_lib/formatDistance.js
var oh = {
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
}, sh = (e, t, n) => {
	let r, i = oh[e];
	return r = typeof i == "string" ? i : t === 1 ? i.one : i.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? "em " + r : "há " + r : r;
}, ch = {
	date: fm({
		formats: {
			full: "EEEE, d 'de' MMMM 'de' y",
			long: "d 'de' MMMM 'de' y",
			medium: "d MMM y",
			short: "dd/MM/yyyy"
		},
		defaultWidth: "full"
	}),
	time: fm({
		formats: {
			full: "HH:mm:ss zzzz",
			long: "HH:mm:ss z",
			medium: "HH:mm:ss",
			short: "HH:mm"
		},
		defaultWidth: "full"
	}),
	dateTime: fm({
		formats: {
			full: "{{date}} 'às' {{time}}",
			long: "{{date}} 'às' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, lh = {
	lastWeek: (e) => {
		let t = e.getDay();
		return "'" + (t === 0 || t === 6 ? "último" : "última") + "' eeee 'às' p";
	},
	yesterday: "'ontem às' p",
	today: "'hoje às' p",
	tomorrow: "'amanhã às' p",
	nextWeek: "eeee 'às' p",
	other: "P"
}, uh = {
	code: "pt-BR",
	formatDistance: sh,
	formatLong: ch,
	formatRelative: (e, t, n, r) => {
		let i = lh[e];
		return typeof i == "function" ? i(t) : i;
	},
	localize: {
		ordinalNumber: (e, t) => {
			let n = Number(e);
			return t?.unit === "week" ? n + "ª" : n + "º";
		},
		era: gm({
			values: {
				narrow: ["AC", "DC"],
				abbreviated: ["AC", "DC"],
				wide: ["antes de cristo", "depois de cristo"]
			},
			defaultWidth: "wide"
		}),
		quarter: gm({
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
		month: gm({
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
		day: gm({
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
		dayPeriod: gm({
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
		ordinalNumber: xm({
			matchPattern: /^(\d+)[ºªo]?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: vm({
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
		quarter: vm({
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
		month: vm({
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
		day: vm({
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
		dayPeriod: vm({
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
function dh(e, t, n = "long") {
	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		timeZone: e,
		timeZoneName: n
	}).format(t).split(/\s/g).slice(2).join(" ");
}
//#endregion
//#region node_modules/@date-fns/tz/tzOffset/index.js
var fh = {}, ph = {};
function mh(e, t) {
	try {
		let n = (fh[e] ||= new Intl.DateTimeFormat("en-US", {
			timeZone: e,
			timeZoneName: "longOffset"
		}).format)(t).split("GMT")[1];
		return n in ph ? ph[n] : gh(n, n.split(":"));
	} catch {
		if (e in ph) return ph[e];
		let t = e?.match(hh);
		return t ? gh(e, t.slice(1)) : NaN;
	}
}
var hh = /([+-]\d\d):?(\d\d)?/;
function gh(e, t) {
	let n = +(t[0] || 0), r = +(t[1] || 0), i = (t[2] || 0) / 60;
	return ph[e] = n * 60 + r > 0 ? n * 60 + r + i : n * 60 - r - i;
}
//#endregion
//#region node_modules/@date-fns/tz/date/mini.js
var _h = class e extends Date {
	constructor(...e) {
		super(), e.length > 1 && typeof e[e.length - 1] == "string" && (this.timeZone = e.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(mh(this.timeZone, this)) ? this.setTime(NaN) : e.length ? typeof e[0] == "number" && (e.length === 1 || e.length === 2 && typeof e[1] != "number") ? this.setTime(e[0]) : typeof e[0] == "string" ? this.setTime(+new Date(e[0])) : e[0] instanceof Date ? this.setTime(+e[0]) : (this.setTime(+new Date(...e)), xh(this, NaN), yh(this)) : this.setTime(Date.now());
	}
	static tz(t, ...n) {
		return n.length ? new e(...n, t) : new e(Date.now(), t);
	}
	withTimeZone(t) {
		return new e(+this, t);
	}
	getTimezoneOffset() {
		let e = -mh(this.timeZone, this);
		return e > 0 ? Math.floor(e) : Math.ceil(e);
	}
	setTime(e) {
		return Date.prototype.setTime.apply(this, arguments), yh(this), +this;
	}
	[Symbol.for("constructDateFrom")](t) {
		return new e(+new Date(t), this.timeZone);
	}
}, vh = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
	if (!vh.test(e)) return;
	let t = e.replace(vh, "$1UTC");
	_h.prototype[t] && (e.startsWith("get") ? _h.prototype[e] = function() {
		return this.internal[t]();
	} : (_h.prototype[e] = function() {
		return Date.prototype[t].apply(this.internal, arguments), bh(this), +this;
	}, _h.prototype[t] = function() {
		return Date.prototype[t].apply(this, arguments), yh(this), +this;
	}));
});
function yh(e) {
	e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-mh(e.timeZone, e) * 60));
}
function bh(e) {
	Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), xh(e);
}
function xh(e) {
	let t = mh(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
	r.setUTCHours(r.getUTCHours() - 1);
	let i = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), a = i - -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), o = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
	a && o && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + a);
	let s = i - n;
	s && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + s);
	let c = /* @__PURE__ */ new Date(+e);
	c.setUTCSeconds(0);
	let l = i > 0 ? c.getSeconds() : (c.getSeconds() - 60) % 60, u = Math.round(-(mh(e.timeZone, e) * 60)) % 60;
	(u || l) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + u), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + u + l));
	let d = mh(e.timeZone, e), f = d > 0 ? Math.floor(d) : Math.ceil(d), p = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - f, m = f !== n, h = p - s;
	if (m && h) {
		Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + h);
		let t = mh(e.timeZone, e), n = f - (t > 0 ? Math.floor(t) : Math.ceil(t));
		n && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + n), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + n));
	}
}
//#endregion
//#region node_modules/@date-fns/tz/date/index.js
var Sh = class e extends _h {
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
		return `${e} GMT${t}${n}${r} (${dh(this.timeZone, this)})`;
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
}, Ch = 5, wh = 4;
function Th(e, t) {
	let n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, i = t.addDays(e, -r + 1), a = t.addDays(i, Ch * 7 - 1);
	return t.getMonth(e) === t.getMonth(a) ? Ch : wh;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/startOfBroadcastWeek.js
function Eh(e, t) {
	let n = t.startOfMonth(e), r = n.getDay();
	return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/endOfBroadcastWeek.js
function Dh(e, t) {
	let n = Eh(e, t), r = Th(e, t);
	return t.addDays(n, r * 7 - 1);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/locale/en-US.js
var Oh = {
	...Sm,
	labels: {
		labelDayButton: (e, t, n, r) => {
			let i;
			i = r && typeof r.format == "function" ? r.format.bind(r) : (e, t) => Ym(e, t, {
				locale: Sm,
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
			return r = n && typeof n.format == "function" ? n.format.bind(n) : (e, n) => Ym(e, n, {
				locale: Sm,
				...t
			}), r(e, "LLLL yyyy");
		},
		labelGridcell: (e, t, n, r) => {
			let i;
			i = r && typeof r.format == "function" ? r.format.bind(r) : (e, t) => Ym(e, t, {
				locale: Sm,
				...n
			});
			let a = i(e, "PPPP");
			return t?.today && (a = `Today, ${a}`), a;
		},
		labelNav: "Navigation bar",
		labelWeekNumberHeader: "Week Number",
		labelWeekday: (e, t, n) => {
			let r;
			return r = n && typeof n.format == "function" ? n.format.bind(n) : (e, n) => Ym(e, n, {
				locale: Sm,
				...t
			}), r(e, "cccc");
		}
	}
}, kh = class e {
	constructor(e, t) {
		this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Sh.tz(this.options.timeZone) : new this.Date(), this.newDate = (e, t, n) => this.overrides?.newDate ? this.overrides.newDate(e, t, n) : this.options.timeZone ? new Sh(e, t, n, this.options.timeZone) : new Date(e, t, n), this.addDays = (e, t) => this.overrides?.addDays ? this.overrides.addDays(e, t) : Fp(e, t), this.addMonths = (e, t) => this.overrides?.addMonths ? this.overrides.addMonths(e, t) : Ip(e, t), this.addWeeks = (e, t) => this.overrides?.addWeeks ? this.overrides.addWeeks(e, t) : qp(e, t), this.addYears = (e, t) => this.overrides?.addYears ? this.overrides.addYears(e, t) : Jp(e, t), this.differenceInCalendarDays = (e, t) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(e, t) : Gp(e, t), this.differenceInCalendarMonths = (e, t) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(e, t) : em(e, t), this.eachMonthOfInterval = (e) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(e) : rm(e), this.eachYearOfInterval = (e) => {
			let t = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(e) : sm(e), n = new Set(t.map((e) => this.getYear(e)));
			if (n.size === t.length) return t;
			let r = [];
			return n.forEach((e) => {
				r.push(new Date(e, 0, 1));
			}), r;
		}, this.endOfBroadcastWeek = (e) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(e) : Dh(e, this), this.endOfISOWeek = (e) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(e) : lm(e), this.endOfMonth = (e) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(e) : tm(e), this.endOfWeek = (e, t) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(e, t) : cm(e, this.options), this.endOfYear = (e) => this.overrides?.endOfYear ? this.overrides.endOfYear(e) : am(e), this.format = (e, t, n) => {
			let r = this.overrides?.format ? this.overrides.format(e, t, this.options) : Ym(e, t, this.options);
			return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(r) : r;
		}, this.getISOWeek = (e) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(e) : wm(e), this.getMonth = (e, t) => this.overrides?.getMonth ? this.overrides.getMonth(e, this.options) : Qm(e, this.options), this.getYear = (e, t) => this.overrides?.getYear ? this.overrides.getYear(e, this.options) : $m(e, this.options), this.getWeek = (e, t) => this.overrides?.getWeek ? this.overrides.getWeek(e, this.options) : Dm(e, this.options), this.isAfter = (e, t) => this.overrides?.isAfter ? this.overrides.isAfter(e, t) : eh(e, t), this.isBefore = (e, t) => this.overrides?.isBefore ? this.overrides.isBefore(e, t) : th(e, t), this.isDate = (e) => this.overrides?.isDate ? this.overrides.isDate(e) : Qp(e), this.isSameDay = (e, t) => this.overrides?.isSameDay ? this.overrides.isSameDay(e, t) : Zp(e, t), this.isSameMonth = (e, t) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(e, t) : nh(e, t), this.isSameYear = (e, t) => this.overrides?.isSameYear ? this.overrides.isSameYear(e, t) : rh(e, t), this.max = (e) => this.overrides?.max ? this.overrides.max(e) : Yp(e), this.min = (e) => this.overrides?.min ? this.overrides.min(e) : Xp(e), this.setMonth = (e, t) => this.overrides?.setMonth ? this.overrides.setMonth(e, t) : ih(e, t), this.setYear = (e, t) => this.overrides?.setYear ? this.overrides.setYear(e, t) : ah(e, t), this.startOfBroadcastWeek = (e, t) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(e, this) : Eh(e, this), this.startOfDay = (e) => this.overrides?.startOfDay ? this.overrides.startOfDay(e) : Wp(e), this.startOfISOWeek = (e) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(e) : Bp(e), this.startOfMonth = (e) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(e) : im(e), this.startOfWeek = (e, t) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(e, this.options) : zp(e, this.options), this.startOfYear = (e) => this.overrides?.startOfYear ? this.overrides.startOfYear(e) : om(e), this.options = {
			locale: Oh,
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
kh.yearFirstLocales = new Set([
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
var Ah = new kh(), jh = class {
	constructor(e, t, n = Ah) {
		this.date = e, this.displayMonth = t, this.outside = !!(t && !n.isSameMonth(e, t)), this.dateLib = n, this.isoDate = n.format(e, "yyyy-MM-dd"), this.displayMonthId = n.format(t, "yyyy-MM"), this.dateMonthId = n.format(e, "yyyy-MM");
	}
	isEqualTo(e) {
		return this.dateLib.isSameDay(e.date, this.date) && this.dateLib.isSameMonth(e.displayMonth, this.displayMonth);
	}
}, Mh = class {
	constructor(e, t) {
		this.date = e, this.weeks = t;
	}
}, Nh = class {
	constructor(e, t) {
		this.days = t, this.weekNumber = e;
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Button.js
function Ph(e) {
	return t.createElement("button", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/CaptionLabel.js
function Fh(e) {
	return t.createElement("span", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Chevron.js
function Ih(e) {
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
function Lh(e) {
	let { day: n, modifiers: r, ...i } = e;
	return t.createElement("td", { ...i });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/DayButton.js
function Rh(e) {
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
var zh;
(function(e) {
	e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(zh ||= {});
var Bh;
(function(e) {
	e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(Bh ||= {});
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Dropdown.js
function Vh(e) {
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
function Hh(e) {
	return t.createElement("div", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Footer.js
function Uh(e) {
	return t.createElement("div", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Month.js
function Wh(e) {
	let { calendarMonth: n, displayIndex: r, ...i } = e;
	return t.createElement("div", { ...i }, e.children);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/MonthCaption.js
function Gh(e) {
	let { calendarMonth: n, displayIndex: r, ...i } = e;
	return t.createElement("div", { ...i });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/MonthGrid.js
function Kh(e) {
	return t.createElement("table", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Months.js
function qh(e) {
	return t.createElement("div", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/useDayPicker.js
var Jh = n(void 0);
function Yh() {
	let e = o(Jh);
	if (e === void 0) throw Error("useDayPicker() must be used within a custom component.");
	return e;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/MonthsDropdown.js
function Xh(e) {
	let { components: n } = Yh();
	return t.createElement(n.Dropdown, { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Nav.js
function Zh(e) {
	let { onPreviousClick: n, onNextClick: r, previousMonth: i, nextMonth: o, ...s } = e, { components: c, classNames: l, labels: { labelPrevious: u, labelNext: d } } = Yh(), f = a((e) => {
		o && r?.(e);
	}, [o, r]), p = a((e) => {
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
		tabIndex: o ? void 0 : -1,
		"aria-disabled": o ? void 0 : !0,
		"aria-label": d(o),
		onClick: f
	}, t.createElement(c.Chevron, {
		disabled: o ? void 0 : !0,
		orientation: "right",
		className: l[X.Chevron]
	})));
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/NextMonthButton.js
function Qh(e) {
	let { components: n } = Yh();
	return t.createElement(n.Button, { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Option.js
function $h(e) {
	return t.createElement("option", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/PreviousMonthButton.js
function eg(e) {
	let { components: n } = Yh();
	return t.createElement(n.Button, { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Root.js
function tg(e) {
	let { rootRef: n, ...r } = e;
	return t.createElement("div", {
		...r,
		ref: n
	});
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Select.js
function ng(e) {
	return t.createElement("select", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Week.js
function rg(e) {
	let { week: n, ...r } = e;
	return t.createElement("tr", { ...r });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Weekday.js
function ig(e) {
	return t.createElement("th", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Weekdays.js
function ag(e) {
	return t.createElement("thead", { "aria-hidden": !0 }, t.createElement("tr", { ...e }));
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/WeekNumber.js
function og(e) {
	let { week: n, ...r } = e;
	return t.createElement("th", { ...r });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/WeekNumberHeader.js
function sg(e) {
	return t.createElement("th", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Weeks.js
function cg(e) {
	return t.createElement("tbody", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/YearsDropdown.js
function lg(e) {
	let { components: n } = Yh();
	return t.createElement(n.Dropdown, { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/custom-components.js
var ug = /* @__PURE__ */ y({
	Button: () => Ph,
	CaptionLabel: () => Fh,
	Chevron: () => Ih,
	Day: () => Lh,
	DayButton: () => Rh,
	Dropdown: () => Vh,
	DropdownNav: () => Hh,
	Footer: () => Uh,
	Month: () => Wh,
	MonthCaption: () => Gh,
	MonthGrid: () => Kh,
	Months: () => qh,
	MonthsDropdown: () => Xh,
	Nav: () => Zh,
	NextMonthButton: () => Qh,
	Option: () => $h,
	PreviousMonthButton: () => eg,
	Root: () => tg,
	Select: () => ng,
	Week: () => rg,
	WeekNumber: () => og,
	WeekNumberHeader: () => sg,
	Weekday: () => ig,
	Weekdays: () => ag,
	Weeks: () => cg,
	YearsDropdown: () => lg
});
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/rangeIncludesDate.js
function dg(e, t, n = !1, r = Ah) {
	let { from: i, to: a } = e, { differenceInCalendarDays: o, isSameDay: s } = r;
	return i && a ? (o(a, i) < 0 && ([i, a] = [a, i]), o(t, i) >= (n ? 1 : 0) && o(a, t) >= (n ? 1 : 0)) : !n && a ? s(a, t) : !n && i ? s(i, t) : !1;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/typeguards.js
function fg(e) {
	return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function pg(e) {
	return !!(e && typeof e == "object" && "from" in e);
}
function mg(e) {
	return !!(e && typeof e == "object" && "after" in e);
}
function hg(e) {
	return !!(e && typeof e == "object" && "before" in e);
}
function gg(e) {
	return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function _g(e, t) {
	return Array.isArray(e) && e.every(t.isDate);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/dateMatchModifiers.js
function vg(e, t, n = Ah) {
	let r = Array.isArray(t) ? t : [t], { isSameDay: i, differenceInCalendarDays: a, isAfter: o } = n;
	return r.some((t) => {
		if (typeof t == "boolean") return t;
		if (n.isDate(t)) return i(e, t);
		if (_g(t, n)) return t.some((t) => i(e, t));
		if (pg(t)) return dg(t, e, !1, n);
		if (gg(t)) return Array.isArray(t.dayOfWeek) ? t.dayOfWeek.includes(e.getDay()) : t.dayOfWeek === e.getDay();
		if (fg(t)) {
			let n = a(t.before, e), r = a(t.after, e), i = n > 0, s = r < 0;
			return o(t.before, t.after) ? s && i : i || s;
		}
		return mg(t) ? a(e, t.after) > 0 : hg(t) ? a(t.before, e) > 0 : typeof t == "function" ? t(e) : !1;
	});
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/createGetModifiers.js
function yg(e, t, n, r, i) {
	let { disabled: a, hidden: o, modifiers: s, showOutsideDays: c, broadcastCalendar: l, today: u = i.today() } = t, { isSameDay: d, isSameMonth: f, startOfMonth: p, isBefore: m, endOfMonth: h, isAfter: g } = i, _ = n && p(n), v = r && h(r), y = {
		[Z.focused]: [],
		[Z.outside]: [],
		[Z.disabled]: [],
		[Z.hidden]: [],
		[Z.today]: []
	}, b = {};
	for (let t of e) {
		let { date: e, displayMonth: n } = t, r = !!(n && !f(e, n)), p = !!(_ && m(e, _)), h = !!(v && g(e, v)), x = !!(a && vg(e, a, i)), S = !!(o && vg(e, o, i)) || p || h || !l && !c && r || l && c === !1 && r, C = d(e, u);
		r && y.outside.push(t), x && y.disabled.push(t), S && y.hidden.push(t), C && y.today.push(t), s && Object.keys(s).forEach((n) => {
			let r = s?.[n];
			r && vg(e, r, i) && (b[n] ? b[n].push(t) : b[n] = [t]);
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
function bg(e, t, n = {}) {
	return Object.entries(e).filter(([, e]) => e === !0).reduce((e, [r]) => (n[r] ? e.push(n[r]) : t[Z[r]] ? e.push(t[Z[r]]) : t[zh[r]] && e.push(t[zh[r]]), e), [t[X.Day]]);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getComponents.js
function xg(e) {
	return {
		...ug,
		...e
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getDataAttributes.js
function Sg(e) {
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
function Cg() {
	let e = {};
	for (let t in X) e[X[t]] = `rdp-${X[t]}`;
	for (let t in Z) e[Z[t]] = `rdp-${Z[t]}`;
	for (let t in zh) e[zh[t]] = `rdp-${zh[t]}`;
	for (let t in Bh) e[Bh[t]] = `rdp-${Bh[t]}`;
	return e;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatCaption.js
function wg(e, t, n) {
	return (n ?? new kh(t)).formatMonthYear(e);
}
var Tg = wg;
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatDay.js
function Eg(e, t, n) {
	return (n ?? new kh(t)).format(e, "d");
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatMonthDropdown.js
function Dg(e, t = Ah) {
	return t.format(e, "LLLL");
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatWeekdayName.js
function Og(e, t, n) {
	return (n ?? new kh(t)).format(e, "cccccc");
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatWeekNumber.js
function kg(e, t = Ah) {
	return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatWeekNumberHeader.js
function Ag() {
	return "";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatYearDropdown.js
function jg(e, t = Ah) {
	return t.format(e, "yyyy");
}
var Mg = jg, Ng = /* @__PURE__ */ y({
	formatCaption: () => wg,
	formatDay: () => Eg,
	formatMonthCaption: () => Tg,
	formatMonthDropdown: () => Dg,
	formatWeekNumber: () => kg,
	formatWeekNumberHeader: () => Ag,
	formatWeekdayName: () => Og,
	formatYearCaption: () => Mg,
	formatYearDropdown: () => jg
});
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getFormatters.js
function Pg(e) {
	return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
		...Ng,
		...e
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelDayButton.js
function Fg(e, t, n, r) {
	let i = (r ?? new kh(n)).format(e, "PPPP");
	return t.today && (i = `Today, ${i}`), t.selected && (i = `${i}, selected`), i;
}
var Ig = Fg;
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelGrid.js
function Lg(e, t, n) {
	return (n ?? new kh(t)).formatMonthYear(e);
}
var Rg = Lg;
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelGridcell.js
function zg(e, t, n, r) {
	let i = (r ?? new kh(n)).format(e, "PPPP");
	return t?.today && (i = `Today, ${i}`), i;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelMonthDropdown.js
function Bg(e) {
	return "Choose the Month";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelNav.js
function Vg() {
	return "";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelNext.js
var Hg = "Go to the Next Month";
function Ug(e, t) {
	return Hg;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelPrevious.js
function Wg(e) {
	return "Go to the Previous Month";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelWeekday.js
function Gg(e, t, n) {
	return (n ?? new kh(t)).format(e, "cccc");
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelWeekNumber.js
function Kg(e, t) {
	return `Week ${e}`;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelWeekNumberHeader.js
function qg(e) {
	return "Week Number";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelYearDropdown.js
function Jg(e) {
	return "Choose the Year";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/index.js
var Yg = /* @__PURE__ */ y({
	labelCaption: () => Rg,
	labelDay: () => Ig,
	labelDayButton: () => Fg,
	labelGrid: () => Lg,
	labelGridcell: () => zg,
	labelMonthDropdown: () => Bg,
	labelNav: () => Vg,
	labelNext: () => Ug,
	labelPrevious: () => Wg,
	labelWeekNumber: () => Kg,
	labelWeekNumberHeader: () => qg,
	labelWeekday: () => Gg,
	labelYearDropdown: () => Jg
}), Xg = (e, t, n) => t || (n ? typeof n == "function" ? n : (...e) => n : e);
function Zg(e, t) {
	let n = t.locale?.labels ?? {};
	return {
		...Yg,
		...e ?? {},
		labelDayButton: Xg(Fg, e?.labelDayButton, n.labelDayButton),
		labelMonthDropdown: Xg(Bg, e?.labelMonthDropdown, n.labelMonthDropdown),
		labelNext: Xg(Ug, e?.labelNext, n.labelNext),
		labelPrevious: Xg(Wg, e?.labelPrevious, n.labelPrevious),
		labelWeekNumber: Xg(Kg, e?.labelWeekNumber, n.labelWeekNumber),
		labelYearDropdown: Xg(Jg, e?.labelYearDropdown, n.labelYearDropdown),
		labelGrid: Xg(Lg, e?.labelGrid, n.labelGrid),
		labelGridcell: Xg(zg, e?.labelGridcell, n.labelGridcell),
		labelNav: Xg(Vg, e?.labelNav, n.labelNav),
		labelWeekNumberHeader: Xg(qg, e?.labelWeekNumberHeader, n.labelWeekNumberHeader),
		labelWeekday: Xg(Gg, e?.labelWeekday, n.labelWeekday)
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getMonthOptions.js
function Qg(e, t, n, r, i) {
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
function $g(e, t = {}, n = {}) {
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
function e_(e, t, n, r) {
	let i = r ?? e.today(), a = n ? e.startOfBroadcastWeek(i, e) : t ? e.startOfISOWeek(i) : e.startOfWeek(i), o = [];
	for (let t = 0; t < 7; t++) {
		let n = e.addDays(a, t);
		o.push(n);
	}
	return o;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getYearOptions.js
function t_(e, t, n, r, i = !1) {
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
function n_(e, t = {}) {
	let { weekStartsOn: n, locale: r } = t, i = n ?? r?.options?.weekStartsOn ?? 0, a = (t) => {
		let n = typeof t == "number" || typeof t == "string" ? new Date(t) : t;
		return new Sh(n.getFullYear(), n.getMonth(), n.getDate(), 12, 0, 0, e);
	}, o = (e) => {
		let t = a(e);
		return new Date(t.getFullYear(), t.getMonth(), t.getDate(), 0, 0, 0, 0);
	};
	return {
		today: () => a(Sh.tz(e)),
		newDate: (t, n, r) => new Sh(t, n, r, 12, 0, 0, e),
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
			let n = a(t.start), r = a(t.end), i = [], o = new Sh(n.getFullYear(), n.getMonth(), 1, 12, 0, 0, e), s = r.getFullYear() * 12 + r.getMonth();
			for (; o.getFullYear() * 12 + o.getMonth() <= s;) i.push(new Sh(o, e)), o.setMonth(o.getMonth() + 1, 1);
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
			let n = a(t.start), r = a(t.end), i = [], o = new Sh(n.getFullYear(), 0, 1, 12, 0, 0, e);
			for (; o.getFullYear() <= r.getFullYear();) i.push(new Sh(o, e)), o.setFullYear(o.getFullYear() + 1, 0, 1);
			return i;
		},
		getWeek: (e, t) => Dm(o(e), {
			weekStartsOn: t?.weekStartsOn ?? i,
			firstWeekContainsDate: t?.firstWeekContainsDate ?? r?.options?.firstWeekContainsDate ?? 1
		}),
		getISOWeek: (e) => wm(o(e)),
		differenceInCalendarDays: (e, t) => Gp(o(e), o(t)),
		differenceInCalendarMonths: (e, t) => em(o(e), o(t))
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/useAnimation.js
var r_ = (e) => e instanceof HTMLElement ? e : null, i_ = (e) => [...e.querySelectorAll("[data-animated-month]") ?? []], a_ = (e) => r_(e.querySelector("[data-animated-month]")), o_ = (e) => r_(e.querySelector("[data-animated-caption]")), s_ = (e) => r_(e.querySelector("[data-animated-weeks]")), c_ = (e) => r_(e.querySelector("[data-animated-nav]")), l_ = (e) => r_(e.querySelector("[data-animated-weekdays]"));
function u_(e, t, { classNames: n, months: r, focused: i, dateLib: a }) {
	let o = u(null), s = u(r), l = u(!1);
	c(() => {
		let c = s.current;
		if (s.current = r, !t || !e.current || !(e.current instanceof HTMLElement) || r.length === 0 || c.length === 0 || r.length !== c.length) return;
		let u = a.isSameMonth(r[0].date, c[0].date), d = a.isAfter(r[0].date, c[0].date), f = d ? n[Bh.caption_after_enter] : n[Bh.caption_before_enter], p = d ? n[Bh.weeks_after_enter] : n[Bh.weeks_before_enter], m = o.current, h = e.current.cloneNode(!0);
		if (h instanceof HTMLElement ? (i_(h).forEach((e) => {
			if (!(e instanceof HTMLElement)) return;
			let t = a_(e);
			t && e.contains(t) && e.removeChild(t);
			let n = o_(e);
			n && n.classList.remove(f);
			let r = s_(e);
			r && r.classList.remove(p);
		}), o.current = h) : o.current = null, l.current || u || i) return;
		let g = m instanceof HTMLElement ? i_(m) : [], _ = i_(e.current);
		if (_?.every((e) => e instanceof HTMLElement) && g && g.every((e) => e instanceof HTMLElement)) {
			l.current = !0;
			let t = [];
			e.current.style.isolation = "isolate";
			let r = c_(e.current);
			r && (r.style.zIndex = "1"), _.forEach((i, a) => {
				let o = g[a];
				if (!o) return;
				i.style.position = "relative", i.style.overflow = "hidden";
				let s = o_(i);
				s && s.classList.add(f);
				let c = s_(i);
				c && c.classList.add(p);
				let u = () => {
					l.current = !1, e.current && (e.current.style.isolation = ""), r && (r.style.zIndex = ""), s && s.classList.remove(f), c && c.classList.remove(p), i.style.position = "", i.style.overflow = "", i.contains(o) && i.removeChild(o);
				};
				t.push(u), o.style.pointerEvents = "none", o.style.position = "absolute", o.style.overflow = "hidden", o.setAttribute("aria-hidden", "true");
				let m = l_(o);
				m && (m.style.opacity = "0");
				let h = o_(o);
				h && (h.classList.add(d ? n[Bh.caption_before_exit] : n[Bh.caption_after_exit]), h.addEventListener("animationend", u));
				let _ = s_(o);
				_ && _.classList.add(d ? n[Bh.weeks_before_exit] : n[Bh.weeks_after_exit]), i.insertBefore(o, i.firstChild);
			});
		}
	});
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getDates.js
function d_(e, t, n, r) {
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
function f_(e) {
	let t = [];
	return e.reduce((e, n) => {
		let r = n.weeks.reduce((e, t) => e.concat(t.days.slice()), t.slice());
		return e.concat(r.slice());
	}, t.slice());
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getDisplayMonths.js
function p_(e, t, n, r) {
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
function m_(e, t, n, r) {
	let { month: i, defaultMonth: a, today: o = r.today(), numberOfMonths: s = 1 } = e, c = i || a || o, { differenceInCalendarMonths: l, addMonths: u, startOfMonth: d } = r;
	return n && l(n, c) < s - 1 && (c = u(n, -1 * (s - 1))), t && l(c, t) < 0 && (c = t), d(c);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getMonths.js
function h_(e, t, n, r) {
	let { addDays: i, endOfBroadcastWeek: a, endOfISOWeek: o, endOfMonth: s, endOfWeek: c, getISOWeek: l, getWeek: u, startOfBroadcastWeek: d, startOfISOWeek: f, startOfWeek: p } = r, m = e.reduce((e, m) => {
		let h = n.broadcastCalendar ? d(m, r) : n.ISOWeek ? f(m) : p(m), g = n.broadcastCalendar ? a(m) : n.ISOWeek ? o(s(m)) : c(s(m)), _ = t.filter((e) => e >= h && e <= g), v = n.broadcastCalendar ? 35 : 42;
		if (n.fixedWeeks && _.length < v) {
			let e = t.filter((e) => {
				let t = v - _.length;
				return e > g && e <= i(g, t);
			});
			_.push(...e);
		}
		let y = new Mh(m, _.reduce((e, t) => {
			let i = n.ISOWeek ? l(t) : u(t), a = e.find((e) => e.weekNumber === i), o = new jh(t, m, r);
			return a ? a.days.push(o) : e.push(new Nh(i, [o])), e;
		}, []));
		return e.push(y), e;
	}, []);
	return n.reverseMonths ? m.reverse() : m;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getNavMonth.js
function g_(e, t) {
	let { startMonth: n, endMonth: r } = e, { startOfYear: i, startOfDay: a, startOfMonth: o, endOfMonth: s, addYears: c, endOfYear: l, newDate: u, today: d } = t, { fromYear: f, toYear: p, fromMonth: m, toMonth: h } = e;
	!n && m && (n = m), !n && f && (n = t.newDate(f, 0, 1)), !r && h && (r = h), !r && p && (r = u(p, 11, 31));
	let g = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
	return n ? n = o(n) : f ? n = u(f, 0, 1) : !n && g && (n = i(c(e.today ?? d(), -100))), r ? r = s(r) : p ? r = u(p, 11, 31) : !r && g && (r = l(e.today ?? d())), [n && a(n), r && a(r)];
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getNextMonth.js
function __(e, t, n, r) {
	if (n.disableNavigation) return;
	let { pagedNavigation: i, numberOfMonths: a = 1 } = n, { startOfMonth: o, addMonths: s, differenceInCalendarMonths: c } = r, l = i ? a : 1, u = o(e);
	if (!t || !(c(t, e) < a)) return s(u, l);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getPreviousMonth.js
function v_(e, t, n, r) {
	if (n.disableNavigation) return;
	let { pagedNavigation: i, numberOfMonths: a } = n, { startOfMonth: o, addMonths: s, differenceInCalendarMonths: c } = r, l = i ? a ?? 1 : 1, u = o(e);
	if (!t || !(c(u, t) <= 0)) return s(u, -l);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getWeeks.js
function y_(e) {
	return e.reduce((e, t) => e.concat(t.weeks.slice()), [].slice());
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/useControlledValue.js
function b_(e, t) {
	let [n, r] = d(e);
	return [t === void 0 ? n : t, r];
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/useCalendar.js
function x_(e, t) {
	let [n, r] = g_(e, t), { startOfMonth: i, endOfMonth: a } = t, o = m_(e, n, r, t), [c, u] = b_(o, e.month ? o : void 0);
	s(() => {
		u(m_(e, n, r, t));
	}, [e.timeZone]);
	let { months: d, weeks: f, days: p, previousMonth: m, nextMonth: h } = l(() => {
		let i = p_(c, r, { numberOfMonths: e.numberOfMonths }, t), o = h_(i, d_(i, e.endMonth ? a(e.endMonth) : void 0, {
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
			weeks: y_(o),
			days: f_(o),
			previousMonth: v_(c, n, e, t),
			nextMonth: __(c, r, e, t)
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
var S_;
(function(e) {
	e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(S_ ||= {});
function C_(e) {
	return !e[Z.disabled] && !e[Z.hidden] && !e[Z.outside];
}
function w_(e, t, n, r) {
	let i, a = -1;
	for (let o of e) {
		let e = t(o);
		C_(e) && (e[Z.focused] && a < S_.FocusedModifier ? (i = o, a = S_.FocusedModifier) : r?.isEqualTo(o) && a < S_.LastFocused ? (i = o, a = S_.LastFocused) : n(o.date) && a < S_.Selected ? (i = o, a = S_.Selected) : e[Z.today] && a < S_.Today && (i = o, a = S_.Today));
	}
	return i ||= e.find((e) => C_(t(e))), i;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getFocusableDate.js
function T_(e, t, n, r, i, a, o) {
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
function E_(e, t, n, r, i, a, o, s = 0) {
	if (s > 365) return;
	let c = T_(e, t, n.date, r, i, a, o), l = !!(a.disabled && vg(c, a.disabled, o)), u = !!(a.hidden && vg(c, a.hidden, o)), d = new jh(c, c, o);
	return !l && !u ? d : E_(e, t, d, r, i, a, o, s + 1);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/useFocus.js
function D_(e, t, n, r, i) {
	let { autoFocus: a } = e, [o, s] = d(), c = w_(t.days, n, r || (() => !1), o), [l, u] = d(a ? c : void 0);
	return {
		isFocusTarget: (e) => !!c?.isEqualTo(e),
		setFocused: u,
		focused: l,
		blur: () => {
			s(l), u(void 0);
		},
		moveFocus: (n, r) => {
			if (!l) return;
			let a = E_(n, r, l, t.navStart, t.navEnd, e, i);
			a && (e.disableNavigation && !t.days.some((e) => e.isEqualTo(a)) || (t.goToDay(a), u(a)));
		}
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/selection/useMulti.js
function O_(e, t) {
	let { selected: n, required: r, onSelect: i } = e, [a, o] = b_(n, i ? n : void 0), s = i ? n : a, { isSameDay: c } = t, l = (e) => s?.some((t) => c(t, e)) ?? !1, { min: u, max: d } = e;
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
function k_(e, t, n = 0, r = 0, i = !1, a = Ah) {
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
function A_(e, t, n = Ah) {
	let r = Array.isArray(t) ? t : [t], i = e.from, a = n.differenceInCalendarDays(e.to, e.from), o = Math.min(a, 6);
	for (let e = 0; e <= o; e++) {
		if (r.includes(i.getDay())) return !0;
		i = n.addDays(i, 1);
	}
	return !1;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/rangeOverlaps.js
function j_(e, t, n = Ah) {
	return dg(e, t.from, !1, n) || dg(e, t.to, !1, n) || dg(t, e.from, !1, n) || dg(t, e.to, !1, n);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/rangeContainsModifiers.js
function M_(e, t, n = Ah) {
	let r = Array.isArray(t) ? t : [t];
	if (r.filter((e) => typeof e != "function").some((t) => typeof t == "boolean" ? t : n.isDate(t) ? dg(e, t, !1, n) : _g(t, n) ? t.some((t) => dg(e, t, !1, n)) : pg(t) ? t.from && t.to ? j_(e, {
		from: t.from,
		to: t.to
	}, n) : !1 : gg(t) ? A_(e, t.dayOfWeek, n) : fg(t) ? n.isAfter(t.before, t.after) ? j_(e, {
		from: n.addDays(t.after, 1),
		to: n.addDays(t.before, -1)
	}, n) : vg(e.from, t, n) || vg(e.to, t, n) : mg(t) || hg(t) ? vg(e.from, t, n) || vg(e.to, t, n) : !1)) return !0;
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
function N_(e, t) {
	let { disabled: n, excludeDisabled: r, resetOnSelect: i, selected: a, required: o, onSelect: s } = e, [c, l] = b_(a, s ? a : void 0), u = s ? a : c;
	return {
		selected: u,
		select: (a, c, d) => {
			let { min: f, max: p } = e, m;
			if (a) {
				let e = u?.from, n = u?.to, r = !!e && !!n, s = !!e && !!n && t.isSameDay(e, n) && t.isSameDay(a, e);
				m = i && (r || !u?.from) ? !o && s ? void 0 : {
					from: a,
					to: void 0
				} : k_(a, u, f, p, o, t);
			}
			return r && n && m?.from && m.to && M_({
				from: m.from,
				to: m.to
			}, n, t) && (m.from = a, m.to = void 0), s || l(m), s?.(m, a, c, d), m;
		},
		isSelected: (e) => u && dg(u, e, !1, t)
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/selection/useSingle.js
function P_(e, t) {
	let { selected: n, required: r, onSelect: i } = e, [a, o] = b_(n, i ? n : void 0), s = i ? n : a, { isSameDay: c } = t;
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
function F_(e, t) {
	let n = P_(e, t), r = O_(e, t), i = N_(e, t);
	switch (e.mode) {
		case "single": return n;
		case "multiple": return r;
		case "range": return i;
		default: return;
	}
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/toTimeZone.js
function I_(e, t) {
	return e instanceof Sh && e.timeZone === t ? e : new Sh(e, t);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/convertMatchersToTimeZone.js
function L_(e, t, n) {
	if (!n) return I_(e, t);
	let r = I_(e, t), i = new Sh(r.getFullYear(), r.getMonth(), r.getDate(), 12, 0, 0, t);
	return new Date(i.getTime());
}
function R_(e, t, n) {
	return typeof e == "boolean" || typeof e == "function" ? e : e instanceof Date ? L_(e, t, n) : Array.isArray(e) ? e.map((e) => e instanceof Date ? L_(e, t, n) : e) : pg(e) ? {
		...e,
		from: e.from ? I_(e.from, t) : e.from,
		to: e.to ? I_(e.to, t) : e.to
	} : fg(e) ? {
		before: L_(e.before, t, n),
		after: L_(e.after, t, n)
	} : mg(e) ? { after: L_(e.after, t, n) } : hg(e) ? { before: L_(e.before, t, n) } : e;
}
function z_(e, t, n) {
	return e && (Array.isArray(e) ? e.map((e) => R_(e, t, n)) : R_(e, t, n));
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/DayPicker.js
function B_(e) {
	let n = e, r = n.timeZone;
	if (r && (n = {
		...e,
		timeZone: r
	}, n.today &&= I_(n.today, r), n.month &&= I_(n.month, r), n.defaultMonth &&= I_(n.defaultMonth, r), n.startMonth &&= I_(n.startMonth, r), n.endMonth &&= I_(n.endMonth, r), n.mode === "single" && n.selected ? n.selected = I_(n.selected, r) : n.mode === "multiple" && n.selected ? n.selected = n.selected?.map((e) => I_(e, r)) : n.mode === "range" && n.selected && (n.selected = {
		from: n.selected.from ? I_(n.selected.from, r) : n.selected.from,
		to: n.selected.to ? I_(n.selected.to, r) : n.selected.to
	}), n.disabled !== void 0 && (n.disabled = z_(n.disabled, r)), n.hidden !== void 0 && (n.hidden = z_(n.hidden, r)), n.modifiers)) {
		let e = {};
		Object.keys(n.modifiers).forEach((t) => {
			e[t] = z_(n.modifiers?.[t], r);
		}), n.modifiers = e;
	}
	let { components: i, formatters: o, labels: s, dateLib: c, locale: d, classNames: f } = l(() => {
		let e = {
			...Oh,
			...n.locale
		}, t = n.broadcastCalendar ? 1 : n.weekStartsOn, r = n.noonSafe && n.timeZone ? n_(n.timeZone, {
			weekStartsOn: t,
			locale: e
		}) : void 0, i = n.dateLib && r ? {
			...r,
			...n.dateLib
		} : n.dateLib ?? r, a = new kh({
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
			components: xg(n.components),
			formatters: Pg(n.formatters),
			labels: Zg(n.labels, a.options),
			locale: e,
			classNames: {
				...Cg(),
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
	let { captionLayout: p, mode: m, navLayout: h, numberOfMonths: g = 1, onDayBlur: _, onDayClick: v, onDayFocus: y, onDayKeyDown: b, onDayMouseEnter: x, onDayMouseLeave: S, onNextClick: C, onPrevClick: w, showWeekNumber: T, styles: E } = n, { formatCaption: D, formatDay: O, formatMonthDropdown: k, formatWeekNumber: A, formatWeekNumberHeader: j, formatWeekdayName: M, formatYearDropdown: N } = o, P = x_(n, c), { days: F, months: I, navStart: L, navEnd: R, previousMonth: z, nextMonth: ee, goToMonth: te } = P, ne = yg(F, n, L, R, c), { isSelected: re, select: ie, selected: ae } = F_(n, c) ?? {}, { blur: B, focused: oe, isFocusTarget: se, moveFocus: ce, setFocused: V } = D_(n, P, ne, re ?? (() => !1), c), { labelDayButton: le, labelGridcell: ue, labelGrid: de, labelMonthDropdown: fe, labelNav: pe, labelPrevious: me, labelNext: he, labelWeekday: ge, labelWeekNumber: _e, labelWeekNumberHeader: ve, labelYearDropdown: ye } = s, be = l(() => e_(c, n.ISOWeek, n.broadcastCalendar, n.today), [
		c,
		n.ISOWeek,
		n.broadcastCalendar,
		n.today
	]), xe = m !== void 0 || v !== void 0, Se = a(() => {
		z && (te(z), w?.(z));
	}, [
		z,
		te,
		w
	]), Ce = a(() => {
		ee && (te(ee), C?.(ee));
	}, [
		te,
		ee,
		C
	]), we = a((e, t) => (n) => {
		n.preventDefault(), n.stopPropagation(), V(e), !t.disabled && (ie?.(e.date, t, n), v?.(e.date, t, n));
	}, [
		ie,
		v,
		V
	]), Te = a((e, t) => (n) => {
		V(e), y?.(e.date, t, n);
	}, [y, V]), Ee = a((e, t) => (n) => {
		B(), _?.(e.date, t, n);
	}, [B, _]), De = a((e, t) => (r) => {
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
	]), Oe = a((e, t) => (n) => {
		x?.(e.date, t, n);
	}, [x]), ke = a((e, t) => (n) => {
		S?.(e.date, t, n);
	}, [S]), Ae = a((e) => (t) => {
		let n = Number(t.target.value);
		te(c.setMonth(c.startOfMonth(e), n));
	}, [c, te]), je = a((e) => (t) => {
		let n = Number(t.target.value);
		te(c.setYear(c.startOfMonth(e), n));
	}, [c, te]), { className: Me, style: Ne } = l(() => ({
		className: [f[X.Root], n.className].filter(Boolean).join(" "),
		style: {
			...E?.[X.Root],
			...n.style
		}
	}), [
		f,
		n.className,
		n.style,
		E
	]), Pe = Sg(n), Fe = u(null);
	u_(Fe, !!n.animate, {
		classNames: f,
		months: I,
		focused: oe,
		dateLib: c
	});
	let Ie = {
		dayPickerProps: n,
		selected: ae,
		select: ie,
		isSelected: re,
		months: I,
		nextMonth: ee,
		previousMonth: z,
		goToMonth: te,
		getModifiers: ne,
		components: i,
		classNames: f,
		styles: E,
		labels: s,
		formatters: o
	};
	return t.createElement(Jh.Provider, { value: Ie }, t.createElement(i.Root, {
		rootRef: n.animate ? Fe : void 0,
		className: Me,
		style: Ne,
		dir: n.dir,
		id: n.id,
		lang: n.lang ?? d.code,
		nonce: n.nonce,
		title: n.title,
		role: n.role,
		"aria-label": n["aria-label"],
		"aria-labelledby": n["aria-labelledby"],
		...Pe
	}, t.createElement(i.Months, {
		className: f[X.Months],
		style: E?.[X.Months]
	}, !n.hideNavigation && !h && t.createElement(i.Nav, {
		"data-animated-nav": n.animate ? "true" : void 0,
		className: f[X.Nav],
		style: E?.[X.Nav],
		"aria-label": pe(),
		onPreviousClick: Se,
		onNextClick: Ce,
		previousMonth: z,
		nextMonth: ee
	}), I.map((e, r) => t.createElement(i.Month, {
		"data-animated-month": n.animate ? "true" : void 0,
		className: f[X.Month],
		style: E?.[X.Month],
		key: r,
		displayIndex: r,
		calendarMonth: e
	}, h === "around" && !n.hideNavigation && r === 0 && t.createElement(i.PreviousMonthButton, {
		type: "button",
		className: f[X.PreviousMonthButton],
		tabIndex: z ? void 0 : -1,
		"aria-disabled": z ? void 0 : !0,
		"aria-label": me(z),
		onClick: Se,
		"data-animated-button": n.animate ? "true" : void 0
	}, t.createElement(i.Chevron, {
		disabled: z ? void 0 : !0,
		className: f[X.Chevron],
		orientation: n.dir === "rtl" ? "right" : "left"
	})), t.createElement(i.MonthCaption, {
		"data-animated-caption": n.animate ? "true" : void 0,
		className: f[X.MonthCaption],
		style: E?.[X.MonthCaption],
		calendarMonth: e,
		displayIndex: r
	}, p?.startsWith("dropdown") ? t.createElement(i.DropdownNav, {
		className: f[X.Dropdowns],
		style: E?.[X.Dropdowns]
	}, (() => {
		let r = p === "dropdown" || p === "dropdown-months" ? t.createElement(i.MonthsDropdown, {
			key: "month",
			className: f[X.MonthsDropdown],
			"aria-label": fe(),
			classNames: f,
			components: i,
			disabled: !!n.disableNavigation,
			onChange: Ae(e.date),
			options: Qg(e.date, L, R, o, c),
			style: E?.[X.Dropdown],
			value: c.getMonth(e.date)
		}) : t.createElement("span", { key: "month" }, k(e.date, c)), a = p === "dropdown" || p === "dropdown-years" ? t.createElement(i.YearsDropdown, {
			key: "year",
			className: f[X.YearsDropdown],
			"aria-label": ye(c.options),
			classNames: f,
			components: i,
			disabled: !!n.disableNavigation,
			onChange: je(e.date),
			options: t_(L, R, o, c, !!n.reverseYears),
			style: E?.[X.Dropdown],
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
		className: f[X.CaptionLabel],
		role: "status",
		"aria-live": "polite"
	}, D(e.date, c.options, c))), h === "around" && !n.hideNavigation && r === g - 1 && t.createElement(i.NextMonthButton, {
		type: "button",
		className: f[X.NextMonthButton],
		tabIndex: ee ? void 0 : -1,
		"aria-disabled": ee ? void 0 : !0,
		"aria-label": he(ee),
		onClick: Ce,
		"data-animated-button": n.animate ? "true" : void 0
	}, t.createElement(i.Chevron, {
		disabled: ee ? void 0 : !0,
		className: f[X.Chevron],
		orientation: n.dir === "rtl" ? "left" : "right"
	})), r === g - 1 && h === "after" && !n.hideNavigation && t.createElement(i.Nav, {
		"data-animated-nav": n.animate ? "true" : void 0,
		className: f[X.Nav],
		style: E?.[X.Nav],
		"aria-label": pe(),
		onPreviousClick: Se,
		onNextClick: Ce,
		previousMonth: z,
		nextMonth: ee
	}), t.createElement(i.MonthGrid, {
		role: "grid",
		"aria-multiselectable": m === "multiple" || m === "range",
		"aria-label": de(e.date, c.options, c) || void 0,
		className: f[X.MonthGrid],
		style: E?.[X.MonthGrid]
	}, !n.hideWeekdays && t.createElement(i.Weekdays, {
		"data-animated-weekdays": n.animate ? "true" : void 0,
		className: f[X.Weekdays],
		style: E?.[X.Weekdays]
	}, T && t.createElement(i.WeekNumberHeader, {
		"aria-label": ve(c.options),
		className: f[X.WeekNumberHeader],
		style: E?.[X.WeekNumberHeader],
		scope: "col"
	}, j()), be.map((e) => t.createElement(i.Weekday, {
		"aria-label": ge(e, c.options, c),
		className: f[X.Weekday],
		key: String(e),
		style: E?.[X.Weekday],
		scope: "col"
	}, M(e, c.options, c)))), t.createElement(i.Weeks, {
		"data-animated-weeks": n.animate ? "true" : void 0,
		className: f[X.Weeks],
		style: E?.[X.Weeks]
	}, e.weeks.map((e) => t.createElement(i.Week, {
		className: f[X.Week],
		key: e.weekNumber,
		style: E?.[X.Week],
		week: e
	}, T && t.createElement(i.WeekNumber, {
		week: e,
		style: E?.[X.WeekNumber],
		"aria-label": _e(e.weekNumber, { locale: d }),
		className: f[X.WeekNumber],
		scope: "row",
		role: "rowheader"
	}, A(e.weekNumber, c)), e.days.map((e) => {
		let { date: r } = e, a = ne(e);
		if (a[Z.focused] = !a.hidden && !!oe?.isEqualTo(e), a[zh.selected] = re?.(r) || a.selected, pg(ae)) {
			let { from: e, to: t } = ae;
			a[zh.range_start] = !!(e && t && c.isSameDay(r, e)), a[zh.range_end] = !!(e && t && c.isSameDay(r, t)), a[zh.range_middle] = dg(ae, r, !0, c);
		}
		let o = $g(a, E, n.modifiersStyles), s = bg(a, f, n.modifiersClassNames), l = !xe && !a.hidden ? ue(r, a, c.options, c) : void 0;
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
		}, !a.hidden && xe ? t.createElement(i.DayButton, {
			className: f[X.DayButton],
			style: E?.[X.DayButton],
			type: "button",
			day: e,
			modifiers: a,
			disabled: !a.focused && a.disabled || void 0,
			"aria-disabled": a.focused && a.disabled || void 0,
			tabIndex: se(e) ? 0 : -1,
			"aria-label": le(r, a, c.options, c),
			onClick: we(e, a),
			onBlur: Ee(e, a),
			onFocus: Te(e, a),
			onKeyDown: De(e, a),
			onMouseEnter: Oe(e, a),
			onMouseLeave: ke(e, a)
		}, O(r, c.options, c)) : !a.hidden && O(e.date, c.options, c));
	})))))))), n.footer && t.createElement(i.Footer, {
		className: f[X.Footer],
		style: E?.[X.Footer],
		role: "status",
		"aria-live": "polite"
	}, n.footer)));
}
var V_ = {
	content: "_content_1g7q0_1",
	popoverShow: "_popoverShow_1g7q0_1",
	popoverHide: "_popoverHide_1g7q0_1"
}, H_ = {
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
}, U_ = {
	wrapper: "_wrapper_bsvsi_2",
	label: "_label_bsvsi_11",
	triggerBtn: "_triggerBtn_bsvsi_18",
	triggerBtnEmpty: "_triggerBtnEmpty_bsvsi_31",
	calendarIcon: "_calendarIcon_bsvsi_36",
	prefixo: "_prefixo_bsvsi_43",
	popoverContent: "_popoverContent_bsvsi_50",
	errorMessage: "_errorMessage_bsvsi_56"
}, W_ = Gc, G_ = Kc, K_ = e.forwardRef(({ className: e, align: t = "center", sideOffset: n = 4, ...r }, i) => /* @__PURE__ */ p(qc, { children: /* @__PURE__ */ p(Jc, {
	ref: i,
	align: t,
	sideOffset: n,
	className: S(V_.content, e),
	...r
}) }));
function q_({ className: e, classNames: t, showOutsideDays: n = !0, ...r }) {
	return /* @__PURE__ */ p(B_, {
		locale: uh,
		showOutsideDays: n,
		className: S(H_.rdpScope, e),
		classNames: t,
		components: { Chevron: ({ orientation: e }) => /* @__PURE__ */ p(e === "left" ? V : le, { size: 16 }) },
		...r
	});
}
var J_ = e.forwardRef(({ date: t, onSelect: n, label: r, error: i, placeholder: a = "Selecione uma data", className: o, id: s, formato: c = "PPP", prefixo: l, minDate: u, maxDate: d, desabilitar: f }, h) => {
	let g = !!i, [_, v] = e.useState(!1), y = s || `datepicker-${r?.replace(/\s+/g, "-").toLowerCase()}`;
	return /* @__PURE__ */ m("div", {
		className: S(U_.wrapper, o),
		children: [
			r && /* @__PURE__ */ p("label", {
				htmlFor: y,
				className: U_.label,
				children: r
			}),
			/* @__PURE__ */ m(W_, {
				open: _,
				onOpenChange: v,
				children: [/* @__PURE__ */ p(G_, {
					asChild: !0,
					children: /* @__PURE__ */ m("button", {
						id: y,
						ref: h,
						type: "button",
						className: S(Xe({
							hasError: g,
							hasIcon: !1
						}), U_.triggerBtn, !t && U_.triggerBtnEmpty),
						children: [
							/* @__PURE__ */ p(B, {
								className: U_.calendarIcon,
								size: 16
							}),
							l && t && /* @__PURE__ */ p("span", {
								className: U_.prefixo,
								children: l
							}),
							t ? Ym(t, c, { locale: uh }) : /* @__PURE__ */ p("span", { children: a })
						]
					})
				}), /* @__PURE__ */ p(K_, {
					className: U_.popoverContent,
					children: /* @__PURE__ */ p(q_, {
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
			i && /* @__PURE__ */ p("span", {
				className: U_.errorMessage,
				children: i
			})
		]
	});
});
J_.displayName = "DatePicker";
var Y_ = {
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
}, X_ = ({ options: e, value: t, onChange: n, label: r, fitOptions: i, error: a, placeholder: o = "Selecione...", className: l }) => {
	let [f, h] = d(!1), [_, v] = d({
		top: 0,
		left: 0,
		width: 0
	}), y = u(null), b = u(null), x = e.find((e) => e.value === t), C = (e, t) => {
		t.preventDefault(), t.stopPropagation(), n && n(e.value), setTimeout(() => {
			h(!1);
		}, 0);
	};
	return c(() => {
		if (f && b.current) {
			let e = b.current.getBoundingClientRect();
			v({
				top: e.bottom + window.scrollY,
				left: e.left + window.scrollX,
				width: e.width
			});
		}
	}, [f]), s(() => {
		let e = (e) => {
			b.current?.contains(e.target) || document.getElementById("avere-select-portal")?.contains(e.target) || h(!1);
		};
		return f && document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [f]), /* @__PURE__ */ m("div", {
		className: S(Y_.container, l),
		ref: y,
		children: [
			r && /* @__PURE__ */ p("label", {
				className: Y_.label,
				children: r
			}),
			/* @__PURE__ */ m("div", {
				ref: b,
				className: S(Y_.trigger, f && Y_.triggerActive, a && Y_.triggerError),
				onClick: (e) => {
					e.stopPropagation(), h(!f);
				},
				children: [/* @__PURE__ */ m("span", {
					className: S(Y_.value, !x && Y_.placeholder),
					children: [x ? x.label : o, i && /* @__PURE__ */ m("span", {
						"aria-hidden": "true",
						className: Y_.sizer,
						children: [e.map((e) => /* @__PURE__ */ p("span", { children: e.label }, String(e.value))), o && /* @__PURE__ */ p("span", { children: o })]
					})]
				}), /* @__PURE__ */ p(ce, {
					size: 18,
					className: S(Y_.icon, f && Y_.iconOpen)
				})]
			}),
			f && g.createPortal(/* @__PURE__ */ p("div", {
				id: "avere-select-portal",
				className: Y_.dropdown,
				style: {
					position: "absolute",
					top: `${_.top}px`,
					left: `${_.left}px`,
					width: `${_.width}px`,
					zIndex: 99999,
					fontFamily: "Montserrat, sans-serif"
				},
				children: e.map((e) => /* @__PURE__ */ m("div", {
					className: S(Y_.option, t === e.value && Y_.optionSelected),
					onMouseDown: (t) => C(e, t),
					children: [/* @__PURE__ */ p("span", {
						style: { pointerEvents: "none" },
						children: e.label
					}), t === e.value && /* @__PURE__ */ p(se, {
						size: 16,
						className: Y_.checkIcon
					})]
				}, e.value))
			}), document.body),
			a && /* @__PURE__ */ p("span", {
				className: Y_.errorMessage,
				children: a
			})
		]
	});
}, [Z_, Q_] = rt("Tooltip", [No]), $_ = No(), ev = "TooltipProvider", tv = 700, nv = "tooltip.open", [rv, iv] = Z_(ev), av = (t) => {
	let { __scopeTooltip: n, delayDuration: r = tv, skipDelayDuration: i = 300, disableHoverableContent: a = !1, children: o } = t, s = e.useRef(!0), c = e.useRef(!1), l = e.useRef(0);
	return e.useEffect(() => {
		let e = l.current;
		return () => window.clearTimeout(e);
	}, []), /* @__PURE__ */ p(rv, {
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
av.displayName = ev;
var ov = "Tooltip", [sv, cv] = Z_(ov), lv = (t) => {
	let { __scopeTooltip: n, children: r, open: i, defaultOpen: a, onOpenChange: o, disableHoverableContent: s, delayDuration: c } = t, l = iv(ov, t.__scopeTooltip), u = $_(n), [d, f] = e.useState(null), m = _t(), h = e.useRef(0), g = s ?? l.disableHoverableContent, _ = c ?? l.delayDuration, v = e.useRef(!1), [y, b] = bt({
		prop: i,
		defaultProp: a ?? !1,
		onChange: (e) => {
			e ? (l.onOpen(), document.dispatchEvent(new CustomEvent(nv))) : l.onClose(), o?.(e);
		},
		caller: ov
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
	}, []), /* @__PURE__ */ p(Yo, {
		...u,
		children: /* @__PURE__ */ p(sv, {
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
lv.displayName = ov;
var uv = "TooltipTrigger", dv = e.forwardRef((t, n) => {
	let { __scopeTooltip: r, ...i } = t, a = cv(uv, r), o = iv(uv, r), s = $_(r), c = U(n, e.useRef(null), a.onTriggerChange), l = e.useRef(!1), u = e.useRef(!1), d = e.useCallback(() => l.current = !1, []);
	return e.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), /* @__PURE__ */ p(Xo, {
		asChild: !0,
		...s,
		children: /* @__PURE__ */ p(W.button, {
			"aria-describedby": a.open ? a.contentId : void 0,
			"data-state": a.stateAttribute,
			...i,
			ref: c,
			onPointerMove: H(t.onPointerMove, (e) => {
				e.pointerType !== "touch" && !u.current && !o.isPointerInTransitRef.current && (a.onTriggerEnter(), u.current = !0);
			}),
			onPointerLeave: H(t.onPointerLeave, () => {
				a.onTriggerLeave(), u.current = !1;
			}),
			onPointerDown: H(t.onPointerDown, () => {
				a.open && a.onClose(), l.current = !0, document.addEventListener("pointerup", d, { once: !0 });
			}),
			onFocus: H(t.onFocus, () => {
				l.current || a.onOpen();
			}),
			onBlur: H(t.onBlur, a.onClose),
			onClick: H(t.onClick, a.onClose)
		})
	});
});
dv.displayName = uv;
var fv = "TooltipPortal", [pv, mv] = Z_(fv, { forceMount: void 0 }), hv = (e) => {
	let { __scopeTooltip: t, forceMount: n, children: r, container: i } = e, a = cv(fv, t);
	return /* @__PURE__ */ p(pv, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ p(Yt, {
			present: n || a.open,
			children: /* @__PURE__ */ p(es, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
};
hv.displayName = fv;
var gv = "TooltipContent", _v = e.forwardRef((e, t) => {
	let n = mv(gv, e.__scopeTooltip), { forceMount: r = n.forceMount, side: i = "top", ...a } = e, o = cv(gv, e.__scopeTooltip);
	return /* @__PURE__ */ p(Yt, {
		present: r || o.open,
		children: o.disableHoverableContent ? /* @__PURE__ */ p(Sv, {
			side: i,
			...a,
			ref: t
		}) : /* @__PURE__ */ p(vv, {
			side: i,
			...a,
			ref: t
		})
	});
}), vv = e.forwardRef((t, n) => {
	let r = cv(gv, t.__scopeTooltip), i = iv(gv, t.__scopeTooltip), a = e.useRef(null), o = U(n, a), [s, c] = e.useState(null), { trigger: l, onClose: u } = r, d = a.current, { onPointerInTransitChange: f } = i, m = e.useCallback(() => {
		c(null), f(!1);
	}, [f]), h = e.useCallback((e, t) => {
		let n = e.currentTarget, r = {
			x: e.clientX,
			y: e.clientY
		}, i = Ev(r, Tv(r, n.getBoundingClientRect())), a = Dv(t.getBoundingClientRect());
		c(kv([...i, ...a])), f(!0);
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
				}, r = l?.contains(t) || d?.contains(t), i = !Ov(n, s);
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
	]), /* @__PURE__ */ p(Sv, {
		...t,
		ref: o
	});
}), [yv, bv] = Z_(ov, { isInside: !1 }), xv = /* @__PURE__ */ ct("TooltipContent"), Sv = e.forwardRef((t, n) => {
	let { __scopeTooltip: r, children: i, "aria-label": a, onEscapeKeyDown: o, onPointerDownOutside: s, ...c } = t, l = cv(gv, r), u = $_(r), { onClose: d } = l;
	return e.useEffect(() => (document.addEventListener(nv, d), () => document.removeEventListener(nv, d)), [d]), e.useEffect(() => {
		if (l.trigger) {
			let e = (e) => {
				e.target?.contains(l.trigger) && d();
			};
			return window.addEventListener("scroll", e, { capture: !0 }), () => window.removeEventListener("scroll", e, { capture: !0 });
		}
	}, [l.trigger, d]), /* @__PURE__ */ p(Ur, {
		asChild: !0,
		disableOutsidePointerEvents: !1,
		onEscapeKeyDown: o,
		onPointerDownOutside: s,
		onFocusOutside: (e) => e.preventDefault(),
		onDismiss: d,
		children: /* @__PURE__ */ m(Zo, {
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
			children: [/* @__PURE__ */ p(xv, { children: i }), /* @__PURE__ */ p(yv, {
				scope: r,
				isInside: !0,
				children: /* @__PURE__ */ p(nl, {
					id: l.contentId,
					role: "tooltip",
					children: a || i
				})
			})]
		})
	});
});
_v.displayName = gv;
var Cv = "TooltipArrow", wv = e.forwardRef((e, t) => {
	let { __scopeTooltip: n, ...r } = e, i = $_(n);
	return bv(Cv, n).isInside ? null : /* @__PURE__ */ p(Qo, {
		...i,
		...r,
		ref: t
	});
});
wv.displayName = Cv;
function Tv(e, t) {
	let n = Math.abs(t.top - e.y), r = Math.abs(t.bottom - e.y), i = Math.abs(t.right - e.x), a = Math.abs(t.left - e.x);
	switch (Math.min(n, r, i, a)) {
		case a: return "left";
		case i: return "right";
		case n: return "top";
		case r: return "bottom";
		default: throw Error("unreachable");
	}
}
function Ev(e, t, n = 5) {
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
function Dv(e) {
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
function Ov(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e], s = t[a], c = o.x, l = o.y, u = s.x, d = s.y;
		l > r != d > r && n < (u - c) * (r - l) / (d - l) + c && (i = !i);
	}
	return i;
}
function kv(e) {
	let t = e.slice();
	return t.sort((e, t) => e.x < t.x ? -1 : e.x > t.x ? 1 : e.y < t.y ? -1 : e.y > t.y ? 1 : 0), Av(t);
}
function Av(e) {
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
var jv = av, Mv = lv, Nv = dv, Pv = _v, Fv = {
	content: "_content_phmwu_1",
	"tooltip-show": "_tooltip-show_phmwu_1",
	"tooltip-hide": "_tooltip-hide_phmwu_1",
	"slide-up": "_slide-up_phmwu_1",
	"slide-down": "_slide-down_phmwu_1",
	"slide-left": "_slide-left_phmwu_1",
	"slide-right": "_slide-right_phmwu_1"
}, Iv = jv, Lv = Mv, Rv = Nv, zv = e.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ p(Pv, {
	ref: r,
	sideOffset: t,
	className: S(Fv.content, e),
	...n
}));
zv.displayName = Pv.displayName;
//#endregion
//#region node_modules/sonner/dist/index.mjs
function Bv(e) {
	if (!e || typeof document > "u") return;
	let t = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
	n.type = "text/css", t.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e));
}
var Vv = (e) => {
	switch (e) {
		case "success": return Wv;
		case "info": return Kv;
		case "warning": return Gv;
		case "error": return qv;
		default: return null;
	}
}, Hv = Array(12).fill(0), Uv = ({ visible: e, className: n }) => /* @__PURE__ */ t.createElement("div", {
	className: ["sonner-loading-wrapper", n].filter(Boolean).join(" "),
	"data-visible": e
}, /* @__PURE__ */ t.createElement("div", { className: "sonner-spinner" }, Hv.map((e, n) => /* @__PURE__ */ t.createElement("div", {
	className: "sonner-loading-bar",
	key: `spinner-bar-${n}`
})))), Wv = /* @__PURE__ */ t.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20"
}, /* @__PURE__ */ t.createElement("path", {
	fillRule: "evenodd",
	d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
	clipRule: "evenodd"
})), Gv = /* @__PURE__ */ t.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "currentColor",
	height: "20",
	width: "20"
}, /* @__PURE__ */ t.createElement("path", {
	fillRule: "evenodd",
	d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
	clipRule: "evenodd"
})), Kv = /* @__PURE__ */ t.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20"
}, /* @__PURE__ */ t.createElement("path", {
	fillRule: "evenodd",
	d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
	clipRule: "evenodd"
})), qv = /* @__PURE__ */ t.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20"
}, /* @__PURE__ */ t.createElement("path", {
	fillRule: "evenodd",
	d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
	clipRule: "evenodd"
})), Jv = /* @__PURE__ */ t.createElement("svg", {
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
})), Yv = () => {
	let [e, n] = t.useState(document.hidden);
	return t.useEffect(() => {
		let e = () => {
			n(document.hidden);
		};
		return document.addEventListener("visibilitychange", e), () => window.removeEventListener("visibilitychange", e);
	}, []), e;
}, Xv = 1, Zv = new class {
	constructor() {
		this.subscribe = (e) => (this.subscribers.push(e), () => {
			let t = this.subscribers.indexOf(e);
			this.subscribers.splice(t, 1);
		}), this.publish = (e) => {
			this.subscribers.forEach((t) => t(e));
		}, this.addToast = (e) => {
			this.publish(e), this.toasts = [...this.toasts, e];
		}, this.create = (e) => {
			let { message: t, ...n } = e, r = typeof e?.id == "number" || e.id?.length > 0 ? e.id : Xv++, i = this.toasts.find((e) => e.id === r), a = e.dismissible === void 0 ? !0 : e.dismissible;
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
				else if ($v(e) && !e.ok) {
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
			let n = t?.id || Xv++;
			return this.create({
				jsx: e(n),
				id: n,
				...t
			}), n;
		}, this.getActiveToasts = () => this.toasts.filter((e) => !this.dismissedToasts.has(e.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
	}
}(), Qv = (e, t) => {
	let n = t?.id || Xv++;
	return Zv.addToast({
		title: e,
		...t,
		id: n
	}), n;
}, $v = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", ey = Qv, ty = Object.assign(ey, {
	success: Zv.success,
	info: Zv.info,
	warning: Zv.warning,
	error: Zv.error,
	custom: Zv.custom,
	message: Zv.message,
	promise: Zv.promise,
	dismiss: Zv.dismiss,
	loading: Zv.loading
}, {
	getHistory: () => Zv.toasts,
	getToasts: () => Zv.getActiveToasts()
});
Bv("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function ny(e) {
	return e.label !== void 0;
}
var ry = 3, iy = "24px", ay = "16px", oy = 4e3, sy = 356, cy = 14, ly = 45, uy = 200;
function dy(...e) {
	return e.filter(Boolean).join(" ");
}
function fy(e) {
	let [t, n] = e.split("-"), r = [];
	return t && r.push(t), n && r.push(n), r;
}
var py = (e) => {
	let { invert: n, toast: r, unstyled: i, interacting: a, setHeights: o, visibleToasts: s, heights: c, index: l, toasts: u, expanded: d, removeToast: f, defaultRichColors: p, closeButton: m, style: h, cancelButtonStyle: g, actionButtonStyle: _, className: v = "", descriptionClassName: y = "", duration: b, position: x, gap: S, expandByDefault: C, classNames: w, icons: T, closeButtonAriaLabel: E = "Close toast" } = e, [D, O] = t.useState(null), [k, A] = t.useState(null), [j, M] = t.useState(!1), [N, P] = t.useState(!1), [F, I] = t.useState(!1), [L, R] = t.useState(!1), [z, ee] = t.useState(!1), [te, ne] = t.useState(0), [re, ie] = t.useState(0), ae = t.useRef(r.duration || b || oy), B = t.useRef(null), oe = t.useRef(null), se = l === 0, ce = l + 1 <= s, V = r.type, le = r.dismissible !== !1, ue = r.className || "", de = r.descriptionClassName || "", fe = t.useMemo(() => c.findIndex((e) => e.toastId === r.id) || 0, [c, r.id]), pe = t.useMemo(() => r.closeButton ?? m, [r.closeButton, m]), me = t.useMemo(() => r.duration || b || oy, [r.duration, b]), he = t.useRef(0), ge = t.useRef(0), _e = t.useRef(0), ve = t.useRef(null), [ye, be] = x.split("-"), xe = t.useMemo(() => c.reduce((e, t, n) => n >= fe ? e : e + t.height, 0), [c, fe]), Se = Yv(), Ce = r.invert || n, we = V === "loading";
	ge.current = t.useMemo(() => fe * S + xe, [fe, xe]), t.useEffect(() => {
		ae.current = me;
	}, [me]), t.useEffect(() => {
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
	let Te = t.useCallback(() => {
		P(!0), ne(ge.current), o((e) => e.filter((e) => e.toastId !== r.id)), setTimeout(() => {
			f(r);
		}, uy);
	}, [
		r,
		f,
		o,
		ge
	]);
	t.useEffect(() => {
		if (r.promise && V === "loading" || r.duration === Infinity || r.type === "loading") return;
		let e;
		return d || a || Se ? (() => {
			if (_e.current < he.current) {
				let e = (/* @__PURE__ */ new Date()).getTime() - he.current;
				ae.current -= e;
			}
			_e.current = (/* @__PURE__ */ new Date()).getTime();
		})() : ae.current !== Infinity && (he.current = (/* @__PURE__ */ new Date()).getTime(), e = setTimeout(() => {
			r.onAutoClose == null || r.onAutoClose.call(r, r), Te();
		}, ae.current)), () => clearTimeout(e);
	}, [
		d,
		a,
		r,
		V,
		Se,
		Te
	]), t.useEffect(() => {
		r.delete && (Te(), r.onDismiss == null || r.onDismiss.call(r, r));
	}, [Te, r.delete]);
	function Ee() {
		return T?.loading ? /* @__PURE__ */ t.createElement("div", {
			className: dy(w?.loader, r?.classNames?.loader, "sonner-loader"),
			"data-visible": V === "loading"
		}, T.loading) : /* @__PURE__ */ t.createElement(Uv, {
			className: dy(w?.loader, r?.classNames?.loader),
			visible: V === "loading"
		});
	}
	let De = r.icon || T?.[V] || Vv(V);
	return /* @__PURE__ */ t.createElement("li", {
		tabIndex: 0,
		ref: oe,
		className: dy(v, ue, w?.toast, r?.classNames?.toast, w?.default, w?.[V], r?.classNames?.[V]),
		"data-sonner-toast": "",
		"data-rich-colors": r.richColors ?? p,
		"data-styled": !(r.jsx || r.unstyled || i),
		"data-mounted": j,
		"data-promise": !!r.promise,
		"data-swiped": z,
		"data-removed": N,
		"data-visible": ce,
		"data-y-position": ye,
		"data-x-position": be,
		"data-index": l,
		"data-front": se,
		"data-swiping": F,
		"data-dismissible": le,
		"data-type": V,
		"data-invert": Ce,
		"data-swipe-out": L,
		"data-swipe-direction": k,
		"data-expanded": !!(d || C && j),
		"data-testid": r.testId,
		style: {
			"--index": l,
			"--toasts-before": l,
			"--z-index": u.length - l,
			"--offset": `${N ? te : ge.current}px`,
			"--initial-height": C ? "auto" : `${re}px`,
			...h,
			...r.style
		},
		onDragEnd: () => {
			I(!1), O(null), ve.current = null;
		},
		onPointerDown: (e) => {
			e.button !== 2 && (we || !le || (B.current = /* @__PURE__ */ new Date(), ne(ge.current), e.target.setPointerCapture(e.pointerId), e.target.tagName !== "BUTTON" && (I(!0), ve.current = {
				x: e.clientX,
				y: e.clientY
			})));
		},
		onPointerUp: () => {
			if (L || !le) return;
			ve.current = null;
			let e = Number(oe.current?.style.getPropertyValue("--swipe-amount-x").replace("px", "") || 0), t = Number(oe.current?.style.getPropertyValue("--swipe-amount-y").replace("px", "") || 0), n = (/* @__PURE__ */ new Date()).getTime() - B.current?.getTime(), i = D === "x" ? e : t, a = Math.abs(i) / n;
			if (Math.abs(i) >= ly || a > .11) {
				ne(ge.current), r.onDismiss == null || r.onDismiss.call(r, r), A(D === "x" ? e > 0 ? "right" : "left" : t > 0 ? "down" : "up"), Te(), R(!0);
				return;
			} else {
				var o, s;
				(o = oe.current) == null || o.style.setProperty("--swipe-amount-x", "0px"), (s = oe.current) == null || s.style.setProperty("--swipe-amount-y", "0px");
			}
			ee(!1), I(!1), O(null);
		},
		onPointerMove: (t) => {
			var n, r;
			if (!ve.current || !le || window.getSelection()?.toString().length > 0) return;
			let i = t.clientY - ve.current.y, a = t.clientX - ve.current.x, o = e.swipeDirections ?? fy(x);
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
			(Math.abs(s.x) > 0 || Math.abs(s.y) > 0) && ee(!0), (n = oe.current) == null || n.style.setProperty("--swipe-amount-x", `${s.x}px`), (r = oe.current) == null || r.style.setProperty("--swipe-amount-y", `${s.y}px`);
		}
	}, pe && !r.jsx && V !== "loading" ? /* @__PURE__ */ t.createElement("button", {
		"aria-label": E,
		"data-disabled": we,
		"data-close-button": !0,
		onClick: we || !le ? () => {} : () => {
			Te(), r.onDismiss == null || r.onDismiss.call(r, r);
		},
		className: dy(w?.closeButton, r?.classNames?.closeButton)
	}, T?.close ?? Jv) : null, (V || r.icon || r.promise) && r.icon !== null && (T?.[V] !== null || r.icon) ? /* @__PURE__ */ t.createElement("div", {
		"data-icon": "",
		className: dy(w?.icon, r?.classNames?.icon)
	}, r.promise || r.type === "loading" && !r.icon ? r.icon || Ee() : null, r.type === "loading" ? null : De) : null, /* @__PURE__ */ t.createElement("div", {
		"data-content": "",
		className: dy(w?.content, r?.classNames?.content)
	}, /* @__PURE__ */ t.createElement("div", {
		"data-title": "",
		className: dy(w?.title, r?.classNames?.title)
	}, r.jsx ? r.jsx : typeof r.title == "function" ? r.title() : r.title), r.description ? /* @__PURE__ */ t.createElement("div", {
		"data-description": "",
		className: dy(y, de, w?.description, r?.classNames?.description)
	}, typeof r.description == "function" ? r.description() : r.description) : null), /* @__PURE__ */ t.isValidElement(r.cancel) ? r.cancel : r.cancel && ny(r.cancel) ? /* @__PURE__ */ t.createElement("button", {
		"data-button": !0,
		"data-cancel": !0,
		style: r.cancelButtonStyle || g,
		onClick: (e) => {
			ny(r.cancel) && le && (r.cancel.onClick == null || r.cancel.onClick.call(r.cancel, e), Te());
		},
		className: dy(w?.cancelButton, r?.classNames?.cancelButton)
	}, r.cancel.label) : null, /* @__PURE__ */ t.isValidElement(r.action) ? r.action : r.action && ny(r.action) ? /* @__PURE__ */ t.createElement("button", {
		"data-button": !0,
		"data-action": !0,
		style: r.actionButtonStyle || _,
		onClick: (e) => {
			ny(r.action) && (r.action.onClick == null || r.action.onClick.call(r.action, e), !e.defaultPrevented && Te());
		},
		className: dy(w?.actionButton, r?.classNames?.actionButton)
	}, r.action.label) : null);
};
function my() {
	if (typeof window > "u" || typeof document > "u") return "ltr";
	let e = document.documentElement.getAttribute("dir");
	return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function hy(e, t) {
	let n = {};
	return [e, t].forEach((e, t) => {
		let r = t === 1, i = r ? "--mobile-offset" : "--offset", a = r ? ay : iy;
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
var gy = /* @__PURE__ */ t.forwardRef(function(e, n) {
	let { id: r, invert: i, position: a = "bottom-right", hotkey: o = ["altKey", "KeyT"], expand: s, closeButton: c, className: l, offset: u, mobileOffset: d, theme: f = "light", richColors: p, duration: m, style: h, visibleToasts: _ = ry, toastOptions: v, dir: y = my(), gap: b = cy, icons: x, containerAriaLabel: S = "Notifications" } = e, [C, w] = t.useState([]), T = t.useMemo(() => r ? C.filter((e) => e.toasterId === r) : C.filter((e) => !e.toasterId), [C, r]), E = t.useMemo(() => Array.from(new Set([a].concat(T.filter((e) => e.position).map((e) => e.position)))), [T, a]), [D, O] = t.useState([]), [k, A] = t.useState(!1), [j, M] = t.useState(!1), [N, P] = t.useState(f === "system" ? typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : f), F = t.useRef(null), I = o.join("+").replace(/Key/g, "").replace(/Digit/g, ""), L = t.useRef(null), R = t.useRef(!1), z = t.useCallback((e) => {
		w((t) => (t.find((t) => t.id === e.id)?.delete || Zv.dismiss(e.id), t.filter(({ id: t }) => t !== e.id)));
	}, []);
	return t.useEffect(() => Zv.subscribe((e) => {
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
			L.current && (L.current.focus({ preventScroll: !0 }), L.current = null, R.current = !1);
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
			dir: y === "auto" ? my() : y,
			tabIndex: -1,
			ref: F,
			className: l,
			"data-sonner-toaster": !0,
			"data-sonner-theme": N,
			"data-y-position": a,
			"data-x-position": o,
			style: {
				"--front-toast-height": `${D[0]?.height || 0}px`,
				"--width": `${sy}px`,
				"--gap": `${b}px`,
				...h,
				...hy(u, d)
			},
			onBlur: (e) => {
				R.current && !e.currentTarget.contains(e.relatedTarget) && (R.current = !1, L.current &&= (L.current.focus({ preventScroll: !0 }), null));
			},
			onFocus: (e) => {
				e.target instanceof HTMLElement && e.target.dataset.dismissible === "false" || R.current || (R.current = !0, L.current = e.relatedTarget);
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
		}, T.filter((e) => !e.position && r === 0 || e.position === n).map((r, a) => /* @__PURE__ */ t.createElement(py, {
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
			removeToast: z,
			toasts: T.filter((e) => e.position == r.position),
			heights: D.filter((e) => e.position == r.position),
			setHeights: O,
			expandByDefault: s,
			gap: b,
			expanded: k,
			swipeDirections: e.swipeDirections
		}))) : null;
	}));
}), _y = {
	toast: "_toast_4s9xe_1",
	description: "_description_4s9xe_23",
	actionButton: "_actionButton_4s9xe_33",
	cancelButton: "_cancelButton_4s9xe_47",
	success: "_success_4s9xe_61",
	error: "_error_4s9xe_73",
	warning: "_warning_4s9xe_85",
	info: "_info_4s9xe_97"
}, vy = ({ ...e }) => /* @__PURE__ */ p(gy, {
	toastOptions: { classNames: {
		toast: _y.toast,
		description: _y.description,
		actionButton: _y.actionButton,
		cancelButton: _y.cancelButton,
		success: _y.success,
		error: _y.error,
		warning: _y.warning,
		info: _y.info
	} },
	...e
}), yy = "Dialog", [by, xy] = rt(yy), [Sy, Cy] = by(yy), wy = (t) => {
	let { __scopeDialog: n, children: r, open: i, defaultOpen: a, onOpenChange: o, modal: s = !0 } = t, c = e.useRef(null), l = e.useRef(null), [u, d] = bt({
		prop: i,
		defaultProp: a ?? !1,
		onChange: o,
		caller: yy
	});
	return /* @__PURE__ */ p(Sy, {
		scope: n,
		triggerRef: c,
		contentRef: l,
		contentId: _t(),
		titleId: _t(),
		descriptionId: _t(),
		open: u,
		onOpenChange: d,
		onOpenToggle: e.useCallback(() => d((e) => !e), [d]),
		modal: s,
		children: r
	});
};
wy.displayName = yy;
var Ty = "DialogTrigger", Ey = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = Cy(Ty, n), a = U(t, i.triggerRef);
	return /* @__PURE__ */ p(W.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": i.open,
		"aria-controls": i.contentId,
		"data-state": Ky(i.open),
		...r,
		ref: a,
		onClick: H(e.onClick, i.onOpenToggle)
	});
});
Ey.displayName = Ty;
var Dy = "DialogPortal", [Oy, ky] = by(Dy, { forceMount: void 0 }), Ay = (t) => {
	let { __scopeDialog: n, forceMount: r, children: i, container: a } = t, o = Cy(Dy, n);
	return /* @__PURE__ */ p(Oy, {
		scope: n,
		forceMount: r,
		children: e.Children.map(i, (e) => /* @__PURE__ */ p(Yt, {
			present: r || o.open,
			children: /* @__PURE__ */ p(es, {
				asChild: !0,
				container: a,
				children: e
			})
		}))
	});
};
Ay.displayName = Dy;
var jy = "DialogOverlay", My = e.forwardRef((e, t) => {
	let n = ky(jy, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = Cy(jy, e.__scopeDialog);
	return a.modal ? /* @__PURE__ */ p(Yt, {
		present: r || a.open,
		children: /* @__PURE__ */ p(Py, {
			...i,
			ref: t
		})
	}) : null;
});
My.displayName = jy;
var Ny = /* @__PURE__ */ at("DialogOverlay.RemoveScroll"), Py = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = Cy(jy, n);
	return /* @__PURE__ */ p(vc, {
		as: Ny,
		allowPinchZoom: !0,
		shards: [i.contentRef],
		children: /* @__PURE__ */ p(W.div, {
			"data-state": Ky(i.open),
			...r,
			ref: t,
			style: {
				pointerEvents: "auto",
				...r.style
			}
		})
	});
}), Fy = "DialogContent", Iy = e.forwardRef((e, t) => {
	let n = ky(Fy, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = Cy(Fy, e.__scopeDialog);
	return /* @__PURE__ */ p(Yt, {
		present: r || a.open,
		children: a.modal ? /* @__PURE__ */ p(Ly, {
			...i,
			ref: t
		}) : /* @__PURE__ */ p(Ry, {
			...i,
			ref: t
		})
	});
});
Iy.displayName = Fy;
var Ly = e.forwardRef((t, n) => {
	let r = Cy(Fy, t.__scopeDialog), i = e.useRef(null), a = U(n, r.contentRef, i);
	return e.useEffect(() => {
		let e = i.current;
		if (e) return ls(e);
	}, []), /* @__PURE__ */ p(zy, {
		...t,
		ref: a,
		trapFocus: r.open,
		disableOutsidePointerEvents: !0,
		onCloseAutoFocus: H(t.onCloseAutoFocus, (e) => {
			e.preventDefault(), r.triggerRef.current?.focus();
		}),
		onPointerDownOutside: H(t.onPointerDownOutside, (e) => {
			let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
			(t.button === 2 || n) && e.preventDefault();
		}),
		onFocusOutside: H(t.onFocusOutside, (e) => e.preventDefault())
	});
}), Ry = e.forwardRef((t, n) => {
	let r = Cy(Fy, t.__scopeDialog), i = e.useRef(!1), a = e.useRef(!1);
	return /* @__PURE__ */ p(zy, {
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
}), zy = e.forwardRef((t, n) => {
	let { __scopeDialog: r, trapFocus: i, onOpenAutoFocus: a, onCloseAutoFocus: o, ...s } = t, c = Cy(Fy, r), l = e.useRef(null), u = U(n, l);
	return Zr(), /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p(ri, {
		asChild: !0,
		loop: !0,
		trapped: i,
		onMountAutoFocus: a,
		onUnmountAutoFocus: o,
		children: /* @__PURE__ */ p(Ur, {
			role: "dialog",
			id: c.contentId,
			"aria-describedby": c.descriptionId,
			"aria-labelledby": c.titleId,
			"data-state": Ky(c.open),
			...s,
			ref: u,
			onDismiss: () => c.onOpenChange(!1)
		})
	}), /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p(Xy, { titleId: c.titleId }), /* @__PURE__ */ p(Qy, {
		contentRef: l,
		descriptionId: c.descriptionId
	})] })] });
}), By = "DialogTitle", Vy = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = Cy(By, n);
	return /* @__PURE__ */ p(W.h2, {
		id: i.titleId,
		...r,
		ref: t
	});
});
Vy.displayName = By;
var Hy = "DialogDescription", Uy = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = Cy(Hy, n);
	return /* @__PURE__ */ p(W.p, {
		id: i.descriptionId,
		...r,
		ref: t
	});
});
Uy.displayName = Hy;
var Wy = "DialogClose", Gy = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = Cy(Wy, n);
	return /* @__PURE__ */ p(W.button, {
		type: "button",
		...r,
		ref: t,
		onClick: H(e.onClick, () => i.onOpenChange(!1))
	});
});
Gy.displayName = Wy;
function Ky(e) {
	return e ? "open" : "closed";
}
var qy = "DialogTitleWarning", [Jy, Yy] = nt(qy, {
	contentName: Fy,
	titleName: By,
	docsSlug: "dialog"
}), Xy = ({ titleId: t }) => {
	let n = Yy(qy), r = `\`${n.contentName}\` requires a \`${n.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${n.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${n.docsSlug}`;
	return e.useEffect(() => {
		t && (document.getElementById(t) || console.error(r));
	}, [r, t]), null;
}, Zy = "DialogDescriptionWarning", Qy = ({ contentRef: t, descriptionId: n }) => {
	let r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Yy(Zy).contentName}}.`;
	return e.useEffect(() => {
		let e = t.current?.getAttribute("aria-describedby");
		n && e && (document.getElementById(n) || console.warn(r));
	}, [
		r,
		t,
		n
	]), null;
}, $y = wy, eb = Ey, tb = Ay, nb = My, rb = Iy, ib = Vy, ab = Uy, ob = Gy, sb = {
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
}, cb = $y, lb = eb, ub = tb, db = ob, fb = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p(nb, {
	ref: n,
	className: S(sb.overlay, e),
	...t
}));
fb.displayName = nb.displayName;
var pb = e.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ m(ub, { children: [/* @__PURE__ */ p(fb, {}), /* @__PURE__ */ m(rb, {
	ref: r,
	className: S(sb.content, e),
	...n,
	children: [t, /* @__PURE__ */ m(ob, {
		className: sb.closeButton,
		children: [/* @__PURE__ */ p(Ve, { size: 16 }), /* @__PURE__ */ p("span", {
			className: sb.srOnly,
			children: "Fechar janela"
		})]
	})]
})] }));
pb.displayName = rb.displayName;
var mb = ({ className: e, ...t }) => /* @__PURE__ */ p("div", {
	className: S(sb.header, e),
	...t
});
mb.displayName = "ModalHeader";
var hb = ({ className: e, ...t }) => /* @__PURE__ */ p("div", {
	className: S(sb.footer, e),
	...t
});
hb.displayName = "ModalFooter";
var gb = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p(ib, {
	ref: n,
	className: S(sb.title, e),
	...t
}));
gb.displayName = ib.displayName;
var _b = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p(ab, {
	ref: n,
	className: S(sb.description, e),
	...t
}));
_b.displayName = ab.displayName;
var vb = {
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
}, yb = $y, bb = eb, xb = tb, Sb = ob, Cb = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p(nb, {
	ref: n,
	className: S(vb.overlay, e),
	...t
}));
Cb.displayName = "DrawerOverlay";
var wb = e.forwardRef(({ className: e, children: t, side: n = "right", ...r }, i) => /* @__PURE__ */ m(xb, { children: [/* @__PURE__ */ p(Cb, {}), /* @__PURE__ */ m(rb, {
	ref: i,
	className: S(vb.content, n === "left" ? vb.left : vb.right, e),
	...r,
	children: [t, /* @__PURE__ */ m(ob, {
		className: vb.closeButton,
		children: [/* @__PURE__ */ p(Ve, { size: 18 }), /* @__PURE__ */ p("span", {
			className: vb.srOnly,
			children: "Fechar"
		})]
	})]
})] }));
wb.displayName = "DrawerContent";
var Tb = ({ className: e, ...t }) => /* @__PURE__ */ p("div", {
	className: S(vb.header, e),
	...t
});
Tb.displayName = "DrawerHeader";
var Eb = ({ className: e, ...t }) => /* @__PURE__ */ p("div", {
	className: S(vb.body, e),
	...t
});
Eb.displayName = "DrawerBody";
var Db = ({ className: e, ...t }) => /* @__PURE__ */ p("div", {
	className: S(vb.footer, e),
	...t
});
Db.displayName = "DrawerFooter";
var Ob = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p(ib, {
	ref: n,
	className: S(vb.title, e),
	...t
}));
Ob.displayName = "DrawerTitle";
var kb = e.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p(ab, {
	ref: n,
	className: S(vb.description, e),
	...t
}));
kb.displayName = "DrawerDescription";
var Ab = ({ className: e }) => /* @__PURE__ */ p("div", { className: S(vb.separator, e) });
Ab.displayName = "DrawerSeparator";
//#endregion
//#region src/components/Segmentado/index.tsx
function jb({ opcoes: e, valor: t, onChange: n, altura: r = 40 }) {
	return /* @__PURE__ */ p("div", {
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
			return /* @__PURE__ */ m("button", {
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
var Mb = [
	[/[\w.+-]+@[\w-]+(\.[\w-]+)+/g, "[email]"],
	[/\b\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}\b/g, "[cnpj]"],
	[/\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g, "[cpf]"],
	[/R\$\s?-?[\d.]+(,\d{1,2})?/g, "[valor]"],
	[/\b\d{1,3}(\.\d{3})+(,\d{2})?\b|\b\d+,\d{2}\b/g, "[valor]"]
];
function Nb(e) {
	return Mb.reduce((e, [t, n]) => e.replace(t, n), e);
}
function Pb(e) {
	let t;
	try {
		t = new URL(e, window.location.origin);
	} catch {
		return Nb(e.split("?")[0]);
	}
	let n = [...new Set(t.searchParams.keys())], r = n.length ? "?" + n.map((e) => `${e}=…`).join("&") : "", i = t.origin === window.location.origin ? "" : t.origin, a = t.hash ? Nb(t.hash.split("?")[0]) : "";
	return i + Nb(t.pathname) + r + a;
}
var Fb = "[modern-screenshot]", Ib = typeof window < "u", Lb = Ib && "Worker" in window;
Ib && "atob" in window, Ib && "btoa" in window;
var Rb = Ib ? window.navigator?.userAgent : "", zb = Rb.includes("Chrome"), Bb = Rb.includes("AppleWebKit") && !zb, Vb = Rb.includes("Firefox"), Hb = (e) => e && "__CONTEXT__" in e, Ub = (e) => e.constructor.name === "CSSFontFaceRule", Wb = (e) => e.constructor.name === "CSSImportRule", Gb = (e) => e.constructor.name === "CSSLayerBlockRule", Kb = (e) => e.nodeType === 1, qb = (e) => typeof e.className == "object", Jb = (e) => e.tagName === "image", Yb = (e) => e.tagName === "use", Xb = (e) => Kb(e) && e.style !== void 0 && !qb(e), Zb = (e) => e.nodeType === 8, Qb = (e) => e.nodeType === 3, $b = (e) => e.tagName === "IMG", ex = (e) => e.tagName === "VIDEO", tx = (e) => e.tagName === "CANVAS", nx = (e) => e.tagName === "TEXTAREA", rx = (e) => e.tagName === "INPUT", ix = (e) => e.tagName === "STYLE", ax = (e) => e.tagName === "SCRIPT", ox = (e) => e.tagName === "SELECT", sx = (e) => e.tagName === "SLOT", cx = (e) => e.tagName === "IFRAME", lx = (...e) => console.warn(Fb, ...e);
function ux(e) {
	let t = e?.createElement?.("canvas");
	return t && (t.height = t.width = 1), !!t && "toDataURL" in t && !!t.toDataURL("image/webp").includes("image/webp");
}
var dx = (e) => e.startsWith("data:");
function fx(e, t) {
	if (e.match(/^[a-z]+:\/\//i)) return e;
	if (Ib && e.match(/^\/\//)) return window.location.protocol + e;
	if (e.match(/^[a-z]+:/i) || !Ib) return e;
	let n = px().implementation.createHTMLDocument(), r = n.createElement("base"), i = n.createElement("a");
	return n.head.appendChild(r), n.body.appendChild(i), t && (r.href = t), i.href = e, i.href;
}
function px(e) {
	return (e && Kb(e) ? e?.ownerDocument : e) ?? window.document;
}
var mx = "http://www.w3.org/2000/svg";
function hx(e, t, n) {
	let r = px(n).createElementNS(mx, "svg");
	return r.setAttributeNS(null, "width", e.toString()), r.setAttributeNS(null, "height", t.toString()), r.setAttributeNS(null, "viewBox", `0 0 ${e} ${t}`), r;
}
function gx(e, t) {
	let n = new XMLSerializer().serializeToString(e);
	return t && (n = n.replace(/[\u0000-\u0008\v\f\u000E-\u001F\uD800-\uDFFF\uFFFE\uFFFF]/gu, "")), `data:image/svg+xml;charset=utf-8,${encodeURIComponent(n)}`;
}
function _x(e, t) {
	return new Promise((n, r) => {
		let i = new FileReader();
		i.onload = () => n(i.result), i.onerror = () => r(i.error), i.onabort = () => r(/* @__PURE__ */ Error(`Failed read blob to ${t}`)), t === "dataUrl" ? i.readAsDataURL(e) : t === "arrayBuffer" && i.readAsArrayBuffer(e);
	});
}
var vx = (e) => _x(e, "dataUrl");
function yx(e, t) {
	let n = px(t).createElement("img");
	return n.decoding = "sync", n.loading = "eager", n.src = e, n;
}
function bx(e, t) {
	return new Promise((n) => {
		let { timeout: r, ownerDocument: i, onError: a, onWarn: o } = t ?? {}, s = typeof e == "string" ? yx(e, px(i)) : e, c = null, l = null;
		function u() {
			n(s), c && clearTimeout(c), l?.();
		}
		if (r && (c = setTimeout(u, r)), ex(s)) {
			let e = s.currentSrc || s.src;
			if (!e) return s.poster ? bx(s.poster, t).then(n) : u();
			if (s.readyState >= 2) return u();
			let r = u, i = (t) => {
				o?.("Failed video load", e, t), a?.(t), u();
			};
			l = () => {
				s.removeEventListener("loadeddata", r), s.removeEventListener("error", i);
			}, s.addEventListener("loadeddata", r, { once: !0 }), s.addEventListener("error", i, { once: !0 });
		} else {
			let e = Jb(s) ? s.href.baseVal : s.currentSrc || s.src;
			if (!e) return u();
			let t = async () => {
				if ($b(s) && "decode" in s) try {
					await s.decode();
				} catch (t) {
					o?.("Failed to decode image, trying to render anyway", s.dataset.originalSrc || e, t);
				}
				u();
			}, n = (t) => {
				o?.("Failed image load", s.dataset.originalSrc || e, t), u();
			};
			if ($b(s) && s.complete) return t();
			l = () => {
				s.removeEventListener("load", t), s.removeEventListener("error", n);
			}, s.addEventListener("load", t, { once: !0 }), s.addEventListener("error", n, { once: !0 });
		}
	});
}
async function xx(e, t) {
	Xb(e) && ($b(e) || ex(e) ? await bx(e, t) : await Promise.all(["img", "video"].flatMap((n) => Array.from(e.querySelectorAll(n)).map((e) => bx(e, t)))));
}
var Sx = /* @__PURE__ */ function() {
	let e = 0, t = () => `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4);
	return () => (e += 1, `u${t()}${e}`);
}();
function Cx(e) {
	return e?.split(",").map((e) => e.trim().replace(/"|'/g, "").toLowerCase()).filter(Boolean);
}
var wx = 0;
function Tx(e) {
	let t = `${Fb}[#${wx}]`;
	return wx++, {
		time: (n) => e && console.time(`${t} ${n}`),
		timeEnd: (n) => e && console.timeEnd(`${t} ${n}`),
		warn: (...t) => e && lx(...t)
	};
}
function Ex(e) {
	return { cache: e ? "no-cache" : "force-cache" };
}
async function Dx(e, t) {
	return Hb(e) ? e : Ox(e, {
		...t,
		autoDestruct: !0
	});
}
async function Ox(e, t) {
	let { scale: n = 1, workerUrl: r, workerNumber: i = 1 } = t || {}, a = !!t?.debug, o = t?.features ?? !0, s = e.ownerDocument ?? (Ib ? window.document : void 0), c = e.ownerDocument?.defaultView ?? (Ib ? window : void 0), l = /* @__PURE__ */ new Map(), u = {
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
			requestInit: Ex(t?.fetch?.bypassingCache),
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
		log: Tx(a),
		node: e,
		ownerDocument: s,
		ownerWindow: c,
		dpi: n === 1 ? null : 96 * n,
		svgStyleElement: kx(s),
		svgDefsElement: s?.createElementNS(mx, "defs"),
		svgStyles: /* @__PURE__ */ new Map(),
		defaultComputedStyles: /* @__PURE__ */ new Map(),
		workers: [...Array.from({ length: Lb && r && i ? i : 0 })].map(() => {
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
			ux(s) && "image/webp",
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
	u.log.time("wait until load"), await xx(e, {
		timeout: u.timeout,
		onWarn: u.log.warn
	}), u.log.timeEnd("wait until load");
	let { width: d, height: f } = Ax(e, u);
	return u.width = d, u.height = f, u;
}
function kx(e) {
	if (!e) return;
	let t = e.createElement("style"), n = t.ownerDocument.createTextNode("\n.______background-clip--text {\n  background-clip: text;\n  -webkit-background-clip: text;\n}\n");
	return t.appendChild(n), t;
}
function Ax(e, t) {
	let { width: n, height: r } = t;
	if (Kb(e) && (!n || !r)) {
		let t = e.getBoundingClientRect();
		n = n || t.width || Number(e.getAttribute("width")) || 0, r = r || t.height || Number(e.getAttribute("height")) || 0;
	}
	return {
		width: n,
		height: r
	};
}
async function jx(e, t) {
	let { log: n, timeout: r, drawImageCount: i, drawImageInterval: a } = t;
	n.time("image to canvas");
	let o = await bx(e, {
		timeout: r,
		onWarn: t.log.warn
	}), { canvas: s, context2d: c } = Mx(e.ownerDocument, t), l = () => {
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
function Mx(e, t) {
	let { width: n, height: r, scale: i, backgroundColor: a, maximumCanvasSize: o } = t, s = e.createElement("canvas");
	s.width = Math.floor(n * i), s.height = Math.floor(r * i), s.style.width = `${n}px`, s.style.height = `${r}px`, o && (s.width > o || s.height > o) && (s.width > o && s.height > o ? s.width > s.height ? (s.height *= o / s.width, s.width = o) : (s.width *= o / s.height, s.height = o) : s.width > o ? (s.height *= o / s.width, s.width = o) : (s.width *= o / s.height, s.height = o));
	let c = s.getContext("2d");
	return c && a && (c.fillStyle = a, c.fillRect(0, 0, s.width, s.height)), {
		canvas: s,
		context2d: c
	};
}
function Nx(e, t) {
	if (e.ownerDocument) try {
		let t = e.toDataURL();
		if (t !== "data:,") return yx(t, e.ownerDocument);
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
function Px(e, t) {
	try {
		if (e?.contentDocument?.documentElement) return eS(e.contentDocument.documentElement, t);
	} catch (e) {
		t.log.warn("Failed to clone iframe", e);
	}
	return e.cloneNode(!1);
}
function Fx(e) {
	let t = e.cloneNode(!1);
	return e.currentSrc && e.currentSrc !== e.src && (t.src = e.currentSrc, t.srcset = ""), t.loading === "lazy" && (t.loading = "eager"), t;
}
async function Ix(e, t) {
	if (e.ownerDocument && !e.currentSrc && e.poster) return yx(e.poster, e.ownerDocument);
	let n = e.cloneNode(!1);
	n.crossOrigin = "anonymous", e.currentSrc && e.currentSrc !== e.src && (n.src = e.currentSrc);
	let r = n.ownerDocument;
	if (r) {
		let i = !0;
		if (await bx(n, {
			onError: () => i = !1,
			onWarn: t.log.warn
		}), !i) return e.poster ? yx(e.poster, e.ownerDocument) : n;
		n.currentTime = e.currentTime, await new Promise((e) => {
			n.addEventListener("seeked", e, { once: !0 });
		});
		let a = r.createElement("canvas");
		a.width = e.offsetWidth, a.height = e.offsetHeight;
		try {
			let e = a.getContext("2d");
			e && e.drawImage(n, 0, 0, a.width, a.height);
		} catch (r) {
			return t.log.warn("Failed to clone video", r), e.poster ? yx(e.poster, e.ownerDocument) : n;
		}
		return Nx(a, t);
	}
	return n;
}
function Lx(e, t) {
	return tx(e) ? Nx(e, t) : cx(e) ? Px(e, t) : $b(e) ? Fx(e) : ex(e) ? Ix(e, t) : e.cloneNode(!1);
}
function Rx(e) {
	let t = e.sandbox;
	if (!t) {
		let { ownerDocument: n } = e;
		try {
			n && (t = n.createElement("iframe"), t.id = `__SANDBOX__${Sx()}`, t.width = "0", t.height = "0", t.style.visibility = "hidden", t.style.position = "fixed", n.body.appendChild(t), t.srcdoc = "<!DOCTYPE html><meta charset=\"UTF-8\"><title></title><body>", e.sandbox = t);
		} catch (t) {
			e.log.warn("Failed to getSandBox", t);
		}
	}
	return t;
}
var zx = [
	"width",
	"height",
	"-webkit-text-fill-color"
], Bx = ["stroke", "fill"];
function Vx(e, t, n) {
	let { defaultComputedStyles: r } = n, i = e.nodeName.toLowerCase(), a = qb(e) && i !== "svg", o = a ? Bx.map((t) => [t, e.getAttribute(t)]).filter(([, e]) => e !== null) : [], s = [
		a && "svg",
		i,
		o.map((e, t) => `${e}=${t}`).join(","),
		t
	].filter(Boolean).join(":");
	if (r.has(s)) return r.get(s);
	let c = Rx(n)?.contentWindow;
	if (!c) return /* @__PURE__ */ new Map();
	let l = c?.document, u, d;
	a ? (u = l.createElementNS(mx, "svg"), d = u.ownerDocument.createElementNS(u.namespaceURI, i), o.forEach(([e, t]) => {
		d.setAttributeNS(null, e, t);
	}), u.appendChild(d)) : u = d = l.createElement(i), d.textContent = " ", l.body.appendChild(u);
	let f = c.getComputedStyle(d, t), p = /* @__PURE__ */ new Map();
	for (let e = f.length, t = 0; t < e; t++) {
		let e = f.item(t);
		zx.includes(e) || p.set(e, f.getPropertyValue(e));
	}
	return l.body.removeChild(u), r.set(s, p), p;
}
function Hx(e, t, n) {
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
function Ux(e, t, n, r) {
	let { ownerWindow: i, includeStyleProperties: a, currentParentNodeStyle: o } = r, s = t.style, c = i.getComputedStyle(e), l = Vx(e, null, r);
	o?.forEach((e, t) => {
		l.delete(t);
	});
	let u = Hx(c, l, a);
	u.delete("transition-property"), u.delete("all"), u.delete("d"), u.delete("content"), n && (u.delete("position"), u.delete("margin-top"), u.delete("margin-right"), u.delete("margin-bottom"), u.delete("margin-left"), u.delete("margin-block-start"), u.delete("margin-block-end"), u.delete("margin-inline-start"), u.delete("margin-inline-end"), u.set("box-sizing", ["border-box", ""])), u.get("background-clip")?.[0] === "text" && t.classList.add("______background-clip--text"), zb && (u.has("font-kerning") || u.set("font-kerning", ["normal", ""]), (u.get("overflow-x")?.[0] === "hidden" || u.get("overflow-y")?.[0] === "hidden") && u.get("text-overflow")?.[0] === "ellipsis" && e.scrollWidth === e.clientWidth && u.set("text-overflow", ["clip", ""]));
	for (let e = s.length, t = 0; t < e; t++) s.removeProperty(s.item(t));
	return u.forEach(([e, t], n) => {
		s.setProperty(n, e, t);
	}), u;
}
function Wx(e, t) {
	(nx(e) || rx(e) || ox(e)) && t.setAttribute("value", e.value);
}
var Gx = ["::before", "::after"], Kx = [
	"::-webkit-scrollbar",
	"::-webkit-scrollbar-button",
	"::-webkit-scrollbar-thumb",
	"::-webkit-scrollbar-track",
	"::-webkit-scrollbar-track-piece",
	"::-webkit-scrollbar-corner",
	"::-webkit-resizer"
];
function qx(e, t, n, r, i) {
	let { ownerWindow: a, svgStyleElement: o, svgStyles: s, currentNodeStyle: c } = r;
	if (!o || !a) return;
	function l(n) {
		let o = a.getComputedStyle(e, n), l = o.getPropertyValue("content");
		if (!l || l === "none") return;
		i?.(l), l = l.replace(/(')|(")|(counter\(.+\))/g, "");
		let u = [Sx()], d = Vx(e, n, r);
		c?.forEach((e, t) => {
			d.delete(t);
		});
		let f = Hx(o, d, r.includeStyleProperties);
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
	Gx.forEach(l), n && Kx.forEach(l);
}
var Jx = /* @__PURE__ */ new Set(["symbol"]);
async function Yx(e, t, n, r, i) {
	if (Kb(n) && (ix(n) || ax(n)) || r.filter && !r.filter(n)) return;
	Jx.has(t.nodeName) || Jx.has(n.nodeName) ? r.currentParentNodeStyle = void 0 : r.currentParentNodeStyle = r.currentNodeStyle;
	let a = await eS(n, r, !1, i);
	r.isEnable("restoreScrollPosition") && Zx(e, a), t.appendChild(a);
}
async function Xx(e, t, n, r) {
	let i = e.firstChild;
	Kb(e) && e.shadowRoot && (i = e.shadowRoot?.firstChild, n.shadowRoots.push(e.shadowRoot));
	for (let a = i; a; a = a.nextSibling) if (!Zb(a)) if (Kb(a) && sx(a) && typeof a.assignedNodes == "function") {
		let i = a.assignedNodes();
		for (let a = 0; a < i.length; a++) await Yx(e, t, i[a], n, r);
	} else await Yx(e, t, a, n, r);
}
function Zx(e, t) {
	if (!Xb(e) || !Xb(t)) return;
	let { scrollTop: n, scrollLeft: r } = e;
	if (!n && !r) return;
	let { transform: i } = t.style, a = new DOMMatrix(i), { a: o, b: s, c, d: l } = a;
	a.a = 1, a.b = 0, a.c = 0, a.d = 1, a.translateSelf(-r, -n), a.a = o, a.b = s, a.c = c, a.d = l, t.style.transform = a.toString();
}
function Qx(e, t) {
	let { backgroundColor: n, width: r, height: i, style: a } = t, o = e.style;
	if (n && o.setProperty("background-color", n, "important"), r && o.setProperty("width", `${r}px`, "important"), i && o.setProperty("height", `${i}px`, "important"), a) for (let e in a) o[e] = a[e];
}
var $x = /^[\w-:]+$/;
async function eS(e, t, n = !1, r) {
	let { ownerDocument: i, ownerWindow: a, fontFamilies: o, onCloneEachNode: s } = t;
	if (i && Qb(e)) return r && /\S/.test(e.data) && r(e.data), i.createTextNode(e.data);
	if (i && a && Kb(e) && (Xb(e) || qb(e))) {
		let r = await Lx(e, t);
		if (t.isEnable("removeAbnormalAttributes")) {
			let e = r.getAttributeNames();
			for (let t = e.length, n = 0; n < t; n++) {
				let t = e[n];
				$x.test(t) || r.removeAttribute(t);
			}
		}
		let i = t.currentNodeStyle = Ux(e, r, n, t);
		n && Qx(r, t);
		let a = !1;
		if (t.isEnable("copyScrollbar")) {
			let t = [i.get("overflow-x")?.[0], i.get("overflow-y")?.[0]];
			a = t.includes("scroll") || (t.includes("auto") || t.includes("overlay")) && (e.scrollHeight > e.clientHeight || e.scrollWidth > e.clientWidth);
		}
		let c = i.get("text-transform")?.[0], l = Cx(i.get("font-family")?.[0]), u = l ? (e) => {
			c === "uppercase" ? e = e.toUpperCase() : c === "lowercase" ? e = e.toLowerCase() : c === "capitalize" && (e = e[0].toUpperCase() + e.substring(1)), l.forEach((t) => {
				let n = o.get(t);
				n || o.set(t, n = /* @__PURE__ */ new Set()), e.split("").forEach((e) => n.add(e));
			});
		} : void 0;
		return qx(e, r, a, t, u), Wx(e, r), ex(e) || await Xx(e, r, t, u), await s?.(r), r;
	}
	let c = e.cloneNode(!1);
	return await Xx(e, c, t), await s?.(c), c;
}
function tS(e) {
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
function nS(e) {
	let { url: t, timeout: n, responseType: r, ...i } = e, a = new AbortController(), o = n ? setTimeout(() => a.abort(), n) : void 0;
	return fetch(t, {
		signal: a.signal,
		...i
	}).then((e) => {
		if (!e.ok) throw Error("Failed fetch, not 2xx response", { cause: e });
		switch (r) {
			case "arrayBuffer": return e.arrayBuffer();
			case "dataUrl": return e.blob().then(vx);
			default: return e.text();
		}
	}).finally(() => clearTimeout(o));
}
function rS(e, t) {
	let { url: n, requestType: r = "text", responseType: i = "text", imageDom: a } = t, o = n, { timeout: s, acceptOfImage: c, requests: l, fetchFn: u, fetch: { requestInit: d, bypassingCache: f, placeholderImage: p }, font: m, workers: h, fontFamilies: g } = e;
	r === "image" && (Bb || Vb) && e.drawImageCount++;
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
			return !Bb && n.startsWith("http") && h.length ? new Promise((e, t) => {
				h[l.size & h.length - 1].postMessage({
					rawUrl: n,
					...b
				}), _.resolve = e, _.reject = t;
			}) : nS(b);
		})().catch((t) => {
			if (l.delete(n), r === "image" && p) return e.log.warn("Failed to fetch image base64, trying to use placeholder image", o), typeof p == "string" ? p : p(a);
			throw t;
		}), l.set(n, _);
	}
	return _.response;
}
async function iS(e, t, n, r) {
	if (!aS(e)) return e;
	for (let [i, a] of sS(e, t)) try {
		let t = await rS(n, {
			url: a,
			requestType: r ? "image" : "text",
			responseType: "dataUrl"
		});
		e = e.replace(cS(i), `$1${t}$3`);
	} catch (e) {
		n.log.warn("Failed to fetch css data url", i, e);
	}
	return e;
}
function aS(e) {
	return /url\((['"]?)([^'"]+?)\1\)/.test(e);
}
var oS = /url\((['"]?)([^'"]+?)\1\)/g;
function sS(e, t) {
	let n = [];
	return e.replace(oS, (e, r, i) => (n.push([i, fx(i, t)]), e)), n.filter(([e]) => !dx(e));
}
function cS(e) {
	let t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
	return RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
var lS = [
	"background-image",
	"border-image-source",
	"-webkit-border-image",
	"-webkit-mask-image",
	"list-style-image"
];
function uS(e, t) {
	return lS.map((n) => {
		let r = e.getPropertyValue(n);
		return !r || r === "none" ? null : ((Bb || Vb) && t.drawImageCount++, iS(r, null, t, !0).then((t) => {
			!t || r === t || e.setProperty(n, t, e.getPropertyPriority(n));
		}));
	}).filter(Boolean);
}
function dS(e, t) {
	if ($b(e)) {
		let n = e.currentSrc || e.src;
		if (!dx(n)) return [rS(t, {
			url: n,
			imageDom: e,
			requestType: "image",
			responseType: "dataUrl"
		}).then((t) => {
			t && (e.srcset = "", e.dataset.originalSrc = n, e.src = t || "");
		})];
		(Bb || Vb) && t.drawImageCount++;
	} else if (qb(e) && !dx(e.href.baseVal)) {
		let n = e.href.baseVal;
		return [rS(t, {
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
function fS(e, t) {
	let { ownerDocument: n, svgDefsElement: r } = t, i = e.getAttribute("href") ?? e.getAttribute("xlink:href");
	if (!i) return [];
	let [a, o] = i.split("#");
	if (o) {
		let i = `#${o}`, s = t.shadowRoots.reduce((e, t) => e ?? t.querySelector(`svg ${i}`), n?.querySelector(`svg ${i}`));
		if (a && e.setAttribute("href", i), r?.querySelector(i)) return [];
		if (s) return r?.appendChild(s.cloneNode(!0)), [];
		if (a) return [rS(t, {
			url: a,
			responseType: "text"
		}).then((e) => {
			r?.insertAdjacentHTML("beforeend", e);
		})];
	}
	return [];
}
function pS(e, t) {
	let { tasks: n } = t;
	Kb(e) && (($b(e) || Jb(e)) && n.push(...dS(e, t)), Yb(e) && n.push(...fS(e, t))), Xb(e) && n.push(...uS(e.style, t)), e.childNodes.forEach((e) => {
		pS(e, t);
	});
}
async function mS(e, t) {
	let { ownerDocument: n, svgStyleElement: r, fontFamilies: i, fontCssTexts: a, tasks: o, font: s } = t;
	if (!(!n || !r || !i.size)) if (s && s.cssText) {
		let e = bS(s.cssText, t);
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
			if (Wb(e)) {
				let n = e.href, r = "";
				try {
					r = await rS(t, {
						url: n,
						requestType: "text",
						responseType: "text"
					});
				} catch (e) {
					t.log.warn(`Error fetch remote css import from ${n}`, e);
				}
				let i = r.replace(oS, (e, t, r) => e.replace(r, fx(r, n)));
				for (let e of _S(i)) try {
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
			xS(e.cssRules, u);
		}), u.filter((e) => Ub(e) && aS(e.style.getPropertyValue("src")) && Cx(e.style.getPropertyValue("font-family"))?.some((e) => i.has(e))).forEach((e) => {
			let i = e, s = a.get(i.cssText);
			s ? r.appendChild(n.createTextNode(`${s}
`)) : o.push(iS(i.cssText, i.parentStyleSheet ? i.parentStyleSheet.href : null, t).then((e) => {
				e = bS(e, t), a.set(i.cssText, e), r.appendChild(n.createTextNode(`${e}
`));
			}));
		});
	}
}
var hS = /(\/\*[\s\S]*?\*\/)/g, gS = /((@.*?keyframes [\s\S]*?){([\s\S]*?}\s*?)})/gi;
function _S(e) {
	if (e == null) return [];
	let t = [], n = e.replace(hS, "");
	for (;;) {
		let e = gS.exec(n);
		if (!e) break;
		t.push(e[0]);
	}
	n = n.replace(gS, "");
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
var vS = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, yS = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function bS(e, t) {
	let { font: n } = t, r = n ? n?.preferredFormat : void 0;
	return r ? e.replace(yS, (e) => {
		for (;;) {
			let [t, , n] = vS.exec(e) || [];
			if (!n) return "";
			if (n === r) return `src: ${t};`;
		}
	}) : e;
}
function xS(e, t = []) {
	for (let n of Array.from(e)) Gb(n) ? t.push(...xS(n.cssRules)) : "cssRules" in n ? xS(n.cssRules, t) : t.push(n);
	return t;
}
var SS = /\bx?link:?href\s*=\s*["'](?!data:)[^"']+["']/i;
function CS(e) {
	return SS.test(e.innerHTML);
}
async function wS(e, t) {
	let n = await Dx(e, t);
	if (Kb(n.node) && qb(n.node) && !CS(n.node)) return n.node;
	let { ownerDocument: r, log: i, tasks: a, svgStyleElement: o, svgDefsElement: s, svgStyles: c, font: l, progress: u, autoDestruct: d, onCloneNode: f, onEmbedNode: p, onCreateForeignObjectSvg: m } = n;
	i.time("clone node");
	let h = await eS(n.node, n, !0);
	if (o && r) {
		let e = "";
		c.forEach((t, n) => {
			e += `${t.join(",\n")} {
  ${n}
}
`;
		}), o.appendChild(r.createTextNode(e));
	}
	i.timeEnd("clone node"), await f?.(h), l !== !1 && Kb(h) && (i.time("embed web font"), await mS(h, n), i.timeEnd("embed web font")), i.time("embed node"), pS(h, n);
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
	let y = TS(h, n);
	return s && y.insertBefore(s, y.children[0]), o && y.insertBefore(o, y.children[0]), d && tS(n), await m?.(y), y;
}
function TS(e, t) {
	let { width: n, height: r } = t, i = hx(n, r, e.ownerDocument), a = i.ownerDocument.createElementNS(i.namespaceURI, "foreignObject");
	return a.setAttributeNS(null, "x", "0%"), a.setAttributeNS(null, "y", "0%"), a.setAttributeNS(null, "width", "100%"), a.setAttributeNS(null, "height", "100%"), a.append(e), i.appendChild(a), i;
}
async function ES(e, t) {
	let n = await Dx(e, t), r = await wS(n), i = gx(r, n.isEnable("removeControlCharacter"));
	return n.autoDestruct || (n.svgStyleElement = kx(n.ownerDocument), n.svgDefsElement = n.ownerDocument?.createElementNS(mx, "defs"), n.svgStyles.clear()), await jx(yx(i, r.ownerDocument), n);
}
//#endregion
//#region src/components/MarcadorProblemas/print.ts
var DS = 50, OS = "data-avere-desloc", kS = "data-avere-encolher", AS = "data-avere-grudado", jS = "data-avere-placeholder", MS = [
	OS,
	kS,
	AS,
	jS
];
function NS(e) {
	let t = getComputedStyle(e).position;
	return t === "static" || t === "relative";
}
function PS(e, t, n) {
	let r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT);
	for (let e = r.nextNode(); e; e = r.nextNode()) {
		let r = e.getBoundingClientRect();
		if (r.height > 0 && r.bottom >= t && r.top <= n) return !0;
	}
	return !1;
}
function FS(e) {
	if (e.scrollHeight <= e.clientHeight && e.scrollWidth <= e.clientWidth) return !1;
	let t = getComputedStyle(e);
	return /auto|scroll|overlay/.test(t.overflowY + t.overflowX);
}
function IS(e) {
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
			if (!v && _.top > a + DS && !PS(g, r, a)) {
				n.add(g), u(t, s), f = !1;
				continue;
			}
			if (f && !v && _.bottom < r - DS && !PS(g, r, a)) {
				n.add(g), u(t, s), NS(g) && (p === null && (p = _.top, m = g), h = _.bottom);
				continue;
			}
			f && p !== null && (i(s, m, _.top - p), p = null), f = !1, g instanceof HTMLElement && getComputedStyle(g).position === "sticky" && c.push({
				el: g,
				rolavel: s
			}), (g instanceof HTMLInputElement || g instanceof HTMLTextAreaElement) && g.placeholder && !g.value && l.push(g);
			let y = r, b = a, x = s;
			FS(g) && (y = Math.max(r, _.top), b = Math.min(a, _.bottom), x = g, o.push(g)), d(g, y, b, x);
		}
		f && p !== null && i(s, m, h - p);
	};
	d(document.body, 0, t.clientHeight, t);
	let f = [];
	for (let e of o) {
		let t = -e.scrollLeft, r = -(e.scrollTop - a(e));
		if (!(!t && !r)) for (let i of Array.from(e.children)) n.has(i) || (i.setAttribute(OS, `${t},${r}`), f.push(i));
	}
	for (let e of s) e.setAttribute(kS, ""), f.push(e);
	if (c.length) {
		let e = c.map((e) => e.el.getBoundingClientRect()), t = c.map((e) => [e.el.style.getPropertyValue("position"), e.el.style.getPropertyPriority("position")]);
		for (let e of c) e.el.style.setProperty("position", "static", "important");
		let n = c.map((e) => e.el.getBoundingClientRect());
		c.forEach((e, n) => {
			let [r, i] = t[n];
			r ? e.el.style.setProperty("position", r, i) : e.el.style.removeProperty("position");
		}), c.forEach(({ el: t, rolavel: i }, a) => {
			let o = (r.get(i) ?? []).filter((e) => t.compareDocumentPosition(e.inicio) & Node.DOCUMENT_POSITION_FOLLOWING).reduce((e, t) => e + t.altura, 0), s = e[a].left - n[a].left, c = e[a].top - n[a].top - o;
			Math.abs(s) < .5 && Math.abs(c) < .5 || (t.setAttribute(AS, `${s},${c}`), f.push(t));
		});
	}
	for (let e of l) e.setAttribute(jS, getComputedStyle(e, "::placeholder").color), f.push(e);
	return {
		remover: n,
		pagina: {
			x: window.scrollX,
			y: window.scrollY - a(t)
		},
		marcados: f
	};
}
var LS = /Chrome|Chromium|Edg\//.test(navigator.userAgent) && !/Firefox/.test(navigator.userAgent);
async function RS(e) {
	let t = document.documentElement, n = t.clientWidth, r = t.clientHeight, i = IS(e);
	try {
		return {
			canvas: await ES(t, {
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
					e.hasAttribute(kS) && (e.removeAttribute(kS), e.style.height = "auto", e.style.blockSize = "auto");
					let t = e.getAttribute(jS);
					t && (e.removeAttribute(jS), e.style.color = t, e.style.setProperty("-webkit-text-fill-color", t));
					let n = 0, r = 0;
					for (let t of [OS, AS]) {
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
				features: { fixSvgXmlDecode: !LS },
				timeout: 8e3
			}),
			largura: n,
			altura: r
		};
	} finally {
		for (let e of i.marcados) for (let t of MS) e.removeAttribute(t);
	}
}
function zS(e) {
	return new Promise((t, n) => e.toBlob((e) => e ? t(e) : n(/* @__PURE__ */ Error("Falha ao gerar a imagem")), "image/png"));
}
//#endregion
//#region src/components/MarcadorProblemas/desenho.ts
var BS = "#E7343F", VS = "rgb(255 255 255 / 0.9)", HS = "#111";
function US(e, t) {
	return {
		x: Math.min(e[0], t[0]),
		y: Math.min(e[1], t[1]),
		w: Math.abs(e[0] - t[0]),
		h: Math.abs(e[1] - t[1])
	};
}
function WS(e, t) {
	let n = 4 * t;
	switch (e.tipo) {
		case "tarja":
		case "caixa": return e.w >= n && e.h >= n;
		case "seta": return Math.hypot(e.ate[0] - e.de[0], e.ate[1] - e.de[1]) >= n * 2;
		case "livre": return e.pontos.length > 1;
		case "numero": return !0;
	}
}
function GS(e, t, n) {
	e.lineJoin = "round", e.lineCap = "round";
	for (let [r, i] of [[VS, 6], [BS, 3]]) e.strokeStyle = r, e.lineWidth = i * t, e.beginPath(), n(), e.stroke();
}
function KS(e, [t, n], r, i) {
	e.beginPath(), e.arc(t, n, 13 * i, 0, Math.PI * 2), e.fillStyle = BS, e.fill(), e.lineWidth = 2.5 * i, e.strokeStyle = "#fff", e.stroke(), e.fillStyle = "#fff", e.font = `700 ${(r > 9 ? 12 : 15) * i}px system-ui, sans-serif`, e.textAlign = "center", e.textBaseline = "middle", e.fillText(String(r), t, n + .5 * i);
}
function qS(e, t, n) {
	if (t.tipo === "caixa") GS(e, n, () => e.rect(t.x, t.y, t.w, t.h));
	else if (t.tipo === "livre") GS(e, n, () => {
		e.moveTo(...t.pontos[0]);
		for (let n of t.pontos.slice(1)) e.lineTo(...n);
	});
	else {
		let [r, i] = t.de, [a, o] = t.ate, s = Math.atan2(o - i, a - r), c = 16 * n;
		GS(e, n, () => {
			e.moveTo(r, i), e.lineTo(a, o), e.moveTo(a - c * Math.cos(s - Math.PI / 7), o - c * Math.sin(s - Math.PI / 7)), e.lineTo(a, o), e.lineTo(a - c * Math.cos(s + Math.PI / 7), o - c * Math.sin(s + Math.PI / 7));
		});
	}
}
function JS(e, t, n, r) {
	let { comIndicacoes: i, contorno: a, k: o } = r;
	e.clearRect(0, 0, e.canvas.width, e.canvas.height), e.drawImage(t, 0, 0), e.fillStyle = HS;
	for (let t of n) t.tipo === "tarja" && e.fillRect(t.x, t.y, t.w, t.h);
	if (!i) return;
	if (a) {
		let t = 4 * o;
		qS(e, {
			tipo: "caixa",
			x: a.x - t,
			y: a.y - t,
			w: a.w + t * 2,
			h: a.h + t * 2
		}, o);
	}
	for (let t of n) t.tipo !== "tarja" && t.tipo !== "numero" && qS(e, t, o);
	let s = 0;
	for (let t of n) t.tipo === "numero" && KS(e, t.p, ++s, o);
}
function YS(e) {
	return e.filter((e) => e.tipo === "numero").length;
}
function XS(...e) {
	let [t] = e, n = document.createElement("canvas");
	return n.width = t.width, n.height = t.height, JS(n.getContext("2d"), ...e), n;
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
}, ZS = [
	{
		value: "seta",
		rotulo: "Seta",
		icone: /* @__PURE__ */ p(Oe, { size: 16 }),
		mostrarRotulo: !0
	},
	{
		value: "livre",
		rotulo: "Livre",
		icone: /* @__PURE__ */ p(ke, { size: 16 }),
		mostrarRotulo: !0
	},
	{
		value: "caixa",
		rotulo: "Caixa",
		icone: /* @__PURE__ */ p(Ne, { size: 16 }),
		mostrarRotulo: !0
	},
	{
		value: "numero",
		rotulo: "Número",
		icone: /* @__PURE__ */ p(xe, { size: 16 }),
		mostrarRotulo: !0
	},
	{
		value: "tarja",
		rotulo: "Tarja",
		icone: /* @__PURE__ */ p(ye, { size: 16 }),
		mostrarRotulo: !0
	}
], QS = [{
	value: "indicacoes",
	rotulo: "Com indicações",
	mostrarRotulo: !0
}, {
	value: "original",
	rotulo: "Original",
	mostrarRotulo: !0
}];
function $S({ base: e, contorno: t, k: n, formasIniciais: r, onConcluir: i, onCancelar: a, marcador: o }) {
	let [c, l] = d("seta"), [f, h] = d("indicacoes"), [g, _] = d(r), [v, y] = d(null), b = u(null), x = u(null);
	s(() => {
		let r = b.current?.getContext("2d");
		r && JS(r, e, v ? [...g, v] : g, {
			comIndicacoes: f === "indicacoes",
			contorno: t,
			k: n
		});
	}, [
		e,
		g,
		v,
		f,
		t,
		n
	]);
	let S = () => _((e) => e.slice(0, -1));
	s(() => {
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
		switch (c) {
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
				tipo: c,
				...US(t, e)
			};
		}
	}, T = f === "indicacoes" || c === "tarja";
	return /* @__PURE__ */ m("div", {
		...o,
		className: Q.editorFundo,
		role: "dialog",
		"aria-label": "Desenhar sobre o print",
		children: [
			/* @__PURE__ */ m("div", {
				className: Q.editorBarra,
				children: [
					/* @__PURE__ */ p(jb, {
						opcoes: ZS,
						valor: c,
						onChange: l,
						altura: 34
					}),
					/* @__PURE__ */ p("button", {
						type: "button",
						className: Q.botaoSecundario,
						onClick: S,
						disabled: !g.length,
						title: "Desfazer (Ctrl+Z)",
						"aria-label": "Desfazer",
						children: /* @__PURE__ */ p(Ie, { size: 14 })
					}),
					/* @__PURE__ */ p("button", {
						type: "button",
						className: Q.botaoSecundario,
						onClick: () => _([]),
						disabled: !g.length,
						title: "Limpar tudo",
						"aria-label": "Limpar tudo",
						children: /* @__PURE__ */ p(Fe, { size: 14 })
					}),
					/* @__PURE__ */ p("span", { className: Q.editorEspaco }),
					/* @__PURE__ */ p(jb, {
						opcoes: QS,
						valor: f,
						onChange: h,
						altura: 34
					}),
					/* @__PURE__ */ m("button", {
						type: "button",
						className: Q.botaoSecundario,
						onClick: a,
						children: [/* @__PURE__ */ p(Ve, { size: 14 }), " Cancelar"]
					}),
					/* @__PURE__ */ m("button", {
						type: "button",
						className: Q.botaoPrimario,
						onClick: () => i(g),
						children: [/* @__PURE__ */ p(se, { size: 14 }), " Concluir"]
					})
				]
			}),
			/* @__PURE__ */ p("p", {
				className: Q.editorDica,
				children: f === "original" ? "Assim sobe a imagem original: só as tarjas aparecem nela." : "Desenhe sobre o print para indicar o problema ou como deveria ser. Use números para citar pontos na descrição. Tarjas escondem dados nas duas imagens."
			}),
			/* @__PURE__ */ p("div", {
				className: Q.editorArea,
				children: /* @__PURE__ */ p("canvas", {
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
						v && WS(v, n) && _((e) => [...e, v]), x.current = null, y(null);
					}
				})
			})
		]
	});
}
//#endregion
//#region src/components/MarcadorProblemas/envio.ts
var eC = {
	url: "https://qntjjvhryeosedjcydun.supabase.co",
	chave: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFudGpqdmhyeWVvc2VkamN5ZHVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzOTQwNDEsImV4cCI6MjEwNjk3MDA0MX0.F7VP7pFxLDxQ8OkTwAUSawarHMt0ajhVDDLk50Oh5SU"
}, tC = "relatos-prints";
async function nC(e, t) {
	let n = "";
	try {
		let t = await e.json();
		n = t.message ?? t.error ?? "";
	} catch {}
	throw Error(`${t}: ${n || `HTTP ${e.status}`}`);
}
async function rC(e, t, n) {
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
		let a = await fetch(`${e.url}/storage/v1/object/${tC}/${r}/${t}.png`, {
			method: "POST",
			headers: {
				...i,
				"Content-Type": "image/png",
				"x-upsert": "false"
			},
			body: n
		});
		a.ok || await nC(a, `Imagem ${t}`);
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
	return o.ok || await nC(o, "Relato"), r;
}
//#endregion
//#region src/components/MarcadorProblemas/coleta.ts
var iC = 10, aC = 300, oC = "__avereMarcadorColeta";
function sC(e, t) {
	e.push(t), e.length > iC && e.shift();
}
function cC(e) {
	return Nb(e.map((e) => {
		if (e instanceof Error) return `${e.name}: ${e.message}`;
		if (typeof e == "string") return e;
		try {
			return JSON.stringify(e);
		} catch {
			return String(e);
		}
	}).join(" ")).slice(0, aC);
}
function lC() {
	let e = window;
	if (e[oC]) return e[oC];
	let t = {
		erros: [],
		requisicoes: []
	};
	e[oC] = t;
	let n = () => (/* @__PURE__ */ new Date()).toISOString(), r = console.error.bind(console);
	console.error = (...e) => {
		sC(t.erros, {
			em: n(),
			mensagem: cC(e)
		}), r(...e);
	}, window.addEventListener("error", (e) => {
		sC(t.erros, {
			em: n(),
			mensagem: cC([e.error ?? e.message])
		});
	}), window.addEventListener("unhandledrejection", (e) => {
		sC(t.erros, {
			em: n(),
			mensagem: cC(["Promise rejeitada:", e.reason])
		});
	});
	let i = window.fetch.bind(window);
	window.fetch = async (e, r) => {
		let a = performance.now(), o = (r?.method ?? (e instanceof Request ? e.method : "GET")).toUpperCase(), s = e instanceof Request ? e.url : String(e), c = (e) => sC(t.requisicoes, {
			em: n(),
			metodo: o,
			url: Pb(s),
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
			!this.__marcador || this.status > 0 && this.status < 400 || sC(t.requisicoes, {
				em: n(),
				metodo: this.__marcador.metodo,
				url: Pb(this.__marcador.url),
				status: this.status,
				duracao_ms: Math.round(performance.now() - r)
			});
		}), o.call(this, e);
	}, t;
}
var uC = /^radix-|^:r|_r_|«r|\d{3,}/;
function dC(e) {
	let t = e.tagName.toLowerCase();
	if (e.id && !uC.test(e.id)) return `${t}#${CSS.escape(e.id)}`;
	let n = e.getAttribute("data-testid");
	if (n) return `${t}[data-testid="${n}"]`;
	let r = e.parentElement;
	if (!r) return t;
	let i = [...r.children].filter((t) => t.tagName === e.tagName);
	return i.length > 1 ? `${t}:nth-of-type(${i.indexOf(e) + 1})` : t;
}
function fC(e) {
	let t = [], n = e;
	for (; n && n !== document.body && t.length < 5;) {
		let e = dC(n);
		if (t.unshift(e), e.includes("#") || e.includes("data-testid")) break;
		n = n.parentElement;
	}
	return t.join(" > ");
}
var pC = /^(Primitive|Slot|Presence|Portal|DismissableLayer|FocusScope|Popper|Collection|RovingFocus|VisuallyHidden|Anchor)|Provider$|SlotClone$/;
function mC(e) {
	let t = Object.keys(e).find((e) => e.startsWith("__reactFiber$"));
	if (!t) return [];
	let n = e[t], r = [], i = 0;
	for (; n && r.length < 4 && i++ < 60;) {
		let e = n.type;
		if (e && typeof e != "string") {
			let t = e.displayName || e.name || e.render?.name;
			t && t.length > 2 && !pC.test(t) && r[r.length - 1] !== t && r.push(t);
		}
		n = n.return ?? null;
	}
	return r;
}
var hC = "button, a[href], [role=option], [role=menuitem], [role=tab], [role=button], input, select, textarea, label, td, th, li";
function gC(e) {
	let t = e;
	for (let e = 0; t && e <= 3; e++, t = t.parentElement) if (t.matches(hC)) return t;
	return e;
}
function _C(e) {
	let t = e.getBoundingClientRect(), n = e.innerText ?? e.textContent ?? "";
	return {
		tag: e.tagName.toLowerCase(),
		seletor: fC(e),
		texto: Nb(n.replace(/\s+/g, " ").trim()).slice(0, 80),
		role: e.getAttribute("role") ?? void 0,
		rotulo: e.getAttribute("aria-label") ? Nb(e.getAttribute("aria-label")) : void 0,
		testid: e.getAttribute("data-testid") ?? void 0,
		componentes: mC(e),
		retangulo: {
			x: Math.round(t.x),
			y: Math.round(t.y),
			largura: Math.round(t.width),
			altura: Math.round(t.height)
		}
	};
}
function vC() {
	let e = window.location.hostname;
	return e === "localhost" || e === "127.0.0.1" || e === "[::1]" || e.endsWith(".localhost") || e.endsWith(".test") ? "dev" : "producao";
}
//#endregion
//#region src/components/MarcadorProblemas/index.tsx
var yC = [
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
], bC = "data-avere-marcador";
function xC(e) {
	return !!e?.closest(`[${bC}]`);
}
function SC({ app: e, versaoApp: t, usuario: n, habilitado: r = !0, destino: i = eC }) {
	let [o, c] = d({ estado: "ocioso" }), [h, g] = d(!1), [v, y] = d(null), [b, x] = d(null), [C, w] = d(null), [T, E] = d(""), [D, O] = d(!1), [k, A] = d(null), j = u(null), M = u(null), N = u(null), [P, F] = d([]), [I, L] = d(!1), R = u(0), z = a(async (e, t) => {
		let n = N.current;
		if (!n) return;
		let r = {
			contorno: n.contorno,
			k: n.k
		}, [i, a] = await Promise.all([zS(XS(n.canvas, e, {
			...r,
			comIndicacoes: !1
		})), zS(XS(n.canvas, e, {
			...r,
			comIndicacoes: !0
		}))]);
		t === R.current && (M.current = {
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
	}, []), ee = a(async (e) => {
		let t = ++R.current;
		A({ estado: "capturando" }), F([]);
		try {
			let n = await RS(xC), r = n.canvas.width / n.largura;
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
			}, await z([], t);
		} catch (e) {
			if (t !== R.current) return;
			A({
				estado: "erro",
				mensagem: e instanceof Error ? e.message : String(e)
			});
		}
	}, [z]), te = a((e) => {
		F(e), L(!1), z(e, R.current);
	}, [z]), ne = a(() => L(!1), []);
	s(() => () => {
		k?.estado === "pronto" && (URL.revokeObjectURL(k.urlFinal), URL.revokeObjectURL(k.urlLimpo));
	}, [k]);
	let re = r && !b && h;
	s(() => {
		r && (j.current = lC());
	}, [r]), s(() => {
		if (!re) return;
		let e = (e) => {
			e.key === "Escape" && g(!1);
		};
		return window.addEventListener("keydown", e, !0), () => window.removeEventListener("keydown", e, !0);
	}, [re]), s(() => {
		if (!re) {
			y(null);
			return;
		}
		let e = (e) => {
			let t = document.elementFromPoint(e.clientX, e.clientY);
			y(t && !xC(t) ? gC(t) : null);
		}, t = (e) => {
			xC(e.target) || (e.preventDefault(), e.stopPropagation());
		}, n = (e) => {
			if (xC(e.target)) return;
			e.preventDefault(), e.stopPropagation();
			let t = document.elementFromPoint(e.clientX, e.clientY);
			if (!t || xC(t)) return;
			let n = gC(t), r = j.current, i = _C(n);
			x({
				elemento: n,
				descricao: i,
				erros: r ? [...r.erros] : [],
				requisicoes: r ? [...r.requisicoes] : [],
				em: /* @__PURE__ */ new Date()
			}), g(!1), ee(i.retangulo);
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
	}, [re, ee]);
	let ae = a(() => {
		R.current++, M.current = null, N.current = null, A(null), F([]), L(!1), x(null), w(null), E(""), O(!1), c({ estado: "ocioso" });
	}, []), B = l(() => b ? {
		schema_versao: 1,
		app: e,
		versao_app: t,
		versao_avere_ui: "1.5.1",
		ambiente: vC(),
		rota: Pb(window.location.href),
		titulo_tela: Nb(document.title),
		tipo: C,
		descricao: T.trim(),
		usuario_id: n?.id ?? null,
		usuario_nome: n?.nome ?? null,
		capturado_em: b.em.toISOString(),
		contexto: {
			fuso: Intl.DateTimeFormat().resolvedOptions().timeZone,
			elemento: b.descricao,
			viewport: {
				largura: window.innerWidth,
				altura: window.innerHeight,
				dpr: window.devicePixelRatio
			},
			navegador: navigator.userAgent,
			idioma: navigator.language,
			erros_console: b.erros,
			requisicoes_falhas: b.requisicoes
		}
	} : null, [
		b,
		e,
		t,
		n,
		C,
		T
	]), oe = async () => {
		B && (await navigator.clipboard.writeText(JSON.stringify(B, null, 2)), O(!0), setTimeout(() => O(!1), 1500));
	}, ce = async () => {
		if (!(!B || !B.descricao)) {
			c({ estado: "enviando" });
			try {
				await rC(i, { ...B }, M.current), c({ estado: "enviado" });
			} catch (e) {
				c({
					estado: "erro",
					mensagem: e instanceof Error ? e.message : String(e)
				});
			}
		}
	};
	if (s(() => {
		if (o.estado !== "enviado") return;
		let e = setTimeout(ae, 2500);
		return () => clearTimeout(e);
	}, [o, ae]), !r) return null;
	let V = !b && v?.isConnected ? v.getBoundingClientRect() : null, le = { [bC]: "" }, ue = !!b && (!k || k.estado === "capturando");
	return _(/* @__PURE__ */ m(f, { children: [
		V && /* @__PURE__ */ p("div", {
			...le,
			className: Q.destaque,
			style: {
				left: V.left,
				top: V.top,
				width: V.width,
				height: V.height
			},
			children: /* @__PURE__ */ p("span", {
				className: Q.etiqueta,
				children: _C(v).seletor
			})
		}),
		(!b || ue) && /* @__PURE__ */ p("div", {
			...le,
			className: S(Q.barra, !ue && !re && Q.barraIcone),
			onPointerDown: (e) => e.stopPropagation(),
			onMouseDown: (e) => {
				e.preventDefault(), e.stopPropagation();
			},
			children: ue ? /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p(Te, {
				size: 16,
				className: Q.girando
			}), /* @__PURE__ */ p("span", { children: "Capturando a tela…" })] }) : re ? /* @__PURE__ */ m(f, { children: [
				/* @__PURE__ */ p(ge, { size: 16 }),
				/* @__PURE__ */ p("span", { children: "Clique no elemento com problema" }),
				/* @__PURE__ */ p("kbd", {
					className: Q.tecla,
					children: "Esc"
				}),
				/* @__PURE__ */ p("button", {
					type: "button",
					className: Q.botaoIcone,
					"aria-label": "Cancelar",
					onClick: () => g(!1),
					children: /* @__PURE__ */ p(Ve, { size: 14 })
				})
			] }) : /* @__PURE__ */ p("button", {
				type: "button",
				className: Q.botaoMarcar,
				onClick: () => g(!0),
				title: "Marcar problema",
				"aria-label": "Marcar problema",
				children: /* @__PURE__ */ p(ie, { size: 18 })
			})
		}),
		b && B && !ue && /* @__PURE__ */ m("aside", {
			...le,
			className: Q.painel,
			"aria-label": "Registrar problema",
			children: [/* @__PURE__ */ m("header", {
				className: Q.cabecalho,
				children: [/* @__PURE__ */ p("strong", { children: "Registrar problema" }), /* @__PURE__ */ p("button", {
					type: "button",
					className: Q.botaoIcone,
					"aria-label": "Fechar",
					onClick: ae,
					children: /* @__PURE__ */ p(Ve, { size: 16 })
				})]
			}), o.estado === "enviado" ? /* @__PURE__ */ m("div", {
				className: Q.enviado,
				children: [
					/* @__PURE__ */ p(de, { size: 40 }),
					/* @__PURE__ */ p("strong", { children: "Relato enviado" }),
					/* @__PURE__ */ p("span", { children: "Obrigado! Vamos olhar com atenção." })
				]
			}) : /* @__PURE__ */ m(f, { children: [
				/* @__PURE__ */ m("div", {
					className: Q.corpo,
					children: [
						/* @__PURE__ */ m("div", {
							className: Q.print,
							children: [
								(!k || k.estado === "capturando") && /* @__PURE__ */ m("span", {
									className: Q.printAviso,
									children: [/* @__PURE__ */ p(Te, {
										size: 16,
										className: Q.girando
									}), " Capturando a tela…"]
								}),
								k?.estado === "pronto" && /* @__PURE__ */ m("div", {
									className: Q.printPar,
									children: [/* @__PURE__ */ m("figure", { children: [/* @__PURE__ */ p("img", {
										src: k.urlLimpo,
										alt: "Print original",
										className: Q.printImagem
									}), /* @__PURE__ */ p("figcaption", { children: "Original" })] }), /* @__PURE__ */ m("figure", { children: [/* @__PURE__ */ p("img", {
										src: k.urlFinal,
										alt: "Print com indicações",
										className: Q.printImagem
									}), /* @__PURE__ */ p("figcaption", { children: "Com indicações" })] })]
								}),
								k?.estado === "erro" && /* @__PURE__ */ m("span", {
									className: Q.printAviso,
									children: ["Não foi possível capturar a tela.", /* @__PURE__ */ p("button", {
										type: "button",
										className: Q.link,
										onClick: () => void ee(_C(b.elemento).retangulo),
										children: "Tentar de novo"
									})]
								})
							]
						}),
						k?.estado === "pronto" && /* @__PURE__ */ m("button", {
							type: "button",
							className: Q.botaoSecundario,
							onClick: () => L(!0),
							children: [
								/* @__PURE__ */ p(ke, { size: 14 }),
								" Desenhar / tarjar",
								P.length > 0 && /* @__PURE__ */ m("span", {
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
						/* @__PURE__ */ m("label", {
							className: Q.rotulo,
							children: ["Tipo ", /* @__PURE__ */ p("span", {
								className: Q.opcional,
								children: "(opcional)"
							})]
						}),
						/* @__PURE__ */ p(jb, {
							opcoes: yC,
							valor: C ?? "",
							altura: 32,
							onChange: (e) => w(e || null)
						}),
						/* @__PURE__ */ p("label", {
							className: Q.rotulo,
							htmlFor: "avere-marcador-descricao",
							children: "O que aconteceu?"
						}),
						/* @__PURE__ */ p("textarea", {
							id: "avere-marcador-descricao",
							className: Q.texto,
							rows: 4,
							autoFocus: !0,
							placeholder: "Ex.: cliquei em Salvar e nada aconteceu — esperava ver o lançamento na lista.",
							value: T,
							onChange: (e) => E(e.target.value)
						}),
						YS(P) > 0 && /* @__PURE__ */ m("span", {
							className: Q.dica,
							children: [
								"Cite os números marcados no print:",
								" ",
								Array.from({ length: YS(P) }, (e, t) => t + 1).join(", ")
							]
						}),
						/* @__PURE__ */ m("details", {
							className: Q.contexto,
							open: !0,
							children: [
								/* @__PURE__ */ p("summary", { children: "O que vai junto (capturado automaticamente)" }),
								/* @__PURE__ */ m("dl", {
									className: Q.lista,
									children: [
										/* @__PURE__ */ p("dt", { children: "Rota" }),
										/* @__PURE__ */ p("dd", { children: B.rota }),
										/* @__PURE__ */ p("dt", { children: "Elemento" }),
										/* @__PURE__ */ p("dd", { children: /* @__PURE__ */ p("code", { children: B.contexto.elemento.seletor }) }),
										B.contexto.elemento.texto && /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p("dt", { children: "Texto" }), /* @__PURE__ */ p("dd", { children: B.contexto.elemento.texto })] }),
										B.contexto.elemento.componentes.length > 0 && /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p("dt", { children: "Componente" }), /* @__PURE__ */ p("dd", { children: B.contexto.elemento.componentes.join(" ‹ ") })] }),
										/* @__PURE__ */ p("dt", { children: "App" }),
										/* @__PURE__ */ m("dd", { children: [
											B.app,
											" ",
											B.versao_app,
											" · avere-ui ",
											B.versao_avere_ui,
											" · ",
											B.ambiente
										] }),
										/* @__PURE__ */ p("dt", { children: "Quem" }),
										/* @__PURE__ */ p("dd", { children: B.usuario_nome ?? "—" }),
										/* @__PURE__ */ p("dt", { children: "Print" }),
										/* @__PURE__ */ p("dd", { children: k?.estado === "pronto" ? `2 imagens ${k.largura}×${k.altura} · ${Math.round(k.bytes / 1024)} KB` : k?.estado === "erro" ? k.mensagem : "…" }),
										/* @__PURE__ */ p("dt", { children: "Tela" }),
										/* @__PURE__ */ m("dd", { children: [
											B.contexto.viewport.largura,
											"×",
											B.contexto.viewport.altura,
											" @",
											B.contexto.viewport.dpr,
											"x"
										] }),
										/* @__PURE__ */ p("dt", { children: "Erros" }),
										/* @__PURE__ */ p("dd", { children: B.contexto.erros_console.length || "nenhum" }),
										/* @__PURE__ */ p("dt", { children: "Requisições" }),
										/* @__PURE__ */ p("dd", { children: B.contexto.requisicoes_falhas.length ? `${B.contexto.requisicoes_falhas.length} falharam` : "nenhuma falhou" })
									]
								}),
								B.contexto.erros_console.length > 0 && /* @__PURE__ */ p("ul", {
									className: Q.itens,
									children: B.contexto.erros_console.map((e, t) => /* @__PURE__ */ p("li", { children: e.mensagem }, t))
								}),
								B.contexto.requisicoes_falhas.length > 0 && /* @__PURE__ */ p("ul", {
									className: Q.itens,
									children: B.contexto.requisicoes_falhas.map((e, t) => /* @__PURE__ */ m("li", { children: [
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
						/* @__PURE__ */ m("details", {
							className: Q.contexto,
							children: [/* @__PURE__ */ p("summary", { children: "Prévia exata do que sobe (JSON)" }), /* @__PURE__ */ p("pre", {
								className: Q.json,
								children: JSON.stringify(B, null, 2)
							})]
						})
					]
				}),
				o.estado === "erro" && /* @__PURE__ */ m("div", {
					className: Q.erroEnvio,
					role: "alert",
					children: ["Não foi possível enviar. ", o.mensagem]
				}),
				/* @__PURE__ */ m("footer", {
					className: Q.rodape,
					children: [/* @__PURE__ */ m("button", {
						type: "button",
						className: Q.botaoSecundario,
						onClick: oe,
						children: [p(D ? se : he, { size: 14 }), D ? "Copiado" : "Copiar JSON"]
					}), /* @__PURE__ */ p("button", {
						type: "button",
						className: Q.botaoPrimario,
						onClick: () => void ce(),
						disabled: !B.descricao || o.estado === "enviando",
						title: B.descricao ? void 0 : "Descreva o que aconteceu para enviar",
						children: o.estado === "enviando" ? /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p(Te, {
							size: 14,
							className: Q.girando
						}), " Enviando…"] }) : /* @__PURE__ */ m(f, { children: [
							/* @__PURE__ */ p(Me, { size: 14 }),
							" ",
							o.estado === "erro" ? "Tentar de novo" : "Enviar"
						] })
					})]
				})
			] })]
		}),
		I && N.current && /* @__PURE__ */ p($S, {
			base: N.current.canvas,
			contorno: N.current.contorno,
			k: N.current.k,
			formasIniciais: P,
			onConcluir: te,
			onCancelar: ne,
			marcador: le
		})
	] }), document.body);
}
//#endregion
//#region src/components/FiltroLista/index.tsx
function CC(e, t, n) {
	if (n) {
		let t = e.findIndex((e) => e.value === n);
		if (t >= 0) return t;
	}
	let r = e.findIndex((e) => t.includes(e.value));
	return r >= 0 ? r : 0;
}
function wC({ opcoes: e, selecionadas: t, onChange: n, focoInicial: r }) {
	let [i, a] = d(""), [o, c] = d(() => CC(e, t, r)), l = u(o), f = u(null), h = u(null), g = u(!0), _ = i.trim() ? e.filter((e) => e.label.toLowerCase().includes(i.trim().toLowerCase())) : e;
	s(() => {
		g.current || (c(0), l.current = 0);
	}, [i]), s(() => {
		let e = requestAnimationFrame(() => {
			let e = h.current, t = f.current;
			if (e && t) {
				let n = e.getBoundingClientRect(), r = t.getBoundingClientRect();
				e.scrollTop += r.top - n.top - (n.height - r.height) / 2;
			}
			g.current = !1;
		});
		return () => cancelAnimationFrame(e);
	}, []), s(() => {
		g.current || f.current?.scrollIntoView({ block: "nearest" });
	}, [o]);
	function v(e) {
		n(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	}
	return /* @__PURE__ */ m("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: "var(--space-2)",
			width: 240
		},
		tabIndex: -1,
		children: [
			/* @__PURE__ */ p("input", {
				autoFocus: !0,
				placeholder: "Pesquisar…",
				value: i,
				onChange: (e) => a(e.target.value),
				onKeyDown: (e) => {
					if (e.key === "ArrowDown") e.preventDefault(), l.current = Math.min(l.current + 1, _.length - 1), c(l.current);
					else if (e.key === "ArrowUp") e.preventDefault(), l.current = Math.max(l.current - 1, 0), c(l.current);
					else if (e.key === "Enter") {
						e.preventDefault();
						let t = _[l.current];
						t && v(t.value);
					}
				},
				style: {
					padding: "6px 10px",
					borderRadius: "var(--radius-sm)",
					border: "1px solid var(--color-border-default)",
					fontSize: "var(--text-sm)",
					fontFamily: "inherit",
					outline: "none"
				}
			}),
			/* @__PURE__ */ m("div", {
				ref: h,
				style: {
					maxHeight: 260,
					overflowY: "auto",
					display: "flex",
					flexDirection: "column",
					gap: 2
				},
				children: [_.map((e, n) => /* @__PURE__ */ m("label", {
					ref: n === o ? f : void 0,
					onMouseEnter: () => {
						c(n), l.current = n;
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
					children: [/* @__PURE__ */ p($e, {
						tabIndex: -1,
						checked: t.includes(e.value),
						onChange: () => v(e.value)
					}), /* @__PURE__ */ p("span", {
						style: {
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap"
						},
						children: e.label
					})]
				}, e.value)), _.length === 0 && /* @__PURE__ */ p("span", {
					style: {
						fontSize: "var(--text-sm)",
						color: "var(--color-text-muted)",
						padding: 4
					},
					children: "Nenhum valor encontrado."
				})]
			}),
			/* @__PURE__ */ m("div", {
				style: {
					display: "flex",
					justifyContent: "space-between",
					borderTop: "1px solid var(--color-border-subtle)",
					paddingTop: "var(--space-2)"
				},
				children: [/* @__PURE__ */ p("span", {
					style: {
						fontSize: "var(--text-xs)",
						color: "var(--color-text-muted)",
						alignSelf: "center"
					},
					children: t.length === 0 ? "Sem seleção = todos" : `${t.length} selecionado(s)`
				}), /* @__PURE__ */ p(Je, {
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
function TC({ opcoes: e, valores: t, onChange: n, largura: r = 210, rotuloVazio: i = "Todos", substantivo: a = "itens", focoInicial: o }) {
	let s = t.length === 0 ? i : t.length === 1 ? e.find((e) => e.value === t[0])?.label ?? t[0] : `${t.length} ${a} selecionados`;
	return /* @__PURE__ */ m(W_, { children: [/* @__PURE__ */ p(G_, {
		asChild: !0,
		children: /* @__PURE__ */ m("button", {
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
			children: [/* @__PURE__ */ p("span", {
				style: {
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap"
				},
				children: s
			}), /* @__PURE__ */ p(ue, {
				size: 14,
				style: {
					flexShrink: 0,
					color: "var(--color-text-muted)"
				}
			})]
		})
	}), /* @__PURE__ */ p(K_, {
		align: "start",
		style: {
			padding: "var(--space-3)",
			zIndex: 9999
		},
		children: /* @__PURE__ */ p(wC, {
			opcoes: e,
			selecionadas: t,
			onChange: n,
			focoInicial: o
		})
	})] });
}
//#endregion
//#region src/components/BotaoMesVigente/index.tsx
function EC({ ativo: e, onClick: t, rotulo: n = "mês vigente" }) {
	return /* @__PURE__ */ p("button", {
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
		children: /* @__PURE__ */ p(ae, { size: 17 })
	});
}
//#endregion
//#region src/components/SeletorMes/index.tsx
function DC({ opcoes: e, valor: t, mesVigente: n, onChange: r, largura: i = 220 }) {
	let [a, o] = d(!1), [c, l] = d(""), [f, h] = d(() => Math.max(0, e.findIndex((e) => e.value === t))), g = u(f), _ = u(null), v = u(null), y = u(!0), b = e.find((e) => e.value === t)?.label ?? t, x = c.trim() ? e.filter((e) => e.label.toLowerCase().includes(c.trim().toLowerCase())) : e;
	s(() => {
		y.current || (h(0), g.current = 0);
	}, [c]), s(() => {
		if (!a) {
			y.current = !0;
			return;
		}
		let n = Math.max(0, e.findIndex((e) => e.value === t));
		h(n), g.current = n;
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
	]), s(() => {
		y.current || _.current?.scrollIntoView({ block: "nearest" });
	}, [f]);
	function S(e) {
		r(e), o(!1), l("");
	}
	let C = (e) => {
		if (e.key === "ArrowDown") e.preventDefault(), g.current = Math.min(g.current + 1, x.length - 1), h(g.current);
		else if (e.key === "ArrowUp") e.preventDefault(), g.current = Math.max(g.current - 1, 0), h(g.current);
		else if (e.key === "Enter") {
			e.preventDefault();
			let t = x[g.current];
			t && S(t.value);
		}
	}, w = t === n;
	return /* @__PURE__ */ m("div", {
		style: {
			display: "flex",
			gap: "var(--space-2)",
			alignItems: "center"
		},
		children: [/* @__PURE__ */ m(W_, {
			open: a,
			onOpenChange: (e) => {
				o(e), e || l("");
			},
			children: [/* @__PURE__ */ p(G_, {
				asChild: !0,
				children: /* @__PURE__ */ m("button", {
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
					children: [/* @__PURE__ */ p("span", {
						style: {
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap"
						},
						children: b
					}), /* @__PURE__ */ p(ue, {
						size: 14,
						style: {
							flexShrink: 0,
							color: "var(--color-text-muted)"
						}
					})]
				})
			}), /* @__PURE__ */ p(K_, {
				align: "start",
				style: {
					padding: "var(--space-3)",
					zIndex: 9999
				},
				children: /* @__PURE__ */ m("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: "var(--space-2)",
						width: 240
					},
					children: [/* @__PURE__ */ p("input", {
						autoFocus: !0,
						placeholder: "Pesquisar…",
						value: c,
						onChange: (e) => l(e.target.value),
						onKeyDown: C,
						style: {
							padding: "6px 10px",
							borderRadius: "var(--radius-sm)",
							border: "1px solid var(--color-border-default)",
							fontSize: "var(--text-sm)",
							fontFamily: "inherit",
							outline: "none"
						}
					}), /* @__PURE__ */ m("div", {
						ref: v,
						style: {
							maxHeight: 260,
							overflowY: "auto",
							display: "flex",
							flexDirection: "column",
							gap: 2
						},
						children: [x.map((e, n) => /* @__PURE__ */ m("label", {
							ref: n === f ? _ : void 0,
							onMouseEnter: () => {
								h(n), g.current = n;
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
								background: n === f ? "var(--color-surface-sunken)" : "transparent"
							},
							children: [/* @__PURE__ */ p($e, {
								tabIndex: -1,
								checked: e.value === t,
								onChange: () => S(e.value)
							}), /* @__PURE__ */ p("span", {
								style: {
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap"
								},
								children: e.label
							})]
						}, e.value)), x.length === 0 && /* @__PURE__ */ p("span", {
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
		}), /* @__PURE__ */ p(EC, {
			ativo: w,
			rotulo: "mês padrão",
			onClick: () => S(n)
		})]
	});
}
//#endregion
//#region src/components/CampoData/index.tsx
function OC(e) {
	if (!e) return "";
	let [t, n, r] = e.split("-");
	return !t || !n || !r ? "" : `${r}/${n}/${t}`;
}
function kC(e) {
	let t = e.slice(0, 8);
	return t.length <= 2 ? t : t.length <= 4 ? `${t.slice(0, 2)}/${t.slice(2)}` : `${t.slice(0, 2)}/${t.slice(2, 4)}/${t.slice(4)}`;
}
function AC(e) {
	let t = e.replace(/\D/g, "");
	if (t.length !== 8) return null;
	let n = Number(t.slice(0, 2)), r = Number(t.slice(2, 4)), i = Number(t.slice(4));
	if (i < 1900 || i > 2200 || r < 1 || r > 12) return null;
	let a = new Date(i, r, 0).getDate();
	return n < 1 || n > a ? null : `${i}-${String(r).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function jC({ label: e, valor: t, onChange: n, placeholder: r }) {
	let [i, a] = d(() => OC(t));
	s(() => {
		a((e) => {
			let n = OC(t);
			return AC(e) === (t || null) && e !== "" ? e : n;
		});
	}, [t]);
	let o = i.replace(/\D/g, "").length === 8 && !AC(i), c = i !== "" && i.replace(/\D/g, "").length < 8;
	return /* @__PURE__ */ p(Ze, {
		label: e,
		inputMode: "numeric",
		placeholder: r ?? "dd/mm/aaaa",
		value: i,
		error: o ? "Data inválida" : void 0,
		onChange: (e) => {
			let t = kC(e.target.value.replace(/\D/g, ""));
			a(t);
			let r = AC(t);
			r ? n(r) : t === "" && n("");
		},
		onBlur: () => {
			c && a(OC(t));
		}
	});
}
function MC({ valor: e, onChange: t, className: n, style: r }) {
	let [i, a] = d(() => OC(e));
	s(() => {
		a((t) => {
			let n = OC(e);
			return AC(t) === (e || null) && t !== "" ? t : n;
		});
	}, [e]);
	let o = i.replace(/\D/g, "").length === 8 && !AC(i);
	return /* @__PURE__ */ p("input", {
		className: n,
		inputMode: "numeric",
		placeholder: "dd/mm/aaaa",
		value: i,
		style: {
			...r,
			...o ? { borderColor: "var(--color-danger-solid)" } : {}
		},
		onChange: (e) => {
			let n = kC(e.target.value.replace(/\D/g, ""));
			a(n);
			let r = AC(n);
			r && t(r);
		},
		onBlur: () => {
			i.replace(/\D/g, "").length < 8 && a(OC(e));
		}
	});
}
//#endregion
//#region node_modules/cmdk/dist/chunk-NZJY6EH4.mjs
var NC = 1, PC = .9, FC = .8, IC = .17, LC = .1, RC = .999, zC = .9999, BC = .99, VC = /[\\\/_+.#"@\[\(\{&]/, HC = /[\\\/_+.#"@\[\(\{&]/g, UC = /[\s-]/, WC = /[\s-]/g;
function GC(e, t, n, r, i, a, o) {
	if (a === t.length) return i === e.length ? NC : BC;
	var s = `${i},${a}`;
	if (o[s] !== void 0) return o[s];
	for (var c = r.charAt(a), l = n.indexOf(c, i), u = 0, d, f, p, m; l >= 0;) d = GC(e, t, n, r, l + 1, a + 1, o), d > u && (l === i ? d *= NC : VC.test(e.charAt(l - 1)) ? (d *= FC, p = e.slice(i, l - 1).match(HC), p && i > 0 && (d *= RC ** +p.length)) : UC.test(e.charAt(l - 1)) ? (d *= PC, m = e.slice(i, l - 1).match(WC), m && i > 0 && (d *= RC ** +m.length)) : (d *= IC, i > 0 && (d *= RC ** +(l - i))), e.charAt(l) !== t.charAt(a) && (d *= zC)), (d < LC && n.charAt(l - 1) === r.charAt(a + 1) || r.charAt(a + 1) === r.charAt(a) && n.charAt(l - 1) !== r.charAt(a)) && (f = GC(e, t, n, r, l + 1, a + 2, o), f * LC > d && (d = f * LC)), d > u && (u = d), l = n.indexOf(c, l + 1);
	return o[s] = u, u;
}
function KC(e) {
	return e.toLowerCase().replace(WC, " ");
}
function qC(e, t, n) {
	return e = n && n.length > 0 ? `${e + " " + n.join(" ")}` : e, GC(e, t, KC(e), KC(t), 0, 0, {});
}
//#endregion
//#region node_modules/cmdk/dist/index.mjs
var JC = "[cmdk-group=\"\"]", YC = "[cmdk-group-items=\"\"]", XC = "[cmdk-group-heading=\"\"]", ZC = "[cmdk-item=\"\"]", QC = `${ZC}:not([aria-disabled="true"])`, $C = "cmdk-item-select", ew = "data-value", tw = (e, t, n) => qC(e, t, n), nw = e.createContext(void 0), rw = () => e.useContext(nw), iw = e.createContext(void 0), aw = () => e.useContext(iw), ow = e.createContext(void 0), sw = e.forwardRef((t, n) => {
	let r = xw(() => ({
		search: "",
		value: t.value ?? t.defaultValue ?? "",
		selectedItemId: void 0,
		filtered: {
			count: 0,
			items: /* @__PURE__ */ new Map(),
			groups: /* @__PURE__ */ new Set()
		}
	})), i = xw(() => /* @__PURE__ */ new Set()), a = xw(() => /* @__PURE__ */ new Map()), o = xw(() => /* @__PURE__ */ new Map()), s = xw(() => /* @__PURE__ */ new Set()), c = yw(t), { label: l, children: u, value: d, onValueChange: f, filter: p, shouldFilter: m, loop: h, disablePointerSelection: g = !1, vimBindings: _ = !0, ...v } = t, y = _t(), b = _t(), x = _t(), S = e.useRef(null), C = ww();
	bw(() => {
		if (d !== void 0) {
			let e = d.trim();
			r.current.value = e, w.emit();
		}
	}, [d]), bw(() => {
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
		let n = c.current?.filter ?? tw;
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
			let t = e.closest(YC);
			t ? t.appendChild(e.parentElement === t ? e : e.closest(`${YC} > *`)) : n.appendChild(e.parentElement === n ? e : e.closest(`${YC} > *`));
		}), t.sort((e, t) => t[1] - e[1]).forEach((e) => {
			let t = S.current?.querySelector(`${JC}[${ew}="${encodeURIComponent(e[0])}"]`);
			t?.parentElement.appendChild(t);
		});
	}
	function O() {
		let e = M().find((e) => e.getAttribute("aria-disabled") !== "true")?.getAttribute(ew);
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
		t && (t.parentElement?.firstChild === t && ((e = t.closest(JC)?.querySelector(XC)) == null || e.scrollIntoView({ block: "nearest" })), t.scrollIntoView({ block: "nearest" }));
	}
	function j() {
		return S.current?.querySelector(`${ZC}[aria-selected="true"]`);
	}
	function M() {
		return Array.from(S.current?.querySelectorAll(QC) || []);
	}
	function N(e) {
		let t = M()[e];
		t && w.setState("value", t.getAttribute(ew));
	}
	function P(e) {
		var t;
		let n = j(), r = M(), i = r.findIndex((e) => e === n), a = r[i + e];
		(t = c.current) != null && t.loop && (a = i + e < 0 ? r[r.length - 1] : i + e === r.length ? r[0] : r[i + e]), a && w.setState("value", a.getAttribute(ew));
	}
	function F(e) {
		let t = j()?.closest(JC), n;
		for (; t && !n;) t = e > 0 ? _w(t, JC) : vw(t, JC), n = t?.querySelector(QC);
		n ? w.setState("value", n.getAttribute(ew)) : P(e);
	}
	let I = () => N(M().length - 1), L = (e) => {
		e.preventDefault(), e.metaKey ? I() : e.altKey ? F(1) : P(1);
	}, R = (e) => {
		e.preventDefault(), e.metaKey ? N(0) : e.altKey ? F(-1) : P(-1);
	};
	return e.createElement(W.div, {
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
					_ && e.ctrlKey && R(e);
					break;
				case "ArrowUp":
					R(e);
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
						let e = new Event($C);
						t.dispatchEvent(e);
					}
				}
			}
		}
	}, e.createElement("label", {
		"cmdk-label": "",
		htmlFor: T.inputId,
		id: T.labelId,
		style: Dw
	}, l), Ew(t, (t) => e.createElement(iw.Provider, { value: w }, e.createElement(nw.Provider, { value: T }, t))));
}), cw = e.forwardRef((t, n) => {
	let r = _t(), i = e.useRef(null), a = e.useContext(ow), o = rw(), s = yw(t), c = s.current?.forceMount ?? a?.forceMount;
	bw(() => {
		if (!c) return o.item(r, a?.id);
	}, [c]);
	let l = Cw(r, i, [
		t.value,
		t.children,
		i
	], t.keywords), u = aw(), d = Sw((e) => e.value && e.value === l.current), f = Sw((e) => c || o.filter() === !1 ? !0 : e.search ? e.filtered.items.get(r) > 0 : !0);
	e.useEffect(() => {
		let e = i.current;
		if (!(!e || t.disabled)) return e.addEventListener($C, p), () => e.removeEventListener($C, p);
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
	return e.createElement(W.div, {
		ref: tt(i, n),
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
}), lw = e.forwardRef((t, n) => {
	let { heading: r, children: i, forceMount: a, ...o } = t, s = _t(), c = e.useRef(null), l = e.useRef(null), u = _t(), d = rw(), f = Sw((e) => a || d.filter() === !1 ? !0 : e.search ? e.filtered.groups.has(s) : !0);
	bw(() => d.group(s), []), Cw(s, c, [
		t.value,
		t.heading,
		l
	]);
	let p = e.useMemo(() => ({
		id: s,
		forceMount: a
	}), [a]);
	return e.createElement(W.div, {
		ref: tt(c, n),
		...o,
		"cmdk-group": "",
		role: "presentation",
		hidden: f ? void 0 : !0
	}, r && e.createElement("div", {
		ref: l,
		"cmdk-group-heading": "",
		"aria-hidden": !0,
		id: u
	}, r), Ew(t, (t) => e.createElement("div", {
		"cmdk-group-items": "",
		role: "group",
		"aria-labelledby": r ? u : void 0
	}, e.createElement(ow.Provider, { value: p }, t))));
}), uw = e.forwardRef((t, n) => {
	let { alwaysRender: r, ...i } = t, a = e.useRef(null), o = Sw((e) => !e.search);
	return !r && !o ? null : e.createElement(W.div, {
		ref: tt(a, n),
		...i,
		"cmdk-separator": "",
		role: "separator"
	});
}), dw = e.forwardRef((t, n) => {
	let { onValueChange: r, ...i } = t, a = t.value != null, o = aw(), s = Sw((e) => e.search), c = Sw((e) => e.selectedItemId), l = rw();
	return e.useEffect(() => {
		t.value != null && o.setState("search", t.value);
	}, [t.value]), e.createElement(W.input, {
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
}), fw = e.forwardRef((t, n) => {
	let { children: r, label: i = "Suggestions", ...a } = t, o = e.useRef(null), s = e.useRef(null), c = Sw((e) => e.selectedItemId), l = rw();
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
	}, []), e.createElement(W.div, {
		ref: tt(o, n),
		...a,
		"cmdk-list": "",
		role: "listbox",
		tabIndex: -1,
		"aria-activedescendant": c,
		"aria-label": i,
		id: l.listId
	}, Ew(t, (t) => e.createElement("div", {
		ref: tt(s, l.listInnerRef),
		"cmdk-list-sizer": ""
	}, t)));
}), pw = e.forwardRef((t, n) => {
	let { open: r, onOpenChange: i, overlayClassName: a, contentClassName: o, container: s, ...c } = t;
	return e.createElement($y, {
		open: r,
		onOpenChange: i
	}, e.createElement(tb, { container: s }, e.createElement(nb, {
		"cmdk-overlay": "",
		className: a
	}), e.createElement(rb, {
		"aria-label": t.label,
		"cmdk-dialog": "",
		className: o
	}, e.createElement(sw, {
		ref: n,
		...c
	}))));
}), mw = e.forwardRef((t, n) => Sw((e) => e.filtered.count === 0) ? e.createElement(W.div, {
	ref: n,
	...t,
	"cmdk-empty": "",
	role: "presentation"
}) : null), hw = e.forwardRef((t, n) => {
	let { progress: r, children: i, label: a = "Loading...", ...o } = t;
	return e.createElement(W.div, {
		ref: n,
		...o,
		"cmdk-loading": "",
		role: "progressbar",
		"aria-valuenow": r,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-label": a
	}, Ew(t, (t) => e.createElement("div", { "aria-hidden": !0 }, t)));
}), gw = Object.assign(sw, {
	List: fw,
	Item: cw,
	Input: dw,
	Group: lw,
	Separator: uw,
	Dialog: pw,
	Empty: mw,
	Loading: hw
});
function _w(e, t) {
	let n = e.nextElementSibling;
	for (; n;) {
		if (n.matches(t)) return n;
		n = n.nextElementSibling;
	}
}
function vw(e, t) {
	let n = e.previousElementSibling;
	for (; n;) {
		if (n.matches(t)) return n;
		n = n.previousElementSibling;
	}
}
function yw(t) {
	let n = e.useRef(t);
	return bw(() => {
		n.current = t;
	}), n;
}
var bw = typeof window > "u" ? e.useEffect : e.useLayoutEffect;
function xw(t) {
	let n = e.useRef();
	return n.current === void 0 && (n.current = t()), n;
}
function Sw(t) {
	let n = aw(), r = () => t(n.snapshot());
	return e.useSyncExternalStore(n.subscribe, r, r);
}
function Cw(t, n, r, i = []) {
	let a = e.useRef(), o = rw();
	return bw(() => {
		var e;
		let s = (() => {
			for (let e of r) {
				if (typeof e == "string") return e.trim();
				if (typeof e == "object" && "current" in e) return e.current ? e.current.textContent?.trim() : a.current;
			}
		})(), c = i.map((e) => e.trim());
		o.value(t, s, c), (e = n.current) == null || e.setAttribute(ew, s), a.current = s;
	}), a;
}
var ww = () => {
	let [t, n] = e.useState(), r = xw(() => /* @__PURE__ */ new Map());
	return bw(() => {
		r.current.forEach((e) => e()), r.current = /* @__PURE__ */ new Map();
	}, [t]), (e, t) => {
		r.current.set(e, t), n({});
	};
};
function Tw(e) {
	let t = e.type;
	return typeof t == "function" ? t(e.props) : "render" in t ? t.render(e.props) : e;
}
function Ew({ asChild: t, children: n }, r) {
	return t && e.isValidElement(n) ? e.cloneElement(Tw(n), { ref: n.ref }, r(n.props.children)) : r(n);
}
var Dw = {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: "0",
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	borderWidth: "0"
}, Ow = {
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
}, kw = (e) => e.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(), Aw = "\0", jw = (e, t, n) => {
	let r = e.split(Aw)[0], i = kw(t).trim().split(/\s+/).filter(Boolean);
	if (!i.length) return 1;
	let a = n?.length ? `${r} ${n.join(" ")}` : r;
	if (i.every((e) => a.includes(e))) return i.every((e) => ` ${a}`.includes(` ${e}`)) ? 1 : .9;
	if (i.every((e) => /^\d+$/.test(e))) return 0;
	let o = tw(r, i.join(" "), n);
	return o >= Mw ? o * .5 : 0;
}, Mw = .1, Nw = (e, t) => `${e}${Aw}${t}`;
function Pw(e) {
	try {
		let t = JSON.parse(localStorage.getItem(e) ?? "[]");
		return Array.isArray(t) ? t : [];
	} catch {
		return [];
	}
}
function Fw(e, t, n) {
	try {
		let r = [t, ...Pw(e).filter((e) => e !== t)].slice(0, n);
		localStorage.setItem(e, JSON.stringify(r));
	} catch {}
}
var Iw = typeof navigator < "u" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
function Lw({ lista: e }) {
	return s(() => {
		let t = e.current;
		if (!t) return;
		t.scrollTo({ top: 0 });
		let n = requestAnimationFrame(() => t.scrollTo({ top: 0 }));
		return () => cancelAnimationFrame(n);
	}, [Sw((e) => e.search), e]), null;
}
function Rw() {
	let e = Sw((e) => e.filtered.count), t = Sw((e) => e.search);
	return /* @__PURE__ */ p("div", {
		"aria-live": "polite",
		className: Ow.somenteLeitor,
		children: t ? `${e} ${e === 1 ? "resultado" : "resultados"}` : ""
	});
}
function zw({ grupos: e, placeholder: t = "Buscar…", textoVazio: n = (e) => `Nada encontrado para "${e}".`, mostrarBotao: r = !0, rotuloBotao: i = "Buscar…", atalho: o = !0, maxRecentes: c = 6, chaveRecentes: h = "avere-ui:busca-recentes", aberto: g, onAbertoChange: _ }) {
	let [v, y] = d(!1), b = g ?? v, x = u(null), S = a((e) => {
		e && !b && (x.current = document.activeElement), g === void 0 && y(e), _?.(e);
	}, [
		b,
		g,
		_
	]);
	s(() => {
		if (b || !x.current) return;
		let e = x.current;
		x.current = null;
		let t = setTimeout(() => {
			e.isConnected && e.focus();
		}, 0);
		return () => clearTimeout(t);
	}, [b]);
	let [C, w] = d(""), T = u(null);
	s(() => {
		b && w("");
	}, [b]), s(() => {
		if (!o) return;
		let e = (e) => {
			(e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k" && (e.preventDefault(), S(!b));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		o,
		b,
		S
	]);
	let E = l(() => {
		if (!b) return [];
		let t = /* @__PURE__ */ new Map();
		for (let n of e) if (n.recentes) for (let e of n.itens) t.set(Nw(n.titulo, e.id), e);
		return Pw(h).map((e) => t.get(e)).filter((e) => !!e);
	}, [
		b,
		e,
		h
	]), D = (e, t) => {
		e.recentes && Fw(h, Nw(e.titulo, t.id), c), S(!1), t.aoEscolher();
	}, O = (e) => kw(`${e.rotulo} ${e.detalhe ?? ""}`), k = (e, t) => /* @__PURE__ */ m(f, { children: [
		t && /* @__PURE__ */ p(t, { size: 16 }),
		/* @__PURE__ */ p("span", {
			className: Ow.rotulo,
			children: e.rotulo
		}),
		e.detalhe != null && e.detalhe !== "" && /* @__PURE__ */ p("span", {
			className: Ow.detalhe,
			children: e.detalhe
		})
	] }), A = C.trim() === "";
	return /* @__PURE__ */ m(f, { children: [r && /* @__PURE__ */ m("button", {
		type: "button",
		className: Ow.botao,
		onClick: () => S(!0),
		"aria-label": `Busca rápida (${Iw ? "⌘K" : "Ctrl+K"})`,
		"aria-keyshortcuts": o ? Iw ? "Meta+K" : "Control+K" : void 0,
		children: [
			/* @__PURE__ */ p(je, { size: 15 }),
			/* @__PURE__ */ p("span", { children: i }),
			o && /* @__PURE__ */ p("kbd", {
				className: Ow.tecla,
				children: Iw ? "⌘K" : "Ctrl K"
			})
		]
	}), /* @__PURE__ */ m(gw.Dialog, {
		open: b,
		onOpenChange: S,
		label: "Busca rápida",
		shouldFilter: !A,
		filter: jw,
		loop: !0,
		overlayClassName: Ow.fundo,
		contentClassName: Ow.janela,
		className: Ow.paleta,
		children: [
			/* @__PURE__ */ m("div", {
				className: Ow.campo,
				children: [/* @__PURE__ */ p(je, {
					size: 18,
					className: Ow.iconeCampo
				}), /* @__PURE__ */ p(gw.Input, {
					value: C,
					onValueChange: w,
					placeholder: t
				})]
			}),
			/* @__PURE__ */ m(gw.List, {
				ref: T,
				children: [
					/* @__PURE__ */ p(gw.Empty, { children: n(C) }),
					A && E.length > 0 && /* @__PURE__ */ p(gw.Group, {
						heading: "Recentes",
						children: E.map((t) => {
							let n = e.find((e) => e.recentes && e.itens.includes(t));
							return /* @__PURE__ */ p(gw.Item, {
								value: `${O(t)}${Aw}recente${Aw}${Nw(n.titulo, t.id)}`,
								onSelect: () => D(n, t),
								children: k(t, pe)
							}, `recente-${n.titulo}-${t.id}`);
						})
					}),
					e.map((e) => e.itens.length > 0 && /* @__PURE__ */ p(gw.Group, {
						heading: e.titulo,
						children: e.itens.map((t) => /* @__PURE__ */ p(gw.Item, {
							value: `${O(t)}${Aw}${Nw(e.titulo, t.id)}`,
							keywords: t.palavrasChave?.map(kw),
							onSelect: () => D(e, t),
							children: k(t, t.icone)
						}, t.id))
					}, e.titulo))
				]
			}),
			/* @__PURE__ */ m("div", {
				className: Ow.rodape,
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ m("span", { children: [
						/* @__PURE__ */ p("kbd", { children: "↑" }),
						/* @__PURE__ */ p("kbd", { children: "↓" }),
						" navegar"
					] }),
					/* @__PURE__ */ m("span", { children: [/* @__PURE__ */ p("kbd", { children: "↵" }), " abrir"] }),
					/* @__PURE__ */ m("span", { children: [/* @__PURE__ */ p("kbd", { children: "esc" }), " fechar"] })
				]
			}),
			/* @__PURE__ */ p(Rw, {}),
			/* @__PURE__ */ p(Lw, { lista: T })
		]
	})] });
}
//#endregion
//#region src/hooks/useAlturaDisponivel.ts
function Bw(e = 260) {
	let t = u(null), [n, r] = d();
	return s(() => {
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
//#region src/hooks/useEdicaoInline.ts
function Vw(e) {
	return !!e && e.matches("button[class*=\"cbTrigger\"], button[role=\"combobox\"]");
}
var Hw = "input:not([type=\"hidden\"]):not([disabled]), button[class*=\"cbTrigger\"], button[role=\"combobox\"], [role=\"switch\"]";
function Uw({ ativo: e, seletorLinha: t, coluna: n }) {
	s(() => {
		if (!e || n == null) return;
		let r = requestAnimationFrame(() => {
			let e = (document.querySelector(t)?.children[n])?.querySelector(Hw);
			e && (e.focus(), e instanceof HTMLInputElement ? e.select() : Vw(e) && e.click());
		});
		return () => cancelAnimationFrame(r);
	}, [
		e,
		t,
		n
	]);
}
function Ww() {
	s(() => {
		let e = !1, t = (t) => {
			t.key === "Tab" && (e = !0);
		}, n = () => {
			e = !1;
		}, r = (t) => {
			if (!e) return;
			e = !1;
			let n = t.target;
			Vw(n) && n.getAttribute("aria-expanded") !== "true" && (n.hasAttribute("disabled") || setTimeout(() => n.click(), 0));
		};
		return document.addEventListener("keydown", t, !0), document.addEventListener("mousedown", n, !0), document.addEventListener("focusin", r), () => {
			document.removeEventListener("keydown", t, !0), document.removeEventListener("mousedown", n, !0), document.removeEventListener("focusin", r);
		};
	}, []);
}
function Gw(e) {
	let t = e.target?.closest?.("td");
	return t?.parentElement ? [...t.parentElement.children].indexOf(t) : null;
}
//#endregion
//#region src/utils/format.ts
var Kw = new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL"
}), qw = new Intl.NumberFormat("pt-BR", {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});
function Jw(e) {
	return Kw.format(e);
}
function Yw(e) {
	return qw.format(e);
}
var Xw = new Intl.NumberFormat("pt-BR", {
	notation: "compact",
	maximumFractionDigits: 1
});
function Zw(e) {
	return Xw.format(e);
}
function Qw(e) {
	let [t, n, r] = e.slice(0, 10).split("-");
	return `${r}/${n}/${t}`;
}
function $w(e) {
	let t = e.includes("-"), n = e.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
	if (!n) return "";
	let r = parseInt(n.slice(0, 15), 10);
	return ((t ? -r : r) / 100).toFixed(2);
}
function eT(e) {
	if (e === "" || e == null) return "";
	let t = Number(e);
	return Number.isNaN(t) ? "" : `R$ ${qw.format(t)}`;
}
var tT = [
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
], nT = {
	card: "_card_buvlb_1",
	header: "_header_buvlb_21",
	title: "_title_buvlb_35",
	description: "_description_buvlb_51",
	content: "_content_buvlb_63",
	footer: "_footer_buvlb_81"
}, rT = i(({ className: e, ...t }, n) => /* @__PURE__ */ p("div", {
	ref: n,
	className: S(nT.card, e),
	...t
}));
rT.displayName = "Card";
var iT = i(({ className: e, ...t }, n) => /* @__PURE__ */ p("div", {
	ref: n,
	className: S(nT.header, e),
	...t
}));
iT.displayName = "CardHeader";
var aT = i(({ className: e, ...t }, n) => /* @__PURE__ */ p("h3", {
	ref: n,
	className: S(nT.title, e),
	...t
}));
aT.displayName = "CardTitle";
var oT = i(({ className: e, ...t }, n) => /* @__PURE__ */ p("p", {
	ref: n,
	className: S(nT.description, e),
	...t
}));
oT.displayName = "CardDescription";
var sT = i(({ className: e, ...t }, n) => /* @__PURE__ */ p("div", {
	ref: n,
	className: S(nT.content, e),
	...t
}));
sT.displayName = "CardContent";
var cT = i(({ className: e, ...t }, n) => /* @__PURE__ */ p("div", {
	ref: n,
	className: S(nT.footer, e),
	...t
}));
cT.displayName = "CardFooter";
var $ = {
	overlay: "_overlay_18fpy_3",
	sidebar: "_sidebar_18fpy_23",
	expanded: "_expanded_18fpy_53",
	collapsed: "_collapsed_18fpy_61",
	header: "_header_18fpy_71",
	logoContainer: "_logoContainer_18fpy_111",
	toggleButton: "_toggleButton_18fpy_141",
	nav: "_nav_18fpy_203",
	item: "_item_18fpy_225",
	iconWrap: "_iconWrap_18fpy_275",
	badge: "_badge_18fpy_293",
	itemActive: "_itemActive_18fpy_317",
	badgeDot: "_badgeDot_18fpy_329",
	itemCollapsed: "_itemCollapsed_18fpy_373",
	itemExpanded: "_itemExpanded_18fpy_383",
	itemLabel: "_itemLabel_18fpy_393",
	labelHidden: "_labelHidden_18fpy_407",
	externo: "_externo_18fpy_421",
	section: "_section_18fpy_435",
	sectionCollapsed: "_sectionCollapsed_18fpy_449",
	sectionLabel: "_sectionLabel_18fpy_457",
	sectionRule: "_sectionRule_18fpy_475",
	footer: "_footer_18fpy_489",
	footerCollapsed: "_footerCollapsed_18fpy_503",
	userRow: "_userRow_18fpy_519",
	userRowCollapsed: "_userRowCollapsed_18fpy_533",
	brandAvatar: "_brandAvatar_18fpy_545",
	logoutButton: "_logoutButton_18fpy_559",
	userInfo: "_userInfo_18fpy_617",
	userName: "_userName_18fpy_633",
	userRole: "_userRole_18fpy_651",
	mobileOpen: "_mobileOpen_18fpy_681",
	logoPlaceholder: "_logoPlaceholder_18fpy_707",
	logoPulse: "_logoPulse_18fpy_1"
}, lT = n({ isCollapsed: !1 });
function uT() {
	return o(lT);
}
//#endregion
//#region src/components/SideBar/index.tsx
function dT(e) {
	let t = e.trim().split(/\s+/);
	return t.length === 1 ? t[0].substring(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
}
function fT({ icon: e, label: t, active: n, badge: r, href: i, externo: a, className: s, ...c }) {
	let { isCollapsed: l } = o(lT), u = /* @__PURE__ */ m(i ? "a" : "button", {
		href: i,
		className: S($.item, n && $.itemActive, l ? $.itemCollapsed : $.itemExpanded, s),
		"aria-current": n ? "page" : void 0,
		...c,
		children: [
			/* @__PURE__ */ m("span", {
				className: $.iconWrap,
				children: [/* @__PURE__ */ p(e, { size: 20 }), l && r != null && r !== 0 && /* @__PURE__ */ p("span", {
					className: $.badgeDot,
					"aria-hidden": "true"
				})]
			}),
			/* @__PURE__ */ p("span", {
				className: S($.itemLabel, l && $.labelHidden),
				children: t
			}),
			!l && r != null && r !== 0 && /* @__PURE__ */ p("span", {
				className: $.badge,
				children: r
			}),
			!l && a && /* @__PURE__ */ p(ee, {
				size: 13,
				className: $.externo,
				"aria-label": "abre outro sistema"
			})
		]
	});
	return l ? /* @__PURE__ */ p(Iv, {
		delayDuration: 150,
		children: /* @__PURE__ */ m(Lv, { children: [/* @__PURE__ */ p(Rv, {
			asChild: !0,
			children: u
		}), /* @__PURE__ */ p(zv, {
			side: "right",
			children: t
		})] })
	}) : u;
}
function pT({ label: e }) {
	let { isCollapsed: t } = o(lT);
	return /* @__PURE__ */ m("div", {
		className: S($.section, t && $.sectionCollapsed),
		children: [!t && /* @__PURE__ */ p("span", {
			className: $.sectionLabel,
			children: e
		}), /* @__PURE__ */ p("span", { className: $.sectionRule })]
	});
}
function mT({ isCollapsed: e, onToggle: t, isOpenMobile: n, onCloseMobile: r, logo: i, children: a, userName: o = "Usuário", userRole: s = "Colaborador", userAvatarUrl: c, onLogout: l, className: u, ...d }) {
	return /* @__PURE__ */ m(f, { children: [n && /* @__PURE__ */ p("div", {
		className: $.overlay,
		onClick: r
	}), /* @__PURE__ */ m("aside", {
		className: S($.sidebar, e ? $.collapsed : $.expanded, n && $.mobileOpen, u),
		...d,
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
					children: p(e ? le : V, { size: 15 })
				})]
			}),
			/* @__PURE__ */ p(lT.Provider, {
				value: { isCollapsed: e },
				children: /* @__PURE__ */ p("nav", {
					className: $.nav,
					"aria-label": "Principal",
					children: a
				})
			}),
			/* @__PURE__ */ p("div", {
				className: S($.footer, e && $.footerCollapsed),
				children: /* @__PURE__ */ m("div", {
					className: S($.userRow, e && $.userRowCollapsed),
					children: [
						/* @__PURE__ */ p(N, {
							src: c,
							initials: dT(o),
							size: e ? "sm" : "md",
							className: $.brandAvatar
						}),
						!e && /* @__PURE__ */ m("div", {
							className: $.userInfo,
							children: [/* @__PURE__ */ p("span", {
								className: $.userName,
								children: o
							}), /* @__PURE__ */ p("span", {
								className: $.userRole,
								children: s
							})]
						}),
						l && /* @__PURE__ */ p(Iv, {
							delayDuration: 150,
							children: /* @__PURE__ */ m(Lv, { children: [/* @__PURE__ */ p(Rv, {
								asChild: !0,
								children: /* @__PURE__ */ p("button", {
									className: $.logoutButton,
									onClick: l,
									"aria-label": "Sair do Sistema",
									children: /* @__PURE__ */ p(Ee, { size: 16 })
								})
							}), /* @__PURE__ */ p(zv, {
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
var hT = {
	header: "_header_u5732_1",
	buttonGroup: "_buttonGroup_u5732_43",
	contextArea: "_contextArea_u5732_53",
	mobileOnly: "_mobileOnly_u5732_75",
	desktopOnly: "_desktopOnly_u5732_83"
};
//#endregion
//#region src/components/TopBar/index.tsx
function gT({ onToggleMobile: e, className: t, children: n, ...r }) {
	return /* @__PURE__ */ m("header", {
		className: S(hT.header, t),
		...r,
		children: [/* @__PURE__ */ p("div", {
			className: hT.buttonGroup,
			children: /* @__PURE__ */ p(Je, {
				variant: "ghost",
				intent: "secundaria",
				className: S(hT.mobileOnly),
				onClick: e,
				"aria-label": "Abrir menu",
				children: /* @__PURE__ */ p(De, { size: 20 })
			})
		}), /* @__PURE__ */ p("div", {
			className: hT.contextArea,
			children: n
		})]
	});
}
//#endregion
//#region src/components/NavegacaoSistemas/modulos.ts
var _T = [
	{
		codigo: "consolidador",
		nome: "Consolidador",
		descricao: "Posição e rentabilidade das carteiras",
		url: "https://consolidador-front.pages.dev",
		icone: oe,
		principais: [
			{
				label: "Dashboard",
				path: "/dashboard",
				icone: Ce
			},
			{
				label: "Cliente",
				path: "/cliente",
				icone: Re
			},
			{
				label: "Alertas",
				path: "/alertas",
				icone: ne
			},
			{
				label: "Tarefas",
				path: "/tarefas",
				icone: we
			}
		]
	},
	{
		codigo: "hub",
		nome: "HUB Avere",
		descricao: "Cadastro de clientes e consultores",
		url: "https://hub-avere.pages.dev",
		icone: _e,
		principais: [
			{
				label: "Clientes",
				path: "/clientes",
				icone: ze
			},
			{
				label: "Equipe",
				path: "/equipe",
				icone: Le
			},
			{
				label: "Pendências",
				path: "/pendencias",
				icone: te
			}
		]
	},
	{
		codigo: "financeiro",
		nome: "Financeiro",
		descricao: "Lançamentos, DRE e fluxo de caixa",
		url: "https://financeiro-avere.pages.dev",
		icone: Be,
		principais: [
			{
				label: "Dashboard",
				path: "/dashboard",
				icone: Ce
			},
			{
				label: "DRE",
				path: "/dre",
				icone: Pe
			},
			{
				label: "Lançamentos",
				path: "/lancamentos",
				icone: re
			},
			{
				label: "Conciliação",
				path: "/conciliacao",
				icone: Se
			}
		]
	}
], vT = {
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
function yT({ atual: e, compacto: t }) {
	let n = _T.find((t) => t.codigo === e);
	return n ? /* @__PURE__ */ m("div", {
		className: S(vT.ambiente, t && vT.ambienteCompacto),
		title: t ? `Avere · ${n.nome}` : void 0,
		children: [/* @__PURE__ */ p("span", {
			className: vT.ambienteIcone,
			children: /* @__PURE__ */ p(n.icone, {
				size: 18,
				"aria-hidden": "true"
			})
		}), !t && /* @__PURE__ */ m("span", {
			className: vT.ambienteTextos,
			children: [/* @__PURE__ */ p("small", { children: "Avere" }), /* @__PURE__ */ p("b", { children: n.nome })]
		})]
	}) : null;
}
var bT = "avere-ui:sistemas-abertos";
function xT() {
	try {
		return JSON.parse(localStorage.getItem(bT) ?? "[]");
	} catch {
		return [];
	}
}
function ST({ atual: e, sistemas: t }) {
	let { isCollapsed: n } = uT(), r = _T.filter((n) => n.codigo !== e && (!t || t.includes(n.codigo))), [i, a] = d(xT);
	if (s(() => {
		try {
			localStorage.setItem(bT, JSON.stringify(i));
		} catch {}
	}, [i]), r.length === 0) return null;
	let o = (e) => a((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	return /* @__PURE__ */ m("div", {
		className: vT.outros,
		role: "group",
		"aria-label": "Outros sistemas Avere",
		children: [/* @__PURE__ */ p("span", {
			className: vT.divisor,
			"aria-hidden": "true"
		}), r.map((e) => {
			let t = (t) => e.url + t;
			if (n) return /* @__PURE__ */ p(fT, {
				icon: e.icone,
				label: e.nome,
				href: t(e.principais[0]?.path ?? "/"),
				externo: !0
			}, e.codigo);
			let r = i.includes(e.codigo);
			return /* @__PURE__ */ m("div", {
				className: vT.bloco,
				children: [/* @__PURE__ */ m("button", {
					type: "button",
					className: vT.blocoCabecalho,
					onClick: () => o(e.codigo),
					"aria-expanded": r,
					children: [
						/* @__PURE__ */ p(e.icone, {
							size: 16,
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ p("span", { children: e.nome }),
						/* @__PURE__ */ p(ce, {
							size: 14,
							className: S(vT.chevron, r && vT.chevronAberto),
							"aria-hidden": "true"
						})
					]
				}), r && e.principais.map((n) => /* @__PURE__ */ p(fT, {
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
export { N as Avatar, j as Badge, EC as BotaoMesVigente, zw as BuscaRapida, Je as Button, q_ as Calendar, jC as CampoData, rT as Card, sT as CardContent, oT as CardDescription, cT as CardFooter, iT as CardHeader, aT as CardTitle, $e as Checkbox, Xc as Combobox, Op as DataTable, J_ as DatePicker, yb as Drawer, Eb as DrawerBody, Sb as DrawerClose, wb as DrawerContent, kb as DrawerDescription, Db as DrawerFooter, Tb as DrawerHeader, Cb as DrawerOverlay, xb as DrawerPortal, Ab as DrawerSeparator, Ob as DrawerTitle, bb as DrawerTrigger, fp as DropdownMenu, Sp as DropdownMenuCheckboxItem, bp as DropdownMenuContent, mp as DropdownMenuGroup, xp as DropdownMenuItem, wp as DropdownMenuLabel, hp as DropdownMenuPortal, _p as DropdownMenuRadioGroup, Cp as DropdownMenuRadioItem, Tp as DropdownMenuSeparator, Ep as DropdownMenuShortcut, gp as DropdownMenuSub, yp as DropdownMenuSubContent, vp as DropdownMenuSubTrigger, pp as DropdownMenuTrigger, Qc as FileUpload, wC as FiltroLista, Ou as HierarchicalCombobox, yT as IndicadorAmbiente, MC as InputDataInline, tT as MESES_CURTOS, _T as MODULOS_AVERE, SC as MarcadorProblemas, cb as Modal, db as ModalClose, pb as ModalContent, _b as ModalDescription, hb as ModalFooter, mb as ModalHeader, fb as ModalOverlay, ub as ModalPortal, gb as ModalTitle, lb as ModalTrigger, Fr as MultiSelect, ST as OutrosSistemas, W_ as Popover, K_ as PopoverContent, G_ as PopoverTrigger, On as RadioGroup, kn as RadioItem, jb as Segmentado, X_ as Select, TC as SelectMulti, DC as SeletorMes, mT as SideBar, fT as SideBarItem, pT as SideBarSection, Ge as Skeleton, vr as Slider, We as Spinner, Nr as Switch, Au as TagInput, Ze as TextField, vy as Toaster, Lv as Tooltip, zv as TooltipContent, Iv as TooltipProvider, Rv as TooltipTrigger, gT as TopBar, O as Typography, A as badgeVariants, qe as buttonVariants, S as cn, Gw as colunaDoEvento, eT as displayMoeda, Jw as formatBRL, Zw as formatCompacto, Qw as formatData, Yw as formatValor, Xe as inputVariants, $w as parseMoedaDigitada, ty as toast, D as typographyVariants, Ww as useAbrirComboboxNoTab, Bw as useAlturaDisponivel, Uw as useEdicaoInline, uT as useSideBar };
