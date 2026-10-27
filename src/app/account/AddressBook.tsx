"use client";
import { useState } from "react";
import { AddressForm } from "@/components/AddressForm";
import { useAddresses } from "@/components/useAddresses";
import { formatAddress } from "@/data/address";

export function AddressBook() {
  const [addresses, setAddresses, ready] = useAddresses();
  const [editing, setEditing] = useState<string | "new" | null>(null);
  if (!ready) return null;
  return (
    <section className="card" data-testid="address-book">
      <div className="row"><h2>Saved addresses</h2>
        {editing === null ? <button className="btn ghost" data-testid="address-add" onClick={() => setEditing("new")}>Add address</button> : null}
      </div>
      {addresses.length === 0 && editing === null ? <p className="muted" data-testid="addresses-empty">No saved addresses yet.</p> : null}
      {addresses.map((a, idx) =>
        editing === a.id ? (
          <AddressForm key={a.id} prefix="address" initial={a} submitLabel="Save changes" onCancel={() => setEditing(null)}
            onSave={(d) => { setAddresses((l) => l.map((x) => (x.id === a.id ? { ...d, id: a.id } : x))); setEditing(null); }} />
        ) : (
          <div key={a.id} className="row address" data-testid={`address-${idx + 1}`}>
            <span>{formatAddress(a)}</span>
            <span className="actions">
              <button className="link" data-testid={`address-${idx + 1}-edit`} onClick={() => setEditing(a.id)}>Edit</button>
              <button className="link danger" data-testid={`address-${idx + 1}-delete`} onClick={() => setAddresses((l) => l.filter((x) => x.id !== a.id))}>Delete</button>
            </span>
          </div>
        ),
      )}
      {editing === "new" ? (
        <AddressForm prefix="address" submitLabel="Save address" onCancel={() => setEditing(null)}
          onSave={(d) => { setAddresses((l) => [...l, { ...d, id: `addr-${Date.now()}` }]); setEditing(null); }} />
      ) : null}
    </section>
  );
}
