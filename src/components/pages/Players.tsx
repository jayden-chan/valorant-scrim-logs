import React from "react";
import { Link } from "react-router-dom";

export default function Players() {
  return (
    <div className="background">
      <div className="App">
        <h1>S4S Scrim Logs</h1>
        <div className="nav-links">
          <h4>
            <Link to="/">Main</Link>
          </h4>
        </div>
        <div className="info-header">
          <div className="info-header-item">
            <span>
              <b>Time Played:</b>BUH
            </span>
          </div>
          <div className="info-header-item">
            <span>
              <b>Matches played:</b> 40
            </span>
            <span>
              <b>Matches won:</b> 10
            </span>
            <span>
              <b>Match Winrate:</b> BUH
            </span>
          </div>
          <div className="info-header-item">
            <span>
              <b>Games played:</b> LELEL
            </span>
            <span>
              <b>Games won:</b> LMAO
            </span>
            <span>
              <b>Game Winrate:</b> LAWDIHAWI
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
