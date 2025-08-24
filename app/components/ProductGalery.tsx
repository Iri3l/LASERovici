"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

type Img = { src: string; alt?: string };

export default function ProductGallery({ images }: { images: Img[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => { setIndex(i); setOpen(true); }}
            className="relative aspect-square overflow-hidden rounded ring-1 ring-gray-200"
            aria-label={`Open image ${i + 1}`}
          >
            <Image
              src={img.src}
              alt={img.alt || ""}
              fill
              sizes="(max-width:768px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          </button>
        ))}
      </div>

      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={images}
          plugins={[Zoom]}
        />
      )}
    </>
  );
}
