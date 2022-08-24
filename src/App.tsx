import { BaseSyntheticEvent, useState } from "react";
import "./stylesheets/App.css";
import "./stylesheets/bulma.min.css";
import {
  getGithubUser,
  getGithubUserRepo,
  GithubUserResponse,
  GithubRepoResponse,
} from "./service";

let users: GithubUserResponse[] = [];

function App() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(users);
  const [repo, setRepo] = useState<GithubRepoResponse[]>([]);

  async function handleSubmit() {
    const gitUser = await getGithubUser(userName);
    if (gitUser) {
      users.push(gitUser);
    } else {
      console.log("erro");
    }
    setUserName("");
  }

  function handleRemove(event: BaseSyntheticEvent) {
    const id = Number(
      event.target.parentElement.parentElement.parentElement.parentElement.getAttribute(
        "id"
      )
    );
    const usersFilter: GithubUserResponse[] = users.filter(
      (user) => user.id !== id
    );

    users = usersFilter;
    setUser(users);
    setRepo([]);
  }

  async function handleShowRepo(event: BaseSyntheticEvent) {
    const id = Number(
      event.target.parentElement.parentElement.parentElement.parentElement.getAttribute(
        "id"
      )
    );
    const usersFilter: GithubUserResponse[] = users.filter(
      (user) => user.id === id
    );
    setRepo(await getGithubUserRepo(usersFilter[0]));
    const repoColumn = document.getElementById("repoColumn");
    if (repoColumn) repoColumn.scrollTop = 0;
  }

  return (
    <>
      <div className="page">
        <header className="header has-background-dark has-text-white">
          <svg
            height="32"
            aria-hidden="true"
            viewBox="0 0 16 16"
            version="1.1"
            width="32"
            data-view-component="true"
            className="octicon octicon-mark-github v-align-middle"
          >
            <path
              fill="white"
              fillRule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            ></path>
          </svg>
          <h1 className="is-size-4 has-text-weight-semibold">
            GitHub Favoritos
          </h1>
        </header>
        <div className="container">
          <div className="field has-addons is-danger">
            <div className="control">
              <input
                className="input is-dark"
                type="text"
                placeholder="Buscar um repositório"
                value={userName}
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              />
            </div>
            <div className="control">
              <a className="button is-dark" onClick={handleSubmit}>
                Buscar
              </a>
            </div>
          </div>
          <div className="columns">
            <div className="column is-4">
              <ul>
                {user.map((user) => (
                  <li key={user.id} id={user.id + ""}>
                    <div className="card has-background-light">
                      <div className="card-content">
                        <div className="media">
                          <div className="media-left">
                            <figure className="image is-48x48">
                              <img
                                className="is-rounded"
                                src={user.avatar_url}
                                alt="Placeholder image"
                              />
                            </figure>
                          </div>
                          <div className="media-content">
                            <p className="title is-4">{user.name}</p>
                            <p className="subtitle is-6">
                              <a href={user.html_url} target="blank">
                                github.com/{user.login}
                              </a>
                            </p>
                          </div>
                        </div>
                        <div className="content">
                          {user.bio}
                          <br />
                          <p>
                            {user.location}
                            <br />
                            {"Repositórios públicos: " + user.public_repos}
                          </p>
                        </div>
                        <div className="actionBtn">
                          <input
                            className="button is-dark showRepo"
                            type="submit"
                            value="Repositório"
                            onClick={handleShowRepo}
                          ></input>
                          <input
                            className="button is-danger remove"
                            type="submit"
                            value="Remover"
                            onClick={handleRemove}
                          ></input>
                        </div>
                      </div>
                    </div>
                    <br />
                  </li>
                ))}
              </ul>
            </div>
            <div className="column" id="repoColumn">
              <ul>
                {repo.map((repo) => (
                  <li key={repo.id}>
                    <div className="card">
                      <div className="card-content">
                        <div className="media">
                          <div className="media-left">
                            <figure className="image is-48x48">
                              <svg
                                height="32"
                                aria-hidden="true"
                                viewBox="0 0 16 16"
                                version="1.1"
                                width="32"
                                data-view-component="true"
                                className="octicon octicon-mark-github v-align-middle"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                                ></path>
                              </svg>
                            </figure>
                          </div>
                          <div className="media-content">
                            <p className="title is-4">{repo.name}</p>
                            <p className="subtitle is-6">
                              <a href={repo.html_url} target="blank">
                                Abrir repositório
                              </a>
                            </p>
                          </div>
                        </div>
                        <div className="content">
                          {repo.description}
                          <br />
                          <p>
                            {"Fork: " +
                              repo.fork +
                              " | " +
                              "Stars: " +
                              repo.stargazers_count}
                          </p>
                        </div>
                      </div>
                    </div>
                    <br />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <footer className="footer has-background-dark has-text-white">
          <p>
            <span className="has-text-grey">Vitor Orsini © 2022 </span>- GitHub
            favoritos
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
