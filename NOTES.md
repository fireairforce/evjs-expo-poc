# What the prototype answers

The integration boundary is ordinary HTTP. EVJS serves the Web app and API; Expo owns native routing and rendering. Each screen consumes the same shared path builder, request client, response parser, and status rules. No framework needs to import or run the other framework's page files.

For an existing EVJS product, start with the shared TypeScript package and one Expo feature. If many cross-platform links appear, add a route consistency check or a small generated manifest. If a particular feature wants the same visuals and interactions, try sharing its screen component behind the two routes before changing the Web build.

Verified with published EVJS 0.3.29 and Expo SDK 58: EVJS development and production modes both served the tracker in Chromium. In an iOS 18.6 simulator, Expo Go opened the same parcel from the home screen and handled a direct link to a missing parcel. The HTTP service returned 200, 400, and 404 for the documented examples, and the shared reader accepted the live response with its extra field. Metro built both iOS and Android bundles; Android was not run on a device.

This prototype has no production authentication, persistence, store distribution, or verified HTTPS links. It illustrates compatibility for additive response fields only.
