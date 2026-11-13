# Parcel Tracker · EVJS + Expo PoC

Can a web app and a native app open the same parcel route, read the same HTTP service, and apply the same business rule while keeping their own UI? This throwaway prototype tests that with fictional data, public npm packages, and no account, database, or secrets.

```sh
npm ci
npm run dev
```

Use Node.js 22.13+ (22.x) or 24.3+ (24.x). Open [EVJS Web](http://localhost:3100) and select **Track demo parcel**. Open the Metro URL from Expo Go, or run `npm run dev:web` and `npm run dev:app` in separate terminals and press `i` or `a` in the Expo terminal to open a simulator or emulator.

| Where | What to look at |
| --- | --- |
| [EVJS Web](apps/web/src/pages) | Browser-specific layout and UI. The detail page is `/parcels/demo-001`. |
| [Expo App](apps/mobile/src/app) | Native Stack and React Native views. Its detail route uses the same path and ID. |
| [EVJS HTTP handler](apps/web/src/apis/api/parcels/%24parcelId/api.ts) | `GET /api/parcels/:parcelId` validates the ID and serves fictional JSON. |
| [Shared TypeScript](packages/shared/src/index.ts) | URL builders, JSON contract and parser, HTTP client, and the rule for whether a delivery address can still change. Both screens render the rule; the server also computes it. |

For a direct Expo Go route on a simulator, open `exp://127.0.0.1:8081/--/parcels/demo-001` (substitute the actual Metro host and port if they differ). For an Android emulator use `exp://10.0.2.2:8081/--/parcels/demo-001` if Metro is on the host. The app defaults its API origin to port 3100 on the host for iOS Simulator and Android Emulator. On a physical device set `EXPO_PUBLIC_API_URL` to a reachable URL, such as `http://192.168.1.100:3100` on your LAN, before starting Expo. Use HTTPS outside local development.

The app also declares `parcelpoc://parcels/demo-001` for a custom development build. Expo Go uses `exp://` instead. Verified HTTPS Universal Links / Android App Links and browser fallback require a real domain and app associations, and are outside this PoC.

```sh
curl -i http://localhost:3100/api/parcels/demo-001
curl -i http://localhost:3100/api/parcels/missing
curl -i http://localhost:3100/api/parcels/INVALID

npm run check
npm run build:web
PORT=3100 npm run start:web
npm run build:app
```

The successful response includes an additive `canRedirect` field. The v1 reader returns the original parcel shape and ignores that extra field, illustrating one backwards-compatible server change. A new status value would still require a compatibility decision. `build:app` exports iOS and Android JavaScript bundles with Metro; it does not create signed app binaries.

See [NOTES.md](NOTES.md) for the result and what to try next.
