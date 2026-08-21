import { useState } from "react";

export default function ProductGallery({
  images = [],
  productName,
}) {
  const gallery =
    images.length > 0
      ? images
      : ["/images/placeholder-food.jpg"];

  const [selectedImage, setSelectedImage] = useState(gallery[0]);

  return (
    <section>
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white">
        <img
          src={selectedImage}
          alt={productName}
          className="h-[420px] w-full object-cover"
        />
      </div>

      {gallery.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {gallery.map((image) => (
            <button
              key={image}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`overflow-hidden rounded-xl border transition ${
                selectedImage === image
                  ? "border-[var(--color-primary)]"
                  : "border-gray-200"
              }`}
            >
              <img
                src={image}
                alt={productName}
                className="h-20 w-20 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}