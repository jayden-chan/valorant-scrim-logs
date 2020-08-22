import React from "react";
import "./App.css";

import MatchItem from "./components/MatchListItem";
import { games } from "./matches.json";
import { IGameItemProps } from "./components/GameItem";

import moment from "moment";

const matches = Object.entries(
  games.reduce((rv, x) => {
    (rv[x.date] = rv[x.date] || []).push(x as IGameItemProps);
    return rv;
  }, {} as { [key: string]: IGameItemProps[] })
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
});

const matchesPlayed = matches.length;
const matchesWon = matches.filter((match) => match.result === "VICTORY").length;
const totalTimeSpent = matches.reduce((a1, c1) => {
  const matchDuration = c1.games.reduce((a2, c2) => {
    a2.add(Number(c2.time.slice(3)), "seconds");
    a2.add(Number(c2.time.slice(0, 2)), "minutes");
    return a2;
  }, moment.duration(0));
  a1.add(matchDuration);
  return a1;
}, moment.duration(0));

function App() {
  return (
    <div className="App">
      <h1>S4S Scrim Logs</h1>
      <div className="info-header">
        <span>
          <b>Matches played:</b> {matchesPlayed}
        </span>
        <span>
          <b>Matches won:</b> {matchesWon}
        </span>
        <span>
          <b>Winrate:</b> {((matchesWon / matchesPlayed) * 100).toFixed(1)}%
        </span>
        <span>
          <b>Time Played:</b> {totalTimeSpent.hours()}:
          {totalTimeSpent.minutes()}:
          {`${totalTimeSpent.seconds()}`.padStart(2, "0")}
        </span>
      </div>
      {matches.map(({ games }) => (
        <MatchItem games={games} key={games[0].date} />
      ))}
    </div>
  );
}

export default App;
