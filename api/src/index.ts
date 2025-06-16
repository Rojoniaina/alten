import dotenv from "dotenv";
import { env } from "process";
import { connectDB } from "./infrastructure/database/config/database";
import app from "./server";

dotenv.config();
const port = env.PORT || 9000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
