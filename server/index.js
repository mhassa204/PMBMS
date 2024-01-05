const express = require("express");
require("dotenv").config();
const connect = require("./config/dbConnection");
const cors = require("cors");
const bodyParser = require("body-parser");

const FileRoutes = require("./routes/fileRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

connect();

app.use(express.json());
app.use(errorHandler);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Define your routes here
app.use("/users", require("./routes/userRoutes"));
app.use("/zones", require("./routes/zoneRoutes"));
app.use("/bazars", require("./routes/bazarRoutes"));
app.use("/shops", require("./routes/shopRouters"));
app.use("/shop-holders", require("./routes/shopHolderRoutes"));
app.use("/shop-allotments", require("./routes/shopAllotmentRoutes"));
app.use("/files", FileRoutes);

app.route("/").get((req, res) => {
  res.send("homepage of API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
