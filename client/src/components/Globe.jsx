import { useEffect, useRef } from 'react';
import geo from '@/data/geo.json';

const D = Math.PI / 180;
const TILT = 0.21;
const ll = (la, lo) => { la *= D; lo *= D; return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)]; };
const pack = (k) => (a) => { const o = []; for (let i = 0; i < a.length; i += 2) o.push(ll(a[i + 1] / k, a[i] / k)); return o; };
const LAND = geo.WORLD.map(pack(10));
const PHL = geo.PH.map(pack(100));
const HUBS = [['Singapore', 1.35, 103.8], ['Hong Kong', 22.3, 114.2], ['Tokyo', 35.7, 139.7], ['Sydney', -33.9, 151.2], ['Dubai', 25.2, 55.3]].map(([n, la, lo]) => ({ n, p: ll(la, lo) }));
const arc = (a, b, k, l) => {
  const d = Math.acos(Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]))), n = Math.sin(d);
  const A = Math.sin((1 - k) * d) / n, B = Math.sin(k * d) / n, L = 1 + l * Math.sin(Math.PI * k);
  return [(A * a[0] + B * b[0]) * L, (A * a[1] + B * b[1]) * L, (A * a[2] + B * b[2]) * L];
};
const GRID = [];
for (let la = -60; la <= 60; la += 30) { const l = []; for (let lo = 0; lo <= 360; lo += 6) l.push(ll(la, lo)); GRID.push(l); }
for (let lo = 0; lo < 360; lo += 30) { const l = []; for (let la = -84; la <= 84; la += 6) l.push(ll(la, lo)); GRID.push(l); }

const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const lite = typeof navigator !== 'undefined' && ((navigator.connection && navigator.connection.saveData) || (navigator.deviceMemory && navigator.deviceMemory < 2));

export default function Globe({ locations }) {
  const ref = useRef(null);
  const st = useRef({ rot: 2.11, sw: 0, swp: 0, drag: false, lx: 0, onscreen: true, paused: reduce || lite, dirty: true });

  useEffect(() => {
    const cv = ref.current, cx = cv.getContext('2d'), s = st.current;
    const BR = locations.map((l) => ({ n: l.name, p: ll(l.lat, l.lng) }));
    const oi = Math.max(0, locations.findIndex((l) => l.name === 'Taguig')), O = BR[oi]?.p;
    const nDom = Math.max(0, BR.length - 1);
    const ROUTES = !O ? [] : BR.filter((_, i) => i !== oi).map((b) => [O, b.p, 0.05]).concat(HUBS.map((h) => [O, h.p, 0.16]))
      .map((r) => { const pts = []; for (let k = 0; k <= 30; k++) pts.push(arc(r[0], r[1], k / 30, r[2])); return pts; });
    let W = 0, c, sn, ct, tS, raf;
    const pj = (p) => { const x = p[0] * c - p[2] * sn, z = p[0] * sn + p[2] * c; return [x, p[1] * ct - z * tS, p[1] * tS + z * ct]; };
    const size = () => { const d = Math.min(devicePixelRatio || 1, 2); W = cv.clientWidth; cv.width = cv.height = W * d; cx.setTransform(d, 0, 0, d, 0, 0); s.dirty = true; };

    function draw(t) {
      c = Math.cos(s.rot); sn = Math.sin(s.rot); ct = Math.cos(TILT); tS = Math.sin(TILT);
      cx.clearRect(0, 0, W, W);
      const R = W * 0.42, o = W / 2, X = (q) => o + q[0] * R, Y = (q) => o - q[1] * R;
      cx.save(); cx.beginPath(); cx.arc(o, o, R, 0, 7); cx.clip();
      const g = cx.createRadialGradient(o - R * 0.3, o - R * 0.35, R * 0.1, o, o, R * 1.1);
      g.addColorStop(0, '#D8F3F3'); g.addColorStop(0.58, '#A8D5E2'); g.addColorStop(1, '#72A9D0'); cx.fillStyle = g; cx.fillRect(0, 0, W, W);
      const trace = (pts) => { let on = false; pts.forEach((p) => { const q = pj(p); if (q[2] > 0) { on ? cx.lineTo(X(q), Y(q)) : cx.moveTo(X(q), Y(q)); on = true; } else on = false; }); };
      cx.strokeStyle = 'rgba(26,53,148,.16)'; cx.lineWidth = 1;
      GRID.forEach((l) => { cx.beginPath(); trace(l); cx.stroke(); });
      const ring = (r) => {
        let any = false; const P = r.map((p) => { const q = pj(p); if (q[2] > 0) any = true; return q; });
        if (!any) return false; cx.beginPath();
        P.forEach((q, i) => { let x = q[0], y = q[1]; if (q[2] < 0) { const m = Math.hypot(x, y) || 1; x /= m; y /= m; } i ? cx.lineTo(o + x * R, o - y * R) : cx.moveTo(o + x * R, o - y * R); });
        cx.closePath(); return true;
      };
      cx.fillStyle = '#E7F0D8'; cx.strokeStyle = '#8FB7A0'; cx.lineWidth = 0.9;
      LAND.forEach((r) => { if (ring(r)) { cx.fill(); cx.stroke(); } });
      cx.shadowColor = 'rgba(35,80,208,.9)'; cx.shadowBlur = 14; cx.fillStyle = '#1A3594'; cx.strokeStyle = '#1A3594'; cx.lineWidth = 1;
      PHL.forEach((r) => { if (ring(r)) { cx.fill(); cx.stroke(); } }); cx.shadowBlur = 0;
      const cp = pj(ll(12, 122)), ph = (t * 1.6) % 1;
      if (cp[2] > 0.1) { cx.strokeStyle = `rgba(26,53,148,${0.55 * (1 - ph)})`; cx.lineWidth = 2; cx.beginPath(); cx.arc(X(cp), Y(cp), 22 + ph * 26, 0, 7); cx.stroke(); }
      ROUTES.forEach((pts, i) => {
        cx.strokeStyle = i < nDom ? 'rgba(255,255,255,.9)' : 'rgba(26,53,148,.7)'; cx.lineWidth = i < nDom ? 1.4 : 1.2;
        cx.beginPath(); trace(pts); cx.stroke();
        const q = pj(pts[Math.floor(((t * 0.35 + i * 0.13) % 1) * 30)]);
        if (q[2] > 0) { cx.fillStyle = '#0F1F5C'; cx.beginPath(); cx.arc(X(q), Y(q), 2.4, 0, 7); cx.fill(); }
      });
      cx.restore();
      cx.strokeStyle = 'rgba(26,53,148,.6)'; cx.lineWidth = 1.5; cx.beginPath(); cx.arc(o, o, R + 1, 0, 7); cx.stroke();
      HUBS.forEach((h) => {
        const q = pj(h.p);
        if (q[2] > 0.25) {
          cx.fillStyle = '#1A3594'; cx.strokeStyle = '#fff'; cx.lineWidth = 2; cx.beginPath(); cx.arc(X(q), Y(q), 4, 0, 7); cx.fill(); cx.stroke();
          cx.fillStyle = '#0F1F5C'; cx.font = '500 12px Outfit,sans-serif'; cx.fillText(h.n, X(q) + 9, Y(q) - 7);
        }
      });
      BR.forEach((b, i) => {
        const q = pj(b.p);
        if (q[2] > 0.05) {
          const f = (t * 1.6 + i * 0.37) % 1;
          cx.strokeStyle = `rgba(72,162,42,${0.75 * (1 - f)})`; cx.lineWidth = 1.5; cx.beginPath(); cx.arc(X(q), Y(q), 3 + f * 9, 0, 7); cx.stroke();
          cx.fillStyle = '#48A22A'; cx.strokeStyle = '#fff'; cx.lineWidth = 1.8; cx.beginPath(); cx.arc(X(q), Y(q), 3.4, 0, 7); cx.fill(); cx.stroke();
        }
      });
      if (cp[2] > 0.35) {
        const lab = BR.length ? `Philippines: ${BR.length} coverage areas` : 'Philippines';
        cx.font = '500 13px Outfit,sans-serif';
        const w2 = cx.measureText(lab).width + 20, px = X(cp), py = Y(cp), right = px < o, bx = right ? px + 34 : px - 34 - w2, by = py - 64;
        cx.strokeStyle = '#0F1F5C'; cx.lineWidth = 1; cx.beginPath(); cx.moveTo(px, py - 18); cx.lineTo(right ? bx : bx + w2, by + 13); cx.stroke();
        cx.fillStyle = '#0F1F5C'; cx.fillRect(bx, by, w2, 26); cx.fillStyle = '#fff'; cx.fillText(lab, bx + 10, by + 18);
      }
    }

    const loop = () => {
      if (!s.paused && s.onscreen && !s.drag) { s.sw += 0.01; const cu = 0.6 * Math.sin(s.sw * 0.5); s.rot += cu - s.swp; s.swp = cu; s.dirty = true; }
      if (s.dirty) { draw(s.sw); s.dirty = false; }
      raf = requestAnimationFrame(loop);
    };
    const ro = new ResizeObserver(size); ro.observe(cv);
    const io = new IntersectionObserver(([e]) => (s.onscreen = e.isIntersecting)); io.observe(cv);
    size(); raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, [locations]);

  const s = st.current;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px] animate-globein md:max-w-[620px] lg:max-w-[min(84vw,920px)]">
      <canvas
        ref={ref}
        tabIndex={0}
        role="img"
        aria-label={`Interactive globe with the Philippines highlighted and Arrowgo's ${locations.length || ''} coverage areas connected by routes. Use the left and right arrow keys to rotate.`}
        className="block h-full w-full cursor-grab touch-pan-y rounded-full shadow-[0_40px_70px_-30px_rgba(26,53,148,.4)] active:cursor-grabbing"
        onPointerDown={(e) => { s.drag = true; s.lx = e.clientX; e.currentTarget.setPointerCapture(e.pointerId); }}
        onPointerMove={(e) => { if (s.drag) { s.rot += (e.clientX - s.lx) * 0.006; s.lx = e.clientX; s.dirty = true; } }}
        onPointerUp={() => (s.drag = false)}
        onKeyDown={(e) => { const k = { ArrowLeft: -0.15, ArrowRight: 0.15 }[e.key]; if (k) { e.preventDefault(); s.rot += k; s.dirty = true; } }}
      />
      <span className="absolute bottom-3.5 left-0 max-w-[26ch] text-[13px] text-mute">Drag or use arrow keys to rotate</span>
    </div>
  );
}