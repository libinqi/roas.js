const httpPort = Number.parseInt(process.env.PORT) || 3330;
const tcpPort = Number.parseInt(process.env.TCPPORT) || 8333;
const wsPort = Number.parseInt(process.env.WSPORT) || 3331;

export default {
  http: {
    port: httpPort,
    hostName: 'localhost',
    hostIP: '127.0.0.1',
    serveStatic: true,
    secretKeyBase: 'b90321d802cf09ef688b05eb6337efc3422b4e25fe42a311bc4e5ffb268c335590be89f464d3adabfbcfae4b431a5029ad6486bce555caa962d75a18322ea111',
    isEnable: true,
    // provider: 'User'
  },
  ws: {
    wsPort: wsPort,
    isEnable: true
  },
  tcp: {
    port: tcpPort,
    isEnable: true,
    provider: 'User'
  }
};
