import { Request, Response } from "express";
import { GitHubService } from "../../services/github.service";
import { DiscordService } from "../../services/discord.service";

export class GithubController {
  constructor(
    private readonly githubService = new GitHubService(),
    private readonly discordService = new DiscordService()
  ) {}

  webhookHanlder = (req: Request, res: Response) => {
    console.log("llego");

    const githubEvent = req.header("x-github-event") ?? "uknown";

    const signature = req.header("x-hub-signature-256") ?? "uknown";
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

    this.discordService
      .notify(message)
      .then(() => res.status(202).send("Acepted"))
      .catch((err) => res.status(500).json({ error: "Internal server error" }));
  };
}
