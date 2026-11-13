export const demoParcelId = "demo-001";

export type ParcelStatus = "label_created" | "in_transit" | "delivered";

export interface Parcel {
  id: string;
  title: string;
  destination: string;
  status: ParcelStatus;
  updatedAt: string;
}

const parcelIdPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function parseParcelId(value: unknown): string | null {
  return typeof value === "string" && value.length <= 40 && parcelIdPattern.test(value)
    ? value
    : null;
}

export function parcelPath(id: string): string {
  return `/parcels/${encodeURIComponent(id)}`;
}

export function parcelApiPath(id: string): string {
  return `/api${parcelPath(id)}`;
}

export function canRedirectParcel(parcel: Pick<Parcel, "status">): boolean {
  return parcel.status === "label_created";
}

export function summarizeParcel(parcel: Pick<Parcel, "status">): {
  title: string;
  detail: string;
  tone: "neutral" | "active" | "success";
} {
  const redirectDetail = canRedirectParcel(parcel)
    ? "The delivery address can still be changed."
    : "The delivery address is locked.";
  switch (parcel.status) {
    case "label_created":
      return {
        title: "Label created",
        detail: redirectDetail,
        tone: "neutral",
      };
    case "in_transit":
      return {
        title: "In transit",
        detail: `The parcel is on its way. ${redirectDetail}`,
        tone: "active",
      };
    case "delivered":
      return {
        title: "Delivered",
        detail: "The parcel has reached its destination.",
        tone: "success",
      };
  }
}

/** Read the v1 wire format while allowing additive fields from a newer server. */
export function parseParcel(value: unknown): Parcel {
  if (!value || typeof value !== "object") {
    throw new Error("The server returned an invalid parcel.");
  }
  const { id, title, destination, status, updatedAt } = value as Record<string, unknown>;
  const parsedId = parseParcelId(id);
  if (
    !parsedId ||
    typeof title !== "string" ||
    typeof destination !== "string" ||
    (status !== "label_created" && status !== "in_transit" && status !== "delivered") ||
    typeof updatedAt !== "string" ||
    !Number.isFinite(Date.parse(updatedAt))
  ) {
    throw new Error("The server returned an invalid parcel.");
  }
  return { id: parsedId, title, destination, status, updatedAt };
}

export async function fetchParcel(
  baseUrl: string,
  id: string,
  signal?: AbortSignal,
): Promise<Parcel> {
  const origin = baseUrl.replace(/\/+$/, "");
  const response = await fetch(`${origin}${parcelApiPath(id)}`, {
    headers: { Accept: "application/json" },
    signal,
  });
  if (response.status === 404) throw new Error("Parcel not found.");
  if (!response.ok) throw new Error(`Parcel request failed (${response.status}).`);
  return parseParcel(await response.json());
}
