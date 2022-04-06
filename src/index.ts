import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {videosRepository} from "./repositories/videos-repository";
import {get} from "http";
import {videosRouter} from "./routes/videos-routes";
import {authMiddleware} from "./middlewares/auth-middleware";


const app = express()
const corsMiddleware = cors()
app.use(corsMiddleware)
app.use(authMiddleware)

const jsonBodeMiddleware = bodyParser
app.use(jsonBodeMiddleware.json())

const PORT = process.env.PORT || 5000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World :)')
})

app.use('/videos', videosRouter)

app.listen(PORT, () => {
  console.log(`Example app listening on port: ${PORT}`)
})

