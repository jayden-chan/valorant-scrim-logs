// @ts-check

const { readFileSync, writeFileSync } = require("fs");

const input_path = process.argv[2];
if (!input_path || input_path.length === 0) {
  console.log("Specify a file");
  process.exit(1);
}

console.log(input_path);
const games = JSON.parse(readFileSync(input_path, { encoding: "utf-8" })).games;

const matches = Object.values(
  Object.entries(
    games.reduce((rv, x) => {
      (rv[x.date] = rv[x.date] || []).push(x);
      return rv;
    }, {})
  ).map(([date, games]) => {
    const score = games.reduce(
      (score, curr) => {
        if (curr.score[0] > curr.score[1]) {
          score[0] += 1;
        } else if (curr.score[1] > curr.score[0]) {
          score[1] += 1;
        } else {
          score[0] += 0.5;
          score[1] += 0.5;
        }

        return score;
      },
      [0, 0]
    );

    const result =
      score[0] > score[1] ? "VICTORY" : score[1] > score[0] ? "DEFEAT" : "DRAW";

    return { games, date, score, result };
  })
);

const matchesPlayed = matches.length;
const matchesWon = matches.filter((match) => match.result === "VICTORY").length;

const gamesPlayed = games.length;
const gamesWon = games.filter((game) => game.score[0] > game.score[1]).length;

writeFileSync(
  "./src/matches.json",
  JSON.stringify({
    matches,
    gamesPlayed,
    gamesWon,
    matchesPlayed,
    matchesWon,
  })
);
