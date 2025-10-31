"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import "@/styles/leaflet.css";
import L from "leaflet";
import { TileLayer, Marker, Popup } from "react-leaflet";

const MapContainer = dynamic(
  () => import("react-leaflet").then(m => m.MapContainer),
  { ssr: false }
);

interface Aircraft {
  callsign: string;
  lat: number;
  lon: number;
  alt: number;
  gs: number;
  hdg: number;
}

// Purple unicorn icon 🎨🦄
const planeIcon = L.icon({
  iconUrl: "https://i.imgur.com/CUZ8eJW.png", // ✅ temp icon (we can replace with your custom one)
  iconSize: [36, 36],
  iconAnchor: [18, 18]
});

export default function RadarMap() {
  const [planes, setPlanes] = useState<Record<string, Aircraft>>({});

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch("/api/position");
      const data = await res.json();
      setPlanes(data);
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
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {Object.values(planes).map((ac: Aircraft) => (
          <Marker
            key={ac.callsign}
            position={[ac.lat, ac.lon] as L.LatLngExpression}
            icon={planeIcon}
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
