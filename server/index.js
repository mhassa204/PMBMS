// server.js
const express = require("express");
const dotenv = require("dotenv");
const connect = require("./config/dbConnection");
const userRoutes = require("./routes/userRoutes");
const zoneRoutes = require("./routes/zoneRoutes");
const bazarRoutes = require("./routes/bazarRoutes");
const cityRoutes = require("./routes/cityRoutes");
const shopRoutes = require("./routes/shopRouters");
const shopHolderRoutes = require("./routes/shopHolderRoutes");
const ShopAllotmentRoutes = require("./routes/shopAllotmentRoutes");
const FileRoutes = require("./routes/fileRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connect();

app.use(express.json());
app.use(errorHandler);

// Define your routes here
app.use("/users", userRoutes);
app.use("/zones", zoneRoutes);
app.use("/bazars", bazarRoutes);
app.use("/cities", cityRoutes);
app.use("/shops", shopRoutes);
app.use("/shop-holders", shopHolderRoutes);
app.use("/shop-allotments", ShopAllotmentRoutes);
app.use("/files", FileRoutes);

app.route("/").get((req, res) => {
  res.send("homepage of API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
