import express, { Application } from "express"
import { UserRoutes } from "./users/user.routes"
import { envs } from "../config/envs"
export class Server {

    private readonly port: number
    private readonly app: Application

    constructor() {
        this.port = envs.PORT
        this.app = express()
        this.middlewares()
        this.app.use(envs.BASE_URL, this.routes())
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
            console.log(`✅ Server running on http://localhost:${this.port}`);
        })
    }
}