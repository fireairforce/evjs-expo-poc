import { demoParcelId, parcelPath, parseParcelId } from "@evjs-expo-poc/shared";
import { useState, type FormEvent } from "react";

export default function HomePage() {
  const [invalid, setInvalid] = useState(false);

  function track(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const id = parseParcelId(new FormData(event.currentTarget).get("parcelId"));
    if (!id) {
      setInvalid(true);
      return;
    }
    window.location.assign(parcelPath(id));
  }

  return (
    <section className="panel" aria-labelledby="page-title">
      <p className="eyebrow">Shipment lookup</p>
      <h1 id="page-title">Track a parcel</h1>
      <p className="intro">Enter a tracking ID to see the parcel’s latest status.</p>
      <form className="tracking-form" onSubmit={track}>
        <label htmlFor="parcel-id">Tracking ID</label>
        <div className="field-row">
          <input
            id="parcel-id"
            name="parcelId"
            placeholder={demoParcelId}
            autoCapitalize="off"
            autoComplete="off"
            spellCheck={false}
            aria-invalid={invalid}
            aria-describedby={invalid ? "id-error" : undefined}
            onChange={() => setInvalid(false)}
          />
          <button className="primary" type="submit">Track parcel</button>
        </div>
        {invalid && <p className="error" id="id-error" role="alert">Enter a valid tracking ID.</p>}
      </form>
      <a className="text-link" href={parcelPath(demoParcelId)}>Open sample parcel <span aria-hidden="true">→</span></a>
    </section>
  );
}
