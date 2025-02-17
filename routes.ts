import { Router } from "express";
import morgan from "morgan";
import { apiV1} from "./routes/v1.routes";

const router = Router();

router.use(
  morgan(
    (tokens, req, res) => {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        "body:",
        JSON.stringify(req.body),
      ].join(" ");
    },
    { immediate: true }
  )
);

router.use("/v1", apiV1);

export { router };
