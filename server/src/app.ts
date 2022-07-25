import express from "express";
import cors from "cors";
import route from "./route";
const app = express();
const port = 5000;

let corsOptions = {
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200  
  };
  
app.use(cors(corsOptions));
app.use(express.json());
app.use('/',route);


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    }
);