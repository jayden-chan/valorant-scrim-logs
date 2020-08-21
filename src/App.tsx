import React from "react";
import "./App.css";

import MatchItem, { IGameItemProps } from "./components/MatchListItem";
import { games } from "./matches.json";
import { groupBy } from "./util";

function App() {
  return (
    <div className="App">
      <h1>S4S Scrim Logs</h1>
      {Object.values(groupBy(games as any[], "date")).map((games: any[]) => (
        <MatchItem games={games} key={games[0].date} />
      ))}
    </div>
  );
}

export default App;
