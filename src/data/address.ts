export type Address = { id: string; name: string; street: string; city: string; state: string; zip: string };

// The demo account's home address: its past orders shipped here, and it's in the address book until the shopper changes it.
export const HOME_ADDRESS: Address = { id: "home", name: "Jordan Lee", street: "1200 Harbor View Rd", city: "Oakland", state: "CA", zip: "94607" };

export const STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

// Returns one message per missing or invalid field, keyed by field name.
export function validateAddress(a: Partial<Address>): Record<string, string> {
  const e: Record<string, string> = {};
  if (!a.name?.trim()) e.name = "Enter the recipient's name";
  if (!a.street?.trim()) e.street = "Enter a street address";
  if (!a.city?.trim()) e.city = "Enter a city";
  if (!a.state || !STATES.includes(a.state)) e.state = "Choose a state";
  if (!/^\d{5}$/.test(a.zip ?? "")) e.zip = "ZIP code must be 5 digits";
  return e;
}

export function formatAddress(a: Address): string {
  return `${a.name}, ${a.street}, ${a.city}, ${a.state} ${a.zip}`;
}
