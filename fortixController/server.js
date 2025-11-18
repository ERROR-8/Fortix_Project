const express = require(`express`);
const cors = require(`cors`);
const dotenv = require(`dotenv`);
const cookieParser = require("cookie-parser");
const connectdb = require(`./config/db`);
const inventoryRoutes = require(`./routes/inventoryRoutes`);
const userRoutes = require(`./routes/userRoutes`);
const vendorRoutes =require(`./routes/vendorRoutes`);
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
const app = express();

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectdb();

app.get("/", (req,res) => {
    res.send("Api is Working");
});

const port = process.env.PORT || 4444;
app.listen(port, () =>{
    console.log("Server is Running at Port 4444");
});

app.use("/api/inventory",inventoryRoutes);
app.use("/api/users",userRoutes);
app.use("/api/vendor",vendorRoutes);

app.use(notFound);
app.use(errorHandler);