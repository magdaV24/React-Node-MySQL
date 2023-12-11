import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import database from "./database/config/database";
import user_route from "./database/routes/User";
import art_work_route from "./database/routes/ArtWork";
import photo_router from "./database/routes/Photo";

const main = async () => {
  dotenv.config();

  const app = express();

  app.use(
    cors({
      methods: ["POST", "GET", "PUT", "DELETE"],
      credentials: true,
      origin: "*",
    })
  );

  app.use(express.json());

  try {
    await database
      .initialize()
      .then(() => console.log("Database has been initialized!"));
  } catch (err) {
    console.error(err);
  }

  app.use("/server/user", user_route);
  app.use("/server/art_work", art_work_route);
  app.use("/server/photo", photo_router);

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