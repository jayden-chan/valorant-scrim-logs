import React from "react";
import GameItem, { IGameItemProps } from "./GameItem";
import { COLORS } from "../constants";

export interface IMatchItemProps {
  games: IGameItemProps[];
  date: string;
  score: [number, number];
  result: string;
}

export default function MatchItem(props: IMatchItemProps) {
  const score = props.score;
  const color =
    score[0] > score[1]
      ? COLORS.GREEN
      : score[1] > score[0]
      ? COLORS.RED
      : COLORS.YELLOW;

  const b0n = Math.max(score[0], score[1]) * 2 - 1;

  return (
    <div className="match-card">
      <h4>
        <span>{props.date}</span>
        <span>-</span>
        <span style={{ color }}>{props.result}</span>
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
