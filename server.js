import express from "express"
import 'dotenv/config'
import connectDB from "./src/config/db.js"
import morgan from "morgan"
import rootRouter from "./src/routes/index.js"
import cors from "cors"
import errorHadler from "./src/middleware/error.js"
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

//Connect to data base 
connectDB();

const app = express();

//Body parser for req.body
app.use(express.json())


const __filename = fileURLToPath(import.meta.url);
// Get the directory path of the current module's file
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, 'public')));


if(process.env.NODE_ENV === "development"){ 
    app.use(morgan("dev")) //from morgan third party loggger
}

//middleware
app.use(cors());                                                                            
app.use(rootRouter);    
app.use(errorHadler);    


app.get("/", (req, res) => {
    res.send("user-management");
  });

const PORT =  process.env.PORT || 5000;
const server = app.listen(
    PORT,
    console.log("server running on port:"+ PORT)
)  



//handle unhandled rejection 
process.on("unhandledRejection", (err, promise)=>{
    console.log(`Error: ${err}`);
    server.close(()=>process.exit(1)) //cose server and exit
})
