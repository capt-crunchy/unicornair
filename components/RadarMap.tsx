"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import "@/styles/leaflet.css";
import L, { LatLngExpression, Icon } from "leaflet";

// Load rotated marker ONLY in browser
if (typeof window !== "undefined") {
  require("leaflet-rotatedmarker");
}

import { TileLayer, Marker, Popup } from "react-leaflet";

// ✅ Dynamic import for MapContainer (fixes Next.js SSR issues)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

type Aircraft = {
  callsign: string;
  lat: number;
  lon: number;
  alt: number;
  gs: number;
  hdg: number;
  timestamp: number;
};

// ✅ Unicorn icon
const planeIcon = new Icon({
  iconUrl: "/assets/unicorn_plane.png",
  iconSize: [45, 45],
  iconAnchor: [22, 22], // center
  popupAnchor: [0, -20],
});

export default function RadarMap() {
  const [planes, setPlanes] = useState<Record<string, Aircraft>>({});

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/flightpos");
        const data = await res.json();
        setPlanes(data);
      } catch (err) {
        console.error("Radar fetch error", err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <MapContainer
        center={[47.629, -122.350] as LatLngExpression} // Seattle default
        zoom={6}
        className="h-[80vh] w-full rounded-lg border border-purple-700/40"
        style={{ background: "#000" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">Carto</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
        />

        {Object.values(planes).map((ac) => (
       <Marker
        position={[ac.lat, ac.lon] as LatLngExpression}
        icon={planeIcon}
        rotationAngle={ac.hdg}
        >

            <Popup>
              <b>{ac.callsign}</b><br/>
              Alt: {Math.round(ac.alt)} ft<br/>
              GS: {Math.round(ac.gs)} kts<br/>
              HDG: {Math.round(ac.hdg)}°
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
