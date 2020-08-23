import React from "react";
import GameItem, { IGameItemProps } from "./GameItem";
import { COLORS } from "../constants";

export interface IMatchItemProps {
  games: IGameItemProps[];
}

export default function MatchItem(props: IMatchItemProps) {
  const score = props.games.reduce(
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

  const color =
    score[0] > score[1]
      ? COLORS.GREEN
      : score[1] > score[0]
      ? COLORS.RED
      : COLORS.YELLOW;

  const b0n = Math.max(score[0], score[1]) * 2 - 1;

  const result =
    score[0] > score[1] ? "VICTORY" : score[1] > score[0] ? "DEFEAT" : "DRAW";

  return (
    <div className="match-card">
      <h4>
        <span>{props.games[0].date}</span>
        <span>-</span>
        <span style={{ color }}>{result}</span>
        <span>
          {score[0]} - {score[1]}
        </span>
        <span>(B0{b0n})</span>
      </h4>
      {props.games.map((game, idx) => {
        return <GameItem {...game} key={idx} />;
      })}
    </div>
  );
}
