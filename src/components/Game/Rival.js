import React from "react"
import {ROCK, PAPER, SCISSORS, PASS} from "../../reducers/constants"

const Rival = ({rivalData}) => {
  return(
    <div className = "player">
      <div className = "player-data">
        <div className = "player-name"><b>Имя: </b>{rivalData.name}</div>
        <div className = "player-wins"><b>Побед: </b>{rivalData.wins}</div>
        <div className = "player-games"><b>Игр: </b>{rivalData.games}</div>
      </div>

      <div className = "desk">
        <div className = "result">
          <div className = "throw">
            {rivalData.throw === null && <div className = "empty"/>}
            {rivalData.throw === PAPER && <div className = "paper"/>}
            {rivalData.throw === SCISSORS && <div className = "scissors"/>}
            {rivalData.throw === ROCK && <div className = "rock"/>}
            {rivalData.throw === PASS && <div className = "pass">PASS</div>}
          </div>
        </div>

        <div className = "colon">:</div>

        <div className = "face">
          <div className = "rival"/>
        </div>
      </div>
    </div>
  )
}

export default Rival