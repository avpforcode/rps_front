import React from "react"
import {ROCK, PAPER, SCISSORS, PASS} from "../../reducers/constants"


const Player = ({playerData, moveHandler}) => {
  return(
    <div className = "player">
      <div className = "player-data">
        <div className = "player-name"><b>Имя: </b>{playerData.name}</div>
        <div className = "player-wins"><b>Побед: </b>{playerData.wins}</div>
        <div className = "player-games"><b>Игр: </b>{playerData.games}</div>
      </div>

      <div className = "desk">
        <div className = "choose">
          <div
            className = "rock"
            onClick = {
              !playerData.throw ?
                () => {moveHandler(ROCK)}
                :
                () => {} }/>

          <div
            className="scissors"
            onClick = {
              !playerData.throw ?
                () => {moveHandler(SCISSORS)}
                :
                () => {} }/>

          <div
            className="paper"
            onClick = {
              !playerData.throw ?
                () => {moveHandler(PAPER)}
                :
                () => {} }/>

        </div>

        <div className="colon">:</div>

        <div className="result">
          <div className="throw">
            {playerData.throw === null && <div className = "empty"/>}
            {playerData.throw === PAPER && <div className = "paper"/>}
            {playerData.throw === SCISSORS && <div className = "scissors"/>}
            {playerData.throw === ROCK && <div className = "rock"/>}
            {playerData.throw === PASS && <div className = "pass">PASS</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Player