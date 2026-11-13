import { Outlet } from "@evjs/ev/navigation";
import "./styles.css";

export default function Layout() {
  return (
    <div className="shell">
      <header className="masthead">
        <a className="wordmark" href="/">
          <span className="mark" aria-hidden="true">↗</span>
          Parcel Tracker
        </a>
        <span className="environment">Demo</span>
      </header>
      <main className="content">
        <Outlet />
      </main>
      <footer className="footer">Fictional shipments only.</footer>
    </div>
  );
}
