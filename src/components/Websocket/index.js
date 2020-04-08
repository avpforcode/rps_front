import connect from "react-redux/es/connect/connect"
import ReconnectingWebSocket from 'reconnecting-websocket'
import Listener from "../../Listener"
import {WS_REQUEST, WS_RESPONSE, TOP_ERROR} from "../../reducers/constants"


class Websocket extends Listener {
  constructor(props){
    super(props)
    this.setEventHandler(WS_REQUEST, this.sendRequest)
  }

  componentDidMount(){
    this.connect()
  }

  connect = () => {
    let ws_scheme = window.location.protocol === "https:" ? "wss" : "ws";
    this.socket = new ReconnectingWebSocket(`${ws_scheme}://${window.location.host}/ws`)

    this.socket.addEventListener('message', event => {
      let msg = JSON.parse(event.data)

      if (msg.result === "Done")
        this.dispatch(WS_RESPONSE, msg)
      else
        this.dispatch(TOP_ERROR, msg.data)
    })
  }

  sendRequest = data => {
    this.socket.send(JSON.stringify(data))
    return false
  }

  render () {
    return null
  }
}

export default connect(state => ({WS_REQUEST: state.wsRequest}))(Websocket)

