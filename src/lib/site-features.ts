/**
 * The GitHub Pages build (scripts/build-static.mjs) has no server, so routes that
 * need one (admin, api) are left out and must not be linked.
 */
export const IS_STATIC_SITE = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";
