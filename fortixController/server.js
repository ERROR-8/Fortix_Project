const express = require(`express`);
const cors = require(`cors`);
const dotenv = require(`dotenv`);
const connectdb = require(`./config/db`);
const inventoryRoutes = require(`./routes/inventoryRoutes`);
const userRoutes = require(`./routes/userRoutes`);

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
connectdb();

app.get("/", (req,res) => {
    res.send("Api is Working");
});

const port = process.env.PORT || 4444;
app.listen(port, () =>{
    console.log("Server is Running at Port 4444");
});

app.use("/api/inventory",inventoryRoutes);
app.use("/api/user",userRoutes);