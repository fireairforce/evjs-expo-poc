import { fetchParcel, parseParcelId, summarizeParcel, type Parcel } from "@evjs-expo-poc/shared";
import { usePageParams } from "@evjs/ev/route";
import { useEffect, useState } from "react";

type Detail =
  | { state: "loading" }
  | { state: "ready"; parcel: Parcel }
  | { state: "error"; message: string };

function ParcelDetail({ parcelId }: { parcelId: string }) {
  const [attempt, setAttempt] = useState(0);
  const [detail, setDetail] = useState<Detail>({ state: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    fetchParcel(window.location.origin, parcelId, controller.signal).then(
      (parcel) => {
        if (!controller.signal.aborted) setDetail({ state: "ready", parcel });
      },
      (error: unknown) => {
        if (!controller.signal.aborted) {
          setDetail({
            state: "error",
            message: error instanceof Error ? error.message : "Unable to load this parcel.",
          });
        }
      },
    );
    return () => controller.abort();
  }, [parcelId, attempt]);

  if (detail.state === "loading") {
    return <p role="status">Loading parcel…</p>;
  }

  if (detail.state === "error") {
    return (
      <div>
        <p className="error" role="alert">{detail.message}</p>
        <button className="secondary" type="button" onClick={() => {
          setDetail({ state: "loading" });
          setAttempt((previous) => previous + 1);
        }}>
          Try again
        </button>
      </div>
    );
  }

  const { parcel } = detail;
  const status = summarizeParcel(parcel);
  return (
    <>
      <div className={`status status-${status.tone}`}>
        <p className="eyebrow">Latest status</p>
        <h2>{status.title}</h2>
        <p>{status.detail}</p>
      </div>
      <dl className="facts">
        <div>
          <dt>Shipment</dt>
          <dd>{parcel.title}</dd>
        </div>
        <div>
          <dt>Destination</dt>
          <dd>{parcel.destination}</dd>
        </div>
        <div>
          <dt>Last update</dt>
          <dd><time dateTime={parcel.updatedAt}>{new Date(parcel.updatedAt).toLocaleString()}</time></dd>
        </div>
      </dl>
    </>
  );
}

export default function ParcelPage() {
  const { parcelId } = usePageParams();
  const id = parseParcelId(parcelId);

  return (
    <section className="panel" aria-labelledby="page-title">
      <a className="back text-link" href="/"><span aria-hidden="true">←</span> Back to tracking</a>
      <p className="eyebrow">Shipment details</p>
      <h1 id="page-title">{id ?? "Invalid tracking ID"}</h1>
      {id ? <ParcelDetail key={id} parcelId={id} /> : <p className="error">Check the tracking link and try again.</p>}
    </section>
  );
}
