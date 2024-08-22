import { userToken } from "./formHandler";
import { setScoreLocalStorage } from "./helpers";
import { globalScore } from "./updateUI";

export class Score {
  #score = 0;

  constructor(initVal) {
    this.score = initVal;
  }

  set score(value) {
    if (value >= 0) {
      this.#score = value;
    }
    this.#updateLocalStorage();
  }

  get score() {
    return this.#score;
  }

  plus() {
    this.score++;
    if (userToken.LogedIn) this.sync("set");
  }

  minus() {
    this.score--;
    if (userToken.LogedIn) this.sync("set");
  }

  #updateLocalStorage() {
    setScoreLocalStorage(this.#score);
  }

  async sync(t) {
    if (t !== "set" && t !== "get") {
      console.error("wrong type");
    }
    let data = {
      type: t,
      score: this.score,
    };

    if (t === "get") {
      data = {
        type: t,
      };
    }
    data = JSON.stringify(data);
    try {
      const response = await (
        await fetch("/api/v1/score", {
          body: data,
          method: "POST",
          headers: {
            Authorization: `Bearer ` + userToken.token,
          },
        })
      ).json();
      this.score = response;
    } catch (e) {
      console.error("something wrong when syncing score.");
    }
  }
}
