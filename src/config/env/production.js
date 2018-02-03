const http_port = Number.parseInt(process.env.PORT) || 3000;
const tcp_port = Number.parseInt(process.env.TCPPORT) || 8300;
const ws_port = Number.parseInt(process.env.WSPORT) || 3001;

module.exports = {
  http: {
    port: http_port,
    hostName: process.env.HOST_NAME_PRO,
    serveStatic: process.env.SERVE_STATIC_PRO || false,
    assetHost: process.env.ASSET_HOST_PRO || '',
    maxCache: process.env.MAX_CACHE_PRO || 3600,
    maxCache: 3600,
    secretKeyBase: process.env.SECRET_KEY_BASE,
    isEnable: (process.env.HTTP_ENABLE == true || process.env.HTTP_ENABLE == 'true') ? true : false,
    provider: process.env.HTTP_PROVIDER,
  },
  ws: {
    wsPort: ws_port,
    isEnable: (process.env.WS_ENABLE == true || process.env.WS_ENABLE == 'true') ? true : false
  },
  tcp: {
    port: tcp_port,
    isEnable: (process.env.TCP_ENABLE == true || process.env.TCP_ENABLE == 'true') ? true : false,
    provider: process.env.TCP_PROVIDER
  }
};