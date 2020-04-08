import "./index.styl"
import React from "react"
import connect from "react-redux/es/connect/connect"
import Timer from "./Timer"
import Player from "./Player"
import Rival from "./Rival"
import ModalWindow from "./ModalWindow"
import Listener from "../../Listener"
import {
  WS_REQUEST, START_NEW_ROUND, CANCEL_GAME,
  TIMER_STOP, TIMER_OUT, TIMER_START, PASS, MOVE,
} from "../../reducers/constants"


class Game extends Listener {
  constructor(props){
    super(props)
    /* Слушаем событие истечения таймера */
    this.setEventHandler(TIMER_OUT, this.timerOut)
  }

  componentDidMount(){
    this.dispatch(TIMER_START)
  }

  /* По истечении времени пасуем */
  timerOut = () => {
    this.dispatch(WS_REQUEST, {action: MOVE, data: PASS})
    return false
  }

  /* Делаем ход */
  throwHandler = move => {
    this.dispatch(WS_REQUEST, {action: MOVE, data: move})
    this.dispatch(TIMER_STOP)
  }

  /* Отменяем игру */
  cancelHandler = () => {
    this.dispatch(WS_REQUEST, {action: CANCEL_GAME})
  }

  /* Стартуем новый раунд */
  continueHandler = () => {
    this.dispatch(WS_REQUEST, {action: START_NEW_ROUND})
    this.dispatch(TIMER_START)
  }

  /* Вспомогательные метод. Определяем какой ход сделал игрок */
  getThrow = (userData, gameStat) => {
    if (userData.uid in gameStat.throws) return gameStat.throws[userData.uid]
    else return null
  }

  getRivils = (gameStat, uid) => {
    return gameStat.players
      .filter(p => p.uid !== uid)
      .map(r => {
        r.throw = this.getThrow(r,gameStat)
        return r
      })
  }

  getUser = (gameStat, uid) => {
    return gameStat.players
      .filter(p => p.uid === uid)
      .map(r => {
        r.throw = this.getThrow(r,gameStat)
        return r
      })[0]
  }

  render () {
    let userData = this.getUser(this.props.gameStat, this.props.userId)

    return (
      <div className = "game">
        <div className = "game-top">
          <div className = "timer">
            <Timer round = {this.props.gameStat.round}/>
          </div>
          <div
            className = "game-close"
            onClick = {this.cancelHandler}/>
        </div>

        <div className = "players">
          <Player playerData = {userData} moveHandler = {this.throwHandler}></Player>
          {this.getRivils(this.props.gameStat, userData.uid).map((r,i) => <Rival key = {i} rivalData = {r}/>)}
        </div>

        {this.props.gameStat.winner &&
          <ModalWindow
            gameStat = {this.props.gameStat}
            continueHandler = {this.continueHandler}
            cancelHandler = {this.cancelHandler} />}
      </div>
    )
  }
}

export default connect(state => ({
  TIMER_OUT: state.timerOut
}))(Game)

