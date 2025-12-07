const express = require(`express`);
const cors = require(`cors`);
const dotenv = require(`dotenv`);
const connectdb = require(`./config/db`);
const inventoryRoutes = require(`./routes/inventoryRoutes`);
const userRoutes = require(`./routes/userRoutes`);
const vendorRoutes =require(`./routes/vendorRoutes`);
const seedRoutes = require(`./routes/seedRoutes`);
const salesRoutes = require(`./routes/salesRoutes`);

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
app.use("/api/vendor",vendorRoutes);
app.use("/api/seed", seedRoutes);
app.use("/api/sales", salesRoutes);