const httpPort = Number.parseInt(process.env.PORT) || 3000;
const tcpPort = Number.parseInt(process.env.TCPPORT) || 8300;
const wsPort = Number.parseInt(process.env.WSPORT) || 3001;

export default {
  http: {
    port: httpPort,
    hostName: process.env.HOST_NAME_PRO,
    serveStatic: process.env.SERVE_STATIC_PRO || false,
    assetHost: process.env.ASSET_HOST_PRO || '',
    maxCache: process.env.MAX_CACHE_PRO || 3600,
    secretKeyBase: process.env.SECRET_KEY_BASE,
    isEnable: process.env.HTTP_ENABLE,
    provider: process.env.HTTP_PROVIDER,
  },
  ws: {
    wsPort: wsPort,
    isEnable: process.env.WS_ENABLE
  },
  tcp: {
    port: tcpPort,
    isEnable: process.env.TCP_ENABLE,
    provider: process.env.TCP_PROVIDER
  }
};
