"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import "@/styles/leaflet.css";

import L from "leaflet";

// Load rotated marker only in browser
if (typeof window !== "undefined") {
  require("leaflet-rotatedmarker");
}

import { TileLayer, Marker, Popup } from "react-leaflet";

interface Aircraft {
  callsign: string;
  lat: number;
  lon: number;
  alt: number;
  gs: number;
  hdg: number;
}

// ✅ Safe icon (test icon) — *do not change until we see it working*
const planeIcon = new L.Icon({
  iconUrl: "/plane.png",
  iconSize: [48, 48],       // adjust icon size here
  iconAnchor: [24, 24],     // ensures rotation center is the middle
  className: "plane-icon"
});

export default function RadarMap() {
  const [planes, setPlanes] = useState<Record<string, Aircraft>>({});

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/position");
        const json = await res.json();
        console.log("Planes:", json);
        setPlanes(json);
      } catch (e) {
        console.error("Radar fetch error", e);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <MapContainer
        center={[47.629, -122.350] as L.LatLngExpression}
        zoom={6}
        className="h-[80vh] w-full rounded-lg border border-purple-700/40"
        style={{ background: "#000" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* ✅ DRAW PLANES */}
        {Object.values(planes).map((ac) => (
          <Marker
            key={ac.callsign}
            position={[ac.lat, ac.lon] as L.LatLngExpression}
            icon={planeIcon}
          >
            <Popup>
              <b>{ac.callsign}</b><br />
              Alt: {Math.round(ac.alt)} ft<br />
              GS: {Math.round(ac.gs)} kts<br />
              HDG: {Math.round(ac.hdg)}°
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
