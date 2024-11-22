import { GitHubIssuePayload, GitHubStarPayload } from "../interfaces";

export class GitHubService {
  constructor() {}

  onStar(payload: GitHubStarPayload): string {
    const { action, sender, repository, starred_at } = payload;

    return `User ${sender?.login} ${action} star on ${repository?.full_name}`;
  }

  onIssue(payload: GitHubIssuePayload): string {
    const { action, issue } = payload;

    if (action === "opened") {
      const message = `An issue was opened with this title "${issue.title}"`;
      return message;
    }

    if (action === "closed") {
      const message = `An issue was closed with this title "${issue.user.login}"`;
      return message;
    }

    if (action === "reopened") {
      const message = `An issue was reopened by "${issue.user.login}"`;
      return message;
    }

    return `Unhandled action for the issue event "${action}"`;
  }
}
