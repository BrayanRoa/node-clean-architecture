import express, { Application } from "express"
import { UserRoutes } from "./users/user.routes"

export class Server {

    private readonly port: number
    private readonly app: Application

    constructor(port: number) {
        this.port = port
        this.app = express()
        this.middlewares()
        this.app.use("/api/v1/", this.routes())
    }

    private middlewares() {
        this.app.use(express.json())
    }

    private routes(): express.Router[] {
        return [
            new UserRoutes().router
        ]
    }

    public start() {
        this.app.listen(this.port, () => {
            console.log(`✅ Servidor corriendo en http://localhost:${this.port}`);
        })
    }
}