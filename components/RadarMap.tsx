"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-rotatedmarker";

// Load react-leaflet only in browser
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((m) => m.Popup),
  { ssr: false }
);

// Aircraft data shape
interface Aircraft {
  callsign: string;
  lat: number;
  lon: number;
  alt: number;
  gs: number;
  hdg: number;
  timestamp: number;
}

// Fix Leaflet default icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/assets/unicorn-plane.png",
  iconUrl: "/assets/unicorn-plane.png",
  shadowUrl: "",
});

// Custom unicorn icon
const planeIcon = L.icon({
  iconUrl: "/assets/unicorn-plane.png",
  iconSize: [48, 48],
  iconAnchor: [24, 24],
});

export default function RadarMap() {
  const [planes, setPlanes] = useState<Record<string, Aircraft>>({});

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/aircraft");
        if (!res.ok) return;
        const data = await res.json();
        setPlanes(data);
      } catch (err) {
        console.error(err);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <MapContainer
        center={[47.629, -122.350] as LatLngExpression}
        zoom={6}
        className="h-[80vh] w-full rounded-lg border border-purple-700/40"
      >
        <TileLayer
          url={`https://tile.jawg.io/jawg-dark/{z}/{x}/{y}.png?access-token=${process.env.NEXT_PUBLIC_JAWG_TOKEN}`}
        />

        {Object.values(planes).map((ac) => (
          <Marker
            key={ac.callsign}
            position={[ac.lat, ac.lon] as LatLngExpression}
            icon={planeIcon}
            rotationAngle={ac.hdg}
            rotationOrigin="center"
          >
            <Popup>
              <b>{ac.callsign}</b>
              <br />
              ALT: {Math.round(ac.alt)} ft
              <br />
              GS: {Math.round(ac.gs)} kts
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
