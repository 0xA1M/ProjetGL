import express from "express";
import dotenv from "dotenv";
import jwtVerify from "./middleware/jwtVerify.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import hpp from "hpp";
import helmet from "helmet";
import xss from "xss-clean";
import { errorHandler, notFound } from "./middleware/error.js";
import authRouter from "./routes/auth.js";
import salonRouter from "./routes/salon.js";
import chargilyRouter from "./routes/chargily.js";
import serviceRouter from "./routes/service.js";
import reviewRouter from "./routes/review.js";
import couponRouter from "./routes/coupon.js";
import reservationRouter from "./routes/reservation.js";
import nonAuth from "./routes/nonauth.js";
import userRouter from "./routes/user.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

dotenv.config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: 
    	process.env.NODE_ENV === "development"
    		? "http://localhost:5173"
    		: "https://projet-gl-jet.vercel.app"
  })
);

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use(hpp());

app.use(helmet());
app.use(xss());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "DzBeauty API",
      version: "1.0.0",
      description: "API documentation for DzBeauty Platform",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],

  
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/chargily", chargilyRouter);

app.get("/", (req, res) => {
  res.json("Hello World");
});
app.use("/nonauth", nonAuth);

app.use("/api/auth", authRouter);
app.use(jwtVerify);
app.use("/api/user", userRouter);
app.use("/api/salons", salonRouter);
app.use("/api/service", serviceRouter);
app.use("/api/review", reviewRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/reservation", reservationRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
