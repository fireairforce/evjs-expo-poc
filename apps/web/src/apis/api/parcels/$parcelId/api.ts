import { canRedirectParcel, demoParcelId, parseParcelId, type Parcel } from "@evjs-expo-poc/shared";
import type { RouteHandlerFn } from "@evjs/ev/api";

const demoParcel: Parcel = {
  id: demoParcelId,
  title: "Sample parcel",
  destination: "Harbor Point",
  status: "in_transit",
  updatedAt: "2026-01-10T09:30:00.000Z",
};

export const GET: RouteHandlerFn<"/api/parcels/:parcelId"> = (_request, context) => {
  const id = parseParcelId(context.req.param("parcelId"));
  if (!id) {
    return Response.json({ error: { code: "INVALID_ID", message: "Invalid tracking ID." } }, { status: 400 });
  }
  if (id !== demoParcel.id) {
    return Response.json({ error: { code: "NOT_FOUND", message: "Parcel not found." } }, { status: 404 });
  }
  return Response.json({ ...demoParcel, canRedirect: canRedirectParcel(demoParcel) });
};
