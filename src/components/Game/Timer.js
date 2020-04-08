import React from "react"
import connect from "react-redux/es/connect/connect"
import Listener from "../../Listener"
import {TIMER_START, TIMER_STOP, TIMER_OUT, TIMER_TACT} from "../../reducers/constants"


class Timer extends Listener {
  constructor(props){
    super(props)
    this.timer = 10
    this.interval = null
    this.round = this.props.round

    this.setEventHandler(TIMER_START, this.timerStart)
    this.setEventHandler(TIMER_STOP, this.timerStop)
    this.setEventHandler(TIMER_OUT, this.timerStop)
    this.setEventHandler(TIMER_TACT, () => true /* rerender */)
  }

  timerStart = () => {
    this.timer = 10
    clearInterval(this.interval)

    this.interval = setInterval(()=>{
      this.timer --

      if (this.timer === 0)
        this.dispatch(TIMER_OUT)
      else
        this.dispatch(TIMER_TACT)

    }, 1000)

    return true
  }

  timerStop = () => {
    clearInterval(this.interval)
    return true
  }

  render () {
    /* С каждым новым раундом сбрасываем таймер */
    if (this.props.round !== this.round){
      this.timerStart()
      this.round = this.props.round
    }

    return <div className = "countdown">{this.timer}</div>
  }
}


export default connect(state => ({
  TIMER_START: state.timerStart,
  TIMER_STOP: state.timerStop,
  TIMER_OUT: state.timerOut,
  TIMER_TACT: state.timerTact,
}))(Timer)

