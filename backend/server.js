const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRouter");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, async () => {
  try {
    console.log(
      `Connection has been established successfully in port: ${PORT}.`
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
