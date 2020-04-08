import React from "react"
import {TIE} from "../../reducers/constants"

const getWinner = gameStats => {
  let winner = gameStats.players.filter(p => p.uid === gameStats.winner)
  if (winner.length === 0) return TIE
  else return winner[0].name
}

const ModalWindow = ({gameStat, continueHandler, cancelHandler}) => {
  return(
    <div className="game-finished">
      <div>

        <div className="winner"><span>Победитель:</span> {getWinner(gameStat)}</div>
        <div className="finish-buttons">
          <button
            onClick = {continueHandler}>
            Еще раз
          </button>
          <button
            onClick = {cancelHandler} >
            Выйти
          </button>
        </div>

      </div>
    </div>
  )
}

export default ModalWindow