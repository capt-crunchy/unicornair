"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import L, { Icon, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon paths in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/markers/default-marker-2x.png",
  iconUrl: "/markers/default-marker.png",
  shadowUrl: "/markers/default-shadow.png",
});

// Import rotated marker plugin
import "leaflet-rotatedmarker";

// Load components only client-side
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

interface Aircraft {
  callsign: string;
  lat: number;
  lon: number;
  alt: number;
  gs: number;
  hdg: number;
  timestamp: number;
}

// Your unicorn aircraft icon
const planeIcon = new Icon({
  iconUrl: "/assets/unicorn_plane.png",
  iconSize: [50, 50],
  iconAnchor: [25, 25],
  popupAnchor: [0, -20],
});

export default function RadarMap() {
  const [planes, setPlanes] = useState<Record<string, Aircraft>>({});

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const res = await fetch("/api/aircraft");
        const data = await res.json();
        setPlanes(data);
      } catch (err) {
        console.error("Aircraft fetch failed", err);
      }
    };

    fetchPlanes();
    const interval = setInterval(fetchPlanes, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <MapContainer
        center={[47.629, -122.350]} // Seattle default
        zoom={6}
        className="h-[80vh] w-full rounded-lg border border-purple-700/40"
        style={{ background: "#000" }}
      >
        <TileLayer url="https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=RFrz2mxQ9I9gRuWO4A7E7CP2ys0UXw1FgNVJqE7S0T8i6mz1BTsgDrIxX6ch0Y42" />

        {Object.entries(planes).map(([id, ac]) => (
          <Marker
            key={id}
            position={[ac.lat, ac.lon] as LatLngExpression}
            icon={planeIcon}
            rotationAngle={ac.hdg}
            rotationOrigin="center"
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
