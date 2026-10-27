"use client";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";

export function Reorder({ lines }: { lines: { id: string; qty: number }[] }) {
  const { add } = useCart();
  const router = useRouter();
  return (
    <button className="btn" data-testid="reorder" onClick={() => { lines.forEach((l) => add(l.id, l.qty)); router.push("/cart"); }}>
      Buy again
    </button>
  );
}
