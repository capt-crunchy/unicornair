"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import "@/styles/leaflet.css";
import L from "leaflet";
import { TileLayer } from "react-leaflet";

const MapContainer = dynamic(
  async () => (await import("react-leaflet")).MapContainer,
  { ssr: false }
);

export default function RadarMap() {
  return (
    <div className="p-4">
      <MapContainer
        center={[47.629, -122.350] as L.LatLngExpression}
        zoom={6}
        className="h-[80vh] w-full rounded-lg border border-purple-700/40"
        style={{ background: "#000" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
}
