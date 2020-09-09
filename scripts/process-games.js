// @ts-check

const { readFileSync, writeFileSync } = require("fs");

const round = (num, precision) => Number(num.toFixed(precision));

const games = JSON.parse(
  readFileSync("./games.json", { encoding: "utf-8" })
).games.map((game) => {
  const mappedScoreboard = game.scoreboard.map((row) => {
    const ret = [...row];
    ret.splice(6, 0, round(row[3] / row[4], 2));
    return ret;
  });
  game.scoreboard = mappedScoreboard;
  return game;
});

const teammates = JSON.parse(
  readFileSync("./src/teammates.json", { encoding: "utf-8" })
);

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

const playerStats = teammates
  .map((curr) => {
    const playerGames = games.filter((game) =>
      game.scoreboard.some((row) => row[1] === curr)
    );

    const agents = playerGames.reduce((agentsAcc, agentsCurr) => {
      const agent = agentsCurr.scoreboard.find((row) => row[1] === curr)[0];
      if (!agentsAcc[agent]) {
        agentsAcc[agent] = 1;
      }
      agentsAcc[agent] += 1;
      return agentsAcc;
    }, {});

    const playerMatches = matches.filter((match) =>
      match.games.some((game) => game.scoreboard.some((row) => row[1] === curr))
    );

    const totals = playerGames.reduce((totalsAcc, totalsCurr) => {
      totalsCurr.scoreboard
        .find((row) => row[1] === curr)
        .slice(2)
        .forEach((col, idx) => {
          totalsAcc[idx] += col;
        });
      return totalsAcc;
    }, Array(9).fill(0));

    const mappedTotals = totals.map((t, idx) => ({ idx, val: t }));

    return {
      name: curr,
      agents,
      matchesPlayed: playerMatches.length,
      matchesWon: playerMatches.filter((match) => match.result === "VICTORY")
        .length,
      gamesPlayed: playerGames.length,
      gamesWon: playerGames.filter((game) => game.score[0] > game.score[1])
        .length,
      totals: [...mappedTotals.slice(1, 4), ...mappedTotals.slice(6)],
      averages: totals.map((val) => val / playerGames.length),
    };
  }, {})
  .sort((a, b) => {
    return a.averages[0] > b.averages[0] ? -1 : 1;
  });

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

writeFileSync("./src/player_stats.json", JSON.stringify(playerStats));
