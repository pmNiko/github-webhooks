import express from "express";
import { envs } from "./config";
import { GithubController } from "./presentation/github/controller";

(() => {
  main();
})();

function main() {
  const app = express();

  const controller = new GithubController();

  app.use(express.json());

  app.post("/api/github", controller.webhookHanlder);

  app.listen(envs.PORT, () => {
    console.log("Server on port ", envs.PORT);
  });
}
