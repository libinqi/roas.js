const http_port = Number.parseInt(process.env.PORT) || 3330;
const tcp_port = Number.parseInt(process.env.TCPPORT) || 8333;
const ws_port = Number.parseInt(process.env.WSPORT) || 3331;

module.exports = {
  http: {
    port: http_port,
    hostName: '',
    assetHost: '',
    serveStatic: true,
    secretKeyBase: 'b90321d802cf09ef688b05eb6337efc3422b4e25fe42a311bc4e5ffb268c335590be89f464d3adabfbcfae4b431a5029ad6486bce555caa962d75a18322ea111',
    isEnable: true,
    // provider: 'User'
  },
  ws: {
    wsPort: ws_port,
    isEnable: true
  },
  tcp: {
    port: tcp_port,
    isEnable: true,
    provider: 'User'
  }
};