import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Imagen para compartir en redes (Open Graph y Twitter), generada en el build.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #1e1035 0%, #3b0f6b 55%, #7c3aed 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "linear-gradient(135deg, #8b5cf6, #e879f9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            AC
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, opacity: 0.9 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>Usa ActiveCollab desde Claude</div>
          <div style={{ fontSize: 32, opacity: 0.8, maxWidth: 900 }}>
            Tareas, proyectos, horas y facturas desde el chat, con tu cuenta y tus permisos.
          </div>
        </div>
        <div style={{ display: "flex", gap: 14, fontSize: 24 }}>
          {["Conector MCP", "Gratis", "Código abierto"].map((t) => (
            <div key={t} style={{ padding: "8px 20px", borderRadius: 999, background: "rgba(255,255,255,0.14)" }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
