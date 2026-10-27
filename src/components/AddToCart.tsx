"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";

// Catalog-card button. Products with sizes send the shopper to the product page to choose one.
export function AddToCart({ id, name, hasSizes }: { id: string; name: string; hasSizes?: boolean }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  if (hasSizes)
    return (
      <Link href={`/product/${id}`} className="btn ghost" data-testid={`choose-size-${id}`}>
        Choose size
      </Link>
    );
  return (
    <button
      className="btn"
      data-testid={`add-${id}`}
      aria-label={`Add ${name} to cart`}
      onClick={() => {
        add(id);
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
      }}
    >
      {added ? "Added ✓" : "Add to cart"}
    </button>
  );
}
