const port = Number.parseInt(process.env.PORT) || 5000;

module.exports = {
  port: port,
  hostName: process.env.HOST_NAME_PRO,
  serveStatic: process.env.SERVE_STATIC_PRO || false,
  assetHost: process.env.ASSET_HOST_PRO || '',
  maxCache: process.env.MAX_CACHE_PRO || 3600,
  maxCache: 3600,
  secretKeyBase: process.env.SECRET_KEY_BASE
};
