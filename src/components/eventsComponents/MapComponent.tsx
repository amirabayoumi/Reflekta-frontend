"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import { slugit } from "@/helper";

// Custom plum-colored pin marker
const plumPinIcon = L.divIcon({
  className: "custom-plum-pin",
  html: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
      <path fill="#553a5c" stroke="#fff" stroke-width="1" d="M12 0C5.4 0 0 5.4 0 12c0 7.2 12 24 12 24s12-16.8 12-24c0-6.6-5.4-12-12-12z"/>
      <circle fill="#fff" cx="12" cy="12" r="4"/>
    </svg>
  `,
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [0, -32],
});

// Date formatting utility
const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

interface Event {
  id: string | number;
  title: string;
  location: string;
  startDate: string | number | Date;
  latitude: number;
  longitude: number;
  categories: string[];
}

interface MapProps {
  events: Event[];
  center: [number, number];
  zoom: number;
}

const MapComponent = ({ events, center, zoom }: MapProps) => {
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      });

      setIsMapReady(true);
    }
  }, []);

  if (!isMapReady) return null;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
      className="z-10"
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {events.map((event) => (
        <Marker
          key={event.id}
          position={[event.latitude, event.longitude]}
          icon={plumPinIcon}
        >
          <Popup className="event-popup">
            <div className="p-1">
              <Link
                href={`/community-hub/events/${event.id}/${slugit(
                  event.title
                )}`}
                className="hover:underline"
              >
                {event.title}
              </Link>
              <p className="text-sm">{event.location}</p>
              <p className="text-sm">{formatDate(event.startDate)}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {event.categories.map((category) => (
                  <span
                    key={category}
                    className="text-xs text-gray-500 px-1 py-0.5 bg-gray-100 rounded"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
