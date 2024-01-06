import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import database from "./database/config/database";
import userRoute from "./database/routes/User";
import entryRoute from "./database/routes/Entry";
import photoRoute from "./database/routes/Photo";

const main = async () => {
  dotenv.config();

  const app = express();

  app.use(helmet());

  const ORIGIN = process.env.ORIGIN;

  app.use(
    cors({
      methods: ["POST", "GET", "PUT", "DELETE"],
      credentials: true,
      origin: ORIGIN,
    })
  );

  app.use(express.json());

  try {
    await database.initialize();
    console.log("Database has been initialized!");
  } catch (err) {
    console.error(err);
  }
  const cookieParser = require("cookie-parser");
  app.use(cookieParser());

  app.use("/server/user", userRoute);
  app.use("/server/entry", entryRoute);
  app.use("/server/photo", photoRoute);

  const PORT = process.env.PORT || 3000;

  app
    .listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    })
    .on("error", (err) => {
      console.error(`Error starting server: ${err.message}`);
    });
};

main();
