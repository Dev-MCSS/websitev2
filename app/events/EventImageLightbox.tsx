"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import {
  buildLightboxBlurSrc,
  buildLightboxHighResSrc,
  pickLightboxBreakpointWidth,
} from "./lightboxImage";

const ZOOM_MIN = 1;
const ZOOM_MAX = 4;
const TAP_ZOOM = 2;

/** Fallback aspect before load (width/height). */
const FALLBACK_NATURAL = { w: 4, h: 3 };

export type LightboxItem = {
  publicId: string;
  title: string;
  requestWidth: number;
  previewWidth: number;
  previewHeight: number;
};

type EventImageLightboxProps = {
  item: LightboxItem | null;
  onClose: () => void;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export default function EventImageLightbox({
  item,
  onClose,
}: EventImageLightboxProps) {
  const open = item !== null;
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
  const [highResLoaded, setHighResLoaded] = useState(false);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const panRef = useRef(pan);
  panRef.current = pan;

  const dragRef = useRef({
    active: false,
    pointerId: 0,
    startX: 0,
    startY: 0,
    originPanX: 0,
    originPanY: 0,
    moved: false,
  });

  const naturalForFit = natural ?? {
    w: item?.previewWidth ?? FALLBACK_NATURAL.w,
    h: item?.previewHeight ?? FALLBACK_NATURAL.h,
  };

  const fit = useMemo(() => {
    if (viewport.w <= 0 || viewport.h <= 0) return null;
    const s0 = Math.min(
      viewport.w / naturalForFit.w,
      viewport.h / naturalForFit.h,
    );
    return { w: naturalForFit.w * s0, h: naturalForFit.h * s0 };
  }, [viewport.w, viewport.h, naturalForFit.w, naturalForFit.h]);

  useLayoutEffect(() => {
    if (!open) return;
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setViewport({ w: r.width, h: r.height });
    });
    ro.observe(el);
    const r = el.getBoundingClientRect();
    setViewport({ w: r.width, h: r.height });
    return () => ro.disconnect();
  }, [open]);

  useEffect(() => {
    if (!open) {
      setNatural(null);
      setHighResLoaded(false);
      setScale(1);
      setPan({ x: 0, y: 0 });
      return;
    }
    setNatural(null);
    setHighResLoaded(false);
    setScale(1);
    setPan({ x: 0, y: 0 });
  }, [open, item?.publicId]);

  const clampPan = useCallback(
    (nextScale: number, px: number, py: number) => {
      if (!fit || viewport.w <= 0 || viewport.h <= 0) {
        return { x: 0, y: 0 };
      }
      const sw = fit.w * nextScale;
      const sh = fit.h * nextScale;
      const maxX = Math.max(0, (sw - viewport.w) / 2);
      const maxY = Math.max(0, (sh - viewport.h) / 2);
      return {
        x: clamp(px, -maxX, maxX),
        y: clamp(py, -maxY, maxY),
      };
    },
    [fit, viewport.w, viewport.h],
  );

  const setScaleSafe = useCallback(
    (s: number) => {
      const next = clamp(s, ZOOM_MIN, ZOOM_MAX);
      setScale(next);
      setPan((p) => (next <= 1 ? { x: 0, y: 0 } : clampPan(next, p.x, p.y)));
    },
    [clampPan],
  );

  const fitW = fit?.w ?? 0;
  const fitH = fit?.h ?? 0;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const effectiveRequestWidth = useMemo(() => {
    if (!item) return 1600;
    if (viewport.w <= 0 && viewport.h <= 0) return item.requestWidth;
    const viewportWidth = viewport.w > 0 ? viewport.w : window.innerWidth;
    const viewportHeight = viewport.h > 0 ? viewport.h : window.innerHeight;
    const responsiveWidth = pickLightboxBreakpointWidth(
      viewportWidth,
      viewportHeight,
      window.devicePixelRatio,
    );
    return Math.max(item.requestWidth, responsiveWidth);
  }, [item, viewport.w, viewport.h]);

  const highResSrc = useMemo(() => {
    return buildLightboxHighResSrc(
      cloudName,
      item?.publicId ?? null,
      effectiveRequestWidth,
    );
  }, [cloudName, item?.publicId, effectiveRequestWidth]);

  const blurredPreviewSrc = useMemo(() => {
    return buildLightboxBlurSrc(cloudName, item?.publicId ?? null);
  }, [cloudName, item?.publicId]);

  useEffect(() => {
    if (!open || scale <= 1 || fitW <= 0 || fitH <= 0) return;
    setPan((p) => {
      const next = clampPan(scale, p.x, p.y);
      if (next.x === p.x && next.y === p.y) return p;
      return next;
    });
  }, [open, scale, fitW, fitH, viewport.w, viewport.h, clampPan]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const onPointerDown = (e: React.PointerEvent) => {
    const t = e.currentTarget;
    t.setPointerCapture(e.pointerId);
    dragRef.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originPanX: panRef.current.x,
      originPanY: panRef.current.y,
      moved: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d.active || e.pointerId !== d.pointerId) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (Math.hypot(dx, dy) > 4) d.moved = true;
    if (scale > 1) {
      setPan(clampPan(scale, d.originPanX + dx, d.originPanY + dy));
    }
  };

  const endPointer = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d.active || e.pointerId !== d.pointerId) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    d.active = false;
    if (d.moved || !fit) return;
    if (scale <= 1) {
      const next = Math.min(TAP_ZOOM, ZOOM_MAX);
      setScale(next);
      setPan(clampPan(next, 0, 0));
    }
  };

  if (!open || !item) return null;

  return (
    <div
      className="fixed inset-0 flex flex-col bg-(--palette-neutral-0)"
      style={{ zIndex: "var(--ds-z-fullscreen)" }}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div className="pointer-events-none fixed inset-x-0 top-4 z-10 px-(--ds-container-margin-inline)">
        <div className="relative flex items-start justify-end">
          <div className="pointer-events-none absolute inset-x-16 top-0 flex justify-center px-4">
            <div className="flex min-h-12 max-w-full items-center rounded-lg border border-border bg-(--palette-neutral-0) px-4">
              <p className="ds-text-body-sm truncate font-semibold text-(--palette-neutral-900)">
                {item.title}
              </p>
            </div>
          </div>
          <div className="pointer-events-auto flex items-center gap-2 rounded-lg border border-border bg-(--palette-neutral-0) p-1">
            <button
              type="button"
              className="ds-btn flex size-10 min-h-0! items-center justify-center! p-0!"
              aria-label={scale > 1 ? "Zoom out" : "Zoom in"}
              onClick={() => setScaleSafe(scale > 1 ? ZOOM_MIN : TAP_ZOOM)}
            >
              {scale > 1 ? (
                <ZoomOut size={20} strokeWidth={2} aria-hidden />
              ) : (
                <ZoomIn size={20} strokeWidth={2} aria-hidden />
              )}
            </button>
            <button
              type="button"
              className="ds-btn ds-btn-primary flex size-10 min-h-0! items-center justify-center! border-0! p-0!"
              aria-label="Close preview"
              onClick={onClose}
            >
              <X size={20} strokeWidth={2} aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col pt-20 pb-6">
        <div className="flex min-h-0 flex-1 items-center justify-center px-6">
          <div
            ref={viewportRef}
            className={
              scale > 1
                ? "cursor-grab touch-none active:cursor-grabbing"
                : "cursor-zoom-in touch-manipulation"
            }
            style={{
              width: "min(calc(100vw - 3rem), calc(100vh - 8rem) * 1.35)",
              height: "min(calc(100vh - 8rem), calc(100vw - 3rem) * 0.9)",
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endPointer}
            onPointerCancel={endPointer}
          >
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg">
              {fit ? (
                <div
                  style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
                    transformOrigin: "center center",
                    position: "relative",
                    width: fit.w,
                    height: fit.h,
                  }}
                >
                  {blurredPreviewSrc ? (
                    <img
                      src={blurredPreviewSrc}
                      alt={item.title}
                      draggable={false}
                      className="absolute inset-0 h-full w-full object-contain"
                      style={{
                        filter: "blur(16px)",
                        transform: "scale(1.04)",
                        opacity: highResLoaded ? 0 : 1,
                        transition: "opacity 180ms var(--ds-ease-standard)",
                      }}
                    />
                  ) : null}
                  {highResSrc ? (
                    <img
                      key={`${item.publicId}-${effectiveRequestWidth}`}
                      src={highResSrc}
                      alt={item.title}
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                      draggable={false}
                      className="absolute inset-0 h-full w-full object-contain"
                      style={{
                        opacity: highResLoaded ? 1 : 0,
                        transition: "opacity 180ms var(--ds-ease-standard)",
                      }}
                      onLoad={(e) => {
                        const img = e.currentTarget;
                        if (img.naturalWidth > 0) {
                          setNatural({
                            w: img.naturalWidth,
                            h: img.naturalHeight,
                          });
                          setHighResLoaded(true);
                        }
                      }}
                    />
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
