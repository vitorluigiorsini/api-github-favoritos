export interface GithubUserResponse {
  id: number;
  avatar_url: string;
  login: string;
  name: string;
  bio: string;
  location: string;
  public_repos: number;
  repos_url: string;
  html_url: string;

  message?: "Not Found";
}

export interface GithubRepoResponse {
  id: number;
  name: string;
  description: string;
  html_url: string;
  fork: boolean;
  stargazers_count: number;
}

export async function getGithubUser(userName: string) {
  const response = await fetch(`https://api.github.com/users/${userName}`);
  const user: GithubUserResponse = await response.json();
  if (!user.message) {
    return user;
  } else {
    console.log("Usuário não existe!");
  }
}

export async function getGithubUserRepo(user: GithubUserResponse) {
  const response = await fetch(user.repos_url);
  const repo: GithubRepoResponse[] = await response.json();

  return repo;
}
