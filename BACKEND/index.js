import express from 'express'
const app = express();
import appRoutes from './src/routes/index.js' // Imports the router from the previously shown index.js
import 'dotenv/config'

// Middleware for parsing JSON bodies
app.use(express.json())

// Mounts all routes from './src/routes/index.js' at the root path '/'
app.use(appRoutes)

app.listen(process.env.PORT,()=>console.log("App listening port:"+process.env.PORT))