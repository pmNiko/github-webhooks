import { Request, Response } from "express";
import { GitHubService } from "../../services/github.service";

export class GithubController {
  constructor(private readonly githubService = new GitHubService()) {}

  webhookHanlder = (req: Request, res: Response) => {
    const githubEvent = req.header("x-github-event") ?? "uknown";
    // const signature = req.header("x-hub-signature-256") ?? "uknown";
    const payload = req.body;

    let message: string;

    switch (githubEvent) {
      case "star":
        message = this.githubService.onStar(payload);
        break;

      case "issues":
        message = this.githubService.onIssue(payload);
        break;

      default:
        message = `Uknown event ${githubEvent}`;
    }

    console.log({ message });

    res.status(200).json("Acepted");
  };
}
