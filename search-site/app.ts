import * as Express from "express";
import * as CookieParser from "cookie-parser";
import * as BodyParser from "body-parser";
import * as DebugModule from "debug";
import * as Http from "http";
import * as Path from "path";

import * as K from "kwyjibo";

export default class App {

    private static port: number = App.normalizePort(process.env.port || "3000");
    private static server: Http.Server;
    private static express: Express.Express;
    private static isDevelopment = false;
    private static securityProvider: SecurityProvider;

    public static get authorize(): Express.Handler {
        return App.securityProvider.getAuthorizeMiddleware();
    }

    public static get authenticate(): Express.Handler {
        return App.securityProvider.getAuthenticateMiddleware()
    }

    public static init(): void {
        if (process.env.NODE_ENV === "development") {
            App.isDevelopment = true;
        }

        App.express = Express();

        App.express.use(BodyParser.json());
        App.express.use(BodyParser.urlencoded({ extended: false }));
        App.express.use(CookieParser());
        App.express.set("view engine", "ejs");

        App.securityProvider = {
            getAuthorizeMiddleware(): Express.Handler {
                return (req, res, next) => {
                    console.log(`The request to ${req.path} requires an authenticated user`);
                    next();
                }
            },

            getAuthenticateMiddleware(): Express.Handler {
                return (req, res, next) => {
                    // do the authentication
                    next();
                }
            }
        }
    }

    public static start(): void {

        // Create HTTP server.
        App.server = Http.createServer(App.express);

				//handle static files
        let staticFilesDir = Path.join(__dirname, "public");
        App.express.use("/", Express.static(staticFilesDir));

        // Init all Kwyjibo controllers
        K.initialize(App.express);

        // Listen on provided port, on all network interfaces.
        App.express.set("port", App.port);
        App.server.listen(App.port);
        App.server.on("error", App.onError);
        App.server.on("listening", App.onListening);
    }

    private static normalizePort(val: string): any {
        let port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }

    private static onError(error: any): void {

        if (error.syscall !== "listen") {
            throw error;
        }

        let bind = typeof App.port === "string" ? ("Pipe " + App.port) : ("Port " + App.port);

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case "EACCES":
                console.error(bind + " requires elevated privileges");
                process.exit(1);
                break;
            case "EADDRINUSE":
                console.error(bind + " is already in use");
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    private static onListening(): void {
        let addr = App.server.address();
        let bind = typeof addr === "string" ?
            "pipe " + addr :
            "port " + addr.port;

        //if (App.isDevelopment) {
            console.log("Listening on " + bind);
        //}
    }
}

interface SecurityProvider {
    getAuthorizeMiddleware(): Express.Handler;
    getAuthenticateMiddleware(): Express.Handler;
}
App.init();
App.start();