"use client";
import { HOME_ADDRESS, type Address } from "@/data/address";
import { useStored } from "./useStored";

// The address book starts with the account's home address (where its past orders went).
export function useAddresses() {
  return useStored<Address[]>("swag_addresses", [], [HOME_ADDRESS]);
}
