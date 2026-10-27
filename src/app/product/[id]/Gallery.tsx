"use client";
import { useState } from "react";
import { ProductArt } from "@/components/ProductArt";

const VIEWS = [["front", "Front"], ["back", "Back"], ["detail", "Detail"]] as const;

export function Gallery({ id }: { id: string }) {
  const [view, setView] = useState<(typeof VIEWS)[number][0]>("front");
  return (
    <div className="gallery" data-testid="gallery">
      <div className="main"><ProductArt id={id} view={view} /></div>
      <div className="thumbs">
        {VIEWS.map(([v, label]) => (
          <button key={v} className={view === v ? "on" : ""} onClick={() => setView(v)} aria-label={`Show ${label.toLowerCase()} view`} aria-pressed={view === v} data-testid={`gallery-${v}`}>
            <ProductArt id={id} view={v} />
          </button>
        ))}
      </div>
    </div>
  );
}
