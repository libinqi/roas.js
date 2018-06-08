
declare module 'roas-mount' {
    function mount(dir: string): any;
    namespace mount { }
    export = mount;
}

declare module 'koa-socket.io' {
    namespace IO { }
    class IO {
        constructor(options?: object);
        start(server: object, options?: object): boolean;
        use(fn: any, namespace?: string);
    }
    export = IO;
}

declare module 'koa-convert' {
    function convert(mw: any): any;
    namespace convert { }
    export = convert;
}

declare module 'koa-cors' {
    import * as Koa from 'koa';

    function cors(options?: object): Koa.Middleware;
    namespace cors { }
    export = cors;
}


