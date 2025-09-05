const express = require(`express`);
const cors = require(`cors`);
const dotenv = require(`dotenv`);

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res) =>{
    res.send("Api is Working");
});

const port = process.env.PORT || 4444;

app.listen(port, () =>{
    console.log("Server is Running at Port 4444");
});