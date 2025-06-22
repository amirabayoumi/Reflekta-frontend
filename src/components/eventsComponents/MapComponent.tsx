"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import { slugit } from "@/helper";
import type { MapProps } from "@/types";

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

// User location marker - blue circle with pulsing effect
const userLocationIcon = L.divIcon({
  className: "custom-user-pin",
  html: `
    <div class="ripple-container">
      <div class="ripple-core"></div>
      <div class="ripple-circle"></div>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
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

// Component to locate and show user position
function LocationMarker() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const map = useMap();

  useEffect(() => {
    map
      .locate({ setView: false })
      .on("locationfound", function (e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        map.flyTo(e.latlng, map.getZoom());
      })
      .on("locationerror", function (e) {
        console.log("Location error:", e.message);
      });
  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={userLocationIcon}>
      <Popup>
        <div>
          <strong>You are here</strong>
          <p className="text-sm text-gray-600">Your current location</p>
        </div>
      </Popup>
    </Marker>
  );
}

const MapComponent = ({ events, center, zoom }: MapProps) => {
  const [isMapReady, setIsMapReady] = useState(false);
  const [showUserLocation, setShowUserLocation] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Add CSS for the user location marker with pulsing effect
      const style = document.createElement("style");
      style.textContent = `
        .ripple-container {
          position: relative;
          width: 24px;
          height: 24px;
        }
        .ripple-core {
          position: absolute;
          top: 6px;
          left: 6px;
          width: 12px;
          height: 12px;
          background-color: #2563eb; /* Blue center dot */
          border-radius: 50%;
          box-shadow: 0 0 15px rgba(37, 99, 235, 0.8); /* Glow effect */
          z-index: 2;
        }
        .ripple-circle {
          position: absolute;
          top: 0;
          left: 0;
          width: 24px;
          height: 24px;
          background-color: rgba(37, 99, 235, 0.4); /* Semi-transparent blue */
          border-radius: 50%;
          animation: ripple 2s infinite ease-out; /* Pulsing animation */
          z-index: 1;
        }
        @keyframes ripple {
          0% {
            transform: scale(0.5);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }

        /* Custom popup styling to ensure it's above controls */
        .leaflet-popup {
          z-index: 1000 !important;
        }
        
        .leaflet-popup-content-wrapper {
          max-width: 250px;
          overflow-wrap: break-word;
        }
        
        .event-popup .leaflet-popup-content {
          margin: 10px 12px;
          line-height: 1.4;
          min-width: 150px;
        }
        
        @media (max-width: 640px) {
          .leaflet-popup-content {
            margin: 8px 10px;
            max-width: 200px;
          }
          
          .leaflet-control-zoom {
            z-index: 800 !important;
          }
        }
      `;
      document.head.appendChild(style);

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
    <div className="relative h-full w-full">
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
            <Popup
              className="event-popup"
              autoPanPaddingTopLeft={[30, 60]}
              autoPanPaddingBottomRight={[30, 60]}
            >
              <div className="p-1">
                <Link
                  href={`/community-hub/events/${event.id}/${slugit(
                    event.title
                  )}`}
                  className="hover:underline font-medium text-[#553a5c]"
                >
                  {event.title}
                </Link>
                <p className="text-sm">{event.location}</p>
                <p className="text-sm">{formatDate(event.startDate)}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {event.categories.map((category) => (
                    <span
                      key={category}
                      className="text-xs text-gray-700 px-1.5 py-0.5 bg-gray-100 rounded-full inline-block"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {showUserLocation && <LocationMarker />}
      </MapContainer>

      <button
        onClick={() => setShowUserLocation((prev) => !prev)}
        className="absolute top-4 right-4 z-20 bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#553a5c] flex items-center gap-2"
        title={showUserLocation ? "Hide my location" : "Show my location"}
      >
        <div
          className={`w-5 h-5 relative flex items-center justify-center ${
            showUserLocation ? "text-blue-600" : "text-[#553a5c]"
          }`}
        >
          <div className="absolute w-4 h-4 rounded-full border-2 border-current"></div>
          <div className="absolute w-1.5 h-1.5 rounded-full bg-current"></div>
        </div>
        <span className="text-sm font-medium text-gray-700">
          {showUserLocation ? "Hide My Location" : "Show My Location"}
        </span>
      </button>
    </div>
  );
};

export default MapComponent;
