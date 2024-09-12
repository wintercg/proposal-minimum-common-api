#!/usr/bin/env -S deno run --allow-net --allow-read

import { serveDir } from "https://deno.land/std@0.134.0/http/file_server.ts";

Deno.serve((req) => {
    // If we're *.wintercg.org, 301-redirect to the new URL.
    const url = new URL(req.url);
    console.log(url);
    if (url.hostname.endsWith(".wintercg.org")) {
        url.hostname = "min-common-api.proposal.wintercg.org";
        return Response.redirect(url, 301);
    }

    // Otherwise, serve the current dir
    return serveDir(req, {
        enableCors: true,
        showDotfiles: false,
    });
});
