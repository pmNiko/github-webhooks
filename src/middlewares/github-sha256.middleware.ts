import * as crypto from "crypto";
import { NextFunction, Request, Response } from "express";
import { envs } from "../config";

const WEBHOOK_SECRET = envs.SECRET_TOKEN;

const verify_signature = (req: Request) => {
  const signature = crypto
    .createHmac("256", WEBHOOK_SECRET)
    .update(JSON.stringify(req.body))
    .digest("hex");

  const xHubSignature = req.header("x-hub-signature-256") ?? "";

  let trusted = Buffer.from(`sha256=${signature}`, "ascii");
  let untrusted = Buffer.from(xHubSignature, "ascii");

  return crypto.timingSafeEqual(trusted, untrusted);
};

export class GithubSha256Middleware {
  static verifySignature = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!verify_signature(req)) {
      res.status(401).send("Unautorized");
      return;
    }

    next();
  };
}
