var webAudioPeakMeter = (function (e) {
    "use strict";
    var t = {
        log: function (...e) {},
        dbFromFloat: function (e) {
            return 20 * ((t = 10), (n = e), Math.log(n) / Math.log(t));
            var t, n;
        },
        findAudioProcBufferSize: function (e) {
            return [256, 512, 1024, 2048, 4096, 8192, 16384].reduce((t, n) => (Math.abs(n - e) < Math.abs(t - e) ? n : t));
        },
    };
    function n(e, n, r) {
        const a = -1 * n,
            o = Math.floor((t.dbFromFloat(e) * r) / a);
        return o > r ? r : o < 0 ? 0 : o;
    }
    var r = {
        audioClipPath: function (e, t, n) {
            let r = Math.floor((-100 * e) / t);
            return r > 100 && (r = 100), r < 0 && (r = 0), n ? `inset(${r}% 0 0)` : `inset(0 ${r}% 0 0)`;
        },
        createContainerDiv: function (e, t) {
            const { clientWidth: n, clientHeight: r } = e,
                { backgroundColor: a } = t,
                o = document.createElement("div");
            return (o.style.position = "relative"), (o.style.width = `${n}px`), (o.style.height = `${r}px`), (o.style.backgroundColor = a), e.appendChild(o), o;
        },
        createTicks: function (e, t) {
            const { clientWidth: n, clientHeight: r } = e,
                { dbRange: a, dbTickSize: o, fontSize: l, borderSize: i, tickColor: s } = t,
                c = Math.floor(a / o),
                f = Array.from(Array(c).keys()).map((t) => {
                    const n = document.createElement("div");
                    return e.appendChild(n), (n.style.position = "absolute"), (n.style.color = s), (n.style.textAlign = "right"), (n.style.fontSize = `${l}px`), (n.textContent = "-" + o * t), n;
                }),
                h = r > n;
            if (h) {
                const e = 2 * l,
                    t = 1.5 * l + i,
                    a = l + i,
                    o = r - t - i,
                    s = n - e - i,
                    d = o / c;
                return (
                    f.forEach((t, n) => {
                        (t.style.width = `${e}px`), (t.style.top = `${d * n + a}px`);
                    }),
                    { vertical: h, tickWidth: e, meterHeight: o, meterWidth: s, meterTop: t }
                );
            }
            const d = 1.5 * l,
                u = r - d - 2 * i,
                p = 3 * l,
                y = n - p - 2 * i,
                g = y / c;
            return (
                f.forEach((e, t) => {
                    (e.style.width = `${p}px`), (e.style.bottom = `${i}px`), (e.style.right = `${g * t + p}px`);
                }),
                { vertical: h, tickWidth: d, meterHeight: u, meterWidth: y, meterTop: p }
            );
        },
        createBars: function (e, t, n) {
            const { gradient: r, borderSize: a } = t,
                { channelCount: o, vertical: l, meterWidth: i, meterHeight: s, meterTop: c, tickWidth: f } = n,
                h = Array.from(Array(o).keys()).map(() => {
                    const t = document.createElement("div");
                    return e.appendChild(t), (t.style.position = "absolute"), t;
                });
            if (l) {
                const e = i / o - a,
                    t = `linear-gradient(to bottom, ${r.join(", ")})`;
                h.forEach((n, r) => {
                    (n.style.height = `${s}px`), (n.style.width = `${e}px`), (n.style.backgroundImage = t), (n.style.top = `${c}px`), (n.style.left = `${(e + a) * r + f + a}px`);
                });
            } else {
                const e = s / o - a,
                    t = `linear-gradient(to left, ${r.join(", ")})`;
                h.forEach((n, r) => {
                    (n.style.height = `${e}px`), (n.style.width = `${i}px`), (n.style.backgroundImage = t), (n.style.top = `${(e + a) * r + a}px`), (n.style.right = `${c}px`);
                });
            }
            return h;
        },
        createMasks: function (e, t, n) {
            const { backgroundColor: r, borderSize: a, maskTransition: o } = t,
                { channelCount: l, vertical: i, meterWidth: s, meterHeight: c, meterTop: f, tickWidth: h } = n,
                d = Array.from(Array(l).keys()).map(() => {
                    const t = document.createElement("div");
                    return e.appendChild(t), (t.style.position = "absolute"), (t.style.backgroundColor = r), t;
                });
            if (i) {
                const e = s / l - a;
                d.forEach((t, n) => {
                    (t.style.height = `${c}px`), (t.style.width = `${e}px`), (t.style.top = `${f}px`), (t.style.left = `${(e + a) * n + h + a}px`), (t.style.transition = `height ${o}`);
                });
            } else {
                const e = c / l - a;
                d.forEach((t, n) => {
                    (t.style.height = `${e}px`), (t.style.width = `${s}px`), (t.style.top = `${(e + a) * n + a}px`), (t.style.right = `${f}px`), (t.style.transition = `width ${o}`);
                });
            }
            return d;
        },
        createPeakLabels: function (e, t, n) {
            const { borderSize: r, labelColor: a, fontSize: o } = t,
                { channelCount: l, vertical: i, meterWidth: s, meterHeight: c, tickWidth: f } = n,
                h = Array.from(Array(l).keys()).map(() => {
                    const t = document.createElement("div");
                    return e.appendChild(t), (t.style.textAlign = "center"), (t.style.color = a), (t.style.fontSize = `${o}px`), (t.style.position = "absolute"), (t.textContent = "-???"), t;
                });
            if (i) {
                const e = s / l;
                h.forEach((t, n) => {
                    (t.style.width = `${e}px`), (t.style.top = `${r}px`), (t.style.left = `${e * n + f}px`);
                });
            } else {
                const e = c / l;
                h.forEach((t, n) => {
                    (t.style.width = 2 * o + "px"), (t.style.right = `${r}px`), (t.style.top = `${e * n + f}px`);
                });
            }
            return h;
        },
        maskSize: n,
        paintMeter: function e(r, a) {
            const { dbRange: o } = r,
                { tempPeaks: l, heldPeaks: i, channelMasks: s, textLabels: c, meterHeight: f, meterWidth: h, vertical: d } = a,
                u = d ? f : h;
            s.forEach((e, t) => {
                const r = n(l[t], o, u);
                d ? (e.style.height = `${r}px`) : (e.style.width = `${r}px`);
            }),
                c.forEach((e, n) => {
                    if (0 === i[n]) e.textContent = "-???";
                    else {
                        const r = t.dbFromFloat(i[n]);
                        e.textContent = r.toFixed(1);
                    }
                }),
                window.requestAnimationFrame(() => e(r, a));
        },
    };
    var a = {
        calculateMaxValues: function (e) {
            const t = [],
                { numberOfChannels: n } = e;
            for (let r = 0; r < n; r += 1) {
                t[r] = 0;
                const n = e.getChannelData(r);
                for (let e = 0; e < n.length; e += 1) Math.abs(n[e]) > t[r] && (t[r] = Math.abs(n[e]));
            }
            return t;
        },
    };
    function o(e, t) {
        const n = [],
            r = 1 / (4 * t),
            a = Math.floor((e - 1) / 2);
        for (let o = -a; o <= a; o += 1) {
            const a = 0.54 + 0.46 * Math.cos((2 * Math.PI * o) / e);
            let l = 0;
            (l = 0 === o ? 2 * r : Math.sin(2 * Math.PI * r * o) / (Math.PI * o)), (l = a * l * t), n.push(l);
        }
        return n;
    }
    function l(e, t) {
        const { lpfBuffer: n, lpfCoefficients: r, upsampleFactor: a } = t,
            o = [];
        n.push(e), n.length >= r.length && n.shift();
        for (let e = 0; e < a; e += 1) {
            let t = 0,
                l = 0;
            for (let o = e; o < r.length; o += a) (l += r[o] * n[n.length - 1 - t]), (t += 1);
            o.push(l);
        }
        return o;
    }
    function i(e, n, r) {
        let a = [];
        r.lpfCoefficients.length <= 0 &&
            (t.log(`Initialing filter components for ITU-R BS.1770, fs: ${n}`),
            n >= 96e3 && (r.upsampleFactor = 2),
            (r.lpfCoefficients = o(33, r.upsampleFactor)),
            (r.lpfBuffer = new Array(r.lpfCoefficients.length).fill(0)),
            t.log(`Initialized lpfCoefficients lpfCoefficients=[${r.lpfCoefficients.join(",")}], and lpfBuffer: [${r.lpfBuffer.join(",")}]`));
        for (let t = 0; t < e.length; t += 1) {
            const n = l(e[t], r);
            a = a.concat(n);
        }
        return a;
    }
    var s = {
        findAudioProcBufferSize: function (e) {
            return [256, 512, 1024, 2048, 4096, 8192, 16384].reduce((t, n) => (Math.abs(n - e) < Math.abs(t - e) ? n : t));
        },
        calculateLPFCoefficients: o,
        filterSample: l,
        audioOverSampleAndFilter: i,
        calculateTPValues: function (e, n) {
            const { lastChannelTP: r, channelCount: a } = n,
                { sampleRate: o } = e;
            if (r.length <= 0) {
                t.log(`Initialing TP values for ${a}channels`), (n.lastChannelTP = new Array(a).fill(0));
                const e = Math.pow(10, -2),
                    r = 1.7;
                (n.decayFactor = Math.pow(e, 1 / (o * r))), t.log(`Initialized with decayFactor ${n.decayFactor}`);
            }
            for (let t = 0; t < a; t += 1) {
                const a = i(e.getChannelData(t), o, n);
                for (let e = 0; e < a.length; e += 1) (r[t] *= n.decayFactor), Math.abs(a[e]) > r[t] && (r[t] = Math.abs(a[e]));
            }
            return r;
        },
    };
    const c = {
        borderSize: 2,
        fontSize: 9,
        backgroundColor: "black",
        tickColor: "#ddd",
        labelColor: "#ddd",
        gradient: ["red 1%", "#ff0 16%", "lime 45%", "#080 100%"],
        dbRange: 48,
        dbTickSize: 6,
        maskTransition: "0.1s",
        audioMeterStandard: "peak-sample",
        refreshEveryApproxMs: 20,
    };
    var f = {
            createMeterNode: function (e, n, r = {}) {
                const a = Object.assign({}, c, r),
                    { refreshEveryApproxMs: o } = a,
                    { channelCount: l, sampleRate: i } = e,
                    s = (o / 1e3) * i * l,
                    f = t.findAudioProcBufferSize(s),
                    h = n.createScriptProcessor(f, l, l);
                return e.connect(h).connect(n.destination), h;
            },
            createMeter: function (e, t, n = {}) {
                const o = Object.assign({}, c, n),
                    l = r.createContainerDiv(e, o),
                    i = r.createTicks(l, o),
                    { channelCount: f } = t;
                (i.tempPeaks = new Array(f).fill(0)),
                    (i.heldPeaks = new Array(f).fill(0)),
                    (i.channelCount = f),
                    (i.channelBars = r.createBars(l, o, i)),
                    (i.channelMasks = r.createMasks(l, o, i)),
                    (i.textLabels = r.createPeakLabels(l, o, i)),
                    "true-peak" === o.audioMeterStandard && ((i.lpfCoefficients = []), (i.lpfBuffer = []), (i.upsampleFactor = 4), (i.lastChannelTP = []), (i.decayFactor = 0.99999)),
                    (t.onaudioprocess = (e) =>
                        (function (e, t, n) {
                            const { inputBuffer: r } = e,
                                { audioMeterStandard: o } = t;
                            let l = [];
                            l = "true-peak" === o ? s.calculateTPValues(r, n) : a.calculateMaxValues(r);
                            for (let e = 0; e < l.length; e += 1) (n.tempPeaks[e] = l[e]), l[e] > n.heldPeaks[e] && (n.heldPeaks[e] = l[e]);
                        })(e, o, i)),
                    l.addEventListener(
                        "click",
                        () => {
                            i.heldPeaks.fill(0);
                        },
                        !1
                    ),
                    r.paintMeter(o, i);
            },
        },
        h = f.createMeterNode,
        d = f.createMeter;
    return (e.createMeter = d), (e.createMeterNode = h), (e.default = f), Object.defineProperty(e, "__esModule", { value: !0 }), e;
})({});
