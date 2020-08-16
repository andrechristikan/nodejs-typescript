export default {
    debug: env('DEBUG') || true,
    env: env('ENV') || 'development',
    routePrefix: env('ROUTE_PREFIX') || 'api',
    version: env('VERSION') || 1,
    host: env('HOST') || 'localhost',
    port: env('PORT') || 3000,
    language: env('LANGUAGE') || 'en',
    name: env('NAME') || 'ac.k',
};
