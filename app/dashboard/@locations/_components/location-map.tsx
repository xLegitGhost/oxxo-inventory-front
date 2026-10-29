import React from 'react';
import { LuMapPin, LuExternalLink } from 'react-icons/lu';

interface LocationMapProps {
  lat?: number;
  lng?: number;
  locationName?: string;
  address?: string;
}

export default function LocationMap({
  lat,
  lng,
  locationName,
  address,
}: LocationMapProps) {
  const hasCoordinates =
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    !isNaN(lat) &&
    !isNaN(lng) &&
    !(lat === 0 && lng === 0);

  if (!hasCoordinates) {
    return (
      <div className="w-full h-[200px] border-2 border-dashed border-orange-300 rounded-md bg-orange-50 flex flex-col items-center justify-center p-4 text-center text-orange-800">
        <LuMapPin className="text-3xl text-orange-500 mb-2" />
        <p className="font-semibold text-sm">Sin coordenadas registradas</p>
        <p className="text-xs text-orange-600">
          Esta tienda no cuenta con latitud y longitud configuradas.
        </p>
      </div>
    );
  }

  const googleMapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

  if (googleMapsKey && googleMapsKey.trim() !== '') {
    return (
      <div className="w-full flex flex-col gap-1">
        <iframe
          width="100%"
          height="200"
          title={`Mapa de ${locationName ?? 'tienda'}`}
          className="border-2 border-orange-800 rounded-md"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsKey}&q=${lat},${lng}`}
        />
      </div>
    );
  }

  // Graceful fallback using OpenStreetMap embed + Google Maps external link (no API key required)
  const delta = 0.005;
  const bbox = `${lng - delta}%2C${lat - delta}%2C${lng + delta}%2C${lat + delta}`;
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
  const googleMapsWebUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="relative w-full h-[200px] border-2 border-orange-800 rounded-md overflow-hidden bg-neutral-100">
        <iframe
          width="100%"
          height="200"
          title={`Mapa de ${locationName ?? 'tienda'}`}
          className="w-full h-full border-0"
          loading="lazy"
          src={osmEmbedUrl}
        />
        <div className="absolute top-2 right-2 bg-orange-600/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow">
          OpenStreetMap
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-neutral-600 px-1 pt-1">
        <span className="font-mono text-[11px]">
          {lat.toFixed(4)}, {lng.toFixed(4)}
        </span>
        <a
          href={googleMapsWebUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-700 hover:text-orange-900 font-medium inline-flex items-center gap-1 hover:underline"
        >
          <span>Abrir en Google Maps</span>
          <LuExternalLink className="text-[11px]" />
        </a>
      </div>
    </div>
  );
}
