import React from "react"
import connect from "react-redux/es/connect/connect"
import Listener from "../../Listener"
import {TOP_ERROR} from "../../reducers/constants"


class TopError extends Listener {
  constructor(props){
    super(props)
    this.msg = null
    this.display = 'd-none'

    this.setEventHandler(TOP_ERROR, this.showError)
  }

  showError = msg => {
    (msg === 'clear_error')? this.display = 'd-none' : this.display = ''
    this.msg = msg
    return true
  }

  render () {
    return (
      <div className = {"top-error " +  this.display} >
        {this.msg}
      </div>
    )
  }
}

export default connect(state => ({TOP_ERROR: state.topError}))(TopError)

