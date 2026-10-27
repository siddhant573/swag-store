"use client";
import { useStored } from "./useStored";

export function useWishlist() {
  return useStored<string[]>("swag_wishlist", []);
}

export function WishlistButton({ id, name }: { id: string; name: string }) {
  const [list, setList, ready] = useWishlist();
  const saved = list.includes(id);
  return (
    <button
      className={`heart ${saved ? "on" : ""}`}
      title={saved ? "Saved to wishlist" : "Save to wishlist"}
      data-testid={`wishlist-${id}`}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      disabled={!ready}
      onClick={() => setList((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]))}
    >
      {saved ? "♥" : "♡"}
    </button>
  );
}
