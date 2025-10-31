"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "@/styles/leaflet.css";


export default function RadarMap() {
  const [planes, setPlanes] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/telemetry");
        const data = await res.json();
        setPlanes(data || []);
      } catch {}
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
<MapContainer
  // Type cast to satisfy React-Leaflet types
  center={[47.629, -122.350] as [number, number]}
  zoom={6}
  className="h-[80vh] w-full rounded-lg border border-purple-700/40"
  style={{ background: "#000" }}
>


      {planes.map((p) => (
        <>
          <CircleMarker
            key={p.id}
            center={[p.lat, p.lon]}
            radius={6}
            color="#a855f7"
            fillColor="#c084fc"
            fillOpacity={0.9}
          />

          {p.trail && (
            <Polyline
              positions={p.trail}
              color="#a855f7"
              weight={2}
              opacity={0.4}
            />
          )}
        </>
      ))}
    </MapContainer>
  );
}
