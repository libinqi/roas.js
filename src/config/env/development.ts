const httpPort = Number.parseInt(process.env.PORT) || 3000;
const tcpPort = Number.parseInt(process.env.TCPPORT) || 8300;
const wsPort = Number.parseInt(process.env.WSPORT) || 3001;

export default {
    http: {
        port: httpPort,
        hostName: 'http://localhost:' + httpPort,
        serveStatic: true,
        assetHost: '',
        maxCache: 3600,
        secretKeyBase: 'b90321d802cf09ef688b05eb6337efc3422b4e25fe42a311bc4e5ffb268c335590be89f464d3adabfbcfae4b431a5029ad6486bce777caa962d75a18322ea123',
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