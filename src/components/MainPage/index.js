import "./index.styl"
import React from "react"
import connect from "react-redux/es/connect/connect"
import Listener from "../../Listener"
import UserData from "./UserData"
import UserList from "./UserList"
import Game from "../Game"
import {WS_RESPONSE} from "../../reducers/constants"


class MainPage extends Listener {
  constructor(props){
    super(props)
    this.mode = 1
    this.userList = []
    this.userData = {
      uid: 1,
      name: "Подключение...",
      wins: 0,
      games: 0,
      ready: false,
      game_type: 1 }

    this.gameStat = {
      status: null }

    this.setEventHandler(WS_RESPONSE, this.responseHandler)
  }

  responseHandler = data => {
    if (data.action === "queue_updates"){
      this.userData = data.user
      this.userList = data.queue
    }

    if (data.action === "game_updates"){
      this.gameStat = data.game_stat

      if (this.gameStat.status === "canceled")
        this.mode = 1
      else
        this.mode = 2
    }

    return true

  }

  render () {
    if (this.mode === 1)
      return <Queue userData = {this.userData} userList = {this.userList}/>
    else
      return <Game userId = {this.userData.uid} gameStat = {this.gameStat}/>
  }
}

const Queue = ({userData, userList}) =>
  <div className = "main">
    <UserData userData = {userData} />
    <UserList userList = {userList}/>
  </div>


export default connect(state => ({WS_RESPONSE: state.wsResponse}))(MainPage)

