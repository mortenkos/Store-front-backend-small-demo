import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import productRoutes from './handlers/productHandler'
import userRoutes from './handlers/userHandler'

const app: express.Application = express()
const address: string = "127.0.0.1:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

productRoutes(app);
userRoutes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app;
