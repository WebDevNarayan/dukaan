import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import connect from "./libs/mongo.js"
import { swaggerOptions } from "./libs/swagger.js"
import router from "./routes/index.js"

dotenv.config()

const app = express()
const specs = swaggerJSDoc(swaggerOptions)

connect()

// app.use(audit())
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs))
app.use(router)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
