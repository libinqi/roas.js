const httpPort = Number.parseInt(process.env.PORT) || 1800;
const tcpPort = Number.parseInt(process.env.TCPPORT) || 8800;
const wsPort = Number.parseInt(process.env.WSPORT) || 3800;

export default {
  http: {
    port: httpPort,
    hostName: process.env.HOST_NAME || 'localhost',
    hostIP: process.env.HOST_IP || '127.0.0.1',
    serveStatic: process.env.SERVE_STATIC || false,
    maxCache: process.env.MAX_CACHE || 3600,
    secretKeyBase: process.env.SECRET_KEY_BASE || '',
    isEnable: process.env.HTTP_ENABLE,
    provider: process.env.HTTP_PROVIDER
  },
  ws: {
    wsPort: wsPort,
    isEnable: process.env.WS_ENABLE || false
  },
  tcp: {
    port: tcpPort,
    isEnable: process.env.TCP_ENABLE || false,
    provider: process.env.TCP_PROVIDER || ''
  }
};
