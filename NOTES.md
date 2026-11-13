# What the prototype answers

The integration boundary is ordinary HTTP. EVJS serves the Web app and API; Expo owns native routing and rendering. Each screen consumes the same shared path builder, request client, response parser, and status rules. No framework needs to import or run the other framework's page files.

For an existing EVJS product, start with the shared TypeScript package and one Expo feature. If many cross-platform links appear, add a route consistency check or a small generated manifest. If a particular feature wants the same visuals and interactions, try sharing its screen component behind the two routes before changing the Web build.

This prototype has no production authentication, persistence, store distribution, or verified HTTPS links. It illustrates compatibility for additive response fields only.
