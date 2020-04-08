import React from "react"
import connect from "react-redux/es/connect/connect"
import UserName from "./UserName"
import UserHistory from "./UserHistory"
import {WS_REQUEST, MARK_AS_READY, CHANGE_TYPE} from "../../reducers/constants"


class UserData extends React.Component {
  readyHandler = () => {
    this.props.dispatch({
      componentId: null,
      type: WS_REQUEST,
      payload: {action: MARK_AS_READY}})
  }

  typeHandler = e => {
    this.props.dispatch({
      componentId: null,
      type: WS_REQUEST,
      payload: {action: CHANGE_TYPE, data: parseInt(e.target.value)}})
  }

  render () {
    return (
      <div className = "user-data">
        <div className="user-data_title">Ваши данные</div>

        <UserName name = {this.props.userData.name} />

        <div className="user-stats">
          <div className="user-wins">
            <span><b>Побед: </b></span>
            <span>{this.props.userData.wins}</span>
          </div>
          <div className="user-games">
            <span><b>Всего игр: </b></span>
            <span>{this.props.userData.games}</span>
          </div>
        </div>

        <div className="user-game_type">
          <div><b>Тип игры: </b></div>
          <GameType
            handler = {this.typeHandler}
            gameType = {this.props.userData.game_type}/>
        </div>

        <button
          className = {!this.props.userData.ready ?
            "user-ready"
            :
            "user-ready disabled" }

          onClick = {!this.props.userData.ready ?
            this.readyHandler
            :
            ()=>{} } >
          Готов
        </button>

        <UserHistory history = {this.props.userData.history}/>

      </div>
    )
  }
}

const GameType = ({gameType, handler}) =>
  <div className = "radiobox">
    <div className = "radio-element">
      <input
        type = "radio"
        className = "radio-input"
        value = {1}
        checked = {gameType === 1}
        onChange = {handler} />

      <label> Игра на двоих </label>
    </div>

    <div className = "radio-element">
      <input
        type = "radio"
        className = "radio-input"
        value = {2}
        checked = {gameType === 2}
        onChange = {handler} />

      <label> Игра на троих </label>
    </div>

  </div>

export default connect(() => ({}))(UserData)

