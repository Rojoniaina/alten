import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import routes from "./presentation/routes";
import swaggerDocument from "../public/swagger.json";

const app = express();
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/api/v1/", routes);

export default app;
